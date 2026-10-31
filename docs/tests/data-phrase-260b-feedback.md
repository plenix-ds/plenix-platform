# data-phrase-260b-feedback

In a phrase such as "40 days" in a banner, a field's hint or a checkbox's description, the number is in the data font and the words stay in the normal font.

- File: `tests/data-phrase-260b-feedback.test.js`

## What it checks
- For a Banner's text, a Field's description and a Checkbox's description:
  - at least one number is in Reddit Mono (the data font);
  - the words are not in Reddit Mono;
  - the text reads exactly as the app gave it (the words never move);
  - the number keeps the size of the phrase around it.
- The banner's count itself is the data-font text.
- A banner given its own element instead of a string keeps its text, and no data-font part is added to it.
- Each case in English and in Arabic (with Arabic-Indic digits, right to left).
- No script errors.

## Why it exists
- Issue #260 "Owner decision: numbers in Mono inside phrases ("7 files", status bar counts)"; owner 2026-10-30 (in the file header).
- The file header says the old build wrote these strings as one normal-font text (the typography check's "phrase" finding: 18 on 9 pages).
- Added in commit 5f6e4c78 (2026-10-30) "#260b: a count in a Banner, a Field hint or a Checkbox description is in the data font (dataWhenText)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws the three parts and a banner with its own element, in English and then in Arabic, and reads the font of each piece of text.

## What a failure means
- Counts inside messages and hints would not stand out as data the way the owner decided, or the words around them would wrongly switch to the data font.

## When it runs
- A child of `layout` (AUTOMATIC in `tests/run.js`): layout starts it as a separate process when the Banner, the Field, the Checkbox or the shared text helper (`utils/dataText.jsx`) changes, or when this test's own file, or a fixture it loads, changes (issue #756). In a full run it always runs.
- CI: the "fixtures" browser job (`ci.yml`), which runs layout, on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "fixtures" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
