/* Plenix · DataGrid
   Summary: Every table in Plenix: a Tabulator grid (6.6.1, MIT, vendored in platform/vendor/tabulator) in the Plenix
     grid style (docs/datagrid-tabulator-demo.html, the owner's reference), drawn only with tokens (data-grid.css).
   Usage:
     <DataGrid label="Assets" data={assets} index="id" selectable
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
     columns[].kind: "name" (the row's name, medium weight) | "data" (technical values: the data font, smaller, muted) |
       "icon" (a mark column as wide as the checkbox column; its header shows columns[].icon) | "center" (content
       centered in the row's height: badges, buttons) | "actions" (row action buttons, shown while the row is hovered or
       selected) | "wrap" (long text: it wraps and the row grows; the first line sits where a one-line cell's text does)
     columns[].icon: the Plenix icon name a "kind: icon" column shows in its header (its title is the accessible name)
     columns[].render(data, cell): the cell's content as a React element (badges, buttons, links); state and context work
     columns[].filter: true (contains text) | "list" (one of the column's values): the filter button, shown on hover
     columns[].rowLabel: true: the row header: this column and the columns before it are pinned and shaded like the
       header row (and so is the checkbox column)
     columns[].width, minWidth, maxWidth: a size token ("--plx-ref-size-240px"); a number is read as Tabulator's pixels
     index: the field that identifies a row; default "id"
     selectable: a checkbox column (select all in its header) and row selection; default false. Without it,
       options.selectableRows (Tabulator) selects rows by click (1: one row, as the open row of a list)
     selected: the index values of the selected rows, for a selection kept by the page (bulk actions); with
     onSelectionChange(keys): runs when the person changes the selection (not when selected changes it)
     headerMenu: right-click on a header: sort, clear sort, clear filter, group by, fit, hide, show all; default true
     rowMenu: right-click on a row: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     empty: shown when no row matches; default "Nothing to show"
     height: the grid's height (a size token, or a Tabulator height such as "100%"); with it, rows render as they scroll
     options: any other Tabulator table option (layout, initialSort, groupBy, dataTree, movableColumns, movableRows…)
     on: Tabulator events, { rowClick(e, row), cellEdited(cell), rowSelectionChanged(data, rows), dataSorted(sorters)… };
       with rowClick, rows are focusable and Enter does what a click does
     onReady(table): the Tabulator instance, once built (for anything Tabulator offers)
     className: more classes on the grid's frame
   Behavior:
     The header's sort arrow and filter button show while the header is hovered; a sorted column keeps its arrow and a
     filtered column its button, in the accent color. Right-click opens the header menu or the row menu.
     Hover, selected and selected + hover are three row colors; pinned and row-header cells follow the row.
     The row height and text size follow the density (--plx-sys-grid-row-height, --plx-sys-grid-font-size), also a
     density region's; a density change redraws the grid. A grid built while hidden is drawn again when it is shown.
     Cells edit on double-click (Tabulator editors). Group rows and tree rows are Tabulator's (groupBy, dataTree).
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Nothing on the grid is styled inline by Plenix: Tabulator writes only its own geometry (widths, heights, offsets).
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { cx } from '../../utils/cx.js';
import { loadTabulator, gridPx } from './tabulator.js';

const SEP = '\u0000';
const LEAD = '--plx-comp-data-grid-lead-column-width';   // the checkbox and icon columns
const MIN = '--plx-ref-size-80px';                      // a resizable column's smallest width
const INDENT = '--plx-comp-data-grid-tree-indent';      // a tree row's indent per level
const STRINGS = {
  empty: 'Nothing to show', sortUp: 'Sort A to Z', sortDown: 'Sort Z to A', clearSort: 'Clear sort', clearFilter: 'Clear filter',
  group: 'Group by this column', ungroup: 'Ungroup', fit: 'Fit to content', hide: 'Hide column', showAll: 'Show all columns',
  filter: 'Filter', any: 'Any', contains: 'Contains…', clear: 'Clear', apply: 'Apply', selectRow: 'Select row', item: 'item', items: 'items', failed: 'The grid could not load.'
};

const el = (tag, className, text) => { const e = document.createElement(tag); if (className) e.className = className; if (text != null) e.textContent = text; return e; };
const iconEl = (name) => { const s = el('span', 'plx-icon plx-icon--' + name); s.setAttribute('aria-hidden', 'true'); return s; };
// a menu item's label: its icon box, its text; danger in the danger color
function menuLabel(text, icon, danger) {
  const item = el('span', cx('plx-data-grid__menu-item', danger && 'plx-data-grid__menu-item--danger'));
  const box = el('span', 'plx-data-grid__menu-icon');
  if (icon) box.appendChild(iconEl(icon));
  item.appendChild(box); item.appendChild(el('span', 'plx-data-grid__menu-label', text));
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
const sizeOf = (v, host) => (typeof v === 'string' && /^(var\()?--/.test(v) ? gridPx(v, host) : v);

export function DataGrid(props) {
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
  const [, bump] = React.useReducer((x) => x + 1, 0);
  const [error, setError] = React.useState(null);

  // a container for a React cell, kept per cell so React keeps its state between renders
  const container = (id) => {
    let e = cells.current.get(id);
    if (!e) { e = el('span', 'plx-data-grid__portal'); cells.current.set(id, e); pending.current = true; bump(); }
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
    const lead = gridPx(LEAD, host);
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
    const filterPopup = (c) => (e, column, onRendered) => {
      const field = column.getField(), active = filters(field)[0];
      const id = 'plx-data-grid-filter-' + Math.random().toString(36).slice(2);
      const box = el('div', 'plx-data-grid__filter');
      const lab = el('label', 'plx-data-grid__filter-label', STRINGS.filter + ' ' + (c.title || field)); lab.htmlFor = id;
      let input;
      if (c.filter === 'list') {
        input = el('select', 'plx-input plx-data-grid__filter-input');
        const values = [];
        (function walk(rows) { rows.forEach((r) => { if (r[field] != null && r[field] !== '') values.push(r[field]); if (r._children) walk(r._children); }); })(latest.current.data || []);
        [''].concat(Array.from(new Set(values)).sort()).forEach((v) => { const o = el('option', null, v === '' ? STRINGS.any : String(v)); o.value = v; input.appendChild(o); });
      } else {
        input = el('input', 'plx-input plx-data-grid__filter-input'); input.type = 'text'; input.placeholder = STRINGS.contains;
      }
      input.id = id; input.value = active ? active.value : '';
      const actions = el('div', 'plx-data-grid__filter-actions');
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
      if (c.kind !== 'icon' && c.resizable !== false) items.push({ label: menuLabel(STRINGS.fit, 'expand'), action: (e, col) => col.setWidth(true) });
      items.push({ label: menuLabel(STRINGS.hide, 'visibility-off'), action: (e, col) => col.hide() });
      items.push({ label: menuLabel(STRINGS.showAll, 'visibility'), action: () => T().getColumns().forEach((col) => col.show()) });
      return items;
    };

    return cols.map((c, i) => {
      const { kind, icon, render, filter, rowLabel, ...rest } = c;
      const d = { ...rest };
      ['width', 'minWidth', 'maxWidth'].forEach((k) => { if (d[k] != null) d[k] = sizeOf(d[k], host); });
      d.cssClass = cx(c.cssClass, kind && 'plx-data-grid__cell--' + kind, (rowLabel || (labelAt > i)) && 'plx-data-grid__cell--row-label') || undefined;
      if (labelAt >= i) d.frozen = true;
      if (kind === 'icon') {
        Object.assign(d, { width: lead, minWidth: lead, maxWidth: lead, resizable: false, hozAlign: 'center', headerHozAlign: 'center' });
        d.titleFormatter = () => { const s = el('span', 'plx-data-grid__header-icon'); s.title = c.title || c.field; s.setAttribute('role', 'img'); s.setAttribute('aria-label', s.title); s.appendChild(iconEl(icon || 'circle-info')); return s; };
      }
      if (kind === 'actions') Object.assign(d, { headerSort: false, resizable: false, hozAlign: 'right' });
      if (kind === 'wrap') d.variableHeight = true;
      if (render) d.formatter = (cell) => { const id = String(cell.getRow().getIndex()) + SEP + c.field; owners.current.set(id, cell); return container(id); };
      if (filter) { d.headerPopup = filterPopup(c); d.headerPopupIcon = iconEl('filter').outerHTML; }
      if (headerMenu && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c);
      return d;
    });
  };

  // the column set's shape: a change rebuilds the columns (the data and the cell contents do not)
  const shape = JSON.stringify(columns.map((c) => Object.keys(c).sort().map((k) => (typeof c[k] === 'function' ? k + '()' : k + '=' + JSON.stringify(c[k])))));

  React.useEffect(() => {
    let alive = true, table = null;
    builtRef.current = false;
    // the grid's own window: a grid drawn into a frame runs on that frame's Tabulator
    loadTabulator(hostRef.current && hostRef.current.ownerDocument.defaultView).then((Tabulator) => {
      if (!alive || !hostRef.current) return;
      const host = hostRef.current, lead = gridPx(LEAD, host);
      const p = latest.current;
      const placeholder = el('div', 'plx-data-grid__empty tabulator-placeholder-contents', p.empty || STRINGS.empty);
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
        columnDefaults: { resizable: true, minWidth: gridPx(MIN, host) },
        editTriggerEvent: 'dblclick',
        dataTreeChildIndent: gridPx(INDENT, host),
        rowContextMenu,
        rowHeader: p.selectable ? { formatter: 'rowSelection', titleFormatter: 'rowSelection', headerSort: false, resizable: false, frozen: true,
          width: lead, minWidth: lead, maxWidth: lead, hozAlign: 'center', headerHozAlign: 'center',
          cssClass: cx('plx-data-grid__cell--select', labelled && 'plx-data-grid__cell--row-label'),
          cellClick: (e, cell) => cell.getRow().toggleSelect() } : false,
        selectableRows: p.selectable ? true : false,
        selectableRowsRangeMode: 'click',
        // with a rowClick handler, a row is a Tab stop and Enter does what a click does
        rowFormatter: (row) => {
          const own = latest.current.options && latest.current.options.rowFormatter;
          if (own) own(row);
          const e = row.getElement();
          if (latest.current.on && latest.current.on.rowClick && !e.hasAttribute('data-plx-open')) {
            e.setAttribute('data-plx-open', ''); e.tabIndex = 0;
            e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target === e) { ev.preventDefault(); e.click(); } });
          }
        },
        // a group row: its value and a count, one cell (Tabulator marks it a row group with no rows: axe aria-required-children)
        groupHeader: (value, count) => { const s = el('span', null, String(value)); s.setAttribute('role', 'gridcell'); s.appendChild(el('span', 'plx-data-grid__group-count', count + ' ' + (count === 1 ? STRINGS.item : STRINGS.items))); return s; },
        ...Object.fromEntries(Object.entries(p.options || {}).filter(([k]) => k !== 'rowFormatter')),
        data: p.data || [],

        height: p.height ? sizeOf(p.height, host) : (p.options && p.options.height)
      };
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
        const on = latest.current.on || {};
        Object.keys(on).forEach((ev) => table.on(ev, (...a) => { const h = (latest.current.on || {})[ev]; if (h) h(...a); }));
        table.on('rowSelectionChanged', () => { const q = latest.current; if (!syncing.current && q.onSelectionChange) q.onSelectionChange(table.getSelectedData().map((x) => x[q.index || 'id'])); });
        syncSelection(table);
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
    <div ref={frameRef} className={cx('plx-data-grid', columns.some((c) => c.rowLabel) && 'plx-data-grid--row-header', className)}>
      {error ? <div className="plx-data-grid__empty" role="alert">{STRINGS.failed} {String(error.message || error)}</div> : null}
      <div ref={hostRef} className="plx-data-grid__grid" />
      {portals}
    </div>
  );
}
