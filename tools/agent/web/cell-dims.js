const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8941, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  for (const h of ['', '#/implementation/react', '#/actions/button']) {
    await page.goto(BASE + 'platform/design-system/' + h, { waitUntil: 'networkidle0' }); await sleep(1500);
    console.log(h, await page.evaluate(() => [...document.querySelectorAll('.plx-data-table__portal > a.plx-text--link')].slice(0, 4).map((a) => {
      const c = a.closest('.tabulator-cell'), r = c.getBoundingClientRect(), cs = getComputedStyle(c);
      return Math.round(r.width) + 'x' + Math.round(r.height) + ' ov=' + cs.overflow + ' pos=' + cs.position + ' pad=' + cs.paddingTop + ' density=' + (a.closest('[data-plx-density]') || {}).dataset?.plxDensity + ' iact=' + document.documentElement.dataset.plxInteraction;
    })));
  }
  await browser.close(); server.close();
})();
