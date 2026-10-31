/* Plenix · useFocusable, useFocusGroup
   Summary: Focus for custom elements, the way native controls have it. useFocusable makes an element a Tab stop (or a
     focus target only) and tells whether its focus came from the keyboard (focus-visible), so the focus treatment shows
     for the keyboard and not after a click. useFocusGroup makes a group of controls one Tab stop whose items are reached
     with the arrow keys (roving focus: a toolbar, a list of options, a grid of tiles).
   Usage:
     const { focused, focusVisible, focusProps } = useFocusable();
     <div role="option" aria-selected={on} className={cx('plx-state', focusVisible && 'is-focus-visible')} {...focusProps}>…</div>
     const ref = React.useRef(null);
     const { groupProps } = useFocusGroup(ref, { orientation: 'vertical' });
     <div ref={ref} role="listbox" aria-label="Folders" {...groupProps}>{options}</div>
   Props:
     useFocusable(options).tabStop ("tab"): "tab" puts it in the Tab order (tabIndex 0); "target" makes it focusable
       only from code or a click (tabIndex -1, a skip-link target or a dialog's heading); "none" leaves tabIndex alone
       (a native control, or an item of a focus group, whose tabIndex the group sets)
     useFocusable(options).disabled (false): no Tab stop (an item that is disabled is skipped)
     useFocusable(options).onFocusChange(focused, visible): the focus changes
     useFocusable(options).handlers ({}): your own onFocus and onBlur; they run first
     useFocusable returns { focused, focusVisible, focusProps } (tabIndex, onFocus, onBlur)
     useFocusGroup(ref, options).orientation ("horizontal"): "horizontal" (Left and Right, in reading order),
       "vertical" (Up and Down) or "both" (all four arrows: a grid read in order)
     useFocusGroup(ref, options).loop (true): the last item's next is the first
     useFocusGroup(ref, options).items (a selector, or a function): which descendants are items; default the enabled buttons,
       links, inputs, selects and elements with a tabindex. A function () => elements returns the items itself, already
       filtered (a group that needs its own rules for hidden, disabled, nested or popup controls: Toolbar)
     useFocusGroup(ref, options).ignore(event): return true to leave a key to its target (a select's or an editable
       region's own keys, a popup's, a nested group's); runs after onKeyDown, before the group moves focus
     useFocusGroup(ref, options).modifiers (false): true moves focus when Alt, Ctrl or Meta is held too; by default a key with
       a modifier is left alone (browser and assistive-technology shortcuts)
     useFocusGroup(ref, options).onKeyDown(event): runs first; preventDefault stops the group's own key handling
     useFocusGroup returns { groupProps } (onKeyDown, onFocus) for the group element
   Behavior:
     focusVisible follows the browser's :focus-visible: true after Tab, an arrow key or focus moved by a keyboard command,
       false after a mouse click or a tap on a non-text element. A text field is always focus-visible (it shows its caret).
     A focus group has one Tab stop: the item focused last (else the first) has tabIndex 0 and the others -1 (the roving
       focus of utils/roving.ts), so Tab enters and leaves the group in one step. The arrows move to the next and previous
       items in reading order (right to left reverses Left and Right), Home and End to the first and last. In a text field
       Left and Right move the caret instead. Hidden items are skipped.
   Notes:
     Make only interactive elements focusable: a heading or a paragraph is not a Tab stop. A scroll area that holds no
       control is the exception: give it tabStop "tab" and a name (role="region" with aria-label) so the keyboard can
       scroll it.
     The focus treatment is the system's (Focus treatment, system/interaction.css): a ring on controls, the border color
       on fields; never remove it without the replacement.
*/
import React from 'react';
import { useRovingFocus, roveTo } from '../utils/roving.ts';
import { arrowStep } from '../utils/direction.ts';

const ITEMS = 'button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([disabled]):not([aria-disabled="true"])';

function isVisibleFocus(el) {
  try { return el.matches(':focus-visible'); } catch (e) { return true; }   // a browser without :focus-visible shows it always
}

export function useFocusable(options = {}) {
  const { tabStop = 'tab', disabled = false, onFocusChange, handlers = {} } = options;
  const [state, setState] = React.useState({ focused: false, visible: false });
  const set = (focused, visible) => {
    setState((s) => (s.focused === focused && s.visible === visible ? s : { focused, visible }));
    if (onFocusChange) onFocusChange(focused, visible);
  };
  const focusProps = {
    onFocus: (e) => { if (handlers.onFocus) handlers.onFocus(e); if (e.target === e.currentTarget) set(true, isVisibleFocus(e.currentTarget)); },
    onBlur: (e) => { if (handlers.onBlur) handlers.onBlur(e); if (e.target === e.currentTarget) set(false, false); }
  };
  if (tabStop !== 'none') focusProps.tabIndex = disabled ? undefined : tabStop === 'target' ? -1 : 0;
  return { focused: state.focused, focusVisible: state.focused && state.visible, focusProps };
}

export function useFocusGroup(ref, options = {}) {
  const { orientation = 'horizontal', loop = true, items: selector = ITEMS, onKeyDown, ignore, modifiers = false } = options;
  const itemsOf = () => (typeof selector === 'function' ? selector() : ref.current
    ? Array.prototype.filter.call(ref.current.querySelectorAll(selector), (el) => el.getClientRects().length > 0 && !el.closest('[hidden]'))
    : []);
  useRovingFocus(ref, itemsOf);
  const KEYS = orientation === 'vertical' ? ['ArrowUp', 'ArrowDown'] : orientation === 'both' ? ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'] : ['ArrowLeft', 'ArrowRight'];
  const groupProps = {
    onKeyDown: (e) => {
      if (onKeyDown) onKeyDown(e);
      if (e.defaultPrevented || (!modifiers && (e.altKey || e.ctrlKey || e.metaKey))) return;
      if (KEYS.indexOf(e.key) < 0 && e.key !== 'Home' && e.key !== 'End') return;
      const t = e.target;
      if ((t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Home' || e.key === 'End')) return;
      if (ignore && ignore(e)) return;
      const list = itemsOf();
      const i = list.indexOf(document.activeElement);
      if (i < 0 || !list.length) return;
      let n;
      if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = list.length - 1;
      else {
        const step = arrowStep(e, ref.current, { vertical: orientation !== 'horizontal' });
        if (!step) return;
        n = i + step;
        if (n < 0 || n >= list.length) { if (!loop) return; n = (n + list.length) % list.length; }
      }
      e.preventDefault();
      list[n].focus();
    },
    onFocus: (e) => { roveTo(ref, itemsOf(), e.target); }
  };
  return { groupProps };
}
