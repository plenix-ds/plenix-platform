/* Plenix · QuickFilter
   Summary: An application's own shortcut beside Filter (owner, 2026-10-14): Category, Type, Tags or Date. An app that has
     categories or types shows its own button; otherwise not. The Filter panel still holds every possibility.
     kind "list" (Category, Type, Tags): a button that opens a searchable checklist of the field's values, shown as their
     pills (the GitHub labels style). kind "date" (Date): a button that opens presets (Any time, Last 7 days, Last 30 days,
     This year) and a custom range (the Google Analytics style).
   Usage:
     <QuickFilter label="Tags" icon="tags" noun="tag" options={tags} value={chosen} onChange={setChosen} />
     <QuickFilter kind="date" label="Modified" icon="calendar" value={range} onChange={setRange} />
   Props:
     kind: "list" (default) | "date"
     label: the button's words ("Category", "Type", "Tags", "Date")
     icon: its icon
     noun: (list) the word for one value, for the find field ("Find a tag")
     options: (list) the values: [{ value, label, color, count }] or strings; colors default to the category colors in order
     counts: optional Map (or object) from option value to faceted count; useCollectionView.quickProps supplies it
       An option's explicit count wins, including zero; without counts the existing labels remain unchanged
     value: (list) the chosen values; (date) { preset: "any" | "7" | "30" | "year" | "custom", from, to } (ISO dates)
     onChange(value): runs on every change
     inline: draws the panel alone (open, in a frame); default false
     strings: { find: "Find a {noun}", none: "No {noun} matches", clear: "Clear", presets: [{ value, label }…],
       custom: "Custom range", from: "From", to: "To" }
   Behavior:
     The button keeps its label; while it filters it takes the tint and a count badge (the chosen values; 1 for a date).
     The checklist's find field fills the panel (owner, 2026-10-14); each value is a checkbox with its pill. A date
     range typed by hand chooses Custom range. Clear (the panel's footer) empties it; it is disabled while nothing is
     chosen.
   Notes:
     The page applies the choice (useCollectionView, or matchesDate from utils/fields.js). */
import React from 'react';
import { Button } from '../../components/Button/Button.jsx';
import { Checkbox, RadioGroup } from '../../components/Checkbox/Checkbox.jsx';
import { Field } from '../../components/Field/Field.jsx';
import { Input } from '../../components/Input/Input.jsx';
import { SearchField } from '../../components/SearchField/SearchField.jsx';
import { Text } from '../../components/Text/Text.jsx';
import { Inline } from '../../components/Stack/Stack.jsx';
import { formatNumber } from '../../utils/format.js';
import { PanelTrigger, Pill, toggle, fill } from '../CommandBar/panel-parts.jsx';
import { DATE_PRESETS, CATEGORY_ORDER } from '../../utils/fields.js';

const STRINGS = { find: 'Find a {noun}', none: 'No {noun} matches', clear: 'Clear', presets: DATE_PRESETS, custom: 'Custom range', from: 'From', to: 'To' };
const asOptions = (options) => (options || []).map((o, i) => (typeof o === 'string' ? { value: o } : o)).map((o, i) => Object.assign({ label: o.value, color: CATEGORY_ORDER[i % CATEGORY_ORDER.length] }, o));

export function QuickFilter({ kind = 'list', label, icon, noun = 'value', options, value, onChange, counts, inline = false, strings }) {
  const t = Object.assign({}, STRINGS, strings);
  const [q, setQ] = React.useState('');
  const countOf = (o) => o.count !== undefined ? o.count : counts instanceof Map ? counts.get(o.value) || 0 : counts ? Object.prototype.hasOwnProperty.call(counts, o.value) ? counts[o.value] : 0 : undefined;
  const counted = (o, label) => { const n = countOf(o); return n === undefined || n === null ? label : <Inline as="span" gap="xs">{label}<Text variant="data">{formatNumber(n)}</Text></Inline>; };
  if (kind === 'date') {
    const d = Object.assign({ preset: 'any', from: '', to: '' }, value);
    const range = (k, v) => onChange(Object.assign({}, d, { preset: 'custom', [k]: v }));
    const on = d.preset && d.preset !== 'any';
    const body = (
      <div className="plx-find-panel plx-find-panel--date">
        <RadioGroup label={label} value={d.preset} onChange={(v) => onChange(Object.assign({}, d, { preset: v }))}
          options={t.presets.map((x) => ({ value: x.value, label: counted(x, x.label) })).concat({ value: 'custom', label: counted({ value: 'custom' }, t.custom) })} />
        <div className="plx-find-panel__range">
          <Field label={t.from}><Input type="date" data value={d.from} onChange={(e) => range('from', e.target.value)} /></Field>
          <Field label={t.to}><Input type="date" data value={d.to} onChange={(e) => range('to', e.target.value)} /></Field>
        </div>
      </div>
    );
    const footer = <Button size="sm" variant="ghost" icon="filter-off" disabled={!on} onClick={() => onChange({ preset: 'any', from: '', to: '' })}>{t.clear}</Button>;
    return <PanelTrigger icon={icon || 'calendar'} label={label} title={label} count={on ? 1 : 0} caret size="sm" footer={footer} inline={inline}>{body}</PanelTrigger>;
  }
  const list = asOptions(options), chosen = value || [];
  const shown = list.filter((o) => String(o.label).toLowerCase().indexOf(q.trim().toLowerCase()) >= 0);
  const body = (
    <div className="plx-find-panel plx-find-panel--checklist">
      <SearchField width="fill" value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} placeholder={fill(t.find, { noun })} label={fill(t.find, { noun })} />
      <div className="plx-find-panel__checklist">
        {shown.length ? shown.map((o) => <Checkbox key={o.value} label={counted(o, <Pill color={o.color}>{o.label}</Pill>)} checked={chosen.indexOf(o.value) >= 0} onChange={() => onChange(toggle(chosen, o.value))} />)
          : <Text variant="secondary">{fill(t.none, { noun })}</Text>}
      </div>
    </div>
  );
  const footer = <Button size="sm" variant="ghost" icon="filter-off" disabled={!chosen.length} onClick={() => onChange([])}>{t.clear}</Button>;
  return <PanelTrigger icon={icon} label={label} title={label} count={chosen.length} caret size="sm" footer={footer} inline={inline}>{body}</PanelTrigger>;
}
