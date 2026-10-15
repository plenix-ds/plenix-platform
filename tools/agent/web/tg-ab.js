// A/B: the design-system target findings with the current inventory.js and with the committed one (HEAD)
const fs = require('fs');
const { execSync } = require('child_process');
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(ROOT + '/tests/lib.js');
const src = fs.readFileSync(ROOT + '/tests/targets.test.js', 'utf8');
const fnSrc = src.slice(src.indexOf('function measure('), src.indexOf('\n(async () => {'));
const measure = new Function('return ' + fnSrc)();
const HEAD_INV = execSync('git -C "' + ROOT + '/platform/design-system" show HEAD:inventory.js').toString();
(async () => {
  const server = await serve(8879);
  const browser = await launch();
  for (const variant of ['current', 'head']) {
    for (const M of [{ mode: 'coarse', min: 44, spacing: false, width: 1280, height: 900 }, { mode: 'fine', min: 24, spacing: true, width: 1440, height: 1000 }]) {
      const page = await browser.newPage(); await page.setViewport({ width: M.width, height: M.height, hasTouch: M.mode === 'coarse' });
      if (M.mode === 'coarse') {
        const cdp = await page.target().createCDPSession();
        await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
        await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
      }
      await page.setRequestInterception(true);
      page.on('request', (r) => { if (variant === 'head' && /design-system\/inventory\.js/.test(r.url())) r.respond({ status: 200, contentType: 'text/javascript', body: HEAD_INV }); else r.continue(); });
      await page.goto('http://127.0.0.1:8879/Plenix/platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500);
      const out = [];
      out.push('home ' + (await page.evaluate(measure, M.min, M.spacing)).fail.length);
      for (const h of ['#/actions/button', '#/implementation/react']) { await page.evaluate((x) => { location.hash = x; }, h); await sleep(900); const r = await page.evaluate(measure, M.min, M.spacing); out.push(h + ' ' + r.fail.length + (M.mode === 'fine' ? ' ' + r.fail.join('|') : '')); }
      console.log(variant, M.mode, out.join(' · '));
      await page.close();
    }
  }
  await browser.close(); server.close();
})();
