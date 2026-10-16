# Task #126: DataTable on Tabulator the normal way, option B (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/126 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Start after

PR #123 (task #117, the rest of the DataTable fixes) is merged into main: this task edits the same files. Check the
plan of record (#3); when #117 shows as done, pull main and start.

### The task

The owner chose **option B** (2026-10-16): keep Tabulator, but use it the way grids are meant to be used. Today the
DataTable builds the table first and then applies the view step by step, and `strict.js` overrides Tabulator's own
rendering. RedSave measured the cost (`Redsave-v1/docs/plenix-datatable-issues.md` #19–#21, GitHub #72–#89 for the
others):

| RedSave | Where | What happens today |
|---|---|---|
| DT-19 | `restoreView` (DataTable.jsx, about line 474) | each saved column is moved with `column.move()`, then widths set, columns hidden one by one, then `setSort`: every step redraws every row. People (8 columns, 600 rows) froze about 15 s |
| DT-20 | `applyView` (about line 575) | the order check uses `getPrevColumn()`, which skips hidden columns, so with any hidden column it never matches and the column moves again on every load and view change; each move fires `columnMoved` → `redrawGroups` → `syncSticky`, which reads `holder.scrollTop` (a forced layout, 30–70 ms) even when the table is not grouped. Chats (14 of 18 columns hidden) froze 1.5–2 s per visit |
| DT-21 | after `setData` | `addFilter` (`refreshFilter`, a full redraw), then `setSort` (another), with `floatingScroll` and the virtual fill reading sizes in between: about 12 forced layouts per table on opening |

**1. State at build.** Build the Tabulator options from the view the table opens with (the controlled props from
`useCollectionView`, or the view kept under `storageKey`): the column definitions in their order, each with `visible`
and `width`; `initialSort`; the filter as `initialFilter` where Tabulator can express it, otherwise set once before the
first draw (for example build with the filter in place, then `setData`). The first draw is the right one. Delete the
apply-after-build steps of `restoreView` that this replaces.

**2. Changes batched.** A later view change (a column moved, hidden or shown, a width, the sort, the filter, the
grouping) computes what differs from the table's current state and applies only that, inside
`table.blockRedraw()` … `table.restoreRedraw()`: one redraw per change. Compare column order against `getColumns()` (every
column, hidden ones included), never `getPrevColumn()`/`getNextColumn()`. Hide and show columns together, not one redraw
each. When the column set itself changes, prefer one `setColumns()` to many moves.

**3. Layout reads.** `syncSticky` runs only when the table is grouped. Size reads (floating scrollbars, the virtual fill,
sticky group headers) happen once per animation frame, after Tabulator has drawn, never between its steps.

**4. Let Tabulator draw its rows (strict.js).** The owner's rule allows JavaScript to set sizes inline when the values
come from tokens and land on the 4px grid. So Tabulator may write its own row geometry again (row heights, positions,
its own virtual renderer), with its inputs from tokens: the row height step (`rowHeight`, density) read from the
`--plx-comp-data-table-*` tokens and passed as Tabulator's row height, so what it writes stays on the grid. Remove the
parts of `strict.js` that switch Tabulator's geometry off and replace its virtual renderer's measurements
(`virtualResync`, the token-height bookkeeping, `groupLayout`/`groupAt` if Tabulator's own grouping now does the job);
keep what only maps tokens into Tabulator's options and the column widths rounding to whole grid steps. Every value
Tabulator writes must still be on the grid: check it.

**Unchanged:** the public API (every prop and callback in DataTable's header comment), the look (the visual baselines),
the features (selection, editing, grouping, tree, moving rows and columns, the header and row menus, the floating
scrollbars, print, the narrow list), and every application. No inline style outside what Tabulator's engine writes.

### Measure (before and after, in the pull request)

Add `tests/data-table-perf.test.js` (it must skip cleanly without the design system and without Chrome): in a real page,
a 600-row × 8-column table, and an 18-column table with 14 hidden; with a saved view (`storageKey`: order, widths, hidden,
sort) and without. Measure with `performance.now()` around: build to first draw, restoring the saved view, toggling one
column, changing the sort, changing a filter; and count forced layouts if you can (the Performance API or a
`getBoundingClientRect` counter). Targets: opening under 150 ms, restoring a saved view under 300 ms, one view change
under 50 ms. Report the numbers before and after in a table.

### Files you own

- `platform/components/DataTable/` (DataTable.jsx, strict.js, tabulator.js, floatingScroll.js, data-table.css,
  data-table-steps.css only if the row geometry needs it)
- `platform/hooks/useCollectionView.js` (only if the view's shape must carry what the build needs)
- `tests/data-table.test.js` (keep every case passing; add cases for order with hidden columns and for a saved view),
  `tests/data-table-perf.test.js` (new)

Never edit generated files or the applications.

### Done means

- The quick gates pass: `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK);
  `node --check` on every JS file you wrote.
- `node tests/data-table.test.js` passes (every table view), and `node tests/run.js visual labs` passes for the data
  table (the look unchanged). Run these locally: CI may not start (billing).
- The perf test reports the targets met, with the before and after numbers in the pull request.
- No generated file in the branch. One pull request from branch `codex/126-datatable-normal`, `Closes #126`, listing
  what was removed from strict.js and why each removed piece is safe, anything left undone, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `Redsave-v1/docs/plenix-datatable-issues.md` #19–#21 (the measurements above are theirs)
3. The header comments of `DataTable.jsx` and `strict.js`; Tabulator's docs on `initialSort`, `initialFilter`, column
   `visible`, `blockRedraw` / `restoreRedraw`, `setColumns`, and its virtual DOM renderer
