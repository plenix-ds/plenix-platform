/* Plenix · Divider
   Summary: A 1px rule between groups; horizontal, it can carry a short text in the middle, with a line on each side.
   Usage:
     <Divider />
     <Divider orientation="vertical" />
     <Divider>or</Divider>
   Props:
     orientation: "horizontal" (default) | "vertical" (in a row)
     children: a short text in the middle of a horizontal rule ("or", "Today"), a line on each side; ignored on a vertical one
     className: more classes on the rule
   Behavior:
     It is a separator (role="separator") with its orientation. With text it is named by that text (aria-label), and the lines and the text keep their
       order in right to left; the text is one line, never wrapped, in the muted text color.
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';

export type DividerProps = React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' };
export function Divider({ orientation = 'horizontal', className, children, ...rest }: DividerProps) {
  if (orientation === 'horizontal' && children !== undefined && children !== null && children !== false && children !== '') {
    return (
      <div role="separator" aria-orientation="horizontal" aria-label={typeof children === 'string' || typeof children === 'number' ? String(children) : undefined} className={cx('plx-divider', 'plx-divider--labeled', className)} {...rest}>
        <span className="plx-divider__line" aria-hidden="true" />
        <span className="plx-divider__text">{children}</span>
        <span className="plx-divider__line" aria-hidden="true" />
      </div>
    );
  }
  return <div role="separator" aria-orientation={orientation} className={cx('plx-divider', 'plx-divider--' + orientation, className)} {...rest} />;
}
