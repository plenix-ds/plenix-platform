# segmented-fold-276

A row of segmented choices that no longer fits its space turns into a drop-down list with the same choice and the same behavior, and turns back when space returns.

- File: `tests/segmented-fold-276.test.js`

## What it checks
- Wide: two SegmentedControls (one alone, one in a row) show their segments, and nothing reaches past the card's edge.
- Narrow: both become a drop-down list, and nothing reaches past the card.
- The drop-down list keeps the same value ("Not saved yet"), the same name ("Show", on the drawn field), and the same change handler (choosing another option reports "saved").
- Wide again: the segments come back, with the newly chosen option ("Already saved") selected.

## Why it exists
- Issue #276, "P-56: SegmentedControl does not fit a narrow container: its last option sticks out". The file header names the case: RedSave, the side panel's Show control.
- The name on the drawn field rather than the hidden native list: dropdown-look-36, #423 (in the code).
- Added in commit 7b2ac3a8 "SegmentedControl becomes a drop-down list when its options do not fit (#276)".

## How it checks
- Starts the local test server and opens the stage page `tests/fixtures/stages/segmented-fold.html` in a 900 by 500 window.
- Narrows the stage by adding a class, then widens it again, and reads which form each control has and whether anything sticks out of the card.
- Picks an option in the drop-down list and reads the value the page received.
- No baseline.

## What a failure means
- In a narrow panel, the last segment could stick out past the edge or be cut off, or the folded list could lose the person's choice or stop saving it.

## When it runs
- A child test of the Reflow test (`tests/reflow.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Reflow starts it when the SegmentedControl changes (or a part it is built on), when this test's own file or the stage it loads changes, when a global file changes (the small fixed slice), or when `tests/reflow.test.js` itself changes.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "reflow" browser job (Reflow's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The stage page `tests/fixtures/stages/segmented-fold.html` and its 360px width in `tests/fixtures/stages/stage.css` (issue #772: the width went missing when #694 archived `docs/briefs/review.css`).
