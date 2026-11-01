# entity-title-803

This test makes sure the new short title line for list rows and cards (EntityTitle) shows its parts, cuts a long title with "…", shows a loading placeholder, and keeps rows on the 4px grid, in both reading directions.

- File: `tests/entity-title-803.test.js`

## What it checks
- The parts:
  - the icon is decorative;
  - the subtitle and the tag are optional;
  - a text tag is a Tag; a status tag is a Badge with its icon; a category tag is a Tag of that color.
- A long title stays on one 20-pixel line and ends in "…". Its whole text shows in a tooltip only while it is cut; a title that fits has none.
- Loading:
  - bars in place of the text (two with a subtitle), no text;
  - the item is marked busy;
  - it is as tall as the loaded item.
- In a list row: one line is 20 pixels (as plain row text), two lines 36 pixels (the 4px grid).
- In a card, `level` makes the title a heading; in a row it is plain text.
- Right to left: the icon, the title and the tag run from the right.
- No script errors.

## Why it exists
- Issue #803: idea 3 of the component study #767. The owner said yes in #769 (chat, 2026-10-31) and "build it" (chat pop-up, 2026-11-01).

## How it checks
- Headless Chrome at 900 by 700 pixels opens `tests/fixtures/platform-host.html`, draws EntityTitle in list rows (RowButton) and a card, left to right and right to left. It measures the rows, reads the parts and hovers a cut and an uncut title.

## What a failure means
- Titles in lists could wrap or overflow instead of ending in "…", or lose their tooltip.
- Rows could change height (off the 4px grid) or jump when an item finishes loading.
- A status could show without its icon, against the Plenix rule.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when EntityTitle, RowButton or Card changes, or when this test's file changes.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
