// Messages at Narrow: one back control while a conversation shows; the list's parent row as before
const path = require('path');
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = +process.env.P || 8938, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 375, height: 700 });
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  const backs = () => page.evaluate(() => ({
    rows: [...document.querySelectorAll('.plx-nav-pane-parent button, .plx-secondary-pane-back button')].filter((b) => b.offsetParent).map((b) => b.textContent.trim()),
    focus: document.activeElement && (document.activeElement.textContent || '').trim().slice(0, 30), hash: location.hash }));
  await page.goto(BASE + 'messages/index.html#/', { waitUntil: 'networkidle0' }); await sleep(800);
  console.log('list', JSON.stringify(await backs()));
  // open the first conversation
  const first = await page.$('.plx-secondary-pane__body button, .plx-secondary-pane__body a');
  await first.click(); await sleep(500);
  console.log('detail', JSON.stringify(await backs()));
  await page.screenshot({ path: path.join(__dirname, 'back-detail.png') });
  await page.click('.plx-nav-pane-parent button'); await sleep(500);
  console.log('after row back', JSON.stringify(await backs()));
  await page.screenshot({ path: path.join(__dirname, 'back-list.png') });
  // the browser's Back from a detail
  const again = await page.$('.plx-secondary-pane__body button, .plx-secondary-pane__body a');
  await again.click(); await sleep(400); await page.goBack(); await sleep(500);
  console.log('after browser back', JSON.stringify(await backs()));
  // the row now opens the pane
  await page.click('.plx-nav-pane-parent button'); await sleep(400);
  console.log('pane screen', await page.evaluate(() => !!document.querySelector('.plx-nav-pane--screen')));
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
