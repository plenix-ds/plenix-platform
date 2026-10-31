// Plenix tests · a site's icon file and the compatibility file (#553, stage 5 of #280). Node only (no browser).
// tools/icons/site-icons.js writes plenix-icons-<site>.js from a site's source, and node build-app.js writes the
// compatibility file platform/dist/plenix-icons-plenix.js (every Plenix icon). Each file is run here against a stand-in
// window.Plenix that records what it registers, and every registered drawing must pass the Icon component's allow-list
// (#285). The generator is run on fixtures written into a temporary folder. Prints SITE_ICONS_OK or each failure, and
// exits 1 on a failure.
//   node tests/site-icons.test.js
const shared = require('./check.js');   // the shared check helper: parts (TEST_ONLY) and the results file (TEST_RESULTS)
const fs = require('fs');
const os = require('os');
const path = require('path');
const assert = require('assert');
const { execFileSync } = require('child_process');
const Babel = require('@babel/standalone');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.join(__dirname, '..');
const TOOL = path.join(ROOT, 'tools', 'icons', 'site-icons.js');
const sites = require(TOOL);
const layout = require(path.join(ROOT, 'platform', 'icons', 'layout.js'));
const code = Babel.transform(fs.readFileSync(path.join(ROOT, 'platform', 'utils', 'iconSafety.ts'), 'utf8'), { sourceType: 'module', filename: 'iconSafety.ts', presets: ['typescript'], plugins: ['transform-modules-commonjs'] }).code;
const mod = { exports: {} };
new Function('module', 'exports', 'require', code)(mod, mod.exports, require);
const S = mod.exports;

let failed = 0, passed = 0;
const check = (name, fn) => { if (!shared.wanted(name)) return; try { fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + '\n  ' + e.message); } };

// a file run as a page runs it: a classic script with window.Plenix; returns the modules it registered and the warnings
function run(text, plenix) {
  const registered = [], warnings = [];
  const win = plenix === null ? {} : { Plenix: plenix || { registerIcons: (...args) => { for (const m of args.flat()) registered.push(m); } } };
  new Function('window', 'console', text)(win, { warn: (m) => warnings.push(m) });
  return { registered, warnings };
}
const allDrawingsSafe = (mods) => {
  for (const m of mods) for (const size of [20, 24]) for (const k of ['outline', 'fill']) {
    const r = S.checkDrawing(m.drawings[size][k]);
    assert.ok(r.ok, m.name + ' ' + size + ' ' + k + ': ' + r.reason);
  }
};
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-site-icons-'));
const write = (rel, text) => { const f = path.join(tmp, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); return f; };
const tool = (args) => { try { return { code: 0, out: execFileSync(process.execPath, [TOOL, ...args], { cwd: tmp, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }) }; } catch (e) { return { code: e.status, out: String(e.stdout || '') + String(e.stderr || '') }; } };

const COMPAT = path.join(ROOT, sites.COMPAT);
const names = Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, 'platform', 'icons', 'map.json'), 'utf8')).map);

check('Compatibility file: it is generated and up to date #553', () => {
  const text = fs.readFileSync(COMPAT, 'utf8');
  assert.ok(text.includes(sites.HEADER), 'no "' + sites.HEADER + '" header');
  assert.deepStrictEqual(sites.buildCompat(ROOT, { check: true }).stale, [], 'differs from platform/icons: run node build-app.js');
});
check('Compatibility file: it registers every Plenix icon, once, with its drawings #553', () => {
  const { registered } = run(fs.readFileSync(COMPAT, 'utf8'));
  assert.deepStrictEqual(registered.map((m) => m.name).sort(), names.slice().sort());
  const byName = new Map(layout.plenixEntries(ROOT).map((e) => [e.name, e]));
  for (const m of registered) assert.deepStrictEqual(m, layout.moduleObject('plenix', byName.get(m.name)), m.name + ' differs from its module');
});
check('Compatibility file: every drawing passes the allow-list #285', () => allDrawingsSafe(run(fs.readFileSync(COMPAT, 'utf8')).registered));
check('Compatibility file: without plenix.js it warns and registers nothing #553', () => {
  const r = run(fs.readFileSync(COMPAT, 'utf8'), null);
  assert.strictEqual(r.registered.length, 0);
  assert.ok(/load it after plenix\.js/.test(r.warnings[0] || ''), 'no warning: ' + r.warnings.join(' | '));
});
check('Compatibility file: it loads nothing (no fetch, no import, no URL) #553', () => {
  const text = fs.readFileSync(COMPAT, 'utf8');
  assert.ok(!/\b(fetch|import|XMLHttpRequest|innerHTML|eval)\b|https?:/.test(text.replace(/^\/\*[\s\S]*?\*\//, '')), 'the file reaches outside itself');
});

check('Page icon files: each application, the Asset Manager and the login service are up to date #557', () => {
  assert.deepStrictEqual(sites.buildPages(ROOT, { check: true }).stale, [], 'run node build-app.js');
  for (const p of sites.PAGES) {
    const text = fs.readFileSync(path.join(ROOT, p.out), 'utf8');
    allDrawingsSafe(run(text).registered);
    const page = p.site === 'dam' ? 'dam/index.html' : p.site + '/index.html';
    assert.ok(fs.readFileSync(path.join(ROOT, page), 'utf8').includes('<script src="' + path.basename(p.out) + '"></script>'), page + ' does not load ' + p.out);
  }
  const login = require(path.join(ROOT, sites.LOGIN.out));
  for (const n of sites.LOGIN.names) assert.ok(/^<span class="plx-icon plx-icon--[a-z-]+ plx-icon--inline[^"]*" aria-hidden="true"><svg [^<]*><path [^>]*><\/path>/.test(login[n]), n + ': ' + String(login[n]).slice(0, 120));
});

// a small site: JSX screens, a page with an inline script, an imported module, a bare class name, a Material name
write('site/app.jsx', "import Upload from 'plenix-platform/icons/plenix/upload';\nexport const App = () => <div><Icon name=\"folder\" /><Button icon=\"add\">Add</Button><Button icon={Upload}>Up</Button></div>;\nconst toolbar = [{ icon: 'trash' }, { icon: 'rocket_launch' }];\n");
write('site/index.html', '<!doctype html><title>x</title><span class="plx-icon plx-icon--search plx-icon--size-sm"></span>\n<script src="https://example.org/plenix.js"></script>\n<script>\n  var h = React.createElement;\n  h(Plenix.Icon, { name: "mail" });\n</script>\n');
write('site/node_modules/lib/index.js', "x = { icon: 'not-a-real-icon' };\n");
check('Generator: it finds every kind of use and writes exactly those icons #553', () => {
  const r = tool(['demo', 'site', '--out', 'out']);
  assert.strictEqual(r.code, 0, r.out);
  const { registered } = run(fs.readFileSync(path.join(tmp, 'out', 'plenix-icons-demo.js'), 'utf8'));
  assert.deepStrictEqual(registered.map((m) => m.set + ':' + m.name).sort(), ['material:rocket-launch', 'plenix:add', 'plenix:folder', 'plenix:mail', 'plenix:search', 'plenix:trash', 'plenix:upload']);
  allDrawingsSafe(registered);
});
check('Generator: an unknown name stops it, unless --allow-unknown #553', () => {
  write('bad/page.jsx', 'export const P = () => <Icon name="no-such-icon-anywhere" />;\n');
  const stop = tool(['bad', 'bad', '--out', 'bad-out']);
  assert.strictEqual(stop.code, 1, stop.out);
  assert.ok(/unknown icon name: bad\/page\.jsx:1 "no-such-icon-anywhere"/.test(stop.out), stop.out);
  assert.ok(!fs.existsSync(path.join(tmp, 'bad-out', 'plenix-icons-bad.js')), 'a file was written');
  const go = tool(['bad', 'bad', '--out', 'bad-out', '--allow-unknown']);
  assert.strictEqual(go.code, 0, go.out);
  assert.strictEqual(run(fs.readFileSync(path.join(tmp, 'bad-out', 'plenix-icons-bad.js'), 'utf8')).registered.length, 0);
});
check('Generator: a name built at run time is reported, and a plx-icons comment lists its names #553', () => {
  write('dyn/a.jsx', "export const A = ({ d }) => <Icon name={'density-' + d} />;\n");
  const stop = tool(['dyn', 'dyn', '--out', 'dyn-out']);
  assert.strictEqual(stop.code, 1, stop.out);
  assert.ok(/name built at run time: dyn\/a\.jsx:1/.test(stop.out), stop.out);
  write('dyn/a.jsx', "export const A = ({ d }) => <Icon name={'density-' + d /* plx-icons: density-compact density-comfortable */} />;\n");
  const go = tool(['dyn', 'dyn', '--out', 'dyn-out']);
  assert.strictEqual(go.code, 0, go.out);
  assert.deepStrictEqual(run(fs.readFileSync(path.join(tmp, 'dyn-out', 'plenix-icons-dyn.js'), 'utf8')).registered.map((m) => m.name).sort(), ['density-comfortable', 'density-compact']);
});
check('Generator: with literals, a quoted Plenix name in data is registered and other words are dropped #557', () => {
  write('lit/data.js', "window.DATA = [{ kind: 'trash', label: 'not-an-icon-word' }];\n");
  const plain = sites.siteFile(ROOT, 'lit', [path.join(tmp, 'lit')], tmp);
  const wide = sites.siteFile(ROOT, 'lit', [path.join(tmp, 'lit')], tmp, { literals: true });
  assert.strictEqual(plain.icons, 0);
  assert.deepStrictEqual(run(wide.text).registered.map((m) => m.name), ['trash']);
  assert.deepStrictEqual(wide.unknown, []);
});
check('Generator: the site name "plenix" and a bad name are refused #553', () => {
  assert.strictEqual(tool(['plenix', 'site']).code, 2);
  assert.strictEqual(tool(['Bad Name', 'site']).code, 2);
});

fs.rmSync(tmp, { recursive: true, force: true });
console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'SITE_ICONS_OK (' + passed + ' checks)');
process.exit(failed ? 1 : 0);
