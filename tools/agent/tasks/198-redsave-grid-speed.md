# Task #198: RedSave lane A: DataGrid speed, row window and layout (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/198 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

The DataGrid engine: the row window in a SplitView (DT-35, DT-29: a pane with its own height is the room; `height="100%"` means the pane), sorting kept by value (DT-36), memoized rows and cells (DT-38), one filter call per row and a deferred search (DT-39, DT-27), one shared collator (DT-37), select all by key set (DT-28), the narrow list in a SplitView (DT-30), headers that scroll sideways with the body (DT-24: one scroll container, a sticky header row), one view store with useCollectionView (DT-31), group by any column (DT-23), unread rows (DT-32: `unread(record)`, semibold and a start bar in the accent; tokens point to existing colors). Order: DT-35, DT-36, DT-38, DT-39, DT-37 first (the measured slowness), then the rest. Owner decision on #190 (TanStack owns the logic) comes after this lane, by Claude: keep TanStack-friendly shapes.

The issues (each one's body has what goes wrong, the suggested fix and any owner decision; the grid audit:
https://claude.ai/artifact/LpyB4xTpDcBpVKV6ZdVrFQ):

- #184
- #185
- #187
- #188
- #189
- #149
- #167
- #150
- #168
- #147
- #169
- #165
- #164

### Files you own

platform/components/DataGrid/** (engine, cells, records, state, data-grid.css), platform/hooks/useCollectionView.js, platform/hooks/useVirtualizer.js, platform/patterns/GroupPanel/**, platform/patterns/SplitView/** (only the pane height), platform/components/Resizable/** (only the pane height)

Not yours: anything Claude has on `styling/phase-2` at the same time (Phase 2 and 3 styling work, the other lanes' files).

### How to work (owner, 2026-10-19)

- Branch `codex/198-redsave-grid-speed` from **`styling/phase-2`**; one pull request **into `styling/phase-2`** per issue, or one per
  lane when the issues cannot be split; `Closes #<issue>` for each.
- Never wait for a proof: run the quick checks (`node build-app.js`, `node check-system.js` SYSTEM_OK, `node check-spec.js`
  SPEC_OK), dispatch the GitHub workflow **Styling proof** on your branch (`gh workflow run styling-proof.yml -f head=<branch>
  -f base=styling/phase-2 -f ds=<routes> -f apps=<pages>`) and list the run in the PR; go on to the next issue.
- Hand edits are never skipped. A change of the same kind across many files may be scripted, but the script must stop on
  any case it does not match (keep the script in the PR description).
- No visual change unless the issue asks for one; say in the PR what looks different and why. No new colors, fonts or
  tokens without a reason in the PR; tokens only (no raw values); no `!important`; no inline styles.
- Names: the grid is **DataGrid** (`platform/components/DataGrid`, `plx-data-grid`), **Table** is static (`plx-table`, its
  base stylesheet generated from the grid's by build-steps.js). DataTable is an alias for one release.
- No generated file in the PR (`node tools/agent/generated.js --restore` before committing). Do not release.