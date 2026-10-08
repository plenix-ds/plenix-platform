/* Plenix · Toolbar, Toolbar.Group, Toolbar.Spacer
   Summary: One row of controls (role="toolbar").
   Usage:
     <Toolbar label="Asset actions">
       <Toolbar.Group>…</Toolbar.Group>
       <Toolbar.Spacer/>
       <Toolbar.Group>…</Toolbar.Group>
     </Toolbar>
   Props:
     Toolbar.label: its accessible name
     Toolbar.onKeyDown(event): runs first; preventDefault stops the toolbar's own key handling
     Toolbar.className: more classes on the toolbar
     Toolbar.children: the controls, groups and spacers
     Toolbar.Group.className: more classes on the group
     Toolbar.Group.children: the controls in the group
     Toolbar.Spacer: pushes what follows to the end of the row; no props
   Behavior:
     Arrow keys move between its controls (wrapping); Home and End jump to the first and last.
     Tab leaves the toolbar.
     In a text field, Left and Right move the caret instead.
     In a radio group, only the checked option is a stop.
   Notes:
     Every control in it takes the toolbar control height.
     Other props reach the toolbar or group element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

const FOCUSABLE = 'button:not([disabled]),input:not([disabled]),select:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])';

export function Toolbar({ label, className, children, onKeyDown, ...rest }) {
  const ref = React.useRef(null);
  const onKey = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
    if (e.target.tagName === 'INPUT' && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;   // the caret moves inside a field
    const items = Array.prototype.filter.call(ref.current.querySelectorAll(FOCUSABLE), (el) => el.offsetParent !== null && !el.closest('[role="radiogroup"] [aria-checked="false"]'));
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : e.key === 'ArrowRight' ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
    e.preventDefault(); items[n].focus();
  };
  return <div ref={ref} role="toolbar" aria-label={label} className={cx('plx-toolbar', className)} onKeyDown={onKey} {...rest}>{children}</div>;
}
Toolbar.Group = function ToolbarGroup({ className, children, ...rest }) {
  return <div className={cx('plx-toolbar__group', className)} {...rest}>{children}</div>;
};
Toolbar.Spacer = function ToolbarSpacer() {
  return <div className="plx-toolbar__spacer" aria-hidden="true" />;
};
