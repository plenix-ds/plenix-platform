# splitview-resize-873

This test makes sure any split view can be resized as far as its room allows (issue 873, the owner's P1), instead of stopping at 720 pixels.

- File: `tests/splitview-resize-873.test.js`

## What it checks
- A split view shaped like AITEAM's "Assigned work" (starting at 540 pixels, no maxSize) in a 1440-pixel window:
  - starts at 540;
  - End, a drag to the window's edge and the separator's largest value all reach the room: the panels' width less the gap and the second panel's minimum, never 720;
  - the second panel keeps its minimum, and the words at the limit say so.
- maxSize 960 and maxSize 600 no longer cap the drag (deprecated, no error).
- A split view wider than the window stops at 90% of the window, and the words name that width.
- A minSize above the ceiling is capped, so the smallest value never passes the largest.
- A remembered width of 1000 pixels is honoured, not cut to 720.
- A smaller window lowers the ceiling at once; under 900 pixels the panels stack, with only the stacked divider.
- Right to left in Arabic: the drag toward the left edge reaches the same ceiling, and the limit's number is in Arabic-Indic digits.
- No script errors.

## Why it exists
- Issue #873, P1: the owner (2026-11-01), "I need to be able to resize any split view screen!!!!!". AITEAM's "Assigned work" split stopped at "Largest width … (720px)" because of SplitView's built-in 360–720 limits.
- Written before the fix: on the old SplitView it fails at the 720-pixel ceiling.

## How it checks
- Headless Chrome opens `tests/fixtures/platform-host.html` at 1440 pixels (then 1100 and 800). It draws a SplitView, presses End and Home, drags the divider to the window's edge, and reads the separator's values, the panels' widths and the words at the limit.

## What a failure means
- People could not widen a list beside its detail pane past a fixed width, however wide their screen.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when SplitView, Resizable or `utils/paneLimit.ts` changes, or when this test's file changes.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
