// Task 165: collection exposes every eligible field and applies calendar/range groups.
const assert=require('assert/strict'),{serve,launch}=require('./lib');
(async()=>{const server=await serve(9729);let browser;try{browser=await launch();const page=await browser.newPage();await page.goto('http://127.0.0.1:9729/Plenix/dashboard/index.html',{waitUntil:'load'});await page.waitForFunction(()=>window.Plenix&&window.ReactDOM);
await page.evaluate(()=>{const h=React.createElement,fields=[{value:'name',label:'Name',kind:'text'},{value:'date',label:'Date',kind:'date'},{value:'number',label:'Number',kind:'number',groupRange:10},{value:'secret',label:'Secret',groupable:false}],data=[{id:1,name:'A',date:'2026-01-01',number:1},{id:2,name:'B',date:'2026-01-02',number:9}],columns=fields.map(f=>({field:f.value,title:f.label,groupable:f.groupable}));const host=document.createElement('main');document.body.replaceChildren(host);function Fixture(){const v=Plenix.useCollectionView(fields,{data});window.__group165=v;return h(React.Fragment,null,h(Plenix.GroupPanel,{...v.groupProps,inline:true}),h(Plenix.DataGrid,{label:'Grouping',data,columns,mode:'pages',...v.tableProps}));}ReactDOM.createRoot(host).render(h(Fixture));});
await page.waitForFunction(()=>window.__group165?.table.current);
assert.deepEqual(await page.evaluate(()=>window.__group165.groupProps.fields.map(f=>f.value)),['name','date','number']);
await page.evaluate(()=>window.__group165.setGroup([{field:'date',interval:'month',dir:'asc'}]));await page.waitForFunction(()=>window.__group165.table.current.getGroups().length===1);
await page.evaluate(()=>window.__group165.setGroup([{field:'date',interval:'day',dir:'asc'}]));await page.waitForFunction(()=>window.__group165.table.current.getGroups().length===2);
await page.evaluate(()=>window.__group165.setGroup([{field:'number',dir:'asc'}]));await page.waitForFunction(()=>window.__group165.table.current.getGroups().length===1);
console.log('GRID_GROUP_BROWSER_OK eligible fields, calendar periods and field numeric ranges');
}finally{if(browser)await browser.close();server.close();}})().catch(e=>{console.error(e);process.exit(1)});
