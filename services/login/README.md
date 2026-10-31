# Plenix login

A small sign-in service for plenix.lighthouseway.org and design-system.lighthouseway.org, separate from Authentik
(TODO.md, "A lightweight Plenix login"). Node 22, no dependencies, one container on the Plenix VM, like the save service.

| Path | What it does |
|---|---|
| `GET /auth/check` | For Nginx `auth_request`: `204` with `X-Plenix-User`, `X-Plenix-Email`, `X-Plenix-Name`, `X-Plenix-Groups` (`Admins\|Editors`), or `401` |
| `GET /auth/sign-in?rd=/path` | The sign-in page. `rd` is where to go next: a path on the same site only |
| `POST /auth/sign-in` | The form: `user` (user name or email), `password`, `keep`, `rd` |
| `POST /auth/sign-out` | Signs out. `everywhere=1` also ends every other session of the account |
| `GET /auth/sign-out` | The apps' "Sign out" link. A link on the same site signs out at once; from any other site, the page asks first |
| `GET /auth/session` | Who is signed in, as JSON (`user`, `email`, `name`, `groups`), or `401`. For the apps' account menu |

## Files

- `server.js`: the service.
- `accounts.js`: the accounts CLI.
- `Dockerfile`, `deploy.sh`: the container, built in the save service's style. They are written but have not been run.
- `nginx-example.conf`: how the VM's Nginx would use the service.
- The tests are in `tests/login.test.js` (`npm run test:login`). No tests: see HANDOFF.md (the owner runs them).

The data lives in `DATA` (`/srv/plenix/login` on the VM, mounted at `/data`):

- `accounts.json`: each account has a user name, email, display name, groups (Admins, Editors, Users), a scrypt hash with its own salt, created and updated times, a disabled flag, and a session version.
- `secret`: the HMAC-SHA256 key for the session cookies. It is made on first start with mode 600. Deleting it ends every session.
- `log.jsonl`: one line for each sign-in attempt (who, when, IP, result) and each account change. It never holds a password.

## How it works

- **Session.** The session is the cookie `__Host-plenix_session` (HttpOnly, Secure, SameSite=Lax, Path=/). It holds the user name, the account's session version and the expiry, signed with HMAC-SHA256. A session lasts 12 hours and ends when the browser closes. With "Keep me signed in", it lasts 30 days. Raising the account's session version ends every session of that account. `revoke`, `reset-password`, `disable` and "sign out everywhere" all do this.
- **Sign-in protection.**
  - Every wrong answer is the same: "That user name or password is not right." A name that has no account still costs one scrypt hash, so the response time does not reveal which names exist.
  - After 5 failures in a row, the name is locked for 1 minute. Each further failure doubles the wait, up to 15 minutes. Names that are not accounts lock the same way.
  - Each IP address may fail 20 times in 15 minutes.
  - These limits are kept in memory, so a restart clears them.
- **Requests from other sites.** A POST must carry an `Origin` (or `Referer`) from the host it was sent to. The page sends a strict Content-Security-Policy: scripts, styles and fonts come only from the Platform CDN.
- **Password managers (WCAG 3.3.8).** The fields use `autocomplete="username"` and `autocomplete="current-password"`. Paste and autofill are never blocked, and the user name stays filled in after an error.
- **Look.** The page uses only the Platform release's classes: the accent application header, the Platform's `Auth` pattern (`plx-auth`: a centered card, one column at Narrow) in the AppShell frame, `plx-field` and `plx-input`, `plx-check`, `plx-button`, and `plx-notice`. It loads `fonts.css`, `plenix.css` and `theme-boot.js` from `https://design-system.lighthouseway.org/cdn/<version>/`, where the version comes from `package.json` (the same files the deployed apps use). Light and dark mode follow the system. It follows Platforms Standard 5.3 "Sign-in and account": a centered card at Medium and Wide, and one column with no card frame at Narrow.

Settings come from environment variables:

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `8782` | The port the service listens on |
| `DATA` | `/data` | The data folder |
| `CDN` | The release in `package.json` | Where the page loads the Platform from |
| `TRUST_PROXY` | Not set (the socket's address); `1` in the container (the Dockerfile) | Use `X-Real-IP` as the visitor's address: set it to `1` only when the service is reached through the proxy |
| `COOKIE_DOMAIN` | Not set | Share one sign-in across both hosts (see "Owner decisions") |
| `LOCK_AFTER`, `LOCK_BASE_MS`, `LOCK_MAX_MS`, `IP_MAX`, `IP_WINDOW_MS` | 5, 1 min, 15 min, 20, 15 min | The rate limits |

## Deploy (not done yet)

```
bash services/login/deploy.sh
```

This builds the image on the VM and runs `plenix-login` on `127.0.0.1:8782`, with `/srv/plenix/login` as `/data`. Nothing points to the service until Nginx is changed (see "Cutover"), so deploying it alone changes nothing for visitors.

## The first account

```
ssh -i "$PUBLISH_KEY" "$PUBLISH_USER@$PUBLISH_HOST"
sudo docker exec -it plenix-login node accounts.js add <user> --email <email> --name "<display name>" --groups Admins
```

The CLI asks for the password twice at a hidden prompt. It needs at least 12 characters, and paste works. The password is never typed on the command line. The other commands are:

```
node accounts.js list
node accounts.js groups <user> Admins,Editors
node accounts.js name <user> "<display name>"
node accounts.js email <user> <email>
node accounts.js disable <user>
node accounts.js enable <user>
node accounts.js reset-password <user>
node accounts.js revoke <user>
```

`disable` and `reset-password` also sign the account out everywhere. `revoke` signs it out everywhere without changing anything else.

To try the page before the cutover, open a tunnel with `ssh -i "$PUBLISH_KEY" -L 8782:127.0.0.1:8782 "$PUBLISH_USER@$PUBLISH_HOST"` (the publish host, account and key: `tools/publish-config.sh`) and go to http://localhost:8782/auth/sign-in. Browsers accept Secure cookies on localhost.

## Cutover from Authentik (each step needs the owner's go)

1. **Back up.** Copy the VM's `/etc/nginx/sites-available/plenix` to `plenix.bak-<date>`. Back up NPM's `database.sqlite` the same way as the earlier `.bak-20261010-ds-private` backup.
2. **Deploy the save service.** Run `bash services/save/deploy.sh`. It now accepts `X-Plenix-*` headers as well as `X-authentik-*`, so Save works before and after the switch.
3. **Deploy the login service and add the owner's account.** Follow "Deploy" and "The first account" above, then test the sign-in through the tunnel.
4. **Change the VM's Nginx.** Merge `nginx-example.conf` into the site file, with `<PROXY_ADDRESS>` replaced by the reverse proxy's address on the private network and keep the existing rules: the redirects, the bundle and the CDN headers. Run `sudo nginx -t`, then `sudo systemctl reload nginx`. Until step 5, a visitor signs in twice: first through Authentik, then through Plenix.
5. **Remove the Authentik forward auth from NPM hosts 27 and 28.** Clear their advanced config, the same way it was applied: a dry run first (`npm-dryrun.mjs`), then the real change. Keep TLS, Force SSL, HSTS and "Block Common Exploits".
6. **Check the result:**
   - Signed out, https://plenix.lighthouseway.org/ goes to the Plenix sign-in, and https://design-system.lighthouseway.org/cdn/index.json still answers 200 without a sign-in.
   - After signing in, the dashboard opens, Save in the design system opens a pull request as the signed-in person, and "Sign out" works.
7. **Clean up afterward.** Remove the Authentik applications "plenix" and "plenix-design-system" and the outpost's providers for them, once Plenix has run on its own for a while.

## Rollback

1. Restore the site file from `plenix.bak-<date>`, then run `sudo nginx -t` and `sudo systemctl reload nginx`.
2. Put the Authentik advanced config back on NPM hosts 27 and 28 with `services/auth/npm-advanced-config.mjs` (dry run first).
3. Leave the save service as it is: it still accepts `X-authentik-*`.
4. Optionally run `sudo docker rm -f plenix-login`. The data in `/srv/plenix/login` stays.

## Owner decisions

- **One sign-in for both hosts, or one each?** Today each host has its own cookie, so a visitor signs in on each. With `COOKIE_DOMAIN=lighthouseway.org`, one sign-in covers both. The cost is that the cookie then also goes to every other `*.lighthouseway.org` site.
- **"Forgot password".** There is no self-service reset: no SMTP and no email flow. An Admin runs `reset-password`. Self-service reset can come later, once SMTP is set up (TODO.md "Sign-in email").
- **Switch account and sign-out in the apps.** The apps link to `/outpost.goauthentik.io/sign_out`, and `nginx-example.conf` sends that to `/auth/sign-out`. "Switch account" is "sign out, then the sign-in page", which this sign-out already does. A Platform release could point `AppHeader`'s `SIGN_OUT` (and the Settings button) at `/auth/sign-out` directly.
- **Real account data in the apps.** The apps still show the demo session (`SessionProvider`), not the signed-in person. Showing the real person means wiring `SessionProvider` to `GET /auth/session`.
- **Passkeys and two-factor sign-in.** Authentik offers MFA; this service does not yet. Platforms Standard 5.3 mentions passkeys, and they could be added later with WebAuthn.
