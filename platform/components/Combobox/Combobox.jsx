/* Plenix · Combobox
   Summary: A field with a list to choose from, filtered as you type (an ARIA combobox with a listbox).
   Usage:
     <Combobox label="Owner" options={[{ value: 'rm', label: 'Raphael Maher' }]} value={owner} onChange={(value) => …} />
     <Combobox multiple creatable options={tags} values={chosen} onChange={(values) => …} onCreate={(text) => …} />
     <Combobox label="Owner" loadOptions={(text) => api.people(text)} value={owner} onChange={…} />   // async select
     <Combobox multiple marks="checkbox" options={…} values={…} onChange={…} />                        // checkbox select
     <Combobox marks="radio" options={…} value={…} onChange={…} />                                     // radio select
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
     loadOptions(text): loads the options for the typed text (async select): returns the options or a Promise of them;
       the list shows those options as they are (the loader filters), while they load a spinner and "Loading…"
     loadDelay: the pause after typing before loadOptions runs, in milliseconds (default 300; 0 when the field is empty)
     minChars: the characters needed before loadOptions runs (default 0: it also loads when the list opens)
     loading: shows the loading row whatever loadOptions does (for options the caller loads itself) (default false)
     marks: a mark before each option: "checkbox" (several, with multiple) | "radio" (one choice) | none (default)
     strings: the words it shows and announces, for other languages: { loading: "Loading…", error: "The options could not
       be loaded", results: (n) => n + " options" } (results is announced after each load)
     id: the id of the input (a Field sets it)
     className: more classes on the combobox
     ref: forwarded to the <input>
   Behavior:
     The list opens on focus and on typing, and closes on a click outside.
     ↓ / ↑ move, Enter chooses, Escape closes.
     Backspace in an empty multiple field removes the last value.
     A single choice closes the list; with multiple, choosing toggles the value and the list stays open.
     A tag's remove button removes its value.
     With loadOptions, each pause in typing loads once; an answer that arrives after a newer request is dropped. The list
       is busy (aria-busy) while it loads, the number of options is announced politely, a failed load says so in the list.
     Options loaded earlier keep naming the chosen values when a later load no longer has them.
     Marks are the Checkbox and Radio controls drawn inside the option: not focusable and hidden from assistive
       technology (the option's own aria-selected says it is chosen).
   Notes:
     The list is a menu surface: border only, no shadow (D9).
     Other props pass through to the <input>.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Tag } from '../Tag/Tag.jsx';
import { Spinner } from '../Loading/Loading.jsx';
import { announce } from '../../utils/announce.jsx';

const STRINGS = { loading: 'Loading…', error: 'The options could not be loaded', results: (n) => n + (n === 1 ? ' option' : ' options') };

export const Combobox = React.forwardRef(function Combobox({ options = [], value, values, onChange, multiple = false, creatable = false, onCreate,
  placeholder, label, invalid, disabled, emptyText = 'No matches', loadOptions, loadDelay = 300, minChars = 0, loading = false, marks, strings,
  className, id, ...rest }, ref) {
  const t = Object.assign({}, STRINGS, strings);
  const auto = 'plx-cb' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const listId = auto + '-list';
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [active, setActive] = React.useState(0);
  const wrap = React.useRef(null), input = React.useRef(null);
  React.useImperativeHandle(ref, () => input.current);
  // async select: the options of the last load, the loads in flight (only the newest is shown) and every option seen
  const [loaded, setLoaded] = React.useState([]);
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const loader = React.useRef(loadOptions), request = React.useRef(0), seen = React.useRef(new Map());
  loader.current = loadOptions;
  const async = !!loadOptions;
  React.useEffect(() => {
    if (!async || !open) return undefined;
    const query = text.trim();
    if (query.length < minChars) { request.current++; setLoaded([]); setBusy(false); setFailed(false); return undefined; }
    const n = ++request.current;
    setBusy(true); setFailed(false);
    const timer = setTimeout(() => {
      Promise.resolve().then(() => loader.current(query)).then((list) => {
        if (n !== request.current) return;
        const got = Array.isArray(list) ? list : [];
        got.forEach((o) => seen.current.set(o.value, o));
        setLoaded(got); setBusy(false); announce(t.results(got.length));
      }, () => { if (n !== request.current) return; setLoaded([]); setBusy(false); setFailed(true); });
    }, query ? loadDelay : 0);
    return () => clearTimeout(timer);
  }, [async, open, text, minChars, loadDelay]);
  const isLoading = !!loading || (async && busy);
  const optionOf = (v) => options.find((x) => x.value === v) || (async ? loaded.find((x) => x.value === v) || seen.current.get(v) : undefined);
  const chosen = multiple ? (values || []) : (value !== undefined && value !== null && value !== '' ? [value] : []);
  const current = !multiple && chosen.length ? optionOf(chosen[0]) || null : null;
  const q = text.trim().toLowerCase();
  const matching = isLoading || failed ? [] : async ? loaded : options.filter((o) => !q || String(o.label).toLowerCase().indexOf(q) >= 0);
  // grouped options stay together under their group's heading (groups in the order they first appear)
  const groupOrder = []; matching.forEach((o) => { if (groupOrder.indexOf(o.group) < 0) groupOrder.push(o.group); });
  const filtered = groupOrder.reduce((all, g) => all.concat(matching.filter((o) => o.group === g)), []);
  const canCreate = creatable && q && !isLoading && !(async ? loaded : options).some((o) => String(o.label).toLowerCase() === q);
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
    <div ref={wrap} className={cx('plx-combobox', multiple && 'plx-combobox--multiple', marks && 'plx-combobox--marks', open && 'is-open', disabled && 'is-disabled', className)}>
      <div className="plx-combobox__field plx-input" aria-invalid={invalid || undefined} onClick={() => { if (!disabled && input.current) input.current.focus(); }}>
        {multiple ? chosen.map((v) => { const o = optionOf(v); const t = o ? o.label : v;
          return <Tag key={v} onRemove={() => onChange(chosen.filter((x) => x !== v))} removeLabel={'Remove ' + t}>{t}</Tag>; }) : null}
        <input ref={input} id={id} className="plx-combobox__input" role="combobox" aria-expanded={open} aria-controls={listId} aria-autocomplete="list"
          aria-activedescendant={open && items[active] ? optId(active) : undefined} aria-label={label} disabled={disabled} autoComplete="off"
          value={open || multiple ? text : (current ? current.label : '')} placeholder={multiple && chosen.length ? '' : (current && !open ? current.label : placeholder)}
          onChange={(e) => { setText(e.target.value); setOpen(true); }} onFocus={() => setOpen(true)} onKeyDown={onKey} {...rest} />
        <span className="plx-combobox__chevron" aria-hidden="true" />
      </div>
      {open ? (
        <ul className="plx-combobox__list" id={listId} role="listbox" aria-multiselectable={multiple || undefined} aria-busy={isLoading || undefined}>
          {items.length ? items.map((it, i) => it.kind === 'create'
            ? <li key="create" id={optId(i)} role="option" aria-selected={false} className={cx('plx-combobox__option', 'plx-combobox__create', i === active && 'is-active')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>Create “{text.trim()}”</li>
            : [it.o.group && (i === 0 || !items[i - 1].o || items[i - 1].o.group !== it.o.group) ? <li key={'g-' + it.o.group} className="plx-combobox__group" role="presentation">{it.o.group}</li> : null,
              <li key={it.o.value} id={optId(i)} role="option" aria-selected={chosen.indexOf(it.o.value) >= 0}
                className={cx('plx-combobox__option', i === active && 'is-active', chosen.indexOf(it.o.value) >= 0 && 'is-selected')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>
                {marks ? <input type={marks === 'radio' ? 'radio' : 'checkbox'} className="plx-check__input plx-combobox__mark" tabIndex={-1} aria-hidden="true"
                  checked={chosen.indexOf(it.o.value) >= 0} readOnly /> : null}
                {marks ? <span className="plx-combobox__option-label">{it.o.label}</span> : it.o.label}</li>])
            : isLoading ? <li className="plx-combobox__loading" role="presentation"><Spinner size="sm" label={t.loading} /><span aria-hidden="true">{t.loading}</span></li>
            : failed ? <li className="plx-combobox__empty plx-combobox__error" role="presentation">{t.error}</li>
            : <li className="plx-combobox__empty" role="presentation">{emptyText}</li>}
        </ul>
      ) : null}
    </div>
  );
});
