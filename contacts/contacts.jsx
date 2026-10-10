/* Plenix · contacts (contacts/contacts.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the list in a SecondaryPane, the open contact as a record page header and its classification. */
import { Avatar, Button, EmptyState, EntityHeader, Icon, Inline, PageContent, RowButton, SecondaryPane, Stack, Text } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { CONTACTS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Contacts ──────────────────────────────────────────────────── */
export function ContactsScreen() {
  const [sel, setSel] = useState(null);
  const contact = CONTACTS.find((c) => c.id === sel);
  const [meta, setMeta] = useState({});
  return (
    <div className="plx-page-panes">
      <SecondaryPane title="Contacts" width="lg" actions={<Button variant="ghost" size="xs" iconOnly label="New contact" icon={<Icon name="plus" />} />}>
        <Stack gap="none">
          {CONTACTS.map((c) => (
            <RowButton key={c.id} selected={sel === c.id} onClick={() => setSel(c.id)}>
              <Inline gap="sm" inset="sm">
                <Avatar name={c.name} size="md" />
                <Stack gap="none">
                  <Text variant="heading">{c.name}</Text>
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
            <EntityHeader title={contact.name} media={{ person: contact.name, color: contact.avColor }}
              facts={[contact.role, contact.co, 'Last message ' + contact.last]}
              actions={[{ icon: 'phone', label: 'Call' }, { icon: 'mail', label: 'Email' }, { icon: 'message', label: 'Message', primary: true },
                { icon: 'pencil', label: 'Edit' }, { icon: 'trash', label: 'Delete' }, { icon: 'share', label: 'Share' }]} />
            <ClassificationWidget value={meta[contact.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [contact.id]: m }))} />
          </Stack>
        ) : <EmptyState size="page" icon="person" title="Select a contact" />}
      </PageContent>
    </div>
  );
}
