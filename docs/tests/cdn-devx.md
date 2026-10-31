# cdn-devx

The files Plenix publishes for developers (change notes, token list, component documentation, the token checker) are complete and correct.

- File: `tests/cdn-devx.test.js`

## What it checks
- The change-note reader: only released versions enter the CDN index; Changed and Removed notes are listed as breaking, wrapped lines kept, Added and Unreleased left out.
- The component-header reader keeps multi-line usage examples (also with Windows line endings), callback names and wrapped prop descriptions.
- A component's documentation page combines its purpose, usage, props and examples, with a link to its live page, without running the examples. An embedded code fence cannot break the page.
- The published files of the built version:
  - The CDN change log is an exact copy of `CHANGELOG.md`.
  - Both CDN indexes name the built version and list breaking changes.
  - The published token list holds every token, with name, tier, purpose and values per theme and density.
  - Every component record has its documentation file, and every link resolves. The Button page holds real props and examples.
  - The token checker (`token-check.js`) is copied unchanged beside the CDN files.
- The token checker itself: it finds undefined tokens (also nested ones), ignores quoted text, skips unreadable stylesheets, warns once per name, audits later stylesheets, stays silent on production pages, uses the same CDN version when turned on remotely, and never calls every token unknown when its list fails to load.

## Why it exists
- Added in commit b9502283 "0.40.0: Wave 15 B and C (packages: Vue, web components, lint, MCP; i18n), command bar fixes, developer experience". The file header says "CDN artifact and development token-check regressions".
- No recorded reason.

## How it checks
- Runs in Node. No browser.
- Runs the documentation helpers from `build-packages.js` on small sample texts.
- Reads the built files in `release/cdn/<version>/`, `release/cdn/index.json` and `release/api/v1/components.json`.
- Runs `platform/dev/token-check.js` against a stand-in page.
- Skips and passes when the design-system folder (`platform/design-system/inventory.js`) is missing.

## What a failure means
- Developers get a CDN with missing or wrong documentation, change notes or token lists.
- The token checker warns about real tokens, or makes network requests on live pages.

## When it runs
- In the RELEASE group of `tests/run.js` since issue #756 (before, it was started by hand only): `node tests/run.js --release` runs it with the other tests of the release build, or by name: `node tests/run.js cdn-devx`.
- It is not in `npm test` or `npm run test:full`, because it needs the release build (`node build-packages.js`) first.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests of the release build", after the release build, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the same step of its build job.
- Without the design system (in CI, when the DS_TOKEN secret is not set) it checks nothing. It says so plainly: it prints `CDN_DEVX_SKIPPED skipped: design system not available …`, and on GitHub it adds a warning to the run's summary (issue #762).
- By hand: `node tests/cdn-devx.test.js`, after building the packages (its header says "Build packages first").

## What it needs
- Node only (no browser, no server).
- The design-system submodule and the built CDN files (`node build-packages.js`). Nothing is published.
