/* Plenix · SegmentedControl
   Summary: One choice from a few short options, shown together (S | M | L; Light | Dark | System): a bordered group of
     joined segments at the button height; the chosen one is tinted blue with blue text and icon (look A, owner, 2026-10-14).
     It sets a value (a radio group).
   Usage:
     <SegmentedControl label="Theme" value={theme} onChange={setTheme}
       options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }, { value: 'system', label: 'System' }]} />
   Props:
     options: the choices, in order: [{ value, label, icon, ariaLabel }]
     options[].icon: an icon name; optional
     options[].ariaLabel: the accessible name of an icon-only option; default its value
     value: the chosen value
     onChange(value): runs when another option is chosen
     label: the group's accessible name
     size: "md" (default) | "sm"
     className: more classes on the group
     ...rest: other attributes go on the group element
   Behavior:
     Arrow keys move to the next or previous option and choose it, wrapping around; Home and End go to the first and last.
     Only the chosen option is in the Tab order.
   Notes:
     To switch between panels of content, use Tabs (variant "segmented").
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { arrowStep } from '../../utils/direction.js';
import { cx } from '../../utils/cx.js';
import { stateIcon } from '../Icon/Icon.jsx';

export function SegmentedControl({ options, value, onChange, label, size = 'md', className, ...rest }) {
  devWarn('SegmentedControl', { size }, { size: ['md','sm'] });
  const refs = React.useRef([]);
  const index = Math.max(0, options.findIndex((o) => o.value === value));
  const move = (e, i) => {
    let n = null;
    const step = arrowStep(e, e.currentTarget);   // in reading order: right to left reverses Left and Right (batch 213)
    if (step > 0) n = (i + 1) % options.length;
    if (step < 0) n = (i - 1 + options.length) % options.length;
    if (e.key === 'Home') n = 0;
    if (e.key === 'End') n = options.length - 1;
    if (n === null) return;
    e.preventDefault(); onChange(options[n].value); if (refs.current[n]) refs.current[n].focus();
  };
  return (
    <div role="radiogroup" aria-label={label} className={cx('plx-segmented', size === 'sm' && 'plx-segmented--sm', className)} {...rest}>
      {options.map((o, i) => (
        <button key={o.value} ref={(el) => { refs.current[i] = el; }} type="button" role="radio" aria-checked={o.value === value} tabIndex={i === index ? 0 : -1}
          aria-label={o.icon && !o.label ? o.ariaLabel || String(o.value) : undefined}
          className={cx('plx-segmented__item', size === 'sm' && 'plx-segmented__item--sm', o.value === value && 'is-selected')} onClick={() => onChange(o.value)} onKeyDown={(e) => move(e, i)}>
          {o.icon ? stateIcon(o.icon, o.value === value) : null}{o.label ? <span>{o.label}</span> : null}
        </button>
      ))}
    </div>
  );
}
