# rtl-ctm-question

This test makes sure an Arabic question block inside an English page (and an English block inside an Arabic page) lays out in its own direction, as CTM's bilingual report questions need, using Plenix alone.

- File: `tests/rtl-ctm-question.test.js`

## What it checks
- Arabic in an English page, written two ways (as CTM writes it today, dir="rtl" on a wrapper, and the supported way, dir and lang on the Fieldset):
  - the legend, the question text and the category list start at the right;
  - each checkbox is right of its question, read right to left;
  - no CSS direction is set by hand on the block;
  - the supported way carries lang="ar" to the questions.
- English in an Arabic page: the reverse; everything starts at the left, each checkbox is left of its question, and lang="en" reaches the questions.
- The page around the block keeps its own direction, and nothing scrolls sideways.
- No script errors.

## Why it exists
- Issue #413, step rtl-413-d: mixed-direction blocks inside a page, a need of CTM 2.0 (an Arabic question beside its English original, checkbox labels, fieldset legends).
- The fixture draws CTM's questions without CTM's own direction rules (ctm.css lines 295 to 304), so CTM's temporary patch can go (file header; owner record ctm-needs-34, named in the header).
- Added in commit 95efe574 "#413 rtl-413-d: CTM's question block as a fixture, a whole-page right-to-left check, and the migration note".

## How it checks
- Opens the fixture `tests/fixtures/rtl-ctm-question.html` (with `rtl-ctm-question.js`) in headless Chrome at 1100 by 900 pixels, once as an English page and once as an Arabic page.
- Measures where each legend, checkbox, question and category sits and reads their direction and language.

## What a failure means
- In CTM, an Arabic question could show with its checkboxes on the wrong side or its text starting at the wrong edge, and a screen reader could read it in the wrong language.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when NavList, Fieldset, Checkbox or the DirectionProvider changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or its fixture `tests/fixtures/rtl-ctm-question.html`, changes. By hand: `node tests/rtl-ctm-question.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The fixture `tests/fixtures/rtl-ctm-question.html` and the built Platform bundle.
