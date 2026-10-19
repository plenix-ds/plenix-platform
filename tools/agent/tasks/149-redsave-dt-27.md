# Task #149: DT-27: Typing in the search blocks the page for ~0.3 s per key (600 rows) (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/149 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **High**. Owner: **Codex**.

### What goes wrong

Each key in the command bar's search blocks 87–318 ms on 600 rows × 11 columns, all JavaScript: ~25% the sort comparator (re-sorts every row per key; localeCompare builds a collator per call), ~20% CommandBar's useBarFit (a layout effect with no dependencies, stepwise re-measuring), ~12% DataTable resolving size tokens on every render (getComputedStyle / probe element), ~35% re-rendering the visible rows.

### Suggested fix

One Intl.Collator for the table; sort once and filter the sorted rows (or memoise by data and sort); useBarFit with dependencies, measuring once per frame; resolve token sizes once per density/theme change; memoised rows; defer the filter while typing (useDeferredValue / a short debounce).


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/149-dt-27`, `Closes #149`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
