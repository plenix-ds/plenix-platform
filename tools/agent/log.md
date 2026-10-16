## Batch 381 (2026-10-15): wave 9 lane C, touch options
- Wave 9 lane C merged (take-lane.js, 34 files). Its own keyboard wrapper (useChartKeyboard, ChartKeys) was replaced
  before release by useChartPoints, an adapter over lane A's useChartInteraction through ChartFrame (one keyboard model
  for every chart); the wrapper's frame tokens and lab section removed; records and docs reworded; checked in the
  browser on all six charts (arrows move, each value announced, no console errors).
- Native: ios/android-charts-w09c.json add Sparkline, Lollipop, Scatter, Bubble, Funnel, Treemap, Gantt, Choropleth.
- docs/touch-options (GitHub #26, #27): splitter size menu with touch (today, A strip, B pane header (recommended),
  C pane menu); AppHeader links by screen width (today) vs the header's own width (container query, recommended).
- Wave 11 lane A started in a worktree (#30). Owner: Codex takes lanes B and C from wave 11 once #2 merges cleanly.
- Tests (batch run, changed mode): all 21 groups OK (PAGES 183/183, LABS 18/18, A11Y 0 on 58, KEYBOARD 25/25, CONTRAST 158, TARGETS coarse 9). Released as {V}.
