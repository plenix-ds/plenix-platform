# project-notes-632

In the Projects app, each project shows the notes that belong to it.

- File: `tests/project-notes-632.test.js`

## What it checks
- A note belongs to the project whose name starts with its folder's first word ("Kitchen Reno" goes to Kitchen Renovation; "Apex Co" goes to Apex Co — Brand Refresh), the same rule the tasks use.
- Kitchen Renovation's Notes panel shows its two notes as cards (Contractor comparison, Cabinet style decisions), with no empty state.
- Apex Co's Notes panel shows its two notes.
- The project overview's Recent notes lists them (no "No notes yet.").
- A project with no notes (Home Purchase 2024) still shows its empty state.
- No script errors.

## Why it exists
- Issue #632, "Projects: the notes panel never shows (filter bug)".
- From the file header: before the fix a note's whole folder name ("Kitchen Reno") was compared with one word ("Kitchen"), so no project ever showed a note.
- Added in commit de4716d6 "#632 Projects: a project's notes show (the folder's first word, as the tasks match)".

## How it checks
- Starts the local test server and opens the real suite page `projects/index.html` at several addresses (each project's Notes panel and overview) in a 1280 by 860 window.
- Reads the note card titles, the empty state and the overview text.
- Uses the suite's built-in sample data. No baseline.

## What a failure means
- A person opening a project would see no notes, or "No notes yet.", even though notes exist for it.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`. (Its header's Usage line names no runner; the wiring is in `tests/layout.test.js`.)
- In changed mode (`npm test` and CI), Layout starts it only when the Projects application (the `projects/` folder) changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- A change to this test's own file alone does not start it through Layout: Layout checks only the Projects application. Run it by hand: `node tests/project-notes-632.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The built Projects app (`projects/app.js`, from `node build-app.js`).
- The hard time limit helper `tests/limit.js` (TEST_TIMEOUT_MS).
