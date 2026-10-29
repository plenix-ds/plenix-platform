/* Plenix · contacts (contacts/contacts.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the list in a SecondaryPane, the open contact as a record page header and its classification.
   Screens (Platforms Standard 4.3, 5.2): the list (#/) and a contact (#/contact/<id>), a history entry each; at Narrow one
   pane at a time (SecondaryPane detailOpen) with Back to the list; the list's scroll position is kept
   (plenix.contacts.view). */
import { Avatar, Button, DataPill, EmptyState, EntityHeader, Icon, Inline, PageContent, RowButton, SecondaryPane, Stack, Text, useAppLayout, useViewState, VisuallyHidden } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { CONTACTS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Contacts ──────────────────────────────────────────────────── */
export function ContactsScreen({ screen }) {
  const layout = useAppLayout();
  const narrow = !!(layout && layout.narrow);
  const [view, updateView] = useViewState('contacts');
  const sel = screen.parts[0] === 'contact' ? +screen.parts[1] : null;
  const contact = CONTACTS.find((c) => c.id === sel);
  const [meta, setMeta] = useState({});
  return (
    <div className="plx-page-panes">
      <SecondaryPane title="Contacts" width="lg"
        scrollTop={view.scroll} onScrollChange={(top) => updateView({ scroll: top })} detailOpen={!!contact} onBack={() => screen.parent('/')} actions={<Button variant="ghost" size="xs" iconOnly label="New contact" icon={<Icon name="plus" />} />}>
        <Stack gap="none">
          {CONTACTS.map((c) => (
            <RowButton key={c.id} selected={!narrow && sel === c.id} onClick={() => screen.open(['contact', c.id])}>
              <Inline gap="sm" inset="sm">
                <Avatar name={c.name} gender={c.gender} size="md" />
                <Stack gap="none">
                  <Text variant="heading"><DataPill variant="plain" person gender={c.gender} icon={false}>{c.name}</DataPill></Text>
                  <Text variant="caption">{c.co}</Text>
                </Stack>
              </Inline>
            </RowButton>
          ))}
        </Stack>
      </SecondaryPane>
      <PageContent>
        {contact ? (
          <Stack gap="lg">
            <EntityHeader title={contact.name} media={{ person: contact.name, color: contact.avColor, gender: contact.gender }} subtitle={[contact.role, contact.co].filter(Boolean).join(' · ')}
              facts={[contact.co ? { label: 'Company', value: contact.co } : null, contact.role ? { label: 'Role', value: contact.role } : null, contact.msg ? null : { label: 'Last message', value: contact.last, data: true }].filter(Boolean)}
              next={contact.msg ? { label: 'Last message', title: contact.msg, detail: <Text variant="data">{contact.last}</Text> } : undefined}
              actions={[{ icon: 'phone', label: 'Call' }, { icon: 'mail', label: 'Email' }, { icon: 'pencil', label: 'Edit' },
                { icon: 'message', label: 'Message' }, { icon: 'trash', label: 'Delete' }, { icon: 'share', label: 'Share' }]} />
            <ClassificationWidget value={meta[contact.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [contact.id]: m }))} />
          </Stack>
        ) : <><VisuallyHidden as="h1">Contacts</VisuallyHidden><EmptyState size="page" icon="person" title="Select a contact" /></>}
      </PageContent>
    </div>
  );
}
