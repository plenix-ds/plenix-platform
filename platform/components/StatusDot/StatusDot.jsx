/* Plenix · StatusDot
   Summary: A 6px dot that marks a state (active, paused, priority), or a person's availability (online, away, busy, do
     not disturb, offline) in the Status colors.
   Usage:
     <StatusDot tone="success" label="Active" />
     <StatusDot tone="busy" label="Busy" />
     <StatusDot tone="dnd" size="md" icon label="Do not disturb" />
     <StatusDot tone="away" size="md" icon label="Away" />
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"; for a person's availability (the presence
       roles of the Status colors, library wave 4): "online" | "away" | "busy" | "dnd" (do not disturb) |
       "offline"
     size: "sm" (default, 6px) | "md" (12px) | "lg" (16px): the larger dots carry a glyph (icon) and sit on an avatar
     icon: draws the availability's shape inside a md or lg dot, so it never rests on color alone: online a check, away a
       clock, busy a solid dot with nothing cut out, do not disturb a minus (remove), offline a cross; busy and do not
       disturb share a color and differ by shape (default false; presence tones only)
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
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';
import { Icon } from '../Icon/Icon.jsx';
import CheckIcon from 'plenix-platform/icons/plenix/check';
import ClockIcon from 'plenix-platform/icons/plenix/clock';
import CloseN2Icon from 'plenix-platform/icons/plenix/close-2';
import RemoveIcon from 'plenix-platform/icons/plenix/remove';

const PRESENCE = ['online', 'away', 'busy', 'dnd', 'offline'];
const GLYPHS = { online: CheckIcon, away: ClockIcon, dnd: RemoveIcon, offline: CloseN2Icon };   // busy is the solid dot: nothing cut out
const SIZES = ['md', 'lg'];

export function StatusDot({ tone = 'neutral', size = 'sm', icon = false, label, className, ...rest }) {
  devWarn('StatusDot', { tone, size }, { tone: ['info','success','warning','danger','neutral','online','away','busy','dnd','offline'], size: ['sm','md','lg'] });
  const s = SIZES.indexOf(size) >= 0 ? size : null;
  const glyph = icon && s && PRESENCE.indexOf(tone) >= 0 && GLYPHS[tone];
  return (
    <span className={cx('plx-status-dot', 'plx-status-dot--' + tone, s && 'plx-status-dot--' + s, glyph && 'plx-status-dot--glyph', className)} aria-hidden={label ? undefined : true} {...rest}>
      {glyph ? <Icon name={glyph} className="plx-status-dot__glyph" /> : null}
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </span>
  );
}
