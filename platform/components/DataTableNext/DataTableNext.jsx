/* Plenix · DataTableNext (TanStack)
   Summary: A React-owned grid beside DataTable; no existing table switches engines.
   Usage: <DataTableNext label="People" data={people} columns={columns} selectable />
   Props: label/data/columns/index, selection and view state, rowHeight/wrapHeaders, narrow layout, fill/pages/load-more,
     groupBy, tree/childrenField/treeColumn, editable columns, row menus, storageKey, fetchRows and loading/error state.
     onRowClick(record,event), onRowDoubleClick(record,event), onCellEdit(record,change) receive application records.
   Behavior: TanStack owns row models and column state; TanStack Virtual chooses the rendered window. Existing
     token-sized CSS gaps represent missing rows. Opening saved state is supplied on the very first render.
   Notes: Own Plenix markup and stylesheet use the existing table tokens. Existing applications switch only by opt-in. */
import React from 'react';
import { flushSync } from 'react-dom';
import { Scrollbars } from './scrollbars.jsx';
import { useSortable } from '../../utils/dnd.js';
import { DragHandle } from '../DragHandle/DragHandle.jsx';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getExpandedRowModel } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { isRtl } from '../../utils/direction.js';
import { formatNumber } from '../../utils/format.js';
import { cx } from '../../utils/cx.js';
import { gridPx, snapToGrid, gridStep } from '../../utils/grid.js';
import { SIZE_STEPS, stepSize, snapSize } from '../../utils/sizeSteps.js';
import { gapPieces } from '../../hooks/useVirtualizer.js';
import { tokenPixels } from './environment.js';
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
import { CellValue, byteFilter, textFilter, listFilter, valueText } from './cells.jsx';
import { recordsOf, setField, changeRecord, groupedRows, groupDisplay, groupSummary } from './records.js';

const EMPTY_ROWS=[];
const words=(template,values)=>String(template).replace(/\{(\w+)\}/g,(match,key)=>values[key]??match);
const B = 'plx-data-table', interactive = 'a,button,input,select,textarea,label,[role="button"],[contenteditable="true"]';
const defaults = { empty: 'Nothing to show', failed: 'The table could not load', retry: 'Retry', selectAll: 'Select all rows', selectRow: 'Select row',
  rowActions: 'Row actions', clearSort: 'Clear sort', hide: 'Hide field', showAll: 'Show all fields', narrower: 'Narrower', wider: 'Wider', fit: 'Fit to content',
  deleted:'Deleted', moveLeft: 'Move left', moveRight: 'Move right', perPage: 'Rows per page', view: 'View options', wrapHeaders: 'Wrap headers', rowHeight: 'Row height',
  short: 'Short', medium: 'Medium', tall: 'Tall', 'extra-tall': 'Extra tall', filter: 'Filter', clearFilter: 'Clear filter', groupBy: 'Group by this field', ungroup: 'Ungroup', loadMore:'Load more', loading:'Loading records', group:'Group by this field', filterBy:'Filter by this field', any:'Any', contains:'Contains…', moveRow:'Move row', moveUp:'Move up', moveDown:'Move down', moveTop:'Move to top', moveBottom:'Move to bottom', resize:'Resize', range:'{first}–{last} of {total}', count:'{shown} of {total}', pages:'{label} pages', loaded:'{n} more rows loaded, {shown} of {total}', noValue:'(Empty)', addTo:'Add a record to {value}', groupRow:'{value}, group, {count} {records}', record:'record', records:'records', expanded:'expanded', collapsed:'collapsed', sum:'Sum', countOf:'Count', average:'Average', min:'Min', max:'Max', sortText:['Sort A → Z','Sort Z → A'],sortNumber:['Sort 1 → 9','Sort 9 → 1'],sortDate:['Sort oldest → newest','Sort newest → oldest'],sortCheck:['Sort unchecked → checked','Sort checked → unchecked'] };
const typeIcons = { multi:'field-select', text: 'ed-text', number: 'field-number', bytes: 'attachment', currency: 'field-currency', date: 'calendar', select: 'field-select', checkbox: 'select', file: 'attachment', image: 'image-a-2', link: 'link', person: 'person', 'long-text': 'field-long-text' };
const kinds = c => [].concat(c.kind || []);
const typeOf = c => c.type || (kinds(c).includes('wrap') ? 'long-text' : c.sorter === 'number' ? 'number' : c.sorter === 'date' ? 'date' : 'text');
const sorted = s => s.map(x => ({ field: x.id, dir: x.desc ? 'desc' : 'asc' }));
const lengthName = v => { const match = /(?:--plx-ref-size-)?(\d+px)/.exec(String(v || '')); return match?.[1]; };
const compare = (a, b, id) => { const x=a.getValue(id), y=b.getValue(id); if (x == null || y == null) return x == null ? y == null ? 0 : -1 : 1; return valueText(x).localeCompare(valueText(y), undefined, { numeric: true }); };
function Gap({ count, kind='record' }) { return count > 0 ? <div className={'plx-virtual-gap plx-data-table__gap plx-data-table__gap--'+kind} aria-hidden="true">{gapPieces(count).map((n,i)=><div key={i} className="plx-virtual-gap__piece" data-plx-span={String(n)} />)}</div> : null; }
function RowGap({ rows }) { const counts=rows.reduce((all,row)=>{all[row.__group?row.__group.separated?'separated':'group':row.__gap?'band':row.__add?'add':'record']++;return all;},{record:0,group:0,separated:0,band:0,add:0});return <div aria-hidden="true">{Object.entries(counts).map(([kind,count])=><Gap key={kind} kind={kind} count={count}/>)}</div>; }
function CellEditor({ column,value,onCommit,onCancel }) { const [draft,setDraft]=React.useState(value??''),done=React.useRef(false);const finish=()=>{if(done.current)return;done.current=true;onCommit(column.editor==='number'?draft===''?null:Number(draft):draft);};return <input autoFocus className="plx-data-table__editor" aria-label={'Edit '+column.title} type={column.editor==='number'?'number':'text'} value={draft} onChange={e=>setDraft(e.target.value)} onBlur={finish} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'){done.current=true;onCancel();}else if(e.key==='Enter'){e.preventDefault();finish();}}}/>; }
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
    isStatic=false, cells='text', headerMenu=true, rowMenu, rowMenuButton=true, columnMenu, onReady, on={}, className, empty, error, onRetry } = props;
  const S={...defaults,...props.strings}, initial=React.useMemo(()=>opening(props),[storageKey]);
  const frame=React.useRef(null),holder=React.useRef(null),header=React.useRef(null), live=React.useRef({}), ready=React.useRef(false);
  const selectionAnchor=React.useRef(null),viewportId=React.useId(),displayElements=React.useRef(new Map()),parkedFocus=React.useRef(null),pendingEdit=React.useRef(null),mutations=React.useRef([]),printView=React.useRef(null);
  const deliveredReady=React.useRef(null);
  const listeners=React.useRef(new Map()),rowElements=React.useRef(new Map()),headerElements=React.useRef(new Map());
  const [localSort,setSorting]=React.useState(initial.sorting),[order,setOrder]=React.useState(initial.order),[visibility,setVisibility]=React.useState(initial.visibility);
  const sortSignal=JSON.stringify(props.sort),orderSignal=JSON.stringify(props.columnOrder),hiddenSignal=JSON.stringify(props.hiddenColumns);
  const [sortOwner,setSortOwner]=React.useState(null),[orderOwner,setOrderOwner]=React.useState(null),[hiddenOwner,setHiddenOwner]=React.useState(null);
  const [sizing,setSizing]=React.useState(()=>Object.fromEntries(Object.entries(initial.widths).map(([k,v])=>[k,parseFloat(v)])));
  const [autoSizing,setAutoSizing]=React.useState({});
  const [rowHeight,setRowHeight]=React.useState(initial.rowHeight),[wrapHeaders,setWrapHeaders]=React.useState(initial.wrapHeaders);
  const [filterField,setFilterField]=React.useState(null);
  const [edited,setEdited]=React.useState(null),[editing,setEditing]=React.useState(null),[expanded,setExpanded]=React.useState(props.treeExpanded ?? options.dataTreeStartExpanded ?? false);
  const [localGroups,setGroups]=React.useState(initial.groupBy),[groupOwner,setGroupOwner]=React.useState(null),[collapsed,setCollapsed]=React.useState(()=>new Set(initial.collapsed));
  const [loaded,setLoaded]=React.useState(props.pageSize||50),[printing,setPrinting]=React.useState(false);
  const groupSignal=JSON.stringify(props.groupBy),groupBy=groupOwner===groupSignal?localGroups:props.groupBy??localGroups;
  const childField=(props.tree ?? options.dataTree)?props.childrenField||options.dataTreeChildField||'_children':null;
  const [ownSelection,setSelection]=React.useState({}),[filters,setFilters]=React.useState([]),[page,setPage]=React.useState(0),[pageSize,setPageSize]=React.useState(props.pageSize||50);
  const fetching=React.useRef(false);
  const [remoteBusy,setRemoteBusy]=React.useState(false);
  const [remote,setRemote]=React.useState(null),[remoteError,setRemoteError]=React.useState(null),[retry,setRetry]=React.useState(0);
  const [metrics,setMetrics]=React.useState({row:0,line:0,lead:0,menu:0,min:0,space:0,room:0}),[isNarrow,setNarrow]=React.useState(false),[message,setMessage]=React.useState('');
  const effectiveStep=props.rowHeight || rowHeight, effectiveWrap=props.wrapHeaders ?? wrapHeaders;
  const selection=Array.isArray(selected)?Object.fromEntries(selected.map(k=>[recordKey(k),true])):ownSelection;
  const sorting=sortOwner===sortSignal?localSort:props.sort?.length?normalizeSort(props.sort):localSort;
  const columnOrder=orderOwner===orderSignal?order:props.columnOrder || order, columnVisibility=hiddenOwner===hiddenSignal?visibility:props.hiddenColumns?visibilityOf(props.hiddenColumns):visibility;
  const remoteMode=typeof props.fetchRows==='function'&&(mode==='pages'||mode==='load-more'),incoming=remoteMode?(remote?.rows||EMPTY_ROWS):data;
  const source=edited?.input===incoming?edited.rows:incoming,canonical=React.useMemo(()=>recordsOf(source,index,childField),[source,index,childField]);
  const recordsByKey=React.useMemo(()=>new Map(canonical.map(record=>[recordKey(record[index]),record])),[canonical,index]);
  const replaceData=rows=>new Promise(resolve=>{mutations.current.push(resolve);setEdited({input:incoming,rows:rows.slice()});});
  const changeGroups=value=>{setGroupOwner(groupSignal);setGroups(value);setCollapsed(new Set());};
  const toggleGroup=(id,open)=>setCollapsed(old=>{const next=new Set(old),expand=open??old.has(id);if(expand)next.delete(id);else next.add(id);setMessage(expand?S.expanded:S.collapsed);return next;});
  const updateRecord=(key,change)=>new Promise(resolve=>{mutations.current.push(resolve);setEdited(old=>({input:incoming,rows:changeRecord(old?.input===incoming?old.rows:source,key,change,index,childField)}));});
  const commitEdit=(key,field,value)=>{const old=canonical.find(record=>recordKey(record[index])===key),previous=valueAt(old,field);updateRecord(key,record=>setField(record,field,value));setEditing(null);pendingEdit.current={key,field};props.onCellEdit?.(setField(old,field,value),{field,value,previous,row:old});};
  const emit=(name,...args)=>{live.current.props.on?.[name]?.(...args);listeners.current.get(name)?.forEach(fn=>fn(...args));};
  const api=React.useMemo(()=>createAdapter(live),[]);
  const resize=(field,value)=>{const definition=columns.find(c=>c.field===field),at=frame.current;const min=tokenPixels(definition?.minWidth||'--plx-ref-size-80px',at),max=definition?.maxWidth?tokenPixels(definition.maxWidth,at):SIZE_STEPS[SIZE_STEPS.length-1];const width=snapToGrid(snapSize(tokenPixels(value,at),min,max),{el:at});setSizing(s=>({...s,[field]:width}));};
  const move=(field,target,after)=>{const current=live.current.table.getAllLeafColumns().map(c=>c.id).filter(id=>!id.startsWith('__')&&id!==field);const at=current.indexOf(target);current.splice(Math.max(0,at+(after?1:0)),0,field);setOrderOwner(orderSignal);setOrder(current);emit('columnMoved',api.column(field),current.map(api.column));};
  const notifySelection=next=>{
    live.current.selection=next;setSelection(next);const active=new Set(live.current.table.getFilteredRowModel().flatRows.map(r=>r.id)),records=canonical.filter(r=>next[recordKey(r[index])]);
    onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:records.filter(r=>!active.has(recordKey(r[index]))).length});
    emit('rowSelectionChanged',records,records.map(r=>api.row(recordKey(r[index]))));
  };
  const pick=(key,value)=>{const next={...live.current.selection};if(options.selectableRows===1&&value)Object.keys(next).forEach(k=>delete next[k]);if(value)next[key]=true;else delete next[key];notifySelection(next);};
  const changeSort=update=>{const next=typeof update==='function'?update(sorting):update;setSortOwner(sortSignal);setSorting(next);setPage(0);emit('dataSorted',next.map(s=>({field:s.id,dir:s.desc?'desc':'asc'})));};
  const leafDefs=React.useMemo(()=>columns.map(c=>({id:c.field,accessorFn:r=>valueAt(r,c.field),header:c.title||c.field,
    enableSorting:c.headerSort!==false,filterFn:c.type==='bytes'?byteFilter:c.filter==='list'?listFilter:textFilter,sortingFn:typeof c.sorter==='function'?(a,b,id)=>c.sorter(a.getValue(id),b.getValue(id),a.original,b.original,id,sorting.find(s=>s.id===id)?.desc?'desc':'asc'):c.sorter==='number'||c.type==='bytes'?'basic':compare,
    size:kinds(c).includes('icon')?metrics.lead:Math.max(metrics.min,tokenPixels(c.width,frame.current)||autoSizing[c.field]||metrics.min),minSize:kinds(c).includes('icon')?metrics.lead:tokenPixels(c.minWidth,frame.current)||metrics.min,
    maxSize:kinds(c).includes('icon')?metrics.lead:c.maxWidth?tokenPixels(c.maxWidth,frame.current):SIZE_STEPS[SIZE_STEPS.length-1],meta:c})),[columns,metrics.min,autoSizing,sorting]);
  const table=useReactTable({data:source,columns:leafDefs,getRowId:r=>recordKey(r[index]),getSubRows:childField?r=>r[childField]:undefined,onExpandedChange:setExpanded,filterFromLeafRows:true,
    state:{expanded:printing?true:expanded,sorting,columnOrder,columnVisibility,columnSizing:sizing,columnFilters:filters,globalFilter:props.filter,pagination:{pageIndex:page,pageSize},rowSelection:selection},
    onSortingChange:changeSort,
    onColumnVisibilityChange:update=>{setHiddenOwner(hiddenSignal);setVisibility(typeof update==='function'?update(columnVisibility):update);},onColumnOrderChange:update=>{setOrderOwner(orderSignal);setOrder(typeof update==='function'?update(columnOrder):update);},onColumnSizingChange:setSizing,onColumnFiltersChange:update=>{setFilters(update);setPage(0);},
    getColumnCanGlobalFilter:()=>true,globalFilterFn:(row,id,fn)=>typeof fn!=='function'||!!fn(row.original),globalFilter:props.filter,
    manualPagination:remoteMode,manualSorting:remoteMode,manualFiltering:remoteMode,pageCount:remoteMode?Math.ceil((remote?.total||0)/pageSize):undefined,
    getExpandedRowModel:getExpandedRowModel(),getCoreRowModel:getCoreRowModel(),getFilteredRowModel:getFilteredRowModel(),getSortedRowModel:getSortedRowModel(),
    getPaginationRowModel:mode==='pages'?getPaginationRowModel():undefined,autoResetPageIndex:false});
  const allRows=(printing?table.getPrePaginationRowModel():table.getRowModel()).rows;
  const loadedRows=React.useMemo(()=>mode==='load-more'&&!remoteMode?allRows.slice(0,loaded):allRows,[allRows,mode,remoteMode,loaded]);
  const groups=React.useMemo(()=>groupedRows(loadedRows,groupBy,columns),[loadedRows,groupBy,columns]);
  const model=React.useMemo(()=>groups.length?groupDisplay(groups,printing?new Set():collapsed,!!props.onAddToGroup):loadedRows,[groups,collapsed,loadedRows,!!props.onAddToGroup,printing]),virtualized=!isStatic&&mode!=='pages'&&!isNarrow&&!printing;
  const estimate=row=>row?.__group?metrics.group+metrics.line*(row.__group.separated?2:1):row?.__gap?metrics.groupGap:row?.__add?metrics.add+metrics.line:metrics.row+metrics.line;
  const virtual=useVirtualizer({count:model.length,getScrollElement:()=>holder.current,estimateSize:i=>estimate(model[i]),
    getItemKey:i=>model[i]?.displayKey||model[i]?.id,overscan:4,enabled:virtualized&&metrics.row>0,initialRect:{width:0,height:0},initialOffset:()=>printView.current?.top??holder.current?.scrollTop??0});
  const semanticRows=model.filter(row=>!row.__gap),semanticIndex=new Map(semanticRows.map((row,i)=>[row.displayKey||row.id,i+2]));
  const virtualItems=virtual.getVirtualItems(),first=virtualized?(virtualItems[0]?.index||0):0,last=virtualized?(virtualItems[virtualItems.length-1]?.index??Math.min(model.length,1)-1)+1:model.length;
  const shown=virtualized?model.slice(first,last):model;
  const pinnedAt=columns.findIndex(c=>c.rowLabel),frozen=new Set(columns.filter((c,i)=>c.frozen||(pinnedAt>=0&&i<=pinnedAt)).map(c=>c.field));
  const visible=table.getVisibleLeafColumns(),ordered=visible.filter(c=>frozen.has(c.id)).concat(visible.filter(c=>!frozen.has(c.id)));
  const widths=Object.fromEntries(ordered.map(column=>[column.id,column.getSize()]));
  const listable=column=>!column.rowHandle&&!kinds(column).some(kind=>['icon','actions'].includes(kind));
  const keys=keyColumns?.length?keyColumns:columns.filter(c=>!kinds(c).some(k=>['icon','actions'].includes(k))&&!c.rowHandle).slice(0,3).map(c=>c.field);
  const listed=narrow==='auto'?columns.some(listable):narrow==='list'&&columns.some(column=>listable(column)&&!keys.includes(column.field));
  const columnDnd=useSortable({items:ordered,getId:column=>column.id,getName:column=>column.columnDef.meta.title||column.id,label:label+' columns',orientation:'horizontal',disabled:!(props.movableColumns??options.movableColumns),onReorder:(next,{item})=>{setOrderOwner(orderSignal);setOrder(next.map(column=>column.id));emit('columnMoved',api.column(item.id),next.map(column=>api.column(column.id)));}});
  const rowDnd=useSortable({items:canonical,getId:record=>recordKey(record[index]),getName:record=>String(valueAt(record,columns[0]?.field)??record[index]),label:label+' rows',disabled:!(props.movableRows??options.movableRows)||!!groupBy||!!childField,onReorder:(rows,{item})=>{setEdited({input:incoming,rows});props.onRowMove?.(rows);emit('rowMoved',api.row(recordKey(item[index])));}});
  live.current={props,index,data:canonical,source,recordsByKey,replaceData,model,groups,groupBy,changeGroups,toggleGroup,collapsed,updateRecord,commitEdit,editing,setEditing,childField,expanded,setExpanded,fields:columns,table,selection,sorting,setSorting:changeSort,resize,move,pick,setPage,page,pageSize,setPageSize,virtual,rowElements:rowElements.current,headerElements:headerElements.current,listeners:listeners.current};

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at||!metrics.min)return;
    const ctx=at.ownerDocument.createElement('canvas').getContext('2d'),cs=getComputedStyle(at),widths={},free=[];
    columns.forEach(c=>{
      const explicit=kinds(c).includes('icon')?metrics.lead:tokenPixels(c.width,at);if(explicit){widths[c.field]=explicit;return;}
      if(isStatic){widths[c.field]=Math.max(metrics.min,tokenPixels(c.minWidth,at));free.push(c.field);return;}
      const family=cs.getPropertyValue(kinds(c).includes('data')?'--plx-comp-data-table-data-font-family':'--plx-comp-data-table-font-family').trim()||cs.fontFamily;
      ctx.font=cs.getPropertyValue('--plx-comp-data-table-font-size').trim()+' '+family;
      // a data column measures with the data font's word spacing (Reddit Mono fitted to DM Sans; normal for DM Sans)
      ctx.wordSpacing=kinds(c).includes('data')?(cs.getPropertyValue('--plx-sys-font-data-word-spacing').trim()||'0px'):'0px';
      let width=ctx.measureText(c.title||c.field).width;
      source.forEach(record=>{const value=valueAt(record,c.field);width=Math.max(width,ctx.measureText(valueText(value)).width);});
      widths[c.field]=snapToGrid(Math.max(metrics.min,width+metrics.space*2),{round:'up',el:at});free.push(c.field);
    });
    const available=metrics.room-(selectable?metrics.lead:0)-(rowMenu&&rowMenuButton?metrics.menu:0)-(props.viewMenu?metrics.lead:0),used=Object.values(widths).reduce((sum,width)=>sum+width,0),step=gridStep(at);
    const units=Math.max(0,Math.floor((available-used)/step)),share=free.length?Math.floor(units/free.length):0;
    free.forEach((field,i)=>widths[field]+=(share+(i<units-share*free.length?1:0))*step);
    setAutoSizing(old=>JSON.stringify(old)===JSON.stringify(widths)?old:widths);
  },[columns,source,metrics.room,metrics.min,metrics.space,metrics.row,selectable,isStatic]);

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at)return;const doc=at.ownerDocument;
    let raf=0;
    const measure=()=>{raf=0;const next={row:tokenPixels('--plx-comp-data-table-record-height',at),line:tokenPixels('--plx-comp-data-table-line-width',at),lead:tokenPixels('--plx-comp-data-table-lead-column-width',at),menu:tokenPixels('--plx-comp-data-table-row-menu-width',at),min:tokenPixels('--plx-ref-size-80px',at),space:tokenPixels('--plx-comp-data-table-cell-padding-inline',at),room:at.clientWidth,add:tokenPixels('--plx-sys-data-table-row-height',at),group:tokenPixels('--plx-comp-data-table-group-header-height',at),groupGap:tokenPixels('--plx-comp-data-table-group-gap',at)};
      setMetrics(old=>Object.keys(next).every(k=>next[k]===old[k])?old:next);
      const threshold=narrow==='auto'?keys.reduce((sum,field)=>sum+(live.current.table?.getColumn(field)?.getSize()||next.min),selectable?next.lead:0):tokenPixels(narrowAt,at),want=listed&&at.clientWidth>0&&at.clientWidth<threshold;setNarrow(want);
      if(!isStatic&&!height&&mode!=='pages'&&holder.current){const top=holder.current.getBoundingClientRect().top;holder.current.style.maxBlockSize=gridPx(Math.max(next.row*8,doc.defaultView.innerHeight-top),{round:'down',el:at});}
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(measure);};measure();
    const ro=new ResizeObserver(schedule);ro.observe(at);const mo=new MutationObserver(schedule);mo.observe(doc.documentElement,{attributes:true,attributeFilter:['data-plx-density','data-plx-density-policy','data-plx-interaction','data-plx-mode']});
    const region=at.closest('[data-plx-density]');if(region&&region!==doc.documentElement)mo.observe(region,{attributes:true,attributeFilter:['data-plx-density']});
    return()=>{ro.disconnect();mo.disconnect();if(raf)cancelAnimationFrame(raf);};
  },[effectiveStep,effectiveWrap,height,narrow,narrowAt,mode,columns,keys.join('|')]);
  React.useLayoutEffect(()=>{virtual.measure();},[metrics.row,metrics.line,metrics.group,metrics.groupGap,model.length,collapsed]);
  React.useEffect(()=>{if(!metrics.row||!Object.keys(autoSizing).length||ready.current)return;ready.current=true;api.options=options;deliveredReady.current=onReady;onReady?.(api);emit('tableBuilt');},[metrics.row,autoSizing]);
  React.useEffect(()=>{if(ready.current&&onReady!==deliveredReady.current){deliveredReady.current=onReady;onReady?.(api);}},[onReady]);
  React.useEffect(()=>{if(!ready.current)return;writeView(storageKey,{sort:sorting.map(s=>({column:s.id,dir:s.desc?'desc':'asc'})),order:columnOrder,
    hidden:Object.keys(columnVisibility).filter(k=>columnVisibility[k]===false),widths:Object.fromEntries(Object.entries(sizing).map(([k,v])=>[k,v+'px'])),rowHeight:effectiveStep,wrapHeaders:effectiveWrap,groupBy,collapsed:[...collapsed]});},[storageKey,JSON.stringify(sorting),JSON.stringify(columnOrder),JSON.stringify(columnVisibility),JSON.stringify(sizing),effectiveStep,effectiveWrap,metrics.row,groupSignal,groupBy,collapsed]);
  React.useEffect(()=>{
    if(!ready.current)return;const active=new Set(table.getFilteredRowModel().rows.map(r=>r.id)),next={...selection};
    const known=new Set(canonical.map(record=>recordKey(record[index])));
    const hidden=Object.keys(next).filter(key=>next[key]&&known.has(key)&&!active.has(key));
    if(!keepHiddenSelection&&hidden.length){hidden.forEach(key=>delete next[key]);notifySelection(next);}
    else if(Object.keys(selection).some(key=>selection[key])){const records=canonical.filter(r=>selection[recordKey(r[index])]);onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:hidden.length});}
    emit('dataFiltered',filters.map(f=>({field:f.id,type:'like',value:f.value})),table.getFilteredRowModel().rows.map(r=>api.row(r.id)));
  },[props.filter,JSON.stringify(filters),source,keepHiddenSelection]);
  const previousData=React.useRef(source);
  React.useEffect(()=>{if(ready.current&&previousData.current!==source){previousData.current=source;emit('dataChanged',source);}},[source]);
  React.useEffect(()=>{setPage(0);setLoaded(pageSize);},[sortSignal,props.filter,JSON.stringify(filters),props.search,pageSize]);
  React.useEffect(()=>{const before=()=>{const el=holder.current;printView.current=el?{top:el.scrollTop,left:el.scrollLeft,max:el.style.maxBlockSize}:null;if(el)el.style.removeProperty('max-block-size');flushSync(()=>setPrinting(true));},after=()=>{setPrinting(false);requestAnimationFrame(()=>requestAnimationFrame(()=>{const el=holder.current,saved=printView.current;if(el&&saved){if(saved.max)el.style.maxBlockSize=gridPx(parseFloat(saved.max),{el});else el.style.removeProperty('max-block-size');virtual.scrollToOffset(saved.top);el.scrollLeft=saved.left;printView.current=null;}}));};window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);return()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);};},[]);

  React.useEffect(()=>{if(!remoteMode)return;fetching.current=true;setRemoteBusy(true);let alive=true;const controller=new AbortController();setRemoteError(null);Promise.resolve().then(()=>props.fetchRows({page:page+1,size:pageSize,sort:sorted(sorting),filters:filters.map(f=>({field:f.id,type:'like',value:f.value})),search:props.search,signal:controller.signal})).then(result=>{if(alive){fetching.current=false;setRemoteBusy(false);setRemote(old=>({rows:mode==='load-more'&&page>0?[...(old?.rows||[]),...(result.rows||[])]:result.rows||[],total:result.total||0}));}},failure=>{if(alive){fetching.current=false;setRemoteBusy(false);setRemoteError(failure);}});return()=>{alive=false;controller.abort();};},[remoteMode,page,pageSize,JSON.stringify(sorting),JSON.stringify(filters),props.search,retry]);
  const displayedTotal=remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length;
  const selectionRows=table.getPrePaginationRowModel().rows,selectedVisible=selectionRows.filter(r=>selection[r.id]),allVisible=selectionRows.length>0&&selectedVisible.length===selectionRows.length;
  const selectAll=value=>{const next={...selection};selectionRows.forEach(r=>{if(value)next[r.id]=true;else delete next[r.id];});notifySelection(next);};
  const pickCheckbox=(row,event)=>{
    const wanted=event.target.checked,from=selectionRows.findIndex(r=>r.id===selectionAnchor.current),to=selectionRows.indexOf(row);
    if((event.nativeEvent?.shiftKey||event.shiftKey)&&from>=0&&to>=0){const next={...selection};selectionRows.slice(Math.min(from,to),Math.max(from,to)+1).forEach(record=>{if(wanted)next[record.id]=true;else delete next[record.id];});notifySelection(next);}
    else pick(row.id,wanted);
    selectionAnchor.current=row.id;
  };
  const fit=field=>{const c=columns.find(c=>c.field===field),ctx=document.createElement('canvas').getContext('2d'),cs=getComputedStyle(frame.current);const data=kinds(c).includes('data');ctx.font=cs.getPropertyValue('--plx-comp-data-table-font-size')+' '+cs.getPropertyValue(data?'--plx-comp-data-table-data-font-family':'--plx-comp-data-table-font-family');ctx.wordSpacing=data?(cs.getPropertyValue('--plx-sys-font-data-word-spacing').trim()||'0px'):'0px';const values=[c.title||field,...source.map(r=>valueText(valueAt(r,field)))];resize(field,Math.max(...values.map(v=>ctx.measureText(v).width))+metrics.space*2);};
  const menuItems=(items,row,extra)=>items.map((item,i)=>item.separator?<MenuDivider key={i}/>:<MenuItem key={i} icon={item.icon} danger={item.danger} disabled={typeof item.disabled==='function'?item.disabled(row):item.disabled} onSelect={()=>{(item.onSelect||item.action)?.(row,extra);}}>{item.label}</MenuItem>);
  const rowItems=row=>typeof rowMenu==='function'?rowMenu(row):rowMenu||[];
  const headerItems=column=>{const c=column.columnDef.meta,custom=typeof columnMenu==='function'?columnMenu(c):columnMenu||[];const direction=typeOf(c)==='number'||typeOf(c)==='currency'||typeOf(c)==='bytes'?S.sortNumber:typeOf(c)==='date'?S.sortDate:typeOf(c)==='checkbox'?S.sortCheck:S.sortText;return <>
    {menuItems(custom,c,api.column(c.field))}{custom.length?<MenuDivider/>:null}
    <MenuItem onSelect={()=>table.setSorting([{id:c.field,desc:false}])}>{direction[0]}</MenuItem><MenuItem onSelect={()=>table.setSorting([{id:c.field,desc:true}])}>{direction[1]}</MenuItem>
    <MenuItem onSelect={()=>table.setSorting([])}>{S.clearSort}</MenuItem><MenuDivider/><MenuItem onSelect={()=>setFilterField(c.field)}>{S.filterBy}</MenuItem><MenuItem onSelect={()=>column.setFilterValue(undefined)}>{S.clearFilter}</MenuItem><MenuDivider/>
    <MenuItem onSelect={()=>resize(c.field,stepSize(column.getSize(),-1,column.columnDef.minSize,column.columnDef.maxSize))}>{S.narrower}</MenuItem>
    <MenuItem onSelect={()=>resize(c.field,stepSize(column.getSize(),1,column.columnDef.minSize,column.columnDef.maxSize))}>{S.wider}</MenuItem>
    <MenuItem onSelect={()=>fit(c.field)}>{S.fit}</MenuItem><MenuItem disabled={frozen.has(c.field)||ordered.indexOf(column)===0} onSelect={()=>columnDnd.moveTo(ordered.indexOf(column),ordered.indexOf(column)-1)}>{S.moveLeft}</MenuItem><MenuItem disabled={frozen.has(c.field)||ordered.indexOf(column)===ordered.length-1} onSelect={()=>columnDnd.moveTo(ordered.indexOf(column),ordered.indexOf(column)+1)}>{S.moveRight}</MenuItem><MenuDivider/><MenuItem onSelect={()=>changeGroups(c.field)}>{S.group}</MenuItem><MenuItem onSelect={()=>changeGroups(false)}>{S.ungroup}</MenuItem><MenuDivider/>
    <MenuItem onSelect={()=>column.toggleVisibility(false)} disabled={frozen.has(c.field)}>{S.hide}</MenuItem><MenuItem onSelect={()=>setVisibility({})}>{S.showAll}</MenuItem>
  </>;};
  const startResize=(event,column)=>{if(event.button!==0)return;event.preventDefault();event.stopPropagation();const from=event.clientX,width=column.getSize(),doc=event.currentTarget.ownerDocument;const move=e=>resize(column.id,width+(e.clientX-from)*(isRtl(frame.current)?-1:1));const up=()=>{doc.removeEventListener('pointermove',move);doc.removeEventListener('pointerup',up);};doc.addEventListener('pointermove',move);doc.addEventListener('pointerup',up,{once:true});};
  const headerCell=column=>{const c=column.columnDef.meta,pinned=frozen.has(c.field),offset=(selectable?metrics.lead:0)+ordered.slice(0,ordered.indexOf(column)).filter(col=>frozen.has(col.id)).reduce((sum,col)=>sum+col.getSize(),0);const node=<Width key={c.field} {...columnDnd.itemProps(ordered.indexOf(column))} ref={node=>{if(node)headerElements.current.set(c.field,node);else headerElements.current.delete(c.field);}} width={widths[c.field]} frozenOffset={pinned?offset:undefined} role="columnheader" tabIndex={isStatic?undefined:0} data-plx-field={c.field} aria-sort={column.getIsSorted()?(column.getIsSorted()==='desc'?'descending':'ascending'):undefined}
    className={cx('plx-data-table__grid-col',column.getCanSort()&&B+'__grid-sortable',column.getCanSort()&&B+'__grid-col-sorter-element',kinds(c).includes('icon')&&B+'__cell--icon',kinds(c).includes('icon')&&B+'__w-lead',column.getIsFiltered()&&B+'__filtered',pinned&&'plx-data-table__grid-frozen',[].concat(groupBy||[]).includes(c.field)&&B+'__cell--grouped',(c.headerHozAlign||c.type==='bytes')&&B+'__head-align-'+(c.headerHozAlign||'right'))} data-plx-sticky={pinned&&offset?offset+'px':undefined}
    onClick={e=>{if(!e.target.closest(interactive)&&column.getCanSort())column.toggleSorting();}} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&e.target===e.currentTarget){e.preventDefault();column.toggleSorting();}}}>
    <div className="plx-data-table__grid-col-content"><div className="plx-data-table__grid-col-title-holder"><div className="plx-data-table__grid-col-title" title={c.title}>{kinds(c).includes('icon')?<span className={B+'__header-icon'}><Icon name={c.icon||'circle-info'} label={c.title}/></span>:<span className={B+'__title'}>{(props.movableColumns??options.movableColumns)?<DragHandle disabled={frozen.has(column.id)} dnd={columnDnd.handleProps(ordered.indexOf(column))}/>:null}<span className={B+'__type-icon'}><Icon name={typeIcons[typeOf(c)]||'ed-text'}/></span><span className={B+'__title-text'}>{c.title||c.field}</span></span>}</div><div className="plx-data-table__grid-col-sorter" aria-hidden="true"><div className={'plx-data-table__grid-arrow'+(column.getIsSorted()==='desc'?' plx-data-table__sort-desc':'')}/></div></div>
    {headerMenu?<Menu className="plx-data-table__grid-header-popup-button" label={c.title+' column actions'} trigger={<span role="button" tabIndex={0} className={B+'__menu-chevron'} aria-label={c.title+' column actions'}><Icon name="chevron-down"/></span>}>{headerItems(column)}</Menu>:null}
    {c.filter||filterField===c.field||column.getIsFiltered()?<span className="plx-data-table__grid-header-popup-button"><Popover open={filterField===c.field} onOpenChange={open=>setFilterField(open?c.field:null)} title={S.filter+' '+c.title} size="sm" trigger={<span role="button" tabIndex={0} aria-label={S.filter+' '+c.title}><Icon name="filter"/></span>}>
      {c.filter==='list'?<Select aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} options={[{value:'',label:S.any},...[...new Set(source.map(r=>String(valueAt(r,c.field)??'')))].filter(Boolean).map(value=>({value,label:value}))]} onChange={e=>column.setFilterValue(e.target.value||undefined)}/>:<Input aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} onChange={e=>column.setFilterValue(e.target.value)}/>}
      <Button variant="ghost" size="sm" onClick={()=>column.setFilterValue(undefined)}>{S.clearFilter}</Button>
    </Popover></span>:null}</div>
    {c.resizable!==false&&!pinned&&!kinds(c).includes('icon')?<span className="plx-data-table__grid-col-resize-handle" role="separator" aria-label={S.resize+' '+c.title} aria-orientation="vertical" tabIndex={0} aria-valuenow={column.getSize()} aria-valuemin={column.columnDef.minSize} aria-valuemax={column.columnDef.maxSize} onPointerDown={e=>startResize(e,column)} onDoubleClick={()=>fit(c.field)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();resize(c.field,e.key==='Home'?column.columnDef.minSize:e.key==='End'?column.columnDef.maxSize:stepSize(column.getSize(),e.key==='ArrowRight'?1:-1,column.columnDef.minSize,column.columnDef.maxSize));}}}/>:null}
  </Width>;return headerMenu?<ContextMenu key={c.field} target={node} label={c.title+' column actions'}>{headerItems(column)}</ContextMenu>:node;};
  const focusCell=(rowIndex,columnIndex,step=1)=>{
    while(model[rowIndex]&&!model[rowIndex].original)rowIndex+=step;
    const record=model[rowIndex],column=ordered[columnIndex];if(!record||(columnIndex!==null&&!column))return;
    if(virtualized)virtual.scrollToIndex(rowIndex,{align:'auto'});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const node=displayElements.current.get(record.displayKey||record.id);(columnIndex===null?node:node?.querySelector('[data-plx-field="'+CSS.escape(column.id)+'"]'))?.focus({preventScroll:true});}));
  };
  const groupNode=group=><div key={group.id} data-plx-group={group.id} className={cx('plx-data-table__grid-row plx-data-table__grid-group','plx-data-table__grid-group-level-'+group.depth,group.separated&&B+'__group--gap')} role="row" tabIndex={0} aria-rowindex={semanticIndex.get(group.id)} aria-label={words(S.groupRow,{value:valueText(group.value)||S.noValue,count:group.rows.length,records:group.rows.length===1?S.record:S.records})} aria-level={group.depth+1} aria-expanded={!collapsed.has(group.id)} onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(['Enter',' ','ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();toggleGroup(group.id,event.key==='ArrowRight'?true:event.key==='ArrowLeft'?false:undefined);}else if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const headers=model.filter(row=>row.__group),next=headers[headers.findIndex(row=>row.id===group.id)+(event.key==='ArrowDown'?1:-1)];if(next){virtual.scrollToIndex(model.indexOf(next),{align:'center'});requestAnimationFrame(()=>requestAnimationFrame(()=>holder.current?.querySelector('.plx-data-table__grid-group[data-plx-group="'+CSS.escape(next.id)+'"]')?.focus({preventScroll:true})));}}}}><div className={B+'__group-head'} role="presentation">{ordered.map((column,i)=><Width key={column.id} width={widths[column.id]+(i===0&&selectable?metrics.lead:0)} className={cx(B+'__group-cell',i===0&&B+'__group-cell--first',column.columnDef.meta.summary&&B+'__group-cell--summary')} role="gridcell" aria-colspan={i===0&&selectable?2:undefined}>{i===0?<div className={B+'__group-label'}><span className={B+'__group-chevron'} aria-hidden="true" onClick={()=>toggleGroup(group.id)}><Icon name={collapsed.has(group.id)?'chevron-right':'chevron-down'}/></span><div className={B+'__group-text'}><Text variant="eyebrow" className={B+'__group-eyebrow'}>{columns.find(c=>c.field===group.field)?.title||group.field}</Text><span className={B+'__group-value'} data-plx-text-follow="size" data-plx-kind={kinds(columns.find(c=>c.field===group.field)||{}).includes('data')?'data':undefined}>{valueText(group.value)||S.noValue}</span></div><span className={B+'__group-count'}>{formatNumber(group.rows.length)}</span></div>:column.columnDef.meta.summary?<span className={B+'__group-summary'}><span className={B+'__group-summary-name'}>{({sum:S.sum,count:S.countOf,average:S.average,min:S.min,max:S.max})[column.columnDef.meta.summary]}</span><span className={B+'__group-summary-value'}>{groupSummary(group,column.columnDef.meta)==null?null:formatNumber(groupSummary(group,column.columnDef.meta))}</span></span>:null}</Width>)}</div></div>;
  const rememberRow=(row,node)=>{const displayKey=row.displayKey||row.id,previous=displayElements.current.get(displayKey),active=document.activeElement;if(node){displayElements.current.set(displayKey,node);rowElements.current.set(row.id,node);if(parkedFocus.current?.key===displayKey&&active===holder.current){const saved=parkedFocus.current;parkedFocus.current=null;requestAnimationFrame(()=>{if(document.activeElement===holder.current){const cell=saved.field?node.querySelector('[data-plx-field="'+CSS.escape(saved.field)+'"]'):node;const control=saved.control>=0?cell?.querySelectorAll('input,button,a[href],select,textarea')[saved.control]:null;(control||cell||holder.current)?.focus({preventScroll:true});}});}}else{if(previous?.contains(active)){const cell=active.closest('[data-plx-field]'),controls=cell?[...cell.querySelectorAll('input,button,a[href],select,textarea')]:[];parkedFocus.current={key:displayKey,field:cell?.getAttribute('data-plx-field'),control:controls.indexOf(active)};holder.current?.focus({preventScroll:true});}displayElements.current.delete(displayKey);if(rowElements.current.get(row.id)===previous){const replacement=[...displayElements.current.values()].find(el=>el.dataset.plxRecord===row.id);if(replacement)rowElements.current.set(row.id,replacement);else rowElements.current.delete(row.id);}}};
  React.useLayoutEffect(()=>{mutations.current.splice(0).forEach(resolve=>resolve());if(pendingEdit.current){const {key,field}=pendingEdit.current;pendingEdit.current=null;emit('cellEdited',api.cell(key,field));}},[source]);
  const rowNode=row=>{if(row.__group)return groupNode(row.__group);if(row.__add)return <div key={row.id} className={B+'__add-row'} role="row" aria-rowindex={semanticIndex.get(row.id)}><div role="gridcell" aria-colspan={ordered.length+(selectable?1:0)} className={B+'__group-cell '+B+'__group-cell--first'}><Button variant="ghost" size="xs" iconOnly icon="add" label={words(S.addTo,{value:valueText(row.__add.value)||S.noValue})} onClick={()=>props.onAddToGroup(row.__add.value,row.__add.path)}/></div></div>;if(row.__gap)return <div key={row.id} className={B+'__group--gap'}><div className={B+'__group-band'}/></div>;const rowApi=api.row(row.id),record=row.original;let offset=selectable?metrics.lead:0;const node=<div key={row.displayKey||row.id} {...(canonical.indexOf(record)<0?null:rowDnd.itemProps(canonical.indexOf(record)))} data-plx-record={row.id} ref={node=>rememberRow(row,node)} role="row" aria-rowindex={(mode==='pages'?page*pageSize:0)+(semanticIndex.get(row.displayKey||row.id)||2)} aria-selected={selectable||options.selectableRows?!!selection[row.id]:undefined} tabIndex={props.onRowClick||on.rowClick||options.selectableRows?0:undefined} aria-level={childField?row.depth+1:undefined} aria-expanded={row.getCanExpand?.()?row.getIsExpanded():undefined}
    className={cx('plx-data-table__grid-row',(selectable||options.selectableRows||props.onRowClick||on.rowClick)&&B+'__grid-selectable',childField&&'plx-data-table__grid-tree-level-'+Math.min(12,row.depth),selection[row.id]&&'plx-data-table__grid-selected')} onClick={e=>{if(e.target.closest(interactive))return;if(options.selectableRows)pick(row.id,!selection[row.id]);emit('rowClick',e,rowApi);props.onRowClick?.(record,e);}} onDoubleClick={e=>{if(!e.target.closest(interactive)){props.onRowDoubleClick?.(record,e);emit('rowDblClick',e,rowApi);}}} onKeyDown={e=>{if(e.key==='Enter'&&!e.defaultPrevented&&(e.target===e.currentTarget||e.target.getAttribute('role')==='gridcell')){e.preventDefault();if(options.selectableRows)pick(row.id,!selection[row.id]);emit('rowClick',e,rowApi);props.onRowClick?.(record,e);}if((e.key==='ArrowDown'||e.key==='ArrowUp')&&e.target===e.currentTarget){e.preventDefault();const step=e.key==='ArrowDown'?1:-1;focusCell(model.indexOf(row)+step,null,step);}}}>
    {selectable?<div className="plx-data-table__grid-cell plx-data-table__grid-row-header plx-data-table__w-lead plx-data-table__grid-frozen" role="gridcell"><Check label={S.selectRow+' '+record[index]} checked={selection[row.id]} onChange={e=>pickCheckbox(row,e)}/></div>:null}
    {ordered.map(column=>{const c=column.columnDef.meta,k=kinds(c),pinned=frozen.has(c.field),sticky=offset;if(pinned)offset+=column.getSize();const cell=api.cell(row.id,c.field),canEdit=!!c.editor&&(typeof c.editable==='function'?c.editable(cell):c.editable!==false);const value=valueAt(record,c.field);const content=c.render?c.render(record,cell):value==null||value===''?c.empty??'':String(value);return <Width key={c.field} width={isNarrow?null:widths[c.field]} frozenOffset={pinned&&!isNarrow?sticky:undefined} role={isStatic?c.rowLabel?'rowheader':'cell':'gridcell'} tabIndex={isStatic?undefined:-1} data-plx-field={c.field} dir="auto" onDoubleClick={()=>{if(canEdit)setEditing({key:row.id,field:c.field,value});}} onKeyDown={event=>{
        if(isStatic||event.target!==event.currentTarget)return;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='c'){if(document.getSelection()?.toString())return;event.preventDefault();navigator.clipboard.writeText(valueText(value));return;}if(event.key==='Enter'&&canEdit){event.preventDefault();setEditing({key:row.id,field:c.field,value});return;}const index=model.indexOf(row),at=ordered.indexOf(column),keys={ArrowDown:[index+1,at],ArrowUp:[index-1,at],ArrowLeft:[index,at+(isRtl(frame.current)?1:-1)],ArrowRight:[index,at+(isRtl(frame.current)?-1:1)]};
        if(keys[event.key]){event.preventDefault();focusCell(...keys[event.key],event.key==='ArrowUp'?-1:1);}
      }} data-plx-sticky={pinned&&sticky?sticky+'px':undefined}
      data-plx-text-follow={(c.rowLabel||columns.indexOf(c)<=pinnedAt)?'size family weight':'size family'} className={cx('plx-data-table__grid-cell',editing?.key===row.id&&editing.field===c.field&&'plx-data-table__grid-editing',k.map(kind=>B+'__cell--'+kind).join(' '),[].concat(groupBy||[]).includes(c.field)&&B+'__cell--grouped',c.type==='bytes'&&B+'__cell--data',c.rowHandle&&B+'__cell--handle',childField&&c.field===(props.treeColumn||options.dataTreeElementColumn||columns[0]?.field)&&B+'__tree-cell',pinned&&'plx-data-table__grid-frozen',(c.rowLabel||columns.indexOf(c)<=pinnedAt)&&B+'__cell--row-label',k.includes('icon')&&B+'__w-lead',keys.includes(c.field)&&B+'__cell--key',keys[0]===c.field&&B+'__cell--key-first',(c.hozAlign||c.type==='bytes')&&B+'__cell--align-'+(c.hozAlign||'right'))}>{childField&&c.field===(props.treeColumn||options.dataTreeElementColumn||columns[0]?.field)?<span className={B+'__tree-level'} data-plx-depth={0}>{row.getCanExpand()?<button type="button" className={B+'__grid-data-tree-control'} aria-expanded={row.getIsExpanded()} aria-label={row.getIsExpanded()?'Collapse row':'Expand row'} onClick={()=>row.toggleExpanded()}><span className={B+'__grid-data-tree-control-'+(row.getIsExpanded()?'collapse':'expand')}/></button>:null}</span>:null}{editing?.key===row.id&&editing.field===c.field?<CellEditor column={c} value={value} onCommit={next=>commitEdit(row.id,c.field,next)} onCancel={()=>setEditing(null)}/>:c.rowHandle&&canonical.indexOf(record)>=0?<Menu label={S.moveRow} trigger={<DragHandle dnd={rowDnd.handleProps(canonical.indexOf(record))}/>}><MenuItem disabled={!rowDnd.canMove(canonical.indexOf(record),-1)} onSelect={()=>rowDnd.moveTo(canonical.indexOf(record),canonical.indexOf(record)-1)}>{S.moveUp}</MenuItem><MenuItem disabled={!rowDnd.canMove(canonical.indexOf(record),1)} onSelect={()=>rowDnd.moveTo(canonical.indexOf(record),canonical.indexOf(record)+1)}>{S.moveDown}</MenuItem><MenuItem onSelect={()=>rowDnd.moveTo(canonical.indexOf(record),0)}>{S.moveTop}</MenuItem><MenuItem onSelect={()=>rowDnd.moveTo(canonical.indexOf(record),canonical.length-1)}>{S.moveBottom}</MenuItem></Menu>:c.render?<span className={B+'__portal'} data-plx-link-target="cell">{React.isValidElement(content)?content:<span className={B+'__value'}>{content}</span>}</span>:<CellValue column={c} value={value} strings={S} record={record} pill={cells==='pill'} icon={typeIcons[typeOf(c)]}/>}</Width>;})}
    {props.viewMenu?<div className="plx-data-table__grid-cell plx-data-table__w-view" role="gridcell"/>:null}
    {rowMenu&&rowMenuButton?<Width width={metrics.menu} className="plx-data-table__grid-cell plx-data-table__cell--row-menu" role="gridcell"><Menu label={S.rowActions} trigger={<Button className={B+'__row-menu'} variant="ghost" size="xs" iconOnly icon="more" label={S.rowActions}/>}>
      {menuItems(rowItems(record),record,rowApi)}</Menu></Width>:null}
  </div>;return rowMenu?<ContextMenu key={row.displayKey||row.id} target={node} label={S.rowActions}>{menuItems(rowItems(record),record,rowApi)}</ContextMenu>:node;};
  const priorGroups=model.slice(0,first).filter(row=>row.__group).map(row=>row.__group),currentGroup=model[first]?.__group||priorGroups[priorGroups.length-1];
  const stickyGroups=currentGroup?priorGroups.filter((group,i)=>group.path.every((part,depth)=>JSON.stringify(part)===JSON.stringify(currentGroup.path[depth]))&&!priorGroups.slice(i+1).some(next=>next.depth===group.depth)):[];
  const failed=error||remoteError;
  return <div ref={frame} className={cx(B,pinnedAt>=0&&B+'--row-header',listed&&B+'--list',isNarrow&&B+'--narrow',isStatic&&B+'--static',height==='100%'&&B+'--fill',mode==='pages'&&B+'--pages',mode==='load-more'&&B+'--load-more',className)} data-plx-engine="next" data-plx-render={virtualized?'virtual':undefined} data-plx-row-height={!isStatic&&!isNarrow?effectiveStep:undefined} data-plx-wrap-headers={effectiveWrap?'':undefined} data-plx-height={lengthName(height)} data-plx-fit={!isStatic&&!height&&mode!=='pages'?'':undefined}>
    {failed?<EmptyState className={B+'__error'} tone="error" title={S.failed} action={onRetry||remoteError?<Button size="sm" onClick={()=>{setRetry(n=>n+1);onRetry?.();}}>{S.retry}</Button>:null}>{String(failed===true?'':failed.message||failed)}</EmptyState>:null}
    <div className={B+'__table plx-data-table__grid'} role={isStatic?'table':groups.length||childField?'treegrid':'grid'} aria-label={label} aria-busy={remoteMode&&remoteBusy?true:undefined} aria-rowcount={groups.length||childField?semanticRows.length+1:(remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length)+1} aria-colcount={ordered.length+(selectable?1:0)+(rowMenu&&rowMenuButton?1:0)+(props.viewMenu?1:0)} hidden={!!failed}>
      <div className="plx-data-table__grid-header" ref={header} hidden={isStatic&&props.headerVisible===false}><div className="plx-data-table__grid-header-contents"><div {...columnDnd.listProps} className="plx-data-table__grid-headers" role="row">
        {selectable?<div className="plx-data-table__grid-col plx-data-table__grid-row-header plx-data-table__w-lead plx-data-table__grid-frozen" role="columnheader"><div className="plx-data-table__grid-col-content"><Check label={S.selectAll} checked={allVisible} mixed={selectedVisible.length>0&&!allVisible} onChange={e=>selectAll(e.target.checked)}/></div></div>:null}
        {ordered.map(headerCell)}{props.viewMenu?<div className="plx-data-table__grid-col plx-data-table__w-view" role="columnheader"><Menu label={S.view} trigger={<Button variant="ghost" size="xs" iconOnly icon="settings-customize" label={S.view}/>}>
          {['short','medium','tall','extra-tall'].map(step=><MenuItem key={step} checked={effectiveStep===step} onSelect={()=>setRowHeight(step)}>{S[step]}</MenuItem>)}<MenuDivider/><MenuItem checked={effectiveWrap} onSelect={()=>setWrapHeaders(v=>!v)}>{S.wrapHeaders}</MenuItem></Menu></div>:null}{rowMenu&&rowMenuButton?<Width width={metrics.menu} className="plx-data-table__grid-col" role="columnheader" aria-label={S.rowActions}/>:null}
      </div></div></div>
      <div id={viewportId} ref={holder} className="plx-data-table__grid-tableholder" role="rowgroup" tabIndex={isStatic?undefined:0} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key==='ArrowDown'){event.preventDefault();focusCell(first,0);}}} onScroll={e=>{if(header.current)header.current.scrollLeft=e.currentTarget.scrollLeft;if(mode==='load-more'&&e.currentTarget.scrollHeight-e.currentTarget.scrollTop-e.currentTarget.clientHeight<tokenPixels('--plx-ref-size-200px',frame.current)){if(remoteMode&&!fetching.current&&source.length<(remote?.total||0)){fetching.current=true;setPage(n=>n+1);}else if(!remoteMode)setLoaded(n=>Math.min(allRows.length,n+pageSize));}}}>
        <div {...rowDnd.listProps} className="plx-data-table__grid-table" role="presentation">{stickyGroups.length?<div className={B+'__sticky-groups'} aria-hidden="true" inert="">{stickyGroups.map(group=>React.cloneElement(groupNode(group),{key:'sticky:'+group.id,className:B+'__sticky-group plx-data-table__grid-group-level-'+group.depth,role:undefined,tabIndex:-1,'aria-expanded':undefined,'aria-rowindex':undefined,'aria-level':undefined,onKeyDown:undefined}))}</div>:null}<RowGap rows={model.slice(0,first)}/>{shown.map(rowNode)}<RowGap rows={model.slice(last)}/></div>
        {!model.length?<div className="plx-data-table__grid-placeholder"><div className="plx-data-table__grid-placeholder-contents"><span className={B+'__empty'}>{remoteMode&&remoteBusy?S.loading:empty||S.empty}</span></div></div>:null}
      </div>
    </div>
    {!isStatic?<Scrollbars holder={holder} viewportId={viewportId}/>:null}
    {mode==='pages'&&!failed?<div className={B+'__footer'}><Text variant="data" className={B+'__range'}>{words(S.range,{first:displayedTotal?Math.min(page*pageSize+1,displayedTotal):0,last:Math.min((page+1)*pageSize,displayedTotal),total:displayedTotal})}</Text><label className={B+'__page-size'}><span>{S.perPage}</span><Select value={String(pageSize)} options={(props.pageSizes||[25,50,100]).map(n=>({value:String(n),label:String(n)}))} onChange={e=>{setPage(0);setPageSize(+e.target.value);}}/></label><Pagination className={B+'__pages'} label={words(S.pages,{label})} page={page+1} pageCount={Math.max(1,Math.ceil(displayedTotal/pageSize))} onPageChange={n=>setPage(n-1)}/></div>:null}
    {mode==='load-more'&&!failed?<div className={B+'__footer'}><Text variant="data" className={B+'__range'}>{words(S.count,{shown:Math.min(loadedRows.length,displayedTotal),total:displayedTotal})}</Text>{loadedRows.length<displayedTotal?<Button size="sm" loading={remoteMode&&remoteBusy} className={B+'__more'} onClick={()=>{if(remoteMode){if(!fetching.current){fetching.current=true;setPage(n=>n+1);}}else setLoaded(n=>Math.min(allRows.length,n+pageSize));}}>{S.loadMore}</Button>:null}</div>:null}
    <span className="plx-sr-only" role="status" aria-live="polite">{message}</span>
  </div>;
}
export function DataTableNext(props) { return <NextEngine key={props.storageKey || ''} {...props}/>; }
DataTableNext.preload = () => Promise.resolve();

