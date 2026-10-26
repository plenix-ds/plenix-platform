// Plenix tests · the St. John the Beloved test site: its pages, and the site itself for the browser tests. The site is its
// own web app (github.com/plenix-ds/st-john-test-site: Node 22 + PostgreSQL, Plenix from the CDN; live at
// https://stjohn.lighthouseway.org). Every automatic browser test opens its pages (and the suite applications' pages where
// the test is about them), never the design spec (owner, 2026-10-25).
// The tests reach it at /Plenix/test-site/ on their own server (tests/lib.js serve), which starts the site on first use
// and passes those requests on. The site loads Plenix from /cdn/local/: this checkout's own build of the CDN files
// (release/cdn/<version>/, node build-packages.js), so a pull request is tested with its unreleased Platform.
//   SITE_DIR            the St. John repository (default: ../st-john-test-site beside this repository)
//   SITE_DATABASE_URL   its database (default pglite:memory: PostgreSQL in the process, fresh for every test; CI: the
//                       job's throwaway PostgreSQL 16)
//   SITE_URL            a site already running (http://host:port/): used as it is, nothing is started
//   site.pages()  every page of the site's site/pages.js   site.urls()  'test-site/index.html#/members', …   site.url(id)
const fs = require('fs');
const path = require('path');
const { spawn, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DIR = path.resolve(process.env.SITE_DIR || path.join(ROOT, '..', 'st-john-test-site'));
const FILE = path.join(DIR, 'site', 'pages.js');
const VERSION = require(path.join(ROOT, 'package.json')).version;
const CDN_LOCAL = path.join(ROOT, 'release', 'cdn', VERSION);

let PAGES = null;
function pages() {
  if (PAGES) return PAGES;
  if (!fs.existsSync(FILE)) throw new Error('The St. John test site is not at ' + DIR + ': clone github.com/plenix-ds/st-john-test-site there, or set SITE_DIR');
  const text = fs.readFileSync(FILE, 'utf8');
  PAGES = JSON.parse(text.slice(text.indexOf('= [') + 2).replace(/;\s*$/, ''));
  return PAGES;
}
const url = (id, extra) => { const p = pages().find((x) => x.id === id); if (!p) throw new Error('No test-site page ' + id); return 'test-site/index.html#' + (p.open || p.path) + (extra || ''); };
const urls = () => pages().map((p) => 'test-site/index.html#' + (p.open || p.path));

// the site for one test server: started on port + 2000 the first time a page asks for it; stopped with the test server
function start(port) {
  if (process.env.SITE_URL) return Promise.resolve({ origin: process.env.SITE_URL.replace(/\/$/, ''), stop() {} });
  if (!fs.existsSync(path.join(CDN_LOCAL, 'plenix.js'))) throw new Error('No local Plenix build at release/cdn/' + VERSION + '/: run node build-app.js and node build-packages.js');
  if (!fs.existsSync(path.join(DIR, 'public', 'app.js'))) execFileSync(process.execPath, [path.join(DIR, 'build.js')], { cwd: DIR, stdio: 'ignore' });
  const sitePort = port + 2000;
  const child = spawn(process.execPath, [path.join(DIR, 'server', 'server.js')], {
    cwd: DIR, stdio: ['ignore', 'pipe', 'pipe'],
    env: Object.assign({}, process.env, { PORT: String(sitePort), HOST: '127.0.0.1', DATABASE_URL: process.env.SITE_DATABASE_URL || 'pglite:memory', PLENIX_BASE: '/cdn/local/',
      SEED_ON_START: '1', RESET_OPEN: '1', RESET_HOUR: '-1' }),
  });
  let log = '';
  child.stdout.on('data', (d) => { log += d; }); child.stderr.on('data', (d) => { log += d; });
  const origin = 'http://127.0.0.1:' + sitePort;
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const poll = () => fetch(origin + '/healthz').then((r) => (r.ok ? resolve({ origin, stop: () => child.kill() }) : again()), again);
    const again = () => { if (child.exitCode !== null || Date.now() - t0 > 60000) { child.kill(); reject(new Error('The St. John test site did not start:\n' + log.slice(-800))); } else setTimeout(poll, 300); };
    poll();
  });
}

module.exports = { pages, urls, url, start, DIR, FILE, CDN_LOCAL };
