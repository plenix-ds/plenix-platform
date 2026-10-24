# Task #142: the rest of Plenix off the legacy grid (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/142 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Why

Since 0.51.0 the public `DataTable` is the TanStack table (#141) and the design spec documents only it; the legacy grid
table is `LegacyDataTable`, kept for the existing applications (owner, 2026-10-16). What still runs on the legacy grid inside
the Platform is listed below. This task moves it, so that only `LegacyDataTable` (the apps) is left on the legacy grid.

### The task

1. **The static `Table`** (`platform/components/Table/Table.jsx`): today `TableEngine` with `isStatic`. Build it on the
   TanStack renderer: every row drawn (no virtual rows, no paging), no sorting, filters, menus or selection, narrow
   "table" by default, the same look and tokens (the Table page of the design system). No `.legacy-grid*` class.
   **It never scrolls** (owner, 2026-10-16): no scroll container inside it, vertical or horizontal; the table is as
   tall as its rows, a "wrap" cell grows its row to show all its text, and the columns share the width they are given
   (long values wrap instead of widening the table). Prove it on the spec's Overview and Purpose tables (Name / Value).
2. **The patterns and templates that import the legacy grid table directly**: AuditLog, ComparisonView, FileList,
   ImportWizard, PermissionsEditor, RenditionList, ReviewFlow, templates/Commerce/Account and Storefront,
   templates/templates/Templates. Point them at the TanStack `DataTable` (`../../components/DataTableNext/DataTablePublic.jsx`)
   with the Plenix props (no `options`, `on`, `onReady`).
3. **The design system's own tables** (the spec pages' `P.Table`, `DS.table` in ds.js, the labs): they follow from 1;
   the `.legacy-grid*` selectors in `platform/design-system/spec.css` and `ds-sample.css` become `plx-data-table__*`
   ones (through `lanes/142/design-system/`).
4. **Prove it**: `grep -ri legacy-grid platform/components/Table platform/patterns platform/templates` and the design
   system's files find nothing; the design system's pages load no `platform/vendor/legacy-grid` file (network check).

### Files you own

- `platform/components/Table/`, the patterns and templates listed above, `tests/`
- `lanes/142/design-system/` (spec.css, ds-sample.css, ds.js changes as lane files; do not edit inventory.js)

Do not edit `platform/components/DataTable/` (the legacy engine stays for the apps), `DataTableNext/` beyond what the
static Table needs (say what you changed), or the applications.

### Done means

- The quick gates pass; the greps in 4 find nothing; the Table page, the pattern pages and three spec pages with props
  tables look the same as before (light and dark captures, before and after).
- One pull request from `codex/142-off-legacy-grid`, `Closes #142`, with **Needs the owner**.

### After it lands (Claude)

The apps move from `LegacyDataTable` to `DataTable` (a later task the owner schedules); then `components/DataTable/`,
`platform/vendor/legacy-grid/` and the legacy export go.
