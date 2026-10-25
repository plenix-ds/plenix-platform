/* The resize cursor during a drag, drawn in (a screenshot never shows the pointer): today the pointer leaves the thin
   handle while dragging and shows the column's own cursor (the grab hand); fixed, it keeps the resize arrows for the
   whole drag. Usage: node docs/briefs/grid-lines-hover/capture-cursor.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const HAND = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="26" viewBox="0 0 24 26"><path d="M8 11V4a1.5 1.5 0 013 0v6-2a1.5 1.5 0 013 0v2-1a1.5 1.5 0 013 0v2-1a1.5 1.5 0 013 0v7c0 4-3 7-7 7h-1c-3 0-5-2-6-4l-3-5a1.5 1.5 0 012.5-1.6L8 15z" fill="#fff" stroke="#000" stroke-width="1.3"/></svg>';
const RESIZE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 3h2v18h-2zM2 12l5-4v3h3v2H7v3zM22 12l-5 4v-3h-3v-2h3V8z" fill="#000" stroke="#fff" stroke-width="1"/></svg>';
(async () => {
  const server = await serve(9523); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 900, deviceScaleFactor: 2 });
    for (const [name, svg] of [['cursor-today', HAND], ['cursor-fixed', RESIZE]]) {
      await page.goto('http://localhost:9523/Plenix/docs/briefs/grid-and-table/index.html', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[aria-label="Resize Kind"]', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
      const clip = await page.evaluate((svg) => {
        const h = document.querySelector('[aria-label="Resize Kind"]').getBoundingClientRect(), col = document.querySelector('[aria-label="Resize Kind"]').closest('.plx-data-grid__grid-col').getBoundingClientRect();
        const add = (style, html) => { const o = document.createElement('div'); Object.assign(o.style, { position: 'fixed', zIndex: 99999, pointerEvents: 'none' }, style); if (html) o.innerHTML = html; document.body.appendChild(o); };
        add({ left: h.right + 'px', top: h.top + 'px', width: '1px', height: '160px', borderLeft: '2px dashed #1a73e8' });   // where the column edge is being dragged
        add({ left: (h.right + 26) + 'px', top: (h.top + 4) + 'px' }, svg);                                                  // the pointer, 26px past the handle
        return { x: col.left - 10, y: col.top - 10, width: col.width + 140, height: 120 };
      }, svg);
      await page.screenshot({ path: path.join(__dirname, name + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
