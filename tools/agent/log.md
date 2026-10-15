## Batch 371 (2026-10-15): soft counters, segmented tabs look A
- First release from VM 101. Count pill tokens point to --plx-sys-status-pill-* (warning -> waiting, info -> active,
  danger -> negative, as Badge's aliases); segmented Tabs on the segmented-* tokens; the first and last shown tab round
  the outer corners even when tabs are moved into More. Spec text for segmented tabs updated.
- Tabs lab: the segmented style edits the tab border color, outer radius and the segmented-tab-* text tokens.
- Preview server: .claude/launch.json now runs tests/lib.js serve() on 8767 (no Python on the VM).
- Not done: native-design.json still describes the solid count pill and the raised segment (native step, item 4).
- Tests (changed mode): SYSTEM_OK 570, VISUAL, DENSITY 18/18, LAYOUT 16/16, THEME 12/12, PAGES 152/152, KEYBOARD
  23/23, A11Y 0 on 62, DATA_TABLES 38/38, TYPOGRAPHY, LABS 8/8 (tabs lab remapped), REFLOW, TARGETS, CONTRAST 158.
  Released as {V}.
