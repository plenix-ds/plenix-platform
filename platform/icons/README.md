# Plenix icons

Material Symbols Sharp, weight 300 (Google, Apache License 2.0), copied unedited from
https://github.com/google/material-design-icons/tree/737e3324305806514d7909874fa1818ae1808232/symbols/web
(`<symbol>/materialsymbolssharp/<symbol>_wght300[fill1]_{20,24}px.svg`).

| File | Source file |
|---|---|
| `<symbol>.svg` | `<symbol>_wght300_20px.svg` (optical size 20, outline) |
| `<symbol>-fill.svg` | `<symbol>_wght300fill1_20px.svg` (optical size 20, filled) |
| `<symbol>-24.svg` | `<symbol>_wght300_24px.svg` (optical size 24, outline) |
| `<symbol>-24-fill.svg` | `<symbol>_wght300fill1_24px.svg` (optical size 24, filled) |

`map.json` names the symbol behind every Plenix icon name (`<Icon name="folder-open">` -> `folder_open`).
`node build-app.js` runs `build-icons.js`, which writes `components/Icon/icon.css` with every file as a data: URI.

Rules: never edit, redraw, re-pad or re-weight a file; never mix in another set. To add an icon: pick the symbol on
https://fonts.google.com/icons?icon.style=Sharp, download its four files from the same commit, add its name to
`map.json`, build. A concept with no symbol is listed for a decision, not drawn. Icons Plenix draws itself on the owner's decision live apart
in `custom/` (see its README: person-male, person-female, 2026-10-19); build-icons.js reads it after this folder.

## The full library (batch 273)

`library/` holds every symbol of the set (4,150 symbols, 16,600 files: the same four files each, same names, unedited) at
the same commit, and `library/index.json` lists them. Hosted with the site:
https://plenix.lighthouseway.org/Plenix/platform/icons/library/<symbol>.svg (and design-system.lighthouseway.org at the
same path). To use a symbol, add its Plenix name to `map.json`: build-icons.js takes a file from this folder first, then
from `library/`, so nothing needs copying.

## The whole library on the CDN (2026-10-22)

`/cdn/material/<commit>/` (on design-system.lighthouseway.org, open to other sites with CORS) holds every symbol's four
files; deploy.sh copies `library/` there once per pinned commit. Each release's `/cdn/<version>/icons-all.css` (written by
build-packages.js) gives every symbol its Material name as an Icon name: link it after `plenix.css` and use
`<Icon name="person_cancel">`. A Material name that is already a Plenix name keeps the Plenix meaning (`check`, `home`).
It is optional: `plenix.css` carries only the Plenix set as data: URIs (nothing to download); icons-all.css (about 1.4 MB,
4,106 rules) loads each file from the CDN the first time it is drawn.

## The naming contract (2026-10-22)

| Spelling | Works | Example |
|---|---|---|
| Plenix name, dashes | always (plenix.css) | `mic-off`, `person-cancel`, `check-square` |
| The same name with underscores, where the Plenix name is its Material symbol with dashes | always (plenix.css) | `mic_off`, `person_cancel` |
| Any other Material Symbols name | with icons-all.css | `rocket_launch`, `10k` |
| A Material name that is also a Plenix name | draws the Plenix icon | `check` (check_small), `home` |

build-icons.js fails when a name in map.json has no rule in icon.css.

## The icon inventory and restyled icons (2026-10-24, #301)

The rules above cover the Material Symbols files: they stay unedited. Icons from other libraries are a different
thing: the owner asked for them to be restyled to the Plenix icon guidance (`platform/standards/icons.md`), and a
restyled icon is a new Plenix drawing, not an edited Material file. They live in `inventory/` (see its README), apart
from this folder, with each library's original kept beside it. Apps draw none of them until the owner approves one;
it then joins the working set through `map.json` like any icon. Tools: `tools/icons/` (`check-icon.js` reports how an
SVG is built against the guidance, `restyle-icon.js` refuses to write over the Material files).

## The asset layout (#279, stage 1 of #277)

One layout and one naming for every icon source, written by `layout.js` (generated, never committed):

| Set | Where it is written | By | Size |
|---|---|---|---|
| `plenix` (the names in `map.json`) | `platform/dist/icons/plenix/` and `release/cdn/<v>/icons/plenix/` | `build-icons.js` (every `build-app.js` run) and `build-packages.js` | 212 icons, 1,061 files, 0.8 MB |
| `material` (every symbol in `library/`) | `release/cdn/<v>/icons/material/` | `build-packages.js` (each release) | 4,150 icons, 20,751 files, 20.2 MB, under 1 s |

- **Files per icon:** `<name>.svg`, `<name>-fill.svg`, `<name>-24.svg`, `<name>-24-fill.svg` (the source files, unedited), and `<name>.js`.
- **The module:** `export default { name, set, symbol, fillOutline, mirrored, drawings: { 20: { outline, fill }, 24: { outline, fill } } }`. Each drawing is `{ viewBox, d, transform?, fillRule?, clipRule? }`. Both optical sizes are in every module (owner, #277 answer 7).
- **`index.json` per set:** every name with its symbol and files, and every alias with its name.
- **Names:** lowercase with dashes (`mic_off` is `mic-off`); the variant suffixes are `-fill`, `-24` and `-24-fill`. An alias (a symbol's underscore spelling) has no file of its own; `index.json` maps it to its name, so every name has exactly one module.
- **The CDN path:** `/cdn/<version>/icons/<set>/<name>.js` (and `.svg`), under the release's version, so it never changes once published. The existing `/cdn/material/<commit>/` stays for the Icon component's fetch.
- **One set on its own:** `node platform/icons/layout.js <plenix|material> <folder>`.
- **No consumer reads the layout yet** (stage 1): `icon.css`, `glyphs.js` and the Icon component draw every icon as before. Stage 2 (#282) makes the modules importable.
