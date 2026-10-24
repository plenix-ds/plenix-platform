/* Spec questions wizard: check the authored sections
   Usage: node docs/briefs/spec-wording/wizard/check.js [section]
   Checks every record in sections/<section>.json against questions.json (ids exist, every question covered, a title,
   2–4 options each with a render, exactly one recommended, a recommendation with sources), then opens each question
   in headless Chrome and fails on a drawing that throws, renders nothing, or logs an error. */
const fs = require('fs'), path = require('path');
const DIR = __dirname, ROOT = path.resolve(DIR, '../../../..');
const { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const only = process.argv[2];
const questions = JSON.parse(fs.readFileSync(path.join(DIR, 'questions.json'), 'utf8'));
const sections = [...new Set(questions.map((q) => q.section))].filter((s) => !only || s === only);
const problems = [];
let authored = [];
// every quote must be found word for word in the spec or the code, unless its "where" says (paraphrase)
const norm = (s) => String(s).replace(/\\n/g, ' ').replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, ' ').trim().toLowerCase();
let corpus = null;
const sourceText = () => {
  if (corpus) return corpus;
  const parts = [], walk = (d) => { for (const n of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, n.name);
    if (n.isDirectory()) { if (!/^(node_modules|vendor|dist|\.git|icons|fonts|assets)$/.test(n.name)) walk(p); }
    else if (/\.(js|jsx|css|json|md)$/.test(n.name) && fs.statSync(p).size < 8e6) parts.push(fs.readFileSync(p, 'utf8')); } };
  walk(path.join(ROOT, 'platform'));
  // the questions were written against the spec-wording branch of the design spec: its text counts too
  try {
    const { execFileSync } = require('child_process'), DS = path.join(ROOT, 'platform', 'design-system'), REF = 'origin/spec-wording-3';
    for (const f of execFileSync('git', ['-C', DS, 'ls-tree', '-r', '--name-only', REF], { encoding: 'utf8' }).split('\n').filter((x) => /\.(js|json|md)$/.test(x)))
      parts.push(execFileSync('git', ['-C', DS, 'show', REF + ':' + f], { encoding: 'utf8', maxBuffer: 1 << 28 }));
  } catch (e) { /* branch not fetched: the checkout's spec only */ }
  return (corpus = norm(parts.join(' ')));
};
for (const s of sections) {
  const file = path.join(DIR, 'sections', s + '.json');
  if (!fs.existsSync(file)) { problems.push(s + ': no sections/' + s + '.json'); continue; }
  let items; try { items = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) { problems.push(s + ': not JSON: ' + e.message); continue; }
  const ids = new Set(questions.filter((q) => q.section === s).map((q) => q.id));
  for (const id of ids) if (!items.find((it) => it.id === id)) problems.push(id + ': not authored');
  for (const it of items) {
    const p = (m) => problems.push(it.id + ': ' + m);
    if (!ids.has(it.id)) { p('unknown id'); continue; }
    if (!it.title) p('no title');
    if (!Array.isArray(it.current) || !it.current.length) p('no current statements');
    else it.current.forEach((c) => {
      if (/\(paraphrase\)/i.test(c.where || '')) return;
      const pieces = norm(c.text).split(/\s*(?:…|\.\.\.)\s*/).filter((x) => x.length > 12);   // an ellipsis joins exact pieces
      if (pieces.some((x) => !sourceText().includes(x))) p('quote not found word for word (mark its where "(paraphrase)" or quote exactly): ' + String(c.text).slice(0, 70));
    });
    if (!Array.isArray(it.options) || it.options.length < 2 || it.options.length > 4) p('needs 2–4 options');
    else {
      if (it.options.filter((o) => o.recommended).length !== 1) p('exactly one option must be recommended');
      it.options.forEach((o) => { if (!o.key || !o.label) p('option without key or label'); if (!o.render) p('option ' + o.key + ' has no render'); });
    }
    if (!it.recommendation) p('no recommendation');
    if (!Array.isArray(it.sources) || !it.sources.length) p('no sources for the recommendation');
    const renders = [].concat(it.renders || []).concat(...(it.options || []).map((o) => [].concat(o.render || [])));
    renders.forEach((r) => { if (r.width && !['360', '600', '840', '1200'].includes(String(r.width))) p('width must be 360, 600, 840 or 1200');
      if (r.jsx) { try { new Function('h', 'P', 'React', 'return (' + r.jsx + ');'); } catch (e) { p('jsx does not parse: ' + e.message); } }
      if (r.html && /style=/i.test(r.html)) p('inline style in html (use Platform classes)'); });
  }
  authored = authored.concat(items.filter((it) => ids.has(it.id)));
}
(async () => {
  if (authored.length) {
    const PORT = +process.env.TEST_PORT || 9391, server = await serve(PORT); let browser;
    try {
      browser = await launch(); const page = await browser.newPage(); const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      await page.setViewport({ width: 1440, height: 1000 });
      for (const it of authored) {
        errors.length = 0;
        await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/spec-wording/wizard/index.html#' + encodeURIComponent(it.id), { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.wz-h1', { timeout: 30000 });
        await new Promise((r) => setTimeout(r, 400));
        const r = await page.evaluate((id) => ({ id: location.hash.slice(1), failed: [...document.querySelectorAll('.wz-stage__error')].map((e) => e.textContent),
          empty: [...document.querySelectorAll('.wz-stage__frame')].filter((f) => !f.textContent.trim() && !f.querySelector('svg,img,canvas,input,button,[class*="plx-"]')).length,
          stages: document.querySelectorAll('.wz-stage').length }), it.id);
        if (decodeURIComponent(r.id) !== it.id) problems.push(it.id + ': page did not open it');
        r.failed.forEach((m) => problems.push(it.id + ': ' + m));
        if (r.empty) problems.push(it.id + ': ' + r.empty + ' drawing(s) render nothing');
        errors.filter((e) => !/favicon|404/.test(e)).forEach((e) => problems.push(it.id + ': console: ' + e.slice(0, 200)));
      }
    } finally { if (browser) await browser.close(); server.close(); }
  }
  if (problems.length) { console.log(problems.join('\n')); console.log('WIZARD_FAIL ' + problems.length + ' problems in ' + sections.join(', ')); process.exit(1); }
  console.log('WIZARD_OK ' + authored.length + ' questions in ' + sections.join(', '));
})().catch((e) => { console.error(e); process.exit(1); });
