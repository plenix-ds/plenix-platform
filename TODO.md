# Plenix · to-do

Open items the owner asked to keep. Newest first; each with the date it was added and what "done" means.

## Strict DS: no inline styles, no exceptions (added 2026-10-09)

Owner: "i want this to strictly follow the DS.. no exceptions": not even a custom-property value in a style attribute.
A value from the data reaches the stylesheet as an attribute with one rule per step (system/steps.css, build-steps.js)
or as a class from a palette. Say "continue Strict DS" to pick it up.
- [x] 1. No visible change: tree indent (aria-level), picture shape (data-plx-aspect), skeleton sizes (size-token names),
  calendar grid and events (quarter hours), suite icon size (a class) (batch 267)
- [x] 2. (batch 280, 0.23.0) Data colors: a --plx-sys-data-* palette from existing hues; Avatar, Card accent, Color swatch, Event chip,
  project dots, Progress bar color as palette classes; app data from hex to palette names
- [x] 3. (batch 280, 0.23.0) Progress bar: native <progress value> (the function reports the amount; the DS styles it); the spec says so
- [x] 4. (batch 281, 0.23.1) Panes: dragging snaps to width tokens (nav pane, Files pane, Details panel)
- [ ] 5. Image editor in steps: zoom, opacity, text on a 5% grid, palette text colors, filter presets, crop classes
- [ ] 6. The design system's 15 sample styles: a generated class per token
- [ ] 6b. Tabulator drawn by Plenix. PROVEN in the prototype (Plenix - DAM/audit/tabulator-prototype/, 2026-10-09):
  zero inline styles with every feature working: sorting, row selection, widths as size-token classes (cssClass), a
  sticky class instead of frozen, editing (a custom editor: Plenix input), tree rows (indent by tabulator-tree-level-N
  class; expand and collapse work), grouping, row moving by native drag and drop (drop line as a class, row.move),
  row menus anchored to their button (no coordinates), column resize by switching the width class (snaps to tokens),
  paging (10 per page). How: renderVertical "basic"; Tabulator's own geometry writes switched off (cell and column
  width/height, header vertical align, row height normalising, holder sizing, frozen-rows holder width) and the tree's
  row layout replaced by one without indent. To do: move this into DataTable and Table, a test that fails if a
  Tabulator update writes a style again, then the real tables (25 data-table views, the reference test).
- [ ] 6c. The design system lab builds its grid as table markup and hands it to DS.table() (component-lab.js: the
  matrix and the properties table; Codex M-03): hand the rows to the Platform Table directly, with no markup
- [ ] 7. check-system rejects every style attribute, custom properties included; and a runtime test (Codex,
  owner yes 2026-10-09) that fails any page rendering an element with a style attribute

## Every Variant (the Button treatment for every component) (added 2026-10-09)

Owner: "every variant for every component to have navigation and design specs just like we did for the buttons". Say
"continue Every Variant" to pick it up. Each component gets: its values as component tokens, an "All" lab that draws
every variant with each value's token and an Edit dialog, and its own page per variant in the navigation.
- [x] Button, Field and the six form controls (batches 252-256)
- [x] Badge (0.17.0); Counter, Status dot, Notice, Spinner, Progress bar (0.18.0): 37 of 192 variants
- [ ] Overlays: Dialog, Confirmation dialog, Side drawer, Toast
- [ ] Navigation: Tabs, Application header, Navigation rail, Product switcher, Action menu
- [ ] Data display: Tag, Chip, Metric, Card, Media card, Interactive list, Activity stream, Radio tiles, Calendar view
- [ ] Forms: Combobox, Search input, Color swatch, Drop zone, Rating
- [ ] Content: Text, Heading, List, Code block, Keyboard hint, Avatar, Property list, Thumbnail, Icon
- [ ] Layout: Stack, Divider, Columns, Responsive grid, Dashboard grid, Secondary pane, Inspector region, Record page
- [ ] The rest: Empty state, Preview, Typing indicator
Done = every record with variant cards has variant pages and a lab that passes tests/labs.test.js. The recipe is in
the work log (batches 263-264): tokenize-component.js, a DS.registerLab spec, variantPages whose names match the cards.

## Sign-in email: SMTP for "Forgot username or password?" (added 2026-10-09)

The sign-in page (auth.lighthouseway.org, Authentik) has the link and Authentik's reset flow (default-recovery-flow: your
email or username, an email with a link, a new password, signed in). The email cannot be sent yet: Authentik's mail
settings are its defaults (localhost:25).
- [ ] Owner: the outgoing mail account (SMTP host, port, username, From address); the password goes on the server by the
  owner, not in chat.
- [ ] Set Authentik's email settings (AUTHENTIK_EMAIL__* in CT 104's .env) and restart it; send a test email.
- [ ] Try the whole reset with a test account. Done = the email arrives and the new password signs in.

## Roadmap: establishing the design system (owner: "do it systematically, all of it", 2026-10-08)

Worked in this order; each step is verified (snapshot diff, checks, page check) and logged as a batch.

Phase 1 · a trustworthy foundation
- [x] 1. Button's look as component tokens (batch 207): 115 `--plx-comp-button-*` tokens; button.css uses only them; each Edit dialog field edits exactly one token and Save sends `{ file, changes: [{ token, from, to }] }`.
- [x] 2. The 125 built items' written sections (batch 208): purpose, anatomy, behavior, accessibility, content guidance, related items, template references (from the apps' imports), Figma (none: code-first). "Not written yet" on built pages: 2,018 → 0. The code gaps found are in Plenix - DAM/audit/findings-2026-10-08.md (to fix).
- [x] 3. The deployed apps run on the release (batch 208): deploy.sh points their pages at /cdn/<version>/ and reports unreleased Platform changes. All 11 apps pixel-identical on source and release.
- [x] 4. (2026-10-09) The corrupted writes: the drives report healthy; the cause is the CPU (i9-13900KS, Raptor Lake degradation: 89 WHEA internal parity errors on P-cores 4 and 5, 3 fatal, crashes). Owner: Intel warranty RMA; meanwhile Intel Default Settings, RAM at 4800-5200, free space on D: (98% full).

Phase 2 · safe to change
- [x] 5. VERSIONING.md and CHANGELOG.md (batch 209); the Release workflow takes its notes from the changelog.
- [x] 6. Checks on every push (batch 209): build, system and spec checks, release build, Button visual snapshot, every page (629), axe-core accessibility scan (418 known issues, may only go down). Waiting on the owner: a DS_TOKEN secret so CI also checks out the private design system (deploy keys are disabled in the plenix-ds organization).
- [x] 7. TypeScript definitions for @plenix-ds/react (batch 209), generated from the header comments; released in 0.2.0.

Fix what was found (owner's choice, before items 8, 9, 11; batches 211–215, released in 0.3.0)
- [x] Accessibility: axe-core issues 418 → 3 (contrast per the owner's color decisions; ARIA; keyboard access to scroll areas).
- [x] Documentation findings: keyboard and focus, right to left, translatable words (`strings`), image fallbacks, font sizes in rem, and more. The list is in Plenix - DAM/audit/findings-2026-10-08.md.
- [ ] Owner: the 3 remaining target-size issues. These are the design system's stacked class-name links (14px). Fixing them means giving them taller lines on every design-system page.
- [x] (batch 257) Title Case labels: the Asset Manager's examples were already gone; across the suite, UI labels, actions and document headings are sentence case (the content standard); names stay (people, companies, products and apps, sample records, the product spec's entity, feature and module names).
- [x] The five layout modes: done in batches 217-218 (system/layout-modes.css, generated from the layout standard, draws each mode).

Next, in order (agreed after the Authentik set-up, 2026-10-08)
- [x] 1. Releases: 0.4.0 through 0.13.1 are out; the Asset Manager labels and the layout modes wait on the owner (above).
- [ ] 2. Save in the design system (item 8): Save opens a pull request; only Authentik Editors (and Admins) may save; a save service on the Plenix VM; the Authentik proxy provider and application (owner to approve Claude creating them through Authentik's admin shell).
- [x] 3. (batch 251) Starter template (item 12): plenix-ds/plenix-starter with a CDN (plain HTML) starter and a Vite + React + TypeScript starter, both on the shell, page kinds and tokens.
- [x] 4. Form controls on component tokens (item 9): Input, Select, Checkbox, Radio, Switch and Field get the Button treatment. Tokens done (batch 223); the shared lab (batch 252) and the labs of Text field, Text area, Native select, Checkbox, Radio group, Switch and Field (batches 253-256): an All page, 41 variant pages, the anatomy and the Edit dialog each; tests/labs.test.js proves every field moves its own property.
- [x] (batch 224) A compact Checkbox is 24px: no top and bottom padding in compact (owner chose A).
- [ ] 5. Build the placeholders the next project needs (item 11): owner to name the project or the items.
- [ ] Owner: create the DS_TOKEN secret so CI also tests the design system.
- [x] Claude (read-only, 2026-10-09): Proxmox backups checked. **Nothing is backed up**: /etc/pve/jobs.cfg has no backup job and no storage holds a backup (container 104 "infra", Authentik, included).
- [ ] Owner: set up Proxmox backups (where to: local, the Storage pool or a Proxmox Backup Server; how many to keep; when). Container 104 (Authentik) first.
- [ ] Single sign-on plan: every Plenix app and the design system's Save sign in through Authentik; Admins / Editors / Users drive permissions.
- [ ] To discuss first (owner, 2026-10-08): renaming to Lighthouse Design System (lighthouse-ds); the design system as its own source of truth that every app takes its UI from; themes (the current look as the default theme, more themes later).

Every table is a Tabulator DataTable (owner, 2026-10-08: "every table rebuilt"; the style: docs/data-table-reference.html)
- [x] 1. (batch 226) Foundation: Tabulator 6.6.1 vendored, the DataTable component (Tabulator's own column definitions), data-table.css from the reference with tokens only, table tokens, icons; 180/180 parts match the reference.
- [x] 2. (batch 226) The apps' tables rewritten as DataTables: 22 grid views (Files, Projects, Search workspace, Settings, the Asset Manager's home, system settings and field dialogs); tests/data-table.test.js.
- [x] 3. (batch 226) The design system's own tables as DataTables: the spec pages' React tables, DS.table for every table a page or lab builds (the button matrix in its frame too); 149 pages, no <table> left.
- [x] 4. (batch 226) Table, system/table.css and the 33 table tokens removed; ActivityList and PropertyList on the grid tokens; check-system rule tables and a pages-test check reject any table that is not a DataTable.
- [x] 5. (batch 226) The Data table page (#/data-display/data-table): the rule, how to apply it, every part of the style with its tokens, density, light and dark, one live grid.

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
- [x] 12. (batch 251) Starter template: plenix-ds/plenix-starter, a CDN starter (plain HTML, no build) and a Vite + React + TypeScript starter on the npm packages; both draw the same shell, navigation, DataTable and ActionBar, tested in Chrome. Fixed on the way: the npm package's DataTable found no Tabulator in a bundled app; it now loads the release's CDN copy.
- [x] (2026-10-09) CI ran nothing since batch 234: a colon in a step name broke ci.yml; fixed, and the tests now run with reduced motion (CI had read the start of batch 236's fades).

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
- [x] DNS and HTTPS for design-system.lighthouseway.org (live since 2026-10-08).
- Done when: an edit made in the Edit dialog on design-system.lighthouseway.org changes the JSON, the token CSS is rebuilt, and the page shows the new value after reload.
