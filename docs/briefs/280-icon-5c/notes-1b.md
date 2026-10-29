# Icon stage 5c-1b (#557): the spec's labs draw icons with iconMarkup

Part of #280. It depends on #561 (5c-1a: `iconMarkup`, the resolver, the page icon files) and is branched from it. No test was run. Nothing was released or deployed.

## The spec (lane 280-icon-5c)
- **`DS.icon(name, cls, label)`** is new in `ds.js`, the one helper every lab uses.
  - It returns `Plenix.iconMarkup(name, …)`, the Icon component's own markup, drawn from the registered module. The spec loads every Plenix icon (5c-1a).
  - `plx-icon--size-<s>`, `plx-icon--filled` and `plx-icon--outline` in `cls` become the options; other classes pass through as the className.
  - A release without `iconMarkup` (up to 0.73.0, the spec's pinned CDN mode) gets the class form it still draws.
- **No lab writes a bare `plx-icon plx-icon--<name>` any more:**
  - 12 shared files (`button-lab`, `content-labs`, `data-labs`, `display-labs`, `form-labs`, `layout-lab`, `layout-labs`, `more-labs`, `navigation-labs`, `overlay-labs`, `spec.js`, `ds.js`)
  - 29 part files (`w02A` to `w13A`)
  - Each file's own `icon(...)` helper now calls `DS.icon`. Two helpers that patched the class string (`w10B`'s badge icon and `w07A`'s header items) now pass the class as an option.
  - The tree toggles pass `plx-icon--outline`, as the Tree component does (`filled={false}`).
  - The status icon in `w04C` keeps its image name (`label`) when it has no visible label.
- **`spec.js`:**
  - The icon-size token samples draw `DS.icon('folder')`.
  - The Icons page lists the names from `icons/map.json`, falling back to `icon.css` for an old release. The per-name rules leave `icon.css` in 5c-2.
  - The page's "Loading" row now describes modules and icon files.
- **`spec-parts.js`** was rebuilt by build-app after the overlay.

## Run-time names on the app pages (the Lead's point 2 on #561)
- **The page icon files now also register every quoted word in a page's source that is a Plenix icon name** (`literals`, in `tools/icons/site-icons.js`). This covers a name that reaches an Icon only at run time, from the suite's data or a prop built in code, so it draws from `file://` too.
  - A word that is not a Plenix name is dropped, never reported.
  - The files grow from 23–42 to 40–55 icons per app (56–72 KB), and the DAM's from 93 to 112 (128 KB).
- **A name built from pieces at run time** (`'file-' + ext`) still needs a `/* plx-icons: … */` comment; the build stops without one.
- **Test (written, not run):** a new check in `tests/site-icons.test.js` covers the literals option.

## Gates
- build-app OK, SYSTEM_OK, STYLE_OK, SPEC_OK, PARTS_OK. No stylesheet changed.

## Proof (prepared; it runs only when the owner starts it)
- **The spec's record pages** should look the same before (`122054f4`) and after, apart from the inline markup: `docs/briefs/280-icon-5b/pixel-pages.js`, with the spec in `?plenix=local`.
- **The browser console** of a spec page shows no bare-class warning from the style audit.
