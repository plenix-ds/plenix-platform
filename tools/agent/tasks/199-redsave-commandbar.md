# Task #199: RedSave lane B: CommandBar fit and selection (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/199 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

useBarFit measures only when the width, the items or the selection change, and finds the step in one pass (P-54). With rows selected the bar adds the selection's commands first, a separator, then the page's commands; search and filters stay (P-53, owner decision on the issue: `selection.mode: "add"` default, `"swap"` kept; `selection: "also" | "only" | "never"` per command).

The issues (each one's body has what goes wrong, the suggested fix and any owner decision; the grid audit:
https://claude.ai/artifact/LpyB4xTpDcBpVKV6ZdVrFQ):

- #186
- #195

### Files you own

platform/patterns/CommandBar/**, platform/patterns/BulkActions/**, the overflow helper it uses (platform/utils/overflow.js) only for P-54

Not yours: anything Claude has on `styling/phase-2` at the same time (Phase 2 and 3 styling work, the other lanes' files).

### How to work (owner, 2026-10-19)

- Branch `codex/199-redsave-commandbar` from **`styling/phase-2`**; one pull request **into `styling/phase-2`** per issue, or one per
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