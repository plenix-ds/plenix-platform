/* Plenix · VisuallyHidden
   Summary: Text for assistive technology only (a name for an icon-only control, a status).
   Usage:
     <button type="button"><Icon name="trash" /><VisuallyHidden>Delete</VisuallyHidden></button>
   Props:
     as: the element; default "span"
     children: the hidden text
     ...rest: other attributes go on the element
*/
import React from 'react';

export function VisuallyHidden({ as: Tag = 'span', children, ...rest }) {
  return <Tag className="plx-visually-hidden" {...rest}>{children}</Tag>;
}
