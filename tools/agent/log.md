## Batch 380 (2026-10-15): wave 10 lanes A and B
- Merged with take-lane.js (A 28 files, B 23, no clashes); native fragments checked (ALL OK after the build) and merged
  (4 new pages, none replaced). Lane C is Codex's (#2, the pilot); the plan of record is issue #3 (owner: Codex takes
  lanes B and C of waves 11–15 once #2 merges cleanly).
- Needs the owner (wave 10): sortable item look (default surface, subtle border, control radius, data-row height);
  drop states (focus-ring insertion line and dashed outline; refusing target in danger color); horizontal handle =
  drag icon rotated; picked-up handle in the selected fill; Resizable size menu placement; dnd tokens (edge 48px,
  speed 1px/ms, steps 8/32px); "Scheduled" in the waiting tone; status icons (draft pencil, in review doc-search,
  approved circle-check, changes requested alert, rejected close, published visibility, scheduled schedule); copy
  naming "Copy of {name}" vs "{name} copy".
- Noted: format.js reads a bare YYYY-MM-DD as UTC (a day early west of Greenwich); ReviewFlow works around it.
- Tests (batch run, changed mode): all 21 groups OK (PAGES 221/221, LABS 17/17, A11Y 0 on 95, KEYBOARD 25/25, DATA_TABLES 38/38, CONTRAST 158, TARGETS coarse 9). Released as {V}.
