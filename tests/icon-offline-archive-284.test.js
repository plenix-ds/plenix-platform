/* Plenix tests · the self-hosting archive draws icons with no network (issue 284).
   Summary: the archive of this checkout's release build (release/cdn/<version>/plenix-<version>.tgz) is extracted and served from one local address, and
     every request to any other address is blocked. A page that loads plenix.css, the archive's React files and plenix.js must draw, from the
     archive alone: a Material icon (icons/library/), a Plenix icon with no module registered (icons/plenix/), and, with plenix-icons-plenix.js loaded after
     plenix.js, the Plenix icons from their registered modules (no icon file asked for). Bare icon classes are retired (#557) and are not tested.
   The probe is proved able to see a missing asset first: the same page with icons/library/ answering 404 (a package that forgot its library) draws the Plenix icons
     but not the Material icon, so an archive without the folder would fail the cases after it.
   Usage: node tests/icon-offline-archive-284.test.js   (run by layout.test.js when the Icon component changed; needs the release build) */
const assert = require('assert/strict'), fs = require('fs'), os = require('os'), path = require('path'), http = require('http'), { execFileSync } = require('child_process');
const { launch } = require('./lib');
const ROOT = path.resolve(__dirname, '..'), VERSION = require(path.join(ROOT, 'package.json')).version;
const ARCHIVE = path.join(ROOT, 'release', 'cdn', VERSION, 'plenix-' + VERSION + '.tgz');
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.json': 'application/json' };
if (!fs.existsSync(ARCHIVE)) { console.log('icon-offline-archive-284: FAIL the release build is missing (' + ARCHIVE + '): run node build-packages.js first'); process.exit(1); }
const page = (extra) => '<!doctype html><html lang="en"><head><link rel="stylesheet" href="/plenix.css"><script src="/vendor/react.production.min.js"></script><script src="/vendor/react-dom.production.min.js"></script>'
  + '<script src="/plenix.js"></script>' + (extra || '') + '</head><body><div id="c"></div><script>window.__ready = true</script></body></html>';
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-284b-')); execFileSync('tar', ['xzf', ARCHIVE, '-C', dir]);
  let hideLibrary = false;
  const server = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://x');
    if (u.pathname === '/page' || u.pathname === '/page-registered') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end(page(u.pathname === '/page-registered' ? '<script src="/plenix-icons-plenix.js"></script>' : '')); }
    const file = path.join(dir, decodeURIComponent(u.pathname));
    if (!file.startsWith(dir) || (hideLibrary && u.pathname.startsWith('/icons/library/')) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' }); fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r)); const port = server.address().port;
  let browser;
  try {
    browser = await launch();
    const run = async (route) => {
      const p = await browser.newPage(); await p.setRequestInterception(true); const outside = [], files = [], errors = [];
      p.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
      p.on('request', (r) => {
        const u = new URL(r.url());
        if (u.hostname !== '127.0.0.1' || +u.port !== port) { if (!/^(data|blob):/.test(r.url())) outside.push(r.url()); return r.abort('blockedbyclient'); }
        if (/^\/icons\//.test(u.pathname)) files.push(u.pathname);
        r.continue();
      });
      await p.goto('http://127.0.0.1:' + port + route); await p.waitForFunction(() => window.__ready && window.Plenix, { timeout: 30000 });
      await p.evaluate(() => { const h = React.createElement, P = Plenix; ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, h(P.Icon, { name: 'rocket_launch' }), h(P.Icon, { name: 'settings-users' }), h(P.Icon, { name: 'add' }))); });
      await new Promise((r) => setTimeout(r, 2000));
      const drawn = await p.$$eval('#c .plx-icon', (a) => a.map((e) => e.querySelectorAll('svg path').length > 0));   // Material, Plenix by file, Plenix registered or by file
      await p.close();
      assert.deepEqual(errors, [], route + ': no script errors');
      return { drawn, files, outside };
    };
    // the probe sees a missing asset: no icons/library/ in the package
    hideLibrary = true;
    const lacking = await run('/page');
    assert.deepEqual(lacking.drawn, [false, true, true], 'the probe sees it: without icons/library/ the Material icon is empty and the Plenix icons still draw');
    hideLibrary = false;
    const plain = await run('/page');
    assert.deepEqual(plain.drawn, [true, true, true], 'every icon draws from the archive alone');
    assert.ok(plain.files.some((f) => f.startsWith('/icons/library/')) && plain.files.some((f) => f.startsWith('/icons/plenix/')), 'the files came from the archive (icons/library/ and icons/plenix/)');
    assert.deepEqual(plain.outside, [], 'nothing was asked of any other address');
    const registered = await run('/page-registered');
    assert.deepEqual(registered.drawn, [true, true, true], 'with the compatibility icon file, every icon draws');
    assert.ok(registered.files.every((f) => f.startsWith('/icons/library/')), 'the registered Plenix icons ask for no icon file (only the Material icon does)');
    assert.deepEqual(registered.outside, [], 'nothing was asked of any other address (registered)');
    console.log('icon-offline-archive-284: OK');
  } finally { if (browser) await browser.close(); server.close(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch((e) => { console.error(e); process.exit(1); });
