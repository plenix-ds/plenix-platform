/* Plenix · usePressable
   Summary: One press from every input: a mouse click, a tap, a pen, Enter or Space on the keyboard, and the click a
     screen reader sends all call onPress once, with the kind of input that made it. While the press is held the element
     is pressed, so it can show the pressed treatment (is-pressed, system/interaction.css).
   Usage:
     const { pressed, pressProps } = usePressable({ onPress: (e) => open(e.pointerType) });
     <button type="button" className={cx('plx-state', pressed && 'is-pressed')} {...pressProps}>Open</button>
     <div role="button" tabIndex={0} {...pressProps}>…</div>          // a custom surface: the role and the Tab stop are yours
   Props:
     options.onPress({ pointerType, target, shiftKey, ctrlKey, metaKey, altKey, event }): the press, once; pointerType is
       "mouse", "touch", "pen", "keyboard" or "virtual" (a screen reader's or a script's click); event is the event that
       made it (a click, or the key with the keyboard)
     options.onPressStart({ pointerType }): the press begins (pointer down, or the key goes down)
     options.onPressEnd({ pointerType }): the press ends, whether it was made or canceled
     options.onPressChange(pressed): the pressed state changes
     options.disabled (false): no press, no pressed state; the element keeps its focus behavior
     options.handlers ({}): your own handlers of the same events (onClick, onKeyDown, …); they run first
     options.native (false): on a native <button>, the browser's click stays the one press, for every input: onPress
       runs from that click (event is the click itself), with pointerType from the pointer or key that made it; the keys
       keep the browser's behavior (Enter repeats while held, as a native button does), and pressed stays false (the
       button draws its own :active); pressProps are then onPointerDown, onPointerCancel, onKeyDown, onBlur and onClick. A
       preventDefault in one of your handlers does not stop the press there: the browser decides the click
     returns { pressed, pressProps }: pressProps go on the element (onPointerDown, onPointerUp, onPointerEnter,
       onPointerLeave, onPointerCancel, onKeyDown, onKeyUp, onBlur, onClick)
   Behavior:
     Pointer: the press is made on release over the element (the browser's click), so sliding off before release cancels
       it (WCAG 2.2, 2.5.2 Pointer cancellation); sliding back on while held presses it again. Only the primary button presses.
     Keyboard: Enter presses when it goes down (as a native button does) and does not repeat while held; Space presses
       when it comes up, and Escape or moving focus away while it is held cancels it. A link (a[href]) keeps Enter for itself.
     A click with no pointer and no key (a screen reader activating the element) presses with pointerType "virtual".
     Your own handlers of the same events still run: pass them in options.handlers and they run first; preventDefault
       in one stops the press.
   Notes:
     It gives behavior, not semantics: put it on a native button whenever you can. A custom surface needs role="button"
       (or the role of its widget), tabIndex 0 and a name; the check-system rule semantic-html rejects a clickable div
       without a role.
     Hover is not a press: hover treatment comes from :hover, which touch screens do not keep after a tap.
*/
import React from 'react';

export type PointerKind = 'mouse' | 'touch' | 'pen' | 'keyboard' | 'virtual' | string;
// the events a press reads: pointer, key, focus and click events (their fields that the press reads are optional)
type PressEvent = React.SyntheticEvent<HTMLElement> & {
  pointerType?: string; button?: number; buttons?: number; key?: string; repeat?: boolean; detail?: number;
  shiftKey?: boolean; ctrlKey?: boolean; metaKey?: boolean; altKey?: boolean;
};
type Handler = (e: PressEvent) => void;
export type PressInfo = { pointerType: PointerKind; target: HTMLElement; shiftKey: boolean; ctrlKey: boolean; metaKey: boolean; altKey: boolean; event: PressEvent };
export type PressableOptions = {
  onPress?(e: PressInfo): void; onPressStart?(e: { pointerType: PointerKind }): void; onPressEnd?(e: { pointerType: PointerKind }): void;
  onPressChange?(pressed: boolean): void; disabled?: boolean; handlers?: Record<string, Handler | undefined>; native?: boolean;
};
export type PressProps = Record<string, Handler | undefined>;

const PRIMARY = 0;

export function usePressable(options: PressableOptions = {}): { pressed: boolean; pressProps: PressProps } {
  const { onPress, onPressStart, onPressEnd, disabled = false, handlers = {}, native = false } = options;
  const [pressed, setPressedState] = React.useState(false);
  // what is held now: { pointerType } while a pointer or key holds the press; the key that holds it
  const hold = React.useRef<{ pointerType: PointerKind; left?: boolean } | null>(null);
  const key = React.useRef<string | null>(null);
  const lastPointer = React.useRef<PointerKind | null>(null);
  const latest = React.useRef(options);
  latest.current = options;

  const setPressed = (on: boolean) => {
    setPressedState(on);
    if (latest.current.onPressChange) latest.current.onPressChange(on);
  };
  const start = (pointerType: PointerKind) => {
    hold.current = { pointerType };
    setPressed(true);
    if (onPressStart) onPressStart({ pointerType });
  };
  const end = () => {
    const was = hold.current;
    hold.current = null;
    setPressed(false);
    if (was && onPressEnd) onPressEnd({ pointerType: was.pointerType });
  };
  const fire = (e: PressEvent, pointerType: PointerKind) => {
    if (onPress) onPress({ pointerType, target: e.currentTarget, shiftKey: !!e.shiftKey, ctrlKey: !!e.ctrlKey, metaKey: !!e.metaKey, altKey: !!e.altKey, event: e });
  };
  // the caller's own handler first; preventDefault in it stops the press
  const chain = (name: string, own: Handler) => (e: PressEvent) => {
    if (handlers[name]) handlers[name]!(e);
    if (disabled || e.defaultPrevented) return;
    own(e);
  };
  const isLink = (el: HTMLElement) => el && el.tagName === 'A' && el.hasAttribute('href');

  React.useEffect(() => { if (disabled && hold.current) end(); });

  if (native) {
    // the browser's click is the press: the pointer or key before it only names the kind of input
    const own = (name: string) => (e: PressEvent) => { if (handlers[name]) handlers[name]!(e); };
    const nativeProps: PressProps = {
      onPointerDown: (e) => { own('onPointerDown')(e); lastPointer.current = e.pointerType || 'mouse'; },
      onPointerCancel: (e) => { own('onPointerCancel')(e); lastPointer.current = null; },
      onKeyDown: (e) => { own('onKeyDown')(e); if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') lastPointer.current = 'keyboard'; },
      onBlur: (e) => { own('onBlur')(e); lastPointer.current = null; },   // a pointer or key that never clicked names no later click
      onClick: (e) => {
        own('onClick')(e);
        const pointerType = lastPointer.current || (e.detail === 0 ? 'virtual' : 'mouse');
        lastPointer.current = null;
        if (!disabled) fire(e, pointerType);
      }
    };
    Object.keys(handlers).forEach((name) => { if (!nativeProps[name]) nativeProps[name] = handlers[name]; });
    return { pressed: false, pressProps: nativeProps };
  }

  const pressProps: PressProps = {
    onPointerDown: chain('onPointerDown', (e) => {
      if (e.button !== PRIMARY) return;
      const el = e.currentTarget;
      lastPointer.current = e.pointerType || 'mouse';
      start(lastPointer.current);
      // the release may happen anywhere: it ends the press; off the element it also cancels it (no click follows)
      const up = (u: PointerEvent) => {
        window.removeEventListener('pointerup', up, true); window.removeEventListener('pointercancel', up, true);
        if (u.type === 'pointercancel' || !el.contains(u.target as Node)) lastPointer.current = null;
        if (hold.current && hold.current.pointerType !== 'keyboard') end();
      };
      window.addEventListener('pointerup', up, true); window.addEventListener('pointercancel', up, true);
    }),
    onPointerUp: chain('onPointerUp', () => { if (hold.current && hold.current.pointerType !== 'keyboard') end(); }),
    onPointerCancel: chain('onPointerCancel', () => { if (hold.current) end(); lastPointer.current = null; }),
    onPointerLeave: chain('onPointerLeave', () => { if (hold.current && hold.current.pointerType !== 'keyboard') { hold.current.left = true; setPressed(false); } }),
    onPointerEnter: chain('onPointerEnter', (e) => { if (hold.current && hold.current.left && e.buttons! & 1) { hold.current.left = false; setPressed(true); } }),
    onKeyDown: chain('onKeyDown', (e) => {
      lastPointer.current = null;
      if (e.key === 'Escape' && key.current) { key.current = null; end(); return; }
      if (e.key === 'Enter' && !isLink(e.currentTarget)) {
        e.preventDefault();                       // the native button's own click would press twice
        if (e.repeat) return;
        start('keyboard'); fire(e, 'keyboard'); end();
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();                       // no page scroll, no native click
        if (e.repeat || key.current) return;
        key.current = ' ';
        start('keyboard');
      }
    }),
    onKeyUp: chain('onKeyUp', (e) => {
      if ((e.key === ' ' || e.key === 'Spacebar') && key.current) {
        e.preventDefault();
        key.current = null;
        fire(e, 'keyboard'); end();
      }
    }),
    onBlur: chain('onBlur', () => { if (key.current) { key.current = null; end(); } }),
    onClick: chain('onClick', (e) => {
      const pointerType = lastPointer.current;
      lastPointer.current = null;
      if (pointerType) { if (hold.current) end(); fire(e, pointerType); return; }
      if (e.detail === 0) fire(e, 'virtual');       // a click with no pointer and no key: assistive technology or a script
    })
  };
  // the caller's other handlers pass through untouched
  Object.keys(handlers).forEach((name) => { if (!pressProps[name]) pressProps[name] = handlers[name]; });
  return { pressed: !disabled && pressed, pressProps };
}
