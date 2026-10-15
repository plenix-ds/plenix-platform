// checks the Tabs overflow at 320px on dam/settings-system and one DS page; screenshots to the scratchpad
const path = require('path');
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const OUT = __dirname;
const PORT = +process.env.P || 8937, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 320, height: 640 });
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  const info = () => page.evaluate(() => [...document.querySelectorAll('.plx-tabs')].map((t) => {
    const l = t.querySelector('.plx-tabs__tablist');
    return { shown: [...l.children].filter((b) => !b.hidden).map((b) => b.textContent + (b.getAttribute('aria-selected') === 'true' ? '*' : '')).join(','),
      hidden: [...l.children].filter((b) => b.hidden).length, more: !!t.querySelector(':scope > .plx-tabs__list .plx-tabs__more'), sw: l.scrollWidth, cw: l.clientWidth };
  }));
  await page.goto(BASE + 'dam/settings-system.html', { waitUntil: 'networkidle0' }); await sleep(800);
  console.log('settings-system', JSON.stringify(await info()));
  await page.screenshot({ path: path.join(OUT, 'tabs-320.png') });
  // keyboard: focus the selected tab, press End: the last tab must be shown, selected and focused
  await page.focus('.plx-tabs__tablist [role="tab"][aria-selected="true"]');
  await page.keyboard.press('End'); await sleep(100);
  console.log('after End', JSON.stringify(await info()), await page.evaluate(() => document.activeElement.textContent + ' ' + document.activeElement.getAttribute('aria-selected')));
  await page.keyboard.press('Home'); await sleep(100);
  console.log('after Home', JSON.stringify(await info()), await page.evaluate(() => document.activeElement.textContent));
  // More menu: open it and choose the first moved tab
  const more = await page.$('.plx-tabs__more');
  if (more) {
    await more.click(); await sleep(200);
    const items = await page.evaluate(() => [...document.querySelectorAll('.plx-menu [role="menuitem"]')].map((m) => m.textContent));
    console.log('menu', items);
    await page.keyboard.press('Enter'); await sleep(200);
    console.log('after menu', JSON.stringify(await info()), await page.evaluate(() => document.activeElement.textContent + ' ' + document.activeElement.getAttribute('role')));
    await page.screenshot({ path: path.join(OUT, 'tabs-320-b.png') });
  }
  await page.setViewport({ width: 1280, height: 800 }); await sleep(400);
  console.log('wide', JSON.stringify(await info()));
  await page.setViewport({ width: 320, height: 640 });
  await page.goto(BASE + 'platform/design-system/#/navigation/tabs', { waitUntil: 'networkidle0' }); await sleep(1500);
  console.log('ds tabs', JSON.stringify((await info()).slice(0, 4)));
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
