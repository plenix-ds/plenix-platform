# The per-site icon file and the compatibility file (#553)

Part of #280, the step between 5b and 5c. No test was run. Nothing was released or deployed (the publishing hold).

## What is new
- **`tools/icons/site-icons.js`** has three parts:
  - **The generator:** `node tools/icons/site-icons.js <site> <folder or file> … [--out <folder>] [--allow-unknown]` writes `plenix-icons-<site>.js` with exactly the icons the site's source uses.
  - **`buildCompat(root, { check })`:** the compatibility file.
  - **`siteFile`, `collect` and `fileText`:** the functions the generator and the test share.
- **`platform/dist/plenix-icons-plenix.js`, the compatibility file:** every Plenix icon (the 212 names in `map.json`), 265 KB. It starts with `GENERATED FILE — DO NOT EDIT`.
  - **Made by:** `node build-app.js` (the step after `icon.css`).
  - **On the CDN:** `build-packages.js` brings it up to date and copies it to `/cdn/<version>/plenix-icons-plenix.js`, beside `plenix.js`. It is also in the archive's list.
- **check-system ("generated"):** fails when the compatibility file differs from what `map.json` generates.
- **`platform/icons/layout.js`:** gains `moduleObject(set, entry)`, the module object that `moduleText` already wrote. `moduleText` now uses it, so its output is unchanged. `SOURCE` is exported too.
- **`platform/icons/uses.js`:** gains `scanText(text, rel, report)`, the same Babel scan over text, so a page's inline scripts can be read. `scanFile` calls it, so the Platform's own check is unchanged.

## The count: 212 or 251
- **The compatibility file registers the 212 Plenix names.** The 251 module files in `platform/dist/icons/plenix/` are those 212 plus 39 alias modules (a symbol's underscore spelling, such as `more_horiz`).
- **The aliases need no entry of their own:** `registerIcons` registers each module under its name and its symbol's spelling, so every alias resolves.

## How a file works
- **The format:** a classic script. It reads `window.Plenix` and calls `registerIcons([...modules])` once. A path used by more than one drawing or icon is written once, in a shared array.
- **Loaded before `plenix.js`:** it warns once and registers nothing.
- **Safety (#285):** a module is data. `registerIcons` checks each drawing with `checkDrawing` (the allow-list), and Icon draws paths as React props. The generator reads every drawing through `layout.readDrawing`, which stops on a refused file.
- **Offline:** the file loads nothing else (no fetch, no import, no URL), so it works offline and from `file://`.
- **The resolver's order is unchanged.** A registered Plenix module draws the same drawing `icon.css` holds, with the same classes. A registered Material module serves only names outside the Plenix set.
- **Nothing is removed from `icon.css`:** `<Icon name>` works without either file until 5c.

## What the generator counts as a use
- **Icon slots:** the slots the Platform's icon-imports rule reads (`uses.js`), including `h(Plenix.Icon, { name })` and a page's inline scripts.
- **Imported modules:** `plenix-platform/icons/<set>/<name>` and `/cdn/<v>/icons/<set>/<name>.js`.
- **Bare class names:** `plx-icon--<name>`, apart from the Icon modifiers (`size-*`, `filled`, `outline`, `inline`, `mirrored`).
- **Unknown names and names built at run time:** reported with file:line. The generator stops (exit 1, nothing written) unless `--allow-unknown` is passed. A `/* plx-icons: … */` comment lists a run-time name's values, as in the Platform.
- **A trial on St. John's site** (`~/work/st-john-test-site`, a run of the build tool, not a test): 75 icons, 92 KB, no unknown name.

## Spec (lane 280-icon-sitefiles)
- **The row:** "Sites loading Plenix from the CDN" (`parts/w00B.records.js`) now says the two files exist and how they are made and checked, and that 5c is still to come.
- **`spec-parts.js`:** rebuilt by build-app after the overlay.

## Docs
- **`platform/icons/README.md`:** a new section, "A site's icon file (#553, stage 5)", covers the two choices, the generator command and its rules.
- **The CDN README** (written by `build-packages.js`): a new "Icon files" section.

## Tests (written, not run)
- **`tests/site-icons.test.js`** (Node only), checking that:
  - the compatibility file is current, registers every name once with drawings identical to the modules, passes the allow-list, warns without `plenix.js` and loads nothing
  - the generator finds JSX slots, an imported module, a bare class, an inline page script and a Material name, and skips `node_modules`
  - the generator stops on an unknown name and on a run-time name, and `--allow-unknown` and a `plx-icons` comment let it continue
  - the generator refuses the site name `plenix` and a bad site name
- **`tests/parts.json`:** rebuilt by `tools/build-test-parts.js` (it reads the test files; it runs nothing).

## Gates
- build-app OK, SYSTEM_OK, STYLE_OK, SPEC_OK. No stylesheet changed, so lint:css has nothing to check.
