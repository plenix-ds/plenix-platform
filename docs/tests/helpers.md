# Test helpers and folders

The files and folders in `tests/` that are not tests themselves: the shared machinery the tests use, tools a person runs by hand, one-time proofs, and the sample pages and recorded results the tests compare with.

- Never run a test: tests run only when the owner starts them (`HANDOFF.md`, "No tests"). The commands below are listed so a person knows what each file is for.

## lib.js
The shared toolbox every browser test loads.
- What it is for: a small web server that serves the repository at `/Plenix/` (`serve`), a headless Chrome (`launch`; `CHROME_PATH` picks the browser), and small helpers (`sleep`, `ready`, the app list, `check`). It also passes `/Plenix/test-site/` on to the St. John test site and `/cdn/local/` to this checkout's CDN build.
- Who uses it: about 110 test files, and a few scripts in `tools/agent/`. It loads `limit.js`, so every browser test has a time limit.
- Command: none; it is loaded by the tests.

## run.js
The test runner: it starts the tests one after another and times each.
- What it is for: it holds the four lists. AUTOMATIC tests run by default; ON_DEMAND tests (a11y, high-contrast, contrast, theme, density) run only when named or with `--on-demand`; RELEASE tests (perf, w15c-packages, icons-package-282, cdn-devx) need the release build (`node build-packages.js`) and run only when named or with `--release` (issue #756); SPEC_ONLY (labs) runs only by name. Every test runs even after one fails.
- Who uses it: the `npm test`, `npm run test:full` and `npm run test:on-demand` scripts in `package.json`, and the workflows `ci.yml`, `full.yml` and `on-demand.yml`.
- Commands:
  - `node tests/run.js`: every automatic test, changed mode.
  - `node tests/run.js --full`: every automatic test, every page.
  - `node tests/run.js pages typography`: only these tests.
  - `node tests/run.js keyboard:Toolbar,Tabs`: only some parts of a test (see `parts.json`).
  - `node tests/run.js --on-demand`: the on-demand tests.
  - `node tests/run.js --release`: the tests of the release build, after `node build-packages.js`. The CI build job runs it after its release build (`ci.yml` and `full.yml`).
  - `node tests/run.js "zero-overlap --record"`: a test with its own flags (issue #764). The flags follow the name, in the same argument or in the ones right after it, and the run report shows them under the test's heading (`flags: --record`).
- Allowed flags: only the flags in its `FLAGS` list pass to a test. Any other flag after a name stops the run with a message, so a typo never records a baseline.
  - `--update`: visual, typography, component-tokens, reflow, focus-order.
  - `--record`: zero-overlap.

## changed.js
Works out what changed since the last commit, so each test checks only what the change can affect.
- What it is for: it maps changed files to pages. An app folder maps to that app's pages; a Platform component maps to the app and test-site pages that use it; global files map to a small fixed slice; a test's own file maps to that test on the slice. It also tells a group test when to run each child test (`wants`, `child`), and stops a baseline from being rewritten from a partial run or from growing.
- Who uses it: about 25 tests. CI prints the scope with it (`ci.yml`).
- Commands: `node tests/changed.js` (or `npm run test:scope`) prints the scope. Settings: `TEST_SCOPE=full`, `CHANGED_BASE=<commit>`, `TEST_SHARD=<i>/<n>`.

## check.js
The shared helper that decides whether a named check counts in this run and records its result.
- What it is for: running only some parts of a test (`TEST_ONLY=Toolbar,Tabs`), and collecting every check's result into one file (`TEST_RESULTS=<file>`). A check's part is the word before its first ": ".
- Who uses it: about 24 tests (and `lib.js` passes it on); `tools/build-test-parts.js` reads the check names; `tools/file-failures.js` reads the results file to open one GitHub issue per failing check.
- Command: none; it is loaded by the tests.
- Added in commit d1689e6b "Run tests by parts, and one GitHub issue per failing check" (owner, runtests-parts-27, in the file header).

## pixels.js
Takes pictures of chosen pages before a change and compares them after, to prove an invisible change really changed nothing on screen.
- Who uses it: no test or workflow; a person runs it by hand.
- Commands: `node tests/pixels.js save <folder> <page> …` then `node tests/pixels.js compare <folder> <page> …`. A page is an app path (`calendar/index.html`) or a design-system route (`#/forms/switch`).
- Added in commit b21b0d33 "Accessibility fixes without visual change (batch 211)".

## site.js
Points the tests at the St. John the Beloved test site and starts it when a test first needs it.
- What it is for: it lists the site's pages (`pages`, `urls`, `url`) and starts the site (a separate repository, Node and PostgreSQL) with this checkout's own CDN build, so a pull request is tested with its unreleased Platform. Settings: `SITE_DIR` (the site's folder, default `../st-john-test-site`), `SITE_DATABASE_URL` (default an in-memory database), `SITE_URL` (a site already running).
- Who uses it: `lib.js` and about 16 tests; `changed.js` reads its page list.
- Command: none; it is loaded by the tests.

## site-check.js
A quick check of the test site's source code, without building it.
- What it is for: each site file compiles, imports only public Plenix names, and keeps the site's rules (no inline styles, no color or pixel values, only existing utility classes, "servants" not "volunteer", no sacrament records).
- Who uses it: no test or workflow; `HANDOFF.md` names it. A person runs it by hand.
- Commands: `node tests/site-check.js` (every file), or `node tests/site-check.js <file> …`.

## site-guard.js
Makes sure a test site started by a test always stops when that test ends.
- What it is for: it starts the site's server and stops it as soon as the test that asked for it is gone, even if that test was killed.
- Who uses it: `site.js` starts it. Added in commit a16e7cf5 "Tests: a St. John site a test starts is always stopped when the test ends (#382 F8; 23 orphaned site servers held about 9 GB)".
- Command: none by hand (`site.js` runs `node tests/site-guard.js <test pid> <server.js>`).

## limit.js
A hard time limit for every test, so a stuck test fails fast and says what it was doing.
- What it is for: the default limit is 15 minutes, or 90 minutes in a full run; `TEST_TIMEOUT_MS` sets another. Owner, 2026-10-13: a per-push CI run took almost two hours (in the file header).
- Who uses it: `lib.js` (so every browser test) and about 24 tests directly.
- Command: none; it is loaded by the tests.

## parts.json
The list of parts (components) of each test, so a run can ask for only some of them.
- What it is for: `node tests/run.js <test>:<Part>,<Part>` accepts these parts. The file says the dashboard's Run tests window will offer them.
- Who uses it: written by `tools/build-test-parts.js` (no test runs); `run.js` names it.
- Commands: `node tools/build-test-parts.js` rewrites it; `node tools/build-test-parts.js --check` fails when it is out of date.

## compare.js
Takes full-page pictures of two copies of the repository and reports which pages differ.
- What it is for: a before-and-after proof across every app page and chosen design-system routes, with animations frozen.
- Who uses it: no test or workflow; named in `STATUS.md`, `HANDOFF.md`, `docs/build.md` and older task notes. A person runs it by hand.
- Command: `node tests/compare.js <before-folder> [<after-folder>] [--routes "#/a/b,#/c/d"] [--out <folder>]`. Prints SAME or DIFF per page.

## compare-styles.js
Compares one component's computed styles, element by element, between two copies of the repository.
- What it is for: when the clash audit reports a page as DIFFERS because its documentation changed, this proves the component's own elements are unchanged.
- Who uses it: no test or workflow; named in `STATUS.md`, `HANDOFF.md` and task notes. A person runs it by hand.
- Command: `node tests/compare-styles.js <before-folder> "<selector>" <route-or-page> …` (for example `node tests/compare-styles.js ../Plenix-rel ".plx-split-view" "#/layout/secondary-pane"`). Prints STYLES_SAME or STYLES_DIFF.

## style-compare.js
Compares the computed design values of every element on each page between two copies of the repository.
- What it is for: proves a refactor (moving values into tokens) changes nothing, even where a change is too small to see.
- Who uses it: no test or workflow; only `CHANGELOG.md` mentions it. A person runs it by hand.
- Command: `node tests/style-compare.js <before-folder> [<after-folder>] [--routes "…"] [--apps] [--scope ".ds-live"]`.
- Added in commit 6c6a1140 "Form controls on component tokens: … (batch 223)".

## clash-audit.js
The style clash audit: it finds places where two style rules set the same property on one element, and records every element's computed style.
- What it is for: the Plenix Styling Standard, section 13 (the runtime audit and the proof that the interface is unchanged). It sorts each clash by kind, records baselines, and with `--check` fails on new clashes or on any element whose style changed. `--strict` is the zero-overlap mode (Styling Standard 3.5).
- Who uses it: `zero-overlap.test.js` runs its strict audit in the page; the `styling-proof.yml` workflow runs it on the base and the head of a pull request.
- Commands: `node tests/clash-audit.js` (record), `node tests/clash-audit.js --check`, with `--pages dashboard,dam`, `--strict` or `--ds` (design-system routes).

## a11y-report.js
An accessibility work list, not a test: every axe-core finding grouped by rule and by the element it hits.
- What it is for: it covers the app pages and the design system, with colors and ratios for contrast findings.
- Who uses it: no test or workflow; `docs/build.md` says the owner runs it.
- Command: `node tests/a11y-report.js [rule]`, for example `node tests/a11y-report.js color-contrast`.

## icon-modules.js
A plug-in that lets tests which bundle Platform code themselves find the icon modules the way the real build does.
- Who uses it: `formats`, `command-actions`, `collection-facets`, `multi-groups`, `data-grid-rest` and `data-grid-next-independent` tests, and `next-source.js`. The build (`node build-app.js`) must have run first.
- Command: none; it is loaded by the tests.
- Added in commit 09299776 "CI triage fixes: … icon modules for the esbuild tests, …" (#282, #527 in the file header).

## next-engine.js
Swaps in the alternate DataGrid engine on a test page, without editing the applications.
- Who uses it: `data-grid.test.js`, when started with `DT_ENGINE=next`.
- Command: `DT_ENGINE=next node tests/data-grid.test.js`.

## next-source.js
Loads the new table engine straight from its source for focused checks, and refuses it if it imports the old grid code.
- Who uses it: `data-grid-next-capabilities.test.js`, when started with `NEXT_SOURCE` set.
- Command: none on its own.

## typography-181-compare.js
A one-time proof for issue #181: runs the typography inspector on 16 design-system cases, on the base and the head, in one browser.
- Who uses it: nothing runs it now. `docs/build.md` lists it as a one-time proof to "delete in the next clean-up".
- Command: `node tests/typography-181-compare.js <exact-base-checkout>`.

## typography-197-compare.js
A one-time proof for issue #197: the same comparison on the typography cases CI reported and four touched component routes.
- Who uses it: nothing runs it now. `docs/build.md` lists it as a one-time proof to "delete in the next clean-up".
- Command: `node tests/typography-197-compare.js <exact-base-checkout>`.

## ci197-paired.cjs
A one-time proof for issue #197: runs a set of tests on the base and the head with the same scope, and saves each log.
- Who uses it: nothing runs it now. `docs/build.md` lists it as a one-time proof to "delete in the next clean-up".
- Command: `node tests/ci197-paired.cjs <base-folder> <out-folder>`.

## ci197-results.cjs
A one-time proof for issue #197: compares the base and head logs `ci197-paired.cjs` saved and prints a summary.
- Who uses it: nothing runs it now. `docs/build.md` lists it as a one-time proof to "delete in the next clean-up".
- Command: `node tests/ci197-results.cjs <out-folder>`.

## fixtures/
Sample pages and code the tests open instead of a real app.
- `platform-host.html`: an empty page with this checkout's Platform (stylesheet, React, `platform.js`) for tests that draw their own components. About 58 tests open it, including the icon and rich-text tests.
- `baseline-app/`: a pretend application on Plenix 0.73.0 that breaks each baseline rule once, for `baseline-scan-273.test.js`. Never served.
- `redsave-types.tsx`: correct TypeScript app code that must compile against the type descriptions, for `types.test.js` (#170, #171).
- `rtl-ctm-question.html` and `rtl-ctm-question.js`: CTM's question block drawn with the Platform alone (issue 413), for `rtl-ctm-question.test.js`.
- `zero-overlap/`: `audit.html` and `pilot.html` with `pilot.js` for `zero-overlap.test.js`; `selector-kinds.css` for `selector-kinds.test.js`.
- `stages/`: the stage pages of three tests (`commandbar-find-fold.html`, `segmented-fold.html`, `header-labels-start.html`) and their page and pane widths (`stage.css`). They moved here from `docs/briefs/` in issue #772, because when #694 archived `docs/briefs/review.css` the stages lost their narrow widths.
- `collection-types-201.ts`: no test or file references it. It was added in commit 1ff1f1c2 "Take #213 (task 201): … collection state docs and types …". No recorded reason for keeping it.

## baselines/
Recorded results that some tests compare with. Most may only shrink: a test's `--update` refuses a partial run and refuses to add findings.
- `typography.json`: `typography.test.js`.
- `component-tokens.json`: `component-tokens.test.js`.
- `pilot-computed.json`: `zero-overlap.test.js` (`--record` takes it).
- `button.json`: `visual.test.js`.
- `a11y.json`: `a11y.test.js`. `focus-order.json`: `focus-order.test.js`. `reflow.json`: `reflow.test.js`.
- `clashes.json`, `computed.json`, `clashes-ds.json`, `computed-ds.json`, `overlap-strict.json`: `clash-audit.js` (and the `styling-proof.yml` workflow).

## divider-410-proof/
An empty folder.
- It is not in git, it holds no files, and no test, tool or document names it. It appeared on this computer on 2026-10-28.
- Its name matches issue #410, "Resizable's header comment: the divider without the pill (#375 follow-up)". No recorded reason.
