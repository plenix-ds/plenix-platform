# keyboard

This test makes sure people who use only a keyboard can move through and operate Plenix's toolbars, ratings, tabs, settings sections, search history, command bar, filter panel and selection bar.

- File: `tests/keyboard.test.js`

## What it checks
- Toolbar: exactly one Tab stop; Arrow Right moves to the next control, Arrow Left moves back; in right to left (RTL, for Arabic) Arrow Left moves forward.
- Rating: Arrow Right moves focus to the newly chosen star and selects it.
- Tabs: Arrow Right moves to the next tab; in right to left Arrow Left moves to the next tab.
- Collapsible settings section: Enter closes an open section (its rows hide), Space opens it again, and the header button points to its rows.
- Recent searches in a search field: the list opens as a grid; Arrow Down moves row to row; Arrow Right moves into the "Remove" cell and Arrow Left back; Enter on Remove removes that search and keeps focus in the field; Delete removes the active search; Enter on a term searches it.
- Command bar: the bar is one Tab stop; Arrow Right moves; Enter on Filter opens its panel with focus inside; Escape closes it and returns focus to Filter.
- Command bar with rows selected: the page's actions swap for the selection's commands, ending with "× N selected", and the search stays; Escape clears the selection and the normal bar returns at the same height.
- Command bar action forms (from `tests/command-actions.test.js`, loaded as a module): pending state, help, folded forms, form focus, text keys, Tab, Escape and the selection boundary.
- Filter panel: Alt + Arrow Down moves the focused row down, keeps focus on it and announces the move.
- Selection bar: one Tab stop, disabled commands shown, Arrow Right skips to the next enabled control.
- The header also names SegmentedControl and the Tree, but the code has no check for them.

## Why it exists
- Added in commit 7ae16957 "Fix the documentation findings: keyboard, right to left, translatable words, fallbacks (batches 213-215)".
- The tests run on the St. John test site, not on the design spec (owner, 2026-10-25, in the file header).
- The command bar keyboard rules come from the owner (2026-10-14, in the file header); the selection swap from the owner's issue #454 (in the check's name).
- Key patterns follow the WAI-ARIA Authoring Practices (the combobox with grid popup is named in the header).

## How it checks
- Opens St. John test site pages in headless Chrome at 1440 by 1000 pixels: readings (Toolbar), event (Rating), member (Tabs), settings (settings section), search (recent searches), members (command bar, filter panel), directory (selection bar).
- Presses real keys and reads which element has focus, plus ARIA states such as aria-expanded.
- For right to left, it sets dir="rtl" on the part's section and presses the arrows again.

## What a failure means
- A keyboard user could get stuck, skip a control, land in the wrong place, or need many Tab presses to cross one toolbar.
- In Arabic pages the arrow keys could move the wrong way.
- A screen-reader user might not hear that a filter row moved.

## When it runs
- AUTOMATIC in `tests/run.js`.
- In changed mode each part runs only when its Platform part (Toolbar, Rating, Tabs, SettingsLayout, SearchField, CommandBar, FilterPanel, BulkActions) or its test site page changes; the command bar also runs when `command-actions.test.js` changes.
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- The full suite (`full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The St. John test site checkout (`tests/site.js`) with its database (in-process by default).
- `tests/command-actions.test.js` (loaded as a module).
