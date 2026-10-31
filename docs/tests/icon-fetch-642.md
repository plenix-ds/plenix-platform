# icon-fetch-642

A page with many icons loads them all without overwhelming the server, so no icon is left blank.

- File: `tests/icon-fetch-642.test.js`

## What it checks
- First, the size watcher's lifetime: icons that come from a module (built in) attach no watcher; icons fetched at run time attach exactly one; removing the last fetched icon disconnects it.
- Then four cases with 40 icons fetched from the server:
  - Compact density, no size: the 20px files.
  - Large size: the 24px files.
  - Comfortable density: the 24px files.
  - Compact, then switched to comfortable while the page is open: the 24px files follow, and every icon shows its 24px drawing.
- In each case: one request per icon name, no more than 6 icon files asked for at once, and every icon drawn.
- No script errors.

## Why it exists
- Issue #642, "Icons: a page without an icon file asks the CDN for ~4 files per icon at once, and about half are refused".
- The file header explains: each icon used to ask for both its 20px and 24px drawings, and 150 icons made about 300 requests at once; the live CDN refused about half.
- Added in commit 79b0fe5f "#642: a fetched icon asks for the one file it shows, and at most 6 files at a time".
- The watcher check was added after QA on 79b0fe5f (in the file header).

## How it checks
- Opens `tests/fixtures/platform-host.html` (an empty page with this checkout's Platform) from the local test server in Chrome.
- Draws 40 library icons with React. Every icon file request is held for 60 ms, so the test can count how many are in flight at once.
- First proves the counter can see more than one request at a time (the old build had all 74 in flight together).
- For the watcher check, also loads `platform/dist/plenix-icons-plenix.js` and counts the page's watchers.

## What a failure means
- On a page full of icons, the server is flooded and refuses requests, so many icons show up blank.
- Icons download twice the files they need, which makes pages slower.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file or the fixture it loads (`platform-host.html`) changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-fetch-642.test.js`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The built Platform (`platform/dist/platform.js`, `platform/dist/plenix-icons-plenix.js`, the icon list in `platform/components/Icon/glyphs.js`; `node build-app.js`).
- The fixture `tests/fixtures/platform-host.html`.
