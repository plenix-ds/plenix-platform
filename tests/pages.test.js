// Plenix tests · every page loads clean: each app page, the design system home, every built item (and its variant pages)
// and every placeholder item. A console error (the style audit reports inline styles as errors), a page error, a
// failed request, a <table> that is not a DataTable, or three framed boxes nested (owner, batch 250: containers nest two deep,
// never three; platform/system/nesting.css) fails it. Only the work log is allowed to be missing: it lives outside this repository.
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
  // every table is a DataTable (batch 226): a <table> left on the page or in its frames (Tabulator draws with divs) fails it
  const tables = async () => { const left = await page.evaluate(() => [document].concat([...document.querySelectorAll('iframe')].map((f) => { try { return f.contentDocument; } catch (e) { return null; } }).filter(Boolean))
    .reduce((n, d) => n + d.querySelectorAll('table').length, 0)); if (left) errs.push(left + (left === 1 ? ' table that is' : ' tables that are') + ' not a DataTable'); };
  // containers nest two deep, never three (batch 250): a framed box is one larger than a control that draws a border on three
  // or more sides (inset shadows count as the sides they draw) or an outer shadow; a one-sided divider is not a frame.
  // Specimens are the subject on show, not page structure: anything in a design-system sample stage, a variant card's Preview
  // or a drawn state (batch 265-266), a whole
  // app shell shown inside a panel, and the design system's illustration
  // boxes (wireframes, demo boxes, mini shells, motion cards).
  const nesting = async () => { const found = await page.evaluate(() => {
    const CONTROL = 'button, input, select, textarea, [role="tab"], [role="checkbox"], [role="switch"], .plx-tag, .plx-chip, .plx-badge, .plx-kbd, .plx-avatar, .plx-thumbnail, img, svg, .plx-icon';
    const SPECIMEN = /(^| )ds-(wire__|box( |$)|demo-box|shell-mini|mk-card|motion-card)/;
    const framed = (el) => {
      if (el.matches(CONTROL) || el.closest('.plx-button') || el.closest('.ds-sample-stage, .ds-variant-preview, .ds-state-row__sample, .ds-wire__frame, .plx-panel .plx-app-shell') || SPECIMEN.test(typeof el.className === 'string' ? el.className : '')) return false;
      const r = el.getBoundingClientRect(); if (r.width < 48 || r.height < 32) return false;
      const c = getComputedStyle(el); if (c.display === 'none' || c.visibility === 'hidden') return false;
      const side = (x) => parseFloat(c['border' + x + 'Width']) > 0 && c['border' + x + 'Style'] !== 'none' && !/rgba\(\d+, \d+, \d+, 0\)|transparent/.test(c['border' + x + 'Color']);
      const borders = ['Top', 'Right', 'Bottom', 'Left'].filter(side).length;
      const parts = c.boxShadow === 'none' ? [] : c.boxShadow.split(/,(?![^(]*\))/).map((x) => x.trim()).filter((x) => !/rgba\(\d+, \d+, \d+, 0\)/.test(x));
      let outer = false, inset = 0;
      parts.forEach((x) => { const v = (x.match(/-?[0-9.]+px/g) || []).map(parseFloat); if (/inset/.test(x)) { if (v[0]) inset++; if (v[1]) inset++; if (v[3]) inset += 4; } else if ((v[2] || 0) > 0 || (v[3] || 0) > 0) outer = true; });
      return outer || borders + inset >= 3;
    };
    const name = (el) => (typeof el.className === 'string' && el.className.split(' ').filter((x) => /^(plx|ds)-/.test(x) && !/^plx-u-/.test(x)).slice(0, 2).join('.')) || el.tagName.toLowerCase();
    for (const el of document.querySelectorAll('body *')) {
      if (!framed(el)) continue;
      const chain = [el]; for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) if (framed(p)) chain.unshift(p);
      if (chain.length >= 3) return chain.map(name).join(' > ');
    }
    return null;
  }); if (found) errs.push('three containers nested: ' + found); };
  const done = (name) => { n++; if (errs.length) failed.push([name, [...new Set(errs)].slice(0, 4)]); errs = []; };

  for (const a of APP_PAGES) { await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(600); await tables(); await nesting(); done(a); }

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
    await tables(); await nesting();
    done('design system ' + r);
  }

  await browser.close(); server.close();
  failed.forEach(([name, e]) => { console.log('FAIL ' + name); e.forEach((x) => console.log('     ' + x)); });
  console.log((failed.length ? 'PAGES_FAIL ' : 'PAGES_OK ') + (n - failed.length) + '/' + n);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
