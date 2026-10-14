/* Plenix · Table
   Summary: A static table: information in rows and columns, read and nothing else. It IS a DataTable (the same classes,
     .plx-data-table, and the same tokens, --plx-sys-data-table-* and --plx-comp-data-table-*; owner, 2026-10-09) with the
     interaction off: no sorting, filters, menus, selection, resizing, moving, editing or row hover.
   Usage:
     <Table label="Fields" data={fields} columns={[
       { title: 'Field', field: 'name', kind: 'name', rowLabel: true, width: '--plx-ref-size-240px' },
       { title: 'Type', field: 'type', kind: 'data' },
       { title: 'Notes', field: 'notes', kind: 'wrap' }]} />
   Props:
     label: names the table for screen readers (required)
     data: the rows: plain objects with an id (or name the field with index)
     columns: Tabulator column definitions (title, field, hozAlign, width…) with the Plenix kinds: "name", "data" (technical
       values: the data font, DM Mono, at the table's size), "wrap", "center", "icon", or two as a list
       (["name", "data"]); render(row) for React content; rowLabel for the row header. Interactive options are ignored.
     index: the field that identifies a row; default "id"
     empty: shown when there are no rows; default "Nothing to show"
     height: a fixed height (a size token) for a long table; its rows scroll inside it, and only the rows in view are drawn
     options: Tabulator table options that only change the layout (layout, headerVisible…)
     className: more classes on the frame
     Table.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Nothing reacts to the pointer: rows do not highlight, headers do not sort, there is no menu. Links and buttons placed
     in cells work as themselves. Row height, cell padding and text size follow the density; column widths are
     measured by Tabulator (a width a column gives is kept), as in the DataTable. Vertical alignment: middle in every cell.
   Notes:
     For records people work with (sort, filter, select, open, edit) use DataTable. Every name/value list of reference facts
     (the design system's details, Settings and Capture) is a Table with a header row.
*/
import React from 'react';
import { TableEngine } from '../DataTable/DataTable.jsx';
import { loadTabulator } from '../DataTable/tabulator.js';

export function Table(props) { return <TableEngine {...props} isStatic />; }
// starts loading the engine before the first table mounts (see DataTable.preload)
Table.preload = () => { loadTabulator().catch(() => {}); };
