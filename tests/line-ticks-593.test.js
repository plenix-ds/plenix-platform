/* Plenix tests · dates without a time get day ticks (issue 593; proof first: fails before the fix, where six date-only
   days drew "12:00 AM", "12:00 PM", … along the axis).
   Summary: in the browser, charts whose time values are all whole days (date-only "YYYY-MM-DD"):
     LineChart (6 days), GanttChart (tasks over 2 days), TimelineChart (events over 2 days): no tick label shows a time
       of day; the labels are dates, one per tick, none repeated
     LineChart with timestamps (every 3 hours over one day): still hour ticks (the fix touches whole days only)
   Usage: node tests/line-ticks-593.test.js   → LINE_TICKS_593_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)
(async () => {
  const PORT = +process.env.TEST_PORT || 9657, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 1300 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const labels = await page.evaluate(async () => {
      const h = React.createElement, P = window.Plenix;
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      const days = ['2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06'], n = [3, 5, 4, 8, 7, 12];
      ReactDOM.createRoot(document.getElementById('c')).render(h(P.Stack, { gap: 'xl' },
        h('div', { id: 'line' }, h(P.LineChart, { title: 'Daily uploads', x: 'day', xType: 'time', series: [{ id: 'n', label: 'Files' }], data: days.map((d, i) => ({ day: d, n: n[i] })) })),
        h('div', { id: 'stamps' }, h(P.LineChart, { title: 'Every three hours', x: 't', xType: 'time', series: [{ id: 'n', label: 'Files' }], data: [0, 3, 6, 9, 12, 15].map((hr, i) => ({ t: new Date(2026, 9, 1, hr).toISOString(), n: n[i] })) })),
        h('div', { id: 'gantt' }, h(P.GanttChart, { title: 'Plan', tasks: [{ id: 'a', label: 'Design', start: '2026-10-01', end: '2026-10-02' }, { id: 'b', label: 'Build', start: '2026-10-02', end: '2026-10-03' }] })),
        h('div', { id: 'timeline' }, h(P.TimelineChart, { title: 'Events', items: [{ id: 'x', label: 'Start', start: '2026-10-01' }, { id: 'y', label: 'Launch', start: '2026-10-03' }] }))));
      await new Promise((r) => setTimeout(r, 3000));
      // the time axis's labels: every drawn label that is not a plain number (the value axis) or a task or event name
      const names = new Set(['Design', 'Build', 'Start', 'Launch']);
      const ticks = (id) => [...document.querySelectorAll('#' + id + ' .plx-chart__engine svg text, #' + id + ' .plx-chart__svg text')]
        .filter((t) => t.getClientRects().length).map((t) => t.textContent.trim()).filter((s) => s && !/^[\d.,]+$/.test(s) && !names.has(s));
      return { line: ticks('line'), stamps: ticks('stamps'), gantt: ticks('gantt'), timeline: ticks('timeline') };
    });
    const timeOfDay = /\d:\d\d|AM|PM/;
    for (const id of ['line', 'gantt', 'timeline']) {
      const l = labels[id];
      assert.ok(l.length >= 2, id + ': the time axis has labels: ' + JSON.stringify(l));
      assert.deepEqual(l.filter((s) => timeOfDay.test(s)), [], id + ': whole days get no time-of-day ticks: ' + JSON.stringify(l));
      assert.equal(new Set(l).size, l.length, id + ': each day is labeled once: ' + JSON.stringify(l));
      assert.ok(l.every((s) => /Oct/.test(s)), id + ': the labels are dates: ' + JSON.stringify(l));
    }
    assert.ok(labels.line.length === 6 && labels.line[0] === 'Oct 1' && labels.line[5] === 'Oct 6', 'LineChart: one tick per day, Oct 1 to Oct 6: ' + JSON.stringify(labels.line));
    assert.ok(labels.stamps.length >= 2 && labels.stamps.every((s) => timeOfDay.test(s)), 'LineChart with timestamps: still hour ticks: ' + JSON.stringify(labels.stamps));
    assert.deepEqual(errors, [], 'no script errors');
    console.log('LINE_TICKS_593_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
