### Changed
- **The code and data font is Reddit Mono** (owner, 2026-10-18; docs/font-study/playground: the closest monospace match
  to DM Sans, 98.8%). DM Sans never changes and every element keeps its px size: Reddit Mono's @font-face has
  `size-adjust: 97.1%`, so at the same font-size its x-height, capitals and figures match DM Sans's (99–100% on a 1.5×
  screen), and its stroke matches at Regular (99.8%; 92–94% at Medium and Semibold). Reddit Mono is variable (200–900),
  so no weight is faked. Self-hosted in platform/fonts (OFL 1.1).
- Every rule that sets the monospace font also sets `word-spacing: var(--plx-sys-font-data-word-spacing)` (−0.279em,
  `--plx-ref-word-spacing-mono-fit`): a space as wide as DM Sans's. check-system rule `mono-spacing` keeps it so.
- `--plx-ref-font-mono` starts with "Reddit Mono"; the docs, standards, native design data and tests name it. DM Mono
  stays declared only for the font study. Apps to check: an app that names "DM Mono" itself should use the token.
