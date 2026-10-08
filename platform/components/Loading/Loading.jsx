/* Plenix · Skeleton, Spinner
   Summary: Loading indicators. Skeleton is a placeholder block with a shimmer; Spinner is a turning ring. (The typing
     dots are a Chat variant: Chat.Typing.)
   Usage:
     <Skeleton width="160px" height="16px" />
     <Spinner size="sm" label="Saving" />
   Props:
     Skeleton.width: the block width (a size token, var(--plx-ref-size-…))
     Skeleton.height: the block height (a size token)
     Skeleton.className: more classes on the block
     Spinner.size: "sm" | "md" (default) | "lg"
     Spinner.label: the text announced to assistive technology (default "Loading")
     Spinner.className: more classes on the ring
   Behavior:
     The Skeleton shimmer runs left to right; the block is decorative (aria-hidden).
     Spinner is a status region (role="status"), so its label is announced.
     People who ask their system for less motion see the indicators still.
   Notes:
     Other props pass through to the <span>.
     The old text listed a radius prop for Skeleton; the code takes none (set it with a class).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.jsx';

export function Skeleton({ width, height, className, ...rest }) {
  return <span className={cx('plx-skeleton', className)} aria-hidden="true" style={{ '--plx-comp-skeleton-inline-size': width, '--plx-comp-skeleton-block-size': height }} {...rest} />;
}

export function Spinner({ size = 'md', label = 'Loading', className, ...rest }) {
  return (
    <span className={cx('plx-spinner', 'plx-spinner--' + size, className)} role="status" {...rest}>
      <VisuallyHidden>{label}</VisuallyHidden>
    </span>
  );
}
