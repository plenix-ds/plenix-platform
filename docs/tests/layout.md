# layout

Plenix pages keep the right shape for their kind (full width, a centered column, panes, or a distraction-free editor), and split views, right-to-left rows and hidden screen-reader text behave on every page.

- File: `tests/layout.test.js`

## What it checks
- Each of the five layout modes, drawn in a real AppShell (the page frame: header, navigation, inspector, footer) at 1440px:
  - Fluid (a workspace page): a wide block fills the content width; the navigation and the inspector show.
  - Contained (a settings page): the content is one column at most 960px wide, centered.
  - Hybrid (a detail page): paragraphs at most 760px, forms at most 960px, other blocks full width.
  - Multi-pane (a master-detail page): the main region does not scroll as a whole; each pane scrolls on its own.
  - Focus (an editor page): the navigation and the inspector are hidden, the header and footer stay, and the main region gets the freed width.
- Each page kind gets its mode from the standard.
- A SettingsLayout page is contained without saying so: its column is at most 960px and centered, and every settings section is a card.
- DirectionProvider with `follow` reads the page's own direction, follows a change to right to left and back, and writes nothing to the page (#262).
- `dir` and `lang` on a Checkbox, Radio or Switch go on its row, so the box sits on the reading start in right to left (RTL, for Arabic) (#420).
- A Fieldset with `dir="rtl"` and `lang="ar"` passes them to its fieldset, so a RadioGroup inside puts its box on the right (#420).
- A Button, MenuItem, Tree, Card and NavList draw an imported icon module exactly as they draw the icon by name (#280).
- SplitView stacks under 900px of its own width and sits side by side from 900px (#410).
- SplitView, when stacked, turns its divider horizontal, keeps its keyboard focus and drags the first panel's height; a narrow split view has the stacked divider from its first frame (#237).
- SplitView, when stacked, has one full-width bar between the panels; Up, Down, Home and End move it to its limits; the second panel keeps at least 160px; side by side again, no stacked bar remains (#560).
- Screen-reader-only text at the end of the page (the announcer, a VisuallyHidden text, drag-and-drop instructions, a live region) takes no room, so a page that fits the window does not scroll, left to right and right to left (#288).
- Before its own checks, Layout starts about 50 child tests, each when what that child covers changes, or when the child's own file (or a fixture it loads) changes.

## Why it exists
- The layout standard: page kinds map to the five layout modes (`providers/pageLayouts.js`), as stated in the file header. Added in commit 15ce0b0c "The five layout modes, built in AppShell (batch 217)".
- Settings sections as cards: owner decision 2026-10-13 ("the cards view"), quoted in the check's name.
- Later checks name their issues in the code: #262 (DirectionProvider follows the page), #420 (right to left reaches the right element; owner, ctm-needs-34), #280 (icon modules in component slots), #410 (SplitView's stacking width), #237 (SplitView kept a side divider after its panels stacked), #560 (the stacked SplitView bar), #288 (screen-reader texts made every page scroll by about 20px).

## How it checks
- Writes a temporary page, `tests/.layout-test.html`, that loads `platform/platform.css`, the vendored React and `platform/dist/platform.js` straight from the checkout (`file://`, no web server).
- Draws each case with the real Platform components in a 1440 by 900 window, then measures boxes, widths, scroll settings and attributes.
- For SplitView it resizes the holder and presses keys on the divider; for the hidden-text cases it measures how far the page can scroll.
- No baseline: every limit is written in the test.
- Since issue #756 the browser closes and the temporary page file is deleted however the run ends: after the last check, or when a check throws.

## What a failure means
- A page could ignore its layout: text running the full width of a wide screen, settings not centered, or an editor still showing side panels.
- A split view could stay side by side when too narrow, or lose its divider or keyboard focus when it stacks.
- In Arabic, check boxes and radio buttons could sit on the wrong side of their labels.
- Every page could scroll a little for no visible reason.
- A failing child test stops Layout at that point: the remaining children and Layout's own checks do not run.

## Fixed defect
- Issue #750 is fixed (commit 173ae712): the test used to close its browser before its last checks (SplitView, right to left, icons, hidden text, settings). The browser now closes only after the last check, so every check runs as written.

## When it runs
- AUTOMATIC in `tests/run.js`: part of `npm test` (changed mode) and `npm run test:full`.
- In changed mode its own checks run only when one of these changes (or a part built on one of them): AppShell, SettingsLayout, SplitView, Toolbar, ActionBar, VisuallyHidden, DirectionProvider, Checkbox, Fieldset, Icon; or a global file (the small fixed slice); or this test's file. Otherwise it prints `LAYOUT_OK 0/0 (nothing in scope)`.
- Its child tests are checked first, even when Layout's own checks are out of scope. Each starts when what it covers changes (its own list of parts and apps), when a global file changes, or when its own file (or a fixture it loads) changes (issue #756).
- A change under `platform/charts/`, `platform/templates/` or `platform/providers/` reaches the small fixed slice, which starts every child.
- CI: the "fixtures" browser job (`site-coverage visual layout zero-overlap charts-echarts-353 sparkline-echarts-353 treechart-echarts`), on every pull request and on pushes to styling/phase-2 and main.
- Full suite (`.github/workflows/full.yml`): the "fixtures" browser job.

## What it needs
- Headless Chrome (`launch` in `tests/lib.js`, CHROME_PATH).
- The built Platform: `platform/dist/platform.js` (from `node build-app.js`).
- No web server and no St. John test site for its own checks; each child test starts the local test server itself.
