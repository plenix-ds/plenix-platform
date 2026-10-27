/* Plenix tests · Sparkline draws with ECharts (owner, 2026-10-26, issue 353, "A: live charts, 1.5 seconds")
   Summary: line, area (with the latest dot) and bar sparklines, inline and fill, each draw a live ECharts chart inside
     .plx-chart__engine; the engine loads once for the page; each keeps its accessible name (an image named by its label
     and the trend); the style audit reports nothing (the engine's per-element allow-list). Side by side with the SVG
     sparkline it replaces (drawn here from the same scales, as the old component did), each case lands on the same
     pixels (within half a pixel): the line, the area band (flat runs too), the latest dot (a single value at the start
     edge) and the bars (no outer gap). Then 200 sparklines, as in a column of trends, are timed from render to drawn (the
     engine already loaded): the number is printed, and the test fails only past 10 seconds, a sign that drawing broke
     rather than a speed goal (the owner accepted about 1.5 seconds; a throttled CPU takes about 6).
   Usage: node tests/sparkline-echarts-353.test.js */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
// in the automatic set (owner, codex-q3-27): changed mode runs it when the charts, the engine, a global file or this test
// changed (a chart file is global to tests/changed.js: the slice), TEST_SCOPE=full always
const changed = require('./changed');
if (!changed.wants({})) changed.none('SPARKLINE_ECHARTS_353_OK');
const N = 200, LIMIT_MS = 10000;
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
    // side by side with the SVG sparkline it replaces: the old component's geometry, drawn from the same scales
    const CASES = [
      { id: 'flat-area', values: [5, 5, 5, 5], variant: 'area' },
      { id: 'flat-line-fill', values: [3, 3, 3, 3], size: 'fill' },
      { id: 'single', values: [7], showLast: true },
      { id: 'bars', values: [3, 5, 4, 6, 7, 5], variant: 'bar' },
      { id: 'trend-area', values: [40, 42, 39, 47, 51, 49, 56], variant: 'area', showLast: true },
      { id: 'zero-bars', values: [0, 0, 0], variant: 'bar' },
    ];
    await page.evaluate((cases) => {
      const host = document.createElement('section'); host.id = 'compare'; document.querySelector('main').appendChild(host);
      const h = React.createElement, S = window.Plenix.Sparkline;
      host.innerHTML = cases.map((c) => '<div class="cmp" id="cmp-' + c.id + '"><span class="old plx-sparkline plx-sparkline--' + (c.variant || 'line') + ' plx-sparkline--' + (c.size || 'inline') + '"></span> <span class="new"></span></div>').join('');
      cases.forEach((c) => ReactDOM.createRoot(host.querySelector('#cmp-' + c.id + ' .new')).render(h(S, { values: c.values, variant: c.variant, size: c.size, showLast: c.showLast, label: c.id })));
      // the old Sparkline's drawing (styling/phase-2 before issue 353), same classes, same math
      const NS = 'http://www.w3.org/2000/svg', P = window.Plenix, PAD = 4;
      cases.forEach((c) => {
        const box = host.querySelector('#cmp-' + c.id + ' .old'), W = box.getBoundingClientRect().width, H = box.getBoundingClientRect().height;
        const nums = c.values, lo = Math.min(...nums), hi = Math.max(...nums), el = (t, a) => { const e = document.createElementNS(NS, t); Object.keys(a).forEach((k) => e.setAttribute(k, a[k])); return e; };
        const svg = el('svg', { class: 'plx-sparkline__svg', width: W, height: H, viewBox: '0 0 ' + W + ' ' + H });
        if (c.variant === 'bar') {
          const x = P.scaleBand({ domain: nums.map((n, i) => i), range: [0, W], paddingInner: 0.2, paddingOuter: 0 });
          const y = P.scaleLinear({ domain: [Math.min(0, lo), Math.max(0, hi)], range: [H, 0] });
          nums.forEach((n, i) => { const top = Math.min(y(n), y(0)), bottom = Math.max(y(n), y(0)); svg.appendChild(el('rect', { class: 'plx-sparkline__bar', x: x(i), y: top, width: x.bandwidth(), height: Math.max(0, bottom - top) })); });
        } else {
          const x = P.scaleLinear({ domain: [0, Math.max(1, nums.length - 1)], range: [PAD, W - PAD] });
          const y = P.scaleLinear({ domain: [lo, hi], range: [H - PAD, PAD] });
          const line = nums.map((n, i) => (i ? 'L' : 'M') + x(i) + ',' + y(n)).join(''), last = nums.length - 1;
          if (c.variant === 'area') svg.appendChild(el('path', { class: 'plx-sparkline__area', d: line + 'L' + x(last) + ',' + (H - PAD) + 'L' + x(0) + ',' + (H - PAD) + 'Z' }));
          svg.appendChild(el('path', { class: 'plx-sparkline__line', d: line }));
          if (c.showLast) svg.appendChild(el('circle', { class: 'plx-sparkline__last', cx: x(last), cy: y(nums[last]), r: PAD }));
        }
        box.appendChild(svg);
      });
    }, CASES);
    await page.waitForFunction((n) => document.querySelectorAll('#compare .new .plx-chart__engine svg').length === n, { timeout: 30000 }, CASES.length);
    await new Promise((r) => setTimeout(r, 1500));   // past the drawing's animation
    const geometry = await page.evaluate((cases) => cases.map((c) => {
      const row = document.querySelector('#cmp-' + c.id), oldSvg = row.querySelector('.old svg'), newSvg = row.querySelector('.new svg');
      const rel = (e, svg) => { const r = e.getBoundingClientRect(), o = svg.getBoundingClientRect(); return [r.left - o.left, r.top - o.top, r.width, r.height].map((v) => Math.round(v * 10) / 10); };
      const marks = [...newSvg.querySelectorAll('path')].filter((e) => !e.closest('defs'));
      const fill = (e) => (e.getAttribute('fill') || '') !== 'none' && !/A/.test(e.getAttribute('d') || '');
      const out = { id: c.id, old: {}, new: {} };
      if (c.variant === 'bar') {
        out.old.bars = [...oldSvg.querySelectorAll('rect')].map((e) => rel(e, oldSvg)).filter((r) => r[3] > 0);
        out.new.bars = marks.map((e) => rel(e, newSvg)).filter((r) => r[3] > 0).sort((a, b) => a[0] - b[0]);
      } else {
        out.old.line = rel(oldSvg.querySelector('.plx-sparkline__line'), oldSvg);
        out.new.line = rel(marks.find((e) => e.getAttribute('fill') === 'none'), newSvg);
        if (c.variant === 'area') { out.old.area = rel(oldSvg.querySelector('.plx-sparkline__area'), oldSvg); out.new.area = rel(marks.find(fill), newSvg); }
        if (c.showLast) {
          const centre = (r) => [Math.round((r[0] + r[2] / 2) * 10) / 10, Math.round((r[1] + r[3] / 2) * 10) / 10];
          out.old.dot = centre(rel(oldSvg.querySelector('circle'), oldSvg));
          out.new.dot = centre(rel(marks.find((e) => /A/.test(e.getAttribute('d') || '')), newSvg));
        }
      }
      return out;
    }), CASES);
    const near = (a, b) => JSON.stringify(a) === JSON.stringify(b) || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((v, i) => (Array.isArray(v) ? near(v, b[i]) : Math.abs(v - b[i]) <= 0.5)));
    for (const g of geometry) for (const k of Object.keys(g.old)) assert.ok(near(g.old[k], g.new[k]), g.id + ' ' + k + ': old ' + JSON.stringify(g.old[k]) + ', new ' + JSON.stringify(g.new[k]));
    assert.deepEqual(await page.evaluate(() => window.PlenixStyleAudit.audit().map((f) => f.element + ' ' + f.detail)), [], 'no style-audit finding on the compared cases');
    if (process.env.SPARKLINE_COMPARE) console.log(JSON.stringify(geometry));
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
    console.log('SPARKLINE_ECHARTS_353_OK line, area, bar and fill on ECharts, engine loaded once, named, no style findings, same pixels as the SVG sparkline in ' + CASES.length + ' cases; ' + N + ' sparklines in ' + ms + ' ms');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
