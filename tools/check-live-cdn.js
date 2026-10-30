// Plenix · tools/check-live-cdn.js (owner, cdn-live-27: Yes): after a release, does the CDN serve exactly what the release built?
//   node tools/check-live-cdn.js <version>                 release/cdn/<version>/ against https://design-system.lighthouseway.org/cdn/<version>/
//   node tools/check-live-cdn.js <version> --live-only     no local build: the live files against the live bundle-manifest.json (a release's own record of its hashes)
// Options: --base <url>  (default https://design-system.lighthouseway.org/cdn/)   --dir <folder>  (default release/cdn/<version>)
//          --sample <n> (200)   --all (every file, hours: the server rate-limits)   --seed <n> (repeats a sample)
//          --concurrency <n> (2)   --timeout <seconds per request> (20)   --deadline <minutes for the whole check> (15)
// What it compares (sha256 of the served bytes against the built file's):
//   - every file at the top of the version folder, in full: plenix.js, plenix.esm.js, plenix.css, plenix.d.ts, index.json, the records
//     (bundle-manifest.json, the hashes of every runtime file) and the archive plenix-<version>.tgz, whose bytes hold every runtime file
//   - every file of a small folder (25 files or fewer: fonts/, vendor/, tokens/, mobile/ …), in full
//   - a seeded random sample of the large folders (icons/material/, icons/plenix/, source/ …): --sample files, at least 10 from each.
//     A deploy moves one complete version folder into place, so a fault is a wrong build or a damaged copy: the records and the
//     archive catch a wrong build, and 200 random files find a damaged copy that touches 1.5% of the files 95 times in 100.
// What it reports (exit 1 on any):
//   different   a file whose sha256 on the CDN is not the built file's
//   missing     a built file the CDN does not serve (not 200)
//   extra       a file the live index.json or bundle-manifest.json names (outside icons/library/) that the build does not have
// A build without the private design system (platform/design-system, as on GitHub's runners) has no docs/ folder and writes
// "docs": null in index.json; the deployed build has both. Then index.json is compared with that one field taken from the
// live copy, and docs/ is not compared (the tool says so).
// Read-only: plain GET requests, no token, nothing written. Not a test. Bounded: one request at a time per --concurrency, a timeout per
// request, one retry on a network error, a short back-off on HTTP 429/503, and a deadline for the whole check.
// A file the server will not serve after its retries is "unreachable", not "missing"; after 10 such files in a row, or at the
// deadline, the check stops (exit 2). The server rate-limits: the full crawl (--all, 26,000 files) took hours on GitHub's runners.
// Exit: 0 same, 1 differs, 2 could not run or could not be answered (no build folder, the CDN unreachable or rate-limiting, the deadline).
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const VALUED = ['--base', '--dir', '--concurrency', '--timeout', '--sample', '--seed', '--deadline'];
const version = args.find((a, i) => !a.startsWith('--') && !(i > 0 && VALUED.includes(args[i - 1])));
const LIVE_ONLY = args.includes('--live-only');
const BASE = (flag('--base', 'https://design-system.lighthouseway.org/cdn/')).replace(/\/?$/, '/') + version + '/';
const DIR = path.resolve(flag('--dir', path.join(__dirname, '..', 'release', 'cdn', String(version))));
const CONC = Math.max(1, +flag('--concurrency', 2)), TIMEOUT = +flag('--timeout', 20) * 1000;
const SAMPLE = args.includes('--all') ? Infinity : Math.max(0, +flag('--sample', 200));
const SEED = (+flag('--seed', 0) >>> 0) || (Date.now() >>> 0);
const DEADLINE = Date.now() + +flag('--deadline', 15) * 60000;
const SMALL = 25, PER_FOLDER = Math.min(10, SAMPLE), STOP_STREAK = 10;
if (!version || !/^\d+\.\d+\.\d+/.test(version)) { console.log('usage: node tools/check-live-cdn.js <version> [--live-only] [--base url] [--dir folder] [--sample n | --all] [--seed n]'); process.exit(2); }

const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
const sleep = (ms) => new Promise((ok) => setTimeout(ok, Math.max(0, Math.min(ms, DEADLINE - Date.now()))));
// node's https module, not fetch: a fetch (undici) assertion failure on a socket that ends early crashed this tool on Node 22
const once = (url) => new Promise((resolve, reject) => {
  const req = require(url.startsWith('http:') ? 'http' : 'https').get(url, { timeout: TIMEOUT, headers: { 'accept-encoding': 'identity', 'user-agent': 'plenix-check-live-cdn' } }, (res) => {
    if (res.statusCode !== 200) { res.resume(); return resolve({ status: res.statusCode, retryAfter: +res.headers['retry-after'] || 0 }); }
    const chunks = []; res.on('data', (c) => chunks.push(c)); res.on('end', () => resolve({ status: 200, buf: Buffer.concat(chunks) })); res.on('error', reject);
  });
  // the timeout is for the whole request, not only an idle socket: a server that trickles bytes cannot hold the check
  const whole = setTimeout(() => req.destroy(new Error('timed out after ' + TIMEOUT / 1000 + 's')), TIMEOUT * 3);
  req.on('close', () => clearTimeout(whole));
  req.on('timeout', () => req.destroy(new Error('timed out after ' + TIMEOUT / 1000 + 's'))); req.on('error', reject);
});
async function get(rel) {
  // HTTP 429/503 (the server's request limit, no Retry-After): back off 1, 2, 4, 8, 16 s (or as Retry-After asks, at most 30 s); a network error is retried once
  for (let tries = 0, net = 0; ; tries++) {
    if (Date.now() >= DEADLINE) return { status: 0, error: 'the deadline passed', limited: true };
    try {
      const r = await once(BASE + rel.split('/').map(encodeURIComponent).join('/'));
      if (r.status === 429 || r.status === 503) {
        if (tries < 5) { await sleep(r.retryAfter > 0 ? Math.min(r.retryAfter, 30) * 1000 : 1000 * 2 ** tries); continue; }
        return { status: 0, error: 'HTTP ' + r.status + ' after ' + tries + ' retries (the server is rate-limiting)', limited: true };   // not a missing file: the CDN could not be asked
      }
      return r;
    } catch (e) { if (net++ >= 1) return { status: 0, error: e.message, limited: true }; await sleep(2000); }
  }
}
function walk(dir, base, out) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { const f = path.join(dir, e.name); if (e.isDirectory()) walk(f, base, out); else out.push(path.relative(base, f).split(path.sep).join('/')); } return out; }
let stopped = '';
async function pool(items, worker) { let i = 0; await Promise.all(Array.from({ length: CONC }, async () => { while (i < items.length && !stopped) { const k = items[i++]; await worker(k); } })); }

// which files to ask for: the top of the folder and the small folders in full, a seeded sample of the large folders
function choose(files) {
  const groups = new Map();
  for (const f of files) { const parts = f.split('/'); const key = parts.length === 1 ? '.' : parts.slice(0, Math.min(2, parts.length - 1)).join('/'); (groups.get(key) || groups.set(key, []).get(key)).push(f); }
  const full = [], large = [];
  for (const [key, list] of groups) (key === '.' || list.length <= SMALL ? full : large).push([key, list]);
  const chosen = full.flatMap(([, list]) => list);
  const inLarge = large.reduce((n, [, list]) => n + list.length, 0);
  let rnd = SEED; const next = () => { rnd = (rnd + 0x6d2b79f5) >>> 0; let t = rnd; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const summary = [];
  for (const [key, list] of large.sort((a, b) => (a[0] < b[0] ? -1 : 1))) {
    const want = Math.min(list.length, SAMPLE === Infinity ? list.length : Math.max(PER_FOLDER, Math.round(SAMPLE * list.length / inLarge)));
    const pick = list.slice().sort();
    for (let i = 0; i < want; i++) { const j = i + Math.floor(next() * (pick.length - i)); [pick[i], pick[j]] = [pick[j], pick[i]]; }
    chosen.push(...pick.slice(0, want)); summary.push(key + '/ ' + want + ' of ' + list.length);
  }
  return { chosen, full: full.reduce((n, [, list]) => n + list.length, 0), summary };
}

(async () => {
  const different = [], missing = [], extra = [], unreachable = [], notes = [];
  let expected;      // path -> sha256 the live file must have (null: only that it is served)
  const live = {};   // the live records
  const asked = {};  // a record that could not be read: unreachable (status 0) or missing (any other status)
  const unread = (name) => { const r = asked[name]; if (r.status === 0) unreachable.push(name + ' (' + r.error + ')'); else if (r.status === 200) different.push(name + ' (not JSON)'); else missing.push(name + ' (HTTP ' + r.status + ')'); };
  for (const name of ['index.json', 'bundle-manifest.json']) { const r = asked[name] = await get(name); if (r.status === 200) { live[name] = r.buf; } }
  const parsed = (name) => { try { return live[name] && JSON.parse(live[name].toString('utf8')); } catch (e) { return null; } };
  const liveIndex = parsed('index.json'), liveManifest = parsed('bundle-manifest.json');
  if (LIVE_ONLY) {
    if (!liveManifest) { console.log('LIVE_CDN_ERROR: ' + BASE + 'bundle-manifest.json could not be read'); process.exit(2); }
    // the manifest describes the offline archive: its icons/library/ copy (and, up to icon stage 5c-2, its icons-all.css rewritten to point at that
    // copy) are not served from /cdn/<version>/ (the library is shared at /cdn/material/<commit>/), so those are left out here
    expected = new Map(liveManifest.files.filter((f) => !f.path.startsWith('icons/library/') && f.path !== 'icons-all.css').map((f) => [f.path, f.sha256]));
    expected.set('bundle-manifest.json', null);   // the manifest does not list itself: only that it is served
    if (liveIndex && liveIndex.bundle && liveIndex.bundle.href) expected.set(liveIndex.bundle.href, liveIndex.bundle.sha256);   // the archive, by the hash the index gives
  } else {
    if (!fs.existsSync(DIR)) { console.log('LIVE_CDN_ERROR: ' + DIR + ' does not exist: run node build-packages.js first (a release build)'); process.exit(2); }
    expected = new Map(walk(DIR, DIR, []).sort().map((f) => [f, sha(fs.readFileSync(path.join(DIR, f)))]));
    // built without the private design system (GitHub's runners): no docs/ here, "docs": null in index.json; the deployed build has both
    const localIndex = JSON.parse(fs.readFileSync(path.join(DIR, 'index.json'), 'utf8'));
    const noSpec = localIndex.files && localIndex.files.docs === null && !fs.existsSync(path.join(DIR, 'docs'));
    if (noSpec) {
      notes.push('this build has no design system (platform/design-system is not checked out): docs/ is not compared, and index.json is compared with its "docs" entry taken from the live copy');
      if (liveIndex && liveIndex.files) {
        const same = JSON.stringify(Object.assign({}, localIndex, { files: Object.assign({}, localIndex.files, { docs: liveIndex.files.docs }) })) === JSON.stringify(liveIndex);
        if (!same) different.push('index.json');
      } else unread('index.json');
      expected.delete('index.json');
    }
    const named = []; if (liveIndex && liveIndex.files) named.push(...Object.values(liveIndex.files).filter(Boolean));
    if (liveManifest) named.push('bundle-manifest.json', ...liveManifest.files.filter((f) => !f.path.startsWith('icons/library/')).map((f) => f.path));
    for (const n of new Set(named)) if (!expected.has(n) && !(noSpec && (n === 'index.json' || n.startsWith('docs/')))) extra.push(n);
    // the two records already read: compared here, not asked for again
    for (const name of ['index.json', 'bundle-manifest.json']) {
      if (!expected.has(name)) continue;
      if (!live[name]) unread(name); else if (sha(live[name]) !== expected.get(name)) different.push(name);
      expected.delete(name);
    }
  }
  if (!liveIndex) console.log('WARNING: the live index.json could not be read, so "extra" files were only checked against bundle-manifest.json');
  const { chosen, full, summary } = choose([...expected.keys()]);
  let done = 0, streak = 0;
  await pool(chosen, async (rel) => {
    const r = await get(rel);
    // 10 files in a row that the server would not serve after their retries (rate-limited, timed out, refused): stop instead of asking for more
    if (r.limited) { if (++streak >= STOP_STREAK) stopped = stopped || 'stopped after ' + STOP_STREAK + ' files in a row that the server would not serve (rate-limited, timed out or refused)'; } else streak = 0;
    if (Date.now() >= DEADLINE) stopped = stopped || 'stopped at the deadline (--deadline)';
    if (r.status === 0) unreachable.push(rel + ' (' + r.error + ')');
    else if (r.status !== 200) missing.push(rel + ' (HTTP ' + r.status + ')');
    else if (expected.get(rel) !== null && sha(r.buf) !== expected.get(rel)) different.push(rel);
    if (++done % 50 === 0) process.stderr.write('  ' + done + '/' + chosen.length + '\n');
  });
  console.log('Live CDN check, ' + BASE + (LIVE_ONLY ? ' (live files against the live bundle-manifest.json)' : ' (against ' + path.relative(process.cwd(), DIR) + '/)'));
  console.log('  files asked: ' + done + ' of ' + chosen.length + ' chosen from ' + expected.size + ' (in full: ' + full + '; sampled, seed ' + SEED + ': ' + (summary.join(', ') || 'none') + ')');
  console.log('  different: ' + different.length + '; missing: ' + missing.length + '; extra: ' + extra.length + '; unreachable: ' + unreachable.length);
  notes.forEach((n) => console.log('  note: ' + n));
  for (const [label, list] of [['different', different], ['missing', missing], ['extra', extra], ['unreachable', unreachable]]) list.sort().slice(0, 25).forEach((x) => console.log('  ' + label + '  ' + x)), list.length > 25 && console.log('  … and ' + (list.length - 25) + ' more ' + label);
  if (different.length || missing.length || extra.length) { console.log('LIVE_CDN_FAIL'); process.exitCode = 1; return; }
  if (stopped) { console.log('LIVE_CDN_ERROR: ' + stopped + '; ' + (chosen.length - done) + ' chosen files were not asked. Run it again later.'); process.exitCode = 2; return; }
  if (unreachable.length) { console.log('LIVE_CDN_ERROR (the CDN could not be asked for ' + unreachable.length + ' files)'); process.exitCode = 2; return; }
  console.log('LIVE_CDN_OK');
})().catch((e) => { console.log('LIVE_CDN_ERROR: ' + e.message); process.exitCode = 2; });
