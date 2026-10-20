/* #197 typography comparison
   Summary: Run the unchanged typography inspector on the all CI-reported typography cases and four touched component routes, base and head in one browser.
   Usage: node tests/typography-197-compare.js <exact-base-checkout>
   Props: TYPO_COMPARE_OUTPUT optionally saves raw findings; CHROME_PATH selects the same browser for both versions.
   Behavior: Separate origins, identical viewport/media and stable findings; new findings fail for investigation.
   Notes: This does not read or update the shared typography baseline, nor exempt documentation from the inspector. */
const fs=require('fs'),path=require('path'),http=require('http'),crypto=require('crypto');
process.env.TEST_TIMEOUT_MS=process.env.TEST_TIMEOUT_MS||'2400000';
const {ROOT,launch,sleep}=require('./lib.js');
const before=path.resolve(process.argv[2]);
const cases=[["foundations/design-tokens","light"],["foundations/design-tokens","dark"],["foundations/color","light"],["layout/dashboard-grid","light"],["layout/dashboard-grid","dark"],["content/text","light"],["content/text","dark"],["content/code-block","light"],["content/code-block","dark"],["actions/button","light"],["actions/button","dark"],["actions/toolbar","light"],["actions/toolbar","dark"],["forms/text-field","light"],["forms/text-field","dark"],["navigation/application-header","light"],["navigation/application-header","dark"],["navigation/side-navigation","light"],["navigation/side-navigation","dark"],["data-display/badge","light"],["data-display/badge","dark"],["overlays/side-drawer","light"],["overlays/side-drawer","dark"],["patterns/filter-and-sort-workflow","light"],["patterns/filter-and-sort-workflow","dark"],["page-structures/application-shell","light"],["page-structures/application-shell","dark"],["specialized/typing-indicator","light"],["interaction/focus-ring","light"],["interaction/focus-ring","dark"],["implementation/css-architecture","light"],["implementation/css-architecture","dark"],["foundations/color","dark"],["layout/panel","light"],["layout/panel","dark"],["data-display/card","light"],["data-display/card","dark"],["data-display/feature-card","light"],["data-display/feature-card","dark"],["content/user-card","light"],["content/user-card","dark"],["data-display/media-card","light"],["data-display/media-card","dark"]];
const inspector=root=>{const s=fs.readFileSync(path.join(root,'tests/typography.test.js'),'utf8');return s.slice(s.indexOf('async function inspect()'),s.indexOf('\n(async () =>')).trim();};
const source=inspector(ROOT);if(source!==inspector(before))throw Error('Base/head typography inspectors differ');
const inspect=eval('('+source+')');
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
const serve=(root,port)=>new Promise(resolve=>{const s=http.createServer((req,res)=>{let rel=decodeURIComponent(req.url.split('?')[0]);if(!rel.startsWith('/Plenix/')){res.writeHead(404).end();return;}let f=path.join(root,rel.slice(8));try{if(fs.statSync(f).isDirectory())f=path.join(f,'index.html');const b=fs.readFileSync(f);res.setHeader('Content-Type',types[path.extname(f)]||'application/octet-stream');res.end(b);}catch(e){res.writeHead(404).end();}});s.listen(port,'127.0.0.1',()=>resolve(s));});
(async()=>{const servers=[await serve(before,9652),await serve(ROOT,9653)],browser=await launch(),results=[];
try{for(const [route,mode] of cases.filter(c=>!process.env.TYPO_CASES||JSON.parse(process.env.TYPO_CASES).includes(c.join('|')))){const pair={route,mode};for(const [label,port] of [['base',9652],['head',9653]]){
 const context=await browser.createBrowserContext(),page=await context.newPage();
 try{await page.setViewport({width:1440,height:1000});await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:mode},{name:'prefers-reduced-motion',value:'reduce'}]);
 await page.goto('http://127.0.0.1:'+port+'/Plenix/platform/design-system/index.html#/'+route,{waitUntil:'networkidle0',timeout:120000});
 await page.waitForFunction(()=>window.DSInventory&&document.querySelector('main'));await sleep(1000);
 let a=await page.evaluate(inspect),stable=false;for(let i=0;i<4;i++){await sleep(500);const b=await page.evaluate(inspect);if(JSON.stringify(a)===JSON.stringify(b)){stable=true;break;}a=b;}
 if(!stable)throw Error(label+' '+route+' findings did not stabilize');pair[label]=a;
 pair[label+'Fonts']=await page.evaluate(()=>({root:getComputedStyle(document.documentElement).fontSize,loaded:document.fonts.status,theme:document.documentElement.getAttribute('data-plx-theme'),density:document.documentElement.getAttribute('data-plx-density')}));
 }finally{await context.close();}}
 pair.added={};pair.removed={};for(const key of Object.keys(pair.head)){pair.added[key]=pair.head[key].filter(x=>!pair.base[key].includes(x));pair.removed[key]=pair.base[key].filter(x=>!pair.head[key].includes(x));}
 results.push(pair);if(process.env.TYPO_COMPARE_OUTPUT)fs.writeFileSync(process.env.TYPO_COMPARE_OUTPUT,JSON.stringify({results},null,2));console.log(route+' '+mode+' base='+pair.base.baseline.length+' head='+pair.head.baseline.length+' added='+Object.values(pair.added).flat().length);
 }
 const evidence={baseRoot:before,headRoot:ROOT,inspectorSha256:crypto.createHash('sha256').update(source).digest('hex'),browser:await browser.version(),viewport:[1440,1000],results};
 if(process.env.TYPO_COMPARE_OUTPUT)fs.writeFileSync(process.env.TYPO_COMPARE_OUTPUT,JSON.stringify(evidence,null,2)+'\n');
 const additions=results.reduce((n,r)=>n+Object.values(r.added).flat().length,0);console.log(additions?'TYPO_COMPARE_DIFF '+additions:'TYPO_COMPARE_OK '+results.length);process.exitCode=additions?1:0;
}finally{await browser.close();for(const s of servers)s.close();}})().catch(e=>{console.error(e);process.exit(1)});