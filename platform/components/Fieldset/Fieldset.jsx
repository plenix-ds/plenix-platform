/* Plenix · Fieldset
   Summary: A group of related controls with its title (a legend): no border, the legend as secondary text, the controls
     stacked under it.
   Usage:
     <Fieldset legend="Export" gap="sm"><Checkbox label="Originals" /><Checkbox label="Metadata" /></Fieldset>
   Props:
     legend: the title of the group
     gap: the space between the stacked controls: "xs" (default) | "sm" | "md"
     children: the controls
     className: more classes on the <fieldset>
   Notes:
     Other props pass through to the <fieldset>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Fieldset({ legend, gap = 'xs', className, children, ...rest }) {
  return (
    <fieldset className={cx('plx-fieldset', 'plx-stack', 'plx-stack--gap-' + gap, className)} {...rest}>
      <legend className="plx-fieldset__legend">{legend}</legend>
      {children}
    </fieldset>
  );
}
