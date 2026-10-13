/* Plenix · StatusDot
   Summary: A 6px dot that marks a state (active, paused, priority), or a person's availability (online, away, busy,
     offline) in the Status colors.
   Usage:
     <StatusDot tone="success" label="Active" />
     <StatusDot tone="busy" label="Busy" />
     <StatusDot tone="away" size="md" icon label="Away" />
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"; for a person's availability (the presence
       roles of the Status colors, library wave 4): "online" | "away" | "busy" (do not disturb) | "offline"
     size: "sm" (default, 6px) | "md" (12px) | "lg" (16px): the larger dots carry a glyph (icon) and sit on an avatar
     icon: draws the availability's shape inside a md or lg dot, so it never rests on color alone: online a check, away a
       clock, busy a bar, offline a cross (default false; presence tones only)
     label: the state in words, read by assistive technology
     className: more classes on the dot
     ...rest: other attributes go on the dot element
   Behavior:
     Without a label the dot is decorative and hidden from assistive technology.
     The glyph is drawn in the surface color, cut out of the dot; a sm dot has no room for one and ignores icon.
   Notes:
     Without a label, pair the dot with visible text.
     Avatar's presence prop draws this dot at the avatar's corner.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { Icon } from '../Icon/Icon.jsx';

const PRESENCE = ['online', 'away', 'busy', 'offline'];
const GLYPHS = { online: 'check', away: 'clock', offline: 'close-2' };   // busy is a bar, drawn by the stylesheet
const SIZES = ['md', 'lg'];

export function StatusDot({ tone = 'neutral', size = 'sm', icon = false, label, className, ...rest }) {
  const s = SIZES.indexOf(size) >= 0 ? size : null;
  const glyph = icon && s && PRESENCE.indexOf(tone) >= 0;
  return (
    <span className={cx('plx-status-dot', 'plx-status-dot--' + tone, s && 'plx-status-dot--' + s, glyph && 'plx-status-dot--glyph', className)} aria-hidden={label ? undefined : true} {...rest}>
      {glyph ? (GLYPHS[tone] ? <Icon name={GLYPHS[tone]} className="plx-status-dot__glyph" /> : <span className="plx-status-dot__bar" aria-hidden="true" />) : null}
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </span>
  );
}
