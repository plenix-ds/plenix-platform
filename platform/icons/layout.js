// Plenix · the icon asset layout (#279, stage 1 of #277). Build-time only (Node); no page loads this file.
// One layout and one naming for every icon source, written as generated files:
//   icons/<set>/<name>.svg, <name>-fill.svg, <name>-24.svg, <name>-24-fill.svg   the source files, unedited (outline and
//                                                     fill, optical sizes 20 and 24)
//   icons/<set>/<name>.js                             one module per icon, carrying both drawings of both sizes (owner,
//                                                     #277 answer 7): export default { name, set, symbol, fillOutline,
//                                                     mirrored, drawings: { 20: { outline, fill }, 24: { outline, fill } } },
//                                                     each drawing { viewBox, d, transform?, fillRule?, clipRule? }
//   icons/<set>/index.json                            every name, its symbol and files, and every alias -> its name
// Sets: "plenix" (Plenix's own names, platform/icons/map.json) and "material" (every Material Symbols Sharp symbol in
// platform/icons/library, generated as modules at each release: #277 answer 8).
// Naming: a name is lowercase with dashes (mic_off is mic-off); the variant suffixes are -fill, -24 and -24-fill. An alias
// (a symbol's own underscore spelling) has no file of its own: index.json maps it to its name, so every name has exactly
// one module. The CDN serves the layout at /cdn/<version>/icons/<set>/…, which never changes once published.
// No consumer reads these files yet (stage 1): the Icon component and icon.css draw everything as before.
//   node platform/icons/layout.js <plenix|material> <out folder>    writes one set there (the material set on its own); the
//     folder must be inside the repository's platform/dist/ or release/, and it is emptied only when it is empty, absent,
//     or holds an index.json this tool wrote (generator: "plenix-icons")
const fs = require('fs');
const path = require('path');

const VARIANTS = ['', '-fill', '-24', '-24-fill'];
// the symbols that point along the reading direction: mirrored in right to left (build-icons.js draws them so in icon.css)
const MIRROR = ['arrow_back', 'arrow_right', 'chevron_left', 'chevron_right', 'left_panel_close', 'left_panel_open', 'right_panel_close', 'right_panel_open', 'undo', 'redo'];
const dashed = (s) => s.replace(/_/g, '-');

// the allow-list every icon file passes (platform/utils/iconSafety.js, #285): the same module the Icon component uses,
// loaded here through Babel (it is written as an ES module for the Platform bundle)
let safety = null;
function iconSafety() {
  if (safety) return safety;
  const Babel = require('@babel/standalone');
  const code = Babel.transform(fs.readFileSync(path.join(__dirname, '..', 'utils', 'iconSafety.js'), 'utf8'), { sourceType: 'module', plugins: ['transform-modules-commonjs'] }).code;
  const m = { exports: {} }; new Function('module', 'exports', 'require', code)(m, m.exports, require);
  return (safety = m.exports);
}
// one icon file's drawing, through the allow-list: { viewBox, d, transform?, fillRule?, clipRule? }; a file it refuses
// stops the build, naming the file and the reason
function readDrawing(file) {
  const r = iconSafety().checkIconSvg(fs.readFileSync(file, 'utf8'));
  if (!r.ok) throw new Error('icon file refused (' + r.reason + '): ' + file);
  return r.drawing;
}

// where a symbol's file is: the working set, then Plenix's own icons (custom), then the full library
function symbolFile(dir, symbol, variant) {
  for (const f of [path.join(dir, symbol + variant + '.svg'), path.join(dir, 'custom', symbol + variant + '.svg'), path.join(dir, 'library', symbol + variant + '.svg')]) if (fs.existsSync(f)) return f;
  throw new Error('icon file missing: ' + symbol + variant + '.svg');
}

// the Plenix set: each Plenix name (map.json) -> its symbol; "#fill" means its outline is the symbol's fill drawing
function plenixEntries(root) {
  const dir = path.join(root, 'platform', 'icons'), M = JSON.parse(fs.readFileSync(path.join(dir, 'map.json'), 'utf8'));
  return Object.keys(M.map).sort().map((name) => {
    const v = M.map[name], symbol = v.split('#')[0];
    const alias = name.includes('-') && name.replace(/-/g, '_') === symbol && !M.map[symbol] ? symbol : null;   // build-icons.js's aliasOf
    return { name, symbol, fillOutline: v.endsWith('#fill'), mirrored: MIRROR.includes(symbol), aliases: alias ? [alias] : [],
      files: Object.fromEntries(VARIANTS.map((x) => [x, symbolFile(dir, symbol, x)])) };
  });
}

// the Material set: every library symbol that has all four files, by its dashed name (its underscore spelling an alias)
function materialEntries(root) {
  const lib = path.join(root, 'platform', 'icons', 'library'), files = new Set(fs.existsSync(lib) ? fs.readdirSync(lib) : []);
  const symbols = [...new Set([...files].map((f) => f.replace(/(-24)?(-fill)?\.svg$/, '')))].filter((s) => VARIANTS.every((x) => files.has(s + x + '.svg'))).sort();
  return symbols.map((symbol) => ({ name: dashed(symbol), symbol, fillOutline: false, mirrored: MIRROR.includes(symbol), aliases: dashed(symbol) !== symbol ? [symbol] : [],
    files: Object.fromEntries(VARIANTS.map((x) => [x, path.join(lib, symbol + x + '.svg')])) }));
}

const GENERATOR = 'plenix-icons';

// one icon's module text
function moduleText(set, e, source) {
  const d = (x) => readDrawing(e.files[x]);
  const mod = { name: e.name, set, symbol: e.symbol, fillOutline: e.fillOutline, mirrored: e.mirrored,
    drawings: { 20: { outline: d(''), fill: d('-fill') }, 24: { outline: d('-24'), fill: d('-24-fill') } } };
  // a path used by more than one drawing (outline and fill, 20 and 24 are often the same) is written once, as a constant the
  // drawings share (#280): the exported object is exactly the same, the file shorter
  const count = new Map();
  for (const size of [20, 24]) for (const k of ['outline', 'fill']) { const p = mod.drawings[size][k].d; count.set(p, (count.get(p) || 0) + 1); }
  const shared = [...count.keys()].filter((p) => count.get(p) > 1), mark = (i) => '@@plx-path-' + i + '@@';
  for (const size of [20, 24]) for (const k of ['outline', 'fill']) { const i = shared.indexOf(mod.drawings[size][k].d); if (i >= 0) mod.drawings[size][k] = Object.assign({}, mod.drawings[size][k], { d: mark(i) }); }
  let body = JSON.stringify(mod);
  shared.forEach((p, i) => { body = body.split(JSON.stringify(mark(i))).join('d' + i); });
  return '// GENERATED by platform/icons/layout.js from ' + source + ' (do not edit). Icon "' + e.name + '" of the ' + set +
    ' set (symbol ' + e.symbol + ').\n' + shared.map((p, i) => 'const d' + i + ' = ' + JSON.stringify(p) + ';\n').join('') + 'export default ' + body + ';\n';
}   // the mark in every index.json this tool writes: only such a folder is ever emptied

// a folder may be (re)written only when it does not exist, is empty, or holds an index.json this tool wrote
function safeToReplace(out) {
  if (!fs.existsSync(out)) return true;
  if (!fs.statSync(out).isDirectory()) return false;
  const names = fs.readdirSync(out);
  if (!names.length) return true;
  try { return JSON.parse(fs.readFileSync(path.join(out, 'index.json'), 'utf8')).generator === GENERATOR; } catch (e) { return false; }
}

// writes one set: the files, a module per name and index.json; returns what it wrote
function writeIconSet(set, entries, out, source) {
  if (!safeToReplace(out)) throw new Error('refusing to empty ' + out + ': it is not empty and holds no index.json written by platform/icons/layout.js');
  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const seen = new Map(); let bytes = 0, count = 0;
  const write = (f, text) => { fs.writeFileSync(f, text); bytes += Buffer.byteLength(text); count++; };
  for (const e of entries) {
    if (seen.has(e.name)) throw new Error('two icons named ' + e.name + ' in ' + set + ': ' + seen.get(e.name) + ', ' + e.symbol);
    seen.set(e.name, e.symbol);
    for (const x of VARIANTS) write(path.join(out, e.name + x + '.svg'), fs.readFileSync(e.files[x], 'utf8'));
    write(path.join(out, e.name + '.js'), moduleText(set, e, source));
  }
  const aliases = {}; for (const e of entries) for (const a of e.aliases) if (!seen.has(a)) aliases[a] = e.name;
  // an alias's module (#280, stage 5a): the name's module under the alias's spelling, so a component that writes the
  // symbol's own spelling (more_horiz) keeps its markup (plx-icon--more_horiz) when it imports the icon; no drawing is copied
  for (const [a, name] of Object.entries(aliases)) write(path.join(out, a + '.js'), '// GENERATED by platform/icons/layout.js (do not edit). Icon "' + a + '" of the ' + set +
    ' set: the alias of "' + name + '".\nimport icon from \'./' + name + '.js\';\nexport default /* @__PURE__ */ Object.assign({}, icon, { name: ' + JSON.stringify(a) + ' });\n');
  write(path.join(out, 'index.json'), JSON.stringify({ generator: GENERATOR, set, source, count: entries.length,
    icons: entries.map((e) => ({ name: e.name, symbol: e.symbol, files: VARIANTS.map((x) => e.name + x + '.svg').concat(e.name + '.js') })), aliases }) + '\n');
  return { set, icons: entries.length, files: count, bytes };
}

// one Material module, written on demand (#282: an application imports plenix-platform/icons/material/<name>): only the
// names imported, never the whole library, into a folder this tool owns (the same guard as writeIconSet); returns its file
function writeMaterialModule(root, name, out) {
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error('not an icon name: ' + name);
  const file = path.join(out, name + '.js'), index = path.join(out, 'index.json');
  // the symbol first: an unknown name creates nothing
  const lib = path.join(root, 'platform', 'icons', 'library');
  const symbol = [name.replace(/-/g, '_'), name].find((s) => VARIANTS.every((x) => fs.existsSync(path.join(lib, s + x + '.svg'))));
  if (!symbol) throw new Error('no Material icon is named ' + name);
  if (fs.existsSync(out) && fs.readdirSync(out).length && !safeToReplace(out)) throw new Error('refusing to write into ' + out + ': it holds no index.json written by platform/icons/layout.js');
  fs.mkdirSync(out, { recursive: true });
  const meta = fs.existsSync(index) ? JSON.parse(fs.readFileSync(index, 'utf8')) : { generator: GENERATOR, set: 'material', source: SOURCE.material, onDemand: true, icons: [] };
  const e = { name, symbol, fillOutline: false, mirrored: MIRROR.includes(symbol), files: Object.fromEntries(VARIANTS.map((x) => [x, path.join(lib, symbol + x + '.svg')])) };
  const text = moduleText('material', e, SOURCE.material);
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) fs.writeFileSync(file, text);
  if (!meta.icons.some((i) => i.name === name)) { meta.icons.push({ name, symbol, files: [name + '.js'] }); meta.icons.sort((a, b) => (a.name < b.name ? -1 : 1)); meta.count = meta.icons.length; fs.writeFileSync(index, JSON.stringify(meta) + '\n'); }
  return file;
}

const SOURCE = { plenix: 'platform/icons (map.json; Material Symbols Sharp, weight 300, and Plenix\'s own icons)', material: 'platform/icons/library (Material Symbols Sharp, weight 300)' };
const writeSet = (root, set, out) => writeIconSet(set, set === 'material' ? materialEntries(root) : plenixEntries(root), out, SOURCE[set]);

module.exports = { VARIANTS, MIRROR, readDrawing, plenixEntries, materialEntries, writeIconSet, writeSet, writeMaterialModule };

if (require.main === module) {
  const [set, out] = process.argv.slice(2);
  if (!['plenix', 'material'].includes(set) || !out) { console.error('usage: node platform/icons/layout.js <plenix|material> <out folder>'); process.exit(2); }
  // from the command line only inside the repository's platform/dist/ or release/ (a mistyped "." or "~" is refused)
  const root = path.resolve(__dirname, '..', '..'), target = path.resolve(out);
  const inside = ['platform/dist', 'release'].some((d) => { const r = path.relative(path.join(root, d), target); return r !== '' && !r.startsWith('..') && !path.isAbsolute(r); });
  if (!inside) { console.error('refusing: the folder must be inside ' + path.join(root, 'platform/dist') + ' or ' + path.join(root, 'release')); process.exit(2); }
  const t = Date.now(), r = writeSet(root, set, target);
  console.log('ICON_LAYOUT ' + set + ': ' + r.icons + ' icons, ' + r.files + ' files, ' + (r.bytes / 1048576).toFixed(1) + ' MB in ' + ((Date.now() - t) / 1000).toFixed(1) + ' s');
}
