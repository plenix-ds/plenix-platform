// Plenix · tools/check-overflow.js (owner, fit-and-overflow stage 2, 2026-10-29): the overflow audit. A tool the OWNER runs; we never run it.
//   node tools/check-overflow.js                 every design-spec page and the 10 apps, at the widths below, then a report
//   node tools/check-overflow.js --dry           loads the tool, checks the allow-list, prints what it would open; starts no browser
//   node tools/check-overflow.js --only <text>   only the pages whose address contains <text> (repeat the flag for more)
//   node tools/check-overflow.js --limit <n>     the first n pages of each group (a quick look)
//   node tools/check-overflow.js --no-spec | --no-apps | --spec-rtl     leave a group out; also run the spec pages right to left
//   node tools/check-overflow.js --pictures <n>  small pictures per kind and finding in the report (default 3)
//   node tools/check-overflow.js --out <folder>  where the report goes (default tools/overflow-report/, not committed)
// Needs Chrome (CHROME_PATH, as the tests) and puppeteer-core; it serves the repository itself, like the tests do. Read-only: it writes only the report.
//
// WHAT IT FINDS (in one headless tab, one page at a time)
//   cut        text cut by an ellipsis or a line clamp whose full text has no reveal (a Plenix Tooltip around it, or a title). No reveal is an ERROR;
//              a cut text that has one is listed "for a look" and is not an error.
//   spill      content wider than its box where the box does not scroll (scrollWidth > clientWidth + 1, overflow visible or hidden).
//   outside    a child outside its parent's edges by more than 1px, where the parent clips, has a border or a fill (not for absolute or fixed children).
//   page       the whole page scrolls sideways.
//   multirow   a toolbar, menu bar or action bar (role toolbar or menubar, ActionBar, a command bar row) with controls on more than one row: ALWAYS an
//              error, by the owner's rule (a bar never wraps; it folds into More).
// WHAT IT LEAVES OUT: scroll areas (overflow auto or scroll), hidden and inert content, .plx-visually-hidden, aria-hidden subtrees, SVG and canvas,
//   frames, and what is already folded into a More menu. Anything else intentional goes in tools/overflow-allow.json, one entry each: { "selector", "page",
//   "kind" (optional), "reason" }. No blanket entries: a selector, a page text (not "*") and a reason are required, or the tool stops. The report counts what
//   each entry hid and names the entries that hid nothing, so the list cannot hide problems quietly.
// WHERE IT LOOKS
//   spec pages  read from the design spec's own navigation at run time (every #/<section>/<page> link), windows 1280px, 400px and 640px (1280px at 200% zoom)
//   the apps    dashboard, projects, messages, contacts, calendar, tasks, notes, bookmarks, files, settings; windows 1280px and 400px, and, at a 1280px window,
//               the navigation and side panes at 140, 192, 240, 360 and 400px (set inside the page for the run only, never in a file); left to right and right to left
// THE REPORT  overflow-report.html and overflow-report.json: the run time first, then findings grouped by component kind (the plx- block of the element), each
//   with where it was seen (page, width, direction), an example selector, its text and small pictures; the errors before the listed cases; the allow-list's counts.
// Exit: 0 no errors, 1 errors found, 2 could not run (no Chrome, a bad allow-list).
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f, d) => { const i = args.indexOf(f); return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : d; };
const many = (f) => args.reduce((a, x, i) => (x === f && args[i + 1] ? a.concat(args[i + 1]) : a), []);
const DRY = has('--dry'), ONLY = many('--only'), LIMIT = +val('--limit', 0), PICTURES = +val('--pictures', 3);
const OUT = path.resolve(val('--out', path.join(ROOT, 'tools', 'overflow-report')));
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'];
const PANES = [140, 192, 240, 360, 400];
const SPEC = 'platform/design-system/index.html';

if (has('--help') || has('-h')) { console.log(fs.readFileSync(__filename, 'utf8').split('\n').filter((l) => l.startsWith('//')).map((l) => l.slice(3)).join('\n')); process.exit(0); }

// ---- the allow-list: reviewed, one reason per entry, no blanket entries
function loadAllow() {
  const file = path.join(__dirname, 'overflow-allow.json');
  const raw = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : { entries: [] };
  const bad = [];
  (raw.entries || []).forEach((e, i) => {
    const why = [];
    if (!e.selector || typeof e.selector !== 'string') why.push('a selector');
    if (!e.page || typeof e.page !== 'string' || /^\s*\*?\s*$/.test(e.page)) why.push('a page text (not empty, not "*")');
    if (!e.reason || String(e.reason).trim().length < 12) why.push('a reason (at least a short sentence)');
    if (e.kind && !['cut', 'spill', 'outside', 'page', 'multirow'].includes(e.kind)) why.push('a kind that is cut, spill, outside, page or multirow');
    if (why.length) bad.push('entry ' + (i + 1) + (e.selector ? ' (' + e.selector + ')' : '') + ' needs ' + why.join(', '));
  });
  if (bad.length) { console.log('OVERFLOW_ERROR: tools/overflow-allow.json:\n  ' + bad.join('\n  ')); process.exit(2); }
  return (raw.entries || []).map((e) => Object.assign({ hid: 0 }, e));
}
const ALLOW = loadAllow();

// ---- what to open
const appViews = () => {
  const views = [];
  for (const app of APPS) for (const dir of ['ltr', 'rtl']) {
    views.push({ group: 'app', url: app + '/index.html', width: 1280, dir, label: '1280' }, { group: 'app', url: app + '/index.html', width: 400, dir, label: '400' });
    for (const p of PANES) views.push({ group: 'app', url: app + '/index.html', width: 1280, dir, pane: p, label: 'pane ' + p });
  }
  return views;
};
const specViews = (routes) => {
  const views = [];
  const dirs = has('--spec-rtl') ? ['ltr', 'rtl'] : ['ltr'];
  for (const r of routes) for (const dir of dirs) for (const [width, label, scale] of [[1280, '1280'], [400, '400'], [640, '1280 at 200% zoom']]) views.push({ group: 'spec', url: SPEC + '#/' + r, width, dir, label, scale });
  return views;
};
const filter = (views) => views.filter((v) => !ONLY.length || ONLY.some((t) => v.url.includes(t)));
const limited = (views) => (LIMIT ? [...new Map(views.map((v) => [v.url, v])).keys()].slice(0, LIMIT).flatMap((u) => views.filter((v) => v.url === u)) : views);

if (DRY) {
  const apps = has('--no-apps') ? [] : filter(appViews());
  console.log('Overflow check, dry run (no browser, nothing opened)');
  console.log('  allow-list: ' + ALLOW.length + ' entr' + (ALLOW.length === 1 ? 'y' : 'ies') + ', all with a selector, a page and a reason');
  console.log('  apps: ' + APPS.length + ' (' + apps.length + ' views: windows 1280 and 400, panes ' + PANES.join(', ') + ', left to right and right to left)');
  console.log('  spec: pages are read from the spec navigation at run time; each at windows 1280, 400 and 640 (1280 at 200% zoom)' + (has('--spec-rtl') ? ', both directions' : ', left to right'));
  console.log('  report: ' + path.relative(ROOT, OUT) + '/overflow-report.html and .json');
  console.log('OVERFLOW_DRY_OK');
  process.exit(0);
}

// ---- the finders, run inside the page (one function; its result is plain data)
function inPage(opts) {
  const out = [];
  const view = (el) => el.ownerDocument.defaultView;
  const css = (el) => view(el).getComputedStyle(el);
  const hiddenUp = (el) => {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      if (e.hidden || e.hasAttribute('inert') || e.getAttribute('aria-hidden') === 'true' || e.matches('.plx-visually-hidden, .plx-u-sr-only, svg, canvas, iframe, [data-plx-probe]')) return true;
      const c = css(e);
      if (c.display === 'none' || c.visibility === 'hidden' || c.visibility === 'collapse') return true;
    }
    return false;
  };
  const block = (el) => { for (let e = el; e && e.nodeType === 1; e = e.parentElement) { const m = [...e.classList].map((c) => /^plx-([a-z0-9]+(?:-[a-z0-9]+)*?)(?:__|--|$)/.exec(c)).find(Boolean); if (m) return m[1]; } return 'page'; };
  const sel = (el) => { const parts = []; for (let e = el, n = 0; e && e.nodeType === 1 && n < 4; e = e.parentElement, n++) { const cl = [...e.classList].filter((c) => /^plx-/.test(c)).slice(0, 2).join('.'); parts.unshift(e.tagName.toLowerCase() + (cl ? '.' + cl : '') + (e.id ? '#' + e.id : '')); if (e.id) break; } return parts.join(' > '); };
  const text = (el) => String(el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 80);
  const scrolls = (c) => /auto|scroll/.test(c.overflowX) || /auto|scroll/.test(c.overflowY);
  const reveal = (el) => {
    for (let e = el, n = 0; e && e.nodeType === 1 && n < 4; e = e.parentElement, n++) {
      if (e.hasAttribute('title') && e.getAttribute('title')) return 'title';
      if (e.classList.contains('plx-tooltip') || e.querySelector(':scope > .plx-tooltip__bubble')) return 'tooltip';
      if (e.getAttribute('aria-describedby') && /^plx-tt/.test(e.getAttribute('aria-describedby'))) return 'tooltip';
    }
    return 'none';
  };
  const add = (kind, el, extra) => out.push(Object.assign({ kind, block: block(el), selector: sel(el), text: text(el), rect: (() => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x + view(el).scrollX), y: Math.round(r.y + view(el).scrollY), w: Math.round(r.width), h: Math.round(r.height) }; })() }, extra || {}));
  const root = document;
  const all = [...root.querySelectorAll('body *')];
  // cut: an ellipsis or a line clamp that is really cutting
  for (const el of all) {
    const c = css(el);
    const clamp = (c.webkitLineClamp && c.webkitLineClamp !== 'none') || (c.lineClamp && c.lineClamp !== 'none');
    if (!(c.textOverflow === 'ellipsis' || clamp)) continue;
    if (el.clientWidth === 0 || hiddenUp(el)) continue;
    if (el.scrollWidth > el.clientWidth + 1 || (clamp && el.scrollHeight > el.clientHeight + 1)) add('cut', el, { reveal: reveal(el), width: el.clientWidth, needs: el.scrollWidth });
  }
  // spill: wider than the box, and the box does not scroll
  for (const el of all) {
    const c = css(el);
    if (c.display === 'inline' || el.clientWidth === 0 || scrolls(c) || /ellipsis/.test(c.textOverflow) || hiddenUp(el)) continue;
    if (el.scrollWidth > el.clientWidth + 1 && !el.closest('[class*="plx-data-grid__grid"], .plx-table__scroll')) add('spill', el, { width: el.clientWidth, needs: el.scrollWidth });
  }
  // outside: a child beyond its parent's edge, where the parent clips, has a border or a fill
  for (const parent of all) {
    const c = css(parent);
    if (parent.clientWidth === 0 || hiddenUp(parent) || scrolls(c)) continue;
    const frames = c.overflowX !== 'visible' || parseFloat(c.borderLeftWidth) > 0 || parseFloat(c.borderTopWidth) > 0 || (c.backgroundColor && c.backgroundColor !== 'rgba(0, 0, 0, 0)' && c.backgroundColor !== 'transparent');
    if (!frames) continue;
    const pr = parent.getBoundingClientRect();
    for (const child of parent.children) {
      const cc = css(child);
      if (cc.position === 'absolute' || cc.position === 'fixed' || cc.display === 'none' || cc.display === 'contents' || hiddenUp(child)) continue;
      const r = child.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      if (r.left < pr.left - 1 || r.right > pr.right + 1) add('outside', child, { parent: sel(parent), by: Math.round(Math.max(pr.left - r.left, r.right - pr.right)) });
    }
  }
  // page: the whole page scrolls sideways
  const de = document.documentElement;
  if (de.scrollWidth > de.clientWidth + 1) add('page', document.body, { width: de.clientWidth, needs: de.scrollWidth });
  // multirow: a bar with its controls on more than one row, always an error
  const bars = [...root.querySelectorAll('[role="toolbar"], [role="menubar"], .plx-action-bar, .plx-command-bar__row, .plx-toolbar')];
  for (const bar of bars) {
    if (hiddenUp(bar)) continue;
    const ctl = [...bar.querySelectorAll('button, a[href], input, select, [role="button"], [role="menuitem"], [role="combobox"], [role="tab"]')].filter((e) => !hiddenUp(e) && e.getClientRects().length && e.closest('[role="toolbar"], [role="menubar"], .plx-action-bar, .plx-command-bar__row, .plx-toolbar') === bar);
    if (ctl.length < 2) continue;
    const tops = ctl.map((e) => e.getBoundingClientRect()), minH = Math.min(...tops.map((r) => r.height));
    const rows = tops.reduce((n, r) => (n.some((t) => Math.abs(t - r.top) < minH / 2) ? n : n.concat(r.top)), []).length;
    if (rows > 1) add('multirow', bar, { rows, controls: ctl.length });
  }
  return out;
}

// ---- the run
(async () => {
  let puppeteer, lib;
  try { lib = require(path.join(ROOT, 'tests', 'lib.js')); puppeteer = true; } catch (e) { console.log('OVERFLOW_ERROR: needs puppeteer-core and Chrome (npm ci, CHROME_PATH): ' + e.message); process.exit(2); }
  const started = Date.now();
  const server = await lib.serve(+val('--port', 9631));
  const base = 'http://localhost:' + (server.address().port) + '/Plenix/';
  let browser;
  try { browser = await lib.launch(); } catch (e) { server.close(); console.log('OVERFLOW_ERROR: Chrome did not start: ' + e.message); process.exit(2); }
  const page = await browser.newPage();
  const errors = []; page.on('pageerror', (e) => errors.push(e.message));
  // the spec's pages, from its own navigation
  let routes = [];
  if (!has('--no-spec')) {
    await page.setViewport({ width: 1280, height: 900 });
    await page.goto(base + SPEC, { waitUntil: 'domcontentloaded' });
    await lib.ready(page, { timeout: 60000 }).catch(() => {});
    routes = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#/"]')].map((a) => a.getAttribute('href').slice(2)).filter((r) => r.split('/').length >= 2 && !/\/v\//.test(r)))]);
  }
  const views = [].concat(has('--no-spec') ? [] : limited(filter(specViews(routes))), has('--no-apps') ? [] : limited(filter(appViews())));
  console.log('Overflow check: ' + views.length + ' page views (' + routes.length + ' spec pages, ' + (has('--no-apps') ? 0 : APPS.length) + ' apps)');
  const found = [], pictures = {}, failedViews = [];
  let n = 0;
  for (const v of views) {
    n++;
    try {
      await page.goto('about:blank');
      await page.setViewport({ width: v.width, height: 900, deviceScaleFactor: v.scale ? 2 : 1 });
      await page.goto(base + v.url, { waitUntil: 'domcontentloaded' });
      await lib.ready(page, { timeout: 20000 }).catch(() => {});
      if (v.dir === 'rtl') await page.evaluate(() => { document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ar'); });
      if (v.pane) await page.evaluate((w) => { const s = document.createElement('style'); s.id = 'plx-overflow-pane'; s.textContent = 'html body .plx-nav-pane.plx-nav-pane.plx-nav-pane, html body .plx-shell-nav.plx-shell-nav, html body .plx-side-panel.plx-side-panel.plx-side-panel, html body .plx-secondary-pane.plx-secondary-pane.plx-secondary-pane{inline-size:' + w + 'px;min-inline-size:0;max-inline-size:' + w + 'px;}'; document.head.appendChild(s); }, v.pane);
      await new Promise((r) => setTimeout(r, 350));
      const hits = await page.evaluate(inPage, {});
      for (const h of hits) {
        const entry = ALLOW.find((a) => (!a.kind || a.kind === h.kind) && v.url.includes(a.page) && h.selector.includes(a.selector));
        if (entry) { entry.hid++; continue; }
        const f = Object.assign({}, h, { url: v.url, view: v.label, dir: v.dir, error: h.kind !== 'cut' || h.reveal === 'none' });
        found.push(f);
        const key = h.block + '|' + h.kind + '|' + (h.reveal || '');
        if (PICTURES > 0 && (pictures[key] = pictures[key] || []).length < PICTURES && h.rect.w > 0 && h.rect.h > 0) {
          try { const shot = await page.screenshot({ encoding: 'base64', clip: { x: Math.max(0, h.rect.x - 8), y: Math.max(0, h.rect.y - 8), width: Math.min(560, h.rect.w + 16), height: Math.min(200, h.rect.h + 16) } }); pictures[key].push({ shot, where: v.url + ' · ' + v.label + ' · ' + v.dir }); f.picture = key + '#' + (pictures[key].length - 1); } catch (e) { /* off screen: no picture */ }
        }
      }
    } catch (e) { failedViews.push(v.url + ' · ' + v.label + ' · ' + v.dir + ': ' + String(e.message).split('\n')[0]); }
    if (n % 25 === 0 || n === views.length) console.log('  ' + n + '/' + views.length + ' views, ' + found.length + ' findings so far, ' + Math.round((Date.now() - started) / 1000) + 's');
  }
  await browser.close(); server.close();
  const seconds = Math.round((Date.now() - started) / 1000);

  // ---- the report: by component kind, then by finding; the errors before the listed cases
  const group = {};
  for (const f of found) { const g = (group[f.block] = group[f.block] || {}); const k = f.kind + (f.kind === 'cut' ? (f.reveal === 'none' ? ' (no way to read the text)' : ' (the text is revealed: for a look)') : ''); const items = (g[k] = g[k] || { error: f.error, places: new Map(), examples: [] }); const key = f.selector + '|' + f.text; if (!items.places.has(key)) { items.places.set(key, { selector: f.selector, text: f.text, seen: [], picture: f.picture }); } const place = items.places.get(key); if (place.seen.length < 6) place.seen.push(f.url + ' · ' + f.view + ' · ' + f.dir); else place.more = (place.more || 0) + 1; }
  const errorCount = found.filter((f) => f.error).length, lookCount = found.length - errorCount;
  const json = { ranAt: new Date().toISOString(), seconds, views: views.length, specPages: routes.length, errors: errorCount, forALook: lookCount, failedViews, pageErrors: [...new Set(errors)].slice(0, 20),
    allowList: ALLOW.map((a) => ({ selector: a.selector, page: a.page, kind: a.kind || null, reason: a.reason, hid: a.hid })),
    kinds: Object.keys(group).sort().map((b) => ({ kind: b, findings: Object.keys(group[b]).map((k) => ({ finding: k, error: group[b][k].error, places: [...group[b][k].places.values()].map((p) => ({ selector: p.selector, text: p.text, seen: p.seen, more: p.more || 0 })) })) })) };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const html = ['<!doctype html><meta charset="utf-8"><title>Plenix overflow report</title><style>body{font:14px system-ui;margin:24px;max-width:1100px}h1{font-size:20px}h2{font-size:17px;margin-block:24px 8px;border-block-end:1px solid #bbb}h3{font-size:14px;margin-block:12px 4px}.err{color:#a12}.look{color:#555}code{background:#f0f0f0;padding:0 3px}li{margin-block:4px}img{display:block;border:1px solid #ccc;margin-block:4px;max-inline-size:100%}</style>',
    '<h1>Plenix overflow report</h1>',
    '<p>Run on ' + esc(json.ranAt) + '. <b>Run time: ' + Math.floor(seconds / 60) + ' min ' + (seconds % 60) + ' s</b> for ' + views.length + ' page views (' + routes.length + ' spec pages, ' + (has('--no-apps') ? 0 : APPS.length) + ' apps). <b class="err">' + errorCount + ' errors</b>, <span class="look">' + lookCount + ' cut texts that have a reveal, for a look</span>.</p>',
    failedViews.length ? '<p class="err">' + failedViews.length + ' views could not be opened: ' + esc(failedViews.slice(0, 5).join(' | ')) + '</p>' : '']
    .concat(Object.keys(group).sort().map((b) => '<h2>' + esc(b) + '</h2>' + Object.keys(group[b]).sort((a, c) => Number(group[b][c].error) - Number(group[b][a].error) || a.localeCompare(c)).map((k) => { const g = group[b][k]; return '<h3 class="' + (g.error ? 'err' : 'look') + '">' + esc(k) + ' · ' + g.places.size + ' place' + (g.places.size === 1 ? '' : 's') + '</h3><ul>' + [...g.places.values()].slice(0, 12).map((p) => { const pic = p.picture ? pictures[p.picture.split('#')[0]][+p.picture.split('#')[1]] : null; return '<li><code>' + esc(p.selector) + '</code>' + (p.text ? ' “' + esc(p.text) + '”' : '') + '<br><small>' + esc(p.seen.join(' ; ')) + (p.more ? ' and ' + p.more + ' more' : '') + '</small>' + (pic ? '<img alt="" src="data:image/png;base64,' + pic.shot + '">' : '') + '</li>'; }).join('') + (g.places.size > 12 ? '<li>… and ' + (g.places.size - 12) + ' more places in the JSON</li>' : '') + '</ul>'; }).join('')))
    .concat(['<h2>The allow-list (tools/overflow-allow.json)</h2>', ALLOW.length ? '<ul>' + ALLOW.map((a) => '<li><code>' + esc(a.selector) + '</code> on “' + esc(a.page) + '”' + (a.kind ? ' (' + a.kind + ')' : '') + ': ' + esc(a.reason) + ' <b>' + (a.hid ? 'hid ' + a.hid + ' place' + (a.hid === 1 ? '' : 's') : 'hid nothing: remove it') + '</b></li>').join('') + '</ul>' : '<p>No entries.</p>', json.pageErrors.length ? '<h2>Script errors seen while running</h2><ul>' + json.pageErrors.map((e) => '<li>' + esc(e) + '</li>').join('') + '</ul>' : '']);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'overflow-report.html'), html.join('\n'));
  fs.writeFileSync(path.join(OUT, 'overflow-report.json'), JSON.stringify(json, null, 2) + '\n');
  console.log('Report: ' + path.join(OUT, 'overflow-report.html'));
  console.log('Run time: ' + Math.floor(seconds / 60) + ' min ' + (seconds % 60) + ' s for ' + views.length + ' views; ' + errorCount + ' errors, ' + lookCount + ' for a look' + (failedViews.length ? '; ' + failedViews.length + ' views could not be opened' : ''));
  const stale = ALLOW.filter((a) => !a.hid);
  if (stale.length) console.log('Allow-list entries that hid nothing (remove them): ' + stale.map((a) => a.selector).join(', '));
  console.log(errorCount ? 'OVERFLOW_FAIL (' + errorCount + ')' : 'OVERFLOW_OK');
  process.exitCode = errorCount ? 1 : 0;
})().catch((e) => { console.log('OVERFLOW_ERROR: ' + (e && e.message)); process.exitCode = 2; });
