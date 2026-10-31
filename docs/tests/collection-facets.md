# collection-facets

The counts next to each quick filter choice (for example "Red 2") are right and update with the other filters and the table's data.

- File: `tests/collection-facets.test.js`

## What it checks
- Counts use each field's own value; a record with a repeated tag counts once; a choice with no matches shows 0.
- The Group by panel offers every groupable field (text, dates, numbers, tags).
- A filter's counts ignore its own choice but apply the other quick filters, the search (any capitals) and the advanced filters.
- Date presets and custom date ranges count the same way; a grouping that hides empty groups is applied too.
- Counts given by the app win, including an explicit 0 and an intentional blank.
- Counts are in the data font (Reddit Mono) and add no inline styles.
- With no data source, no made-up zero counts appear.
- With a table connected, counts use each record once (not its repeated group rows) and refresh when the table's data changes or loads; replacing or removing the table drops the old listeners.

## Why it exists
- Issue #77 "DT-6: quick filters count their matches" (file header: "DT-6 faceted QuickFilter counts").
- Added in commit b8594c6e (2026-10-16) "0.42.0: Waves 14 A and 15 A, the rest of RedSave's DataTable list, RedSave fixes".

## How it checks
- Builds `useCollectionView` and QuickFilter from source with esbuild, loads them into `tests/fixtures/platform-host.html`, draws a quick filter with sample records and a fake table, changes the filters, and reads the counts.

## What a failure means
- The numbers beside filter choices could be wrong, so a person expects results that are not there, or misses ones that are.

## When it runs
- A module of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid loads it into its own browser whenever data-grid has anything to check: a table view whose app or test-site page changed, a change to the DataGrid, DataGridEngine or Table, or a change to this file. In a full run it always runs.
- It does not run when data-grid is started with `DT_ENGINE=next`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- It can also be run alone: `node tests/collection-facets.test.js`.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The esbuild package, and `tests/fixtures/platform-host.html`.
