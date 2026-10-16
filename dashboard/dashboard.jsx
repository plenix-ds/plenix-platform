/* Plenix · dashboard (dashboard/dashboard.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 201: every widget is a Panel; the widgets sit in a WidgetGrid (drag a handle or use the arrow keys to reorder);
   rows are ActivityList items, RowButtons, Checkboxes and EventChips; project cards carry the project's color as their accent. */
import { ActivityList, Avatar, Badge, Button, Card, Checkbox, ContentGrid, Divider, EventChip, Icon, Inline, NotificationList, Panel, RowButton, Stack, Tag, TagList, Text, WidgetGrid, useAppLayout, useSession } from 'plenix-platform';
import { ALL_NOTES, ALL_TASKS, CONTACTS, EMAILS, EVENTS, PROJECTS, Priority } from '../suite/shared.jsx';
const { useState, useEffect } = React;

const allLink = (label, onClick) => <Button variant="ghost" size="xs" iconEnd="chevron-right" label={label} onClick={onClick}>All</Button>;

/* ─── Dashboard Widgets ─────────────────────────────────────────── */
export function EmailsWidget({ handle,  onViewAll, prefs }) {
  const [exp, setExp] = useState(null);
  const showAv = prefs?.emailAvatar !== false;
  const max = parseInt(prefs?.emailMax || '5', 10);
  const open = EMAILS.find((e) => e.id === exp);
  return (
    <Panel icon="message" title="Emails" flush actions={<Inline gap="xs"><Badge tone="negative" size="sm">2</Badge>{allLink('View all emails', onViewAll)}{handle}</Inline>}>
      <ActivityList label="Emails">{EMAILS.slice(0, max).map((em) => (
        <ActivityList.Item key={em.id} unread={!!em.unread} selected={exp === em.id} onOpen={() => setExp(exp === em.id ? null : em.id)}
          leading={showAv ? <Avatar name={em.from} size="xs" /> : null} title={em.from} meta={em.subj} time={em.time} />
      ))}</ActivityList>
      {open ? (
        <Stack inset="sm" gap="sm" className="plx-motion-enter">
          <Text variant="secondary" as="p">{open.prev}</Text>
          <Inline gap="sm"><Button variant="primary" size="sm">Reply</Button><Button size="sm">Archive</Button></Inline>
        </Stack>
      ) : null}
    </Panel>
  );
}

export function CalendarWidget({ handle,  onViewAll }) {
  return (
    <Panel icon="calendar" title="Calendar" description={<Text variant="data">Mar 5</Text>} actions={<Inline gap="xs">{allLink('View all calendar', onViewAll)}{handle}</Inline>}>
      <Stack gap="xs">{EVENTS.map((ev) => <EventChip key={ev.id} title={ev.title} time={ev.time} color={ev.color} />)}</Stack>
    </Panel>
  );
}

export function ProjectsWidget({ handle,  onViewAll, onProject, prefs }) {
  const density = prefs?.projDensity || 'card';
  const showFiles = prefs?.projFiles || false;
  const showCategory = prefs?.projCategory !== false;
  const showTags = prefs?.projTags || false;
  const showDesc = prefs?.projDesc || false;
  const active = PROJECTS.filter((p) => p.status === 'active');
  const catLabel = { personal: 'Personal', client: 'Client', research: 'Research', travel: 'Travel', finance: 'Finance' };
  return (
    <Panel icon="briefcase" title="Projects" flush={density !== 'card'} actions={<Inline gap="xs">{allLink('View all projects', onViewAll)}{handle}</Inline>}>
      {density === 'card' ? (
        <ContentGrid size="md" label="Active projects">
          {active.map((p) => (
            <Card key={p.id} title={p.name} meta={showCategory ? (catLabel[p.tags[0]] || p.tags[0]) : null} accent={p.color} onOpen={() => onProject(p)}>
              {showDesc ? <Text variant="secondary">{p.desc.substring(0, 55)}…</Text> : null}
              {showFiles ? <Text variant="data">{p.files} files</Text> : null}
              {showTags ? <TagList label="Tags">{p.tags.slice(0, 2).map((t) => <Tag key={t}>{t}</Tag>)}</TagList> : null}
            </Card>
          ))}
        </ContentGrid>
      ) : (
        <Stack gap="none">{active.map((p) => (
          <RowButton key={p.id} onClick={() => onProject(p)}>
            <Inline gap="sm" inset="sm" justify="between">
              <Text variant="strong" truncate>{p.name}</Text>
              <Inline gap="sm">{showCategory ? <Text variant="caption">{catLabel[p.tags[0]] || p.tags[0]}</Text> : null}{showFiles ? <Text variant="data">{p.files}</Text> : null}</Inline>
            </Inline>
          </RowButton>
        ))}</Stack>
      )}
    </Panel>
  );
}

export function ContactsWidget({ handle,  onViewAll }) {
  return (
    <Panel icon="settings-users" title="Contacts" actions={<Inline gap="xs">{allLink('View all contacts', onViewAll)}{handle}</Inline>}>
      <Stack gap="sm">{CONTACTS.map((c) => (
        <Inline key={c.id} gap="sm">
          <Avatar name={c.name} size="sm" />
          <Text variant="strong" truncate className="plx-u-flex-1">{c.name}</Text>
          <Button variant="ghost" size="xs" iconOnly label={'Message ' + c.name} icon={<Icon name="message" />} />
          <Button variant="ghost" size="xs" iconOnly label={'Call ' + c.name} icon={<Icon name="phone" />} />
        </Inline>
      ))}</Stack>
    </Panel>
  );
}

/* ─── Tasks Widget (dashboard mini) ────────────────────────────── */
export function TasksWidget({ handle,  onViewAll, prefs }) {
  const [done, setDone] = useState(() => Object.fromEntries(ALL_TASKS.map((t) => [t.id, t.done])));
  const showPri = prefs?.taskPri !== false;
  const showDue = prefs?.taskDue !== false;
  const max = parseInt(prefs?.taskMax || '7', 10);
  const pending = ALL_TASKS.filter((t) => !done[t.id]).slice(0, max);
  return (
    <Panel icon="circle-check" title="To do" actions={<Inline gap="xs"><Badge tone="waiting" size="sm">{pending.length}</Badge>{allLink('View all to-dos', onViewAll)}{handle}</Inline>}>
      <Stack gap="sm">{pending.map((t) => (
        <Inline key={t.id} gap="sm" justify="between" align="baseline">
          <Inline gap="xs">{showPri ? <Priority pri={t.pri} /> : null}<Checkbox label={t.title} checked={!!done[t.id]} onChange={() => setDone((d) => ({ ...d, [t.id]: !d[t.id] }))} /></Inline>
          {showDue ? <Text variant="data">{t.due}</Text> : null}
        </Inline>
      ))}</Stack>
    </Panel>
  );
}

export function NotesWidget({ handle,  onViewAll, prefs }) {
  const showDate = prefs?.noteDate !== false;
  const showFolder = prefs?.noteFolder !== false;
  const max = parseInt(prefs?.noteMax || '6', 10);
  return (
    <Panel icon="doc-text" title="Notes" flush actions={<Inline gap="xs">{allLink('View all notes', onViewAll)}{handle}</Inline>}>
      <ActivityList label="Notes">{ALL_NOTES.slice(0, max).map((n) => (
        <ActivityList.Item key={n.id} onOpen={onViewAll} title={n.title} meta={showFolder ? n.folder.split(' ')[0] : null} time={showDate ? n.date : null} />
      ))}</ActivityList>
    </Panel>
  );
}

/* the person's notifications (they are not in the header): the session's, unread first marked; Mark all read */
export function NotificationsWidget({ handle }) {
  const { notifications, setNotifications } = useSession();
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <Panel icon="hdr-bell" title="Notifications" flush actions={<Inline gap="xs">{unread ? <Badge tone="negative" size="sm">{String(unread)}</Badge> : null}
      <Button variant="ghost" size="xs" disabled={!unread} onClick={() => setNotifications(notifications.map((n) => ({ ...n, unread: false })))}>Mark all read</Button>{handle}</Inline>}>
      <NotificationList limit={5} footer={false} />
    </Panel>
  );
}

/* ─── Dashboard: the widgets in a reorderable grid ─────────────── */
const ORDER = [{ id: 'projects', title: 'Projects', span: '2' }, { id: 'notifications', title: 'Notifications' }, { id: 'emails', title: 'Emails', span: '2' },
  { id: 'tasks', title: 'To do' }, { id: 'notes', title: 'Notes' }, { id: 'calendar', title: 'Calendar' }, { id: 'contacts', title: 'Contacts' }];

export function Dashboard({ setSection, setProject, prefs }) {
  const [order, setOrder] = useState(ORDER);
  // at Narrow the widgets stack in one column, each the full width (reflow at 320px, WCAG 1.4.10): three columns, or a
  // widget spanning two, would scroll the page sideways
  const layout = useAppLayout();
  const narrow = !!(layout && layout.narrow);
  const widgets = {
    projects: <ProjectsWidget onViewAll={() => setSection('projects')} onProject={(p) => { setProject(p); setSection('project-detail'); }} prefs={prefs} />,
    emails: <EmailsWidget onViewAll={() => setSection('messaging')} prefs={prefs} />,
    tasks: <TasksWidget onViewAll={() => setSection('tasks')} prefs={prefs} />,
    notes: <NotesWidget onViewAll={() => setSection('notes')} prefs={prefs} />,
    calendar: <CalendarWidget onViewAll={() => setSection('calendar')} />,
    contacts: <ContactsWidget onViewAll={() => setSection('contacts')} />,
    notifications: <NotificationsWidget />,
  };
  // the clock
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = now.getHours(), m = now.getMinutes();
  const hStr = `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  return (
    <Stack gap="md" inset="md" grow scroll className="plx-motion-enter">
      <Inline gap="sm">
        <Text variant="data">{hStr}</Text>
        <Divider orientation="vertical" />
        <Text variant="secondary">{dStr}</Text>
      </Inline>
      <WidgetGrid label="Dashboard" columns={narrow ? 'auto' : 3} items={narrow ? order.map((w) => ({ ...w, span: '1' })) : order} renderItem={(w, handle) => React.cloneElement(widgets[w.id], { handle })}
        onReorder={(ids) => setOrder(ids.map((id) => order.find((x) => x.id === id)))} />
    </Stack>
  );
}
