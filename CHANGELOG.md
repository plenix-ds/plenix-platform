# Changelog

All notable changes to Plenix: the packages (`@plenix-ds/tokens`, `icons`, `styles`, `react`), the CDN and the API.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow `VERSIONING.md`.
The batch numbers point to the work log (Plenix - DAM/audit/batches/).

## [Unreleased]

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
