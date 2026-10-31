# data-grid-window-184

A long list inside a split view draws only the rows in view, so it stays fast.

- File: `tests/data-grid-window-184.test.js`

## What it checks
- A 600-row grid in a SplitView pane stays inside the pane, and its scroll area fits the pane.
- The grid has a real scroll area (the rows are taller than it), and fewer than 60 rows are drawn.
- When the list scrolls a little, the rows still in view are reused, not rebuilt.
- It checks this with a height of 100% and with no height given.

## Why it exists
- Issue #184 "DT-35: In a SplitView the row window draws every row" (file header: "Task 184").
- Added in commit 90fbc290 (2026-10-20) "fix: bound DataGrid panes and reuse sort and width work".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a SplitView with a 600-row grid in a box of fixed height, measures the pane, the scroll area and the drawn rows, then scrolls and counts how many cells are built.

## What a failure means
- A list beside a detail pane could draw every row, making the page slow, or grow past its pane.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
