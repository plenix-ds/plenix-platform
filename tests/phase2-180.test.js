// #180: owner props/context preserve clipping, tree item glyph state and the dev grid.
// Run after build-app.js: node tests/phase2-180.test.js
const { serve, launch } = require('./lib.js');
(async () => {
  const server = await serve(9467), browser = await launch();
  try {
    const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 1000 });
    await page.goto('http://127.0.0.1:9467/Plenix/platform/design-system/');
    await page.waitForFunction(() => window.Plenix && window.ReactDOM);
    const n = await page.evaluate(async () => {
      const { Tree, ChartFrame } = Plenix, h = React.createElement;
      const host = document.createElement('div'); document.body.appendChild(host);
      const root = ReactDOM.createRoot(host); let n = 0;
      const check = (ok, message) => { if (!ok) throw Error(message); n++; };
      const mount = async node => { ReactDOM.flushSync(() => root.render(node)); await new Promise(r => setTimeout(r, 150)); };
      await mount(h(Tree, { label: 'Glyph state', selected: 'parent', defaultExpanded: ['parent'], nodes: [{id:'parent',label:'Parent',icon:'folder',children:[{id:'child',label:'Child',icon:'folder'}]}] }));
      let icons=host.querySelectorAll('.plx-tree__icon .plx-icon');
      check(icons[0].classList.contains('plx-icon--filled'), 'open selected parent fills its own icon');
      check(icons[1].dataset.plxIconFill === 'outline', 'unselected child explicitly stays outline');
      const mask = (el, token) => getComputedStyle(el).getPropertyValue('--plx-comp-icon-url').trim() === getComputedStyle(el).getPropertyValue(token).trim();
      check(mask(icons[1], '--plx-comp-icon-outline'), 'selected ancestor does not fill child');
      document.documentElement.setAttribute('data-plx-density','comfortable');
      check(mask(icons[1], '--plx-comp-icon-outline-24'), 'comfortable child uses outline optical size 24');
      document.documentElement.removeAttribute('data-plx-density');
      await mount(h(ChartFrame,{title:'Clipped plot',clip:true},h('rect',{width:10,height:10})));
      check(getComputedStyle(host.querySelector('.plx-chart__svg')).overflowX === 'hidden','ChartFrame owns clip');
      await mount(h(ChartFrame,{title:'Open plot'},h('rect',{width:10,height:10})));
      check(getComputedStyle(host.querySelector('.plx-chart__svg')).overflowX === 'visible','default SVG overflow unchanged');
      await mount(h('div',{className:'plx-chart__plot--dimming'},h('span',{className:'plx-chart-dim plx-chart-dim--off'},'Mark')));
      const mark=host.querySelector('.plx-chart-dim--off');
      check(+getComputedStyle(mark).opacity < 1,'active plot publishes dim opacity');
      host.firstChild.className='';
      check(+getComputedStyle(mark).opacity === 1,'inactive plot leaves mark undimmed');
      root.unmount(); host.remove(); return n;
    });
    await page.addScriptTag({url:'http://127.0.0.1:9467/Plenix/platform/dev/grid-overlay.js'});
    await page.evaluate(()=>PlenixGridOverlay.show());
    const grid=await page.evaluate(()=>({ columns:Array.from(document.querySelectorAll('.plx-layout-grid__column')).filter(x=>getComputedStyle(x).display!=='none').length, height:document.querySelector('.plx-layout-grid--overlay').getBoundingClientRect().height }));
    if(grid.columns!==12 || grid.height!==1000) throw Error('overlay preserves twelve full-height columns');
    console.log('PHASE2_180_OK '+(n+1));
  } finally { await browser.close(); server.close(); }
})().catch(e=>{console.error(e);process.exit(1);});