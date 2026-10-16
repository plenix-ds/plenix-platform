// Verify built CDN declarations, coverage failures and the independently decoded offline archive.
const fs = require('fs'), path = require('path'), assert = require('node:assert/strict'), crypto = require('crypto'), zlib = require('zlib');
const ROOT = path.resolve(__dirname, '..'), version = require('../package.json').version;
const cdn = path.join(ROOT, 'release/cdn', version), buildTypes = require('../build-types');
const types = fs.readFileSync(path.join(cdn, 'plenix.d.ts'), 'utf8');
assert.equal(types, fs.readFileSync(path.join(ROOT, 'packages/react/index.d.ts'), 'utf8'));
const names = buildTypes.checkCoverage(fs.readFileSync(path.join(ROOT, 'platform/index.js'), 'utf8'), types);
assert.ok(names.length > 500);
assert.throws(() => buildTypes.checkCoverage("export { Button } from './button.js';", ''), /missing declarations for Button/);
assert.throws(() => buildTypes.checkCoverage('export const Unhandled = 1;', types), /missing declarations for Unhandled/);
assert.throws(() => buildTypes.checkCoverage("export * from './button.js';", types), /unsupported public export/);
assert.throws(() => buildTypes.checkCoverage('export default function Example() {}', types), /unsupported public export/);
assert.deepEqual(buildTypes.checkCoverage("export { A as Alias } from './a.js';", 'export declare const Alias: any;'), ['Alias']);
const manifest = JSON.parse(fs.readFileSync(path.join(cdn, 'bundle-manifest.json')));
const entry = manifest.files.find(file => file.path === 'plenix.d.ts');
assert.ok(entry); assert.equal(entry.bytes, Buffer.byteLength(types));
assert.equal(entry.sha256, crypto.createHash('sha256').update(types).digest('hex'));
const index = JSON.parse(fs.readFileSync(path.join(cdn, 'index.json')));
assert.equal(index.files.types, 'plenix.d.ts');
assert.ok(fs.readFileSync(path.join(cdn, index.files.readme), 'utf8').includes('[plenix.d.ts](plenix.d.ts)'));
if (index.files.docs) assert.equal(JSON.parse(fs.readFileSync(path.join(cdn, index.files.docs))).types, '../plenix.d.ts');
const archive = zlib.gunzipSync(fs.readFileSync(path.join(cdn, index.files.bundle)));
let extracted;
for (let offset = 0; offset + 512 <= archive.length;) {
  const header = archive.subarray(offset, offset + 512), name = header.subarray(0, 100).toString().split('\0')[0];
  if (!name) break;
  const size = parseInt(header.subarray(124, 136).toString().replace(/\0/g, '').trim(), 8);
  if (name === 'plenix.d.ts') extracted = archive.subarray(offset + 512, offset + 512 + size).toString();
  offset += 512 + Math.ceil(size / 512) * 512;
}
assert.equal(extracted, types);
console.log('CDN_TYPES_OK ' + names.length + ' declarations, hashed manifest and archive bytes match; missing/unsupported exports rejected');
