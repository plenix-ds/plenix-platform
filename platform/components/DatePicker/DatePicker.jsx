/* Plenix · DatePicker
   Summary: A field for a date that people type in their locale's numeric form or choose from a Calendar in a popover:
     one date, a range of two (a start and an end, with two months side by side), or a date with a time (the time field
     beside it, with the time zone). Optional presets (Today, Last 7 days) choose common values in one press. The value is
     in the data font (Reddit Mono).
   Usage:
     <Field label="Due date" description="MM/DD/YYYY"><DatePicker value={due} onChange={setDue} /></Field>
     <Field label="Period"><DatePicker mode="range" value={period} onChange={setPeriod} presets /></Field>
     <Field label="Starts"><DatePicker mode="date-time" value={starts} onChange={setStarts} min={todayIso()} /></Field>
   Props:
     width: "xs" | "sm" | "md" | "lg" (the field-width scale, --plx-sys-field-width-*: pick by what it holds) | "fill" (the whole
       width); without a pattern sizing it, the field is never wider than its container (P-52, owner 2026-10-19)
     mode: "single" (default; one date) | "range" (a start and an end) | "date-time" (a date and a time: one moment)
     value: "YYYY-MM-DD" (single), { start, end } of such dates (range), or "YYYY-MM-DDTHH:MM" (date-time); null when
       empty. Controlled with onChange
     defaultValue: the first value of an uncontrolled field
     onChange(value): runs with the new value when a date is chosen, a preset is pressed, or typed text is read (when the
       field is left or Enter is pressed); null when the field is emptied
     presets: true (the built-in presets of the mode: Today, Tomorrow, In a week; or Last 7 days, Last 30 days, This month,
       Last month) or a list [{ label, value }] (value in the mode's form); shown beside the calendar (default none)
     months: the months the calendar shows: 1 or 2 (default 2 for a range, else 1)
     min, max: the first and last date that can be chosen ("YYYY-MM-DD"); typed dates outside them are not taken
     isDateDisabled(date): true for a date that cannot be chosen (Calendar's)
     weekNumbers: the calendar shows the week numbers (default false)
     defaultTime: the time a date-time value takes when only its date is chosen ("HH:MM", default "09:00")
     timeZoneName: the time zone shown after the time ("short", default: "EDT"; false: none)
     invalid: the danger border and aria-invalid (a Field with an error sets it)
     disabled: turns the field and its button off
     required: handed to the date field (a Field sets it)
     id: handed to the date field, with aria-describedby (a Field sets both)
     locale: the locale of the typed form, the names and the first day of the week (default: the page's language)
     strings: the words it shows and announces; default: the locale's datePicker words from the catalog (platform/i18n: English, Arabic), through LocaleProvider; this prop wins: { open: "Choose date", dialog: "Choose date",
       time: "Time", presets: "Presets", today: "Today", tomorrow: "Tomorrow", nextWeek: "In a week", last7: "Last 7 days",
       last30: "Last 30 days", thisMonth: "This month", lastMonth: "Last month", calendar: {…Calendar's strings} }
     className: more classes on the date picker
     ref: forwarded to the date <input>
   Behavior:
     The field takes the locale's numeric date (10/15/2026 in en-US, 15.10.2026 in de-DE) and also YYYY-MM-DD; its
       placeholder shows the form (MM/DD/YYYY). A range is two dates with a dash between them. Typed text is read when the
       field is left or Enter is pressed: a date it cannot read, or one that cannot be chosen, leaves the text and marks
       the field invalid until it is corrected; the Field's error says what to fix.
     The field is one box like the text field (owner, form-controls-37): the date input and a 16px calendar icon button inside
       it at its end; a range and a date-time picker look the same, the time field beside it. The calendar opens in a popover 4px
       under the field.
     The calendar button (or Alt+Arrow Down in the field) opens the calendar in a popover under the field, with focus on
       the chosen day (else today); choosing a day (a range: its end) or a preset closes it and returns focus to the field.
       Escape, a press outside, and Tab out of it close it too.
     Range: the first day chosen is the start, the second the end; until the end is chosen, the days between are shown
       as the range as the pointer or the keys move.
     Date-time: the time field (the browser's own, typed or stepped) sits beside the date with the time zone after it;
       choosing a date keeps the time, or takes defaultTime.
   Notes:
     The date field is as wide as its form (wider for a range) and the time field as wide as a time with its zone
       (--plx-comp-date-picker-*-width).
     The value is a calendar date (no time zone moves it); a date-time value is a local wall-clock time, and the time zone
       shown says which.
     A date people know by heart (a birth date) is typed: give it no calendar (use Input).
     Built on Popover (manual) and Calendar; the date-time's time field is an InputGroup.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { formatLocale, numeralLocale } from '../../utils/format.js';
import { Button } from '../Button/Button.jsx';
import { Input } from '../Input/Input.jsx';
import { InputGroup } from '../InputGroup/InputGroup.jsx';
import { Popover } from '../Popover/Popover.jsx';
import { Calendar, parseIsoDate, addDays, addMonths, todayIso } from '../Calendar/Calendar.jsx';
import CalendarIcon from 'plenix-platform/icons/plenix/calendar';
import { useStrings } from '../../providers/LocaleProvider.jsx';

const DASH = ' – ';

// the locale's numeric date: its parts in order ("month", "day", "year") and the form people read ("MM/DD/YYYY")
function numericForm(locale) {
  const f = new Intl.DateTimeFormat(locale, { year: 'numeric', month: '2-digit', day: '2-digit' });
  const parts = f.formatToParts(new Date(2026, 9, 15, 12));
  return {
    format: (iso) => { const d = parseIsoDate(iso); return d ? f.format(d) : ''; },
    order: parts.filter((p) => p.type === 'day' || p.type === 'month' || p.type === 'year').map((p) => p.type),
    hint: parts.map((p) => (p.type === 'day' ? 'DD' : p.type === 'month' ? 'MM' : p.type === 'year' ? 'YYYY' : p.value)).join(''),
  };
}
// typed text to "YYYY-MM-DD" (or null): the locale's numeric order, or year first (2026-10-15)
function readDate(text, order) {
  const n = String(text || '').match(/\d+/g);
  if (!n || n.length !== 3) return null;
  let y, m, d;
  if (n[0].length === 4) { y = +n[0]; m = +n[1]; d = +n[2]; }
  else { const at = {}; order.forEach((k, i) => { at[k] = +n[i]; }); y = at.year; m = at.month; d = at.day; }
  if (y < 100) y += 2000;
  const iso = String(y).padStart(4, '0') + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
  return parseIsoDate(iso) ? iso : null;
}
const zoneOf = (locale, style) => {
  try { const p = new Intl.DateTimeFormat(locale, { timeZoneName: style }).formatToParts(new Date()).find((x) => x.type === 'timeZoneName'); return p ? p.value : ''; } catch (e) { return ''; }
};
const monthBounds = (iso, n) => { const first = addMonths(iso.slice(0, 7) + '-01', n); return { start: first, end: addDays(addMonths(first, 1), -1) }; };

export const DatePicker = React.forwardRef(function DatePicker({ mode = 'single', value, defaultValue, onChange, presets, months, min, max, width,
  isDateDisabled, weekNumbers = false, defaultTime = '09:00', timeZoneName = 'short', invalid, disabled, required, id,
  'aria-describedby': describedBy, locale: localeProp, strings, className, ...rest }, ref) {
  const t = useStrings('datePicker', strings);   // the locale's words (platform/i18n), with the strings prop on top
  const locale = numeralLocale(localeProp || formatLocale());
  const form = numericForm(locale);
  const range = mode === 'range', dateTime = mode === 'date-time';
  const [own, setOwn] = React.useState(defaultValue !== undefined ? defaultValue : null);
  const current = value !== undefined ? value : own;
  const commit = (v) => { if (value === undefined) setOwn(v); if (onChange) onChange(v); };
  // the parts of the value: the date (or range) and the time
  const datePart = dateTime ? (current ? String(current).slice(0, 10) : null) : current;
  const timePart = dateTime && current ? String(current).slice(11, 16) : '';
  const show = (v) => (range ? (v && v.start ? form.format(v.start) + (v.end ? DASH + form.format(v.end) : '') : '') : form.format(v));
  const [text, setText] = React.useState(show(datePart));
  const [bad, setBad] = React.useState(false);
  const typing = React.useRef(false);
  React.useEffect(() => { if (!typing.current) { setText(show(datePart)); setBad(false); } }, [range ? JSON.stringify(datePart) : datePart, locale]);
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState(null);   // a range while its end is still open
  const root = React.useRef(null), input = React.useRef(null), day = React.useRef(null);
  React.useImperativeHandle(ref, () => input.current);
  const allowed = (iso) => !((min && iso < min) || (max && iso > max) || (isDateDisabled && isDateDisabled(iso)));
  const withTime = (iso) => (iso ? iso + 'T' + (timePart || defaultTime) : null);
  const setDate = (d) => commit(dateTime ? withTime(d) : d);

  // typed text, read when the field is left or Enter is pressed
  const read = () => {
    typing.current = false;
    const s = text.trim();
    if (!s) { setBad(false); if (datePart) setDate(null); return; }
    if (range) {
      const two = s.split(/\s*(?:–|—|\s-\s|\bto\b)\s*/);
      const a = readDate(two[0], form.order), b = two[1] ? readDate(two[1], form.order) : null;
      if (!a || (two[1] && !b) || !allowed(a) || (b && !allowed(b))) { setBad(true); return; }
      const next = b && b < a ? { start: b, end: a } : { start: a, end: b };
      setBad(false); setText(show(next)); commit(next);
      return;
    }
    const iso = readDate(s, form.order);
    if (!iso || !allowed(iso)) { setBad(true); return; }
    setBad(false); setText(form.format(iso)); setDate(iso);
  };
  const close = (refocus) => { setOpen(false); setDraft(null); if (refocus && input.current) input.current.focus(); };
  const toggle = () => { if (open) close(true); else { setDraft(range ? (datePart || { start: null, end: null }) : null); setOpen(true); } };
  // a press outside, or focus leaving the field and its calendar, closes the calendar
  React.useEffect(() => {
    if (!open) return undefined;
    const outside = (e) => { if (root.current && !root.current.contains(e.target)) close(false); };
    document.addEventListener('mousedown', outside);
    return () => document.removeEventListener('mousedown', outside);
  }, [open]);
  const onBlur = (e) => { if (open && e.relatedTarget && root.current && !root.current.contains(e.relatedTarget)) close(false); };

  const choose = (v) => {
    if (range) {
      setDraft(v);
      if (v.start && v.end) { commit(v); setText(show(v)); setBad(false); close(true); }
      return;
    }
    setDate(v); setText(form.format(v)); setBad(false); close(true);
  };
  const today = todayIso();
  const builtIn = range
    ? [{ label: t.last7, value: { start: addDays(today, -6), end: today } }, { label: t.last30, value: { start: addDays(today, -29), end: today } },
      { label: t.thisMonth, value: monthBounds(today, 0) }, { label: t.lastMonth, value: monthBounds(today, -1) }]
    : [{ label: t.today, value: today }, { label: t.tomorrow, value: addDays(today, 1) }, { label: t.nextWeek, value: addDays(today, 7) }];
  const presetList = presets === true ? builtIn : Array.isArray(presets) ? presets : null;
  const pick = (p) => {
    const v = dateTime && typeof p.value === 'string' ? p.value.slice(0, 10) : p.value;
    if (range) { commit(v); setText(show(v)); } else { setDate(v); setText(form.format(v)); }
    setBad(false); close(true);
  };

  const zone = dateTime && timeZoneName ? zoneOf(locale, timeZoneName) : '';
  const shown = range ? (draft || datePart || { start: null, end: null }) : datePart;
  const firstMonth = (range ? (shown && shown.start) : shown) || undefined;
  const field = (
    <div className="plx-date-picker__field">
      <div className={cx('plx-date-picker__date', range && 'plx-date-picker__date--range', 'plx-input', 'plx-input--data', disabled && 'is-disabled')} aria-invalid={(invalid || bad) || undefined}
        onMouseDown={(e) => { if (!disabled && input.current && e.target !== input.current && !e.target.closest('button')) { e.preventDefault(); input.current.focus(); } }}>
        <input ref={input} id={id} type="text" className="plx-date-picker__input" value={text} placeholder={range ? form.hint + DASH + form.hint : form.hint} required={required}
          aria-describedby={describedBy} aria-invalid={(invalid || bad) || undefined} disabled={disabled} autoComplete="off"
          onChange={(e) => { typing.current = true; setText(e.target.value); if (bad) setBad(false); }}
          onBlur={read}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { read(); }
            else if (e.key === 'ArrowDown' && e.altKey) { e.preventDefault(); if (!open) toggle(); }
          }} />
        <Button variant="ghost" size="2xs" iconOnly icon={CalendarIcon} className="plx-date-picker__button" label={t.open} expanded={open} aria-haspopup="dialog" disabled={disabled} onClick={toggle} />
      </div>
      {dateTime ? (
        <InputGroup data suffix={zone || undefined} disabled={disabled} invalid={invalid} className="plx-date-picker__time">
          <Input type="time" data aria-label={t.time} value={timePart} disabled={disabled}
            onChange={(e) => { const v = e.target.value; if (datePart) commit(datePart + 'T' + (v || defaultTime)); }} />
        </InputGroup>
      ) : null}
    </div>
  );
  return (
    <div ref={root} className={cx('plx-date-picker', 'plx-date-picker--' + (range ? 'range' : dateTime ? 'date-time' : 'single'), width && 'plx-date-picker--width-' + width, className)} onBlur={onBlur} {...rest}>
      <Popover anchorClassName="plx-date-picker__anchor" trigger={field} triggerOn="manual" open={open} onOpenChange={(v) => { if (!v) close(true); }} label={t.dialog} size="auto"
        placement="bottom-start" focusOnOpen initialFocus={day} sheetOnNarrow={false}>
        <div className={cx('plx-date-picker__panel', presetList && 'plx-date-picker__panel--presets')}>
          {presetList ? (
            <div role="group" aria-label={t.presets} className="plx-date-picker__presets">
              {presetList.map((p) => <Button key={p.label} variant="ghost" size="sm" className="plx-date-picker__preset" onClick={() => pick(p)}>{p.label}</Button>)}
            </div>
          ) : null}
          <Calendar mode={range ? 'range' : 'single'} value={shown} onChange={choose} months={months || (range ? 2 : 1)} defaultMonth={firstMonth ? firstMonth.slice(0, 7) : undefined}
            min={min} max={max} isDateDisabled={isDateDisabled} weekNumbers={weekNumbers} locale={locale} focusRef={day} label={t.dialog} strings={t.calendar} />
        </div>
      </Popover>
    </div>
  );
});

// the locale's numeric date form ("MM/DD/YYYY"), for a Field's description
DatePicker.formatHint = (locale) => numericForm(locale || formatLocale()).hint;
