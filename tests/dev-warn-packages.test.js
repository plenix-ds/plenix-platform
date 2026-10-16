/* Actual built package coverage: development diagnostics must never leak through production React or NODE_ENV. */
const fs = require('fs'), path = require('path'), assert = require('assert');
if (!fs.existsSync(path.join(__dirname, '../platform/design-system/inventory.js'))) { console.log('DEV_WARN_SKIP no design system'); process.exit(0); }
const { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9102, server = await serve(port); let browser, checks = 0;
  try {
    browser = await launch();
    for (const format of ['esm', 'cjs', 'global']) for (const mode of ['development', 'production', 'forced-production']) {
      const page = await browser.newPage(), warnings = [], errors = [];
      page.on('console', msg => { if (msg.type() === 'warn' && msg.text().startsWith('[Plenix]')) warnings.push(msg.text()); });
      page.on('pageerror', error => errors.push(error.message));
      await page.setRequestInterception(true);
      page.on('request', request => {
        if (request.url().includes('/dev-warn-fixture.html')) return request.respond({ status: 200, contentType: 'text/html', body: '<!doctype html><html><head><meta charset="utf-8"><title>Diagnostics fixture</title><script type="importmap">{"imports":{"react":"./dev-warn-react.js","react-dom":"./dev-warn-dom.js","react-dom/client":"./dev-warn-dom.js"}}</script></head><body><div id="root"></div></body></html>' });
        if (request.url().endsWith('/dev-warn-react.js')) return request.respond({ status: 200, contentType: 'text/javascript', body: 'export default window.React;' });
        if (request.url().endsWith('/dev-warn-dom.js')) return request.respond({ status: 200, contentType: 'text/javascript', body: 'export const createRoot=window.ReactDOM.createRoot; export const createPortal=window.ReactDOM.createPortal; export const flushSync=window.ReactDOM.flushSync; export default window.ReactDOM;' });
        return request.continue();
      });
      const base = 'http://127.0.0.1:' + port + '/Plenix/';
      await page.goto(base + 'tests/dev-warn-fixture.html?react=dev', { waitUntil: 'load' });
      const runtime = mode === 'production' ? 'production.min' : 'development';
      await page.addScriptTag({ url: base + 'platform/vendor/react.' + runtime + '.js' });
      await page.addScriptTag({ url: base + 'platform/vendor/react-dom.' + runtime + '.js' });
      // A production runtime overrides a development environment; a production environment overrides development React.
      await page.evaluate(mode => { window.process = { env: { NODE_ENV: mode === 'forced-production' ? 'production' : 'development' } }; localStorage.setItem('plenix.react', 'dev'); }, mode);
      if (format === 'global') await page.addScriptTag({ url: base + 'packages/react/dist/plenix.global.js' });
      else if (format === 'esm') await page.evaluate(async url => { window.Plenix = await import(url); }, base + 'packages/react/dist/index.js');
      else await page.evaluate(async url => { const text = await (await fetch(url)).text(), module = { exports: {} }; new Function('module', 'exports', 'require', text)(module, module.exports, name => { if (name === 'react') return React; if (name === 'react-dom' || name === 'react-dom/client') return ReactDOM; throw Error(name); }); window.Plenix = module.exports; }, base + 'packages/react/dist/index.cjs');
      await page.evaluate(() => {
        const h = React.createElement, P = window.Plenix, root = ReactDOM.createRoot(document.getElementById('root'));
        window.fixtureRoot = root;
        const view = invalid => h('div', null,
          h(P.Button, { variant: invalid ? 'unknown-fixture' : 'quiet', size: invalid ? 'massive-fixture' : '2xs' }, 'Save'),
          h(P.Tabs, { variant: invalid ? 'underline' : 'folder', label: 'Views', items: [{ value: 'one', label: 'One', content: 'Content' }] }),
          h(P.DeleteFlow, { variant: 'undo', items: [] }),
          h(P.DeleteFlow, { variant: 'trash', items: [] }),
          h(P.Details, { variant: 'inline', summary: 'Details' }, 'Content'),
          h(P.Link, { variant: 'subtle', href: '#root' }, 'Link'),
          h(P.EmptyState, { tone: 'warning', title: 'Warning' }),
          h(P.EmptyState, { tone: 'success', title: 'Success' }),
          h(P.List, { variant: 'bullets', items: [{ children: 'A valid bullet' }] }),
          h(P.Badge, { tone: 'info', variant: 'solid', size: 'sm' }, 'Saved'),
          h(P.Pictogram, { name: 'sparkle', size: 48 }),
          h(P.StatusDot, { tone: 'busy', label: 'Busy' }));
        window.fixtureView = view;
        ReactDOM.flushSync(() => root.render(view(false)));
      });
      assert.deepStrictEqual(warnings, [], format + '/' + mode + ' valid aliases do not warn'); checks++;
      await page.evaluate(() => ReactDOM.flushSync(() => fixtureRoot.render(fixtureView(true))));
      await page.evaluate(() => ReactDOM.flushSync(() => fixtureRoot.render(fixtureView(true))));
      assert.deepStrictEqual(errors, [], format + '/' + mode + ' renders without errors'); checks++;
      if (mode === 'development') {
        assert.strictEqual(warnings.length, 3, format + ' emits once for each invalid prop');
        assert.ok(warnings.some(s => s.includes('Tabs: unknown variant "underline"') && s.includes('contained, folder, segmented')));
        assert.ok(warnings.some(s => s.includes('Button: unknown size "massive-fixture"') && s.includes('2xs'))); checks += 3;
      } else { assert.deepStrictEqual(warnings, [], format + '/' + mode + ' stays silent despite explicit dev flags'); checks++; }
      await page.close();
    }
    console.log('DEV_WARN_PACKAGES_OK ' + checks + ' checks (ESM, CJS, global; real dev/prod React and forced production)');
  } finally { if (browser) await browser.close(); server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
