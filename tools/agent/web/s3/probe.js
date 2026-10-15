// what limits the tag × and chip targets with touch
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
(async () => {
  const PORT = 8974, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  for (const [url, sel] of [['dam/index.html', '.plx-tag__remove']]) {
    await page.goto(BASE + (url.startsWith('design') ? 'platform/' + url : url), { waitUntil: 'networkidle0' }); await sleep(1200);
    const r = await page.evaluate((sel) => {
      const out = [];
      for (const el of [...document.querySelectorAll(sel)].slice(0, 3)) {
        el.scrollIntoView({ block: 'center' });
        const b = el.getBoundingClientRect(), cx = b.left + b.width / 2, cy = b.top + b.height / 2;
        const probe = (x, y) => { const e = document.elementFromPoint(x, y); return e ? e.tagName.toLowerCase() + '.' + String(e.className) + ' [' + (e.getAttribute('aria-label') || e.textContent.slice(0, 15)) + '] ' + JSON.stringify(e.getBoundingClientRect()) : null; };
        out.push({ text: el.getAttribute('aria-label') || el.textContent, box: [Math.round(b.width), Math.round(b.height)], parent: el.parentElement.className, gp: el.parentElement.parentElement.className,
          left: probe(cx - 20, cy), right: probe(cx + 20, cy), up: probe(cx, cy - 20), down: probe(cx, cy + 20), gap: getComputedStyle(el.closest('.plx-tag-list') || el.parentElement).columnGap });
      }
      return out;
    }, sel);
    console.log(url, sel, JSON.stringify(r, null, 0));
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
