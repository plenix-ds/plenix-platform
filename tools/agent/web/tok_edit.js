// inserts the SecondaryPane Back bar tokens after secondary-pane-rail-end-shadow, keeping key order
const fs = require('fs');
const p = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/tokens/components.tokens.json';
const raw = fs.readFileSync(p, 'utf8');
const j = JSON.parse(raw);
const group = Object.keys(j).find((k) => j[k] && typeof j[k] === 'object' && j[k]['secondary-pane-rail-end-shadow']);
if (!group) throw new Error('group not found');
const g = j[group];
if (g['secondary-pane-back-background']) { console.log('already there'); process.exit(0); }
const add = {
  'secondary-pane-back-background': { $value: '{plx-sys.surface-default}', $type: 'color', $description: 'The Back bar that leads a list-detail pane\'s detail at Narrow: the pane surface.' },
  'secondary-pane-back-border-block-end-color': { $value: '{plx-sys.border-default}', $type: 'color', $description: 'The Back bar\'s divider under it, as the pane\'s divider on its content side.' },
  'secondary-pane-back-border-block-end-width': { $value: '{plx-sys.border-width-thin}', $type: 'dimension', $description: 'The Back bar\'s divider width.' },
  'secondary-pane-back-min-height': { $value: '{plx-sys.control-height-toolbar}', $type: 'dimension', $description: 'The Back bar\'s height: the pane header\'s row height.' },
  'secondary-pane-back-padding-block': { $value: '{plx-sys.space-inset-xs}', $type: 'dimension', $description: 'Space above and below the Back control.' },
  'secondary-pane-back-padding-inline': { $value: '{plx-sys.space-inset-sm}', $type: 'dimension', $description: 'Space before and after the Back control.' },
};
const out = {};
for (const k of Object.keys(g)) { out[k] = g[k]; if (k === 'secondary-pane-rail-end-shadow') Object.assign(out, add); }
j[group] = out;
const indent = /\n( +)"/.exec(raw)[1].length;
fs.writeFileSync(p, JSON.stringify(j, null, indent) + (raw.endsWith('\n') ? '\n' : ''));
console.log('added to', group);
