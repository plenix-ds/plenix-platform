# Task #201: RedSave lane D: resizing, SplitView and the docs names (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/201 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

Resizing follows the pointer exactly and snaps on release to 4px or the given steps (P-34); at a limit it says why (tooltip and one polite announcement) and maxSize above 900 is honored (P-35). SplitView claims the master-detail page itself, and useAppLayout().claimPage is documented (P-41). Docs aliases by component name and component names in docs/index.json (P-42). A useCollectionView docs page and typed declarations (P-40).

The issues (each one's body has what goes wrong, the suggested fix and any owner decision; the grid audit:
https://claude.ai/artifact/LpyB4xTpDcBpVKV6ZdVrFQ):

- #151
- #174
- #175
- #163
- #160

### Files you own

platform/components/Resizable/** (not the pane height: lane A), platform/patterns/SplitView/** (not the pane height), platform/providers/pageLayouts.js and useAppLayout, the docs build (build-docs / release docs), a part file under lanes/ for the useCollectionView page

Not yours: anything Claude has on `styling/phase-2` at the same time (Phase 2 and 3 styling work, the other lanes' files).

### How to work (owner, 2026-10-19)

- Branch `codex/201-redsave-split-docs` from **`styling/phase-2`**; one pull request **into `styling/phase-2`** per issue, or one per
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