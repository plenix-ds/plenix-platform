/* Plenix asset app · System Settings (app/pages/SystemSettingsPage.jsx): catalog-wide configuration in 14 sections.
   Replaces the HTML of settings-system.html (batch 110). Each section is a screen with its address (#/properties,
   #/users, …; the older #users opens the same) and a history entry (Platforms Standard 4.3); every section stays mounted,
   so unsaved edits survive switching, and leaving the page while a form has unsaved edits asks (useUnsavedGuard). Actions
   that have no back end yet confirm with a toast, as the HTML page did.
   Every screen is a column of SettingsSection cards (owner, 2026-10-13: "all the settings pages to have the cards view"):
   static cards for what people use, collapsible cards for long or rarely used parts (one per asset type, group and
   permission area; the views, publishing, events and scripts not built yet); their open state is remembered per page.
   Fields are Fields (a visible label) with their control at a standard width; tables are DataTables; technical values
   (templates, paths, keys, numbers) are in the data font. */
import React from 'react';
import { SettingsLayout, SettingsSection, SettingsRow, NavList, RecordPage, Field, Input, Textarea, Select, Combobox, Switch, Checkbox, ActionBar, Button, ButtonGroup, DataTable, Table, Badge, Icon, Menu, MenuItem, SearchField, Dialog, Toolbar, EmptyState, useToast, NavPane, Stack, Inline, Text, CodeBlock, useScreenLocation, useUnsavedGuard } from 'plenix-platform';
import { AssetPage } from '../shell/AssetShell.jsx';
import * as D from './systemSettingsData.js';

const NAV = [
  { heading: 'Content', collapsible: true, items: [
    { id: 'properties', label: 'Properties', icon: 'settings-general' }, { id: 'fields', label: 'Fields', icon: 'settings-metadata' },
    { id: 'asset-types', label: 'Asset types', icon: 'settings-categories' }, { id: 'hot-folders', label: 'Hot folders', icon: 'folder-add' },
    { id: 'transcoding', label: 'Transcoding', icon: 'settings-camera' }] },
  { heading: 'People & Access', collapsible: true, items: [
    { id: 'users', label: 'Users', icon: 'settings-users' }, { id: 'groups', label: 'Groups', icon: 'briefcase' },
    { id: 'permissions', label: 'Site permissions', icon: 'settings-permissions' }] },
  { heading: 'System', collapsible: true, items: [
    { id: 'email-templates', label: 'Email templates', icon: 'settings-email' }, { id: 'catalog-parameters', label: 'Catalog parameters', icon: 'settings-catalog' },
    { id: 'server', label: 'Server', icon: 'settings-maintenance' }, { id: 'database', label: 'Database', icon: 'settings-database' },
    { id: 'customizations', label: 'Customizations', icon: 'settings-customize' }, { id: 'scheduler', label: 'Scheduler', icon: 'settings-scheduler' }] },
];
const IDS = NAV.reduce((all, g) => all.concat(g.items.map((i) => i.id)), []);

/* ── the screen and its cards ── */
// the screen a card belongs to: every screen stays mounted, so a card's open state is remembered as "<screen>:<title>"
const ScreenKey = React.createContext('');
const Screen = ({ id, title, description, actions, children }) => (
  <ScreenKey.Provider value={id}>
    <RecordPage.Header title={title} description={description} actions={actions} headingLevel={2} />
    {children}
  </ScreenKey.Provider>
);
const Section = ({ stateKey, ...p }) => { const screen = React.useContext(ScreenKey); return <SettingsSection stateKey={screen + ':' + (stateKey || p.title)} {...p} />; };
// a part not built yet: a collapsible card, closed, that says so
const Planned = ({ title, children }) => (
  <Section title={title} collapsible defaultExpanded={false} description={children}><EmptyState title="Not configured yet" /></Section>
);
// how many of how many: the figures are technical values
const CountNote = ({ shown, total, what }) => <Text as="p" variant="secondary">{'Showing '}<Text variant="data">{shown}</Text>{' of '}<Text variant="data">{total}</Text>{' ' + what}</Text>;

function useAct() {
  const toast = useToast();
  return (label, tone = 'success') => () => toast.show(label, { tone });
}
const B = ({ icon, label, tone, act, variant, ...rest }) => <Button size="sm" icon={icon} variant={variant} onClick={act(label, tone)} {...rest}>{label}</Button>;
const Bar = ({ children, label }) => <Toolbar label={label}>{children}</Toolbar>;
const Search = ({ value, onChange, label }) => (
  <Stack width="lg" push>
    <SearchField value={value} onChange={(e) => onChange(e.target.value)} onClear={() => onChange('')} label={label} placeholder={label + '...'} />
  </Stack>
);
const match = (q, row) => !q || row.some((c) => String(c || '').toLowerCase().indexOf(q.toLowerCase()) >= 0);
const rowsOf = (list, keys) => list.map((r, i) => Object.assign({ id: i }, ...keys.map((k, j) => ({ [k]: r[j] }))));
const switchCol = (title) => ({ title, field: 'on', kind: 'center', headerSort: false, render: (r) => <Switch label={r.name + ': ' + title} labelHidden checked={r.on} onChange={() => r.toggle()} /> });
function useToggles(list) {
  const [on, setOn] = React.useState(list.map((r) => r[1]));
  return list.map((r, i) => ({ id: i, name: r[0], on: on[i], toggle: () => setOn(on.map((v, j) => (j === i ? !v : v))) }));
}
// a name/value list as a table with a header (owner, 2026-10-09: every name/value list in the DataTable's look); values are technical
const facts = (label, list) => <Table label={label} headerMenu={false} data={list.map(([k, v], i) => ({ id: i, name: k, value: v }))}
  columns={[{ title: 'Name', field: 'name', kind: 'name', rowLabel: true, headerSort: false }, { title: 'Value', field: 'value', kind: 'data', headerSort: false }]} />;
// the form's buttons: in an ActionBar (on the right, sticky at the bottom), a destructive action first, the primary last
const Actions = ({ act, save = 'Save', del = 'Delete' }) => (
  <ActionBar label="Form actions">{del ? <Button variant="danger-secondary" onClick={act(del, 'warning')}>{del}</Button> : null}<Button type="submit" variant="primary">{save}</Button></ActionBar>
);
// a form is edited from its first change (a search field is not an edit) until it is saved
const Edited = React.createContext(() => {});
const Form = ({ act, saved, children }) => {
  const mark = React.useContext(Edited), id = React.useId();
  const onChange = (e) => { const t = e.target; if (t && (t.type === 'search' || (t.closest && t.closest('[role="search"]')))) return; mark(id, true); };
  return <form noValidate onChange={onChange} onSubmit={(e) => { e.preventDefault(); mark(id, false); act(saved, 'success')(); }}>{children}</form>;
};
// configuration values: no autofill; a path or a template is technical (the data font) and gets no capitals or spell check
const PATH = { autoCapitalize: 'off', spellCheck: false, data: true };

/* ── Content ── */
function Properties({ act }) {
  const [p, setP] = React.useState(D.PROPERTIES);
  const [views, setViews] = React.useState(D.RESULT_VIEWS.map((v) => ({ value: v, label: v })));
  // configuration values: no autofill; a path or a number gets its own keyboard (Platforms Standard 3.5)
  const text = (k, extra) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }), name: k, autoComplete: 'off', ...extra });
  // a switch is a settings row: the label at the start, the switch (named by it) at the end
  const sw = (k, label, description) => <SettingsRow label={label} description={description}><Switch label={label} labelHidden checked={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.checked })} /></SettingsRow>;
  const enabled = useToggles(D.ENABLED_FOR), viewAll = useToggles(D.VIEW_ALL), editAll = useToggles(D.EDIT_ALL);
  const roleCol = { title: 'Group / Role', field: 'name', kind: 'name', frozen: true, filter: true };
  return (
    <Form act={act} saved="Save">
      <Screen id="properties" title="Files properties" description="Module-level configuration for the asset table.">
        <Section title="Properties">
          <Field label="Default record label" layout="inline"><Input {...text('defaultRecordLabel', PATH)} /></Field>
          <Field label="Tab ordering" layout="inline"><Input width="sm" {...text('tabOrdering', { inputMode: 'numeric', data: true })} /></Field>
          {sw('enableUploading', 'Enable uploading')}
          {sw('enableOnSearch', 'Enable on search')}
          <Field label="Default results view" layout="inline">
            <Combobox options={views} value={p.defaultResultsView} onChange={(v) => setP({ ...p, defaultResultsView: v })} creatable
              onCreate={(t) => { const v = t.trim(); if (v) { setViews(views.concat({ value: v, label: v })); setP({ ...p, defaultResultsView: v }); } }} />
          </Field>
          <Field label="Default sort field" layout="inline"><Input width="lg" {...text('defaultSortField', { placeholder: 'Default sort field', ...PATH })} /></Field>
          <Field label="Upload source path" layout="inline"><Input {...text('uploadSourcepath', { inputMode: 'url', ...PATH })} /></Field>
        </Section>
        <Section title="Folders and search" description="How folders become entities, and how the AI search reads a query.">
          {sw('autoCreateEntities', 'Auto create entities')}
          <Field label="Root folder path" layout="inline"><Input {...text('rootFolderPath', { placeholder: 'Root folder path', inputMode: 'url', ...PATH })} /></Field>
          <Field label="Auto create at folder level" layout="inline" info="Scan deep A/B/C, B = 2"><Input width="sm" {...text('autoCreateAtFolderLevel', { inputMode: 'numeric', enterKeyHint: 'done', data: true })} /></Field>
          {sw('semanticEnabled', 'Semantic search')}
          <Field label="AI search prompt" layout="inline"><Textarea {...text('aiSearchPrompt', { placeholder: 'AI search prompt' })} /></Field>
          <Field label="AI search contains" layout="inline"><Textarea {...text('aiSearchContains', { placeholder: 'AI search contains' })} /></Field>
        </Section>
        <Section title="Enabled for" collapsible description="Groups and roles that can use this module.">
          <DataTable label="Enabled for" data={enabled} columns={[roleCol, switchCol('Enabled')]} />
        </Section>
        <Section title="Actions" collapsible defaultExpanded={false} description="The actions of this module and the roles that may run them.">
          <DataTable label="Actions" data={rowsOf(D.ACTIONS, ['name', 'roles'])}
            columns={[{ title: 'Action', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Roles', field: 'roles', filter: true }, { title: 'Status', field: 'status', kind: 'center', headerSort: false, render: () => <Badge tone="success">Active</Badge> }]} />
        </Section>
        <Section title="View all folders" collapsible defaultExpanded={false} description="Groups and roles that can view all folders for this module.">
          <DataTable label="View all folders" data={viewAll} columns={[roleCol, switchCol('View all')]} />
        </Section>
        <Section title="Edit all folders" collapsible defaultExpanded={false} description="Groups and roles that can edit all folders for this module.">
          <DataTable label="Edit all folders" data={editAll} columns={[roleCol, switchCol('Edit all')]} />
        </Section>
        <Actions act={act} />
      </Screen>
    </Form>
  );
}

function Fields({ act }) {
  const [q, setQ] = React.useState('');
  const rows = rowsOf(D.FIELDS.filter((r) => match(q, r)), ['name', 'id2', 'type']);
  return (
    <Screen id="fields" title="Fields" description="The metadata field registry for assets — every field's name, internal ID, and type.">
      <Section title="New field">
        <SettingsRow label="Field name" htmlFor="system-new-field">
          <Inline gap="sm" wrap><Input id="system-new-field" name="newFieldName" autoComplete="off" enterKeyHint="done" width="lg" placeholder="New field name..." /><B icon="add" label="Add field" act={act} /></Inline>
        </SettingsRow>
      </Section>
      <Section title="All fields" description={D.FIELD_TOTAL + ' fields in the registry'}>
        <Bar label="Field actions"><Search value={q} onChange={setQ} label={'Search ' + D.FIELD_TOTAL + ' fields'} /></Bar>
        <DataTable label="Fields" data={rows} empty="No fields match" columns={[{ title: 'Field name', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'ID', field: 'id2', kind: 'data' }, { title: 'Field type', field: 'type', kind: 'data', filter: 'list' }]} />
        <CountNote shown={rows.length} total={D.FIELD_TOTAL} what="fields" />
      </Section>
      <Planned title="Edit views">Configure which fields appear on the asset edit form, and in what order.</Planned>
      <Planned title="Application views">Configure which fields appear in application-wide views such as search results and tables.</Planned>
    </Screen>
  );
}

function AssetTypes({ act }) {
  const [types, setTypes] = React.useState(D.ASSET_TYPES.map(([name, ext, order]) => ({ name, ext, paths: '', order: String(order) })));
  const edit = (i, k) => (e) => setTypes(types.map((t, j) => (j === i ? { ...t, [k]: e.target.value } : t)));
  return (
    <Form act={act} saved="Save changes">
      <Screen id="asset-types" title="Asset types" description="The file-format categories assets are classified under, used to route transcoding and preview generation."
        actions={<B icon="add" label="Add asset type" act={act} />}>
        {/* one collapsible card per type, the first open */}
        {types.map((t, i) => (
          <Section key={i} title={D.ASSET_TYPES[i][0]} stateKey={'type-' + i} collapsible defaultExpanded={i === 0}>
            <Field label="Name" layout="inline"><Input name="name" autoComplete="off" width="lg" value={t.name} onChange={edit(i, 'name')} /></Field>
            <Field label="Extensions" layout="inline"><Textarea name="extensions" autoComplete="off" autoCapitalize="off" spellCheck={false} className="plx-font-data" value={t.ext} onChange={edit(i, 'ext')} /></Field>
            <Field label="Paths" layout="inline"><Input name="paths" autoComplete="off" placeholder="Paths" value={t.paths} onChange={edit(i, 'paths')} {...PATH} /></Field>
            <Field label="Ordering" layout="inline"><Input name="ordering" inputMode="numeric" autoComplete="off" enterKeyHint="done" width="sm" data value={t.order} onChange={edit(i, 'order')} /></Field>
          </Section>
        ))}
        <Actions act={act} save="Save changes" />
      </Screen>
    </Form>
  );
}

function HotFolders({ act }) {
  return (
    <Screen id="hot-folders" title="Hot folders" description="Watched folders that are automatically scanned and imported as assets."
      actions={<Inline gap="sm"><B icon="schedule" label="Schedule importing" act={act} /><B icon="add" label="Add hot folder" act={act} /></Inline>}>
      <Section title="Watched folders">
        {D.HOT_FOLDERS.map((f) => (
          <SettingsRow key={f.name} label={<Inline gap="sm"><Icon name="folder" /><span>{f.name}</span>{f.enabled ? <Badge tone="success">Enabled</Badge> : null}</Inline>} description={f.meta}>
            <Button size="sm" iconOnly icon="pencil" label={'Edit ' + f.name} onClick={act('Edit', 'info')} />
          </SettingsRow>
        ))}
      </Section>
    </Screen>
  );
}

function Transcoding({ act }) {
  return (
    <Screen id="transcoding" title="Transcoding" description="Conversion presets generated for each uploaded asset, by media type."
      actions={<B icon="add" label="Add new conversion" act={act} />}>
      <Section title="Preset configuration">
        <DataTable label="Conversion presets" data={rowsOf(D.CONVERSIONS, ['name', 'file', 'system', 'onImport', 'media'])} columns={[
          { title: 'Conversion', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Generated file', field: 'file', kind: 'data' }, { title: 'System defined', field: 'system', filter: 'list' },
          { title: 'On import', field: 'onImport', filter: 'list' }, { title: 'Media type', field: 'media', filter: 'list' }]} />
      </Section>
      <Planned title="Publishing">Configure which conversions are pushed to publishing targets.</Planned>
    </Screen>
  );
}

/* ── People & Access ── */
function Users({ act }) {
  const [q, setQ] = React.useState('');
  return (
    <Screen id="users" title="Users" description="Manage user accounts and view login activity." actions={<B icon="add" label="Create user" act={act} />}>
      <Section title="All users">
        <Bar label="User actions">
          <ButtonGroup label="Maintenance"><B icon="import" label="Import / Export" act={act} /><B icon="refresh" label="Reindex" tone="info" act={act} /></ButtonGroup>
          <Search value={q} onChange={setQ} label="Search users" />
        </Bar>
        <DataTable label="Users" empty="No users match" data={rowsOf(D.USERS.filter((r) => match(q, r)), ['user', 'name', 'email', 'role', 'created', 'login'])} columns={[
          { title: 'Username', field: 'user', kind: 'name', frozen: true, filter: true }, { title: 'Name', field: 'name', filter: true }, { title: 'Email', field: 'email', filter: true },
          { title: 'Role', field: 'role', kind: 'center', filter: 'list', render: (r) => (r.role ? <Badge tone="active">{r.role}</Badge> : '—') },
          { title: 'Created', field: 'created', kind: 'data' }, { title: 'Last login', field: 'login', kind: 'data' }]} />
      </Section>
    </Screen>
  );
}

function Groups({ act }) {
  const [names, setNames] = React.useState(D.GROUPS);
  return (
    <Form act={act} saved="Save changes">
      <Screen id="groups" title="Groups" description="Groups a user can be assigned to. Permissions are configured separately under Site permissions."
        actions={<B icon="add" label="Add group" act={act} />}>
        {D.GROUPS.map((g, i) => (
          <Section key={g} title={g} collapsible defaultExpanded={i === 0}>
            <Field label="Name" layout="inline"><Input name="name" autoComplete="off" width="lg" value={names[i]} onChange={(e) => setNames(names.map((n, j) => (j === i ? e.target.value : n)))} /></Field>
          </Section>
        ))}
        <Actions act={act} save="Save changes" del="Delete group" />
      </Screen>
    </Form>
  );
}

function Permissions({ act }) {
  const [role, setRole] = React.useState('Administrators');
  const [area, setArea] = React.useState('Show all');
  const [checked, setChecked] = React.useState(() => Object.fromEntries(D.PERMISSION_AREAS.flatMap((a) => a.items.map((it) => [a.id + ':' + it[0], true]))));
  const areas = D.PERMISSION_AREAS.filter((a) => area === 'Show all' || a.label === area);
  return (
    <Form act={act} saved="Save">
      <Screen id="permissions" title="Site permissions" description="Individually named permissions, grouped by area, assigned per role.">
        <Section title="Role" description="Choose the role to configure. The permissions below apply only to that role; View narrows the list to one area.">
          <Field label="Role" layout="inline"><Select name="role" value={role} onChange={(e) => setRole(e.target.value)}>{D.PERMISSION_ROLES.concat('+ Add new role').map((r) => <option key={r}>{r}</option>)}</Select></Field>
          <Field label="View" layout="inline"><Select name="view" value={area} onChange={(e) => setArea(e.target.value)}>{['Show all'].concat(D.PERMISSION_AREAS.map((a) => a.label)).map((r) => <option key={r}>{r}</option>)}</Select></Field>
        </Section>
        {/* one collapsible card per area: its permissions as checkboxes */}
        {areas.map((a, i) => (
          <Section key={a.id} title={a.label} stateKey={a.id} collapsible defaultExpanded={i === 0} description={<>{'Showing '}<Text variant="data">{a.items.length}</Text>{' of '}<Text variant="data">{a.total}</Text>{' permissions for ' + role}</>}>
            <Stack>
              {a.items.map((it) => {
                const k = a.id + ':' + it[0];
                return <Checkbox key={k} name={k} label={it[0]} description={it[1]} checked={!!checked[k]} onChange={(e) => setChecked({ ...checked, [k]: e.target.checked })} />;
              })}
            </Stack>
          </Section>
        ))}
        <Actions act={act} />
      </Screen>
    </Form>
  );
}

/* ── System ── */
function EmailTemplates({ act }) {
  return (
    <Screen id="email-templates" title="Email templates" description="The notification emails the catalog sends, and the template file behind each one.">
      <Section title="Templates">
        <DataTable label="Email templates" data={rowsOf(D.EMAIL_TEMPLATES, ['name', 'file'])} columns={[
          { title: 'Template', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'File', field: 'file', kind: 'data' },
          { title: 'Actions', field: 'actions', kind: 'center', headerSort: false, render: (r) => <Button size="xs" variant="ghost" aria-label={'Edit ' + r.name} onClick={act('Edit ' + r.file, 'info')}>Edit</Button> }]} />
      </Section>
    </Screen>
  );
}

function CatalogParameters({ act }) {
  const [q, setQ] = React.useState('');
  const rows = D.CATALOG_PARAMETERS.filter((r) => match(q, r));
  return (
    <Form act={act} saved="Save changes">
      <Screen id="catalog-parameters" title="Catalog parameters" description="Catalog-wide configuration keys — storage, AI providers, and access defaults.">
        <Section title="Parameters" description={D.CATALOG_TOTAL + ' catalog settings'}>
          <Bar label="Parameter actions"><Search value={q} onChange={setQ} label="Search catalog settings" /></Bar>
          <DataTable label="Catalog parameters" empty="No settings match" data={rows.map(([label, id, value, kind]) => ({ id, label, key: id, value, kind }))} columns={[
            { title: 'Setting', field: 'label', kind: 'name', frozen: true, filter: true }, { title: 'Key', field: 'key', kind: 'data', filter: true },
            { title: 'Value', field: 'value', render: (r) => (r.kind !== 'text' ? <Text variant="data">{r.value}</Text> : r.value) }]} />
          <CountNote shown={rows.length} total={D.CATALOG_TOTAL} what="catalog settings" />
        </Section>
        <ActionBar label="Form actions"><Button type="submit" variant="primary">Save changes</Button></ActionBar>
      </Screen>
    </Form>
  );
}

function Server({ act }) {
  return (
    <Screen id="server" title="Server" description="Database cluster status, software versions, and application logs.">
      <Section title="Server status">
        {facts('Server status', D.SERVER_STATUS)}
        <ButtonGroup label="Server status actions"><B icon="refresh" label="Clear cached data" tone="info" act={act} /><B icon="database" label="Change Elasticsearch database master" tone="info" act={act} /></ButtonGroup>
      </Section>
      <Section title="Data management">
        <ButtonGroup label="Data management"><B icon="refresh" label="Reindex" tone="info" act={act} /><B icon="alert" label="View mapping conflicts" tone="info" act={act} /><B icon="list-bullets" label="View basic mappings" tone="info" act={act} /><B icon="import" label="Reload sets" tone="info" act={act} /></ButtonGroup>
      </Section>
      <Section title="Database snapshots" collapsible defaultExpanded={false} description="Snapshots are used by Elasticsearch to store and restore database data.">
        <SettingsRow label="Snapshots"><B icon="snapshot" label="View snapshots" tone="info" act={act} /></SettingsRow>
      </Section>
      <Section title="Data entities" collapsible defaultExpanded={false}>
        <ButtonGroup label="Data entities"><B icon="add" label="Create" act={act} /><B icon="save-doc" label="Save all modules" act={act} /></ButtonGroup>
      </Section>
      <Section title="Versions" collapsible defaultExpanded={false} description="The full dependency list runs to 100+ jars.">
        {facts('Versions', D.VERSIONS)}
        <Inline><Button size="sm" onClick={act('View all', 'info')}>View all</Button></Inline>
      </Section>
      <Section title="Logs" collapsible defaultExpanded={false} description="Where the application writes its log.">
        <CodeBlock>{D.LOG_PATH}</CodeBlock>
      </Section>
    </Screen>
  );
}

function Database({ act }) {
  const [table, setTable] = React.useState('asset');
  const [q, setQ] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const rows = D.DB_ROWS.filter((r) => match(q, r)).map((r, i) => Object.assign({ id: i }, ...D.DB_COLUMNS.map((c, j) => ({ ['c' + j]: r[j] }))));
  const columns = D.DB_COLUMNS.map((c, j) => ({ title: c, field: 'c' + j, frozen: j === 0, filter: true, kind: c === 'Asset title' ? 'name' : c === 'Created on' ? 'data' : undefined }));
  const grid = (label) => <DataTable label={label} data={rows} columns={columns} empty="No records match" />;
  return (
    <Screen id="database" title="Database" description="Browse, edit, import, or export any underlying data table." actions={<B icon="add" label="New table" tone="info" act={act} />}>
      <Section title="Table">
        <Field label="Table" layout="inline"><Combobox options={D.DB_TABLES.map((t) => ({ value: t, label: t }))} value={table} onChange={setTable} /></Field>
      </Section>
      <Section title={'Records in ' + table} stateKey="records" description={<>{'Found '}<Text variant="data">{D.DB_TOTAL.records}</Text>{' records · page '}<Text variant="data">1</Text>{' of '}<Text variant="data">{D.DB_TOTAL.pages}</Text></>}>
        <Bar label="Record actions">
          <B icon="add" label="Add new" act={act} />
          <ButtonGroup label="Transfer"><B icon="refresh" label="Reindex" tone="info" act={act} /><B icon="import" label="Import" act={act} /><B icon="export" label="Export" tone="info" act={act} /></ButtonGroup>
          <B icon="doc-text" label="Export text" tone="info" act={act} />
          <Button size="sm" iconOnly icon="close" label="Reset settings" onClick={act('Settings reset', 'info')} />
          <Menu label="Delete" trigger={<Button size="sm" variant="danger-secondary" icon="trash" caret>Delete</Button>}>
            <MenuItem icon="trash" danger onSelect={act('Delete ' + D.DB_TOTAL.records + ' records', 'warning')}>{'Delete ' + D.DB_TOTAL.records + ' records'}</MenuItem>
            <MenuItem icon="trash" danger onSelect={act('Delete table', 'warning')}>Delete table</MenuItem>
          </Menu>
          <Button size="sm" icon="expand" onClick={() => setExpanded(true)}>Expand</Button>
          <Search value={q} onChange={setQ} label="Search" />
        </Bar>
        {grid('Table: ' + table)}
        <Inline justify="end"><Button size="sm" iconEnd="chevron-right" onClick={act('Forward', 'info')}>Next page</Button></Inline>
        <Dialog open={expanded} onClose={() => setExpanded(false)} title={'Table: ' + table} icon="expand" size="full">{grid('Table: ' + table + ', expanded')}</Dialog>
      </Section>
      <Planned title="Customize fields">Configure the fields available on this table — the same editor as Files &gt; Fields, scoped to this table.</Planned>
      <Planned title="Customize views">Configure how records in this table are displayed in lists and edit forms.</Planned>
      <Planned title="Elastic system info">Raw Elasticsearch mapping and index info for this table.</Planned>
    </Screen>
  );
}

function Customizations({ act }) {
  const rows = rowsOf(D.CUSTOMIZATIONS, ['type', 'name', 'modules', 'date']);
  const [sel, setSel] = React.useState(rows.map((r) => r.id));
  return (
    <Screen id="customizations" title="Customizations" description="Track configuration changes across modules, and export or import them between environments.">
      <Section title="Changes">
        <Bar label="Customization actions">
          <B icon="refresh" label="Scan for changes" tone="info" act={act} />
          <ButtonGroup label="Transfer"><B icon="export" label="Export" tone="info" act={act} /><B icon="import" label="Import" act={act} /></ButtonGroup>
          <B icon="trash" label="Delete" tone="warning" variant="danger-secondary" act={act} />
        </Bar>
        <DataTable label="Customizations" selectable selected={sel} onSelectionChange={setSel} data={rows} columns={[
          { title: 'Type', field: 'type', filter: 'list' }, { title: 'Customization', field: 'name', kind: 'name', filter: true }, { title: 'Modules', field: 'modules', kind: 'data' }, { title: 'Date', field: 'date', kind: 'data' }]} />
      </Section>
    </Screen>
  );
}

function Scheduler({ act }) {
  return (
    <Screen id="scheduler" title="Scheduler" description="Recurring background tasks, the events that trigger them, and the scripts they run."
      actions={<B icon="refresh" label="Refresh" tone="info" act={act} />}>
      <Section title="Scheduled tasks">
        <DataTable label="Scheduled tasks" data={rowsOf(D.SCHEDULED, ['name', 'path', 'status'])} columns={[
          { title: 'Name', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Path', field: 'path', kind: 'data' }, { title: 'Status', field: 'status', filter: 'list' }]} />
      </Section>
      <Planned title="Events">Events that trigger scripts to run, such as an asset upload or a metadata change.</Planned>
      <Planned title="Scripts">Groovy scripts that scheduled tasks and events run.</Planned>
    </Screen>
  );
}

const SECTIONS = {
  properties: Properties, fields: Fields, 'asset-types': AssetTypes, 'hot-folders': HotFolders, transcoding: Transcoding,
  users: Users, groups: Groups, permissions: Permissions,
  'email-templates': EmailTemplates, 'catalog-parameters': CatalogParameters, server: Server, database: Database, customizations: Customizations, scheduler: Scheduler,
};

// the section is the screen: choosing one pushes a history entry, Back and Forward follow
const legacy = (hash) => (IDS.indexOf(hash.slice(1)) >= 0 ? '/' + hash.slice(1) : null);
function useSection() {
  const loc = useScreenLocation({ app: 'assets-system', legacy });
  const section = IDS.indexOf(loc.parts[0]) >= 0 ? loc.parts[0] : 'properties';
  const go = (id) => { if (IDS.indexOf(id) < 0) return; loc.navigate([id]); };
  return [section, go];
}

function Content({ section }) {
  const act = useAct();
  // the forms with unsaved edits; every section stays mounted, so only leaving the page asks
  const [edited, setEdited] = React.useState({});
  const mark = React.useCallback((id, on) => setEdited((d) => (!!d[id] === on ? d : { ...d, [id]: on })), []);
  useUnsavedGuard(Object.keys(edited).some((k) => edited[k]), 'Your settings changes have not been saved.', { keeps: () => true });
  return (
    <Edited.Provider value={mark}>
      <SettingsLayout>
        {IDS.map((id) => { const S = SECTIONS[id]; return <div key={id} hidden={section !== id}><S act={act} /></div>; })}
      </SettingsLayout>
    </Edited.Provider>
  );
}

export function SystemSettingsPage() {
  const [section, go] = useSection();
  return (
    <AssetPage title="System settings" current="system" sideNav={<NavPane as="div" label="Settings sections" title="System settings" header={<Button size="sm" variant="ghost" icon="home" href="index.html">Home</Button>} footer={<Button size="sm" variant="ghost" icon="arrow-left" href="index.html">Back to Asset Manager</Button>}><NavList label="Settings sections" value={section} onSelect={go} groups={NAV} /></NavPane>}>
      <Content section={section} />
    </AssetPage>
  );
}
