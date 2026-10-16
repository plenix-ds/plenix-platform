/* Plenix · ContentGrid
   Summary: A responsive grid of cards, a masonry of pictures of mixed heights, or justified rows of pictures.
   Usage:
     <ContentGrid size="md" label="Assets"><Card…/><Card…/></ContentGrid>
     <ContentGrid layout="masonry" size="sm" label="Photos"><Image…/><Image…/></ContentGrid>
     <ContentGrid layout="justified" label="Photos"><Image ratio="16-9" …/><Image ratio="3-4" …/></ContentGrid>
   Props:
     size: "xs" | "sm" | "md" (default) | "lg"; sets the smallest card width (100, 140, 180, 240px), and in justified rows
       the row height
     layout: "grid" (default: rows of equal cells) | "masonry" (columns of the card width; each item keeps its own height)
       | "justified" (rows of the size's height that fill the width; each item as wide as its ratio)
     label: names the list
     className: more classes on the grid
     children: the cards; each child is one list item (null, undefined and false are skipped). In justified rows each
       child's ratio prop ("1-1", "4-3", "3-2", "16-9", "21-9", "3-4", "9-16"; the aspect-ratio scale) sets its width;
       a child without one is 4:3
   Behavior:
     Columns fill the width.
     The gap follows the density (--plx-sys-card-grid-gap).
     Masonry fills each column from top to bottom in the markup order, so reading and Tab go down the first column, then
       the next; where the browser lays out a masonry grid (grid-template-rows: masonry) it fills row by row instead.
       An item never breaks across two columns.
     Justified rows keep the row height and widen each item by its ratio until the row is full; the last row keeps its
       items at their own width. Pictures in it fill their cell (cover), so a few pixels of their edges may be cropped.
   Notes:
     Masonry and justified rows are for browsing pictures; when the order matters (sorted results) use the grid.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';

const RATIOS = ['1-1', '4-3', '3-2', '16-9', '21-9', '3-4', '9-16'];

export function ContentGrid({ size = 'md', layout = 'grid', label, className, children }) {
  devWarn('ContentGrid', { size }, { size: ['xs','sm','md','lg'] });
  const justified = layout === 'justified';
  return (
    <ul aria-label={label} className={cx('plx-content-grid', 'plx-content-grid--' + size, layout !== 'grid' ? 'plx-content-grid--' + layout : null, className)}>
      {React.Children.map(children, (c) => {
        if (c === null || c === undefined || c === false) return null;
        const ratio = justified ? (c.props && RATIOS.indexOf(c.props.ratio) >= 0 ? c.props.ratio : '4-3') : undefined;
        return <li className="plx-content-grid__item" data-plx-ratio={ratio}>{c}</li>;
      })}
    </ul>
  );
}
