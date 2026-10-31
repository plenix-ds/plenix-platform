# data-grid-next-perf

Large tables (600 rows with rich cells) open, sort, filter and scroll within time limits.

- File: `tests/data-grid-next-perf.test.js`

## What it checks
- It runs `data-grid-perf` once and fails if that run fails (see data-grid-perf for the timing targets).
- It collects that run's report and, when `PERF_REPORT` is set, writes it to that file.
- Its header says "both engines", but the code now runs one engine only, named "public" (the public DataGrid).

## Why it exists
- Its header: "Runs the identical rich 600-row fixture against both engines in isolated browsers" and "enforces the trial's timing targets".
- Added in commit 76ebc7a4 (2026-10-16) "0.49.0: DataTableNext on TanStack (phase 1, #128); DataTable option B (#126)". Issue #128 is the TanStack trial.

## How it checks
- Starts `tests/data-grid-perf.test.js` as a separate process with its own port (9281) and a temporary report file, then deletes the file.

## What a failure means
- A large table could become slow to open, sort, filter or scroll.

## When it runs
- Started by hand only: `PERF_REPORT=<path> node tests/data-grid-next-perf.test.js` (its Usage line).
- It is not in any group of `tests/run.js`, no other test starts it, and no workflow or package.json script runs it.
- It stays started by hand on purpose (decided in issue #756): it measures time, and its results depend on the machine's speed, which varies on shared CI machines.
- The DataGrid README lists it under the grid's validation.

## What it needs
- Headless Chrome, the local test server and the built Platform bundle (through data-grid-perf).
