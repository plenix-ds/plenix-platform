# component-tokens

Every design setting a component offers really changes what it says it changes, so adjusting a component's look in Plenix works.

- File: `tests/component-tokens.test.js`

## What it checks
- Finds every style rule that uses a component token (a named design setting, such as `--plx-comp-…`) and matches something on the page.
- Sets that token to an unusual marker value on the element and checks that the style property the rule names takes that value.
- Also checks the hover, focus and pressed styles, by copying those rules onto a test attribute so no mouse is needed.
- A token counts as working once it moves its property on any element of any site page.
- Fails when a token never moves its property anywhere on the site (a setting that edits nothing), except the known ones listed in the baseline.

## Why it exists
- It replaces the design spec's component labs in the automatic runs, and does the same check on the components the test site really draws. Owner decision 2026-10-25: the tests run on the St. John test site, not on the design spec (in the file header).
- Added in commit 83799244 "St. John the Beloved test site: every automatic test runs there, not on the design spec (#338)".
- Which parts the site uses is checked once, by Site coverage: owner decision 2026-10-26, "each part is checked once" (in the file header).

## How it checks
- Opens the St. John the Beloved test site pages in Chrome and reads every stylesheet rule in the page.
- For each rule, token and property, tries up to three matching elements.
- In changed mode, when a token seems dead on the pages in scope, it confirms on the other site pages before failing.
- Compares the dead tokens with `tests/baselines/component-tokens.json` (rule and reason). That list can only go down.
- `--update` records a new baseline, only in a full run (`TEST_SCOPE=full`).

## What a failure means
- A component setting does nothing: someone changes a token (for example a button's padding or color) and the component does not change.
- A theme or density that relies on that token would not reach the component.

## When it runs
- AUTOMATIC group in `tests/run.js`.
- `npm test` (changed mode): only the site pages touched by what changed.
- CI (`ci.yml`): the "component tokens" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the "component tokens" browser job, every site page.
- By hand: `node tests/component-tokens.test.js`, or `npm run test:component-tokens`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The St. John test site checkout and this checkout's local CDN build in `release/cdn/<version>/`.
- A database for the site: an in-memory one by default; in CI, the job's throwaway PostgreSQL 16.
- The baseline file `tests/baselines/component-tokens.json`.
