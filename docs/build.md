# The build, the checks and the custom tools

This is the one inventory of every custom tool in this repository (owner decisions #698 and #712). The rule it serves is in `CLAUDE.md` ("No custom tooling unless absolutely necessary").

- Every custom tool is listed here with what it writes or checks, whether it is necessary or replaceable, and the standard tool that would replace it.
- N means necessary: no standard tool or plugin does the job today. R means replaceable by the standard tool named in the last column. ★ means the tool enforces one of the owner's design rules (no new colors, the 4px grid, corners 2 to 6px, tokens only, no inline styles).
- A new custom script, generator or check is added only when its pull request shows that no standard tool or plugin can do the job, and it is added to this table in the same pull request.
- Checked against the code on 2026-10-31 (the `styling/phase-2` branch).

## Build

| Tool | What it writes | N or R | Standard replacement |
|---|---|---|---|
| `build-app.js` (`npm run build:app`) | Runs the other builds, then bundles `platform/dist/platform.js` and each application's `app.js` (Babel and esbuild) | R | Vite |
| `build-exports.js` | The flattened export list of the library lanes (`platform/index.js` and `platform.css` blocks) | R | a plain index file, or Vite |
| `build-tokens.js` (`--check` is run by check-system) | The token stylesheets (`platform/system/tokens/*.css`, the themes) and `tokens.index.json`, from `platform/tokens/*.tokens.json` | R | Style Dictionary |
| `build-mobile.js` | The native token files: `PlenixTokens.swift`, `PlenixTokens.kt`, `plenix_tokens.dart` | R | Style Dictionary |
| `build-icons.js` | `icon.css`, `glyphs.js` and the icon asset layout, from `platform/icons/` | R in part | svgo plus a small script |
| `build-brand.js` | The brand stylesheet and favicon, from the owner's brand kit | R | Vite |
| `build-types.js` | `packages/react/index.d.ts`, read from the header comments of the source files | R | `tsc`, after the source moves to TypeScript |
| `build-standards.js` | Code from `platform/standards/*.json`: page layouts and the layout-mode stylesheet | N | none |
| `build-steps.js` | `platform/system/steps.css`: one rule per allowed size step, so no value is ever passed in a style attribute ★ | N | maybe Style Dictionary later |
| `build-usage.js` | The usage index: which Plenix applications use each export | N | none |
| `build-reviewed.js` | Each item's "last reviewed" date, from git history | N | none |
| `build-spec-parts.js`, `build-platforms.js`, `build-native-guidance.js`, `build-docs.js`, `build-docs-components.js` | The design spec's data: the library parts, the Platforms Standard, native guidance, the PRD viewer, the component aliases | N while the custom spec stays | Storybook MDX for components |
| `build-packages.js` and `build-packages.d/` (angular, vue, web-components, mcp, figma, lint) | The four npm packages, the versioned CDN folder, the JSON API, and the wrapper packages for Angular, Vue, web components, MCP, Figma and the lint adapters | R in part | Vite plus Changesets; the JSON API and the wrappers stay short scripts (N) |

## Checks

| Tool | What it checks | N or R | Standard replacement |
|---|---|---|---|
| `check-system.js` and `check-system.rules/` (30 rule modules today, 31 with the shared-fill rule of #693) | Structure, markup, generated files, icon names and imports, hook adoption, built-in words, count phrases and more | N | ESLint plugins, later |
| `check-system.rules/token-definitions`, `color-groups`, `site-styles` and the style modules | No new colors, the 4px grid, corners 2 to 6px, tokens only ★ | N | an ESLint or Stylelint plugin |
| `check-style.js`, `tools/stylelint/plenix.mjs` and `.stylelintrc.json` | Tokens only, raw values, palette colors, class names, token tiers, logical properties ★ | N | already a Stylelint plugin; `check-style.js` holds what Stylelint cannot read |
| `check-common.js` | The file list and the reporter the two checks share | N | none |
| `check-copy.js` | Wording of the default texts | N | none |
| `check-spec.js` | The design spec against its own standard | N | none |
| `check-bundle.js` and `check-bundle.baseline.json` | The built CDN files against the size and content rules | R | size-limit |
| `tools/check-live-cdn.js` | After a release, whether the live CDN serves what the release built | N | none |
| `tools/check-readiness.js` | A release stops while a `priority:1` issue is open | N | none (a GitHub required check could replace it) |
| `tools/check-overflow.js` | The overflow audit of every page, run by the owner | N | Playwright Test |
| `tools/baseline/scan.js` | The baseline scan of an application against the newest Plenix (#273) | N | none |

## Tests

| Tool | What it does | N or R | Standard replacement |
|---|---|---|---|
| `tests/lib.js`, `run.js`, `changed.js`, `check.js`, `limit.js`, `pixels.js` | The Puppeteer runner, the changed-mode scope, the results file, the screenshots | R | Playwright Test |
| `tests/*.test.js` (117 files) and the `layout.test.js` wiring | The tests themselves. They are not tooling: they are the product's checks | N | none |
| `tools/build-test-parts.js`, `tools/file-failures.js` | The parts list of each test; one GitHub issue per check still failing after an owner-started run | N | none |
| 37 npm scripts in `package.json` (24 of them alias one test or one test group) | Commands | R | one test command, plus build, lint and release |

## Other tools

| Tool | What it does | N or R | Standard replacement |
|---|---|---|---|
| `tools/icons/` (inventory, restyle, fetch, measure, site icon files, brand logos) | The owner's icon rules: restyling icons from other libraries, per-site icon files | N; R in part | svgo |
| `tokenize-component.js` | Moves a component's design values into component tokens (a one-time migration tool; keeps one declaration per line) | R | Style Dictionary and Stylelint fixes |
| `tools/publish-config.sh` | The publish host and account for the deploy scripts | N | none |
| `tools/agent/generated.js`, `take-pr.js`, `release.sh` | The generated-file guard, merging of a pull request, releases | R | stop committing generated files (#692); Changesets |
| `tools/agent/lane-overlay.js` and `lanes/` | Carries spec changes around the separate spec repository | R | bring the spec into this repository (the owner's call) |
| `tools/agent/datagrid/`, `native/`, `library/`, `spec-merge/`, `web/s3/addtok.js`, `web/s3/merge-base.js`, `build-study.js`, `native/merge.js` | Measuring and comparison probes, the native-guidance and Figma generators, the library plan generators, small helpers. Kept after the clean-up because a person may still run them by hand | R in part | delete when no one runs them |

## What is deleted when it has been used

- One-time scripts (migrations, one-off patches, throwaway probes) are deleted in the pull request that used them.
- The clean-up of 2026-10-31 (issue #712) removed 56 scripts from `tools/agent` that no build, check, workflow, test or npm script referenced. The pull request lists each file and why.
