/* Plenix · FilterBar
   Summary: A row of filters above a list or grid; each filter opens a menu of choices.
   Usage:
     <FilterBar label="Filters"
       filters={[{ id: 'type', label: 'Type', options: [{ value: 'png', label: 'PNG', count: 12 }], value: ['png'], multiple: true }]}
       onChange={(id, value) => …} onClearAll={() => …} actions={<…/>} />
   Props:
     label: the accessible name of the row of filters
     filters: the filters, in order: [{ id, label, options: [{ value, label, count }], value, multiple }]
     filters[].multiple: true: value is an array of option values and the menu stays open while choosing; false: value is one option value (or null) and choosing closes the menu
     onChange(id, value): runs when a filter's value changes
     onClearAll(): runs from "Clear all"; without it there is no "Clear all"
     actions: controls at the end of the row (a sort menu, a view switch)
     className: more classes on the row
   Behavior:
     A filter with a value shows it in its button ("Type: PNG", or "Type · 2" for several) and the selected state.
     Filters that do not fit on the row move into a "More filters" menu: the same choices, grouped by filter.
     "Clear all" appears when any filter is set.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { useOverflow, splitAt } from '../../utils/overflow.js';
import { Button } from '../../components/Button/Button.jsx';
import { Menu, MenuItem, MenuGroup, MenuDivider } from '../../components/Menu/Menu.jsx';

const isSet = (f) => (f.multiple ? (f.value || []).length > 0 : f.value !== null && f.value !== undefined && f.value !== '');
const summary = (f) => {
  if (!isSet(f)) return f.label;
  if (f.multiple) {
    const v = f.value;
    if (v.length > 1) return f.label + ' · ' + v.length;
    const o = f.options.find((x) => x.value === v[0]);
    return f.label + ': ' + (o ? o.label : v[0]);
  }
  const o = f.options.find((x) => x.value === f.value);
  return f.label + ': ' + (o ? o.label : f.value);
};

function choices(f, onChange) {
  return f.options.map((o) => {
    const on = f.multiple ? (f.value || []).indexOf(o.value) >= 0 : f.value === o.value;
    const pick = () => {
      if (f.multiple) onChange(f.id, on ? f.value.filter((v) => v !== o.value) : (f.value || []).concat(o.value));
      else onChange(f.id, on ? null : o.value);
    };
    return (
      <MenuItem key={o.value} checked={on} keepOpen={!!f.multiple} onSelect={pick}>
        {o.label}{o.count !== undefined ? <span className="plx-filter-bar__count">{o.count}</span> : null}
      </MenuItem>
    );
  });
}

export function FilterBar({ label = 'Filters', filters, onChange, onClearAll, actions, className }) {
  const list = React.useRef(null);
  const fit = useOverflow(list, filters.length, filters.map(summary).join('|'));
  const hidden = filters.slice(fit);
  const anySet = filters.some(isSet);
  return (
    <div role="group" aria-label={label} className={cx('plx-filter-bar', className)}>
      <div ref={list} className="plx-filter-bar__filters">
        {splitAt(filters.map((f) => (
          <span key={f.id} data-plx-overflow-item="" className="plx-filter-bar__slot">
            <Menu label={f.label} trigger={<Button size="sm" caret selected={isSet(f)}>{summary(f)}</Button>}>
              {choices(f, onChange)}
            </Menu>
          </span>
        )), fit, hidden.length ? (
          <span key="plx-more" data-plx-overflow-more="" className="plx-filter-bar__slot">
            <Menu label="More filters" placement="bottom-end" trigger={<Button size="sm" caret selected={hidden.some(isSet)}>{'More filters'}</Button>}>
              {hidden.map((f, i) => (
                <React.Fragment key={f.id}>
                  {i ? <MenuDivider /> : null}
                  <MenuGroup label={f.label}>{choices({ ...f, multiple: true, value: f.multiple ? f.value : (isSet(f) ? [f.value] : []) }, (id, v) => onChange(id, f.multiple ? v : (v.filter((x) => x !== f.value)[0] || null)))}</MenuGroup>
                </React.Fragment>
              ))}
            </Menu>
          </span>
        ) : null)}
      </div>
      {anySet && onClearAll ? <Button size="sm" variant="ghost" onClick={onClearAll}>Clear all</Button> : null}
      {actions ? <div className="plx-filter-bar__actions">{actions}</div> : null}
    </div>
  );
}
