# toolbar-ladder

Toolbars and footer button bars stay on one line as space runs out, folding buttons in a fixed order into a More menu, and unfold again when space comes back.

- File: `tests/toolbar-ladder.test.js`

## What it checks
- A Toolbar with five Buttons (New, Edit, Share, Export, Delete) never wraps and never overflows:
  - At 520px every Button keeps its words and there is no More.
  - A late font (issue #777): a toolbar first measured with wider text folds; when the page's fonts finish loading it measures again and shows every word. Before the fix a bar measured while DM Sans was still loading stayed folded.
  - At 360px the Buttons with an icon drop their words (icon only; the name stays as the accessible name); the primary keeps its words.
  - At 240px the bar shows New, Edit, Delete and More: the primary keeps its words and Delete stays (danger folds last).
- An ActionBar (a footer bar: Delete, Another choice, Cancel, Save changes) is one row at 520px, 360px and 240px, never overflows and never hides all its words:
  - At 520px it keeps four buttons; at 240px it shows Cancel, More and Save changes.
  - Its More menu lists Another choice, then Delete.
- In a window under 400px the primary button is first and full width, and More sits on Cancel's row.
- Growing the window back unfolds everything.
- Right to left gives the same rows, mirrored.
- No script errors.

## Why it exists
- Stage 4 of the fit-and-overflow standard (`platform/standards/fit-and-overflow.md`), which the file header calls "issue 477".
- Added in commit c1ccaf9e "Stage 4: the toolbar ladder, finished: the ActionBar starts again when a phone window grows back and keeps Cancel; the Toolbar without foldable Buttons skips the ladder; the test, the changelog, the standard's footer row".

## How it checks
- Opens `tests/fixtures/platform-host.html` and draws three Toolbars and three ActionBars at fixed widths (520, 360 and 240px) with the real Platform, left to right and then right to left.
- Counts the visible buttons, their words and the number of rows, checks for overflow, and opens the 240px footer's More menu.
- Then shrinks the window to 360px and grows it back to 900px.
- No baseline.

## What a failure means
- On a narrow window, a toolbar could wrap onto two lines or spill past its edge, a key action such as Delete or Save could vanish, or buttons could stay folded after the window grows again.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when Toolbar, Button, ActionBar, `utils/barFit.ts` or `utils/foldOrder.ts` changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/toolbar-ladder.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
