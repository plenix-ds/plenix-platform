// Plenix · check-system rule "selector-kinds" (owner, 2026-10-19: zero overlap; the Plenix Styling Standard,
// platform/standards/styling.md, 3.5 and 3.6). Every selector is one of five kinds:
//   component    one compound of one block's own class, its modifiers and states, its pseudo-elements; no combinator
//   behavior     one compound of a named behavior's own attributes (data-plx-<behavior>…), no plx- class
//   foundation   :root (and its mode attributes) or a mode context ([data-plx-theme|mode|density|interaction]) setting
//                custom properties only; :root may also set color-scheme
//   base         raw HTML: :where(<el>:not([class*="plx-"])), html, body and the reset (*, *::before, *::after)
//   condition    :root inside a global condition (reduced motion, forced colors, contrast; a mode change in progress),
//                custom properties only
// A selector that is none of them is a finding, named by why:
//   nesting               CSS nesting syntax (&) or a rule inside a rule
//   combinator            a descendant, child or sibling combinator, also inside :is(), :not() or :where()
//   relational            :has()
//   cross-block           classes of two blocks in one compound
//   unowned               no class and no behavior: a bare state class (.is-…), an ARIA attribute or a pseudo-class alone
//   base-unguarded        a raw element without :not([class*="plx-"]) (it would reach a component's element)
//   mixed-behavior        attributes of two behaviors in one compound
//   condition-not-token   a rule in a global condition that is not :root setting custom properties
//   foundation-property   a mode context setting a property that is not a custom property
// And one more, for the variables: state-unregistered  a --plx-state-… variable assigned somewhere but not
// registered in an @property rule with inherits: false (a state variable must never inherit; 4.1).
// What it reads: every stylesheet of the Platform (generated ones included: they are what ships), the design-system
// site and the services; not platform/vendor, dist, packages (copies) or the studies.
// The rollout backlog: check-system.selector-kinds.json lists, by file, every finding (kind | selector: count) that
// existed when the rule began. Anything new fails; an entry that no longer occurs fails until the list is shrunk:
//   node check-system.rules/selector-kinds.js            SELECTOR_KINDS_OK, or the findings (exit 1)
//   node check-system.rules/selector-kinds.js --shrink   lowers or removes entries that no longer occur (never adds)
//   node check-system.rules/selector-kinds.js --summary  the backlog and today's findings, by kind and by file
//   node check-system.rules/selector-kinds.js --baseline writes the backlog from today's findings (once, at the start)
// The classifier is exported (classify, parse) and proven by tests/selector-kinds.test.js on
// tests/fixtures/zero-overlap/selector-kinds.css.
const fs = require('fs');
const path = require('path');

const NAME = 'selector-kinds';
const ROOT = path.join(__dirname, '..');
const BACKLOG = path.join(ROOT, 'check-system.selector-kinds.json');
const SKIP = /[\\/](node_modules|dist|vendor|release|\.claude|exports)[\\/]/;
const MODES = ['theme', 'mode', 'density', 'interaction'];
// the conditions that change token values only (3.6, condition)
const GLOBAL_CONDITION = /prefers-reduced-motion|forced-colors|prefers-contrast|inverted-colors/;
const CONDITION_ATTR = /\[data-plx-density-changing\]/;

function cssFiles() {
  const out = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP.test(p + path.sep)) walk(p); }
    else if (e.name.endsWith('.css') && !SKIP.test(p)) out.push(p);
  } };
  walk(path.join(ROOT, 'platform')); walk(path.join(ROOT, 'services'));
  return out.sort();
}
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');

// a stylesheet as rules: { sel, line, decls: [[prop, value]], at: [preludes of the enclosing at-rules], nested }
// and its @property registrations: { name, inherits }
function parse(text) {
  const src = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const rules = [], props = [], stack = [];
  let buf = '', paren = 0, line = 1, bufLine = 1;
  const decls = (body) => { const out = []; let d = 0, cur = ''; for (const ch of body) { if (ch === '(') d++; else if (ch === ')') d--; if (ch === ';' && !d) { out.push(cur); cur = ''; } else cur += ch; } out.push(cur);
    return out.map((x) => x.trim()).filter(Boolean).map((x) => { const i = x.indexOf(':'); return [x.slice(0, i).trim().toLowerCase(), x.slice(i + 1).trim()]; }).filter((x) => x[0]); };
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (ch === '\n') line++;
    if (ch === '"' || ch === "'") { const j = src.indexOf(ch, i + 1); const s = src.slice(i, j + 1); buf += s; line += (s.match(/\n/g) || []).length; i = j; continue; }
    if (!buf.trim()) bufLine = line;
    if (ch === '(') paren++; else if (ch === ')') paren--;
    if (paren) { buf += ch; continue; }
    if (ch === '{') {
      const top = stack[stack.length - 1];
      // a rule inside a rule (CSS nesting): the parent's declarations end at the last semicolon, the rest is the selector
      const nested = stack.some((x) => x.type === 'rule');
      let prelude = buf.trim();
      if (nested && top.type === 'rule') { const k = buf.lastIndexOf(';'); top.body = (top.body || '') + buf.slice(0, k + 1); prelude = buf.slice(k + 1).trim(); }
      buf = '';
      if (prelude.startsWith('@')) stack.push({ type: 'at', prelude, nested });
      else stack.push({ type: 'rule', sel: prelude.replace(/\s+/g, ' '), line: bufLine, nested, parent: nested ? [...stack].reverse().find((x) => x.type === 'rule') : null });
      continue;
    }
    if (ch === '}') {
      const top = stack.pop();
      if (top && top.type === 'rule') {
        const body = (top.body || '') + buf;
        const at = stack.filter((x) => x.type === 'at').map((x) => x.prelude);
        if (!at.some((p) => /^@(keyframes|-webkit-keyframes|font-face|page|counter-style|font-feature-values)/.test(p))) rules.push({ sel: top.parent ? top.parent.sel + ' & ' + top.sel : top.sel, line: top.line, decls: decls(body), at, nested: top.nested });
      } else if (top && top.type === 'at' && /^@property\s/.test(top.prelude)) {
        const d = decls(buf); const inh = (d.find((x) => x[0] === 'inherits') || [])[1];
        props.push({ name: top.prelude.replace(/^@property\s+/, '').trim(), inherits: inh ? inh.trim() !== 'false' : true });
      }
      buf = ''; continue;
    }
    // a statement outside any rule (@import, @layer a, b;) ends here
    if (ch === ';' && !stack.some((x) => x.type === 'rule') && !(stack.length && /^@(property|font-face|page)/.test(stack[stack.length - 1].prelude || ''))) { buf = ''; continue; }
    buf += ch;
  }
  return { rules, props };
}

// a selector list split at its top-level commas
function splitList(t) { const out = []; let d = 0, cur = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') d--; if (ch === ',' && !d) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; }
// the selector with the contents of every (…) and […] removed
function bare(sel) { let out = '', d = 0; for (const ch of sel) { if (ch === '(' || ch === '[') { d++; if (d === 1) out += ch; continue; } if (ch === ')' || ch === ']') { d--; if (!d) out += ch; continue; } if (!d) out += ch; } return out; }
// the arguments of every functional pseudo-class of the selector (:is, :not, :where, :has), at every depth
function pseudoArgs(sel) {
  const out = [];
  const re = /:(is|not|where|has|matches|-webkit-any)\(/g; let m;
  while ((m = re.exec(sel))) { let d = 1, j = m.index + m[0].length; const s = j; while (j < sel.length && d) { if (sel[j] === '(') d++; else if (sel[j] === ')') d--; j++; } const inner = sel.slice(s, j - 1); out.push({ fn: m[1], args: splitList(inner) }); out.push(...pseudoArgs(inner)); }
  return out;
}
const hasCombinator = (s) => /[\s>+~]/.test(bare(s).trim());
// a class's block: plx-button--ghost -> plx-button; a utility (plx-u-…) is its own block; the design-system site's
// classes (ds-…, lab-…) are blocks of the site. State classes (is-…, has-…) belong to the element they sit on.
const blockOf = (c) => (/^plx-u-/.test(c) ? c : c.replace(/(__|--).*$/, ''));
const isState = (c) => /^(is|has)-/.test(c);
const RAW_GUARD = /:not\(\[class\*=["']?plx-["']?\]\)/;

// one selector -> { kind } or { problem }
function classify(sel, ctx = {}) {
  const at = ctx.at || [], decls = ctx.decls || [];
  const custom = decls.length > 0 && decls.every(([p]) => p.startsWith('--'));
  const inCondition = at.some((p) => GLOBAL_CONDITION.test(p)) || CONDITION_ATTR.test(sel);
  if (ctx.nested || /&/.test(bare(sel))) return { problem: 'nesting' };
  const args = pseudoArgs(sel);
  if (args.some((a) => /^has$/.test(a.fn))) return { problem: 'relational' };
  if (hasCombinator(sel) || args.some((a) => a.args.some(hasCombinator))) return { problem: 'combinator' };
  const classes = [...sel.matchAll(/\.(-?[a-zA-Z_][a-zA-Z0-9_-]*)/g)].map((m) => m[1]);
  const blocks = [...new Set(classes.filter((c) => !isState(c)).map(blockOf))];
  if (inCondition) {
    if (/^:root\b/.test(sel) && !blocks.length && custom) return { kind: 'condition' };
    return { problem: 'condition-not-token' };
  }
  if (blocks.length > 1) return { problem: 'cross-block' };
  if (blocks.length === 1) return { kind: 'component', block: blocks[0] };
  // no plx- class
  const b = bare(sel).trim();
  if (/^:root\b/.test(b) || /^html\b/.test(b)) return custom || decls.every(([p]) => p.startsWith('--') || p === 'color-scheme') ? { kind: 'foundation' } : { kind: 'base' };
  if (/^(\*|\*::?before|\*::?after|body|::selection|::backdrop)$/.test(b)) return { kind: 'base' };
  // :where(el:not([class*="plx-"]), …) or el:not([class*="plx-"])
  const raw = (s) => /^[a-z][a-z0-9]*\b/.test(s) && RAW_GUARD.test(s);
  const w = sel.match(/^:where\((.*)\)$/);
  if (w && splitList(w[1]).every(raw)) return { kind: 'base' };
  if (w && splitList(w[1]).some((s) => /^[a-z][a-z0-9]*\b/.test(s) && !RAW_GUARD.test(s))) return { problem: 'base-unguarded' };
  if (raw(sel)) return { kind: 'base' };
  if (/^[a-z][a-z0-9]*\b/.test(b) && !/\[data-plx-/.test(sel)) return { problem: 'base-unguarded' };
  // attributes only: a mode context or a behavior
  const names = [...new Set([...sel.matchAll(/\[data-(?:plx|ds)-([a-z0-9]+)/g)].map((m) => m[1]))];
  if (names.length && names.every((n) => MODES.includes(n))) return custom ? { kind: 'foundation' } : { problem: 'foundation-property' };
  if (names.length === 1) return { kind: 'behavior', behavior: names[0] };
  if (names.length > 1) return { problem: 'mixed-behavior' };
  return { problem: 'unowned' };
}

// the state variables assigned but not registered with inherits: false, over parsed sheets [{ file, rules, props }]
function unregisteredStates(sheets) {
  const assigned = {}, registered = {};
  for (const { file, rules, props } of sheets) {
    props.forEach((p) => { if (!registered[p.name] || !p.inherits) registered[p.name] = p; });
    rules.forEach((x) => x.decls.forEach(([p]) => { if (/^--plx-state-/.test(p)) (assigned[p] = assigned[p] || []).push({ file, line: x.line }); }));
  }
  return Object.entries(assigned).filter(([name]) => !registered[name] || registered[name].inherits).map(([name, at]) => ({ name, file: at[0].file, line: at[0].line }));
}
function measure() {
  const found = {}, where = [], sheets = [];
  for (const f of cssFiles()) {
    const r = rel(f), { rules, props } = parse(fs.readFileSync(f, 'utf8'));
    sheets.push({ file: r, rules, props });
    for (const x of rules) {
      for (const s of splitList(x.sel)) {
        const c = classify(s, x); if (!c.problem) continue;
        const key = c.problem + ' | ' + s;
        const k = found[r] = found[r] || {}; k[key] = (k[key] || 0) + 1;
        where.push({ file: r, key, line: x.line, problem: c.problem, sel: s });
      }
    }
  }
  for (const u of unregisteredStates(sheets)) {
    const key = 'state-unregistered | ' + u.name; const k = found[u.file] = found[u.file] || {}; k[key] = (k[key] || 0) + 1;
    where.push({ file: u.file, key, line: u.line, problem: 'state-unregistered', sel: u.name });
  }
  return { found, where };
}
const readBacklog = () => (fs.existsSync(BACKLOG) ? JSON.parse(fs.readFileSync(BACKLOG, 'utf8')).files || {} : {});
function check({ add }) {
  const { found, where } = measure(), bl = readBacklog(), seen = {};
  for (const w of where) {
    const id = w.file + '|' + w.key; seen[id] = (seen[id] || 0) + 1;
    if (seen[id] > ((bl[w.file] || {})[w.key] || 0)) add(NAME, path.join(ROOT, w.file), w.line, w.problem + ' (Styling Standard 3.6): ' + w.sel.slice(0, 100));
  }
  // a listed file that is not here (the design system is a private submodule, absent in CI) is not judged
  for (const file of Object.keys(bl).filter((f) => fs.existsSync(path.join(ROOT, f)))) for (const k of Object.keys(bl[file])) {
    if (((found[file] || {})[k] || 0) < bl[file][k]) add(NAME, BACKLOG, 0, 'repaired, still listed: ' + file + ' ' + k.slice(0, 90) + ' (run node check-system.rules/selector-kinds.js --shrink)');
  }
}
const DESCRIPTION = 'The rollout backlog of zero overlap (the Plenix Styling Standard, platform/standards/styling.md, 3.5 and 3.6), recorded 2026-10-19: by file, every selector that is not one of the five kinds, as "finding | selector": count. It is the to-do list of the rollout, not a list of exceptions: check-system.rules/selector-kinds.js fails on anything new and on any entry that no longer occurs, the list only shrinks (node check-system.rules/selector-kinds.js --shrink), and the rollout ends when it is empty.';
function write(files) { fs.writeFileSync(BACKLOG, JSON.stringify({ $description: DESCRIPTION, files }, null, 1) + '\n'); }
function shrink() {
  const { found } = measure(), bl = readBacklog(), out = {};
  for (const file of Object.keys(bl)) for (const k of Object.keys(bl[file])) {
    const n = !fs.existsSync(path.join(ROOT, file)) ? (/design-system/.test(file) ? bl[file][k] : 0) : Math.min(bl[file][k], (found[file] || {})[k] || 0);
    if (n) (out[file] = out[file] || {})[k] = n;
  }
  write(out); return out;
}
function summary(files) {
  const byKind = {}, byFile = {};
  for (const [f, m] of Object.entries(files)) for (const [k, n] of Object.entries(m)) { const kind = k.split(' | ')[0]; byKind[kind] = (byKind[kind] || 0) + n; byFile[f] = (byFile[f] || 0) + n; }
  return { byKind, byFile, total: Object.values(byKind).reduce((a, b) => a + b, 0) };
}
module.exports = { check, measure, classify, parse, splitList, unregisteredStates, NAME };

if (require.main === module) {
  if (process.argv.includes('--baseline')) { const { found } = measure(); write(found); const s = summary(found); console.log('backlog written: ' + s.total + ' findings ' + JSON.stringify(s.byKind)); process.exit(0); }
  if (process.argv.includes('--shrink')) { const s = summary(shrink()); console.log('backlog: ' + s.total + ' findings ' + JSON.stringify(s.byKind)); }
  if (process.argv.includes('--summary')) {
    const now = summary(measure().found), bl = summary(readBacklog());
    console.log('backlog ' + bl.total + ' ' + JSON.stringify(bl.byKind) + '\ntoday   ' + now.total + ' ' + JSON.stringify(now.byKind));
    Object.entries(now.byFile).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([f, n]) => console.log(String(n).padStart(6) + '  ' + f));
    process.exit(0);
  }
  const out = [];
  check({ add: (rule, file, line, text) => out.push(rel(file) + ':' + line + '  ' + text) });
  if (!out.length) { console.log('SELECTOR_KINDS_OK'); process.exit(0); }
  console.log(out.slice(0, 40).join('\n') + '\n' + out.length + ' finding(s)');
  process.exit(1);
}
