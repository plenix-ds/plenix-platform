# data-grid-narrow-168

A table inside a split view (a list beside a detail pane) stays a table, instead of turning into a narrow list on its own.

- File: `tests/data-grid-narrow-168.test.js`

## What it checks
- A DataGrid in a pane keeps its table layout by default.
- In a pane, asking for the list layout (`narrow: 'list'`) gives the list; asking for the table gives the table.
- A grid on its own in a narrow space (560px) still switches to the list layout by default.

## Why it exists
- Issue #168 "DT-30: The default narrow list (under 600px) takes over a SplitView list" (file header: "Task 168").
- Added in commit a3c37752 (2026-10-20) "fix: keep SplitView grids in table layout unless list is requested".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a 12-row grid in four set-ups (in a pane or alone, with and without a layout choice) and reads whether the grid has its narrow-list class.

## What a failure means
- A list beside a detail pane could suddenly lose its columns and become a one-column list, even though the app asked for a table.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
