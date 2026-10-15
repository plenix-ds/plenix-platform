const fs = require('fs');
const R = 'D:/Documents/Projects/Projects_Applications/Plenix/';
function edit(file, pairs) {
  const p = R + file; let s = fs.readFileSync(p, 'utf8');
  for (const [a, b] of pairs) { if (!s.includes(a)) throw new Error(file + ' missing: ' + a.slice(0, 90)); s = s.split(a).join(b); }
  fs.writeFileSync(p, s);
}
edit('platform/patterns/BulkActions/bulk-actions.css', [
  ['.plx-selection-summary{align-items:center;column-gap:var(--plx-comp-selection-summary-gap);display:flex;flex-shrink:0;}',
   `/* the summary keeps its one line while there is room; in a narrow bar (320px) it yields first: "Select all" and "Clear
   selection" wrap under the count, so the actions keep at least the room of the More control (reflow, Platforms
   Standard 3.5) */
.plx-selection-summary{align-items:center;column-gap:var(--plx-comp-selection-summary-gap);display:flex;flex-shrink:1;flex-wrap:wrap;min-inline-size:0;row-gap:var(--plx-comp-selection-summary-row-gap);}`],
  ['flex-basis:0%;flex-grow:1;flex-shrink:1;flex-wrap:wrap;min-inline-size:0;',
   'flex-basis:0%;flex-grow:1;flex-shrink:1;flex-wrap:wrap;min-inline-size:var(--plx-comp-bulk-actions-list-min-width);'],
]);
edit('platform/tokens/components.tokens.json', [
  ['    "bulk-actions-list-gap": {', `    "bulk-actions-list-min-width": {
      "$value": "{plx-ref.size-72px}",
      "$type": "dimension",
      "$description": "The least room the actions keep in a narrow bar: the More control (its label and chevron) always fits, and the selection summary wraps instead (reflow at 320px, Platforms Standard 3.5)."
    },
    "bulk-actions-list-gap": {`],
  ['    "selection-summary-count-text": {', `    "selection-summary-row-gap": {
      "$value": "{plx-sys.space-stack-xs}",
      "$type": "dimension",
      "$description": "Between the count and \\"Select all\\" when the summary wraps in a narrow bar."
    },
    "selection-summary-count-text": {`],
]);
console.log('ok');
