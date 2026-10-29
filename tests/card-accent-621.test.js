/* Plenix tests · the Card accent is removed (issue 621, owner 2026-10-29: remove it for every app, the suite included).
   Summary: a Card draws no colored edge any more. Part 1, the component: an accent passed to a Card is ignored (no plx-card--accent class, no data-plx-color on the
     card, the start border as wide as the others) and, with React's development build, one warning says it was removed (once, however many Cards). Part 2, the suite: each place that
     used the edge keeps its color in a new form, and no card on those pages carries the old class or attribute: the dashboard's project cards show a ColorSwatch of the project's
     color, the calendar's event cards a ColorSwatch beside the calendar tag, and the Settings feature-area cards (documentation and features) a ProgressBar in the area's color.
   The probe is proved able to see an edge first: a plain box with a 3px colored start border reads 3px, so a Card that still drew the edge (3px against the other sides' 1px) would fail.
   Usage: node tests/card-accent-621.test.js   (run by layout.test.js when the Card or an application page changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9631, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    // part 1: the component, in development React
    const page = await browser.newPage(); const warnings = []; page.on('console', (m) => { if (m.type() === 'warn') warnings.push(m.text()); }); page.on('pageerror', (e) => errors.push(e.message));
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html?react=dev', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const card = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div><div id="control" style="border-inline-start: 3px solid rgb(0, 0, 255); padding: 8px">control</div>'; const h = React.createElement, P = Plenix;
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, ['blue', 'green'].map((c) => h(P.Card, { key: c, title: 'Kitchen Renovation', meta: 'Personal', accent: c, onOpen: () => {} }, 'Cabinet quotes'))));
      await new Promise((r) => setTimeout(r, 900));
      const a = document.querySelector('#c article.plx-card'), s = getComputedStyle(a);
      return { accentClass: !!document.querySelector('.plx-card--accent'), attr: a.hasAttribute('data-plx-color'), start: s.borderInlineStartWidth, end: s.borderInlineEndWidth, control: getComputedStyle(document.getElementById('control')).borderInlineStartWidth };
    });
    assert.equal(card.control, '3px', 'the probe sees it: a 3px colored start border reads 3px');
    assert.equal(card.accentClass, false, 'no plx-card--accent class');
    assert.equal(card.attr, false, 'no data-plx-color on the card');
    assert.equal(card.start, card.end, 'the start border is as wide as the end border (' + card.start + ' against ' + card.end + ')');
    assert.equal(warnings.filter((w) => /Card: the accent prop was removed/.test(w)).length, 1, 'one warning in development, however many Cards');
    await page.close();
    // part 2: the suite
    const open = async (url) => { const p = await browser.newPage(); p.on('pageerror', (e) => errors.push(url + ': ' + e.message)); await p.goto('http://localhost:' + PORT + '/Plenix/' + url, { waitUntil: 'load' }); await wait(2200); return p; };
    const clean = (p) => p.evaluate(() => ({ cls: document.querySelectorAll('.plx-card--accent').length, attr: document.querySelectorAll('.plx-card[data-plx-color]').length }));
    let p = await open('dashboard/index.html');
    const dash = await p.evaluate(() => [...document.querySelectorAll('[aria-label="Active projects"] .plx-card')].map((c) => !!c.querySelector('.plx-color-swatch[data-plx-color]')));
    assert.ok(dash.length > 0 && dash.every(Boolean), 'dashboard: every project card shows a ColorSwatch of the project\'s color');
    assert.deepEqual(await clean(p), { cls: 0, attr: 0 }, 'dashboard: no card carries the old class or attribute'); await p.close();
    p = await open('calendar/index.html');
    const cal = await p.evaluate(() => [...document.querySelectorAll('.plx-card')].map((c) => !!c.querySelector('.plx-color-swatch[data-plx-color]')));
    assert.ok(cal.length > 0 && cal.every(Boolean), 'calendar: every event card shows a ColorSwatch beside the calendar tag');
    assert.deepEqual(await clean(p), { cls: 0, attr: 0 }, 'calendar: no card carries the old class or attribute'); await p.close();
    for (const [name, url] of [['settings documentation', 'settings/index.html#/docs'], ['settings features', 'settings/index.html#/features']]) {
      p = await open(url);
      const areas = await p.evaluate(() => [...document.querySelectorAll('.plx-card')].filter((c) => c.querySelector('.plx-progress-bar')).map((c) => !!c.querySelector('.plx-progress-bar--color[data-plx-color]')));
      assert.ok(areas.length >= 30 && areas.every(Boolean), name + ': every feature-area card shows a ProgressBar in the area\'s color (' + areas.length + ' cards)');
      assert.deepEqual(await clean(p), { cls: 0, attr: 0 }, name + ': no card carries the old class or attribute'); await p.close();
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('card-accent-621: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
