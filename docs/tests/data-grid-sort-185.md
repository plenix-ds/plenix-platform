# data-grid-sort-185

A table does not sort all its rows again when nothing about the sort changed, and a custom sort still follows the chosen direction.

- File: `tests/data-grid-sort-185.test.js`

## What it checks
- Redrawing with the same sort does not call the sort function again.
- Switching to descending puts the highest value first, and the custom sort function receives "desc".

## Why it exists
- Issue #185 "DT-36: Every render sorts all rows again and rebuilds the column setup" (file header: "Task 185").
- Added in commit 90fbc290 (2026-10-20) "fix: bound DataGrid panes and reuse sort and width work".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a three-row grid with a counting sort function, redraws it with the same and then the opposite sort, and reads the first cell.

## What a failure means
- Large tables could slow down on every small change because every row is sorted again, or a custom sort could ignore the direction.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
