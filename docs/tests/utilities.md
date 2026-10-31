# utilities

Long lists scroll smoothly, keyboard shortcuts work, and copying a value tells the person (and a screen reader) that it was copied.

- File: `tests/utilities.test.js`

## What it checks
- Long lists (virtualization: only the visible rows are drawn):
  - The giving history's list of all 10,000 gifts draws fewer than 60 items at a time.
  - Each item knows its place in the whole list, and the scroll length matches all 10,000 rows.
  - The list writes no inline style.
  - Scrolled to the middle, the middle items (around number 5,000) are in view.
  - A focused item stays drawn after scrolling away from it.
  - A list whose rows have different heights scrolls steadily downward, with no jumping back.
- Keyboard shortcuts (hotkeys):
  - A single key runs its command (N opens New member).
  - A sequence runs its command (G then M opens Members).
  - A shortcut is ignored while typing in a field.
  - A chord (Ctrl Shift P) opens the command palette with the focus inside.
  - At least six labeled shortcuts are in the shortcut list.
- Copy and announce: pressing "Copy announcement ID" fills the clipboard with the ID, shows that it was copied, and writes "Copied" into the polite announcement area (read by screen readers, hidden from sight).
- No script errors on the pages.

## Why it exists
- The behavioral utilities must work in Chrome on the St. John test site, not on the design spec: owner decision 2026-10-25 (in the file header).
- Added in commit 492a938a "0.31.42: The complete library, wave 1".
- The style audit that used to be here is checked once, by Pages: owner decision 2026-10-26 (in the file header).

## How it checks
- Opens St. John the Beloved test site pages in Chrome at 1440 × 1000: the giving history (gifts), the home page, and an announcement's edit page.
- Scrolls the lists, presses keys, clicks the copy button, and reads the clipboard (clipboard permission is granted to the test page).

## What a failure means
- A long list is slow, jumps while scrolling, loses the focused row, or shows the wrong length.
- Keyboard shortcuts do nothing, or fire while a person is typing in a field.
- Copying gives no sign that it worked, or a screen-reader user hears nothing.

## When it runs
- AUTOMATIC group in `tests/run.js`.
- In changed mode it runs only when one of these changes: the virtualization, hotkey, live-region or clipboard records of the design system; the code for virtualization (`hooks/useVirtualizer.js`), hotkeys (`utils/hotkey.ts`), announcements (`utils/announce.tsx`) or the clipboard (`utils/clipboard.ts`); RichText or RichTextEditor; a global file; or this test's own file.
- CI (`ci.yml`): the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`full.yml`): the "fixtures" browser job.
- By hand: `node tests/utilities.test.js`, or `npm run test:utilities`.

## What it needs
- Chrome (headless) and the local test server (`tests/lib.js`).
- The St. John test site checkout and this checkout's local CDN build in `release/cdn/<version>/`.
- A database for the site: an in-memory one by default; in CI, the job's throwaway PostgreSQL 16.
