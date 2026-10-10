/* Plenix · ColorSwatch
   Summary: A color from the data shown as a small round chip (a category's color).
   Usage:
     <ColorSwatch color={category.color} />
     <ColorSwatch color={category.color} label="Blue" pressed={picked === 'blue'} onClick={() => …} />
   Props:
     color: a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280)
     tone: instead of color, a surface of the system it previews: "accent" (the accent surface) | "surface" | "frost"
     size: "sm" (16px) | "md" (default; 20px)
     shape: "round" (default) | "square" (the compact corner: a swatch inside a button)
     pressed: marks the chosen color (aria-pressed), with onClick
     label: the accessible name of the color, with onClick
     onClick(event): makes the swatch a button that picks the color
     className: more classes on the swatch
     ColorPicker: the data colors (DATA_COLORS) as a group of swatch buttons, one pressed (batch 280: a data color is a hue)
       ColorPicker.value: the chosen hue
       ColorPicker.onChange(hue): runs with the hue picked
       ColorPicker.label: the group's accessible name (default "Color")
       ColorPicker.size: the swatches' size (default "md")
       ColorPicker.className: more classes on the group
   Behavior:
     With onClick it is a button that picks the color; without it the swatch is hidden from assistive technology.
   Notes:
     The hue reaches the stylesheet as the data-plx-color attribute (system/steps.css), the only way a data color enters a page.
     Other props pass through to the <button> or <span>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { DATA_COLORS } from './dataColors.js';

const nameOf = (h) => h.charAt(0).toUpperCase() + h.slice(1);

export function ColorSwatch({ color, tone, size = 'md', shape = 'round', pressed, label, onClick, className, ...rest }) {
  const cls = cx('plx-color-swatch', 'plx-color-swatch--' + size, shape === 'square' && 'plx-color-swatch--square', tone && 'plx-color-swatch--' + tone, className);
  return onClick ? <button type="button" className={cls} data-plx-color={color || undefined} aria-pressed={!!pressed} aria-label={label} onClick={onClick} {...rest} />
    : <span className={cls} data-plx-color={color || undefined} aria-hidden="true" {...rest} />;
}

// the data colors to choose from: each a swatch button named by its hue, the chosen one pressed
export function ColorPicker({ value, onChange, label = 'Color', size = 'md', className, ...rest }) {
  return (
    <div role="group" aria-label={label} className={cx('plx-color-picker', className)} {...rest}>
      {DATA_COLORS.map((h) => <ColorSwatch key={h} color={h} size={size} label={nameOf(h)} pressed={value === h} onClick={() => { if (onChange) onChange(h); }} />)}
    </div>
  );
}
