/* Plenix · ColorSwatch
   Summary: A color from the data shown as a small square chip (a category's color).
   Usage:
     <ColorSwatch color={category.color} />
     <ColorSwatch color={category.color} label="Blue" pressed={picked === 'blue'} onClick={() => …} />
   Props:
     color: a data color: a hue name (blue, green, purple, red, brown, gray: the --plx-sys-data-color-<hue> tokens), set as data-plx-color; no value is written (batch 280)
     category: instead of color, a category color by name (CATEGORY_COLORS: the category palette, its own tokens), set as
       data-plx-category (batch 290)
     tone: instead of color, a surface of the system it previews: "accent" (the accent surface) | "surface" | "frost"
     size: "sm" (16px) | "md" (default; 20px)
     shape: "square" (default: 2px corners, owner batch 291) | "round" (a circle)
     pressed: marks the chosen color (aria-pressed), with onClick
     label: the accessible name of the color, with onClick
     onClick(event): makes the swatch a button that picks the color
     className: more classes on the swatch
     ColorPicker: the data colors (DATA_COLORS) as a group of swatch buttons, one pressed (batch 280: a data color is a hue)
       ColorPicker.value: the chosen hue
       ColorPicker.onChange(hue): runs with the hue picked
       ColorPicker.label: the group's accessible name (default "Color")
       ColorPicker.size: the swatches' size (default "md")
       ColorPicker.palette: "data" (default: the data hues) | "category" (the category colors: categories use these)
       ColorPicker shows one row (owner, batch 290): the colors that do not fit are in a More menu at its end ("+n", or the
       chosen color when it is one of them), each with its swatch and name
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
import { CATEGORY_COLORS } from './categoryColors.js';
import { Button } from '../Button/Button.jsx';
import { Menu, MenuItem } from '../Menu/Menu.jsx';
import { useOverflow, splitAt } from '../../utils/overflow.js';

const nameOf = (h) => h.charAt(0).toUpperCase() + h.slice(1);

export function ColorSwatch({ color, category, tone, size = 'md', shape = 'square', pressed, label, onClick, className, ...rest }) {
  const cls = cx('plx-color-swatch', 'plx-color-swatch--' + size, shape === 'round' && 'plx-color-swatch--round', tone && 'plx-color-swatch--' + tone, className);
  return onClick ? <button type="button" className={cls} data-plx-color={color || undefined} data-plx-category={category || undefined} aria-pressed={!!pressed} aria-label={label} onClick={onClick} {...rest} />
    : <span className={cls} data-plx-color={color || undefined} data-plx-category={category || undefined} aria-hidden="true" {...rest} />;
}

// the data colors to choose from: each a swatch button named by its hue, the chosen one pressed
export function ColorPicker({ value, onChange, label = 'Color', size = 'md', palette = 'data', invalid, required, className, ...rest }) {   // invalid and required: from Field, not for a group
  const list = palette === 'category' ? CATEGORY_COLORS : DATA_COLORS;
  const cat = palette === 'category';
  const ref = React.useRef(null);
  const fit = useOverflow(ref, list.length, palette + size);
  const hidden = list.slice(fit);
  const pick = (h) => { if (onChange) onChange(h); };
  const swatch = (h, extra) => <ColorSwatch key={h} color={cat ? undefined : h} category={cat ? h : undefined} size={size} {...extra} />;
  // each swatch in a slot as tall as the row, so every item and the More button share the first row's top
  const items = list.map((h) => <span key={h} data-plx-overflow-item="" className="plx-color-picker__slot">{swatch(h, { label: nameOf(h), pressed: value === h, onClick: () => pick(h) })}</span>);
  const chosenHidden = hidden.indexOf(value) >= 0;
  const more = hidden.length ? (
    <span key="plx-more" data-plx-overflow-more="" className="plx-color-picker__more">
      <Menu label={'More colors'} placement="bottom-end"
        trigger={<Button size="2xs" variant={chosenHidden ? 'secondary' : 'ghost'} caret aria-label={'More colors' + (chosenHidden ? ', ' + nameOf(value) + ' chosen' : '')}>
          {chosenHidden ? <ColorSwatch color={cat ? undefined : value} category={cat ? value : undefined} size="sm" /> : '+' + hidden.length}</Button>}>
        {hidden.map((h) => <MenuItem key={h} role="menuitemradio" checked={value === h} icon={swatch(h, { size: 'sm' })} onSelect={() => pick(h)}>{nameOf(h)}</MenuItem>)}
      </Menu>
    </span>
  ) : null;
  return (
    <div ref={ref} role="group" aria-label={label || undefined} className={cx('plx-color-picker', className)} {...rest}>
      {splitAt(items, fit, more)}
    </div>
  );
}
