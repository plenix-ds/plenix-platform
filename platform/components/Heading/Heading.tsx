/* Plenix · Heading
   Summary: The title of a page or of a section in it, at a level of the document outline (owner, 2026-10-14, RedSave #8:
     page and section titles on the type scale). SectionHeading stays the small uppercase label over a group of content.
   Usage:
     <Heading level={1}>Posts</Heading>                       // the page title
     <Heading level={2}>Recent activity</Heading>             // a section of the page
     <Heading level={3} size={2}>Billing</Heading>            // an h3 drawn at level 2's size, when the outline needs it
   Props:
     level: 1–6, the heading element (h1–h6) and, by default, its size; 5 and 6 are drawn at level 4's size (default 2)
     size: 1–4, the size drawn, when it must differ from the level (the outline stays right)
     id: the heading's id (for aria-labelledby and links to the section)
     className: more classes on the heading
     children: the title, in sentence case
   Behavior:
     Static. The sizes follow the type scale: level 1 20px bold (the page title), level 2 18px semibold (the record
       title's size), level 3 15px semibold, level 4 13px semibold; DM Sans, the default content color, tight lines.
   Notes:
     One level 1 per page. Skip no level going down the outline. Never uppercase (that is SectionHeading's job); never
       a heading made of bold text. Every value is a --plx-comp-heading-* token.
     Writing direction (owner, ctm-needs-34): dir and lang go on the heading element (other props pass through), for a heading in
       the other direction than the page.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

export const Heading = React.forwardRef(function Heading({ level = 2, size, id, className, children, ...rest }, ref) {
  const lv = Math.min(6, Math.max(1, Math.round(Number(level) || 2)));
  const sz = Math.min(4, Math.max(1, Math.round(Number(size) || Math.min(lv, 4))));
  const Tag = 'h' + lv;
  return <Tag ref={ref} id={id} className={cx('plx-heading', 'plx-heading--size-' + sz, className)} {...rest}>{children}</Tag>;
});
