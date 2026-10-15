// where the standalone text links sit (touch emulation): their ancestors and the room around them
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = +process.env.P || 8940, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const routes = (process.argv[2] || '#/,#/implementation/react,#/actions/button,#/content/text').split(',');
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500);
  for (const r of routes) {
    await page.evaluate((h) => { location.hash = h; }, r); await sleep(1200);
    const out = await page.evaluate(() => {
      const cls = (el) => el.tagName.toLowerCase() + (typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.') : '');
      const groups = {};
      for (const a of document.querySelectorAll('a.plx-text--link')) {
        if (!a.offsetParent) continue;
        const own = [...a.parentElement.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (own) continue;
        const chain = []; for (let p = a.parentElement, i = 0; p && i < 4; p = p.parentElement, i++) chain.push(cls(p));
        const k = chain.join(' < ');
        const r = a.getBoundingClientRect(), pr = a.parentElement.getBoundingClientRect();
        (groups[k] = groups[k] || { n: 0, ex: [] }).n++;
        if (groups[k].ex.length < 2) groups[k].ex.push(a.textContent.slice(0, 20) + ' h' + Math.round(r.height) + ' parentH' + Math.round(pr.height) + ' siblings' + a.parentElement.children.length);
      }
      return groups;
    });
    console.log('== ' + r); Object.entries(out).forEach(([k, v]) => console.log('  ' + v.n + ' · ' + k + ' · ' + v.ex.join(' | ')));
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
