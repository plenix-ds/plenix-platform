// Builds the TypeScript definitions of @plenix-ds/react (packages/react/index.d.ts) from the source files' structured header
// comments (Summary / Usage / Props) and the defaults in their code: the same reading the design system's API tables use.
//   Prop types: quoted choices ("md" | "sm") become a union, true/false a boolean, a number default a number, on… a
//   handler, children/label/title/icon/… a React node; anything the header does not pin down stays `any`.
//   A component with "...rest" also takes the attributes of its element.
// Called by build-packages.js; can run alone: node build-types.js
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const P = path.join(ROOT, 'platform');
const sourceProps = require('./build-types-source');
const contract = require('./build-types-contracts');

// the structured header comment: { summary, props: [[name, text]] } (spec-catalog.js structured(), batch 162)
function structured(c) {
  const out = { summary: '', props: [] }; let cur = null, seen = false;
  const add = (t, indent) => {
    if (!t.trim()) return;
    if (cur === 'summary') out.summary += (out.summary ? ' ' : '') + t.trim();
    else if (cur === 'props') {
      const m = indent <= 5 && /^(\S+?(?:\([^)]*\))?):\s(.*)$/.exec(t.trim());
      if (m) out.props.push([m[1], m[2]]); else if (out.props.length) out.props[out.props.length - 1][1] += ' ' + t.trim();
    }
  };
  c.split('\n').forEach((l) => {
    const s = /^\s{3}(Summary|Usage|Props|Behavior|Notes):\s?(.*)$/.exec(l);
    if (s) { cur = s[1].toLowerCase(); seen = true; if (s[2]) add(s[2], 5); return; }
    if (cur) add(l.replace(/^\s{5}/, ''), (/^\s*/.exec(l) || [''])[0].length);
  });
  return seen ? out : null;
}
// the defaults a component's function gives its props: { name: 'value as written' } (spec-catalog.js defaultsOf())
function defaultsOf(jsx, name) {
  const re = new RegExp('export\\s+(?:const\\s+' + name + '\\s*=\\s*(?:React\\.forwardRef\\()?function\\s*\\w*|function\\s+' + name + ')\\s*\\(\\{([\\s\\S]*?)\\}\\s*[,)]');
  const m = re.exec(jsx || ''); if (!m) return {};
  const out = {}; let depth = 0, cur = '', q = null;
  for (const ch of m[1] + ',') {
    if (q) { cur += ch; if (ch === q) q = null; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { q = ch; cur += ch; continue; }
    if ('([{'.includes(ch)) depth++; if (')]}'.includes(ch)) depth--;
    if (ch === ',' && depth === 0) { const d = /^\s*(\w+)\s*=\s*([\s\S]+?)\s*$/.exec(cur); if (d) out[d[1]] = d[2]; cur = ''; continue; }
    cur += ch;
  }
  return out;
}
const NODE = /^(children|label|title|description|icon|iconEnd|media|actions|footer|header|meta|prefix|suffix|start|end|empty|aside|topStart|bottomEnd|caption|eyebrow|help|error|hint|badge|avatar|trailing|leading)$/;
function typeOf(name, text, def) {
  if (/^on[A-Z]/.test(name)) return '(...args: any[]) => void';
  const head = text.split(/[;(:]/)[0];
  const choices = [...head.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  const listed = [...text.matchAll(/(?:^|\|\s*)"([^"]+)"/g)].map((m) => m[1]);
  const opts = [...new Set(listed.length > 1 ? listed : choices)];
  const literal = def && /^['"].*['"]$/.test(def) ? def.slice(1,-1) : null;
  if (literal && opts.length > 1 && !opts.includes(literal)) opts.unshift(literal);
  if (opts.length > 1 && /\|/.test(text)) return opts.map((o) => JSON.stringify(o)).join(' | ') + (NODE.test(name) ? ' | React.ReactNode' : '');
  if (def === 'true' || def === 'false' || /^(true|false)\b/.test(text) || /\btrue\b.*\bfalse\b|\bfalse\b.*\btrue\b/.test(head)) return 'boolean';
  if (def && /^-?\d+(\.\d+)?$/.test(def)) return 'number';
  if (NODE.test(name)) return 'React.ReactNode';
  if (def && /^['"`]/.test(def)) return 'string';
  if (def && /^\[/.test(def)) return 'any[]';
  return 'any';
}
const doc = (t) => '  /** ' + t.replace(/\*\//g, '* /').replace(/\s+/g, ' ').trim() + ' */\n';

module.exports = function buildTypes(outFile, version) {
  const index = fs.readFileSync(path.join(P, 'index.js'), 'utf8');
  const blocks = [], names = [], components = [];
  for (const m of index.matchAll(/export \{([^}]+)\} from '([^']+)'/g)) {
    const file = path.join(P, m[2]);
    const src = fs.readFileSync(file, 'utf8');
    const hc = (/^\s*\/\*([\s\S]*?)\*\//.exec(src) || [])[1] || '';
    const head = structured(hc);
    for (const raw of m[1].split(',').map((x) => x.trim()).filter(Boolean)) {
      // an export renamed in index.js ("PLACEMENTS as FLOATING_PLACEMENTS") is published, and typed, under its public name
      const as = /^(\w+)\s+as\s+(\w+)$/.exec(raw);
      if (as && as[2] === 'DataTable') { names.push(as[2]); components.push(as[2]); blocks.push('export declare const DataTable: typeof DataGrid;'); continue; }
      if (as) { names.push(as[2]); blocks.push(/^use[A-Z]|^[a-z]/.test(as[2]) ? 'export declare function ' + as[2] + '(...args: any[]): any;' : 'export declare const ' + as[2] + ': any;'); continue; }
      const name = raw; names.push(name);
      const precise = contract(name, P);
      if (precise) { blocks.push(precise); if (/^[A-Z]/.test(name)) components.push(name); continue; }
      const documented = /^[A-Z][a-z]/.test(name) && !name.endsWith('Context') && head && (hc.split('\n')[0].match(/[A-Za-z_$][\w$]*/g) || []).includes(name);
      const actual = sourceProps(src, name);
      if (actual?.namespace && documented) {
        blocks.push('export declare const ' + name + ': {\n' + actual.namespace.map(part => '  ' + JSON.stringify(part.key) + ': ' + (part.name && sourceProps(src, part.name)?.jsx ? 'React.ComponentType<{ [prop: string]: unknown }>' : 'unknown') + ';').join('\n') + '\n};');
        components.push(name); continue;
      }
      if (documented && !actual) throw Error('build-types: cannot read documented component: ' + name);
      const isComponent = /^[A-Z]/.test(name) && actual && (actual.jsx || documented);
      if (!isComponent) {
        // hooks, helpers and data: typed loosely (their headers describe behavior, not a signature)
        blocks.push(/^use[A-Z]|^[a-z]/.test(name) ? 'export declare function ' + name + '(...args: any[]): any;' : 'export declare const ' + name + ': any;');
        continue;
      }
      components.push(name);
      const defs = Object.assign(defaultsOf(src, name), Object.fromEntries(Object.entries(actual.props).filter(([, p]) => p.default !== undefined).map(([key, p]) => [key, p.default])));
      const firstOfFile = new RegExp('export\\s+(?:const|function)\\s+(\\w+)').exec(src);
      const first = !!(firstOfFile && firstOfFile[1] === name);
      // the header's props that are this export's: a plain name on the file's first component, "Name.prop" on the export
      // Name (StatusIcon.tone); a part's ("AppHeader.Item.href") or a field's ("items[].children") stay out (parts are
      // typed loosely below), and a name documented twice is typed once
      const props = [], seen = new Set();
      if (head) head.props.forEach(([p, text]) => {
        const k = p.replace(/\(.*$/, '');
        const dotted = /^(\w+)\.(\w+)$/.exec(k);
        const n = /^\.\.\./.test(k) ? (first ? '...' : '') : dotted ? (dotted[1] === name ? dotted[2] : '') : first && /^[\w$]+$/.test(k) ? k : '';
        if (n && !seen.has(n)) { seen.add(n); props.push([n, text]); }
      });
      for (const key of Object.keys(actual.props)) if (!props.some(([name]) => name === key)) props.push([key, 'Read by the component.']);
      let rest = false; const lines = [], own = [];
      props.forEach(([n, text]) => {
        if (n === '...') { rest = true; return; }
        const d = defs[n];
        own.push(n);
        lines.push(doc(text + (d ? ' Default: ' + d + '.' : '')) + '  ' + JSON.stringify(n) + '?: ' + typeOf(n, text, d) + ';');
      });
      if (!props.length) rest = true;   // a part or an undocumented component: its element's attributes and anything else
      const summary = first && head ? head.summary : '';
      // the element's attributes, less those the component gives its own meaning (a title that is a node, not a string)
      const attrs = own.length ? 'Omit<React.HTMLAttributes<HTMLElement>, ' + own.map((n) => JSON.stringify(n)).join(' | ') + '>' : 'React.HTMLAttributes<HTMLElement>';
      blocks.push((summary ? '/** ' + summary.replace(/\*\//g, '* /') + ' */\n' : '') + 'export interface ' + name + 'Props' + (rest ? ' extends ' + attrs : '') + ' {\n'
        + (lines.length ? lines.join('\n') + '\n' : '') + '  [prop: string]: any;\n}\n'
        + 'export declare const ' + name + ': React.ComponentType<' + name + 'Props & React.RefAttributes<any>> & { [part: string]: any };');
    }
  }
  // every public name is a plain identifier, once (a form of export the reading above does not know would otherwise
  // write a definition TypeScript cannot parse)
  names.forEach((n, i) => { if (!/^[A-Za-z_$][\w$]*$/.test(n) || names.indexOf(n) !== i) throw new Error('build-types: cannot type the export "' + n + '" of platform/index.js'); });
  const text = '/* @plenix-ds/react ' + version + ' · TypeScript definitions, generated by build-types.js from the components\' header comments (do not edit). */\n'
    + 'import * as React from \'react\';\n\n' + blocks.join('\n\n') + '\n';
  checkCoverage(index, text);
  assertTypedComponents(text, components);
  fs.writeFileSync(outFile, text);
  return { exports: names.length, file: outFile };
};

// Parse the public API independently of the header generator: an unfamiliar export must fail, never disappear silently.
function checkCoverage(index, declarations) {
  const ast = require('@babel/standalone').transform(index, { ast: true, code: false, sourceType: 'module' }).ast;
  const names = [];
  for (const node of ast.program.body) {
    if (node.type === 'ExportAllDeclaration' || node.type === 'ExportDefaultDeclaration') throw new Error('build-types: unsupported public export; use named re-exports in platform/index.js');
    if (node.type !== 'ExportNamedDeclaration') continue;
    if (node.declaration) {
      const declaration = node.declaration;
      if (declaration.id) names.push(declaration.id.name);
      else for (const item of declaration.declarations || []) {
        if (item.id.type !== 'Identifier') throw new Error('build-types: unsupported destructured public export');
        names.push(item.id.name);
      }
    }
    for (const item of node.specifiers) names.push(item.exported.name || item.exported.value);
  }
  const declared = new Set([...declarations.matchAll(/export declare (?:const|function|class) ([A-Za-z_$][\w$]*)/g)].map(match => match[1]));
  const missing = names.filter(name => !declared.has(name));
  if (missing.length) throw new Error('build-types: missing declarations for ' + missing.join(', '));
  return names;
}
module.exports.checkCoverage = checkCoverage;

if (require.main === module) {
  const out = path.join(ROOT, 'packages', 'react', 'index.d.ts');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const r = module.exports(out, require('./package.json').version);
  console.log('Built ' + path.relative(ROOT, r.file) + ' (' + r.exports + ' exports)');
}

function assertTypedComponents(text, names) {
  const expected = new Set(names);
  const ast = require('@babel/standalone').transform(text, {ast:true,code:false,parserOpts:{sourceType:'module',plugins:['typescript']}}).ast;
  const erased = type => type && (type.type === 'TSAnyKeyword' || type.type === 'TSTypeReference' && (type.typeParameters?.params || []).some(value => value.type === 'TSAnyKeyword'));
  for (const item of ast.program.body) {
    const declaration = item.type === 'ExportNamedDeclaration' && item.declaration;
    if (!declaration) continue;
    for (const value of declaration.declarations || []) if (expected.has(value.id.name) && erased(value.id.typeAnnotation?.typeAnnotation)) throw Error('build-types: documented component is any: ' + value.id.name);
    if (expected.has(declaration.id?.name) && erased(declaration.returnType?.typeAnnotation)) throw Error('build-types: documented component is any: ' + declaration.id.name);
  }
}
module.exports.assertTypedComponents = assertTypedComponents;
