/* Plenix · Combobox
   Summary: A field with a list to choose from, filtered as you type (an ARIA combobox with a listbox).
   Usage:
     <Combobox label="Owner" options={[{ value: 'rm', label: 'Raphael Maher' }]} value={owner} onChange={(value) => …} />
     <Combobox multiple creatable options={tags} values={chosen} onChange={(values) => …} onCreate={(text) => …} />
   Props:
     options: the choices: [{ value, label, group }]; options with a group are listed under its heading, in the order the groups first appear
     value: the chosen value, for a single choice
     values: the chosen values, with multiple
     onChange(value): runs with the chosen value; with multiple it runs with the new array of values
     multiple: allows several values; chosen values show as tags before the field (default false)
     creatable: offers "Create “text”" when nothing matches exactly (default false)
     onCreate(text): runs with the typed text when "Create" is chosen
     placeholder: the hint in the empty field
     label: the accessible name when there is no Field
     invalid: shows the invalid state
     disabled: the field cannot be used
     emptyText: the text when nothing matches (default "No matches")
     id: the id of the input (a Field sets it)
     className: more classes on the combobox
     ref: forwarded to the <input>
   Behavior:
     The list opens on focus and on typing, and closes on a click outside.
     ↓ / ↑ move, Enter chooses, Escape closes.
     Backspace in an empty multiple field removes the last value.
     A single choice closes the list; with multiple, choosing toggles the value and the list stays open.
     A tag's remove button removes its value.
   Notes:
     The list is a menu surface: border only, no shadow (D9).
     Other props pass through to the <input>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Tag } from '../Tag/Tag.jsx';

export const Combobox = React.forwardRef(function Combobox({ options = [], value, values, onChange, multiple = false, creatable = false, onCreate,
  placeholder, label, invalid, disabled, emptyText = 'No matches', className, id, ...rest }, ref) {
  const auto = 'plx-cb' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const listId = auto + '-list';
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [active, setActive] = React.useState(0);
  const wrap = React.useRef(null), input = React.useRef(null);
  React.useImperativeHandle(ref, () => input.current);
  const chosen = multiple ? (values || []) : (value !== undefined && value !== null && value !== '' ? [value] : []);
  const current = !multiple && chosen.length ? options.find((o) => o.value === chosen[0]) : null;
  const q = text.trim().toLowerCase();
  const matching = options.filter((o) => !q || String(o.label).toLowerCase().indexOf(q) >= 0);
  // grouped options stay together under their group's heading (groups in the order they first appear)
  const groupOrder = []; matching.forEach((o) => { if (groupOrder.indexOf(o.group) < 0) groupOrder.push(o.group); });
  const filtered = groupOrder.reduce((all, g) => all.concat(matching.filter((o) => o.group === g)), []);
  const canCreate = creatable && q && !options.some((o) => String(o.label).toLowerCase() === q);
  const items = filtered.map((o) => ({ kind: 'option', o })).concat(canCreate ? [{ kind: 'create' }] : []);
  React.useEffect(() => {
    if (!open) return undefined;
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  React.useEffect(() => { setActive(0); }, [q, open]);
  const choose = (item) => {
    if (!item) return;
    if (item.kind === 'create') { if (onCreate) onCreate(text.trim()); setText(''); return; }
    const v = item.o.value;
    if (multiple) { onChange(chosen.indexOf(v) >= 0 ? chosen.filter((x) => x !== v) : chosen.concat([v])); setText(''); }
    else { onChange(v); setText(''); setOpen(false); }
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); else setActive((a) => Math.min(items.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { if (open && items[active]) { e.preventDefault(); choose(items[active]); } }
    else if (e.key === 'Escape') { if (open) { e.preventDefault(); setOpen(false); } }
    else if (e.key === 'Backspace' && multiple && !text && chosen.length) { onChange(chosen.slice(0, -1)); }
  };
  const optId = (i) => auto + '-o' + i;
  return (
    <div ref={wrap} className={cx('plx-combobox', multiple && 'plx-combobox--multiple', open && 'is-open', disabled && 'is-disabled', className)}>
      <div className="plx-combobox__field plx-input" aria-invalid={invalid || undefined} onClick={() => { if (!disabled && input.current) input.current.focus(); }}>
        {multiple ? chosen.map((v) => { const o = options.find((x) => x.value === v); const t = o ? o.label : v;
          return <Tag key={v} onRemove={() => onChange(chosen.filter((x) => x !== v))} removeLabel={'Remove ' + t}>{t}</Tag>; }) : null}
        <input ref={input} id={id} className="plx-combobox__input" role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list"
          aria-activedescendant={open && items[active] ? optId(active) : undefined} aria-label={label} disabled={disabled} autoComplete="off"
          value={open || multiple ? text : (current ? current.label : '')} placeholder={multiple && chosen.length ? '' : (current && !open ? current.label : placeholder)}
          onChange={(e) => { setText(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey} {...rest} />
        <span className="plx-combobox__chevron" aria-hidden="true" />
      </div>
      {open ? (
        <ul className="plx-combobox__list" id={listId} role="listbox" aria-multiselectable={multiple || undefined}>
          {items.length ? items.map((it, i) => it.kind === 'create'
            ? <li key="create" id={optId(i)} role="option" aria-selected={false} className={cx('plx-combobox__option', 'plx-combobox__create', i === active && 'is-active')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>Create “{text.trim()}”</li>
            : [it.o.group && (i === 0 || !items[i - 1].o || items[i - 1].o.group !== it.o.group) ? <li key={'g-' + it.o.group} className="plx-combobox__group" role="presentation">{it.o.group}</li> : null,
              <li key={it.o.value} id={optId(i)} role="option" aria-selected={chosen.indexOf(it.o.value) >= 0}
                className={cx('plx-combobox__option', i === active && 'is-active', chosen.indexOf(it.o.value) >= 0 && 'is-selected')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>{it.o.label}</li>])
            : <li className="plx-combobox__empty" role="presentation">{emptyText}</li>}
        </ul>
      ) : null}
    </div>
  );
});
