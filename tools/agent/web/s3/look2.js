// the Sheet's forms by window class (auto), the DS page and lab, and the header targets with touch
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const OUT = __dirname + '/';
(async () => {
  const PORT = 8972, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + 'platform/design-system/#/overlays/sheet', { waitUntil: 'networkidle0' }); await sleep(1500);
  await page.screenshot({ path: OUT + 'ds-sheet.png' });
  // auto form at three widths: mount a Sheet through window.Plenix
  for (const w of [375, 700, 1200]) {
    await page.setViewport({ width: w, height: 800 }); await sleep(300);
    const r = await page.evaluate(async () => {
      const host = document.createElement('div'); document.body.appendChild(host);
      const P = window.Plenix, h = React.createElement;
      const root = ReactDOM.createRoot(host);
      let done = 0;
      root.render(h(P.Sheet, { open: true, onClose: () => {}, onDone: () => { done++; }, title: 'Rename' }, h('input', { 'aria-label': 'Name' })));
      await new Promise((r) => setTimeout(r, 300));
      const out = { sheet: !!document.querySelector('.plx-sheet'), drawer: !!document.querySelector('.plx-drawer'), dialog: !!document.querySelector('.plx-dialog:not(.plx-drawer)'), focus: document.activeElement && document.activeElement.getAttribute('aria-label'),
        buttons: [...document.querySelectorAll('.plx-modal-layer button')].map((b) => b.getAttribute('aria-label') || b.textContent) };
      window.__root = root; window.__host = host;
      return out;
    });
    await page.screenshot({ path: OUT + 'sheet-auto-' + w + '.png' });
    await page.evaluate(() => { window.__root.unmount(); window.__host.remove(); });
    console.log(w, JSON.stringify(r));
  }
  // one sheet at a time
  await page.setViewport({ width: 375, height: 800 }); await sleep(300);
  const one = await page.evaluate(async () => {
    const host = document.createElement('div'); document.body.appendChild(host);
    const P = window.Plenix, h = React.createElement, root = ReactDOM.createRoot(host);
    root.render(h('div', null, h(P.Sheet, { open: true, onClose: () => {}, title: 'First' }), h(P.Sheet, { open: true, onClose: () => {}, title: 'Second' })));
    await new Promise((r) => setTimeout(r, 300));
    const a = [...document.querySelectorAll('.plx-sheet__title')].map((x) => x.textContent);
    root.render(h('div', null, h(P.Sheet, { open: true, onClose: () => {}, title: 'First' }), h(P.Sheet, { open: false, onClose: () => {}, title: 'Second' })));
    await new Promise((r) => setTimeout(r, 300));
    const b = [...document.querySelectorAll('.plx-sheet__title')].map((x) => x.textContent);
    root.unmount(); host.remove();
    return { both: a, afterSecondCloses: b };
  });
  console.log('one at a time', JSON.stringify(one));
  // header targets with touch at 1280
  await page.setViewport({ width: 1280, height: 800, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }] });
  await page.goto(BASE + 'dam/index.html', { waitUntil: 'networkidle0' }); await sleep(1000);
  await page.screenshot({ path: OUT + 'dam-touch.png' });
  console.log('interaction', await page.evaluate(() => document.documentElement.getAttribute('data-plx-interaction')));
  console.log('errors', errs);
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
