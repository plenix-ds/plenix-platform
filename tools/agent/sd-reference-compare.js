// ONE-TIME COMPARISON (#372, Style Dictionary steps 1, 3 and 4). Delete this file when step 10 retires build-tokens.js.
//
// Compares the token stylesheets build-tokens.js writes today (committed) with what plain Style Dictionary writes
// (npm run tokens:sd, into the ignored build/sd/). With no arguments it runs every comparison below; check-system runs it
// through npm run tokens:sd:check.
//   reference    platform/system/tokens/reference.css, every property, against build/sd/reference.css (step 1) and the
//                two motion-off outputs of reference.reduced-motion.config.json (step 4)
//   text roles   the --plx-sys-text-* properties of semantic.css against build/sd/typography.css (step 3; that output also
//                writes the tokens the roles point to, so their references resolve, and --only leaves those out)
//   conditions   (step 4) every declaration semantic.css, components.css and themes/default.css write under a condition
//                (forced colors, more contrast, print) against the condition sets' outputs (style-dictionary/
//                <set>.<condition>.config.json); semantic.css's guarded base values against build/sd/typography.css
// It reads the stylesheets, collects every custom property with its value and the rules it sits in (its context, for
// example "@media (forced-colors: active) > :root"), and matches them:
//   - a conditional declaration (inside an @media) matches one with the same name, context and value;
//   - a guarded base value is today's base value written under the opposite condition ("@media not (forced-colors:
//     active)", the motion values under "@media (prefers-reduced-motion: no-preference) > :root:not([data-plx-density-changing])"):
//     plain Style Dictionary writes it unconditionally in the base set, so it matches Style Dictionary's base value, and
//     its token must have a conditional declaration;
//   - a base value (no @media) matches Style Dictionary's base value (the reference and text-role comparisons only: the
//     base sets of semantic.css, components.css and the themes come with #372 steps 5 to 7).
// It reports what is missing, extra or different. Comments, order and block layout are not compared.
//
//   npm run tokens:sd:check     builds with Style Dictionary, then runs every comparison
//   node tools/agent/sd-reference-compare.js [today.css sd.css [sd2.css …]] [--only <name prefix>] [--conditions]
// Exits with 1 when anything is missing, extra or different.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SD = 'build/sd/';
const COMPARISONS = [
  { today: 'platform/system/tokens/reference.css', sd: ['reference.css', 'reference.reduced-motion.css', 'reference.density-changing.css'] },
  { today: 'platform/system/tokens/semantic.css', sd: ['typography.css'], only: '--plx-sys-text-' },
  { today: 'platform/system/tokens/semantic.css', sd: ['typography.css', 'semantic.forced-colors.css', 'semantic.print.css'], conditions: true },
  { today: 'platform/system/tokens/components.css', sd: ['components.forced-colors.css'], conditions: true },
  { today: 'platform/system/themes/default.css', sd: ['theme-default.light.forced-colors.css', 'theme-default.light.more-contrast.css', 'theme-default.dark.forced-colors.css', 'theme-default.dark.more-contrast.css'], conditions: true },
].map((c) => Object.assign(c, { sd: c.sd.map((f) => SD + f) }));

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

const conditional = (d) => /(^|> )@media /.test(d.context);
const guard = (d) => /(^|> )@media not /.test(d.context) || /:not\(\[data-plx-density-changing\]\)/.test(d.context);
const rel = (f) => path.relative(ROOT, path.resolve(ROOT, f));

// one comparison: prints its report, returns the number of problems
function compare({ today: todayFile, sd: sdFiles, only = '', conditions = false }) {
  const keep = (list) => list.filter((d) => d.name.startsWith(only));
  const today = keep(declarations(path.resolve(ROOT, todayFile)));
  const sd = keep(sdFiles.flatMap((f) => declarations(path.resolve(ROOT, f))));
  // the conditions comparison covers the properties today writes under a condition; Style Dictionary's conditional
  // declarations all count (an extra one is a problem), its base declarations only as the guarded values' base
  const scope = conditions ? new Set(today.filter(conditional).map((d) => d.name)) : null;
  const T = today.filter((d) => !scope || scope.has(d.name));
  const S = sd.filter((d) => !scope || conditional(d) || scope.has(d.name));
  const byName = (list) => list.reduce((m, d) => (m.has(d.name) ? m.get(d.name).push(d) : m.set(d.name, [d]), m), new Map());
  const t = byName(T), s = byName(S);

  const missing = [], extra = [], different = [], unpaired = [], dupes = [];
  let matchedConditional = 0, guardedSame = 0, guardedNotCompared = 0, baseSame = 0;
  if (!conditions) {
    for (const n of t.keys()) if (!s.has(n)) missing.push(n + ' (not written by Style Dictionary)');
    for (const n of s.keys()) if (!t.has(n)) extra.push(n + ' (not written today)');
  }
  for (const [name, sdDecls] of s) {
    const td = t.get(name) || [], used = new Set();
    const bases = sdDecls.filter((d) => !conditional(d));
    if (bases.length > 1) dupes.push(name);
    const sdBase = bases[0];
    for (const d of sdDecls.filter(conditional)) {
      const i = td.findIndex((x, k) => !used.has(k) && x.context === d.context);
      if (i < 0) { extra.push(d.context + '  ' + name + ': ' + d.value); continue; }
      used.add(i);
      if (td[i].value !== d.value) different.push(d.context + '  ' + name + ': today "' + td[i].value + '", Style Dictionary "' + d.value + '"');
      else matchedConditional++;
    }
    const paired = used.size > 0;
    td.forEach((x, k) => {
      if (used.has(k)) return;
      if (guard(x)) {
        if (!paired) unpaired.push(x.context + '  ' + name + ': a guarded base value with no conditional value');
        if (!sdBase) { guardedNotCompared++; return; }
        if (x.value === sdBase.value) guardedSame++;
        else different.push(x.context + '  ' + name + ': today "' + x.value + '", Style Dictionary\'s base "' + sdBase.value + '"');
      } else if (conditional(x)) missing.push(x.context + '  ' + name + ': ' + x.value);
      else if (conditions) return;
      else if (!sdBase) missing.push(x.context + '  ' + name + ': ' + x.value + ' (no base value from Style Dictionary)');
      else if (x.context !== sdBase.context) missing.push(x.context + '  ' + name + ': ' + x.value + ' (written by today in another rule)');
      else if (x.value !== sdBase.value) different.push(name + ': today "' + x.value + '", Style Dictionary "' + sdBase.value + '"');
      else baseSame++;
    });
  }
  // today's conditional declarations of a property Style Dictionary does not write at all
  for (const [name, td] of t) if (!s.has(name)) for (const x of td) if (conditional(x)) missing.push(x.context + '  ' + name + ': ' + x.value);

  const list = (label, a) => '  ' + label + ': ' + a.length + (a.length ? '\n    ' + a.join('\n    ') : '');
  console.log((only ? 'The ' + only + '* properties of ' : conditions ? 'The conditional declarations of ' : '') + rel(todayFile) + ' (build-tokens.js) against ' + sdFiles.map(rel).join(', ') + ' (Style Dictionary)');
  console.log('  properties: ' + t.size + ' today, ' + new Set(S.filter((d) => !scope || conditional(d)).map((d) => d.name)).size + ' from Style Dictionary (' + T.length + ' and ' + S.length + ' declarations)');
  if (!conditions) console.log('  same base values: ' + baseSame);
  console.log('  same conditional declarations: ' + matchedConditional);
  console.log('  guarded base values: ' + (guardedSame + guardedNotCompared) + (guardedNotCompared ? ' (' + guardedSame + ' same as Style Dictionary\'s base, ' + guardedNotCompared + ' not compared: their base set is not built by Style Dictionary until #372 steps 5 to 7)' : ', all the same as Style Dictionary\'s base'));
  console.log(list('missing', missing));
  console.log(list('extra', extra));
  console.log(list('different', different));
  if (unpaired.length) console.log(list('unpaired', unpaired));
  if (dupes.length) console.log('  base value declared twice by Style Dictionary: ' + dupes.join(', '));
  const fail = missing.length + extra.length + different.length + unpaired.length + dupes.length;
  console.log(fail ? 'Result: DIFFERENT' : 'Result: the same');
  return fail;
}

const argv = process.argv.slice(2), at = argv.indexOf('--only');
const only = at < 0 ? '' : argv[at + 1] || '';
const files = argv.filter((a, i) => a !== '--conditions' && (at < 0 || (i !== at && i !== at + 1)));
const runs = files.length ? [{ today: files[0], sd: files.slice(1).length ? files.slice(1) : [SD + 'reference.css'], only, conditions: argv.includes('--conditions') }] : COMPARISONS;
const absent = [...new Set(runs.flatMap((r) => r.sd))].filter((f) => !fs.existsSync(path.resolve(ROOT, f)));
if (absent.length) { console.error('No Style Dictionary output at ' + absent.map(rel).join(', ') + ': run npm run tokens:sd first.'); process.exit(2); }
let problems = 0;
for (const r of runs) problems += compare(r);
if (runs.length > 1) console.log(problems ? 'All comparisons: DIFFERENT (' + problems + ' problems)' : 'All comparisons: the same (' + runs.length + ' comparisons)');
process.exit(problems ? 1 : 0);
