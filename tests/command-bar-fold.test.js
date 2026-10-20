// The actual Posts reference at 360px, plus required-radio and opt-in end-content folding.
const assert = require('node:assert/strict'), { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9267, server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(), errors = []; page.on('pageerror', error => errors.push(error.message));
    await page.setViewport({ width: 360, height: 1000 });
    await page.goto('http://127.0.0.1:' + port + '/Plenix/docs/composition/posts.html', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => document.querySelector('[data-plx-engine=next] [role=grid]') && document.querySelector('[aria-label="More actions"]'));
    const wait = () => new Promise(resolve => setTimeout(resolve, 180)); await wait();
    const more = async () => { if (!await page.$('[role=menu]')) { await page.click('[aria-label="More actions"]'); await wait(); } };
    const choose = async (name, selector) => {
      await more(); const button = await page.evaluateHandle(name => [...document.querySelectorAll('[role=menuitem][aria-haspopup=menu]')].find(item => item.textContent.startsWith(name)), name);
      assert.ok(await button.asElement(), 'missing submenu ' + name); await button.asElement().click(); await wait(); const id = await button.asElement().evaluate(element => element.getAttribute('aria-controls')); await page.evaluate((id, selector) => document.getElementById(id).querySelector(selector).click(), id, selector); await wait(); await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await wait();
    };
    const kept = await page.evaluate(() => [...document.querySelectorAll('.plx-command-bar__find button')].map(button => button.getAttribute('aria-label') || button.textContent));
    assert.ok(!kept.some(label => /Community|Tags|Collection/.test(label)), 'all Posts quick filters should fold at 360px: ' + kept.join(','));
    for (const [name, field, value] of [['Community', 'community', 'r/design'], ['Tags', 'tags', 'buyers'], ['Collection', 'collection', 'Kitchen']]) {
      await choose(name, '[role=menuitemcheckbox]');
      const count = await page.$eval('[data-plx-engine=next] [role=grid]', grid => Number(grid.getAttribute('aria-rowcount')) - 1);
      assert.equal(count, 8, name + ' still filters');
    }
    await more(); const toggle = await page.evaluateHandle(() => [...document.querySelectorAll('[role=menuitemcheckbox]')].find(item => item.textContent.includes('Offline copies only'))); assert.ok(toggle.asElement()); await toggle.asElement().click(); await wait();
    assert.equal(await page.$eval('[data-plx-engine=next] [role=grid]', grid => Number(grid.getAttribute('aria-rowcount')) - 1), 4);
    await page.keyboard.press('Escape');
    // Reuse the public components in a narrow host; the descriptor folds but a plain end node remains visible.
    await page.addStyleTag({content: '.plx-test-fold-fixture{inline-size:var(--plx-ref-size-96px)}'});
    await page.evaluate(() => {
      const h = React.createElement, P = Plenix, host = document.createElement('main'); host.className = 'plx-test-fold-fixture'; document.body.replaceChildren(host); window.foldRoot = ReactDOM.createRoot(host);
      function Demo() {
        const [value, setValue] = React.useState([]), [done, setDone] = React.useState(false);
        window.foldValue = value; window.foldDone = done;
        return h(P.CommandBar, { label: 'Fixture', find: h(P.CommandBarSearch, { placeholder: 'Search' }), actions: [{ label: 'Long action', icon: 'download-tray' }],
          quickFilters: [{ label: 'Required status', icon: 'filter', kind: 'single', required: true, options: ['Draft', 'Published'], value, onChange: setValue }],
          end: { content: h(P.Button, null, 'Long end controls stay labeled'), fold: { label: 'Export settings', icon: 'export', items: [{ label: 'Include metadata', checked: done, onSelect: () => setDone(!done) }] } } });
      }
      ReactDOM.flushSync(() => foldRoot.render(h(Demo)));
    }); await wait();
    await more();
    const sub = await page.evaluateHandle(() => [...document.querySelectorAll('[role=menuitem][aria-haspopup=menu]')].find(item => item.textContent.includes('Required status'))); assert.ok(sub.asElement()); await sub.asElement().click(); await wait();
    assert.equal(await page.$$eval('[role=menuitemradio]', items => items.length), 2); assert.equal(await page.$eval('[role=menuitemradio]', item => item.getAttribute('aria-checked')), 'true');
    await page.click('[role=menuitemradio]:last-child'); await wait(); assert.deepEqual(await page.evaluate(() => foldValue), ['Published']); await page.keyboard.press('Escape'); await page.keyboard.press('Escape'); await wait();
    await more(); const ending = await page.evaluateHandle(() => [...document.querySelectorAll('[role=menuitem][aria-haspopup=menu]')].find(item => item.textContent.includes('Export settings'))); assert.ok(ending.asElement()); await ending.asElement().click(); await wait(); await page.click('[role=menuitemcheckbox]'); await wait(); assert.equal(await page.evaluate(() => foldDone), true);
    await page.evaluate(() => {
      ReactDOM.flushSync(() => foldRoot.render(React.createElement(Plenix.CommandBar, { label: 'Unfoldable end', end: React.createElement(Plenix.Button, null, 'Keep end') })));
    }); await wait(); assert.equal(await page.$eval('.plx-command-bar__end button', item => item.textContent === 'Keep end'), true);
    assert.deepEqual(errors, []); console.log('COMMAND_BAR_FOLD_OK Posts360: three filters, toggle, required radios and opted-in end submenu');
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });

