# remote-fill-522

A table whose rows come from a server loads more rows as the person scrolls, with no page buttons, and recovers when a page fails to load.

- File: `tests/remote-fill-522.test.js`

## What it checks
- The table asks for page 1 by itself and shows it; it tells screen readers the server's total row count (plus the header row).
- There are no page controls and no "Load more" button.
- Scrolled near the end, it asks for page 2, shows a "Loading records" row at the end while waiting, then adds page 2.
- When page 3 fails, one row at the end says the rows could not load and offers Retry; the rows already shown stay and nothing covers the table; it does not ask again by itself.
- Retry asks for page 3 again, adds it, and the failure row goes away.
- It never asks for two pages at once, and it stops at the total: page 20 is the last request, and the last row is Record 1000.
- A sort asks for page 1 again, with the sort, and replaces the rows.
- No script errors.

## Why it exists
- Issue #522 "Make full-container virtual scrolling the canonical DataGrid integration default", step 4 (owner: load as you scroll, no page controls, in the file header).
- The file header says that before this step the table ignored the server in this mode and showed "Nothing to show".
- Added in commit ea379292 (2026-10-29) "#522 step 4: a fill DataGrid with fetchRows loads rows from the server as the person scrolls".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome and draws a DataGrid fed by a fake server in the page (1,000 records, 50 per page, 300 ms each, page 3 failing once).
- It scrolls the table to the end repeatedly, clicks Retry and sorts, and records every request.

## What a failure means
- A long server list could stop loading, load the same page twice, show a blank table, or hide everything behind an error when one page fails.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks. Before issue #756 it was started by hand only.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test's own file (or a fixture it loads) changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- By hand: `node tests/remote-fill-522.test.js`.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`. The "server" is a fake inside the page; no network or database.
- It stops itself after a hard time limit (`tests/limit.js`, TEST_TIMEOUT_MS).
