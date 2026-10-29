/* Plenix tests · a failed icon file is asked for once more (issue 283).
   Summary: an icon that Plenix loads at run time (a Material name no module or icon file registers) fetches its file. A network failure or a server
     error (5xx) is tried once more after a short pause; a file that is not there (404) is asked for once; two failures draw nothing for the session.
   The probe is proved able to see the old behavior first: before the retry, a failure on the first request left the icon empty for the session (one
     request, nothing drawn). So the case "first request fails" must now show two requests and the icon drawn.
   Each case is one fresh page; the first outline file (rocket_launch.svg) is the one made to fail, and "drawn" means its 20px outline path is in the icon.
   Usage: node tests/icon-retry-283.test.js   (run by layout.test.js when the Icon component changed) */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// [mode, requests, drawn]
const CASES = [['ok', 1, true], ['fail-once', 2, true], ['503-once', 2, true], ['fail-twice', 2, false], ['404', 1, false]];
(async () => {
  const PORT = +process.env.TEST_PORT || 9629, server = await serve(PORT); let browser;
  try {
    browser = await launch(); const errors = [];
    for (const [mode, requests, drawn] of CASES) {
      const page = await browser.newPage(); page.on('pageerror', (e) => errors.push(mode + ': ' + e.message)); let n = 0;
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        if (/\/rocket_launch\.svg/.test(r.url())) {
          n++;
          if ((mode === 'fail-once' && n === 1) || mode === 'fail-twice') return r.abort('failed');
          if (mode === '503-once' && n === 1) return r.respond({ status: 503, body: 'unavailable' });
          if (mode === '404') return r.respond({ status: 404, body: 'missing' });
        }
        r.continue();
      });
      await page.goto('http://localhost:' + PORT + '/Plenix/tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 });
      await page.evaluate(() => { document.querySelector('main').innerHTML = '<div id="c"></div>'; ReactDOM.createRoot(document.getElementById('c')).render(React.createElement(window.Plenix.Icon, { name: 'rocket_launch' })); });
      await wait(2000);
      const has = await page.evaluate(() => !!document.querySelector('#c path.plx-icon__glyph--20'));
      assert.equal(n, requests, mode + ': requests for the file');
      assert.equal(has, drawn, mode + ': the icon is ' + (drawn ? 'drawn' : 'empty'));
      await page.close();
    }
    assert.deepEqual(errors, [], 'no script errors');
    console.log('icon-retry-283: OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
