# high-contrast

This test makes sure Plenix stays readable for people who turn on Windows high contrast, ask for more contrast, or ask for less motion.

- File: `tests/high-contrast.test.js`

## What it checks
- Forced colors (Windows high contrast):
  - a focused field gets a system Highlight border;
  - a selected, current or pressed item is Highlight with HighlightText, and its icon is HighlightText;
  - an icon elsewhere is the normal text color (CanvasText);
  - a disabled button is GrayText;
  - a card gets an outline;
  - a progress bar fill is Highlight.
- More contrast (the "prefers more contrast" setting), in light and in dark:
  - every border role becomes the strong border;
  - muted and subtle text become the default text color.
- Reduced motion: the loading spinner, shimmer and moving progress bar stand still. With motion allowed, the spinner turns and the progress bar runs.

## Why it exists
- Part of "the complete library, wave 2, lane B", for the system stylesheets `system/forced-colors.css` and `system/motion.css` (file header).
- Added in commit 282b3543 "0.31.43: The complete library, wave 2; On this page by section".
- Icons are checked as the Icon component draws them (issue #557, in the file header).
- It runs only on demand (owner, 2026-10-25: "Reserve only for as on demand test by owner and take out from the tests", in `tests/run.js`).

## How it checks
- Opens the Settings application in headless Chrome at 1280 by 900 pixels.
- Uses Chrome's media emulation to turn on forced colors, more contrast, and reduced motion, one at a time.
- Draws sample controls with Plenix classes (a field, a current navigation item, a pressed button, a disabled button, an icon, a card, a progress bar, the three loading animations) and reads their computed colors and animations.

## What a failure means
- In high contrast mode a selected item, a focused field or a disabled button could look the same as everything else, or an icon could vanish.
- With "more contrast" on, faint borders and gray text would stay faint.
- With "reduce motion" on, spinners and shimmers would keep moving, which can make some people feel unwell.

## When it runs
- ON_DEMAND in `tests/run.js`: only when the owner starts it (GitHub Actions > On-demand tests, the "high contrast, themes and density" job, or `node tests/run.js high-contrast`, or `npm run test:high-contrast`).
- It never runs on a push, a pull request or in the full suite.
- In changed mode it runs only when Input, NavList, Button, Card, ProgressBar or the Settings app changes (or a global file, or this test).

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built Settings application page.
