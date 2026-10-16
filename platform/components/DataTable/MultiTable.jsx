/* Plenix · MultiTable (internal)
   Summary: Unique display rows for multi-value groups, with record identity at public table boundaries.
   Usage: DataTable delegates here; applications retain their ordinary index, rows and selection callbacks.
   Props: TableEngine props; multi columns use type: multi or multi: true.
   Behavior: Group memberships form a Cartesian product; repeated memberships collapse and empty values get one group.
     Public row lookups, mutations, selection and downloads use canonical records rather than display memberships.
   Notes: plxRows/plxSelectedRows/plxReplaceData/plxAddData are the engine's physical-row bridge, not application APIs. */
import React from 'react';
import { TableEngine } from './DataTable.jsx';
const fieldsOf = (g) => [].concat(g || []).map((f) => typeof f === 'function' ? f.plxField : f).filter((f) => typeof f === 'string');
const isMulti = (c) => c && (c.type === 'multi' || c.multi === true || [].concat(c.kind || []).includes('multi'));
const GROUPS = Symbol('Plenix group memberships');
const signature = (ids, hidden = 0) => JSON.stringify([ids.map((id) => [typeof id, id]).sort(), hidden]);
export function MultiTable(props) {
  const index = props.index || 'id';
  const initial = () => { if (props.groupBy !== undefined) return props.groupBy; try { return props.storageKey ? JSON.parse(localStorage.getItem('plx-data-table:' + props.storageKey))?.groupBy || props.options?.groupBy : props.options?.groupBy; } catch (e) { return props.options?.groupBy; } };
  const [groups, setGroups] = React.useState(initial), [own, setOwn] = React.useState(props.data || []), [ownSelection, setOwnSelection] = React.useState([]);
  const source = React.useRef(own), lastData = React.useRef(props.data), tableRef = React.useRef(null), latest = React.useRef(props), runtime = React.useRef(null);
  latest.current = props;
  const originals = React.useRef({ rows: null, byId: new Map() });
  const original = (id) => { if (originals.current.rows !== source.current) originals.current = { rows: source.current, byId: new Map(source.current.map((row) => [row[index], row])) }; return originals.current.byId.get(id); };
  const selection = React.useRef(ownSelection), batch = React.useRef(0), reported = React.useRef(signature([]));
  selection.current = props.selected === undefined ? ownSelection : props.selected;
  const controlledKey = signature(props.selected || []);
  React.useEffect(() => { if (props.selected !== undefined) reported.current = signature(props.selected); }, [controlledKey]);
  const propKey = JSON.stringify(props.groupBy);
  React.useEffect(() => { if (props.groupBy !== undefined) setGroups(props.groupBy); }, [propKey]);
  React.useEffect(() => { if (lastData.current !== props.data) { lastData.current = props.data; source.current = props.data || []; setOwn(source.current); } }, [props.data]);
  const fields = fieldsOf(groups), multi = fields.some((f) => isMulti(props.columns.find((c) => c.field === f)));
  const privateField = React.useMemo(() => { let key = '__plxDisplayIndex'; while (own.some((row) => Object.prototype.hasOwnProperty.call(row, key))) key += '_'; return key; }, [own]);
  const unique = (rows) => { const seen = new Set(); return (rows || []).filter((row) => { const id = row[index]; if (seen.has(id)) return false; seen.add(id); return true; }); };
  const expand = (rows) => {
    const out = [];
    for (const row of rows || []) {
      let sets = [{}];
      for (const field of fields) {
        const value = row[field], values = isMulti(props.columns.find((c) => c.field === field)) ? Array.isArray(value) ? [...new Set(value.filter((v) => v !== null && v !== undefined && v !== ''))] : value == null || value === '' ? [] : [value] : [value];
        sets = sets.flatMap((set) => (values.length ? values : ['']).map((v) => ({ ...set, [field]: v })));
      }
      for (const set of sets) { const copy = { ...row }; Object.defineProperty(copy, GROUPS, { value: set }); Object.defineProperty(copy, privateField, { value: JSON.stringify([typeof row[index], row[index], fields.map((f) => set[f])]), enumerable: false, configurable: true }); out.push(copy); }
    }
    return out;
  };
  runtime.current = { index, privateField, expand, unique, multi };
  const display = React.useMemo(() => multi ? expand(own) : own, [own, multi, fields.join('\u0000'), privateField]);
  const lookup = React.useMemo(() => multi ? fields.map((field) => Object.assign((row) => row[GROUPS]?.[field] ?? (Array.isArray(row[field]) ? row[field][0] ?? '' : row[field]), { plxField: field })) : groups, [multi, fields.join('\u0000')]);
  const remote = React.useRef({ epoch: 0, pending: null });
  const fetchRows = multi && typeof props.fetchRows === 'function' ? (ask) => {
    const epoch = ++remote.current.epoch, request = latest.current.fetchRows;
    const pending = Promise.resolve().then(() => request(ask)).then((result) => {
      // A slow previous page/search must never replace the newest canonical page.
      if (epoch !== remote.current.epoch) return remote.current.pending;
      const incoming = runtime.current.unique(result?.rows || []);
      const rows = latest.current.mode === 'load-more' && ask.page > 1 ? runtime.current.unique(source.current.concat(incoming)) : incoming;
      source.current = rows; setOwn(rows);
      return { ...result, rows: runtime.current.expand(incoming) };
    }, (error) => { if (epoch !== remote.current.epoch) return remote.current.pending; throw error; });
    remote.current.pending = pending;
    return pending;
  } : props.fetchRows;
  const selectedSet = new Set(selection.current);
  const emit = () => {
    if (batch.current) return;
    const t = tableRef.current; if (!t) return;
    const rows = (t.plxSelectedRows ? t.plxSelectedRows() : t.getSelectedRows()), ids = [...new Set(rows.map((row) => row.getData()[index]))];
    const active = new Set((t.plxRows ? t.plxRows('active') : t.getRows('active')).map((row) => row.getData()[index]));
    const hidden = ids.filter((id) => !active.has(id)).length, key = signature(ids, hidden);
    if (key === reported.current) return;
    reported.current = key; selection.current = ids; setOwnSelection(ids);
    latest.current.onSelectionChange?.(ids, { count: ids.length, hidden });
  };
  const changed = (keys, info) => { if (multi) emit(); else { selection.current = keys; setOwnSelection(keys); latest.current.onSelectionChange?.(keys, info); } };
  const groupChanged = (g) => setGroups((old) => JSON.stringify(fieldsOf(old)) === JSON.stringify(fieldsOf(g)) ? old : g);
  const ready = (t) => {
    tableRef.current = t;
    if (!multi) { t.plxData = () => t.getData(); latest.current.onReady?.(t); return; }
    const raw = Object.fromEntries(['getData', 'getSelectedData', 'getRows', 'getSelectedRows', 'getRow', 'replaceData', 'selectRow', 'deselectRow', 'scrollToRow', 'getRowPosition', 'addData', 'setData'].map((name) => [name, t[name].bind(t)]));
    const canonical = (rows) => { const originals = new Map(source.current.map((row) => [row[index], row])); return runtime.current.unique(rows).map((row) => originals.get(row[index]) || Object.fromEntries(Object.entries(row))); };
    const uniqueRows = (rows) => { const seen = new Set(); return rows.filter((row) => { const id = row.getData()[index]; if (seen.has(id)) return false; seen.add(id); return true; }).map(patchRow); };
    const idOf = (id) => id && typeof id === 'object' && id.getData ? id.getData()[index] : id;
    const members = (id) => raw.getRows().filter((row) => row.getData()[index] === idOf(id));
    const patched = new WeakSet();
    function patchRow(row) {
      if (!row || patched.has(row)) return row;
      patched.add(row); const id = row.getData()[index]; row.plxData = row.getData.bind(row); row.plxSelect = row.select.bind(row); row.plxDeselect = row.deselect.bind(row);
      row.getData = () => original(id) || Object.fromEntries(Object.entries(row.plxData())); row.getIndex = () => id;
      row.update = (change) => t.updateRow(id, change); row.delete = () => t.deleteRow(id);
      row.select = () => t.selectRow(id); row.deselect = () => t.deselectRow(id); row.toggleSelect = () => members(id).some((r) => r.isSelected()) ? t.deselectRow(id) : t.selectRow(id);
      row.scrollTo = (...args) => t.scrollToRow(id, ...args);
      return row;
    }
    t.plxRows = raw.getRows; t.plxSelectedRows = raw.getSelectedRows; t.plxAddData = raw.addData;
    t.plxData = () => source.current;
    t.getData = (...args) => canonical(raw.getData(...args));
    t.getSelectedData = (...args) => canonical(raw.getSelectedData(...args));
    t.getDataCount = (range) => range === 'selected' ? t.getSelectedData().length : t.getData(range).length;
    t.getRows = (...args) => uniqueRows(raw.getRows(...args)); t.getSelectedRows = () => uniqueRows(raw.getSelectedRows());
    t.getRow = (id) => patchRow(members(id)[0] || (typeof id === 'object' ? raw.getRow(id) : false));
    t.getRowPosition = (id, active) => { const at = t.getRows(active ? 'active' : undefined).findIndex((row) => row.getData()[index] === idOf(id)); return at < 0 ? false : at + 1; };
    t.getRowFromPosition = (position, active) => t.getRows(active ? 'active' : undefined)[position - 1] || false;
    t.scrollToRow = (id, ...args) => { const row = members(id).find((row) => row.getElement().isConnected) || members(id)[0]; return row ? raw.scrollToRow(row, ...args) : Promise.reject(new Error('Row not found')); };
    const select = (ids, on) => {
      const before = new Set(raw.getSelectedRows().map((row) => row.getData()[index]));
      const all = ids === undefined ? raw.getRows() : [].concat(ids).flatMap(members);
      batch.current++; try { (on ? raw.selectRow : raw.deselectRow)(all); } finally { batch.current--; }
      const after = new Set(raw.getSelectedRows().map((row) => row.getData()[index]));
      const event = on ? 'rowSelected' : 'rowDeselected';
      for (const id of on ? after : before) if (on ? !before.has(id) : !after.has(id)) latest.current.on?.[event]?.(t.getRow(id));
      emit(); if (before.size !== after.size || [...before].some((id) => !after.has(id))) latest.current.on?.rowSelectionChanged?.(t.getSelectedData(), t.getSelectedRows());
    };
    t.selectRow = (ids) => select(ids, true); t.deselectRow = (ids) => select(ids, false);
    let lastRows = raw.getData(), inFlight = Promise.resolve();
    const same = (a, b) => a.length === b.length && a.every((row, i) => row[privateField] === b[i][privateField] && Object.keys(row).length === Object.keys(b[i]).length && Object.keys(row).every((key) => Object.is(row[key], b[i][key])));
    t.plxReplaceData = (rows) => {
      if (same(lastRows, rows)) return inFlight;
      lastRows = rows; const wanted = new Set(selection.current); batch.current++;
      inFlight = raw.replaceData(rows).then(() => { raw.selectRow(raw.getRows().filter((row) => wanted.has(row.getData()[index]))); batch.current--; raw.getRows().forEach(patchRow); emit(); }, (error) => { batch.current--; throw error; });
      return inFlight;
    };
    const apply = (rows) => { source.current = rows; setOwn(rows); return t.plxReplaceData(runtime.current.expand(rows)); };
    t.replaceData = (rows) => apply(rows || []); t.setData = (...args) => Array.isArray(args[0]) ? apply(args[0]) : raw.setData(...args);
    t.updateData = (changes) => { const updates = new Map(changes.map((row) => [row[index], row])); return apply(source.current.map((row) => updates.has(row[index]) ? { ...row, ...updates.get(row[index]) } : row)); };
    t.updateRow = (id, change) => t.updateData([{ ...change, [index]: idOf(id) }]).then(() => t.getRow(idOf(id)));
    t.deleteRow = (ids) => { const gone = new Set([].concat(ids).map(idOf)); return apply(source.current.filter((row) => !gone.has(row[index]))); };
    t.addData = (rows, top = false, at) => { const data = source.current.slice(), position = at === undefined ? top ? 0 : data.length : data.findIndex((row) => row[index] === idOf(at)) + (top ? 0 : 1); data.splice(Math.max(0, position), 0, ...[].concat(rows)); return apply(data).then(() => [].concat(rows).map((row) => t.getRow(row[index]))); };
    t.addRow = (row, top, at) => t.addData([row], top, at).then((rows) => rows[0]);
    t.updateOrAddData = (changes) => { const data = source.current.slice(); for (const change of changes) { const at = data.findIndex((row) => row[index] === change[index]); if (at < 0) data.push(change); else data[at] = { ...data[at], ...change }; } return apply(data).then(() => changes.map((row) => t.getRow(row[index]))); };
    t.updateOrAddRow = (id, row) => t.updateOrAddData([{ ...row, [index]: idOf(id) }]).then((rows) => rows[0]);
    t.clearData = () => apply([]);
    let syncing = false;
    const sync = (row, on) => { if (syncing || batch.current) return; syncing = true; batch.current++; const id = row.getData()[index]; try { (on ? raw.selectRow : raw.deselectRow)(members(id)); } finally { batch.current--; syncing = false; } if (latest.current.selected === undefined || latest.current.selected.includes(id) !== on) emit(); };
    t.on('rowSelected', (row) => sync(row, true)); t.on('rowDeselected', (row) => sync(row, false));
    t.on('dataProcessed', () => raw.getRows().forEach(patchRow)); raw.getRows().forEach(patchRow);
    t.on('cellEdited', (cell) => t.updateData([cell.getRow().plxData()]));
    latest.current.onReady?.(t);
  };
  const on = Object.assign({}, props.on);
  if (multi) {
    if (on.cellEdited) on.cellEdited = (cell) => {
      const row = cell.getRow();
      if (Object.prototype.hasOwnProperty.call(row, 'plxData')) { const data = row.plxData(); source.current = source.current.map((item) => item[index] === data[index] ? { ...item, ...data } : item); }
      latest.current.on?.cellEdited?.(cell);
    };
    for (const name of ['rowSelected', 'rowDeselected']) if (on[name]) on[name] = (...args) => { if (!batch.current && args[0] && Object.prototype.hasOwnProperty.call(args[0], 'plxData')) latest.current.on?.[name]?.(...args); };
    if (on.rowSelectionChanged) on.rowSelectionChanged = () => { if (!batch.current && tableRef.current?.plxRows) latest.current.on?.rowSelectionChanged?.(tableRef.current.getSelectedData(), tableRef.current.getSelectedRows()); };
  }
  const options = multi ? { ...props.options, downloadDataFormatter: (rows) => props.options?.downloadDataFormatter ? props.options.downloadDataFormatter(unique(rows).map((row) => original(row[index]) || ({ ...row }))) : unique(rows).map((row) => source.current.find((original) => original[index] === row[index]) || ({ ...row })) } : props.options;
  return <TableEngine {...props} key={multi ? fields.join('|') + privateField : 'records'} data={display} index={multi ? privateField : index} _recordIndex={index} _onGroupChange={groupChanged} groupBy={multi ? lookup : props.groupBy} fetchRows={fetchRows} options={options} isStatic={false}
    selected={multi ? display.filter((row) => selectedSet.has(row[index])).map((row) => row[privateField]) : props.selected} onSelectionChange={changed} onReady={ready} on={on} />;
}
