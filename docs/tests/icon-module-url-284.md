# icon-module-url-284

Icons still show when a website renames the Plenix files while bundling them.

- File: `tests/icon-module-url-284.test.js`

## What it checks
- The ES module build (`plenix.esm.js`, the version modern build tools import) carries its own address.
- First proves the test can see the old fault: the same file without that address, renamed, asks for no icon and draws nothing.
- Renamed to `assets/bundle-4f3a9c.js`, it asks for the icon file beside itself (`assets/icons/library/rocket_launch.svg`) and draws the icon.
- Served as the npm package's `dist/index.js` (which has no icon folder), it asks for no icon, as intended.
- No script errors.

## Why it exists
- Issue #284, "Icons (#277): self-contained packages with automated offline and Manifest V3 tests".
- The file header explains: a page that imported the module under another name had no icon address, because the icon code found the library only through a file named `plenix.js`, `plenix.css` or `platform.js`. So no icon file was asked for and nothing was drawn.
- Added in commit d871e5a7 "#284 A: plenix.esm.js finds its icon folders beside itself, under any file name".

## How it checks
- Unpacks the self-hosting archive of this checkout's release build (`release/cdn/<version>/plenix-<version>.tgz`) into a temporary folder.
- Serves it in Chrome from a made-up address (`http://archive.test`), under other file names, with React from `platform/vendor/` and an import map.
- Draws one icon and records which icon files the page asks for.

## What a failure means
- A website that bundles Plenix with its own tools shows blank spaces where icons should be.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-module-url-284.test.js`.

## What it needs
- Chrome (headless). No local test server: it answers every request itself.
- The release build's archive `release/cdn/<version>/plenix-<version>.tgz` (`node build-packages.js`). Without it the test fails at once and says so.
- The `tar` command, and React in `platform/vendor/`.
