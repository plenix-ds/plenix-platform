# branch-loader-814

This test makes sure a big folder list or category list opens at once, because each branch loads only when someone opens it. While it loads it says so, and a failed load can be retried.

- File: `tests/branch-loader-814.test.js`

## What it checks
- Without a browser: the loading and failure words are in English (`en.js`, mirrored in `en.json`) and in the Plenix Arabic catalog (`ar.js`), key for key.
- In the browser (each load is answered by hand from the page, so nothing waits on a timer):
  - Tree:
    - nothing loads before a branch opens; opening Europe asks for its children once;
    - while it loads the item is busy and a status announces "Loading Europe" next to "Loading…";
    - a failure shows "Couldn’t load these items" with a Try again button and is announced;
    - Arrow Right asks again, the children show, and Arrow Right moves to the first one;
    - closing and opening a loaded branch does not ask again;
    - Arrow Right opens and loads another branch from the keyboard.
  - A hierarchy without `loadChildren` works as before.
  - TreeSelect:
    - Arrow Right opens and loads a branch, and Enter chooses a loaded child;
    - search finds a loaded child, and a branch not loaded by its own label, without loading it;
    - with several choices, checking a branch that has not loaded loads it, then checks everything under it.
  - Cascader: choosing a parent loads its column (busy, "Loading…"); a loaded leaf is chosen and the field shows its path; search finds the loaded leaf.
  - Right to left in Arabic:
    - Arrow Left opens and loads a branch;
    - the loading and failure words are Arabic;
    - the status row starts from the right;
    - the column chevrons point left (left to right they point right).
- No script errors.

## Why it exists
- Issue #814, from the Semi study (#767, items B and E). The owner approved building it on 2026-11-01 ("Implement all semi items", chat). It supersedes part of #806 (TreeSelect speed).
- Before it, the whole hierarchy had to be loaded first.

## How it checks
- First in Node: reads the "branch" sections of the three catalogs.
- Then in headless Chrome at 1100 by 800 pixels: opens `tests/fixtures/platform-host.html` and draws each part with a `loadChildren` whose answers the test gives by hand (success or failure). It then clicks, presses keys and reads the rows, the busy states, the announcements and the values.

## What a failure means
- A big hierarchy could load everything up front again, or ask the server for the same branch more than once.
- People could wait with no sign that something is loading, or be stuck after a failed load with no way to retry.
- In Arabic the words or the arrows could be wrong.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode, Layout starts it when Tree, TreeSelect, Cascader, MillerColumns or `hooks/useBranchLoader.ts` changes, or when this test's file changes.
- A full run always runs it. CI: the "fixtures" browser job (Layout's job).
- Written, not run: the owner starts the tests.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
