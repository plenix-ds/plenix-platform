// Plenix · check-system rule "ownership" (owner, 2026-10-18: the Plenix Styling Standard, platform/standards/styling.md,
// sections 4, 8 and 13). Two gates, so the backlog can only shrink:
//   cross-component   a selector that reaches into another component's classes: a plx- class of one block in an
//                     ancestor or sibling part of the selector, and a plx- class of another block on the element it
//                     styles. A parent changes a child only through the child's props, variants or published tokens.
//                       .plx-app-header__item .plx-avatar { … }     finding (app-header styles avatar)
//                       .plx-card .plx-card__title { … }            ok (its own anatomy; flat selectors are section 9)
//                       [data-theme="dark"] .plx-button { … }       ok (no other block)
//   (an !important declaration is Stylelint's now: declaration-no-important, an error; .stylelintrc.json. Cascade layers order the categories instead, section 8.)
// What it reads: every CSS file of the Platform, the design-system site and the services, not the generated ones (a
// "GENERATED" header), the vendored ones (platform/vendor) or the studies (docs/). Comments and the contents of
// functional pseudo-classes (:not(), :is(), :where(), :has()) are not read.
// The backlog: check-system.exceptions.json lists, by file, the selectors (with their count) that
// existed when the gate began (2026-10-18). A finding not in the list fails; an entry that no longer occurs also
// fails, until it is removed. Shrink the list after a repair with: node check-system.rules/ownership.js --shrink
// (it only removes or lowers entries, never adds).
// The rule is a module check-system.js runs: require('./check-system.rules/ownership.js').check({ add })
// Alone: node check-system.rules/ownership.js [--shrink]   -> OWNERSHIP_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'ownership';
const ROOT = path.join(__dirname, '..');
const EXCEPTIONS = path.join(ROOT, 'check-system.exceptions.json');
const SKIP = /[\\/](node_modules|dist|vendor|release|\.claude)[\\/]/;
// tested on the path inside the repository, so a checkout that itself lives under .claude/ (a worktree) is still read (#307)
const skip = (p) => SKIP.test(path.sep + path.relative(ROOT, p) + path.sep);

function cssFiles() {
  const out = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!skip(p + path.sep)) walk(p); }
    else if (e.name.endsWith('.css') && !skip(p) && !/GENERATED/.test(fs.readFileSync(p, 'utf8').slice(0, 300))) out.push(p);
  } };
  walk(path.join(ROOT, 'platform')); walk(path.join(ROOT, 'services'));
  return out.sort();
}
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
// the block of a plx- class: plx-app-header__item -> plx-app-header, plx-button--ghost -> plx-button
const blockOf = (c) => c.replace(/(__|--).*$/, '');
// a selector list split at its top-level commas
function splitList(t) { const out = []; let d = 0, cur = ''; for (const ch of t) { if (ch === '(' || ch === '[') d++; else if (ch === ')' || ch === ']') d--; if (ch === ',' && !d) { out.push(cur.trim()); cur = ''; } else cur += ch; } if (cur.trim()) out.push(cur.trim()); return out; }
// the selector without the contents of functional pseudo-classes and attribute values
function bare(sel) { let out = '', d = 0; for (const ch of sel) { if (ch === '(' || ch === '[') { d++; if (d === 1) out += ch; continue; } if (ch === ')' || ch === ']') { d--; if (!d) out += ch; continue; } if (!d) out += ch; } return out; }
function crossComponent(sel) {
  const parts = bare(sel).trim().split(/\s*[\s>+~]\s*/).filter(Boolean);
  if (parts.length < 2) return null;
  const blocks = (p) => [...new Set((p.match(/\.plx-[a-z0-9_-]+/g) || []).map((c) => blockOf(c.slice(1))).filter((b) => !/^plx-u$/.test(b)))];
  const subject = blocks(parts[parts.length - 1]);
  if (!subject.length) return null;
  const others = parts.slice(0, -1).flatMap(blocks).filter((b) => !subject.includes(b));
  return others.length ? others[0] + ' into ' + subject.join('/') : null;
}
// every rule in a file: { sel, line, body }
function scan(text) {
  const src = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  const out = []; const re = /([^{}@;]+)\{([^{}]*)\}/g; let m;
  while ((m = re.exec(src))) out.push({ sel: m[1].trim().replace(/\s+/g, ' '), line: src.slice(0, m.index + m[0].indexOf(m[1].trim())).split('\n').length, body: m[2] });
  return out;
}
function measure() {
  const found = { 'cross-component': {} }, where = [];
  for (const f of cssFiles()) {
    const r = rel(f), rules = scan(fs.readFileSync(f, 'utf8'));
    for (const x of rules) {
      for (const s of splitList(x.sel)) {
        const c = crossComponent(s); if (!c) continue;
        const k = found['cross-component'][r] = found['cross-component'][r] || {};
        k[s] = (k[s] || 0) + 1; where.push({ kind: 'cross-component', file: r, key: s, line: x.line, text: s + '  (' + c + ')' });
      }
    }
  }
  return { found, where };
}
const readExceptions = () => (fs.existsSync(EXCEPTIONS) ? JSON.parse(fs.readFileSync(EXCEPTIONS, 'utf8')) : { 'cross-component': {} });
function check({ add }) {
  const { found, where } = measure(), ex = readExceptions();
  const exCross = ex['cross-component'] || {};
  // new cross-component selectors (beyond the listed count)
  const seen = {};
  for (const w of where.filter((x) => x.kind === 'cross-component')) {
    const id = w.file + '|' + w.key; seen[id] = (seen[id] || 0) + 1;
    if (seen[id] > ((exCross[w.file] || {})[w.key] || 0)) add(NAME, w.file, w.line, 'a selector into another component (section 4 of the Styling Standard): ' + w.text);
  }
  // a listed file that is not here (the design system is a private submodule, absent in CI) is not judged
  const here = (file) => fs.existsSync(path.join(ROOT, file));
  for (const file of Object.keys(exCross).filter(here)) for (const s of Object.keys(exCross[file])) {
    const now = ((found['cross-component'][file] || {})[s] || 0);
    if (now < exCross[file][s]) add(NAME, 'check-system.exceptions.json', 0, 'repaired, still listed: ' + file + ' ' + s + ' (run node check-system.rules/ownership.js --shrink)');
  }
}
// rewrite the list to what still occurs, never above what it allowed
function shrink() {
  const { found } = measure(), ex = readExceptions(), out = { $description: ex.$description, 'cross-component': {} };
  for (const file of Object.keys(ex['cross-component'] || {})) for (const s of Object.keys(ex['cross-component'][file])) {
    const n = !fs.existsSync(path.join(ROOT, file)) ? (file.startsWith('platform/components/DataGrid/') ? 0 : ex['cross-component'][file][s]) : Math.min(ex['cross-component'][file][s], (found['cross-component'][file] || {})[s] || 0);
    if (n) (out['cross-component'][file] = out['cross-component'][file] || {})[s] = n;
  }
  fs.writeFileSync(EXCEPTIONS, JSON.stringify(out, null, 2) + '\n');
  return out;
}
module.exports = { check, measure, NAME };

if (require.main === module) {
  if (process.argv.includes('--shrink')) { const o = shrink(); console.log('exceptions: ' + Object.values(o['cross-component']).reduce((a, x) => a + Object.values(x).reduce((p, q) => p + q, 0), 0) + ' cross-component selectors'); }
  const found = [];
  check({ add: (rule, file, line, text) => found.push(file + ':' + line + '  ' + text) });
  if (!found.length) { console.log('OWNERSHIP_OK'); process.exit(0); }
  console.log(found.slice(0, 30).join('\n') + '\n' + found.length + ' finding(s)');
  process.exit(1);
}
