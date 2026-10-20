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
