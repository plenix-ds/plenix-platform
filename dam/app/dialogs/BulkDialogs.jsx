/* Plenix asset app · bulk action dialogs (app/dialogs/BulkDialogs.jsx): the 13 dialogs the bulk bars open for the selected
   assets (search results) or categories (Categories page). Replaces the ba* templates of partials/dialogs.html and the
   wording logic of plenix.js bulkAction() (batch 111).
   Every dialog takes { open, onClose } plus:
     count     number of selected items (plenix.js: selectedSet.size || selectedCats.size || 1; default 1 here)
     kind      'asset' | 'category' (which bulk bar opened it; only the delete title changes with it, as in plenix.js)
     onApply   optional (values) => void, called by the main action before the dialog closes (no back end yet)
   Dialog-specific props:
     BaDeleteDialog          onConfirm? () => void
     BaCollectionDialog      onCreateCollection? () => void   (legacy "+ Create New Collection" opened newCollectionModal)
     BaChangeCategoryDialog  currentCategory? string
     BaRenameDialog          itemName? string (the selected category's current name)
   The wording follows plenix.js exactly: the descriptions always say "assets" and never switch to the singular, even
   for one item or for categories; only the delete title says "categories" when opened from the category bar.
   bulkDialogFor(action) maps the legacy bulkAction() names to { id, kind, singleOnly }; it returns null for the names
   plenix.js had no dialog for (the page then shows bulkComingSoon(action) as an info toast, as plenix.js did). */
import React from 'react';
import {
  Dialog, ConfirmDialog, Field, Input, Textarea, Select, Checkbox, RadioGroup, SegmentedControl, Button, Icon, Tag, TagList,
  Chip, Rating, Tree, Avatar, StatusDot, EmptyState, useToast, useSession, Stack, Text, Notice, Fieldset
} from 'plenix-platform';

// DATA: collections, categories, tags, people, cart and size figures come from the back end; sample values until then.
/* "3 selected assets", "1 category": the count with its noun in the right number (the legacy text always said
   "assets", even for one item or for categories) */
const things = (count, kind = 'asset', pre = '') => count + ' ' + pre + (kind === 'category' ? (count === 1 ? 'category' : 'categories') : (count === 1 ? 'asset' : 'assets'));

const COLLECTIONS = ['Liturgical Art Collection', 'Social Media Assets', 'Website Banners', 'Print Materials', 'Clergy Portraits', 'Certificate templates'];
const MOVE_CATEGORIES = ['Banner icon', 'Bookshelf', 'Borders - Arch', 'Borders - Circular', 'Branding - Churches', 'Cross - Traditional', 'Dome', 'Embroideries'];
const CHANGE_CATEGORIES = ['Banner icon', 'Borders - Arch', 'Branding - Churches', 'Dome', 'Embroideries', 'Fonts'];
const CURRENT_CATEGORY = 'Cross - Traditional';
const CURRENT_TAGS = ['coptic', 'orthodox', 'cross', 'gold', 'traditional'];
const SUGGESTED_TAGS = ['church', 'liturgical', 'icon', 'border', 'certificate', 'branding'];
const CART_ITEMS = 2;
const SHARE_LINK = 'https://plenix.lacopts.org/share/xK9m2pQ';
// the people an asset is shared with besides the signed-in person (who comes from the Platform session and can edit)
const SHARED_WITH = [
  { name: 'John Deacon', permission: 'Can view' },
];
const DOWNLOAD_ESTIMATE = '~24.5 MB';

// DATA: choice lists (from the back end later).
const CART_FORMATS = ['Original / Source File', 'Web Optimized (1200px max)', 'Social Media (1080 × 1080)', 'Custom Size...'];
const CART_FILE_TYPES = ['Keep original format', 'PNG', 'JPG (80% quality)', 'WebP', 'SVG (vector only)', 'PDF'];
const STATUSES = [
  { value: 'Approved', tone: 'success' }, { value: 'Pending review', tone: 'warning' }, { value: 'In progress', tone: 'info' },
  { value: 'Draft', tone: 'neutral' }, { value: 'Archived', tone: 'danger' },
];
const PERMISSIONS = ['Can view', 'Can edit', 'Admin'];
const EXPIRATIONS = ['Never', '24 hours', '7 days', '30 days', '90 days'];
const DOWNLOAD_FORMATS = ['Original / Source Files', 'Web Optimized (1200px, 72dpi)', 'Print Ready (300dpi)', 'Custom Size...'];
const DOWNLOAD_FILE_TYPES = ['Keep original format', 'PNG', 'JPG (80% quality)', 'WebP', 'PDF'];
const CONVERT_TO = ['PNG', 'JPG (80% quality)', 'JPG (100% quality)', 'WebP', 'SVG', 'PDF', 'TIFF'];
const UNITS = ['px', '%', 'in', 'cm'];
const META_TYPES = [
  { value: 'all', label: 'All' }, { value: 'image', label: 'Image' }, { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' }, { value: 'document', label: 'Document' }, { value: '3d', label: '3D' },
];

/* DATA: metadata field groups for Update Metadata. Field: [key, label, kind, placeholder or options, readOnly].
   kind: text | textarea | number | date | select (options; the empty first option keeps the current value) | rating. */
const KEEP = '-- Keep current --';
const META_GROUPS = [
  { title: 'General', types: ['all'], fields: [
    ['name', 'Name', 'text', 'Leave blank to keep current'], ['description', 'Description', 'textarea', 'Leave blank to keep current'],
    ['tags', 'Tags', 'text', 'Comma-separated tags...'], ['keywords', 'Keywords', 'text', 'Comma-separated keywords...'],
    ['rating', 'Rating', 'rating'],
    ['editStatus', 'Edit status', 'select', ['Complete', 'New', 'In progress', 'Pending review', 'Draft', 'Archived']],
    ['language', 'Language', 'select', ['English', 'Arabic', 'Coptic', 'French', 'Spanish']],
    ['version', 'Version', 'text', 'e.g. 1.0'], ['summary', 'Summary', 'textarea', 'Brief summary...']] },
  { title: 'Categorization', types: ['all'], fields: [
    ['category', 'Category', 'text', 'Type to search...'], ['parentCategory', 'Parent category', 'text', 'Parent category name'],
    ['displayOrder', 'Display order', 'number', '0'],
    ['assetType', 'Asset type', 'select', ['Image', 'Video', 'Audio', 'Document', '3D Model', 'Font']],
    ['classification', 'Classification', 'text', 'Classification']] },
  { title: 'Ownership & Rights', types: ['all'], fields: [
    ['owner', 'Owner', 'text', 'Asset owner'], ['creator', 'Creator', 'text', 'Artist / Creator'],
    ['copyright', 'Copyright', 'text', 'e.g. Coptic Orthodox Diocese of LA'], ['copyrightNotice', 'Copyright notice', 'text', 'IPTC copyright notice'],
    ['usageTerms', 'Usage terms', 'select', ['Internal use only', 'Church Use - Non-Commercial', 'Creative Commons - Attribution', 'Public domain', 'All Rights Reserved']],
    ['license', 'License', 'text', 'License type'], ['author', 'Author', 'text', 'Author name']] },
  { title: 'Dates', types: ['all'], fields: [
    ['dateCreated', 'Date created', 'date'], ['dateModified', 'Date modified', 'date'],
    ['publishDate', 'Publish date', 'date'], ['expirationDate', 'Expiration date', 'date']] },
  { title: 'Dimensions & Resolution', types: ['image', 'video'], fields: [
    ['width', 'Width', 'number', 'px'], ['height', 'Height', 'number', 'px'], ['dpi', 'DPI', 'number', '72'],
    ['orientation', 'Orientation', 'select', ['Horizontal', 'Vertical', 'Square']]] },
  { title: 'Camera & Lens', types: ['image', 'video'], fields: [
    ['cameraMake', 'Camera make', 'text', 'e.g. Canon'], ['cameraModel', 'Camera model', 'text', 'e.g. EOS R5'],
    ['lensType', 'Lens type', 'text', 'e.g. RF 24-70mm']] },
  { title: 'Exposure & Shooting', types: ['image'], fields: [
    ['focalLength', 'Focal length', 'text', 'e.g. 50mm'], ['aperture', 'Aperture', 'text', 'e.g. f/2.8'],
    ['shutterSpeed', 'Shutter speed', 'text', 'e.g. 1/125'], ['iso', 'ISO', 'number', 'e.g. 400'],
    ['whiteBalance', 'White balance', 'select', ['Auto', 'Daylight', 'Cloudy', 'Tungsten', 'Fluorescent', 'Flash']],
    ['flash', 'Flash', 'select', ['Fired', 'Did not fire', 'Auto']]] },
  { title: 'Color & Image', types: ['image'], fields: [
    ['colorSpace', 'Color space', 'select', ['sRGB', 'Adobe RGB', 'ProPhoto RGB', 'Display P3']],
    ['colorProfile', 'Color profile', 'text', 'ICC profile name'], ['bitDepth', 'Bit depth', 'select', ['8', '16', '32']]] },
  { title: 'Location (GPS)', types: ['image', 'video'], fields: [
    ['gpsLatitude', 'GPS latitude', 'text', 'e.g. 34.0522'], ['gpsLongitude', 'GPS longitude', 'text', 'e.g. -118.2437'],
    ['gpsAltitude', 'GPS altitude', 'text', 'meters']] },
  { title: 'IPTC / XMP', types: ['image'], fields: [
    ['headline', 'Headline', 'text', 'IPTC headline'], ['caption', 'Caption', 'textarea', 'Caption / abstract'],
    ['byLine', 'By-line', 'text', 'Photographer / creator'], ['credit', 'Credit', 'text', 'Credit line'],
    ['source', 'Source', 'text', 'Original source'], ['instructions', 'Instructions', 'textarea', 'Special instructions']] },
  { title: 'IPTC location', types: ['image'], fields: [
    ['subLocation', 'Sub-location', 'text', 'Specific location'], ['city', 'City', 'text', 'City'],
    ['stateProvince', 'State / Province', 'text', 'State or province'], ['country', 'Country', 'text', 'Country name']] },
  { title: 'Video — Stream', types: ['video'], fields: [
    ['duration', 'Duration', 'text', 'HH:MM:SS', true], ['frameRate', 'Frame rate', 'text', 'e.g. 29.97', true],
    ['videoCodec', 'Video codec', 'text', 'e.g. H.264', true], ['videoBitrate', 'Video bitrate', 'text', 'e.g. 5000 kbps', true],
    ['resolution', 'Resolution', 'text', 'e.g. 1920x1080', true]] },
  { title: 'Audio — ID3 Tags', types: ['audio'], fields: [
    ['title', 'Title', 'text', 'Track title'], ['artist', 'Artist', 'text', 'Artist name'], ['album', 'Album', 'text', 'Album name'],
    ['year', 'Year', 'text', 'Release year'], ['track', 'Track #', 'text', 'e.g. 1/12'], ['genre', 'Genre', 'text', 'Genre'],
    ['composer', 'Composer', 'text', 'Composer name'], ['comment', 'Comment', 'textarea', 'Comment']] },
  { title: 'Audio — Stream', types: ['audio'], fields: [
    ['duration2', 'Duration', 'text', 'HH:MM:SS', true], ['codec', 'Codec', 'text', 'e.g. AAC', true],
    ['bitrate', 'Bitrate', 'text', 'e.g. 320 kbps', true], ['sampleRate', 'Sample rate', 'text', 'e.g. 44100 Hz', true]] },
  { title: 'Document', types: ['document'], fields: [
    ['title2', 'Title', 'text', 'Document title'], ['subject', 'Subject', 'text', 'Subject'],
    ['pageCount', 'Page count', 'number', '', true], ['pdfProducer', 'PDF producer', 'text', '', true]] },
  { title: '3D / Model', types: ['3d'], fields: [
    ['geometryType', 'Geometry type', 'select', ['Mesh', 'NURBS', 'Solid']], ['vertexCount', 'Vertex count', 'number', '', true],
    ['faceCount', 'Face count', 'number', '', true], ['sceneUnits', 'Scene units', 'select', ['mm', 'cm', 'm', 'in']],
    ['upAxis', 'Up axis', 'select', ['Y-up', 'Z-up']], ['fileFormat', 'File format', 'text', 'e.g. FBX, GLTF', true],
    ['sourceApp', 'Source app', 'text', 'e.g. Blender', true]] },
  { title: 'Distribution', types: ['all'], fields: [
    ['channels', 'Channels', 'text', 'Distribution channels'],
    ['conversionPreset', 'Conversion preset', 'select', ['Web optimized', 'Print ready', 'Social Media', 'Original']]] },
];

/* ── wording and the legacy action map (plenix.js bulkAction) ── */
const BULK_ACTIONS = {
  'Download': 'baDownload', 'Download as': 'baDownloadAs', 'Delete': 'baDelete',
  'Add to Collection': 'baCollection', 'Move': 'baMove', 'Change category': 'baChangeCategory',
  'Add to Cart': 'baCart', 'Change status': 'baStatus', 'Update metadata': 'baMetadata',
  'Edit tags': 'baTags', 'Rating': 'baRating', 'Share': 'baShare',
  'Delete category': 'baDelete', 'Move category': 'baMove',
  'Change category status': 'baStatus', 'Share category': 'baShare',
  'Rename category': 'baRename', 'Edit category': 'baMetadata',
};
// Buttons on the category bar (index.html #catBulkBar); 'Download category' and 'Download Category as' have no dialog.
const CATEGORY_ACTIONS = ['Delete category', 'Move category', 'Change category status', 'Share category', 'Rename category', 'Edit category', 'Download category', 'Download Category as'];
// .single-only buttons: disabled while more than one item is selected.
const SINGLE_ONLY = ['Rename category', 'Edit category', 'Edit image', 'Regenerate thumbnail'];

export function bulkDialogFor(action) {
  const id = BULK_ACTIONS[action];
  if (!id) return null;
  return { id, kind: CATEGORY_ACTIONS.indexOf(action) >= 0 ? 'category' : 'asset', singleOnly: SINGLE_ONLY.indexOf(action) >= 0 };
}
export const bulkComingSoon = (action) => action + ' — coming soon';
export const isSingleOnly = (action) => SINGLE_ONLY.indexOf(action) >= 0;

/* ── small shared parts ── */
const Caption = ({ children }) => <Text as="p" variant="secondary">{children}</Text>;
const match = (q) => (s) => !q || s.toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;
const NoData = () => <EmptyState title="No data" />;

/* Cancel + main action; the main action hands the values to onApply and closes, as closeBaModal() did. */
function Footer({ onClose, label, onApply, values }) {
  return (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={() => { if (onApply) onApply(values); onClose(); }}>{label}</Button>
    </>
  );
}

/* Fresh state for each opening: the body remounts after every close (so the open dialog itself never remounts). */
function useOpenKey(open) {
  const [key, setKey] = React.useState(0);
  React.useEffect(() => { if (!open) setKey((k) => k + 1); }, [open]);
  return key;
}

/* ── baDelete ── */
export function BaDeleteDialog({ open, onClose, count = 1, kind = 'asset', onConfirm }) {
  return (
    <ConfirmDialog open={open} destructive confirmLabel="Delete" onCancel={onClose}
      onConfirm={() => { if (onConfirm) onConfirm(); onClose(); }}
      title={'Delete ' + things(count, kind) + '?'}
      message="This action will move the selected items to the trash. You can restore them within 30 days.">
      <Notice tone="warning">Deleted assets will be removed from all collections and shared links. Collaborators will lose access immediately.</Notice>
    </ConfirmDialog>
  );
}

/* ── baCollection: pick any number of collections (toggleClass 'selected') ── */
export function BaCollectionDialog({ open, onClose, count = 1, kind = 'asset', onApply, onCreateCollection }) {
  return <CollectionInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} onCreateCollection={onCreateCollection} />;
}
function CollectionInner({ open, onClose, count, kind, onApply, onCreateCollection }) {
  const [q, setQ] = React.useState('');
  const [picked, setPicked] = React.useState([]);
  const shown = COLLECTIONS.filter(match(q));
  const toggle = (c) => setPicked(picked.indexOf(c) >= 0 ? picked.filter((p) => p !== c) : picked.concat(c));
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="briefcase-plus" title="Add to Collection"
      description={'Add ' + things(count, kind, 'selected ') + ' to a collection'}
      footer={<Footer onClose={onClose} label="Add to Collection" onApply={onApply} values={{ collections: picked }} />}>
      <Stack>
        <Field label="Search or create collection">
          <Input name="searchOrCreateCollection" placeholder="Type to search collections..." value={q} onChange={(e) => setQ(e.target.value)} />
        </Field>
        <div role="group" aria-label="Collections" className="plx-stack plx-stack--gap-xs plx-layout--max-sm">
          {shown.length ? shown.map((c) => <Checkbox key={c} label={c} checked={picked.indexOf(c) >= 0} onChange={() => toggle(c)} />) : <NoData />}
        </div>
        <div><Button size="sm" icon="plus" onClick={() => { if (onCreateCollection) onCreateCollection(); }}>Create new collection</Button></div>
      </Stack>
    </Dialog>
  );
}

/* ── category pickers (selectOnly 'selected') shared by baMove and baChangeCategory ── */
function CategoryPicker({ label, placeholder, name, list, value, onChange }) {
  const [q, setQ] = React.useState('');
  const nodes = list.filter(match(q)).map((c) => ({ id: c, label: c, icon: 'folder' }));
  return (
    <>
      <Field label={label}><Input name={name} placeholder={placeholder} value={q} onChange={(e) => setQ(e.target.value)} /></Field>
      <div className="plx-layout--max-sm">{nodes.length ? <Tree label="Categories" nodes={nodes} selected={value} onSelect={onChange} /> : <NoData />}</div>
    </>
  );
}

/* ── baMove ── */
export function BaMoveDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <MoveInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function MoveInner({ open, onClose, count, kind, onApply }) {
  const [dest, setDest] = React.useState(null);
  const [removeCurrent, setRemoveCurrent] = React.useState(false);
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="move" title="Move assets" description={'Select destination category for ' + things(count, kind)}
      footer={<Footer onClose={onClose} label="Move" onApply={onApply} values={{ category: dest, removeFromCurrentCategory: removeCurrent }} />}>
      <Stack>
        <CategoryPicker label="Search categories" placeholder="Type to search..." name="searchCategories" list={MOVE_CATEGORIES} value={dest} onChange={setDest} />
        <Checkbox name="removeFromCurrentCategory" label="Remove from current category" checked={removeCurrent} onChange={(e) => setRemoveCurrent(e.target.checked)} />
      </Stack>
    </Dialog>
  );
}

/* ── baChangeCategory ── */
export function BaChangeCategoryDialog({ open, onClose, count = 1, kind = 'asset', currentCategory = CURRENT_CATEGORY, onApply }) {
  return <ChangeCategoryInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} currentCategory={currentCategory} onApply={onApply} />;
}
function ChangeCategoryInner({ open, onClose, count, kind, currentCategory, onApply }) {
  const [dest, setDest] = React.useState(null);
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="folder" title="Change category" description={'Reassign ' + things(count, kind) + ' to a different category'}
      footer={<Footer onClose={onClose} label="Change category" onApply={onApply} values={{ category: dest }} />}>
      <Stack>
        <div className="plx-stack plx-stack--gap-xs">
          <Caption>Current category</Caption>
          <TagList><Tag>{currentCategory}</Tag></TagList>
        </div>
        <CategoryPicker label="New category" placeholder="Type to search categories..." name="newCategory" list={CHANGE_CATEGORIES} value={dest} onChange={setDest} />
      </Stack>
    </Dialog>
  );
}

/* ── baCart ── */
export function BaCartDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <CartInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function CartInner({ open, onClose, count, kind, onApply }) {
  const [format, setFormat] = React.useState(CART_FORMATS[0]);
  const [fileType, setFileType] = React.useState(CART_FILE_TYPES[0]);
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="plus" title="Add to Cart" description={'Add ' + things(count, kind) + ' to your download cart'}
      footer={<Footer onClose={onClose} label="Add to Cart" onApply={onApply} values={{ format, fileType }} />}>
      <Stack>
        <RadioGroup label="Download format" name="cartFmt" value={format} onChange={setFormat} options={CART_FORMATS.map((v) => ({ value: v, label: v }))} />
        <Field label="File type">
          <Select name="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>{CART_FILE_TYPES.map((v) => <option key={v}>{v}</option>)}</Select>
        </Field>
        <Caption>{'Items in your cart: ' + CART_ITEMS + ' • Adding ' + count + ' more'}</Caption>
      </Stack>
    </Dialog>
  );
}

/* ── baStatus ── */
export function BaStatusDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <StatusInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function StatusInner({ open, onClose, count, kind, onApply }) {
  const [status, setStatus] = React.useState('Pending review');
  const [note, setNote] = React.useState('');
  const options = STATUSES.map((s) => ({ value: s.value, label: <span className="plx-inline plx-inline--gap-sm plx-layout--align-center"><StatusDot tone={s.tone} />{s.value}</span> }));
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="circle-check" title="Change status" description={'Set edit status for ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Apply status" onApply={onApply} values={{ status, note }} />}>
      <Stack>
        <RadioGroup label="New status" name="bulkStatus" value={status} onChange={setStatus} options={options} />
        <Field label="Note (optional)">
          <Textarea name="noteOptional" placeholder="Add a reason for the status change..." value={note} onChange={(e) => setNote(e.target.value)} />
        </Field>
      </Stack>
    </Dialog>
  );
}

/* ── baMetadata: type filter (filterBaMeta) and collapsible groups (toggleMetaGroup); only General starts open ── */
function MetaControl({ field, value, onChange }) {
  const [key, label, kind, extra, readOnly] = field;
  if (kind === 'rating') return <Rating label={label} value={value || 0} onChange={onChange} />;
  if (kind === 'select') {
    return <Select name={key} value={value || ''} onChange={(e) => onChange(e.target.value)}><option value="">{KEEP}</option>{extra.map((o) => <option key={o}>{o}</option>)}</Select>;
  }
  const common = { name: key, value: value || '', placeholder: extra || undefined, readOnly: readOnly || undefined, onChange: (e) => onChange(e.target.value) };
  if (kind === 'textarea') return <Textarea rows={2} {...common} />;
  return <Input type={kind} {...common} />;
}
export function BaMetadataDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <MetadataInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function MetadataInner({ open, onClose, count, kind, onApply }) {
  const [type, setType] = React.useState('all');
  const [openGroups, setOpenGroups] = React.useState(['General']);
  const [values, setValues] = React.useState({});
  const [overwrite, setOverwrite] = React.useState(false);
  const [appendTags, setAppendTags] = React.useState(false);
  const toggle = (t) => setOpenGroups(openGroups.indexOf(t) >= 0 ? openGroups.filter((g) => g !== t) : openGroups.concat(t));
  const shows = (g) => type === 'all' || g.types.indexOf('all') >= 0 || g.types.indexOf(type) >= 0;
  return (
    <Dialog open={open} onClose={onClose} size="lg" icon="fields" title="Update metadata" description={'Batch-edit metadata for ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Save metadata" onApply={onApply} values={{ fields: values, overwrite, appendTags }} />}>
      <Stack>
        <SegmentedControl label="Asset type" size="sm" options={META_TYPES} value={type} onChange={setType} />
        <div className="plx-stack plx-stack--gap-sm plx-layout--max-lg">
          {META_GROUPS.filter(shows).map((g) => {
            const isOpen = openGroups.indexOf(g.title) >= 0;
            return (
              <section key={g.title} aria-label={g.title} className="plx-stack plx-stack--gap-sm">
                <div><Button variant="ghost" size="sm" icon={isOpen ? 'chevron-down' : 'triangle-right'} expanded={isOpen} onClick={() => toggle(g.title)}>{g.title}</Button></div>
                {isOpen ? g.fields.map((f) => (
                  <Field key={f[0]} label={f[1]} layout="inline">
                    <MetaControl field={f} value={values[f[0]]} onChange={(v) => setValues({ ...values, [f[0]]: v })} />
                  </Field>
                )) : null}
              </section>
            );
          })}
        </div>
        <div>
          <Checkbox name="overwriteExistingValues" label="Overwrite existing values (blank fields are skipped)" checked={overwrite} onChange={(e) => setOverwrite(e.target.checked)} />
          <Checkbox name="appendTagsInsteadOfReplacing" label="Append tags instead of replacing" checked={appendTags} onChange={(e) => setAppendTags(e.target.checked)} />
        </div>
      </Stack>
    </Dialog>
  );
}

/* ── baTags: × removes a current tag; a suggested tag is added on the first click and removed on the second
   (toggleSuggestedChip) ── */
export function BaTagsDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <TagsInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function TagsInner({ open, onClose, count, kind, onApply }) {
  const [add, setAdd] = React.useState('');
  const [current, setCurrent] = React.useState(CURRENT_TAGS);
  const [suggested, setSuggested] = React.useState(SUGGESTED_TAGS.map((t) => ({ t, on: false })));
  const clickSuggested = (s) => setSuggested(s.on ? suggested.filter((x) => x !== s) : suggested.map((x) => (x === s ? { t: x.t, on: true } : x)));
  const values = { add: add.split(',').map((t) => t.trim()).filter(Boolean), current, added: suggested.filter((s) => s.on).map((s) => s.t) };
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="tags" title="Edit tags" description={'Add or remove tags for ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Apply tags" onApply={onApply} values={values} />}>
      <Stack>
        <Field label="Add tags"><Input name="addTags" placeholder="Type tags separated by commas..." value={add} onChange={(e) => setAdd(e.target.value)} /></Field>
        <div className="plx-stack plx-stack--gap-xs">
          <Caption>Current Tags (click × to remove)</Caption>
          {current.length ? (
            <TagList label="Current tags">{current.map((t) => <Tag key={t} onRemove={() => setCurrent(current.filter((x) => x !== t))}>{t}</Tag>)}</TagList>
          ) : <NoData />}
        </div>
        <div className="plx-stack plx-stack--gap-xs">
          <Caption>Suggested Tags (click to add)</Caption>
          {suggested.length ? (
            <TagList label="Suggested tags">
              {suggested.map((s) => (
                <Chip key={s.t} selected={s.on} aria-label={s.on ? 'Remove tag ' + s.t : undefined} onClick={() => clickSuggested(s)}>
                  {s.on ? <>{s.t} <span aria-hidden="true">×</span></> : s.t}
                </Chip>
              ))}
            </TagList>
          ) : <NoData />}
        </div>
      </Stack>
    </Dialog>
  );
}

/* ── baRating (setBaStars; Clear sets 0) ── */
export function BaRatingDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <RatingInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function RatingInner({ open, onClose, count, kind, onApply }) {
  const [stars, setStars] = React.useState(0);
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="sparkle" title="Set rating" description={'Rate ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Apply rating" onApply={onApply} values={{ rating: stars }} />}>
      <div className="plx-inline plx-inline--gap-sm plx-layout--align-center">
        <Rating label="Rating" value={stars} onChange={setStars} />
        <Button variant="ghost" size="sm" onClick={() => setStars(0)}>Clear</Button>
      </div>
    </Dialog>
  );
}

/* ── baShare ── */
export function BaShareDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <ShareInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function ShareInner({ open, onClose, count, kind, onApply }) {
  const toast = useToast();
  const [person, setPerson] = React.useState('');
  const { account } = useSession();
  const [people, setPeople] = React.useState(() => [{ name: account.name, permission: 'Can edit' }].concat(SHARED_WITH));
  const [expiration, setExpiration] = React.useState('30 days');
  const [opts, setOpts] = React.useState({ allowDownloads: true, requirePassword: false, notifyRecipientsByEmail: false });
  const check = (k, label) => <Checkbox name={k} label={label} checked={opts[k]} onChange={(e) => setOpts({ ...opts, [k]: e.target.checked })} />;
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="share" title="Share" description={'Share ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Share" onApply={onApply} values={{ link: SHARE_LINK, invite: person, people, expiration, ...opts }} />}>
      <Stack>
        <Field label="Share link">
          <Input name="shareLink" readOnly data value={SHARE_LINK} />
        </Field>
        <div><Button size="sm" onClick={() => toast.show('Link copied', { tone: 'success' })}>Copy</Button></div>
        <Field label="Share with people">
          <Input name="shareWithPeople" placeholder="Enter name or email..." value={person} onChange={(e) => setPerson(e.target.value)} />
        </Field>
        {people.length ? (
          <div className="plx-stack plx-stack--gap-sm">
            {people.map((p, i) => (
              <div key={p.name} className="plx-inline plx-inline--gap-sm plx-layout--align-center">
                <Avatar name={p.name} />
                <span className="plx-grow">{p.name}</span>
                <Select aria-label={'Permission for ' + p.name} value={p.permission}
                  onChange={(e) => setPeople(people.map((x, j) => (j === i ? { ...x, permission: e.target.value } : x)))}>
                  {PERMISSIONS.map((o) => <option key={o}>{o}</option>)}
                </Select>
              </div>
            ))}
          </div>
        ) : <NoData />}
        <Field label="Link expiration">
          <Select name="linkExpiration" value={expiration} onChange={(e) => setExpiration(e.target.value)}>{EXPIRATIONS.map((o) => <option key={o}>{o}</option>)}</Select>
        </Field>
        <div>
          {check('allowDownloads', 'Allow downloads')}
          {check('requirePassword', 'Require password')}
          {check('notifyRecipientsByEmail', 'Notify recipients by email')}
        </div>
      </Stack>
    </Dialog>
  );
}

/* ── baDownload ── */
export function BaDownloadDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <DownloadInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function DownloadInner({ open, onClose, count, kind, onApply }) {
  const [format, setFormat] = React.useState(DOWNLOAD_FORMATS[0]);
  const [fileType, setFileType] = React.useState(DOWNLOAD_FILE_TYPES[0]);
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="download-tray" title="Download" description={'Download ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Download" onApply={onApply} values={{ format, fileType }} />}>
      <Stack>
        <RadioGroup label="Format" name="dlFmt" value={format} onChange={setFormat} options={DOWNLOAD_FORMATS.map((v) => ({ value: v, label: v }))} />
        <Field label="File type">
          <Select name="fileType" value={fileType} onChange={(e) => setFileType(e.target.value)}>{DOWNLOAD_FILE_TYPES.map((v) => <option key={v}>{v}</option>)}</Select>
        </Field>
        <Caption>Estimated download: <Text variant="data">{DOWNLOAD_ESTIMATE}</Text> (ZIP archive)</Caption>
      </Stack>
    </Dialog>
  );
}

/* ── baDownloadAs ── */
export function BaDownloadAsDialog({ open, onClose, count = 1, kind = 'asset', onApply }) {
  return <DownloadAsInner key={useOpenKey(open)} open={open} onClose={onClose} count={count} kind={kind} onApply={onApply} />;
}
function DownloadAsInner({ open, onClose, count, kind, onApply }) {
  const [v, setV] = React.useState({ convertTo: CONVERT_TO[0], width: '', height: '', unit: 'px', maintainAspectRatio: true, stripMetadata: false });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="download-alt" title="Download as" description={'Convert and download ' + things(count, kind, 'selected ')}
      footer={<Footer onClose={onClose} label="Download" onApply={onApply} values={v} />}>
      <Stack>
        <Field label="Convert to">
          <Select name="convertTo" value={v.convertTo} onChange={set('convertTo')}>{CONVERT_TO.map((o) => <option key={o}>{o}</option>)}</Select>
        </Field>
        <Fieldset legend="Resize">
          <div className="plx-inline plx-inline--gap-sm plx-layout--align-center">
            <Input name="width" aria-label="Width" placeholder="Width" value={v.width} onChange={set('width')} />
            <span aria-hidden="true">×</span>
            <Input name="height" aria-label="Height" placeholder="Height" value={v.height} onChange={set('height')} />
            <div className="plx-layout--width-sm">
              <Select name="unit" aria-label="Unit" value={v.unit} onChange={set('unit')}>{UNITS.map((o) => <option key={o}>{o}</option>)}</Select>
            </div>
          </div>
        </Fieldset>
        <div>
          <Checkbox name="maintainAspectRatio" label="Maintain aspect ratio" checked={v.maintainAspectRatio} onChange={set('maintainAspectRatio')} />
          <Checkbox name="stripMetadataExifIptc" label="Strip metadata (EXIF/IPTC)" checked={v.stripMetadata} onChange={set('stripMetadata')} />
        </div>
      </Stack>
    </Dialog>
  );
}

/* ── baRename (category bar only, one category) ── */
export function BaRenameDialog({ open, onClose, itemName = CURRENT_CATEGORY, onApply }) {
  return <RenameInner key={useOpenKey(open)} open={open} onClose={onClose} itemName={itemName} onApply={onApply} />;
}
function RenameInner({ open, onClose, itemName, onApply }) {
  const [name, setName] = React.useState('');
  return (
    <Dialog open={open} onClose={onClose} size="sm" icon="rename" title="Rename category" description="Rename selected category"
      footer={<Footer onClose={onClose} label="Rename" onApply={onApply} values={{ currentName: itemName, newName: name }} />}>
      <Stack>
        <Field label="Current name"><Input name="currentName" readOnly value={itemName} /></Field>
        <Field label="New name"><Input name="newName" placeholder="Enter new name..." value={name} onChange={(e) => setName(e.target.value)} /></Field>
      </Stack>
    </Dialog>
  );
}

export const DIALOGS = {
  baDelete: BaDeleteDialog,
  baCollection: BaCollectionDialog,
  baMove: BaMoveDialog,
  baChangeCategory: BaChangeCategoryDialog,
  baCart: BaCartDialog,
  baStatus: BaStatusDialog,
  baMetadata: BaMetadataDialog,
  baTags: BaTagsDialog,
  baRating: BaRatingDialog,
  baShare: BaShareDialog,
  baDownload: BaDownloadDialog,
  baDownloadAs: BaDownloadAsDialog,
  baRename: BaRenameDialog,
};
