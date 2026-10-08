/* Plenix · SearchField
   Summary: A search input with a search icon, an optional clear button and an optional shortcut hint.
   Usage:
     <SearchField value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery('')} shortcut="Ctrl K" />
   Props:
     value: the search text
     onChange(event): runs when the text changes
     onClear(): runs from the clear button; without it there is no clear button
     placeholder: the placeholder text; default "Search"
     label: the accessible name; default "Search"
     shortcut: a keyboard shortcut hint ("Ctrl K")
     loading: shows a spinner in place of the search icon; default false
     onAccent: the look for the blue header; default false
     className: more classes on the field
     ...rest: other attributes go on the input
   Behavior:
     The clear button shows only while there is text.
     The shortcut hint shows only while the field is empty.
   Notes:
     It has the toolbar control height.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Icon } from '../Icon/Icon.jsx';
import { Kbd } from '../Kbd/Kbd.jsx';
import { Spinner } from '../Loading/Loading.jsx';

export const SearchField = React.forwardRef(function SearchField({ value, onChange, onClear, placeholder = 'Search', label = 'Search', shortcut, loading = false,
  onAccent = false, className, ...rest }, ref) {
  return (
    <div className={cx('plx-search', onAccent && 'plx-search--on-accent', className)} role="search">
      <span className="plx-search__icon" aria-hidden="true">{loading ? <Spinner size="sm" label="Searching" /> : <Icon name="search" />}</span>
      <input ref={ref} type="search" className="plx-search__input" aria-label={label} placeholder={placeholder} value={value} onChange={onChange} {...rest} />
      {onClear && value ? <button type="button" className="plx-search__clear" aria-label="Clear search" onClick={onClear}><Icon name="close" /></button> : null}
      {shortcut && !value ? <span className="plx-search__kbd"><Kbd onAccent={onAccent}>{shortcut}</Kbd></span> : null}
    </div>
  );
});
