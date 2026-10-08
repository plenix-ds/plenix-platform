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

Fix what was found (owner's choice, before items 8, 9, 11; batches 211–215, released in 0.3.0)
- [x] Accessibility: axe-core issues 418 → 3 (contrast per the owner's color decisions; ARIA; keyboard access to scroll areas).
- [x] Documentation findings: keyboard and focus, right to left, translatable words (`strings`), image fallbacks, font sizes in rem, and more. The list is in Plenix - DAM/audit/findings-2026-10-08.md.
- [ ] Owner: the 3 remaining target-size issues. These are the design system's stacked class-name links (14px). Fixing them means giving them taller lines on every design-system page.
- [ ] Owner: the Asset Manager's Title Case labels ("Edit Status", "Import Date"…). Which are field names and which are actions?
- [ ] Owner: the five layout modes on `data-plx-layout` are declared, but no CSS reads them. Implement them, or document them as a label only?

Next, in order (agreed after the Authentik set-up, 2026-10-08)
- [ ] 1. Release 0.4.0: the Asset Manager labels, the layout modes, the layout standard (settings follow it), accessibility 0.
- [ ] 2. Save in the design system (item 8): Save opens a pull request; only Authentik Editors (and Admins) may save; a save service on the Plenix VM; the Authentik proxy provider and application (owner to approve Claude creating them through Authentik's admin shell).
- [ ] 3. Starter template (item 12): plenix-ds/plenix-starter with a CDN (plain HTML) starter and a Vite + React + TypeScript starter, both on the shell, page kinds and tokens.
- [ ] 4. Form controls on component tokens (item 9): Input, Select, Checkbox, Radio, Switch and Field get the Button treatment. Tokens done (batch 223: 149 tokens, zero visual change); variant pages and the Edit dialog next.
- [ ] Owner to decide: a compact Checkbox row is 26px (its 2px padding plus the label line), above the 24px compact control role and off the 4px grid; found in batch 223, unchanged since before.
- [ ] 5. Build the placeholders the next project needs (item 11): owner to name the project or the items.
- [ ] Owner: check drive D: (chkdsk, SMART); create the DS_TOKEN secret so CI also tests the design system.
- [ ] Claude (read-only): confirm Proxmox backups of container 104 (Authentik: accounts and groups).
- [ ] Single sign-on plan: every Plenix app and the design system's Save sign in through Authentik; Admins / Editors / Users drive permissions.
- [ ] To discuss first (owner, 2026-10-08): renaming to Lighthouse Design System (lighthouse-ds); the design system as its own source of truth that every app takes its UI from; themes (the current look as the default theme, more themes later).

Themes and components (owner, 2026-10-08: "do the foundations and then the components")
- [x] Themes defined in the design system (platform/standards/themes.json), the current look as the "default" theme, switching (batch 219).
- [x] (batch 220) Foundations into themes: typography (families, weights, letter spacing), shape (radius, border widths and styles), motion (durations, easing), opacity and the focus ring become theme roles; components use only those roles. Shared, never per theme: spacing, control heights, density, grid, breakpoints, layers. The same palette color can serve many themes.
- [ ] Every component gets the Button treatment (its own tokens for every variant, size and state; variant pages; the token Edit dialog; zero-visual-change and mapping proofs), in groups: form controls, actions, navigation, data display, feedback, overlays, layout.

Phase 3 · editable and governed
- [ ] 8. The save server. Decided: Save opens a pull request on GitHub (a save service on the Plenix VM applies the change, rebuilds, runs the checks, opens the PR); sign-in through the owner's Authentik (auth.lighthouseway.org), a "Plenix editors" group. Owner step: a proxy provider and application in Authentik (steps to follow).
- [ ] 9. Variant pages and the token Edit dialog for every component (the Button pattern).
- [x] 10. Contribution model (batch 210): CONTRIBUTING.md (stages, who decides, the rules, the review checklist), a Component proposal issue form and a pull request checklist on GitHub.

Phase 4 · grow
- [ ] 11. Build the placeholders the next projects need.
- [ ] 12. Starter template: plenix-ds/plenix-starter with both a CDN (plain HTML) starter and a Vite + React + TypeScript starter (recommended; the owner was unsure, so this goes ahead unless they say otherwise).

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
