# perf

The Plenix packages that apps download stay under fixed size limits, so pages that use them do not get slow to load.

- File: `tests/perf.test.js`

## What it checks
- Five built package files, each against a limit for its raw size and its compressed (gzip) size:
  - `packages/react/dist/index.js`: 2 MB raw, 512 KB compressed.
  - `packages/styles/plenix.min.css`: 3 MB raw, 384 KB compressed.
  - `packages/web-components/plenix-shadow.css`: 3 MB raw, 384 KB compressed.
  - `packages/web-components/index.js`: 32 KB raw, 12 KB compressed.
  - `packages/mcp/server.cjs`: 32 KB raw, 12 KB compressed.
- A missing file fails, with an instruction to build the packages first.
- It prints each file's measured sizes.

## Why it exists
- The file header calls these "performance budgets over the actual package artifacts". Added in commit b9502283 "0.40.0: Wave 15 B and C (packages: Vue, web components, lint, MCP; i18n), command bar fixes, developer experience", together with the packages it measures.
- The specific size limits: No recorded reason.

## How it checks
- Runs in Node only, with no browser.
- Reads each file under `packages/`, measures its size, and compresses it (gzip, level 9) to measure the compressed size.
- The limits are written in the test. No baseline file.
- The file also exports its checker, which `tests/w15c-packages.test.js` uses to prove the limits measure all five files and that an oversized file fails.

## What a failure means
- A package an app loads would have grown past its limit, so pages built on it could load more slowly for the people using them.

## When it runs
- Started by hand only: `node tests/perf.test.js` (the Usage in its header). Its header says it "runs only when the owner starts it ... never inside the build".
- It is in no group of `tests/run.js`, no `package.json` script and no workflow in `.github/workflows/`.
- `tests/w15c-packages.test.js` loads it as a module; that test is itself in no group or workflow either.

## What it needs
- The built packages: `node build-app.js`, then `node build-packages.js`.
- No browser, no web server.
