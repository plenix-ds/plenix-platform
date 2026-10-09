/* Plenix · Menu, MenuItem, MenuGroup, MenuDivider
   Summary: A list of actions opened from a button (the menu button pattern).
   Usage:
     <Menu trigger={<Button caret>Actions</Button>} placement="bottom-start">
       <MenuItem icon="pencil" onSelect={rename}>Rename</MenuItem>
       <MenuDivider/>
       <MenuItem icon="trash" danger onSelect={remove}>Delete</MenuItem>
     </Menu>
   Props:
     Menu.trigger: the button that opens the menu (one element)
     Menu.label: the accessible name of the menu
     Menu.placement: "bottom-start" (default) | "bottom-end" | "top-start" | "top-end"
     Menu.className: more classes on the anchor around the trigger and menu
     Menu.children: the items: MenuItem, MenuGroup, MenuDivider
     MenuItem.icon: an icon name or element before the label
     MenuItem.danger: shows the item in the danger color (a destructive action); default false
     MenuItem.disabled: skips the item; it cannot be chosen; default false
     MenuItem.checked: makes it a checkbox item, checked or not; leave it out for a plain item
     MenuItem.keepOpen: leaves the menu open after choosing (for choosing several); default false
     MenuItem.href: renders the item as a link
     MenuItem.onSelect(event): runs when the item is chosen
     MenuItem.className: more classes on the item
     MenuItem.children: the item's label
     MenuGroup.label: the label of a set of items
     MenuGroup.children: the items in the set
     MenuDivider: a line between items; no props
   Behavior:
     Enter, Space or Arrow Down on the trigger opens the menu on the first item; Arrow Up opens it on the last.
     Arrow keys, Home and End move between items.
     Escape closes the menu and returns focus to the trigger.
     Tab closes the menu and moves on.
     A click outside closes the menu.
     Choosing an item closes the menu and returns focus to the trigger, unless keepOpen.
     The menu opens on top of everything (batch 272): in the browser's top layer (popover), placed beside its trigger by CSS
       anchor positioning, so no card, pane or scroll area can cover or clip it. The trigger's wrapper scopes the anchor, so
       each menu finds its own trigger; near an edge the menu flips to the other side. A browser without anchor
       positioning draws it inside the wrapper as before.
   Notes:
     Menus are border-only (no shadow, D9); dialogs keep their shadow.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useLayer, useUid } from '../../utils/layer.js';
import { Icon } from '../Icon/Icon.jsx';

const MenuContext = React.createContext(null);
const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);
const itemsIn = (list) => (list ? Array.prototype.slice.call(list.querySelectorAll('[data-plx-menu-item]:not([aria-disabled="true"])')) : []);

// the top layer and CSS anchor positioning (Chrome 125, Firefox 147, Safari 26), checked once
const TOP_LAYER = typeof window !== 'undefined' && typeof CSS !== 'undefined' && CSS.supports && CSS.supports('anchor-name', '--plx-a')
  && typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');
export function Menu({ trigger, label, placement = 'bottom-start', className, children }) {
  const id = useUid('plx-menu');
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState('first');
  const wrap = React.useRef(null), list = React.useRef(null), button = React.useRef(null);
  const close = React.useCallback((refocus) => { setOpen(false); if (refocus && button.current) button.current.focus(); }, []);
  useLayer(list, open, { onEscape: () => close(true) });
  // into the top layer as soon as it is in the page (before the first item takes focus)
  React.useLayoutEffect(() => { const el = list.current; if (open && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); }, [open]);
  React.useEffect(() => {
    if (!open) return undefined;
    const items = itemsIn(list.current);
    if (items.length) (start === 'last' ? items[items.length - 1] : items[0]).focus();
    const outside = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [open]);
  const openAt = (where) => { setStart(where); setOpen(true); };
  const child = React.Children.only(trigger);
  const triggerEl = React.cloneElement(child, {
    ref: button, 'aria-haspopup': 'menu', 'aria-expanded': open, 'aria-controls': open ? id : undefined, expanded: undefined,
    onClick: (e) => { if (child.props.onClick) child.props.onClick(e); if (open) close(false); else openAt('first'); },
    onKeyDown: (e) => {
      if (child.props.onKeyDown) child.props.onKeyDown(e);
      if (e.key === 'ArrowDown') { e.preventDefault(); openAt('first'); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); openAt('last'); }
    },
  });
  const onKeyDown = (e) => {
    const items = itemsIn(list.current);
    const at = items.indexOf(document.activeElement);
    let next = null;
    if (e.key === 'ArrowDown') next = (at + 1) % items.length;
    else if (e.key === 'ArrowUp') next = (at - 1 + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else if (e.key === 'Tab') { setOpen(false); return; }
    else return;
    e.preventDefault();
    if (items[next]) items[next].focus();
  };
  return (
    <span ref={wrap} className={cx('plx-menu-anchor', className)}>
      {triggerEl}
      {open ? (
        <MenuContext.Provider value={close}>
          <div ref={list} id={id} role="menu" aria-label={label} popover={TOP_LAYER ? 'manual' : undefined} className={cx('plx-menu', 'plx-menu--' + placement)} onKeyDown={onKeyDown}>{children}</div>
        </MenuContext.Provider>
      ) : null}
    </span>
  );
}

export function MenuItem({ icon, danger = false, disabled = false, checked, keepOpen = false, href, onSelect, className, children, ...rest }) {
  const close = React.useContext(MenuContext);
  const role = checked === undefined ? 'menuitem' : 'menuitemcheckbox';
  const props = {
    role, tabIndex: -1, 'data-plx-menu-item': '', 'aria-checked': checked === undefined ? undefined : !!checked,
    'aria-disabled': disabled || undefined, className: cx('plx-menu__item', danger && 'plx-menu__item--danger', className),
    onClick: (e) => { if (disabled) { e.preventDefault(); return; } if (onSelect) onSelect(e); if (close && !keepOpen) close(true); },
    ...rest,
  };
  const content = (
    <>
      {checked !== undefined ? <span className={cx('plx-menu__check', checked && 'is-checked')} aria-hidden="true" /> : null}
      {icon ? <span className="plx-menu__icon">{asIcon(icon)}</span> : null}
      <span className="plx-menu__label">{children}</span>
    </>
  );
  return href && !disabled ? <a href={href} {...props}>{content}</a> : <button type="button" {...props}>{content}</button>;
}

export function MenuDivider() {
  return <div role="separator" className="plx-menu__divider" />;
}

export function MenuGroup({ label, children }) {
  const id = useUid('plx-mg');
  return (
    <div role="group" aria-labelledby={id} className="plx-menu__group">
      <div id={id} className="plx-menu__group-label">{label}</div>
      {children}
    </div>
  );
}
