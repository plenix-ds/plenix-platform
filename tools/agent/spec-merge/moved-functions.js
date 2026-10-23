// The example functions the merge moves into a home: their free names (what they need from their file's scope).
const fs = require('fs');
const Babel = require('C:/Users/Administrator/Documents/Plenix/node_modules/@babel/standalone');
const { parser, traverse } = Babel.packages;
const S = process.argv[2];
const A = JSON.parse(fs.readFileSync(S + '/snap-nomerge.json')), B = JSON.parse(fs.readFileSync(S + '/snap-merge.json'));
const byA = Object.fromEntries(A.records.map((r) => [r.id, r]));
const fnsOf = (r) => { const out = []; (r.examples || []).forEach((g) => { if (typeof g[1] === 'string' && g[1].startsWith('fn:')) out.push(g[1]); else if (Array.isArray(g[1])) g[1].forEach((e) => { if (typeof e[1] === 'string' && e[1].startsWith('fn:')) out.push(e[1]); }); }); return out; };
const freeNames = (src) => {
  const ast = parser.parse('(' + src.slice(3) + ')', { sourceType: 'script', errorRecovery: true });
  const names = new Set();
  traverse.default(ast, { Program(path) { path.traverse({ ReferencedIdentifier(p) { if (!p.scope.hasBinding(p.node.name, true)) names.add(p.node.name); } }); } });
  return [...names].filter((n) => !['window', 'document', 'Object', 'Array', 'String', 'Math', 'Number', 'JSON', 'undefined', 'setTimeout', 'clearTimeout', 'Date', 'Promise', 'console', 'Boolean', 'parseInt', 'parseFloat', 'isNaN', 'Infinity', 'NaN', 'requestAnimationFrame'].includes(n));
};
let moved = 0; const need = {};
for (const r of B.records) {
  const a = byA[r.id]; if (!a) continue;
  const before = new Set(fnsOf(a));
  fnsOf(r).filter((f) => !before.has(f)).forEach((f) => { moved++; freeNames(f).forEach((n) => { need[n] = (need[n] || 0) + 1; }); });
}
console.log('moved example functions', moved);
console.log('free names they use', JSON.stringify(Object.entries(need).sort((x, y) => y[1] - x[1])));
