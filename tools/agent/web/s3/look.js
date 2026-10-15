// a look at the Narrow forms: search view and the side panel sheet (files), at 375px with touch
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const OUT = __dirname + '/';
(async () => {
  const PORT = 8971, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await page.setViewport({ width: 375, height: 760, hasTouch: true, isMobile: true });
  await page.goto(BASE + 'files/index.html', { waitUntil: 'networkidle0' }); await sleep(800);
  const hl = await page.evaluate(() => history.length);
  await page.click('.plx-app-header__search-toggle'); await sleep(400);
  const r1 = await page.evaluate(() => ({ view: !!document.querySelector('.plx-search-view'), focus: document.activeElement && document.activeElement.tagName, hl: history.length, st: history.state }));
  await page.keyboard.type('plan'); await sleep(200);
  await page.screenshot({ path: OUT + 'search-view.png' });
  await page.goBack(); await sleep(400);
  const r2 = await page.evaluate(() => ({ view: !!document.querySelector('.plx-search-view'), focus: document.activeElement && (document.activeElement.getAttribute('aria-label') || document.activeElement.tagName) }));
  await page.click('.plx-app-header__search-toggle'); await sleep(300);
  await page.keyboard.press('Escape'); await sleep(400);
  const r3 = await page.evaluate(() => ({ view: !!document.querySelector('.plx-search-view'), hl: history.length, url: location.href }));
  console.log('history before', hl, 'open', JSON.stringify(r1), 'after back', JSON.stringify(r2), 'after escape', JSON.stringify(r3));
  // the side panel: open it from its rail
  await page.goto(BASE + 'files/index.html#/file/1', { waitUntil: 'networkidle0' }); await sleep(800);
  if (true) {
    const s = await page.evaluate(() => { const el = document.querySelector('.plx-sheet'); if (!el) return null; const r = el.getBoundingClientRect(); return { top: r.top, h: r.height, title: el.querySelector('.plx-sheet__title').textContent, focus: document.activeElement.className }; });
    console.log('sheet', JSON.stringify(s));
    await page.screenshot({ path: OUT + 'sheet-medium.png' });
    await page.click('.plx-sheet__grabber'); await sleep(300);
    console.log('after grabber', await page.evaluate(() => document.querySelector('.plx-sheet').className));
    await page.screenshot({ path: OUT + 'sheet-large.png' });
    await page.keyboard.press('Escape'); await sleep(300);
    console.log('after escape', await page.evaluate(() => ({ sheet: !!document.querySelector('.plx-sheet'), focus: document.activeElement.getAttribute('aria-label') })));
  } else console.log('no Expand panel');
  console.log('errors', errs);
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
