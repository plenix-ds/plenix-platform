# Plenix · to-do

Open items the owner asked to keep. Newest first; each with the date it was added and what "done" means.

## Hosting: Plenix VM (added 2026-10-08)

Proxmox VM 130 "Plenix" (Debian 12 cloud image, 6 cores, 16 GB RAM, 200 GB on Storage, 10.0.0.30, starts on boot). Nginx serves `/srv/plenix/www` for plenix.lighthouseway.org (→ /Plenix/dashboard/) and design-system.lighthouseway.org (→ /Plenix/platform/design-system/); Docker CE is installed for the open-source apps. Firewall: SSH and HTTP from the LAN only; SSH by key only (user `plenix`). Snapshot `base-nginx-docker` is the clean state. Publish with `bash deploy.sh`.

- [x] Nginx Proxy Manager proxy hosts 27 (plenix) and 28 (design-system) → http 10.0.0.30:80, Let's Encrypt certificates 44 and 45 (renewed by NPM), Force SSL, HTTP/2, HSTS, Block Common Exploits. Live over HTTPS since 2026-10-08.

## Decision saved for later: Button's look as component tokens (added 2026-10-06)

Needed before the Edit dialog's Save can write every field to the token JSON. Today Button's colors per variant and state live in its stylesheet rules (`platform/components/Button/button.css`), not in tokens: for example `.plx-button--primary` uses `--plx-sys-action-primary-background` directly. So the dialog's color and border fields can only produce a stylesheet change, not a JSON one.

- [ ] Owner to choose:
  - (a, recommended) Give Button a full set of component tokens (`--plx-comp-button-primary-background`, `…-primary-hover-background`, `…-primary-text` and so on) in `platform/tokens/components.tokens.json`, and have button.css use only those. Every field in the dialog then edits exactly one token, and Save writes JSON.
  - (b) Save only the fields that are already tokens (sizes, padding, gap, font size and weight, a few colors) and leave the rest as copy-only.
- Done when: the choice is made and, for (a), button.css uses only --plx-comp-button-* tokens and each dialog field maps to one token.

## Design system server: design-system.lighthouseway.org (added 2026-10-06)

The design system's Edit dialog saves token changes straight into the token JSON (`platform/tokens/*.tokens.json`); that needs a write-capable server. The owner will host it on their own server at **design-system.lighthouseway.org** (setup later).

- [ ] Server: serves `Plenix/platform/` (the design system at `/platform/design-system/`) and answers the save endpoint.
- [ ] Save endpoint: `POST /api/tokens`, body `{ file, changes: [{ token, from, to }] }`. It writes the token JSON, runs `node build-tokens.js` (and `node check-system.js`), and answers with the result. Read-only servers answer 404/405, and the dialog then says saving needs this server.
- [ ] Access: only the owner can save (sign-in or a key on the server side, never in the page).
- [ ] History: every save is logged (who, when, the change list), so a change can be undone.
- [ ] DNS and HTTPS for design-system.lighthouseway.org.
- Done when: an edit made in the Edit dialog on design-system.lighthouseway.org changes the JSON, the token CSS is rebuilt, and the page shows the new value after reload.
