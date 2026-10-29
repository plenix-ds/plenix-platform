/* Plenix · Checkbox, Radio, RadioGroup, ChoiceList, Switch
   Summary: Native choice inputs, so keyboard, forms and assistive technology work as usual.
   Usage:
     <Checkbox checked={on} onChange={(e) => …} label="Include subfolders" description="…" indeterminate={some} />
     <RadioGroup label="Format" value={fmt} onChange={(value) => …}
       options={[{ value: 'png', label: 'PNG', description: '…' }, { value: 'jpg', label: 'JPG' }]} layout="row" />
     <ChoiceList legend="Plan" value={plan} onChange={(value) => …} options={[{ value: 'team', label: 'Team', description: '…' }]} />
     <Switch checked={on} onChange={(e) => …} label="Notifications" />
   Props:
     Checkbox.label: the text beside the box
     Checkbox.description: a second line under the label
     Checkbox.indeterminate: shows the mixed state (default false)
     Checkbox.className: more classes on the row
     Checkbox.checked: whether the box is checked (passed to the <input>)
     Checkbox.onChange(event): runs when the box changes (passed to the <input>)
     Radio.label: the text beside the circle; without it there is no visible text
     Radio.description: a second line under the label
     Radio.className: more classes on the row
     RadioGroup.label: the legend of the group
     RadioGroup.name: the radio name (default a generated one)
     RadioGroup.value: the selected option value
     RadioGroup.onChange(value): runs with the chosen option value
     RadioGroup.options: the choices: [{ value, label, description, disabled }]
     RadioGroup.layout: "column" (default) | "row"
     RadioGroup.className: more classes on the <fieldset>
     ChoiceList.legend: the legend of the list
     ChoiceList.name: the radio name (default a generated one)
     ChoiceList.value: the selected option value
     ChoiceList.onChange(value): runs with the chosen option value
     ChoiceList.options: the choices, shown as cards with descriptions: [{ value, label, description, hidden }]
     ChoiceList.className: more classes on the <fieldset>
     Switch.label: the text beside the switch
     Switch.labelHidden: true hides the label and uses it as the accessible name (default false)
     Switch.className: more classes on the row
     Switch.checked: whether the switch is on (passed to the <input>)
     Switch.onChange(event): runs when the switch changes (passed to the <input>)
   Behavior:
     The whole row (control and label) is the target, at least the inline-action height.
     A Checkbox without label or description (a row's selection box) still has a 24px target (44px with touch): it extends
       invisibly past the 16px box (Platforms Standard 3.1).
     Switch is a checkbox with role="switch".
     The selected ChoiceList card shows the selected state.
   Notes:
     The Switch track is 36 × 20px and the knob 16px, centered: (track − knob) / 2.
     Checkbox, Radio and Switch pass other props (checked, onChange, name, value, disabled, …) and their ref to the <input>.
     RadioGroup and ChoiceList pass other props to the <fieldset>; their readOnly goes to each radio.
     Each is read-only by its own readOnly, else inside a read-only region (useReadOnly, providers/ReadOnly.jsx): it keeps its
       value and focus, a click or a change key does not change it, and Checkbox and Switch are marked aria-readonly.
     Writing direction (owner, ctm-needs-34): dir ("ltr" | "rtl") and lang ("ar", "en", …) on Checkbox, Radio and Switch go on
       the row (the <label>), so the box and its text change sides together; on RadioGroup and ChoiceList they go on the
       <fieldset>, so the legend and every option follow. An Arabic question can sit in an English page (and the reverse):
       <Fieldset dir="rtl" lang="ar" legend="بيانات الحضور"><RadioGroup … /><Checkbox label="…" /></Fieldset>.
       Use the dir attribute, never the CSS direction property: the :dir(rtl) rules answer only to the attribute.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useReadOnly, readOnlyProps } from '../../providers/ReadOnly.jsx';

export const Checkbox = React.forwardRef(function Checkbox({ label, description, indeterminate = false, className, readOnly, dir, lang, ...rest }, ref) {
  const locked = useReadOnly(readOnly);
  const inner = React.useRef(null);
  React.useImperativeHandle(ref, () => inner.current);
  React.useEffect(() => { if (inner.current) inner.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <label className={cx('plx-check', className)} dir={dir} lang={lang}>
      <input ref={inner} type="checkbox" className="plx-check__input" {...readOnlyProps(locked, rest)} />
      {label || description ? <span className="plx-check__text"><span className="plx-check__label">{label}</span>{description ? <span className="plx-check__description">{description}</span> : null}</span> : null}
    </label>
  );
});

export const Radio = React.forwardRef(function Radio({ label, description, className, readOnly, dir, lang, ...rest }, ref) {
  const locked = useReadOnly(readOnly);
  return (
    <label className={cx('plx-check', className)} dir={dir} lang={lang}>
      <input ref={ref} type="radio" className="plx-check__input" {...readOnlyProps(locked, rest, { aria: false })} />
      {label ? <span className="plx-check__text"><span className="plx-check__label">{label}</span>{description ? <span className="plx-check__description">{description}</span> : null}</span> : null}
    </label>
  );
});

export function RadioGroup({ label, name, value, onChange, options, layout = 'column', className, readOnly, ...rest }) {
  const auto = 'plx-r' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <fieldset className={cx('plx-radio-group', 'plx-radio-group--' + layout, className)} {...rest}>
      {label ? <legend className="plx-radio-group__legend">{label}</legend> : null}
      {options.map((o) => <Radio key={o.value} name={name || auto} value={o.value} label={o.label} description={o.description} checked={o.value === value} onChange={() => onChange(o.value)} disabled={o.disabled} readOnly={readOnly} />)}
    </fieldset>
  );
}

export function ChoiceList({ legend, name, value, onChange, options, className, readOnly, ...rest }) {
  const locked = useReadOnly(readOnly);
  const auto = 'plx-c' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <fieldset className={cx('plx-choice-list', className)} {...rest}>
      {legend ? <legend className="plx-choice-list__legend">{legend}</legend> : null}
      {options.map((o) => (
        <label key={o.value} className={cx('plx-choice', o.value === value && 'is-selected')} hidden={o.hidden || undefined}>
          <input type="radio" className="plx-choice__input" {...readOnlyProps(locked, { name: name || auto, value: o.value, checked: o.value === value, onChange: () => onChange(o.value) }, { aria: false })} />
          <span className="plx-choice__text"><span className="plx-choice__label">{o.label}</span>{o.description ? <span className="plx-choice__description">{o.description}</span> : null}</span>
        </label>
      ))}
    </fieldset>
  );
}

export const Switch = React.forwardRef(function Switch({ label, labelHidden = false, className, readOnly, dir, lang, ...rest }, ref) {
  const locked = useReadOnly(readOnly);
  return (
    <label className={cx('plx-switch', className)} dir={dir} lang={lang}>
      <input ref={ref} type="checkbox" role="switch" className="plx-switch__input" aria-label={labelHidden ? label : undefined} {...readOnlyProps(locked, rest)} />
      <span className="plx-switch__track" aria-hidden="true" />
      {label && !labelHidden ? <span className="plx-switch__label">{label}</span> : null}
    </label>
  );
});
