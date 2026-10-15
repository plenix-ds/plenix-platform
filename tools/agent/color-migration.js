// node tools/agent/color-migration.js <plan.md> [--apply]
// The palette consolidation of 2026-10-15 (owner; plan "plenix-color-consolidation-plan.md"): one reference palette of
// conventional families and numeric shades. Reads the plan's "Complete migration log" (old token -> destination token
// and hex) and "Canonical palette", then, with --apply:
//   1. adds every canonical destination missing from platform/tokens/reference.tokens.json, with the plan's exact hex;
//   2. turns each retired reference token into a deprecated alias of its destination ({plx-ref.color-…}), kept for one
//      release so outside users keep resolving (removed once nothing references them);
//   3. points every theme role that referenced a retired token at its destination (by token identity, never by hex).
// Without --apply it prints the plan and every check, and changes nothing.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../..');
const plan = fs.readFileSync(process.argv[2], 'utf8'), APPLY = process.argv.includes('--apply');
const strip = (t) => t.replace(/`/g, '').replace(/^--plx-ref-color-/, '').trim();
// canonical palette
const canon = {};
const ci = plan.indexOf('## Canonical palette'), mi = plan.indexOf('## Complete migration log');
for (const line of plan.slice(ci, mi).split('\n')) { const m = /^\| `--plx-ref-color-([a-z0-9-]+)` \| `(#[0-9a-f]{6})` \|$/.exec(line.trim()); if (m) canon[m[1]] = m[2]; }
// migration log
const moves = [];
for (const line of plan.slice(mi).split('\n')) {
  const c = line.split('|').map((x) => x.trim()); if (c.length < 7 || !/^`--plx-ref-color-/.test(c[1])) continue;
  moves.push({ old: strip(c[1]), oldHex: c[2].replace(/`/g, ''), dest: strip(c[3]), destHex: c[4].replace(/`/g, ''), op: c[5] });
}
const errors = [];
for (const m of moves) {
  if (!canon[m.dest]) errors.push('destination not in the canonical palette: ' + m.dest);
  else if (canon[m.dest] !== m.destHex) errors.push('destination hex differs: ' + m.dest + ' ' + m.destHex + ' vs ' + canon[m.dest]);
}
const refFile = path.join(ROOT, 'platform/tokens/reference.tokens.json');
const refSrc = fs.readFileSync(refFile, 'utf8'), ref = JSON.parse(refSrc);
const holder = (o) => { if (o && typeof o === 'object') { if (o['color-gray-100']) return o; for (const k of Object.keys(o)) { const h = holder(o[k]); if (h) return h; } } return null; };
const R = holder(ref);
for (const m of moves) {
  const t = R['color-' + m.old]; if (!t) { errors.push('old token not in the source: ' + m.old); continue; }
  if (String(t.$value).toLowerCase() !== m.oldHex) errors.push('old hex differs in the source: ' + m.old + ' ' + t.$value + ' vs plan ' + m.oldHex);
}
// existing canonical values must already match (the plan never recalculates a kept value)
for (const [k, v] of Object.entries(canon)) { const t = R['color-' + k]; if (t && String(t.$value).toLowerCase() !== v) errors.push('kept value differs: ' + k + ' ' + t.$value + ' vs ' + v); }
const retired = moves.filter((m) => m.old !== m.dest);
const added = Object.keys(canon).filter((k) => !R['color-' + k]);
console.log('canonical', Object.keys(canon).length, '| log rows', moves.length, '| retired', retired.length, '| new destinations', added.length + ': ' + added.join(', '));
if (errors.length) { console.log('ERRORS\n' + errors.join('\n')); process.exit(1); }
// theme references
const themes = ['platform/tokens/theme-default.light.tokens.json', 'platform/tokens/theme-default.dark.tokens.json'];
const MAP = Object.fromEntries(retired.map((m) => ['{plx-ref.color-' + m.old + '}', '{plx-ref.color-' + m.dest + '}']));
let refs = 0; const report = [];
const docs = themes.map((f) => { const s = fs.readFileSync(path.join(ROOT, f), 'utf8'); return { f, s, j: JSON.parse(s) }; });
for (const d of docs) {
  const walk = (o, p) => { for (const k in o) { const v = o[k]; if (v && typeof v === 'object' && '$value' in v) { if (typeof v.$value === 'string') { let nv = v.$value; for (const [a, b] of Object.entries(MAP)) nv = nv.split(a).join(b); if (nv !== v.$value) { refs++; report.push(d.f.split('/').pop() + '  ' + k + ': ' + v.$value + ' -> ' + nv); v.$value = nv; } } } else if (v && typeof v === 'object') walk(v, p + k + '.'); } };
  walk(d.j, '');
}
console.log('theme references to move:', refs);
if (!APPLY) { console.log(report.slice(0, 12).join('\n') + (report.length > 12 ? '\n…' : '')); console.log('dry run: nothing written (add --apply)'); process.exit(0); }
// 1. new destinations, placed after their family's neighbors
const order = Object.keys(R);
for (const k of added) R['color-' + k] = { $value: canon[k], $type: 'color', $description: 'Canonical palette (owner, 2026-10-15, the palette consolidation).' };
// 2. retired tokens become deprecated aliases
for (const m of retired) R['color-' + m.old] = { $value: '{plx-ref.color-' + m.dest + '}', $type: 'color', $deprecated: 'Retired 2026-10-15 (palette consolidation): use --plx-ref-color-' + m.dest + '.', $description: 'Deprecated alias of ' + m.dest + ' (was ' + m.oldHex + '; ' + m.op.replace(/_/g, ' ') + ').' };
// keep the file grouped: canonical families in the plan's order, then the deprecated aliases
const out = {}, canonKeys = Object.keys(canon).map((k) => 'color-' + k);
for (const k of order) if (!retired.some((m) => 'color-' + m.old === k) && !canonKeys.includes(k)) out[k] = R[k];   // anything else (alphas)
for (const k of canonKeys) out[k] = R[k];
for (const m of retired) out['color-' + m.old] = R['color-' + m.old];
for (const k of Object.keys(R)) delete R[k]; Object.assign(R, out);
fs.writeFileSync(refFile, JSON.stringify(ref, null, 2) + (refSrc.endsWith('\n') ? '\n' : ''));
// 3. theme roles
for (const d of docs) fs.writeFileSync(path.join(ROOT, d.f), JSON.stringify(d.j, null, 2) + (d.s.endsWith('\n') ? '\n' : ''));
fs.writeFileSync(path.join(ROOT, 'tools/agent/color-migration.report.txt'), report.join('\n') + '\n');
console.log('applied: ' + added.length + ' added, ' + retired.length + ' aliased, ' + refs + ' theme references moved (report: tools/agent/color-migration.report.txt)');
