const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8863, B = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  for (const off of [false, true]) for (const url of ['dam/settings-system.html', 'dam/settings-myaccount.html#preferences', 'dam/settings-myaccount.html']) {
    const p = await browser.newPage(); await p.setViewport({ width: 800, height: 460 });
    await p.goto(B + url, { waitUntil: 'networkidle0' }); await sleep(800);
    if (off) await p.addStyleTag({ content: '*{scroll-padding:0 !important}' });
    let seen = 0; const hidden = [], partly = [];
    for (let i = 0; i < 80; i++) {
      await p.keyboard.press('Tab'); await sleep(20);
      const r = await p.evaluate(() => {
        const a = document.activeElement; if (!a || a === document.body) return null;
        const bar = [...document.querySelectorAll('.plx-action-bar')].find((b) => b.offsetParent && b.getBoundingClientRect().top < innerHeight); if (!bar || bar.contains(a)) return null;
        const ar = a.getBoundingClientRect(), br = bar.getBoundingClientRect(); if (ar.height > 200) return null;
        return { n: a.tagName + '.' + String(a.className).split(' ')[0], whole: ar.top >= br.top - 0.5 && ar.bottom <= br.bottom + 0.5, part: ar.bottom > br.top + 0.5 && ar.top < br.bottom };
      });
      if (r) { seen++; if (r.whole) hidden.push(r.n); else if (r.part) partly.push(r.n); }
    }
    console.log((off ? 'WITHOUT scroll-padding ' : 'with scroll-padding    ') + url + ': ' + seen + ' focus stops with a bar in view; entirely hidden ' + hidden.length + ', partly ' + partly.length + (hidden.length ? ' e.g. ' + hidden.slice(0, 2).join(', ') : ''));
    await p.close();
  }
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
