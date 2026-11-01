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
     size: "sm" | "md" (default): "sm" selects the existing toolbar control height; "md" preserves today’s search height.
     value: a string: the search text
     onChange(event): runs when the text changes
     onClear(): runs from the clear button; without it there is no clear button
     placeholder: the placeholder text; default "Search"
     label: the accessible name; default "Search"
     shortcut: a keyboard shortcut hint ("Ctrl K")
     loading: shows a spinner in place of the search icon; default false
     onAccent: the look for the blue header; default false
     suggestions: an array: what to offer while there is text, already matched to it by the caller: strings, or
       [{ value, label, description }] (label defaults to value); every part of each label that matches the text is marked (utils/highlight.tsx)
     recent: an array of strings: the person's recent searches (newest first: useSearchHistory), offered while the field is empty
     onSelect(item): runs when a suggestion or a recent search is chosen; item is { value, label, kind: 'suggestion' |
       'recent' }; without it a choice puts its text in the field (onChange) and searches (onSubmitSearch)
     onSubmitSearch(text): runs on Enter when no suggestion is active (the search itself)
     onRemoveRecent(text): removes one recent search: its row's remove button (an "×" named "Remove <term>"), or Delete
       on it; onClearRecent(): removes them all (the Clear button in the list's heading); without them the recent
       searches cannot be removed here
     strings: the list's words: { suggestions: 'Suggestions', recent: 'Recent searches', clearRecent: 'Clear recent searches',
       clear: 'Clear search', results: '{n} suggestions', removed: '{query} removed from recent searches', remove: 'Remove {query}' }
     width: "auto" (default: as wide as its container gives it) | "xs" | "sm" | "md" | "lg" (the field-width scale, P-52) | "bar" (the command bar's search: one fixed width, 240px,
       never squeezed; owner, 2026-10-14) | "fill" (the whole width: the find field inside a panel, a dialog or a menu)
     collapsed: the narrow bar's search (owner, 2026-10-14): an icon-only search button in the field's place (tinted while
       there is text) that opens the field across the bar, over its other controls; default false
     open, onOpenChange(open): (collapsed) whether the field is open across the bar, kept by the caller (CommandBar keeps
       it, so the bar holds its width step while the field is open)
     className: more classes on the field
     ...rest: other attributes go on the input (inputMode, enterKeyHint, autoComplete… override the search defaults)
   Behavior:
     The clear button shows only while there is text.
     In a bar or a header (issue 558) text wider than the field ends in an ellipsis and shows in full in a tooltip on hover
       and focus, only while it is cut and the list is closed.
     The shortcut hint shows only while the field is empty.
     It is type="search" with inputMode "search" and enterKeyHint "search": a touch keyboard shows a Search key.
     With suggestions or recent searches it is a combobox (the ARIA pattern): the list opens on focus and on typing, under
       the field; Arrow Down and Up move through it (the text stays the person's own), Enter chooses, Escape closes the
       list (a second Escape clears the text, as in the browser); a click chooses; a click outside closes it. The number
       of suggestions is announced politely after typing pauses. Delete on a recent search removes it (onRemoveRecent).
     Recent searches with onRemoveRecent (owner, 2026-10-14): the WAI-ARIA "combobox with grid popup" pattern. The field
       has aria-haspopup="grid"; the list is a grid named by its heading, one row per search with two cells: the term and
       its remove button (an icon-only ghost button, "Remove <term>"). The focus stays in the field (aria-activedescendant
       names the active cell): Arrow Down and Up move between rows (in the same cell), Arrow Right moves into the remove
       cell and Arrow Left back to the term (mirrored right to left); Enter on the term searches it, Enter on the remove
       cell removes it, and Delete removes the active row from either cell. The removal is announced politely. A click on
       the term searches, a click on the button removes. Without onRemoveRecent, and for suggestions, the list stays a
       listbox.
     Collapsed: the button opens the field across the nearest positioned box (the command bar's row), focused, with × to
       clear once there is text; Escape closes it and the focus returns to the button; leaving it empty closes it too.
   Notes:
     It has the toolbar control height. The list is a menu surface (border only, no shadow); the caller matches,
     ranks and limits the suggestions (about eight) and the recent searches (about five).
*/
import React from 'react';
import { cx } from '../../utils/cx.ts';
import { announce } from '../../utils/announce.tsx';
import { formatNumber } from '../../utils/format.ts';
import { highlightMatch } from '../../utils/highlight.tsx';
import { Button } from '../Button/Button.jsx';
import { Icon } from '../Icon/Icon.jsx';
import { Kbd } from '../Kbd/Kbd.jsx';
import { Spinner } from '../Loading/Loading.jsx';
import { Tooltip } from '../Tooltip/Tooltip.jsx';
import { useStrings } from '../../providers/LocaleProvider.jsx';
import { useTruncated, useInBar } from '../../utils/overflow.ts';
import ClockIcon from 'plenix-platform/icons/plenix/clock';
import CloseIcon from 'plenix-platform/icons/plenix/close';
import SearchIcon from 'plenix-platform/icons/plenix/search';

const asItem = (kind) => (x) => (typeof x === 'string' ? { value: x, label: x, kind } : Object.assign({ label: x.value }, x, { kind }));

// the field itself (width "auto", "bar" or "fill")
const SearchInput = React.forwardRef(function SearchInput({ value, onChange, onClear, placeholder, label, shortcut, loading = false,
  onAccent = false, suggestions, recent, onSelect, onSubmitSearch, onRemoveRecent, onClearRecent, strings, className, onKeyDown, onFocus, width = 'auto', size, ...rest }, ref) {
  const t = useStrings('searchField', strings);
  if (placeholder === undefined) placeholder = t.placeholder;
  if (label === undefined) label = t.label;
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
  const [cell, setCell] = React.useState(0);   // the grid's active cell in its row: 0 the term, 1 the remove button
  const shown = hasList && open && items.length > 0;
  // recent searches that can be removed one by one: the combobox with grid popup (WAI-ARIA APG)
  const grid = showRecent && !!onRemoveRecent;
  React.useEffect(() => { setActive(-1); setCell(0); }, [text, showRecent]);
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
    const el = active >= 0 && list.current ? list.current.querySelector('#' + auto + '-r' + active + ', #' + auto + '-o' + active) : null;
    if (el && el.scrollIntoView) el.scrollIntoView({ block: 'nearest' });
  }, [active, auto]);
  const setText = (v) => { if (onChange && input.current) onChange({ target: Object.assign(input.current, { value: v }), currentTarget: input.current }); };
  const choose = (item) => {
    setOpen(false);
    if (onSelect) onSelect(item);
    else { setText(item.value); if (onSubmitSearch) onSubmitSearch(item.value); }
  };
  // one recent search removed (its button, Delete, or Enter on its remove cell): the active row stays in place
  const removeRecent = (i) => {
    const it = items[i]; if (!it || !onRemoveRecent) return;
    onRemoveRecent(it.value);
    if (active >= 0) setActive((a) => Math.min(a, items.length - 2));
    if (items.length <= 1) setCell(0);
    announce(t.removed.replace('{query}', it.value));
  };
  const keys = (e) => {
    if (onKeyDown) onKeyDown(e);
    if (e.defaultPrevented || !hasList) { if (e.key === 'Enter' && onSubmitSearch && !e.defaultPrevented) onSubmitSearch(text); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) setOpen(true); else if (items.length) setActive((a) => (a + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (!open) setOpen(true); else if (items.length) setActive((a) => (a <= 0 ? items.length - 1 : a - 1)); }
    else if (grid && shown && active >= 0 && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      // the grid's cells in reading order: toward the end is the remove cell (Arrow Left in a right-to-left page)
      const rtl = !!wrap.current && getComputedStyle(wrap.current).direction === 'rtl';
      e.preventDefault(); setCell((e.key === 'ArrowRight') !== rtl ? 1 : 0);
    }
    else if (e.key === 'Enter') {
      if (shown && items[active] && grid && cell === 1) { e.preventDefault(); removeRecent(active); }
      else if (shown && items[active]) { e.preventDefault(); choose(items[active]); }
      else { setOpen(false); if (onSubmitSearch) onSubmitSearch(text); }
    } else if (e.key === 'Escape') { if (shown) { e.preventDefault(); setOpen(false); } }
    else if (e.key === 'Delete' && shown && showRecent && items[active] && onRemoveRecent) {
      e.preventDefault();
      removeRecent(active);
    } else if (!open && e.key.length === 1) setOpen(true);
  };
  // in a bar (issue 558) search text that is cut shows in full in a Tooltip on hover and focus (not while the list is open under it)
  const bar = useInBar(input);
  const cut = useTruncated(input, text, bar) && !!text;
  const optId = (i) => auto + '-o' + i;
  const cellId = (i, c) => auto + '-o' + i + (c ? '-x' : '');
  const comboProps = hasList ? { role: 'combobox', 'aria-expanded': shown, 'aria-controls': listId, 'aria-autocomplete': 'list',
    'aria-haspopup': grid ? 'grid' : undefined,
    'aria-activedescendant': shown && active >= 0 ? (grid ? cellId(active, cell) : optId(active)) : undefined } : {};
  return (
    <div ref={wrap} className={cx('plx-search', size === 'sm' && 'plx-search--size-sm', width === 'bar' && 'plx-search--bar', width === 'fill' && 'plx-search--fill', ['xs', 'sm', 'md', 'lg'].includes(width) && 'plx-search--width-' + width, onAccent && 'plx-search--on-accent', shown && 'is-open', className)} role="search">
      <span className="plx-search__icon" aria-hidden="true">{loading ? <Spinner size="sm" label={t.searching} /> : <Icon name={SearchIcon} />}</span>
      <Tooltip content={text} disabled={!cut || shown} describe={false} className="plx-search__tip">
        <input ref={input} size={size === 'sm' || size === 'md' ? undefined : size} type="search" inputMode="search" enterKeyHint="search" autoComplete="off" className="plx-search__input" aria-label={label} placeholder={placeholder} value={value}
          onChange={(e) => { if (hasList) setOpen(true); if (onChange) onChange(e); }} onKeyDown={keys}
          onFocus={(e) => { if (hasList) setOpen(true); if (onFocus) onFocus(e); }} {...comboProps} {...rest} />
      </Tooltip>
      {onClear && value ? <button type="button" className="plx-search__clear" aria-label={t.clear} onClick={onClear}><Icon name={CloseIcon} /></button> : null}
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
          {grid ? (
            <div ref={list} id={listId} role="grid" className="plx-search__list plx-search__grid" aria-labelledby={listId + '-t'}>
              {items.map((it, i) => (
                <div key={it.kind + ':' + it.value} id={auto + '-r' + i} role="row"
                  className={cx('plx-search__option', 'plx-search__option--recent', 'plx-search__row', i === active && 'is-active')}
                  onMouseDown={(e) => e.preventDefault()} onMouseEnter={() => setActive(i)}>
                  <span id={cellId(i, 0)} role="gridcell" aria-selected={i === active && cell === 0} className="plx-search__cell" onClick={() => choose(it)}>
                    <span className="plx-search__option-icon" aria-hidden="true"><Icon name={ClockIcon} /></span>
                    <span className="plx-search__option-text"><span className="plx-search__option-label">{it.label}</span></span>
                  </span>
                  <span id={cellId(i, 1)} role="gridcell" aria-selected={i === active && cell === 1} className="plx-search__remove-cell">
                    <Button variant="ghost" size="xs" iconOnly icon={CloseIcon} tabIndex={-1} label={t.remove.replace('{query}', it.value)}
                      className={cx('plx-search__remove', i === active && cell === 1 && 'is-focus-visible')}
                      onMouseDown={(e) => e.preventDefault()} onClick={(e) => { e.stopPropagation(); removeRecent(i); if (input.current) input.current.focus(); }} />
                  </span>
                </div>
              ))}
            </div>
          ) : <ul ref={list} id={listId} role="listbox" className="plx-search__list" aria-label={showRecent ? undefined : t.suggestions} aria-labelledby={showRecent ? listId + '-t' : undefined}>
            {items.map((it, i) => (
              <li key={it.kind + ':' + it.value} id={optId(i)} role="option" aria-selected={i === active}
                className={cx('plx-search__option', it.kind === 'recent' && 'plx-search__option--recent', i === active && 'is-active')}
                onMouseDown={(e) => e.preventDefault()} onClick={() => choose(it)} onMouseEnter={() => setActive(i)}>
                <span className="plx-search__option-icon" aria-hidden="true"><Icon name={it.kind === 'recent' ? ClockIcon : SearchIcon} /></span>
                <span className="plx-search__option-text">
                  <span className="plx-search__option-label">{it.kind === 'recent' ? it.label : highlightMatch(it.label, text)}</span>
                  {it.description ? <span className="plx-search__option-description">{it.description}</span> : null}
                </span>
              </li>
            ))}
          </ul>}
        </div>
      ) : null}
    </div>
  );
});

// the narrow bar's search (owner, 2026-10-14): the search icon in the field's place; it opens the field across the bar
function CollapsedSearch({ value, label, onKeyDown, onBlur, className, open: openProp, onOpenChange, ...rest }, ref) {
  const tw = useStrings('searchField');
  if (label === undefined) label = tw.label;
  const [own, setOwn] = React.useState(false);
  const open = openProp === undefined ? own : openProp;
  const setOpen = (v) => { setOwn(v); if (onOpenChange) onOpenChange(v); };
  const field = React.useRef(null), button = React.useRef(null);
  React.useImperativeHandle(ref, () => (open ? field.current : button.current));
  React.useEffect(() => { if (open && field.current) field.current.focus(); }, [open]);
  const close = (refocus) => { setOpen(false); if (refocus) setTimeout(() => { if (button.current) button.current.focus(); }, 0); };
  return (
    <>
      <Tooltip content={label}>
        <Button ref={button} size="sm" variant="ghost" icon={SearchIcon} iconOnly label={label} selected={!!value} aria-expanded={open}
          className={cx('plx-search__toggle', className)} onClick={() => setOpen(true)} />
      </Tooltip>
      {open ? (
        <div className="plx-search__over">
          <SearchInput ref={field} value={value} label={label} width="fill" {...rest}
            onKeyDown={(e) => { if (onKeyDown) onKeyDown(e); if (e.key === 'Escape' && !e.defaultPrevented && e.currentTarget.getAttribute('aria-expanded') !== 'true') { e.preventDefault(); close(true); } }}
            onBlur={(e) => { if (onBlur) onBlur(e); if (!e.currentTarget.value) close(false); }} />
        </div>
      ) : null}
    </>
  );
}
const Collapsed = React.forwardRef(CollapsedSearch);

export const SearchField = React.forwardRef(function SearchField({ collapsed = false, ...props }, ref) {
  return collapsed ? <Collapsed ref={ref} {...props} /> : <SearchInput ref={ref} {...props} />;
});
