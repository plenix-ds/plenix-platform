### Added
- Library wave 9, lanes A and B (24 leaves): chart interaction (one Tab stop per chart, arrows between points, the value
  in the tooltip and the live region, crosshair, brush to zoom, Reset zoom), LineChart (step), AreaChart (stacked,
  percent), Gauge, HeatMap (matrix, calendar), WaterfallChart, WordCloud, NetworkGraph, Diagram, BarChart (column,
  stacked, percent, histogram), ComboChart, PieChart (donut), BulletChart, BoxPlot, RadarChart, SankeyDiagram,
  TimelineChart, ComparisonView (Compare). Every chart keeps "Show the data".
- Command bar, the Fluent model (owner, 2026-10-15): `actions[].toggle` (a pressed button; folded, a checked item),
  `actions[].choices` (shows the current choice; folded, a submenu of radio items), `status` (beside the count),
  `quickFilters` (fold into More after the commands, each a submenu of checkable values). Fit order: labels become
  icons first; then the search becomes its icon and the count and status step out; then commands fold into More, then
  quick filters. Sort, Filter, Group, Columns and View never fold.
- List `variant="bullets"`: a 4px gray-400 square before each statement, the text justified.
- docs/palette.md: every palette color by family.
### Changed
- Form fields: a gray-400 border all round and a #fcfcfc fill (new palette gray-50), the same when focused (roles
  field-border, field-background; owner, 2026-10-15).
- Menus, lists and popovers that open: no border and the Lifted shadow (new roles shadow-lifted, overlay-border; new
  palette blacks at 20% and 12%).
- The Asset Manager and Files pass their quick filters as `quickFilters`; Save search is a command.
- Design system: long texts of several sentences read as bullet points; the pill material moved from Color to the
  Badge and Tag pages; the Color palette groups every color by what it looks like (11 families; category colors in
  their families, dark warm shades in Brown); the duplicate "New scales" section is gone.
