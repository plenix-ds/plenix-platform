# #182 / PR #197 exact-base evidence

Base: `e9782b790039f5cdaea852cfe016eca3ef4b387d`; production head: `aa32c09936c35a999ce6067f9386b7244c8da791`; design-system: `7d176d61d44bdcf3a32ebfdf626515edd5f4f44a`. Both builds ran on the same Windows runner with portable Node 22 and Chrome 155.0.8059.80. The audit changes no production code or shared baselines.

| Check | Base / head comparison |
|---|---|
| Component styles | All four routes, 584 roots/descendants, STYLES_SAME; no HOSTS restriction. |
| Typography | All 43 CI-reported or touched-route/theme cases: zero added role/prose/pattern/baseline findings, equal baseline counts. |
| Button visual | Same 12 ButtonGroup radius differences among 149166 values / 5058 buttons. |
| Theme fixture | Same missing `platform/index.js` in its temporary copy. |
| DataTable behavior | Same undefined `.bind` at the original test's line 98. |
| Labs | Identical TextField invalid-background token mismatch; FeatureCard, UserCard and PromptDialog pass. |
| Pages | Same two the legacy grid inline-style failures in Files and DAM settings; 212/214 checks pass on both. |
| Accessibility | Same five CodeBlock `aria-prohibited-attr` findings on the Card documentation route, using the original axe rules. |
| Broad targets | Both exceed the 600s audit guard. Base stops in fine React implementation docs; head in fine bulk-selection docs. These scans are incomplete, not passes. CI itself reports a protocol timeout. |
| Card-focused targets | Eight route/pointer comparisons: identical measured and covered counts, no added findings. Same five existing coarse-pointer MediaCard findings; all other cases have none. |
| Reflow | Both pass: zero findings across 36 pages at 320px, same 15 exempt two-dimensional scrollers. |

The broad target runtime remains a shared test limitation. The separate focused comparison uses the original target measurement and thresholds, filtering only its candidate controls to Card/MediaCard. It does not replace or relax the broad test. No component regression was found; the shared suite remains non-green.

Remote [Styling proof 39348111788](https://github.com/plenix-ds/plenix-platform/actions/runs/39348111788) passes dashboard/projects. All four DS pages have zero new clashes; their whole-page differences are documentation table rows/geometry from Card's documented API. Component-only computed styles are unchanged. The earlier stale handwritten FeatureCard/UserCard lab markup was corrected through the lane overlay; both labs pass all 64 checks.

## Reproduction

- Build the exact base and this branch with the same pinned design-system commit and Node 22. Apply this branch's lane overlay before building. Set `CHROME_PATH` to the same installed Chrome.
- `node tests/ci197-paired.cjs <base-checkout> <output-directory>` runs original tests sequentially on base and head. Its preload supplies identical head-derived change scope to both; test implementations and assertions are unchanged. `paired-ci/test-hashes.json` verifies all 12 shared source files are identical. Logs retain every finding; `ci197-results.cjs` normalizes only checkout and temporary-directory names.
- Accessibility: `PAIR_TESTS=a11y`, `PAIR_PORT=9656`, `PLX197_A11Y_FOCUS=1` selects the Card route CI reported, with original axe rules.
- `TYPO_COMPARE_OUTPUT=<json> node tests/typography-197-compare.js <base-checkout>` compares raw findings. The original 900s harness limit interrupted after 38 completed cases; only the five remaining cases were resumed using `TYPO_CASES` (JSON array of `route|mode`). The first 38 completed comparisons and final five are saved separately. The harness now saves each result and defaults to 2400s. No assertion changed.
- `node tests/targets-197-compare.js <base-checkout> <json>` compares Card controls in both original pointer modes and thresholds, with identical viewports and browser media emulation.
- `tests/compare-styles.js <base-checkout> ".plx-feature-card,.plx-user-card,.plx-card,.plx-media-card"` on the four task routes produces `component-styles.txt` (WAIT=5000). Only server ports were remapped in memory to avoid existing services; assertions unchanged.

The original test summaries use names such as FAIL because they compare to the repository's shared baselines. This audit compares their actual findings against the exact branch base; it does not change those baselines or claim the entire suite passes. Merging, integration and releases remain with Claude.
