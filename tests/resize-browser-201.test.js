const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path');
const { serve, launch } = require('./lib');
const root = path.resolve(__dirname, '..'), bundle = path.join(__dirname, 'fixtures/resize-201.generated.js'), fixture = path.join(__dirname, 'fixtures/resize-201.generated.html');
(async () => {
  require('esbuild').buildSync({ stdin: { contents: `import React from 'react'; import {createRoot} from 'react-dom/client'; import {Resizable} from './platform/components/Resizable/Resizable.jsx'; import {AppShell,useAppLayout} from './platform/patterns/AppShell/AppShell.jsx'; import {SplitView} from './platform/patterns/SplitView/SplitView.jsx'; window.changes201=[]; const root=createRoot(document.getElementById('fixture')); function Demo(p){ const [width,setWidth]=React.useState(p.defaultWidth||560); return <Resizable {...p} width={p.controlled?width:undefined} label="Preview" onResize={s=>{changes201.push(s.width);if(p.controlled)setWidth(s.width)}}><p>Resizable content</p></Resizable>; } function Probe(){const shell=useAppLayout();return <output id="claim201">{shell.page}</output>} function SplitDemo(){const [visible,toggle]=React.useState(true);window.toggleSplit201=()=>toggle(false);return <AppShell page="workspace"><Probe/>{visible?<SplitView label="Inbox" maxSize={1400} first={<p>List</p>} second={<p>Details</p>}/>:null}</AppShell>} window.showSplit201=()=>root.render(<SplitDemo/>); window.show201=p=>root.render(<Demo key={JSON.stringify(p)} {...p}/>); window.clear201=()=>root.render(null);`, resolveDir: root, loader: 'jsx' }, bundle: true, outfile: bundle, format: 'iife', define: { 'process.env.NODE_ENV': '"production"' } });
  fs.writeFileSync(fixture, '<!doctype html><html lang="en"><head><meta charset="utf-8"><link rel="stylesheet" href="/Plenix/platform/platform.css"></head><body><main id="fixture"></main><script src="/Plenix/tests/fixtures/resize-201.generated.js"></script></body></html>');
  const server = await serve(9789); let browser;
  try {
    browser=await launch(); const page=await browser.newPage(), errors=[]; page.on('pageerror',e=>{errors.push(e.message);console.error('PAGE_ERROR',e.message)}); await page.setViewport({width:1800,height:900});
    await page.goto('http://127.0.0.1:9789/Plenix/tests/fixtures/resize-201.generated.html');
    const mount=async options=>{await page.evaluate(p=>show201(p),options);await page.waitForSelector('.plx-resizable__edge--inline');};
    const width=()=>page.$eval('.plx-resizable',el=>el.getBoundingClientRect().width);
    const drag=async delta=>{const edge=await page.$('.plx-resizable__edge--inline'),b=await edge.boundingBox(); await page.mouse.move(b.x+b.width/2,b.y+b.height/2);await page.mouse.down();await page.mouse.move(b.x+b.width/2+delta,b.y+b.height/2);};
    for(const controlled of [false,true]) {
      await mount({controlled,defaultWidth:560,minWidth:360,maxWidth:1400}); await drag(7.5);
      assert.ok(Math.abs(await width()-567.5)<0.1,'pointer follows fractional CSS pixels'); await page.mouse.up();
      await page.waitForFunction(()=>document.querySelector('.plx-resizable').getAttribute('data-plx-width')==='568px'); assert.equal(await width(),568);
      await page.focus('.plx-resizable__edge--inline');await page.keyboard.press('End');await page.waitForFunction(()=>document.querySelector('.plx-resizable').getAttribute('data-plx-width')==='1400px');assert.equal(await width(),1400);
      assert.equal(await page.$eval('[role=separator]',el=>el.getAttribute('aria-valuemax')),'1400');
      assert.match(await page.$eval('[role=status]',el=>el.textContent),/Largest width/);
      assert.equal(await page.$eval('[role=tooltip]',el=>el.matches(':popover-open')),true,'limit tooltip is visible in the top layer');
      await page.evaluate(require('./clash-audit').audit,false,0,null,{strict:true,mark:true});
      assert.equal(await page.$eval('[role=tooltip]',el=>el.getAttribute('data-audit-overlap')),'','new limit surface has zero runtime overlap');
      assert.equal(await page.$eval('.plx-resizable',el=>el.hasAttribute('style')),false);
      await page.keyboard.press('Escape');assert.equal(await page.$('[role=tooltip]'),null,'Escape dismisses limit tooltip');
    }
    await mount({defaultWidth:560,minWidth:360,maxWidth:1400,steps:[400,560,720]});await drag(39);assert.equal(await width(),599);await page.mouse.up();await page.waitForFunction(()=>document.querySelector('.plx-resizable').getAttribute('data-plx-width')==='560px');
    await drag(9);await page.evaluate(()=>clear201());await page.waitForFunction(()=>!document.querySelector('.plx-resizable'));await page.mouse.move(900,200);await page.mouse.up();
    assert.equal(await page.evaluate(()=>document.querySelectorAll('[data-plx-resize-rules]').length),0,'scoped rules cleaned on unmount');
    assert.equal(await page.evaluate(()=>document.documentElement.classList.contains('is-resizing-columns')),false,'drag listeners/cursor cleaned');
    await page.evaluate(()=>{window.motion201=0;const original=Element.prototype.animate;Element.prototype.animate=function(...args){motion201++;return original.apply(this,args);};});
    for(const reduced of [false,true]) {
      await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:reduced?'reduce':'no-preference'}]);
      await mount({defaultWidth:560,minWidth:360,maxWidth:1400,motionCase:reduced});
      await page.evaluate(()=>{motion201=0;});await drag(7.5);await page.mouse.up();
      const settle=await page.evaluate(()=>motion201);assert.equal(settle>0,!reduced,'settle animation respects reduced motion');
      await page.focus('.plx-resizable__edge--inline');await page.keyboard.press('End');
      const limit=await page.evaluate(()=>motion201);assert.equal(limit>settle,!reduced,'limit bump respects reduced motion');
      await page.keyboard.press('ArrowRight');assert.equal(await page.evaluate(()=>motion201),limit,'one bump per limit encounter');
    }
    await page.evaluate(()=>showSplit201());await page.waitForFunction(()=>document.querySelector('#claim201')?.textContent==='master-detail');await page.setViewport({width:1100,height:900});
    await page.waitForFunction(()=>Number(document.querySelector('.plx-split-view [role=separator]')?.getAttribute('aria-valuemax'))<1400);
    await page.focus('.plx-split-view [role=separator]');await page.keyboard.press('End');
    assert.match(await page.$eval('.plx-split-view [role=separator]',el=>el.title),/other pane needs at least 320px/);
    assert.ok(await page.$eval('.plx-split-view__second',el=>el.getBoundingClientRect().width)>=320,'other pane minimum remains available');
    await page.evaluate(()=>toggleSplit201());await page.waitForFunction(()=>document.querySelector('#claim201')?.textContent==='workspace');
    assert.deepEqual(errors,[]);console.log('RESIZE_BROWSER_201_OK controlled/uncontrolled exact pointer, release snap, 1400px, limits, caller steps and unmount cleanup');
  } finally { if(browser)await browser.close();await new Promise(r=>server.close(r)); }
})().catch(e=>{console.error(e);process.exitCode=1;}).finally(()=>{for(const file of [bundle,fixture])if(fs.existsSync(file))fs.unlinkSync(file);});
