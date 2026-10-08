/* Plenix · Table
   Summary: Rows of records with columns.
   Usage:
     <Table caption="Assets" rows={assets} rowKey="id"
       columns={[{ key: 'name', header: 'Name', emphasis: true, sortable: true }, { key: 'size', header: 'Size', align: 'end', data: true }]}
       sort={sort} onSortChange={setSort} selectable selected={keys} onSelectionChange={setKeys} onRowClick={(row) => …} />
   Props:
     columns: the columns, in order: [{ key, header, render(row), align, label, size, sortable, width }]
     columns[].key: the column's key; the cell shows row[key] unless render is given
     columns[].header: the header content
     columns[].render(row): returns the cell content
     columns[].align: "start" (default) | "end"
     columns[].data, columns[].emphasis: kept for older callers; every body cell is in the data font, regular weight
     columns[].label: true: the label column (the first column naming each row, the other columns describing it), shaded
       like the header row and the PropertyList label column; it keeps its shade on hover and selection
     columns[].sortable: the header can sort the table (with onSortChange)
     columns[].size: "label" | "visual": a named column width (--plx-comp-table-column-<size>-width), the same in every
       table, so tables line up; columns with no size share the rest
     columns[].width: a size token, var(--plx-ref-size-…), for a column no named size fits
     rows: the records
     rowKey: "id" (default), another field name, or a function (row, index) that returns the key
     caption: names the table
     captionHidden: the caption is visually hidden; default true
     sort: { key, direction: "ascending" | "descending" }
     onSortChange(next): runs when a sortable header is clicked
     selectable: adds a checkbox column with select all; default false
     selected: the keys of the selected rows; default []
     onSelectionChange(keys): runs when the selection changes
     onRowClick(row): makes rows open on click and on Enter
     current: the key of the row whose details are shown
     empty: shown when there are no rows; default "Nothing to show"
     stickyHeader: the header row stays in view while the table scrolls; default false
     pinFirst: the first column stays in view while the table scrolls sideways; default false
     className: more classes on the wrapper around the table
   Behavior:
     With sort and onSortChange, sortable headers are buttons and the header carries aria-sort.
     Clicking a sorted ascending header sorts descending; otherwise it sorts ascending.
     Select all shows mixed when only some rows are selected.
     With onRowClick, each row is focusable.
     The current row carries aria-current and is drawn like a selected row.
   Notes:
     Row height follows the density (--plx-sys-table-row-height).
     Every data grid has one typography: the header in the body font, 11px semibold; every body cell in the data font,
     11px regular.
     The table fills its width and every column sizes to its content (the owner, batch 193); a named size is the column's
     width when its content fits.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

const keyOf = (row, rowKey, i) => (typeof rowKey === 'function' ? rowKey(row, i) : (row[rowKey] !== undefined ? row[rowKey] : i));

function SelectAll({ state, onChange, label }) {
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = state === 'mixed'; }, [state]);
  return <input ref={ref} type="checkbox" className="plx-table__check" aria-label={label} checked={state === 'all'} onChange={(e) => onChange(e.target.checked)} />;
}

export function Table({ columns, rows, rowKey = 'id', caption, captionHidden = true, sort, onSortChange, selectable = false, selected = [],
  onSelectionChange, onRowClick, current, empty = 'Nothing to show', stickyHeader = false, pinFirst = false, className }) {
  const keys = rows.map((r, i) => keyOf(r, rowKey, i));
  const chosen = new Set(selected);
  const count = keys.filter((k) => chosen.has(k)).length;
  const state = count === 0 ? 'none' : (count === keys.length ? 'all' : 'mixed');
  const setRow = (k, on) => { const next = new Set(chosen); if (on) next.add(k); else next.delete(k); onSelectionChange(Array.from(next)); };
  const toggleSort = (c) => {
    const dir = sort && sort.key === c.key && sort.direction === 'ascending' ? 'descending' : 'ascending';
    onSortChange({ key: c.key, direction: dir });
  };
  const span = columns.length + (selectable ? 1 : 0);
  return (
    <div className={cx('plx-table-wrap', stickyHeader && 'plx-table-wrap--sticky', className)}>
      <table className={cx('plx-table', pinFirst && 'plx-table--pin-first')}>
        {caption ? <caption className={cx('plx-table__caption', captionHidden && 'plx-visually-hidden')}>{caption}</caption> : null}
        <thead>
          <tr>
            {selectable ? <th scope="col" className="plx-table__select"><SelectAll state={state} label="Select all rows" onChange={(on) => onSelectionChange(on ? keys : [])} /></th> : null}
            {columns.map((c) => {
              const sorted = sort && sort.key === c.key ? sort.direction : undefined;
              return (
                <th key={c.key} scope="col" aria-sort={c.sortable ? (sorted || 'none') : undefined} style={{ '--plx-comp-table-column-width': c.width || undefined }}
                  className={cx('plx-table__header', c.size && 'plx-table__column--' + c.size, c.width && 'plx-table__column--width', c.align === 'end' && 'plx-table__cell--end')}>
                  {c.sortable && onSortChange ? (
                    <button type="button" className={cx('plx-table__sort', sorted && 'is-sorted', sorted === 'descending' && 'is-descending')} onClick={() => toggleSort(c)}>
                      {c.header}<span className="plx-table__sort-arrow" aria-hidden="true" />
                    </button>
                  ) : c.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? <tr><td colSpan={span} className="plx-table__empty">{empty}</td></tr> : rows.map((row, i) => {
            const k = keys[i];
            const on = chosen.has(k);
            const open = onRowClick ? () => onRowClick(row) : undefined;
            return (
              <tr key={k} aria-selected={selectable ? on : undefined} aria-current={current !== undefined && k === current ? 'true' : undefined} tabIndex={onRowClick ? 0 : undefined}
                className={cx('plx-table__row', onRowClick && 'is-clickable', on && 'is-selected', current !== undefined && k === current && 'is-current')} onClick={open}
                onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter' && e.target === e.currentTarget) { e.preventDefault(); open(); } } : undefined}>
                {selectable ? (
                  <td className="plx-table__select" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="plx-table__check" aria-label={'Select row ' + (i + 1)} checked={on} onChange={(e) => setRow(k, e.target.checked)} />
                  </td>
                ) : null}
                {columns.map((c) => (
                  <td key={c.key} className={cx('plx-table__cell', c.label && 'plx-table__cell--label', c.align === 'end' && 'plx-table__cell--end')}>
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
