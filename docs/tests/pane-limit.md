# pane-limit

A side pane can never be dragged wider than 90% of the window, and a table column never wider than 90% of its table, so the rest of the screen always stays in view.

- File: `tests/pane-limit.test.js`

## What it checks
- A pane divider (PanelSplitter) whose own limit is 2000px goes no further than 90% of the window, rounded down to the 4px grid: 900 in a 1000px window, 1152 in a 1280px window.
- In a 2000px window the pane cap (1600) is the smaller limit, so it wins.
- The divider reports that limit as `aria-valuemax`, and End moves it exactly there.
- A DataGrid column without a maximum ends at 90% of its table (a table about 600px wide), not at 1600.
- A column with a maximum width of 120 stays at 120.
- No script errors.

## Why it exists
- Issue #463 (panel size steps that stopped at 900px), option C, step 1: panes and table columns stop at 90% of the window (of the table), stated in the file header.
- The 90% share is the token `--plx-sys-shell-pane-window-share` (file header).
- Added in commit a7034ec2 "#463 step 1: panes and table columns stop at 90% of the window (of the table)".

## How it checks
- Opens `tests/fixtures/platform-host.html` at window widths of 1000, 1280 and 2000px.
- Draws a PanelSplitter and a 600px-wide DataGrid with two columns using the real Platform.
- Presses End on the pane divider and reads every separator's `aria-valuemax`.
- No baseline.

## What a failure means
- A person could drag a pane or column so wide that the main content, or the other columns, disappear off the screen.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when Resizable, DataGrid, SplitView, AppShell, NavPane, SecondaryPane or SidePanel changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/pane-limit.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
