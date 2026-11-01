/* Plenix · Cascader
   Summary: A form field whose value is a leaf of a hierarchy, chosen level by level in columns that open under the field
     (region, then country, then city); the field shows the whole path ("Europe / France / Paris").
   Usage:
     <Field label="Office"><Cascader options={regions} value={office} onChange={setOffice} /></Field>
     <Cascader options={categories} expandTrigger="hover" value={v} onChange={setV} label="Category" />
     <Cascader options={regions} searchable value={v} onChange={setV} label="Office" />
     <Cascader options={regions} multiple values={offices} onChange={setOffices} label="Offices" />
   Props:
     options: the hierarchy: [{ id, label, children, disabled }] (MillerColumns' items); only leaves can be chosen
     value: the chosen leaf's id, for a single choice; onChange(id, path) runs with it and its path of ids
     values: the chosen leaves' ids, with multiple; onChange(ids) runs with the new array
     multiple: several leaves, each a checkbox in the columns; the field shows them as tags (default false)
     expandTrigger: "click" (default: a parent opens when chosen) | "hover" (pointing at a parent opens it)
     searchable: a search field at the top of the list finds leaves at every level by name and lists their paths
       (default false)
     placeholder: the hint in the empty field (default strings.placeholder)
     label: the accessible name when there is no Field
     invalid: the invalid state (the field's border in the danger color); a Field with an error sets it
     warning: a warning state beside invalid (a Field with a warning sets it): a warning border and fill; the Field draws its icon and message
     disabled: the field cannot be used
     readOnly: shows the choice and does not change it: the list does not open and the tags cannot be removed; default the nearest ReadOnly region's (useReadOnly)
     id: the id of the field's button (a Field sets it, so its label names it)
     strings: the words it shows and announces, for other languages: { placeholder: "Choose", separator: " / ",
       search: "Search", noMatches: "No matches", empty: "No items", remove: "Remove {label}", results: (n) => …,
       columns: "Options" }
     className: more classes on the cascader
   Behavior:
     The popup opens in the browser's top layer, below the field or above it near an edge: no dialog, drawer or scroll area clips it.
     The field is a button (aria-haspopup="dialog", aria-expanded) that opens the columns under it; focus moves into the
       first column, on the chosen path. The columns are MillerColumns: Arrow Up and Down in a column, Right into the
       children, Left back, Enter on a leaf chooses it (a click too). A single choice closes the list and returns focus to
       the field; with multiple, Enter or a click checks or unchecks the leaf and the list stays open.
     Escape, or a click outside, closes the list and returns focus to the field.
     With searchable the search field is first in the list: typing lists every leaf whose name matches, with its path,
       as one listbox (Arrow Down and Up move, Enter chooses); the number of matches is announced; clearing it brings the
       columns back.
     The path in the field and in each match uses strings.separator; a path too long for the field ends in an ellipsis; the
       whole path is read as the field’s description.
   Notes:
     For a hierarchy people should see whole, use a tree select; for two or three short levels, consider plain Selects.
     The list is a menu surface (the menu's corner, --plx-comp-cascader-popup-radius, and the menu elevation); its columns take the narrowest width step (160px).
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { useDescribedBy } from '../../utils/describedBy.ts';
import { useReadOnly } from '../../providers/ReadOnly.jsx';
import { Tag } from '../Tag/Tag.jsx';
import { MillerColumns } from '../MillerColumns/MillerColumns.jsx';
import { announce } from '../../utils/announce.tsx';
import { useFloating, TOP_LAYER } from '../../utils/floating.ts';

import { useStrings, useLocale } from '../../providers/LocaleProvider.jsx';
import { formatNumber } from '../../utils/format.ts';
import { Icon } from '../Icon/Icon.jsx';
import SelectChevronIcon from 'plenix-platform/icons/plenix/select-chevron';


// every leaf of the hierarchy with its path of items
// the columns of the list take the narrowest width step (160px), so three levels fit under a form field
const NARROW = [1, 1, 1, 1, 1, 1];
const leavesOf = (items, trail = []) => items.reduce((all, it) => (Array.isArray(it.children)
  ? all.concat(leavesOf(it.children, trail.concat([it]))) : all.concat([{ item: it, trail: trail.concat([it]) }])), []);
const pathTo = (items, id) => { const hit = leavesOf(items).find((l) => l.item.id === id); return hit ? hit.trail : null; };

export const Cascader = React.forwardRef(function Cascader({ options = [], value, values, onChange, multiple = false, expandTrigger = 'click', searchable = false,
  placeholder, label, invalid, warning, disabled, readOnly: readOnlyOwn, id, strings, className, 'aria-describedby': describedBy, ...rest }, ref) {
  const t = useStrings('cascader', strings);
  const loc = useLocale();
  const auto = 'plx-cs' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const describedAt = useDescribedBy(auto + '-value', describedBy);   // the chosen value first, then what its owner (a Field) described
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState('');
  const [active, setActive] = React.useState(0);
  const [browse, setBrowse] = React.useState([]);
  const wrap = React.useRef(null), button = React.useRef(null), search = React.useRef(null), cols = React.useRef(null), popup = React.useRef(null);
  // the popup opens in the top layer, placed against the field by the floating layer (flips up near an edge, follows scroll and resize): no dialog, drawer or scroll area clips it
  useFloating(wrap, popup, { open, placement: 'bottom-start' });
  React.useLayoutEffect(() => { const el = popup.current; if (open && TOP_LAYER && el && el.showPopover && !el.matches(':popover-open')) el.showPopover(); }, [open]);
  React.useImperativeHandle(ref, () => button.current);
  const chosen = multiple ? (values || []) : (value !== undefined && value !== null && value !== '' ? [value] : []);
  const pathLabel = (trail) => trail.map((x) => x.label).join(t.separator);
  const current = !multiple && chosen.length ? pathTo(options, chosen[0]) : null;

  const locked = useReadOnly(readOnlyOwn);   // its own readOnly, else the nearest ReadOnly region's: the choice shows and nothing changes it (the list does not open)
  const openList = () => {
    if (disabled || locked) return;
    setBrowse(current ? current.map((x) => x.id) : []);
    setText(''); setOpen(true);
  };
  const close = (refocus) => { setOpen(false); setText(''); if (refocus && button.current) button.current.focus(); };
  // focus moves into the list when it opens: the search field, or the first column
  React.useEffect(() => {
    if (!open) return;
    const target = searchable ? search.current : cols.current && cols.current.querySelector('.plx-miller-columns__list');
    if (target) target.focus();
  }, [open]);
  React.useEffect(() => {
    if (!open) return undefined;
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) close(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);

  const q = text.trim().toLowerCase();
  const matches = q ? leavesOf(options).filter((l) => !l.item.disabled && String(l.item.label).toLowerCase().indexOf(q) >= 0) : [];
  React.useEffect(() => { setActive(0); if (q) announce(typeof t.results === 'function' ? t.results(matches.length) : loc.t('cascader.results', { count: matches.length, n: formatNumber(matches.length) })); }, [q]);

  const pick = (item, trail) => {
    if (locked) return;
    if (multiple) onChange(chosen.indexOf(item.id) >= 0 ? chosen.filter((x) => x !== item.id) : chosen.concat([item.id]));
    else { onChange(item.id, trail.map((x) => x.id)); close(true); }
  };
  const onListKey = (e) => { if (open && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); } };
  const onSearchKey = (e) => {
    if (!q) {
      if (e.key === 'ArrowDown') { e.preventDefault(); const l = cols.current && cols.current.querySelector('.plx-miller-columns__list'); if (l) l.focus(); }
      return;
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(matches.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { if (matches[active]) { e.preventDefault(); pick(matches[active].item, matches[active].trail); } }
  };
  const optId = (i) => auto + '-m' + i;
  const shown = multiple ? null : current ? pathLabel(current) : null;

  return (
    <div ref={wrap} className={cx('plx-cascader', multiple && 'plx-cascader--multiple', open && 'is-open', disabled && 'is-disabled', className)} onKeyDown={onListKey}>
      <div className="plx-cascader__field plx-input" aria-invalid={invalid || undefined} data-plx-warning={warning || undefined}>
        {multiple ? chosen.map((v) => { const trail = pathTo(options, v); const name = trail ? trail[trail.length - 1].label : String(v);
          return <Tag key={v} onRemove={disabled || locked ? undefined : () => onChange(chosen.filter((x) => x !== v))} removeLabel={t.remove.replace('{label}', name)}>{name}</Tag>; }) : null}
        <button ref={button} type="button" id={id} className="plx-cascader__trigger" aria-haspopup="dialog" aria-expanded={open} aria-controls={open ? auto + '-pop' : undefined}
          aria-label={label || undefined} aria-describedby={describedAt} disabled={disabled}
          onClick={() => (open ? close(false) : openList())}
          onKeyDown={(e) => { if (e.key === 'ArrowDown' && !open) { e.preventDefault(); openList(); } }} {...rest}>
          <span id={auto + '-value'} className={cx('plx-cascader__value', !shown && 'plx-cascader__placeholder')}>{shown || (multiple && chosen.length ? '' : placeholder || t.placeholder)}</span>
          <span className="plx-cascader__chevron" aria-hidden="true"><Icon icon={SelectChevronIcon} filled={false} /></span>
        </button>
      </div>
      {open ? (
        <div ref={popup} className="plx-cascader__popup" id={auto + '-pop'} role="dialog" popover={TOP_LAYER ? 'manual' : undefined} aria-label={label || t.columns}>
          {searchable ? (
            <div className="plx-cascader__search">
              <input ref={search} type="search" className="plx-input plx-cascader__search-input" role="combobox" aria-expanded={!!q} aria-controls={auto + '-matches'}
                aria-autocomplete="list" aria-activedescendant={q && matches[active] ? optId(active) : undefined} aria-label={t.search} placeholder={t.search}
                value={text} onChange={(e) => setText(e.target.value)} onKeyDown={onSearchKey} autoComplete="off" />
            </div>
          ) : null}
          {q ? (
            <ul className="plx-cascader__matches" id={auto + '-matches'} role="listbox" aria-label={t.search} aria-multiselectable={multiple || undefined}>
              {matches.length ? matches.map((m, i) => (
                <li key={m.item.id} id={optId(i)} role="option" aria-selected={chosen.indexOf(m.item.id) >= 0}
                  className={cx('plx-cascader__match', i === active && 'is-active', chosen.indexOf(m.item.id) >= 0 && 'is-selected')}
                  onMouseDown={(e) => e.preventDefault()} onClick={() => pick(m.item, m.trail)} onMouseEnter={() => setActive(i)}>
                  <span className="plx-cascader__match-label">{m.item.label}</span>
                  {m.trail.length > 1 ? <span className="plx-cascader__match-path">{pathLabel(m.trail.slice(0, -1))}</span> : null}
                </li>
              )) : <li className="plx-cascader__empty" role="presentation">{t.noMatches}</li>}
            </ul>
          ) : (
            <div ref={cols}>
              <MillerColumns className="plx-cascader__columns" label={label || t.columns} items={options} path={browse} expandOnHover={expandTrigger === 'hover'}
                checked={multiple ? chosen : undefined} strings={{ empty: t.empty }}
                openOnClick columnWidths={NARROW} onPathChange={(p) => setBrowse(p)} onOpen={(item) => pick(item, pathTo(options, item.id) || [item])} />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
});
