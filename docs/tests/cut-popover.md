# cut-popover

When text in a table cell is too long and gets cut off, a person can open it in full.

- File: `tests/cut-popover.test.js`

## What it checks
- Pointing at a cell whose text fits shows no button.
- Pointing at a cell whose text is cut shows a "Show the full text" button.
- The button opens a popover with the whole text.
- No script errors.

## Why it exists
- Owner decision 2026-10-24, option B (in the file header and the commit).
- Issue #312 "Cut text opens in a popover (option B; builds on #309)" (named for this test in `data-grid.test.js`).
- Added in commit d771ac18 (2026-10-24) "Cut text opens in a popover (owner, 2026-10-24, option B)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws a two-row DataGrid with a 240px wrapping Note column (one long note, one short), hovers each Note cell, clicks the button, and reads the popover text.

## What a failure means
- A person could not read a long note, address or description that is cut off in a table, or would see a useless button on text that already fits.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test file changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
