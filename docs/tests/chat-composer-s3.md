# chat-composer-s3

The chat message box works as one clean outlined box: typing and sending, attaching files, the emoji button and speaking a message aloud (dictation), in English and Arabic.

- File: `tests/chat-composer-s3.test.js`

## What it checks
- The microphone appears only where the browser can recognize speech: hidden without it, shown with it. (The test first proves it can see this difference.)
- There is no "Enter to send" hint.
- Send is disabled when the box is empty and enabled with text; Enter sends.
- The composer is one box with a 1px border; the text area inside has no border or fill of its own; focus changes the box's border.
- Tool order, left to right: Attach and Emoji at the start; the microphone, then Send, at the end.
- Right to left (RTL, for Arabic): the tools are mirrored (Send at the left, the microphone right before it).
- Dictation: the spoken words appear in the box as they come, in the page's language (en-US for English, ar-EG for Arabic), with "Listening…" and a Stop button; Stop ends it.
- Typing while dictating keeps the typed character and stops dictation.
- The emoji button opens a placeholder panel.
- Files: a dropped file and a pasted file reach the app; waiting files show as previews with the card's 1px border and 6px corner, an uploading file shows progress, a failed one offers Retry, and Send is off while a file uploads.
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface), slice 3; owner, 2026-10-29, named in the file header.
- Added in commit 056a700a "#637 slice 3: the Chat composer as one outlined box: attachments, emoji placeholder and dictation".

## How it checks
- Opens `tests/fixtures/platform-host.html` in a 900 by 900 window and draws a Chat composer with the real Platform, left to right and right to left.
- Removes Chrome's own speech recognition, then adds a stand-in (a stub) that the test controls, so it can feed "spoken" words without a microphone.
- Types, presses Enter, focuses, clicks the tools, and simulates dropping and pasting files; measures the positions of the tools and the borders.
- No baseline.

## What a failure means
- A person could be unable to send a message, see a messy box with double borders, find tools in the wrong order (especially in Arabic), lose typed words during dictation, or have attached files fail silently.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when Chat, Input or Popover changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/chat-composer-s3.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
