### Added
- CommandBar (owner's command bar standard): one white framed bar fixed at the top of the content; layouts `one`
  (actions left, find and view right), `split` (many actions: an action bar over the find bar) and `view` (no actions).
  Ghost buttons; icon and label when the bar fits, icons only with tooltips when it does not, then actions fold into
  More actions from the end (danger last). Sort, Filter, Group, Columns and View are never merged.
- Find panels: FilterPanel (Where / and / or, operators by field type, condition groups), SortPanel, GroupPanel
  (subgroups, collapse and expand all), ColumnsMenu and ManageColumnsDialog (reorder, show and hide, first column),
  ViewMenu (layout, card size, row height), QuickFilter (searchable checklist, date presets and range).
- utils/fields.js and hooks/useCollectionView.js turn the panels' state into DataTable props.
- DataTable props `filter`, `sort`, `groupBy`, `columnOrder`, `hiddenColumns`; a header chevron opens the column menu.
- SearchField `width="bar"` (240px) and `width="fill"`; `collapsed` turns it into an icon that opens across the bar.
### Changed
- BulkActions is the selection bar under the command bar: actions, Select all, Clear, and "N selected" at the far end;
  every action always shows, disabled with a reason until it applies (`actions[].disabled`, `actions[].why`).
  **Breaking:** `strings.selected` is now the template `'{n} selected'`.
- Button caret: the thin chevron (expand_more) in the muted color.
- DataTable: no view button by default; row height comes from the View menu.
- Group-by icon: view_agenda.
