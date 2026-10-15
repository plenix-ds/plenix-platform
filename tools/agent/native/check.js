// Checks one native design fragment (scratchpad/native/<platform>-<slug>.json: { "<page key>": { ... } }) the way
// build-native-guidance.js will, plus the code names. Usage: node check.js <fragment.json> [...]
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix/';
const DS = ROOT + 'platform/design-system/';
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(DS + 'inventory-taxonomy.js', 'utf8'), ctx);
const leaves = new Set(); ctx.window.DSTaxonomy.forEach((s) => s.subs.forEach((x) => x[1].split('|').forEach((l) => leaves.add(s.id + '|' + l))));
const guide = JSON.parse(fs.readFileSync(ROOT + 'platform/standards/native-guidance.json', 'utf8')).pages;
const toks = new Set(JSON.parse(fs.readFileSync(ROOT + 'platform/tokens/tokens.index.json', 'utf8')).tokens.map((t) => t.name.slice(2)));
const swift = fs.readFileSync(ROOT + 'platform/mobile/ios/PlenixTokens.swift', 'utf8');
const kt = fs.readFileSync(ROOT + 'platform/mobile/android/PlenixTokens.kt', 'utf8');
const swiftNames = new Set([...swift.matchAll(/static (?:let|func) (\w+)/g)].map((m) => m[1]));
const ktNames = new Set([...kt.matchAll(/(?:val|fun) (\w+)/g)].map((m) => m[1]));
let bad = 0;
const fail = (m) => { bad++; console.log('FAIL ' + m); };
for (const file of process.argv.slice(2)) {
  const frag = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [key, d] of Object.entries(frag)) {
    const ios = /^ios-/.test(key);
    if (!leaves.has(key)) fail(key + ': not a page');
    ['summary', 'variants', 'anatomy', 'attributes', 'states', 'code'].forEach((k) => { if (!d[k] || (Array.isArray(d[k]) && !d[k].length)) fail(key + ': ' + k + ' is missing'); });
    Object.values(d.images || {}).forEach((im) => { if (!fs.existsSync(DS + im.src)) fail(key + ': image ' + im.src + ' missing'); if (!im.alt) fail(key + ': image without alt'); });
    const sections = new Set(((guide[key] || {}).rules || []).map((r) => r.section));
    (d.attributes || []).forEach((a) => {
      if (guide[key] && a.follows && !a.followsUrl && !sections.has(a.follows)) fail(key + ': ' + a.attribute + ' follows "' + a.follows + '", not one of: ' + [...sections].join(', '));
      const cols = ios ? ['swiftui', 'uikit', 'appkit'] : ['compose', 'views']; cols.forEach((c) => { if (!a[c]) fail(key + ': ' + a.attribute + ' has no ' + c); });
    });
    // the data role (owner, 2026-10-11; Platforms Standard 3.4): an attribute described as the data role or the data font, or
    // sized by a textData… token, is set in DM Mono in every code column (Plenix.Font.mono, PlenixFonts.MONO, R.font.dm_mono…);
    // a code line sized by a textData… token names DM Mono on that line or the two around it
    const MONO = /Plenix\.Font\.mono|PlenixFonts\.MONO|dm_mono|"DM Mono"/;
    (d.attributes || []).forEach((a) => {
      if (!/data role|data font|textData/.test([a.attribute, a.value, a.swiftui, a.uikit, a.appkit, a.compose, a.views].join(' '))) return;
      (ios ? ['swiftui', 'uikit', 'appkit'] : ['compose', 'views']).forEach((c) => { if (a[c] && !/^(Not applicable|None|—)/i.test(a[c]) && !MONO.test(a[c])) fail(key + ': ' + a.attribute + ' is the data role but its ' + c + ' code does not use DM Mono (Plenix.Font.mono / PlenixFonts.MONO / dm_mono): ' + a[c].slice(0, 90)); });
    });
    Object.values(d.code || {}).forEach((lines) => { const L = [].concat(lines); L.forEach((line, i) => { if (/textData/.test(line) && !MONO.test(L.slice(Math.max(0, i - 2), i + 3).join('\n'))) fail(key + ': a code line sized by the data role does not use DM Mono: ' + line.trim().slice(0, 90)); }); });
    (d.variants || []).forEach((v) => { if (v.web && !leaves.has(v.web)) fail(key + ': ' + v.name + ' web ' + v.web + ' is not a page'); });
    (JSON.stringify([d.variants, d.attributes, d.states]).match(/plx-(?:sys|comp)-[a-z0-9-]*[a-z0-9]/g) || []).forEach((t) => { if (!toks.has(t)) fail(key + ': ' + t + ' is not a token'); });
    // the generated token names the code uses
    const code = Object.values(d.code || {}).flat().join('\n') + '\n' + JSON.stringify(d.attributes) + JSON.stringify(d.variants);
    // literal numbers: every value in code names a generated token; a value the platform itself owns is marked on its
    // line by a comment containing "system", "Material" or "Apple"
    Object.values(d.code || {}).flat().forEach((line) => {
      if (/\/\/.*(system|Material|Apple)/i.test(line)) return;
      const lit = ios ? /(cornerRadius|lineWidth|width|height|spacing|padding|pointSize|size|opacity|duration|radius|minHeight|minWidth|maxWidth|maxHeight|strokeWidth|borderWidth|alpha)\s*[:(,=]\s*(?:\.\w+\s*,\s*)?(\d*\.?\d+)\b/.exec(line)
        : /(?<![\w.])(\d*\.?\d+)\.(dp|sp)\b|(?<![\w.])(\d*\.\d+)f\b|durationMillis\s*=\s*(\d+)/.exec(line);
      const n = lit && (lit[2] && ios ? lit[2] : lit[1] || lit[3] || lit[4] || lit[2]);
      if (lit && !/^0*\.?0*$/.test(n) && !(ios && n === '1' && /opacity|alpha/.test(lit[1]))) fail(key + ': a literal number in code: ' + line.trim().slice(0, 110));
    });
    if (ios) [...code.matchAll(/Plenix\.(?:Colors|Radius|Space|Platform|Font|Border|Icon|Shape|Opacity|Motion|Component)\.(\w+)/g)].forEach((m) => { if (!swiftNames.has(m[1])) fail(key + ': Plenix.*.' + m[1] + ' is not in PlenixTokens.swift'); });
    else [...code.matchAll(/Plenix\w*\.(\w+)/g)].forEach((m) => { if (!ktNames.has(m[1])) fail(key + ': ' + m[0] + ' is not in PlenixTokens.kt'); });
    if (/#[0-9a-fA-F]{6}\b|0x[0-9A-F]{6,8}\b/.test(Object.values(d.code || {}).flat().join('\n'))) fail(key + ': code has a literal color');
    if (/'/.test(JSON.stringify([d.summary, d.variants, d.anatomy, d.attributes, d.states]).replace(/\\"/g, ''))) {
      // apostrophes are fine in prose; flagged only as a reminder to use the typographic one
      const n = (JSON.stringify([d.summary, d.anatomy]).match(/'/g) || []).length; if (n) fail(key + ': use \u2019 not \' in prose (' + n + ')');
    }
    console.log((bad ? 'checked ' : 'ok ') + key);
  }
}
if (bad) { console.log(bad + ' problem(s)'); process.exit(1); } else console.log('ALL OK');
