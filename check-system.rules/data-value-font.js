// Plenix · check-system rule "data-value-font" (owner, #252 choice A): a Select or Combobox that holds a number or a date shows it in the data font.
// What it rejects:
//   helper   utils/dataValue.js without isDataValue, or the helper no longer recognizing a number, a date and a size, or recognizing a plain word
//   use      Select (Input.jsx) or Combobox no longer asking isDataValue when their data prop is not set, or going back to `data && 'plx-input--data'`
// Alone: node check-system.rules/data-value-font.js     -> DATA_VALUE_FONT_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'data-value-font';
const ROOT = path.join(__dirname, '..');
const read = (f) => { try { return fs.readFileSync(path.join(ROOT, f), 'utf8'); } catch (e) { return ''; } };

function check({ add }) {
  const hf = path.join(ROOT, 'platform/utils/dataValue.js'), h = read('platform/utils/dataValue.js');
  if (!/export const isDataValue/.test(h)) add(NAME, hf, 0, 'dataValue.js must export isDataValue');
  else {
    const fn = new Function(h.replace(/export const isDataValue/, 'const isDataValue') + '; return isDataValue;')();
    for (const yes of ['10', '1,000', '2026-10-25', 'Oct 25, 2026', '25 Oct 2026', '10:42 AM', '12 MB', 'v1.2.3', 'report.pdf', '#1234']) if (!fn(yes)) add(NAME, hf, 0, '"' + yes + '" must be a data value');
    for (const no of ['Compact', '15 minutes', 'Oct 25, 2026 and later', 'Light', '']) if (fn(no)) add(NAME, hf, 0, '"' + no + '" must not be a data value');
  }
  for (const [f, re] of [['platform/components/Input/Input.jsx', /data === undefined \? !!\(current && isDataValue\(/], ['platform/components/Combobox/Combobox.jsx', /data === undefined \? !!\(current && isDataValue\(/]]) {
    const s = read(f), file = path.join(ROOT, f);
    if (!re.test(s)) add(NAME, file, 0, 'a Select or Combobox with no data prop must ask isDataValue about the chosen label');
    if (/\bdata && 'plx-input--data'/.test(s) && /Combobox/.test(f)) add(NAME, file, 0, 'the data font is asData, not the data prop alone');
  }
}
module.exports = { name: NAME, check };

if (require.main === module) {
  const findings = [];
  check({ add: (rule, file, line, text) => findings.push(path.relative(ROOT, file) + (line ? ':' + line : '') + '  ' + text) });
  if (findings.length) { findings.forEach((x) => console.log(x)); console.log('DATA_VALUE_FONT_FAIL (' + findings.length + ')'); process.exit(1); }
  console.log('DATA_VALUE_FONT_OK');
}
