### Added
- `Resizable` `variant="divider"`: the edge is the whole gap to the next panel, with a line down its middle and a pill
  on it (`--plx-comp-resizable-divider-*`; its width is `--plx-comp-resizable-divider-size`, which a container may set
  on its own element). `Resizable` `fill`: the content is a column its children fill.
- `tests/compare-styles.js`: compares one component's elements, property by property, between two copies of the
  repository, for pages whose documentation changes with the stylesheet.
### Changed
- SplitView no longer styles Resizable's parts (Styling Standard, Phase 2): its first panel is
  `<Resizable variant="divider" fill>`, and it sets the divider's width to its gap. Tokens
  `--plx-comp-split-view-line-*`, `-handle-*` and `-active-color` are now `--plx-comp-resizable-divider-*`.
  No visual change: SplitView's and Resizable's examples are identical (tests/compare-styles.js against 0.57.4).
  Apps to check: CSS that set the old SplitView divider tokens.
- `tests/clash-audit.js --check` reads a differing design-system page once more on its own before reporting it.
