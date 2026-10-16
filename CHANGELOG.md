# Changelog

All notable changes to Plenix: the packages (`@plenix-ds/tokens`, `icons`, `styles`, `react`), the CDN and the API.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow `VERSIONING.md`.
The batch numbers point to the work log (Plenix - DAM/audit/batches/).

## [Unreleased]

## [0.47.0] - 2026-10-16

### Added
- TypeScript declarations on the CDN (#130): every version ships `plenix.d.ts` beside `plenix.esm.js`, listed in
  `bundle-manifest.json` and included in the tgz; the build fails when a public export has no declaration.
- QuickFilter `required` for single-choice filters (#131): no All option and no clear; the first option is the value
  when none is set, and a saved view restores it.
- The command bar folds its quick filters (with their counts) and end controls into More as it narrows (#132).
- MediaCard `aspect` "9/16" and "3/4" (#133); mixed shapes in a grid keep their footers aligned.
- MediaViewer shows video items; MediaPlayer `audio` plays a separate sound track in sync with the video (#134).

## [0.46.0] - 2026-10-16

### Added
- Range selection in card grids (#51): `MediaCard.onSelectChange(checked, event)` now passes the click, so a grid can
  hand it to `useSelection().choose(key, event)`: a click toggles a card, Shift extends from the last one picked, Ctrl
  or ⌘ toggles one. FileBrowser's grid and the Asset Manager's search grid use it.
### Changed
- FileBrowser's grid selection runs on `useSelection` (the shared selection model). RowButton (a native button) and Tree
  (its own roving tree focus, the ARIA tree pattern) already follow the shared focus rules and keep their code.

## [0.45.1] - 2026-10-16

### Fixed
- NavList: a static group heading (`collapsible: false`) has the collapsible heading's geometry: 32px tall (the
  prominent control height), its text centered, 8px under it (#49; it was 25px with nothing under it). Tokens
  `--plx-comp-nav-list-heading-min-height`, `--plx-comp-nav-list-heading-margin-block-end`.

## [0.45.0] - 2026-10-16

### Changed
- `SplitWorkspace` is built on `SplitView` (it was MasterDetailPage under another name): the list and the chosen item
  share the page, side by side or stacked, with the divider between them. The list is `rows` and `columns` (a
  DataTable) or `pane` (framed as a ReadingPane titled `paneTitle`); the item is `children` in a ReadingPane while
  `detailOpen` (now default true), else `empty` (default: an EmptyState, "Nothing selected"); new props `actions` (the
  reading pane's actions row), `toolbar` (a CommandBar above both), `orientation`, `defaultSize`, `size`,
  `onSizeChange`. Apps to check: `onBack` is no longer used (both panels show at once; under 900px they stack).

## [0.44.0] - 2026-10-16

### Added
- `Heading` (GitHub #56): the title of a page (`level={1}`, 20px bold) or a section of it (levels 2–4: 18, 15, 13px
  semibold; 5 and 6 draw like 4), in the heading font. The level is the outline (it renders h1–h6); `size` changes only
  the look. Tokens `--plx-comp-heading-*`; classes `plx-heading`, `plx-heading--size-1…4`. The design system's Heading
  page shows it beside SectionHeading (the small uppercase group label).

## [0.43.0] - 2026-10-16

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

## [0.42.1] - 2026-10-16

### Fixed
- Task priority in the Dashboard and Tasks: the word is the row's 12px secondary text (it was 13px beside 12px titles and
  dates) and sits on the row's baseline (it was 3.75px off); the icon is centered on the word. Found by Codex.
### Added
- Utility plx-u-self-center (align-self: center), beside plx-u-self-start and plx-u-self-stretch.

## [0.42.0] - 2026-10-16

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

## [0.41.1] - 2026-10-16

### Fixed
- The applications' page bundles carry the status-dot change of 0.40.1 (bookmarks, calendar, contacts, files, messages,
  notes, projects and settings had kept their earlier bundles).
### Added
- Codex task #124: the palette to 70 colors (the owner's revised proposal, docs/color-consolidation/).

## [0.41.0] - 2026-10-16

### Added
- SplitView and ReadingPane (02 Page structures › Split workspace; owner, 2026-10-16): two panels that share their room,
  `orientation="side-by-side"` (default) or `"stacked"`, both the full height (or width) of the page, each scrolling on
  its own; the divider between is the whole gap (a thin line down its middle and a pill centered on it, the resize
  pointer anywhere along it; arrow keys, Home and End); side by side stacks under 900px of its own width. ReadingPane:
  the data table's frame, an actions row with a thin line under it that stops short of the edges, the item below.
  Tokens: platform/tokens/components/split-view.tokens.json. Design system: Split view, with Side by side and Stacked.
- docs/reading-pane-study: the Outlook-style demo on SplitView, two pages and no switches (index.html side by side,
  stacked.html stacked).
### Removed
- The size menu (Narrower, Wider, Reset, Collapse) on Resizable and PanelSplitter, also for touch (owner, 2026-10-16):
  edges are dragged or moved with the keyboard. Its tokens (resizable-menu-*, panel-splitter-menu-*) are gone;
  PanelSplitter's `defaultValue` prop is no longer used. Apps to check: none used the menu directly.

## [0.40.8] - 2026-10-16

### Fixed
- docs/reading-pane-study: the divider's pill sits on the middle line of the gap (it took the offset of Resizable's own
  hover line and sat against the reading pane's border).

## [0.40.7] - 2026-10-16

### Changed
- docs/reading-pane-study: the divider follows reui.io's Resizable (owner's examples, 2026-10-16): a 1px line the full
  length of the gap and an 8 x 32px rounded pill centered on it, in the table's border color; the whole gap is the
  target with the resize cursor; the pill darkens on hover; line and pill take the focus color when focused or dragged.

## [0.40.6] - 2026-10-16

### Changed
- docs/reading-pane-study: the divider is the whole gap between the panes (owner, 2026-10-16, option B): the resize
  cursor anywhere along it, and a grip of three solid 4px dots in its middle, the strong border color at rest and the
  focus color while hovered, focused or dragged.

## [0.40.5] - 2026-10-16

### Fixed
- docs/reading-pane-study: the thin line under the reading pane's actions shows (it took a border-width role that does
  not exist, so it was 0px); it uses the table's border width and stops 16px short of each edge.
- The local preview server no longer stops after 15 minutes (.claude/launch.json lifts the test time limit for it).

## [0.40.4] - 2026-10-16

### Changed
- docs/reading-pane-study (owner, 2026-10-16): the divider is a handlebar, after prototypr's "Handlebars in UI design": a
  pill in the middle of the gutter, no line; only the handle grabs (16 × 48), the drag then follows along the axis, and
  the list snaps to set widths (360–720px) or heights (200–500px); the handle darkens on hover and takes the focus color
  when focused. The reading pane's actions sit in their own row with a thin line under them, inset from the pane's
  edges.

## [0.40.3] - 2026-10-16

### Changed
- docs/reading-pane-study, after the owner's review (2026-10-16): the table and the reading pane fill the window's height
  and match it, each scrolling on its own; a divider between them resizes (a line with a grip, the focus color on hover
  and focus; drag, arrow keys or the size menu); stacked, both are the full width; the reading pane takes the table's
  frame (its border, corners and width tokens); the command bar spans both panes, as Outlook's ribbon does.

## [0.40.2] - 2026-10-16

### Added
- docs/reading-pane-study: an Outlook-style layout drawn live with Platform components (owner, 2026-10-16): the header
  row, the navigation pane, a table, and the selected item's reading pane, with Outlook's switches (reading pane
  right, bottom or off; one-line or two-line rows) and the pane going under the list when there is no room. A study for
  the owner, not a Platform part yet.

## [0.40.1] - 2026-10-16

### Changed
- No status dots left in the applications (owner, 2026-10-14: a status is never a dot). By its place: the Asset
  Manager's status bar says "Library online" with the success icon; the current version in the inspector has a
  "Current version" badge with its icon; task priority (Tasks, Dashboard) is its icon and a short word ("High",
  "Medium", "Low"); a project's status in the navigation pane is its status icon with the status spoken. Shapes on
  avatars (presence) stay.

## [0.40.0] - 2026-10-16

### Added
- By Codex (PRs #113–#116; CI blocked by billing, checked by the integrator):
  - Wave 15 B: content lint, browser support, implementation records, the ActionBar extension; packages
    `@plenix-ds/vue` (typed bridges) and `@plenix-ds/lint` (ESLint and Stylelint adapters with the Plenix rules).
  - Wave 15 C: i18n (LocaleProvider, useLocale, createTranslator; dates no longer read as UTC), content guides,
    performance budgets; packages `@plenix-ds/web-components` (custom elements) and `@plenix-ds/mcp` (a read-only MCP
    server over the tokens and records).
  - Command bar (RedSave #20, #21, #23, #24): `actions[].loading`, `actions[].tooltip`, `sticky="auto"` by default (sticky
    only as a direct child of the page content), `actions[].panel` (a small form in a popover).
  - Developer experience (RedSave #13, #17, #18, #19): a development warning for unknown variant, tone and size values;
    the changelog, per-record docs and tokens.json on the CDN; platform/dev/token-check.js.
### Changed
- CommandBar: `sticky` defaults to "auto". A bar inside a card no longer sticks to the page; a page-level bar still does.

## [0.39.0] - 2026-10-16

### Added
- Card and Panel: `surface` ("flat" default, "glow", "inset") and `elevation` ("outline" default, "halo", "lifted",
  "floating"), in any combination (owner, 2026-10-15, the card builder). Halo, Lifted and Floating have no visible
  border and an even shadow with no offset; Glow fades the surface to a rim one step off it; Inset draws a soft 12px
  inner edge. New theme roles: shadow-halo, shadow-floating, card-surface-rim (gray-100; dark gray-900).
- Design system: the card builder on the Card page (choose a surface and an elevation; the card states its makeup,
  "Surface: Glow, Elevation: Halo"), every surface, every elevation, and all twelve combinations; Panel shows its
  surfaces and elevations.

## [0.38.0] - 2026-10-16

### Added
- Library wave 13, lane A (Claude): ProductCard and ProductPrice, ProductOptions (sizes, color swatches, quantity), and
  the Commerce templates (discovery, listing, detail, cart, checkout, payment form UI only, confirmation, orders,
  subscriptions, returns), each claiming its page kind.
- By Codex (PRs #102–#106, #109–#112, checked by the integrator; CI blocked by billing):
  - Wave 12 B: AssetGallery, DownloadManager, MediaPlayer, MetadataEditor, RelatedAssets.
  - Wave 12 C: AttachmentPicker, FilePicker, RenditionList, DocumentViewer, VersionHistory.
  - Wave 13 B: Comment, CommentThread, ImageAnnotation, PresenceBar.
  - Wave 13 C: MentionInput, Announcement, AuditLog, ApprovalWorkflow.
  - Wave 14 B and C (AI parts, existing roles and the sparkle icon only, no AI color): AILabel, GeneratedContent,
    PromptHistory, Citation, SuggestedAction, AISearch, Recommendation, AIButton, AIDisclaimer, ConfidenceIndicator,
    AIExplanation, PromptSuggestions, SuggestedEdit, RefineMenu, Thinking states.
  - DataTable (RedSave DT-1, 2, 3, 4, 9, 11, 17): a default sort, a visible row menu button, documented row-menu items,
    remembered views, text direction per cell, hidden selection counted, clicks on controls inside rows ignored.
- Native designs for all of them.
### Changed
- The other applications use the command bar (Codex, #110); the Asset Manager's Search workspace moved off BulkActions,
  which is deprecated (use CommandBar's selection state) and stays exported for one release (#109).

## [0.37.0] - 2026-10-16

### Added
- Library wave 12, lane A (files): FileList (list, table, sortable; rename, delete, drag onto folders with a Move to
  menu as the way without dragging), FileBrowser (breadcrumbs, the command bar, a tree in a resizable pane, list or
  grid, drop files from the computer to upload), UploadManager and useUploadQueue (type and size checked first, a few
  at a time, per-file progress and Cancel, Try again; panel, docked or dialog), VersionCompare and diffLines (side by
  side, slider, text diff with Previous and Next change).
- MediaCard: `type` and `typeIcon` (the format), `status` (a Badge with its icon), `stack` and `count` (a collection).
  Without them a MediaCard is unchanged.
- Native designs: iOS Outline views and Split views; Android Tree and Data table.

## [0.36.0] - 2026-10-16

### Added
- Library wave 11, lane B (built by Codex, #31, PR #99): ShareDialog (people, link, roles, Web Share), PermissionsEditor
  (roles × capabilities, per person), Tour (steps, skip, resume), Checklist, Onboarding (welcome, setup checklist),
  FeatureIntro (new badge, what's new), HelpPanel (search, articles).
- Library wave 11, lane C (built by Codex, #32, PR #100): ImportDialog, ImportWizard, ExportDialog, AccessRequest,
  TrialUpgrade, Offboarding, ShortcutsDialog (on the existing hotkey list).
- Native designs for both lanes.

## [0.35.0] - 2026-10-16

### Added
- Library wave 10, lane C (built by Codex, the pilot's first pull request, #4): Wizard and WizardDialog (linear or free
  steps, a summary step), FormFlow (create and edit in a dialog, a page, in place or a drawer, with the unsaved-changes
  guard), Autosave, SaveStatus and useAutosave (one write at a time; offline retry), DraftState, SaveAs, ArchiveRestore.
- Native designs: iOS Feedback; Android Step flow, Form, App state; Archive and Restore added to Android Confirmation.
### Changed
- Native designs merge by adding variants to a page that exists, never replacing another task's (tools/agent/native/merge.js).
- Codex's next tasks: tools/agent/tasks/31-w11b.md and 32-w11c.md.

## [0.34.0] - 2026-10-16

### Added
- Library wave 11, lane A (accounts and files): File (file or folder, as a line or a chip, by type icon, with size; a long
  name is cut before its extension), FileRow and FileRowList (selected, progress, actions; rename and delete through
  RenameAction and DeleteFlow), Auth (SignInForm, SignUpForm, PasswordResetForm, MfaChallenge, SsoButtons,
  AccountRecovery), SessionTimeout and useSessionTimeout (an alert dialog; the time left said at 60, 30 and 10 seconds),
  RoleManager (roles list and detail; the owner role keeps its last member), ConnectedAccounts (connect lists the scopes
  first; disconnect asks).
- Native designs: iOS Managing accounts and File management; Android Sign-in and account.
### Fixed
- Design system: "All roleses" — a title already in the plural (Roles) keeps its plural.

## [0.33.1] - 2026-10-16

### Changed
- AppHeader: the pinned-app links leave the header when the header itself is narrower than Wide (840px), not the
  screen (owner, 2026-10-15, GitHub #27). In a split view, an embedded page or a panel the header no longer crowds;
  search spans the bar. Apps to check: none need changes; the class `plx-app-header--compact` marks the state.
- docs/touch-options records the two decisions (the pane's size menu with touch: no change).

## [0.33.0] - 2026-10-16

### Added
- Library wave 9, lane C: Sparkline, Metric card, LollipopChart, ScatterChart (and bubbles), FunnelChart, Treemap,
  GanttChart, GeoMap (and choropleth); the chart accessibility rules (`summarizeSeries`, `ChartPatterns` textures).
- `useChartPoints`: the standard chart interaction for charts of separate marks (steps, tiles, regions, points): one
  Tab stop on the plot, the arrow keys, each value said; every chart now reads the same way with the keyboard.
- Native designs: the new chart kinds on the iOS and Android Charts pages.
- docs/touch-options: the two open touch decisions drawn as options (the pane's size menu with touch; the AppHeader's
  links in a narrow header), for the owner.

## [0.32.0] - 2026-10-16

### Added
- Library wave 10, lane A (drag and drop): the dnd engine (`useSortable`, `useDraggable`, `useDropTarget`,
  `useReposition`; pointer, pen, touch and keyboard: Space/Enter picks up, arrows move, Space/Enter drops, Escape
  cancels; every move announced; auto-scroll near edges), DragHandle, SortableList (vertical, grid, handles, move
  buttons, between lists), DropZone data drops (`onDropItem`, `accepts`, a refusing state), Resizable (with a size menu
  for resizing without dragging; PanelSplitter moved here, still exported from AppShell), RenameAction (inline and
  dialog; F2; selects the name before the extension).
- Library wave 10, lane B (record flows): DeleteFlow (confirm, type to confirm, undo, move to trash), DuplicateAction
  (copy at once with Undo, then rename), Publish (draft, scheduled, published; schedule; unpublish with Undo),
  ReviewFlow and ReviewQueue (approve, request changes, reject with a reason; human review), AssignControl (assign,
  reassign, delegate with dates), WorkflowStatus.
- Native designs: iOS Drag and drop, iOS Undo and redo, Android Gestures (drag), Android Confirmation.
### Changed
- Versions follow semver from this release on (owner, 2026-10-15, RedSave #27): new or rewritten components raise the
  minor version, fixes the patch version; a rewrite is listed here under "Changed" with what an application must check.
- Agents find their task briefs in tools/agent/tasks/ (AGENTS.md › Finding your work); the plan of record is pinned
  issue #3 on GitHub, one issue per task.

## [0.31.74] - 2026-10-15

### Added
- The Claude + Codex pilot (owner, 2026-10-15): several coding agents each own one task, coordinated through GitHub
  (one issue, one branch, one pull request). AGENTS.md holds the rules every agent reads; the issue form "Agent task"
  and the labels agent:codex, agent:claude, agent-task and needs-owner assign the work.
- tools/agent/generated.js: the one list of generated files. CI fails a pull request that commits one (they are rebuilt
  at merge, so parallel pull requests never conflict on them).
- tools/agent/lane-overlay.js: a branch keeps its design-system files under lanes/<task>/design-system/; the overlay
  copies them into the design system for the build, the checks and CI.
- tools/agent/take-pr.js: the integrator's merge of a pull request (source files only, design-system files into the
  design system's repository, files changed in main reported).
### Changed
- The pull request template asks for the files, the checks, what was left undone and what needs the owner.
- The test runner's changed mode counts a lane's design-system files where the overlay copies them.

## [0.31.73] - 2026-10-15

### Changed
- The palette consolidation (owner, 2026-10-15; docs/color-consolidation/): one canonical palette of 83 colors in 12
  families named by their tokens (Gray, Red, Pink, Magenta, Orange, Brown, Yellow, Green, Teal, Cyan, Blue, Purple).
  27 canonical colors added (among them green-150 #bfef45 and yellow-175 #ffe119); 162 theme references moved to their
  canonical tokens.
- Categories keep their names and roles (`--plx-sys-category-<name>`, `-soft`, `-soft-border`, `-on-soft`); every role
  now points to a canonical token, and some categories share soft shades. A component reads a color by its token name.
- Design system: the Color page groups the canonical palette in the 12 families; the Tag page's category table reads
  each role's token from the theme; a bulleted list card on the List page.
- docs/palette.md and docs/pills-and-colors.md regenerated from the tokens.
### Deprecated
- The 83 retired palette tokens (the `--plx-ref-color-category-*` primitives and the near-duplicate shades) stay one
  release as aliases of their canonical destination; docs/palette.md lists each one's replacement.

## [0.31.72] - 2026-10-15

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

## [0.31.71] - 2026-10-15

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

## [0.31.70] - 2026-10-15

### Added
- Library wave 8 (26 leaves):
  - Chart parts (platform/charts/parts): Axis, GridLines, ChartLegend (under, beside, interactive), ChartTooltip
    (single, shared), DataLabel, ReferenceLine (and thresholds), ChartAnnotation (point, range); ChartFrame `legend`.
  - FeatureCard and UserCard (Profile card).
  - VirtualList (fixed, variable, grouped rows; sticky headers; load on reaching the end).
  - Carousel (one or several per view, dots, arrows; autoplay off by default, with Pause, paused under reduced motion).
  - PeopleGroup (Team, Group) and PermissionSummary.
  - QueryBuilder (rules, and/or groups up to 3 deep, a text view), on the Filter panel's condition model.
  - RoleLabel (the Tag look; never a status color), SearchResult and SearchResultGroup (`highlightMatches`),
    ResourceList (Object list), Timeline, and Card `expandable`.
- Each has its spec page, an "All" lab, a page per variant, and its native counterparts (new designs: Android Carousel,
  Search screen, Activity feed, Label; iOS Searching; chart parts in the Charts designs).
### Changed
- The Filter panel no longer claims the Query builder leaf (QueryBuilder has its own page).

## [0.31.69] - 2026-10-15

### Changed
- The command bar swaps on a selection (owner, 2026-10-15; Microsoft 365): one bar of one height, the table never moves.
  With rows selected, the page's actions, the search and the filters give way to the selection's commands (Delete
  last); Sort, Group, Columns and View stay where they are; the bar ends with "× N selected", which clears the
  selection (Escape in the bar does too). The swap is announced. The count stays in the bar.
  New: `CommandBar selection={{ count, actions, onClear, noun, plural, label }}`. **Breaking:** `layout="split"` (a
  separate action bar) is retired and draws one bar (many actions fold into More); the selection bar under the bar
  (BulkActions as `selection`) is replaced by the swap.
- BulkActions is for pages without a command bar.
- The Asset Manager's home page uses the swap (categories, a category's assets).
- DataTable: floating scrollbars. The table body's scrollbars float over the rows and take no room, so Tabulator no
  longer writes a margin on the header row (the off-grid 10px). Thin thumbs (the Platform's scrollbar color), shown
  while the pointer is over the table or focus is in it; drag a thumb or press its track. Browsers without
  scroll-driven animations and anchor positioning keep the thin native bars.
### Fixed
- DataTable: the select-all checkbox no longer moves on hover. The header's hover reserved room for a filter or menu
  button in every column; the select column has none, so its checkbox shifted and shrank. It now reserves nothing.
- DataTable selected rows (light theme): blue-200; a selected row under the pointer: gray-100 (owner, 2026-10-15). No
  border around selected rows (fill only, as the standard systems do; the outline stays the focus indicator).

## [0.31.68] - 2026-10-15

### Added
- Library wave 7 (29 leaves):
  - Calendar: month or two months, a range highlight, week numbers, unavailable dates, min and max; a one-Tab-stop
    grid with arrows, Home and End, Page Up and Page Down.
  - DatePicker: one date, a range, date and time, presets; typed dates or the calendar in a popover (Alt + Arrow Down).
  - CountrySelect: countries, locales and languages, named by the browser (Intl.DisplayNames); flags are optional.
  - ProgressSteps: the stepper, horizontal or vertical, clickable, with complete, current and error steps, and a
    compact bar.
  - Tabs `orientation="vertical"`.
  - AppHeader `back` and `title`: the mobile app bar.
  - MillerColumns: columns, a preview column, resizable, checkboxes.
  - Cascader: built on MillerColumns; click, hover, search, multiple.
  - EntityPicker: people, teams and records, one or many.
  - TimePicker: a list or segments, 12- or 24-hour, any step.
  - RelativeDateInput: past and future presets and "n units".
  - LoadMore: a button or infinite (as the end comes into view).
  - ImageUpload with ImageCrop, and AvatarUpload.
  - Chart foundations (platform/charts): scales (linear, log, band, time; niceTicks; seriesColor on the data-viz scales)
    and ChartFrame (title and description as the chart's name, measured size, a "Show the data" table). The base for
    the chart waves.
  - TimeZoneSelect (by region or offset; offsets in DM Mono), TreeSelect (one or many, tri-state branches, search; a
    bottom sheet when narrow), TransferList (two lists, search, ordered target, virtualized), BottomSheetNav.
  - Spec records for NavPane's mobile forms: bottom navigation, mobile tab bar, mobile drawer and menu, navigation drawer,
    adaptive navigation.
- Each has its spec page, an "All" lab, a page per variant, and its native counterparts (new iOS designs: Column views,
  Image wells, Token fields, Charts; Android: File and photo pickers, Charts).
- build-exports.js publishes platform/charts/ (scripts and stylesheets).

## [0.31.67] - 2026-10-15

### Changed
- The Asset Manager's home page (categories, collections and a category's assets) and the Files screen are on the
  command bar: the page's action at the start; search, Filter and the app's quick filters (Category, Type, Tags);
  Sort, Group, Columns and View; the count at the end; the selection bar under it. The old toolbar's filter dialogs,
  Sort menu, view switch and card-size switch are replaced by the panels and the View menu.
- Badges use the six status variants by name everywhere (neutral, success, active, waiting, action-required,
  negative); "In progress" is active and "Not started" and "Archived" are neutral.
- Badge `icon`: a status icon inside the badge, before the text. EntityHeader's live state is a small status badge with
  its icon instead of a dot (`live: { tone, icon, label }`); Notes shows "Saved" with a check and "Unsaved changes"
  with a pencil. The Asset Manager's status choices are badges with icons.
### Removed
- Token `entity-header-live-status-dot-margin-inline-end`.

## [0.31.66] - 2026-10-15

### Changed
- Count: the pill is soft, as every pill (shade 100 background, shade 300 border, dark text, 4px corners). Its tones
  point to the status pill roles: neutral, info (active), success, warning (waiting) and danger (negative).
- Tabs `variant="segmented"` takes SegmentedControl look A: joined segments at the button control height, the selected
  tab in the selected-state blue tint with blue text. The gray track and the raised segment are gone.
  Tokens: `tabs-segmented-list-background`, `-list-radius`, `-list-padding-block`, `-list-padding-inline` and
  `-tab-selected-shadow` are removed; `tabs-segmented-tab-*` follow the `segmented-*` tokens.

## [0.31.65] - 2026-10-15

### Added
- CommandBar (owner's command bar standard): one white framed bar fixed at the top of the content; layouts `one`
  (actions left, find and view right), `split` (many actions: an action bar over the find bar) and `view` (no actions).
  Ghost buttons; icon and label when the bar fits, icons only with tooltips when it does not, then actions fold into
  More actions from the end (danger last). Sort, Filter, Group, Columns and View are never merged.
- Find panels: FilterPanel (Where / and / or, operators by field type, condition groups), SortPanel, GroupPanel
  (subgroups, collapse and expand all), ColumnsMenu and ManageColumnsDialog (reorder, show and hide, first column),
  ViewMenu (layout, card size, row height), QuickFilter (searchable checklist, date presets and range).
- utils/fields.js and hooks/useCollectionView.js turn the panels' state into DataTable props.
- DataTable props `filter`, `sort`, `groupBy`, `columnOrder`, `hiddenColumns`; a header chevron opens the column menu.
- SearchField `width="bar"` (240px) and `width="fill"`; `collapsed` turns it into an icon that opens across the bar.
### Changed
- BulkActions is the selection bar under the command bar: actions, Select all, Clear, and "N selected" at the far end;
  every action always shows, disabled with a reason until it applies (`actions[].disabled`, `actions[].why`).
  **Breaking:** `strings.selected` is now the template `'{n} selected'`.
- Button caret: the thin chevron (expand_more) in the muted color.
- DataTable: no view button by default; row height comes from the View menu.
- Group-by icon: view_agenda.

## [0.31.64] - 2026-10-15

### Added
- Yellow (waiting, paused) and orange (action or correction required) reference scales, and soft 100/300/700 shades
  for the 20 category colors (owner's approved values; docs/pills-and-colors.md).
### Changed
- Pills (owner): every pill is soft, a shade-100 background, a 1px shade-300 border, dark text of the same family and
  4px corners. Badge has six status variants: neutral, success, active, waiting, action required, negative (info,
  warning and danger still work as active, waiting and negative). Tags and categories use their own soft category
  colors, never the status variants.
- Warnings are orange and "away" is yellow; brown is no longer used for any status.
- SegmentedControl: a bordered group of joined segments; the chosen one takes the selected tint.
- Projects: Active, Paused, Completed and Archived use the active, waiting, success and neutral variants.

## [0.31.63] - 2026-10-14

### Added
- DataTable (owner, studied from Airtable):
  - Row height per table: Short (the density's row), Medium 56, Tall 88, Extra tall 128; record rows only; equal minimum
    padding; top-aligned and clamped in tall rows, middle in Short rows; wrap columns clamp instead of growing rows.
  - Airtable-style grouping: a 48px group header (chevron, the grouped-by field as an eyebrow, the value drawn as its
    column draws it, the count in Mono), a 24px gap, sticky headers, nested groups, the grouped column tinted gray,
    treegrid keyboard; summaries and an add row per group, off by default. Grouped tables stay virtual.
  - Column headers: a type icon (hidden in Compact), Wrap headers as an option.
  - The column menu in sections: app field actions, sort by type (A → Z, 1 → 9, Oldest → newest), Filter by and Group by
    this field, width and position, Hide.
  - New size tokens 88px and 128px; 7 icons from Material Symbols Sharp, unedited.

## [0.31.62] - 2026-10-14

### Added
- RichTextEditor has every Tiptap format (owner): headings 1–6, quote, code block, horizontal rule; bold, italic,
  underline, strikethrough, inline code, subscript, superscript; font family and size, text color and highlight (any
  color: the person's content is their own); alignment; bulleted, numbered and task lists; links, images and tables;
  smart typography. Tiptap's own keyboard (Tab nests list items and moves between table cells; Esc then Tab leaves). 16
  icons from Material Symbols Sharp, unedited. Saved HTML keeps only color, highlight, font, size and alignment styles.
### Changed
- Text fields are white (owner): the search field takes the control background like every field; read-only fields
  stay gray, the "filled" appearance stays an option, and the search in the blue header stays blue. A new check
  (check-system.rules/field-background.js) fails any other text field background.
- The style checks exempt only the user-format properties inside rich-text content (plx-user-content).

## [0.31.61] - 2026-10-14

### Changed
- RichTextEditor runs on Tiptap 3.31.3 (MIT; StarterKit, Link, Mention), vendored as one file
  (platform/vendor/tiptap, 132 KB gzipped, licenses recorded) and loaded only when an editor is on the page. The API,
  toolbar, shortcuts, Markdown shortcuts, plain-text paste, links, mentions and states are unchanged; the Backspace
  marker is gone. Later: tables, editing together (Yjs) and embeds.

## [0.31.60] - 2026-10-14

### Added
- DataTable modes for many rows (owner): `mode="fill"` (the default: the table fills the space left on screen and
  draws only the rows in view; a table without a height is fast too), `"pages"` (25, 50 or 100 rows per page with a
  footer: range in Mono, rows per page, Pagination) and `"load-more"` (more rows near the bottom, a Load more button,
  announced). Pages and load-more also work with server data through `fetchRows({ page, size, sort, filters, search })`.
  5,000 rows: first rows in 0.28–0.34 s (was 1.8 s), 50–80 rows drawn (was 5,000).
### Changed
- SearchField recent searches have a remove button on each row (the WAI-ARIA combobox with a grid popup): arrows move
  between the term and its remove button; Delete still removes; Clear all stays.

## [0.31.59] - 2026-10-14

### Changed
- Owner decisions (2026-10-14):
  - DataTable re-measures its column widths when the density changes (columns only; widths stay on the grid);
  - Back to top uses the up arrow (new icon arrow-up);
  - the rich text toolbar is icons (bold, italic, link, numbered list, heading, quote, code; new from Material Symbols
    Sharp, unedited), each with its shortcut in a tooltip;
  - one Backspace after a Markdown shortcut or inline code removes the character (undo still works);
  - the kept choices of waves 5 and 6 are written as rules in their docs.

## [0.31.58] - 2026-10-14

### Added
- The complete library, wave 6, lane C (8 inventory items) — wave 6 complete:
  - Toggle button pages (every variant, on and off);
  - Combobox: async loading (spinner, results announced, stale answers dropped) and checkbox or radio marks;
  - Slider: a range with two thumbs that never cross, and tick marks;
  - Inline edit (text, text area, select; Enter saves, Escape cancels; never link-styled);
  - Rich text editor (basic or full toolbar, Markdown and keyboard shortcuts, plain-text paste, links, mentions; no
    new dependency).

## [0.31.57] - 2026-10-14

### Added
- The complete library, wave 6, lane A (11 inventory items):
  - Fieldset: a row layout and a hidden legend (field group, legend pages);
  - Error summary (focus on appear, a link per error to its field);
  - Input group (prefix, suffix, icon, joined buttons or selects in one field border);
  - Number input (locale parsing, currency, percent and unit formats, steppers, a quantity selector, full keyboard);
  - File input (the native picker drawn as a button, a file list with sizes and Remove);
  - Code editor (coloring, line numbers, Tab indents, Escape then Tab leaves; no new dependency).

## [0.31.56] - 2026-10-14

### Added
- The complete library, wave 6, lane B (12 inventory items):
  - Form (one or two columns, named sections, sticky actions);
  - Field: a character counter ("42/60", invalid past the limit, announced);
  - Input, Textarea and Select appearances: outline, filled, underline; a Textarea that grows to 10 lines; the
    read-only field page;
  - One-time code input (typing, Backspace, arrows, paste and the device's code autofill);
  - SearchField suggestions (the match in bold, announced) and recent searches (useSearchHistory).
### Fixed
- Sidebar group labels of titles already in -es ("All recent searches").

## [0.31.55] - 2026-10-14

### Changed
- CI runs the labs in three parallel parts, so a change to a shared component no longer runs out of time (0.31.52).

## [0.31.54] - 2026-10-14

### Added
- The complete library, wave 5, lane C (12 inventory items):
  - Command menu (a filterable list of commands, groups, nested pages, shortcuts shown) and the Command palette (Ctrl K);
  - Download button (format and size, progress while downloading) and Back to top (floating or inline);
  - Dialog: non-modal (no veil, F6 between dialog and opener), the Prompt dialog (one field, validated on submit) and the
    full-screen dialog page;
  - Tooltip: rich tooltips (a title, the popover surface) and toggletips (an action, opened by click), a start
    placement; tooltips are placed by CSS anchor positioning.

## [0.31.53] - 2026-10-14

### Added
- The complete library, wave 5, lane B (11 inventory items):
  - Split button, Floating action button (sm, md, lg; extended), Copy button (icon, label, in a field);
  - Menu: radio items, submenus, and the context menu (right-click, long press, Shift+F10 or the Menu key);
  - Details (native disclosure), Print (print.css and usePrint), Spotlight (dim the rest, the target stays usable).
### Changed
- Teaching bubble (owner): filled with the brand blue, with on-brand text and actions; it spotlights its target by
  default.

## [0.31.52] - 2026-10-14

### Changed
- DataTable geometry (owner): row height and cell padding come only from the density (never measured); Tabulator
  measures column widths from the content, rounded up to the 4px grid; columns resize with Tabulator's handle (also by
  keyboard, in size steps) and the widths are kept in the saved view; pinned columns keep Plenix classes.
- Large tables are fast: the wasted full redraw is gone, grids with a height draw only the rows in view (virtual
  rendering; the space for the others comes from classes; aria-rowcount and aria-rowindex; focus kept; printing draws
  every row), and Avatar, MediaCard and Thumbnail images load lazily. 560 rows with avatars: 2.1 s frozen → 0.23 s;
  5,000 rows with a height: did not finish → 0.24 s.
- Every cell's content has vertical alignment: middle, in every density, header and body (horizontal alignment
  unchanged).
- Inline styles (owner): never in HTML or markup; JavaScript (React's style prop included) may adjust on the spot only
  with values from tokens or defined styles, and every length it writes sits on the grid (utils/grid.js: snapToGrid,
  gridPx). check-system rejects hard-coded values in style-writing code; the style audit reports off-grid lengths.

## [0.31.51] - 2026-10-13

### Added
- The complete library, wave 5, lane A (12 inventory items):
  - Popover: a non-modal anchored dialog in the top layer, placed by CSS anchor positioning; click, hover (the hover
    card) or manual; title, close, footer, arrow, sizes; a bottom sheet at Narrow; popup and inline dialog pages;
  - Contextual help (an info button with a small popover, or an inline tip) and contextual education;
  - Teaching bubble (picture, title, step count, actions) and coach marks;
  - Popconfirm (a question with Cancel and the verb; focus starts on Cancel);
  - Mega menu (a disclosure of link columns; an accordion at Narrow).

## [0.31.50] - 2026-10-13

### Changed
- Wave 4 decisions (owner):
  - Barcode is black on white in both themes, as the QR code, so scanners read it;
  - new icons from the set: wifi-off and cloud-off (the offline and degraded states), remove and do-not-disturb;
  - Do not disturb is a fifth presence state (the busy red, told apart by shape): online a check, away a clock, busy a
    solid dot, do not disturb a minus, offline a cross;
  - the retry waits (2 s doubling to 30 s) and the state tones stay as built.
- Sidebar group labels keep acronyms and real plurals ("All QR codes", "All retries", "All presence").

## [0.31.49] - 2026-10-13

### Added
- The complete library, wave 4, lane C (10 inventory items):
  - Status icon (info, success, warning, danger, neutral) and Banner (page or pane, five tones, actions, dismiss);
  - Color swatch with its name, and the Swatch picker with a custom set from the palette;
  - Scrim (modal, light, inverse; contained or over the window) and Loading overlay (spinner or progress, a message,
    cancel; the covered region is busy and inert);
  - Time: timestamp, relative time and date label in Mono, with the full date in a tooltip;
  - the Undo pattern: Toast actions and useUndo.

## [0.31.48] - 2026-10-13

### Added
- The complete library, wave 4, lanes A and B (23 inventory items):
  - Barcode (Code 128, EAN-13, UPC-A) and QR code (levels L to H, versions 1 to 40), each with its own encoder;
  - Section message (Notice with a title, actions and dismiss); error, warning, success, offline, degraded,
    permission-denied, not-found, maintenance and completion states (EmptyState kinds);
  - the Retry pattern (manual or automatic with a growing wait, the attempt count);
  - availability indicator (online, away, busy, offline, each with its own shape), presence on Avatar, Avatar group,
    Profile summary (Persona), Circular progress and Version label.

## [0.31.47] - 2026-10-13

### Fixed
- The data-table test opens collapsed settings cards before it checks their tables (Settings › Documentation, DAM
  Properties); the DAM Transcoding table sits in a static card. 25 of 25 table views pass.

## [0.31.46] - 2026-10-13

### Changed
- Tests run only what changed (owner): `npm test` maps the changed files to the pages, records and labs they affect;
  a change with nothing relevant passes in seconds. `npm run test:full` runs everything. Every test has a hard time
  limit and names the step where it stopped.
- CI on every push runs the quick checks and the changed-only browser tests in six parallel jobs. The full suite is a
  manual workflow, the final gate once everything is complete.

## [0.31.45] - 2026-10-13

### Changed
- Settings pages are built from cards (owner): every section is a SettingsSection card, either static or
  collapsible (Enter, Space or a click; the open state is kept per page). Plenix Settings, DAM System settings and DAM
  My account follow it, and every control matches its design-system page (labeled fields, Select for the header
  color, Sign out as a danger button, data values in Mono). A new check rejects non-card sections, native fields and
  unlabeled controls on settings pages.
- Color groups (owner): Brand, Accent, Semantic, Surface, Text, Border, Interactive and Status roles are defined, all
  pointing at existing palette colors. In dark, the brand is blue-300 with gray-950 on it, and status offline and
  not-started are gray-400.
- Group pages state "Chosen with" in one short line.
- The component labs test runs one size and variant per browser call, so a large lab no longer times out.
### Added
- Every covered library item opens its own page: 21 open their variant page and 208 have their own page with text, a
  live example and code. Ten items not in Plenix yet are listed as needs building.

## [0.31.44] - 2026-10-13

### Changed
- Contrast (owner): every theme pair now passes WCAG AA; the contrast test checks 76 pairs with none pending. Roles
  were remapped to existing palette colors, and no palette value changed:
  - field borders are gray-500 in light and gray-400 in dark;
  - the warning badge is brown-800 and the danger badge red-700, both with white text;
  - in dark, the focus ring and the status marks are their light tints with dark text.
- Links are never buttons (owner):
  - the link-styled button and the "Link button" item are gone;
  - actions use buttons and navigation uses Link;
  - a new check rejects a button styled as a link and a link used as an action;
  - visited links take the standard visited color: #551A8B in light and #d7aefb in dark.
- Section headings take their size from the type scale by level: h2 13px, h3 11px, h4 10px. Settings titles are h2
  headings.
- The design system's page headers draw their icon on a white tile (a new "surface" option of EntityHeader).
- "Open in Figma" (beside Edit) and "New theme in Figma" (Themes page) show where themes authored in Figma will start,
  in a future release.
### Added
- The complete library, wave 3 (33 inventory items):
  - IconTile, Pictogram, Image, Figure, Illustration (empty-state and error drawings), Sticky and Fixed regions;
  - the Brand mark's logo, wordmark and product marks, with the brand rules and their test;
  - Center, Bleed and reorder for stacks;
  - Show and Hide by window class;
  - aspect ratios on Preview;
  - masonry and justified grids, and collapsing columns;
  - theme zones;
  - the one-column and full-screen layouts.

## [0.31.43] - 2026-10-13

### Added
- The complete library, wave 2 (33 inventory items):
  - Link (inline, standalone, external, back), Code, Blockquote, RichText, ordered lists;
  - type styles (display, lead, label, caption, truncation and line clamps, tabular figures);
  - forced colors and more contrast, loading motion;
  - press, focus and selection hooks, gestures, read-only regions;
  - a focus-order overlay, a direction provider;
  - the logical-properties and semantic HTML rules.
- On this page shows one section at a time: choosing a section shows only that section, and "View all", the default,
  shows the whole page.
- New tests: high contrast and reduced motion, focus order, and landmarks and heading order.
### Fixed
- An indeterminate progress bar stays visible when the person asks for less motion.
- The contained Tabs panel's first corner mirrors in right-to-left pages.
- The design-system pages no longer break on states written inside :where() or :is().

## [0.31.42] - 2026-10-12

### Added
- The complete library, wave 1: the foundations and utilities (32 inventory items, 27 new records).
  - Formats: numbers and units, dates and times, currency and percentages, names, addresses and phone numbers
    (utils/format.js, the Formats standard).
  - Live regions (LiveRegion, announce), clipboard (copyText, useClipboard), hotkeys (useHotkey and a registry), and a
    virtualizer that writes no styles (useVirtualizer).
  - The aspect-ratio scale, interaction states (hover, focus, pressed, selected, dragged, disabled; with a lab),
    floating positioning (useFloating), Portal, and an intersection observer hook.
  - Data visualization colors, contrast rules (utils/contrast.js), the layout grid and keylines (with developer
    overlays), scroll lock, accessible descriptions (useDescribedBy), and use of color, which a new system rule checks.
- New tests: contrast of the theme roles (13 pairs pending, may only go down), formats and utilities.

## [0.31.41] - 2026-10-11

### Added
- The complete library, wave 0: every Web inventory item will exist as a real part of Plenix (owner).
  - 49 items another component already answers get their own pages, linked to the main one (records 132 → 181).
  - Parallel lanes now have their own part files: records, labs, docs and sample styles (build-spec-parts.js);
    exports (build-exports.js); a token file per component (platform/tokens/components/); and a native map per lane
    (web-native-map.d). So three writers can build at once without editing the same file.

## [0.31.40] - 2026-10-11

### Changed
- Typography follows the owner's rule everywhere, tables and property lists included: DM Sans for all interface text;
  DM Mono only for code (code, token names, hex values, logs) and technical values (IDs, file names and paths,
  versions, dates and times, sizes, counts, durations, measured percentages, coordinates). The data role is the only
  way to get Mono. It always takes its neighbors' size and line height, so Mono and Sans share a baseline (measured:
  at most 0.41px apart). Data cells in tables, data values in property lists, file names, dates and times across the
  apps now follow it.
- DataTable and Table columns can have two kinds (["name", "data"]) for a row named by its file name.
### Added
- tests/typography.test.js on every app page and 66 design-system pages, light and dark. It fails the build when Mono
  holds prose, data is not Mono, a date, size, version, file name or ID stands outside Mono, or the two typefaces
  miss a shared baseline.
- The table test requires Mono for data cells. The native checker requires the data role to use DM Mono on iOS and
  Android.

## [0.31.39] - 2026-10-11

### Added
- Tabs that do not fit move into a More menu outside the tab list; the selected tab always shows; arrow keys still
  reach every tab.
- The full-screen search at Narrow shows recent searches and results in every app and the asset manager.
- The calendar's view and date, and the asset manager's refined searches, have their own addresses.
- services/registry: the Plenix package registry (Verdaccio) configuration and scripts. Not deployed yet.
### Changed
- At Narrow there is one back control: the shell's parent row returns from a detail to its list.
- The bulk actions bar wraps at narrow widths instead of cutting off its actions.
- Touch targets reach 44 by 44 without changing the look on breadcrumbs, standalone table links, segmented controls
  and unlabeled switches. Undersized targets with touch fell from 365 to 23, and with a mouse from 13 to 0. Reflow
  findings at 320px fell from 15 to 0.
- On iOS and Android, sizes and layout follow the platform's guidelines when they differ from the web's (owner): the
  iOS alert keeps Apple's width. The slider's and the progress indicator's values on iOS are DM Mono, the data role,
  as on the web and Android.

## [0.31.38] - 2026-10-11

### Added
- Every screen in the apps has its own address and history entry (Platforms Standard 4.3): a note, a thread, a
  contact, a file, a task, a bookmark, an event, a project, a settings section, a search. Back and Forward work, deep
  links open the screen, and the parent control goes to the parent (useScreenLocation, navigate, goToParent).
- An unsaved-changes guard (useUnsavedGuard) asks with the Platform's dialog before leaving a screen, a dialog or the
  page with unsaved work. It is wired into the image editor, the account and system settings, notes, messages, the
  new-project dialog, uploads, metadata and capture.
- List-detail at Narrow: Notes, Messages and Contacts show one pane at a time, with a Back bar that returns to the list.
- View restoration: each app reopens its last screen and list position (useViewState).
- Sheet: a bottom sheet at Narrow (medium and large heights, grabber, Cancel and Done), a drawer at Medium and a dialog
  at Wide; one at a time. The inspector (SidePanel) opens as a sheet at Narrow.
- Full-screen search at Narrow in the application header, closed by Cancel, Escape or Back.
- Touch targets reach 44 by 44 without changing the look: header items, tag and chip buttons, color swatches, card
  titles and checkboxes. Undersized targets with touch fell from 907 to 366, and with a mouse from 29 to 13.
### Changed
- 137 component tokens named from selector fragments now say what they style, for example data-table-background-2 is
  data-table-header-background and pagination-page-hover-not-disabled-not-aria-current-background is
  pagination-page-hover-background. Values are unchanged.
- The target test honors WCAG's "Equivalent" exception: the pane splitters and the table's resize grips have
  full-size menu equivalents.

## [0.31.37] - 2026-10-11

### Fixed
- The release build copies folders inside the native outputs (the Android plenix_dimens.xml under res/values), so the
  CDN has every native file; 0.31.36 stopped before it was published. (batch 342)

## [0.31.36] - 2026-10-11

### Added
- The Plenix design for 49 more native components, following the iOS Buttons model.
  - iOS (24): Toggles, Sliders, Steppers, Segmented controls, Text fields, Pickers, Pop-up buttons, Color wells,
    Search fields, Page controls, Alerts, Action sheets, Sheets, Popovers, Activity views, Menus, Context menus, Edit
    menus, Toolbars, Notifications, Tab bars, Sidebars, Lists and tables, Progress indicators and Windows.
  - Android (24), with Jetpack Compose and Android Views: Button, Icon button, Menu, OutlinedTextField, Switch,
    Checkbox, Radio group, Slider, Search bar, Exposed dropdown menu, DatePicker and TimePicker, Top app bar,
    NavigationBar, NavigationRail, Tabs and segmented buttons, Badge, List, Card, Progress indicators, Snackbar,
    AlertDialog, ModalBottomSheet, Tooltip and Avatar.
  - Each page has its variants (with their Web pages and tokens), states, anatomy, every attribute from the Plenix
    token to the code that sets it, and the Plenix code.
  - Web pages show the Plenix design of their iOS and Android counterparts under Across platforms.
- The native token files name every value the native code uses: border widths, icon sizes, shapes, shell sizes,
  opacities, durations, and the component values the native designs name. Android also gets plenix_dimens.xml for
  Views XML.
- Web, Plenix Platforms Standard:
  - DataTable: rows move without dragging (a handle menu, the row menu, Alt+Arrow keys); columns move and resize from
    the header menu and the keyboard; a narrow table becomes a list of its key columns; an error state with Retry;
    a kept view (sort, widths, order, hidden columns) under a storage key.
  - The pane splitters and the dashboard grid have menus to resize and move without dragging.
  - EmptyState has an error tone with one recovery action.
  - Tooltips open on a long press on touch screens.
  - The appearance follows the system by default; Settings and My account offer System, Light and Dark, applied live
    across the open apps.
  - Inputs bring the right keyboard, autofill and Enter key hints.
  - Scrolling areas with an action bar keep the focused element in view.
  - New tests: 320px reflow and touch and pointer target sizes, with their known findings as baselines.
- A lightweight Plenix sign-in service (services/login), with an accounts command, tests and the steps to switch
  from Authentik. It is not deployed: switching is the owner's decision.
### Changed
- Toasts take how long they stay from a token (--plx-comp-toast-duration).

## [0.31.35] - 2026-10-11

### Fixed
- The build no longer fails when the design system is not checked out (CI): the native guidance step now looks for
  the design system itself, not only its folder, before checking the images it shows. (batch 337)

## [0.31.34] - 2026-10-11

### Added
- The Plenix iOS design, starting with Buttons (the model for every native component). The iOS Buttons page now
  shows what the guidance becomes as a real control:
  - Variants: Apple's kit default beside the same kit component styled with the Plenix variables, in light and dark,
    for Primary, Secondary, Ghost, Danger and Danger secondary. Each variant gets its Apple kit style, its Web page,
    its background, content and border tokens, and its SwiftUI, UIKit and AppKit form.
  - States: default, pressed, disabled, focused and loading, with their tokens and where SwiftUI, UIKit and AppKit
    report each.
  - Anatomy: a lettered drawing (container, label, symbol), and every attribute from the Plenix token to the Plenix
    iOS value, Apple's default, the guideline it follows, and the SwiftUI, UIKit and AppKit attribute that sets it.
  - Development and API: Plenix code in SwiftUI (a PlenixButtonStyle on the generated tokens), UIKit and AppKit.
- In the Figma copy of the iOS and iPadOS 27 kit: Plenix Light and Plenix Dark variable collections (the Plenix
  values) and the comparison and anatomy drawings, on the kit's Buttons page.
- The data is platform/standards/native-design.json. The build checks every page, image, token and guideline it
  names, and the API serves it at /api/v1/native-design.

## [0.31.33] - 2026-10-11

### Changed
- iOS has the same 14 sections as the Web (01 Foundations to 14 Implementation & Governance). Each Apple Human
  Interface Guidelines page sits in the section it belongs to, under the Web's subcategory name (Buttons, Menus and
  commands, Text input, Dialogs and so on), or Apple's group name where the Web has none (Media, System experiences,
  Technologies, Inputs). Every page keeps its Apple name and link. Plenix's own iOS pages are under 14 Implementation &
  Governance. Android's sections 11 and 13 take the Web titles (Page Structures & Templates; Interaction,
  Accessibility & Utilities).
- iOS and Android pages use the Web page's section names, in the Web order, listing only the sections they have:
  Overview and Purpose, Usage, Across platforms, Figma, Platform specification, Development and API, Implementation
  and Source-system mappings. The References panel is split: the SwiftUI, UIKit and AppKit documentation is under
  Development and API, and the Human Interface Guidelines outline under Source-system mappings.
- "API and usage" on Web pages is now "Development and API".

### Removed
- The Designing for macOS, tvOS, visionOS, watchOS and games pages, with their guidance and references.

## [0.31.32] - 2026-10-11

### Added
- The Figma kit "iOS and iPadOS 27" (Apple Design Resources) is mapped to the design system: its 141 public
  components, across 36 kit pages, each under the iOS page it draws (Buttons, Toggles, Tab bars, Sheets and so on).
  Every iOS page with kit components has a Figma section: each component, its kit page, its variant count and its
  variant properties, linked to its node in the Plenix copy of the file. Web and Android pages show the components of
  the iOS pages they map to. The map is data (platform/standards/figma-map.json), checked by the build, and served by
  the API at /api/v1/figma-map.

## [0.31.31] - 2026-10-11

### Added
- Every variant is its own page, as the owner asked: the last 33 components get the Button treatment. Data display:
  metric, interactive list, activity stream, card, selectable card, calendar view and media card. Forms and more:
  color swatch, drop zone, rating, combobox, search input, empty state, preview, chat and bulk action bar. Content:
  text, heading, list, code block, keyboard hint, avatar, property list, thumbnail and icon. Layout: stack, divider,
  dashboard grid, responsive grid, columns, secondary pane, inspector region and record page. Each has an "All" lab
  with every value's component token, and a page per variant: 125 new pages. All 58 components with variants are now
  done, with none left. The lab test passes 57 of 57 labs and the pages test 946 of 946.
- Icons, the list's icon and the avatar's theme colors read their own component tokens (icon-size-xs..xl,
  list-icon-size, avatar-background, avatar-content; same values as before), so their labs edit component tokens.

### Fixed
- A variant page that names only a size, a state or content (Large metric, Large spinner) now opens the lab on it;
  it showed the default before. (batch 333)

## [0.31.30] - 2026-10-11

### Added
- Every built Web item maps to iOS and Android, as the owner asked: all 128 components, patterns, foundations, page
  structures, templates and utilities. Most come from the iOS guidance (an iOS page names its Web and Android pages).
  The rest are in platform/standards/web-native-map.json, where foundations, page structures and utilities map to
  their nearest iOS (HIG or Plenix for iOS) and Android pages. The build stops when a built Web item has no iOS or no
  Android counterpart. 340 Web pages are mapped in all.
- "Across platforms" on every page with a counterpart: Web pages list their iOS and Android pages and the iOS guidance
  mapped to them; Android pages list their Web and iOS pages (also where the standard has no part yet); iOS pages list
  every Web page mapped to them. (batch 332)

## [0.31.29] - 2026-10-11

### Changed
- Every Web component and pattern stylesheet now takes its values from Plenix component tokens, as the owner asked:
  58 stylesheets, 1,311 new component tokens (3,202 tokens in all), each pointing to the same theme or reference token
  as before, so nothing changes on screen (the visual, theme, density and layout tests are unchanged). No stylesheet
  is left that uses a theme value directly, except the generated step rules.
- The data table reference demo (docs/data-table-reference.html) takes the owner's merged dark colors (gray-900 and
  gray-800 for the header and borders, blue-900 for the selected-row hover, blue-300 for the accent); the reference test
  matches again (186/186). (batch 331)

## [0.31.28] - 2026-10-11

### Added
- Plenix guidance for every page of the Apple Human Interface Guidelines: 158 pages and 1,322 rules, written in Plenix's
  own words (never Apple's text) and true to the guidelines. Each rule says Must or Should and links to the HIG
  section it follows. Components and inputs carry a cross-platform property table: 416 rows naming each setting in iOS
  (SwiftUI / UIKit), Android (Jetpack Compose) and Web (Plenix). Each page maps to its matching Web and Android pages.
- The guidance is part of the design system's data: platform/standards/native-guidance.json, built by
  build-native-guidance.js (a missing mapped page stops the build). It is also served at /api/v1/native-guidance. iOS
  pages show it first, under "Plenix guidance". Web and Android pages show the iOS pages mapped to them, with their
  property tables, under "Across platforms".
- build-platforms and build-native-guidance skip their output when the design system is not checked out. (batch 330)

## [0.31.27] - 2026-10-11

### Changed
- Every iOS page gathers Apple's references in one References panel, as the owner asked. It holds the Human Interface
  Guidelines page with its outline and resources; the developer documentation; the SwiftUI topics; and the frameworks.
- The developer documentation now covers UIKit and AppKit as well as SwiftUI. For each page, the types and classes that
  build it (for example TextField, SecureField, UITextField, NSTextField and NSSecureTextField for Text fields) show with
  their availability and every attribute, grouped by Apple's topics, each linked: 241 types and classes, 6,156
  attributes, across 91 pages. The page reads them from apple-api.json when it opens. (batch 328)

## [0.31.26] - 2026-10-11

### Changed
- The iOS view is generated from the Apple Human Interface Guidelines' own index, as the owner asked ("ensure
  everything is taken from" the HIG). It has all six groups and Components' eight groups, with every page in Apple's
  order: 158 pages, including Designing for iPhone Duo and the pages for other Apple platforms, previously left out.
  Plenix's own pages (how to build, token mapping, generated files, sources and levels, conformance) are a seventh
  section, 07 Plenix for iOS.
- Every HIG page shows its outline from the Guidelines: each section and subsection, linked to its place on Apple's
  page (581 sections), and Apple's resources for it: related pages, developer documentation and videos. These are
  names and links; Apple's guidance is read on Apple's site. The SwiftUI symbols, frameworks and Plenix Platforms
  Standard parts stay on their pages.
- A breadcrumb no longer shows an empty step for a page that sits directly under its section. (batch 327)

## [0.31.25] - 2026-10-10

### Added
- The iOS pages carry Apple's references, as the owner asked ("all the details" of developer.apple.com/documentation/swiftui
  and developer.apple.com/documentation). Apple's documentation text is Apple's, so it is linked, never copied. Each
  page has:
  - its Human Interface Guidelines page: 129 pages, each checked to exist;
  - a SwiftUI panel: every symbol of the SwiftUI topics that build it, by name, kind and link, under Apple's own topic
    groups (for example, Controls and indicators › Choosing from a set of options). That is 276 topics and 1,409
    symbols across the pages;
  - the Apple frameworks it uses (HealthKit, MapKit, WidgetKit, StoreKit, PencilKit and others), linked to their
    documentation.
  A page not yet in the Plenix Platforms Standard is no longer a placeholder: it shows these references under the
  status "Apple references". (batch 326)

## [0.31.24] - 2026-10-10

### Changed
- The iOS view follows the Apple Human Interface Guidelines' navigation, as the owner asked. Getting started, Foundations,
  Patterns, Inputs and Technologies list their pages directly, as the HIG does. Components has the HIG's eight groups:
  Content; Layout and organization; Menus and actions; Navigation and search; Presentation; Selection and input; Status;
  System experiences. The pages carry the HIG's names (Toggles, Sheets, Tab bars, Pop-up buttons, Virtual keyboards).
  Only pages that apply to iPhone and iPad are listed. Plenix's own pages (how to build, token mapping, generated files,
  sources and levels, conformance) are in Getting started. 134 pages; 62 show their parts of the Plenix Platforms
  Standard, the rest are placeholders. Android keeps its Web-shaped hierarchy.
- The design system's navigation supports a section whose pages sit directly under it; check-spec reads such sections
  from STANDARD.md. (batch 325)

## [0.31.23] - 2026-10-10

### Changed
- iOS and Android follow the Web design system's hierarchy, as the owner asked. Under level 0 (the Platform dropdown),
  each platform has the same 14 sections as Web: Foundations, Layout & Composition, Content & Identity, Actions &
  Commands, Forms & Data Entry, Navigation & Discovery, Data Display & Visualization, Feedback & System State, Overlays &
  Disclosure, Patterns & Workflows, Screen Structures & Templates, Specialized Experiences, Interaction & Accessibility,
  and Implementation & Governance. The groups inside follow purpose (Text fields & text areas; Sheets & bottom sheets;
  Tab bars & navigation bars), and the pages are named as each platform names its controls: Toggle on iOS and Switch on
  Android, Sheet with detents and ModalBottomSheet, TabView and NavigationBar, NavigationStack and Back stack.
- 302 pages (151 per platform). 226 show their parts of the Plenix Platforms Standard for that platform: whole
  subsections, the rows of a table that apply, or a 6.5 functional equivalent. The rest are placeholders, as on Web. The
  old "15 Platform – iOS" and "16 Platform – Android" are gone; their pages are now 01 Foundations › Overview, 14
  Implementation & Governance › How to build, Token mapping and Generated files, and the standard's sections in their
  purpose groups. (batch 324)

## [0.31.22] - 2026-10-10

### Changed
- Blue is consolidated as the owner asked: blue-850 is merged into blue-900 (#1f2a3a) and blue-350 into blue-300
  (#a2c0e3); both are removed. The final scale is 900, 700, 650, 600, 400, 300, 250, 200, 100, 50. The dark table's
  selected-row hover is now the selected-row color (blue-900), and the selected-row text and table accent use blue-300.
  Contrast stays well above the minimums: text on the selected row 7.71:1, accent on the table 8.78:1, avatar 11.19:1,
  code keyword 5.19:1.
- The design system shows every component sample on a checkered background: variant previews, example and card stages,
  and the labs' anatomy stage and matrix cells. It uses 8px squares of the hover state on the default surface, in light
  and dark. The toast, confirmation dialog, side drawer and header labs get wider matrix columns, so their samples fit.
  (batch 323)

## [0.31.21] - 2026-10-10

### Changed
- The owner's approved reds, exactly: red-800 #990000, red-700 #b70000, red-500 #f60000, red-300 #e96060,
  red-200 #f8aca2, red-100 #fde7e7.
- Roles that carry text move off red-500 (#f60000 is 4.27:1 with white text, 3.61:1 on the soft fill). Danger buttons
  and solid danger badges and counts use red-700 (6.97:1 with white text), with hover and pressed on red-800 (8.92:1).
  Light-theme danger text, the table's danger icon and code strings use red-700 (6.97:1). red-500 stays for the data
  color, status dots, progress fills and the toast edge.
- Dark theme, checked separately. The danger borders (secondary danger button, invalid field) follow the danger text
  color, red-200 (5.29:1); on red-700 they were 1.40:1. A new role, --plx-sys-feedback-danger-soft-content, holds danger
  text on the soft danger fill: red-700 in light (5.89:1), red-100 in dark (6.01:1; red-200 was 3.86:1). Soft danger
  badges and danger notices use it. Dark code strings use red-200 (5.29:1). Every text and border pairing passes in both
  themes; the a11y test passes without new exceptions. (batch 322)

## [0.31.20] - 2026-10-10

### Changed
- The owner undid the blue merge for the dark tables. blue-850 (#26354a) is back for the selected-row hover, so a selected
  row changes color on hover again. blue-350 (#8fb0d9) is back for the selected-row text and the table accent. Every other
  role stays on blue-900 and blue-300.
- Purple uses move to the corresponding blue shade, dark to dark and light to light. The purple data color is now
  blue-650 (distinct from the blue data color, blue-400); its soft fill is blue-100 and its text on that fill blue-900.
  Code attributes use blue-600 in light and blue-200 in dark. The purple reference colors (purple-800, -600, -500, -200,
  -100) are removed. The category palette's own purple is unchanged. (batch 321)

## [0.31.19] - 2026-10-10

### Changed
- Green is the owner's approved five-step scale: green-700 #1b5e0c, green-500 #107c10, green-300 #58ad58 (was #83c483),
  green-200 #9bd39b (was #bde8bd), green-100 #dff6dd. green-900, green-800 and green-600 are removed. green-900 and
  green-600 had no references. Every role on green-800 now uses green-700: light success text, light code numbers, and
  the green data color's text on its soft fill (light and dark). That text has 7.9:1 contrast on white and 6.9:1 on
  green-100.
- Gray merges by the owner: gray-925 into gray-900 (#34363b), which is the dark table header background; gray-850 into
  gray-800 (#444444), which is the dark soft-feedback borders and table borders. gray-925 and gray-850 are removed. No
  references to the removed tokens remain, and no token is left unresolved. (batch 320)

## [0.31.18] - 2026-10-10

### Changed
- The owner merged two blues: every role on blue-850 (#26354a) now uses blue-900 (#1f2a3a). That is the dark theme's
  selected-row hover in tables. Every role on blue-350 (#8fb0d9) now uses blue-300 (#a2c0e3): the light theme's accent
  border, accent field border and accent field placeholder; the dark theme's avatar background, code keyword, header
  card media content, selected-row text and table accent. --plx-ref-color-blue-850 and --plx-ref-color-blue-350 are
  removed; Blue has 10 shades.
- The design system's color group "Other" is now "Alpha or transparent" (the two black alpha colors).
- Purple is kept: it is in use (data color purple, the light theme's code attribute, category and project colors).
  (batch 319)

## [0.31.17] - 2026-10-10

### Added
- Every Variant, Navigation: Tabs, Application header, Product switcher, Navigation rail and Action menu get the Button
  treatment. Their values are component tokens: tabs.css 56, app-header.css 91 plus the header's three tones (24) and
  its own sizes (8) as tokens, tool-rail.css 25, menu.css 39. Each has an "All" lab with each value's token. Each variant
  has its own page: 14 pages (3 tab styles, 3 header tones, 2 switcher names, 2 rail label modes, 4 menu placements).

### Changed
- The reds, by the owner: red-800 #990000, red-700 #cc0000, red-500 #d60000, red-300 #ff8585, red-200 #ffc2c2. The owner
  asked for #ff0000 for red-500, then chose to darken it to pass WCAG AA. #d60000 is the brightest red with 4.5:1 for white
  text on it (5.4:1) and for red text on the soft danger fill (4.6:1). (batch 318)

## [0.31.16] - 2026-10-10

### Fixed
- The design system's token tables show their colors again. In the Rendering column, a token's sample now fills its
  table cell; the cell is a flex row, so a color swatch with no width of its own had collapsed to its border. The swatch
  is 24px tall in the 44px row. (batch 317)

## [0.31.15] - 2026-10-10

### Added
- Every Variant, Overlays: Dialog, Confirmation dialog, Side drawer and Toast get the Button treatment. Their values are
  component tokens (dialog.css: 44 plus the two footer action heights; toast.css: 30). Each has an "All" lab that draws
  every size, intent, side and tone in place, with each value's token. Each variant has its own page: 16 pages (dialog
  SM to FULL, Confirm and Destructive, drawer SM, MD and LG at the end or the start, toast Info, Success, Warning and
  Danger).

### Changed
- The dialog footer's gap between actions uses --plx-comp-dialog-action-gap, which is 12px on touch (Platforms Standard
  3.2). (batch 316)

## [0.31.14] - 2026-10-10

### Changed
- Pages written by the Plenix Platforms Standard get their own header in place of the placeholder's "Not written
  yet". This covers 15 Platform – iOS, 16 Platform – Android, and Platforms standard, Mobile web and Desktop under
  14. The header shows the phone icon, the section and group, a "Platforms Standard" status and a one-line
  description of the page. Their navigation rows are no longer muted. (batch 315)

## [0.31.13] - 2026-10-10

### Changed
- The design system's navigation has a level 0: a Platform dropdown (Web, iOS, Android) at the very top of the
  navigation pane switches the pane to that platform's sections. Web is 01–14, iOS is 15 Platform – iOS and Android is
  16 Platform – Android. The pane follows the page you open, the choice is remembered, and the footer counts the
  sections on the chosen platform.
- iOS and Android left 14 › Platforms, which keeps Platforms standard, Web, Mobile web and Desktop. Each native section
  has Build (How to build, Token mapping, Generated files) and Standard for iOS or Android, with Overview and one page
  per section of the Platforms Standard for that platform. The standard's pages, guidance and checks follow
  (888 leaves). (batch 314)

## [0.31.12] - 2026-10-10

### Added
- The token data holds the native values. In tokens.index.json, the @plenix-ds/tokens tokens.json and the API
  (/api/v1/tokens), each web token carries its iOS and Android values under platforms.ios and platforms.android,
  with their sources (26 tokens). platformOnly lists the native values with no web token (59).
- A new endpoint, /api/v1/platforms, serves the Plenix Platforms Standard (every section) and its token mapping
  (80 names). (batch 313)

## [0.31.11] - 2026-10-10

### Fixed
- build-tokens.js writes the native outputs only from the whole token set (component tokens included); the theme
  test's partial copy builds the stylesheets alone, so CI passes again. (batch 312)

## [0.31.10] - 2026-10-10

### Changed
- The iOS and Android token sets now use the existing web token names (Platforms Standard 7.1: "one set of token
  names, with values per platform"). For example: control-target-min, button-cluster-gap, dialog-action-gap,
  button-height, button-icon, button-icon-label-gap, input-min-height, switch-track-width and -height,
  switch-min-height, shell-header-height, shell-phone-below, shell-rail-below, nav-bar-height and nav-bar-icon-size.
  Text roles keep the web role names (title, heading, body and the others). Every value records the web token it maps
  to in $extensions.plenix.web, or platformOnly when the web has no such role. Its source now also names the version
  and the Plenix value where Plenix differs.
- The build stops if a platform value maps to a token that does not exist. build-tokens.js now writes the Swift,
  Kotlin and Dart outputs (7.2). Their constants carry the web names (controlTargetMin, textTitleSize, ...) and a
  comment naming the web token. The typefaces come from --plx-sys-typeface-sans and -mono.
- The web values the standard cites carry their source: the target minimums (WCAG 2.2 SC 2.5.8 and 2.5.5), the 12px
  coarse-pointer gaps, the 600 and 840 window classes, and the safe areas.
- The iOS and Android pages show the token mapping (80 names: 38 map to web tokens, 42 are platform only). (batch 312)

## [0.31.9] - 2026-10-10

### Changed
- Window classes follow the Plenix Platforms Standard (3.3): Narrow under 600px, Medium 600–839px, Wide from 840px
  (new --plx-ref-breakpoint-840px; --plx-sys-shell-rail-below is now 840px). data-plx-main-size reads narrow, medium
  or wide. Interaction "mobile" means a coarse pointer in a Narrow window, and any coarse pointer counts as touch (1.1).
- Navigation by window class (4.1, 6.4), never a drawer at Narrow. Wide keeps the pane, and Medium the rail with its
  expanded rail over the main region. At Narrow, a page with two or more rail destinations gets a bottom navigation
  bar: up to four destinations and Browse, always labeled, 44px targets. Browse opens the pane as a screen of its own.
  A page without rail destinations gets a parent row ("<- title") that opens the pane as the first screen of the stack.
  Choosing an item shows the main region again. New tokens: --plx-comp-nav-bar-*.
- Safe areas (3.5): every app page sets viewport-fit=cover, and the shell keeps its content inside
  --plx-sys-safe-area-top, -bottom, -start and -end (env(safe-area-inset-*)).
- The header's links leave it below Wide (840px), not at 768px. (batch 311)

## [0.31.8] - 2026-10-10

### Added
- The Plenix Platforms Standard in full: platform/standards/platforms.md is the source, and build-platforms.js reads
  every section, list and table of it into the design system with nothing lost. 14 › Platforms › Platforms standard
  shows the whole standard. Web, Mobile web, Desktop, iOS and Android each show it for their platform, headed by
  "How to build" (implementations, themes and the implementation section). Foundations, patterns and components show
  the parts they follow.
- Native token outputs (standard 7.1 and 7.2): platform-ios.tokens.json and platform-android.tokens.json, with every
  value's source. build-mobile.js generates SwiftUI (PlenixTokens.swift), Jetpack Compose (PlenixTokens.kt) and
  Flutter (plenix_tokens.dart) tokens from the theme and these sets. They are linked from the iOS and Android pages
  and published on the CDN under mobile/. (batch 310)

## [0.31.7] - 2026-10-10

### Changed
- Platforms pages, second review pass: platform interaction now ranks above the Plenix look in the precedence; field
  focus also needs 3:1 contrast against the unfocused border, in light and dark; the web's header control is the
  parent control, a separate operation from Back; Android 16 rules added (no edge-to-edge opt-out for apps targeting
  API 36; onBackPressed and KEYCODE_BACK no longer delivered) and Google Play's API 36 target requirement from August
  31, 2026. (batch 309)

## [0.31.6] - 2026-10-10

### Changed
- Platforms pages corrected against their sources after an outside review: accessibility requirements and
  OS-enforced behavior come first in the precedence; SwiftUI and Compose rows name native controls, while Flutter rows
  say Flutter draws its own Cupertino and Material widgets; field focus keeps the border-color rule with a 3:1 contrast
  requirement, errors carry text as well as color, and focus indicators the OS draws are never suppressed; Reflow
  states the 400% zoom and two-dimensional exemptions; Android edge-to-edge is an OS requirement (SDK 35 on Android
  15); back follows the real history, and the parent control, deep links and guards are separate rules. (batch 308)

## [0.31.5] - 2026-10-10

### Fixed
- The search field's clear button no longer drops out of the field when pressed (owner: "this is still not fixed"). Root
  cause: it was centered with transform: translateY(-50%), and the press feedback (motion.css) sets transform: scale(…)
  while it is held, replacing the translate, so the X fell by half its height. It is now centered by its insets and
  auto margins. The narrow header's search keeps the same margin on its right as on its left. (batch 307)

## [0.31.4] - 2026-10-10

### Changed
- The design system's Platforms pages follow the Plenix Platforms Standard (owner: "an authoritative document that
  spells the details"): every value reads as a rule with its source, without decision labels. New Type roles table on
  Mobile web, iOS and Android: each Plenix text role with its iOS text style at Apple's Dynamic Type size (title →
  Large Title 34, body → Body 17, secondary → Footnote 13…) and its Material 3 type role (body → Body large 16sp…).
  (batch 306)

## [0.31.3] - 2026-10-10

### Fixed
- Tabs' outer border is the same on every side (owner: "do a deep search why this is and fix it"). Root cause: the contained
  panel and the open tab drew their edges as inset box-shadows, the only frame in the system to do so; shadows are not
  snapped to device pixels, so at 150% a 1px line covered 1.5 device pixels, blurred over two and heavier than every
  other frame, and at 125% the four sides differed by up to 20 shades. They now draw real borders like Panel and Card;
  measured at 125% and 150% over ten sub-pixel positions, Tabs now render exactly as Panel does. (batch 305)

## [0.31.2] - 2026-10-10

### Fixed
- Top-level navigation on phones (decision N1, owner: "just fix n1"): a narrow window always uses a bottom bar with 3–5
  destinations and never a drawer, because Material 3 no longer recommends the navigation drawer (May 2025) and says
  compact windows always use a navigation bar, and Apple advises against overflow tabs. Areas beyond 5 go on a
  destination that lists them or in the top bar's menu; Medium windows use a navigation rail (3–7); other apps are
  reached through the header's app switcher. Updated in the design system's Platforms data and STANDARD.md decision 11.
  (batch 304)

## [0.31.1] - 2026-10-10

### Changed
- The design system has one look for each kind of information (owner: "there is many inconsistency in how things are
  presented... i need a unified look"):
  - every list of names (classes, tokens, states, ARIA attributes, aliases, "Also answers", a variant's class) is pills:
    a name with a page is a chip that opens it, any other name a tag; an empty list or value is "—";
  - every status is a soft badge whose tone says what it means;
  - inline technical values are the data text; links are text links; sub-titles inside a card are labels;
  - one icon per kind of section, none shared; a foundation's own parts (Typefaces, Typography: sizes, Color: Blue…)
    carry the foundation's icon, and Typography's icon is the text "T". (batch 303)

## [0.31.0] - 2026-10-10

### Fixed
- The dropdown arrow of every menu button (FilterBar filters, More menus, any Button with caret) was a dot (owner: "find the
  root cause"): the caret is the arrow_drop_down glyph, whose square includes the icon set's own padding, drawn into a 10x6
  box, so the whole 20px square shrank to 6px and the triangle to about 3x1.5px. The caret is now a 12px square, like the
  Select and Combobox chevrons (--plx-comp-button-caret-width/-height). (batch 302)
- Cards in the design system no longer scroll: the sample stages, variant previews, live samples and code set
  overflow-x:auto, which also turned overflow-y to auto, so a tooltip below its button scrolled the card; they now grow
  with their content. (batch 302)

### Removed
- The header search's separate Close button (owner: "why is there 2 x"): the field's own clear button is the only X;
  Escape closes search, and an empty field closes when focus leaves it. It also wrapped out of place in a narrow header.
  (batch 302)
- The numeric icon sizes (plx-icon--size-12/14/16/20/24) and every legacy or compatibility mention in the design system
  and the component docs (owner: "there should be no reference to the legacy at all"); Tabs' Segmented is "a compact
  switch". (batch 302)

### Changed
- The document icon is reserved for what is not in Plenix yet (owner): Product icons, Dashboard grid, Action bar, Metric,
  Selectable card, Calendar view, Table and Progress bar have their own icons (new names chart = bar_chart, progress =
  linear_scale); the Notes application, notes panels, the file panel and empty states use doc-text. (batch 302)

## [0.30.0] - 2026-10-10

### Removed
- Tabs variant="underline" (owner: "this is wrong.. remove this variant"). (batch 301)
- The tab focus outline (owner: "there is no blue focus on any tabs... remove"): arrow keys move and select and only the
  selected tab is in the Tab order, so keyboard focus is always on the selected tab, which its own look marks. (batch 301)

### Added
- Palette shades --plx-ref-color-brown-950 (#4a2400) and --plx-ref-color-red-800 (#8a1e13): two shades darker than the
  warning and danger fills in the same hue. Notice tokens notice-border-width and notice-<tone>-border. (batch 301)

### Changed
- Contained and folder tabs: the open tab's edges are drawn exactly like the panel's (inset lines, no border width), so
  tab and panel meet in one line of one weight and color at any display scale (owner: "the border outline is not same
  as the tab outlines"). Every Tabs in the design system and the applications. (batch 301)
- Notices have an edge two shades darker than their fill (the feedback soft-border roles), drawn inside so the content
  stays on the grid. Solid badges' warning and danger edges now use the new same-hue shades (were brown-900, one shade,
  and the plum red-700). (batch 301)
- NavList muted rows (incomplete places, such as the design system's entries not in Plenix yet and Settings' unstarted
  capabilities) show their text in the danger content color (owner: "give the node text a red color"). (batch 301)
- Design system: every table keeps its border (the Implementation tabs are the folder variant; variant groups and the
  sub-sections inside Guidelines cards are unframed titled sections, so no table sits three frames deep: 148 pages,
  1,440 tables, none borderless); each card shows its "On this page" icon before its title; the section pages' chips are
  all plain (no selected look). (batch 301)

## [0.29.0] - 2026-10-09

### Changed
- One table, one set of tokens (owner: "they should all be in" the Data table; "i need them to be using these tokens"):
  the static Table is now the DataTable with its interaction off. It draws with the DataTable's classes (.plx-data-table)
  and tokens (--plx-sys-data-table-*, --plx-comp-data-table-*), so every table in the Platform, the design system and the
  applications shares one look from one source. table.css and the --plx-sys-table-* tokens no longer draw anything.
  (batch 300)
- Name/value lists of reference facts are tables again, now with a header row: the design system's details on every page
  (Intent, the section pages' "Its own page / Answered on another page", Implementation, Design assets…), each component
  lab's property details, and the Settings and Capture facts. This replaces 0.28.4's property lists. (batch 300)

## [0.28.4] - 2026-10-09

### Changed
- Name/value pairs are never a two-column table (owner: "get rid of old legacy tables like this"): the design system's
  details on every page (Implementation, Design assets and every other key/value list), each component lab's property
  details, and the Settings and Capture facts are PropertyLists (label beside value, no grid frame or shaded column).
  Tables stay for records compared across columns. PropertyList passes other props (aria-label) to its list.

## [0.28.3] - 2026-10-09

### Fixed
- Tables with wrapping text (owner: "whats wrong with this table?!"): when one cell wraps onto more lines, every other
  cell in its row now grows with it, so the row label's shade, the cell fills and the column lines run the full row
  height. Cells keep the row height as their minimum (Table and DataTable). (batch 299)

## [0.28.2] - 2026-10-09

### Changed
- Every table, DataTable and data grid has full inside borders (owner: "for inside borders i want you to use full
  borders... update everywhere"): the column lines run the full height of each cell and of the header, in the Platform,
  the design system and every application. --plx-comp-data-table-column-line-inset, -header-line-inset and the Table's
  two are 0 (were 6px and 8px). The reference page (docs/data-table-reference.html) follows. (batch 298)

## [0.28.1] - 2026-10-09

### Changed
- The design system's own pages use EntityHeader (owner: "this needs to be updated to reflect the new headers"): every
  item, variant, variants overview, token and section page and the UI Inventory home. The item's level is the context
  line, its lifecycle status the status area, its icon the tinted media. (batch 297)
- EntityHeader draws no action area when it has neither actions nor moreActions (no lone ⋯). (batch 297)

## [0.28.0] - 2026-10-09

### Added
- EntityHeader (patterns/EntityHeader), the header of a page that shows one entity, as decided with the owner in the page
  header study (docs/page-header-study.html): a card; 48px media with a 1px border (an Avatar, or a generic icon for the
  entity's kind tinted in a data color); an optional context line (a placeholder such as the category, not a breadcrumb)
  and the status area (a soft Badge) on the top line; the title, 18px bold, wrapping; the entity's own actions as 16px
  icon buttons (Compact) side by side with the ⋯ menu last, folding from the end when the row is narrow; one line of
  facts under a full-width line, every item in the same font, size, weight and color (live state first, with its dot).
  Token --plx-comp-entity-header-tint. (batch 296)
- Settings › Appearance: "Page header background" (None, Gray, Blue, Warm, Green, Purple, Red; default Blue) and "Page
  header tint" (Fade, Flat; default Fade), applied as data-plx-header-tint and data-plx-header-tint-style on the page
  root. (batch 296)

### Changed
- Every application's entity pages use EntityHeader: Contacts (Call, Email, Message, Edit, Delete, Share), a project's
  home, Tasks, Notes and Files views, Messages (the open conversation), Notes, and the Tasks, Files and Bookmarks
  screens; their "Add" buttons sit under the header (capability actions stay out of it). The spec documents it under
  Object / record page. (batch 296)

## [0.27.3] - 2026-10-09

### Fixed
- CI (Checks and Release) failed on every push since 0.23.0: progress-bar.css still read --plx-comp-progress-bar-value,
  which nothing in the Platform sets since a known amount is drawn on <progress>. The fill (only the unknown-amount
  state uses it now) has no width variable; the design system's progress lab sets its sample width itself.

## [0.27.2] - 2026-10-09

### Changed
- PropertyList data values (sizes, dates, counts beside a label) are DM Sans at the label's size with equal-width digits
  (owner's choice, batch 294): measured, DM Mono matched DM Sans in x-height (0.50 em), cap height (0.70) and stroke
  (8.4%) but read 30% wider, so it looked bigger than its label.

### Note
- 0.26.2 (batch 292, the property list wrap) was released after 0.27.0 and 0.27.1 from another session by mistake;
  its content is included in every later release.

## [0.26.2] - 2026-10-09

### Fixed
- PropertyList (columns): the value column shrinks with its pane instead of keeping a field-width minimum, so in a
  narrow pane values wrap and are never cut off at the pane's edge ("Jul 3, 202").

## [0.27.1] - 2026-10-09

### Added
- Icons for entity actions (owner: "include the common email actions, forward, reply, delete"; contacts need Email):
  archive, flag, forward, mail, mark-unread, reply, reply-all, snooze, stop. Material Symbols Sharp from the vendored
  library, unedited. (batch 293)

## [0.27.0] - 2026-10-09

### Added
- Palette shades for pill borders (owner: "all pills must have a border that is 2 shades darker than the current color...
  if these shades are not in the tokens... they need to be added"): --plx-ref-color-blue-300 #a2c0e3, green-300 #83c483,
  brown-300 #dfaa7c (each between its hue's 200 and the next shade) and green-700 #1b5e0c (between green-600 and 800).
- Token roles --plx-sys-feedback-<tone>-soft-border and -solid-border (neutral, info, success, warning, danger) and
  --plx-sys-action-primary-border: two shades darker than the fill. Soft, light: gray-300, blue-300, green-300,
  brown-300, red-300; dark: gray-850 (the soft fills are gray-700). Solid: gray-800, blue-600, green-700, brown-900 (the
  darkest brown; the warning fill is brown-800), red-700. Primary: blue-600. (batch 292)

### Changed
- Every pill has a 1px border two shades darker than its fill, inside its height: Badge (solid and soft), the Count pill
  and Chip (plain: fill-neutral-border, as Tag; selected: action-primary-border). Tag already had it (batch 260). (batch 292)

## [0.26.1] - 2026-10-09

### Changed
- Color swatches are squares with 2px corners (--plx-sys-shape-2xs; owner: "use square with 2px radius for swatches"),
  everywhere: pickers, category lists, previews. shape="round" keeps a circle; the old 4px borderless "square inside a
  button" variant is gone (shape="square" is now the default).

## [0.26.0] - 2026-10-09

### Added
- Category colors, their own palette (owner: "use sashamaps.net/resources/20-colors"): Trubetskoy's 20 simple,
  distinct colors with his exact values, in his convenient order (take the first n for n categories). Their own tokens,
  separate from the theme and the same in every theme: --plx-ref-color-category-<name>, --plx-sys-category-<name> and
  -<name>-on (black or white text, the stronger contrast; every one at least 4.5:1). CATEGORY_COLORS lists them
  (generated); [data-plx-category] applies one. ColorSwatch.category, Avatar.category, ColorPicker palette="category".
- Categories use it: Settings' categories and their editor, the Asset Manager's category color (details pane, new
  category, upload). Archive's gray is the palette's grey.

### Changed
- ColorPicker is one row: the colors that do not fit are in a More menu at its end ("+n", or the chosen color when it is
  one of them), each with its swatch and name.

## [0.25.3] - 2026-10-09

### Changed
- The application switcher has no motion: no hover fade and no press shrink (owner: "remove the motion from this").

## [0.25.2] - 2026-10-09

### Added
- Every Variant: Tag and Chip get the Button treatment: their values as component tokens (tag.css, 42 tokens, same
  values), a lab each ("All tags": plain, removable, renamable in every state; "All chips": selected or not, plain or
  removable, in every state) with each value's token and the Edit dialog, and a page per variant in the navigation.
  15 labs pass tests/labs.test.js.

## [0.25.1] - 2026-10-09

### Changed
- The design system's tables are handed to the Platform Table as rows (Strict DS 6c): DS.grid(heads, rows, opts) draws
  them (no <table> markup is built anywhere: the component labs' matrix, property and attributes tables, the token
  family tables, the opacity, radius and layout tables). DS.table remains only for a table that arrives as markup.
  Cells a builder fills in later stay live (opts.live): the radius roles' and layout offsets' "Used by" counts now show
  (they were lost when the old markup was converted).

## [0.25.0] - 2026-10-09

### Changed (breaking)
- Tabulator is drawn by Plenix (Strict DS 6b): no style attribute anywhere, the tables included. Tabulator runs in
  strict mode (components/DataTable/strict.js, applied once per window as it loads): its geometry writes are off (cell
  and column widths, heights and alignment, row heights, header alignment, body sizing, virtual padding, the
  frozen-rows holder), pinned columns are classes (sticky at the widths before them, data-plx-sticky), tree rows a
  level class (the tree cell indented by the stylesheet) and popups (menus, the header filter) open in the top layer,
  placed by CSS anchor positioning against what opened them.
- DataTable and Table columns: width is a size token class (__w-<size>; a number snaps to the nearest token; the icon
  and checkbox columns __w-lead); a column without one shares the room left (__w-fill, never under 80px or its
  minWidth token). maxWidth is gone. hozAlign and headerHozAlign become classes. height is a size token (the body
  scrolls inside it) or "100%" (fills its container). Rows render all at once (no virtual scrolling).
- Moving rows (options.movableRows with a rowHandle column) and columns (options.movableColumns) is native drag and
  drop with a drop line; a header's resize grip and Fit to content snap its width to the size tokens. The "input" and
  "number" editors are a Plenix input. Events rowMoved and columnMoved reach on.
- The header, rows and columns are flex rows (data-table.css, table.css); their per-size rules are generated beside
  them (data-table-steps.css, table-steps.css, build-steps.js). tests/pages.test.js fails any style attribute, Tabulator
  included (722 pages: none).

## [0.24.0] - 2026-10-09

### Changed
- No style attribute anywhere outside Tabulator (Strict DS steps 6 and 7; owner: "strictly follow the DS.. no
  exceptions"). The design system's own samples (a token's swatch, radius, shadow, opacity, icon size, type, a demo box's
  width, a wireframe's grid) take their value as a generated class: DS.varClass(doc, name, value) writes one rule per
  property and value into the page's constructed sample sheet (document.adoptedStyleSheets: no element), DS.setVar and
  DS.sample use it, React samples use DS.sampleClass. The sample properties are named --ds-sample-<property>.
- check-system rejects every style object, style.setProperty and style write, custom properties included (until now an
  object of --plx- custom properties was allowed).
- tests/pages.test.js fails any page or frame with an element that has a style attribute (722 pages: none). Tabulator's
  own writes (Strict DS 6b, next) are counted apart until DataTable draws without them.

## [0.23.2] - 2026-10-09

### Changed
- The image editor draws only from steps (Strict DS step 5): its presets, crop ratios, fonts, slider ranges, zoom steps
  and overlay steps live in platform/patterns/ImageEditor/image-editor.steps.json; build-steps.js turns them into one
  rule per step (system/steps.css) and a module the page reads (IMAGE_EDITOR_STEPS). The picture takes attributes:
  zoom (1.25 to the step), brightness, contrast, saturation (with vibrance), hue and blur in their steps, the preset,
  the crop ratio, rotation in quarter turns and flips; a text its font, its top on a 5% grid and a data color (the text
  color is a ColorPicker); an overlay its opacity (5%) and scale (10%). No value is written in a style attribute.

## [0.23.1] - 2026-10-09

### Changed
- Panes snap to the size tokens (Strict DS step 4): dragging the navigation pane, a secondary pane (Files) or the side
  panel (Details) snaps to the nearest --plx-ref-size-* token within its limits, and the arrow keys step to the next
  one. The width reaches the stylesheet as data-plx-width (one generated rule per size); no width is written in a style
  attribute. PlenixWorkspace.setPanelWidth keeps a panel's width as an attribute on the page root, snapped the same way.
- SIZE_STEPS, snapSize and stepSize (utils/sizeSteps.js) are generated from the tokens by build-steps.js.

## [0.23.0] - 2026-10-09

### Changed (breaking)
- Data colors are hue names (Strict DS step 2; owner: "data colors from existing hues"): blue, green, purple, red, brown,
  gray, each a solid, a soft fill and the text on it (--plx-sys-data-color-<hue>, -soft, -on-soft, pointing at the
  palette colors the data already used; no new colors). A component sets data-plx-color and system/steps.css (generated
  from the tokens) applies the hue: Avatar.color (its soft fill and text; Avatar.background is gone), Card.accent,
  ColorSwatch.color, EventChip.color, ProgressBar.color. No color value is written in a style attribute any more.
- ProgressBar draws a known amount on the browser's own <progress value max> (Strict DS step 3): the function reports
  the amount and the design system styles it; no width is written. Unknown amounts keep the running fill.

### Added
- ColorPicker (with ColorSwatch): the data colors as swatch buttons, one pressed. DATA_COLORS lists the hues
  (generated from the tokens). ColorSwatch.tone previews a system surface (accent, surface, frost).
- The utility plx-u-bg-data (the data hue as a background); plx-u-bg-var (a style attribute) is gone.

### Changed
- The apps' data colors are hue names: projects, calendars, events, contacts and threads (avatars), categories, feature
  areas. The category color fields (Settings' category editor, the Asset Manager's new category, upload and details pane)
  and the accent choice are ColorPickers. Project color black became gray (no black data hue).
- Dead color helpers removed from the suite (TINTS, tint, hexOf, PROJ_COLORS, unused bg fields).

## [0.22.7] - 2026-10-09

### Changed
- The header brand starts at the header's own inset, the same distance from the window's edge as the utilities at the
  other end (owner: the distance from the page edge to the logo is universal); the switcher has no inset of its own.
- The mark is as tall as the two rows beside it: "Plenix" on a 20px label line and the application on a 16px one, the
  mark their sum (36px); the sign-in page's mark the same.
- The application switcher has no hover fill: it opens on a click, its chevron marks it as a menu (focus ring kept).
- Every card shows its icon before the heading in Tasks and Projects too (owner, batch 272).
- The design system's spec shows the recent changes: the card's icon, the color field, the account menu with the
  application's settings and Sign out. (batch 279)

## [0.22.6] - 2026-10-09

### Added
- The Plenix brand (owner's brand kit, unedited) in platform/brand/, with brand.json naming what each file is for
  (mark, mark on a blue background, favicon, logos, spec). build-brand.js (run by build-app.js) generates the mark's
  stylesheet (components/Brand/brand.css: a mask in the current text color) and brand/favicon.svg; nothing else names a
  brand file, so updating the brand is replacing the files and building (owner: "easy to update.. nothing hard coded").
  (batch 278)
- BrandMark: the mark, colored by the tokens; spec record "Brand mark" (Iconography > Product icons). (batch 278)
- The browser icon on every page (the apps, the asset manager pages, the design system). (batch 278)

### Changed
- The application switcher shows the mark before "Plenix" and the application's name; the header name is 200px
  (--plx-ref-size-200px; was 160px) so the names keep their room. (batch 278)
- The sign-in page's header shows the mark (brand.json markOnAccent) before the brand name, both read from
  platform/brand by services/auth/brand-css.js. (batch 278)

## [0.22.5] - 2026-10-09

### Changed
- BulkActions is always shown (owner: "make the menu always visible but grayed out until selection happens"): with
  nothing selected the bar is neutral (sunken surface, neutral border), reads "No assets selected" (strings.none),
  offers Select all, and every action, menu button and More is disabled; selecting enables them. (batch 277)
- The application switcher's inset is the same on both sides (12px); the brand's 4px start inset left its fill uneven.
  (batch 277)

## [0.22.4] - 2026-10-09

### Added
- ShowMore (with CollapsibleSection): "Show more (n)" / "Show less" under a list that shows only its first rows, with
  a chevron after the label, down to show more and up to show less (owner: "show more/show less needs an icon");
  aria-expanded. The DAM's category, collection and metadata-filter lists use it. Icon chevron-up (expand_less).
  (batch 276)

## [0.22.3] - 2026-10-09

### Changed
- Input type="color" is a square swatch the field's height with the compact corners, no border, padding or frame around
  the color (owner: "just a square swatch no outline container around it"); a focus ring on keyboard focus. The DAM's
  color fields drop their size utilities. (batch 275)

## [0.22.2] - 2026-10-09

### Changed
- The account menu no longer has Change picture: the picture is changed under My account (Settings > Account > Profile)
  (owner: "i never said to add change picture here... this is under my account"). (batch 274)

## [0.22.1] - 2026-10-09

### Added
- The full icon library: every Material Symbols Sharp symbol (4,150), weight 300, optical sizes 20 and 24, outline and
  filled, unedited, from the pinned commit, hosted with Plenix at /Plenix/platform/icons/library/ (index.json lists
  them; owner: "download all material svg icons.. i want them all hosted on plenix"). build-icons.js takes a symbol from
  the library when the working set has none, so adding an icon is one line in map.json. (batch 273)
- Icons drag (drag_indicator) and sign-out (logout). (batch 273)

### Changed
- The dashboard's move handle uses the drag icon; Sign out (the account menu, Settings > Account) has the sign-out icon.
  (batch 273)

## [0.22.0] - 2026-10-09

### Added
- Panel.icon: a card's icon before its heading (owner: "in all cards... ALWAYS the icon that represents the card is
  always on the left side before the heading"); the dashboard's seven cards show their applications' icons. (batch 272)
- The account menu (AppHeader.Account): My account, Change picture, Plenix settings, <app> settings (appSettings: the
  application's own settings, "Notes settings", "Asset Manager settings"), a divider, Sign out (signOut, default the
  sign-in proxy's /outpost.goauthentik.io/sign_out); a divider under the name and email. The person's picture is set
  with choosePicture() and useSession().setPicture (a 128px square, kept in this browser until the back end stores
  it); Settings > Account > Profile has Picture with Change and Remove, and its Sign out signs out. (batch 272)
- A selectable MediaCard selects on a click anywhere but its title, box and actions (owner: "clicking the card selects
  it"); its title or a double-click opens it. (batch 272)

### Changed
- TagInput's + is a chip: the tags' 20px height, border, corners and fill, a 24px target. (batch 272)
- A navigation row's actions (the saved searches' x) show on hover and keyboard focus only, always on touch; the pin
  keeps its own rules. (batch 272)
- The side panel's footer actions sit at its end, the primary last (Cancel, then Save). Tabs in a side panel use the
  Folder variant. (batch 272)
- AppHeader.Action (Upload, Capture) is an icon item with its label as the tooltip. (batch 272)
- The dashboard's move handle icon is the next size up (md). (batch 272)

### Fixed
- The header's account picture showed a fill on the browser's own hover (the 0.16 rule covered only the scripted
  hover). (batch 272)
- The design-system docs called Table "retired" (Codex M-02); the work log is backfilled for batches 235-264 (M-05).
  (batch 272)

## [0.21.2] - 2026-10-09

### Added
- Platforms in the design system (owner: "respect the platform native interactions"): Plenix runs on the web, iOS
  and Android. The theme owns the look on every platform (color, DM Sans, radius, motion, the focus rule); each platform
  owns sizes, targets and behavior from its published standard (Apple HIG, Material 3, WCAG 2.2), and platform minimums
  beat theme and density. Every interactive component page has a Platforms section after Behavior; Button, Text field,
  Switch and Side navigation are filled in, every value with its source type (rule, token, system, reference, Plenix)
  and a link to its source. Device behavior, Control heights, Breakpoints, Bottom navigation and 14 › Mobile web,
  Desktop, iOS and Android have a Platform specification: the model, how values are sourced, touch targets, spacing
  between targets, the window classes Narrow (under 600), Medium (600–839) and Wide (840 and up), type, screen and
  keyboard, navigation and back. Plenix decision 11 in STANDARD.md; check-spec.js checks the section order. (batch 273)

## [0.21.1] - 2026-10-09

### Fixed
- Menus open on top of everything (owner: "the correct standard for any menu is to always be on top"): a Menu opens in
  the browser's top layer (popover="manual"), placed beside its trigger by CSS anchor positioning (anchor-scope on the
  wrapper, anchor-name on the trigger, position-area per placement, flipping at the window's edges); no card,
  checkbox, pane or scroll area covers or clips it, and nothing is written inline. Browsers without anchor positioning
  keep the previous placement. Verified in Chrome and Firefox 157. (batch 272)

### Changed
- Menus, the combobox list and the app switcher take the lowest radius role, --plx-sys-radius-surface-4px (owner: "the
  lowest size in the existing DS"; --plx-ref-radius-2px is a reference value, which stylesheets may not use for a
  themeable radius). (batch 272)

## [0.21.0] - 2026-10-09

### Changed
- TagInput is a + button (owner: "it should be a + and clicking that plus exposes the textfield"): pressing it reveals
  the field, focused; Enter adds the tag and keeps the field open for the next; Escape, or leaving it empty, closes it
  and returns focus to the +. New props label (default "Add a tag") and collapsible (default true). (batch 271)
- Lists align with their section (owner: "the alignment of the list should align with the alignment of the header
  underline"): ActivityList rows have no inline inset, so a row's content starts and ends at the list's edges; a row
  that opens keeps a small inset for its hover fill, pulled back by the same token. (batch 271)
- Drag and drop shows the grab cursor on a handle and grabbing while dragging (DataTable row handles, WidgetGrid
  handles). (batch 271)

### Fixed
- A thin line under the open tab at fractional display scales (125%, 110%): the tab list clipped the open tab's joint
  with the panel; the list now reaches one thin line further and gives it back, and the open tab draws its own joint.
  Clean at 100-200%. (batch 271)

## [0.20.2] - 2026-10-09

### Changed
- Inline fields stay side by side (owner: side by side takes less height; "the side by side is utilizing a very wide
  width for the fields... no reason to"; "use tooltip to show the label"): in a group the control column runs from
  --plx-sys-field-width-md to --plx-sys-field-width-lg, packed to the start, so controls never stretch; when space is
  short the control keeps its minimum and the label shortens with an ellipsis, its full text in a Tooltip; the label
  moves above only below 180px (the value of --plx-ref-size-180px). PropertyList's columns do the same. (batch 270)

### Added
- Tooltip disabled: neither shows nor describes its trigger (for a label that only needs it when cut short).
  useTruncated(ref) in utils/overflow.js tells when a one-line text is cut short. (batch 270)

## [0.20.1] - 2026-10-09

### Fixed
- Narrow panels (owner: "the text is going outside the lines!! This needs to be responsive", option A, no new tokens): a
  Stack of inline Fields shares one label column as wide as its longest label (at most --plx-ref-size-160px), so there
  is no dead space between short labels and their fields; below 320px of width (the value of --plx-ref-size-320px; a
  container condition cannot read a custom property) every label moves above its control. PropertyList's columns do the
  same, and its values wrap between words only ("1.4 GB" and "Jul 3, 2026" stay whole). Rating's stars close their gap
  in a narrow group. The Asset Manager's color and hex wrap together. (batch 269)

## [0.20.0] - 2026-10-09

### Changed
- TagInput is a text field like every other input control (owner: "make it consistent with the rest of the UI"): it
  takes .plx-input's border, hover, focus (border color only) and disabled states and height; in a tag list it fills
  the rest of the row. New prop onAdd(text): Enter adds the trimmed text and clears the field (the application ignores
  a tag it has). The Asset Manager's Tags and the add-asset dialog use it. A tag being renamed is a small field with
  the input's focused border (it was a blue underline shadow). (batch 268)
- "DataGrid" / "data grid" is gone from every active file (owner: "nowhere"): the reference file is
  docs/data-table-reference.html (was datagrid-tabulator-demo.html), the Data table alias and the orphan "Data grid"
  guidance entry are removed, guidance says "data table", and the two Fluent 2 mapping rows that named its
  "Data grid" are dropped. Only the changelog and the work log keep the old name. (batch 268)

### Fixed
- The design system's usage.js said 0.19.0 in git after the 0.19.1 release (the deploy regenerated it). (batch 268)

## [0.19.1] - 2026-10-09

### Changed
- Strict design system, step 1 (owner: "strictly follow the DS.. no exceptions": no value in a style attribute, not even
  a custom property). Values from the data now arrive as attributes, and the new generated stylesheet
  platform/system/steps.css (build-steps.js, run by build-app.js) has one rule per allowed step: Tree indents from
  aria-level, MediaCard and Preview shapes from data-plx-aspect, Skeleton sizes from size-token names (width="200px"),
  and TimeGrid's hours, days and events (quarter hours, at least 30 minutes). The suite's icon takes its container's
  size by a class (.plx-u-icon-box replaces the -var pair). Every measured position and size is unchanged. (batch 267)

## [0.19.0] - 2026-10-09

### Changed
- Design system: every variant card is a tabbed card (owner decision, "option D: tabs", with the Folder tabs). The
  header keeps the variant's name and "Its page ›"; under it the Platform Tabs (variant="folder"): Preview (the live
  sample alone, centered with generous padding on the plain surface, its edge a thin border-default line; no gray
  stage, batch 156), Props and class (the prop that selects it, its class, the attributes the class sets) and Code (the
  usage, colored, with Copy). "Show code" left the header. The per-variant pages show the same tabs. Examples that are
  not variant cards and Base cards are unchanged. The old side-by-side layout (Split, .ds-split) is gone. The Preview
  has no frame of its own: the card sits in its group's panel, so a frame would be a third container (the nesting
  rule). (batch 265)
- Design system: the States section draws the states side by side (owner: "side by side with vertical line divider in
  between... autosize so it does not wrap"): each column as wide as its sample, a thin divider between columns,
  continuing on the next line when the panel is full. Button keeps a card per state, as does any component with a
  sample wider than the panel (tables, dialogs, headers). (batch 266)

## [0.18.0] - 2026-10-09

### Added
- The Button treatment for Counter, Status dot, Notice, Spinner and Progress bar (owner: "every variant for every
  component"): component tokens (count, status-dot, notice, spinner, skeleton, progress-bar), a lab for each that draws
  every variant with each value's token and an Edit dialog (display-labs.js), and a page for each of their 28 variants
  in the navigation. Progress bar's tones are now tokens (--plx-comp-progress-bar-{tone}-fill). Nothing changes on
  screen. (batch 264)
- The component lab passes the chosen content to a lab's token lookup, for parts some content leaves out (a progress
  bar of unknown amount has no value text). (batch 264)

## [0.17.0] - 2026-10-09

### Added
- Badge has the Button treatment (owner: "every variant for every component to have navigation and design specs just
  like we did for the buttons"; the first of 49 components): 29 component tokens (--plx-comp-badge-*), a lab that draws
  every tone, style and size with each value's token and an Edit dialog (display-labs.js), and a page for each of its
  nine variants in the navigation. Nothing changes on screen. (batch 263)

### Fixed
- tokenize-component.js rewrote a stylesheet's comment when it held a brace (".plx-badge--{tone}"); comments are now set
  aside before the rules are read. (batch 263)

## [0.16.2] - 2026-10-09

### Added
- The spec's Edit dialog saves (owner, items 10/11): it shows who is signed in (Authentik), and Save opens a pull request
  with the changed tokens after the save service rebuilds them and runs the system check. Signed out, a Sign in link that
  returns to the same page; a Viewer, why Save is off; a conflict, a failed check, an unconfigured server or a page
  without the service, its own message and the changes to copy. (batch 262)

## [0.16.1] - 2026-10-09

### Fixed
- The design-system spec failed to load in 0.16.0 (a quote in a variant card caption); 0.16.0 was never deployed. Same
  changes as 0.16.0. (batch 261)

## [0.16.0] - 2026-10-09

### Added
- Preview `aspect` (owner: "this preview area should be based on standard image proportions"): "4/3" (default), "3/2",
  "1/1" or "16/9", as MediaCard's. It was a 140px-high strip (about 2:1). (batch 261)
- Token --plx-comp-side-panel-width-default: the navigation pane's width. (batch 261)

### Changed
- SidePanel opens as wide as the navigation pane (owner: "the right pane default size should be the same size as the left
  pane"), and can be dragged down to it (min was 280px). (batch 261)
- Card and MediaCard, selected (owner: "use the primary token color 1px border"): a 1px border in
  --plx-sys-action-primary-background, without the ring. (batch 261)
- The header's account picture gets no fill around it on hover or while its menu is open (owner: "no need to make this
  enlarge when hovered"). (batch 261)

### Fixed
- MediaCard clipped everything inside it, so its actions menu was cut off at the card's edge (it looked like a layering
  fault; the menu's layer token was right). The picture now clips itself to the card's inner corners and the menu shows in
  full. (batch 261)

## [0.15.0] - 2026-10-09

### Added
- ActivityList `stacked` (owner: "put the '## files…' on a second line in the smallest font available in the tokens"):
  the meta sits on its own line under the title in --plx-ref-font-size-09, the smallest type token. The Asset Manager's
  Downloads lists use it, and the "Download by File Type" heading is now sentence case. (batch 260)
- Token role --plx-sys-fill-neutral-border: gray-300 in light, gray-900 in dark, two shades darker than
  --plx-sys-fill-neutral. (batch 260)

### Changed
- Tag (owner: "add a border 2 shades darker than the color of the bg"): a thin solid border in
  --plx-sys-fill-neutral-border. Chips are unchanged. (batch 260)
- The spec now has variant cards for ActivityList "Stacked" and SidePanel "Resizable"; check-spec treats
  plx-side-panel--resized as a state the panel sets, not a variant. (batch 260)

## [0.14.0] - 2026-10-09

### Added
- SidePanel `resizable` (owner: "the right pane also needs the ability to resize"): its start edge is dragged or moved with
  the arrow keys between --plx-comp-side-panel-width-min (280px) and -max (560px); Home and End jump to them; the width is
  remembered. The Asset Manager's details panel uses it. (batch 259)
- SecondaryPane `onClose` (owner: "resize, expand/collapse and close… the close is based on the application"): a standard
  Close button ends the header row, given only by an application whose pane can close. The Asset Manager's Files pane now
  resizes, folds to a rail and closes. (batch 259)
- Tabs `variant="folder"` is a documented variant, "Folder" (owner: "just the header part of the tabs… give it a name"):
  the tab strip alone over a baseline, the open tab joined to it, the content unframed. (batch 259)

### Fixed
- Tabs, contained: the panel's side edges were inset shadows and its top and bottom real borders, which render differently
  at fractional display scales (the left edge looked heavier). All four edges are drawn alike now, inside the panel.
  (batch 259)

## [0.13.2] - 2026-10-09

### Changed
- Sentence case (owner, item 5; the design system's content standard): UI labels, actions and document headings across
  the suite were Title Case ("All Tasks", "New Project", "Project Title", "My Account", "The Problem"). 82 strings now
  read in sentence case ("All tasks", "New project", "Project title", "My account"). Names stay: people, companies,
  products and apps (Google Drive, Asset Manager, Dashboard), sample records, and the product spec's entity, feature and
  module names. AppHeader's account menu says "My account". (batch 257)

### Added
- Design system: the Field lab (batch 256): "All fields" (stacked, inline, row × default, info hover, info focus, info open,
  invalid, required; the default or small label column) and five variant pages (Stacked, Inline, Row, a small label column,
  with an error), the anatomy and the Edit dialog on the field tokens: the label, required mark, description, error, the (i)
  button and its hit area, the info text and every layout gap (888 checks, 43 tokens). DS.table takes a minimum column
  width, so wide specimens scroll instead of overlapping. The form controls now have the Button treatment.
- tests/labs.test.js (npm test, CI): every component lab, at every size, variant, state and content: each Edit dialog
  field's token must move the property it names (3,910 checks over seven labs).

### Added
- Design system: the Checkbox, Radio group and Switch labs (batch 255). "All checkboxes" (unchecked, checked, partly checked
  × default, focus, disabled), "All radio groups" (column, row) and "All switches" (off, on), and nine variant pages, each
  with the lettered anatomy and the Edit dialog on the check, radio-group and switch tokens: the box, focus outline, label,
  description and spacing; the legend; the track and its knob (.plx-switch__track::after, its travel when on). Mapping
  proof: 120, 89 and 101 checks. The shared lab measures inner parts (p.part), draws its legend from a component's parts
  (spec.anchors: each letter points at its part) and runs spec.after for what markup cannot say (indeterminate). The
  "All" pages read "switches", "checkboxes".

### Added
- Design system: the Text area and Native select labs (batch 254). Each gets "All text areas" / "All native selects" and
  seven state pages (Empty, Filled, Focused, Read-only, Disabled, Invalid, Required) with the lettered anatomy and the Edit
  dialog: the input tokens plus the text area's own type, height and block padding, and the select's end padding, width
  and chevron (read from .plx-select::after). Mapping proof: 156 and 192 checks, every field moves exactly its property.
  The three input-family labs share one builder (form-labs.js); the shared lab reads a wrapper's properties (host:
  parent), and the anatomy lists left and right padding apart when they differ.

### Added
- Design system: the Text field lab (form-labs.js; batch 253). Text field · Base gains "All text fields" (every style in
  every state, at each width) and 13 variant pages: XS, SM, MD and LG; Data and Emphasis; Empty, Filled, Focused, Read-only,
  Disabled, Invalid and Required. Each lab page has the lettered anatomy, the attributes and the Edit dialog, one
  --plx-comp-input-* token per field (the placeholder color too). Mapping proof: setting each token moves exactly its
  property in every width, style, state and content (2,364 checks, 24 tokens). The shared lab reads pseudo-elements and
  knows widths and line heights; the All page opens the page of the state clicked.

### Changed
- Design system: the Button lab is now the shared component lab (component-lab.js; batch 252). A component registers a
  description of itself (sizes, variants, states, content, its property-to-token map, its markup) with DS.registerLab(id,
  spec), and the item pages draw any registered component's matrix, variant anatomy and Edit dialog (spec.js looks the lab
  up by the item's id; it called the Button lab by name). button-lab.js is the Button's description. The Button pages
  (base, All buttons, five variant pages, the Edit dialog) are pixel-identical before and after. First step of the form
  controls' labs (owner: one shared lab; every page).

## [0.13.1] - 2026-10-09

### Fixed
- @plenix-ds/react: a DataTable in an app built with a bundler (Vite, webpack) never drew: it looked for Tabulator next to a
  Plenix script the page does not have (404 on /platform/vendor/). The npm build now falls back to the release's CDN copy,
  https://design-system.lighthouseway.org/cdn/<version>/vendor/ (versioned, never changes); window.PlenixVendorBase still
  overrides it. Found while building the starter template (plenix-ds/plenix-starter). (batch 251)

## [0.13.0] - 2026-10-09

### Added
- Nesting rule (owner: "never 3 containers nested… 2 is okay but never 3"): platform/system/nesting.css. Panel, Card, a
  contained Tabs panel, CodeBlock, Notice, Fieldset, DropZone, Table and DataTable nest two deep; a third inside those two
  draws no frame (transparent border, no shadow; nothing moves). An audit found 55 triple nests (Panel > Panel > Table,
  Panel > Tabs panel > Table, Panel > Panel > DataTable); none remain. tests/pages.test.js now fails any of its 631 pages
  with three framed boxes nested (anything framed on three sides or by a shadow; design-system specimens exempt), and
  STANDARD.md §02 states the rule. (batch 250)

## [0.12.1] - 2026-10-09

### Fixed
- Tabs, contained (owner: "the left corner of the tab container is not consistent with other corners"): the panel's top-left
  corner was always square; it is rounded like the others and square only while the first tab is open, where that tab
  meets it. (batch 249)

## [0.12.0] - 2026-10-09

### Changed (visual)
- Table and DataTable (owner: "compare the two… the tabular is accurate"): a row label (rowLabel, the shaded first column)
  is the row's name, so it takes the name column's medium weight (--plx-comp-[data-]table-name-font-weight), also for links
  and Text inside it. Reference tables (props, tokens, classes) now read like the DataTable. (batch 248)

## [0.11.0] - 2026-10-09

### Changed (visual)
- One typography in every table (owner: "it's extremely frustrating to see typography not consistent"). An audit of all
  text in 212 tables (apps and design system) found DM Mono at 11–12px from Text variant="data" and token/class links
  inside cells, and List items at 13px in 12px tables. Now any Text, code or List inside a Table or DataTable cell takes
  the cell's font and size (color and weight stay), and the design system's token and class links use .ds-code-link
  (the data font in prose, the table's font in a cell) instead of the !important utility. Result: every body text is
  DM Sans at the table size (12px Compact, 13px Standard), regular, with names medium; badges, tags, chips and buttons
  keep their component sizes. tests/data-table.test.js now fails on any other font or size in a table and covers the
  design system's reference tables (25 views). (batch 247)

## [0.10.0] - 2026-10-09

### Fixed
- DataTable (owner: "uncheckbox does not really work"): a checked row checkbox could not be unchecked: in the "click" range
  mode the rows use, Tabulator's checkbox read a plain click as "only this row", and an extra cell handler toggled again.
  The row checkbox now toggles its row (Shift and Ctrl/Cmd keep range and add); the cell around it acts as a row click.
  (batch 246)

### Changed (visual)
- Table and DataTable (owner: "this typography is not consistent"): kind "data" cells no longer use the muted color; they
  take the row's color (also a selected row's), so every cell reads alike: one font, size, color and baseline. (batch 246)

## [0.9.0] - 2026-10-09

### Changed (visual)
- Table and DataTable typography (owner: "if it's problematic, simply use DM Sans"): kind "data" cells were DM Mono at
  12px beside DM Sans at the table size (13px at Standard), so a row's cells sat on different baselines and code-like
  values looked smaller. They now use the table's DM Sans and size (--plx-comp-table-data-font-family and
  --plx-comp-data-table-data-font-family -> typeface-sans; the data font sizes -> the table font size), still muted.
  (batch 245)

## [0.8.5] - 2026-10-09

### Changed (visual)
- Table and DataTable (owner: "the border right should be solid without any space top and bottom"): a row header (rowLabel)
  ends in one solid line, top to bottom of each row and the header; the next column's short line gives way. Table now
  has the solid edge the DataTable already had. (batch 244)

## [0.8.4] - 2026-10-09

### Changed (visual)
- App switcher (owner: "should not have any scrolling… it can be wider… whatever is pinned should not be repeated"):
  600px wide with five applications to a row and no height limit or scrolling (a phone-sized viewport keeps 320px and
  three to a row); each application shows once: pinned ones under "Pinned to the header", the rest under "More
  applications" ("All applications" when nothing is pinned; hidden when everything is). (batch 243)

## [0.8.3] - 2026-10-09

### Changed (visual)
- NavList (owner: "in categories, also show the open folder when selected"): the current item's "folder" icon shows as
  "folder-open" (filled, like every current icon); the Asset Manager's categories follow. (batch 242)

## [0.8.2] - 2026-10-09

### Fixed
- Tree (owner: "this selected folder should be in open state"): the selected item shows its open icon, filled (a selected
  folder is an open folder), also when it has no children. (batch 241)

## [0.8.1] - 2026-10-09

### Fixed
- Tree (owner: "only the open icons should be fully shaded"): a selected item filled the icons of every item inside it,
  because the icon set fills icons under any selected element and a tree item holds its subtree. A tree row's icon now
  follows its own item only: outline while closed, filled while open (also at Comfortable density's 24px). (batch 240)

## [0.8.0] - 2026-10-09

### Added
- Tree (owner: "use open folder in the tree when a folder is opened"): an open item shows its open icon: a "folder" item
  opens as "folder-open" (Material Symbols folder_open, already in the set), and nodes[].openIcon names any other pair.
  The Asset Manager's folder trees follow. (batch 239)

## [0.7.0] - 2026-10-09

### Added
- Badge: variant="soft" (owner: yes to a soft Badge): the tone's text on its pale fill, the pair Notice uses
  (--plx-sys-feedback-{tone}-soft and -content), quieter for many statuses in a dense list. Every tone passes AA in both
  themes (lowest: danger in dark, 4.58:1). Class plx-badge--soft; design system: Badge › Variant. (batch 238)
- Pressed colors (owner: yes to a darker pressed fill): new roles --plx-sys-state-pressed, -state-selected-pressed,
  -fill-neutral-pressed, -action-primary-background-pressed and -action-danger-background-pressed (light: gray-200,
  blue-200, gray-300, blue-700, red-700; dark: gray-600, gray-600, gray-600, blue-700, red-700; existing palette colors).
  Button: 13 tokens (--plx-comp-button-size-{s}-pressed-background, --plx-comp-button-{variant}-pressed-background and
  -border) and :active rules, .is-pointer-down to draw it; the Button lab has a Pressed state, and the design system's
  States panels read :active as "Pressed (held)" (a state inside :not(…) no longer counts as that state). On the accent
  header, secondary buttons use --plx-sys-accent-state-pressed (light blue-700, dark gray-700). Menu items, tree rows, row
  buttons, activity items, nav items, tool rail items, pagination and chips take the pressed fill while held; selected
  and current items keep theirs. Danger has no darker red in the palette, so its pressed role is red-700 like hover for
  now. (batch 238)

### Changed (visual)
- Tree (owner): the open control is a + box on a closed row and a − box on an open row (Material Symbols add_box and
  indeterminate_check_box, unedited, the 16px square; icon names square-plus, square-minus) instead of the turning
  chevron. (batch 238)

### Fixed
- Badge and Count: the warning tone failed WCAG AA contrast (white text on brown-500, 4.46:1). New semantic roles
  `--plx-sys-feedback-{tone}-solid-label` (light and dark) are the fill behind text: warning points to brown-800 (8.34:1),
  the other tones to the same colors as `-solid`. Badge and Count's pill use them; StatusDot, ProgressBar and Toast keep
  `-solid`. Warning badges and counts are darker brown; every tone and size passes in both modes. (batch 228)

## [0.6.0] - 2026-10-09

### Changed (visual)
- Feel (owner: "I want it very snappy… responds instantly… crisp animations"): every control answers at once. Hover colors
  and edges fade in over 80ms instead of switching; buttons, chips, segmented items, tiles and small icon controls shrink
  to 98% while pressed (rows, tabs and menu items keep their hover fill); menus, combobox lists and dialogs pop in (fade
  and grow from 96%) in 120ms from their anchor corner, and the modal backdrop fades in. Drawers and toasts keep their
  slides. New tokens: --plx-ref-motion-duration-instant (0.08s), --plx-ref-motion-ease-out, --plx-ref-motion-scale-98 and
  -96; theme roles --plx-sys-motion-duration-instant, --plx-sys-motion-ease-enter, --plx-sys-motion-press-scale,
  --plx-sys-motion-enter-scale. The rules are in system/motion.css with zero specificity (:where), so a component's own
  transition still wins; reduced motion still turns all of it off. (batch 236)

### Added
- Loading: DataTable.preload() and Table.preload() start loading Tabulator before the first grid mounts; the Asset
  Manager and Files call it as they start. Every other page prefetches Tabulator into the cache once idle after load.
  (batch 237)
- Next page ready before the click: in Chromium browsers a same-site link is prerendered when the pointer rests on it
  (speculation rules, moderate eagerness), so switching apps shows the finished page at once; other browsers fetch the
  page on hover. Links with target, download, data-plx-no-prefetch or a same-page anchor are skipped; nothing runs from
  file://. (platform/utils/prefetch.js, batch 237)
- Deploy: live app pages drop the development audits (radius-audit.js, style-audit.js) and preconnect to the CDN; the
  hosted design system loads one bundled stylesheet (platform/dist/platform.bundle.css) instead of platform.css and its
  imports: 12 stylesheet requests instead of 107, computed styles identical. (batch 237)

## [0.5.0] - 2026-10-09

### Changed (visual)
- Tables (owner: "data grid should be merged into data table… Table should have the same UI as data table except it is purely
  static"): DataGrid is DataTable (components/DataTable, plx-data-table, --plx-sys-data-table-*, --plx-comp-data-table-*;
  no "grid" name left), and Table is back as the static table: the same Tabulator engine and look (its own tokens
  --plx-sys-table-*, --plx-comp-table-*, equal to the DataTable's: computed styles identical in light and dark at each
  density) with no hover, sorting, filters, menus, selection, resizing, moving or editing. Reference tables use Table: the
  design system's props, attributes, states, classes and token tables, Settings' documentation and fact tables,
  Capture; record lists stay DataTables. Design system: Table and Data table items (#/data-display/table,
  #/data-display/data-table), the group is Tables, Data grid merged into Data table (STANDARD.md §3 updated). Tests
  renamed tests/data-table.test.js and tests/data-table-reference.js (180/180). (batch 234)
- Light-theme shadows: shadow-sm, -md, -lg, -card, -raised and -menu were opaque gray (gray-100/200/300), which glowed
  white over the blue header. They are now layered black at 14% (--plx-ref-color-black-alpha-14), an outer blur and a tight
  inner one, equal on every side (no offset), over the same 1px gray-200 edge; e.g. menus 0 0 40px + 0 0 8px. Dark theme
  unchanged. (batch 235)

## [0.4.0] - 2026-10-08

### Fixed
- Regional density for component tokens: a Button inside a compact or comfortable region (data-plx-density on part of a
  page) kept the page's size since 0.2.0, because component tokens were declared only on :root (a custom property is
  computed where it is declared). Component tokens are now written on :root and on every density and interaction
  context. No app page used a density region, so nothing changed on screen; tests/density.test.js guards it. (batch 221)

### Added
- ActionBar (new pattern): a page's or a form's buttons on the right, the primary last, in a bar that sticks to the
  bottom of the scrolling page (owner: buttons on the right, in a bar that sticks to the bottom of long pages and all pages
  with actions). SettingsSection's actions are drawn in one; the Asset Manager's system settings and My account use it,
  with a destructive action first and the primary last. Tokens --plx-comp-action-bar-*; a scrolling area sets
  --plx-comp-action-bar-stick to minus its bottom padding so the stuck bar is flush. Design system: Action bar
  (#/actions/page-actions). Dialog, panel and side panel footers were already on the right. (batch 231)
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

### Removed
- Every name/value table is a DataGrid (owner: "everything must be tabular"): PropertyList's table variant, its stylesheet
  rules and --plx-comp-property-list-label-width are removed; the design spec's fact tables (props(), prop and class),
  Settings (baseline operations, functionality, enablers, UI, the product vision's tables, the mapped example) and
  Capture draw DataGrids (names as the row header, values wrap, no header row). The app grids drop the old Table's
  habits: Files and Projects lose the shaded name column, Type is a technical value (no chip) in Files, Projects and
  Search, sizes align to the end. check-system rule tables also rejects the PropertyList table variant. (batch 229)
- The Table component (components/Table), system/table.css (.plx-data-table) and the 33 table tokens
  (--plx-sys-table-*, --plx-comp-table-*): every table is a DataGrid. PropertyList (variant "table") and ActivityList take
  the grid tokens (row height, lines, header shade); PropertyList gets --plx-comp-property-list-label-width. check-system
  rule tables rejects a <table>, a table element made in code, an import of Table and the retired table classes;
  tests/pages.test.js fails any page that shows a <table>. The design system's Data table item is now Data grid
  (#/data-display/data-grid): how to apply it, every part of its style with its tokens, one live grid. (batch 226)

### Changed (visual)
- Dark navigation borders are visible: --plx-sys-state-hover-border and --plx-sys-state-selected-border in dark are
  gray-500 (two shades lighter than the gray-700 fill; was gray-850). Large cards use two stacked cards (view_agenda;
  crop_square removed). Design system: the Action bar leaf is the ActionBar's home, Data toolbar moves to Action panel.
  (batch 233)
- Menus have a shadow again (owner): --plx-sys-elevation-menu points to --plx-sys-shadow-menu (was none, decision D9), so
  the Menu, the Combobox list and the app switcher float with the same soft shadow and border. Property table and
  Comparison table now lead to the Data grid page. (batch 232)
- Navigation rows (NavList, Tree): hover and the current row fill the whole row, pin included, with an inset border two
  shades darker in the same color family: new roles --plx-sys-state-hover-border (light gray-300, dark gray-850) and
  --plx-sys-state-selected-border (light blue-250, dark gray-850). The app switcher panel takes the Menu's real border
  (its inset border was hidden under its tiles). The Asset Manager's View and Card size controls show icons (grid,
  table rows; small, medium, large cards: Material Symbols added unedited). (batch 230)
- Button labels no longer cut letters that reach below the line (the g in "Tagging"): the Button's line height is
  1.3 (--plx-comp-button-line-height = line-height-tight, was 1); button heights are unchanged. (batch 227)
- Fonts are hosted with the Platform: DM Sans (variable 300–700, italic) and DM Mono (300, 400, 500, italic) in
  platform/fonts with platform/system/fonts.css (SIL Open Font License); every page preloads DM Sans and no page calls
  Google. The styles package and the CDN carry the font files beside fonts.css. check-system rule fonts rejects a call
  to Google Fonts. The package build's default theme path (renamed in batch 219) is fixed. (batch 227)
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
