# data-grid-cell-187

A large table stays quick because cells that did not change are not redrawn, while edits, ticks and row menus still work.

- File: `tests/data-grid-cell-187.test.js`

## What it checks
- Redrawing the page with nothing changed does not rebuild any custom cell.
- Selecting a row shows the new state in its cell ("2 picked").
- Editing a record's data shows the new value in its cell.
- Only the edited or selected records are redrawn.
- A row menu that is closed does not build its items; opening it builds them once, and choosing an item runs it on the right row.
- Shift-clicking a range of checkboxes keeps a row that was already selected outside that range.

## Why it exists
- Issue #187 "DT-38: Rows and cells are not memoized; scrolling re-renders the whole table" (file header: "Task 187").
- Added in commit 5f12759e (2026-10-20) "perf: reuse custom cells and build row menus on demand".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, replaces the page with its own three-row DataGrid, and counts how often each custom cell and row menu is built while it selects, edits and clicks.

## What a failure means
- Scrolling or any small change could redraw the whole table, making large tables slow.
- A selected or edited row could show stale text, or a range of ticks could drop a row the person had already selected.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
