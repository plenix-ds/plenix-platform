### Fixed
- `api.cell(id, field).setValue(value)` now reaches the row's record (#736). The adapter's `api.row` and `api.cell` took the id as the grid's own key (`"string:r10"`), so an application's id (`'r10'`, `3`) found no record and `onCellEdit` got no row. They now accept the application's id, and still accept the grid's key. Test: `tests/data-grid-setvalue-736.test.js` (written, not run).
