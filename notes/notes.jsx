/* Plenix · notes (notes/notes.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in batch 199:
   the list in a SecondaryPane, the open note as its title, details, tags, text and classification. */
import { Button, Divider, EmptyState, EntityHeader, Icon, PageContent, RowButton, SecondaryPane, Stack, Tag, TagList, Text, Textarea } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_NOTES } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Notes ─────────────────────────────────────────────────────── */
export function NotesScreen() {
  const [sel, setSel] = useState(null);
  const note = ALL_NOTES.find((n) => n.id === sel);
  const [meta, setMeta] = useState({});
  return (
    <div className="plx-page-panes">
      <SecondaryPane title="Notes" width="md" actions={<Button variant="ghost" size="xs" iconOnly label="New note" icon={<Icon name="plus" />} />}>
        <Stack gap="none">
          {ALL_NOTES.map((n) => (
            <RowButton key={n.id} selected={sel === n.id} onClick={() => setSel(n.id)}>
              <Stack inset="sm" gap="xs">
                <Text variant="heading" truncate>{n.title}</Text>
                <Text variant="secondary" truncate>{n.preview}</Text>
                <Text variant="data">{n.date} · {n.folder}</Text>
              </Stack>
            </RowButton>
          ))}
        </Stack>
      </SecondaryPane>
      <PageContent>
        {note ? (
          <Stack gap="md" className="plx-motion-enter">
            <EntityHeader title={note.title} media={{ icon: 'doc-text', hue: 'brown' }} context={note.folder}
              live={{ tone: 'success', label: 'Saved' }} facts={['Edited ' + note.date]}
              actions={[{ icon: 'circle-plus', label: 'Create tasks', primary: true }, { icon: 'pencil', label: 'Edit' }, { icon: 'trash', label: 'Delete' }, { icon: 'share', label: 'Share' }]} />
            <TagList label="Tags">{note.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList>
            <Divider />
            <Textarea aria-label="Note text" rows={8} defaultValue={note.preview + ' Sed ut perspiciatis unde omnis iste natus error sit voluptatem.'} />
            <ClassificationWidget value={meta[note.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [note.id]: m }))} />
          </Stack>
        ) : <EmptyState size="page" icon="document" title="Select a note to read" />}
      </PageContent>
    </div>
  );
}
