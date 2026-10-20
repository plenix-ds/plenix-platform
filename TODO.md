# Plenix · to-do

Open items the owner asked to keep. Newest first; each with the date it was added and what "done" means.

## Settings in cards, matching the design system (owner, 2026-10-12)

Owner: "I need all the settings pages to have the cards view… everything in the Plenix settings needs to be updated to match
the DS… many things not matching such as the form fields". Card kinds: collapsible (expand/collapse) and static.
- [ ] SettingsSection: a card always, static or collapsible (its variant pages and lab).
- [ ] Every settings page in cards: the Plenix Settings app (every category, Features, Documentation), the DAM's System
  settings and My account.
- [ ] Conformance: every control as its design-system page defines it (fields with labels, standard widths, nothing cut
  off; selects, segmented controls, switches, buttons, notices, empty states, DataGrids).
- [ ] Checks: the settings pages in the layout, typography, targets and a11y tests; a rule against sections not in cards
  and fields not built from Field and Input.

## Future release: themes authored in Figma (owner, 2026-10-12)

Figma feeds the design system. A new theme always starts from the existing Light and Dark themes. From any part of the
design system that can be adjusted (a component's tokens, the Edit dialog), "Open in Figma" opens that component in Figma, in
a new Figma file made for that theme (the Plenix variables copied in as the theme's starting values). Edits to the theme's
variables come back as token changes: a pull request that rebuilds and runs the checks, like the Edit dialog's Save.
Needs Figma's variables API (Enterprise) or the plugin route; on Starter the call limit throttles it.
- [x] (0.31.44) The entry points in the UI: "Open in Figma" beside Edit, and "New theme in Figma" on the Themes page,
  marked as coming in a future release.
- [ ] Build it (future release).

## The complete library (owner, 2026-10-11)

Owner: "I am building this as a cdn so that any app i build will use whatever is needed and it has the entire libraries
 of the cdn." Every Web inventory leaf exists as a real, published part of Plenix; nothing waits as a placeholder.
- [ ] Classify the 486 leaves with no record (component, pattern, extension of an existing one, foundation, template,
  package) and order them in waves (scratchpad library/plan.json).
- [ ] Build every wave (the Every Variant recipe: tokens, lab, variant pages; native designs; tests); release each.
  Done: wave 0 (0.31.41), wave 1 (0.31.42), wave 2 (0.31.43).
- [ ] Adoption (after the waves that add foundations): RowButton, MediaCard and Tree on usePressable/useFocusable/useSelection;
  Toolbar on useFocusGroup; Sheet and MediaViewer on useGesture; the form controls on useReadOnly; Skeleton, Spinner and
  ProgressBar on the loading motion; Toast on announce; DataGrid counts and the shortcuts dialog on announce and the hotkey
  registry; layer.js on useScrollLock; Field and Tooltip on useDescribedBy; Menu, Tooltip and Popover on useFloating;
  DirectionProvider at the app roots; Text variant=link uses to Link; the heading levels skipped on Calendar and Bookmarks.
- [ ] Owner: visited links look the same as unvisited (a new color role would be needed); SectionHeading levels drawn from the
  type scale (it would change Settings' headings).

## Native designs and the Plenix Platforms Standard on the web (added 2026-10-11)

Owner: every iOS and Android component gets the Plenix design (the Apple or Material default beside the Plenix control,
its anatomy, every attribute from token to code) and the web meets the Plenix Platforms Standard.
- [x] (0.31.34–0.31.37) The design of 25 iOS and 24 Android components (platform/standards/native-design.json); the native
  token files name every value (Border, Icon, Shape, Shell, Opacity, Motion, Component; Android dimens.xml).
- [ ] The Figma drawings of the 24 iOS components after Buttons: the Figma Starter plan's MCP tool-call limit stopped them.
  The scripts are ready (scratchpad native/*figma*.js, build-*.js); run them when the limit resets or on a higher plan,
  then add figma and images to each entry.
- [x] (0.31.39) Data values outside tables (slider and progress values) are Reddit Mono, the data role, on every platform: the
  Platforms Standard 3.4 and the font-roles rule agree (tables and property lists are DM Sans).
- [x] (0.31.39) Owner: on mobile, a conflict follows the platform's own guidelines: the iOS alert keeps Apple's width.
- [x] (0.31.36) Web wave A: drag alternatives, error states, the narrow DataGrid, its kept view, focus not obscured, touch
  tooltips, system appearance, input hints, reflow and target tests.
- [x] (0.31.38) Web wave B: a URL and history entry per screen, the unsaved-changes guard, list-detail at Narrow, view
  restoration, the Sheet, the inspector and search at Narrow; touch targets 907 → 366 under 44px, fine pointer 29 → 13.
- [x] (0.31.39) Web wave C: one back control at Narrow; the full-screen search fed by the apps; tabs that do not fit go into
  More; the calendar view and the DAM search in the address; reflow findings 15 → 0; touch targets 365 → 23 under 44px,
  mouse 13 → 0.
- [ ] The last 23 touch-target findings (tests/baselines/targets.json: DAM NavList pin and tag ×, DAM settings labels
  and info button, the Link button, the application header's items in its design-system sample, bulk selection).
- [x] (0.31.40) Typography: the 2026-10-04 rule everywhere, tables included; one data role at its neighbors' size; tests/typography.test.js
  (0 findings on 80 pages) and the flipped table test fail the build on any slip; native check.js the same.
- [ ] Owner: counts inside phrases ("7 files", "4,546 assets | 12.4 GB" in the DAM status bar): Mono for the number only, or
  wording in Sans as today?
- [x] (0.31.38) The token rename: 137 component tokens named from selector fragments (data-grid-background-2,
  pagination-page-hover-not-disabled-not-aria-current-…) now say what they style; values unchanged (visual test OK).

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
- [x] 5. (batch 282, 0.23.2) Image editor in steps: zoom, opacity, text on a 5% grid, palette text colors, filter presets, crop classes
- [x] 6. (batch 283, 0.24.0) The design system's sample styles: a generated class per token
- [x] 6b. (batch 285, 0.25.0) Tabulator drawn by Plenix. PROVEN in the prototype (Plenix - DAM/audit/tabulator-prototype/, 2026-10-09):
  zero inline styles with every feature working: sorting, row selection, widths as size-token classes (cssClass), a
  sticky class instead of frozen, editing (a custom editor: Plenix input), tree rows (indent by tabulator-tree-level-N
  class; expand and collapse work), grouping, row moving by native drag and drop (drop line as a class, row.move),
  row menus anchored to their button (no coordinates), column resize by switching the width class (snaps to tokens),
  paging (10 per page). How: renderVertical "basic"; Tabulator's own geometry writes switched off (cell and column
  width/height, header vertical align, row height normalising, holder sizing, frozen-rows holder width) and the tree's
  row layout replaced by one without indent. To do: move this into DataGrid and Table, a test that fails if a
  Tabulator update writes a style again, then the real tables (25 data-grid views, the reference test).
- [x] 6c. (batch 286, 0.25.1) The design system lab builds its grid as table markup and hands it to DS.table() (component-lab.js: the
  matrix and the properties table; Codex M-03): hand the rows to the Platform Table directly, with no markup
- [x] 7. (batch 283, 0.24.0) check-system rejects every style attribute, custom properties included; and a runtime test (Codex,
  owner yes 2026-10-09) that fails any page rendering an element with a style attribute

## A lightweight Plenix login, separate from Authentik (added 2026-10-10)

Owner: "i actually want a completely separate login for plenix. something lightweight". It covers both hosts:
plenix.lighthouseway.org (Authentik forward auth today) and design-system.lighthouseway.org. The owner meant the second to be
private, but on 2026-10-10 its pages, /cdn/ and apple-api.json answered 200 with no sign-in.
- [x] (2026-10-11) The design system host is private: Authentik forward auth on every page (NPM host 28, application
  "plenix-design-system"); only /cdn/ stays open for the apps. Database backup database.sqlite.bak-20261010-ds-private.
- [x] (0.31.36) The login is built: services/login (accounts with scrypt hashes, signed session cookies, the sign-in page in
  the Plenix design system, an accounts command, Nginx auth_request; tests/login.test.js). Save accepts its headers.

## Every Variant (the Button treatment for every component) (added 2026-10-09)

Owner: "every variant for every component to have navigation and design specs just like we did for the buttons". Say
"continue Every Variant" to pick it up. Each component gets: its values as component tokens, an "All" lab that draws
every variant with each value's token and an Edit dialog, and its own page per variant in the navigation.
- [x] Button, Field and the six form controls (batches 252-256)
- [x] Badge (0.17.0); Counter, Status dot, Notice, Spinner, Progress bar (0.18.0): 37 of 192 variants
- [x] Overlays: Dialog, Confirmation dialog, Side drawer, Toast (batch 316, 0.31.15)
- [x] Navigation: Tabs, Application header, Navigation rail, Product switcher, Action menu (batch 318, 0.31.17)
- [x] Data display, Forms, Content, Layout and the rest: all done (batch 333). Every component with variant cards has a lab and a page per variant (58 components).
- [x] Forms: Combobox, Search input, Color swatch, Drop zone, Rating (batch 333)
- [x] Content: Text, Heading, List, Code block, Keyboard hint, Avatar, Property list, Thumbnail, Icon (batch 333)
- [x] Layout: Stack, Divider, Columns, Responsive grid, Dashboard grid, Secondary pane, Inspector region, Record page (batch 333)
- [x] The rest: Empty state, Preview, Typing indicator (batch 333)
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
- [x] The 3 target-size issues are gone: the accessibility baseline has been empty since batch 218 (0 known issues on 143 pages, 2026-10-11).
- [x] (batch 257) Title Case labels: the Asset Manager's examples were already gone; across the suite, UI labels, actions and document headings are sentence case (the content standard); names stay (people, companies, products and apps, sample records, the product spec's entity, feature and module names).
- [x] The five layout modes: done in batches 217-218 (system/layout-modes.css, generated from the layout standard, draws each mode).

Next, in order (agreed after the Authentik set-up, 2026-10-08)
- [x] 1. Releases: 0.4.0 through 0.13.1 are out; the Asset Manager labels and the layout modes wait on the owner (above).
- [ ] 2. Save in the design system (item 8): Save opens a pull request; only Authentik Editors (and Admins) may save; a save service on the Plenix VM; the Authentik proxy provider and application (owner to approve Claude creating them through Authentik's admin shell).
- [x] 3. (batch 251) Starter template (item 12): plenix-ds/plenix-starter with a CDN (plain HTML) starter and a Vite + React + TypeScript starter, both on the shell, page kinds and tokens.
- [x] 4. Form controls on component tokens (item 9): Input, Select, Checkbox, Radio, Switch and Field get the Button treatment. Tokens done (batch 223); the shared lab (batch 252) and the labs of Text field, Text area, Native select, Checkbox, Radio group, Switch and Field (batches 253-256): an All page, 41 variant pages, the anatomy and the Edit dialog each; tests/labs.test.js proves every field moves its own property.
- [x] (batch 224) A compact Checkbox is 24px: no top and bottom padding in compact (owner chose A).
- [ ] Owner: create the DS_TOKEN secret so CI also tests the design system.
- [x] Claude (read-only, 2026-10-09): Proxmox backups checked. **Nothing is backed up**: /etc/pve/jobs.cfg has no backup job and no storage holds a backup (container 104 "infra", Authentik, included).
- [ ] Owner: set up Proxmox backups (where to: local, the Storage pool or a Proxmox Backup Server; how many to keep; when). Container 104 (Authentik) first.
- [ ] Single sign-on plan: every Plenix app and the design system's Save sign in through Authentik; Admins / Editors / Users drive permissions.

Every table is a Tabulator DataGrid (owner, 2026-10-08: "every table rebuilt"; the style: docs/data-grid-reference.html)
- [x] 1. (batch 226) Foundation: Tabulator 6.6.1 vendored, the DataGrid component (Tabulator's own column definitions), data-grid.css from the reference with tokens only, table tokens, icons; 180/180 parts match the reference.
- [x] 2. (batch 226) The apps' tables rewritten as DataGrids: 22 grid views (Files, Projects, Search workspace, Settings, the Asset Manager's home, system settings and field dialogs); tests/data-grid.test.js.
- [x] 3. (batch 226) The design system's own tables as DataGrids: the spec pages' React tables, DS.table for every table a page or lab builds (the button matrix in its frame too); 149 pages, no <table> left.
- [x] 4. (batch 226) Table, system/table.css and the 33 table tokens removed; ActivityList and PropertyList on the grid tokens; check-system rule tables and a pages-test check reject any table that is not a DataGrid.
- [x] 5. (batch 226) The Data grid page (#/data-display/data-grid): the rule, how to apply it, every part of the style with its tokens, density, light and dark, one live grid.

Themes and components (owner, 2026-10-08: "do the foundations and then the components")
- [x] Themes defined in the design system (platform/standards/themes.json), the current look as the "default" theme, switching (batch 219).
- [x] (batch 220) Foundations into themes: typography (families, weights, letter spacing), shape (radius, border widths and styles), motion (durations, easing), opacity and the focus ring become theme roles; components use only those roles. Shared, never per theme: spacing, control heights, density, grid, breakpoints, layers. The same palette color can serve many themes.
- [x] Every component gets the Button treatment: done in Every Variant (batch 333, 58 components with tokens, labs with the Edit dialog, variant pages).

Phase 3 · editable and governed
- [ ] 8. The save server. Decided: Save opens a pull request on GitHub (a save service on the Plenix VM applies the change, rebuilds, runs the checks, opens the PR); sign-in through the owner's Authentik (auth.lighthouseway.org), a "Plenix editors" group. Owner step: a proxy provider and application in Authentik (steps to follow).
- [x] 9. Variant pages and the token Edit dialog for every component: done (Every Variant, batch 333).
- [x] 10. Contribution model (batch 210): CONTRIBUTING.md (stages, who decides, the rules, the review checklist), a Component proposal issue form and a pull request checklist on GitHub.

Phase 4 · grow
- [x] 12. (batch 251) Starter template: plenix-ds/plenix-starter, a CDN starter (plain HTML, no build) and a Vite + React + TypeScript starter on the npm packages; both draw the same shell, navigation, DataGrid and ActionBar, tested in Chrome. Fixed on the way: the npm package's DataGrid found no Tabulator in a bundled app; it now loads the release's CDN copy.
- [x] (2026-10-09) CI ran nothing since batch 234: a colon in a step name broke ci.yml; fixed, and the tests now run with reduced motion (CI had read the start of batch 236's fades).

## Own mirror of the Plenix packages (owner chose option A, 2026-10-11)

Keep a copy of the @plenix-ds packages (and the plenix-ds repos) on our own servers, so installs keep working if GitHub is down and projects use one registry address.

- [x] Option A: Verdaccio on the Plenix VM, a proxy that copies @plenix-ds from GitHub Packages (services/registry).
- [ ] Deploy it on the VM (the container on 127.0.0.1:4873, data in /srv/plenix/registry): needs the owner's go-ahead; auto mode blocked writing the deploy step.
- [ ] Owner: the DNS record registry.lighthouseway.org; then Claude adds the NPM proxy host and certificate.
- [ ] Owner: a read-only GitHub token (classic, read:packages) in /srv/plenix/registry/github-token on the VM.
- [ ] Owner: your account: sudo /srv/plenix/registry/add-user.sh <name> on the VM; then the release runs prefetch.sh.
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
