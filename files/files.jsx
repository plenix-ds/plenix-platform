/* Plenix · files (files/files.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in batch 199:
   the files in a Table, the open one in a SidePanel. */
import { Button, Icon, Inline, PageContent, SidePanel, Stack, Table, Tag, Text } from 'plenix-platform';
import { ClassificationWidget } from '../suite/classification.jsx';
import { ALL_FILES } from '../suite/shared.jsx';
const { useState } = React;

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
          <Table caption="Files" rows={ALL_FILES} rowKey={(f, i) => i} current={sel === null ? undefined : sel}
            onRowClick={(f) => { const i = ALL_FILES.indexOf(f); setSel(sel === i ? null : i); }} columns={[
              { key: 'name', header: 'Name', label: true, size: 'label' },
              { key: 't', header: 'Type', render: (f) => <Tag>{f.t}</Tag> },
              { key: 's', header: 'Size' },
              { key: 'd', header: 'Modified' },
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
