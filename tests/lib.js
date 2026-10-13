// Plenix tests · shared helpers: a static server for the repository (served at /Plenix/, as on the workspace server and
// the VM) and a headless Chrome. CHROME_PATH picks the browser; otherwise the usual Windows or Linux location.
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');
const limit = require('./limit.js');   // every test's hard time limit (TEST_TIMEOUT_MS)

const ROOT = path.resolve(__dirname, '..');
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jsx': 'text/plain; charset=utf-8',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8' };

// serves ROOT at /Plenix/ (directories answer with index.html); everything else is 404
function serve(port) {
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (!rel.startsWith('/Plenix/')) { res.writeHead(404); res.end('Not found'); return; }
    let file = path.join(ROOT, rel.slice('/Plenix/'.length));
    if (!file.startsWith(ROOT)) { res.writeHead(403); res.end(); return; }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

function chromePath() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const p of ['C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']) if (fs.existsSync(p)) return p;
  throw new Error('No Chrome found: set CHROME_PATH');
}
// every test page asks for reduced motion, so a state is measured settled, never mid-fade (batch 236 added 80ms hover and
// color fades; a machine whose system already reduces motion passed while CI, without it, read the start of each fade)
const launch = async () => {
  const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true, protocolTimeout: 180000, args: ['--no-sandbox', '--allow-file-access-from-files'] });
  const newPage = browser.newPage.bind(browser);
  browser.newPage = async (...a) => { const p = await newPage(...a); await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]); return p; };
  return browser;
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const APPS = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings', 'dam'];

// at(step): the step a timeout names
module.exports = { ROOT, serve, launch, sleep, APPS, at: limit.at };
