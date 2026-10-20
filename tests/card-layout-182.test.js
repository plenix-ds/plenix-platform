// Card composition contract: layout props arrange Card-owned parts without changing its default or collapse behavior.
const assert=require('assert/strict');
const {serve,launch}=require('./lib.js');
(async()=>{
 const server=await serve(9641);let browser;
 try{
  browser=await launch();const page=await browser.newPage();
  await page.goto('http://127.0.0.1:9641/Plenix/platform/design-system/',{waitUntil:'load'});
  await page.waitForFunction(()=>window.Plenix&&window.ReactDOM);
  const result=await page.evaluate(async()=>{
   const h=React.createElement,P=Plenix,host=document.createElement('div');document.body.appendChild(host);
   const root=ReactDOM.createRoot(host),out=[];
   const mount=async(el)=>{ReactDOM.flushSync(()=>root.render(el));await new Promise(r=>setTimeout(r,50));};
   const read=sel=>getComputedStyle(host.querySelector(sel));
   await mount(h(P.Card,{title:'Default',meta:'Details'},'Body'));
   out.push(read('.plx-card').display==='flex'&&read('.plx-card__title').whiteSpace==='nowrap');
   await mount(h(P.FeatureCard,{title:'Feature',description:'Details',variant:'icon'}));
   out.push(read('.plx-card__body').display==='flex'&&read('.plx-card__body').order==='-1'&&read('.plx-card__title').whiteSpace==='normal');
   await mount(h(P.FeatureCard,{title:'Feature',description:'Details',variant:'horizontal'}));
   out.push(read('.plx-card').display==='grid'&&read('.plx-card__body').gridArea==='media'&&read('.plx-card__header').gridArea==='header'&&read('.plx-card__meta').gridArea==='meta');
   await mount(h(P.UserCard,{name:'Avery',secondary:'Designer'}));
   out.push(read('.plx-card__body').display==='flex'&&read('.plx-card__body').flexDirection==='column'&&read('.plx-card__body').minWidth==='0px');
   await mount(h(P.Card,{title:'Expandable',expandable:true,bodyLayout:'stack'},'Body'));
   const toggle=host.querySelector('.plx-card__toggle');out.push(toggle.getAttribute('aria-expanded')==='false'&&host.querySelector('.plx-card__body').hidden);
   toggle.click();await new Promise(r=>setTimeout(r,50));out.push(toggle.getAttribute('aria-expanded')==='true'&&!host.querySelector('.plx-card__body').hidden);
   root.unmount();host.remove();return out;
  });
  assert.equal(result.length,6);result.forEach((ok,i)=>assert.ok(ok,'Card contract '+(i+1)));console.log('CARD_LAYOUT_OK (6 checks)');
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1);});
