// Plenix · a site's icon file (#553, stage 5 of #280). Build-time only (Node); no page loads this file.
// A site that loads Plenix from the CDN (plenix.js, window.Plenix) registers the icons its pages draw by name, so they
// draw from their own modules and never from the stylesheet. Two choices (platform/icons/README.md):
//   plenix-icons-<site>.js    exactly the icons the site uses, written by this tool from the site's source (recommended
//                             for production)
//   plenix-icons-plenix.js    every Plenix icon (the compatibility file): written by node build-app.js into
//                             platform/dist/, and by build-packages.js beside plenix.js on the CDN
// Both are classic scripts loaded after plenix.js. They call Plenix.registerIcons(...modules) once: each drawing is data
// (a path, a viewBox), checked by the Icon component's allow-list (#285) and drawn as React props, never inserted as HTML.
// They load nothing else, so they work offline and from file://. <Icon name> keeps working without them (until 5c).
//
//   node tools/icons/site-icons.js <site> <folder or file> [<folder or file> …] [--out <folder>] [--allow-unknown]
//     <site>: the file's name (plenix-icons-<site>.js): lowercase letters, digits and dashes
//     reads .js, .jsx, .mjs, .html and .htm (folders recursively; node_modules, dist, vendor and dot folders skipped)
//     --out: where to write it (default: the current folder)
//     --allow-unknown: write the file even when a name is unknown or built at run time (reported either way)
//   Exit codes: 0 written, 1 unknown or run-time names (nothing written), 2 usage or a file that cannot be read.
//
// What counts as a use (one per name):
//   - an icon slot, read with Babel by platform/icons/uses.js (the Platform's own rule): <Icon name="…">, icon="…",
//     { icon: '…' }, h(Plenix.Icon, { name: '…' }), a constant whose name ends in Icon or Icons, a parameter's default;
//     a page's inline <script> is read the same way
//   - an imported module: plenix-platform/icons/<set>/<name> or /cdn/<version>/icons/<set>/<name>.js
//   - a bare class name: plx-icon--<name> (drawn by the stylesheet today; registered so the file is complete for 5c)
// A name built at run time ('size-' + s) cannot be read: list the names it can take in a comment on its line, as the
// Platform does:   /* plx-icons: density-large density-medium density-small */
// A name resolves as <Icon name> does: a Plenix name (dashes, or its symbol's underscore spelling), else a Material
// Symbols name from the library (platform/icons/library); anything else is unknown.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const layout = require(path.join(ROOT, 'platform/icons/layout.js'));
const uses = require(path.join(ROOT, 'platform/icons/uses.js'));

const HEADER = 'GENERATED FILE — DO NOT EDIT';
const COMPAT = 'platform/dist/plenix-icons-plenix.js';
const SCRIPT = /\.(jsx?|mjs)$/i, PAGE = /\.html?$/i;
const SKIP = /^(node_modules|dist|vendor|\..*)$/;
const IMPORT = /(?:plenix-platform|\/cdn\/[^/'"\s]+)\/icons\/(plenix|material)\/([a-z0-9_-]+)(?:\.js)?['"]/g;
const CLASS = /\bplx-icon--([a-z0-9][a-z0-9_-]*)/g;
// not icon names: the Icon component's modifiers (sizes, fill, layout)
const MODIFIERS = /^(size-(xs|sm|md|lg|xl)|filled|outline|inline|mirrored)$/;

// every source file under the inputs, in name order
function sourceFiles(inputs) {
  const out = [];
  const walk = (p) => {
    const st = fs.statSync(p);
    if (st.isDirectory()) { for (const e of fs.readdirSync(p).sort()) if (!SKIP.test(e)) walk(path.join(p, e)); return; }
    if (SCRIPT.test(p) || PAGE.test(p)) out.push(p);
  };
  for (const i of inputs) walk(path.resolve(i));
  return out;
}

// a page's inline scripts (no src, a JavaScript type), each padded to its line in the page so file:line stays true
function inlineScripts(html) {
  const out = [], re = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
  let m;
  while ((m = re.exec(html))) {
    const attrs = m[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    const type = (attrs.match(/\btype\s*=\s*["']?([^"'\s>]+)/i) || [])[1];
    if (type && !/^(module|text\/javascript|application\/javascript|text\/babel|text\/jsx)$/i.test(type)) continue;
    const before = html.slice(0, m.index + m[0].indexOf('>') + 1).split('\n').length - 1;
    out.push('\n'.repeat(before) + m[2]);
  }
  return out;
}

// the names a site uses: { names: Map<name, Set<file:line>>, unresolved: [file:line …], unreadable: [file: reason …] }
function collect(inputs, base) {
  const names = new Map(), unresolved = [], unreadable = [];
  const add = (nm, at) => { if (!names.has(nm)) names.set(nm, new Set()); names.get(nm).add(at); };
  const report = { name(nm, at) { add(nm, at); }, unresolved(at) { unresolved.push(at); } };
  const lineAt = (text, i) => text.slice(0, i).split('\n').length;
  for (const f of sourceFiles(inputs)) {
    const rel = path.relative(base, f).split(path.sep).join('/'), text = fs.readFileSync(f, 'utf8');
    const bodies = PAGE.test(f) ? inlineScripts(text) : [text];
    for (const body of bodies) {
      try { uses.scanText(body, rel, report); } catch (e) { unreadable.push(rel + ': ' + String(e.message || e).split('\n')[0]); }
    }
    let m;
    IMPORT.lastIndex = 0; while ((m = IMPORT.exec(text))) add((m[1] === 'material' ? 'material:' : '') + m[2], rel + ':' + lineAt(text, m.index));
    CLASS.lastIndex = 0; while ((m = CLASS.exec(text))) if (!MODIFIERS.test(m[1])) add(m[1], rel + ':' + lineAt(text, m.index));
  }
  return { names, unresolved, unreadable };
}

// a name -> the icon it draws, as <Icon name> resolves it: { set, entry } or null
function resolver(root) {
  const plenix = new Map();
  for (const e of layout.plenixEntries(root)) { plenix.set(e.name, e); plenix.set(e.symbol, plenix.get(e.symbol) || e); for (const a of e.aliases) plenix.set(a, e); }
  let lib = null;
  const materialOf = (n) => {
    if (!lib) { lib = new Map(); for (const e of layout.materialEntries(root)) { lib.set(e.name, e); lib.set(e.symbol, e); } }
    return lib.get(n) || lib.get(n.replace(/_/g, '-')) || lib.get(n.replace(/-/g, '_')) || null;
  };
  return (raw) => {
    const forced = raw.startsWith('material:'), n = (forced ? raw.slice(9) : raw).trim();
    if (!forced) {
      const p = plenix.get(n) || plenix.get(n.toLowerCase().replace(/_/g, '-')) || plenix.get(n.toLowerCase().replace(/-/g, '_'));
      if (p) return { set: 'plenix', entry: p };
    }
    const m = materialOf(n.toLowerCase());
    if (m) return { set: 'material', entry: m };
    return null;
  };
}

// the classic script that registers the modules: a path used more than once is written once, as a shared constant
function fileText(site, modules, source) {
  const count = new Map();
  for (const m of modules) for (const size of [20, 24]) for (const k of ['outline', 'fill']) { const d = m.drawings[size][k].d; count.set(d, (count.get(d) || 0) + 1); }
  const shared = [...count.keys()].filter((d) => count.get(d) > 1), index = new Map(shared.map((d, i) => [d, i]));
  const mark = (i) => '@@plx-path-' + i + '@@';
  const lines = modules.map((m) => {
    const copy = JSON.parse(JSON.stringify(m));
    for (const size of [20, 24]) for (const k of ['outline', 'fill']) { const i = index.get(copy.drawings[size][k].d); if (i !== undefined) copy.drawings[size][k].d = mark(i); }
    let body = JSON.stringify(copy);
    body = body.replace(/"@@plx-path-(\d+)@@"/g, (x, i) => 'p[' + i + ']');
    return '    ' + body;
  });
  const sets = [...new Set(modules.map((m) => m.set))].sort();
  return '/*\n * ' + HEADER + '\n * Plenix icons for ' + site + ': ' + modules.length + ' icon' + (modules.length === 1 ? '' : 's') + ' (' + sets.join(', ') + '), registered with Plenix.registerIcons.\n' +
    ' * Source: ' + source + '\n * Build: ' + (site === 'plenix' ? 'node build-app.js (tools/icons/site-icons.js)' : 'node tools/icons/site-icons.js ' + site + ' <the site\'s source>') + '\n' +
    ' * Load it after plenix.js. The drawings are data (paths), checked by the Icon component before they are drawn.\n */\n' +
    '(function () {\n  \'use strict\';\n' +
    '  var P = typeof window !== \'undefined\' ? window.Plenix : undefined;\n' +
    '  if (!P || typeof P.registerIcons !== \'function\') { if (typeof console !== \'undefined\') console.warn(\'[Plenix] plenix-icons-' + site + '.js: load it after plenix.js (window.Plenix.registerIcons is missing); no icon was registered\'); return; }\n' +
    '  var p = ' + JSON.stringify(shared) + ';\n' +
    '  P.registerIcons([\n' + lines.join(',\n') + '\n  ]);\n})();\n';
}

// a site's file from its source: { text, icons, unknown: [at "name"], unresolved, unreadable, found }
function siteFile(root, site, inputs, base) {
  const { names, unresolved, unreadable } = collect(inputs, base || process.cwd());
  const resolve = resolver(root), chosen = new Map(), unknown = [];
  for (const [raw, at] of [...names.entries()].sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const r = resolve(raw);
    if (!r) { unknown.push([...at][0] + ' ' + JSON.stringify(raw.replace(/^material:/, ''))); continue; }
    chosen.set(r.set + ':' + r.entry.name, r);
  }
  const modules = [...chosen.values()].sort((a, b) => (a.set + a.entry.name < b.set + b.entry.name ? -1 : 1)).map((r) => layout.moduleObject(r.set, r.entry));
  const source = 'the source of ' + site + ' (' + inputs.length + ' input' + (inputs.length === 1 ? '' : 's') + ')';
  return { text: fileText(site, modules, source), icons: modules.length, unknown, unresolved, unreadable, found: names.size };
}

// the compatibility file: every Plenix icon (map.json), written into platform/dist/ by build-app.js; check: compare only
function buildCompat(root, opts = {}) {
  const modules = layout.plenixEntries(root).map((e) => layout.moduleObject('plenix', e));
  const text = fileText('plenix', modules, layout.SOURCE.plenix + ': every Plenix icon');
  const file = path.join(root, COMPAT), now = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  const stale = now === text ? [] : [COMPAT];
  if (!opts.check && stale.length) { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); }
  return { file: COMPAT, icons: modules.length, bytes: Buffer.byteLength(text), stale, changed: !!stale.length };
}

module.exports = { collect, siteFile, buildCompat, fileText, inlineScripts, COMPAT, HEADER };

if (require.main === module) {
  const args = process.argv.slice(2), flags = new Set(args.filter((a) => a === '--allow-unknown'));
  const outAt = args.indexOf('--out'), out = outAt >= 0 ? args[outAt + 1] : '.';
  const rest = args.filter((a, i) => a !== '--allow-unknown' && i !== outAt && i !== outAt + 1);
  const [site, ...inputs] = rest;
  if (!site || !/^[a-z0-9][a-z0-9-]*$/.test(site) || !inputs.length) {
    console.error('usage: node tools/icons/site-icons.js <site> <folder or file> […] [--out <folder>] [--allow-unknown]\n  <site>: lowercase letters, digits and dashes');
    process.exit(2);
  }
  if (site === 'plenix') { console.error('"plenix" is the compatibility file\'s name (every Plenix icon; node build-app.js writes it): choose your site\'s own name'); process.exit(2); }
  for (const i of inputs) if (!fs.existsSync(i)) { console.error('not found: ' + i); process.exit(2); }
  const r = siteFile(ROOT, site, inputs, process.cwd());
  for (const u of r.unreadable) console.error('cannot read ' + u);
  for (const u of r.unknown) console.error('unknown icon name: ' + u);
  for (const u of r.unresolved) console.error('name built at run time: ' + u + ' (list its names in a /* plx-icons: … */ comment on its line)');
  if (r.unreadable.length) process.exit(2);
  if ((r.unknown.length || r.unresolved.length) && !flags.has('--allow-unknown')) {
    console.error('Nothing written: ' + r.unknown.length + ' unknown and ' + r.unresolved.length + ' run-time name' + (r.unresolved.length === 1 ? '' : 's') + ' (fix them, or pass --allow-unknown to write the file without them)');
    process.exit(1);
  }
  const file = path.join(out, 'plenix-icons-' + site + '.js');
  fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(file, r.text);
  console.log('Wrote ' + file + ': ' + r.icons + ' icon' + (r.icons === 1 ? '' : 's') + ' (' + Math.round(Buffer.byteLength(r.text) / 1024) + ' KB)' +
    (r.unknown.length || r.unresolved.length ? '; left out ' + r.unknown.length + ' unknown and ' + r.unresolved.length + ' run-time' : ''));
}
