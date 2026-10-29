// Plenix · check-system rule "page-engines" (owner, #456 to #458): plenix.js holds no engine loader, so a page that loads the Platform
// script (platform/dist/platform.js) also loads platform/engines/plenix-engines.js, which loads the rich-text, chart and PDF engines.
// What it rejects:
//   missing   an HTML page with the Platform script (dist/platform.js or plenix.js, with defer or async before src too) and no plenix-engines.js script
//   loader    platform/ source (outside platform/engines/ and platform/vendor/) that adds a script or fetches an engine itself:
//             createElement('script'), or the vendor folder's address (the bundle rules P-38 and P-45 count the same in the built file)
// Alone: node check-system.rules/page-engines.js     -> PAGE_ENGINES_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const NAME = 'page-engines';
const ROOT = path.join(__dirname, '..');
const SKIP = /^(node_modules|release|packages|Archived|lanes)\//;
const tracked = (g) => { try { return execFileSync('git', ['ls-files', g], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 26 }).split('\n').filter(Boolean); } catch (e) { return []; } };

function check({ add }) {
  for (const f of tracked('*.html')) {
    if (SKIP.test(f)) continue;
    const text = fs.readFileSync(path.join(ROOT, f), 'utf8');
    if (/<script\b[^>]*\bsrc="[^"]*(dist\/platform|plenix)\.js(\?[^"]*)?"/.test(text) && !/<script\b[^>]*\bsrc="[^"]*plenix-engines\.js(\?[^"]*)?"/.test(text)) add(NAME, path.join(ROOT, f), 0, 'loads the Platform script (platform.js or plenix.js) but not platform/engines/plenix-engines.js: a rich-text editor, chart or PDF on this page would have no engine (#456 to #458)');
  }
  for (const f of tracked('platform/*.js').concat(tracked('platform/**/*.js'), tracked('platform/**/*.jsx'))) {
    if (/^platform\/(engines|vendor|dist|design-system|dev)\//.test(f)) continue;
    const lines = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\/\*[^]*?\*\//g, (c) => c.replace(/[^\n]/g, ' ')).split('\n');   // code, not comments
    lines.forEach((l, i) => {
      if (/^\s*(\/\/|\/\*|\*)/.test(l)) return;
      if (/createElement\(\s*['"]script['"]\s*\)/.test(l)) add(NAME, path.join(ROOT, f), i + 1, 'adds a script itself: engines load through platform/engines/plenix-engines.js (#457)');
      if (/vendorBase|PlenixVendorBase/.test(l)) add(NAME, path.join(ROOT, f), i + 1, 'finds the vendor folder itself: that belongs to platform/engines/plenix-engines.js (#456)');
    });
  }
}
module.exports = { name: NAME, check };

if (require.main === module) {
  const findings = [];
  check({ add: (rule, file, line, text) => findings.push(path.relative(ROOT, file) + (line ? ':' + line : '') + '  ' + text) });
  if (findings.length) { findings.forEach((x) => console.log(x)); console.log('PAGE_ENGINES_FAIL (' + findings.length + ')'); process.exit(1); }
  console.log('PAGE_ENGINES_OK');
}
