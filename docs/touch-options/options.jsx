/* Touch options study (docs/touch-options/options.jsx): the two open touch decisions drawn with Platform components, so
   the owner can choose (owner, 2026-10-15: "i need to see visual options"; GitHub #26 and #27). 1. where the pane's size
   menu goes with touch (it covers the pane today); 2. what the AppHeader's links follow when the header is narrower than
   the screen. A study, not a Platform part. Compiled to options.js with tools/agent/build-study.js. */
const { Button, Menu, MenuItem, MenuDivider, MenuGroup, NavList, Text, Stack, Inline, Badge, AppHeader, SearchField, SessionProvider, SectionHeading } = Plenix;
const { useState } = React;
const noop = () => {};

const FOLDERS = [
  { id: 'all', label: 'All assets', icon: 'folder' },
  { id: 'brand', label: 'Brand kit', icon: 'folder' },
  { id: 'projects', label: 'Projects', icon: 'folder' },
  { id: 'archive', label: 'Archive', icon: 'folder' },
];
const SIZE_ITEMS = <><MenuItem icon="column-narrower">Narrower</MenuItem><MenuItem icon="column-wider">Wider</MenuItem><MenuDivider /><MenuItem icon="column-fit">Reset width</MenuItem><MenuItem icon="panel-left-close">Collapse</MenuItem></>;
const sizeMenu = (cls) => <Menu label="Folders pane width" placement="bottom-start" className={cls}
  trigger={<Button size="sm" variant="secondary" iconOnly icon="drag" label="Folders pane width" />}>{SIZE_ITEMS}</Menu>;

function Pane({ head, children }) {
  const [cur, setCur] = useState('brand');
  return (
    <div className="study-pane">
      <div className="study-pane__head"><SectionHeading>Folders</SectionHeading>{head}</div>
      <NavList label="Folders" items={FOLDERS} current={cur} onSelect={(it) => setCur(it.id)} />
      {children}
    </div>
  );
}
function Content() {
  return <div className="study-content"><Text as="p" variant="title">Brand kit</Text><Text as="p" tone="muted">The selected folder's assets show here.</Text></div>;
}
function Option({ letter, title, recommended, pros, cons, children }) {
  return (
    <section className="study-option" aria-label={'Option ' + letter + ': ' + title}>
      <Inline gap="sm" align="center"><Text as="h3" variant="heading">{letter}. {title}</Text>{recommended ? <Badge tone="success" icon="check">Recommended</Badge> : null}</Inline>
      <div className="study-frame">{children}</div>
      <div className="study-notes">
        <Stack gap="xs"><Text as="p" variant="label">For</Text><ul className="study-list">{pros.map((p) => <li key={p}>{p}</li>)}</ul></Stack>
        <Stack gap="xs"><Text as="p" variant="label">Against</Text><ul className="study-list">{cons.map((p) => <li key={p}>{p}</li>)}</ul></Stack>
      </div>
    </section>
  );
}

function Splitter() {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text as="h2" variant="title">1. The pane's size menu with touch</Text>
        <Text as="p">A pane's width can be changed without dragging, from a small menu: Narrower, Wider, Reset width, Collapse. With a mouse its button shows on hover; with touch there is no hover, so it must always show. Each frame below is a tablet with touch (48px targets). Tap the buttons: the menus work.</Text>
      </Stack>
      <Option letter="Today" title="On the divider, over the pane" pros={['Right where the resizing happens']} cons={['Covers the pane’s content (here: a folder row)', 'One of the touch-target findings left (it overlaps a 48px row)']}>
        <div className="study-shell"><Pane>{sizeMenu('study-on-edge')}</Pane><div className="study-divider" /><Content /></div>
      </Option>
      <Option letter="A" title="A strip reserved beside the pane" pros={['Always visible, covers nothing', 'Stays on the divider, where resizing is']} cons={['Costs 48px of width on every pane, even when nobody resizes', 'A column of empty space under the button']}>
        <div className="study-shell"><Pane /><div className="study-strip">{sizeMenu()}</div><Content /></div>
      </Option>
      <Option letter="B" title="An icon button in the pane's header" recommended pros={['Always visible, covers nothing, no space lost', 'Found where the pane’s own controls are', 'One place for touch, mouse and keyboard']} cons={['A step away from the divider (the drag still works on the divider)']}>
        <div className="study-shell"><Pane head={sizeMenu()} /><div className="study-divider" /><Content /></div>
      </Option>
      <Option letter="C" title="Inside the pane's More menu" pros={['No new button at all']} cons={['Hidden: hard to find on a phone or tablet', 'Needs a More menu on every pane that resizes']}>
        <div className="study-shell">
          <Pane head={<Menu label="Folders options" placement="bottom-start" trigger={<Button size="sm" variant="ghost" iconOnly icon="more" label="Folders options" />}>
            <MenuItem icon="folder-add">New folder</MenuItem><MenuItem icon="refresh">Refresh</MenuItem><MenuDivider />
            <MenuGroup label="Pane width">{SIZE_ITEMS}</MenuGroup></Menu>} />
          <div className="study-divider" /><Content />
        </div>
      </Option>
    </Stack>
  );
}

const header = (key) => (
  <AppHeader key={key} tone="accent" currentApp="dam" appsRoot="../../" onOpenApp={() => true}
    search={<SearchField placeholder="Search assets" label="Search everything" onAccent />}
    account={<AppHeader.Account myAccount={{ onSelect: noop }} settings={{ onSelect: noop }} signOut={{ onSelect: noop }} />} />
);
function HeaderWidths({ cq }) {
  return (
    <Stack gap="md">
      {[['wide', 'A full window (900px)'], ['split', 'Split view: half a desktop screen (720px)'], ['narrow', 'An embedded page or a side panel (400px)']].map(([w, label]) => (
        <Stack key={w} gap="xs">
          <Text as="p" variant="label">{label}</Text>
          <div className={'study-header study-header--' + w + (cq ? ' study-header--cq' : '')}>{header(w)}</div>
        </Stack>
      ))}
    </Stack>
  );
}
function HeaderCollapse() {
  return (
    <Stack gap="lg">
      <Stack gap="sm">
        <Text as="h2" variant="title">2. The AppHeader's links in a narrow header</Text>
        <Text as="p">Below 840px the header hides its pinned-app links (the app switcher in the header name still has them) and lets the search span the bar. Today it checks the screen's width. When the header is narrower than the screen (a split view, an embedded page), the links stay and crowd the bar. These frames are on this wide screen, so they show exactly that.</Text>
      </Stack>
      <Option letter="A" title="By the screen's width (today)" pros={['No change']} cons={['In a split view or an embedded page the links crowd the bar and their targets shrink (the other touch finding left)']}>
        <HeaderWidths />
      </Option>
      <Option letter="B" title="By the header's own width" recommended pros={['The header looks the same wherever it sits: a full window, a split view, a panel', 'The same rule as today, measured on the header instead of the screen (a container query)']} cons={['Every app’s header changes behavior in split views (on purpose)']}>
        <HeaderWidths cq />
      </Option>
    </Stack>
  );
}

function App() {
  return (
    <SessionProvider>
      <main className="study-page">
        <Stack gap="xl">
          <Stack gap="sm">
            <Text as="h1" variant="display">Touch options</Text>
            <Text as="p">Two decisions waiting on the owner, drawn with Platform components (GitHub plenix-ds/plenix-platform #26 and #27). Each option says what speaks for it and against it; the recommended one is marked.</Text>
          </Stack>
          <Splitter />
          <HeaderCollapse />
        </Stack>
      </main>
    </SessionProvider>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
