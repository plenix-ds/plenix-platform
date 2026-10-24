#!/usr/bin/env node
// Builds the icon inventory (platform/icons/inventory/): restyles every record that is not 'found' from the local
// library store, checks each file against the guidance, and writes the results back into inventory.json, plus
// inventory.js (the same data with the drawings, for the design spec's Icon inventory page).
//
//   node tools/icons/build-inventory.js [--store <dir>]
//
// Needs the store (tools/icons/fetch-libraries.js) only for records whose files are missing or whose source changed.
'use strict';
const fs = require('fs');
const path = require('path');
const { restyle } = require('./restyle-icon');
const { checkIcon } = require('./check-icon');

const ROOT = path.resolve(__dirname, '..', '..');
const INV = path.join(ROOT, 'platform/icons/inventory');
const catalog = JSON.parse(fs.readFileSync(path.join(INV, 'libraries.json'), 'utf8'));
const inv = JSON.parse(fs.readFileSync(path.join(INV, 'inventory.json'), 'utf8'));
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const STORE = path.resolve(arg('--store') || catalog.store);
const manifest = fs.existsSync(path.join(STORE, 'manifest.json')) ? JSON.parse(fs.readFileSync(path.join(STORE, 'manifest.json'), 'utf8')) : null;
const map = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/icons/map.json'), 'utf8')).map;
const libs = Object.fromEntries(catalog.libraries.map((l) => [l.id, l]));

const VARIANTS = [['', 20, 'outline20'], ['-fill', 20, 'filled20'], ['-24', 24, 'outline24'], ['-24-fill', 24, 'filled24']];
const dOf = (svg) => (svg.match(/\sd="([^"]+)"/) || [])[1] || '';

function sourceFile(lib, icon) {
  const L = libs[lib];
  if (!L || !L.sources) throw new Error(`library ${lib} is not in libraries.json`);
  for (const s of L.sources) {
    const folder = s.iconify || String(s.npm).replace(/[^a-z0-9._-]/gi, '_');
    const f = path.join(STORE, lib, folder, 'svg', icon + '.svg');
    if (fs.existsSync(f)) return { file: f, folder };
  }
  return null;
}

let built = 0, failed = 0;
for (const rec of inv.icons) {
  const L = libs[rec.library];
  rec.license = L ? L.license : 'unknown';
  if (L && L.status === 'attribution') rec.attribution = `Icons by ${L.name} (${L.license})`;
  const ver = manifest && manifest.libraries[rec.library] && manifest.libraries[rec.library].sources.find((s) => s.version);
  if (ver) rec.source = ver.source;
  if (rec.state === 'found') continue;
  const dir = path.join(INV, 'svg', rec.library);
  const base = path.join(dir, rec.icon);
  const src = sourceFile(rec.library, rec.icon);
  if (src) {
    const text = fs.readFileSync(src.file, 'utf8');
    const fillSrc = rec.fillFrom ? sourceFile(rec.library, rec.fillFrom) : null;
    const ref = path.join(path.dirname(src.file), 'circle.svg');
    const r = restyle(text, { fillText: fillSrc ? fs.readFileSync(fillSrc.file, 'utf8') : null, reference: fs.existsSync(ref) ? ref : null, shape: rec.shape });
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(base + '.found.svg', text);
    if (fillSrc) fs.writeFileSync(path.join(dir, rec.fillFrom + '.found.svg'), fs.readFileSync(fillSrc.file, 'utf8'));
    for (const [suffix, t] of Object.entries(r.files)) fs.writeFileSync(base + suffix + '.svg', t);
    rec.restyle = { 20: r.report[20], 24: r.report[24] };
    built++;
  } else if (!fs.existsSync(base + '.svg')) {
    console.log(`${rec.id}: no source in the store and no files (run tools/icons/fetch-libraries.js)`);
    failed++;
    continue;
  }
  rec.files = { found: path.relative(INV, base + '.found.svg').replace(/\\/g, '/') };
  rec.check = {};
  for (const [suffix, optical, key] of VARIANTS) {
    const f = base + suffix + '.svg';
    rec.files[key] = path.relative(INV, f).replace(/\\/g, '/');
    const c = checkIcon(fs.readFileSync(f, 'utf8'), { optical, filled: suffix.includes('fill'), strict: true });
    rec.check[key] = { pass: c.pass, fail: c.rules.filter((x) => x.result === 'fail').map((x) => x.id), warn: c.rules.filter((x) => x.result === 'warn').map((x) => x.id) };
  }
  const found = checkIcon(fs.readFileSync(base + '.found.svg', 'utf8'), { optical: 24 });
  rec.check.found = { pass: found.pass, fail: found.rules.filter((x) => x.result === 'fail').map((x) => x.id), warn: found.rules.filter((x) => x.result === 'warn').map((x) => x.id) };
  const bad = VARIANTS.filter(([, , k]) => !rec.check[k].pass);
  console.log(`${rec.id.padEnd(26)} ${bad.length ? 'FAIL ' + bad.map(([, , k]) => k + ':' + rec.check[k].fail.join('+')).join(' ') : 'PASS'}`);
  if (bad.length) failed++;
}
fs.writeFileSync(path.join(INV, 'inventory.json'), JSON.stringify(inv, null, 2) + '\n');

// inventory.js for the design spec: the records plus each file's drawing (path data), so the page needs no requests.
const data = {
  categories: inv.categories, gaps: inv.gaps,
  libraries: catalog.libraries.map((l) => ({ id: l.id, name: l.name, status: l.status, license: l.license, wraps: l.wraps || null, upstream: l.upstream || null, why: l.why || l.note || null, icons: manifest && manifest.libraries[l.id] ? manifest.libraries[l.id].icons : null, version: manifest && manifest.libraries[l.id] ? (manifest.libraries[l.id].sources.find((s) => s.version) || {}).version || null : null })),
  icons: inv.icons.map((r) => {
    const out = { ...r, drawings: {} };
    if (r.files) for (const [k, f] of Object.entries(r.files)) { const p = path.join(INV, f); if (fs.existsSync(p)) { const t = fs.readFileSync(p, 'utf8'); out.drawings[k] = k === 'found' ? t : dOf(t); } }
    // the working-set icon it would replace, as apps draw it today (read only)
    if (r.replaces) {
      const sym = String(map[r.replaces] || r.replaces).replace(/#fill$/, '');
      for (const [suffix, key] of [['', 'material20'], ['-fill', 'materialFilled20'], ['-24', 'material24'], ['-24-fill', 'materialFilled24']]) {
        const f = [path.join(ROOT, 'platform/icons', sym + suffix + '.svg'), path.join(ROOT, 'platform/icons/library', sym + suffix + '.svg')].find((x) => fs.existsSync(x));
        if (f) out.drawings[key] = dOf(fs.readFileSync(f, 'utf8'));
      }
    }
    return out;
  }),
};
const js = `/* GENERATED FILE — DO NOT EDIT. Written by tools/icons/build-inventory.js from platform/icons/inventory/inventory.json.\n   The icon inventory for the design spec: window.PlenixIconInventory. */\nwindow.PlenixIconInventory = ${JSON.stringify(data)};\n`;
fs.writeFileSync(path.join(INV, 'inventory.js'), js);
console.log(`Inventory: ${inv.icons.length} records, ${built} restyled now, ${failed} with a failing file; wrote inventory.json and inventory.js`);
process.exit(failed ? 1 : 0);
