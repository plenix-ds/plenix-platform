// Plenix · tools/check-live-cdn.js (owner, cdn-live-27: Yes): after a release, does the CDN serve exactly what the release built?
//   node tools/check-live-cdn.js <version>                 every file of release/cdn/<version>/ against https://design-system.lighthouseway.org/cdn/<version>/
//   node tools/check-live-cdn.js <version> --live-only     no local build: the live files against the live bundle-manifest.json (a release's own record of its hashes)
// Options: --base <url>  (default https://design-system.lighthouseway.org/cdn/)   --dir <folder>  (default release/cdn/<version>)
//          --concurrency <n> (4)   --timeout <seconds> (30)
// What it reports (exit 1 on any):
//   different   a file whose sha256 on the CDN is not the built file's
//   missing     a built file the CDN does not serve (not 200)
//   extra       a file the live index.json or bundle-manifest.json names (outside icons/library/) that the build does not have
// Read-only: plain GET requests with a timeout, one retry on a network error, no token, nothing written. Not a test.
// Limit: a server cannot be asked for every file it holds, so "extra" means files the release's own records name; a stray file nobody lists is not seen.
// Exit: 0 same, 1 differs, 2 could not run (no build folder, the CDN unreachable).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const VALUED = ['--base', '--dir', '--concurrency', '--timeout'];
const version = args.find((a, i) => !a.startsWith('--') && !(i > 0 && VALUED.includes(args[i - 1])));
const LIVE_ONLY = args.includes('--live-only');
const BASE = (flag('--base', 'https://design-system.lighthouseway.org/cdn/')).replace(/\/?$/, '/') + version + '/';
const DIR = path.resolve(flag('--dir', path.join(__dirname, '..', 'release', 'cdn', String(version))));
const CONC = +flag('--concurrency', 4), TIMEOUT = +flag('--timeout', 30) * 1000;
if (!version || !/^\d+\.\d+\.\d+/.test(version)) { console.log('usage: node tools/check-live-cdn.js <version> [--live-only] [--base url] [--dir folder]'); process.exit(2); }

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
// node's https module, not fetch: a fetch (undici) assertion failure on a socket that ends early crashed this tool on Node 22
const https = require('https');
const once = (url) => new Promise((resolve, reject) => {
  const req = https.get(url, { timeout: TIMEOUT, headers: { 'accept-encoding': 'identity', 'user-agent': 'plenix-check-live-cdn' } }, (res) => {
    if (res.statusCode !== 200) { res.resume(); return resolve({ status: res.statusCode, retryAfter: +res.headers['retry-after'] || 0 }); }
    const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: 200, buf: Buffer.concat(chunks) })); res.on('error', reject);
  });
  req.on('timeout', () => req.destroy(new Error('timed out after ' + TIMEOUT / 1000 + 's'))); req.on('error', reject);
});
async function get(rel) {
  // the server rate-limits (HTTP 429/503): wait as it asks (Retry-After) or back off, then ask again; a network error is retried once
  for (let tries = 0, net = 0; ; tries++) {
    try {
      const r = await once(BASE + rel.split('/').map(encodeURIComponent).join('/'));
      if ((r.status === 429 || r.status === 503) && tries < 8) { await new Promise((ok) => setTimeout(ok, r.retryAfter > 0 ? Math.min(r.retryAfter, 30) * 1000 : Math.min(30000, 500 * 2 ** tries))); continue; }
      return r;
    } catch (e) { if (net++ >= 1) return { status: 0, error: e.message }; }
  }
}
function walk(dir, base, out) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, e.name); if (e.isDirectory()) walk(f, base, out); else out.push(path.relative(base, f).split(path.sep).join('/')); } return out; }
async function pool(items, worker) { let i = 0; await Promise.all(Array.from({ length: CONC }, async () => { while (i < items.length) { const k = items[i++]; await worker(k); } })); }

(async () => {
  const different = [], missing = [], extra = [], unreachable = [];
  let expected;      // path -> sha256 the live file must have
  const live = {};   // the live records
  for (const name of ['index.json', 'bundle-manifest.json']) { const r = await get(name); if (r.status === 200) { try { live[name] = JSON.parse(r.buf.toString('utf8')); } catch (e) { /* reported below */ } } }
  if (LIVE_ONLY) {
    if (!live['bundle-manifest.json']) { console.log('LIVE_CDN_ERROR: ' + BASE + 'bundle-manifest.json could not be read'); process.exit(2); }
    // the manifest describes the offline archive: its icons/library/ copy and its icons-all.css (rewritten to point at that copy) are not served from
    // /cdn/<version>/ (the library is shared at /cdn/material/<commit>/), so those are left out here
    expected = new Map(live['bundle-manifest.json'].files.filter((f) => !f.path.startsWith('icons/library/') && f.path !== 'icons-all.css').map((f) => [f.path, f.sha256]));
    expected.set('bundle-manifest.json', null);   // the manifest does not list itself: only that it is served
  } else {
    if (!fs.existsSync(DIR)) { console.log('LIVE_CDN_ERROR: ' + DIR + ' does not exist: run node build-packages.js first (a release build)'); process.exit(2); }
    expected = new Map(walk(DIR, DIR, []).sort().map((f) => [f, sha(fs.readFileSync(path.join(DIR, f)))]));
    const named = []; const idx = live['index.json']; if (idx && idx.files) named.push(...Object.values(idx.files));
    const man = live['bundle-manifest.json']; if (man) named.push('bundle-manifest.json', ...man.files.filter((f) => !f.path.startsWith('icons/library/')).map((f) => f.path));
    for (const n of new Set(named)) if (!expected.has(n)) extra.push(n);
  }
  let done = 0; const total = expected.size;
  await pool([...expected.keys()], async (rel) => {
    const r = await get(rel);
    if (r.status === 0) unreachable.push(rel + ' (' + r.error + ')');
    else if (r.status !== 200) missing.push(rel + ' (HTTP ' + r.status + ')');
    else if (expected.get(rel) !== null && sha(r.buf) !== expected.get(rel)) different.push(rel);
    if (++done % 500 === 0) process.stderr.write('  ' + done + '/' + total + '\n');
  });
  console.log('Live CDN check, ' + BASE + (LIVE_ONLY ? ' (live files against the live bundle-manifest.json)' : ' (against ' + path.relative(process.cwd(), DIR) + '/)'));
  console.log('  files checked: ' + total + '; different: ' + different.length + '; missing: ' + missing.length + '; extra: ' + extra.length + '; unreachable: ' + unreachable.length);
  for (const [label, list] of [['different', different], ['missing', missing], ['extra', extra], ['unreachable', unreachable]]) list.sort().slice(0, 25).forEach((x) => console.log('  ' + label + '  ' + x)), list.length > 25 && console.log('  … and ' + (list.length - 25) + ' more ' + label);
  if (unreachable.length && !different.length && !missing.length && !extra.length) { console.log('LIVE_CDN_ERROR (the CDN could not be reached for ' + unreachable.length + ' files)'); process.exitCode = 2; return; }
  if (different.length || missing.length || extra.length || unreachable.length) { console.log('LIVE_CDN_FAIL'); process.exitCode = 1; return; }
  console.log('LIVE_CDN_OK');
})().catch((e) => { console.log('LIVE_CDN_ERROR: ' + e.message); process.exitCode = 2; });
