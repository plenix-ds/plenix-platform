# icon-mv3-284

Plenix icons work inside a Chrome extension, which may not load any code from the internet.

- File: `tests/icon-mv3-284.test.js`

## What it checks
- First proves the test can see a violation: a page with an inline script and a script from a remote address is refused by Chrome's security policy, and the test reads that message.
- The extension's popup draws a Material icon and two Plenix icons from the extension's own files.
- Every request goes to the extension itself (nothing from the internet).
- No security policy violation and no script error.

## Why it exists
- Issue #284, "Icons (#277): self-contained packages with automated offline and Manifest V3 tests". Manifest V3 is the current format of Chrome extensions; it allows scripts only from the extension itself.
- Added in commit f0f37f90 "#284 C (part 2): a Chrome Manifest V3 extension fixture draws Plenix icons with no remote code".

## How it checks
- Unpacks the self-hosting archive of this checkout's release build (`release/cdn/<version>/plenix-<version>.tgz`) into a temporary folder.
- Turns that folder into a made-up extension: a manifest (version 3), a background worker, a popup page that loads the archive's `plenix.css`, React and `plenix.js`, and a script of its own.
- Loads the extension in Chrome, opens the popup page and the violation page, and records requests, console messages and errors.

## What a failure means
- A developer who builds a Chrome extension with Plenix gets blank icons or security errors.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-mv3-284.test.js`.

## What it needs
- Chrome (headless) with extensions turned on. No local test server.
- The release build's archive `release/cdn/<version>/plenix-<version>.tgz` (`node build-packages.js`). Without it the test fails at once and says so.
- The `tar` command.
