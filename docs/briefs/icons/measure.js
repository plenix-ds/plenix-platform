// Icon audit (#278): measures what the icons cost today. Changes nothing; writes docs/briefs/icons/measure.json.
//   node docs/briefs/icons/measure.js [root]
// root: the checkout to serve (default: this repository). The design spec is a submodule, so point root at a checkout
// that has it (the main checkout at the same commit) to include the spec pages.
// Needs esbuild and puppeteer-core (the repository's dev dependencies; NODE_PATH may point at another checkout's node_modules).
const fs = require('fs'), path = require('path'), zlib = require('zlib'), http = require('http');
const esbuild = require('esbuild'), puppeteer = require('puppeteer-core');
const ROOT = path.resolve(process.argv[2] || path.join(__dirname, '..', '..', '..'));
const out = {};
const gz = (s) => zlib.gzipSync(Buffer.from(s), { level: 9 }).length;
const br = (s) => zlib.brotliCompressSync(Buffer.from(s)).length;
const size = (s) => ({ raw: Buffer.byteLength(s), gzip: gz(s), brotli: br(s) });

// ---- A. bytes ----
const iconCss = fs.readFileSync(path.join(ROOT, 'platform/components/Icon/icon.css'), 'utf8');
const lines = iconCss.split('\n');
const glyphLines = lines.filter((l) => /^\s*--plx-comp-icon-glyph-/.test(l));
const contextLines = lines.filter((l) => /^\[data-plx-(density|icon-optical)/.test(l));
const nameRules = lines.filter((l) => /^\.plx-icon--[^{]*\{--plx-comp-icon-filled:/.test(l));
const bundle = esbuild.buildSync({ entryPoints: [path.join(ROOT, 'platform/platform.css')], bundle: true, write: false, logLevel: 'silent',
  loader: { '.woff2': 'file', '.svg': 'file', '.png': 'file' }, outdir: '/x' }).outputFiles.find((f) => f.path.endsWith('.css')).text;
const minBundle = esbuild.buildSync({ entryPoints: [path.join(ROOT, 'platform/platform.css')], bundle: true, write: false, minify: true, logLevel: 'silent',
  loader: { '.woff2': 'file', '.svg': 'file', '.png': 'file' }, outdir: '/x' }).outputFiles.find((f) => f.path.endsWith('.css')).text;
// the same bundle without any icon drawing: what plenix.css would be with the drawings moved out
const stripGlyphs = (css) => css.replace(/--plx-comp-icon-glyph-[a-z0-9-]+:\s*url\("data:image\/svg\+xml,[^"]*"\);?/g, '');
const stripAll = (css) => stripGlyphs(css).replace(/--plx-comp-icon-auto-[a-z0-9-]+:var\(--plx-comp-icon-glyph-[a-z0-9-]+\);?/g, '');
const dataUris = bundle.match(/url\("data:image\/svg\+xml,[^"]*"\)/g) || [];
out.bytes = {
  iconCss: size(iconCss),
  glyphDeclarations: Object.assign({ count: glyphLines.length }, size(glyphLines.join('\n'))),
  contextRules: Object.assign({ count: contextLines.length }, size(contextLines.join('\n'))),
  perNameRules: Object.assign({ count: nameRules.length }, size(nameRules.join('\n'))),
  bundle: size(bundle), bundleMin: size(minBundle),
  bundleNoGlyphs: size(stripGlyphs(bundle)), bundleNoIconData: size(stripAll(bundle)),
  dataUrisInBundle: Object.assign({ count: dataUris.length }, size(dataUris.join(''))),
  glyphsJs: size(fs.readFileSync(path.join(ROOT, 'platform/components/Icon/glyphs.js'), 'utf8')),
};
const symbols = (fs.readFileSync(path.join(ROOT, 'platform/components/Icon/glyphs.js'), 'utf8').match(/export const SYMBOLS = "([^"]*)"/) || [])[1].split(' ');
const libDir = path.join(ROOT, 'platform/icons/library');
const libFiles = fs.existsSync(libDir) ? fs.readdirSync(libDir).filter((f) => f.endsWith('.svg')) : [];
const libBytes = libFiles.reduce((n, f) => n + fs.statSync(path.join(libDir, f)).size, 0);
out.library = { symbols: symbols.length, libraryFiles: libFiles.length, libraryBytes: libBytes, avgFile: libFiles.length ? Math.round(libBytes / libFiles.length) : 0 };

// ---- B. Chrome: parse, style and cssGlyph cost ----
const virtual = {
  '/bench/full.css': bundle, '/bench/stripped.css': stripAll(bundle),
};
const page = (css, icons) => `<!doctype html><html data-plx-mode="light"><head><link rel="stylesheet" href="/bench/${css}.css">
<script src="/Plenix/platform/vendor/react.production.min.js"></script><script src="/Plenix/platform/vendor/react-dom.production.min.js"></script>
<script src="/Plenix/platform/dist/platform.js"></script></head><body data-plx-density="compact"><div id="r"></div><script>
const N=${icons}, names=${JSON.stringify(symbols)};
const kids=[]; for(let i=0;i<2000;i++) kids.push(React.createElement('div',{key:'d'+i,className:'plx-text'},'row '+i));
for(let i=0;i<N;i++) kids.push(React.createElement(Plenix.Icon,{key:'i'+i,name:names[i%names.length],filled:i%3===0}));
const t0=performance.now(); ReactDOM.flushSync?ReactDOM.flushSync(()=>ReactDOM.createRoot(document.getElementById('r')).render(React.createElement('div',null,kids))):0;
document.body.offsetHeight; window.__render=performance.now()-t0; window.__ready=true;
</script></body></html>`;
for (const css of ['full', 'stripped']) for (const n of [0, 500]) virtual['/bench/' + css + '-' + n + '.html'] = page(css, n);
virtual['/bench/glyph-read.html'] = `<!doctype html><html><head><link rel="stylesheet" href="/bench/full.css"></head><body data-plx-density="compact"><script>
const names=${JSON.stringify(symbols)}, V=['','-fill','-24','-24-fill'];
const r={}; let t=performance.now(); const cs=getComputedStyle(document.documentElement); cs.getPropertyValue('--plx-comp-icon-glyph-add'); r.firstRead=performance.now()-t;
t=performance.now(); let total=0; for(const s of names) for(const v of V){ const x=cs.getPropertyValue('--plx-comp-icon-glyph-'+s.replace(/_/g,'-')+v); total+=x.length; } r.allReads=performance.now()-t; r.count=names.length*4; r.chars=total;
t=performance.now(); for(const s of names){ const x=cs.getPropertyValue('--plx-comp-icon-glyph-'+s.replace(/_/g,'-')).trim(); const m=x.match(/^url\\(["']?data:image\\/svg\\+xml,(.*?)["']?\\)$/); decodeURIComponent(m[1]).match(/<path\\b([^>]*)\\/?>/); } r.decodeParse200=performance.now()-t;
document.documentElement.setAttribute('data-x','1'); t=performance.now(); getComputedStyle(document.documentElement).getPropertyValue('--plx-comp-icon-glyph-home'); r.readAfterDirty=performance.now()-t;
window.__r=r;</script></body></html>`;
function serve(port) {
  return new Promise((res) => { const s = http.createServer((req, rs) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    if (virtual[u]) { rs.writeHead(200, { 'Content-Type': u.endsWith('.css') ? 'text/css' : 'text/html', 'Cache-Control': 'no-store' }); rs.end(virtual[u]); return; }
    if (!u.startsWith('/Plenix/')) { rs.writeHead(404); rs.end(); return; }
    let f = path.join(ROOT, u.slice(8)); if (!f.startsWith(ROOT)) { rs.writeHead(403); rs.end(); return; }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { rs.writeHead(404); rs.end(); return; }
    const T = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };
    rs.writeHead(200, { 'Content-Type': T[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(rs);
  }); s.listen(0, '127.0.0.1', () => res(s)); });
}
const median = (a) => { const s = [...a].sort((x, y) => x - y); return +s[Math.floor(s.length / 2)].toFixed(2); };
async function traced(browser, url, until) {
  const p = await browser.newPage(); await p.setViewport({ width: 1440, height: 900 });
  const file = path.join(require('os').tmpdir(), 'plx-icon-trace-' + process.pid + '.json');
  await p.tracing.start({ path: file, categories: ['devtools.timeline', 'blink'] });
  if (process.env.DEBUG) { p.on('console', (m) => console.error('console', m.text())); p.on('pageerror', (e) => console.error('pageerror', e.message)); p.on('request', (r) => console.error('req', r.url().slice(0, 90))); p.on('requestfinished', (r) => console.error('done', r.url().slice(0, 90))); }
  await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForFunction(until, { timeout: 60000 });
  await new Promise((r) => setTimeout(r, 300));
  await p.tracing.stop();
  const ev = JSON.parse(fs.readFileSync(file, 'utf8')).traceEvents || JSON.parse(fs.readFileSync(file, 'utf8'));
  fs.unlinkSync(file);
  const sum = (n) => ev.filter((e) => e.name === n && e.dur).reduce((t, e) => t + e.dur, 0) / 1000;
  const m = await p.metrics(); const extra = await p.evaluate(() => ({ render: window.__render || 0 }));
  await p.close();
  return { parseCss: sum('ParseAuthorStyleSheet'), styleRecalc: sum('UpdateLayoutTree') + sum('RecalculateStyles'), layout: sum('Layout'), paint: sum('Paint'),
    recalcStyleMetric: m.RecalcStyleDuration * 1000, render: extra.render };
}
// D. what each page draws
async function usage(browser, url) {
  const p = await browser.newPage(); await p.setViewport({ width: 1440, height: 900 });
  const lib = []; p.on('request', (r) => { if (/icons\/library\/|\/cdn\/material\//.test(r.url())) lib.push(r.url()); });
  try { await p.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); } catch (e) { /* keep what loaded */ }
  await new Promise((r) => setTimeout(r, 2500));
  const r = await p.evaluate(() => {
    const els = [...document.querySelectorAll('.plx-icon')];
    const names = new Set(), inline = { svg: 0, mask: 0 };
    for (const e of els) { const c = [...e.classList].find((k) => k.startsWith('plx-icon--') && !/^plx-icon--(size-|filled|outline|inline)/.test(k)); if (c) names.add(c.slice(10)); e.querySelector('svg') ? inline.svg++ : inline.mask++; }
    return { h1: (document.querySelector('h1') || {}).textContent || document.title, elements: els.length, distinct: names.size, inline, names: [...names].sort() };
  });
  await p.close();
  return Object.assign(r, { libraryRequests: lib.length });
}
(async () => {
  const server = await serve(0), port = server.address().port, B = 'http://127.0.0.1:' + port;
  const exe = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ['--no-sandbox'] });
  try {
    out.chrome = { version: await browser.version() };
    const RUNS = +(process.env.RUNS || 7);
    for (const css of ['full', 'stripped']) for (const n of [0, 500]) {
      const runs = []; for (let i = 0; i < RUNS; i++) runs.push(await traced(browser, B + '/bench/' + css + '-' + n + '.html', 'window.__ready'));
      const k = {}; for (const key of Object.keys(runs[0])) k[key] = median(runs.map((r) => r[key]));
      out.chrome[css + '-' + n] = k;
    }
    const reads = []; for (let i = 0; i < RUNS; i++) { const p = await browser.newPage(); await p.goto(B + '/bench/glyph-read.html'); reads.push(await p.evaluate(() => window.__r)); await p.close(); }
    out.cssGlyph = {}; for (const key of Object.keys(reads[0])) out.cssGlyph[key] = median(reads.map((r) => r[key]));
    out.pages = {};
    for (const app of ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'dam'])
      out.pages[app] = await usage(browser, B + '/Plenix/' + app + '/index.html');
    if (fs.existsSync(path.join(ROOT, 'platform/design-system/index.html')))
      for (const route of ['', '#/foundations/icon', '#/data-display/data-grid', '#/data-display/table', '#/navigation/nav-pane', '#/actions/button', '#/inputs/select'])
        out.pages['spec ' + (route || 'home')] = await usage(browser, B + '/Plenix/platform/design-system/index.html' + route);
  } finally { await browser.close(); server.close(); }
  fs.writeFileSync(path.join(__dirname, 'measure.json'), JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out, (k, v) => (k === 'names' ? v.length : v), 1));
})();
