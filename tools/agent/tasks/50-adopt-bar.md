No tests: see HANDOFF.md (the owner runs them)

# Task #50: Command bar adoption in the other apps (#50) (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/50 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3

### Owner

Codex

### The task

Only the Asset Manager and Files use the CommandBar so far. Move every other application screen that acts on a
collection (a list, a table or a grid with selection, search, filters or sort) onto the CommandBar, the way
`files/files.jsx` and `dam/app/pages/home/HomePage.jsx` do: one bar that swaps to the selection's commands, the count
and "× N selected" inside the bar, Sort/Filter/Group/Columns/View never folding, `useCollectionView` for the data.
Remove the old toolbars (DataToolbar, FilterBar, BulkActions) from those screens. Keep each screen's behavior and
words; only the bar changes. List each screen you moved and each one you left (with the reason).

### Files you own

- the application screens: dashboard/, projects/, messages/, contacts/, calendar/, tasks/, notes/, bookmarks/, settings/ (their *.jsx), suite/ only if a shared part needs it
- not files/ or dam/ (already moved), not platform/

Never edit generated files.

### Done means

- The quick gates pass: `node tools/agent/lane-overlay.js`, `node build-app.js`, `node check-system.js` (SYSTEM_OK),
  `node check-spec.js` (SPEC_OK); `node --check` on every JS file you wrote.
- Every moved screen opens without console errors; `node tests/keyboard.test.js` and `node tests/navigation.test.js` pass.
- No generated file in the branch (CI: GENERATED_OK). The browser tests run in CI on the pull request (if CI cannot
  start, say so in the pull request; the integrator checks it locally).
- One pull request from branch `codex/50-adopt-bar`, `Closes #50`, listing what changed and how an app uses it,
  anything left undone, and **Needs the owner**.

### Read first

1. `AGENTS.md`
2. `tools/agent/web/BRIEF-web.md` (house rules)
3. The header comments of the files you edit
