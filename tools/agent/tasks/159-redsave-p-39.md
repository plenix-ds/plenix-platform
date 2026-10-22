# Task #159: P-39: No virtual card grid for large galleries (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/159 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **High**. Owner: **Codex**.

### What goes wrong

ContentGrid and AssetGallery draw every card; VirtualList is rows only. 1,500 MediaCards (10 elements each) take seconds. RedSave batches 120 at a time (~0.7 s to the first cards).

### Suggested fix

ContentGrid virtual (or a VirtualGrid): rows of cards drawn only in view, column count from width and size, keyboard and selection (useSelection) across the whole set.


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/159-p-39`, `Closes #159`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
