# Spec wording: questions for the owner

Strings left exactly as they were, because changing them needs a decision. Answer any you like; the rest stay.

## layout (15 questions)

### grid

- **rec.text / docs.anatomy:** The overview names the page grid class `.plx-layout-grid` (12 columns at most, contained at 1200px), but the Anatomy lists `.plx-page-grid` (up to 16 columns) and gives different breakpoints (600, 1024, 1440px instead of 600 and 840px). Are these two different grids that both belong on this page, or is one of them outdated?
- **rec.text:** The contained grid stops at 1200px here, but the One-column layout and Panel pages say the contained layout is 960px wide. Are these two different "contained" widths on purpose?
- **rec.text:** This page says Columns collapse to one column on narrow windows, but the Two-column layout page says its columns "stay side by side at every width" and "do not stack", while the Collapse page describes collapseBelow. Which is right for Columns today?

### dashboard-grid

- **rec.text / docs.behavior:** The overview says a click on the handle opens a menu (Move earlier, Move later, Move to the start, Move to the end), but the Behavior and Anatomy sections describe only dragging and arrow keys. Does the handle menu exist, and should Behavior mention it?
- **rec.purpose:** The page purpose describes the whole dashboard page (several applications in one workspace), while the written Purpose describes only the widget grid (arranging widgets). Which purpose should this page carry?
- **rec.variantPages[4].avoid[0]:** "Every widget: the grid becomes one column, use fewer columns" is hard to follow. Does it mean: do not make every widget wide; if all widgets need to be wide, choose fewer columns instead?

### panel

- **rec.text:** The Panel page overview describes PageContent and Center (the page content container), not Panel. Should Panel get its own overview, and does the PageContent text belong on another page?
- **rec.purpose:** The Panel purpose also contains the Stack purpose and the Grid purpose, copied from those pages. Should those two sentences be removed from Panel?
- **docs.a11y.focus:** "The toggle has no focus style of its own in card.css; it relies on the browser's default ring." Is this still true, or does the collapse toggle now use the Plenix focus ring like other buttons?

### columns

- **rec.text / rec.purpose:** The Two-column layout overview describes the two-pane list-and-detail workspace (SecondaryPane), and its purpose describes the application shell, while the written Purpose describes Columns (two or three equal groups side by side). Which text belongs on this page?
- **rec.use[1]:** "Lists whose items are read one at a time (notes, messages)" describes a list-and-detail screen (Split pane), not equal columns. Should it move to the Split pane page?

### layout-spacer

- **rec.purpose / docs:** The Spacer page shows the Stack purpose and the full Stack write-up (anatomy, behavior, accessibility). Should Spacer show only its own text (push and Toolbar.Spacer) and point to Stack for the rest?

### layout-inset

- **rec.purpose / docs:** The Inset page shows the Stack purpose and the full Stack write-up. Should Inset show only its own text (inset tokens and Bleed) and point to Stack for the rest?

### layout-full-screen-workspace

- **rec.variantPages[0]:** The "Full-screen experience" variant has placeholder text ("composed from existing Platform controls", use for "The matching page purpose", avoid "Unrelated workflows"). What should this variant say, or should it be removed?

### sticky

- **rec.text:** The overview says the region "shows a shadow only while it is stuck", but there is also an "Always" variant where the shadow shows at all times. Should the overview say "by default" (only while stuck, or always with the Always option)?

## forms (21 questions)

### color-swatch

- **rec.text / docs.anatomy[1]:** The overview and the "Square (default)" variant say a swatch is square with 2px corners by default, but the anatomy says "round (default) or square". Which shape is the default? Both strings are left unchanged until you decide.

### creatable-select

- **rec.text / docs.anatomy[2] / docs.a11y.focus:** The overview says the add-a-tag field is "a text field like every other (owner, batch 268)", but the anatomy calls it a borderless text field and the focus row says it shows an underline focus shadow (fields elsewhere change only their border on focus). Is the anatomy and focus text out of date? Left unchanged.

### search-input

- **docs.behavior.responsive / docs.a11y.contrast:** The width rule ends "White, outlined, the height of the buttons beside it", but the contrast row says it uses the neutral fill (fill-neutral) on page surfaces. Is the field white or the neutral fill? The long width rule was not rewritten until this is settled.

### radio-group

- **rec.avoid / variantPages:** The pages give different option counts for when to switch controls: Radio group says more than about seven options means a select; the Radio page says two to five options; Select says up to about ten; Combobox says fewer than seven means a select; Segmented control says two to five. Which numbers should every page use? Left unchanged.

### forms-required-indicator

- **rec.avoid[0]:** This page says "Marking optional fields instead" is something to avoid, but the Text field, Text area and Native select "Required" variants say to mark the optional fields instead when most fields are required. Which rule is right? Left unchanged.

### forms-form

- **rec.purpose / docs:** The Form page (and Label, Help text, Required indicator, Validation message) shows the Field page's purpose and write-up word for word. For Form in particular the purpose describes one field, not a whole form. Should Form get its own purpose (and these pages their own write-ups), or is showing Field's text intended? Left unchanged. The Field rewrites above were also applied to these copies so they stay identical.

### forms-url-field

- **docs.content.errors:** The URL, Telephone and Password field pages show the Text field write-up, whose error example is "Enter a valid email address". Should these pages get an example that fits them, or is the shared Text field text intended? Left unchanged.

### drop-zone

- **docs.a11y.focus:** As a button the drop zone is reached with Tab, but the focus row says it has no focus style of its own. Is a focus ring missing in the component, or does the text need to say where the focus shows? Left unchanged.

### forms-toggle-button-group

- **rec.purpose / docs.purpose:** The purpose of the toggle button group also describes its look (bordered joined segments, the blue tint of the chosen one, your note "look A, owner, 2026-10-14", no gray track or white thumb). Most of that look is already in the Anatomy list. Should the look leave the purpose (keeping your note with it, for example in Anatomy or Details), so the purpose only says what the component is for?

### swatch-picker

- **rec.variantPages[0].text:** The data palette lists brown among its colors (blue, green, purple, red, brown, gray). Since the color consolidation retired Brown as a category color, is brown still one of the data colors, or should this list change?

### field-style-variants

- **docs.behavior.pointer, docs.behavior.focus, docs.behavior.error:** These rows say hover, focus and invalid change "the border or the line". "The line" refers to an underlined field style, but only two looks exist now (outline and filled, both with a border). Should "or the line" be removed from these three rows?

### number-input

- **docs.a11y.contrast:** "The field’s text and border contrast; the buttons are Buttons." is unclear: it does not say what the text and border meet (for example 4.5:1 for the text, 3:1 for the border, as other fields say). It is shared by the number input, stepper, currency, percentage and quantity pages. Which contrast figures should it state?

### forms-searchable-select

- **rec.purpose / docs.purpose:** The searchable select picks one value, but its page shows the shared Combobox purpose ("choose one or several values ... and optionally create a value"), and the shared anatomy lists Tags and the Create option. Is that fine for this page, or should the searchable select page get its own one-value purpose?

### date-range-picker

- **rec.purpose:** The date range picker shows the date picker’s purpose (“Takes a date as people prefer to give it…”), which speaks of one date. Should it get its own purpose about choosing a period (a start and an end), or is the shared purpose fine?

### date-time-picker

- **rec.purpose:** The date-time picker shows the date picker’s purpose, which speaks only of a date. Should it get its own purpose about choosing a moment (a date and a time), or is the shared purpose fine?

### attachment-picker

- **rec.text:** The overview says it attaches “local files”, but When to use says it is for files that come from more than one source. Which is right: device files only, or several sources (for example the device and the Files app)?
- **rec.variantPages[0].avoid[0]:** Both variant pages (Inline and Chips) list “Keep selection reversible and restore explicit.” under When not to use. It is a rule, not a case to avoid, and the wording is unclear. What should Inline and Chips each say not to use them for?
- **rec.variantPages[0].use[0]:** Both variant pages say only “Use this composition when it fits the task.” under When to use, and both have the same description. What is the difference between Inline and Chips, and when should people pick each?
- **docs.behavior.pointer:** The Mouse row repeats the variant description (“Validate types, per-file size and count…”), which is about checking files, not the mouse. What should the Mouse row say (for example drop files, press Choose, press Remove)?
- **docs.anatomy:** The parts list gives only names (Device FileInput, Selected FileRows or removable chips, Validation Notice) with no description or required/optional mark, unlike other pages. Should these be filled in? That needs facts about the component that the page does not give.
- **rec.purpose:** The purpose is word for word the overview (“Attach validated local files with a reversible selection.”). Should the purpose say why people use it (the need it serves) instead of repeating the overview?

## navigation (14 questions)

### navigation-menu

- **rec.purpose, rec.use[0], rec.use[1], docs:** This page mixes two things: the mega menu (a top navigation item with a big panel of links) and the side navigation list (NavList rows with counts, pins and folding groups). The purpose, the first two usage points and every written section describe the side list, not the mega menu. Should the side-list text move to its own page (or to Side navigation), leaving this page about the mega menu only?

### navigation-section-navigation

- **rec.purpose, docs:** Section navigation shows the navigation pane's purpose and write-up (title row, splitter, rail and so on) instead of text about sections, subpages, in-page links and tables of contents. Should it get its own purpose, or is showing the pane's write-up intended?

### navigation-saved-searches

- **rec.purpose, docs:** Saved searches shows the Search workspace's purpose and write-up (the whole advanced search page). Should it get its own purpose about keeping a named query and its filters, or is showing the search page's write-up intended?

### side-navigation

- **docs.purpose:** The written purpose says the pane is "shown as an overlay on small screens", but the rest of the page (and Bottom navigation) says that on a phone it is a bottom bar plus a full screen, never a drawer. Should this purpose be changed to match (the overview purpose already does)? The same text appears on Section navigation.
- **docs.behavior.focus:** Side navigation says focus is not moved into the overlay, but Bottom navigation says opening the overlay or the screen moves focus into the pane and returns it on close. Which one is right?

### product-navigation

- **docs.behavior.keyboard, docs.behavior.motion:** Product navigation says the pane's rows move with the arrow keys and the pane folds with the standard motion. The Navigation menu page says the list adds no arrow keys, and Side navigation says the pane has no motion of its own. Which is right?

### mobile-app-bar

- **docs.behavior.responsive:** This says the header links leave the bar "below the Narrow class", but the overview says the bar is the Narrow class itself, and Application header says the links leave below 840px (Medium and Narrow). Should it read "below 840px (Medium and Narrow)"?

### tabs

- **rec.use[0], rec.variantPages[0].avoid[0]:** Usage says peer views always use the contained tabs, yet the Contained variant says a page whose whole body switches should use Folder tabs, and Segmented tabs have their own uses. Should the usage line say "contained by default" instead of "always"?

### progress-steps

- **rec.text, rec.variantPages[4]:** The compact stepper is described as for sequences "without names", but it shows "Step 2 of 5 and the step's name". Does compact show the step's name or not?

### filter-bar

- **rec.text:** Filter bar says a search page shows the set filters as chips under the toolbar, while the Filter panel and Quick filters pages say never to put filter chips under the command bar. Are chips allowed only on the search page, and should the other pages say so?

### query-builder

- **docs.content.labels:** The page says operators should be in words, never symbols people must learn, but its read-back example uses a symbol: “Size (MB) > 40”. Should the example read “Size (MB) is more than 40”, or is the symbol meant to stay in the text view?
- **docs.a11y.name:** This line uses “Rule 2” both as the name of a rule and as an example control label (“Rule 2, Operator”). Is each control meant to be labeled with its rule number plus its role (for example “Rule 2 operator”)? I left it unchanged until you say.

### search-result

- **docs.behavior.responsive:** “The text wraps under the thumbnail’s column” can be read two ways: the text moves below the thumbnail on a narrow width, or it stays in its own column next to the thumbnail. Which one is meant? I left it unchanged.

### search-result-group

- **docs.a11y.contrast:** “The heading and count follow SectionHeading and the muted text” — does this mean the heading follows SectionHeading and the count uses muted text? I left it unchanged until you confirm.

## content (25 questions)

### text

- **rec.text:** The overview names seven text roles (body, secondary, caption, data, label, strong, title), but the component offers thirteen (also heading, eyebrow, accent, success, danger and link). Should the overview list all thirteen?
- **rec.variantPages[8].text:** The Data style is described here as 11px, but elsewhere on the page data text is "at the secondary size" (and Secondary is 12px). Which size is right for data text on its own?
- **rec.variantPages[8].avoid[0]:** This says values in a property list use the label font with equal-width digits, not the data font. The Property list page says technical values there use the data font (Reddit Mono). Which is right?
- **docs (all sections):** This write-up (purpose, parts, behavior, accessibility, content) appears word for word on seven pages: Body text, Paragraph, Label, Caption, Helper text, Secondary text and Truncated text. I left it unchanged so the copies stay identical. Should it be rewritten once and shown on all of them?

### heading

- **rec.use[0] / rec.use[2]:** Two usage points give different heading sizes: one says levels 2–4 are 18, 15 and 13px, the other says level 2 is 13px, level 3 11px, level 4 10px. Which sizes are right?
- **rec.purpose / docs.purpose:** The purpose describes only the small uppercase section label (SectionHeading), but the page also covers page and section headings (levels 1–4). Should the purpose cover both?

### code-block

- **rec.text:** The overview says the code sits "on the inverse surface", but the parts list says it sits on the default surface (--plx-sys-surface-default). Which is right?

### avatar

- **rec.use[1]:** The usage list names six sizes (xs to 2xl), but the behavior section also lists a 2xs size of 20px, and the Small avatar page points to "the 20px size". Should usage list 2xs too?
- **docs (all sections):** The Avatar write-up also appears word for word on the User identity page, so I left it unchanged to keep the copies the same. Rewrite it once for both?

### property-list

- **rec.use[1]:** Usage says a technical value sits "on the value’s baseline", but the parts list says "on the label’s baseline". Which is right?
- **docs.a11y.contrast:** This says "a name/value table is a DataGrid, not a PropertyList". Under the table rule you set (DataGrid for dynamic tables, Table for static ones), a static name/value table would be a Table. Should this say Table?
- **docs (all sections):** The Property list write-up appears word for word on four pages (Property list, Key-value pair, Attribute list, Description list), so I left it unchanged. Rewrite it once for all four?

### thumbnail

- **docs.behavior.error:** The behavior section says a broken picture is not replaced by the icon, but the Icon thumbnail page says the icon shows when there is no picture "or it fails to load". Which is right?

### content-skip-link

- **rec.purpose / docs:** The Skip link page shows the purpose and full write-up of the application frame (AppShell: header, navigation pane, main region, inspector, footer), not of the skip link. Should it get its own purpose ("lets keyboard users jump past the header and navigation to the main content")?

### content-paragraph

- **rec.text / rec.use[1]:** The Paragraph page uses a "lead" text style for the opening paragraph, but the Text component’s list of styles does not include "lead". Does the lead style exist, or should these mentions change?

### content-caption

- **rec.avoid[1]:** This page says a caption should not be longer than two lines; the Caption style on the Body text page says not longer than one line. Which limit is right?

### content-truncated-text

- **rec.text:** This page describes clamping to 2, 3 or 4 lines (lines) and a Show more option (expandable), but the Text parts list only shows one-line truncation. Do lines and expandable exist on Text, or belong to another component?

### content-online-status

- **rec.purpose / docs:** Online status shows availability in words, but its purpose and write-up are those of the presence dot on an avatar. Should it get its own purpose (for example, "shows a person’s availability in words where an avatar dot is too small or missing")?

### presence

- **docs (all sections):** The Presence write-up also appears word for word on the Online status page, so I left it unchanged. Rewrite it once for both?

### swatch

- **rec.avoid[2]:** The page says a swatch can be a button that picks a color (with a ring on the chosen one), but “When not to use” says to use the swatch picker (ColorPicker) for picking from a set. Is the button form only meant for use inside ColorPicker, or can pages use picking swatches on their own? The wording should say which.

### timestamp

- **docs.a11y.focus:** “Only relative times and date labels (and tooltip) are Tab stops” is unclear. Does it mean any timestamp that has the tooltip turned on (which is on by default for relative times and date labels) is a Tab stop?

### people-group

- **docs.behavior.responsive:** The Team page says the “source” is cut with an ellipsis, but a team has no source part (only the Group has “Synced from directory”). Should “source” be removed from the Team page?

### image-gallery

- **rec:** Image gallery’s text is a generic media-family text: “When to use” repeats the overview word for word, “When not to use” says “Keep sources and actions explicit.” (an instruction, not a case to avoid), and Behavior, Accessibility and Content talk about forms, FileRow, Carousel and “Save metadata”, which are not part of a gallery. Should this page get its own written text?

### video

- **rec:** Video’s text is shared word for word with Audio and the other media pages; “When to use” repeats the overview and “When not to use” is “Keep sources and actions explicit.” Should Video get its own text (for example when to use Video versus Audio)?

### audio

- **docs.anatomy:** The Audio page shows the Video text: its overview says “audio and video” and its parts include picture in picture, which audio does not have. Should Audio get its own text without the video-only parts?

