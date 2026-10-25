/* Owner review pictures (2026-10-24): (1) the outer frame and the frozen first column's line, today and two options;
   (2) the column menu part on hover, today and the proposed shade. Options are applied for the pictures only, with
   existing tokens. Usage: node docs/briefs/grid-lines-hover/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const PORT = 9521, URL = 'http://localhost:' + PORT + '/Plenix/docs/briefs/grid-and-table/index.html';
const EDGE = 'var(--plx-sys-data-grid-header-edge)', BORDER = 'var(--plx-sys-data-grid-border)';
const lines = (frame, frozen) => ['data-grid', 'table'].map((b) =>
  '.plx-' + b + '[data-plx-engine]{border-color:' + frame + ';}' +
  '.plx-' + b + '__grid-col.plx-' + b + '__grid-frozen + .plx-' + b + '__grid-col::before,' +
  '.plx-' + b + '__grid-cell.plx-' + b + '__grid-frozen + .plx-' + b + '__grid-cell::before{background-color:transparent;border-inline-start-color:' + frozen + ';}').join('');
const HOVER_DARK = '.plx-data-grid__grid-header-popup-button:hover{background-color:transparent;background-image:linear-gradient(var(--plx-ref-color-gray-200),var(--plx-ref-color-gray-400));}';
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 1000, deviceScaleFactor: 2 });
    const open = async (css) => { await page.goto(URL, { waitUntil: 'domcontentloaded' }); await page.waitForSelector('.plx-table [role=row]', { timeout: 60000 });
      await new Promise((r) => setTimeout(r, 1500)); if (css) await page.addStyleTag({ content: css }); await new Promise((r) => setTimeout(r, 300)); };
    const clipOf = (sel, h) => page.evaluate((sel, h) => { const e = document.querySelector(sel).getBoundingClientRect(); return { x: e.left - 8, y: e.top - 8, width: Math.min(e.width + 16, 720), height: Math.min(e.height + 16, h) }; }, sel, h);
    for (const [name, css] of [['today', ''], ['a', lines(EDGE, EDGE)], ['b', lines(EDGE, BORDER)]]) {
      await open(css);
      await page.screenshot({ path: path.join(__dirname, 'lines-' + name + '-grid.png'), clip: await clipOf('.plx-data-grid', 200) });
      await page.screenshot({ path: path.join(__dirname, 'lines-' + name + '-table.png'), clip: await clipOf('.plx-table', 200) });
    }
    for (const [name, css] of [['today', ''], ['dark', HOVER_DARK]]) {
      await open(css);
      const btn = await page.$('.plx-data-grid [aria-label="Kind column actions"]');
      await btn.hover(); await new Promise((r) => setTimeout(r, 400));
      const clip = await page.evaluate(() => { const c = document.querySelector('.plx-data-grid [aria-label="Kind column actions"]').closest('.plx-data-grid__grid-col').getBoundingClientRect(); return { x: c.left - 30, y: c.top - 6, width: c.width + 60, height: c.height + 12 }; });
      await page.screenshot({ path: path.join(__dirname, 'hover-' + name + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
