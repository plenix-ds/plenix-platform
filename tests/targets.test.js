// Plenix tests · target sizes (WCAG 2.2 SC 2.5.8 AA and 2.5.5 AAA; Platforms Standard 3.1, 3.2 and 8.1): every visible
// interactive element on every app page and a sample of the design system's pages, measured by its target area: the
// region where a pointer lands on it (hit-tested with elementFromPoint along its center lines, so an invisible extension
// such as a ::before target counts; a visually hidden checkbox or radio is measured by its label).
//   coarse   any coarse pointer (touch emulated: pointer and hover media, touch events; <html data-plx-interaction="touch">):
//            at least 44x44
//   fine     a mouse: at least 24x24, or the spacing rule: a 24px circle centered on the undersized target touches no
//            other target and no other undersized target's circle
// Exceptions (WCAG): a link inside a sentence (inline); a disabled control; a control whose label is an equivalent target
// that meets the size (a checkbox and its label: the larger counts); and an element whose center another element covers
// (it is not a target where it stands; counted as "covered" only).
// Known findings are kept in tests/baselines/targets.json (page -> mode -> number of elements); the test fails only on a
// page and mode with more findings than recorded, so they can only go down.
//   node tests/targets.test.js            compare
//   node tests/targets.test.js --update   record the current findings as the baseline (after fixing some, to lower it)
//   TARGETS_VERBOSE=1 node tests/targets.test.js   list every finding
//   TARGETS_PORT=8853 node tests/targets.test.js   another port (several runs side by side)
const fs = require('fs');
const path = require('path');
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.TARGETS_PORT || 8843, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';
const BASELINE = path.join(__dirname, 'baselines', 'targets.json');
const APP_PAGES = ['dashboard', 'projects', 'messages', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'settings'].map((a) => a + '/index.html')
  .concat(['dam/index.html', 'dam/settings-system.html', 'dam/settings-myaccount.html', 'dam/image-editor.html']);

// runs in the page: the undersized targets for a minimum size (44 coarse, 24 fine with the spacing rule)
function measure(min, spacing) {
  const SEL = 'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"], [role="tab"], [role="checkbox"], [role="radio"], [role="switch"], [role="menuitem"], [role="option"], [role="slider"], [role="treeitem"], [tabindex]:not([tabindex="-1"])';
  const name = (el) => { const c = typeof el.className === 'string' ? el.className.split(' ').filter((x) => /^(plx|ds)-/.test(x) && !/^plx-u-/.test(x)).slice(0, 2).join('.') : ''; return el.tagName.toLowerCase() + (c ? '.' + c : '') + (el.getAttribute('aria-label') ? '[' + el.getAttribute('aria-label').slice(0, 20) + ']' : el.innerText ? ' "' + el.innerText.trim().slice(0, 16) + '"' : ''); };
  const shown = (el) => { const c = getComputedStyle(el); return c.display !== 'none' && c.visibility !== 'hidden' && c.pointerEvents !== 'none' && !el.closest('[hidden], [inert]'); };
  // a link in running text: its parent has text of its own beside it
  const inline = (el) => el.tagName === 'A' && getComputedStyle(el).display === 'inline' && [...el.parentElement.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const out = { fail: [], covered: 0, n: 0 };
  const targets = [];
  for (const el of document.querySelectorAll(SEL)) {
    if (!shown(el) || el.disabled || el.getAttribute('aria-disabled') === 'true' || inline(el)) continue;
    let t = el;
    const r0 = el.getBoundingClientRect();
    const tiny = r0.width <= 2 || r0.height <= 2 || getComputedStyle(el).opacity === '0';
    if (tiny) { if (el.labels && el.labels[0]) t = el.labels[0]; else continue; }   // a visually hidden input: its label is the target
    targets.push({ el, t });
  }
  // the hit area of one element along its center lines, up to 32px beyond its box (null: covered where it stands)
  const hitArea = (t, el) => {
    const r = t.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return null;
    const owns = (x) => x && (x === t || t.contains(x) || x === el || el.contains(x) || (x.closest && x.closest('label') === t));
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    if (cx < 0 || cy < 0 || cx > innerWidth || cy > innerHeight || !owns(document.elementFromPoint(cx, cy))) return null;
    const reach = (dx, dy, lim) => { let d = 0; while (d < lim) { const x = cx + dx * (d + 1), y = cy + dy * (d + 1); if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight || !owns(document.elementFromPoint(x, y))) break; d++; } return d; };
    return { r, cx, cy, w: reach(-1, 0, r.width / 2 + 32) + reach(1, 0, r.width / 2 + 32) + 1, h: reach(0, -1, r.height / 2 + 32) + reach(0, 1, r.height / 2 + 32) + 1 };
  };
  const home = new Map(targets.map(({ t }) => [t, t.getBoundingClientRect()]));
  const box = [];
  for (const { el, t } of targets) {
    t.scrollIntoView({ block: 'center', inline: 'center' });
    const a = hitArea(t, el);
    if (!a) { out.covered++; continue; }
    out.n++;
    let { w, h } = a;
    // an equivalent target: the control's label (a checkbox's text), when it is the larger
    if ((w < min - 0.5 || h < min - 0.5) && t === el && el.labels && el.labels[0]) {
      const lab = el.labels[0]; lab.scrollIntoView({ block: 'center', inline: 'center' });
      const b = hitArea(lab, el); if (b && b.w >= min - 0.5 && b.h >= min - 0.5) { w = b.w; h = b.h; }
    }
    // its box where the page stood before any scrolling (every target measured in the same scroll state), for the spacing rule
    const r = home.get(t);
    box.push({ el: t, w, h, x: r.left, y: r.top, cx: r.left + r.width / 2, cy: r.top + r.height / 2, rw: r.width, rh: r.height, small: w < min - 0.5 || h < min - 0.5 });
  }
  for (const b of box) {
    if (!b.small) continue;
    if (spacing) {
      // the 24px circle on the undersized target: clear of every other target's box and every other undersized circle
      const R = min / 2;
      const hits = box.some((o) => {
        if (o === b || o.el.contains(b.el) || b.el.contains(o.el)) return false;
        const nx = Math.max(o.x, Math.min(b.cx, o.x + o.rw)), ny = Math.max(o.y, Math.min(b.cy, o.y + o.rh));
        if (Math.hypot(nx - b.cx, ny - b.cy) < R) return true;
        return o.small && Math.hypot(o.cx - b.cx, o.cy - b.cy) < min;
      });
      if (!hits) continue;
    }
    out.fail.push(name(b.el) + ' ' + b.w + 'x' + b.h);
  }
  window.scrollTo(0, 0);
  return out;
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  const found = {};
  const MODES = [
    { mode: 'coarse', min: 44, spacing: false, width: 1280, height: 900 },
    { mode: 'fine', min: 24, spacing: true, width: 1440, height: 1000 },
  ];
  let interactionOk = true;
  for (const M of MODES) {
    const page = await browser.newPage(); await page.setViewport({ width: M.width, height: M.height, hasTouch: M.mode === 'coarse' });
    if (M.mode === 'coarse') {
      const cdp = await page.target().createCDPSession();
      await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
      await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'pointer', value: 'coarse' }, { name: 'any-pointer', value: 'coarse' }, { name: 'hover', value: 'none' }, { name: 'any-hover', value: 'none' }, { name: 'prefers-reduced-motion', value: 'reduce' }] });
    }
    const take = async (key) => {
      if (M.mode === 'coarse' && (await page.evaluate(() => document.documentElement.getAttribute('data-plx-interaction'))) !== 'touch') interactionOk = false;
      const r = await page.evaluate(measure, M.min, M.spacing);
      (found[key] = found[key] || {})[M.mode] = r;
    };
    for (const a of APP_PAGES) { await page.goto(BASE + a, { waitUntil: 'networkidle0' }); await sleep(800); await take(a); }
    const HAS_DS = fs.existsSync(path.join(__dirname, '..', 'platform', 'design-system', 'index.html'));
    if (!HAS_DS && M.mode === 'coarse') console.log('NOTE: platform/design-system is not checked out; its pages are skipped');
    if (HAS_DS) {
      await page.goto(BASE + 'platform/design-system/', { waitUntil: 'networkidle0' }); await sleep(1500); await take('design-system home');
      const routes = await page.evaluate(() => { const seen = {}; return window.DSInventory.filter((r) => !seen[r.sec] && (seen[r.sec] = true)).map((r) => '#/' + r.sec + '/' + r.id); });
      for (const r of routes) { await page.evaluate((h) => { location.hash = h; }, r); await sleep(900); await take('design-system ' + r); }
    }
    await page.close();
  }
  await browser.close(); server.close();
  if (!interactionOk) { console.log('TARGETS_FAIL the coarse pointer was not emulated (data-plx-interaction is not "touch")'); process.exit(1); }

  const modes = MODES.map((m) => m.mode);
  const total = (m) => Object.keys(found).reduce((n, p) => n + found[p][m].fail.length, 0);
  const measured = (m) => Object.keys(found).reduce((n, p) => n + found[p][m].n, 0);
  const summary = modes.map((m) => m + ' ' + total(m) + ' of ' + measured(m)).join(', ');
  if (process.env.TARGETS_VERBOSE || process.argv.includes('--update')) Object.keys(found).forEach((p) => modes.forEach((m) => { if (found[p][m].fail.length) console.log('  ' + p + ' · ' + m + ': ' + found[p][m].fail.length + ' · ' + found[p][m].fail.slice(0, process.env.TARGETS_VERBOSE ? 99 : 4).join(' | ')); }));
  if (process.argv.includes('--update')) {
    const base = {}; Object.keys(found).forEach((p) => modes.forEach((m) => { if (found[p][m].fail.length) (base[p] = base[p] || {})[m] = found[p][m].fail.length; }));
    fs.mkdirSync(path.dirname(BASELINE), { recursive: true }); fs.writeFileSync(BASELINE, JSON.stringify(base, null, 1) + '\n');
    console.log('TARGETS_BASELINE written: undersized targets ' + summary + ' on ' + Object.keys(found).length + ' pages');
    return;
  }
  const base = fs.existsSync(BASELINE) ? JSON.parse(fs.readFileSync(BASELINE, 'utf8')) : {};
  const worse = []; let better = 0;
  Object.keys(found).forEach((p) => modes.forEach((m) => { const was = (base[p] || {})[m] || 0, now = found[p][m].fail.length; if (now > was) worse.push(p + ' · ' + m + ': ' + was + ' -> ' + now + ' · e.g. ' + found[p][m].fail.slice(0, 4).join(' | ')); else if (now < was) better++; }));
  worse.forEach((w) => console.log('  NEW ' + w));
  if (better) console.log('  ' + better + ' pages have fewer undersized targets: run with --update to lower the baseline');
  console.log((worse.length ? 'TARGETS_FAIL ' + worse.length + ' pages got worse; ' : 'TARGETS_OK ') + 'undersized targets ' + summary + ' on ' + Object.keys(found).length + ' pages');
  process.exit(worse.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
