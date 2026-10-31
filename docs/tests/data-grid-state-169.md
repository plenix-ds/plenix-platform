# data-grid-state-169

A table's saved view cannot bring back columns that were removed, and an app's choice to clear the sort is respected.

- File: `tests/data-grid-state-169.test.js`

## What it checks
- When a saved view names a removed column, that column is dropped from the saved sort, order, hidden list, grouping and widths; repeated names count once.
- A saved grouping on a removed field opens with no grouping.
- An app that passes an empty sort wins over the saved sort.
- A built-in starting sort is kept, unless the app is managing the view itself (it passes `onViewChange`).

## Why it exists
- Issue #169 "DT-31: Two remembered views for one table" (file header: "Task 169").
- Added in commit 2b21c593 (2026-10-20) "fix: share collection-owned view state with grid header actions".

## How it checks
- Node only, no browser: it loads `platform/components/DataGrid/state.js`, gives it a fake saved view, and reads what the opening view becomes.

## What a failure means
- A table could fail to open or show broken columns after an app removes a column, or a cleared sort could come back.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`). Full suite (`full.yml`): the "behavior" job.

## What it needs
- Node only. No browser, no server.
