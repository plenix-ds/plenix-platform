# data-phrase-260b-settings

In a settings description such as "469 members in 120 families", the numbers are in the data font and the words stay in the normal font.

- File: `tests/data-phrase-260b-settings.test.js`

## What it checks
- For a settings section's description and a settings row's description:
  - at least one number is in Reddit Mono (the data font);
  - the words are not in Reddit Mono;
  - the text reads exactly as the app gave it;
  - the number keeps the size of the phrase around it.
- Each case in English and in Arabic (with Arabic-Indic digits, right to left).
- No script errors.

## Why it exists
- Issue #260 "Owner decision: numbers in Mono inside phrases ("7 files", status bar counts)"; owner 2026-10-30 (in the file header).
- The file header says the old build wrote these strings as one normal-font text (the typography check's "phrase" finding on the settings page).
- Added in commit 771e9f40 (2026-10-30) "#260b: a count in a settings section or row description is in the data font".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws a SettingsSection with one SettingsRow, in English and then in Arabic, and reads the font of each piece of text.

## What a failure means
- Counts in settings descriptions would not stand out as data the way the owner decided, or the words around them would wrongly switch to the data font.

## When it runs
- A child of `layout` (AUTOMATIC in `tests/run.js`): layout starts it as a separate process when the SettingsLayout (patterns/SettingsLayout) changes. In a full run it always runs.
- The start condition names only that part; it does not check for a change to this file itself.
- CI: the "fixtures" browser job (`ci.yml`), which runs layout, on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "fixtures" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
