# Plenix: instructions for coding agents (Codex, Claude)

Plenix is a design system (the Plenix Platform: React components, patterns, tokens, icons) and the suite of applications
built on it. Several agents work on it at the same time, each owning one task. GitHub coordinates them: one task = one
issue = one branch = one pull request. The owner decides every look and standard; the integrator (a Claude session)
merges, builds, releases and deploys.

## Finding your work

- **Who does what:** the pinned issue "Plan of record" (https://github.com/plenix-ds/plenix-platform/issues/3) lists
  every task with its owner and status.
- **Your task's brief is in the repository:** `tools/agent/tasks/<issue number>-<slug>.md` (the same text as the issue).
  Read it there: you may have no access to GitHub issues from your environment.
- Your tasks are the briefs whose title names you (`(Codex)` or `(Claude)`) and the issues labeled `agent:codex` or
  `agent:claude`. Take one task at a time; never start a task the plan of record gives to another agent.

## Your task

- Take only an issue labeled for you (`agent:codex` or `agent:claude`). Its body names the task, the files you own and
  what done means. Never edit a file outside that list, except new files your task creates.
- Work on a branch named `<agent>/<issue number>-<slug>` (for example `codex/41-w10c-forms`). Open a pull request that
  says `Closes #<issue>` and fills in the template.
- Never push to `main`, merge, tag, release or deploy, and never run `tools/agent/release.sh` or `deploy.sh`.
- When a decision is not yours (a color, a look, a standard), build with existing roles only and list it in the pull
  request under **Needs the owner**. Never add a color, theme, accent or other visible design choice on your own.

## Environment

- Node 22. `npm ci`.
- The design system, `platform/design-system`, is a private submodule (`plenix-ds/plenix-design-system`). Check it out
  with a read token: `git config --global url."https://x-access-token:${DS_TOKEN}@github.com/".insteadOf "https://github.com/"`
  then `git submodule update --init --depth 1`. Without it you can build the Platform but not the design-system pages.
- Paths in the briefs that start with `C:\Users\Administrator\...` are the owner's machine: read them as the repo root.
  Windows-only setup steps (the `node_modules` junction) do not apply to you.

## Generated files: never commit them

`node build-app.js` rewrites many files (the bundle, the token CSS, the token index, the mobile token files, every
`<app>/app.js`, `platform/index.js`, `platform/platform.css`, …). Every branch would change them, so every pull request
would conflict with the next. The list is `tools/agent/generated.js`.

- Build as often as you like to test, but before every commit run `node tools/agent/generated.js --restore`.
- CI fails a pull request that changes one (`GENERATED_FAIL`). The integrator rebuilds them when it merges.
- `CHANGELOG.md` and `package.json` are written by the release: describe your change in the pull request instead.

## Design-system files go under `lanes/`

A pull request on this repository cannot change the design system's own repository. Keep every file your task adds or
changes inside `platform/design-system/` at `lanes/<task>/design-system/<the same path>`, for example
`lanes/w10C/design-system/parts/w10C.records.js`.

- `node tools/agent/lane-overlay.js` copies them into the checked-out submodule. Run it before `node build-app.js`;
  CI does the same.
- Edit the copies under `lanes/`, never the submodule directly: the submodule's changes are not in your pull request.
- The integrator moves them into the design system's repository at merge (`tools/agent/take-pr.js`).

## House rules (strict; the checks enforce most of them)

- **Dark mode is last priority (owner, 2026-10-19).** Do not fix, tune or check dark-mode looks in any task; check and prove
  in light only. A dark-mode problem you notice goes as a comment on #205 (the dark-mode to-do), never into your PR.
- **Zero overlap (owner, 2026-10-19/20).** Every stylesheet you touch follows `tools/agent/zero-overlap.md`: flat selectors
  (one of the five kinds), each property declared once, values under mutually exclusive conditions, state variables
  `--plx-state-<component>-…` registered `inherits: false`. Nothing new may enter the two backlogs; lanes #207–#210.
- Nothing hard-coded: every value is a token. Tokens are JSON (`platform/tokens/*.tokens.json`,
  `platform/tokens/components/<name>.tokens.json`); the build generates the CSS. Tiers: `--plx-ref-` (the palette),
  `--plx-sys-` (theme roles), `--plx-comp-<component>-<role>` (pointing to plx-sys roles). Never add a palette color;
  a component reads a color by its token name, never a hex.
- No inline styles anywhere: no `style` attribute, not even a custom property. A value from data reaches CSS as a class
  or a data attribute with one rule per step.
- Every size on the 4px grid; logical properties; never a 1px or 2px nudge to make something fit.
- Class names start with `plx-` (BEM). React owns behavior. Header comments: Summary / Usage / Props / Behavior / Notes.
- Focused or invalid fields change only the border color (no outer ring). Menus 8px radius. Containers nest 2 deep at most.
- Every table is the DataGrid. Statuses are Badges with an icon, never a dot. Links are not buttons.
- Icons only from `platform/icons/map.json` (Material Symbols Sharp, unedited).
- Reddit Mono for code and technical values (numbers, dates); DM Sans for UI text. American English, sentence case.
- A pattern is built only from Platform components. Mobile widths follow the HIG (iOS) or Material 3 (Android).
- Keep the style of the file you edit: comments, naming, density.
- Native designs (`tools/agent/native/*.json`): when the page already exists in `platform/standards/native-design.json`,
  your fragment adds variants to it; it never replaces another task's designs (the merge adds them by name).
- Never stop processes by name (`pkill`, `taskkill /IM`): only a process you started, by its PID.

The full briefs: `tools/agent/web/BRIEF-web.md` (house rules and checks), `tools/agent/library/BRIEF-lane.md` and
`tools/agent/library/PROMPT-lane.md` (library lanes: what you own, the part files, exports, tokens, native designs),
`tools/agent/library/plan.md` and `plan.json` (the waves, the recipe per kind, the leaves of each lane). `CLAUDE.md` is
the codebase's own rules.

## Checks before you open or update a pull request

Quick gates (seconds), every time:

```bash
node tools/agent/lane-overlay.js
node build-app.js
node check-system.js
node check-spec.js
node tools/agent/generated.js --restore
```

`node --check` on every JavaScript file you wrote. `check-system.js` must print `SYSTEM_OK` and `check-spec.js`
`SPEC_OK`. For a library lane also run your labs (`LABS_ONLY=<lab ids> node tests/labs.test.js`) and
`node tools/agent/native/check.js <your native fragments>` (`ALL OK`).

The browser tests (pages, accessibility, keyboard, labs, contrast, …) run in CI on your pull request, in changed mode.
Fix what they report. Run them locally only if Chrome is available (`CHROME_PATH`).

## Pull request

Fill in the template: what and why, the files, the checks and their results, anything left undone with the reason, and
**Needs the owner**. Keep it short.

## Integration (the integrator only)

`node tools/agent/take-pr.js <number>` copies the branch's source files into the main checkout (generated files skipped,
`lanes/*/design-system` into the submodule, files changed in main since the branch started reported instead of
overwritten). Then `node build-app.js`, the quick gates, `tools/agent/release.sh`, and the pull request is closed with a
comment naming the version.
