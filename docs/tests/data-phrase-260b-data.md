# data-phrase-260b-data

In a phrase such as "40 pledges" under a metric, chart, record title, activity row or table cell, the number is in the data font and the words stay in the normal font.

- File: `tests/data-phrase-260b-data.test.js`

## What it checks
- For a Metric's description, a ChartFrame's description, a record page header's description, an activity row's details line and a Table cell whose text comes from the app:
  - at least one number is in Reddit Mono (the data font);
  - the words are not in Reddit Mono;
  - the text reads exactly as the app gave it;
  - the number keeps the size of the phrase around it.
- A table cell that the app gives as its own element keeps its text, and no data-font part is added to it.
- Each case in English and in Arabic (with Arabic-Indic digits, right to left).
- No script errors.

## Why it exists
- Issue #260 "Owner decision: numbers in Mono inside phrases ("7 files", status bar counts)"; owner 2026-10-30 (in the file header).
- The file header says the old build wrote these strings as one normal-font text (the typography check's "phrase" finding: 18 on 9 pages).
- Added in commit 91980098 (2026-10-30) "#260b: a count in a Metric, chart, record header, activity row or table value is in the data font".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome, draws the five parts with sample phrases in English and then in Arabic, and reads the font of each piece of text.

## What a failure means
- Counts inside phrases would not stand out as data the way the owner decided, or the words around them would wrongly switch to the data font.

## When it runs
- A child of `layout` (AUTOMATIC in `tests/run.js`): layout starts it as a separate process when Metric, the charts, RecordPage, ActivityList, the DataGrid or the Table changes. In a full run it always runs.
- The start condition names only those parts; it does not check for a change to this file itself.
- CI: the "fixtures" browser job (`ci.yml`), which runs layout, on every pull request and on pushes to styling/phase-2 and main. Full suite (`full.yml`): the "fixtures" job.

## What it needs
- Headless Chrome and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html`.
