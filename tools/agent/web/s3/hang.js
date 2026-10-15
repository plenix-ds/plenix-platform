const { serve, launch, sleep } = require('D:/Documents/Projects/Projects_Applications/Plenix/tests/lib.js');
(async () => { const server = await serve(8975); const b = await launch(); const p = await b.newPage(); await p.setViewport({ width: 1440, height: 1000 });
  const t = Date.now(); await p.goto('http://127.0.0.1:8975/Plenix/platform/design-system/#/data-display/badge/v/solid-badge', { waitUntil: 'networkidle0' }); await sleep(1500);
  console.log('loaded', Date.now() - t, await p.evaluate(() => document.title)); await b.close(); server.close(); })().catch((e) => { console.error(e.message); process.exit(1); });
