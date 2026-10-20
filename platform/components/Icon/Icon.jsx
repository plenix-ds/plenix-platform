/* Plenix · Icon, StatusIcon
   Summary: One icon of the Plenix set, drawn as a mask in the current text color. StatusIcon is a tone's icon in the
     tone's color (info, success, warning, danger, neutral), alone or with a short label.
   Usage:
     <Icon name="folder" />
     <Icon name="bookmark" size="sm" filled label="Bookmarked" />
     <StatusIcon tone="warning" />
     <StatusIcon tone="success" size="sm">Synced</StatusIcon>
   Props:
     name: the Plenix icon name (platform/icons/map.json)
     size: "xs" 12px | "sm" 16px | "md" 20px | "lg" 24px | "xl" 48px, a page title (--plx-sys-icon-size-*); without it the icon takes its container's
       grid icon (a control's --plx-sys-control-icon-<role>) or --plx-sys-icon-size
     filled: the filled version (default false)
     label: the accessible name, when the icon alone carries meaning
     className: more classes on the icon
     StatusIcon.tone: "info" (default) | "success" | "warning" | "danger" | "neutral"; each has its own icon (neutral shares
       the info icon, in the neutral color)
     StatusIcon.size: "sm" (16px) | "md" (default; 20px) | "lg" (24px)
     StatusIcon.label: the accessible name of the icon alone (default: the tone's word from strings)
     StatusIcon.children: a short visible label after the icon; the icon is then decorative and the text says the state
     StatusIcon.strings: the tone words, for other languages: { info: "Information", success: "Success", warning: "Warning",
       danger: "Error", neutral: "Note" }
     StatusIcon.className: more classes on the status icon
   Behavior:
     The component that owns a current or selected state passes filled (NavList's current item and pinned pin, a
       selected or pressed Button); filled={false} keeps the outline (Tree owns each item state).
     Omitting filled: until every owner passes it, the filled version is still drawn inside a current or selected
       element (aria-current, aria-pressed, aria-selected, .is-selected, .is-current): the rollout backlog.
     The optical size follows the context: 24 in a Comfortable region and in a 24px container (the app header, a
       pictogram), and for sizes lg and xl; 20 everywhere else.
     A pinned item shows the filled pin, not a filled row.
     Without a label the icon is decorative and hidden from assistive technology; with one it is an image (role="img").
     StatusIcon alone is an image named by its tone (role="img", "Warning"), so the state never rests on color only; with a
       visible label the label carries the state and the icon is hidden from assistive technology.
   Notes:
     The set is Material Symbols Sharp, weight 300, used exactly as published (platform/icons/).
     The size names the icon's whole square, which includes the set's own padding (1/12 of the square on each side): the
       system adds none to make up for it.
     Other props pass through to the <span>.
     StatusIcon's colors and sizes are its own tokens (--plx-comp-status-icon-*, components/Icon/status-icon.css); the label
       keeps the text color and size of where it sits.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

export function Icon({ name, size, filled, label, className, ...rest }) {
  devWarn('Icon', { size }, { size: ['xs','sm','md','lg','xl'] });
  return (
    <span className={cx('plx-icon', 'plx-icon--' + name, size ? 'plx-icon--size-' + size : null, filled === true && 'plx-icon--filled', filled === false && 'plx-icon--outline', className)}
      role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} {...rest} />
  );
}

// StatusIcon: a tone's icon in the tone's color, alone (an image named by the tone) or before a short visible label
const STATUS_ICONS = { info: 'circle-info', success: 'circle-check', warning: 'warning', danger: 'alert', neutral: 'circle-info' };
const STATUS_WORDS = { info: 'Information', success: 'Success', warning: 'Warning', danger: 'Error', neutral: 'Note' };
export function StatusIcon({ tone = 'info', size = 'md', label, children, strings, className, ...rest }) {
  devWarn('StatusIcon', { tone, size }, { tone: ['info','success','warning','danger','neutral'], size: ['sm','md','lg'] });
  const t = STATUS_ICONS[tone] ? tone : 'info';
  const words = Object.assign({}, STATUS_WORDS, strings);
  const shown = children !== undefined && children !== null && children !== false;
  return (
    <span className={cx('plx-status-icon', 'plx-status-icon--' + t, 'plx-status-icon--' + size, className)} {...rest}>
      <span className="plx-status-icon__glyph"><Icon name={STATUS_ICONS[t]} size={size} label={shown ? undefined : (label || words[t])} /></span>
      {shown ? <span className="plx-status-icon__label">{children}</span> : null}
    </span>
  );
}
