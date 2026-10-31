# rtl-editing-time

This test makes sure the text editor, date picker, week grid, carousel and document viewer work the right way round on Arabic (right-to-left) pages.

- File: `tests/rtl-editing-time.test.js`

## What it checks
- With the whole page right to left (RTL, for Arabic):
  - RichTextEditor: the writing area writes right to left; its bulleted list starts at the right; the toolbar starts at the right;
  - DatePicker: in the range calendar, "Previous month" is right of "Next month" and its arrow is mirrored;
  - TimeGrid (week view): the days run from the right (the first day is the rightmost column);
  - Carousel: "Previous" is right of "Next", both arrows mirrored;
  - DocumentViewer: "Previous page" is right of "Next page";
  - the page does not scroll sideways.
- In a left-to-right page with one Arabic editor (dir and lang set on that editor only): that editor writes right to left in Arabic with its toolbar from the right, and the other editor stays left to right.
- No script errors.
- The header also says the calendar's first weekday sits at the right and the PDF page stays left to right; the code does not check those two.

## Why it exists
- Issue #413, step rtl-413-b: right-to-left and Arabic support (a need of CTM 2.0).
- Added in commit 50170cdf "#413 rtl-413-b: editing and time in right to left: checked, already right; RichTextEditor documents dir and lang; a test per part".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1100 by 900 pixels, draws the five parts with Arabic content, and measures button and column positions and arrow mirroring.
- The DocumentViewer loads the sample PDF `platform/components/DocumentViewer/fixtures/sample.pdf`.

## What a failure means
- On Arabic pages, "previous" and "next" buttons could be on the wrong sides, the week could read backwards, or Arabic text could be typed left to right.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. Before issue #756 it was started by hand only.
- In changed mode (`npm test` and CI), Layout starts it when RichTextEditor, DatePicker, TimeGrid, Carousel or DocumentViewer changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes. A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches that slice too.
- Layout also starts it when this test's own file, or a fixture it loads, changes. By hand: `node tests/rtl-editing-time.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`, the built Platform bundle and the sample PDF.
