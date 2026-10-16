# Task #140: the TanStack table becomes Plenix's DataTable (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/140 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Why

The owner decided (2026-10-16): the performance tests proved Tabulator does not perform well (#129: TanStack opens in
24–45 ms against 100–206 ms, sorts and filters 2–4× faster). **The design spec drops Tabulator completely and
documents the TanStack table**, so every new application is built on it. Moving the existing applications and the
spec's own tables off Tabulator is a later task; until then they keep working.

### The task

Finish `DataTableNext` (phase 1 is in main, 0.49.0) so it can be the only table the spec documents:

1. **Phase 2, every capability DataTable has** (its header comment is the contract): grouping (nested, multi-value,
   counts, collapse), tree rows, editing, moving rows and columns (on `platform/utils/dnd.js`), load-more, copy,
   print, the floating scrollbars, and every cell kind (bytes, deleted, avatar-name, tags, badge, and the rest).
   `DT_ENGINE=next node tests/data-table.test.js` passes on **every** view, the five phase-2 routes included.
2. **Its own markup and stylesheet, no Tabulator in it:** `plx-data-table__*` class names only (no `.tabulator*`
   class, attribute or comment), its own `platform/components/DataTableNext/data-table-next.css` on the existing
   `--plx-comp-data-table-*` tokens (the same look: same tokens, same geometry; prove it with the light/dark side-by-side
   captures), listed in `platform.css`. No new tokens unless a value has none; no new colors.
3. **No Tabulator words in its public surface:** no `options` pass-through, no `on.rowClick(e, row)` Tabulator row
   object in the documented API. Give Plenix callbacks instead (`onRowClick(row, event)` with the row's data,
   `onRowDoubleClick`, `onCellEdit`), and keep the phase-1 shim only as an undocumented adapter for the old apps.
4. **The engine switch (phase 3):** `DataTable engine="next"` renders DataTableNext with the same props, so the owner
   can flip one table or all later. No default change in this task.

### Files you own

- `platform/components/DataTableNext/` (everything in it, its new stylesheet)
- `platform/platform.css` (one import line), `platform/exports/wDTN.js`
- `platform/components/DataTable/DataTable.jsx`: only the `engine` prop that hands off to DataTableNext
- `tests/` (the engine flag, new tests)
- `lanes/dtn/design-system/parts/wDTN.records.js` (do not edit inventory.js; Claude rewrites the spec's DataTable pages
  after this lands)

Do not edit `data-table.css`, the applications, or the design system's own files.

### Done means

- The quick gates pass: `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK).
- `DT_ENGINE=next node tests/data-table.test.js` passes on every view; the perf test reports both engines.
- `grep -ri tabulator platform/components/DataTableNext` finds nothing.
- Light and dark captures of the same tables on both engines look the same.
- One pull request from `codex/140-datatable-tanstack`, `Closes #128` and `Closes #140`, with what is done, and
  **Needs the owner**.

### After it lands (Claude)

The spec's DataTable record documents the TanStack table under the name `DataTable`; the Tabulator engine is renamed
`LegacyDataTable` for the existing applications only, with no page, record or documentation in the spec; every
Tabulator mention in the design system, its docs (`docs/data-table-reference.html`) and STANDARD.md goes.

### Read first

1. `AGENTS.md`
2. `platform/components/DataTableNext/README.md` and phase 1's code
3. `platform/components/DataTable/DataTable.jsx` (the contract) and `data-table.css` (the look to reproduce)
