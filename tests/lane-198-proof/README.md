# Lane 198 initial proof

Exact base 61577d19628ebfab6ce92077a1e16b0f81b06e77; same Node 22.23.3, Chrome, design-system revision and Windows runner. Light mode only. Original regression assertions run on both revisions without baseline updates.

- 184: Automatic viewport in a 560px SplitView pane was 964px, now 524px; 20 of 600 rows render. Explicit 100% remains bounded and virtualized. The exact-base test fails the pane-bound assertion.
- 185: Reapplying equivalent controlled sort values causes extra comparisons on base (12 to 18); head reuses the model. A custom sorter receives descending direction after changing sort, with rows ordered correctly.
- 149/189 initial work: typing Record 59 over 600 rows / eleven columns preserves the ten sorted results. Base: 4367 localeCompare calls, 9596 computed-style reads. Head: zero calls, two reads. Timing samples are end-to-end observations, not a statistical benchmark. Token/density override and recovery also pass.

The lane remains in progress: row/cell memoization and remaining issues are not complete. Shared barFit.js is unmodified pending scope authorization. No intended visual design change; only a viewport that stays inside its pane. Merges and releases belong to Claude.

187 partial: custom cell output is reused across unchanged parent renders, while selected/edited records update. Both row-menu entry points build items only when opened. The new regression fails on exact base (18 vs 12 custom render calls), passes head, verifies selection/edit output and the opened action. Full-row memoization remains in progress; this does not close 187.
