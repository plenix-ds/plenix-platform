# monitor-widths

A side panel remembers the width a person dragged it to separately for each monitor, so moving between a laptop and a large screen keeps the right width on each.

- File: `tests/monitor-widths.test.js`

## What it checks
- A width saved the old way (one value of 480) on a 1920x1080 monitor shows 480 and is stored under "1920x1080".
- A 2560x1440 monitor with nothing saved starts at the default; pressing End there saves 1600 under "2560x1440"; both monitors are kept.
- Back on the first monitor, the panel still shows 480.
- Browser zoom is not a new monitor: 150% and 200% zoom on the same 1920x1080 monitor keep 480 and add no new entry.
- A monitor size within 10px of a stored one (1914x1076) shares its width.
- In a 1000px window the saved 1600 does not fit (90% is 900), so that window's default shows, and the saved value is kept; the 1000px default is narrower than the 2000px one.
- In a 2000px window the 1600 comes back.
- No script errors.

## Why it exists
- Issue #463 (panel size steps that stopped at 900px), option C, step 3: widths remembered per monitor, stated in the file header.
- The monitor is named by its physical size (screen size times the pixel ratio, to the nearest 10px) so browser zoom does not change it (file header).
- Added in commit bd34dba5 "#463 step 3: widths remembered per monitor".

## How it checks
- Opens `tests/fixtures/platform-host.html` several times, each time pretending to be a different monitor (it overrides the screen size and pixel ratio the page sees) and a different window width.
- Raises the side panel's limit to 1600px, draws a resizable SidePanel with the real Platform, measures its width, and reads what is saved in the browser's local storage (`plenix.paneWidths`).
- Presses End on the panel's divider to save a new width.
- No baseline.

## What a failure means
- A person with two monitors could find the panel at the wrong width each time they switch, or lose their chosen width when they zoom the browser.
- A saved width too large for a small window could push the content off screen.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when AppShell, SidePanel or NavPane changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/monitor-widths.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
