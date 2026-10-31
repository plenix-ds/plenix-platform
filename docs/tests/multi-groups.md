# multi-groups

Grouping a table by a field with several values (such as tags) shows a record under each value, yet selecting, editing, counting or deleting it treats it as one record.

- File: `tests/multi-groups.test.js`

## What it checks
- A record with two tags appears under both, but the row count, row positions and data count count it once; no internal display fields leak into the data.
- Number and text IDs (1 and "1") stay separate records.
- Selecting a record selects all its copies with one notice; selecting it again sends no duplicate; selection set by the app sends no user notice.
- Updating, editing a cell, changing tags, adding or deleting a record updates every copy from one record.
- Grouping by two multi-value fields gives each combination once, plus one group for empty values.
- Turning grouping on and off works; a custom group function and a custom sort are kept; empty and missing tag lists sort safely.
- With `useCollectionView`, grouping applies right after the page opens.
- Rows from a server (pages and load more): copies are shown but counted once; the footer shows the server's total; a new search drops a late page from the old search.

## Why it exists
- Issue #76 "DT-5: group by a multi-value field (tags) (RedSave #25)" (file header: "DT-5 public grouped APIs").
- Added in commit b8594c6e (2026-10-16) "0.42.0: Waves 14 A and 15 A, the rest of RedSave's DataTable list, RedSave fixes".

## How it checks
- Builds the DataGrid and `useCollectionView` from source with esbuild, loads them into `tests/fixtures/platform-host.html`, draws grouped grids with sample and fake-server records, and calls the grid's public functions.

## What a failure means
- A tagged record could be counted twice, selected in only one group, edited in one place but not the other, or deleted along with a different record that shares its number.

## When it runs
- A module of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid loads it into its own browser whenever data-grid has anything to check: a table view whose app or test-site page changed, a change to the DataGrid, DataGridEngine or Table, or a change to this file. In a full run it always runs.
- It does not run when data-grid is started with `DT_ENGINE=next`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- It can also be run alone: `node tests/multi-groups.test.js`.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The esbuild package, and `tests/fixtures/platform-host.html`.
