# data-grid-scroll-147

When a table scrolls sideways, the column headers move with their columns and frozen columns stay in place, in English and in Arabic.

- File: `tests/data-grid-scroll-147.test.js`

## What it checks
- After scrolling sideways, each header stays exactly above its column (within 1px), and the header scrolls by the same amount as the rows.
- A frozen first column stays lined up with its header and stays pinned.
- The frozen header is drawn on top of the scrolling headers, and the frozen cell has a solid background.
- All of this holds after making the table wider or narrower, sorting, hiding a column, reordering columns and changing the columns.
- It is checked left to right and right to left (RTL, for Arabic).
- A table that fills the window ends at the page's bottom padding, so only the table scrolls, not the page beside it (issue #451).

## Why it exists
- Issue #147 "DT-24: Column headers do not move with the columns when the table scrolls sideways" (file header).
- Issue #451 "DT-44: Page scrolls as well as the table (Posts, Communities)" (comment in the file).
- Added in commit 1b228fb3 (2026-10-19) "Keep DataGrid headers and frozen columns aligned while scrolling".

## How it checks
- Opens the Dashboard page in headless Chrome only to get the Platform, draws a 4-column grid with a frozen first column in a 400px box, scrolls it sideways and measures header and cell positions after each change.
- Then draws a 200-row grid inside a PageContent and measures the space under it against the window height.
- `SCROLL_SCREENSHOTS=<folder>` also saves a picture of the scrolled grid.

## What a failure means
- Headers could drift away from their columns while scrolling, so a person reads the wrong label for a value.
- A frozen name column could slide away or show other columns through it.
- The page could scroll as well as the table, giving two scroll bars.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`). Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The Dashboard page of this checkout, which it opens only to load the Platform before drawing its own grids.
