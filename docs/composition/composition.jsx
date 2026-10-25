/* The composition standard (docs/composition/composition.jsx; owner, 2026-10-15/16, GitHub #55): drawn live from what the
   build publishes from platform/standards/layout.json (PAGE_LAYOUTS, PAGE_REGIONS, COMPOSITION_GUIDE, FIELD_RULES), and
   the reference screen built on it (posts.html: RedSave's Posts screen as a workspace page). Two pages, no switches.
   Compiled to composition.js with tools/agent/build-study.js. */
const { AppShell, AppHeader, NavPane, NavList, StatusBar, SessionProvider, PageContent, Stack, Text, Panel, DataGrid, CommandBar, CommandBarSearch,
  FilterPanel, SortPanel, GroupPanel, ColumnsMenu, ViewMenu, EntityHeader, useCollectionView, PAGE_LAYOUTS, PAGE_REGIONS, COMPOSITION_GUIDE, FIELD_RULES, Table } = Plenix;
const { useState } = React;
const POSTS = /posts\.html$/.test(location.pathname);

/* ── the standard ── */
function Standard() {
  const kinds = Object.keys(PAGE_LAYOUTS);
  return (
    <PageContent>
      <Stack gap="xl">
        <Stack gap="sm">
          <Text as="h1" variant="display">Composition</Text>
          <Text as="p">A screen is built from patterns, never from loose components. First decide what each part of the screen is; the standard names the pattern to build it from, and the patterns size what sits inside them. The source is platform/standards/layout.json; check-system.js enforces the fields rule.</Text>
        </Stack>
        <Panel title="What is this region?" icon="circle-info">
          <Table label="The decision guide" columns={[{ title: 'Ask', field: 'question', kind: 'name' }, { title: 'Region', field: 'region', kind: 'data' }, { title: 'Build it from', field: 'build' }]}
            data={COMPOSITION_GUIDE.map((d, i) => ({ id: i, question: d.question, region: d.region || '—', build: d.build }))} />
        </Panel>
        <Panel title="Kinds of page and their regions" icon="grid-3x2">
          <Table label="Kinds of page" columns={[{ title: 'Kind of page', field: 'kind', kind: 'data' }, { title: 'Layout', field: 'layout', kind: 'data' }, { title: 'Use', field: 'use' }, { title: 'Regions, in order', field: 'regions' }]}
            data={kinds.map((k) => ({ id: k, kind: k, layout: PAGE_LAYOUTS[k].layout, use: PAGE_LAYOUTS[k].use, regions: (PAGE_LAYOUTS[k].regions || []).join(' › ') }))} />
        </Panel>
        <Panel title="Regions and their patterns" icon="grid-2x2">
          <Table label="Regions" columns={[{ title: 'Region', field: 'region', kind: 'data' }, { title: 'What it is for', field: 'use' }, { title: 'Patterns', field: 'patterns' }]}
            data={Object.keys(PAGE_REGIONS).map((r) => ({ id: r, region: r, use: PAGE_REGIONS[r].use, patterns: PAGE_REGIONS[r].patterns.join(', ') }))} />
        </Panel>
        <Panel title="The fields rule" icon="field-select">
          <Stack gap="md">
            <Text as="p">Fields are layout-neutral: they take their natural width, and the pattern they sit in sizes them. A field anywhere else is a composition error.</Text>
            <Table label="The fields rule" columns={[{ title: 'Patterns', field: 'group', kind: 'name' }, { title: 'What a field does there', field: 'does' }, { title: 'Which', field: 'list' }]}
              data={[
                { id: 1, group: 'Stretch', does: 'Fills its column', list: FIELD_RULES.stretch.join(', ') },
                { id: 2, group: 'Content', does: 'Takes its natural width', list: FIELD_RULES.content.join(', ') },
                { id: 3, group: 'Fields', does: 'Sized by the pattern around them', list: FIELD_RULES.components.join(', ') }]} />
          </Stack>
        </Panel>
        <Text as="p">The reference screen: <a className="plx-link" href="posts.html">Posts, built on the standard</a>.</Text>
      </Stack>
    </PageContent>
  );
}

/* ── the reference screen: RedSave's Posts, a workspace page (page header › command bar › collection) ── */
const COMMUNITIES = ['r/design', 'r/architecture', 'r/interiordesign'], TAGS = ['buyers', 'press', 'ideas'], COLLECTIONS = ['Kitchen', 'Spain', 'Hero'];
const ROWS = Array.from({ length: 24 }, (x, i) => ({ id: i + 1, title: ['Before and after: a kitchen in Lisbon', 'What is your favorite tile?', 'Small hallway ideas', 'Brick or plaster?'][i % 4] + (i > 3 ? ' (' + (i + 1) + ')' : ''),
  community: COMMUNITIES[i % 3], tags: [TAGS[i % 3]], collection: COLLECTIONS[i % 3], offline: i % 2 === 0, score: 40 + (i * 17) % 300, posted: '2026-10-' + String(16 - (i % 15)).padStart(2, '0') }));
const opts = (l) => l.map((v) => ({ value: v, label: v }));
const FIELDS = [
  { value: 'title', label: 'Title', kind: 'text' },
  { value: 'community', label: 'Community', kind: 'select', options: opts(COMMUNITIES) },
  { value: 'tags', label: 'Tags', kind: 'multi', options: opts(TAGS) },
  { value: 'collection', label: 'Collection', kind: 'select', options: opts(COLLECTIONS) },
  { value: 'score', label: 'Score', kind: 'number' },
  { value: 'posted', label: 'Posted', kind: 'date' },
];
// the old Posts screen stacked a search, three selects, a switch and Export CSV on their own lines; built on the standard
// it is a workspace page: its header, one command bar (the search and the filters on its find side, the three selects as
// quick filters, the switch a toggle command, Export CSV a command) and the table
function Posts() {
  const [offline, setOffline] = useState(false);
  const v = useCollectionView(FIELDS, { data: ROWS, text: (r) => r.title, quick: { community: 'list', tags: 'list', collection: 'list' }, sort: [{ field: 'posted', dir: 'desc' }] });
  const rows = offline ? ROWS.filter((r) => r.offline) : ROWS;
  const n = v.count(rows);
  const quick = (key, label, icon, list) => Object.assign({ id: key, label, icon, noun: label.toLowerCase(), options: opts(list) }, v.quickProps(key));
  return (
    <PageContent>
      <Stack gap="md">
        <EntityHeader title="Posts" />
        <CommandBar label="Posts" count={n + (n === 1 ? ' post' : ' posts')}
          actions={[{ id: 'offline', label: 'Offline copies only', icon: 'download-tray', toggle: true, pressed: offline, onSelect: () => setOffline(!offline) }, { id: 'export', label: 'Export CSV', icon: 'export' }]}
          find={<><CommandBarSearch {...v.searchProps} placeholder="Search posts" /><FilterPanel {...v.filterProps} /></>}
          quickFilters={[quick('community', 'Community', 'settings-users', COMMUNITIES), quick('tags', 'Tags', 'tags', TAGS), quick('collection', 'Collection', 'folder', COLLECTIONS)]}
          view={<><SortPanel {...v.sortProps} /><GroupPanel {...v.groupProps} /><ColumnsMenu {...v.columnsProps} /><ViewMenu {...v.viewProps} gallery={false} /></>} />
        <DataGrid label="Posts" data={rows} {...v.tableProps} columns={[
          { title: 'Title', field: 'title', kind: 'name' }, { title: 'Community', field: 'community' }, { title: 'Tags', field: 'tags' }, { title: 'Collection', field: 'collection' },
          { title: 'Score', field: 'score', kind: 'data', align: 'right', headerAlign: 'right', sorter: 'number' }, { title: 'Posted', field: 'posted', kind: 'data' }]} />
      </Stack>
    </PageContent>
  );
}

function App() {
  const [page, setPage] = useState(POSTS ? 'posts' : 'standard');
  return (
    <AppShell page={POSTS ? 'workspace' : 'detail'}
      header={<AppHeader tone="accent" appName={POSTS ? 'Composition · Posts' : 'Composition'} brandHref="#" />}
      sideNav={<NavPane label="Composition" title="Composition"><NavList label="Pages" value={page} onSelect={(id) => { location.href = id === 'posts' ? 'posts.html' : 'index.html'; }}
        items={[{ id: 'standard', label: 'The standard', icon: 'grid-3x2' }, { id: 'posts', label: 'Posts (reference)', icon: 'list-lines' }]} /></NavPane>}
      footer={<StatusBar start={<span>platform/standards/layout.json</span>} end={<span>{POSTS ? 'Workspace: page header › command bar › collection' : 'The composition standard'}</span>} />}>
      {POSTS ? <Posts /> : <Standard />}
    </AppShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><App /></SessionProvider>);
