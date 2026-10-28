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

// one icon file's drawing: its one path in its own box, with the path's own drawing attributes (as build-icons.js reads it)
function readDrawing(file) {
  const svg = fs.readFileSync(file, 'utf8'), tag = svg.match(/<path\b([^>]*)\/?>/), box = svg.match(/viewBox="([^"]+)"/), w = svg.match(/ width="([\d.]+)"/), h = svg.match(/ height="([\d.]+)"/);
  const attr = (name) => { const m = tag && tag[1].match(new RegExp('\\s' + name + '="([^"]+)"')); return m ? m[1] : null; };
  if (!tag || !attr('d') || (svg.match(/<path/g) || []).length !== 1 || !(box || (w && h))) throw new Error('icon file is not one path with a box: ' + file);
  const out = { viewBox: box ? box[1] : '0 0 ' + w[1] + ' ' + h[1], d: attr('d') };
  for (const [a, key] of [['transform', 'transform'], ['fill-rule', 'fillRule'], ['clip-rule', 'clipRule']]) if (attr(a)) out[key] = attr(a);
  return out;
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

const GENERATOR = 'plenix-icons';   // the mark in every index.json this tool writes: only such a folder is ever emptied

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
    const d = (x) => readDrawing(e.files[x]);
    const mod = { name: e.name, set, symbol: e.symbol, fillOutline: e.fillOutline, mirrored: e.mirrored,
      drawings: { 20: { outline: d(''), fill: d('-fill') }, 24: { outline: d('-24'), fill: d('-24-fill') } } };
    write(path.join(out, e.name + '.js'), '// GENERATED by platform/icons/layout.js from ' + source + ' (do not edit). Icon "' + e.name + '" of the ' + set +
      ' set (symbol ' + e.symbol + ').\nexport default ' + JSON.stringify(mod) + ';\n');
  }
  const aliases = {}; for (const e of entries) for (const a of e.aliases) if (!seen.has(a)) aliases[a] = e.name;
  write(path.join(out, 'index.json'), JSON.stringify({ generator: GENERATOR, set, source, count: entries.length,
    icons: entries.map((e) => ({ name: e.name, symbol: e.symbol, files: VARIANTS.map((x) => e.name + x + '.svg').concat(e.name + '.js') })), aliases }) + '\n');
  return { set, icons: entries.length, files: count, bytes };
}

const SOURCE = { plenix: 'platform/icons (map.json; Material Symbols Sharp, weight 300, and Plenix\'s own icons)', material: 'platform/icons/library (Material Symbols Sharp, weight 300)' };
const writeSet = (root, set, out) => writeIconSet(set, set === 'material' ? materialEntries(root) : plenixEntries(root), out, SOURCE[set]);

module.exports = { VARIANTS, MIRROR, readDrawing, plenixEntries, materialEntries, writeIconSet, writeSet };

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
