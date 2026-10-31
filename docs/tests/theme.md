# theme

A new color theme can be added to Plenix, and people can switch to it and keep it.

- File: `tests/theme.test.js`

## What it checks
- A new sample theme builds: it gets its own stylesheet, it loads after the default theme, and the apps are offered it in the theme list.
- A theme that writes a raw color (instead of a palette color) is refused.
- A theme that leaves out a color role, or a foundation (such as a corner shape), is refused.
- In a page: it starts on the default theme; switching to the new theme changes its colors; a Button takes the theme's corner shape (2px instead of 4px) and weight (700 instead of 600).
- The new theme has its own dark-mode colors.
- The chosen theme is remembered on the next page, and clearing it goes back to the default.

## Why it exists
- The ability to add a theme and switch to it (`platform/standards/themes.json`, in the file header).
- Added in commit 356d5161 "Themes, defined in the design system, with switching (batch 219)".
- On demand only. Owner decision 2026-10-25: "Reserve only for as on demand test by owner and take out from the tests" (in `tests/run.js` and `.github/workflows/on-demand.yml`).

## How it checks
- Copies the token source and the builders into a temporary folder and adds a sample theme there. The repository itself is never changed.
- Runs the token builder on good and bad copies and reads the errors.
- Writes a small test page with one Button, opens it in Chrome through the local test server, switches the theme with `PlenixWorkspace.setTheme`, switches to dark mode, reloads, and reads the colors, corner and weight.

## What a failure means
- A new theme cannot be added, or a broken theme (raw colors, missing roles) slips through.
- Switching themes does not change the colors, or the choice is forgotten on the next page.

## When it runs
- ON_DEMAND group in `tests/run.js`. It never runs on a push, a pull request or in the full suite.
- The owner starts it: GitHub Actions > On-demand tests (the "high contrast, themes and density" job), or `node tests/run.js theme`.
- In changed mode it runs only when the Button changes, a global file changes (the tokens, the builders, the providers), or this test's own file changes. With `TEST_SCOPE=full` it always runs.
- By hand: `node tests/theme.test.js`, or `npm run test:theme`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The token builders (`build-tokens.js`, `build-standards.js`) and the token source. It writes two temporary files in `tests/` and removes them at the end.
