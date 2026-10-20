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
       (red outline, fills on hover). There is no link look: a link goes somewhere (Link), a button does something
     truncate: the label fills the button from its start edge and ends in an ellipsis (a long choice)
     stackedLabel: the label’s lines stack, start-aligned and wrapping; the gap is --plx-comp-button-context-label-gap (SuggestedAction)
     labelRow: the label lays out a row of its own (an avatar and a name); the gap is
       --plx-comp-button-context-label-row-gap (AppHeader’s account)
     joined: { start, end }: "square" | "seam": its corners square where it meets a neighbor; a seam also drops that border (ButtonGroup, InputGroup and CopyButton set it)"md" (default; the standard control role) | "sm" (the toolbar role: compact text, gray) | "xs" (the inline-action
       role: dense row and card actions, never in a toolbar) | "2xs" (the smallest: "Show more" under a list; 11px text, a blue
       tint on hover) | "lg" (the prominent role: page actions)
     icon: an <Icon> (or an icon name) before the label
     iconEnd: an <Icon> (or an icon name) after the label
     iconOnly: a square button with only its icon; give it a label (default false)
     label: the accessible name (aria-label); an icon-only button falls back to string children
     caret: the button opens a menu: the thin outline chevron (expand_more) after the label, in the muted color on the
       unfilled variants (owner, 2026-10-14: it replaces the small filled triangle); default false
     expanded: sets aria-expanded, for a button that opens a menu
     pressed: makes a toggle button (aria-pressed): true when on, false when off (undefined: not a toggle)
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
     A toggle button (pressed true or false) keeps its label and icon when it turns on or off: the label names the option
       (Bold, Show grid), aria-pressed says whether it is on, and every variant shows "on" with the selected state.
     Loading keeps the width and stays focusable but inert (aria-disabled, aria-busy).
     A disabled link loses its href.
   Notes:
     Other props pass through to the <button> or <a> (and to ButtonGroup's <div>).
     For one choice from several, use SegmentedControl instead of ButtonGroup.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { Icon, stateIcon } from '../Icon/Icon.jsx';
import { Spinner } from '../Loading/Loading.jsx';
import { SurfaceContext } from '../../providers/Surface.jsx';

const STRINGS = { working: 'Working' };

// the icon takes the button's state as its own (Styling Standard 3.6): filled while the button is selected, pressed or
// open; an Icon element the caller gives keeps its own fill when it sets one
const asIcon = stateIcon;

export const Button = React.forwardRef(function Button({ variant = 'secondary', size = 'md', icon, iconEnd, iconOnly = false, label, caret = false,
  expanded, pressed, selected = false, loading = false, disabled = false, href, type = 'button', joined, truncate = false, stackedLabel = false, labelRow = false, className, children, onClick, strings, ...rest }, ref) {
  devWarn('Button', { variant, size }, { variant: ['secondary','primary','tertiary','ghost','danger','danger-secondary','quiet'], size: ['md','sm','xs','2xs','lg'] });
  const t = Object.assign({}, STRINGS, strings);
  // a colored surface around the button (TeachingBubble, the accent AppHeader) gives it that surface's look
  const surface = React.useContext(SurfaceContext);
  const classes = cx('plx-button', 'plx-button--' + (variant === 'quiet' ? 'ghost' : variant), size !== 'md' && 'plx-button--size-' + size, iconOnly && 'plx-button--icon-only',
    caret && 'plx-button--caret', (selected || pressed || expanded) && 'is-selected', loading && 'is-loading', truncate && 'plx-button--truncate', stackedLabel && 'plx-button--stacked-label', labelRow && 'plx-button--label-row', joined && joined.start && 'plx-button--joined-start-' + joined.start, joined && joined.end && 'plx-button--joined-end-' + joined.end, joined && (joined.start || joined.end) && 'plx-button--joined', (surface === 'inverse' || surface === 'accent') && 'plx-button--on-' + surface, className);
  // the parts take the button's state as their own classes (Styling Standard 3.6: no rule reaches from the button into them)
  const v = variant === 'quiet' ? 'ghost' : variant;
  const on = !!(selected || pressed || expanded);
  const labelClass = cx('plx-button__label', truncate && 'plx-button__label--truncate', !truncate && stackedLabel && 'plx-button__label--stacked', !truncate && !stackedLabel && labelRow && 'plx-button__label--row');
  const caretClass = cx('plx-button__caret', (v === 'primary' || v === 'danger' || disabled || loading) && 'plx-button__caret--current', expanded && 'plx-button__caret--open');
  const content = (
    <>
      {loading ? <span className="plx-button__icon"><Spinner size="sm" label={t.working} /></span> : (icon ? <span className="plx-button__icon">{asIcon(icon, on)}</span> : null)}
      {iconOnly ? null : (children !== undefined && children !== null ? <span className={labelClass}>{children}</span> : null)}
      {iconEnd ? <span className="plx-button__icon">{asIcon(iconEnd, on)}</span> : null}
      {caret ? <span className={caretClass} aria-hidden="true" /> : null}
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
  // its buttons meet: each passes on which of its sides is joined (the later button's start edge is the seam)
  const all = React.Children.toArray(children).filter(React.isValidElement);
  return <div role="group" aria-label={label} className={cx('plx-button-group', className)} {...rest}>{all.map((el, i) => React.cloneElement(el, { joined: { start: i > 0 ? 'seam' : undefined, end: i < all.length - 1 ? 'square' : undefined } }))}</div>;
}
