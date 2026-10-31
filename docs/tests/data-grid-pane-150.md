# data-grid-pane-150

A table inside a pane shows its rows and fills its pane, even when the pane is further down the page than the window.

- File: `tests/data-grid-pane-150.test.js`

## What it checks
- A 600-record grid in a split-view pane fills the pane's own room (its scroll area is no taller than the pane).
- It draws a window of rows (more than 5, fewer than 60), not none and not all.
- The same holds when the pane is placed below the bottom of the browser window.

## Why it exists
- Issue #150 "DT-29: In a SplitView pane the default mode="fill" draws no rows" (file header: "Task 150").
- Added in commit bbd7e6b0 (2026-10-20) "fix: measure SplitView grid room independently of browser position".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a SplitView with a 600-row grid, once at the top and once pushed below the window by spacers, and measures the pane, the scroll area and the drawn rows.

## What a failure means
- A list in a pane could appear empty, or draw every row and slow down, depending on where the pane sits on the page.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
