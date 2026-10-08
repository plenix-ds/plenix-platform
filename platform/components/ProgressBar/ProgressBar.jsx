/* Plenix · ProgressBar
   Summary: How far a task or a quantity has come: a track with a fill (11 › Feedback › Loading and progress › Progress bar).
   Usage:
     <ProgressBar value={42} label="Uploading 3 files" showValue />
     <ProgressBar label="Preparing the export" />
     <ProgressBar value={7} max={12} tone="success" size="sm" label="Tasks done" labelHidden />
     <ProgressBar value={60} color={project.color} label="Kitchen Renovation" />
   Props:
     value: how much is done; leave it out while the amount is unknown (the bar is then indeterminate)
     max: the whole (default 100)
     label: what is progressing; always the accessible name, shown above the bar unless labelHidden
     labelHidden: the label is for assistive technology only (default false)
     showValue: shows the percent at the end of the label row, a whole percent in the locale's format ("42%") (default false)
     tone: "info" (default) | "success" | "warning" | "danger" | "neutral"
     color: a color the data brings (a project's color); it fills the bar instead of the tone
     size: "sm" (a 4px track) | "md" (default, an 8px track)
     className: more classes on the wrapper
     locale: the language the percent is formatted in (default: the page's language, document.documentElement.lang)
   Behavior:
     The track is a progressbar (role="progressbar") with aria-valuenow, aria-valuemin and aria-valuemax; without a value it
     has none and its fill runs from start to end again and again.
     People who ask their system for less motion see the indeterminate fill still.
   Notes:
     The fill's width reaches the stylesheet as --plx-comp-progress-bar-value (a percent) and a data color as
     --plx-comp-progress-bar-color: the only way a value or a color from the data enters (no style is written).
     Other props pass through to the wrapper.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function ProgressBar({ value, max = 100, label, labelHidden = false, showValue = false, tone = 'info', color, size = 'md', locale, className, ...rest }) {
  const loc = locale || (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  const known = typeof value === 'number' && !Number.isNaN(value);
  const pct = known ? Math.max(0, Math.min(100, (value / (max || 100)) * 100)) : null;
  const id = 'plx-pb' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const showLabel = label && !labelHidden;
  return (
    <div className={cx('plx-progress-bar', 'plx-progress-bar--' + size, color ? 'plx-progress-bar--color' : 'plx-progress-bar--' + tone, !known && 'is-indeterminate', className)}
      style={{ '--plx-comp-progress-bar-value': known ? pct + '%' : undefined, '--plx-comp-progress-bar-color': color || undefined }} {...rest}>
      {showLabel || (showValue && known) ? (
        <div className="plx-progress-bar__head">
          {showLabel ? <span className="plx-progress-bar__label" id={id}>{label}</span> : null}
          {showValue && known ? <span className="plx-progress-bar__value">{new Intl.NumberFormat(loc, { style: 'percent', maximumFractionDigits: 0 }).format(pct / 100)}</span> : null}
        </div>
      ) : null}
      <div className="plx-progress-bar__track" role="progressbar" aria-labelledby={showLabel ? id : undefined} aria-label={showLabel ? undefined : label}
        aria-valuemin={known ? 0 : undefined} aria-valuemax={known ? max : undefined} aria-valuenow={known ? value : undefined}>
        <span className="plx-progress-bar__fill" />
      </div>
    </div>
  );
}
