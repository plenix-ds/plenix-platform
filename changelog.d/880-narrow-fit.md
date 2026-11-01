### Fixed
- Two narrow-width overflows the reflow job found on the test site (#880):
  - DataToolbar: the end group (a count or a summary) may now shrink, so a `<Text truncate>` there ends in an ellipsis inside the row instead of running past it. The Directory was 390px wide at 320.
  - NavPane's bottom bar: an item's minimum width is the 44px touch target (`--plx-comp-nav-bar-item-min-width`, was 64px). Five items now fit a bar narrowed by a page scrollbar (the Document page cut off "Browse"). The items still share the width equally.
- The test site's Directory summary uses `truncate` (site PR #22, pinned in CI).
