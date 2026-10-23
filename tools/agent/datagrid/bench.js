// DataGrid benchmark: node tools/agent/datagrid/bench.js [600,5000] [--cpu 4] [--out file.json]
// Times, in a headless Chrome, from each change to the second animation frame after it (committed and painted):
// mount, typing a search (three keystrokes), clearing it, sorting a column (twice), select all, grouping, and scrolling
// (the longest frame while the body scrolls 30 steps). Median of 3 runs per size.
const path = require('path'), fs = require('fs');
const { serve, launch } = require('../../../tests/lib.js');
const sizes = (process.argv[2] || '600,5000').split(',').map(Number);
const out = process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null;
const PORT = 8793;

const paint = 'new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))';
async function run(page, n) {
  const t = {};
  const t0 = Date.now();
  await page.goto('http://localhost:' + PORT + '/Plenix/tools/agent/datagrid/bench.html?n=' + n, { waitUntil: 'load' });
  await page.waitForSelector('.plx-data-grid__grid-row');
  t.mount = await page.evaluate('(async()=>{await ' + paint + ';return performance.now()-window.__t0})()');
  await page.evaluate('window.__long=[];new PerformanceObserver(l=>window.__long.push(...l.getEntries())).observe({type:"longtask",buffered:false})');
  const time = (js) => page.evaluate('(async()=>{window.__long.length=0;const a=performance.now();' + js + ';await ' + paint + ';await new Promise(r=>setTimeout(r,50));const busy=window.__long.reduce((s,e)=>s+e.duration,0);return Math.max(performance.now()-a-50,busy)})()');
  t.search = [];
  for (const q of ['M', 'Ma', 'Mar']) t.search.push(await time('window.__set.search(' + JSON.stringify(q) + ')'));
  t.searchClear = await time('window.__set.search("")');
  const sortHead = "document.querySelectorAll('.plx-data-grid__grid-col.plx-data-grid__grid-sortable')[3]";
  t.sort = [await time(sortHead + '.click()'), await time(sortHead + '.click()')];
  t.selectAll = await time("document.querySelector('.plx-data-grid__grid-headers input[type=checkbox]').click()");
  t.selected = await page.evaluate("document.querySelectorAll('.plx-data-grid__grid-row input[type=checkbox]:checked').length");
  t.groupBy = await time('window.__set.groupBy("status")');
  t.ungroup = await time('window.__set.groupBy(undefined)');
  t.scrollLongestFrame = await page.evaluate(`(async()=>{const h=document.querySelector('.plx-data-grid__grid-tableholder');let worst=0;
    for(let i=0;i<30;i+=1){const a=performance.now();h.scrollTop+=400;await ${paint};worst=Math.max(worst,performance.now()-a);}return worst})()`);
  t.wall = Date.now() - t0;
  return t;
}
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  // --cpu N: slow the page's CPU N times (4 = a typical office laptop), so the costs show
  const cpu = process.argv.includes('--cpu') ? Number(process.argv[process.argv.indexOf('--cpu') + 1]) : 1;
  if (cpu > 1) { const cdp = await page.target().createCDPSession(); await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu }); }
  const result = {};
  for (const n of sizes) {
    const runs = [];
    for (let i = 0; i < 3; i += 1) runs.push(await run(page, n));
    const pick = (f) => Math.round(median(runs.map(f)));
    result[n] = { mount: pick((r) => r.mount), searchKey: pick((r) => Math.max(...r.search)), searchClear: pick((r) => r.searchClear), sort: pick((r) => Math.max(...r.sort)),
      selectAll: pick((r) => r.selectAll), checkedAfterSelectAll: pick((r) => r.selected), groupBy: pick((r) => r.groupBy), ungroup: pick((r) => r.ungroup), scrollLongestFrame: pick((r) => r.scrollLongestFrame) };
    console.log(n + ' rows: ' + Object.entries(result[n]).map(([k, v]) => k + ' ' + v + 'ms').join(', '));
  }
  if (out) fs.writeFileSync(out, JSON.stringify(result, null, 1));
  await browser.close();
  if (server && server.close) server.close();
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
