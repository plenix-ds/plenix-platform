# chat-s4-637

People can react to, reply to, quote, copy, forward, edit and delete chat messages from a small action bar that appears only when wanted and never covers the text.

- File: `tests/chat-s4-637.test.js`

## What it checks
- Every case in light and dark, left to right and right to left, English and Arabic.
- The action bar (React, Reply, More):
  - Hidden at rest; a deleted message has none.
  - Shown on hover or keyboard focus, beside the bubble: theirs at its end side, yours at its start side (mirrored in right to left), covering no text.
  - Its buttons are named React, Reply and More actions (in Arabic from the catalog).
- The More menu: Reply, Quote, Copy text, Forward, then Edit and Delete on your own messages only; Delete is the danger item. Theirs has no Edit or Delete.
- Reactions: pills under the text named "<name>: <count>"; yours is pressed and outlined in the action color. React opens the six quick reactions and More reactions; a quick reaction reports its emoji to the app.
- A quote inside the bubble shows its author and text; "· Edited" shows in the footer; a deleted message says "This message was deleted" with no quote or reactions.
- The composer shows "Replying to <name>" with a Cancel button.
- Every icon-only control is a bordered button.
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface), slice 4; the owner's go, "ready to slice 4!!!", built as drawn in 637-s4, quoted in the file header.
- From the file header: before slice 4 a message had no action bar, reactions, quote, edited or deleted state, and the composer had no reply line.
- Added in commit 3c4dfbc7 "#637 slice 4: message actions and reactions, as drawn (the owner's go)".

## How it checks
- Opens `tests/fixtures/platform-host.html` in a 900 by 900 window and draws a chat thread with theirs and yours with the real Platform, for each mode, direction and language.
- Hovers and focuses messages, opens the More menu and the reaction picker, picks a reaction, and reads the bar's position, the menu items, the pills and the texts.
- No baseline.

## What a failure means
- A person could be unable to react to or act on a message, see Edit or Delete on someone else's message, have the action bar cover what they are reading, or see English labels in an Arabic chat.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. (Its header's Usage line names no runner; the wiring is in `tests/layout.test.js`.)
- In changed mode (`npm test` and CI), Layout starts it only when Chat changes, or a part Chat is built on changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only Chat. Run it by hand: `node tests/chat-s4-637.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
