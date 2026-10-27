No tests: see HANDOFF.md (the owner runs them)

# Task #208: Zero overlap lane Z2: components A–L (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/208 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

Bring every stylesheet in your files to zero overlap (the owner approved the rollout, 2026-10-20; the Plenix Styling
Standard 3.3, 3.5, 3.6). The backlog lists what is left, by file: `check-system.selector-kinds.json` (selectors) and
`tests/baselines/overlap-strict.json` (runtime overlaps). Plan of record: #3.

### Files you own

platform/components/<A…L>/** except Button, Chat, Combobox, DataGrid, Icon, Input (Claude)

### How to work (owner, 2026-10-19)

- **Follow `tools/agent/zero-overlap.md`** (the recipe) and the pilot commit d5135035 (Button, Input, NavList, Icon,
  Floating): every selector one of the five kinds, each property declared once, values under mutually exclusive
  conditions, state variables `--plx-state-<component>-…` registered `inherits: false`.
- **Start after your RedSave lanes** (#198–#203). Never touch their files, or the files Claude owns below.
- Branch `codex/<issue>-zero-overlap-<name>` from **`styling/phase-2`**; pull requests **into `styling/phase-2`**, a few
  components per PR so each stays reviewable.
- Never wait for a proof: quick checks (`node build-app.js`, `node check-system.js`, `node check-spec.js`,
  `node tests/selector-kinds.test.js`, `node tests/zero-overlap.test.js`), then
  `node check-system.rules/selector-kinds.js --shrink` and `node tests/clash-audit.js --strict --check --pages <pages>`;
  dispatch **Styling proof** (`gh workflow run styling-proof.yml -f head=<branch> -f base=styling/phase-2 -f ds=<routes> -f apps=<pages>`)
  and list the run in the PR; go on.
- Hand edits are never skipped; a script for many files must stop on any case it does not match (put it in the PR).
- No visual change except the state-matrix corrections the Standard requires; list each with before and after.
- No new colors, fonts or tokens without a reason; tokens only; no `!important`; no inline styles.
- No generated file in the PR (`node tools/agent/generated.js --restore`). Never run `--baseline`. Do not release.

### Claude owns (not yours)

Button, Input (and Textarea, Select), Combobox, Chat, NavList, Icon (and build-icons.js), Popover, Stack and the layout
primitives in its folder, Tabs, Tree, RowButton, SegmentedControl, Menu, DataGrid, Table, AppHeader, everything in
platform/system/ and platform/tokens/, build-tokens.js, platform/templates/.

### Done when

Every file you own is gone from `check-system.selector-kinds.json`, the strict audit shows no overlap on the elements of
your components, and the proofs are listed.
