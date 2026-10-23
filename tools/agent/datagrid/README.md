# DataGrid zero-overlap comparisons

Each batch is proved by computed values: a clean copy of the commit before the batch (the baseline) against the working
tree, in the same browser, page by page.

1. Make the baseline once: `git worktree add --detach ../Plenix-b0 <commit before the batch>`, junction
   `node_modules` from this checkout (never copy it), copy `platform/design-system` in (robocopy /MIR, excluding `.git`),
   then `node build-tokens.js && node build-steps.js && node build-app.js` there. For the next batch,
   `git -C ../Plenix-b0 checkout -f --detach <commit>` and build again.
2. `node tools/agent/datagrid/compare-grid.js`: every element inside a DataGrid or Table, at rest.
3. `node tools/agent/datagrid/compare-header.js`: every header element at rest, while each column is hovered, and after
   sorting the first sortable column both ways. Extend its states (row hover, selection, editing, groups opened) for the
   batch at hand.
4. `node tools/agent/datagrid/compare-states.js [--pages files,data-grid] [--states rest,hover0] [--agg]`: every element of
   every grid, about a hundred computed values with ::before, ::after and the box (relative to its grid), grid by grid, in
   every state the batches touch (rest, three rows hovered, a row selected and hovered, a cell edited, a group closed and
   hovered, scrolled, the grid hovered) on the six application pages and every DataGrid and Table spec page
   (spec-pages.json). Run it once with both copies at the same commit first: it must print SAME everywhere.
5. Remove the baseline's `node_modules` junction with `cmd /c rmdir` before `git worktree remove`.

The test browser runs with prefers-reduced-motion: reduce.

## Performance

Measured in a headless Chrome, usually with `--cpu 4` (the page's CPU slowed four times, a typical office laptop).

- `node tools/agent/datagrid/bench.js 600,5000 --cpu 4 [--out file.json]`: bench.html (N records, pills, checkboxes,
  driven by useCollectionView): mount, three search keystrokes, clearing, sorting, select all, grouping and the longest
  frame while scrolling. Median of three runs.
- `node tools/agent/datagrid/profile.js <rows> <mount|scroll|sort|selectAll|search> --cpu 4`: the functions with the most
  self and total time during one action.
- `node tools/agent/datagrid/trace.js <rows> <action> --cpu 4 [--css "rules"]`: the main thread's time by kind (script,
  style, layout, paint) during one action; `--css` adds rules first, to find what a cost belongs to.
- `node tools/agent/datagrid/icon-paint.js [icons] [--inline]`: the paint cost of freshly inserted icons, as masks (the
  Icon component) or as inline SVG paths.
