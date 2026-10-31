# page-h1

This test makes sure every Plenix app page has exactly one main title for screen readers, naming the page or the open item, even where the design shows no visible title.

- File: `tests/page-h1.test.js`

## What it checks
- 15 page views each have exactly one level-1 heading (h1), and it names the page or the open item:
  - hidden (the design shows no title): Dashboard, Projects list, a project's Risks page, Contacts list, Notes list;
  - visible: an open project ("Kitchen Renovation"), an open contact ("Maya Chen"), an open note ("Contractor comparison"), a project opened from the dashboard, Messages, Calendar ("March 2026"), Tasks, Bookmarks, Files, Settings ("General").
- A hidden heading uses the standard visually-hidden class, so nothing looks different.
- First it proves it can see the old problem: an empty state alone has no h1, and with VisuallyHidden as="h1" it has one, hidden.
- No script errors.

## Why it exists
- Issue #603: the dashboard started at level 2, and Projects, Contacts and Notes showed no heading in their default view. "Screen-reader users jump by headings, and the page title heading is their anchor." (issue and file header)
- Added in commit 643077e5 "#603: every suite page has exactly one level-1 heading (hidden where the design shows no title)".

## How it checks
- Headless Chrome at 1280 by 900 pixels opens each suite page (and its address for an open item), waits, and reads every h1 outside hidden parts.
- The proof step uses `tests/fixtures/platform-host.html`.

## What a failure means
- A screen-reader user would have no page title to anchor on, or would hear two competing titles, and could not tell which page or item is open.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it when VisuallyHidden or EntityHeader changes, or one of the suite apps (dashboard, projects, contacts, notes, messages, calendar, tasks, bookmarks, files, settings) changes, when a global file changes, or when `layout.test.js` itself changes. It also starts it when this test's own file, or a fixture it loads, changes (issue #756).
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job. The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built suite app pages, `tests/fixtures/platform-host.html` and the built Platform bundle.
