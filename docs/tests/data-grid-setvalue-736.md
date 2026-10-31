# data-grid-setvalue-736

When an app changes a table cell from its own code, the change reaches the right record.

- File: `tests/data-grid-setvalue-736.test.js`

## What it checks
- Asking for a cell by the app's own record ID finds the record, for a text ID ("r10"), a number ID (3) and an ID already in the grid's internal form.
- Setting a cell's value hands the edit to the grid with the grid's own key, so the right record is changed (text and number IDs).
- Asking for a row by the app's ID works too.
- An ID that names no row gives no record, and asking whether such a row exists still answers "no".

## Why it exists
- Issue #736 "DataGrid: api.cell(...).setValue calls onCellEdit with an undefined record".
- The file header explains the fault: the grid keys rows in its own form ("string:r10", "number:3"), so a lookup by the app's ID found nothing and the edit was reported with no record.
- Added in commit 75fb3aeb (2026-10-31) "#736: api.cell/api.row take the application's id; setValue reaches the record".

## How it checks
- Node only, no browser: it compiles `platform/components/DataGrid/state.js` and `adapter.js` with Babel, builds the grid's public adapter over two sample records, and records each edit it receives.

## What a failure means
- An app that updates a cell from code (for example after saving) would report the edit with no record, so the change could be lost or saved to nothing.

## When it runs
- A child of `layout` (AUTOMATIC in `tests/run.js`): layout starts it as a separate process when the DataGrid (components/DataGrid) changes, or when this test's own file, or a fixture it loads, changes (issue #756). In a full run it always runs.
- CI: the "fixtures" browser job (`ci.yml`), which runs layout, on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "fixtures" job.

## What it needs
- Node only, with the @babel/standalone package. No browser, no server.
- It stops itself after a hard time limit (`tests/limit.js`).
