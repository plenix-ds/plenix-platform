# rtl-app-frame

This test makes sure the frame around every Plenix app (header, navigation pane, side panel, tooltips, pop-up messages and command bar) is correctly mirrored on Arabic (right-to-left) pages.

- File: `tests/rtl-app-frame.test.js`

## What it checks
- With the page set to right to left (RTL, for Arabic):
  - AppShell: the page never scrolls sideways;
  - AppHeader: its start (brand, apps) is at the right and its end (account, tools) at the left; the account menu's sign-out arrow is mirrored;
  - NavPane: the navigation pane sits at the right edge, its collapse arrow mirrored; collapsed, the rail stays at the right and its arrow is mirrored;
  - SidePanel: the Asset Manager's details panel is at the left (the end side), its arrow mirrored, with no sideways scroll;
  - Tooltip: "start" opens to the right of its button, "end" to the left (the buttons have room on both sides: a plain tooltip does not flip by design, issue #777);
  - Toast (pop-up message): at the left (end) corner, its colored stripe on its right (start) edge;
  - CommandBar: commands run from the right; when narrowed, the "More" button is the leftmost.
- No script errors.

## Why it exists
- Issue #413, step rtl-413-a: right-to-left and Arabic support, a need of CTM 2.0, which must be fully bilingual (English and Arabic).
- Added in commit 9a108fea "#413 rtl-413-a: the app frame in right to left: directional icons that pointed the wrong way now mirror; a test per part".

## How it checks
- Headless Chrome at 1280 by 800 pixels opens the Projects app and the Asset Manager, sets dir="rtl" lang="ar" on the page, and measures positions and the mirroring of arrow icons.
- Then draws a pair of Tooltips, a Toast and a CommandBar on `tests/fixtures/platform-host.html`.

## What a failure means
- On Arabic pages the navigation could sit on the wrong side, arrows could point the wrong way, or the page could scroll sideways.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when AppShell, AppHeader, NavPane, SidePanel, CommandBar, Tooltip or Toast changes, or a part built on one of them changes, or when the Projects app or the Asset Manager changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/rtl-app-frame.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built Projects and Asset Manager pages, `tests/fixtures/platform-host.html` and the built Platform bundle.
