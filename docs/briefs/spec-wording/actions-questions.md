# Actions section: questions for the owner

The Actions section of the design spec was rewritten on 2026-10-21 by the approved wording rules (spec commit 6ce4c06). These 34 strings were left exactly as they were, because changing them needs your decision. Answer any you like; the rest stay as they are.

## button

- **docs.anatomy[4]:** Anatomy lists a "link" variant (seven values) while the Overview says six variants and "never looks like a link". Is `link` retired (drop it from Anatomy), or should the Overview mention it? Left unchanged.

## toolbar

- **rec.use[0]:** "arrow keys move between them, Tab leaves" contradicts docs.behavior.focus ("Every control keeps its own Tab stop (there is no roving tabindex)") and keyboard ("Tab and Shift+Tab move through the controls as usual"). Which is right? rec.purpose ("instead of many Tab stops") depends on the same answer; both left unchanged.
- **docs.behavior.focus:** "Every control keeps its own Tab stop ..., except that unchecked options of a radio group inside it are skipped by the arrow keys": is the exception about Tab stops or only about arrow keys? Left unchanged.

## actions-formatting-toolbar

- **rec.text:** Says the formatting toolbar has "one Tab stop", but the parent Toolbar docs say every control keeps its own Tab stop (no roving tabindex). It also lists undo/redo among toggle (pressed) buttons. Which is right? Left unchanged.

## action-bar

- **docs.behavior.responsive:** Says "the groups themselves do not wrap", while Toolbar says "The row and each group wrap onto more lines". Is DataToolbar an intended exception? Left unchanged.

## actions-action-group

- **rec.text:** Gives "the views of a list" as an example, but a view switch is a choice of one value, which its own avoid sends to SegmentedControl (Action panel uses a Segmented view switch). Change the example? Left unchanged.

## actions-dialog-trigger

- **rec.purpose:** Purpose is Button's ("Lets people cause an action ... one primary per area ..."), wrong for a dialog trigger. Write a specific purpose (actions-modal-trigger has one)? Left unchanged.

## actions-drawer-trigger

- **rec.purpose:** Purpose is Button's, wrong for a drawer trigger. Write a specific one? Left unchanged.

## actions-popover-trigger

- **rec.purpose:** Purpose is Button's, wrong for a popover trigger. Write a specific one? Left unchanged.

## actions-disclosure-trigger

- **rec.purpose:** Purpose is Button's, wrong for a disclosure trigger. Write a specific one? Left unchanged.

## actions-modal-trigger

- **rec.text:** Modal trigger and Dialog trigger describe the same thing (a button that opens a dialog, focus returns to it, ellipsis when more input is needed). Merge or differentiate them? Left unchanged.

## bulk-action-bar

- **rec.purpose / docs.purpose:** The purpose says the bar sits "under the command bar, always shown" and "the command bar itself never changes on selection", but rec.text deprecates BulkActions for CommandBar's selection state and use[0]/avoid[0] (owner, 2026-10-15) say that under a command bar its selection swaps the bar. Left unchanged: should the purpose describe the bar as the selection bar of a page with no command bar?

## actions-selection-toolbar

- **rec.text / rec.purpose:** The text and purpose present BulkActions as "the selection bar under the command bar", which contradicts the deprecation and the owner rule (2026-10-15) that under a command bar its selection swaps the bar. Left unchanged: should this page point to CommandBar's selection state instead?

## actions-overflow-action

- **rec.purpose:** The purpose is the selection bar's (BulkActions), which is wrong for an overflow action. Left unchanged: which purpose should it carry (e.g. "Keeps every action reachable when a row is too narrow, by moving the last ones into More")?

## actions-menu-item

- **rec.purpose:** The purpose is the whole action menu's ("Keeps a set of actions behind one button so the surface stays calm, and opens them as a list people can choose from with pointer or keyboard."), not a menu item's. Left unchanged: give it its own purpose?

## actions-checkbox-menu-item

- **rec.purpose:** Carries the action menu purpose, which does not describe an on/off option. Left unchanged: give it its own purpose?
- **rec.avoid[1]:** "use a group of choices": does this mean the radio menu item (MenuRadioGroup)? If so it could name it; left unchanged.

## actions-menu-group

- **rec.purpose:** Carries the action menu purpose, which does not describe a group. Left unchanged: give it its own purpose?

## floating-action-button

- **rec.variantPages[1].use:** The Small variant’s use, “A secondary floating action beside a list”, implies a second floating action on a screen, but the page says “More than one per screen” is avoided and content.actions says “One per screen”. Which holds? Left unchanged.

## download-button

- **rec.use[1]:** “format and size when the file is large or comes in several formats” versus avoid “Several formats or sizes: a menu of downloads”: is a file in several formats one button with its facts, or a menu? Left unchanged.
- **rec.text:** rec.text says the name gives “the file and its format”; a11y.name also includes the size (“cross-014.png (PNG, 4.2 MB)”). Should the overview add the size? Kept as written.

## back-to-top

- **docs.anatomy[1]:** “Sentinel — an invisible hairline as tall as the reveal distance, where the button is drawn”: a hairline cannot be tall, and “where the button is drawn” is unclear (where it is placed, or what it observes?). Left unchanged until the intended meaning is confirmed.
- **docs.a11y.focus:** The Focus row in Accessibility holds a target-size rule (“at least the standard control height”), not a focus rule. Move it to another row? Left unchanged.

## command-palette

- **docs.a11y.announce:** "Opening moves focus into the field" repeats docs.behavior.focus. Drop it here (keep only the result count), or keep it because it tells what a screen reader hears on opening?

## rename-action

- **rec.text / docs.anatomy[2] vs docs.content.errors:** The rule says "no slash", but the error example is "A name can’t contain / or \". Is the backslash also refused? If so the rule text should say "no slash or backslash".

## duplicate-action

- **docs.a11y.focus:** "Nothing is disabled" sits under Focus and overlaps docs.behavior.error. Does it mean the Duplicate button is never disabled? If yes, may it read "Duplicate is never disabled: …" (and move out of Focus)?

## import-dialog

- **rec.text, rec.purpose, docs.purpose:** The overview and the purpose are the same imperative sentence ("Choose a supported source before importing records."), and it says nothing about what Import brings in. Should the overview become a description (e.g. "Imports records from a source people choose first: a file, pasted text or a URL") and the purpose a reason (e.g. the guide’s "add content in bulk instead of creating it by hand")? Left unchanged.
- **rec.variantPages[0..2].text and docs.behavior.pointer:** File, Paste and URL share one text that says nothing about each source, and the same text stands in docs.behavior.pointer although it is not pointer behavior. Write a text per source and real pointer behavior? Left unchanged.
- **rec.variantPages[0..2].use / avoid:** "Use this composition when it fits the task." and "Keep scope and consequences explicit before submitting." are filler on every variant (the second is not a when-not-to-use). Write real ones, or remove? Left unchanged.
- **docs.behavior.focus, docs.a11y.name, docs.a11y.announce, docs.a11y.contrast, docs.content.labels, docs.content.actions, docs.content.localization:** These are shared text from a family (Import, Export, Request access, Upgrade, Delete account): "wizard step", "review grids and shortcut groups", "permission summaries", "Badge roles", "keyboard bindings", "Request access, Upgrade and Delete account", "plan terms and account names" do not apply to Import. Keep them as shared rules (moved later), or trim each page to what applies? Left unchanged.

## export-dialog

- **rec.purpose, docs.purpose:** The purpose repeats the overview word for word. Should it say why (e.g. the guide’s "take data out of the app for use in other tools")? Left unchanged; the overview was rewritten.
- **rec.variantPages[0..2].text / use / avoid and docs.behavior.pointer:** Same as Import: Format, Selection or all records, and Background export share one text, the same filler use/avoid, and the same text stands in docs.behavior.pointer. Write per-variant text? Left unchanged.
- **rec.use[1] vs docs.anatomy:** Usage says people can choose fields, but the anatomy has no field chooser (format, scope, background option, Badge/Link). Is choosing fields supported?
- **docs.behavior.focus, docs.a11y.name, docs.a11y.announce, docs.content.labels, docs.content.actions, docs.content.localization:** Same shared-family text as Import ("wizard step", "review grids and shortcut groups", "permission summaries", "Request access, Upgrade and Delete account", "source columns, plan terms and account names"). Keep or trim? Left unchanged.

