# Spec wording: what to clean up, and how

A proposal for the hand-written parts of the design spec: overview, purpose, usage, behavior, accessibility and content
guidance. Nothing has been changed. The samples below show the proposed style on three components; once you pick the
rules, the rest follows the same way, one section of the spec at a time.

## What I found

The hand-written text across the built components is about **142,000 words**. Most of it is good. The problems are
repetition and padding, not wrong content.

- **The same fact, said several times on one page.** Badge states its pill rule (shade 100, border 300, text 700, 4px
  corners) four times: in Overview, in Purpose, as the first Usage point, and in its own "pill rule" section. Button says
  "a link goes somewhere, a button does something" twice.
- **Rows that say nothing.** 729 rows read "Not applicable" or "None" (about 6,700 words). Badge alone has five: Loading,
  Error, Action copy, Error messages, Motion.
- **Generic sentences copied across pages.** 252 sentences appear three or more times, 1,656 extra copies in all. For
  example "Keep the user in context and preserve their work." appears on 29 pages. They tell the reader nothing about the
  item they're reading.
- **Rows that don't fit.** "Every control: an accessible name, a visible focus indicator, 44px targets on touch" appears
  on every page, including Badge, which is not a control.
- **History inside rules.** Some rules carry "(owner, 2026-10-14)" mid-sentence. A rule reads better without it; the
  source can sit in the Details section.
- **Long sentences.** 99 entries are over 45 words.
- **One contradiction.** DataGrid's Usage says to use it for "reference tables in documentation and settings", but its
  Purpose (and the owner's rule) says a static table is a Table.

## Proposed rules

1. **Say it once.** Overview says what it is (one line). Purpose says why it exists (one line). Rules live in Usage, or
   in their own section, never in all three.
2. **Hide empty rows.** No "Not applicable" or "None" rows: if a heading doesn't apply, it isn't shown.
3. **No copied filler.** A sentence that would be true of any component is cut. Rules that apply to everything live once,
   on the foundation page, and pages link to it.
4. **Lead with the answer.** One fact per sentence, starting with the verb or the point, about 25 words at most. Two or
   more sentences become bullets.
5. **Rules without history.** Owner and date notes move out of the rule into Details (as its source).
6. **Plain words in Usage, code names in Development.** Usage says "an icon-only button"; Development says `iconOnly`.
7. **Only what applies.** The "Every control" row shows only on interactive items.

## Samples

### Button

**Overview and Purpose** (63 words → 33)

| Now | Proposed |
| --- | --- |
| A control that causes an action, in six variants (secondary, primary, tertiary, ghost, danger, danger secondary) and five sizes. It never looks like a link: a link goes somewhere, a button does something. | Runs an action. Six variants and five sizes. |
| Lets people cause an action, with the emphasis that matches its importance: one primary per area, secondary by default, danger for destructive actions. | Shows how important an action is: one primary per area, secondary by default, danger to delete or remove. |

**Usage**

| Now | Proposed |
| --- | --- |
| Causing an action: secondary by default, primary once per area, quiet in dense rows, danger for destructive | Run an action: secondary by default, primary once per area, ghost in dense rows, danger to delete or remove. |
| Size by role: 2xs, xs (inline), sm (toolbar), md (standard), lg (prominent) | Size by place: xs inline, sm in toolbars, md elsewhere, lg for the main call to action. |
| Going somewhere: use a Link (a link goes somewhere, a button does something); a quiet action is a ghost or tertiary button, never link-styled | Going somewhere: use a Link. A quiet action is a ghost button, never one styled as a link. |
| Choosing one value among a few: use Segmented control | Picking one of a few values: use Segmented control. |

**Behavior**: the "Error: Not applicable" row goes. "The label stays on one line and truncates with an ellipsis. Use
iconOnly with a label in tight toolbars." becomes "Keeps its label on one line; a long label ends in an ellipsis. In a
tight toolbar, use an icon-only button with a label."

**Content guidance**: the "Error messages: Not applicable" row goes.

### Badge

**Overview and Purpose** (160 words → 22)

| Now | Proposed |
| --- | --- |
| A status pill: the workflow state of a record in one of six soft variants. Pills in filter values, tables, tags and statuses use a soft background … (owner, 2026-10-14). Status pills and category pills use separate color systems … | A soft pill that shows a record's workflow status, in six variants. |
| Shows a workflow status, such as Approved or Failed, as a soft pill so people can scan state at a glance. Pills in filter values … (repeated) | Lets people scan status at a glance. |

The pill rule stays once, in its own section, as it is today.

**Usage**

| Now | Proposed |
| --- | --- |
| Every pill soft: shade 100 background, 1px shade-300 border, 700 text (800 for red), 4px corners | (cut: it's the pill rule, already in its own section) |
| A workflow status in its variant: neutral, success, active, waiting, action-required, negative | A workflow status: neutral, success, active, waiting, action required or negative. |
| Yellow for waiting or paused, orange for action or correction required, red for blocked or unsuccessful / Draft as a workflow status is neutral (gray), not waiting | Color by meaning: yellow for waiting or paused, orange when action is needed, red for blocked or failed. Draft is neutral. |
| Something clickable: use Chip | Something clickable: use Chip. |
| A tag or category in a status variant: use Tag with its category color / Brown for a status: brown is only a category and reference color | A tag or category: use Tag in its category color (brown is for categories only). |
| variant="solid": every pill is soft (the prop is accepted and ignored) | (moves to Development: it's an API detail) |

**Behavior**: Mouse, Keyboard and Focus ("None", "None", "Not focusable") become one row: "Interaction: none. It's text,
not a control." Loading, Error and Motion rows go.

**Accessibility**: the "Every control" row goes (a badge isn't a control).

**Content guidance**: "Action copy" and "Error messages" (both "Not applicable") go.

### DataGrid

**Overview and Purpose** (102 words → 42)

| Now | Proposed |
| --- | --- |
| Records people work with, by column: sort, filter, select, open, edit, group or nest them. A React grid on TanStack Table in the Plenix table style. | An interactive table of records: people sort, filter, select, open, edit, group or nest them. |
| Shows records as rows to compare by column … An interactive table in Plenix is a DataGrid: a React grid on TanStack Table and TanStack Virtual (bundled) … Never a `<table>` element or another grid library. | Lets people compare records by column and act on them. For a static table (facts, settings, documentation), use Table. |

"A React grid on TanStack Table and TanStack Virtual" moves to Development. "Never a `<table>` element or another grid
library" stays once, in Usage.

**Usage** (fixes the contradiction)

| Now | Proposed |
| --- | --- |
| Any set of records shown as rows and columns: lists to compare, sort, filter, select, open, edit, group or nest | Records people compare and act on: sort, filter, select, open, edit, group or nest. |
| Reference tables in documentation and settings (the first column names each row) | (moves to When not to use: "Static reference rows, in documentation or settings: use Table.") |
| A few facts about one record: use Property list | A few facts about one record: use Property list. |
| A layout of cards or pictures: use Content grid | Cards or pictures: use Content grid. |
| Never a `<table>` element or another grid library: an interactive table is a DataGrid, a static one a Table | Never a `<table>` element or another grid library. |

**Behavior** (sample row): "Right-click a header for the column menu too (the application's field actions, sort,
filter, group, width and position, hide and show); right-click a row for its row menu." becomes "Right-click a header for
its column menu, or a row for its row menu."

## What I need from you

1. Do the seven rules read right? Change, drop or add any.
2. Is the length of the "Proposed" column what you want, or shorter still?
3. Where to start: I'd go one spec section at a time (actions, then data display, …), starting with the pages people
   open most.

Two things this doesn't touch: the tables the spec builds from the code (classes, tokens, states), which wait until the
styling work is finished, and the guidance for components not built yet (about 84,000 words more, same rules later).
