# listing-page-522

A list page (ListingPage) fills the window with its table, scrolls only inside the table, and shows the chosen record beside it.

- File: `tests/listing-page-522.test.js`

## What it checks
- The table fills the room down to the bottom of the window (within one 24px gap), and the page itself does not scroll.
- The table scrolls inside, and only the rows in view are drawn (more than 5, fewer than 60 of 500).
- There are no page controls.
- The toolbar sits above the table.
- The chosen record's detail is a side panel beside the list, at its end.
- The table is named by the page title.
- No script errors.

## Why it exists
- Issue #522 "Make full-container virtual scrolling the canonical DataGrid integration default" (owner request: every DataGrid fills its container and scrolls inside, with no page controls unless asked for). This test covers step 2.
- The file header says that before this step ListingPage drew no toolbar, no detail and an unnamed grid.
- Added in commit b6823726 (2026-10-29) "#522 step 2: ListingPage is the full-room list starter (toolbar, grid props, a detail beside it)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1280 by 800, draws a ListingPage with a CommandBar, 500 records and a detail for record 3, and measures the table, the toolbar and the side panel.

## What a failure means
- On a list page, the whole page could scroll along with the table, page buttons could appear, or the record's detail could be missing or misplaced.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it as a separate process before its own checks. Before issue #756 it was started by hand only.
- In changed mode it runs when the DataGrid, DataGridEngine or Table changes, or when this test's own file (or a fixture it loads) changes. In a full run it always runs.
  - ListingPage lives in `platform/templates/`, which changed mode does not map to a part, so the grid's parts and the test's own file start it (as the comment in `tests/data-grid.test.js` says). A change there reaches the small fixed slice, which also starts it.
- It is skipped when data-grid is started with `DT_ONLY`.
- CI: the "behavior" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "behavior" job.
- By hand: `node tests/listing-page-522.test.js`.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
- It stops itself after a hard time limit (`tests/limit.js`, TEST_TIMEOUT_MS).
