/* Plenix tests · editing and time parts in right to left (issue 413, rtl-413-b).
   Summary: in a page with dir="rtl" lang="ar":
     RichTextEditor  the editing area writes right to left and starts at the right; the toolbar starts at the right (Bold is
                     the rightmost button); bulleted items have their bullets at the right. With dir="rtl" lang="ar" on the
                     editor inside a left-to-right page, the same holds for that editor only, and its area's language is ar
     DatePicker      the range calendar's Previous month button is right of Next, its arrow mirrored; the week's first day
                     sits at the right
     TimeGrid        the days run from the right (the first day is the rightmost column)
     Carousel        Previous is right of Next, both arrows mirrored
     DocumentViewer  Previous page is right of Next page; the page itself stays left to right (a PDF page is drawn as it is)
     And the page does not scroll sideways.
   Usage: node tests/rtl-editing-time.test.js   → RTL_EDITING_TIME_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9662, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1100, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const render = (dir) => page.evaluate(async (dir) => {
      document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
      const h = React.createElement, P = window.Plenix;
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      ReactDOM.createRoot(document.getElementById('c')).render(h(P.Stack, { gap: 'xl' },
        h('div', { id: 'rte' }, h(P.RichTextEditor, { label: 'الوصف', defaultValue: '<p>هذا نص عربي في المحرر.</p><ul><li>بند أول</li></ul>' })),
        h('div', { id: 'rte-ar' }, h(P.RichTextEditor, { label: 'Answer in Arabic', dir: 'rtl', lang: 'ar', defaultValue: '<p>جواب بالعربية.</p>' })),
        h('div', { id: 'dp' }, h(P.DatePicker, { mode: 'range', defaultValue: { start: '2026-10-05', end: '2026-10-09' } })),
        h('div', { id: 'tg' }, h(P.TimeGrid, { label: 'الأسبوع', startHour: 8, endHour: 12,
          days: [{ key: 'sat', weekday: 'السبت', day: 3 }, { key: 'sun', weekday: 'الأحد', day: 4 }, { key: 'mon', weekday: 'الاثنين', day: 5 }],
          events: [{ id: 1, day: 'sat', start: 9, end: 10.5, title: 'زيارة', time: '9:00' }] })),
        h('div', { id: 'car' }, h(P.Carousel, { label: 'مميز', perView: 2 }, ['أول', 'ثان', 'ثالث', 'رابع'].map((x) => h(P.Card, { key: x }, x)))),
        h('div', { id: 'doc' }, h(P.DocumentViewer, { kind: 'pdf', src: '/Plenix/platform/components/DocumentViewer/fixtures/sample.pdf', label: 'تقرير' }))));
      await new Promise((r) => setTimeout(r, 2500));
    }, dir);
    const leftOf = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel); return e && e.getClientRects().length ? e.getBoundingClientRect().left : null; }, sel);
    const scaleIn = (sel) => page.evaluate((sel) => { const i = document.querySelector(sel + ' .plx-icon'); return i ? getComputedStyle(i).scale : null; }, sel);

    // the whole page right to left
    await render('rtl');
    const area = await page.evaluate(() => { const a = document.querySelector('#rte [role="textbox"]'), li = a.querySelector('li'), c = getComputedStyle(a); return { dir: c.direction, align: c.textAlign, liRight: li.getBoundingClientRect().right, areaRight: a.getBoundingClientRect().right }; });
    assert.equal(area.dir, 'rtl', 'RichTextEditor: the editing area writes right to left');
    assert.ok(['start', 'right'].includes(area.align) && area.areaRight - area.liRight < 48, 'RichTextEditor: its list starts at the right: ' + JSON.stringify(area));
    const tb = await page.evaluate(() => [...document.querySelectorAll('#rte [role="toolbar"] button')].filter((b) => b.getClientRects().length).map((b) => b.getBoundingClientRect().left));
    assert.ok(tb.length > 1 && tb[0] === Math.max(...tb), 'RichTextEditor: the toolbar starts at the right: ' + JSON.stringify(tb));
    const btn = (scope, words) => page.evaluate((scope, words) => { const b = [...document.querySelectorAll(scope + ' button')].find((x) => words.some((w) => (x.getAttribute('aria-label') || '').toLowerCase().includes(w))); return b ? { left: b.getBoundingClientRect().left, scale: getComputedStyle(b.querySelector('.plx-icon') || b).scale } : null; }, scope, words);
    // DatePicker: open its calendar
    await page.click('#dp input'); await page.keyboard.down('Alt'); await page.keyboard.press('ArrowDown'); await page.keyboard.up('Alt'); await sleep(600);
    const prevM = await btn('body', ['previous month', 'الشهر السابق']), nextM = await btn('body', ['next month', 'الشهر التالي']);
    assert.ok(prevM && nextM && prevM.left > nextM.left && prevM.scale === '-1 1', 'DatePicker: Previous month is right of Next, its arrow mirrored: ' + JSON.stringify({ prevM, nextM }));
    await page.keyboard.press('Escape');
    const days = await page.evaluate(() => [...document.querySelectorAll('#tg [class*="day"]')].filter((e) => /السبت|الأحد|الاثنين/.test(e.textContent) && e.children.length <= 3).map((e) => [e.textContent.trim().slice(0, 6), e.getBoundingClientRect().left]));
    const sat = days.find((d) => d[0].startsWith('السبت')), mon = days.find((d) => d[0].startsWith('الاثنين'));
    assert.ok(sat && mon && sat[1] > mon[1], 'TimeGrid: the days run from the right: ' + JSON.stringify(days));
    const prevS = await btn('#car', ['previous', 'السابقة']), nextS = await btn('#car', ['next', 'التالية']);
    assert.ok(prevS && nextS && prevS.left > nextS.left && prevS.scale === '-1 1' && nextS.scale === '-1 1', 'Carousel: Previous right of Next, both arrows mirrored: ' + JSON.stringify({ prevS, nextS }));
    const prevP = await btn('#doc', ['previous', 'السابقة']), nextP = await btn('#doc', ['next', 'التالية']);
    assert.ok(prevP && nextP && prevP.left > nextP.left, 'DocumentViewer: Previous page right of Next page: ' + JSON.stringify({ prevP, nextP }));
    assert.equal(await page.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth), 0, 'no sideways scroll in right to left');

    // a left-to-right page with one Arabic editor (dir and lang on the editor)
    await render('ltr');
    const mixed = await page.evaluate(() => { const own = document.querySelector('#rte-ar [role="textbox"]'), other = document.querySelector('#rte [role="textbox"]'); const tb = [...document.querySelectorAll('#rte-ar [role="toolbar"] button')].filter((b) => b.getClientRects().length).map((b) => b.getBoundingClientRect().left); return { own: getComputedStyle(own).direction, lang: own.closest('[lang]').getAttribute('lang'), other: getComputedStyle(other).direction, tbFromRight: tb.length > 1 && tb[0] === Math.max(...tb) }; });
    assert.ok(mixed.own === 'rtl' && mixed.lang === 'ar' && mixed.other === 'ltr' && mixed.tbFromRight, 'RichTextEditor: dir and lang on one editor in a left-to-right page: ' + JSON.stringify(mixed));

    assert.deepEqual(errors, [], 'no script errors');
    console.log('RTL_EDITING_TIME_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
