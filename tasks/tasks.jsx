/* Plenix · tasks (tasks/tasks.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in batch 199:
   the tasks in a Panel as an ActivityList, the open task in a SidePanel. The open task is a screen (#/task/<id>, a history
   entry: Back closes it; Platforms Standard 4.3). */
import { EntityHeader, ActivityList, Button, Checkbox, Icon, Inline, PageContent, Panel, SidePanel, Stack, Text } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_TASKS, Priority } from '../suite/shared.jsx';
const { useState } = React;

/* ─── Tasks ─────────────────────────────────────────────────────── */
export function TasksScreen({ screen }) {
  const [done, setDone] = useState(() => Object.fromEntries(ALL_TASKS.map((t) => [t.id, t.done])));
  const sel = screen.parts[0] === 'task' ? +screen.parts[1] : null;
  const setSel = (id) => (id === null ? screen.parent('/') : screen.open(['task', id]));
  const [meta, setMeta] = useState({});
  const task = ALL_TASKS.find((t) => t.id === sel);
  return (
    <div className="plx-page-panes">
      <PageContent>
        <Stack gap="md">
          <EntityHeader title="Tasks" media={{ icon: 'circle-check', hue: 'blue' }} facts={[ALL_TASKS.length + ' tasks', ALL_TASKS.filter((t) => !t.done).length + ' open']} actions={[{ icon: 'share', label: 'Share' }]} />
          {/* the capability's own action stays out of the header (the capability menu is still to be decided) */}
          <Inline justify="end"><Button variant="primary" icon={<Icon name="plus" />}>Add task</Button></Inline>
          <Panel icon="circle-check" title="All tasks" flush>
            <ActivityList label="Tasks">{ALL_TASKS.map((t) => (
              <ActivityList.Item key={t.id} selected={sel === t.id} onOpen={() => setSel(sel === t.id ? null : t.id)}
                leading={<Inline gap="xs" className="plx-u-relative plx-u-z-raised"><Checkbox aria-label={'Done: ' + t.title} checked={!!done[t.id]} onChange={() => setDone((d) => ({ ...d, [t.id]: !d[t.id] }))} /><Priority pri={t.pri} /></Inline>}
                title={done[t.id] ? <Text variant="secondary"><s>{t.title}</s></Text> : t.title}
                meta={t.proj} time={'Due ' + t.due} />
            ))}</ActivityList>
          </Panel>
        </Stack>
      </PageContent>
      {task ? (
        <SidePanel title={task.title} icon="circle-info" onOpenChange={(o) => { if (!o) setSel(null); }}>
          <Stack gap="md">
            <Text variant="secondary">Due <Text variant="data">{task.due}</Text> · {task.proj}</Text>
            <ClassificationWidget value={meta[task.id]} onChange={(m) => setMeta((prev) => ({ ...prev, [task.id]: m }))} />
          </Stack>
        </SidePanel>
      ) : null}
    </div>
  );
}
