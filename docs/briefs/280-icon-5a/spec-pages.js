// Icon stage 5a (#280), part 2 proof: every record page of the design spec (each component, pattern and foundation page,
// #/<section>/<record>) draws the same markup before and after a group is converted. A proof script, not a test.
//   node spec-pages.js snapshot <out.json> [<file> …]   this worktree's build, as served at /plenix-b1 (build first): the
//     record pages whose source (src) is in the folder of a given file (all 689 when none is given), and the 10 app pages
//   node spec-pages.js compare <before.json> <after.json>
const fs = require('fs');
const [mode, a, b] = process.argv.slice(2), only = process.argv.slice(4).concat(mode === 'snapshot' && b ? [b] : []);
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
const norm = (html) => html.replace(/\b\d{1,2}:\d{2}(:\d{2})?(\s?[AP]M)?\b/g, 'TIME');

if (mode === 'compare') {
  const A = JSON.parse(fs.readFileSync(a, 'utf8')), B = JSON.parse(fs.readFileSync(b, 'utf8'));
  const pages = Object.keys(A.pages).sort(), differs = [];
  for (const p of pages) if (A.pages[p] !== B.pages[p]) {
    const x = A.pages[p] || '', y = B.pages[p] || ''; let j = 0; while (x[j] === y[j]) j++;
    differs.push({ page: p, before: x.slice(Math.max(0, j - 90), j + 90), after: y.slice(Math.max(0, j - 90), j + 90) });
  }
  console.log(JSON.stringify({ pages: pages.length, same: pages.length - differs.length, differ: differs.length,
    pageErrors: { before: A.errors.length, after: B.errors.length }, differs: differs.slice(0, 10) }, null, 1));
} else if (mode === 'snapshot') {
  const puppeteer = require(process.env.HOME + '/work/plenix-b1/node_modules/puppeteer-core');
  (async () => {
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
    const URL = 'http://127.0.0.1:8791/plenix-b1/platform/design-system/index.html?plenix=local';
    const open = async () => { const p = await browser.newPage(); await p.setViewport({ width: 1440, height: 900 }); p.errs = []; p.on('pageerror', (e) => p.errs.push(e.message)); await p.goto(URL + '#/', { waitUntil: 'networkidle2' }); await new Promise((r) => setTimeout(r, 1500)); return p; };
    // the markup once it has stopped changing (the page's table of contents arrives a moment after the page)
    const settled = async (p, read) => { let last = null; for (let k = 0; k < 30; k++) { await new Promise((r) => setTimeout(r, 250)); const now = await p.evaluate(read); if (now === last) return now; last = now; } return last; };
    const first = await open();
    if (first.errs.length) throw new Error('the spec page fails to load: ' + first.errs[0]);
    const dirs = only.map((f) => f.replace(/^platform\//, '').replace(/[^/]+$/, ''));
    const hashes = await first.evaluate((dirs) => window.DSInventory.filter((r) => !dirs.length || (r.src && dirs.some((d) => r.src.startsWith(d)))).map((r) => '#/' + r.sec + '/' + r.id), dirs);
    const tabs = [first, await open()], out = {};
    await Promise.all(tabs.map(async (p, t) => {
      for (let i = t; i < hashes.length; i += tabs.length) {
        await p.evaluate((x) => { location.hash = x; }, hashes[i]);
        out[hashes[i]] = norm(await settled(p, () => (document.querySelector('main') || document.body).innerHTML));
        if (Object.keys(out).length % 100 === 0) console.error(new Date().toISOString().slice(11, 19), Object.keys(out).length + '/' + hashes.length);
      }
    }));
    // the applications
    for (const app of APPS) {
      const q = await browser.newPage(); await q.setViewport({ width: 1440, height: 900 }); q.on('pageerror', (e) => first.errs.push(app + ': ' + e.message));
      await q.goto('http://127.0.0.1:8791/plenix-b1/' + app + '/index.html', { waitUntil: 'networkidle2' }); await new Promise((r) => setTimeout(r, 1200));
      out['app:' + app] = norm(await q.evaluate(() => document.body.innerHTML)); await q.close();
    }
    fs.writeFileSync(a, JSON.stringify({ pages: out, errors: tabs.flatMap((p) => p.errs) }));
    console.log('snapshot', Object.keys(out).length, 'pages, page errors', tabs.flatMap((p) => p.errs).length);
    await browser.close();
  })();
} else console.error('usage: node spec-pages.js snapshot <out.json> | compare <before.json> <after.json>');
