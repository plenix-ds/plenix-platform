// Plenix · check-system rule "inline-style" (the owner's rule, 2026-10-13, replacing "no inline style, no exceptions"):
//   "sometimes we have situations in which JavaScript is needed to make adjustments on the spot. And these adjustments make
//   inline styles. However these adjustments are based on tokens and defined styles to make inline adjustments for that
//   moment. This is very different from an inline style that is not defined or part of token. So in this case inline
//   styling is permitted."
// What it rejects:
//   markup   a style attribute written in markup: style="…" in an HTML file, in an HTML string or template in code, or as a
//            JSX string attribute (<div style="…">); a <style> block anywhere
//   literal  a hard-coded design value written by code: a color (#fff, rgb(…), hsl(…), a color name on a color property),
//            a length with a unit (12px, 1.5rem, 50%), a font family, or a bare number (fontSize: 14), in
//              el.style.x = …, el.style[x] = …, el.style.setProperty(name, …), el.setAttribute('style', …), el.style.cssText = …,
//              a JSX style={{…}} object, a style: {…} object in h() / createElement props
//   off-grid  a length (width, height, inset, margin, padding, gap, transform, a custom property…) written from an
//            expression that is neither a token nor passed through the grid helper (utils/grid.js: gridPx, snapToGrid)
//            or the size steps (utils/sizeSteps.js: snapSize, stepSize): the output "has to conform to fit into the grid
//            system!!! important" (owner, 2026-10-13)
// What it accepts (a JavaScript adjustment, React's style prop included; owner, 2026-10-13):
//   a var(--plx-…) reference (var(--ds-…) on the design system's own page); a length through gridPx / snapToGrid /
//   snapSize / stepSize (a measured anchor plus token offsets, snapped); a value computed in code for a property that is
//   not a length (a color read from a token); a keyword (none, auto, hidden, absolute, inherit…); '' (clearing a
//   property); 0; a percentage; and a spread or variable the check cannot see into
//   el.style.width = gridPx(width)                     ok      el.style.color = '#fff'                       finding
//   el.style.width = width + 'px'                      finding (a length off the grid helper)
//   el.style.setProperty('--plx-x', 'var(--plx-y)')    ok      el.style.setProperty('margin', '8px')         finding
//   style={{ inlineSize: w }}                          ok      style={{ fontSize: 14 }}                      finding
//   style={{ color: 'var(--plx-sys-text)' }}           ok      <div style="color: red">                      finding
// Owner decisions that stay: a DataGrid's row height and cell padding are the density's (tokens and classes); no code
// writes them (the style audit and the pages test check the DataGrid at run time).
// A line of prose that names the rule (documentation) carries plx-allow-style (check-system.js leaves it alone).
// The rule is a module check-style.js runs (a style rule: check-common.js, STYLE_MODULES) (every file of check-system.rules/):
//   require('./check-system.rules/inline-style.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/inline-style.js     -> INLINE_STYLE_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'inline-style';
// generated bundles are checked through their sources; native-guidance.js holds Swift / Kotlin / XML samples as text
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived|archive|backups)[\\/]|[\\/](app|assets)\.js$|[\\/]design-system[\\/]native-guidance(-full)?\.js$/;
const SPEC_PAGE = /[\\/]platform[\\/]design-system[\\/]/;

const COLOR_PROP = /color|background|border(?!.*(width|radius|style))|outline(?!.*(width|offset|style))|fill|stroke|shadow|caret|accent/i;
const FONT_PROP = /^(font|font-?family|fontFamily)$/i;
const NAMED = /\b(white|black|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|maroon|navy|teal|olive|lime|aqua|fuchsia|brown|gold|indigo|violet)\b/i;
const KEYWORD = /^\s*(none|auto|inherit|initial|unset|revert|currentcolor|transparent|normal|hidden|visible|block|inline|inline-block|flex|grid|contents|absolute|relative|fixed|sticky|static|top|bottom|left|right|center|start|end|both|nowrap|pre|pointer|default|0)?\s*$/i;

// a property that takes a length (written through the grid helper or as a token)
const LENGTH_PROP = /^--|width|height|inset|^(top|right|bottom|left)$|margin|padding|gap|translate|transform|size|offset|basis|indent|spacing|radius/i;
const ON_GRID = /\b(gridPx|snapToGrid|snapSize|stepSize)\s*\(|var\(\s*--(plx|ds)-/;
const lineOf = (text, i) => text.slice(0, i).split('\n').length;
// comments blanked (line numbers kept): /* … */ blocks and whole-line // comments
function blank(text) {
  return text.replace(/\/\*[\s*][\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/^([ \t]*)\/\/[^\n]*/gm, (m, a) => a + m.slice(a.length).replace(/./g, ' '));
}
// from an opening bracket at i to its match (strings skipped); returns the index of the closing bracket
function close(text, i) {
  const open = text[i], shut = { '{': '}', '(': ')', '[': ']' }[open];
  let depth = 0, q = null;
  for (let j = i; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === open) depth++;
    else if (c === shut && --depth === 0) return j;
  }
  return text.length - 1;
}
// an expression from i to its end: a top-level , ; ) } or a line end
function exprAt(text, i) {
  let depth = 0, q = null, j = i;
  for (; j < text.length; j++) {
    const c = text[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') { if (depth === 0) break; depth--; }
    else if (depth === 0 && (c === ',' || c === ';' || c === '\n')) break;
  }
  return text.slice(i, j);
}
// the top-level parts of a list (an object body, call arguments)
function parts(body) {
  const out = []; let depth = 0, q = null, start = 0;
  for (let j = 0; j < body.length; j++) {
    const c = body[j];
    if (q) { if (c === '\\') { j++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') depth--;
    else if (c === ',' && depth === 0) { out.push(body.slice(start, j)); start = j + 1; }
  }
  out.push(body.slice(start));
  return out.map((x) => x.trim()).filter(Boolean);
}
// the static text of an expression's string literals (a template's text between its ${…} parts)
function strings(expr) {
  const out = [];
  for (const m of expr.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)) {
    if (m[3] !== undefined) out.push(...m[3].split(/\$\{[^}]*\}/)); else out.push(m[1] !== undefined ? m[1] : m[2]);
  }
  return out;
}

// why a value expression is a hard-coded design value (null: a token, a computed value or a keyword)
function literal(expr, prop, spec) {
  const e = String(expr || '').trim();
  if (!e) return null;
  if (/^-?\d*\.?\d+$/.test(e) && Number(e) !== 0) return 'a number written in code (' + e + ')';
  // a length: a token, the grid helper or the size steps (a keyword, '', 0 or a percentage needs neither)
  if (prop && prop !== 'any' && LENGTH_PROP.test(prop) && !ON_GRID.test(e) && !/^(['"`])\s*(-?\d*\.?\d+%|0(px)?|[a-z-]*)\s*\1$/i.test(e) && !/^0$/.test(e)) {
    const lit = /^(['"`])([^'"`]*)\1$/.exec(e);
    if (!lit || /\d|\$\{/.test(lit[2])) return 'a length off the grid helper (' + e.slice(0, 40) + '): use gridPx / snapToGrid (utils/grid.js) or a token';
  }
  for (let s of strings(e)) {
    s = s.replace(spec ? /var\(\s*--(plx|ds)-[\w-]+\s*\)/g : /var\(\s*--plx-[\w-]+\s*\)/g, ' ');
    if (/#[0-9a-f]{3,8}\b/i.test(s) || /\b(rgba?|hsla?|oklch|oklab|lab|lch|hwb|color)\(/i.test(s)) return 'a color written in code (' + s.trim().slice(0, 30) + ')';
    if (/(^|[^\w$.-])(?!0+(\.0+)?(px|rem|em|%)?\b)\d*\.?\d+(px|rem|em|pt|pc|vh|vw|vmin|vmax|ch|ex|cm|mm|in)(?![\w-])/i.test(s)) return 'a size written in code (' + s.trim().slice(0, 30) + ')';
    if (prop && FONT_PROP.test(prop) && !KEYWORD.test(s) && s.trim()) return 'a font written in code (' + s.trim().slice(0, 30) + ')';
    if (prop && COLOR_PROP.test(prop) && NAMED.test(s)) return 'a color written in code (' + s.trim().slice(0, 30) + ')';
    if (!prop && NAMED.test(s) && /(color|background|border|fill|stroke)\s*:/i.test(s)) return 'a color written in code (' + s.trim().slice(0, 30) + ')';
  }
  return null;
}

// every finding in one source text: [{ line, text }]
function scan(text, opts) {
  const html = !!(opts && opts.html), spec = !!(opts && opts.spec);
  const code = blank(text), out = [];
  const push = (i, why, snippet) => out.push({ line: lineOf(code, i), text: why + ': ' + (snippet || code.slice(i, i + 70)).split('\n')[0].trim() });
  // markup: a style attribute or a style block written as markup (an HTML file, an HTML string, a JSX string attribute)
  for (const m of code.matchAll(html ? /\bstyle\s*=\s*["']|<style[\s>]/gi : /\bstyle=\\?["']|\bstyle=`|<style[\s>]/g)) push(m.index, 'a style written in markup');
  if (html) return out;
  // JS writes: el.style.x = v, el.style[x] = v
  for (const m of code.matchAll(/\.style\s*(?:\.\s*([\w$]+)|\[([^\]\n]*)\])\s*=(?!=)\s*/g)) {
    const prop = m[1] === 'cssText' ? null : m[1] || (/^['"]([\w-]+)['"]$/.test((m[2] || '').trim()) ? m[2].trim().slice(1, -1) : 'any');
    const why = literal(exprAt(code, m.index + m[0].length), prop, spec);
    if (why) push(m.index, why);
  }
  // style.setProperty(name, value) and setAttribute('style', value)
  for (const m of code.matchAll(/\.style\s*\.\s*setProperty\s*\(|\.setAttribute\s*\(\s*['"]style['"]\s*,/g)) {
    const open = code.indexOf('(', m.index), args = parts(code.slice(open + 1, close(code, open)));
    const isAttr = /setAttribute/.test(m[0]);
    const name = isAttr ? null : (/^['"]([\w-]+)['"]$/.test(args[0] || '') ? args[0].slice(1, -1) : 'any');
    const why = literal(isAttr ? args[1] : args[1], name, spec);
    if (why) push(m.index, why);
  }
  // style objects: style={{…}} (JSX) and style: {…} (h() / createElement props); a variable or a call is computed
  for (const m of code.matchAll(/\bstyle\s*=\s*\{\s*\{|[{,(]\s*style\s*:\s*\{/g)) {
    const at = m.index + m[0].length - 1;   // the object's own brace
    const body = code.slice(at + 1, close(code, at));
    for (const p of parts(body)) {
      if (p.startsWith('...')) continue;
      const k = /^(?:['"]([^'"]+)['"]|([\w$]+)|\[[^\]]*\])\s*:\s*([\s\S]*)$/.exec(p);
      if (!k) continue;
      const why = literal(k[3], k[1] || k[2] || 'any', spec);
      if (why) { push(m.index, why, 'style ' + p.slice(0, 60)); }
    }
  }
  return out;
}

function check({ files, add }) {
  for (const f of files) {
    const file = f.file || f;
    if (!/\.(jsx|js|html)$/.test(file) || SKIP_FILE.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (!/style/i.test(text)) continue;
    scan(text, { html: /\.html$/.test(file), spec: SPEC_PAGE.test(file) }).forEach((x) => add(NAME, file, x.line, x.text));
  }
}

module.exports = { name: NAME, check, scan, literal };

if (require.main === module) {
  const ROOT = path.join(__dirname, '..');
  const DIRS = ['platform', 'suite', 'dam', 'dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'services'];
  const files = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (SKIP_FILE.test(p + (e.isDirectory() ? path.sep : ''))) continue; if (e.isDirectory()) walk(p); else files.push({ file: p }); } };
  DIRS.forEach((d) => walk(path.join(ROOT, d)));
  const found = [];
  check({ files, add: (rule, file, line, text) => { if (!/plx-allow-style/.test((fs.readFileSync(file, 'utf8').split('\n')[line - 1]) || '')) found.push(path.relative(ROOT, file).split(path.sep).join('/') + ':' + line + '  ' + text); } });
  // the rule's own fixtures: [source, findings expected, html]
  const fx = [
    // accepted: JavaScript adjustments from tokens, defined styles or measured layout
    ['el.style.width = gridPx(width);', 0], ["el.style.insetBlockStart = gridPx(r.bottom + tokenPx('--plx-sys-space-stack-xs'));", 0], ["el.style.inset = '';", 0], ["el.style.display = 'none';", 0], ["el.style.width = '50%';", 0],
    ["el.style.setProperty('--plx-comp-x', 'var(--plx-sys-y)');", 0], ["el.style.color = 'var(--plx-sys-text)';", 0], ['el.style.transform = `translate(${gridPx(x)}, ${gridPx(y)})`;', 0], ["el.style.color = getComputedStyle(a).getPropertyValue('--plx-sys-text');", 0],
    ['<div style={{ inlineSize: snapSize(w, 80, 600) }} />', 0], ["<div style={{ color: 'var(--plx-sys-accent)', insetInlineStart: gridPx(x) }} />", 0], ['<div style={{ ...pos }} />', 0],
    ["h('div', { style: { top: gridPx(rect.top) } })", 0], ['el.style.left = 0;', 0], ['const a = el.style.color;', 0], ["if (el.style.width === '8px') {}", 0],
    ["el.setAttribute('style', css);", 0], ["el.style.removeProperty('height');", 0],
    // rejected: literals and markup
    ["el.style.color = '#fff';", 1], ["el.style.backgroundColor = 'rgb(1, 2, 3)';", 1], ["el.style.margin = '8px';", 1], ["el.style.setProperty('padding', '12px 4px');", 1],
    ['<div style={{ fontSize: 14 }} />', 1], ["<div style={{ fontFamily: 'Arial' }} />", 1], ["<div style={{ color: 'red' }} />", 1], ["h('div', { style: { width: '240px' } })", 1],
    ["el.setAttribute('style', 'color: #333');", 1], ["el.style.cssText = 'width: 10px';", 1], ['<div style="color: red">x</div>', 1], ["el.innerHTML = '<span style=\"color:red\">x</span>';", 1],
    ["el.style.width = 'calc(' + w + 'px + 8px)';", 1], ['<style>.a{color:red}</style>', 1],
    ["el.style.width = width + 'px';", 1], ['el.style.top = `${y}px`;', 1], ['<div style={{ inlineSize: w }} />', 1], ["el.style.setProperty('--plx-comp-x-offset', x + 'px');", 1],
  ];
  fx.forEach(([src, n]) => { const got = scan(src, {}).length; if (got !== n) found.push('fixture: ' + src + ' gives ' + got + ' finding(s), expected ' + n); });
  const fh = [['<div style="color: red"></div>', 1], ['<div class="plx-x"></div>', 0], ['<style>p{}</style>', 1]];
  fh.forEach(([src, n]) => { const got = scan(src, { html: true }).length; if (got !== n) found.push('html fixture: ' + src + ' gives ' + got + ', expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'INLINE_STYLE_OK (' + files.length + ' files, ' + (fx.length + fh.length) + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
