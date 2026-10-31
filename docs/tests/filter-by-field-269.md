# filter-by-field-269

"Filter by this field" in a column's menu opens the command bar's Filter panel on that field when the list has a command bar, and the column's own filter box when it does not.

- File: `tests/filter-by-field-269.test.js`

## What it checks
- The column menu has "Filter by this field".
- With a command bar: choosing it opens the command bar's Filter panel with a condition on that column (City), and no filter box opens in the column header.
- Without a command bar: the filter box opens in the column header, and no Filter panel opens.
- No script errors.

## Why it exists
- Issue #269 "DataGrid with a CommandBar: "Filter by this field" should open the command bar's Filter panel".
- Added in commit 45616cda (2026-10-24) ""Filter by this field" opens the command bar's Filter panel on that field when a CommandBar drives the grid (#269)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome and draws a three-person list twice: once with a CommandBar, Filter panel and DataGrid tied together by `useCollectionView`, once with a DataGrid alone.
- Each time it opens the City column's menu, chooses "Filter by this field", and reads what opened.

## What a failure means
- A person could get two different filters for the same list (one in the header, one in the command bar) that disagree, or no filter at all.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
