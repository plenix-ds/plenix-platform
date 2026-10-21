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

1. **Sticky offsets and heights** (done: 3b8cdd21): `[data-plx-sticky="…"]` on frozen cells and columns, `[data-plx-height="…"]` on the
   root reaching the table holder (a context value read by the holder).
2. **Header** (done: 993fe052): columns, titles, contents, the sort arrow and sorter, the header menu button. Sort direction, filtered and
   sortable become the column's own classes from the engine; the column's hover reaches its parts as context values.
3. **Rows and cells** (done: a07a4ac4): cell kinds, frozen and row-label cells, the selected and hover row (the row's state as
   context values for its cells), values, editors, tree cells and their controls. The grid's modes are the parts' own classes
   (row --narrow, --virtual; cell --narrow, --sized, --lines, --after-lead, --bare, tree level; value --wrap, --sized,
   --lines); row actions fade on their wrapper (__portal--actions). Links in cells (`__portal > a`) stay for batch 6.
4. **Scrolling** (done: 77f357c4): the grid, the table holder and the table (fill, the drawn window and the list as their
   own classes), the custom scrollbars and their thumbs (axis and size on the thumb; the grid's hover as context values). The
   holder hides its native scrollbar through the base's hook `--plx-sys-scrollbar-width` (scrolling.css); touch hides the
   bars through `--plx-sys-touch-hidden` (interaction.css). Frozen rows were never rendered.
5. **Groups** (done: 1cf47ff6): group rows, heads (--gap), cells (--first, --summary, --add, --narrow), labels
   (--level-N), values (--data), counts, summaries, the add row, bands, sticky group copies, virtual gaps; the group row's
   focus reaches its head as context values; the eyebrow is the grid's own span in the eyebrow role. Probes, spacers and
   group toggles were never rendered.
6. **Menus, filters, pagination and the rest** (done: 320bda22): the empty message (whole body role), the footer, the
   placeholder, the type icon; a custom cell's own elements take `__cell-content` (a lone link fills its cell through
   `a.plx-data-grid__cell-content`); the row-menu cell sizes its button through Button's context hooks
   (`--plx-comp-button-context-width`, `--plx-comp-button-context-min-height`). Menus, popups, filters and the old footer
   were never rendered; the pages and load-more margins never matched. Data cells are `__grid-cell--data` (Phase 4).
7. **Table** (done: c1a0d260): Table is the engine's static mode; its parts take `--static` from the engine and
   data-grid.css styles the mode once (state variables in the base rules), generated for Table into table-base.css. table.css
   keeps only `.plx-table__portal{display:contents}`. `check-system.selector-kinds.json` lists no DataGrid or Table file;
   the strict audit on the 14 application pages reports no new overlap (ZERO_OVERLAP_OK).

## Also in this work

- **Cells sitting 1.2 to 2.2px off center** (the behavior test's "vertical alignment not middle"): found, not applied (a
  pixel change waits for the owner). Cause: a custom cell's content sits in the inline `__portal` wrapper, so a badge or
  icon rides on the wrapper's text baseline instead of being centered by the cell (Table is exact: its portal is
  `display: contents`). Fix by geometry: `.plx-data-grid__portal:where(:not(.plx-data-grid__portal--actions)){display:contents}`
  (the actions wrapper keeps its box for its fade); badges and icons in custom cells move up 0.6 to 1.1px. Measured: a
  centered badge, compact 6.6 / 5.4px above / below, standard 9.1 / 6.9, comfortable 13.1 / 10.9.
- **Phase 4 text roles** for the 8 DataGrid and Table parts still on the migration backlog
  (`check-system.text-contract.json`). Done in batches 5 and 6: group count, summary value, value, the empty message and data cells (and Table's); the
  migration list holds no grid part.

## Lessons from batches 1 to 3

- Prove each batch by computed values before and after, in every state the part has (rest, hover of each column, sorted
  both ways), not only the strict overlap audit: the audit keys pairs by selector text, so renamed rules show as new and
  gone, and Table's duplicates of its base only became visible once the base selectors changed.
- Old rules can be dead: classes the engine never renders (cell--view, cell--select, grid-moving, drop, hidden,
  grid-frozen-left, __resize in the header) and selectors CSS rejects (:has() nested in :has()). Check the JSX before
  carrying a rule over.
- table.css repeats much of its base with the same values; where it overrides a flat base it wins by specificity, so
  remove the duplicate declarations rather than keep them.
- A media condition may only set tokens (condition-not-token). Reduced motion is the duration tokens (0s); a
  transition-property:none rule is not carried over.
- The test browser runs with prefers-reduced-motion: reduce.
- `tools/agent/datagrid/compare-states.js` proves a batch: every grid element, ~100 computed values, its ::before and
  ::after and its box relative to its grid, grid by grid, in every state (rest, rows hovered, selected, edited, a group
  closed, scrolled, the grid hovered). A grid whose text differs is skipped and named (the spec's documentation tables
  list the stylesheet's own rules). `--agg` totals every distinct difference.
- A class the engine only uses at run time is not dead: `__length-probe` is the span tokenPixels (environment.js)
  appends to measure a calc() length; without its rule a grouped grid drew one row more. Grep the JS, not only the JSX.
- Table: where the base goes flat, table.css's rules for the same parts start winning, including the ones that used to
  lose (a wrapped value's padding). In each batch remove from table.css what repeats its base or already lost to it.
