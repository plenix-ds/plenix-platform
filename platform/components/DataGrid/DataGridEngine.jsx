/* Plenix · DataGridEngine (TanStack)
   Summary: The React-owned renderer behind the public DataGrid and static Table.
   Usage: <DataGridEngine label="People" data={people} columns={columns} selectable />
   Props: label/data/columns/index, selection and view state, rowHeight/wrapHeaders, narrow layout, fill/pages/load-more,
     groupBy, tree/childrenField/treeColumn, editable columns, row menus, storageKey, fetchRows and loading/error state.
     onRowClick(record,event), onRowDoubleClick(record,event), onCellEdit(record,change) receive application records.
   Behavior: TanStack owns row models and column state; TanStack Virtual chooses the rendered window. Existing
     token-sized CSS gaps represent missing rows. An automatic viewport is bounded by its allocated pane as well as the browser. Opening saved state is supplied on the very first render. Search filtering is deferred so typing stays responsive;
     controlled sort state and the numeric text collator are reused across search updates.
   Notes: Own Plenix markup and stylesheet use the existing table tokens. Applications use the public DataGrid entry point.
     A part takes the grid's modes and its row's state as its own classes (zero overlap, data-grid.css): a record row
     __grid-row--narrow (the list) and --virtual (the drawn window); every cell of it __grid-cell--narrow, --sized (a row
     height step) and --lines (a step taller than short), the first after the checkbox --after-lead, a plain value
     directly inside --bare, a nested row's tree cell __tree-cell--level-N; a value __value--wrap, --sized and --lines;
     row actions sit in __portal--actions; the checkbox input is __check-input. The grid, the scroll body and the table
     take the fill and the drawn window as __grid--fill, __grid-tableholder--fill, __grid-table--virtual and --narrow.
     A group's head is __group-head--gap after a band (not in its sticky copy), its label __group-label--level-N, its
     cells --narrow in the list, the add row's cell __group-cell--add; the eyebrow is the grid's own span. A custom cell's
     own element takes __cell-content (a link alone in a cell fills it); a data cell (kind data, type bytes) is
     __grid-cell--data, the data role in Mono. Table (isStatic) marks its parts --static: the root, grid, header, headers, columns, their
     contents and titles, the body, the table, rows, cells, values and the placeholder. */
import React from 'react';
import { useUnread } from './unread.js';
import { GridPane } from './room.js';
import { flushSync } from 'react-dom';
import { Scrollbars } from './scrollbars.jsx';
import { useSortable } from '../../utils/dnd.js';
import { DragHandle } from '../DragHandle/DragHandle.jsx';
import { useReactTable, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getPaginationRowModel, getExpandedRowModel, getFacetedUniqueValues, getGroupedRowModel, aggregationFns } from '@tanstack/react-table';
import { Virtualizer, elementScroll, observeElementOffset, observeElementRect } from '@tanstack/react-virtual';
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
import { ManageColumnsDialog } from '../../patterns/ColumnsMenu/ColumnsMenu.jsx';
import { Text } from '../Text/Text.jsx';

// a pill's text measured as the page draws it: a hidden probe pill (md, data or not) inside the grid gives its font, size,
// weight and word spacing, and the ratio between the page's width of a sample and the canvas's (the mono font's
// size-adjust and fitted spaces are not the canvas's); the canvas is left set to that font
const PROBE='0123456789 ABCDEFGHIJ abcdefghij';
function pillFont(at, ctx, data) {
  const doc=at.ownerDocument,box=doc.createElement('span'),pill=doc.createElement('span'),value=doc.createElement('span');
  box.className='plx-visually-hidden';pill.className='plx-data-pill plx-data-pill--md'+(data?' plx-data-pill--data':'');value.className='plx-data-pill__value';
  value.textContent=PROBE;pill.appendChild(value);box.appendChild(pill);
  (at.querySelector('.plx-data-grid__grid-row .plx-data-grid__grid-cell')||at).appendChild(box);   // in a body cell: the cell's own text size
  const cs=getComputedStyle(value),page=value.scrollWidth;
  ctx.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily;ctx.wordSpacing=cs.wordSpacing||'0px';
  const canvas=ctx.measureText(PROBE).width;box.remove();
  return { scale:canvas?page/canvas:1, font:ctx.font, wordSpacing:ctx.wordSpacing };
}
// uniformPillWidths: the widths live in one constructed sheet per document, one entry per grid
function pillSheet(doc) {
  if (doc.__plxPillWidths) return doc.__plxPillWidths;
  const sheet = new doc.defaultView.CSSStyleSheet(), rules = new Map();
  doc.adoptedStyleSheets = [...doc.adoptedStyleSheets, sheet];
  return (doc.__plxPillWidths = { rules, flush: () => sheet.replaceSync([...rules.values()].join('\n')) });
}
import { Input, Select } from '../Input/Input.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { EmptyState } from '../EmptyState/EmptyState.jsx';
import { opening, writeView, recordKey, normalizeSort, visibilityOf, valueAt } from './state.js';
import { createAdapter } from './adapter.js';
import { CellValue, byteFilter, textFilter, listFilter, valueText } from './cells.jsx';
import { recordsOf, setField, changeRecord, groupDisplay, groupValue, valueKey } from './records.js';

// Frozen cells inherit the grid direction for logical sticky placement; their values retain automatic bidi.
const cellDirection=(enabled,content)=>enabled?<span className={GRID+'__cell-direction'} dir="auto">{content}</span>:content;
const EMPTY_ROWS=[];
const words=(template,values)=>String(template).replace(/\{(\w+)\}/g,(match,key)=>values[key]??match);
const GRID = 'plx-data-grid', interactive = 'a,button,input,select,textarea,label,[role="button"],[contenteditable="true"],[data-plx-no-row-click]';
const defaults = { empty: 'Nothing to show', failed: 'The table could not load', retry: 'Retry', selectAll: 'Select all rows', selectRow: 'Select row',
  rowActions: 'Row actions', clearSort: 'Clear sort', hide: 'Hide field', showAll: 'Show all fields', narrower: 'Narrower', wider: 'Wider', fit: 'Fit to content',
  deleted:'Deleted', moveLeft: 'Move left', moveRight: 'Move right', perPage: 'Rows per page', view: 'View options', wrapHeaders: 'Wrap headers', rowHeight: 'Row height',
  short: 'Short', medium: 'Medium', tall: 'Tall', 'extra-tall': 'Extra tall', filter: 'Filter', clearFilter: 'Clear filter', groupBy: 'Group by this field', ungroup: 'Ungroup', noGroup: 'Don’t group by this field', sizeToFit: 'Size column to fit', sizeAllToFit: 'Size all columns to fit', moreColumns: 'More…', columns: 'Columns', loadMore:'Load more', loading:'Loading records', group:'Group by this field', filterBy:'Filter by this field', any:'Any', contains:'Contains…', moveRow:'Move row', moveUp:'Move up', moveDown:'Move down', moveTop:'Move to top', moveBottom:'Move to bottom', resize:'Resize', range:'{first}–{last} of {total}', count:'{shown} of {total}', pages:'{label} pages', loaded:'{n} more rows loaded, {shown} of {total}', noValue:'(Empty)', addTo:'Add a record to {value}', groupRow:'{value}, group, {count} {records}', record:'record', records:'records', expanded:'expanded', collapsed:'collapsed', sum:'Sum', countOf:'Count', average:'Average', min:'Min', max:'Max', sortText:['Sort A → Z','Sort Z → A'],sortNumber:['Sort 1 → 9','Sort 9 → 1'],sortDate:['Sort oldest → newest','Sort newest → oldest'],sortCheck:['Sort unchecked → checked','Sort checked → unchecked'] };
const typeIcons = { multi:'field-select', text: 'ed-text', number: 'field-number', bytes: 'attachment', currency: 'field-currency', date: 'calendar', select: 'field-select', checkbox: 'select', file: 'attachment', image: 'image-a-2', link: 'link', person: 'person', 'long-text': 'field-long-text' };
const kinds = c => [].concat(c.kind || []);
const typeOf = c => c.type || (kinds(c).includes('wrap') ? 'long-text' : c.sorter === 'number' ? 'number' : c.sorter === 'date' ? 'date' : 'text');
const sorted = s => s.map(x => ({ field: x.id, dir: x.desc ? 'desc' : 'asc' }));
const lengthName = v => { const match = /(?:--plx-ref-size-)?(\d+px)/.exec(String(v || '')); return match?.[1]; };
const sortCollator = new Intl.Collator(undefined, { numeric: true });
const compare = (a, b, id) => { const x=a.getValue(id), y=b.getValue(id); if (x == null || y == null) return x == null ? y == null ? 0 : -1 : 1; return sortCollator.compare(valueText(x),valueText(y)); };
// TanStack Virtual, unmodified, driven like its React adapter but redrawing only when the window of rows changes: the
// rows sit between gaps (no position per row), so a scroll inside the same window needs no render at all
function useVirtualizer(options) {
  const rerender = React.useReducer((x) => x + 1, 0)[1], shownRange = React.useRef('');
  const resolved = { observeElementRect, observeElementOffset, scrollToFn: elementScroll, ...options, onChange: (instance, sync) => {
    const r = instance.range, key = r ? r.startIndex + ':' + r.endIndex : '';
    if (key === shownRange.current) return;
    shownRange.current = key;
    if (sync) flushSync(rerender); else rerender();
  } };
  const [instance] = React.useState(() => new Virtualizer(resolved));
  instance.setOptions(resolved);
  React.useLayoutEffect(() => instance._didMount(), []);
  React.useLayoutEffect(() => instance._willUpdate());
  return instance;
}
function Gap({ count, kind='record' }) { return count > 0 ? <div className={'plx-data-grid__gap plx-data-grid__gap--'+kind} aria-hidden="true">{gapPieces(count).map((n,i)=><div key={i} className="plx-virtual-gap__piece" data-plx-span={String(n)} />)}</div> : null; }
function RowGap({ rows }) { const counts=rows.reduce((all,row)=>{all[row.__group?row.__group.separated?'separated':'group':row.__gap?'band':row.__add?'add':'record']++;return all;},{record:0,group:0,separated:0,band:0,add:0});return <div aria-hidden="true">{Object.entries(counts).map(([kind,count])=><Gap key={kind} kind={kind} count={count}/>)}</div>; }
function CellEditor({ column,value,onCommit,onCancel }) { const [draft,setDraft]=React.useState(value??''),done=React.useRef(false);const finish=()=>{if(done.current)return;done.current=true;onCommit(column.editor==='number'?draft===''?null:Number(draft):draft);};return <input autoFocus className="plx-data-grid__editor" aria-label={'Edit '+column.title} type={column.editor==='number'?'number':'text'} value={draft} onChange={e=>setDraft(e.target.value)} onBlur={finish} onKeyDown={e=>{e.stopPropagation();if(e.key==='Escape'){done.current=true;onCancel();}else if(e.key==='Enter'){e.preventDefault();finish();}}}/>; }
function Check({ checked, mixed, label, onChange }) { const ref=React.useRef(null); React.useLayoutEffect(()=>{if(ref.current)ref.current.indeterminate=!!mixed;},[mixed]); return <label className={GRID+'__check'} onClick={e=>e.stopPropagation()}><input ref={ref} className={GRID+'__check-input'} type="checkbox" checked={!!checked} aria-label={label} onChange={onChange} onClick={e=>e.stopPropagation()}/></label>; }
const WidthPixels=React.createContext(null);
// Calculate token widths during React's read-only render, then let React batch all style writes at commit.
// Reading the grid in a separate layout effect for every new cell alternates reads and writes and forces layout.
const Width = React.forwardRef(function Width({ as: Element='div', width, frozenOffset, children, onAttach, ...props }, forwarded) {
  const ref=React.useRef(null),pixels=React.useContext(WidthPixels),length=value=>pixels?pixels(value):gridPx(value,{el:ref.current||document.documentElement}),style=width==null?undefined:{width:length(width),...(frozenOffset==null?{}:{insetInlineStart:length(frozenOffset)})};
  return <Element {...props} style={style} ref={node=>{ref.current=node;onAttach?.(node);if(typeof forwarded==='function')forwarded(node);else if(forwarded)forwarded.current=node;}}>{children}</Element>;
});

// Compatibility cell adapters read through a live ref; retain custom output until its record, column or row state changes.
function RowMenuContent({build,items,record,rowApi}){return build(typeof items==='function'?items(record):items||[],record,rowApi);}
// a custom cell's own elements (each element of a fragment too) take __cell-content: the grid's class on what it places in the cell
const ownContent=(node,block)=>!React.isValidElement(node)?node:node.type===React.Fragment?React.cloneElement(node,{},React.Children.map(node.props.children,child=>ownContent(child,block))):React.cloneElement(node,{className:cx(node.props.className,block+'__cell-content')});
const CustomCell=React.memo(function CustomCell({column,record,cell,block,mods}){const content=column.render(record,cell);return React.isValidElement(content)?ownContent(content,block):<span className={cx(block+'__value',mods)}>{content}</span>;},(a,b)=>a.column===b.column&&a.record===b.record&&a.rowId===b.rowId&&a.selected===b.selected&&a.block===b.block&&a.mods===b.mods);
// Window-only updates reuse complete record rows; view, selection and edit changes invalidate their closures.
const MemoGridRow=React.memo(function MemoGridRow({row,render}){return render(row);},(a,b)=>a.row===b.row&&a.version===b.version&&a.selected===b.selected);
const RowTarget=React.forwardRef(function RowTarget({onAttach,...props},forwarded){return <div {...props} ref={node=>{onAttach?.(node);if(typeof forwarded==='function')forwarded(node);else if(forwarded)forwarded.current=node;}}/>;});
function NextEngine(props) {
  const inPane=React.useContext(GridPane);
  const { label, data=EMPTY_ROWS, columns, index='id', selectable=false, selected, keepHiddenSelection=true, onSelectionChange,
    options={}, mode='fill', height, narrow:requestedNarrow, narrowAt='--plx-ref-size-600px', keyColumns, storageKey,
    isStatic=false, cells='text', headerMenu=true, typeIcons:typeIconsProp, density='compact', uniformPillWidths=false, rowMenu: suppliedRowMenu, rowMenuButton=true, columnMenu, onReady, on={}, className, empty, error, onRetry } = props;
  const showTypes=typeIconsProp??!isStatic;   // the column type icons: a DataGrid's sort and filter cue, not a static Table's
  const narrow=requestedNarrow===undefined?(inPane&&!isStatic?'table':'list'):requestedNarrow;
  const B = isStatic ? 'plx-table' : GRID;   // Table (static) and DataGrid: each its own block (owner, 2026-10-19)
  const S={...defaults,...props.strings}, initial=React.useMemo(()=>opening(props),[storageKey]);
  const frame=React.useRef(null),holder=React.useRef(null),header=React.useRef(null), live=React.useRef({}), ready=React.useRef(false);
  const warnedActions=React.useRef(new Set()),selectionInfo=React.useRef({hidden:0}),selectionAnchor=React.useRef(null),viewportId=React.useId(),displayElements=React.useRef(new Map()),parkedFocus=React.useRef(null),pendingEdit=React.useRef(null),mutations=React.useRef([]),printView=React.useRef(null);
  const deliveredReady=React.useRef(null);
  const listeners=React.useRef(new Map()),rowElements=React.useRef(new Map()),headerElements=React.useRef(new Map());
  const [localSort,setSorting]=React.useState(initial.sorting),[order,setOrder]=React.useState(initial.order),[visibility,setVisibility]=React.useState(initial.visibility);
  const sortSignal=JSON.stringify(props.sort),orderSignal=JSON.stringify(props.columnOrder),hiddenSignal=JSON.stringify(props.hiddenColumns);
  const [sortOwner,setSortOwner]=React.useState(null),[orderOwner,setOrderOwner]=React.useState(null),[hiddenOwner,setHiddenOwner]=React.useState(null);
  const [sizing,setSizing]=React.useState(()=>Object.fromEntries(Object.entries(initial.widths).map(([k,v])=>[k,parseFloat(v)])));
  const [autoSizing,setAutoSizing]=React.useState({}),[floors,setFloors]=React.useState({});
  const widthsSignal=JSON.stringify(props.columnWidths||{});
  React.useEffect(()=>{if(!props.onViewChange)return;const known=new Set(columns.map(column=>column.field)),next=Object.fromEntries(Object.entries(props.columnWidths||{}).filter(([field,value])=>known.has(field)&&Number.isFinite(parseFloat(value))&&parseFloat(value)>0).map(([field,value])=>[field,parseFloat(value)]));setSizing(old=>JSON.stringify(old)===JSON.stringify(next)?old:next);},[widthsSignal,!!props.onViewChange,columns]);
  const [rowHeight,setRowHeight]=React.useState(initial.rowHeight),[wrapHeaders,setWrapHeaders]=React.useState(initial.wrapHeaders);
  const [filterField,setFilterField]=React.useState(null),[managing,setManaging]=React.useState(false);
  const [edited,setEdited]=React.useState(null),[editing,setEditing]=React.useState(null),[expanded,setExpanded]=React.useState(props.treeExpanded ?? false);
  const [localGroups,setGroups]=React.useState(()=>initial.groupBy),[groupOwner,setGroupOwner]=React.useState(null),[collapsed,setCollapsed]=React.useState(()=>new Set(initial.collapsed));
  const [loaded,setLoaded]=React.useState(props.pageSize||50),[printing,setPrinting]=React.useState(false);
  const collapsedSignal=JSON.stringify(props.collapsedGroups||[]);
  React.useEffect(()=>{if(props.onViewChange)setCollapsed(old=>JSON.stringify([...old])===collapsedSignal?old:new Set(props.collapsedGroups||[]));},[collapsedSignal,!!props.onViewChange]);
  const groupSignal=JSON.stringify(props.groupBy),groupBy=props.onViewChange?(props.groupBy??false):groupOwner===groupSignal?localGroups:props.groupBy??options.groupBy??localGroups;
  const childField=props.tree?props.childrenField||'children':null;
  const [ownSelection,setSelection]=React.useState({}),[filters,setFilters]=React.useState([]),[page,setPage]=React.useState(0),[pageSize,setPageSize]=React.useState(props.pageSize||50);
  const fetching=React.useRef(false);
  const [remoteBusy,setRemoteBusy]=React.useState(false);
  const [remote,setRemote]=React.useState(null),[remoteError,setRemoteError]=React.useState(null),[retry,setRetry]=React.useState(0);
  const [metrics,setMetrics]=React.useState({row:0,line:0,lead:0,menu:0,min:0,space:0,room:0}),[isNarrow,setNarrow]=React.useState(false),[message,setMessage]=React.useState('');
  // One conversion per distinct width and measured environment, shared by every visible cell.
  const widthPixels=React.useMemo(()=>{const cache=new Map();return value=>{if(!cache.has(value))cache.set(value,gridPx(value,{el:frame.current||document.documentElement}));return cache.get(value);};},[metrics]);
  const effectiveStep=props.rowHeight || rowHeight, effectiveWrap=props.wrapHeaders ?? wrapHeaders;
  const selection=Array.isArray(selected)?Object.fromEntries(selected.map(k=>[recordKey(k),true])):ownSelection;
  const controlledSort=React.useMemo(()=>normalizeSort(props.sort),[sortSignal]);
  const deferredFilter=React.useDeferredValue(props.filter);
  const initiallyControlledSort=React.useRef(!!props.sort?.length),appliedSort=React.useRef(false);if(props.sort?.length&&(initiallyControlledSort.current||JSON.stringify(controlledSort)!==JSON.stringify(initial.sorting)))appliedSort.current=true;
  React.useEffect(()=>{if(props.sort?.length&&sortOwner!==sortSignal)setSortOwner(null);},[sortSignal]);
  const sorting=props.onViewChange?controlledSort:sortOwner===sortSignal||(!props.sort?.length&&sortOwner!==null)?localSort:props.sort?.length?controlledSort:appliedSort.current?EMPTY_ROWS:localSort;
  const controlledVisibility=React.useMemo(()=>visibilityOf(props.hiddenColumns),[hiddenSignal]);
  const columnOrder=props.onViewChange?props.columnOrder||order:orderOwner===orderSignal?order:props.columnOrder || order, columnVisibility=props.onViewChange?controlledVisibility:hiddenOwner===hiddenSignal?visibility:props.hiddenColumns?controlledVisibility:visibility;
  const sortingRef=React.useRef(sorting);sortingRef.current=sorting;
  const remoteMode=typeof props.fetchRows==='function'&&(mode==='pages'||mode==='load-more'),incoming=remoteMode?(remote?.rows||EMPTY_ROWS):data;
  const source=edited?.input===incoming?edited.rows:incoming,canonical=React.useMemo(()=>recordsOf(source,index,childField),[source,index,childField]);
  // TanStack tries a global filter against columns; the public predicate describes a record, so evaluate it once.
  const unreadKey=React.useCallback(record=>record[index],[index]);
  const unread=useUnread(canonical,unreadKey,props),[localUnreadOnly,setUnreadOnly]=React.useState(false);
  const unreadOnly=props.unreadOnly??localUnreadOnly;
  const activeFilter=React.useMemo(()=>unreadOnly?{keys:unread.keys,filter:deferredFilter}:deferredFilter,[unreadOnly,unread.keys,deferredFilter]);
  const rowMenu=unread.enabled&&!isStatic?record=>[...(typeof suppliedRowMenu==='function'?suppliedRowMenu(record):suppliedRowMenu||[]),{label:unread.has(record)?'Mark as read':'Mark as unread',onSelect:()=>unread.mark([record],!unread.has(record))}]:suppliedRowMenu;
  const recordFilter=React.useMemo(()=>{const results=new WeakMap();return row=>{const record=row.original;if(unreadOnly&&!unread.has(record))return false;if(typeof deferredFilter!=='function')return true;if(!results.has(record))results.set(record,!!deferredFilter(record));return results.get(record);};},[deferredFilter,source,unreadOnly,unread.keys]);
  const recordPositions=React.useMemo(()=>new Map(canonical.map((record,i)=>[record,i])),[canonical]);
  const recordsByKey=React.useMemo(()=>new Map(canonical.map(record=>[recordKey(record[index]),record])),[canonical,index]);
  const replaceData=rows=>new Promise(resolve=>{mutations.current.push(resolve);setEdited({input:incoming,rows:rows.slice()});});
  const changeGroups=value=>{setGroupOwner(groupSignal);setGroups(()=>value);setCollapsed(new Set());props.onViewChange?.({groupBy:value,collapsed:[]});};
  const toggleGroup=(id,open)=>{const next=new Set(live.current.collapsed),expand=open??next.has(id);if(expand)next.delete(id);else next.add(id);live.current.collapsed=next;setCollapsed(next);setMessage(expand?S.expanded:S.collapsed);props.onViewChange?.({collapsed:[...next]});};
  const updateRecord=(key,change)=>new Promise(resolve=>{mutations.current.push(resolve);setEdited(old=>({input:incoming,rows:changeRecord(old?.input===incoming?old.rows:source,key,change,index,childField)}));});
  const commitEdit=(key,field,value)=>{const old=canonical.find(record=>recordKey(record[index])===key),previous=valueAt(old,field);updateRecord(key,record=>setField(record,field,value));setEditing(null);pendingEdit.current={key,field};props.onCellEdit?.(setField(old,field,value),{field,value,previous,row:old});};
  const emit=(name,...args)=>{live.current.props.on?.[name]?.(...args);listeners.current.get(name)?.forEach(fn=>fn(...args));};
  const api=React.useMemo(()=>createAdapter(live),[]);
  api.getUnreadCount=()=>unread.count;
  api.markRead=keys=>unread.mark(canonical.filter(record=>[].concat(keys).includes(record[index])),false);
  api.markUnread=keys=>unread.mark(canonical.filter(record=>[].concat(keys).includes(record[index])),true);
  const resize=(field,value)=>{const definition=columns.find(c=>c.field===field),at=frame.current;const min=Math.max(floors[field]||0,tokenPixels(definition?.minWidth||'--plx-ref-size-80px',at)),max=definition?.maxWidth?tokenPixels(definition.maxWidth,at):SIZE_STEPS[SIZE_STEPS.length-1];const width=snapToGrid(snapSize(tokenPixels(value,at),min,max),{el:at});live.current.sizing={...(live.current.sizing||sizing),[field]:width};setSizing(s=>({...s,[field]:width}));props.onViewChange?.({widths:{...sizing,[field]:width}});};
  const changeOrder=next=>{setOrderOwner(orderSignal);setOrder(next);props.onViewChange?.({columnOrder:next});};
  const changeVisibility=next=>{setHiddenOwner(hiddenSignal);setVisibility(next);props.onViewChange?.({hiddenColumns:Object.keys(next).filter(field=>next[field]===false)});};
  const move=(field,target,after)=>{const current=live.current.table.getAllLeafColumns().map(c=>c.id).filter(id=>!id.startsWith('__')&&id!==field);const at=current.indexOf(target);current.splice(Math.max(0,at+(after?1:0)),0,field);changeOrder(current);emit('columnMoved',api.column(field),current.map(api.column));};
  const notifySelection=next=>{
    live.current.selection=next;setSelection(next);const active=new Set(live.current.table.getFilteredRowModel().flatRows.map(r=>r.id)),records=canonical.filter(r=>next[recordKey(r[index])]);
    selectionInfo.current={hidden:records.filter(r=>!active.has(recordKey(r[index]))).length};onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:selectionInfo.current.hidden});
    emit('rowSelectionChanged',records,records.map(r=>api.row(recordKey(r[index]))));
  };
  const pick=(key,value)=>{const now=live.current;if(!!now.selection[key]===!!value)return;let row=null;try{row=now.table.getRow(key,true);}catch(e){row=null;}
    if(row&&row.getIsSelected()===!!now.selection[key])row.toggleSelected(!!value,{selectChildren:false});
    else now.table.setRowSelection(old=>{const next={...old};if(options.selectableRows===1&&value)Object.keys(next).forEach(k=>delete next[k]);if(value)next[key]=true;else delete next[key];return next;});};
  const changeSort=update=>{const next=typeof update==='function'?update(sorting):update;setSortOwner(sortSignal);setSorting(next);setPage(0);props.onViewChange?.({sort:sorted(next)});emit('dataSorted',next.map(s=>({field:s.id,dir:s.desc?'desc':'asc'})));};
  const leafDefs=React.useMemo(()=>columns.map(c=>({id:c.field,accessorFn:r=>valueAt(r,c.field),header:c.title||c.field,
    enableSorting:c.sortable!==false,filterFn:c.type==='bytes'?byteFilter:c.filter==='list'?listFilter:textFilter,sortingFn:typeof c.sorter==='function'?(a,b,id)=>c.sorter(a.getValue(id),b.getValue(id),a.original,b.original,id,sortingRef.current.find(s=>s.id===id)?.desc?'desc':'asc'):c.sorter==='number'||c.type==='bytes'?'basic':compare,
    size:kinds(c).includes('icon')?metrics.lead:Math.max(metrics.min,floors[c.field]||0,autoSizing[c.field]||tokenPixels(c.width,frame.current)||metrics.min),minSize:kinds(c).includes('icon')?metrics.lead:Math.max(floors[c.field]||0,tokenPixels(c.minWidth,frame.current)||metrics.min),
    maxSize:kinds(c).includes('icon')?metrics.lead:c.maxWidth?tokenPixels(c.maxWidth,frame.current):SIZE_STEPS[SIZE_STEPS.length-1],meta:c})),[columns,metrics.min,metrics.lead,autoSizing,floors]);
  // pinned (frozen) columns are TanStack's left pinning, listed in the columns' current order (columnOrder first, then
  // the rest as defined, as TanStack orders them), so a pinned column's offset is its getStart('left')
  const pinnedAt=columns.findIndex(c=>c.rowLabel),pinnedIds=columns.filter((c,i)=>c.frozen||(pinnedAt>=0&&i<=pinnedAt)).map(c=>c.field);
  const orderAt=id=>{const i=(columnOrder||[]).indexOf(id);return i<0?(columnOrder||[]).length+columns.findIndex(c=>c.field===id):i;};
  const columnPinning=React.useMemo(()=>({left:pinnedIds.slice().sort((a,b)=>orderAt(a)-orderAt(b)),right:[]}),[JSON.stringify(pinnedIds),JSON.stringify(columnOrder)]);
  const table=useReactTable({data:source,columns:leafDefs,getRowId:r=>recordKey(r[index]),getSubRows:childField?r=>r[childField]:undefined,onExpandedChange:setExpanded,filterFromLeafRows:true,
    state:{expanded:printing?true:expanded,sorting,columnOrder,columnVisibility,columnSizing:sizing,columnFilters:filters,globalFilter:activeFilter,pagination:{pageIndex:page,pageSize},rowSelection:selection,columnPinning},
    onSortingChange:changeSort,enableMultiRowSelection:options.selectableRows!==1,enableSubRowSelection:false,
    onRowSelectionChange:update=>notifySelection(typeof update==='function'?update(live.current.selection||selection):update),
    onColumnVisibilityChange:update=>{changeVisibility(typeof update==='function'?update(columnVisibility):update);},onColumnOrderChange:update=>{changeOrder(typeof update==='function'?update(columnOrder):update);},onColumnSizingChange:update=>{const before=live.current.sizing||sizing,next=typeof update==='function'?update(before):update;Object.keys(next).forEach(id=>{if(next[id]!==before[id])resize(id,next[id]);});},
    columnResizeMode:'onChange',columnResizeDirection:frame.current&&isRtl(frame.current)?'rtl':'ltr',onColumnFiltersChange:update=>{setFilters(update);setPage(0);},
    getColumnCanGlobalFilter:()=>true,globalFilterFn:recordFilter,globalFilter:deferredFilter,
    manualPagination:remoteMode,manualSorting:remoteMode,manualFiltering:remoteMode,pageCount:remoteMode?Math.ceil((remote?.total||0)/pageSize):undefined,
    getExpandedRowModel:getExpandedRowModel(),getCoreRowModel:getCoreRowModel(),getFilteredRowModel:getFilteredRowModel(),getSortedRowModel:getSortedRowModel(),
    getFacetedRowModel:(t)=>()=>{const all=t.getPreFilteredRowModel();return {rows:all.rows,flatRows:all.rows,rowsById:all.rowsById};},getFacetedUniqueValues:getFacetedUniqueValues(),
    getPaginationRowModel:mode==='pages'?getPaginationRowModel():undefined,autoResetPageIndex:false});
  const allRows=(printing?table.getPrePaginationRowModel():table.getRowModel()).rows;
  // uniformPillWidths (CTM, 2026-10-22): every standard pill of a column as wide as the column's widest pill in the current
  // view (the filtered, sorted page, every row of it, not only the rows drawn), so scrolling a long list never changes it.
  // Measured like the column widths (the pill's font, weight, sides, border and icon), snapped up to the grid.
  const gridKey=React.useId(),[fontsReady,setFontsReady]=React.useState(0);
  React.useEffect(()=>{const fonts=frame.current?.ownerDocument.fonts;if(fonts&&fonts.ready)fonts.ready.then(()=>setFontsReady(n=>n+1));},[]);
  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at||typeof CSSStyleSheet==='undefined')return undefined;
    const store=pillSheet(at.ownerDocument);
    if(!uniformPillWidths||cells!=='pill'||!metrics.row){if(store.rules.delete(gridKey))store.flush();return undefined;}
    const ctx=at.ownerDocument.createElement('canvas').getContext('2d'),faces={data:pillFont(at,ctx,true),text:pillFont(at,ctx,false)},px=(name)=>tokenPixels(name,at),step=gridStep(at);
    const sides=px('--plx-comp-data-pill-md-padding-inline-start')+px('--plx-comp-data-pill-md-padding-inline-end')+2*px('--plx-comp-data-pill-border-width'),glyph=px('--plx-comp-data-pill-icon-size')+px('--plx-comp-data-pill-gap');
    const key=CSS.escape(gridKey),rules=[];
    columns.forEach(c=>{
      const k=kinds(c);if(c.render||c.pill===false||k.includes('tags')||k.includes('badge')||k.includes('deleted')||k.includes('icon'))return;
      const data=k.includes('data')||['number','currency','date','bytes'].includes(c.type);
      const face=faces[data?'data':'text'],scale=face.scale;ctx.font=face.font;ctx.wordSpacing=face.wordSpacing;
      let widest=0;allRows.forEach(r=>{if(!r.original)return;const v=valueAt(r.original,c.field);if(v==null||v==='')return;widest=Math.max(widest,ctx.measureText(valueText(v)).width*scale);});
      if(!widest)return;
      const icon=c.type==='person'||k.includes('avatar-name')||(showTypes&&typeOf(c)!=='text');
      rules.push('[data-plx-grid-key="'+key+'"] .plx-data-pill[data-plx-pill-field="'+CSS.escape(c.field)+'"]{inline-size:'+snapToGrid(widest+sides+(icon?glyph:0),{round:'up',step})+'px;}');
    });
    store.rules.set(gridKey,rules.join('\n'));store.flush();
    return undefined;
  },[uniformPillWidths,cells,columns,allRows,metrics.row,metrics.space,showTypes,fontsReady]);
  React.useEffect(()=>()=>{const doc=frame.current?.ownerDocument||(typeof document!=='undefined'?document:null);if(doc&&doc.__plxPillWidths&&doc.__plxPillWidths.rules.delete(gridKey))doc.__plxPillWidths.flush();},[]);
  const loadedRows=React.useMemo(()=>mode==='load-more'&&!remoteMode?allRows.slice(0,loaded):allRows,[allRows,mode,remoteMode,loaded]);
  // grouping: TanStack's grouped row model (owner, 2026-10-23) over the rows in view (filtered, sorted, loaded), in its
  // own table so selection, paging and counts keep the plain rows. Each level is a column whose grouping value is the
  // row's bucket (records.js groupValue: calendar periods in UTC, numeric ranges); a record of a multi-value column
  // enters once per value (owner: it belongs to every group of its values). Group summaries are TanStack aggregations.
  const levels=React.useMemo(()=>typeof groupBy==='string'||typeof groupBy==='function'?[groupBy]:Array.isArray(groupBy)?groupBy.filter(Boolean):[],[typeof groupBy==='function'?groupBy:JSON.stringify(groupBy)]);   // the same levels keep one array (an app may pass a new one on every render)
  const levelField=level=>typeof level==='object'?level.field:level;
  const groupInput=React.useMemo(()=>{if(!levels.length)return EMPTY_ROWS;const out=[];
    for(const row of loadedRows){if(!row.original)continue;let members=[[]];
      levels.forEach(level=>{const field=levelField(level),column=columns.find(c=>c.field===field)||{},raw=typeof field==='function'?field(row.original):valueAt(row.original,field);
        const values=(column.multi||column.type==='multi')&&Array.isArray(raw)?(raw.length?raw:[null]):[raw],seen=new Set(),buckets=[];
        for(const value of values){const bucket=groupValue(value,level,column),key=valueKey(bucket);if(!seen.has(key)){seen.add(key);buckets.push(bucket);}}
        members=members.flatMap(member=>buckets.map(bucket=>member.concat([bucket])));});
      members.forEach(member=>out.push({row,member}));}
    return out;},[loadedRows,levels,columns]);
  // TanStack's own aggregations over a group's records, each counted once (a record of a multi-value column enters a group more than once; sum, min and max read the records, not the subgroups)
  const onceEach=name=>(id,leafRows)=>{const once=[...new Map(leafRows.map(leaf=>[leaf.original.row.id,leaf])).values()];return aggregationFns[name](id,once,once);};
  const summaryColumns=React.useMemo(()=>columns.filter(c=>c.summary),[columns]);
  const groupColumns=React.useMemo(()=>levels.map((level,i)=>({id:'__level'+i,accessorFn:item=>item.member[i],getGroupingValue:item=>valueKey(item.member[i])}))
    .concat(summaryColumns.map(c=>({id:'__summary:'+c.field,accessorFn:item=>valueAt(item.row.original,c.field),aggregationFn:onceEach(({sum:'sum',average:'mean',min:'min',max:'max',count:'count'})[c.summary]||'count')}))),[levels,summaryColumns]);
  const groupingState=React.useMemo(()=>levels.map((level,i)=>'__level'+i),[levels]);
  const groupTable=useReactTable({data:groupInput,columns:groupColumns,getCoreRowModel:getCoreRowModel(),getGroupedRowModel:getGroupedRowModel(),state:{grouping:groupingState},groupedColumnMode:false});
  const groupedModel=groupTable.getRowModel();
  const groups=React.useMemo(()=>{if(!levels.length)return [];
    const build=(rows,path)=>rows.filter(row=>row.getIsGrouped()).map((row,i)=>{const depth=row.depth,field=levelField(levels[depth]),value=row.leafRows[0].original.member[depth],nextPath=path.concat({field,value});
      return {id:'group:'+JSON.stringify(nextPath.map(part=>[part.field,valueKey(part.value)])),field,value,depth,separated:i>0,path:nextPath,
        rows:[...new Map(row.leafRows.map(leaf=>[leaf.original.row.id,leaf.original.row])).values()],groups:build(row.subRows,nextPath),
        summary:Object.fromEntries(summaryColumns.map(c=>[c.field,row.getValue('__summary:'+c.field)]))};});
    return build(groupedModel.rows,[]);},[groupedModel,levels,summaryColumns]);
  const model=React.useMemo(()=>groups.length?groupDisplay(groups,printing?new Set():collapsed,!!props.onAddToGroup):loadedRows,[groups,collapsed,loadedRows,!!props.onAddToGroup,printing]),virtualized=!isStatic&&mode!=='pages'&&!isNarrow&&!printing;
  const estimate=row=>row?.__group?metrics.group+metrics.line*(row.__group.separated?2:1):row?.__gap?metrics.groupGap:row?.__add?metrics.add+metrics.line:metrics.row+metrics.line;
  const virtual=useVirtualizer({count:model.length,getScrollElement:()=>holder.current,estimateSize:i=>estimate(model[i]),
    getItemKey:i=>model[i]?.displayKey||model[i]?.id,overscan:4,enabled:virtualized&&metrics.row>0,initialRect:{width:0,height:0},initialOffset:()=>printView.current?.top??holder.current?.scrollTop??0});
  const semanticRows=model.filter(row=>!row.__gap),semanticIndex=new Map(semanticRows.map((row,i)=>[row.displayKey||row.id,i+2]));
  const virtualItems=virtual.getVirtualItems(),first=virtualized?(virtualItems[0]?.index||0):0,last=virtualized?(virtualItems[virtualItems.length-1]?.index??Math.min(model.length,1)-1)+1:model.length;
  const shown=virtualized?model.slice(first,last):model;
  const frozen=new Set(columnPinning.left),ordered=table.getLeftVisibleLeafColumns().concat(table.getCenterVisibleLeafColumns());
  const pinStart=column=>(selectable?metrics.lead:0)+column.getStart('left');
  const widths=Object.fromEntries(ordered.map(column=>[column.id,column.getSize()]));
  const listable=column=>!column.rowHandle&&!kinds(column).some(kind=>['icon','actions'].includes(kind));
  const keys=keyColumns?.length?keyColumns:columns.filter(c=>!kinds(c).some(k=>['icon','actions'].includes(k))&&!c.rowHandle).slice(0,3).map(c=>c.field);
  const listed=narrow==='auto'?columns.some(listable):narrow==='list'&&columns.some(column=>listable(column)&&!keys.includes(column.field));
  const columnDnd=useSortable({items:ordered,getId:column=>column.id,getName:column=>column.columnDef.meta.title||column.id,label:label+' columns',orientation:'horizontal',disabled:!(props.movableColumns??options.movableColumns),onReorder:(next,{item})=>{changeOrder(next.map(column=>column.id));emit('columnMoved',api.column(item.id),next.map(column=>api.column(column.id)));}});
  const rowDnd=useSortable({items:canonical,getId:record=>recordKey(record[index]),getName:record=>String(valueAt(record,columns[0]?.field)??record[index]),label:label+' rows',disabled:!(props.movableRows??options.movableRows)||!!groupBy||!!childField,onReorder:(rows,{item})=>{setEdited({input:incoming,rows});props.onRowMove?.(rows);emit('rowMoved',api.row(recordKey(item[index])));}});
  live.current={props,frame,index,data:canonical,source,recordsByKey,replaceData,model,groups,groupBy,changeGroups,toggleGroup,collapsed,updateRecord,commitEdit,editing,setEditing,childField,expanded,setExpanded,fields:columns,table,selection,sorting,setSorting:changeSort,resize,move,pick,setPage,page,pageSize,setPageSize,virtual,rowElements:rowElements.current,headerElements:headerElements.current,listeners:listeners.current};

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at||!metrics.min)return;
    const ctx=at.ownerDocument.createElement('canvas').getContext('2d'),widths={},free=[],floor={};
    // the probe pills are the only writes: measured first, so the reads below find the styles already computed
    const scales=cells==='pill'?{data:pillFont(at,ctx,true),text:pillFont(at,ctx,false)}:null,cs=getComputedStyle(at),step=gridStep(at);
    const known=new Map(),tokenPx=(name)=>{if(!known.has(name))known.set(name,tokenPixels(name,at));return known.get(name);},snapUp=(px)=>snapToGrid(px,{round:'up',step});
    columns.forEach(c=>{
      if(kinds(c).includes('icon')){widths[c.field]=metrics.lead;return;}
      // the header: its title in the header's own font, after the type icon and its gap (owner, 2026-10-22: a column that
      // gets no share of the room left must still show its whole title)
      ctx.font=(cs.getPropertyValue('--plx-comp-data-grid-header-font-weight').trim()||'600')+' '+cs.getPropertyValue('--plx-comp-data-grid-header-font-size').trim()+' '+(cs.getPropertyValue('--plx-comp-data-grid-font-family').trim()||cs.fontFamily);ctx.wordSpacing='0px';
      // at rest the title follows the type icon; hovered, the icon steps aside and the menu button takes its room at the end:
      // the header needs the larger of the two (owner, 2026-10-22). Wrapped headers need their longest word on a line.
      const title=String(c.title||c.field),words=title.split(/\s+/);
      // wrapped headers show two lines: the narrowest width that holds the title in two (never a word broken)
      let text=ctx.measureText(title).width;
      if(effectiveWrap)for(let i=1;i<words.length;i+=1)text=Math.min(text,Math.max(ctx.measureText(words.slice(0,i).join(' ')).width,ctx.measureText(words.slice(i).join(' ')).width));
      // hovered, a header shows its type icon, its title and the options button at the edge: the floor holds them (owner, 2026-10-23: no sort arrow; a click on the title sorts, aria-sort tells assistive technology)
      const gap=tokenPx('--plx-comp-data-grid-header-type-icon-gap'),arrow=0;
      const head=text+(showTypes?tokenPx('--plx-comp-data-grid-header-type-icon-size')+gap:0)+arrow+(!isStatic&&headerMenu?tokenPx('--plx-comp-data-grid-title-reserve'):0);
      floor[c.field]=snapUp(Math.max(metrics.min,head+metrics.space*2));
      const explicit=tokenPx(c.width);if(explicit){widths[c.field]=Math.max(explicit,floor[c.field]);return;}
      const family=cs.getPropertyValue(kinds(c).includes('data')?'--plx-comp-data-grid-data-font-family':'--plx-comp-data-grid-font-family').trim()||cs.fontFamily;
      ctx.font=cs.getPropertyValue('--plx-comp-data-grid-font-size').trim()+' '+family;
      // a data column measures with the data font's word spacing (Reddit Mono fitted to DM Sans; normal for DM Sans)
      ctx.wordSpacing=kinds(c).includes('data')?(cs.getPropertyValue('--plx-sys-font-data-word-spacing').trim()||'0px'):'0px';
      let width=head;
      const k=kinds(c),pill=cells==='pill'&&c.pill!==false&&!k.includes('tags')&&!k.includes('badge')&&!k.includes('deleted');
      const face=pill?scales[k.includes('data')||['number','currency','date','bytes'].includes(c.type)?'data':'text']:null,scale=face?face.scale:1;   // a pill: its own font, as drawn
      if(face){ctx.font=face.font;ctx.wordSpacing=face.wordSpacing;}
      const chrome=pill?tokenPx('--plx-comp-data-pill-md-padding-inline-start')+tokenPx('--plx-comp-data-pill-md-padding-inline-end')+2*tokenPx('--plx-comp-data-pill-border-width')+((c.type==='person'||k.includes('avatar-name')||(showTypes&&typeOf(c)!=='text'))?tokenPx('--plx-comp-data-pill-icon-size')+tokenPx('--plx-comp-data-pill-gap'):0):0;   // the icon only where the pill has one
      source.forEach(record=>{const value=valueAt(record,c.field);width=Math.max(width,ctx.measureText(valueText(value)).width*scale+chrome);});
      widths[c.field]=snapUp(Math.max(metrics.min,Math.min(width+metrics.space*2,tokenPx('--plx-comp-data-grid-auto-max-width')||Infinity)));free.push(c.field);
    });
    const available=metrics.room-(selectable?metrics.lead:0)-(rowMenu&&rowMenuButton?metrics.menu:0)-(props.viewMenu?metrics.lead:0),used=Object.values(widths).reduce((sum,width)=>sum+width,0);
    // the room that is left goes to the last column that sizes itself: it fills the grid (owner, 2026-10-22)
    const units=Math.max(0,Math.floor((available-used)/step));
    if(free.length)widths[free[free.length-1]]+=units*step;
    setAutoSizing(old=>JSON.stringify(old)===JSON.stringify(widths)?old:widths);
    setFloors(old=>JSON.stringify(old)===JSON.stringify(floor)?old:floor);
  },[columns,source,metrics.room,metrics.min,metrics.space,metrics.row,selectable,isStatic,showTypes,headerMenu,cells,effectiveWrap]);

  React.useLayoutEffect(()=>{
    const at=frame.current;if(!at)return;const doc=at.ownerDocument;
    let raf=0;
    const measure=()=>{raf=0;const next={step:gridStep(at),row:tokenPixels('--plx-comp-data-grid-record-height',at),line:tokenPixels('--plx-comp-data-grid-line-width',at),lead:tokenPixels('--plx-comp-data-grid-lead-column-width',at),menu:tokenPixels('--plx-comp-data-grid-row-menu-width',at),min:tokenPixels('--plx-ref-size-80px',at),space:tokenPixels('--plx-comp-data-grid-cell-padding-inline',at),room:at.clientWidth,add:tokenPixels('--plx-sys-data-grid-row-height',at),group:tokenPixels('--plx-comp-data-grid-group-header-height',at),groupGap:tokenPixels('--plx-comp-data-grid-group-gap',at)};
      setMetrics(old=>Object.keys(next).every(k=>next[k]===old[k])?old:next);
      const threshold=narrow==='auto'?keys.reduce((sum,field)=>sum+(live.current.table?.getColumn(field)?.getSize()||next.min),selectable?next.lead:0):tokenPixels(narrowAt,at),want=listed&&at.clientWidth>0&&at.clientWidth<threshold;setNarrow(want);
      if(!isStatic&&!height&&mode!=='pages'&&holder.current){const top=holder.current.getBoundingClientRect().top,room=at.getBoundingClientRect().bottom-top;holder.current.style.maxBlockSize=gridPx(inPane?Math.max(0,room):Math.max(next.row*8,doc.defaultView.innerHeight-top),{round:'down',el:at});}
    };
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(measure);};measure();
    const ro=new ResizeObserver(schedule);ro.observe(at);const mo=new MutationObserver(schedule);mo.observe(doc.documentElement,{attributes:true,attributeFilter:['data-plx-density','data-plx-density-policy','data-plx-interaction','data-plx-mode']});
    const region=at.closest('[data-plx-density]');if(region&&region!==doc.documentElement)mo.observe(region,{attributes:true,attributeFilter:['data-plx-density']});
    return()=>{ro.disconnect();mo.disconnect();if(raf)cancelAnimationFrame(raf);};
  },[inPane,effectiveStep,effectiveWrap,height,narrow,narrowAt,mode,columns,keys.join('|')]);
  React.useLayoutEffect(()=>{virtual.measure();},[metrics.row,metrics.line,metrics.group,metrics.groupGap,model.length,collapsed]);
  React.useEffect(()=>{if(!metrics.row||!Object.keys(autoSizing).length||ready.current)return;ready.current=true;api.options=options;deliveredReady.current=onReady;onReady?.(api);emit('tableBuilt');},[metrics.row,autoSizing]);
  React.useEffect(()=>{if(ready.current&&onReady!==deliveredReady.current){deliveredReady.current=onReady;onReady?.(api);}},[onReady]);
  React.useEffect(()=>{if(!ready.current||props.onViewChange)return;writeView(storageKey,{sort:sorting.map(s=>({column:s.id,dir:s.desc?'desc':'asc'})),order:columnOrder,
    hidden:Object.keys(columnVisibility).filter(k=>columnVisibility[k]===false),widths:Object.fromEntries(Object.entries(sizing).map(([k,v])=>[k,v+'px'])),rowHeight:effectiveStep,wrapHeaders:effectiveWrap,groupBy,collapsed:[...collapsed]});},[storageKey,JSON.stringify(sorting),JSON.stringify(columnOrder),JSON.stringify(columnVisibility),JSON.stringify(sizing),effectiveStep,effectiveWrap,metrics.row,groupSignal,groupBy,collapsed]);
  React.useEffect(()=>{
    if(!ready.current)return;const active=new Set(table.getFilteredRowModel().rows.map(r=>r.id)),next={...selection};
    const known=new Set(canonical.map(record=>recordKey(record[index])));
    const hidden=Object.keys(next).filter(key=>next[key]&&known.has(key)&&!active.has(key));
    const removed=Object.keys(next).filter(key=>next[key]&&!known.has(key));
    if(removed.length||(!keepHiddenSelection&&hidden.length)){removed.concat(!keepHiddenSelection?hidden:[]).forEach(key=>delete next[key]);notifySelection(next);}
    else if(hidden.length!==selectionInfo.current.hidden){selectionInfo.current={hidden:hidden.length};const records=canonical.filter(r=>selection[recordKey(r[index])]);onSelectionChange?.(records.map(r=>r[index]),{count:records.length,hidden:hidden.length});}
    emit('dataFiltered',filters.map(f=>({field:f.id,type:'like',value:f.value})),table.getFilteredRowModel().rows.map(r=>api.row(r.id)));
  },[deferredFilter,JSON.stringify(filters),source,keepHiddenSelection]);
  const previousData=React.useRef(source);
  React.useEffect(()=>{if(ready.current&&previousData.current!==source){previousData.current=source;emit('dataChanged',source);}},[source]);
  React.useEffect(()=>{setPage(0);setLoaded(pageSize);},[sortSignal,props.filter,JSON.stringify(filters),props.search,pageSize]);
  React.useEffect(()=>{const before=()=>{const el=holder.current;printView.current=el?{top:el.scrollTop,left:el.scrollLeft,max:el.style.maxBlockSize}:null;if(el)el.style.removeProperty('max-block-size');flushSync(()=>setPrinting(true));},after=()=>{setPrinting(false);requestAnimationFrame(()=>requestAnimationFrame(()=>{const el=holder.current,saved=printView.current;if(el&&saved){if(saved.max)el.style.maxBlockSize=gridPx(parseFloat(saved.max),{el});else el.style.removeProperty('max-block-size');virtual.scrollToOffset(saved.top);el.scrollLeft=saved.left;printView.current=null;}}));};window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);return()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);};},[]);

  React.useEffect(()=>{if(!remoteMode)return;fetching.current=true;setRemoteBusy(true);let alive=true;const controller=new AbortController();setRemoteError(null);Promise.resolve().then(()=>props.fetchRows({page:page+1,size:pageSize,sort:sorted(sorting),filters:filters.map(f=>({field:f.id,type:'like',value:f.value})),search:props.search,signal:controller.signal})).then(result=>{if(alive){fetching.current=false;setRemoteBusy(false);setRemote(old=>({rows:mode==='load-more'&&page>0?[...(old?.rows||[]),...(result.rows||[])]:result.rows||[],total:result.total||0}));}},failure=>{if(alive){fetching.current=false;setRemoteBusy(false);setRemoteError(failure);}});return()=>{alive=false;controller.abort();};},[remoteMode,page,pageSize,JSON.stringify(sorting),JSON.stringify(filters),props.search,retry]);
  const displayedTotal=remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length;
  const selectionRows=table.getPrePaginationRowModel().rows,selectedVisible=selectionRows.filter(r=>selection[r.id]),allVisible=selectionRows.length>0&&selectedVisible.length===selectionRows.length;
  const selectAll=value=>{const next={...selection};selectionRows.forEach(r=>{if(value)next[r.id]=true;else delete next[r.id];});table.setRowSelection(next);};
  const pickCheckbox=(row,event)=>{
    const wanted=event.target.checked,from=selectionRows.findIndex(r=>r.id===selectionAnchor.current),to=selectionRows.indexOf(row);
    if((event.nativeEvent?.shiftKey||event.shiftKey)&&from>=0&&to>=0){const next={...live.current.selection};selectionRows.slice(Math.min(from,to),Math.max(from,to)+1).forEach(record=>{if(wanted)next[record.id]=true;else delete next[record.id];});table.setRowSelection(next);}
    else pick(row.id,wanted);
    selectionAnchor.current=row.id;
  };
  const fit=field=>{const c=columns.find(c=>c.field===field),ctx=document.createElement('canvas').getContext('2d'),cs=getComputedStyle(frame.current);const data=kinds(c).includes('data');ctx.font=cs.getPropertyValue('--plx-comp-data-grid-font-size')+' '+cs.getPropertyValue(data?'--plx-comp-data-grid-data-font-family':'--plx-comp-data-grid-font-family');ctx.wordSpacing=data?(cs.getPropertyValue('--plx-sys-font-data-word-spacing').trim()||'0px'):'0px';const values=[c.title||field,...source.map(r=>valueText(valueAt(r,field)))];resize(field,Math.max(...values.map(v=>ctx.measureText(v).width))+metrics.space*2);};
  const menuItems=(items,row,extra)=>items.map((item,i)=>{if(!item.separator&&!item.disabled&&typeof(item.onSelect||item.action)!=='function'&&Object.prototype.hasOwnProperty.call(React.createElement('span'),'_store')&&!warnedActions.current.has(item.label)){warnedActions.current.add(item.label);console.warn('DataGrid: missing action handler for '+item.label);}return item.separator?<MenuDivider key={i}/>:<MenuItem key={i} icon={item.icon} danger={item.danger} disabled={typeof item.disabled==='function'?item.disabled(row):item.disabled} onSelect={()=>{(item.onSelect||item.action)?.(row,extra);}}>{item.label}</MenuItem>;});
  // the column menu (owner, 2026-10-23, Windows Explorer and Airtable): the application's field actions (columnMenu: duplicate,
  // insert, link, description, permissions), then sort in the type's words, filter, and group by this field. Width, order
  // and visibility live in the header's right-click menu (columnChooser); a click on the title sorts.
  const groupedBy=field=>[].concat(groupBy||[]).some(level=>(typeof level==='object'?level.field:level)===field);
  const headerItems=column=>{const c=column.columnDef.meta,custom=typeof columnMenu==='function'?columnMenu(c):columnMenu||[];const direction=typeOf(c)==='number'||typeOf(c)==='currency'||typeOf(c)==='bytes'?S.sortNumber:typeOf(c)==='date'?S.sortDate:typeOf(c)==='checkbox'?S.sortCheck:S.sortText;
    const grouped=groupedBy(c.field),others=[].concat(groupBy||[]).filter(level=>(typeof level==='object'?level.field:level)!==c.field);return <>
    {menuItems(custom,c,api.column(c.field))}{custom.length?<MenuDivider/>:null}
    <MenuItem icon="sort-ascending" disabled={!column.getCanSort()} onSelect={()=>column.toggleSorting(false)}>{direction[0]}</MenuItem><MenuItem icon="sort-descending" disabled={!column.getCanSort()} onSelect={()=>column.toggleSorting(true)}>{direction[1]}</MenuItem><MenuDivider/>
    <MenuItem icon="filter" disabled={!column.getCanFilter()} onSelect={()=>props.onFilterField?props.onFilterField(c.field):setFilterField(c.field)}>{S.filterBy}</MenuItem>
    <MenuItem icon="group-by" disabled={!grouped&&c.groupable===false} onSelect={()=>changeGroups(grouped?(others.length?others:false):c.field)}>{grouped?S.noGroup:S.group}</MenuItem>
  </>;};
  // the header's right-click menu (Windows Explorer): size this column or every column to fit, every column with a check
  // (TanStack's visibility; a pinned column stays shown) and More… for the columns dialog (order, find, show all, hide all)
  const columnChooser=column=><>
    <MenuItem onSelect={()=>fit(column.id)}>{S.sizeToFit}</MenuItem><MenuItem onSelect={()=>table.getVisibleLeafColumns().forEach(col=>fit(col.id))}>{S.sizeAllToFit}</MenuItem><MenuDivider/>
    {chooserColumns().map(col=><MenuItem key={col.id} checked={col.getIsVisible()} disabled={frozen.has(col.id)} onSelect={()=>col.toggleVisibility(!col.getIsVisible())}>{col.columnDef.meta.title||col.id}</MenuItem>)}
    <MenuDivider/><MenuItem onSelect={()=>setManaging(true)}>{S.moreColumns}</MenuItem>
  </>;
  const chooserColumns=()=>{const all=table.getAllLeafColumns().filter(col=>!kinds(col.columnDef.meta).some(k=>['icon','actions'].includes(k)));return all.slice().sort((x,y)=>orderAt(x.id)-orderAt(y.id));};

  const startResize=(event,column)=>{if(event.type==='mousedown'&&event.button!==0)return;if(event.type==='mousedown')event.preventDefault();event.stopPropagation();const head=table.getFlatHeaders().find(h=>h.column.id===column.id);head?.getResizeHandler(frame.current?.ownerDocument)(event);};
  const headerCell=column=>{const c=column.columnDef.meta,pinned=column.getIsPinned()==='left',sorted=column.getIsSorted(),filtered=column.getIsFiltered(),icon=kinds(c).includes('icon'),hasFilter=!!(c.filter||filterField===c.field||filtered),align=c.headerAlign||(c.type==='bytes'?'right':null),titleFixed=icon?'flush':null,offset=pinned?pinStart(column):0;const node=<Width key={c.field} {...columnDnd.itemProps(ordered.indexOf(column))} onAttach={node=>{if(node)headerElements.current.set(c.field,node);else headerElements.current.delete(c.field);}} width={widths[c.field]} frozenOffset={pinned?offset:undefined} role="columnheader" tabIndex={isStatic?undefined:0} data-plx-field={c.field} aria-sort={column.getIsSorted()?(column.getIsSorted()==='desc'?'descending':'ascending'):undefined}
    className={cx(''+B+'__grid-col',isStatic&&B+'__grid-col--static',selectable&&ordered.indexOf(column)===0&&B+'__grid-col--after-lead',column.getCanSort()&&B+'__grid-sortable',column.getCanSort()&&B+'__grid-col-sorter-element',kinds(c).includes('icon')&&B+'__cell--icon',kinds(c).includes('icon')&&B+'__w-lead',column.getIsFiltered()&&B+'__filtered',pinned&&''+B+'__grid-frozen',[].concat(groupBy||[]).some(level=>(typeof level==='object'?level.field:level)===c.field)&&B+'__cell--grouped',(c.headerAlign||c.type==='bytes')&&B+'__head-align-'+(c.headerAlign||'right'))} data-plx-sticky={pinned&&offset?offset+'px':undefined}
    onClick={e=>{if(!e.target.closest(interactive)&&column.getCanSort())column.toggleSorting();}} onKeyDown={e=>{if((e.key==='Enter'||e.key===' ')&&e.target===e.currentTarget){e.preventDefault();column.toggleSorting();}}}>
    <div className={cx(B+'__grid-col-content',isStatic&&B+'__grid-col-content--static',icon&&B+'__grid-col-content--icon',!icon&&align==='center'&&B+'__grid-col-content--center',effectiveWrap&&B+'__grid-col-content--wrap')}><div className={cx(B+'__grid-col-title-holder',icon&&B+'__grid-col-title-holder--flush')}><div className={cx(B+'__grid-col-title',isStatic&&B+'__grid-col-title--static',titleFixed&&B+'__grid-col-title--'+titleFixed,icon&&B+'__grid-col-title--icon',align&&B+'__grid-col-title--align-'+align)} title={c.title}>{kinds(c).includes('icon')?<span className={B+'__header-icon'}><Icon name={c.icon||'circle-info'} label={c.title}/></span>:<span className={B+'__title'}>{(props.movableColumns??options.movableColumns)?<DragHandle disabled={frozen.has(column.id)} dnd={columnDnd.handleProps(ordered.indexOf(column))}/>:null}{showTypes?<span className={B+'__type-icon'}><Icon name={typeIcons[typeOf(c)]||'ed-text'}/></span>:null}<span className={cx(B+'__title-text',effectiveWrap&&B+'__title-text--wrap')}>{c.title||c.field}</span></span>}</div>
    {filtered||filterField===c.field?<span className={cx(B+'__title-filter',filtered&&B+'__title-filter--on')}><Popover open={filterField===c.field} onOpenChange={open=>setFilterField(open?c.field:null)} title={S.filter+' '+c.title} size="sm" trigger={<span role="button" tabIndex={0} className={B+'__title-filter-button'} aria-label={S.filter+' '+c.title}><Icon name="filter"/></span>}>
      <div className={B+'__filter-form'}>{c.filter==='list'?<Select aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} options={[{value:'',label:S.any},...[...new Set([...column.getFacetedUniqueValues().keys()].map(value=>String(value??'')))].filter(Boolean).map(value=>({value,label:value}))]} onChange={e=>column.setFilterValue(e.target.value||undefined)}/>:<Input aria-label={S.filter+' '+c.title} value={column.getFilterValue()||''} onChange={e=>column.setFilterValue(e.target.value)}/>}
      <Button variant="ghost" size="sm" onClick={()=>column.setFilterValue(undefined)}>{S.clearFilter}</Button></div>
    </Popover></span>:null}</div>
    {headerMenu?<span className={cx(B+'__grid-header-popup-button',B+'__grid-header-popup-button--menu')}><Menu label={c.title+' column actions'} trigger={<span role="button" tabIndex={0} className={B+'__menu-chevron'} aria-label={c.title+' column actions'}><Icon name="chevron-down"/></span>}>{headerItems(column)}</Menu></span>:null}
    </div>
    {c.resizable!==false&&!pinned&&!kinds(c).includes('icon')?<span className={`${B}__grid-col-resize-handle`} role="separator" aria-label={S.resize+' '+c.title} aria-orientation="vertical" tabIndex={0} aria-valuenow={column.getSize()} aria-valuemin={column.columnDef.minSize} aria-valuemax={column.columnDef.maxSize} onMouseDown={e=>startResize(e,column)} onTouchStart={e=>startResize(e,column)} onDoubleClick={()=>fit(c.field)} onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();resize(c.field,e.key==='Home'?column.columnDef.minSize:e.key==='End'?column.columnDef.maxSize:stepSize(column.getSize(),e.key==='ArrowRight'?1:-1,column.columnDef.minSize,column.columnDef.maxSize));}}}/>:null}
  </Width>;return headerMenu?<ContextMenu key={c.field} target={node} label={S.columns}>{columnChooser(column)}</ContextMenu>:node;};
  const focusCell=(rowIndex,columnIndex,step=1)=>{
    while(model[rowIndex]&&!model[rowIndex].original)rowIndex+=step;
    const record=model[rowIndex],column=ordered[columnIndex];if(!record||(columnIndex!==null&&!column))return;
    if(virtualized)virtual.scrollToIndex(rowIndex,{align:'auto'});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{const node=displayElements.current.get(record.displayKey||record.id);(columnIndex===null?node:node?.querySelector('[data-plx-field="'+CSS.escape(column.id)+'"]'))?.focus({preventScroll:true});}));
  };
  const groupNode=(group,sticky=false)=><div key={group.id} data-plx-group={group.id} className={cx(''+B+'__grid-row '+B+'__grid-group',''+B+'__grid-group-level-'+group.depth,group.separated&&B+'__group--gap')} role="row" tabIndex={0} aria-rowindex={semanticIndex.get(group.id)} aria-label={words(S.groupRow,{value:valueText(group.value)||S.noValue,count:group.rows.length,records:group.rows.length===1?S.record:S.records})} aria-level={group.depth+1} aria-expanded={!collapsed.has(group.id)} onKeyDown={event=>{if(event.target!==event.currentTarget)return;if(['Enter',' ','ArrowRight','ArrowLeft'].includes(event.key)){event.preventDefault();toggleGroup(group.id,event.key==='ArrowRight'?true:event.key==='ArrowLeft'?false:undefined);}else if(['ArrowDown','ArrowUp'].includes(event.key)){event.preventDefault();const headers=model.filter(row=>row.__group),next=headers[headers.findIndex(row=>row.id===group.id)+(event.key==='ArrowDown'?1:-1)];if(next){virtual.scrollToIndex(model.indexOf(next),{align:'center'});requestAnimationFrame(()=>requestAnimationFrame(()=>holder.current?.querySelector('.'+B+'__grid-group[data-plx-group="'+CSS.escape(next.id)+'"]')?.focus({preventScroll:true})));}}}}><div className={cx(B+'__group-head',group.separated&&!sticky&&B+'__group-head--gap')} role="presentation">{ordered.map((column,i)=><Width key={column.id} width={widths[column.id]+(i===0&&selectable?metrics.lead:0)} className={cx(B+'__group-cell',i===0&&B+'__group-cell--first',column.columnDef.meta.summary&&B+'__group-cell--summary',isNarrow&&B+'__group-cell--narrow')} role="gridcell" aria-colspan={i===0&&selectable?2:undefined}>{i===0?<div className={cx(B+'__group-label',group.depth>=1&&group.depth<=3&&B+'__group-label--level-'+group.depth)}><span className={B+'__group-chevron'} aria-hidden="true" onClick={()=>toggleGroup(group.id)}><Icon name={collapsed.has(group.id)?'chevron-right':'chevron-down'}/></span><div className={B+'__group-text'}><span dir="auto" className={B+'__group-eyebrow'}>{columns.find(c=>c.field===group.field)?.title||group.field}</span><span className={cx(B+'__group-value',kinds(columns.find(c=>c.field===group.field)||{}).includes('data')&&B+'__group-value--data')} data-plx-text-follow="size" data-plx-kind={kinds(columns.find(c=>c.field===group.field)||{}).includes('data')?'data':undefined}>{valueText(group.value)||S.noValue}</span></div><span className={B+'__group-count'}>{formatNumber(group.rows.length)}</span></div>:column.columnDef.meta.summary?<span className={B+'__group-summary'}><span className={B+'__group-summary-name'}>{({sum:S.sum,count:S.countOf,average:S.average,min:S.min,max:S.max})[column.columnDef.meta.summary]}</span><span className={B+'__group-summary-value'}>{group.summary?.[column.columnDef.meta.field]==null?null:formatNumber(group.summary[column.columnDef.meta.field])}</span></span>:null}</Width>)}</div></div>;
  const rememberRow=(row,node)=>{const displayKey=row.displayKey||row.id,previous=displayElements.current.get(displayKey),active=document.activeElement;if(node){displayElements.current.set(displayKey,node);rowElements.current.set(row.id,node);if(parkedFocus.current?.key===displayKey&&active===holder.current){const saved=parkedFocus.current;parkedFocus.current=null;requestAnimationFrame(()=>{if(document.activeElement===holder.current){const cell=saved.field?node.querySelector('[data-plx-field="'+CSS.escape(saved.field)+'"]'):node;const control=saved.control>=0?cell?.querySelectorAll('input,button,a[href],select,textarea')[saved.control]:null;(control||cell||holder.current)?.focus({preventScroll:true});}});}}else{if(previous?.contains(active)){const cell=active.closest('[data-plx-field]'),controls=cell?[...cell.querySelectorAll('input,button,a[href],select,textarea')]:[];parkedFocus.current={key:displayKey,field:cell?.getAttribute('data-plx-field'),control:controls.indexOf(active)};holder.current?.focus({preventScroll:true});}displayElements.current.delete(displayKey);if(rowElements.current.get(row.id)===previous){const replacement=[...displayElements.current.values()].find(el=>el.dataset.plxRecord===row.id);if(replacement)rowElements.current.set(row.id,replacement);else rowElements.current.delete(row.id);}}};
  React.useLayoutEffect(()=>{mutations.current.splice(0).forEach(resolve=>resolve());if(pendingEdit.current){const {key,field}=pendingEdit.current;pendingEdit.current=null;emit('cellEdit',api.cell(key,field));}},[source]);
  const rowNode=row=>{if(row.__group)return groupNode(row.__group);if(row.__add)return <div key={row.id} className={B+'__add-row'} role="row" aria-rowindex={semanticIndex.get(row.id)}><div role="gridcell" aria-colspan={ordered.length+(selectable?1:0)} className={cx(B+'__group-cell',B+'__group-cell--first',B+'__group-cell--add',isNarrow&&B+'__group-cell--narrow')}><Button variant="ghost" size="xs" iconOnly icon="add" label={words(S.addTo,{value:valueText(row.__add.value)||S.noValue})} onClick={()=>props.onAddToGroup(row.__add.value,row.__add.path)}/></div></div>;if(row.__gap)return <div key={row.id} className={B+'__group--gap'}><div className={B+'__group-band'}/></div>;const rowApi=api.row(row.id),record=row.original;const step=!isStatic&&!isNarrow?effectiveStep:undefined,sized=step!=null,lines=sized&&step!=='short',modes=cx(isStatic&&B+'__grid-cell--static',isNarrow&&B+'__grid-cell--narrow',sized&&B+'__grid-cell--sized',lines&&B+'__grid-cell--lines');const node=<RowTarget key={row.displayKey||row.id} {...(!(props.movableRows??options.movableRows)||!recordPositions.has(record)?null:rowDnd.itemProps(recordPositions.get(record)))} data-plx-unread={unread.has(record)||undefined} aria-label={unread.has(record)?String(valueAt(record,columns[0]?.field)??record[index])+', unread':undefined} data-plx-record={row.id} onAttach={node=>rememberRow(row,node)} role="row" aria-rowindex={(mode==='pages'?page*pageSize:0)+(semanticIndex.get(row.displayKey||row.id)||2)} aria-selected={selectable||options.selectableRows?!!selection[row.id]:undefined} tabIndex={props.onRowClick||on.rowClick||options.selectableRows?0:undefined} aria-level={childField?row.depth+1:undefined} aria-expanded={row.getCanExpand?.()?row.getIsExpanded():undefined}
    className={cx(''+B+'__grid-row',(selectable||options.selectableRows||props.onRowClick||on.rowClick)&&B+'__grid-selectable',childField&&''+B+'__grid-tree-level-'+Math.min(12,row.depth),selection[row.id]&&''+B+'__grid-selected',isStatic&&B+'__grid-row--static',isNarrow&&B+'__grid-row--narrow',virtualized&&B+'__grid-row--virtual')} onClick={e=>{if(e.target.closest(interactive))return;if(selectable)pickCheckbox(row,{target:{checked:!selection[row.id]},nativeEvent:e.nativeEvent,shiftKey:e.shiftKey});else if(options.selectableRows)pick(row.id,!selection[row.id]);emit('rowClick',e,rowApi);props.onRowClick?.(record,e);if(props.onRowClick||on.rowClick)unread.open(record);}} onDoubleClick={e=>{if(!e.target.closest(interactive)){props.onRowDoubleClick?.(record,e);emit('rowDblClick',e,rowApi);}}} onKeyDown={e=>{if(e.key==='Enter'&&!e.defaultPrevented&&(e.target===e.currentTarget||e.target.getAttribute('role')==='gridcell')){e.preventDefault();if(selectable)pickCheckbox(row,{target:{checked:!selection[row.id]},nativeEvent:e.nativeEvent,shiftKey:e.shiftKey});else if(options.selectableRows)pick(row.id,!selection[row.id]);emit('rowClick',e,rowApi);props.onRowClick?.(record,e);if(props.onRowClick||on.rowClick)unread.open(record);}if((e.key==='ArrowDown'||e.key==='ArrowUp')&&e.target===e.currentTarget){e.preventDefault();const step=e.key==='ArrowDown'?1:-1;focusCell(model.indexOf(row)+step,null,step);}}}>
    {selectable?<div className={cx(`${B}__grid-cell ${B}__grid-row-header ${B}__w-lead ${B}__grid-frozen`,modes,selection[row.id]&&B+'__grid-cell--selected-start')} role="gridcell"><Check label={S.selectRow+' '+record[index]} checked={selection[row.id]} onChange={e=>pickCheckbox(row,e)}/></div>:null}
    {ordered.map(column=>{const c=column.columnDef.meta,k=kinds(c),pinned=column.getIsPinned()==='left',sticky=pinned?pinStart(column):0;const cell=api.cell(row.id,c.field),canEdit=!!c.editor&&(typeof c.editable==='function'?c.editable(cell):c.editable!==false);const value=valueAt(record,c.field),isTree=!!childField&&c.field===(props.treeColumn||columns[0]?.field),isEditing=editing?.key===row.id&&editing.field===c.field,handled=c.rowHandle&&(recordPositions.get(record)??-1)>=0,actions=k.includes('actions');
      const mods=cx(isStatic&&B+'__value--static',k.includes('wrap')&&B+'__value--wrap',sized&&B+'__value--sized',lines&&B+'__value--lines')||undefined,shown=CellValue({block:B,column:c,value,strings:S,record,pill:cells==='pill',pillField:uniformPillWidths?c.field:undefined,icon:showTypes&&typeOf(c)!=='text'?typeIcons[typeOf(c)]:undefined,mods});   // a pill carries a type icon only when it says something (a date, a number)
      const bare=!isEditing&&!handled&&!c.render&&!actions&&!(pinned&&!isStatic)&&React.isValidElement(shown)&&shown.type==='span'&&String(shown.props.className).split(' ').includes(B+'__value');
      return <Width key={c.field} width={isNarrow?null:widths[c.field]} frozenOffset={pinned&&!isNarrow?sticky:undefined} role={isStatic?c.rowLabel?'rowheader':'cell':'gridcell'} tabIndex={isStatic?undefined:-1} data-plx-field={c.field} data-plx-unread={unread.has(record)||undefined} dir={pinned&&!isStatic?undefined:'auto'} onDoubleClick={()=>{if(canEdit)setEditing({key:row.id,field:c.field,value});}} onKeyDown={event=>{
        if(isStatic||event.target!==event.currentTarget)return;if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='c'){if(document.getSelection()?.toString())return;event.preventDefault();navigator.clipboard.writeText(valueText(value));return;}if(event.key==='Enter'&&canEdit){event.preventDefault();setEditing({key:row.id,field:c.field,value});return;}const index=model.indexOf(row),at=ordered.indexOf(column),keys={ArrowDown:[index+1,at],ArrowUp:[index-1,at],ArrowLeft:[index,at+(isRtl(frame.current)?1:-1)],ArrowRight:[index,at+(isRtl(frame.current)?-1:1)]};
        if(keys[event.key]){event.preventDefault();focusCell(...keys[event.key],event.key==='ArrowUp'?-1:1);}
      }} data-plx-sticky={pinned&&sticky?sticky+'px':undefined}
      data-plx-text-follow={(c.rowLabel||columns.indexOf(c)<=pinnedAt)?'size family weight':'size family'} className={cx(''+B+'__grid-cell',modes,!selectable&&selection[row.id]&&ordered.indexOf(column)===0&&B+'__grid-cell--selected-start',bare&&B+'__grid-cell--bare',selectable&&ordered.indexOf(column)===0&&B+'__grid-cell--after-lead',isTree&&row.depth>0&&B+'__tree-cell--level-'+Math.min(12,row.depth),editing?.key===row.id&&editing.field===c.field&&''+B+'__grid-editing',k.map(kind=>B+'__cell--'+kind).join(' '),(k.includes('data')||c.type==='bytes')&&B+'__grid-cell--data',[].concat(groupBy||[]).some(level=>(typeof level==='object'?level.field:level)===c.field)&&B+'__cell--grouped',c.type==='bytes'&&B+'__cell--data',c.rowHandle&&B+'__cell--handle',childField&&c.field===(props.treeColumn||columns[0]?.field)&&B+'__tree-cell',pinned&&''+B+'__grid-frozen',(c.rowLabel||columns.indexOf(c)<=pinnedAt)&&B+'__cell--row-label',k.includes('icon')&&B+'__w-lead',keys.includes(c.field)&&B+'__cell--key',keys[0]===c.field&&B+'__cell--key-first',(c.align||c.type==='bytes')&&B+'__cell--align-'+(c.align||'right'))}>{childField&&c.field===(props.treeColumn||columns[0]?.field)?<span className={B+'__tree-level'} data-plx-depth={0}>{row.getCanExpand()?<button type="button" className={B+'__grid-data-tree-control'} aria-expanded={row.getIsExpanded()} aria-label={row.getIsExpanded()?'Collapse row':'Expand row'} onClick={()=>row.toggleExpanded()}><span className={B+'__grid-data-tree-control-'+(row.getIsExpanded()?'collapse':'expand')}/></button>:null}</span>:null}{editing?.key===row.id&&editing.field===c.field?cellDirection(pinned&&!isStatic,<CellEditor column={c} value={value} onCommit={next=>commitEdit(row.id,c.field,next)} onCancel={()=>setEditing(null)}/>):c.rowHandle&&(recordPositions.get(record)??-1)>=0?<Menu label={S.moveRow} trigger={<DragHandle dnd={rowDnd.handleProps((recordPositions.get(record)??-1))}/>}><MenuItem disabled={!rowDnd.canMove((recordPositions.get(record)??-1),-1)} onSelect={()=>rowDnd.moveTo((recordPositions.get(record)??-1),(recordPositions.get(record)??-1)-1)}>{S.moveUp}</MenuItem><MenuItem disabled={!rowDnd.canMove((recordPositions.get(record)??-1),1)} onSelect={()=>rowDnd.moveTo((recordPositions.get(record)??-1),(recordPositions.get(record)??-1)+1)}>{S.moveDown}</MenuItem><MenuItem onSelect={()=>rowDnd.moveTo((recordPositions.get(record)??-1),0)}>{S.moveTop}</MenuItem><MenuItem onSelect={()=>rowDnd.moveTo((recordPositions.get(record)??-1),canonical.length-1)}>{S.moveBottom}</MenuItem></Menu>:c.render?<span className={cx(B+'__portal',actions&&B+'__portal--actions')} dir={pinned&&!isStatic?'auto':undefined} data-plx-link-target="cell"><CustomCell column={c} record={record} cell={cell} rowId={row.id} selected={!!selection[row.id]} block={B} mods={mods}/></span>:actions?<span className={B+'__portal '+B+'__portal--actions'} dir={pinned&&!isStatic?'auto':undefined}>{shown}</span>:cellDirection(pinned&&!isStatic,shown)}</Width>;})}
    {props.viewMenu?<div className={cx(`${B}__grid-cell ${B}__w-view`,modes)} role="gridcell"/>:null}
    {rowMenu&&rowMenuButton?<Width width={metrics.menu} className={cx(`${B}__grid-cell ${B}__cell--row-menu`,modes)} role="gridcell"><Menu label={S.rowActions} trigger={<Button className={B+'__row-menu'} variant="ghost" size="xs" iconOnly icon="more" label={S.rowActions}/>}>
      <RowMenuContent build={menuItems} items={rowMenu} record={record} rowApi={rowApi}/></Menu></Width>:null}
  </RowTarget>;return rowMenu?<ContextMenu key={row.displayKey||row.id} target={node} label={S.rowActions}><RowMenuContent build={menuItems} items={rowMenu} record={record} rowApi={rowApi}/></ContextMenu>:node;};
  const rowVersion=React.useMemo(()=>({}),[unread.keys,unreadOnly,props,source,model,editing,metrics,autoSizing,sizing,columnOrder,columnVisibility,sorting,expanded,page,pageSize,isNarrow,collapsed,printing,filterField,groupBy,loaded]);
  const renderRow=row=>row.original?<MemoGridRow key={row.displayKey||row.id} row={row} render={rowNode} selected={!!selection[row.id]} version={(props.movableRows??options.movableRows)?{}:rowVersion}/>:rowNode(row);
  const priorGroups=model.slice(0,first).filter(row=>row.__group).map(row=>row.__group),currentGroup=model[first]?.__group||priorGroups[priorGroups.length-1];
  const stickyGroups=currentGroup?priorGroups.filter((group,i)=>group.path.every((part,depth)=>JSON.stringify(part)===JSON.stringify(currentGroup.path[depth]))&&!priorGroups.slice(i+1).some(next=>next.depth===group.depth)):[];
  const failed=error||remoteError;
  return <WidthPixels.Provider value={widthPixels}>{headerMenu&&!isStatic&&managing?<ManageColumnsDialog trigger={null} open={managing} onOpenChange={setManaging} fields={chooserColumns().map(col=>({value:col.id,label:col.columnDef.meta.title||col.id}))} value={{order:chooserColumns().map(col=>col.id),hidden:chooserColumns().filter(col=>!col.getIsVisible()).map(col=>col.id)}} onChange={next=>{changeOrder(next.order);changeVisibility(Object.fromEntries((next.hidden||[]).map(field=>[field,false])));}}/>:null}<div ref={frame} className={cx(B,isStatic&&B+'--static',pinnedAt>=0&&B+'--row-header',listed&&B+'--list',isNarrow&&B+'--narrow',height==='100%'&&B+'--fill',mode==='pages'&&B+'--pages',mode==='load-more'&&B+'--load-more',className)} data-plx-engine="next" data-plx-grid-key={uniformPillWidths?gridKey:undefined} data-plx-density={density==='page'?undefined:density} data-plx-render={virtualized?'virtual':undefined} data-plx-row-height={!isStatic&&!isNarrow?effectiveStep:undefined} data-plx-wrap-headers={effectiveWrap?'':undefined} data-plx-height={lengthName(height)} data-plx-fit={!isStatic&&!height&&mode!=='pages'?'':undefined}>
    {failed?<EmptyState className={B+'__error'} tone="error" title={S.failed} action={onRetry||remoteError?<Button size="sm" onClick={()=>{setRetry(n=>n+1);onRetry?.();}}>{S.retry}</Button>:null}>{String(failed===true?'':failed.message||failed)}</EmptyState>:null}
    {unread.enabled&&!isStatic?<><Button variant="ghost" aria-pressed={unreadOnly} onClick={()=>{setUnreadOnly(!unreadOnly);props.onUnreadOnlyChange?.(!unreadOnly);}}>Show unread only ({unread.count})</Button>{selectable?<Menu label="Change selected rows" trigger={<Button variant="ghost">Change selected rows</Button>}><MenuItem disabled={!Object.keys(selection).some(key=>selection[key])} onSelect={()=>unread.mark(canonical.filter(record=>selection[recordKey(record[index])]),false)}>Mark as read</MenuItem><MenuItem disabled={!Object.keys(selection).some(key=>selection[key])} onSelect={()=>unread.mark(canonical.filter(record=>selection[recordKey(record[index])]),true)}>Mark as unread</MenuItem></Menu>:null}</>:null}
    <div className={cx(B+'__table',B+'__grid',height==='100%'&&B+'__grid--fill',isStatic&&B+'__grid--static')} role={isStatic?'table':groups.length||childField?'treegrid':'grid'} aria-label={label} aria-busy={remoteMode&&remoteBusy?true:undefined} aria-rowcount={groups.length||childField?semanticRows.length+1:(remoteMode?remote?.total||0:table.getFilteredRowModel().rows.length)+1} aria-colcount={ordered.length+(selectable?1:0)+(rowMenu&&rowMenuButton?1:0)+(props.viewMenu?1:0)} hidden={!!failed}>
      <div className={cx(B+'__grid-header',isNarrow&&B+'__grid-header--narrow',isStatic&&B+'__grid-header--static')} ref={header} hidden={isStatic&&props.headerVisible===false}><div className={`${B}__grid-header-contents`}><div {...columnDnd.listProps} className={cx(`${B}__grid-headers`,isStatic&&B+'__grid-headers--static')} role="row">
        {selectable?<div className={`${B}__grid-col ${B}__grid-row-header ${B}__w-lead ${B}__grid-frozen`} role="columnheader"><div className={`${B}__grid-col-content ${B}__grid-col-content--row-header`}><Check label={S.selectAll} checked={allVisible} mixed={selectedVisible.length>0&&!allVisible} onChange={e=>selectAll(e.target.checked)}/></div></div>:null}
        {ordered.map(headerCell)}{props.viewMenu?<div className={`${B}__grid-col ${B}__w-view`} role="columnheader"><Menu label={S.view} trigger={<Button variant="ghost" size="xs" iconOnly icon="settings-customize" label={S.view}/>}>
          {['short','medium','tall','extra-tall'].map(step=><MenuItem key={step} checked={effectiveStep===step} onSelect={()=>{setRowHeight(step);props.onViewChange?.({rowHeight:step});}}>{S[step]}</MenuItem>)}<MenuDivider/><MenuItem checked={effectiveWrap} onSelect={()=>{setWrapHeaders(!effectiveWrap);props.onViewChange?.({wrapHeaders:!effectiveWrap});}}>{S.wrapHeaders}</MenuItem></Menu></div>:null}{rowMenu&&rowMenuButton?<Width width={metrics.menu} className={`${B}__grid-col`} role="columnheader" aria-label={S.rowActions}/>:null}
      </div></div></div>
      <div id={viewportId} ref={holder} className={cx(`${B}__grid-tableholder`,height==='100%'&&B+'__grid-tableholder--fill',isStatic&&B+'__grid-tableholder--static')} data-plx-height={lengthName(height)} data-plx-fit={!isStatic&&!height&&mode!=='pages'?'':undefined} role="rowgroup" tabIndex={isStatic?undefined:0} onKeyDown={event=>{if(event.target===event.currentTarget&&event.key==='ArrowDown'){event.preventDefault();focusCell(first,0);}}} onScroll={e=>{if(header.current)header.current.scrollLeft=e.currentTarget.scrollLeft;if(mode==='load-more'&&e.currentTarget.scrollHeight-e.currentTarget.scrollTop-e.currentTarget.clientHeight<tokenPixels('--plx-ref-size-200px',frame.current)){if(remoteMode&&!fetching.current&&source.length<(remote?.total||0)){fetching.current=true;setPage(n=>n+1);}else if(!remoteMode)setLoaded(n=>Math.min(allRows.length,n+pageSize));}}}>
        <div {...rowDnd.listProps} className={cx(`${B}__grid-table`,virtualized&&B+'__grid-table--virtual',isNarrow&&B+'__grid-table--narrow',isStatic&&B+'__grid-table--static')} role="presentation">{stickyGroups.length?<div className={B+'__sticky-groups'} aria-hidden="true" inert="">{stickyGroups.map(group=>React.cloneElement(groupNode(group,true),{key:'sticky:'+group.id,className:B+'__sticky-group '+B+'__grid-group-level-'+group.depth,role:undefined,tabIndex:-1,'aria-expanded':undefined,'aria-rowindex':undefined,'aria-level':undefined,onKeyDown:undefined}))}</div>:null}<RowGap rows={model.slice(0,first)}/>{shown.map(renderRow)}<RowGap rows={model.slice(last)}/></div>
        {!model.length?<div className={cx(`${B}__grid-placeholder`,isStatic&&B+'__grid-placeholder--static')}><div className={`${B}__grid-placeholder-contents`}><span className={B+'__empty'}>{remoteMode&&remoteBusy?S.loading:empty||S.empty}</span></div></div>:null}
      </div>
    </div>
    {!isStatic?<Scrollbars holder={holder} viewportId={viewportId}/>:null}
    {mode==='pages'&&!failed?<div className={B+'__footer'}><Text variant="data" className={B+'__range'}>{words(S.range,{first:displayedTotal?Math.min(page*pageSize+1,displayedTotal):0,last:Math.min((page+1)*pageSize,displayedTotal),total:displayedTotal})}</Text><label className={B+'__page-size'}><span>{S.perPage}</span><Select value={String(pageSize)} options={(props.pageSizes||[25,50,100]).map(n=>({value:String(n),label:String(n)}))} onChange={e=>{setPage(0);setPageSize(+e.target.value);}}/></label><Pagination className={B+'__pages'} label={words(S.pages,{label})} page={page+1} pageCount={Math.max(1,Math.ceil(displayedTotal/pageSize))} onPageChange={n=>setPage(n-1)}/></div>:null}
    {mode==='load-more'&&!failed?<div className={B+'__footer'}><Text variant="data" className={B+'__range'}>{words(S.count,{shown:Math.min(loadedRows.length,displayedTotal),total:displayedTotal})}</Text>{loadedRows.length<displayedTotal?<Button size="sm" loading={remoteMode&&remoteBusy} className={B+'__more'} onClick={()=>{if(remoteMode){if(!fetching.current){fetching.current=true;setPage(n=>n+1);}}else setLoaded(n=>Math.min(allRows.length,n+pageSize));}}>{S.loadMore}</Button>:null}</div>:null}
    <span className="plx-sr-only" role="status" aria-live="polite">{message}</span>
  </div></WidthPixels.Provider>;
}
export function DataGridEngine(props) { return <NextEngine key={props.storageKey || ''} {...props}/>; }
DataGridEngine.preload = () => Promise.resolve();
