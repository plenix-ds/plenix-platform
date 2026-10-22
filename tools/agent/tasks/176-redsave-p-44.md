# Task #176: P-44: DeleteFlow's undo lasts a few seconds and cannot be lengthened (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/176 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **Medium**. Owner: **Codex**.

### What goes wrong

variant="undo" commits when the toast closes after the default few seconds; there is no duration and pausing on hover/focus is not documented.

### Suggested fix

An undo toast of at least 10 s that pauses while hovered or focused, a duration on DeleteFlow, and the time left shown (or kept until the next action).


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/176-p-44`, `Closes #176`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
