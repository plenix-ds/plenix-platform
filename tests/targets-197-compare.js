/* #197 focused target comparison. Uses the original target measurement, scoped only to Card/MediaCard controls.
   The broad original target test still runs separately; this isolates the components owned by #182. */
process.env.TEST_TIMEOUT_MS='600000';
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');const {ROOT,launch,sleep}=require('./lib');
const before=process.argv[2],out=process.argv[3],routes=['data-display/feature-card','content/user-card','data-display/card','data-display/media-card'];
const original=root=>{const s=fs.readFileSync(path.join(root,'tests/targets.test.js'),'utf8');return s.slice(s.indexOf('function measure(min, spacing)'),s.indexOf('\n(async () =>')).trim();};
const src=original(ROOT);if(src!==original(before))throw Error('Target inspectors differ');
const inspect=eval('('+src.replace('document.querySelectorAll(SEL)',"[...document.querySelectorAll(SEL)].filter(el=>el.closest('.plx-card,.plx-media-card'))")+')');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const serve=(root,port)=>new Promise(resolve=>{const s=http.createServer((req,res)=>{let rel=decodeURIComponent(req.url.split('?')[0]);if(!rel.startsWith('/Plenix/'))return res.writeHead(404).end();let f=path.join(root,rel.slice(8));try{if(fs.statSync(f).isDirectory())f=path.join(f,'index.html');res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(fs.readFileSync(f));}catch(e){res.writeHead(404).end();}});s.listen(port,'127.0.0.1',()=>resolve(s));});
(async()=>{const servers=[await serve(before,9654),await serve(ROOT,9655)],browser=await launch(),results=[];try{
 for(const mode of ['coarse','fine'])for(const route of routes){const pair={route,mode};for(const [side,port] of [['base',9654],['head',9655]]){
  const context=await browser.createBrowserContext(),page=await context.newPage();try{
   await page.setViewport({width:mode==='coarse'?1280:1440,height:mode==='coarse'?900:1000,hasTouch:mode==='coarse'});
   if(mode==='coarse'){const cdp=await page.createCDPSession();await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});await cdp.send('Emulation.setEmulatedMedia',{features:[{name:'pointer',value:'coarse'},{name:'any-pointer',value:'coarse'},{name:'hover',value:'none'},{name:'any-hover',value:'none'},{name:'prefers-reduced-motion',value:'reduce'}]});}
   await page.goto('http://127.0.0.1:'+port+'/Plenix/platform/design-system/index.html#/'+route,{waitUntil:'networkidle0',timeout:120000});await page.evaluate(()=>document.fonts.ready);await sleep(1000);pair[side]=await page.evaluate(inspect,mode==='coarse'?44:24,mode==='fine');
  }finally{await context.close();}}
  pair.added=pair.head.fail.filter(x=>!pair.base.fail.includes(x));results.push(pair);console.log(route+' '+mode+' base='+pair.base.fail.length+' head='+pair.head.fail.length+' added='+pair.added.length);fs.writeFileSync(out,JSON.stringify({inspectorSha256:crypto.createHash('sha256').update(src).digest('hex'),browser:await browser.version(),results},null,2));
 }
 if(results.some(r=>r.added.length||r.base.n!==r.head.n||r.base.covered!==r.head.covered))throw Error('Target regression or coverage difference');console.log('CARD_TARGETS_SAME 8');
}finally{await browser.close();servers.forEach(s=>s.close());}})().catch(e=>{console.error(e);process.exit(1);});
