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
- Started by hand only: `node tests/listing-page-522.test.js` (its Usage line).
- It is not in any group of `tests/run.js`, no other test starts it, and no workflow or package.json script runs it.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
- It stops itself after a hard time limit (`tests/limit.js`, TEST_TIMEOUT_MS).
