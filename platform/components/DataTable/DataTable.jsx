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
     columns[].kind: "name" (the row's name, medium weight) | "data" (technical values: IDs, file names, paths, versions,
       dates and times, sizes, counts, durations: the data font, DM Mono, at the row's own size and line height, so it shares
       the row's baseline; owner, 2026-10-11) |
       "icon" (a mark column as wide as the checkbox column; its header shows columns[].icon) | "center" (content
       centered in the row's height: badges, buttons) | "actions" (row action buttons, shown while the row is hovered or
       selected) | "wrap" (long text: it wraps and the row grows; the first line sits where a one-line cell's text does).
       Two kinds combine as a list: ["name", "data"] (a row named by a file name: medium weight in the data font),
       ["wrap", "data"] (a long path)
     columns[].icon: the Plenix icon name a "kind: icon" column shows in its header (its title is the accessible name)
     columns[].render(data, cell): the cell's content as a React element (badges, buttons, links); state and context work
     columns[].filter: true (contains text) | "list" (one of the column's values): the filter button, shown on hover
     columns[].rowLabel: true: the row header: this column and the columns before it are pinned and shaded like the
       header row (and so is the checkbox column)
     columns[].width: a size token ("--plx-ref-size-240px"; a number snaps to the nearest one), Tabulator's width option;
       without it Tabulator measures the column's content and the column shares the room left with the others.
       minWidth / maxWidth: the narrowest and widest the column gets (size tokens; minWidth default 80px)
     index: the field that identifies a row; default "id"
     selectable: a checkbox column (select all in its header) and row selection; default false. Without it,
       options.selectableRows (Tabulator) selects rows by click (1: one row, as the open row of a list)
     selected: the index values of the selected rows, for a selection kept by the page (bulk actions); with
     onSelectionChange(keys): runs when the person changes the selection (not when selected changes it)
     headerMenu: right-click on a header: sort, clear sort, clear filter, group by, fit, hide, show all; default true
     rowMenu: right-click on a row: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     empty: shown when no row matches; default "Nothing to show"
     error: the rows could not load (a message or an Error): the grid shows the error state, naming the problem
     onRetry(): the error state's one recovery action (Retry); a grid whose engine failed to load retries it as well
     keyColumns: the fields a Narrow grid keeps (its list layout); default the first column plus the next two (icon,
       actions and handle columns are not counted)
     narrow: "list" (the DataTable's default: under 600px of its own width, a list of the key columns) | "table" (the
       static Table's default: the columns stay and scroll sideways)
     storageKey: keeps the person's view (sort, column widths, order and hidden columns) in this browser under the key
       and restores it the next time the grid is built
     height: the grid's height, a size token (the rows scroll inside it), or "100%" (it fills its container); a grid with
       a height draws only the rows in view (virtual rendering)
     options: any other Tabulator table option (layout, initialSort, groupBy, dataTree, movableColumns, movableRows…)
     on: Tabulator events, { rowClick(e, row), cellEdited(cell), rowSelectionChanged(data, rows), dataSorted(sorters)… };
       with rowClick, rows are focusable and Enter does what a click does
     onReady(table): the Tabulator instance, once built (for anything Tabulator offers)
     className: more classes on the grid's frame
     DataTable.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Drag and drop (batch 271): a row handle (a column with rowHandle) shows the grab cursor; the row being moved shows
       grabbing.
     Every drag has a way without dragging (WCAG 2.5.7): a click on a row handle, or the row menu, offers Move up, Move
       down, Move to top and Move to bottom; a focused handle moves its row with Alt + Arrow Up / Down (Alt + Home / End
       to the ends). A column's header menu offers Move left and Move right (options.movableColumns), Narrower and Wider
       (one size token) and Fit to content; its resize handle (Tabulator's: drag it, double-click it to fit the content)
       is a separator that the arrow keys step through the size tokens (Home and End: narrowest and widest).
     Error: the error prop, or an engine that failed to load, shows an inline error state (EmptyState tone="error"): what
       failed and Retry.
     Narrow (platforms.md 6.5): under 600px of its own width (a container query, not the window) the grid becomes a list
       of its key columns: the first is the row's title line, the others the lines under it; the checkbox, the row handle
       and the row actions stay; the header row and the other columns are not shown.
     The header's sort arrow and filter button show while the header is hovered; a sorted column keeps its arrow and a
     filtered column its button, in the accent color. Right-click opens the header menu or the row menu.
     Hover, selected and selected + hover are three row colors; pinned and row-header cells follow the row.
     Geometry (owner, 2026-10-13): the row height, the cell padding and the text size are the density's
     (--plx-sys-data-table-row-height, the cell padding tokens, --plx-sys-data-table-font-size; also a density region's),
     drawn by the stylesheet and never measured. Column widths are Tabulator's: it measures each column's content once
     (and the columns React draws once more after React fills them), the columns without a width share the room left,
     and the resize handle, Narrower, Wider and Fit to content set them. A density change (the page's or the region's,
     or the interaction) measures the columns' content once more, never a row, so a bigger density never cuts text off;
     the widths still round up to the grid, and a width the column gives or the person chose is kept (owner,
     2026-10-14). A grid built while hidden is drawn again in place when it is shown.
     Vertical alignment: middle (owner, 2026-10-13): everything in a cell (text, avatars, badges, icons, checkboxes,
     buttons) sits in the middle of the row's height, in every density and in every row (a row grown by a wrapped cell too:
     its one-line cells sit in the middle; owner, 2026-10-14), in body and header cells; horizontal alignment
     is unchanged (text at the start, numbers at the end, hozAlign). A plain value sits in its own element
     (plx-data-table__value) and ends in an ellipsis.
     Virtual rendering (a grid with a height, every row one height: no "wrap" column and no groupBy): only the rows in
     view are in the document; the rows not drawn are gaps of the density's row height (system/virtual.css), the grid
     carries aria-rowcount and each row its aria-rowindex, a focused control whose row scrolls out leaves the focus on the
     scrolling body and gets it back when its row returns, and printing draws every row. Rows share one height per
     density, and the browser's find in page finds only the rows drawn (the grid's own filters search all of them).
     Cells edit on double-click (Tabulator editors). Group rows and tree rows are Tabulator's (groupBy, dataTree).
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Inline styles (owner, 2026-10-13: a JavaScript adjustment from tokens, defined styles or measured layout is allowed):
       Tabulator writes a column's width (width, min-width, max-width on its column, header and cell elements); it writes
       no row height and no cell padding (the density's). The rest is drawn from classes: Tabulator runs in strict mode
       (strict.js); a cell's alignment is a class (__cell--align-*), a pinned column is
       sticky at the size-token widths before it (its own width a whole size token), a tree row is indented by its level
       class, a hidden column is a class, a menu is placed by CSS anchor positioning, and a virtual grid's room for the
       rows not drawn is gap elements, never padding. The style audit and the pages test reject an inline height, line
       height or padding on a row or cell; check-system (table-geometry) rejects a forced redraw. Moving rows (a rowHandle column with options.movableRows)
       and columns (options.movableColumns) is native drag and drop. Editors "input" and "number" are a Plenix input.
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { cx } from '../../utils/cx.js';
import { loadTabulator, tablePx } from './tabulator.js';
import { remeasure, reshare, virtualResync, virtualPrint } from './strict.js';
import { snapSize, stepSize, SIZE_STEPS } from '../../utils/sizeSteps.js';
import { arrowStep, isRtl } from '../../utils/direction.js';
import { EmptyState } from '../EmptyState/EmptyState.jsx';
import { Button } from '../Button/Button.jsx';

const SEP = '\u0000';
const MIN = '--plx-ref-size-80px';   // the narrowest a resized column gets
const STRINGS = {
  empty: 'Nothing to show', sortUp: 'Sort A to Z', sortDown: 'Sort Z to A', clearSort: 'Clear sort', clearFilter: 'Clear filter',
  group: 'Group by this column', ungroup: 'Ungroup', fit: 'Fit to content', hide: 'Hide column', showAll: 'Show all columns',
  filter: 'Filter', any: 'Any', contains: 'Contains…', clear: 'Clear', apply: 'Apply', selectRow: 'Select row', item: 'item', items: 'items',
  failed: 'The table could not load', retry: 'Retry', moveUp: 'Move up', moveDown: 'Move down', moveTop: 'Move to top', moveBottom: 'Move to bottom',
  moveRow: 'Move row', moveLeft: 'Move left', moveRight: 'Move right', narrower: 'Narrower', wider: 'Wider', resize: 'Resize'
};
const VIEW = 'plx-data-table:';   // the browser storage prefix of a kept view (storageKey)
const readView = (key) => { try { const s = window.localStorage.getItem(VIEW + key); return s ? JSON.parse(s) : null; } catch (e) { return null; } };
const writeView = (key, v) => { try { window.localStorage.setItem(VIEW + key, JSON.stringify(v)); } catch (e) { /* storage off: the view is not kept */ } };
// the columns a Narrow grid can keep: data columns (not the icon, actions or handle columns)
const listable = (c) => !!c.field && c.kind !== 'icon' && c.kind !== 'actions' && !c.rowHandle;
const keyFields = (cols, want) => (want && want.length ? want.slice() : cols.filter(listable).slice(0, 3).map((c) => c.field));

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
// a plain value in its own element, so the cell aligns it to the middle of the row and a long value still ends in an ellipsis
function valueFormatter(cell) {
  const v = cell.getValue(), s = document.createElement('span');
  s.className = 'plx-data-table__value'; s.textContent = v == null ? '' : String(v);
  return s;
}
// a width kept in the view ("240px", or a number) as pixels
const viewPx = (v) => (typeof v === 'number' ? v : /^\d+(\.\d+)?px$/.test(String(v)) ? parseFloat(v) : 0);

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
  const { label, data, columns, index = 'id', selectable = false, selected, headerMenu = true, rowMenu, empty, height, options, className,
    error: failure, onRetry, keyColumns, narrow = isStatic ? 'table' : 'list', storageKey } = props;
  // the Narrow list: its key columns, and whether it hides any (a grid whose columns are all key columns stays a table)
  const keys = keyFields(columns, keyColumns);
  const listed = narrow === 'list' && columns.some((c) => listable(c) && keys.indexOf(c.field) < 0);
  // virtual rendering: a grid with a height whose rows are all one height (no wrapping column, no group rows)
  const virtual = !!height && !columns.some((c) => [].concat(c.kind || []).indexOf('wrap') >= 0) && !(options || {}).groupBy;
  const [attempt, setAttempt] = React.useState(0);   // a Retry after the engine failed to load builds the grid again
  const resized = React.useRef({});   // the widths the person chose (field -> size name), for the kept view
  const restoring = React.useRef(false);
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
  // once React has filled the first cells, Tabulator measures the content of the columns React draws again (it measured
  // them empty), and only those: no row is measured (a row is the density's height) and later fills change no width
  const measured = React.useRef(false);
  React.useLayoutEffect(() => {
    if (!pending.current || !tableRef.current || !builtRef.current) return undefined;
    if (measured.current) { pending.current = false; return undefined; }
    const t = tableRef.current;
    const id = requestAnimationFrame(() => {
      if (tableRef.current !== t) return;
      pending.current = false;
      if (!t.element.offsetWidth) return;   // hidden: measured in full when it is shown
      measured.current = true;
      const drawn = new Set((latest.current.columns || []).filter((c) => c.render && c.field).map((c) => c.field));
      remeasure(t, t.getColumns().filter((c) => drawn.has(c.getField())));
    });
    return () => cancelAnimationFrame(id);
  });

  // the person's view, kept under storageKey: written after each change they make (not while it is being restored)
  const saveView = () => {
    const t = tableRef.current, key = latest.current.storageKey;
    if (!key || !t || restoring.current) return;
    writeView(key, {
      sort: t.getSorters().map((s) => ({ column: s.field, dir: s.dir })),
      widths: resized.current,
      order: t.getColumns().map((c) => c.getField()).filter(Boolean),
      hidden: t.getColumns().filter((c) => !c.isVisible()).map((c) => c.getField()).filter(Boolean),
    });
  };
  // the kept view onto a grid just built: what still fits its columns (a field that is gone is skipped)
  const restoreView = (t) => {
    const key = latest.current.storageKey, v = key ? readView(key) : null;
    resized.current = {};
    if (!v) return;
    restoring.current = true;
    try {
      const col = (f) => t.getColumns().find((c) => c.getField() === f);
      const order = (v.order || []).filter(col);
      order.forEach((f, i) => { const c = col(f), prev = i ? col(order[i - 1]) : null; if (c && prev && !c.getDefinition().frozen && !prev.getDefinition().frozen) c.move(prev, true); });
      Object.keys(v.widths || {}).forEach((f) => { const c = col(f), px = viewPx(v.widths[f]); if (c && px) { c.setWidth(px); resized.current[f] = Math.round(px) + 'px'; } });
      (v.hidden || []).forEach((f) => { const c = col(f); if (c) c.hide(); });
      const sort = (v.sort || []).filter((s) => col(s.column) && (s.dir === 'asc' || s.dir === 'desc'));
      if (sort.length) t.setSort(sort);
    } catch (e) { /* a view kept for another column set: what fits is restored */ }
    restoring.current = false;
  };
  // a column's width is Tabulator's (its resize handle, the header menu, Fit to content): the person's width is kept in
  // the view, and the resize handle says it (aria-valuenow)
  const keepWidth = (col) => {
    const w = Math.round(col.getWidth());
    if (col.getField()) resized.current[col.getField()] = w + 'px';
    const grip = gripOf(col); if (grip) grip.setAttribute('aria-valuenow', String(w));
    saveView();
  };
  const applyWidth = (col, px) => { col.setWidth(px); keepWidth(col); };
  const widthLimits = (el) => [tablePx(MIN, el), SIZE_STEPS[SIZE_STEPS.length - 1]];
  const stepWidth = (col, dir) => { const [lo, hi] = widthLimits(col.getElement()); applyWidth(col, stepSize(col.getWidth(), dir, lo, hi)); };
  // Tabulator's resize handle of a column (it sits after the column's header)
  const gripOf = (col) => { const c = col && col._column; return (c && c.modules.resize && c.modules.resize.handleEl) || null; };
  // a column one place left or right (the header menu): past hidden columns, never into the pinned ones
  const moveColumn = (col, step) => {
    const dir = isRtl(col.getElement()) ? -step : step;
    let to = dir < 0 ? col.getPrevColumn() : col.getNextColumn();
    while (to && !to.isVisible()) to = dir < 0 ? to.getPrevColumn() : to.getNextColumn();
    if (!to || to.getDefinition().frozen) return;
    col.move(to, dir > 0);
    const h = (latest.current.on || {}).columnMoved; if (h) h(col, tableRef.current.getColumns());
    saveView();
  };
  // a row one place up or down, or to the top or bottom (the handle's menu, the row menu, Alt + the arrow keys)
  const moveRow = (row, where) => {
    const t = tableRef.current; if (!t) return false;
    const rows = t.getRows('active'), prev = row.getPrevRow(), next = row.getNextRow();
    // (Tabulator's row.move(target, true) places the row above the target, false below it)
    if (where === 'up' && prev) row.move(prev, true);
    else if (where === 'down' && next) row.move(next, false);
    else if (where === 'top' && prev) row.move(rows[0], true);
    else if (where === 'bottom' && next) row.move(rows[rows.length - 1], false);
    else return false;
    const h = (latest.current.on || {}).rowMoved; if (h) h(row);
    return true;
  };
  const rowMoveItems = (row) => {
    const up = !row.getPrevRow(), down = !row.getNextRow();
    return [
      { label: menuLabel(STRINGS.moveUp, 'chevron-up'), disabled: up, action: () => moveRow(row, 'up') },
      { label: menuLabel(STRINGS.moveDown, 'chevron-down'), disabled: down, action: () => moveRow(row, 'down') },
      { label: menuLabel(STRINGS.moveTop), disabled: up, action: () => moveRow(row, 'top') },
      { label: menuLabel(STRINGS.moveBottom), disabled: down, action: () => moveRow(row, 'bottom') }
    ];
  };

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
    // Fit to content: Tabulator measures the column's content (as a double-click on its resize handle does)
    const fitColumn = (col) => { col.setWidth(true); keepWidth(col); };
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
    const headerItems = (c, pinned) => () => {
      const items = [];
      // moving a column without dragging it (WCAG 2.5.7): one place left or right
      if ((latest.current.options || {}).movableColumns && !pinned) {
        items.push({ label: menuLabel(STRINGS.moveLeft, 'chevron-left'), action: (e, col) => moveColumn(col, -1) });
        items.push({ label: menuLabel(STRINGS.moveRight, 'chevron-right'), action: (e, col) => moveColumn(col, 1) });
        items.push({ separator: true });
      }
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
      // the width without dragging: one size token narrower or wider, or fitted to the content
      if (c.kind !== 'icon' && c.kind !== 'actions' && c.resizable !== false) {
        items.push({ label: menuLabel(STRINGS.narrower), action: (e, col) => stepWidth(col, -1) });
        items.push({ label: menuLabel(STRINGS.wider), action: (e, col) => stepWidth(col, 1) });
        items.push({ label: menuLabel(STRINGS.fit, 'expand'), action: (e, col) => fitColumn(col) });
      }
      items.push({ label: menuLabel(STRINGS.hide, 'visibility-off'), action: (e, col) => { col.hide(); saveView(); } });
      items.push({ label: menuLabel(STRINGS.showAll, 'visibility'), action: () => { T().getColumns().forEach((col) => col.show()); saveView(); } });
      return items;
    };

    return cols.map((c, i) => {
      const { kind, icon, render, filter, rowLabel, ...rest } = c;
      const d = { ...rest };
      if (isStatic) { Object.assign(d, { headerSort: false, resizable: false }); delete d.editor; delete d.headerContextMenu; delete d.headerPopup; delete d.cellClick; delete d.rowHandle; }
      // the width (owner, 2026-10-13): Tabulator measures the content, and the columns without a width share the room
      // left (strict.js, the "plenix" layout); a width the column asks for (a size token; a number snaps to the nearest
      // one) is Tabulator's width option; a mark column is the lead width. Tabulator writes the width on the column's
      // header and cells (a JavaScript adjustment from measured layout; owner, 2026-10-13).
      const lead = kind === 'icon';
      const leadPx = tablePx('--plx-comp-data-table-lead-column-width', host), floor = tablePx(MIN, host);
      const wName = lead ? null : sizeName(d.width, host), minName = sizeName(d.minWidth, host), maxName = sizeName(d.maxWidth, host);
      const w = lead ? leadPx : wName ? parseInt(wName, 10) : undefined;
      const hz = lead ? 'center' : d.hozAlign, hh = lead ? 'center' : d.headerHozAlign;
      const align = hz && hz !== 'left' ? B + '__cell--align-' + hz : null;
      const headAlign = hh && hh !== 'left' ? B + '__head-align-' + hh : null;
      const pinned = labelAt >= i || !!c.frozen;
      ['width', 'minWidth', 'maxWidth', 'hozAlign', 'headerHozAlign', 'vertAlign', 'widthGrow', 'widthShrink'].forEach((k) => { delete d[k]; });
      if (w) d.width = w;
      d.minWidth = lead ? leadPx : minName ? parseInt(minName, 10) : w ? Math.min(w, floor) : floor;
      if (lead) d.maxWidth = leadPx; else if (maxName) d.maxWidth = parseInt(maxName, 10);
      // resizable where interaction is on: Tabulator's resize handle on the header (not on pinned, mark or action columns)
      d.resizable = !isStatic && !lead && kind !== 'actions' && !pinned && c.resizable !== false ? 'header' : false;
      d.cssClass = cx(c.cssClass, kind && [].concat(kind).map((k) => B + '__cell--' + k).join(' '), (rowLabel || (labelAt > i)) && B + '__cell--row-label',
        lead && B + '__w-lead', align, headAlign, c.rowHandle && B + '__cell--handle',
        keys.indexOf(c.field) >= 0 && B + '__cell--key', keys.indexOf(c.field) === 0 && B + '__cell--key-first') || undefined;
      if (d.editor === 'input' || d.editor === 'number') d.editor = plenixEditor(d.editor === 'number' ? 'number' : 'text');
      if (labelAt >= i) d.frozen = true;
      // a plain value: in its own element (vertical alignment: middle, with its ellipsis)
      if (!render && !c.rowHandle && (d.formatter === undefined || d.formatter === 'plaintext')) d.formatter = valueFormatter;
      if (lead) {
        // the lead width and centered (its classes)
        d.titleFormatter = () => { const s = el('span', B + '__header-icon'); s.title = c.title || c.field; s.setAttribute('role', 'img'); s.setAttribute('aria-label', s.title); s.appendChild(iconEl(icon || 'circle-info')); return s; };
      }
      if (kind === 'actions') Object.assign(d, { headerSort: false, resizable: false });
      if (render) d.formatter = (cell) => { const id = String(cell.getRow().getIndex()) + SEP + c.field; owners.current.set(id, cell); return container(id); };
      if (filter && !isStatic) { d.headerPopup = filterPopup(c); d.headerPopupIcon = iconEl('filter').outerHTML; }
      if (headerMenu && !isStatic && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c, labelAt >= i || !!c.frozen);
      // a click on a row handle opens its move menu (a way to move rows without dragging; WCAG 2.5.7)
      if (c.rowHandle && !isStatic && (latest.current.options || {}).movableRows && d.clickMenu === undefined) d.clickMenu = (e, cell) => rowMoveItems(cell.getRow());
      return d;
    });
  };

  // the column set's shape: a change rebuilds the columns (the data and the cell contents do not)
  const shape = JSON.stringify(columns.map((c) => Object.keys(c).sort().map((k) => (typeof c[k] === 'function' ? k + '()' : k + '=' + JSON.stringify(c[k])))));

  React.useEffect(() => {
    let alive = true, table = null;
    builtRef.current = false; measured.current = false;
    // the grid's own window: a grid drawn into a frame runs on that frame's Tabulator; a document that has lost its window
    // (a frame that loaded again meanwhile) gets no grid
    const win = hostRef.current && hostRef.current.ownerDocument.defaultView;
    if (!win) return undefined;
    loadTabulator(win).then((Tabulator) => {
      if (!alive || !hostRef.current || !hostRef.current.ownerDocument.defaultView) return;
      const host = hostRef.current;
      const p = latest.current;
      const placeholder = el('div', B + '__empty tabulator-placeholder-contents', p.empty || STRINGS.empty);
      // the row menu: the page's items, then (movable rows) the moves
      const movable = !isStatic && !!(p.options || {}).movableRows;
      const rowContextMenu = p.rowMenu || movable ? (e, row) => {
        const cur = latest.current.rowMenu, d = row.getData();
        const list = typeof cur === 'function' ? cur(d) : cur;
        const items = (list || []).map((it) => (it.separator ? { separator: true } : {
          label: menuLabel(it.label, it.icon, it.danger),
          disabled: typeof it.disabled === 'function' ? it.disabled(d) : !!it.disabled,
          action: () => it.onSelect && it.onSelect(d, row)
        }));
        if (movable) { if (items.length) items.push({ separator: true }); items.push(...rowMoveItems(row)); }
        return items;
      } : undefined;
      const labelled = p.columns.some((c) => c.rowLabel);
      const leadPx = tablePx('--plx-comp-data-table-lead-column-width', host);
      const opts = {
        // the columns: Tabulator measures their content, and the columns without a width share the room left (strict.js)
        layout: 'plenix',
        index: p.index || 'id',
        placeholder,
        columnDefaults: { resizable: false },
        // a grid with a height draws the rows in view (every row is the density's height); one without draws them all
        renderVertical: virtual ? 'virtual' : 'basic',
        editTriggerEvent: 'dblclick',
        rowContextMenu,
        // the row checkbox toggles its row (batch 246): Tabulator's own one, in the "click" range mode the rows use, makes a
        // plain click mean "only this row", so a checked box could not be unchecked; Shift and Ctrl/Cmd keep their range
        // and add meanings. The header checkbox stays Tabulator's (select all / none).
        rowHeader: p.selectable ? { formatter: rowCheckbox, titleFormatter: 'rowSelection', headerSort: false, resizable: false, frozen: true,
          width: leadPx, minWidth: leadPx, maxWidth: leadPx,
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
        // a row handle is a Tab stop: Enter or Space opens its move menu, Alt + the arrow keys move the row
        if (table && !isStatic) nameGrips(table);
        if (movable) host.querySelectorAll('.tabulator-row .' + B + '__cell--handle').forEach((h) => {
          if (h.hasAttribute('aria-keyshortcuts')) return;
          h.tabIndex = 0; h.setAttribute('aria-label', STRINGS.moveRow); h.setAttribute('aria-haspopup', 'menu');
          h.setAttribute('aria-keyshortcuts', 'Alt+ArrowUp Alt+ArrowDown Alt+Home Alt+End');
        });
      };
      table.on('renderComplete', aria);
      table.on('tableBuilt', () => {
        aria(); builtRef.current = true;
        const on = isStatic ? {} : latest.current.on || {};
        Object.keys(on).forEach((ev) => table.on(ev, (...a) => { const h = (latest.current.on || {})[ev]; if (h) h(...a); }));
        table.on('rowSelectionChanged', () => { const q = latest.current; if (!syncing.current && q.onSelectionChange) q.onSelectionChange(table.getSelectedData().map((x) => x[q.index || 'id'])); });
        syncSelection(table);
        if (!isStatic) {
          wireColumns(table); wireRows(table, host);
          restoreView(table); table.on('dataSorted', () => saveView());
        }
        if (latest.current.onReady) latest.current.onReady(table);
        bump();
      });
    }).catch((err) => { if (alive) setError(err); });

    // a density or interaction change: the stylesheet gives the rows their new height and padding (no row is measured);
    // the columns' content widths are measured once again (the text size and padding changed: widths still round up to
    // the grid; a set or chosen width is kept); a virtual grid takes the new row height for the rows it does not draw,
    // and keeps the row at the top of its view
    const region = frameRef.current && frameRef.current.closest('[data-plx-density]');
    const densityKey = () => ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction'].map((a) => document.documentElement.getAttribute(a)).concat(region ? region.getAttribute('data-plx-density') : '').join('|');
    let lastDensity = densityKey();
    const mo = new MutationObserver(() => {
      const t = tableRef.current; if (!t || !builtRef.current) return;
      const now = densityKey(); if (now === lastDensity) return;
      lastDensity = now;
      virtualResync(t); remeasure(t, t.getColumns());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction'] });
    if (region && region !== document.documentElement) mo.observe(region, { attributes: true, attributeFilter: ['data-plx-density'] });
    // a grid built while hidden (a closed tab, a section not shown) had no size to lay out in: once it is shown, it is
    // drawn again in place (its columns are measured then; no row is)
    // and a grid whose width changes shares the room among its columns again (nothing is measured)
    let shownBefore = !!(frameRef.current && frameRef.current.offsetWidth), lastWidth = frameRef.current ? frameRef.current.offsetWidth : 0, frame = 0;
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      const width = frameRef.current ? frameRef.current.offsetWidth : 0, now = !!width;
      if (now && !shownBefore && tableRef.current && builtRef.current) tableRef.current.redraw();
      else if (now && width !== lastWidth && tableRef.current && builtRef.current && !frame) frame = requestAnimationFrame(() => { frame = 0; if (tableRef.current) reshare(tableRef.current); });
      shownBefore = now; lastWidth = width;
    });
    if (ro && frameRef.current) ro.observe(frameRef.current);
    // printing a virtual grid: every row is in the document while the page prints (React fills their cells first)
    const printing = (on) => () => { const t = tableRef.current; if (!t || !builtRef.current || !virtual) return; virtualPrint(t, on); if (on) ReactDOM.flushSync(() => bump()); };
    const beforePrint = printing(true), afterPrint = printing(false);
    win.addEventListener('beforeprint', beforePrint); win.addEventListener('afterprint', afterPrint);

    return () => {
      alive = false; mo.disconnect(); if (ro) ro.disconnect(); if (frame) cancelAnimationFrame(frame); builtRef.current = false;
      win.removeEventListener('beforeprint', beforePrint); win.removeEventListener('afterprint', afterPrint);
      if (table) { try { table.destroy(); } catch (e) { /* already gone */ } }
      tableRef.current = null; cells.current = new Map(); owners.current = new Map();
    };
    // built once per column shape; the data is replaced in place below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, selectable, headerMenu, !!rowMenu, typeof height === 'string' ? height : '', keys.join(SEP), attempt, storageKey || '', virtual]);

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
    // the keyboard on a focused handle: Enter or Space opens its menu; Alt + Arrow Up / Down (Home / End) moves the row,
    // and the handle keeps the focus
    host.addEventListener('keydown', (ev) => {
      const h = ev.target.closest && ev.target.closest('.tabulator-row .' + B + '__cell--handle');
      if (!h || ev.target !== h) return;
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); h.click(); return; }
      const where = ev.altKey ? { ArrowUp: 'up', ArrowDown: 'down', Home: 'top', End: 'bottom' }[ev.key] : null;
      const r = where && rowOf(h); if (!r) return;
      ev.preventDefault();
      if (moveRow(r, where)) requestAnimationFrame(() => { const c = r.getElement().querySelector('.' + B + '__cell--handle'); if (c) c.focus(); });
    });
  };

  // a header can be dragged onto another to move its column (options.movableColumns); its edge is Tabulator's resize
  // handle (drag it, or double-click it to fit the content), kept in the view
  const wireColumns = (table) => {
    const opt = latest.current.options || {};
    let dragged = null;
    table.getColumns().forEach((col) => {
      const el = col.getElement(), def = col.getDefinition();
      if (!el || el.hasAttribute('data-plx-wired')) return;
      el.setAttribute('data-plx-wired', '');
      if (opt.movableColumns && !def.frozen) {
        el.draggable = true;
        el.addEventListener('dragstart', (ev) => { if (ev.target.closest('.tabulator-col-resize-handle')) { ev.preventDefault(); return; } dragged = col; el.classList.add('tabulator-moving'); ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', col.getField() || ''); });
        el.addEventListener('dragend', () => { el.classList.remove('tabulator-moving'); dragged = null; });
        el.addEventListener('dragover', (ev) => { if (dragged && dragged !== col) { ev.preventDefault(); el.classList.add(B + '__drop'); } });
        el.addEventListener('dragleave', () => el.classList.remove(B + '__drop'));
        el.addEventListener('drop', (ev) => { ev.preventDefault(); el.classList.remove(B + '__drop'); if (dragged && dragged !== col) { const from = dragged; dragged = null; from.move(col, true); const h = (latest.current.on || {}).columnMoved; if (h) h(from, table.getColumns()); saveView(); } });
      }
    });
    if (table.plxWired) return;
    table.plxWired = true;
    // a width the person gave with the handle (drag, or double-click to fit) is kept in the view
    table.on('columnResized', (col) => keepWidth(col));
    // the handle is a separator: focused and stepped through the size tokens with the arrow keys (Home and End: the
    // narrowest and widest), as well as dragged (WCAG 2.5.7 and 2.1.1)
    table.element.addEventListener('keydown', (ev) => {
      const grip = ev.target.closest && ev.target.closest('.tabulator-col-resize-handle');
      const col = grip && table.getColumns().find((c) => gripOf(c) === grip);
      if (!col) return;
      const [lo, hi] = widthLimits(col.getElement()), step = arrowStep(ev, col.getElement(), { vertical: false });
      const to = step ? stepSize(col.getWidth(), step, lo, hi) : ev.key === 'Home' ? snapSize(lo, lo, hi) : ev.key === 'End' ? snapSize(hi, lo, hi) : null;
      if (to == null) return;
      ev.preventDefault(); ev.stopPropagation(); applyWidth(col, to);
    });
  };
  // Tabulator's resize handles, named and focusable (each time they are drawn); the header keeps its own name (its title)
  const nameGrips = (table) => {
    table.getColumns().forEach((col) => {
      const grip = gripOf(col), el = col.getElement();
      if (!grip) return;
      if (grip.hasAttribute('data-plx-grip')) { grip.setAttribute('aria-valuenow', String(Math.round(col.getWidth()))); return; }
      const title = String(col.getDefinition().title || col.getField() || ''), [lo, hi] = widthLimits(el);
      grip.setAttribute('data-plx-grip', '');
      grip.classList.add(B + '__resize');
      grip.setAttribute('role', 'separator'); grip.setAttribute('aria-orientation', 'vertical'); grip.tabIndex = 0;
      grip.setAttribute('data-plx-target-equivalent', 'the header menu: Narrower, Wider, Fit to content (WCAG 2.5.8 Equivalent)');
      grip.setAttribute('aria-label', STRINGS.resize + ' ' + title);
      grip.setAttribute('aria-valuemin', String(lo)); grip.setAttribute('aria-valuemax', String(hi));
      grip.setAttribute('aria-valuenow', String(Math.round(col.getWidth()) || lo));
      if (title && !el.hasAttribute('aria-label')) el.setAttribute('aria-label', title);
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
      if (!c || !c.render || !cell || !key) return;
      // one element is the cell's own content (vertical alignment: middle); text, or text with elements (a sentence with a code
      // part), flows as one line of text in a value element, as a plain value does
      // (a list or fragment holding one element and no text is that element)
      const flat = (x) => (Array.isArray(x) ? x.flatMap(flat) : React.isValidElement(x) && x.type === React.Fragment ? flat(x.props.children) : x == null || x === false || x === '' || (typeof x === 'string' && !x.trim()) ? [] : [x]);
      const raw = c.render(cell.getRow().getData(), cell), only = flat(raw);
      const out = only.length === 1 && React.isValidElement(only[0]) ? only[0] : raw;
      const flow = out != null && out !== false && (typeof out !== 'object' || Array.isArray(out) || (React.isValidElement(out) && out.type === React.Fragment));
      portals.push(ReactDOM.createPortal(flow ? <span className={B + '__value'}>{out}</span> : out, node, id));
    });
  }

  // the error state (platforms.md 5.5: it names the problem, one action recovers): the page's failure, or the engine's
  const failed = failure || error;
  const retry = () => { if (error) { setError(null); setAttempt((n) => n + 1); } if (onRetry) onRetry(); };
  const reason = failed && failed !== true ? String(failed.message || failed) : null;
  return (
    <div ref={frameRef} className={cx(B, columns.some((c) => c.rowLabel) && B + '--row-header', height === '100%' && B + '--fill', listed && B + '--list', className)} data-plx-render={virtual ? 'virtual' : undefined}
      data-plx-height={height && height !== '100%' ? (sizeName(height) || undefined) : undefined}>
      {failed ? (
        <EmptyState className={B + '__error'} tone="error" title={STRINGS.failed}
          action={error || onRetry ? <Button size="sm" icon="refresh" onClick={retry}>{STRINGS.retry}</Button> : null}>{reason}</EmptyState>
      ) : null}
      <div ref={hostRef} className={B + '__table'} hidden={failed ? true : undefined} />
      {portals}
    </div>
  );
}

// the interactive table: records to sort, filter, select, open, edit, group or nest
export function DataTable(props) { return <TableEngine {...props} isStatic={false} />; }
// starts loading the engine before the first grid mounts (a page whose first screen has a table calls it as it starts)
DataTable.preload = () => { loadTabulator().catch(() => {}); };
