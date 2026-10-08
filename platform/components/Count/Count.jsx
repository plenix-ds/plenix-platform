/* Plenix · Count
   Summary: A number shown on its own.
   Usage:
     <Count value={24} />
     <Count variant="pill" value={unread} max={99} label={unread + ' unread notifications'} />
   Props:
     value: the number; with no value nothing renders
     variant: "plain" (default; muted tabular figures, e.g. a list row's item count) | "pill" (a 16px solid pill for unread
       or pending counts)
     tone: the pill color: "neutral" | "info" | "success" | "warning" | "danger" (default)
     max: above it the count shows max + "+" (e.g. "99+")
     label: the accessible name when the number alone is unclear ("3 unread notifications")
     className: more classes on the count
   Notes:
     Other props pass through to the <span>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Count({ value, max, variant = 'plain', tone = 'danger', label, className, ...rest }) {
  if (value === null || value === undefined || value === '') return null;
  const shown = typeof max === 'number' && Number(value) > max ? max + '+' : String(value);
  return (
    <span className={cx('plx-count', 'plx-count--' + variant, variant === 'pill' ? 'plx-count--' + tone : null, className)} aria-label={label} {...rest}>{shown}</span>
  );
}
