# Task #182: Styling Standard Phase 2: FeatureCard and UserCard stop restyling Card's parts (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/182 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3 · Standard: `platform/standards/styling.md`

### The task

Remove these selectors (FeatureCard and UserCard compose Card and restyle its parts):

- `patterns/FeatureCard/feature-card.css`: `.plx-feature-card > .plx-card__body`, `.plx-feature-card .plx-card__title`, `.plx-feature-card--horizontal > .plx-card__header`, `…__meta`, `…__body` (grid areas, order, white-space)
- `patterns/UserCard/user-card.css`: `.plx-user-card > .plx-card__body`

Card gets what they need as its own API (a layout variant, e.g. `layout="horizontal"`, a body layout, a title wrap option), or the
patterns render their own parts; no rule from FeatureCard or UserCard into Card's classes.

Proof pages: `data-display/feature-card`, `content/user-card`, `data-display/card`, `data-display/media-card`; apps `dashboard`, `projects`.

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
- One pull request from branch `codex/182-phase2-feature-user-card` **into `styling/phase-2`** (not main), `Closes #182`.
- Do not release.

### Files you own

The stylesheets and JSX of the components named above and their design-system records; not other components
(Claude is changing them on `styling/phase-2` at the same time).
