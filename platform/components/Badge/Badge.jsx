/* Plenix · Badge
   Summary: A small label with bold text: solid (white text on the tone) or soft (the tone's text on its pale fill).
   Usage:
     <Badge tone="success">Published</Badge>
     <Badge tone="danger" size="sm">3</Badge>
     <Badge tone="warning" variant="soft">Draft</Badge>
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"
     variant: "solid" (default; white text on the tone) | "soft" (the tone's text on its pale fill: quieter, for many
       statuses in a dense list)
     size: "md" (default; a 20px label) | "sm" (16px, for counts)
     children: the badge text
     className: more classes on the badge
   Behavior:
     An unknown tone, variant or size falls back to the default.
   Notes:
     Other props (title, aria-*, …) pass through to the <span>.
     A badge is text: give a count enough context nearby or an accessible name on its control.
*/
import React from 'react';

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'];
const SIZES = ['md', 'sm'];
const VARIANTS = ['solid', 'soft'];

export function Badge({ tone = 'neutral', variant = 'solid', size = 'md', className, children, ...rest }) {
  const t = TONES.indexOf(tone) >= 0 ? tone : 'neutral';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'solid';
  const classes = ['plx-badge', 'plx-badge--' + t, v === 'soft' ? 'plx-badge--soft' : null, s === 'sm' ? 'plx-badge--sm' : null, className].filter(Boolean).join(' ');
  return <span className={classes} {...rest}>{children}</span>;
}
