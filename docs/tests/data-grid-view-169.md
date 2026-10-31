# data-grid-view-169

A table has one remembered view: sorting, hiding, grouping or resizing from the column headers is saved in one place and comes back the same.

- File: `tests/data-grid-view-169.test.js`

## What it checks
- When a list's view is managed by `useCollectionView`, it opens from that one saved view; a removed field in it is dropped.
- Sorting and hiding a column from the grid header update the saved view.
- The grid does not write its own competing saved view.
- After leaving and coming back, the hidden column stays hidden; grouping and a collapsed group are saved and restored.
- Resizing a column is saved.
- Reset view clears the sort and hidden columns and restores the column widths.

## Why it exists
- Issue #169 "DT-31: Two remembered views for one table" (file header: "Task 169").
- Added in commit 2b21c593 (2026-10-20) "fix: share collection-owned view state with grid header actions".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, seeds the browser's storage with an old grid view and a collection view, draws the grid, changes it through the grid's own calls, unmounts and mounts it again, and reads the storage.

## What a failure means
- A person's sort, hidden columns or widths could be lost, or two saved views could fight so the table comes back different each time.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
