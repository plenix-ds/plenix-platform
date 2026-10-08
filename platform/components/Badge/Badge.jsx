/* Plenix · Badge
   Summary: A small solid label with white bold text.
   Usage:
     <Badge tone="success">Published</Badge>
     <Badge tone="danger" size="sm">3</Badge>
   Props:
     tone: "neutral" (default) | "info" | "success" | "warning" | "danger"
     size: "md" (default; a 20px label) | "sm" (16px, for counts)
     children: the badge text
     className: more classes on the badge
   Behavior:
     An unknown tone or size falls back to the default.
   Notes:
     Other props (title, aria-*, …) pass through to the <span>.
     A badge is text: give a count enough context nearby or an accessible name on its control.
*/
import React from 'react';

const TONES = ['neutral', 'info', 'success', 'warning', 'danger'];
const SIZES = ['md', 'sm'];

export function Badge({ tone = 'neutral', size = 'md', className, children, ...rest }) {
  const t = TONES.indexOf(tone) >= 0 ? tone : 'neutral';
  const s = SIZES.indexOf(size) >= 0 ? size : 'md';
  const classes = ['plx-badge', 'plx-badge--' + t, s === 'sm' ? 'plx-badge--sm' : null, className].filter(Boolean).join(' ');
  return <span className={classes} {...rest}>{children}</span>;
}
