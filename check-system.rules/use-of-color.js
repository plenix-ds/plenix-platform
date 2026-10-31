// Plenix · check-system rule "use-of-color" (library plan wave 1; the Use of color page, WCAG 2.2 SC 1.4.1): color is
// never the only way a state is told. A status dot (StatusDot) in a tone carries its state in words: its label (read by
// assistive technology) or visible text right next to it, in the same element. A dot with neither tells its state by
// color alone.
//   <StatusDot tone="success" label="Active" />                    ok: the label names the state
//   <span><StatusDot tone={s.tone} />{s.value}</span>                ok: the text beside it names the state
//   <StatusDot tone="danger" />  (nothing after it)                  finding
//   h(P.StatusDot, { tone: 'danger' })                              finding (no label)
// A neutral dot (tone="neutral" or no tone) is decoration and is not checked.
// The rule is a module check-system.js runs (the integrator registers it):
//   require('./check-system.rules/use-of-color.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/use-of-color.js     -> USE_OF_COLOR_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'use-of-color';
// generated bundles and copies are checked through their sources
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived|archive|backups|audit|docs)[\\/]|(^|[\\/])(app|assets|spec-parts|native-guidance)\.js$|\.min\.js$/;

function lineOf(text, i) { return text.slice(0, i).split('\n').length; }

// the findings of one file's text: [{ line, text }]
function scan(text) {
  const out = [];
  // JSX: <StatusDot … /> with a tone and no label, and no text right after it
  for (const m of text.matchAll(/<StatusDot\b([^>]*?)\/>/g)) {
    const attrs = m[1];
    if (/\blabel\s*=/.test(attrs)) continue;
    const tone = /\btone\s*=\s*(?:"([^"]*)"|'([^']*)'|\{)/.exec(attrs);
    if (!tone || (tone[1] || tone[2]) === 'neutral') continue;
    const after = text.slice(m.index + m[0].length).replace(/^\s+/, '');
    if (/^(\{[^}]|[^<{\s)])/.test(after)) continue;   // an expression or words beside it
    out.push({ line: lineOf(text, m.index), text: m[0] });
  }
  // createElement: h(P.StatusDot, { … }) / React.createElement(StatusDot, { … }) with a tone and no label
  for (const m of text.matchAll(/\b(?:h|createElement)\(\s*(?:[\w.]+\.)?StatusDot\s*,\s*\{([^}]*)\}/g)) {
    const props = m[1];
    if (/\blabel\s*:/.test(props)) continue;
    const tone = /\btone\s*:\s*(?:'([^']*)'|"([^"]*)"|[\w.[\]()]+)/.exec(props);
    if (!tone || (tone[1] || tone[2]) === 'neutral') continue;
    out.push({ line: lineOf(text, m.index), text: m[0] });
  }
  return out;
}

function check({ files, add }) {
  for (const f of files) {
    const file = f.file || f;
    if (!/\.(jsx|js|tsx|ts|html)$/.test(file) || SKIP_FILE.test(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (text.indexOf('StatusDot') < 0) continue;
    scan(text).forEach((x) => add(NAME, file, x.line, 'a status dot with a tone and no words (label, or text beside it): ' + x.text));
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
  // the rule's own fixtures
  const fx = [['<StatusDot tone="success" label="Active" />', 0], ['<span><StatusDot tone={s.tone} />{s.value}</span>', 0], ['<span><StatusDot tone="danger" /> Failed</span>', 0],
    ['<span><StatusDot tone="danger" /></span>', 1], ['<StatusDot />', 0], ['<StatusDot tone="neutral" />', 0], ["h(P.StatusDot, { tone: 'danger' })", 1], ["h(P.StatusDot, { tone: t, label: t })", 0]];
  fx.forEach(([src, n]) => { if (scan(src).length !== n) found.push('fixture: ' + src + ' gives ' + scan(src).length + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'USE_OF_COLOR_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
