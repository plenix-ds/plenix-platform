### Added
- Icon `star` (outline and filled), from the vendored Material Symbols Sharp library, unedited.
- check-system rule `icon-names`: an unknown literal icon name fails the check.
### Fixed
- TypeScript definitions (@plenix-ds/react) are valid TypeScript: renamed exports typed by their public name, part
  props on their own export, interfaces extend `Omit<HTMLAttributes, own props>`; 364 exports, matching window.Plenix.
- The npm package finds its vendor files (Tabulator, Tiptap) in `dist/vendor/`; the idle Tabulator prefetch runs only
  on the Platform's own origin (an app no longer downloads Tabulator on pages without a table).
- Unknown icon names fixed in Icon, Thumbnail, CollapsibleSection and the navigation-list examples.
- Touch targets (coarse 18 → 9): the combobox field's whole height is its target; the field info button reaches 44px
  with touch; DataTable's selection checkboxes fill their 44px cell with touch (a tap beside the box toggles that row).
- The design system's layout lab loads production React.
