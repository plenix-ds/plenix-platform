# navpane-fit-677

Controls placed in the header of a side pane (a drop-down list, a button with long words) stay inside the pane instead of sticking out past its edge.

- File: `tests/navpane-fit-677.test.js`

## What it checks
- A 240px navigation pane (NavPane) holding a small Select with one long choice and a Button with an arrow and long words, as the AITEAM app mounts it, left to right and right to left:
  - The pane is 240px.
  - The Select's edges stay inside the pane, beside the Collapse button, and it is never narrower than 100px (the fit-field minimum).
  - The Collapse button keeps its square size, inside the pane (an icon button never shrinks).
  - The second row's Button stays inside, and its long words end in an ellipsis.
- A SidePanel header with a Select and a worded Button in its actions stays inside the panel too.
- No script errors.

## Why it exists
- Issue #677, "Controls in a navigation pane go outside it (AITEAM project selector and All projects button)", quoted in the file header ("Why are components going outside?").
- The cause, from the file header: before the fix the actions holder never shrank and Buttons never shrank, so the Select drew at its longest choice (286px in a 240px pane).
- Added in commit 38850498 "Fix #677: controls in a pane's header fit the pane (NavPane actions and second row, SecondaryPane and SidePanel headers)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in a 1100 by 700 window, once left to right and once right to left.
- Draws an AppShell (master-detail page) with that NavPane and SidePanel using the real Platform.
- Measures each control's box against the pane's box, and checks whether the long label is cut with an ellipsis.
- No baseline.

## What a failure means
- In a narrow side pane, a drop-down list or button could poke out over the page content, covering it or being cut off.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. (Its header's Usage line names no runner; the wiring is in `tests/layout.test.js`.)
- In changed mode (`npm test` and CI), Layout starts it only when NavPane, SecondaryPane, SidePanel, Button or Input changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the parts listed above. Run it by hand: `node tests/navpane-fit-677.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
