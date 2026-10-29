/* Plenix asset app · Upload dialog (app/dialogs/UploadDialog.jsx): the upload flow, ported from the uploadModal template
   in partials/dialogs.html and its plenix.js behavior (batch 111).
   <UploadDialog open onClose/>: no page context needed. Three panes:
   - Files: the storage folder tree (select, expand, add a subfolder to the selected folder), then the upload area: drag and
     drop of files or whole folders, Browse Files and Browse Folder (real file inputs), import from URL. Chosen files go
     into a queue (name, folder path, size, type) where they can be removed.
   - Categories (required): search, pick one or more, "use folder names as categories", and a New Category form (name,
     description, tags, and a color from the data colors (ColorPicker).
   - Visible Metadata: search, a type filter (All, Image, Video, Audio, 3D, Doc) and collapsible field groups; groups start
     closed and a group shows its fields only while open and matching the search, as in plenix.js.
   There is no back end: Upload confirms with the toast the legacy drop handler used ("N file(s) ready to upload") and
   closes, as the legacy Upload button did. Every state resets when the dialog closes. While files are queued, Cancel,
   Close, Escape and leaving the page ask first (useUnsavedGuard). */
import React from 'react';
import {
  Dialog, Button, Checkbox, RadioGroup, Input, Textarea, SearchField, Tree, Icon, Count, EmptyState, useToast, Stack, Inline, Text, Columns, DropZone, ColorPicker, CATEGORY_COLORS, useUnsavedGuard } from 'plenix-platform';

// DATA: the storage folders come from the back end; sample tree until then.
const FOLDERS = [
  { id: 'all', label: 'All', children: [
    { id: 'digital-assets', label: 'Digital Assets', children: [
      { id: 'borders', label: 'Borders', children: ['Arch', 'Banner', 'Circular', 'Divider', 'Linear', 'Page'].map((l) => ({ id: 'borders-' + l.toLowerCase(), label: l })) },
      { id: 'branding', label: 'Branding', children: ['Churches', 'CYC', 'Diakonia'].map((l) => ({ id: 'branding-' + l.toLowerCase(), label: l })) },
      { id: 'certificates', label: 'Certificates' }, { id: 'clergy', label: 'Clergy' }, { id: 'crosses', label: 'Crosses' }, { id: 'fonts', label: 'Fonts' },
    ] },
    { id: 'documents', label: 'Documents', children: [{ id: 'manuals', label: 'Manuals' }, { id: 'templates', label: 'Templates' }] },
    { id: 'facial-profiles', label: 'Facial Profiles' },
    { id: 'users', label: 'Users' },
  ] },
];
const DEFAULT_FOLDER = 'digital-assets';

// DATA: the categories to pick from come from the back end.
const CATEGORIES = ['Banner icon', 'Bookshelf', 'Borders - Arch', 'Borders - Banner', 'Borders - Circular', 'Borders - Divider', 'Borders - Linear',
  'Borders - Page', 'Branding - Churches', 'Branding - CYC', 'Branding - Diakonia', 'Certificates', 'Clergy', 'Covers', 'Cross - Traditional', 'Crosses',
  'Dome', 'Embroideries', 'Fonts', 'Galloons', 'Korban Stamp', 'Ornamental Elements', 'Presentation Folders'];


const TYPE_FILTERS = [
  { value: 'all', label: 'All' }, { value: 'image', label: 'Image' }, { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' }, { value: '3d', label: '3D' }, { value: 'document', label: 'Doc' },
];

// DATA: metadata field groups come from the back end. Each field is "Label" or "Label|source tag"; a leading "*" marks a
// field that is checked by default.
const META_GROUPS = [
  ['General', 'all', ['*Name', '*Description', '*Tags', 'Keywords', '*Rating', 'Edit status', 'Language', 'Version', 'Summary']],
  ['Categorization', 'all', ['*Category', 'Category ID', 'Parent category', 'Category path', 'Display order', 'Asset type', 'Classification']],
  ['Ownership & Rights', 'all', ['Owner', 'Creator|EXIF: Artist', 'Copyright|EXIF: Copyright', 'Copyright Notice|IPTC: CopyrightNotice',
    'Rights Usage Terms|XMP: UsageTerms', 'License', 'Permissions', 'Author', 'Created by', 'Modified by']],
  ['Dates', 'all', ['Date Created|EXIF: DateTimeOriginal', 'Date Modified|EXIF: ModifyDate', 'Date Digitized|EXIF: CreateDate',
    'GPS Date/Time|EXIF: GPSDateStamp', 'Import date', 'Publish date', 'Expiration date']],
  ['File properties', 'all', ['File name', 'File type', 'MIME type', 'File size', 'Source path', 'Archive source path', 'File URL', 'Data type',
    'Thumbnail', 'Checksum / MD5']],
  ['Dimensions & Resolution', 'image,video', ['Width|EXIF: ImageWidth', 'Height|EXIF: ImageHeight', 'DPI / Resolution|EXIF: XResolution',
    'Resolution Unit|EXIF: ResolutionUnit', 'Orientation|EXIF: Orientation', 'Pixel aspect ratio']],
  ['Camera & Lens', 'image,video', ['Camera Make|EXIF: Make', 'Camera Model|EXIF: Model', 'Camera Serial #|EXIF: SerialNumber',
    'Lens Type|EXIF: LensModel', 'Lens Make|EXIF: LensMake', 'Lens Serial #|EXIF: LensSerialNumber', 'Firmware|EXIF: Software']],
  ['Exposure & Shooting', 'image', ['Focal Length|EXIF: FocalLength', 'Focal Length (35mm)|EXIF: FocalLengthIn35mmFormat', 'Aperture|EXIF: FNumber',
    'Max Aperture|EXIF: MaxApertureValue', 'Shutter Speed|EXIF: ExposureTime', 'ISO|EXIF: ISO', 'Exposure Program|EXIF: ExposureProgram',
    'Exposure Mode|EXIF: ExposureMode', 'Exposure Comp.|EXIF: ExposureCompensation', 'Metering Mode|EXIF: MeteringMode', 'Flash|EXIF: Flash',
    'Flash Comp.|EXIF: FlashCompensation', 'White Balance|EXIF: WhiteBalance', 'Scene Type|EXIF: SceneCaptureType', 'Light Source|EXIF: LightSource',
    'Subject Distance|EXIF: SubjectDistance', 'Focus Mode|EXIF: FocusMode', 'Digital Zoom|EXIF: DigitalZoomRatio', 'Sharpness|EXIF: Sharpness',
    'Contrast|EXIF: Contrast', 'Saturation|EXIF: Saturation', 'Brightness|EXIF: BrightnessValue']],
  ['Color & Image', 'image', ['Color Space|EXIF: ColorSpace', 'Color Profile|EXIF: ICCProfileName', 'Color type', 'Bit Depth|EXIF: BitsPerSample',
    'Compression|EXIF: Compression', 'Photometric Interp.|EXIF: PhotometricInterpretation', 'Image Unique ID|EXIF: ImageUniqueID']],
  ['Location (GPS)', 'image,video', ['GPS Latitude|EXIF: GPSLatitude', 'GPS Longitude|EXIF: GPSLongitude', 'GPS Altitude|EXIF: GPSAltitude',
    'GPS Speed|EXIF: GPSSpeed', 'GPS Direction|EXIF: GPSImgDirection', 'GPS Area Info|EXIF: GPSAreaInformation']],
  ['IPTC / XMP', 'image', ['Headline|IPTC: Headline', 'Caption|IPTC: Caption-Abstract', 'By-line|IPTC: By-line', 'By-line Title|IPTC: By-lineTitle',
    'Credit|IPTC: Credit', 'Source|IPTC: Source', 'Contact Info|IPTC: Contact', 'Object Name|IPTC: ObjectName', 'Category Code|IPTC: Category',
    'Supplemental Cat.|IPTC: SupplementalCategories', 'Urgency|IPTC: Urgency', 'Instructions|IPTC: SpecialInstructions', 'Subject Code|XMP: Subject',
    'Scene Code|IPTC: Scene', 'Intellectual Genre|IPTC: IntellectualGenre']],
  ['IPTC location', 'image', ['Sub-location|IPTC: Sub-location', 'City|IPTC: City', 'State / Province|IPTC: Province-State',
    'Country|IPTC: Country-PrimaryLocationName', 'Country Code|IPTC: Country-PrimaryLocationCode']],
  ['Video — Stream', 'video', ['Duration|FFmpeg: Duration', 'Frame Rate|FFmpeg: r_frame_rate', 'Video Codec|FFmpeg: codec_name',
    'Codec Profile|FFmpeg: profile', 'Video Bitrate|FFmpeg: bit_rate', 'Video resolution', 'Aspect Ratio|FFmpeg: display_aspect_ratio',
    'Pixel Format|FFmpeg: pix_fmt', 'Color Primaries|FFmpeg: color_primaries', 'Color Transfer|FFmpeg: color_transfer', 'Rotation|FFmpeg: rotate',
    'Audio Codec|FFmpeg: audio codec_name', 'Audio Bitrate|FFmpeg: audio bit_rate', 'Sample Rate|FFmpeg: sample_rate',
    'Audio Channels|FFmpeg: channels', 'Audio Language|FFmpeg: language', 'Subtitle Tracks|FFmpeg: subtitle streams']],
  ['Video — Container Tags', 'video', ['Title|MP4: moov/udta ©nam', 'Artist|MP4: ©ART', 'Album|MP4: ©alb', 'Comment|MP4: ©cmt',
    'Genre|MP4: ©gen / gnre', 'Year|MP4: ©day', 'Encoder|MP4: ©too', 'MKV Title|Matroska: TagName', 'MKV Date|Matroska: DateUTC',
    'MKV Muxing App|Matroska: MuxingApp', 'MKV Writing App|Matroska: WritingApp', 'AVI Title|RIFF INFO: INAM', 'AVI Artist|RIFF INFO: IART',
    'AVI Comment|RIFF INFO: ICMT', 'AVI Software|RIFF INFO: ISFT', 'WMV Title|ASF: Title', 'WMV Author|ASF: Author',
    'WMV Description|ASF: Description', 'WMV Rating|ASF: Rating']],
  ['Audio — ID3 Tags', 'audio', ['Title|ID3v2: TIT2', 'Subtitle|ID3v2: TIT3', 'Artist|ID3v2: TPE1', 'Album Artist|ID3v2: TPE2', 'Album|ID3v2: TALB',
    'Year|ID3v2: TDRC', 'Track Number|ID3v2: TRCK', 'Disc Number|ID3v2: TPOS', 'Genre|ID3v2: TCON', 'Composer|ID3v2: TCOM',
    'Conductor|ID3v2: TPE3', 'Lyricist|ID3v2: TEXT', 'Publisher|ID3v2: TPUB', 'Encoded By|ID3v2: TENC', 'BPM|ID3v2: TBPM',
    'Initial Key|ID3v2: TKEY', 'ISRC|ID3v2: TSRC', 'Comment|ID3v2: COMM', 'Lyrics|ID3v2: USLT', 'Album Art|ID3v2: APIC',
    'Copyright|ID3v2: TCOP', 'Grouping|ID3v2: TIT1', 'Compilation|ID3v2: TCMP', 'Mood|ID3v2: TMOO', 'Media Type|ID3v2: TMED',
    'ReplayGain|ID3v2: TXXX']],
  ['Audio — Stream', 'audio', ['Duration|FFmpeg: Duration', 'Audio Codec|FFmpeg: codec_name', 'Bitrate|FFmpeg: bit_rate', 'Bitrate Mode|CBR / VBR',
    'Sample Rate|FFmpeg: sample_rate', 'Channels|FFmpeg: channels', 'Bit Depth|FFmpeg: bits_per_sample']],
  ['Document', 'document', ['Page count', 'Word count', 'Character count', 'Title|PDF: Title', 'Subject|PDF: Subject', 'PDF Producer|PDF: Producer',
    'PDF Creator Tool|PDF: Creator', 'PDF Version|PDF: PDFVersion', 'Encrypted|PDF: Encryption']],
  ['3D / Model', '3d', ['Geometry Type|mesh, NURBS, solid', 'Vertex count', 'Face / Polygon Count', 'Edge count', 'Object count', 'Material count',
    'Texture count', 'UV maps', 'Bounding box', 'Scene Units|mm, cm, m, in', 'Up Axis|Y-up, Z-up', 'Animation|has animations',
    'Rigged|has armature', 'File Format|FBX, OBJ, GLTF, USD...', 'Render Engine|Cycles, Eevee, V-Ray...', 'Source Application|Blender, Maya, 3ds Max...']],
  ['Distribution', 'all', ['Channels', 'Auto assigned media', 'Published locations', 'Conversion preset']],
  ['Custom', 'all', ['Custom Field 1', 'Custom Field 2', 'Custom Field 3']],
].map(([name, types, fields], g) => ({
  name, types: types.split(','),
  fields: fields.map((f, i) => { const on = f[0] === '*'; const [label, tag] = (on ? f.slice(1) : f).split('|'); return { key: g + ':' + i, label, tag, on }; }),
}));
const META_DEFAULTS = ['default'].concat(...META_GROUPS.map((g) => g.fields.filter((f) => f.on).map((f) => f.key)));

/* ── styles (tokens only) ── */

/* ── helpers ── */
function formatSize(bytes) {
  if (bytes === null || bytes === undefined) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let n = bytes, u = 0;
  while (n >= 1024 && u < units.length - 1) { n /= 1024; u += 1; }
  return (u === 0 ? n : n.toFixed(1)) + ' ' + units[u];
}
const EXT_ICONS = { jpg: 'file-jpg', jpeg: 'file-jpg', png: 'file-png', pdf: 'file-pdf', svg: 'file-svg', zip: 'file-zip', psd: 'file-psd', ai: 'file-ai' };
function fileIcon(item) {
  const ext = (item.name.split('.').pop() || '').toLowerCase();
  if (EXT_ICONS[ext]) return EXT_ICONS[ext];
  return /^image\//.test(item.type) ? 'image-b' : 'document';
}

/* A dropped folder arrives as a directory entry: walk it so every file inside joins the queue with its folder path. */
function walkEntry(entry, prefix, out) {
  return new Promise((resolve) => {
    if (entry.isFile) entry.file((file) => { out.push({ file, path: prefix }); resolve(); }, () => resolve());
    else if (entry.isDirectory) {
      const reader = entry.createReader(), all = [];
      const read = () => reader.readEntries((batch) => {
        if (batch.length) { all.push(...batch); read(); }
        else Promise.all(all.map((e) => walkEntry(e, prefix + entry.name + '/', out))).then(resolve);
      }, () => resolve());
      read();
    } else resolve();
  });
}
function droppedFiles(dataTransfer) {
  const entries = Array.from(dataTransfer.items || []).map((it) => (it.kind === 'file' && it.webkitGetAsEntry ? it.webkitGetAsEntry() : null));
  if (!entries.length || entries.some((e) => !e)) return Promise.resolve(Array.from(dataTransfer.files || []).map((file) => ({ file, path: '' })));
  const out = [];
  return Promise.all(entries.map((e) => walkEntry(e, '', out))).then(() => out);
}

function addChild(nodes, parentId, child) {
  return nodes.map((n) => (n.id === parentId ? { ...n, children: (n.children || []).concat(child) }
    : (n.children ? { ...n, children: addChild(n.children, parentId, child) } : n)));
}

/* ── pane 1: folders and the upload area ── */
function FilesPane({ queue, addFiles, removeFile, clearQueue }) {
  const toast = useToast();
  const [tree, setTree] = React.useState(FOLDERS);
  const [folder, setFolder] = React.useState(DEFAULT_FOLDER);
  const [expanded, setExpanded] = React.useState(['all']);
  const [naming, setNaming] = React.useState(null);
  const [over, setOver] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const filesInput = React.useRef(null), folderInput = React.useRef(null), nameInput = React.useRef(null), depth = React.useRef(0), nextFolder = React.useRef(1);
  // Escape in the folder-name box cancels the name only; the dialog listens for Escape on the document (capture), so this
  // listens on the window first.
  React.useEffect(() => {
    if (naming === null) return undefined;
    const onKey = (e) => { if (e.key === 'Escape' && e.target === nameInput.current) { e.stopPropagation(); e.preventDefault(); setNaming(null); } };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [naming === null]);

  const commitFolder = () => {
    const name = (naming || '').trim();
    if (name) {
      setTree(addChild(tree, folder, { id: 'new-' + nextFolder.current++, label: name }));
      if (!expanded.includes(folder)) setExpanded(expanded.concat(folder));
    }
    setNaming(null);
  };
  const fromInput = (e) => {
    addFiles(Array.from(e.target.files || []).map((file) => ({ file, path: (file.webkitRelativePath || '').split('/').slice(0, -1).map((p) => p + '/').join('') })));
    e.target.value = '';
  };
  const onDrop = (e) => {
    e.preventDefault();
    depth.current = 0; setOver(false);
    droppedFiles(e.dataTransfer).then(addFiles);
  };
  const importUrl = () => {
    const v = url.trim();
    if (v) { addFiles([{ url: v }]); setUrl(''); }
    toast.show('Import', { tone: 'success' });
  };

  return (
    <Stack as="section" gap="sm" aria-labelledby="upl-files">
      <Text as="h3" id="upl-files" variant="heading">Files</Text>
      <Text as="p" variant="secondary">Physical storage on disk. Each file is saved to exactly one folder.</Text>
      <Stack gap="none" maxHeight="sm">
        {tree.length ? <Tree label="Folders" nodes={tree.map(function deco(n) { return { ...n, icon: 'folder', children: n.children ? n.children.map(deco) : undefined }; })}
          selected={folder} onSelect={setFolder} expanded={expanded} onExpandedChange={setExpanded} /> : <EmptyState>No data</EmptyState>}
      </Stack>
      {naming === null
        ? <div><Button variant="ghost" size="xs" icon="plus" onClick={() => setNaming('')}>New folder</Button></div>
        : <Input ref={nameInput} aria-label="Folder name" placeholder="Folder name..." autoFocus value={naming} onChange={(e) => setNaming(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); commitFolder(); } }}
            onBlur={() => { if (!naming.trim()) setNaming(null); }} />}

      <Text as="h3" variant="heading" className="plx-u-mt-stack-md">Upload</Text>
      <DropZone active={over}
        onDragEnter={(e) => { e.preventDefault(); depth.current += 1; setOver(true); }}
        onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; }}
        onDragLeave={() => { depth.current -= 1; if (depth.current <= 0) { depth.current = 0; setOver(false); } }}
        onDrop={onDrop}>
        <Icon name="upload-2" size="lg" />
        <Text as="p" variant="label">Drag &amp; drop files or folders</Text>
        <Text as="p" variant="secondary">or choose an option below</Text>
        <Inline justify="center" className="plx-u-mt-stack-sm">
          <Button size="sm" icon="text-card" onClick={() => filesInput.current.click()}>Browse files</Button>
          <Button size="sm" icon="folder-open" onClick={() => folderInput.current.click()}>Browse folder</Button>
        </Inline>
        <input ref={filesInput} type="file" multiple hidden onChange={fromInput} aria-label="Browse files" />
        <input ref={folderInput} type="file" multiple hidden webkitdirectory="" directory="" onChange={fromInput} aria-label="Browse folder" />
      </DropZone>
      <Inline justify="center" className="plx-u-mt-stack-sm"><Text variant="secondary">or import from URL</Text></Inline>
      <Inline>
        <Input name="upload" aria-label="Import from URL" placeholder="https://example.com/image.png" value={url} onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); importUrl(); } }} />
        <Button size="sm" variant="primary" onClick={importUrl}>Import</Button>
      </Inline>

      {queue.length ? (
        <Stack gap="xs" aria-live="polite">
          <Inline justify="between" className="plx-u-mt-stack-sm">
            <Text variant="label">Queue <Count value={queue.length} label={queue.length + ' file(s) in the queue'} /></Text>
            <Button variant="ghost" size="xs" onClick={clearQueue}>Clear</Button>
          </Inline>
          <Stack as="ul" gap="xs" maxHeight="sm" aria-label="Upload queue">
            {queue.map((q) => (
              <Inline as="li" key={q.id}>
                <Icon name={fileIcon(q)} size="sm" />
                <Stack as="span" gap="none" grow>
                  <Text variant="data" truncate title={q.path + q.name}>{q.path}{q.name}</Text>
                  <Text variant="caption" truncate>{formatSize(q.size)} · {q.type || 'Unknown'}</Text>
                </Stack>
                <Button variant="ghost" size="xs" iconOnly icon="close" label={'Remove ' + q.name} onClick={() => removeFile(q.id)} />
              </Inline>
            ))}
          </Stack>
        </Stack>
      ) : null}
    </Stack>
  );
}

/* ── pane 2: categories ── */
function CategoriesPane() {
  const [useFolders, setUseFolders] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [picked, setPicked] = React.useState([]);
  const [adding, setAdding] = React.useState(false);
  const [cat, setCat] = React.useState({ name: '', description: '', tags: '', color: CATEGORY_COLORS[0] });
  const shown = CATEGORIES.filter((c) => !q.trim() || c.toLowerCase().includes(q.trim().toLowerCase()));
  const toggle = (c, on) => setPicked(on ? picked.concat(c) : picked.filter((p) => p !== c));

  return (
    <Stack as="section" gap="sm" aria-labelledby="upl-cats">
      <Text as="h3" id="upl-cats" variant="heading">Categories <Text variant="danger" aria-hidden="true">*</Text></Text>
      <Text as="p" variant="secondary">Required. Logical grouping — assets can belong to multiple categories (1 to many).</Text>
      <Checkbox name="useFolderNamesAsCategoriesMergeIfExists" checked={useFolders} onChange={(e) => setUseFolders(e.target.checked)}
        title="Use the uploaded folder names as categories (merge if a category already exists)"
        label={<>Use folder names as categories <em>(merge if exists)</em></>} />
      <SearchField label="Search categories" placeholder="Search categories..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
      <Stack gap="xs" maxHeight="sm" role="group" aria-label="Categories">
        {CATEGORIES.length ? shown.map((c) => (
          <Checkbox key={c} checked={picked.includes(c)} onChange={(e) => toggle(c, e.target.checked)} label={<><Icon name="folder" size="sm" /> {c}</>} />
        )) : <EmptyState>No data</EmptyState>}
      </Stack>
      <Inline justify="between">
        <Button variant="ghost" size="xs" icon="plus" onClick={() => setAdding(true)} aria-expanded={adding}>New category</Button>
        {adding ? <Button variant="ghost" size="xs" iconOnly icon="close" label="Cancel new category" title="Cancel new category" onClick={() => setAdding(false)} /> : null}
      </Inline>
      {adding ? (
        <Stack gap="xs">
          <Input name="categoryName" aria-label="Category name" placeholder="Enter category name..." value={cat.name} onChange={(e) => setCat({ ...cat, name: e.target.value })} />
          <Textarea name="description" aria-label="Description" placeholder="Optional description..." value={cat.description} onChange={(e) => setCat({ ...cat, description: e.target.value })} />
          <Input name="tags" aria-label="Tags" placeholder="Tags" value={cat.tags} onChange={(e) => setCat({ ...cat, tags: e.target.value })} />
          <ColorPicker palette="category" label="Category color" value={cat.color} onChange={(h) => setCat({ ...cat, color: h })} />
        </Stack>
      ) : null}
    </Stack>
  );
}

/* ── pane 3: visible metadata ── */
function MetadataPane() {
  const [q, setQ] = React.useState('');
  const [type, setType] = React.useState('all');
  const [open, setOpen] = React.useState([]);
  const [checked, setChecked] = React.useState(META_DEFAULTS);
  const query = q.trim().toLowerCase();
  const isOn = (key) => checked.includes(key);
  const flip = (key, on) => setChecked(on ? checked.concat(key) : checked.filter((k) => k !== key));
  const typeOk = (g) => type === 'all' || g.types.includes('all') || g.types.includes(type);
  const matches = (f) => !query || (f.label + (f.tag ? ' (' + f.tag + ')' : '')).toLowerCase().includes(query);

  return (
    <Stack as="section" gap="sm" aria-labelledby="upl-meta">
      <Text as="h3" id="upl-meta" variant="heading">Visible metadata</Text>
      <Text as="p" variant="secondary">All metadata is always stored. Checked fields are shown by default in this category's view.</Text>
      <SearchField label="Search fields" placeholder="Search fields..." value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} />
      <RadioGroup name="metaTypeFilter" aria-label="Field type" layout="row" value={type} onChange={setType} options={TYPE_FILTERS} />
      <Stack gap="xs" maxHeight="lg">
        {query ? null : <Checkbox name="defaultCurrentView" checked={isOn('default')} onChange={(e) => flip('default', e.target.checked)} label="Default (Current View)" />}
        {META_GROUPS.filter(typeOk).map((g) => {
          const isOpen = open.includes(g.name);
          const fields = isOpen ? g.fields.filter(matches) : [];
          return (
            <Stack key={g.name} gap="xs" role="group" aria-label={g.name}>
              <div>
                <Button variant="ghost" size="xs" icon={isOpen ? 'chevron-down' : 'triangle-right'} aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? open.filter((n) => n !== g.name) : open.concat(g.name))}>{g.name}</Button>
              </div>
              {fields.map((f) => (
                <Checkbox key={f.key} checked={isOn(f.key)} onChange={(e) => flip(f.key, e.target.checked)}
                  label={f.tag ? <>{f.label} <Text variant="caption">({f.tag})</Text></> : f.label} />
              ))}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

/* ── the dialog: its body mounts only while open, so every pane starts fresh each time ── */
function UploadFlow({ onClose }) {
  const toast = useToast();
  const [queue, setQueue] = React.useState([]);
  const nextId = React.useRef(1);
  const addFiles = (items) => {
    if (!items.length) return;
    const added = items.map((it) => (it.url
      ? { id: nextId.current++, name: it.url.split(/[?#]/)[0].split('/').filter(Boolean).pop() || it.url, path: '', size: null, type: 'URL', url: it.url }
      : { id: nextId.current++, name: it.file.name, path: it.path || '', size: it.file.size, type: it.file.type, file: it.file }));
    setQueue((cur) => cur.concat(added));
  };
  // no back end: the upload is simulated with the toast the legacy drop handler showed, then the dialog closes
  const upload = () => {
    if (queue.length) toast.show(queue.length + ' file(s) ready to upload', { tone: 'success' });
    onClose();
  };
  const cancel = useUnsavedGuard(queue.length > 0, 'The files you chose have not been uploaded.')(onClose);
  return (
    <Dialog open onClose={cancel} title="Upload assets" icon="upload" size="xl" flush
      footer={<><Button onClick={cancel}>Cancel</Button><Button variant="primary" onClick={upload}>Upload</Button></>}>
      <Columns count={3} divided>
        <FilesPane queue={queue} addFiles={addFiles} removeFile={(id) => setQueue((cur) => cur.filter((q) => q.id !== id))} clearQueue={() => setQueue([])} />
        <CategoriesPane />
        <MetadataPane />
      </Columns>
    </Dialog>
  );
}

function UploadDialog({ open, onClose }) {
  return open ? <UploadFlow onClose={onClose} /> : null;
}

export const DIALOGS = { uploadModal: UploadDialog };
