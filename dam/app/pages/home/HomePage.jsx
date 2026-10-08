/* Plenix asset app · home page (app/pages/home/HomePage.jsx): browse categories and collections, search assets.
   Replaces the HTML of index.html, its dialogs partial and the home-page code of plenix.js (batch 111).
   Views: categories and collections (cards or a table; a category's details on the right) and search results (asset
   cards or a table; the chosen asset's details on the right). Panes: Files (the folder tree), the sidebar, the content,
   the details pane. The sidebar is the shell's side navigation and the details pane its panel: the AppShell collapses,
   resizes and (below 1024px) overlays them.
   The address: ?q=text opens the search results for it; ?upload=1 opens the upload dialog (the header on other pages
   links here). Dialogs are opened by their legacy ids from app/dialogs (one host renders the open one). */
import React from 'react';
import { DataToolbar, BulkActions, ContentGrid, MediaCard, Table, Pagination, SegmentedControl, Button, Menu, MenuItem, MenuDivider, Badge, Icon, MediaViewer, Tree, useToast, SearchWorkspace, SidePanel, below, Stack, Inline, Text, Thumbnail, SecondaryPane, PageContent, DropZone } from 'plenix-platform';
import { AssetPage } from '../../shell/AssetShell.jsx';
import { Sidebar } from './Sidebar.jsx';
import { CategoryInspector, AssetInspector, InspectorFooter } from './Inspector.jsx';
import * as D from './homeData.js';
import { DIALOGS as BROWSE_DIALOGS } from '../../dialogs/BrowseDialogs.jsx';
import { DIALOGS as UPLOAD_DIALOGS } from '../../dialogs/UploadDialog.jsx';
import { DIALOGS as METADATA_DIALOGS } from '../../dialogs/MetadataFilterDialog.jsx';
import { DIALOGS as BULK_DIALOGS, bulkDialogFor, bulkComingSoon } from '../../dialogs/BulkDialogs.jsx';

const DIALOGS = { ...BROWSE_DIALOGS, ...UPLOAD_DIALOGS, ...METADATA_DIALOGS, ...BULK_DIALOGS };
const GRID_SIZE = { S: 'xs', M: 'sm', L: 'md' };

function useNarrow() {
  const q = '(max-width: 56.25rem)';
  const [narrow, setNarrow] = React.useState(() => window.matchMedia(q).matches);
  React.useEffect(() => { const m = window.matchMedia(q); const on = () => setNarrow(m.matches); m.addEventListener('change', on); return () => m.removeEventListener('change', on); }, []);
  return narrow;
}

/* sorting the tables as the legacy sortTable did: numbers, sizes, dates or text */
const parseSize = (s) => { const m = /([\d.]+)\s*(KB|MB|GB|TB|B)/i.exec(s || ''); if (!m) return 0; const v = parseFloat(m[1]); return v * ({ TB: 1e12, GB: 1e9, MB: 1e6, KB: 1e3, B: 1 })[m[2].toUpperCase()]; };
function sortRows(rows, sort, types) {
  if (!sort) return rows;
  const t = types[sort.key] || 'text';
  const val = (r) => (t === 'num' ? parseFloat(String(r[sort.key]).replace(/,/g, '')) || 0 : t === 'size' ? parseSize(r[sort.key]) : t === 'date' ? new Date(r[sort.key]).getTime() : String(r[sort.key]));
  return rows.slice().sort((a, b) => { const x = val(a), y = val(b); const r = typeof x === 'string' ? x.localeCompare(y) : x - y; return sort.direction === 'ascending' ? r : -r; });
}
const ThumbName = ({ src, icon, name }) => <Inline><Thumbnail src={src} icon={icon} />{name}</Inline>;

function FilesPane({ onUpload, onClose }) {
  const [nodes, setNodes] = React.useState(D.FOLDERS);
  const [selected, setSelected] = React.useState('all');
  const [open, setOpen] = React.useState(D.FOLDERS_OPEN);
  const [adding, setAdding] = React.useState(false);
  const [name, setName] = React.useState('');
  const add = () => {
    const label = name.trim(); if (!label) { setAdding(false); return; }
    const node = { id: selected + '/' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label, icon: 'folder' };
    const put = (list) => list.map((n) => (n.id === selected ? { ...n, children: (n.children || []).concat(node) } : (n.children ? { ...n, children: put(n.children) } : n)));
    setNodes(put(nodes)); setOpen(open.indexOf(selected) < 0 ? open.concat(selected) : open); setName(''); setAdding(false);
  };
  return (
    <SecondaryPane title="Files" icon="folder-open" actions={<>
      <Button size="sm" variant="primary" icon="upload" onClick={onUpload}>Upload</Button>
      <Button size="sm" variant="ghost" iconOnly icon="close" label="Close files pane" onClick={onClose} />
    </>}>
      <Tree label="Folders" nodes={nodes} selected={selected} onSelect={setSelected} expanded={open} onExpandedChange={setOpen} />
      {adding ? (
        <input className="plx-input" autoFocus value={name} placeholder="Folder name..." aria-label="New folder name" onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') add(); if (e.key === 'Escape') { setName(''); setAdding(false); } }} onBlur={() => { if (!name.trim()) setAdding(false); }} />
      ) : <div><Button size="xs" variant="ghost" icon="plus" onClick={() => setAdding(true)}>New folder</Button></div>}
    </SecondaryPane>
  );
}

// the Search workspace: which assets match a query and filters, and in which order
const FIND_EMPTY = { query: '', filters: {}, sort: 'Relevance', saved: null };
const MONTH = (d) => d.replace(/ \d+,/, '');   // "Aug 12, 2026" → "Aug 2026"
function findAssets(f) {
  const words = f.query.toLowerCase().split(/\s+/).filter(Boolean);
  const v = f.filters;
  const list = D.ASSETS.filter((a) => {
    const hay = [a.name, a.file, a.cat, a.fmt, a.owner].concat(a.tags).join(' ').toLowerCase();
    if (words.some((w) => hay.indexOf(w) < 0)) return false;
    if ((v.type || []).length && v.type.indexOf(a.badge) < 0) return false;
    if ((v.cat || []).length && v.cat.indexOf(a.cat) < 0) return false;
    if ((v.tags || []).length && !v.tags.every((t) => a.tags.indexOf(t) >= 0)) return false;
    if (v.owner && a.owner !== v.owner) return false;
    if (v.status && a.status !== v.status) return false;
    if (v.date && MONTH(a.date) !== v.date) return false;
    return true;
  });
  const by = { Newest: (a, b) => Date.parse(b.date) - Date.parse(a.date), Oldest: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    'Name A–Z': (a, b) => a.name.localeCompare(b.name), 'Name Z–A': (a, b) => b.name.localeCompare(a.name), Size: (a, b) => parseFloat(b.size) - parseFloat(a.size) }[f.sort];
  return by ? list.slice().sort(by) : list;
}
const opts = (values) => Array.from(new Set(values)).sort().map((x) => ({ value: x, label: x, count: values.filter((y) => y === x).length }));

export function HomePage() {
  const toast = useToast();
  const act = (msg, tone = 'info') => () => toast.show(msg, { tone });
  const narrow = useNarrow();
  const params = React.useMemo(() => new URLSearchParams(location.search), []);
  const [view, setView] = React.useState(params.get('q') !== null ? 'find' : 'categories');
  const [find, setFind] = React.useState({ ...FIND_EMPTY, query: params.get('q') || '' });
  const [saved, setSaved] = React.useState(D.SAVED_SEARCHES);
  const [query, setQuery] = React.useState(params.get('q') || '');
  const [heading, setHeading] = React.useState('');
  const [active, setActive] = React.useState('All Categories');
  const [mode, setMode] = React.useState('grid');
  const [size, setSize] = React.useState('L');
  const [sortLabel, setSortLabel] = React.useState('Sort');
  const [tableSort, setTableSort] = React.useState(null);
  const [selCats, setSelCats] = React.useState([]);
  const [selAssets, setSelAssets] = React.useState([]);
  const [asset, setAsset] = React.useState(null);
  const [viewer, setViewer] = React.useState(null);
  const [files, setFiles] = React.useState(false);
  // the Details panel starts closed where it would cover the content (below 1024px) and opens when an asset is chosen
  const [right, setRight] = React.useState(() => ({ collapsed: window.matchMedia(below('--plx-sys-shell-inspector-overlay-below')).matches }));
  const [dialog, setDialog] = React.useState(params.get('upload') ? { id: 'uploadModal', props: {} } : null);
  const [filters, setFilters] = React.useState({});
  const [dragging, setDragging] = React.useState(0);

  const openDialog = (id, props = {}) => setDialog({ id, props });
  const browse = view === 'categories' || view === 'collections';
  const collections = view === 'collections';

  const showView = (v) => { setView(v); setFiles(false); setSelCats([]); setTableSort(null); };
  const openCategory = (name) => { setView('search'); setHeading(name); setQuery(''); setSelAssets([]); setActive(name); setTableSort(null); };
  // the Search workspace: opened from the header search (Enter) with the query, or from a saved search with its criteria
  const openFind = (f) => { setFind({ ...FIND_EMPTY, ...f }); setView('find'); setFiles(false); setSelAssets([]); setTableSort(null); };
  const onSidebar = (kind, name) => {
    setActive(name);
    if (kind === 'saved') { const s = saved.find((x) => x.name === name); openFind({ query: s ? s.query : '', filters: s ? s.filters : {}, saved: name }); return; }
    if (kind === 'categories' && name === 'All Categories') showView('categories');
    else if (kind === 'collections' && name === 'All Collections') showView('collections');
    else openCategory(name);
  };
  const search = (q) => { setQuery(q); setActive(null); openFind({ query: q }); };
  const bulk = (action) => {
    const d = bulkDialogFor(action);
    if (!d) { toast.show(bulkComingSoon(action), { tone: 'info' }); return; }
    const count = d.kind === 'category' ? selCats.length || 1 : selAssets.length || 1;
    const names = d.kind === 'category' ? D.CATEGORY_CARDS.filter((c) => selCats.indexOf(c.id) >= 0).map((c) => c.name) : [];
    openDialog(d.id, { count, kind: d.kind, itemName: names[0], onCreateCollection: () => openDialog('newCollectionModal') });
  };
  const toggle = (list, setList, id) => setList(list.indexOf(id) >= 0 ? list.filter((x) => x !== id) : list.concat(id));
  const setFilter = (k) => (v) => setFilters({ ...filters, [k]: v });
  const hasFilter = (k) => { const v = filters[k]; return Array.isArray(v) ? v.length > 0 : !!(v && (v.types || v.fields) && ((v.fields && Object.keys(v.fields).length) || (v.types && v.types.indexOf('all') < 0))); };

  const assetsSel = D.ASSETS.filter((a) => selAssets.indexOf(a.id) >= 0);
  const current = asset === null ? null : D.ASSETS[asset];

  /* ── the toolbar above the results: filters, sort, view, size, reset, save ── */
  const toolbar = (
    <DataToolbar label="View and filter options"
      start={<>
        {narrow ? <Button size="sm" icon="filter" caret onClick={() => openDialog('mergedFilterModal', { tab: 'categories', value: { categories: filters.categories, type: filters.type, tags: filters.tags }, onApply: (v) => setFilters({ ...filters, ...v }) })}>Filters</Button> : <>
          <Button size="sm" icon="grid-2x2" caret selected={hasFilter('categories')} onClick={() => openDialog('categoriesFilterModal', { value: filters.categories, onApply: setFilter('categories') })}>Categories</Button>
          <Button size="sm" icon="image-b" caret selected={hasFilter('type')} onClick={() => openDialog('typeFilterModal', { value: filters.type, onApply: setFilter('type') })}>Type</Button>
          <Button size="sm" icon="tags" caret selected={hasFilter('tags')} onClick={() => openDialog('tagsFilterModal', { value: filters.tags, onApply: setFilter('tags') })}>Tags</Button>
        </>}
        <Button size="sm" icon="settings-customize" selected={hasFilter('metadata')} onClick={() => openDialog('metadataModal', { value: filters.metadata, onApply: setFilter('metadata') })}>Advanced</Button>
        <Menu label="Sort" trigger={<Button size="sm" icon="sort" caret aria-label={sortLabel === 'Sort' ? 'Sort' : 'Sort: ' + sortLabel}>{sortLabel}</Button>}>
          {D.SORT_OPTIONS.map((o) => <MenuItem key={o} checked={sortLabel === o} onSelect={() => setSortLabel(o)}>{o}</MenuItem>)}
          <MenuDivider />
          <MenuItem onSelect={() => openDialog('advancedSortModal', { onApply: (v) => setSortLabel(v.field) })}>Advanced Sort…</MenuItem>
        </Menu>
      </>}
      end={<>
        <SegmentedControl label="View" value={mode} onChange={setMode} options={[{ value: 'grid', label: 'Grid' }, { value: 'table', label: 'Table' }]} />
        {mode === 'grid' ? <SegmentedControl label="Card size" value={size} onChange={setSize} options={[{ value: 'S', label: 'S' }, { value: 'M', label: 'M' }, { value: 'L', label: 'L' }]} /> : null}
        <Button size="sm" iconOnly icon="close" label="Reset filters" onClick={() => { setFilters({}); setSortLabel('Sort'); toast.show('Reset filters', { tone: 'info' }); }} />
        <Button size="sm" iconOnly icon="save" label="Save current search" onClick={() => openDialog('saveSearchModal')} />
      </>} />
  );

  /* ── bulk actions ── */
  const catBulk = (
    <BulkActions count={selCats.length} total={D.CATEGORY_CARDS.length} noun="category" plural="categories" onSelectAll={() => setSelCats(D.CATEGORY_CARDS.map((c) => c.id))} onClear={() => setSelCats([])}
      label="Category actions" actions={[
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [{ id: 'd', label: 'Download', onSelect: () => bulk('Download Category') }, { id: 'da', label: 'Download as', onSelect: () => bulk('Download Category as') }] },
        { id: 'del', label: 'Delete', icon: 'trash-detail', danger: true, onSelect: () => bulk('Delete Category') },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move Category') },
        { id: 'rename', label: 'Rename', icon: 'rename', single: true, onSelect: () => bulk('Rename Category') },
        { id: 'meta', label: 'Edit Metadata', icon: 'fields', single: true, onSelect: () => bulk('Edit Category') },
        { id: 'status', label: 'Change Status', icon: 'circle-check', onSelect: () => bulk('Change Category Status') },
        { id: 'share', label: 'Share', icon: 'share', onSelect: () => bulk('Share Category') },
      ]} />
  );
  const item = (label, action, extra) => ({ id: action, label, onSelect: () => bulk(action), ...extra });
  const assetBulk = (
    <BulkActions count={selAssets.length} total={D.ASSETS.length} noun="asset" onSelectAll={() => setSelAssets(D.ASSETS.map((a) => a.id))} onClear={() => setSelAssets([])}
      label="Asset actions" actions={[
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [item('Download', 'Download'), item('Download as', 'Download as')] },
        { id: 'edit', label: 'Edit', icon: 'fields', items: [item('Multi Edit', 'Multi Edit'), item('Edit Image', 'Edit Image', { single: true }), item('Update Metadata', 'Update Metadata'), item('Approve', 'Approve'), item('Reject', 'Reject'), item('Export', 'Export'), item('Delete Selected Assets', 'Delete', { danger: true }), item('Print Assets', 'Print Assets')] },
        { id: 'add', label: 'Add To', icon: 'briefcase-plus', items: [item('Cart', 'Add to Cart'), item('Bookmarks', 'Add to Bookmarks'), item('Document', 'Add to Document'), item('Person', 'Add to Person'), item('Categories', 'Add to Categories'), item('Collections', 'Add to Collections'), item('Media Profile', 'Add to Media Profile')] },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move') },
        { id: 'share', label: 'Share', icon: 'share', items: [item('Email Assets', 'Email Assets'), item('Publish Assets to Server', 'Publish Assets to Server')] },
        { id: 'publish', label: 'Publish', icon: 'upload', onSelect: () => bulk('Publish') },
        { id: 'thumb', label: 'Regenerate Thumbnail', icon: 'image-b-2', single: true, onSelect: () => bulk('Regenerate Thumbnail') },
      ]} />
  );

  const found = findAssets(find);
  // Save search: keeps the query and filters under a name in the left navigation's Saved Searches
  const saveSearch = () => openDialog('saveSearchModal', { onSave: (v) => {
    const name = (v.name || '').trim() || (find.query ? 'Search: ' + find.query : 'Saved search');
    setSaved(saved.filter((x) => x.name !== name).concat([{ name, query: find.query, filters: find.filters }]));
    if (view === 'find') setFind({ ...find, saved: name });
    setActive(name);
  } });
  const setFindFilter = (id, value) => setFind({ ...find, filters: { ...find.filters, [id]: value }, saved: null });
  const filterDefs = [
    { id: 'type', label: 'Type', multiple: true, options: opts(D.ASSETS.map((a) => a.badge)), value: find.filters.type || [] },
    { id: 'cat', label: 'Category', multiple: true, options: opts(D.ASSETS.map((a) => a.cat)), value: find.filters.cat || [] },
    { id: 'tags', label: 'Tags', multiple: true, options: opts([].concat.apply([], D.ASSETS.map((a) => a.tags))), value: find.filters.tags || [] },
    { id: 'owner', label: 'Owner', options: opts(D.ASSETS.map((a) => a.owner)), value: find.filters.owner || null },
    { id: 'date', label: 'Date', options: opts(D.ASSETS.map((a) => MONTH(a.date))), value: find.filters.date || null },
    { id: 'status', label: 'Status', options: opts(D.ASSETS.map((a) => a.status)), value: find.filters.status || null },
  ];

  /* ── content ── */
  let content;
  if (view === 'categories') {
    content = mode === 'grid' ? (
      <ContentGrid size={GRID_SIZE[size]} label="Categories">
        {D.CATEGORY_CARDS.map((c) => (
          <MediaCard key={c.id} src={c.thumb} title={c.name} meta={c.count + ' assets'} selected={selCats.indexOf(c.id) >= 0} selecting={selCats.length > 0}
            onSelectChange={() => toggle(selCats, setSelCats, c.id)} selectLabel={'Select ' + c.name} onOpen={() => openCategory(c.name)}
            actions={<Menu label={'Options for ' + c.name} placement="bottom-end" trigger={<Button size="xs" variant="ghost" iconOnly icon="menu-lines" label={'Options for ' + c.name} />}>
              {D.CARD_MENU.map(([icon, label, msg]) => <MenuItem key={label} icon={icon} danger={label === 'Delete'} onSelect={act(msg, 'info')}>{label}</MenuItem>)}
            </Menu>} />
        ))}
      </ContentGrid>
    ) : (
      <Table caption="Categories" pinFirst selectable selected={selCats} onSelectionChange={setSelCats} sort={tableSort} onSortChange={setTableSort} onRowClick={(r) => openCategory(r.name)}
        rows={sortRows(D.CATEGORY_CARDS, tableSort, { count: 'num', modified: 'date' })} columns={[
          { key: 'name', header: 'Category Name', sortable: true, emphasis: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
          { key: 'count', header: 'Assets', sortable: true, data: true }, { key: 'modified', header: 'Modified', sortable: true, data: true },
          { key: 'status', header: 'Status', sortable: true, render: (r) => <Badge tone="success">{r.status}</Badge> }]} />
    );
  } else if (view === 'collections') {
    content = mode === 'grid' ? (
      <ContentGrid size={GRID_SIZE[size]} label="Collections">
        {D.COLLECTION_CARDS.map((c) => <MediaCard key={c.id} icon="briefcase" title={c.name} meta={c.count + ' assets'} onOpen={() => openCategory(c.name)} />)}
      </ContentGrid>
    ) : (
      <Table caption="Collections" pinFirst sort={tableSort} onSortChange={setTableSort} onRowClick={(r) => openCategory(r.name)}
        rows={sortRows(D.COLLECTION_CARDS, tableSort, { count: 'num', updated: 'date' })} columns={[
          { key: 'name', header: 'Collection Name', sortable: true, emphasis: true, render: (r) => <ThumbName icon="briefcase" name={r.name} /> },
          { key: 'count', header: 'Assets', sortable: true, data: true }, { key: 'updated', header: 'Updated', sortable: true, data: true }, { key: 'owner', header: 'Owner', sortable: true }]} />
    );
  } else {
    const list = view === 'find' ? found : D.ASSETS;
    content = mode === 'grid' ? (
      <ContentGrid size={GRID_SIZE[size]} label="Search results">
        {list.map((a) => (
          <MediaCard key={a.id} src={a.thumb} title={a.name} meta={a.cat} badge={<Icon name={a.typeIcon} size="md" label={a.badge} />}
            selected={selAssets.indexOf(a.id) >= 0} selecting={selAssets.length > 0} onSelectChange={() => toggle(selAssets, setSelAssets, a.id)} selectLabel={'Select ' + a.name}
            onOpen={() => { setAsset(a.id); setRight((r) => ({ ...r, collapsed: false })); }} aria-current={asset === a.id ? 'true' : undefined} />
        ))}
      </ContentGrid>
    ) : (
      <Table caption="Search results" pinFirst selectable selected={selAssets} onSelectionChange={setSelAssets} sort={tableSort} onSortChange={setTableSort} onRowClick={(r) => setAsset(r.id)}
        rows={sortRows(list, tableSort, { size: 'size', date: 'date' })} columns={[
          { key: 'name', header: 'Name', sortable: true, emphasis: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
          { key: 'cat', header: 'Category', sortable: true, render: (r) => <Inline gap="xs"><Icon name="folder" size="xs" />{r.cat}</Inline> },
          { key: 'badge', header: 'Format', sortable: true }, { key: 'size', header: 'Size', sortable: true, data: true }, { key: 'date', header: 'Date Added', sortable: true, data: true },
          { key: 'status', header: 'Status', sortable: true, render: (r) => <Badge tone={r.status === 'Complete' ? 'success' : 'neutral'}>{r.status}</Badge> }]} />
    );
  }
  const pagination = view === 'categories' ? <Pagination page={1} pageCount={3} total={D.CATEGORY_TOTAL} perPage={16} perPageOptions={[16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />
    : view === 'collections' ? <Text as="p" variant="secondary">Showing 1–4 of 4 collections</Text>
      : view === 'find' ? null
      : <Pagination page={1} pageCount={27} total={D.ASSET_TOTAL} perPage={8} perPageOptions={[8, 16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />;

  const title = view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : (heading || 'Search Results');
  const countText = view === 'categories' ? D.CATEGORY_COUNT_LABEL : view === 'collections' ? D.COLLECTION_CARDS.length + ' collections'
    : heading === 'Search Results' ? D.SEARCH_COUNT + ' assets found for "' + (query || D.SEARCH_QUERY) + '"' : '';

  /* ── panes ── */
  const sidebar = <Sidebar mode={view === 'search' ? 'search' : 'browse'} active={active} saved={saved} onRemoveSaved={(n) => setSaved(saved.filter((x) => x.name !== n))} onOpen={onSidebar} onAdd={(id) => (id === 'saveSearchModal' ? saveSearch() : openDialog(id))}
    onFiles={() => setFiles(!files)} filesOpen={files} />;
  const details = browse ? <CategoryInspector collection={collections} act={act} onDialog={(id) => openDialog(id)} />
    : <AssetInspector asset={current} act={act} onDialog={(id) => openDialog(id)} onPreview={() => setViewer(asset)} />;
  const filesPane = <FilesPane onUpload={() => openDialog('uploadModal')} onClose={() => setFiles(false)} />;

  const dropHandlers = {
    onDragEnter: (e) => { e.preventDefault(); setDragging((n) => n + 1); },
    onDragLeave: (e) => { e.preventDefault(); setDragging((n) => Math.max(0, n - 1)); },
    onDragOver: (e) => e.preventDefault(),
    onDrop: (e) => { e.preventDefault(); setDragging(0); const n = e.dataTransfer.files.length; if (n) toast.show(n + ' file(s) ready to upload', { tone: 'success' }); },
  };

  const Current = dialog && DIALOGS[dialog.id];
  const panel = <SidePanel title="Details" label={browse ? 'Details' : 'Asset details'} icon="circle-info" open={!right.collapsed}
    onOpenChange={(o) => setRight({ ...right, collapsed: !o })} collapseLabel="Minimize panel" footer={<InspectorFooter act={act} />}>{details}</SidePanel>;
  return (
    <AssetPage title="Assets" query={view === 'find' ? find.query : query} onSearch={search} sideNav={sidebar} panel={panel} onUpload={() => openDialog('uploadModal')}>
      <Inline gap="none" align="stretch" grow>
        {files ? filesPane : null}
        <PageContent aria-labelledby="home-title" {...(browse ? dropHandlers : {})}>
          {view === 'find' ? (
            <SearchWorkspace title={find.saved || (find.query ? 'Search results' : 'Search')} query={find.query} onQueryChange={(q) => setFind({ ...find, query: q, saved: null })}
              placeholder="Search assets by name, filename, metadata…" noun="asset" count={found.length}
              filters={filterDefs} onFilterChange={setFindFilter} onClearAll={() => setFind({ ...find, filters: {}, saved: null })}
              sort={{ value: find.sort, options: ['Relevance', 'Newest', 'Oldest', 'Name A–Z', 'Name Z–A', 'Size'], onChange: (o) => setFind({ ...find, sort: o }) }}
              view={{ value: mode, onChange: setMode }}
              onSave={saveSearch}
              bulk={assetBulk}>
              {content}
            </SearchWorkspace>
          ) : <>
          <Inline gap="md" wrap>
            <Inline gap="md" wrap grow>
              <Text as="h2" id="home-title" variant="title">{title}</Text>
              {countText ? <Text variant="secondary">{countText}</Text> : null}
            </Inline>
            {view === 'categories' ? <Button size="sm" variant="primary" onClick={() => openDialog('newCatModal')}>+ New Category</Button> : null}
            {view === 'collections' ? <Button size="sm" variant="primary" onClick={() => openDialog('newCollectionModal')}>+ New Collection</Button> : null}
          </Inline>
          {toolbar}
          {view === 'categories' ? catBulk : null}
          {view === 'search' ? assetBulk : null}
          {content}
          {pagination}
          </>}
          {dragging ? (
            <DropZone overlay aria-hidden="true">
              <Icon name="upload" size="lg" />
              <Text variant="strong">Drop files to upload</Text>
              <Text variant="secondary">SVG, PNG, JPG, AI, PSD up to 200 MB</Text>
            </DropZone>
          ) : null}
        </PageContent>
      </Inline>
      <MediaViewer open={viewer !== null} onClose={() => setViewer(null)} label="Asset preview" index={viewer === null ? 0 : viewer} onIndexChange={setViewer}
        items={D.ASSETS.map((a) => ({ src: a.thumb, alt: a.name, title: a.name, meta: [a.cat, a.size, a.dims, a.fmt] }))}
        actions={['download-tray:Download', 'share:Share', 'pencil:Edit', 'circle-info:Info'].map((s) => { const [ic, l] = s.split(':'); return (
          <button key={l} type="button" className="plx-media-viewer__control" onClick={() => setViewer(null)}><Icon name={ic} size="sm" />{l}</button>); })} />
      {Current ? <Current open onClose={() => setDialog(null)} {...dialog.props} /> : null}
    </AssetPage>
  );
}
