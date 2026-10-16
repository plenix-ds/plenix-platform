# DataTableNext trial, phase 1

This is a separate React/TanStack core. Existing applications and the DataTable implementation are unchanged.
TanStack Table 8.21.3 and TanStack Virtual 3.14.21 are pinned and bundled, with React/ReactDOM supplied by Plenix.
The existing Tabulator structural **stylesheet** is reused. The standalone trial has no import of legacy DataTable JavaScript, loader, prefetch or prototype patches. Token/path helpers live in its own environment.js. The combined Platform still includes the existing engine for existing tables.

Implemented: opening saved views; plain/custom React cells; sort/function and header filters; canonical selection and
hidden-selection policy; column order, visibility, widths, fit and resize; row-height/density and narrow-list layout;
fill and client/server pages; empty/error states; row/header menus; the small row/cell/column adapter in adapter.js.
TanStack Virtual selects a window. Existing token-only CSS gap pieces supply its missing rows, with no inline spacer heights.

Phase 2: grouping and multi-membership, tree, editing, row/column drag movement, load-more, copy, print, floating
scrollbars and the remaining built-in rich cell kinds. Phase 3 adds an opt-in switch to DataTable; no default switch here.
The shim is not a full Tabulator module API: advanced modules, mutable row/cell CRUD and editor methods remain for phase 2.

## Current integration gates

- The owner authorized the three builder changes on 2026-10-16. The regular build now accepts the exact wDTN export/record name and bundles the four TanStack packages with their production browser branches. No runtime vendor path is added.
- Frozen virtual rows need #127's owned shared-CSS fix (overflow:hidden → overflow:clip). #128 does not edit that file.
  Until #127 is integrated, `DT_SHARED_CSS=<path to #126's data-table.css> node tests/data-table-next.test.js` explicitly
  verifies the pending dependency; without it the focused frozen regression stays a failure.

## Review commands

- `node tests/data-table-next.test.js`: focused core, saved-state, selection, pages, menus, focus and frozen geometry.
- `DT_ENGINE=next node tests/data-table.test.js`: the same table-view assertions, phase-one views only. The mixed
  overview, three grouping variants and load-more are explicitly reserved for phase 2; the legacy suite stays unchanged.
- `node tests/data-table-next-perf.test.js`: both engines, 600 rows, 8 columns and 18/14 hidden, plain/saved views and rich-cell scrolling.
- `LOOK_DIR=<folder> node tests/data-table-next-look.test.js`: paired light/dark screenshots and core style equality.
  Reviewed captures are in tests/data-table-next-review; they are review artifacts, not replacement visual baselines.
- The DS overlay appends a side-by-side trial to the existing DataTable record
  only with `?engine=next`; normal examples, taxonomy, stylesheets and other lane records remain unchanged.

## Engine independence

`node tests/data-table-next-independent.test.js` audits the transitive standalone module graph (including TanStack Table/Virtual), rejects any legacy DataTable/vendor engine JavaScript, blocks engine requests, and traps reads/writes of window.Tabulator. It exercises 600-row virtualization, sorting, filtering and selection without loading the Platform JavaScript bundle. Existing CSS/class names are styling compatibility only.
