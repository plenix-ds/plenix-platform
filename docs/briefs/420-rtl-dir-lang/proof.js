const puppeteer=require(process.env.HOME+'/work/plenix-b1/node_modules/puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox','--allow-file-access-from-files']});
for(const side of ['before','after']){const p=await b.newPage();await p.setViewport({width:700,height:700});await p.goto('file://'+__dirname+'/'+side+'.html');await new Promise(r=>setTimeout(r,500));
console.log('== '+side);console.log(await p.evaluate(()=>{const row=(input)=>input.closest('label');const out=[];
 for(const k of ['en-check','ar-check','solo-check','solo-switch','solo-radio']){const input=document.querySelector('[data-k="'+k+'"]');const lab=row(input);const text=lab.querySelector('.plx-check__label,.plx-switch__label');const box=input.getBoundingClientRect(),t=text.getBoundingClientRect();
  out.push(k.padEnd(12)+' dir on input='+(input.getAttribute('dir')||'-')+' on row='+(lab.getAttribute('dir')||'-')+' lang on row='+(lab.getAttribute('lang')||'-')+' row :dir(rtl)='+lab.matches(':dir(rtl)')+' box '+(box.left>t.left?'right':'left')+' of text');}
 const ar=document.querySelector('[data-k="ar"]');out.push('ar fieldset dir='+ar.getAttribute('dir')+' lang='+ar.getAttribute('lang')+' legend direction='+getComputedStyle(ar.querySelector('legend')).direction);
 const ro=document.querySelector('[data-k="ro-check"]');ro.click();out.push('read-only checkbox after a click: checked='+ro.checked+' aria-readonly='+ro.getAttribute('aria-readonly'));
 return out.join('\n');}));await p.screenshot({path:__dirname+'/'+side+'.png'});await p.close();}
await b.close()})()
