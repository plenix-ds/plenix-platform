// Merges every checked fragment (scratchpad/native/ios-*.json, android-*.json) into platform/standards/native-design.json.
// Usage: node merge.js [fragment ...] (default: all). Run check.js on them first.
const fs = require('fs'), path = require('path');
const F = path.resolve(__dirname, '../../../platform/standards/native-design.json');
const dir = __dirname;
const files = process.argv.length > 2 ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => /^(ios|android)-.*\.json$/.test(f)).map((f) => path.join(dir, f));
const data = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
// a page that already exists keeps what it has: the fragment's variants (and anatomy, attributes, states rows) are added
// by name, never replacing another lane's designs (2026-10-15: two lanes wrote android-patterns|Confirmation)
const union = (a, b, key) => { const seen = new Set((a || []).map((x) => (key ? x[key] : JSON.stringify(x)))); return (a || []).concat((b || []).filter((x) => !seen.has(key ? x[key] : JSON.stringify(x)))); };
for (const f of files) {
  const frag = JSON.parse(fs.readFileSync(f, 'utf8'));
  for (const [k, v] of Object.entries(frag)) {
    const old = data.pages[k];
    data.pages[k] = !old ? v : Object.assign({}, v, old, { variants: union(old.variants, v.variants, 'name'), anatomy: union(old.anatomy, v.anatomy), attributes: union(old.attributes, v.attributes), states: union(old.states, v.states) });
    n++;
  }
}
// in the taxonomy's order would need the taxonomy; keys sorted keep diffs stable
data.pages = Object.fromEntries(Object.entries(data.pages).sort((a, b) => a[0].localeCompare(b[0])));
fs.writeFileSync(F, JSON.stringify(data, null, 1) + '\n');
console.log('merged', n, 'entries;', Object.keys(data.pages).length, 'pages in native-design.json');
