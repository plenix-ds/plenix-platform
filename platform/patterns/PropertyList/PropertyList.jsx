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
     PropertyList.Item.data: the value is a technical value (a size, a date, an ID, a file name): the data font, Reddit Mono,
       at the value size, so it shares the label's baseline; names, descriptions and statuses stay DM Sans; default false.
       It keeps its own writing direction in a right-to-left page (Isolate dir="auto"); a data value is text only (no links,
       controls or other parts inside it)
     PropertyList.Item.className: more classes on the pair
     PropertyList.Item.children: the value
   Notes:
     For an editable value put the control in the item and pass htmlFor (its id) so the label names it.
     A list of name/value facts shown as reference (a component's details, a capability's facts) is the defined data grid
       with a header row (Table / DataGrid), not a PropertyList (owner, 2026-10-09, replacing batch 296's rule); a
       PropertyList is for an item's own details in a panel (an inspector, a form's summary).
     Other props (aria-label) reach the <dl>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useTruncated } from '../../utils/overflow.js';
import { Tooltip } from '../../components/Tooltip/Tooltip.jsx';
import { Isolate } from '../../components/Isolate/Isolate.jsx';

export function PropertyList({ layout = 'columns', className, children, ...rest }) {
  return <dl className={cx('plx-property-list', 'plx-property-list--' + layout, className)} {...rest}>{children}</dl>;
}

PropertyList.Item = function PropertyListItem({ label, htmlFor, description, data = false, className, children }) {
  const textRef = React.useRef(null);
  const cut = useTruncated(textRef);
  return (
    <div className={cx('plx-property-list__item', className)}>
      <dt className="plx-property-list__label"><Tooltip content={label} disabled={!cut} describe={false} className="plx-property-list__label-tip"><span ref={textRef} className="plx-property-list__label-text">{htmlFor ? <label htmlFor={htmlFor}>{label}</label> : label}</span></Tooltip>
        {description ? <span className="plx-property-list__description" data-plx-text-follow="size">{description}</span> : null}
      </dt>
      <dd className={cx('plx-property-list__value', data && 'plx-property-list__value--data')} data-plx-text-follow="size">{data ? <Isolate dir="auto">{children}</Isolate> : children}</dd>
    </div>
  );
};
