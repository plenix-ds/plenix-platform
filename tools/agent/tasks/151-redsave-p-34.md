# Task #151: P-34: Resizing (SplitView, NavPane, Resizable) jumps between sizes while dragging (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/151 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **High**. Owner: **Codex**.

### What goes wrong

Resizable snaps on every pointermove to the size-token scale, whose steps are 40–180px apart at list widths (400 → 500 → 560 → 600 → 720 → 900), so the edge sits still and then leaps.

### Suggested fix

Follow the pointer exactly while dragging (clamped to the limits) and snap on release to the nearest 4px (or the nearest of steps); keyboard moves keep stepping; animate the settle (none with reduced motion).


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/151-p-34`, `Closes #151`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
