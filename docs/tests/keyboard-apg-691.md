# keyboard-apg-691

This test makes sure menus, pickers, dialogs, sliders, calendars and other common controls work fully from the keyboard, the way people expect from the web's standard key patterns.

- File: `tests/keyboard-apg-691.test.js`

## What it checks
- Each part is checked in a left-to-right page and, where arrows flip, in a right-to-left (RTL, for Arabic) page.
- Menu: opens on the first or last item, arrows wrap, Home and End, Escape returns focus to the button, Enter chooses, Tab closes. A sub menu opens toward the reading end. Radio groups inside a menu.
- SplitButton's menu.
- Combobox: typing opens it, Down and Up move, Enter chooses, Escape closes without choosing, Tab leaves.
- Dialog: focus moves in, Tab stays inside both ways, Escape closes, focus returns; a dialog that must not be dismissed stays. Drawer and Sheet likewise.
- Popover: focus moves in, Escape returns focus, Tab out closes it, focus is not trapped. Popconfirm.
- Slider: arrows, Page Up and Page Down, Home and End, and the commit call.
- Checkbox and Switch: Space toggles.
- RadioGroup: one Tab stop; arrows move and choose.
- SplitView's divider: arrows step in the reading direction, Home and End.
- Calendar: arrows move by day and week (mirrored in right to left), Page keys move by month, Enter chooses.
- OtpInput (one-time code boxes): typing moves on, Backspace moves back, Home and End; the boxes stay left to right in both directions.
- No script errors on the page.

## Why it exists
- Issue #691, from the code audit #684: most interactive parts had no keyboard test and no manual screen-reader pass was recorded.
- The checks follow the WAI-ARIA Authoring Practices (APG) key patterns (file header).
- Added in commit c575728e "#691: keyboard tests by the APG patterns for the parts that had none, and a manual screen-reader checklist (written, not run)".
- The header says the checks were first proved to catch a failure: a Menu that did not return focus on Escape, a Dialog without a focus trap, a Calendar whose arrows did not mirror, and a RadioGroup with a Tab stop on every radio.

## How it checks
- Opens the Platform's empty fixture page `tests/fixtures/platform-host.html` in headless Chrome at 1300 by 900 pixels.
- Draws each part fresh, presses real keys, and reads which element has focus, what is open, and what was chosen.

## What a failure means
- A keyboard user could open a menu and be unable to leave it, get trapped behind a dialog, lose their place when a popup closes, or be unable to pick a date or set a slider.
- In Arabic pages arrows could move the wrong way.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it only when Menu, SplitButton, Combobox, Dialog, Sheet, Popover, Popconfirm, Slider, Checkbox, SplitView, Resizable, Calendar or OtpInput changes, when a global file changes, or when `layout.test.js` itself changes. Layout does not check this test's own file, so a change to this file alone does not start it in changed mode.
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle (`platform/dist/platform.js`).
