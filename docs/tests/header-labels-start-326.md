# header-labels-start-326

This test makes sure every table column title lines up at the start (left) edge, number columns included, while the numbers in the cells stay right-aligned.

- File: `tests/header-labels-start-326.test.js`

## What it checks
- In a DataGrid and a Table, every column header label:
  - starts within 24 pixels of the header's start edge;
  - is not end-aligned, right-aligned or centered.
- For the "qty" and "price" number columns, the cell numbers still sit at the right.

## Why it exists
- The owner's rule (2026-10-25, in chat, quoted in issue #326): "i dont understand column that says quantity on the shelf ie right aligned... all column header labels should be consistent".
- The issue keeps cell numbers right-aligned, since the owner spoke only about the header labels.
- Added in commit b48bb7d5 "Every column header label at the start edge, number columns included (#326)".

## How it checks
- Opens its stage page `tests/fixtures/stages/header-labels-start.html` in headless Chrome at 1100 by 900 pixels, waits for at least 8 column headers, and measures each label's position against its header and each number against its cell.

## What a failure means
- Column titles would jump between left and right across a table, making it harder to scan; the owner reported this as inconsistent.

## When it runs
- A child test, started by `tests/data-grid.test.js` (AUTOMATIC in `tests/run.js`), unless DT_ONLY narrows that run to some table views.
- In changed mode, data-grid starts it when DataGrid, DataGridEngine or Table changes, or when this test's own file (or a fixture it loads) changes.
- In a full run it always runs.
- CI: with data-grid in the "behavior" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "behavior" job.
- Its stage page is a test fixture (`tests/fixtures/stages/`, since issue #772), so a change to it starts this test too.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The stage page `tests/fixtures/stages/header-labels-start.html` and `tests/fixtures/stages/stage.css`.
