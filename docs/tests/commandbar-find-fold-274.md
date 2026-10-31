# commandbar-find-fold-274

In a very narrow pane, the command bar's search folds into one "Find and view" button instead of sticking out of its card.

- File: `tests/commandbar-find-fold-274.test.js`

## What it checks
- Wide: the search is in the bar, and nothing in the bar is drawn outside it.
- Very narrow (200px): the search folds into a "Find and view" button, and nothing is drawn outside the bar.
- The button opens the same search in a popover; typing there searches ("maya").
- Wide again: the search is back in the bar.

## Why it exists
- Issue #274 "P-55: CommandBar's find side does not fold away in a narrow bar and sticks out of its card".
- The file header names the case: RedSave's side panel ("People on this page" bar).
- Added in commit b7616898 (2026-10-24) "CommandBar: the find side folds into Find and view when it does not fit (#274)".

## How it checks
- Opens its stage page `tests/fixtures/stages/commandbar-find-fold.html?find=more` in headless Chrome, narrows the stage to the tiny size and back, clicks "Find and view", types in the popover, and reads where the bar's buttons and fields sit.

## What a failure means
- In a narrow side panel, the search box would stick out of its card or become unreachable.

## When it runs
- A child of `reflow` (AUTOMATIC in `tests/run.js`): reflow starts it as a separate process when the CommandBar (patterns/CommandBar) changes, or when this test file changes. In a full run it always runs.
- CI: the "reflow" browser job (`ci.yml`), on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "reflow" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- The stage page `tests/fixtures/stages/commandbar-find-fold.html` and its widths in `tests/fixtures/stages/stage.css` (issue #772: the page and the 200px width used to live in `docs/briefs/`, and when #694 archived `review.css` the stage lost its narrow width, so the bar never had to fold).
