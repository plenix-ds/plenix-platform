# remote-fill-614

A table whose rows come from a server stops asking for more when the server runs out, starts over cleanly on a new search, and ignores a late page after a sort.

- File: `tests/remote-fill-614.test.js`

## What it checks
- The server claims 1,000 rows but has 100 (page 3 comes back empty): the table stops after page 3, asks for each page once, keeps the 100 rows, sets its row count to match, and leaves no loading row.
- The server claims 1,000 rows but has 120 (page 3 brings 20): it stops after page 3, and the last row is Record 120.
- A new search after page 2, in fill mode and in load-more mode: the next request is page 1 with the new search, and no request goes out for an old page number with the new search.
- A sort while page 2 is still on its way (the fake server answers late): the late page is not added; the list is the sorted page 1 only, and no loading row is left.
- No script errors.

## Why it exists
- Issue #614 "DataGrid remote fill: stop on an empty or short page; reset the page with search and filter (QA follow-ups on #612)".
- The file header says that before the fix the table kept asking for page 4, 5 and on without end, and a new search first asked for the old page number. The sort case guards the existing design.
- Added in commit 6cc1bab1 (2026-10-29) "#614 DataGrid remote: an empty or short page ends the list; search and filter reset the page in the same render".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome and draws DataGrids fed by fake servers in the page (50 rows per page), one set-up per case, scrolls them, changes the search or the sort, and records every request.

## What a failure means
- A server list could keep asking the server for pages that do not exist, show rows from an old search or an old sort, or keep a loading row forever.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks. Before issue #756 it was started by hand only.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test's own file (or a fixture it loads) changes. In a full run it always runs.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- By hand: `node tests/remote-fill-614.test.js`.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`. The "servers" are fakes inside the page; no network or database.
- It stops itself after a hard time limit (`tests/limit.js`, TEST_TIMEOUT_MS).
