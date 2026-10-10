// Builds a Plenix release from the Platform sources: the four packages, the versioned CDN files and the JSON API.
//   node build-packages.js            (run node build-app.js first; npm run release:build does both)
//
//   packages/tokens   @plenix-ds/tokens   the token JSON (source), the token CSS, a JS module with every token
//   packages/icons    @plenix-ds/icons    the SVG icons, their list (icons.json) and the icon stylesheet
//   packages/styles   @plenix-ds/styles   plenix.css: the whole Platform stylesheet in one file, plus fonts.css and theme-boot.js
//   packages/react    @plenix-ds/react    the components and patterns: ES module, CommonJS, and the browser global (window.Plenix)
//   release/cdn/<v>/  the same files at a fixed address per version (design-system.lighthouseway.org/cdn/<v>/)
//   release/api/v1/   read-only JSON: tokens, components, taxonomy, guidance, icons (design-system.lighthouseway.org/api/v1/)
//
// The version is "version" in package.json; every package gets the same one. Everything here is generated: edit the
// Platform (platform/), never packages/ or release/. The API needs the design system (platform/design-system, a
// submodule); without it the packages and the CDN still build and the API is skipped.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const esbuild = require('esbuild');

const ROOT = __dirname;
const P = path.join(ROOT, 'platform');
const VERSION = require('./package.json').version;
const SCOPE = '@plenix-ds';
const SITE = 'https://design-system.lighthouseway.org';
const REPO = 'https://github.com/plenix-ds/plenix-platform';
const PKG = path.join(ROOT, 'packages');
const REL = path.join(ROOT, 'release');
const CDN = path.join(REL, 'cdn', VERSION);
const API = path.join(REL, 'api', 'v1');

if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(VERSION || '')) throw new Error('package.json needs a version like 0.1.0');
for (const f of ['dist/platform.js', 'system/tokens/reference.css', 'components/Icon/icon.css', 'tokens/tokens.index.json']) {
  if (!fs.existsSync(path.join(P, f))) throw new Error('platform/' + f + ' is missing: run node build-app.js first');
}

const rm = (d) => fs.rmSync(d, { recursive: true, force: true });
const mk = (d) => fs.mkdirSync(d, { recursive: true });
const write = (f, s) => { mk(path.dirname(f)); fs.writeFileSync(f, s); };
const json = (f, o) => write(f, JSON.stringify(o, null, 2) + '\n');
const copy = (from, to) => { mk(path.dirname(to)); fs.copyFileSync(from, to); };
const copyDir = (from, to, keep = () => true) => { for (const n of fs.readdirSync(from)) if (keep(n)) copy(path.join(from, n), path.join(to, n)); };

rm(PKG); rm(REL);

// package.json shared by all four: GitHub Packages (private), linked to the Platform repository
const manifest = (name, description, extra) => Object.assign({
  name: SCOPE + '/' + name, version: VERSION, description,
  license: 'UNLICENSED', homepage: SITE + '/',
  repository: { type: 'git', url: 'git+' + REPO + '.git', directory: 'packages/' + name },
  publishConfig: { registry: 'https://npm.pkg.github.com', access: 'restricted' },
  sideEffects: ['*.css'],
}, extra);
const readme = (name, body) => write(path.join(PKG, name, 'README.md'),
  '# ' + SCOPE + '/' + name + '\n\n' + body.trim() + '\n\nPart of the Plenix design system, version ' + VERSION + '. Documentation: ' + SITE + '/\n');

// ---------- tokens ----------
const T = path.join(PKG, 'tokens');
const index = JSON.parse(fs.readFileSync(path.join(P, 'tokens', 'tokens.index.json'), 'utf8'));
copyDir(path.join(P, 'tokens'), path.join(T, 'json'), (n) => n.endsWith('.tokens.json'));
copyDir(path.join(P, 'system', 'tokens'), path.join(T, 'css'));
copy(path.join(P, 'system', 'themes', 'default.css'), path.join(T, 'css', 'theme-default.css'));   // the default theme (renamed in batch 219)
// the module: every token with its tier, type and value per selector (theme, density, interaction)
const tokens = index.tokens.map((t) => ({ name: t.name, tier: t.tier, type: t.type, description: t.description || '',
  values: t.sets.map((s) => ({ selector: s.selector, value: s.value, file: s.file })), refs: t.refs || [] }));
json(path.join(T, 'tokens.json'), { version: VERSION, count: tokens.length, tokens });
write(path.join(T, 'index.js'), '/* ' + SCOPE + '/tokens ' + VERSION + ' (generated) */\nexport const version = ' + JSON.stringify(VERSION) + ';\nexport const tokens = ' + JSON.stringify(tokens) + ';\n' +
  'const byName = new Map(tokens.map((t) => [t.name, t]));\n/** The token record by its CSS name, e.g. "--plx-sys-surface-canvas". */\nexport function token(name) { return byName.get(name); }\n' +
  '/** Its value for one selector (":root" when left out). */\nexport function value(name, selector = ":root") { const t = byName.get(name); const s = t && (t.values.find((v) => v.selector === selector) || t.values[0]); return s ? s.value : undefined; }\n' +
  '/** The CSS reference for use in styles: var(--plx-…). */\nexport function cssVar(name) { return "var(" + name + ")"; }\n');
write(path.join(T, 'index.d.ts'), 'export interface TokenValue { selector: string; value: string; file: string }\nexport interface Token { name: string; tier: "plx-ref" | "plx-sys" | "plx-comp"; type: string; description: string; values: TokenValue[]; refs: string[] }\nexport declare const version: string;\nexport declare const tokens: Token[];\nexport declare function token(name: string): Token | undefined;\nexport declare function value(name: string, selector?: string): string | undefined;\nexport declare function cssVar(name: string): string;\n');
write(path.join(T, 'css', 'all.css'), ['reference.css', 'semantic.css', 'components.css', 'theme-default.css'].map((f) => '@import url("' + f + '");').join('\n') + '\n');
json(path.join(T, 'package.json'), manifest('tokens', 'Plenix design tokens: the source JSON, CSS custom properties (--plx-…) and a JS module.', {
  type: 'module', main: 'index.js', types: 'index.d.ts',
  exports: { '.': { types: './index.d.ts', default: './index.js' }, './tokens.json': './tokens.json', './css/*': './css/*', './json/*': './json/*', './package.json': './package.json' },
}));
readme('tokens', `
The ${tokens.length} Plenix tokens in three tiers: \`plx-ref\` (reference palette and scales), \`plx-sys\` (semantic roles) and \`plx-comp\` (component values).

- \`json/*.tokens.json\`: the source, the files the Platform is edited in.
- \`css/all.css\`: every token as a CSS custom property, with the default theme. \`css/reference.css\`, \`semantic.css\`, \`components.css\` and \`theme-default.css\` load each tier on its own.
- \`index.js\` exports \`tokens\`, \`token(name)\`, \`value(name, selector)\` and \`cssVar(name)\`.

Use the semantic (\`--plx-sys-…\`) and component (\`--plx-comp-…\`) tokens in products, never the reference palette directly.`);

// ---------- icons ----------
const I = path.join(PKG, 'icons');
const svgs = fs.readdirSync(path.join(P, 'icons')).filter((n) => n.endsWith('.svg'));
copyDir(path.join(P, 'icons'), path.join(I, 'svg'), (n) => n.endsWith('.svg'));
copy(path.join(P, 'components', 'Icon', 'icon.css'), path.join(I, 'icon.css'));
const iconNames = [...new Set(svgs.map((n) => n.replace(/\.svg$/, '').replace(/-24$|-fill$|-24-fill$/, '').replace(/-24$/, '')))].sort();
const icons = iconNames.map((n) => ({ name: n, files: svgs.filter((f) => f === n + '.svg' || f.startsWith(n + '-')) }));
json(path.join(I, 'icons.json'), { version: VERSION, set: 'Material Symbols Sharp, weight 300, optical size 20 (unedited)', count: icons.length, icons });
json(path.join(I, 'package.json'), manifest('icons', 'Plenix icons: Material Symbols Sharp (weight 300), outline and filled, as SVG files and an icon stylesheet.', {
  exports: { './icons.json': './icons.json', './icon.css': './icon.css', './svg/*': './svg/*', './package.json': './package.json' },
}));
readme('icons', `
${icons.length} icons, outline and filled, 20px and 24px: Material Symbols Sharp at weight 300, unedited.

- \`svg/<name>.svg\`, \`<name>-fill.svg\`, \`<name>-24.svg\`, \`<name>-24-fill.svg\`
- \`icons.json\`: every name and its files.
- \`icon.css\`: the stylesheet the Icon component uses (already part of ${SCOPE}/styles).`);

// ---------- styles ----------
const S = path.join(PKG, 'styles');
const cssOpts = { entryPoints: [path.join(P, 'platform.css')], bundle: true, logLevel: 'silent', loader: { '.svg': 'dataurl', '.png': 'dataurl', '.woff2': 'dataurl' } };
esbuild.buildSync(Object.assign({}, cssOpts, { outfile: path.join(S, 'plenix.css') }));
esbuild.buildSync(Object.assign({}, cssOpts, { outfile: path.join(S, 'plenix.min.css'), minify: true }));
// the hosted typefaces (batch 227): fonts.css beside the font files, as the Platform has them (platform/system/fonts.css,
// platform/fonts); no page calls Google
copyDir(path.join(P, 'fonts'), path.join(S, 'fonts'));
write(path.join(S, 'fonts.css'), fs.readFileSync(path.join(P, 'system', 'fonts.css'), 'utf8').split('url("../fonts/').join('url("fonts/'));
copy(path.join(P, 'providers', 'theme-boot.js'), path.join(S, 'theme-boot.js'));
json(path.join(S, 'package.json'), manifest('styles', 'Plenix styles: the whole Platform stylesheet (tokens, theme, foundations, every component and pattern) in one file.', {
  style: 'plenix.css',
  exports: { '.': './plenix.css', './plenix.css': './plenix.css', './plenix.min.css': './plenix.min.css', './fonts.css': './fonts.css', './fonts/*': './fonts/*', './theme-boot.js': './theme-boot.js', './package.json': './package.json' },
}));
readme('styles', `
- \`plenix.css\` (and \`plenix.min.css\`): tokens, the Plenix theme, the foundations and every component and pattern.
- \`fonts.css\` and \`fonts/\`: DM Sans and DM Mono (SIL Open Font License), hosted with the styles: nothing is fetched from Google.
- \`theme-boot.js\`: load it in \`<head>\` before the page draws; it sets the light or dark mode, the display density and the interaction environment (\`data-plx-mode\`, \`data-plx-density-policy\` on \`<html>\`).

\`\`\`html
<html lang="en" data-plx-density-policy="compact">
<head>
  <script src="node_modules/${SCOPE}/styles/theme-boot.js"></script>
  <link rel="stylesheet" href="node_modules/${SCOPE}/styles/fonts.css">
  <link rel="stylesheet" href="node_modules/${SCOPE}/styles/plenix.css">
\`\`\``);

// ---------- react ----------
const R = path.join(PKG, 'react');
const jsOpts = { entryPoints: [path.join(P, 'index.js')], bundle: true, logLevel: 'silent', target: 'es2019', jsx: 'transform',
  loader: { '.js': 'jsx', '.jsx': 'jsx' }, external: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime'],
  banner: { js: '/* ' + SCOPE + '/react ' + VERSION + ' · Plenix Platform components and patterns (generated) */' },
  // a bundled app has no Plenix script to find the vendor folder from: the DataTable loads Tabulator from this release's
  // CDN copy (versioned, never changes) unless the page sets window.PlenixVendorBase (batch 251)
  define: { __PLENIX_VENDOR__: JSON.stringify('https://design-system.lighthouseway.org/cdn/' + VERSION + '/vendor/') } };
esbuild.buildSync(Object.assign({}, jsOpts, { format: 'esm', outfile: path.join(R, 'dist', 'index.js') }));
esbuild.buildSync(Object.assign({}, jsOpts, { format: 'cjs', outfile: path.join(R, 'dist', 'index.cjs') }));
copy(path.join(P, 'dist', 'platform.js'), path.join(R, 'dist', 'plenix.global.js'));
// the TypeScript definitions, from the components' header comments (build-types.js)
require('./build-types.js')(path.join(R, 'index.d.ts'), VERSION);
const exportsList = [];
for (const m of fs.readFileSync(path.join(P, 'index.js'), 'utf8').matchAll(/export \{([^}]+)\} from '([^']+)'/g)) {
  for (const n of m[1].split(',').map((x) => x.trim()).filter(Boolean)) exportsList.push({ name: n, file: 'platform/' + m[2].replace(/^\.\//, '') });
}
json(path.join(R, 'package.json'), manifest('react', 'Plenix React components and patterns, drawn only from Plenix tokens.', {
  main: 'dist/index.cjs', module: 'dist/index.js', types: 'index.d.ts',
  exports: { '.': { types: './index.d.ts', import: './dist/index.js', require: './dist/index.cjs' }, './plenix.global.js': './dist/plenix.global.js', './package.json': './package.json' },
  peerDependencies: { react: '>=18.2.0 <19', 'react-dom': '>=18.2.0 <19' },
  dependencies: { [SCOPE + '/styles']: VERSION, [SCOPE + '/tokens']: VERSION, [SCOPE + '/icons']: VERSION },
}));
readme('react', `
${exportsList.length} exports: every Platform component, pattern, provider and hook (\`Button\`, \`DataTable\`, \`Dialog\`, \`AppShell\`, \`NavPane\`, \`ThemeProvider\`, …).

\`\`\`js
import '${SCOPE}/styles/plenix.css';
import { AppShell, Button, DataTable } from '${SCOPE}/react';
\`\`\`

Pages without a build tool load \`dist/plenix.global.js\` after React 18 and use \`window.Plenix\`.
React 18 is a peer dependency. Rules: compose from these components and the tokens only; no inline styles or hard-coded values.`);

// ---------- CDN: the same files at a fixed address per version ----------
copy(path.join(S, 'plenix.css'), path.join(CDN, 'plenix.css'));
copy(path.join(S, 'plenix.min.css'), path.join(CDN, 'plenix.min.css'));
copy(path.join(S, 'fonts.css'), path.join(CDN, 'fonts.css'));
copyDir(path.join(S, 'fonts'), path.join(CDN, 'fonts'));   // the hosted typefaces beside fonts.css (batch 227)
copy(path.join(S, 'theme-boot.js'), path.join(CDN, 'theme-boot.js'));
copy(path.join(R, 'dist', 'plenix.global.js'), path.join(CDN, 'plenix.js'));
copy(path.join(R, 'dist', 'index.js'), path.join(CDN, 'plenix.esm.js'));
copy(path.join(P, 'vendor', 'react.production.min.js'), path.join(CDN, 'vendor', 'react.production.min.js'));
copy(path.join(P, 'vendor', 'react-dom.production.min.js'), path.join(CDN, 'vendor', 'react-dom.production.min.js'));
// the DataTable's engine (Tabulator, MIT): loaded by the DataTable from ./vendor/tabulator/ next to plenix.js, and shipped in the
// React package (dist/vendor/tabulator/) for pages that set window.PlenixVendorBase or load window.Tabulator themselves
copyDir(path.join(P, 'vendor', 'tabulator'), path.join(CDN, 'vendor', 'tabulator'));
copyDir(path.join(P, 'vendor', 'tabulator'), path.join(R, 'dist', 'vendor', 'tabulator'));
copyDir(path.join(T, 'css'), path.join(CDN, 'tokens'));
copy(path.join(T, 'tokens.json'), path.join(CDN, 'tokens', 'tokens.json'));
// the native outputs (build-mobile.js) and the platform sets they come from (Platforms Standard 7.1 and 7.2, batch 297)
for (const d of ['ios', 'android', 'flutter']) copyDir(path.join(P, 'mobile', d), path.join(CDN, 'mobile', d));
for (const f of ['platform-ios.tokens.json', 'platform-android.tokens.json']) copy(path.join(P, 'tokens', f), path.join(CDN, 'tokens', f));
copyDir(path.join(I, 'svg'), path.join(CDN, 'icons'));
copy(path.join(I, 'icons.json'), path.join(CDN, 'icons', 'icons.json'));

// ---------- API: read-only JSON for tools, agents and other systems ----------
let apiNote = 'skipped (platform/design-system is not checked out)';
const DS = path.join(P, 'design-system');
if (fs.existsSync(path.join(DS, 'inventory.js'))) {
  // the records only: React and window.Plenix are stand-ins (their live examples are functions and are never drawn here)
  const stub = new Proxy(function () { return null; }, { get: (t, k) => (k === Symbol.toPrimitive ? () => '' : stub), apply: () => null });
  const win = { Plenix: stub };
  const ctx = vm.createContext({ window: win, React: stub, ReactDOM: stub, document: stub, console });
  for (const f of ['inventory-taxonomy.js', 'inventory.js', 'inventory-guidance.js', 'inventory-docs.js'].filter((x) => fs.existsSync(path.join(DS, x)))) vm.runInContext(fs.readFileSync(path.join(DS, f), 'utf8'), ctx, { filename: f });
  const recs = Array.isArray(win.DSInventory) ? win.DSInventory : Object.values(win.DSInventory || {});
  const pick = (o, ks) => Object.fromEntries(ks.filter((k) => o[k] !== undefined && o[k] !== '').map((k) => [k, o[k]]));
  // each record with its written sections (inventory-docs.js, batch 208); a record's own fields win
  const docs = win.DSDocs || {};
  const components = recs.map((r) => Object.assign(pick(docs[r.id] || {}, ['purpose', 'anatomy', 'behavior', 'a11y', 'content']), pick(r, ['id', 'title', 'sec', 'sub', 'leaf', 'level', 'status', 'icon', 'text', 'purpose', 'use', 'avoid', 'related', 'aliases', 'covers', 'map', 'plenix', 'src'])));
  const sections = (win.DSTaxonomy || []).map((s) => pick(s, ['id', 'n', 'title', 'question', 'icon', 'subs', 'leaves', 'groups']));
  const meta = { version: VERSION, generated: new Date().toISOString().slice(0, 10), docs: SITE + '/' };
  json(path.join(API, 'index.json'), Object.assign({}, meta, {
    description: 'The Plenix design system as read-only JSON. Every file is also published at ' + SITE + '/api/v1/<name>.',
    endpoints: {
      tokens: SITE + '/api/v1/tokens', components: SITE + '/api/v1/components', exports: SITE + '/api/v1/exports',
      taxonomy: SITE + '/api/v1/taxonomy', guidance: SITE + '/api/v1/guidance', icons: SITE + '/api/v1/icons', cdn: SITE + '/cdn/' + VERSION + '/',
    },
    packages: ['tokens', 'icons', 'styles', 'react'].map((n) => SCOPE + '/' + n + '@' + VERSION),
  }));
  json(path.join(API, 'tokens.json'), Object.assign({}, meta, { count: tokens.length, tokens }));
  json(path.join(API, 'components.json'), Object.assign({}, meta, { count: components.length, components }));
  json(path.join(API, 'exports.json'), Object.assign({}, meta, { package: SCOPE + '/react', count: exportsList.length, exports: exportsList }));
  json(path.join(API, 'taxonomy.json'), Object.assign({}, meta, { count: sections.length, sections, placementRules: win.DSPlacementRules || [] }));
  const g = win.DSGuidance || {};
  json(path.join(API, 'guidance.json'), Object.assign({}, meta, { count: Object.keys(g).length,
    items: Object.keys(g).map((k) => Object.assign({ section: k.split('|')[0], item: k.split('|').slice(1).join('|') }, g[k])) }));
  json(path.join(API, 'icons.json'), Object.assign({}, meta, { count: icons.length, base: SITE + '/cdn/' + VERSION + '/icons/', icons }));
  apiNote = components.length + ' components, ' + Object.keys(g).length + ' guidance items, ' + tokens.length + ' tokens';
}

const kb = (f) => Math.round(fs.statSync(f).size / 1024) + ' KB';
console.log('Plenix ' + VERSION + ': packages ' + ['tokens', 'icons', 'styles', 'react'].map((n) => SCOPE + '/' + n).join(', '));
console.log('  styles/plenix.css ' + kb(path.join(S, 'plenix.css')) + ' (min ' + kb(path.join(S, 'plenix.min.css')) + '), react ' + kb(path.join(R, 'dist', 'index.js')) + ' ESM, ' + exportsList.length + ' exports, ' + icons.length + ' icons, ' + tokens.length + ' tokens');
console.log('  cdn: release/cdn/' + VERSION + '/   api: ' + apiNote);
