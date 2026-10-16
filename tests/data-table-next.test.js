/* Plenix · DataTableNext core regression
   Summary: Exercises the independent TanStack renderer in real Chrome.
   Usage: node tests/data-table-next.test.js
   Props: CHROME_PATH optional browser path.
   Behavior: Checks state-at-open, virtualization, selection, filtering, saved views and the compatible public API.
   Notes: Uses the ordinary Platform public export; DT_SHARED_CSS explicitly tests the pending frozen-column fix. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const {serve,launch}=require('./lib');
const ROOT=path.resolve(__dirname,'..');
(async()=>{
 const server=await serve(9257);let browser;try{browser=await launch();const page=await browser.newPage();await page.setViewport({width:1400,height:1000});await page.setRequestInterception(true);page.on('request',r=>process.env.DT_SHARED_CSS&&new URL(r.url()).pathname.endsWith('/components/DataTable/data-table.css')?r.respond({status:200,contentType:'text/css',body:fs.readFileSync(process.env.DT_SHARED_CSS,'utf8')}):r.url().endsWith('/.next-core.html')?r.respond({status:200,contentType:'text/html',body:'<!doctype html><html lang="en" data-plx-theme="default" data-plx-density="compact"><head><meta charset="utf-8"><link rel="stylesheet" href="/Plenix/platform/platform.css"><script src="/Plenix/platform/vendor/react-loader.js"></script><script src="/Plenix/platform/dist/platform.js"></script><script src="/Plenix/platform/dev/style-audit.js"></script></head><body><main></main></body></html>'}):r.continue());await page.goto('http://127.0.0.1:9257/Plenix/tests/.next-core.html',{waitUntil:'networkidle0'});await page.evaluate(()=>{if(!window.Plenix.DataTableNext)throw Error('Public DataTableNext export missing');window.DataTableNextTest=window.Plenix;});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.evaluate(flag=>window.__testPublicSwitch=flag,!!process.env.DT_PUBLIC_SWITCH);
 const checks=await page.evaluate(async()=>{
   const h=React.createElement,host=document.querySelector('main'),root=ReactDOM.createRoot(host),wait=(ms=120)=>new Promise(r=>setTimeout(r,ms));let table,props,count=0,selectionEvent,failures=[],rowAction=null;
   const check=(yes,text)=>{if(!yes)failures.push(text);count++;};
   const rows=Array.from({length:600},(_,id)=>({id,name:'Person '+String(id).padStart(4,'0'),team:id%2?'Odd':'Even',size:600-id}));
   const columns=[{field:'name',title:'Name',width:240},{field:'team',title:'Team',width:160},{field:'size',title:'Size',width:160,sorter:'number',kind:'data'}];
   const render=patch=>{props={...props,...patch};ReactDOM.flushSync(()=>root.render(h(window.__testPublicSwitch?DataTableNextTest.DataTable:DataTableNextTest.DataTableNext,{...props,engine:'next'})));};
   props={label:'Next records',data:rows,columns,height:'--plx-ref-size-400px',narrow:'table',selectable:true,onSelectionChange:(keys,info)=>{selectionEvent={keys,info};},onReady:t=>{table=t;}};
   try{
     render({});for(let i=0;!table&&i<50;i++)await wait();await wait();
     check(!!table,'table becomes ready');check(!window.Tabulator,'trial does not load the Tabulator engine');
     const drawn=()=>host.querySelectorAll('.plx-data-table__grid-row').length;check(drawn()>0&&drawn()<600,'TanStack virtualizes 600 records');
     check(host.querySelector('[role="grid"]').getAttribute('aria-rowcount')==='601','logical row count covers every record');
     check(host.querySelectorAll('.plx-data-table__grid-col[data-plx-field]').length===3,'all headers rendered');
     table.selectRow(3);await wait();check(selectionEvent.keys[0]===3&&selectionEvent.info.count===1,'compatible selection preserves numeric key');
     render({filter:r=>r.team==='Even'});await wait();check(table.getData('active').length===300,'controlled function filter applies');
     check(selectionEvent.info.hidden===1,'hidden selected records remain reported');
     render({keepHiddenSelection:false});await wait();check(selectionEvent.keys.length===0,'hidden selection can be cleared in one update');
     render({sort:[{field:'size',dir:'asc'}]});await wait();check(table.getSorters()[0].dir==='asc','controlled sort state applies');
     render({hiddenColumns:['team'],columnOrder:['size','team','name']});await wait();check(!table.getColumn('team').isVisible(),'controlled visibility applies');
     check([...host.querySelectorAll('.plx-data-table__grid-col[data-plx-field]')].map(e=>e.getAttribute('data-plx-field')).join(',')==='size,name','controlled order includes hidden columns');
     check(table.getRow(3).getData().id===3,'row callback shim reads canonical record');
     render({data:[{id:1,name:'Numeric',team:'Even',size:1},{id:'1',name:'String',team:'Even',size:2}],filter:undefined,keepHiddenSelection:true,sort:[]});await wait();table.selectRow(1);await wait();table.selectRow('1');await wait();
     check(selectionEvent.keys.length===2&&selectionEvent.keys.includes(1)&&selectionEvent.keys.includes('1'),'numeric and string record IDs select independently');
     localStorage.setItem('plx-data-table:next-saved',JSON.stringify({order:['size','team','name'],hidden:['team'],widths:{name:'320px'},sort:[{column:'size',dir:'asc'}]}));
     render({storageKey:'next-saved',hiddenColumns:undefined,columnOrder:undefined,sort:undefined,data:rows});await wait();await wait();
     check(table.getColumns().map(c=>c.getField()).join(',')==='size,team,name','saved order is the opening order');
     check(!table.getColumn('team').isVisible()&&table.getColumn('name').getWidth()===320,'saved visibility and widths are ready together');
     check(table.getRows('active')[0].getData().size===1,'saved sort is active on first ready view');
     host.style.inlineSize='320px';render({narrow:'list',keyColumns:['name','size']});await wait();await wait();
     check(!!host.querySelector('.plx-data-table--narrow'),'narrow list follows its container');
     host.style.removeProperty('inline-size');render({narrow:'table',mode:'pages',height:undefined});await wait();await wait();
     check(drawn()===50&&!!host.querySelector('.plx-data-table__footer'),'pages renders its page and accessible footer');
     table.setPage(2);await wait();check(table.getPage()===2&&host.querySelector('.plx-data-table__range').textContent.includes('51–100'),'page change updates the record range');
     render({data:[],mode:'fill'});await wait();check(!!host.querySelector('.plx-data-table__grid-placeholder'),'empty state renders without rows');
     render({error:new Error('Records unavailable')});await wait();check(host.textContent.includes('Records unavailable'),'error state retains the supplied reason');
     render({error:undefined,storageKey:'next-remote',mode:'pages',fetchRows:async({page,size})=>({rows:rows.slice((page-1)*size,page*size),total:600})});await wait();await wait();
     check(table.getData().length===50&&host.querySelector('.plx-data-table__range').textContent.includes('of 600'),'remote pages use returned records and total');
     render({storageKey:'next-frozen',mode:'fill',height:'--plx-ref-size-400px',fetchRows:undefined,data:rows,columns:columns.map((c,i)=>({...c,frozen:i<2}))});host.style.inlineSize='320px';await wait();await wait();
     const scroller=host.querySelector('.plx-data-table__grid-tableholder'),firstCell=()=>host.querySelector('.plx-data-table__grid-row [data-plx-field="name"]'),left=firstCell().getBoundingClientRect().left;
     scroller.scrollLeft=200;await wait();check(Math.abs(firstCell().getBoundingClientRect().left-left)<1,'frozen columns retain their token-derived offsets during horizontal scrolling '+JSON.stringify({before:left,after:firstCell().getBoundingClientRect().left,position:getComputedStyle(firstCell()).position,inset:getComputedStyle(firstCell()).insetInlineStart,holder:scroller.clientWidth,scrollWidth:scroller.scrollWidth,row:firstCell().parentElement.getBoundingClientRect().width,body:scroller.querySelector('.plx-data-table__grid-table').getBoundingClientRect().width,style:firstCell().getAttribute('style')}));
     const heading=host.querySelector('.plx-data-table__grid-col[data-plx-field="name"]');heading.focus();heading.dispatchEvent(new KeyboardEvent('keydown',{key:'F10',shiftKey:true,bubbles:true}));await wait();
     check(!!document.querySelector('[role="menu"]'),'header context menu opens from the keyboard');
     document.activeElement.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));await wait();check(document.activeElement===heading,'header menu returns focus on Escape');
     scroller.focus();scroller.dispatchEvent(new KeyboardEvent('keydown',{key:'ArrowDown',bubbles:true}));await wait();check(document.activeElement.getAttribute('role')==='gridcell','arrow navigation enters a logical grid cell');
     host.style.removeProperty('inline-size');
     render({storageKey:'next-actions',columns,viewMenu:true,rowMenu:[{label:'Inspect record',onSelect:record=>{rowAction=record.id;}}]});await wait();await wait();
     const action=host.querySelector('.plx-data-table__row-menu');action.click();await wait();[...document.querySelectorAll('[role="menuitem"]')].find(item=>item.textContent.trim()==='Inspect record')?.click();await wait();
     check(rowAction===0,'row action receives the canonical record');
     check(host.querySelector('[role="grid"]').getAttribute('aria-colcount')==='6','view and row-menu mark columns have matching logical headers');
     [...host.querySelectorAll('button')].find(button=>button.getAttribute('aria-label')==='View options')?.click();await wait();[...document.querySelectorAll('[role="menuitemcheckbox"]')].find(item=>item.textContent.trim()==='Medium')?.click();await wait();await wait();
     check(host.querySelector('.plx-data-table').getAttribute('data-plx-row-height')==='medium','view menu changes the token row-height step');
     const choices=[...host.querySelectorAll('.plx-data-table__grid-row input[type="checkbox"]')];choices[0].click();await wait();choices[3].dispatchEvent(new MouseEvent('click',{shiftKey:true,bubbles:true}));await wait();
     check(selectionEvent.keys.length===4,'Shift selection spans canonical rows');
     const all=host.querySelector('.plx-data-table__grid-header input[type="checkbox"]');all.click();await wait();check(selectionEvent.keys.length===600,'select all selects every filtered record');all.click();await wait();check(selectionEvent.keys.length===0,'select all clears the filtered selection');
     localStorage.removeItem('plx-data-table:next-saved');localStorage.removeItem('plx-data-table:next-remote');
     const findings=window.PlenixStyleAudit.audit().filter(f=>f.element.includes('plx-data-table__grid-cell')||f.element.includes('plx-data-table__grid-tableholder')||f.element.includes('plx-data-table__grid-table'));
     check(findings.length===0,'token spacers and widths satisfy runtime audit: '+JSON.stringify(findings.slice(0,2)));
     return {count,failures};
   } finally {ReactDOM.flushSync(()=>root.unmount());}
 });assert.deepEqual(errors,[]);assert.deepEqual(checks.failures,[]);console.log('DATA_TABLE_NEXT_OK '+checks.count+' core browser checks');
 }finally{if(browser)await browser.close();await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
