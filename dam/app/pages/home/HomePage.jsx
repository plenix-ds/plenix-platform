/* Plenix asset app · home page (app/pages/home/HomePage.jsx): browse categories and collections, search assets.
   Replaces the HTML of index.html, its dialogs partial and the home-page code of plenix.js (batch 111).
   Views: categories and collections (cards or a table; a category's details on the right) and search results (asset
   cards or a table; the chosen asset's details on the right). Panes: Files (the folder tree), the sidebar, the content,
   the details pane. The sidebar is the shell's side navigation and the details pane its panel: the AppShell collapses,
   resizes and (below 1024px) overlays them.
   The address (Platforms Standard 4.3): each view is a screen with a history entry: #/ (categories), #/collections,
   #/category/<name>, #/search?q=<text>, #/saved/<name>, and ?asset=<id> on any of them for the open asset; the last
   screen is restored on load (plenix.assets.view). ?q=text (the header on other pages links here) names the search
   screen; ?upload=1 opens the upload dialog. Dialogs are opened by their legacy ids from app/dialogs (one host renders
   the open one). */
import React from 'react';
import { DataToolbar, BulkActions, ContentGrid, MediaCard, DataTable, Pagination, SegmentedControl, Button, Menu, MenuItem, MenuDivider, Badge, Icon, MediaViewer, Tree, useToast, SearchWorkspace, SidePanel, below, Stack, Inline, Text, Thumbnail, SecondaryPane, PageContent, DropZone, useScreenLocation, screenHref } from 'plenix-platform';
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

/* the grids' sorters (Tabulator sorter functions): numbers written with commas, file sizes, dates */
const parseSize = (s) => { const m = /([\d.]+)\s*(KB|MB|GB|TB|B)/i.exec(s || ''); if (!m) return 0; const v = parseFloat(m[1]); return v * ({ TB: 1e12, GB: 1e9, MB: 1e6, KB: 1e3, B: 1 })[m[2].toUpperCase()]; };
const byNumber = (a, b) => (parseFloat(String(a).replace(/,/g, '')) || 0) - (parseFloat(String(b).replace(/,/g, '')) || 0);
const bySize = (a, b) => parseSize(a) - parseSize(b);
const byDate = (a, b) => new Date(a).getTime() - new Date(b).getTime();
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
    // the Files pane: it resizes, folds to a rail and closes (the Asset Manager lets people close it; batch 259)
    <SecondaryPane title="Files" icon="folder-open" collapsible resizable onClose={onClose} strings={{ close: 'Close files pane' }}
      actions={<Button size="sm" variant="primary" icon="upload" onClick={onUpload}>Upload</Button>}>
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

// ?q=text from another page names the search screen (in place: it is where the person arrived, not a move)
function nameSearchScreen() {
  const q = new URLSearchParams(location.search).get('q');
  if (q !== null && !location.hash) history.replaceState(history.state, '', location.pathname + location.search + screenHref(['search'], { q }));
}

export function HomePage() {
  nameSearchScreen();
  const loc = useScreenLocation({ app: 'assets' });
  const toast = useToast();
  const act = (msg, tone = 'info') => () => toast.show(msg, { tone });
  const narrow = useNarrow();
  const params = React.useMemo(() => new URLSearchParams(location.search), []);
  const [view, setView] = React.useState(params.get('q') !== null ? 'find' : 'categories');
  const [find, setFind] = React.useState({ ...FIND_EMPTY, query: params.get('q') || '' });
  const [saved, setSaved] = React.useState(D.SAVED_SEARCHES);
  const [query, setQuery] = React.useState(params.get('q') || '');
  const [heading, setHeading] = React.useState('');
  const [active, setActive] = React.useState('All categories');
  const [mode, setMode] = React.useState('grid');
  const [size, setSize] = React.useState('L');
  const [sortLabel, setSortLabel] = React.useState('Sort');
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

  // the screen named by the address: the view (with its category, search or saved search), then the open asset
  const viewKey = loc.parts.join('/') + '?' + (loc.params.q || '');
  React.useLayoutEffect(() => {
    const [top, name] = loc.parts;
    setFiles(false); setSelCats([]); setSelAssets([]);
    if (top === 'collections') { setView('collections'); setActive('All collections'); }
    else if (top === 'category' && name) { setView('search'); setHeading(name); setQuery(''); setActive(name); }
    else if (top === 'search') { const q = loc.params.q || ''; setQuery(q); setActive(null); setFind({ ...FIND_EMPTY, query: q }); setView('find'); }
    else if (top === 'saved' && name) { const s = saved.find((x) => x.name === name); setActive(name); setFind({ ...FIND_EMPTY, query: s ? s.query : '', filters: s ? s.filters : {}, saved: name }); setView('find'); }
    else { setView('categories'); setActive('All categories'); }
  }, [viewKey]);
  React.useLayoutEffect(() => {
    const a = loc.params.asset;
    setAsset(a === undefined ? null : +a);
    if (a !== undefined) setRight((r) => ({ ...r, collapsed: false }));
  }, [loc.params.asset]);
  // each is a new screen (a history entry)
  const showView = (v) => loc.navigate(v === 'collections' ? ['collections'] : '/');
  const openCategory = (name) => loc.navigate(['category', name]);
  // the Search workspace: opened from the header search (Enter) with the query, or from a saved search with its criteria
  const openFind = (f) => (f.saved ? loc.navigate(['saved', f.saved]) : loc.navigate(['search'], { q: f.query || '' }));
  const openAsset = (id) => loc.navigate(loc.parts, Object.assign({}, loc.params, { asset: id }));
  const onSidebar = (kind, name) => {
    if (kind === 'saved') { openFind({ saved: name }); return; }
    if (kind === 'categories' && name === 'All categories') showView('categories');
    else if (kind === 'collections' && name === 'All collections') showView('collections');
    else openCategory(name);
  };
  const search = (q) => openFind({ query: q });
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
        <SegmentedControl label="View" value={mode} onChange={setMode} options={[{ value: 'grid', label: 'Grid', icon: 'grid-3x2' }, { value: 'table', label: 'Table', icon: 'view-table' }]} />
        {mode === 'grid' ? <SegmentedControl label="Card size" value={size} onChange={setSize} options={[{ value: 'S', label: 'S', icon: 'cards-small', ariaLabel: 'Small cards' }, { value: 'M', label: 'M', icon: 'cards-medium', ariaLabel: 'Medium cards' }, { value: 'L', label: 'L', icon: 'cards-large', ariaLabel: 'Large cards' }]} /> : null}
        <Button size="sm" iconOnly icon="close" label="Reset filters" onClick={() => { setFilters({}); setSortLabel('Sort'); toast.show('Reset filters', { tone: 'info' }); }} />
        <Button size="sm" iconOnly icon="save" label="Save current search" onClick={() => openDialog('saveSearchModal')} />
      </>} />
  );

  /* ── bulk actions ── */
  const catBulk = (
    <BulkActions count={selCats.length} total={D.CATEGORY_CARDS.length} noun="category" plural="categories" onSelectAll={() => setSelCats(D.CATEGORY_CARDS.map((c) => c.id))} onClear={() => setSelCats([])}
      label="Category actions" actions={[
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [{ id: 'd', label: 'Download', onSelect: () => bulk('Download category') }, { id: 'da', label: 'Download as', onSelect: () => bulk('Download Category as') }] },
        { id: 'del', label: 'Delete', icon: 'trash-detail', danger: true, onSelect: () => bulk('Delete category') },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move category') },
        { id: 'rename', label: 'Rename', icon: 'rename', single: true, onSelect: () => bulk('Rename category') },
        { id: 'meta', label: 'Edit metadata', icon: 'fields', single: true, onSelect: () => bulk('Edit category') },
        { id: 'status', label: 'Change status', icon: 'circle-check', onSelect: () => bulk('Change category status') },
        { id: 'share', label: 'Share', icon: 'share', onSelect: () => bulk('Share category') },
      ]} />
  );
  const item = (label, action, extra) => ({ id: action, label, onSelect: () => bulk(action), ...extra });
  const assetBulk = (
    <BulkActions count={selAssets.length} total={D.ASSETS.length} noun="asset" onSelectAll={() => setSelAssets(D.ASSETS.map((a) => a.id))} onClear={() => setSelAssets([])}
      label="Asset actions" actions={[
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [item('Download', 'Download'), item('Download as', 'Download as')] },
        { id: 'edit', label: 'Edit', icon: 'fields', items: [item('Multi edit', 'Multi edit'), item('Edit image', 'Edit image', { single: true }), item('Update metadata', 'Update metadata'), item('Approve', 'Approve'), item('Reject', 'Reject'), item('Export', 'Export'), item('Delete selected assets', 'Delete', { danger: true }), item('Print assets', 'Print assets')] },
        { id: 'add', label: 'Add to', icon: 'briefcase-plus', items: [item('Cart', 'Add to Cart'), item('Bookmarks', 'Add to Bookmarks'), item('Document', 'Add to Document'), item('Person', 'Add to Person'), item('Categories', 'Add to Categories'), item('Collections', 'Add to Collections'), item('Media profile', 'Add to Media Profile')] },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move') },
        { id: 'share', label: 'Share', icon: 'share', items: [item('Email assets', 'Email assets'), item('Publish Assets to Server', 'Publish Assets to Server')] },
        { id: 'publish', label: 'Publish', icon: 'upload', onSelect: () => bulk('Publish') },
        { id: 'thumb', label: 'Regenerate thumbnail', icon: 'image-b-2', single: true, onSelect: () => bulk('Regenerate thumbnail') },
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
      <DataTable label="Categories" data={D.CATEGORY_CARDS} selectable selected={selCats} onSelectionChange={setSelCats} on={{ rowClick: (e, row) => openCategory(row.getData().name) }} columns={[
        { title: 'Category name', field: 'name', kind: 'name', frozen: true, filter: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
        { title: 'Assets', field: 'count', kind: 'data', sorter: byNumber }, { title: 'Modified', field: 'modified', kind: 'data', sorter: byDate },
        { title: 'Status', field: 'status', kind: 'center', filter: 'list', render: (r) => <Badge tone="success">{r.status}</Badge> }]} />
    );
  } else if (view === 'collections') {
    content = mode === 'grid' ? (
      <ContentGrid size={GRID_SIZE[size]} label="Collections">
        {D.COLLECTION_CARDS.map((c) => <MediaCard key={c.id} icon="briefcase" title={c.name} meta={c.count + ' assets'} onOpen={() => openCategory(c.name)} />)}
      </ContentGrid>
    ) : (
      <DataTable label="Collections" data={D.COLLECTION_CARDS} on={{ rowClick: (e, row) => openCategory(row.getData().name) }} columns={[
        { title: 'Collection name', field: 'name', kind: 'name', frozen: true, filter: true, render: (r) => <ThumbName icon="briefcase" name={r.name} /> },
        { title: 'Assets', field: 'count', kind: 'data', sorter: byNumber }, { title: 'Updated', field: 'updated', kind: 'data', sorter: byDate }, { title: 'Owner', field: 'owner', filter: 'list' }]} />
    );
  } else {
    const list = view === 'find' ? found : D.ASSETS;
    content = mode === 'grid' ? (
      <ContentGrid size={GRID_SIZE[size]} label="Search results">
        {list.map((a) => (
          <MediaCard key={a.id} src={a.thumb} title={a.name} meta={a.cat} badge={<Icon name={a.typeIcon} size="md" label={a.badge} />}
            selected={selAssets.indexOf(a.id) >= 0} selecting={selAssets.length > 0} onSelectChange={() => toggle(selAssets, setSelAssets, a.id)} selectLabel={'Select ' + a.name}
            onOpen={() => openAsset(a.id)} aria-current={asset === a.id ? 'true' : undefined} />
        ))}
      </ContentGrid>
    ) : (
      <DataTable label="Search results" data={list} selectable selected={selAssets} onSelectionChange={setSelAssets} on={{ rowClick: (e, row) => openAsset(row.getData().id) }} columns={[
        { title: 'Name', field: 'name', kind: 'name', frozen: true, filter: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
        { title: 'Category', field: 'cat', kind: 'center', filter: 'list', render: (r) => <Inline gap="xs"><Icon name="folder" size="xs" />{r.cat}</Inline> },
        { title: 'Format', field: 'badge', kind: 'data', filter: 'list' }, { title: 'Size', field: 'size', kind: 'data', hozAlign: 'right', headerHozAlign: 'right', sorter: bySize },
        { title: 'Date added', field: 'date', kind: 'data', sorter: byDate },
        { title: 'Status', field: 'status', kind: 'center', filter: 'list', render: (r) => <Badge tone={r.status === 'Complete' ? 'success' : 'neutral'}>{r.status}</Badge> }]} />
    );
  }
  const pagination = view === 'categories' ? <Pagination page={1} pageCount={3} total={D.CATEGORY_TOTAL} perPage={16} perPageOptions={[16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />
    : view === 'collections' ? <Text as="p" variant="secondary">Showing 1–4 of 4 collections</Text>
      : view === 'find' ? null
      : <Pagination page={1} pageCount={27} total={D.ASSET_TOTAL} perPage={8} perPageOptions={[8, 16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />;

  const title = view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : (heading || 'Search results');
  const countText = view === 'categories' ? D.CATEGORY_COUNT_LABEL : view === 'collections' ? D.COLLECTION_CARDS.length + ' collections'
    : heading === 'Search results' ? D.SEARCH_COUNT + ' assets found for "' + (query || D.SEARCH_QUERY) + '"' : '';

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
    onOpenChange={(o) => setRight({ ...right, collapsed: !o })} collapseLabel="Minimize panel" resizable footer={<InspectorFooter act={act} />}>{details}</SidePanel>;
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
            {view === 'categories' ? <Button size="sm" variant="primary" icon="add" onClick={() => openDialog('newCatModal')}>New category</Button> : null}
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
