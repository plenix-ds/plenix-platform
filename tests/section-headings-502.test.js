/* Plenix tests · section headings wrap, then end in an ellipsis with a tooltip (issue 502, owner-approved: every CollapsibleSection heading, navigation groups included).
   Summary: in a NavList at 192px and 140px "PROJECT COMMAND CENTER" is two lines and 40px high and "GENERAL" one line and 32px; the chevron stays at the heading's end
     (the Tooltip's wrapper takes the toggle's room); at 140px the cut heading shows its full text in a tooltip on hover and on keyboard focus, and the button's name is
     the full text; a plain CollapsibleSection (not in a navigation) does the same; a Field label and a PropertyList label that fit stay un-cut (useTruncated now also
     checks height), so they get no tooltip; a static NavList heading wraps too.
   Usage: node tests/section-headings-502.test.js   (run by layout.test.js when CollapsibleSection or NavList changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9620, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 900, height: 900 });
    await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
    const got = await page.evaluate(async () => {
      document.querySelector('main').innerHTML = '<div id="c"></div>';
      const h = React.createElement, P = window.Plenix, noop = () => {};
      const pane = (id, w, kids) => h('div', { id, style: { inlineSize: w + 'px' } }, kids);
      const nav = (id, w) => pane(id, w, h(P.NavList, { label: id, value: 'a', onSelect: noop, groups: [
        { heading: 'PROJECT COMMAND CENTER', items: [{ id: 'a', label: 'Dashboard' }] }, { heading: 'GENERAL', items: [{ id: 'b', label: 'Settings' }] },
        { heading: 'A STATIC HEADING THAT IS LONG', collapsible: false, items: [{ id: 'c', label: 'Static' }] }] }));
      ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, nav('n192', 192), nav('n140', 140),
        pane('plain', 192, h(P.CollapsibleSection, { title: 'A PLAIN SECTION TITLE THAT IS LONG FOR THE TEST' }, h('p', null, 'body'))),
        pane('field', 320, h(P.Field, { label: 'Parish name' }, h(P.Input, { defaultValue: 'x' }))),
        pane('props', 320, h(P.PropertyList, { items: [{ label: 'Founded', value: '1923' }] }))));
      await new Promise((r) => setTimeout(r, 600));
      const heads = (id) => [...document.querySelectorAll('#' + id + ' .plx-collapsible-section__heading')].map((e) => {
        const r = e.getBoundingClientRect(), c = e.querySelector('.plx-collapsible-section__chevron').getBoundingClientRect(), pad = parseFloat(getComputedStyle(e).paddingInlineEnd) || 0;
        const rtl = getComputedStyle(e).direction === 'rtl';
        return { text: e.querySelector('.plx-collapsible-section__title').textContent, height: Math.round(r.height), end: Math.round(rtl ? c.left - r.left : r.right - c.right) - Math.round(pad) };
      });
      const staticH = (id) => Math.round(document.querySelector('#' + id + ' .plx-nav-list__heading').getBoundingClientRect().height);
      return { n192: heads('n192'), n140: heads('n140'), plain: heads('plain'), s192: staticH('n192'), s140: staticH('n140') };
    });
    assert.deepEqual(errors, [], 'no script errors');
    for (const id of ['n192', 'n140']) {
      assert.equal(got[id][0].height, 40, id + ': "PROJECT COMMAND CENTER" is two lines, 40px');
      assert.equal(got[id][1].height, 32, id + ': "GENERAL" is one line, 32px');
      for (const x of got[id]) assert.ok(Math.abs(x.end) <= 1, id + ': the chevron is at the heading\'s end for "' + x.text + '" (' + x.end + 'px off)');
    }
    assert.equal(got.s192, 40, 'a long static heading wraps to two lines, 40px'); assert.equal(got.plain[0].height, 40, 'a plain CollapsibleSection with a long title wraps too'); assert.ok(Math.abs(got.plain[0].end) <= 1, 'plain: the chevron is at the end');
    // the tooltip: hover and keyboard focus show the full text of a cut heading; the name stays whole
    await page.hover('#n140 .plx-collapsible-section__toggle'); await new Promise((r) => setTimeout(r, 700));
    assert.ok(await page.evaluate(() => [...document.querySelectorAll('[role="tooltip"]')].some((e) => /PROJECT COMMAND CENTER/.test(e.textContent))), 'hover: the full text in a tooltip');
    assert.equal(await page.$eval('#n140 .plx-collapsible-section__toggle', (e) => e.textContent.trim()), 'PROJECT COMMAND CENTER', 'the button\'s name is the full heading');
    await page.mouse.move(0, 0); await page.focus('#n140 .plx-collapsible-section__toggle'); await new Promise((r) => setTimeout(r, 700));
    assert.ok(await page.evaluate(() => [...document.querySelectorAll('[role="tooltip"]')].some((e) => /PROJECT COMMAND CENTER/.test(e.textContent) && getComputedStyle(e.closest('.plx-tooltip__bubble') || e).visibility !== 'hidden')), 'focus: the full text in a tooltip');
    // a Field label and a PropertyList label that fit are not cut: no tooltip
    await page.hover('#field label'); await new Promise((r) => setTimeout(r, 600));
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('#field [role="tooltip"]')].filter((e) => e.closest('.plx-tooltip__bubble') && getComputedStyle(e.closest('.plx-tooltip__bubble')).visibility !== 'hidden').length), 0, 'a Field label that fits shows no tooltip');
    assert.equal(await page.evaluate(() => [...document.querySelectorAll('#props [role="tooltip"]')].filter((e) => e.closest('.plx-tooltip__bubble') && getComputedStyle(e.closest('.plx-tooltip__bubble')).visibility !== 'hidden').length), 0, 'a PropertyList label that fits shows no tooltip');
    console.log('section-headings-502: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
