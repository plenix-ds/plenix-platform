/* Plenix · Table
   Summary: Static reference information in rows and columns, using the DataTable's React renderer and Table tokens.
   Usage: <Table label="Fields" data={fields} columns={[{title:'Field',field:'name',rowLabel:true},{title:'Notes',field:'notes',kind:'wrap'}]} />
   Props:
     label: accessible table name (required); data: records; columns: title, field, kind, render(record), width,
       minWidth, maxWidth, rowLabel, frozen, hozAlign and headerHozAlign. index identifies records (default "id").
     empty: no-record message; height: optional token-sized scroll area; narrow: "table" by default; className.
     Table.preload(): compatibility no-op; the renderer is already bundled.
   Behavior: Every row is drawn. No sorting, filters, menus, selection, resizing, moving, editing or row hover.
     Links and controls supplied as cell content retain their own behavior. Wrapped cells stretch the entire row.
   Notes: Existing Table tokens preserve the static-table look; use DataTable for records people work with. */
import React from 'react';
import { DataTableNext } from '../DataTableNext/DataTableNext.jsx';

export function Table({ label, data, columns = [], index, empty, height, narrow = 'table', headerVisible = true, className }) {
  const staticColumns = React.useMemo(() => columns.map(({ title, field, kind, render, width, minWidth, maxWidth, rowLabel, frozen, hozAlign, headerHozAlign, empty }) =>
    ({ title, field, kind, render, width, minWidth, maxWidth, rowLabel, frozen, hozAlign, headerHozAlign, empty, headerSort: false, resizable: false })), [columns]);
  return <DataTableNext isStatic label={label} data={data} columns={staticColumns} index={index} empty={empty} height={height} narrow={narrow} headerVisible={headerVisible} className={className} headerMenu={false} />;
}
Table.preload = () => {};
