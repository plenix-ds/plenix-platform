// Plenix · check-system rule "links-not-buttons" (owner, 2026-10-12; WCAG 2.2 SC 4.1.2, the Semantic HTML page): a link
// goes somewhere, a button does something, and each looks like what it is. Navigation is the Link component (an <a> with
// an href); an action is a Button (a quiet one is ghost or tertiary). So:
//   <Button variant="link">Clear all</Button>                      finding (a button styled as a link: ghost or tertiary)
//   h(P.Button, { variant: 'link' })   class="plx-button--link"    finding (the same)
//   <a className="plx-link">Save</a>   <Link onClick={save}>Save</Link>   finding (a link with no href: a Button)
//   <a href="#" onClick={(e) => { e.preventDefault(); save(); }}>   finding (the click stops the link to run an action)
//   <Text as="a" variant="link" href="…">                           finding (a link built from Text: use Link)
//   <Link href="../projects/">Projects</Link>                       ok
//   <a href={url} onClick={(e) => { e.preventDefault(); navigate(url); }}>   ok: it still goes where its href says
// A link whose click handler calls preventDefault passes only when the same handler navigates (navigate, go, pushState,
// replaceState, location, onNavigate, onOpen…, setRoute, route, open): a router link. Comments are not read, and a bare
// <a> or <Link> with no attributes is prose ("the <a>"), not markup. Documentation that shows what the rule rejects (a
// code sample in a string) carries plx-allow-links on its line.
// The rule is a module check-system.js runs (it loads every file in check-system.rules/):
//   require('./check-system.rules/links-not-buttons.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/links-not-buttons.js     -> LINKS_NOT_BUTTONS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'links-not-buttons';
// generated bundles and copies are checked through their sources
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived|archive|backups|audit|docs|spec-chunks)[\\/]|(^|[\\/])(app|assets|spec-index|spec-parts|native-guidance)\.js$|\.min\.js$/;
// a click handler that still navigates (a router link)
const NAVIGATES = /\b(navigate|go|pushState|replaceState|location|onNavigate|onOpen\w*|setRoute|route|open)\b/;

function lineOf(text, i) { return text.slice(0, i).split('\n').length; }

// the attribute text of a JSX or HTML opening tag that starts at i ("<a"), to its closing ">" (braces and quotes skipped)
function tagAt(text, i) {
  let depth = 0, q = null;
  for (let j = i + 1; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === q && text[j - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { if (depth || /[=\s]/.test(text[j - 1])) q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') depth--;
    else if (c === '>' && depth <= 0) return text.slice(i, j + 1);
  }
  return text.slice(i);
}
// the props object of h(X, { … }) that starts at i ("{"), to its matching brace
function objectAt(text, i) {
  let depth = 0, q = null;
  for (let j = i; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === q && text[j - 1] !== '\\') q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return text.slice(i, j + 1);
  }
  return text.slice(i);
}
// the props object's own keys only (nested objects and functions blanked), so a key inside a callback is not read
function ownKeys(obj) {
  let out = '', depth = 0, q = null;
  for (let j = 0; j < obj.length; j++) {
    const c = obj[j];
    if (q) { if (c === q && obj[j - 1] !== '\\') q = null; if (depth === 1) out += c; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; if (depth === 1) out += c; continue; }
    if (c === '{' || c === '(' || c === '[') { depth++; if (depth === 1) out += c; continue; }
    if (c === '}' || c === ')' || c === ']') { if (depth === 1) out += c; depth--; continue; }
    if (depth === 1) out += c;
  }
  return out;
}
// the text of the onClick handler in a tag's attributes or a props object (to its end), or null
function handlerOf(src) {
  const m = /\bonClick\s*[=:]\s*/.exec(src);
  return m ? src.slice(m.index + m[0].length, m.index + m[0].length + 400) : null;
}
// a link (an <a> or Link) is wrong when it has no href, or when its click stops the link to run an action
function linkProblem(hasHref, handler) {
  if (!hasHref) return 'a link with no href: it goes nowhere, so it is an action: use a Button (ghost or tertiary for a quiet one)';
  if (handler && /preventDefault\s*\(/.test(handler) && !NAVIGATES.test(handler)) return 'a link whose click prevents navigation to run an action: use a Button';
  return null;
}

// the text with its comments blanked (/* … */ and whole-line //), line numbers kept
function blankComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')).replace(/^([ \t]*)\/\/.*$/gm, (l, sp) => sp);
}

// the findings of one file's text: [{ line, text }]
function scan(source) {
  const text = blankComments(source);
  const out = [];
  const push = (i, msg) => out.push({ line: lineOf(text, i), text: msg });
  const VARIANT_LINK = /\bvariant\s*[=:]\s*(?:"link"|'link'|\{\s*['"]link['"]\s*\})/;
  // JSX: buttons styled as links, links without an href, links built from Text
  for (const m of text.matchAll(/<(Button|ShowMore|a|Link|Text)(?=[\s>/])/g)) {
    const attrs = tagAt(text, m.index), el = m[1];
    if (/^<\w+>$/.test(attrs)) continue;   // prose: "the <a>"
    if (el === 'Button' || el === 'ShowMore') { if (VARIANT_LINK.test(attrs)) push(m.index, 'a button styled as a link (variant="link"): an action is a Button (ghost or tertiary for a quiet one); navigation is a Link: ' + attrs.slice(0, 90)); continue; }
    if (el === 'Text') { if (/\bas\s*=\s*(?:"a"|'a'|\{\s*['"]a['"]\s*\})/.test(attrs)) push(m.index, 'a link built from Text (as="a"): use the Link component: ' + attrs.slice(0, 90)); continue; }
    if (el === 'a' && /^<a\s[^>]*\bname\s*=/.test(attrs) && !/\bonClick\s*=/.test(attrs)) continue;   // a named anchor (a target, not a link)
    if (el === 'a' && /\{\s*\.\.\./.test(attrs) && !/\bonClick\s*=/.test(attrs)) continue;            // a component's own anchor: its props bring the href
    const p = linkProblem(/\bhref\s*=/.test(attrs), handlerOf(attrs));
    if (p) push(m.index, p + ': ' + attrs.slice(0, 90));
  }
  // createElement: h(P.Button, { variant: 'link' }), h('a', { … }), h(P.Link, { … }), h(P.Text, { as: 'a' })
  for (const m of text.matchAll(/\b(?:h|createElement)\(\s*(?:(?:P|Plenix|window\.Plenix)\.(Button|ShowMore|Link|Text)|(Button|ShowMore|Link|Text)|['"](a)['"])\s*,\s*\{/g)) {
    const el = m[1] || m[2] || m[3], whole = objectAt(text, m.index + m[0].length - 1), props = ownKeys(whole);
    if (el === 'Button' || el === 'ShowMore') { if (VARIANT_LINK.test(props)) push(m.index, 'a button styled as a link (variant: \'link\'): use a ghost or tertiary Button, or a Link to go somewhere'); continue; }
    if (el === 'Text') { if (/\bas\s*:\s*['"]a['"]/.test(props)) push(m.index, 'a link built from Text (as: \'a\'): use the Link component'); continue; }
    const p = linkProblem(/\bhref\s*:/.test(props) || /\.\.\./.test(props), /\bonClick\s*:/.test(props) ? handlerOf(whole) : null);
    if (p) push(m.index, p);
  }
  // the class itself, in markup or a stylesheet
  for (const m of text.matchAll(/plx-button--link(?![\w-])/g)) push(m.index, 'plx-button--link: a button styled as a link: there is no link look for a Button');
  const lines = source.split('\n');
  return out.filter((x) => !/plx-allow-links/.test(lines[x.line - 1] || ''));
}

function check({ files, add }) {
  for (const f of files) {
    const file = f.file || f;
    if (!/\.(jsx|js|tsx|ts|html|css)$/.test(file) || SKIP_FILE.test(file) || path.resolve(file) === path.resolve(__filename)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (!/<a[\s>]|Link|link|['"]a['"]/.test(text)) continue;
    scan(text).forEach((x) => add(NAME, file, x.line, x.text));
  }
}

module.exports = { name: NAME, check, scan };

if (require.main === module) {
  const ROOT = path.join(__dirname, '..');
  const DIRS = ['platform', 'suite', 'dam', 'dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'services'];
  const files = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (SKIP_FILE.test(p + (e.isDirectory() ? path.sep : ''))) continue; if (e.isDirectory()) walk(p); else files.push({ file: p }); } };
  DIRS.forEach((d) => walk(path.join(ROOT, d)));
  const found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file).split(path.sep).join('/') + ':' + line + '  ' + text) });
  // the rule's own fixtures: [source, findings expected]
  const fx = [
    ['<Button variant="link" onClick={clear}>Clear all</Button>', 1],
    ['<Button size="xs" variant={\'link\'} onClick={clear}>Clear</Button>', 1],
    ['<ShowMore variant="link" expanded={x} />', 1],
    ['<Button variant="ghost" onClick={clear}>Clear all</Button>', 0],
    ["h(P.Button, { size: 'sm', variant: 'link' }, 'Select all')", 1],
    ["h(P.Button, { variant: 'tertiary', onClick: go }, 'Select all')", 0],
    ['<button class="plx-button plx-button--link">Clear</button>', 1],
    ['<a className="plx-link">Save</a>', 1],
    ['<Link onClick={save}>Save</Link>', 1],
    ['<Link href="../projects/">Projects</Link>', 0],
    ['<a href="#" onClick={(e) => { e.preventDefault(); save(); }}>Save</a>', 1],
    ['<a href={url} onClick={(e) => { e.preventDefault(); navigate(url); }}>Open</a>', 0],
    ['<a href={url} onClick={track}>Open</a>', 0],
    ['<Text as="a" variant="link" href="#">Terms</Text>', 1],
    ["h(P.Text, { as: 'a', variant: 'link', href: '#' }, 'Terms')", 1],
    ["h(P.Link, { href: '#/x' }, 'X')", 0],
    ["h('a', { className: 'x', onClick: save }, 'Save')", 1],
    ["h('a', { href: u, onClick: function (e) { e.preventDefault(); remove(); } }, 'Remove')", 1],
    ['<a ref={ref} {...rest} className="x" />', 0],
    ['"<Button variant=\\"link\\">"   // plx-allow-links', 0]];
  fx.forEach(([src, n]) => { const got = scan(src).length; if (got !== n) found.push('fixture: ' + src + ' gives ' + got + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'LINKS_NOT_BUTTONS_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
