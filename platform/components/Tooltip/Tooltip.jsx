/* Plenix · Tooltip
   Summary: A short label for a control, shown on hover, on keyboard focus and, on touch, on a long press. The rich
     tooltip (09 Overlays › Contextual overlays › Rich tooltip) adds a title, a few sentences and, as a toggletip, one action.
   Usage:
     <Tooltip content="Upload files" placement="bottom"><Button …/></Tooltip>
     <Tooltip title="Retention" content="Deleted files stay in the trash for 30 days."><Button …/></Tooltip>
     <Tooltip title="Smart crop" content="…" action={<Link href="#crop" variant="standalone">About smart crop</Link>}><Button …/></Tooltip>
   Props:
     content: the tooltip text (in a rich tooltip, its body: one to three sentences)
     placement: "bottom" (default) | "top" | "start" | "end" (start and end follow the writing direction)
     title: a short title above the body; it makes the tooltip rich
     action: one action under the body (a standalone Link, or a small Button); it makes the tooltip rich and a toggletip:
       it opens on click (Enter or Space on the trigger) instead of on hover and focus
     rich: the rich look without a title or an action (default false; true when title or action is given)
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
     Placement: where the browser has CSS anchor positioning (utils/floating.js) the bubble is placed against the trigger by
       useFloating while it shows (offset sm), so no scroll area or pane clips it; elsewhere it is drawn inside the wrapper
       on its side, as before. A tooltip with an arrow keeps its side; a rich tooltip (no arrow) flips and shifts to stay in
       the window.
     Rich: a text-only rich tooltip opens on hover and focus like a plain one and stays open while the pointer is over it
       (it hides --plx-comp-tooltip-rich-close-delay after the pointer leaves both). With an action it is a toggletip: the
       trigger toggles it (aria-expanded, aria-controls), Tab from the trigger reaches the action, and Escape, a click
       outside or focus leaving it closes it (Escape returns focus to the trigger); a tap opens it on touch.
   Notes:
     An icon-only control still needs its own label (aria-label): the tooltip repeats it visually, it is never the only
     way to learn the control's name.
     Not for essential content. Only the rich tooltip holds an action, and then it opens on click: interactive content never
     depends on hover.
     The rich surface is the popover's (the overlay surface with its border, radius and shadow), with no arrow.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useFloating, FLOATING_ANCHOR } from '../../utils/floating.js';

const SIDES = ['bottom', 'top', 'start', 'end'];

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

export function Tooltip({ content, placement = 'bottom', title, action, rich = false, disabled = false, className, children }) {
  const id = 'plx-tt' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = React.useState(false);
  const wrap = React.useRef(null);
  const bubble = React.useRef(null);
  const press = React.useRef(null);     // the long-press timer
  const hide = React.useRef(null);      // the timer that hides a tooltip a long press (or a rich tooltip's leave) started
  const pressed = React.useRef(false);  // this touch opened the tooltip by a long press
  const isRich = !!(rich || title || action);
  const toggle = !!action;              // a toggletip: opened by a click on the trigger
  const side = SIDES.indexOf(placement) >= 0 ? placement : 'bottom';
  const clear = () => { clearTimeout(press.current); clearTimeout(hide.current); };
  React.useEffect(() => { listen(); return clear; }, []);
  // placed against the trigger by anchor positioning while it shows; the arrow keeps its side (no flip, no shift)
  useFloating(wrap, bubble, { open: open && !disabled && FLOATING_ANCHOR, placement: side, offset: 'sm', flip: isRich, shift: isRich });
  React.useEffect(() => {
    if (!open) return undefined;
    const esc = (e) => {
      if (e.key !== 'Escape') return;
      const inside = wrap.current && wrap.current.contains(document.activeElement);
      setOpen(false);
      // a toggletip gives focus back to its trigger when Escape closes it from inside
      if (toggle && inside && wrap.current.firstElementChild && wrap.current.firstElementChild.focus) wrap.current.firstElementChild.focus();
    };
    const outside = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('keydown', esc);
    if (toggle) document.addEventListener('mousedown', outside);
    return () => { document.removeEventListener('keydown', esc); document.removeEventListener('mousedown', outside); };
  }, [open, toggle]);
  const child = React.Children.only(children);
  const described = { 'aria-describedby': [child.props['aria-describedby'], id].filter(Boolean).join(' ') };
  const trigger = disabled ? child : React.cloneElement(child, toggle ? Object.assign(described, {
    'aria-expanded': open, 'aria-controls': open ? id + 'b' : undefined,
    onClick: (e) => { if (child.props.onClick) child.props.onClick(e); setOpen(!open); },
  }) : described);
  if (disabled) return <span className={cx('plx-tooltip', className)}>{trigger}</span>;
  const onPointerDown = (e) => {
    if (e.pointerType !== 'touch' || toggle) return;
    clear(); pressed.current = false;
    press.current = setTimeout(() => { pressed.current = true; setOpen(true); }, ms(wrap.current, '--plx-comp-tooltip-long-press-delay'));
  };
  const onPointerEnd = (e) => {
    if (e.pointerType !== 'touch' || toggle) return;
    clearTimeout(press.current);
    if (pressed.current) hide.current = setTimeout(() => { setOpen(false); pressed.current = false; }, e.type === 'pointercancel' ? 0 : ms(wrap.current, '--plx-comp-tooltip-touch-dismiss-delay'));
  };
  const onEnter = (e) => { if (e.pointerType === 'touch' || toggle) return; clearTimeout(hide.current); setOpen(true); };
  const onLeave = (e) => {
    if (e.pointerType === 'touch' || toggle) return;
    // a rich tooltip waits a moment, so the pointer can move into it; a plain one hides at once
    if (isRich) { clearTimeout(hide.current); hide.current = setTimeout(() => setOpen(false), ms(wrap.current, '--plx-comp-tooltip-rich-close-delay')); }
    else setOpen(false);
  };
  const bubbleCls = cx('plx-tooltip__bubble', 'plx-tooltip__bubble--' + side, isRich && 'plx-tooltip__bubble--rich', open && 'is-open');
  return (
    <span ref={wrap} className={cx('plx-tooltip', className)}
      onPointerEnter={onEnter} onPointerLeave={onLeave}
      onPointerDown={onPointerDown} onPointerUp={onPointerEnd} onPointerCancel={onPointerEnd}
      onContextMenu={(e) => { if (pressed.current) e.preventDefault(); }}
      onClickCapture={(e) => { if (pressed.current) { e.preventDefault(); e.stopPropagation(); pressed.current = false; } }}
      onFocus={() => { if (!toggle && lastInput !== 'touch') setOpen(true); }}
      onBlur={(e) => { if (!pressed.current && !(wrap.current && wrap.current.contains(e.relatedTarget))) setOpen(false); }}>
      {trigger}
      {isRich ? (
        <span ref={bubble} id={id + 'b'} className={bubbleCls}>
          <span role="tooltip" id={id} className="plx-tooltip__content">
            {title ? <span className="plx-tooltip__title">{title}</span> : null}
            <span className="plx-tooltip__body">{content}</span>
          </span>
          {action ? <span className="plx-tooltip__action">{action}</span> : null}
        </span>
      ) : <span ref={bubble} role="tooltip" id={id} className={bubbleCls}>{content}</span>}
    </span>
  );
}
