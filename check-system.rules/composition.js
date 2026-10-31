// Plenix · check-system rule "composition" (owner, 2026-10-15/16, GitHub #55: the composition standard): a screen is
// built from patterns, never from loose components. The standard is platform/standards/layout.json (its "fields"
// part): a field (Input, Select, Combobox, SearchField, the pickers …) sits inside a pattern that sizes it, a "stretch"
// pattern (Form, Field, a dialog, a settings row …: the field fills its column) or a "content" one (CommandBar,
// Toolbar …: the field takes its content's width). A field anywhere else is a finding, with the pattern to use.
// What it reads: the applications' screens (<app>/*.jsx, suite/*.jsx, dam/app/**/*.jsx), parsed as JSX; a field's
// ancestors are the elements around it in the same file, and the element whose prop it is passed in
// (<CommandBar find={<SearchField …/>} /> counts as inside the CommandBar).
// The rule is a module check-system.js runs: require('./check-system.rules/composition.js').check({ add })
// Alone: node check-system.rules/composition.js [--report]   -> COMPOSITION_OK, or the findings (--report: exit 0)
const fs = require('fs');
const path = require('path');

const NAME = 'composition';
const ROOT = path.join(__dirname, '..');
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'suite', 'dam/app'];

function standard() {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/standards/layout.json'), 'utf8'));
  const f = j.fields || {};
  return { fields: new Set(f.components || []), allowed: new Set([].concat(f.stretch || [], f.content || [], f.row || [])) };
}
function files() {
  const out = [];
  const walk = (dir) => { if (!fs.existsSync(dir)) return; for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p); else if (/\.[jt]sx$/.test(e.name)) out.push(p);
  } };
  for (const a of APPS) walk(path.join(ROOT, a));
  return out;
}
let Babel = null;
const parse = (src, file = '') => {
  Babel = Babel || require(path.join(ROOT, 'node_modules/@babel/standalone'));
  return Babel.transform(src, { ast: true, code: false, sourceType: 'module', parserOpts: { plugins: /\.tsx$/.test(file) ? ['jsx', 'typescript'] : ['jsx'] } }).ast;   // JSX (and TypeScript) parsed, not transformed
};
const nameOf = (n) => (n && n.type === 'JSXIdentifier' ? n.name : n && n.type === 'JSXMemberExpression' ? nameOf(n.object) + '.' + n.property.name : '');

// the findings of one file: [{ line, text }]
function scan(file, S) {
  const out = [];
  let ast;
  try { ast = parse(fs.readFileSync(file, 'utf8'), file); } catch (e) { return [{ line: 0, text: 'cannot be parsed: ' + e.message.split('\n')[0] }]; }
  const SKIP = new Set(['loc', 'start', 'end', 'leadingComments', 'trailingComments', 'innerComments', 'extra']);
  const each = (node, fn) => { for (const k of Object.keys(node)) if (!SKIP.has(k)) fn(node[k]); };
  // the file's own components (const Row = (…) => …, function Row(…) {…}): name -> body
  const comps = {};
  const findComps = (node) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach(findComps); return; }
    if (node.type === 'FunctionDeclaration' && node.id && /^[A-Z]/.test(node.id.name)) comps[node.id.name] = node.body;
    if (node.type === 'VariableDeclarator' && node.id && node.id.type === 'Identifier' && /^[A-Z]/.test(node.id.name) && node.init && /Function/.test(node.init.type)) comps[node.id.name] = node.init.body;
    each(node, findComps);
  };
  findComps(ast.program);
  // what a body holds: fields with nothing around them (the component returns a field: its users are checked instead),
  // and whether it puts its children inside an allowed pattern (the component sizes what it wraps)
  const inspect = (body, allowed, fields) => {
    let bare = false, wraps = false;
    const walk = (node, stack) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach((n) => walk(n, stack)); return; }
      let next = stack;
      if (node.type === 'JSXElement') {
        const name = nameOf(node.openingElement.name).split('.')[0];
        if (fields.has(name) && !stack.length) bare = true;
        next = stack.concat(name);
      }
      if (node.type === 'JSXExpressionContainer' && node.expression && node.expression.type === 'Identifier' && node.expression.name === 'children' && stack.some((s) => allowed.has(s))) wraps = true;
      each(node, (c) => walk(c, next));
    };
    walk(body, []);
    return { bare, wraps };
  };
  const allowed = new Set(S.allowed), fields = new Set(S.fields), fieldLike = new Set(), sized = new Set();
  // where each local component is used: inside an allowed pattern (or a sized component), or not; a component used only
  // inside them is sized itself (a dialog's step components, rendered in its body)
  const usage = () => {
    const seen = {};
    const walk = (node, stack, owner) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach((n) => walk(n, stack, owner)); return; }
      let next = stack, own = owner;
      if (node.type === 'FunctionDeclaration' && node.id && comps[node.id.name]) own = node.id.name;
      if (node.type === 'VariableDeclarator' && node.id && node.id.type === 'Identifier' && comps[node.id.name]) own = node.id.name;
      if (node.type === 'JSXElement') {
        const name = nameOf(node.openingElement.name).split('.')[0];
        if (comps[name]) { const ok = stack.some((s) => allowed.has(s)) || (own && sized.has(own)); (seen[name] = seen[name] || []).push(ok); }
        next = stack.concat(name);
      }
      each(node, (c) => walk(c, next, own));
    };
    walk(ast.program, [], null);
    return seen;
  };
  for (let round = 0, grew = true; grew && round < 6; round++) {
    grew = false;
    for (const [name, body] of Object.entries(comps)) {
      const r = inspect(body, allowed, fields);
      if (r.wraps && !allowed.has(name)) { allowed.add(name); grew = true; }
      if (r.bare && !fields.has(name)) { fields.add(name); fieldLike.add(name); grew = true; }
    }
    const seen = usage();
    for (const [name, list] of Object.entries(seen)) if (list.length && list.every(Boolean) && !sized.has(name)) { sized.add(name); grew = true; }
  }
  const visit = (node, stack, inside, owner) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) { node.forEach((n) => visit(n, stack, inside, owner)); return; }
    let next = stack, within = inside, own = owner;
    if (node.type === 'FunctionDeclaration' && node.id && comps[node.id.name]) own = node.id.name;
    if (node.type === 'VariableDeclarator' && node.id && node.id.type === 'Identifier' && comps[node.id.name]) own = node.id.name;
    if ((node.type === 'FunctionDeclaration' && node.id && fieldLike.has(node.id.name)) || (node.type === 'VariableDeclarator' && node.id && fieldLike.has(node.id.name))) within = true;
    if (node.type === 'JSXElement') {
      const name = nameOf(node.openingElement.name).split('.')[0];
      // a field a field-like component returns is checked where that component is used
      if (fields.has(name) && !(within && !stack.length) && !(own && sized.has(own)) && !stack.some((s) => allowed.has(s))) {
        out.push({ line: node.loc ? node.loc.start.line : 0, text: '<' + name + '> is not inside a pattern that sizes it (around it: ' + (stack.slice(-3).join(' › ') || 'nothing') + '): put it in a Form or Field (it fills its column), or in the CommandBar or a Toolbar (it takes its content’s width)' });
      }
      next = stack.concat(name);
    }
    each(node, (c) => visit(c, next, within, own));
  };
  visit(ast.program, [], false, null);
  return out;
}

function check({ add }) {
  const S = standard();
  for (const f of files()) for (const x of scan(f, S)) add(NAME, path.relative(ROOT, f).split(path.sep).join('/'), x.line, x.text);
}
module.exports = { check, scan, NAME };

if (require.main === module) {
  const found = [];
  check({ add: (rule, file, line, text) => found.push(file + ':' + line + '  ' + text) });
  if (!found.length) { console.log('COMPOSITION_OK'); process.exit(0); }
  console.log(found.join('\n') + '\n' + found.length + ' finding(s)');
  process.exit(process.argv.includes('--report') ? 0 : 1);
}
