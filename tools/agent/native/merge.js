// Merges every checked fragment (scratchpad/native/ios-*.json, android-*.json) into platform/standards/native-design.json.
// Usage: node merge.js [fragment ...] (default: all). Run check.js on them first.
const fs = require('fs'), path = require('path');
const F = 'D:/Documents/Projects/Projects_Applications/Plenix/platform/standards/native-design.json';
const dir = __dirname;
const files = process.argv.length > 2 ? process.argv.slice(2) : fs.readdirSync(dir).filter((f) => /^(ios|android)-.*\.json$/.test(f)).map((f) => path.join(dir, f));
const data = JSON.parse(fs.readFileSync(F, 'utf8'));
let n = 0;
for (const f of files) { const frag = JSON.parse(fs.readFileSync(f, 'utf8')); for (const [k, v] of Object.entries(frag)) { data.pages[k] = v; n++; } }
// in the taxonomy's order would need the taxonomy; keys sorted keep diffs stable
data.pages = Object.fromEntries(Object.entries(data.pages).sort((a, b) => a[0].localeCompare(b[0])));
fs.writeFileSync(F, JSON.stringify(data, null, 1) + '\n');
console.log('merged', n, 'entries;', Object.keys(data.pages).length, 'pages in native-design.json');
