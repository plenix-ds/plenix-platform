// ONE-TIME COMPARISON (#372, Style Dictionary step 1). Delete this file when step 10 retires build-tokens.js.
//
// Compares the reference tier that build-tokens.js writes today (platform/system/tokens/reference.css, committed) with
// the one plain Style Dictionary writes (npm run tokens:sd, style-dictionary/reference.config.json, into the ignored
// build/sd/reference.css). It reads both stylesheets, collects every custom property with its value and the rule it
// sits in, and reports:
//   - missing:   a property today's file declares and Style Dictionary does not;
//   - extra:     a property Style Dictionary declares and today's file does not;
//   - different: a property whose base value differs (the base value is the first declaration in today's file);
//   - conditional: declarations today's file writes under another condition (reduced motion, a density change), which
//     plain Style Dictionary cannot write from one token set; step 4 of #372 moves them into sets of their own.
// Comments, order and block layout are not compared.
//
//   npm run tokens:sd:check     builds with Style Dictionary, then runs this comparison
//   node tools/agent/sd-reference-compare.js [today.css] [sd.css]
// Exits with 1 when a property is missing, extra or different; the conditional declarations are listed, not failed.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const todayFile = process.argv[2] || path.join(ROOT, 'platform', 'system', 'tokens', 'reference.css');
const sdFile = process.argv[3] || path.join(ROOT, 'build', 'sd', 'reference.css');

// [{ name, value, context }] where context is the chain of enclosing rules, e.g. "@media (…) > :root"
function declarations(file) {
  const css = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const out = [], stack = [];
  let buf = '';
  for (const ch of css) {
    if (ch === '{') { stack.push(buf.trim().replace(/\s+/g, ' ')); buf = ''; }
    else if (ch === ';' || ch === '}') {
      const m = buf.trim().match(/^(--[\w-]+)\s*:\s*([\s\S]*)$/);
      if (m) out.push({ name: m[1], value: m[2].trim().replace(/\s+/g, ' '), context: stack.join(' > ') });
      buf = '';
      if (ch === '}') stack.pop();
    } else buf += ch;
  }
  return out;
}

if (!fs.existsSync(sdFile)) { console.error('No Style Dictionary output at ' + path.relative(ROOT, sdFile) + ': run npm run tokens:sd first.'); process.exit(2); }
const today = declarations(todayFile), sd = declarations(sdFile);
const byName = (list) => list.reduce((m, d) => (m.has(d.name) ? m.get(d.name).push(d) : m.set(d.name, [d]), m), new Map());
const t = byName(today), s = byName(sd);

const missing = [...t.keys()].filter((n) => !s.has(n));
const extra = [...s.keys()].filter((n) => !t.has(n));
const different = [], conditional = [], dupes = [];
for (const [name, decls] of s) {
  if (decls.length > 1) dupes.push(name);
  if (!t.has(name)) continue;
  const [base, ...rest] = t.get(name);
  if (base.value !== decls[0].value) different.push({ name, today: base.value, sd: decls[0].value, context: base.context });
  for (const r of rest) if (r.value !== base.value || r.context !== base.context) conditional.push(r);
}

const rel = (f) => path.relative(ROOT, f);
console.log('Reference tier: ' + rel(todayFile) + ' (build-tokens.js) against ' + rel(sdFile) + ' (Style Dictionary)');
console.log('  properties: ' + t.size + ' today, ' + s.size + ' from Style Dictionary (' + today.length + ' and ' + sd.length + ' declarations)');
console.log('  missing: ' + missing.length + (missing.length ? '\n    ' + missing.join('\n    ') : ''));
console.log('  extra: ' + extra.length + (extra.length ? '\n    ' + extra.join('\n    ') : ''));
console.log('  different base values: ' + different.length + different.map((d) => '\n    ' + d.name + ': today "' + d.today + '", Style Dictionary "' + d.sd + '" (' + d.context + ')').join(''));
if (dupes.length) console.log('  declared twice by Style Dictionary: ' + dupes.join(', '));
console.log('  conditional declarations today writes and plain Style Dictionary does not (step 4): ' + conditional.length
  + conditional.map((d) => '\n    ' + d.context + '  ' + d.name + ': ' + d.value).join(''));
const fail = missing.length + extra.length + different.length + dupes.length;
console.log(fail ? 'Result: DIFFERENT' : 'Result: same properties, same base values');
process.exit(fail ? 1 : 0);
