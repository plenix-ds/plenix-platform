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
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when AppShell changes, or a part built on it changes, or when any suite app (dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings) or the Asset Manager changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/rtl-whole-page.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built suite app and Asset Manager pages.
