// Icon paint probe: node tools/agent/datagrid/icon-paint.js [icons] [--css "rules"] [--inline]
// Replaces the page's icons with fresh ones 10 times and sums the main thread's paint and style time (Chrome trace).
// --inline draws the same icons as inline SVG paths (icon-paint-inline.html), the comparison case.
const { serve, launch } = require('../../../tests/lib.js');
const fs = require('fs'), os = require('os'), path = require('path');
const n = Number(process.argv[2] || 300), PORT = 8802;
(async () => {
  const server = await serve(PORT), browser = await launch(), page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:' + PORT + '/Plenix/tools/agent/datagrid/' + (process.argv.includes('--inline') ? 'icon-paint-inline.html' : 'icon-paint.html'), { waitUntil: 'load' });
  if (process.argv.includes('--css')) await page.addStyleTag({ content: process.argv[process.argv.indexOf('--css') + 1] });
  await page.evaluate((k) => { window.__add(k); return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); }, n);
  const file = path.join(os.tmpdir(), 'plx-icon-trace.json');
  await page.tracing.start({ path: file, categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline'] });
  await page.evaluate(async (k) => { for (let i = 0; i < 10; i += 1) { window.__add(k); await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))); } }, n);
  await page.tracing.stop();
  const ev = JSON.parse(fs.readFileSync(file, 'utf8')).traceEvents, sum = {};
  for (const e of ev) if (e.ph === 'X' && /^(Paint|PaintImage|RasterTask|UpdateLayoutTree|Layout|Decode Image|ImageDecodeTask)$/.test(e.name)) sum[e.name] = Math.round(((sum[e.name] || 0) + e.dur / 1000) * 10) / 10;
  console.log(n + ' icons x10: ' + JSON.stringify(sum));
  await browser.close(); server.close(); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
