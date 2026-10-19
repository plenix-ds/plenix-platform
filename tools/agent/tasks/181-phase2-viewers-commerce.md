# Task #181: Styling Standard Phase 2: DocumentViewer, MediaViewer, ProductOptions and Commerce stop styling other components (Codex)

Tracker: https://github.com/plenix-ds/plenix-platform/issues/181 · Plan of record: https://github.com/plenix-ds/plenix-platform/issues/3 · Standard: `platform/standards/styling.md`

### The task

Remove these selectors:

- `components/DocumentViewer/document-viewer.css`: the six `.plx-document-viewer__viewport[data-zoom="…"] > .plx-image` (zoom: a hook Image reads, e.g. `--plx-comp-image-zoom`) and `.plx-document-viewer__zoom .plx-input` (font: Input's `data` prop)
- `components/MediaViewer/media-viewer.css`: the three `.plx-media-viewer__stage--video > .plx-media-player` / `.plx-media-player__media` rules (a MediaPlayer prop or variant for filling a stage)
- `components/ProductOptions/product-options.css`: `.plx-product-options__sizes .plx-radio-tiles__legend`, `.plx-product-options__swatch.is-unavailable .plx-color-swatch` and `…-label`
- `templates/Commerce/commerce.css`: `.plx-commerce__buy .plx-product-options` (placement: the parent arranges its own children)
- `components/ColorSwatch/color-swatch.css`: `button.plx-color-swatch-label[aria-pressed="true"] .plx-color-swatch`

Proof pages: `specialized/document-viewer`, `overlays/media-lightbox`, `specialized/media-player`, `specialized/product-options`, `content/swatch`, the Commerce template page; apps `dam`, `files`.

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
- One pull request from branch `codex/181-phase2-viewers-commerce` **into `styling/phase-2`** (not main), `Closes #181`.
- Do not release.

### Files you own

The stylesheets and JSX of the components named above and their design-system records; not other components
(Claude is changing them on `styling/phase-2` at the same time).
