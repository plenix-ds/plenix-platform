# data-grid

Every table and data grid in the Plenix apps and on the St. John test site opens, shows its rows, has a name, and lines its cells up evenly.

- File: `tests/data-grid.test.js`

## What it checks
- Each listed table view opens and is drawn: it shows its rows, its empty message, or its error message with Retry.
- Each table has a name (for screen readers).
- Each row is at least the row height the design sets for it.
- In every density (compact, standard, comfortable), the content of each cell sits in the middle of the cell, within 1px, in the header and the first five rows, for every kind of cell (text, avatars, badges, icons, checkboxes, buttons).
- In every row height (short, medium, tall, extra tall), each cell keeps at least the minimum padding above and below its content.
- A grid with page controls or a "Load more" button: pressing Tab from the grid body reaches those controls, and none of them is skipped by Tab.
- A saved view (column order, hidden columns, widths, sort) is restored on first draw, and later changes do not repeat column moves.
- A 600-record grid draws only the rows in view, draws every row for printing, then goes back to drawing only the rows in view.
- Scrolling keeps the focus and the right row numbers; frozen columns stay put when the grid scrolls sideways.
- A wrapping static Table keeps its natural cell heights.
- On the test site's giving history (when the grid itself changed): a group row opens and closes with Enter and the arrow keys and announces it; there is no separate view button; the header chevron opens the column menu; Shift + F10 opens the column menu; the arrow keys move in it; Escape closes it and returns the focus to the header.
- It also runs the grid's other checks (see "How it checks").

## Why it exists
- Added in commit bc10d3cb (2026-10-08) "Every app table is a DataGrid: Files, Projects, Search, Settings, the Asset Manager (batch 226, part 2)"; renamed from the DataTable test in commit 878f2507 (2026-10-19, owner: "one is called table, the other is called datagrid").
- Cell content sits in the middle: owner decision 2026-10-13 (in the file).
- The minimum padding P: owner decision 2026-10-14 (in the file).
- The three modes (fill, pages, load more) and the footer controls being reachable by keyboard: owner decision 2026-10-14 (in the file).
- The keyboard behavior of group rows and the column menu, and no view button on the table (the row height lives in the command bar's View menu): owner decision 2026-10-14 (in the file).
- The table views run on the St. John test site, not the design spec: owner decision 2026-10-25 (in the file).
- "Each thing is checked once": the accessibility scan, typefaces and inline styles are checked by other tests (owner, 2026-10-26, in the file header).

## How it checks
- Opens real pages in headless Chrome: Files, Dashboard search, Projects, the Asset Manager and its system settings, the Settings documentation, and the test site's Members, Directory, Families, a family page, Giving and Gifts.
- For each view it clears saved state, presses the listed controls (or types in the header search), waits for the grids, and measures cells in the page.
- Two known findings are allowed for now: on the test site's Directory and Families, a grid with clickable rows puts every row in the Tab order, so Tab does not reach the footer (found 2026-10-25; to be fixed in the Platform).
- On `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) it draws its own grids for the saved-view, virtual-row and print checks.
- It loads four modules into its own browser: `collection-facets`, `multi-groups`, `data-grid-rest` and `data-grid-high`.
- Before the browser work, it starts its child tests as separate processes: twelve DataGrid fix tests (search-149, window-184, sort-185, cell-187, select-167, pane-150, narrow-168, state-169, view-169, group-165, group-browser-165, unread-164), five grid fix tests (cut-popover, filter-by-field-269, header-labels-start-326, empty-table-a11y-313, row-line-559) and data-grid-scroll-147.
- `DT_ONLY=<pattern>` runs only the matching views and skips the children; `DT_ENGINE=next` runs the views on the independent renderer.

## What a failure means
- A table in an app could fail to load, appear without a name for screen-reader users, have rows that are too short, or have text and icons sitting off-center.
- Keyboard users could be unable to reach the page buttons under a table, or to open groups and the column menu.
- A saved table layout could come back wrong, or a large table could slow the page or print only part of its rows.

## When it runs
- AUTOMATIC group in `tests/run.js`: part of `npm test` (changed mode) and `npm run test:full`.
- In changed mode it checks only the views whose app or test-site page changed, and every view when the DataGrid, DataGridEngine or Table changed. With nothing in scope it prints its OK line with 0 and stops.
- CI (`.github/workflows/ci.yml`): the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH or the usual location) and the local test server (`tests/lib.js`).
- The St. John test site checkout (`tests/site.js`), for the test-site views.
- The built Platform and app scripts of this checkout.
