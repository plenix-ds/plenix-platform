# Task #147: DT-24: Column headers do not move with the columns when the table scrolls sideways (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/147 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

**From RedSave** (report of 19 October 2026, checked on Plenix 0.58.0). Priority: **High**. Owner: **Codex**.

### What goes wrong

When the columns are wider than the table (a SplitView list, a narrow window) the rows scroll sideways but the header row stays put, so every header sits over the wrong column. Measured: the scroll container is .plx-data-table__grid-tableholder (scrollWidth 1540, clientWidth 399); the header row is outside it (.plx-data-table__grid-header-contents); after scrollLeft = 300 the header is unchanged while the cells moved 300px.

### Suggested fix

Keep the header in the same horizontal scroll as the body (one scroll container with a sticky header row), or mirror the body's scrollLeft onto the header on every scroll (and on resize, sort, column changes); frozen columns stay pinned in both.


### Done means

- The behavior above, documented in the component's header comment (its design-system page reads it).
- No visual change outside what the issue asks for; a visible change is listed with before and after screenshots under **Needs the owner**.
- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK), `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Styling follows `platform/standards/styling.md`: a component styles only its own parts; no selector into another component, no `!important` (check-system rule `ownership`).
- No generated file in the branch (CI: GENERATED_OK).
- One pull request from branch `codex/147-dt-24`, `Closes #147`, listing what changed and how an app uses it, anything left undone, and **Needs the owner**.

### Files you own

- The component(s) the issue names and their tests; not the stylesheets Claude is changing for the Styling Standard (Phase 2–6) unless the issue needs it: say so in the pull request.

### Read first

1. `AGENTS.md`
2. `platform/standards/styling.md`
3. `tools/agent/web/BRIEF-web.md` (house rules)
4. The header comments of the files you edit
