/* Plenix asset app · Browse dialogs (app/dialogs/BrowseDialogs.jsx): the home page's create, save, sort, field and filter
   dialogs. Replaces these templates of partials/dialogs.html (batch 111): newCatModal, saveSearchModal, advancedSortModal,
   newCollectionModal, editFieldsCatModal, editFieldsFileModal, catEditFieldsModal, categoriesFilterModal, typeFilterModal,
   tagsFilterModal, mergedFilterModal. fieldInfoModal and tableExpandModal are not ported: Field's info prop and a
   size="full" Dialog replace them. Every dialog takes { open, onClose } and keeps its own form state; extra props:
   - NewCatDialog: onSave?({ name, description, tags, color }). Its Fields button opens EditFieldsCatDialog on top.
   - SaveSearchDialog: onSave?({ name, description }).
   - AdvancedSortDialog: value?({ field, direction: 'asc' | 'desc' }), onApply?(value). The page shows the field as the
     sort label, as applyAdvancedSort did.
   - NewCollectionDialog: onSave?({ name, description }).
   - EditFieldsCatDialog, EditFieldsFileDialog: value?({ [field]: shown }), onSave?(value).
   - CatEditFieldsDialog: onDone?({ fields: [{ name, type }], forAllUsers }).
   - CategoriesFilterDialog, TagsFilterDialog: value?(selected names), onApply?(names).
   - TypeFilterDialog: value?(selected type names: sub-types such as 'PNG', or a group without sub-types such as 'Videos'),
     onApply?(names).
   - MergedFilterDialog: tab?('categories' | 'type' | 'tags', the tab it opens on), value?({ categories, type, tags }),
     onApply?(value). The three filters in one dialog, as openMergedFilters did.
   The filter and sort dialogs edit a copy of the selection: Apply reports it, Cancel drops it. Without value they keep
   their own selection, starting from the legacy defaults. Actions with no back end yet confirm with a toast. */
import React from 'react';
import {
  Dialog, Field, Input, Textarea, Select, Checkbox, RadioGroup, Switch, Tabs, LegacyDataTable as DataTable, Tag, TagList, TagInput, Button, Icon,
  Count, Kbd, SearchField, EmptyState, useToast, Stack, Inline, Text, ColorPicker, CATEGORY_COLORS,
} from 'plenix-platform';

// DATA: category colors, sort fields, field lists and filter values come from the back end; sample values until then.
// A category's color is a category color: a name from the category palette (CATEGORY_COLORS; batch 290).
const SORT_FIELDS = ['Name', 'Description', 'Tags', 'Rating', 'Keywords', 'Category path', 'File size', 'Dimensions', 'Date created',
  'Date modified', 'Camera model', 'Aperture', 'Color profile', 'GPS location', 'Edit status', 'Owner'];
// DATA: [field, type, shown]
const CATEGORY_FIELDS = [['name', 'text', true], ['description', 'textarea', true], ['categorypath', 'text', true], ['parentid', 'text', true],
  ['displayorder', 'number', true], ['color', 'text', true], ['owner', 'text', true], ['viewgroups', 'list', true], ['editgroups', 'list', false],
  ['visibility', 'list', true], ['defaultstatus', 'list', false], ['defaultcopyright', 'text', false], ['defaulttags', 'list', false],
  ['totalassets', 'number', true], ['storageused', 'number', false], ['datecreated', 'date', true], ['datemodified', 'date', true]];
const ASSET_FIELDS = [['name', 'text', true], ['assettitle', 'text', true], ['sourcepath', 'text', true], ['filesize', 'number', true],
  ['fileformat', 'text', true], ['width', 'number', true], ['height', 'number', true], ['description', 'textarea', true],
  ['category', 'list dropdown', true], ['editstatus', 'list dropdown', true], ['assetaddeddate', 'date', true], ['assetmodificationdate', 'date', true]];
// DATA: the category's edit form (Edit Fields) and the fields that can be added to it.
const CATEGORY_FORM_FIELDS = [{ name: 'Category name', type: 'Text' }, { name: 'Description', type: 'Text area' }, { name: 'Tags', type: 'Tags' }];
const ADDABLE_FIELDS = ['Archive source path', 'Auto assigned media', 'Categories', 'Category ID', 'Color', 'Custom Field 1', 'Custom Field 2',
  'Display order', 'Parent category', 'Permissions', 'Source path', 'Thumbnail'];
// DATA: [name, asset count]
const CATEGORIES = [['Banner icon', 24], ['Bookshelf', 18], ['Borders - Arch', 31], ['Borders - Circular', 42], ['Branding - Churches', 28],
  ['Branding - CYC', 5], ['Branding - Diakonia', 15], ['Certificate - Baptism', 89], ['Certificate - Masters', 47],
  ['Clergy - Metropolitan Serapion', 62], ['Clergy - Pope Shenouda III', 210], ['Clergy - Pope Tawadros II', 45], ['Cross - Traditional', 78],
  ['Dome', 33], ['Embroideries', 156], ['Fonts', 18]];
const TAGS = [['cross', 312], ['certificate', 189], ['clergy', 156], ['branding', 87], ['border', 74], ['ornament', 53], ['coptic', 42]];
// DATA: type groups; a group with types is checked through them, a group without is checked itself.
const TYPE_GROUPS = [
  { name: 'Photos', count: 3855, types: [['PSD', 287], ['PNG', 1640], ['JPG', 1890], ['TIFF', 14]] },
  { name: 'Vectors', count: 504, types: [['AI', 412], ['SVG', 22], ['DWG', 38]] },
  { name: 'Documents', count: 145, types: [['PDF', 92], ['INDD', 53]] },
  { name: 'Videos', count: 60, types: [] },
  { name: 'Fonts', count: 18, types: [] },
  { name: '3D Models', count: 4, types: [] },
];
// The legacy defaults: every category checked, these types checked, no tags.
const DEFAULT_CATEGORIES = CATEGORIES.map((c) => c[0]);
const DEFAULT_TYPES = ['PSD', 'PNG', 'JPG', 'AI', 'Videos'];
const DEFAULT_TAGS = [];
const EMPTY_TEXT = 'No data';

/* ── small parts ── */
const fmt = (n) => Number(n).toLocaleString('en-US');
const has = (q, text) => !q || String(text).toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;

// A check row's label: the name, then its asset count at the end.
const Counted = ({ name, count }) => (
  <Inline as="span" justify="between" grow><span>{name}</span><Count value={fmt(count)} /></Inline>
);

const Footer = ({ onCancel, children }) => <><Button onClick={onCancel}>Cancel</Button>{children}</>;

// The working copy of a selection: taken from value (or the dialog's own state) each time the dialog opens.
function useDraft(open, value, initial) {
  const [own, setOwn] = React.useState(initial);
  const current = value !== undefined ? value : own;
  const [draft, setDraft] = React.useState(current);
  React.useEffect(() => { if (open) setDraft(current); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const commit = () => { setOwn(draft); return draft; };
  return [draft, setDraft, commit];
}

const toggleIn = (arr, name, on) => (on ? (arr.indexOf(name) >= 0 ? arr : arr.concat(name)) : arr.filter((v) => v !== name));

/* ── Categories › Add New ── */
export function NewCatDialog({ open, onClose, onSave }) {
  const toast = useToast();
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [form, setForm] = React.useState({ name: '', description: '' });
  const [tags, setTags] = React.useState([]);
  const [color, setColor] = React.useState(CATEGORY_COLORS[0]);
  const [fieldsOpen, setFieldsOpen] = React.useState(false);
  const text = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });
  const addTag = (t) => { if (tags.indexOf(t) < 0) setTags(tags.concat(t)); };
  const save = (e) => {
    e.preventDefault();
    toast.show('Save', { tone: 'success' });
    if (onSave) onSave({ name: form.name, description: form.description, tags, color });
  };
  return (
    <Dialog open={open} onClose={onClose} title="Categories › Add New" icon="grid-2x2" size="lg" footer={(
      <Footer onCancel={onClose}>
        <Button icon="circle-info" onClick={() => setFieldsOpen(true)}>Fields</Button>
        <Button type="submit" form={uid} variant="primary">Save</Button>
      </Footer>)}>
      <Stack as="form" id={uid} noValidate onSubmit={save}>
        <Field label="Category name"><Input name="categoryName" placeholder="Enter category name..." {...text('name')} /></Field>
        <Field label="Description"><Textarea name="description" placeholder="Optional description..." {...text('description')} /></Field>
        <div className="plx-field plx-field--stacked">
          <div className="plx-field__head"><label className="plx-field__label" htmlFor={uid + 'tags'}>Tags</label></div>
          <div className="plx-field__control">
            <TagList>
              {tags.map((t) => <Tag key={t} onRemove={() => setTags(tags.filter((x) => x !== t))}>{t}</Tag>)}
              <TagInput id={uid + 'tags'} name="tags" placeholder="Add a tag" aria-describedby={uid + 'tags-d'} onAdd={addTag} />
            </TagList>
            <div className="plx-field__description" id={uid + 'tags-d'}>Hit <Kbd>enter</Kbd> or <Kbd>return</Kbd> key after typing each tag</div>
          </div>
        </div>
        <div className="plx-field plx-field--stacked">
          <div className="plx-field__head"><span className="plx-field__label" id={uid + 'color'}>Category color</span></div>
          <div className="plx-field__control">
            <ColorPicker palette="category" aria-labelledby={uid + 'color'} label={null} value={color} onChange={setColor} />
          </div>
        </div>
      </Stack>
      <EditFieldsCatDialog open={fieldsOpen} onClose={() => setFieldsOpen(false)} />
    </Dialog>
  );
}

/* ── Save Search and Collections › Add New: a name and a description ── */
function NameDialog({ open, onClose, onSave, title, icon, nameLabel, nameField, placeholder, saved }) {
  const toast = useToast();
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [form, setForm] = React.useState({ name: '', description: '' });
  const text = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });
  const save = (e) => {
    e.preventDefault();
    toast.show(saved, { tone: 'success' });
    if (onSave) onSave({ ...form });
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} title={title} icon={icon}
      footer={<Footer onCancel={onClose}><Button type="submit" form={uid} variant="primary">Save</Button></Footer>}>
      <Stack as="form" id={uid} noValidate onSubmit={save}>
        <Field label={nameLabel}><Input name={nameField} placeholder={placeholder} {...text('name')} /></Field>
        <Field label="Description"><Textarea name="description" placeholder="Optional description..." {...text('description')} /></Field>
      </Stack>
    </Dialog>
  );
}

export function SaveSearchDialog(props) {
  return <NameDialog {...props} title="Save search" icon="save" nameLabel="Search name" nameField="searchName" placeholder="e.g. High-res crosses" saved="Search saved" />;
}

export function NewCollectionDialog(props) {
  return <NameDialog {...props} title="Collections › Add New" icon="briefcase-plus" nameLabel="Collection name" nameField="collectionName" placeholder="Enter collection name..." saved="Collection created" />;
}

/* ── Advanced Sort ── */
export function AdvancedSortDialog({ open, onClose, value, onApply }) {
  const toast = useToast();
  const [draft, setDraft, commit] = useDraft(open, value, { field: 'Name', direction: 'asc' });
  const [q, setQ] = React.useState('');
  const fields = SORT_FIELDS.filter((f) => has(q, f));
  const apply = () => {
    const next = commit();
    toast.show('Sorted by ' + next.field + ' (' + (next.direction === 'asc' ? 'Ascending' : 'Descending') + ')', { tone: 'success' });
    if (onApply) onApply(next);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} title="Advanced sort" icon="sort"
      footer={<Footer onCancel={onClose}><Button variant="primary" onClick={apply}>Apply</Button></Footer>}>
      <Stack>
        <Field label="Sort by field"><Input name="sortByField" type="search" placeholder="Search fields..." value={q} onChange={(e) => setQ(e.target.value)} /></Field>
        <Stack gap="xs" maxHeight="md">
          {fields.length
            ? <RadioGroup aria-label="Sort by field" name="advSortField" value={draft.field} onChange={(f) => setDraft({ ...draft, field: f })} options={fields.map((f) => ({ value: f, label: f }))} />
            : <EmptyState>{EMPTY_TEXT}</EmptyState>}
        </Stack>
        <RadioGroup label="Direction" name="advSortDir" layout="row" value={draft.direction} onChange={(d) => setDraft({ ...draft, direction: d })}
          options={[{ value: 'asc', label: 'Ascending' }, { value: 'desc', label: 'Descending' }]} />
      </Stack>
    </Dialog>
  );
}

/* ── Edit Category Fields and Edit Asset Fields: which fields the detail panel shows ── */
function FieldVisibilityDialog({ open, onClose, value, onSave, title, description, fields }) {
  const initial = React.useMemo(() => Object.fromEntries(fields.map((f) => [f[0], f[2]])), [fields]);
  const [draft, setDraft, commit] = useDraft(open, value, initial);
  const [q, setQ] = React.useState('');
  const rows = fields.filter((f) => has(q, f[0])).map((f) => ({ id: f[0], name: f[0], type: f[1] }));
  const save = () => { const next = commit(); if (onSave) onSave(next); onClose(); };
  return (
    <Dialog open={open} onClose={onClose} title={title} icon="fields" description={description}
      footer={<Footer onCancel={onClose}><Button variant="primary" onClick={save}>Save</Button></Footer>}>
      <Stack>
        <SearchField name="searchFields" label="Search fields" placeholder="Search fields..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
        <DataTable label={title} data={rows} empty={EMPTY_TEXT} headerMenu={false} options={{ movableRows: true }} columns={[
          { title: 'Order', field: 'handle', kind: 'icon', icon: 'menu-lines', rowHandle: true, headerSort: false, render: () => <Icon name="menu-lines" size="sm" /> },
          { title: 'Field', field: 'name', kind: 'name', headerSort: false },
          { title: 'Type', field: 'type', kind: 'data', headerSort: false },
          { title: 'Show', field: 'show', kind: 'center', hozAlign: 'right', headerHozAlign: 'right', headerSort: false, render: (r) => (
            <Switch label={'Show ' + r.name} labelHidden checked={!!draft[r.name]} onChange={(e) => setDraft({ ...draft, [r.name]: e.target.checked })} />) },
        ]} />
      </Stack>
    </Dialog>
  );
}

export function EditFieldsCatDialog(props) {
  return <FieldVisibilityDialog {...props} title="Edit category fields" fields={CATEGORY_FIELDS}
    description="Choose which category attributes to show in the detail panel. Drag to reorder." />;
}

export function EditFieldsFileDialog(props) {
  return <FieldVisibilityDialog {...props} title="Edit asset fields" fields={ASSET_FIELDS}
    description="Choose which metadata fields to show in the detail panel. Drag to reorder." />;
}

/* ── Edit Fields: the fields on the category edit form ── */
export function CatEditFieldsDialog({ open, onClose, onDone }) {
  const toast = useToast();
  const [fields, setFields] = React.useState(CATEGORY_FORM_FIELDS);
  const [forAll, setForAll] = React.useState(true);
  const addable = ADDABLE_FIELDS.filter((n) => !fields.some((f) => f.name === n));
  const remove = (name) => { setFields(fields.filter((f) => f.name !== name)); toast.show('Field removed', { tone: 'info' }); };
  // Added fields have no type until the back end supplies one.
  const add = (e) => { const n = e.target.value; if (n) setFields(fields.concat({ name: n, type: '—' })); };
  const done = () => { if (onDone) onDone({ fields, forAllUsers: forAll }); onClose(); };
  return (
    <Dialog open={open} onClose={onClose} title="Edit fields" icon="fields"
      footer={<Footer onCancel={onClose}><Button variant="primary" onClick={done}>Done</Button></Footer>}>
      <Stack>
        <Inline justify="end">
          <Checkbox name="editForAllUsers" label="Edit for all users" checked={forAll} onChange={(e) => setForAll(e.target.checked)} />
        </Inline>
        <DataTable label="Edit fields" data={fields.map((f) => ({ id: f.name, ...f }))} empty={EMPTY_TEXT} headerMenu={false} options={{ movableRows: true }} columns={[
          { title: 'Order', field: 'handle', kind: 'icon', icon: 'menu-lines', rowHandle: true, headerSort: false, render: () => <Icon name="menu-lines" size="sm" /> },
          { title: 'Field', field: 'name', kind: 'name', headerSort: false },
          { title: 'Type', field: 'type', kind: 'data', headerSort: false },
          { title: 'Remove', field: 'remove', kind: 'center', hozAlign: 'right', headerHozAlign: 'right', headerSort: false, render: (r) => (
            <Button size="xs" variant="ghost" iconOnly icon="close" label={'Remove ' + r.name} onClick={() => remove(r.name)} />) },
        ]} />
        <Select name="addAnotherField" aria-label="Add another field" value="" onChange={add}>
          <option value="">Add another field</option>
          {addable.map((n) => <option key={n}>{n}</option>)}
        </Select>
      </Stack>
    </Dialog>
  );
}

/* ── Filter panels: the body of each filter dialog, shared with the merged Filters dialog ── */
function CheckListPanel({ items, selected, onChange, searchName, searchLabel }) {
  const [q, setQ] = React.useState('');
  const shown = items.filter((it) => has(q, it[0]));
  return (
    <Stack>
      <SearchField name={searchName} label={searchLabel} placeholder={searchLabel + '...'} value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
      <Stack gap="xs" maxHeight="md" role="group" aria-label={searchLabel.replace('Search', 'Filter by')}>
        {shown.length ? shown.map(([name, count]) => (
          <Checkbox key={name} label={<Counted name={name} count={count} />} checked={selected.indexOf(name) >= 0}
            onChange={(e) => onChange(toggleIn(selected, name, e.target.checked))} />
        )) : <EmptyState>{EMPTY_TEXT}</EmptyState>}
      </Stack>
    </Stack>
  );
}

const CategoriesPanel = ({ selected, onChange }) => <CheckListPanel items={CATEGORIES} selected={selected} onChange={onChange} searchName="searchCategories" searchLabel="Search categories" />;
const TagsPanel = ({ selected, onChange }) => <CheckListPanel items={TAGS} selected={selected} onChange={onChange} searchName="searchTags" searchLabel="Search tags" />;

// Types: a group with types is checked when all of them are, mixed when some are (toggleFdGroup / toggleFdSub);
// the arrow shows or hides its types (toggleFdCollapse).
function TypePanel({ selected, onChange }) {
  const [collapsed, setCollapsed] = React.useState({});
  return (
    <Stack gap="xs" maxHeight="md" role="group" aria-label="Filter by Type">
      {TYPE_GROUPS.map((g) => {
        const names = g.types.map((t) => t[0]);
        const on = names.length ? names.filter((n) => selected.indexOf(n) >= 0).length : (selected.indexOf(g.name) >= 0 ? 1 : 0);
        const all = names.length ? on === names.length : on === 1;
        const setGroup = (checked) => onChange((names.length ? names : [g.name]).reduce((acc, n) => toggleIn(acc, n, checked), selected));
        const isCollapsed = !!collapsed[g.name];
        return (
          <Stack key={g.name} gap="xs">
            <Inline>
              <Stack grow>
                <Checkbox label={<Counted name={g.name} count={g.count} />} checked={all} indeterminate={!all && on > 0} onChange={(e) => setGroup(e.target.checked)} />
              </Stack>
              {names.length ? (
                <Button size="xs" variant="ghost" iconOnly icon={isCollapsed ? 'chevron-right' : 'chevron-down'} label={'Show or hide ' + g.name + ' types'} expanded={!isCollapsed}
                  onClick={() => setCollapsed({ ...collapsed, [g.name]: !isCollapsed })} />
              ) : null}
            </Inline>
            {names.length && !isCollapsed ? (
              <Stack gap="xs" indent>
                {g.types.map(([name, count]) => (
                  <Checkbox key={name} label={<Counted name={name} count={count} />} checked={selected.indexOf(name) >= 0}
                    onChange={(e) => onChange(toggleIn(selected, name, e.target.checked))} />
                ))}
              </Stack>
            ) : null}
          </Stack>
        );
      })}
    </Stack>
  );
}

function FilterDialog({ open, onClose, value, onApply, initial, title, icon, Panel }) {
  const [draft, setDraft, commit] = useDraft(open, value, initial);
  const apply = () => { const next = commit(); if (onApply) onApply(next); onClose(); };
  return (
    <Dialog open={open} onClose={onClose} title={title} icon={icon}
      footer={<Footer onCancel={onClose}><Button variant="primary" onClick={apply}>Apply</Button></Footer>}>
      <Panel selected={draft} onChange={setDraft} />
    </Dialog>
  );
}

export function CategoriesFilterDialog(props) {
  return <FilterDialog {...props} title="Filter by Categories" icon="grid-2x2" initial={DEFAULT_CATEGORIES} Panel={CategoriesPanel} />;
}

export function TypeFilterDialog(props) {
  return <FilterDialog {...props} title="Filter by Type" icon="image-b" initial={DEFAULT_TYPES} Panel={TypePanel} />;
}

export function TagsFilterDialog(props) {
  return <FilterDialog {...props} title="Filter by Tags" icon="tags" initial={DEFAULT_TAGS} Panel={TagsPanel} />;
}

/* ── Filters: Categories, Type and Tags in one dialog, one tab each ── */
export function MergedFilterDialog({ open, onClose, tab = 'categories', value, onApply }) {
  // a page may hold only some of the three filters: the others start from their defaults
  const given = value && { categories: value.categories || DEFAULT_CATEGORIES, type: value.type || DEFAULT_TYPES, tags: value.tags || DEFAULT_TAGS };
  const [draft, setDraft, commit] = useDraft(open, given, { categories: DEFAULT_CATEGORIES, type: DEFAULT_TYPES, tags: DEFAULT_TAGS });
  const [current, setCurrent] = React.useState(tab);
  React.useEffect(() => { if (open) setCurrent(tab); }, [open, tab]);
  const set = (k) => (v) => setDraft({ ...draft, [k]: v });
  const apply = () => { const next = commit(); if (onApply) onApply(next); onClose(); };
  return (
    <Dialog open={open} onClose={onClose} title="Filters" icon="settings-preferences"
      footer={<Footer onCancel={onClose}><Button variant="primary" onClick={apply}>Apply</Button></Footer>}>
      <Tabs variant="contained" label="Filters" value={current} onChange={setCurrent} items={[
        { value: 'categories', label: 'Categories', content: <CategoriesPanel selected={draft.categories} onChange={set('categories')} /> },
        { value: 'type', label: 'Type', content: <TypePanel selected={draft.type} onChange={set('type')} /> },
        { value: 'tags', label: 'Tags', content: <TagsPanel selected={draft.tags} onChange={set('tags')} /> },
      ]} />
    </Dialog>
  );
}

export const DIALOGS = {
  newCatModal: NewCatDialog,
  saveSearchModal: SaveSearchDialog,
  advancedSortModal: AdvancedSortDialog,
  newCollectionModal: NewCollectionDialog,
  editFieldsCatModal: EditFieldsCatDialog,
  editFieldsFileModal: EditFieldsFileDialog,
  catEditFieldsModal: CatEditFieldsDialog,
  categoriesFilterModal: CategoriesFilterDialog,
  typeFilterModal: TypeFilterDialog,
  tagsFilterModal: TagsFilterDialog,
  mergedFilterModal: MergedFilterDialog,
};
