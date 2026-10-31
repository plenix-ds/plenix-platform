// Plenix · check-system rule "shared-fill" (issue 693, audit finding #684): one helper fills the {name} placeholders of a
// catalog text, and one constant says whether the browser opens floating parts in the top layer. A new local copy is refused.
//   import { fill } from '../../utils/fill.js'                  the one filler (utils/fill.js; nodes in the data font: utils/fillNodes.jsx)
//   import { useFloating, TOP_LAYER } from '../../utils/floating.js'   the one top-layer check
//   const fill = (s, v) => s.replace(/\{(\w+)\}/g, …)           finding: use utils/fill.js (a copy behaved four ways: an undefined
//                                                               value wrote "undefined" in some of them)
//   const TOP_LAYER = FLOATING_ANCHOR && …                      finding: import TOP_LAYER from utils/floating.js
// A function named fill that does not fill a placeholder (Icon's fill is a flag; a counter in useVirtualizer) is not read.
//   require('./check-system.rules/shared-fill.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/shared-fill.js     -> SHARED_FILL_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'shared-fill';
const ROOT = path.join(__dirname, '..');
const SCOPE = /[\\/](platform|suite|dashboard|projects|messages|contacts|calendar|tasks|notes|bookmarks|files|settings|dam[\\/]app)[\\/]/;
const SKIP_FILE = /[\\/](dist|vendor|node_modules|design-system|mobile|icons|release)[\\/]|(^|[\\/])(app|assets|plenix-icons-[a-z0-9-]+)\.js$|[\\/]utils[\\/](fill\.js|floating\.js)$/;
// a definition named fill whose next lines replace or split on a {placeholder}
const FILL_DEF = /(?:\b(?:const|let|var)\s+fill\s*=|\bfunction\s+fill\s*\()/g;
const PLACEHOLDER = /\{\(?\\w|\\\{|'\{|\{\w+\}/;
const TOP_LAYER_DEF = /\bconst\s+TOP_LAYER\s*=[^;]*(FLOATING_ANCHOR|anchor-name)/;

const lineOf = (text, i) => text.slice(0, i).split('\n').length;

function check({ files, add }) {
  const list = files && files.length ? files.map((f) => f.file || f) : [];
  const seen = new Set();
  for (const file of list) {
    const abs = path.isAbsolute(file) ? file : path.join(ROOT, file);
    if (seen.has(abs) || !/\.(jsx?|mjs|cjs)$/.test(abs) || !SCOPE.test(abs) || SKIP_FILE.test(abs) || !fs.existsSync(abs)) continue;
    seen.add(abs);
    const text = fs.readFileSync(abs, 'utf8');
    if (!/\bfill\b|TOP_LAYER/.test(text)) continue;
    let m;
    FILL_DEF.lastIndex = 0;
    while ((m = FILL_DEF.exec(text))) {
      const near = text.slice(m.index, m.index + 360);
      if (/\.(replace|split)\(/.test(near) && PLACEHOLDER.test(near)) add(NAME, abs, lineOf(text, m.index), 'a local fill(): import { fill } from utils/fill.js (one filler for every text; fillNodes for nodes in the data font)');
    }
    const t = TOP_LAYER_DEF.exec(text);
    if (t) add(NAME, abs, lineOf(text, t.index), 'a local TOP_LAYER: import { TOP_LAYER } from utils/floating.js');
  }
}

module.exports = { check };

if (require.main === module) {
  const found = [];
  const files = [];
  const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!/^(node_modules|\.git|release|Archived)$/.test(e.name)) walk(p); } else files.push({ file: p }); } };
  walk(ROOT);
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file) + ':' + line + '  ' + text) });
  if (found.length) { console.log(found.join('\n')); console.log('SHARED_FILL_FAIL (' + found.length + ' findings)'); process.exit(1); }
  console.log('SHARED_FILL_OK');
}
