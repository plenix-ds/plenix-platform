## Batch 374 (2026-10-15): command bar swap, floating table scrollbar
- Handoff docs/handoff/2026-10-15-command-bar-swap.md (desktop session). Owner, 2026-10-15: the count stays inside the
  bar; while selecting, "× N selected" in the bar clears the selection (Microsoft 365).
- CommandBar: selection object (swap), split retired, Divider between actions and find, announce on swap, Escape
  clears; w07K records, docs and lab (variants one / selected / view; the selection-bar lab stays for BulkActions);
  BulkActions and bulk-selection records point to the swap; keyboard test: the swap and Escape (and it waits for the
  page's tables before focusing Filter).
- DataTable floatingScroll.js: tracks anchored to the body (anchor positioning), thumbs on the body's scroll timeline,
  length by data-plx-thumb steps; tokens data-table-scroll-*; reduced motion keeps the thumb (feedback, not motion).
- Select-all checkbox moved 8.5px and shrank to 13px on header hover (the title reserve); select column excluded
  (owner chose "exclude", 2026-10-15).
- Selected row blue-200, hover on a selected row gray-100, no border (owner, 2026-10-15).
- Open for the owner: BulkActions keep for pages without a bar, or retire; NavPane edge inset 12px or 16px.
- Tests (changed mode): SYSTEM_OK, SPEC_OK, VISUAL, DENSITY, LAYOUT, THEME, PAGES 195/195, KEYBOARD 25/25,
  A11Y 0, DATA_TABLES 38/38, TYPOGRAPHY, LABS (command-bar, bulk-action-bar fixed), REFLOW, TARGETS (coarse 18), CONTRAST,
  NAVIGATION, FOCUS_ORDER, HIGH_CONTRAST. Released as {V}.
