/* Plenix asset app · Advanced Filters — Metadata Fields (app/dialogs/MetadataFilterDialog.jsx).
   Replaces the metadataModal template of partials/dialogs.html and its plenix.js behavior (filterAdvMeta,
   toggleMetaSection, toggleShowMore) (batch 111).

   <MetadataFilterDialog open onClose value? onApply?/>
     value:   the applied filters, { types: string[], fields: { [fieldName]: string } }. types holds 'all' or any of
              'image', 'video', 'audio', 'document', '3d'; fields holds only the fields with text. Optional: without it
              the dialog keeps its own applied state (starts at DEFAULT_FILTERS).
     onApply: called with the new value when Apply is pressed (or Enter in a field); the dialog then closes.
   The dialog edits a draft copy; Cancel, Escape and the close button discard it.

   Behavior ported:
   - Asset type checkboxes (filterAdvMeta): checking All clears the others; checking a type clears All; clearing the last
     type checks All again. A group shows when All is on, nothing is on, the group is for all types, or it matches a type.
   - Each group collapses from its heading (toggleMetaSection) and shows its extra fields with "Show more (+N)" /
     "Show less" (toggleShowMore). */
import React from 'react';
import { Dialog, Field, Input, Checkbox, CollapsibleSection, ShowMore, Button, Stack, Inline, useUnsavedGuard } from 'plenix-platform';

// DATA: the asset type choices and the metadata field groups come from the back end; the legacy markup until then.
// A field is [label, name, back-end field key]; the first `shown` fields are always visible, the rest sit behind
// "Show more". The placeholder is "Search by <label in lower case>...".
const TYPE_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'audio', label: 'Audio' },
  { value: 'document', label: 'Doc' },
  { value: '3d', label: '3D' },
];

const GROUPS = [
  { title: 'General', types: ['all'], shown: 4, fields: [
    ['Name', 'name', 'name'], ['Description', 'description', 'assetsearchdescription'], ['Tags', 'tags', 'tags'],
    ['Rating', 'rating', 'assetvotes'], ['Keywords', 'keywords', 'keywords'], ['Edit status', 'editStatus', 'editstatus'],
    ['Language', 'language', 'language'], ['Version', 'version', 'version'], ['Summary', 'summary', 'summary'],
  ] },
  { title: 'Categorization', types: ['all'], shown: 2, fields: [
    ['Category', 'category', 'category'], ['Data type', 'dataType', 'datatype'], ['Category ID', 'categoryId', 'categoryid'],
    ['Parent category', 'parentCategory', 'parentcategory'], ['Category path', 'categoryPath', 'categorypath'],
    ['Display order', 'displayOrder', 'displayorder'], ['Asset type', 'assetType', 'assettype'],
    ['Classification', 'classification', 'classification'],
  ] },
  { title: 'Ownership & Rights', types: ['all'], shown: 2, fields: [
    ['Owner', 'owner', 'owner'], ['Creator', 'creator', 'creator'], ['Copyright', 'copyright', 'copyright'],
    ['Copyright notice', 'copyrightNotice', 'copyrightnotice'], ['Rights usage terms', 'rightsUsageTerms', 'usageterms'],
    ['License', 'license', 'license'], ['Author', 'author', 'author'], ['Created by', 'createdBy', 'createdby'],
    ['Modified by', 'modifiedBy', 'modifiedby'],
  ] },
  { title: 'Dates', types: ['all'], shown: 2, fields: [
    ['Date added', 'dateAdded', 'assetaddeddate'], ['Date modified', 'dateModified', 'assetmodificationdate'],
    ['Date created', 'dateCreated', 'datetimeoriginal'], ['Date digitized', 'dateDigitized', 'createdate'],
    ['GPS Date/Time', 'gpsDateTime', 'gpsdatestamp'], ['Import date', 'importDate', 'importdate'],
    ['Publish date', 'publishDate', 'publishdate'], ['Expiration date', 'expirationDate', 'expirationdate'],
  ] },
  { title: 'File properties', types: ['all'], shown: 3, fields: [
    ['File name', 'fileName', 'name'], ['File type', 'fileType', 'fileformat'], ['File size', 'fileSize', 'filesize'],
    ['MIME type', 'mimeType', 'mimetype'], ['Source path', 'sourcePath', 'sourcepath'],
    ['Archive source path', 'archiveSourcePath', 'archivesourcepath'], ['Checksum / MD5', 'checksumMd5', 'md5hex'],
    ['Asset ID', 'assetId', 'id'],
  ] },
  { title: 'Dimensions & Resolution', types: ['image', 'video'], shown: 2, fields: [
    ['Width', 'width', 'width'], ['Height', 'height', 'height'], ['DPI / Resolution', 'dpiResolution', 'xresolution'],
    ['Resolution unit', 'resolutionUnit', 'resolutionunit'], ['Orientation', 'orientation', 'orientation'],
    ['Pixel aspect ratio', 'pixelAspectRatio', 'pixelaspectratio'],
  ] },
  { title: 'Camera & Lens', types: ['image', 'video'], shown: 2, fields: [
    ['Camera make', 'cameraMake', 'make'], ['Camera model', 'cameraModel', 'model'],
    ['Camera Serial #', 'cameraSerial', 'serialnumber'], ['Lens type', 'lensType', 'lensmodel'],
    ['Lens make', 'lensMake', 'lensmake'], ['Firmware', 'firmware', 'software'],
  ] },
  { title: 'Exposure & Shooting', types: ['image'], shown: 4, fields: [
    ['Focal length', 'focalLength', 'focallength'], ['Aperture', 'aperture', 'fnumber'],
    ['Shutter speed', 'shutterSpeed', 'exposuretime'], ['ISO', 'iso', 'iso'],
    ['Exposure program', 'exposureProgram', 'exposureprogram'], ['Exposure mode', 'exposureMode', 'exposuremode'],
    ['Metering mode', 'meteringMode', 'meteringmode'], ['Flash', 'flash', 'flash'],
    ['White balance', 'whiteBalance', 'whitebalance'], ['Scene type', 'sceneType', 'scenecapturetype'],
    ['Contrast', 'contrast', 'contrast'], ['Saturation', 'saturation', 'saturation'], ['Sharpness', 'sharpness', 'sharpness'],
  ] },
  { title: 'Color & Image', types: ['image'], shown: 2, fields: [
    ['Color space', 'colorSpace', 'colorspace'], ['Color profile', 'colorProfile', 'iccprofilename'],
    ['Bit depth', 'bitDepth', 'bitspersample'], ['Compression', 'compression', 'compression'],
    ['Color type', 'colorType', 'colortype'],
  ] },
  { title: 'Location (GPS)', types: ['image', 'video'], shown: 2, fields: [
    ['GPS latitude', 'gpsLatitude', 'gpslatitude'], ['GPS longitude', 'gpsLongitude', 'gpslongitude'],
    ['GPS altitude', 'gpsAltitude', 'gpsaltitude'], ['GPS speed', 'gpsSpeed', 'gpsspeed'],
    ['GPS direction', 'gpsDirection', 'gpsimgdirection'],
  ] },
  { title: 'IPTC / XMP', types: ['image'], shown: 2, fields: [
    ['Headline', 'headline', 'headline'], ['Caption', 'caption', 'caption-abstract'], ['By-line', 'byLine', 'by-line'],
    ['Credit', 'credit', 'credit'], ['Source', 'source', 'source'], ['City', 'city', 'city'], ['Country', 'country', 'country'],
    ['Subject code', 'subjectCode', 'subject'], ['Urgency', 'urgency', 'urgency'],
    ['Instructions', 'instructions', 'specialinstructions'],
  ] },
  { title: 'Video — Stream', types: ['video'], shown: 4, fields: [
    ['Duration', 'duration', 'duration'], ['Frame rate', 'frameRate', 'r_frame_rate'], ['Video codec', 'videoCodec', 'codec_name'],
    ['Video resolution', 'videoResolution', 'videoresolution'], ['Codec profile', 'codecProfile', 'profile'],
    ['Video bitrate', 'videoBitrate', 'bit_rate'], ['Aspect ratio', 'aspectRatio', 'display_aspect_ratio'],
    ['Pixel format', 'pixelFormat', 'pix_fmt'], ['Color primaries', 'colorPrimaries', 'color_primaries'],
    ['Rotation', 'rotation', 'rotate'], ['Audio codec', 'audioCodec', 'audio_codec_name'],
    ['Audio bitrate', 'audioBitrate', 'audio_bit_rate'], ['Sample rate', 'sampleRate', 'sample_rate'],
    ['Audio channels', 'audioChannels', 'channels'], ['Subtitle tracks', 'subtitleTracks', 'subtitle_streams'],
  ] },
  { title: 'Video — Container Tags', types: ['video'], shown: 2, fields: [
    ['Title', 'title', 'mp4_nam'], ['Artist', 'artist', 'mp4_art'], ['Album', 'album', 'mp4_alb'],
    ['Comment', 'comment', 'mp4_cmt'], ['Genre', 'genre', 'mp4_gen'], ['Year', 'year', 'mp4_day'],
    ['Encoder', 'encoder', 'mp4_too'],
  ] },
  { title: 'Audio — ID3 Tags', types: ['audio'], shown: 4, fields: [
    ['Title', 'title2', 'id3_tit2'], ['Artist', 'artist2', 'id3_tpe1'], ['Album', 'album2', 'id3_talb'],
    ['Genre', 'genre2', 'id3_tcon'], ['Album artist', 'albumArtist', 'id3_tpe2'], ['Year', 'year2', 'id3_tdrc'],
    ['Track number', 'trackNumber', 'id3_trck'], ['Disc number', 'discNumber', 'id3_tpos'],
    ['Composer', 'composer', 'id3_tcom'], ['Conductor', 'conductor', 'id3_tpe3'], ['Lyricist', 'lyricist', 'id3_text'],
    ['Publisher', 'publisher', 'id3_tpub'], ['BPM', 'bpm', 'id3_tbpm'], ['ISRC', 'isrc', 'id3_tsrc'],
    ['Lyrics', 'lyrics', 'id3_uslt'], ['Album art', 'albumArt', 'id3_apic'], ['Copyright', 'copyright2', 'id3_tcop'],
    ['Mood', 'mood', 'id3_tmoo'], ['ReplayGain', 'replaygain', 'id3_txxx'],
  ] },
  { title: 'Audio — Stream', types: ['audio'], shown: 3, fields: [
    ['Duration', 'duration2', 'duration'], ['Audio codec', 'audioCodec2', 'codec_name'], ['Bitrate', 'bitrate', 'bit_rate'],
    ['Bitrate mode', 'bitrateMode', 'bitrate_mode'], ['Sample rate', 'sampleRate2', 'sample_rate'],
    ['Channels', 'channels', 'channels'], ['Bit depth', 'bitDepth2', 'bits_per_sample'],
  ] },
  { title: 'Document', types: ['document'], shown: 2, fields: [
    ['Page count', 'pageCount', 'pagecount'], ['Title', 'title3', 'pdf_title'], ['Word count', 'wordCount', 'wordcount'],
    ['Character count', 'characterCount', 'charcount'], ['Subject', 'subject', 'pdf_subject'],
    ['PDF producer', 'pdfProducer', 'pdf_producer'], ['PDF creator tool', 'pdfCreatorTool', 'pdf_creator'],
    ['PDF version', 'pdfVersion', 'pdfversion'], ['Encrypted', 'encrypted', 'encryption'],
  ] },
  { title: '3D / Model', types: ['3d'], shown: 3, fields: [
    ['Geometry type', 'geometryType', 'geometrytype'], ['Vertex count', 'vertexCount', 'vertexcount'],
    ['Face / Polygon Count', 'facePolygonCount', 'facecount'], ['Material count', 'materialCount', 'materialcount'],
    ['Texture count', 'textureCount', 'texturecount'], ['UV maps', 'uvMaps', 'uvmaps'],
    ['Bounding box', 'boundingBox', 'boundingbox'], ['Scene units', 'sceneUnits', 'sceneunits'],
    ['Animation', 'animation', 'hasanimation'], ['Rigged', 'rigged', 'hasarmature'],
    ['Source application', 'sourceApplication', 'sourceapp'],
  ] },
  { title: 'Status & Workflow', types: ['all'], shown: 3, fields: [
    ['Edit status', 'editStatus2', 'editstatus'], ['Import status', 'importStatus', 'importstatus'],
    ['Preview status', 'previewStatus', 'previewstatus'], ['Push status', 'pushStatus', 'pushstatus'],
    ['Approval status', 'approvalStatus', 'approvalstatus'], ['Conversion status', 'conversionStatus', 'conversionstatus'],
    ['Locked', 'locked', 'islocked'],
  ] },
  { title: 'AI & Semantic', types: ['all'], shown: 2, fields: [
    ['Semantic indexed', 'semanticIndexed', 'semanticindexed'], ['AI tags', 'aiTags', 'aitags'],
    ['Facial recognition', 'facialRecognition', 'facialrecognition'], ['CLIP embedding', 'clipEmbedding', 'clipembedding'],
  ] },
  { title: 'Distribution', types: ['all'], shown: 2, fields: [
    ['Channels', 'channels2', 'distributionchannels'], ['Published locations', 'publishedLocations', 'publishedlocations'],
    ['Auto assigned media', 'autoAssignedMedia', 'autoassignedmedia'], ['Conversion preset', 'conversionPreset', 'conversionpreset'],
  ] },
];

// Back-end field key for each field name, for the page to build its query from `value.fields`.
export const METADATA_FIELD_KEYS = Object.fromEntries(GROUPS.flatMap((g) => g.fields.map(([, name, key]) => [name, key])));

export const DEFAULT_FILTERS = { types: ['all'], fields: {} };


// filterAdvMeta: All and the specific types exclude each other; clearing the last type turns All back on.
function nextTypes(types, value, checked) {
  if (value === 'all') return checked ? ['all'] : types.filter((t) => t !== 'all');
  const others = types.filter((t) => t !== 'all' && t !== value).concat(checked ? [value] : []);
  return others.length ? others : ['all'];
}

function groupVisible(group, types) {
  const active = types.filter((t) => t !== 'all');
  if (types.includes('all') || !active.length || group.types.includes('all')) return true;
  return active.some((t) => group.types.includes(t));
}

function MetaGroup({ group, index, fields, onField, collapsed, onToggle, expanded, onShowMore }) {
  const extra = group.fields.length - group.shown;
  const list = expanded ? group.fields : group.fields.slice(0, group.shown);
  return (
    <CollapsibleSection title={group.title} expanded={!collapsed} onToggle={onToggle} headingLevel={3}>
      <Stack gap="sm" className="plx-u-gap-y-component-gap-sm plx-u-pt-component-gap-sm">
        {list.map(([label, name]) => (
          <Field key={name} label={label} layout="inline">
            <Input name={name} placeholder={'Search by ' + label.toLowerCase() + '...'} value={fields[name] || ''} onChange={(e) => onField(name, e.target.value)} />
          </Field>
        ))}
        {extra > 0 ? (
          <div className="plx-u-flex">
            <ShowMore variant="link" size="sm" expanded={expanded} count={'+' + extra} onToggle={onShowMore} />
          </div>
        ) : null}
      </Stack>
    </CollapsibleSection>
  );
}

export function MetadataFilterDialog({ open, onClose, value, onApply }) {
  const [applied, setApplied] = React.useState(value || DEFAULT_FILTERS);
  const current = value || applied;
  const [draft, setDraft] = React.useState(current);
  const [collapsed, setCollapsed] = React.useState({});
  const [expanded, setExpanded] = React.useState({});

  // Each opening starts from the applied filters.
  React.useEffect(() => { if (open) setDraft(current); }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const setType = (v, checked) => setDraft((d) => ({ ...d, types: nextTypes(d.types, v, checked) }));
  const setField = (name, text) => setDraft((d) => {
    const fields = { ...d.fields };
    if (text) fields[name] = text; else delete fields[name];
    return { ...d, fields };
  });
  const flip = (setter, i) => setter((s) => ({ ...s, [i]: !s[i] }));
  // filters changed and not applied: Cancel, Close and Escape ask first, and so does leaving the page
  const guard = useUnsavedGuard(!!open && JSON.stringify(draft) !== JSON.stringify(current), 'The filters you changed have not been applied.');
  const cancel = guard(onClose);

  const apply = (e) => {
    if (e) e.preventDefault();
    if (!value) setApplied(draft);
    if (onApply) onApply(draft);
    onClose();
  };

  return (
    <Dialog open={open} onClose={cancel} title="Advanced Filters — Metadata Fields" icon="filter" size="lg"
      footer={<><Button onClick={cancel}>Cancel</Button><Button variant="primary" onClick={apply}>Apply</Button></>}>
      <Stack as="form" noValidate onSubmit={apply} className="plx-u-gap-y-pattern-stack-md">
        <Inline role="group" aria-label="Asset type" gap="lg" wrap className="plx-u-gap-y-inline-sm">
          {TYPE_OPTIONS.map((o) => (
            <Checkbox key={o.value} name="advMetaType" value={o.value} label={o.label}
              checked={draft.types.includes(o.value)} onChange={(e) => setType(o.value, e.target.checked)} />
          ))}
        </Inline>
        {GROUPS.map((g, i) => (groupVisible(g, draft.types) ? (
          <MetaGroup key={g.title} group={g} index={i} fields={draft.fields} onField={setField}
            collapsed={!!collapsed[i]} onToggle={() => flip(setCollapsed, i)}
            expanded={!!expanded[i]} onShowMore={() => flip(setExpanded, i)} />
        ) : null))}
        {/* Enter in a field applies, as the legacy form's submit button did. */}
        <button type="submit" hidden />
      </Stack>
    </Dialog>
  );
}

export const DIALOGS = { metadataModal: MetadataFilterDialog };
