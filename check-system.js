// Checks that both Plenix applications keep to the one Platform system: structure, markup, files and generated code.
//   node check-system.js        (or: npm run lint:system)
// Exits with 1 and lists every finding when a rule is broken, so it can run in CI next to the build.
// The style rules are not here (owner, style-plan-30: every style rule in exactly one place): Stylelint checks each
// stylesheet (.stylelintrc.json, tools/stylelint/plenix.mjs) and check-style.js holds the Plenix style rules Stylelint
// cannot check (tokens, hex, font sizes and other values in code, inline styles, defined tokens, cascade layers, selector
// kinds, text contracts, the token-source rules: no new colors, the 4px grid, corners 2 to 6px). Both checks read the same
// files (check-common.js).
//
//   imports     every component and pattern stylesheet is imported by platform.css
//   legacy      the retired files stay gone (suite/, tokens/legacy.css, the asset app's plenix.css and demo.css, system/nesting.css)
//   embedded    the asset app has no embedded SVG and no data: URIs (icons are files)
//   generated   the token stylesheets and the standards' code (build-standards.js: providers/pageLayouts.js, system/layout-modes.css)
//               are exactly what is generated from their JSON (platform/tokens/*.tokens.json, platform/standards/*.json);
//               the token stylesheets are exactly what build-tokens.js writes from the token source (platform/tokens/*.tokens.json):
//               tokens are edited in the JSON, never in the CSS (batch 158); the library parts' bundles (spec-parts.js,
//               ds-sample-parts.css) and the library block of index.js and platform.css match their part files; the
//               compatibility icon file (platform/dist/plenix-icons-plenix.js, #553) matches the icon set; each page's
//               icon file (<app>/plenix-icons-<app>.js, dam/plenix-icons-dam.js, #557) matches its page's source
//   audit       every page loads platform/dev/style-audit.js, which rejects inline styles and style blocks at run time
//   page-layout an application never sets a page's layout mode (AppShell layout=, data-plx-layout): it says what the page is
//               (<AppShell page="settings">) and the design system's layout standard (providers/pageLayouts.js) decides
//   tables      every table is a DataGrid (the React renderer in the Plenix table style): no <table>, no table element made in code, no
//               PropertyList table variant: every table is a Table (static) or a DataGrid, both on the React renderer (batches
//               226, 229, 234). In stylesheets (no rule for the retired variant's class): Stylelint, selector-disallowed-list
//   icon-names  (check-system.rules/icon-names.js) every icon named in source (<Icon name=…>, icon=…, icon: …, plx-icon--…)
//               is in the Plenix set (platform/icons/map.json); an unknown name draws nothing
//   icon-imports (check-system.rules/icon-imports.js) a Platform component draws its icons from imported modules, never from a
//               name written as text (#280; three named exceptions, each with its reason)
//   site-styles (check-system.rules/site-styles.js) sites have no stylesheet, style block or style attribute of their own (#381): a tracked
//               .css file outside the exempt list fails, and so does a <style> block or style attribute in services/ or the St. John site
//   and the other modules of check-system.rules/ that are not style rules (check-common.js, STYLE_MODULES): composition,
//   links-not-buttons, semantic-html, settings-cards, table-geometry, use-of-color, copy
const fs = require('fs');
const path = require('path');
const { ROOT, DAM, SPEC_PAGE, STYLE_MODULES, collect, reporter } = require('./check-common.js');

const files = collect();
const { add, runModules, finish } = reporter();

for (const { file } of files) {
  if (!/\.(jsx|js|html)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const lineOf = (i) => text.slice(0, i).split('\n').length;
  // page-layout: an application says what a page is (<AppShell page="settings">); the layout standard picks the mode
  if (!/[\\/]platform[\\/]/.test(file) && !/(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<AppShell\b[^>]*?\blayout\s*=|\bdata-plx-layout\s*=|['"]data-plx-layout['"]/g)) add('page-layout', file, lineOf(m.index), text.slice(m.index, m.index + 80).split('\n')[0]);
  }
  // tables: every table is a DataGrid (the React renderer in the Plenix table style, batch 226): no <table>, no table element made
  // in code, no retired Table component or its classes. The design system's builders draw a table and hand it to DS.table
  // at once (tests/pages.test.js fails any table left on a page); generated bundles are checked through their sources.
  // a name/value table is a DataGrid too: no PropertyList table variant anywhere, the design system included (batch 229)
  if (!/[\\/]dist[\\/]|(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<PropertyList\b[^>]*\bvariant=["'{]+table|PropertyList,\s*\{\s*variant:\s*["']table|\bplx-property-list--table\b/g)) add('tables', file, lineOf(m.index), 'not a DataGrid: ' + text.slice(m.index, m.index + 60).split('\n')[0]);
  }
  if (!SPEC_PAGE.test(file) && !/[\\/]dist[\\/]|(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<table[\s>]|createElement\(\s*['"]table['"]|\bel\(\s*['"]table['"]|\bh\(\s*['"]table['"]/g)) {
      add('tables', file, lineOf(m.index), 'not a DataGrid: ' + text.slice(m.index, m.index + 60).split('\n')[0]);
    }
  }
}

// the asset app: no embedded pictures
for (const { file } of files) {
  if (/[\\/]Plenix[\\/]dam[\\/]/.test(file)) {
    fs.readFileSync(file, 'utf8').split(/\r?\n/).forEach((line, i) => {
      if (/data:(image|font|application)\//.test(line)) add('embedded', file, i + 1, 'data: URI in: ' + line);
      if (/<svg[\s>]/.test(line)) add('embedded', file, i + 1, 'embedded SVG in: ' + line);
    });
  }
}
// audit: every page loads the style audit (platform/dev/style-audit.js), which rejects at run time any style that does
// not come from the design system
for (const { file } of files) {
  if (!/\.html$/.test(file) || /[\/]platform[\/]dev[\/]/.test(file)) continue;
  if (!/platform\/dev\/style-audit\.js|\.\.\/dev\/style-audit\.js/.test(fs.readFileSync(file, 'utf8'))) add('audit', file, 0, 'the page does not load platform/dev/style-audit.js');
}
// imports: every component and pattern stylesheet is in platform.css
const platformCss = fs.readFileSync(path.join(ROOT, 'platform', 'platform.css'), 'utf8');
for (const kind of ['components', 'patterns']) {
  const dir = path.join(ROOT, 'platform', kind);
  for (const c of fs.readdirSync(dir)) for (const f of fs.readdirSync(path.join(dir, c))) {
    if (!/\.css$/.test(f)) continue;
    const want = kind + '/' + c + '/' + f;
    if (platformCss.indexOf('"' + want + '"') < 0) add('imports', path.join(dir, c, f), 0, want + ' is not imported by platform.css');
  }
}
// generated: the code made from the design system's standards matches its JSON source (platform/standards/*.json)
for (const f of require('./build-standards.js')(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ' differs from platform/standards: edit the standard (JSON) and run node build-app.js, never the generated file');
// generated: the token stylesheets match their JSON source
for (const f of require('./build-tokens.js')(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ' differs from platform/tokens: edit the .tokens.json, then build');
// generated: the compatibility icon file (every Plenix icon, #553) matches the icon set (platform/icons/map.json)
for (const f of require('./tools/icons/site-icons.js').buildCompat(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ' differs from platform/icons: run node build-app.js, never edit the generated file');
// generated: each page's icon file (#557) holds exactly the icons its source names
for (const f of require('./tools/icons/site-icons.js').buildPages(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ' differs from the icons its page\'s source names: run node build-app.js, never edit the generated file');
// generated: the library parts' bundles (build-spec-parts.js: spec-parts.js, ds-sample-parts.css) and the library block of
// index.js and platform.css (build-exports.js) match their parts (platform/design-system/parts/, platform/exports/)
for (const f of require('./build-spec-parts.js')(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ' differs from platform/design-system/parts: run node build-app.js');
for (const f of require('./build-exports.js')(ROOT, { check: true }).stale) add('generated', path.join(ROOT, f), 0, f + ': its library block differs from platform/exports: run node build-app.js');
// legacy files stay gone
for (const f of [path.join(ROOT, 'shared'), path.join(ROOT, 'platform', 'system', 'tokens', 'legacy.css'), path.join(DAM, 'plenix.css'), path.join(DAM, 'demo.css'), path.join(ROOT, 'platform', 'system', 'nesting.css')]) {
  if (fs.existsSync(f)) add('legacy', f, 0, 'retired file or folder is back');
}

// rules kept as their own modules (check-system.rules/<name>.js: { check({ files, add }) }; the library waves, batch 347),
// except the style rules (check-common.js, STYLE_MODULES), which check-style.js runs
runModules(files, (name) => !STYLE_MODULES.includes(name));

finish('SYSTEM_OK', 'SYSTEM_FAIL', files.length);
