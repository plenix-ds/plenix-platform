/* Plenix suite · classification (suite/classification.jsx): the classification widget (project type, projects, categories,
   tags) the applications share, and the category editor; moved out of the settings page in the suite split (batch 149).
   Rebuilt from Platform components in batch 199: each field is a Field; the lists are Comboboxes (several values, grouped
   options, and a new value created from the text typed); the category editor uses Field, ColorSwatch and Avatar. */
import { Avatar, Badge, Button, ColorPicker, Combobox, Dialog, Field, Inline, Input, RowButton, Select, Stack, Text } from 'plenix-platform';
import { PROJECTS } from './shared.jsx';
const { useRef } = React;

/* A whole row (or card) that acts as one control: the Platform RowButton with its content laid out by inner (a flex row
   by default). */
export function RowItem({ innerClassName, children, ...rest }) {
  return <RowButton {...rest}><span className={['plx-u-flex plx-u-items-center', innerClassName].filter(Boolean).join(' ')}>{children}</span></RowButton>;
}

/* ─── ClassificationWidget ───────────────────────────────────────
   Universal widget embedded in every capability's create/edit form.
   UI label: "Classification"  |  Internal name: Anchors
   Fields: projectType (single), projects[], categories[], tags[]
   ──────────────────────────────────────────────────────────────── */
export function ClassificationWidget({ value, onChange }) {
  const v = value || { projectType: '', projects: [], categories: [], tags: [] };
  const set = (field, val) => onChange && onChange({ ...v, [field]: val });
  const totalSet = (v.projectType ? 1 : 0) + v.projects.length + v.categories.length + v.tags.length;
  // the options, grouped: your projects; each category under its parent; each tag under its group
  const projectOptions = PROJECTS.map((p) => ({ value: p.name, label: p.name, group: 'Your projects' }));
  const categoryOptions = [];
  (window.CAT_FLAT || []).forEach((c) => {
    const parent = c.includes(' › ') ? c.split(' › ')[0] : c;
    categoryOptions.push({ value: c, label: c.includes(' › ') ? c.split(' › ')[1] : c, group: parent });
  });
  const tagOptions = [];
  Object.entries(window.TAG_GROUPS || {}).forEach(([group, items]) => items.forEach((t) => tagOptions.push({ value: t, label: t, group })));
  const add = (field, text, tag) => { const val = tag ? text.toLowerCase().replace(/\s+/g, '-') : text; if (val && v[field].indexOf(val) < 0) set(field, v[field].concat([val])); };
  return (
    <Stack gap="sm">
      <Inline justify="between">
        <Text variant="eyebrow">Classification</Text>
        {totalSet > 0 ? <Badge tone="active" size="sm">{totalSet} set</Badge> : null}
      </Inline>
      <Field label="Project Type" layout="inline">
        <Select value={v.projectType || ''} onChange={(e) => set('projectType', e.target.value)}>
          <option value="">— none —</option>
          {(window.PROJ_TYPES || []).map((grp) => (
            <optgroup key={grp.group} label={grp.group}>{grp.types.map((t) => <option key={t} value={t}>{t}</option>)}</optgroup>
          ))}
        </Select>
      </Field>
      <Field label="Projects" layout="inline">
        <Combobox multiple creatable options={projectOptions} values={v.projects} onChange={(x) => set('projects', x)} onCreate={(t) => add('projects', t)} placeholder="Add projects" label="Projects" />
      </Field>
      <Field label="Categories" layout="inline">
        <Combobox multiple creatable options={categoryOptions} values={v.categories} onChange={(x) => set('categories', x)} onCreate={(t) => add('categories', t)} placeholder="Add categories" label="Categories" />
      </Field>
      <Field label="Tags" layout="inline">
        <Combobox multiple creatable options={tagOptions} values={v.tags} onChange={(x) => set('tags', x)} onCreate={(t) => add('tags', t, true)} placeholder="Add tags" label="Tags" />
      </Field>
    </Stack>
  );
}

/* ─── Category Edit Modal ──────────────────────────────────────── */
export function CatEditModal({ catEdit, setCatEdit, saveEdit }) {
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const title = catEdit.isNew ? (catEdit.type === 'cat' ? 'New category' : 'New subcategory') : (catEdit.type === 'cat' ? 'Edit category' : 'Edit subcategory');
  const color = catEdit.color || 'blue';
  return (
    <Dialog open onClose={() => setCatEdit(null)} title={title} size="sm" initialFocus={nameRef}
      footer={<><Button onClick={() => setCatEdit(null)}>Cancel</Button><Button variant="primary" onClick={saveEdit} disabled={!catEdit.name.trim()}>{catEdit.isNew ? 'Create' : 'Save changes'}</Button></>}>
      <Stack gap="md">
        <Field label="Name">
          <Input ref={nameRef} value={catEdit.name} onChange={(e) => setCatEdit((x) => ({ ...x, name: e.target.value }))}
            placeholder={catEdit.type === 'cat' ? 'Category name' : 'Subcategory name'} onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(); }} />
        </Field>
        {catEdit.type === 'cat' ? (
          <>
            <Field label="Color" description="Choose the category's color">
              <ColorPicker palette="category" label="Category color" value={color} onChange={(h) => setCatEdit((x) => ({ ...x, color: h }))} />
            </Field>
            <Field label="Icon" description="An optional image, sized to fit">
              <Inline gap="sm">
                <Avatar name={catEdit.name || '?'} src={catEdit.icon || undefined} category={color} size="lg" />
                <Button icon="upload" onClick={() => { if (fileRef.current) fileRef.current.click(); }}>Upload image</Button>
                <input ref={fileRef} type="file" accept="image/*" tabIndex={-1} aria-hidden="true" hidden onChange={(e) => {
                  const f = e.target.files[0]; if (!f) return;
                  const r = new FileReader(); r.onload = (ev) => setCatEdit((x) => ({ ...x, icon: ev.target.result })); r.readAsDataURL(f);
                }} />
                {catEdit.icon ? <Button variant="ghost" size="xs" onClick={() => setCatEdit((x) => ({ ...x, icon: null }))}>Remove</Button> : null}
              </Inline>
            </Field>
          </>
        ) : null}
      </Stack>
    </Dialog>
  );
}
