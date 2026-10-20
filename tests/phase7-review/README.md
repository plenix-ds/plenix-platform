# Phase 7 application review

Owner approval is required for the visual differences below. These are unaltered browser captures, not replacement visual baselines.

The before assets come from commit `fa67741b`; after uses this branch. Each state is captured at 1440 × 1000 in light and dark. The fixture warms both themes and lets responsive table geometry settle before capture. Both sets open without console errors.

## Differences to review

- The React renderer distributes unspecified column widths differently. The exact measured vectors are listed below (columns in display order).

- The fields dialog uses the Platform DragHandle glyph and keyboard move commands. Its table can show more rows at once, making the dialog taller; the same fields and switches remain available.

- Filename/name emphasis follows the retained React renderer’s name token rather than the retired engine’s rendered text wrapper. Compare the Files pairs. No new fonts, colors, themes, or tokens were introduced.

| State | Frame height, before → after | Column widths, before → after | Captures |
|---|---|---|---|
| Projects: project files | 266 → 266 | 320, 276, 276, 276 → 320, 276, 276, 276 | [before light](before/0-light.png) · [after light](after/0-light.png) · [before dark](before/0-dark.png) · [after dark](after/0-dark.png) |
| Files | 266 → 266 | 320, 276, 276, 276 → 320, 276, 276, 276 | [before light](before/1-light.png) · [after light](after/1-light.png) · [before dark](before/1-dark.png) · [after dark](after/1-dark.png) |
| Files: search results | 167 → 167 | 320, 276, 276, 276 → 320, 276, 276, 276 | [before light](before/2-light.png) · [after light](after/2-light.png) · [before dark](before/2-dark.png) · [after dark](after/2-dark.png) |
| DAM: edit category fields | 523 → 524 | 36, 176, 148, 148 → 36, 180, 148, 144 | [before light](before/3-light.png) · [after light](after/3-light.png) · [before dark](before/3-dark.png) · [after dark](after/3-dark.png) |
| DAM: categories list | 495 → 495 | 36, 240, 208, 216, 208 → 36, 352, 240, 244, 236 | [before light](before/4-light.png) · [after light](after/4-light.png) · [before dark](before/4-dark.png) · [after dark](after/4-dark.png) |
| DAM: asset list | 263 → 263 | 36, 220, 192, 116, 112, 120, 112 → 36, 256, 212, 152, 148, 156, 148 | [before light](before/5-light.png) · [after light](after/5-light.png) · [before dark](before/5-dark.png) · [after dark](after/5-dark.png) |
| System settings: properties | 176 → 176 | 112, 796 → 472, 436 | [before light](before/6-light.png) · [after light](after/6-light.png) · [before dark](before/6-dark.png) · [after dark](after/6-dark.png) |
| System settings: fields | 466 → 466 | 112, 420, 376 → 308, 324, 276 | [before light](before/7-light.png) · [after light](after/7-light.png) · [before dark](before/7-dark.png) · [after dark](after/7-dark.png) |
| System settings: transcoding | 321 → 321 | 220, 204, 152, 128, 204 → 244, 200, 144, 120, 200 | [before light](before/8-light.png) · [after light](after/8-light.png) · [before dark](before/8-dark.png) · [after dark](after/8-dark.png) |
| System settings: users | 147 → 147 | 88, 212, 208, 148, 128, 124 → 116, 208, 208, 136, 120, 120 | [before light](before/9-light.png) · [after light](after/9-light.png) · [before dark](before/9-dark.png) · [after dark](after/9-dark.png) |
| System settings: email templates | 263 → 263 | 500, 276, 132 → 492, 284, 132 | [before light](before/10-light.png) · [after light](after/10-light.png) · [before dark](before/10-dark.png) · [after dark](after/10-dark.png) |
| System settings: database | 147 → 147 | 128, 120, 212, 100, 96, 148, 104 → 144, 120, 208, 96, 92, 148, 100 | [before light](before/11-light.png) · [after light](after/11-light.png) · [before dark](before/11-dark.png) · [after dark](after/11-dark.png) |
| System settings: customizations | 205 → 205 | 36, 212, 220, 228, 212 → 36, 212, 220, 228, 212 | [before light](before/12-light.png) · [after light](after/12-light.png) · [before dark](before/12-dark.png) · [after dark](after/12-dark.png) |
| System settings: scheduler | 350 → 350 | 220, 384, 304 → 288, 352, 268 | [before light](before/13-light.png) · [after light](after/13-light.png) · [before dark](before/13-dark.png) · [after dark](after/13-dark.png) |

## Styling audit

`node tests/clash-audit.js --check --pages projects,files,dam,settings` reports **0 new clashes, 203 removed clashes, and 145 changed elements** against the existing shared baseline. It exits with `CLASH_AUDIT_FAIL` because table markup and computed geometry change. The raw output is [audit.txt](audit.txt). This is not a computed-style parity claim; the renderer differences require owner review before integration. Shared baselines were not rewritten.

## Behavior and build proof

- Combined table acceptance: `DATA_GRIDS_OK 17/17`, including canonical groups (62), remaining contracts (43), saved views (18), and high-impact regressions (31).
- Keyboard: 27/27; navigation: `NAVIGATION_OK`.
- Independent renderer: 54 modules, 600 records, 18 drawn rows, no legacy constructor access or requests.
- Capabilities: 52 checks; static Table: all rows, ignored interactions, live nodes, folders first, no internal scrolling at 320/560/1000.
- Runtime style audit: 18 cases. Generated-file safeguards: authored edits retained, generated-block edits rejected, retired steps stay removed.
- Build, usage, package build, SYSTEM_OK, SPEC_OK, and changed-JavaScript syntax checks pass.

Historical task briefs, handoff records, comparison artifacts, and negative assertions about the removed engine remain as history/verification; active application, vendor-loader, package-copy, and stylesheet dependencies were removed.

## Reproduce

Set `PHASE7_REVIEW` to `before` or `after`, then run `node tests/phase7-review.js` with Node 22. `PHASE7_PORT` selects a free server port; `PHASE7_ONLY` selects one state by the zero-based index in the table above.
