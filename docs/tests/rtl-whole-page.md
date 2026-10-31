# rtl-whole-page

This test makes sure every Plenix app page still looks right when switched to Arabic (right to left): no sideways scrolling, titles starting at the right, and arrows pointing the right way.

- File: `tests/rtl-whole-page.test.js`

## What it checks
- For each suite app (Dashboard, Projects, Messages, Contacts, Calendar, Tasks, Notes, Bookmarks, Files, Settings) and the Asset Manager:
  - left to right first: no directional icon is mirrored;
  - then right to left (RTL, for Arabic): the page never scrolls sideways;
  - every visible heading and title reads right to left and starts at the right of its box (left-to-right islands, text that takes its own direction, centered text, charts and code are skipped);
  - every icon Plenix marks as directional is mirrored.
- Across the pages at least one directional icon is shown (the navigation pane arrow).
- No script errors.

## Why it exists
- Issue #413, step rtl-413-d: "the guard against regressions" for whole-page right to left (file header), a need of CTM 2.0.
- Added in commit 95efe574 "#413 rtl-413-d: CTM's question block as a fixture, a whole-page right-to-left check, and the migration note".

## How it checks
- Headless Chrome at 1280 by 800 pixels opens each app page, checks it left to right, then sets dir="rtl" lang="ar" on the page and measures headings, page width and icon mirroring.

## What a failure means
- An Arabic-speaking person could see a page that scrolls sideways, titles stuck at the left, or arrows pointing backwards.

## When it runs
- Started by hand only: `node tests/rtl-whole-page.test.js`.
- It is not in any group of `tests/run.js`, no other test starts it, and no `package.json` script or workflow names it. It does not run in CI or the full suite.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built suite app and Asset Manager pages.
