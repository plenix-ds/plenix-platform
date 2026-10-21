// Counts the design spec's hand-written text (the numbers in proposal.md).
//   node docs/briefs/spec-wording/count-spec-text.js
// Reads the built items' written sections: inventory.js, inventory-docs.js (window.DSDocs) and spec-parts.js (the
// parts/*.docs.js write-ups). inventory-guidance.js (items not built yet) is loaded but left out of the counts.
const vm = require('vm'), fs = require('fs'), path = require('path');
const D = path.join(__dirname, '../../../platform/design-system/');
const P = new Proxy({}, { get: () => function () {} });
const ctx = { console, React: { createElement: () => null, useState: () => [] }, Plenix: P };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['inventory.js', 'inventory-docs.js', 'inventory-guidance.js', 'spec-parts.js']) {
  try { vm.runInContext(fs.readFileSync(D + f, 'utf8'), ctx, { filename: f }); } catch (e) { console.log('could not load ' + f + ': ' + e.message.slice(0, 100)); }
}
const all = [];
const walk = (x) => { if (typeof x === 'string') all.push(x); else if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') for (const k in x) walk(x[k]); };
walk(ctx.DSDocs); walk(ctx.DSParts && ctx.DSParts.docs); walk(ctx.DSInventory);
// a piece of text: longer than 25 characters and more than one word (names, ids and class names are left out)
const texts = all.filter((s) => s.length > 25 && /\s/.test(s));
const words = (s) => s.split(/\s+/).filter(Boolean).length;
const empty = texts.filter((s) => /^Not applicable|^None[:.]|^Not focusable/.test(s));
const owner = texts.filter((s) => /\(owner,? 20\d\d/.test(s));
const seen = {}; for (const s of texts) { const k = s.trim(); seen[k] = (seen[k] || 0) + 1; }
const repeated = Object.entries(seen).filter(([, n]) => n > 2).sort((a, b) => b[1] - a[1]);
console.log('hand-written texts: ' + texts.length + ', ' + texts.reduce((a, s) => a + words(s), 0) + ' words');
console.log('"Not applicable" / "None" / "Not focusable" entries: ' + empty.length + ', ' + empty.reduce((a, s) => a + words(s), 0) + ' words');
console.log('entries with an (owner, date) note: ' + owner.length);
console.log('identical texts used 3 or more times: ' + repeated.length + ', ' + repeated.reduce((a, [, n]) => a + n - 1, 0) + ' extra copies');
for (const [s, n] of repeated.slice(0, 10)) console.log('  x' + n + '  ' + s.slice(0, 110));
console.log('entries over 45 words: ' + texts.filter((s) => words(s) > 45).length);
