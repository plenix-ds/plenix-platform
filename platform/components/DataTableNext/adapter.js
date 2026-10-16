/* Plenix · DataTableNext compatibility
   Summary: The row, cell and column methods used by current Plenix application callbacks.
   Usage: Internal to DataTableNext; onReady receives the table adapter.
   Props: React-owned model access and mutations, always read through a live ref.
   Behavior: Adapts records without exposing a second imperative renderer.
   Notes: Advanced Tabulator modules are outside this phase's compatibility surface. */
import { recordKey, valueAt } from './state.js';
export function createAdapter(current) {
  const row = key => {
    const data = () => current.current.data.find(r => recordKey(r[current.current.index]) === key);
    return { getData: data, getIndex: () => data()?.[current.current.index], getTable: () => api,
      getElement: () => current.current.rowElements.get(key),
      isSelected: () => !!current.current.selection[key], select: () => current.current.pick(key, true), deselect: () => current.current.pick(key, false),
      toggleSelect: () => current.current.pick(key, !current.current.selection[key]),
      getCell: field => cell(key, field), getCells: () => current.current.fields.map(c => cell(key, c.field)) };
  };
  const column = field => ({ getField: () => field, getDefinition: () => current.current.fields.find(c => c.field === field),
    getTable: () => api, getElement: () => current.current.headerElements.get(field),
    getWidth: () => current.current.table.getColumn(field)?.getSize(), isVisible: () => current.current.table.getColumn(field)?.getIsVisible(),
    show: () => current.current.table.getColumn(field)?.toggleVisibility(true), hide: () => current.current.table.getColumn(field)?.toggleVisibility(false),
    setWidth: width => current.current.resize(field, width),
    move: (target, after) => current.current.move(field, typeof target === 'string' ? target : target.getField(), after) });
  const cell = (key, field) => ({ getData: () => row(key).getData(), getValue: () => valueAt(row(key).getData(), field),
    getRow: () => row(key), getColumn: () => column(field), getField: () => field, getTable: () => api,
    getElement: () => current.current.rowElements.get(key)?.querySelector('[tabulator-field="' + CSS.escape(field) + '"]') });
  const api = {
    getData: active => active ? current.current.table.getPrePaginationRowModel().rows.map(r => r.original) : current.current.data.slice(),
    getRows: active => (active ? current.current.table.getPrePaginationRowModel().rows : current.current.table.getCoreRowModel().rows).map(r => row(r.id)),
    getRow: id => current.current.data.some(r => recordKey(r[current.current.index]) === recordKey(id)) ? row(recordKey(id)) : false,
    getColumns: () => current.current.table.getAllLeafColumns().filter(c => !c.id.startsWith('__')).map(c => column(c.id)), getColumn: column,
    getSelectedData: () => current.current.data.filter(r => current.current.selection[recordKey(r[current.current.index])]),
    getSelectedRows: () => api.getSelectedData().map(r => row(recordKey(r[current.current.index]))),
    getSorters: () => current.current.sorting.map(s => ({ field: s.id, dir: s.desc ? 'desc' : 'asc', column: column(s.id) })),
    setSort: (field, dir) => current.current.setSorting(Array.isArray(field) ? field.map(s => ({ id: s.column || s.field, desc: s.dir === 'desc' })) : [{ id: field, desc: dir === 'desc' }]),
    clearSort: () => current.current.setSorting([]),
    selectRow: id => current.current.pick(recordKey(id), true), deselectRow: id => current.current.pick(recordKey(id), false),
    setPage: page => current.current.setPage(page - 1), getPage: () => current.current.page + 1,
    setPageSize: size => current.current.setPageSize(size), getPageSize: () => current.current.pageSize,
    scrollToRow: id => { const at = current.current.table.getRowModel().rows.findIndex(r => r.id === recordKey(id)); if (at >= 0) current.current.virtual.scrollToIndex(at); return Promise.resolve(); },
    on: (name, fn) => { const listeners = current.current.listeners; if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(fn); },
    off: (name, fn) => current.current.listeners.get(name)?.delete(fn),
    options: {}, row, column, cell
  };
  return api;
}
