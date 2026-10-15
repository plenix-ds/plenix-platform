## Batch 373 (2026-10-15): library wave 7
- Writers in worktrees, two at a time (lane A: Calendar, DatePicker, CountrySelect, ProgressSteps, Tabs vertical, AppHeader back
  and title; lane B: MillerColumns, Cascader, EntityPicker, TimePicker, RelativeDateInput, LoadMore, ImageUpload,
  AvatarUpload; lane C: ChartKit (platform/charts, published by build-exports now), TimeZoneSelect, TreeSelect,
  TransferList, BottomSheetNav, NavPane mobile records), merged with tools/agent/library/take-lane.js (new: copies a lane's sources, skips generated files,
  refuses files changed here too). Native fragments merged (8). DataTable's load-more variant page renamed
  "Load-more table" (the leaf now belongs to LoadMore).
- Needs the owner (built from existing roles): Calendar today, chosen and range looks; stepper markers square; vertical
  tabs' open tab as a navigation-list current row; country flags off by default; avatar upload has no circle (Avatar is
  a rounded square); no rule-of-thirds guide in the crop frame.
- Lane C notes: native token files (Swift, Kotlin) do not carry the library part tokens yet; no native fragments for
  Outline views (iOS) and Tree (Android).
- Tests (changed mode): SYSTEM_OK, SPEC_OK (580 records), LABS 22 + 6, VISUAL, DENSITY, LAYOUT, THEME,
  PAGES 281/281, KEYBOARD 23/23, A11Y 0, DATA_TABLES 38/38, TYPOGRAPHY, REFLOW, TARGETS, CONTRAST, NAVIGATION. Released as {V}.
