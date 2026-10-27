# Plenix Platforms Standard on the web: brief for each writer

Repo: your working directory (C:/Users/Administrator/Documents/Plenix, or your git worktree of it). The standard is platform/standards/platforms.md (read 1.6,
3.1–3.5, 4.3, 5.2–5.5, 6.5, 8.1). The audit of what is missing is in
tools/agent/web/AUDIT.md.
You fix the items in your task, in the files your task names. Other writers work on other files at the same time.

## The house rules (strict; the checks enforce most of them)
- React owns behavior (platform/components, platform/patterns; JSX; public on window.Plenix). Apps are in dam/, notes/,
  messages/, contacts/, files/, settings/, tasks/, calendar/, projects/, dashboard/, bookmarks/, suite/.
- Nothing hard-coded: every value is a token (platform/tokens/*.tokens.json is the source; node build-tokens.js
  generates the CSS). No inline styles at all: no style attribute, not even a custom property (check-system.js and
  the pages test reject it). A value from data reaches CSS as a class or a data attribute with one rule per step.
- New token: add it to the right platform/tokens/*.tokens.json with a $description; component tokens are
  --plx-comp-<component>-<role>, pointing to plx-sys roles. Never add a palette (plx-ref) color.
- American English, sentence case for UI text. Focused fields change only their border color (no outer ring).
- Containers nest 2 deep at most. A dynamic table (sort, filter, group, search) is the DataGrid; a static table is the Table, which looks the same; never a hand-built table.
- A new component needs an inventory record (platform/design-system/inventory.js, attached to its taxonomy leaf in
  inventory-taxonomy.js) with its written sections, like its neighbors.
- Keep the code style of the file you edit (comments, naming, density). Header comments: Summary / Usage / Props /
  Behavior / Notes.

## Check your work (all must pass)
- node build-app.js (then the generated files are current)
- node check-system.js   → SYSTEM_OK
- node check-style.js    → STYLE_OK
- npm run lint:css       → no errors
- node check-spec.js     → SPEC_OK
- node tests/pages.test.js → PAGES_OK (slow: run once at the end)
- the tests for what you touched: tests/keyboard.test.js, tests/layout.test.js, tests/data-grid.test.js,
  tests/a11y.test.js (must not get worse), tests/theme.test.js, tests/density.test.js, tests/visual.test.js.
  Use a free port if a test takes one (several writers run tests at the same time; tests/lib.js serve(PORT): if a port is
  busy, set the env or edit nothing — wait and rerun).
- Look at what you built in Chrome (the tests use puppeteer; you may write a small puppeteer script in the scratchpad).
- Do not commit, release or deploy. Do not edit files outside your task's list except new files you create and the
  token JSON entries you need.

## Report
Per item: what you changed (files), how you verified it, test results, anything left (with the reason). Short.
