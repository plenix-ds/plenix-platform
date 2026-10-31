# rtl-charts

This test makes sure charts read correctly on Arabic (right-to-left) pages: time always runs left to right, labels are not cut or overlapping, and the chart title still follows the page.

- File: `tests/rtl-charts.test.js`

## What it checks
- With the page set to right to left (RTL, for Arabic):
  - LineChart over time: dates run left to right (data from January 15 to June 15; since #593 the ticks are whole days, so the first tick, at the left, is 1 February and the last, at the right, 7 June); the value axis is at the left; the dates keep their Arabic-Indic digits;
  - LineChart by category: the categories run left to right in their data order;
  - GanttChart: dates run left to right; the task labels sit whole at the left of the bars, not cut by the edge;
  - HeatMap calendar: the 7 weeks run left to right after room for the weekday labels; each weekday label sits whole left of the first week; no label overlaps a cell;
  - BarChart (horizontal bars, not time): it still mirrors, with its category labels at the right;
  - the frame: the drawing is left to right, while the title follows the page (right to left).
- No script errors.

## Why it exists
- Issue #413, step rtl-413-c: right-to-left and Arabic support (a need of CTM 2.0).
- Owner decision #584 B: time runs left to right in every chart, Arabic pages included (file header and commit).
- Added in commit 42567cdf "#413 rtl-413-c: time runs left to right in every chart, Arabic pages included (owner, #584 B)".
- The BarChart check is a guard: it fails if the left-to-right rule spreads to bar charts (comment in the file).

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 900 by 1400 pixels, sets dir="rtl" lang="ar", draws five charts with Arabic labels, and measures where each label and cell sits.

## What a failure means
- On Arabic pages, a timeline could run backwards against the owner's decision, the heat map's weekday labels could run over the cells, or Gantt task names could be cut off.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when the DirectionProvider changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/` (the charts this test draws), `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/rtl-charts.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle (with its chart engine).
