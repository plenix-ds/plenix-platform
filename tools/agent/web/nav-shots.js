// screenshots of list-detail at 390px and the guard dialog; checks the scroll restoration
const path = require('path');
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const OUT = __dirname;
(async () => {
  const server = await serve(8861);
  const browser = await launch();
  const B = 'http://127.0.0.1:8861/Plenix/';
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 800 });
  await page.goto(B + 'messages/index.html', { waitUntil: 'load' }); await sleep(600);
  await page.screenshot({ path: path.join(OUT, 'n-list.png') });
  await page.evaluate(() => document.querySelectorAll('.plx-secondary-pane__body button')[1].click()); await sleep(500);
  await page.screenshot({ path: path.join(OUT, 'n-detail.png') });
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(B + 'notes/index.html#/note/1', { waitUntil: 'load' }); await sleep(600);
  await page.focus('textarea'); await page.keyboard.type(' x');
  await page.evaluate(() => document.querySelectorAll('.plx-secondary-pane__body button')[2].click()); await sleep(500);
  await page.screenshot({ path: path.join(OUT, 'n-guard.png') });
  await page.evaluate(() => [...document.querySelectorAll('[role="alertdialog"] button')].find((b) => b.innerText.trim() === 'Leave').click()); await sleep(300);
  // scroll restoration
  await page.setViewport({ width: 1280, height: 400 });
  await page.evaluate(() => { const b = document.querySelector('.plx-secondary-pane__body'); b.scrollTop = 60; b.dispatchEvent(new Event('scroll')); }); await sleep(300);
  const st = await page.evaluate(() => localStorage.getItem('plenix.notes.view'));
  await page.goto(B + 'notes/index.html', { waitUntil: 'load' }); await sleep(600);
  const top = await page.evaluate(() => document.querySelector('.plx-secondary-pane__body').scrollTop);
  console.log('stored', st, 'restored scrollTop', top);
  await browser.close(); server.close();
})();
