# icon-package-assets-284

The downloadable Plenix package holds the files for every documented icon, so no icon is missing for a site that hosts Plenix itself.

- File: `tests/icon-package-assets-284.test.js`

## What it checks
- First proves the check can see a gap: with one file taken away, it names that file; with the whole Plenix icon folder taken away, it names at least 400 files; with every file present, it names none.
- The real archive lacks no documented icon file: four files for every Material name under `icons/library/`, and four for every Plenix icon under `icons/plenix/`.

## Why it exists
- Issue #284, "Icons (#277): self-contained packages with automated offline and Manifest V3 tests".
- `build-packages.js` now fails the build when an icon file is missing (`missingPackageIcons` in `platform/icons/layout.js`); this test checks the same function against the real archive (in the file header).
- Added in commit dc535aff "#284 C (part 1): the archive build fails when a documented icon has no file in it".

## How it checks
- Lists the files inside `release/cdn/<version>/plenix-<version>.tgz` with `tar`, in Node. No browser.
- Asks `missingPackageIcons` which documented icon files are not in that list.

## What a failure means
- A self-hosted Plenix ships without some icon files, so those icons show blank.

## When it runs
- A child of `layout.test.js`. Layout runs it when the Icon component changes, or when this file changes. In a full run it always runs.
- CI (`ci.yml`): inside the "fixtures" browser job (the layout test), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): inside the "fixtures" browser job.
- By hand: `node tests/icon-package-assets-284.test.js`.

## What it needs
- Node only (no browser, no server).
- The release build's archive `release/cdn/<version>/plenix-<version>.tgz` (`node build-packages.js`). Without it the test fails at once and says so.
- The `tar` command.
