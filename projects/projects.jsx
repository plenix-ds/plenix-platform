/* Plenix · projects (projects/projects.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 201: the projects in the shell's NavPane, a project's capabilities in a SecondaryPane, its home as a record page
   header with a ProgressBar and Metrics over Panels, its tasks, notes and files as Checkboxes, Cards and a DataTable, the
   capabilities to come as EmptyStates, and the new-project dialog from Fields, Fieldsets and Checkboxes.
   Screens (Platforms Standard 4.3): a project and its capability (#/project/<id>/<capability>, e.g. #/project/3/tasks), a
   history entry each, on the projects page and on the dashboard. The new-project dialog asks before closing with
   unsaved entries (useUnsavedGuard). */
import { Avatar, Badge, Button, Card, Checkbox, Columns, ContentGrid, Dialog, EmptyState, EntityHeader, Field, Fieldset, Inline, Input, Metric, NavList, NavPane, PageContent, Panel, ProgressBar, RowButton, SearchField, SecondaryPane, SegmentedControl, Select, SideNavPortal, Stack, DataTable, Tag, TagList, Text, ToolRail, useUnsavedGuard, useViewState } from 'plenix-platform';
import { ALL_FILES, ALL_NOTES, ALL_TASKS, CONTACTS, PROJECTS } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Projects ──────────────────────────────────────────────────── */
/* Project icons: data in plain script (window.PROJ_ICONS), drawn in the text color around them */
export const ProjIco = ({ n, size = 15 }) => {
  const html = window.PROJ_ICONS && window.PROJ_ICONS[n] ? window.PROJ_ICONS[n] : (window.PROJ_ICONS && window.PROJ_ICONS.notes) || '';
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true" className="plx-u-block plx-u-shrink-0" dangerouslySetInnerHTML={{ __html: html }} />;
};

/* ── Status badge ── */
const STATUS = { active: ['success', 'Active'], paused: ['warning', 'Paused'], completed: ['info', 'Completed'], archived: ['neutral', 'Archived'] };
const statusOf = (s) => { const v = STATUS[s] || STATUS.active; return { tone: v[0], label: v[1] }; };
export const ProjStatus = ({ s }) => { const v = STATUS[s] || STATUS.active; return <Badge tone={v[0]}>{v[1]}</Badge>; };

/* ── The projects list: the shell's side navigation ── */
export function ProjectsSidebar({ projects, selected, onSelect, onSettings }) {
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [sort, setSort] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('__none__');
  const [newBilling, setNewBilling] = useState('Time & materials');
  const [newCaps, setNewCaps] = useState(() => new Set(window.DEFAULT_CAPS));
  const labels = { personal: 'Personal', client: 'Client Work', research: 'Research', travel: 'Travel', finance: 'Finance', archive: 'Archive' };
  const allCats = [...new Set(projects.map((p) => p.tags[0]))];
  const toggleCap = (id) => setNewCaps((prev) => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });

  let visible = projects;
  if (search.trim()) visible = visible.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (filterCat !== 'all') visible = visible.filter((p) => p.tags[0] === filterCat);
  if (sort === 'name') visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === 'status') visible = [...visible].sort((a, b) => a.status.localeCompare(b.status));
  const grouped = filterCat === 'all' && !search.trim();
  const groups = {};
  if (grouped) visible.forEach((p) => { const t = p.tags[0]; if (!groups[t]) groups[t] = []; groups[t].push(p); });
  const pick = (id) => { const p = projects.find((x) => x.id === id); if (p) onSelect(p); };
  const navItem = (p) => ({ id: p.id, label: p.name, icon: 'briefcase' });

  return (
    <SideNavPortal><NavPane as="div" label="Projects" title="Projects"
      footer={onSettings ? <Button size="sm" variant="ghost" icon="gear" onClick={onSettings}>Projects settings</Button> : null}
      rail={projects.map((p) => <ToolRail.Item key={p.id} label={p.name} pressed={!!(selected && selected.id === p.id)} icon="briefcase" onClick={() => onSelect(p)} />)}
      actions={<>
        <Button size="xs" iconOnly icon="filter" label="Filter & sort" pressed={showFilters} onClick={() => setShowFilters((f) => !f)} />
        <Button size="xs" iconOnly icon="plus" label="New project" onClick={() => { setNewName(''); setNewClient('__none__'); setNewBilling('Time & materials'); setNewCaps(new Set(window.DEFAULT_CAPS)); setShowNew(true); }} />
      </>}>
      <SearchField value={search} onChange={(e) => setSearch(e.target.value)} onClear={() => setSearch('')} placeholder="Search projects..." label="Search projects" />
      {showFilters ? (
        <Stack gap="sm">
          <Field label="Filter" layout="inline" labelWidth="sm">
            <Select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}>
              <option value="all">All categories</option>
              {allCats.map((c) => <option key={c} value={c}>{labels[c] || c}</option>)}
            </Select>
          </Field>
          <Field label="Sort" layout="inline" labelWidth="sm">
            <Select value={sort} onChange={(e) => setSort(e.target.value)}><option value="name">Name A–Z</option><option value="status">Status</option></Select>
          </Field>
        </Stack>
      ) : null}
      {grouped
        ? <NavList label="Projects" value={selected ? selected.id : undefined} onSelect={pick} groups={Object.entries(groups).map(([tag, projs]) => ({ heading: labels[tag] || tag, items: projs.map(navItem) }))} />
        : visible.length > 0 ? <NavList label="Projects" value={selected ? selected.id : undefined} onSelect={pick} items={visible.map(navItem)} /> : <EmptyState title="No projects match." />}
      {showNew ? <NewProjectModal onClose={() => setShowNew(false)} newName={newName} setNewName={setNewName} newClient={newClient} setNewClient={setNewClient}
        newBilling={newBilling} setNewBilling={setNewBilling} newCaps={newCaps} toggleCap={toggleCap}
        dirty={newName.trim() !== '' || newClient !== '__none__' || newBilling !== 'Time & materials' || [...newCaps].sort().join() !== [...window.DEFAULT_CAPS].sort().join()} /> : null}
    </NavPane></SideNavPortal>
  );
}

/* ── A project's capabilities: a SecondaryPane beside its content; it folds to a rail of its capabilities and resizes ── */
export function ProjectNav({ proj, active, onNav, caps }) {
  const [view, updateView] = useViewState('projects');
  const pCaps = caps || window.DEFAULT_CAPS;
  const navGroups = [{ heading: null, items: [{ id: 'home', label: 'Project home', icon: <ProjIco n="home" size={14} /> }] }]
    .concat(window.CAPABILITY_GROUPS.map((grp) => ({ heading: grp.group, items: grp.items.filter((it) => pCaps.has(it.id)).map((it) => ({ id: it.id, label: it.label, icon: <ProjIco n={it.icon} size={13} /> })) })).filter((g) => g.items.length));
  return (
    <SecondaryPane title={proj.name} width="md" collapsible resizable size={view.paneWidth} onSizeChange={(w) => updateView({ paneWidth: w })}
      actions={<Button size="xs" variant="ghost" iconOnly icon="gear" label="Project settings" onClick={() => onNav('settings')} />}
      rail={navGroups.reduce((all, g) => all.concat(g.items), []).map((it) => <ToolRail.Item key={it.id} label={it.label} icon={it.icon} pressed={active === it.id} onClick={() => onNav(it.id)} />)}>
      <NavList label={proj.name} value={active} onSelect={onNav} groups={navGroups} />
    </SecondaryPane>
  );
}

export function ProjectContent({ proj, panel }) {
  const pTasks = ALL_TASKS.filter((t) => t.proj.includes(proj.name.split(' ')[0]));
  const pNotes = ALL_NOTES.filter((n) => n.folder === proj.name.split(' ')[0]);
  const pFiles = ALL_FILES.filter((f) => f.folder === proj.name.split('—')[0].trim().replace('Tax & Finances 2026', 'Tax 2026'));
  const [done, setDone] = useState(() => Object.fromEntries(pTasks.map((t) => [t.id, t.done])));
  const doneT = pTasks.filter((t) => done[t.id]).length;
  const pct = pTasks.length ? Math.round(doneT / pTasks.length * 100) : 0;
  const toggle = (t) => setDone((d) => ({ ...d, [t.id]: !d[t.id] }));
  const due = (t) => <Text variant={t.due === 'Overdue' ? 'danger' : 'data'}>{t.due}</Text>;
  const taskRow = (t) => (
    <Inline key={t.id} gap="sm" justify="between">
      <Checkbox label={done[t.id] ? <s>{t.title}</s> : t.title} checked={!!done[t.id]} onChange={() => toggle(t)} />
      {due(t)}
    </Inline>
  );

  /* ── PROJECT HOME ── */
  if (panel === 'home') {
    const open = pTasks.filter((t) => !done[t.id]);
    const overdue = open.filter((t) => t.due === 'Overdue');
    return (
      <PageContent>
        <Stack gap="lg">
          <EntityHeader title={proj.name} media={{ icon: 'briefcase', hue: proj.color }} context={proj.tags[0]} status={statusOf(proj.status)} description={proj.desc}
            actions={[{ icon: 'flag', label: 'Update status', primary: true }, { icon: 'share', label: 'Share' }]} />
          <Inline gap="lg" wrap align="end">
            <Stack grow><ProgressBar value={pct} color={proj.color} label="Progress" showValue /></Stack>
            <Metric.Group label="Project figures">
              <Metric value={doneT + '/' + pTasks.length} label="Tasks" />
              <Metric value={proj.files} label="Files" />
              <Metric value={pNotes.length} label="Notes" />
            </Metric.Group>
          </Inline>
          <Columns count={2}>
            <Stack gap="md">
              <Panel icon="clock" title="Upcoming tasks">{open.length ? <Stack gap="sm">{open.slice(0, 4).map(taskRow)}</Stack> : <Text variant="secondary">All tasks complete.</Text>}</Panel>
              <Panel icon="doc-text" title="Recent notes" flush>{pNotes.length ? <Stack gap="none">{pNotes.slice(0, 3).map((n) => (
                <RowButton key={n.id}><Stack inset="sm" gap="xs"><Text variant="strong">{n.title}</Text><Text variant="data">{n.date}</Text></Stack></RowButton>
              ))}</Stack> : <Stack inset="md"><Text variant="secondary">No notes yet.</Text></Stack>}</Panel>
            </Stack>
            <Stack gap="md">
              <Panel icon="alert" title="Overdue">{overdue.length ? <Stack gap="sm">{overdue.slice(0, 4).map(taskRow)}</Stack> : <Text variant="secondary">No overdue tasks.</Text>}</Panel>
              <Panel icon="folder" title="Files">{pFiles.length ? <Stack gap="sm">{pFiles.slice(0, 4).map((f, i) => (
                <Inline key={i} gap="sm" justify="between"><Inline gap="sm"><Tag>{f.t}</Tag><Text truncate>{f.name}</Text></Inline><Text variant="data">{f.d}</Text></Inline>
              ))}</Stack> : <Text variant="secondary">No files attached.</Text>}</Panel>
            </Stack>
          </Columns>
        </Stack>
      </PageContent>
    );
  }

  /* ── TASKS ── */
  if (panel === 'tasks') return (
    <PageContent>
      <Stack gap="md">
        <EntityHeader title="Tasks" media={{ icon: 'circle-check', hue: proj.color }} context={proj.name} facts={[pTasks.length + ' tasks', doneT + ' done']} actions={[{ icon: 'share', label: 'Share' }]} />
        <ProgressBar value={pct} color={proj.color} label={doneT + '/' + pTasks.length + ' tasks'} showValue />
        <Panel icon="circle-check" title="All tasks">{pTasks.length ? <Stack gap="sm">{pTasks.map(taskRow)}</Stack> : <Text variant="secondary">No tasks for this project yet.</Text>}</Panel>
      </Stack>
    </PageContent>
  );

  /* ── NOTES ── */
  if (panel === 'notes') return (
    <PageContent>
      <Stack gap="md">
        <EntityHeader title="Notes" media={{ icon: 'doc-text', hue: proj.color }} context={proj.name} facts={[pNotes.length + ' notes']} actions={[{ icon: 'share', label: 'Share' }]} />
        {pNotes.length ? (
          <ContentGrid size="lg" label="Notes">{pNotes.map((n, i) => (
            <Card key={i} title={n.title} meta={n.date} accent={proj.color} onOpen={() => {}}>
              <Text variant="secondary">{n.preview}</Text>
              <TagList label="Tags">{n.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList>
            </Card>
          ))}</ContentGrid>
        ) : <EmptyState title="No notes yet." />}
      </Stack>
    </PageContent>
  );

  /* ── FILES ── */
  if (panel === 'files') return (
    <PageContent>
      <Stack gap="md">
        <EntityHeader title="Files" media={{ icon: 'folder', hue: proj.color }} context={proj.name} facts={[pFiles.length + ' files']} actions={[{ icon: 'share', label: 'Share' }]} />
        <DataTable label="Files" data={pFiles.map((f, i) => ({ ...f, id: i }))} empty="No files attached. Connect OneDrive in Settings to link files." columns={[
          { title: 'Name', field: 'name', kind: 'name', filter: true, width: '--plx-ref-size-320px' },
          { title: 'Type', field: 't', kind: 'data', filter: 'list' },
          { title: 'Size', field: 's', kind: 'data', hozAlign: 'right', headerHozAlign: 'right' },
          { title: 'Modified', field: 'd', kind: 'data' },
        ]} />
      </Stack>
    </PageContent>
  );

  /* ── CAPABILITIES TO COME ── */
  const placeholders = {
    roadmap: ['Roadmap', 'Gantt-style timeline planning with drag-and-drop tasks and milestones. Coming soon.', 'roadmap'],
    contacts: ['Contacts', 'People linked to this project with roles — Owner, Client, Consultant, Reviewer. Coming soon.', 'contacts'],
    bookmarks: ['Bookmarks', 'Save, organize, and retrieve links with folder hierarchy, smart rules, and sharing. Coming soon.', 'link'],
    images: ['Images', 'Image gallery — upload, paste URL, or search Unsplash. Source for mood boards. Coming soon.', 'images'],
    mood_boards: ['Mood boards', 'Named visual collections in Grid or Masonry layout. Shareable read-only link. Coming soon.', 'mood'],
    time_tracking: ['Time tracking', 'Log hours, mark billable time, and view weekly/monthly breakdowns. Coming soon.', 'time'],
    activity: ['Activity feed', 'Every event logged — task changes, files, comments, status updates. Coming soon.', 'activity'],
    bookkeeping: ['Financials', 'Budget tracking, milestone payments, invoices, and payment history. Coming soon.', 'finance'],
    risks: ['Risks', 'RIAC log — Risks, Issues, Assumptions, Constraints with owner and priority. Coming soon.', 'risks'],
    changes: ['Changes', 'Formal change request workflow with timeline and cost impact. Coming soon.', 'changes'],
  };
  if (placeholders[panel]) {
    const [title, desc, icon] = placeholders[panel];
    return <PageContent><EmptyState size="page" icon={<ProjIco n={icon} size={40} />} title={title}>{desc}</EmptyState></PageContent>;
  }
  return null;
}

export function NewProjectModal({ onClose, newName, setNewName, newClient, setNewClient, newBilling, setNewBilling, newCaps, toggleCap, dirty }) {
  // Cancel, Close and Escape ask while something has been entered (Create project keeps it)
  const guard = useUnsavedGuard(dirty, 'The new project has not been created.');
  const cancel = guard(onClose);
  return (
    <Dialog open onClose={cancel} title="New project"
      footer={<><Button onClick={cancel}>Cancel</Button><Button variant="primary" disabled={!newName.trim()} onClick={onClose}>Create project</Button></>}>
      <Stack gap="md">
        <Field label="Project title">
          <Input autoFocus autoComplete="off" autoCapitalize="words" enterKeyHint="done" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Website Redesign" onKeyDown={(e) => { if (e.key === 'Escape') { e.stopPropagation(); cancel(); } }} />
        </Field>
        <Field label="Client" description="optional">
          <Select value={newClient || '__none__'} onChange={(e) => setNewClient(e.target.value)}>
            <option value="__none__">No client — personal project</option>
            <option value="__new__">+ New client</option>
            {CONTACTS.slice(0, 6).map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
          </Select>
        </Field>
        {newClient === '__new__' ? (
          <Stack gap="sm">
            <Field label="Company name"><Input autoComplete="organization" autoCapitalize="words" enterKeyHint="next" /></Field>
            <Columns count={2} gap="md"><Field label="Contact name"><Input autoComplete="name" autoCapitalize="words" enterKeyHint="next" /></Field><Field label="Email"><Input type="email" autoComplete="email" enterKeyHint="done" /></Field></Columns>
          </Stack>
        ) : null}
        {newClient && newClient !== '__none__' && newClient !== '__new__' ? (
          <Field label="Billing type">
            <SegmentedControl label="Billing type" value={newBilling} onChange={setNewBilling} options={['Time & materials', 'Fixed fee', 'Retainer', 'Non-Billable'].map((bt) => ({ value: bt, label: bt }))} />
          </Field>
        ) : null}
        <Fieldset legend="Project team" gap="sm">
          <Inline gap="sm"><Avatar name="Philip Maher" size="sm" /><Text className="plx-u-flex-1">Philip Maher</Text><Tag>Owner</Tag></Inline>
          <Inline><Button variant="ghost" icon="plus">Add team member or external person…</Button></Inline>
        </Fieldset>
        <Stack gap="sm">
          <Text variant="label">Capabilities</Text>
          <Text variant="secondary">Choose which features to include. These appear as sections in the project sidebar.</Text>
          {window.CAPABILITY_GROUPS.map((grp) => (
            <Fieldset key={grp.id} legend={grp.group} gap="xs">
              <Columns count={2} gap="md">
                <Stack gap="xs">{grp.items.filter((x, i) => i % 2 === 0).map((item) => <Checkbox key={item.id} checked={newCaps.has(item.id)} onChange={() => toggleCap(item.id)} label={item.label} />)}</Stack>
                <Stack gap="xs">{grp.items.filter((x, i) => i % 2 === 1).map((item) => <Checkbox key={item.id} checked={newCaps.has(item.id)} onChange={() => toggleCap(item.id)} label={item.label} />)}</Stack>
              </Columns>
            </Fieldset>
          ))}
        </Stack>
      </Stack>
    </Dialog>
  );
}

// the project screen: #/project/<id>/<capability> → { proj, panel }
export const projectScreen = (screen) => {
  const proj = screen.parts[0] === 'project' ? PROJECTS.find((p) => p.id === +screen.parts[1]) || null : null;
  return { proj, panel: (proj && screen.parts[2]) || 'home' };
};

export function ProjectsScreen({ onSettings, screen }) {
  const { proj: selected, panel } = projectScreen(screen);
  const setPanel = (p) => screen.open(['project', selected.id, p]);
  const [projCaps] = useState({});
  const handleSelect = (p) => screen.open(['project', p.id, 'home']);
  const getCaps = (p) => (p && projCaps[p.id] ? projCaps[p.id] : window.DEFAULT_CAPS);
  return (
    <div className="plx-page-panes">
      <ProjectsSidebar projects={PROJECTS} selected={selected} onSelect={handleSelect} onSettings={onSettings} />
      {selected ? (
        <>
          <ProjectNav proj={selected} active={panel} onNav={setPanel} caps={getCaps(selected)} />
          <ProjectContent key={selected.id} proj={selected} panel={panel} />
        </>
      ) : <PageContent><EmptyState size="page" icon="briefcase" title="Select a project to get started" /></PageContent>}
    </div>
  );
}

/* ── A project opened from the dashboard ── */
export function ProjectDetail({ proj, screen }) {
  const panel = (screen && screen.parts[2]) || 'home';
  const setPanel = (p) => screen.open(['project', proj.id, p]);
  return (
    <div className="plx-page-panes">
      <ProjectNav proj={proj} active={panel} onNav={setPanel} />
      <ProjectContent proj={proj} panel={panel} />
    </div>
  );
}
