// Snapshot the spec's final records (window.DSInventory) as JSON: functions as their source text. With "nomerge" the
// merge layer is switched off (DSParts.merges never fills), to see what each merge adds.
process.env.TEST_TIMEOUT_MS = '86400000';
const fs = require('fs');
const { serve, launch, sleep } = require('C:/Users/Administrator/Documents/Plenix/tests/lib.js');
const [mode, out, port] = [process.argv[2], process.argv[3], +(process.argv[4] || 9441)];
(async () => {
  const s = await serve(port), b = await launch(), p = await b.newPage();
  const errs = []; p.on('pageerror', (e) => errs.push(e.message));
  if (mode === 'nomerge') await p.evaluateOnNewDocument(() => { window.DSParts = { records: [], docs: [], errors: [], merges: { push() {}, length: 0, forEach() {} } }; });
  await p.goto('http://127.0.0.1:' + port + '/Plenix/platform/design-system/index.html', { waitUntil: 'load' }); await sleep(3000);
  const snap = await p.evaluate(() => {
    const ser = (v, d) => {
      if (d > 8) return '…';
      if (typeof v === 'function') return 'fn:' + String(v);
      if (Array.isArray(v)) return v.map((x) => ser(x, d + 1));
      if (v && typeof v === 'object') { if (v.$$typeof) return 'react-element'; const o = {}; Object.keys(v).sort().forEach((k) => { o[k] = ser(v[k], d + 1); }); return o; }
      return v;
    };
    return { records: window.DSInventory.map((r) => ser(r, 0)), redirects: window.DSRedirects || {}, labs: Object.keys((window.DS && window.DS.labs) || {}).sort() };
  });
  snap.errors = errs.concat(await p.evaluate(() => (window.DSParts.errors || []).slice()));
  fs.writeFileSync(out, JSON.stringify(snap));
  console.log(mode + ': ' + snap.records.length + ' records, ' + Object.keys(snap.redirects).length + ' redirects, errors ' + snap.errors.length);
  await b.close(); s.close();
})();
