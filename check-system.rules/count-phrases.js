// Plenix · check-system rule "count-phrases" (issue 260; owner 2026-10-24): inside a phrase, the number is in the data
// font (Mono) and the words are in the normal font: "7 files" is [7 in Mono] + " files". The helpers write it so:
//   dataPhrase('{n} files', { n: 7 })   dataPhrase(t('selected', { n }))   dataNumber(7)   dataText('4,546 assets | 12.4 GB')
// A count joined to words in code, or written with words in a visible text, is a finding: it shows in the normal font.
//   <span>{count + ' files'}</span>   meta={c.count + ' assets'}   {`${n} items`}   <p>12 files</p>   finding
//   { summary: '4,546 assets | 12.4 GB' }   (a text prop or a summary/meta field of data)                        finding
//   {dataPhrase('{n} files', { n: count })}   aria-label={count + ' files'} (not shown: read aloud)                 ok
// What it reads, with Babel's parser: the Platform (components, patterns, templates, charts), the suite, the applications
// and the Asset Manager (.jsx and .js); generated bundles are checked through their sources.
//   - a JSX child or a visible text prop (meta, subtitle, description, caption, summary, hint, helper, status, start,
//     end, children) whose value joins a count to words: count + ' word', `${count} word`, where a count is a number,
//     a call to a number formatter (formatNumber, formatCompact, formatCount), or a name that says it is one (n, count,
//     total, length, size, shown, selected, …Count, …Total)
//   - JSX text, or a string in such a prop or in a summary or meta field, that starts a phrase with a number: "12 files"
// What it knowingly misses: a count that arrives as a whole string from a translation (t('…{n}…') shown as it is: wrap
// it in dataPhrase), a count under another name, and phrases built in another file. A line that must keep the normal
// font on purpose carries plx-allow-count and its reason.
//   require('./check-system.rules/count-phrases.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/count-phrases.js     -> COUNT_PHRASES_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'count-phrases';
const ROOT = path.join(__dirname, '..');
// where it looks (relative to the repository), and what it skips: generated bundles, the design spec's labs (they draw
// markup samples), the data-font helpers themselves
const SCOPE = /[\\/](platform[\\/](components|patterns|templates|charts)|suite|dashboard|projects|messages|contacts|calendar|tasks|notes|bookmarks|files|settings|dam[\\/]app)[\\/]/;
const SKIP_FILE = /[\\/](dist|vendor|node_modules)[\\/]|(^|[\\/])(app|assets|plenix-icons-[a-z0-9-]+)\.js$|[\\/]utils[\\/]dataText\.jsx$/;
const TEXT_PROPS = /^(meta|subtitle|description|caption|summary|hint|helper|status|start|end|children)$/;
const DATA_FIELDS = /^(summary|meta)$/;
const COUNT_NAME = /^(n|count|total|length|size|shown|selected|num|number|qty|quantity)$|(Count|Total)$/;
const FORMATTER = /^(formatNumber|formatCompact|formatCount)$/;
const HELPERS = /^(dataPhrase|dataText|dataNumber)$/;
const WORD_AFTER = /^\s+\p{L}{2,}/u;            // " files", " assets": words follow the count
const LEADING_COUNT = /^\s*[$€£]?\d[\d,.]*\s+\p{L}{2,}/u;   // "12 files", "4,546 assets | 12.4 GB"

let parser = null;
function parse(code) {
  if (!parser) parser = require('@babel/standalone');
  return parser.transform(code, { ast: true, code: false, sourceType: 'module', parserOpts: { plugins: ['jsx'], errorRecovery: true } }).ast;
}
const lastName = (n) => (!n ? '' : n.type === 'Identifier' ? n.name : n.type === 'MemberExpression' && !n.computed ? n.property.name : n.type === 'CallExpression' ? lastName(n.callee) : '');
function isCount(n) {
  if (!n) return false;
  if (n.type === 'NumericLiteral') return true;
  if (n.type === 'CallExpression') return FORMATTER.test(lastName(n.callee));
  if (n.type === 'Identifier' || n.type === 'MemberExpression') return COUNT_NAME.test(lastName(n));
  return false;
}
// the operands of a + chain, left to right
function chain(n, out = []) { if (n.type === 'BinaryExpression' && n.operator === '+') { chain(n.left, out); chain(n.right, out); } else out.push(n); return out; }
// a template filled with a count, shown as one string: fill(t.more, { n }), t('selected', { count }), s.range.replace('{n}', n)
const FILLS = /^(fill|fmt|format|interpolate|tpl|t|translate)$/;
const COUNT_KEYS = /^(n|count|total|shown|first|last|position|done|left|remaining|size)$/;
function fillsCount(v) {
  const name = lastName(v.callee);
  if (FILLS.test(name)) { const vars = v.arguments[1]; return !!vars && vars.type === 'ObjectExpression' && vars.properties.some((p) => p.key && COUNT_KEYS.test(p.key.name || p.key.value || '')); }
  if (name === 'replace' && v.arguments[0] && v.arguments[0].type === 'StringLiteral') return /^\{(n|count|total|shown|first|last)\}$/.test(v.arguments[0].value) || fillsCount(v.callee.object || {});
  return false;
}
// does a value join a count to the words after it
function joinsCount(v) {
  if (!v) return false;
  if (v.type === 'ConditionalExpression') return joinsCount(v.consequent) || joinsCount(v.alternate);
  if (v.type === 'LogicalExpression') return joinsCount(v.right);
  if (v.type === 'BinaryExpression' && v.operator === '+') {
    const ops = chain(v);
    for (let i = 0; i + 1 < ops.length; i++) if (isCount(ops[i]) && ops[i + 1].type === 'StringLiteral' && WORD_AFTER.test(ops[i + 1].value)) return true;
    return false;
  }
  if (v.type === 'TemplateLiteral') return v.expressions.some((e, i) => isCount(e) && WORD_AFTER.test(v.quasis[i + 1].value.cooked || ''));
  if (v.type === 'CallExpression') return fillsCount(v);
  if (v.type === 'StringLiteral') return LEADING_COUNT.test(v.value);
  return false;
}
function children(n) {
  const out = [];
  for (const k of Object.keys(n)) {
    if (k === 'loc' || k === 'start' || k === 'end' || k === 'leadingComments' || k === 'trailingComments' || k === 'innerComments' || k === 'extra') continue;
    const c = n[k];
    if (Array.isArray(c)) { for (const x of c) if (x && typeof x.type === 'string') out.push(x); } else if (c && typeof c.type === 'string') out.push(c);
  }
  return out;
}

// the findings of one source text: [{ line, text }]
function scan(text) {
  const out = [], lines = text.split('\n');
  let ast;
  try { ast = parse(text); } catch (e) { return out; }
  const allowed = (line) => /plx-allow-count/.test(lines[line - 1] || '') || /plx-allow-count/.test(lines[line - 2] || '');
  const add = (node) => { const line = node.loc.start.line; if (!allowed(line)) out.push({ line, text: (lines[line - 1] || '').trim().slice(0, 160) }); };
  (function visit(n, inHelper) {
    if (n.type === 'CallExpression' && HELPERS.test(lastName(n.callee))) inHelper = true;
    if (!inHelper) {
      if (n.type === 'JSXExpressionContainer' && n.expression && n.expression.type !== 'JSXEmptyExpression' && n.expression.type !== 'StringLiteral' && joinsCount(n.expression)) add(n);
      if (n.type === 'JSXText' && LEADING_COUNT.test(n.value)) add(n);
      if (n.type === 'JSXAttribute' && n.name && n.name.type === 'JSXIdentifier' && TEXT_PROPS.test(n.name.name) && n.value && n.value.type === 'StringLiteral' && LEADING_COUNT.test(n.value.value)) add(n);
      if (n.type === 'ObjectProperty' && n.key && DATA_FIELDS.test(n.key.name || n.key.value || '') && joinsCount(n.value)) add(n);
    }
    for (const c of children(n)) {
      // an attribute that is read aloud or shown as a tooltip is not a phrase on the page
      if (n.type === 'JSXOpeningElement' && c.type === 'JSXAttribute' && c.name && /^(aria-[a-z]+|title|alt|placeholder|label)$/.test(c.name.name) && !TEXT_PROPS.test(c.name.name)) continue;
      // a JSX expression whose parent attribute is not a visible text prop is not judged here (onClick={…}, key={…})
      if (n.type === 'JSXAttribute' && c.type === 'JSXExpressionContainer' && !(n.name && TEXT_PROPS.test(n.name.name))) { visit(c.expression, inHelper); continue; }
      visit(c, inHelper);
    }
  })(ast.program, false);
  return out;
}

function check({ files, add }) {
  for (const { file } of files) {
    if (!SCOPE.test(file) || SKIP_FILE.test(file) || !/\.(js|jsx)$/.test(file)) continue;
    for (const f of scan(fs.readFileSync(file, 'utf8'))) add(NAME, file, f.line, 'a count in the normal font inside a phrase (issue 260: the number in the data font): use dataPhrase or dataNumber: ' + f.text);
  }
}

module.exports = { name: NAME, check, scan };

if (require.main === module) {
  const { collect } = require('../check-common.js');
  const files = collect(), found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file) + ':' + line + '  ' + text) });
  // the rule's own fixtures: [source, findings]
  const fx = [
    ["const a = <span>{count + ' files'}</span>;", 1],
    ["const a = <MediaCard meta={c.count + ' assets'} />;", 1],
    ['const a = <p>{`${n} items`}</p>;', 1],
    ['const a = <p>12 files</p>;', 1],
    ["const L = { summary: '4,546 assets | 12.4 GB' };", 1],
    ["const a = <span>{formatNumber(total) + ' rows'}</span>;", 1],
    ["const a = <span>{dataPhrase('{n} files', { n: count })}</span>;", 0],
    ["const a = <MediaCard meta={dataPhrase(c.count + ' assets')} />;", 0],
    ["const a = <button aria-label={count + ' files'} />;", 0],
    ["const a = <span>{name + ' moved'}</span>;", 0],
    ["const a = <span>{count + ' files'}</span>;   // plx-allow-count: a sample", 0],
    ["const a = <Button onClick={() => setN(n + ' x')}>Go</Button>;", 0]];
  fx.forEach(([src, n]) => { const got = scan(src).length; if (got !== n) found.push('fixture: ' + src + ' gives ' + got + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'COUNT_PHRASES_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
