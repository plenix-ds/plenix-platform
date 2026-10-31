/* Plenix · Count
   Summary: A number shown on its own.
   Usage:
     <Count value={24} />
     <Count variant="pill" value={unread} max={99} label={unread + ' unread notifications'} />
   Props:
     value: the number; with no value nothing renders
     variant: "plain" (default; muted tabular figures, e.g. a list row's item count) | "pill" (a 16px soft pill for unread
       or pending counts: the status pill look, shade 100 background, shade 300 border, dark text, 4px corners)
     tone: the pill color: "neutral" (gray) | "info" (blue) | "success" (green) | "warning" (yellow) | "danger" (red;
       default), on the same roles as Badge's neutral, active, success, waiting and negative
     max: above it the count shows max + "+" (e.g. "99+")
     label: the accessible name when the number alone is unclear ("3 unread notifications")
     moreThan: what screen readers hear for a capped count without a label (default "More than {max}")
     className: more classes on the count
   Notes:
     Other props pass through to the <span>.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';

export function Count({ value, max, variant = 'plain', tone = 'danger', label, moreThan = 'More than {max}', className, ...rest }) {
  devWarn('Count', { variant, tone }, { variant: ['plain','pill'], tone: ['info','success','warning','danger','neutral'] });
  if (value === null || value === undefined || value === '') return null;
  const shown = typeof max === 'number' && Number(value) > max ? max + '+' : String(value);
  return (
    <span className={cx('plx-count', 'plx-count--' + variant, variant === 'pill' ? 'plx-count--' + tone : null, className)} aria-label={label || (typeof max === 'number' && Number(value) > max ? moreThan.replace('{max}', String(max)) : undefined)} {...rest}>{shown}</span>
  );
}
