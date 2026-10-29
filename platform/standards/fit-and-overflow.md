# Plenix Fit and Overflow Standard: when content does not fit

How every Plenix part behaves when its content does not fit its space (owner, 2026-10-29; issues 502 and 276). It applies to the Platform, the suite's applications, the Asset Manager and the design-system site. "Must" and "never" are requirements. The overflow audit (`tools/check-overflow.js`, run by the owner) finds the places that break it.

## 1. Rules for every kind

- Find why content does not fit and what it is first. Then follow that kind's ladder in section 2, one step at a time.
- Never wrap or cut everything the same way.
- The order is always the same:
  - tighten first (drop what repeats, such as a label beside an icon);
  - then reflow (wrap or stack);
  - cut only last (fold into More, or end in an ellipsis).
- Every cut keeps a way to see the whole thing.
- Toolbars, menu bars and action bars skip the reflow step. They are always one row: a bar never wraps.
- A step is set by the width of the space the content sits in (a container query), not by the window. A pane at 192px adapts the same way in any window.
- Where a step depends on how long the content is (four short labels or two long ones), it is measured, with the Platform's own tools: `useOverflow`, `useFold` and `useTruncated` (`platform/utils/overflow.js`).
- Every step lands on the 4px grid. A heading on two lines uses a 16px line height; with 4px above and below, two lines are 40px and one line stays 32px.
- Every step uses tokens only: no new colors, no inline styles, no `!important`, corners 2 to 6px. New names live in the existing tiers (`--plx-ref-`, `--plx-sys-`, `--plx-comp-`).
- A container query writes its width in the query (CSS cannot read a token there). Each width is a 4px-grid value with a token of the same value beside it, as `field.css` (180px) and `entity-header.css` (640px) do.

## 2. The ladders

| Kind | Step 1 | Step 2 | Last step | What keeps it readable |
|---|---|---|---|---|
| Section and group headings, other text labels | Wrap to 2 balanced lines | Past 2 lines: an ellipsis at the end of line 2 | A single word longer than a line also ends in an ellipsis | The full text in a tooltip on hover and focus, only while it is cut |
| Menu bars and toolbars (icon and text) | Labels hide, icons stay (each keeps its accessible name and shows it in a tooltip) | The least-used actions move into one "More actions" button, which opens the Menu | Never a second row: one row at every width | CommandBar is the model; the generic Toolbar follows the same rule |
| Segmented and switch buttons | Options shrink to icons only (each with a name and a tooltip) | Still too wide: options stack, one per row, full width, with icon and label | Never cut | Options without icons skip step 1 |
| Combo boxes and selects | The box sizes to its longest choice, within a smallest and largest field width | Narrower than that: the box fills the row and the chosen text ends in an ellipsis | The open list is never cut; it may be wider than the box | The full chosen text in a tooltip while it is cut |
| Label plus control (fields, settings rows) | The label beside the control while both fit | The label moves on top of its control | The label wraps; it is never cut | Section 4 |
| Badges and tags | One line, full text | A list of tags wraps to new rows, 8px apart | One tag wider than its space: its text ends in an ellipsis; the icon and the remove button stay | Status badges keep their icon and meaning; the full text in a tooltip |
| Table header cells | One line | Wrap to 2 lines (`wrapHeaders`, 16px lines) | An ellipsis on line 2 | The full header in a tooltip; the sort arrow and menu never hide; labels stay left-aligned |
| Breadcrumbs | The middle items collapse into one "…" button that opens a menu of them | The current page's name ends in an ellipsis | The first item and the current page always show | The full trail in the menu; the current page's full name in a tooltip |
| Buttons in a footer or an action bar | One row, aligned to the end | The secondary actions move into a "More actions" button; the primary action and Cancel stay | Under 400px windows only: the two kept buttons stack full width, primary first | Labels never hide (footer actions are words); a footer never wraps to a second row of mixed buttons |

## 3. Toolbars and menu bars: which actions go into More

- The app gives each action a `priority`: `"high"`, `"normal"` or `"low"` (default `"normal"`).
- Actions move into More in this order:
  - low before normal, and normal before high;
  - within one priority, the last action first;
  - destructive actions (Delete) go last within their priority; in the menu they sit at the end, after a divider.
- An app that sets no priorities gets the default: the actions fold from the end of the bar (CommandBar's rule today).
- The page's primary action (`primary`) never folds and keeps its words longest.
- More is the existing Menu, opened by an icon-only ghost Button (`icon="more"`, label "More actions", with a tooltip).
- Inside the menu each action shows its icon and its full words, in the bar's order.
- The bar measures itself (`useOverflow`). It shows More only when something is folded, and starts again from step 1 whenever its width or its actions change.
- Keyboard: the bar stays one Tab stop. The arrow keys reach More, and the folded actions follow it in the focus order.

## 4. Stacking a label and its control

- Between a label and its own control: `--plx-sys-space-stack-xs` (4px).
- Before the next label: `--plx-sys-space-stack-lg` (16px).
- Between groups of fields: `--plx-sys-space-section` (24px).
- The stacked control fills the row up to its largest field width; the label wraps and is never cut.
- Stack when the container is too narrow for the label column plus the smallest field width, measured on the form's container (360px).

## 5. Accessibility

- When a label hides (an icon-only button), the button keeps it as its accessible name and shows it as a tooltip on hover and keyboard focus.
- Where an ellipsis remains, the full text shows in the Plenix Tooltip on hover and keyboard focus, never with a bare `title`, which keyboard and touch users cannot reach. On touch, a long press shows it.
- The tooltip shows only while the text is actually cut (`useTruncated`: one line cut across, or text cut after several lines).
- A tooltip that repeats the trigger's own name uses `describe={false}`, so a screen reader does not read it twice.
- A plain static heading is not focusable: a cut one shows its full text on hover only, and a screen reader reads the whole heading.

## 6. Shared values

- `--plx-sys-fit-lines` (2), `--plx-sys-fit-line-height` (16px) and `--plx-sys-fit-wrap-padding-block` (4px) are the values every wrapping heading or label shares (`platform/tokens/semantic/fit.tokens.json`). The CollapsibleSection and NavList heading tokens alias them.
- The container widths of later ladders (the 360px label stack, the 400px footer stack) are written in their queries with a token beside them when each ladder is built.

## 7. What is built

- Built: section and navigation group headings (issue 502): `CollapsibleSection`, `NavList`, `useTruncated` for several lines, the Tooltip's `describe` option.
- To build, in this order: the Toolbar, CommandBar `priority` and ActionBar ladders (section 3 and the footer row), segmented buttons (#276), combo and select sizing, label plus control, badges and tags, table header tooltips, breadcrumbs.
- The overflow audit (`tools/check-overflow.js`) lists what still breaks this standard on every spec page and in the 10 apps.
