# focus-group-6a

This test makes sure the vertical tool rail (a column of tool buttons) is easy to use from the keyboard: one Tab to enter, arrows to move between tools, one Tab to leave.

- File: `tests/focus-group-6a.test.js`

## What it checks
- Checked on a ToolRail on its own and as SecondaryPane's collapsed rail, in left to right and in right to left (RTL, for Arabic).
- Tab enters the rail on its first tool (on the pane, its Expand button first, then Arrow Down reaches the tools).
- Arrow Down and Arrow Up move between tools, loop at the ends, and skip a disabled tool.
- Home and End reach the first and last tool.
- Arrow Left and Arrow Right do nothing in this vertical rail.
- A held Alt key still moves, as the rail always did.
- Exactly one tool is in the Tab order.
- Tab leaves the rail in one step; Shift + Tab comes back to the tool focused last.
- No script errors.

## Why it exists
- Issue #262, pull request 6a: ToolRail moved onto the shared focus-group hook (useFocusGroup) (file header).
- Added in commit f3f5ab2b "#262 PR 6a: ToolRail onto the shared focus group (useFocusGroup)".
- The header says the behavior was measured the same before and after the move, so these checks pass on both; going back to the old code is caught by check-system's hook-adoption rule instead.

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1000 by 700 pixels.
- Draws a button, the rail with four tools (one disabled), and another button, then presses real keys and reads which tool has focus.

## What a failure means
- A keyboard user could need many Tab presses to cross the rail, land on a disabled tool, or lose their place when coming back to the rail.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when ToolRail, SecondaryPane or `hooks/useFocusable.ts` changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/focus-group-6a.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.
- `tests/keyboard-apg-691.test.js` names it in its header as the keyboard test for ToolRail and SecondaryPane, but does not start it.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
