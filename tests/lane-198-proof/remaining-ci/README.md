# Remaining CI review: exact base on one runner

Functional head e7a6266269ba17fefa2454df296be24128ea7230 (same implementation as 7a091556), base f795b8be54a30a730689eb24585b5a551962ae2f, matching DS 5d6e50d0c1d996e5363d2f8f6feff48021cc02e4. Both checkouts were built with portable Node 22 and tested using the same local Chrome runtime on separate ports. No assertion or baseline was changed.

| Check | Base and head result |
| --- | --- |
| Button fixtures, light only | 2,529 buttons / 74,583 computed values are byte-identical after canonical sorting; SHA-256 in visual-summary.json. Zero changed values. |
| Settings layout | Identical 15/16 result and the same settings-card assertion. |
| TextField lab | Identical 2,364 checks / 24 tokens and max-width marker findings. |
| CommandBar lab | Already compared: identical 64 checks / 13 tokens; see ../unread/. |
| Tables | Same DATA_GRIDS_FAIL 26/42 result and failure labels. Only the full DataGrid documentation result differs: pane samples now virtualize and an additional baseline padding finding is removed. No new assertion failure. |
| Targets | Same 48 page/mode finding rows, 113 coarse and 24 fine undersized targets, and 46 worse-than-baseline page/mode checks across 36 pages. Six documentation pages differ only in inline-link widths; failing target identities and counts remain the same. The number inspected is 3,715 vs 3,580 coarse and 3,120 fine on both, reflecting documentation layout. |
| Reflow | Identical REFLOW_OK: zero findings on 36 pages at 320px, 13 two-dimensional-scroller exemptions. |

Reproduce from either checkout with TEST_SCOPE=full and CHROME_PATH configured: node tests/layout.test.js; LABS_ONLY=text-field node tests/labs.test.js; DT_ONLY=. node tests/data-grid.test.js; TARGETS_VERBOSE=1 node tests/targets.test.js; REFLOW_VERBOSE=1 node tests/reflow.test.js. Set distinct TEST_PORT / LABS_PORT / TARGETS_PORT / REFLOW_PORT if running both at once.

visual-light.cjs runs the existing visual test with light selected and captures VISUAL_EVIDENCE to a JSON file. It retains the original assertions and baseline; because dark snapshots are not produced, its logged full-baseline failure count is not the light comparison. The two captured light snapshots were compared by every key/property and canonical SHA-256 instead, yielding zero differences. No dark appearance was checked or tuned.

Prior evidence in ../typography/ covers all 88 light typography pages and the sortable-example page error reproduced on the exact base. CI passes build/accessibility and all focused DataGrid/unread regressions. Styling proof reports zero new clashes; its changed elements are documentation specimens. These findings do not make aggregate CI green; they attribute the remaining failures without weakening tests. Shared barFit scope for task 149 remains pending separately.
