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
     Toolbar.variant: "default" (rows wrap; gaps follow the density) | "bar" (one row that never wraps, fixed gaps: CommandBar)
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
     Its one Tab stop and its arrow keys are the shared focus group (useFocusGroup, hooks/useFocusable.js).
     Other props reach the toolbar or group element.
*/
import React from 'react';
import { roveTo } from '../../utils/roving.js';
import { useFocusGroup } from '../../hooks/useFocusable.js';
import { cx } from '../../utils/cx.js';

const POPUP = '[role="dialog"],[role="alertdialog"],[role="menu"],[role="listbox"],[role="tree"],[role="grid"],[role="tablist"]';
const FOCUSABLE = 'button,input,textarea,select,a[href],[tabindex],[contenteditable="true"]';

export function Toolbar({ label, variant = 'default', className, children, onKeyDown, onFocus, ...rest }) {
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
  // one Tab stop and the arrow keys: the shared focus group (hooks/useFocusable.js), with the toolbar's own item rules. The
  // keys stay a text field's, a select's, an editable region's, a popup's and a nested toolbar's own (ignore).
  const { groupProps } = useFocusGroup(ref, {
    items: itemsOf, orientation: 'horizontal', loop: true, modifiers: true, onKeyDown,
    ignore: (e) => /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
      || (e.target.closest(POPUP) && ref.current.contains(e.target.closest(POPUP))) || e.target.closest('[role="toolbar"]') !== ref.current
  });
  const onFocusIn = (e) => { if (onFocus) onFocus(e); groupProps.onFocus(e); };
  return <div ref={ref} role="toolbar" aria-label={label} className={cx('plx-toolbar', variant === 'bar' && 'plx-toolbar--bar', className)} onKeyDown={groupProps.onKeyDown} onFocus={onFocusIn} {...rest}>{children}</div>;
}
Toolbar.Group = function ToolbarGroup({ className, children, ...rest }) {
  return <div className={cx('plx-toolbar__group', className)} {...rest}>{children}</div>;
};
Toolbar.Spacer = function ToolbarSpacer() {
  return <div className="plx-toolbar__spacer" aria-hidden="true" />;
};
