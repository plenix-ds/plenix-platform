/* Plenix · EmptyState
   Summary: What a region shows when it has nothing yet, and how to add the first item.
   Usage:
     <EmptyState size="page" icon="folder" title="No assets yet" action={<Button variant="primary">Upload</Button>}>
       Upload files to start.</EmptyState>
   Props:
     size: "inline" (default; a line inside a list or table area) | "page" (a whole view)
     icon: an icon name or an <Icon> (or other mark); hidden from assistive technology
     title: the main line
     action: a button
     children: the explaining text
     className: more classes on the region
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

export function EmptyState({ size = 'inline', icon, title, action, className, children, ...rest }) {
  return (
    <div className={cx('plx-empty-state', 'plx-empty-state--' + size, className)} {...rest}>
      {icon ? <div className="plx-empty-state__icon" aria-hidden="true">{typeof icon === 'string' ? <Icon name={icon} /> : icon}</div> : null}
      {title ? <div className="plx-empty-state__title">{title}</div> : null}
      {children ? <div className="plx-empty-state__text">{children}</div> : null}
      {action ? <div className="plx-empty-state__action">{action}</div> : null}
    </div>
  );
}
