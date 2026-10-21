# PropertyList zero-overlap proof (#207)

Exact base `ddd234ec` (current styling/phase-2); DS `e5365a05bab701d0add622aa5459bcbc8b33f0d3`. The advanced target contains an owner wording proposal; this batch preserves it and implements only the existing approved zero-overlap recipe.

Six actual React configurations combine columns/stacked at600/180/160 widths, with fragments, descriptions, plain UI values and technical data. Every computed non-custom/non-animation property on72owned/composed elements remains identical to the unchanged-base gzip capture; strict owned overlaps become zero. Five registered noninheriting variables and exclusive assignments replace overlapping display, column grid, label sizing/wrapping and narrow layout. UI and data value sizes are assigned under exclusive conditions, preserving the existing full data typography contract.

Layout reaches parts through their nearest list React context, including fragments. The context adds no DOM wrappers. A nested stacked list now retains its own label wrapping instead of matching the outer columns selector and truncating it. This nested-state isolation is the intended Standard correction; isolated layouts remain byte-for-byte style identical. The focused test asserts nested one-column layout and normal label wrapping. A standalone Item has no layout modifier, preserving its previous default styling. The obsolete columns-item grid-template token rule was already superseded by subgrid in every columns state and is removed; token JSON stays unchanged.

The guarded `edit-property.cjs` stops on unexpected source. Run `node tests/property-zero-overlap-207.test.js` after overlay/build; never recapture on this migrated branch. `lanes/207-property/design-system/content-labs.js` only adds matching layout classes in the PropertyList lab. Canonical documentation: content/property-list (verified inventory.js).

Build/usage, SYSTEM1065, SPEC1172/768, selector59, audit22/pilot611, PropertyList lab42checks/14tokens and dashboard strict audit pass. No shared component, native fragment or baseline changes. Generated outputs are restored before commits.
