/* Plenix · Field
   Summary: A label, the control, and its help or error, connected for assistive technology.
   Usage:
     <Field label="Name" description="Shown on the asset" error={msg} required info={<…/>} layout="inline">
       <Input …/>
     </Field>
   Props:
     label: the label text
     description: help text under the control (under the label with "row")
     error: the error message under the control; it marks the field invalid
     required: marks the field and the control required; the label shows " *" (default false)
     info: content for a small (i) button next to the label
     infoLabel: the accessible name of the (i) button (default "About " + the label)
     layout: "stacked" (default; label above) | "inline" (label beside the control: settings rows, a 160px label column) |
       "row" (the description under the label and the control at the end)
     labelWidth: the width of the label column, as a size name (adds plx-field--label-<value>)
     type, inputMode, autoComplete, enterKeyHint: keyboard and autofill hints handed to the control (Platforms Standard 3.5),
       unless it sets its own
     children: exactly one control
     className: more classes on the field
   Behavior:
     The child control gets id, aria-describedby, invalid and required, unless it sets its own.
     The error is announced (role="alert").
     The (i) button shows and hides the info text under the control (aria-expanded).
   Notes:
     Other props pass through to the <div>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useTruncated } from '../../utils/overflow.js';
import { Tooltip } from '../Tooltip/Tooltip.jsx';

export function Field({ label, description, error, required = false, info, infoLabel, layout = 'stacked', labelWidth, type, inputMode, autoComplete, enterKeyHint, className, children, ...rest }) {
  const id = React.useId();
  const controlId = 'plx-f' + id.replace(/[^a-zA-Z0-9]/g, '');
  const descId = description ? controlId + '-d' : undefined, errId = error ? controlId + '-e' : undefined;
  const [showInfo, setShowInfo] = React.useState(false);
  const labelRef = React.useRef(null);
  const cut = useTruncated(labelRef);
  const child = React.Children.only(children);
  const props = {
    id: child.props.id || controlId,
    'aria-describedby': [child.props['aria-describedby'], descId, errId].filter(Boolean).join(' ') || undefined,
    invalid: child.props.invalid !== undefined ? child.props.invalid : (error ? true : undefined),
    required: child.props.required !== undefined ? child.props.required : (required || undefined),
  };
  // keyboard hints given on the Field reach the control, unless it has its own
  const hints = { type, inputMode, autoComplete, enterKeyHint };
  Object.keys(hints).forEach((k) => { if (hints[k] !== undefined && child.props[k] === undefined) props[k] = hints[k]; });
  const control = React.cloneElement(child, props);
  return (
    <div className={cx('plx-field', 'plx-field--' + layout, labelWidth && 'plx-field--label-' + labelWidth, error && 'is-invalid', className)} {...rest}>
      <div className="plx-field__head">
        <Tooltip content={label} disabled={!cut} className="plx-field__label-tip">
          <label ref={labelRef} className="plx-field__label" htmlFor={child.props.id || controlId}>{label}{required ? <span className="plx-field__required" aria-hidden="true"> *</span> : null}</label>
        </Tooltip>
        {info ? <button type="button" className="plx-field__info" aria-label={infoLabel || 'About ' + label} aria-expanded={showInfo} onClick={() => setShowInfo(!showInfo)}>i</button> : null}
        {layout === 'row' && description ? <div className="plx-field__description" id={descId}>{description}</div> : null}
      </div>
      <div className="plx-field__control">
        {control}
        {layout !== 'row' && description ? <div className="plx-field__description" id={descId}>{description}</div> : null}
        {error ? <div className="plx-field__error" id={errId} role="alert">{error}</div> : null}
        {info && showInfo ? <div className="plx-field__info-text">{info}</div> : null}
      </div>
    </div>
  );
}
