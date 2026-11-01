# picker-timezone-813

This test makes sure the date and time pickers show and save dates and times in the app's time zone, so a team in several countries sees the same thing whatever zone each computer is set to.

- File: `tests/picker-timezone-813.test.js`

## What it checks
- Without a browser (`platform/utils/zone.ts`):
  - a wall-clock time in New York gives the right moment in winter (UTC-5) and in summer (UTC-4);
  - 02:30 on the day the clocks go forward (a time that does not exist) reads as 03:30 after the change;
  - 01:30 on the day the clocks go back (a time that happens twice) is the earlier moment;
  - midnight lands on its own day, and a moment just after UTC midnight is still the evening before in New York;
  - today in two zones 25 hours apart is two different dates;
  - a zone the browser does not know counts as no zone.
- In the browser, with the computer's zone set to a different zone than the app's:
  - Tokyo on a Los Angeles computer: DatePicker with a time shows the moment's date and time in Tokyo, names Tokyo's zone, and saves a chosen time or day as the moment in Tokyo.
  - TimePicker (list and segments) shows a moment's time in Tokyo and saves a typed, chosen or stepped time as the moment on the same day there. A plain "HH:MM" value stays "HH:MM".
  - Without a time zone both pickers give exactly what they gave before.
  - The calendar's today mark and the Today preset are the app zone's today (Pago Pago on a Kiritimati computer, whose dates always differ).
  - New York around its clock changes, on a Tokyo computer: EST or EDT named for the value, the skipped and the repeated time saved as above.
  - Keyboard around midnight: Alt+Arrow Down opens the calendar on the chosen New York day, Arrow Right moves, and Enter chooses.
  - Arabic (ar-EG) in Cairo, right to left: Arabic-Indic digits, the Arabic month and zone names, the Cairo day chosen in the calendar, and the calendar button at the inline end. Left to right, the button is at the other end.
- No script errors.

## Why it exists
- Issue #813, from the Semi study (#767, item C). The owner approved building it on 2026-11-01 ("Implement all semi items", chat).
- LocaleProvider already accepted a time zone, but DatePicker and TimePicker read and wrote the computer's zone.

## How it checks
- First in Node: loads `platform/utils/zone.ts` (converted with Babel).
- Then in headless Chrome at 1100 by 900 pixels: emulates the computer's zone, opens `tests/fixtures/platform-host.html`, draws each picker inside a LocaleProvider with the app's zone, types, presses keys and clicks, and records what each picker gives.

## What a failure means
- People in different countries would see a meeting or a deadline at different times or on different days.
- A time picked near midnight or on a clock-change day could be saved on the wrong date.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when DatePicker, TimePicker, Calendar or `utils/zone.ts` changes, or when this test's file changes. A change under `platform/providers/` reaches the fixed slice, which starts it too.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Node, with `@babel/standalone` from `node_modules`.
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
