# readonly-adoption

This test makes sure that when a form or field is set to read-only, a person cannot change its value by clicking, typing, using arrow keys or picking from a list.

- File: `tests/readonly-adoption.test.js`

## What it checks
- 19 controls: SearchField, SegmentedControl, Rating, ColorSwatch, PromptInput, TimeZoneSelect, NumberInput, DatePicker, Combobox, CountrySelect, TreeSelect, TransferList, InlineEdit, RichTextEditor, CodeEditor, MentionInput, TimePicker, Cascader, RelativeDateInput.
- Each is drawn three ways:
  - free (not read-only): the test's actions must change it, which proves the test can see a change;
  - inside a ReadOnly region: nothing changes;
  - with its own readOnly setting: nothing changes.
- The actions: click, type, arrow keys and Enter, click an offered choice, press its buttons. Date and time pickers also get a typed value then Enter or Tab; DatePicker gets a day clicked in its calendar; list pickers get an option clicked (a parent, then a leaf).
- Each step must change the free control, so a zero in read-only mode means the control truly holds.
- No script errors.

## Why it exists
- Issue #262, pull requests 1 and 2: the controls moved onto the shared useReadOnly hook; and issue #596: TimePicker and Cascader used to change when an option was clicked in read-only mode (file header).
- Added in commit 661b9bea "#262 PR 1: SegmentedControl, ColorSwatch, ColorPicker, PromptInput and TimeZoneSelect follow read-only; hook-adoption ratchet for useReadOnly and the moved hooks".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 900 by 900 pixels, one control per fresh page, and counts how often the control's change handler is called.

## What a failure means
- A person viewing a record they are not allowed to edit could still change a value, for example pick a new date or type over a number.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it when SegmentedControl, ColorSwatch, PromptInput, TimeZoneSelect, SearchField, Rating, NumberInput, DatePicker, Combobox, CountrySelect, TreeSelect, TransferList, InlineEdit, RichTextEditor, CodeEditor, MentionInput or the ReadOnly provider changes, when a global file changes, when `layout.test.js` itself changes, or when this test's own file, or a fixture it loads, changes (issue #756).
- That list leaves out TimePicker, Cascader and RelativeDateInput, which the test also checks: a change to only those does not start it in changed mode.
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
