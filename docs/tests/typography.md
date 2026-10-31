# typography

Text in Plenix uses the right typeface: DM Sans for words, Reddit Mono for codes, dates, sizes and other technical values, and the two sit neatly on one line.

- File: `tests/typography.test.js`

## What it checks
- Role: anything marked as code or data (code blocks, keyboard keys, a data field, a data column of a table, a data value in a property list) shows in Reddit Mono.
- Prose: Reddit Mono is never used for a plain sentence (four or more ordinary words).
- Pattern: text that is only a technical value shows in Reddit Mono. Examples: 2026-10-11, Oct 11, 2026, 10:42 AM, 12 MB, 640×480, v1.2.3, report.pdf, #1234, a long ID. Badges, tags, buttons, fields, menus, navigation and headings keep their own type.
- Baseline: Reddit Mono and DM Sans text on the same line of the same row sit on one baseline (the line the letters rest on), within half a pixel.
- Table: in every DataGrid and Table, body text is at the grid's own size setting, in Reddit Mono for data columns and in DM Sans elsewhere. Header titles are weight 600. Row-label text is weight 500.
- Phrase: a count inside a phrase ("7 files", "4,546 assets", also with Arabic digits) has its number in Reddit Mono and its words in DM Sans.

## Why it exists
- The typography rule: DM Sans for all interface text, Reddit Mono only for code and technical values, at the neighbors' size so both share a baseline. Owner decision 2026-10-04, restored 2026-10-11; Platforms Standard 3.4 (in the file header).
- Added in commit 3542d840 "0.31.40: Typography rule restored and enforced".
- The table checks were moved here from the grid test (#382 F2). One size in tables: owner, batch 247. Typefaces by kind: 2026-10-11. Header weights: batch 248 (in the file header).
- The phrase check: issue 260, owner decision 2026-10-24 (in the file header).
- It runs on the St. John test site, not the design spec: owner decision 2026-10-25. Light mode only: owner decision 2026-10-26, "dark mode comes last" (in the file header).

## How it checks
- Opens each suite app page (the ten apps' first pages, the four Asset Manager pages, and seven more settings screens) and every page of the St. John the Beloved test site.
- Uses a 1440 × 1000 window, light mode, reduced motion, and waits for the fonts to load. Clears saved settings (local storage) on each app page first.
- Walks every visible piece of text and reads its computed typeface, size and weight. For the baseline check it measures each text's line with the font's own measurements.
- Counts the findings per page and check, and compares them with `tests/baselines/typography.json`. It fails only when a page has more findings than recorded, so the count can only go down.
- `--update` records a new baseline, but only in a full run (`TEST_SCOPE=full`), and the baseline may only shrink.

## What a failure means
- A date, size or file name shows in the word typeface, or a sentence shows in the code typeface.
- Words and numbers on one line sit at different heights and look jumpy.
- Table text has the wrong size or weight, so tables look uneven.

## When it runs
- AUTOMATIC group in `tests/run.js`.
- `npm test` (changed mode): only the app pages and site pages touched by what changed.
- CI (`ci.yml`): the "typography" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the "typography" browser job, every page.
- By hand: `node tests/typography.test.js`, or `npm run test:typography`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The St. John test site checkout (`SITE_DIR`, default `../st-john-test-site`) and this checkout's local CDN build in `release/cdn/<version>/` (`node build-app.js`, then `node build-packages.js`).
- A database for the site: an in-memory one by default; in CI, the job's throwaway PostgreSQL 16.
- The baseline file `tests/baselines/typography.json`.
