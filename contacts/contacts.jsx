/* Plenix · contacts (contacts/contacts.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the list in a SecondaryPane, the open contact as a record page header and its classification. */
import { Avatar, Button, EmptyState, Icon, Inline, PageContent, RecordPage, RowButton, SecondaryPane, Stack, Text } from 'plenix-platform';
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
            <RecordPage.Header title={contact.name} description={contact.role + ' · ' + contact.co} meta={<Text variant="data">Last message {contact.last}</Text>}
              media={<Avatar name={contact.name} size="2xl" />} />
            <ClassificationWidget value={meta[contact.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [contact.id]: m }))} />
          </Stack>
        ) : <EmptyState size="page" icon="person" title="Select a contact" />}
      </PageContent>
    </div>
  );
}
