# data-grid-select-167

"Select all" on a large table is quick, and clicking, Ctrl-clicking and Ctrl+Shift-clicking rows selects what a person expects.

- File: `tests/data-grid-select-167.test.js`

## What it checks
- Ticking the header checkbox selects all 600 records with one change notice, and still draws only the rows in view (fewer than 60).
- Unticking it clears all 600 with one change notice.
- After Select all, a plain click on a row selects only that row (issue #452).
- Ctrl-click on a row adds it to the selection (issue #452).
- Ctrl+Shift-click adds the range from the last clicked row (issue #452).

## Why it exists
- Issue #167 "DT-28: Select all takes ~0.35 s on 600 rows" (file header: "Task 167").
- Issue #452 "DT-33: Plain click does not select just that row" (named in the check text).
- Added in commit ed64570a (2026-10-20) "test: cover bulk key selection without expanding the grid window".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a SplitView with a 600-row, 11-column selectable grid, clicks the header checkbox and rows with the keys held, and counts the selected records and notices.

## What a failure means
- Select all could freeze large tables or draw every row; clicking a row could leave other rows ticked or fail to add to the selection.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
