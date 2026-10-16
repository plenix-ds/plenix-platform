/* Plenix · test-only alternate DataTable engine
   Summary: Runs real application screens against the independent trial without editing those applications.
   Usage: await installNextEngine(page); DT_ENGINE=next node tests/data-table.test.js.
   Props: A Puppeteer page before navigation.
   Behavior: Replaces only that test page's DataTable binding with its ordinary public DataTableNext export.
   Notes: Existing production exports, source files and default engine remain unchanged. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
module.exports=async function installNextEngine(page){await page.setRequestInterception(true);page.on('request',request=>{if(new URL(request.url()).pathname.endsWith('/platform/dist/platform.js')){const original=fs.readFileSync(path.join(ROOT,'platform/dist/platform.js'),'utf8');request.respond({status:200,contentType:'text/javascript',body:original+'\nif(!window.Plenix.DataTableNext)throw Error("Public DataTableNext export missing");var OriginalDataTable=window.Plenix.DataTable;window.Plenix=Object.freeze(Object.assign({},window.Plenix,{DataTable:Object.assign(function(props){return window.React.createElement(OriginalDataTable,Object.assign({},props,{engine:"next"}));},OriginalDataTable,{preload:window.Plenix.DataTableNext.preload})}));'});}else request.continue();});};
