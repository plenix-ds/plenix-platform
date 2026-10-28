// Builds Plenix: the icon stylesheet, the Platform bundle and every application's page script. One command:
//   node build-app.js        (or: npm run build:app)
//
//   Icons          platform/icons/                 → platform/components/Icon/icon.css   (build-icons.js)
//                                                  → platform/dist/icons/plenix/<name>.svg|.js, index.json (the asset layout, #279)
//   Platform       platform/index.js               → platform/dist/platform.js       publishes its exports on window.Plenix
//   Applications   <folder>/main.jsx               → <folder>/app.js                  one per suite application (dashboard,
//                  projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings); they share suite/
//   Asset Manager  dam/app/assets.jsx              → dam/app/assets.js
//   Library parts  platform/exports/*, design-system/parts/* → index.js / platform.css blocks, spec-parts.js (build-exports.js, build-spec-parts.js)
//
// Source files use import/export. Each bundle is one plain script with a small module table, so pages need no
// in-browser compiler and the dashboard still opens straight from disk (file://); browser-native modules would not.
// Imports resolve to: relative files (.js, .jsx), "react" and "react-dom"/"react-dom/client" (the React already
// loaded from platform/vendor/), and "plenix-platform" (window.Plenix, for the applications only).
// Nothing needs the network. The build fails, and writes nothing, if a file does not compile, an import does not
// resolve, a public export is missing or undefined, or an output would land outside the list below.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const Babel = require('@babel/standalone');
const buildIcons = require('./build-icons.js');
const buildTokens = require('./build-tokens.js');

const ROOT = __dirname;
const DAM = path.join(ROOT, 'dam');
// the suite's applications: one folder each, beside platform/ (batch 149)
const SUITE = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
// the library parts first (library plan, wave 0): the lanes' exports and stylesheets into the generated block of index.js and
// platform.css (build-exports.js), and their records, labs and docs into the design system's spec-parts.js (build-spec-parts.js)
const EXPORTS = require('./build-exports.js')(ROOT);
console.log('Built the library block of platform/index.js and platform.css (' + EXPORTS.exports + ' exports, ' + EXPORTS.stylesheets + ' stylesheets' + (EXPORTS.stale.length ? '' : ', unchanged') + ')');
const PARTS = require('./build-spec-parts.js')(ROOT);
if (!PARTS.skipped) console.log('Built platform/design-system/spec-parts.js and ds-sample-parts.css (' + PARTS.parts + ' part files' + (PARTS.changed ? '' : ', unchanged') + ')');
// the token stylesheets first (platform/tokens/*.tokens.json -> system/tokens/*.css, themes/plenix.css; batch 158)
const TOKENS = buildTokens(ROOT);
console.log('Built ' + TOKENS.files.length + ' token stylesheets from platform/tokens (' + TOKENS.count + ' tokens' + (TOKENS.stale.length ? ', ' + TOKENS.stale.length + ' changed' : '') + ')');
// then the icon stylesheet (platform/icons/ -> components/Icon/icon.css): the bundles below do not read it, the pages do
const ICONS = buildIcons(ROOT);
// then the brand (platform/brand/ -> components/Brand/brand.css and brand/favicon.svg; batch 278)
const BRAND = require('./build-brand.js')(ROOT);
console.log('Built platform/components/Brand/brand.css and platform/brand/favicon.svg' + (BRAND.changed ? '' : ' (unchanged)'));
// then the design system's standards (platform/standards/*.json) -> the code the apps run (build-standards.js)
const STANDARDS = require('./build-standards.js')(ROOT);
console.log('Built ' + STANDARDS.files.join(', ') + ' from platform/standards (' + STANDARDS.pages + ' kinds of page' + (STANDARDS.stale.length ? ', ' + STANDARDS.stale.length + ' changed' : '') + ')');
console.log('Built platform/components/Icon/icon.css (' + ICONS.names + ' icon names, ' + ICONS.symbols + ' symbols, ' + Math.round(ICONS.bytes / 1024) + ' KB)');
// then the step rules (build-steps.js -> system/steps.css): values from the data arrive as attributes (batch 267)
const STEPS = require('./build-steps.js')(ROOT);
// the Platforms Standard (platform/standards/platforms.md) as the design system's data (batch 297)
const PLAT = require('./build-platforms.js')(ROOT);
// Plenix's own guidance for the Apple HIG pages, mapped to Web and Android (platform/standards/native-guidance.json, batch 330)
const NG = require('./build-native-guidance.js')(ROOT);
console.log('Built platform/design-system/native-guidance.js (' + NG.pages + ' pages, ' + NG.rules + ' rules' + (NG.changed ? '' : ', unchanged') + ')');
// each Web item's Last reviewed date, from the design system's history (STANDARD.md §7)
const RV = require('./build-reviewed.js')(ROOT);
console.log('Built platform/design-system/reviewed.js (' + RV.count + ' items dated' + (RV.changed ? '' : ', unchanged') + ')');
// the native token outputs (Swift, Kotlin, Dart; Platforms Standard 7.2), written by build-tokens.js with the stylesheets
const MOB = TOKENS.mobile;
console.log('Built platform/mobile (' + MOB.files.length + ' files, ' + MOB.colors + ' colors' + (MOB.changed ? '' : ', unchanged') + ')');
console.log('Built platform/design-system/platforms-standard.js (' + PLAT.sections + ' sections, ' + PLAT.tables + ' tables' + (PLAT.changed ? '' : ', unchanged') + ')');
console.log('Built platform/system/steps.css (' + STEPS.rules + ' rules' + (STEPS.changed ? '' : ', unchanged') + ')');
// the only files this build may write
const ALLOWED_OUTPUTS = [
  path.join(ROOT, 'platform', 'dist', 'platform.js'),
  path.join(DAM, 'app', 'assets.js'),
].concat(SUITE.map((f) => path.join(ROOT, f, 'app.js')));
const TARGETS = [
  { name: 'Platform', entry: path.join(ROOT, 'platform', 'index.js'), out: ALLOWED_OUTPUTS[0], publish: true, strict: true },
  { name: 'Asset Manager', entry: path.join(DAM, 'app', 'assets.jsx'), out: ALLOWED_OUTPUTS[1], publish: false, strict: true },
].concat(SUITE.map((f, i) => ({ name: f, entry: path.join(ROOT, f, 'main.jsx'), out: ALLOWED_OUTPUTS[2 + i], publish: false, strict: false })));
const EXTERNALS = {
  'react': 'window.React',
  'react-dom': 'window.ReactDOM',
  'react-dom/client': 'window.ReactDOM',
  'plenix-platform': 'window.Plenix',
};

class BuildError extends Error {}
const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

function resolveFile(from, spec) {
  const base = path.resolve(path.dirname(from), spec);
  for (const c of [base, base + '.js', base + '.jsx', path.join(base, 'index.js')]) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) return c;
  }
  throw new BuildError(`Cannot resolve "${spec}" from ${rel(from)}`);
}

function bundle(target) {
  if (!fs.existsSync(target.entry)) throw new BuildError(`${target.name}: entry ${rel(target.entry)} does not exist`);
  const modules = new Map();   // absolute path → { id, code }
  const order = [];
  const visit = (file) => {
    if (modules.has(file)) return;
    const source = fs.readFileSync(file, 'utf8');
    let code;
    try {
      code = Babel.transform(file.includes(path.sep + 'node_modules' + path.sep) ? source.replace(/\bprocess\.env\.NODE_ENV\b/g, "'production'") : source, {
        filename: file, sourceType: 'module', comments: true,
        presets: [['react', { runtime: 'classic' }]],
        plugins: [['transform-modules-commonjs', { strictMode: target.strict }]],
      }).code;
    } catch (e) {
      throw new BuildError(`${target.name}: ${rel(file)} does not compile: ${e.message}`);
    }
    const entry = { id: rel(file), code, deps: {} };
    modules.set(file, entry);
    const requireRe = /\brequire\((["'])([^"']+)\1\)/g;
    let m;
    while ((m = requireRe.exec(code))) {
      const spec = m[2];
      if (EXTERNALS[spec]) {
        if (spec === 'plenix-platform' && target.publish) throw new BuildError(`Platform source must not import "plenix-platform" (${rel(file)})`);
        entry.deps[spec] = { external: EXTERNALS[spec] };
        continue;
      }
      // an icon module (#282): plenix-platform/icons/<set>/<name>, the asset layout's module (platform/icons/layout.js),
      // bundled into the application like a source file; a Material one is written on demand, only the names imported
      const icon = /^plenix-platform\/icons\/(plenix|material)\/([a-z0-9-]+)$/.exec(spec);
      if (icon) {
        const dir = path.join(ROOT, 'platform', 'dist', 'icons', icon[1]);
        const dep = icon[1] === 'material' ? require('./platform/icons/layout.js').writeMaterialModule(ROOT, icon[2], dir) : path.join(dir, icon[2] + '.js');
        if (!fs.existsSync(dep)) throw new BuildError('No icon named ' + icon[2] + ' in the ' + icon[1] + ' set (' + rel(file) + ')');
        entry.deps[spec] = { id: rel(dep) }; visit(dep); continue;
      }
      if (!spec.startsWith('.')) {
        if (!/^@tanstack\/(react-table|table-core|react-virtual|virtual-core)$/.test(spec)) throw new BuildError('Unapproved browser package ' + spec + ' in ' + rel(file));
        const dep = require.resolve(spec, { paths: [path.dirname(file)] });
        entry.deps[spec] = { id: rel(dep) }; visit(dep); continue;
      }
      const dep = resolveFile(file, spec);
      entry.deps[spec] = { id: rel(dep) };
      visit(dep);
    }
    order.push(entry);
  };
  visit(target.entry);

  const header = '/*\n * GENERATED FILE — DO NOT EDIT\n * Source: ' + rel(target.entry) + ' and the modules it imports\n * Build: node build-app.js\n */\n';
  const defs = order.map((m) => {
    const table = JSON.stringify(Object.fromEntries(Object.entries(m.deps).map(([k, v]) => [k, v.id || null])));
    const ext = Object.entries(m.deps).filter(([, v]) => v.external).map(([k, v]) => `${JSON.stringify(k)}: function () { return ${v.external}; }`).join(', ');
    return `  ${JSON.stringify(m.id)}: { deps: ${table}, externals: { ${ext} }, run: function (module, exports, require) {\n${m.code}\n  } }`;
  }).join(',\n');
  const entryId = JSON.stringify(rel(target.entry));
  const tail = target.publish
    ? `  var api = load(${entryId});\n  window.Plenix = Object.freeze(Object.assign({}, api));\n`
    : `  load(${entryId});\n`;
  return { header, text: `${header}(function () {\n  var defs = {\n${defs}\n  };\n  var cache = {};\n  function load(id) {\n    if (cache[id]) return cache[id].exports;\n    var def = defs[id], module = { exports: {} };\n    cache[id] = module;\n    def.run(module, module.exports, function (spec) {\n      if (def.externals[spec]) { var g = def.externals[spec](); if (!g) throw new Error('Plenix: "' + spec + '" is not loaded before this script'); return g; }\n      return load(def.deps[spec]);\n    });\n    return module.exports;\n  }\n${tail}})();\n`, count: order.length };
}

// the Platform's public API: names exported by index.js, each defined once and defined for real
function checkPublicApi(text) {
  const src = fs.readFileSync(TARGETS[0].entry, 'utf8');
  const names = [];
  for (const m of src.matchAll(/export\s*\{([^}]*)\}/g)) m[1].split(',').map((s) => s.trim().split(/\s+as\s+/).pop()).filter(Boolean).forEach((n) => names.push(n));
  const dup = names.filter((n, i) => names.indexOf(n) !== i);
  if (dup.length) throw new BuildError(`Platform: duplicate public export ${dup.join(', ')}`);
  const sandbox = { console, document: { documentElement: { getAttribute: () => null } } };
  sandbox.window = sandbox; sandbox.self = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  for (const f of ['react.development.js', 'react-dom.development.js']) {
    const p = path.join(ROOT, 'platform', 'vendor', f);
    if (!fs.existsSync(p)) throw new BuildError(`Missing vendored runtime platform/vendor/${f}`);
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  }
  vm.runInContext(text, sandbox, { filename: 'platform.js' });
  const api = sandbox.Plenix || {};
  const missing = names.filter((n) => typeof api[n] === 'undefined');
  if (missing.length) throw new BuildError(`Platform: public export(s) missing or undefined: ${missing.join(', ')}`);
  const extra = Object.keys(api).filter((k) => names.indexOf(k) < 0);
  if (extra.length) throw new BuildError(`Platform: unexpected public names: ${extra.join(', ')}`);
  return names;
}

try {
  const results = [];
  for (const t of TARGETS) {
    if (ALLOWED_OUTPUTS.indexOf(t.out) < 0) throw new BuildError(`${t.name}: output ${t.out} is not an allowed build output`);
    const b = bundle(t);
    if (t.publish) b.api = checkPublicApi(b.text);
    results.push({ t, b });
  }
  // everything compiled and checked: only now write, each through a temporary file
  for (const { t, b } of results) {
    fs.mkdirSync(path.dirname(t.out), { recursive: true });
    const tmp = t.out + '.tmp';
    fs.writeFileSync(tmp, b.text);
    fs.renameSync(tmp, t.out);
    console.log(`Built ${rel(t.out)} (${(b.text.length / 1024).toFixed(0)} KB, ${b.count} module${b.count === 1 ? '' : 's'})${b.api ? ' · window.Plenix: ' + b.api.join(', ') : ''}`);
  }
} catch (e) {
  console.error('BUILD FAILED — nothing was written.\n' + (e instanceof BuildError ? e.message : e.stack));
  process.exit(1);
}
