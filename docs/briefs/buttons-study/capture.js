/* The buttons study's measurements and pictures. Usage: node docs/briefs/buttons-study/capture.js
   At 100%, 125% and 150% screen scale it renders the study's corner specimens and the Messages header (the live app),
   measures each icon-only button's top-left corner (how dark the curve draws against the straight side), saves enlarged
   pictures (corner-<scale>.png), photographs both command bars with their New menu open (bar-today.png, bar-new.png) and
   writes corner-data.js for the page. */
const fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '../../..'), { serve } = require(path.join(ROOT, 'tests', 'lib.js'));
const puppeteer = require('puppeteer-core');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// a real device scale (as on a 125% or 150% Windows screen), not an emulated one: emulation smooths a 1.5px border
// across two pixels, a real 150% screen snaps it to one screen pixel (0.667 CSS px), as in the owner’s picture
const launchAt = (s) => puppeteer.launch({ executablePath: CHROME, headless: true, defaultViewport: null, args: ['--no-sandbox', '--force-device-scale-factor=' + s, '--window-size=1300,1000'] });
const PORT = 9498, BASE = 'http://localhost:' + PORT + '/Plenix/';
const SCALES = [1, 1.25, 1.5], ZOOM = 8;
const SPECS = [['0', 'Today: 6px, gray-500'], ['1', '4px only'], ['2', 'gray-300 only'], ['3', 'Proposed: 4px, gray-300']];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// in the page: decode a PNG (base64), measure the top-left corner of the button inside it, and return an enlarged copy
async function analyze(page, b64, radiusPx) {
  return page.evaluate(async (b64, radiusPx, zoom) => {
    const img = new Image(); img.src = 'data:image/png;base64,' + b64; await img.decode();
    const w = img.width, h = img.height, c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d'); x.drawImage(img, 0, 0); const d = x.getImageData(0, 0, w, h).data;
    const dark = (i, j) => { const k = (j * w + i) * 4; return 255 - (d[k] * 0.2126 + d[k + 1] * 0.7152 + d[k + 2] * 0.0722); };
    // the straight sides: the darkest pixel down the middle column (top side) and across the middle row (left side)
    let top = 0, topD = -1; for (let j = 0; j < 6 * devicePixelRatio; j++) { const v = dark(w >> 1, j); if (v > topD) { topD = v; top = j; } }
    let left = 0, leftD = -1; for (let i = 0; i < 6 * devicePixelRatio; i++) { const v = dark(i, h >> 1); if (v > leftD) { leftD = v; left = i; } }
    const edge = (topD + leftD) / 2;
    // the curve: the corner is R screen pixels; in each pixel row (and column) of it, the darkest pixel is where the curve
    // crosses. Its average against the straight side says how much paler the curve draws.
    const R = Math.round(radiusPx); let sum = 0, n = 0;
    for (let k = 1; k < R; k++) {
      let rm = 0, cm = 0; for (let t = 0; t <= R; t++) { rm = Math.max(rm, dark(left + t, top + k)); cm = Math.max(cm, dark(left + k, top + t)); }
      sum += rm + cm; n += 2;
    }
    const curve = n ? sum / n : edge;
    const z = document.createElement('canvas'); z.width = w * zoom; z.height = h * zoom; const zx = z.getContext('2d');
    zx.imageSmoothingEnabled = false; zx.drawImage(img, 0, 0, w * zoom, h * zoom);
    return { side: Math.round(edge), curve: Math.round(curve), jump: Math.round(edge - curve), png: z.toDataURL('image/png').split(',')[1], w: w * zoom, h: h * zoom };
  }, b64, radiusPx, ZOOM);
}

async function shot(page, el, pad) {
  // page coordinates (the clip is measured from the top of the page, not the window)
  const r = await el.evaluate((e) => { const b = e.getBoundingClientRect(); return { x: b.x + scrollX, y: b.y + scrollY, width: b.width, height: b.height }; });
  return page.screenshot({ encoding: 'base64', clip: { x: r.x - pad, y: r.y - pad, width: r.width + 2 * pad, height: r.height + 2 * pad } });
}

(async () => {
  const server = await serve(PORT); let browser, page;
  try {
    const rows = [], pictures = [];
    for (const s of SCALES) {
      if (browser) await browser.close();
      browser = await launchAt(s); page = (await browser.pages())[0] || await browser.newPage();
      await page.goto(BASE + 'docs/briefs/buttons-study/index.html', { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('[data-spec="3"] .plx-button'); await sleep(800);
      const found = [];
      for (const [id, name] of SPECS) {
        const el = await page.$('[data-spec="' + id + '"] .plx-button--icon-only');
        const css = await el.evaluate((b) => { const c = getComputedStyle(b); return { bw: parseFloat(c.borderTopWidth), r: parseFloat(c.borderTopLeftRadius), y: b.getBoundingClientRect().y }; });
        const a = await analyze(page, await shot(page, el, 2), css.r * s);
        found.push({ id, name, a });
        rows.push({ scale: Math.round(s * 100) + '%', spec: name, border: Math.round(css.bw * s * 100) / 100 + ' px (' + Math.round(css.bw * 1000) / 1000 + ' CSS px)',
          corner: Math.round(css.r * s * 10) / 10 + ' px', side: a.side, curve: a.curve, jump: a.jump });
      }
      // the live app: the Messages header's Archive button
      await page.goto(BASE + 'messages/index.html', { waitUntil: 'domcontentloaded' });
      const live = await page.waitForSelector('.plx-entity-header__action .plx-button--icon-only[aria-label="Archive"]', { timeout: 30000 }); await sleep(800);
      const lcss = await live.evaluate((b) => { const c = getComputedStyle(b); return { bw: parseFloat(c.borderTopWidth), r: parseFloat(c.borderTopLeftRadius), y: b.getBoundingClientRect().y }; });
      const la = await analyze(page, await shot(page, live, 2), lcss.r * s);
      rows.push({ scale: Math.round(s * 100) + '%', spec: 'Messages header, Archive (live app)', border: Math.round(lcss.bw * s * 100) / 100 + ' px (' + Math.round(lcss.bw * 1000) / 1000 + ' CSS px)',
        corner: Math.round(lcss.r * s * 10) / 10 + ' px', side: la.side, curve: la.curve, jump: la.jump });
      // one picture per scale: today and proposed, enlarged 8×
      const pair = await page.evaluate(async (a, b) => {
        const load = async (p) => { const i = new Image(); i.src = 'data:image/png;base64,' + p; await i.decode(); return i; };
        const A = await load(a), B = await load(b), gap = 24, c = document.createElement('canvas');
        c.width = A.width + B.width + gap; c.height = Math.max(A.height, B.height); const x = c.getContext('2d');
        x.fillStyle = getComputedStyle(document.body).backgroundColor; x.fillRect(0, 0, c.width, c.height);
        x.drawImage(A, 0, 0); x.drawImage(B, A.width + gap, 0); return c.toDataURL('image/png').split(',')[1];
      }, found[0].a.png, found[3].a.png);
      const file = 'corner-' + Math.round(s * 100) + '.png';
      fs.writeFileSync(path.join(__dirname, file), Buffer.from(pair, 'base64'));
      pictures.push({ src: file, caption: Math.round(s * 100) + '% screen scale, enlarged 8×. Left: today (6px, gray-500): solid sides, a pale cut at the corner. Right: proposed (4px, gray-300).' });
    }
    // the command bars with their New menu open, at 150% (the owner's screen)
    await page.goto(BASE + 'docs/briefs/buttons-study/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-bar="new"] .plx-command-bar'); await sleep(800);
    const menus = {};
    for (const which of ['today', 'new']) {
      const barEl = await page.$('[data-bar="' + which + '"]');
      await barEl.evaluate((e) => e.scrollIntoView({ block: 'center' })); await sleep(300);
      const trigger = await page.evaluateHandle((w) => [...document.querySelectorAll('[data-bar="' + w + '"] .plx-command-bar button')].find((b) => /^New/.test(b.textContent.trim())), which);
      const tb = await trigger.boundingBox();
      await page.mouse.click(tb.x + tb.width / 2, tb.y + tb.height / 2); await sleep(500);
      // hover the first item so its hover look shows
      const item = await page.$('.plx-menu [role="menuitem"]');
      if (item) { const ib = await item.boundingBox(); await page.mouse.move(ib.x + ib.width / 2, ib.y + ib.height / 2); await sleep(300); }
      menus[which] = await page.evaluate(() => { const m = document.querySelector('.plx-menu'), i = m && m.querySelector('[role="menuitem"]');
        return m ? { menu: getComputedStyle(m).borderTopLeftRadius, item: getComputedStyle(i).borderTopLeftRadius, itemH: i.getBoundingClientRect().height, hover: getComputedStyle(i).backgroundColor } : null; });
      const br = await barEl.evaluate((e) => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height }; });
      await page.screenshot({ path: path.join(__dirname, 'bar-' + which + '.png'), clip: { x: br.x, y: br.y, width: br.width, height: Math.min(br.height, 260) } });
      await page.keyboard.press('Escape'); await page.mouse.click(5, 5); await sleep(300);
    }
    fs.writeFileSync(path.join(__dirname, 'corner-data.js'), '/* GENERATED by capture.js: the corner measurements and pictures for the buttons study. */\nwindow.BS_CORNER = ' + JSON.stringify({ rows, pictures, menus }, null, 1) + ';\n');
    // the whole page at 100%, with the new data, for the report
    await browser.close(); browser = await launchAt(1); page = (await browser.pages())[0];
    await page.goto(BASE + 'docs/briefs/buttons-study/index.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('[data-bar="new"] .plx-command-bar'); await sleep(1200);
    await page.screenshot({ path: path.join(__dirname, 'screenshot.png'), fullPage: true });
    console.log(rows.map((r) => [r.scale, r.spec, r.border, r.corner, r.side, r.curve, r.jump].join(' | ')).join('\n'));
    console.log(JSON.stringify(menus));
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
