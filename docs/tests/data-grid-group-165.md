# data-grid-group-165

Grouping a table by any kind of field (text, yes/no, numbers, dates, tags) puts each record in the right group.

- File: `tests/data-grid-group-165.test.js`

## What it checks
- Grouping by text makes one group per value; grouping by yes/no gives "true" and "false" groups.
- Grouping by a number with a range of 10 makes buckets such as "[-10, 0)" and "[0, 10)".
- Grouping dates by month or by day gives the right number of groups, using UTC (world standard time); a week starts on Monday; a bad date gives no group.
- A custom bucket function (for example "Adult" for 18 and over) is used.
- Grouping by tags puts a record in each of its tags once (repeated tags count once), and the grouped record is the original record, not a copy.
- A saved grouping that names a field that no longer exists is dropped when the view opens.

## Why it exists
- Issue #165 "DT-23: Group by offers only choice fields, not every column" (file header: "Task 165").
- Added in commit cca74194 (2026-10-20) "Support grouping across collection field types".

## How it checks
- Node only, no browser: it loads the DataGrid's own source files (`platform/components/DataGrid/records.js` and `state.js`) and calls the grouping functions with sample records.

## What a failure means
- Grouping by a date, a number or tags could put records in the wrong group, count them twice, or fail to open a saved view.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid (components/DataGrid) changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`). Full suite (`full.yml`): the "behavior" job.

## What it needs
- Node only. No browser, no server.
