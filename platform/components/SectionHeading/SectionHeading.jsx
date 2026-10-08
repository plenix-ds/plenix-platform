/* Plenix · SectionHeading
   Summary: A small uppercase label that names a group (navigation sections, panel sections, settings).
   Usage:
     <SectionHeading collapsible expanded={open} onToggle={() => setOpen(!open)} controls="recent-body">Recent</SectionHeading>
   Props:
     level: the heading level; default 3; null for a plain label
     collapsible: renders a button that shows or hides the section; default false
     expanded: whether the section is shown (collapsible only); default true
     onToggle(event): runs when the button is clicked (collapsible only)
     controls: the id of the section body (collapsible only)
     actions: controls at the end of the heading
     className: more classes on the heading
     children: the label text
     ...rest: other attributes go on the heading element
   Behavior:
     The chevron turns with expanded.
   Notes:
     It sets no outer margin: the list or panel it sits in spaces it.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function SectionHeading({ level = 3, collapsible = false, expanded = true, onToggle, controls, actions, className, children, ...rest }) {
  const Tag = level ? 'h' + level : 'div';
  if (collapsible) {
    return (
      <Tag className={cx('plx-section-heading', 'plx-section-heading--collapsible', className)} {...rest}>
        <button type="button" className="plx-section-heading__toggle" aria-expanded={expanded} aria-controls={controls} onClick={onToggle}>
          <span className="plx-section-heading__label">{children}</span>
          <span className="plx-section-heading__chevron" aria-hidden="true" />
        </button>
        {actions ? <span className="plx-section-heading__actions">{actions}</span> : null}
      </Tag>
    );
  }
  return (
    <Tag className={cx('plx-section-heading', className)} {...rest}>
      <span className="plx-section-heading__label">{children}</span>
      {actions ? <span className="plx-section-heading__actions">{actions}</span> : null}
    </Tag>
  );
}
