# Lane 198 initial proof

Exact base 61577d19628ebfab6ce92077a1e16b0f81b06e77; same Node 22.23.3, Chrome, design-system revision and Windows runner. Light mode only. Original regression assertions run on both revisions without baseline updates.

- 184: Automatic viewport in a 560px SplitView pane was 964px, now 524px; 20 of 600 rows render. Explicit 100% remains bounded and virtualized. The exact-base test fails the pane-bound assertion.
- 185: Reapplying equivalent controlled sort values causes extra comparisons on base (12 to 18); head reuses the model. A custom sorter receives descending direction after changing sort, with rows ordered correctly.
- 149/189 initial work: typing Record 59 over 600 rows / eleven columns preserves the ten sorted results. Base: 4367 localeCompare calls, 9596 computed-style reads. Head: zero calls, two reads. Timing samples are end-to-end observations, not a statistical benchmark. Token/density override and recovery also pass.

The lane remains in progress: row/cell memoization and remaining issues are not complete. Shared barFit.js is unmodified pending scope authorization. No intended visual design change; only a viewport that stays inside its pane. Merges and releases belong to Claude.

187 partial: custom cell output is reused across unchanged parent renders, while selected/edited records update. Both row-menu entry points build items only when opened. The new regression fails on exact base (18 vs 12 custom render calls), passes head, verifies selection/edit output and the opened action. Full-row memoization remains in progress; this does not close 187.

187 row reuse: complete record rows now reuse overlapping virtual-window content. The 560px pane retains 20 rendered rows; a 320px scroll builds ten new cell adapters. View/edit changes invalidate row closures; selection invalidates affected rows, and Shift ranges read live selection. Moving rows bypasses this cache so drag state stays current. The regression verifies visible window advancement, selection/edit updates, lazy actions and preserving a selected record outside the Shift range.

188: predicate results are cached per original record and predicate/data revision, preserving the public record-level callback while TanStack visits columns. The pre-fix counter caught 6500 calls for nine typed characters over 600 records. The latest run uses 600 calls (deferred queries may coalesce), preserves the ten sorted results, and emits exactly one selection notification when selected Record 600 becomes hidden. The selection fixture uses record id 0; an earlier id 1 fixture selected Record 599, which correctly remained visible, and was corrected without changing the assertion. The no-extra-notification guard already existed and is now covered.

167: the existing header handler builds one key map and calls notifySelection once. The 600-record, eleven-column SplitView regression verifies 600 selected keys, one callback, visible-window-only rows, then zero keys and one additional callback on clearing. It is wired into normal DataGrid CI. No extra selection implementation was necessary after the windowing and row-reuse fixes.

150: a local 560px SplitView at browser y=1200 previously gave its grid a zero-height viewport and one row. Pane-local sizing now renders 20 rows in that same pane; normal placement also passes. Standalone grids retain their existing window-based fallback.
