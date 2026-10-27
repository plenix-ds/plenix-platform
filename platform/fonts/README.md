# Plenix fonts

The Platform's two typefaces, DM Sans and Reddit Mono, hosted with it so no page calls Google (batch 227). `platform/system/fonts.css` holds the
`@font-face` rules; every page links it (and preloads `dm-sans-variable-latin.woff2`, the face almost every page draws
first).

| Family | Files | Weights | License |
|---|---|---|---|
| DM Sans | `dm-sans-variable-latin.woff2`, `-latin-ext`, `dm-sans-variable-italic-latin.woff2`, `-latin-ext` | 300–700 (variable), normal and italic | SIL Open Font License 1.1 (`OFL-DMSans.txt`) |
| Reddit Mono | `reddit-mono-variable-latin.woff2`, `-latin-ext` | 200–900 (variable), normal only | SIL Open Font License 1.1 (`OFL-RedditMono.txt`) |

Reddit Mono is the code and data font since 0.54.0 (owner, 2026-10-18; docs/font-study/playground): its @font-face has
size-adjust 97.1%, so at the same font-size its letters are as tall as DM Sans's.
Reddit Mono was downloaded 2026-10-18 from Google Fonts (`family=Reddit+Mono:wght@200..900`), unedited; its license is
github.com/google/fonts ofl/redditmono.

Downloaded 2026-10-08 from Google Fonts (the woff2 files and unicode ranges it serves for
`family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700`), unedited.
The licenses are from github.com/google/fonts (ofl/dmsans).

To update: fetch that CSS with a current browser's user agent, download each latin and latin-ext woff2 to the names
above, copy their `unicode-range` into fonts.css and build. No tests: see HANDOFF.md (the owner runs them).
