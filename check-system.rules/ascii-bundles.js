// Plenix · check-system rule "ascii-bundles" (the charset break of 2026-11-02): a script the build ships carries no non-ASCII character in its
// code, so a page that loads it without a charset (the offline archive, a server that sends none) still runs. A regular expression written with raw
// Arabic characters read as Latin-1 became "Range out of order" and window.Plenix was never set.
//   what it reads   the built page scripts: platform/dist/platform.js, each <app>/app.js, dam/app/assets.js
//   what it refuses a non-ASCII character outside a comment: in a string, a regular expression, a template, a name. The build escapes strings and
//                   names (vite.*.config.mjs: esbuild charset 'ascii'); a regular expression keeps what its source wrote, so write
//                   the character as \uXXXX in the source. Comments may hold any character (they are never run: the banner's dash)
//   nonAsciiOutsideComments(text) -> { line, text } of the first one, or null   (also used by check-bundle.js for the CDN files)
//   require('./check-system.rules/ascii-bundles.js').check({ files, add })   add(rule, file, line, text)
// Alone: node check-system.rules/ascii-bundles.js     -> ASCII_BUNDLES_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'ascii-bundles';
const ROOT = path.join(__dirname, '..');
const NON_ASCII = /[^\x00-\x7F]/;

// the first non-ASCII character that is not inside a comment; the text is parsed only when it holds any
function nonAsciiOutsideComments(text) {
  if (!NON_ASCII.test(text)) return null;
  const { parser } = require('@babel/standalone').packages;
  const ast = parser.parse(text, { sourceType: 'unambiguous', errorRecovery: true, allowReturnOutsideFunction: true });
  let masked = text;
  (ast.comments || []).slice().sort((a, b) => b.start - a.start).forEach((c) => { masked = masked.slice(0, c.start) + masked.slice(c.start, c.end).replace(/[^\n]/g, ' ') + masked.slice(c.end); });
  const m = NON_ASCII.exec(masked);
  if (!m) return null;
  const line = masked.slice(0, m.index).split('\n').length, col = m.index - (masked.lastIndexOf('\n', m.index - 1) + 1);
  return { line, text: text.split('\n')[line - 1].slice(Math.max(0, col - 30), col + 30).trim() };
}

function targets() {
  const list = ['platform/dist/platform.js', 'dam/app/assets.js'];
  fs.readdirSync(ROOT).forEach((d) => { if (fs.existsSync(path.join(ROOT, d, 'app.js')) && fs.existsSync(path.join(ROOT, d, 'main.jsx'))) list.push(d + '/app.js'); });
  return list.filter((f) => fs.existsSync(path.join(ROOT, f)));
}

function check({ add }) {
  for (const f of targets()) {
    const hit = nonAsciiOutsideComments(fs.readFileSync(path.join(ROOT, f), 'utf8'));
    if (hit) add(NAME, path.join(ROOT, f), hit.line, 'a non-ASCII character in code (a page loaded without a charset breaks): ' + JSON.stringify(hit.text) + ' (write it as \\uXXXX in the source; node build-app.js escapes strings)');
  }
}
module.exports = { name: NAME, check, nonAsciiOutsideComments };

if (require.main === module) {
  const findings = [];
  check({ add: (rule, file, line, text) => findings.push(path.relative(ROOT, file) + ':' + line + '  ' + text) });
  if (findings.length) { findings.forEach((x) => console.log(x)); console.log('ASCII_BUNDLES_FAIL (' + findings.length + ')'); process.exit(1); }
  console.log('ASCII_BUNDLES_OK');
}
