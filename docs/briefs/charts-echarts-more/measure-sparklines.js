/* How long 200 sparklines take to draw, today's and on ECharts (as in a DataGrid column of trends), and the page's memory.
   Usage (repository root): node docs/briefs/charts-echarts-more/measure-sparklines.js */
const path = require('path');
const { serve, launch } = require(path.join(__dirname, '..', '..', '..', 'tests', 'lib.js'));
const PORT = 9587, N = 200;
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  try {
    for (const which of ['Plenix', 'PlenixNext']) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 1000 });
      await page.goto('http://localhost:' + PORT + '/Plenix/docs/briefs/charts-echarts-more/preview.html', { waitUntil: 'load' });
      // the engine is already loaded by the page's own sparklines, so this counts drawing only
      await page.waitForFunction(() => document.querySelectorAll('[id$="-new"] .plx-sparkline__engine svg').length >= 4, { timeout: 60000 });
      const r = await page.evaluate(async (which, N) => {
        const box = document.createElement('div'); document.body.appendChild(box);
        const S = window[which].Sparkline, h = React.createElement;
        const rows = Array.from({ length: N }, (x, i) => Array.from({ length: 12 }, (y, j) => 50 + ((i * 7 + j * 13) % 40)));
        const heap0 = performance.memory ? performance.memory.usedJSHeapSize : 0;
        const t0 = performance.now();
        ReactDOM.createRoot(box).render(h('div', null, rows.map((v, i) => h('div', { key: i }, h(S, { values: v, label: 'Row ' + i })))));
        const sel = which === 'Plenix' ? '.plx-sparkline__svg' : '.plx-sparkline__engine svg path';
        await new Promise((res) => { const tick = () => (box.querySelectorAll(sel).length >= N ? res() : setTimeout(tick, 5)); tick(); });
        const ms = Math.round(performance.now() - t0);
        await new Promise((res) => setTimeout(res, 500));
        return { ms, heapMB: performance.memory ? Math.round((performance.memory.usedJSHeapSize - heap0) / 1e5) / 10 : null, nodes: box.querySelectorAll('*').length };
      }, which, N);
      console.log((which === 'Plenix' ? 'today' : 'ECharts') + ': ' + N + ' sparklines drawn in ' + r.ms + ' ms, +' + r.heapMB + ' MB memory, ' + r.nodes + ' elements');
      await page.close();
    }
  } finally { await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
