/* Before/after pictures for PR 1 (buttons in the Fluent look, #298). Usage:
     node docs/briefs/buttons-fluent/capture.js <before-root> <after-root>
   Each root is a checkout of the repository (before: styling/phase-2; after: this branch, built). Both are served the
   same way and photographed at a real 150% screen scale (the owner's screen): the sample's buttons, its other controls
   (form row, nav list, an open menu: they share the control corner), its command bar with
   the New menu open, and the Messages header. The pictures land next to this script. */
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
const box = (el) => el.evaluate((e) => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }; });

(async () => {
  const [before, after] = process.argv.slice(2).map((p) => path.resolve(p));
  if (!before || !after) throw new Error('usage: capture.js <before-root> <after-root>');
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, defaultViewport: null, args: ['--no-sandbox', '--force-device-scale-factor=1.5', '--window-size=1100,900'] });
  try {
    for (const [name, root, port] of [['before', before, 9511], ['after', after, 9512]]) {
      const server = await serve(root, port), base = 'http://127.0.0.1:' + port + '/Plenix/';
      try {
        const page = await browser.newPage();
        await page.goto(base + 'docs/briefs/buttons-fluent/sample.html', { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('#bar .plx-command-bar'); await sleep(800);
        await page.screenshot({ path: path.join(__dirname, name + '-buttons.png'), clip: await box(await page.$('#buttons')) });
        // the controls that share the control corner: a form row, a nav list and a menu, open, its first item hovered
        const mt = await (await page.$('#menu button')).boundingBox(); await page.mouse.click(mt.x + mt.width / 2, mt.y + mt.height / 2); await sleep(400);
        const mi = await (await page.$('#menu [role="menuitem"]')).boundingBox(); await page.mouse.move(mi.x + mi.width / 2, mi.y + mi.height / 2); await sleep(300);
        await page.screenshot({ path: path.join(__dirname, name + '-controls.png'), clip: await box(await page.$('#controls')) });
        const radii = await page.evaluate(() => {
          const r = (sel) => { const e = document.querySelector(sel); return e ? getComputedStyle(e).borderTopLeftRadius : 'not found'; };
          const field = (label) => { const f = [...document.querySelectorAll('#controls label')].find((l) => l.textContent.trim() === label);
            const c = f && f.closest('.plx-field'); const box = c && [...c.querySelectorAll('*')].find((e) => parseFloat(getComputedStyle(e).borderTopWidth) > 0);
            return box ? getComputedStyle(box).borderTopLeftRadius : 'not found'; };
          return { button: r('#buttons .plx-button'), input: field('Title'), select: field('Format'), combobox: field('Owner'),
            navItem: r('#controls .plx-nav-list__item, #controls [aria-current]'), menu: r('#menu .plx-menu'), menuItem: r('#menu [role="menuitem"]') };
        });
        console.log(name, JSON.stringify(radii));
        await page.keyboard.press('Escape'); await page.mouse.click(2, 2); await sleep(300);
        const trigger = await page.evaluateHandle(() => [...document.querySelectorAll('#bar button')].find((b) => /^New/.test(b.textContent.trim())));
        const t = await trigger.boundingBox(); await page.mouse.click(t.x + t.width / 2, t.y + t.height / 2); await sleep(400);
        const item = await page.$('.plx-menu [role="menuitem"]'); const ib = await item.boundingBox();
        await page.mouse.move(ib.x + ib.width / 2, ib.y + ib.height / 2); await sleep(300);
        await page.screenshot({ path: path.join(__dirname, name + '-bar.png'), clip: await box(await page.$('#bar')) });
        await page.goto(base + 'messages/index.html', { waitUntil: 'domcontentloaded' });
        const header = await page.waitForSelector('.plx-entity-header', { timeout: 30000 }); await sleep(800);
        await page.screenshot({ path: path.join(__dirname, name + '-header.png'), clip: await box(header) });
        await page.close();
      } finally { server.close(); }
    }
  } finally { await browser.close(); }
  console.log('saved');
})().catch((e) => { console.error(e); process.exit(1); });
