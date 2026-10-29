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
  const origin = 'http://127.0.0.1:' + sitePort;
  // the healthy site must be the one started here (#382 F8): nothing may answer on its port before it starts, and when the
  // health check answers, this child must still run and have said it listens on that port
  return fetch(origin + '/healthz').then(() => { throw new Error('Port ' + sitePort + ' already answers (another St. John site or server): the test site cannot start there. Stop it, or use another TEST_PORT.'); }, () => launchSite(sitePort, origin));
}
// every site this test process started: stopped when the process ends, however it ends (#382 F8). Each runs under a guard
// (tests/site-guard.js) in a process group of its own, so stopping the group stops the guard and the server, and the guard
// stops the server if this process is killed before its handlers can run.
const started = new Set();
const stopGroup = (child) => { if (!started.delete(child)) return; try { process.kill(-child.pid, 'SIGTERM'); } catch (e) { try { child.kill('SIGTERM'); } catch (x) { /* gone */ } } };
const stopAll = () => { [...started].forEach(stopGroup); };
let handlers = false;
function cleanUpOnExit() {
  if (handlers) return; handlers = true;
  process.on('exit', stopAll);   // a normal end, process.exit (a failure) and an uncaught error all end here
  [['SIGINT', 130], ['SIGTERM', 143], ['SIGHUP', 129]].forEach(([sig, code]) => process.on(sig, () => { stopAll(); process.exit(code); }));
}
function launchSite(sitePort, origin) {
  cleanUpOnExit();
  const child = spawn(process.execPath, [path.join(__dirname, 'site-guard.js'), String(process.pid), path.join(DIR, 'server', 'server.js')], {
    cwd: DIR, stdio: ['ignore', 'pipe', 'pipe'], detached: true,
    env: Object.assign({}, process.env, { PORT: String(sitePort), HOST: '127.0.0.1', DATABASE_URL: process.env.SITE_DATABASE_URL || 'pglite:memory', PLENIX_BASE: '/cdn/local/',
      PLENIX_ENGINES: fs.existsSync(path.join(CDN_LOCAL, 'plenix-engines.js')) ? '1' : '0',   // the build under test has the engines script, or not (branches before #518)
      SEED_ON_START: '1', RESET_OPEN: '1', RESET_HOUR: '-1' }),
  });
  started.add(child);
  child.on('exit', () => started.delete(child));
  let log = '';
  child.stdout.on('data', (d) => { log += d; }); child.stderr.on('data', (d) => { log += d; });
  const mine = () => child.exitCode === null && log.indexOf('on port ' + sitePort + ' ') >= 0;
  return new Promise((resolve, reject) => {
    const t0 = Date.now();
    const poll = () => fetch(origin + '/healthz').then((r) => (r.ok && mine() ? resolve({ origin, stop: () => stopGroup(child) }) : again()), again);
    const again = () => { if (child.exitCode !== null || Date.now() - t0 > 60000) { stopGroup(child); reject(new Error('The St. John test site did not start:\n' + log.slice(-800))); } else setTimeout(poll, 300); };
    poll();
  });
}

module.exports = { pages, urls, url, start, DIR, FILE, CDN_LOCAL };
