# section-headings-502

This test makes sure long section and navigation group headings stay readable in narrow side panels: they wrap to a second line, and if still cut, show the full text in a tooltip.

- File: `tests/section-headings-502.test.js`

## What it checks
- In a navigation list 192 and 140 pixels wide:
  - "PROJECT COMMAND CENTER" wraps to two lines (40 pixels high); "GENERAL" stays one line (32 pixels);
  - the open/close arrow stays at the heading's end;
  - a long static (non-collapsible) heading wraps too.
- A plain collapsible section outside navigation wraps the same way, with its arrow at the end.
- At 140 pixels, the cut heading shows its full text in a tooltip on mouse hover and on keyboard focus; the button's name is the full heading.
- A form field label and a property list label that fit show no tooltip.
- No script errors.

## Why it exists
- Issue #502: at the supported 192-pixel sidebar width, longer group headings such as "Project command center" were cut off with "…" and unreadable (reported from AITEAM's use of Plenix).
- Owner-approved scope: every CollapsibleSection heading, navigation groups included (file header).
- Added in commit 5914b455 "#536 review and the owner's scope: every CollapsibleSection heading wraps; the Tooltip wrapper keeps the chevron at the end; the #502 test; static headings hover-only, said plainly".

## How it checks
- Opens `tests/fixtures/platform-host.html` in headless Chrome at 900 by 900 pixels, draws the lists, section, field and property list at set widths, measures heading heights and arrow positions, then hovers and focuses to look for the tooltip.

## What a failure means
- People would see section names cut short in the side panel and could not tell groups apart; keyboard users might not get the full name.

## When it runs
- A child test, started by `tests/layout.test.js` (AUTOMATIC in `tests/run.js`).
- In changed mode, layout starts it when CollapsibleSection, NavList, Tooltip, Field, PropertyList or `utils/overflow.js` changes, when a global file changes, or when `layout.test.js` itself changes. It also starts it when this test's own file, or a fixture it loads, changes (issue #756).
- In a full run it always runs.
- CI: with layout in the "fixtures" browser job (every pull request, and pushes to styling/phase-2 and main). The full suite: its "fixtures" job.

## What it needs
- Headless Chrome (CHROME_PATH) and the local test server (`tests/lib.js`).
- `tests/fixtures/platform-host.html` and the built Platform bundle.
