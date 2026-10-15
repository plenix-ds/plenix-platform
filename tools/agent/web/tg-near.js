// what touches the spec splitter's 24px circle on #/actions/button (fine pointer)
const ROOT = 'D:/Documents/Projects/Projects_Applications/Plenix';
const { serve, launch, sleep } = require(ROOT + '/tests/lib.js');
(async () => {
  const server = await serve(8881);
  const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('http://127.0.0.1:8881/Plenix/platform/design-system/#/actions/button', { waitUntil: 'networkidle0' }); await sleep(1500);
  const r = await page.evaluate(() => {
    const s = document.querySelector('.plx-panel-splitter'); const b = s.getBoundingClientRect(); const cx = b.left + b.width / 2, cy = b.top + b.height / 2;
    const SEL = 'a[href], button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';
    const near = [];
    for (const el of document.querySelectorAll(SEL)) { if (el === s) continue; const o = el.getBoundingClientRect(); if (!o.width) continue; const nx = Math.max(o.left, Math.min(cx, o.right)), ny = Math.max(o.top, Math.min(cy, o.bottom)); if (Math.hypot(nx - cx, ny - cy) < 12) near.push(el.outerHTML.slice(0, 160) + ' @' + Math.round(o.left) + ',' + Math.round(o.top) + ' ' + Math.round(o.width) + 'x' + Math.round(o.height)); }
    return { splitter: [b.left, b.top, b.width, b.height, cx, cy], near };
  });
  console.log(JSON.stringify(r, null, 1));
  await browser.close(); server.close();
})();
