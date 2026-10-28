const puppeteer=require(process.env.HOME+'/work/plenix-b1/node_modules/puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const out={};
for(const mode of ['production','development']){const p=await b.newPage();const warns=[],errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if((m.type()==='warn'||m.type()==='warning')&&/\[Plenix\]/.test(m.text()))warns.push(m.text().slice(0,140));});
await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-'+mode+'.html',{waitUntil:'networkidle2'});await new Promise(r=>setTimeout(r,800));
out[mode]=await p.evaluate(async(full)=>{const P=Plenix,h=React.createElement,host=document.getElementById('host');const root=ReactDOM.createRoot(host);const wait=(n)=>new Promise(r=>setTimeout(r,n));
 const html=(el)=>{ReactDOM.flushSync(()=>root.render(el));return host.innerHTML;};const svg=(s)=>(s.match(/<svg[\s\S]*<\/svg>/)||[''])[0];
 const idx=await (await fetch('plenix/index.json')).json();const mods={};for(const i of idx.icons)mods[i.name]=(await import('./plenix/'+i.name+'.js')).default;
 const R={};
 // QA on #517: a registered Material module never replaces a Plenix name in the default library
 const plenixHome=html(h(P.Icon,{name:'home'}));const matHome=(await import('./material/home.js')).default;const matRocket=(await import('./material/rocket-launch.js')).default;
 P.registerIcons(matHome,matRocket);
 R.plenixWins={homeKind:P.resolveIcon('home').kind,homeSymbol:P.resolveIcon('home').symbol,homeSameMarkup:html(h(P.Icon,{name:'home'}))===plenixHome,
  materialLibraryDrawsModule:P.resolveIcon('home',{library:'material'}).kind,rocketKind:P.resolveIcon('rocket_launch').kind};
 if(full){const SIZES=[undefined,'xs','sm','md','lg','xl'],FILLS=[undefined,false,true];let cases=0,d1=0,d2=0;const byName={};
  for(const n of Object.keys(mods))for(const size of SIZES)for(const filled of FILLS){const a=html(h(P.Icon,{name:n,size,filled}));byName[n+size+filled]=a;cases++;if(a!==html(h(P.Icon,{icon:mods[n],size,filled})))d1++;}
  P.registerIcons(Object.values(mods));for(const n of Object.keys(mods))for(const size of SIZES)for(const filled of FILLS){if(html(h(P.Icon,{name:n,size,filled}))!==byName[n+size+filled])d2++;}
  R.dom={cases,moduleVsStylesheet:d1,registeredVsStylesheet:d2};}
 // library="material" draws Material's own symbol even where a Plenix name exists (check -> check, not check_small)
 R.material={plenixCheck:P.resolveIcon('check').symbol,materialCheck:P.resolveIcon('check',{library:'material'}).symbol,materialKind:P.resolveIcon('check',{library:'material'}).kind};
 html(h(P.Icon,{name:'check',library:'material'}));await wait(1500);R.material.drawsMaterial=svg(html(h(P.Icon,{name:'check',library:'material'})))!==svg(html(h(P.Icon,{name:'check'})))&&/<path/.test(html(h(P.Icon,{name:'check',library:'material'})));
 // a project's own library
 const logo=Object.assign({},mods.add,{name:'acme-logo',set:'acme',symbol:'acme_logo'});P.registerIcons(logo,{library:'acme'});
 R.project={inAcme:/<path/.test(html(h(P.Icon,{name:'acme-logo',library:'acme'}))),inDefault:/<path/.test(html(h(P.Icon,{name:'acme-logo'}))),acmeHasNoPlenix:/<path/.test(html(h(P.Icon,{name:'add',library:'acme'})))};
 // a mirrored Material module in right to left
 const back=(await import('./material/arrow-back.js')).default;document.documentElement.dir='rtl';html(h(P.Icon,{icon:back}));const el=host.querySelector('.plx-icon');
 R.mirrored={flag:back.mirrored,set:back.set,classAdded:el.classList.contains('plx-icon--mirrored'),scaleRtl:getComputedStyle(el).scale,plenixModuleClass:(html(h(P.Icon,{icon:mods['arrow-back']||mods['arrow-left']||mods[Object.keys(mods).find(k=>mods[k].mirrored)]})),host.querySelector('.plx-icon').classList.contains('plx-icon--mirrored'))};document.documentElement.dir='ltr';
 // a fetched Material name (not registered): the notice, once, in development only
 html(h(P.Icon,{name:'rocket_launch'}));await wait(1200);html(h(P.Icon,{name:'rocket_launch',size:'lg'}));await wait(300);
 // a bad icon value: one warning
 html(h(P.Icon,{icon:{nope:1}}));html(h(P.Icon,{icon:{nope:1}}));const bad={x:1};html(h(P.Icon,{icon:bad}));html(h(P.Icon,{icon:bad}));
 return R;},mode==='production');
out[mode].warnings=warns;out[mode].pageErrors=errs.length;await p.close();}
console.log(JSON.stringify(out,null,1));await b.close()})()
