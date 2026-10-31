# brand-rules

The Plenix logo is never shown too small, too crowded or on a wrong background, because the brand rules and the logo's design settings agree.

- File: `tests/brand-rules.test.js`

## What it checks
- Every design setting (token) the brand rules name exists in the brand tokens.
- The logo's minimum sizes in the rules are the tokens' values.
- Each size step: the mark's size and the name's text size match the rules.
- Each size step's clear space (empty room around the logo) is on the 4px grid and at least the rules' share of the mark.
- The smallest size step is the minimum size of the mark.
- Each background is either approved with one of the logo's tones (brand, mono, on-accent) or not approved with no tone.
- The list of misuses is not empty.
- Every file the brand kit (`brand.json`) names exists, and the rules' source file exists.

## Why it exists
- Library wave 3, Brand application: `platform/brand/brand-rules.json` and the brand tokens must agree (in the file header).
- Added in commit eeeb625d "0.31.44: Contrast, links, headings; library wave 3".

## How it checks
- Reads `platform/brand/brand-rules.json`, `platform/brand/brand.json` and every token file under `platform/tokens/`, in Node. No browser.
- Works out each token's value in pixels and compares it with the rules.
- If `brand-rules.json` is missing, it skips with a note and passes.

## What a failure means
- The logo could be shown smaller than allowed, with too little room around it, or with a tone on a background the brand forbids.
- The brand kit could point to a logo file that does not exist.

## When it runs
- AUTOMATIC group in `tests/run.js`.
- In changed mode it runs only when the brand files (`platform/brand`) or the Brand component change, a global file changes, or this test's own file changes.
- CI (`ci.yml`): the "Build and checks" job, in the step "Tests without a browser", on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the build job.
- By hand: `node tests/brand-rules.test.js`, or `npm run test:brand-rules`.

## What it needs
- Node only (no browser, no server).
- `platform/brand/` and `platform/tokens/`.
