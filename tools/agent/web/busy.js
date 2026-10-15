const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8944, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  await page.goto(BASE + 'platform/design-system/#/navigation/application-header', { waitUntil: 'networkidle0' }); await sleep(2000);
  const r = await page.evaluate(() => new Promise((res) => {
    const counts = {}; const mo = new MutationObserver((ms) => ms.forEach((m) => { const t = m.target.nodeType === 1 ? m.target : m.target.parentElement; const k = (t.className || t.tagName).toString().split(' ')[0] + ':' + m.type + ':' + (m.attributeName || ''); counts[k] = (counts[k] || 0) + 1; }));
    mo.observe(document.body, { attributes: true, childList: true, subtree: true, characterData: true });
    setTimeout(() => { mo.disconnect(); res(Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10)); }, 2000);
  }));
  console.log(JSON.stringify(r));
  const t0 = Date.now(); const n = await page.evaluate(() => { let n = 0; for (const el of document.querySelectorAll('button, a[href]')) { el.scrollIntoView({ block: 'center' }); const b = el.getBoundingClientRect(); document.elementFromPoint(b.left + 1, b.top + 1); n++; } return n; });
  console.log('scroll loop', n, (Date.now() - t0) + 'ms');
  await browser.close(); server.close();
})();
