### Changed
- The Asset Manager's home page (categories, collections and a category's assets) and the Files screen are on the
  command bar: the page's action at the start; search, Filter and the app's quick filters (Category, Type, Tags);
  Sort, Group, Columns and View; the count at the end; the selection bar under it. The old toolbar's filter dialogs,
  Sort menu, view switch and card-size switch are replaced by the panels and the View menu.
- Badges use the six status variants by name everywhere (neutral, success, active, waiting, action-required,
  negative); "In progress" is active and "Not started" and "Archived" are neutral.
- Badge `icon`: a status icon inside the badge, before the text. EntityHeader's live state is a small status badge with
  its icon instead of a dot (`live: { tone, icon, label }`); Notes shows "Saved" with a check and "Unsaved changes"
  with a pencil. The Asset Manager's status choices are badges with icons.
### Removed
- Token `entity-header-live-status-dot-margin-inline-end`.
