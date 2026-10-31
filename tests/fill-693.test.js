// Plenix · tests/fill-693.test.js: the one shared fill() (platform/utils/fill.js) and the one TOP_LAYER (platform/utils/floating.js)
// (issue 693, audit finding #684). Node only, no browser.
//   node tests/fill-693.test.js   → FILL_693_OK
// The helper was copied into 44 files in four versions. They agreed on a text with every value given and differed on the rest:
//   an undefined value: 24 copies left the placeholder, 7 wrote the word "undefined"; a null value: 2 copies left the placeholder, the rest wrote "null";
//   a text that is not a string: 4 copies threw; a text with a placeholder twice: three one-purpose copies replaced only the first.
// The probe is proved able to see a failure first: the old copies that wrote "undefined" fail the undefined and null cases below, and
//   the old one-purpose copies fail the twice case; a copy that did not coerce its text fails the number case.
// Cases: a value is written; every occurrence is replaced; 0, false and the empty string are values (they are written); undefined and null leave the
//   placeholder (never the words "undefined" or "null"); a key the text does not name is ignored; a text that is not a string is read as text;
//   only word characters name a placeholder; the replacement text is taken as written (no $ pattern of String.replace); and then the source:
//   no file of the Platform defines a local fill() or a local TOP_LAYER (the check-system rule shared-fill), and floating.js exports TOP_LAYER.
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Babel = require('@babel/standalone');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');
const src = fs.readFileSync(path.join(ROOT, 'platform', 'utils', 'fill.js'), 'utf8');
const mod = { exports: {} };
new Function('exports', 'module', Babel.transform(src, { presets: ['env'], sourceType: 'module' }).code)(mod.exports, mod);
const { fill } = mod.exports;

let passed = 0, failed = 0;
const check = (name, fn) => { if (!shared.wanted(name)) return; try { fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
check('exports fill', () => assert.strictEqual(typeof fill, 'function'));
check('a value is written', () => assert.strictEqual(fill('Go to page {n}', { n: 3 }), 'Go to page 3'));
check('every occurrence is replaced', () => assert.strictEqual(fill('{a} and {a} and {b}', { a: 'x', b: 'y' }), 'x and x and y'));
check('0, false and the empty string are values', () => assert.strictEqual(fill('{a}|{b}|{c}', { a: 0, b: false, c: '' }), '0|false|'));
check('undefined leaves the placeholder', () => assert.strictEqual(fill('Hello {name}', { name: undefined }), 'Hello {name}'));
check('a missing key leaves the placeholder', () => assert.strictEqual(fill('Hello {name}', {}), 'Hello {name}'));
check('null leaves the placeholder', () => assert.strictEqual(fill('Hello {name}', { name: null }), 'Hello {name}'));
check('never the words undefined or null', () => assert.ok(!/undefined|null/.test(fill('{a} {b}', { a: undefined, b: null }))));
check('a key the text does not name is ignored', () => assert.strictEqual(fill('Hello', { name: 'x' }), 'Hello'));
check('a text that is not a string is read as text', () => { assert.strictEqual(fill(42, {}), '42'); assert.strictEqual(fill(undefined, {}), 'undefined'); });
check('only word characters name a placeholder', () => assert.strictEqual(fill('{a-b} {a b} {}', { 'a-b': 'x', 'a b': 'y' }), '{a-b} {a b} {}'));
check('the replacement is taken as written', () => assert.strictEqual(fill('{a}', { a: "$& $1 $'" }), "$& $1 $'"));
check('a number is written as the number', () => assert.strictEqual(fill('{n} of {total}', { n: 2, total: 5 }), '2 of 5'));

const floating = fs.readFileSync(path.join(ROOT, 'platform', 'utils', 'floating.js'), 'utf8');
check('floating.js exports TOP_LAYER', () => assert.ok(/export const TOP_LAYER\s*=\s*FLOATING_ANCHOR\b/.test(floating)));
check('no local fill or TOP_LAYER (the shared-fill rule)', () => {
  const found = [], files = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!/^(node_modules|\.git|release|Archived|dist|vendor)$/.test(e.name)) walk(p); } else files.push({ file: p }); } };
  walk(path.join(ROOT, 'platform'));
  require(path.join(ROOT, 'check-system.rules', 'shared-fill.js')).check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file) + ':' + line + ' ' + text) });
  assert.deepStrictEqual(found, []);
});
console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'FILL_693_OK (' + passed + ' checks)');
process.exit(failed ? 1 : 0);
