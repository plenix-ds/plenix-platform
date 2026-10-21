# DataGrid and Table: zero overlap

The last and largest part of the zero-overlap rollout (`tools/agent/zero-overlap.md`, Styling Standard 3.5 and 3.6).
On 2026-10-21, after lane A (#214), #213 and #216 merged, the backlog (`check-system.selector-kinds.json`) held:

| File | Selectors | Source |
| --- | --- | --- |
| `platform/components/DataGrid/data-grid.css` | 611 (603 combinators, 8 relational) | hand-written |
| `platform/components/Table/table-base.css` | 611 | generated from data-grid.css (build-steps.js): follows it |
| `platform/components/Table/table-steps.css` | 227 | generated (build-steps.js): the generator changes |
| `platform/components/Table/table.css` | 56 | hand-written |

Most DataGrid selectors start with `.plx-data-grid[data-plx-engine="next"] `, the scope from the engine migration, and then
reach through the grid, the header or a row into a part. They come out in batches by part. Every batch has no visual change,
is proved with `node tests/clash-audit.js --strict --check` and a styling proof (`tools/agent/proof-log.md`), and shrinks
the backlog (`node check-system.rules/selector-kinds.js --shrink`).

## Batches

1. **Sticky offsets and heights**: `[data-plx-sticky="…"]` on frozen cells and columns, `[data-plx-height="…"]` on the
   root reaching the table holder (a context value read by the holder).
2. **Header**: columns, titles, contents, the sort arrow and sorter, the header menu button. Sort direction, filtered and
   sortable become the column's own classes from the engine; the column's hover reaches its parts as context values.
3. **Rows and cells**: cell kinds, frozen and row-label cells, the selected and hover row (the row's state as context
   values for its cells), values, links in cells, editors, tree cells and their controls.
4. **Scrolling**: the table holder, the custom scrollbars and their thumbs, frozen rows.
5. **Groups**: group rows, bands, gaps, sticky group headers, summaries, the add row, probes.
6. **Menus, filters, pagination and the rest**.
7. **Table**: `table.css` by hand; `table-base.css` and `table-steps.css` follow from build-steps.js.

## Also in this work

- **Cells sitting 1.3 to 2px off center** (centered badge cells, DAM's checkbox columns, compact density): the behavior
  test's "vertical alignment not middle". It predates Phase 4; it is fixed in batch 3 by geometry (never a nudge).
- **Phase 4 text roles** for the 8 DataGrid and Table parts still on the migration backlog
  (`check-system.text-contract.json`).
