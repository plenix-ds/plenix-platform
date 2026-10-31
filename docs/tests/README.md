# Plenix tests

Each Plenix test has a page here that says, in plain words, what it protects, why it exists, how it checks, what a failure means, when it runs and what it needs.

- The tests are in `tests/`. This folder only describes them (issue #748).
- The shared helpers, fixtures and baselines are described in [helpers.md](helpers.md).
- Tests never run on their own here: the owner starts them (see "How to start tests" below).

## How to start tests

Run each command from the repository folder.

- `npm test`: every automatic test, only for what changed since the last commit (changed mode).
- `npm run test:full`: every automatic test on every page. This is the final gate.
- `npm run test:on-demand`: the on-demand tests (accessibility, high contrast, color contrast, themes, density) for what changed. Add `:full` (`npm run test:on-demand:full`) for every page.
- `node tests/run.js <name> <name>`: only the tests named, for example `node tests/run.js pages typography`.
- `node tests/run.js keyboard:Toolbar,Tabs`: only some parts of one test (the parts are listed in `tests/parts.json`).
- `node tests/<name>.test.js`: one test file by itself. The tests marked "started by hand" below run only this way.
- `npm run test:scope` (`node tests/changed.js`): prints what changed mode will check, without running anything.
- On GitHub:
  - "Checks" (`ci.yml`) runs the changed-mode tests on every pull request and on pushes to styling/phase-2 and main.
  - "Full suite" (`full.yml`) and "On-demand tests" (`on-demand.yml`) run only when started by hand: Actions, then the workflow, then Run workflow.

## The groups

Each line links to the test's page. A test that a group test starts is listed under what it protects, not under its group.

### Data grid and collections

- [collection-facets](collection-facets.md): The counts next to each quick filter choice (for example "Red 2") are right and update with the other filters and the table's data.
- [command-actions](command-actions.md): The buttons in a list's command bar (and the small forms they open) behave correctly with the mouse and the keyboard, including when they fold into "More actions" and while rows are ticked.
- [commandbar-find-fold-274](commandbar-find-fold-274.md): In a very narrow pane, the command bar's search folds into one "Find and view" button instead of sticking out of its card.
- [cut-popover](cut-popover.md): When text in a table cell is too long and gets cut off, a person can open it in full.
- [data-grid](data-grid.md): Every table and data grid in the Plenix apps and on the St. John test site opens, shows its rows, has a name, and lines its cells up evenly.
- [data-grid-cell-187](data-grid-cell-187.md): A large table stays quick because cells that did not change are not redrawn, while edits, ticks and row menus still work.
- [data-grid-group-165](data-grid-group-165.md): Grouping a table by any kind of field (text, yes/no, numbers, dates, tags) puts each record in the right group.
- [data-grid-group-browser-165](data-grid-group-browser-165.md): The Group by list offers every column that can be grouped, and grouping by a date period or a number range works in a real table.
- [data-grid-high](data-grid-high.md): The most important fixes to tables keep working: default sorts, remembered views, row menus, Arabic text direction, selection, and buttons inside rows.
- [data-grid-narrow-168](data-grid-narrow-168.md): A table inside a split view (a list beside a detail pane) stays a table, instead of turning into a narrow list on its own.
- [data-grid-next-capabilities](data-grid-next-capabilities.md): The table's independent renderer (DataGridEngine) can still do everything the grid offers: grouping, trees, editing, moving rows and columns, rows from a server, and more.
- [data-grid-next-independent](data-grid-next-independent.md): The table's independent renderer (DataGridEngine) works on its own, with none of the old grid code loaded.
- [data-grid-next-perf](data-grid-next-perf.md): Large tables (600 rows with rich cells) open, sort, filter and scroll within time limits.
- [data-grid-pane-150](data-grid-pane-150.md): A table inside a pane shows its rows and fills its pane, even when the pane is further down the page than the window.
- [data-grid-perf](data-grid-perf.md): A 600-row table with rich cells opens, sorts, filters and scrolls quickly, with and without a saved view.
- [data-grid-rest](data-grid-rest.md): The rest of the table fixes keep working: file sizes, missing values, rich cells, column widths, the narrow switch, and undo for row actions.
- [data-grid-scroll-147](data-grid-scroll-147.md): When a table scrolls sideways, the column headers move with their columns and frozen columns stay in place, in English and in Arabic.
- [data-grid-search-149](data-grid-search-149.md): Typing in a search box above a large table stays smooth, and the filtered rows stay in order.
- [data-grid-select-167](data-grid-select-167.md): "Select all" on a large table is quick, and clicking, Ctrl-clicking and Ctrl+Shift-clicking rows selects what a person expects.
- [data-grid-setvalue-736](data-grid-setvalue-736.md): When an app changes a table cell from its own code, the change reaches the right record.
- [data-grid-sort-185](data-grid-sort-185.md): A table does not sort all its rows again when nothing about the sort changed, and a custom sort still follows the chosen direction.
- [data-grid-state-169](data-grid-state-169.md): A table's saved view cannot bring back columns that were removed, and an app's choice to clear the sort is respected.
- [data-grid-unread-164](data-grid-unread-164.md): New or unread records stand out in a list, as in Outlook, and stay marked correctly as a person opens them, sorts or scrolls.
- [data-grid-view-169](data-grid-view-169.md): A table has one remembered view: sorting, hiding, grouping or resizing from the column headers is saved in one place and comes back the same.
- [data-grid-window-184](data-grid-window-184.md): A long list inside a split view draws only the rows in view, so it stays fast.
- [data-phrase-260b-data](data-phrase-260b-data.md): In a phrase such as "40 pledges" under a metric, chart, record title, activity row or table cell, the number is in the data font and the words stay in the normal font.
- [data-phrase-260b-feedback](data-phrase-260b-feedback.md): In a phrase such as "40 days" in a banner, a field's hint or a checkbox's description, the number is in the data font and the words stay in the normal font.
- [data-phrase-260b-settings](data-phrase-260b-settings.md): In a settings description such as "469 members in 120 families", the numbers are in the data font and the words stay in the normal font.
- [filter-by-field-269](filter-by-field-269.md): "Filter by this field" in a column's menu opens the command bar's Filter panel on that field when the list has a command bar, and the column's own filter box when it does not.
- [listing-page-522](listing-page-522.md): A list page (ListingPage) fills the window with its table, scrolls only inside the table, and shows the chosen record beside it.
- [multi-groups](multi-groups.md): Grouping a table by a field with several values (such as tags) shows a record under each value, yet selecting, editing, counting or deleting it treats it as one record.
- [pill-padding-649](pill-padding-649.md): A pill (a small rounded label such as "Needs decision") in a table cell has the same space on both sides, and its text is centered.
- [remote-fill-522](remote-fill-522.md): A table whose rows come from a server loads more rows as the person scrolls, with no page buttons, and recovers when a page fails to load.
- [remote-fill-614](remote-fill-614.md): A table whose rows come from a server stops asking for more when the server runs out, starts over cleanly on a new search, and ignores a late page after a sort.
- [row-line-559](row-line-559.md): A hovered or selected row in a table has a line above it that matches the line below it.
- [select-data-font](select-data-font.md): A dropdown that shows a number or a date shows it in the data font, while one that shows words keeps the normal font.
- [splitworkspace-grid-681](splitworkspace-grid-681.md): In a list-and-detail screen (SplitWorkspace), clicking a row opens it beside the list, ticks select rows, and the row menu works.

### Accessibility and keyboard

- Described in a following pull request (issue #748).

### Languages and right to left

- Described in a following pull request (issue #748).

### Pages and layout

- Described in a following pull request (issue #748).

### Components

- Described in a following pull request (issue #748).

### Charts

- Described in a following pull request (issue #748).

### Tokens and style

- Described in a following pull request (issue #748).

### Icons

- Described in a following pull request (issue #748).

### Build, packages and security

- Described in a following pull request (issue #748).
