# control-cards-804

This test makes sure the choice cards work with a radio (one choice), a checkbox (several) or a switch (on or off): a click anywhere on a card changes it, and the keyboard and screen readers meet one control named by the card, in both reading directions.

- File: `tests/control-cards-804.test.js`

## What it checks
- Each kind is a group named by its legend, with one native control per card: a radio, a checkbox, or a checkbox with the switch role. The control is labelled by its card and described by the card's description.
- A click on a card's text changes its control; a disabled card ignores it.
- Keys:
  - Space toggles a checkbox card and a switch card; the arrow keys do not move between them;
  - in a radio group the arrows move the choice and skip a disabled card.
- Focus: the focused card shows the focus outline for every kind; inside a switch card the switch's own ring is off, so there is one focus mark.
- A disabled card is dimmed, shows the not-allowed cursor and has no hover fill.
- Left to right the switch sits at the card's end and the radio at its start; right to left the other way round.
- No script errors.

## Why it exists
- Issue #804: idea 4 of the component study #767. The owner said yes in #769 (chat, 2026-10-31) and "build it" (chat pop-up, 2026-11-01). The Tech Lead chose to extend ChoiceList rather than add a parallel component.

## How it checks
- Headless Chrome at 1100 by 700 pixels opens `tests/fixtures/platform-host.html`, draws three ChoiceLists (radio, checkbox, switch), clicks, presses keys, and reads what each one reports, the roles, the focus outlines and the positions.

## What a failure means
- A click on a card's text could do nothing, or a disabled option could still be chosen.
- Keyboard users could find two focus stops in a card or arrow keys that jump between checkboxes.
- A switch could be announced as a plain checkbox.
- In Arabic the switch or the radio could sit on the wrong side.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when the Checkbox component file (Checkbox, Radio, RadioGroup, ChoiceList, Switch) changes, or when this test's file changes.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
