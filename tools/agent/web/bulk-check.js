const path = require('path');
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8943, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage();
  for (const w of [320, 1280]) {
    await page.setViewport({ width: w, height: 700 });
    await page.goto(BASE + 'dam/index.html', { waitUntil: 'networkidle0' }); await sleep(1000);
    const el = await page.$('.plx-bulk-actions');
    console.log(w, await page.evaluate(() => { const b = document.querySelector('.plx-bulk-actions'); const r = b.getBoundingClientRect(); const m = [...b.querySelectorAll('button')].map((x) => { const q = x.getBoundingClientRect(); return x.textContent.trim().slice(0, 14) + '@' + Math.round(q.left) + '..' + Math.round(q.right) + (x.closest('[inert]') ? '(inert)' : ''); }); return Math.round(r.left) + '..' + Math.round(r.right) + ' h' + Math.round(r.height) + ' ' + m.join(' | '); }));
    if (el) await el.screenshot({ path: path.join(__dirname, 'bulk-' + w + '.png') });
  }
  await browser.close(); server.close();
})();
