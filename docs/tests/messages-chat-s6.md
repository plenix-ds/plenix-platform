# messages-chat-s6

The Messages app shows conversations with the shared chat parts (date lines, grouped messages, photos and sent/read status) and still sends replies, and the design spec's Chat page shows every part with the owner's rules.

- File: `tests/messages-chat-s6.test.js`

## What it checks
- The Messages app, conversation `#/thread/1`, at 1400 by 860:
  - One date line above the messages; five messages in five runs (each side alternates here); one photo per run, on the bubble.
  - The person's own messages (two) show their status.
  - The messages are inside a Chat.Group.
  - A reply typed and sent is added as the last message, yours, with the status "sent", and the box clears.
  - On an Arabic page the layout mirrors (their photo on the right half of the bubble) and the app still works.
- The design spec's Chat page:
  - Its examples draw a run, a date line, attachments and a voice message.
  - The avoid list holds the owner's rules ("Ratings, review stars", and the photo "crossing the border" rule).
  - The slice 4 place is marked ("Slice 4: not on this page yet").
- No script errors.

## Why it exists
- Issue #637 (Chat dialogue interface), slice 6, stated in the file header.
- From the file header: the old Messages app had no photo, no run, no date line and no status, and the old spec page had no examples of these parts and no slice 4 place.
- Added in commit 47c7a03d "#637 slice 6: the Messages app on the Chat parts (date line, runs, photos, status) and the Chat spec page with every part and the owner's rules (spec lane)".

## How it checks
- Starts the local test server and opens the real suite page `messages/index.html#/thread/1`; counts the chat parts, types and sends a reply, then switches to Arabic, right to left.
- Opens the design spec page `platform/design-system/index.html#/specialized/typing-indicator` and reads its examples and text.
- No baseline.

## What a failure means
- In the Messages app a person could lose the date lines, photos or sent/read status, or be unable to send a reply.
- The design spec could show an incomplete Chat page or leave out the owner's rules.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when the Messages app (the `messages/` folder) changes, when Chat or Avatar changes, or a part built on one of them changes.
  - Since issue #756 the start line names Messages as an app (`apps: ['messages']`), the way `tests/changed.js` records it, so a change to the Messages app alone starts this test.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/messages-chat-s6.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The built Messages app (`messages/app.js`, from `node build-app.js`).
- The design spec submodule checked out at `platform/design-system/`.
