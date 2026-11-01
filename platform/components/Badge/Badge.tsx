/* Plenix · Badge
   Summary: A status pill: bold text on a soft background of its variant's color family, a 1px border and 4px corners
     (owner, 2026-10-14, docs/pills-and-colors.md: every pill is soft).
   Usage:
     <Badge tone="success">Approved</Badge>
     <Badge tone="waiting">Paused</Badge>
     <Badge tone="action-required">Changes requested</Badge>
     <Badge tone="negative" size="sm">3</Badge>
     <Badge tone="success" icon="check">Saved</Badge>
   Props:
     tone: the status variant:
       "neutral" (default; gray: no particular state, e.g. Draft, Archived)
       "success" (green: done, approved, healthy)
       "active" (blue: in progress, current, information)
       "waiting" (yellow: waiting, paused)
       "action-required" (orange: action or correction required, e.g. Changes requested, Needs attention)
       "negative" (red: failed, error, rejected, blocked)
       Old names still work: "info" is "active", "warning" is "waiting", "danger" is "negative".
     variant: accepted and ignored ("solid" and "soft" both draw the soft pill; the solid look was removed, 2026-10-14)
     size: "md" (default; a 20px label) | "sm" (16px, for counts)
     icon: an icon name (platform/icons/map.json) drawn before the text, in the text color: a status shows its icon inside
       the badge (owner, 2026-10-14: check for done, pencil for unsaved, alert for problems); the icon is decorative, the
       text says the state
     children: the badge text
     className: more classes on the badge
   Behavior:
     An unknown tone or size falls back to the default.
   Notes:
     A badge is a workflow status. A tag or category is a Tag with its category color (never a status variant).
     Other props (title, aria-*, …) pass through to the <span>.
     A badge is text: give a count enough context nearby or an accessible name on its control.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { Icon } from '../Icon/Icon.tsx';
import type { IconValue } from '../Icon/Icon.tsx';

const TONES = ['neutral', 'success', 'active', 'waiting', 'action-required', 'negative'];
const ALIASES: Record<string, string> = { info: 'active', warning: 'waiting', danger: 'negative' };
const SIZES = ['md', 'sm'];

// variant is taken out so it never reaches the <span>: every badge is the soft pill
export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: 'neutral' | 'success' | 'active' | 'waiting' | 'action-required' | 'negative' | 'info' | 'warning' | 'danger';
  /** retired: every badge is the soft pill (taken out so it never reaches the span) */
  variant?: 'solid' | 'soft';
  size?: 'md' | 'sm';
  /** an icon name or an imported icon module */
  icon?: IconValue | null;
};
export function Badge({ tone = 'neutral', variant, size = 'md', icon, className, children, ...rest }: BadgeProps) {
  devWarn('Badge', { tone, variant, size }, { tone: ['neutral','success','active','waiting','action-required','negative','info','warning','danger'], variant: ['solid','soft'], size: ['md','sm'] });
  const named = ALIASES[tone] || tone;
  const t = TONES.indexOf(named) >= 0 ? named : 'neutral';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const classes = ['plx-badge', 'plx-badge--' + t, s === 'sm' ? 'plx-badge--sm' : null, className].filter(Boolean).join(' ');
  return <span className={classes} {...rest}>{icon ? <Icon name={icon} /> : null}{children}</span>;
}
