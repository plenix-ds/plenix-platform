// Plenix · brand.css without !important (owner, 2026-10-27, issue 249). Authentik's own CSS is unlayered and written with one or
// two classes, so a rule of the brand's custom CSS wins by specificity instead: each rule that had !important gets an id-weight
// :not(#plenix) on its last compound (before a trailing pseudo-element). An id outweighs any class selector of Authentik's. A layer
// would not help: Authentik's unlayered CSS beats layered CSS.
//   node services/auth/no-important.js <in.css> <out.css>     (services/auth/brand-css.js runs withoutImportant on its output)
const BOOST = ':not(#plenix)';
const boost = (sel) => {
  const s = sel.trim(), pe = s.match(/(::[a-z-]+(?:\([^)]*\))?)+$/);
  return pe ? s.slice(0, s.length - pe[0].length) + BOOST + pe[0] : s + BOOST;
};
// every one-line rule with !important in it: the declarations that had it, without it, under the boosted selectors; the others stay
// under the original selectors (a rule that mixed both is split in two, so a declaration that never had !important keeps its old weight)
function withoutImportant(text) {
  return text.split('\n').map((line) => {
    const m = line.match(/^([^{}@/][^{}]*)\{(.*)\}\s*$/);
    if (!m || !/!important/.test(m[2])) return line;
    const decls = m[2].split(';').map((d) => d.trim()).filter(Boolean);
    const strong = decls.filter((d) => /!important/.test(d)).map((d) => d.replace(/\s*!important/, ''));
    const weak = decls.filter((d) => !/!important/.test(d));
    const out = [m[1].split(',').map(boost).join(', ') + ' { ' + strong.join('; ') + '; }'];
    if (weak.length) out.push(m[1].trim() + ' { ' + weak.join('; ') + '; }');
    return out.join('\n');
  }).join('\n');
}
module.exports = { withoutImportant };
if (require.main === module) {
  const fs = require('fs');
  const out = withoutImportant(fs.readFileSync(process.argv[2], 'utf8'));
  if (/!important/.test(out)) { console.error('!important is left (a rule that is not on one line)'); process.exit(1); }
  fs.writeFileSync(process.argv[3], out);
}
