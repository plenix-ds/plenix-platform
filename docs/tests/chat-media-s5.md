# chat-media-s5

Pictures, files and voice messages inside a chat bubble work: pictures open full size, files download, voice messages play one at a time, and a broken picture says so.

- File: `tests/chat-media-s5.test.js`

## What it checks
- Pictures: three in one message; the one that does not load becomes a card that says it "could not be loaded"; a picture opens the viewer (MediaViewer), and Escape closes it.
- File card: the file icon and the Download link each have a 1px border; Download points at the file and is named "Download: cabinet-quotes.pdf".
- Voice messages:
  - Play turns into Pause; starting the second message pauses the first.
  - End on the seek slider moves to the end, and the slider reads the time as words ("23 seconds of 23 seconds"); every bar is then shown as played.
  - The speed button goes to 1.5×.
  - Play has a 1px border.
- The composer's record control is disabled, does nothing, and shows the tooltip "Voice messages coming soon"; the Attach button has a 1px border.
- On an Arabic page: the waveform stays left to right, and the time, the speed and the spoken time use Arabic-Indic digits, with the catalog's Arabic word for "of".
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface), slice 5, named in the file header.
- From the file header: the old build had no Chat.Attachment or Chat.Voice, and its composer icon buttons were borderless ghost buttons; commit 8848087d wrote Latin digits on an Arabic page.
- Added in commit ee4e220b "#637 slice 5: Chat.Attachment, Chat.Attachments and Chat.Voice in a bubble; bordered composer icon buttons; disabled record placeholder".

## How it checks
- Opens `tests/fixtures/platform-host.html` and draws a chat thread and a composer with the real Platform. The pictures are tiny built-in images (one deliberately broken), and the voice messages are a silent 23-second sound built in the page.
- Clicks pictures and buttons, presses keys on the seek slider, hovers the record control, and then switches the page to Arabic, right to left.
- Reads labels, borders, playback state and the text shown.
- No baseline.

## What a failure means
- A person could be unable to open a picture or download a file, hear two voice messages at once, or see wrong digits in Arabic.
- A broken picture could show as an empty box with no explanation.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when Chat, MediaViewer or Button changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/chat-media-s5.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
