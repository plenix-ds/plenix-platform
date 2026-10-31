# density

A compact or comfortable area on a page (for example a compact table on a normal page) really shows its controls at that area's size.

- File: `tests/density.test.js`

## What it checks
- Draws six controls (Button, small Button, Input, Select, Checkbox, Switch) in three regions: compact, standard and comfortable.
- Each control's height must equal its region's control-height setting, not the page's.

## Why it exists
- Component settings declared on the whole page would freeze the page's value, so a region's own density would not reach its components. This test guards every component moved to component tokens (in the file header).
- Added in commit 25ddfa9b "Fix: component tokens follow regional density (regression from batch 207) (batch 221)".
- On demand only. Owner decision 2026-10-25: "Reserve only for as on demand test by owner and take out from the tests" (in `tests/run.js` and `.github/workflows/on-demand.yml`).

## How it checks
- Writes a small page that loads `platform/platform.css` and opens it from the disk (`file://`) in Chrome. No web server.
- Measures each control's height and compares it with the region's control-height setting.

## What a failure means
- A compact table or form area shows full-size controls (or the reverse), so the page looks wrong and wastes or crowds space.

## When it runs
- ON_DEMAND group in `tests/run.js`. It never runs on a push, a pull request or in the full suite.
- The owner starts it: GitHub Actions > On-demand tests (the "high contrast, themes and density" job), or `node tests/run.js density`.
- In changed mode it runs only when the Button, Input or Checkbox changes, a global file changes, or this test's own file changes. With `TEST_SCOPE=full` it always runs.
- By hand: `node tests/density.test.js`, or `npm run test:density`.

## What it needs
- Chrome (headless).
- The Platform stylesheet `platform/platform.css`. It writes one temporary page in `tests/` and removes it at the end.
