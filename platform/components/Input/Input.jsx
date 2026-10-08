/* Plenix · Input, Textarea, Select
   Summary: The text field family, at the standard control height.
   Usage:
     <Input value={name} onChange={(e) => …} width="md" />
     <Textarea rows={5} value={notes} onChange={(e) => …} />
     <Select value={fmt} onChange={(e) => …} options={[{ value: 'png', label: 'PNG' }, { value: 'jpg', label: 'JPG' }]} />
   Props:
     Input.invalid: marks the field (aria-invalid); put the message in Field's error
     Input.width: "xs" | "sm" | "md" | "lg" (a field narrower than its row, --plx-sys-field-width-*)
     Input.data: the data font, for codes, hex values, links to copy (default false)
     Input.emphasis: semibold, for a record's title (default false)
     Input.type: the input type (default "text"); "color" gives the native color well (a pointer cursor; size it with width
       or a utility)
     Input.className: more classes on the <input>
     Textarea.invalid: marks the field (aria-invalid)
     Textarea.rows: the visible lines (default 3)
     Textarea.className: more classes on the <textarea>
     Select.invalid: marks the field (aria-invalid)
     Select.options: the choices: [{ value, label, disabled }]; or pass <option>s as children
     Select.children: <option>s, when there are no options
     Select.className: more classes on the wrapper
   Behavior:
     Inside a Field, the label, description and error are connected for you.
   Notes:
     They take every native attribute (value, onChange, placeholder, disabled, readOnly, required…).
     All three forward their ref to the native element.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';

export const Input = React.forwardRef(function Input({ invalid, width, data = false, emphasis = false, className, type = 'text', ...rest }, ref) {
  return <input ref={ref} type={type} className={cx('plx-input', width && 'plx-input--width-' + width, data && 'plx-input--data', emphasis && 'plx-input--emphasis', className)} aria-invalid={invalid || undefined} {...rest} />;
});

export const Textarea = React.forwardRef(function Textarea({ invalid, className, rows = 3, ...rest }, ref) {
  return <textarea ref={ref} rows={rows} className={cx('plx-input', 'plx-textarea', className)} aria-invalid={invalid || undefined} {...rest} />;
});

/* options: [{ value, label }] or children <option>s */
export const Select = React.forwardRef(function Select({ invalid, options, className, children, ...rest }, ref) {
  return (
    <span className={cx('plx-select', className)}>
      <select ref={ref} className="plx-input plx-select__control" aria-invalid={invalid || undefined} {...rest}>
        {options ? options.map((o) => <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>) : children}
      </select>
    </span>
  );
});
