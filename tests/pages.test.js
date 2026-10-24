// Plenix tests · every page loads clean: each app page, the design system home, every built item (and its variant pages)
// and every placeholder item. A console error (the style audit reports inline styles as errors), a page error, a
// failed request, a <table> that is not a DataGrid, or three framed boxes nested (owner, batch 250: containers nest two deep,
// never three; the pattern chooses the unframed presentation) fails it. Only the work log is allowed to be missing: it lives outside this repository.
//   node tests/pages.test.js                  the pages of what changed (tests/changed.js)
//   TEST_SCOPE=full node tests/pages.test.js  every page (the final gate)   TEST_PORT=8901: another port
const { serve, launch, sleep, at } = require('./lib.js');
const changed = require('./changed.js');
const PORT = +process.env.TEST_PORT || 8790, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const ALLOWED_MISSING = /Plenix%20-%20DAM\/audit\/batches\//;
const APP_PAGES = changed.pages(['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']));
// the design system is a submodule (plenix-design-system): without it, only the apps are tested
const HAS_DS = require('fs').existsSync(require('path').join(__dirname, '..', 'platform', 'design-system', 'index.html'));
if (!APP_PAGES.length && !(HAS_DS && changed.anyDS())) changed.none('PAGES_OK 0/0');

let current = '';   // the design-system page being checked
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  let errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !ALLOWED_MISSING.test((m.location() || {}).url || '') && !/favicon/.test((m.location() || {}).url || '')) errs.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errs.push('page error: ' + String(e).slice(0, 200)));
  page.on('response', (r) => { if (r.status() >= 400 && !ALLOWED_MISSING.test(r.url()) && !/favicon/.test(r.url())) errs.push(r.status() + ' ' + r.url()); });
  const failed = []; let n = 0;
  // every table is a DataGrid (batch 226): a <table> left on the page or in its frames (the grids draw with divs) fails it;
  // a table a person wrote in their own content (inside .plx-user-content: the rich-text editor, RichText showing saved HTML) is content, not interface
  const tables = async () => { const left = await page.evaluate(() => [document].concat([...document.querySelectorAll('iframe')].map((f) => { try { return f.contentDocument; } catch (e) { return null; } }).filter(Boolean))
    .reduce((n, d) => n + [...d.querySelectorAll('table')].filter((t) => !t.closest('.plx-user-content')).length, 0)); if (left) errs.push(left + (left === 1 ? ' table that is' : ' tables that are') + ' not a DataGrid'); };
  // containers nest two deep, never three (batch 250): a framed box is one larger than a control that draws a border on three
  // or more sides (inset shadows count as the sides they draw) or an outer shadow; a one-sided divider is not a frame.
  // Specimens are the subject on show, not page structure: anything in a design-system sample stage, a variant card's Preview
  // or a drawn state (batch 265-266), a whole
  // app shell shown inside a panel, and the design system's illustration
  // boxes (wireframes, demo boxes, mini shells, motion cards).
  const nesting = async () => { const found = await page.evaluate(() => {
    const CONTROL = 'button, input, select, textarea, [role="tab"], [role="checkbox"], [role="switch"], .plx-tag, .plx-tag--chip, .plx-badge, .plx-kbd, .plx-avatar, .plx-thumbnail, img, svg, .plx-icon';
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
  // inline styles at run time (owner, 2026-10-13): JavaScript may write inline styles for on-the-spot adjustments from
  // tokens and defined styles; whether a value is a token or a literal is checked in the source (check-system,
  // inline-style). Here, in the page and its frames: no custom property that is not a Platform one (--plx-…; --ds-… on the
  // design system), no font family that is not a token, and no height, line height or padding on a DataGrid row or cell
  // (the density's), and every inline length a token or a whole number of grid steps (the base spacing token; owner: the
  // output "has to conform to fit into the grid system")
  const styles = async () => { const r = await page.evaluate(() => {
    const docs = [document].concat([...document.querySelectorAll('iframe')].map((f) => { try { return f.contentDocument; } catch (e) { return null; } }).filter(Boolean));
    const out = { other: [] };
    const SPEC = /\/platform\/design-system\//.test(location.pathname);
    const DENSITY = /^(height|min-height|max-height|line-height|padding(-(top|right|bottom|left|block|inline)(-(start|end))?)?)$/;
    const step = (el) => { const v = getComputedStyle(el.ownerDocument.documentElement).getPropertyValue('--plx-ref-space-4px').trim(); const px = /rem$/.test(v) ? parseFloat(v) * parseFloat(getComputedStyle(el.ownerDocument.documentElement).fontSize) : parseFloat(v); return px > 0 ? px : 4; };
    const offGrid = (el, v) => { const s = step(el); return Array.from(String(v).replace(/var\([^()]*(\([^()]*\)[^()]*)*\)/g, ' ').matchAll(/(-?\d*\.?\d+)(px|rem|em|pt|vh|vw|vmin|vmax|ch|ex)(?![\w-])/gi))
      .some((m) => parseFloat(m[1]) && (m[2].toLowerCase() !== 'px' || Math.abs(Math.abs(parseFloat(m[1])) / s - Math.round(Math.abs(parseFloat(m[1])) / s)) * s > 0.5)); };
    // user content (.plx-user-content: the rich-text editor's area, RichText showing saved HTML) keeps the person's own
    // formatting, as Tiptap stores it: these properties only (owner, 2026-10-14)
    const USER_FORMAT = /^(color|background-color|font-family|font-size|text-align)$/;
    const wrong = (el) => { const table = el.matches('.plx-data-grid .plx-data-grid__grid-row, .plx-data-grid .plx-data-grid__grid-cell'), user = !!el.closest('.plx-user-content');
      return Array.from(el.style).filter((p) => !(user && USER_FORMAT.test(p)) && (/^--/.test(p) ? !(/^--plx-/.test(p) || (SPEC && /^--ds-/.test(p))) : (p === 'font-family' && !/^\s*var\(--plx-/.test(el.style.getPropertyValue(p))) || (table && DENSITY.test(p)))
        || offGrid(el, el.style.getPropertyValue(p))).map((p) => p + ': ' + el.style.getPropertyValue(p)); };
    docs.forEach((d) => d.querySelectorAll('[style]').forEach((el) => { const bad = wrong(el); if (!bad.length || el.closest('[data-plx-probe]')) return; out.other.push(el.tagName.toLowerCase() + '.' + String(el.className).split(' ').slice(0, 2).join('.') + ' ' + bad.join(', ')); }));
    return out; });
    if (r.other.length) errs.push(r.other.length + ' element(s) with an inline style the system does not allow: ' + r.other.slice(0, 2).join(' | ')); };
  const done = (name) => { n++; if (errs.length) failed.push([name, [...new Set(errs)].slice(0, 4)]); errs = []; };

  for (const a of APP_PAGES) { at(a); await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(600); await tables(); await nesting(); await styles(); done(a); }

  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
  const DS_OPEN = HAS_DS && changed.anyDS();
  if (DS_OPEN) { at('design system home'); await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500); if (changed.dsHome()) done('design system home'); else errs = []; }
  const all = !DS_OPEN ? [] : await page.evaluate(() => {
    const out = new Set([...document.querySelectorAll('a[href^="#/"]')].map((a) => a.getAttribute('href')));
    window.DSInventory.forEach((r) => { out.add('#/' + r.sec + '/' + r.id); if (r.lab) out.add('#/' + r.sec + '/' + r.id + '/v/all'); (r.variantPages || []).forEach((v) => out.add('#/' + r.sec + '/' + r.id + '/v/' + window.DS.slug(v.leaf))); });
    Object.keys(window.DSGuidance || {}).forEach((k) => { const [sec, leaf] = k.split('|'); out.add('#/' + sec + '/leaf-' + sec + '-' + window.DS.slug(leaf)); });
    return [...out];
  });
  const routes = DS_OPEN ? await changed.routesIn(page, all) : [];
  changed.report(APP_PAGES.length + ' app pages, ' + routes.length + ' of ' + all.length + ' design-system pages');
  for (const r of routes) {
    current = r; at('design system ' + r);   // named in the error if this page hangs
    if (process.env.PAGES_TRACE) console.log('page ' + r);   // PAGES_TRACE=1: name each page as it loads (to find one that hangs)
    await page.evaluate((h) => { location.hash = h; }, r); await sleep(250);
    const blank = await page.evaluate(() => !document.querySelector('main') || document.querySelector('main').innerText.trim().length < 20);
    if (blank) errs.push('empty page');
    await tables(); await nesting(); await styles();
    done('design system ' + r);
  }

  await browser.close(); server.close();
  failed.forEach(([name, e]) => { console.log('FAIL ' + name); e.forEach((x) => console.log('     ' + x)); });
  console.log((failed.length ? 'PAGES_FAIL ' : 'PAGES_OK ') + (n - failed.length) + '/' + n);
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error((current ? 'stopped on design system ' + current + ': ' : '') + e.message); process.exit(1); });
