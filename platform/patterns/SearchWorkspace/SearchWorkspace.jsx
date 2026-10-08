/* Plenix · SearchWorkspace
   Summary: The Advanced Search workspace (level 3 of Plenix search), a view of the main work area like Categories or Files.
     It is normal browsing with more powerful filtering, never a form of field / operator / value rows.
   Usage:
     <SearchWorkspace title="Search results" query={query} onQueryChange={setQuery} placeholder="Search…"
       filters={[…]} onFilterChange={(id, value) => …} onClearAll={() => …} count={128} noun="asset"
       sort={{ value, options, onChange }} view={{ value, options, onChange }} onSave={() => …}
       headStart={<…/>} headEnd={<…/>} bulk={<BulkActions…/>}>{results}</SearchWorkspace>
   Props:
     title: "Search" (default) before a query, "Search results" after one, or a saved search's name (the capability decides)
     query: the search field's text (default "")
     onQueryChange(next): runs when the search field changes; Enter or typing updates the results (the capability filters)
     placeholder: the search field's placeholder (default "Search…")
     filters: FilterBar filters: [{ id, label, options, value, multiple }]
     onFilterChange(id, value): runs when a filter changes or its chip is removed
     onClearAll(): runs from Clear all, beside the chips of the set filters
     count: the number of results, for the result count line (default 0)
     noun: the word for one result in the count line, as in "128 assets" (default "result")
     plural: the word for several (default: noun + "s")
     sort: { value, options, onChange }; a Sort menu (optional)
     view: { value, options, onChange }; a Grid / Table switch (optional)
     onSave(): shows Save search (only capabilities that keep saved searches)
     headStart: extra controls at the start of the title row (a menu button, a details toggle)
     headEnd: extra controls at the end of the title row
     bulk: a BulkActions bar shown above the results
     className: more classes
     children: the results
   Behavior:
     Set filters are repeated as removable chips under the toolbar ("Type: PNG ×") with Clear all.
     The count line is announced politely.
     When count is 0 the results area says there is nothing to show for the query.
   Notes:
     The application shell (header, left navigation, a details panel where the capability has one) stays, and only the center changes.
     Pressing Enter in the header search opens it with the query kept.
*/
import React from 'react';
import { cx } from '../../utils/cx.js';
import { Button } from '../../components/Button/Button.jsx';
import { SearchField } from '../../components/SearchField/SearchField.jsx';
import { SegmentedControl } from '../../components/SegmentedControl/SegmentedControl.jsx';
import { Menu, MenuItem } from '../../components/Menu/Menu.jsx';
import { Chip } from '../../components/Tag/Tag.jsx';
import { EmptyState } from '../../components/EmptyState/EmptyState.jsx';
import { FilterBar } from '../FilterBar/FilterBar.jsx';
import { useUid } from '../../utils/layer.js';

const label = (f, v) => { const o = (f.options || []).find((x) => x.value === v); return o ? o.label : String(v); };

export function SearchWorkspace({ title = 'Search', query = '', onQueryChange, placeholder = 'Search…', filters = [], onFilterChange, onClearAll,
  count = 0, noun = 'result', plural, sort, view, onSave, headStart, headEnd, bulk, className, children }) {
  const id = useUid('plx-search-ws');
  const field = React.useRef(null);
  // the query typed here is applied as the person types; Enter keeps focus in the field
  const chips = [];
  filters.forEach((f) => {
    if (f.multiple) (f.value || []).forEach((v) => chips.push({ f, v, text: f.label + ': ' + label(f, v), remove: () => onFilterChange(f.id, (f.value || []).filter((x) => x !== v)) }));
    else if (f.value !== null && f.value !== undefined && f.value !== '') chips.push({ f, v: f.value, text: f.label + ': ' + label(f, f.value), remove: () => onFilterChange(f.id, null) });
  });
  const nouns = count === 1 ? noun : (plural || noun + 's');
  return (
    <section aria-labelledby={id + '-title'} className={cx('plx-search-ws', className)}>
      <div className="plx-search-ws__head">
        {headStart}
        <h2 id={id + '-title'} className="plx-search-ws__title">{title}</h2>
        <span className="plx-search-ws__count" aria-live="polite">{count.toLocaleString('en-US') + ' ' + nouns}</span>
        <span className="plx-search-ws__spacer" />
        {onSave ? <Button size="sm" icon="save" onClick={onSave}>Save search</Button> : null}
        {headEnd}
      </div>
      <div role="search" className="plx-search-ws__query">
        <SearchField ref={field} label={'Search ' + nouns} placeholder={placeholder} value={query}
          onChange={(e) => onQueryChange && onQueryChange(e.target.value)} onClear={() => onQueryChange && onQueryChange('')} />
      </div>
      {/* Clear all lives with the active-filter chips below, once */}
      {filters.length ? <FilterBar label="Filters" filters={filters} onChange={onFilterChange} /> : null}
      {chips.length ? (
        <div className="plx-search-ws__active" role="group" aria-label="Active filters">
          {chips.map((c) => <Chip key={c.f.id + ':' + c.v} selected onRemove={c.remove} removeLabel={'Remove ' + c.text}>{c.text}</Chip>)}
          {onClearAll ? <Button size="xs" variant="link" onClick={onClearAll}>Clear all</Button> : null}
        </div>
      ) : null}
      <div className="plx-search-ws__bar">
        <span className="plx-search-ws__results">{count.toLocaleString('en-US') + ' ' + (count === 1 ? 'result' : 'results')}</span>
        <span className="plx-search-ws__spacer" />
        {view ? <SegmentedControl label="View" value={view.value} onChange={view.onChange} options={view.options || [{ value: 'grid', label: 'Grid' }, { value: 'table', label: 'Table' }]} /> : null}
        {sort ? (
          <Menu label="Sort" placement="bottom-end" trigger={<Button size="sm" icon="sort" caret aria-label={'Sort: ' + sort.value}>{'Sort: ' + sort.value}</Button>}>
            {sort.options.map((o) => <MenuItem key={o} checked={sort.value === o} onSelect={() => sort.onChange(o)}>{o}</MenuItem>)}
          </Menu>
        ) : null}
      </div>
      {bulk}
      <div className="plx-search-ws__body">
        {count ? children : <EmptyState size="inline">{query ? 'Nothing matches “' + query + '”' + (chips.length ? ' with these filters' : '') + '.' : 'Nothing matches these filters.'}</EmptyState>}
      </div>
    </section>
  );
}
