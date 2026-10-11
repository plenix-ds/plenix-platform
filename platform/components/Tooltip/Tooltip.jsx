/* Plenix · Tooltip
   Summary: A short label for a control, shown on hover, on keyboard focus and, on touch, on a long press.
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
     It shows on hover (a mouse or a pen) and on keyboard focus, and hides on leave, on blur and with Escape.
     On touch there is no hover (Platforms Standard 6.5): a long press (--plx-comp-tooltip-long-press-delay) shows it, and
     it hides --plx-comp-tooltip-touch-dismiss-delay after the finger lifts, or when the finger moves away or is cancelled.
     A tap does not show it (focus that follows a touch is ignored; mouse events emulated from touch are not listened to),
     and the long press neither opens the browser's context menu nor activates the control (the click that may follow the
     release is dropped): a long press asks what a control is, it does not use it.
     The trigger is described by the tooltip (aria-describedby), added to any it already has.
   Notes:
     An icon-only control still needs its own label (aria-label): the tooltip repeats it visually, it is never the only
     way to learn the control's name.
     Not for essential or interactive content.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

// a duration token ("0.5s", "500ms") in milliseconds, read from the element's computed style
const ms = (el, name) => {
  const v = el ? getComputedStyle(el).getPropertyValue(name).trim() : '';
  const n = parseFloat(v);
  return isNaN(n) ? 0 : /ms$/.test(v) ? n : n * 1000;
};

// the last way the person reached for the page: a touch, or a mouse, pen or key. Focus that follows a tap does not open
// the tooltip (a long press does); focus that follows a key does. One listener pair for every tooltip, added by the first.
let lastInput = 'key', listening = false;
const listen = () => {
  if (listening) return; listening = true;
  document.addEventListener('pointerdown', (e) => { lastInput = e.pointerType === 'touch' ? 'touch' : 'pointer'; }, true);
  document.addEventListener('keydown', () => { lastInput = 'key'; }, true);
};

export function Tooltip({ content, placement = 'bottom', disabled = false, className, children }) {
  const id = 'plx-tt' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef(null);
  const press = React.useRef(null);     // the long-press timer
  const hide = React.useRef(null);      // the timer that hides a tooltip a long press opened
  const pressed = React.useRef(false);  // this touch opened the tooltip by a long press
  const clear = () => { clearTimeout(press.current); clearTimeout(hide.current); };
  React.useEffect(() => { listen(); return clear; }, []);
  React.useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);
  const child = React.Children.only(children);
  const trigger = disabled ? child : React.cloneElement(child, { 'aria-describedby': [child.props['aria-describedby'], id].filter(Boolean).join(' ') });
  if (disabled) return <span className={cx('plx-tooltip', className)}>{trigger}</span>;
  const onPointerDown = (e) => {
    if (e.pointerType !== 'touch') return;
    clear(); pressed.current = false;
    press.current = setTimeout(() => { pressed.current = true; setOpen(true); }, ms(wrap.current, '--plx-comp-tooltip-long-press-delay'));
  };
  const onPointerEnd = (e) => {
    if (e.pointerType !== 'touch') return;
    clearTimeout(press.current);
    if (pressed.current) hide.current = setTimeout(() => { setOpen(false); pressed.current = false; }, e.type === 'pointercancel' ? 0 : ms(wrap.current, '--plx-comp-tooltip-touch-dismiss-delay'));
  };
  return (
    <span ref={wrap} className={cx('plx-tooltip', className)}
      onPointerEnter={(e) => { if (e.pointerType !== 'touch') setOpen(true); }}
      onPointerLeave={(e) => { if (e.pointerType !== 'touch') setOpen(false); }}
      onPointerDown={onPointerDown} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}
      onContextMenu={(e) => { if (pressed.current) e.preventDefault(); }}
      onClickCapture={(e) => { if (pressed.current) { e.preventDefault(); e.stopPropagation(); pressed.current = false; } }}
      onFocus={() => { if (lastInput !== 'touch') setOpen(true); }} onBlur={() => { if (!pressed.current) setOpen(false); }}>
      {trigger}
      <span role="tooltip" id={id} className={cx('plx-tooltip__bubble', 'plx-tooltip__bubble--' + placement, open && 'is-open')}>{content}</span>
    </span>
  );
}
