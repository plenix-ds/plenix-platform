### Added
- By Codex (PRs #119–#123; CI blocked by billing, checked by the integrator):
  - Wave 14 A: PromptInput, StreamingText, AIChat, AssistantPanel (on the wave 14 B and C AI parts; no AI color).
  - Wave 15 A: page templates, analytics (opt-in, no network by default), the Angular and Figma packages.
  - RedSave fixes: one self-hosting bundle per version on the CDN, `size="sm"` on Combobox, Select, Input and
    SearchField, Toolbar spacing and focus with wrapped children, muted navigation items in the muted color, the
    "select or create" docs.
  - DataTable, the rest of RedSave's list: grouping by a multi-value field, faceted quick-filter counts, `narrowAt`,
    `empty` and the deleted look, `type: "bytes"`, undo on destructive actions, built-in avatar/tags/badge cells, widths
    as CSS lengths or size tokens, checkbox labels kept through view changes.
- Codex task #126: the DataTable on Tabulator the normal way (option B), after the owner's choice.
### Fixed
- The Vue package's ESM declarations and the lint package's source dependency (#121).
