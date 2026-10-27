# Plenix fonts

The Platform's typefaces, DM Sans and Reddit Mono, and for Arabic Readex Pro and IBM Plex Sans Arabic, hosted with it so no page calls Google (batch 227). `platform/system/fonts.css` holds the
`@font-face` rules; every page links it (and preloads `dm-sans-variable-latin.woff2`, the face almost every page draws
first).

| Family | Files | Weights | License |
|---|---|---|---|
| DM Sans | `dm-sans-variable-latin.woff2`, `-latin-ext`, `dm-sans-variable-italic-latin.woff2`, `-latin-ext` | 300–700 (variable), normal and italic | SIL Open Font License 1.1 (`OFL-DMSans.txt`) |
| Reddit Mono | `reddit-mono-variable-latin.woff2`, `-latin-ext` | 200–900 (variable), normal only | SIL Open Font License 1.1 (`OFL-RedditMono.txt`) |
| Readex Pro | `readex-pro-variable-arabic.woff2` | 300–700 (variable), normal only; Arabic letters only | SIL Open Font License 1.1 (`OFL-ReadexPro.txt`) |
| IBM Plex Sans Arabic | `ibm-plex-sans-arabic-300-arabic.woff2` … `-700-arabic.woff2` (300, 400, 500, 600, 700) | 300–700 (one file each), normal only; Arabic letters only | SIL Open Font License 1.1 (`OFL-IBMPlexSansArabic.txt`) |

Arabic (owner, arabic-font-35): Readex Pro is the titles' face (`--plx-ref-font-sans-title`, through `--plx-sys-font-heading`)
and IBM Plex Sans Arabic every other text's (`--plx-ref-font-sans`). Each comes after DM Sans in its stack and its
@font-face covers only the Arabic letters (unicode-range), so Latin text keeps DM Sans and a page without Arabic never
downloads them. Both were downloaded 2026-10-27 from Google Fonts (`family=Readex+Pro:wght@300..700` and
`family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700`, the arabic subset), unedited; their licenses are from
github.com/google/fonts (ofl/readexpro, ofl/ibmplexsansarabic).

Reddit Mono is the code and data font since 0.54.0 (owner, 2026-10-18; docs/font-study/playground): its @font-face has
size-adjust 97.1%, so at the same font-size its letters are as tall as DM Sans's.
Reddit Mono was downloaded 2026-10-18 from Google Fonts (`family=Reddit+Mono:wght@200..900`), unedited; its license is
github.com/google/fonts ofl/redditmono.

Downloaded 2026-10-08 from Google Fonts (the woff2 files and unicode ranges it serves for
`family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700`), unedited.
The licenses are from github.com/google/fonts (ofl/dmsans).

To update: fetch that CSS with a current browser's user agent, download each latin and latin-ext woff2 (the arabic one for Readex Pro and IBM Plex Sans Arabic) to the names
above, copy their `unicode-range` into fonts.css and build. No tests: see HANDOFF.md (the owner runs them).
