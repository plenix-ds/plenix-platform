// Plenix · tests/carousel-fit-883.test.js: a Carousel with several slides per view shows fewer in a narrow strip (issue 883). Opens a headless browser: run by the owner's test run, never by an agent.
//   node tests/carousel-fit-883.test.js   → CAROUSEL_FIT_883_OK
// Written first (proof first): fails on the code before the fix (three 65px slides in a 272px strip) and passes after it. In left to right and right to left:
//   in a 272px strip with perView 3 one slide shows, as wide as the strip less the peek (at least the least slide width) and the dots count one page per slide;
//   in a 640px strip perView 3 still shows three and three dots become one page less; perView 1 never changes; the strip's width changing (a resize) changes how many show;
//   no slide's text reaches past its own box.
const assert = require('assert/strict');
const shared = require('./check.js');
const { serve, launch } = require('./lib');
require('./limit.js');   // the hard time limit (TEST_TIMEOUT_MS)

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let passed = 0, failed = 0;
const check = async (name, fn) => { if (!shared.wanted(name)) return; try { await fn(); passed++; shared.record(name, true); } catch (e) { failed++; shared.record(name, false, e.message); console.log('FAIL ' + name + ': ' + e.message); } };

(async () => {
  const PORT = +process.env.TEST_PORT || 9823, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(); await page.setViewport({ width: 900, height: 600 });
    await page.goto('http://127.0.0.1:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'load' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    for (const dir of ['ltr', 'rtl']) {
      const T = dir + ': ';
      const mount = (width, perView, count = 6) => page.evaluate(async (dir, width, perView, count) => {
        window.__root && window.__root.unmount(); document.documentElement.setAttribute('dir', dir); document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
        document.querySelector('main').innerHTML = '<div id="c"></div>'; const h = React.createElement;
        window.__root = ReactDOM.createRoot(document.getElementById('c'));
        window.__root.render(h('div', { id: 'w', style: { width } }, h(Plenix.Carousel, { label: 'Items', perView }, Array.from({ length: count }, (_, i) => h('div', { key: i, className: 'slide-' + i }, 'Product number ' + (i + 1) + ' with a long title')))));
        await new Promise((r) => setTimeout(r, 600));
      }, dir, width, perView, count);
      const read = () => page.evaluate(() => {
        const track = document.querySelector('.plx-carousel__track'), t = track.getBoundingClientRect(), slides = [...track.children].map((s) => s.getBoundingClientRect());
        return { per: +document.querySelector('.plx-carousel').dataset.plxPerView, strip: Math.round(t.width), slide: Math.round(slides[0].width), dots: document.querySelectorAll('.plx-carousel__dot').length };
      });

      await check(T + 'perView 3 in a 272px strip shows one slide, at least the least slide width, one dot per slide', async () => {
        await mount(272, 3); const r = await read();
        assert.equal(r.per, 1); assert.ok(r.slide >= 152, 'slide ' + r.slide); assert.equal(r.dots, 6);
      });
      await check(T + 'perView 3 in a 640px strip still shows three, two pages', async () => {
        await mount(640, 3); const r = await read();
        assert.equal(r.per, 3); assert.ok(r.slide >= 152, 'slide ' + r.slide); assert.equal(r.dots, 2);
      });
      await check(T + 'perView 1 never changes', async () => {
        await mount(272, 1); assert.equal((await read()).per, 1);
      });
      await check(T + 'the strip getting wider shows more slides', async () => {
        await mount(272, 3); assert.equal((await read()).per, 1);
        await page.evaluate(() => { document.getElementById('w').style.width = '640px'; }); await wait(300);
        assert.equal((await read()).per, 3);
      });
      await check(T + 'a slide stays inside its box', async () => {
        await mount(272, 3);
        const over = await page.evaluate(() => [...document.querySelectorAll('[role=group]')].filter((s) => s.scrollWidth > s.clientWidth + 1).length);
        assert.equal(over, 0);
      });
    }
  } finally { if (browser) await browser.close(); server.close(); }
  console.log(failed ? '\n' + failed + ' failed, ' + passed + ' passed' : 'CAROUSEL_FIT_883_OK (' + passed + ' checks)');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
