// Plenix · content lint: static defaults and specification copy; code examples and caller data are excluded.
// node check-copy.js [--strict] [--json]; --write-baseline is an explicit editorial migration, never run by a build.
const fs = require('fs'), path = require('path');
const RULES = require('./platform/standards/content/rules.json');
const ROOT = __dirname;
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function lintText(text, { kind = 'text' } = {}) {
  const out = [], value = String(text || '').replace(/\{\w+\}/g, '').trim();
  if (!value || /(?:https?:\/\/|<\w|=>|--plx-|\bvar\()/.test(value)) return out;
  const add = (rule, message) => out.push({ rule, message, text: String(text) });
  for (const [group, entries] of Object.entries({ american: RULES.american, inclusive: RULES.inclusive, glossary: RULES.glossary })) {
    for (const [word, replacement] of Object.entries(entries)) if (new RegExp('\\b' + escape(word) + '\\b', 'i').test(value)) add(group, 'Use ' + replacement + ' instead of ' + word + '.');
  }
  if (kind === 'label') {
    const rest = value.split(/\s+/).slice(1);
    const proper = RULES.properNames.join('|');
    const plain = value.replace(new RegExp('\\b(' + proper.split('|').map(escape).join('|') + ')\\b', 'g'), '');
    if (rest.length && plain.split(/\s+/).slice(1).some((word) => /^[A-Z][a-z]+$/.test(word.replace(/[.,:;!?…]+$/, '')))) add('sentence-case', 'Use sentence case; retain proper product names.');
  }
  if (kind === 'action' && /^[A-Za-z]/.test(value)) {
    const first = value.split(/[\s…:]/)[0];
    if (!RULES.actionVerbs.some((word) => word.toLowerCase() === first.toLowerCase())) add('action-verb', 'Start an action with a specific verb; review intentional noun commands.');
  }
  return out;
}
const literal = (n) => n && (n.type === 'StringLiteral' ? n.value : n.type === 'JSXText' ? n.value.replace(/\s+/g, ' ').trim()
  : n.type === 'JSXExpressionContainer' ? literal(n.expression) : n.type === 'TemplateLiteral' && !n.expressions.length ? n.quasis.map((q) => q.value.cooked).join('') : null);
const nameOf = (n) => n && (n.name || n.value || (n.object && nameOf(n.object) + '.' + nameOf(n.property)));
function scanSource(text, file = 'source.jsx') {
  if (!/\.(?:jsx?|mjs)$/.test(file)) return [];
  const Babel = require('@babel/standalone'), out = [], seen = new Set();
  let ast;
  try { ast = Babel.transform(text, { ast: true, code: false, parserOpts: { sourceType: 'unambiguous', plugins: ['jsx'] } }).ast; }
  catch (error) { return [{ rule: 'parse', line: error.loc ? error.loc.line : 1, text: '', message: error.message }]; }
  const add = (node, value, kind) => {
    if (value === null || value === undefined) return;
    const line = node.loc ? node.loc.start.line : 1;
    for (const finding of lintText(value, { kind })) { const key = node.start + ':' + finding.rule + ':' + value; if (!seen.has(key)) { seen.add(key); out.push(Object.assign({ line }, finding)); } }
  };
  const visit = (node, inStrings = false, specCopy = false) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach((n) => visit(n, inStrings, specCopy)); return; }
    if (node.type === 'VariableDeclarator' && /^(?:STRINGS|DEFAULT_STRINGS|DEFAULTS|MESSAGES|COPY|EN)$/.test(nameOf(node.id) || '')) { visit(node.init, true, specCopy); return; }
    if (node.type === 'AssignmentPattern' && /^(?:label|title|placeholder|description|hint|message|error|emptyText|alt)$/.test(nameOf(node.left) || '')) add(node.right, literal(node.right), /label|title/.test(nameOf(node.left)) ? 'label' : 'text');
    if (node.type === 'CallExpression' && nameOf(node.callee) === 'Object.assign' && node.arguments.some((n) => /(?:strings|messages|copy)$/i.test(nameOf(n) || ''))) {
      node.arguments.forEach((n) => visit(n, n.type === 'ObjectExpression', specCopy)); return;
    }
    if (node.type === 'ObjectProperty') {
      const key = nameOf(node.key), copy = specCopy || ['purpose', 'anatomy', 'behavior', 'accessibility', 'a11y', 'content', 'use', 'avoid', 'text', 'description'].includes(key);
      if (inStrings) add(node.value, literal(node.value), /(?:label|title|name)$/i.test(key) ? 'label' : 'text');
      if (copy && !inStrings && /design-system/.test(file)) add(node.value, literal(node.value), 'text');
      visit(node.value, inStrings, copy); return;
    }
    if (node.type === 'StringLiteral' && (inStrings || specCopy && /design-system/.test(file))) add(node, node.value, 'text');
    if (node.type === 'JSXElement') {
      const tag = nameOf(node.openingElement.name), attrs = node.openingElement.attributes;
      const get = (name) => attrs.find((a) => a.type === 'JSXAttribute' && nameOf(a.name) === name);
      const dynamic = attrs.some((a) => a.type === 'JSXSpreadAttribute');
      const alt = get('alt'), invalidAlt = alt && (!alt.value || alt.value.type === 'JSXExpressionContainer' && (alt.value.expression.type === 'NullLiteral' || alt.value.expression.type === 'BooleanLiteral' || alt.value.expression.type === 'Identifier' && alt.value.expression.name === 'undefined'));
      if (RULES.alt.requireOn.includes(tag) && (!alt && !dynamic || invalidAlt)) out.push({ rule: 'alt-required', line: node.loc.start.line, text: tag, message: 'Supply alt text, or alt="" for a decorative image.' });
      for (const attr of attrs) if (attr.type === 'JSXAttribute') {
        const key = nameOf(attr.name), v = literal(attr.value) || (attr.value && attr.value.expression && literal(attr.value.expression));
        if (['label', 'title', 'placeholder', 'aria-label', 'alt', 'description'].includes(key)) add(attr, v, key === 'label' || key === 'title' ? 'label' : 'text');
      }
      if (['Button', 'MenuItem', 'Link', 'Text', 'Notice', 'Heading', 'SectionHeading'].includes(tag)) for (const child of node.children) add(child, literal(child), tag === 'Button' || tag === 'MenuItem' ? 'action' : 'text');
    }
    for (const key of Object.keys(node)) if (!['loc', 'start', 'end', 'extra', 'leadingComments', 'trailingComments', 'innerComments'].includes(key)) visit(node[key], inStrings, specCopy);
  };
  visit(ast); return out;
}
function collect(root = ROOT) {
  const files = [], walk = (dir) => { if (!fs.existsSync(dir)) return; for (const entry of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, entry.name); if (entry.isDirectory()) walk(f); else if (/\.(?:jsx?|mjs)$/.test(f)) files.push(f); } };
  for (const dir of ['platform/components', 'platform/patterns', 'platform/providers', 'platform/hooks']) walk(path.join(root, dir));
  const spec = path.join(root, 'platform/design-system');
  if (fs.existsSync(spec)) { for (const file of ['inventory.js', 'inventory-docs.js', 'inventory-guidance.js']) if (fs.existsSync(path.join(spec, file))) files.push(path.join(spec, file)); walk(path.join(spec, 'parts')); }
  return files.filter((f) => !/\.labs\.js$/.test(f));
}
const keyOf = (finding) => JSON.stringify([finding.file, finding.rule, finding.text]);
function run(root = ROOT, { strict = false } = {}) {
  const baselineFile = path.join(root, 'platform/standards/content/baseline.json');
  const baseline = !strict && fs.existsSync(baselineFile) ? JSON.parse(fs.readFileSync(baselineFile, 'utf8')).findings || [] : [];
  for (const entry of baseline) if (!Number.isSafeInteger(entry.count) || entry.count <= 0 || entry.rule === 'parse') throw new Error('Invalid content baseline entry: counts must be positive safe integers, and parse errors cannot be exempt.');
  const remaining = new Map(baseline.map((entry) => [keyOf(entry), entry.count]));
  const all = collect(root).flatMap((file) => scanSource(fs.readFileSync(file, 'utf8'), path.relative(root, file).replace(/\\/g, '/')).map((finding) => Object.assign({ file: path.relative(root, file).replace(/\\/g, '/') }, finding)));
  const findings = all.filter((finding) => { if (finding.rule === 'parse') return true; const key = keyOf(finding), left = remaining.get(key) || 0; if (left) { remaining.set(key, left - 1); return false; } return true; });
  return { findings, existing: all.length - findings.length, total: all.length };
}
module.exports = { lintText, scanSource, collect, run, rules: RULES };
if (require.main === module) {
  const result = run(ROOT, { strict: process.argv.includes('--strict') || process.argv.includes('--write-baseline') });
  if (process.argv.includes('--write-baseline')) {
    if (result.findings.some((finding) => finding.rule === 'parse')) throw new Error('Fix source parse errors before writing a content baseline.');
    const byKey = new Map(); for (const finding of result.findings) { const key = keyOf(finding), entry = byKey.get(key) || { file: finding.file, rule: finding.rule, text: finding.text, count: 0 }; entry.count++; byKey.set(key, entry); }
    fs.writeFileSync(path.join(ROOT, 'platform/standards/content/baseline.json'), JSON.stringify({ description: 'Explicit existing-copy debt only; new or additional findings fail. Review before changing.', findings: [...byKey.values()] }, null, 2) + '\n');
    console.log('COPY_BASELINE ' + byKey.size + ' reviewed existing-copy entries');
  } else {
    if (process.argv.includes('--json')) console.log(JSON.stringify(result, null, 2));
    else { result.findings.forEach((f) => console.log(f.file + ':' + f.line + ' ' + f.rule + ': ' + f.message + ' [' + f.text + ']')); console.log((result.findings.length ? 'COPY_FAIL' : 'COPY_OK') + ' (' + result.findings.length + ' new, ' + result.existing + ' existing)'); }
    process.exitCode = result.findings.length ? 1 : 0;
  }
}
