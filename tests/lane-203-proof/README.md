# Lane 203 proof

Implementation rebased onto 0c6dd191; the geometry snapshot retains the original b6bdfe07 stylesheet. The layout-lab overlay preserves the owner’s intervening EntityHeader lab fix from design-system aff42310. Light mode only; no visual baseline was relaxed.

- Full build/app/usage and package build passed; SYSTEM_OK (1061 files), SPEC_OK (1171 leaves, 767 records).
- `patterns-203.test.js` builds the actual source with React development/StrictMode. It checks lazy MediaViewer access over 1,500 items, navigation, clamped indexes and no requests while closed; one First column control and Alt-arrow reordering; 1,500-card virtualization, whole-set selection, focused offscreen retention, resizing, last-item reachability and AssetGallery passthrough.
- The same test compares computed geometry for all four ContentGrid sizes in grid/masonry/justified layouts against `content-grid-base.json` (the original b6bdfe07 stylesheet). All 12 layouts match. Strict runtime audits of virtual and nonvirtual ContentGrid parts have zero overlaps.
- Real ToastProvider tests use a controlled clock only for long undo timers. They verify the 10-second minimum, custom 20-second duration, hover, simultaneous focus after pointer exit, persistent duration zero, Undo, repeated pagehide/hidden events and unmount. React StrictMode effect replay does not commit early.
- `media-types-203.test.js`: strict TypeScript 5.6.3 consumer checks accept array/lazy collections and reject invalid count, item, missing accessor and mixed sources. TYPECHECK_DEPS points to an isolated TypeScript/@types/react installation.
- Selector classifier and zero-overlap pilot tests passed. Only ContentGrid's 11 repaired selector entries were removed from the backlog.
- Focused labs: responsive-grid, masonry-layout, columns-menu, delete-flow: LABS_OK 4/4.

Visible changes requested by the issues: the Columns menu has one First column select, per-row pin/up/down buttons are gone, and opt-in virtual grids use a scroll viewport with equalized measured rows. Default nonvirtual layouts keep their geometry. Viewport sizes reuse VirtualList's existing sm/md/lg tokens (md by default), with fill available.

Published precise MediaViewer declaration integration with ready #215 needs the small resolver follow-up in `types-compatibility-proposal.md`; it was not applied outside this lane. Focused tests were run locally; a proposed additional CI workflow was not applied. Existing repository CI and Styling proof remain available.

## Completed CI findings (21 October)

Styling proof 39538250689 passed ColumnsMenu, DeleteFlow, responsive grid, masonry layout and DAM. The lightbox route reported 0 new clashes and 16 changed elements. `ci-attribution.json` attributes all sixteen changes to Development and API documentation dimensions (and its page-height wrapper), caused by the new API description. On the same local Chrome runner against exact implementation base 0c6dd191 and DS aff42310, the actual open MediaViewer's 16 elements have identical computed styles. No color/font/baseline was changed to clear the proof.

The original light-only typography inspector was run on both checkouts for the five owned routes, DataGrid and CSS architecture. Findings are equal or lower on head; role/prose/pattern findings are zero. The original focused DataGrid test reproduces its compact alignment failure byte-for-byte on base and head (`grid-base.txt`, `grid-head.txt`): 4/5 table views, with 31 high-impact and 18 saved/hidden-column regression checks passing. This confirms the representative alignment finding is inherited; it does not claim every broader CI finding was replayed.

The standard PR CI checks tested a merge onto the subsequently advanced target 66d820ac, while these comparisons isolate the implementation against its exact base 0c6dd191. PR pages, accessibility, fixtures and all three lab shards passed. Broader typography/alignment findings remain visible. Targets/reflow hit a CDP Runtime.callFunctionOn timeout; job 119019771200 was retried once (new job 119028350024), it completed with the same target-only CDP timeout; reflow passed on 36 pages. No further retry has been requested. The target timeout is not yet attributed as a base failure.

Reproduce the light-only style/typography attribution after building both checkouts: set COMPARE_BASE to the exact-base checkout and run `node tests/lane-203-proof/compare-media.cjs`. The full original capture is retained locally in Tools/task219-attribution-full.json; the committed report keeps the relevant property differences and counts.

## Latest merge-run attribution

See latest-ci-attribution.md and latest-typography.json for the actual CI merge1713bce4 versus parent e46577e4. This supersedes the older blanket description of the latest CI target as66d820ac. The two integration follow-ups are deferred by owner decision; no approval is pending in #219.
