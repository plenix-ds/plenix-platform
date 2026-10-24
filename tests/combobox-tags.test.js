// Combobox as a tag picker (multiple, no marks; #261, RedSave P-57): the list offers only tags not chosen yet, so Enter
// on a suggestion adds and never removes; a tag leaves only by its remove button. Checkbox select keeps its toggle.
const fs = require('fs');
if (!fs.existsSync('platform/design-system/inventory.js')) { console.log('COMBOBOX_TAGS_SKIP no design system'); process.exit(0); }
const { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9186, server = await serve(port);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage(), errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('http://127.0.0.1:' + port + '/Plenix/platform/design-system/', { waitUntil: 'networkidle0' });
    const count = await page.evaluate(async () => {
      const P = window.Plenix, R = window.React, D = window.ReactDOM, h = R.createElement, host = document.createElement('div');
      document.body.appendChild(host);
      let root = D.createRoot(host), n = 0;
      const wait = () => new Promise((r) => setTimeout(r, 80));
      const ok = (a, m) => { if (!a) throw Error(m); n++; };
      const mount = async (el) => { D.flushSync(() => root.render(el)); await wait(); };
      const reset = async () => { D.flushSync(() => root.unmount()); root = D.createRoot(host); await wait(); };
      const key = async (el, k) => { el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true })); await wait(); };
      const type = async (el, text) => { Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, text); el.dispatchEvent(new Event('input', { bubbles: true })); await wait(); };
      const tags = () => [...host.querySelectorAll('.plx-tag')].map((t) => { const b = t.querySelector('button'); return b ? (b.getAttribute('aria-label') || '').replace(/^Remove /, '') : t.textContent.trim(); });
      // a tag picker that creates tags, starting with "typed1"
      function Tags(props) {
        const opts = R.useState([{ value: 'typed1', label: 'typed1' }, { value: 'eg', label: 'eg' }]), vals = R.useState(['typed1']);
        return h(P.Combobox, { label: 'Tags', multiple: true, creatable: true, marks: props.marks, options: opts[0], values: vals[0], onChange: vals[1],
          onCreate: (label) => { opts[1](opts[0].concat([{ value: label, label }])); vals[1](vals[0].concat([label])); } });
      }
      await mount(h(Tags));
      const input = host.querySelector('input');
      input.focus(); await wait();
      ok(![...host.querySelectorAll('.plx-combobox__option')].some((o) => o.textContent === 'typed1'), 'A chosen tag is not offered again');
      await type(input, 'typ');
      ok(!!host.querySelector('.plx-combobox__create'), 'Part of a chosen tag offers Create');
      await key(input, 'Enter');
      ok(tags().indexOf('typed1') >= 0 && tags().indexOf('typ') >= 0 && tags().length === 2, 'typ + Enter adds "typ" and keeps "typed1": ' + tags().join(','));
      await type(input, 'eg');
      await key(input, 'Enter');
      ok(tags().join(',') === 'typed1,typ,eg', 'An existing tag + Enter adds it: ' + tags().join(','));
      await type(input, 'typed1');
      await key(input, 'Enter');
      ok(tags().join(',') === 'typed1,typ,eg', 'A chosen tag typed in full + Enter changes nothing: ' + tags().join(','));
      const remove = host.querySelector('.plx-tag button');
      remove.click(); await wait();
      ok(tags().join(',') === 'typ,eg', 'The remove button removes the tag: ' + tags().join(','));
      await reset();
      // checkbox select: every option stays listed, choosing toggles
      await mount(h(Tags, { marks: 'checkbox' }));
      const box = host.querySelector('input.plx-combobox__input');
      box.focus(); await wait();
      const first = [...host.querySelectorAll('.plx-combobox__option')].find((o) => o.textContent === 'typed1');
      ok(!!first && first.getAttribute('aria-selected') === 'true', 'Checkbox select lists the chosen option, checked');
      first.click(); await wait();
      ok(tags().length === 0, 'Checkbox select: choosing a checked option unchecks it');
      await reset();
      return n;
    });
    if (errors.length) throw Error(errors.join(';'));
    console.log('COMBOBOX_TAGS_OK ' + count + ' checks');
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections(); await new Promise((r) => server.close(r));
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
