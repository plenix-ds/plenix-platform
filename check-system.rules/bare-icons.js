// Plenix · check-system rule "bare-icons" (issue 557, icon stage 5c-2): an icon is the Icon component, or the markup it
// renders, never a bare class. The bare class (plx-icon plx-icon--<name> written without the component) is retired
// (owner, issue 277 Q3): the stylesheet no longer draws anything for it. So, in the Platform, the applications, the
// Asset Manager and the design spec:
//   <Icon name="folder" />   iconMarkup('folder')   DS.icon('folder')   h(P.Icon, { name: 'folder' })   ok
//   '<span class="plx-icon plx-icon--folder"></span>'   className="plx-icon plx-icon--folder"           finding
//   '<span class="plx-icon plx-icon--' + name + '">'    el('span', 'plx-icon plx-icon--folder')        finding
// The class string a component builds for itself carries plx-icon--inline (Icon, iconMarkup, the login service's
// generated markup), and passes. A line that must keep the class form on purpose (the spec's fallback for a release
// without iconMarkup) carries plx-allow-bare-icon and its reason. Comments are prose, not markup.
// The rule is a module check-system.js runs (it loads every file in check-system.rules/):
//   require('./check-system.rules/bare-icons.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/bare-icons.js     -> BARE_ICONS_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'bare-icons';
// generated bundles and copies are checked through their sources
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived|archive|backups|audit|docs|spec-chunks)[\\/]|(^|[\\/])(app|assets|spec-index|spec-parts|native-guidance|native-guidance-full)\.js$|\.min\.js$|[\\/]plenix-icons-[a-z0-9-]+\.js$/;
// "plx-icon plx-icon--<a name, or the start of a name built in code>" inside one class string
const BARE = /\bplx-icon\s+plx-icon--(?:[a-z0-9]|['"]\s*\+)/;

// a line's code without its // comment and its /* */ comments on the same line
const code = (line) => line.replace(/\/\*.*?\*\//g, '').replace(/(^|[^:'"\\])\/\/.*$/, '$1');

// the findings of one text: [{ line, text }]
function scan(text) {
  const out = [];
  let inBlock = false;
  text.split('\n').forEach((raw, i) => {
    let line = raw;
    if (inBlock) { const end = line.indexOf('*/'); if (end < 0) return; line = line.slice(end + 2); inBlock = false; }
    const open = line.lastIndexOf('/*'); if (open >= 0 && line.indexOf('*/', open) < 0) { line = line.slice(0, open); inBlock = true; }
    if (/plx-allow-bare-icon/.test(raw)) return;
    const c = code(line);
    if (BARE.test(c) && !/plx-icon--inline/.test(c)) out.push({ line: i + 1, text: c.trim().slice(0, 160) });
  });
  return out;
}

function check({ files, add }) {
  for (const { file } of files) {
    if (SKIP_FILE.test(file) || !/\.(js|jsx|ts|tsx|html)$/.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (!/plx-icon\s+plx-icon--/.test(text)) continue;
    for (const f of scan(text)) add(NAME, file, f.line, 'a bare icon class (retired, issue 557: it draws nothing): use <Icon name>, or iconMarkup(icon) where the code writes HTML: ' + f.text);
  }
}

module.exports = { name: NAME, check, scan };

if (require.main === module) {
  const { collect } = require('../check-common.js');
  const files = collect(), found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(path.join(__dirname, '..'), file) + ':' + line + '  ' + text) });
  // the rule's own fixtures: [source, findings]
  const fx = [
    ['<span class="plx-icon plx-icon--folder"></span>', 1],
    ["'<span class=\"plx-icon plx-icon--' + name + '\" aria-hidden=\"true\"></span>'", 1],
    ['<span className="plx-icon plx-icon--add plx-icon--inline" aria-hidden="true"></span>', 0],
    ["return DS.icon('folder');", 0],
    ['// a bare class (plx-icon plx-icon--folder) is retired', 0],
    ["'<span class=\"plx-icon plx-icon--' + n + '\">'   // plx-allow-bare-icon: an old release", 0],
    ["cx('plx-icon', 'plx-icon--' + name)", 0]];
  fx.forEach(([src, n]) => { const got = scan(src).length; if (got !== n) found.push('fixture: ' + src + ' gives ' + got + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'BARE_ICONS_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
