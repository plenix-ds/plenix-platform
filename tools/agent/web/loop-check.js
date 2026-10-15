// counts Tabs re-measurements (hidden toggles) over 2s on pages, to detect a resize ping-pong
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = +process.env.P || 8939, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const pages = (process.argv[2] || 'platform/design-system/,dam/settings-system.html').split(',');
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: +process.env.W || 1280, height: 900 });
  for (const u of pages) {
    const t0 = Date.now();
    await page.goto(BASE + u, { waitUntil: 'networkidle0', timeout: 60000 }); await sleep(1500);
    const n = await page.evaluate(() => new Promise((res) => {
      let n = 0; const mo = new MutationObserver((m) => { n += m.filter((x) => x.attributeName === 'hidden' && x.target.matches('.plx-tabs__tab')).length; });
      mo.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['hidden'] });
      setTimeout(() => { mo.disconnect(); res(n); }, 2000);
    }));
    console.log(u, 'hidden toggles in 2s:', n, 'tabs:', await page.evaluate(() => document.querySelectorAll('.plx-tabs').length), (Date.now() - t0) + 'ms');
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
