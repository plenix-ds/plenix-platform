# pages

Every Plenix application page and every page of the St. John test site opens cleanly, with no errors, no plain tables, no boxes nested three deep and no inline styles the system forbids.

- File: `tests/pages.test.js`

## What it checks
- First, the style audit's own fixture: inside a person's own content (`.plx-user-content`) their color, background color, font, size and alignment pass; a stray margin there, a font on the interface and an off-grid size on the interface are caught: exactly 3 findings.
- For each page:
  - No console error (the style audit reports forbidden inline styles as errors), no page error, and no failed request (status 400 or more). Only the favicon and the work log (which lives outside this repository) may be missing.
  - No `<table>` that is not a DataGrid, in the page or its frames. A table a person wrote in their own content is allowed.
  - No three framed boxes nested inside each other (a framed box: a border on three or more sides, or an outer shadow). Design-system specimens are exempt.
  - No inline style the system does not allow: no custom property that is not a Platform one, no font family that is not a token, no height, line height or padding on a DataGrid row or cell, and every inline length a token or a whole number of 4px grid steps. Inside the chart engine, ECharts may write only a short list of its own sizes and fonts.
- A test-site page is not empty (its main area has at least 20 characters of text).

## Why it exists
- The St. John test site as the place the tests run: owner, 2026-10-25 ("the tests run on the site, not on the design spec"), in the file header.
- Containers nest two deep, never three: owner, batch 250, in the file header.
- Every table is a DataGrid: batch 226, in the code.
- Inline styles at run time: owner, 2026-10-13 (JavaScript may write inline styles only from tokens and defined styles; the output "has to conform to fit into the grid system"), in the code.
- A person's own formatting in user content: owner, 2026-10-14; the style audit fixture was put back here from the utilities test (#382 F7).
- ECharts' own inline sizes and fonts: owner, 2026-10-26, issue 353; the TreeChart font weight: charts-tree-26.
- Added in commit 4e8d647f "Versioning rules, changelog, and checks on every push (roadmap items 5 and 6)".

## How it checks
- Starts the local test server, which serves this repository at /Plenix/ and starts the St. John test site on first use at /Plenix/test-site/.
- Opens `tests/fixtures/platform-host.html` and runs the style audit (`platform/dev/style-audit.js`) on a small planted sample.
- Opens each suite application page (dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings) and the Asset Manager's four pages, then each test-site page, in a 1440 by 1000 window, and inspects the live page.
- In changed mode it opens only the pages of what changed; in a full run, every page.
- No baseline: any finding fails the page.

## What a failure means
- A person could meet a broken page: a script error, a missing file or a blank screen.
- A plain table could appear without the DataGrid's sorting, keyboard and styling.
- A screen could show boxes inside boxes inside boxes, which the standard forbids.
- Spacing or fonts could drift off the design system's grid and tokens.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` (changed mode, the pages of what changed) and `npm run test:full` (every page).
- CI: its own "pages" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "pages" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The St. John test site checkout (`tests/site.js`; default `../st-john-test-site` beside this repository, or SITE_DIR). The site loads this checkout's CDN build (`node build-packages.js`) and uses an in-memory database by default.
- The built suite pages and Platform (`node build-app.js`).
