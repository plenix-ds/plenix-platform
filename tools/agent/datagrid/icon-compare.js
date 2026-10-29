// Icon comparison (issue 286): two published CDN builds side by side, size, speed and pixels. A quick-check tool, not a test.
//   node tools/agent/datagrid/icon-compare.js [--a 0.69.3] [--b 0.75.0] [--out docs/briefs/icons/compare.md] [--only size,paint,pixels] [--runs 5]
// Reads https://design-system.lighthouseway.org/cdn/<version>/ (the files are public) and the St. John site's icon file when SITE_DIR (default
// ../st-john-test-site) has one. Writes only the report file. Chrome: CHROME_PATH or the usual places.
//   size    plenix.css, plenix.min.css, plenix.js, plenix.esm.js and the archive, raw, gzip (level 9) and Brotli; the icon data inside plenix.css;
//           an app using 75 icons: what each build ships for them.
//   paint   first paint and the time until every icon is drawn, on an icon-light page (5 icons) and an icon-heavy page (150), the median of --runs runs per
//           build, cache off, the live CDN (the numbers move with the network: compare the two builds of one run, not two runs).
//   pixels  every Plenix icon both builds have, at xs, sm, md and lg, outline and filled, in the Compact and Comfortable densities, plus a fixed sample
//           of the Material library (every 14th symbol, in Compact); each cell's pixels are compared (a pixel differs when a channel differs by more
//           than 24); the report lists the cells that differ. The grid benchmark (bench.js) runs against a checkout, not a published build, and is not part of this.
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const arg = (name, fallback) => { const i = process.argv.indexOf('--' + name); return i >= 0 ? process.argv[i + 1] : fallback; };
const A = arg('a', '0.69.3'), B = arg('b', '0.75.0'), RUNS = +arg('runs', 5);
const OUT = path.resolve(arg('out', 'docs/briefs/icons/compare.md')), ONLY = arg('only', 'size,paint,pixels').split(',');
const CDN = 'https://design-system.lighthouseway.org/cdn/', ORIGIN = 'http://compare.test';
// the https module, not fetch: Node's fetch (undici) can fail with an assertion on a closed connection while a large file downloads
const https = require('https');
const request = (url, method) => new Promise((resolve, reject) => { const r = https.request(url, { method: method || 'GET' }, (res) => { const parts = []; res.on('data', (d) => parts.push(d)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: Buffer.concat(parts) })); res.on('error', reject); }); r.on('error', reject); r.end(); });
const get = async (url) => { let last; for (let i = 0; i < 3; i++) { try { const r = await request(url); if (r.status !== 200) throw new Error(r.status + ' ' + url); return r.body; } catch (e) { last = e; await new Promise((r) => setTimeout(r, 500)); } } throw last; };
const kb = (n) => (n / 1024).toFixed(1) + ' KB', mb = (n) => (n / 1048576).toFixed(2) + ' MB';
const gz = (b) => zlib.gzipSync(b, { level: 9 }).length, br = (b) => zlib.brotliCompressSync(b).length;
const median = (a) => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
const lines = [];
const out = (s = '') => lines.push(s);

async function sizes() {
  out('## Size'); out();
  out('Files of the published builds, raw and compressed (gzip level 9, Brotli default).'); out();
  out('| File | ' + A + ' raw | ' + A + ' gzip | ' + A + ' Brotli | ' + B + ' raw | ' + B + ' gzip | ' + B + ' Brotli |'); out('|---|---:|---:|---:|---:|---:|---:|');
  const files = ['plenix.css', 'plenix.min.css', 'plenix.js', 'plenix.esm.js'], bufs = {};
  for (const v of [A, B]) for (const f of files) bufs[v + f] = await get(CDN + v + '/' + f);
  for (const f of files) out('| ' + f + ' | ' + [A, B].map((v) => kb(bufs[v + f].length) + ' | ' + kb(gz(bufs[v + f])) + ' | ' + kb(br(bufs[v + f]))).join(' | ') + ' |');
  const tgz = {};
  for (const v of [A, B]) { const r = await request(CDN + v + '/plenix-' + v + '.tgz', 'HEAD'); tgz[v] = r.status === 200 ? Number(r.headers['content-length']) : null; }
  out('| the self-hosting archive (.tgz) | ' + (tgz[A] ? kb(tgz[A]) : 'none') + ' | | | ' + (tgz[B] ? kb(tgz[B]) : 'none') + ' | | |'); out();
  const iconData = (b) => { const text = b.toString('utf8'); let n = 0, count = 0; for (const m of text.matchAll(/url\("?data:image\/svg\+xml[^")]*"?\)/g)) { n += m[0].length; count++; } return { bytes: n, count }; };
  const da = iconData(bufs[A + 'plenix.css']), db = iconData(bufs[B + 'plenix.css']);
  out('**Icon drawings inside `plenix.css`** (data addresses): ' + A + ': ' + da.count + ' of them, ' + kb(da.bytes) + '; ' + B + ': ' + db.count + ', ' + kb(db.bytes) + '.'); out();
  // an app using 75 icons: each build's cost for them
  const index = JSON.parse((await get(CDN + B + '/icons/plenix/index.json')).toString('utf8')), cssA = bufs[A + 'plenix.css'].toString('utf8');
  const common = index.icons.map((i) => i.name).filter((n) => cssA.includes('.plx-icon--' + n)).sort();
  const step = Math.max(1, Math.floor(common.length / 75)), seventyFive = common.filter((_, i) => i % step === 0).slice(0, 75);
  let rawBytes = 0, gzBytes = 0;
  for (const n of seventyFive) for (const x of ['', '-fill', '-24', '-24-fill']) { const f = await get(CDN + B + '/icons/plenix/' + n + x + '.svg'); rawBytes += f.length; gzBytes += gz(f); }
  out('**An app using ' + seventyFive.length + ' Plenix icons:** in ' + A + ' every icon is in `plenix.css`, so the app pays for the whole set (' + kb(da.bytes) + ' raw) however few it names. In ' + B + ' the icons are separate files fetched when used: the ' + seventyFive.length + ' names come to ' + (seventyFive.length * 4) + ' small files, ' + kb(rawBytes) + ' raw (' + kb(gzBytes) + ' gzip, each file gzipped alone); with a site icon file (`tools/icons/site-icons.js`) they are one registered file.');
  const siteFile = path.join(path.resolve(process.env.SITE_DIR || path.join(__dirname, '..', '..', '..', '..', 'st-john-test-site')), 'site', 'assets', 'plenix-icons-st-john.js');
  if (fs.existsSync(siteFile)) { const b = fs.readFileSync(siteFile); out('The St. John site\'s own icon file: ' + kb(b.length) + ' raw, ' + kb(gz(b)) + ' gzip.'); }
  out();
  const ra = bufs[A + 'plenix.css'].length + bufs[A + 'plenix.js'].length, rb = bufs[B + 'plenix.css'].length + bufs[B + 'plenix.js'].length;
  out('**Reading it plainly:** `plenix.css` is ' + kb(bufs[A + 'plenix.css'].length - bufs[B + 'plenix.css'].length) + ' smaller (the icon drawings left it). `plenix.js` is ' + kb(bufs[B + 'plenix.js'].length - bufs[A + 'plenix.js'].length) + ' bigger: it also holds everything the library gained between the two builds, so the two files together are ' + (rb > ra ? kb(rb - ra) + ' bigger' : kb(ra - rb) + ' smaller') + ' raw. The icon change alone is the icon-data line above; the rest is other work.'); out();
  return { common, bufs };
}

async function browserSetup() {
  const puppeteer = require('puppeteer-core');
  const exe = process.env.CHROME_PATH || ['/usr/bin/google-chrome', '/usr/bin/chromium', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find((p) => fs.existsSync(p));
  return puppeteer.launch({ executablePath: exe, headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
}
// a page of one build: its stylesheet, React and Plenix from the CDN, then the page's own script
const pageHtml = (v, body, density, registered) => '<!doctype html><html lang="en" data-plx-density="' + (density || 'compact') + '"><head><meta charset="utf-8"><link rel="stylesheet" href="' + CDN + v + '/plenix.css"><script src="' + CDN + v + '/vendor/react.production.min.js"></script><script src="' + CDN + v + '/vendor/react-dom.production.min.js"></script><script src="' + CDN + v + '/plenix.js"></script>' + (registered ? '<script src="' + CDN + v + '/plenix-icons-plenix.js"></script>' : '') + '</head><body style="margin:0"><div id="c"></div><script>' + body + '</script></body></html>';
async function openPage(browser, v, body, density, opts = {}) {   // opts.registered: the compatibility icon file after plenix.js (every Plenix icon registered, no run-time fetch)
  const page = await browser.newPage(); await page.setViewport({ width: opts.width || 1200, height: opts.height || 900, deviceScaleFactor: 1 });
  await page.setCacheEnabled(false); await page.setRequestInterception(true);
  const LIB = path.join(__dirname, '..', '..', '..', 'platform', 'icons', 'library');
  page.on('request', (r) => {
    const url = r.url(), lib = opts.localLibrary && /\/cdn\/material\/[0-9a-f]+\/([^/?]+\.svg)(\?|$)/.exec(url);
    if (url === ORIGIN + '/page.html') return r.respond({ status: 200, contentType: 'text/html', body: pageHtml(v, body, density, opts.registered) });
    // the pixel runs read the Material files from this checkout's library (the same files as the CDN's /cdn/material/<commit>/): the live CDN refuses a burst of hundreds of requests
    if (lib && fs.existsSync(path.join(LIB, lib[1]))) return r.respond({ status: 200, contentType: 'image/svg+xml', headers: { 'access-control-allow-origin': '*' }, body: fs.readFileSync(path.join(LIB, lib[1])) });
    return r.continue();
  });
  await page.goto(ORIGIN + '/page.html', { waitUntil: 'load', timeout: 120000 });
  return page;
}

async function paint(common) {
  out('## Speed'); out();
  out('First paint and the time until the icons are drawn, in Chrome, cache off, from the live CDN; the median of ' + RUNS + ' runs per case. The cases ran in turn in one session; network noise is in all of them. Three cases: ' + A + ' as it is; ' + B + ' as it is (every icon a page names is fetched when it is first drawn); and ' + B + ' with the compatibility icon file `plenix-icons-plenix.js` (every Plenix icon registered, nothing fetched), which is what the release README recommends for production (a site\'s own icon file is smaller).'); out();
  out('"Icons drawn" is when the last drawing appeared (no new one for 0.8 s after it); "paths" counts the drawings that appeared (each icon has a 20px and a 24px one); "failed" is the median number of icon-file requests the network refused.'); out();
  const light = common.slice(0, 5), heavy = common.slice(0, 150), CASES = [[A, false, A], [B, false, B + ' as it is'], [B, true, B + ' + icon file']];
  const browser = await browserSetup(); const rows = [];
  try {
    for (const [label, names] of [['icon-light (' + light.length + ' icons)', light], ['icon-heavy (' + heavy.length + ' icons)', heavy]]) {
      const cells = [];
      for (const [v, registered] of CASES) {
        const fcp = [], drawn = [], counts = [], failed = [];
        for (let i = 0; i < RUNS; i++) {
          const body = "var N=" + JSON.stringify(names) + ";var h=React.createElement;ReactDOM.createRoot(document.getElementById('c')).render(h('div',{style:{display:'flex',flexWrap:'wrap',gap:4}},N.map(function(n){return h(Plenix.Icon,{key:n,name:n,size:'md'})})));var last=0,count=-1,since=performance.now();(function w(){var c=document.querySelectorAll('#c .plx-icon svg path').length;var now=performance.now();if(c!==count){count=c;last=now;since=now}if(now-since>800&&c>0){window.__drawn=last;window.__count=c}else requestAnimationFrame(w)})();";
          let refused = 0;
          const page = await openPage(browser, v, body, 'compact', { registered });
          page.on('requestfailed', (r) => { if (/\/icons\//.test(r.url())) refused++; });
          await page.waitForFunction(() => window.__drawn, { timeout: 120000 });
          const m = await page.evaluate(() => ({ fcp: (performance.getEntriesByName('first-contentful-paint')[0] || {}).startTime || 0, drawn: window.__drawn, count: window.__count }));
          fcp.push(m.fcp); drawn.push(m.drawn); counts.push(m.count); failed.push(refused); await page.close();
        }
        cells.push(median(fcp).toFixed(0) + ' ms | ' + median(drawn).toFixed(0) + ' ms | ' + median(counts) + ' | ' + median(failed));
      }
      rows.push('| ' + label + ' | ' + cells.join(' | ') + ' |');
    }
  } finally { await browser.close(); }
  out('| Page | ' + CASES.map((c) => c[2] + ' first paint | icons drawn | paths | failed').join(' | ') + ' |'); out('|---|' + CASES.map(() => '---:|---:|---:|---:|').join('') ); rows.forEach((r) => out(r)); out();
}

// every cell of a grid: its box in the screenshot. The icons are shown group by group (a burst of hundreds of file requests makes the live CDN refuse some, and an icon whose file failed stays empty),
// each group after the network is quiet
const SIZES = ['xs', 'sm', 'md', 'lg'], CELL = 32, COLS = 36, GROUP = 20;
async function gridShot(browser, v, names, density, registered) {
  const body = "var N=" + JSON.stringify(names) + ",S=" + JSON.stringify(SIZES) + ";var cells=[];N.forEach(function(n){S.forEach(function(s){[false,true].forEach(function(f){cells.push({n:n,s:s,f:f})})})});var h=React.createElement;function Grid(){var st=React.useState(0);window.__setLimit=st[1];var limit=st[0];return h('div',{style:{display:'grid',gridTemplateColumns:'repeat(" + COLS + "," + CELL + "px)',gridAutoRows:'" + CELL + "px',alignItems:'center',justifyItems:'center',color:'#000',background:'#fff'}},cells.map(function(c,i){return h('div',{key:i,style:{display:'flex'}},i<limit?h(Plenix.Icon,{name:c.n,size:c.s,filled:c.f}):null)}))}ReactDOM.createRoot(document.getElementById('c')).render(h(Grid));window.__cells=cells.length;";
  const rowsCount = Math.ceil(names.length * SIZES.length * 2 / COLS);
  const page = await openPage(browser, v, body, density, { width: COLS * CELL, height: rowsCount * CELL, registered, localLibrary: true });
  const seen = { failed: 0, status: {} }; if (process.env.ICON_COMPARE_SHOTS) { page.on('requestfailed', (r) => { if (/\/icons\/|\/material\//.test(r.url())) { seen.failed++; seen.last = r.failure().errorText + ' ' + r.url().split('/').slice(-2).join('/'); } }); page.on('response', (r) => { if (/\/material\/|\/icons\//.test(r.url())) seen.status[r.status()] = (seen.status[r.status()] || 0) + 1; }); }
  await page.waitForFunction(() => window.__setLimit, { timeout: 120000 });
  const per = GROUP * SIZES.length * 2, total = names.length * SIZES.length * 2;
  for (let n = per; ; n += per) {
    const limit = Math.min(n, total);
    await page.evaluate((l) => window.__setLimit(l), limit);
    await page.waitForNetworkIdle({ idleTime: 400, timeout: 60000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 150));
    if (limit >= total) break;
  }
  const shot = await page.screenshot({ encoding: 'base64', clip: { x: 0, y: 0, width: COLS * CELL, height: rowsCount * CELL } }); await page.close();
  if (process.env.ICON_COMPARE_SHOTS) console.log('grid ' + v + ' ' + names.length + ' ' + density + ': icon file responses ' + JSON.stringify(seen.status) + ', failed ' + seen.failed + (seen.last ? ' (last: ' + seen.last + ')' : ''));
  if (process.env.ICON_COMPARE_SHOTS) fs.writeFileSync(path.join(process.env.ICON_COMPARE_SHOTS, v + '-' + names.length + '-' + density + '.png'), Buffer.from(shot, 'base64'));   // a debugging aid: the grids as drawn
  return { shot, rowsCount };
}
async function pixels(common) {
  out('## Pixels'); out();
  const browser = await browserSetup(); const result = [];
  try {
    const library = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'platform', 'components', 'Icon', 'glyphs.js'), 'utf8');
    const lib = (/export const LIBRARY = "([^"]*)"/.exec(library) || [0, ''])[1].split(' ').filter(Boolean).filter((_, i) => i % 28 === 0);
    // Plenix icons: the old build against the new with its icon file (nothing fetched); the Material sample: both fetch from /cdn/material/
    const sets = [['Plenix icons', common, ['compact', 'comfortable'], true], ['Material sample (every 28th symbol)', lib, ['compact'], false]].filter((x) => !process.env.ICON_COMPARE_SET || x[0].toLowerCase().startsWith(process.env.ICON_COMPARE_SET));
    const cmp = await browser.newPage();
    for (const [label, names, densities, registered] of sets) for (const density of densities) {
      const a = await gridShot(browser, A, names, density, false), b = await gridShot(browser, B, names, density, registered);
      const diff = await cmp.evaluate(async (a64, b64, names, S, cols, cell) => {
        const load = async (s) => { const img = await createImageBitmap(await (await fetch('data:image/png;base64,' + s)).blob()); const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); return { c, x, w: img.width, h: img.height }; };
        const A_ = await load(a64), B_ = await load(b64), bad = []; let total = 0, inkedA = 0, inkedB = 0, cells = 0, onlyOne = 0;
        const list = []; names.forEach((n) => S.forEach((s) => [false, true].forEach((f) => list.push([n, s, f]))));
        list.forEach(([n, s, f], i) => { const cx = (i % cols) * cell, cy = Math.floor(i / cols) * cell; if (cy + cell > A_.h || cy + cell > B_.h) return; cells++;
          const da = A_.x.getImageData(cx, cy, cell, cell).data, db = B_.x.getImageData(cx, cy, cell, cell).data; let d = 0, ia = 0, ib = 0; for (let k = 0; k < da.length; k += 4) { if (da[k] < 200) ia++; if (db[k] < 200) ib++; if (Math.abs(da[k] - db[k]) > 24 || Math.abs(da[k + 1] - db[k + 1]) > 24 || Math.abs(da[k + 2] - db[k + 2]) > 24) d++; }
          if (ia) inkedA++; if (ib) inkedB++; if ((ia > 0) !== (ib > 0)) onlyOne++; total += d; if (d) bad.push({ n, s, f, d, ia, ib }); });
        const badNames = [...new Set(bad.map((x) => x.n))].sort(); return { cells, inkedA, inkedB, onlyOne, total, bad: bad.sort((x, y) => y.d - x.d).slice(0, 12), badCount: bad.length, badNames };
      }, a.shot, b.shot, names, SIZES, COLS, CELL);
      result.push({ label, density, names: names.length, ...diff });
    }
  } finally { await browser.close(); }
  out('Every cell is one icon at one size (xs, sm, md, lg), outline and filled; the two builds are drawn the same way and each cell\'s pixels compared (a pixel differs when a channel differs by more than 24). The Plenix set of ' + B + ' is drawn from its compatibility icon file; the icons are shown in groups, each after the network is quiet. The Material files are read from this checkout\'s library (the same files as the CDN\'s /cdn/material/<commit>/): the live CDN refuses a burst of hundreds of requests.'); out();
  out('| Set | Density | Icons | Cells | Drawn in ' + A + ' | Drawn in ' + B + ' | Drawn in only one | Cells that differ | Pixels that differ |'); out('|---|---|---:|---:|---:|---:|---:|---:|---:|');
  result.forEach((r) => out('| ' + r.label + ' | ' + r.density + ' | ' + r.names + ' | ' + r.cells + ' | ' + r.inkedA + ' | ' + r.inkedB + ' | ' + r.onlyOne + ' | ' + r.badCount + ' | ' + r.total + ' |')); out();
  result.filter((r) => r.badCount).forEach((r) => { out('Icons with at least one cell that differs (' + r.label + ', ' + r.density + '): ' + r.badNames.length + ': ' + r.badNames.join(', ') + '.'); out(); out('Cells that differ most (' + r.label + ', ' + r.density + '): ' + r.bad.map((x) => x.n + ' ' + x.s + (x.f ? ' filled' : '') + ' (' + x.d + ' px; ink ' + x.ia + ' against ' + x.ib + ')').join('; ') + '.'); out(); });
}

(async () => {
  out('# Icons: ' + A + ' against ' + B + ' (issue 286)'); out();
  out('Made by `tools/agent/datagrid/icon-compare.js` on ' + new Date().toISOString().slice(0, 10) + ' from the published builds at ' + CDN + '. A quick-check tool: it reads the two builds and writes this file.'); out();
  let common = [];
  if (ONLY.includes('size') || ONLY.includes('paint') || ONLY.includes('pixels')) {
    const s = ONLY.includes('size') ? await sizes() : null;
    if (s) common = s.common; else {
      const index = JSON.parse((await get(CDN + B + '/icons/plenix/index.json')).toString('utf8')), css = (await get(CDN + A + '/plenix.css')).toString('utf8');
      common = index.icons.map((i) => i.name).filter((n) => css.includes('.plx-icon--' + n)).sort();
    }
  }
  if (ONLY.includes('paint')) await paint(common);
  if (ONLY.includes('pixels')) await pixels(common);
  fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, lines.join('\n') + '\n');
  console.log('ICON_COMPARE wrote ' + OUT + ' (' + lines.length + ' lines)');
})().catch((e) => { console.error(e); process.exit(1); });
