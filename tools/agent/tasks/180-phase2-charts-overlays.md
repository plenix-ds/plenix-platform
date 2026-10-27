No tests: see HANDOFF.md (the owner runs them)

# Task #180: Styling Standard Phase 2: charts and the dev overlays stop styling other components (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/180 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3 · Standard: `platform/standards/styling.md`

### The task

Remove these selectors (each names another component's class):

- `charts/chart-interaction.css`: `.plx-chart__plot--dimming .plx-chart-dim--off` (opacity)
- `charts/diagram.css`: `.plx-diagram .plx-chart__svg` (overflow)
- `charts/network-graph.css`: `.plx-network-graph .plx-chart__svg` (overflow)
- `charts/geo-map.css`: `.plx-geo-map__view .plx-chart-pattern`, `.plx-geo-map__view .plx-chart-keys__ring` (vector-effect, stroke-linejoin)
- `system/layout-grid.css`: the nine `.plx-layout-grid-overlay` / `.plx-layout-grid` rules (one feature, two block names: one block)
- `system/forced-colors.css`: `.plx-tree__item.is-selected>.plx-tree__row .plx-icon`, `.plx-chip--selected .plx-icon` (background-color in forced colors: the owner's stylesheet answers it)
- `components/Tree/tree.css`: the six `--plx-comp-icon-url` rules (Tree passes Icon's `filled` prop by state; Icon's own context rules are in build-icons.js)

Proof pages: `data-display/diagram`, `data-display/network-graph`, `data-display/geo-map`, `navigation/tree-view`, the chart pages you touch, `foundations/keylines`; apps `dashboard`, `files`.

### The method (owner, 2026-10-19: keep it)

1. **Design the pattern once, by hand**, for the first case: what the child exposes (a prop, a variant, a context hook
   it reads with today's value as the fallback, or a slot the parent owns), and what the parent sets on **its own
   element**. Write it in the component's header comment (its design-system page reads it).
2. **Apply it by script** to every case of the same shape (keep the script in your PR description).
3. **Small JSX edits by hand** (a prop passed, a slot span with `display: contents`, an attribute).
4. **Prove it**, only on the touched pages:
   - `node tests/clash-audit.js --check --pages <apps>` and `node tests/clash-audit.js --ds --check --pages <routes>`
     (record the baseline first on main: same commands without `--check`);
   - for a page whose documentation changes with the stylesheet (DIFFERS), `node tests/compare-styles.js <a copy of main>
     "<the component's root selector>" <route>` must print STYLES_SAME (`HOSTS=n`, `WAIT=ms` as needed);
   - or run the GitHub workflow **Styling proof** on your branch (`gh workflow run styling-proof.yml -f head=<branch>
     -f ds=<routes> -f apps=<pages>`).

Examples already done on branch `styling/phase-2`: Button surfaces (`data-plx-surface`), Icon hooks
(`--plx-comp-icon-size`, `-turn`, `-mask-size`, `-lead`), Text following its container (`data-plx-text-follow`), joined
controls (`joined` prop), Field in layouts (`--plx-comp-field-grid-*`). Read `platform/standards/styling.md` sections
3–4 and 10A first.

### Done means

- None of the listed selectors is left; no new selector names another component's class (`node check-system.js`:
  SYSTEM_OK, rule `ownership`; then `node check-system.rules/ownership.js --shrink`).
- No visual change: the proof above, no element changed (documentation-only differences explained in the PR).
- `node build-app.js`, `node check-spec.js` (SPEC_OK) pass; no generated file in the branch.
- One pull request from branch `codex/180-phase2-charts-overlays` **into `styling/phase-2`** (not main), `Closes #180`.
- Do not release.

### Files you own

The stylesheets and JSX of the components named above and their design-system records; not other components
(Claude is changing them on `styling/phase-2` at the same time).
