/* Plenix asset app · System Settings data (app/pages/systemSettingsData.js).
   DATA: every list here comes from the back end; these are the sample records the page shows until then (the same ones
   the HTML page showed). */

export const PROPERTIES = {
  defaultRecordLabel: '${entitytable.name}', tabOrdering: '115', enableUploading: true, enableOnSearch: true, defaultResultsView: 'Grid',
  defaultSortField: '', uploadSourcepath: 'Module/${entitytableid.name} ${formatteddate} ${formattedyear} ${data.entity_date.yyyy} ${entityid.entityparentid.sourcepath}',
  autoCreateEntities: false, rootFolderPath: '', autoCreateAtFolderLevel: '0', semanticEnabled: true, aiSearchPrompt: '', aiSearchContains: '',
};
export const RESULT_VIEWS = ['Columns', 'Gallery', 'Grid', 'Map', 'Table'];
export const ENABLED_FOR = [['Administrators', true], ['Catalogs Admins', true], ['Uploaders', true], ['Users', true], ['Anonymous', false]];
export const ACTIONS = [['View details', 'All'], ['Edit metadata', 'Entity Editor, Administrators'], ['Delete', 'Administrators'], ['Download original', 'Entity Editor, Administrators'], ['Share', 'All']];
export const VIEW_ALL = [['Administrators', true], ['Catalogs Admins', true], ['Uploaders', false]];
export const EDIT_ALL = [['Administrators', true], ['Catalogs Admins', true]];

export const FIELDS = [
  ['Asset title', 'assettitle', 'textbox'], ['Caption', 'headline', 'textbox'], ['Description', 'longcaption', 'textbox'], ['Categories', 'category', 'list'],
  ['Asset type', 'assettype', 'list'], ['Author', 'creator', 'text'], ['Copyright notice', 'copyrightnotice', 'textbox'], ['Copyright status', 'copyrightstatus', 'list'],
  ['Color space', 'colorspace', 'list'], ['File format', 'fileformat', 'textbox'], ['File size', 'filesize', 'number'], ['Created on', 'assetcreationdate', 'date'],
  ['Asset expired', 'assetexpired', 'boolean'], ['Face profiles', 'faceprofiles', 'nested'], ['GEO location', 'geo_point', 'geo_point'],
];
export const FIELD_TOTAL = 214;

export const ASSET_TYPES = [
  ['3D Modeling', 'stl obj gltf glb fbx blend usd usda usdz 3ds dae abc ply wrl x3d step stp iges igs', 0],
  ['Archives', 'zip rar 7z tar gz bz2 xz cab iso dmg', 1],
  ['Audio', 'mp3 wav flac aac ogg wma m4a aiff alac opus mid midi amr', 2],
  ['Documents', 'pdf doc docx ppt pptx xls xlsx rtf odt ods odp txt csv tsv epub pages numbers keynote indd indt idml xml html dita ditamap shtml', 3],
  ['Fonts', 'ttf otf woff woff2 eot', 4],
  ['Images', 'jpg jpeg tiff tif gif png webp avif heic heif jxl pbm pgm pnm ppm hdr exr bmp icr tga svg svgz psd psb jp2 cr2 cr3 arw nef nrw orf raf raw2 dng 3fr iiq pef srw x3f gpr rwl dcr mrw erf kdc cdr cdt cmx cpx pat ai eps wmf emf', 5],
  ['Video', 'mp4 mov avi flv wmv mkv mpg mpeg m4v webm ogv 3gp 3g2 maf ts vob divx rm rmvb asf m2ts mts', 6],
];

export const HOT_FOLDERS = [{ name: 'Plenix Import', enabled: true, meta: 'Path: imports · Fully scanned Aug 18, 2026, 3:49 PM' }];

export const CONVERSIONS = [
  ['Image 3000x3000 JPG', 'image3000x3000.jpg', 'Yes', 'Yes', 'Image'], ['Webp Image 3000x3000', 'image3000x3000.webp', 'Yes', 'Yes', 'Image'],
  ['Webp Image 550x550', 'image550x550.webp', 'Yes', 'Yes', 'Image, Documents, Video'], ['Webp Image 200 Thumbnail', 'image200x200.webp', 'Yes', 'Yes', 'Image, Documents, Video'],
  ['Webp Image Large Watermarked', 'image3000x3000wm.webp', 'Yes', 'No', 'Image, Documents'], ['Video HLS', 'video.m3u8', 'Yes', 'Yes', 'Video'],
  ['Video MP4 480p', 'video.mp4', 'Yes', 'No', 'Video'], ['Video Proxy MOV', 'VideoProxy.mov', 'Yes', 'No', 'Video'], ['Mp3 Audio', 'audio.mp3', 'Yes', 'Yes', 'Audio'],
  ['Document Large Webp Image', 'image3000x3000.webp', 'Yes', 'Yes', 'Documents'],
];

export const USERS = [
  ['admin', 'Administrator Administrator', 'admin@example.com', 'Administrators', 'Dec 18, 2023', 'Sep 1, 2026'],
  ['agent', 'Plenix Finder AI Helper', '—', null, 'Sep 1, 2026', '—'],
  ['jordan', 'Jordan Avery', 'jordan.avery@example.com', 'Administrators', 'Sep 1, 2026', 'Sep 19, 2026'],
  ['testuser', '—', '—', null, 'Dec 18, 2023', 'Feb 13, 2015'],
];

export const GROUPS = ['Administrators', 'Catalogs Admins', 'Uploaders', 'Users'];

export const PERMISSION_ROLES = ['Entity owner', 'Administrators', 'Entity editor', 'Users', 'Anonymous'];
export const PERMISSION_AREAS = [
  { id: 'app', label: 'Application', total: 34, items: [
    ['Application', 'Enables access to the Plenix application.'], ['Home', 'Enables the home button.'], ['Settings', 'Enables access to application management settings.'],
    ['Multiple files', 'Enables various actions across multiple assets simultaneously.'], ['Table columns', 'Enables the customization of search result columns in table view.'],
    ['Download original', 'Enables downloading of the original asset.'], ['Edit Users and Groups', 'Allows user to create and edit users or groups.'],
    ['My account area', 'Enables a page that edits user data and updates passwords.'], ['Category navigation', 'Enables the Category Navigation in the sidebar.'],
    ['View AI agent', 'Enables AI Chat Agent.']] },
  { id: 'asset', label: 'Asset management', total: 65, items: [
    ['Upload files', 'Enables the upload of assets.'], ['Delete', 'Enables removal of an asset, and the option to remove the original.'],
    ['Share', 'Enables the share button. Parent of email, embed, publish and social media share.'], ['Watermark', 'System-wide watermarking across all assets.'],
    ['Approve/Reject Workflow', 'Enables Approve/Reject options.'], ['Edit all assets', 'Allow editing and viewing of any asset.'],
    ['Permissions', 'Enables permission alteration for media assets.'], ['Media editor', 'Enables access to Media Editor.'], ['View faceprofiles', 'View Asset Face Profile Detection.']] },
  { id: 'library', label: 'Library management', total: 18, items: [
    ['Create new collection', 'Allows creation of new collections.'], ['Create new library', 'Allows creation of new libraries.'],
    ['Pick any library', 'Asset can be added to any library.'], ['Add files to Bookmarks', 'Enables users to add files to their Bookmarks.']] },
  { id: 'api', label: 'Programming API', total: 4, items: [['Programming API', 'Enables REST API access to this catalog.']] },
];

export const EMAIL_TEMPLATES = [
  ['Administrative notification when assets have been published', 'admintemplate.html'],
  ['Confirmation email sent to user after assets have been successfully shared', 'usertemplate.html'],
  ['Email sent when a user shares an asset', 'sharetemplate.html'],
  ['Email sent when assets are added or removed from a collection', 'collection-count-modified.html'],
  ['Email sent when assets are approved', 'collection-assets-approved.html'],
  ['Email sent when assets are rejected', 'collection-assets-rejected.html'],
  ['Email sent when a user is added to a collection', 'collection-add-new-follower.html'],
  ['Asset renewal notification', 'assetrenew.html'],
];

// [label, key, value, 'text' when the value is words (a title), not a technical value in the data font]
export const CATALOG_PARAMETERS = [
  ['Application site title', 'sitetitle', 'Plenix Library', 'text'], ['Allow login by Email Address', 'allowloginbyemail', 'true'], ['CDN prefix', 'cdn_prefix', '—'],
  ['AWS bucket', 'awsbucket', '—'], ['AI: Enable Content Creation', 'ai_create_enabled', 'true'], ['AI: OpenAI Model (AI Chat)', 'gpt-model', 'gpt-4o'],
  ['AI: Ollama Server', 'ollama-url', 'https://ollama.example.com'], ['AI: Translate Server', 'ai_translate_server', 'http://translate.example.com:48991'],
  ['AI: Vectorizer Server', 'ai_vectorizer_server', 'http://vectorizer.example.com:48981'], ['Face: Faceprofile Server', 'faceprofileserver', '—'],
  ['Catalog Asset Edit Groups', 'catalogasseteditgroups', 'administrators users'], ['Admin Catalog Asset View Groups', 'catalogassetviewgroups', 'administrators'],
];
export const CATALOG_TOTAL = 'roughly 130';

export const SERVER_STATUS = [['Node ID', 'plenix003'], ['Cluster ID', 'plenix-cluster'], ['Catalog ID', 'finder/catalog']];
export const VERSIONS = [['Plenix Server', '11.2218'], ['Plenix', '11.375'], ['Elasticsearch (Lucene)', '5.5.4'], ['Groovy', '2.4.11'], ['Velocity Engine', '2.3'], ['Apache PDFBox', '2.0.6']];
export const LOG_PATH = '/opt/plenix/logs/server.log';

export const DB_TABLES = ['asset', 'category', 'user', 'group', 'order', 'library', 'librarycollection', 'customization', 'entityperson', 'faceprofilegroup', 'module', 'permission'];
export const DB_COLUMNS = ['AI tags', 'Album', 'Asset title', 'Asset type', 'Artist', 'Categories', 'Created on'];
export const DB_ROWS = [
  ['gold, ornate', '—', 'korban_stamp_010', 'Image', '—', 'Korban Stamp', 'Aug 18, 2026'],
  ['certificate, church', '—', 'certificate_christ_the_teacher', '3D Models', '—', 'Certificates', 'Aug 15, 2026'],
  ['cross, gold', 'Website Assets', 'Coptic_Cross_Gold', 'Image', 'Mina Fahim', 'Crosses', 'Aug 10, 2026'],
  ['baptism, sacrament', '—', 'Certificate_Baptism_v3', 'Documents', '—', 'Certificate - Baptism', 'Aug 8, 2026'],
];
export const DB_TOTAL = { records: '4,546', pages: 227 };

export const CUSTOMIZATIONS = [
  ['Supporting table', 'Entity source type', 'searchcategory', '9/1/26, 11:30 AM'], ['Module', 'Person', '—', '9/1/26, 11:30 AM'],
  ['Supporting table', 'Start category ID', 'desktopsyncfolder', '9/1/26, 11:30 AM'], ['Module', 'Document', '—', '9/1/26, 11:30 AM'],
  ['Module', 'Media profile', '—', '9/1/26, 11:30 AM'], ['Module', 'Categories', '—', '9/1/26, 11:30 AM'],
];

export const SCHEDULED = [
  ['Auto assign Entity Image', 'autoassignproxyimage.html', 'Runs: 2,736 · Repeats every 1m'], ['Publish assets', 'publishassets.html', 'Runs: 541 · Repeats every 5m'],
  ['Send collection chat notifications', 'notifycollectionchatnotifications.html', 'Runs: 541 · Repeats every 5m'], ['Run media conversions', 'runconversions.html', 'Runs: 550 · Repeats every 5m'],
  ['Transcript audio', 'autotranscode.html', 'Runs: 541 · Repeats every 5m'], ['Semantic Index New', 'semanticscan.html', 'Runs: 270 · Repeats every 10m'],
  ['Import hot folders', 'importhotfolders.html', 'Runs: 270 · Repeats every 10m'], ['Check permission changes', 'checkpermissionhistory.html', 'Runs: 277 · Repeats every 10m'],
  ['Apply Google Vision', 'applygooglevision.html', 'Runs: 180 · Repeats every 15m'], ['Apply Google Transcode', 'applygoogletranscode.html', 'Runs: 180 · Repeats every 15m'],
  ['Asset metadata notification', 'assetmetadata.html', 'Runs: 30 · Repeats every 30m'],
];
