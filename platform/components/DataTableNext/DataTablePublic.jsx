/* Plenix · DataTable
   Summary: Records people work with, by column: sort, filter, select, open, edit, group or nest them. A React grid on
     TanStack Table (row models and column state) and TanStack Virtual (the rows drawn), both MIT and bundled into the
     Platform; every element is Plenix markup (plx-data-table__*) drawn by data-table-next.css with the data-table tokens.
   Usage:
     <DataTable label="Assets" data={assets} index="id" selectable
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
       render(record): the cell as a React element; sorter: "string" | "number" | "date" | a compare function
         sorter(valueA, valueB, recordA, recordB, field, direction) returns ascending order; direction lets a fixed
         category order (such as folders first) compensate for the descending inversion
       filter: true (contains text) | "list" (one of the column's values); summary: "sum" | "count" | "average" | "min" |
         "max" in each group header; empty: the text for a missing value (zero and false are values)
       width: a CSS length or a size token ("--plx-ref-size-240px"; numbers snap to a size token); without it the column
         fits its content and shares the room left; minWidth, maxWidth; frozen: pinned at the start; rowLabel: this and
         the columns before it are the row header (pinned and shaded)
       hozAlign, headerHozAlign: "left" | "center" | "right"; headerSort: false turns sorting off; resizable: false
       editor: "input" | "number" (a Plenix input; double-click or Enter edits, Escape cancels); editable(record): which
         rows may edit; rowHandle: true makes the column the drag handle for moving rows
     selectable: the checkbox column (select all in its header); selected (keys) with onSelectionChange(keys,
       { count, hidden }); keepHiddenSelection (default true) keeps rows a filter hides selected
     onRowClick(record, event), onRowDoubleClick(record, event): with them rows are focusable and Enter clicks;
       onCellEdit(record, { field, value, previous })
     headerMenu (default true): the column menu (sort in the type's words, filter, group, width, move, hide); columnMenu:
       the application's field actions first in it ([{ label, icon, onSelect(column), danger, disabled, separator }])
     rowMenu: [{ label, icon, onSelect(record), danger, disabled, separator }] or (record) => that list, opened by the
       row's button (rowMenuButton, default true) or right-click; DataTable.useActions(actions, selectedKeys, strings)
       wraps selection commands with Undo for the CommandBar
     The page's view (the command bar drives it; each applies when it changes): filter(record), sort [{ field, dir }],
       groupBy (a field, or a list for nested groups), columnOrder, hiddenColumns; onAddToGroup(value, path): the add row
       at the end of each group
     tree: rows nest (children in childrenField, default "_children"; the toggle in treeColumn; treeExpanded: start open)
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
     storageKey: keeps the person's view (sort, widths, order, hidden columns, row height, wrap, groups) in this browser
     narrow: "list" (default: under narrowAt, 600px of its own width, a list of keyColumns) | "table" | "auto"
     empty: shown when no row matches; error and onRetry(): the error state and its one recovery; strings: the words
     className: more classes on the frame
   Behavior:
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
import { DataTableNext } from './DataTableNext.jsx';
import { useDataTableActions } from './actions.jsx';
import { ToastProvider } from '../Toast/Toast.jsx';
import { useOptionalToast } from '../../patterns/ReviewFlow/ReviewFlow.jsx';

// the row menu's actions with Undo, as the CommandBar's selection commands
function ActionTable(props) { const rowMenu = useDataTableActions(props.rowMenu, undefined, props.strings); return <DataTableNext {...props} rowMenu={rowMenu} />; }

export function DataTable(props) { const toast = useOptionalToast(); return toast ? <ActionTable {...props} /> : <ToastProvider><ActionTable {...props} /></ToastProvider>; }
DataTable.useActions = useDataTableActions;
// nothing to load ahead: the engine is part of the Platform bundle (kept so pages that called it keep working)
DataTable.preload = () => {};
