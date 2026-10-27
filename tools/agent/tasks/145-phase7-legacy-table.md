No tests: see HANDOFF.md (the owner runs them)

# Task #145: Styling Standard, Phase 7: the applications off LegacyDataTable, the legacy grid removed (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/145 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3 ·
Standard: `platform/standards/styling.md` (sections 12–14)

### Owner

Codex

### The task

Every table in the applications becomes the Platform's `DataTable` (the TanStack engine, `DataTableNext` through
`platform/components/DataTableNext/DataTablePublic.jsx`). Then the legacy the legacy grid table is removed from the Platform:

1. Move each use of `LegacyDataTable` (imported `as DataTable` in most files) to `DataTable`:
   - `suite/findSources.jsx`
   - `projects/projects.jsx`
   - `files/files.jsx`, `files/main.jsx`
   - `dam/app/assets.jsx`, `dam/app/dialogs/BrowseDialogs.jsx`, `dam/app/pages/home/HomePage.jsx`,
     `dam/app/pages/SystemSettingsPage.jsx`

   Keep every screen's behavior and words: columns, sorting, selection, row actions, grouping, editing, empty and
   loading states, keyboard behavior. Map the legacy grid-only options to the TanStack API; where an option has no
   counterpart, add it to DataTableNext (its own stylesheet and tokens) rather than dropping the behavior.
2. When nothing imports it any more, remove the legacy table:
   - `platform/components/DataTable/` (DataTable.jsx, legacy-grid.js, data-table.css, data-table-steps.css);
   - `platform/vendor/legacy-grid/`;
   - its export in `platform/index.js` (`LegacyDataTable`), its `@import`s in `platform/platform.css`, its
     generator branch in `build-steps.js` (the `plx-data-table` / `data-table-steps.css` entry);
   - its entries in `check-system.exceptions.json` (`cross-component` and `important` for the removed files; run
     `node check-system.rules/ownership.js --shrink`).
3. Remove the tests and docs that only covered the legacy grid; keep every test of behavior, pointed at DataTable.

### Files you own

- the application screens listed above; `platform/components/DataTableNext/` for missing options;
  `platform/components/DataTable/`, `platform/vendor/legacy-grid/`, `platform/index.js` (the export line only),
  `platform/platform.css` (the DataTable import lines only), `build-steps.js` (the legacy branch only),
  `check-system.exceptions.json` (via `--shrink` only), the legacy grid tests.
- Not any other component's stylesheet: Claude is working through Phases 2–6 of the Styling Standard in
  `platform/components/*` and `platform/patterns/*` at the same time.

Never edit generated files.

### Done means

- No `LegacyDataTable`, no `legacy-grid` anywhere outside the changelog and the work log.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK,
  including the `ownership` rule), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Proof on the touched pages (Styling Standard, section 13): `node tests/clash-audit.js --check --pages
  projects,files,dam,settings` lists no unexpected change; where the TanStack table's look differs from the
  the legacy grid one on an application page, list each difference with a before and after screenshot under
  **Needs the owner** (intended visual changes need the owner's approval).
- Every moved screen opens without console errors; `node tests/keyboard.test.js` and `node tests/navigation.test.js`
  pass.
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/phase7-legacy-table`, `Closes #145`, listing every screen moved, every
  option added to DataTableNext, anything left undone, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. `platform/components/DataTableNext/README.md` and the header comments of the files you edit
