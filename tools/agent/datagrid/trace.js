// DataGrid trace: node tools/agent/datagrid/trace.js [rows] [action] [--cpu 4]
// Records a Chrome timeline while one action runs on bench.html and sums the main thread's time by kind: script,
// style recalculation (with the elements it touched), layout (with its node count), paint, and the rest.
const { serve, launch } = require('../../../tests/lib.js');
const fs = require('fs'), os = require('os'), path = require('path');
const n = Number(process.argv[2] || 600), action = process.argv[3] || 'scroll';
const cpu = process.argv.includes('--cpu') ? Number(process.argv[process.argv.indexOf('--cpu') + 1]) : 1;
const PORT = 8795, paint = 'new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))';
const ACTIONS = {
  scroll: `(async()=>{const h=document.querySelector('.plx-data-grid__grid-tableholder');for(let i=0;i<20;i+=1){h.scrollTop+=400;await ${paint};}})()`,
  sort: `(async()=>{const c=document.querySelectorAll('.plx-data-grid__grid-col.plx-data-grid__grid-sortable')[3];c.click();await ${paint};c.click();await ${paint};})()`,
  selectAll: `(async()=>{document.querySelector('.plx-data-grid__grid-headers input[type=checkbox]').click();await ${paint};})()`,
  search: `(async()=>{for(const q of ['M','Ma','Mar']){window.__set.search(q);await ${paint};}})()`,
};
(async () => {
  const server = await serve(PORT), browser = await launch(), page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  const cdp = await page.target().createCDPSession();
  if (cpu > 1) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  const file = path.join(os.tmpdir(), 'plx-grid-trace.json');
  if (action === 'mount') await page.tracing.start({ path: file, categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline'] });
  await page.goto('http://localhost:' + PORT + '/Plenix/tools/agent/datagrid/bench.html?n=' + n, { waitUntil: 'load' });
  await page.waitForSelector('.plx-data-grid__grid-row');
  // --css "rules": an experiment: rules added to the page before the action (what costs paint)
  if (process.argv.includes('--css')) await page.addStyleTag({ content: process.argv[process.argv.indexOf('--css') + 1] });
  await page.evaluate(paint);
  if (action !== 'mount') { await page.tracing.start({ path: file, categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline'] }); await page.evaluate(ACTIONS[action]); }
  await page.tracing.stop();
  const events = JSON.parse(fs.readFileSync(file, 'utf8')).traceEvents || [];
  const main = events.filter((e) => e.name === 'RunTask' && e.ph === 'X');
  const tid = main.length ? main.sort((a, b) => b.dur - a.dur)[0].tid : null;
  const sum = {}, extra = { styleElements: 0, layoutNodes: 0, styleCount: 0, layoutCount: 0 };
  for (const e of events) {
    if (e.tid !== tid || e.ph !== 'X' || !e.dur) continue;
    const k = { FunctionCall: 'script', EvaluateScript: 'script', 'v8.compile': 'script', UpdateLayoutTree: 'style', Layout: 'layout', Paint: 'paint', PrePaint: 'paint', Layerize: 'paint', 'Commit': 'paint', 'ParseHTML': 'parse', 'GCEvent': 'gc', 'MinorGC': 'gc', 'MajorGC': 'gc' }[e.name];
    if (!k) continue;
    sum[k] = (sum[k] || 0) + e.dur / 1000;
    if (k === 'style') { extra.styleCount++; extra.styleElements += (e.args && e.args.elementCount) || 0; }
    if (k === 'layout') { extra.layoutCount++; const d = e.args && e.args.beginData; extra.layoutNodes += (d && d.dirtyObjects) || 0; }
  }
  console.log('== ' + action + ', ' + n + ' rows, cpu x' + cpu);
  console.log(Object.entries(sum).sort((a, b) => b[1] - a[1]).map(([k, v]) => k.padEnd(7) + Math.round(v) + 'ms').join('\n'));
  console.log('style recalcs ' + extra.styleCount + ' (' + extra.styleElements + ' elements), layouts ' + extra.layoutCount + ' (' + extra.layoutNodes + ' dirty objects)');
  await browser.close(); server.close(); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
