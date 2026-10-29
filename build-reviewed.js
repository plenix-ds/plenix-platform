// Plenix · build-reviewed.js: each Web item's "Last reviewed" date (STANDARD.md §7, owner 2026-10-21): the day its content
// last changed in the design system's history (git blame of its record in inventory.js or parts/*.records.js, and of its
// written docs in inventory-docs.js). Lines not committed yet count as today.
// Writes platform/design-system/reviewed.js (window.DSReviewed = { recordId: 'YYYY-MM-DD' }); spec.js shows it.
// Slow (it reads the history of every record file), so it is not part of build-app.js: run it before a release.
//   node build-reviewed.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');

module.exports = function buildReviewed(root) {
  const DS = path.join(root, 'platform', 'design-system');
  const out = path.join(DS, 'reviewed.js');
  if (!fs.existsSync(path.join(DS, 'spec.js'))) return { changed: false, count: 0 };
  // the records, as the spec loads them (the library parts first, then inventory.js)
  const ctx = { window: {}, React: { createElement: () => null } };
  ctx.window.React = ctx.React; ctx.window.Plenix = new Proxy({}, { get: (t, k) => k });
  vm.createContext(ctx);
  for (const f of ['spec-parts.js', 'inventory.js']) vm.runInContext(fs.readFileSync(path.join(DS, f), 'utf8'), ctx);
  let recs = ctx.window.DSInventory; if (typeof recs === 'function') recs = recs();
  recs = recs.filter((r) => !/^(ios|android)-/.test(r.sec));

  const today = new Date().toISOString().slice(0, 10);
  const blames = {};
  const blame = (rel) => {
    if (blames[rel]) return blames[rel];
    let txt;
    // a part file that is not in the design system's history yet (a new part, a lane just overlaid) has no blame: every line counts as today
    try { txt = execFileSync('git', ['-C', DS, 'blame', '-w', '--line-porcelain', '--', rel], { maxBuffer: 1 << 30, stdio: ['ignore', 'pipe', 'ignore'] }).toString(); }
    catch (e) { return (blames[rel] = fs.readFileSync(path.join(DS, rel), 'utf8').split('\n').map(() => null)); }
    const times = {}, lines = [];
    let sha = null;
    for (const l of txt.split('\n')) {
      const m = /^([0-9a-f]{40}) \d+ \d+/.exec(l);
      if (m) { sha = m[1]; continue; }
      if (l.startsWith('author-time ') && sha) times[sha] = +l.slice(12);
      else if (l.startsWith('\t')) lines.push(/^0+$/.test(sha) ? null : times[sha]);
    }
    return (blames[rel] = lines);
  };
  const files = ['inventory.js'].concat(fs.readdirSync(path.join(DS, 'parts')).filter((f) => f.endsWith('.records.js')).map((f) => 'parts/' + f));
  const text = {};
  const read = (rel) => (text[rel] = text[rel] || fs.readFileSync(path.join(DS, rel), 'utf8').split('\n'));
  // the line span of the object literal that opens on or above line i (strings stripped before counting braces)
  const span = (L, i) => {
    let s = i; while (s > 0 && L[s].indexOf('{') < 0) s--;
    let depth = 0, started = false;
    for (let k = s; k < L.length; k++) {
      for (const ch of L[k].replace(/'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`/g, '')) { if (ch === '{') { depth++; started = true; } else if (ch === '}') depth--; }
      if (started && depth <= 0) return [s, k];
    }
    return [s, s];
  };
  const find = (tests) => {
    for (const f of files) { const L = read(f); for (let i = 0; i < L.length; i++) if (tests(L[i])) return { file: f, range: span(L, i) }; }
    return null;
  };
  // written docs: inventory-docs.js ("id": {) and the library parts' docs (parts/*.docs.js, 'id': {)
  const docFiles = ['inventory-docs.js'].concat(fs.readdirSync(path.join(DS, 'parts')).filter((f) => f.endsWith('.docs.js')).map((f) => 'parts/' + f));
  const findDocs = (key) => {
    const needles = [JSON.stringify(key) + ':', "'" + key + "':", key + ':'];
    for (const file of docFiles) { const L = read(file); for (let i = 0; i < L.length; i++) { const t = L[i].trimStart(); if (needles.some((n) => t.startsWith(n) && /\{\s*$/.test(t))) return { file, range: span(L, i) }; } }
    return null;
  };
  const newest = (locs) => {
    let t = 0, open = false;
    for (const loc of locs.filter(Boolean)) { const B = blame(loc.file); for (let k = loc.range[0]; k <= loc.range[1]; k++) { if (B[k] === null) open = true; else if (B[k] > t) t = B[k]; } }
    return open ? today : t ? new Date(t * 1000).toISOString().slice(0, 10) : null;
  };
  const dates = {};
  for (const r of recs) {
    const idRe = new RegExp("\\bid\"?:\\s*['\"]" + r.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "['\"]");
    const sec = "sec: '" + r.sec + "'", leaf = "leaf: '" + String(r.leaf).replace(/'/g, "\\'") + "'";
    // a record written out (id: '…'), a thin record (its section and leaf), or one a helper makes (base('id', …))
    const callRe = new RegExp("\\(\\s*'" + r.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "'\\s*,");
    const rec = find((l) => idRe.test(l)) || find((l) => l.indexOf(sec) >= 0 && l.indexOf(leaf) >= 0) || find((l) => callRe.test(l));
    const d = newest([rec, findDocs(r.id)]);
    if (d) dates[r.id] = d;
  }
  const body = '/* Plenix design system · each Web item\'s Last reviewed date: the day its content last changed (its record and its\n'
    + '   written docs, from git). GENERATED by build-reviewed.js: run it, never edit this file. */\n'
    + 'window.DSReviewed = ' + JSON.stringify(dates) + ';\n';
  const changed = !fs.existsSync(out) || fs.readFileSync(out, 'utf8') !== body;
  if (changed) fs.writeFileSync(out, body);
  return { changed, count: Object.keys(dates).length, of: recs.length };
};

if (require.main === module) { const r = module.exports(__dirname); console.log('Wrote platform/design-system/reviewed.js (' + r.count + ' of ' + r.of + ' records dated' + (r.changed ? '' : ', unchanged') + ')'); }
