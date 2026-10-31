# row-line-559

A hovered or selected row in a table has a line above it that matches the line below it.

- File: `tests/row-line-559.test.js`

## What it checks
- DataGrid: a hovered row and a selected row (not the first) draw a top line of the same width and color as their bottom line, taken from the grid's line-width and row-line tokens.
- The first row, and only it, is marked as the first row; hovered or selected, it draws its top line inside its own top edge instead, again equal to its bottom line.
- A row that is neither hovered nor selected has no top line.
- Table: the same, with the hovered and selected states forced (a Table's rows are static).
- The Table's two row-line rules in the stylesheet are the DataGrid's rules with only the name changed, so the two stay the same.
- No script errors.

## Why it exists
- Issue #559 "Table and grid rows: selected and hover rows lack the top border".
- The file header explains the fault: a row clips what lies outside it, so the old top line never showed.
- Added in commit 5b0a24fc (2026-10-29) "#559 test: the top line of a hovered or selected row equals its bottom line (DataGrid and Table)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws a DataGrid and a Table, hovers and selects rows, and reads the computed styles and the loaded stylesheet rules.
- Its checks are grouped by part (DataGrid, Table) through `tests/check.js`, so one part can be run alone.

## What a failure means
- A highlighted or selected row would look open at the top, so a person could not see clearly where the row starts.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
