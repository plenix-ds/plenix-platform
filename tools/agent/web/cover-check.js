// does any link extension cover another target? (touch emulation, 1280 and 320 wide)
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8942, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const URLS = ['platform/design-system/', 'platform/design-system/#/implementation/react', 'platform/design-system/#/actions/button', 'platform/design-system/#/navigation/breadcrumbs', 'platform/design-system/#/navigation/tabs'];
(async () => {
  const server = await serve(PORT); const browser = await launch();
  for (const W of [1280, 320]) {
    const page = await browser.newPage(); await page.setViewport({ width: W, height: 900, hasTouch: true });
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
    for (const u of URLS) {
      await page.goto(BASE + u, { waitUntil: 'networkidle0' }); await sleep(1500);
      const r = await page.evaluate(() => {
        const SEL = 'a[href], button, input, select, textarea, [role="tab"], [role="button"], [tabindex]:not([tabindex="-1"])';
        const ext = '.plx-breadcrumbs__link, .plx-data-table__portal>a.plx-text--link';
        const bad = [];
        for (const el of document.querySelectorAll(SEL)) {
          if (!el.offsetParent) continue;
          el.scrollIntoView({ block: 'center' });
          const b = el.getBoundingClientRect(); if (b.width < 2 || b.height < 2) continue;
          const pts = [[b.left + b.width / 2, b.top + b.height / 2], [b.left + 2, b.top + 2], [b.right - 2, b.bottom - 2]];
          for (const [x, y] of pts) {
            const hit = document.elementFromPoint(x, y); const owner = hit && hit.closest(ext);
            if (owner && owner !== el && !el.contains(owner) && !owner.contains(el)) { bad.push((el.className || el.tagName) + ' "' + (el.textContent || '').trim().slice(0, 20) + '" under ' + owner.textContent.trim().slice(0, 20)); break; }
          }
        }
        const bc = [...document.querySelectorAll('.plx-breadcrumbs__list')].map((l) => Math.round(l.getBoundingClientRect().height));
        return { bad: bad.slice(0, 6), n: bad.length, breadcrumbHeights: bc };
      });
      console.log(W, u, JSON.stringify(r));
    }
    await page.close();
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
