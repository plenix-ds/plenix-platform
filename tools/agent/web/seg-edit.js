const fs = require('fs');
const R = 'D:/Documents/Projects/Projects_Applications/Plenix/';
function edit(file, pairs) {
  const p = R + file; let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(file + ' missing: ' + a.slice(0, 90)); s = s.split(a).join(b); }
  fs.writeFileSync(p, s);
}
const seg = fs.readFileSync(R + 'platform/components/SegmentedControl/segmented-control.css', 'utf8');
if (!seg.includes('segmented-item-target')) {
  fs.appendFileSync(R + 'platform/components/SegmentedControl/segmented-control.css', `/* the target (Platforms Standard 3.1): an invisible extension reaches the minimum target (24px with a mouse, 44px with touch)
   without changing the look. In height it is centered on the option; in width only the first option reaches out before
   the track and the last after it, so no option's target covers its neighbor's */
.plx-segmented__item{position:relative;}
.plx-segmented__item::before{content:"";inset-block-end:var(--plx-comp-segmented-item-target-inset-block);inset-block-start:var(--plx-comp-segmented-item-target-inset-block);inset-inline-end:0;inset-inline-start:0;position:absolute;}
.plx-segmented__item:first-child::before{inset-inline-start:var(--plx-comp-segmented-item-target-inset-outer);}
.plx-segmented__item:last-child::before{inset-inline-end:var(--plx-comp-segmented-item-target-inset-outer);}
`);
}
edit('platform/components/Checkbox/checkbox.css', [
  ['.plx-check:not(:has(.plx-check__text))::before{', `/* a switch without a visible label: the same invisible target layer, centered on the track (Platforms Standard 3.1) */
.plx-switch:not(:has(.plx-switch__label))::before{content:"";inset-block-end:var(--plx-comp-switch-target-inset);inset-block-start:var(--plx-comp-switch-target-inset);inset-inline-end:var(--plx-comp-switch-target-inset);inset-inline-start:var(--plx-comp-switch-target-inset);position:absolute;}
.plx-check:not(:has(.plx-check__text))::before{`],
]);
edit('platform/tokens/components.tokens.json', [
  ['    "check-target-inset": {', `    "switch-target-inset": {
      "$value": "min(0px, calc((100% - {plx-sys.control-target-min}) / 2))",
      "$type": "dimension",
      "$description": "The invisible target layer around a switch without a visible label: it grows the target to the minimum target (Platforms Standard 3.1) without changing the track"
    },
    "segmented-item-target-inset-block": {
      "$value": "min(0px, calc((100% - {plx-sys.control-target-min}) / 2))",
      "$type": "dimension",
      "$description": "How far a segmented option's invisible target reaches above and below it: up to the minimum target (24px with a mouse, 44px with touch), centered (Platforms Standard 3.1)"
    },
    "segmented-item-target-inset-outer": {
      "$value": "min(0px, calc(100% - {plx-sys.control-target-min}))",
      "$type": "dimension",
      "$description": "How far the first option's target reaches before the track and the last option's after it, up to the minimum target width; the options between keep their own width, so no target covers a neighbor's"
    },
    "check-target-inset": {`],
]);
console.log('ok');
