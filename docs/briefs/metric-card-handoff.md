# MetricCard: handoff to the design system project

Branch `feature/metric-card` (from `styling/phase-2` f500fa5e). Owner decisions of 2026-10-19 are in the brief
`docs/briefs/metric-cards/` (main checkout, untracked): one anatomy, 12 types, 5 layouts, 5 styles.

## Done on this branch
- `platform/components/MetricCard/MetricCard.jsx` + `metric-card.css`: one component, `type` = value, trend, progress
  (also rows), gauge, breakdown (bar, donut, ranges), comparison, list (ranked, bars, records), summary, person (picture
  inside), week (bars, marks), month (calendar), table; `layout` = stacked, beside, inline, tile, icon-start;
  `appearance` = plain, edge, soft, filled, gradient (radial, data colors only); states loading, empty, error, stale.
  The header comment holds the full API.
- `platform/tokens/components/metric-card.tokens.json` (frame matches Panel's values).
- Display sizes `--plx-ref-font-size-24/28/36` in `reference.tokens.json`.
- Avatar: a 1px media border on every avatar (`avatar-border-width`, `avatar-border-color`).
- Down change: the up arrow turned (no new icon). Metric's `card` prop is marked deprecated.
- Registered in `platform.css` and `platform/index.js`; `node build-app.js` passes; `check-system.js` shows only the
  45 pre-existing stale-exception entries.
- Working page: `docs/briefs/metric-card-test/index.html` (every type, layout, style and state).

## Still to do
1. Spec record for the "Metric card" leaf (07 › Cards and objects) in the `platform/design-system` submodule
   (`inventory.js`), with the contract, examples and variant pages; a lab if `check-spec.js` requires one.
2. `node check-spec.js`, targeted proofs (clash audit on the new page), light/dark, densities, narrow widths.
3. Owner check of the Avatar border across the apps (it changes every avatar).
4. Merge into the styling branch; no release until the owner declares it.
