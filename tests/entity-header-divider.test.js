// EntityHeader's divider (#297, owner 2026-10-24, option B): it starts at 63% of the header, moves toward the end when the
// title needs the room, and the aside keeps at least 220px; past that the title wraps. Three cases: a short title, a long
// title, a narrow header.
const fs = require('fs');
if (!fs.existsSync('platform/design-system/inventory.js')) { console.log('ENTITY_HEADER_DIVIDER_SKIP no design system'); process.exit(0); }
const { serve, launch } = require('./lib');
(async () => {
  const port = +process.env.TEST_PORT || 9187, server = await serve(port);
  let browser;
  try {
    browser = await launch();
    const page = await browser.newPage(), errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto('http://127.0.0.1:' + port + '/Plenix/platform/design-system/', { waitUntil: 'networkidle0' });
    const count = await page.evaluate(async () => {
      const P = window.Plenix, R = window.React, D = window.ReactDOM, h = R.createElement, host = document.createElement('div');
      document.body.appendChild(host);
      let n = 0;
      const ok = (a, m) => { if (!a) throw Error(m); n++; };
      const wait = () => new Promise((r) => setTimeout(r, 120));
      const measure = async (title, width) => {
        host.className = 'ds-sample--inline-size ' + DS.varClass(document, '--ds-sample-inline-size', width + 'px');
        const root = D.createRoot(host);
        D.flushSync(() => root.render(h(P.EntityHeader, { headingLevel: 2, title, subtitle: 'Marketing', media: { icon: 'folder', hue: 'blue' }, facts: [{ label: 'Due', value: 'Nov 14' }],
          next: { title: 'Approve homepage copy', detail: 'Due tomorrow' }, actions: [{ icon: 'share', label: 'Share' }, { icon: 'edit', label: 'Edit', primary: true }] })));
        await wait();
        const layout = host.querySelector('.plx-entity-header__layout').getBoundingClientRect();
        const aside = host.querySelector('.plx-entity-header__aside').getBoundingClientRect();
        const t = host.querySelector('.plx-entity-header__title');
        const lines = Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight));
        const r = { at: (aside.left - layout.left) / layout.width, aside: aside.width, lines };
        D.flushSync(() => root.unmount());
        return r;
      };
      const short = await measure('Website relaunch', 1200);
      ok(Math.abs(short.at - 0.63) < 0.03, 'Short title: the divider stays at its default (63%), at ' + short.at.toFixed(3));
      const long = await measure('Website relaunch for the parish council and the diocesan youth programs, 2026', 1200);
      ok(long.at > short.at + 0.03 && long.aside >= 220 && long.lines === 1, 'Long title: the divider moves right, the aside keeps 220px, the title stays on one line (' + long.at.toFixed(3) + ', ' + Math.round(long.aside) + 'px, ' + long.lines + ' lines)');
      const narrow = await measure('Website relaunch for the parish council and the diocesan youth programs, 2026', 760);
      ok(narrow.aside >= 219.5 && narrow.lines > 1, 'Narrow header: the aside keeps 220px and the title wraps (' + Math.round(narrow.aside) + 'px, ' + narrow.lines + ' lines)');
      host.remove();
      return n;
    });
    if (errors.length) throw Error(errors.join(';'));
    console.log('ENTITY_HEADER_DIVIDER_OK ' + count + ' checks');
  } finally {
    if (browser) await browser.close();
    server.closeAllConnections(); await new Promise((r) => server.close(r));
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
