# SearchWorkspace zero-overlap proof (#207)

Exact base `81f48a80964fc2e09e4516734e50952d49f88b38`; design system `e5365a05bab701d0add622aa5459bcbc8b33f0d3`. Light mode, actual React at1440/600/360 widths, populated and empty results.

The pattern assigns query width directly to the SearchField's own `plx-search-ws__field` class instead of arbitrary children of its query wrapper. Shared SearchField root does not assign this property in this composition. All computed non-custom/non-animation properties on12elements (workspace, query wrapper, field root and input at each width) are identical. Owned roots and query parts have zero strict overlaps before and after. One ancestor-selector backlog entry disappears. No new state variables are needed: width is assigned once.

SearchField source, tokens, text contracts and baseline files are unchanged. This record has no registered lab; its documentation renders the actual component, so no design-system overlay is required. Canonical route verified from inventory.js: `navigation/search-workspace`.

The gzip is the immutable unchanged-base capture; `edit-search.cjs` is the guarded exact transformation. After build, run `node tests/search-zero-overlap-207.test.js`. Do not recapture on the migrated branch. Build/usage, SYSTEM1065, SPEC1172/768, selector59, audit22/pilot611 and dashboard strict audit pass. Generated outputs are restored before commit.
