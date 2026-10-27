// Plenix · check-system rule "cascade-layers" (issue 249; Styling Standard section 8): every production stylesheet is in a
// cascade layer, and the order is declared once. Unlayered CSS beats layered CSS, so one sheet left out flips precedence.
//   - platform/system/layers.json is the map: the order (vendor, reset, tokens, elements, layout, components, patterns,
//     utilities) and each stylesheet's layer (a folder's, or a system file's own);
//   - platform.css and plenix-system.css declare the order first, as `@layer plx.vendor, plx.reset, …;`, and every
//     @import in them (and in the library block build-exports.js writes) ends in layer(plx.<name>) equal to the map;
//   - any other production stylesheet (platform/, services/) with a style rule outside an @layer fails, unless it is listed
//     in UNLAYERED with the reason. Not read: vendor files, the design system (platform/design-system, its own
//     repository: lanes/), the generated library parts list (platform/exports), docs and tests.
// The rule is a module check-system.js runs: require('./check-system.rules/cascade-layers.js').check({ add })
// Alone: node check-system.rules/cascade-layers.js   -> CASCADE_LAYERS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'cascade-layers';
const ROOT = path.join(__dirname, '..');
const MAP = path.join(ROOT, 'platform', 'system', 'layers.json');
// a sheet that may hold unlayered rules, and why
const UNLAYERED = {
  // TODO (#249): the first release that ships layers also changes login.css: after it, this sheet's unlayered rules beat the layered Platform, so wrap it in `@layer app` (after `@layer plx, app;`) in that release and remove this entry
  'services/login/login.css': 'served with the released CDN stylesheet, which has no layers until the release that ships them',
  'services/auth/brand.css': 'pasted into Authentik, whose own CSS is unlayered: a layer would lose to it, so it wins by specificity (no !important)',
};
const SKIP_DIR = /^(node_modules|\.git|vendor|dist|design-system|exports|docs|tests|release|packages|dev)$/;

const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
const strip = (t) => t.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
// the top-level rules of a sheet: [{ head, line, layered }] (a block's head is its text before the brace)
function topLevel(text) {
  const src = strip(text), out = []; let depth = 0, head = '', start = 0, line = 1, headLine = 1;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === '\n') line++;
    if (depth === 0) {
      if (c === '{') { out.push({ head: head.trim(), line: headLine, block: true }); depth = 1; head = ''; continue; }
      if (c === ';') { if (head.trim()) out.push({ head: head.trim(), line: headLine, block: false }); head = ''; continue; }
      if (!head.trim() && !/\s/.test(c)) headLine = line;
      head += c;
    } else if (c === '{') depth++;
    else if (c === '}') depth--;
  }
  return out;
}
const walk = (d, out) => { if (!fs.existsSync(d)) return out; for (const e of fs.readdirSync(d, { withFileTypes: true })) {
  const p = path.join(d, e.name);
  if (e.isDirectory()) { if (!SKIP_DIR.test(e.name)) walk(p, out); } else if (e.name.endsWith('.css')) out.push(p);
} return out; };

function check({ add }) {
  let map; try { map = JSON.parse(fs.readFileSync(MAP, 'utf8')); } catch (e) { add(NAME, MAP, 0, 'platform/system/layers.json is missing or not JSON'); return; }
  const statement = '@layer ' + map.order.map((n) => 'plx.' + n).join(', ');
  const layerOf = (file) => file.startsWith('system/') ? map.system[file.slice(7)] : map.folders[file.split('/')[0]];
  for (const entry of ['platform/platform.css', 'platform/plenix-system.css']) {
    const f = path.join(ROOT, entry); if (!fs.existsSync(f)) continue;
    const rules = topLevel(fs.readFileSync(f, 'utf8'));
    if (!rules.length || rules[0].head.replace(/\s+/g, ' ') !== statement) add(NAME, f, rules.length ? rules[0].line : 1, 'the first rule must declare the order: ' + statement + ';');
    const dir = path.dirname(entry);
    for (const r of rules) {
      const m = r.head.match(/^@import\s+url\("([^"]+)"\)\s*(?:layer\(([^)]*)\))?$/);
      if (!m) { if (!/^@layer\b/.test(r.head)) add(NAME, f, r.line, 'only @layer and @import belong here: ' + r.head.slice(0, 60)); continue; }
      if (path.basename(m[1]) === 'plenix-system.css') continue;
      const file = path.posix.normalize(path.posix.join(dir, m[1])).replace(/^platform\//, '');
      const want = layerOf(file);
      if (!want) { add(NAME, f, r.line, file + ' has no layer in platform/system/layers.json'); continue; }
      if (m[2] !== 'plx.' + want) add(NAME, f, r.line, file + ' must be imported as layer(plx.' + want + ')' + (m[2] ? ', not layer(' + m[2] + ')' : ''));
    }
  }
  for (const f of [].concat(walk(path.join(ROOT, 'platform'), []), walk(path.join(ROOT, 'services'), []))) {
    const r = rel(f);
    if (/^platform\/(platform|plenix-system)\.css$/.test(r) || /GENERATED/.test(fs.readFileSync(f, 'utf8').slice(0, 300)) && /^platform\/system\//.test(r)) continue;
    // a sheet the two entry sheets import takes its layer there
    if (importedByEntry(r)) continue;
    const loose = topLevel(fs.readFileSync(f, 'utf8')).filter((x) => x.block && !/^@(layer|font-face|keyframes|property|charset)\b/.test(x.head));
    if (loose.length && !UNLAYERED[r]) add(NAME, f, loose[0].line, 'a style rule outside any @layer (' + loose[0].head.slice(0, 40) + '): import it from platform.css with a layer, or wrap it in @layer');
    if (!loose.length && UNLAYERED[r]) add(NAME, f, 0, 'is listed as unlayered in check-system.rules/cascade-layers.js but has no unlayered rule: remove it from the list');
  }
}

let imported = null;
function importedByEntry(r) {
  if (!imported) {
    imported = new Set();
    const visit = (f) => { if (!fs.existsSync(f)) return; for (const m of fs.readFileSync(f, 'utf8').matchAll(/@import\s+url\("([^"]+)"\)/g)) {
      const p = rel(path.join(path.dirname(f), m[1])); if (!imported.has(p)) { imported.add(p); visit(path.join(ROOT, p)); } } };
    visit(path.join(ROOT, 'platform', 'platform.css')); visit(path.join(ROOT, 'platform', 'plenix-system.css'));
  }
  return imported.has(r);
}

module.exports = { check };

if (require.main === module) {
  const out = [];
  check({ add: (rule, file, line, text) => out.push(rel(file) + ':' + line + '  ' + text) });
  out.forEach((l) => console.log('  ' + l));
  console.log(out.length ? 'CASCADE_LAYERS_FAIL (' + out.length + ')' : 'CASCADE_LAYERS_OK');
  process.exit(out.length ? 1 : 0);
}
