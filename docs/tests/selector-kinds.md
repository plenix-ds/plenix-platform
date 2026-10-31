# selector-kinds

The style checker that keeps Plenix's stylesheets in order judges each style rule correctly, so a badly written rule cannot slip into the product.

- File: `tests/selector-kinds.test.js`

## What it checks
- The selector-kinds checker (`check-system.rules/selector-kinds.js`) sorts every sample style rule into the kind its line expects, or reports the problem the line expects (for example "fail combinator").
- A state setting (a style variable named `--plx-state-…`) passes only when it is registered with `inherits: false`. An unregistered or inheriting one is reported. A component setting is not treated as a state setting.

## Why it exists
- The selector kinds rule: the Plenix Styling Standard, section 3.6 (in the file header).
- Added in commit 0b2fa81c "Zero overlap: the Standard, the selector-kinds check, the strict audit, fixtures and backlogs".

## How it checks
- Reads `tests/fixtures/zero-overlap/selector-kinds.css`: one style rule per line, after a comment that says what the checker must answer.
- Runs the checker's functions on each line in Node and compares the answers. No browser.

## What a failure means
- The style checker misjudges rules: it could let a rule that breaks the styling standard into the product, or block a correct one.

## When it runs
- AUTOMATIC group in `tests/run.js`, so `npm test` and `npm run test:full` run it. It has no changed-mode filter: it always runs when started.
- It is NOT in the `ci.yml` build job or browser matrix and NOT in `full.yml`, so CI never runs it.
- By hand: `node tests/selector-kinds.test.js`.

## What it needs
- Node only (no browser, no server).
- The fixture `tests/fixtures/zero-overlap/selector-kinds.css` and the checker `check-system.rules/selector-kinds.js`.
