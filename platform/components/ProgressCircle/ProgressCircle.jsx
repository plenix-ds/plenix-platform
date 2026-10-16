/* Plenix · ProgressCircle
   Summary: How far a task has come, as a ring: a faint track and an arc in a tone that fills clockwise from the top, or
     turns while the amount is unknown (08 Feedback & System State › Loading and progress › Circular progress).
   Usage:
     <ProgressCircle value={62} label="Uploading 3 files" />
     <ProgressCircle label="Loading assets" size="sm" />
     <ProgressCircle value={7} max={12} tone="success" size="lg" showValue label="Tasks done" />
   Props:
     value: how much is done; leave it out while the amount is unknown (the ring then turns: indeterminate)
     max: the whole (default 100)
     label: what is progressing: the accessible name (required; say what loads, "Loading assets")
     size: "sm" (16px, inside a control or beside a line of text) | "md" (24px, default) | "lg" (48px, a panel; it can show
       the value)
     tone: "info" (default) | "success" | "warning" | "danger" | "neutral": the arc's color, as ProgressBar's tones
     showValue: the whole percent in the ring's center, in the data font ("62%"); size lg only (default false)
     locale: the language the percent is formatted in (default: the page's language)
     className: more classes on the ring
   Behavior:
     role="progressbar" named by label; a known amount reports aria-valuenow (the percent) with aria-valuemin 0 and
       aria-valuemax 100; an unknown amount reports no value.
     The arc is drawn as SVG geometry from the amount (no style is written); its width is the size's stroke token and
       stays the same however the ring is scaled.
     People who ask their system for less motion see the indeterminate arc still.
   Notes:
     Use a ProgressBar where there is room for a bar and a label; the ring is for tight places and short waits.
     Other props pass through to the wrapper.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

const SIZES = ['sm', 'md', 'lg'];
const TONES = ['info', 'success', 'warning', 'danger', 'neutral'];
// the geometry in the 48-unit box: the ring's center and radius (the strokes do not scale, so they fit at every size)
const C = 24, R = 21;
const round = (n) => Math.round(n * 100) / 100;
// an arc from the top, clockwise, over pct percent of the ring
function arc(pct) {
  const a = (Math.min(pct, 99.99) / 100) * 2 * Math.PI;
  const x = round(C + R * Math.sin(a)), y = round(C - R * Math.cos(a));
  return 'M ' + C + ' ' + (C - R) + ' A ' + R + ' ' + R + ' 0 ' + (pct > 50 ? 1 : 0) + ' 1 ' + x + ' ' + y;
}

export function ProgressCircle({ value, max = 100, label, size = 'md', tone = 'info', showValue = false, locale, className, ...rest }) {
  devWarn('ProgressCircle', { size, tone }, { size: ['sm','md','lg'], tone: ['info','success','warning','danger','neutral'] });
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const t = TONES.indexOf(tone) >= 0 ? tone : 'info';
  const known = typeof value === 'number' && !Number.isNaN(value);
  const pct = known ? Math.max(0, Math.min(100, (value / (max || 100)) * 100)) : null;
  const loc = locale || (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  return (
    <span className={cx('plx-progress-circle', 'plx-progress-circle--' + s, 'plx-progress-circle--' + t, !known && 'is-indeterminate', className)}
      role="progressbar" aria-label={label} aria-valuemin={known ? 0 : undefined} aria-valuemax={known ? 100 : undefined} aria-valuenow={known ? Math.round(pct) : undefined} {...rest}>
      <svg className="plx-progress-circle__svg" viewBox="0 0 48 48" focusable="false" aria-hidden="true">
        <circle className="plx-progress-circle__track" cx={C} cy={C} r={R} />
        {known && pct >= 100 ? <circle className="plx-progress-circle__indicator" cx={C} cy={C} r={R} />
          : known ? (pct > 0 ? <path className="plx-progress-circle__indicator" d={arc(pct)} /> : null)
            : <path className="plx-progress-circle__indicator" d={arc(25)} />}
      </svg>
      {showValue && known && s === 'lg' ? <span className="plx-progress-circle__value" aria-hidden="true">{new Intl.NumberFormat(loc, { style: 'percent', maximumFractionDigits: 0 }).format(pct / 100)}</span> : null}
    </span>
  );
}
