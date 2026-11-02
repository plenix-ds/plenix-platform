// Plenix · check-system rule "one-source" (owner, 2026-11-01, issue 842: every Plenix file of an application page from one
// version folder). An application page (each suite application's index.html, a folder with main.jsx; every page of the
// Asset Manager, dam/*.html) loads Plenix only through the page loader, which picks one place and loads every file from it:
//   loader      the page links platform/loader/loader.css, then loads platform/loader/loader.js, its first script, with
//               data-plenix-app naming its application (the folder: dashboard, …, dam)
//   one place   no other tag loads a Plenix file: no ../platform/ stylesheet or script besides the loader's two files, no CDN
//               address (/cdn/), no icon file, data file or application script of its own (the loader adds them)
//   its files   the application's files the loader asks for exist: <app>/app.js and <app>/plenix-icons-<app>.js
//               (dam/app/assets.js and dam/plenix-icons-dam.js), suite/plenix-app-data.js, suite/settings-data.js
// deploy.sh checks the published side: every published page names one release (issue 842, PR 3).
// Alone: node check-system.rules/one-source.js   -> ONE_SOURCE_OK, or the findings and exit 1
const fs = require('fs');
const path = require('path');

const NAME = 'one-source';
const ROOT = path.join(__dirname, '..');

// the application pages: [{ file, app }]
function pages(root = ROOT) {
  const out = [];
  for (const d of fs.readdirSync(root, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (fs.existsSync(path.join(root, d.name, 'main.jsx')) && fs.existsSync(path.join(root, d.name, 'index.html'))) out.push({ file: path.join(root, d.name, 'index.html'), app: d.name });
  }
  const dam = path.join(root, 'dam');
  if (fs.existsSync(dam)) for (const f of fs.readdirSync(dam)) if (f.endsWith('.html')) out.push({ file: path.join(dam, f), app: 'dam' });
  return out.sort((a, b) => (a.file < b.file ? -1 : 1));
}

function findings(root = ROOT) {
  const out = [];
  const say = (file, line, text) => out.push({ file, line, text });
  for (const { file, app } of pages(root)) {
    const text = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, (c) => c.replace(/[^\n]/g, ' '));
    const lineOf = (i) => text.slice(0, i).split('\n').length;
    const tags = [...text.matchAll(/<(script|link)\b[^>]*>/g)].map((m) => ({ tag: m[1], text: m[0], at: m.index, src: (/\b(?:src|href)="([^"]*)"/.exec(m[0]) || [])[1] || '' }));
    const loader = tags.find((t) => t.tag === 'script' && /(^|\/)platform\/loader\/loader\.js$/.test(t.src));
    const sheet = tags.find((t) => t.tag === 'link' && /(^|\/)platform\/loader\/loader\.css$/.test(t.src));
    if (!loader) { say(file, 0, 'does not load the page loader (<script src="../platform/loader/loader.js" data-plenix-app="' + app + '">)'); continue; }
    const named = (/\bdata-plenix-app="([^"]*)"/.exec(loader.text) || [])[1];
    if (named !== app) say(file, lineOf(loader.at), 'the loader names the application "' + (named || '') + '", not "' + app + '"');
    if (!sheet || sheet.at > loader.at) say(file, lineOf(loader.at), 'links platform/loader/loader.css before the loader (it hides the page until plenix.css has loaded)');
    const first = tags.find((t) => t.tag === 'script');
    if (first !== loader) say(file, lineOf(first.at), 'the loader is not the page\'s first script: ' + first.text);
    for (const t of tags) {
      if (t === loader || t === sheet || !t.src) continue;
      if (/(^|\/)platform\//.test(t.src) || /\/cdn\//.test(t.src) || /plenix-icons-[a-z]+\.js$|(plenix-app-data|settings-data)\.js$|(^|\/)app\.js$|app\/assets\.js$/.test(t.src)) say(file, lineOf(t.at), 'loads a Plenix file itself (the loader loads every one, from one place): ' + t.text);
    }
  }
  // the files the loader asks for, in the source copy
  const need = ['suite/plenix-app-data.js', 'suite/settings-data.js', 'dam/app/assets.js', 'dam/plenix-icons-dam.js'];
  for (const { app } of pages(root)) if (app !== 'dam') need.push(app + '/app.js', app + '/plenix-icons-' + app + '.js');
  for (const f of [...new Set(need)]) if (!fs.existsSync(path.join(root, f))) say(path.join(root, f), 0, f + ' is missing: the page loader loads it (run npm ci first, or node build-app.js)');
  return out;
}

function check({ add }) { for (const f of findings()) add(NAME, f.file, f.line, f.text); }
module.exports = { check, findings, pages, NAME };

if (require.main === module) {
  const list = findings();
  list.forEach((f) => console.log('  ' + path.relative(ROOT, f.file).split(path.sep).join('/') + (f.line ? ':' + f.line : '') + '  ' + f.text));
  console.log(list.length ? 'ONE_SOURCE_FAIL (' + list.length + ')' : 'ONE_SOURCE_OK (' + pages().length + ' pages)');
  process.exit(list.length ? 1 : 0);
}
