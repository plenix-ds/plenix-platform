# pressing-adoption

This test makes sure a keyboard user can open a table column's menu with Enter or Space, not only with the mouse.

- File: `tests/pressing-adoption.test.js`

## What it checks
- In a DataGrid (Plenix's data table):
  - Enter on the column menu's arrow opens the menu;
  - Space on it opens the menu;
  - a mouse click still opens it;
  - pressing Enter or Space on the arrow does not also sort the column.
- First it proves it can see the old problem: a Menu around a bare element marked as a button (what the header drew before) stays closed on Enter and Space.
- No script errors.

## Why it exists
- Issue #262, pull request 4: the column menu's arrow was a plain element marked as a button, so the browser sent it no click for Enter or Space; the menu opened only with the mouse or Arrow Down. It now takes its press from the shared usePressable hook (file header).
- Added in commit 047fa13f "#262 PR 4: the DataGrid header's menu and filter triggers take their press from usePressable; Enter and Space now open the column menu".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1200 by 800 pixels, draws a small two-column DataGrid, focuses the column menu arrow, presses Enter or Space (or clicks), counts open menus and reads the column's sort state.

## What a failure means
- A keyboard user could not reach a column's options (sort, filter, hide) from the keyboard, or pressing the key would sort the column by mistake.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it when DataGrid, `hooks/usePressable.ts`, Menu or Popover changes, when a global file changes, or when `layout.test.js` itself changes. It also starts it when this test's own file, or a fixture it loads, changes (issue #756).
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
