### Added
- SplitView and ReadingPane (02 Page structures › Split workspace; owner, 2026-10-16): two panels that share their room,
  `orientation="side-by-side"` (default) or `"stacked"`, both the full height (or width) of the page, each scrolling on
  its own; the divider between is the whole gap (a thin line down its middle and a pill centered on it, the resize
  pointer anywhere along it; arrow keys, Home and End); side by side stacks under 900px of its own width. ReadingPane:
  the data table's frame, an actions row with a thin line under it that stops short of the edges, the item below.
  Tokens: platform/tokens/components/split-view.tokens.json. Design system: Split view, with Side by side and Stacked.
- docs/reading-pane-study: the Outlook-style demo on SplitView, two pages and no switches (index.html side by side,
  stacked.html stacked).
### Removed
- The size menu (Narrower, Wider, Reset, Collapse) on Resizable and PanelSplitter, also for touch (owner, 2026-10-16):
  edges are dragged or moved with the keyboard. Its tokens (resizable-menu-*, panel-splitter-menu-*) are gone;
  PanelSplitter's `defaultValue` prop is no longer used. Apps to check: none used the menu directly.
