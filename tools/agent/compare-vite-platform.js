// ONE-TIME SCRIPT (#709, Vite step 1): delete it in Vite step 6, when the old bundler is retired.
// Compares the Platform bundle from build-app.js (platform/dist/platform.js) with the one from Vite
// (build/vite/platform.js, npm run build:vite-platform). It runs each in its own Node vm with the vendored React and
// ReactDOM (platform/vendor/, as build-app.js checks the public API), then prints a table: the window.Plenix names
// (they must be identical), the kind of each value, whether the global is frozen, and the byte sizes.
//   node build-app.js && npm run build:vite-platform && node tools/agent/compare-vite-platform.js
// Exits 1 when the names or kinds differ.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..', '..');
const FILES = { 'build-app.js': 'platform/dist/platform.js', 'Vite': 'build/vite/platform.js' };

function load(rel) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.error('Missing ' + rel + ': build it first'); process.exit(1); }
  const text = fs.readFileSync(file, 'utf8');
  const sandbox = { console, document: { documentElement: { getAttribute: () => null } } };
  sandbox.window = sandbox; sandbox.self = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const f of ['react.development.js', 'react-dom.development.js']) vm.runInContext(fs.readFileSync(path.join(ROOT, 'platform', 'vendor', f), 'utf8'), sandbox, { filename: f });
  vm.runInContext(text, sandbox, { filename: rel });
  const api = sandbox.Plenix || {};
  const kinds = {};
  for (const k of Object.keys(api)) kinds[k] = api[k] === null ? 'null' : Array.isArray(api[k]) ? 'array' : typeof api[k];
  return { rel, bytes: Buffer.byteLength(text), gzip: zlib.gzipSync(text).length, lines: text.split('\n').length, names: Object.keys(api).sort(), kinds, frozen: Object.isFrozen(api) };
}

const [a, b] = Object.entries(FILES).map(([label, rel]) => Object.assign(load(rel), { label }));
const onlyA = a.names.filter((n) => !b.names.includes(n));
const onlyB = b.names.filter((n) => !a.names.includes(n));
const kindDiff = a.names.filter((n) => b.names.includes(n) && a.kinds[n] !== b.kinds[n]).map((n) => n + ' (' + a.kinds[n] + ' / ' + b.kinds[n] + ')');
const kb = (n) => (n / 1024).toFixed(1) + ' KB';
const pct = (x, y) => (y >= x ? '+' : '') + (((y - x) / x) * 100).toFixed(1) + '%';

const rows = [
  ['', a.label, b.label, 'Difference'],
  ['File', a.rel, b.rel, ''],
  ['window.Plenix names', String(a.names.length), String(b.names.length), onlyA.length || onlyB.length ? 'DIFFERENT' : 'identical'],
  ['Kinds of value (function, object, ...)', '', '', kindDiff.length ? kindDiff.length + ' differ' : 'identical'],
  ['window.Plenix frozen', String(a.frozen), String(b.frozen), a.frozen === b.frozen ? 'same' : 'different'],
  ['Bytes', String(a.bytes), String(b.bytes), pct(a.bytes, b.bytes)],
  ['Size', kb(a.bytes), kb(b.bytes), pct(a.bytes, b.bytes)],
  ['Gzipped', kb(a.gzip), kb(b.gzip), pct(a.gzip, b.gzip)],
  ['Lines', String(a.lines), String(b.lines), pct(a.lines, b.lines)],
];
const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => r[i].length)));
const line = (r) => '| ' + r.map((c, i) => c.padEnd(widths[i])).join(' | ') + ' |';
console.log(line(rows[0]));
console.log('|' + widths.map((w) => '-'.repeat(w + 2)).join('|') + '|');
rows.slice(1).forEach((r) => console.log(line(r)));
if (onlyA.length) console.log('\nOnly in ' + a.label + ': ' + onlyA.join(', '));
if (onlyB.length) console.log('\nOnly in ' + b.label + ': ' + onlyB.join(', '));
if (kindDiff.length) console.log('\nKinds that differ (' + a.label + ' / ' + b.label + '): ' + kindDiff.join(', '));
process.exit(onlyA.length || onlyB.length || kindDiff.length ? 1 : 0);
