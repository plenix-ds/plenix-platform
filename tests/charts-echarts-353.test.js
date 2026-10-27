/* Plenix tests · Line, Area, Bar and Pie draw with ECharts (owner, 2026-10-26, issue 353)
   Summary: the four charts draw their plot with Apache ECharts inside .plx-chart__engine, loaded once for the page; Bar
     and Pie answer the keyboard (one Tab stop, the arrow keys, the live region); the style audit reports nothing, because
     only the engine's own drawing may carry the sizes and fonts ECharts writes.
   Usage: node tests/charts-echarts-353.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
// in the automatic set (owner, codex-q3-27): changed mode runs it when the charts, the engine, a global file or this test
// changed (a chart file is global to tests/changed.js: the slice), TEST_SCOPE=full always
const changed = require('./changed');
if (!changed.wants({})) changed.none('CHARTS_ECHARTS_353_OK');
(async () => {
  const PORT = +process.env.TEST_PORT || 9612, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.setViewport({ width: 1280, height: 1600 });
    // an empty page with this checkout's Platform: the test draws its own charts
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/dev/style-audit.js' });
    await page.evaluate(() => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix;
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], a = [3, 5, 4, 6, 7, 5], b = [2, 3, 3, 4, 2, 3];
      const rows = months.map((m, i) => ({ month: m, a: a[i], b: b[i] }));
      const series = [{ id: 'a', label: 'General' }, { id: 'b', label: 'Building' }];
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
        h('div', { id: 'line' }, h(P.LineChart, { title: 'Giving', data: rows, x: 'month', series })),
        h('div', { id: 'area' }, h(P.AreaChart, { title: 'Giving stacked', data: rows, x: 'month', series, stack: 'stacked' })),
        h('div', { id: 'bar' }, h(P.BarChart, { title: 'Giving by month', categories: months,
          series: [{ id: 'a', label: 'General', values: a }, { id: 'b', label: 'Building', values: b }] })),
        h('div', { id: 'pie' }, h(P.PieChart, { title: 'Servants', variant: 'donut',
          data: [{ id: 'f', label: 'Food pantry', value: 21 }, { id: 'c', label: 'Choir', value: 12 }, { id: 's', label: 'Sunday school', value: 9 }] }))));
    });
    await page.waitForFunction(() => document.querySelectorAll('.plx-chart__engine svg').length === 4, { timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800));
    const drawn = await page.evaluate(() => ({
      engines: ['line', 'area', 'bar', 'pie'].filter((id) => document.querySelector('#' + id + ' .plx-chart__engine svg path')).length,
      scripts: document.querySelectorAll('script[data-plx-vendor="echarts"]').length,
    }));
    assert.deepEqual(drawn, { engines: 4, scripts: 1 }, 'each chart draws with ECharts; the engine loads once');
    // Bar and Pie: one Tab stop, the arrow keys, each move said in the live region
    const say = async (id, keys) => {
      await page.focus('#' + id + ' .plx-chart__plot');
      for (const k of keys) { await page.keyboard.press(k); await new Promise((r) => setTimeout(r, 150)); }
      await new Promise((r) => setTimeout(r, 400));
      return page.evaluate(() => (document.querySelector('[data-plx-announcer="polite"]') || {}).textContent || '');
    };
    assert.match(await say('bar', ['ArrowRight']), /Jan/, 'the bar chart answers the arrow keys');
    assert.match(await say('pie', ['ArrowRight']), /Food pantry|Choir|Sunday school/, 'the pie chart answers the arrow keys');
    assert.deepEqual(errors, [], 'no page error and no style-audit finding');
    console.log('CHARTS_ECHARTS_353_OK four charts on ECharts, engine loaded once, Bar and Pie on the keyboard, no style findings');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
