const puppeteer=require(process.env.HOME+'/work/plenix-b1/node_modules/puppeteer-core');
(async()=>{const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8791/plenix-b1/platform/dist/icons/dom-check.html',{waitUntil:'networkidle2'});await new Promise(r=>setTimeout(r,800));
const r=await p.evaluate(async()=>{const P=Plenix,h=React.createElement,host=document.getElementById('host');const root=ReactDOM.createRoot(host);
 const html=(el)=>{ReactDOM.flushSync(()=>root.render(el));return host.innerHTML;};
 const idx=await (await fetch('plenix/index.json')).json();const mods={};for(const i of idx.icons)mods[i.name]=(await import('./plenix/'+i.name+'.js')).default;
 const SIZES=[undefined,'xs','sm','md','lg','xl'],FILLS=[undefined,false,true];let cases=0,diffs=[],empty=0;const byName={};
 for(const n of Object.keys(mods))for(const size of SIZES)for(const filled of FILLS){const a=html(h(P.Icon,{name:n,size,filled})),c=html(h(P.Icon,{icon:mods[n],size,filled}));cases++;byName[n+'|'+size+'|'+filled]=a;if(!/<path/.test(a))empty++;if(a!==c)diffs.push(n+' '+size+' '+filled);}
 // registered: the name (and an alias: the symbol's own spelling) draws from its module, the same markup as from the stylesheet
 P.registerIcons(Object.values(mods));let regCases=0,regDiffs=[];
 for(const n of Object.keys(mods))for(const size of SIZES)for(const filled of FILLS){regCases++;if(html(h(P.Icon,{name:n,size,filled}))!==byName[n+'|'+size+'|'+filled])regDiffs.push(n+' '+size+' '+filled);}
 let aliasCases=0,aliasDiffs=[];for(const [alias,name] of Object.entries(idx.aliases)){aliasCases++;/* the alias markup (class plx-icon--<alias>) from the module equals the stylesheet's, read before registering? compare drawings only */const a=html(h(P.Icon,{name:alias}));const c=html(h(P.Icon,{icon:mods[name]}));if(a.replace(/plx-icon--[a-z0-9_-]+ /,'')!==c.replace(/plx-icon--[a-z0-9_-]+ /,''))aliasDiffs.push(alias);}
 // Material: the fetched library drawing vs the imported module
 ReactDOM.flushSync(()=>root.render(h(P.Icon,{name:'rocket_launch'})));await new Promise(r=>setTimeout(r,1500));const fetched=host.innerHTML;const rocket=(await import('./material/rocket-launch.js')).default;const fromMod=html(h(P.Icon,{icon:rocket}));
 const svg=(s)=>(s.match(/<svg[\s\S]*<\/svg>/)||[''])[0];
 return {icons:Object.keys(mods).length,cases,emptyFromStylesheet:empty,diffs:diffs.length,diffSample:diffs.slice(0,5),registered:{cases:regCases,diffs:regDiffs.length},aliases:{cases:aliasCases,diffs:aliasDiffs.length},material:{fetchedHasPath:/<path/.test(fetched),sameSvg:svg(fetched)===svg(fromMod)}};});
console.log(JSON.stringify(r,null,1));console.log('page errors',errs.length);await b.close()})()
