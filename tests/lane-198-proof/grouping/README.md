# Grouping support (task 165)

Verified in the Codex checkout using portable Node 22 and local Chrome, light mode only.

- `data-grid-group-165.test.js`: text and boolean values; numeric ranges including negatives/zero; UTC day/month/year and Monday-based week keys; invalid dates; custom column bucket callback; nested multi-membership deduplication; saved descriptor retention.
- `data-grid-group-browser-165.test.js`: all eligible collection fields exposed; opt-out field absent; changing date month/day and numeric field ranges changes rendered group counts.
- `data-grid-view-169.test.js`: collection persistence, grid header changes, collapse/remount and reset still pass.
- Build passed; SYSTEM_OK (1059 files); SPEC_OK (1171 leaves, 767 records); JavaScript syntax checks passed. Generated files restored before commit.

API: groupBy accepts existing field names/functions or descriptor arrays `{field, interval, range}`. Calendar intervals are day/week/month/year in UTC; weeks start Monday. Numbers use caller-provided positive `range` / column `groupRange` or a column `groupBucket(value)` callback; absent bucket metadata, values remain separate. Text and booleans use their values. GroupPanel dates default to day, with periods in the existing More menu. No CSS files changed.
