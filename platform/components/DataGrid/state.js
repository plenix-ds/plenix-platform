/* Plenix · DataGridEngine state
   Summary: Opening views and dimensions for the independent TanStack trial.
   Usage: Internal to DataGridEngine.
   Props: Existing DataGrid view props and storageKey.
   Behavior: Reads saved state before the first render; no post-build restoration.
   Notes: Canonical row keys preserve the distinction between numeric and string IDs. */
export const recordKey = value => typeof value + ':' + String(value);
export const normalizeSort = value => (Array.isArray(value) ? value : []).filter(x => x && (x.field || x.column)).map(x => ({ id: x.field || x.column, desc: x.dir === 'desc' }));
export function readView(key) { try { return key ? JSON.parse(localStorage.getItem('plx-data-grid:' + key) || localStorage.getItem('plx-data-table:' + key) || 'null') : null; } catch (e) { return null; } }   // the old key (before 2026-10-19) still read
export function writeView(key, view) { if (key) try { localStorage.setItem('plx-data-grid:' + key, JSON.stringify(view)); } catch (e) { /* disabled storage */ } }
export const visibilityOf = hidden => Object.fromEntries((Array.isArray(hidden) ? hidden : []).map(field => [field, false]));
export const valueAt = (row, field) => String(field).split('.').reduce((value, key) => value == null ? undefined : value[key], row);
export function opening(props) {
  const saved = readView(props.storageKey) || {}, options = props.options || {}, known = new Set(props.columns.map(c=>c.field));
  const fields = values => Array.isArray(values) ? values.filter(f=>known.has(f)) : undefined;
  const widths = saved.widths && typeof saved.widths==='object' ? Object.fromEntries(Object.entries(saved.widths).filter(([key,value])=>known.has(key)&&Number.isFinite(parseFloat(value))&&parseFloat(value)>0)) : {};
  const step = ['short','medium','tall','extra-tall'].includes(saved.rowHeight) ? saved.rowHeight : props.rowHeight || 'short';
  return { sorting: normalizeSort(props.sort?.length ? props.sort : saved.sort || options.initialSort),
    order: fields(props.columnOrder) || fields(saved.order) || props.columns.map(c => c.field),
    visibility: visibilityOf(fields(props.hiddenColumns) || fields(saved.hidden)), widths,
    groupBy:props.groupBy??saved.groupBy??options.groupBy??false, collapsed:Array.isArray(saved.collapsed)?saved.collapsed:[], rowHeight: step, wrapHeaders: saved.wrapHeaders ?? props.wrapHeaders ?? false };
}
