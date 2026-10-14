/* Plenix · Input, Textarea, Select
   Summary: The text field family, at the standard control height.
   Usage:
     <Input value={name} onChange={(e) => …} width="md" />
     <Textarea rows={5} value={notes} onChange={(e) => …} />
     <Select value={fmt} onChange={(e) => …} options={[{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }]} />
     <Input appearance="underline" … />            <Textarea autoGrow … />
   Props:
     Input.invalid: marks the field (aria-invalid); put the message in Field's error
     Input.width: "xs" | "sm" | "md" | "lg" (a field narrower than its row, --plx-sys-field-width-*)
     Input.data: the data font, for codes, hex values, links to copy (default false)
     Input.emphasis: semibold, for a record's title (default false)
     Input.type: the input type (default "text"); "color" gives the color well: a square swatch the field's height, no border
       (owner, batch 275); the system sizes it, so it takes no width or utility
     Input.inputMode, autoComplete, enterKeyHint, autoCapitalize, spellCheck: the on-screen keyboard and autofill hints
       (Platforms Standard 3.5 and 6.2); a type of "email", "url", "tel" or "search" brings its matching defaults (below)
     Input.appearance: "outline" (default; a border on every side) | "filled" (the neutral fill with a line under it, square
       bottom corners) | "underline" (only the line under it, no fill, no corners); one appearance per form
     Input.className: more classes on the <input>
     Textarea.invalid: marks the field (aria-invalid)
     Textarea.rows: the visible lines (default 3); an autoGrow text area starts at its minimum height and grows from there
     Textarea.autoGrow: grows with its text, a line at a time, up to --plx-comp-textarea-auto-grow-max-height, then
       scrolls inside; it cannot be resized by hand (default false)
     Textarea.appearance: as Input.appearance
     Textarea.className: more classes on the <textarea>
     Select.invalid: marks the field (aria-invalid)
     Select.options: the choices: [{ value, label, disabled }]; or pass <option>s as children
     Select.children: <option>s, when there are no options
     Select.appearance: as Input.appearance (on the <select>)
     Select.className: more classes on the wrapper
   Behavior:
     Inside a Field, the label, description and error are connected for you.
     Every appearance keeps the same states: hover, focus and invalid change only the color of its border (the line
     under a filled or underline field), never a ring outside it; read-only and disabled keep their fills.
     autoGrow: the browser sizes the text area to its content (field-sizing: content); where it cannot, the text area
     measures its content on each change and sets its height on the 4px grid (gridPx), the one inline style it writes.
     Keyboard hints by type, each overridden by its own prop: email and url get their inputMode, no capitals and no spell
     check; tel gets inputMode "tel"; search gets inputMode "search" and enterKeyHint "search".
   Notes:
     They take every native attribute (value, onChange, placeholder, disabled, readOnly, required…).
     All three forward their ref to the native element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { gridPx } from '../../utils/grid.js';

// the keyboard a type brings on a touch screen (Platforms Standard 3.5: the right type, inputmode and autocomplete)
const TYPE_HINTS = {
  email: { inputMode: 'email', autoCapitalize: 'off', spellCheck: false },
  url: { inputMode: 'url', autoCapitalize: 'off', spellCheck: false },
  tel: { inputMode: 'tel' },
  search: { inputMode: 'search', enterKeyHint: 'search' },
};

// the appearance class (outline is the base look: no class)
const look = (appearance) => (appearance === 'filled' || appearance === 'underline') && 'plx-input--' + appearance;

export const Input = React.forwardRef(function Input({ invalid, width, data = false, emphasis = false, appearance, className, type = 'text', ...rest }, ref) {
  return <input ref={ref} type={type} className={cx('plx-input', width && 'plx-input--width-' + width, data && 'plx-input--data', emphasis && 'plx-input--emphasis', look(appearance), className)} aria-invalid={invalid || undefined} {...TYPE_HINTS[type]} {...rest} />;
});

// can the browser size a text area to its content? (field-sizing: Chrome 123, Safari 26)
const SIZES_ITSELF = typeof CSS !== 'undefined' && !!CSS.supports && CSS.supports('field-sizing', 'content');

export const Textarea = React.forwardRef(function Textarea({ invalid, appearance, autoGrow = false, className, rows = 3, onInput, ...rest }, ref) {
  const own = React.useRef(null);
  const setRef = React.useCallback((el) => { own.current = el; if (typeof ref === 'function') ref(el); else if (ref) ref.current = el; }, [ref]);
  // the fallback: measure the content and set the height on the grid (the stylesheet caps it at the maximum)
  const fit = React.useCallback(() => {
    const el = own.current;
    if (!el || !autoGrow || SIZES_ITSELF) return;
    el.style.blockSize = '';
    const edge = el.offsetHeight - el.clientHeight;
    el.style.blockSize = gridPx(el.scrollHeight + edge, { round: 'up', el });
  }, [autoGrow]);
  React.useLayoutEffect(() => { fit(); });
  return <textarea ref={setRef} rows={rows} className={cx('plx-input', 'plx-textarea', autoGrow && 'plx-textarea--auto-grow', look(appearance), className)} aria-invalid={invalid || undefined}
    onInput={(e) => { fit(); if (onInput) onInput(e); }} {...rest} />;
});

/* options: [{ value, label }] or children <option>s */
export const Select = React.forwardRef(function Select({ invalid, options, appearance, className, children, ...rest }, ref) {
  return (
    <span className={cx('plx-select', className)}>
      <select ref={ref} className={cx('plx-input', 'plx-select__control', look(appearance))} aria-invalid={invalid || undefined} {...rest}>
        {options ? options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>) : children}
      </select>
    </span>
  );
});
