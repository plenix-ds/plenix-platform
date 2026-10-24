// Icon names: node tools/agent/datagrid/icon-names.js
// Each way of naming an icon (icon-names.html): whether it drew an inline path, how many dark pixels it painted (an
// unknown name must paint none, never a filled square), and the console warnings.
const { serve, launch } = require('../../../tests/lib.js');
(async () => {
  const s = await serve(8881), b = await launch(), p = await b.newPage();
  const warnings = []; p.on('console', (m) => { if (/warn/.test(m.type())) warnings.push(m.text()); });
  await p.setViewport({ width: 800, height: 400, deviceScaleFactor: 1 });
  await p.goto('http://localhost:8881/Plenix/tools/agent/datagrid/icon-names.html', { waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 1500));
  for (const el of await p.$$('[data-case]')) {
    const name = await el.evaluate((e) => e.getAttribute('data-case'));
    const icon = await el.$('.plx-icon'), paths = await icon.evaluate((e) => e.querySelectorAll('path').length);
    const png = await icon.screenshot({ encoding: 'base64' });
    const dark = await p.evaluate(async (src) => { const i = new Image(); i.src = 'data:image/png;base64,' + src; await i.decode(); const c = document.createElement('canvas'); c.width = i.width; c.height = i.height; const g = c.getContext('2d'); g.drawImage(i, 0, 0); const d = g.getImageData(0, 0, c.width, c.height).data; let n = 0; for (let k = 0; k < d.length; k += 4) if (d[k] < 128) n++; return n + ' of ' + d.length / 4; }, png);
    console.log(name.padEnd(14), 'paths ' + paths, 'dark pixels ' + dark);
  }
  console.log('warnings:', warnings.join(' | ') || 'none');
  await b.close(); s.close(); process.exit(0);
})();
