/* Plenix · Button, ButtonGroup
   Summary: A button for an action, in one of several emphasis levels and sizes; ButtonGroup joins buttons that act as a set.
   Usage:
     <Button variant="primary" icon="save" onClick={() => …}>Save</Button>
     <Button iconOnly icon="more_horiz" label="More actions" caret expanded={open} />
     <ButtonGroup label="Transfer"><Button>Import</Button><Button>Export</Button></ButtonGroup>
   Props:
     variant: "secondary" (default; white with a border, reversible actions) | "primary" (filled; the main action, usually one
       per view) | "tertiary" (outlined in the action color, no fill; fills on hover) | "ghost" (no fill or border until
       hovered; the lowest emphasis) | "danger" (filled red; destructive) | "danger-secondary"
       (red outline, fills on hover) | "link" (looks like link text)
     size: "md" (default; the standard control role) | "sm" (the toolbar role: compact text, gray) | "xs" (the inline-action
       role: dense row and card actions, never in a toolbar) | "2xs" (the smallest: "Show more" under a list; 11px text, a blue
       tint on hover) | "lg" (the prominent role: page actions)
     icon: an <Icon> (or an icon name) before the label
     iconEnd: an <Icon> (or an icon name) after the label
     iconOnly: a square button with only its icon; give it a label (default false)
     label: the accessible name (aria-label); an icon-only button falls back to string children
     caret: the button opens a menu: a chevron after the label (default false)
     expanded: sets aria-expanded, for a button that opens a menu
     pressed: makes a toggle button (aria-pressed)
     selected: shows the selected state without a toggle role (default false)
     loading: shows a spinner in place of the icon (default false)
     disabled: the button does nothing (default false)
     href: renders a link styled as a button
     type: the button type (default "button")
     onClick(event): runs when the button is clicked, unless disabled or loading
     children: the button label
     className: more classes on the button
     strings: the words it announces, for other languages: { working: "Working" } (the loading spinner's name)
     ref: forwarded to the <button> or <a>
     ButtonGroup.label: the accessible name of the group
     ButtonGroup.children: the buttons
     ButtonGroup.className: more classes on the group
   Behavior:
     Placement can also set the role: a dialog footer gives its buttons the dialog role.
     Selected, pressed and expanded all show the selected state.
     Loading keeps the width and stays focusable but inert (aria-disabled, aria-busy).
     A disabled link loses its href.
   Notes:
     Other props pass through to the <button> or <a> (and to ButtonGroup's <div>).
     For one choice from several, use SegmentedControl instead of ButtonGroup.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';
import { Spinner } from '../Loading/Loading.jsx';

const STRINGS = { working: 'Working' };

const asIcon = (i) => (typeof i === 'string' ? <Icon name={i} /> : i);

export const Button = React.forwardRef(function Button({ variant = 'secondary', size = 'md', icon, iconEnd, iconOnly = false, label, caret = false,
  expanded, pressed, selected = false, loading = false, disabled = false, href, type = 'button', className, children, onClick, strings, ...rest }, ref) {
  const t = Object.assign({}, STRINGS, strings);
  const classes = cx('plx-button', 'plx-button--' + (variant === 'quiet' ? 'ghost' : variant), size !== 'md' && 'plx-button--size-' + size, iconOnly && 'plx-button--icon-only',
    caret && 'plx-button--caret', (selected || pressed || expanded) && 'is-selected', loading && 'is-loading', className);
  const content = (
    <>
      {loading ? <span className="plx-button__icon"><Spinner size="sm" label={t.working} /></span> : (icon ? <span className="plx-button__icon">{asIcon(icon)}</span> : null)}
      {iconOnly ? null : (children !== undefined && children !== null ? <span className="plx-button__label">{children}</span> : null)}
      {iconEnd ? <span className="plx-button__icon">{asIcon(iconEnd)}</span> : null}
      {caret ? <span className="plx-button__caret" aria-hidden="true" /> : null}
    </>
  );
  const a11y = { 'aria-label': iconOnly ? (label || (typeof children === 'string' ? children : undefined)) : label, 'aria-expanded': expanded,
    'aria-pressed': pressed, 'aria-disabled': disabled || loading ? true : undefined, 'aria-busy': loading || undefined };
  const handle = (e) => { if (disabled || loading) { e.preventDefault(); return; } if (onClick) onClick(e); };
  if (href) return <a ref={ref} href={disabled ? undefined : href} className={classes} {...a11y} onClick={handle} {...rest}>{content}</a>;
  return <button ref={ref} type={type} className={classes} disabled={disabled && !loading ? true : undefined} {...a11y} onClick={handle} {...rest}>{content}</button>;
});

/* ButtonGroup: joined buttons that act as a set (Import | Export). For one choice from several, use SegmentedControl. */
export function ButtonGroup({ label, className, children, ...rest }) {
  return <div role="group" aria-label={label} className={cx('plx-button-group', className)} {...rest}>{children}</div>;
}
