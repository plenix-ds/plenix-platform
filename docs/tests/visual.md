# visual

Every Plenix button keeps exactly its approved look (colors, borders, sizes, fonts, focus ring) in every variant, size and state.

- File: `tests/visual.test.js`

## What it checks
- 840 Buttons: 6 variants (secondary, primary, tertiary, ghost, danger, danger-secondary) by 5 sizes by 7 states (rest, hover, selected, focus, disabled, loading, expanded) by 4 forms (label, icon, icon only, caret), plus a joined button group.
- For each, 27 computed style values (fill, text color, border, corner, shadow, outline, font, line height, sizes, padding, gap, underline, cursor, opacity), and the icon and caret slots' sizes and colors.
- Light mode, default (Standard) density only.
- Only values that do not depend on the operating system's fonts are compared (no measured widths).

## Why it exists
- A visual snapshot of the Button, described in the file header. Added in commit 4e8d647f "Versioning rules, changelog, and checks on every push (roadmap items 5 and 6)", whose message lists a "visual snapshot (... Buttons, baseline)".
- Light mode only: owner reset 2026-10-26 ("dark mode comes last"; themes and densities are on demand), in the file header.
- No measured widths, so the baseline holds on Windows and on the Linux CI runner alike (file header).

## How it checks
- Writes a temporary page, `tests/.visual-button.html`, with every Button combination as plain `plx-button` markup, loading `platform/platform.css` from the checkout (`file://`, no web server).
- Reads each button's computed styles in headless Chrome.
- Compares every value with the baseline `tests/baselines/button.json`; any difference fails.
- `--update` writes a new baseline, only after a change meant to look different.

## What a failure means
- A button somewhere in Plenix would look different from its approved design: a wrong color, border, size or focus ring, possibly in a state that is hard to spot by eye.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` and `npm run test:full`.
- In changed mode it runs only when the Button changes (or a part it is built on), a global file changes (the small fixed slice), or this test or its baseline changes. Otherwise it prints `VISUAL_OK 0 values (0 buttons) (nothing in scope)`.
- CI: the "fixtures" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The stylesheet `platform/platform.css` (CSS needs no build).
- The baseline file `tests/baselines/button.json`.
- No web server and no St. John test site.
