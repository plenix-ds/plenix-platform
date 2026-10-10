/* Plenix · DataTable (and the engine the static Table shares, components/Table)
   Summary: Every table in Plenix: a Tabulator table (6.6.1, MIT, vendored in platform/vendor/tabulator) in the Plenix
     table style (docs/data-table-reference.html, the owner's reference), drawn only with tokens (data-table.css).
   Usage:
     <DataTable label="Assets" data={assets} index="id" selectable
       columns={[
         { title: 'Attachments', field: 'attach', kind: 'icon', icon: 'attachment', sorter: 'number',
           render: (a) => (a.attach ? <Icon name="attachment" label={a.attach + ' attachments'} /> : null) },
         { title: 'Name', field: 'name', kind: 'name', filter: true, width: '--plx-ref-size-240px', editor: 'input' },
         { title: 'Status', field: 'status', kind: 'center', filter: 'list', render: (a) => <Badge tone="success">{a.status}</Badge> },
         { title: 'Size', field: 'size', kind: 'data', hozAlign: 'right', headerHozAlign: 'right', sorter: 'number' }]}
       rowMenu={[{ label: 'Open', icon: 'open', onSelect: (a) => open(a) }, { separator: true },
                 { label: 'Delete', icon: 'trash', danger: true, onSelect: (a) => remove(a) }]}
       options={{ dataTree: true, dataTreeElementColumn: 'name', movableColumns: true }}
       on={{ rowClick: (e, row) => open(row.getData()) }} />
   Props:
     label: names the grid for screen readers (required)
     data: the rows: plain objects, Tabulator's data format (children in _children with options.dataTree)
     columns: Tabulator column definitions (title, field, sorter, editor, hozAlign, frozen, headerSort…), in Tabulator's
       own terms, with these Plenix additions:
     columns[].kind: "name" (the row's name, medium weight) | "data" (technical values: the same DM Sans, size and color as the row, so every cell reads alike; batches 245–246) |
       "icon" (a mark column as wide as the checkbox column; its header shows columns[].icon) | "center" (content
       centered in the row's height: badges, buttons) | "actions" (row action buttons, shown while the row is hovered or
       selected) | "wrap" (long text: it wraps and the row grows; the first line sits where a one-line cell's text does)
     columns[].icon: the Plenix icon name a "kind: icon" column shows in its header (its title is the accessible name)
     columns[].render(data, cell): the cell's content as a React element (badges, buttons, links); state and context work
     columns[].filter: true (contains text) | "list" (one of the column's values): the filter button, shown on hover
     columns[].rowLabel: true: the row header: this column and the columns before it are pinned and shaded like the
       header row (and so is the checkbox column)
     columns[].width: a size token ("--plx-ref-size-240px"; a number snaps to the nearest one); without it the column shares
       the room left with the others. minWidth: the smallest such a sharing column gets (a size token; default 80px)
     index: the field that identifies a row; default "id"
     selectable: a checkbox column (select all in its header) and row selection; default false. Without it,
       options.selectableRows (Tabulator) selects rows by click (1: one row, as the open row of a list)
     selected: the index values of the selected rows, for a selection kept by the page (bulk actions); with
     onSelectionChange(keys): runs when the person changes the selection (not when selected changes it)
     headerMenu: right-click on a header: sort, clear sort, clear filter, group by, fit, hide, show all; default true
     rowMenu: right-click on a row: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     empty: shown when no row matches; default "Nothing to show"
     height: the grid's height, a size token (the rows scroll inside it), or "100%" (it fills its container)
     options: any other Tabulator table option (layout, initialSort, groupBy, dataTree, movableColumns, movableRows…)
     on: Tabulator events, { rowClick(e, row), cellEdited(cell), rowSelectionChanged(data, rows), dataSorted(sorters)… };
       with rowClick, rows are focusable and Enter does what a click does
     onReady(table): the Tabulator instance, once built (for anything Tabulator offers)
     className: more classes on the grid's frame
     DataTable.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Drag and drop (batch 271): a row handle (a column with rowHandle) shows the grab cursor; the row being moved shows
       grabbing.
     The header's sort arrow and filter button show while the header is hovered; a sorted column keeps its arrow and a
     filtered column its button, in the accent color. Right-click opens the header menu or the row menu.
     Hover, selected and selected + hover are three row colors; pinned and row-header cells follow the row.
     The row height and text size follow the density (--plx-sys-data-table-row-height, --plx-sys-data-table-font-size), also a
     density region's; a density change redraws the grid. A grid built while hidden is drawn again when it is shown.
     Cells edit on double-click (Tabulator editors). Group rows and tree rows are Tabulator's (groupBy, dataTree).
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Nothing on the grid is styled inline (Strict DS 6b, batch 285): Tabulator runs in strict mode (strict.js) and the grid
       is drawn from classes: a column's width is a size token class (__w-<size>, __w-lead, __w-fill), its alignment a class
       (__cell--align-*), a pinned column sticky at the widths before it, a tree row indented by its level class, a menu
       placed by CSS anchor positioning. Rows render all at once (no virtual scrolling). Moving rows (a rowHandle column
       with options.movableRows) and columns (options.movableColumns) is native drag and drop; a column's resize handle
       and Fit to content snap its width to the size tokens. Editors "input" and "number" are a Plenix input.
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { cx } from '../../utils/cx.js';
import { loadTabulator, tablePx } from './tabulator.js';
import { snapSize, SIZE_STEPS } from '../../utils/sizeSteps.js';

const SEP = '\u0000';
const MIN = '--plx-ref-size-80px';   // the narrowest a resized column gets
const STRINGS = {
  empty: 'Nothing to show', sortUp: 'Sort A to Z', sortDown: 'Sort Z to A', clearSort: 'Clear sort', clearFilter: 'Clear filter',
  group: 'Group by this column', ungroup: 'Ungroup', fit: 'Fit to content', hide: 'Hide column', showAll: 'Show all columns',
  filter: 'Filter', any: 'Any', contains: 'Contains…', clear: 'Clear', apply: 'Apply', selectRow: 'Select row', item: 'item', items: 'items', failed: 'The grid could not load.'
};

const el = (tag, className, text) => { const e = document.createElement(tag); if (className) e.className = className; if (text != null) e.textContent = text; return e; };
const iconEl = (name) => { const s = el('span', 'plx-icon plx-icon--' + name); s.setAttribute('aria-hidden', 'true'); return s; };
// a menu item's label: its icon box, its text; danger in the danger color
function menuLabel(text, icon, danger) {
  const item = el('span', cx('plx-data-table__menu-item', danger && 'plx-data-table__menu-item--danger'));
  const box = el('span', 'plx-data-table__menu-icon');
  if (icon) box.appendChild(iconEl(icon));
  item.appendChild(box); item.appendChild(el('span', 'plx-data-table__menu-label', text));
  return item;
}
// a copy of the rows as the page gave them (Tabulator writes into the row objects it is given: a field for every column)
const snap = (rows) => (rows || []).map((r) => { const o = { ...r }; if (Array.isArray(r._children)) o._children = snap(r._children); return o; });
// two row lists with the same rows: same length, each row's fields the same values (children compared the same way)
function sameRows(a, b) {
  if (a === b) return true;
  if (!a || !b || a.length !== b.length) return false;
  return a.every((r, i) => { const s = b[i], ka = Object.keys(r), kb = Object.keys(s);
    return ka.length === kb.length && ka.every((k) => (k === '_children' ? sameRows(r[k], s[k]) : r[k] === s[k])); });
}
const sizeOf = (v, host) => (typeof v === 'string' && /^(var\()?--/.test(v) ? tablePx(v, host) : v);
// a width as a size token's name ("240px"): a token as given, a number snapped to the nearest token
const sizeName = (v, host) => {
  if (v == null || v === '' || v === true) return null;
  const m = /--plx-ref-size-(\d+px)/.exec(String(v)); if (m) return m[1];
  const px = typeof v === 'number' ? v : sizeOf(v, host);
  return px ? snapSize(px, SIZE_STEPS[0], SIZE_STEPS[SIZE_STEPS.length - 1]) + 'px' : null;
};
// the editor for "input" and "number": a Plenix input (Tabulator's own writes its padding and width inline)
const plenixEditor = (type) => (cell, onRendered, success, cancel) => {
  const i = document.createElement('input'); i.type = type; i.className = 'plx-data-table__editor';
  const v = cell.getValue(); i.value = v == null ? '' : v;
  let finished = false; const ok = () => { if (!finished) { finished = true; success(type === 'number' && i.value !== '' ? Number(i.value) : i.value); } };
  i.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); ok(); } else if (e.key === 'Escape') { e.preventDefault(); finished = true; cancel(); } });
  i.addEventListener('blur', ok);
  onRendered(() => { i.focus(); i.select(); });
  return i;
};
// a column's width class set again (the resize handle, Fit to content): its definition for new cells, its header and cells now
function setWidthClass(column, size, B) {
  const def = column.getDefinition(), next = B + '__w-' + size;
  const swap = (el) => { if (!el) return; Array.from(el.classList).filter((c) => c.indexOf(B + '__w-') === 0).forEach((c) => el.classList.remove(c)); el.classList.add(next); };
  def.cssClass = String(def.cssClass || '').split(/\s+/).filter((c) => c && c.indexOf(B + '__w-') !== 0).concat(next).join(' ');
  if (column._column) column._column.definition.cssClass = def.cssClass;
  swap(column.getElement()); column.getCells().forEach((c) => swap(c.getElement()));
}

// the engine both components run on: props.isStatic makes the static Table (no sorting, filters, menus, selection,
// resizing, moving, editing or row clicks), with its own classes (plx-table…) and stylesheet
// the row checkbox (batch 246): a plain click toggles the row; Shift or Ctrl/Cmd use Tabulator's range and add selection
function rowCheckbox(cell) {
  const row = cell.getRow(), table = cell.getTable(), box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = row.isSelected();
  box.addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.shiftKey || e.ctrlKey || e.metaKey) { e.preventDefault(); table.modules.selectRow.handleComplexRowClick(row._row, e); } else row.toggleSelect();
  });
  table.modules.selectRow.registerRowSelectCheckbox(row, box);   // Tabulator keeps it checked as the row is selected
  return box;
}

export function TableEngine(props) {
  // one look from one set of tokens (owner, 2026-10-09): the static Table draws with the DataTable's classes and tokens
  // (--plx-sys-data-table-*, --plx-comp-data-table-*); isStatic only switches the interaction off
  const isStatic = !!props.isStatic, B = 'plx-data-table';
  const { label, data, columns, index = 'id', selectable = false, selected, headerMenu = true, rowMenu, empty, height, options, className } = props;
  const syncing = React.useRef(false);   // the selection is being set from the selected prop
  const frameRef = React.useRef(null);
  const hostRef = React.useRef(null);
  const tableRef = React.useRef(null);
  const builtRef = React.useRef(false);
  const latest = React.useRef(props); latest.current = props;
  const cells = React.useRef(new Map());   // React cell containers: row index + SEP + field
  const owners = React.useRef(new Map());  // the same keys: the cell each container belongs to (tree rows included)
  const pending = React.useRef(false);
  const moving = React.useRef(null);   // the row being moved by its handle
  const [, bump] = React.useReducer((x) => x + 1, 0);
  const [error, setError] = React.useState(null);

  // a container for a React cell, kept per cell so React keeps its state between renders
  const container = (id) => {
    let e = cells.current.get(id);
    if (!e) { e = el('span', B + '__portal'); cells.current.set(id, e); pending.current = true; bump(); }
    return e;
  };
  // once React has filled new cells, Tabulator measures again (column widths, row heights)
  React.useLayoutEffect(() => {
    if (!pending.current || !tableRef.current || !builtRef.current) return undefined;
    const t = tableRef.current;
    const id = requestAnimationFrame(() => { if (tableRef.current === t) { t.redraw(true); pending.current = false; } });
    return () => cancelAnimationFrame(id);
  });

  // Plenix columns -> Tabulator column definitions
  const defsOf = (cols, host) => {
    const T = () => tableRef.current;
    const labelAt = cols.findIndex((c) => c.rowLabel);
    const filters = (field) => T().getFilters().filter((f) => f.field === field);
    const setFilter = (column, kind, value) => {
      const field = column.getField();
      filters(field).forEach((f) => T().removeFilter(f.field, f.type, f.value));
      const on = value !== '' && value != null;
      if (on) T().addFilter(field, kind === 'list' ? '=' : 'like', value);
      column.getElement().classList.toggle('is-filtered', on);
    };
    const close = () => document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const fitColumn = (col) => {
      const els = [col.getElement()].concat(col.getCells().map((x) => x.getElement()));
      const need = Math.max.apply(null, els.map((el) => el.scrollWidth));
      setWidthClass(col, snapSize(SIZE_STEPS.find((z) => z >= need) || need, SIZE_STEPS[0], SIZE_STEPS[SIZE_STEPS.length - 1]) + 'px', B);
    };
    const filterPopup = (c) => (e, column, onRendered) => {
      const field = column.getField(), active = filters(field)[0];
      const id = 'plx-data-table-filter-' + Math.random().toString(36).slice(2);
      const box = el('div', 'plx-data-table__filter');
      const lab = el('label', 'plx-data-table__filter-label', STRINGS.filter + ' ' + (c.title || field)); lab.htmlFor = id;
      let input;
      if (c.filter === 'list') {
        input = el('select', 'plx-input plx-data-table__filter-input');
        const values = [];
        (function walk(rows) { rows.forEach((r) => { if (r[field] != null && r[field] !== '') values.push(r[field]); if (r._children) walk(r._children); }); })(latest.current.data || []);
        [''].concat(Array.from(new Set(values)).sort()).forEach((v) => { const o = el('option', null, v === '' ? STRINGS.any : String(v)); o.value = v; input.appendChild(o); });
      } else {
        input = el('input', 'plx-input plx-data-table__filter-input'); input.type = 'text'; input.placeholder = STRINGS.contains;
      }
      input.id = id; input.value = active ? active.value : '';
      const actions = el('div', 'plx-data-table__filter-actions');
      const button = (text, primary, fn) => { const b = el('button', cx('plx-button', primary ? 'plx-button--primary' : 'plx-button--secondary', 'plx-button--size-sm'), text); b.type = 'button'; b.addEventListener('click', fn); return b; };
      actions.appendChild(button(STRINGS.clear, false, () => { setFilter(column, c.filter, ''); close(); }));
      actions.appendChild(button(STRINGS.apply, true, () => { setFilter(column, c.filter, input.value); close(); }));
      input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { setFilter(column, c.filter, input.value); close(); } });
      box.appendChild(lab); box.appendChild(input); box.appendChild(actions);
      onRendered(() => input.focus());
      return box;
    };
    const headerItems = (c) => () => {
      const items = [];
      if (c.headerSort !== false && c.kind !== 'actions') {
        items.push({ label: menuLabel(STRINGS.sortUp, 'sort-ascending'), action: (e, col) => T().setSort(col.getField(), 'asc') });
        items.push({ label: menuLabel(STRINGS.sortDown, 'sort-descending'), action: (e, col) => T().setSort(col.getField(), 'desc') });
        items.push({ label: menuLabel(STRINGS.clearSort, 'close'), action: () => T().clearSort() });
        items.push({ separator: true });
      }
      if (c.filter) items.push({ label: menuLabel(STRINGS.clearFilter, 'filter-off'), action: (e, col) => setFilter(col, c.filter, '') });
      if (c.kind !== 'icon' && c.kind !== 'actions') {
        items.push({ label: menuLabel(STRINGS.group, 'list-lines'), action: (e, col) => T().setGroupBy(col.getField()) });
        if (T().options.groupBy) items.push({ label: menuLabel(STRINGS.ungroup, 'list-bullets'), action: () => T().setGroupBy(false) });
      }
      if (items.length && !items[items.length - 1].separator) items.push({ separator: true });
      if (c.kind !== 'icon' && c.resizable !== false) items.push({ label: menuLabel(STRINGS.fit, 'expand'), action: (e, col) => fitColumn(col) });
      items.push({ label: menuLabel(STRINGS.hide, 'visibility-off'), action: (e, col) => col.hide() });
      items.push({ label: menuLabel(STRINGS.showAll, 'visibility'), action: () => T().getColumns().forEach((col) => col.show()) });
      return items;
    };

    return cols.map((c, i) => {
      const { kind, icon, render, filter, rowLabel, ...rest } = c;
      const d = { ...rest };
      if (isStatic) { Object.assign(d, { headerSort: false, resizable: false }); delete d.editor; delete d.headerContextMenu; delete d.headerPopup; delete d.cellClick; delete d.rowHandle; }
      // the width: a size token class, the lead width (icon), or a share of the room left (with its smallest size)
      const w = kind === 'icon' ? 'lead' : sizeName(d.width, host);
      const min = sizeName(d.minWidth, host);
      const hz = kind === 'icon' ? 'center' : d.hozAlign, hh = kind === 'icon' ? 'center' : d.headerHozAlign;
      const align = hz && hz !== 'left' ? B + '__cell--align-' + hz : null;
      const headAlign = hh && hh !== 'left' ? B + '__head-align-' + hh : null;
      ['width', 'minWidth', 'maxWidth', 'hozAlign', 'headerHozAlign', 'vertAlign', 'widthGrow', 'widthShrink'].forEach((k) => { delete d[k]; });
      d.cssClass = cx(c.cssClass, kind && B + '__cell--' + kind, (rowLabel || (labelAt > i)) && B + '__cell--row-label',
        w ? B + '__w-' + w : B + '__w-fill', !w && min && B + '__min-' + min, align, headAlign, c.rowHandle && B + '__cell--handle') || undefined;
      if (d.editor === 'input' || d.editor === 'number') d.editor = plenixEditor(d.editor === 'number' ? 'number' : 'text');
      if (labelAt >= i) d.frozen = true;
      if (kind === 'icon') {
        d.resizable = false;   // the lead width and centered (its classes)
        d.titleFormatter = () => { const s = el('span', B + '__header-icon'); s.title = c.title || c.field; s.setAttribute('role', 'img'); s.setAttribute('aria-label', s.title); s.appendChild(iconEl(icon || 'circle-info')); return s; };
      }
      if (kind === 'actions') Object.assign(d, { headerSort: false, resizable: false });
      if (render) d.formatter = (cell) => { const id = String(cell.getRow().getIndex()) + SEP + c.field; owners.current.set(id, cell); return container(id); };
      if (filter && !isStatic) { d.headerPopup = filterPopup(c); d.headerPopupIcon = iconEl('filter').outerHTML; }
      if (headerMenu && !isStatic && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c);
      return d;
    });
  };

  // the column set's shape: a change rebuilds the columns (the data and the cell contents do not)
  const shape = JSON.stringify(columns.map((c) => Object.keys(c).sort().map((k) => (typeof c[k] === 'function' ? k + '()' : k + '=' + JSON.stringify(c[k])))));

  React.useEffect(() => {
    let alive = true, table = null;
    builtRef.current = false;
    // the grid's own window: a grid drawn into a frame runs on that frame's Tabulator; a document that has lost its window
    // (a frame that loaded again meanwhile) gets no grid
    const win = hostRef.current && hostRef.current.ownerDocument.defaultView;
    if (!win) return undefined;
    loadTabulator(win).then((Tabulator) => {
      if (!alive || !hostRef.current || !hostRef.current.ownerDocument.defaultView) return;
      const host = hostRef.current;
      const p = latest.current;
      const placeholder = el('div', B + '__empty tabulator-placeholder-contents', p.empty || STRINGS.empty);
      const rowContextMenu = p.rowMenu ? (e, row) => {
        const cur = latest.current.rowMenu, d = row.getData();
        const list = typeof cur === 'function' ? cur(d) : cur;
        return (list || []).map((it) => (it.separator ? { separator: true } : {
          label: menuLabel(it.label, it.icon, it.danger),
          disabled: typeof it.disabled === 'function' ? it.disabled(d) : !!it.disabled,
          action: () => it.onSelect && it.onSelect(d, row)
        }));
      } : undefined;
      const labelled = p.columns.some((c) => c.rowLabel);
      const opts = {
        layout: 'fitColumns',
        index: p.index || 'id',
        placeholder,
        columnDefaults: { resizable: false },
        renderVertical: 'basic',
        editTriggerEvent: 'dblclick',
        rowContextMenu,
        // the row checkbox toggles its row (batch 246): Tabulator's own one, in the "click" range mode the rows use, makes a
        // plain click mean "only this row", so a checked box could not be unchecked; Shift and Ctrl/Cmd keep their range
        // and add meanings. The header checkbox stays Tabulator's (select all / none).
        rowHeader: p.selectable ? { formatter: rowCheckbox, titleFormatter: 'rowSelection', headerSort: false, resizable: false, frozen: true,
          cssClass: cx('plx-data-table__cell--select', B + '__w-lead', B + '__cell--align-center', B + '__head-align-center', labelled && 'plx-data-table__cell--row-label'),
        } : false,
        selectableRows: p.selectable ? true : false,
        selectableRowsRangeMode: 'click',
        // with a rowClick handler, a row is a Tab stop and Enter does what a click does
        rowFormatter: (row) => {
          const own = latest.current.options && latest.current.options.rowFormatter;
          if (own) own(row);
          const e = row.getElement();
          if (!isStatic && latest.current.on && latest.current.on.rowClick && !e.hasAttribute('data-plx-open')) {
            e.setAttribute('data-plx-open', ''); e.tabIndex = 0;
            e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target === e) { ev.preventDefault(); e.click(); } });
          }
        },
        // a group row: its value and a count, one cell (Tabulator marks it a row group with no rows: axe aria-required-children)
        groupHeader: (value, count) => { const s = el('span', null, String(value)); s.setAttribute('role', 'gridcell'); s.appendChild(el('span', 'plx-data-table__group-count', count + ' ' + (count === 1 ? STRINGS.item : STRINGS.items))); return s; },
        ...Object.fromEntries(Object.entries(p.options || {}).filter(([k]) => !['rowFormatter', 'movableRows', 'movableColumns', 'height', 'maxHeight', 'minHeight', 'renderVertical', 'renderHorizontal', 'dataTreeChildIndent', 'columnDefaults'].includes(k))),
        data: p.data || [],

      };
      if (isStatic) Object.assign(opts, { rowContextMenu: undefined, rowHeader: false, selectableRows: false, movableColumns: false, movableRows: false, groupBy: false });
      opts.columns = defsOf(p.columns, host);
      table = new Tabulator(host, opts);
      shown.current = snap(opts.data);
      tableRef.current = table;

      // the ARIA tree: Tabulator's scrolling body is a Tab stop (the keyboard scrolls it), and inside role="grid" a Tab stop
      // must be a row or a row group: the scrolling body is the body's row group, Tabulator's inner body layout only; the
      // root's aria-owns (its own descendant) goes; a group header is a row with one cell.
      const aria = () => {
        const holder = host.querySelector('.tabulator-tableholder'), body = holder && holder.querySelector('.tabulator-table');
        host.removeAttribute('aria-owns');
        host.setAttribute('aria-label', latest.current.label || '');
        if (holder) { holder.setAttribute('role', 'rowgroup'); holder.tabIndex = 0; }
        if (body) body.setAttribute('role', 'presentation');
        host.querySelectorAll('.tabulator-group').forEach((g) => g.setAttribute('role', 'row'));
        // the selection kept by the page, once the rows are in (Tabulator builds before it loads them; nothing happens
        // when it already matches)
        if (table) syncSelection(table);
        host.querySelectorAll('.tabulator-row .tabulator-row-header input[type="checkbox"]').forEach((b, n) => { if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', STRINGS.selectRow + ' ' + (n + 1)); });
      };
      table.on('renderComplete', aria);
      table.on('tableBuilt', () => {
        aria(); builtRef.current = true;
        const on = isStatic ? {} : latest.current.on || {};
        Object.keys(on).forEach((ev) => table.on(ev, (...a) => { const h = (latest.current.on || {})[ev]; if (h) h(...a); }));
        table.on('rowSelectionChanged', () => { const q = latest.current; if (!syncing.current && q.onSelectionChange) q.onSelectionChange(table.getSelectedData().map((x) => x[q.index || 'id'])); });
        syncSelection(table);
        if (!isStatic) { wireColumns(table); wireRows(table, host); }
        if (latest.current.onReady) latest.current.onReady(table);
        bump();
      });
    }).catch((err) => { if (alive) setError(err); });

    // a density or interaction change redraws the rows at their new height
    const mo = new MutationObserver(() => { if (tableRef.current && builtRef.current) tableRef.current.redraw(true); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction'] });
    const region = frameRef.current && frameRef.current.closest('[data-plx-density]');
    if (region && region !== document.documentElement) mo.observe(region, { attributes: true, attributeFilter: ['data-plx-density'] });
    // a grid built while hidden (a closed tab, a section not shown) has no size to lay out in: once it is shown, it is
    // drawn again in full (columns and rows)
    let shownBefore = !!(frameRef.current && frameRef.current.offsetWidth);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      const now = !!(frameRef.current && frameRef.current.offsetWidth);
      if (now && !shownBefore && tableRef.current && builtRef.current) tableRef.current.redraw(true);
      shownBefore = now;
    });
    if (ro && frameRef.current) ro.observe(frameRef.current);

    return () => {
      alive = false; mo.disconnect(); if (ro) ro.disconnect(); builtRef.current = false;
      if (table) { try { table.destroy(); } catch (e) { /* already gone */ } }
      tableRef.current = null; cells.current = new Map(); owners.current = new Map();
    };
    // built once per column shape; the data is replaced in place below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, selectable, headerMenu, !!rowMenu, typeof height === 'string' ? height : '']);

  // moving rows (options.movableRows with a rowHandle column): native drag and drop from the handle, delegated on the grid;
  // the row it is dropped on shows a line (a class) and the moved row lands before it
  const wireRows = (table, host) => {
    if (!(latest.current.options || {}).movableRows || host.hasAttribute('data-plx-move')) return;
    host.setAttribute('data-plx-move', '');
    const rowOf = (el) => { const r = el && el.closest('.tabulator-row'); return r ? table.getRows().find((x) => x.getElement() === r) : null; };
    const clear = () => host.querySelectorAll('.' + B + '__drop').forEach((x) => x.classList.remove(B + '__drop'));
    host.addEventListener('pointerdown', (ev) => { const h = ev.target.closest && ev.target.closest('.' + B + '__cell--handle'); if (h) h.draggable = true; });
    host.addEventListener('dragstart', (ev) => {
      const h = ev.target.closest && ev.target.closest('.' + B + '__cell--handle'); if (!h) return;
      const r = rowOf(h); if (!r) return;
      moving.current = r; r.getElement().classList.add('tabulator-moving');
      ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', String(r.getIndex()));
    });
    host.addEventListener('dragover', (ev) => { const r = rowOf(ev.target); if (!moving.current || !r || r === moving.current) return; ev.preventDefault(); clear(); r.getElement().classList.add(B + '__drop'); });
    host.addEventListener('dragleave', (ev) => { const r = ev.target.closest && ev.target.closest('.tabulator-row'); if (r && !r.contains(ev.relatedTarget)) r.classList.remove(B + '__drop'); });
    host.addEventListener('drop', (ev) => {
      const r = rowOf(ev.target), from = moving.current; clear(); moving.current = null;
      if (!from || !r || r === from) return;
      ev.preventDefault(); from.move(r, true);
      const h = (latest.current.on || {}).rowMoved; if (h) h(from);
    });
    host.addEventListener('dragend', () => { clear(); host.querySelectorAll('.tabulator-moving').forEach((x) => x.classList.remove('tabulator-moving')); moving.current = null; });
  };

  // a header can be dragged onto another to move its column (options.movableColumns), and its edge resizes it: the width
  // snaps to the size tokens (between 80px and the largest token), set as the column's width class
  const wireColumns = (table) => {
    const opt = latest.current.options || {};
    let dragged = null;
    table.getColumns().forEach((col) => {
      const el = col.getElement(), def = col.getDefinition();
      if (!el || el.hasAttribute('data-plx-wired')) return;
      el.setAttribute('data-plx-wired', '');
      if (opt.movableColumns && !def.frozen) {
        el.draggable = true;
        el.addEventListener('dragstart', (ev) => { if (ev.target.closest('.' + B + '__resize')) { ev.preventDefault(); return; } dragged = col; el.classList.add('tabulator-moving'); ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', col.getField() || ''); });
        el.addEventListener('dragend', () => { el.classList.remove('tabulator-moving'); dragged = null; });
        el.addEventListener('dragover', (ev) => { if (dragged && dragged !== col) { ev.preventDefault(); el.classList.add(B + '__drop'); } });
        el.addEventListener('dragleave', () => el.classList.remove(B + '__drop'));
        el.addEventListener('drop', (ev) => { ev.preventDefault(); el.classList.remove(B + '__drop'); if (dragged && dragged !== col) { const from = dragged; dragged = null; from.move(col, true); const h = (latest.current.on || {}).columnMoved; if (h) h(from, table.getColumns()); } });
      }
      // resizable unless the page's column says not (Tabulator's own resizing is off: its handles write styles)
      const mine = (latest.current.columns || []).find((x) => x.field && x.field === col.getField());
      const resizable = !!mine && mine.resizable !== false && !/__cell--(icon|actions|select)|__w-lead/.test(String(def.cssClass || ''));
      if (resizable) {
        const grip = el.ownerDocument.createElement('span'); grip.className = B + '__resize'; grip.setAttribute('aria-hidden', 'true');
        grip.addEventListener('click', (ev) => ev.stopPropagation());
        grip.addEventListener('pointerdown', (ev) => {
          ev.preventDefault(); ev.stopPropagation();
          const x0 = ev.clientX, w0 = el.getBoundingClientRect().width, rtl = getComputedStyle(el).direction === 'rtl' ? -1 : 1;
          const lo = tablePx(MIN, el), hi = SIZE_STEPS[SIZE_STEPS.length - 1];
          const doc = el.ownerDocument;
          const move = (e2) => setWidthClass(col, snapSize(w0 + (e2.clientX - x0) * rtl, lo, hi) + 'px', B);
          const up = () => { doc.removeEventListener('pointermove', move); doc.removeEventListener('pointerup', up); doc.documentElement.classList.remove('is-resizing-columns'); };
          doc.addEventListener('pointermove', move); doc.addEventListener('pointerup', up); doc.documentElement.classList.add('is-resizing-columns');
        });
        el.appendChild(grip);
      }
    });
  };

  // the selection kept by the page (the selected prop) onto the grid
  const syncSelection = (table) => {
    const want = latest.current.selected; if (!want || !table) return;
    const key = latest.current.index || 'id';
    const have = new Set(table.getSelectedData().map((x) => String(x[key]))), goal = new Set(want.map(String));
    if (have.size === goal.size && Array.from(goal).every((k) => have.has(k))) return;
    syncing.current = true;
    table.getSelectedRows().forEach((r) => { if (!goal.has(String(r.getData()[key]))) r.deselect(); });
    table.getRows().forEach((r) => { if (goal.has(String(r.getData()[key])) && !r.isSelected()) r.select(); });
    syncing.current = false;
  };
  React.useEffect(() => { if (builtRef.current) syncSelection(tableRef.current); }, [(selected || []).join(SEP)]);

  // new data in place: sort, filters, scroll and column widths stay. Rows equal to the ones shown (a page that builds its
  // rows again on every render) change nothing.
  const shown = React.useRef(null);
  React.useEffect(() => {
    const table = tableRef.current; if (!table || !builtRef.current) return;
    if (sameRows(shown.current, data || [])) return;
    shown.current = snap(data);
    // new rows clear Tabulator's selection: that is not the person changing it; the page's selection is applied again
    syncing.current = true;
    table.replaceData(data || []).then(() => {
      syncing.current = false;
      syncSelection(table);
      const keep = new Set();
      (function walk(rows) { rows.forEach((r) => { keep.add(String(r[index])); if (r._children) walk(r._children); }); })(data || []);
      let gone = false;
      for (const id of Array.from(cells.current.keys())) if (!keep.has(id.split(SEP)[0])) { cells.current.delete(id); owners.current.delete(id); gone = true; }
      if (gone) bump();
    }).catch(() => { syncing.current = false; });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // React content inside Tabulator's cells: rendered here, mounted there
  const portals = [];
  const table = tableRef.current;
  if (table && builtRef.current) {
    cells.current.forEach((node, id) => {
      const [key, field] = id.split(SEP);
      const c = columns.find((x) => x.field === field);
      const cell = owners.current.get(id);
      if (c && c.render && cell && key) portals.push(ReactDOM.createPortal(c.render(cell.getRow().getData(), cell), node, id));
    });
  }

  return (
    <div ref={frameRef} className={cx(B, columns.some((c) => c.rowLabel) && B + '--row-header', height === '100%' && B + '--fill', className)}
      data-plx-height={height && height !== '100%' ? (sizeName(height) || undefined) : undefined}>
      {error ? <div className={B + '__empty'} role="alert">{STRINGS.failed} {String(error.message || error)}</div> : null}
      <div ref={hostRef} className={B + '__table'} />
      {portals}
    </div>
  );
}

// the interactive table: records to sort, filter, select, open, edit, group or nest
export function DataTable(props) { return <TableEngine {...props} isStatic={false} />; }
// starts loading the engine before the first grid mounts (a page whose first screen has a table calls it as it starts)
DataTable.preload = () => { loadTabulator().catch(() => {}); };
