# data-grid-high

The most important fixes to tables keep working: default sorts, remembered views, row menus, Arabic text direction, selection, and buttons inside rows.

- File: `tests/data-grid-high.test.js`

## What it checks
- Default sort (DT-1): a built-in starting sort is kept when the view has none; a view's own sort is applied and cleared; a sort the person set in the header is kept.
- Text direction (DT-9): table values and Text take their direction from their own text, so an Arabic cell reads right to left; an app can still set the direction.
- Row menu (DT-2, DT-3): the "Row actions" button is a named Tab stop, pinned to the end of the row, and opens the menu; an item's action runs; hiding the button keeps right-click; the button stays visible in the narrow list layout; an item with no handler warns once in development.
- Remembered view (DT-4): search, filter, quick filters, sort, grouping, columns and row height survive leaving and coming back; Reset view restores the start and removes the saved state; removed fields are dropped; broken or blocked storage starts fresh.
- Controls inside a row (DT-17): a button, link, field or marked control in a cell acts without opening or selecting the row; a normal row click still opens and selects.
- Open row (#453): the open row is marked (aria-current and the selected look); `openKey: null` leaves it unmarked; `openKey` marks a row without a click.
- Hidden selection (DT-11): selected rows hidden by a filter are counted and reported; `keepHiddenSelection: false` drops them; the command bar says "2 selected (1 hidden by filters)".

## Why it exists
- Issue #101 "Task: DataTable fixes for RedSave, high impact (DT-1, 2, 3, 4, 9, 11, 17)". Each check names its finding: #72 (DT-1), #73 (DT-2), #74 (DT-3), #75 (DT-4), #80 (DT-9), #82 (DT-11), #88 (DT-17).
- Issue #453 "DT-34: Open row is not marked (People)" (named in the check text).
- Added in commit 40168f0b (2026-10-15) "0.38.0: Waves 12 B/C, 13, 14 B/C, DataTable fixes, command bar in every app".

## How it checks
- Runs inside `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform), draws DataGrids, a View menu, a CommandBar and Text, clicks and presses keys, and reads the results.
- The warning check reloads the same page with development React at a 390px width.

## What a failure means
- A table could lose the person's sort or saved view, show Arabic text in the wrong direction, hide its row menu, open a row when a button inside it is pressed, or silently keep hidden rows selected.

## When it runs
- A module of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid loads it into its own browser whenever data-grid has anything to check: a table view whose app or test-site page changed, a change to the DataGrid, DataGridEngine or Table, or a change to this file. In a full run it always runs.
- It does not run when data-grid is started with `DT_ENGINE=next`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- It can also be run alone: `node tests/data-grid-high.test.js` (TEST_PORT picks the port).

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform of this checkout.
