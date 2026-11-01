// Plenix · tests/rating-divider-808.test.js: Rating half stars and Divider with a text (issue 808). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/rating-divider-808.test.js   → RATING_DIVIDER_808_OK
// Cases, in left to right and right to left: Rating without half is as it was (whole stars, a click chooses the star, the checked star is the value, arrows move by one, a fractional value draws
//   its whole stars only); with half a value such as 3.5 draws three full stars and half of the fourth (the fourth is checked and named "3.5 stars"), a click on the first half of a star (the right
//   half in right to left) chooses n - 0.5 and on the second half n, a second click on the same value clears it, the arrow keys move by half a star and focus stays on the star that holds the value,
//   read-only reads "Rating: 3.5 of 5"; Divider without children is the rule it was; with a text it is a separator named by the text with a line on each side, one line high, text between the lines
//   in both directions; a vertical Divider ignores a text.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9821, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 560, height: 500 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ', rtl = dir === 'rtl', next = rtl ? 'ArrowLeft' : 'ArrowRight';
      const mount = (src) => page.evaluate(async (dir, src) => {
        window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en'); window.__v = [];
        document.querySelector('main').innerHTML = '<div id="c" style="padding:16px;max-width:440px"></div>';
        const h = React.createElement, P = Plenix, Demo = new Function('h', 'P', 'React', 'return ' + src)(h, P, React);
        window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(Demo)); await new Promise((r) => setTimeout(r, 600));
      }, dir, src);
      const stars = () => page.evaluate(() => [...document.querySelectorAll('#r [role=radio]')].map((e) => ({ checked: e.getAttribute('aria-checked'), label: e.getAttribute('aria-label'), on: e.classList.contains('plx-rating__star--on'), half: e.classList.contains('plx-rating__star--half'), tab: e.tabIndex })));
      const rect = (i) => page.evaluate((i) => { const r = document.querySelectorAll('#r [role=radio]')[i].getBoundingClientRect(); return { l: r.left, r: r.right, y: r.top + r.height / 2 }; }, i);
      const last = () => page.evaluate(() => window.__v.slice(-1)[0]);
      const HALF = '() => { const [v, set] = React.useState(3.5); return h(P.Rating, { id: "r", value: v, half: true, onChange: (x) => { window.__v.push(x); set(x); } }); }';

      await check(T + 'without half the stars are whole and the keys and clicks are as before', async () => {
        await mount('() => { const [v, set] = React.useState(3); return h(P.Rating, { id: "r", value: v, onChange: (x) => { window.__v.push(x); set(x); } }); }');
        const s = await stars(); assert.deepEqual(s.map((x) => x.on), [true, true, true, false, false]); assert.ok(!s.some((x) => x.half)); assert.equal(s[2].checked, 'true');
        await page.focus('#r [tabindex="0"]'); await page.keyboard.press(next); await wait(150); assert.equal(await last(), 4);
        const r = await rect(1); await page.mouse.click(rtl ? r.r - 3 : r.l + 3, r.y); await wait(150); assert.equal(await last(), 2, 'the first half of a star is the whole star without half');
      });
      await check(T + 'a fractional value without half draws its whole stars only', async () => {
        await mount('() => h(P.Rating, { id: "r", value: 3.5 })'); const s = await stars(); assert.deepEqual(s.map((x) => x.on), [true, true, true, false, false]); assert.ok(!s.some((x) => x.half));
      });
      await check(T + 'with half 3.5 is three full stars and half of the fourth, which is checked and named 3.5 stars', async () => {
        await mount(HALF); const s = await stars(); assert.deepEqual(s.map((x) => x.on), [true, true, true, false, false]); assert.equal(s[3].half, true);
        assert.equal(s[3].checked, 'true'); assert.match(s[3].label, /3\.5/); assert.equal(s[3].tab, 0);
      });
      await check(T + 'with half the first half of a star sets n - 0.5, the second half n, the same value again clears it', async () => {
        await mount(HALF); const r = await rect(1);
        await page.mouse.click(rtl ? r.r - 3 : r.l + 3, r.y); await wait(150); assert.equal(await last(), 1.5);
        await page.mouse.click(rtl ? r.l + 3 : r.r - 3, r.y); await wait(150); assert.equal(await last(), 2);
        await page.mouse.click(rtl ? r.l + 3 : r.r - 3, r.y); await wait(150); assert.equal(await last(), 0);
      });
      await check(T + 'with half the arrow keys move by half a star and focus stays on the star that holds the value', async () => {
        await mount(HALF); await page.focus('#r [tabindex="0"]'); await page.keyboard.press(next); await wait(150); assert.equal(await last(), 4);
        await page.keyboard.press('ArrowDown'); await wait(150); assert.equal(await last(), 3.5);
        await page.keyboard.press('ArrowDown'); await wait(150); assert.equal(await last(), 3);
        assert.match(await page.evaluate(() => document.activeElement.getAttribute('aria-label')), /^3 /);
      });
      await check(T + 'read-only with half reads Rating: 3.5 of 5', async () => {
        await mount('() => h(P.Rating, { id: "r", value: 3.5, half: true, readOnly: true })');
        const name = await page.evaluate(() => document.querySelector('#r').getAttribute('aria-label')); assert.match(name, /3\.5/);
        assert.equal(await page.evaluate(() => document.querySelectorAll('#r .plx-rating__star--half').length), 1);
      });
      await check(T + 'Divider without a text is the rule it was', async () => {
        await mount('() => h(P.Divider)'); const d = await page.evaluate(() => { const e = document.querySelector('[role=separator]'); return { cls: e.className, kids: e.children.length, h: e.getBoundingClientRect().height }; });
        assert.ok(/plx-divider--horizontal/.test(d.cls)); assert.equal(d.kids, 0); assert.ok(d.h <= 2);
      });
      await check(T + 'Divider with a text is named by it, a line on each side, the text between them', async () => {
        await mount('() => h(P.Divider, null, "or")');
        const d = await page.evaluate(() => { const e = document.querySelector('[role=separator]'), k = [...e.children].map((c) => c.getBoundingClientRect()), box = e.getBoundingClientRect();
          return { name: e.getAttribute('aria-label'), orient: e.getAttribute('aria-orientation'), kids: e.children.length, lines: e.querySelectorAll('.plx-divider__line').length, w0: k[0].width, w2: k[2].width, h: box.height }; });
        assert.equal(d.name, 'or'); assert.equal(d.orient, 'horizontal'); assert.equal(d.kids, 3); assert.equal(d.lines, 2); assert.ok(d.w0 > 50 && d.w2 > 50, 'both lines have room'); assert.ok(Math.abs(d.w0 - d.w2) < 2, 'the text is in the middle'); assert.ok(d.h < 40);
        const order = await page.evaluate(() => [...document.querySelector('[role=separator]').children].map((c) => c.className.replace('plx-divider__', ''))); assert.deepEqual(order, ['line', 'text', 'line']);
      });
      await check(T + 'a vertical Divider ignores a text', async () => {
        await mount('() => h("div", { style: { display: "flex", height: 40 } }, h(P.Divider, { orientation: "vertical" }, "or"))');
        assert.equal(await page.evaluate(() => document.querySelectorAll('.plx-divider__text').length), 0);
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'RATING_DIVIDER_808_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
