// The fitting hook must retain every command and avoid reading layout on unrelated parent commits.
const assert = require('node:assert/strict'), { serve, launch } = require('./lib');
(async () => {
 const port = +process.env.TEST_PORT || 9773, server = await serve(port); let browser;
 try {
  browser = await launch(); const page = await browser.newPage();
  await page.goto('http://127.0.0.1:' + port + '/Plenix/dashboard/index.html', { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => window.Plenix && window.ReactDOM);
  const esbuild = require('esbuild'), path = require('path'), fs = require('fs');
  const old = await esbuild.build({ stdin: { contents: "export {CommandBar,CommandBarSearch,CommandBarButton} from './platform/patterns/CommandBar/CommandBar.jsx';export {BulkActions} from './platform/patterns/BulkActions/BulkActions.jsx';", resolveDir: path.resolve(__dirname, '..'), loader: 'jsx' }, bundle: true, write: false, format: 'iife', globalName: 'OldFit', plugins: [{name:'old-fit',setup(build){build.onLoad({filter:/[\\/]utils[\\/]overflow\.js$/},()=>({contents:fs.readFileSync(path.resolve(__dirname,'../platform/utils/overflow.js'),'utf8').split('/* Command-bar fitting:')[0] + fs.readFileSync(path.resolve(__dirname,'../platform/utils/barFit.js'),'utf8').replace("import React from 'react';",''),loader:'js'}));build.onResolve({filter:/^react$/},()=>({path:'react',namespace:'global-react'}));build.onLoad({filter:/.*/,namespace:'global-react'},()=>({contents:'module.exports=window.React;'}));}}] });
  await page.addScriptTag({content:old.outputFiles[0].text});
  const snapshots = [];
  for (const useOld of [true, false]) for (const width of [1440, 1024, 600, 360]) {
   await page.evaluate(value => { window.fitUseOld = value; }, useOld);
   await page.setViewport({ width, height: 900 });
   await page.evaluate(() => {
    const h = React.createElement, P = window.fitUseOld ? {...Plenix, ...OldFit} : Plenix;
    if (window.fitRoot) ReactDOM.flushSync(() => fitRoot.unmount());
    const host = document.createElement('main'); document.body.replaceChildren(host); window.fitRoot = ReactDOM.createRoot(host);
    function Fixture() {
     const [tick, setTick] = React.useState(0); window.fitTick = setTick;
     const actions = Array.from({ length: 12 }, (_, i) => ({ id: String(i), label: 'Command ' + i, icon: 'plus', danger: i === 11 }));
     return h(React.Fragment, null, h('output', null, tick), h(P.CommandBar, { label: 'Fit fixture', actions, find: h(P.CommandBarSearch, { placeholder: 'Find records' }), view: h(P.CommandBarButton, { label: 'Filter', icon: 'filter', count: 12 }) }),
      h(P.BulkActions, { label: 'Bulk fixture', count: 2, actions }));
    }
    ReactDOM.flushSync(() => fitRoot.render(h(Fixture)));
   });
   await new Promise(resolve => setTimeout(resolve, 500));
   const result = await page.evaluate(async () => {
    const rows = [...document.querySelectorAll('[data-plx-bar-row]')];
    const overflow = rows.map(row => { const box = row.getBoundingClientRect(); return [...row.querySelectorAll('button')].filter(b => b.offsetParent && !b.closest('[role="tooltip"],[role="menu"]')).map(b => ({ name: b.getAttribute('aria-label') || b.textContent.trim(), right: b.getBoundingClientRect().right, left: b.getBoundingClientRect().left })).filter(b => b.right > box.right + 1 || b.left < box.left - 1); });
    const original = Element.prototype.getBoundingClientRect; let reads = 0;
    Element.prototype.getBoundingClientRect = function() { if (this.closest('.plx-command-bar,.plx-bulk-actions')) reads++; return original.apply(this, arguments); };
    for (let i = 0; i < 20; i++) ReactDOM.flushSync(() => fitTick(i + 1));
    Element.prototype.getBoundingClientRect = original;
    const menus = [];
    for (const row of rows) {
      const visible = [...row.querySelectorAll('button')].filter(b => b.offsetParent && !b.closest('[role="tooltip"],[role="menu"]')).map(b => b.getAttribute('aria-label') || b.textContent.trim());
      const more = row.querySelector('button[aria-label="More actions"]');
      if (more) { more.click(); await new Promise(resolve => setTimeout(resolve, 100)); }
      const folded = [...document.querySelectorAll('[role="menuitem"]')].map(b => b.textContent.trim());
      menus.push([...new Set(visible.concat(folded).filter(name => /^Command \d+$/.test(name)))].sort());
      if (more) { more.click(); await new Promise(resolve => setTimeout(resolve, 100)); }
    }
    return { overflow, reads, menus, names: rows.map(row => [...row.querySelectorAll('button')].filter(b => b.offsetParent && !b.closest('[role="tooltip"],[role="menu"]')).map(b => b.getAttribute('aria-label') || b.textContent.trim())) };
   });
   assert.deepEqual(result.overflow, [[], []], width + ' all controls fit');
   for (const menu of result.menus) assert.equal(menu.length, 12, width + ' every command remains available');
   if (!useOld) assert.equal(result.reads, 0, width + ' unrelated renders do not measure');
   snapshots.push({ useOld, width, ...result });
  }
  for (let i=0;i<4;i++) assert.deepEqual(snapshots[i+4].names, snapshots[i].names, 'same fitting controls ' + snapshots[i].width);
  console.log('COMMAND_FIT_OK ' + JSON.stringify(snapshots));
 } finally { if(browser) await browser.close(); await new Promise(resolve => server.close(resolve)); }
})().catch(error => { console.error(error); process.exitCode = 1; });
