# reflow

On a phone-width screen (or at 400% zoom), Plenix pages scroll in one direction only, and no text or control is cut off at the edge.

- File: `tests/reflow.test.js`

## What it checks
- Each app page, seven extra settings screens, and each St. John test-site page, in a window 320 CSS pixels wide (the same as 1280px at 400% zoom).
- Three kinds of finding:
  - page-scroll: the page itself scrolls sideways.
  - scroller: an area inside the page scrolls sideways.
  - cut-off: visible text or a control reaches past the window's edge where nothing scrolls to it. Text that ends in an ellipsis is allowed.
- Content that needs two directions is exempt, as WCAG allows: data grids, the calendar's time grid, pictures, maps and diagrams, the image editor's canvas, the media viewer, preformatted code and design-system specimens. Exempt scrollers are counted in the report.
- Before the pages, it starts two child tests: `commandbar-find-fold-274` (when the CommandBar changed) and `segmented-fold-276` (when the SegmentedControl changed).

## Why it exists
- WCAG 2.2 SC 1.4.10 Reflow (level AA) and Platforms Standard 3.5, named in the file header.
- The extra settings screens: owner, 2026-10-13 ("every settings page is cards of rows; the settings-cards rule"), in the code.
- A baseline may only go down and is never written from a partial run: #382 F6 (in `tests/changed.js`).
- Added in commit cecf75a1 "0.31.36: Native designs for every component; web conformance; Plenix login".

## How it checks
- Starts the local test server (with the St. John test site behind it) and opens each page in a 320 by 640 window.
- Measures the page's width, every element that scrolls sideways, and every text or control's position against the nearest clipping edge.
- Compares the counts with the baseline `tests/baselines/reflow.json` (page, kind of finding, number of elements). It fails only on a finding that is new on a page or affects more elements than recorded, so known findings can only go down.
- `--update` rewrites the baseline, only in a full run, and only when no entry grows.

## What a failure means
- A person on a phone, or using browser zoom, would have to scroll sideways to read, or would lose words or buttons past the screen's edge.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` (changed mode, the pages of what changed) and `npm run test:full` (every page).
- CI: its own "reflow" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "reflow" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The St. John test site checkout (`tests/site.js`), which loads this checkout's CDN build (`node build-packages.js`).
- The baseline file `tests/baselines/reflow.json`.
