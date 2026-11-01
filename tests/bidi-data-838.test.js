// Plenix · tests/bidi-data-838.test.js: a spaced phone number or IBAN keeps its order in an Arabic page (issue 838). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/bidi-data-838.test.js   → BIDI_DATA_838_OK
// The fault (Unicode rule N1): with Arabic-Indic digits and no strong letter, the spaces between the digit groups of "(617) 555-0142" take the page's direction, so a data value
//   in an element with dir="auto" or a plain dir="ltr" (no isolate-override) read ٦١٧ ٠١٤٢ ٥٥٥. Proof first: the cases below fail on the code before the fix (Text data, an explicit dir="ltr" on
//   Text data, PropertyList.Item data, a DataGrid data cell, Isolate dir="auto") and pass after it; the Isolate default, which was already an override island, is the control.
// Cases: in an Arabic page (lang ar, dir rtl) the digit groups of a phone number and an IBAN read left to right in written order in Text variant data, Text data with dir="ltr",
//   Isolate (default and dir="auto"), PropertyList.Item data, a DataGrid cell of kind data and of kind phone, and inside a sentence; a data value with an Arabic letter keeps
//   dir="auto" (its first letter decides); a data value that is an element, not text, keeps dir="auto"; in an English page nothing changes (the groups read in order).
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9819, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 760, height: 700 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    // the digit groups of one sample, left to right as drawn, read in the DataGrid's data row or PropertyList's value element (dd) only, so a label ("Phone") is not read with it (Latin and Arabic-Indic digits and the letters of the IBAN's first groups); also its dir attribute
    const orderOf = async (lang, make) => page.evaluate(async (lang, src) => {
      const rtl = lang === 'ar';
      document.documentElement.setAttribute('dir', rtl ? 'rtl' : 'ltr'); document.documentElement.setAttribute('lang', lang);
      document.querySelector('main').innerHTML = '<div id="c" style="padding:16px"></div>'; window.__root && window.__root.unmount();
      const h = React.createElement, P = Plenix, PHONE = '(617) 555-0142', IBAN = 'GB82 WEST 1234 5698 7654 32';
      const el = new Function('h', 'P', 'PHONE', 'IBAN', 'return ' + src)(h, P, PHONE, IBAN);
      window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h('div', { id: 'box' }, el)); await new Promise((r) => setTimeout(r, 900));
      const box = document.getElementById('box'), scope = box.querySelector('[role=row][data-plx-record]') || box.querySelector('.plx-property-list__value') || box, w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT), parts = [];
      let n; while ((n = w.nextNode())) { const re = /[0-9٠-٩A-Z]+/g; let m; while ((m = re.exec(n.textContent))) { const rg = document.createRange(); rg.setStart(n, m.index); rg.setEnd(n, m.index + m[0].length); parts.push([rg.getBoundingClientRect().x, m[0]]); } }
      const marked = box.querySelector('[dir]');
      return { order: parts.sort((a, b) => a[0] - b[0]).map((x) => x[1]).join(' '), dir: marked && marked.getAttribute('dir'), text: scope.textContent };
    }, lang, make);
    // the text as the page writes it: Arabic-Indic digits in Arabic, Latin in English
    const writtenAr = (s) => s.replace(/[0-9]/g, (d) => String.fromCharCode(0x0660 + +d));
    const PHONE = '(617) 555-0142', IBAN = 'GB82 WEST 1234 5698 7654 32', groups = (s) => s.replace(/[^0-9A-Z]+/g, ' ').trim();
    const cases = {
      'Text data, phone': ['h(P.Text, { variant: "data" }, PHONE)', PHONE], 'Text data, IBAN': ['h(P.Text, { variant: "data" }, IBAN)', IBAN],
      'Text data with dir="ltr", phone': ['h(P.Text, { variant: "data", dir: "ltr" }, PHONE)', PHONE],
      'Isolate default, phone (the control)': ['h(P.Isolate, null, PHONE)', PHONE], 'Isolate dir="auto", phone': ['h(P.Isolate, { dir: "auto" }, PHONE)', PHONE], 'Isolate dir="auto", IBAN': ['h(P.Isolate, { dir: "auto" }, IBAN)', IBAN],
      'PropertyList.Item data, phone': ['h(P.PropertyList, null, h(P.PropertyList.Item, { label: "Phone", data: true }, PHONE))', PHONE],
      'DataGrid cell of kind data, IBAN': ['h("div", { style: { height: 120 } }, h(P.DataGrid, { label: "x", data: [{ id: 1, v: IBAN }], columns: [{ title: "IBAN", field: "v", kind: "data" }] }))', IBAN],
      'DataGrid cell of kind phone': ['h("div", { style: { height: 120 } }, h(P.DataGrid, { label: "x", data: [{ id: 1, v: PHONE }], columns: [{ title: "Phone", field: "v", kind: "phone" }] }))', PHONE],
      'inside a sentence': ['h(P.Text, { as: "p" }, "call ", h(P.Isolate, null, PHONE), " today")', PHONE],
    };
    for (const [name, [make, value]] of Object.entries(cases)) {
      await check('arabic page: ' + name + ' keeps its digit groups in order', async () => {
        const r = await orderOf('ar', make), expected = writtenAr(groups(value));
        assert.ok(r.order.endsWith(expected) || r.order === expected, 'read "' + r.order + '", written "' + expected + '"');
      });
    }
    await check('arabic page: a data value with an Arabic letter keeps dir="auto"', async () => {
      const r = await orderOf('ar', 'h(P.Text, { variant: "data" }, "\\u0645\\u0644\\u0641 " + PHONE)'); assert.equal(r.dir, 'auto');
    });
    await check('arabic page: a data value that is an element keeps dir="auto"', async () => {
      const r = await orderOf('ar', 'h(P.Text, { variant: "data" }, h("b", null, PHONE))'); assert.equal(r.dir, 'auto');
    });
    await check('arabic page: a data value of plain digits and letters is dir="ltr"', async () => {
      const r = await orderOf('ar', 'h(P.Text, { variant: "data" }, PHONE)'); assert.equal(r.dir, 'ltr');
    });
    await check('english page: nothing changes (the groups read in order)', async () => {
      for (const [name, [make, value]] of Object.entries(cases)) { const r = await orderOf('en', make); assert.ok(r.order.endsWith(groups(value)) || r.order === groups(value), name + ': read "' + r.order + '"'); }
    });
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'BIDI_DATA_838_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
