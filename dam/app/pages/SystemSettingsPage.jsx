/* Plenix asset app · System Settings (app/pages/SystemSettingsPage.jsx): catalog-wide configuration in 14 sections.
   Replaces the HTML of settings-system.html (batch 110). The address hash (#properties, #users, …) opens a section and
   follows the navigation; every section stays mounted, so unsaved edits survive switching. Actions that have no back end
   yet confirm with a toast, as the HTML page did. */
import React from 'react';
import { SettingsLayout, SettingsSection, NavList, RecordPage, Field, Input, Textarea, Select, Combobox, Switch, Checkbox, Button, ButtonGroup, Tabs, DataGrid, Badge, Card, Icon, Menu, MenuItem, PropertyList, SearchField, Dialog, Toolbar, useToast, NavPane, Stack, Inline, Text, CodeBlock } from 'plenix-platform';
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

/* ── small parts shared by the sections ── */
const CountNote = ({ children }) => <Text as="p" variant="secondary" className="plx-u-mt-stack-sm">{children}</Text>;
const Lead = ({ children }) => <Text as="p" variant="secondary" className="plx-u-mb-stack-md">{children}</Text>;
// a group title: the first in its panel sits at the top; the others keep space above them
const Sub = ({ first, flush, children }) => <Text as="h3" variant="heading" className={flush ? undefined : first ? 'plx-u-mb-stack-sm' : 'plx-u-mt-stack-lg plx-u-mb-stack-sm'}>{children}</Text>;

function useAct() {
  const toast = useToast();
  return (label, tone = 'success') => () => toast.show(label, { tone });
}
const B = ({ icon, label, tone, act, variant, ...rest }) => <Button size="sm" icon={icon} variant={variant} onClick={act(label, tone)} {...rest}>{label}</Button>;
const Bar = ({ children, label }) => <Toolbar label={label} className="plx-u-gap-cluster-sm plx-u-mb-stack-md">{children}</Toolbar>;
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
const Actions = ({ act, save = 'Save', del = 'Delete' }) => (
  <><Button type="submit" variant="primary">{save}</Button>{del ? <Button variant="danger-secondary" onClick={act(del, 'warning')}>{del}</Button> : null}</>
);
const Form = ({ act, saved, children }) => <form noValidate onSubmit={(e) => { e.preventDefault(); act(saved, 'success')(); }}>{children}</form>;

/* ── Content ── */
function Properties({ act }) {
  const [p, setP] = React.useState(D.PROPERTIES);
  const [views, setViews] = React.useState(D.RESULT_VIEWS.map((v) => ({ value: v, label: v })));
  const text = (k, extra) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }), name: k, ...extra });
  const sw = (k, label) => <Field label={label} layout="row"><Switch label={label} labelHidden checked={p[k]} onChange={(e) => setP({ ...p, [k]: e.target.checked })} /></Field>;
  const enabled = useToggles(D.ENABLED_FOR), viewAll = useToggles(D.VIEW_ALL), editAll = useToggles(D.EDIT_ALL);
  const roleCol = { title: 'Group / Role', field: 'name', kind: 'name', frozen: true, filter: true };
  return (
    <Form act={act} saved="Save">
      <RecordPage.Header title="Files properties" description="Module-level configuration for the asset table." headingLevel={2} />
      <Tabs variant="contained" label="Files properties" items={[
        { value: 'props', label: 'Properties', content: (
          <div className="plx-settings__rows">
            <Field label="Default record label" layout="inline"><Input {...text('defaultRecordLabel')} /></Field>
            <Field label="Tab ordering" layout="inline"><Input {...text('tabOrdering')} /></Field>
            {sw('enableUploading', 'Enable uploading')}
            {sw('enableOnSearch', 'Enable on search')}
            <Field label="Default results view" layout="inline">
              <Combobox options={views} value={p.defaultResultsView} onChange={(v) => setP({ ...p, defaultResultsView: v })} creatable
                onCreate={(t) => { const v = t.trim(); if (v) { setViews(views.concat({ value: v, label: v })); setP({ ...p, defaultResultsView: v }); } }} />
            </Field>
            <Field label="Default sort field" layout="inline"><Input {...text('defaultSortField', { placeholder: 'Default sort field' })} /></Field>
            <Field label="Upload sourcepath" layout="inline"><Input {...text('uploadSourcepath')} /></Field>
            {sw('autoCreateEntities', 'Auto create entities')}
            <Field label="Root folder path" layout="inline"><Input {...text('rootFolderPath', { placeholder: 'Root folder path' })} /></Field>
            <Field label="Auto create at folder level" layout="inline" info="Scan deep A/B/C, B = 2"><Input {...text('autoCreateAtFolderLevel')} /></Field>
            {sw('semanticEnabled', 'Semantic enabled')}
            <Field label="AI search prompt" layout="inline"><Textarea {...text('aiSearchPrompt', { placeholder: 'AI search prompt' })} /></Field>
            <Field label="AI search contains" layout="inline"><Textarea {...text('aiSearchContains', { placeholder: 'AI search contains' })} /></Field>
          </div>) },
        { value: 'enabled', label: 'Enabled for', content: <DataGrid label="Enabled for" data={enabled} columns={[roleCol, switchCol('Enabled')]} /> },
        { value: 'actions', label: 'Actions', content: <DataGrid label="Actions" data={rowsOf(D.ACTIONS, ['name', 'roles'])}
          columns={[{ title: 'Action', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Roles', field: 'roles', filter: true }, { title: 'Status', field: 'status', kind: 'center', headerSort: false, render: () => <Badge tone="success">Active</Badge> }]} /> },
        { value: 'view-all', label: 'View all folders', content: <><Lead>Groups and roles that can view all folders for this module.</Lead><DataGrid label="View all folders" data={viewAll} columns={[roleCol, switchCol('View all')]} /></> },
        { value: 'edit-all', label: 'Edit all folders', content: <><Lead>Groups and roles that can edit all folders for this module.</Lead><DataGrid label="Edit all folders" data={editAll} columns={[roleCol, switchCol('Edit all')]} /></> },
      ]} />
      <div className="plx-settings__actions"><Actions act={act} /></div>
    </Form>
  );
}

function Fields({ act }) {
  const [q, setQ] = React.useState('');
  const rows = rowsOf(D.FIELDS.filter((r) => match(q, r)), ['name', 'id2', 'type']);
  return (
    <div>
      <RecordPage.Header title="Fields" description="The metadata field registry for assets — every field's name, internal ID, and type." headingLevel={2} />
      <Tabs variant="contained" label="Fields" items={[
        { value: 'fields', label: 'Fields', content: (
          <>
            <Bar label="Field actions">
              <Input name="newFieldName" width="lg" placeholder="New field name..." aria-label="New field name" />
              <B icon="add" label="Add field" act={act} />
              <Search value={q} onChange={setQ} label={'Search ' + D.FIELD_TOTAL + ' fields'} />
            </Bar>
            <DataGrid label="Fields" data={rows} empty="No fields match" columns={[{ title: 'Field name', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'ID', field: 'id2', kind: 'data' }, { title: 'Field type', field: 'type', filter: 'list' }]} />
            <CountNote>{'Showing ' + rows.length + ' of ' + D.FIELD_TOTAL + ' fields'}</CountNote>
          </>) },
        { value: 'edit-views', label: 'Edit views', content: <Lead>Configure which fields appear on the asset edit form, and in what order.</Lead> },
        { value: 'app-views', label: 'Application views', content: <Lead>Configure which fields appear in application-wide views such as search results and tables.</Lead> },
      ]} />
    </div>
  );
}

function AssetTypes({ act }) {
  const [types, setTypes] = React.useState(D.ASSET_TYPES.map(([name, ext, order]) => ({ name, ext, paths: '', order: String(order) })));
  const edit = (i, k) => (e) => setTypes(types.map((t, j) => (j === i ? { ...t, [k]: e.target.value } : t)));
  return (
    <Form act={act} saved="Save changes">
      <RecordPage.Header title="Asset types" description="The file-format categories assets are classified under, used to route transcoding and preview generation." headingLevel={2} />
      <Bar label="Asset type actions"><B icon="add" label="Add asset type" act={act} /></Bar>
      <Tabs variant="contained" label="Asset types" items={types.map((t, i) => ({ value: String(i), label: D.ASSET_TYPES[i][0], content: (
        <div className="plx-settings__rows">
          <Sub first>Properties</Sub>
          <Field label="Name" layout="inline"><Input name="name" value={t.name} onChange={edit(i, 'name')} /></Field>
          <Field label="Extensions" layout="inline"><Textarea name="extensions" value={t.ext} onChange={edit(i, 'ext')} /></Field>
          <Field label="Paths" layout="inline"><Input name="paths" placeholder="Paths" value={t.paths} onChange={edit(i, 'paths')} /></Field>
          <Field label="Ordering" layout="inline"><Input name="ordering" width="sm" value={t.order} onChange={edit(i, 'order')} /></Field>
        </div>) }))} />
      <div className="plx-settings__actions"><Actions act={act} save="Save changes" /></div>
    </Form>
  );
}

function HotFolders({ act }) {
  return (
    <div>
      <RecordPage.Header title="Hot folders" description="Watched folders that are automatically scanned and imported as assets." headingLevel={2} />
      <SettingsSection card>
        <Bar label="Hot folder actions"><B icon="add" label="Add hot folder" act={act} /><B icon="schedule" label="Schedule importing" act={act} /></Bar>
        {D.HOT_FOLDERS.map((f) => (
          <Inline key={f.name} gap="md">
            <Icon name="folder" size="lg" />
            <Stack gap="none" grow>
              <Inline><Text variant="strong">{f.name}</Text>{f.enabled ? <Badge tone="success">Enabled</Badge> : null}</Inline>
              <Text variant="secondary">{f.meta}</Text>
            </Stack>
            <Button size="sm" iconOnly icon="pencil" label={'Edit ' + f.name} onClick={act('Edit', 'info')} />
          </Inline>
        ))}
      </SettingsSection>
    </div>
  );
}

function Transcoding({ act }) {
  return (
    <div>
      <RecordPage.Header title="Transcoding" description="Conversion presets generated for each uploaded asset, by media type." headingLevel={2} />
      <Tabs variant="contained" label="Transcoding" items={[
        { value: 'presets', label: 'Preset configuration', content: (
          <>
            <Bar label="Conversion actions"><B icon="add" label="Add new conversion" act={act} /></Bar>
            <DataGrid label="Conversion presets" data={rowsOf(D.CONVERSIONS, ['name', 'file', 'system', 'onImport', 'media'])} columns={[
              { title: 'Conversion', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Generated file', field: 'file', kind: 'data' }, { title: 'System defined', field: 'system', filter: 'list' },
              { title: 'On import', field: 'onImport', filter: 'list' }, { title: 'Media type', field: 'media', filter: 'list' }]} />
          </>) },
        { value: 'publishing', label: 'Publishing', content: <Lead>Configure which conversions are pushed to publishing targets.</Lead> },
      ]} />
    </div>
  );
}

/* ── People & Access ── */
function Users({ act }) {
  const [q, setQ] = React.useState('');
  return (
    <div>
      <RecordPage.Header title="Users" description="Manage user accounts and view login activity." headingLevel={2} />
      <SettingsSection card>
        <Bar label="User actions">
          <B icon="add" label="Create user" act={act} />
          <ButtonGroup label="Maintenance"><B icon="import" label="Import / Export" act={act} /><B icon="refresh" label="Reindex" tone="info" act={act} /></ButtonGroup>
          <Search value={q} onChange={setQ} label="Search users" />
        </Bar>
        <DataGrid label="Users" empty="No users match" data={rowsOf(D.USERS.filter((r) => match(q, r)), ['user', 'name', 'email', 'role', 'created', 'login'])} columns={[
          { title: 'Username', field: 'user', kind: 'name', frozen: true, filter: true }, { title: 'Name', field: 'name', filter: true }, { title: 'Email', field: 'email', filter: true },
          { title: 'Role', field: 'role', kind: 'center', filter: 'list', render: (r) => (r.role ? <Badge tone="info">{r.role}</Badge> : '—') },
          { title: 'Created', field: 'created', kind: 'data' }, { title: 'Last login', field: 'login', kind: 'data' }]} />
      </SettingsSection>
    </div>
  );
}

function Groups({ act }) {
  const [names, setNames] = React.useState(D.GROUPS);
  return (
    <Form act={act} saved="Save changes">
      <RecordPage.Header title="Groups" description="Groups a user can be assigned to. Permissions are configured separately under Site Permissions." headingLevel={2} />
      <Bar label="Group actions"><B icon="add" label="Add group" act={act} /></Bar>
      <Tabs variant="contained" label="Groups" items={D.GROUPS.map((g, i) => ({ value: String(i), label: g, content: (
        <div className="plx-settings__rows">
          <Sub first>Properties</Sub>
          <Field label="Name" layout="inline"><Input name="name" value={names[i]} onChange={(e) => setNames(names.map((n, j) => (j === i ? e.target.value : n)))} /></Field>
        </div>) }))} />
      <div className="plx-settings__actions"><Actions act={act} save="Save changes" del="Delete group" /></div>
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
      <RecordPage.Header title="Site permissions" description="Individually named permissions, grouped by area, assigned per role." headingLevel={2} />
      <SettingsSection card headingLevel={3} title="Select a Role" description="Choose the role you want to configure. The permissions below apply only to that role — use View to narrow the list to a single area, or leave it on Show All to see everything at once.">
        <Field label="Role" layout="inline"><Select name="role" value={role} onChange={(e) => setRole(e.target.value)}>{D.PERMISSION_ROLES.concat('+ Add New Role').map((r) => <option key={r}>{r}</option>)}</Select></Field>
        <Field label="View" layout="inline"><Select name="view" value={area} onChange={(e) => setArea(e.target.value)}>{['Show all'].concat(D.PERMISSION_AREAS.map((a) => a.label)).map((r) => <option key={r}>{r}</option>)}</Select></Field>
      </SettingsSection>
      <Tabs key={area} variant="contained" label={'Permissions for ' + role} items={areas.map((a) => ({ value: a.id, label: a.label, content: (
        <>
          <Stack>
            {a.items.map((it) => {
              const k = a.id + ':' + it[0];
              return <Checkbox key={k} name={k} label={it[0]} description={it[1]} checked={!!checked[k]} onChange={(e) => setChecked({ ...checked, [k]: e.target.checked })} />;
            })}
          </Stack>
          <CountNote>{'Showing ' + a.items.length + ' of ' + a.total + ' permissions in this view'}</CountNote>
        </>) }))} />
      <div className="plx-settings__actions"><Actions act={act} /></div>
    </Form>
  );
}

/* ── System ── */
function EmailTemplates({ act }) {
  return (
    <div>
      <RecordPage.Header title="Email templates" description="The notification emails the catalog sends, and the template file behind each one." headingLevel={2} />
      <SettingsSection card>
        <DataGrid label="Email templates" data={rowsOf(D.EMAIL_TEMPLATES, ['name', 'file'])} columns={[
          { title: 'Template', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'File', field: 'file', kind: 'data' },
          { title: 'Actions', field: 'actions', kind: 'center', headerSort: false, render: (r) => <Button size="xs" variant="link" aria-label={'Edit ' + r.name} onClick={act('Edit ' + r.file, 'info')}>Edit</Button> }]} />
      </SettingsSection>
    </div>
  );
}

function CatalogParameters({ act }) {
  const [q, setQ] = React.useState('');
  const rows = D.CATALOG_PARAMETERS.filter((r) => match(q, r));
  return (
    <Form act={act} saved="Save changes">
      <RecordPage.Header title="Catalog parameters" description="Catalog-wide configuration keys — storage, AI providers, and access defaults." headingLevel={2} />
      <SettingsSection card actions={null}>
        <Inline wrap className="plx-u-gap-cluster-sm plx-u-mb-stack-md"><Search value={q} onChange={setQ} label="Search catalog settings" /></Inline>
        <PropertyList>
          {rows.map(([label, id, value]) => (
            <PropertyList.Item key={id} label={label} description={<Text variant="data">{id}</Text>} data>{value}</PropertyList.Item>
          ))}
        </PropertyList>
        <CountNote>{'Showing ' + rows.length + ' of ' + D.CATALOG_TOTAL + ' catalog settings'}</CountNote>
      </SettingsSection>
      <div className="plx-settings__actions"><Button type="submit" variant="primary">Save changes</Button></div>
    </Form>
  );
}

function Server({ act }) {
  const kv = (list) => <PropertyList>{list.map(([k, v]) => <PropertyList.Item key={k} label={k} data>{v}</PropertyList.Item>)}</PropertyList>;
  return (
    <div>
      <RecordPage.Header title="Server" description="Database cluster status, software versions, and application logs." headingLevel={2} />
      <Tabs variant="contained" label="Server" items={[
        { value: 'database', label: 'Database', content: (
          <>
            <Sub first>Server status</Sub>
            {kv(D.SERVER_STATUS)}
            <div className="plx-u-mt-stack-md"><ButtonGroup label="Server status actions"><B icon="refresh" label="Clear cached data" tone="info" act={act} /><B icon="database" label="Change Elasticsearch database master" tone="info" act={act} /></ButtonGroup></div>
            <Sub>Data management</Sub>
            <ButtonGroup label="Data management"><B icon="refresh" label="Reindex" tone="info" act={act} /><B icon="alert" label="View mapping conflicts" tone="info" act={act} /><B icon="list-bullets" label="View basic mappings" tone="info" act={act} /><B icon="import" label="Reload sets" tone="info" act={act} /></ButtonGroup>
            <Sub>Database snapshots</Sub>
            <Lead>Snapshots are used by Elasticsearch to store and restore database data.</Lead>
            <div><B icon="snapshot" label="View snapshots" tone="info" act={act} /></div>
            <Sub>Data entities</Sub>
            <ButtonGroup label="Data entities"><B icon="add" label="Create" act={act} /><B icon="save-doc" label="Save all modules" act={act} /></ButtonGroup>
          </>) },
        { value: 'versions', label: 'Versions', content: (
          <>{kv(D.VERSIONS)}<CountNote>Full dependency list runs to 100+ jars · <Button size="xs" variant="link" onClick={act('View all', 'info')}>View all</Button></CountNote></>) },
        { value: 'logs', label: 'Logs', content: (
          <CodeBlock>{D.LOG_PATH}</CodeBlock>) },
      ]} />
    </div>
  );
}

function Database({ act }) {
  const [table, setTable] = React.useState('asset');
  const [q, setQ] = React.useState('');
  const [expanded, setExpanded] = React.useState(false);
  const rows = D.DB_ROWS.filter((r) => match(q, r)).map((r, i) => Object.assign({ id: i }, ...D.DB_COLUMNS.map((c, j) => ({ ['c' + j]: r[j] }))));
  const columns = D.DB_COLUMNS.map((c, j) => ({ title: c, field: 'c' + j, frozen: j === 0, filter: true, kind: c === 'Asset title' ? 'name' : c === 'Created on' ? 'data' : undefined }));
  const grid = (label) => <DataGrid label={label} data={rows} columns={columns} empty="No records match" />;
  return (
    <div>
      <RecordPage.Header title="Database" description="Browse, edit, import, or export any underlying data table." headingLevel={2} />
      <SettingsSection card>
        <Inline justify="between" wrap className="plx-u-gap-cluster-sm plx-u-mb-stack-md">
          <Sub flush>{'Table: ' + table}</Sub>
          <Inline>
            <Stack className="plx-u-w-200px"><Combobox label="Table" options={D.DB_TABLES.map((t) => ({ value: t, label: t }))} value={table} onChange={setTable} /></Stack>
            <B icon="add" label="New table" tone="info" act={act} />
          </Inline>
        </Inline>
        <Tabs variant="contained" label={'Table ' + table} items={[
          { value: 'data', label: 'Data', content: (
            <>
              <Bar label="Record actions">
                <B icon="add" label="Add new" act={act} />
                <ButtonGroup label="Transfer"><B icon="refresh" label="Reindex" tone="info" act={act} /><B icon="import" label="Import" act={act} /><B icon="export" label="Export" tone="info" act={act} /></ButtonGroup>
                <B icon="doc-text" label="Export text" tone="info" act={act} />
                <Button size="sm" iconOnly icon="close" label="Reset settings" onClick={act('Settings reset', 'info')} />
                <Menu label="Delete" trigger={<Button size="sm" variant="danger-secondary" icon="trash" caret>Delete</Button>}>
                  <MenuItem icon="trash" danger onSelect={act('Delete ' + D.DB_TOTAL.records + ' Records', 'warning')}>{'Delete ' + D.DB_TOTAL.records + ' Records'}</MenuItem>
                  <MenuItem icon="trash" danger onSelect={act('Delete table', 'warning')}>Delete table</MenuItem>
                </Menu>
                <Search value={q} onChange={setQ} label="Search" />
              </Bar>
              <Inline justify="end" className="plx-u-mb-stack-sm"><Button size="sm" icon="expand" onClick={() => setExpanded(true)}>Expand</Button></Inline>
              {grid('Table: ' + table)}
              <CountNote>{'Found ' + D.DB_TOTAL.records + ' Records · Page 1 of ' + D.DB_TOTAL.pages + ' · '}<Button size="xs" variant="link" onClick={act('Forward', 'info')}>Forward »</Button></CountNote>
              <Dialog open={expanded} onClose={() => setExpanded(false)} title={'Table: ' + table} icon="expand" size="full">{grid('Table: ' + table + ', expanded')}</Dialog>
            </>) },
          { value: 'fields', label: 'Customize fields', content: <Lead>Configure the fields available on this table — the same editor as Files &gt; Fields, scoped to this table.</Lead> },
          { value: 'views', label: 'Customize views', content: <Lead>Configure how records in this table are displayed in lists and edit forms.</Lead> },
          { value: 'elastic', label: 'Elastic system info', content: <Lead>Raw Elasticsearch mapping and index info for this table.</Lead> },
        ]} />
      </SettingsSection>
    </div>
  );
}

function Customizations({ act }) {
  const rows = rowsOf(D.CUSTOMIZATIONS, ['type', 'name', 'modules', 'date']);
  const [sel, setSel] = React.useState(rows.map((r) => r.id));
  return (
    <div>
      <RecordPage.Header title="Customizations" description="Track configuration changes across modules, and export or import them between environments." headingLevel={2} />
      <SettingsSection card>
        <Bar label="Customization actions">
          <B icon="refresh" label="Scan for Changes" tone="info" act={act} />
          <ButtonGroup label="Transfer"><B icon="export" label="Export" tone="info" act={act} /><B icon="import" label="Import" act={act} /></ButtonGroup>
          <B icon="trash" label="Delete" tone="warning" variant="danger-secondary" act={act} />
        </Bar>
        <DataGrid label="Customizations" selectable selected={sel} onSelectionChange={setSel} data={rows} columns={[
          { title: 'Type', field: 'type', filter: 'list' }, { title: 'Customization', field: 'name', kind: 'name', filter: true }, { title: 'Modules', field: 'modules', kind: 'data' }, { title: 'Date', field: 'date', kind: 'data' }]} />
      </SettingsSection>
    </div>
  );
}

function Scheduler({ act }) {
  return (
    <div>
      <RecordPage.Header title="Scheduler" description="Recurring background tasks, the events that trigger them, and the scripts they run." headingLevel={2} />
      <Tabs variant="contained" label="Scheduler" items={[
        { value: 'scheduled', label: 'Scheduled', content: (
          <>
            <Bar label="Scheduled task actions"><B icon="refresh" label="Refresh" tone="info" act={act} /></Bar>
            <DataGrid label="Scheduled tasks" data={rowsOf(D.SCHEDULED, ['name', 'path', 'status'])} columns={[
              { title: 'Name', field: 'name', kind: 'name', frozen: true, filter: true }, { title: 'Path', field: 'path', kind: 'data' }, { title: 'Status', field: 'status', filter: 'list' }]} />
          </>) },
        { value: 'events', label: 'Events', content: <Lead>Events that trigger scripts to run, such as an asset upload or a metadata change.</Lead> },
        { value: 'scripts', label: 'Scripts', content: <Lead>Groovy scripts that scheduled tasks and events run.</Lead> },
      ]} />
    </div>
  );
}

const SECTIONS = {
  properties: Properties, fields: Fields, 'asset-types': AssetTypes, 'hot-folders': HotFolders, transcoding: Transcoding,
  users: Users, groups: Groups, permissions: Permissions,
  'email-templates': EmailTemplates, 'catalog-parameters': CatalogParameters, server: Server, database: Database, customizations: Customizations, scheduler: Scheduler,
};

function useSection() {
  const read = () => { const h = location.hash.slice(1); return IDS.indexOf(h) >= 0 ? h : 'properties'; };
  const [section, setSection] = React.useState(read);
  React.useEffect(() => {
    const on = () => setSection(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = (id) => { if (IDS.indexOf(id) < 0) return; history.replaceState(null, '', '#' + id); setSection(id); };
  return [section, go];
}

function Content({ section }) {
  const act = useAct();
  return (
    <SettingsLayout>
      {IDS.map((id) => { const S = SECTIONS[id]; return <div key={id} hidden={section !== id}><S act={act} /></div>; })}
    </SettingsLayout>
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
