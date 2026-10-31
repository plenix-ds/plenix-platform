# w15c-packages

The Plenix add-on packages (the AI assistant connector, web components) work, stay within their size budgets, and dates show the same day in every time zone.

- File: `tests/w15c-packages.test.js`

## What it checks
- The MCP server (`packages/mcp/server.cjs`; MCP is the protocol AI assistants use to read Plenix's catalog):
  - It requires a start handshake and agrees on its declared protocol version.
  - It offers four read-only tools with strict input rules, and they answer from the real tokens, components and public API.
  - A missing component is reported as an error, not made-up guidance.
  - Missing, unknown or out-of-range arguments, unknown tools and unknown methods are refused.
  - It offers four resources, reads real token data, and refuses arbitrary file paths.
  - A failure to read the catalog keeps a numeric error code.
  - Remote mode reads only one fixed address; a network failure falls back to the bundled copy; a strict remote failure is reported.
  - Run as a command, its output is clean and it recovers after a broken message.
- Dates: a calendar date (for example March 8, 2026, or February 29, 2024) shows the same day in Los Angeles, New York, Tokyo and London; an invalid date shows nothing; an exact moment follows its time zone.
- The English text file used at run time matches the English catalog exactly.
- Size budgets: all five generated package files are measured, and an oversized file fails.
- The web-components package offers its shadow stylesheet and type descriptions, and that stylesheet is self-contained.

## Why it exists
- Added in commit b9502283 "0.40.0: Wave 15 B and C (packages: Vue, web components, lint, MCP; i18n), command bar fixes, developer experience". The file header says only "W15C node regressions".
- No recorded reason.

## How it checks
- Runs everything in Node. No browser.
- Calls the MCP server directly, then starts it as a command and talks to it through its input and output.
- Runs the date code in four separate Node processes, one per time zone.
- Loads `tests/perf.test.js` as a module to measure the package sizes.
- Skips and passes when the design-system folder (`platform/design-system/inventory.js`) is missing.

## What a failure means
- An AI assistant connected to Plenix gets wrong or invented answers, or can read files it should not.
- A date shows as the day before in some time zones.
- Package downloads grow too big without anyone noticing.

## When it runs
- In the RELEASE group of `tests/run.js` since issue #756 (before, it was started by hand only): `node tests/run.js --release` runs it with the other tests of the release build, or by name: `node tests/run.js w15c-packages`.
- It is not in `npm test` or `npm run test:full`, because it needs the release build (`node build-packages.js`) first.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests of the release build", after the release build, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the same step of its build job.
- Without the design system (in CI, when the DS_TOKEN secret is not set) it checks nothing. It says so plainly: it prints `W15C_PACKAGES_SKIPPED skipped: design system not available …` (never an OK line), and on GitHub it adds a warning to the run's summary (issue #762).
- By hand: `node tests/w15c-packages.test.js`.

## What it needs
- Node only (no browser, no server).
- The design-system submodule, the MCP package (`packages/mcp/`), the built packages (`node build-packages.js`), `platform/utils/format.ts`, `platform/i18n/`, and `tests/perf.test.js`.
