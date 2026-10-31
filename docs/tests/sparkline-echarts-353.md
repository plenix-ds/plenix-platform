# sparkline-echarts-353

Small inline trend charts (sparklines) draw with ECharts, look exactly like the older version they replaced, stay accessible, and many of them still draw quickly.

- File: `tests/sparkline-echarts-353.test.js`

## What it checks
- Line, area (with the latest-value dot) and bar sparklines, inline in text and filling their space, each draw a live ECharts chart inside the chart's engine area.
- The ECharts script loads once for the page.
- Each sparkline is an image named by its label and its trend.
- The latest-value dot shows only when asked for (on the area, not on the line).
- Side by side with the old SVG sparkline (redrawn in the test from the same scales), each case lands on the same pixels, within half a pixel: the line, the area band (flat runs too), the latest dot (a single value at the start edge) and the bars (no outer gap).
- No style-audit finding.
- 200 sparklines (as in a column of trends) are timed from render to drawn, with the engine already loaded; the number is printed, and the test fails only past 10 seconds.
- No page error.

## Why it exists
- Issue #353 (charts draw with Apache ECharts); owner, 2026-10-26, option "A: live charts, 1.5 seconds", in the file header.
- The 10-second limit is "a sign that drawing broke rather than a speed goal": the owner accepted about 1.5 seconds; a throttled CPU takes about 6 (file header).
- In the automatic set: owner, codex-q3-27, in the code and in `tests/run.js` (#382 F9).
- Added in commit 20adf762 "Sparkline on ECharts, option A: a live chart each (issue 353)".

## How it checks
- Starts the local test server and opens `tests/fixtures/platform-host.html` in a 1280 by 1000 window, with the style audit added.
- Draws the sparklines with the real Platform, and draws the old SVG version next to each comparison case; measures the drawn shapes of both.
- Renders 200 sparklines and times how long until all are drawn.
- No baseline file: the comparison is against the old drawing made in the same run.

## What a failure means
- Trend charts in tables and summaries could look different from before, lose their accessible name, break the style rules, or take so long to draw that something is clearly broken.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` and `npm run test:full`.
- In changed mode it runs only when a global file changes (the small fixed slice; the code says a chart file counts as global) or this test's file changes. Otherwise it prints `SPARKLINE_ECHARTS_353_OK (nothing in scope)`.
- CI: the "fixtures" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The vendored ECharts library (`platform/vendor/echarts/`), loaded by the chart engine; no network.
