/* Plenix · test-only alternate DataTable engine
   Summary: Runs real application screens against the independent trial without editing those applications.
   Usage: await installNextEngine(page); DT_ENGINE=next node tests/data-table.test.js.
   Props: A Puppeteer page before navigation.
   Behavior: Replaces only that test page's Platform DataTable binding after loading the trial bundle.
   Notes: Existing production exports, source files and default engine remain unchanged. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
let source;
async function bundleNext(){if(!source){const out=await require('esbuild').build({entryPoints:[path.join(ROOT,'platform/components/DataTableNext/DataTableNext.jsx')],bundle:true,write:false,format:'iife',globalName:'PlenixNextTrial',define:{'process.env.NODE_ENV':'"production"'},plugins:[{name:'page-peers',setup(build){build.onResolve({filter:/^react(?:-dom)?$/},args=>({path:args.path,namespace:'page-peers'}));build.onLoad({filter:/.*/,namespace:'page-peers'},args=>({contents:'module.exports=window.'+(args.path==='react'?'React':'ReactDOM')+';'}));}}]});source=out.outputFiles[0].text;}return source;}
module.exports=async function installNextEngine(page){const next=await bundleNext();await page.setRequestInterception(true);page.on('request',request=>{if(new URL(request.url()).pathname.endsWith('/platform/dist/platform.js')){const original=fs.readFileSync(path.join(ROOT,'platform/dist/platform.js'),'utf8');request.respond({status:200,contentType:'text/javascript',body:original+'\n'+next+'\nwindow.Plenix=Object.freeze(Object.assign({},window.Plenix,{DataTable:PlenixNextTrial.DataTableNext,DataTableNext:PlenixNextTrial.DataTableNext}));'});}else request.continue();});};
module.exports.bundle=bundleNext;
