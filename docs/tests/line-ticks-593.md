# line-ticks-593

Charts of whole days label their time axis with dates (Oct 1, Oct 2), never with meaningless times such as "12:00 AM" and "12:00 PM".

- File: `tests/line-ticks-593.test.js`

## What it checks
- Charts whose time values are all whole days (date-only, "YYYY-MM-DD"):
  - A LineChart over 6 days, a GanttChart with tasks over 2 days, and a TimelineChart with events over 2 days.
  - The time axis has labels; no label shows a time of day; each day is labeled once; every label is a date.
  - The LineChart has one tick per day, Oct 1 to Oct 6.
- A LineChart with timestamps every 3 hours over one day still gets hour ticks (the fix touches whole days only).
- No script errors.

## Why it exists
- Issue #593, "Line chart: date-only values over a few days get 12-hour ticks (12:00 AM / PM)".
- From the file header: before the fix, six date-only days drew "12:00 AM", "12:00 PM" and so on along the axis.
- Added in commit 21f931d3 "#593 Charts: dates without a time get day ticks, never hours".

## How it checks
- Starts the local test server and opens `tests/fixtures/platform-host.html` in a 900 by 1300 window.
- Draws the four charts with the real Platform and reads every visible axis label, leaving out plain numbers (the value axis) and task or event names.
- No baseline.

## What a failure means
- A person reading a chart of daily figures could see confusing "12:00 AM / 12:00 PM" labels, repeated days, or no dates at all.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when `utils/format.js` changes, or a part built on it changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/` (the chart engine), `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/line-ticks-593.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The vendored ECharts library (`platform/vendor/echarts/`), loaded by the chart engine.
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
