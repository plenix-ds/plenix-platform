# login

Signing in to Plenix is safe: only the right password works, sessions cannot be forged, and attackers are slowed down and cannot redirect people elsewhere.

- File: `tests/login.test.js`

## What it checks
- Accounts command: a short password is refused; a password is never accepted as a command option; the accounts file holds scrambled hashes (scrypt), never passwords; the list shows each account.
- The secret file is private to its owner (mode 600 on Linux).
- Signed out: the check and session addresses answer 401 (not signed in).
- The sign-in page: no inline styles; the browser can fill in the name and password, and paste works; it uses the release stylesheet from the CDN and the Auth pattern; it keeps a same-site return address; it sends a strict security policy and is never cached.
- Sign-in from another site, or with no origin, is refused.
- A wrong password and an unknown name get the same plain message, and the name stays filled in (WCAG 3.3.7, redundant entry).
- Success: signing in by email, in any letter case, returns to the page asked for. The session cookie is private, secure and ends with the browser session; "Keep me signed in" lasts 30 days.
- The access check (for the web server, Nginx) passes the person's name, email and groups.
- Tampered cookies (changed data, changed signature, another user, longer expiry, no signature, junk) are refused.
- Open redirects: ten tricky return addresses all go to the home page, and bad ones are dropped from the sign-in page.
- Sign-out clears the cookie; "everywhere" ends all sessions; a sign-out link from another site asks first.
- Revoking from the command ends the session; a disabled account cannot sign in; enabled again, it can.
- Lockout: after 3 failures even the right password is refused for a while; a name that is no account locks the same way; other accounts still sign in.
- The log records who, when, from where and the result of each attempt, and never a password.
- The save service accepts the Plenix login's headers (and still the old Authentik headers).
- The visitor's address: without `TRUST_PROXY` a new forwarded address does not get a fresh attempt budget; with `TRUST_PROXY=1` it does.
- The save service looks up a token by its own name only (read from its source).

## Why it exists
- Added in commit cecf75a1 "0.31.36: Native designs for every component; web conformance; Plenix login".
- The save service must work after the move away from Authentik (in the file header).
- The kept user name: WCAG 2.2 SC 3.3.7 Redundant Entry (named in the check).
- The address and token checks: issue #695, "Audit (Low): two hardening gaps in the login and save services" (in the file).

## How it checks
- Creates two test accounts with random passwords through the accounts command, in a temporary data folder.
- Starts the login service (`services/login/server.js`) and the save service (`services/save/server.js`) on local ports, then sends web requests to them and reads the answers, cookies and headers. No browser.
- Starts three more short-lived login servers for the address checks.
- Deletes the temporary folders at the end.

## What a failure means
- Someone could sign in without the right password, forge or reuse a session, guess passwords without limit, or be sent to a harmful site after signing in.
- Passwords could end up in files or logs.

## When it runs
- AUTOMATIC group in `tests/run.js`.
- In changed mode it runs only when the login service (`services/login`) changes, a global file changes, or this test's own file changes.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests without a browser", on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the build job.
- By hand: `node tests/login.test.js`, or `npm run test:login`.

## What it needs
- Node only (no browser).
- The services in `services/login` and `services/save`.
- Free local ports: 8892 to 8896 by default (`LOGIN_PORT` picks others).
