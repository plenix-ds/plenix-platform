# chat-s1-637

Chat bubbles use the owner's chosen colors, outlines and corners, and each sender's photo sits on the bubble's top edge without covering any text, in light, dark and right to left.

- File: `tests/chat-s1-637.test.js`

## What it checks
- Source rule: the chat stylesheet (`platform/components/Chat/chat.css`) never styles a bubble, time or photo through its parent message.
- Light, left to right, with the owner's exact colors:
  - The thread is white.
  - Theirs: fill gray-75, outline #A9B8C7, text #253442.
  - Yours: fill #E6F0FC, outline #B2CBE9, text #253442.
  - Every bubble: a 1px border, the card's 6px corner, equal 12px left and right padding.
  - Every photo: a 1px border in its bubble's outline color, on its bubble's fill.
  - The photo sits 12px above the bubble's top edge, 8px in from the start edge for theirs and from the end edge for yours; a bubble with a photo has 24px top padding, so the photo covers no text.
- Right to left (RTL, for Arabic): the photo positions are mirrored and still cover no text.
- Dark: theirs gray-900 with a gray-700 outline and gray-200 text; yours gray-700 with a gray-500 outline (no blue).
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface), slice 1: "the owner's message colors", the card corner and the corner-overlap photo from the owner's mockup, stated in the file header.
- From the file header: before #637, your message was solid action blue with white text, the photo sat beside theirs only, and the stylesheet set the bubble from its parent.
- Added in commit 5e4edabf "#637 slice 1: the owner's message colors as new palette steps, outlined bubbles, the corner-overlap photo".

## How it checks
- Reads `platform/components/Chat/chat.css` as text for the source rule.
- Opens `tests/fixtures/platform-host.html` and draws a chat thread with messages from two people with the real Platform, in light left to right, then right to left, then dark.
- Reads colors, borders, corners, padding and the photo's position against its bubble and the text.
- No baseline file: the expected colors are written in the test.

## What a failure means
- Chat messages could show the wrong colors, lose their outline, or have a photo overlapping the message text.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. (Its header's Usage line names no runner; the wiring is in `tests/layout.test.js`.)
- In changed mode (`npm test` and CI), Layout starts it only when Chat or Avatar changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the parts listed above. Run it by hand: `node tests/chat-s1-637.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
