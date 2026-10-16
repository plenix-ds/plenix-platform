# Task #128: DataTableNext, a TanStack Table trial (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/128 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

The owner wants to **try** a DataTable built on **TanStack Table** (headless: it holds the state, we draw every element
in React) before deciding to replace Tabulator (2026-10-16): "make a new datatable using TanStack and try it; if it
works, we implement it throughout; it uses exactly the same styling and capabilities as we have now".

Build `DataTableNext` in its **own folder**, beside the current DataTable, without changing any existing table:

- **Same API.** The same props, callbacks and behavior as `DataTable` (its header comment in
  `platform/components/DataTable/DataTable.jsx` is the contract: `label`, `data`, `columns` and every column field it
  documents, `index`, `selectable`, `selected`, `onSelectionChange(keys, { count, hidden })`, `keepHiddenSelection`,
  `rowMenu`, `rowMenuButton`, `headerMenu`, `columnMenu`, `rowHeight`, `wrapHeaders`, `viewMenu`, `sort`, `groupBy`,
  `columnOrder`, `hiddenColumns`, `strings`, `empty`, `error`, `keyColumns`, `narrow`, `narrowAt`, `storageKey`, `mode`
  (fill, pages, load-more), editing, tree data, moving rows and columns, print, the floating scrollbars, and the rest).
  Where today's API exposes Tabulator itself (`on.rowClick(e, row)` with `row.getData()`, `options`), give a small
  compatible shim for what the applications actually use (grep them), and list what you could not shim.
- **Same look.** Draw the same DOM structure with the **same class names** the current grid has (`.tabulator`,
  `.tabulator-row`, `.tabulator-cell`, `.tabulator-header`, `.tabulator-col`, `.tabulator-group` …, and the
  `plx-data-table__*` ones), so `data-table.css` and `data-table-steps.css` apply **unchanged**. Do not edit those
  stylesheets for the trial; if a rule depends on something Tabulator computes, reproduce the class or attribute, not
  the rule. (Renaming to `plx-` classes is a later step, if the trial is adopted.)
- **The owner's style rule.** No style attributes, except sizes JavaScript sets that equal a Plenix token and sit on the
  grid (row heights, the virtual scroller's spacer heights, column widths rounded to whole grid steps), and 1px lines
  equal to `--plx-sys-border-width-thin` (the runtime style audit's rule, task #126).
- **Virtual scrolling** with `@tanstack/react-virtual`: row heights are fixed per row-height step and density, from
  the tokens, so every row's height is known without measuring.
- **Keyboard and accessibility** as today: the grid's roles, the row and cell focus, the arrow keys, Enter on a row,
  the header and row menus, the checkbox column, the live announcements.
- `useCollectionView` drives it unchanged (its view is React state already): no apply-after-build step anywhere.

Packages: add `@tanstack/react-table` and `@tanstack/react-virtual` (MIT) the way the build resolves dependencies
(read build-app.js; bundle them into platform.js, no runtime vendor path).

### Phases (one pull request each; each leaves every existing table untouched)

1. **Core:** rendering, virtual scrolling, sort, filter, selection (checkbox column, select all, hidden selection),
   column order, visibility and widths (fit to content, resize by dragging, frozen columns), row height steps and
   densities, the narrow list mode, `mode` fill and pages, the empty and error states, `storageKey`, the row menu and
   its button, the header menu. Prove it on the design system's DataTable pages with `?engine=next` (or a DS flag) and
   on two real screens behind a prop.
2. **The rest:** grouping (nested, multi-value), tree rows, editing, moving rows and columns (on `platform/utils/dnd.js`),
   load-more, copy, print, the floating scrollbars, the remaining cell kinds (bytes, deleted, avatar, tags, badge).
3. **Ready to switch:** a switch in `DataTable` (`engine="next"`) so the owner can flip one table or all; no default
   change in this task.

### Measure (in every pull request)

- `tests/data-table.test.js` runs against both engines (an environment flag or a parameter): every table view passes on
  DataTableNext, with the same checks.
- `tests/data-table-perf.test.js` (task #126's) runs against both: opening, restoring a saved view, a column toggled, a
  sort, a filter, scrolling 600 rows of rich cells; report both columns side by side.
- Screenshots of the same tables on both engines, light and dark: they must look the same.

### Files you own

- `platform/components/DataTableNext/` (new: the component, its hooks, its shim)
- `platform/exports/` a new `wDTN.js` exporting `DataTableNext` (and nothing else changes in the public API)
- `package.json` and `package-lock.json` (only the two TanStack dependencies)
- `tests/` (the engine flag in data-table.test.js and data-table-perf.test.js; new tests of your own)
- `lanes/dtn/design-system/parts/wDTN.records.js` (only to show DataTableNext on the existing data-table record's pages
  behind the flag; do not edit inventory.js)

Do not edit `platform/components/DataTable/` (task #126 owns it), the stylesheets, or the applications.

### Done means (phase 1)

- The quick gates pass: `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK).
- `node tests/data-table.test.js` passes on DataTableNext for every view phase 1 covers (list the ones phase 2 will).
- The perf comparison and the screenshots are in the pull request.
- One pull request from branch `codex/128-datatable-next`, `Closes #128` only at phase 3 (phases 1 and 2 say
  `Part of #128`), with what is done, what is left, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `platform/components/DataTable/DataTable.jsx` (its header comment: the contract) and `data-table.css`
3. `tests/data-table.test.js`, and #126's `tests/data-table-perf.test.js`
4. TanStack Table (column defs, sorting, filtering, grouping, expanding, column ordering, visibility, sizing, row
   selection) and TanStack Virtual
