/* Plenix tests · Sparkline draws with ECharts (owner, 2026-10-26, issue 353, "A: live charts, 1.5 seconds")
   Summary: line, area (with the latest dot) and bar sparklines, inline and fill, each draw a live ECharts chart inside
     .plx-chart__engine; the engine loads once for the page; each keeps its accessible name (an image named by its label
     and the trend); the style audit reports nothing (the engine's per-element allow-list). Then 200 sparklines, as in a
     column of trends, are timed from render to drawn (the engine already loaded): the number is printed, and the test
     fails only past 6 seconds (4 times the owner's 1.5 seconds), a sign that drawing broke rather than a speed goal.
   Usage: node tests/sparkline-echarts-353.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const N = 200, LIMIT_MS = 6000;
(async () => {
  const PORT = +process.env.TEST_PORT || 9613, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await page.setViewport({ width: 1280, height: 1000 });
    // an empty page with this checkout's Platform: the test draws its own sparklines
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    await page.addScriptTag({ url: 'http://localhost:' + PORT + '/Plenix/platform/dev/style-audit.js' });
    await page.evaluate(() => {
      document.querySelector('main').innerHTML = '<div id="c"></div><div id="many"></div>';
      const h = React.createElement, S = window.Plenix.Sparkline, v = [40, 42, 39, 47, 51, 49, 56];
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
        h('p', { id: 'line' }, 'Downloads ', h(S, { values: v, label: 'Downloads, last 7 days' })),
        h('p', { id: 'area' }, 'Storage ', h(S, { values: v, variant: 'area', showLast: true, label: 'Storage used' })),
        h('p', { id: 'bar' }, 'Visits ', h(S, { values: v, variant: 'bar', color: 'categorical-2', label: 'Visits' })),
        h('div', { id: 'fill' }, h(S, { values: v, size: 'fill', label: 'Weekly giving' }))));
    });
    const IDS = ['line', 'area', 'bar', 'fill'];
    await page.waitForFunction((ids) => ids.every((id) => document.querySelector('#' + id + ' .plx-chart__engine svg path')), { timeout: 30000 }, IDS);
    await new Promise((r) => setTimeout(r, 800));
    const drawn = await page.evaluate((ids) => ({
      engines: ids.filter((id) => document.querySelector('#' + id + ' .plx-sparkline .plx-chart__engine svg path')).length,
      scripts: document.querySelectorAll('script[data-plx-vendor="echarts"]').length,
      names: ids.map((id) => { const s = document.querySelector('#' + id + ' .plx-sparkline'); return s.getAttribute('role') + ':' + /^[^:]+: \S/.test(s.getAttribute('aria-label') || ''); }),
      // the latest dot is ECharts' circle symbol, an arc path: on the area (showLast), not on the line
      dot: ['area', 'line'].map((id) => !!document.querySelector('#' + id + ' .plx-chart__engine svg path[d*="A"]')),
      findings: window.PlenixStyleAudit.audit().map((f) => f.element + ' ' + f.detail),
    }), IDS);
    assert.deepEqual(drawn.engines, 4, 'each sparkline draws with ECharts');
    assert.equal(drawn.scripts, 1, 'the engine loads once for the page');
    assert.deepEqual(drawn.names, ['img:true', 'img:true', 'img:true', 'img:true'], 'each sparkline is an image named by its label and its trend');
    assert.deepEqual(drawn.dot, [true, false], 'showLast draws the latest dot, and only then');
    assert.deepEqual(drawn.findings, [], 'no style-audit finding');
    // 200 sparklines, the engine already loaded: render to drawn
    const ms = await page.evaluate(async (N) => {
      const box = document.getElementById('many'), h = React.createElement, S = window.Plenix.Sparkline;
      const rows = Array.from({ length: N }, (x, i) => Array.from({ length: 12 }, (y, j) => 50 + ((i * 7 + j * 13) % 40)));
      const t0 = performance.now();
      ReactDOM.createRoot(box).render(h('div', null, rows.map((v, i) => h('div', { key: i }, h(S, { values: v, label: 'Row ' + i })))));
      await new Promise((res) => { const tick = () => (box.querySelectorAll('.plx-chart__engine svg path').length >= N ? res() : setTimeout(tick, 5)); tick(); });
      return Math.round(performance.now() - t0);
    }, N);
    assert.ok(ms < LIMIT_MS, N + ' sparklines drew in ' + ms + ' ms (limit ' + LIMIT_MS + ')');
    assert.deepEqual(errors, [], 'no page error and no style-audit finding');
    console.log('SPARKLINE_ECHARTS_353_OK line, area, bar and fill on ECharts, engine loaded once, named, no style findings; ' + N + ' sparklines in ' + ms + ' ms');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
