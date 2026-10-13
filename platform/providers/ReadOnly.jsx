/* Plenix · ReadOnly, ReadOnlyProvider, useReadOnly
   Summary: A read-only region: everything people could change inside it shows its value and cannot be changed, while
     it stays readable, focusable, selectable and copyable (unlike disabled). A record someone may view but not edit, a
     form that is locked after it was submitted, a setting an administrator controls.
   Usage:
     <ReadOnly reason="Set by your administrator">…fields…</ReadOnly>                         // a region
     <ReadOnly as="form" readOnly={!canEdit} onSubmit={save}>…</ReadOnly>                    // a whole form
     <Field label="Asset ID"><Input value={id} readOnly /></Field>                              // one field: its own prop
     const readOnly = useReadOnly(props.readOnly);                                              // a component adopting it
   Props:
     ReadOnly.as ("div"): the element: "div", "section", "form" or "fieldset"
     ReadOnly.readOnly (true): false makes the region editable again (a nested editable part of a read-only page)
     ReadOnly.reason: why it cannot be changed, shown first in the region with the lock icon and tied to it as its
       description (aria-describedby)
     ReadOnly.className: more classes on the element
     ReadOnly.children: the content; ...rest: other attributes go on the element
     ReadOnlyProvider.readOnly (true): the value the components inside read with useReadOnly, without the region's
       behavior (a component that draws its own read-only state)
     useReadOnly(own): the component's own readOnly prop when it is given, else the nearest region's (false outside one)
   Behavior:
     The region carries data-plx-readonly="true" (system/read-only.css draws its controls: the sunken surface, the quiet
       border, the arrow pointer). Inside it, text fields and text areas become readOnly (the value can be selected,
       copied and focused); checkboxes, switches, radios, selects and sliders keep their value and take focus, but a
       click, Space, the arrow keys or typing do not change them, and they are marked aria-readonly where the role allows
       it. A form inside a read-only region does not submit. Content editable text stops being editable.
     Controls added later are covered as they appear; making the region editable again (or removing it) gives every
       control back exactly what it had.
     A nested <ReadOnly readOnly={false}> is left alone by the outer region.
   Notes:
     Read-only is not disabled: use disabled for a control that is not available now (it leaves the Tab order and dims);
       read-only for a value that is there to read. Hide or remove the actions that would change the region (Save,
       Delete) rather than disabling them.
     Buttons inside stay as they are: actions that only read (Copy, Download, Open) keep working.
*/
import React from 'react';
import { useDescriptionId, joinIds } from '../utils/describedBy.js';
import { Icon } from '../components/Icon/Icon.jsx';
import { Text } from '../components/Text/Text.jsx';
import { Inline } from '../components/Stack/Stack.jsx';

export const ReadOnlyContext = React.createContext(false);

export function ReadOnlyProvider({ readOnly = true, children }) {
  return <ReadOnlyContext.Provider value={!!readOnly}>{children}</ReadOnlyContext.Provider>;
}

export function useReadOnly(own) {
  const ctx = React.useContext(ReadOnlyContext);
  return own === undefined || own === null ? ctx : !!own;
}

// what the region may lock: the controls whose value a person changes
const CONTROLS = 'input,textarea,select,[contenteditable="true"],[contenteditable=""],[role="checkbox"],[role="switch"],[role="radio"],[role="slider"],[role="spinbutton"],[role="combobox"]';
const NOT_VALUES = { button: 1, submit: 1, reset: 1, image: 1, hidden: 1, file: 0 };
const TEXT_TYPES = /^(text|search|email|url|tel|password|number|date|datetime-local|month|week|time)$/;
// roles that may carry aria-readonly (WAI-ARIA 1.2); a radio's group carries it instead
const ARIA_READONLY = { checkbox: 1, switch: 1, slider: 1, spinbutton: 1, combobox: 1, listbox: 1, textbox: 1, radiogroup: 1 };
// keys that change a locked control's value (Tab, Escape and shortcuts with Ctrl or ⌘ still work)
const CHANGE_KEYS = /^(ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End|PageUp|PageDown| |Spacebar|Enter|Backspace|Delete|.)$/;

function roleOf(el) {
  const r = el.getAttribute('role');
  if (r) return r;
  if (el.tagName === 'SELECT') return el.multiple ? 'listbox' : 'combobox';
  if (el.tagName === 'INPUT') return el.type === 'checkbox' ? 'checkbox' : el.type === 'radio' ? 'radio' : el.type === 'range' ? 'slider' : 'textbox';
  return 'textbox';
}

// locks one control; returns what to undo, or null when it is not a value control or is already read-only by its owner
function lock(el) {
  if (el.hasAttribute('data-plx-readonly-set')) return null;
  const tag = el.tagName;
  if (tag === 'INPUT' && NOT_VALUES[el.type]) return null;
  if (el.getAttribute('contenteditable') === 'true' || el.getAttribute('contenteditable') === '') {
    el.setAttribute('contenteditable', 'false'); el.setAttribute('data-plx-readonly-set', 'editable');
    return () => { el.setAttribute('contenteditable', 'true'); el.removeAttribute('data-plx-readonly-set'); };
  }
  if (tag === 'TEXTAREA' || (tag === 'INPUT' && TEXT_TYPES.test(el.type))) {
    if (el.readOnly) return null;
    el.readOnly = true; el.setAttribute('data-plx-readonly-set', 'readonly');
    return () => { el.readOnly = false; el.removeAttribute('data-plx-readonly-set'); };
  }
  // a choice, a select or a slider: the value stays, changes are stopped by the region's listeners
  const role = roleOf(el);
  const aria = ARIA_READONLY[role] && !el.hasAttribute('aria-readonly');
  if (aria) el.setAttribute('aria-readonly', 'true');
  el.setAttribute('data-plx-readonly-set', 'locked');
  return () => { if (aria) el.removeAttribute('aria-readonly'); el.removeAttribute('data-plx-readonly-set'); };
}

// the region's behavior: locks its controls (and the ones added later), stops the events that would change them
function useLockRegion(ref, on) {
  React.useEffect(() => {
    const root = ref.current;
    if (!root || !on) return undefined;
    const undo = new Map();
    const mine = (el) => el.closest('[data-plx-readonly]') === root;
    const apply = () => {
      root.querySelectorAll(CONTROLS).forEach((el) => { if (!undo.has(el) && mine(el)) { const u = lock(el); if (u) undo.set(el, u); } });
    };
    apply();
    const observer = typeof MutationObserver !== 'undefined' ? new MutationObserver(apply) : null;
    if (observer) observer.observe(root, { childList: true, subtree: true });
    const locked = (t) => {
      const el = t && t.closest ? t.closest('[data-plx-readonly-set="locked"]') : null;
      return el && mine(el) ? el : null;
    };
    const stop = (e) => { e.preventDefault(); e.stopPropagation(); };
    const onClick = (e) => { if (locked(e.target)) stop(e); };
    const onKey = (e) => {
      if (e.key === 'Tab' || e.key === 'Escape' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (locked(e.target) && CHANGE_KEYS.test(e.key)) stop(e);
    };
    const onPointer = (e) => { const el = locked(e.target); if (el && (el.tagName === 'SELECT' || roleOf(el) === 'slider' || roleOf(el) === 'combobox')) { e.preventDefault(); el.focus(); } };
    const onSubmit = (e) => { if (e.target === root || mine(e.target)) e.preventDefault(); };
    root.addEventListener('click', onClick, true);
    root.addEventListener('keydown', onKey, true);
    root.addEventListener('mousedown', onPointer, true);
    root.addEventListener('pointerdown', onPointer, true);
    root.addEventListener('submit', onSubmit, true);
    return () => {
      if (observer) observer.disconnect();
      root.removeEventListener('click', onClick, true);
      root.removeEventListener('keydown', onKey, true);
      root.removeEventListener('mousedown', onPointer, true);
      root.removeEventListener('pointerdown', onPointer, true);
      root.removeEventListener('submit', onSubmit, true);
      undo.forEach((u) => u());
    };
  }, [ref, on]);
}

export const ReadOnly = React.forwardRef(function ReadOnly({ as = 'div', readOnly = true, reason, className, children, ...rest }, ref) {
  const own = React.useRef(null);
  const setRef = (el) => { own.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; };
  const on = !!readOnly;
  useLockRegion(own, on);
  const reasonId = useDescriptionId('read-only');
  const Tag = ['div', 'section', 'form', 'fieldset'].indexOf(as) >= 0 ? as : 'div';
  return (
    <ReadOnlyContext.Provider value={on}>
      <Tag ref={setRef} data-plx-readonly={on ? 'true' : 'false'} className={className} {...rest}
        aria-describedby={joinIds(rest['aria-describedby'], on && reason ? reasonId : null)}>
        {on && reason ? (
          <Inline gap="xs">
            <Icon name="lock" size="sm" />
            <Text variant="secondary" id={reasonId}>{reason}</Text>
          </Inline>
        ) : null}
        {children}
      </Tag>
    </ReadOnlyContext.Provider>
  );
});
