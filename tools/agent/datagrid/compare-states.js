// Every element inside a DataGrid or Table, before (Plenix-b0) and now (Plenix): about a hundred computed values, its
// ::before and ::after, and its box, in every state the batches touch. States: rest; each of the first three record rows
// hovered; the first row selected (its checkbox) and then hovered; a cell edited (double-click a name, else any cell);
// the first group collapsed and its header hovered; the body scrolled down and to the end; the grid hovered (scrollbars); touch (the interaction mode).
//   node tools/agent/datagrid/compare-states.js [--pages files,dam] [--states rest,hover] [--max 5]
// Pages: the applications that show grids, and every DataGrid and Table page of the spec (found from its sidebar once and
// kept in the scratch list tools/agent/datagrid/spec-pages.json).
process.env.TEST_TIMEOUT_MS = '86400000';
const fs = require('fs'), path = require('path'), http = require('http');
const { launch, sleep } = require('C:/Users/Administrator/Documents/Plenix/tests/lib.js');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const serve = (root, port) => new Promise((res) => { const s = http.createServer((q, r) => { const rel = decodeURIComponent(q.url.split('?')[0]); let f = path.join(root, rel.slice(8)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html'); if (!rel.startsWith('/Plenix/') || !fs.existsSync(f)) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(r); }); s.listen(port, '127.0.0.1', () => res(s)); });
const arg = (n) => { const i = process.argv.indexOf('--' + n); return i > 0 ? process.argv[i + 1] : null; };
const DS = 'platform/design-system/index.html#/';
const APPS = ['files/index.html', 'dam/index.html', 'dam/settings-system.html#fields', 'dam/settings-system.html#users', 'settings/index.html', 'projects/index.html'];
const LIST = path.join(__dirname, 'spec-pages.json');
const PROPS = ['display', 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'overflow-x', 'overflow-y', 'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
  'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
  'border-top-color', 'border-top-style', 'border-top-width', 'border-right-color', 'border-right-style', 'border-right-width', 'border-bottom-color', 'border-bottom-style', 'border-bottom-width',
  'border-left-color', 'border-left-style', 'border-left-width', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-left-radius', 'border-bottom-right-radius',
  'outline-color', 'outline-style', 'outline-width', 'outline-offset', 'background-color', 'background-image', 'background-position', 'background-size', 'background-repeat', 'color',
  'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'word-spacing', 'line-height', 'text-align', 'text-overflow', 'text-transform', 'white-space', 'overflow-wrap', 'vertical-align',
  'opacity', 'visibility', 'cursor', 'pointer-events', 'box-shadow', 'transform', 'transition-property', 'transition-duration', 'flex-basis', 'flex-grow', 'flex-shrink', 'flex-direction', 'flex-wrap',
  'align-items', 'align-self', 'align-content', 'justify-content', 'column-gap', 'row-gap', 'grid-template-columns', 'grid-template-rows', 'grid-column-start', 'grid-row-start', 'grid-row-end',
  'grid-auto-flow', 'grid-auto-columns', 'isolation', 'contain', 'container-type', 'user-select', 'accent-color', 'appearance', '-webkit-line-clamp', '-webkit-box-orient', 'animation-name',
  'anchor-name', 'scrollbar-width', 'touch-action', 'font-variant-numeric'];
const PSEUDO = ['content', 'display', 'position', 'top', 'right', 'bottom', 'left', 'width', 'height', 'z-index', 'background-color', 'pointer-events'];
// grid by grid (the outermost grids, named by their label and their order among grids of that label); each element's box
// relative to its grid, so a documentation table that changes above an example does not move the example's readings
const read = ([PROPS, PSEUDO]) => {
  const grids = [], seen = {}, r = (v) => Math.round(v * 10) / 10;
  for (const g of document.querySelectorAll('.plx-data-grid, .plx-table')) {
    if (g.parentElement.closest('.plx-data-grid, .plx-table')) continue;
    const label = (g.querySelector('[aria-label]') || g).getAttribute('aria-label') || '', key = label + ' #' + (seen[label] = (seen[label] || 0) + 1), at = g.getBoundingClientRect(), els = [];
    for (const e of [g, ...g.querySelectorAll('*')]) {
      const c = getComputedStyle(e), b = e.getBoundingClientRect(), name = typeof e.className === 'string' && e.className ? e.className.split(' ')[0] : e.tagName.toLowerCase();
      const vals = PROPS.map((p) => p + '=' + c.getPropertyValue(p));
      vals.push(c.display === 'contents' ? 'box=contents' : 'box=' + [r(b.x - at.x), r(b.y - at.y), r(b.width), r(b.height)].join(','));
      for (const ps of ['::before', '::after']) { const s = getComputedStyle(e, ps); if (s.content === 'none' || s.content === 'normal') { vals.push(ps + '=none'); continue; } vals.push(...PSEUDO.map((p) => ps + p + '=' + s.getPropertyValue(p))); }
      els.push([name, vals]);
    }
    grids.push({ key, text: g.textContent, els });
  }
  return grids;
};
const ROW = '[role="row"][data-plx-record]';
const STATES = {
  rest: async () => true,
  hover0: async (p) => hoverRow(p, 0), hover1: async (p) => hoverRow(p, 1), hover2: async (p) => hoverRow(p, 2),
  select: async (p) => { await p.mouse.move(0, 0); return p.evaluate((ROW) => { const c = [...document.querySelectorAll(ROW + ' input[type="checkbox"]')].find((x) => x.offsetParent); if (!c) return false; c.click(); return true; }, ROW); },
  selectHover: async (p) => hoverRow(p, 0),
  edit: async (p) => { await p.mouse.move(0, 0); await p.keyboard.press('Escape'); const cells = await p.$$('.plx-data-grid__cell--name[role="gridcell"]');
    for (const h of cells.slice(0, 3)) { try { await h.click({ count: 2 }); } catch (e) { continue; } await sleep(200); if (await p.$('.plx-data-grid__editor')) return true; } return false; },
  group: async (p) => { await p.keyboard.press('Escape'); await p.mouse.move(0, 0); const ok = await p.evaluate(() => { const c = [...document.querySelectorAll('[class*="__group-chevron"]')].find((x) => x.offsetParent && !x.closest('[class*="__sticky-groups"]')); if (!c) return false; c.click(); return true; }); return ok; },
  groupHover: async (p) => { const h = (await p.$$('[class*="__grid-group"][role="row"]'))[0]; if (!h) return false; try { await h.hover(); } catch (e) { return false; } return true; },
  scroll: async (p) => { await p.mouse.move(0, 0); return p.evaluate(() => { let any = false; for (const h of document.querySelectorAll('[class*="__grid-tableholder"]')) { if (h.scrollHeight > h.clientHeight || h.scrollWidth > h.clientWidth) { h.scrollTop = Math.round(h.scrollHeight / 3); h.scrollLeft = h.scrollWidth; any = true; } } return any; }); },
  gridHover: async (p) => { const h = (await p.$$('.plx-data-grid'))[0]; if (!h) return false; try { await h.hover(); } catch (e) { return false; } return true; },
  touch: async (p) => { await p.mouse.move(0, 0); return p.evaluate(() => { document.documentElement.setAttribute('data-plx-interaction', 'touch'); return !!document.querySelector('.plx-data-grid, .plx-table'); }); },
};
async function hoverRow(p, i) { const rows = []; for (const h of await p.$$(ROW)) if (await h.evaluate((e) => !!e.offsetParent && e.getBoundingClientRect().top > 0 && e.getBoundingClientRect().bottom < innerHeight)) rows.push(h); if (!rows[i]) return false; try { await rows[i].hover(); } catch (e) { return false; } return true; }

async function specPages(browser) {
  if (fs.existsSync(LIST)) return JSON.parse(fs.readFileSync(LIST, 'utf8'));
  const s = await serve('C:/Users/Administrator/Documents/Plenix', 9339), p = await browser.newPage();
  const found = new Set();
  for (const route of ['data-display/data-grid', 'data-display/table']) {
    await p.goto('http://127.0.0.1:9339/Plenix/' + DS + route, { waitUntil: 'load' }); await sleep(3000);
    for (const h of await p.evaluate(() => [...document.querySelectorAll('a[href*="#/"]')].map((a) => a.getAttribute('href')))) { const m = /#\/(data-display\/(data-grid|table)[^"]*)$/.exec(h); if (m) found.add(m[1]); }
  }
  // every page that shows a grid at all (the sortable, filterable and selectable table pages, badges in a grid…)
  for (const route of ['data-display/data-sortable-table', 'data-display/data-display-filterable-table', 'data-display/data-display-selectable-table', 'data-display/badge']) found.add(route);
  await p.close(); s.close();
  const list = [...found].sort().map((r) => DS + r); fs.writeFileSync(LIST, JSON.stringify(list, null, 1)); return list;
}

(async () => {
  const [a, b] = [await serve('C:/Users/Administrator/Documents/Plenix-b0', 9331), await serve('C:/Users/Administrator/Documents/Plenix', 9332)];
  const browser = await launch(); const pa = await browser.newPage(), pb = await browser.newPage();
  for (const p of [pa, pb]) await p.setViewport({ width: 1440, height: 1000 });
  const only = arg('pages'), want = arg('states') ? arg('states').split(',') : Object.keys(STATES), max = +(arg('max') || 4), agg = process.argv.includes('--agg') ? new Map() : null;
  let pages = APPS.concat(await specPages(browser)); if (only) pages = pages.filter((u) => only.split(',').some((x) => u.includes(x)));
  let diffs = 0, total = 0, bad = [];
  for (const url of pages) {
    const open = async (p, port) => { await p.bringToFront(); await p.goto('about:blank'); await p.goto('http://127.0.0.1:' + port + '/Plenix/' + url, { waitUntil: 'load' }); await sleep(3500); };
    await open(pa, 9331); await open(pb, 9332);
    const notes = [], reached = [], renamed = new Set(), skipped = new Set();
    for (const st of want) {
      const r1 = await (async () => { await pa.bringToFront(); const ok = await STATES[st](pa); await sleep(350); return ok ? pa.evaluate(read, [PROPS, PSEUDO]) : null; })();
      const r2 = await (async () => { await pb.bringToFront(); const ok = await STATES[st](pb); await sleep(350); return ok ? pb.evaluate(read, [PROPS, PSEUDO]) : null; })();
      if (!r1 && !r2) continue; reached.push(st);
      if (!r1 || !r2) { notes.push(st + ': state reached on one side only'); diffs++; continue; }
      let d = 0; const before = new Map(r1.map((g) => [g.key, g]));
      for (const g2 of r2) { const g1 = before.get(g2.key);
        if (!g1) { notes.push(st + ': grid ' + g2.key + ' only after'); d++; continue; }
        if (g1.text !== g2.text) { if (st === 'rest') { let k = 0; while (g1.text[k] === g2.text[k]) k++; skipped.add(g2.key + ' [' + g1.text.slice(Math.max(0, k - 20), k + 30) + ' | ' + g2.text.slice(Math.max(0, k - 20), k + 30) + ']'); } continue; }
        const x1 = g1.els, x2 = g2.els, n = Math.max(x1.length, x2.length);
        if (x1.length !== x2.length) notes.push(st + ' ' + g2.key + ': ' + x1.length + ' / ' + x2.length + ' elements');
      for (let i = 0; i < n; i++) {
        const x = x1[i], y = x2[i]; total++;
        if (!x || !y) { d++; continue; }
        const changed = x[1].filter((v, k) => v !== y[1][k]).map((v) => { const k = x[1].indexOf(v); return v + ' -> ' + (y[1][k] || '').split('=').slice(1).join('='); });
        if (changed.length) { if (agg) for (const c of changed) { const k = st.replace(/[0-9]+$/, "") + " " + y[0] + " " + c.replace(/box=.*/, "box"); agg.set(k, (agg.get(k) || 0) + 1); } if (d < max) notes.push(st + ' #' + i + ' ' + x[0] + (x[0] !== y[0] ? ' / ' + y[0] : '') + '\n      ' + changed.slice(0, 8).join('\n      ')); d++; }
        else if (x[0] !== y[0]) renamed.add(x[0] + ' -> ' + y[0]);
      } }
      diffs += d; if (d) notes.push(st + ': ' + d + ' elements differ');
    }
    if (notes.length) bad.push(url);
    console.log((notes.length ? 'DIFF ' : 'SAME ') + url + ' [' + reached.join(' ') + ']' + (notes.length ? '\n  ' + notes.join('\n  ') : '') + (renamed.size ? '\n  renamed, same values: ' + [...renamed].join(', ') : '') + (skipped.size ? '\n  not compared (its text differs): ' + [...skipped].join(', ') : ''));
  }
  if (agg) for (const [k, n] of [...agg].sort((a, b) => b[1] - a[1]).slice(0, +(arg('top') || 80))) console.log(String(n).padStart(6) + '  ' + k.slice(0, 220));
  console.log('total ' + total + ' element readings, ' + diffs + ' differ' + (bad.length ? '; pages: ' + bad.join(' ') : ''));
  await browser.close(); a.close(); b.close();
})().catch((e) => { console.error(e); process.exit(1); });
