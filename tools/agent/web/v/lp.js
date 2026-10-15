const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8862, B = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const t = await browser.newPage(); await t.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await t.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  await t.goto(B + 'notes/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
  await t.evaluate(() => { window.__ev = []; ['pointerdown', 'pointerup', 'pointercancel', 'pointerleave', 'contextmenu', 'click', 'focusin', 'focusout', 'mouseover'].forEach((n) => document.addEventListener(n, (e) => { window.__ev.push(n + ':' + (e.pointerType || '') + ':' + (e.target.tagName || '')); }, true)); window.addEventListener('beforeunload', () => { console.log('unload'); }); });
  const sel = process.argv[2] || '.plx-app-header__item';
  const tip = await t.evaluate((sel) => { const w = [...document.querySelectorAll('.plx-tooltip')].filter((x) => x.querySelector('.plx-tooltip__bubble') && x.getBoundingClientRect().width > 0 && x.querySelector(sel)); const el = w[0]; const r = el.getBoundingClientRect(); el.id = 'probe'; return { x: r.left + r.width / 2, y: r.top + r.height / 2, n: w.length, label: el.textContent.slice(0, 40) }; }, sel);
  console.log(tip);
  const open = () => t.evaluate(() => { const w = document.getElementById('probe'); return w ? w.querySelector('.plx-tooltip__bubble').classList.contains('is-open') : 'gone ' + location.pathname; });
  const touch = (type) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x: tip.x, y: tip.y }] });
  await touch('touchStart'); await sleep(800); console.log('held', await open()); await touch('touchEnd'); await sleep(300); console.log('after 0.3', await open()); await sleep(1500); console.log('after 1.8', await open());
  console.log(await t.evaluate(() => (window.__ev || []).join(' ')));
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
