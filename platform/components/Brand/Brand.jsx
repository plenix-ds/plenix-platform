/* Plenix · BrandMark
   Summary: The Plenix mark, from the brand kit (platform/brand/), in the current text color.
   Usage:
     <BrandMark />                      decorative, beside the product name
     <BrandMark label="Plenix" />       on its own, named
   Props:
     BrandMark.label: the accessible name; without it the mark is decorative (hidden from assistive technology)
     BrandMark.className: more classes
   Behavior:
     The mark is the brand kit's file (platform/brand/brand.json files.mark), drawn as a mask in the current text color:
       the tokens color it (white on the header's blue). Its square includes the kit's clear space.
     Its size is the control icon size (--plx-comp-icon-size); a pattern sets another size by that property.
   Notes:
     Never redraw or recolor the mark by hand: replace the kit's files and build (build-brand.js).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function BrandMark({ label, className, ...rest }) {
  return label ? <span role="img" aria-label={label} className={cx('plx-brand-mark', className)} {...rest} />
    : <span aria-hidden="true" className={cx('plx-brand-mark', className)} {...rest} />;
}
