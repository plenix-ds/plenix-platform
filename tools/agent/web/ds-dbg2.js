const path = require('path');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(path.join(ROOT, 'tests/lib.js'));
const PORT = 8877, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch(); const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(BASE + 'platform/design-system/index.html#/data-display/data-grid', { waitUntil: 'networkidle0' }); await sleep(3000);
  console.log(await page.evaluate(() => { const g = Array.from(document.querySelectorAll('.plx-data-grid')).find((x) => x.offsetParent && x.getBoundingClientRect().width < 5); if (!g) return 'none'; const out = []; let e = g.parentElement; for (let i = 0; i < 8 && e; i++, e = e.parentElement) { const cs = getComputedStyle(e); out.push(e.tagName + '.' + String(e.className).slice(0, 80) + ' display=' + cs.display + ' w=' + Math.round(e.getBoundingClientRect().width) + ' ' + cs.width + ' jc=' + cs.justifyContent + ' ai=' + cs.alignItems); } return out.join('\n'); }));
  await browser.close(); server.close();
})();
