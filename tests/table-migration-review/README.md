# Static Table migration review

These unaltered captures compare main 0.51.0 (`before/`) with task #142 (`after/`). Each page was opened in light and dark mode at 1440 × 1000. `metrics.json` records visible table frames and row counts.

| Page | Before light | After light | Before dark | After dark |
| --- | --- | --- | --- | --- |
| Table | [Before](before/light-data-display-table.png) | [After](after/light-data-display-table.png) | [Before](before/dark-data-display-table.png) | [After](after/dark-data-display-table.png) |
| Button | [Before](before/light-actions-button.png) | [After](after/light-actions-button.png) | [Before](before/dark-actions-button.png) | [After](after/dark-actions-button.png) |
| Badge | [Before](before/light-data-display-badge.png) | [After](after/light-data-display-badge.png) | [Before](before/dark-data-display-badge.png) | [After](after/dark-data-display-badge.png) |
| Audit log | [Before](before/light-patterns-audit-log.png) | [After](after/light-patterns-audit-log.png) | [Before](before/dark-patterns-audit-log.png) | [After](after/dark-patterns-audit-log.png) |
| Comparison view | [Before](before/light-patterns-comparison-view.png) | [After](after/light-patterns-comparison-view.png) | [Before](before/dark-patterns-comparison-view.png) | [After](after/dark-patterns-comparison-view.png) |
| File list | [Before](before/light-patterns-file-list.png) | [After](after/light-patterns-file-list.png) | [Before](before/dark-patterns-file-list.png) | [After](after/dark-patterns-file-list.png) |
| Permissions editor | [Before](before/light-patterns-permissions-editor.png) | [After](after/light-patterns-permissions-editor.png) | [Before](before/dark-patterns-permissions-editor.png) | [After](after/dark-patterns-permissions-editor.png) |
| Rendition list | [Before](before/light-patterns-rendition-list.png) | [After](after/light-patterns-rendition-list.png) | [Before](before/dark-patterns-rendition-list.png) | [After](after/dark-patterns-rendition-list.png) |
| Review flow | [Before](before/light-patterns-review-flow.png) | [After](after/light-patterns-review-flow.png) | [Before](before/dark-patterns-review-flow.png) | [After](after/dark-patterns-review-flow.png) |

The capture test resolves each record's actual section from DSInventory, so descriptive filenames need not equal canonical navigation paths. The source test checks that each requested record exists.

Existing Table colors, type and geometry tokens are retained. Rich content now participates in the initial React layout: wrapped lists, links and controls can grow their static row instead of being clipped by the previous late DOM insertion. This can increase row and panel heights; compare the Purpose row on Table and wrapped reference cells. No visual test baseline was replaced.

The after run asserts that no old grid classes appear and no old engine vendor file is requested. `static-table.test.js` separately checks all 300 rows are drawn, interaction props are ignored, static controls work, wrapped cell heights agree, folders remain first in either sort direction, and DS.grid preserves live DOM content and listeners.
