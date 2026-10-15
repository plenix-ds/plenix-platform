const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8861, B = 'http://127.0.0.1:' + PORT + '/Plenix/';
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const out = [];
  const log = (k, v) => { out.push([k, v]); console.log(k + ': ' + v); };
  // 1. theme
  let p = await browser.newPage(); await p.setViewport({ width: 1280, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto(B + 'settings/index.html#appearance', { waitUntil: 'networkidle0' }); await sleep(600);
  log('settings system dark at start', await p.evaluate(() => document.documentElement.getAttribute('data-plx-mode') + ' ' + PlenixWorkspace.mode()));
  const segs = await p.evaluate(() => [...document.querySelectorAll('button, [role=radio]')].filter((b) => /^(System|Light|Dark)$/.test(b.innerText.trim())).map((b) => b.innerText.trim() + ':' + (b.getAttribute('aria-checked') || b.getAttribute('aria-pressed') || b.className.includes('is-selected'))));
  log('mode control', segs.join(' '));
  await p.evaluate(() => { const b = [...document.querySelectorAll('button, [role=radio]')].find((b) => b.innerText.trim() === 'Light'); b.click(); }); await sleep(300);
  log('after Light', await p.evaluate(() => document.documentElement.getAttribute('data-plx-mode') + ' ' + PlenixWorkspace.mode() + ' auto=' + document.documentElement.hasAttribute('data-plx-mode-auto')));
  const p2 = await browser.newPage(); await p2.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
  await p2.goto(B + 'dam/settings-myaccount.html#preferences', { waitUntil: 'networkidle0' }); await sleep(600);
  log('dam page remembers', await p2.evaluate(() => document.documentElement.getAttribute('data-plx-mode') + ' select=' + document.querySelector('select[name=mode]').value));
  await p2.select('select[name=mode]', 'dark'); await sleep(300);
  log('dam set dark', await p2.evaluate(() => document.documentElement.getAttribute('data-plx-mode')));
  await sleep(300);
  log('settings tab follows live (storage event)', await p.evaluate(() => document.documentElement.getAttribute('data-plx-mode') + ' ' + PlenixWorkspace.mode() + ' seg=' + [...document.querySelectorAll('button, [role=radio]')].filter((b) => /^(System|Light|Dark)$/.test(b.innerText.trim())).map((b) => b.innerText.trim() + ':' + (b.getAttribute('aria-checked') || b.getAttribute('aria-pressed'))).join(' ')));
  await p2.select('select[name=mode]', 'system'); await sleep(300);
  log('dam system (os dark)', await p2.evaluate(() => document.documentElement.getAttribute('data-plx-mode') + ' auto=' + document.documentElement.hasAttribute('data-plx-mode-auto')));
  await p2.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]); await sleep(200);
  log('system follows os live', await p2.evaluate(() => document.documentElement.getAttribute('data-plx-mode')));
  await p2.goto(B + 'dam/image-editor.html', { waitUntil: 'networkidle0' }); await sleep(400);
  log('image editor stays dark', await p2.evaluate(() => document.documentElement.getAttribute('data-plx-mode')));
  await p2.close();
  // 4. input hints
  await p.goto(B + 'projects/index.html', { waitUntil: 'networkidle0' }); await sleep(500);
  log('header search hints', await p.evaluate(() => { const i = document.querySelector('input[type=search]'); return [i.type, i.inputMode, i.enterKeyHint, i.autocomplete].join(' '); }));
  await p.goto(B + 'settings/index.html#account', { waitUntil: 'networkidle0' }); await sleep(500);
  log('settings email', await p.evaluate(() => { const i = document.querySelector('input[aria-label=Email]'); return [i.type, i.inputMode, i.autocomplete, i.enterKeyHint, i.autocapitalize, i.spellcheck].join(' '); }));
  // 3. focus not obscured: DAM settings-system, tab through at a short window
  await p.setViewport({ width: 800, height: 500 });
  await p.goto(B + 'dam/settings-system.html', { waitUntil: 'networkidle0' }); await sleep(800);
  log('scroll-padding', await p.evaluate(() => [...document.querySelectorAll('.plx-page-content, .plx-settings__content')].map((e) => e.className.split(' ')[0] + ':' + getComputedStyle(e).scrollPaddingBottom + ' bar=' + !!e.querySelector('.plx-action-bar')).join(' ')));
  const bad = []; let seen = 0;
  for (let i = 0; i < 80; i++) {
    await p.keyboard.press('Tab'); await sleep(30);
    const r = await p.evaluate(() => { const a = document.activeElement; const bar = [...document.querySelectorAll('.plx-action-bar')].find((b) => b.offsetParent); if (!a || !bar || bar.contains(a)) return null; const ar = a.getBoundingClientRect(), br = bar.getBoundingClientRect(); return { n: a.tagName + '.' + String(a.className).split(' ')[0], top: Math.round(ar.top), bottom: Math.round(ar.bottom), bar: Math.round(br.top), under: ar.bottom > br.top + 0.5 && ar.top < br.bottom && br.top < innerHeight }; });
    if (r) { seen++; if (r.under) bad.push(JSON.stringify(r)); }
  }
  log('focus overlapping the ActionBar (of ' + seen + ' focus stops with a bar)', bad.length ? bad.slice(0, 3).join(' ') : 'none');
  await p.close();
  // 2. touch tooltip
  const t = await browser.newPage(); await t.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await t.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  await t.goto(B + 'notes/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
  log('interaction', await t.evaluate(() => document.documentElement.getAttribute('data-plx-interaction')));
  const tip = await t.evaluate(() => { const w = [...document.querySelectorAll('.plx-tooltip')].find((x) => x.querySelector('.plx-tooltip__bubble') && x.getBoundingClientRect().width > 0); const r = w.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, label: w.querySelector('.plx-tooltip__bubble').textContent, aria: (w.firstElementChild.getAttribute('aria-label') || w.firstElementChild.innerText || '').slice(0, 30) }; });
  const open = () => t.evaluate((x, y) => { const w = document.elementFromPoint(x, y).closest('.plx-tooltip'); return w.querySelector('.plx-tooltip__bubble').classList.contains('is-open'); }, tip.x, tip.y);
  const touch = (type) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x: tip.x, y: tip.y }] });
  await touch('touchStart'); await sleep(150); const early = await open(); await touch('touchEnd'); await sleep(400);
  log('tap: tooltip "' + tip.label + '" (trigger name "' + tip.aria + '")', 'open during short touch=' + early + ', after tap=' + (await open()));
  await t.keyboard.press('Escape'); await sleep(100);
  await touch('touchStart'); await sleep(800); const held = await open(); await touch('touchEnd'); await sleep(500); const after = await open(); await sleep(1400);
  log('long press', 'open while held=' + held + ', 0.5s after lift=' + after + ', 1.9s after lift=' + (await open()));
  // a mouse page still opens on hover
  const m = await browser.newPage(); await m.setViewport({ width: 1280, height: 900 });
  await m.goto(B + 'notes/index.html', { waitUntil: 'networkidle0' }); await sleep(600);
  await m.mouse.move(tip.x, tip.y); await sleep(200);
  log('mouse hover opens', await m.evaluate((x, y) => document.elementFromPoint(x, y).closest('.plx-tooltip').querySelector('.plx-tooltip__bubble').classList.contains('is-open'), tip.x, tip.y));
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
