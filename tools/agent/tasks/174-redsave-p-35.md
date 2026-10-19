# Task #174: P-35: Resizing stops at a limit with no word why (and SplitView maxSize above 900 is ignored) (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/174 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **Medium**. Owner: **Codex**.

### What goes wrong

At minSize/maxSize, the other pane's minimum (320px) or the end of the size-token scale (900px: maxSize={1400} still stops at 900, aria-valuemax 900) the divider just stops.

### Suggested fix

At a limit, say so by the divider while dragging ("Smallest width for the list (360px)", "The other pane needs at least 320px"), announce it once politely, a brief bump (none with reduced motion); honour limits beyond the token scale (snap to 4px there).


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/174-p-35`, `Closes #174`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
