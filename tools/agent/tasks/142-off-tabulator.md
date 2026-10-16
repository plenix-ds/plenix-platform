# Task #142: the rest of Plenix off Tabulator (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/142 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Why

Since 0.51.0 the public `DataTable` is the TanStack table (#141) and the design spec documents only it; the Tabulator
table is `LegacyDataTable`, kept for the existing applications (owner, 2026-10-16). What still runs on Tabulator inside
the Platform is listed below. This task moves it, so that only `LegacyDataTable` (the apps) is left on Tabulator.

### The task

1. **The static `Table`** (`platform/components/Table/Table.jsx`): today `TableEngine` with `isStatic`. Build it on the
   TanStack renderer: every row drawn (no virtual rows, no paging), no sorting, filters, menus or selection, narrow
   "table" by default, the same look and tokens (the Table page of the design system). No `.tabulator*` class.
2. **The patterns and templates that import the Tabulator table directly**: AuditLog, ComparisonView, FileList,
   ImportWizard, PermissionsEditor, RenditionList, ReviewFlow, templates/Commerce/Account and Storefront,
   templates/templates/Templates. Point them at the TanStack `DataTable` (`../../components/DataTableNext/DataTablePublic.jsx`)
   with the Plenix props (no `options`, `on`, `onReady`).
3. **The design system's own tables** (the spec pages' `P.Table`, `DS.table` in ds.js, the labs): they follow from 1;
   the `.tabulator*` selectors in `platform/design-system/spec.css` and `ds-sample.css` become `plx-data-table__*`
   ones (through `lanes/142/design-system/`).
4. **Prove it**: `grep -ri tabulator platform/components/Table platform/patterns platform/templates` and the design
   system's files find nothing; the design system's pages load no `platform/vendor/tabulator` file (network check).

### Files you own

- `platform/components/Table/`, the patterns and templates listed above, `tests/`
- `lanes/142/design-system/` (spec.css, ds-sample.css, ds.js changes as lane files; do not edit inventory.js)

Do not edit `platform/components/DataTable/` (the legacy engine stays for the apps), `DataTableNext/` beyond what the
static Table needs (say what you changed), or the applications.

### Done means

- The quick gates pass; the greps in 4 find nothing; the Table page, the pattern pages and three spec pages with props
  tables look the same as before (light and dark captures, before and after).
- One pull request from `codex/142-off-tabulator`, `Closes #142`, with **Needs the owner**.

### After it lands (Claude)

The apps move from `LegacyDataTable` to `DataTable` (a later task the owner schedules); then `components/DataTable/`,
`platform/vendor/tabulator/` and the legacy export go.
