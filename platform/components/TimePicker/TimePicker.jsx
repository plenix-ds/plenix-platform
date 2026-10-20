/* Plenix · TimePicker
   Summary: A time of day, typed or chosen: a field with a list of times at a set step (the default), or segments for the
     hour, the minute and, on a 12-hour clock, AM or PM. It follows the reader's clock (12 or 24 hours); the time is in the
     data font.
   Usage:
     <Field label="Start time"><TimePicker value={start} onChange={setStart} /></Field>
     <TimePicker step={30} min="08:00" max="18:00" value={t} onChange={setT} label="Meeting" />
     <TimePicker variant="segments" hourCycle="24" value={t} onChange={setT} label="Alarm" />
   Props:
     width: "xs" | "sm" | "md" | "lg" (the field-width scale, --plx-sys-field-width-*: pick by what it holds) | "fill" (the whole
       width); without a pattern sizing it, the field is never wider than its container (P-52, owner 2026-10-19)
     value: the time as "HH:MM" on a 24-hour clock ("14:30"), or "" for none; the same whatever clock is shown
     defaultValue: the time it starts with, uncontrolled
     onChange(value): runs with the new "HH:MM" (or "" when cleared)
     variant: "list" (default: a field people type in, with the times at each step in a list under it) | "segments"
       (spin buttons for the hour, the minute and the period)
     hourCycle: "12" | "24": the clock shown; default the reader's locale's clock
     step: the minutes between times in the list, and the minute segment's step (default 15 for the list, 1 for segments);
       a value that divides 60 (5, 10, 15, 30)
     min, max: the earliest and the latest time ("HH:MM"); the list holds only times between them
     label: the accessible name when there is no Field (the group's name with segments)
     invalid: the invalid state (the border in the danger color); a Field with an error sets it
     disabled: the field cannot be used
     id: the id of the input, or of the first segment (a Field sets it)
     name: submits the "HH:MM" value with a form (a hidden input)
     strings: the words it shows and announces, for other languages: { hour: "Hour", minute: "Minute", period: "AM or
       PM", am: "AM", pm: "PM", times: "Times", empty: "--" }
     className: more classes on the picker
   Behavior:
     List: the field is a combobox; typing a time in almost any form ("2", "2pm", "2:30 pm", "14:30", "1430") and leaving
       the field or pressing Enter sets it, written back in the reader's format; text that is not a time puts the last
       time back. Arrow Down opens the list on the time nearest the value; Arrow Up and Down move, Enter chooses, Escape
       closes, Page Up and Down move an hour.
     Segments: one spin button per part (Tab moves between them, and so do Arrow Left and Right): Arrow Up and Down step
       it (the minute by step), Home and End go to its first and last value, digits type it (two digits move on to the next
       segment), A and P set the period, Backspace clears it. The value changes once every segment is filled.
     Times outside min and max are not offered and are brought back inside when typed.
   Notes:
     For a date and a time together, place a date picker beside it. For a duration, use a number input with a unit.
     Show the time zone in the description when people in several zones use the data.
*/
import React from 'react';
import { devWarn } from '../../utils/devWarn.js';
import { cx } from '../../utils/cx.js';
import { formatLocale } from '../../utils/format.js';

const STRINGS = { hour: 'Hour', minute: 'Minute', period: 'AM or PM', am: 'AM', pm: 'PM', times: 'Times', empty: '--' };
const pad = (n) => String(n).padStart(2, '0');
const toMin = (v) => { const m = /^(\d{1,2}):(\d{2})$/.exec(v || ''); return m ? (+m[1]) * 60 + (+m[2]) : null; };
const fromMin = (n) => pad(Math.floor(n / 60) % 24) + ':' + pad(n % 60);
const localeCycle = () => {
  try { const o = new Intl.DateTimeFormat(formatLocale(), { hour: 'numeric' }).resolvedOptions(); return o.hourCycle === 'h11' || o.hourCycle === 'h12' || o.hour12 ? '12' : '24'; }
  catch (e) { return '12'; }
};
// "2", "2pm", "2:30 pm", "14:30", "1430", "230p" → minutes after midnight, or null
export const parseTime = (text, cycle) => {
  const s = String(text || '').trim().toLowerCase().replace(/\./g, '');
  if (!s) return null;
  const m = /^(\d{1,2})(?::?(\d{2}))?\s*(a|am|p|pm)?$/.exec(s);
  if (!m) return null;
  let h = +m[1]; const min = m[2] ? +m[2] : 0; const p = m[3] ? m[3][0] : null;
  if (min > 59) return null;
  if (p) { if (h < 1 || h > 12) return null; h = h % 12 + (p === 'p' ? 12 : 0); }
  else if (h > 23) return null;
  else if (cycle === '12' && h >= 1 && h <= 6 && !m[2]) h += 12;   // "2" on a 12-hour clock means the afternoon
  return h * 60 + min;
};
const show = (mins, cycle, t) => {
  if (mins === null) return '';
  const h = Math.floor(mins / 60), m = mins % 60;
  return cycle === '12' ? ((h % 12) || 12) + ':' + pad(m) + ' ' + (h < 12 ? t.am : t.pm) : pad(h) + ':' + pad(m);
};

export const TimePicker = React.forwardRef(function TimePicker({ value, defaultValue = '', onChange, variant = 'list', hourCycle, step, min, max, label, width,
  invalid, disabled, id, name, strings, className, ...rest }, ref) {
  devWarn('TimePicker', { variant }, { variant: ['list','segments'] });
  const t = Object.assign({}, STRINGS, strings);
  const cycle = hourCycle ? String(hourCycle) : localeCycle();
  const [own, setOwn] = React.useState(defaultValue);
  const current = value !== undefined ? value : own;
  const lo = toMin(min) !== null ? toMin(min) : 0, hi = toMin(max) !== null ? toMin(max) : 24 * 60 - 1;
  const clamp = (n) => Math.min(hi, Math.max(lo, n));
  const commit = (mins) => {
    const v = mins === null ? '' : fromMin(clamp(mins));
    if (value === undefined) setOwn(v);
    if (onChange && v !== current) onChange(v);
  };
  const cls = cx('plx-time-picker', 'plx-time-picker--' + variant, width && 'plx-time-picker--width-' + width, disabled && 'is-disabled', className);
  const hidden = name ? <input type="hidden" name={name} value={current || ''} /> : null;
  if (variant === 'segments') return <Segments ref={ref} {...{ t, cycle, step: step || 1, current, commit, lo, hi, label, invalid, disabled, id, cls, hidden, rest }} />;
  return <ListPicker ref={ref} {...{ t, cycle, step: step || 15, current, commit, lo, hi, label, invalid, disabled, id, cls, hidden, rest }} />;
});

const ListPicker = React.forwardRef(function ListPicker({ t, cycle, step, current, commit, lo, hi, label, invalid, disabled, id, cls, hidden, rest }, ref) {
  const auto = 'plx-tp' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState(null);   // the text while typing; null shows the value
  const [active, setActive] = React.useState(0);
  const wrap = React.useRef(null), input = React.useRef(null), list = React.useRef(null);
  React.useImperativeHandle(ref, () => input.current);
  const times = [];
  for (let n = Math.ceil(lo / step) * step; n <= hi; n += step) times.push(n);
  const mins = toMin(current);
  const nearest = (n) => { if (n === null || !times.length) return 0; let best = 0; times.forEach((x, i) => { if (Math.abs(x - n) < Math.abs(times[best] - n)) best = i; }); return best; };
  const openAt = (n) => { setActive(nearest(n)); setOpen(true); };
  React.useEffect(() => {
    if (!open) return undefined;
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  React.useEffect(() => {
    if (!open || !list.current) return;
    const o = list.current.querySelector('[data-plx-index="' + active + '"]');
    if (o && o.scrollIntoView) o.scrollIntoView({ block: 'nearest' });
  }, [open, active]);
  const settle = () => {
    if (text === null) return;
    const n = text.trim() ? parseTime(text, cycle) : null;
    if (n !== null || !text.trim()) commit(n);
    setText(null);
  };
  const choose = (i) => { commit(times[i]); setText(null); setOpen(false); };
  const onKey = (e) => {
    const perHour = Math.max(1, Math.round(60 / step));
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) openAt(text !== null ? parseTime(text, cycle) : mins); else setActive((a) => Math.min(times.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (!open) openAt(mins); else setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'PageDown' && open) { e.preventDefault(); setActive((a) => Math.min(times.length - 1, a + perHour)); }
    else if (e.key === 'PageUp' && open) { e.preventDefault(); setActive((a) => Math.max(0, a - perHour)); }
    else if (e.key === 'Enter') { if (open && text === null && times[active] !== undefined) { e.preventDefault(); choose(active); } else { settle(); setOpen(false); } }
    else if (e.key === 'Escape') { if (open) { e.preventDefault(); setOpen(false); } else if (text !== null) { e.preventDefault(); setText(null); } }
  };
  const optId = (i) => auto + '-o' + i;
  return (
    <div ref={wrap} className={cls}>
      <div className="plx-time-picker__field plx-input" aria-invalid={invalid || undefined}>
        <input ref={input} id={id} className="plx-time-picker__input" role="combobox" aria-expanded={open} aria-controls={auto + '-list'} aria-autocomplete="none"
          aria-activedescendant={open && times[active] !== undefined ? optId(active) : undefined} aria-label={label} disabled={disabled} autoComplete="off" inputMode="text"
          value={text !== null ? text : show(mins, cycle, t)} placeholder={cycle === '12' ? '9:00 ' + t.am : '09:00'}
          onChange={(e) => { setText(e.target.value); const n = parseTime(e.target.value, cycle); if (n !== null) setActive(nearest(n)); }}
          onBlur={() => { settle(); }} onClick={() => { if (!open && !disabled) openAt(mins); }} onKeyDown={onKey} {...rest} />
        <span className="plx-time-picker__icon" aria-hidden="true" />
      </div>
      {open ? (
        <ul ref={list} className="plx-time-picker__list" id={auto + '-list'} role="listbox" aria-label={label ? label + ', ' + t.times : t.times}>
          {times.map((n, i) => (
            <li key={n} id={optId(i)} data-plx-index={i} role="option" aria-selected={n === mins}
              className={cx('plx-time-picker__option', i === active && 'is-active', n === mins && 'is-selected')}
              onMouseDown={(e) => e.preventDefault()} onClick={() => choose(i)} onMouseEnter={() => setActive(i)}>{show(n, cycle, t)}</li>
          ))}
        </ul>
      ) : null}
      {hidden}
    </div>
  );
});

const Segments = React.forwardRef(function Segments({ t, cycle, step, current, commit, lo, hi, label, invalid, disabled, id, cls, hidden, rest }, ref) {
  const mins = toMin(current);
  // the parts being edited: hour on the clock shown (1–12 or 0–23), minute, period ('am' | 'pm'); null = empty
  const fromValue = () => (mins === null ? { h: null, m: null, p: null }
    : { h: cycle === '12' ? (Math.floor(mins / 60) % 12) || 12 : Math.floor(mins / 60), m: mins % 60, p: Math.floor(mins / 60) < 12 ? 'am' : 'pm' });
  const [parts, setParts] = React.useState(fromValue);
  const typed = React.useRef('');
  React.useEffect(() => { setParts(fromValue()); }, [current, cycle]);
  const refs = [React.useRef(null), React.useRef(null), React.useRef(null)];
  React.useImperativeHandle(ref, () => refs[0].current);
  const segs = cycle === '12' ? ['h', 'm', 'p'] : ['h', 'm'];
  const update = (next) => {
    setParts(next);
    const full = next.h !== null && next.m !== null && (cycle !== '12' || next.p !== null);
    if (full) { const h24 = cycle === '12' ? (next.h % 12) + (next.p === 'pm' ? 12 : 0) : next.h; commit(h24 * 60 + next.m); }
    else if (next.h === null && next.m === null && (cycle !== '12' || next.p === null)) commit(null);
  };
  const range = { h: cycle === '12' ? [1, 12] : [0, 23], m: [0, 59] };
  const move = (i) => { const el = refs[Math.max(0, Math.min(segs.length - 1, i))].current; if (el) el.focus(); };
  const onKey = (k, i) => (e) => {
    if (disabled) return;
    const n = Object.assign({}, parts);
    const wrapAround = (v, d, a, b, s) => { const span = b - a + 1; return ((((v === null ? (d > 0 ? a - s : b + 1) : v) - a + d * s) % span) + span) % span + a; };
    if (e.key === 'ArrowLeft') { e.preventDefault(); move(i - 1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); move(i + 1); return; }
    if (k === 'p') {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); n.p = n.p === 'am' ? 'pm' : 'am'; update(n); }
      else if (/^[ap]$/i.test(e.key)) { e.preventDefault(); n.p = e.key.toLowerCase() === 'a' ? 'am' : 'pm'; update(n); }
      else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); n.p = null; update(n); }
      return;
    }
    const [a, b] = range[k], s = k === 'm' ? step : 1;
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); typed.current = ''; n[k] = wrapAround(n[k], e.key === 'ArrowUp' ? 1 : -1, a, b, s); if (k === 'm') n.m = Math.floor(n.m / s) * s; update(n); }
    else if (e.key === 'Home') { e.preventDefault(); n[k] = a; update(n); }
    else if (e.key === 'End') { e.preventDefault(); n[k] = k === 'm' ? Math.floor(b / s) * s : b; update(n); }
    else if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); typed.current = ''; n[k] = null; update(n); }
    else if (/^\d$/.test(e.key)) {
      e.preventDefault();
      const tryText = typed.current + e.key;
      let v = +tryText;
      if (v > b) { v = +e.key; typed.current = e.key; } else typed.current = tryText;
      n[k] = v; update(n);
      if (typed.current.length >= 2 || v * 10 > b) { typed.current = ''; move(i + 1); }
    }
  };
  const lbl = { h: t.hour, m: t.minute, p: t.period };
  const text = (k) => (parts[k] === null ? t.empty : k === 'p' ? (parts.p === 'am' ? t.am : t.pm) : k === 'h' && cycle === '12' ? String(parts.h) : pad(parts[k]));
  return (
    <div className={cls}>
      <div role="group" aria-label={label} className="plx-time-picker__field plx-time-picker__segments plx-input" aria-invalid={invalid || undefined} {...rest}>
        {segs.map((k, i) => (
          <React.Fragment key={k}>
            {k === 'm' ? <span className="plx-time-picker__separator" aria-hidden="true">:</span> : null}
            <span ref={refs[i]} id={i === 0 ? id : undefined} role="spinbutton" tabIndex={disabled ? -1 : 0} aria-label={lbl[k]} aria-disabled={disabled || undefined}
              aria-invalid={invalid || undefined}
              aria-valuemin={k === 'p' ? undefined : range[k][0]} aria-valuemax={k === 'p' ? undefined : range[k][1]}
              aria-valuenow={k === 'p' || parts[k] === null ? undefined : parts[k]} aria-valuetext={parts[k] === null ? undefined : text(k)}
              className={cx('plx-time-picker__segment', k === 'p' && 'plx-time-picker__segment--period', parts[k] === null && 'is-empty')}
              onKeyDown={onKey(k, i)} onBlur={() => { typed.current = ''; }}>{text(k)}</span>
          </React.Fragment>
        ))}
        <span className="plx-time-picker__icon" aria-hidden="true" />
      </div>
      {hidden}
    </div>
  );
});
