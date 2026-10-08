# Plenix · to-do

Open items the owner asked to keep. Newest first; each with the date it was added and what "done" means.

## Roadmap: establishing the design system (owner: "do it systematically, all of it", 2026-10-08)

Worked in this order; each step is verified (snapshot diff, checks, page check) and logged as a batch.

Phase 1 · a trustworthy foundation
- [x] 1. Button's look as component tokens (batch 207): 115 `--plx-comp-button-*` tokens; button.css uses only them; each Edit dialog field edits exactly one token and Save sends `{ file, changes: [{ token, from, to }] }`.
- [x] 2. The 125 built items' written sections (batch 208): purpose, anatomy, behavior, accessibility, content guidance, related items, template references (from the apps' imports), Figma (none: code-first). "Not written yet" on built pages: 2,018 → 0. The code gaps found are in Plenix - DAM/audit/findings-2026-10-08.md (to fix).
- [x] 3. The deployed apps run on the release (batch 208): deploy.sh points their pages at /cdn/<version>/ and reports unreleased Platform changes. All 11 apps pixel-identical on source and release.
- [ ] 4. Owner: check drive D: (`chkdsk D: /scan`) and memory (Windows Memory Diagnostic): two corrupted writes on 2026-10-08.

Phase 2 · safe to change
- [x] 5. VERSIONING.md and CHANGELOG.md (batch 209); the Release workflow takes its notes from the changelog.
- [x] 6. Checks on every push (batch 209): build, system and spec checks, release build, Button visual snapshot, every page (629), axe-core accessibility scan (418 known issues, may only go down). Waiting on the owner: a DS_TOKEN secret so CI also checks out the private design system (deploy keys are disabled in the plenix-ds organization).
- [x] 7. TypeScript definitions for @plenix-ds/react (batch 209), generated from the header comments; released in 0.2.0.

Phase 3 · editable and governed
- [ ] 8. The save server (below: design-system.lighthouseway.org) writes token changes, rebuilds, logs who changed what.
- [ ] 9. Variant pages and the token Edit dialog for every component (the Button pattern).
- [ ] 10. Contribution model: proposal → placeholder → built → released; approvals; review checklist.

Phase 4 · grow
- [ ] 11. Build the placeholders the next projects need.
- [ ] 12. Starter template: a new project wired to Plenix in one command.

## Not urgent: own mirror of the Plenix packages and repos (added 2026-10-08)

Keep a copy of the @plenix-ds packages (and the plenix-ds repos) on our own servers, so installs keep working if GitHub is down and projects use one registry address.

- [ ] Owner to choose:
  - (A, recommended) Proxy and pre-fetch: Verdaccio in Docker on the Plenix VM copies from GitHub Packages, and each release asks it for the new version right away. GitHub stays the one place releases are published; the copies cannot differ. Needs a read-only GitHub token (classic, read:packages only) on the VM.
  - (B) Publish to both: the release publishes to GitHub Packages and, separately, to Verdaccio. Fully independent copies, but they drift if one publish fails, and the registry must accept publishing from the internet (a publishing password stored in GitHub).
- [ ] Address: `registry.lighthouseway.org` (recommended; owner adds the DNS record, then an NPM proxy host and certificate) or `design-system.lighthouseway.org/npm/`.
- [ ] Access: who may install (default: accounts created on the registry).
- [ ] Repos: Forgejo (forgejo.lighthouseway.org) pull-mirrors plenix-ds/plenix-platform and plenix-ds/plenix-design-system on a schedule.
- Done when: `npm install @plenix-ds/react` works against the registry address with GitHub unreachable, and Forgejo shows both repos up to date.

## Hosting: Plenix VM (added 2026-10-08)

Proxmox VM 130 "Plenix" (Debian 12 cloud image, 6 cores, 16 GB RAM, 200 GB on Storage, 10.0.0.30, starts on boot). Nginx serves `/srv/plenix/www` for plenix.lighthouseway.org (→ /Plenix/dashboard/) and design-system.lighthouseway.org (→ /Plenix/platform/design-system/); Docker CE is installed for the open-source apps. Firewall: SSH and HTTP from the LAN only; SSH by key only (user `plenix`). Snapshot `base-nginx-docker` is the clean state. Publish with `bash deploy.sh`.

- [x] Nginx Proxy Manager proxy hosts 27 (plenix) and 28 (design-system) → http 10.0.0.30:80, Let's Encrypt certificates 44 and 45 (renewed by NPM), Force SSL, HTTP/2, HSTS, Block Common Exploits. Live over HTTPS since 2026-10-08.

## Decision saved for later: Button's look as component tokens (added 2026-10-06)

Needed before the Edit dialog's Save can write every field to the token JSON. Today Button's colors per variant and state live in its stylesheet rules (`platform/components/Button/button.css`), not in tokens: for example `.plx-button--primary` uses `--plx-sys-action-primary-background` directly. So the dialog's color and border fields can only produce a stylesheet change, not a JSON one.

- [x] Owner chose (a) on 2026-10-08; done in batch 207.
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
