# data-grid-group-browser-165

The Group by list offers every column that can be grouped, and grouping by a date period or a number range works in a real table.

- File: `tests/data-grid-group-browser-165.test.js`

## What it checks
- The Group by panel lists every field that can be grouped (Name, Date, Number) and leaves out one marked as not groupable.
- Grouping by date per month gives one group; per day gives two.
- Grouping by a number field with its own range of 10 gives one group.

## Why it exists
- Issue #165 "DT-23: Group by offers only choice fields, not every column" (file header: "Task 165").
- Added in commit cca74194 (2026-10-20) "Support grouping across collection field types".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, replaces the page with a Group by panel and a DataGrid tied together by `useCollectionView`, then sets each grouping and counts the groups.

## What a failure means
- A person could not group a table by a date or number column, or the groups would be wrong.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
