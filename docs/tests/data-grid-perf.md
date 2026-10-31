# data-grid-perf

A 600-row table with rich cells opens, sorts, filters and scrolls quickly, with and without a saved view.

- File: `tests/data-grid-perf.test.js`

## What it checks
- Four cases: 8 columns and 18 columns (14 hidden), each with and without a saved view, on 600 rows with avatar, tag, file-size and badge cells.
- Opening takes under 150 ms (under 300 ms with a saved view).
- Hiding a column, sorting and filtering each take under 50 ms.
- The saved column order and hidden columns are right on first draw.
- An unchanged column order does not move any column.
- Scrolling to the end draws only a window of rows, not all 600.
- It also reports how many layout reads each step made (for information).
- With `PERF_BASELINE=1` it only reports the numbers and does not enforce the limits.

## Why it exists
- Its header: "Measures real 600-row saved/plain views, draw latency and geometry-read calls."
- Added in commit 76ebc7a4 (2026-10-16) "0.49.0: DataTableNext on TanStack (phase 1, #128); DataTable option B (#126)". Issue #126 is "Task: DataTable on the legacy grid the normal way (option B): state at build, batched changes, no geometry patches".
- It draws its own page and no longer needs the design spec (issue #338, in its header).

## How it checks
- Opens a page made by the test (this checkout's platform.css and platform.js, compact density, light mode) in headless Chrome, warms the grid up, then times each case with the browser's clock.
- `DT_ENGINE=next` times DataGridEngine instead; `PERF_BUNDLE_PATH` swaps in another Platform bundle; `PERF_REPORT` writes the results to a file.

## What a failure means
- Large tables could feel slow: a pause when a page opens, or when a person sorts, filters or hides a column.

## When it runs
- Started by `data-grid-next-perf` (which is itself started by hand only), or by hand: `node tests/data-grid-perf.test.js`.
- It is not in any group of `tests/run.js`, and no workflow or package.json script runs it.
- Without Chrome it prints DATA_GRID_PERF_SKIP and passes.

## What it needs
- Headless Chrome (CHROME_PATH or the usual location), the local test server (`tests/lib.js`) and the built Platform bundle (`platform/dist/platform.js`).
