// What the merge layer changes, record by record: fields that differ between the merged and the unmerged spec.
const fs = require('fs');
const S = process.argv[2];
const A = JSON.parse(fs.readFileSync(S + '/snap-nomerge.json')), B = JSON.parse(fs.readFileSync(S + '/snap-merge.json'));
const byA = Object.fromEntries(A.records.map((r) => [r.id, r])), byB = Object.fromEntries(B.records.map((r) => [r.id, r]));
const retired = A.records.filter((r) => !byB[r.id]).map((r) => r.id);
const fieldCount = {}, kinds = { examplesAdded: 0, variantPagesAdded: 0, labs: 0, extraLabs: 0, blocks: 0 };
const changed = [];
for (const r of B.records) {
  const a = byA[r.id]; if (!a) { changed.push(r.id + ' NEW'); continue; }
  const keys = new Set(Object.keys(a).concat(Object.keys(r)));
  const diff = [...keys].filter((k) => JSON.stringify(a[k]) !== JSON.stringify(r[k]));
  if (!diff.length) continue;
  diff.forEach((k) => { fieldCount[k] = (fieldCount[k] || 0) + 1; });
  const exA = (a.examples || []).length, exB = (r.examples || []).length;
  const vpA = (a.variantPages || []).length, vpB = (r.variantPages || []).length;
  changed.push(r.id + ': ' + diff.join(',') + (exB !== exA ? ' | examples ' + exA + '->' + exB : '') + (vpB !== vpA ? ' | variantPages ' + vpA + '->' + vpB : '') + (r.labId && r.labId !== a.labId ? ' | labId ' + r.labId : '') + (r.extraLabs ? ' | extraLabs ' + r.extraLabs.map((x) => x.id).join('+') : ''));
}
console.log('retired', retired.length, 'changed records', changed.length);
console.log('fields changed', JSON.stringify(fieldCount));
changed.forEach((c) => console.log('  ' + c.slice(0, 260)));
fs.writeFileSync(S + '/retired.json', JSON.stringify(retired));
