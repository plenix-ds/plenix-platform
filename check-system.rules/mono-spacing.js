// Plenix · check-system rule "mono-spacing" (owner, 2026-10-18, docs/font-study/playground): the code and data font,
// Reddit Mono, is fitted to DM Sans, and DM Sans never changes. Its size is fitted once in its @font-face (size-adjust,
// platform/system/fonts.css) and its weights follow DM Sans's; its spaces are not: a monospace space is a full character
// wide. So every rule that sets a font sets its word spacing too:
//   the monospace font (Reddit Mono)   word-spacing:var(--plx-sys-font-data-word-spacing)   a space as wide as DM Sans's
//   DM Sans                             word-spacing:normal                                   so DM Sans inside a
//                                                                                              monospace element (a tag in
//                                                                                              a data cell) never inherits
//                                                                                              the monospace spacing
// A rule that sets its own word-spacing keeps it.
// What it reads: platform/**/*.css (not the generated token sheets) and docs/**/*.css (not docs/font-study, the study
// that compares the fonts); a rule's font is the family its font-family token resolves to (platform/tokens/tokens.index.json).
// fix(): adds the declaration, in property order, to every rule without one (node check-system.rules/mono-spacing.js --fix)
// The rule is a module check-system.js runs: require('./check-system.rules/mono-spacing.js').check({ add })
// Alone: node check-system.rules/mono-spacing.js [--fix]   -> MONO_SPACING_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'mono-spacing';
const ROOT = path.join(__dirname, '..');
const MONO_DECL = 'word-spacing:var(--plx-sys-font-data-word-spacing)', SANS_DECL = 'word-spacing:normal';
const SKIP = /[\\/](font-study|system[\\/]tokens|system[\\/]themes|node_modules|dist|vendor|release)[\\/]/;

// font tokens by the family they resolve to first: { name: "mono" | "sans" }
function fontTokens() {
  const idx = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/tokens/tokens.index.json'), 'utf8')), out = {};
  for (const t of idx.tokens) {
    if (!/font|typeface/.test(t.name)) continue;
    const first = String(Object.values(t.resolved)[0] || '').split(',')[0];
    if (/Reddit Mono/.test(first)) out[t.name] = 'mono'; else if (/DM Sans/.test(first)) out[t.name] = 'sans';
  }
  return out;
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
// every rule body that sets a font and no word-spacing: [{ start, end, line, decl }]
function scan(text, FONTS) {
  const out = [], re = /\{([^{}]*)\}/g; let m;
  while ((m = re.exec(text))) {
    const body = m[1], ff = /font-family:\s*var\((--plx-[a-z0-9-]+)\)/.exec(body);
    if (!ff || !FONTS[ff[1]] || /word-spacing\s*:/.test(body)) continue;
    out.push({ start: m.index + 1, end: m.index + 1 + body.length, line: text.slice(0, m.index).split('\n').length, decl: FONTS[ff[1]] === 'mono' ? MONO_DECL : SANS_DECL });
  }
  return out;
}
// the body with the declaration added in property order; the rest of the body untouched
function withDecl(body, decl) {
  const parts = body.split(';');
  const at = parts.findIndex((p) => p.trim() && p.split(':')[0].trim() > 'word-spacing');
  if (at < 0) { const tail = body.replace(/\s+$/, ''); return tail + (tail.endsWith(';') || !tail ? '' : ';') + decl + ';' + body.slice(tail.length); }
  parts.splice(at, 0, decl);
  return parts.join(';');
}
function check({ add }) {
  const FONTS = fontTokens();
  for (const f of cssFiles()) for (const x of scan(fs.readFileSync(f, 'utf8'), FONTS)) add(NAME, path.relative(ROOT, f).split(path.sep).join('/'), x.line, 'sets a font without its word spacing: add ' + x.decl + ' (Reddit Mono fitted to DM Sans, docs/font-study/playground)');
}
function fix() {
  const FONTS = fontTokens(); let n = 0;
  for (const f of cssFiles()) {
    let text = fs.readFileSync(f, 'utf8'); const hits = scan(text, FONTS); if (!hits.length) continue;
    for (const x of hits.reverse()) { text = text.slice(0, x.start) + withDecl(text.slice(x.start, x.end), x.decl) + text.slice(x.end); n++; }
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
