# Task #108: Developer experience for apps that use Plenix (#63, #65, #66, #67) (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/108 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### Start after

The open library tasks that edit existing components (#41 extends Spinner) are merged; it touches many components. Check the plan of record (#3). Until then, do the CDN parts (#65, #66, #67) first; they touch only build-packages.js and new files.

### The task

RedSave reported that mistakes fail silently and that apps learn Plenix by reading the bundle (`Redsave-v1/docs/plenix-issues.md`
#13, #17, #18, #19; GitHub #63, #65–#67).

| GitHub | Issue | The fix |
|---|---|---|
| #63 | Unknown variants (e.g. `Tabs variant="underline"`) render the default, silently | A development-only warning helper (`devWarn`, once per message, off in the production build) used where components read `variant`, `tone`, `size`: name the value and the valid ones |
| #65 | No changelog on the CDN | build-packages.js copies CHANGELOG.md to `/cdn/<version>/CHANGELOG.md` and adds a `breaking` list per version to the CDN's index.json (from a "Changed" or "Removed" section) |
| #66 | No docs on the CDN | `/cdn/<version>/docs/<id>.md` per record (purpose, usage, props from the header comment, examples) generated from the records build-packages.js already reads |
| #67 | Tokens undocumented; wrong `--plx-*` names fail silently | `/cdn/<version>/tokens.json` (from tokens.index.json: name, tier, purpose, value) and a development-only check (`platform/dev/token-check.js`, opt-in script) that lists `var(--plx-…)` names in the page's stylesheets that do not exist |

### Files you own

- platform/utils/devWarn.js (new) and the components that read variant/tone/size (only the warning line each)
- build-packages.js (the CDN additions only)
- platform/dev/token-check.js (new)
- new tests under tests/ (they must skip cleanly without the design system)

Never edit generated files.

### Done means

- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK),
  `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- `node build-packages.js` writes the new CDN files; a test checks them.
- No generated file in the branch (CI: GENERATED_OK). The browser tests run in CI on the pull request (if CI cannot
  start, say so in the pull request; the integrator checks it locally).
- One pull request from branch `codex/108-devx`, `Closes #108`, listing what changed and how an app uses it,
  anything left undone, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `tools/agent/web/BRIEF-web.md` (house rules)
3. The header comments of the files you edit
