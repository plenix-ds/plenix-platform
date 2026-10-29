# Icons: 0.69.3 against 0.75.0 (issue 286)

Made by `tools/agent/datagrid/icon-compare.js` on 2026-10-29 from the published builds at https://design-system.lighthouseway.org/cdn/. A quick-check tool: it reads the two builds and writes this file.

## In plain words (written by hand from the numbers below; the tables are made by the script)

- **Size:** `plenix.css` is about 210 KB smaller: the 713 icon drawings that sat inside it (306 KB raw) are gone, and each icon is its own small file (or part of a site's icon file). `plenix.js` is about 735 KB bigger, but that is everything else the library gained from 0.69.3 to 0.75.0 (hundreds of components), not the icons; the two files together are about 525 KB bigger raw. An app that names 75 Plenix icons now loads 117.9 KB raw of icon files if it fetches them (73.8 KB gzip, each gzipped alone), or one registered file; the St. John site's own icon file is 89.7 KB (20.8 KB gzip).
- **Speed:** with the icon file registered (what the release README recommends), 0.75.0 paints about as fast as 0.69.3 on an icon-light and an icon-heavy page (first paint 176 against 168 ms, all 150 icons drawn at 173 against 161 ms: within the noise of a live network). **Without it, a page that names 150 icons asks the live CDN for about 600 files at once and about half of the requests are refused** (290 refused; 10 drawings appeared): in a browser, a burst of 300 requests to the CDN loses about 30 even though 150 requests from a command line all succeed, which points at the server's limit on simultaneous HTTP/2 requests. A refused icon file stays empty for that page in 0.75.0; the retry in #283 (not released yet) gives a second try, which helps a little but does not fix a burst of this size. So a production site should register its icons (a site icon file), and the server's limit is worth the owner's look. The server is outside this repository, so nothing here touches it.
- **Pixels:** of 1,664 Plenix cells (208 icons at xs, sm, md and lg, outline and filled), 1,616 are identical in Compact and in Comfortable. The 48 that differ belong to six icons: `file-ai`, `file-jpg`, `file-pdf`, `file-png`, `file-psd` and `file-svg`, the lettered file icons with squared letters that #301 changed on purpose after 0.69.3. A sample of 149 Material symbols (every 28th) at the same sizes and fills: 1,192 cells, zero pixels differ.
- **Not in this run:** the grid benchmark (`bench.js`, `trace.js`) runs against a checkout, not a published build; and the Material sample is a sample (every 28th of 4,150), because a full run would ask the CDN for tens of thousands of files.

## Size

Files of the published builds, raw and compressed (gzip level 9, Brotli default).

| File | 0.69.3 raw | 0.69.3 gzip | 0.69.3 Brotli | 0.75.0 raw | 0.75.0 gzip | 0.75.0 Brotli |
|---|---:|---:|---:|---:|---:|---:|
| plenix.css | 2263.0 KB | 245.6 KB | 175.9 KB | 2053.6 KB | 191.1 KB | 133.6 KB |
| plenix.min.css | 2098.4 KB | 236.1 KB | 171.6 KB | 1797.0 KB | 181.2 KB | 128.3 KB |
| plenix.js | 3497.5 KB | 818.0 KB | 605.2 KB | 4232.2 KB | 996.9 KB | 715.1 KB |
| plenix.esm.js | 1924.8 KB | 448.6 KB | 348.7 KB | 2432.3 KB | 564.9 KB | 425.7 KB |
| the self-hosting archive (.tgz) | 3017.7 KB | | | 6597.7 KB | | |

**Icon drawings inside `plenix.css`** (data addresses): 0.69.3: 713 of them, 305.6 KB; 0.75.0: 1, 0.2 KB.

**An app using 75 Plenix icons:** in 0.69.3 every icon is in `plenix.css`, so the app pays for the whole set (305.6 KB raw) however few it names. In 0.75.0 the icons are separate files fetched when used: the 75 names come to 300 small files, 117.9 KB raw (73.8 KB gzip, each file gzipped alone); with a site icon file (`tools/icons/site-icons.js`) they are one registered file.
The St. John site's own icon file: 89.7 KB raw, 20.8 KB gzip.

**Reading it plainly:** `plenix.css` is 209.5 KB smaller (the icon drawings left it). `plenix.js` is 734.7 KB bigger: it also holds everything the library gained between the two builds, so the two files together are 525.2 KB bigger raw. The icon change alone is the icon-data line above; the rest is other work.

## Speed

First paint and the time until the icons are drawn, in Chrome, cache off, from the live CDN; the median of 5 runs per case. The cases ran in turn in one session; network noise is in all of them. Three cases: 0.69.3 as it is; 0.75.0 as it is (every icon a page names is fetched when it is first drawn); and 0.75.0 with the compatibility icon file `plenix-icons-plenix.js` (every Plenix icon registered, nothing fetched), which is what the release README recommends for production (a site's own icon file is smaller).

"Icons drawn" is when the last drawing appeared (no new one for 0.8 s after it); "paths" counts the drawings that appeared (each icon has a 20px and a 24px one); "failed" is the median number of icon-file requests the network refused.

| Page | 0.69.3 first paint | icons drawn | paths | failed | 0.75.0 as it is first paint | icons drawn | paths | failed | 0.75.0 + icon file first paint | icons drawn | paths | failed |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| icon-light (5 icons) | 168 ms | 150 ms | 10 | 0 | 184 ms | 172 ms | 10 | 0 | 188 ms | 179 ms | 10 | 0 |
| icon-heavy (150 icons) | 168 ms | 161 ms | 300 | 0 | 384 ms | 553 ms | 10 | 290 | 192 ms | 173 ms | 300 | 0 |

## Pixels

Every cell is one icon at one size (xs, sm, md, lg), outline and filled; the two builds are drawn the same way and each cell's pixels compared (a pixel differs when a channel differs by more than 24). The Plenix set of 0.75.0 is drawn from its compatibility icon file; the icons are shown in groups, each after the network is quiet. The Material files are read from this checkout's library (the same files as the CDN's /cdn/material/<commit>/): the live CDN refuses a burst of hundreds of requests.

| Set | Density | Icons | Cells | Drawn in 0.69.3 | Drawn in 0.75.0 | Drawn in only one | Cells that differ | Pixels that differ |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Plenix icons | compact | 208 | 1664 | 1664 | 1664 | 0 | 48 | 6580 |
| Plenix icons | comfortable | 208 | 1664 | 1664 | 1664 | 0 | 48 | 6778 |
| Material sample (every 28th symbol) | compact | 149 | 1192 | 1192 | 1192 | 0 | 0 | 0 |

Icons with at least one cell that differs (Plenix icons, compact): 6: file-ai, file-jpg, file-pdf, file-png, file-psd, file-svg.

Cells that differ most (Plenix icons, compact): file-pdf lg filled (303 px; ink 315 against 153); file-pdf lg (296 px; ink 239 against 153); file-psd lg filled (274 px; ink 299 against 164); file-ai lg filled (272 px; ink 299 against 117); file-jpg lg filled (230 px; ink 312 against 158); file-png lg filled (224 px; ink 312 against 167); file-svg lg filled (222 px; ink 312 against 159); file-pdf md filled (219 px; ink 211 against 103); file-psd lg (212 px; ink 138 against 164); file-pdf md (211 px; ink 168 against 103); file-ai lg (192 px; ink 138 against 117); file-psd md filled (183 px; ink 185 against 113).

Icons with at least one cell that differs (Plenix icons, comfortable): 6: file-ai, file-jpg, file-pdf, file-png, file-psd, file-svg.

Cells that differ most (Plenix icons, comfortable): file-pdf lg filled (303 px; ink 315 against 153); file-pdf lg (296 px; ink 239 against 153); file-psd lg filled (274 px; ink 299 against 164); file-ai lg filled (272 px; ink 299 against 117); file-jpg lg filled (230 px; ink 312 against 158); file-png lg filled (224 px; ink 312 against 167); file-svg lg filled (222 px; ink 312 against 159); file-pdf md filled (217 px; ink 215 against 105); file-psd lg (212 px; ink 138 against 164); file-pdf md (209 px; ink 164 against 105); file-ai md filled (192 px; ink 210 against 84); file-ai lg (192 px; ink 138 against 117).

