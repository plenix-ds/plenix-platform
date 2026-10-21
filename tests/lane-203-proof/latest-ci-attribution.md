# Latest CI attribution

Run 39542188056 checked GitHub merge 1713bce40f709b83eff7d505e49be7b5f5bfc8dd, whose parents are target e46577e40f4d12aceba882c21ff4afa6ae53ef35 and branch 6de7ba723cc326f68211058c15ed3b4551de3d73. Its CHANGED_BASE remained the older target 66d820ac28793c8dbc59a69825f8947ad8bb40bb.

## Build

The generated-file check flags six paths: Table/table-steps.css, the design-system gitlink, dist/platform.js, semantic.css, tokens.index.json and platform.css. Every flagged path changed between the stale comparison revision and the actual target parent. None differs between actual target e46577e4 and merge 1713bce4. The task branch also passes GENERATED_OK against its implementation base 0c6dd191 and changes none of those paths. The failing build is therefore a stale CI comparison-base result, not task-generated artifacts committed by #219. The push build passes. No workflow or generated-file changes were made to suppress it.

Typography and targets exact-CI-parent comparisons are being collected on isolated checkouts using the same local Chrome runner, light only and unchanged assertions/baselines.

## Typography

The unchanged light-only inspector covered 108 pages on exact CI parent e46577e4 and merge result 1713bce4, same local Chrome and design-system e5365a05. All owned routes are equal or better; role/prose/pattern counts are zero. The broad traversal reported 583 baseline findings on base and 575 on head. Three unrelated documentation routes initially had higher counts: Avatar 0 to 1, Slider 1 to 3, Content skip link 2 to 3. Direct navigation after five seconds settling reproduces 1/3/3 on both base and head. These are inherited documentation baseline findings, with traversal/highlighting timing affecting which text spans the broad capture sees. No typography baseline was changed. Full page counts and settled raw findings: latest-typography.json.

## Targets and reflow

The original targets test with added route-timing logs completed all 36 pages locally without a CDP timeout. The slow route is implementation/react. Isolating that route on exact CI parent and merge result yields 678 interactive controls, 589 measured targets and one identical narrow inventory splitter finding in each pointer mode on both revisions. Base coarse/fine take 100499/109656 ms; merge coarse/fine 87330/100502 ms. Both are below the unchanged 180000 ms protocol limit locally; CI can exceed it on this expensive route. The measurement repeatedly scrolls and pixel-hit-tests every target. The underlying timeout remains a CI execution-cost issue, not a proven timeout reproduced on base; the same expensive route and findings exist before #219, and head does not add targets or worsen the measured result. Reflow passed 36 pages in CI. No timeout increase, assertion change, baseline relaxation or shared-test fix was made. Raw focused logs and the diagnostic wrapper are included.

## Disposition

No actionable owned regression was found. Local build, SYSTEM1061 and SPEC1171/767 pass. The owner deferred the MediaViewer resolver and existing-CI test wiring to integration. PR #219 can be reviewed with the above red-check attribution; integration and releases remain with Claude.
