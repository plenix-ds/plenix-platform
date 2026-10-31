# select-data-font

A dropdown that shows a number or a date shows it in the data font, while one that shows words keeps the normal font.

- File: `tests/select-data-font.test.js`

## What it checks
- A Select showing "10" or "Oct 25, 2026" is in Reddit Mono (the data font).
- A Select showing "Compact" or "15 minutes" is in DM Sans (the normal font).
- `data={true}` forces Reddit Mono; `data={false}` keeps DM Sans even on a number.
- A Combobox with "2026-10-25" chosen shows it in Reddit Mono.
- No script errors.

## Why it exists
- Owner choice A on issue #252 (in the file header and the commit).
- Added in commit f28e0ab7 (2026-10-29) "A Select or Combobox that holds a number or a date shows it in the data font (owner, #252 choice A)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws six Selects and one Combobox, and reads the first font of each shown value.

## What a failure means
- Numbers and dates in dropdowns would not match how numbers look elsewhere, or words would wrongly appear in the data font.

## When it runs
- Started by hand only: `node tests/select-data-font.test.js` (its Usage line).
- It is not in any group of `tests/run.js`, no other test starts it, and no workflow or package.json script runs it.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
