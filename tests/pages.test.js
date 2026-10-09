// Plenix tests · every page loads clean: each app page, the design system home, every built item (and its variant pages)
// and every placeholder item. A console error (the style audit reports inline styles as errors), a page error, a
// failed request, or a <table> that is not a DataGrid fails it. Only the work log is allowed to be missing: it lives outside this repository.
//   node tests/pages.test.js
const { serve, launch, sleep } = require('./lib.js');
const PORT = 8790, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const ALLOWED_MISSING = /Plenix%20-%20DAM\/audit\/batches\//;
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']);

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  let errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !ALLOWED_MISSING.test((m.location() || {}).url || '') && !/favicon/.test((m.location() || {}).url || '')) errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push('page error: ' + String(e).slice(0, 200)));
  page.on('response', (r) => { if (r.status() >= 400 && !ALLOWED_MISSING.test(r.url()) && !/favicon/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
  const failed = []; let n = 0;
  // every table is a DataGrid (batch 226): a <table> left on the page or in its frames (Tabulator draws with divs) fails it
  const tables = async () => { const left = await page.evaluate(() => [document].concat([...document.querySelectorAll('iframe')].map((f) => { try { return f.contentDocument; } catch (e) { return null; } }).filter(Boolean))
    .reduce((n, d) => n + d.querySelectorAll('table').length, 0)); if (left) errs.push(left + (left === 1 ? ' table that is' : ' tables that are') + ' not a DataGrid'); };
  const done = (name) => { n++; if (errs.length) failed.push([name, [...new Set(errs)].slice(0, 4)]); errs = []; };

  for (const a of APP_PAGES) { await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(600); await tables(); done(a); }

  // the design system is a submodule (plenix-design-system): without it, only the apps are tested
  const HAS_DS = require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'));
  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
  if (HAS_DS) await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); if (HAS_DS) await sleep(1500); if (HAS_DS) done('design system home');
  const routes = !HAS_DS ? [] : await page.evaluate(() => {
    const out = new Set([...document.querySelectorAll('a[href^="#/"]')].map((a) => a.getAttribute('href')));
    window.DSInventory.forEach((r) => { out.add('#/' + r.sec + '/' + r.id); if (r.lab) out.add('#/' + r.sec + '/' + r.id + '/v/all'); (r.variantPages || []).forEach((v) => out.add('#/' + r.sec + '/' + r.id + '/v/' + window.DS.slug(v.leaf))); });
    Object.keys(window.DSGuidance || {}).forEach((k) => { const [sec, leaf] = k.split('|'); out.add('#/' + sec + '/leaf-' + sec + '-' + window.DS.slug(leaf)); });
    return [...out];
  });
  for (const r of routes) {
    await page.evaluate((h) => { location.hash = h; }, r); await sleep(250);
    const blank = await page.evaluate(() => !document.querySelector('main') || document.querySelector('main').innerText.trim().length < 20);
    if (blank) errs.push('empty page');
    await tables();
    done('design system ' + r);
  }

  await browser.close(); server.close();
  failed.forEach(([name, e]) => { console.log('FAIL ' + name); e.forEach((x) => console.log('     ' + x)); });
  console.log((failed.length ? 'PAGES_FAIL ' : 'PAGES_OK ') + (n - failed.length) + '/' + n);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
