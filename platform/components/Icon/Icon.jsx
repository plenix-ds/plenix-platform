/* Plenix · Icon
   Summary: One icon of the Plenix set, drawn as a mask in the current text color.
   Usage:
     <Icon name="folder" />
     <Icon name="star" size="sm" filled label="Favorite" />
   Props:
     name: the Plenix icon name (platform/icons/map.json)
     size: "xs" 12px | "sm" 16px | "md" 20px | "lg" 24px | "xl" 48px, a page title (--plx-sys-icon-size-*); without it the icon takes its container's
       grid icon (a control's --plx-sys-control-icon-<role>) or --plx-sys-icon-size
     filled: the filled version (default false)
     label: the accessible name, when the icon alone carries meaning
     className: more classes on the icon
   Behavior:
     The filled version is also drawn automatically inside a current or selected element: aria-current, aria-pressed,
       aria-selected, .is-selected, .is-current.
     A pinned item shows the filled pin, not a filled row.
     Without a label the icon is decorative and hidden from assistive technology; with one it is an image (role="img").
   Notes:
     The set is Material Symbols Sharp, weight 300, used exactly as published (platform/icons/).
     The size names the icon's whole square, which includes the set's own padding (1/12 of the square on each side): the
       system adds none to make up for it.
     Other props pass through to the <span>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Icon({ name, size, filled = false, label, className, ...rest }) {
  return (
    <span className={cx('plx-icon', 'plx-icon--' + name, size ? 'plx-icon--size-' + size : null, filled && 'plx-icon--filled', className)}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest} />
  );
}
