# treechart-echarts

Tree charts (such as an organization chart) draw left to right or top to bottom without overlapping labels, and can be explored and folded with the keyboard or a click.

- File: `tests/treechart-echarts.test.js`

## What it checks
- A tree of the St. John ministries (the parish, its two priests, their areas, twelve ministries), drawn left to right and top to bottom, at a desktop width (1280px) and a phone width (400px):
  - Both trees draw with ECharts' tree inside the chart's engine area, and the engine loads once.
  - No two labels overlap.
  - The keyboard follows the orientation: left to right, the Right arrow steps into a branch and the Left arrow folds it; top to bottom, the Down arrow steps in and the Up arrow folds, then steps back to the parent.
  - The live region (the screen-reader announcement area) says each node and whether it is open or folded.
  - A click on a priest folds his branch, and the chart gets shorter.
  - No style-audit finding (font weights come from the tokens), and no page or console error.

## Why it exists
- Owner, 2026-10-26, charts-tree-26: "I also need this in vertical and horizontal", quoted in the file header. Part of the move to ECharts, issue #353.
- In the automatic set with the other chart tests: owner, codex-q3-27, in the code.
- Added in commit 94aa6a30 "TreeChart on ECharts' tree, left to right and top to bottom (owner, charts-tree-26: "I also need this in vertical and horizontal")".

## How it checks
- Starts the local test server and opens `tests/fixtures/platform-host.html` at 1280 and 400px wide, with the style audit added.
- Draws two TreeCharts from data written in the test (the St. John ministries; it does not open the St. John site).
- Measures every label's box for overlaps, presses arrow keys and reads the live region, clicks a node and compares the chart's height.
- No baseline.

## What a failure means
- An organization or ministry chart could show labels on top of each other, ignore the chosen direction, or be impossible to explore with the keyboard or a screen reader.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` and `npm run test:full`.
- In changed mode it runs only when a global file changes (the small fixed slice; chart files count as global) or this test's file changes. Otherwise it prints `TREECHART_ECHARTS_OK (nothing in scope)`.
- CI: the "fixtures" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The vendored ECharts library (`platform/vendor/echarts/`), loaded by the chart engine; no network.
