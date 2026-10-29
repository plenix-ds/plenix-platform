// Plenix tests · icon safety (#285, stage 4 of the icon plan #277): an icon file or an icon module's drawing is
// untrusted, and platform/utils/iconSafety.js reads it through an allow-list. Node only (no browser): it loads the module
// as the formats test loads utils/format.js. Each hostile sample must be refused, every shipped icon file must pass and
// read as the build reads it, and the limits must hold. Prints ICON_SAFETY_OK or each failure, and exits 1 on a failure.
//   node tests/icon-safety.test.js
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const Babel = require('@babel/standalone');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');
const code = Babel.transform(fs.readFileSync(path.join(ROOT, 'platform', 'utils', 'iconSafety.js'), 'utf8'), { sourceType: 'module', plugins: ['transform-modules-commonjs'] }).code;
const mod = { exports: {} };
new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
const S = mod.exports;

let failed = 0, passed = 0;
const check = (name, fn) => { if (!shared.wanted(name)) return; try { fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
const refused = (text, why) => { const r = S.checkIconSvg(text); assert.ok(!r.ok, 'accepted: ' + String(text).slice(0, 120)); if (why) assert.ok(why.test(r.reason), 'the reason "' + r.reason + '" does not say ' + why); };

// a real file's shape (Material Symbols Sharp), and hostile variants of it
const OK = '<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M80-80v-800h800v800H80Z"/></svg>';
const PATH = '<path d="M80-80v-800h800v800H80Z"/>';
const swap = (from, to) => OK.replace(from, to);

check('IconSafety: a file in the shipped shape passes, with its drawing #285', () => {
  const r = S.checkIconSvg(OK);
  assert.ok(r.ok, r.reason);
  assert.deepStrictEqual(r.drawing, { viewBox: '0 -960 960 960', d: 'M80-80v-800h800v800H80Z' });
});
check('IconSafety: a script element is refused #285', () => refused(swap('<path', '<script>alert(1)</script><path'), /script/));
check('IconSafety: event attributes are refused (onload, onclick) #285', () => {
  refused(swap('<svg ', '<svg onload="alert(1)" '), /onload/);
  refused(swap('<path ', '<path onclick="alert(1)" '), /onclick/);
});
check('IconSafety: a javascript: URL is refused (a link, href, xlink:href) #285', () => {
  refused(swap('<path ', '<a href="javascript:alert(1)"><path ').replace('</svg>', '</a></svg>'), /element a/);
  refused(swap('<path ', '<path href="javascript:alert(1)" '), /href/);
  refused(swap('<path ', '<path xlink:href="javascript:alert(1)" '), /xlink:href/);
});
check('IconSafety: <use href> is refused, local and external #285', () => {
  refused(swap(PATH, '<use href="#x"/>'), /use/);
  refused(swap(PATH, '<use href="other.svg#x"/>'), /use/);
});
check('IconSafety: style with url() is refused (an element and an attribute) #285', () => {
  refused(swap('<path', '<style>path{fill:url(https://evil/x)}</style><path'), /style/);
  refused(swap('<path ', '<path style="fill:url(https://evil/x)" '), /style/);
});
check('IconSafety: foreignObject, image, g and other elements are refused #285', () => {
  refused(swap('<path', '<foreignObject><div>x</div></foreignObject><path'), /foreignObject/);
  refused(swap(PATH, '<image href="https://evil/x.png"/>'), /image/);
  refused(swap(PATH, '<g>' + PATH + '</g>'), /element g/);
  refused(swap(PATH, '<animate attributeName="d" to="M0 0"/>' + PATH), /animate/);
});
check('IconSafety: doctypes, entities, CDATA, comments and processing instructions are refused #285', () => {
  refused('<!DOCTYPE svg [<!ENTITY x "y">]>' + OK, /doctype/);
  refused(swap('M80', '&#77;80'), /entity/);
  refused(swap('<path', '<!-- <script>alert(1)</script> --><path'));
  refused(swap('<path', '<![CDATA[x]]><path'));
  refused(swap('<path', '<?evil x?><path'), /processing instruction/);
});
check('IconSafety: values outside their grammar are refused (d, transform, viewBox, xmlns, fill) #285', () => {
  refused(swap('M80-80v-800h800v800H80Z', 'M0 0 url(#x)'), /path data/);
  refused(swap('<path ', '<path transform="url(#x)" '), /transform/);
  refused(swap('0 -960 960 960', '0 0 expression 960'), /viewBox/);
  refused(swap('0 -960 960 960', '0 0 0 960'), /positive/);
  refused(swap('http://www.w3.org/2000/svg', 'http://evil/ns'), /namespace/);
  refused(swap('<path ', '<path fill="url(#x)" '), /fill/);
});
check('IconSafety: the shape is one svg holding one path (a second drawing, text, no path) #285', () => {
  refused(OK.replace('</svg>', '<path d="M0 0h1"/></svg>'), /more than one drawing/);
  refused(OK.replace('</svg>', 'hello</svg>'), /text or markup/);
  refused('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"></svg>', /no path/);
  refused(swap('height="20"', 'height=20'), /name="value"/);
  refused(swap('<path ', '<path d="M0 0h9" '), /twice/);
  refused(null, /not text/);
});
check('IconSafety: basic shapes are refused with a clear reason (negative radius, missing attributes, a huge points list) #285', () => {
  refused(swap(PATH, '<circle cx="10" cy="10" r="5"/>'), /basic shape/);
  refused(swap(PATH, '<circle cx="10" cy="10" r="-5"/>'), /basic shape/);
  refused(swap(PATH, '<rect/>'), /basic shape/);
  refused(swap(PATH, '<polygon points="' + '1,2 '.repeat(2000) + '"/>'), /basic shape/);
});
check('IconSafety: a file over the size limit or a path over the length limit is refused before it is read #285', () => {
  refused(swap('M80-80v-800h800v800H80Z', 'M0 0' + ' L1 1'.repeat(8000)), /larger than/);
  refused(swap('M80-80v-800h800v800H80Z', 'M0 0' + 'h1'.repeat(9000)), /longer than/);
  assert.ok(S.ICON_LIMITS.file >= 32768 && S.ICON_LIMITS.d >= 16384, 'the limits shrank below the shipped files\' room');
  assert.ok(S.ICON_LIMITS.viewBox <= 100 && S.ICON_LIMITS.transform <= 500 && S.ICON_LIMITS.size <= 32, 'a value limit grew past what a pattern should read');
});
// cost (QA on #519): every value is measured before a pattern reads it, and the patterns read a number one way only, so a
// long hostile value is refused at once; each case must finish well inside the bound, or the check fails
check('IconSafety: a refusal reason quotes a name from the file at most 40 characters long (an element, an attribute, a drawing field) #519', () => {
  const long = 'x'.repeat(5000);
  const short = (r) => { assert.ok(!r.ok, 'accepted'); assert.ok(r.reason.length <= 120, 'the reason is ' + r.reason.length + ' characters long'); };
  short(S.checkIconSvg(swap('<path', '<' + long + '/><path')));
  short(S.checkIconSvg(swap('<svg ', '<svg ' + long + '="1" ')));
  short(S.checkIconSvg(swap('<path ', '<path ' + long + '="1" ')));
  short(S.checkDrawing({ viewBox: '0 0 1 1', d: 'M0 0', [long]: 1 }));
});

const QUICK_MS = 250;
const quickly = (fn) => { const t = process.hrtime.bigint(); const r = fn(); const ms = Number(process.hrtime.bigint() - t) / 1e6; assert.ok(ms < QUICK_MS, 'took ' + ms.toFixed(1) + ' ms (bound ' + QUICK_MS + ' ms)'); return r; };
check('IconSafety: 30,000 spaces in a transform are refused at once #285', () => {
  const r = quickly(() => S.checkIconSvg(swap('<path ', '<path transform="' + ' '.repeat(30000) + '" ')));
  assert.ok(!r.ok && /transform is longer than/.test(r.reason), r.reason);
});
check('IconSafety: 30,000 digits in a viewBox are refused at once #285', () => {
  const r = quickly(() => S.checkIconSvg(swap('0 -960 960 960', '0 0 ' + '9'.repeat(30000) + ' 1')));
  assert.ok(!r.ok && /viewBox is longer than/.test(r.reason), r.reason);
});
check('IconSafety: a 200,000-character module value is refused at once (viewBox, transform, d) #285', () => {
  assert.ok(!quickly(() => S.checkDrawing({ viewBox: ' '.repeat(200000), d: 'M0 0h1' })).ok, 'a long viewBox passed');
  assert.ok(!quickly(() => S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', transform: ' '.repeat(200000) })).ok, 'a long transform passed');
  assert.ok(!quickly(() => S.checkDrawing({ viewBox: '0 0 24 24', d: 'M' + '0'.repeat(200000) })).ok, 'a long d passed');
});
check('IconSafety: a number is read one way: 1e999 and a four-digit exponent are refused, digits need a separator #285', () => {
  refused(swap('0 -960 960 960', '0 0 1e999 1'), /too large/);
  refused(swap('0 -960 960 960', '0 0 1e1000 1'), /four numbers/);
  refused(swap('<path ', '<path transform="matrix(' + '1'.repeat(450) + 'x)" '), /transform/);
  refused(swap('height="20"', 'height="' + ' '.repeat(40) + '"'), /height is longer than/);
  const r = quickly(() => S.checkIconSvg(swap('<path ', '<path' + ' '.repeat(30000) + ' ')));
  assert.ok(r.ok, 'legal whitespace between attributes is refused: ' + r.reason);
});
check('IconSafety: fill-rule and clip-rule are compared as exact strings #285', () => {
  assert.ok(!S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', fillRule: ['nonzero'] }).ok, 'an array passed as fill-rule');
  assert.ok(!S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', clipRule: 'nonzero ' }).ok, 'a padded clip-rule passed');
  assert.ok(S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', fillRule: 'evenodd' }).ok, 'evenodd is refused');
});
check('IconSafety: a module drawing passes the same rules (an unknown field, a bad d, a bad transform) #285', () => {
  assert.ok(S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1' }).ok, 'a plain drawing is refused');
  assert.ok(!S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', onload: 'x' }).ok, 'an unknown field passes');
  assert.ok(!S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0 url(#x)' }).ok, 'a bad d passes');
  assert.ok(!S.checkDrawing({ viewBox: '0 0 24 24', d: 'M0 0h1', transform: 'url(#x)' }).ok, 'a bad transform passes');
});
check('IconSafety: every shipped icon file passes, and reads as the build reads it #285', () => {
  const layout = require(path.join(ROOT, 'platform', 'icons', 'layout.js'));
  let n = 0;
  for (const dir of ['platform/icons', 'platform/icons/custom', 'platform/icons/library']) {
    const folder = path.join(ROOT, dir);
    if (!fs.existsSync(folder)) continue;
    for (const f of fs.readdirSync(folder).filter((x) => x.endsWith('.svg'))) {
      const file = path.join(folder, f), r = S.checkIconSvg(fs.readFileSync(file, 'utf8'));
      assert.ok(r.ok, f + ' refused: ' + r.reason);
      assert.deepStrictEqual(r.drawing, layout.readDrawing(file), f + ' reads differently from the build');
      n++;
    }
  }
  assert.ok(n > 1000, 'only ' + n + ' icon files found');
});

console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'ICON_SAFETY_OK (' + passed + ' checks)');
process.exit(failed ? 1 : 0);
