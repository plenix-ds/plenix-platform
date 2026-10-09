# Tabulator (vendored)

Every Plenix table runs on Tabulator: the Platform `DataGrid` component builds a Tabulator grid and draws it in the
Plenix grid style with tokens only (`platform/components/DataGrid/data-grid.css`; the owner's reference is
`docs/datagrid-tabulator-demo.html`). The owner chose Tabulator on 2026-10-08 (the data grid study,
`docs/datagrid-study.html`): free, MIT, a plain script that sets `window.Tabulator`, so it fits the Plenix build with no
bundler, and it covers selection, resize, filter, sort, grouping, tree rows, row actions, inline editing, drag to move
and context menus.

| File | Package | Version | Build | License | Source | SHA-256 |
|---|---|---|---|---|---|---|
| `tabulator.min.js` | tabulator-tables | 6.6.1 | UMD (sets `window.Tabulator`) | MIT | https://cdn.jsdelivr.net/npm/tabulator-tables@6.6.1/dist/js/tabulator.min.js | `9e2e2e0c0b3bcde17ce66791e6b77d0195e50aa0951bedf75941531579374477` |
| `tabulator.min.css` | tabulator-tables | 6.6.1 | core stylesheet | MIT | https://cdn.jsdelivr.net/npm/tabulator-tables@6.6.1/dist/css/tabulator.min.css | `1a70eeb7c860cd62938e3a233c6536b0f177240e60e47cd9896a33a9dc2c90dc` |
| `LICENSE` | tabulator-tables | 6.6.1 | | MIT | https://cdn.jsdelivr.net/npm/tabulator-tables@6.6.1/LICENSE | |

Copied on 2026-10-08. The files are unedited except that the last-line `sourceMappingURL` comment was removed from each
(the map files are not vendored, so the browser would ask for a file that is not there). The license header stays at the
top of the script.

## How pages load it

Only pages that show a grid load it. The `DataGrid` component calls `loadTabulator()`
(`platform/components/DataGrid/tabulator.js`) the first time it renders: it adds `tabulator.min.css` and then
`tabulator.min.js` from this folder, once per page, and waits for `window.Tabulator`. The folder is found from the
address of `platform/dist/platform.js`; a page that loads the Platform from somewhere else sets
`window.PlenixVendorBase` (the URL of a folder holding `tabulator/`) before the first grid renders. A page that already
loaded Tabulator itself is used as is.

The core stylesheet keeps Tabulator's structure (positions, scrolling, frozen columns, menus). Every color, line, font,
size and spacing on top of it comes from Plenix tokens in `components/DataGrid/data-grid.css`, which is loaded later and wins.
The style audit (`platform/dev/style-audit.js`) leaves alone the widths, heights and offsets Tabulator writes on its own
elements while it lays out (inside a `.tabulator` element): that is the engine's geometry, not styling.

## Updating

1. Pick the version and read its release notes (https://github.com/olifolkerd/tabulator/releases).
2. Download `dist/js/tabulator.min.js`, `dist/css/tabulator.min.css` and `LICENSE` from the jsDelivr paths above with
   the new version, and remove the `sourceMappingURL` comment from the last line of the script and the stylesheet.
3. Record the new SHA-256 values (`sha256sum tabulator.min.*`) and the date in this table.
4. Run `node build-app.js`, `node check-system.js`, the tests, and run `node tests/grid-reference.js` (every part of the grid against the owner's reference, light and
   dark, each density): a new major version can rename the classes `data-grid.css` restyles.
