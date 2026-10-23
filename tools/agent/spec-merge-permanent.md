# The spec's duplicate merge, made permanent

The owner (2026-10-23): make the merge of duplicate pages permanent, **no redirects**, "a system as if it was built brand
new". The owner's recent design-system work (releases 0.60 to 0.68, header style 2, Text field widths, the DataGrid
speed-up) is all on `styling/phase-2` in both repositories and is the starting point.

## Today: a load-time layer

- `platform/design-system/parts/w99M.merges.js`: 43 groups `{ group, home, set, take: [{ from, retire, leaves, examples }] }`,
  built from the owner's 322 picks in the duplicate picker (all 40 picker groups done).
- `inventory.js` `applyMerges()` (after every record is listed): the home takes `set` (behavior, a11y, content merged with
  Object.assign; every other key replaced) and, from each copy, its examples (a copy's group name the home already uses
  becomes "Copy title · group"; a demo the home already draws is skipped), variant pages (a moved variant page keeps its
  copy's lab: `labId`), the copy's lab (`lab`/`labId`, or `extraLabs` when the home has one), stylesheet blocks, and the
  copy's leaf, covers, title and leaf as the home's covers and aliases. Retired copies leave `R`; `related` and
  `statesFrom` everywhere are repointed to the home; `window.DSRedirects` maps each retired id to its home.
- `spec.js` (readRoute, near "DSRedirects") opens a retired address on its home. `build-spec-parts.js` knows the
  `.merges.js` part kind.

## Measured (2026-10-23, the spec loaded with and without the layer)

- 768 records without the layer, 688 with: 80 retired (ids in the scratch snapshot; recompute with the method below).
- 49 records change. Fields changed: aliases 38, covers 42, examples 38, also 36, avoid 29, related 27, text 26, use 24,
  behavior 19, content 18, anatomy 16, a11y 15, plenix 15, purpose 14, cssAlso 12, map 7, variantPages 7, lab/labId 3,
  extraLabs 1, blocks 1, interaction 3, src 2, level 1, title 1.
- 62 example functions move into homes. Their free names: h, P, box, use, H, DS (shared helpers) but also file-local
  ones: items, rows, columns, name, extra, gridDemo, render, Feed, stack, header, mega, Demo, caption, ROWS, row, Suggest,
  feature, W, noop, bar, Bar, Phone. Many are thin records built by factories (`thin(main, {…})` in w00A, `T(main, {…})`
  in w00B) whose ids are `sec + '-' + slug(leaf)`, so an id search finds them only by sec and leaf.

## The target

1. Every home record holds its final text in its own source (the merged `set` values and the final covers, aliases,
   related, cssAlso, blocks, lab, variant pages), written where the record is defined (inventory.js or its part file).
2. Every example a home shows is defined with the home's record, or in a part that adds examples to that record by id
   (the way `*.docs.js` parts add written sections): no example code that needs another file's scope is copied blindly;
   move it with the helpers it uses or rewrite it against the destination's helpers.
3. The 80 retired records are deleted from their sources (literal records, `thin()` and `T()` entries), and every
   reference to their ids is repointed to the home: `related`, `statesFrom`, `docsFrom`, `H.record(...)` / `exOf(...)`
   lookups, labs registered under a retired id, `#/section/id` links in text and docs (inventory-docs.js, parts docs,
   STANDARD.md, standards), apps' links into the spec, check-spec rules.
4. Removed: `w99M.merges.js`, `applyMerges()`, `window.DSRedirects` and its use in spec.js, the `.merges.js` part kind
   in build-spec-parts.js. A retired address shows the spec's ordinary "not found", like any address that never existed.
5. The taxonomy keeps every leaf (STANDARD.md is the owner's): a retired copy's leaf is in its home's `covers`.

## Proof

- Snapshot `window.DSInventory` before and after (every field, functions as source text, sorted keys): the 688 records
  must be identical except that example functions may differ in source text where they were moved or rewritten (prove
  those by rendering: every example of every changed home renders the same DOM before and after).
- `node check-spec.js` passes; `node build-app.js` passes; every one of the 688 pages loads with no page error (use the
  robust navigation of the spec scans: check the h1, reload, about 2.5s per route).
- `rg` for every retired id finds nothing outside archived files.

## Done (2026-10-23)

- The merged values are written in each home record's source; the 80 copies are deleted; the written sections of the
  copies (inventory-docs.js and parts docs) are deleted with them (no page showed them since the merge).
- Examples that need their part's own helpers (demo factories) are added from that part with `H.addExamples(id, groups)`
  (inventory.js HELPERS; throws on an unknown id): grid (w01C), secondary-pane (w00B, w16A), navigation-menu (w05A),
  pagination (w07B), the page templates (w15A). Every other example moved into its home's source.
- Labs registered under a copy's name now carry the home's: navigation-menu, pagination, page-actions; Sticky's extra
  lab is `fixed`. platforms.js names the homes.
- Removed: w99M.merges.js, applyMerges, window.DSRedirects and its use in spec.js, the merges part kind.
- Against the merged spec: identical except (1) six example groups the home already drew are not drawn twice
  (application-header Header · Tone and Global navigation · Tone, product-switcher The switcher, navigation-rail Rail ·
  Labels, empty-state Empty application state · Size, media-player Audio player); (2) search-input and search-workspace
  list one moved group in another place; (3) thin pages built from a home (thin()/T()) now read its merged plenix, src,
  related and also: data-display-grouped-list, foundations-fluid-sizing, foundations-adaptive-patterns.

Snapshot method: puppeteer on the spec index, `window.DSInventory` serialized with functions as `'fn:' + String(f)`;
to load without the layer, `evaluateOnNewDocument(() => { window.DSParts = { records: [], docs: [], errors: [],
merges: { push() {}, length: 0, forEach() {} } }; })`.
