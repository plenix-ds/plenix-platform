# describedby-adoption

This test makes sure screen readers keep reading a form field's help text, error message and extra hints, in the right order, for six Plenix controls.

- File: `tests/describedby-adoption.test.js`

## What it checks
- Each control is drawn inside a Field with a help text and an error, and some also alone. The test reads, in order, the texts each control points to as its description (aria-describedby):
  - Cascader: its chosen value ("Choose"), then help, then error;
  - CodeEditor: help, error, then "Tab indents. Press Escape, then Tab, to leave the editor.";
  - FileInput: help, error, then "No file chosen";
  - InputGroup: help, error, then its "$" and "USD" labels;
  - RelativeDateInput: help, then error;
  - AvatarUpload: "At least 200 pixels", then "No file chosen".
- Alone, InputGroup, Cascader, FileInput and CodeEditor read only their own lines.
- No element is left with an empty description list.
- First it proves it can see a difference: a FileInput given the page's own description reads that first, then its own line.
- No script errors.

## Why it exists
- Issue #262, pull request 3: Cascader, CodeEditor, FileInput, InputGroup, RelativeDateInput and AvatarUpload moved onto the shared useDescribedBy helper (file header).
- The expected lists are what the controls described before the move (measured on styling/phase-2 at 5a620b5c). The order matters because a screen reader reads descriptions in that order (file header).
- Added in commit 0ca5216f "#262 PR 3: ... build aria-describedby with useDescribedBy; same descriptions in the same order".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 900 by 900 pixels, draws all controls at once, and follows each control's aria-describedby ids to their texts.

## What a failure means
- A screen-reader user filling in a form could miss the help text or the error message, or hear them in a confusing order.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it only when Cascader, CodeEditor, FileInput, InputGroup, RelativeDateInput, AvatarUpload, Field or `utils/describedBy.ts` changes, when a global file changes, or when `layout.test.js` itself changes. A change to this file alone does not start it in changed mode.
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
