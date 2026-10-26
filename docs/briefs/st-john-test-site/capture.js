/* St. John the Beloved test site: the review page's pictures. Opens each page of the site at 1440 × 900 and saves a
   picture of it (shots/<page id>.png), plus a phone-width picture of the dashboard. Usage, from the repository root:
     node docs/briefs/st-john-test-site/capture.js            every page
     node docs/briefs/st-john-test-site/capture.js home members   only these pages */
const path = require('path');
const fs = require('fs');
const ROOT = path.resolve(__dirname, '..', '..', '..');
const { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const site = require(path.join(ROOT, 'tests', 'site.js'));
const OUT = path.join(__dirname, 'shots');
const only = process.argv.slice(2);
const PORT = 9661;
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const server = await serve(PORT); let browser;
  try {
    browser = await launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    for (const p of site.pages().filter((x) => !only.length || only.includes(x.id))) {
      await page.goto('about:blank');
      await page.goto('http://127.0.0.1:' + PORT + '/Plenix/' + site.url(p.id), { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(OUT, p.id + '.png') });
      console.log('shot ' + p.id);
    }
    if (!only.length || only.includes('phone')) {
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
      await page.goto('about:blank');
      await page.goto('http://127.0.0.1:' + PORT + '/Plenix/' + site.url('home'), { waitUntil: 'networkidle0' });
      await new Promise((r) => setTimeout(r, 1200));
      await page.screenshot({ path: path.join(OUT, 'phone-home.png') });
      console.log('shot phone-home');
    }
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
