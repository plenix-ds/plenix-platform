# one-primary

This test makes sure each Plenix page shows at most one main (primary) button, so the main thing to do is always clear.

- File: `tests/one-primary.test.js`

## What it checks
- On each application page, it counts the visible primary buttons on the page itself.
- Buttons inside a dialog, a drawer, a popover or a menu are not counted with the page: each of those is a view of its own.
- Hidden or inactive parts are skipped; a split button counts once.
- More than one primary button on a page is a failure.

## Why it exists
- The owner's choice from the buttons study, 2026-10-24 (issue #298; following Polaris, Carbon and Fluent): a page shows at most one primary button (file header and commit ddf7465d "One primary button per view: a browser test over the applications (#298)").
- A static code check cannot tell a page's primary button from its dialog's, so this test reads the pages as drawn (commit message).

## How it checks
- Headless Chrome at 1440 by 900 pixels opens each app page (Dashboard, Projects, Messages, Contacts, Calendar, Tasks, Notes, Bookmarks, Files, Settings, Asset Manager), waits for its buttons, and counts the visible `.plx-button--primary` buttons outside overlays.

## What a failure means
- A page would show two or more strong, colored buttons competing for attention, and a person would not know which is the main action.

## When it runs
- AUTOMATIC in `tests/run.js`.
- In changed mode: only the app pages whose sources changed.
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- The full suite: its "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built application pages.
