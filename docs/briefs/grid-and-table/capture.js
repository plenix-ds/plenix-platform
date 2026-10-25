/* Screenshot of the DataGrid and Table sample page. Usage: node docs/briefs/grid-and-table/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
(async () => {
  const server = await serve(9497); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1300, height: 900, deviceScaleFactor: 1 });
    await page.goto('http://localhost:9497/Plenix/docs/briefs/grid-and-table/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-table [role=row]', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(__dirname, 'screenshot.png'), fullPage: true });
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('saved');
})().catch((e) => { console.error(e); process.exit(1); });
