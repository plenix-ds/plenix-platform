/* #217 (owner, 2026-10-24): "where your mouse can grab" in the DataGrid header, today and after the change. Shades the
   area that turns the cursor into the resize arrows (green) and the area that opens the column menu (blue), and draws the
   cursor there. The shading and cursor are drawn only for these pictures.
   Usage: node docs/briefs/grid-grab/capture.js <checkout root> <port> <name> */
const path = require('path'), fs = require('fs');
const [root, port, name] = process.argv.slice(2);
const { serve, launch } = require(path.join(path.resolve(root), 'tests', 'lib.js'));
const OUT = __dirname;
const RESIZE = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 3h2v18h-2zM2 12l5-4v3h3v2H7v3zM22 12l-5 4v-3h-3v-2h3V8z" fill="#000" stroke="#fff" stroke-width="1"/></svg>';
const ARROW = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 20 24"><path d="M2 2l0 18 5-5 3 7 3-1-3-7 7 0z" fill="#fff" stroke="#000" stroke-width="1.5"/></svg>';
(async () => {
  const server = await serve(+port); let browser; const facts = {};
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 2 });
    await page.goto('http://localhost:' + port + '/Plenix/platform/design-system/index.html#/data-display/data-grid', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.plx-data-grid__grid-col-resize-handle', { timeout: 60000 }); await new Promise((r) => setTimeout(r, 1500));
    const clip = await page.evaluate(() => { const g = [...document.querySelectorAll('.plx-data-grid')].find((x) => x.offsetParent && x.querySelector('.plx-data-grid__grid-col-resize-handle'));
      g.scrollIntoView({ block: 'center' }); const h = g.querySelector('.plx-data-grid__grid-header').getBoundingClientRect(); return { x: h.left, y: h.top - 10, width: 560, height: h.height + 60 }; });
    const cols = await page.$$('.plx-data-grid__grid-header .plx-data-grid__grid-col.plx-data-grid__grid-sortable');
    await cols[1].hover(); await new Promise((r) => setTimeout(r, 400));
    const shade = (kind) => page.evaluate((kind, RESIZE, ARROW) => {
      document.querySelectorAll('.rv-shade').forEach((n) => n.remove());
      const add = (r, color) => { const o = document.createElement('div'); o.className = 'rv-shade';
        Object.assign(o.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', background: color + '55', outline: '1px solid ' + color, zIndex: 99998, pointerEvents: 'none' }); document.body.appendChild(o); };
      const cur = (x, y, svg) => { const o = document.createElement('div'); o.className = 'rv-shade'; o.innerHTML = svg; Object.assign(o.style, { position: 'fixed', left: x + 'px', top: y + 'px', zIndex: 99999, pointerEvents: 'none' }); document.body.appendChild(o); };
      const g = [...document.querySelectorAll('.plx-data-grid')].find((x) => x.offsetParent && x.querySelector('.plx-data-grid__grid-col-resize-handle'));
      const handles = [...g.querySelectorAll('.plx-data-grid__grid-col-resize-handle')].slice(0, 3).map((e) => e.getBoundingClientRect());
      const chev = [...g.querySelectorAll('.plx-data-grid__menu-chevron')].map((e) => e.getBoundingClientRect()).filter((r) => r.width)[1];
      if (kind === 'resize') { handles.forEach((r) => add(r, '#188038')); cur(handles[1].left + handles[1].width / 2 - 12, handles[1].top + 2, RESIZE); }
      else { add(chev, '#1a73e8'); cur(chev.left + chev.width / 2 - 4, chev.top + chev.height / 2 - 4, ARROW); }
      const line = handles[1]; const colEnd = g.querySelectorAll('.plx-data-grid__grid-header .plx-data-grid__grid-col.plx-data-grid__grid-sortable')[1].getBoundingClientRect().right;
      return { resize: [Math.round(line.width), Math.round(line.height)], resizeLeftOfLine: Math.round(colEnd - line.left), resizeRightOfLine: Math.round(line.right - colEnd), menu: [Math.round(chev.width), Math.round(chev.height)] };
    }, kind, RESIZE, ARROW);
    facts.resize = await shade('resize'); await page.screenshot({ path: path.join(OUT, name + '-resize.png'), clip });
    facts.menu = await shade('menu'); await page.screenshot({ path: path.join(OUT, name + '-menu.png'), clip });
  } finally { if (browser) await browser.close(); server.close(); }
  fs.writeFileSync(path.join(OUT, name + '.json'), JSON.stringify(facts, null, 1));
  console.log(name, JSON.stringify(facts.resize), 'menu', JSON.stringify(facts.menu.menu));
})().catch((e) => { console.error(e); process.exit(1); });
