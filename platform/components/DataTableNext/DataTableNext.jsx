/* Plenix · DataTableNext (TanStack trial, phase 1)
   Summary: A React-owned grid beside DataTable; no existing table switches engines.
   Usage: <DataTableNext label="People" data={people} columns={columns} selectable />
   Props: DataTable's core props: label/data/columns/index, controlled selection and view props, storageKey,
     rowHeight/wrapHeaders/viewMenu, narrow/keyColumns/narrowAt, fill/pages, fetchRows, empty/error/onRetry,
     rowMenu/rowMenuButton/headerMenu/columnMenu, strings, on and onReady. Column render receives a compatible cell.
   Behavior: TanStack owns row models and column state; TanStack Virtual chooses the rendered window. Existing
     token-sized CSS gaps represent missing rows. Opening saved state is supplied on the very first render.
   Notes: Phase 2 adds grouping, tree, editing, moving rows, load-more and remaining built-in rich cell kinds.
     Existing DataTable CSS and public DataTable exports remain unchanged. */
import React from 'react';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cx } from '../../utils/cx.js';
import { gridPx, snapToGrid, gridStep } from '../../utils/grid.js';
import { SIZE_STEPS, stepSize, snapSize } from '../../utils/sizeSteps.js';
import { gapPieces } from '../../hooks/useVirtualizer.js';
import { tokenPixels, structuralStylesheet } from './environment.js';
import { Icon } from '../Icon/Icon.jsx';
import { Button } from '../Button/Button.jsx';
import { Menu, MenuItem, MenuDivider, ContextMenu } from '../Menu/Menu.jsx';
import { Text } from '../Text/Text.jsx';
import { Input, Select } from '../Input/Input.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { EmptyState } from '../EmptyState/EmptyState.jsx';
import { opening, writeView, recordKey, normalizeSort, visibilityOf, valueAt } from './state.js';
import { createAdapter } from './adapter.js';

const EMPTY_ROWS=[];
const B = 'plx-data-table', interactive = 'a,button,input,select,textarea,label,[role="button"],[contenteditable="true"]';
const defaults = { empty: 'Nothing to show', failed: 'The table could not load', retry: 'Retry', selectAll: 'Select all rows', selectRow: 'Select row',
  rowActions: 'Row actions', clearSort: 'Clear sort', hide: 'Hide field', showAll: 'Show all fields', narrower: 'Narrower', wider: 'Wider', fit: 'Fit to content',
  moveLeft: 'Move left', moveRight: 'Move right', perPage: 'Rows per page', view: 'View options', wrapHeaders: 'Wrap headers', rowHeight: 'Row height',
  short: 'Short', medium: 'Medium', tall: 'Tall', 'extra-tall': 'Extra tall', filter: 'Filter', clearFilter: 'Clear filter' };
const typeIcons = { text: 'ed-text', number: 'field-number', bytes: 'attachment', currency: 'field-currency', date: 'calendar', select: 'field-select', checkbox: 'select', file: 'attachment', image: 'image-a-2', link: 'link', person: 'person', 'long-text': 'field-long-text' };
const kinds = c => [].concat(c.kind || []);
const typeOf = c => c.type || (kinds(c).includes('wrap') ? 'long-text' : c.sorter === 'number' ? 'number' : c.sorter === 'date' ? 'date' : 'text');
const sorted = s => s.map(x => ({ field: x.id, dir: x.desc ? 'desc' : 'asc' }));
const lengthName = v => { const match = /(?:--plx-ref-size-)?(\d+px)/.exec(String(v || '')); return match?.[1]; };
const compare = (a, b, id) => { const x=a.getValue(id), y=b.getValue(id); if (x == null || y == null) return x == null ? y == null ? 0 : -1 : 1; return String(x).localeCompare(String(y), undefined, { numeric: true }); };
function Gap({ count }) { return count > 0 ? <div className="plx-virtual-gap plx-data-table__gap" aria-hidden="true">{gapPieces(count).map((n,i)=><div key={i} className="plx-virtual-gap__piece" data-plx-span={String(n)} />)}</div> : null; }
function Check({ checked, mixed, label, onChange }) { const ref=React.useRef(null); React.useLayoutEffect(()=>{if(ref.current)ref.current.indeterminate=!!mixed;},[mixed]); return <label className={B+'__check'} onClick={e=>e.stopPropagation()}><input ref={ref} type="checkbox" checked={!!checked} aria-label={label} onChange={onChange} onClick={e=>e.stopPropagation()}/></label>; }
// Calculate token widths during React's read-only render, then let React batch all style writes at commit.
// Reading the grid in a separate layout effect for every new cell alternates reads and writes and forces layout.
const Width = React.forwardRef(function Width({ as: Element='div', width, frozenOffset, children, ...props }, forwarded) {
  const ref=React.useRef(null),style=width==null?undefined:{width:gridPx(width,{el:ref.current||document.documentElement}),...(frozenOffset==null?{}:{insetInlineStart:gridPx(frozenOffset,{el:ref.current||document.documentElement})})};
  return <Element {...props} style={style} ref={node=>{ref.current=node;if(typeof forwarded==='function')forwarded(node);else if(forwarded)forwarded.current=node;}}>{children}</Element>;
});

function NextEngine(props) {
  const { label, data=EMPTY_ROWS, columns, index='id', selectable=false, selected, keepHiddenSelection=true, onSelectionChange,
    options={}, mode='fill', height, narrow='list', narrowAt='--plx-ref-size-600px', keyColumns, storageKey,
    headerMenu=true, rowMenu, rowMenuButton=true, columnMenu, onReady, on={}, className, empty, error, onRetry } = props;
  const S={...defaults,...props.strings}, initial=React.useMemo(()=>opening(props),[storageKey]);
  const frame=React.useRef(null),holder=React.useRef(null),header=React.useRef(null), live=React.useRef({}), ready=React.useRef(false);
  const selectionAnchor=React.useRef(null);
  const listeners=React.useRef(new Map()),rowElements=React.useRef(new Map()),headerElements=React.useRef(new Map());
  const [localSort,setSorting]=React.useState(initial.sorting),[order,setOrder]=React.useState(initial.order),[visibility,setVisibility]=React.useState(initial.visibility);
  const sortSignal=JSON.stringify(props.sort),orderSignal=JSON.stringify(props.columnOrder),hiddenSignal=JSON.stringify(props.hiddenColumns);
  const [sortOwner,setSortOwner]=React.useState(null),[orderOwner,setOrderOwner]=React.useState(null),[hiddenOwner,setHiddenOwner]=React.useState(null);
  const [sizing,setSizing]=React.useState(()=>Object.fromEntries(Object.entries(initial.widths).map(([k,v])=>[k,parseFloat(v)])));
  const [autoSizing,setAutoSizing]=React.useState({});
  const [rowHeight,setRowHeight]=React.useState(initial.rowHeight),[wrapHeaders,setWrapHeaders]=React.useState(initial.wrapHeaders);
  const [filterField,setFilterField]=React.useState(null);
  const [ownSelection,setSelection]=React.useState({}),[filters,setFilters]=React.useState([]),[page,setPage]=React.useState(0),[pageSize,setPageSize]=React.useState(props.pageSize||50);
  const [remote,setRemote]=React.useState(null),[remoteError,setRemoteError]=React.useState(null),[retry,setRetry]=React.useState(0);
  const [metrics,setMetrics]=React.useState({row:0,line:0,lead:0,menu:0,min:0,space:0,room:0}),[isNarrow,setNarrow]=React.useState(false),[message,setMessage]=React.useState('');
  const effectiveStep=props.rowHeight || rowHeight, effectiveWrap=props.wrapHeaders ?? wrapHeaders;
  const selection=Array.isArray(selected)?Object.fromEntries(selected.map(k=>[recordKey(k),true])):ownSelection;
  const sorting=sortOwner===sortSignal?localSort:props.sort?.length?normalizeSort(props.sort):localSort;
  const columnOrder=orderOwner===orderSignal?order:props.columnOrder || order, columnVisibility=hiddenOwner===hiddenSignal?visibility:props.hiddenColumns?visibilityOf(props.hiddenColumns):visibility;
  const remoteMode=typeof props.fetchRows==='function'&&mode==='pages',source=remoteMode?(remote?.rows||EMPTY_ROWS):data;
  const emit=(name,...args)=>{live.current.props.on?.[name]?.(...args);listeners.current.get(name)?.forEach(fn=>fn(...args));};
  const api=React.useMemo(()=>createAdapter(live),[]);
  const resize=(field,value)=>{const definition=columns.find(c=>c.field===field),at=frame.current;const min=tokenPixels(definition?.minWidth||'--plx-ref-size-80px',at),max=definition?.maxWidth?tokenPixels(definition.maxWidth,at):SIZE_STEPS[SIZE_STEPS.length-1];const width=snapToGrid(snapSize(tokenPixels(value,at),min,max),{el:at});setSizing(s=>({...s,[field]:width}));};
  const move=(field,target,after)=>{const current=live.current.table.getAllLeafColumns().map(c=>c.id).filter(id=>!id.startsWith('__')&&id!==field);const at=current.indexOf(target);current.splice(Math.max(0,at+(after?1:0)),0,field);setOrderOwner(orderSignal);setOrder(current);emit('columnMoved',api.column(field),current.map(api.column));};
  const notifySelection=next=>{
    setSelection(next);const active=new Set(live.current.table.getFilteredRowModel().rows.map(r=>r.id)),records=source.filter(r=>next[recordKey(r[index])]);
    onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:records.filter(r=>!active.has(recordKey(r[index]))).length});
    emit('rowSelectionChanged',records,records.map(r=>api.row(recordKey(r[index]))));
  };
  const pick=(key,value)=>{const next={...live.current.selection};if(options.selectableRows===1&&value)Object.keys(next).forEach(k=>delete next[k]);if(value)next[key]=true;else delete next[key];notifySelection(next);};
  const changeSort=update=>{const next=typeof update==='function'?update(sorting):update;setSortOwner(sortSignal);setSorting(next);setPage(0);emit('dataSorted',next.map(s=>({field:s.id,dir:s.desc?'desc':'asc'})));};
  const leafDefs=React.useMemo(()=>columns.map(c=>({id:c.field,accessorFn:r=>valueAt(r,c.field),header:c.title||c.field,
    enableSorting:c.headerSort!==false,filterFn:c.filter==='list'?'equalsString':'includesString',sortingFn:c.sorter==='number'?'basic':compare,
    size:kinds(c).includes('icon')?metrics.lead:Math.max(metrics.min,tokenPixels(c.width,frame.current)||autoSizing[c.field]||metrics.min),minSize:kinds(c).includes('icon')?metrics.lead:tokenPixels(c.minWidth,frame.current)||metrics.min,
    maxSize:kinds(c).includes('icon')?metrics.lead:c.maxWidth?tokenPixels(c.maxWidth,frame.current):SIZE_STEPS[SIZE_STEPS.length-1],meta:c})),[columns,metrics.min,autoSizing]);
  const table=useReactTable({data:source,columns:leafDefs,getRowId:r=>recordKey(r[index]),
    state:{sorting,columnOrder,columnVisibility,columnSizing:sizing,columnFilters:filters,globalFilter:props.filter,pagination:{pageIndex:page,pageSize},rowSelection:selection},
    onSortingChange:changeSort,
    onColumnVisibilityChange:update=>{setHiddenOwner(hiddenSignal);setVisibility(typeof update==='function'?update(columnVisibility):update);},onColumnOrderChange:update=>{setOrderOwner(orderSignal);setOrder(typeof update==='function'?update(columnOrder):update);},onColumnSizingChange:setSizing,onColumnFiltersChange:update=>{setFilters(update);setPage(0);},
    getColumnCanGlobalFilter:()=>true,globalFilterFn:(row,id,fn)=>typeof fn!=='function'||!!fn(row.original),globalFilter:props.filter,
    manualPagination:remoteMode,manualSorting:remoteMode,manualFiltering:remoteMode,pageCount:remoteMode?Math.ceil((remote?.total||0)/pageSize):undefined,
    getCoreRowModel:getCoreRowModel(),getFilteredRowModel:getFilteredRowModel(),getSortedRowModel:getSortedRowModel(),
    getPaginationRowModel:mode==='pages'?getPaginationRowModel():undefined,autoResetPageIndex:false});
  const model=table.getRowModel().rows, virtualized=mode==='fill'&&!isNarrow;
  const virtual=useVirtualizer({count:model.length,getScrollElement:()=>holder.current,estimateSize:()=>metrics.row+metrics.line,
    getItemKey:i=>model[i]?.id,overscan:4,enabled:virtualized&&metrics.row>0,initialRect:{width:0,height:0}});
  const virtualItems=virtual.getVirtualItems(),first=virtualized?(virtualItems[0]?.index||0):0,last=virtualized?(virtualItems[virtualItems.length-1]?.index??Math.min(model.length,1)-1)+1:model.length;
  const shown=virtualized?model.slice(first,last):model;
  const pinnedAt=columns.findIndex(c=>c.rowLabel),frozen=new Set(columns.filter((c,i)=>c.frozen||(pinnedAt>=0&&i<=pinnedAt)).map(c=>c.field));
  const visible=table.getVisibleLeafColumns(),ordered=visible.filter(c=>frozen.has(c.id)).concat(visible.filter(c=>!frozen.has(c.id)));
  const widths=Object.fromEntries(ordered.map(column=>[column.id,column.getSize()]));
  const listable=column=>!column.rowHandle&&!kinds(column).some(kind=>['icon','actions'].includes(kind));
  const keys=keyColumns?.length?keyColumns:columns.filter(c=>!kinds(c).some(k=>['icon','actions'].includes(k))&&!c.rowHandle).slice(0,3).map(c=>c.field);
  const listed=narrow==='auto'?columns.some(listable):narrow==='list'&&columns.some(column=>listable(column)&&!keys.includes(column.field));
  live.current={props,index,data:source,fields:columns,table,selection,sorting,setSorting:changeSort,resize,move,pick,setPage,page,pageSize,setPageSize,virtual,rowElements:rowElements.current,headerElements:headerElements.current,listeners:listeners.current};

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at||!metrics.min)return;
    const ctx=at.ownerDocument.createElement('canvas').getContext('2d'),cs=getComputedStyle(at),widths={},free=[];
    columns.forEach(c=>{
      const explicit=kinds(c).includes('icon')?metrics.lead:tokenPixels(c.width,at);if(explicit){widths[c.field]=explicit;return;}
      const family=cs.getPropertyValue(kinds(c).includes('data')?'--plx-comp-data-table-data-font-family':'--plx-comp-data-table-font-family').trim()||cs.fontFamily;
      ctx.font=cs.getPropertyValue('--plx-comp-data-table-font-size').trim()+' '+family;
      let width=ctx.measureText(c.title||c.field).width;
      source.forEach(record=>{const value=valueAt(record,c.field);if(typeof value==='string'||typeof value==='number')width=Math.max(width,ctx.measureText(String(value)).width);});
      widths[c.field]=snapToGrid(Math.max(metrics.min,width+metrics.space*2),{round:'up',el:at});free.push(c.field);
    });
    const available=metrics.room-(selectable?metrics.lead:0)-(rowMenu&&rowMenuButton?metrics.menu:0)-(props.viewMenu?metrics.lead:0),used=Object.values(widths).reduce((sum,width)=>sum+width,0),step=gridStep(at);
    const units=Math.max(0,Math.floor((available-used)/step)),share=free.length?Math.floor(units/free.length):0;
    free.forEach((field,i)=>widths[field]+=(share+(i<units-share*free.length?1:0))*step);
    setAutoSizing(old=>JSON.stringify(old)===JSON.stringify(widths)?old:widths);
  },[columns,source,metrics.room,metrics.min,metrics.space,metrics.row,selectable]);

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at)return;const doc=at.ownerDocument;
    // Reuse the existing structural stylesheet; no Tabulator script or engine is loaded by the trial.
    const href=structuralStylesheet();let link=[...doc.querySelectorAll('link[rel="stylesheet"]')].find(l=>l.href===href);
    if(!link){link=doc.createElement('link');link.rel='stylesheet';link.href=href;doc.head.prepend(link);}
    let raf=0;
    const measure=()=>{raf=0;const next={row:tokenPixels('--plx-comp-data-table-record-height',at),line:tokenPixels('--plx-comp-data-table-line-width',at),lead:tokenPixels('--plx-comp-data-table-lead-column-width',at),menu:tokenPixels('--plx-comp-data-table-row-menu-width',at),min:tokenPixels('--plx-ref-size-80px',at),space:tokenPixels('--plx-comp-data-table-cell-padding-inline',at),room:at.clientWidth};
      setMetrics(old=>Object.keys(next).every(k=>next[k]===old[k])?old:next);
      const threshold=narrow==='auto'?keys.reduce((sum,field)=>sum+(live.current.table?.getColumn(field)?.getSize()||next.min),selectable?next.lead:0):tokenPixels(narrowAt,at),want=listed&&at.clientWidth>0&&at.clientWidth<threshold;setNarrow(want);
      if(!height&&mode==='fill'&&holder.current){const top=holder.current.getBoundingClientRect().top;holder.current.style.maxBlockSize=gridPx(Math.max(next.row*8,doc.defaultView.innerHeight-top),{round:'down',el:at});}
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(measure);};measure();
    const ro=new ResizeObserver(schedule);ro.observe(at);const mo=new MutationObserver(schedule);mo.observe(doc.documentElement,{attributes:true,attributeFilter:['data-plx-density','data-plx-density-policy','data-plx-interaction','data-plx-mode']});
    const region=at.closest('[data-plx-density]');if(region&&region!==doc.documentElement)mo.observe(region,{attributes:true,attributeFilter:['data-plx-density']});
    return()=>{ro.disconnect();mo.disconnect();if(raf)cancelAnimationFrame(raf);};
  },[effectiveStep,effectiveWrap,height,narrow,narrowAt,mode,columns,keys.join('|')]);
  React.useLayoutEffect(()=>{virtual.measure();},[metrics.row,metrics.line]);
  React.useEffect(()=>{if(!metrics.row||!Object.keys(autoSizing).length||ready.current)return;ready.current=true;api.options=options;onReady?.(api);emit('tableBuilt');},[metrics.row,autoSizing]);
  React.useEffect(()=>{if(!ready.current)return;writeView(storageKey,{sort:sorting.map(s=>({column:s.id,dir:s.desc?'desc':'asc'})),order:columnOrder,
    hidden:Object.keys(columnVisibility).filter(k=>columnVisibility[k]===false),widths:Object.fromEntries(Object.entries(sizing).map(([k,v])=>[k,v+'px'])),rowHeight:effectiveStep,wrapHeaders:effectiveWrap});},[storageKey,JSON.stringify(sorting),JSON.stringify(columnOrder),JSON.stringify(columnVisibility),JSON.stringify(sizing),effectiveStep,effectiveWrap,metrics.row]);
  React.useEffect(()=>{
    if(!ready.current)return;const active=new Set(table.getFilteredRowModel().rows.map(r=>r.id)),next={...selection};
    const known=new Set(source.map(record=>recordKey(record[index])));
    const hidden=Object.keys(next).filter(key=>next[key]&&known.has(key)&&!active.has(key));
    if(!keepHiddenSelection&&hidden.length){hidden.forEach(key=>delete next[key]);notifySelection(next);}
    else if(Object.keys(selection).some(key=>selection[key])){const records=source.filter(r=>selection[recordKey(r[index])]);onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:hidden.length});}
    emit('dataFiltered',filters.map(f=>({field:f.id,type:'like',value:f.value})),table.getFilteredRowModel().rows.map(r=>api.row(r.id)));
  },[props.filter,JSON.stringify(filters),source,keepHiddenSelection]);
  const previousData=React.useRef(source);
  React.useEffect(()=>{if(ready.current&&previousData.current!==source){previousData.current=source;emit('dataChanged',source);}},[source]);
  React.useEffect(()=>setPage(0),[sortSignal,props.filter]);

  React.useEffect(()=>{if(!remoteMode)return;let alive=true;const controller=new AbortController();setRemoteError(null);Promise.resolve().then(()=>props.fetchRows({page:page+1,size:pageSize,sort:sorted(sorting),filters:filters.map(f=>({field:f.id,type:'like',value:f.value})),search:props.search,signal:controller.signal})).then(result=>{if(alive)setRemote({rows:result.rows||[],total:result.total||0});},failure=>{if(alive)setRemoteError(failure);});return()=>{alive=false;controller.abort();};},[remoteMode,page,pageSize,JSON.stringify(sorting),JSON.stringify(filters),props.search,retry]);
  const displayedTotal=remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length;
  const selectionRows=table.getPrePaginationRowModel().rows,selectedVisible=selectionRows.filter(r=>selection[r.id]),allVisible=selectionRows.length>0&&selectedVisible.length===selectionRows.length;
  const selectAll=value=>{const next={...selection};selectionRows.forEach(r=>{if(value)next[r.id]=true;else delete next[r.id];});notifySelection(next);};
  const pickCheckbox=(row,event)=>{
    const wanted=event.target.checked,from=selectionRows.findIndex(r=>r.id===selectionAnchor.current),to=selectionRows.indexOf(row);
    if((event.nativeEvent?.shiftKey||event.shiftKey)&&from>=0&&to>=0){const next={...selection};selectionRows.slice(Math.min(from,to),Math.max(from,to)+1).forEach(record=>{if(wanted)next[record.id]=true;else delete next[record.id];});notifySelection(next);}
    else pick(row.id,wanted);
    selectionAnchor.current=row.id;
  };
  const fit=field=>{const c=columns.find(c=>c.field===field),ctx=document.createElement('canvas').getContext('2d'),cs=getComputedStyle(frame.current);ctx.font=cs.getPropertyValue('--plx-comp-data-table-font-size')+' '+cs.getPropertyValue('--plx-comp-data-table-font-family');const values=[c.title||field,...source.map(r=>String(valueAt(r,field)??''))];resize(field,Math.max(...values.map(v=>ctx.measureText(v).width))+metrics.space*2);};
  const menuItems=(items,row,extra)=>items.map((item,i)=>item.separator?<MenuDivider key={i}/>:<MenuItem key={i} icon={item.icon} danger={item.danger} disabled={typeof item.disabled==='function'?item.disabled(row):item.disabled} onSelect={()=>{(item.onSelect||item.action)?.(row,extra);}}>{item.label}</MenuItem>);
  const rowItems=row=>typeof rowMenu==='function'?rowMenu(row):rowMenu||[];
  const headerItems=column=>{const c=column.columnDef.meta,custom=typeof columnMenu==='function'?columnMenu(c):columnMenu||[];const direction=typeOf(c)==='number'||typeOf(c)==='currency'?['Sort 1 → 9','Sort 9 → 1']:typeOf(c)==='date'?['Sort oldest → newest','Sort newest → oldest']:['Sort A → Z','Sort Z → A'];return <>
    {menuItems(custom,c,api.column(c.field))}{custom.length?<MenuDivider/>:null}
    <MenuItem onSelect={()=>table.setSorting([{id:c.field,desc:false}])}>{direction[0]}</MenuItem><MenuItem onSelect={()=>table.setSorting([{id:c.field,desc:true}])}>{direction[1]}</MenuItem>
    <MenuItem onSelect={()=>table.setSorting([])}>{S.clearSort}</MenuItem><MenuDivider/><MenuItem onSelect={()=>setFilterField(c.field)}>Filter by this field</MenuItem><MenuItem onSelect={()=>column.setFilterValue(undefined)}>{S.clearFilter}</MenuItem><MenuDivider/>
    <MenuItem onSelect={()=>resize(c.field,stepSize(column.getSize(),-1,column.columnDef.minSize,column.columnDef.maxSize))}>{S.narrower}</MenuItem>
    <MenuItem onSelect={()=>resize(c.field,stepSize(column.getSize(),1,column.columnDef.minSize,column.columnDef.maxSize))}>{S.wider}</MenuItem>
    <MenuItem onSelect={()=>fit(c.field)}>{S.fit}</MenuItem><MenuDivider/>
    <MenuItem onSelect={()=>column.toggleVisibility(false)} disabled={frozen.has(c.field)}>{S.hide}</MenuItem><MenuItem onSelect={()=>setVisibility({})}>{S.showAll}</MenuItem>
  </>;};
  const startResize=(event,column)=>{if(event.button!==0)return;event.preventDefault();event.stopPropagation();const from=event.clientX,width=column.getSize(),doc=event.currentTarget.ownerDocument;const move=e=>resize(column.id,width+e.clientX-from);const up=()=>{doc.removeEventListener('pointermove',move);doc.removeEventListener('pointerup',up);};doc.addEventListener('pointermove',move);doc.addEventListener('pointerup',up,{once:true});};
  const headerCell=column=>{const c=column.columnDef.meta,pinned=frozen.has(c.field),offset=(selectable?metrics.lead:0)+ordered.slice(0,ordered.indexOf(column)).filter(col=>frozen.has(col.id)).reduce((sum,col)=>sum+col.getSize(),0);const node=<Width key={c.field} ref={node=>{if(node)headerElements.current.set(c.field,node);else headerElements.current.delete(c.field);}} width={widths[c.field]} frozenOffset={pinned?offset:undefined} role="columnheader" tabIndex={0} tabulator-field={c.field} aria-sort={column.getIsSorted()?(column.getIsSorted()==='desc'?'descending':'ascending'):undefined}
    className={cx('tabulator-col plx-u-relative',kinds(c).includes('icon')&&B+'__w-lead',column.getIsFiltered()&&'is-filtered',pinned&&'tabulator-frozen',c.headerHozAlign&&B+'__head-align-'+c.headerHozAlign)} data-plx-sticky={pinned&&offset?offset+'px':undefined}
    onClick={e=>{if(!e.target.closest(interactive)&&column.getCanSort())column.toggleSorting();}} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&e.target===e.currentTarget){e.preventDefault();column.toggleSorting();}}}>
    <div className="tabulator-col-content"><div className="tabulator-col-title-holder"><div className="tabulator-col-title" title={c.title}><span className={B+'__title'}><span className={B+'__type-icon'}><Icon name={typeIcons[typeOf(c)]||'ed-text'}/></span>{c.title||c.field}</span></div><div className="tabulator-col-sorter" aria-hidden="true"><div className={'tabulator-arrow'+(column.getIsSorted()==='desc'?' desc':'')}/></div></div>
    {headerMenu?<Menu className="tabulator-header-popup-button" label={c.title+' column actions'} trigger={<span role="button" tabIndex={0} className={B+'__menu-chevron'} aria-label={c.title+' column actions'}><Icon name="chevron-down"/></span>}>{headerItems(column)}</Menu>:null}
    {c.filter||filterField===c.field||column.getIsFiltered()?<span className="tabulator-header-popup-button"><Popover open={filterField===c.field} onOpenChange={open=>setFilterField(open?c.field:null)} title={S.filter+' '+c.title} size="sm" trigger={<span role="button" tabIndex={0} aria-label={S.filter+' '+c.title}><Icon name="filter"/></span>}>
      {c.filter==='list'?<Select aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} options={[{value:'',label:'Any'},...[...new Set(source.map(r=>String(valueAt(r,c.field)??'')))].filter(Boolean).map(value=>({value,label:value}))]} onChange={e=>column.setFilterValue(e.target.value||undefined)}/>:<Input aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} onChange={e=>column.setFilterValue(e.target.value)}/>}
      <Button variant="ghost" size="sm" onClick={()=>column.setFilterValue(undefined)}>{S.clearFilter}</Button>
    </Popover></span>:null}</div>
    {c.resizable!==false&&!pinned&&!kinds(c).includes('icon')?<span className="tabulator-col-resize-handle" role="separator" aria-label={'Resize '+c.title} aria-orientation="vertical" tabIndex={0} aria-valuenow={column.getSize()} aria-valuemin={column.columnDef.minSize} aria-valuemax={column.columnDef.maxSize} onPointerDown={e=>startResize(e,column)} onDoubleClick={()=>fit(c.field)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();resize(c.field,e.key==='Home'?column.columnDef.minSize:e.key==='End'?column.columnDef.maxSize:stepSize(column.getSize(),e.key==='ArrowRight'?1:-1,column.columnDef.minSize,column.columnDef.maxSize));}}}/>:null}
  </Width>;return headerMenu?<ContextMenu key={c.field} target={node} label={c.title+' column actions'}>{headerItems(column)}</ContextMenu>:node;};
  const focusCell=(rowIndex,columnIndex)=>{
    const record=model[rowIndex],column=ordered[columnIndex];if(!record||!column)return;
    if(virtualized)virtual.scrollToIndex(rowIndex,{align:'auto'});
    requestAnimationFrame(()=>requestAnimationFrame(()=>rowElements.current.get(record.id)?.querySelector('[tabulator-field="'+CSS.escape(column.id)+'"]')?.focus({preventScroll:true})));
  };
  const rowNode=row=>{const rowApi=api.row(row.id),record=row.original;let offset=selectable?metrics.lead:0;const node=<div key={row.id} ref={node=>{if(node)rowElements.current.set(row.id,node);else rowElements.current.delete(row.id);}} role="row" aria-rowindex={(mode==='pages'?page*pageSize:0)+model.indexOf(row)+2} aria-selected={selectable||options.selectableRows?!!selection[row.id]:undefined} tabIndex={on.rowClick||options.selectableRows?0:undefined}
    className={cx('tabulator-row',selection[row.id]&&'tabulator-selected')} onClick={e=>{if(e.target.closest(interactive))return;if(options.selectableRows)pick(row.id,!selection[row.id]);emit('rowClick',e,rowApi);}} onKeyDown={e=>{if(e.key==='Enter'&&e.target===e.currentTarget){e.preventDefault();emit('rowClick',e,rowApi);}if((e.key==='ArrowDown'||e.key==='ArrowUp')&&e.target===e.currentTarget){e.preventDefault();const next=model.indexOf(row)+(e.key==='ArrowDown'?1:-1);virtual.scrollToIndex(Math.max(0,next));requestAnimationFrame(()=>rowElements.current.get(model[next]?.id)?.focus());}}}>
    {selectable?<div className="tabulator-cell tabulator-row-header plx-data-table__w-lead tabulator-frozen" role="gridcell"><Check label={S.selectRow+' '+record[index]} checked={selection[row.id]} onChange={e=>pickCheckbox(row,e)}/></div>:null}
    {ordered.map(column=>{const c=column.columnDef.meta,k=kinds(c),pinned=frozen.has(c.field),sticky=offset;if(pinned)offset+=column.getSize();const cell=api.cell(row.id,c.field);const value=valueAt(record,c.field);const content=c.render?c.render(record,cell):value==null||value===''?c.empty??'':String(value);return <Width key={c.field} width={isNarrow?null:widths[c.field]} frozenOffset={pinned&&!isNarrow?sticky:undefined} role="gridcell" tabIndex={-1} tabulator-field={c.field} dir="auto" onKeyDown={event=>{
        if(event.target!==event.currentTarget)return;const index=model.indexOf(row),at=ordered.indexOf(column),keys={ArrowDown:[index+1,at],ArrowUp:[index-1,at],ArrowLeft:[index,at-1],ArrowRight:[index,at+1]};
        if(keys[event.key]){event.preventDefault();focusCell(...keys[event.key]);}
      }} data-plx-sticky={pinned&&sticky?sticky+'px':undefined}
      className={cx('tabulator-cell',k.map(kind=>B+'__cell--'+kind).join(' '),c.rowHandle&&B+'__cell--handle',pinned&&'tabulator-frozen',(c.rowLabel||columns.indexOf(c)<=pinnedAt)&&B+'__cell--row-label',k.includes('icon')&&B+'__w-lead',keys.includes(c.field)&&B+'__cell--key',keys[0]===c.field&&B+'__cell--key-first',c.hozAlign&&B+'__cell--align-'+c.hozAlign)}>{c.render?<span className={B+'__portal'}>{React.isValidElement(content)?content:<span className={B+'__value'}>{content}</span>}</span>:k.includes('icon')?<span className={B+'__header-icon'}><Icon name={c.icon||'circle-info'} label={c.title}/></span>:<span className={B+'__value'}>{content}</span>}</Width>;})}
    {props.viewMenu?<div className="tabulator-cell plx-data-table__w-view" role="gridcell"/>:null}
    {rowMenu&&rowMenuButton?<Width width={metrics.menu} className="tabulator-cell plx-data-table__cell--row-menu" role="gridcell"><Menu label={S.rowActions} trigger={<Button className={B+'__row-menu'} variant="ghost" size="xs" iconOnly icon="more" label={S.rowActions}/>}>
      {menuItems(rowItems(record),record)}</Menu></Width>:null}
  </div>;return rowMenu?<ContextMenu key={row.id} target={node} label={S.rowActions}>{menuItems(rowItems(record),record)}</ContextMenu>:node;};
  const failed=error||remoteError;
  return <div ref={frame} className={cx(B,pinnedAt>=0&&B+'--row-header',listed&&B+'--list',isNarrow&&B+'--narrow',height==='100%'&&B+'--fill',mode==='pages'&&B+'--pages',className)} data-plx-engine="next" data-plx-render={virtualized?'virtual':undefined} data-plx-row-height={!isNarrow?effectiveStep:undefined} data-plx-wrap-headers={effectiveWrap?'':undefined} data-plx-height={lengthName(height)} data-plx-fit={!height&&mode==='fill'?'':undefined}>
    {failed?<EmptyState className={B+'__error'} tone="error" title={S.failed} action={onRetry||remoteError?<Button size="sm" onClick={()=>{setRetry(n=>n+1);onRetry?.();}}>{S.retry}</Button>:null}>{String(failed===true?'':failed.message||failed)}</EmptyState>:null}
    <div className={B+'__table tabulator'} role="grid" aria-label={label} aria-rowcount={(remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length)+1} aria-colcount={ordered.length+(selectable?1:0)+(rowMenu&&rowMenuButton?1:0)+(props.viewMenu?1:0)} hidden={!!failed}>
      <div className="tabulator-header" ref={header}><div className="tabulator-header-contents"><div className="tabulator-headers" role="row">
        {selectable?<div className="tabulator-col tabulator-row-header plx-data-table__w-lead tabulator-frozen" role="columnheader"><div className="tabulator-col-content"><Check label={S.selectAll} checked={allVisible} mixed={selectedVisible.length>0&&!allVisible} onChange={e=>selectAll(e.target.checked)}/></div></div>:null}
        {ordered.map(headerCell)}{props.viewMenu?<div className="tabulator-col plx-data-table__w-view" role="columnheader"><Menu label={S.view} trigger={<Button variant="ghost" size="xs" iconOnly icon="settings-customize" label={S.view}/>}>
          {['short','medium','tall','extra-tall'].map(step=><MenuItem key={step} checked={effectiveStep===step} onSelect={()=>setRowHeight(step)}>{S[step]}</MenuItem>)}<MenuDivider/><MenuItem checked={effectiveWrap} onSelect={()=>setWrapHeaders(v=>!v)}>{S.wrapHeaders}</MenuItem></Menu></div>:null}{rowMenu&&rowMenuButton?<Width width={metrics.menu} className="tabulator-col" role="columnheader" aria-label={S.rowActions}/>:null}
      </div></div></div>
      <div ref={holder} className="tabulator-tableholder" role="rowgroup" tabIndex={0} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key==='ArrowDown'){event.preventDefault();focusCell(first,0);}}} onScroll={e=>{if(header.current)header.current.scrollLeft=e.currentTarget.scrollLeft;}}>
        <div className="tabulator-table" role="presentation"><Gap count={first}/>{shown.map(rowNode)}<Gap count={model.length-last}/></div>
        {!model.length?<div className="tabulator-placeholder"><div className="tabulator-placeholder-contents"><span className={B+'__empty'}>{empty||S.empty}</span></div></div>:null}
      </div>
    </div>
    {mode==='pages'&&!failed?<div className={B+'__footer'}><Text variant="data" className={B+'__range'}>{displayedTotal?Math.min(page*pageSize+1,displayedTotal):0}–{Math.min((page+1)*pageSize,displayedTotal)} of {displayedTotal}</Text><label className={B+'__page-size'}><span>{S.perPage}</span><Select value={String(pageSize)} options={(props.pageSizes||[25,50,100]).map(n=>({value:String(n),label:String(n)}))} onChange={e=>{setPage(0);setPageSize(+e.target.value);}}/></label><Pagination className={B+'__pages'} label={label+' pages'} page={page+1} pageCount={Math.max(1,Math.ceil(displayedTotal/pageSize))} onPageChange={n=>setPage(n-1)}/></div>:null}
    <span className="plx-sr-only" role="status" aria-live="polite">{message}</span>
  </div>;
}
export function DataTableNext(props) { return <NextEngine key={props.storageKey || ''} {...props}/>; }
DataTableNext.preload = () => Promise.resolve();

