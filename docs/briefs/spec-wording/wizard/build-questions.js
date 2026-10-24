/* Plenix · spec questions wizard: questions.json from the two question files
   Usage: node docs/briefs/spec-wording/wizard/build-questions.js <questions.md> <actions-questions.md>
   Writes questions.json beside this script: one record per question (id, section, page, fields, text). The renders,
   options and recommendations are authored per section in sections/<section>.json (merged by the page). */
const fs = require('fs'), path = require('path');
const [qFile, aFile] = process.argv.slice(2);
const out = [];
const answered = /hozAlign|dataTree|cellEdited|_children|retired grid engine|abulator/;   // settled by #294 (2026-10-24)
function parse(file, fixedSection) {
  let section = fixedSection || '', page = '';
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    let m;
    if (!fixedSection && (m = /^## ([a-z0-9-]+)/.exec(line))) { section = m[1]; continue; }
    if ((m = /^### ?(.+)$/.exec(line)) || (fixedSection && (m = /^## ([a-z0-9-]+)\s*$/.exec(line)))) { page = m[1].trim(); continue; }
    if ((m = /^- \*\*([^*]+):\*\*\s*(.+)$/.exec(line)) && section && page) {
      if (answered.test(m[2])) continue;
      const n = out.filter((q) => q.section === section && q.page === page).length + 1;
      out.push({ id: section + '/' + page + '/' + n, section, page, fields: m[1].trim(), text: m[2].trim() });
    }
  }
}
parse(qFile);
parse(aFile, 'actions');
fs.writeFileSync(path.join(__dirname, 'questions.json'), JSON.stringify(out, null, 1) + '\n');
const by = {}; out.forEach((q) => { by[q.section] = (by[q.section] || 0) + 1; });
console.log(out.length + ' questions', JSON.stringify(by));
