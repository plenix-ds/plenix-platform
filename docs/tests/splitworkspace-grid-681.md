# splitworkspace-grid-681

In a list-and-detail screen (SplitWorkspace), clicking a row opens it beside the list, ticks select rows, and the row menu works.

- File: `tests/splitworkspace-grid-681.test.js`

## What it checks
- The list is named by the pane title ("Documents"), or by the name the app gives the grid ("My files").
- The list has its checkbox column when the app asks for selection.
- A click on a row tells the app which record was clicked, marks that row as open, and the detail side shows it.
- A plain click selects only that row; ticking another row's checkbox adds it.
- Right-clicking a row shows the app's menu items ("Rename"), and choosing one runs it on that row's record.
- All of this left to right and right to left (RTL, for Arabic).
- No script errors.

## Why it exists
- Issue #681 "P-61: SplitWorkspace can't take row click, selection, an open row or a row menu" (file header: "RedSave P-61").
- The file header says that before the fix the template drew the grid with only its label, data and columns and dropped every other option.
- Added in commit f6c4a7db (2026-10-31) "#681 SplitWorkspace passes its list's DataGrid options (grid)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws two SplitWorkspaces with three documents (one with its own grid name), clicks, ticks and right-clicks rows, and records what the app receives. The two hosts are grids (issue #777): in a flex row the workspace shrank to its content, its grid was 0px wide, and a click missed the row.

## What a failure means
- In a list-and-detail screen, a person could not open a record, select rows or use the row menu.

## When it runs
- A child of `layout` (AUTOMATIC in `tests/run.js`): layout starts it as a separate process when the DataGrid, the SplitView or the ReadingPane changes, or when this test file changes. In a full run it always runs.
- A comment in layout explains why: the templates folder (where SplitWorkspace lives) is not a unit that changed mode can map, so the grid's parts and the test's own file trigger it. A change under `platform/templates/` also reaches the small fixed slice, which starts every Layout child, this one included.
- CI: the "fixtures" browser job (`ci.yml`), which runs layout, on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "fixtures" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
- It stops itself after a hard time limit (`tests/limit.js`, TEST_TIMEOUT_MS).
