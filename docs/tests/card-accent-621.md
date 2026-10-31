# card-accent-621

Cards no longer draw a colored edge, and the suite pages that used that edge still show each item's color in a clear new form.

- File: `tests/card-accent-621.test.js`

## What it checks
- The Card component:
  - An `accent` passed to a Card is ignored: no accent class, no color attribute on the card, and the start border as wide as the end border.
  - With React's development build, one warning says the accent was removed (once, however many Cards).
  - The test first proves it can see an edge: a plain box with a 3px colored start border reads 3px.
- The suite pages:
  - Dashboard: every active project card shows a ColorSwatch (a small color sample) of the project's color.
  - Calendar: every event card shows a ColorSwatch beside the calendar tag.
  - Settings, documentation and features: every feature-area card (at least 30) shows a ProgressBar in the area's color.
  - No card on those pages carries the old accent class or color attribute.
- No script errors.

## Why it exists
- Issue #621 ("How did an external app set its own style on a CDN card (AITEAM blue accent)?"); owner decision 2026-10-29: remove the accent for every app, the suite included, stated in the file header.
- Added in commit cb9bb8a3 "#621: the Card accent is removed (prop, style, token, spec demos as a lane, native guidance); our pages show the color inside the card".

## How it checks
- Part 1: opens `tests/fixtures/platform-host.html?react=dev` (the development build of React, which shows warnings), draws two Cards with an accent, and reads their borders, classes and console warnings.
- Part 2: opens the real suite pages `dashboard/index.html`, `calendar/index.html`, `settings/index.html#/docs` and `settings/index.html#/features`, and inspects their cards.
- No baseline.

## What a failure means
- Cards could show a colored stripe the design no longer allows, or an app could still restyle Plenix cards its own way.
- On the dashboard, calendar or settings, a person could lose the color cue that tells projects, calendars or feature areas apart.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it only when the Card changes (or a part it is built on), or when the dashboard, calendar, settings or projects application changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the parts listed above. Run it by hand: `node tests/card-accent-621.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html` and the vendored development build of React (`platform/vendor/`).
- The built suite pages: dashboard, calendar and settings (`node build-app.js`).
