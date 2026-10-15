### Changed
- The palette consolidation (owner, 2026-10-15; docs/color-consolidation/): one canonical palette of 83 colors in 12
  families named by their tokens (Gray, Red, Pink, Magenta, Orange, Brown, Yellow, Green, Teal, Cyan, Blue, Purple).
  27 canonical colors added (among them green-150 #bfef45 and yellow-175 #ffe119); 162 theme references moved to their
  canonical tokens.
- Categories keep their names and roles (`--plx-sys-category-<name>`, `-soft`, `-soft-border`, `-on-soft`); every role
  now points to a canonical token, and some categories share soft shades. A component reads a color by its token name.
- Design system: the Color page groups the canonical palette in the 12 families; the Tag page's category table reads
  each role's token from the theme; a bulleted list card on the List page.
- docs/palette.md and docs/pills-and-colors.md regenerated from the tokens.
### Deprecated
- The 83 retired palette tokens (the `--plx-ref-color-category-*` primitives and the near-duplicate shades) stay one
  release as aliases of their canonical destination; docs/palette.md lists each one's replacement.
