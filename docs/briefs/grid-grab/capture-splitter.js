/* #217: the nav pane splitter (8px, unchanged) with the 24px circle WCAG 2.5.8's spacing exception draws around it, and
   the Collapse button beside it, from one checkout. The shading is drawn only for the picture.
   Usage: node docs/briefs/grid-grab/capture-splitter.js <checkout root> <port> <name> */
const path = require('path'), fs = require('fs');
const [root, port, name] = process.argv.slice(2);
const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
(async () => {
  const server = await serve(+port); let browser; let facts;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + port + '/Plenix/platform/design-system/index.html#/data-display/data-grid', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-panel-splitter', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    facts = await page.evaluate(() => {
      const s = document.querySelector('.plx-panel-splitter').getBoundingClientRect(), b = [...document.querySelectorAll('button')].find((x) => x.getAttribute('aria-label') === 'Collapse sidebar').getBoundingClientRect();
      const cx = s.left + s.width / 2, cy = b.top + b.height / 2;
      const add = (style) => { const o = document.createElement('div'); Object.assign(o.style, { position: 'fixed', zIndex: 99999, pointerEvents: 'none' }, style); document.body.appendChild(o); };
      add({ left: s.left + 'px', top: (b.top - 40) + 'px', width: s.width + 'px', height: (b.height + 80) + 'px', background: '#18803855', outline: '1px solid #188038' });
      add({ left: (cx - 12) + 'px', top: (cy - 12) + 'px', width: '24px', height: '24px', borderRadius: '50%', outline: '2px dashed #d93025' });
      add({ left: b.left + 'px', top: b.top + 'px', width: b.width + 'px', height: b.height + 'px', background: '#1a73e855', outline: '1px solid #1a73e8' });
      return { gap: +(s.left - b.right).toFixed(1), fromCenter: +(cx - b.right).toFixed(1), clip: { x: s.left - 110, y: b.top - 40, width: 200, height: b.height + 80 } };
    });
    await page.screenshot({ path: path.join(__dirname, name + '-splitter.png'), clip: facts.clip });
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(name, 'button edge to splitter', facts.gap + 'px; to its center', facts.fromCenter + 'px (the circle needs 12)');
})().catch((e) => { console.error(e); process.exit(1); });
