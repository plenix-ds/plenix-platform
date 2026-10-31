# formats

This test makes sure numbers, dates, times, money, sizes, names, addresses and phone numbers are written the same correct way everywhere in Plenix, for American and German readers.

- File: `tests/formats.test.js`

## What it checks
- The written Formats standard (`platform/standards/formats.json`) matches the formats built into the code (`utils/format.js`), word for word.
- The formatters write what the standard says, in US English and German, for example:
  - numbers: 1,234,567.891 and 1.234.567,891; signed "+12"; a non-number writes nothing;
  - file sizes: "1.2 MB", "24 kB"; durations: "1 hr, 5 min" and "1:05:00"; compact: "1.2K", "3.5M";
  - dates and times: "Mar 4, 2026", "4. März 2026", "2:05 PM", "14:05"; relative: "5 minutes ago", "yesterday", and past 7 days the date;
  - ranges: "Mar 4 – 6, 2026"; money: "$1,234.50", "1.234,50 €"; percent: "26%", "26 %";
  - person names, initials and lists; addresses laid out per country (US, Germany, UK); phone numbers in international and national forms.
- Date-only values (issue #342):
  - parseDate keeps 2026-10-18 as October 18 in a US time zone;
  - the parts that show dates read them through parseDate, never with their own Date, and no file in the Platform or the suite has a private date-only reader;
  - the Time component writes the date attribute 2026-10-18 and the text "Oct 18, 2026" in a US time zone.

## Why it exists
- The Formats standard: one written rule for how values are shown, which the code must follow (file header).
- Added in commit 492a938a "0.31.42: The complete library, wave 1". No further reason is recorded for the first version.
- The date-only checks come from issue #342 (a date-only value showed as the day before in US time zones) and the owner's option A, 2026-10-29 (recorded in `tests/date-only.test.js`).

## How it checks
- Node only, no browser. Loads `platform/utils/format.js` (converted with Babel) and compares its output with fixed expected strings.
- For the Time check it bundles `Time.jsx` with esbuild and renders it to HTML with React's server renderer.
- Switches the time zone to Los Angeles for the date-only checks.

## What a failure means
- A person could see the same kind of value written differently on two pages, a wrong thousands separator, a wrong currency layout, or a date shown one day early.

## When it runs
- AUTOMATIC in `tests/run.js`. It has no changed mode: every check runs every time.
- CI: the "Build and checks" job (tests without a browser), on every pull request and on pushes to styling/phase-2 and main.
- The full suite: its build job.

## What it needs
- Node with full international support (Intl with full ICU).
- From `node_modules`: `@babel/standalone`, `esbuild`, and React with its server renderer.
- `platform/standards/formats.json` and `platform/utils/format.js`.
