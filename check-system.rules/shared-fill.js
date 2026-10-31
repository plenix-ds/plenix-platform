// Plenix · check-system rule "shared-fill" (issues 693 and 719, audit finding #684): one helper fills the {name} placeholders of a
// catalog text, one constant says whether the browser opens floating parts in the top layer, and one helper turns an icon name or
// an imported icon module into an element. A new local copy is refused.
//   import { fill } from '../../utils/fill.ts'                  the one filler (utils/fill.ts; nodes in the data font: utils/fillNodes.tsx)
//   import { useFloating, TOP_LAYER } from '../../utils/floating.ts'   the one top-layer check
//   const fill = (s, v) => s.replace(/\{(\w+)\}/g, …)           finding: use utils/fill.ts (a copy behaved four ways: an undefined
//                                                               value wrote "undefined" in some of them)
//   const TOP_LAYER = FLOATING_ANCHOR && …                      finding: import TOP_LAYER from utils/floating.ts
//   const asIcon = (i) => iconElement(i)                         finding: import { asIcon } from Icon.jsx (a state icon: stateIcon)
// A function named fill that does not fill a placeholder (Icon's fill is a flag; a counter in useVirtualizer) is not read.
//   require('./check-system.rules/shared-fill.js').check({ files, add })   files: [{ file }], add(rule, file, line, text)
// Alone: node check-system.rules/shared-fill.js     -> SHARED_FILL_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'shared-fill';
const ROOT = path.join(__dirname, '..');
const SCOPE = /[\\/](platform|suite|dashboard|projects|messages|contacts|calendar|tasks|notes|bookmarks|files|settings|dam[\\/]app)[\\/]/;
const SKIP_FILE = /[\\/](dist|vendor|node_modules|design-system|mobile|icons|release)[\\/]|(^|[\\/])(app|assets|plenix-icons-[a-z0-9-]+)\.js$|[\\/]utils[\\/](fill|floating)\.[jt]s$/;
// a definition named fill whose next lines replace or split on a {placeholder}
const FILL_DEF = /(?:\b(?:const|let|var)\s+fill\s*=|\bfunction\s+fill\s*\()/g;
const PLACEHOLDER = /\{\(?\\w|\\\{|'\{|\{\w+\}/;
const TOP_LAYER_DEF = /\bconst\s+TOP_LAYER\s*=[^;]*(FLOATING_ANCHOR|anchor-name)/;
// a local asIcon: the one is exported by components/Icon/Icon.jsx
const ASICON_DEF = /\b(?:const|let|var)\s+asIcon\s*=|\bfunction\s+asIcon\s*\(/;

const lineOf = (text, i) => text.slice(0, i).split('\n').length;

function check({ files, add }) {
  const list = files && files.length ? files.map((f) => f.file || f) : [];
  const seen = new Set();
  for (const file of list) {
    const abs = path.isAbsolute(file) ? file : path.join(ROOT, file);
    if (seen.has(abs) || !/\.([jt]sx?|mjs|cjs)$/.test(abs) || /\.d\.ts$/.test(abs) || !SCOPE.test(abs) || SKIP_FILE.test(abs) || !fs.existsSync(abs)) continue;
    seen.add(abs);
    const text = fs.readFileSync(abs, 'utf8');
    if (!/\bfill\b|TOP_LAYER|asIcon/.test(text)) continue;
    let m;
    FILL_DEF.lastIndex = 0;
    while ((m = FILL_DEF.exec(text))) {
      const near = text.slice(m.index, m.index + 360);
      if (/\.(replace|split)\(/.test(near) && PLACEHOLDER.test(near)) add(NAME, abs, lineOf(text, m.index), 'a local fill(): import { fill } from utils/fill.ts (one filler for every text; fillNodes for nodes in the data font)');
    }
    if (!/[\\/]components[\\/]Icon[\\/]Icon\.[jt]sx$/.test(abs)) { const a = ASICON_DEF.exec(text); if (a) add(NAME, abs, lineOf(text, a.index), 'a local asIcon: import { asIcon } from components/Icon/Icon.jsx (a state icon: stateIcon)'); }
    const t = TOP_LAYER_DEF.exec(text);
    if (t) add(NAME, abs, lineOf(text, t.index), 'a local TOP_LAYER: import { TOP_LAYER } from utils/floating.ts');
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
