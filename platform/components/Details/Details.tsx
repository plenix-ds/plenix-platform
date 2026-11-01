/* Plenix · Details
   Summary: One block of optional detail behind a short summary line that opens it in place: the native details and
     summary elements, styled (09 Overlays › Disclosure › Details). It is not a section: a part of the page with a heading
     that folds is a CollapsibleSection; a set of them is an Accordion.
   Usage:
     <Details summary="Why do we need your phone number?">We text you a code when you sign in from a new device.</Details>
     <Details summary="Technical details" variant="bordered" defaultOpen>…</Details>
     <Text as="p">The upload failed. <Details summary="Show the error" variant="inline">…</Details></Text>
     <Details summary="Filters" open={open} onToggle={setOpen}>…</Details>
   Props:
     summary: the line that is always shown and opens it: a question or a short phrase (required)
     children: the detail it reveals: a few sentences, a short list, a code sample
     variant: "default" (a chevron and the summary in the body text; the detail indented under it) | "bordered" (in a box
       with a border, for detail that should read as one piece: logs, technical data) | "inline" (small and muted, in a
       line of text or under a message; the detail is not indented)
     open, defaultOpen: whether it is open (controlled) or opens at first (default false)
     onToggle(open): runs when it opens or closes
     name: the native exclusive group: Details with the same name close each other (one open at a time)
     className: more classes on the <details>
     Other props pass through to the <details>.
   Behavior:
     The summary is a native disclosure: a click, Enter or Space opens and closes it, and assistive technology announces
       it as expanded or collapsed. The chevron points to the end when closed and down when open.
     The browser's find in page opens it when the text found is inside (the native element does this).
     It opens at once, without an animation, so nothing moves under the pointer.
   Notes:
     Start closed; put only optional detail inside: what everyone needs stays on the page. Never nest one in another.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.ts';
import { cx } from '../../utils/cx.ts';
import { Icon } from '../Icon/Icon.tsx';
import ChevronDownIcon from 'plenix-platform/icons/plenix/chevron-down';
import ChevronRightIcon from 'plenix-platform/icons/plenix/chevron-right';

const VARIANTS = ['default', 'bordered', 'inline'];

export function Details({ summary, children, variant = 'default', open: openProp, defaultOpen = false, onToggle, name, className, ...rest }) {
  devWarn('Details', { variant }, { variant: ['default','bordered','inline'] });
  const controlled = openProp !== undefined;
  const [own, setOwn] = React.useState(!!defaultOpen);
  const open = controlled ? !!openProp : own;
  const v = VARIANTS.indexOf(variant) >= 0 ? variant : 'default';
  // the native element toggles itself; the state follows it (and a controlled value is put back if the caller keeps it)
  const toggled = (e) => {
    const now = e.currentTarget.open;
    if (now === open) return;
    if (!controlled) setOwn(now);
    if (onToggle) onToggle(now);
  };
  return (
    <details className={cx('plx-details', 'plx-details--' + v, className)} open={open} name={name} onToggle={toggled} {...rest}>
      <summary className="plx-details__summary">
        <span className="plx-details__marker" aria-hidden="true">
          <span className="plx-details__chevron plx-details__chevron--closed"><Icon name={ChevronRightIcon} /></span>
          <span className="plx-details__chevron plx-details__chevron--open"><Icon name={ChevronDownIcon} /></span>
        </span>
        <span className="plx-details__label">{summary}</span>
      </summary>
      <div className="plx-details__content">{children}</div>
    </details>
  );
}
