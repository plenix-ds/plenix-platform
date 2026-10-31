# contrast

This test makes sure text and other important marks always stand out enough from their background to be read, in every Plenix theme, light and dark.

- File: `tests/contrast.test.js`

## What it checks
- The contrast helper (`platform/utils/contrast.js`) gives right answers on known colors: black on white is 21:1, a color on itself is 1:1, #767676 on white passes for text and #777777 fails, a non-color gives no number, and an unknown rule is refused.
- Every color pair in the helper's list of role pairs (CONTRAST_PAIRS) meets its rule in every theme of `platform/standards/themes.json`, in light and dark mode.
- The rules: 4.5:1 for normal text, 3:1 for large text and for non-text marks such as borders and icons.
- Every pair must resolve to real colors.
- A "pending" pair (allowed to fail for now) that starts to pass makes the test fail until it is taken off the list. The pending list is empty.

## Why it exists
- WCAG 2.2 contrast minimums: 4.5:1 text, 3:1 large text and non-text (file header; WCAG 2.2 SC 1.4.3 and 1.4.11).
- The palette-contrast rule, in the file: fix a failing pair by remapping the role per theme, never add a color, never loosen the rule. A new pending pair needs the owner.
- The pending list has been empty since 2026-10-12, when the owner remapped the 13 pairs of 2026-10-11 (comment in the file).
- Added in commit 492a938a "0.31.42: The complete library, wave 1".
- It runs only on demand (owner, 2026-10-25: "Reserve only for as on demand test by owner and take out from the tests", in `tests/run.js`).

## How it checks
- No browser. It reads the token source files (`platform/tokens/*.tokens.json`) and the theme list, follows each role to its palette color, and computes the contrast ratio.
- `ALL=1` prints every pair with its ratio.
- It never changes the repository.

## What a failure means
- In some theme or mode, a pair of colors is too close: for example gray text on a light gray card, or a border that almost disappears.
- People with low vision, or anyone in bright light, would struggle to read that text or see that control.

## When it runs
- ON_DEMAND in `tests/run.js`: only when the owner starts it (GitHub Actions > On-demand tests, the "Color contrast" job, or `node tests/run.js contrast`, or `npm run test:contrast`).
- It never runs on a push, a pull request or in the full suite.
- It has no changed mode: it checks every pair every time.

## What it needs
- Node only. No browser, no server, no test site.
- The token files, `platform/standards/themes.json` and `platform/utils/contrast.js`.
