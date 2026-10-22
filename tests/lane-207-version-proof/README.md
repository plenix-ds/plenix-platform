# VersionCompare zero-overlap proof (#207)

Exact base `05e36ccd`; DS `6ce4c06fe1ee259711d405d24235eeb98d0c4bc0`. The current target includes owner Actions wording/native-data updates; they are preserved.

Four actual React configurations cover columns, slider, changed text (added/removed/folded lines) and unchanged text. Every computed non-custom/non-animation property on56owned/composed elements is identical to the unchanged-base gzip capture; ten reported duplicate-root-gap/picker-minimum overlaps become zero. Field already owns picker minimum width, so only the duplicate pattern declaration is removed. Redundant columns/slider root gaps equal the existing base gap. The diff part exists only in text mode; its direct selector preserves layout. Added/removed signs carry their own kind, with exclusive colors from the same tokens. Three ancestor-selector findings disappear. No new state variables are needed because each property is assigned once.

`edit-version.cjs` is the guarded exact transformation; unmatched input stops it. Run `node tests/version-zero-overlap-207.test.js` after overlay/build, never recapture on this branch. Matching lab sign classes and color probe selectors are under `lanes/207-version/design-system/parts/w12A.labs.js`. Canonical documentation and lab id verified in w12A records/labs: specialized/version-comparison, version-comparison.

No shared Field/SegmentedControl/ComparisonView, tokens/fonts/colors, text contracts, native fragments or baseline changes. Build/usage,SYSTEM1069,SPEC1172/691,selector59,audit22/pilot611,Version comparison lab and dashboard strict audit pass. Generated outputs are restored before commits.
