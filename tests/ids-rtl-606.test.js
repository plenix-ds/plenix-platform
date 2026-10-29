/* Plenix tests · computed identifiers read 01-20261020 on a right-to-left page (issue 606; owner, #590: "01-20261020 everywhere").
   Summary: a case number such as 20261020-01 follows the direction of the page: 01-20261020 in a right-to-left page, 20261020-01 in a left-to-right one, in
     Isolate kind="id", a DataGrid column of kind id, DataPill kind="id" and PropertyList.Item kind="id". An email, a web address and code stay left to right,
     Isolate's default (no kind) stays left to right, and the stored text is never changed.
   The order is read from the screen: the x position of the two numbers (each in its own island), 01 left of 2026 means "01-20261020".
   The probe is proved able to see the old order first: Isolate with its default dir="ltr" holding the same ID reads 20261020-01 in the same right-to-left page, so
     a kind="id" that fell back to left to right would show.
   Usage: node tests/ids-rtl-606.test.js   (run by layout.test.js when Isolate, DataGrid, DataPill, PropertyList or EntityHeader changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const PORT = +process.env.TEST_PORT || 9628, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    const read = async (dir) => {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(dir + ': ' + e.message));
      await page.setViewport({ width: 1000, height: 900 });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      const out = await page.evaluate(async (dir) => {
        document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement, P = window.Plenix, ID = '20261020-01';
        const cols = [{ field: 'name', title: 'Name' }, { field: 'no', title: 'Case', kind: 'id' }, { field: 'mail', title: 'Mail', kind: 'email' }];
        ReactDOM.createRoot(document.getElementById('c')).render(h('div', null,
          h('p', { id: 'sent' }, dir === 'rtl' ? 'القضية رقم ' : 'Case ', h(P.Isolate, { id: 'iso-id', kind: 'id' }, ID), ' / ', h(P.Isolate, { id: 'iso-default' }, ID), ' / ', h(P.Isolate, { id: 'iso-mail', kind: 'email' }, 'office@example.org')),
          h('div', { id: 'grid', style: { height: 220 } }, h(P.DataGrid, { label: 'Cases', columns: cols, data: [{ id: 1, name: 'A', no: ID, mail: 'office@example.org' }] })),
          h(P.PropertyList, { label: 'Details' }, h(P.PropertyList.Item, { label: 'Case', data: true, kind: 'id' }, ID)),
          h('div', { id: 'pill' }, h(P.DataPill, { data: true, kind: 'id' }, ID))));
        await new Promise((r) => setTimeout(r, 1500));
        // the order of the two numbers of an ID: 01 left of 2026 reads "01-20261020"
        const order = (el) => { const b = el && el.querySelectorAll('bdi[dir=ltr]'); return b && b.length === 2 ? (b[1].getBoundingClientRect().x < b[0].getBoundingClientRect().x ? '01-20261020' : '20261020-01') : 'no islands'; };
        const flat = (el) => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const v = n.nodeValue.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632)); const i = v.indexOf('20261020-01'); if (i >= 0) { const a = document.createRange(), b = document.createRange(); a.setStart(n, i); a.setEnd(n, i + 8); b.setStart(n, i + 9); b.setEnd(n, i + 11); return b.getBoundingClientRect().x < a.getBoundingClientRect().x ? '01-20261020' : '20261020-01'; } } return 'none'; };
        const q = (s) => document.querySelector(s);
        return { sentId: order(q('#iso-id')), sentDefault: flat(q('#iso-default')), mail: q('#iso-mail').textContent.replace(/\s/g, ''), mailDir: getComputedStyle(q('#iso-mail')).direction, grid: order(q('#grid .plx-isolate')),
          gridEmail: getComputedStyle(q('#grid .plx-isolate[dir=ltr]')).direction, property: order(q('.plx-property-list__value')), pill: order(q('#pill')),
          stored: [q('#iso-id').textContent, q('#grid .plx-isolate').textContent, q('#pill').textContent].map((t) => t.replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))) };
      }, dir);
      await page.close(); return out;
    };
    const rtl = await read('rtl'), ltr = await read('ltr');
    // the probe sees the old order: the default island holds the same ID left to right in the same page
    assert.equal(rtl.sentDefault, '20261020-01', 'the probe sees it: Isolate with its default reads the ID left to right (the old order)');
    assert.equal(rtl.sentId, '01-20261020', 'rtl: Isolate kind="id" reads 01-20261020');
    assert.equal(rtl.grid, '01-20261020', 'rtl: a DataGrid column of kind id reads 01-20261020');
    assert.equal(rtl.property, '01-20261020', 'rtl: PropertyList.Item kind="id" reads 01-20261020');
    assert.equal(rtl.pill, '01-20261020', 'rtl: DataPill kind="id" reads 01-20261020');
    assert.equal(rtl.mail, 'office@example.org', 'rtl: the email is as written');
    assert.equal(rtl.mailDir, 'ltr', 'rtl: the email stays left to right');
    assert.equal(rtl.gridEmail, 'ltr', 'rtl: an email in a DataGrid cell stays left to right');
    rtl.stored.forEach((t) => assert.equal(t, '20261020-01', 'rtl: the text itself is unchanged (copy and search get 20261020-01)'));
    assert.equal(ltr.sentId, '20261020-01', 'ltr: Isolate kind="id" is unchanged');
    assert.equal(ltr.grid, '20261020-01', 'ltr: a DataGrid column of kind id is unchanged');
    assert.equal(ltr.property, '20261020-01', 'ltr: PropertyList.Item kind="id" is unchanged');
    assert.equal(ltr.pill, '20261020-01', 'ltr: DataPill kind="id" is unchanged');
    assert.equal(ltr.mailDir, 'ltr', 'ltr: the email is unchanged');
    assert.deepEqual(errors, [], 'no script errors');
    console.log('ids-rtl-606: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
