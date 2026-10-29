/* Plenix tests · remembered widths per monitor (issue 463, option C, step 3): the side panel's dragged width is saved per monitor, the monitor named by
   its physical size (screen size times devicePixelRatio, to the nearest 10px), so browser zoom does not change it. One saved value per panel per monitor; the single value saved before carries over as the current monitor's;
   a saved width is used only when it still fits the window (the limits of step 1).
   Summary: with the side panel's limit raised to 1600px: (A) an old single value of 480 on a 1920x1080 monitor shows 480 and is stored under
     "1920x1080"; (B) a 2560x1440 monitor has no value yet, so the panel starts at its default, and End there saves 1600 under "2560x1440";
     (C) the first monitor still shows 480; (D) in a 1000px window the 1600 does not fit (90% is 900), so the default shows and the value is kept;
     (E) in a 2000px window it comes back.
   Usage: node tests/monitor-widths.test.js   (run by layout.test.js when AppShell or the side panel changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
// a monitor as the page sees it: the screen size in CSS pixels and devicePixelRatio (a browser zoomed to 150% reports 1280x720 at ratio 1.5 on a 1920x1080 monitor)
const SCREEN = (w, h, r) => 'Object.defineProperty(window.screen,"width",{get:()=>' + w + '});Object.defineProperty(window.screen,"height",{get:()=>' + h + '});Object.defineProperty(window,"devicePixelRatio",{get:()=>' + (r || 1) + '});';
(async () => {
  const PORT = +process.env.TEST_PORT || 9618, server = await serve(PORT); let browser;
  try {
    browser = await launch();
    const url = 'http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html';
    const visit = async (windowWidth, screen, setup) => {
      const page = await browser.newPage(); const errors = [];
      page.on('pageerror', (e) => errors.push(e.message));
      await page.evaluateOnNewDocument(SCREEN(screen[0], screen[1], screen[2]));
      await page.setViewport({ width: windowWidth, height: 800 });
      if (setup) { await page.goto(url, { waitUntil: 'domcontentloaded' }); await page.evaluate(setup); }
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(() => {
        document.documentElement.style.setProperty('--plx-comp-side-panel-width-max', '1600px');
        document.querySelector('main').innerHTML = '<div id="c"></div>';
        ReactDOM.createRoot(document.getElementById('c')).render(React.createElement(window.Plenix.SidePanel, { title: 'Details', open: true, resizable: true }, 'x'));
      });
      await new Promise((r) => setTimeout(r, 500));
      return { page, errors, width: () => page.evaluate(() => Math.round(document.querySelector('.plx-side-panel').getBoundingClientRect().width)), store: () => page.evaluate(() => JSON.parse(localStorage.getItem('plenix.paneWidths') || 'null')) };
    };
    let v = await visit(1600, [1920, 1080], () => { localStorage.clear(); localStorage.setItem('plenix.sidePanelWidth', '480'); });
    assert.equal(await v.width(), 480, 'A: the old single value is this monitor\'s value');
    assert.deepEqual(await v.store(), { side: { '1920x1080': 480 } }, 'A: stored under the monitor');
    await v.page.close();
    v = await visit(2000, [2560, 1440]);
    const start = await v.width();
    assert.ok(start < 480, 'B: another monitor starts at the default, not at the first monitor\'s 480');
    await v.page.evaluate(() => document.querySelector('.plx-panel-splitter').focus());
    await v.page.keyboard.press('End'); await new Promise((r) => setTimeout(r, 300));
    assert.equal(await v.width(), 1600, 'B: End goes to the limit');
    assert.deepEqual(await v.store(), { side: { '1920x1080': 480, '2560x1440': 1600 } }, 'B: both monitors kept');
    await v.page.close();
    v = await visit(1600, [1920, 1080]); assert.equal(await v.width(), 480, 'C: the first monitor keeps its own'); await v.page.close();
    // zoom is not a monitor: 150% and 200% browser zoom on the same 1920x1080 monitor report 1280x720 at ratio 1.5 and 960x540 at ratio 2; the saved width stays
    for (const screen of [[1280, 720, 1.5], [960, 540, 2], [1920, 1080, 1]]) { v = await visit(1600, screen); assert.equal(await v.width(), 480, 'Z: zoom ' + screen.join(' ') + ' keeps the monitor\'s width'); assert.deepEqual(Object.keys((await v.store()).side).sort(), ['1920x1080', '2560x1440'], 'Z: no new monitor appears when zoom changes'); await v.page.close(); }
    // a size a few pixels off the stored one is the same monitor (a rounding edge at an odd zoom step): 1920x1080 stored, 1914x1076 reported, still 480
    v = await visit(1600, [1914, 1076, 1]); assert.equal(await v.width(), 480, 'N: a monitor within 10px of a stored one shares its width'); assert.deepEqual(Object.keys((await v.store()).side).sort(), ['1920x1080', '2560x1440'], 'N: no new key'); await v.page.close();
    v = await visit(1000, [2560, 1440]); assert.equal(await v.width(), start, 'D: 1600 does not fit a 1000px window: the default'); assert.deepEqual((await v.store()).side['2560x1440'], 1600, 'D: and it is kept'); await v.page.close();
    v = await visit(2000, [2560, 1440]); assert.equal(await v.width(), 1600, 'E: it comes back when it fits'); assert.deepEqual(v.errors, [], 'no script errors'); await v.page.close();
    console.log('monitor-widths: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
