// Builds Plenix: the icon stylesheet, the Platform bundle and every application's page script. One command:
//   node build-app.js        (or: npm run build:app)
//
//   Icons          platform/icons/                 → platform/components/Icon/icon.css   (build-icons.js)
//                                                  → platform/dist/icons/plenix/<name>.svg|.js, index.json (the asset layout, #279)
//                                                  → platform/dist/plenix-icons-plenix.js (the compatibility file: every Plenix icon, #553)
//                                                  → <app>/plenix-icons-<app>.js, dam/plenix-icons-dam.js (each page's icons, #557)
//   Platform       platform/index.js               → platform/dist/platform.js       publishes its exports on window.Plenix
//                                                    (Vite, vite.platform.config.mjs; its hidden source map → build/vite/platform.js.map)
//   Applications   <folder>/main.jsx               → <folder>/app.js                  one per suite application (dashboard,
//                  projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings); they share suite/
//   Asset Manager  dam/app/assets.jsx              → dam/app/assets.js
//   Library parts  platform/exports/*, design-system/parts/* → index.js / platform.css blocks, spec-parts.js (build-exports.js, build-spec-parts.js)
//
// Order: the pre-steps below (library block, tokens, icons, brand, standards, steps, ...), then Vite for the Platform
// (#709, step 2), then this file's own bundler for the applications and the Asset Manager (they move to Vite in steps 3 and 4).
// Source files use import/export. Each bundle is one plain script (the applications' with a small module table), so pages
// need no in-browser compiler and the dashboard still opens straight from disk (file://); browser-native modules would not.
// Imports resolve to: relative files (.js, .jsx), "react" and "react-dom"/"react-dom/client" (the React already
// loaded from platform/vendor/), and "plenix-platform" (window.Plenix, for the applications only).
// Nothing needs the network. The build fails, and writes nothing, if a file does not compile, an import does not
// resolve, a public export is missing or undefined, or an output would land outside the list below.
const fs = require('fs');
const path = require('path');
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
// the compatibility file (#553): every Plenix icon registered with registerIcons, for a site that loads plenix.js and no icon file of its own
const COMPAT = require('./tools/icons/site-icons.js').buildCompat(ROOT);
console.log('Built ' + COMPAT.file + ' (' + COMPAT.icons + ' icons, ' + Math.round(COMPAT.bytes / 1024) + ' KB' + (COMPAT.changed ? '' : ', unchanged') + ')');
// each page's own icon file (#557): <app>/plenix-icons-<app>.js and dam/plenix-icons-dam.js, exactly the icons its source names
const PAGE_ICONS = require('./tools/icons/site-icons.js').buildPages(ROOT);
console.log('Built ' + PAGE_ICONS.pages + ' page icon files (' + PAGE_ICONS.icons + ' icons' + (PAGE_ICONS.changed ? ', ' + PAGE_ICONS.stale.length + ' changed' : ', unchanged') + '; ' + PAGE_ICONS.unknown.length + ' names that are not icons, such as the suite\'s capability keys)');
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
// the only files this build may write (the Platform's source map goes to the ignored build/vite/, never beside a committed file)
const PLATFORM_OUT = path.join(ROOT, 'platform', 'dist', 'platform.js');
const PLATFORM_MAP = path.join(ROOT, 'build', 'vite', 'platform.js.map');
const ALLOWED_OUTPUTS = [
  PLATFORM_OUT,
  PLATFORM_MAP,
  path.join(DAM, 'app', 'assets.js'),
].concat(SUITE.map((f) => path.join(ROOT, f, 'app.js')));
const TARGETS = [
  { name: 'Asset Manager', entry: path.join(DAM, 'app', 'assets.jsx'), out: ALLOWED_OUTPUTS[2], strict: true },
].concat(SUITE.map((f, i) => ({ name: f, entry: path.join(ROOT, f, 'main.jsx'), out: ALLOWED_OUTPUTS[3 + i], strict: false })));
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
        entry.deps[spec] = { external: EXTERNALS[spec] };
        continue;
      }
      // an icon module (#282): plenix-platform/icons/<set>/<name>, the asset layout's module (platform/icons/layout.js),
      // bundled into the application like a source file; a Material one is written on demand, only the names imported
      const icon = /^plenix-platform\/icons\/(plenix|material)\/([a-z0-9-]+|[a-z0-9]+(?:_[a-z0-9]+)+)$/.exec(spec);   // a name, or a Plenix alias (more_horiz)
      if (icon) {
        // the underscore spelling is a Plenix alias (chevron_right); a Material module is imported by its dashed name only
        if (icon[1] === 'material' && icon[2].includes('_')) throw new BuildError('Material icons are imported by their dashed name: plenix-platform/icons/material/' + icon[2].replace(/_/g, '-') + ', not ' + icon[2] + ' (' + rel(file) + ')');
        const dir = path.join(ROOT, 'platform', 'dist', 'icons', icon[1]);
        let dep;
        try { dep = icon[1] === 'material' ? require('./platform/icons/layout.js').writeMaterialModule(ROOT, icon[2], dir) : path.join(dir, icon[2] + '.js'); }
        catch (e) { throw new BuildError('No icon named ' + icon[2] + ' in the ' + icon[1] + ' set (' + rel(file) + '): ' + e.message); }
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
  const tail = `  load(${entryId});\n`;
  return { header, text: `${header}(function () {\n  var defs = {\n${defs}\n  };\n  var cache = {};\n  function load(id) {\n    if (cache[id]) return cache[id].exports;\n    var def = defs[id], module = { exports: {} };\n    cache[id] = module;\n    def.run(module, module.exports, function (spec) {\n      if (def.externals[spec]) { var g = def.externals[spec](); if (!g) throw new Error('Plenix: "' + spec + '" is not loaded before this script'); return g; }\n      return load(def.deps[spec]);\n    });\n    return module.exports;\n  }\n${tail}})();\n`, count: order.length };
}

// the Platform (#709, step 2): Vite with vite.platform.config.mjs, in memory (write: false). The config adds the banner and
// the frozen window.Plenix and checks the public API (a missing, duplicate or extra name fails the build).
async function buildPlatform() {
  const { build } = await import('vite');
  let out;
  try { out = await build({ configFile: path.join(ROOT, 'vite.platform.config.mjs'), build: { write: false } }); }
  catch (e) { throw new BuildError('Platform (Vite): ' + e.message); }
  const output = (Array.isArray(out) ? out[0] : out).output;
  const chunk = output.find((o) => o.type === 'chunk' && o.fileName === 'platform.js');
  const map = output.find((o) => o.type === 'asset' && o.fileName === 'platform.js.map');
  if (!chunk || !map || !chunk.publicApi) throw new BuildError('Platform (Vite): no platform.js, source map or public-API check in the output');
  return [
    { t: { out: PLATFORM_OUT }, b: { text: chunk.code, count: chunk.moduleIds.length, api: chunk.publicApi } },
    { t: { out: PLATFORM_MAP }, b: { text: String(map.source), quiet: true } },
  ];
}

(async () => {
  const results = await buildPlatform();
  for (const t of TARGETS) {
    if (ALLOWED_OUTPUTS.indexOf(t.out) < 0) throw new BuildError(`${t.name}: output ${t.out} is not an allowed build output`);
    results.push({ t, b: bundle(t) });
  }
  // everything compiled and checked: only now write, each through a temporary file
  for (const { t, b } of results) {
    fs.mkdirSync(path.dirname(t.out), { recursive: true });
    const tmp = t.out + '.tmp';
    fs.writeFileSync(tmp, b.text);
    fs.renameSync(tmp, t.out);
    if (!b.quiet) console.log(`Built ${rel(t.out)} (${(b.text.length / 1024).toFixed(0)} KB, ${b.count} module${b.count === 1 ? '' : 's'})${b.api ? ' · window.Plenix: ' + b.api.join(', ') : ''}`);
  }
})().catch((e) => {
  console.error('BUILD FAILED — nothing was written.\n' + (e instanceof BuildError ? e.message : e.stack));
  process.exit(1);
});
