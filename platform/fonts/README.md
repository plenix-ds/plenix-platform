# Plenix fonts

The Platform's two typefaces, hosted with it so no page calls Google (batch 227). `platform/system/fonts.css` holds the
`@font-face` rules; every page links it (and preloads `dm-sans-variable-latin.woff2`, the face almost every page draws
first).

| Family | Files | Weights | License |
|---|---|---|---|
| DM Sans | `dm-sans-variable-latin.woff2`, `-latin-ext`, `dm-sans-variable-italic-latin.woff2`, `-latin-ext` | 300–700 (variable), normal and italic | SIL Open Font License 1.1 (`OFL-DMSans.txt`) |
| DM Mono | `dm-mono-300-…`, `dm-mono-400-…`, `dm-mono-500-…`, `dm-mono-400-italic-…` (latin, latin-ext) | 300, 400, 500, italic 400 | SIL Open Font License 1.1 (`OFL-DMMono.txt`) |

Downloaded 2026-10-08 from Google Fonts (the woff2 files and unicode ranges it serves for
`family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400`), unedited.
The licenses are from github.com/google/fonts (ofl/dmsans, ofl/dmmono).

To update: fetch that CSS with a current browser's user agent, download each latin and latin-ext woff2 to the names
above, copy their `unicode-range` into fonts.css, build, and run the tests.
