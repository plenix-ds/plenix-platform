# ToolRail zero-overlap proof (#207)

Exact base `681dea49`; DS `e5365a05bab701d0add622aa5459bcbc8b33f0d3`. Actual React,1440×1000,light only.

Twelve single-state configurations combine icons/labels with rest, hover, current, focus, disabled and real pointer-active. Every computed non-custom/non-animation property on42owned elements is identical to the unchanged-base gzip capture. Eight combined-state checks assert the Standard precedence disabled > transient active > hover > persistent current > rest, in both label modes, and zero strict overlaps. Focus remains independent. Label dimensions are passed through the item's own class; six registered noninheriting state variables assign background,text,cursor,height,width,padding once. One ancestor-selector finding removed. No shared NavBar/Icon sources or tokens change.

Intentional Standard corrections (previous cascade is evident in the guarded original CSS):

| Combined state | Previous priority | Corrected priority |
| --- | --- | --- |
| Disabled + hover | Hover background, disabled text | Disabled rest background/text |
| Disabled + current | Selected background, disabled text | Disabled rest background/text |
| Current + hover | Selected background/text | Hover background/text |
| Current + active | Selected background/text | Existing active background and hover/default content role |

Current alone keeps its existing selected roles and filled state icon. Active alone keeps the existing pressed role and scale. Focus styling is unchanged. No new colors,fonts,tokens or other design choices.

`edit-rail.cjs` is the guarded exact transformation; unmatched source stops it. Run `node tests/rail-zero-overlap-207.test.js` after overlay/build, never recapture on this branch. Matching navigation-rail lab classes are under `lanes/207-rail/design-system/navigation-labs.js`. Canonical route verified from inventory.js: navigation/navigation-rail.

Build/usage,SYSTEM1065,SPEC1172/768,selector59,audit22/pilot611,Navigation rail lab and dashboard strict audit pass. Generated outputs are restored before commit. No baseline/assertion relaxation or new CI workflow.
