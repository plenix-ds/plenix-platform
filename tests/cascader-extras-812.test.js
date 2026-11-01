// Plenix · tests/cascader-extras-812.test.js: the Cascader's choosable parents, "+N" tags, limit on choices and server search (issue 812). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/cascader-extras-812.test.js   → CASCADER_EXTRAS_812_OK
// Cases, in left to right and right to left: choosableParents lists "All of …" first in a parent's column and Enter on it chooses the parent (value, path in the field, the
//   list closes); without the flag the column has only the children; a search lists a choosable parent too; with multiple a chosen parent becomes a tag; maxTags shows
//   that many tags then one "+N" tag (a Tab stop named "N more", its tooltip lists the others on focus, Enter opens the list), 0 shows all; maxChoices refuses the choice past
//   the limit, shows the message in the list and announces it; loadOptions waits for a pause in typing (one call), waits for minChars (fewer letters show the columns), drops a
//   late answer, shows a loading row, lists the matches with their paths and the typed text marked, announces the count, names the chosen result in the field, and a failed load
//   shows and announces its message.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };
const W = {
  ltr: { eu: 'Europe', all: 'All of Europe', fr: 'France', it: 'Italy', paris: 'Paris', lyon: 'Lyon', rome: 'Rome', milan: 'Milan', as: 'Asia', jp: 'Japan', tokyo: 'Tokyo', osaka: 'Osaka', q: 'Eur', s: 'ro', limit: 'You can choose up to 2.', fail: 'The matches could not be loaded', more: '2 more' },
  rtl: { eu: 'أوروبا', all: 'كل أوروبا', fr: 'فرنسا', it: 'إيطاليا', paris: 'باريس', lyon: 'ليون', rome: 'روما', milan: 'ميلانو', as: 'آسيا', jp: 'اليابان', tokyo: 'طوكيو', osaka: 'أوساكا', q: 'أور', s: 'رو', limit: 'يمكنك اختيار ٢ كحد أقصى.', fail: 'تعذّر تحميل النتائج', more: '٢ إضافية' }
};

(async () => {
  const PORT = +process.env.TEST_PORT || 9815, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 700, height: 460 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const w = W[dir], T = dir + ': ', into = dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight', back = dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
      const mount = (props, start) => page.evaluate(async (dir, w, props, start) => {
        document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        window.__root && window.__root.unmount(); window.__log = []; window.__calls = []; window.__live = []; document.querySelector('main').innerHTML = '<div id="c" style="padding:16px;max-inline-size:380px"></div>';
        new MutationObserver(() => { const t = [...document.querySelectorAll('[aria-live]')].map((e) => e.textContent).filter(Boolean).join('|'); if (t && window.__live[window.__live.length - 1] !== t) window.__live.push(t); }).observe(document.body, { subtree: true, childList: true, characterData: true });
        const h = React.createElement;
        const options = [{ id: 'eu', label: w.eu, children: [{ id: 'fr', label: w.fr, children: [{ id: 'pa', label: w.paris }, { id: 'ly', label: w.lyon }] }, { id: 'it', label: w.it, children: [{ id: 'ro', label: w.rome }, { id: 'mi', label: w.milan }] }] }, { id: 'as', label: w.as, children: [{ id: 'jp', label: w.jp, children: [{ id: 'to', label: w.tokyo }, { id: 'os', label: w.osaka }] }] }];
        const App = () => {
          const [v, setV] = React.useState(start === 'multi' ? ['pa', 'ly', 'ro', 'mi', 'to'] : (props.multiple ? [] : ''));
          const extra = {};
          if (props.loadOptions) extra.loadOptions = (text) => { window.__calls.push(text); return new Promise((res, rej) => setTimeout(() => (props.fail ? rej(new Error('x')) : res([{ id: 'ro', label: w.rome, path: [w.eu, w.it] }, { id: 'ar', label: w.rome + ' 2', path: [w.eu, w.fr] }].filter((x) => x.label.toLowerCase().indexOf(text.toLowerCase()) >= 0))), props.slowFor === text ? 700 : 80)); };
          return h(Plenix.Cascader, Object.assign({ label: 'Place', options, onChange: (x) => { window.__log.push(JSON.stringify(x)); setV(x); } }, props.multiple ? { multiple: true, values: v } : { value: v }, extra, props.rest || {}));
        };
        window.__root = ReactDOM.createRoot(document.getElementById('c')); window.__root.render(h(App)); await new Promise((r) => setTimeout(r, 600));
      }, dir, w, props, start);
      const open = async () => { await page.click('.plx-cascader__trigger'); await wait(400); };
      const texts = (sel) => page.evaluate((sel) => [...document.querySelectorAll(sel)].map((e) => e.textContent.trim()), sel);
      const col2 = () => page.evaluate(() => { const c = [...document.querySelectorAll('.plx-miller-columns__column')][1]; return c ? [...c.querySelectorAll('.plx-miller-columns__label')].map((e) => e.textContent) : null; });

      await check(T + 'choosableParents lists "All of …" first, and Enter on it chooses the parent', async () => {
        await mount({ rest: { choosableParents: true } }); await open(); await page.keyboard.press(into); await wait(200);
        assert.deepEqual(await col2(), [w.all, w.fr, w.it]); await page.keyboard.press('Enter'); await wait(300);
        assert.deepEqual(await page.evaluate(() => window.__log), ['"eu"']);
        assert.equal(await page.evaluate(() => document.querySelector('.plx-cascader__value').textContent), w.eu);
        assert.equal(await page.$('.plx-cascader__popup'), null);
      });
      await check(T + 'without the flag the column has only the children', async () => { await mount({}); await open(); await page.keyboard.press(into); await wait(200); assert.deepEqual(await col2(), [w.fr, w.it]); });
      await check(T + 'a search lists a choosable parent', async () => { await mount({ rest: { choosableParents: true, searchable: true } }); await open(); await page.keyboard.type(w.q); await wait(300); assert.deepEqual(await texts('.plx-cascader__match-label'), [w.eu]); });
      await check(T + 'with multiple a chosen parent is a tag', async () => {
        await mount({ multiple: true, rest: { choosableParents: true } }); await open(); await page.keyboard.press(into); await wait(200); await page.keyboard.press('Enter'); await wait(300);
        assert.deepEqual(await page.evaluate(() => window.__log), ['["eu"]']); assert.deepEqual(await texts('.plx-cascader__field .plx-tag'), [w.eu + '×']);
      });
      await check(T + 'maxTags shows that many tags and one "+N" tag, named, with the others in its tooltip', async () => {
        await mount({ multiple: true, rest: { maxTags: 3 } }, 'multi'); assert.equal((await texts('.plx-cascader__field .plx-tag')).length, 4);
        const m = await page.evaluate(() => { const e = document.querySelector('.plx-cascader__more'); return { label: e.getAttribute('aria-label'), tab: e.getAttribute('tabindex'), role: e.getAttribute('role') }; });
        assert.deepEqual(m, { label: w.more, tab: '0', role: 'button' });
        await page.focus('.plx-cascader__more'); await wait(500); assert.deepEqual(await texts('[role=tooltip]'), [w.milan + ', ' + w.tokyo]);
        await page.keyboard.press('Enter'); await wait(400); assert.ok(await page.$('.plx-cascader__popup'), 'Enter opens the list');
      });
      await check(T + 'maxTags 0 shows every tag', async () => { await mount({ multiple: true, rest: { maxTags: 0 } }, 'multi'); assert.equal((await texts('.plx-cascader__field .plx-tag')).length, 5); });
      await check(T + 'maxChoices refuses the choice past the limit, says so and announces it', async () => {
        await mount({ multiple: true, rest: { maxChoices: 2 } }); await open(); await page.keyboard.press(into); await page.keyboard.press(into); await wait(200);
        await page.keyboard.press('Enter'); await wait(150); await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await wait(150);
        assert.equal(await page.evaluate(() => window.__log.length), 2);
        await page.keyboard.press(back); await page.keyboard.press('ArrowDown'); await page.keyboard.press(into); await wait(200); await page.keyboard.press('Enter'); await wait(300);
        assert.equal(await page.evaluate(() => window.__log.length), 2, 'nothing chosen');
        assert.equal(await page.evaluate(() => document.querySelector('.plx-cascader__limit').textContent), w.limit);
        assert.ok((await page.evaluate(() => window.__live)).some((x) => x.indexOf(w.limit) >= 0), 'announced');
      });
      await check(T + 'server search: a pause in typing asks once, minChars waits, the columns stay for fewer letters', async () => {
        await mount({ rest: { searchable: true, minChars: 2 }, loadOptions: true }); await open(); await page.keyboard.type(w.s.slice(0, 1)); await wait(600);
        assert.deepEqual(await page.evaluate(() => window.__calls), []); assert.ok(await page.$('.plx-miller-columns'));
        await page.keyboard.type(w.s.slice(1)); await wait(150); assert.ok(await page.$('.plx-cascader__loading'), 'loading row'); await wait(900);
        assert.deepEqual(await page.evaluate(() => window.__calls), [w.s]);
        assert.deepEqual(await texts('.plx-cascader__match-label'), [w.rome, w.rome + ' 2']);
        assert.deepEqual(await texts('.plx-cascader__match-path'), [w.eu + ' / ' + w.it, w.eu + ' / ' + w.fr]);
        assert.equal((await texts('.plx-cascader__match-label .plx-match')).length, 2, 'the typed text is marked');
        assert.ok((await page.evaluate(() => window.__live)).length > 0, 'the count is announced');
        await page.keyboard.press('ArrowDown'); await page.keyboard.press('Enter'); await wait(300);
        assert.deepEqual(await page.evaluate(() => window.__log), ['"ar"']);
        assert.equal(await page.evaluate(() => document.querySelector('.plx-cascader__value').textContent), w.eu + ' / ' + w.fr + ' / ' + w.rome + ' 2');
      });
      await check(T + 'server search: fast typing asks once; a late answer is dropped', async () => {
        await mount({ rest: { searchable: true, loadDelay: 300 }, loadOptions: true }); await open(); await page.keyboard.type(w.s + w.s.slice(0, 1), { delay: 40 }); await wait(900);
        assert.equal((await page.evaluate(() => window.__calls)).length, 1);
        await mount({ rest: { searchable: true, loadDelay: 0 }, loadOptions: true, slowFor: w.s.slice(0, 1) }); await open(); await page.keyboard.type(w.s.slice(0, 1)); await wait(150); await page.keyboard.type(w.s.slice(1)); await wait(1200);
        assert.deepEqual(await texts('.plx-cascader__match-label'), [w.rome, w.rome + ' 2']);
      });
      await check(T + 'server search: a failed load shows and announces its message', async () => {
        await mount({ rest: { searchable: true, loadDelay: 0 }, loadOptions: true, fail: true }); await open(); await page.keyboard.type(w.s); await wait(500);
        assert.deepEqual(await texts('.plx-cascader__error'), [w.fail]); assert.ok((await page.evaluate(() => window.__live)).some((x) => x.indexOf(w.fail) >= 0));
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'CASCADER_EXTRAS_812_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
