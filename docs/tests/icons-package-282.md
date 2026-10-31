# icons-package-282

The Plenix icons package carries every Plenix icon as its own importable piece, so developers can load only the icons they use.

- File: `tests/icons-package-282.test.js`

## What it checks
- The package (`packages/icons`) offers `./plenix/*` and is an ES module package (`"type": "module"`).
- `packages/icons/plenix/` holds every icon module built in `platform/dist/icons/plenix`, with the same names, plus `plenix/index.json`.
- The modules are exactly the icons and aliases listed in `index.json`.
- Each icon has its four drawing files beside its module (normal, filled, 24px, 24px filled).
- Each alias (for example `arrow_back`) has a module that imports its icon's module.
- `icons.json` counts and lists the modules, matching the folder.
- A module loads and has the icon shape: a name, the set "plenix", and drawings at 20 and 24.

## Why it exists
- Issue #282, "Icons (#277): static importable icon modules for tree-shaking". Tree-shaking means a build keeps only what a site really uses.
- The file header notes that before #282 the package held only `svg/`, `icons.json` and `icon.css`.
- Added in commit ec69be62 "#282: the @plenix-ds/icons package carries the Plenix icon modules (./plenix/*)".

## How it checks
- Reads the built package folder and its lists in Node, and imports one module (`add.js`). No browser.

## What a failure means
- A developer who installs the icons package cannot import some icons, gets broken aliases, or gets icons with missing drawings.

## When it runs
- No run group and no parent test start it. CI does not run it.
- Started by hand only: `node build-app.js && node build-packages.js && node tests/icons-package-282.test.js` (the Usage line in its header). No package.json script or workflow names it.

## What it needs
- Node only (no browser, no server).
- The built files: `platform/dist/icons/plenix` (`node build-app.js`) and `packages/icons` (`node build-packages.js`).
