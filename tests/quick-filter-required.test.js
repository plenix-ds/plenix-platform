// Required single choices: browser behavior, persisted fallback, reset, counts and the radio helper for More.
const assert = require('node:assert/strict'), path = require('path'), { serve, launch } = require('./lib');
(async () => {
  const compiled = await require('esbuild').build({ entryPoints: [path.resolve(__dirname, '../platform/patterns/QuickFilter/single-menu.jsx')], bundle: true, write: false, format: 'iife', globalName: 'RequiredMenu', plugins: [{ name: 'page-react', setup(build) { build.onResolve({ filter: /^react(?:-dom)?$/ }, a => ({ path: a.path, namespace: 'peer' })); build.onLoad({ filter: /.*/, namespace: 'peer' }, a => ({ contents: 'module.exports=window.' + (a.path === 'react' ? 'React' : 'ReactDOM') + ';' })); } }] });
  const port = +process.env.TEST_PORT || 9266, server = await serve(port); let browser;
  try {
    browser = await launch(); const page = await browser.newPage(), errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on('request', request => request.url().endsWith('/.required.html') ? request.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><html data-plx-theme="default" data-plx-density="compact"><head><link rel="stylesheet" href="/Plenix/platform/platform.css"><script src="/Plenix/platform/vendor/react-loader.js"></script></head><body><main></main></body></html>' }) : request.continue());
    await page.goto('http://127.0.0.1:' + port + '/Plenix/tests/.required.html', { waitUntil: 'networkidle0' });
    await page.addScriptTag({ url: 'http://127.0.0.1:' + port + '/Plenix/platform/dist/platform.js' });
    await page.addScriptTag({ content: compiled.outputFiles[0].text });
    await page.evaluate(() => {
      const h = React.createElement, P = Plenix, fields = [{ value: 'status', label: 'Status', kind: 'select', options: ['Draft', 'Published'] }], rows = [{ status: 'Draft' }, { status: 'Published' }];
      window.mountRequired = (required = true, inline = true) => {
        if (window.testRoot) ReactDOM.flushSync(() => window.testRoot.unmount());
        window.testRoot = ReactDOM.createRoot(document.querySelector('main'));
        function Demo() {
          const view = P.useCollectionView(fields, { quick: { status: { kind: 'single', required } }, data: rows, storageKey: 'required-test' }); window.testView = view;
          const props = { label: 'Status', options: fields[0].options, ...view.quickProps('status') };
          return h(P.Stack, null, h(P.QuickFilter, { ...props, inline }), h(P.Menu, { trigger: h(P.Button, null, 'More') }, h(RequiredMenu.SingleQuickFilterMenu, props)));
        }
        ReactDOM.flushSync(() => window.testRoot.render(h(Demo)));
      };
      localStorage.removeItem('required-test.collection'); mountRequired();
    });
    const wait = () => new Promise(resolve => setTimeout(resolve, 100)); await wait();
    const state = () => page.evaluate(() => ({ value: testView.quick.status, count: testView.count([{ status: 'Draft' }, { status: 'Published' }]), radios: [...document.querySelectorAll('input[type=radio]')].map(r => ({ value: r.value, checked: r.checked })), clear: [...document.querySelectorAll('button')].some(b => b.textContent.trim() === 'Clear') }));
    let got = await state(); assert.deepEqual(got.value, ['Draft']); assert.equal(got.count, 1); assert.equal(got.radios.length, 2); assert.equal(got.radios[0].checked, true); assert.equal(got.clear, false);
    await page.evaluate(() => document.querySelectorAll('input[type=radio]')[1].click()); await wait(); assert.deepEqual((await state()).value, ['Published']);
    await page.evaluate(() => { testView.setQuick('status', []); }); await wait(); assert.deepEqual((await state()).value, ['Draft']);
    await page.evaluate(() => { testView.setQuick('status', ['Published']); }); await wait(); await page.evaluate(() => testView.reset()); await wait(); assert.deepEqual((await state()).value, ['Draft']);
    await page.evaluate(() => { const saved = { search: '', filter: { join: 'and', items: [] }, quick: {}, sort: [], group: [], columns: { order: ['status'], hidden: [] }, view: { layout: 'list', size: 'm', height: 'short' } }; localStorage.setItem('required-test.collection', JSON.stringify(saved)); mountRequired(); }); await wait(); assert.deepEqual((await state()).value, ['Draft']);
    await page.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === 'More').click()); await wait();
    const menu = await page.evaluate(() => [...document.querySelectorAll('[role=menuitemradio]')].map(item => ({ text: item.textContent, checked: item.getAttribute('aria-checked') })));
    assert.equal(menu.length, 2); assert.equal(menu[0].checked, 'true'); assert.ok(menu.every(item => !item.text.includes('All'))); assert.ok(menu[0].text.includes('1'));
    await page.evaluate(() => document.querySelectorAll('[role=menuitemradio]')[1].click()); await wait(); assert.deepEqual((await state()).value, ['Published']);
    await page.evaluate(() => { localStorage.removeItem('required-test.collection'); mountRequired(false); }); await wait(); got = await state(); assert.deepEqual(got.value, []); assert.equal(got.radios.length, 3); assert.equal(got.clear, false); assert.equal(got.count, 2);
    await page.evaluate(() => mountRequired(false, false)); await wait();
    await page.evaluate(() => [...document.querySelectorAll('button')].find(button => button.textContent.includes('Status')).click()); await wait(); assert.equal((await state()).clear, true);
    await page.evaluate(() => mountRequired(true, false)); await wait();
    await page.evaluate(() => [...document.querySelectorAll('button')].find(button => button.textContent.includes('Status')).click()); await wait(); got = await state(); assert.equal(got.clear, false); assert.equal(got.radios.length, 2);
    assert.deepEqual(errors, []); console.log('QUICK_FILTER_REQUIRED_OK default, selection, no-clear, reset, saved fallback, counted radio menu, optional All');
  } finally { if (browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
