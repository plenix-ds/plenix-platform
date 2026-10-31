# data-grid-unread-164

New or unread records stand out in a list, as in Outlook, and stay marked correctly as a person opens them, sorts or scrolls.

- File: `tests/data-grid-unread-164.test.js`

## What it checks
- Unread rows are marked: the screen-reader name adds "unread", a 3px bar at the start of the row, and a semibold name.
- Opening an unread row marks it read and tells the app.
- Nothing extra (such as an "Unread only" button) is drawn above the column headers.
- "Unread only" shows only unread rows; the grid's ready-made unread commands (mark as read, the filter toggle) work.
- The same unread bar shows in a static Table and in a VirtualList, and opening a list item marks it read.
- A read delay keeps a row unread for a moment after it opens.
- The grid's mark read and mark unread calls and the row menu's "Mark as unread" update the count.
- An app can decide unread per record with a function instead of a list of keys.

## Why it exists
- Issue #164 "DT-32: No "new / unread" state for rows (an active grid, as in Outlook)" (file header: "Task 164").
- Added in commit b5176714 (2026-10-20) "Add keyed unread state across record views".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a three-row DataGrid, then a Table and a VirtualList with two unread records, clicks rows and reads the marks, styles and counts.

## What a failure means
- A person could not tell which messages or records are new, or rows would stay unread (or turn read) at the wrong time.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grid.
