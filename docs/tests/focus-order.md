# focus-order

This test makes sure that pressing Tab moves through each Plenix page in the order a person reads it, and that focus goes into a dialog and comes back when it closes.

- File: `tests/focus-order.test.js`

## What it checks
- On every application page and every St. John test site page:
  - no element has a positive tabindex (a setting that would make it jump ahead of the reading order);
  - the Tab stops follow the reading order: none sits above the stop before it, or behind it on the same line;
  - on a page with a "skip to content" link, that link is the first stop.
- On the test site's member page: focus moves into the "Rename member" dialog when it opens, and back to its button when it closes with Escape.
- On a small made-up page, the developer focus-order overlay finds what it must: a positive tabindex, a row drawn in reverse, one stop per radio group; disabled, hidden and script-only elements are not stops; it draws one numbered badge per stop.

## Why it exists
- WCAG 2.4.3 Focus Order and 2.4.1 Bypass Blocks (file header).
- Part of the library plan wave 2, the "Focus order" foundation (file header).
- Added in commit 282b3543 "0.31.43: The complete library, wave 2; On this page by section".

## How it checks
- Headless Chrome at 1440 by 1000 pixels opens each page and loads the overlay's own checker, `platform/dev/focus-order.js` (PlenixFocusOrder.check).
- Counts the findings per page and compares them with `tests/baselines/focus-order.json`. A page fails only when it has more findings than recorded, so findings can only go down. Today four pages carry a small known "order" count: the Asset Manager, and the test site's directory, servants and photo pages.
- `--update` rewrites the baseline, only from a full run.

## What a failure means
- A keyboard user pressing Tab would jump around the page out of order, or miss the skip link.
- After closing a dialog, the user's place on the page could be lost.

## When it runs
- AUTOMATIC in `tests/run.js`.
- In changed mode: the app and test site pages that changed; the dialog check when Dialog or the member page changes; the made-up page when the overlay (a global file) or this test changes.
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- The full suite: its "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The St. John test site checkout (`tests/site.js`) with its database (in-process by default).
- The baseline file `tests/baselines/focus-order.json`.
