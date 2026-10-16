/* Plenix · bookmarks (bookmarks/bookmarks.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: collection chips, the bookmarks as Cards in a ContentGrid, the open one in a SidePanel. The open bookmark is a
   screen (#/bookmark/<id>, a history entry: Back closes it; Platforms Standard 4.3). */
import { CommandBar, CommandBarButton, Menu, MenuItem, MenuRadioGroup, useCollectionView, EntityHeader, Card, ContentGrid, Link, PageContent, SidePanel, Stack, Tag, TagList, Text } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_BOOKMARKS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Bookmarks ─────────────────────────────────────────────────── */
export function BookmarksScreen({ screen }) {
  const collection = useCollectionView([{ value: 'col', label: 'Collections', kind: 'select' }], { quick: { col: 'list' } });
  const col = (collection.quick.col || [])[0] || 'all';
  const setCol = (value) => collection.setQuick('col', value === 'all' ? [] : [value]);
  const sel = screen.parts[0] === 'bookmark' ? +screen.parts[1] : null;
  const setSel = (id) => (id === null ? screen.parent('/') : screen.open(['bookmark', id]));
  const [meta, setMeta] = useState({});
  const cols = ['all', ...new Set(ALL_BOOKMARKS.map((b) => b.col))];
  const filtered = ALL_BOOKMARKS.filter(collection.test);
  const bookmark = ALL_BOOKMARKS.find((b) => b.id === sel);
  return (
    <div className="plx-page-panes">
      <PageContent className="plx-motion-enter">
        <Stack gap="md">
          <EntityHeader title="Bookmarks" media={{ icon: 'bookmark', hue: 'green' }} facts={[filtered.length + ' bookmarks', col === 'all' ? 'All collections' : col]} actions={[{ icon: 'share', label: 'Share' }]} />
          <CommandBar label="Bookmarks" sticky={false} count={filtered.length + ' bookmarks'}
            actions={[{ id: 'add', label: 'Add', icon: 'plus', primary: true }]}
            view={<Menu trigger={<CommandBarButton icon="folder" label="Collections" active={col !== 'all'} caret />}>
              <MenuRadioGroup label="Collections" value={col} onChange={setCol}>{cols.map((c) => <MenuItem key={c} value={c}>{c === 'all' ? 'All' : c}</MenuItem>)}</MenuRadioGroup>
            </Menu>} />
          <ContentGrid size="lg" label="Bookmarks">
            {filtered.map((b) => (
              <Card key={b.id} title={b.title} meta={b.url} selected={sel === b.id} onOpen={() => setSel(sel === b.id ? null : b.id)}>
                <TagList label="Tags">{b.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList>
                <Text variant="data">{b.date}</Text>
              </Card>
            ))}
          </ContentGrid>
        </Stack>
      </PageContent>
      {bookmark ? (
        <SidePanel title={bookmark.title} icon="bookmark" onOpenChange={(o) => { if (!o) setSel(null); }}>
          <Stack gap="md">
            <Link href={'https://' + bookmark.url} external>{bookmark.url}</Link>
            <TagList label="Tags">{bookmark.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList>
            <ClassificationWidget value={meta[bookmark.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [bookmark.id]: m }))} />
          </Stack>
        </SidePanel>
      ) : null}
    </div>
  );
}
