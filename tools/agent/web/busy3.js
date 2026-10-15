const fs = require('fs');
const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
const PORT = 8971, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const src = fs.readFileSync('D:/Documents/Projects/Projects_Applications/Plenix/tests/targets.test.js', 'utf8');
let fn = src.slice(src.indexOf('function measure('), src.indexOf('\n}\n', src.indexOf('function measure(')) + 2);
fn = fn.replace('while (d < lim) {', "while (d < lim) { if (++window.__c > 3e6) throw new Error('loop lim=' + lim + ' d=' + d + ' ' + (t.className || t.tagName) + ' ' + JSON.stringify(t.getBoundingClientRect()));");
fn = fn.replace('for (const { el, t } of targets) {', 'for (const { el, t } of targets) { window.__last = (t.className||t.tagName) + " " + (t.textContent||"").slice(0,20);');
(async () => {
  const server = await serve(PORT); const browser = await launch();
  const page = await browser.newPage(); await page.setViewport({ width: 1280, height: 900, hasTouch: true });
  const cdp = await page.target().createCDPSession();
  await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
  await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500);
  await cdp.send('Debugger.enable'); cdp.on('Debugger.paused', (e) => { console.log('PAUSED', e.callFrames.slice(0, 12).map((f) => f.functionName + '@' + f.url.split('/').pop() + ':' + f.location.lineNumber).join(' < ')); process.exit(0); });
  for (const h of ['', '#/foundations/design-tokens', '#/layout/grid', '#/content/text', '#/actions/button', '#/forms/fieldset', '#/navigation/application-header', '#/data-display/badge']) {
    if (h) { await page.evaluate((x) => { location.hash = x; }, h); await sleep(900); }
    const t0 = Date.now();
    try { const r = await Promise.race([page.evaluate('window.__c=0; (' + fn + ')(44, false)'), sleep(60000).then(() => { throw new Error('TIMEOUT'); })]); console.log(h, 'ok', r.n, r.fail.length, (Date.now() - t0) + 'ms'); for (let i = 0; i < 4; i++) { await sleep(500); const pg = await Promise.race([page.evaluate(() => document.querySelectorAll('*').length), sleep(5000).then(() => 'TIMEOUT')]); console.log('  ping', pg); if (pg === 'TIMEOUT') { cdp.send('Debugger.pause'); await sleep(10000); } } }
    catch (e) { console.log(h, 'ERR', e.message.slice(0, 400)); break; }
  }
})();
