# semantic-html

This test makes sure every Plenix page has the structure that screen readers use to find their way: one header, one main area, named navigation, and headings in order.

- File: `tests/semantic-html.test.js`

## What it checks
- On every application page, the Asset Manager page and every St. John test site page:
  - exactly one main region;
  - exactly one banner (the page header), except on site pages without the site frame (sign-in, the public page);
  - at least one navigation region (same exception);
  - when there is more than one navigation region, each has a name;
  - at most one level-1 heading;
  - headings never skip a level going down (for example h1 straight to h3).
- One known exception: the test site's photo page has no navigation by design and shows h1 then h3 (ImageAnnotation has no heading-level option, a reported Platform gap).

## Why it exists
- Part of the library plan wave 2, the "Semantic HTML" page (file header).
- Added in commit 282b3543 "0.31.43: The complete library, wave 2; On this page by section".
- The header notes a matching static rule (clickable elements without a role) lives in `check-system.rules/semantic-html.js`; this test reads the drawn pages.

## How it checks
- Headless Chrome at 1440 by 1000 pixels opens each page, waits for it, and counts the visible landmarks and headings (hidden parts are skipped).

## What a failure means
- A screen-reader user could not jump to the main content or the navigation, could not tell two menus apart, or would hear headings that seem to skip sections.

## When it runs
- AUTOMATIC in `tests/run.js`.
- In changed mode: only the pages of what changed (`tests/changed.js`).
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- The full suite: its "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The St. John test site checkout (`tests/site.js`) with its database (in-process by default).
