const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8945, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  page.on('console', (m) => { if (/error|warn/i.test(m.type())) console.log('console', m.type(), m.text().slice(0, 200)); });
  page.on('pageerror', (e) => console.log('pageerror', e.message.slice(0, 200)));
  await page.goto(BASE + 'platform/design-system/#/forms/fieldset', { waitUntil: 'networkidle0' }); await sleep(1500);
  await page.evaluate(() => { location.hash = '#/navigation/application-header'; }); await sleep(900);
  const t = (p) => Promise.race([p, sleep(8000).then(() => 'TIMEOUT')]);
  console.log('ping', await t(page.evaluate(() => 1 + 1)));
  // scroll each target into view, then idle a bit
  console.log('scroll', await t(page.evaluate(() => { let n = 0; for (const el of document.querySelectorAll('button, a[href], [role=tab]')) { el.scrollIntoView({ block: 'center', inline: 'center' }); n++; } return n; })));
  await sleep(500);
  console.log('ping2', await t(page.evaluate(() => 1 + 1)));
  await browser.close(); server.close();
})();
