// node merge-base.js targets|reflow <verbose output> : lowers the baseline to min(recorded, measured) per page and kind,
// so improvements are kept and nothing that got worse (other writers' work in progress) is absorbed
const fs = require('fs');
const [kind, outFile] = process.argv.slice(2);
const base = 'D:/Documents/Projects/Projects_Applications/Plenix/tests/baselines/' + kind + '.json';
const old = JSON.parse(fs.readFileSync(base, 'utf8'));
const text = fs.readFileSync(outFile, 'utf8');
const now = {};
const re = kind === 'targets' ? /^ {2}(?!NEW )(.+?) · (coarse|fine): (\d+) · /gm : /^ {2}(?!NEW )(.+?) · (page-scroll|scroller|cut-off): (\d+) · /gm;
let m; while ((m = re.exec(text))) { (now[m[1]] = now[m[1]] || {})[m[2]] = +m[3]; }
if (!/(TARGETS|REFLOW)_/.test(text)) { console.error('incomplete run'); process.exit(1); }
const out = {}; let lowered = 0;
for (const p of Object.keys(old)) for (const k of Object.keys(old[p])) {
  const v = Math.min(old[p][k], (now[p] || {})[k] || 0);
  if (v < old[p][k]) { lowered++; console.log('  ' + p + ' · ' + k + ': ' + old[p][k] + ' -> ' + v); }
  if (v) (out[p] = out[p] || {})[k] = v;
}
fs.writeFileSync(base, JSON.stringify(out, null, 1) + '\n');
console.log(kind + ': ' + lowered + ' entries lowered');
