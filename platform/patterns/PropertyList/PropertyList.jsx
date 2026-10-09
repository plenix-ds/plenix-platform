/* Plenix · PropertyList
   Summary: Label and value pairs (metadata, details, settings summaries), as a description list.
   Usage:
     <PropertyList layout="columns">
       <PropertyList.Item label="Size" data>2.4 MB</PropertyList.Item>
     </PropertyList>
   Props:
     layout: "columns" (default; label and value side by side on a shared baseline) | "stacked" (label above value)
     className: more classes on the list
     children: the PropertyList.Item pairs
     PropertyList.Item.label: the label
     PropertyList.Item.htmlFor: the id of a control in the item, so the label names it
     PropertyList.Item.description: a line under the label
     PropertyList.Item.data: the value is a technical value (the data font); default false
     PropertyList.Item.className: more classes on the pair
     PropertyList.Item.children: the value
   Notes:
     For an editable value put the control in the item and pass htmlFor (its id) so the label names it.
     A name/value table (reference data, a component's details) is a DataGrid, not a PropertyList: every table is a
     Tabulator grid (batch 229).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function PropertyList({ layout = 'columns', className, children }) {
  return <dl className={cx('plx-property-list', 'plx-property-list--' + layout, className)}>{children}</dl>;
}

PropertyList.Item = function PropertyListItem({ label, htmlFor, description, data = false, className, children }) {
  return (
    <div className={cx('plx-property-list__item', className)}>
      <dt className="plx-property-list__label">{htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}
        {description ? <span className="plx-property-list__description">{description}</span> : null}
      </dt>
      <dd className={cx('plx-property-list__value', data && 'plx-property-list__value--data')}>{children}</dd>
    </div>
  );
};
