# ids-rtl-606

This test makes sure case numbers and other computed identifiers read in the owner's chosen order, 01-20261020, on Arabic (right-to-left) pages.

- File: `tests/ids-rtl-606.test.js`

## What it checks
- On a right-to-left page (RTL, for Arabic), the identifier 20261020-01 shows as 01-20261020 in:
  - Isolate kind="id";
  - a DataGrid column of kind id;
  - PropertyList.Item kind="id";
  - DataPill kind="id".
- On a left-to-right page, the same parts show 20261020-01, unchanged.
- An email stays left to right, alone and in a DataGrid cell, and reads as written.
- The stored text is never changed, so copy and search still get 20261020-01.
- First it proves it can see the old order: Isolate with its default reads 20261020-01 in the same right-to-left page.
- No script errors.

## Why it exists
- Issue #606, from the owner's decision recorded on #590 (2026-10-29): "the correct format for computed numbers that are identifiers should always be in format of (01-20261020)" and "01-20261020 everywhere".
- Added in commit f1f591d6 "#606: a computed identifier reads 01-20261020 on a right-to-left page (Isolate, DataPill and PropertyList kind="id", DataGrid id cells)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1000 by 900 pixels, once in right to left and once in left to right.
- Reads the order from the screen: the horizontal position of the "01" and "20261020" pieces.

## What a failure means
- On Arabic pages, case numbers would read in the wrong order, against the owner's rule, and could be misread or mistyped.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it when Isolate, DataGrid, DataPill, PropertyList or EntityHeader changes, when a global file changes, or when `layout.test.js` itself changes. It also starts it when this test's own file, or a fixture it loads, changes (issue #756).
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
