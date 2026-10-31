// Plenix · check-system rule "logical-properties" (library plan wave 2; the RTL / bidirectional UI page, platform/utils/
// direction.ts and DirectionProvider): a component, pattern or template stylesheet says start and end, never left and right,
// so the layout mirrors on its own in a right-to-left page. A finding is a declaration that names a physical side:
//   margin-left/-right, padding-left/-right, left, right, border-left-*/border-right-* and the corner radii
//   (border-top-left-radius …) when the rule does not set the mirrored side to the same value, float/clear: left|right,
//   text-align: left|right
//   .plx-x{padding-inline-start:var(--a)}                                   ok
//   .plx-x{border-left-color:var(--a);border-right-color:var(--a)}          ok (both sides the same: nothing to mirror)
//   .plx-x{margin-left:var(--a)}                                            finding
//   .plx-x{text-align:left}                                                 finding (text-align: start)
// Stylelint runs it (style-plan-30, step 3: every style rule in one place): tools/stylelint/plenix.mjs wraps scan() as
// plenix/logical-properties over platform/components, patterns and templates, and @plenix-ds/lint publishes the same
// scan() (build-packages.d/lint.js). It exports no check(), so check-system.js no longer loads it.
// Alone (the same scope, plus the rule's fixtures): node check-system.rules/logical-properties.js -> LOGICAL_PROPERTIES_OK
const fs = require('fs');
const path = require('path');

const NAME = 'logical-properties';
const SCOPE = /[\\/]platform[\\/](components|patterns|templates)[\\/].*\.css$/;
const SKIP_FILE = /[\\/](dist|release|node_modules|vendor|Archived)[\\/]/;

// known findings, to adopt in the component's own task (never more than listed): file under platform/ -> count
const KNOWN = {};   // none (Tabs' contained panel corner is border-start-start-radius since batch 348)

const MIRROR = { left: 'right', right: 'left' };
// a value with the side in its token name (--plx-comp-x-border-left-color) mirrors one with the other side's name
const sideless = (v) => (v == null ? v : v.replace(/\b(left|right)\b/g, 'side'));
const lineOf = (text, i) => text.slice(0, i).split('\n').length;

// the findings of one stylesheet's text: [{ line, text }]
function scan(css) {
  const out = [];
  const text = css.replace(/\/\*[\s\S]*?\*\//g, (c) => c.replace(/[^\n]/g, ' '));   // comments blanked, lines kept
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim();
    if (!selector || selector.startsWith('@')) continue;
    const decls = {};
    const list = [];
    for (const d of m[2].matchAll(/([a-z-]+)\s*:\s*([^;]+)/g)) { decls[d[1]] = d[2].trim(); list.push([d[1], d[2].trim(), m.index + m[1].length + 1 + d.index]); }
    for (const [prop, value, at] of list) {
      let bad = false;
      if (/^(margin|padding)-(left|right)$/.test(prop) || prop === 'left' || prop === 'right') bad = true;
      else if (/^(float|clear|text-align)$/.test(prop) && /^(left|right)$/.test(value)) bad = true;
      else {
        const side = /^border-(left|right)(-(color|style|width))?$/.exec(prop);
        const corner = /^border-(top|bottom)-(left|right)-radius$/.exec(prop);
        if (side) bad = sideless(decls['border-' + MIRROR[side[1]] + (side[2] || '')]) !== sideless(value);
        else if (corner) bad = sideless(decls['border-' + corner[1] + '-' + MIRROR[corner[2]] + '-radius']) !== sideless(value);
      }
      if (bad) out.push({ line: lineOf(text, at), text: selector.split('\n').pop().slice(0, 60) + ' { ' + prop + ': ' + value + ' }' });
    }
  }
  return out;
}

function check({ files, add }) {
  for (const f of files) {
    const file = f.file || f;
    if (!SCOPE.test(file) || SKIP_FILE.test(file)) continue;
    const found = scan(fs.readFileSync(file, 'utf8'));
    const known = KNOWN[file.split(path.sep).join('/').replace(/^.*?\/platform\//, '')] || 0;
    if (found.length <= known) continue;
    found.forEach((x) => add(NAME, file, x.line, 'a physical side (use start and end: inline-start, inline-end): ' + x.text));
  }
}

module.exports = { name: NAME, scan };

if (require.main === module) {
  const ROOT = path.join(__dirname, '..');
  const files = [];
  const walk = (d) => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (SKIP_FILE.test(p + path.sep)) continue; if (e.isDirectory()) walk(p); else files.push({ file: p }); } };
  ['components', 'patterns', 'templates'].forEach((d) => walk(path.join(ROOT, 'platform', d)));
  const found = [];
  check({ files, add: (rule, file, line, text) => found.push(path.relative(ROOT, file).split(path.sep).join('/') + ':' + line + '  ' + text) });
  // the rule's own fixtures
  const fx = [['.a{padding-inline-start:var(--x)}', 0], ['.a{border-left-color:var(--x);border-right-color:var(--x)}', 0], ['.a{border-left-color:var(--x)}', 1],
    ['.a{margin-left:var(--x)}', 1], ['.a{text-align:left}', 1], ['.a{text-align:start}', 0], ['.a{float:right}', 1], ['.a{left:0}', 1],
    ['.a{border-top-left-radius:var(--r);border-top-right-radius:var(--r)}', 0], ['.a{border-top-left-radius:var(--r)}', 1], ['.a{border-left-width:var(--a-border-left-width);border-right-width:var(--a-border-right-width)}', 0], ['.a .b-col{padding-left:0}', 1]];
  fx.forEach(([src, n]) => { if (scan(src).length !== n) found.push('fixture: ' + src + ' gives ' + scan(src).length + ' finding(s), expected ' + n); });
  found.forEach((x) => console.log('FAIL ' + x));
  console.log(found.length ? '\n' + found.length + ' finding(s)' : 'LOGICAL_PROPERTIES_OK (' + files.length + ' files, ' + fx.length + ' fixtures)');
  process.exit(found.length ? 1 : 0);
}
