# empty-table-a11y-313

This test makes sure an empty table still has a correct structure for screen readers, with its "no data" message placed where assistive tools expect it.

- File: `tests/empty-table-a11y-313.test.js`

## What it checks
- An empty DataGrid and an empty Table (Plenix's two table parts), each with no rows:
  - each has a row group;
  - a row group holds only rows;
  - a row holds only cells;
  - the empty message sits in a cell of a row ("a row with one cell").
- No script errors.

## Why it exists
- Issue #313: an empty static Table had a row group with no rows, which axe (the accessibility scanner) reports as a critical failure (aria-required-children).
- Added in commit efd778db "An empty Table or DataGrid is valid ARIA: the empty message is a row with one cell (#313)".
- The structure is checked directly because the accessibility scan itself runs only on demand (owner, 2026-10-25, in the file header).

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1440 by 1000 pixels and draws an empty DataGrid and an empty Table.
- Walks the table structure as ARIA counts it (looking through elements with no role, skipping hidden ones).
- The header says the tables are mounted "on the St. John test site's page", but the code uses the fixture page.

## What a failure means
- A screen-reader user opening an empty table could hear a broken table, or not hear the "no data" message at all.

## When it runs
- A child test, started by `tests/data-grid.test.js` (AUTOMATIC in `tests/run.js`), unless DT_ONLY narrows that run to some table views.
- In changed mode, data-grid starts it when DataGrid, DataGridEngine or Table changes, or when this test's own file (or a fixture it loads) changes.
- In a full run it always runs.
- CI: with data-grid in the "behavior" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
