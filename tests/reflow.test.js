// Plenix tests · reflow (WCAG 2.2 SC 1.4.10, AA; Platforms Standard 3.5): every app page and a sample of the design
// system's pages, in a window 320 CSS px wide (1280px at 400% zoom), scroll in one direction only. Three findings:
//   page-scroll   the page itself scrolls sideways (the document is wider than the window)
//   scroller      an area inside the page scrolls sideways (overflow-x auto or scroll, and wider content)
//   cut-off       visible text or a control reaches past the window's edge where nothing scrolls to it (lost content)
// Content that needs two dimensions is exempt, as WCAG allows: data tables (the DataTable and Table, Tabulator), the
// calendar's time grid, maps and diagrams (svg, canvas), images and the image editor's canvas, preformatted code (the
// CodeBlock), and the design system's specimen stages. Each exempt sideways scroller is listed under "exempt" so it stays visible in the report.
// Known findings are kept in tests/baselines/reflow.json (page -> finding -> number of elements); the test fails only on a
// finding that is new on a page or affects more elements than recorded, so they can only go down.
//   node tests/reflow.test.js            compare
//   node tests/reflow.test.js --update   record the current findings as the baseline (after fixing some, to lower it; TEST_SCOPE=full only)
//   TEST_SCOPE=full node tests/reflow.test.js   every page (default: the pages of what changed, tests/changed.js)
//   REFLOW_PORT=8851 (or TEST_PORT) node tests/reflow.test.js   another port (several runs side by side)
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep, at } = require('./lib.js');
const changed = require('./changed.js');
const PORT = +process.env.REFLOW_PORT || +process.env.TEST_PORT || 8841, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const BASELINE = path.join(__dirname, 'baselines', 'reflow.json');
const WIDTH = 320, HEIGHT = 640;
const APP_PAGES = changed.pages(['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html'])
  // the settings screens beyond each page's first (owner, 2026-10-13: every settings page is cards of rows; the settings-cards rule)
  .concat(['settings/index.html#/account', 'settings/index.html#/appearance', 'settings/index.html#/categories', 'settings/index.html#/docs/data-model',
    'dam/settings-system.html#/users', 'dam/settings-system.html#/permissions', 'dam/settings-myaccount.html#/preferences']));
const HAS_DS = fs.existsSync(path.join(__dirname, '..', 'platform', 'design-system', 'index.html'));
changed.noPartialUpdate();
if (!APP_PAGES.length && !(HAS_DS && changed.anyDS())) changed.none('REFLOW_OK 0 known findings on 0 pages at 320px (0 exempt two-dimensional scrollers)');
// the two-dimensional content WCAG exempts (Understanding 1.4.10: data tables, maps, diagrams, images, editors' canvases),
// and preformatted code (the CodeBlock's pre: code keeps its lines, Understanding 1.4.10 "Content exceptions")
const EXEMPT = '.plx-data-table, .plx-data-table__grid, .plx-time-grid, .plx-image-editor__canvas, .plx-media-viewer, svg, canvas, img, video, .ds-sample-stage, .ds-wire__frame, .plx-code-block__pre';

// runs in the page: the findings at the current width
function measure(EXEMPT) {
  const W = document.documentElement.clientWidth;
  const name = (el) => { const c = typeof el.className === 'string' ? el.className.split(' ').filter((x) => /^(plx|ds)-/.test(x) && !/^plx-u-/.test(x)).slice(0, 2).join('.') : ''; return el.tagName.toLowerCase() + (c ? '.' + c : ''); };
  const shown = (el) => { const c = getComputedStyle(el); return c.display !== 'none' && c.visibility !== 'hidden' && c.opacity !== '0' && !el.closest('[hidden], [aria-hidden="true"], .plx-visually-hidden, .plx-u-visually-hidden'); };
  const out = { 'page-scroll': [], scroller: [], 'cut-off': [], exempt: [] };
  const sc = document.scrollingElement || document.documentElement;
  if (sc.scrollWidth > sc.clientWidth + 1) out['page-scroll'].push('document ' + sc.scrollWidth + 'px wide');
  const sideways = [];
  for (const el of document.querySelectorAll('body *')) {
    const c = getComputedStyle(el);
    if (!/auto|scroll/.test(c.overflowX) || el.scrollWidth <= el.clientWidth + 1 || el.clientWidth === 0 || !shown(el)) continue;
    sideways.push(el);
    // exempt: the scroller is inside two-dimensional content, or such content is what makes it wide
    const wide = (x) => x.getBoundingClientRect().width > el.clientWidth + 1 || x.scrollWidth > el.clientWidth + 1;
    (el.closest(EXEMPT) || [...el.querySelectorAll(EXEMPT)].some(wide) ? out.exempt : out.scroller).push(name(el) + ' ' + el.scrollWidth + '/' + el.clientWidth + 'px');
  }
  // text and controls past the window's edge, with no sideways scroller around them that could bring them in
  const LEAF = 'a, button, input, select, textarea, label, [role="button"], [role="tab"], h1, h2, h3, h4, p, li, dt, dd, span, td, th';
  for (const el of document.querySelectorAll(LEAF)) {
    if (el.closest(EXEMPT) || sideways.some((s) => s.contains(el)) || !shown(el)) continue;
    if (el.matches('span, li, p, dt, dd, td, th, h1, h2, h3, h4') && ![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    // the nearest ancestor that clips sideways (inside the window, else the window itself): past its edge is lost, unless
    // the text ends in an ellipsis (truncation with a way to read it: a tooltip or the full text elsewhere is the rule)
    let left = 0, right = W, ellipsis = getComputedStyle(el).textOverflow === 'ellipsis';
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      const c = getComputedStyle(p); if (c.textOverflow === 'ellipsis') ellipsis = true;
      if (/hidden|clip/.test(c.overflowX)) { const pr = p.getBoundingClientRect(); left = Math.max(left, pr.left); right = Math.min(right, pr.right); break; }
    }
    if (ellipsis) continue;
    if (r.right > right + 1 || r.left < left - 1) out['cut-off'].push(name(el) + ' ' + Math.round(r.left) + '..' + Math.round(r.right) + 'px "' + (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().slice(0, 24) + '"');
  }
  return out;
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: WIDTH, height: HEIGHT });
  const found = {};
  const take = async (key) => { found[key] = await page.evaluate(measure, EXEMPT); };
  for (const a of APP_PAGES) { at(a); await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(800); await take(a); }
  // the design system is a submodule: without it, only the apps are tested. A sample of its pages: its home and the
  // first item of each section (the same each run)
  if (!HAS_DS) console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
  if (HAS_DS && changed.anyDS()) {
    at('design-system home'); await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500); if (changed.dsHome()) await take('design-system home');
    const sample = await page.evaluate(() => { const seen = {}; return window.DSInventory.filter((r) => !seen[r.sec] && (seen[r.sec] = true)).map((r) => '#/' + r.sec + '/' + r.id); });
    const routes = await changed.routesIn(page, sample);
    changed.report(APP_PAGES.length + ' app pages, ' + routes.length + ' of ' + sample.length + ' sampled design-system pages');
    for (const r of routes) { at('design-system ' + r); await page.evaluate((h) => { location.hash = h; }, r); await sleep(500); await take('design-system ' + r); }
  } else changed.report(APP_PAGES.length + ' app pages, 0 design-system pages');
  await browser.close(); server.close();

  const KINDS = ['page-scroll', 'scroller', 'cut-off'];
  const counts = (p) => Object.fromEntries(KINDS.filter((k) => found[p][k].length).map((k) => [k, found[p][k].length]));
  const exempt = Object.keys(found).reduce((n, p) => n + found[p].exempt.length, 0);
  Object.keys(found).forEach((p) => { if (found[p].exempt.length && process.env.REFLOW_VERBOSE) console.log('  exempt ' + p + ': ' + found[p].exempt.slice(0, 3).join(' | ')); });
  const total = Object.keys(found).reduce((n, p) => n + KINDS.reduce((m, k) => m + found[p][k].length, 0), 0);
  if (process.argv.includes('--update')) {
    const base = {}; Object.keys(found).forEach((p) => { const c = counts(p); if (Object.keys(c).length) base[p] = c; });
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true }); fs.writeFileSync(BASELINE, JSON.stringify(base, null, 1) + '\n');
    Object.keys(found).forEach((p) => KINDS.forEach((k) => { if (found[p][k].length) console.log('  ' + p + ' · ' + k + ': ' + found[p][k].length + ' · e.g. ' + found[p][k].slice(0, 2).join(' | ')); }));
    console.log('REFLOW_BASELINE written: ' + total + ' findings on ' + Object.keys(base).length + ' of ' + Object.keys(found).length + ' pages (' + exempt + ' exempt two-dimensional scrollers)');
    return;
  }
  const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {};
  const worse = []; let better = 0;
  Object.keys(found).forEach((p) => KINDS.forEach((k) => { const was = (base[p] || {})[k] || 0, now = found[p][k].length; if (now > was) worse.push(p + ': ' + k + ' ' + was + ' -> ' + now + ' · e.g. ' + found[p][k].slice(0, 3).join(' | ')); }));
  Object.keys(base).filter((p) => found[p]).forEach((p) => Object.entries(base[p]).forEach(([k, n]) => { if (found[p][k].length < n) better++; }));
  worse.forEach((w) => console.log('  NEW ' + w));
  if (better) console.log('  ' + better + ' known findings went down: run with --update to lower the baseline');
  console.log((worse.length ? 'REFLOW_FAIL ' + worse.length + ' new findings; ' : 'REFLOW_OK ') + total + ' known findings on ' + Object.keys(found).length + ' pages at ' + WIDTH + 'px (' + exempt + ' exempt two-dimensional scrollers)');
  process.exit(worse.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
