// Plenix tests · navigation (Platforms Standard 4.3 and 8.1 "Navigation", "Restoration"; 5.2 List-detail): scripted
// navigation in the applications, as a person moves:
//   screen        opening a screen gives it an address (#/note/<id>) and a history entry; Back returns
//   deep link     an address opens its screen alone: the history is not padded
//   parent        the parent control goes to the logical parent: Back when the history follows the hierarchy, else a new entry
//   guard         with unsaved changes, opening another screen and Back ask with the Plenix dialog ("Leave without saving?"),
//                 never the browser's confirm(); Keep editing stays (Back is undone), Leave goes
//   page guard    a link to another page asks the same; closing the tab asks with the browser's beforeunload
//   list-detail   at 390px (Narrow) notes, messages and contacts show one pane at a time: the list (no selection shown),
//                 then the detail with Back to the list; the browser's Back returns to the list
//   restoration   the last screen and the list's width and scroll come back on load (plenix.<app>.view)
//   no rewrite    choosing a section in the DAM settings pages pushes an entry (never replaceState)
//   legacy        an older address (#t-2, #account) opens its screen under its new address
//   node tests/navigation.test.js            run
//   NAV_PORT=8855 node tests/navigation.test.js   another port (several runs side by side)
const { serve, launch, sleep } = require('./lib.js');
const PORT = +process.env.NAV_PORT || 8845, BASE = 'http://127.0.0.1:' + PORT + '/Plenix/';

let failed = 0;
const check = (name, ok, detail) => { console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || !detail ? '' : '  (' + detail + ')')); if (!ok) failed++; };
const hash = (page) => page.evaluate(() => location.hash);
const len = (page) => page.evaluate(() => history.length);
const text = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); return el ? el.innerText.trim() : null; }, sel);
const shown = (page, sel) => page.evaluate((s) => { const el = document.querySelector(s); if (!el) return false; const c = getComputedStyle(el); return c.display !== 'none' && c.visibility !== 'hidden' && el.getClientRects().length > 0; }, sel);
const dialog = (page) => page.evaluate(() => { const d = document.querySelector('[role="alertdialog"]'); return d ? d.innerText : null; });
const press = (page, label) => page.evaluate((l) => { const b = [...document.querySelectorAll('[role="alertdialog"] button')].find((x) => x.innerText.trim() === l); if (b) b.click(); return !!b; }, label);
const back = async (page) => { await page.evaluate(() => history.back()); await sleep(250); };
const settle = () => sleep(250);
// the rows of a SecondaryPane list (RowButtons in its body)
const rows = '.plx-secondary-pane__body button';
const clickRow = (page, i) => page.evaluate((s, n) => { document.querySelectorAll(s)[n].click(); }, rows, i);

async function fresh(browser, url, width) {
  const page = await browser.newPage();
  await page.setViewport({ width: width || 1440, height: 900 });
  await page.goto(BASE + 'dashboard/index.html', { waitUntil: 'load' });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) { /* none */ } });
  await page.goto(BASE + url, { waitUntil: 'load' });
  await page.waitForSelector('.plx-app-shell', { timeout: 15000 });
  await settle();
  return page;
}

(async () => {
  const server = await serve(PORT);
  const browser = await launch();
  try {
    /* ── screen, Back, parent ── */
    let page = await fresh(browser, 'notes/index.html');
    const before = await len(page);
    await clickRow(page, 1); await settle();
    const h1 = await hash(page);
    check('screen: opening a note gives it an address', /^#\/note\/\d+$/.test(h1), h1);
    check('screen: opening a note pushes a history entry', (await len(page)) === before + 1, (await len(page)) + ' vs ' + before);
    check('screen: the note shows', !!(await text(page, '.plx-entity-header h1, .plx-entity-header h2')));
    await back(page);
    check('back: Back returns to the list', ['', '#', '#/'].includes(await hash(page)), await hash(page));
    check('back: the list screen shows its empty state', /Select a note/.test(await text(page, '.plx-page-content') || ''));
    await page.close();

    /* ── deep link ── */
    page = await browser.newPage();
    await page.goto(BASE + 'notes/index.html', { waitUntil: 'load' });
    const plain = await len(page);
    await page.close();
    page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(BASE + 'notes/index.html#/note/2', { waitUntil: 'load' });
    await page.waitForSelector('.plx-entity-header', { timeout: 15000 }); await settle();
    check('deep link: the note opens directly', (await hash(page)) === '#/note/2');
    check('deep link: the history is not padded', (await len(page)) === plain, (await len(page)) + ' vs ' + plain);
    await page.close();

    /* ── guard: another screen, Back ── */
    page = await fresh(browser, 'notes/index.html');
    await clickRow(page, 0); await settle();
    const noteAddr = await hash(page);
    await page.focus('textarea'); await page.keyboard.type(' more');
    await clickRow(page, 1); await settle();
    const ask = await dialog(page);
    check('guard: opening another screen asks', !!ask && /Leave without saving\?/.test(ask), ask);
    await press(page, 'Keep editing'); await settle();
    check('guard: Keep editing stays on the screen', (await hash(page)) === noteAddr && !(await dialog(page)), await hash(page));
    await back(page); await sleep(300);
    check('guard: Back asks', /Leave without saving\?/.test((await dialog(page)) || ''));
    check('guard: while asking, Back is undone', (await hash(page)) === noteAddr, await hash(page));
    await press(page, 'Leave'); await sleep(400);
    check('guard: Leave goes back', ['', '#', '#/'].includes(await hash(page)), await hash(page));
    // a link to another page asks with the Plenix dialog; the tab asks with beforeunload
    await clickRow(page, 0); await settle();
    await page.focus('textarea'); await page.keyboard.type(' again');
    const appLink = await page.evaluate(() => { const a = [...document.querySelectorAll('a[href]')].find((x) => /contacts\/index\.html/.test(x.getAttribute('href'))); if (a) a.click(); return !!a; });
    await settle();
    check('page guard: a link to another application asks', appLink && /Leave without saving\?/.test((await dialog(page)) || ''), appLink ? 'no dialog' : 'no link');
    check('page guard: the page stays while asking', /notes\/index\.html/.test(page.url()));
    await press(page, 'Keep editing'); await settle();
    let unload = null;
    page.once('dialog', async (d) => { unload = d.type(); await d.dismiss(); });
    await Promise.race([page.goto(BASE + 'contacts/index.html').catch(() => null), sleep(2500)]);
    check('page guard: leaving the tab asks (beforeunload)', unload === 'beforeunload', String(unload));
    await page.close();

    /* ── list-detail at Narrow (390px) ── */
    for (const [app, open] of [['notes', /^#\/note\/\d+$/], ['messages', /^#\/thread\/\d+$/], ['contacts', /^#\/contact\/\d+$/]]) {
      page = await fresh(browser, app + '/index.html', 390);
      check(app + ' at 390px: the list fills the screen', await shown(page, '.plx-secondary-pane--list'));
      check(app + ' at 390px: the detail is hidden', !(await shown(page, '.plx-page-panes > :not(.plx-secondary-pane)')));
      check(app + ' at 390px: no selection shown in the list', (await page.$$eval(rows + '[aria-current="true"]', (x) => x.length)) === 0);
      await clickRow(page, 1); await settle();
      check(app + ' at 390px: choosing an item opens its detail', open.test(await hash(page)), await hash(page));
      check(app + ' at 390px: the list steps aside', !(await shown(page, '.plx-secondary-pane')));
      check(app + ' at 390px: Back to the list leads the detail', /^Back to /.test((await text(page, '.plx-secondary-pane-back')) || ''));
      check(app + ' at 390px: focus is on Back', await page.evaluate(() => !!document.activeElement.closest('.plx-secondary-pane-back')));
      await back(page);
      check(app + ' at 390px: the browser\'s Back returns to the list', await shown(page, '.plx-secondary-pane--list'));
      await clickRow(page, 2); await settle();
      await page.evaluate(() => document.querySelector('.plx-secondary-pane-back button').click()); await settle();
      check(app + ' at 390px: the Back control returns to the list', await shown(page, '.plx-secondary-pane--list') && ['', '#', '#/'].includes(await hash(page)), await hash(page));
      check(app + ' at 390px: focus returns to the chosen item', await page.evaluate((s) => document.activeElement === document.querySelectorAll(s)[2], rows));
      await page.close();
    }

    /* ── restoration ── */
    page = await fresh(browser, 'notes/index.html');
    await clickRow(page, 2); await settle();
    const last = await hash(page);
    await page.evaluate(() => { const b = document.querySelector('.plx-secondary-pane__body'); b.scrollTop = 40; b.dispatchEvent(new Event('scroll')); });
    await settle();
    await page.goto(BASE + 'notes/index.html', { waitUntil: 'load' }); await page.waitForSelector('.plx-app-shell'); await settle();
    check('restoration: the last screen opens when the address names none', (await hash(page)) === last, (await hash(page)) + ' vs ' + last);
    const view = await page.evaluate(() => JSON.parse(localStorage.getItem('plenix.notes.view') || '{}'));
    check('restoration: the view is kept in plenix.notes.view', view.screen === last, JSON.stringify(view));
    await page.close();

    /* ── no rewrite: the DAM settings pages push their sections ── */
    for (const [file, label] of [['dam/settings-system.html', 'Users'], ['dam/settings-myaccount.html', 'Preferences']]) {
      page = await fresh(browser, file);
      const n0 = await len(page);
      await page.evaluate((l) => { const b = [...document.querySelectorAll('.plx-nav-pane button, .plx-nav-pane a, [role="navigation"] button')].find((x) => x.innerText.trim() === l); if (b) b.click(); }, label);
      await settle();
      check(file + ': a section is a new history entry', (await len(page)) === n0 + 1 && /^#\//.test(await hash(page)), (await len(page)) + ' vs ' + n0 + ', ' + (await hash(page)));
      await back(page);
      check(file + ': Back returns to the previous section', !/users|preferences/.test(await hash(page)), await hash(page));
      await page.close();
    }

    /* ── legacy addresses ── */
    page = await fresh(browser, 'messages/index.html#t-2');
    check('legacy: #t-2 opens #/thread/2', (await hash(page)) === '#/thread/2', await hash(page));
    await page.close();
    page = await fresh(browser, 'settings/index.html#account');
    check('legacy: #account opens #/account', (await hash(page)) === '#/account', await hash(page));
    await page.close();
  } catch (e) {
    console.error(e); failed++;
  } finally {
    await browser.close();
    server.close();
  }
  console.log(failed ? '\n' + failed + ' navigation check(s) failed' : '\nNAVIGATION_OK');
  process.exit(failed ? 1 : 0);
})();
