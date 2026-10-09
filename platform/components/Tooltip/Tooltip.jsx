/* Plenix · Tooltip
   Summary: A short label for a control, shown on hover and on keyboard focus.
   Usage:
     <Tooltip content="Upload files" placement="bottom"><Button …/></Tooltip>
   Props:
     content: the tooltip text
     placement: "bottom" (default) | "top" | "end"
     disabled: the tooltip neither shows nor describes the trigger (default false); for a label that is shown in full most of
       the time and only needs its tooltip when it is cut short
     className: more classes on the wrapper
     children: the control it labels (one element)
   Behavior:
     It shows on hover and on keyboard focus, and hides on leave, on blur and with Escape.
     The trigger is described by the tooltip (aria-describedby), added to any it already has.
   Notes:
     An icon-only control still needs its own label: the tooltip repeats it visually, it does not replace it.
     Not for essential or interactive content.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export function Tooltip({ content, placement = 'bottom', disabled = false, className, children }) {
  const id = 'plx-tt' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  const child = React.Children.only(children);
  const trigger = disabled ? child : React.cloneElement(child, { 'aria-describedby': [child.props['aria-describedby'], id].filter(Boolean).join(' ') });
  return (
    <span className={cx('plx-tooltip', className)} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {trigger}
      {disabled ? null : <span role="tooltip" id={id} className={cx('plx-tooltip__bubble', 'plx-tooltip__bubble--' + placement, open && 'is-open')}>{content}</span>}
    </span>
  );
}
