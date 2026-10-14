/* Plenix · Fieldset
   Summary: A group of related controls with its title (a legend): no border, the legend as secondary text, the controls
     stacked under it, or side by side in a row when they make one value together (a field group: width and height, the
     parts of an address line).
   Usage:
     <Fieldset legend="Export" gap="sm"><Checkbox label="Originals" /><Checkbox label="Metadata" /></Fieldset>
     <Fieldset legend="Size" layout="row"><Field label="Width"><Input width="xs" /></Field><Field label="Height"><Input width="xs" /></Field></Fieldset>
     <Fieldset legend="Sort by" hideLegend><RadioGroup … /></Fieldset>
   Props:
     legend: the title of the group
     layout: "stack" (default; the controls under each other) | "row" (a field group: the controls side by side, wrapping
       onto more lines when the row is narrow)
     gap: the space between the stacked controls: "xs" (default) | "sm" | "md" (layout "stack")
     hideLegend: the legend is read by assistive technology but not shown, for a group whose title is already on screen
       (a section heading, a dialog title) (default false)
     children: the controls
     className: more classes on the <fieldset>
   Behavior:
     The legend names the group: a screen reader reads it when focus enters the group.
     A row keeps its controls aligned at their tops (their labels on one line) and wraps when it runs out of room.
   Notes:
     Other props pass through to the <fieldset> (disabled turns every control in it off).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Fieldset({ legend, layout = 'stack', gap = 'xs', hideLegend = false, className, children, ...rest }) {
  const row = layout === 'row';
  return (
    <fieldset className={cx('plx-fieldset', row ? 'plx-fieldset--row' : 'plx-stack plx-stack--gap-' + gap, className)} {...rest}>
      <legend className={cx('plx-fieldset__legend', hideLegend && 'plx-visually-hidden')}>{legend}</legend>
      {children}
    </fieldset>
  );
}
