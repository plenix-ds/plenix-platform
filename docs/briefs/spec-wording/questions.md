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

