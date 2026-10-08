/* Plenix · Slider
   Summary: A value picked from a range by dragging.
   Usage:
     <Slider label="Brightness" value={v} min={0} max={100} step={1} unit="%" onChange={(v) => …} onCommit={(v) => …} />
   Props:
     label: the label above the track
     value: the current value, a number
     min: the lowest value; default 0
     max: the highest value; default 100
     step: the step between values; default 1
     unit: text after the value ("%"); default ""
     onChange(value): follows every move (live preview)
     onCommit(value): runs when the person lets go or finishes with the keys (record the change, e.g. in an undo history)
     disabled: default false
     className: more classes on the slider
     ...rest: other attributes go on the range input
   Behavior:
     It is a native range input, so keys work: arrows, Page Up/Down, Home, End.
     The label and the current value sit above the track.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useUid } from '../../utils/layer.js';

export function Slider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange, onCommit, disabled = false, className, ...rest }) {
  const id = useUid('plx-slider');
  return (
    <div className={cx('plx-slider', className)}>
      <div className="plx-slider__head">
        <label htmlFor={id} className="plx-slider__label">{label}</label>
        <output htmlFor={id} className="plx-slider__value">{value + unit}</output>
      </div>
      <input id={id} type="range" className="plx-slider__input" min={min} max={max} step={step} value={value} disabled={disabled}
        aria-valuetext={value + unit} onChange={(e) => onChange && onChange(Number(e.target.value))}
        onPointerUp={(e) => onCommit && onCommit(Number(e.currentTarget.value))}
        onKeyUp={(e) => { if (onCommit && /Arrow|Page|Home|End/.test(e.key)) onCommit(Number(e.currentTarget.value)); }} {...rest} />
    </div>
  );
}
