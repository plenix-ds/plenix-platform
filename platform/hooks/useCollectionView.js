/* Plenix · useCollectionView (platform/hooks/useCollectionView.js)
   Summary: The state of a collection's command bar, and the DataGrid props that apply it (owner, 2026-10-14: the panels
     drive the table through its APIs): the search text, the filter, the quick filters, the sort and group levels, the
     columns and the view.
   Usage:
     const v = useCollectionView(fields, { text: (row) => row.name, quick: { category: 'list', modified: 'date' } });
     <CommandBar label="Assets"
       find={<><CommandBarSearch {...v.searchProps} placeholder="Search assets" /><FilterPanel {...v.filterProps} />
         <QuickFilter label="Category" icon="settings-categories" options={…} {...v.quickProps('category')} /></>}
       view={<><SortPanel {...v.sortProps} /><GroupPanel {...v.groupProps} /><ColumnsMenu {...v.columnsProps} />
         <ViewMenu {...v.viewProps} /></>} />
     <DataGrid label="Assets" data={rows} columns={columns} {...v.tableProps} />
   Props:
     fields: the collection's fields (utils/fields.js)
     options.data: optional source rows for immediate facet counts; otherwise the ready DataGrid supplies its data
     options.text(row): the text the search looks in (without it there is no search)
     options.quick: the quick filters, by field: "list" (the row's value is one of the chosen) | "date" (a date range), or { kind: "single", required: true }.
       Single choices use field.options (or quick descriptor.options); required choices default to the first option.
     options.columns: the starting columns { order, hidden } (default every field, in order)
     options.view: the starting view { layout, size, height } (default list, medium cards, Short rows)
     options.sort: starting [{ field, dir }] sort; Reset view returns to it
     options.storageKey: collection state in localStorage, under storageKey + ".collection"
     options.today: the ISO date "today" is, for the date presets (default the current date)
   Returns:
     { search, filter, quick, sort, group, columns, view, reset, setSearch, setFilter, setQuick(key, value), setSort, setGroup,
       setColumns, setView, test(row) (whether a row shows), count(rows) (how many show), table (a ref to the DataGrid's
       table controller), searchProps, filterProps, quickProps(key) (includes counts: Map of option values to faceted record counts), sortProps, groupProps, columnsProps, viewProps,
       tableProps: { filter, sort, groupBy, columnOrder, hiddenColumns, rowHeight, columnWidths, collapsedGroups, onViewChange, onReady, onFilterField } }
   Notes:
     tableProps delegates header changes back to this hook; a managed grid ignores its own storageKey.
     The groups' order follows their levels: tableProps.sort is the group levels, then the sort levels. "Hide empty groups"
     on a level leaves out the rows whose value for it is empty. Quick counts apply search, advanced filters and every
     other quick filter, excluding only their own selection. Repeated values in one row count that record once. */
import React from 'react';
import { singleChoice } from '../patterns/QuickFilter/single-choice.js';
import { matchesFilter, matchesDate, valueOf, fieldOf, DATE_PRESETS } from '../utils/fields.js';

const blank = (x) => x === null || x === undefined || x === '' || (Array.isArray(x) && !x.length);

export function useCollectionView(fields, options = {}) {
  const config = key => typeof (options.quick || {})[key] === 'string' ? { kind: options.quick[key] } : (options.quick || {})[key] || {};
  const choices = key => config(key).options || (fields.find(field => field.value === key) || {}).options || [];
  const normalizeQuick = quick => Object.assign({}, quick, Object.fromEntries(Object.keys(options.quick || {}).filter(key => config(key).kind === 'single').map(key => [key, singleChoice(choices(key), quick[key], config(key).required)])));
  const defaults = React.useRef(null);
  if (!defaults.current) defaults.current = { search: '', filter: { join: 'and', items: [] }, quick: normalizeQuick({}), sort: options.sort || [], group: [],
    columns: options.columns || { order: fields.map((f) => f.value), hidden: [] },
    view: Object.assign({ layout: 'list', size: 'm', height: 'short' }, options.view) };
  const initial = React.useRef(null);
  if (!initial.current) {
    let saved = null;
    try { saved = options.storageKey && JSON.parse(localStorage.getItem(options.storageKey + '.collection')); } catch (e) { /* unavailable or broken storage */ }
    const object = (x) => x && typeof x === 'object' && !Array.isArray(x);
    const level = (x) => object(x) && typeof x.field === 'string' && (x.dir === undefined || x.dir === 'asc' || x.dir === 'desc');
    const filterNode = (x) => object(x) && Array.isArray(x.items) && x.items.every((it) => object(it) && (it.group ? filterNode(it) : typeof it.field === 'string'));
    const valid = object(saved) && filterNode(saved.filter) && object(saved.quick) && object(saved.columns) && object(saved.view)
      && ['list', 'gallery'].includes(saved.view.layout) && ['s', 'm', 'l'].includes(saved.view.size) && ['short', 'medium', 'tall', 'extra-tall'].includes(saved.view.height)
      && Array.isArray(saved.sort) && saved.sort.every(level) && Array.isArray(saved.group) && saved.group.every(level)
      && Object.values(saved.quick).every((q) => Array.isArray(q) || object(q)) && typeof saved.search === 'string'
      && Array.isArray(saved.columns.order) && saved.columns.order.every((x) => typeof x === 'string')
      && Array.isArray(saved.columns.hidden) && saved.columns.hidden.every((x) => typeof x === 'string');
    if (valid) {
      const known = new Set(fields.map((f) => f.value));
      const prune = (node) => Object.assign({}, node, { items: node.items.filter((it) => it.group || known.has(it.field)).map((it) => it.group ? prune(it) : it) });
      const order = saved.columns.order.filter((f) => known.has(f));
      saved.filter = prune(saved.filter);
      saved.sort = saved.sort.filter((it) => known.has(it.field)); saved.group = saved.group.filter((it) => known.has(it.field) && fields.find(f => f.value === it.field)?.groupable !== false);
      saved.quick = Object.fromEntries(Object.entries(saved.quick).filter(([key]) => known.has(key)));
      saved.columns = { order: order.concat(fields.map((f) => f.value).filter((f) => !order.includes(f))), hidden: saved.columns.hidden.filter((f) => known.has(f)) };
    }
    initial.current = Object.assign({}, valid ? saved : defaults.current, { quick: normalizeQuick(valid ? saved.quick : defaults.current.quick) });
  }
  const [search, setSearch] = React.useState(initial.current.search);
  const [filter, setFilter] = React.useState(initial.current.filter);
  const [quick, setQuickAll] = React.useState(initial.current.quick);
  const [sort, setSort] = React.useState(initial.current.sort);
  const [group, setGroup] = React.useState(initial.current.group);
  const [columns, setColumns] = React.useState(initial.current.columns);
  const [view, setView] = React.useState(initial.current.view);
  const table = React.useRef(null);
  const [tableRows, setTableRows] = React.useState(null);
  const detach = React.useRef(() => {});
  React.useEffect(() => () => detach.current(), []);
  const onReady = React.useCallback((t) => {
    detach.current(); table.current = t;
    const sync = () => { const data = t.plxData ? t.plxData() : t.getData(); setTableRows(Array.isArray(data) ? data.slice() : []); };
    sync();
    if (t.on) { t.on('dataLoaded', sync); t.on('dataChanged', sync); }
    detach.current = () => { if (t.off) { t.off('dataLoaded', sync); t.off('dataChanged', sync); } };
  }, []);
  const skipSave = React.useRef(false);
  const [resetVersion, setResetVersion] = React.useState(0);
  const reset = () => {
    const d = defaults.current;
    setSearch(d.search); setFilter(d.filter); setQuickAll(d.quick); setSort(d.sort); setGroup(d.group); setColumns(d.columns); setView(d.view);
    skipSave.current = true; setResetVersion((n) => n + 1);
    try { if (options.storageKey) localStorage.removeItem(options.storageKey + '.collection'); } catch (e) { /* unavailable storage */ }
  };
  React.useEffect(() => {
    if (skipSave.current) { skipSave.current = false; return; }
    try { if (options.storageKey) localStorage.setItem(options.storageKey + '.collection', JSON.stringify({ search, filter, quick, sort, group, columns, view })); } catch (e) { /* unavailable storage */ }
  }, [search, filter, quick, sort, group, columns, view, options.storageKey, resetVersion]);
  const setQuick = (k, v) => setQuickAll((o) => Object.assign({}, o, { [k]: config(k).kind === 'single' ? singleChoice(choices(k), v, config(k).required) : v }));
  const latest = React.useRef(); latest.current = { fields, options };
  const testExcept = React.useCallback((row, except) => {
    const { fields: fs, options: o } = latest.current;
    const q = search.trim().toLowerCase();
    if (q && o.text && String(o.text(row)).toLowerCase().indexOf(q) < 0) return false;
    if (!matchesFilter(filter, row, fs, o.today)) return false;
    for (const k of Object.keys(o.quick || {})) {
      if (k === except) continue;
      const f = fieldOf(fs, k), v = f ? valueOf(f, row) : row[k], chosen = quick[k];
      if ((typeof o.quick[k] === 'string' ? o.quick[k] : o.quick[k].kind) === 'date') { if (!matchesDate(chosen, v, o.today)) return false; }
      else if (chosen && chosen.length && ![].concat(v).some((x) => chosen.indexOf(x) >= 0)) return false;
    }
    for (const g of group) if (g.hideEmpty) { const f = fieldOf(fs, g.field); if (blank(f ? valueOf(f, row) : row[g.field])) return false; }
    return true;
  }, [search, filter, quick, group]);
  const test = React.useCallback((row) => testExcept(row), [testExcept]);
  const source = Array.isArray(options.data) ? options.data : tableRows;
  const facets = new Map();
  const countsFor = (key) => {
    if (!source) return undefined;
    if (facets.has(key)) return facets.get(key);
    const counts = new Map(), field = fields.find((f) => f.value === key);
    const rows = source.filter((row) => testExcept(row, key));
    if (config(key).kind === 'date') {
      DATE_PRESETS.concat({ value: 'custom' }).forEach((preset) => counts.set(preset.value, rows.filter((row) => matchesDate(Object.assign({}, quick[key], { preset: preset.value }), field ? valueOf(field, row) : row[key], options.today)).length));
    } else rows.forEach((row) => new Set([].concat(field ? valueOf(field, row) : row[key])).forEach((value) => counts.set(value, (counts.get(value) || 0) + 1)));
    facets.set(key, counts); return counts;
  };
  // The collection owns persistence; header actions write the same state as the command-bar panels.
  const onViewChange=React.useCallback(patch=>{
    const known=new Set(fields.map(field=>field.value)),same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
    if(patch.sort){const next=patch.sort.filter(item=>known.has(item.field)&&!group.some(level=>level.field===item.field));setSort(old=>same(old,next)?old:next);setGroup(old=>{const next=old.map(level=>{const sorted=patch.sort.find(item=>item.field===level.field);return sorted?{...level,dir:sorted.dir}:level;});return same(old,next)?old:next;});}
    if(patch.columnOrder||patch.hiddenColumns)setColumns(old=>{const next={order:patch.columnOrder?patch.columnOrder.filter(field=>known.has(field)):old.order,hidden:patch.hiddenColumns?patch.hiddenColumns.filter(field=>known.has(field)):old.hidden};return same(old,next)?old:next;});
    if('groupBy'in patch)setGroup(old=>[].concat(patch.groupBy||[]).map(value=>typeof value==='string'?{field:value}:value).filter(value=>known.has(value.field)).map(value=>({...old.find(level=>level.field===value.field),dir:'asc',...value})));
    if('rowHeight'in patch||'wrapHeaders'in patch||'widths'in patch||'collapsed'in patch)setView(old=>({...old,...('rowHeight'in patch?{height:patch.rowHeight}:{}),...('wrapHeaders'in patch?{wrapHeaders:patch.wrapHeaders}:{}),...('widths'in patch?{widths:patch.widths}:{}),...('collapsed'in patch?{collapsed:patch.collapsed}:{})}));
  },[fields,group]);
  // the grid's "Filter by this field" opens the command bar's Filter panel on that field (one filter state, shown in one place)
  const [filterOpen, setFilterOpen] = React.useState(false), [filterRequest, setFilterRequest] = React.useState(null);
  const onFilterField = React.useCallback((field) => { setFilterRequest({ field, id: Date.now() + Math.random() }); setFilterOpen(true); }, []);
  const groupable = fields.filter((f) => f.groupable !== false);
  const sorters = group.map((g) => ({ field: g.field, dir: g.dir || 'asc' })).concat(sort.filter((s) => !group.some((g) => g.field === s.field)));
  return {
    search, filter, quick, sort, group, columns, view, reset, setSearch, setFilter, setQuick, setSort, setGroup, setColumns, setView, test, table,
    count: (rows) => rows.filter(test).length,
    searchProps: { value: search, onChange: (e) => setSearch(e.target.value), onClear: () => setSearch('') },
    filterProps: { fields, value: filter, onChange: setFilter, open: filterOpen, onOpenChange: setFilterOpen, request: filterRequest },
    quickProps: (k) => ({ kind: config(k).kind || 'list', required: !!config(k).required, value: quick[k] || (config(k).kind === 'date' ? { preset: 'any', from: '', to: '' } : []), onChange: (v) => setQuick(k, v), counts: countsFor(k) }),
    sortProps: { fields, value: sort, onChange: setSort, grouped: group.length > 0 },
    groupProps: { fields: groupable, value: group, onChange: setGroup, table },
    columnsProps: { fields, value: columns, onChange: setColumns },
    viewProps: { value: view, onChange: setView, onReset: reset },
    tableProps: { filter: test, sort: sorters, groupBy: group.length ? group.map((g) => ({ ...g, interval: g.interval || (fields.find(f => f.value === g.field)?.kind === 'date' ? 'day' : undefined), range: g.range ?? fields.find(f => f.value === g.field)?.groupRange })) : false, columnOrder: columns.order, hiddenColumns: columns.hidden,
      rowHeight: view.height, wrapHeaders: !!view.wrapHeaders, columnWidths: view.widths, collapsedGroups: view.collapsed, onViewChange, onReady, onFilterField },
  };
}
