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
