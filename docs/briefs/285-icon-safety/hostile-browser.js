const puppeteer=require(process.env.HOME+'/work/plenix-b1/node_modules/puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const out={};
for(const mode of ['production','development']){const p=await b.newPage();const warns=[];p.on('console',m=>{if(/\[Plenix\]/.test(m.text()))warns.push(m.text().slice(0,150));});
await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-'+mode+'.html',{waitUntil:'networkidle2'});await new Promise(r=>setTimeout(r,600));
out[mode]=await p.evaluate(async()=>{const P=Plenix,h=React.createElement,host=document.getElementById('host');const root=ReactDOM.createRoot(host);const html=(el)=>{ReactDOM.flushSync(()=>root.render(el));return host.innerHTML;};
 P.setIconLibrary(new URL('hostile/',location.href).href);html(h(P.Icon,{name:'rocket_launch'}));await new Promise(r=>setTimeout(r,1500));const fetched=html(h(P.Icon,{name:'rocket_launch'}));
 const add=(await import('./plenix/add.js')).default;const evil=JSON.parse(JSON.stringify(add));evil.name='evil-add';evil.symbol='evil_add';evil.drawings[20].outline.d='M0 0 url(javascript:alert(1))';
 P.registerIcons(evil);const viaName=html(h(P.Icon,{name:'evil-add'}));const viaProp=html(h(P.Icon,{icon:evil}));const evil2=JSON.parse(JSON.stringify(add));evil2.name='evil-two';evil2.drawings[24].fill.onload='x';const viaProp2=html(h(P.Icon,{icon:evil2}));
 return {fetchedDrawsPath:/<path/.test(fetched),scriptRan:!!window.__pwned,registeredRefusedDrawsPath:/<path/.test(viaName),propRefusedDrawsPath:/<path/.test(viaProp),extraFieldDrawsPath:/<path/.test(viaProp2)};});
out[mode].warnings=warns;await p.close();}
console.log(JSON.stringify(out,null,1));await b.close()})()
