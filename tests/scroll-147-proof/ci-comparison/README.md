# Remaining CI comparison

Exact base: f500fa5eab9a3ee843c8976a884d8409d92fd52b. Source head: 96e77dd48911ae123da37395ee846a2453db9185 (subsequent commits only add evidence).
Same Windows runner, portable Node 22.23.3 and installed Chrome. Both revisions freshly built with the same recorded design-system revision. Tests run sequentially, base then head, with head-derived changed scope and CHANGED_BASE set to the exact base. No baseline updates or assertion/tolerance changes.

Visual and typography run only light mode under the owner's updated instructions. Their original source is compiled in memory with the mode list restricted to light; visual baseline entries are restricted to light as well. The initial run that counted omitted dark snapshots is excluded from this evidence. All other tests use original source. Labs focuses the failing text-field lab; CI's other lab groups passed.

| Check | Base and head result |
| --- | --- |
| Visual | Same 6 differences / 74583 values / 2529 buttons; all result lines identical |
| TextField lab | Same invalid-background token failures; all result lines identical |
| Utilities | Same missing-resource failure, 16 passed; all result lines identical |
| Pages | Same findings, 139/269 pass; all result lines identical apart from scope and local URLs |
| Typography | Both 19 light page checks worse; role/prose/pattern 0. Baseline totals 48 vs 47 on 56 pages. Only Badge and Application Shell documentation specimen counts varied. A focused repeat of those two routes yields identical complete verbose findings: Badge 4, Application Shell 5, total 9. |
| Targets | Same 54 worse page checks; 109 coarse and 33 fine undersized targets on 36 pages. Total inspected coarse targets 3727 vs 3726; a design-token documentation specimen example varied. No new failing page or failure count. |
| Reflow | Both pass: zero known findings, 36 pages at 320px, 13 exempt two-dimensional scrollers |

These results supplement the complete DataGrid comparison in the parent folder (identical 26/42 result) and passing 18-case scrolling regression. CI is not green: existing failures are retained, documented and not suppressed. No source regression was found. Merging, integration and releases remain with Claude.
