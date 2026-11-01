# data-grid-responsive-679

A table shows as a full table while it fits its space and turns into readable row cards when it does not, so nobody has to scroll sideways to read or act on a row.

- File: `tests/data-grid-responsive-679.test.js`

## What it checks
- In a split view with a wide list panel, the grid is a table, and nothing is pinned: no sticky selection, column or row menu cell.
- Dragged narrower (the divider moved with the keyboard), the grid becomes row cards:
  - nothing scrolls sideways;
  - each card shows its other fields as labeled details;
  - each card keeps its checkbox, its row menu and its action buttons.
- The sort chosen in the table and the selected row are kept in the cards.
- A card's checkbox selects the row, its row menu opens, and a click or Enter opens the row.
- Dragged wide again, the grid is a table again.
- `narrow="table"` keeps a fixed table in a narrow panel, which may scroll sideways (the escape hatch for dense grids).
- `frozen: true` pins that column.
- All of it left to right and right to left.

## Why it exists
- Issue #679, the owner's priority 1 (the owner's report from AITEAM, 2026-10-30): the grid pinned its first column, selection and row menu and made narrow panes scroll sideways. It must behave like an Outlook list instead.
- The npm and release-page step of 0.79.0 waited on this fix (owner decision on #679, 2026-11-01).

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome and draws a SplitView whose first panel (as wide as its room allows since issue 873) holds a DataGrid with five 160px columns, selection, a row menu and an action column.
- Moves the divider with the keyboard, reads the grid's mode, its sideways overflow and each card's parts, clicks and presses keys, and records what the app receives.

## What a failure means
- In a narrow list a person could have to scroll sideways to read a row, could lose the checkbox or the row menu, or could see a stuck first column covering other columns.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it when the DataGrid, DataGridEngine or Table changes, or when this file changes. In a full run it always runs.
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main. Full suite: the "behavior" job.
- Written, not run (the owner starts the tests).

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
