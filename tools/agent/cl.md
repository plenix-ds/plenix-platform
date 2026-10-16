### Changed
- AppHeader: the pinned-app links leave the header when the header itself is narrower than Wide (840px), not the
  screen (owner, 2026-10-15, GitHub #27). In a split view, an embedded page or a panel the header no longer crowds;
  search spans the bar. Apps to check: none need changes; the class `plx-app-header--compact` marks the state.
- docs/touch-options records the two decisions (the pane's size menu with touch: no change).
