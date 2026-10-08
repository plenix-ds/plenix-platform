/* Plenix · Notice
   Summary: A short message inside a page, a panel or a dialog (an inline message).
     It shows its tone's soft surface and content color, an icon and the text.
   Usage:
     <Notice tone="warning">This folder is shared with 3 people.</Notice>
   Props:
     tone: "info" (default) | "success" | "warning" | "danger"
     icon: an icon name; the tone's icon unless given
     className: more classes on the notice
     children: the message text
     ...rest: other attributes go on the notice element
   Behavior:
     A danger notice has role="alert", so screen readers announce it.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';

const ICONS = { info: 'info-circle', success: 'circle-check', warning: 'warning', danger: 'alert' };
export function Notice({ tone = 'info', icon, className, children, ...rest }) {
  return (
    <div className={cx('plx-notice', 'plx-notice--' + tone, className)} role={tone === 'danger' ? 'alert' : undefined} {...rest}>
      <Icon name={icon || ICONS[tone]} /><div className="plx-notice__text">{children}</div>
    </div>
  );
}
