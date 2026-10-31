# keyboard-706

This test makes sure the last group of Plenix controls that had no keyboard check (command menu, pickers, column browsers, rename, delete and draft prompts, filters and more) work fully from the keyboard.

- File: `tests/keyboard-706.test.js`

## What it checks
- Each part in a left-to-right page and, where arrows flip, a right-to-left (RTL, for Arabic) page.
- CommandMenu: arrows wrap, Enter runs a command, a disabled command does not run, a sub page opens and Backspace or Escape goes back, Escape clears typed text first.
- EntityPicker: opens on focus, typing filters, arrows move, Enter chooses, Escape closes, Backspace removes the last tag.
- MillerColumns (side-by-side column browser): one Tab stop per column, Up and Down choose, Home and End, the arrow toward the reading end opens the children and the other goes back, type-ahead, Enter opens a leaf.
- RowButton: Enter and Space press it.
- AssignControl: Reassign puts focus in the picker; Escape puts the row back with focus on Reassign; choosing assigns and returns focus.
- ImageUpload: Choose is reachable; Remove moves focus to the next Remove, then to Choose. ImageCrop: arrows move the picture, Home centers it.
- RenameAction: F2 and Enter open the field, Escape restores, Enter saves; the dialog version opens, Escape closes, focus returns.
- SessionTimeout: focus starts on "Stay signed in", Escape stays signed in; the signed-out message cannot be dismissed.
- DeleteFlow: focus starts on Cancel, Escape deletes nothing and focus returns; in the "type to confirm" version a mismatch keeps focus in the field.
- DraftState: "Discard draft" asks first, focus on "Keep draft", Escape keeps the draft.
- QueryBuilder: "Add rule" moves focus to the new rule; removing a rule moves focus to "Add rule".
- FilterBar: a multiple-choice filter stays open while choosing; a single-choice one closes.
- SearchWorkspace: typing searches; a chip's remove button removes its filter.
- ProductOptions: sizes are one radio group; arrows choose and skip a sold-out size; a sold-out swatch does nothing.
- The four keyboard-pattern gaps of issue #706: Combobox opens on Arrow Up at its last option; Alt + Arrow Down opens without moving; Escape on a closed list keeps the value; Menu type-ahead (a letter jumps to the next item starting with it, also in a sub menu).
- No script errors.

## Why it exists
- Issue #706, the follow-up to #691: the parts still with no keyboard test, and the optional WAI-ARIA Authoring Practices (APG) gaps found by reading.
- Added in commit 3fb40f8e "#706: keyboard tests for the last 14 parts (written, not run); Menu type-ahead; Combobox Arrow Up and Alt+Arrow Down".
- Each check is written so the broken behavior fails it by name (file header, with examples).

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 1300 by 900 pixels, draws each part fresh, presses real keys and reads focus, open state and results.

## What a failure means
- A keyboard user could be unable to run a command, pick a person, rename an item, cancel a delete, or keep a draft; focus could vanish after a popup closes.
- In Arabic pages arrows in the column browser could go the wrong way.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it only when CommandMenu, EntityPicker, MillerColumns, RowButton, AssignControl, ImageUpload, RenameAction, InlineEdit, SessionTimeout, DeleteFlow, DraftState, QueryBuilder, FilterBar, SearchWorkspace, ProductOptions, RadioTiles, ColorSwatch, Combobox or Menu changes, when a global file changes, or when `layout.test.js` itself changes. A change to this file alone does not start it in changed mode.
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job. The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
