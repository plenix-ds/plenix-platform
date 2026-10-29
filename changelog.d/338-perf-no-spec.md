### Changed
- `tests/data-grid-perf.test.js` no longer depends on the design spec (#338). It never opened the spec (it draws its own host page from this checkout's Platform), but it skipped itself when the spec folder was missing, so a checkout without the spec silently skipped the DataGrid performance targets. It now skips only without Chrome. No code of the Platform changes.
