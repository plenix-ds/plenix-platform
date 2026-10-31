No tests: see HANDOFF.md (the owner runs them)

# Task #679: Responsive DataGrid default (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/679

## Owner

Codex

## Scope

The default DataGrid currently pins the leading row label or selection cell and the trailing row menu. In a split view, it stays a wide table and needs horizontal scrolling. Use the existing Plenix list presentation whenever the measured visible columns no longer fit the grid's own container, including SplitView. Keep explicit `frozen` and `narrow="table"` options for applications that request them. Preserve every visible field, selection, actions and keyboard access in the list.

## Files owned

- `platform/components/DataGrid/DataGridEngine.jsx`
- `platform/components/DataGrid/DataGrid.jsx`
- `platform/components/DataGrid/data-grid.css`
- `platform/components/DataGrid/scrollbars.jsx`
- `tools/agent/tasks/679-responsive-datagrid.md`

## Bugfix definition

- A wide container shows the full table. Reducing the container below the measured visible column width changes rows to a readable vertical list without a horizontal scrollbar; widening it restores the table.
- This transition works inside SplitView and standalone; changing column visibility or size updates the fit decision.
- The leading checkbox or row label and trailing row action are not pinned by default. A column marked `frozen` remains opt-in.
- A narrow row retains all visible field values, selection, row opening, edit and action controls. Grouped rows remain readable.
- Sorting, filters, saved view state and vertical scrolling continue to work. No application CSS override is required.

## Checks

Run the repository quick static and build gates. Application and browser tests remain off under the owner's direction.
