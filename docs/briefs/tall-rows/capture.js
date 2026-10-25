/* #256 review pictures: a tall row in a real spec table (Dialog page, the platform names table), as it draws today
   (every cell in the middle) and with each option applied for the picture only (top-aligned cells; a code column wide
   enough not to wrap). Usage: node docs/briefs/tall-rows/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const OUT = __dirname, PORT = 9483;
(async () => {
  const server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + PORT + '/Plenix/platform/design-system/index.html#/overlays/dialog', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('code.plx-text--data', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    const clip = await page.evaluate(() => {
      const code = [...document.querySelectorAll('code.plx-text--data')].find((c) => c.textContent.trim() === 'plx-dialog');
      const table = code.closest('.plx-table'), row = code.closest('[role=row]');
      row.scrollIntoView({ block: 'center' });
      const t = table.getBoundingClientRect(), r = row.getBoundingClientRect();
      return { x: t.left, y: r.top - 40, width: Math.min(t.width, 1000), height: r.height + 80 };
    });
    const shot = async (file, css) => {
      await page.evaluate((css) => { let s = document.getElementById('rv-style'); if (!s) { s = document.createElement('style'); s.id = 'rv-style'; document.head.appendChild(s); } s.textContent = css; }, css);
      await new Promise((r) => setTimeout(r, 400));
      const c = await page.evaluate(() => { const code = [...document.querySelectorAll('code.plx-text--data')].find((x) => x.textContent.trim() === 'plx-dialog');
        const t = code.closest('.plx-table').getBoundingClientRect(), r = code.closest('[role=row]').getBoundingClientRect(); return { x: t.left, y: r.top - 40, width: Math.min(t.width, 1000), height: r.height + 80 }; });
      await page.screenshot({ path: path.join(OUT, file), clip: c });
    };
    await shot('today.png', '');
    await shot('top.png', '.plx-table__grid-cell{align-items:flex-start}');
    await shot('nowrap-code.png', '.plx-table__grid-cell code.plx-text--data{white-space:nowrap}.plx-table__grid-cell:has(> .plx-table__portal > code){min-width:max-content}');
    await shot('top-nowrap.png', '.plx-table__grid-cell{align-items:flex-start}.plx-table__grid-cell code.plx-text--data{white-space:nowrap}.plx-table__grid-cell:has(> .plx-table__portal > code){min-width:max-content}');
    console.log('captured', JSON.stringify(clip));
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
