# pane-defaults

Side panes start wider on larger screens, so a big monitor gets roomier panes without anyone dragging them.

- File: `tests/pane-defaults.test.js`

## What it checks
- With no size set, the starting widths of the navigation pane, the secondary pane (small, medium and large) and the side panel follow the window width:
  - Under 1440px: 240 | 180, 220, 280 | 240.
  - From 1440px to 1919px: 272 | 220, 260, 320 | 320.
  - From 1920px: 320 | 260, 320, 400 | 400.
- The narrowest a secondary pane can be dragged stays 180px on every window (its own token, `--plx-comp-secondary-pane-width-min`).
- No script errors at any width.
- Not tested here: a width dragged by the person or set by an app wins over the default (file header).

## Why it exists
- Issue #463 (panel size steps that stopped at 900px), option C, step 2: panes start wider on larger windows, as size tokens, stated in the file header.
- Added in commit a0ae36a6 "#463 step 2: header comments, pane-defaults check, test wired, changelog".

## How it checks
- Opens `tests/fixtures/platform-host.html` at window widths of 1439, 1440, 1919 and 1920px (each side of the two breakpoints).
- Draws a NavPane, three SecondaryPanes and a SidePanel with the real Platform and measures their widths.
- Compares with the table written in the test. No baseline file.

## What a failure means
- Panes could start too narrow on a large monitor, or too wide on a laptop, so a person would have to resize them by hand each time.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when AppShell, NavPane, SecondaryPane or SidePanel changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice; the size tokens are global files) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/pane-defaults.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
