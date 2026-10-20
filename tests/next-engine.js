/* Plenix · test-only alternate DataGrid engine
   Summary: Runs real application screens against the independent trial without editing those applications.
   Usage: await installNextEngine(page); DT_ENGINE=next node tests/data-grid.test.js.
   Props: A Puppeteer page before navigation.
   Behavior: Replaces only that test page's DataGrid binding with its ordinary public DataGridEngine export.
   Notes: Existing production exports, source files and default engine remain unchanged. */
const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');
module.exports=async function installNextEngine(page){await page.setRequestInterception(true);page.on('request',request=>{if(new URL(request.url()).pathname.endsWith('/platform/dist/platform.js')){const original=fs.readFileSync(path.join(ROOT,'platform/dist/platform.js'),'utf8');request.respond({status:200,contentType:'text/javascript',body:original+'\nif(!window.Plenix.DataGridEngine)throw Error("Public DataGridEngine export missing");var OriginalDataGrid=window.Plenix.DataGrid;window.Plenix=Object.freeze(Object.assign({},window.Plenix,{DataGrid:Object.assign(function(props){return window.React.createElement(OriginalDataGrid,Object.assign({},props,{engine:"next"}));},OriginalDataGrid,{preload:window.Plenix.DataGridEngine.preload})}));'});}else request.continue();});};
