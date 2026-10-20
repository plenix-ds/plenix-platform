/* Reading pane demo (docs/reading-pane-study/study.jsx): the Outlook-style layout on the Platform's SplitView (owner,
   2026-10-16): header row · navigation pane | table | the selected item. Two pages, no switches: index.html side by
   side, stacked.html stacked. Compiled to study.js with tools/agent/build-study.js. */
const { AppShell, AppHeader, NavPane, NavList, StatusBar, SessionProvider, DataGrid, CommandBar, Toolbar, Button, Text, Stack,
  Inline, EmptyState, Badge, Persona, Divider, SplitView, ReadingPane } = Plenix;
const { useState } = React;

const STACKED = /stacked\.html$/.test(location.pathname);
const FOLDERS = [
  { id: 'inbox', label: 'Inbox', icon: 'mail', count: 12 },
  { id: 'drafts', label: 'Drafts', icon: 'pencil', count: 2 },
  { id: 'sent', label: 'Sent', icon: 'forward' },
  { id: 'archive', label: 'Archive', icon: 'archive' },
];
const PEOPLE = ['Maya Chen', 'Omar Haddad', 'Sofia Rossi', 'Liam Walsh', 'Ana Souza', 'Kenji Mori'];
const SUBJECTS = ['Kitchen render, second round', 'Invoice 2026-114', 'Brand kit: new logo files', 'Site walkthrough notes',
  'Floor plan comments', 'Hero banner sizes', 'Quarterly review', 'Contract for the Apex project'];
const ITEMS = SUBJECTS.map((s, i) => ({ id: i + 1, from: PEOPLE[i % PEOPLE.length], subject: s,
  preview: 'Thanks for the update. I looked through the files and added a few notes for the next round.',
  received: '2026-10-' + String(16 - i).padStart(2, '0'), flagged: i === 1 }));
const COLUMNS = [
  { title: 'From', field: 'from', kind: 'name' },
  { title: 'Subject', field: 'subject' },
  { title: 'Received', field: 'received', kind: 'data' },
];

function Mail() {
  const [sel, setSel] = useState([1]);
  const [open, setOpen] = useState(1);
  const item = ITEMS.find((x) => x.id === open) || null;
  const count = sel.length;
  const bar = <CommandBar label="Inbox" actions={[{ id: 'new', label: 'New mail', icon: 'plus', primary: true }, { id: 'sweep', label: 'Sweep', icon: 'trash-simple' }]}
    selection={count > 1 ? { count, noun: 'item', actions: [{ id: 'read', label: 'Mark as read', icon: 'mark-unread' }, { id: 'archive', label: 'Archive', icon: 'archive' }, { id: 'delete', label: 'Delete', icon: 'trash', danger: true }], onClear: () => setSel(open ? [open] : []) } : undefined} />;
  const table = <DataGrid label="Inbox" data={ITEMS} columns={COLUMNS} mode="fill" selectable selected={sel} narrow="table" viewMenu={false}
    onSelectionChange={(k) => { setSel(k); if (k.length === 1) setOpen(k[0]); }} on={{ rowClick: (e, row) => { const id = row.getData().id; setOpen(id); setSel([id]); } }} />;
  const reading = (
    <ReadingPane label={count > 1 ? count + ' items selected' : item ? item.subject : 'Nothing selected'}
      actions={count === 1 && item ? <Toolbar label="Message actions"><Button size="sm" icon="reply">Reply</Button><Button size="sm" icon="forward">Forward</Button><Button size="sm" variant="ghost" icon="archive">Archive</Button><Button size="sm" variant="ghost" icon="trash">Delete</Button></Toolbar> : null}
      empty={<EmptyState icon={count > 1 ? 'checklist' : 'mail'} title={count > 1 ? count + ' items selected' : 'Select an item to read'} description={count > 1 ? 'Choose what to do with them in the command bar.' : 'Nothing is selected.'} />}>
      {count === 1 && item ? <Stack gap="md">
        <Text as="h2" variant="title">{item.subject}</Text>
        <Inline gap="sm" align="center"><Persona name={item.from} size="sm" /><Text variant="data">{item.received}</Text>{item.flagged ? <Badge tone="waiting" icon="flag">Flagged</Badge> : null}</Inline>
        <Divider />
        <Text as="p">{item.preview}</Text>
        <Text as="p">The second round is in the shared folder. The kitchen views changed the most; the hallway is the same as before.</Text>
      </Stack> : null}
    </ReadingPane>
  );
  return (
    <div className="study-page">
      {bar}
      <SplitView label="Inbox" firstLabel="Message list" orientation={STACKED ? 'stacked' : 'side-by-side'} first={table} second={reading} />
    </div>
  );
}

function App() {
  const [folder, setFolder] = useState('inbox');
  return (
    <AppShell page="master-detail"
      header={<AppHeader tone="accent" appName={STACKED ? 'Split view · stacked' : 'Split view · side by side'} brandHref="#" />}
      sideNav={<NavPane label="Folders" title="Mail"><NavList label="Folders" value={folder} onSelect={setFolder} items={FOLDERS} /></NavPane>}
      footer={<StatusBar start={<span>{ITEMS.length} items</span>} end={<span>{STACKED ? 'Stacked' : 'Side by side'}</span>} />}>
      <Mail />
    </AppShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><App /></SessionProvider>);
