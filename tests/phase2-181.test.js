// #181: the composed owners keep zoom, fill, unavailable state and selection in their own APIs.
// Run after build-app.js: node tests/phase2-181.test.js
const {serve,launch}=require('./lib.js');
(async()=>{const s=await serve(9577),b=await launch();try{const p=await b.newPage();await p.goto('http://127.0.0.1:9577/Plenix/platform/design-system/');await p.waitForFunction(()=>window.Plenix&&window.ReactDOM);console.log(await p.evaluate(async()=>{
 const h=React.createElement,P=Plenix,host=document.createElement('div');document.body.appendChild(host);const root=ReactDOM.createRoot(host);let n=0;
 const check=(v,m)=>{if(!v)throw Error(m);n++;},mount=async node=>{ReactDOM.flushSync(()=>root.render(node));await new Promise(r=>setTimeout(r,150));};
 await mount(h(P.DocumentViewer,{kind:'images',label:'Zoom probe',initialZoom:150,pages:[{src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',alt:'Page'}]}));
 check(getComputedStyle(host.querySelector('.plx-image')).zoom==='1.5','Image owns the inherited 150% zoom');
 check(host.querySelector('select').classList.contains('plx-input--data'),'zoom Select uses the technical-value variant');
 await mount(h(P.MediaPlayer,{label:'Stage probe',fill:true,pictureInPicture:false}));
 check(host.firstChild.hasAttribute('data-plx-fill'),'player opts into stage fill');
 check(getComputedStyle(host.querySelector('.plx-media-player__media')).flexGrow==='1','media flexes above controls');
 await mount(h(P.MediaPlayer,{label:'Default probe',pictureInPicture:false}));
 check(!host.firstChild.hasAttribute('data-plx-fill'),'default player does not fill a stage');
 await mount(h(P.ColorSwatch,{color:'blue',label:'Blue',showLabel:true,pressed:true,onClick:()=>{},unavailable:true}));
 check(getComputedStyle(host.querySelector('.plx-color-swatch')).boxShadow!=='none','labeled chip owns selected shadow');
 check(getComputedStyle(host.querySelector('button')).cursor==='not-allowed','labeled unavailable swatch owns cursor');
 await mount(h(P.ColorSwatch,{color:'blue',label:'Blue',onClick:()=>{},unavailable:true}));
 check(getComputedStyle(host.querySelector('button')).cursor==='not-allowed','unlabeled unavailable swatch owns cursor');
 let picked=0;await mount(h(P.ProductOptions,{options:[{name:'color',label:'Color',kind:'swatches',values:[{value:'blue',color:'blue',label:'Blue',available:false}]}],onChange:()=>picked++}));host.querySelector('button').click();
 check(picked===0&&host.querySelector('button').getAttribute('aria-disabled')==='true','unavailable option remains named and cannot change the choice');
 root.unmount();host.remove();return 'PHASE2_181_OK '+n;
}));}finally{await b.close();s.close();}})().catch(e=>{console.error(e);process.exit(1)});