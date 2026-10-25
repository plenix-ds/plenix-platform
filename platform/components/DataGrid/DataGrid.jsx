/* Plenix · DataGrid
   Summary: Records people work with, by column: sort, filter, select, open, edit, group or nest them. A React grid on
     TanStack Table (row models and column state) and TanStack Virtual (the rows drawn), both MIT and bundled into the
     Platform; every element is Plenix markup (plx-data-grid__*) drawn by data-grid.css with the data-grid tokens.
   Usage:
     <DataGrid label="Assets" data={assets} index="id" selectable
       columns={[
         { title: 'Attachments', field: 'attach', kind: 'icon', icon: 'attachment', sorter: 'number',
           render: (a) => (a.attach ? <Icon name="attachment" label={a.attach + ' attachments'} /> : null) },
         { title: 'Name', field: 'name', kind: 'name', filter: true, width: '--plx-ref-size-240px', editor: 'input' },
         { title: 'Status', field: 'status', kind: 'center', filter: 'list', render: (a) => <Badge tone="success">{a.status}</Badge> },
         { title: 'Size', field: 'size', type: 'bytes' }]}
       rowMenu={[{ label: 'Open', icon: 'open', onSelect: (a) => open(a) }, { separator: true },
                 { label: 'Delete', icon: 'trash', danger: true, onSelect: (a) => remove(a) }]}
       onRowClick={(asset) => open(asset)} />
   Props:
     label: names the grid for screen readers (required)
     data: the rows, plain objects; index: the field that identifies a row (default "id")
     columns: [{ title, field, … }]:
       kind: "name" (the row's name, medium weight) | "data" (technical values in the data font, Reddit Mono, on the row's
         baseline) | "icon" (a mark column as wide as the checkbox column; its header shows icon) | "center" (centered in
         the row's height: badges, buttons) | "actions" (row buttons, shown while the row is hovered or selected) | "wrap"
         (long text: the lines that fit the row height step, then an ellipsis) | "deleted" (muted italic) | "avatar-name"
         ({ name, src }) | "tags" ([{ label, category }]) | "badge" ({ label, tone, icon }); two combine as a list
         (["name", "data"])
       type: "text" (default) | "number" | "currency" | "date" | "select" | "checkbox" | "file" | "image" | "link" |
         "person" | "long-text" | "bytes" (file sizes; filters take "> 2 MB") | "multi" (several values: a grouped table
         puts the record in each of its groups): the header icon and the sort words
       groupable: false disables header grouping; groupRange: positive numeric bucket width; groupBucket(value): custom bucket label.
       groupBy also accepts [{ field, interval: "day" | "week" | "month" | "year", range }]; calendar periods use UTC, weeks start Monday.
       render(record): the cell as a React element; sorter: "string" | "number" | "date" | a compare function
         sorter(valueA, valueB, recordA, recordB, field, direction) returns ascending order; direction lets a fixed
         category order (such as folders first) compensate for the descending inversion
       filter: true (contains text) | "list" (one of the column's values); summary: "sum" | "count" | "average" | "min" |
         "max" in each group header; empty: the text for a missing value (zero and false are values)
       width: a CSS length or a size token ("--plx-ref-size-240px"; numbers snap to a size token); without it the column
         fits its content up to --plx-comp-data-grid-auto-max-width (360px; longer text ends in an ellipsis, the full
         text on hover) and the last such column takes the room left, so the grid fills its width; minWidth, maxWidth; frozen: pinned at the start; rowLabel: this and
         the columns before it are the row header (pinned and shaded)
       align, headerAlign: "left" | "center" | "right"; sortable: false turns sorting off; resizable: false
       editor: "input" | "number" (a Plenix input; double-click or Enter edits, Escape cancels); editable(record): which
         rows may edit; rowHandle: true makes the column the drag handle for moving rows
     selectable: the checkbox column (select all in its header); selected (keys) with onSelectionChange(keys,
       { count, hidden }); keepHiddenSelection (default true) keeps rows a filter hides selected
     unread(record) or unreadKeys: unread records; onUnreadChange(keys, {unreadCount}) controls updates. Unread text is semibold with the accent start bar.
     markReadOnOpen (default true), readDelay (milliseconds, default 0): opening with click/Enter marks read. Row and selection menus also mark read/unread.
     unreadOnly with onUnreadOnlyChange controls the unread filter. The controller exposes getUnreadCount(), markRead(keys), markUnread(keys).
     onRowClick(record, event), onRowDoubleClick(record, event): with them rows are focusable and Enter clicks;
       onCellEdit(record, { field, value, previous })
     density: "compact" (default: tables start Compact, owner 2026-10-22) | "standard" | "comfortable" | "page" (follow the
       page's density); set on the grid itself, so its rows (36 / 40 / 48px), header and pills follow it
     uniformPillWidths: with cells="pill", every standard pill of a column as wide as that column's widest pill in the
       current view (filtered and sorted, the current page, every row of it); columns stay independent; default false
     typeIcons: the column type icon before each header title (default: on in a DataGrid, off in the static Table);
       false hides them
     headerMenu (default true): a click on a title sorts; the options button at a header's end edge opens the column menu
       (sort in the type's words, filter by this field, group or don't group by this field); right-click on a header
       opens the column chooser (size this column or every column to fit, every column with a check, More… for the
       Manage columns dialog). columnMenu: the application's field actions first in the column menu (duplicate, insert
       left or right, copy link, description, permissions: [{ label, icon, onSelect(column), danger, disabled, separator }])
     Look (owner, 2026-10-23): a silver header (gray 50 to gray 200, a gray 400 line under it) 28/32/40px tall by
       density; hovered, every header line shows and the column under the pointer deepens with both edges in gray 400;
       a hovered row tints gray 100 with its lines in gray 300; a selected row is blue 100 with blue-gray lines and a 3px
       blue 600 bar at its start (blue 200 hovered); a click on a title sorts with no arrow drawn (aria-sort carries the order); an active filter shows a funnel
     rowMenu: [{ label, icon, onSelect(record), danger, disabled, separator }] or (record) => that list, opened by the
       row's button (rowMenuButton, default true) or right-click; DataGrid.useActions(actions, selectedKeys, strings)
       wraps selection commands with Undo for the CommandBar
     The page's view (the command bar drives it; each applies when it changes): filter(record), sort [{ field, dir }],
       groupBy (a field, or a list for nested groups), columnOrder, hiddenColumns; onAddToGroup(value, path): the add row
       at the end of each group
     tree: rows nest (children in childrenField, default "children"; the toggle in treeColumn; treeExpanded: start open)
     movableRows with onRowMove(records), movableColumns: drag, with the same moves in the menus
     rowHeight: "short" (the density's) | "medium" | "tall" | "extra-tall"; wrapHeaders; viewMenu: the grid's own view
       button (default false: the page's ViewMenu sets these)
     cells: "text" (default) | "pill": the pill view (owner, 2026-10-19): every value is a DataPill with its column's type
       icon (a calendar for a date, a person for a person; a person's value.gender makes it blue or pink with the male or
       female icon); technical values (numbers, currency, dates, sizes, kind data) in the data font. A column chooses per value
       with pill(value, record) → { tone, icon, variant, data, gender, fill } (a price band green to red, the sun or the moon
       by the hour) or keeps its plain value with pill: false. Tags, badges and deleted values keep their own look
     mode: "fill" (default: fills the room left on screen, virtual rows) | "pages" (pageSize, pageSizes, a footer with
       Pagination) | "load-more"; height: a size token or "100%" in place of the room "fill" measures
     fetchRows({ page, size, sort, filters, search }): rows from a server for "pages" and "load-more", returning
       { rows, total }; search: the page's search text
     storageKey: keeps the person's standalone view (sort, widths, order, hidden columns, row height, wrap, groups).
     onViewChange(patch): delegates view changes to an external controller; its presence disables the grid's own store.
       useCollectionView supplies this callback and columnWidths, so its collection state owns the view.
     narrow: "table" (default inside SplitView) | "list" (default elsewhere: under narrowAt, 600px, a list of keyColumns) | "auto"
     empty: shown when no row matches; error and onRetry(): the error state and its one recovery; strings: the words
     className: more classes on the frame
   Behavior:
     Search filtering yields to typing and evaluates each record once per predicate/data revision; numeric text collation and controlled sort state are reused.
     Width conversions are shared across cells and refreshed when the measured token environment changes.
     Horizontal body scrolling moves the column headers by the same amount; frozen headers and cells stay pinned.
       Pinned cells use the grid direction for placement, while their values retain automatic text direction.
     The grid is an ARIA grid: column headers (aria-sort), rows (aria-rowindex, aria-rowcount) and cells; its body is one
       Tab stop; the arrow keys move between cells, Home and End to the ends, Shift + F10 opens the focused header's or
       row's menu. Menus are ARIA menus. Selection, grouping and loading changes are announced politely.
     Every drag has a way without dragging (WCAG 2.5.7): Move up, down, to top and to bottom on a row; Move left and right
       on a column; a focused handle moves its row with Alt + Arrow keys. Column widths step through the size tokens.
     Geometry: the row height, cell padding and text size are the density's tokens; a taller row step puts content at the
       top with a Short row's padding. Group rows: a chevron, the field as an eyebrow, the value and the record count,
       one sunken band between groups; group headers stick while their rows scroll; the grouped-by column is tinted.
     Virtual rows: only the rows in view are drawn; the rows not drawn are token-sized gaps (every row height is known,
       nothing is measured); printing and copying use every loaded row. Narrow: the key columns as a list, with the
       checkbox, handle and row actions kept.
   Notes:
     Inline styles only where the owner allows them (2026-10-13): column widths that equal a size token and the virtual
     gaps' heights from the tokens; never a row height, line height or cell padding. Hover, selected and selected + hover
     are three row colors; pinned and row-header cells follow the row.
*/
import React from 'react';
import { DataGridEngine } from './DataGridEngine.jsx';
import { useDataGridActions } from './actions.jsx';
import { ToastProvider } from '../Toast/Toast.jsx';
import { useOptionalToast } from '../../patterns/ReviewFlow/ReviewFlow.jsx';

// the row menu's actions with Undo, as the CommandBar's selection commands
function ActionTable(props) { const rowMenu = useDataGridActions(props.rowMenu, undefined, props.strings); return <DataGridEngine {...props} rowMenu={rowMenu} />; }

export function DataGrid(props) { const toast = useOptionalToast(); return toast ? <ActionTable {...props} /> : <ToastProvider><ActionTable {...props} /></ToastProvider>; }
DataGrid.useActions = useDataGridActions;
// nothing to load ahead: the engine is part of the Platform bundle (kept so pages that called it keep working)
DataGrid.preload = () => {};
