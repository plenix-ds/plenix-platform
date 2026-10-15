global.window = {};
require(process.argv[2] + '/inventory-taxonomy.js');
const fs = require('fs');
const src = fs.readFileSync(process.argv[2] + '/inventory.js', 'utf8');
const tax = window.DSTaxonomy;
const want = /unsaved|restor|drill|deep|history|master|list-detail|two-pane|route|location|split/i;
tax.filter(t => !t.platform || t.platform === 'web').forEach(t => t.subs.forEach(s => s[1].split('|').forEach(l => {
  if (want.test(l)) { const claimed = new RegExp("sec: '" + t.id + "', sub: '" + s[0].replace(/[()]/g, '.') + "', leaf: '" + l + "'").test(src); console.log(t.id, '|', s[0], '|', l, claimed ? 'CLAIMED' : 'free'); }
})));
