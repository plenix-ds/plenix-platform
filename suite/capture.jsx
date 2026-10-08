/* Plenix suite · capture (suite/capture.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the files as RadioTiles, the chosen one as a PropertyList, the proposal as a CodeBlock with its parts as Tags. */
import { Button, Chat, CodeBlock, Dialog, Inline, Notice, PropertyList, RadioTiles, Skeleton, Stack, Tag, TagList, Text } from 'plenix-platform';
import { CAPTURES, aiFileName } from './shared.jsx';
const { useState } = React;

const PART = { date: 'Date', project: 'Project', type: 'Type', description: 'Description' };

/* ─── Capture UI ────────────────────────────────────────────────── */
export function CaptureUI({ onClose }) {
  const [sel, setSel] = useState(null); const [loading, setLoading] = useState(false); const [res, setRes] = useState(null); const [saved, setSaved] = useState(false);
  const pick = async (f) => { setSel(f); setRes(null); setSaved(false); setLoading(true); try { setRes(await aiFileName(f.context)); } catch { /* no proposal */ } setLoading(false); };
  return (
    <Dialog open onClose={onClose} title="AI File Naming" description="Select a file — AI reads the content and proposes a structured name.">
      <Stack gap="md">
        <RadioTiles legend="File" legendHidden size="lg" value={sel ? sel.fileName : undefined} onChange={(v) => pick(CAPTURES.find((f) => f.fileName === v))}
          options={CAPTURES.map((f) => ({ value: f.fileName, label: f.emoji + ' ' + f.label, description: f.fileName }))} />
        {sel ? (
          <Stack gap="md">
            <PropertyList variant="table">
              <PropertyList.Item label="Original filename" data>{sel.fileName}</PropertyList.Item>
              <PropertyList.Item label="Type"><Tag>{sel.type}</Tag></PropertyList.Item>
            </PropertyList>
            {loading ? (
              <Stack gap="sm">
                <Notice tone="info"><Inline gap="sm"><Chat.Typing label="Thinking" /><span>Reading content and extracting metadata…</span></Inline></Notice>
                <Skeleton height="var(--plx-ref-size-32px)" />
                <Skeleton height="var(--plx-ref-size-24px)" width="var(--plx-ref-size-200px)" />
              </Stack>
            ) : null}
            {res && !loading && !saved ? (
              <Stack gap="sm" className="plx-motion-enter">
                <CodeBlock title="Proposed filename" language="text">{res.filename}</CodeBlock>
                <TagList label="Filename parts">{Object.entries(res.parts || {}).filter(([k]) => PART[k]).map(([k, v]) => <Tag key={k}>{PART[k] + ': ' + v}</Tag>)}</TagList>
                {res.tags ? <TagList label="Tags">{res.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagList> : null}
                {res.summary ? <Text variant="secondary" as="p"><q>{res.summary}</q></Text> : null}
                <Inline gap="sm"><Button variant="primary" onClick={() => setSaved(true)}>Accept &amp; Save</Button><Button onClick={() => pick(sel)}>Regenerate</Button><Button variant="ghost" onClick={() => { setSel(null); setRes(null); }}>Cancel</Button></Inline>
              </Stack>
            ) : null}
            {saved ? (
              <Stack gap="sm" className="plx-motion-enter">
                <Notice tone="success">Saved to OneDrive</Notice>
                <Text variant="data">{res && res.filename}</Text>
                <Inline><Button onClick={() => { setSel(null); setRes(null); setSaved(false); }}>Capture another file</Button></Inline>
              </Stack>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    </Dialog>
  );
}
