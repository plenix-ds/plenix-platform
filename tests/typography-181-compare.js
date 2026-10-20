/* #181 typography comparison
   Summary: Run the unchanged typography inspector on the 16 previously unmatched cases, base and head in one browser.
   Usage: node tests/typography-181-compare.js <exact-base-checkout>
   Props: TYPO_COMPARE_OUTPUT optionally saves raw findings; CHROME_PATH selects the same browser for both versions.
   Behavior: Separate origins, identical viewport/media and stable findings; new findings fail for investigation.
   Notes: This does not read or update the shared typography baseline, nor exempt documentation from the inspector. */
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
const {ROOT,launch,sleep}=require('./lib.js');
const before=path.resolve(process.argv[2]);
const cases=[
 ['foundations/color','dark'],['layout/dashboard-grid','light'],['layout/dashboard-grid','dark'],
 ['content/text','light'],['content/text','dark'],['content/code-block','dark'],['actions/toolbar','dark'],
 ['forms/text-field','light'],['forms/text-field','dark'],['data-display/badge','dark'],['overlays/side-drawer','light'],
 ['overlays/media-lightbox','light'],['page-structures/application-shell','dark'],['specialized/typing-indicator','dark'],
 ['interaction/focus-ring','light'],['interaction/focus-ring','dark']
];
const inspector=root=>{const s=fs.readFileSync(path.join(root,'tests/typography.test.js'),'utf8');return s.slice(s.indexOf('async function inspect()'),s.indexOf('\n(async () =>')).trim();};
const source=inspector(ROOT);if(source!==inspector(before))throw Error('Base/head typography inspectors differ');
const inspect=eval('('+source+')');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const serve=(root,port)=>new Promise(resolve=>{const s=http.createServer((req,res)=>{let rel=decodeURIComponent(req.url.split('?')[0]);if(!rel.startsWith('/Plenix/')){res.writeHead(404).end();return;}let f=path.join(root,rel.slice(8));try{if(fs.statSync(f).isDirectory())f=path.join(f,'index.html');const b=fs.readFileSync(f);res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(b);}catch(e){res.writeHead(404).end();}});s.listen(port,'127.0.0.1',()=>resolve(s));});
(async()=>{const servers=[await serve(before,9627),await serve(ROOT,9628)],browser=await launch(),results=[];
try{for(const [route,mode] of cases){const pair={route,mode};for(const [label,port] of [['base',9627],['head',9628]]){
 const context=await browser.createBrowserContext(),page=await context.newPage();
 try{await page.setViewport({width:1440,height:1000});await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:mode},{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto('http://127.0.0.1:'+port+'/Plenix/platform/design-system/index.html#/'+route,{waitUntil:'networkidle0',timeout:120000});
 await page.waitForFunction(()=>window.DSInventory&&document.querySelector('main'));await sleep(1000);
 let a=await page.evaluate(inspect),stable=false;for(let i=0;i<4;i++){await sleep(500);const b=await page.evaluate(inspect);if(JSON.stringify(a)===JSON.stringify(b)){stable=true;break;}a=b;}
 if(!stable)throw Error(label+' '+route+' findings did not stabilize');pair[label]=a;
 pair[label+'Fonts']=await page.evaluate(()=>({root:getComputedStyle(document.documentElement).fontSize,loaded:document.fonts.status,theme:document.documentElement.getAttribute('data-plx-theme'),density:document.documentElement.getAttribute('data-plx-density')}));
 }finally{await context.close();}}
 pair.added={};pair.removed={};for(const key of Object.keys(pair.head)){pair.added[key]=pair.head[key].filter(x=>!pair.base[key].includes(x));pair.removed[key]=pair.base[key].filter(x=>!pair.head[key].includes(x));}
 results.push(pair);console.log(route+' '+mode+' base='+pair.base.baseline.length+' head='+pair.head.baseline.length+' added='+Object.values(pair.added).flat().length);
 }
 const evidence={baseRoot:before,headRoot:ROOT,inspectorSha256:crypto.createHash('sha256').update(source).digest('hex'),browser:await browser.version(),viewport:[1440,1000],results};
 if(process.env.TYPO_COMPARE_OUTPUT)fs.writeFileSync(process.env.TYPO_COMPARE_OUTPUT,JSON.stringify(evidence,null,2)+'\n');
 const additions=results.reduce((n,r)=>n+Object.values(r.added).flat().length,0);console.log(additions?'TYPO_COMPARE_DIFF '+additions:'TYPO_COMPARE_OK '+results.length);process.exitCode=additions?1:0;
}finally{await browser.close();for(const s of servers)s.close();}})().catch(e=>{console.error(e);process.exit(1)});