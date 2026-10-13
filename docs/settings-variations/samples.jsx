/* Settings page variations (docs/settings-variations/samples.jsx): the Account settings page drawn five ways, only with
   Platform components and tokens inside the AppShell, for the owner's review (2026-10-12). A study, not a Platform part.
   Compiled to samples.js with @babel/standalone (scratchpad build-study.js). */
const { AppShell, AppHeader, NavPane, NavList, PageContent, StatusBar, SessionProvider, Avatar, Button, Inline, Stack, Input,
  Select, Switch, SettingsSection, SettingsRow, Field, Columns, Tabs, RecordPage, EntityHeader, ActionBar, Text, Notice } = Plenix;
const { useState } = React;

const ME = { name: 'Raphael Maher', email: 'raphael@lighthouseway.org' };

// the shared controls of the page, so every variation shows the same settings
const Picture = () => <Inline gap="sm" align="center"><Avatar name={ME.name} size="md" /><Button size="sm" icon="settings-camera">Change picture</Button></Inline>;
const NameInput = (p) => <Input defaultValue={ME.name} aria-label={p.label ? undefined : 'Name'} id={p.id} autoComplete="name" />;
const EmailInput = (p) => <Input type="email" defaultValue={ME.email} aria-label={p.label ? undefined : 'Email'} id={p.id} autoComplete="email" />;
const CalendarSelect = (p) => <Select defaultValue="outlook" aria-label={p.label ? undefined : 'Calendar source'} id={p.id}><option value="outlook">Outlook Calendar</option><option value="gcal">Google Calendar</option><option value="apple">Apple Calendar</option></Select>;
const EmailSelect = (p) => <Select defaultValue="outlook" aria-label={p.label ? undefined : 'Email source'} id={p.id}><option value="outlook">Outlook</option><option value="gmail">Gmail</option></Select>;
const Notifications = () => <Switch defaultChecked label="Browser notifications" />;
const SignOut = () => <Button variant="danger-secondary" icon="sign-out">Sign out</Button>;
const Header = () => <RecordPage.Header title="Account" description="Profile, integrations and connected services." size="lg" headingLevel={1} />;

// A · today: rows (label at the start, control at the end) under section titles
function RowsVariant() {
  return <Stack gap="lg"><Header />
    <SettingsSection title="Profile">
      <SettingsRow label="Picture"><Picture /></SettingsRow>
      <SettingsRow label="Name"><Stack width="sm"><NameInput /></Stack></SettingsRow>
      <SettingsRow label="Email"><Stack width="md"><EmailInput /></Stack></SettingsRow>
    </SettingsSection>
    <SettingsSection title="Integrations">
      <SettingsRow label="Calendar source"><CalendarSelect /></SettingsRow>
      <SettingsRow label="Email source"><EmailSelect /></SettingsRow>
    </SettingsSection>
    <SettingsSection title="Security">
      <SettingsRow label="Browser notifications" description="Alerts while Plenix is open in a tab"><Switch defaultChecked aria-label="Browser notifications" /></SettingsRow>
      <SettingsRow label="Sign out" description="Ends this session on this device"><SignOut /></SettingsRow>
    </SettingsSection>
  </Stack>;
}

// B · cards: each section a bordered card; the profile's Save and Discard in the card's action bar
function CardsVariant() {
  return <Stack gap="lg"><Header />
    <SettingsSection card title="Profile" description="How you appear to the people you work with." actions={<><Button>Discard</Button><Button variant="primary">Save</Button></>}>
      <SettingsRow label="Picture"><Picture /></SettingsRow>
      <SettingsRow label="Name"><Stack width="sm"><NameInput /></Stack></SettingsRow>
      <SettingsRow label="Email"><Stack width="md"><EmailInput /></Stack></SettingsRow>
    </SettingsSection>
    <SettingsSection card title="Integrations" description="Where your calendar and email come from.">
      <SettingsRow label="Calendar source"><CalendarSelect /></SettingsRow>
      <SettingsRow label="Email source"><EmailSelect /></SettingsRow>
    </SettingsSection>
    <SettingsSection card title="Security">
      <SettingsRow label="Browser notifications"><Switch defaultChecked aria-label="Browser notifications" /></SettingsRow>
      <SettingsRow label="Sign out"><SignOut /></SettingsRow>
    </SettingsSection>
  </Stack>;
}

// C · two columns: each section's title and description on the start side, its fields (labels above) on the end side
function TwoColumnVariant() {
  const Section = (p) => <Columns count={2} divided><Stack gap="xs"><Text variant="heading" as="h2">{p.title}</Text><Text variant="secondary" as="p">{p.desc}</Text></Stack><Stack gap="md">{p.children}</Stack></Columns>;
  return <Stack gap="xl"><Header />
    <Section title="Profile" desc="How you appear to the people you work with.">
      <Field label="Picture"><Picture /></Field>
      <Field label="Name" htmlFor="v3-name"><NameInput id="v3-name" label /></Field>
      <Field label="Email" htmlFor="v3-email" description="Used to sign in and for notifications."><EmailInput id="v3-email" label /></Field>
      <ActionBar label="Profile actions"><Button>Discard</Button><Button variant="primary">Save</Button></ActionBar>
    </Section>
    <Section title="Integrations" desc="Where your calendar and email come from.">
      <Field label="Calendar source" htmlFor="v3-cal"><CalendarSelect id="v3-cal" label /></Field>
      <Field label="Email source" htmlFor="v3-mail"><EmailSelect id="v3-mail" label /></Field>
    </Section>
    <Section title="Security" desc="Notifications and this session.">
      <Notifications />
      <Inline><SignOut /></Inline>
    </Section>
  </Stack>;
}

// D · profile first: the person as the page's entity header, then the other settings as rows
function ProfileVariant() {
  return <Stack gap="lg">
    <EntityHeader media={{ person: ME.name, color: 'blue' }} context="Account" title={ME.name} facts={[ME.email, 'Admin', <>Member since <Text variant="data">Oct 2026</Text></>]}
      actions={[{ icon: 'settings-camera', label: 'Change picture' }, { icon: 'pencil', label: 'Edit profile', primary: true }]} headingLevel={1} />
    <SettingsSection title="Integrations">
      <SettingsRow label="Calendar source"><CalendarSelect /></SettingsRow>
      <SettingsRow label="Email source"><EmailSelect /></SettingsRow>
    </SettingsSection>
    <SettingsSection title="Security">
      <SettingsRow label="Browser notifications"><Switch defaultChecked aria-label="Browser notifications" /></SettingsRow>
      <SettingsRow label="Sign out"><SignOut /></SettingsRow>
    </SettingsSection>
  </Stack>;
}

// E · tabs: one tab per section, a form with labels above its fields and Save and Cancel at its end
function TabsVariant() {
  const [tab, setTab] = useState('profile');
  const form = (children, save) => <Stack gap="md">{children}{save ? <ActionBar label="Form actions"><Button>Cancel</Button><Button variant="primary">Save</Button></ActionBar> : null}</Stack>;
  return <Stack gap="lg"><Header />
    <Tabs label="Account sections" value={tab} onChange={setTab} items={[
      { value: 'profile', label: 'Profile', content: form(<><Field label="Picture"><Picture /></Field><Field label="Name" htmlFor="v5-name"><NameInput id="v5-name" label /></Field><Field label="Email" htmlFor="v5-email"><EmailInput id="v5-email" label /></Field></>, true) },
      { value: 'integrations', label: 'Integrations', content: form(<><Field label="Calendar source" htmlFor="v5-cal"><CalendarSelect id="v5-cal" label /></Field><Field label="Email source" htmlFor="v5-mail"><EmailSelect id="v5-mail" label /></Field></>, true) },
      { value: 'security', label: 'Security', content: form(<><Notifications /><Notice tone="warning">Signing out ends this session on this device.</Notice><Inline><SignOut /></Inline></>, false) }
    ]} />
  </Stack>;
}

const VARIANTS = [
  { id: 'a', label: 'A · Rows (today)', icon: 'list-lines', View: RowsVariant },
  { id: 'b', label: 'B · Cards', icon: 'cards-medium', View: CardsVariant },
  { id: 'c', label: 'C · Two columns', icon: 'view-table', View: TwoColumnVariant },
  { id: 'd', label: 'D · Profile first', icon: 'person', View: ProfileVariant },
  { id: 'e', label: 'E · Tabs', icon: 'grid-2x2', View: TabsVariant }
];

function App() {
  const [sel, setSel] = useState('a');
  const v = VARIANTS.find((x) => x.id === sel);
  return (
    <AppShell page="settings"
      header={<AppHeader tone="accent" appName="Settings variations" brandHref="#" />}
      sideNav={<NavPane label="Variations" title="Account page"><NavList label="Variations" value={sel} onSelect={setSel} items={VARIANTS.map((x) => ({ id: x.id, label: x.label, icon: x.icon }))} /></NavPane>}
      footer={<StatusBar start={<span>{v.label}</span>} end={<span>Platform components only</span>} />}>
      <div className="plx-app-shell__page"><PageContent><v.View /></PageContent></div>
    </AppShell>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><App /></SessionProvider>);
