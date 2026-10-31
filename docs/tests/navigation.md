# navigation

This test makes sure moving around the Plenix apps behaves the way people expect from the web: every screen has its own address, the browser's Back button works, unsaved work is protected, and the last screen comes back on reload.

- File: `tests/navigation.test.js`

## What it checks
- Screens: opening a note gives it its own address (#/note/<id>) and a history entry; Back returns to the list and its empty state.
- Deep links: an address opens its screen directly without padding the history.
- Unsaved changes: opening another screen, pressing Back, or following a link to another app asks with the Plenix dialog "Leave without saving?", never the browser's own box; "Keep editing" stays, "Leave" goes; closing the tab asks with the browser's warning.
- Narrow screens (390 pixels wide): in Notes, Messages and Contacts the list fills the screen with no item selected; choosing an item shows its detail with one "Back to …" control that gets focus; the browser's Back and the Back control return to the list, and focus returns to the chosen item.
- Restoration: on reload, Notes opens the last screen, kept in the browser's storage under plenix.notes.view.
- Asset Manager settings: choosing a section adds a history entry (never rewrites the current one), and Back returns to the previous section.
- Calendar: month, week and day views each have their address (#/week/2026-03-01, #/day/2026-03-05), each a history entry; Back returns; an address opens its day.
- Asset Manager search: typing does not change the address; Enter and choosing a sort each add one entry; Back restores the previous search; an address with filters opens with them.
- Search view at narrow width: Enter searches and closes the view; the search is kept among recent searches; results show; a result opens its screen in place of the view's entry.
- Old addresses: #t-2 opens #/thread/2, #account opens #/account.

## Why it exists
- Plenix's Platforms Standard sections 4.3 and 8.1 ("Navigation", "Restoration") and 5.2 ("List-detail") (file header).
- Added in commit 9fdd281a "0.31.38: Web wave B: history, guard, list-detail, Sheet; token rename".

## How it checks
- Headless Chrome opens the Notes, Messages, Contacts, Calendar, Settings and Asset Manager pages, clicks rows and links, and reads the address, the history length, what is shown, and which element has focus.

## What a failure means
- The Back button could leave the app or go to the wrong place; a shared link might not open the right item.
- A person could lose unsaved work without being asked.
- On a phone, the list and detail could overlap, or there would be no way back to the list.
- Reloading would lose the person's place.

## When it runs
- AUTOMATIC in `tests/run.js`.
- In changed mode: only when Notes, Messages, Contacts, Calendar, Settings or the Asset Manager (or what they use) changes.
- CI: the "behavior" browser job, on every pull request and on pushes to styling/phase-2 and main.
- The full suite: its "behavior" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- The built suite app and Asset Manager pages.
