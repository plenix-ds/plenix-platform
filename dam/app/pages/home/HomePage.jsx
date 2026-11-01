/* Plenix asset app · home page (app/pages/home/HomePage.jsx): browse categories and collections, search assets.
   Replaces the HTML of index.html, its dialogs partial and the home-page code of plenix.js (batch 111).
   Views: categories and collections (cards or a table; a category's details on the right) and search results (asset
   cards or a table; the chosen asset's details on the right). Panes: Files (the folder tree), the sidebar, the content,
   the details pane. The sidebar is the shell's side navigation and the details pane its panel: the AppShell collapses,
   resizes and (below 1024px) overlays them.
   The address (Platforms Standard 4.3): each view is a screen with a history entry: #/ (categories), #/collections,
   #/category/<name>, #/search?q=<text>&<filters>&sort=… (findAssets.js), #/saved/<name>, and ?asset=<id> on any of them
   for the open asset; refining a search in the workspace is a new entry per committed search (Enter or leaving the
   field, a filter, Clear all, the sort), never per keystroke, and a refined saved search becomes a search; the last
   screen is restored on load (plenix.assets.view). ?q=text (the header on other pages links here) names the search
   screen; ?upload=1 opens the upload dialog. Dialogs are opened by their legacy ids from app/dialogs (one host renders
   the open one). */
import React from 'react';
import { dataPhrase, CommandBar, CommandBarSearch, FilterPanel, SortPanel, GroupPanel, ColumnsMenu, ViewMenu, useCollectionView, compareLevels, ContentGrid, MediaCard, DataGrid, Pagination, Button, Menu, MenuItem, Badge, Icon, MediaViewer, Tree, useToast, useSelection, SearchWorkspace, SidePanel, below, Inline, Text, Thumbnail, SecondaryPane, PageContent, DropZone, useScreenLocation, screenHref } from 'plenix-platform';
import { AssetPage } from '../../shell/AssetShell.jsx';
import { Sidebar } from './Sidebar.jsx';
import { CategoryInspector, AssetInspector, InspectorFooter } from './Inspector.jsx';
import * as D from './homeData.js';
import { FIND_EMPTY, MONTH, findAssets, findOf, findParams } from './findAssets.js';
import { DIALOGS as BROWSE_DIALOGS } from '../../dialogs/BrowseDialogs.jsx';
import { DIALOGS as UPLOAD_DIALOGS } from '../../dialogs/UploadDialog.jsx';
import { DIALOGS as METADATA_DIALOGS } from '../../dialogs/MetadataFilterDialog.jsx';
import { DIALOGS as BULK_DIALOGS, bulkDialogFor, bulkComingSoon } from '../../dialogs/BulkDialogs.jsx';

const DIALOGS = { ...BROWSE_DIALOGS, ...UPLOAD_DIALOGS, ...METADATA_DIALOGS, ...BULK_DIALOGS };
// the View menu's card sizes (s, m, l) as ContentGrid sizes; the Search workspace's own size names (S, M, L) too
const GRID_SIZE = { s: 'xs', m: 'sm', l: 'md', S: 'xs', M: 'sm', L: 'md' };

/* the command bar's fields (utils/fields.ts) of each collection the home page lists: what Filter, Sort, Group and the
   quick filters work on. Dates are written "Aug 28, 2026" in the data; the fields read them as ISO dates. */
const isoDate = (s) => { const d = new Date(s + ' 00:00 UTC'); return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10); };
const uniq = (values) => Array.from(new Set(values)).sort();
const CATEGORY_FIELDS = [
  { value: 'name', label: 'Category name', kind: 'text' }, { value: 'count', label: 'Assets', kind: 'number' },
  { value: 'modified', label: 'Modified', kind: 'date', get: (r) => isoDate(r.modified) }, { value: 'status', label: 'Status', kind: 'select', options: uniq(D.CATEGORY_CARDS.map((c) => c.status)) },
];
const COLLECTION_FIELDS = [
  { value: 'name', label: 'Collection name', kind: 'text' }, { value: 'count', label: 'Assets', kind: 'number' },
  { value: 'updated', label: 'Updated', kind: 'date', get: (r) => isoDate(r.updated) }, { value: 'owner', label: 'Owner', kind: 'select', options: uniq(D.COLLECTION_CARDS.map((c) => c.owner)) },
];
const ASSET_FIELDS = [
  { value: 'name', label: 'Name', kind: 'text' }, { value: 'cat', label: 'Category', kind: 'select', options: uniq(D.ASSETS.map((a) => a.cat)) },
  { value: 'badge', label: 'Type', kind: 'select', options: uniq(D.ASSETS.map((a) => a.badge)) }, { value: 'tags', label: 'Tags', kind: 'multi', options: uniq([].concat.apply([], D.ASSETS.map((a) => a.tags))) },
  { value: 'size', label: 'Size', kind: 'text' }, { value: 'date', label: 'Date added', kind: 'date', get: (r) => isoDate(r.date) },
  { value: 'owner', label: 'Owner', kind: 'select', options: uniq(D.ASSETS.map((a) => a.owner)) }, { value: 'status', label: 'Status', kind: 'select', options: uniq(D.ASSETS.map((a) => a.status)) },
];
// the columns each table shows (the Columns menu lists only these)
const COLUMNS = { categories: ['name', 'count', 'modified', 'status'], collections: ['name', 'count', 'updated', 'owner'], assets: ['name', 'cat', 'badge', 'size', 'date', 'status'] };
const GALLERY = { layout: 'gallery', size: 'l', height: 'short' };

/* the grids' sorters (the table renderer sorter functions): numbers written with commas, file sizes, dates */
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
  const params = React.useMemo(() => new URLSearchParams(location.search), []);
  const [view, setView] = React.useState(params.get('q') !== null ? 'find' : 'categories');
  const [find, setFind] = React.useState({ ...FIND_EMPTY, query: params.get('q') || '' });
  const [saved, setSaved] = React.useState(D.SAVED_SEARCHES);
  const [query, setQuery] = React.useState(params.get('q') || '');
  const [heading, setHeading] = React.useState('');
  const [active, setActive] = React.useState('All categories');
  // the Search workspace's own view (cards or a table)
  const [mode, setMode] = React.useState('grid');
  // the command bar of each list (owner, 2026-10-14): search, Filter, the quick filters, Sort, Group, Columns and View
  const catView = useCollectionView(CATEGORY_FIELDS, { text: (r) => r.name, columns: { order: COLUMNS.categories, hidden: [] }, view: GALLERY });
  const colView = useCollectionView(COLLECTION_FIELDS, { text: (r) => r.name + ' ' + r.owner, columns: { order: COLUMNS.collections, hidden: [] }, view: GALLERY });
  const assetView = useCollectionView(ASSET_FIELDS, { text: (r) => [r.name, r.file, r.cat].concat(r.tags).join(' '), quick: { cat: 'list', badge: 'list', tags: 'list' }, columns: { order: COLUMNS.assets, hidden: [] }, view: GALLERY });
  const [selCats, setSelCats] = React.useState([]);
  const [selAssets, setSelAssets] = React.useState([]);
  const [asset, setAsset] = React.useState(null);
  const [viewer, setViewer] = React.useState(null);
  const [files, setFiles] = React.useState(false);
  // the Details panel starts closed where it would cover the content (below 1024px) and opens when an asset is chosen
  const [right, setRight] = React.useState(() => ({ collapsed: window.matchMedia(below('--plx-sys-shell-inspector-overlay-below')).matches }));
  const [dialog, setDialog] = React.useState(params.get('upload') ? { id: 'uploadModal', props: {} } : null);
  const [dragging, setDragging] = React.useState(0);

  const openDialog = (id, props = {}) => setDialog({ id, props });
  const browse = view === 'categories' || view === 'collections';
  const collections = view === 'collections';

  // the screen named by the address: the view (with its category, search or saved search), then the open asset
  const shownQuery = React.useRef('');   // the query of the search the address names
  const viewKey = screenHref(loc.parts, Object.assign({}, loc.params, { asset: undefined }));   // the open asset is not a view
  React.useLayoutEffect(() => {
    const [top, name] = loc.parts;
    setFiles(false); setSelCats([]); setSelAssets([]);
    if (top === 'collections') { setView('collections'); setActive('All collections'); }
    else if (top === 'category' && name) { setView('search'); setHeading(name); setQuery(''); setActive(name); }
    else if (top === 'search') { setQuery(loc.params.q || ''); setActive(null); setFind(findOf(loc.params)); setView('find'); shownQuery.current = loc.params.q || ''; }
    else if (top === 'saved' && name) { const s = saved.find((x) => x.name === name); shownQuery.current = s ? s.query : ''; setActive(name); setFind({ ...FIND_EMPTY, query: s ? s.query : '', filters: s ? s.filters : {}, saved: name }); setView('find'); }
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

  const current = asset === null ? null : D.ASSETS[asset];


  /* ── the selection's commands (owner, 2026-10-15: the swap): while rows are selected the command bar holds them instead of
     the page's actions, search and filters; a single-item command is disabled with a why-tooltip while several are
     selected; Delete last ── */
  const catActions = [
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [{ id: 'd', label: 'Download', onSelect: () => bulk('Download category') }, { id: 'da', label: 'Download as', onSelect: () => bulk('Download Category as') }] },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move category') },
        { id: 'rename', label: 'Rename', icon: 'rename', single: true, onSelect: () => bulk('Rename category') },
        { id: 'meta', label: 'Edit metadata', icon: 'fields', single: true, onSelect: () => bulk('Edit category') },
        { id: 'status', label: 'Change status', icon: 'circle-check', onSelect: () => bulk('Change category status') },
        { id: 'share', label: 'Share', icon: 'share', onSelect: () => bulk('Share category') },
        { id: 'del', label: 'Delete', icon: 'trash-detail', danger: true, onSelect: () => bulk('Delete category') },
  ];
  const catSel = { count: selCats.length, noun: 'category', plural: 'categories', label: 'Category actions', actions: catActions, onClear: () => setSelCats([]) };
  const item = (label, action, extra) => ({ id: action, label, onSelect: () => bulk(action), ...extra });
  const assetActions = [
        { id: 'dl', label: 'Download', icon: 'download-tray', items: [item('Download', 'Download'), item('Download as', 'Download as')] },
        { id: 'edit', label: 'Edit', icon: 'fields', items: [item('Multi edit', 'Multi edit'), item('Edit image', 'Edit image', { single: true }), item('Update metadata', 'Update metadata'), item('Approve', 'Approve'), item('Reject', 'Reject'), item('Export', 'Export'), item('Delete selected assets', 'Delete', { danger: true }), item('Print assets', 'Print assets')] },
        { id: 'add', label: 'Add to', icon: 'briefcase-plus', items: [item('Cart', 'Add to Cart'), item('Bookmarks', 'Add to Bookmarks'), item('Document', 'Add to Document'), item('Person', 'Add to Person'), item('Categories', 'Add to Categories'), item('Collections', 'Add to Collections'), item('Media profile', 'Add to Media Profile')] },
        { id: 'move', label: 'Move', icon: 'move', onSelect: () => bulk('Move') },
        { id: 'share', label: 'Share', icon: 'share', items: [item('Email assets', 'Email assets'), item('Publish Assets to Server', 'Publish Assets to Server')] },
        { id: 'publish', label: 'Publish', icon: 'upload', onSelect: () => bulk('Publish') },
        { id: 'thumb', label: 'Regenerate thumbnail', icon: 'image-b-2', single: true, onSelect: () => bulk('Regenerate thumbnail') },
  ];
  const assetSel = { count: selAssets.length, noun: 'asset', label: 'Asset actions', actions: assetActions, onClear: () => setSelAssets([]) };
  // Advanced Search shares the same commands and selection count in its results CommandBar.
  const searchSelection = { ...assetSel, total: D.ASSETS.length, onSelectAll: () => setSelAssets(D.ASSETS.map((a) => a.id)) };

  const found = findAssets(find);
  // Save search: keeps the query and filters under a name in the left navigation's Saved Searches
  const saveSearch = () => openDialog('saveSearchModal', { onSave: (v) => {
    const name = (v.name || '').trim() || (find.query ? 'Search: ' + find.query : 'Saved search');
    setSaved(saved.filter((x) => x.name !== name).concat([{ name, query: find.query, filters: find.filters }]));
    if (view === 'find') setFind({ ...find, saved: name });
    setActive(name);
  } });
  // a committed refinement is a new screen (a history entry): the address carries the query, the filters and the sort
  const commitFind = (next) => { setFind(next); loc.navigate(['search'], findParams(next)); };
  const committed = find.query === shownQuery.current;
  // the query typed in the workspace is applied as the person types; Enter or leaving the field commits it (and clearing it)
  const onFindKey = (e) => { if (e.key === 'Enter' && view === 'find' && !committed && e.target.closest('.plx-search-ws__query')) commitFind(find); };
  const onFindBlur = (e) => { if (view === 'find' && !committed && e.target.closest('.plx-search-ws__query')) commitFind(find); };
  const setFindQuery = (q) => (q ? setFind({ ...find, query: q, saved: null }) : commitFind({ ...find, query: '', saved: null }));
  const setFindFilter = (id, value) => commitFind({ ...find, filters: { ...find.filters, [id]: value }, saved: null });
  const filterDefs = [
    { id: 'type', label: 'Type', multiple: true, options: opts(D.ASSETS.map((a) => a.badge)), value: find.filters.type || [] },
    { id: 'cat', label: 'Category', multiple: true, options: opts(D.ASSETS.map((a) => a.cat)), value: find.filters.cat || [] },
    { id: 'tags', label: 'Tags', multiple: true, options: opts([].concat.apply([], D.ASSETS.map((a) => a.tags))), value: find.filters.tags || [] },
    { id: 'owner', label: 'Owner', options: opts(D.ASSETS.map((a) => a.owner)), value: find.filters.owner || null },
    { id: 'date', label: 'Date', options: opts(D.ASSETS.map((a) => MONTH(a.date))), value: find.filters.date || null },
    { id: 'status', label: 'Status', options: opts(D.ASSETS.map((a) => a.status)), value: find.filters.status || null },
  ];

  /* ── content ── */
  // the browse views' command bar state: the categories, the collections, or a category's assets
  const cv = view === 'categories' ? catView : view === 'collections' ? colView : assetView;
  const fieldsOf = view === 'categories' ? CATEGORY_FIELDS : view === 'collections' ? COLLECTION_FIELDS : ASSET_FIELDS;
  const gallery = view === 'find' ? mode === 'grid' : cv.view.layout === 'gallery';
  const gridSize = GRID_SIZE[view === 'find' ? 'L' : cv.view.size];
  // the cards show what the bar finds, in its order (the table applies the same through its props)
  const shown = (rows) => rows.filter(cv.test).sort(compareLevels(fieldsOf, cv.tableProps.sort));
  // the grid picks with the Platform's selection model: a click toggles, Shift extends from the last one picked, Ctrl or ⌘ toggles
  const assetPick = useSelection({ items: (view === 'find' ? found : shown(D.ASSETS)).map((x) => x.id), mode: 'multiple', selected: selAssets, onChange: setSelAssets });
  const tableProps = view === 'find' ? {} : cv.tableProps;
  let content;
  if (view === 'categories') {
    content = gallery ? (
      <ContentGrid size={gridSize} label="Categories">
        {shown(D.CATEGORY_CARDS).map((c) => (
          <MediaCard key={c.id} src={c.thumb} title={c.name} meta={dataPhrase('{n} assets', { n: c.count })} selected={selCats.indexOf(c.id) >= 0} selecting={selCats.length > 0}
            onSelectChange={() => toggle(selCats, setSelCats, c.id)} selectLabel={'Select ' + c.name} onOpen={() => openCategory(c.name)}
            actions={<Menu label={'Options for ' + c.name} placement="bottom-end" trigger={<Button size="xs" variant="ghost" iconOnly icon="menu-lines" label={'Options for ' + c.name} />}>
              {D.CARD_MENU.map(([icon, label, msg]) => <MenuItem key={label} icon={icon} danger={label === 'Delete'} onSelect={act(msg, 'info')}>{label}</MenuItem>)}
            </Menu>} />
        ))}
      </ContentGrid>
    ) : (
      <DataGrid label="Categories" data={D.CATEGORY_CARDS} selectable selected={selCats} onSelectionChange={setSelCats} onRowClick={(record) => openCategory(record.name)} {...tableProps} columns={[
        { title: 'Category name', field: 'name', kind: 'name', frozen: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
        { title: 'Assets', field: 'count', kind: 'data', sorter: byNumber }, { title: 'Modified', field: 'modified', kind: 'data', sorter: byDate },
        { title: 'Status', field: 'status', kind: 'center', render: (r) => <Badge tone="success">{r.status}</Badge> }]} />
    );
  } else if (view === 'collections') {
    content = gallery ? (
      <ContentGrid size={gridSize} label="Collections">
        {shown(D.COLLECTION_CARDS).map((c) => <MediaCard key={c.id} icon="briefcase" title={c.name} meta={dataPhrase('{n} assets', { n: c.count })} onOpen={() => openCategory(c.name)} />)}
      </ContentGrid>
    ) : (
      <DataGrid label="Collections" data={D.COLLECTION_CARDS} onRowClick={(record) => openCategory(record.name)} {...tableProps} columns={[
        { title: 'Collection name', field: 'name', kind: 'name', frozen: true, render: (r) => <ThumbName icon="briefcase" name={r.name} /> },
        { title: 'Assets', field: 'count', kind: 'data', sorter: byNumber }, { title: 'Updated', field: 'updated', kind: 'data', sorter: byDate }, { title: 'Owner', field: 'owner' }]} />
    );
  } else {
    const list = view === 'find' ? found : D.ASSETS;
    content = gallery ? (
      <ContentGrid size={gridSize} label="Search results">
        {(view === 'find' ? list : shown(list)).map((a) => (
          <MediaCard key={a.id} src={a.thumb} title={a.name} meta={a.cat} badge={<Icon name={a.typeIcon} size="md" label={a.badge} />}
            selected={selAssets.indexOf(a.id) >= 0} selecting={selAssets.length > 0} onSelectChange={(on, e) => assetPick.choose(a.id, e)} selectLabel={'Select ' + a.name}
            onOpen={() => openAsset(a.id)} aria-current={asset === a.id ? 'true' : undefined} />
        ))}
      </ContentGrid>
    ) : (
      <DataGrid label="Search results" data={list} selectable selected={selAssets} onSelectionChange={setSelAssets} onRowClick={(record) => openAsset(record.id)} {...tableProps} columns={[
        { title: 'Name', field: 'name', kind: 'name', frozen: true, render: (r) => <ThumbName src={r.thumb} name={r.name} /> },
        { title: 'Category', field: 'cat', kind: 'center', render: (r) => <Inline gap="xs"><Icon name="folder" size="xs" />{r.cat}</Inline> },
        { title: 'Type', field: 'badge', kind: 'data' }, { title: 'Size', field: 'size', kind: 'data', align: 'right', headerAlign: 'right', sorter: bySize },
        { title: 'Date added', field: 'date', kind: 'data', sorter: byDate },
        { title: 'Status', field: 'status', kind: 'center', render: (r) => <Badge tone={r.status === 'Complete' ? 'success' : 'neutral'}>{r.status}</Badge> }]} />
    );
  }

  /* ── the command bar over the list (owner, 2026-10-15: one bar that swaps on a selection, Microsoft 365), fixed at the
     top while the list scrolls ── */
  const noun = view === 'categories' ? ['category', 'categories'] : view === 'collections' ? ['collection', 'collections'] : ['asset', 'assets'];
  const totals = { categories: D.CATEGORY_CARDS, collections: D.COLLECTION_CARDS, search: D.ASSETS };
  const n = view === 'find' ? 0 : cv.count(totals[view] || []);
  const barActions = view === 'categories' ? [{ id: 'new', label: 'New category', icon: 'add', onSelect: () => openDialog('newCatModal') }]
    : view === 'collections' ? [{ id: 'new', label: 'New collection', icon: 'add', onSelect: () => openDialog('newCollectionModal') }]
      : [{ id: 'upload', label: 'Upload', icon: 'upload', onSelect: () => openDialog('uploadModal') }, { id: 'save', label: 'Save search', icon: 'save', onSelect: saveSearch }];
  // the app's quick filters (Category, Type, Tags): when the bar is short of room they fold into More after the commands
  const quick = (key, label, icon, word) => Object.assign({ id: key, label, icon, noun: word, options: (ASSET_FIELDS.find((f) => f.value === key) || {}).options }, cv.quickProps(key));
  const bar = view === 'find' ? null : (
    <CommandBar label={view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : 'Assets'} actions={barActions}
      count={n + ' ' + (n === 1 ? noun[0] : noun[1])}
      find={<>
        <CommandBarSearch {...cv.searchProps} placeholder={'Search ' + noun[1]} />
        <FilterPanel {...cv.filterProps} />
      </>}
      quickFilters={view === 'search' ? [quick('cat', 'Category', 'grid-2x2', 'category'), quick('badge', 'Type', 'image-b', 'type'), quick('tags', 'Tags', 'tags', 'tag')] : []}
      view={<>
        <SortPanel {...cv.sortProps} />
        <GroupPanel {...cv.groupProps} />
        <ColumnsMenu {...cv.columnsProps} fields={fieldsOf.filter((f) => COLUMNS[view === 'search' ? 'assets' : view].indexOf(f.value) >= 0)} />
        <ViewMenu {...cv.viewProps} />
      </>}
      selection={view === 'categories' ? catSel : view === 'search' ? assetSel : null} />
  );
  const pagination = view === 'categories' ? <Pagination page={1} pageCount={3} total={D.CATEGORY_TOTAL} perPage={16} perPageOptions={[16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />
    : view === 'collections' ? <Text as="p" variant="secondary">Showing 1–4 of 4 collections</Text>
      : view === 'find' ? null
      : <Pagination page={1} pageCount={27} total={D.ASSET_TOTAL} perPage={8} perPageOptions={[8, 16, 32, 64]} onPageChange={(n) => toast.show('Page ' + n, { tone: 'info' })} onPerPageChange={() => {}} />;

  const title = view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : (heading || 'Search results');

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
        <PageContent aria-labelledby="home-title" onKeyDown={onFindKey} onBlur={onFindBlur} {...(browse ? dropHandlers : {})}>
          {view === 'find' ? (
            <SearchWorkspace title={find.saved || (find.query ? 'Search results' : 'Search')} query={find.query} onQueryChange={setFindQuery}
              placeholder="Search assets by name, filename, metadata…" noun="asset" count={found.length}
              filters={filterDefs} onFilterChange={setFindFilter} onClearAll={() => commitFind({ ...find, filters: {}, saved: null })}
              sort={{ value: find.sort, options: ['Relevance', 'Newest', 'Oldest', 'Name A–Z', 'Name Z–A', 'Size'], onChange: (o) => commitFind({ ...find, sort: o }) }}
              view={{ value: mode, onChange: setMode }}
              onSave={saveSearch}
              selection={searchSelection}>
              {content}
            </SearchWorkspace>
          ) : <>
          <Text as="h2" id="home-title" variant="title">{title}</Text>
          {bar}
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
