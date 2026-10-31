// ONE-TIME SCRIPT (#709, Vite step 1): delete it in Vite step 6, when the old bundler is retired.
// Compares two Platform bundles: the old bundler's and Vite's. It runs each in its own Node vm with the vendored React
// and ReactDOM (platform/vendor/, as the public-API check does), then prints a table: the window.Plenix names (they must
// be identical), the kind of each value, whether the global is frozen, and the byte sizes.
//   node tools/agent/compare-vite-platform.js <old platform.js> [<Vite platform.js>]
// Step 2: the old file is platform/dist/platform.js built from the base branch in a scratch copy; the Vite file defaults
// to this checkout's platform/dist/platform.js (node build-app.js). Exits 1 when the names, the kinds or the frozen state differ.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..', '..');
if (!process.argv[2]) { console.error('usage: node tools/agent/compare-vite-platform.js <old platform.js> [<Vite platform.js>]'); process.exit(2); }
const FILES = { 'old bundler': path.resolve(process.argv[2]), 'Vite': path.resolve(process.argv[3] || path.join(ROOT, 'platform/dist/platform.js')) };

function load(rel) {
  const file = rel;
  rel = file.startsWith(ROOT + path.sep) ? path.relative(ROOT, file) : 'outside this checkout: …/' + file.split(path.sep).slice(-3).join('/');
  if (!fs.existsSync(file)) { console.error('Missing ' + file + ': build it first'); process.exit(1); }
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
process.exit(onlyA.length || onlyB.length || kindDiff.length || a.frozen !== b.frozen ? 1 : 0);
