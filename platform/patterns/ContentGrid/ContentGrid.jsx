/* Plenix · ContentGrid
   Summary: A responsive grid of cards.
   Usage:
     <ContentGrid size="md" label="Assets"><Card…/><Card…/></ContentGrid>
   Props:
     size: "xs" | "sm" | "md" (default) | "lg"; sets the smallest card width (100, 140, 180, 240px)
     label: names the list
     className: more classes on the grid
     children: the cards; each child is one list item (null, undefined and false are skipped)
   Behavior:
     Columns fill the width.
     The gap follows the density (--plx-sys-card-grid-gap).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function ContentGrid({ size = 'md', label, className, children }) {
  return (
    <ul aria-label={label} className={cx('plx-content-grid', 'plx-content-grid--' + size, className)}>
      {React.Children.map(children, (c) => (c === null || c === undefined || c === false ? null : <li className="plx-content-grid__item">{c}</li>))}
    </ul>
  );
}
