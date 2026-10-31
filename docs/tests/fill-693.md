# fill-693

Messages with blanks in them ("Go to page {n}") are filled in the same correct way everywhere in Plenix, and never show the words "undefined" or "null" to a person.

- File: `tests/fill-693.test.js`

## What it checks
- The shared helper `fill()` (`platform/utils/fill.js`):
  - A value is written into its placeholder; every occurrence of a placeholder is replaced.
  - 0, false and an empty text are values, and are written.
  - An undefined or null value, or a missing key, leaves the placeholder; the words "undefined" and "null" never appear.
  - A key the text does not name is ignored.
  - A text that is not a string (a number) is read as text.
  - Only letters, digits and underscores name a placeholder.
  - The replacement is taken exactly as written (special `$` patterns are not expanded).
  - A number is written as the number.
- `platform/utils/floating.js` exports the one shared `TOP_LAYER`.
- No file in the Platform defines its own `fill`, `TOP_LAYER` or `asIcon` (the check-system rule shared-fill, issues 693 and 719).

## Why it exists
- Issue #693, "Audit (Low): the same placeholder filler is copied into 44 files, in four versions" (audit finding #684), named in the file header.
- From the file header: the 44 copies disagreed: some left the placeholder for a missing value, some wrote "undefined" or "null", some threw on a number, and some replaced only the first of two placeholders.
- The `asIcon` part of the source rule: issue 719, in the check's name.
- Added in commit e4cc37bb "#693: one fill() for every catalog text (44 copies) and one TOP_LAYER (9 copies); a check-system rule refuses new copies".

## How it checks
- Runs in Node only, with no browser.
- Loads `platform/utils/fill.js` through Babel and calls `fill()` with each case.
- Reads `platform/utils/floating.js` as text, and runs the check-system rule `check-system.rules/shared-fill.js` over every file under `platform/`.
- No baseline.

## What a failure means
- A person could read "Hello undefined", "Page null of 5", or a message with a raw "{name}" left in it, and different screens could fill the same message differently.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` and `npm run test:full`. It has no changed mode: it runs all its checks every time.
- CI: the "Build and checks" job, in the step "Tests without a browser" (`node tests/run.js formats brand-rules login types fill-693`), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): its build job runs formats, brand-rules, login and types only; fill-693 is not listed there.

## What it needs
- Node with the `@babel/standalone` package (a development dependency in `package.json`).
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
- No browser, no web server.
