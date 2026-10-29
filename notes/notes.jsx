/* Plenix · notes (notes/notes.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in batch 199:
   the list in a SecondaryPane, the open note as its title, details, tags, text and classification.
   Screens (Platforms Standard 4.3, 5.2): the list (#/) and a note (#/note/<id>); opening a note is a history entry. At
   Narrow the list and the note show one at a time (SecondaryPane detailOpen), Back returns to the list. The note's text
   is a draft until Save: while it differs, leaving the note asks (useUnsavedGuard). The list's scroll position
   is kept between visits (useViewState: plenix.notes.view). */
import { Button, Divider, EmptyState, EntityHeader, Icon, PageContent, RowButton, SecondaryPane, Stack, Tag, TagList, Text, Textarea, useAppLayout, useUnsavedGuard, useViewState, Field, VisuallyHidden } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_NOTES } from '../suite/shared.jsx';
const { useState } = React;

// the sample text of a note until it is edited and saved
const sampleText = (n) => n.preview + ' Sed ut perspiciatis unde omnis iste natus error sit voluptatem.';

/* ─── Notes ─────────────────────────────────────────────────────── */
export function NotesScreen({ screen }) {
  const layout = useAppLayout();
  const narrow = !!(layout && layout.narrow);
  const [view, updateView] = useViewState('notes');
  const sel = screen.parts[0] === 'note' ? +screen.parts[1] : null;
  const note = ALL_NOTES.find((n) => n.id === sel);
  const [meta, setMeta] = useState({});
  const [saved, setSaved] = useState({});      // the saved text of each edited note
  const [draft, setDraft] = useState(null);    // the text being edited: { id, text }
  const textOf = (n) => (saved[n.id] !== undefined ? saved[n.id] : sampleText(n));
  const editing = draft && note && draft.id === note.id ? draft.text : null;
  const dirty = editing !== null && editing !== textOf(note);
  useUnsavedGuard(dirty, 'Your changes to this note will be lost.');
  const save = () => { if (dirty) setSaved((s) => ({ ...s, [note.id]: editing })); setDraft(null); };
  React.useEffect(() => { setDraft(null); }, [sel]);
  return (
    <div className="plx-page-panes">
      <SecondaryPane title="Notes" width="md"
        scrollTop={view.scroll} onScrollChange={(top) => updateView({ scroll: top })} detailOpen={!!note} onBack={() => screen.parent('/')}
        actions={<Button variant="ghost" size="xs" iconOnly label="New note" icon={<Icon name="plus" />} />}>
        <Stack gap="none">
          {ALL_NOTES.map((n) => (
            <RowButton key={n.id} selected={!narrow && sel === n.id} onClick={() => screen.open(['note', n.id])}>
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
            <EntityHeader title={note.title} media={{ icon: 'doc-text', hue: 'brown' }} subtitle={note.folder}
              status={dirty ? { tone: 'waiting', icon: 'pencil', label: 'Unsaved changes' } : { tone: 'success', icon: 'check', label: 'Saved' }} facts={[{ label: 'Edited', value: note.date, data: true }, { label: 'Folder', value: note.folder }, { label: 'Tags', value: (note.tags || []).length, data: true }]}
              actions={dirty
                ? [{ icon: 'save', label: 'Save', primary: true, onClick: save }, { icon: 'circle-plus', label: 'Create tasks' }, { icon: 'trash', label: 'Delete' }, { icon: 'share', label: 'Share' }]
                : [{ icon: 'circle-plus', label: 'Create tasks', primary: true }, { icon: 'pencil', label: 'Edit' }, { icon: 'trash', label: 'Delete' }, { icon: 'share', label: 'Share' }]} />
            <TagList label="Tags">{note.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList>
            <Divider />
            <Field label="Note text" hideLabel><Textarea rows={8} value={editing !== null ? editing : textOf(note)} onChange={(e) => setDraft({ id: note.id, text: e.target.value })} /></Field>
            <ClassificationWidget value={meta[note.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [note.id]: m }))} />
          </Stack>
        ) : <><VisuallyHidden as="h1">Notes</VisuallyHidden><EmptyState size="page" icon="doc-text" title="Select a note to read" /></>}
      </PageContent>
    </div>
  );
}
