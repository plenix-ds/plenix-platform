# button-selected-645

A button that is switched on (selected) stays readable in the dark theme, with its text and icon clearly standing out from its fill.

- File: `tests/button-selected-645.test.js`

## What it checks
- Ghost, secondary, tertiary and primary Buttons, each selected, with an icon, in the light and the dark theme:
  - The text against the fill has a contrast of at least 4.5.
  - The icon against the fill has a contrast of at least 3.
- No script errors.

## Why it exists
- Issue #645, "Dark mode: a selected ghost button is unreadable (fill and icon the same color)".
- From the file header: the selected fill came straight from the palette color gray-200, which does not change with the theme, while the text turned light in dark mode, so both were the same color (contrast 1.0). The fill is now a themed role (`--plx-sys-fill-neutral-hover`).
- The limits, 4.5 for the text and 3 for the icon, are stated in the file header; the old dark build read 1.00, so the limits fail on it.
- First committed in commit 43d4b18f "WIP #645: merge styling/phase-2; selected-button test written, fragment and wiring still to do".

## How it checks
- Opens `tests/fixtures/platform-host.html`, sets light or dark mode, and draws four selected Buttons with the real Platform.
- Reads each button's text color, fill and icon color, and computes the contrast ratios.
- No baseline.

## What a failure means
- In dark mode, a toggle button that is on could show text and an icon the same color as its background: unreadable.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it only when the Button changes, or a part the Button is built on changes.
- Layout also starts it when a global file changes (the small fixed slice, which includes the theme tokens) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the Button. Run it by hand: `node tests/button-selected-645.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
