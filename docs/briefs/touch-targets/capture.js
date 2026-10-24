/* #217 review pictures: the DataGrid header's column resize handles and menu chevrons, and the nav pane's splitter,
   with their hit areas outlined (today, and the options' sizes). The outlines are drawn only for these pictures.
   Usage: node docs/briefs/touch-targets/capture.js */
const path = require('path'), fs = require('fs');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const OUT = __dirname, PORT = 9481;
(async () => {
  const server = await serve(PORT); let browser; const facts = {};
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + PORT + '/Plenix/platform/design-system/index.html#/data-display/data-grid', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-data-grid__grid-col-resize-handle', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    // outline boxes of a given size centered on each element (size 0 = the element's own box)
    const outline = (sel, size, color, label) => page.evaluate((sel, size, color, label) => {
      document.querySelectorAll('.rv-outline').forEach((n) => n.remove());
      const els = [...document.querySelectorAll(sel)].filter((e) => e.offsetParent).slice(0, 12);
      els.forEach((e) => { const r = e.getBoundingClientRect(), w = size ? Math.max(size, r.width) : r.width, h = size ? Math.max(size, r.height) : r.height;
        const o = document.createElement('div'); o.className = 'rv-outline';
        Object.assign(o.style, { position: 'fixed', left: (r.left + r.width / 2 - w / 2) + 'px', top: (r.top + r.height / 2 - h / 2) + 'px', width: w + 'px', height: h + 'px',
          outline: '2px dashed ' + color, background: color + '22', zIndex: 99999, pointerEvents: 'none' });
        document.body.appendChild(o); });
      return els.map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })[0];
    }, sel, size, color, label);
    const shoot = async (file, clip) => page.screenshot({ path: path.join(OUT, file), clip });
    // the header: scroll the first grid into view and hover a column so its options button shows
    const head = await page.evaluate(() => { const g = [...document.querySelectorAll('.plx-data-grid')].find((x) => x.offsetParent && x.querySelector('.plx-data-grid__grid-col-resize-handle'));
      g.scrollIntoView({ block: 'center' }); const h = g.querySelector('.plx-data-grid__grid-header').getBoundingClientRect(); return { x: h.left, y: h.top - 16, width: Math.min(h.width, 760), height: h.height + 32 }; });
    const col = await page.$$('.plx-data-grid__grid-header .plx-data-grid__grid-col.plx-data-grid__grid-sortable');
    if (col[1]) await col[1].hover();
    await new Promise((r) => setTimeout(r, 300));
    facts.resize = await outline('.plx-data-grid__grid-col-resize-handle', 0, '#d93025'); await shoot('resize-today.png', head);
    await outline('.plx-data-grid__grid-col-resize-handle', 24, '#188038'); await shoot('resize-24.png', head);
    facts.chevron = await outline('.plx-data-grid__menu-chevron', 0, '#d93025'); await shoot('chevron-today.png', head);
    await outline('.plx-data-grid__menu-chevron', 24, '#188038'); await shoot('chevron-24.png', head);
    await outline('.plx-data-grid__grid-header-popup-button', 0, '#1a73e8'); await shoot('chevron-button.png', head);
    // the nav pane's splitter
    await page.evaluate(() => { document.querySelectorAll('.rv-outline').forEach((n) => n.remove()); window.scrollTo(0, 0); });
    const sp = await page.evaluate(() => { const s = document.querySelector('.plx-panel-splitter'); const r = s.getBoundingClientRect(); return { x: Math.max(0, r.left - 120), y: r.top + 60, width: 240, height: 200 }; });
    facts.splitter = await outline('.plx-panel-splitter', 0, '#d93025'); await shoot('splitter-today.png', sp);
    await outline('.plx-panel-splitter', 24, '#188038'); await shoot('splitter-24.png', sp);
    await outline('.plx-panel-splitter', 44, '#188038'); await shoot('splitter-44.png', sp);
  } finally { if (browser) await browser.close(); server.close(); }
  fs.writeFileSync(path.join(OUT, 'facts.json'), JSON.stringify(facts, null, 1));
  console.log('captured', JSON.stringify(facts));
})().catch((e) => { console.error(e); process.exit(1); });
