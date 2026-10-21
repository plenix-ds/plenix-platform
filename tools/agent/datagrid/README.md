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
4. Remove the baseline's `node_modules` junction with `cmd /c rmdir` before `git worktree remove`.

The test browser runs with prefers-reduced-motion: reduce.
