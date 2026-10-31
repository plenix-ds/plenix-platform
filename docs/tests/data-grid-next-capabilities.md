# data-grid-next-capabilities

The table's independent renderer (DataGridEngine) can still do everything the grid offers: grouping, trees, editing, moving rows and columns, rows from a server, and more.

- File: `tests/data-grid-next-capabilities.test.js`

## What it checks
- Grouping by a multi-value field: a record shows in each group, counts and sums count each record once, the group's add action gets its value, and the grouped grid passes an automatic accessibility scan (axe, WCAG 2.0 to 2.2 A and AA).
- Keyboard: moving between cells crosses group rows; Enter and Arrow Right close and open a group.
- Selection from code keeps every requested record; hiding a group keeps the selection.
- Double-click starts editing a cell, and the edit is reported.
- A tree starts closed, opens and closes branches, and can start with every branch open.
- Load more keeps the full data and reveals another batch when scrolled.
- Fill mode keeps a group header visible while scrolling, and scrolling to row 599 shows it.
- Rows and columns can be moved with the keyboard drag handle, and the moves are reported.
- Rows from a server: load more asks for the next page and shows a busy button while waiting.
- Rich cells (bytes, deleted, avatar and name, tags, badge), the row menu, icon-only headers and custom footer text work.
- Every element it draws uses only Plenix class names.
- No script errors.

## Why it exists
- Its header: "Exercises the independent TanStack renderer in real Chrome" and "Checks state-at-open, virtualization, selection, filtering, saved views and the compatible public API".
- Issue #128 "Task: DataTableNext, a TanStack Table trial with the same API, look and capabilities" is the renderer it covers (named in the commit that added its sibling tests, 76ebc7a4).
- First recorded in commit 878f2507 (2026-10-19) "DataTable → DataGrid; Table its own block (owner, 2026-10-19: "one is called table, the other is called datagrid")".

## How it checks
- Opens its own page made by the test (this checkout's platform.css and platform.js) in headless Chrome, draws `Plenix.DataGridEngine` with sample data, presses keys, double-clicks and scrolls, and records every check that fails.
- `DT_SHARED_CSS=<file>` replaces the grid's stylesheet with that file (to try a pending frozen-column fix); `NEXT_SOURCE` loads the renderer from source.

## What a failure means
- If the app moves to the independent renderer, a person could lose grouping, editing, tree rows, moving rows, or loading from a server, or meet accessibility problems in grouped tables.

## When it runs
- Started by hand only: `node tests/data-grid-next-capabilities.test.js`.
- It is not in any group of `tests/run.js`, no other test starts it, and no workflow or package.json script runs it.
- The DataGrid README (`platform/components/DataGrid/README.md`) lists it under the grid's validation.

## What it needs
- Headless Chrome (CHROME_PATH optional) and the local test server (`tests/lib.js`).
- The axe-core package and the built Platform of this checkout.
