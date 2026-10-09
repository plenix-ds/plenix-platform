/* Plenix asset app · home page details pane (app/pages/home/Inspector.jsx).
   <CategoryInspector collection act onDialog/>: the category (or, in the collections view, the collection) shown in the
   browse views — preview, editable title, Details (General, Tags, Stats, Permissions, Custom Fields) and Downloads.
   <AssetInspector asset act onDialog onPreview/>: the asset chosen in the search results — preview (opens the viewer),
   title, Details (File, General, Tags), Downloads, Versions; with no asset, a prompt to choose one.
   act(message, tone) returns a click handler that shows a toast (actions without a back end); onDialog(id) opens a dialog.
   Each section collapses (General, Tags and Stats start open, as before). */
import React from 'react';
import {
  Tabs, CollapsibleSection, Field, Input, Textarea, Select, Rating, Tag, TagList, TagInput, Button, PropertyList, Icon, EmptyState, ActivityList, StatusDot,
  Stack, Inline, Text, Preview,
} from 'plenix-platform';
import * as D from './homeData.js';

// a group of fields: the Platform CollapsibleSection (the legacy section header), its rows stacked
const Accordion = ({ title, defaultOpen = true, children }) => (
  <CollapsibleSection title={title} defaultExpanded={defaultOpen} headingLevel={3}><Stack gap="sm" className="plx-u-pt-stack-xs">{children}</Stack></CollapsibleSection>
);

const Row = ({ label, children, info }) => <Field label={label} layout="inline" labelWidth="sm" info={info}>{children}</Field>;

function Tags({ initial, act }) {
  const [tags, setTags] = React.useState(initial);
  return (
    <>
      <TagList label="Tags">
        {tags.map((t) => <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))} removeLabel={'Remove tag ' + t}>{t}</Tag>)}
        <TagInput onAdd={(t) => { const v = t.toLowerCase(); if (tags.indexOf(v) < 0) setTags(tags.concat(v)); }} placeholder="Add a tag" aria-label="Add a tag" />
      </TagList>
      <div><Button size="sm" icon="sparkle" onClick={act('AI tagging', 'info')}>AI tagging</Button></div>
    </>
  );
}

function Downloads({ groups, act }) {
  return groups.map((g) => (
    <Accordion key={g.title} title={g.title}>
      <ActivityList label={g.title} stacked>
        {g.items.map(([icon, name, size]) => (
          <ActivityList.Item key={name} leading={<Icon name={icon} size="lg" />} title={name} meta={<Text variant="data" className="plx-u-leading-16px">{size}</Text>}
            actions={<Button size="xs" variant="ghost" iconOnly icon="download-arrow" label={'Download ' + name} onClick={act('Downloading ' + name + '...', 'success')} />} />
        ))}
      </ActivityList>
    </Accordion>
  ));
}

/* the inspector's footer actions (the panel's footer row): Save and Cancel the edits */
export function InspectorFooter({ act }) {
  return (
    <>
      <Button size="sm" variant="primary" icon="save-doc" onClick={act('Save', 'success')}>Save</Button>
      <Button size="sm" icon="close-2" onClick={act('Cancel', 'info')}>Cancel</Button>
    </>
  );
}

function EditBar({ onFields }) {
  return (
    <Inline gap="xs" className="plx-u-mb-stack-sm">
      <Button size="sm" icon="info-circle" onClick={onFields}>Fields</Button>
    </Inline>
  );
}

export function CategoryInspector({ collection = false, act, onDialog }) {
  const c = D.CATEGORY_DETAIL;
  const name0 = collection ? D.COLLECTION_DETAIL.name : c.name;
  const [f, setF] = React.useState({ name: name0, parent: c.parent, order: c.order, color: c.color, copyright: c.copyright, rights: c.rights, rating: c.rating, description: c.description, style: '', material: '', origin: '' });
  React.useEffect(() => { setF((x) => ({ ...x, name: name0 })); }, [name0]);
  const text = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });
  return (
    <Stack>
      <Preview>
        <Icon name={collection ? 'briefcase' : 'folder'} size="lg" />
        <Text variant="data" className="plx-u-leading-16px">{collection ? D.COLLECTION_DETAIL.count : c.count}</Text>
      </Preview>
      <Input aria-label="Title" emphasis value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <Tabs variant="contained" label="Details" items={[
        { value: 'details', label: 'Details', content: (
          <Stack>
            <EditBar act={act} onFields={() => onDialog('editFieldsCatModal')} />
            <Accordion title="General">
              <Row label="Name"><Input name="name" {...text('name')} /></Row>
              <Row label="Parent"><Select name="parent" {...text('parent')}>{c.parents.map((p) => <option key={p}>{p}</option>)}</Select></Row>
              <Row label="Display order"><Input name="displayOrder" type="number" {...text('order')} /></Row>
              <Row label="Color">
                <Inline wrap>
                  <Input name="color" type="color" aria-label="Color" className="plx-u-w-40px plx-u-h-28px plx-u-p-0" {...text('color')} />
                  <Text variant="data" className="plx-u-leading-16px">{f.color}</Text>
                </Inline>
              </Row>
              <Row label="Copyright"><Input name="copyright" placeholder="Copyright..." {...text('copyright')} /></Row>
              <Row label="Rights"><Select name="rights" {...text('rights')}>{c.rightsOptions.map((p) => <option key={p}>{p}</option>)}</Select></Row>
              <Row label="Rating"><Rating value={f.rating} onChange={(v) => setF({ ...f, rating: v })} label="Rating" /></Row>
              <Field label="Description"><Textarea name="description" rows={2} {...text('description')} /></Field>
            </Accordion>
            <Accordion title="Tags"><Tags initial={c.tags} act={act} /></Accordion>
            <Accordion title="Stats"><PropertyList>{c.stats.map(([k, v]) => <PropertyList.Item key={k} label={k} data>{v}</PropertyList.Item>)}</PropertyList></Accordion>
            <Accordion title="Permissions" defaultOpen={false}><PropertyList>{c.permissions.map(([k, v]) => <PropertyList.Item key={k} label={k}>{v}</PropertyList.Item>)}</PropertyList></Accordion>
            <Accordion title="Custom fields" defaultOpen={false}>
              <Text as="p" variant="secondary">Category-specific fields added to assets</Text>
              {c.customFields.map(([k, ph]) => <Row key={k} label={k}><Input name={k.toLowerCase()} placeholder={ph} {...text(k.toLowerCase())} /></Row>)}
              <div><Button size="xs" variant="ghost" icon="plus" onClick={act('Add field', 'success')}>Add field</Button></div>
            </Accordion>
          </Stack>) },
        { value: 'downloads', label: 'Downloads', content: <Stack><Downloads groups={D.CATEGORY_DOWNLOADS} act={act} /></Stack> },
      ]} />
    </Stack>
  );
}

function AssetDetail({ asset, act, onDialog, onPreview }) {
  const [f, setF] = React.useState({ title: asset.name, file: asset.file, status: asset.status, cat: asset.cat, copyright: '', rights: '', rating: 0, description: '' });
  const text = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });
  return (
    <Stack>
      <Preview as="button" onClick={onPreview} title="Click to enlarge" aria-label={'Preview ' + asset.name}
        topStart={<Icon name={asset.typeIcon} size="md" label={asset.badge} />} bottomEnd={<Icon name="expand" size="sm" />}>
        <img className="plx-preview__media" src={asset.thumb} alt="" />
      </Preview>
      <Stack gap="xs">
        <Input aria-label="Title" emphasis value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} />
        <Text variant="secondary">{asset.cat}</Text>
      </Stack>
      <Tabs variant="contained" label="Asset details" items={[
        { value: 'details', label: 'Details', content: (
          <Stack>
            <EditBar act={act} onFields={() => onDialog('editFieldsFileModal')} />
            <Accordion title="File">
              <Row label="File name"><Input name="fileName" {...text('file')} /></Row>
              <PropertyList>
                <PropertyList.Item label="File size" data>{asset.size}</PropertyList.Item>
                <PropertyList.Item label="Format">{asset.fmt}</PropertyList.Item>
                <PropertyList.Item label="Dimensions" data>{asset.dims}</PropertyList.Item>
                <PropertyList.Item label="Added" data>{asset.date}</PropertyList.Item>
              </PropertyList>
            </Accordion>
            <Accordion title="General">
              <Row label="Edit status"><Select name="editStatus" {...text('status')}>{D.ASSET_STATUSES.map((p) => <option key={p}>{p}</option>)}</Select></Row>
              <Row label="Category"><Input name="category" {...text('cat')} /></Row>
              <Row label="Copyright"><Input name="copyright" placeholder="e.g. Diocese of LA" {...text('copyright')} /></Row>
              <Row label="Usage rights"><Select name="usageRights" {...text('rights')}><option value="">-- Select --</option>{D.USAGE_RIGHTS.map((p) => <option key={p}>{p}</option>)}</Select></Row>
              <Row label="Rating"><Rating value={f.rating} onChange={(v) => setF({ ...f, rating: v })} label="Rating" /></Row>
              <Field label="Description"><Textarea name="description" rows={2} placeholder="Add description..." {...text('description')} /></Field>
            </Accordion>
            <Accordion title="Tags"><Tags initial={asset.tags} act={act} /></Accordion>
          </Stack>) },
        { value: 'downloads', label: 'Downloads', content: (
          <Stack>
            <Downloads groups={[{ title: 'Source file', items: [[asset.typeIcon, asset.file, asset.size + ' · ' + asset.fmt]] }].concat(D.ASSET_DOWNLOADS)} act={act} />
          </Stack>) },
        { value: 'versions', label: 'Versions', content: (
          <ActivityList label="Versions">
            {D.VERSIONS.map((v) => (
              <ActivityList.Item key={v.label} leading={<StatusDot tone={v.current ? 'info' : 'neutral'} label={v.current ? 'Current version' : 'Earlier version'} />}
                title={v.label} meta={v.date + ' · ' + v.user}
                actions={<><Button size="xs" variant="link" onClick={act('Download', 'info')}>Download</Button>{v.current ? null : <Button size="xs" variant="link" onClick={act('Restore', 'info')}>Restore</Button>}</>} />
            ))}
          </ActivityList>) },
      ]} />
    </Stack>
  );
}

export function AssetInspector({ asset, act, onDialog, onPreview }) {
  if (!asset) return <EmptyState size="inline" icon="document">Click an asset to see details</EmptyState>;
  return <AssetDetail key={asset.id} asset={asset} act={act} onDialog={onDialog} onPreview={onPreview} />;
}
