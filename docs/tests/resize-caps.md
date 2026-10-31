# resize-caps

A resizable box or pane dragged or set past its largest size stops at that largest size (1600px), instead of jumping back to its starting size.

- File: `tests/resize-caps.test.js`

## What it checks
- A Resizable box set to a width of 1604 or 1700, or a height of 1700, is drawn at 1600, not at its default size.
- A box with a minimum width of 2 and a maximum of 2000 reports 4 and 1600 to assistive technology (`aria-valuemin`, `aria-valuemax`): the sizes it can really reach.
- A pane divider (PanelSplitter) whose limit is 2000 reports 1600 as its maximum, and End moves it no further than 1600.
- The stylesheet has a size rule for 1600px (for a box and for a pane) and none for the next 4px step past it.
- No page error.

## Why it exists
- The review of pull request #375 (split view and menu edge on the 4px grid): sizes past the generated grid lines must land on the cap, never on the default, as stated in the file header.
- The 1600px pane cap matches the Resizable box's: #463 (panel size steps that stopped at 900px), in the file header.
- Added in commit 6aa8fd42 "Resizable and the panes: a size past the generated grid lines lands on the cap, not the default (review of #375)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in a 2000 by 2000 window and draws four Resizable boxes and one PanelSplitter with the real Platform.
- Measures the drawn sizes, reads the separators' `aria-valuemin` and `aria-valuemax`, presses End on the pane divider, and walks the page's style rules for the 1600px and 1604px size rules.
- No baseline.

## What a failure means
- A panel or box made very wide could suddenly snap back to a small default size.
- A screen reader could announce a size limit the control can never reach.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it only when Resizable, SplitView, AppShell, NavPane, SecondaryPane or SidePanel changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the parts listed above. Run it by hand: `node tests/resize-caps.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
