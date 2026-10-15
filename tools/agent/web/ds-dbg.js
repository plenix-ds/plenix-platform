const path = require('path');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(path.join(ROOT, 'tests/lib.js'));
const PORT = 8876, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch(); const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warn') console.log('CONSOLE', m.text().slice(0, 300)); });
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(BASE + process.argv[2], { waitUntil: 'networkidle0' }); await sleep(3000);
  console.log(await page.evaluate(() => Array.from(document.querySelectorAll('.plx-data-table, .plx-table')).filter((g) => g.offsetParent).map((g) => (g.querySelector('.tabulator-row, .tabulator-placeholder, .plx-data-table__error') ? 'ok ' : 'NO ') + (g.querySelector('.tabulator') ? g.querySelector('.tabulator').getAttribute('aria-label') : 'no-tabulator') + ' ' + g.className + ' ' + Math.round(g.getBoundingClientRect().width) + 'x' + Math.round(g.getBoundingClientRect().height)).join('\n')));
  console.log(await page.evaluate(() => {
    const g = Array.from(document.querySelectorAll('.plx-data-table')).find((x) => x.offsetParent && !x.querySelector('.tabulator-row, .tabulator-placeholder, .plx-data-table__error'));
    if (!g) return 'none';
    const t = g.querySelector('.tabulator');
    return JSON.stringify({ rows: g.querySelectorAll('.tabulator-row').length, html: t ? t.innerHTML.slice(0, 900) : g.innerHTML.slice(0, 400) });
  }));
  if (process.argv[3]) await page.screenshot({ path: path.join(__dirname, process.argv[3]) });
  await browser.close(); server.close();
})();
