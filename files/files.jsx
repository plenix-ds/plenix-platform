/* Plenix · files (files/files.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in batch 199:
   the files in a DataGrid (batch 226), the open one in a SidePanel. */
import { Button, DataGrid, Icon, Inline, PageContent, SidePanel, Stack, Tag, Text } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_FILES } from '../suite/shared.jsx';
const { useState } = React;
// the grid's rows: each file with its place in the list as its id
const ROWS = ALL_FILES.map((f, i) => ({ ...f, id: i }));

/* ─── Files ─────────────────────────────────────────────────────── */
export function FilesScreen() {
  const [sel, setSel] = useState(null);
  const file = sel !== null ? ALL_FILES[sel] : null;
  const [meta, setMeta] = useState({});
  return (
    <div className="plx-page-panes">
      <PageContent>
        <Stack gap="md">
          <Inline justify="between">
            <Text as="h1" variant="title">Files</Text>
            <Button variant="primary" icon={<Icon name="plus" />}>Upload</Button>
          </Inline>
          <DataGrid label="Files" data={ROWS} selected={sel === null ? [] : [sel]} options={{ selectableRows: 1 }}
            on={{ rowClick: (e, row) => { const i = row.getData().id; setSel(sel === i ? null : i); } }} columns={[
              { title: 'Name', field: 'name', kind: 'name', rowLabel: true, filter: true, width: '--plx-ref-size-240px' },
              { title: 'Type', field: 't', kind: 'center', filter: 'list', render: (f) => <Tag>{f.t}</Tag> },
              { title: 'Size', field: 's', kind: 'data' },
              { title: 'Modified', field: 'd', kind: 'data' },
            ]} />
        </Stack>
      </PageContent>
      {file ? (
        <SidePanel title={file.name} icon="document" onOpenChange={(o) => { if (!o) setSel(null); }}>
          <Stack gap="md">
            <Inline gap="sm" wrap><Tag>{file.t}</Tag><Text variant="data">{file.s}</Text><Text variant="secondary">{file.d}</Text></Inline>
            <ClassificationWidget value={meta[sel]} onChange={(m) => setMeta((prev) => ({ ...prev, [sel]: m }))} />
          </Stack>
        </SidePanel>
      ) : null}
    </div>
  );
}
