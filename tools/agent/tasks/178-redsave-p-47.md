# Task #178: P-47: Many innerHTML / dangerouslySetInnerHTML sinks (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/178 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **Medium**. Owner: **Codex**.

### What goes wrong

8 innerHTML assignments and 13 dangerouslySetInnerHTML from Plenix (rich text, highlights, icons, the editor's start content). Firefox addons-linter flags each; Trusted Types reject them.

### Suggested fix

Build nodes with DOM APIs (icons as elements, highlights as text and <mark>); one sanitizing entry point for real HTML that works with Trusted Types (a policy name the app can allow).


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/178-p-47`, `Closes #178`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
