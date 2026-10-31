# The build, the checks and the custom tools

This is the one inventory of every custom tool in this repository (owner decisions #698 and #712). The rule it serves is in `CLAUDE.md` ("No custom tooling unless absolutely necessary").

- Every custom tool is listed here with what it writes or checks, whether it is necessary or replaceable, and the standard tool that would replace it.
- N means necessary: no standard tool or plugin does the job today. R means replaceable by the standard tool named in the last column. ★ means the tool enforces one of the owner's design rules (no new colors, the 4px grid, corners 2 to 6px, tokens only, no inline styles).
- A new custom script, generator or check is added only when its pull request shows that no standard tool or plugin can do the job, and it is added to this table in the same pull request.
- Checked against the code on 2026-10-31 (the `styling/phase-2` branch; every Vite step of #709, 1 to 7, done).

## Which tool builds what

- Style Dictionary builds the reference tokens (#372 step 1) and the text roles (#372 step 3) beside `build-tokens.js`, into the ignored `build/sd/`. `build-tokens.js` still writes every committed token file until #372 step 10.
- The checks `build-tokens.js` made while it built are the check-system rule `token-sets` (#372 step 2), so they hold whatever builds the token files. `build-tokens.js` keeps its own copies of them, with the same messages, until step 10 retires it.
- Vite builds all JavaScript: the Platform bundle, the 10 suite applications, the Asset Manager and `@plenix-ds/react`'s ES module, CommonJS and CDN files (#709).
- esbuild minifies the CSS: `build-packages.js` bundles `platform.css` into `plenix.css` and writes `plenix.min.css` with it (owner, #711). Vite also runs esbuild inside it, to compile JSX.
- esbuild also stays the stand-in for an application's bundler in `tools/agent/one-part-sizes.js`, and the tests' helpers (`tests/icon-modules.js`, `tests/next-source.js`) and a few tests bundle with it, so it stays in `package.json`.
- `@babel/standalone` bundles nothing any more: it is the parser of `check-bundle.js` (it reads `plenix.js`), `check-copy.js`, `build-types.js` and the check-system rules `count-phrases`, `icon-imports` and `composition`, so it stays in `package.json`.
- The old bundler of `build-app.js` (Babel compiled each file into a table of modules, joined into one script) is gone: Vite replaced it in #709 steps 2 to 4, and step 6 removed its last leftover, the one-time comparison script; nothing in the repository still uses it.

## Build

| Tool | What it writes | N or R | Standard replacement |
|---|---|---|---|
| `build-app.js` (`npm run build:app`) | The one build command. It bundles nothing itself: it runs the pre-steps (`build-exports.js`, `build-spec-parts.js`, `build-tokens.js`, `build-icons.js`, `build-brand.js`, `build-standards.js`, the icon files of `tools/icons/site-icons.js`, `build-steps.js`, `build-platforms.js`, `build-native-guidance.js`, `build-reviewed.js`), then Vite's JavaScript API for `platform/dist/platform.js` (`vite.platform.config.mjs`) and once per application for each suite application's `app.js` and the Asset Manager's `dam/app/assets.js` (`vite.apps.config.mjs`). It keeps every bundle in memory (`write: false`), refuses an output outside its allowed list, and writes the files only when every bundle compiled and passed its checks, so a failed build leaves the committed files as they were | R in part | each pre-step's own replacement in its row below; the one command stays, because Vite has no step that writes several separate bundles all or nothing |
| `vite.platform.config.mjs` and its two small plugins | The Vite settings of the Platform bundle. `plenix-icons` resolves the icon modules (`plenix-platform/icons/<set>/<name>`) to the icon asset layout and writes a Material one on demand. `plenix-finish` adds the GENERATED banner, freezes `window.Plenix` as a plain object and checks the public API (every name `platform/index.js` exports, defined, once, and nothing else). The hidden source map goes to the ignored `build/vite/` | N | none: Vite has no option for these three Plenix rules, and Vite drops Rollup's banner from a one-file (iife) library |
| `vite.apps.config.mjs` and its two small plugins | The Vite settings of the 11 application bundles: the 10 suite applications (`<app>/main.jsx` to `<app>/app.js`) and the Asset Manager (`dam/app/assets.jsx` to `dam/app/assets.js`). Each is one classic script (an iife) with React, ReactDOM and Plenix taken from the page (`window.React`, `window.ReactDOM`, `window.Plenix`), classic JSX, no minifying and no source map. Vite builds one iife per run, so `build-app.js` runs it once per application. It reuses the Platform config's `plenix-icons` plugin. `plenix-approved` refuses a browser package other than the approved `@tanstack` ones. `plenix-finish` adds the GENERATED banner and the guard that names a missing global (`Plenix: "plenix-platform" is not loaded before this script`). Run alone: `PLENIX_APP=<app> npx vite build --config vite.apps.config.mjs` (`dam` for the Asset Manager) writes into the ignored `build/vite/` | N | none: Vite drops Rollup's banner from an iife library and has no option for the guard or the package rule |
| `vite.packages.config.mjs` and its one plugin | The Vite settings (library mode) of `@plenix-ds/react`'s JavaScript, one run per build (`PLENIX_PACKAGE=esm`, `cjs` or `cdn`), all three run by `build-packages.js`. `esm`: the ES modules in `packages/react/dist/`, one entry per module `platform/index.js` exports from at its own path, the barrel `dist/index.js` and the Arabic opt-in `dist/i18n/ar.js`, with shared code in `dist/chunks/` (#685). `cjs`: `dist/index.cjs`, one file. `cdn`: `release/cdn/<version>/plenix.esm.js`, one file, whose banner gives it its own address (`const __plenixModuleUrl = import.meta.url`, #284). React stays a peer import, classic JSX, es2019, no minifying; every file starts with the package banner (Rollup's `output.banner`). What loads only when asked (#702) is two `resolve.alias` entries, in the `esm` build only: `../i18n/ar.js` resolves to `tools/npm-esm/ar.js` (an empty catalog the opt-in fills) and Icon's `./library.js` to `tools/npm-esm/library.js` (an empty list with `loadLibrary()`). The one plugin, `plenix-icon-names`, writes the lazy chunk of the icon names, and fails the build when either alias is reached from any file but LocaleProvider or Icon. It reuses the Platform config's `plenix-icons` | N | none: no alias or resolve option loads one export of a module (the `LIBRARY` line of the generated `glyphs.js`, 54 KB) as a module of its own. It replaces `tools/npm-esm.js` (an esbuild plugin) |
| `build-exports.js` | The flattened export list of the library lanes (`platform/index.js` and `platform.css` blocks) | R | a plain index file, or Vite |
| `build-tokens.js` (`--check` is run by check-system) | The token stylesheets (`platform/system/tokens/*.css`, the themes) and `tokens.index.json`, from `platform/tokens/*.tokens.json`. It no longer expands typography composites: the text roles are written as separate tokens (#372 step 3). It stays until #372 step 10, when plain Style Dictionary builds every token file | R | Style Dictionary |
| Style Dictionary (`npm run tokens:sd`, `style-dictionary/reference.config.json` and `typography.config.json`) | Beside `build-tokens.js`, not instead of it, as CSS custom properties in the ignored `build/sd/`: the reference tier in `reference.css` (#372 step 1) and the text roles in `typography.css` (#372 step 3; it also writes the tokens the roles point to, so their references resolve). Plain Style Dictionary, owner's choice (#372): only its built-in `css/variables` format and `name/kebab` transform, `outputReferences` on, selector `:root`, configured in JSON files with no functions and run by its own command line. `npm run tokens:sd:check` builds both and compares them with `platform/system/tokens/reference.css` and with the 56 `--plx-sys-text-*` properties of `semantic.css` (`tools/agent/sd-reference-compare.js`) | standard tool | it is the standard tool; it takes over each tier step by step (#372 steps 4 to 9) |
| `build-mobile.js` | The native token files: `PlenixTokens.swift`, `PlenixTokens.kt`, `plenix_tokens.dart` | R | Style Dictionary |
| `build-icons.js` | `icon.css`, `glyphs.js` and the icon asset layout, from `platform/icons/` | R in part | svgo plus a small script |
| `build-brand.js` | The brand stylesheet and favicon, from the owner's brand kit | R | Vite |
| `build-types.js` | `packages/react/index.d.ts`, read from the header comments of the source files | R | `tsc`, after the source moves to TypeScript |
| `build-standards.js` | Code from `platform/standards/*.json`: page layouts and the layout-mode stylesheet | N | none |
| `build-steps.js` | `platform/system/steps.css`: one rule per allowed size step, so no value is ever passed in a style attribute ★ | N | maybe Style Dictionary later |
| `build-usage.js` | The usage index: which Plenix applications use each export | N | none |
| `build-reviewed.js` | Each item's "last reviewed" date, from git history | N | none |
| `build-spec-parts.js`, `build-platforms.js`, `build-native-guidance.js`, `build-docs.js`, `build-docs-components.js` | The design spec's data: the library parts, the Platforms Standard, native guidance, the PRD viewer, the component aliases | N while the custom spec stays | Storybook MDX for components |
| `build-packages.js` and `build-packages.d/` (angular, vue, web-components, mcp, figma, lint) | The four npm packages, the versioned CDN folder, the JSON API, and the wrapper packages for Angular, Vue, web components, MCP, Figma and the lint adapters. `@plenix-ds/react`'s JavaScript comes from Vite (`vite.packages.config.mjs`, #709 step 5); the script keeps the package folders, `package.json` and the exports map, the copies, the styles and the API. It runs Vite's command line once per build (`PLENIX_PACKAGE=cdn`, `esm`, `cjs`). The stylesheet bundle `plenix.css` and `plenix.min.css` stay esbuild's: the owner kept esbuild as the CSS minifier (#711) | R in part | Changesets for the versions; the JSON API and the wrappers stay short scripts (N) |

## Checks

| Tool | What it checks | N or R | Standard replacement |
|---|---|---|---|
| `check-system.js` and `check-system.rules/` (32 rule modules, the shared-fill rule of #693 and the token-sets rule of #372 among them) | Structure, markup, generated files, icon names and imports, hook adoption, built-in words, count phrases and more. `token-sets` holds the checks of the token source that `build-tokens.js` made while it built (#372 step 2): a theme writes no color literal and defines the same roles and foundations as the default theme, a token is defined in one file only, the glob sets and their file names, a print value has no contrast values, and no token is a typography composite | N | ESLint plugins, later |
| `check-system.rules/token-definitions`, `color-groups`, `site-styles` and the style modules | No new colors, the 4px grid, corners 2 to 6px, tokens only ★ | N | an ESLint or Stylelint plugin |
| `check-style.js`, `tools/stylelint/plenix.mjs` and `.stylelintrc.json` | Tokens only, raw values, palette colors, class names, token tiers, logical properties ★ | N | already a Stylelint plugin; `check-style.js` holds what Stylelint cannot read |
| `check-common.js` | The file list and the reporter the two checks share | N | none |
| `check-copy.js` | Wording of the default texts | N | none |
| `check-spec.js` | The design spec against its own standard | N | none |
| `check-bundle.js` and `check-bundle.baseline.json` | The built CDN files against the size and content rules; parses `plenix.js` with `@babel/standalone`, so it reads the code and not the comments, and traces each finding to its source file through the Platform bundle's source map (`build/vite/platform.js.map`) | R | size-limit |
| `tools/agent/one-part-sizes.js` | The size of one import from the npm package (`{ Button }`, `{ Badge }`, `{ DataGrid }`, `* as P`); `check-bundle.js` calls it, and it prints the same numbers on its own (#685). It bundles each import with esbuild, minified, React external, on purpose: esbuild stands in for the application's bundler, not for Plenix's build. esbuild is a standard bundler many applications use and tree-shakes the package as a typical application bundler would, and keeping it keeps every limit comparable with the audit's numbers (#684, #685) | R | size-limit |
| `tools/agent/types-any.js` and `types-any.baseline.json` | The count of `any` props in `packages/react/index.d.ts` never goes up (CI, #687) | R | `tsc` with `noImplicitAny`, after the source moves to TypeScript |
| `tools/fixtures/` | The fixtures a check proves its own rule on (`spec-color-samples/`: the good and the shrunk color sample of `check-spec.js`) | N | none |
| `tools/check-live-cdn.js` | After a release, whether the live CDN serves what the release built | N | none |
| `tools/check-readiness.js` | A release stops while a `priority:1` issue is open | N | none (a GitHub required check could replace it) |
| `tools/check-overflow.js` and `tools/overflow-allow.json` | The overflow audit of every page, run by the owner; the allow-list holds the intentional cases | N | Playwright Test |
| `tools/baseline/scan.js` | The baseline scan of an application against the newest Plenix (#273) | N | none |

## Tests

| Tool | What it does | N or R | Standard replacement |
|---|---|---|---|
| `tests/lib.js`, `run.js`, `changed.js`, `check.js`, `limit.js`, `pixels.js` | The Puppeteer runner, the changed-mode scope, the results file, the screenshots | R | Playwright Test |
| `tests/*.test.js` (118 files), their `tests/fixtures/` and the `layout.test.js` wiring | The tests themselves. They are not tooling: they are the product's checks | N | none |
| `tools/build-test-parts.js`, `tools/file-failures.js` and `tools/file-failures-example/` | The parts list of each test; one GitHub issue per check still failing after an owner-started run; the example folder is a dry run of it (its results, the open issues and the printed output) | N | none |
| `tests/site.js`, `site-guard.js`, `site-check.js` | The St. John test site for the browser tests: starting and stopping it, and a static check of its source | N | none |
| `tests/icon-modules.js`, `next-engine.js`, `next-source.js` | Helpers the tests import: the icon modules for esbuild, the alternate DataGrid engine and its source fixture | N | none |
| `tests/clash-audit.js` (the styling-proof workflow), `compare.js`, `style-compare.js`, `compare-styles.js` | Before and after comparisons of two copies of the repository: computed styles and pixels | R | Playwright Test screenshots |
| `tests/a11y-report.js` | The accessibility work list (axe-core findings grouped by rule), run by the owner | R | axe-core's own reporter |
| `tests/typography-181-compare.js`, `typography-197-compare.js`, `ci197-paired.cjs`, `ci197-results.cjs`, `tests/lane-198-proof/**/*.cjs` | One-time proofs of past pull requests, named in their proof folders' READMEs | R | delete in the next clean-up |
| 37 npm scripts in `package.json` (24 of them alias one test or one test group) | Commands | R | one test command, plus build, lint and release |

## Other tools

| Tool | What it does | N or R | Standard replacement |
|---|---|---|---|
| `tools/icons/` (inventory, restyle, fetch, measure, site icon files, brand logos) | The owner's icon rules: restyling icons from other libraries, per-site icon files | N; R in part | svgo |
| `tokenize-component.js` | Moves a component's design values into component tokens (a one-time migration tool; keeps one declaration per line) | R | Style Dictionary and Stylelint fixes |
| `deploy.sh` | Publishes the apps, the design system, the release's CDN files and the JSON API to the publish host | N | none |
| `tools/publish-config.sh` | The publish host and account for the deploy scripts | N | none |
| `services/login/deploy.sh`, `services/save/deploy.sh`, `services/registry/add-user.sh`, `prefetch.sh`, `services/auth/*.mjs` | Build and start the login and save services on the publish host; the package registry's accounts and prefetch; the proxy hosts' configuration | N | none |
| `.github/phase-guard/phase-guard.js` and `labels.json` | Checks a phase label change on an issue against the allowed table (the phase-guard workflow) | N | none |
| `tools/agent/sd-reference-compare.js` | One-time comparison (#372 steps 1 and 3): a tier from `build-tokens.js` against Style Dictionary's, property by property (missing, extra, different values, and the conditional declarations plain Style Dictionary does not write yet). `--only <prefix>` limits it to one family of properties, as the text roles (`--plx-sys-text-`). Deleted when #372 step 10 retires `build-tokens.js` | R | delete at #372 step 10 |
| `tools/agent/generated.js`, `take-pr.js`, `release.sh` | The generated-file guard, merging of a pull request, releases | R | stop committing generated files (#692); Changesets |
| `tools/agent/lane-overlay.js` and `lanes/` | Carries spec changes around the separate spec repository | R | bring the spec into this repository (the owner's call) |
| `tools/agent/datagrid/`, `native/`, `library/`, `spec-merge/`, `web/s3/addtok.js` (with its entry files `web/s3/*.json`), `web/s3/merge-base.js`, `build-study.js`, `native/merge.js` | Measuring and comparison probes, the native-guidance and Figma generators, the library plan generators, small helpers. Kept after the clean-up because a person may still run them by hand | R in part | delete when no one runs them |

## What is deleted when it has been used

- One-time scripts (migrations, one-off patches, throwaway probes) are deleted in the pull request that used them.
- The clean-up of 2026-10-31 (issue #712) removed 59 scripts from `tools/agent` that no build, check, workflow, test or npm script referenced, with the data only they read (`web/s3/reflow-base.json`, `color-migration.report.txt`). The pull request lists each file and why.
- Vite step 6 (#709) deleted `tools/agent/compare-vite-platform.js`, the one-time comparison of the old bundler's `platform.js` with Vite's (Vite step 1).
