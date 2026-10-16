/* Reading pane study (docs/reading-pane-study/study.jsx): an Outlook-style layout drawn live with Platform components
   (owner, 2026-10-16: "header row · nav pane | table | contents of the selected item"). The page kind is master-detail
   (platform/standards/layout.json), with a table instead of a list. Switches: where the reading pane goes (right, bottom,
   off: Outlook's Reading pane setting) and how rows read (one line, or two lines as Outlook does in a narrow list).
   A study, not a Platform part. Compiled to study.js with tools/agent/build-study.js. */
const { AppShell, AppHeader, NavPane, NavList, PageContent, StatusBar, SessionProvider, DataTable, CommandBar, SegmentedControl,
  Toolbar, Button, Text, Stack, Inline, EntityHeader, EmptyState, Badge, Persona, Resizable, Divider } = Plenix;
const { useState } = React;

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
  received: '2026-10-' + String(16 - i).padStart(2, '0'), unread: i < 3, flagged: i === 1 }));
const COLS_ONE = [
  { title: 'From', field: 'from', kind: 'name' },
  { title: 'Subject', field: 'subject' },
  { title: 'Received', field: 'received', kind: 'data' },
];
// two lines (Outlook's narrow list): the sender and date, then the subject; one column of rich cells
const COLS_TWO = [
  { title: 'Message', field: 'subject', kind: 'name', render: (r) => <Stack gap="2xs"><Inline gap="xs" justify="between"><Text variant={r.unread ? 'label' : 'body'}>{r.from}</Text><Text variant="data">{r.received}</Text></Inline><Text tone="muted">{r.subject}</Text></Stack> },
];

function Reading({ item, count, onBack }) {
  if (count > 1) return <div className="study-reading"><EmptyState icon="checklist" title={count + ' items selected'} description="Choose what to do with them in the command bar, or select one item to read it." /></div>;
  if (!item) return <div className="study-reading"><EmptyState icon="mail" title="Select an item to read" description="Nothing is selected." /></div>;
  return (
    <article className="study-reading" aria-label={item.subject}>
      <div className="study-reading__actions">
        {onBack ? <Button size="sm" variant="ghost" icon="arrow-left" onClick={onBack}>Back to Inbox</Button> : null}
        <Toolbar label="Message actions"><Button size="sm" icon="reply">Reply</Button><Button size="sm" icon="forward">Forward</Button><Button size="sm" variant="ghost" icon="archive">Archive</Button><Button size="sm" variant="ghost" icon="trash">Delete</Button></Toolbar>
      </div>
      <div className="study-reading__body"><Stack gap="md">
        <Text as="h2" variant="title">{item.subject}</Text>
        <Inline gap="sm" align="center"><Persona name={item.from} size="sm" /><Text variant="data">{item.received}</Text>{item.flagged ? <Badge tone="waiting" icon="flag">Flagged</Badge> : null}</Inline>
        <Divider />
        <Text as="p">{item.preview}</Text>
        <Text as="p">The second round is in the shared folder. The kitchen views changed the most; the hallway is the same as before.</Text>
      </Stack></div>
    </article>
  );
}

function Mail({ pane, rows }) {
  const [sel, setSel] = useState([1]);
  const [open, setOpen] = useState(1);
  const [reading, setReading] = useState(false);   // the reading pane "off": an item opened full width
  const item = ITEMS.find((x) => x.id === open) || null;
  const count = sel.length;
  const bar = <CommandBar label="Inbox" actions={[{ id: 'new', label: 'New mail', icon: 'plus', primary: true }, { id: 'sweep', label: 'Sweep', icon: 'trash-simple' }]}
    selection={count > 1 ? { count, noun: 'item', actions: [{ id: 'read', label: 'Mark as read', icon: 'mark-unread' }, { id: 'archive', label: 'Archive', icon: 'archive' }, { id: 'delete', label: 'Delete', icon: 'trash', danger: true }], onClear: () => setSel(open ? [open] : []) } : undefined} />;
  const pick = (id) => { setOpen(id); setSel([id]); if (pane === 'off') setReading(true); };
  // the grid fills its pane and scrolls inside it (mode "fill"), so the table and the reading pane are the same height
  const table = <DataTable label="Inbox" data={ITEMS} columns={rows === 'two' ? COLS_TWO : COLS_ONE} rowHeight={rows === 'two' ? 'medium' : 'short'} mode="fill" selectable selected={sel}
    onSelectionChange={(k) => { setSel(k); if (k.length === 1) setOpen(k[0]); }} on={{ rowClick: (e, row) => pick(row.getData().id) }} narrow="table" viewMenu={false} />;
  if (pane === 'off') return (
    <div className="study-mail">{reading && item ? null : bar}
      <div className="study-panes study-panes--off">{reading && item ? <Reading item={item} count={1} onBack={() => setReading(false)} /> : <div className="study-list">{table}</div>}</div>
    </div>
  );
  return (
    <div className="study-mail">{bar}
      <div className={'study-panes study-panes--' + pane}>
        <Resizable label="Message list" axis={pane === 'bottom' ? 'vertical' : 'horizontal'} defaultWidth={pane === 'right' ? 560 : undefined} defaultHeight={pane === 'bottom' ? 320 : undefined}
          steps={pane === 'bottom' ? [200, 320, 400, 500] : [360, 400, 500, 560, 600, 720]}
          minWidth={360} maxWidth={720} minHeight={200} maxHeight={500} className="study-list">
          {table}
        </Resizable>
        <Reading item={item} count={count} />
      </div>
    </div>
  );
}


function App() {
  const [folder, setFolder] = useState('inbox');
  const [pane, setPane] = useState('right');
  const [rows, setRows] = useState('one');
  return (
    <AppShell page="master-detail"
      header={<AppHeader tone="accent" appName="Reading pane study" brandHref="#" />}
      sideNav={<NavPane label="Folders" title="Mail"><NavList label="Folders" value={folder} onSelect={setFolder} items={FOLDERS} /></NavPane>}
      footer={<StatusBar start={<span>{ITEMS.length} items · 3 unread</span>} end={<span>Reading pane: {pane}</span>} />}>
      <div className="study-page">
          <Inline gap="lg" wrap align="center" className="study-switches">
            <SegmentedControl label="Reading pane" value={pane} onChange={setPane} options={[{ value: 'right', label: 'Right' }, { value: 'bottom', label: 'Bottom' }, { value: 'off', label: 'Off' }]} />
            <SegmentedControl label="Rows" value={rows} onChange={setRows} options={[{ value: 'one', label: 'One line' }, { value: 'two', label: 'Two lines' }]} />
          </Inline>
          <Mail key={pane + rows} pane={pane} rows={rows} />
      </div>
    </AppShell>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><App /></SessionProvider>);
