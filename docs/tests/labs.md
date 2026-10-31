# labs

In the design spec, each component lab's Edit dialog changes the setting it says it changes, so a designer adjusting a color or size edits the right token.

- File: `tests/labs.test.js`

## What it checks
- For every component lab in the design spec except Button, at every size, variant, state and content:
  - Each property's token (a named design value, such as a color or a height) is set to a marker value on the page.
  - The property its Edit dialog field names must take that marker. A field whose token does not move its property fails.
- Every color sample in a token table of the spec's color page is a 120px bar, never a sliver (#263).
- A wide lab (the record page lab) draws one variant per row, each drawing whole in its cell, in a 1440px and a 1280px window; a small lab (the button lab) keeps a column per variant (#352).

## Why it exists
- The file header: a field whose token does not move its property means "the Edit dialog would edit the wrong token".
- Spec only: owner, 2026-10-25, in the file header. The automatic tests run on the St. John test site; this check belongs to the design spec.
- Color samples as 120px bars: #263, owner's option A (in the code). Wide labs one variant per row: #352, owner's option B (in the code).
- Button is left out because its lab is too large to run here; `tests/visual.test.js` covers the Button (file header).
- Added in commit 74aba518 "Design system: the Field lab; tests/labs.test.js proves every lab's fields (batch 256)".

## How it checks
- Starts the local test server and opens the design spec `platform/design-system/index.html?plenix=local` (this checkout's Platform, not the CDN release) in a 1440 by 1000 window.
- For each lab, draws each combination, sets each token to a marker, and reads the computed style of the part the field names.
- Opens the spec's color page and measures the samples; opens the record page and button labs and measures their cells.
- In changed mode it checks only the labs of what changed in the design spec; `LABS_ONLY=tabs,toast` picks labs by name.
- No baseline.

## What a failure means
- A designer using the spec's Edit dialog could change a value and see nothing happen, or change a different part than intended.
- Color samples could shrink to slivers, or a wide lab's drawings could be cut off.

## When it runs
- SPEC_ONLY in `tests/run.js`: it runs only by name, `node tests/run.js labs` (or `node tests/labs.test.js`).
- It is not part of `npm test`, `npm run test:full`, CI (`.github/workflows/ci.yml`) or the full suite (`.github/workflows/full.yml`).
- In changed mode it stops with `LABS_OK 0/0 labs (nothing in scope)` when nothing in the design spec changed, unless `LABS_ONLY` is set.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The design spec submodule checked out at `platform/design-system/`. Without it the test prints a note and passes with 0 labs.
