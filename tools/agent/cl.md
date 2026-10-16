### Added
- The composition standard (owner, 2026-10-16, GitHub #55), in platform/standards/layout.json: each kind of page lists
  its regions in order, each region the patterns it is built from, the "what is this region?" guide, and the fields
  rule. Published as `PAGE_REGIONS`, `COMPOSITION_GUIDE`, `FIELD_RULES` (and `PAGE_LAYOUTS[kind].regions`); drawn live
  at docs/composition/ with a reference screen (Posts: one command bar instead of a stack of selects).
- check-system rule `composition`: a field (Input, Select, Combobox, SearchField, the pickers …) outside a pattern that
  sizes it is an error. It follows a screen's own helpers (a Row that wraps a SettingsRow, a component that returns a
  field, a dialog's step components).
- Field `hideLabel`: the label stays for screen readers and still labels the control, but is not drawn.
### Changed
- Fields are layout-neutral: `.plx-input` and `.plx-select` take their natural width; in a "stretch" pattern (Form,
  Field, a fieldset, a settings row, a dialog, a sheet, a side panel, a popover, an inline edit, a find panel, a wizard)
  they fill their column; in a "content" pattern (CommandBar, Toolbar, DataToolbar, FilterBar, ActionBar, AppHeader) they
  keep their natural width; an Input's own `width` wins. Apps to check: a field placed loose in a page now shows its
  natural width (check-system names each one). In Plenix's own apps every field already sits in a pattern; the notes
  text, the search page, two Asset Manager title fields and its category filter are now in a Field (hidden label), with
  the same look.
