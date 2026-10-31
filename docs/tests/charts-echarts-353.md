# charts-echarts-353

Line, area, bar and pie charts draw with the chart engine Plenix chose (Apache ECharts), load it only once, and bar and pie charts can be explored with the keyboard.

- File: `tests/charts-echarts-353.test.js`

## What it checks
- A LineChart, an AreaChart (stacked), a BarChart and a PieChart (donut) each draw their plot with ECharts inside the chart's engine area.
- The ECharts script loads once for the page, not once per chart.
- Bar and Pie answer the keyboard: one Tab stop, the arrow keys move between values, and each move is spoken in the live region (an announcement area for screen readers).
- No page error, no console error, and no style-audit finding: only the engine's own drawing may carry the sizes and fonts ECharts writes.

## Why it exists
- Issue #353, "Charts draw with Apache ECharts (owner decision): wrap ECharts in Plenix's chart components"; owner, 2026-10-26, in the file header.
- In the automatic set: owner, codex-q3-27, in the code and in `tests/run.js` (#382 F9).
- Added in commit 1c575b69 "Charts on ECharts: ready to ship (issue 353): the engine's exception in the page checks, a behavior test".

## How it checks
- Starts the local test server and opens `tests/fixtures/platform-host.html` in a 1280 by 1600 window, with the style audit (`platform/dev/style-audit.js`) added.
- Draws the four charts with sample giving and volunteer data using the real Platform, and waits until four ECharts drawings exist.
- Focuses the bar and pie plots, presses the Right arrow, and reads the live region.
- No baseline.

## What a failure means
- Charts could fail to draw, load the engine many times (slowing the page), break the design system's style rules, or be unusable for a person who relies on the keyboard or a screen reader.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` and `npm run test:full`.
- In changed mode it runs only when a global file changes (the small fixed slice; the code says a chart file counts as global) or this test's file changes. Otherwise it prints `CHARTS_ECHARTS_353_OK (nothing in scope)`.
- CI: the "fixtures" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The vendored ECharts library (`platform/vendor/echarts/`), loaded by the chart engine; no network.
