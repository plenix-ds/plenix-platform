// Plenix · check-system rule "table-geometry" (the DataTable geometry split, owner 2026-10-13): Tabulator measures and
// writes a column's width (a JavaScript adjustment from measured layout, allowed by the inline-style rule); the row
// height and the cell padding are the density's (tokens and classes), never measured and never written. No Platform or
// application source asks Tabulator for a forced redraw (redraw(true)): it measures every row again, which nothing needs
// (a density change is CSS for the rows and re-measures only the columns; a grid shown again redraws in place; React-filled
// cells re-measure only their columns).
//   table.redraw()                 ok
//   table.redraw(true)             finding
// The style audit and the pages test check at run time that no DataTable row or cell carries an inline height or padding.
// The rule is a module check-system.js runs (every file of check-system.rules/):
//   require('./check-system.rules/table-geometry.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/table-geometry.js     -> TABLE_GEOMETRY_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'table-geometry';
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived|archive|backups)[\\/]|[\\/](app|assets)\.js$/;
const ROOT = path.join(__dirname, '..');
const lineOf = (text, i) => text.slice(0, i).split('\n').length;

// redraw(true) calls in a source text (comments blanked)
function scan(text) {
  const out = [];
  const code = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/(^|[^:])\/\/[^\n]*/g, (m, a) => a + m.slice(a.length).replace(/./g, ' '));
  for (const m of code.matchAll(/\.redraw\(\s*true\s*\)/g)) out.push({ line: lineOf(code, m.index), text: m[0] });
  return out;
}

function check({ files, add }) {
  for (const f of files) {
    const file = f.file || f;
    if (!/\.(jsx|js)$/.test(file) || SKIP_FILE.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (text.indexOf('redraw(') < 0) continue;
    scan(text).forEach((x) => add(NAME, file, x.line, 'a forced redraw measures every row again: ' + x.text + ' (use redraw(), or the DataTable\'s own re-measure of column widths)'));
  }
}

module.exports = { name: NAME, check, scan };

if (require.main === module) {
  const DIRS = ['platform', 'suite', 'dam', 'dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'services'];
  const files = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (SKIP_FILE.test(p + (e.isDirectory() ? path.sep : ''))) continue; if (e.isDirectory()) walk(p); else files.push({ file: p }); } };
  DIRS.forEach((d) => walk(path.join(ROOT, d)));
  const found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file).split(path.sep).join('/') + ':' + line + '  ' + text) });
  // the rule's own fixtures
  const fx = [['t.redraw();', 0], ['t.redraw(true);', 1], ['// t.redraw(true) was here', 0], ['tableRef.current.redraw( true )', 1]];
  fx.forEach(([src, n]) => { if (scan(src).length !== n) found.push('fixture: ' + src + ' gives ' + scan(src).length + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'TABLE_GEOMETRY_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
