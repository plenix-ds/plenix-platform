/* Plenix · useCollectionView (platform/hooks/useCollectionView.js)
   Summary: The state of a collection's command bar, and the DataTable props that apply it (owner, 2026-10-14: the panels
     drive the table through its APIs): the search text, the filter, the quick filters, the sort and group levels, the
     columns and the view.
   Usage:
     const v = useCollectionView(fields, { text: (row) => row.name, quick: { category: 'list', modified: 'date' } });
     <CommandBar label="Assets"
       find={<><CommandBarSearch {...v.searchProps} placeholder="Search assets" /><FilterPanel {...v.filterProps} />
         <QuickFilter label="Category" icon="settings-categories" options={…} {...v.quickProps('category')} /></>}
       view={<><SortPanel {...v.sortProps} /><GroupPanel {...v.groupProps} /><ColumnsMenu {...v.columnsProps} />
         <ViewMenu {...v.viewProps} /></>} />
     <DataTable label="Assets" data={rows} columns={columns} {...v.tableProps} />
   Props:
     fields: the collection's fields (utils/fields.js)
     options.text(row): the text the search looks in (without it there is no search)
     options.quick: the quick filters, by field: "list" (the row's value is one of the chosen) | "date" (a date range)
     options.columns: the starting columns { order, hidden } (default every field, in order)
     options.view: the starting view { layout, size, height } (default list, medium cards, Short rows)
     options.today: the ISO date "today" is, for the date presets (default the current date)
   Returns:
     { search, filter, quick, sort, group, columns, view, setSearch, setFilter, setQuick(key, value), setSort, setGroup,
       setColumns, setView, test(row) (whether a row shows), count(rows) (how many show), table (a ref to the DataTable's
       Tabulator instance), searchProps, filterProps, quickProps(key), sortProps, groupProps, columnsProps, viewProps,
       tableProps: { filter, sort, groupBy, columnOrder, hiddenColumns, rowHeight, onReady } }
   Notes:
     The groups' order follows their levels: tableProps.sort is the group levels, then the sort levels. "Hide empty groups"
     on a level leaves out the rows whose value for it is empty. */
import React from 'react';
import { matchesFilter, matchesDate, valueOf, fieldOf } from '../utils/fields.js';

const blank = (x) => x === null || x === undefined || x === '' || (Array.isArray(x) && !x.length);

export function useCollectionView(fields, options = {}) {
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState({ join: 'and', items: [] });
  const [quick, setQuickAll] = React.useState({});
  const [sort, setSort] = React.useState([]);
  const [group, setGroup] = React.useState([]);
  const [columns, setColumns] = React.useState(() => options.columns || { order: fields.map((f) => f.value), hidden: [] });
  const [view, setView] = React.useState(() => Object.assign({ layout: 'list', size: 'm', height: 'short' }, options.view));
  const table = React.useRef(null);
  const setQuick = (k, v) => setQuickAll((o) => Object.assign({}, o, { [k]: v }));
  const latest = React.useRef(); latest.current = { fields, options };
  const test = React.useCallback((row) => {
    const { fields: fs, options: o } = latest.current;
    const q = search.trim().toLowerCase();
    if (q && o.text && String(o.text(row)).toLowerCase().indexOf(q) < 0) return false;
    if (!matchesFilter(filter, row, fs, o.today)) return false;
    for (const k of Object.keys(o.quick || {})) {
      const f = fieldOf(fs, k), v = f ? valueOf(f, row) : row[k], chosen = quick[k];
      if (o.quick[k] === 'date') { if (!matchesDate(chosen, v, o.today)) return false; }
      else if (chosen && chosen.length && ![].concat(v).some((x) => chosen.indexOf(x) >= 0)) return false;
    }
    for (const g of group) if (g.hideEmpty) { const f = fieldOf(fs, g.field); if (blank(f ? valueOf(f, row) : row[g.field])) return false; }
    return true;
  }, [search, filter, quick, group]);
  const sorters = group.map((g) => ({ field: g.field, dir: g.dir || 'asc' })).concat(sort.filter((s) => !group.some((g) => g.field === s.field)));
  return {
    search, filter, quick, sort, group, columns, view, setSearch, setFilter, setQuick, setSort, setGroup, setColumns, setView, test, table,
    count: (rows) => rows.filter(test).length,
    searchProps: { value: search, onChange: (e) => setSearch(e.target.value), onClear: () => setSearch('') },
    filterProps: { fields, value: filter, onChange: setFilter },
    quickProps: (k) => ({ value: quick[k] || (options.quick && options.quick[k] === 'date' ? { preset: 'any', from: '', to: '' } : []), onChange: (v) => setQuick(k, v) }),
    sortProps: { fields, value: sort, onChange: setSort, grouped: group.length > 0 },
    groupProps: { fields: fields.some((f) => f.kind === 'select') ? fields.filter((f) => f.kind === 'select') : fields, value: group, onChange: setGroup, table },
    columnsProps: { fields, value: columns, onChange: setColumns },
    viewProps: { value: view, onChange: setView },
    tableProps: { filter: test, sort: sorters, groupBy: group.length ? group.map((g) => g.field) : false, columnOrder: columns.order, hiddenColumns: columns.hidden,
      rowHeight: view.height, onReady: (t) => { table.current = t; } },
  };
}
