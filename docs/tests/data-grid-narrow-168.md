# data-grid-narrow-168

A table switches between a full table and row cards by whether its columns fit its space, in a split view and on its own, never by a fixed width.

- File: `tests/data-grid-narrow-168.test.js`

## What it checks
- Since issue #679 (the owner's priority 1) a DataGrid is a table while its visible columns fit its measured width, and the row cards when they do not, in a SplitView too. Before, a grid in a split view always stayed a table (#168), and a grid on its own switched at a fixed 600px.
- A split view grid whose columns do not fit its pane shows the cards; one whose columns fit shows the table.
- `narrow: 'table'` keeps a fixed table in a pane too small; `narrow: 'list'` shows the cards under 600px.
- A grid on its own in 560px: the table when its columns fit (480px), the cards when they do not (720px).
- When it shows the cards, nothing scrolls sideways.

## Why it exists
- Issue #168 "DT-30: The default narrow list (under 600px) takes over a SplitView list" (file header: "Task 168").
- Added in commit a3c37752 (2026-10-20) "fix: keep SplitView grids in table layout unless list is requested".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a 12-row grid in four set-ups (in a pane or alone, with and without a layout choice) and reads whether the grid has its narrow-list class.

## What a failure means
- A grid could scroll sideways when its columns do not fit, or turn into cards when they do fit, in a split view or on its own.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
