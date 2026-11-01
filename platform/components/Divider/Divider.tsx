/* Plenix · Divider
   Summary: A 1px rule between groups.
   Usage:
     <Divider />
     <Divider orientation="vertical" />
   Props:
     orientation: "horizontal" (default) | "vertical" (in a row)
     className: more classes on the rule
   Behavior:
     It is a separator (role="separator") with its orientation.
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' };
export function Divider({ orientation = 'horizontal', className, ...rest }: DividerProps) {
  return <div role="separator" aria-orientation={orientation} className={cx('plx-divider', 'plx-divider--' + orientation, className)} {...rest} />;
}
