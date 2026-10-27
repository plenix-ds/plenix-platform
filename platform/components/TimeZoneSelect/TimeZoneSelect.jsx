/* Plenix · TimeZoneSelect
   Summary: A field for choosing a time zone (05 Forms › Date, time, and color › Time-zone selector): a combobox over
     every IANA time zone the browser knows (Intl.supportedValuesOf), each with its city, its region and its offset from
     UTC, filtered as people type a city, a region, a zone name ("Pacific") or an offset ("+5:30").
   Usage:
     <Field label="Time zone"><TimeZoneSelect value={zone} onChange={setZone} /></Field>
     <TimeZoneSelect label="Time zone" grouped={false} value={zone} onChange={setZone} />          // one list by offset
     <TimeZoneSelect label="Time zone" zones={['Europe/Berlin', 'America/New_York', 'Asia/Tokyo']} … />
     timeZoneOptions({ date })   // the options themselves: [{ value, label, region, offset, minutes, name }]
   Props:
     value: the chosen zone, an IANA name ("America/Los_Angeles")
     onChange(zone): runs with the chosen zone's IANA name
     grouped: list the zones under their region (Africa, Americas, Asia…), by city (default true); false lists them in
       one list ordered by offset, west to east
     Digits: in Arabic the offsets are written Arabic-Indic; typing Arabic-Indic digits finds the same zones (owner, arabic-digits-35)
     showOffset: each zone's offset from UTC ("UTC−08:00") at the end of its option and of the field (default true)
     zones: the IANA names to offer (default: every zone the browser supports, and UTC)
     date: the moment the offsets are for (default now): offsets change with daylight saving time
     placeholder: the hint in the empty field (default "Choose a time zone")
     label: the accessible name when there is no Field
     invalid: shows the invalid state
     disabled: the field cannot be used
     locale: the language of the zone names (default the page's language)
     strings: the words it shows and announces, for other languages: { placeholder, empty: "No matches", utc: "Coordinated
       Universal Time", other: "Other", results: (n) => n + " time zones", regions: { America: "Americas", … } }
     id: the id of the input (a Field sets it)
     className: more classes on the field
     ref: forwarded to the <input>; other props pass through to it
   Behavior:
     The list opens in the browser's top layer like the Combobox's: no dialog, drawer or scroll area clips it.
     The Combobox's behavior and look (its classes and tokens): the list opens on focus and on typing; ↓ and ↑ move,
     Enter chooses, Escape closes, a click outside closes. The active option stays in view.
     Typing filters by city, region, IANA name, the zone's long name in the reader's language and the offset; the number
       of matches is announced politely.
     Closed, the field shows the chosen city with its offset after it.
     A value the browser lists under another IANA name (Asia/Kolkata, listed as Asia/Calcutta) takes that zone’s place.
   Notes:
     Offsets are technical values: the data font (Reddit Mono). The city comes from the IANA name ("Buenos Aires, Argentina");
     the long name ("Pacific Standard Time") is only searched, never shown, so the list stays short.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { formatLocale } from '../../utils/format.js';
import { localDigits, toLatinDigits } from '../../utils/digits.js';
import { useDigits } from '../../providers/LocaleProvider.jsx';
import { Isolate } from '../Isolate/Isolate.jsx';
import { announce } from '../../utils/announce.jsx';
import { useFloating, FLOATING_ANCHOR } from '../../utils/floating.js';

// the top layer and CSS anchor positioning (as Menu, Popover, Select and Combobox), checked once
const TOP_LAYER = FLOATING_ANCHOR && typeof HTMLElement !== 'undefined' && Object.prototype.hasOwnProperty.call(HTMLElement.prototype, 'popover');

const STRINGS = {
  placeholder: 'Choose a time zone', empty: 'No matches', utc: 'Coordinated Universal Time', other: 'Other',
  results: (n) => n + (n === 1 ? ' time zone' : ' time zones'),
  regions: { Africa: 'Africa', America: 'Americas', Antarctica: 'Antarctica', Arctic: 'Arctic', Asia: 'Asia', Atlantic: 'Atlantic', Australia: 'Australia', Europe: 'Europe', Indian: 'Indian Ocean', Pacific: 'Pacific' }
};
// a few zones for browsers without Intl.supportedValuesOf
const FALLBACK = ['America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'America/Sao_Paulo', 'Europe/London', 'Europe/Paris', 'Europe/Berlin',
  'Africa/Cairo', 'Africa/Johannesburg', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Shanghai', 'Asia/Tokyo', 'Australia/Sydney', 'Pacific/Auckland'];
const MINUS = '−';

// the zone's offset from UTC at the date: minutes and "UTC−08:00"
function offsetOf(zone, date) {
  try {
    const part = new Intl.DateTimeFormat('en-US', { timeZone: zone, timeZoneName: 'longOffset' }).formatToParts(date).find((p) => p.type === 'timeZoneName');
    const m = /GMT([+-])(\d{2}):(\d{2})/.exec(part ? part.value : '');
    if (!m) return { minutes: 0, text: 'UTC±00:00' };
    const minutes = (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]));
    return { minutes, text: 'UTC' + (m[1] === '-' ? MINUS : '+') + m[2] + ':' + m[3] };
  } catch (e) { return { minutes: 0, text: 'UTC±00:00' }; }
}
function longName(zone, date, locale) {
  try { const p = new Intl.DateTimeFormat(locale, { timeZone: zone, timeZoneName: 'long' }).formatToParts(date).find((x) => x.type === 'timeZoneName'); return p ? p.value : ''; } catch (e) { return ''; }
}

export function timeZoneOptions({ zones, date = new Date(), locale, strings } = {}) {
  const t = Object.assign({}, STRINGS, strings);
  const regions = Object.assign({}, STRINGS.regions, t.regions);
  const lang = locale || formatLocale();
  const all = zones || (typeof Intl.supportedValuesOf === 'function' ? Intl.supportedValuesOf('timeZone') : FALLBACK);
  const list = all.indexOf('UTC') >= 0 || zones ? all : ['UTC'].concat(all);
  return list.map((zone) => {
    const parts = zone.split('/');
    const utc = zone === 'UTC' || parts[0] === 'Etc';
    const region = utc ? t.other : regions[parts[0]] || (parts.length > 1 ? parts[0] : t.other);
    const label = zone === 'UTC' ? t.utc : parts.length > 1 ? parts.slice(1).reverse().join(', ').replace(/_/g, ' ') : zone.replace(/_/g, ' ');
    const off = offsetOf(zone, date);
    return { value: zone, label, region, offset: off.text, minutes: off.minutes, name: longName(zone, date, lang) };
  });
}

// the search text: an offset typed as "+5", "-08", "5:30" or "utc+1" matches "UTC+05:00"
const fold = (s) => toLatinDigits(String(s)).toLowerCase().replace(/[−–]/g, '-').replace(/_/g, ' ');
const offsetKeys = (o) => { const sign = o.minutes < 0 ? '-' : '+', a = Math.abs(o.minutes), h = Math.floor(a / 60), m = a % 60;
  return [fold(o.offset), sign + h, sign + String(h).padStart(2, '0'), sign + h + ':' + String(m).padStart(2, '0'), 'utc' + sign + h, 'gmt' + sign + h].join(' '); };

export const TimeZoneSelect = React.forwardRef(function TimeZoneSelect({ value, onChange, grouped = true, showOffset = true, zones, date, placeholder,
  label, invalid, disabled, locale, strings, id, className, ...rest }, ref) {
  const t = Object.assign({}, STRINGS, strings);
  const digits = useDigits();
  const auto = 'plx-tz' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const listId = auto + '-list';
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [active, setActive] = React.useState(0);
  const wrap = React.useRef(null), input = React.useRef(null), list = React.useRef(null);
  // the list opens in the top layer, placed against the field by the floating layer (flips up near an edge, follows scroll and resize): no dialog, drawer or scroll area clips it
  useFloating(wrap, list, { open: open, placement: 'bottom-start', matchWidth: true });
  React.useLayoutEffect(() => { const el = list.current; if (open && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); }, [open]);
  React.useImperativeHandle(ref, () => input.current);
  const day = date ? new Date(date).toDateString() : new Date().toDateString();
  const zoneKey = zones ? zones.join('|') : '';
  // the options for the day (offsets change with daylight saving time), sorted: by region then city, or by offset
  const options = React.useMemo(() => {
    const at = date ? new Date(date) : new Date();
    const out = timeZoneOptions({ zones, date: at, locale, strings });
    // a value the browser lists under another name (Asia/Kolkata, listed as Asia/Calcutta) takes that zone's place
    if (value && !out.some((o) => o.value === value)) {
      let canonical = null;
      try { canonical = new Intl.DateTimeFormat('en-US', { timeZone: value }).resolvedOptions().timeZone; } catch (e) { canonical = null; }
      if (canonical) {
        const own = timeZoneOptions({ zones: [value], date: at, locale, strings })[0];
        const i = out.findIndex((o) => o.value === canonical);
        if (i >= 0) out[i] = own; else out.push(own);
      }
    }
    out.forEach((o) => { o.search = [fold(o.label), fold(o.region), fold(o.value), fold(o.name), offsetKeys(o)].join(' '); });
    const byName = (a, b) => a.label.localeCompare(b.label, locale || formatLocale());
    return grouped
      ? out.sort((a, b) => (a.region === t.other) - (b.region === t.other) || a.region.localeCompare(b.region) || byName(a, b))
      : out.sort((a, b) => a.minutes - b.minutes || byName(a, b));
  }, [day, zoneKey, locale, grouped, value]);   // eslint-disable-line react-hooks/exhaustive-deps
  const current = options.find((o) => o.value === value) || null;
  const q = fold(text.trim());
  const shown = q ? options.filter((o) => q.split(/\s+/).every((w) => o.search.indexOf(w) >= 0)) : options;
  React.useEffect(() => { if (open && q) announce(t.results(shown.length)); }, [q, open]);   // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (!open) return undefined;
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) { setOpen(false); setText(''); } };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  // opening starts on the chosen zone; typing starts on the first match
  React.useEffect(() => { if (open) setActive(q ? 0 : Math.max(0, shown.findIndex((o) => o.value === value))); }, [q, open]);   // eslint-disable-line react-hooks/exhaustive-deps
  const optId = (i) => auto + '-o' + i;
  React.useEffect(() => {
    if (!open || !list.current) return;
    const el = list.current.querySelector('#' + optId(active));
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }, [active, open]);   // eslint-disable-line react-hooks/exhaustive-deps
  const choose = (o) => { if (!o) return; if (onChange) onChange(o.value); setText(''); setOpen(false); };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); else setActive((a) => Math.min(shown.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Home' && open && !text) { e.preventDefault(); setActive(0); }
    else if (e.key === 'End' && open && !text) { e.preventDefault(); setActive(shown.length - 1); }
    else if (e.key === 'Enter') { if (open && shown[active]) { e.preventDefault(); choose(shown[active]); } }
    else if (e.key === 'Escape') { if (open) { e.preventDefault(); setOpen(false); setText(''); } }
  };
  return (
    <div ref={wrap} className={cx('plx-combobox', 'plx-time-zone-select', open && 'is-open', disabled && 'is-disabled', className)}>
      <div className="plx-combobox__field plx-input" aria-invalid={invalid || undefined}>
        <input ref={input} id={id} className="plx-combobox__input" role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list"
          aria-activedescendant={open && shown[active] ? optId(active) : undefined} aria-label={label} disabled={disabled} autoComplete="off"
          aria-description={current && showOffset ? localDigits(current.offset, { digits }) : undefined}
          value={open ? text : (current ? current.label : '')} placeholder={current && open ? current.label : (placeholder || t.placeholder)}
          onChange={(e) => { setText(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey} {...rest} />
        {showOffset && current && !open ? <span className="plx-time-zone-select__field-offset" aria-hidden="true"><Isolate>{current.offset}</Isolate></span> : null}
        <span className="plx-combobox__chevron" aria-hidden="true" />
      </div>
      {open ? (
        <ul ref={list} className="plx-combobox__list plx-time-zone-select__list" id={listId} role="listbox" aria-label={label} popover={TOP_LAYER ? 'manual' : undefined} onMouseDown={(e) => e.preventDefault()}>
          {shown.length ? shown.map((o, i) => [
            grouped && (i === 0 || shown[i - 1].region !== o.region) ? <li key={'g-' + o.region} className="plx-combobox__group" role="presentation">{o.region}</li> : null,
            <li key={o.value} id={optId(i)} role="option" aria-selected={o.value === value}
              className={cx('plx-combobox__option', 'plx-time-zone-select__option', i === active && 'is-active', o.value === value && 'is-selected')}
              onMouseDown={(e) => e.preventDefault()} onClick={() => choose(o)} onMouseEnter={() => setActive(i)}>
              <span className="plx-time-zone-select__city">{o.label}</span>
              {showOffset ? <span className="plx-time-zone-select__offset"><Isolate>{o.offset}</Isolate></span> : null}
            </li>])
            : <li className="plx-combobox__empty" role="presentation">{t.empty}</li>}
        </ul>
      ) : null}
    </div>
  );
});
