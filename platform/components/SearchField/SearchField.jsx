/* Plenix · SearchField
   Summary: A search input with a search icon, an optional clear button and an optional shortcut hint; optionally a list
     under it of suggestions while people type, and of their recent searches while it is empty.
   Usage:
     <SearchField value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery('')} shortcut="Ctrl K" />
     const history = useSearchHistory('assets');
     <SearchField value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')}
       suggestions={matches(q)} recent={history.items} onSelect={(item) => open(item)}
       onSubmitSearch={(text) => { history.add(text); search(text); }} onRemoveRecent={history.remove} onClearRecent={history.clear} />
   Props:
     value: the search text
     onChange(event): runs when the text changes
     onClear(): runs from the clear button; without it there is no clear button
     placeholder: the placeholder text; default "Search"
     label: the accessible name; default "Search"
     shortcut: a keyboard shortcut hint ("Ctrl K")
     loading: shows a spinner in place of the search icon; default false
     onAccent: the look for the blue header; default false
     suggestions: what to offer while there is text, already matched to it by the caller: strings, or
       [{ value, label, description }] (label defaults to value); the part of each label that matches the text is in bold
     recent: the person's recent searches (strings, newest first: useSearchHistory), offered while the field is empty
     onSelect(item): runs when a suggestion or a recent search is chosen; item is { value, label, kind: 'suggestion' |
       'recent' }; without it a choice puts its text in the field (onChange) and searches (onSubmitSearch)
     onSubmitSearch(text): runs on Enter when no suggestion is active (the search itself)
     onRemoveRecent(text): removes one recent search (Delete on it); onClearRecent(): removes them all (the Clear button
       in the list's heading); without them the recent searches cannot be removed here
     strings: the list's words: { suggestions: 'Suggestions', recent: 'Recent searches', clearRecent: 'Clear recent searches',
       clear: 'Clear search', results: '{n} suggestions', removed: '{query} removed from recent searches' }
     className: more classes on the field
     ...rest: other attributes go on the input (inputMode, enterKeyHint, autoComplete… override the search defaults)
   Behavior:
     The clear button shows only while there is text.
     The shortcut hint shows only while the field is empty.
     It is type="search" with inputMode "search" and enterKeyHint "search": a touch keyboard shows a Search key.
     With suggestions or recent searches it is a combobox (the ARIA pattern): the list opens on focus and on typing, under
       the field; Arrow Down and Up move through it (the text stays the person's own), Enter chooses, Escape closes the
       list (a second Escape clears the text, as in the browser); a click chooses; a click outside closes it. The number
       of suggestions is announced politely after typing pauses. Delete on a recent search removes it (onRemoveRecent).
   Notes:
     It has the toolbar control height. The list is a menu surface (border only, no shadow); the caller matches,
     ranks and limits the suggestions (about eight) and the recent searches (about five).
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { announce } from '../../utils/announce.jsx';
import { formatNumber } from '../../utils/format.js';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { Kbd } from '../Kbd/Kbd.jsx';
import { Spinner } from '../Loading/Loading.jsx';

const STRINGS = { suggestions: 'Suggestions', recent: 'Recent searches', clearRecent: 'Clear recent searches', clear: 'Clear search',
  results: '{n} suggestions', removed: '{query} removed from recent searches' };
const asItem = (kind) => (x) => (typeof x === 'string' ? { value: x, label: x, kind } : Object.assign({ label: x.value }, x, { kind }));

// the label with the part that matches the text in bold (the first match, ignoring case)
function marked(label, text) {
  const s = String(label), q = String(text || '').trim();
  const at = q ? s.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (at < 0) return s;
  return [s.slice(0, at), <strong key="m" className="plx-search__match">{s.slice(at, at + q.length)}</strong>, s.slice(at + q.length)];
}

export const SearchField = React.forwardRef(function SearchField({ value, onChange, onClear, placeholder = 'Search', label = 'Search', shortcut, loading = false,
  onAccent = false, suggestions, recent, onSelect, onSubmitSearch, onRemoveRecent, onClearRecent, strings, className, onKeyDown, onFocus, ...rest }, ref) {
  const t = Object.assign({}, STRINGS, strings);
  const auto = 'plx-sf' + React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const listId = auto + '-list';
  const wrap = React.useRef(null), input = React.useRef(null), list = React.useRef(null);
  React.useImperativeHandle(ref, () => input.current);
  const hasList = !!(suggestions || recent);
  const text = value == null ? '' : String(value);
  const showRecent = !text;
  const items = (showRecent ? (recent || []).map(asItem('recent')) : (suggestions || []).map(asItem('suggestion')));
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(-1);
  const shown = hasList && open && items.length > 0;
  React.useEffect(() => { setActive(-1); }, [text, showRecent]);
  React.useEffect(() => {
    if (!open) return undefined;
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', off);
    return () => document.removeEventListener('mousedown', off);
  }, [open]);
  // the number of suggestions, once typing pauses (announce waits for the pause)
  React.useEffect(() => { if (shown && !showRecent) announce(t.results.replace('{n}', formatNumber(items.length))); }, [shown, showRecent, items.length, t.results]);
  // the active option stays in view in a long list
  React.useEffect(() => {
    const el = active >= 0 && list.current ? list.current.querySelector('#' + auto + '-o' + active) : null;
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }, [active, auto]);
  const setText = (v) => { if (onChange && input.current) onChange({ target: Object.assign(input.current, { value: v }), currentTarget: input.current }); };
  const choose = (item) => {
    setOpen(false);
    if (onSelect) onSelect(item);
    else { setText(item.value); if (onSubmitSearch) onSubmitSearch(item.value); }
  };
  const keys = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || !hasList) { if (e.key === 'Enter' && onSubmitSearch && !e.defaultPrevented) onSubmitSearch(text); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); else if (items.length) setActive((a) => (a + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (!open) setOpen(true); else if (items.length) setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (e.key === 'Enter') {
      if (shown && items[active]) { e.preventDefault(); choose(items[active]); }
      else { setOpen(false); if (onSubmitSearch) onSubmitSearch(text); }
    } else if (e.key === 'Escape') { if (shown) { e.preventDefault(); setOpen(false); } }
    else if (e.key === 'Delete' && shown && showRecent && items[active] && onRemoveRecent) {
      e.preventDefault();
      const q = items[active].value;
      onRemoveRecent(q);
      setActive((a) => Math.min(a, items.length - 2));
      announce(t.removed.replace('{query}', q));
    } else if (!open && e.key.length === 1) setOpen(true);
  };
  const optId = (i) => auto + '-o' + i;
  const comboProps = hasList ? { role: 'combobox', 'aria-expanded': shown, 'aria-controls': listId, 'aria-autocomplete': 'list',
    'aria-activedescendant': shown && active >= 0 ? optId(active) : undefined } : {};
  return (
    <div ref={wrap} className={cx('plx-search', onAccent && 'plx-search--on-accent', shown && 'is-open', className)} role="search">
      <span className="plx-search__icon" aria-hidden="true">{loading ? <Spinner size="sm" label="Searching" /> : <Icon name="search" />}</span>
      <input ref={input} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" className="plx-search__input" aria-label={label} placeholder={placeholder} value={value}
        onChange={(e) => { if (hasList) setOpen(true); if (onChange) onChange(e); }} onKeyDown={keys}
        onFocus={(e) => { if (hasList) setOpen(true); if (onFocus) onFocus(e); }} {...comboProps} {...rest} />
      {onClear && value ? <button type="button" className="plx-search__clear" aria-label={t.clear} onClick={onClear}><Icon name="close" /></button> : null}
      {shortcut && !value ? <span className="plx-search__kbd"><Kbd onAccent={onAccent}>{shortcut}</Kbd></span> : null}
      {hasList ? (
        <div className="plx-search__popup" hidden={!shown}>
          {showRecent ? (
            <div className="plx-search__popup-head">
              <span className="plx-search__popup-title" id={listId + '-t'}>{t.recent}</span>
              {onClearRecent ? <Button variant="ghost" size="2xs" className="plx-search__popup-action" onMouseDown={(e) => e.preventDefault()}
                onClick={() => { onClearRecent(); setOpen(false); if (input.current) input.current.focus(); }}>{t.clearRecent}</Button> : null}
            </div>
          ) : null}
          <ul ref={list} id={listId} role="listbox" className="plx-search__list" aria-label={showRecent ? undefined : t.suggestions} aria-labelledby={showRecent ? listId + '-t' : undefined}>
            {items.map((it, i) => (
              <li key={it.kind + ':' + it.value} id={optId(i)} role="option" aria-selected={i === active}
                className={cx('plx-search__option', it.kind === 'recent' && 'plx-search__option--recent', i === active && 'is-active')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>
                <span className="plx-search__option-icon" aria-hidden="true"><Icon name={it.kind === 'recent' ? 'clock' : 'search'} /></span>
                <span className="plx-search__option-text">
                  <span className="plx-search__option-label">{it.kind === 'recent' ? it.label : marked(it.label, text)}</span>
                  {it.description ? <span className="plx-search__option-description">{it.description}</span> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
});
