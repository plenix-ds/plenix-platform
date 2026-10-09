# Changelog

All notable changes to Plenix: the packages (`@plenix-ds/tokens`, `icons`, `styles`, `react`), the CDN and the API.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow `VERSIONING.md`.
The batch numbers point to the work log (Plenix - DAM/audit/batches/).

## [Unreleased]

### Fixed
- Regional density for component tokens: a Button inside a compact or comfortable region (data-plx-density on part of a
  page) kept the page's size since 0.2.0, because component tokens were declared only on :root (a custom property is
  computed where it is declared). Component tokens are now written on :root and on every density and interaction
  context. No app page used a density region, so nothing changed on screen; tests/density.test.js guards it. (batch 221)

### Added
- DataGrid: every table in Plenix is a Tabulator grid (6.6.1, MIT, vendored in platform/vendor/tabulator, loaded the
  first time a grid renders) in the owner's grid style (docs/datagrid-tabulator-demo.html), drawn with tokens only
  (components/DataGrid/data-grid.css). Columns are Tabulator's own definitions plus Plenix kinds (name, data, icon,
  center, actions), React cells (render), filters, a row header; header menu, row menu, filter popup, groups, tree rows,
  editing, selection. New tokens: grid color roles (--plx-sys-grid-*, light and dark), --plx-sys-grid-row-height
  (28 / 32 / 40; 44 on touch and mobile) and --plx-sys-grid-font-size (12 / 13 / 13), 48 --plx-comp-data-grid-*
  tokens; palette colors for the grid's dark look (gray-350, -400, -850, -900, -925, -950, blue-850, -900, green-900,
  brown-900, black-alpha-14, -50) and space-6px, space-10px, size-18px, motion-duration-quick (0.12s), opacity-45.
  Icons added from Material Symbols (unedited): sort-ascending, sort-descending, filter-off, visibility, visibility-off,
  attachment, more, open, select. tests/grid-reference.js compares every part of the grid with the reference: 180 of
  180 match (light and dark, each density). The pages move to DataGrid next; Table stays until then. (batch 226)
- Form controls on component tokens: Input, Textarea, Select, Checkbox, Radio group, Choice card, Switch and Field
  take their look from 149 new `--plx-comp-input-*`, `-select-*`, `-textarea-*`, `-check-*`, `-radio-group-*`,
  `-choice-*`, `-switch-*` and `-field-*` tokens in components.tokens.json, each pointing to the same role as before. A
  new tool, tokenize-component.js, does this for any stylesheet (the Button treatment of batch 207 as a tool);
  tests/style-compare.js compares the computed styles of two copies element by element. No visual change: 129,485
  values on the 14 app pages and 20,069 on the form controls are identical, the pixel comparison is identical.
  tests/density.test.js now also checks Select, Checkbox and Switch in each density region (18 of 18). (batch 223)
- Foundations belong to the theme: each theme has a foundations file (theme-<name>.tokens.json) with its typefaces,
  font weights, letter spacing, shape (radius scale), border widths and styles, motion (durations, easing, stagger),
  opacity levels and focus ring, as `--plx-sys-typeface-*`, `-font-weight-*`, `-letter-spacing-*`, `-shape-*`,
  `-border-width-*`, `-border-style-*`, `-motion-*`, `-opacity-*`, `-focus-ring-*`. The radius and font roles point to
  them; every component and pattern uses them (816 uses converted). Spacing, control heights, density, grid,
  breakpoints and layers stay shared by every theme. check-system rule `themeable` rejects a reference scale in a
  stylesheet; build-tokens rejects a theme that leaves out a foundation. The default theme keeps today's exact values
  (no visual change: the Button snapshot and every app page are identical). (batch 220)
- Themes, defined in the design system (platform/standards/themes.json): a theme is a full set of semantic roles,
  light and dark, pointing to the shared palette. The current look is the "default" theme (was "plenix"; files
  theme-default.*.tokens.json, system/themes/default.css). build-tokens.js makes one stylesheet per theme and rejects a
  theme that writes a color literal or leaves out a role; build-standards.js makes the theme list (providers/themes.js,
  THEMES) and system/themes/index.css. Switching: data-plx-theme on <html>, PlenixWorkspace.setTheme / clearTheme
  (remembered for every page), `useTheme()`; Settings › Appearance has Theme and Mode. tests/theme.test.js (10 checks)
  builds a sample theme in a temporary copy and switches to it. (batch 219)
- The layout standard, defined in the design system (platform/standards/layout.json): the five layout modes (widths,
  alignment, what they hide) and which kind of page gets which mode. build-standards.js generates the code the apps run
  (providers/pageLayouts.js, system/layout-modes.css); check-system rejects a hand edit (rule generated) and an app that
  sets a layout itself (rule page-layout). Apps say what a page is: `<AppShell page="settings">`, `mountSuite(app,
  render, { page })`; SettingsLayout is a settings page by itself. (batch 218)
- The five layout modes, built (batch 217; since batch 218 a page gets its mode only through the layout standard): contained centers the content
  at the 960px form width; hybrid caps paragraphs at 760px and forms at 960px; multi-pane makes each pane scroll on its
  own; focus hides the navigation and the inspector. The suite apps are fluid, the image editor is focus (no visual
  change). tests/layout.test.js (12 checks) runs in `npm test` and CI. (batch 217)

### Changed (visual)
- Every table in the apps is a DataGrid (Tabulator, the owner's grid style): Files, Projects (files), the suite's
  Search workspace (every source), Settings (scenarios, fields, product vision, terminology, data model: 7 kinds of
  table), the Asset Manager's categories, collections and asset results, its system settings (enabled for, actions,
  view and edit all folders, fields, conversion presets, users, email templates, database, customizations, scheduled
  tasks) and its field dialogs. Columns are written as Tabulator column definitions; sorting is Tabulator's (sorter
  functions for counts, sizes and dates); dialogs reorder rows by their handle (movableRows). DataGrid adds: selected /
  onSelectionChange, Enter opens a row that has rowClick, the wrap kind (long text grows the row), a grid built while
  hidden is drawn when shown, rows equal to the ones shown change nothing. tests/grid.test.js (in npm test and CI)
  opens all 22 grid views and checks each grid is built, axe-clean, free of inline styles and on the grid row height.
  (batch 226)
- Checkbox in compact density: no top and bottom padding, so a single-line Checkbox, Radio or row is 24px (the
  compact control role, on the 4px grid) instead of 26px. Standard and comfortable are unchanged. Token: a compact
  value for --plx-comp-check-padding-block. On the app pages only the 10 checkboxes of Asset Manager › System settings
  change (their padding; their rows keep their height). (batch 224)
- Settings pages follow the standard (settings → contained): the Settings app and the Asset Manager's settings are one
  centered column at the 960px form width. SettingsLayout's own 900px limit is removed. (batch 218)
- Design system: lists of token and class links stand 12px apart (a 26px pitch), so each is a 24px touch target;
  accessibility issues 3 → 0. (batch 218)
- Asset Manager: interface labels in sentence case (299 labels, e.g. "Save changes", "GPS latitude", "Move assets"); content keeps its capitals (asset titles, people, category, collection, group and preset names). "New category" uses the add icon instead of a typed "+". (batch 216)

## [0.3.0] - 2026-10-08

### Added
- `strings` props on 14 components for their words and announcements (CodeBlock, Count `moreThan`, Button, Card,
  WidgetGrid, BulkActions, NotificationList, MediaViewer, SearchWorkspace, NavList, FilterBar, AppShell, SecondaryPane,
  Pagination); `locale` where numbers are formatted (they follow the page language). English output is unchanged.
- Chat.Thread `follow`: opens at the newest message and keeps it in view as messages arrive.
- tests/keyboard.test.js (in `npm test` and CI) and tests/compare.js (before/after pixel comparison of two copies).

### Fixed
- Keyboard: Toolbar and ToolRail are one Tab stop (roving focus); Rating moves focus to the chosen star; the application
  switcher closes when focus leaves it; focus rings on Panel and SectionHeading toggles, DropZone, Rating and Pagination;
  the chat thread is reachable by keyboard. (batch 213)
- Screen readers: CodeBlock announces Copied or Could not copy; a capped Count says "More than 99"; a selected Card is
  aria-current. (batch 213)
- Right to left: arrow keys follow reading order (Toolbar, Tabs, SegmentedControl, Rating, Tree, MediaViewer, WidgetGrid,
  splitters); ButtonGroup joins, the Switch knob, the toast and the indeterminate progress mirror; directional icons
  (chevrons, arrows, panel open and close, undo and redo) mirror. (batch 214)
- Thumbnail and Avatar fall back to the icon or initials when their image fails to load. (batch 215)
- Font sizes are rem (the same at the default 16px), so text follows the person's font-size setting (WCAG 1.4.4). (batch 215)
- Object / record page: the aside stacks under the body below 1024px. (batch 215)
- Accessibility (axe-core, WCAG 2.2 AA): 418 issues to 3 on 140 pages. The calendar month is a labeled group of day
  buttons named by full date (no broken grid roles); WidgetGrid's live region sits beside its list; a Table (and a
  design system table) that scrolls is a named region in the Tab order, with the focus ring; design system state
  samples set ARIA states only where the role allows them. (batches 211, 212)

### Changed (visual)
- The drawer slides in from its edge (motion tokens; none with reduced motion). A Preview button shows a hover fill.
- SearchWorkspace's result count uses the item noun ("8 assets", not "8 results").
- Sentence case: "Add event", "Add task", "Save as", "Zoom in", "Zoom out". (batch 215)
- Link text (`--plx-sys-content-link`, light theme) is blue-600 instead of blue-400: 6.04:1 on the canvas (was 4.46).
  Primary buttons and the header keep blue-400. (batch 212)
- Subtle text (`--plx-sys-content-subtle`, light theme) is gray-700 instead of gray-600, as `content-muted`. (batch 212)
- The app name in the header is full white at 11px (was 70% white at 10px); the time on your own chat messages is full
  white. (batch 212)
- Suite data: tinted avatars use the tone's darker shade for initials (blue-700, brown-800). (batch 212)

## [0.2.0] - 2026-10-08

### Added
- TypeScript definitions for `@plenix-ds/react` (`index.d.ts`), generated from each component's header comment: prop
  unions (`variant`, `size`, `tone`…), booleans, handlers and React nodes, with the header text and defaults as docs.
- API: `/api/v1/components` items carry their written sections (`purpose`, `anatomy`, `behavior`, `a11y`, `content`)
  and `sec`, `plenix`, `src`. The tokens endpoint lists the new Button tokens (630 tokens).
- `VERSIONING.md` (what is public, what each version part means) and this changelog; release notes come from it.
- Checks on every push: build, system and spec checks, release build, the Button visual snapshot, every page, and an
  accessibility scan (axe-core) whose known issues may only go down.
- 115 Button component tokens (`--plx-comp-button-*`): per size, per variant and state, focus ring, shape and type. Every
  Button value is now a token; the design system's Edit dialog edits one token per field. (batch 207)
- Design system: purpose, anatomy, behavior, accessibility and content guidance for all 125 built items; template
  references (which apps use each item); related items for the foundations. (batch 208)

### Changed
- `button.css` uses only Button tokens; each size sets all of its own values. No visual change: 218,118 computed values
  compared, 0 differences. (batch 207)
- Design system: "Use in code" names the packages (`@plenix-ds/react`, `@plenix-ds/styles`). (batch 208)

## [0.1.0] - 2026-10-08

### Added
- The first release: `@plenix-ds/tokens` (515 tokens), `@plenix-ds/icons` (104 icons), `@plenix-ds/styles`
  (`plenix.css`, fonts, theme boot) and `@plenix-ds/react` (112 exports) on GitHub Packages.
- The CDN at https://design-system.lighthouseway.org/cdn/0.1.0/ and the JSON API at /api/v1/ (tokens, components,
  exports, taxonomy, guidance, icons). (batch 206)
