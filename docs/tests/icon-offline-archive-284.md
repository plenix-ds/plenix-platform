# icon-offline-archive-284

A website that hosts its own copy of Plenix shows every icon with no internet connection.

- File: `tests/icon-offline-archive-284.test.js`

## What it checks
- First proves the test can see a missing folder: with the Material icon folder (`icons/library/`) answering "not found", the Material icon stays empty while the Plenix icons still draw.
- With the whole archive: a Material icon, a Plenix icon loaded from its file, and a third icon all draw. The files come from `icons/library/` and `icons/plenix/`. Nothing is asked of any other address.
- With the Plenix icon file `plenix-icons-plenix.js` loaded after `plenix.js`: every icon draws, the Plenix icons ask for no file (only the Material icon does), and nothing is asked of any other address.
- No script errors.

## Why it exists
- Issue #284, "Icons (#277): self-contained packages with automated offline and Manifest V3 tests".
- Added in commit 50a36ca4 "#284 B: a test that the self-hosting archive draws icons with every outside request blocked".
- Bare icon classes are retired (#557) and are not tested (in the file header).

## How it checks
- Unpacks the self-hosting archive of this checkout's release build (`release/cdn/<version>/plenix-<version>.tgz`) into a temporary folder and serves it from one local address.
- Blocks every request to any other address in Chrome.
- Draws three icons with React and records which icon files were asked for.

## What a failure means
- A self-hosted Plenix (for example on a private network) shows blank icons, or quietly reaches out to the internet.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-offline-archive-284.test.js`.

## What it needs
- Chrome (headless). It runs its own small web server, not the shared test server.
- The release build's archive `release/cdn/<version>/plenix-<version>.tgz` (`node build-packages.js`). Without it the test fails at once and says so.
- The `tar` command.
