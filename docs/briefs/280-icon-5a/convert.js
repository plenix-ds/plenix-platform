// Icon stage 5a (#280), part 2: converts the icon names a Platform file writes into imported icon modules.
//   node docs/briefs/280-icon-5a/convert.js <file.jsx> …
// Each string the scan (platform/icons/uses.js) finds in an icon slot becomes an import of its module
// (plenix-platform/icons/plenix/<name>): icon="add" -> icon={AddIcon}, 'chevron_right' -> Chevron_RightIcon (the underscore
// spelling imports its alias module, so the markup keeps plx-icon--chevron_right). A name listed only in a plx-icons comment
// is left as written. Prints what it changed; changes nothing in a file where a new name would collide.
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const uses = require(path.join(ROOT, 'platform', 'icons', 'uses.js'));
const NAMES = JSON.parse(fs.readFileSync(path.join(ROOT, 'platform/components/Icon/glyphs.js'), 'utf8').match(/export const NAMES = (\{.*\});/)[1]);
const Babel = require(path.join(ROOT, 'node_modules', '@babel/standalone'));
const ident = (name) => name.split('-').map((part) => part.split('_').map((w) => (/^\d/.test(w) ? 'N' : '') + w[0].toUpperCase() + w.slice(1)).join('_')).join('') + 'Icon';
const want = new Set(process.argv.slice(2).map((f) => path.relative(ROOT, path.resolve(f)).split(path.sep).join('/')));
const scan = uses.scan(ROOT, uses.PLATFORM, { names: NAMES });
const byFile = new Map();
for (const l of scan.literals) if (want.has(l.file)) { if (!byFile.has(l.file)) byFile.set(l.file, []); byFile.get(l.file).push(l); }
let total = 0;
for (const file of [...want].sort()) {
  const lits = (byFile.get(file) || []).sort((a, b) => b.start - a.start);
  if (!lits.length) { console.log('-', file, 'no icon names'); continue; }
  let text = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const names = [...new Set(lits.map((l) => l.name))].sort();
  const clash = names.map(ident).filter((id) => new RegExp('\\b' + id + '\\b').test(text));
  if (clash.length) { console.log('!', file, 'skipped: the name(s) already exist:', clash.join(', ')); continue; }
  for (const l of lits) text = text.slice(0, l.start) + (l.jsx ? '{' + ident(l.name) + '}' : ident(l.name)) + text.slice(l.end);
  // the imports, after the file's last import
  const ast = Babel.transform(text, { ast: true, code: false, sourceType: 'module', parserOpts: { plugins: ['jsx'] } }).ast;
  const last = ast.program.body.filter((n) => n.type === 'ImportDeclaration').pop();
  const lines = names.map((n) => 'import ' + ident(n) + " from 'plenix-platform/icons/plenix/" + n + "';").join('\n');
  text = last ? text.slice(0, last.end) + '\n' + lines + text.slice(last.end) : lines + '\n' + text;
  fs.writeFileSync(path.join(ROOT, file), text);
  total += lits.length;
  console.log('+', file, lits.length, 'strings,', names.length, 'icons');
}
console.log('converted', total, 'strings');
