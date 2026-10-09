/* Plenix · Preview
   Summary: The large picture of the item an inspector shows (or a placeholder with its icon and count).
     It is the sunken surface, rounded, in a standard image shape (4:3 by default), with its content centered.
   Usage:
     <Preview as="button" onClick={openViewer} topStart={<Tag>PNG</Tag>} bottomEnd={<Icon name="expand" />}>
       <img src={src} alt="" />
     </Preview>
   Props:
     as: "div" (default) | "button" (opens the item, e.g. the media viewer)
     aspect: the shape, as a photo's: "4/3" (default) | "3/2" | "1/1" | "16/9" (as MediaCard's)
     topStart: a small mark in the top-start corner (the type)
     bottomEnd: a small mark in the bottom-end corner (an expand icon)
     className: more classes on the preview
     children: the picture or placeholder
     ...rest: other attributes go on the preview element (onClick for a button)
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Preview({ as: As = 'div', aspect = '4/3', topStart, bottomEnd, className, children, ...rest }) {
  return (
    <As type={As === 'button' ? 'button' : undefined} className={cx('plx-preview', As === 'button' && 'plx-preview--button', className)}
      style={{ '--plx-comp-preview-aspect': aspect.replace('/', ' / ') }} {...rest}>
      {children}
      {topStart ? <span className="plx-preview__corner plx-preview__corner--top-start">{topStart}</span> : null}
      {bottomEnd ? <span className="plx-preview__corner plx-preview__corner--bottom-end">{bottomEnd}</span> : null}
    </As>
  );
}
