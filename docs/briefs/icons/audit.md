# Icon audit (#278)

The measured inventory of how an icon reaches the screen at 0.69.5 (commit 0b7af35d). It is step 1 of the icon architecture epic #277; the asset layout (#279) and the move out of CSS (#280) build on it. No product code was changed.

How to repeat every number: `node docs/briefs/icons/measure.js <checkout>` (needs `esbuild` and `puppeteer-core`; `NODE_PATH` may point at another checkout's `node_modules`). It writes [measure.json](measure.json). The run below used the main checkout at the same commit, because `platform/design-system` is a submodule that this worktree does not check out. Chrome 155, headless, 1440×900, Windows 11 (the Windows VM), median of 7 runs.

## 1. The paths an icon takes

| # | Path | Source | What it carries | Who uses it |
|---|---|---|---|---|
| 1 | `icon.css` data URIs | `build-icons.js` → `platform/components/Icon/icon.css`, bundled into `platform.css` → CDN `plenix.css` | 178 Plenix symbols × 4 files (outline 20, fill 20, outline 24, fill 24) = 712 `--plx-comp-icon-glyph-*` custom properties on `:root`, each an SVG `data:` URI | `cssGlyph` in Icon.tsx; mask rules in 10 component stylesheets (§4); bare classes |
| 2 | Per-name rules | same file | 208 rules `.plx-icon--<name>[,.plx-icon--<alias>]{--plx-comp-icon-filled/-outline/-24…}`, pointing each Plenix name at its symbol's four properties | bare classes (mask); the inline path ignores them |
| 3 | Context rules (optical size) | same file | 3 rules on `[data-plx-density]` and `[data-plx-icon-optical="24"]` that set `--plx-comp-icon-context-show-20/24` and re-declare 356 `--plx-comp-icon-auto-*` aliases each (one per symbol and fill) | both paths |
| 4 | `glyphs.js` | `build-icons.js` → `platform/components/Icon/glyphs.js` | names only: `SYMBOLS` (178), `NAMES` (Plenix name and alias → symbol, fill-outline flag), `LIBRARY` (the whole library's ~4,150 symbol names), `LIBRARY_COMMIT` | `resolveIcon` |
| 5 | Library fetch | `platform/icons/library/` (16,600 files, 9.99 MB, ~600 B each); CDN `/cdn/material/<commit>/` (copied once per commit by `deploy.sh`); the archive's `icons/library/` (0.69.3) | one `.svg` per symbol and variant, fetched on demand | `loadFile` in Icon.tsx, for names in `LIBRARY` but not in `SYMBOLS` |
| 6 | `icons-all.css` | `build-packages.js` (CDN and archive only, not in the repository) | one rule per library symbol pointing a bare class at its library file URL (~1.4 MB, `platform/icons/README.md`) | bare `plx-icon--<material_name>` classes without the component |

### Inside Icon.tsx

- `resolveIcon(name)`: in order, the Plenix name (`NAMES`), the name lower-cased with dashes, the symbol spelling in `SYMBOLS`, then `LIBRARY`. Returns `{ kind: 'plenix' | 'library', symbol, fillOutline }` or `null` (draws nothing, warns once with the closest names).
- `useDrawings`: chooses the variants. Sizes `lg`/`xl` take only the 24 file; every other size takes **both** the 20 and the 24 file, and CSS shows one (path 3). So nearly every inline icon carries two `<path>` elements in one shared `<svg>`.
- `cssGlyph(symbol, i)`: `getComputedStyle(document.documentElement).getPropertyValue('--plx-comp-icon-glyph-<key>')`, regex out the data URI, `decodeURIComponent`, `parseSvg` (a regex parse of one `<path>`, never inserted as HTML). Cached per key; a miss (stylesheet not loaded yet) is not cached and is read again on the next render.
- `loadFile(file)`: `fetch(base() + file + '.svg')`, then `parseSvg`; one promise per file shared by every caller (in-flight requests are deduplicated); a failure caches `null`.
- `base()`: `setIconLibrary(url)` → `window.PlenixIconLibrary` → the first `<script>`/`<link>` whose URL ends in `plenix(.esm|.min).js|css` or `platform.js|css`: under `/cdn/<v>/` it becomes `/cdn/material/<LIBRARY_COMMIT>/`, under `dist/` it becomes `../icons/library/`, otherwise `icons/library/` beside the file. No match gives `null`, and library names then draw nothing.

### The optical-size rules (20 or 24)

- Default: 20. The page itself is a density context.
- 24: `[data-plx-density="comfortable"]`, any `[data-plx-icon-optical="24"]` container (the app header, a pictogram), and sizes `lg` and `xl`.
- Inline icons: `.plx-icon__glyph--20{display:var(--plx-comp-icon-glyph-show-20,block)}` and `--24{…none}`. `.plx-icon--inline` maps them from `--plx-comp-icon-context-show-*`; `lg`/`xl` force 24.
- Masks (bare classes, component masks): `--plx-comp-icon-url` picks `--plx-comp-icon-outline`/`-filled` (through the `--plx-comp-icon-auto-*` aliases that the context rules re-point) or `-24` for `lg`/`xl`.
- RTL: 12 directional names mirror with `scale:-1 1`.

## 2. Bytes

Measured by `measure.js`: the regex sections of `icon.css`, and `platform/platform.css` bundled with esbuild exactly as `build-packages.js` builds `plenix.css`. gzip level 9, Brotli default.

| What | Raw | gzip | Brotli |
|---|---:|---:|---:|
| `icon.css` whole | 527,075 | 71,697 | 52,579 |
| — 712 glyph data URIs | 360,481 | 57,203 | 43,688 |
| — 3 context rules (356 aliases each) | 82,989 | 4,706 | 2,848 |
| — 208 per-name rules | 77,452 | 6,064 | 4,894 |
| `plenix.css` (bundle) | 2,322,245 | 251,676 | 180,200 |
| `plenix.min.css` | 2,150,714 | 241,851 | 175,652 |
| bundle without the glyph data URIs | 1,963,899 | 192,810 | 136,578 |
| bundle without any icon data (also the aliases) | 1,881,339 | 187,901 | 134,130 |
| `glyphs.js` (in `platform.js`) | 65,776 | 21,408 | 18,843 |

- The icon data is **19% of `plenix.css` raw (440 KB) and 25% gzipped (63.8 KB)**. Drawings compress worse than the rest of the CSS.
- 713 `data:` URIs in the bundle: the 712 glyphs plus one elsewhere.
- Of the 178 symbols, only 66 names are drawn by the 11 apps together (§3). Every page still pays for all 712 files.

## 3. How many icons each page uses

Measured in Chrome: each page loaded to network idle plus 2.5 s, then every `.plx-icon` counted, with distinct names from the `plx-icon--<name>` class and the number of requests to the library (path 5). These are first screens only: menus, dialogs and other tabs are not opened.

| Page | Icons | Distinct names | Inline / mask | Library requests |
|---|---:|---:|---|---:|
| dashboard | 50 | 19 | 50 / 0 | 0 |
| projects | 30 | 19 | 30 / 0 | 0 |
| messages | 21 | 19 | 21 / 0 | 0 |
| contacts | 23 | 19 | 23 / 0 | 0 |
| calendar | 20 | 19 | 20 / 0 | 0 |
| tasks | 30 | 20 | 30 / 0 | 0 |
| notes | 18 | 16 | 18 / 0 | 0 |
| bookmarks | 21 | 18 | 21 / 0 | 0 |
| files | 34 | 24 | 34 / 0 | 0 |
| settings | 50 | 26 | 50 / 0 | 0 |
| dam (Asset Manager) | 103 | 39 | 103 / 0 | 0 |
| spec home (UI Inventory) | 155 | 30 | 155 / 0 | 0 |
| spec Icon | 461 | 209 | 461 / 0 | 0 |
| spec Data grid | 643 | 56 | 643 / 0 | 0 |
| spec Table | 215 | 42 | 215 / 0 | 0 |
| spec Navigation | 162 | 30 | 162 / 0 | 0 |
| spec Button | 254 | 46 | 254 / 0 | 0 |

- All 11 apps together: **66 distinct names**. All pages measured: 213.
- No measured page draws a Material library name, so the library fetch path runs only where a page asks for a name outside the Plenix set.
- No first screen draws a bare-class mask icon. Mask drawings remain only in the component masks (§4) and the `::before`/`::after` rules that use them, which `.plx-icon` does not count.

## 4. Style and parse cost

Bench pages are generated by `measure.js`: the bundle, React, `platform.js`, 2,000 text rows, and 0 or 500 `<Icon>`s cycling through the 178 symbols (a third of them filled). Each runs twice: with the real bundle (`full`), and with every glyph data URI and alias removed (`stripped`). Times are from a Chrome trace (`ParseAuthorStyleSheet`, `UpdateLayoutTree` + `RecalculateStyles`, `Layout`, `Paint`), in ms, median of 7.

| Page | CSS parse | Style | Layout | Paint | Render (script, sync) |
|---|---:|---:|---:|---:|---:|
| full, 0 icons | 7.1 | 19.3 | 181.7 | 0.5 | 210.6 |
| stripped, 0 icons | 6.7 | 21.5 | 197.6 | 0.6 | 226.4 |
| full, 500 icons | 6.7 | 34.2 | 182.9 | 0.6 | 254.6 |
| stripped, 500 icons | 6.6 | 26.7 | 192.5 | 0.5 | 245.6 |

- **Parse:** the 440 KB of icon data costs **under 0.5 ms** of parse, within the noise. Chrome keeps custom-property values as unparsed token streams until they are used.
- **Style with no icons:** no measurable cost (19.3 vs 21.5 ms; the difference is noise, in the other direction). The 712 properties sit on `:root` and are inherited by reference, not copied per element.
- **Style with 500 icons:** +7.5 ms (34.2 vs 26.7). This is an upper bound on the data's cost, because the stripped page also draws no paths: the icons there resolve to nothing. Part of the difference is the paths themselves. The share that comes from the `--plx-comp-icon-auto-*` re-declarations on each density element is not separated here (open question 4).
- **Layout** is dominated by the 2,000 rows and does not change with the icon data.

### The first-paint cost of cssGlyph

`measure.js` (`/bench/glyph-read.html`, median of 7) reads the properties in the page the way `cssGlyph` does:

| Step | ms |
|---|---:|
| First `getComputedStyle(html).getPropertyValue(...)` on a freshly parsed page | 13.1 |
| All 712 reads after that | 1.0 |
| Decode and `parseSvg` for 178 symbols | 0.6 |
| A read after a DOM attribute change on `<html>` | 0.0 (not measurable) |

- The 13 ms first read is a **forced synchronous style recalculation** of the whole document. It happens the first time any Plenix icon renders. On a real page this is work the first frame would do anyway, so it moves the work earlier, into React's render, rather than adding all of it on top.
- On a page whose stylesheet has not finished loading, `cssGlyph` returns null and does not cache it. Those icons render empty until something re-renders them: nothing re-renders them when the stylesheet arrives (open question 2).
- After the first read, the CSS path is cheap: about 1.4 µs a read, and each key is cached.

## 5. Who reads `--plx-comp-icon-glyph-*`

| Reader | Properties |
|---|---|
| `Icon.tsx` `cssGlyph` | all 712, by computed name |
| `icon.css` itself | per-name rules and context aliases |
| `Button/button.css` | `expand-more` (mask) |
| `Cascader`, `Combobox`, `Input`, `TreeSelect` CSS | `keyboard-arrow-down` (mask) |
| `Menu/menu.css` | `check-small` (mask) |
| `MillerColumns/miller-columns.css` | `chevron-right` (mask) |
| `Tabs/tabs.css` | `arrow-drop-down` (mask) |
| `TimePicker/time-picker.css` | `schedule` (mask) |
| `Tree/tree.css` | `add-box`, `indeterminate-check-box` (mask) |
| `docs/command-bar-study/study.css` (a study page) | `expand-more`, `view-agenda` and their -fill/-24 variants |
| `tools/agent/web/tabs-css.js` (an agent tool) | `arrow-drop-down` |
| `tests/fixtures/zero-overlap/selector-kinds.css`, `tests/baselines/overlap-strict.json` | names, as test data |

- **The design spec** reads none directly. It draws icons only through `<Icon>` and the components above.
- **The packages** (`build-packages.js`) do not read them either. They copy `icon.css` into `plenix.css` and `@plenix-ds/styles` as is, so the properties are public in practice: a consumer's CSS can use them.
- **The Figma map** (`platform/standards/figma-map.json`) does not reference them.
- **Migration consequence:** the 10 component mask rules (10 symbols) need a drawing that still exists in CSS, or need to become `<Icon>`s, before the data URIs can leave the stylesheet.

## 6. Who uses bare class names (`plx-icon plx-icon--<name>`, no component)

| User | Where |
|---|---|
| `services/login/server.js` | server-rendered notice icon (line 235) |
| `tests/high-contrast.test.js`, `tests/visual.test.js` | fixtures that draw `plx-icon--add` as a mask |
| `tools/agent/datagrid/icon-paint.html`, `icon-names.html`, `tools/agent/web/s3/sheet-lab.js` | measuring tools |
| `docs/briefs/header-facts/*.html` | review pages |
| `check-spec.js`, `check-system.rules/icon-names.js` | checks that know the class form |
| CDN consumers with `icons-all.css` | any Material name as a class (documented in the CDN README) |

- **Apps, the DAM and the spec:** none in source. Every icon on their first screens is the inline `<Icon>` (§3: 0 masks).
- `Icon` still puts `plx-icon--<name>` on its span, for the RTL mirror rules and the per-name rules.

## 7. Findings for the plan

1. The drawings are 63.8 KB of the 251.7 KB gzipped `plenix.css` (25%). Every page downloads them, and the apps use 66 of the 178 symbols.
2. Their CSS cost is small: parse under 0.5 ms, no style cost when unused. **The main gain from #280 is bytes and cacheability, not CSS speed.** Expect #286 to show the bytes, not a style-time change.
3. `cssGlyph` adds a forced style recalculation (~13 ms here) inside the first icon render, and has a load-order failure (an icon rendered before the stylesheet stays empty). Both disappear once the drawings are modules or files.
4. Nearly every inline icon ships two paths (20 and 24) and lets CSS hide one. Moving the drawings changes nothing visible here, but static modules (#282) will double in size unless the optical size is chosen in JS.
5. There are two kinds of resolution today: Plenix names (synchronous, from CSS) and library names (async fetch with a shared promise and a cached failure). The library path already meets most of #283. It still lacks immutable URLs in the repository build (`Cache-Control` is up to the server) and a retry after a failure.
6. `base()` guesses the asset folder from script and stylesheet URLs. Renamed bundles need `window.PlenixIconLibrary` or `setIconLibrary`, which works against requirement 7 of #277.
7. 10 component stylesheets draw masks from the glyph properties (§5). They are the only CSS consumers left to migrate.
8. Stale comment: `build-icons.js` line 8 says `glyphs.js` carries "every symbol's four path drawings". It carries names only since 0.69.2.

## Open questions

1. The 10 component masks (§5): turn them into `<Icon>` children, or keep a small CSS drawing set for them? This decides whether `icon.css` can drop every data URI.
2. `cssGlyph` on a page whose stylesheet arrives late: no re-render fixes it today. Accept it until #280, or fix it on its own?
3. Bare classes for Plenix names (`plx-icon--add` without the component): keep them as a supported API after #280 (they then need a file URL, like `icons-all.css`), or retire them? Users today: the login service, two tests, tools and briefs (§6).
4. The `--plx-comp-icon-auto-*` aliases (356 per density element): measure them alone before deciding whether they stay for the masks.
5. Should `--plx-comp-icon-glyph-*` count as a public API for `@plenix-ds/styles` consumers, so they need a release note and an alias period when they go?
6. The first screens are measured here, not every state. Should #286 also measure an open menu, a dialog and a library-name page, on the CDN with real caching?
