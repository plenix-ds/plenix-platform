/* Plenix · ColorSwatch
   Summary: A color from the data shown as a small round chip (a category's color).
   Usage:
     <ColorSwatch color={category.color} />
     <ColorSwatch color={category.color} label="Blue" pressed={picked === 'blue'} onClick={() => …} />
   Props:
     color: the color value, from the data
     size: "sm" (16px) | "md" (default; 20px)
     shape: "round" (default) | "square" (the compact corner: a swatch inside a button)
     pressed: marks the chosen color (aria-pressed), with onClick
     label: the accessible name of the color, with onClick
     onClick(event): makes the swatch a button that picks the color
     className: more classes on the swatch
   Behavior:
     With onClick it is a button that picks the color; without it the swatch is hidden from assistive technology.
   Notes:
     The color reaches the stylesheet as --plx-comp-color-swatch-value, the only way a data color enters a page.
     Other props pass through to the <button> or <span>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function ColorSwatch({ color, size = 'md', shape = 'round', pressed, label, onClick, className, ...rest }) {
  const cls = cx('plx-color-swatch', 'plx-color-swatch--' + size, shape === 'square' && 'plx-color-swatch--square', className);
  return onClick ? <button type="button" className={cls} style={{ '--plx-comp-color-swatch-value': color }} aria-pressed={!!pressed} aria-label={label} onClick={onClick} {...rest} />
    : <span className={cls} style={{ '--plx-comp-color-swatch-value': color }} aria-hidden="true" {...rest} />;
}
