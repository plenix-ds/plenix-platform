// Plenix · check-system rule "mono-spacing" (owner, 2026-10-18, docs/font-study/playground): the code and data font,
// Reddit Mono, is fitted to DM Sans, and DM Sans never changes. Its size is fitted once in its @font-face (size-adjust,
// platform/system/fonts.css) and its weights follow DM Sans's; its spaces are not: a monospace space is a full character
// wide. So every rule that sets the monospace font also sets word-spacing to --plx-sys-font-data-word-spacing (a space as
// wide as DM Sans's). A rule that sets its own word-spacing keeps it.
// What it reads: platform/**/*.css (not the generated token sheets) and docs/**/*.css (not docs/font-study, the study
// that compares the fonts); a rule whose font-family is a token that resolves to the monospace font
// (platform/tokens/tokens.index.json) is a monospace rule.
// fix(): adds the declaration, in property order, to every monospace rule without one (node check-system.rules/mono-spacing.js --fix)
// The rule is a module check-system.js runs: require('./check-system.rules/mono-spacing.js').check({ add })
// Alone: node check-system.rules/mono-spacing.js [--fix]   -> MONO_SPACING_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'mono-spacing';
const ROOT = path.join(__dirname, '..');
const DECL = 'word-spacing:var(--plx-sys-font-data-word-spacing)';
const SKIP = /[\\/](font-study|system[\\/]tokens|system[\\/]themes|node_modules|dist|vendor|release)[\\/]/;

function monoTokens() {
  const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/tokens/tokens.index.json'), 'utf8'));
  return new Set(idx.tokens.filter((t) => /font/.test(t.name) && /Reddit Mono/.test(JSON.stringify(t.resolved))).map((t) => t.name));
}
function cssFiles() {
  const out = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP.test(p + path.sep)) walk(p); } else if (e.name.endsWith('.css') && !SKIP.test(p)) out.push(p);
  } };
  walk(path.join(ROOT, 'platform')); walk(path.join(ROOT, 'docs'));
  return out;
}
// every rule body that sets the monospace font and no word-spacing: [{ start, end, line }]
function scan(text, MONO) {
  const out = [], re = /\{([^{}]*)\}/g; let m;
  while ((m = re.exec(text))) {
    const body = m[1], ff = /font-family:\s*var\((--plx-[a-z0-9-]+)\)/.exec(body);
    if (!ff || !MONO.has(ff[1]) || /word-spacing\s*:/.test(body)) continue;
    out.push({ start: m.index + 1, end: m.index + 1 + body.length, line: text.slice(0, m.index).split('\n').length });
  }
  return out;
}
// the body with the declaration added in property order; the rest of the body untouched
function withDecl(body) {
  const parts = body.split(';');
  let at = parts.findIndex((p) => p.trim() && p.split(':')[0].trim() > 'word-spacing');
  if (at < 0) { const tail = body.replace(/\s+$/, ''); return tail + (tail.endsWith(';') || !tail ? '' : ';') + DECL + ';' + body.slice(tail.length); }
  parts.splice(at, 0, DECL);
  return parts.join(';');
}
function check({ add }) {
  const MONO = monoTokens();
  for (const f of cssFiles()) for (const x of scan(fs.readFileSync(f, 'utf8'), MONO)) add(NAME, path.relative(ROOT, f).split(path.sep).join('/'), x.line, 'sets the monospace font without its word spacing: add ' + DECL + ' (Reddit Mono fitted to DM Sans, docs/font-study/playground)');
}
function fix() {
  const MONO = monoTokens(); let n = 0;
  for (const f of cssFiles()) {
    let text = fs.readFileSync(f, 'utf8'); const hits = scan(text, MONO); if (!hits.length) continue;
    for (const x of hits.reverse()) { text = text.slice(0, x.start) + withDecl(text.slice(x.start, x.end)) + text.slice(x.end); n++; }
    fs.writeFileSync(f, text);
  }
  return n;
}
module.exports = { check, NAME };

if (require.main === module) {
  if (process.argv.includes('--fix')) console.log('fixed ' + fix() + ' rules');
  const found = [];
  check({ add: (rule, file, line, text) => found.push(file + ':' + line + '  ' + text) });
  if (!found.length) { console.log('MONO_SPACING_OK'); process.exit(0); }
  console.log(found.slice(0, 30).join('\n') + '\n' + found.length + ' finding(s)');
  process.exit(1);
}
