/* #276 / #274 pictures: the 360px side panel (stage.html) today and with each SegmentedControl option applied for the
   picture only (shrink and truncate; wrap to rows), plus the Select version and the CommandBar at that width.
   Usage: node docs/briefs/segmented-narrow/capture.js */
const path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve, launch } = require(path.join(ROOT, 'tests', 'lib.js'));
const OUT = __dirname, PORT = 9485;
(async () => {
  const server = await serve(PORT); let browser; const facts = {};
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 900, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/segmented-narrow/stage.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-segmented', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1200));
    const css = (t) => page.evaluate((t) => { let s = document.getElementById('rv-style'); if (!s) { s = document.createElement('style'); s.id = 'rv-style'; document.head.appendChild(s); } s.textContent = t; }, t);
    const shot = async (file, sel) => { await new Promise((r) => setTimeout(r, 300));
      const c = await page.evaluate((sel) => { const p = document.getElementById('stage').getBoundingClientRect(), e = document.querySelector(sel).getBoundingClientRect();
        return { x: p.left, y: e.top - 12, width: p.width + 40, height: e.height + 24 }; }, sel);
      await page.screenshot({ path: path.join(OUT, file), clip: c }); };
    facts.today = await page.evaluate(() => { const s = document.querySelector('.plx-segmented').getBoundingClientRect(), card = document.querySelector('.plx-panel, [class*="plx-panel"]').getBoundingClientRect(); return { segmentEnd: Math.round(s.right - card.left), panelEnd: Math.round(card.width) }; });
    await shot('today.png', '#seg');
    await css('#seg .plx-segmented{max-inline-size:100%;} #seg .plx-segmented > *{min-inline-size:0;flex:1 1 0;} #seg .plx-segmented > * *{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}');
    await shot('shrink.png', '#seg');
    await css('#seg .plx-segmented{flex-wrap:wrap;max-inline-size:100%;} #seg .plx-segmented > *{flex:1 1 auto;}');
    await shot('wrap.png', '#seg');
    await css('');
    await shot('select.png', '#select');
    await shot('commandbar.png', '#bar');
  } finally { if (browser) await browser.close(); server.close(); }
  console.log('captured', JSON.stringify(facts));
})().catch((e) => { console.error(e); process.exit(1); });
