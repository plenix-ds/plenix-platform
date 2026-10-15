// node addtok.js <tokens json file> <after key|-> <entries.json>
// inserts (or replaces) plx-comp entries after the given key; '-' appends at the end
const fs = require('fs');
const [file, after, entriesFile] = process.argv.slice(2);
const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
const add = JSON.parse(fs.readFileSync(entriesFile, 'utf8'));
const tier = add.$tier || 'plx-comp'; delete add.$tier;
const src = doc[tier];
for (const k of Object.keys(add)) if (src[k] && !add[k].$replace) { console.error('exists: ' + k); process.exit(1); }
Object.keys(add).forEach((k) => delete add[k].$replace);
const out = {};
let placed = false;
for (const k of Object.keys(src)) {
  if (add[k]) continue;   // replaced entries move to the insertion point
  out[k] = src[k];
  if (k === after) { Object.assign(out, add); placed = true; }
}
if (!placed) { if (after !== '-') { console.error('no key ' + after); process.exit(1); } Object.assign(out, add); }
doc[tier] = out;
fs.writeFileSync(file, JSON.stringify(doc, null, 2) + '\n');
console.log('added ' + Object.keys(add).length + ' to ' + file);
