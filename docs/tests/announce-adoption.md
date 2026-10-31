# announce-adoption

This test makes sure that when a person reorders a dashboard widget, copies code, or hits a resize limit, a screen reader says so out loud, through Plenix's one shared announcer.

- File: `tests/announce-adoption.test.js`

## What it checks
- WidgetGrid: Arrow Right on a widget's handle announces "Alpha, position 2 of 2".
- CodeBlock: pressing Copy announces "Copied".
- Resizable: pressing Arrow Left on its handle past the smallest width announces "Smallest width for Preview (200px)".
- Each message comes from exactly one LiveRegion (Plenix's shared screen-reader message area): marked data-plx-live="status", role="status", aria-live="polite".
- No hand-made status area is left in those parts.
- First it proves it can see the old shape: a hand-made hidden status area is not found by the LiveRegion search.
- No script errors.
- ColumnsMenu and the CommandBar's Sort and Filter panels are not driven here; check-system's hook-adoption rule holds them (file header).

## Why it exists
- Issue #262, pull request 7: five hand-made status regions moved onto LiveRegion (WidgetGrid, CodeBlock, Resizable, ColumnsMenu, CommandBar panels) (file header).
- Added in commit 8ab8bce2 "#262 PR 7: five hand-made status regions become LiveRegion (WidgetGrid, CodeBlock, Resizable, ColumnsMenu, CommandBar panels)".
- Issue #262 asks components to use the shared foundation hooks instead of doing that work themselves.

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1000 by 800 pixels, draws each part on a fresh page, acts as a person would (arrow key, click Copy, 40 Arrow Left presses), then reads the hidden message area.

## What a failure means
- A screen-reader user would get no spoken feedback after moving a widget, copying code or reaching a size limit, or the message would come from a one-off area that may not be spoken reliably.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it only when CodeBlock, Resizable, WidgetGrid, ColumnsMenu, CommandBar or `utils/announce.tsx` changes, when a global file changes, or when `layout.test.js` itself changes. A change to this file alone does not start it in changed mode.
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
