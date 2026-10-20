// Lane 199: additive selection, explicit compact swap, command policies and folded command availability.
const assert = require('node:assert/strict');
const { serve, launch } = require('./lib');
(async () => {
  const server = await serve(+process.env.TEST_PORT || 9771); let browser;
  try {
    browser = await launch(); const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://127.0.0.1:' + (+process.env.TEST_PORT || 9771) + '/Plenix/dashboard/index.html', { waitUntil: 'networkidle0' });
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    const result = await page.evaluate(async () => {
      const h = React.createElement, P = Plenix, host = document.createElement('main'); document.body.replaceChildren(host);
      const root = ReactDOM.createRoot(host), checks = [];
      const wait = () => new Promise(resolve => setTimeout(resolve, 200));
      const mount = async (count, mode) => {
        ReactDOM.flushSync(() => root.render(h(P.CommandBar, { label: 'Records',
          actions: [{ id: 'new', label: 'New', icon: 'plus' }, { label: 'Selected page', selection: 'only', icon: 'edit' }, { label: 'Unselected page', selection: 'never', icon: 'plus' }],
          find: h(P.CommandBarSearch, { placeholder: 'Search records' }),
          selection: { count, mode, actions: [{ id: 'new', label: 'Download', icon: 'download-arrow' }, { label: 'Delete', icon: 'trash', danger: true }], onClear() {} }
        })));
        await wait();
        return [...host.querySelectorAll('.plx-command-bar__actions button')].map(b => b.getAttribute('aria-label') || b.textContent.trim());
      };
      let names = await mount(2);
      checks.push(names.indexOf('Download') < names.indexOf('New') && names.indexOf('Delete') < names.indexOf('New'));
      checks.push(names.includes('Selected page') && !names.includes('Unselected page'));
      checks.push(!!host.querySelector('input[placeholder="Search records"]'));
      checks.push(!!host.querySelector('.plx-bar-actions__divider'));
      names = await mount(2, 'swap');
      checks.push(names.includes('Download') && !names.includes('New') && !host.querySelector('input[placeholder="Search records"]'));
      names = await mount(0);
      checks.push(names.includes('New') && names.includes('Unselected page') && !names.includes('Selected page') && !names.includes('Download'));
      return checks;
    });
    assert.deepEqual(result, [true, true, true, true, true, true]);
    console.log('COMMAND_SELECTION_OK ' + result.length);
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
