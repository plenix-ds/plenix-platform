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
     Toolbar.children: controls, groups and spacers. Stack and Inline layout wrappers (also nested inside Group) are transparent: toolbar spacing applies to their controls.
       Keep semantic composites together; do not wrap popup internals in a layout wrapper intended to be flattened.
     Toolbar.Group.className: more classes on the group
     Toolbar.Group.children: the controls in the group
     Toolbar.Spacer: pushes what follows to the end of the row; no props
   Behavior:
     One Tab stop: Tab enters and leaves the toolbar; the current control (the one last used) is in the Tab order.
     Arrow keys move between its controls in reading order (wrapping; reversed in right to left); Home and End jump to the
     first and last.
     Tab leaves the toolbar.
     Text fields, text areas, selects and editable regions keep their own arrow and Home/End behavior.
     Descendant controls are discovered through wrappers; nested toolbars retain their own focus scope.
     In a radio group, only the checked option is a stop.
   Notes:
     Every control in it takes the toolbar control height.
     Other props reach the toolbar or group element.
*/
import React from 'react';
import { useRovingFocus, roveTo } from '../../utils/roving.js';
import { arrowStep } from '../../utils/direction.js';
import { cx } from '../../utils/cx.js';

const POPUP = '[role="dialog"],[role="alertdialog"],[role="menu"],[role="listbox"],[role="tree"],[role="grid"],[role="tablist"]';
const FOCUSABLE = 'button,input,textarea,select,a[href],[tabindex],[contenteditable="true"]';

export function Toolbar({ label, className, children, onKeyDown, onFocus, ...rest }) {
  const ref = React.useRef(null);
  const itemsOf = () => (ref.current ? Array.prototype.filter.call(ref.current.querySelectorAll(FOCUSABLE), (el) =>
    el.closest('[role="toolbar"]') === ref.current && (!el.closest(POPUP) || !ref.current.contains(el.closest(POPUP))) && el.getClientRects().length && getComputedStyle(el).visibility === 'visible'
    && !el.matches(':disabled,[aria-disabled="true"]') && !el.closest('[inert],[aria-hidden="true"]')
    && !el.closest('[role="radiogroup"] [aria-checked="false"]')
    && (el.matches('button,input,textarea,select,a[href],[contenteditable="true"]') || el.tabIndex >= 0 || el.hasAttribute('data-plx-roving'))) : []);
  React.useEffect(() => {
    const root = ref.current; if (!root) return;
    const refresh = () => {
      root.querySelectorAll('[data-plx-toolbar-layout]').forEach((el) => { if (el.closest('[role="toolbar"]') === root) el.removeAttribute('data-plx-toolbar-layout'); });
      const visit = (parent) => Array.from(parent.children).forEach((el) => {
        if (el.matches('.plx-stack,.plx-inline') && getComputedStyle(el).display !== 'none') { el.setAttribute('data-plx-toolbar-layout', ''); visit(el); }
        else if (el.classList.contains('plx-toolbar__group')) visit(el);
      });
      visit(root);
      const items = itemsOf();
      roveTo(ref, items, items.find((el) => el.getAttribute('data-plx-roving') === 'current') || items[0]);
    };
    refresh();
    const observer = new MutationObserver(refresh);
    observer.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled', 'hidden', 'inert', 'aria-hidden', 'aria-disabled', 'class'] });
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(refresh) : null;
    if (resize) resize.observe(root);
    window.addEventListener('resize', refresh);
    return () => { observer.disconnect(); if (resize) resize.disconnect(); window.removeEventListener('resize', refresh); };
  }, []);
  // one Tab stop: the current control is in the Tab order, the others are reached with the arrows (batch 213)
  useRovingFocus(ref, itemsOf);
  const onKey = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].indexOf(e.key) < 0) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable) return;   // preserve the control's editing keys
    if (e.target.closest(POPUP) && ref.current.contains(e.target.closest(POPUP))) return;   // popup/composite controls keep their own keys
    if (e.target.closest('[role="toolbar"]') !== ref.current) return;   // a nested toolbar owns its arrows
    const items = itemsOf();
    const i = items.indexOf(document.activeElement);
    if (i < 0) return;
    const step = arrowStep(e, ref.current, { vertical: false });   // in reading order: right to left reverses Left and Right
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + step + items.length) % items.length;
    e.preventDefault(); items[n].focus();
  };
  const onFocusIn = (e) => { if (onFocus) onFocus(e); roveTo(ref, itemsOf(), e.target); };
  return <div ref={ref} role="toolbar" aria-label={label} className={cx('plx-toolbar', className)} onKeyDown={onKey} onFocus={onFocusIn} {...rest}>{children}</div>;
}
Toolbar.Group = function ToolbarGroup({ className, children, ...rest }) {
  return <div className={cx('plx-toolbar__group', className)} {...rest}>{children}</div>;
};
Toolbar.Spacer = function ToolbarSpacer() {
  return <div className="plx-toolbar__spacer" aria-hidden="true" />;
};
