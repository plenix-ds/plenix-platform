# Icon stage 5c-1a (#557): icons come only from modules

Part of #280. This follows the owner's decisions on #277 (Q3, Q4, Q5) and #557 (2026-10-29 18:02Z):
- an unregistered name fetches its file
- `icons-all.css` retires
- 5c-2 merges right after 5c-1b

No test was run. Nothing was released or deployed.

## The resolver (`platform/components/Icon/Icon.jsx`)
- **`cssGlyph` is gone.** The Icon component no longer reads `--plx-comp-icon-glyph-*`. This also ends the first-paint empty icon (audit question 2).
- **The order for a name:**
  1. a registered or imported module
  2. a Plenix name with no module: its files, loaded once from the Plenix asset layout (the fallback). Development warns once that production should load an icon file, import or register it.
  3. a Material name: from the library, as before
  4. nothing, with a warning
- **Where the Plenix files are (`plenixFiles()`):**
  - `icons/plenix/` beside `plenix.js` or `plenix.css` (the CDN's `/cdn/<version>/`, a self-hosted archive) and beside `dist/platform.js`
  - `dist/icons/plenix/` from `platform/platform.css` (this repository)
  - `resolvePlenix` gives a name's file: the dashed Plenix name, because an alias has no file of its own.
- **`resolveIcon(name, { library: 'material' })`:** a Plenix symbol now resolves to the library file (the same drawing). Plenix's own drawings (`custom/`) resolve to the Plenix layout.
- **`plx-icon--mirrored`:** set on every icon whose symbol points along the reading direction. A module is marked by its flag (Plenix set included); a name by `glyphs.js MIRRORED`, new and written by `build-icons.js` from `layout.MIRROR`.
  - In right to left this matches the per-name rules (`scale: -1 1` both ways), so nothing looks different.
  - The markup gains the class on those icons.
- **`iconMarkup(icon, { size, filled, label, className, library })`:** new, exported on `window.Plenix` (`platform/exports/w04C.js`). It returns the markup Icon renders, as a string.
  - The drawing comes from a module only, through `moduleProblem` (the allow-list, #285); every value is escaped.
  - A name with no module gives the span without a drawing, and development warns once.

## Each page's icon file
- **`node build-app.js` writes them** (`tools/icons/site-icons.js` `buildPages`), from each page's source:
  - the 10 suite applications: `<app>/plenix-icons-<app>.js`, from the app's folder and `suite/`; 23 to 42 icons each
  - the Asset Manager: `dam/plenix-icons-dam.js`, 93 icons, loaded by its four pages
  - the login service: `services/login/icons.js`, its two notice icons as markup (`markupOf`), because its page is rendered on the server without the Platform's script; the Dockerfile and `deploy.sh` ship it
- **Each page loads its file** with one script tag after `platform.js`.
- **The design spec** loads the compatibility file (it shows every icon), through `plenix-source.js` (lane `280-icon-5c-1a`): `S.icons`, local `dist/plenix-icons-plenix.js`, or the release's file for a release after 0.73.0.
- **check-system ("generated")** fails when a page's file differs from its source.
- **The generator skips generated files** (a bundle such as `app.js`, or an icon file: "GENERATED FILE" in their first lines).
- **45 names in `suite/plenix-app-data.js` are not icons:** they are the capability keys (`about`, `activity`, …), which no Icon draws. They are counted in the build line and do not stop it. Some of those keys match Material names (`analytics`, `dashboard`, …), so they are registered; that is harmless.
- **A name built at run time stops the build:** the DAM's `typeIcon` now lists its names in a `plx-icons` comment (`homeData.js`).

## Deprecation (bare classes, glyph settings, icons-all.css)
- **`platform/dev/style-audit.js`** warns once per name about a bare `plx-icon--<name>` without `plx-icon--inline`. It is a console warning, not a style finding, so the page checks are unchanged.
- **The CDN README** (`build-packages.js`) has a new section, "Retired: bare icon classes, the glyph settings and icons-all.css (#557)", and a corrected resolver paragraph. The changelog fragment is `changelog.d/<this PR>.md`.
- **The archive** now carries `icons/plenix/` (the fallback files).
- **Nothing is removed from `icon.css` yet:** the bare classes still draw until 5c-2.

## Tests (written, not run) and tools
- **`tests/high-contrast.test.js`:**
  - The specimens use `Plenix.iconMarkup('plus')` (in the Settings icon file), not the bare `plx-icon--add`.
  - The forced-colors icon checks read the svg's `fill` and the icon's `color`, not the mask's background or forced stroke.
  - One check name changed ("an icon elsewhere is CanvasText").
- **`tests/visual.test.js`:** the button's icon fixture carries `plx-icon--inline`. It measures the slot, not the drawing, so its baseline is unchanged.
- **`tests/site-icons.test.js`:** a new check that the page files are current, safe and loaded, and that the login markup has its shape.
- **`tools/agent/datagrid/icon-paint.html`:** draws with `iconMarkup` from the compatibility file.
- **`icon-names.html`:** keeps its cases, with a comment that it exercises the fetch fallback.
- **`icon-compare.js` and `.html`:** removed. They compared masks with svg, and there is nothing left to compare.
- **Dated history:** `tools/agent/web/s3/sheet-lab.js`, `tools/agent/web/tabs-css.js`, `docs/command-bar-study/study.css` and `docs/briefs/header-facts/` (new README) are marked as history and left as written.

## For QA and the deploy
- **The repository's web server** must serve `platform/dist/icons/plenix/`, which build-app writes and git ignores, for the fallback. The apps, the DAM and the spec do not need it: their icon files register every icon they name.
- **A name that reaches an app only at run time** (from a server, a prop built in code) and is not in its file draws through the fetch. From `file://` that fetch fails and the icon stays empty, with a development warning. The page proof below finds any such name.
- **Proof (prepared; it runs only when the owner starts it):**
  - `docs/briefs/280-icon-5b/pixel-pages.js` photographs the record pages and the 10 apps before and after. Run it with the base at `122054f4`.
  - Any "was fetched at run time" warning on an app page names an icon missing from that page's file.
