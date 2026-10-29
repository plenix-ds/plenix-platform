/* Plenix tests · the ES module build finds its icons beside itself (issue 284).
   Summary: a page that imports plenix.esm.js under another file name (a bundler or a host that renames the Plenix files) used to have no icon
     address: the icon code found the library only through a script or stylesheet named plenix.js, plenix.css or platform.js on the page, so no icon
     file was asked for and nothing was drawn, unless the page set window.PlenixIconLibrary. The ES module build now carries its own address
     (const __plenixModuleUrl = import.meta.url) and Icon resolves the icon folders beside it.
   The test extracts the self-hosting archive of this checkout's release build (node build-packages.js; release/cdn/<version>/plenix-<version>.tgz), serves it
     from a made-up address under other names, and imports the bundle with an import map for React.
   The probe is proved able to see the old behavior first: the same bundle without the address line (what the old build was) asks for no icon and draws
     nothing. Then: renamed in assets/, the icon file is asked for beside the bundle and the icon is drawn; and the npm package's dist/index.js is left out on
     purpose (it carries no icon folder): no icon request.
   Usage: node tests/icon-module-url-284.test.js   (run by layout.test.js when the Icon component changed; needs the release build) */
const assert = require('assert/strict'), fs = require('fs'), os = require('os'), path = require('path'), { execFileSync } = require('child_process');
const { launch } = require('./lib');
const ROOT = path.resolve(__dirname, '..'), VERSION = require(path.join(ROOT, 'package.json')).version;
const ARCHIVE = path.join(ROOT, 'release', 'cdn', VERSION, 'plenix-' + VERSION + '.tgz'), VENDOR = path.join(ROOT, 'platform', 'vendor');
const ORIGIN = 'http://archive.test', LINE = 'const __plenixModuleUrl = import.meta.url;';
if (!fs.existsSync(ARCHIVE)) { console.log('icon-module-url-284: FAIL the release build is missing (' + ARCHIVE + '): run node build-packages.js first'); process.exit(1); }
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-284-')); execFileSync('tar', ['xzf', ARCHIVE, '-C', dir]);
  const esm = fs.readFileSync(path.join(dir, 'plenix.esm.js'), 'utf8');
  assert.ok(esm.includes(LINE), 'the ES module build carries its own address');
  let browser;
  try {
    browser = await launch();
    // case: the bundle's body, its URL path (under the made-up address), whether the page asks for icons
    const run = async (body, bundlePath) => {
      const page = await browser.newPage(); await page.setRequestInterception(true); const icons = [], errors = []; let shims = null;
      page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
      const iconRoot = bundlePath.slice(0, bundlePath.lastIndexOf('/') + 1) + 'icons/';
      page.on('request', (r) => {
        const u = new URL(r.url()); if (u.origin !== ORIGIN) return r.continue();
        const f = u.pathname, ok = (type, text) => r.respond({ status: 200, contentType: type, body: text });
        if (f === '/keys.html') return ok('text/html', '<!doctype html><script src="/react.js"></script><script src="/react-dom.js"></script>');
        if (f === '/react.js') return ok('text/javascript', fs.readFileSync(path.join(VENDOR, 'react.production.min.js')));
        if (f === '/react-dom.js') return ok('text/javascript', fs.readFileSync(path.join(VENDOR, 'react-dom.production.min.js')));
        if (f === '/shim-react.js') return ok('text/javascript', shims.react); if (f === '/shim-dom.js') return ok('text/javascript', shims.dom); if (f === '/shim-client.js') return ok('text/javascript', shims.client);
        if (f === '/index.html') return ok('text/html', '<!doctype html><html><head><script src="/react.js"></script><script src="/react-dom.js"></script><script type="importmap">{"imports":{"react":"/shim-react.js","react-dom":"/shim-dom.js","react-dom/client":"/shim-client.js"}}</script></head><body><div id="c"></div><script type="module">import * as P from "' + bundlePath + '"; window.__P = P;</script></body></html>');
        if (f === bundlePath) return ok('text/javascript', body);
        if (f.startsWith(iconRoot)) { icons.push(f); const file = path.join(dir, 'icons', f.slice(iconRoot.length)); return fs.existsSync(file) ? r.respond({ status: 200, contentType: 'image/svg+xml', body: fs.readFileSync(file) }) : r.respond({ status: 404, body: 'missing' }); }
        r.respond({ status: 404, body: 'missing' });
      });
      // React's names for the import map: the page's own UMD builds hold them
      await page.goto(ORIGIN + '/keys.html');
      const keys = await page.evaluate(() => ({ react: Object.keys(window.React), dom: Object.keys(window.ReactDOM) }));
      const named = (obj, names) => 'const O = window.' + obj + '; export default O;\n' + names.filter((n) => /^[A-Za-z_$][\w$]*$/.test(n) && n !== 'default').map((n) => 'export const ' + n + ' = O.' + n + ';').join('\n');
      shims = { react: named('React', keys.react), dom: named('ReactDOM', keys.dom), client: 'const O = window.ReactDOM; export const createRoot = O.createRoot, hydrateRoot = O.hydrateRoot;' };
      await page.goto(ORIGIN + '/index.html'); await page.waitForFunction(() => window.__P, { timeout: 30000 });
      await page.evaluate(() => { window.ReactDOM.createRoot(document.getElementById('c')).render(window.React.createElement(window.__P.Icon, { name: 'rocket_launch' })); });
      await new Promise((r) => setTimeout(r, 2000));
      const drawn = await page.evaluate(() => !!document.querySelector('#c path.plx-icon__glyph--20'));
      await page.close();
      assert.deepEqual(errors, [], 'no script errors');
      return { icons, drawn };
    };
    const old = await run(esm.replace(LINE, ''), '/assets/bundle-4f3a9c.js');
    assert.deepEqual([old.icons, old.drawn], [[], false], 'the probe sees the old behavior: without the address the renamed bundle asks for no icon and draws nothing');
    const now = await run(esm, '/assets/bundle-4f3a9c.js');
    assert.ok(now.icons.indexOf('/assets/icons/library/rocket_launch.svg') >= 0, 'the icon file is asked for beside the renamed bundle');
    assert.equal(now.drawn, true, 'the icon is drawn');
    const npm = await run(esm, '/node_modules/@plenix-ds/react/dist/index.js');
    assert.deepEqual([npm.icons, npm.drawn], [[], false], 'the npm package\'s dist/index.js has no icon folder: no icon request');
    console.log('icon-module-url-284: OK');
  } finally { if (browser) await browser.close(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch((e) => { console.error(e); process.exit(1); });
