/* Plenix · StatusDot
   Summary: A 6px dot that marks a state (active, paused, priority).
   Usage:
     <StatusDot tone="success" label="Active" />
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"
     label: the state in words, read by assistive technology
     className: more classes on the dot
     ...rest: other attributes go on the dot element
   Behavior:
     Without a label the dot is decorative and hidden from assistive technology.
   Notes:
     Without a label, pair the dot with visible text.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';

export function StatusDot({ tone = 'neutral', label, className, ...rest }) {
  return (
    <span className={cx('plx-status-dot', 'plx-status-dot--' + tone, className)} aria-hidden={label ? undefined : true} {...rest}>
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </span>
  );
}
