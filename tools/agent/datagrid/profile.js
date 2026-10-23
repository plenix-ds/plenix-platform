// DataGrid profile: node tools/agent/datagrid/profile.js [rows] [action] [--cpu 4]
// Records a CPU profile in a headless Chrome while one action runs on bench.html (mount | scroll | sort | selectAll |
// search), then lists the functions that took the most self time and the most total time (top 25 each).
const { serve, launch } = require('../../../tests/lib.js');
const n = Number(process.argv[2] || 600), action = process.argv[3] || 'scroll';
const cpu = process.argv.includes('--cpu') ? Number(process.argv[process.argv.indexOf('--cpu') + 1]) : 1;
const PORT = 8794, paint = 'new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))';
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
  await cdp.send('Profiler.enable');
  await cdp.send('Profiler.setSamplingInterval', { interval: 200 });
  if (action === 'mount') await cdp.send('Profiler.start');
  await page.goto('http://localhost:' + PORT + '/Plenix/tools/agent/datagrid/bench.html?n=' + n, { waitUntil: 'load' });
  await page.waitForSelector('.plx-data-grid__grid-row');
  await page.evaluate(paint);
  if (action !== 'mount') { await cdp.send('Profiler.start'); await page.evaluate(ACTIONS[action]); }
  const { profile } = await cdp.send('Profiler.stop');
  const byId = new Map(profile.nodes.map((nd) => [nd.id, nd])), self = new Map(), total = new Map();
  const dt = profile.timeDeltas, counts = new Map();
  profile.samples.forEach((id, i) => counts.set(id, (counts.get(id) || 0) + (dt[i] || 0)));
  const parent = new Map(); profile.nodes.forEach((nd) => (nd.children || []).forEach((c) => parent.set(c, nd.id)));
  const name = (nd) => { const f = nd.callFrame; return (f.functionName || '(anonymous)') + ' ' + (f.url.split('/').pop() || '') + ':' + (f.lineNumber + 1); };
  for (const [id, us] of counts) {
    const nd = byId.get(id); self.set(name(nd), (self.get(name(nd)) || 0) + us);
    const seen = new Set(); for (let cur = id; cur != null; cur = parent.get(cur)) { const k = name(byId.get(cur)); if (!seen.has(k)) { seen.add(k); total.set(k, (total.get(k) || 0) + us); } }
  }
  const top = (m) => [...m].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([k, v]) => (v / 1000).toFixed(0).padStart(6) + 'ms  ' + k).join('\n');
  console.log('== ' + action + ', ' + n + ' rows, cpu x' + cpu + '\n-- self time\n' + top(self) + '\n-- total time\n' + top(total));
  await browser.close(); server.close(); process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
