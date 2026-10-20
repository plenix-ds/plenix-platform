const fs = require('fs');
const R = 'D:/Documents/Projects/Projects_Applications/Plenix/';
function edit(file, pairs) {
  const p = R + file; let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(file + ' missing: ' + a.slice(0, 90)); s = s.replace(a, b); }
  fs.writeFileSync(p, s);
}
const EXT = 'min(0px, calc((100% - {plx-sys.control-target-min}) / 2))';
const tok = (name, desc) => `    "${name}": {
      "$value": "${EXT}",
      "$type": "dimension",
      "$description": "${desc}"
    },
`;
edit('platform/tokens/components.tokens.json', [
  ['    "breadcrumbs-list-gap": {', tok('breadcrumbs-link-target-inset-block', 'How far a breadcrumb link\'s invisible target reaches above and below its text: up to the minimum target (--plx-sys-control-target-min: 24px with a mouse, 44px with touch), centered on the link; 0 when the link is already that tall (Platforms Standard 3.1).')
    + tok('breadcrumbs-link-target-inset-inline', 'How far a breadcrumb link\'s invisible target reaches before and after its text: up to the minimum target width, centered on the link; 0 when the link is already that wide.')
    + '    "breadcrumbs-list-gap": {'],
  ['    "text-link-text": {', tok('text-link-target-inset-block', 'How far a text link that is a table cell\'s only content reaches above and below its text with an invisible target: up to the minimum target (--plx-sys-control-target-min: 24px with a mouse, 44px with touch), centered on the link; the cell clips it, so it never reaches the next row (Platforms Standard 3.1).')
    + tok('text-link-target-inset-inline', 'How far that link\'s invisible target reaches before and after its text: up to the minimum target width, centered on the link; the cell clips it, so it never reaches the next column.')
    + '    "text-link-text": {'],
]);
const rowGap = (sel) => `    "breadcrumbs-list-row-gap": {
      "$value": "calc({plx-sys.control-target-min} - 1lh)",
      "$type": "dimension",
      "$description": "With ${sel} a wrapped trail's rows part by the minimum target less one line, so the links' 44px targets of one row do not cover the next (Platforms Standard 3.2)"
    },
`;
for (const [f, sel] of [['platform/tokens/components.interaction-touch.tokens.json', 'touch'], ['platform/tokens/components.interaction-mobile.tokens.json', 'a phone']]) {
  const p = R + f; let s = fs.readFileSync(p, 'utf8');
  if (s.includes('"breadcrumbs-list-row-gap"')) continue;
  s = s.replace('  "plx-comp": {\n', '  "plx-comp": {\n' + rowGap(sel));
  fs.writeFileSync(p, s);
}
edit('platform/components/Breadcrumbs/breadcrumbs.css', [
  ['.plx-breadcrumbs__link{color:var(--plx-comp-breadcrumbs-link-text);text-decoration-line:none;}',
   `.plx-breadcrumbs__link{color:var(--plx-comp-breadcrumbs-link-text);position:relative;text-decoration-line:none;}
/* the link's target reaches the minimum target size (24px with a mouse, 44px with touch) through an invisible extension
   centered on it, so the look does not change (Platforms Standard 3.1); with touch a wrapped trail's rows part far enough
   that one row's targets do not cover the next */
.plx-breadcrumbs__link::after{content:"";inset-block-end:var(--plx-comp-breadcrumbs-link-target-inset-block);inset-block-start:var(--plx-comp-breadcrumbs-link-target-inset-block);inset-inline-end:var(--plx-comp-breadcrumbs-link-target-inset-inline);inset-inline-start:var(--plx-comp-breadcrumbs-link-target-inset-inline);position:absolute;}`],
]);
edit('platform/components/Text/text.css', [
  ['.plx-text--link{color:var(--plx-comp-text-link-text);font-weight:var(--plx-comp-text-link-font-weight);}',
   `.plx-text--link{color:var(--plx-comp-text-link-text);font-weight:var(--plx-comp-text-link-font-weight);}
/* a link that stands alone as a table cell's only content (not inside a sentence, where WCAG's inline exception applies):
   an invisible extension centered on it reaches the minimum target (24px with a mouse, 44px with touch) without changing
   the look; the cell (positioned, overflow hidden) clips it, so it never reaches a neighbor row or column (Platforms
   Standard 3.1, 3.2) */
.plx-data-grid__portal>a.plx-text--link:only-child{position:relative;}
.plx-data-grid__portal>a.plx-text--link:only-child::before{content:"";inset-block-end:var(--plx-comp-text-link-target-inset-block);inset-block-start:var(--plx-comp-text-link-target-inset-block);inset-inline-end:var(--plx-comp-text-link-target-inset-inline);inset-inline-start:var(--plx-comp-text-link-target-inset-inline);position:absolute;}`],
]);
console.log('ok');
