/* Before/after pictures for PR 4 (button behaviors, #298). Usage:
     node docs/briefs/button-behaviors/capture.js <before-root> <after-root>
   Each root is a checkout of the repository (before: styling/phase-2; after: this branch, built), served the same way
   and photographed at a real 150% screen scale: the icon-only buttons with the first one hovered (its tooltip), the
   loading buttons (with each one's width), and a command bar whose Sort and Status are set. */
const fs = require('fs'), path = require('path'), http = require('http');
const puppeteer = require('puppeteer-core');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const serve = (root, port) => new Promise((ok) => {
  const s = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split('?')[0]);
    if (!rel.startsWith('/Plenix/')) { res.writeHead(404); res.end(); return; }
    let f = path.join(root, rel.slice(8)); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, 'index.html');
    if (!fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res);
  }); s.listen(port, '127.0.0.1', () => ok(s));
});
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const box = (el, grow) => el.evaluate((e, g) => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height + (g || 0) }; }, grow);

(async () => {
  const [before, after] = process.argv.slice(2).map((p) => path.resolve(p));
  if (!before || !after) throw new Error('usage: capture.js <before-root> <after-root>');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, defaultViewport: null, args: ['--no-sandbox', '--force-device-scale-factor=1.5', '--window-size=1300,900'] });
  try {
    for (const [name, root, port] of [['before', before, 9541], ['after', after, 9542]]) {
      const server = await serve(root, port);
      try {
        const page = await browser.newPage();
        await page.goto('http://127.0.0.1:' + port + '/Plenix/docs/briefs/button-behaviors/sample.html', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#bar .plx-command-bar'); await sleep(900);
        const first = await page.$('#tips button'); const fb = await first.boundingBox();
        await page.mouse.move(fb.x + fb.width / 2, fb.y + fb.height / 2); await sleep(500);
        await page.screenshot({ path: path.join(__dirname, name + '-tips.png'), clip: await box(await page.$('#tips'), 44) });
        await page.mouse.move(2, 2); await sleep(300);
        await page.screenshot({ path: path.join(__dirname, name + '-loading.png'), clip: await box(await page.$('#loading')) });
        await page.screenshot({ path: path.join(__dirname, name + '-bar.png'), clip: await box(await page.$('#bar')) });
        const widths = await page.$$eval('#loading button', (bs) => bs.map((b) => Math.round(b.getBoundingClientRect().width * 100) / 100));
        const bar = await page.$$eval('#bar button', (bs) => bs.map((b) => b.textContent.trim()).filter(Boolean));
        console.log(name, 'loading widths', JSON.stringify(widths), 'bar', JSON.stringify(bar));
        await page.close();
      } finally { server.close(); }
    }
  } finally { await browser.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
