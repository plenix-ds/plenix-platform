// Checks the design system specification (platform/design-system/) against its standard (platform/design-system/STANDARD.md):
//   node check-spec.js
// Exits with 1 and lists every finding when a rule is broken. Rules still being built are listed in PENDING with the
// batch that completes them: their findings are reported (as pending) but do not fail the check until that entry is
// removed, so the gaps stay visible and nothing drifts back once a rule is done.
//
//   taxonomy   inventory-taxonomy.js has exactly the sections, subcategories and leaves of STANDARD.md §2–§3, in order
//   records    every inventory record has one canonical home: a section, subcategory and leaf that exist in the taxonomy,
//              and no two records claim the same leaf; the library parts' records (spec-parts.js) included
//   parts      every library part (platform/design-system/parts/, bundled into spec-parts.js) loads and its records build
//   sidebar    the sidebar lists every leaf (Plenix decision 1)
//   order      the item page has the template's sections in the approved order (Plenix decision 2)
//   variants   every variant class a record's stylesheet defines (block--modifier) has its own variant card (decision 5)
//   states     every interactive record has a States table (decision 6)
//   api        every component, pattern, provider and hook file opens with the structured header comment (batch 162):
//              "/* Plenix · Name", then Summary:, Usage:, Props: (and Behavior:, Notes:) at a 3-space indent
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SPEC = path.join(__dirname, 'platform', 'design-system');
const PLATFORM = path.join(__dirname, 'platform');
const PENDING = {};
const ORDER = [['purpose', 'Overview and Purpose'], ['guide', 'Usage (When to use, When not to use)'], ['exh', 'Variants'], ['states', 'States'],
  ['anat', 'Anatomy'], ['behavior', 'Behavior'], ['platforms', 'Platforms'], ['a11y', 'Accessibility'], ['content', 'Content guidance'], ['impl', 'Implementation'],
  ['assets', 'Design assets'], ['rel', 'Related items'], ['map', 'Source-system mappings'], ['details', 'Details and Lifecycle']];
const INTERACTIVE = new Set(['Action', 'Input', 'Selection', 'Navigation', 'Search', 'Filter', 'Disclosure', 'Editing', 'Drag and drop']);

const findings = {};
const add = (rule, msg) => { (findings[rule] = findings[rule] || []).push(msg); };
const read = (f) => fs.readFileSync(f, 'utf8');

// ── the standard's taxonomy (§3): "## NN. Title" then a text tree; depth 1 = subcategory, depth 2 = leaf
function standardTaxonomy() {
  const md = read(path.join(SPEC, 'STANDARD.md')).replace(/\r\n/g, '\n');   // either line ending
  const part = md.slice(md.indexOf('## 3. Canonical hierarchy'), md.indexOf('## 4. Classification standard'));
  const out = [];
  for (const block of part.split(/\n```text\n/).slice(1)) {
    const lines = block.slice(0, block.indexOf('\n```')).split('\n');
    const head = lines[0].match(/^(\d\d)\. (.+)$/);
    if (!head) continue;
    const sec = { n: head[1], title: head[2], subs: [] };
    for (const l of lines.slice(1)) {
      const m = l.match(/^((?:[│ ] {3})*)[├└]── (.+)$/);
      if (!m) continue;
      if (m[1].length === 0) sec.subs.push([m[2], []]);
      else sec.subs[sec.subs.length - 1][1].push(m[2]);
    }
    // a section with no subcategories lists its leaves directly: one unnamed subcategory (batch 325)
    if (sec.subs.length && sec.subs.every((x) => !x[1].length)) sec.subs = [['', sec.subs.map((x) => x[0])]];
    out.push(sec);
  }
  return out;
}

// files: one file, or several run in order in one context (the library parts, spec-parts.js, before inventory.js)
function load(files, global) {
  const ctx = { window: {}, console, React: { createElement: (...a) => ({ type: a[0], props: a[1] || {}, children: a.slice(2) }), useState: (v) => [v, () => {}] } };
  ctx.window.React = ctx.React; ctx.window.Plenix = new Proxy({}, { get: (_, k) => k });
  vm.createContext(ctx);
  [].concat(files).filter((f) => fs.existsSync(f)).forEach((f) => vm.runInContext(read(f), ctx, { filename: path.basename(f) }));
  let v = ctx.window[global]; if (typeof v === 'function') v = v();
  if (ctx.window.DSParts) (ctx.window.DSParts.errors || []).forEach((e) => add('parts', e));
  return v;
}

const std = standardTaxonomy();
const tax = load(path.join(SPEC, 'inventory-taxonomy.js'), 'DSTaxonomy');
const recs = load([path.join(SPEC, 'spec-parts.js'), path.join(SPEC, 'inventory.js')], 'DSInventory');

// taxonomy
if (std.length !== tax.length) add('taxonomy', 'STANDARD.md §3 has ' + std.length + ' sections, inventory-taxonomy.js ' + tax.length);
std.forEach((s, i) => {
  const t = tax[i];
  if (!t) return add('taxonomy', s.n + ' ' + s.title + ': missing from inventory-taxonomy.js');
  if (t.n !== s.n || t.title !== s.title) add('taxonomy', 'section ' + (i + 1) + ': "' + t.n + ' ' + t.title + '" should be "' + s.n + ' ' + s.title + '"');
  s.subs.forEach((sub, j) => {
    const ts = t.subs[j];
    if (!ts) return add('taxonomy', s.n + ' › ' + sub[0] + ': missing');
    if (ts[0] !== sub[0]) add('taxonomy', s.n + ' subcategory ' + (j + 1) + ': "' + ts[0] + '" should be "' + sub[0] + '"');
    const leaves = ts[1].split('|');
    if (leaves.join('|') !== sub[1].join('|')) add('taxonomy', s.n + ' › ' + sub[0] + ': leaves differ (' + leaves.filter((x) => !sub[1].includes(x)).concat(sub[1].filter((x) => !leaves.includes(x)).map((x) => 'missing ' + x)).join(', ') + ')');
  });
  if (t.subs.length > s.subs.length) add('taxonomy', s.n + ': extra subcategories ' + t.subs.slice(s.subs.length).map((x) => x[0]).join(', '));
});
if (tax.length > std.length) add('taxonomy', 'extra sections in inventory-taxonomy.js');

// records: one canonical home each
const leafOf = {};
tax.forEach((t) => t.subs.forEach((s) => s[1].split('|').forEach((l) => { leafOf[t.id + '|' + s[0] + '|' + l] = true; })));
const claimed = {}, ids = {};
recs.forEach((r) => {
  if (ids[r.id]) add('records', r.id + ': two records have this id');
  ids[r.id] = true;
  const key = r.sec + '|' + r.sub + '|' + r.leaf;
  if (!leafOf[key]) add('records', r.id + ': "' + r.sec + ' › ' + r.sub + ' › ' + r.leaf + '" is not a leaf of the taxonomy');
  if (claimed[key]) add('records', r.id + ' and ' + claimed[key] + ' claim the same leaf (' + r.leaf + ')');
  claimed[key] = r.id;
});

// the item page: spec.js declares what the sidebar lists and the page's section order
const spec = read(path.join(SPEC, 'spec.js'));
if (!/SIDEBAR_LISTS_EVERY_LEAF\s*=\s*true/.test(spec)) add('sidebar', 'the sidebar lists only the items with a Plenix page, not every leaf of §3');
const fromItem = spec.slice(spec.indexOf('function ItemPage'));
const toc = fromItem.slice(fromItem.indexOf('var TOC = '), fromItem.indexOf('body = body.map'));
const keys = [...toc.matchAll(/\['(\w+)'/g)].map((m) => m[1]);
let at = -1;
ORDER.forEach(([k, label]) => {
  const i = keys.indexOf(k);
  if (i < 0) add('order', 'the item page has no "' + label + '" section');
  else if (i < at) add('order', '"' + label + '" comes before the section it should follow');
  else at = i;
});

// variants: every block--modifier class has a card (a variant entry whose third item names it: [name, render, 'plx-…--…'])
const cssOf = (r) => {
  if (!r.src) return '';
  const dir = path.join(PLATFORM, path.dirname(r.src));
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.css')).map((f) => read(path.join(dir, f))).join('\n') : '';
};
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const blocksOf = (r) => r.blocks || (r.src && /^(components|patterns)\//.test(r.src) ? ['plx-' + kebab(r.src.split('/').slice(-2)[0])] : null);
// classes that look like variants but are not chosen by whoever uses the component (each has its reason; they are
// documented under the component's Behavior or Names)
const NOT_VARIANTS = {
  'plx-data-table--fill': 'a sizing state the height prop sets (height="100%": the grid fills its container), not a look',
  'plx-button--joined': 'set by a group (ButtonGroup, InputGroup, CopyButton field); shown on its page',
  'plx-button--joined-start-square': 'set by a group',
  'plx-button--joined-start-seam': 'set by a group',
  'plx-button--joined-end-square': 'set by a group',
  'plx-button--joined-end-seam': 'set by a group',
  'plx-select--joined': 'set by InputGroup; shown on its page',
  'plx-select--joined-start-square': 'set by InputGroup',
  'plx-select--joined-start-seam': 'set by InputGroup',
  'plx-select--joined-end-square': 'set by InputGroup',
  'plx-select--joined-end-seam': 'set by InputGroup',
  'plx-button--secondary': 'the default variant: its variant page (Secondary (default)) and the base rule draw it; the class appears in the stylesheet only for buttons on a colored surface',
  'plx-nav-pane--inline': 'a responsive mode the shell sets (the pane opens over the main region on narrow windows)',
  'plx-nav-pane--overlay': 'a responsive mode the shell sets',
  'plx-nav-pane--screen': 'a responsive mode the shell sets (Narrow windows: the pane is a screen of its own; Platforms Standard 4.1)',
  'plx-side-panel--overlay': 'a responsive mode the shell sets (the inspector opens over the main region)',
  'plx-app-header__item--account': 'AppHeader.Account sets it on its own item (no fill around the picture)',
  'plx-side-panel--resized': 'a state the panel sets once someone drags its edge (the resizable card shows it)',
};
const ICON_NAMES = new Set(Object.keys(JSON.parse(read(path.join(PLATFORM, 'icons', 'map.json'))).map).map((n) => 'plx-icon--' + n));
const claimedMods = new Set();
recs.forEach((r) => { (r.blocks || []).forEach((b) => claimedMods.add(b)); });
recs.forEach((r) => {
  const blocks = blocksOf(r);
  if (!blocks || (!r.blocks && claimedMods.has(blocks[0]))) return;
  const css = cssOf(r);
  const mods = new Set();
  blocks.forEach((b) => { for (const m of css.matchAll(new RegExp('\\.(' + b + '--[a-z0-9-]+)', 'g'))) mods.add(m[1]); });
  const shown = new Set();
  (r.examples || []).forEach((e) => { if (Array.isArray(e[1])) e[1].forEach((v) => { if (v[2]) [].concat(v[2]).forEach((c) => shown.add(c)); }); });
  const own = r.variantClasses ? new Set(r.variantClasses) : null;
  // a modifier another record claims as its block (Table: plx-data-table--static) is shown on that record's page
  const missing = [...mods].filter((m) => !shown.has(m) && !claimedMods.has(m) && !NOT_VARIANTS[m] && !ICON_NAMES.has(m) && (!own || own.has(m)));
  if (missing.length) add('variants', r.id + ': no card for ' + missing.join(', '));
});

// states
// a record's states come from its hand-written table (r.states) or from its stylesheet's state rules (the spec reads them)
const STATE_RE = /:hover|:focus-visible|:focus(?![\w-])|:disabled|:checked|\[aria-(selected|pressed|checked|current|disabled|invalid|busy|expanded|readonly)|\[readonly\]|\.is-(selected|current|loading|active|pressed|error|success|expanded)(?![\w-])/;
recs.forEach((r) => {
  if (!INTERACTIVE.has(r.interaction) || r.states || r.statesFrom || r.stateNote) return;
  const blocks = blocksOf(r) || [];
  const css = cssOf(r).replace(/\/\*[\s\S]*?\*\//g, '');
  const all = css.match(/[^{}]+\{[^{}]*\}/g) || [];
  const own = all.filter((rule) => blocks.some((b) => rule.split('{')[0].includes('.' + b)));
  const mine = r.blocks ? own : all;   // without its own blocks the spec reads the whole stylesheet of its folder
  if (!mine.some((rule) => STATE_RE.test(rule.split('{')[0]))) add('states', r.id + ' (' + r.interaction + '): no States table and no state rules in its stylesheet' + (r.stateNote ? '' : ''));
});

// api: the structured header comment
for (const dir of ['components', 'patterns', 'providers', 'hooks']) {
  const base = path.join(PLATFORM, dir);
  const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => f.isDirectory() ? walk(path.join(d, f.name)) : [path.join(d, f.name)]);
  for (const f of walk(base).filter((x) => /\.(jsx|js)$/.test(x) && !/apps\.js$/.test(x))) {
    const c = (read(f).match(/^\s*\/\*([\s\S]*?)\*\//) || [])[1] || '';
    const rel = path.relative(PLATFORM, f).split(path.sep).join('/');
    if (!/^ Plenix · [^\n:]+\r?\n/.test(c)) add('api', rel + ': the first line is not "/* Plenix · Name"');
    for (const sec of ['Summary', 'Usage', 'Props']) if (!new RegExp('\\n {3}' + sec + ':').test(c)) add('api', rel + ': no ' + sec + ': section');
  }
}

// report
let failed = 0;
for (const rule of ['taxonomy', 'records', 'parts', 'sidebar', 'order', 'variants', 'states', 'api']) {
  const list = findings[rule] || [];
  const pending = PENDING[rule];
  if (!list.length) { console.log('ok       ' + rule); continue; }
  if (pending) { console.log('pending  ' + rule + ' (' + list.length + ', until ' + pending + ')'); list.slice(0, process.env.ALL ? 999 : 5).forEach((m) => console.log('           ' + m)); if (list.length > 5 && !process.env.ALL) console.log('           … and ' + (list.length - 5) + ' more'); continue; }
  failed += list.length;
  console.log('FAIL     ' + rule + ' (' + list.length + ')'); list.forEach((m) => console.log('           ' + m));
}
console.log(failed ? '\n' + failed + ' finding(s)' : '\nSPEC_OK (' + std.reduce((n, s) => n + s.subs.reduce((m, x) => m + x[1].length, 0), 0) + ' leaves, ' + recs.length + ' records)');
process.exit(failed ? 1 : 0);
