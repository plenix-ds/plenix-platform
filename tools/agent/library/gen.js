// node gen.js  → plan.json, plan.md (and prints the checks)
const fs = require('fs');
const { T, EX } = require('./data.js');
const WV = require('./waves.js');
Object.values(T).forEach((t) => { if (!WV.W[t.name]) throw new Error('no wave for ' + t.name); t.wave = WV.W[t.name]; t.lane = null; });
Object.keys(WV.W).forEach((n) => { if (!T[n]) throw new Error('wave names unknown target ' + n); });
const ROWS = require('./leaves.js').trim().split('\n').map((l) => { const [sec, leaf, target, role, note] = l.split('|'); return { sec, leaf, target, role, note: note || '' }; });
const missing = JSON.parse(fs.readFileSync('C:/Users/AdminMan/AppData/Local/Temp/missing.json', 'utf8'));
const SECIDS = ['foundations', 'layout', 'content', 'actions', 'forms', 'navigation', 'data-display', 'feedback', 'overlays', 'patterns', 'page-structures', 'specialized', 'interaction', 'implementation'];
const SECNAME = {}; Object.keys(missing).forEach((k, i) => { SECNAME[SECIDS[i]] = k; });
const errors = [];
// 1. every missing leaf exactly once
const want = new Set(); Object.keys(missing).forEach((k, i) => missing[k].forEach((l) => want.add(SECIDS[i] + '|' + l)));
const have = new Map(); ROWS.forEach((r) => { const k = r.sec + '|' + r.leaf; if (have.has(k)) errors.push('twice: ' + k); have.set(k, r); });
want.forEach((k) => { if (!have.has(k)) errors.push('no row: ' + k); });
have.forEach((r, k) => { if (!want.has(k)) errors.push('not a missing leaf: ' + k); });
// 2. targets
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
function filesOf(t) {
  if (t.files) return t.files;
  const k = kebab(t.name);
  if (t.kind === 'component') return ['platform/components/' + t.name + '/' + t.name + '.jsx', 'platform/components/' + t.name + '/' + k + '.css', 'platform/tokens/components/' + k + '.tokens.json'];
  if (t.kind === 'pattern') return ['platform/patterns/' + t.name + '/' + t.name + '.jsx', 'platform/patterns/' + t.name + '/' + k + '.css', 'platform/tokens/components/' + k + '.tokens.json'];
  if (t.kind === 'template') return ['platform/templates/' + t.name + '/'];
  return [];
}
const primaryLeaf = {};
ROWS.forEach((r) => { if (r.target.startsWith('rec:')) return; if (!T[r.target]) errors.push('unknown target ' + r.target + ' for ' + r.leaf); else if (r.role === 'p') { if (primaryLeaf[r.target]) errors.push('two primaries for ' + r.target); primaryLeaf[r.target] = r.sec + '/' + r.leaf; } });
ROWS.forEach((r) => { if (!r.target.startsWith('rec:') && T[r.target] && !primaryLeaf[r.target]) { const f = ROWS.find((x) => x.target === r.target && x.role !== 'c'); if (f) primaryLeaf[r.target] = f.sec + '/' + f.leaf; } });
// lanes: targets sharing a file or depending on each other inside a wave go in one group; groups go to the lightest lane
const PTS = { S: 1, M: 2, L: 4 };
const leafCount = {}; ROWS.forEach((r) => { if (T[r.target]) leafCount[r.target] = (leafCount[r.target] || 0) + 1; });
const weight = (t) => PTS[t.size] + 0.5 * Math.max(0, (leafCount[t.name] || 1) - 1);
const waveNums = [...new Set(Object.values(T).map((t) => t.wave))].sort((a, b) => a - b);
const recRows = ROWS.filter((r) => r.target.startsWith('rec:'));
const LANELOAD = {};
waveNums.forEach((w) => {
  const ts = Object.values(T).filter((t) => t.wave === w); const par = {}; ts.forEach((t) => { par[t.name] = t.name; });
  const find = (x) => (par[x] === x ? x : (par[x] = find(par[x]))); const join = (a, b) => { par[find(a)] = find(b); };
  const fileOwner = {}; ts.forEach((t) => filesOf(t).forEach((f) => { const key = f.replace(/\/[^/]*$/, '/') === f ? f : f; if (fileOwner[f]) join(fileOwner[f], t.name); else fileOwner[f] = t.name; }));
  // a component folder is one unit too (two extends of one folder)
  const dirOwner = {}; ts.forEach((t) => filesOf(t).forEach((f) => { const d = f.replace(/[^/]*$/, ''); if (/^platform\/(components|patterns)\//.test(d)) { if (dirOwner[d]) join(dirOwner[d], t.name); else dirOwner[d] = t.name; } }));
  ts.forEach((t) => t.deps.forEach((d) => { if (T[d] && T[d].wave === w) join(d, t.name); }));
  const groups = {}; ts.forEach((t) => { (groups[find(t.name)] = groups[find(t.name)] || []).push(t); });
  const load = { A: 0, B: 0, C: 0 };
  Object.values(groups).sort((a, b) => b.reduce((s, t) => s + weight(t), 0) - a.reduce((s, t) => s + weight(t), 0)).forEach((g) => {
    const l = ['A', 'B', 'C'].sort((x, y) => load[x] - load[y])[0]; g.forEach((t) => { t.lane = l; }); load[l] += g.reduce((s, t) => s + weight(t), 0);
  });
  LANELOAD[w] = load;
});
const EXISTING = ['Icon', 'Toolbar', 'Dialog', 'Input', 'Menu', 'Tooltip', 'SecondaryPane', 'Sticky'];
// 3. dependency order: a dependency is built in an earlier wave, or earlier in the same lane of the same wave
Object.values(T).forEach((t) => t.deps.forEach((d) => {
  const u = T[d]; if (!u) { if (!EX[d] && !EXISTING.includes(d)) errors.push(t.name + ': unknown dep ' + d); return; }
  if (u.wave > t.wave) errors.push(t.name + ' (w' + t.wave + ') depends on ' + d + ' (w' + u.wave + ')');
  if (u.wave === t.wave && u.lane !== t.lane) errors.push(t.name + ' (w' + t.wave + t.lane + ') depends on ' + d + ' in lane ' + u.lane);
}));
// 4. leaves
const plan = ROWS.map((r) => {
  let wave, lane, t = null, kind, files, target = r.target;
  if (r.target.startsWith('rec:')) { const m = r.target.match(/^rec:([a-z-]+)@(\d+)([ABC])$/); wave = WV.REC[+m[2]]; const ld = LANELOAD[wave]; lane = ['A', 'B', 'C'].sort((x, y) => ld[x] - ld[y])[0]; ld[lane] += 0.5; target = 'existing record ' + m[1]; kind = 'extend'; files = []; }
  else { t = T[r.target]; wave = t.wave; lane = t.lane; kind = r.role === 'p' ? t.kind : (r.role === 'c' ? 'extend' : (t.kind === 'doc' || t.kind === 'foundation' || t.kind === 'package' ? t.kind : 'extend')); files = r.role === 'c' ? [] : filesOf(t); }
  if (t && t.kind === 'doc') kind = 'foundation';
  const deps = t ? t.deps.map((d) => primaryLeaf[d] || (T[d] ? d : d + ' (existing)')) : [];
  if (t && r.role !== 'p' && primaryLeaf[r.target] && primaryLeaf[r.target] !== r.sec + '/' + r.leaf) deps.unshift(primaryLeaf[r.target]);
  const lanePart = 'w' + String(wave).padStart(2, '0') + lane;
  const shared = ['platform/design-system/parts/' + lanePart + '.records.js', 'platform/design-system/parts/' + lanePart + '.labs.js', 'platform/design-system/parts/' + lanePart + '.docs.js', 'platform/standards/web-native-map.d/' + lanePart + '.json'];
  if (t && (t.kind === 'component' || t.kind === 'pattern' || t.kind === 'template' || t.kind === 'foundation' || t.kind === 'extend') && r.role !== 'c') shared.push('platform/exports/' + lanePart + '.js', 'platform/exports/' + lanePart + '.css');
  return { section: SECNAME[r.sec], recordOf: r.target.startsWith('rec:') ? r.target.slice(4).split('@')[0] : undefined, sec: r.sec, leaf: r.leaf, kind, role: { p: 'builds', v: 'variant', d: 'duplicate', c: 'covered-elsewhere' }[r.role],
    target: t ? t.name : target, targetKind: t ? t.kind : 'record', duplicateOf: r.role === 'd' ? primaryLeaf[r.target] : (r.role === 'c' ? r.note : undefined),
    notCode: /NOT CODE/.test(r.note) || undefined,
    files, laneFiles: shared, dependsOn: deps, size: r.role === 'p' ? (t ? t.size : 'S') : 'S', targetSize: t ? t.size : 'S',
    variants: t ? t.variants : [], note: [r.note, t && r.role === 'p' ? t.note : ''].filter(Boolean).join(' · '), wave, lane };
});
// 5. disjoint files per lane inside each wave
const W = {};
plan.forEach((p) => { const w = (W[p.wave] = W[p.wave] || { A: [], B: [], C: [], tA: new Set(), tB: new Set(), tC: new Set() }); w[p.lane].push(p); if (T[p.target]) w['t' + p.lane].add(p.target); });
Object.keys(W).forEach((w) => {
  const own = {}; ['A', 'B', 'C'].forEach((l) => W[w]['t' + l].forEach((tn) => filesOf(T[tn]).forEach((f) => { (own[f] = own[f] || new Set()).add(l); })));
  Object.entries(own).forEach(([f, s]) => { if (s.size > 1) errors.push('wave ' + w + ': ' + f + ' in lanes ' + [...s].join(',')); });
});
// counts
const byKind = {}; plan.forEach((p) => { byKind[p.kind] = (byKind[p.kind] || 0) + 1; });
const byRole = {}; plan.forEach((p) => { byRole[p.role] = (byRole[p.role] || 0) + 1; });
const waves = Object.keys(W).map(Number).sort((a, b) => a - b).map((w) => ({ wave: w, leaves: W[w].A.length + W[w].B.length + W[w].C.length, lanes: ['A', 'B', 'C'].map((l) => ({ lane: l, leaves: W[w][l].length, effort: LANELOAD[w] ? LANELOAD[w][l] : 0, targets: [...W[w]['t' + l]], records: W[w][l].filter((p) => !T[p.target]).map((p) => p.leaf) })) }));
console.log('rows', ROWS.length, 'targets', Object.keys(T).length, 'errors', errors.length); errors.forEach((e) => console.log('  ' + e));
console.log(byKind, byRole);
waves.forEach((w) => console.log('W' + w.wave, w.leaves, w.lanes.map((l) => l.lane + ':' + l.leaves + '/' + l.effort).join(' ')));
module.exports = { plan, waves, byKind, byRole, T, filesOf, errors, primaryLeaf };
if (require.main === module) fs.writeFileSync('plan-draft.json', JSON.stringify({ plan, waves }, null, 1));
