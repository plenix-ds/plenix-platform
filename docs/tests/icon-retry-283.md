# icon-retry-283

An icon that fails to load once because of a network hiccup is tried again, so it still appears.

- File: `tests/icon-retry-283.test.js`

## What it checks
- Five cases, each on a fresh page, for one icon file (`rocket_launch.svg`):
  - The file loads: one request, the icon is drawn.
  - The first request fails (network error): two requests, the icon is drawn.
  - The first request gets a server error (503): two requests, the icon is drawn.
  - Both requests fail: two requests, the icon stays empty.
  - The file is not there (404): one request only, the icon stays empty.
- No script errors.

## Why it exists
- Issue #283, "Icons (#277): caching, in-flight deduplication and immutable versioned asset URLs".
- The file header explains: before the retry, one failed request left the icon empty for the whole session.
- Added in commit bd0597c0 "#283: a failed icon file is asked for once more; the sprite is dropped (optional)".

## How it checks
- Opens `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) from the local test server in Chrome.
- Draws one icon with React and makes its file request fail, return an error, or succeed, depending on the case.
- Counts the requests and checks whether the icon's drawing is there.

## What a failure means
- A brief network problem leaves icons blank until the person reloads.
- Or Plenix keeps asking for a file that does not exist, wasting requests.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file or the fixture it loads (`platform-host.html`) changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-retry-283.test.js`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The built Platform (`platform/dist/platform.js`; `node build-app.js`).
- The fixture `tests/fixtures/platform-host.html`.
