# Exact-base light-mode typography comparison

Head: 7a0915561f67f5d93350b538cf4187ab1812bef6. Base: f795b8be54a30a730689eb24585b5a551962ae2f. Both use DS 5d6e50d0c1d996e5363d2f8f6feff48021cc02e4 and portable Node 22 / the same local Chrome runner, with separate test ports. Both checkouts were built first.

The repository typography inspector and assertions run unchanged through run-light.cjs, which selects light mode only and saves the raw findings. Environment: TEST_SCOPE=full, TYPO_ONLY=dashboard|design-system, TYPO_PORT=8867/8868, TYPO_EVIDENCE=<output JSON>. No --update, assertion, stylesheet or baseline change.

Both runs inspect the same 88 pages and report role 0, prose 0, pattern 767. Every role/prose/pattern finding matches, and the DataGrid and dashboard findings match. Baseline findings: base 87, head 78. Differences are restricted to eight documentation pages: motion, DropZone, Tabs, InteractiveList, Drawer, FocusRing, CSS architecture and interaction states. The raw added/removed specimens are in diff.json; they are documentation tables/state-code samples, not new unread/product text. These results do not claim broader CI is green or erase existing documentation findings.

The previously reported sortable-example ra.getData page error also reproduces on this exact base; sortable-base.txt records that route and error. Command-bar lab base/head evidence is in ../unread/. The facet assertion now follows task 165's every-eligible-field contract and passes 22 checks. CI at head passes all focused DataGrid regressions including unread and all 31 existing high-impact checks. Remaining broader table/page/fixture/target findings still need integration review; no baseline is relaxed here.
