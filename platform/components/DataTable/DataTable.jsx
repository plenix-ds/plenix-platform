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
       selected) | "wrap" (long text: in a DataTable it never grows the row, owner 2026-10-14: one line in a Short row, the
       lines that fit in a taller one, then an ellipsis; the static Table's wrapping rows grow).
       Two kinds combine as a list: ["name", "data"] (a row named by a file name: medium weight in the data font),
       ["wrap", "data"] (a long path)
     columns[].type: what the column holds, for the icon before its name and its sort words in the column menu: "text"
       (the default) | "number" | "currency" | "date" | "select" | "checkbox" | "file" | "image" | "link" | "person" |
       "long-text"; without it, kind "wrap" is long text, sorter "number" a number, sorter "date" a date
     columns[].summary: "sum" | "count" | "average" | "min" | "max": the column's summary in each group header (grouped
       tables; off by default), its value in the data font
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
     headerMenu: the column menu: the header's chevron button (shown while the header is hovered: the thin outline chevron,
       muted; owner, 2026-10-14), right-click on a header, or Shift + F10 on a focused one; default true. In sections like
       Airtable's (owner, 2026-10-14): (1) columnMenu's items, (2) sort in the type's words (A → Z, 1 → 9, Oldest → newest,
       Unchecked → checked) and Clear sort, (3) Filter by this field, Clear filter, Group by this field, Ungroup,
       (4) Narrower, Wider, Fit to content, Move left, Move right, (5) Hide field, Show all fields
     columnMenu: the application's field actions, first in the column menu: [{ label, icon, onSelect(column, col), danger,
       disabled, separator }] (Edit field, Duplicate, Insert left, Insert right, Delete…), or (column) => that list
     rowMenuButton: with rowMenu, a sticky last-column ghost button (default true); false keeps right-click only
     keepHiddenSelection: true (default) keeps selected rows hidden by filters; false deselects them
     onSelectionChange(keys, selection): selection is { count, hidden }, for CommandBar selection.hidden
     rowMenu: the button or right-click opens items: label, icon, danger, disabled, separator,
       onSelect(data, row); action(data, row) is an alias. Development warns once for items with neither handler.
       Item list: [{ label, icon, onSelect(data, row), danger, disabled, separator }], or
       (data) => that list
     rowHeight: the record rows' height step (owner, 2026-10-14): "short" (default: the density's row height, 28 / 32 /
       40) | "medium" (56px) | "tall" (88px) | "extra-tall" (128px), the same at every density; the person changes it in the
       view menu (kept in the view with storageKey)
     wrapHeaders: column names wrap onto two lines and the header row is two lines tall (a fixed token); default false;
       also in the view menu
     viewMenu: the table's own view button at the end of the header row (Row height, Wrap headers); default false (owner,
       2026-10-14: the row height lives only in the page's View menu, the command bar's ViewMenu, which sets rowHeight)
     The page's view (owner, 2026-10-14: the command bar's panels drive the table through these; each applies when it
     changes, and leaving one undefined leaves that part to the person's own header actions):
     filter(row): which rows show (the FilterPanel's and quick filters' test, utils/fields.js matchesFilter); added to
       the header filters, applied again when the function changes
     sort: [{ field, dir: "asc" | "desc" }], the first the main sort (the SortPanel's levels, the GroupPanel's first)
     groupBy: a field, a list of fields (nested groups, the GroupPanel's levels) or false
     columnOrder: the fields in their order (the ColumnsMenu's); pinned columns keep their place
     hiddenColumns: the fields not shown (the ColumnsMenu's)
     onAddToGroup(value, path): a grouped table's add row: a + one Short row tall at the end of each group; off without it
     strings: the words the grid writes (menus, the view menu, group rows, the filter popup, the footer), to replace
     empty: shown when no row matches; default "Nothing to show"
     error: the rows could not load (a message or an Error): the grid shows the error state, naming the problem
     onRetry(): the error state's one recovery action (Retry); a grid whose engine failed to load retries it as well
     keyColumns: the fields a Narrow grid keeps (its list layout); default the first column plus the next two (icon,
       actions and handle columns are not counted)
     narrow: "list" (the DataTable's default: under 600px of its own width, a list of the key columns) | "table" (the
       static Table's default: the columns stay and scroll sideways)
     storageKey: keeps the person's view (sort, column widths, order and hidden columns, the row height step, Wrap
       headers, the grouping and its closed groups) in this browser under the key and restores it the next time the grid
       is built
     mode: how the grid handles many rows (owner, 2026-10-14: "each application has its own needs"):
       "fill" (the default): the grid fills the room left on screen (its scrolling pane's, or the window's, under where
         it starts) and its rows scroll inside it; only the rows in view are drawn (virtual rendering), so a large table
         is always fast. A grid shorter than the room is as tall as its rows.
       "pages": pages of rows (pageSize a page, 50 by default) and a footer under the grid: the range ("101–150 of 560",
         the data font), the rows-per-page choice (a Select of pageSizes) and Pagination. Every row of the page is drawn;
         the page grows with them (no scrolling inside, unless height is given).
       "load-more": the first pageSize rows, then pageSize more each time the person reaches the bottom (the last row
         comes into view: an IntersectionObserver) or presses Load more in the footer (the keyboard and screen-reader
         way; it shows the count, "150 of 560"); how many rows came is announced politely. Fills the room as "fill" does.
       The static Table ignores it: it draws every row.
     pageSize: the rows of a page ("pages") or of each load ("load-more"); default 50
     pageSizes: the rows-per-page choices of "pages"; default [25, 50, 100]
     fetchRows({ page, size, sort, filters, search }): rows from a server, for "pages" and "load-more": page is 1-based,
       sort [{ field, dir: "asc" | "desc" }] (the headers' sort), filters [{ field, type: "like" | "=", value }] (the
       headers' filters), search the search prop; returns (a promise of) { rows, total }. With it the grid sorts and
       filters on the server (Tabulator's remote pagination, sort and filter modes) and data is not used; a rejected
       promise shows the error state (Retry asks again).
     search: the page's search text, passed to fetchRows; a change asks for the first rows again
     height: the grid's height, a size token (the rows scroll inside it), or "100%" (it fills its container); it replaces
       the room "fill" and "load-more" measure
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
     Two settings (owner, 2026-10-14): the app's density (Compact, Standard, Comfortable: the text size and the Short row)
     and each table's row height step (rowHeight, the view menu). Short is the density's row height; Medium, Tall and
     Extra tall are fixed tokens (56, 88, 128px) at every density. Only record rows take the step: the header row (the
     density's row height, or two lines with Wrap headers), group header rows, the add row and the group gap keep theirs.
     Vertical alignment and padding: a Short row puts everything in a cell (text, avatars, badges, icons, checkboxes,
     buttons) in the middle of its height (owner, 2026-10-13), in body and header cells. A taller row puts it at the top:
     P from the top, where P is a Short row's own padding ((the density row height − the text line height) / 2: 6px in
     Standard), each item in the middle of the first line, so one-line content sits exactly where it does in a Short row;
     the minimum room is P at the top and at the bottom: text wraps and ends in an ellipsis on the last line that leaves
     at least P below it, and a picture (img, Thumbnail) fills the row less P above and below, keeping its aspect.
     Horizontal alignment is unchanged (text at the start, numbers at the end, hozAlign). A plain value sits in its own
     element (plx-data-table__value) and ends in an ellipsis.
     Column headers (owner, 2026-10-14): the column type's icon before its name (columns[].type; hidden in Compact, where
     the header row is 28px); a name cut with an ellipsis has its full name as its tooltip (title).
     Group rows, Airtable style (owner, 2026-10-14; options.groupBy, or Group by this field): a group header row is the
     density row height + 16px (48px in Standard) at every row height step, on the neutral sunken surface: in the first
     column (with the mark columns before it) a chevron, the grouped-by field's name as an eyebrow, under it the value as
     its column's cells draw it (its render), and the record count at the column's end in the data font; the other
     columns' cells are empty (or hold their summary), their lines continue. No row numbers. A 24px band with lines above
     and below separates groups, open or closed. Nested groups indent one step per level. Group headers stick to the top
     while their rows scroll (a virtual grid keeps a hidden-from-assistive-technology copy at the top once the real
     header has scrolled out of the drawn rows). The grouped-by column is tinted with the neutral sunken surface. The
     chevron, Enter or Space opens or closes a group; Arrow Right opens, Arrow Left closes, Arrow Down and Arrow Up move
     between group rows; a group row is named "Box + cask, group, 5 records" with aria-expanded and aria-level, and the
     change is announced politely. Open and closed groups are kept in the view (storageKey).
     Virtual rendering ("fill" and "load-more", or a grid with a height; not while it is a Narrow list): only the rows in
       view are in the document; the rows not drawn are gaps counted from the tokens (system/virtual.css): a record row is
       its row height step, a group row its header height plus its band and add row; nothing is measured, so every row
       height step, "wrap" columns and grouped tables virtualize. The grid carries aria-rowcount and each row its
       aria-rowindex, a focused control whose row scrolls out leaves the focus on the scrolling body and gets it back when
       its row returns, and printing draws every row (of the rows loaded). The browser's find in page finds only the rows
       drawn (the grid's own filters search all of them).
     Menus: the column menu, the row menu and a handle's moves are ARIA menus: opened from the keyboard, the first item
       has the focus, the arrow keys (Home, End) move, Enter or Space chooses, Escape or Tab closes and the focus goes back.
     Cells edit on double-click (Tabulator editors). Tree rows are Tabulator's (dataTree).
     The room "fill" takes (no height given): the body's maximum height is measured as the grid is built, the window or
       its pane is resized or the grid is shown: from where the body starts to the bottom of the scrolling pane (or the
       window), less what is under the body (the footer, the frame); a grid that starts too far down for eight rows takes
       one screen. The length is written on the body (max-block-size), rounded down to the grid (utils/grid.js); printing
       lifts it.
     Pages: the footer's Select changes the page size (back to page 1); a sort or a filter goes back to page 1; the grid
       carries aria-rowcount (every row) and each row its aria-rowindex in the whole set.
     Load more: the button stays while rows are left; when the last ones come the focus it had goes to the scrolling body.
     The grid is an ARIA grid: rows, column headers (aria-sort on sorted ones), cells; its scrolling body is one Tab stop.
   Notes:
     Inline styles (owner, 2026-10-13: a JavaScript adjustment from tokens, defined styles or measured layout is allowed):
       Tabulator writes a column's width (width, min-width, max-width on its column, header and cell elements), and a group
       row's cells take their columns' widths (inline-size, through gridPx); nothing writes a row height or a cell padding
       (the row height step's and the density's). The rest is drawn from classes: Tabulator runs in strict mode
       (strict.js); a cell's alignment is a class (__cell--align-*), a pinned column is
       sticky at the size-token widths before it (its own width a whole size token), a tree row is indented by its level
       class, a hidden column is a class, a menu is placed by CSS anchor positioning, and a virtual grid's room for the
       rows not drawn is gap elements, never padding. The style audit and the pages test reject an inline height, line
       height or padding on a row or cell; check-system (table-geometry) rejects a forced redraw. Moving rows (a rowHandle column with options.movableRows)
       and columns (options.movableColumns) is native drag and drop. Editors "input" and "number" are a Plenix input.
     The data changes in place (sort, filters, scroll and column widths stay); new columns rebuild the column set.
     Every DataTable handles many rows by its mode (owner, 2026-10-14): "fill" by default, "pages" or "load-more" where the
     application needs them; no DataTable draws all of a long list at once.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { cx } from '../../utils/cx.js';
import { loadTabulator, tablePx } from './tabulator.js';
import { remeasure, reshare, virtualResync, virtualPrint, groupAt } from './strict.js';
import { snapSize, stepSize, SIZE_STEPS } from '../../utils/sizeSteps.js';
import { arrowStep, isRtl } from '../../utils/direction.js';
import { EmptyState } from '../EmptyState/EmptyState.jsx';
import { Button } from '../Button/Button.jsx';
import { Menu, MenuItem, MenuRadioGroup, MenuDivider } from '../Menu/Menu.jsx';
import { Pagination } from '../Pagination/Pagination.jsx';
import { Select } from '../Input/Input.jsx';
import { Text } from '../Text/Text.jsx';
import { announce } from '../../utils/announce.jsx';
import { formatNumber } from '../../utils/format.js';
import { gridPx } from '../../utils/grid.js';
import { floatingScroll } from './floatingScroll.js';

const INTERACTIVE = 'button, a, input, select, textarea, [role="button"], [data-plx-no-row-click]';
const warnedItems = new Set();
const SEP = '\u0000';
const MIN = '--plx-ref-size-80px';   // the narrowest a resized column gets
const STRINGS = {
  rowActions: 'Row actions', empty: 'Nothing to show', clearSort: 'Clear sort', clearFilter: 'Clear filter',
  // the column menu's sort items, by the column's type (owner, 2026-10-14: Airtable's words)
  sortText: ['Sort A → Z', 'Sort Z → A'], sortNumber: ['Sort 1 → 9', 'Sort 9 → 1'], sortDate: ['Sort oldest → newest', 'Sort newest → oldest'],
  sortCheck: ['Sort unchecked → checked', 'Sort checked → unchecked'],
  filterBy: 'Filter by this field', group: 'Group by this field', ungroup: 'Ungroup', fit: 'Fit to content', hide: 'Hide field', showAll: 'Show all fields',
  filter: 'Filter', any: 'Any', contains: 'Contains…', clear: 'Clear', apply: 'Apply', selectRow: 'Select row',
  failed: 'The table could not load', retry: 'Retry', moveUp: 'Move up', moveDown: 'Move down', moveTop: 'Move to top', moveBottom: 'Move to bottom',
  moveRow: 'Move row', moveLeft: 'Move left', moveRight: 'Move right', narrower: 'Narrower', wider: 'Wider', resize: 'Resize',
  range: '{first}–{last} of {total}', count: '{shown} of {total}', perPage: 'Rows per page', pages: '{label} pages', loadMore: 'Load more',
  loaded: '{n} more rows loaded, {shown} of {total}',
  // the view menu (owner, 2026-10-14): the row height steps and Wrap headers
  view: 'View options', rowHeight: 'Row height', short: 'Short', medium: 'Medium', tall: 'Tall', 'extra-tall': 'Extra tall', wrapHeaders: 'Wrap headers',
  // group rows: the row's name ("Box + cask, group, 5 records"), its state, the add row and the summaries
  groupRow: '{value}, group, {count} {records}', record: 'record', records: 'records', expanded: 'expanded', collapsed: 'collapsed',
  noValue: '(Empty)', addTo: 'Add a record to {value}',
  sum: 'Sum', countOf: 'Count', average: 'Average', min: 'Min', max: 'Max'
};
// the row height steps (owner, 2026-10-14): Short is the density's row height; the others are fixed tokens
const ROW_HEIGHTS = ['short', 'medium', 'tall', 'extra-tall'];
// a column's type (columns[].type, or what its kind and sorter say) -> the icon before its name in the header
const TYPE_ICONS = { text: 'ed-text', number: 'field-number', currency: 'field-currency', date: 'calendar', select: 'field-select', checkbox: 'select',
  file: 'attachment', image: 'image-a-2', link: 'link', person: 'person', 'long-text': 'field-long-text' };
const typeOf = (c) => {
  if (c.type && TYPE_ICONS[c.type]) return c.type;
  const k = [].concat(c.kind || []);
  if (k.indexOf('wrap') >= 0) return 'long-text';
  if (c.sorter === 'number') return 'number';
  if (/^(date|datetime|time)$/.test(String(c.sorter || ''))) return 'date';
  if (c.formatter === 'tickCross' || c.editor === 'tickCross') return 'checkbox';
  if (c.formatter === 'link') return 'link';
  return 'text';
};
// the column menu's sort words for a type
const sortWords = (S, type) => (type === 'number' || type === 'currency' ? S.sortNumber : type === 'date' ? S.sortDate : type === 'checkbox' ? S.sortCheck : S.sortText);
// the columns that hold a mark, not a value (the checkbox, an icon column, a row handle, row actions, the view column)
const markColumn = (c) => !!c.isRowHeader || /__cell--select|__cell--icon|__w-lead|__w-view|__cell--handle|__cell--view/.test(String((c.definition && c.definition.cssClass) || ''));
// a column summary over a group's rows (columns[].summary: "sum" | "count" | "average" | "min" | "max")
function summaryOf(kind, rows, field) {
  const vals = rows.map((r) => r[field]).filter((v) => v != null && v !== '');
  if (kind === 'count') return vals.length;
  const nums = vals.map(Number).filter((n) => !isNaN(n));
  if (!nums.length) return null;
  if (kind === 'sum') return nums.reduce((a, b) => a + b, 0);
  if (kind === 'average') return Math.round(nums.reduce((a, b) => a + b, 0) / nums.length * 100) / 100;
  if (kind === 'min') return Math.min.apply(null, nums);
  if (kind === 'max') return Math.max.apply(null, nums);
  return null;
}
const SUMMARY_WORD = { sum: 'sum', count: 'countOf', average: 'average', min: 'min', max: 'max' };
// the modes (owner, 2026-10-14): how a grid handles many rows
const MODES = ['fill', 'pages', 'load-more'];
const PAGE_SIZES = [25, 50, 100];
const PAGE = 50;   // the rows of a page or of each load, by default
const LIST_WIDTH = '--plx-ref-size-600px';   // under it a Narrow grid is a list (data-table.css, the container query)
const AHEAD = '--plx-ref-size-200px';        // load-more: the next rows are asked for this far before the last row shows
const FIT_ROWS = 8;                          // fill: a grid that starts too low for this many rows takes one screen
const words = (str, vars) => str.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
// the nearest ancestor that scrolls and is no taller than the window (a pane), else null (the window scrolls)
function scrollerOf(el) {
  const doc = el.ownerDocument, win = doc.defaultView;
  for (let p = el.parentElement; p && p !== doc.body && p !== doc.documentElement; p = p.parentElement) {
    const oy = win.getComputedStyle(p).overflowY;
    if ((oy === 'auto' || oy === 'scroll' || oy === 'overlay') && p.clientHeight && p.clientHeight <= win.innerHeight) return p;
  }
  return null;
}
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
  cell.getElement().setAttribute('dir', 'auto');
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
  return checkTarget(box);
}
// a selection checkbox's target (Platforms Standard 3.1): a label around the 16px box whose invisible layer fills its
// cell, so the whole lead cell (44 × 44px with touch, --plx-comp-data-table-lead-column-width) toggles the row; the
// label's own click stops at the cell, so a tap beside the box is not also a row click ("only this row")
function checkTarget(box) {
  const label = document.createElement('label');
  label.className = 'plx-data-table__check';
  label.addEventListener('click', (e) => e.stopPropagation());
  label.appendChild(box);
  return label;
}

export function TableEngine(props) {
  // one look from one set of tokens (owner, 2026-10-09): the static Table draws with the DataTable's classes and tokens
  // (--plx-sys-data-table-*, --plx-comp-data-table-*); isStatic only switches the interaction off
  const isStatic = !!props.isStatic, B = 'plx-data-table';
  const { label, data, columns, index = 'id', selectable = false, selected, headerMenu = true, rowMenu, empty, height, options, className,
    error: failure, onRetry, keyColumns, narrow = isStatic ? 'table' : 'list', storageKey, mode = 'fill', pageSize, pageSizes = PAGE_SIZES, fetchRows, search,
    rowHeight = 'short', wrapHeaders = false, viewMenu = false, columnMenu, onAddToGroup, strings } = props;
  const S = React.useMemo(() => Object.assign({}, STRINGS, strings), [strings]);
  // the mode: the static Table draws every row; a DataTable fills the room by default
  const M = isStatic ? 'all' : MODES.indexOf(mode) >= 0 ? mode : 'fill';
  // the row height step and Wrap headers (owner, 2026-10-14): the props, or the person's choice kept in the view
  const kept = React.useMemo(() => (storageKey && !isStatic ? readView(storageKey) : null), [storageKey, isStatic]);
  const [rowStep, setRowStep] = React.useState(() => { const v = kept && kept.rowHeight; return ROW_HEIGHTS.indexOf(v) >= 0 ? v : ROW_HEIGHTS.indexOf(rowHeight) >= 0 ? rowHeight : 'short'; });
  const [wrapHead, setWrapHead] = React.useState(() => (kept && typeof kept.wrapHeaders === 'boolean' ? kept.wrapHeaders : !!wrapHeaders));
  const stepRef = React.useRef(rowStep); stepRef.current = rowStep;
  const wrapRef = React.useRef(wrapHead); wrapRef.current = wrapHead;
  const firstProps = React.useRef(true);
  React.useEffect(() => { if (firstProps.current) return; if (ROW_HEIGHTS.indexOf(rowHeight) >= 0) setRowStep(rowHeight); }, [rowHeight]);
  React.useEffect(() => { if (firstProps.current) return; setWrapHead(!!wrapHeaders); }, [wrapHeaders]);
  React.useEffect(() => { firstProps.current = false; }, []);
  const remote = (M === 'pages' || M === 'load-more') && typeof fetchRows === 'function';
  const step = pageSize > 0 ? pageSize : PAGE;
  // the Narrow list: its key columns, and whether it hides any (a grid whose columns are all key columns stays a table)
  const keys = keyFields(columns, keyColumns);
  const listed = narrow === 'list' && columns.some((c) => listable(c) && keys.indexOf(c.field) < 0);
  // a Narrow grid that is a list now (its rows are taller than the density's: drawn in full, not virtually)
  const [listNow, setListNow] = React.useState(false);
  const listRef = React.useRef(false); listRef.current = listNow;
  // fill and load-more measure the room left (autoFit) unless a height is given; virtual rendering: a grid with a room
  // whose rows are all one height (no wrapping column, no group rows, not a Narrow list)
  // (owner, 2026-10-14: a DataTable's "wrap" columns clamp to the row's lines and group rows have token heights, so both
  // virtualize; the static Table's wrapping rows grow, so it draws them all)
  const autoFit = !height && (M === 'fill' || M === 'load-more');
  const virtual = (!!height || autoFit) && !(isStatic && columns.some((c) => [].concat(c.kind || []).indexOf('wrap') >= 0)) && !listNow;
  // the footer of pages and load-more: { page, max, size, total } or { shown, total }; busy while more rows come
  const [foot, setFoot] = React.useState(null);
  const [busy, setBusy] = React.useState(false);
  const totalRef = React.useRef(0);   // remote: the total the server gave
  const countRef = React.useRef(step);   // local load-more: the rows shown
  const loadRef = React.useRef({ pages: 1, ask: null, busy: false });   // remote load-more: pages loaded, the last question
  const ioRef = React.useRef(null);   // load-more: the observer of the last row
  const loadMoreRef = React.useRef(null);
  const footRef = React.useRef(null);
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
  const probeRef = React.useRef(null);   // the hidden boxes the virtual renderer reads the row kinds' heights from
  const groupCells = React.useRef(new Map());   // React content of group rows (a value drawn by its column's render): path key -> { node, c, row }
  const closedRef = React.useRef(new Set((kept && kept.closed) || []));   // the closed groups (their path keys), kept in the view
  const viewNode = React.useRef(null);   // the view menu's place in the header (the view column's title)
  if (!viewNode.current && typeof document !== 'undefined') viewNode.current = el('span', B + '__portal');
  const fitRef = React.useRef(null);     // the room "fill" measures, once more (a header that grew)
  const stickyRef = React.useRef(null);  // the sticky group rows' stand-ins (a virtual grid whose group row is not drawn)

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
    const g = t.options.groupBy;
    writeView(key, {
      sort: t.getSorters().map((s) => ({ column: s.field, dir: s.dir })),
      widths: resized.current,
      order: t.getColumns().map((c) => c.getField()).filter(Boolean),
      hidden: t.getColumns().filter((c) => !c.isVisible()).map((c) => c.getField()).filter(Boolean),
      // the view's own settings (owner, 2026-10-14): the row height step, Wrap headers, the grouping and its closed groups
      rowHeight: stepRef.current, wrapHeaders: wrapRef.current,
      groupBy: typeof g === 'string' || (Array.isArray(g) && g.every((x) => typeof x === 'string')) ? g : false,
      closed: Array.from(closedRef.current),
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
      // the grouping kept (a field that is gone is not grouped by); its closed groups come with groupStartOpen
      const want = [].concat(v.groupBy || []).filter(col);
      if (v.groupBy !== undefined && JSON.stringify(want.length ? (want.length === 1 ? want[0] : want) : false) !== JSON.stringify(t.options.groupBy || false)) groupBy(t, want.length ? (want.length === 1 ? want[0] : want) : false);
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
      { label: menuLabel(S.moveUp, 'chevron-up'), disabled: up, action: () => moveRow(row, 'up') },
      { label: menuLabel(S.moveDown, 'chevron-down'), disabled: down, action: () => moveRow(row, 'down') },
      { label: menuLabel(S.moveTop), disabled: up, action: () => moveRow(row, 'top') },
      { label: menuLabel(S.moveBottom), disabled: down, action: () => moveRow(row, 'bottom') }
    ];
  };

  // ---- group rows, Airtable style (owner, 2026-10-14) ----
  // a group's place: the values of its groups from the top ("["Vendor A","Box"]"), the key of its open/closed state
  const pathKey = (g) => JSON.stringify(g && g.getPath ? g.getPath() : []);
  const groupFields = (t) => [].concat((t && t.options.groupBy) || []).filter((f) => typeof f === 'string');
  // the grouped-by columns are tinted (their headers and cells): a class on the cells drawn now; rowFormatter marks the rest
  const tintGrouped = (t) => {
    const want = groupFields(t), key = want.join(SEP);
    if (t.plxGroupedKey === key) return;
    t.plxGroupedKey = key; t.plxGrouped = new Set(want);
    const on = (c) => !!c && t.plxGrouped.has(c.getField && c.getField());
    t.columnManager.columnsByIndex.forEach((c) => { if (c.element) c.element.classList.toggle(B + '__cell--grouped', on(c)); });
    t.rowManager.rows.forEach((r) => (r.cells || []).forEach((cell) => { if (cell.element) cell.element.classList.toggle(B + '__cell--grouped', on(cell.column)); }));
  };
  const groupBy = (t, field) => { t.setGroupBy(field); tintGrouped(t); saveView(); };
  // the page's view (filter, sort, groupBy, columnOrder, hiddenColumns: the command bar's panels), applied to the grid;
  // a part left undefined is not touched
  const applyView = (t) => {
    const p = latest.current;
    if (!t || isStatic) return;
    const col = (f) => t.getColumns().find((c) => c.getField() === f);
    if (typeof p.filter === 'function') {
      if (!t.plxViewFilter) { t.plxViewFilter = (d) => { const fn = latest.current.filter; return typeof fn === 'function' ? !!fn(d) : true; }; t.addFilter(t.plxViewFilter); }
      else t.refreshFilter();
    } else if (t.plxViewFilter) { t.removeFilter(t.plxViewFilter); t.plxViewFilter = null; }
    if (Array.isArray(p.sort)) {
      const want = p.sort.filter((x) => x && col(x.field)).map((x) => ({ column: x.field, dir: x.dir === 'desc' ? 'desc' : 'asc' }));
      // (Tabulator's sort list ends with the main sort: the page's first level goes last)
      const now = t.getSorters().map((x) => ({ column: x.field, dir: x.dir })).reverse();
      if (want.length) {
        if (JSON.stringify(want) !== JSON.stringify(now)) {
          t.setSort(want.map((x) => Object.assign({}, x)).reverse()); t.plxViewSort = want;
        }
      } else if (t.plxViewSort) {
        if (JSON.stringify(t.plxViewSort) === JSON.stringify(now)) t.clearSort();
        t.plxViewSort = null;
      }
    }
    if (p.groupBy !== undefined) {
      const list = [].concat(p.groupBy || []).filter((x) => typeof x === 'string' && col(x));
      const g = list.length ? (list.length === 1 ? list[0] : list) : false;
      if (JSON.stringify(g) !== JSON.stringify(t.options.groupBy || false)) groupBy(t, g);
    }
    if (Array.isArray(p.columnOrder)) {
      const order = p.columnOrder.filter((f) => col(f) && !col(f).getDefinition().frozen);
      order.forEach((f, i) => { if (!i) return; const c = col(f), prev = col(order[i - 1]); if (c.getPrevColumn() !== prev) c.move(prev, true); });
      // the first of the order goes before the others (Make first column)
      if (order.length > 1) { const first = col(order[0]), next = col(order[1]); if (first.getNextColumn() !== next) first.move(next, false); }
    }
    if (Array.isArray(p.hiddenColumns)) {
      t.getColumns().forEach((c) => { const f = c.getField(); if (!f) return; const hide = p.hiddenColumns.indexOf(f) >= 0; if (hide && c.isVisible()) c.hide(); else if (!hide && !c.isVisible()) c.show(); });
    }
    saveView();
  };
  // the columns a group row's cells follow: the first cell spans the mark columns at the start and the first value column
  const cellsInto = (box, t, fill) => {
    box.textContent = '';
    const cols = t.columnManager.columnsByIndex.filter((c) => c.visible);
    let first = 0;
    while (first < cols.length - 1 && markColumn(cols[first])) first++;
    const cell = (cls, width) => { const d = el('div', cx(B + '__group-cell', cls)); d.setAttribute('role', 'gridcell'); d.style.inlineSize = gridPx(width); box.appendChild(d); return d; };
    let w = 0;
    for (let i = 0; i <= first && i < cols.length; i++) w += cols[i].getWidth();
    fill(cell(B + '__group-cell--first', w), null);
    for (let i = first + 1; i < cols.length; i++) fill(cell(null, cols[i].getWidth()), cols[i]);
  };
  // the add row's button (onAddToGroup): one Short row at the end of a group
  const addButton = (g) => {
    const b = el('button', 'plx-button plx-button--ghost plx-button--size-xs plx-button--icon-only ' + B + '__add');
    b.type = 'button';
    const ic = el('span', 'plx-button__icon'); ic.appendChild(iconEl('plus')); b.appendChild(ic);
    b.setAttribute('aria-label', words(S.addTo, { value: g.plxText != null ? g.plxText : String(g.key) }));
    b.addEventListener('click', (e) => { e.stopPropagation(); const f = latest.current.onAddToGroup; if (f) f(g.key, g.getPath()); });
    return b;
  };
  // Tabulator's group header (groupHeader): its parts, filled when the row is drawn (drawGroup): the add row of the group
  // above, the gap band, and the header: chevron, eyebrow (the grouped-by field), the value as its column draws it, the count
  const groupHeader = (value, count, rowsData, comp) => {
    const g = comp && comp._group, t = tableRef.current;
    const inner = el('div', B + '__group-inner');
    const add = el('div', B + '__group-add'), band = el('div', B + '__group-band'), head = el('div', B + '__group-head');
    band.setAttribute('aria-hidden', 'true');
    inner.appendChild(add); inner.appendChild(band); inner.appendChild(head);
    if (!g || !t) return inner;
    const c = (latest.current.columns || []).find((x) => x.field === g.field) || null;
    const text = value == null || value === '' ? S.noValue : String(value);
    const lab = el('div', B + '__group-label');
    const chev = el('span', B + '__group-chevron'); chev.setAttribute('aria-hidden', 'true'); chev.appendChild(iconEl('chevron-down'));
    const words2 = el('div', B + '__group-text');
    words2.appendChild(el('span', 'plx-text plx-text--eyebrow ' + B + '__group-eyebrow', c ? String(c.title || c.field) : ''));
    const val = el('span', cx(B + '__group-value', c && [].concat(c.kind || []).indexOf('data') >= 0 && 'plx-font-data'));
    if (c && c.render && rowsData && rowsData.length) {
      const node = el('span', B + '__portal'); val.appendChild(node);
      groupCells.current.set(pathKey(g), { node, c, row: rowsData[0] }); bump();
    } else val.textContent = text;
    words2.appendChild(val);
    lab.appendChild(chev); lab.appendChild(words2); lab.appendChild(el('span', 'plx-font-data ' + B + '__group-count', formatNumber(count)));
    g.plxText = text;
    g.plxParts = { add, band, head, lab, chev, count, rows: rowsData || [], ver: -1, addFor: null, addVer: -1 };
    g.element.plxGroup = g;
    return inner;
  };
  // a group row as it is drawn: its cells at the columns' widths (again after a width changes), its add row, its state
  const drawGroup = (g) => {
    const t = tableRef.current; if (!t || !g) return;
    const e = g.getElement(), P = g.plxParts; if (!P) return;
    const ver = t.plxColsVer || 0;
    if (P.ver !== ver) {
      cellsInto(P.head, t, (cell, col) => {
        if (!col) { cell.appendChild(P.lab); return; }
        const def = (latest.current.columns || []).find((x) => x.field === col.getField());
        const kind = def && def.summary, v = kind ? summaryOf(kind, P.rows, def.field) : null;
        if (v == null) return;
        cell.classList.add(B + '__group-cell--summary');
        const s = el('span', B + '__group-summary');
        s.appendChild(el('span', B + '__group-summary-name', S[SUMMARY_WORD[kind]] || kind));
        s.appendChild(el('span', 'plx-font-data ' + B + '__group-summary-value', formatNumber(v)));
        cell.appendChild(s);
      });
      P.ver = ver; P.addVer = -1;
    }
    const addFor = g.plxAddFor || null;
    if (addFor && (P.addVer !== ver || P.addFor !== addFor)) { cellsInto(P.add, t, (cell, col) => { if (!col) cell.appendChild(addButton(addFor)); }); P.addVer = ver; P.addFor = addFor; }
    else if (!addFor && P.addFor) { P.add.textContent = ''; P.addFor = null; P.addVer = -1; }
    const open = typeof g.visible === 'function' ? true : !!g.visible;
    e.classList.toggle('tabulator-group-visible', open); e.classList.toggle(B + '__group--closed', !open);
    P.chev.firstChild.className = 'plx-icon plx-icon--' + (open ? 'chevron-down' : isRtl(e) ? 'chevron-left' : 'chevron-right');
    e.tabIndex = 0;
    e.setAttribute('aria-expanded', String(open)); e.setAttribute('aria-level', String((g.level || 0) + 1));
    e.setAttribute('aria-label', words(S.groupRow, { value: g.plxText, count: formatNumber(P.count), records: P.count === 1 ? S.record : S.records }));
  };
  // the add row after the last group's records (a grouped grid with onAddToGroup)
  const drawTail = (t) => {
    if (!t.plxTailEl) { t.plxTailEl = el('div', B + '__add-row'); t.plxTailEl.setAttribute('role', 'row'); }
    const g = t.plxTailFor, ver = t.plxColsVer || 0;
    if (g && (t.plxTailEl.plxFor !== g || t.plxTailEl.plxVer !== ver)) { cellsInto(t.plxTailEl, t, (cell, col) => { if (!col) cell.appendChild(addButton(g)); }); t.plxTailEl.plxFor = g; t.plxTailEl.plxVer = ver; }
    const te = t.rowManager.tableElement;
    if (t.rowManager.renderMode !== 'virtual') { if (g) { if (te.lastChild !== t.plxTailEl) te.appendChild(t.plxTailEl); } else if (t.plxTailEl.parentNode) t.plxTailEl.parentNode.removeChild(t.plxTailEl); }
  };
  // every group row drawn now, again (a column's width, order or visibility changed)
  const redrawGroups = (t) => {
    const h = hostRef.current; if (!t || !h) return;
    h.querySelectorAll('.tabulator-group').forEach((x) => { if (x.plxGroup) drawGroup(x.plxGroup); });
    if (t.plxTailFor) drawTail(t);
    syncSticky(true);
  };
  // open or close a group (the chevron, Enter, the arrow keys); the focus stays on its row
  const toggleGroup = (g, show) => {
    if (!g) return;
    const open = typeof g.visible === 'function' ? true : !!g.visible;
    if (show === open) return;
    const doc = g.element.ownerDocument, had = doc.activeElement === g.element, key = pathKey(g);
    g.toggleVisibility();
    // (Tabulator groups the rows again: the group's row is a new element; it is found by its place)
    if (had) requestAnimationFrame(() => {
      const h = hostRef.current, row = h && Array.from(h.querySelectorAll('.tabulator-group')).find((x) => x.plxGroup && pathKey(x.plxGroup) === key);
      if (row) row.focus({ preventScroll: true });
    });
  };
  // a virtual grid: a group row scrolled out of the drawn rows still sticks to the top, as a stand-in (its header's copy,
  // hidden from assistive technology; its chevron opens and closes the real group)
  const stickyKey = React.useRef('');
  const syncSticky = (force) => {
    const t = tableRef.current, box = stickyRef.current, h = hostRef.current;
    if (!t || !box || !h || !builtRef.current) return;
    const holder = h.querySelector('.tabulator-tableholder'), at = holder && t.rowManager.renderMode === 'virtual' ? groupAt(t, holder.scrollTop) : null;
    let chain = [];
    if (at) { const top = at.row.type === 'group' ? at.row.parent : at.row.modules && at.row.modules.group; for (let x = top; x; x = x.parent) chain.unshift(x); }
    const te = t.rowManager.tableElement;
    chain = chain.filter((x) => !(x.element && x.element.parentNode === te));
    // (a group scrolled past in a jump was never drawn: its header is made now)
    chain.forEach((x) => { if (!x.plxParts || x.plxParts.ver !== (t.plxColsVer || 0)) drawGroup(x); });
    chain = chain.filter((x) => x.plxParts);
    const key = chain.map((x) => pathKey(x) + (x.plxParts.ver) + String(x.visible)).join('|');
    if (!force && key === stickyKey.current) return;
    stickyKey.current = key; box.textContent = '';
    chain.forEach((x) => {
      const w = el('div', cx(B + '__sticky-group', 'tabulator-group-level-' + (x.level || 0), !x.visible && B + '__group--closed'));
      w.setAttribute('aria-hidden', 'true'); w.plxGroup = x;
      const copy = x.plxParts.head.cloneNode(true);
      copy.querySelectorAll('[role]').forEach((n) => n.removeAttribute('role'));
      copy.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((n) => { n.tabIndex = -1; });
      w.appendChild(copy); box.appendChild(w);
    });
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
      const lab = el('label', 'plx-data-table__filter-label', S.filter + ' ' + (c.title || field)); lab.htmlFor = id;
      let input;
      if (c.filter === 'list') {
        input = el('select', 'plx-input plx-data-table__filter-input');
        const values = [];
        (function walk(rows) { rows.forEach((r) => { if (r[field] != null && r[field] !== '') values.push(r[field]); if (r._children) walk(r._children); }); })(latest.current.data || []);
        [''].concat(Array.from(new Set(values)).sort()).forEach((v) => { const o = el('option', null, v === '' ? S.any : String(v)); o.value = v; input.appendChild(o); });
      } else {
        input = el('input', 'plx-input plx-data-table__filter-input'); input.type = 'text'; input.placeholder = S.contains;
      }
      input.id = id; input.value = active ? active.value : '';
      const actions = el('div', 'plx-data-table__filter-actions');
      const button = (text, primary, fn) => { const b = el('button', cx('plx-button', primary ? 'plx-button--primary' : 'plx-button--secondary', 'plx-button--size-sm'), text); b.type = 'button'; b.addEventListener('click', fn); return b; };
      actions.appendChild(button(S.clear, false, () => { setFilter(column, c.filter, ''); close(); }));
      actions.appendChild(button(S.apply, true, () => { setFilter(column, c.filter, input.value); close(); }));
      input.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { setFilter(column, c.filter, input.value); close(); } });
      box.appendChild(lab); box.appendChild(input); box.appendChild(actions);
      onRendered(() => input.focus());
      return box;
    };
    // the column menu, in sections like Airtable's (owner, 2026-10-14): (1) the application's field actions (columnMenu),
    // (2) sort in the type's words and Clear sort, (3) filter and group, (4) width and position, (5) hide and show
    const headerItems = (c, pinned) => () => {
      const sections = [];
      const add = (list) => { if (list.length) sections.push(list); };
      const own = latest.current.columnMenu, list = typeof own === 'function' ? own(c) : own;
      const ownItems = [];
      (list || []).forEach((it) => {
        if (it.separator) { add(ownItems.splice(0)); return; }
        ownItems.push({ label: menuLabel(it.label, it.icon, it.danger), disabled: typeof it.disabled === 'function' ? it.disabled(c) : !!it.disabled, action: (e, col) => it.onSelect && it.onSelect(c, col) });
      });
      add(ownItems);
      if (c.headerSort !== false && c.kind !== 'actions') {
        const w = sortWords(S, typeOf(c));
        add([{ label: menuLabel(w[0], 'sort-ascending'), action: (e, col) => T().setSort(col.getField(), 'asc') },
          { label: menuLabel(w[1], 'sort-descending'), action: (e, col) => T().setSort(col.getField(), 'desc') },
          { label: menuLabel(S.clearSort, 'close'), disabled: !T().getSorters().length, action: () => T().clearSort() }]);
      }
      const fg = [];
      if (c.filter) {
        // Filter by this field opens the column's own filter popup (its header button)
        fg.push({ label: menuLabel(S.filterBy, 'filter'), action: (e, col) => { const b = col.getElement().querySelector('.tabulator-header-popup-button'); if (b) setTimeout(() => b.click()); } });
        fg.push({ label: menuLabel(S.clearFilter, 'filter-off'), disabled: !filters(c.field).length, action: (e, col) => setFilter(col, c.filter, '') });
      }
      if (c.kind !== 'icon' && c.kind !== 'actions') {
        const grouped = groupFields(T());
        if (grouped.indexOf(c.field) < 0) fg.push({ label: menuLabel(S.group, 'list-lines'), action: (e, col) => groupBy(T(), col.getField()) });
        if (T().options.groupBy) fg.push({ label: menuLabel(S.ungroup, 'list-bullets'), action: () => groupBy(T(), false) });
      }
      add(fg);
      const wp = [];
      // the width without dragging: one size token narrower or wider, or fitted to the content
      if (c.kind !== 'icon' && c.kind !== 'actions' && c.resizable !== false) {
        wp.push({ label: menuLabel(S.narrower, 'column-narrower'), action: (e, col) => stepWidth(col, -1) });
        wp.push({ label: menuLabel(S.wider, 'column-wider'), action: (e, col) => stepWidth(col, 1) });
        wp.push({ label: menuLabel(S.fit, 'column-fit'), action: (e, col) => fitColumn(col) });
      }
      // moving a column without dragging it (WCAG 2.5.7): one place left or right
      if ((latest.current.options || {}).movableColumns && !pinned) {
        wp.push({ label: menuLabel(S.moveLeft, 'chevron-left'), action: (e, col) => moveColumn(col, -1) });
        wp.push({ label: menuLabel(S.moveRight, 'chevron-right'), action: (e, col) => moveColumn(col, 1) });
      }
      add(wp);
      add([{ label: menuLabel(S.hide, 'visibility-off'), action: (e, col) => { col.hide(); saveView(); } },
        { label: menuLabel(S.showAll, 'visibility'), action: () => { T().getColumns().forEach((col) => col.show()); saveView(); } }]);
      return sections.reduce((all, s, i) => (i ? all.concat([{ separator: true }], s) : s), []);
    };

    const defs = cols.map((c, i) => {
      const { kind, icon, render, filter, rowLabel, type, summary, ...rest } = c;
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
      } else if (!isStatic && !c.rowHandle && kind !== 'actions' && d.titleFormatter === undefined) {
        // the column's type icon before its name (owner, 2026-10-14; hidden where the header row is 28px: its size token is
        // 0 in Compact), and the name in its own element: cut with "…", the full name in its tooltip (titleTips)
        d.titleFormatter = () => {
          const s = el('span', B + '__title'), ic = el('span', B + '__type-icon');
          ic.setAttribute('aria-hidden', 'true'); ic.appendChild(iconEl(TYPE_ICONS[typeOf(c)] || TYPE_ICONS.text));
          s.appendChild(ic); s.appendChild(el('span', B + '__title-text', c.title == null ? '' : String(c.title)));
          return s;
        };
      }
      if (kind === 'actions') Object.assign(d, { headerSort: false, resizable: false });
      if (render) d.formatter = (cell) => { cell.getElement().setAttribute('dir', 'auto'); const id = String(cell.getRow().getIndex()) + SEP + c.field; owners.current.set(id, cell); return container(id); };
      if (filter && !isStatic) { d.headerPopup = filterPopup(c); d.headerPopupIcon = iconEl('filter').outerHTML; }
      if (headerMenu && !isStatic && d.headerContextMenu === undefined) d.headerContextMenu = headerItems(c, labelAt >= i || !!c.frozen);
      // the header's chevron button (owner, 2026-10-14): shown while the header is hovered, it opens the same column menu
      if (headerMenu && !isStatic && d.headerMenu === undefined && kind !== 'actions') {
        d.headerMenu = d.headerContextMenu;
        d.headerMenuIcon = () => { const m = el('span', B + '__menu-chevron'); m.setAttribute('aria-hidden', 'true'); m.appendChild(iconEl('chevron-down')); return m; };
      }
      // a click on a row handle opens its move menu (a way to move rows without dragging; WCAG 2.5.7)
      if (c.rowHandle && !isStatic && (latest.current.options || {}).movableRows && d.clickMenu === undefined) d.clickMenu = (e, cell) => rowMoveItems(cell.getRow());
      return d;
    });
    // the view column (owner, 2026-10-14): at the end of the header, the view menu (Row height, Wrap headers); its cells are
    // empty, their column line continues
    if (viewMenu && !isStatic) {
      // (as wide as the checkbox column; wider with touch, for its 44px target)
      const viewPx = tablePx('--plx-comp-data-table-view-column-width', host) || tablePx('--plx-comp-data-table-lead-column-width', host);
      defs.push({ title: S.view, headerSort: false, resizable: false, width: viewPx, minWidth: viewPx, maxWidth: viewPx,
        cssClass: cx(B + '__cell--view', B + '__w-view', B + '__cell--align-center', B + '__head-align-center'),
        titleFormatter: () => viewNode.current, formatter: () => '' });
    }
    return defs;
  };

  // the column set's shape: a change rebuilds the columns (the data and the cell contents do not)
  const shape = JSON.stringify(columns.map((c) => Object.keys(c).sort().map((k) => (typeof c[k] === 'function' ? k + '()' : k + '=' + JSON.stringify(c[k])))));

  React.useEffect(() => {
    let alive = true, table = null, unfloat = null;
    builtRef.current = false; measured.current = false;
    // the grid's own window: a grid drawn into a frame runs on that frame's Tabulator; a document that has lost its window
    // (a frame that loaded again meanwhile) gets no grid
    const win = hostRef.current && hostRef.current.ownerDocument.defaultView;
    if (!win) return undefined;
    loadTabulator(win).then((Tabulator) => {
      if (!alive || !hostRef.current || !hostRef.current.ownerDocument.defaultView) return;
      const host = hostRef.current;
      const p = latest.current;
      const placeholder = el('div', B + '__empty tabulator-placeholder-contents', p.empty || S.empty);
      // the row menu: the page's items, then (movable rows) the moves
      let optsRowMenu;
      const movable = !isStatic && !!(p.options || {}).movableRows;
      const rowContextMenu = p.rowMenu || movable ? (e, row) => {
        const cur = latest.current.rowMenu, d = row.getData();
        const list = typeof cur === 'function' ? cur(d) : cur;
        const items = (list || []).map((it) => {
          if (!it.separator && typeof it.onSelect !== 'function' && typeof it.action !== 'function' && !warnedItems.has(it.label) &&
            !!React.createElement('span')._store) {
            warnedItems.add(it.label); console.warn('Plenix DataTable: rowMenu item "' + it.label + '" needs onSelect or action.');
          }
          return it.separator ? { separator: true } : {
          label: menuLabel(it.label, it.icon, it.danger),
          disabled: typeof it.disabled === 'function' ? it.disabled(d) : !!it.disabled,
          action: () => { const fn = typeof it.onSelect === 'function' ? it.onSelect : it.action; if (typeof fn === 'function') fn(d, row); }
        }; });
        if (movable) { if (items.length) items.push({ separator: true }); items.push(...rowMoveItems(row)); }
        return items;
      } : undefined;
      if (!isStatic && p.rowMenu && p.rowMenuButton !== false) {
        const width = tablePx('--plx-comp-data-table-row-menu-width', host);
        optsRowMenu = { title: S.rowActions, field: '_plxRowMenu', headerSort: false, resizable: false, frozen: true,
          width, minWidth: width, maxWidth: width, cssClass: B + '__cell--row-menu ' + B + '__cell--actions',
          formatter: (cell) => {
            const button = el('button', 'plx-button plx-button--ghost plx-button--icon-only plx-button--size-sm ' + B + '__row-menu');
            button.type = 'button'; button.setAttribute('aria-label', S.rowActions); button.setAttribute('aria-haspopup', 'menu');
            const icon = el('span', 'plx-button__icon'); icon.appendChild(iconEl('more')); button.appendChild(icon);
            button.addEventListener('click', (ev) => { ev.stopPropagation(); const r = button.getBoundingClientRect();
              cell.getRow().getElement().dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: r.left, clientY: r.bottom })); });
            return button;
          } };
      }
      const labelled = p.columns.some((c) => c.rowLabel);
      const leadPx = tablePx('--plx-comp-data-table-lead-column-width', host);
      const opts = {
        // the columns: Tabulator measures their content, and the columns without a width share the room left (strict.js)
        layout: 'plenix',
        index: p.index || 'id',
        placeholder,
        columnDefaults: { resizable: false },
        // a grid with a room (a height, or fill and load-more) draws the rows in view (every row is the density's height);
        // pages, a wrapping column, group rows and a Narrow list draw them all
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
          e.querySelectorAll('.tabulator-cell:not([data-plx-interactive])').forEach((cell) => {
            cell.setAttribute('data-plx-interactive', '');
            cell.addEventListener('click', (ev) => { if (ev.target.closest(INTERACTIVE)) ev.stopPropagation(); });
          });
          if (!isStatic && latest.current.on && latest.current.on.rowClick && !e.hasAttribute('data-plx-open')) {
            e.setAttribute('data-plx-open', ''); e.tabIndex = 0;
            e.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && ev.target === e) { ev.preventDefault(); e.click(); } });
          }
          // the grouped-by column's cell is tinted (its class)
          const t = row.getTable(), g = t && t.plxGrouped;
          if (g && g.size) row.getCells().forEach((cell) => { if (g.has(cell.getField())) cell.getElement().classList.add(B + '__cell--grouped'); });
        },
        // group rows, Airtable style (owner, 2026-10-14): Plenix's header (groupHeader), opened and closed by its chevron,
        // Enter and the arrow keys (no click on the whole row), each group open unless the view keeps it closed
        groupHeader,
        groupToggleElement: false,
        groupStartOpen: (value, count, rows, comp) => {
          const g = comp && comp._group;
          if (g && closedRef.current.has(pathKey(g))) return false;
          const own = (latest.current.options || {}).groupStartOpen;
          return typeof own === 'function' ? own(value, count, rows, comp) : own !== false;
        },
        // the keyboard's Home, End, Page Up and Page Down are the browser's (the body scrolls; a menu or a field in the grid
        // keeps its own keys); Tabulator's other key bindings stay
        keybindings: Object.assign({ scrollToStart: false, scrollToEnd: false, scrollPageUp: false, scrollPageDown: false }, (p.options || {}).keybindings),
        ...Object.fromEntries(Object.entries(p.options || {}).filter(([k]) => !['rowFormatter', 'movableRows', 'movableColumns', 'height', 'maxHeight', 'minHeight', 'renderVertical', 'renderHorizontal', 'dataTreeChildIndent', 'columnDefaults', 'groupStartOpen', 'keybindings'].includes(k))),
        data: p.data || [],

      };
      // a page's own groupHeader keeps Tabulator's toggle (the arrow)
      if ((p.options || {}).groupHeader) opts.groupToggleElement = 'arrow';
      if (isStatic) Object.assign(opts, { rowContextMenu: undefined, rowHeader: false, selectableRows: false, movableColumns: false, movableRows: false, groupBy: false });
      // pages, and local load-more (a page that grows): Tabulator's pagination, its own page buttons never shown (the
      // footer is Plenix's)
      countRef.current = step; loadRef.current = { pages: 1, ask: null, busy: false }; totalRef.current = 0;
      if (M === 'pages' || (M === 'load-more' && !remote)) {
        Object.assign(opts, { pagination: true, paginationMode: remote ? 'remote' : 'local', paginationSize: step, paginationElement: host.ownerDocument.createElement('div'), paginationCounter: false });
      }
      // rows from the server (fetchRows): Tabulator's remote pagination, sort and filter; the question in Plenix's terms
      if (remote) {
        const request = (url, config, params) => {
          const q = latest.current, size = M === 'pages' ? params.size || step : step;
          const ask = { page: M === 'pages' ? params.page || 1 : 1, size, sort: (params.sort || []).map((x) => ({ field: x.field, dir: x.dir })),
            filters: (params.filter || []).map((x) => ({ field: x.field, type: x.type, value: x.value })), search: q.search };
          loadRef.current = { pages: 1, ask, busy: false };
          return Promise.resolve(q.fetchRows(ask)).then((r) => {
            const rows = (r && r.rows) || [], total = r && r.total != null ? Number(r.total) : rows.length;
            totalRef.current = total;
            return M === 'pages' ? { last_page: Math.max(1, Math.ceil(total / size)), last_row: total, data: rows } : rows;
          }, (err) => { if (alive) setError(err || new Error('The rows could not load')); throw err; });
        };
        Object.assign(opts, { ajaxURL: 'plenix:rows', ajaxRequestFunc: request, sortMode: 'remote', filterMode: 'remote' });
        delete opts.data;
      }
      opts.columns = defsOf(p.columns, host).concat(optsRowMenu ? [optsRowMenu] : []);
      table = new Tabulator(host, opts);
      shown.current = snap(opts.data);
      tableRef.current = table;
      // what the virtual renderer and the group rows need from the grid (strict.js): its token boxes, the add rows, and
      // the callbacks that draw a group row's parts and the add row after the last group
      table.plxProbe = probeRef.current;
      table.plxAddRows = !isStatic && typeof p.onAddToGroup === 'function';
      table.plxOnGroupDraw = (g) => drawGroup(g);
      table.plxOnGroupLayout = () => { if (table.plxTailFor || table.plxTailEl) drawTail(table); };
      table.plxOnColumns = () => redrawGroups(table);

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
        // a grouped grid is a tree grid: its group rows open and close (aria-expanded, aria-level)
        if (table && !isStatic) host.setAttribute('role', host.querySelector('.tabulator-group') || table.options.groupBy ? 'treegrid' : 'grid');
        // the add row after the last group (the basic renderer: after the rows; the virtual one places it with its gaps)
        if (table && table.plxAddRows) drawTail(table);
        // a column name cut with "…" shows the full name in its tooltip
        titleTips();
        syncSticky(false);
        // the selection kept by the page, once the rows are in (Tabulator builds before it loads them; nothing happens
        // when it already matches)
        if (table) syncSelection(table);
        // the header checkbox (Tabulator's select all / none) gets the same full-cell target as the rows'
        host.querySelectorAll('.tabulator-header .tabulator-row-header input[type="checkbox"]').forEach((b) => { if (!b.closest('.plx-data-table__check')) { const at = b.parentNode, next = b.nextSibling; at.insertBefore(checkTarget(b), next); } });
        host.querySelectorAll('.tabulator-row .tabulator-row-header input[type="checkbox"]').forEach((b, n) => { if (!b.getAttribute('aria-label')) b.setAttribute('aria-label', S.selectRow + ' ' + (n + 1)); });
        // a row handle is a Tab stop: Enter or Space opens its move menu, Alt + the arrow keys move the row
        if (table && !isStatic) nameGrips(table);
        if (movable) host.querySelectorAll('.tabulator-row .' + B + '__cell--handle').forEach((h) => {
          if (h.hasAttribute('aria-keyshortcuts')) return;
          h.tabIndex = 0; h.setAttribute('aria-label', S.moveRow); h.setAttribute('aria-haspopup', 'menu');
          h.setAttribute('aria-keyshortcuts', 'Alt+ArrowUp Alt+ArrowDown Alt+Home Alt+End');
        });
      };
      table.on('renderComplete', () => { aria(); syncFoot(table); watchEnd(table); });
      table.on('tableBuilt', () => {
        aria(); builtRef.current = true; fitRoom(); syncFoot(table); watchEnd(table);
        // the body's scrollbars float over the rows and take no room (owner, 2026-10-15)
        if (!unfloat) unfloat = floatingScroll(host, host.querySelector('.tabulator-tableholder'));
        const on = isStatic ? {} : latest.current.on || {};
        Object.keys(on).forEach((ev) => table.on(ev, (...a) => { const h = (latest.current.on || {})[ev]; if (h && !(ev === 'rowClick' && a[0].target.closest(INTERACTIVE))) h(...a); }));
        const selectionChanged = (activeRows = table.getRows('active')) => {
          const q = latest.current; if (syncing.current || !q.onSelectionChange) return;
          const rows = table.getSelectedRows(), visible = new Set(activeRows);
          q.onSelectionChange(rows.map((r) => r.getData()[q.index || 'id']), { count: rows.length, hidden: rows.filter((r) => !visible.has(r)).length });
        };
        table.on('rowSelectionChanged', () => selectionChanged());
        table.on('dataFiltered', (filters, activeRows) => {
          if (latest.current.keepHiddenSelection === false) {
            const active = new Set(activeRows);
            syncing.current = true;
            table.getSelectedRows().filter((r) => !active.has(r)).forEach((r) => r.deselect());
            syncing.current = false;
          }
          selectionChanged(activeRows);
        });
        syncSelection(table);
        if (!isStatic) {
          wireColumns(table); wireRows(table, host); wireGroups(table, host);
          restoreView(table); applyView(table); table.on('dataSorted', () => saveView());
          tintGrouped(table);
        }
        if (latest.current.onReady) latest.current.onReady(table);
        bump();
      });
    }).catch((err) => { if (alive) setError(err); });
    fitRef.current = () => fitRoom();

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
      virtualResync(t); remeasure(t, t.getColumns()); titleTips();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-plx-density', 'data-plx-density-policy', 'data-plx-interaction'] });
    if (region && region !== document.documentElement) mo.observe(region, { attributes: true, attributeFilter: ['data-plx-density'] });
    // a grid built while hidden (a closed tab, a section not shown) had no size to lay out in: once it is shown, it is
    // drawn again in place (its columns are measured then; no row is)
    // and a grid whose width changes shares the room among its columns again (nothing is measured)
    // fill and load-more without a height (autoFit): the body takes the room left on screen, from where it starts to the
    // bottom of its scrolling pane or the window, less what is under it (the footer, the frame); a grid that starts too
    // low for FIT_ROWS rows takes one screen. Written on the body as a maximum, rounded down to the grid.
    const fitRoom = () => {
      const f = frameRef.current, h = hostRef.current, holder = h && h.querySelector('.tabulator-tableholder');
      if (!autoFit || !f || !holder || !f.offsetWidth || !builtRef.current) return;
      const sc = scrollerOf(f), view = sc ? sc.getBoundingClientRect() : { top: 0 };
      const screen = sc ? sc.clientHeight - (parseFloat(win.getComputedStyle(sc).paddingBlockEnd) || 0) : win.innerHeight;
      const hr = holder.getBoundingClientRect(), fr = f.getBoundingClientRect();
      const above = hr.top - fr.top, below = fr.bottom - hr.bottom;
      const start = hr.top - view.top + (sc ? sc.scrollTop : win.scrollY);   // where the body starts in the scrolling content
      const rows = FIT_ROWS * (tablePx('--plx-sys-data-table-row-height', f) + tablePx('--plx-comp-data-table-line-width', f));
      let room = screen - start - below;
      if (room < rows) room = screen - above - below;
      const want = Math.max(room, rows);
      if (holder.style.maxBlockSize !== gridPx(want, { round: 'down', el: f })) holder.style.maxBlockSize = gridPx(want, { round: 'down', el: f });
    };
    const onWindow = () => { fitRoom(); };
    win.addEventListener('resize', onWindow);
    let shownBefore = !!(frameRef.current && frameRef.current.offsetWidth), lastWidth = frameRef.current ? frameRef.current.offsetWidth : 0, frame = 0;
    const narrowNow = (width) => listed && width > 0 && width < tablePx(LIST_WIDTH, frameRef.current);
    const ro = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(() => {
      const width = frameRef.current ? frameRef.current.offsetWidth : 0, now = !!width;
      // a Narrow grid that became a list (or a table again): drawn again with the renderer that fits
      if (now && narrowNow(width) !== listRef.current) { setListNow(narrowNow(width)); shownBefore = now; lastWidth = width; return; }
      if (now && !shownBefore && tableRef.current && builtRef.current) tableRef.current.redraw();
      else if (now && width !== lastWidth && tableRef.current && builtRef.current && !frame) frame = requestAnimationFrame(() => { frame = 0; if (tableRef.current) reshare(tableRef.current); });
      shownBefore = now; lastWidth = width;
      fitRoom();
    });
    if (ro && frameRef.current) ro.observe(frameRef.current);
    const pane = autoFit && frameRef.current ? scrollerOf(frameRef.current) : null;
    if (ro && pane) ro.observe(pane);
    if (frameRef.current && narrowNow(frameRef.current.offsetWidth) !== listRef.current) setListNow(narrowNow(frameRef.current.offsetWidth));
    // printing: every row (of those loaded) is in the document while the page prints (React fills their cells first),
    // and the measured room is lifted
    const printing = (on) => () => {
      const t = tableRef.current; if (!t || !builtRef.current) return;
      const holder = hostRef.current && hostRef.current.querySelector('.tabulator-tableholder');
      if (on && autoFit && holder) holder.style.maxBlockSize = '';
      if (virtual) { virtualPrint(t, on); if (on) ReactDOM.flushSync(() => bump()); }
      if (!on) fitRoom();
    };
    const beforePrint = printing(true), afterPrint = printing(false);
    win.addEventListener('beforeprint', beforePrint); win.addEventListener('afterprint', afterPrint);

    return () => {
      alive = false; mo.disconnect(); if (unfloat) unfloat(); if (ro) ro.disconnect(); if (frame) cancelAnimationFrame(frame); builtRef.current = false;
      win.removeEventListener('beforeprint', beforePrint); win.removeEventListener('afterprint', afterPrint); win.removeEventListener('resize', onWindow);
      if (ioRef.current) { ioRef.current.disconnect(); ioRef.current = null; }
      if (table) { try { table.destroy(); } catch (e) { /* already gone */ } }
      tableRef.current = null; cells.current = new Map(); owners.current = new Map();
    };
    // built once per column shape; the data is replaced in place below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, selectable, headerMenu, !!rowMenu, props.rowMenuButton, typeof height === 'string' ? height : '', keys.join(SEP), attempt, storageKey || '', virtual, M, remote, step, viewMenu, !!onAddToGroup]);

  // the footer's numbers, after each render of the rows: the page, its range and the total ("pages"), or the rows shown
  // and the total ("load-more"); a page's rows carry their place in the whole set
  const syncFoot = (t) => {
    if (!t || (M !== 'pages' && M !== 'load-more')) return;
    const total = remote ? totalRef.current : t.getDataCount('active');
    let next;
    if (M === 'pages') {
      const size = t.getPageSize() || step, page = t.getPage() || 1, max = t.getPageMax() || 1;
      next = { page, max, size, total };
      if (t.element) t.element.setAttribute('aria-rowcount', String(total + 1));
      t.getRows('display').forEach((r, i) => { const e = r.getElement(); if (e) e.setAttribute('aria-rowindex', String((page - 1) * size + i + 2)); });
    } else next = { shown: remote ? t.getDataCount() : Math.min(countRef.current, total), total };
    footRef.current = next;
    setFoot((f) => (f && Object.keys(next).every((k) => f[k] === next[k]) ? f : next));
  };
  // load-more: the last row loaded is watched; as it comes within AHEAD of the view, the next rows are asked for
  const watchEnd = (t) => {
    if (M !== 'load-more' || !t || !hostRef.current) return;
    const win = hostRef.current.ownerDocument.defaultView, holder = hostRef.current.querySelector('.tabulator-tableholder');
    if (!ioRef.current) {
      if (!holder || typeof win.IntersectionObserver === 'undefined') return;   // the Load more button stays the way
      ioRef.current = new win.IntersectionObserver((list) => { if (list.some((e) => e.isIntersecting) && loadMoreRef.current) loadMoreRef.current(); },
        { root: holder, rootMargin: tablePx(AHEAD, hostRef.current) + 'px' });
    }
    const rows = t.getRows('display'), last = rows[rows.length - 1], el = last ? last.getElement() : null;
    if (el === ioRef.current.plxEl) return;
    ioRef.current.disconnect(); ioRef.current.plxEl = el;
    if (el) ioRef.current.observe(el);
  };
  // load-more: pageSize more rows (local: the page grows; remote: the next page from fetchRows), announced politely
  const loadMore = () => {
    const t = tableRef.current, L = loadRef.current, f = footRef.current;
    if (!t || !builtRef.current || L.busy || !f || f.shown >= f.total) return;
    const holder = hostRef.current && hostRef.current.querySelector('.tabulator-tableholder'), top = holder ? holder.scrollTop : 0;
    const before = f.shown, had = hostRef.current && hostRef.current.ownerDocument.activeElement;
    L.busy = true; setBusy(true);
    const done = () => {
      L.busy = false; setBusy(false);
      if (tableRef.current !== t) return;
      if (holder && holder.scrollTop !== top) holder.scrollTop = top;
      syncFoot(t); watchEnd(t);
      const now = footRef.current || f;
      announce(words(S.loaded, { n: formatNumber(now.shown - before), shown: formatNumber(now.shown), total: formatNumber(now.total) }));
      // the last rows came: the Load more button goes, and the focus it had goes to the scrolling body
      if (now.shown >= now.total && had && had.closest && had.closest('.' + B + '__more') && holder) holder.focus({ preventScroll: true });
    };
    const fail = (err) => { L.busy = false; setBusy(false); setError(err || new Error('The rows could not load')); };
    if (!remote) { countRef.current = Math.min(f.total, countRef.current + step); Promise.resolve(t.setPageSize(countRef.current)).then(done, fail); return; }
    const ask = Object.assign({}, L.ask, { page: L.pages + 1, size: step, search: latest.current.search });
    Promise.resolve(latest.current.fetchRows(ask)).then((r) => {
      if (tableRef.current !== t) return null;
      L.pages += 1; if (r && r.total != null) totalRef.current = Number(r.total);
      return t.addData((r && r.rows) || [], false);
    }).then(done, fail);
  };
  loadMoreRef.current = loadMore;
  // the page's search text (fetchRows): the first rows again
  const searchKey = search == null ? '' : String(search);
  const searched = React.useRef(searchKey);
  React.useEffect(() => {
    if (searched.current === searchKey) return;
    searched.current = searchKey;
    const t = tableRef.current; if (remote && t && builtRef.current) t.setData();
  }, [searchKey, remote]);

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

  // the column headers with a menu, in their order on screen (the visible ones)
  const menuHeaders = (table) => table.getColumns().filter((c) => c.isVisible()).map((c) => c.getElement()).filter((e) => e && e.getAttribute('aria-haspopup') === 'menu');
  // a header can be dragged onto another to move its column (options.movableColumns); its edge is Tabulator's resize
  // handle (drag it, or double-click it to fit the content), kept in the view
  const wireColumns = (table) => {
    const opt = latest.current.options || {};
    let dragged = null;
    table.getColumns().forEach((col) => {
      const el = col.getElement(), def = col.getDefinition();
      if (!el || el.hasAttribute('data-plx-wired')) return;
      el.setAttribute('data-plx-wired', '');
      // the column menu from the keyboard: Shift + F10 or the Menu key on a focused header (as a right-click does); the
      // headers are one Tab stop, Arrow Left and Right move between them (the grid pattern)
      if (def.headerContextMenu) {
        el.setAttribute('aria-haspopup', 'menu');
        el.setAttribute('aria-keyshortcuts', 'Shift+F10');
        el.tabIndex = -1;
        el.addEventListener('keydown', (ev) => {
          if (ev.target !== el) return;
          const step = (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') && !ev.altKey ? arrowStep(ev, el, { vertical: false }) : 0;
          if (step) {
            const all = menuHeaders(table), next = all[all.indexOf(el) + step];
            if (next) { ev.preventDefault(); all.forEach((h) => { h.tabIndex = h === next ? 0 : -1; }); next.focus(); }
            return;
          }
          if (!((ev.shiftKey && ev.key === 'F10') || ev.key === 'ContextMenu')) return;
          ev.preventDefault();
          const r = el.getBoundingClientRect();
          el.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: r.left, clientY: r.bottom }));
        });
        el.addEventListener('focus', () => { menuHeaders(table).forEach((h) => { h.tabIndex = h === el ? 0 : -1; }); });
      }
      if (opt.movableColumns && !def.frozen && !/__cell--view/.test(String(def.cssClass || ''))) {
        el.draggable = true;
        el.addEventListener('dragstart', (ev) => { if (ev.target.closest('.tabulator-col-resize-handle')) { ev.preventDefault(); return; } dragged = col; el.classList.add('tabulator-moving'); ev.dataTransfer.effectAllowed = 'move'; ev.dataTransfer.setData('text/plain', col.getField() || ''); });
        el.addEventListener('dragend', () => { el.classList.remove('tabulator-moving'); dragged = null; });
        el.addEventListener('dragover', (ev) => { if (dragged && dragged !== col) { ev.preventDefault(); el.classList.add(B + '__drop'); } });
        el.addEventListener('dragleave', () => el.classList.remove(B + '__drop'));
        el.addEventListener('drop', (ev) => { ev.preventDefault(); el.classList.remove(B + '__drop'); if (dragged && dragged !== col) { const from = dragged; dragged = null; from.move(col, true); const h = (latest.current.on || {}).columnMoved; if (h) h(from, table.getColumns()); saveView(); } });
      }
    });
    // one header with a menu is in the Tab order (the first, or the one used last)
    const heads = menuHeaders(table);
    if (heads.length && !heads.some((h) => h.tabIndex === 0)) heads[0].tabIndex = 0;
    if (table.plxWired) return;
    table.plxWired = true;
    // a width the person gave with the handle (drag, or double-click to fit) is kept in the view
    table.on('columnResized', (col) => { keepWidth(col); titleTips(); });
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
  // group rows: the chevron (a click), the keyboard on a focused group row (Enter or Space: open or close; Arrow Right:
  // open; Arrow Left: close; Arrow Down / Up: the next or previous group row), the sticky stand-ins, the state kept in the
  // view and announced ("Box + cask, group, 5 records, expanded")
  const wireGroups = (table, host) => {
    if (host.hasAttribute('data-plx-groups')) return;
    host.setAttribute('data-plx-groups', '');
    const holder = host.querySelector('.tabulator-tableholder');
    if (holder && !stickyRef.current) {
      const box = el('div', B + '__sticky-groups'); box.setAttribute('aria-hidden', 'true');
      holder.insertBefore(box, holder.firstChild); stickyRef.current = box;
      box.addEventListener('click', (ev) => { const w = ev.target.closest && ev.target.closest('.' + B + '__sticky-group'); if (w && ev.target.closest('.' + B + '__group-chevron')) toggleGroup(w.plxGroup); });
      let frame = 0;
      holder.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(() => { frame = 0; syncSticky(false); }); }, { passive: true });
    }
    host.addEventListener('click', (ev) => {
      const chev = ev.target.closest && ev.target.closest('.tabulator-group .' + B + '__group-chevron');
      const row = chev && chev.closest('.tabulator-group');
      if (row && row.plxGroup) { ev.stopPropagation(); toggleGroup(row.plxGroup); }
    });
    host.addEventListener('keydown', (ev) => {
      const row = ev.target, g = row && row.plxGroup;
      if (!g || !row.classList || !row.classList.contains('tabulator-group')) return;
      const open = typeof g.visible === 'function' ? true : !!g.visible, k = ev.key;
      const rtl = isRtl(row), into = rtl ? 'ArrowLeft' : 'ArrowRight', out = rtl ? 'ArrowRight' : 'ArrowLeft';
      if (k === 'Enter' || k === ' ') { ev.preventDefault(); toggleGroup(g, !open); }
      else if (k === into) { ev.preventDefault(); toggleGroup(g, true); }
      else if (k === out) { ev.preventDefault(); toggleGroup(g, false); }
      else if (k === 'ArrowDown' || k === 'ArrowUp') {
        const all = Array.from(host.querySelectorAll('.tabulator-group')), i = all.indexOf(row), next = all[i + (k === 'ArrowDown' ? 1 : -1)];
        if (next) { ev.preventDefault(); next.focus(); }
      }
    });
    table.on('groupVisibilityChanged', (comp, visible) => {
      const g = comp && comp._group; if (!g) return;
      const key = pathKey(g);
      if (visible) closedRef.current.delete(key); else closedRef.current.add(key);
      saveView();
      const P = g.plxParts;
      announce(words(S.groupRow, { value: g.plxText, count: formatNumber(P ? P.count : 0), records: P && P.count === 1 ? S.record : S.records }) + ', ' + (visible ? S.expanded : S.collapsed));
      requestAnimationFrame(() => syncSticky(true));
    });
    table.on('columnMoved', () => { table.plxColsVer = (table.plxColsVer || 0) + 1; redrawGroups(table); });
    table.on('columnVisibilityChanged', () => { table.plxColsVer = (table.plxColsVer || 0) + 1; redrawGroups(table); });
    table.on('dataGrouped', () => {
      // the React content of groups that are gone (a new grouping, new data) goes with them
      const live = new Set();
      (function walk(list) { (list || []).forEach((g) => { live.add(pathKey(g)); walk(g.groupList); }); })(table.modules.groupRows ? table.modules.groupRows.groupList : []);
      let gone = false;
      Array.from(groupCells.current.keys()).forEach((k) => { if (!live.has(k)) { groupCells.current.delete(k); gone = true; } });
      if (gone) bump();
    });
  };
  // a column name cut with "…" shows the full name in a tooltip (its title); a name that fits has none
  const titleTips = () => {
    const h = hostRef.current; if (!h) return;
    h.querySelectorAll('.tabulator-header .' + B + '__title-text').forEach((t) => {
      const cut = t.scrollWidth > t.clientWidth + 1 || t.scrollHeight > t.clientHeight + 1;
      if (cut) t.setAttribute('title', t.textContent); else t.removeAttribute('title');
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
      grip.setAttribute('aria-label', S.resize + ' ' + title);
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
  // a new row height step or Wrap headers: the stylesheet draws the rows and the header at once (the frame's data
  // attributes); the virtual renderer takes the new heights and keeps the row at the top of its view, the room "fill"
  // takes is measured again (the header may have grown), and the names cut with "…" are found again
  React.useEffect(() => {
    const t = tableRef.current; if (!t || !builtRef.current) return;
    virtualResync(t);
    if (fitRef.current) fitRef.current();
    titleTips(); syncSticky(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowStep, wrapHead]);

  // the page's view changed (the command bar's panels): applied to the grid already built
  const viewKey = JSON.stringify([props.sort, props.groupBy, props.columnOrder, props.hiddenColumns]);
  React.useEffect(() => { const t = tableRef.current; if (t && builtRef.current) applyView(t); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [viewKey, props.filter]);

  // new data in place: sort, filters, scroll and column widths stay. Rows equal to the ones shown (a page that builds its
  // rows again on every render) change nothing.
  const shown = React.useRef(null);
  React.useEffect(() => {
    const table = tableRef.current; if (!table || !builtRef.current || remote) return;
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
    // a group row's value, drawn as its column's cells draw it (a badge column shows the badge)
    groupCells.current.forEach((g, key) => {
      const c = columns.find((x) => x.field === g.c.field) || g.c;
      if (!c.render) return;
      portals.push(ReactDOM.createPortal(c.render(g.row, null), g.node, 'group' + SEP + key));
    });
    // the view menu (owner, 2026-10-14): Row height (a check on the current step, like Airtable) and Wrap headers
    if (viewMenu && !isStatic && viewNode.current) {
      const pick = (v) => { setRowStep(v); stepRef.current = v; saveView(); };
      const wrapToggle = () => { const v = !wrapRef.current; setWrapHead(v); wrapRef.current = v; saveView(); };
      portals.push(ReactDOM.createPortal(
        <Menu label={S.view} placement="bottom-end" trigger={<Button size="xs" variant="ghost" iconOnly icon="settings-customize" label={S.view} />}>
          <MenuRadioGroup label={S.rowHeight} value={rowStep} onChange={pick}>
            {ROW_HEIGHTS.map((v) => <MenuItem key={v} value={v}>{S[v]}</MenuItem>)}
          </MenuRadioGroup>
          <MenuDivider />
          <MenuItem checked={wrapHead} onSelect={wrapToggle}>{S.wrapHeaders}</MenuItem>
        </Menu>, viewNode.current, 'view'));
    }
  }

  // the error state (platforms.md 5.5: it names the problem, one action recovers): the page's failure, or the engine's
  const failed = failure || error;
  const retry = () => { if (error) { setError(null); setAttempt((n) => n + 1); } if (onRetry) onRetry(); };
  const reason = failed && failed !== true ? String(failed.message || failed) : null;
  // the footer (pages, load-more): Plenix components; numbers in the data font
  const n = formatNumber;
  let footer = null;
  if (!failed && foot && M === 'pages') {
    const first = foot.total ? (foot.page - 1) * foot.size + 1 : 0, last = Math.min(foot.total, foot.page * foot.size);
    const sizes = pageSizes.indexOf(foot.size) >= 0 ? pageSizes : pageSizes.concat([foot.size]).sort((a, b) => a - b);
    footer = (
      <div className={B + '__footer'}>
        <Text variant="data" className={B + '__range'}>{words(S.range, { first: n(first), last: n(last), total: n(foot.total) })}</Text>
        <label className={B + '__page-size'}>
          <span>{S.perPage}</span>
          <Select value={String(foot.size)} options={sizes.map((x) => ({ value: String(x), label: String(x) }))}
            onChange={(e) => { const t = tableRef.current; if (t) Promise.resolve(t.setPageSize(Number(e.target.value))).then(() => syncFoot(t)); }} />
        </label>
        <Pagination className={B + '__pages'} label={words(S.pages, { label: label || '' }).trim()} page={foot.page} pageCount={foot.max}
          onPageChange={(p) => { const t = tableRef.current; if (t) Promise.resolve(t.setPage(p)).then(() => syncFoot(t)); }} />
      </div>
    );
  } else if (!failed && foot && M === 'load-more') {
    footer = (
      <div className={B + '__footer'}>
        <Text variant="data" className={B + '__range'}>{words(S.count, { shown: n(foot.shown), total: n(foot.total) })}</Text>
        {foot.shown < foot.total ? <Button size="sm" className={B + '__more'} loading={busy} onClick={() => loadMore()}>{S.loadMore}</Button> : null}
      </div>
    );
  }
  return (
    <div ref={frameRef} className={cx(B, columns.some((c) => c.rowLabel) && B + '--row-header', height === '100%' && B + '--fill', listed && B + '--list', M === 'pages' && B + '--pages', M === 'load-more' && B + '--load-more', className)} data-plx-render={virtual ? 'virtual' : undefined}
      data-plx-height={height && height !== '100%' ? (sizeName(height) || undefined) : undefined} data-plx-fit={autoFit ? '' : undefined}
      data-plx-row-height={isStatic || listNow ? undefined : rowStep} data-plx-wrap-headers={!isStatic && wrapHead ? '' : undefined}>
      {failed ? (
        <EmptyState className={B + '__error'} tone="error" title={S.failed}
          action={error || onRetry ? <Button size="sm" icon="refresh" onClick={retry}>{S.retry}</Button> : null}>{reason}</EmptyState>
      ) : null}
      <div ref={hostRef} className={B + '__table'} hidden={failed ? true : undefined} />
      {footer}
      {isStatic ? null : (
        <div ref={probeRef} className={B + '__probe'} aria-hidden="true">
          <div data-plx-probe="record" /><div data-plx-probe="group" /><div data-plx-probe="band" /><div data-plx-probe="add" />
        </div>
      )}
      {portals}
    </div>
  );
}

// the interactive table: records to sort, filter, select, open, edit, group or nest
export function DataTable(props) { return <TableEngine {...props} isStatic={false} />; }
// starts loading the engine before the first grid mounts (a page whose first screen has a table calls it as it starts)
DataTable.preload = () => { loadTabulator().catch(() => {}); };
