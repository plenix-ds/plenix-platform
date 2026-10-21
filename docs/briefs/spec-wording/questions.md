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

