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
     color: a color the data brings (a project's color), a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280); it fills the bar instead of the tone
     size: "sm" (a 4px track) | "md" (default, an 8px track)
     className: more classes on the wrapper
     locale: the language the percent is formatted in (default: the page's language, document.documentElement.lang)
   Behavior:
     A known amount is the browser's own <progress value max> (batch 280: the function reports the amount, the design
     system draws it, no width is written); without a value the track is a progressbar (role="progressbar") with no
     value, its fill running from start to end again and again.
     People who ask their system for less motion see the indeterminate fill still.
   Notes:
     The amount reaches the page as the <progress> element's value and a data color as data-plx-color: no style is written.
     Other props pass through to the wrapper.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

export function ProgressBar({ value, max = 100, label, labelHidden = false, showValue = false, tone = 'info', color, size = 'md', locale, className, ...rest }) {
  devWarn('ProgressBar', { tone, size }, { tone: ['info','success','warning','danger','neutral'], size: ['sm','md'] });
  const loc = locale || (typeof document !== 'undefined' && document.documentElement.lang) || undefined;
  const known = typeof value === 'number' && !Number.isNaN(value);
  const pct = known ? Math.max(0, Math.min(100, (value / (max || 100)) * 100)) : null;
  const id = 'plx-pb' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const showLabel = label && !labelHidden;
  return (
    <div className={cx('plx-progress-bar', 'plx-progress-bar--' + size, color ? 'plx-progress-bar--color' : 'plx-progress-bar--' + tone, !known && 'is-indeterminate', className)} data-plx-color={color || undefined} {...rest}>
      {showLabel || (showValue && known) ? (
        <div className="plx-progress-bar__head">
          {showLabel ? <span className="plx-progress-bar__label" id={id}>{label}</span> : null}
          {showValue && known ? <span className="plx-progress-bar__value">{new Intl.NumberFormat(loc, { style: 'percent', maximumFractionDigits: 0 }).format(pct / 100)}</span> : null}
        </div>
      ) : null}
      {known ? (
        <progress className="plx-progress-bar__track plx-progress-bar__meter" value={Math.max(0, Math.min(value, max || 100))} max={max || 100} aria-labelledby={showLabel ? id : undefined} aria-label={showLabel ? undefined : label} />
      ) : (
        <div className="plx-progress-bar__track" role="progressbar" aria-labelledby={showLabel ? id : undefined} aria-label={showLabel ? undefined : label}>
          <span className="plx-progress-bar__fill" />
        </div>
      )}
    </div>
  );
}
