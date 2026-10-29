const puppeteer=require(process.env.HOME+'/work/plenix-b1/node_modules/puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();
await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-production.html',{waitUntil:'networkidle2'});
console.log(await p.evaluate(async()=>{const P=Plenix,h=React.createElement,host=document.getElementById('host');const root=ReactDOM.createRoot(host);const html=(el)=>{ReactDOM.flushSync(()=>root.render(el));return host.innerHTML;};const wait=(n)=>new Promise(r=>setTimeout(r,n));
 html(h(P.Icon,{name:'rocket_launch'}));await wait(1500);const normal=/<path/.test(html(h(P.Icon,{name:'rocket_launch'})));
 P.setIconLibrary(new URL('big/',location.href).href);html(h(P.Icon,{name:'rocket_launch',size:'sm'}));await wait(1500);const big=/<path/.test(html(h(P.Icon,{name:'rocket_launch',size:'sm'})));
 return JSON.stringify({normalLibraryFetchDraws:normal,oversizedFileDraws:big});}));await b.close()})()
