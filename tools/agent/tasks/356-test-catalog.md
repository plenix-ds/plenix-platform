# Catalog of the automatic tests (for the #356 review)

From the owner's tests page (2026-10-26, after #348, #349, #350), checked against `tests/run.js`. Counts are copied from the page and not recounted from the code (unconfirmed). Chips: **strict** = any problem fails; **baseline** = known problems recorded, a worse page fails, the record can only shrink; **no browser** = reads files only.

Runner: `tests/run.js`. Automatic names (20): site-coverage, visual, layout, pages, keyboard, data-grid, typography, component-tokens, reflow, formats, utilities, focus-order, semantic-html, navigation, one-primary, brand-rules, login, selector-kinds, zero-overlap, types. On demand (5): a11y, high-contrast, contrast, theme, density. Spec only (1): labs.

| Test (file) | Mode | Looks at | Checks | Fails when |
|---|---|---|---|---|
| Site coverage (`site-coverage.test.js`) | strict, no browser | the test site's code vs the list of Platform parts | all 388 required parts are used (components, patterns, page templates, providers, app-called helpers); each page in the page list exists and is reachable. The only test that checks which parts the site uses | a part is unused |
| Pages (`pages.test.js`) | strict | every site page and app screen | no browser error or crash; every requested file loads; no inline style (the only test that checks it); no plain HTML table; no frames three deep | any, on any page (only the work log may be missing) |
| Component settings (`component-tokens.test.js`, baseline `component-tokens.json`) | baseline | real components on every site page | each component token set to a test value changes its part; hover, focus, pressed without a mouse; a token works if it moves its part on any page | a token moves nothing anywhere; 98 known, each with a reason |
| Visual (`visual.test.js`, baseline `button.json`) | strict | 840 buttons (6 styles x 5 sizes x 7 states x 4 forms) plus a group, light, Standard | about 30 computed values per button vs the saved look; icon and menu arrow size, color, rotation; widths left out | any value differs from the saved look |
| Layout (`layout.test.js`) | strict | an app frame at 1440px in five layout modes | fluid, contained (<=960), hybrid, multi-pane, focus; page kinds get their mode; settings pages contained | any of 16 checks |
| Text alignment (`typography.test.js`, baseline `typography.json`) | baseline | all text on every app and site page, light | marked values in Mono; no sentences in Mono; technical-looking values in Mono; one baseline across Mono and DM Sans | more problems than recorded (50 known: 43 values, 5 sentences, 2 baselines). Red today on the dashboard (issue #256) |
| Narrow screens (`reflow.test.js`, baseline `reflow.json`) | baseline | every page at 320px | no sideways scroll of the page or inside it; nothing cut off; allowed: tables and grids, calendar time grid, maps, images, image editor, code | a new problem or more elements than recorded (28 known in 16 places) |
| Keyboard (`keyboard.test.js`) | strict | real key presses on site components | toolbars, ratings, tabs, trees, settings sections, recent searches, command bar, filter panel, selection bar; right-to-left reversal | any of 35 checks |
| Focus order (`focus-order.test.js`, baseline `focus-order.json`) | baseline | every page | no forced tab positions; reading order; skip link first; Rename member dialog focus in and back | more than recorded (5 known) |
| Page structure (`semantic-html.test.js`) | strict | every page as a screen reader sees it | one header, main, navigation; named navs when several; at most one h1; no skipped heading levels | any page |
| Navigation (`navigation.test.js`) | strict | suite apps moved through like a person | addresses and history, direct links, parent button, unsaved-changes dialog, 390px one-pane views, restore on reload, calendar, asset search, old addresses | any of 34 checks |
| Tables (`data-grid.test.js` + regression files) | strict | every Table and DataGrid in apps and site | builds with rows, empty or error with Retry; name; row height; cell centering by density; group rows; column menu; footer tab order; runs the grid regression files (search, sort, select, group, scroll, panes, saved views) | any table problem. Not here: accessibility scan (on demand), fonts (Text alignment), inline styles (Pages) |
| Utilities (`utilities.test.js`) | strict | helpers on the site in Chrome | list virtualization (10,000 rows), keyboard shortcuts, screen-reader announcements, copy to clipboard | any of 16 checks or a page error |
| Formats (`formats.test.js`) | strict, no browser | the formats standard and the code | standard and code agree; numbers, durations, short numbers, relative times, currency, percentages, addresses, two languages | any value differs |
| Brand rules (`brand-rules.test.js`) | strict, no browser | brand rules file and settings | settings exist; logo minimums and steps; clear space on the 4px grid; logo files exist | any mismatch |
| Sign-in service (`login.test.js`) | strict | the sign-in server on a throwaway data folder | two accounts; sign-in sets the cookie; web-server auth check; save service reads the person. Kept for now; the Owner desk confirms whether it stays | any step fails |
| Style rules (`selector-kinds.test.js`, `zero-overlap.test.js`) | strict | sample pages for the style checkers | the style checker sorts every sample rule right; no component styles another (expected overlaps only; pilot page none) | a checker sorts wrong or an unexpected overlap |
| Developer hints (`types.test.js`) | strict, no browser | the published type definitions | sample app code compiles in strict mode against them (needs TypeScript) | correct code is rejected |
| One primary (`one-primary.test.js`) | strict | application pages only (not the test site), as drawn | at most one visible primary button (`.plx-button--primary`) per page, not counting dialogs, popovers, menus, hidden or inert content (owner 2026-10-24, buttons study #298). Not on the owner's tests page | a page shows two or more |

## Changes on 2026-10-26 (what to check for lost coverage)

- Tables: no accessibility scan (on demand), no font check (Text alignment does it), no inline-style check (Pages does it). Run time 488 s to 409 s.
- Visual: light mode at Standard only, 840 buttons instead of 5,040. Run time 5.3 s to 2.9 s.
- Text alignment: light mode only. 309 s to 157 s.
- Utilities: its own style check removed (Pages covers it).
- Component settings: no longer lists which parts the site reaches (Site coverage does).
- 52 unused one-off test files deleted (#348); the six newest fix checks kept inside the group tests (#350).
- All 18 tests: 23.8 min to 19.7 min on the dev computer, full run.

## Where the tests run

- Per push and pull request (`ci.yml`, changed mode): job "Build and checks" runs build, `check-system`, `check-spec`, release build, then `formats brand-rules login types`. Six parallel browser jobs run pages; typography; reflow; component-tokens; `site-coverage visual layout`; `data-grid keyboard focus-order semantic-html utilities navigation one-primary`.
- By hand, final gate (`full.yml`, every page): same shape; the "fixtures" job also runs utilities and keyboard; the "behavior" job runs `data-grid focus-order semantic-html navigation`.
- By hand, on demand (`on-demand.yml`): contrast; accessibility; high-contrast, theme and density.
- The test site is checked out from `LighthouseCollection/st-john-test-site` (public, no token) and started with PostgreSQL 16 as a service.
