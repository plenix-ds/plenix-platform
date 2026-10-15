## Batch 372 (2026-10-15): command bar adoption, six badge names, badge icons
- DAM HomePage: DataToolbar -> CommandBar with useCollectionView per list (fields for categories, collections, assets;
  quick filters Category/Type/Tags on a category's assets; Save search at the end); cards follow the bar's filter and
  sort. Files: CommandBar (Upload; search, Filter, Type; Sort, Columns, View without gallery). Projects' list lives in
  the navigation pane (no bar). The Search workspace keeps its own toolbar.
- Badge tones renamed in DAM, dashboard, settings, classification, CommandBar; status meanings applied.
- Badge icon prop (badge-gap, badge-icon-size tokens); EntityHeader live -> Badge; record-page lab and the live-state
  variant page updated; data-table test opens the list through View > List.
- Found, not fixed: the side panel's collapsed-rail tooltip can stick out past the shell's end and scroll it sideways.
- Tests (changed mode): SYSTEM_OK, SPEC_OK, VISUAL, DENSITY, LAYOUT, THEME, PAGES 124/124, KEYBOARD 23/23, A11Y 0 on 62,
  DATA_TABLES 38/38, TYPOGRAPHY, LABS (badge, counter, tabs, record-page, command-bar), REFLOW, TARGETS, CONTRAST,
  NAVIGATION. Released as {V}.
