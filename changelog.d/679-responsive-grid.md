### Changed
- DataGrid (#679, the owner's priority 1): every DataGrid, inside a SplitView too, is a full table while its visible columns fit its measured width. When they don't, it shows the row cards. The switch follows the grid's own width (its columns, plus the selection, row menu and view columns), not a fixed breakpoint, and it switches back when the table fits again.
  - Row cards: the key values first, as the primary and secondary lines, then every other visible field as a labeled detail. The checkbox, the action buttons and the row menu stay on the card. Nothing scrolls sideways. A card reads in the page's direction, and each value keeps its own reading order.
  - Nothing is pinned by default: no selection column, no row-label columns, no trailing row menu. `frozen: true` still pins a column, and the selection column pins beside it.
  - Sort, filters, groups, selection, the open row, the saved view and right to left carry across the switch. The cards are drawn in full; the table keeps its virtualization.
  - `narrow="table"` keeps a fixed table that may scroll sideways, the escape hatch for dense specialized grids. `narrow="list"` keeps the cards under `narrowAt`.
  - A static Table is unchanged.

### Upgrading from 0.79.0
- A grid that must stay a table in a narrow space passes `narrow="table"`. A grid that relied on row-label columns staying pinned marks them `frozen: true`.
