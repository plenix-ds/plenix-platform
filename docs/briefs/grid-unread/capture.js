/* #287 pictures: stage.html today (the unread row above the headers) and options A, B and C (the row hidden for the
   picture only; the commands drawn with the CommandBar's own slots). Usage: node docs/briefs/grid-unread/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const OUT = __dirname, PORT = 9487;
const HIDE = '.plx-data-grid > .plx-button, .plx-data-grid > .plx-menu-anchor{display:none}';
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1100, height: 700, deviceScaleFactor: 2 });
    for (const [v, file, sel] of [['today', 'today', false], ['a', 'option-a', false], ['a', 'option-a-selected', true], ['b', 'option-b', false], ['c', 'option-c-selected', true]]) {
      await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/grid-unread/stage.html?v=' + v, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.plx-data-grid__grid-row', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1200));
      if (v !== 'today') await page.addStyleTag({ content: HIDE });
      if (!sel) await page.evaluate(() => { const clear = [...document.querySelectorAll('button')].find((b) => /selected/i.test(b.getAttribute('aria-label') || b.textContent)); if (clear && document.querySelector('[aria-selected="true"]')) clear.click(); });
      if (sel && v === 'c') { const row = await page.$('.plx-data-grid__grid-row:nth-child(2) [role="gridcell"]'); if (row) await row.click({ button: 'right' }); }
      await new Promise((r) => setTimeout(r, 500));
      const clip = await page.evaluate(() => { const s = document.getElementById('stage').getBoundingClientRect(); const menu = document.querySelector('[role="menu"]'); const m = menu ? menu.getBoundingClientRect() : { bottom: 0 };
        return { x: s.left, y: s.top, width: s.width, height: Math.max(Math.min(s.height, 360), m.bottom - s.top + 12) }; });
      await page.screenshot({ path: path.join(OUT, file + '.png'), clip });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('captured');
})().catch((e) => { console.error(e); process.exit(1); });
