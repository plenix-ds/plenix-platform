# data-grid-search-149

Typing in a search box above a large table stays smooth, and the filtered rows stay in order.

- File: `tests/data-grid-search-149.test.js`

## What it checks
- Typing "Record 59" into a search above a 600-row, 11-column sorted grid leaves exactly the 10 matching rows, in sorted order.
- The selection is reported once, only when the selected record is hidden by the search.
- The filter runs at most once per record for each keystroke.
- Typing does not look up column widths separately for every record (fewer than 600 style reads).
- The search reuses one number-aware text comparer instead of building a new one each time.
- Column widths follow the density and spacing settings when they change.

## Why it exists
- Issue #149 "DT-27: Typing in the search blocks the page for ~0.3 s per key (600 rows)" (file header: "Task 149").
- Added in commit 90fbc290 (2026-10-20) "fix: bound DataGrid panes and reuse sort and width work".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a search box and a 600-row grid (light mode), counts calls to the comparer, the style reader and the filter while it types, then changes the density and checks a column's width.

## What a failure means
- Each keystroke could freeze the page for a moment on large tables, or the selection could be reported again and again.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
