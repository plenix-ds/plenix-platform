/* Plenix tests · the baseline scan (issue 273): tools/baseline/scan.js on a pretend application.
   Summary: tests/fixtures/baseline-app loads Plenix 0.73.0 and breaks each baseline rule once; the scan:
     reads its pin (0.73.0) and lists only changelog notes newer than it
     finds `uniformPillWidths` (0.74.0 Upgrading: remove it) and `icons-all.css` (0.74.0 Removed), but not plenix.js or
       plenix-engines.js (notes that add, not take away)
     finds the bare icon class, the icons-all.css link, the unknown token --plx-sys-color-primary, the style={{ fontSize: 14 }}
       (the @plenix-ds/lint inline-style rule), the app stylesheet, its raw color and its .plx-fieldset__legend patch
     skips the copy of Plenix inside the app (vendor-copy/plenix.js)
     never changes a file of the app (each file's bytes are the same after the scan) and writes its report only where asked
   Proof first: before #273 there was no scan, so every line fails.
   Usage: node tests/baseline-scan-273.test.js   → BASELINE_SCAN_273_OK */
const assert = require('assert/strict'), fs = require('fs'), path = require('path'), os = require('os');
const APP = path.join(__dirname, 'fixtures', 'baseline-app');
const { scan, page } = require('../tools/baseline/scan.js');
const all = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? all(path.join(dir, e.name)) : [path.join(dir, e.name)]));
const before = Object.fromEntries(all(APP).map((f) => [f, fs.readFileSync(f).toString('base64')]));

const r = scan({ folder: APP, app: 'fixture', pin: null });
const of = (kind) => r.findings.filter((f) => f.kind === kind);
const files = (list) => [...new Set(list.map((f) => f.file))].sort();

assert.equal(r.pin, '0.73.0', 'the pin is read from the CDN addresses');
assert.ok(r.checklist.every((c) => c.version !== '0.73.0' && !/^0\.(7[0-2]|[0-6]\d)\./.test(c.version)), 'only notes newer than the pin');
const terms = of('changelog').map((f) => (/`([^`]+)`/.exec(f.what) || [])[1]);
assert.ok(terms.includes('uniformPillWidths'), 'the removed DataGrid prop is found: ' + JSON.stringify(terms));
assert.ok(terms.includes('icons-all.css'), 'the retired icons-all.css is found');
assert.ok(!terms.includes('plenix.js') && !terms.includes('plenix-engines.js'), 'notes that add something are not matched');
assert.ok(of('icons').some((f) => /bare icon class/.test(f.what) && f.file === 'index.html'), 'the bare icon class');
assert.ok(of('icons').some((f) => /icons-all\.css/.test(f.what)), 'the icons-all.css link');
assert.ok(of('tokens').some((f) => /--plx-sys-color-primary/.test(f.what) && f.file === 'app.jsx'), 'the unknown token');
assert.ok(of('own-css').some((f) => /inline-style/.test(f.what) && f.file === 'app.jsx'), 'the written style (the lint rule)');
assert.ok(of('own-css').some((f) => /app stylesheet/.test(f.what) && f.file === 'app.css'), 'the app stylesheet');
assert.ok(of('own-css').some((f) => /raw color #253442/.test(f.what)), 'its raw color');
assert.ok(of('patches').some((f) => /plx-fieldset__legend/.test(f.what)), 'the patch over a Plenix part');
assert.ok(!files(r.findings).some((f) => /vendor-copy/.test(f)), 'the copy of Plenix inside the app is skipped: ' + JSON.stringify(files(r.findings)));
assert.match(page(r), /^# fixture: \d+ things to change before it follows the newest Plenix/, 'the plain-words page');

// the scan never edits the app; the command writes its report only into --out
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'baseline-'));
require('child_process').execFileSync(process.execPath, [path.join(__dirname, '..', 'tools', 'baseline', 'scan.js'), APP, '--app', 'fixture', '--out', out]);
assert.deepEqual(fs.readdirSync(out).sort(), ['baseline-fixture.json', 'baseline-fixture.md'], 'the report files, in --out only');
for (const f of all(APP)) assert.equal(fs.readFileSync(f).toString('base64'), before[f], 'unchanged: ' + path.relative(APP, f));
assert.deepEqual(all(APP).sort(), Object.keys(before).sort(), 'no file added to the app');
fs.rmSync(out, { recursive: true, force: true });
console.log('BASELINE_SCAN_273_OK');
