## Batch 375 (2026-10-15): library wave 8
- Lanes A (chart parts, FeatureCard, UserCard), B (VirtualList, Carousel, PeopleGroup, PermissionSummary, QueryBuilder)
  and C (RoleLabel, SearchResult, ResourceList, Timeline, Card expandable) in worktrees, merged with take-lane.js;
  native fragments merged (7). Skipped as answered: Action list, Grouped list, Search template, Filter panel, Sort control.
- Needs the owner (existing roles): dashed reference/threshold lines; the range shade in dark mode; label halos; hollow
  hidden-series swatches; tooltip on the popover surface; the avatar over a user card's cover; legend under the plot;
  carousel Pause as text (no pause icon), dots differ by color only, 6s autoplay token; nested query groups with a rail;
  role icons; timeline line and markers; bold search matches; expandable cards closed by default.
- Follow-ups: ResourceList's command-bar example can pass `selection` now; ChartTooltip keyboard and announcing in wave 9
  (chart interaction); native card designs for FeatureCard and UserCard.
- Tests (changed mode): all 21 groups OK (SYSTEM, SPEC 597 records, LABS 29 + 7, VISUAL, PAGES 202 + 260, KEYBOARD 25,
  A11Y 0, DATA_TABLES 38, TYPOGRAPHY, REFLOW, TARGETS, CONTRAST, NAVIGATION, …). Released as {V}.
