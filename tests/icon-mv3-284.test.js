/* Plenix tests · a Chrome Manifest V3 extension draws Plenix icons with no remote code (issue 284).
   Summary: the self-hosting archive of this checkout's release build is unpacked into a made-up extension (manifest_version 3, a service worker, a popup page that loads the
     archive's plenix.css, React files and plenix.js and a script file of its own, so the default extension content security policy applies: scripts only from the
     extension itself). Chrome loads it (puppeteer's enableExtensions), the popup page draws a Material icon (icons/library/), a Plenix icon (icons/plenix/) and
     one more Plenix icon, and every request must be to the extension itself: no remote address, no CSP violation, no script error.
   The probe is proved able to see a violation first: a second popup page with an inline script and a script from a remote address makes Chrome refuse both ("violates the following Content Security Policy directive"),
     and the test reads those messages.
   Usage: node tests/icon-mv3-284.test.js   (run by layout.test.js when the Icon component changed; needs the release build) */
const assert = require('assert/strict'), fs = require('fs'), os = require('os'), path = require('path'), { execFileSync } = require('child_process');
const { launch } = require('./lib');
const ROOT = path.resolve(__dirname, '..'), VERSION = require(path.join(ROOT, 'package.json')).version;
const ARCHIVE = path.join(ROOT, 'release', 'cdn', VERSION, 'plenix-' + VERSION + '.tgz');
if (!fs.existsSync(ARCHIVE)) { console.log('icon-mv3-284: FAIL the release build is missing (' + ARCHIVE + '): run node build-packages.js first'); process.exit(1); }
const HEAD = '<meta charset="utf-8"><link rel="stylesheet" href="plenix.css"><script src="vendor/react.production.min.js"></script><script src="vendor/react-dom.production.min.js"></script><script src="plenix.js"></script>';
(async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'plenix-284c-')); execFileSync('tar', ['xzf', ARCHIVE, '-C', dir]);
  fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify({ manifest_version: 3, name: 'Plenix icons fixture', version: '1.0', background: { service_worker: 'sw.js' }, action: { default_popup: 'popup.html' } }));
  fs.writeFileSync(path.join(dir, 'sw.js'), '// the fixture has no background work\n');
  fs.writeFileSync(path.join(dir, 'popup.js'), "const h = React.createElement, P = Plenix; ReactDOM.createRoot(document.getElementById('c')).render(h('div', null, h(P.Icon, { name: 'rocket_launch' }), h(P.Icon, { name: 'settings-users' }), h(P.Icon, { name: 'add' }))); window.__drawn = true;\n");
  fs.writeFileSync(path.join(dir, 'popup.html'), '<!doctype html><html lang="en"><head>' + HEAD + '<script src="popup.js" defer></script></head><body><div id="c"></div></body></html>');
  // the control: what the default policy refuses
  fs.writeFileSync(path.join(dir, 'violation.html'), '<!doctype html><html lang="en"><head>' + HEAD + '<script src="https://remote.invalid/code.js"></script><script>window.__inline = true</script></head><body><div id="c"></div></body></html>');
  let browser;
  try {
    browser = await launch({ enableExtensions: [dir] });
    const worker = await browser.waitForTarget((t) => t.type() === 'service_worker' && /^chrome-extension:/.test(t.url()), { timeout: 30000 });
    const origin = 'chrome-extension://' + new URL(worker.url()).host;   // Node reports the origin of a chrome-extension address as "null"
    const open = async (file, ready) => {
      const page = await browser.newPage(), messages = [], outside = [], errors = [];
      page.on('console', (m) => messages.push(m.text())); page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
      page.on('request', (r) => { if (!/^(chrome-extension|data|blob):/.test(r.url())) outside.push(r.url()); });
      await page.goto(origin + '/' + file); if (ready) await page.waitForFunction(() => window.__drawn, { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 2000));
      const drawn = await page.$$eval('#c .plx-icon', (a) => a.map((e) => e.querySelectorAll('svg path').length > 0));
      await page.close(); return { messages, outside, errors, drawn };
    };
    const bad = await open('violation.html', false);
    assert.ok(bad.messages.some((m) => /violates the following Content Security Policy/.test(m)), 'the probe sees it: the default policy refuses an inline script and a remote one');
    const ok = await open('popup.html', true);
    assert.deepEqual(ok.drawn, [true, true, true], 'the popup draws a Material icon and two Plenix icons from the extension\'s own files');
    assert.deepEqual(ok.outside, [], 'every request is to the extension itself');
    assert.deepEqual(ok.messages.filter((m) => /Refused to|Content Security Policy/i.test(m)), [], 'no content security policy violation');
    assert.deepEqual(ok.errors, [], 'no script errors');
    console.log('icon-mv3-284: OK');
  } finally { if (browser) await browser.close(); fs.rmSync(dir, { recursive: true, force: true }); }
})().catch((e) => { console.error(e); process.exit(1); });
