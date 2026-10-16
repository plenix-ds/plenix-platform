/* Plenix · Blockquote
   Summary: Words quoted from someone else (a person, a document, an earlier message), set apart from the text around it by
     a leading rule, with the source under it.
   Usage:
     <Blockquote citation="Ana Ruiz, project lead">Every room gets its own folder before the first upload.</Blockquote>
     <Blockquote cite="https://example.org/brief" citation="Kitchen brief, page 2">…</Blockquote>
     <Blockquote variant="pull">The archive is the product.</Blockquote>
   Props:
     variant: "default" (a quote in reading text: the body size, a rule at its start) | "pull" (a short line lifted out of
       the page to draw the eye: larger, medium weight, a stronger rule)
     citation: who or what is quoted, shown under the quote (optional)
     cite: the address of the source, for the blockquote's cite attribute (optional)
     children: the quoted text (one or more paragraphs)
     className: more classes on the <figure>
   Behavior:
     Not interactive. The quote keeps the reading width of its container and wraps.
     The rule sits at the start side: on the left in left-to-right pages, on the right in right-to-left ones.
   Notes:
     The quote is a <blockquote> inside a <figure>; the citation is its <figcaption>, so it is read with the quote but is
       not part of it.
     Quote exactly; mark what is left out with an ellipsis. Use a Notice, not a quote, to make a point stand out.
     Other props pass through to the <figure>.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

export function Blockquote({ variant = 'default', citation, cite, className, children, ...rest }) {
  devWarn('Blockquote', { variant }, { variant: ['default','pull'] });
  return (
    <figure className={cx('plx-blockquote', variant === 'pull' && 'plx-blockquote--pull', className)} {...rest}>
      <blockquote className="plx-blockquote__quote" cite={cite}>{children}</blockquote>
      {citation ? <figcaption className="plx-blockquote__citation">{citation}</figcaption> : null}
    </figure>
  );
}
