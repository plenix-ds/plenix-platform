# field-sizing

Fields inside toolbars (drop-down lists, search boxes, text boxes) size to their content within sensible limits, give way only after buttons have folded, and show cut-off text in full in a tooltip.

- File: `tests/field-sizing.test.js`

## What it checks
- In a Toolbar, a Select, a Search and an Input without a set width size to their content between 100px and 320px:
  - A short Select is widened to 100px.
  - A Select with a very long choice stops at 320px.
  - Outside a bar the width scale keeps its meaning: a Select with `width="sm"` is exactly 80px.
- The order, in one bar swept from 700px down to 200px:
  - While any Button is still shown, the Search keeps its natural width and the bar does not let its fields shrink.
  - The Search narrows only once every Button is in More, and never below 100px.
- A copy of the Asset Manager's System settings > Database > Records toolbar (Buttons with icons, a group, an icon-only Button, a Delete menu button, a Search):
  - Does not overflow, and the page does not scroll sideways, at 480px, 360px and 320px.
  - At the icon-only step the Delete menu button drops its words and keeps its name as its accessible label; with every word shown it keeps them.
  - At 320px the icon-only Reset settings Button is in More, and the menu lists it by name.
- Cut text shows in full in a tooltip only while it is cut: a Combobox on keyboard focus (a short one gets none), an Input in a bar on focus, a Search in a bar on hover, a DatePicker and a TimePicker on focus, and a Select on hover and on keyboard focus.
- A field in a Popover opened from a Toolbar does not take the bar's content sizing; a field in the bar does.
- Every case runs left to right and right to left. No script errors.

## Why it exists
- Issues #558 ("Fit-and-overflow: combo and select sizing") and #554 ("Fit-and-overflow: fields in bars ... shrink before overflowing"), and the standard `platform/standards/fit-and-overflow.md`, named in the file header.
- The Select tooltip on keyboard focus: #577. The overlay opened from a bar: #669. Both in the file header.
- Added in commit 72c4fe6e "Field sizing in bars (#558, #554): fields size to their content between 100px and 320px, shrink after the Buttons have folded; menu buttons drop their words; Select and TreeSelect tooltips for cut text".

## How it checks
- Opens `tests/fixtures/platform-host.html` and draws each case with the real Platform. The Records toolbar is rebuilt in the test page from the same parts; the Asset Manager page itself is not opened.
- Measures widths, reads which buttons show and with what words, checks for overflow and sideways page scroll, opens the More menu, and focuses or hovers fields to look for a tooltip.
- Resizes the window for the Records toolbar (1400, 480, 360, 320px).
- No baseline.

## What a failure means
- A drop-down list could be too narrow to read or so wide it crowds out everything else.
- A search box could shrink while buttons still take the room, or a toolbar could spill past the screen on a phone.
- A person could see cut-off text with no way to read the whole value.

## When it runs
- A child test of the Layout test (`tests/layout.test.js`), which is AUTOMATIC in `tests/run.js`.
- In changed mode (`npm test` and CI), Layout starts it when Input, SearchField, Combobox, TreeSelect, DatePicker, TimePicker, Toolbar, ActionBar, CommandBar, Tooltip, `utils/barFit.ts`, `utils/overflow.ts` or `system/layout-modes.css` changes, or a part built on one of them changes.
- Layout also starts it when a global file changes (the small fixed slice) or when `tests/layout.test.js` itself changes.
- Layout also starts it when this test's own file, or a fixture it loads, changes (issue #756). By hand: `node tests/field-sizing.test.js`.
- A full run (`npm run test:full`, and the full suite `.github/workflows/full.yml`) runs it every time.
- CI job: the "fixtures" browser job (Layout's job), on every pull request and on pushes to styling/phase-2 and main.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The local test server (`serve` in `tests/lib.js`).
- The test page `tests/fixtures/platform-host.html`, which loads this checkout's built Platform (`platform/dist/platform.js`).
