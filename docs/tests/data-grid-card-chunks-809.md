# data-grid-card-chunks-809

This test makes sure a data table with thousands of rows stays fast on a phone: in its card form it draws the first 100 cards, and more as the person scrolls, instead of all of them at once.

- File: `tests/data-grid-card-chunks-809.test.js`

## What it checks
- A table of 10,000 rows at 320 pixels:
  - shows cards; only the first 100 are drawn, with a marker after them;
  - the page answers at once;
  - the screen reader count is the full 10,001 (the rows and the header).
- Scrolling the table to the end draws the next 100, one chunk at a time.
- Arrow Down on the last drawn card draws the next chunk and moves to the next card.
- End on a card draws every card and moves to the last one; no marker is left.
- Select-all selects all 10,000 rows, not only the drawn cards.
- Tables of 100 rows or fewer (100, 30) draw every card and no marker, as before.
- At 1280 pixels the table is unchanged: virtualized, no marker.
- The same right to left. No script errors.

## Why it exists
- The reflow job timed out on the test site's Gifts page (10,000 gifts): at 320 pixels the table became cards and drew all 10,005 at once (200,461 elements, about 20 seconds). The card list was not virtualized (issue #679's decision 3).
- Issue #809, first step (the Tech Lead, P1): draw the cards in chunks. Full virtualization of the variable-height cards is #809's later step.

## How it checks
- Headless Chrome opens `tests/fixtures/platform-host.html` at 320 by 640 pixels (then 1280), draws a DataGrid of 10,000 rows, scrolls its scroll area, focuses a card's cell, presses Arrow Down and End, clicks the select-all box, and reads the drawn cards, the marker, the row count and the focused row.

## What a failure means
- A big table could freeze the page on a phone, or the keyboard could stop at the last drawn card.
- Select-all could miss the rows not drawn yet, or a screen reader could announce the wrong total.

## When it runs
- A child of `data-grid` (AUTOMATIC in `tests/run.js`): data-grid starts it when the DataGrid changes, or when this file changes. A full run always runs it.
- CI: the "behavior" browser job. Full suite: the "behavior" job.
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
