// Plenix · check-system rule "built-in-words" (owner, arabic-words-37; issue 427): every word a component shows or announces
// on its own lives in the catalog (platform/i18n/en.js, read through useStrings), so it can be translated. In a component,
// pattern or chart it finds English written in the code:
//   STRINGS     the quoted words inside a `const STRINGS = { … }` object
//   inline      the quoted words inside Object.assign({ … }, strings)
//   default     a default argument that holds words: closeLabel = 'Close', title = 'Untitled' (a name ending in label, text,
//               title, placeholder, message, hint or caption)
//   attribute   literal words in aria-label, title, placeholder or alt in the markup: aria-label="Dismiss"
//   joined      English joined in code: n + ' stars', 'Remove ' + name (Arabic cannot be built from pieces)
//   template    English around ${…} in a template string: `${n} items`
//   braced      a literal in braces on a word attribute: label={'More colors'}
//   text        words written as JSX text: <span>Loading</span>
// Not counted: messages to developers (devWarn, console, thrown errors) and the product's name, Plenix.
// It also checks that en.json mirrors en.js.
// What was there when the rule began is the backlog in check-system.built-in-words.json: by file, with its count. It only
// shrinks: a file not listed, or with more than its count, fails; a file with fewer fails until the backlog is lowered
// (node check-system.rules/built-in-words.js --shrink). Wiring a component to useStrings brings its count to 0.
// Alone: node check-system.rules/built-in-words.js [--shrink | --baseline]   -> BUILT_IN_WORDS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'built-in-words';
const ROOT = path.join(__dirname, '..');
const DIRS = ['platform/components', 'platform/patterns', 'platform/charts'];
const BACKLOG = path.join(ROOT, 'check-system.built-in-words.json');
const WORDS = /[A-Za-z]{2,}/;   // a value with a word in it (not a symbol, a number or a class name joined by dashes alone)
const CLASSY = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;   // a key, a class or an id ("plx-button", "bottom-start"): not a word for people

function files() {
  const out = [];
  const walk = (d) => { let es = []; try { es = fs.readdirSync(d, { withFileTypes: true }); } catch (e) { return; }
    for (const e of es) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else if (/\.[jt]sx$/.test(e.name)) out.push(p); } };
  DIRS.forEach((d) => walk(path.join(ROOT, d)));
  return out.sort();
}
// the text of a balanced { … } starting at index i (the opening brace)
function braces(text, i) {
  let depth = 0, q = null;
  for (let j = i; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === '\\') j++; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') q = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return text.slice(i, j + 1);
  }
  return text.slice(i);
}
const people = (s) => WORDS.test(s) && !CLASSY.test(s);
// every finding of one file: [{ kind, line, text }]
function scan(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));   // the header comment is documentation
  const lineOf = (i) => text.slice(0, i).split('\n').length, out = [];
  // inline defaults: Object.assign({ title: 'Request access', … }, strings)
  for (const m of text.matchAll(/Object\.assign\(\s*\{/g)) {
    const body = braces(text, m.index + m[0].length - 1), after = text.slice(m.index + m[0].length - 1 + body.length, m.index + m[0].length - 1 + body.length + 40);
    if (!/^\s*,\s*(?:props\.)?strings\b/.test(after)) continue;
    for (const s of body.matchAll(/(['"])((?:\\.|(?!\1).)*)\1\s*(?=[,}\n])/g)) if (people(s[2])) out.push({ kind: 'inline', line: lineOf(m.index), text: s[2] });
  }
  for (const m of text.matchAll(/\bconst STRINGS\s*=\s*\{/g)) {
    const body = braces(text, m.index + m[0].length - 1);
    for (const s of body.matchAll(/(['"])((?:\\.|(?!\1).)*)\1\s*(?=[,}\n])/g)) if (people(s[2])) out.push({ kind: 'STRINGS', line: lineOf(m.index), text: s[2] });
  }
  for (const m of text.matchAll(/(?<![-.\w])(\w*(?:[Ll]abel|[Tt]ext|[Tt]itle|[Pp]laceholder|[Mm]essage|[Hh]int|[Cc]aption))\s*=\s*(['"])((?:\\.|(?!\2).)*)\2/g)) {
    if (people(m[3])) out.push({ kind: 'default', line: lineOf(m.index), text: m[1] + ' = ' + m[3] });
  }
  for (const m of text.matchAll(/\b(aria-label|title|placeholder|alt)="([^"{]*)"/g)) if (people(m[2])) out.push({ kind: 'attribute', line: lineOf(m.index), text: m[1] + '="' + m[2] + '"' });
  // English built in code (owner, arabic-words-37: Arabic cannot be joined from pieces)
  const code = text.replace(/\/\/[^\n]*/g, (m) => m.replace(/[^\n]/g, ' '));   // line comments are documentation too
  // a phrase for people: a word of 2+ letters set off by spaces or the ends, and none of a class's, a selector's or code's marks
  const sentence = (s) => /(^|\s)[A-Za-z][a-z]{1,}(?=$|[\s.,:;!?…'’])/.test(s) && /[a-z]{3,}/.test(s) && !/[_(){}\[\]<>=;\\|`$#@]|--|^\s*[-.:\/?&]|^\s*(plx|data|aria|is|has)-/.test(s) && !/^\s*[A-Z0-9]{2,}(\s+[A-Z0-9]{2,})+\s*$/.test(s) && !/^\s*[a-z]{2,3}(-[A-Z]{2})?(\s+[a-z]{2,3}(-[A-Z]{2})?)+\s*$/.test(s);
  for (const m of code.matchAll(/\+\s*(['"])((?:\\.|(?!\1)[^\n])*)\1/g)) if (sentence(m[2])) out.push({ kind: 'joined', line: lineOf(m.index), text: '+ ' + m[1] + m[2] + m[1] });
  for (const m of code.matchAll(/(['"])((?:\\.|(?!\1)[^\n])*\s)\1\s*\+/g)) if (sentence(m[2])) out.push({ kind: 'joined', line: lineOf(m.index), text: m[1] + m[2] + m[1] + ' +' });
  for (const m of code.matchAll(/`([^`]*)`/g)) {
    if (!m[1].includes('${')) continue;
    const plain = m[1].replace(/\$\{[^}]*\}/g, ' ');
    if (/[A-Za-z]{2,}\s+[A-Za-z]{2,}|\s[a-z]{3,}\b|\b[A-Z][a-z]{2,}\b/.test(plain) && sentence(plain) && !/^[\s-]*(plx|is|has|data)-|--plx|var\(|calc\(|url\(|https?:/.test(plain)) out.push({ kind: 'template', line: lineOf(m.index), text: '`' + m[1].slice(0, 60) + '`' });
  }
  for (const m of code.matchAll(/\b(aria-label|label|title|placeholder|alt|tooltip|description|caption|heading|emptyText|removeLabel|closeLabel)=\{\s*(['"])((?:\\.|(?!\2).)*)\2\s*\}/g)) if (people(m[3])) out.push({ kind: 'braced', line: lineOf(m.index), text: m[1] + "={'" + m[3] + "'}" });
  for (const m of code.matchAll(/>([^<>{}\n]*[A-Za-z]{2,}[^<>{}\n]*)<\//g)) {
    const s = m[1].trim(), before = code.slice(Math.max(0, m.index - 1), m.index);
    if (!s || !/[A-Za-z0-9"'}\/]/.test(before) || /[?:+*=()&|]/.test(s)) continue;
    if (people(s)) out.push({ kind: 'text', line: lineOf(m.index), text: '>' + s.slice(0, 60) + '<' });
  }
  // not for people: messages to developers (devWarn, console, thrown errors), and the product's name
  const lines = text.split('\n');
  return out.filter((f) => !/\bdevWarn\(|\bconsole\.|\bthrow new\b|\bnew Error\(/.test(lines[f.line - 1] || '') && !/^>?\s*Plenix\s*<?$/.test(f.text));
}
const rel = (f) => path.relative(ROOT, f).split(path.sep).join('/');
function measure() { const found = {}; for (const f of files()) { const n = scan(f).length; if (n) found[rel(f)] = n; } return found; }
const readBacklog = () => (fs.existsSync(BACKLOG) ? JSON.parse(fs.readFileSync(BACKLOG, 'utf8')) : { files: {} });
function parity() {
  const js = path.join(ROOT, 'platform/i18n/en.js'), json = path.join(ROOT, 'platform/i18n/en.json');
  try {
    const a = JSON.parse(fs.readFileSync(js, 'utf8').replace(/^.*\nexport default /, '').replace(/;\s*$/, ''));
    const b = JSON.parse(fs.readFileSync(json, 'utf8'));
    return JSON.stringify(a) === JSON.stringify(b) ? null : 'platform/i18n/en.json does not mirror en.js';
  } catch (e) { return 'platform/i18n/en.js or en.json does not parse: ' + e.message; }
}

function check({ add }) {
  const bl = readBacklog().files || {};
  for (const f of files()) {
    const r = rel(f), list = scan(f), allowed = bl[r] || 0;
    if (list.length > allowed) {
      const first = list[0];
      add(NAME, f, first.line, (allowed ? list.length + ' built-in English words, the backlog allows ' + allowed : 'built-in English in a component') + ' (' + first.kind + ': ' + first.text.slice(0, 70) + '): put the words in platform/i18n/en.js and read them with useStrings');
    } else if (list.length < allowed) add(NAME, BACKLOG, 0, 'repaired, still listed: ' + r + ' has ' + list.length + ', listed ' + allowed + ' (run node check-system.rules/built-in-words.js --shrink)');
  }
  const p = parity(); if (p) add(NAME, path.join(ROOT, 'platform/i18n/en.json'), 0, p);
}
const DESCRIPTION = 'The rollout backlog of check-system.rules/built-in-words.js (owner, arabic-words-37; issue 427), recorded 2026-10-27, and again when the rule widened to English built in code (joined, template, braced, text): per component file, how many built-in English words it still writes in its code (STRINGS objects, inline defaults, default arguments with words, literal aria-label/title/placeholder/alt, English joined or templated in code, braced literals, JSX text). Wiring a file to useStrings brings it to 0. It only shrinks: node check-system.rules/built-in-words.js --shrink.';
function write(files) { fs.writeFileSync(BACKLOG, JSON.stringify({ $description: DESCRIPTION, files }, null, 2) + '\n'); }
module.exports = { name: NAME, check, scan, measure };

if (require.main === module) {
  if (process.argv.includes('--baseline')) { const m = measure(); write(m); console.log('backlog written: ' + Object.keys(m).length + ' files, ' + Object.values(m).reduce((a, b) => a + b, 0) + ' words'); }
  if (process.argv.includes('--shrink')) {
    const m = measure(), bl = readBacklog().files || {}, o = {};
    for (const f of Object.keys(bl)) if (m[f]) o[f] = Math.min(bl[f], m[f]);
    write(o); console.log('backlog: ' + Object.keys(o).length + ' files, ' + Object.values(o).reduce((a, b) => a + b, 0) + ' words');
  }
  const out = [];
  check({ add: (rule, file, line, text) => out.push(path.relative(ROOT, file) + (line ? ':' + line : '') + '  ' + text) });
  out.forEach((l) => console.log('  ' + l));
  console.log(out.length ? 'BUILT_IN_WORDS_FAIL (' + out.length + ')' : 'BUILT_IN_WORDS_OK');
  process.exit(out.length ? 1 : 0);
}
