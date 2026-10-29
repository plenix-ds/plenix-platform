# Icon stage 5c-2 (#557): the cleanup

Part of #280, the last part of #557. It merges right away, without waiting for a release (owner, #557, 2026-10-29 18:02Z). It is branched from 5c-1b (#565, merged) and brought up to date with styling/phase-2 at `108b048f`. No test was run. Nothing was released or deployed.

## `icon.css`: presentation only (`build-icons.js`)
- **Removed:**
  - the 748 glyph data URIs (`--plx-comp-icon-glyph-*`)
  - the per-density aliases (`--plx-comp-icon-auto-*`)
  - the 212 per-name rules
  - the four drawing-choice rules (`--plx-comp-icon-url`)
  - the per-name right-to-left rules
  - the mask and the forced stroke on `.plx-icon`
  - the mask state settings (`--plx-state-icon-mask`, `-paint` and `-stroke`)
- **Kept:**
  - the box: size, lead, turn and keyline
  - the optical-size switch (`--plx-comp-icon-context-show-20/24` per density, `plx-icon--inline`'s show rules)
  - the svg rules
  - the named sizes
  - `.plx-icon--mirrored:dir(rtl)`
- **Size:** 555 KB to 4 KB, which also comes off `plenix.css` on the CDN.
- **`build-icons.js`:** the data URI writer and the "name without a rule" guard are gone. `glyphs.js` and the asset layout are unchanged.

## icons-all.css retires (`build-packages.js`)
- **No longer written or packed:** the archive's rewrite of it is gone.
- **The CDN README:** the "Retired" section now says these are removed in this version. The changelog notice is `changelog.d/<this PR>.md`.
- **`docs/integration/acceptance.html`:** the CDN acceptance page loads `plenix-icons-plenix.js` instead. It draws `rocket_launch` through the library fetch.
- **`deploy.sh` and `tools/check-live-cdn.js`:** their comments no longer name it.

## The check (`check-system.rules/bare-icons.js`)
- **What it refuses:** a bare `plx-icon plx-icon--<name>` (a literal, or a name added in code) in a class string without `plx-icon--inline`. It covers the Platform, the applications, the Asset Manager and the spec. Generated bundles and icon files are checked through their sources.
- **What it skips:** comments (prose), and a line marked `plx-allow-bare-icon` with its reason. The one marked line is `DS.icon`'s fallback for the spec's pinned release, 0.73.0, which still draws the class.
- **Fixtures:** seven, run with `node check-system.rules/bare-icons.js`.

## Spec (lane 280-icon-5c-2)
- **The Icon record (`inventory-docs.js`):** the glyph part, the error text and the right-to-left text now say the drawing never comes from the stylesheet and a bare class draws nothing.
- **The icon architecture rows (`parts/w00B.records.js`):**
  - One resolver: icon.css is presentation only; use iconMarkup.
  - Run-time fetch: Plenix names too; `file://` needs an icon file.
  - Platform components: the masks are Icon children; the bare-icons check; the first-paint quirk is over.
  - Sites loading Plenix from the CDN: the fallback, this repository's page files, `icons-all.css` retired.
- **`DS.icon`'s fallback** escapes every value: the label as text, the classes as class characters only. This answers QA's note on #565. The fallback stays while the spec pins 0.73.0.
- **`spec-parts.js`** was rebuilt by build-app after the overlay.

## Other wording
- `platform/icons/README.md`, the Icon component's header, `check-system.rules/icon-names.js` and `check-spec.js`.

## For the owner's next test run
- **Mark for `--update`:** the zero-overlap baselines (`tests/fixtures/zero-overlap/selector-kinds.css`, `tests/baselines/overlap-strict.json`). They list the removed glyph settings and per-name selectors.
- **Expect hash changes:** the computed-style baselines (`computed.json`, `computed-ds.json`, `pilot-computed.json`) change on every page, because `.plx-icon` no longer carries a mask or a border.
- **Unchanged:** `tests/visual.test.js` (its icon slot is measured, not the drawing) and `tests/high-contrast.test.js` (it reads the svg fill since 5c-1a).

## Left as is
- **`--plx-sys-icon-forced-stroke`** (a system token, light and forced colors) no longer has a reader. check-style does not flag system tokens. It can go in a token cleanup, with the owner's say on public tokens.
- **Dated history** (`docs/briefs/header-facts/`, `docs/command-bar-study/`, `tools/agent/web/`) keeps its bare classes, which now draw nothing, as their notes say.

## Gates
- build-app OK (`icon.css` 4 KB, page icon files unchanged), SYSTEM_OK (bare-icons OK), STYLE_OK, SPEC_OK. Stylelint ignores the generated `icon.css`, and no other stylesheet changed.
