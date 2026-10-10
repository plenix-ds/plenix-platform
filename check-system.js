// Checks that both Plenix applications keep to the one Platform system. One command, no dependencies:
//   node check-system.js        (or: npm run lint:system)
// Exits with 1 and lists every finding when a rule is broken, so it can run in CI next to the build.
//
//   tokens      every var(--…) is a Platform token (--plx-ref-, --plx-sys-, --plx-comp-) or a custom property the same
//               file declares for itself (e.g. --ds-r on the spec page); no old names
//   hex         no raw hex colors outside the reference token file and the themes (colors come from tokens)
//   font-size   no font size written as a number: font sizes come from --plx-ref-font-size-* tokens
//   classes     every class a Platform stylesheet defines starts with plx- (state classes is-… excepted; the DataTable's
//               stylesheets (DataTable, Table) also restyle their engine's tabulator-… classes, there only)
//   imports     every component and pattern stylesheet is imported by platform.css
//   legacy      the retired files stay gone (suite/, tokens/legacy.css, the asset app's plenix.css and demo.css)
//   embedded    the asset app has no embedded SVG and no data: URIs (icons are files)
//   icon-size   no icon size written as a number (<Icon size={14}>, <Ico size={13}>, <Avatar size={28}>): an icon takes its
//               control's grid icon (--plx-sys-control-icon-<role>) or a size token from CSS, so it sits on the 4px grid
//   defined     every var(--plx-…) a file uses is declared somewhere (a renamed or removed token leaves no dangling use)
//   inline-style every page draws itself only with Platform components and plx- classes: no style={…}, style: {…},
//               el.style.x =, style.setProperty(…), setAttribute('style'), style="…" or style block anywhere (the Platform,
//               the design system, every application), custom properties included (Strict DS step 7, batch 283; owner: "no
//               exceptions"): a value from the data reaches the stylesheet as an attribute with one generated rule per step
//               (system/steps.css) or a class (the design system's samples: DS.varClass). Applications not yet
//               converted are listed in INLINE_STYLE_PENDING with their count, until their batch removes them (batch 150).
//   generated   the token stylesheets and the standards' code (build-standards.js: providers/pageLayouts.js, system/layout-modes.css)
//               are exactly what is generated from their JSON (platform/tokens/*.tokens.json, platform/standards/*.json);
//               the token stylesheets are exactly what build-tokens.js writes from the token source (platform/tokens/*.tokens.json):
//               tokens are edited in the JSON, never in the CSS (batch 158)
//   palette     a stylesheet takes colors from roles (--plx-sys-, --plx-comp-), never from the palette (--plx-ref-color-)
//   themeable   a stylesheet takes typefaces, weights, letter spacing, radius, border widths and styles, motion and opacity
//               from the theme's scales (--plx-sys-typeface-, -shape-, -border-width-…), never the reference scales (batch 220)
//   raw-value   no length, time or color written as a number in a stylesheet declaration (tokens only; 0 excepted)
//   palette-class an application never colors with a palette utility class (plx-u-text-gray-700…): components only
//   audit       every page loads platform/dev/style-audit.js, which rejects inline styles and style blocks at run time
//   page-layout an application never sets a page's layout mode (AppShell layout=, data-plx-layout): it says what the page is
//               (<AppShell page="settings">) and the design system's layout standard (providers/pageLayouts.js) decides
//   tables      every table is a DataTable (Tabulator in the Plenix table style): no <table>, no table element made in code, no
//               PropertyList table variant: every table is a Table (static) or a DataTable, both on Tabulator (batches
//               226, 229, 234)
//   fonts       no call to Google Fonts: DM Sans and DM Mono are hosted with the Platform (platform/fonts, batch 227)
//   media       no breakpoint written as a number in code (useMedia / matchMedia): the shell reads the breakpoint tokens
//               (below('--plx-sys-shell-rail-below')); the theme boot script, which runs before the tokens load, excepted
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const DAM = path.join(ROOT, 'dam');
const SUITE = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
const SKIP = /[\\/](node_modules|dist|vendor|Archived|archive|backups|audit|docs|handoff|capabilities|architecture|metadata|AI_CONTEXT|shared - Copy|Original 2026-09-23)([\\/]|$)/;
// files that are not part of either application (kept for reference, never loaded)
const NOT_LOADED = new Set([]);
const SOURCES = [
  { dir: path.join(ROOT, 'platform'), app: 'platform' },
  { dir: path.join(ROOT, 'suite'), app: 'suite' },
  ...SUITE.map((f) => ({ dir: path.join(ROOT, f), app: f, skip: /[\\/]app\.js$/ })),
  { dir: path.join(DAM, 'app'), app: 'asset manager', skip: /[\\/]app[\\/]assets\.js$/ },
  { dir: DAM, app: 'asset manager', flat: true },
];
const findings = [];
const ALL = process.argv.includes('--all');   // list every finding, not the first 25 of each rule
const rel = (f) => path.relative(path.dirname(ROOT), f).split(path.sep).join('/');
const lineText = (file, n) => { try { return fs.readFileSync(file, 'utf8').split('\n')[n - 1] || ''; } catch { return ''; } };
// a line of prose that names the rule (documentation in the design system) carries plx-allow-style
const add = (rule, file, line, text) => (rule === 'inline-style' && line && /plx-allow-style/.test(lineText(file, line))) ? null : findings.push({ rule, where: rel(file) + (line ? ':' + line : ''), text: text.trim().slice(0, 140) });

function walk(dir, flat, out) {
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const f = path.join(dir, e.name);
    if (SKIP.test(f)) continue;
    if (e.isDirectory()) { if (!flat) walk(f, false, out); }
    else if (/\.(css|js|jsx|html)$/.test(e.name)) out.push(f);
  }
  return out;
}
const files = [];
for (const s of SOURCES) for (const f of walk(s.dir, s.flat, [])) {
  if (s.skip && s.skip.test(f)) continue;
  if (NOT_LOADED.has(path.relative(ROOT, f).split(path.sep).join('/'))) continue;
  if (!files.some((x) => x.file === f)) files.push({ file: f, app: s.app });
}

const TOKEN_FILES = /platform[\\/]system[\\/](tokens[\\/]reference\.css|themes[\\/])/;
const TOKEN_SOURCE = /platform[\\/]system[\\/](tokens|themes)[\\/]/;   // the generated token stylesheets
// custom properties the applications declare for themselves (--ds-r on the spec page, set by a lab's script); the
// retired legacy token file does not count, so its old names stay findings
const DECLARED = new Set();
for (const { file } of files) {
  if (/tokens[\\/]legacy\.css$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(?:^|[;{\s'"])(--[a-z][a-z0-9-]*)\s*:/g)) if (!/^--plx-/.test(m[1])) DECLARED.add(m[1]);
  for (const m of text.matchAll(/setProperty\(\s*['"](--[a-z][a-z0-9-]*)/g)) DECLARED.add(m[1]);
}
// every Platform token declared anywhere (token files, themes, component stylesheets, style objects that set one)
const PLX = new Set();
for (const { file } of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/(--plx-[\w-]+)\s*:/g)) PLX.add(m[1]);
  for (const m of text.matchAll(/["'](--plx-[\w-]+)["']\s*[:,)]/g)) PLX.add(m[1]);
}
// tables, in stylesheets: no rule for the retired PropertyList table variant (every table is a Table or a DataTable on
// Tabulator, batches 226, 229, 234)
for (const { file } of files) {
  if (!/\.css$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\.plx-property-list--table\b/g)) add('tables', file, text.slice(0, m.index).split('\n').length, 'a retired table class: ' + m[0]);
}
// inline-style: application code takes its look from the Platform only (see the rule's description above)
const INLINE_STYLE_PENDING = [];   // every application converted (batches 150-151)
const pendingStyles = {};
function styleObjects(text) {   // every style={…} with its balanced body
  const out = [];
  let at = 0;
  while ((at = text.indexOf('style={', at)) >= 0) {
    let depth = 0, i = at + 6;
    for (; i < text.length; i++) { if (text[i] === '{') depth++; else if (text[i] === '}' && --depth === 0) break; }
    out.push({ at, body: text.slice(at + 7, i) });
    at = i;
  }
  return out;
}
// a custom property a page may set at run time (a value only the data knows, read by a stylesheet): Platform names, and
// on the design system page its own --ds- names
const runtimeVar = (file, name) => /^--plx-/.test(name) || (SPEC_PAGE.test(file) && /^--ds-/.test(name));
const SPEC_PAGE = /[\\/]platform[\\/]design-system[\\/]/;
for (const { file } of files) {
  if (!/\.(jsx|js|html)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const lineOf = (i) => text.slice(0, i).split('\n').length;
  // page-layout: an application says what a page is (<AppShell page="settings">); the layout standard picks the mode
  if (!/[\\/]platform[\\/]/.test(file) && !/(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<AppShell\b[^>]*?\blayout\s*=|\bdata-plx-layout\s*=|['"]data-plx-layout['"]/g)) add('page-layout', file, lineOf(m.index), text.slice(m.index, m.index + 80).split('\n')[0]);
  }
  // tables: every table is a DataTable (Tabulator in the Plenix table style, batch 226): no <table>, no table element made
  // in code, no retired Table component or its classes. The design system's builders draw a table and hand it to DS.table
  // at once (tests/pages.test.js fails any table left on a page); generated bundles are checked through their sources.
  // a name/value table is a DataTable too: no PropertyList table variant anywhere, the design system included (batch 229)
  if (!/[\\/]dist[\\/]|(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<PropertyList\b[^>]*\bvariant=["'{]+table|PropertyList,\s*\{\s*variant:\s*["']table|\bplx-property-list--table\b/g)) add('tables', file, lineOf(m.index), 'not a DataTable: ' + text.slice(m.index, m.index + 60).split('\n')[0]);
  }
  if (!SPEC_PAGE.test(file) && !/[\\/]dist[\\/]|(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/<table[\s>]|createElement\(\s*['"]table['"]|\bel\(\s*['"]table['"]|\bh\(\s*['"]table['"]/g)) {
      add('tables', file, lineOf(m.index), 'not a DataTable: ' + text.slice(m.index, m.index + 60).split('\n')[0]);
    }
  }
  // fonts: the typefaces are hosted with the Platform (platform/fonts, system/fonts.css, batch 227): no page calls Google
  if (!/[\\/]dist[\\/]|(^|[\\/])(app|assets)\.js$/.test(file)) {
    for (const m of text.matchAll(/fonts\.(googleapis|gstatic)\.com/g)) add('fonts', file, lineOf(m.index), 'a call to Google Fonts: ' + text.slice(Math.max(0, m.index - 20), m.index + 40).split('\n')[0]);
  }
  // style: in h()/createElement props: never, custom properties included (batch 283)
  for (const m of text.matchAll(/[{,]\s*style\s*:\s*/g)) {
    const at = m.index + m[0].length;
    if (/['"`]/.test(text[at])) continue;   // a data field named style (a string), not a style
    add('inline-style', file, lineOf(m.index), 'style: ' + text.slice(at, at + 80).split('\n')[0]);
  }
  // writing to an element's style from script: never, not even a custom property (batch 283)
  for (const m of text.matchAll(/\.style\s*(?:\.\s*([\w$]+)|\[)/g)) {
    const after = text.slice(m.index + m[0].length);
    if (m[1] === 'setProperty' || m[1] === 'removeProperty') { /* a write */ }
    else if (!/^(?:[^\]\n]*\])?\s*=(?!=)/.test(after)) continue;   // reading a style (a rule's cssText, a value) is not styling
    add('inline-style', file, lineOf(m.index), text.slice(m.index, m.index + 80).split('\n')[0]);
  }
  for (const m of text.matchAll(/setAttribute\(\s*['"]style['"]|\.cssText\s*=(?!=)|\bstyle="[^"]|<style[\s>]/g)) add('inline-style', file, lineOf(m.index), text.slice(m.index, m.index + 80).split('\n')[0]);
}
for (const { file, app } of files) {
  if (!/\.(jsx|js|html)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const o of styleObjects(text)) {
    // allowed: an object literal whose keys are all '--plx-…' strings (strings and nested brackets removed before looking)
    const body = o.body.trim();
    let flat = body.slice(1, -1).replace(/(['"])(--[\w-]+)\1\s*:/g, (all, q, k) => runtimeVar(file, k) ? ' PLXKEY:' : all).replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/g, 'S');
    for (let k = 0; k < 5; k++) flat = flat.replace(/\([^()]*\)|\[[^[\]]*\]|\{[^{}]*\}/g, 'X');
    void flat;   // until batch 283 an object of custom properties was allowed here; every style object is a finding now
    if (INLINE_STYLE_PENDING.includes(app)) { pendingStyles[app] = (pendingStyles[app] || 0) + 1; continue; }
    add('inline-style', file, text.slice(0, o.at).split('\n').length, 'style=' + o.body.slice(0, 100));
  }
}

for (const { file } of files) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  // a stylesheet's lines with its comments blanked (a comment may span lines), for the rules that read declarations
  const cssLines = /\.css$/.test(file) ? text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')).split(/\r?\n/) : [];
  const own = DECLARED;
  const isCss = /\.css$/.test(file), isCode = /\.(js|jsx|html)$/.test(file);
  lines.forEach((line, i) => {
    const n = i + 1;
    // defined: a used token exists (a name ending in "-" is built in code, e.g. 'var(--plx-ref-radius-' + n + 'px)')
    for (const m of line.matchAll(/var\(\s*(--plx-[a-z0-9-]*[a-z0-9])(?![\w-])/g)) if (!PLX.has(m[1])) add('defined', file, n, m[1] + ' is not declared anywhere');
    // tokens
    for (const m of line.matchAll(/var\(\s*(--[a-z][a-z0-9-]*)/g)) {
      // the design system's samples (--ds-sample-<property>) are set at run time by DS.sample (ds.js)
      if (/^--plx-(ref|sys|comp)-/.test(m[1]) || own.has(m[1]) || (SPEC_PAGE.test(file) && /^--ds-sample-[a-z-]+$/.test(m[1]))) continue;
      add('tokens', file, n, m[1] + ' in: ' + line);
    }
    // hex colors: a # with 3, 4, 6 or 8 hex digits where a value starts (after : ( , = or a quote), not in comments or
    // prose (an issue number); a color a person chose, kept as data, carries a plx-allow-hex comment on its line
    if (!TOKEN_FILES.test(file) && !/plx-allow-hex/.test(line)) {
      const code = line.replace(/\/\*.*?\*\/|\/\/.*$/g, '');
      for (const m of code.matchAll(/(?:[:(,'"=]\s*)#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b(?![\w-])/g)) {
        if (/href=|id=|url\(/.test(code.slice(Math.max(0, m.index - 12), m.index + 1))) continue;
        add('hex', file, n, '#' + m[1] + ' in: ' + line);
      }
    }
    // palette: a stylesheet takes colors from roles (--plx-sys-…, --plx-comp-…), never straight from the palette
    // (--plx-ref-color-…); only the token files and the themes map palette colors to roles
    if (isCss && !TOKEN_SOURCE.test(file)) {
      const code = cssLines[i];
      for (const m of code.matchAll(/var\(\s*(--plx-ref-color-[\w-]+)/g)) add('palette', file, n, m[1] + ' in: ' + line);
      // themeable: the foundations a theme decides come from the theme's scales (--plx-sys-typeface-, -font-weight-,
      // -letter-spacing-, -shape-, -border-width-, -border-style-, -motion-, -opacity-), never the reference scales (batch 220)
      for (const m of code.matchAll(/var\(\s*(--plx-ref-(?:font-sans|font-mono|font-weight|letter-spacing|radius|border-width|border-style|motion|opacity)[\w-]*)/g)) add('themeable', file, n, m[1] + ' in: ' + line + ' (use the theme scale, e.g. --plx-sys-shape-xs)');
      // raw-value: no length, time or color written as a number in a declaration (0 and unitless numbers excepted);
      // media and container queries cannot read custom properties, so their conditions are excepted
      if (!/^\s*@(media|container|supports)/.test(code)) {
        const decl = code.replace(/^[^{]*\{/, '').replace(/var\(--[\w-]+/g, 'V');
        for (const m of decl.matchAll(/(?<![\w-])(\d*\.?\d+)(px|rem|em|ms|s|vh|vw|ch|pt)\b|\b(rgba?|hsla?)\(/g)) {
          if (m[1] !== undefined && Number(m[1]) === 0) continue;
          add('raw-value', file, n, m[0] + ' in: ' + line);
        }
      }
    }
    // icon sizes written as numbers (Platform and applications)
    if (isCode && /<(Icon|Ico|Avatar)\b[^>]*\bsize=\{\s*\d+\s*\}/.test(line)) add('icon-size', file, n, line);
    // breakpoints written as numbers in code
    if (isCode && !/theme-boot\.js$/.test(file) && /(useMedia|matchMedia)\(\s*['"][^'"]*\d+(px|rem|em)/.test(line)) add('media', file, n, line);
    // font sizes written as numbers
    if (!/tokens[\\/]/.test(file)) {
      if (isCss && /font-size\s*:\s*[0-9.]+(px|rem|em|pt)/.test(line)) add('font-size', file, n, line);
      if (isCode && /fontSize\s*[:=]\s*['"]?[0-9.]+(px|rem|em|pt)?['"]?\s*[,}]/.test(line)) add('font-size', file, n, line);
      if (isCode && /font-size\s*:\s*[0-9.]+(px|rem|em|pt)/.test(line)) add('font-size', file, n, line);
    }
  });
  // classes a Platform stylesheet defines
  if (isCss && /[\\/]platform[\\/](system|components|patterns)[\\/]/.test(file)) {
    const css = text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/url\([^)]*\)/g, '');
    const sel = css.replace(/\{[^{}]*\}/g, '{}');
    for (const m of sel.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) {
      if (/^(plx-|is-)/.test(m[1])) continue;
      // the DataTable's stylesheet restyles the classes its engine writes (Tabulator, platform/vendor/tabulator): there only
      if (/^tabulator(-|$)/.test(m[1]) && /[\\/]components[\\/](DataTable[\\/]data-table|Table[\\/]table)(-steps)?\.css$/.test(file)) continue;
      add('classes', file, 0, '.' + m[1] + ' is not a plx- class');
    }
  }
  // the asset app: no embedded pictures
  if (/[\\/]Plenix[\\/]dam[\\/]/.test(file)) {
    lines.forEach((line, i) => {
      if (/data:(image|font|application)\//.test(line)) add('embedded', file, i + 1, 'data: URI in: ' + line);
      if (/<svg[\s>]/.test(line)) add('embedded', file, i + 1, 'embedded SVG in: ' + line);
    });
  }
}

// palette-class: an application never colors with a palette utility (plx-u-text-gray-700, plx-u-bg-white…): its look comes
// from Platform components and their tokens (the owner, batches 199–202)
for (const { file, app } of files) {
  if (app === 'platform' || !/\.(jsx|js|html)$/.test(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/plx-u-(?:bg|text|border|border-[trbl]|accent|outline)-(?:white|black|gray-\d+|blue-\d+|red-\d+|green-\d+|brown-\d+|purple-\d+)(?![\w-])/g)) add('palette-class', file, text.slice(0, m.index).split('\n').length, m[0]);
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
// legacy files stay gone
for (const f of [path.join(ROOT, 'shared'), path.join(ROOT, 'platform', 'system', 'tokens', 'legacy.css'), path.join(DAM, 'plenix.css'), path.join(DAM, 'demo.css')]) {
  if (fs.existsSync(f)) add('legacy', f, 0, 'retired file or folder is back');
}

const byRule = {};
for (const f of findings) (byRule[f.rule] = byRule[f.rule] || []).push(f);
for (const rule of Object.keys(byRule)) {
  console.log(rule + ': ' + byRule[rule].length);
  byRule[rule].slice(0, ALL ? undefined : 25).forEach((f) => console.log('  ' + f.where + '  ' + f.text));
  if (!ALL && byRule[rule].length > 25) console.log('  … and ' + (byRule[rule].length - 25) + ' more');
}
if (Object.keys(pendingStyles).length) console.log('inline styles still to convert (INLINE_STYLE_PENDING): ' + Object.keys(pendingStyles).map((a) => a + ' ' + pendingStyles[a]).join(', '));
console.log(findings.length ? 'SYSTEM_FAIL (' + findings.length + ' findings in ' + files.length + ' files)' : 'SYSTEM_OK (' + files.length + ' files)');
process.exit(findings.length ? 1 : 0);
