/* Plenix tests · the app frame in right to left (issue 413, rtl-413-a).
   Summary: with dir="rtl" lang="ar" on the page, part by part:
     AppShell     no sideways scroll; the header's start (brand, navigation) at the right edge, its end (account, tools) at the left
     NavPane      the navigation pane at the right edge; its collapse arrow mirrored, open and collapsed (the rail at the right)
     SidePanel    the Asset Manager's details panel at the end side (the left); its arrows mirrored
     AppHeader    the account menu's sign-out arrow mirrored (it leaves through the door to the left)
     Tooltip      placement "start" opens to the right of its trigger, "end" to the left
     Toast        at the end corner (the left), its tone stripe on its start edge (the right)
     CommandBar   commands run from the right; the More button, when shown, is the last at the left
   Usage: node tests/rtl-app-frame.test.js   → RTL_APP_FRAME_OK */
const assert = require('assert/strict'), { serve, launch } = require('./lib');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const PORT = +process.env.TEST_PORT || 9652, server = await serve(PORT); let browser;
  const BASE = 'http://localhost:' + PORT + '/Plenix/';
  try {
    browser = await launch(); const page = await browser.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewport({ width: 1280, height: 800 });
    const rtl = () => page.evaluate(() => { document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ar'); });
    const box = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel); if (!e || !e.getClientRects().length) return null; const b = e.getBoundingClientRect(); return { left: b.left, right: b.right, width: b.width, W: window.innerWidth }; }, sel);
    const scaleOf = (sel) => page.evaluate((sel) => { const e = document.querySelector(sel); return e ? getComputedStyle(e).scale : null; }, sel);

    // AppShell, NavPane, AppHeader (the Projects application)
    await page.goto(BASE + 'projects/index.html', { waitUntil: 'networkidle0' }); await rtl(); await sleep(1200);
    assert.equal(await page.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth), 0, 'AppShell: no sideways scroll in right to left');
    const start = await box('.plx-app-header__start'), end = await box('.plx-app-header__end');
    assert.ok(start && end && start.left > end.right, 'AppHeader: its start (brand, applications) is right of its end (account, tools): ' + JSON.stringify({ start, end }));
    const nav = await box('.plx-nav-pane');
    assert.ok(nav && Math.abs(nav.right - nav.W) <= 1, 'NavPane: at the right edge: ' + JSON.stringify(nav));
    assert.equal(await scaleOf('.plx-nav-pane .plx-icon--mirrored'), '-1 1', 'NavPane: its collapse arrow is mirrored');
    await page.evaluate(() => { const bt = [...document.querySelectorAll('.plx-nav-pane button')].find((x) => x.querySelector('.plx-icon--mirrored')); if (bt) bt.click(); }); await sleep(600);
    const rail = await page.evaluate(() => { const r = [...document.querySelectorAll('.plx-app-shell [class*="rail"], .plx-nav-pane')].find((e) => e.getClientRects().length); if (!r) return null; const b = r.getBoundingClientRect(); return { right: b.right, W: window.innerWidth, mirrored: getComputedStyle(r.querySelector('.plx-icon--mirrored') || r).scale }; });
    assert.ok(rail && Math.abs(rail.right - rail.W) <= 1 && rail.mirrored === '-1 1', 'NavPane: collapsed, the rail stays at the right edge and its expand arrow is mirrored: ' + JSON.stringify(rail));
    // the account menu's sign-out arrow
    await page.evaluate(() => { const a = document.querySelector('.plx-app-header__end button[aria-haspopup], .plx-app-header__end .plx-avatar'); (a.closest('button') || a).click(); }); await sleep(600);
    const out = await page.evaluate(() => { const i = document.querySelector('[role="menu"] .plx-icon--sign-out, [role="menu"] .plx-icon--logout'); return i ? { mirrored: i.classList.contains('plx-icon--mirrored'), scale: getComputedStyle(i).scale } : null; });
    assert.ok(out && out.mirrored && out.scale === '-1 1', 'AppHeader: the sign-out arrow is mirrored: ' + JSON.stringify(out));
    await page.keyboard.press('Escape');

    // SidePanel (the Asset Manager's details)
    await page.goto(BASE + 'dam/index.html', { waitUntil: 'networkidle0' }); await rtl(); await sleep(1500);
    const side = await box('.plx-side-panel');
    assert.ok(side && side.left <= 1, 'SidePanel: at the end side (the left edge): ' + JSON.stringify(side));
    assert.equal(await scaleOf('.plx-side-panel .plx-icon--mirrored'), '-1 1', 'SidePanel: its arrow is mirrored');
    assert.equal(await page.evaluate(() => document.scrollingElement.scrollWidth - document.scrollingElement.clientWidth), 0, 'the Asset Manager: no sideways scroll');

    // Tooltip, Toast, CommandBar (a fixture page)
    await page.goto(BASE + 'tests/fixtures/platform-host.html', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM, { timeout: 60000 }); await rtl();
    await page.evaluate(async () => {
      const h = React.createElement, P = window.Plenix, noop = () => {};
      document.getElementById('main').innerHTML = '<div id="c"></div>';
      function Toaster() { const t = P.useToast(); React.useEffect(() => { t.show('تم الحفظ', { tone: 'success', duration: 0 }); }, []); return null; }
      ReactDOM.createRoot(document.getElementById('c')).render(h(P.ToastProvider, null, h(Toaster),
        h(P.Stack, { gap: 'xl' },
          h(P.Inline, { gap: 'xl' },
            h(P.Tooltip, { content: 'بداية', placement: 'start' }, h(P.Button, { id: 'tip-start' }, 'البداية')),
            h(P.Tooltip, { content: 'نهاية', placement: 'end' }, h(P.Button, { id: 'tip-end' }, 'النهاية'))),
          h('div', { id: 'bar' }, h(P.CommandBar, { label: 'أدوات', actions: ['جديد', 'رفع', 'تنزيل', 'مشاركة', 'نقل', 'حذف', 'نسخ', 'تصدير'].map((x, i) => ({ id: 'i' + i, label: x, icon: 'add', onSelect: noop })) })))));
      await new Promise((r) => setTimeout(r, 800));
    });
    const tip = async (id) => { await page.focus('#' + id); await sleep(400); return page.evaluate((id) => { const t = document.getElementById(id), b = t.closest('.plx-tooltip').querySelector('.plx-tooltip__bubble'), a = t.getBoundingClientRect(), c = b.getBoundingClientRect(); return c.right <= a.left + 1 ? 'left' : c.left >= a.right - 1 ? 'right' : 'over'; }, id); };
    assert.equal(await tip('tip-start'), 'right', 'Tooltip: "start" opens to the right of its trigger in right to left');
    assert.equal(await tip('tip-end'), 'left', 'Tooltip: "end" opens to the left of its trigger in right to left');
    const toast = await page.evaluate(() => { const t = document.querySelector('.plx-toast'), b = t.getBoundingClientRect(), c = getComputedStyle(t); return { left: b.left, right: b.right, W: window.innerWidth, start: parseFloat(c.borderRightWidth), end: parseFloat(c.borderLeftWidth) }; });
    assert.ok(toast.right < toast.W / 2, 'Toast: at the end corner (the left half): ' + JSON.stringify(toast));
    assert.ok(toast.start >= toast.end, 'Toast: its tone stripe on its start edge (the right): ' + JSON.stringify(toast));
    // CommandBar: commands from the right; narrowed, the More button is the leftmost
    const order = async () => page.evaluate(() => [...document.querySelectorAll('#bar [role="toolbar"] button')].filter((b) => b.getClientRects().length && !b.closest('[inert]')).map((b) => Math.round(b.getBoundingClientRect().left)));
    const wide = await order();
    assert.ok(wide.length > 1 && wide.every((x, i) => i === 0 || x < wide[i - 1]), 'CommandBar: commands run from the right: ' + JSON.stringify(wide));
    await page.evaluate(() => { document.getElementById('bar').style.inlineSize = '200px'; }); await sleep(600);
    const narrow = await page.evaluate(() => { const bs = [...document.querySelectorAll('#bar [role="toolbar"] button')].filter((b) => b.getClientRects().length && !b.closest('[inert]')); const more = bs.find((b) => b.getAttribute('aria-haspopup')); return { more: more ? Math.round(more.getBoundingClientRect().left) : null, lefts: bs.map((b) => Math.round(b.getBoundingClientRect().left)) }; });
    assert.ok(narrow.more !== null && narrow.more === Math.min(...narrow.lefts), 'CommandBar: narrowed, More is the leftmost button: ' + JSON.stringify(narrow));

    assert.deepEqual(errors, [], 'no script errors');
    console.log('RTL_APP_FRAME_OK');
  } finally { if (browser) await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
