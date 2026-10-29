// Icon module path dedupe (#280) proof: every generated icon module exports exactly the same object as before; the sizes of
// platform.js (gzip) and of the icons folder, before and after. A proof script, not a test.
//   node dedupe-proof.mjs <icons folder before> <icons folder after> <platform.js before> <platform.js after>
// The folders are copied into a scratch folder marked "type": "module", so Node imports the generated modules as they are.
import fs from 'fs'; import path from 'path'; import zlib from 'zlib'; import os from 'os'; import assert from 'assert';
const [before, after, pBefore, pAfter] = process.argv.slice(2);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plx-dedupe-'));
const copy = (from, name) => { const to = path.join(tmp, name); fs.cpSync(from, to, { recursive: true }); fs.writeFileSync(path.join(to, 'package.json'), '{"type":"module"}'); return to; };
const A = copy(before, 'before'), B = copy(after, 'after');
const size = (dir) => { let raw = 0, gz = 0; for (const f of fs.readdirSync(dir, { recursive: true })) { const p = path.join(dir, f); if (fs.statSync(p).isFile() && !p.endsWith('package.json')) { const t = fs.readFileSync(p); raw += t.length; gz += zlib.gzipSync(t).length; } } return { raw, gzipPerFile: gz }; };
const out = { sets: {}, sizes: {} };
for (const set of fs.readdirSync(A).filter((s) => fs.statSync(path.join(A, s)).isDirectory())) {
  const files = fs.readdirSync(path.join(A, set)).filter((f) => f.endsWith('.js')).sort();
  let equal = 0, missing = 0; const differ = [];
  for (const f of files) {
    if (!fs.existsSync(path.join(B, set, f))) { missing++; continue; }
    const a = (await import(path.join(A, set, f))).default, b = (await import(path.join(B, set, f))).default;
    try { assert.deepStrictEqual(b, a); equal++; } catch (e) { differ.push(f); }
  }
  out.sets[set] = { modules: files.length, equal, differ, missing, filesAfter: fs.readdirSync(path.join(B, set)).filter((f) => f.endsWith('.js')).length };
  out.sizes[set] = { before: size(path.join(A, set)), after: size(path.join(B, set)) };
}
const gz = (f) => zlib.gzipSync(fs.readFileSync(f)).length;
out.sizes['platform.js'] = { before: { raw: fs.statSync(pBefore).size, gzip: gz(pBefore) }, after: { raw: fs.statSync(pAfter).size, gzip: gz(pAfter) } };
console.log(JSON.stringify(out, null, 1));
fs.rmSync(tmp, { recursive: true, force: true });
