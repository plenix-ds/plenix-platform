// Plenix · check-system rule "strings-calls" (QA, arabic-words-37, issue 427): what a component reads from useStrings() is a catalog message.
// A catalog value is a string, a plural message or an object: never a function. The only function it can hold is one an app passed in its own
// strings prop (which wins), so a call needs the guard, or the component asks the catalog with loc.t('section.key', { count, n }).
// What it rejects:
//   call      X.key(…) where X = useStrings('section', …) and the same line has no  typeof X.key === 'function'  guard
//   section   useStrings('section') names a section that is not in platform/i18n/en.js
// Not checked: that each key read exists. A file often names several useStrings results t, one per function, so the variable alone does not say which section a read belongs to.
// The pattern that stays accepted: typeof t.count === 'function' ? t.count(n) : loc.t('virtualList.count', { count: n, n: formatNumber(n) })
// Alone: node check-system.rules/strings-calls.js     -> STRINGS_CALLS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const NAME = 'strings-calls';
const ROOT = path.join(__dirname, '..');
// methods of String, Array, Date and Object that a variable named like the strings variable may hold instead
const SKIP = new Set(['replace', 'replaceAll', 'split', 'join', 'map', 'filter', 'slice', 'toLowerCase', 'toUpperCase', 'trim', 'concat', 'includes', 'indexOf', 'forEach', 'find', 'findIndex', 'some', 'every', 'push', 'pop', 'toString', 'startsWith', 'endsWith', 'padStart', 'padEnd', 'localeCompare', 'reduce', 'sort', 'at', 'hasOwnProperty', 'charAt', 'normalize', 'match', 'test',
  'setDate', 'getDate', 'getDay', 'getFullYear', 'getMonth', 'setMonth', 'setFullYear', 'getTime', 'setHours', 'getHours', 'getMinutes', 'toISOString']);

function catalog() {
  const t = fs.readFileSync(path.join(ROOT, 'platform/i18n/en.js'), 'utf8');
  return JSON.parse(t.slice(t.indexOf('export default ') + 15).replace(/;\s*$/, ''));
}
const at = (o, p) => p.split('.').reduce((a, k) => (a && typeof a === 'object' ? a[k] : undefined), o);
function files() {
  try { return execFileSync('git', ['ls-files', 'platform/components', 'platform/patterns', 'platform/templates', 'platform/charts', 'platform/utils'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n').filter((f) => /\.jsx?$/.test(f)); }
  catch (e) { return []; }
}

function check({ add }) {
  let en; try { en = catalog(); } catch (e) { return; }
  for (const f of files()) {
    const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (!/useStrings\(/.test(src)) continue;
    const code = src.replace(/\/\*[^]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));   // code, not comments
    // t = useStrings('section', …), and t = Object.assign({ … }, useStrings('section', …)) (QuickFilter's)
    const decls = [...code.matchAll(/(?:(?:const|let)\s+|,\s*)(\w+)\s*=\s*(?:Object\.assign\(\s*\{[^}]*\}\s*,\s*)?useStrings\(\s*'([\w.]+)'/g)].map((m) => ({ v: m[1], section: m[2] }));
    const lines = code.split('\n');
    for (const { section } of decls) if (at(en, section) === undefined) { const i = lines.findIndex((l) => l.includes("'" + section + "'")); add(NAME, path.join(ROOT, f), i + 1, "useStrings('" + section + "') names a section that is not in platform/i18n/en.js"); }
    for (const { v, section } of decls) {
      const sec = at(en, section);
      const call = new RegExp('(?<![\\w.])' + v + '\\.(\\w+)\\(', 'g');
      lines.forEach((line, i) => {
        if (/^\s*\/\//.test(line)) return;
        for (const m of line.matchAll(call)) {
          if (SKIP.has(m[1]) && !(sec && typeof sec === 'object' && m[1] in sec)) continue;   // a String, Array or Date method, unless the section has a key of that name
          if (new RegExp('typeof\\s+' + v + '\\.' + m[1] + "\\s*===\\s*'function'").test(line)) continue;
          add(NAME, path.join(ROOT, f), i + 1, v + '.' + m[1] + "(…) calls a catalog value as a function: guard it with typeof " + v + '.' + m[1] + " === 'function', or ask the catalog with loc.t('" + section + '.' + m[1] + "', { count, n })");
        }
      });
    }
  }
}
module.exports = { name: NAME, check };

if (require.main === module) {
  const findings = [];
  check({ add: (rule, file, line, text) => findings.push(path.relative(ROOT, file) + (line ? ':' + line : '') + '  ' + text) });
  if (findings.length) { findings.forEach((x) => console.log(x)); console.log('STRINGS_CALLS_FAIL (' + findings.length + ')'); process.exit(1); }
  console.log('STRINGS_CALLS_OK');
}
