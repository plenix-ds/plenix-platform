# Task #156: P-46: Importing Plenix prerenders or prefetches every link on the page (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/156 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **High**. Owner: **Codex**.

### What goes wrong

On import (platform/utils/prefetch.js) on any http(s) page Plenix adds an inline speculationrules script that prerenders every same-origin link (href_matches "/*", eagerness moderate), or prefetch links on hover. Prerendering runs pages the person never opened, with their cookies (sign-out, delete, mark-read links can fire); a strict CSP blocks the inline script.

### Suggested fix

No side effects on import; prefetching as an explicit opt-in call (enablePrefetch({ selector, eagerness: "conservative" })), never prerender, only for links the app marks.


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/156-p-46`, `Closes #156`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
