/* Plenix · Table
   Summary: A static table: information in rows and columns, read and nothing else. It looks like a DataTable (the same
     header, lines, type and row heights, from its own tokens) and runs on the same Tabulator engine, with no sorting,
     filters, menus, selection, resizing, moving, editing or row hover.
   Usage:
     <Table label="Fields" data={fields} columns={[
       { title: 'Field', field: 'name', kind: 'name', rowLabel: true, width: '--plx-ref-size-240px' },
       { title: 'Type', field: 'type', kind: 'data' },
       { title: 'Notes', field: 'notes', kind: 'wrap' }]} />
   Props:
     label: names the table for screen readers (required)
     data: the rows: plain objects with an id (or name the field with index)
     columns: Tabulator column definitions (title, field, hozAlign, width…) with the Plenix kinds: "name", "data", "wrap",
       "center", "icon"; render(row) for React content; rowLabel for the row header. Interactive options are ignored.
     index: the field that identifies a row; default "id"
     empty: shown when there are no rows; default "Nothing to show"
     height: a fixed height (a size token) for a long table; rows render as they scroll into view
     options: Tabulator table options that only change the layout (layout, headerVisible…)
     className: more classes on the frame
     Table.preload(): starts loading Tabulator now; call it as a page whose first screen has a table starts
   Behavior:
     Nothing reacts to the pointer: rows do not highlight, headers do not sort, there is no menu. Links and buttons placed
     in cells work as themselves. Row height and text size follow the density.
   Notes:
     For records people work with (sort, filter, select, open, edit) use DataTable. Its look comes from --plx-sys-table-*
     and --plx-comp-table-* tokens (table.css), separate from the DataTable's, with the same values by default.
*/
import React from 'react';
import { TableEngine } from '../DataTable/DataTable.jsx';
import { loadTabulator } from '../DataTable/tabulator.js';

export function Table(props) { return <TableEngine {...props} isStatic />; }
// starts loading the engine before the first table mounts (see DataTable.preload)
Table.preload = () => { loadTabulator().catch(() => {}); };
