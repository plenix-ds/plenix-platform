### Changed
- The command bar swaps on a selection (owner, 2026-10-15; Microsoft 365): one bar of one height, the table never moves.
  With rows selected, the page's actions, the search and the filters give way to the selection's commands (Delete
  last); Sort, Group, Columns and View stay where they are; the bar ends with "× N selected", which clears the
  selection (Escape in the bar does too). The swap is announced. The count stays in the bar.
  New: `CommandBar selection={{ count, actions, onClear, noun, plural, label }}`. **Breaking:** `layout="split"` (a
  separate action bar) is retired and draws one bar (many actions fold into More); the selection bar under the bar
  (BulkActions as `selection`) is replaced by the swap.
- BulkActions is for pages without a command bar.
- The Asset Manager's home page uses the swap (categories, a category's assets).
- DataTable: floating scrollbars. The table body's scrollbars float over the rows and take no room, so Tabulator no
  longer writes a margin on the header row (the off-grid 10px). Thin thumbs (the Platform's scrollbar color), shown
  while the pointer is over the table or focus is in it; drag a thumb or press its track. Browsers without
  scroll-driven animations and anchor positioning keep the thin native bars.
### Fixed
- DataTable: the select-all checkbox no longer moves on hover. The header's hover reserved room for a filter or menu
  button in every column; the select column has none, so its checkbox shifted and shrank. It now reserves nothing.
- DataTable selected rows (light theme): blue-200; a selected row under the pointer: gray-100 (owner, 2026-10-15). No
  border around selected rows (fill only, as the standard systems do; the outline stays the focus indicator).
