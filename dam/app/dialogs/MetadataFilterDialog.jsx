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
import { Dialog, Field, Input, Checkbox, CollapsibleSection, Button, Stack, Inline } from 'plenix-platform';

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
    ['Rating', 'rating', 'assetvotes'], ['Keywords', 'keywords', 'keywords'], ['Edit Status', 'editStatus', 'editstatus'],
    ['Language', 'language', 'language'], ['Version', 'version', 'version'], ['Summary', 'summary', 'summary'],
  ] },
  { title: 'Categorization', types: ['all'], shown: 2, fields: [
    ['Category', 'category', 'category'], ['Data Type', 'dataType', 'datatype'], ['Category ID', 'categoryId', 'categoryid'],
    ['Parent Category', 'parentCategory', 'parentcategory'], ['Category Path', 'categoryPath', 'categorypath'],
    ['Display Order', 'displayOrder', 'displayorder'], ['Asset Type', 'assetType', 'assettype'],
    ['Classification', 'classification', 'classification'],
  ] },
  { title: 'Ownership & Rights', types: ['all'], shown: 2, fields: [
    ['Owner', 'owner', 'owner'], ['Creator', 'creator', 'creator'], ['Copyright', 'copyright', 'copyright'],
    ['Copyright Notice', 'copyrightNotice', 'copyrightnotice'], ['Rights Usage Terms', 'rightsUsageTerms', 'usageterms'],
    ['License', 'license', 'license'], ['Author', 'author', 'author'], ['Created By', 'createdBy', 'createdby'],
    ['Modified By', 'modifiedBy', 'modifiedby'],
  ] },
  { title: 'Dates', types: ['all'], shown: 2, fields: [
    ['Date Added', 'dateAdded', 'assetaddeddate'], ['Date Modified', 'dateModified', 'assetmodificationdate'],
    ['Date Created', 'dateCreated', 'datetimeoriginal'], ['Date Digitized', 'dateDigitized', 'createdate'],
    ['GPS Date/Time', 'gpsDateTime', 'gpsdatestamp'], ['Import Date', 'importDate', 'importdate'],
    ['Publish Date', 'publishDate', 'publishdate'], ['Expiration Date', 'expirationDate', 'expirationdate'],
  ] },
  { title: 'File Properties', types: ['all'], shown: 3, fields: [
    ['File Name', 'fileName', 'name'], ['File Type', 'fileType', 'fileformat'], ['File Size', 'fileSize', 'filesize'],
    ['MIME Type', 'mimeType', 'mimetype'], ['Source Path', 'sourcePath', 'sourcepath'],
    ['Archive Source Path', 'archiveSourcePath', 'archivesourcepath'], ['Checksum / MD5', 'checksumMd5', 'md5hex'],
    ['Asset ID', 'assetId', 'id'],
  ] },
  { title: 'Dimensions & Resolution', types: ['image', 'video'], shown: 2, fields: [
    ['Width', 'width', 'width'], ['Height', 'height', 'height'], ['DPI / Resolution', 'dpiResolution', 'xresolution'],
    ['Resolution Unit', 'resolutionUnit', 'resolutionunit'], ['Orientation', 'orientation', 'orientation'],
    ['Pixel Aspect Ratio', 'pixelAspectRatio', 'pixelaspectratio'],
  ] },
  { title: 'Camera & Lens', types: ['image', 'video'], shown: 2, fields: [
    ['Camera Make', 'cameraMake', 'make'], ['Camera Model', 'cameraModel', 'model'],
    ['Camera Serial #', 'cameraSerial', 'serialnumber'], ['Lens Type', 'lensType', 'lensmodel'],
    ['Lens Make', 'lensMake', 'lensmake'], ['Firmware', 'firmware', 'software'],
  ] },
  { title: 'Exposure & Shooting', types: ['image'], shown: 4, fields: [
    ['Focal Length', 'focalLength', 'focallength'], ['Aperture', 'aperture', 'fnumber'],
    ['Shutter Speed', 'shutterSpeed', 'exposuretime'], ['ISO', 'iso', 'iso'],
    ['Exposure Program', 'exposureProgram', 'exposureprogram'], ['Exposure Mode', 'exposureMode', 'exposuremode'],
    ['Metering Mode', 'meteringMode', 'meteringmode'], ['Flash', 'flash', 'flash'],
    ['White Balance', 'whiteBalance', 'whitebalance'], ['Scene Type', 'sceneType', 'scenecapturetype'],
    ['Contrast', 'contrast', 'contrast'], ['Saturation', 'saturation', 'saturation'], ['Sharpness', 'sharpness', 'sharpness'],
  ] },
  { title: 'Color & Image', types: ['image'], shown: 2, fields: [
    ['Color Space', 'colorSpace', 'colorspace'], ['Color Profile', 'colorProfile', 'iccprofilename'],
    ['Bit Depth', 'bitDepth', 'bitspersample'], ['Compression', 'compression', 'compression'],
    ['Color Type', 'colorType', 'colortype'],
  ] },
  { title: 'Location (GPS)', types: ['image', 'video'], shown: 2, fields: [
    ['GPS Latitude', 'gpsLatitude', 'gpslatitude'], ['GPS Longitude', 'gpsLongitude', 'gpslongitude'],
    ['GPS Altitude', 'gpsAltitude', 'gpsaltitude'], ['GPS Speed', 'gpsSpeed', 'gpsspeed'],
    ['GPS Direction', 'gpsDirection', 'gpsimgdirection'],
  ] },
  { title: 'IPTC / XMP', types: ['image'], shown: 2, fields: [
    ['Headline', 'headline', 'headline'], ['Caption', 'caption', 'caption-abstract'], ['By-line', 'byLine', 'by-line'],
    ['Credit', 'credit', 'credit'], ['Source', 'source', 'source'], ['City', 'city', 'city'], ['Country', 'country', 'country'],
    ['Subject Code', 'subjectCode', 'subject'], ['Urgency', 'urgency', 'urgency'],
    ['Instructions', 'instructions', 'specialinstructions'],
  ] },
  { title: 'Video — Stream', types: ['video'], shown: 4, fields: [
    ['Duration', 'duration', 'duration'], ['Frame Rate', 'frameRate', 'r_frame_rate'], ['Video Codec', 'videoCodec', 'codec_name'],
    ['Video Resolution', 'videoResolution', 'videoresolution'], ['Codec Profile', 'codecProfile', 'profile'],
    ['Video Bitrate', 'videoBitrate', 'bit_rate'], ['Aspect Ratio', 'aspectRatio', 'display_aspect_ratio'],
    ['Pixel Format', 'pixelFormat', 'pix_fmt'], ['Color Primaries', 'colorPrimaries', 'color_primaries'],
    ['Rotation', 'rotation', 'rotate'], ['Audio Codec', 'audioCodec', 'audio_codec_name'],
    ['Audio Bitrate', 'audioBitrate', 'audio_bit_rate'], ['Sample Rate', 'sampleRate', 'sample_rate'],
    ['Audio Channels', 'audioChannels', 'channels'], ['Subtitle Tracks', 'subtitleTracks', 'subtitle_streams'],
  ] },
  { title: 'Video — Container Tags', types: ['video'], shown: 2, fields: [
    ['Title', 'title', 'mp4_nam'], ['Artist', 'artist', 'mp4_art'], ['Album', 'album', 'mp4_alb'],
    ['Comment', 'comment', 'mp4_cmt'], ['Genre', 'genre', 'mp4_gen'], ['Year', 'year', 'mp4_day'],
    ['Encoder', 'encoder', 'mp4_too'],
  ] },
  { title: 'Audio — ID3 Tags', types: ['audio'], shown: 4, fields: [
    ['Title', 'title2', 'id3_tit2'], ['Artist', 'artist2', 'id3_tpe1'], ['Album', 'album2', 'id3_talb'],
    ['Genre', 'genre2', 'id3_tcon'], ['Album Artist', 'albumArtist', 'id3_tpe2'], ['Year', 'year2', 'id3_tdrc'],
    ['Track Number', 'trackNumber', 'id3_trck'], ['Disc Number', 'discNumber', 'id3_tpos'],
    ['Composer', 'composer', 'id3_tcom'], ['Conductor', 'conductor', 'id3_tpe3'], ['Lyricist', 'lyricist', 'id3_text'],
    ['Publisher', 'publisher', 'id3_tpub'], ['BPM', 'bpm', 'id3_tbpm'], ['ISRC', 'isrc', 'id3_tsrc'],
    ['Lyrics', 'lyrics', 'id3_uslt'], ['Album Art', 'albumArt', 'id3_apic'], ['Copyright', 'copyright2', 'id3_tcop'],
    ['Mood', 'mood', 'id3_tmoo'], ['ReplayGain', 'replaygain', 'id3_txxx'],
  ] },
  { title: 'Audio — Stream', types: ['audio'], shown: 3, fields: [
    ['Duration', 'duration2', 'duration'], ['Audio Codec', 'audioCodec2', 'codec_name'], ['Bitrate', 'bitrate', 'bit_rate'],
    ['Bitrate Mode', 'bitrateMode', 'bitrate_mode'], ['Sample Rate', 'sampleRate2', 'sample_rate'],
    ['Channels', 'channels', 'channels'], ['Bit Depth', 'bitDepth2', 'bits_per_sample'],
  ] },
  { title: 'Document', types: ['document'], shown: 2, fields: [
    ['Page Count', 'pageCount', 'pagecount'], ['Title', 'title3', 'pdf_title'], ['Word Count', 'wordCount', 'wordcount'],
    ['Character Count', 'characterCount', 'charcount'], ['Subject', 'subject', 'pdf_subject'],
    ['PDF Producer', 'pdfProducer', 'pdf_producer'], ['PDF Creator Tool', 'pdfCreatorTool', 'pdf_creator'],
    ['PDF Version', 'pdfVersion', 'pdfversion'], ['Encrypted', 'encrypted', 'encryption'],
  ] },
  { title: '3D / Model', types: ['3d'], shown: 3, fields: [
    ['Geometry Type', 'geometryType', 'geometrytype'], ['Vertex Count', 'vertexCount', 'vertexcount'],
    ['Face / Polygon Count', 'facePolygonCount', 'facecount'], ['Material Count', 'materialCount', 'materialcount'],
    ['Texture Count', 'textureCount', 'texturecount'], ['UV Maps', 'uvMaps', 'uvmaps'],
    ['Bounding Box', 'boundingBox', 'boundingbox'], ['Scene Units', 'sceneUnits', 'sceneunits'],
    ['Animation', 'animation', 'hasanimation'], ['Rigged', 'rigged', 'hasarmature'],
    ['Source Application', 'sourceApplication', 'sourceapp'],
  ] },
  { title: 'Status & Workflow', types: ['all'], shown: 3, fields: [
    ['Edit Status', 'editStatus2', 'editstatus'], ['Import Status', 'importStatus', 'importstatus'],
    ['Preview Status', 'previewStatus', 'previewstatus'], ['Push Status', 'pushStatus', 'pushstatus'],
    ['Approval Status', 'approvalStatus', 'approvalstatus'], ['Conversion Status', 'conversionStatus', 'conversionstatus'],
    ['Locked', 'locked', 'islocked'],
  ] },
  { title: 'AI & Semantic', types: ['all'], shown: 2, fields: [
    ['Semantic Indexed', 'semanticIndexed', 'semanticindexed'], ['AI Tags', 'aiTags', 'aitags'],
    ['Facial Recognition', 'facialRecognition', 'facialrecognition'], ['CLIP Embedding', 'clipEmbedding', 'clipembedding'],
  ] },
  { title: 'Distribution', types: ['all'], shown: 2, fields: [
    ['Channels', 'channels2', 'distributionchannels'], ['Published Locations', 'publishedLocations', 'publishedlocations'],
    ['Auto Assigned Media', 'autoAssignedMedia', 'autoassignedmedia'], ['Conversion Preset', 'conversionPreset', 'conversionpreset'],
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
            <Button variant="link" size="sm" aria-expanded={expanded} onClick={onShowMore}>{expanded ? 'Show less' : 'Show more (+' + extra + ')'}</Button>
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

  const apply = (e) => {
    if (e) e.preventDefault();
    if (!value) setApplied(draft);
    if (onApply) onApply(draft);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title="Advanced Filters — Metadata Fields" icon="filter" size="lg"
      footer={<><Button onClick={onClose}>Cancel</Button><Button variant="primary" onClick={apply}>Apply</Button></>}>
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
