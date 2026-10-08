/*
 * GENERATED FILE — DO NOT EDIT
 * Source: dam/app/assets.jsx and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "dam/app/shell/AssetShell.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetHeader = AssetHeader;
exports.AssetPage = AssetPage;
exports.AssetStatusBar = AssetStatusBar;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · shell (app/shell/AssetShell.jsx): what every asset page shares, in React.
   <AssetPage title="My Account" current="account" sideNav={<NavPane…/>} panel={<SidePanel…/>}>…</AssetPage> renders the AppShell — skip link, header, the page's <main>
   (with its visually hidden h1) and the StatusBar (the toast host is mounted around every page by app/assets.jsx). current: "account" | "system" marks the account
   button as the current place on the settings pages. On the home page, onSearch(query) and onUpload() handle search and
   upload in place (query: the initial search text); elsewhere they go to the home page (index.html?q=… / ?upload=1).
   Header: brand (home), asset search (Enter searches on the home page; Ctrl K or ⌘K focuses it), Upload (opens the upload
   dialog on the home page), notifications and the account menu. Replaces partials/topbar.html on the pages that have
   moved to React. */

// DATA: the library totals come from the back end; this is the sample record the pages show until then. Who is signed in
// and their notifications come from the Platform session (SessionProvider, mounted in app/assets.jsx).
const LIBRARY = {
  summary: '4,546 assets | 12.4 GB',
  owner: 'Lighthouse Way'
};
function AssetHeader({
  current,
  query = '',
  onSearch,
  onUpload
}) {
  const [q, setQ] = _react.default.useState(query);
  const onSearchKey = e => {
    if (e.key !== 'Enter') return;
    if (onSearch) onSearch(q.trim());else if (q.trim()) location.href = 'index.html?q=' + encodeURIComponent(q.trim());
  };
  // the universal Plenix header: this is the Asset Manager; the header brings the pinned applications, search (Ctrl K),
  // notifications, the account and the switcher
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppHeader, {
    tone: "accent",
    currentApp: "assets",
    appsRoot: "../",
    brandHref: "index.html",
    action: /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppHeader.Action, {
      icon: "hdr-upload",
      onClick: () => {
        if (onUpload) onUpload();else location.href = 'index.html?upload=1';
      }
    }, "Upload"),
    search: /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
      value: q,
      onChange: e => setQ(e.target.value),
      onClear: () => setQ(''),
      onKeyDown: onSearchKey,
      label: "Search assets",
      placeholder: "Search assets by name, tag, or keyword...",
      shortcut: "Ctrl K",
      onAccent: true
    }),
    account: /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppHeader.Account, {
      current: current === 'system' ? 'settings' : current,
      myAccount: {
        href: 'settings-myaccount.html'
      },
      settings: {
        href: 'settings-system.html'
      }
    })
  });
}
function AssetStatusBar() {
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusBar, {
    start: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusDot, {
      tone: "success",
      label: "Library online"
    }), /*#__PURE__*/_react.default.createElement("span", null, LIBRARY.summary)),
    end: LIBRARY.owner
  });
}
function AssetPage({
  title,
  current,
  query,
  onSearch,
  onUpload,
  sideNav,
  panel,
  children
}) {
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppShell, {
    header: /*#__PURE__*/_react.default.createElement(AssetHeader, {
      current: current,
      query: query,
      onSearch: onSearch,
      onUpload: onUpload
    }),
    sideNav: sideNav,
    panel: panel,
    footer: /*#__PURE__*/_react.default.createElement(AssetStatusBar, null),
    mainClassName: "plx-shell-main"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "plx-visually-hidden"
  }, 'Plenix Asset Manager: ' + title), children);
}
  } },
  "dam/app/pages/MyAccountPage.jsx": { deps: {"react":null,"plenix-platform":null,"../shell/AssetShell.jsx":"dam/app/shell/AssetShell.jsx"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MyAccountPage = MyAccountPage;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var _AssetShell = require("../shell/AssetShell.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · My Account (app/pages/MyAccountPage.jsx): profile and personal preferences.
   Replaces the HTML of settings-myaccount.html (batch 109). Sections: Profile, Preferences; the address hash
   (#profile, #preferences) opens one directly and follows the navigation. Both stay mounted, so unsaved edits survive
   switching. */
// DATA: the saved preferences and the page-size choices come from the back end; sample values until then. The profile is
// the signed-in person, from the Platform session.
const PAGE_SIZES = ['6', '8', '12', '15', '20', '30', '36', '50', '100', '200'];
const LAST_VIEWED = 'finder/find';
const SECTIONS = [{
  heading: 'My Account',
  items: [{
    id: 'profile',
    label: 'Profile',
    icon: 'settings-profile'
  }, {
    id: 'preferences',
    label: 'Preferences',
    icon: 'settings-preferences'
  }]
}];
function useSection() {
  const read = () => location.hash === '#preferences' ? 'preferences' : 'profile';
  const [section, setSection] = _react.default.useState(read);
  _react.default.useEffect(() => {
    const on = () => setSection(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = id => {
    if (id === 'home') return;
    history.replaceState(null, '', '#' + id);
    setSection(id);
  };
  return [section, go];
}
function Profile() {
  const toast = (0, _plenixPlatform.useToast)();
  const {
    account
  } = (0, _plenixPlatform.useSession)();
  const [p, setP] = _react.default.useState(() => ({
    firstName: account.firstName || '',
    lastName: account.lastName || '',
    email: account.email || ''
  }));
  const field = k => ({
    value: p[k],
    onChange: e => setP({
      ...p,
      [k]: e.target.value
    })
  });
  return /*#__PURE__*/_react.default.createElement("form", {
    noValidate: true,
    onSubmit: e => {
      e.preventDefault();
      toast.show('Profile saved', {
        tone: 'success'
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Profile",
    description: "Edit your account details and update your password.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true,
    actions: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      type: "submit",
      variant: "primary"
    }, "Save"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: () => toast.show('Change Password')
    }, "Change Password"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "First Name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "firstName",
    autoComplete: "given-name"
  }, field('firstName')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Last Name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "lastName",
    autoComplete: "family-name"
  }, field('lastName')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Email",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "email",
    type: "email",
    autoComplete: "email"
  }, field('email'))))));
}
function Preferences() {
  const toast = (0, _plenixPlatform.useToast)();
  const [density, setDensity] = (0, _plenixPlatform.useDensity)();
  const [prefs, setPrefs] = _react.default.useState({
    theme: 'Light',
    assets: '30',
    rows: '30',
    album: false,
    approval: false,
    dateFormat: ''
  });
  const [sizes, setSizes] = _react.default.useState(PAGE_SIZES.map(v => ({
    value: v,
    label: v
  })));
  const set = k => v => setPrefs({
    ...prefs,
    [k]: v
  });
  const create = k => text => {
    const v = text.trim();
    if (!v) return;
    if (!sizes.some(o => o.value === v)) setSizes(sizes.concat({
      value: v,
      label: v
    }));
    set(k)(v);
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    noValidate: true,
    onSubmit: e => {
      e.preventDefault();
      toast.show('Preferences saved', {
        tone: 'success'
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Preferences",
    description: "Your personal display and notification preferences.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true,
    actions: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      type: "submit",
      variant: "primary"
    }, "Save Preferences")
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Default Theme",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "defaultTheme",
    value: prefs.theme,
    onChange: e => set('theme')(e.target.value)
  }, /*#__PURE__*/_react.default.createElement("option", null, "Light"), /*#__PURE__*/_react.default.createElement("option", null, "Dark"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ChoiceList, {
    legend: "Display density",
    value: density,
    onChange: setDensity,
    options: window.PlenixWorkspace ? window.PlenixWorkspace.densities() : []
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Assets per Page",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    options: sizes,
    value: prefs.assets,
    onChange: set('assets'),
    creatable: true,
    onCreate: create('assets')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Rows per Page",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    options: sizes,
    value: prefs.rows,
    onChange: set('rows'),
    creatable: true,
    onCreate: create('rows')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Receive Album Notifications",
    layout: "row"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: "Receive Album Notifications",
    labelHidden: true,
    checked: prefs.album,
    onChange: e => set('album')(e.target.checked)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Receive Approval / Rejection Notifications",
    layout: "row"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: "Receive Approval / Rejection Notifications",
    labelHidden: true,
    checked: prefs.approval,
    onChange: e => set('approval')(e.target.checked)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Preferred Date Format",
    layout: "inline",
    info: "Accepted formats: yyyy-MM-dd, MM-dd-yyyy, dd-MM-yyyy"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "preferredDateFormat",
    placeholder: "Preferred Date Format",
    value: prefs.dateFormat,
    onChange: e => set('dateFormat')(e.target.value)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Last Viewed Application",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "output",
    variant: "data"
  }, LAST_VIEWED))));
}
function MyAccountPage() {
  const [section, go] = useSection();
  return /*#__PURE__*/_react.default.createElement(_AssetShell.AssetPage, {
    title: "My Account",
    current: "account",
    sideNav: /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavPane, {
      as: "div",
      label: "Settings sections",
      title: "My Account",
      header: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        icon: "home",
        href: "index.html"
      }, "Home"),
      footer: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        icon: "arrow-left",
        href: "index.html"
      }, "Back to Asset Manager")
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
      label: "Settings sections",
      value: section,
      onSelect: go,
      groups: SECTIONS
    }))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsLayout, null, /*#__PURE__*/_react.default.createElement("div", {
    hidden: section !== 'profile'
  }, /*#__PURE__*/_react.default.createElement(Profile, null)), /*#__PURE__*/_react.default.createElement("div", {
    hidden: section !== 'preferences'
  }, /*#__PURE__*/_react.default.createElement(Preferences, null))));
}
  } },
  "dam/app/pages/systemSettingsData.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_ALL = exports.VERSIONS = exports.USERS = exports.SERVER_STATUS = exports.SCHEDULED = exports.ROLES = exports.RESULT_VIEWS = exports.PROPERTIES = exports.PERMISSION_ROLES = exports.PERMISSION_AREAS = exports.LOG_PATH = exports.HOT_FOLDERS = exports.GROUPS = exports.FIELD_TOTAL = exports.FIELDS = exports.ENABLED_FOR = exports.EMAIL_TEMPLATES = exports.EDIT_ALL = exports.DB_TOTAL = exports.DB_TABLES = exports.DB_ROWS = exports.DB_COLUMNS = exports.CUSTOMIZATIONS = exports.CONVERSIONS = exports.CATALOG_TOTAL = exports.CATALOG_PARAMETERS = exports.ASSET_TYPES = exports.ACTIONS = void 0;
/* Plenix asset app · System Settings data (app/pages/systemSettingsData.js).
   DATA: every list here comes from the back end; these are the sample records the page shows until then (the same ones
   the HTML page showed). */

const ROLES = exports.ROLES = ['Administrators', 'Catalogs Admins', 'Uploaders', 'Users', 'Anonymous'];
const PROPERTIES = exports.PROPERTIES = {
  defaultRecordLabel: '${entitytable.name}',
  tabOrdering: '115',
  enableUploading: true,
  enableOnSearch: true,
  defaultResultsView: 'Grid',
  defaultSortField: '',
  uploadSourcepath: 'Module/${entitytableid.name} ${formatteddate} ${formattedyear} ${data.entity_date.yyyy} ${entityid.entityparentid.sourcepath}',
  autoCreateEntities: false,
  rootFolderPath: '',
  autoCreateAtFolderLevel: '0',
  semanticEnabled: true,
  aiSearchPrompt: '',
  aiSearchContains: ''
};
const RESULT_VIEWS = exports.RESULT_VIEWS = ['Columns', 'Gallery', 'Grid', 'Map', 'Table'];
const ENABLED_FOR = exports.ENABLED_FOR = [['Administrators', true], ['Catalogs Admins', true], ['Uploaders', true], ['Users', true], ['Anonymous', false]];
const ACTIONS = exports.ACTIONS = [['View Details', 'All'], ['Edit Metadata', 'Entity Editor, Administrators'], ['Delete', 'Administrators'], ['Download Original', 'Entity Editor, Administrators'], ['Share', 'All']];
const VIEW_ALL = exports.VIEW_ALL = [['Administrators', true], ['Catalogs Admins', true], ['Uploaders', false]];
const EDIT_ALL = exports.EDIT_ALL = [['Administrators', true], ['Catalogs Admins', true]];
const FIELDS = exports.FIELDS = [['Asset Title', 'assettitle', 'textbox'], ['Caption', 'headline', 'textbox'], ['Description', 'longcaption', 'textbox'], ['Categories', 'category', 'list'], ['Asset Type', 'assettype', 'list'], ['Author', 'creator', 'text'], ['Copyright Notice', 'copyrightnotice', 'textbox'], ['Copyright Status', 'copyrightstatus', 'list'], ['Color Space', 'colorspace', 'list'], ['File Format', 'fileformat', 'textbox'], ['File Size', 'filesize', 'number'], ['Created On', 'assetcreationdate', 'date'], ['Asset Expired', 'assetexpired', 'boolean'], ['Face Profiles', 'faceprofiles', 'nested'], ['GEO Location', 'geo_point', 'geo_point']];
const FIELD_TOTAL = exports.FIELD_TOTAL = 214;
const ASSET_TYPES = exports.ASSET_TYPES = [['3D Modeling', 'stl obj gltf glb fbx blend usd usda usdz 3ds dae abc ply wrl x3d step stp iges igs', 0], ['Archives', 'zip rar 7z tar gz bz2 xz cab iso dmg', 1], ['Audio', 'mp3 wav flac aac ogg wma m4a aiff alac opus mid midi amr', 2], ['Documents', 'pdf doc docx ppt pptx xls xlsx rtf odt ods odp txt csv tsv epub pages numbers keynote indd indt idml xml html dita ditamap shtml', 3], ['Fonts', 'ttf otf woff woff2 eot', 4], ['Images', 'jpg jpeg tiff tif gif png webp avif heic heif jxl pbm pgm pnm ppm hdr exr bmp icr tga svg svgz psd psb jp2 cr2 cr3 arw nef nrw orf raf raw2 dng 3fr iiq pef srw x3f gpr rwl dcr mrw erf kdc cdr cdt cmx cpx pat ai eps wmf emf', 5], ['Video', 'mp4 mov avi flv wmv mkv mpg mpeg m4v webm ogv 3gp 3g2 maf ts vob divx rm rmvb asf m2ts mts', 6]];
const HOT_FOLDERS = exports.HOT_FOLDERS = [{
  name: 'Plenix Import',
  enabled: true,
  meta: 'Path: imports · Fully scanned Aug 18, 2026, 3:49 PM'
}];
const CONVERSIONS = exports.CONVERSIONS = [['Image 3000x3000 JPG', 'image3000x3000.jpg', 'Yes', 'Yes', 'Image'], ['Webp Image 3000x3000', 'image3000x3000.webp', 'Yes', 'Yes', 'Image'], ['Webp Image 550x550', 'image550x550.webp', 'Yes', 'Yes', 'Image, Documents, Video'], ['Webp Image 200 Thumbnail', 'image200x200.webp', 'Yes', 'Yes', 'Image, Documents, Video'], ['Webp Image Large Watermarked', 'image3000x3000wm.webp', 'Yes', 'No', 'Image, Documents'], ['Video HLS', 'video.m3u8', 'Yes', 'Yes', 'Video'], ['Video MP4 480p', 'video.mp4', 'Yes', 'No', 'Video'], ['Video Proxy MOV', 'VideoProxy.mov', 'Yes', 'No', 'Video'], ['Mp3 Audio', 'audio.mp3', 'Yes', 'Yes', 'Audio'], ['Document Large Webp Image', 'image3000x3000.webp', 'Yes', 'Yes', 'Documents']];
const USERS = exports.USERS = [['admin', 'Administrator Administrator', 'admin@lighthouseway.org', 'Administrators', 'Dec 18, 2023', 'Sep 1, 2026'], ['agent', 'Plenix Finder AI Helper', '—', null, 'Sep 1, 2026', '—'], ['raphael', 'Fr. Raphael Maher', 'raphael@lighthouseway.org', 'Administrators', 'Sep 1, 2026', 'Sep 19, 2026'], ['testuser', '—', '—', null, 'Dec 18, 2023', 'Feb 13, 2015']];
const GROUPS = exports.GROUPS = ['Administrators', 'Catalogs Admins', 'Uploaders', 'Users'];
const PERMISSION_ROLES = exports.PERMISSION_ROLES = ['Entity Owner', 'Administrators', 'Entity Editor', 'Users', 'Anonymous'];
const PERMISSION_AREAS = exports.PERMISSION_AREAS = [{
  id: 'app',
  label: 'Application',
  total: 34,
  items: [['Application', 'Enables access to the Plenix application.'], ['Home', 'Enables the home button.'], ['Settings', 'Enables access to application management settings.'], ['Multiple Files', 'Enables various actions across multiple assets simultaneously.'], ['Table Columns', 'Enables the customization of search result columns in table view.'], ['Download Original', 'Enables downloading of the original asset.'], ['Edit Users and Groups', 'Allows user to create and edit users or groups.'], ['My Account Area', 'Enables a page that edits user data and updates passwords.'], ['Category Navigation', 'Enables the Category Navigation in the sidebar.'], ['View AI Agent', 'Enables AI Chat Agent.']]
}, {
  id: 'asset',
  label: 'Asset Management',
  total: 65,
  items: [['Upload Files', 'Enables the upload of assets.'], ['Delete', 'Enables removal of an asset, and the option to remove the original.'], ['Share', 'Enables the share button. Parent of email, embed, publish and social media share.'], ['Watermark', 'System-wide watermarking across all assets.'], ['Approve/Reject Workflow', 'Enables Approve/Reject options.'], ['Edit All Assets', 'Allow editing and viewing of any asset.'], ['Permissions', 'Enables permission alteration for media assets.'], ['Media Editor', 'Enables access to Media Editor.'], ['View Faceprofiles', 'View Asset Face Profile Detection.']]
}, {
  id: 'library',
  label: 'Library Management',
  total: 18,
  items: [['Create New Collection', 'Allows creation of new collections.'], ['Create New Library', 'Allows creation of new libraries.'], ['Pick Any Library', 'Asset can be added to any library.'], ['Add files to Bookmarks', 'Enables users to add files to their Bookmarks.']]
}, {
  id: 'api',
  label: 'Programming API',
  total: 4,
  items: [['Programming API', 'Enables REST API access to this catalog.']]
}];
const EMAIL_TEMPLATES = exports.EMAIL_TEMPLATES = [['Administrative notification when assets have been published', 'admintemplate.html'], ['Confirmation email sent to user after assets have been successfully shared', 'usertemplate.html'], ['Email sent when a user shares an asset', 'sharetemplate.html'], ['Email sent when assets are added or removed from a collection', 'collection-count-modified.html'], ['Email sent when assets are approved', 'collection-assets-approved.html'], ['Email sent when assets are rejected', 'collection-assets-rejected.html'], ['Email sent when a user is added to a collection', 'collection-add-new-follower.html'], ['Asset Renewal Notification', 'assetrenew.html']];
const CATALOG_PARAMETERS = exports.CATALOG_PARAMETERS = [['Application Site Title', 'sitetitle', 'Plenix Library'], ['Allow login by Email Address', 'allowloginbyemail', 'true'], ['CDN Prefix', 'cdn_prefix', '—'], ['AWS Bucket', 'awsbucket', '—'], ['AI: Enable Content Creation', 'ai_create_enabled', 'true'], ['AI: OpenAI Model (AI Chat)', 'gpt-model', 'gpt-4o'], ['AI: Ollama Server', 'ollama-url', 'https://ollama.example.com'], ['AI: Translate Server', 'ai_translate_server', 'http://translate.example.com:48991'], ['AI: Vectorizer Server', 'ai_vectorizer_server', 'http://vectorizer.example.com:48981'], ['Face: Faceprofile Server', 'faceprofileserver', '—'], ['Catalog Asset Edit Groups', 'catalogasseteditgroups', 'administrators users'], ['Admin Catalog Asset View Groups', 'catalogassetviewgroups', 'administrators']];
const CATALOG_TOTAL = exports.CATALOG_TOTAL = 'roughly 130';
const SERVER_STATUS = exports.SERVER_STATUS = [['Node ID', 'plenix003'], ['Cluster ID', 'plenix-cluster'], ['Catalog ID', 'finder/catalog']];
const VERSIONS = exports.VERSIONS = [['Plenix Server', '11.2218'], ['Plenix', '11.375'], ['Elasticsearch (Lucene)', '5.5.4'], ['Groovy', '2.4.11'], ['Velocity Engine', '2.3'], ['Apache PDFBox', '2.0.6']];
const LOG_PATH = exports.LOG_PATH = '/opt/plenix/logs/server.log';
const DB_TABLES = exports.DB_TABLES = ['asset', 'category', 'user', 'group', 'order', 'library', 'librarycollection', 'customization', 'entityperson', 'faceprofilegroup', 'module', 'permission'];
const DB_COLUMNS = exports.DB_COLUMNS = ['AI Tags', 'Album', 'Asset Title', 'Asset Type', 'Artist', 'Categories', 'Created On'];
const DB_ROWS = exports.DB_ROWS = [['gold, ornate', '—', 'korban_stamp_010', 'Image', '—', 'Korban Stamp', 'Aug 18, 2026'], ['certificate, church', '—', 'certificate_christ_the_teacher', '3D Models', '—', 'Certificates', 'Aug 15, 2026'], ['cross, gold', 'Website Assets', 'Coptic_Cross_Gold', 'Image', 'Mina Fahim', 'Crosses', 'Aug 10, 2026'], ['baptism, sacrament', '—', 'Certificate_Baptism_v3', 'Documents', '—', 'Certificate - Baptism', 'Aug 8, 2026']];
const DB_TOTAL = exports.DB_TOTAL = {
  records: '4,546',
  pages: 227
};
const CUSTOMIZATIONS = exports.CUSTOMIZATIONS = [['Supporting Table', 'Entity Source Type', 'searchcategory', '9/1/26, 11:30 AM'], ['Module', 'Person', '—', '9/1/26, 11:30 AM'], ['Supporting Table', 'Start Category ID', 'desktopsyncfolder', '9/1/26, 11:30 AM'], ['Module', 'Document', '—', '9/1/26, 11:30 AM'], ['Module', 'Media Profile', '—', '9/1/26, 11:30 AM'], ['Module', 'Categories', '—', '9/1/26, 11:30 AM']];
const SCHEDULED = exports.SCHEDULED = [['Auto assign Entity Image', 'autoassignproxyimage.html', 'Runs: 2,736 · Repeats every 1m'], ['Publish Assets', 'publishassets.html', 'Runs: 541 · Repeats every 5m'], ['Send Collection Chat Notifications', 'notifycollectionchatnotifications.html', 'Runs: 541 · Repeats every 5m'], ['Run media conversions', 'runconversions.html', 'Runs: 550 · Repeats every 5m'], ['Transcript Audio', 'autotranscode.html', 'Runs: 541 · Repeats every 5m'], ['Semantic Index New', 'semanticscan.html', 'Runs: 270 · Repeats every 10m'], ['Import Hot Folders', 'importhotfolders.html', 'Runs: 270 · Repeats every 10m'], ['Check Permission Changes', 'checkpermissionhistory.html', 'Runs: 277 · Repeats every 10m'], ['Apply Google Vision', 'applygooglevision.html', 'Runs: 180 · Repeats every 15m'], ['Apply Google Transcode', 'applygoogletranscode.html', 'Runs: 180 · Repeats every 15m'], ['Asset Metadata Notification', 'assetmetadata.html', 'Runs: 30 · Repeats every 30m']];
  } },
  "dam/app/pages/SystemSettingsPage.jsx": { deps: {"react":null,"plenix-platform":null,"../shell/AssetShell.jsx":"dam/app/shell/AssetShell.jsx","./systemSettingsData.js":"dam/app/pages/systemSettingsData.js"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SystemSettingsPage = SystemSettingsPage;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var _AssetShell = require("../shell/AssetShell.jsx");
var D = _interopRequireWildcard(require("./systemSettingsData.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · System Settings (app/pages/SystemSettingsPage.jsx): catalog-wide configuration in 14 sections.
   Replaces the HTML of settings-system.html (batch 110). The address hash (#properties, #users, …) opens a section and
   follows the navigation; every section stays mounted, so unsaved edits survive switching. Actions that have no back end
   yet confirm with a toast, as the HTML page did. */
const NAV = [{
  heading: 'Content',
  collapsible: true,
  items: [{
    id: 'properties',
    label: 'Properties',
    icon: 'settings-general'
  }, {
    id: 'fields',
    label: 'Fields',
    icon: 'settings-metadata'
  }, {
    id: 'asset-types',
    label: 'Asset Types',
    icon: 'settings-categories'
  }, {
    id: 'hot-folders',
    label: 'Hot Folders',
    icon: 'folder-add'
  }, {
    id: 'transcoding',
    label: 'Transcoding',
    icon: 'settings-camera'
  }]
}, {
  heading: 'People & Access',
  collapsible: true,
  items: [{
    id: 'users',
    label: 'Users',
    icon: 'settings-users'
  }, {
    id: 'groups',
    label: 'Groups',
    icon: 'briefcase'
  }, {
    id: 'permissions',
    label: 'Site Permissions',
    icon: 'settings-permissions'
  }]
}, {
  heading: 'System',
  collapsible: true,
  items: [{
    id: 'email-templates',
    label: 'Email Templates',
    icon: 'settings-email'
  }, {
    id: 'catalog-parameters',
    label: 'Catalog Parameters',
    icon: 'settings-catalog'
  }, {
    id: 'server',
    label: 'Server',
    icon: 'settings-maintenance'
  }, {
    id: 'database',
    label: 'Database',
    icon: 'settings-database'
  }, {
    id: 'customizations',
    label: 'Customizations',
    icon: 'settings-customize'
  }, {
    id: 'scheduler',
    label: 'Scheduler',
    icon: 'settings-scheduler'
  }]
}];
const IDS = NAV.reduce((all, g) => all.concat(g.items.map(i => i.id)), []);

/* ── small parts shared by the sections ── */
const CountNote = ({
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  as: "p",
  variant: "secondary",
  className: "plx-u-mt-stack-sm"
}, children);
const Lead = ({
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  as: "p",
  variant: "secondary",
  className: "plx-u-mb-stack-md"
}, children);
// a group title: the first in its panel sits at the top; the others keep space above them
const Sub = ({
  first,
  flush,
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  as: "h3",
  variant: "heading",
  className: flush ? undefined : first ? 'plx-u-mb-stack-sm' : 'plx-u-mt-stack-lg plx-u-mb-stack-sm'
}, children);
function useAct() {
  const toast = (0, _plenixPlatform.useToast)();
  return (label, tone = 'success') => () => toast.show(label, {
    tone
  });
}
const B = ({
  icon,
  label,
  tone,
  act,
  variant,
  ...rest
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, _extends({
  size: "sm",
  icon: icon,
  variant: variant,
  onClick: act(label, tone)
}, rest), label);
const Bar = ({
  children,
  label
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar, {
  label: label,
  className: "plx-u-gap-cluster-sm plx-u-mb-stack-md"
}, children);
const Search = ({
  value,
  onChange,
  label
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
  width: "lg",
  push: true
}, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
  value: value,
  onChange: e => onChange(e.target.value),
  onClear: () => onChange(''),
  label: label,
  placeholder: label + '...'
}));
const match = (q, row) => !q || row.some(c => String(c || '').toLowerCase().indexOf(q.toLowerCase()) >= 0);
const rowsOf = (list, keys) => list.map((r, i) => Object.assign({
  id: i
}, ...keys.map((k, j) => ({
  [k]: r[j]
}))));
const switchCol = header => ({
  key: 'on',
  header,
  render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: r.name + ': ' + header,
    labelHidden: true,
    checked: r.on,
    onChange: () => r.toggle()
  })
});
function useToggles(list) {
  const [on, setOn] = _react.default.useState(list.map(r => r[1]));
  return list.map((r, i) => ({
    id: i,
    name: r[0],
    on: on[i],
    toggle: () => setOn(on.map((v, j) => j === i ? !v : v))
  }));
}
const Actions = ({
  act,
  save = 'Save',
  del = 'Delete'
}) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  type: "submit",
  variant: "primary"
}, save), del ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  variant: "danger-secondary",
  onClick: act(del, 'warning')
}, del) : null);
const Form = ({
  act,
  saved,
  children
}) => /*#__PURE__*/_react.default.createElement("form", {
  noValidate: true,
  onSubmit: e => {
    e.preventDefault();
    act(saved, 'success')();
  }
}, children);

/* ── Content ── */
function Properties({
  act
}) {
  const [p, setP] = _react.default.useState(D.PROPERTIES);
  const [views, setViews] = _react.default.useState(D.RESULT_VIEWS.map(v => ({
    value: v,
    label: v
  })));
  const text = (k, extra) => ({
    value: p[k],
    onChange: e => setP({
      ...p,
      [k]: e.target.value
    }),
    name: k,
    ...extra
  });
  const sw = (k, label) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: label,
    layout: "row"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: label,
    labelHidden: true,
    checked: p[k],
    onChange: e => setP({
      ...p,
      [k]: e.target.checked
    })
  }));
  const enabled = useToggles(D.ENABLED_FOR),
    viewAll = useToggles(D.VIEW_ALL),
    editAll = useToggles(D.EDIT_ALL);
  const roleCol = {
    key: 'name',
    header: 'Group / Role',
    emphasis: true
  };
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Files Properties",
    description: "Module-level configuration for the asset table.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Files properties",
    items: [{
      value: 'props',
      label: 'Properties',
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: "plx-settings__rows"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Default Record Label",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('defaultRecordLabel'))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Tab Ordering",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('tabOrdering'))), sw('enableUploading', 'Enable Uploading'), sw('enableOnSearch', 'Enable On Search'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Default Results View",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
        options: views,
        value: p.defaultResultsView,
        onChange: v => setP({
          ...p,
          defaultResultsView: v
        }),
        creatable: true,
        onCreate: t => {
          const v = t.trim();
          if (v) {
            setViews(views.concat({
              value: v,
              label: v
            }));
            setP({
              ...p,
              defaultResultsView: v
            });
          }
        }
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Default Sort Field",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('defaultSortField', {
        placeholder: 'Default Sort Field'
      }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Upload Sourcepath",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('uploadSourcepath'))), sw('autoCreateEntities', 'Auto Create Entities'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Root Folder Path",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('rootFolderPath', {
        placeholder: 'Root Folder Path'
      }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Auto Create At Folder Level",
        layout: "inline",
        info: "Scan deep A/B/C, B = 2"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('autoCreateAtFolderLevel'))), sw('semanticEnabled', 'Semantic Enabled'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "AI Search Prompt",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, text('aiSearchPrompt', {
        placeholder: 'AI Search Prompt'
      }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "AI Search Contains",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, text('aiSearchContains', {
        placeholder: 'AI Search Contains'
      }))))
    }, {
      value: 'enabled',
      label: 'Enabled For',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Enabled for",
        pinFirst: true,
        rows: enabled,
        columns: [roleCol, switchCol('Enabled')]
      })
    }, {
      value: 'actions',
      label: 'Actions',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Actions",
        pinFirst: true,
        rows: rowsOf(D.ACTIONS, ['name', 'roles']),
        columns: [{
          key: 'name',
          header: 'Action',
          emphasis: true
        }, {
          key: 'roles',
          header: 'Roles'
        }, {
          key: 'status',
          header: 'Status',
          render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
            tone: "success"
          }, "Active")
        }]
      })
    }, {
      value: 'view-all',
      label: 'View All Folders',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Lead, null, "Groups and roles that can view all folders for this module."), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "View all folders",
        pinFirst: true,
        rows: viewAll,
        columns: [roleCol, switchCol('View All')]
      }))
    }, {
      value: 'edit-all',
      label: 'Edit All Folders',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Lead, null, "Groups and roles that can edit all folders for this module."), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Edit all folders",
        pinFirst: true,
        rows: editAll,
        columns: [roleCol, switchCol('Edit All')]
      }))
    }]
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__actions"
  }, /*#__PURE__*/_react.default.createElement(Actions, {
    act: act
  })));
}
function Fields({
  act
}) {
  const [q, setQ] = _react.default.useState('');
  const rows = rowsOf(D.FIELDS.filter(r => match(q, r)), ['name', 'id2', 'type']);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Fields",
    description: "The metadata field registry for assets \u2014 every field's name, internal ID, and type.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Fields",
    items: [{
      value: 'fields',
      label: 'Fields',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Bar, {
        label: "Field actions"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
        name: "newFieldName",
        width: "lg",
        placeholder: "New field name...",
        "aria-label": "New field name"
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "add",
        label: "Add Field",
        act: act
      }), /*#__PURE__*/_react.default.createElement(Search, {
        value: q,
        onChange: setQ,
        label: 'Search ' + D.FIELD_TOTAL + ' fields'
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Fields",
        pinFirst: true,
        rows: rows,
        empty: "No fields match",
        columns: [{
          key: 'name',
          header: 'Field Name',
          emphasis: true
        }, {
          key: 'id2',
          header: 'ID',
          data: true
        }, {
          key: 'type',
          header: 'Field Type'
        }]
      }), /*#__PURE__*/_react.default.createElement(CountNote, null, 'Showing ' + rows.length + ' of ' + D.FIELD_TOTAL + ' fields'))
    }, {
      value: 'edit-views',
      label: 'Edit Views',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Configure which fields appear on the asset edit form, and in what order.")
    }, {
      value: 'app-views',
      label: 'Application Views',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Configure which fields appear in application-wide views such as search results and tables.")
    }]
  }));
}
function AssetTypes({
  act
}) {
  const [types, setTypes] = _react.default.useState(D.ASSET_TYPES.map(([name, ext, order]) => ({
    name,
    ext,
    paths: '',
    order: String(order)
  })));
  const edit = (i, k) => e => setTypes(types.map((t, j) => j === i ? {
    ...t,
    [k]: e.target.value
  } : t));
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save Changes"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Asset Types",
    description: "The file-format categories assets are classified under, used to route transcoding and preview generation.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Asset type actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Add Asset Type",
    act: act
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Asset types",
    items: types.map((t, i) => ({
      value: String(i),
      label: D.ASSET_TYPES[i][0],
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: "plx-settings__rows"
      }, /*#__PURE__*/_react.default.createElement(Sub, {
        first: true
      }, "Properties"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Name",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
        name: "name",
        value: t.name,
        onChange: edit(i, 'name')
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Extensions",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, {
        name: "extensions",
        value: t.ext,
        onChange: edit(i, 'ext')
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Paths",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
        name: "paths",
        placeholder: "Paths",
        value: t.paths,
        onChange: edit(i, 'paths')
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Ordering",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
        name: "ordering",
        width: "sm",
        value: t.order,
        onChange: edit(i, 'order')
      })))
    }))
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__actions"
  }, /*#__PURE__*/_react.default.createElement(Actions, {
    act: act,
    save: "Save Changes"
  })));
}
function HotFolders({
  act
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Hot Folders",
    description: "Watched folders that are automatically scanned and imported as assets.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Hot folder actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Add Hot Folder",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "schedule",
    label: "Schedule Importing",
    act: act
  })), D.HOT_FOLDERS.map(f => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    key: f.name,
    gap: "md"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
    name: "folder",
    size: "lg"
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "none",
    grow: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, f.name), f.enabled ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
    tone: "success"
  }, "Enabled") : null), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, f.meta)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    iconOnly: true,
    icon: "pencil",
    label: 'Edit ' + f.name,
    onClick: act('Edit', 'info')
  })))));
}
function Transcoding({
  act
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Transcoding",
    description: "Conversion presets generated for each uploaded asset, by media type.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Transcoding",
    items: [{
      value: 'presets',
      label: 'Preset Configuration',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Bar, {
        label: "Conversion actions"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "add",
        label: "Add New Conversion",
        act: act
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Conversion presets",
        pinFirst: true,
        rows: rowsOf(D.CONVERSIONS, ['name', 'file', 'system', 'onImport', 'media']),
        columns: [{
          key: 'name',
          header: 'Conversion',
          emphasis: true
        }, {
          key: 'file',
          header: 'Generated File',
          data: true
        }, {
          key: 'system',
          header: 'System Defined'
        }, {
          key: 'onImport',
          header: 'On Import'
        }, {
          key: 'media',
          header: 'Media Type'
        }]
      }))
    }, {
      value: 'publishing',
      label: 'Publishing',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Configure which conversions are pushed to publishing targets.")
    }]
  }));
}

/* ── People & Access ── */
function Users({
  act
}) {
  const [q, setQ] = _react.default.useState('');
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Users",
    description: "Manage user accounts and view login activity.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "User actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Create User",
    act: act
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
    label: "Maintenance"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "import",
    label: "Import / Export",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "refresh",
    label: "Reindex",
    tone: "info",
    act: act
  })), /*#__PURE__*/_react.default.createElement(Search, {
    value: q,
    onChange: setQ,
    label: "Search users"
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: "Users",
    pinFirst: true,
    empty: "No users match",
    rows: rowsOf(D.USERS.filter(r => match(q, r)), ['user', 'name', 'email', 'role', 'created', 'login']),
    columns: [{
      key: 'user',
      header: 'Username',
      emphasis: true
    }, {
      key: 'name',
      header: 'Name'
    }, {
      key: 'email',
      header: 'Email'
    }, {
      key: 'role',
      header: 'Role',
      render: r => r.role ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
        tone: "info"
      }, r.role) : '—'
    }, {
      key: 'created',
      header: 'Created',
      data: true
    }, {
      key: 'login',
      header: 'Last Login',
      data: true
    }]
  })));
}
function Groups({
  act
}) {
  const [names, setNames] = _react.default.useState(D.GROUPS);
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save Changes"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Groups",
    description: "Groups a user can be assigned to. Permissions are configured separately under Site Permissions.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Group actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Add Group",
    act: act
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Groups",
    items: D.GROUPS.map((g, i) => ({
      value: String(i),
      label: g,
      content: /*#__PURE__*/_react.default.createElement("div", {
        className: "plx-settings__rows"
      }, /*#__PURE__*/_react.default.createElement(Sub, {
        first: true
      }, "Properties"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Name",
        layout: "inline"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
        name: "name",
        value: names[i],
        onChange: e => setNames(names.map((n, j) => j === i ? e.target.value : n))
      })))
    }))
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__actions"
  }, /*#__PURE__*/_react.default.createElement(Actions, {
    act: act,
    save: "Save Changes",
    del: "Delete Group"
  })));
}
function Permissions({
  act
}) {
  const [role, setRole] = _react.default.useState('Administrators');
  const [area, setArea] = _react.default.useState('Show All');
  const [checked, setChecked] = _react.default.useState(() => Object.fromEntries(D.PERMISSION_AREAS.flatMap(a => a.items.map(it => [a.id + ':' + it[0], true]))));
  const areas = D.PERMISSION_AREAS.filter(a => area === 'Show All' || a.label === area);
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Site Permissions",
    description: "Individually named permissions, grouped by area, assigned per role.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true,
    headingLevel: 3,
    title: "Select a Role",
    description: "Choose the role you want to configure. The permissions below apply only to that role \u2014 use View to narrow the list to a single area, or leave it on Show All to see everything at once."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Role",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "role",
    value: role,
    onChange: e => setRole(e.target.value)
  }, D.PERMISSION_ROLES.concat('+ Add New Role').map(r => /*#__PURE__*/_react.default.createElement("option", {
    key: r
  }, r)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "View",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "view",
    value: area,
    onChange: e => setArea(e.target.value)
  }, ['Show All'].concat(D.PERMISSION_AREAS.map(a => a.label)).map(r => /*#__PURE__*/_react.default.createElement("option", {
    key: r
  }, r))))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    key: area,
    variant: "contained",
    label: 'Permissions for ' + role,
    items: areas.map(a => ({
      value: a.id,
      label: a.label,
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, a.items.map(it => {
        const k = a.id + ':' + it[0];
        return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
          key: k,
          name: k,
          label: it[0],
          description: it[1],
          checked: !!checked[k],
          onChange: e => setChecked({
            ...checked,
            [k]: e.target.checked
          })
        });
      })), /*#__PURE__*/_react.default.createElement(CountNote, null, 'Showing ' + a.items.length + ' of ' + a.total + ' permissions in this view'))
    }))
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__actions"
  }, /*#__PURE__*/_react.default.createElement(Actions, {
    act: act
  })));
}

/* ── System ── */
function EmailTemplates({
  act
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Email Templates",
    description: "The notification emails the catalog sends, and the template file behind each one.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: "Email templates",
    pinFirst: true,
    rows: rowsOf(D.EMAIL_TEMPLATES, ['name', 'file']),
    columns: [{
      key: 'name',
      header: 'Template',
      emphasis: true
    }, {
      key: 'file',
      header: 'File',
      data: true
    }, {
      key: 'actions',
      header: 'Actions',
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "link",
        "aria-label": 'Edit ' + r.name,
        onClick: act('Edit ' + r.file, 'info')
      }, "Edit")
    }]
  })));
}
function CatalogParameters({
  act
}) {
  const [q, setQ] = _react.default.useState('');
  const rows = D.CATALOG_PARAMETERS.filter(r => match(q, r));
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save Changes"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Catalog Parameters",
    description: "Catalog-wide configuration keys \u2014 storage, AI providers, and access defaults.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true,
    actions: null
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    wrap: true,
    className: "plx-u-gap-cluster-sm plx-u-mb-stack-md"
  }, /*#__PURE__*/_react.default.createElement(Search, {
    value: q,
    onChange: setQ,
    label: "Search catalog settings"
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList, null, rows.map(([label, id, value]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
    key: id,
    label: label,
    description: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, id),
    data: true
  }, value))), /*#__PURE__*/_react.default.createElement(CountNote, null, 'Showing ' + rows.length + ' of ' + D.CATALOG_TOTAL + ' catalog settings')), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-settings__actions"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    type: "submit",
    variant: "primary"
  }, "Save Changes")));
}
function Server({
  act
}) {
  const kv = list => /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList, null, list.map(([k, v]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
    key: k,
    label: k,
    data: true
  }, v)));
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Server",
    description: "Database cluster status, software versions, and application logs.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Server",
    items: [{
      value: 'database',
      label: 'Database',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Sub, {
        first: true
      }, "Server Status"), kv(D.SERVER_STATUS), /*#__PURE__*/_react.default.createElement("div", {
        className: "plx-u-mt-stack-md"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
        label: "Server status actions"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "refresh",
        label: "Clear Cached Data",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "database",
        label: "Change Elasticsearch Database Master",
        tone: "info",
        act: act
      }))), /*#__PURE__*/_react.default.createElement(Sub, null, "Data Management"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
        label: "Data management"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "refresh",
        label: "Reindex",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "alert",
        label: "View Mapping Conflicts",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "list-bullets",
        label: "View Basic Mappings",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "import",
        label: "Reload Sets",
        tone: "info",
        act: act
      })), /*#__PURE__*/_react.default.createElement(Sub, null, "Database Snapshots"), /*#__PURE__*/_react.default.createElement(Lead, null, "Snapshots are used by Elasticsearch to store and restore database data."), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(B, {
        icon: "snapshot",
        label: "View Snapshots",
        tone: "info",
        act: act
      })), /*#__PURE__*/_react.default.createElement(Sub, null, "Data Entities"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
        label: "Data entities"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "add",
        label: "Create",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "save-doc",
        label: "Save All Modules",
        act: act
      })))
    }, {
      value: 'versions',
      label: 'Versions',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, kv(D.VERSIONS), /*#__PURE__*/_react.default.createElement(CountNote, null, "Full dependency list runs to 100+ jars \xB7 ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "link",
        onClick: act('View all', 'info')
      }, "View all")))
    }, {
      value: 'logs',
      label: 'Logs',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.CodeBlock, null, D.LOG_PATH)
    }]
  }));
}
function Database({
  act
}) {
  const [table, setTable] = _react.default.useState('asset');
  const [q, setQ] = _react.default.useState('');
  const [expanded, setExpanded] = _react.default.useState(false);
  const rows = D.DB_ROWS.filter(r => match(q, r)).map((r, i) => Object.assign({
    id: i
  }, ...D.DB_COLUMNS.map((c, j) => ({
    ['c' + j]: r[j]
  }))));
  const columns = D.DB_COLUMNS.map((c, j) => ({
    key: 'c' + j,
    header: c,
    emphasis: c === 'Asset Title',
    data: c === 'Created On'
  }));
  const grid = cap => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: cap,
    pinFirst: true,
    rows: rows,
    columns: columns,
    empty: "No records match"
  });
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Database",
    description: "Browse, edit, import, or export any underlying data table.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "between",
    wrap: true,
    className: "plx-u-gap-cluster-sm plx-u-mb-stack-md"
  }, /*#__PURE__*/_react.default.createElement(Sub, {
    flush: true
  }, 'Table: ' + table), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    className: "plx-u-w-200px"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    label: "Table",
    options: D.DB_TABLES.map(t => ({
      value: t,
      label: t
    })),
    value: table,
    onChange: setTable
  })), /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "New Table",
    tone: "info",
    act: act
  }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: 'Table ' + table,
    items: [{
      value: 'data',
      label: 'Data',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Bar, {
        label: "Record actions"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "add",
        label: "Add New",
        act: act
      }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
        label: "Transfer"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "refresh",
        label: "Reindex",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "import",
        label: "Import",
        act: act
      }), /*#__PURE__*/_react.default.createElement(B, {
        icon: "export",
        label: "Export",
        tone: "info",
        act: act
      })), /*#__PURE__*/_react.default.createElement(B, {
        icon: "doc-text",
        label: "Export Text",
        tone: "info",
        act: act
      }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        iconOnly: true,
        icon: "close",
        label: "Reset Settings",
        onClick: act('Settings reset', 'info')
      }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Menu, {
        label: "Delete",
        trigger: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "sm",
          variant: "danger-secondary",
          icon: "trash",
          caret: true
        }, "Delete")
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
        icon: "trash",
        danger: true,
        onSelect: act('Delete ' + D.DB_TOTAL.records + ' Records', 'warning')
      }, 'Delete ' + D.DB_TOTAL.records + ' Records'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
        icon: "trash",
        danger: true,
        onSelect: act('Delete Table', 'warning')
      }, "Delete Table")), /*#__PURE__*/_react.default.createElement(Search, {
        value: q,
        onChange: setQ,
        label: "Search"
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
        justify: "end",
        className: "plx-u-mb-stack-sm"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        icon: "expand",
        onClick: () => setExpanded(true)
      }, "Expand")), grid('Table: ' + table), /*#__PURE__*/_react.default.createElement(CountNote, null, 'Found ' + D.DB_TOTAL.records + ' Records · Page 1 of ' + D.DB_TOTAL.pages + ' · ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "link",
        onClick: act('Forward', 'info')
      }, "Forward \xBB")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
        open: expanded,
        onClose: () => setExpanded(false),
        title: 'Table: ' + table,
        icon: "expand",
        size: "full"
      }, grid('Table: ' + table + ', expanded')))
    }, {
      value: 'fields',
      label: 'Customize Fields',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Configure the fields available on this table \u2014 the same editor as Files > Fields, scoped to this table.")
    }, {
      value: 'views',
      label: 'Customize Views',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Configure how records in this table are displayed in lists and edit forms.")
    }, {
      value: 'elastic',
      label: 'Elastic System Info',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Raw Elasticsearch mapping and index info for this table.")
    }]
  })));
}
function Customizations({
  act
}) {
  const rows = rowsOf(D.CUSTOMIZATIONS, ['type', 'name', 'modules', 'date']);
  const [sel, setSel] = _react.default.useState(rows.map(r => r.id));
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Customizations",
    description: "Track configuration changes across modules, and export or import them between environments.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    card: true
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Customization actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "refresh",
    label: "Scan for Changes",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
    label: "Transfer"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "export",
    label: "Export",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "import",
    label: "Import",
    act: act
  })), /*#__PURE__*/_react.default.createElement(B, {
    icon: "trash",
    label: "Delete",
    tone: "warning",
    variant: "danger-secondary",
    act: act
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: "Customizations",
    selectable: true,
    selected: sel,
    onSelectionChange: setSel,
    rows: rows,
    columns: [{
      key: 'type',
      header: 'Type'
    }, {
      key: 'name',
      header: 'Customization'
    }, {
      key: 'modules',
      header: 'Modules',
      data: true
    }, {
      key: 'date',
      header: 'Date',
      data: true
    }]
  })));
}
function Scheduler({
  act
}) {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Scheduler",
    description: "Recurring background tasks, the events that trigger them, and the scripts they run.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Scheduler",
    items: [{
      value: 'scheduled',
      label: 'Scheduled',
      content: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Bar, {
        label: "Scheduled task actions"
      }, /*#__PURE__*/_react.default.createElement(B, {
        icon: "refresh",
        label: "Refresh",
        tone: "info",
        act: act
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
        caption: "Scheduled tasks",
        pinFirst: true,
        rows: rowsOf(D.SCHEDULED, ['name', 'path', 'status']),
        columns: [{
          key: 'name',
          header: 'Name',
          emphasis: true
        }, {
          key: 'path',
          header: 'Path',
          data: true
        }, {
          key: 'status',
          header: 'Status'
        }]
      }))
    }, {
      value: 'events',
      label: 'Events',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Events that trigger scripts to run, such as an asset upload or a metadata change.")
    }, {
      value: 'scripts',
      label: 'Scripts',
      content: /*#__PURE__*/_react.default.createElement(Lead, null, "Groovy scripts that scheduled tasks and events run.")
    }]
  }));
}
const SECTIONS = {
  properties: Properties,
  fields: Fields,
  'asset-types': AssetTypes,
  'hot-folders': HotFolders,
  transcoding: Transcoding,
  users: Users,
  groups: Groups,
  permissions: Permissions,
  'email-templates': EmailTemplates,
  'catalog-parameters': CatalogParameters,
  server: Server,
  database: Database,
  customizations: Customizations,
  scheduler: Scheduler
};
function useSection() {
  const read = () => {
    const h = location.hash.slice(1);
    return IDS.indexOf(h) >= 0 ? h : 'properties';
  };
  const [section, setSection] = _react.default.useState(read);
  _react.default.useEffect(() => {
    const on = () => setSection(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = id => {
    if (IDS.indexOf(id) < 0) return;
    history.replaceState(null, '', '#' + id);
    setSection(id);
  };
  return [section, go];
}
function Content({
  section
}) {
  const act = useAct();
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsLayout, null, IDS.map(id => {
    const S = SECTIONS[id];
    return /*#__PURE__*/_react.default.createElement("div", {
      key: id,
      hidden: section !== id
    }, /*#__PURE__*/_react.default.createElement(S, {
      act: act
    }));
  }));
}
function SystemSettingsPage() {
  const [section, go] = useSection();
  return /*#__PURE__*/_react.default.createElement(_AssetShell.AssetPage, {
    title: "System Settings",
    current: "system",
    sideNav: /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavPane, {
      as: "div",
      label: "Settings sections",
      title: "System Settings",
      header: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        icon: "home",
        href: "index.html"
      }, "Home"),
      footer: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        icon: "arrow-left",
        href: "index.html"
      }, "Back to Asset Manager")
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
      label: "Settings sections",
      value: section,
      onSelect: go,
      groups: NAV
    }))
  }, /*#__PURE__*/_react.default.createElement(Content, {
    section: section
  }));
}
  } },
  "dam/app/pages/home/homeData.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VERSIONS = exports.USAGE_RIGHTS = exports.TRASH = exports.SORT_OPTIONS = exports.SEARCH_QUERY = exports.SEARCH_COUNT = exports.SAVED_SEARCHES = exports.RECENT_IMPORTS = exports.FOLDERS_OPEN = exports.FOLDERS = exports.COLLECTION_DETAIL = exports.COLLECTION_CARDS = exports.COLLECTIONS = exports.CATEGORY_TOTAL = exports.CATEGORY_DOWNLOADS = exports.CATEGORY_DETAIL = exports.CATEGORY_COUNT_LABEL = exports.CATEGORY_CARDS = exports.CATEGORIES_SHOWN = exports.CATEGORIES = exports.CARD_MENU = exports.ASSET_TOTAL = exports.ASSET_STATUSES = exports.ASSET_DOWNLOADS = exports.ASSETS = void 0;
/* Plenix asset app · home page data (app/pages/home/homeData.js).
   DATA: every list here comes from the back end; these are the sample records the home page showed in HTML and in
   plenix.js (CATEGORIES, COLLECTIONS, assetData) until then, unchanged. Thumbnails are the stand-in images in assets/. */

const folder = (name, children) => ({
  id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  label: name,
  icon: 'folder',
  children
});
const FOLDERS = exports.FOLDERS = [folder('All', [folder('Digital Assets', [folder('Banner Icon'), folder('Bookshelf'), folder('Borders', [folder('Arch'), folder('Banner'), folder('Circular'), folder('Divider'), folder('Linear'), folder('Page')]), folder('Branding', [folder('Churches'), folder('CYC'), folder('Diakonia'), folder('LACopts')]), folder('Certificates'), folder('Clergy'), folder('Crosses'), folder('Embroideries'), folder('Fonts')]), folder('Documents', [folder('Manuals'), folder('Templates')]), folder('Facial Profiles'), folder('Users')])];
const FOLDERS_OPEN = exports.FOLDERS_OPEN = ['all', 'digital-assets'];

// the sidebar lists (the first row of each is the "All …" view)
const CATEGORIES = exports.CATEGORIES = [['All Categories', '4,546', true], ['Branding', '326', true], ['Crosses', '1,284', true], ['Banner Icon', '18'], ['Bookshelf', '18'], ['Borders', '245'], ['Certificates', '387'], ['Clergy', '512'], ['Covers', '198'], ['Dome', '14'], ['Embroideries', '31'], ['Fonts', '22'], ['Galloons', '27'], ['Korban Stamp', '8'], ['Ornamental Elements', '45'], ['Presentation Folders', '12']].map(([name, count, pinned]) => ({
  name,
  count,
  pinned: !!pinned
}));
const CATEGORIES_SHOWN = exports.CATEGORIES_SHOWN = 7;
const COLLECTIONS = exports.COLLECTIONS = [['All Collections', '305', true], ['Website Assets', '84', true], ['Social Media', '42', true], ['Print Ready', '156'], ['Needs Review', '23']].map(([name, count, pinned]) => ({
  name,
  count,
  pinned: !!pinned
}));
// a saved search keeps its query and filters; opening it restores them in the Search workspace
const SAVED_SEARCHES = exports.SAVED_SEARCHES = [{
  name: 'High-res crosses',
  query: 'cross',
  filters: {}
}, {
  name: 'Untagged assets',
  query: '',
  filters: {
    status: 'New'
  }
}, {
  name: 'Large files >50MB',
  query: '',
  filters: {
    type: ['PSD']
  }
}];
const RECENT_IMPORTS = exports.RECENT_IMPORTS = [['Aug 31, 2026', 28], ['Aug 24, 2026', 112], ['Aug 15, 2026', 67]];
const TRASH = exports.TRASH = [['Deleted Assets', 12]];
const CATEGORY_CARDS = exports.CATEGORY_CARDS = [['Banner Icon', 24, 5, 'Aug 28, 2026'], ['Bookshelf', 18, 6, 'Aug 25, 2026'], ['Borders - Arch', 31, 7, 'Aug 22, 2026'], ['Borders - Circular', 42, 8, 'Aug 20, 2026'], ['Branding - Churches', 28, 9, 'Aug 18, 2026'], ['Branding - CYC', 5, 10, 'Aug 15, 2026'], ['Branding - Diakonia', 15, 11, 'Aug 12, 2026'], ['Certificate - Baptism', 89, 12, 'Aug 10, 2026'], ['Certificate - Masters', 47, 13, 'Aug 8, 2026'], ['Clergy - Metropolitan Serapion', 62, 14, 'Aug 5, 2026'], ['Clergy - Pope Shenouda III', 210, 15, 'Aug 2, 2026'], ['Clergy - Pope Tawadros II', 45, 16, 'Jul 30, 2026'], ['Cross - Traditional', 78, 17, 'Jul 25, 2026'], ['Dome', 33, 18, 'Jul 20, 2026'], ['Embroideries', 156, 19, 'Jul 15, 2026'], ['Fonts', 18, 20, 'Jul 10, 2026']].map(([name, count, thumb, modified], i) => ({
  id: i,
  name,
  count,
  thumb: 'assets/thumb-' + thumb + '.svg',
  modified,
  status: 'Active'
}));
const CATEGORY_TOTAL = exports.CATEGORY_TOTAL = 48;
const CATEGORY_COUNT_LABEL = exports.CATEGORY_COUNT_LABEL = '52 categories';
const COLLECTION_CARDS = exports.COLLECTION_CARDS = [['Website Assets', 84, 'Aug 28, 2026', 'raphael'], ['Social Media', 42, 'Aug 25, 2026', 'raphael'], ['Print Ready', 156, 'Aug 20, 2026', 'sarah'], ['Needs Review', 23, 'Aug 14, 2026', 'daniel']].map(([name, count, updated, owner], i) => ({
  id: i,
  name,
  count,
  updated,
  owner
}));
const ASSETS = exports.ASSETS = [['Coptic Cross Gold Traditional', 'Cross - Traditional', 'Coptic_Cross_Gold.ai', 'Adobe Illustrator (.ai)', 'AI', '18.7 MB', '2400 × 3200 px', 'Aug 12, 2026', 'Complete'], ['Cross Gold Ornate Large', 'Cross - Majestic', 'Cross_Gold_Ornate.psd', 'Photoshop (.psd)', 'PSD', '42.1 MB', '4800 × 6400 px', 'Aug 10, 2026', 'Complete'], ['Cross Gold Pectoral', 'Cross - Pectoral Silver', 'Cross_Gold_Pectoral.ai', 'Adobe Illustrator (.ai)', 'AI', '8.3 MB', '1200 × 1600 px', 'Aug 8, 2026', 'Complete'], ['Gold Cross Floral Border', 'Cross - Floral', 'Gold_Cross_Floral.png', 'PNG', 'PNG', '4.2 MB', '2000 × 2000 px', 'Jul 28, 2026', 'New'], ['Cross Gold Diamond Pattern', 'Cross - Diamond', 'Cross_Gold_Diamond.ai', 'Adobe Illustrator (.ai)', 'AI', '12.6 MB', '3000 × 3000 px', 'Jul 22, 2026', 'Complete'], ['Gold Cross Iconostasis', 'Cross - Iconostasis', 'Gold_Cross_Iconostasis.jpg', 'JPEG', 'JPG', '1.8 MB', '1920 × 2560 px', 'Jul 15, 2026', 'Complete'], ['Cross Gold Procession', 'Cross - Procession', 'Cross_Gold_Procession.psd', 'Photoshop (.psd)', 'PSD', '28.4 MB', '4000 × 5000 px', 'Jul 10, 2026', 'New'], ['Gold Coptic Cross Linear', 'Cross - Linear', 'Gold_Coptic_Linear.ai', 'Adobe Illustrator (.ai)', 'AI', '6.1 MB', '1800 × 2400 px', 'Jul 5, 2026', 'Complete']].map(([name, cat, file, fmt, badge, size, dims, date, status], i) => ({
  id: i,
  name,
  cat,
  file,
  fmt,
  badge,
  size,
  dims,
  date,
  status,
  thumb: 'assets/thumb-' + (21 + i) + '.svg',
  typeIcon: 'file-' + badge.toLowerCase(),
  tags: name.toLowerCase().split(' '),
  owner: ['Raphael Maher', 'Sarah M.', 'John Deacon'][i % 3]
}));
const ASSET_TOTAL = exports.ASSET_TOTAL = 210;
const SEARCH_QUERY = exports.SEARCH_QUERY = 'cross gold';
const SEARCH_COUNT = exports.SEARCH_COUNT = 24;
const SORT_OPTIONS = exports.SORT_OPTIONS = ['Relevance', 'Newest', 'Oldest', 'Name A-Z', 'Name Z-A', 'Size ▼', 'Size ▲', 'Modified'];

// the details pane for a category (and the collection shown in the collections view)
const CATEGORY_DETAIL = exports.CATEGORY_DETAIL = {
  name: 'Cross - Traditional',
  count: '78 assets',
  parent: 'Categories (root)',
  parents: ['Categories (root)', 'Borders', 'Branding', 'Clergy', 'Crosses'],
  // plx-allow-hex on the next line: the category color a person chose, a stored value
  order: '8',
  color: '#d4a843' /* plx-allow-hex */,
  copyright: 'Coptic Orthodox Church',
  rights: 'Internal',
  rightsOptions: ['Internal', 'Commercial', 'Editorial', 'Public Domain'],
  rating: 0,
  description: 'Traditional Coptic cross designs and variations',
  tags: ['cross', 'traditional', 'coptic'],
  stats: [['Total Assets', '78'], ['Storage Used', '1.4 GB'], ['Created', 'Jul 3, 2026'], ['Modified', 'Aug 28, 2026']],
  permissions: [['Owner', 'raphael'], ['View Groups', 'administrators, users, guest'], ['Edit Groups', 'administrators']],
  customFields: [['Style', 'e.g. Byzantine, Nubian...'], ['Material', 'e.g. Wood, Stone, Metal...'], ['Origin', 'e.g. Egypt, Ethiopia...']]
};
const COLLECTION_DETAIL = exports.COLLECTION_DETAIL = {
  name: 'Website Assets',
  count: '84 assets'
};
const CATEGORY_DOWNLOADS = exports.CATEGORY_DOWNLOADS = [{
  title: 'Download Entire Category',
  items: [['file-zip', 'All Files (Source)', '78 files · ~1.4 GB']]
}, {
  title: 'Download by File Type',
  items: [['file-ai', 'Adobe Illustrator (.ai)', '42 files · ~820 MB'], ['file-png', 'PNG Images', '78 files · ~340 MB'], ['file-jpg', 'JPEG Thumbnails', '78 files · ~18 MB'], ['file-svg', 'SVG Vectors', '35 files · ~12 MB'], ['file-pdf', 'PDF Print-Ready', '42 files · ~280 MB']]
}, {
  title: 'Variations',
  items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '78 files · ~45 MB'], ['file-png', 'Social Media (1080×1080)', '78 files · ~62 MB']]
}];
const ASSET_DOWNLOADS = exports.ASSET_DOWNLOADS = [{
  title: 'Download by File Type',
  items: [['file-png', 'Preview.png', '4.2 MB'], ['file-jpg', 'Web.jpg', '245 KB']]
}, {
  title: 'Variations',
  items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '180 KB'], ['file-png', 'Social Media (1080×1080)', '520 KB']]
}];
const ASSET_STATUSES = exports.ASSET_STATUSES = ['Complete', 'New', 'In Progress', 'Pending Review', 'Archived'];
const USAGE_RIGHTS = exports.USAGE_RIGHTS = ['Internal Use Only', 'Church Use', 'Creative Commons', 'Public Domain'];
const VERSIONS = exports.VERSIONS = [{
  label: 'Version 3 (Current)',
  date: 'Aug 12, 2026 at 2:45 PM',
  user: 'Fr. Raphael M.',
  current: true
}, {
  label: 'Version 2',
  date: 'Jul 5, 2026 at 10:12 AM',
  user: 'Sarah M.'
}, {
  label: 'Version 1 (Original)',
  date: 'Jun 18, 2026 at 3:30 PM',
  user: 'Fr. Daniel'
}];

// the options menu on a category card
const CARD_MENU = exports.CARD_MENU = [['fields', 'Edit Category', 'Edit category'], ['rename', 'Rename', 'Rename'], ['image-a-2', 'Set Thumbnail', 'Set thumbnail'], ['menu-lines', 'Visible Metadata', 'Manage metadata'], ['move', 'Move To...', 'Move'], ['lock', 'Permissions', 'Permissions'], ['trash-detail', 'Delete', 'Delete']];
  } },
  "dam/app/pages/home/Sidebar.jsx": { deps: {"react":null,"plenix-platform":null,"./homeData.js":"dam/app/pages/home/homeData.js"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sidebar = Sidebar;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var D = _interopRequireWildcard(require("./homeData.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · home page sidebar (app/pages/home/Sidebar.jsx): categories, collections, saved searches, recent
   imports and trash — the left pane of the home page.
   <Sidebar mode="browse | search" active onOpen onAdd collapsed onCollapse onFiles/>
   mode "search" shows only Categories and Collections, as the search page did. Each section is a CollapsibleSection. Categories: a
   filter field, "Add category", pinned rows first, the first seven rows until "Show more (n)". active: the id of the row
   that is current; onOpen(kind, name) opens it (kind: categories | collections | saved | import | trash). onAdd(dialogId)
   opens an "Add …" dialog. It is the page's navigation pane: its Collapse button makes it a rail of Home, Files, Categories, Collections and Expand. */

// a sidebar section: the Platform CollapsibleSection (the legacy section header), its rows stacked
const Section = ({
  title,
  icon,
  defaultOpen = true,
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.CollapsibleSection, {
  title: title,
  icon: icon,
  defaultExpanded: defaultOpen,
  headingLevel: null
}, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
  gap: "xs"
}, children));
const AddLink = ({
  label,
  onClick
}) => /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  size: "xs",
  variant: "ghost",
  icon: "plus",
  onClick: onClick
}, label));
function PinnedList({
  items,
  setItems,
  kind,
  icon,
  label,
  active,
  onOpen,
  limit,
  filter = ''
}) {
  const [more, setMore] = _react.default.useState(false);
  const q = filter.trim().toLowerCase();
  const sorted = items.filter(it => it.pinned).concat(items.filter(it => !it.pinned));
  const shown = q ? sorted.filter(it => it.name.toLowerCase().indexOf(q) >= 0) : limit && !more ? sorted.slice(0, limit) : sorted;
  const hiddenCount = sorted.length - (limit ? Math.min(limit, sorted.length) : sorted.length);
  const pin = name => setItems(items.map(it => it.name === name ? {
    ...it,
    pinned: !it.pinned
  } : it));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
    label: label,
    value: active,
    onSelect: id => onOpen(kind, id),
    items: shown.map(it => ({
      id: it.name,
      label: it.name,
      icon,
      count: it.count,
      pinned: it.pinned,
      onPin: pin
    }))
  }), limit && !q && hiddenCount > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "2xs",
    "aria-expanded": more,
    onClick: () => setMore(!more)
  }, more ? 'Show less' : 'Show more (' + hiddenCount + ')')) : null);
}
function Sidebar({
  mode = 'browse',
  active,
  onOpen,
  onAdd,
  onFiles,
  filesOpen,
  saved = D.SAVED_SEARCHES,
  onRemoveSaved
}) {
  const [cats, setCats] = _react.default.useState(D.CATEGORIES);
  const [colls, setColls] = _react.default.useState(D.COLLECTIONS);
  const [filter, setFilter] = _react.default.useState('');
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavPane, {
    label: mode === 'search' ? 'Search filters' : 'Categories and collections',
    title: "Asset Manager",
    rail: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "home",
      label: "Home",
      onClick: () => onOpen('categories', 'All Categories')
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "folder-open",
      label: "Files",
      pressed: !!filesOpen,
      onClick: onFiles
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "grid-2x2",
      label: "Categories",
      pressed: mode === 'browse' && active === 'All Categories',
      onClick: () => onOpen('categories', 'All Categories')
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "briefcase",
      label: "Collections",
      onClick: () => onOpen('collections', 'All Collections')
    })),
    footer: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "gear",
      href: "settings-system.html"
    }, "System settings"),
    header: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "home",
      onClick: () => onOpen('categories', 'All Categories')
    }, "Home"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "folder-open",
      pressed: !!filesOpen,
      onClick: onFiles
    }, "Files"))
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Categories",
    icon: "grid-2x2"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    value: filter,
    onChange: e => setFilter(e.target.value),
    placeholder: "Filter categories...",
    "aria-label": "Filter categories"
  }), /*#__PURE__*/_react.default.createElement(AddLink, {
    label: "Add category",
    onClick: () => onAdd('newCatModal')
  }), /*#__PURE__*/_react.default.createElement(PinnedList, {
    items: cats,
    setItems: setCats,
    kind: "categories",
    icon: "folder",
    label: "Categories",
    active: active,
    onOpen: onOpen,
    limit: mode === 'browse' ? D.CATEGORIES_SHOWN : 0,
    filter: filter
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Collections",
    icon: "briefcase"
  }, /*#__PURE__*/_react.default.createElement(AddLink, {
    label: "Add collection",
    onClick: () => onAdd('newCollectionModal')
  }), /*#__PURE__*/_react.default.createElement(PinnedList, {
    items: colls,
    setItems: setColls,
    kind: "collections",
    icon: "briefcase",
    label: "Collections",
    active: active,
    onOpen: onOpen
  })), mode === 'browse' ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Saved Searches",
    icon: "search"
  }, /*#__PURE__*/_react.default.createElement(AddLink, {
    label: "Add saved search",
    onClick: () => onAdd('saveSearchModal')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
    label: "Saved searches",
    value: active,
    onSelect: id => onOpen('saved', id),
    items: saved.map(s => ({
      id: s.name,
      label: s.name,
      icon: 'doc-search',
      actions: onRemoveSaved ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
        iconOnly: true,
        icon: "close",
        label: 'Remove ' + s.name,
        onClick: () => onRemoveSaved(s.name)
      }) : null
    }))
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Recent Imports",
    icon: "clock"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
    label: "Recent imports",
    value: active,
    onSelect: id => onOpen('import', id),
    items: D.RECENT_IMPORTS.map(([d, n]) => ({
      id: d,
      label: d,
      icon: 'download-alt',
      count: n
    }))
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Trash",
    icon: "trash-simple",
    defaultOpen: false
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavList, {
    label: "Trash",
    value: active,
    onSelect: id => onOpen('trash', id),
    items: D.TRASH.map(([d, n]) => ({
      id: d,
      label: d,
      icon: 'trash-simple',
      count: n
    }))
  }))) : null);
}
  } },
  "dam/app/pages/home/Inspector.jsx": { deps: {"react":null,"plenix-platform":null,"./homeData.js":"dam/app/pages/home/homeData.js"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetInspector = AssetInspector;
exports.CategoryInspector = CategoryInspector;
exports.InspectorFooter = InspectorFooter;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var D = _interopRequireWildcard(require("./homeData.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · home page details pane (app/pages/home/Inspector.jsx).
   <CategoryInspector collection act onDialog/>: the category (or, in the collections view, the collection) shown in the
   browse views — preview, editable title, Details (General, Tags, Stats, Permissions, Custom Fields) and Downloads.
   <AssetInspector asset act onDialog onPreview/>: the asset chosen in the search results — preview (opens the viewer),
   title, Details (File, General, Tags), Downloads, Versions; with no asset, a prompt to choose one.
   act(message, tone) returns a click handler that shows a toast (actions without a back end); onDialog(id) opens a dialog.
   Each section collapses (General, Tags and Stats start open, as before). */
// a group of fields: the Platform CollapsibleSection (the legacy section header), its rows stacked
const Accordion = ({
  title,
  defaultOpen = true,
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.CollapsibleSection, {
  title: title,
  defaultExpanded: defaultOpen,
  headingLevel: 3
}, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
  gap: "sm",
  className: "plx-u-pt-stack-xs"
}, children));
const Row = ({
  label,
  children,
  info
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
  label: label,
  layout: "inline",
  labelWidth: "sm",
  info: info
}, children);
function Tags({
  initial,
  act
}) {
  const [tags, setTags] = _react.default.useState(initial);
  const [text, setText] = _react.default.useState('');
  const add = e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const t = text.trim().toLowerCase();
    if (t && tags.indexOf(t) < 0) setTags(tags.concat(t));
    setText('');
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, tags.map(t => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, {
    key: t,
    onRemove: () => setTags(tags.filter(x => x !== t)),
    removeLabel: 'Remove tag ' + t
  }, t)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagInput, {
    value: text,
    onChange: e => setText(e.target.value),
    onKeyDown: add,
    placeholder: "+ add tag",
    "aria-label": "Add tag"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "sparkle",
    onClick: act('AI Tagging', 'info')
  }, "AI Tagging")));
}
function Downloads({
  groups,
  act
}) {
  return groups.map(g => /*#__PURE__*/_react.default.createElement(Accordion, {
    key: g.title,
    title: g.title
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList, {
    label: g.title
  }, g.items.map(([icon, name, size]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList.Item, {
    key: name,
    leading: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: icon,
      size: "lg"
    }),
    title: name,
    meta: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data",
      className: "plx-u-leading-16px"
    }, size),
    actions: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      iconOnly: true,
      icon: "download-arrow",
      label: 'Download ' + name,
      onClick: act('Downloading ' + name + '...', 'success')
    })
  })))));
}

/* the inspector's footer actions (the panel's footer row): Save and Cancel the edits */
function InspectorFooter({
  act
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    variant: "primary",
    icon: "save-doc",
    onClick: act('Save', 'success')
  }, "Save"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "close-2",
    onClick: act('Cancel', 'info')
  }, "Cancel"));
}
function EditBar({
  onFields
}) {
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "xs",
    className: "plx-u-mb-stack-sm"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "info-circle",
    onClick: onFields
  }, "Fields"));
}
function CategoryInspector({
  collection = false,
  act,
  onDialog
}) {
  const c = D.CATEGORY_DETAIL;
  const name0 = collection ? D.COLLECTION_DETAIL.name : c.name;
  const [f, setF] = _react.default.useState({
    name: name0,
    parent: c.parent,
    order: c.order,
    color: c.color,
    copyright: c.copyright,
    rights: c.rights,
    rating: c.rating,
    description: c.description,
    style: '',
    material: '',
    origin: ''
  });
  _react.default.useEffect(() => {
    setF(x => ({
      ...x,
      name: name0
    }));
  }, [name0]);
  const text = k => ({
    value: f[k],
    onChange: e => setF({
      ...f,
      [k]: e.target.value
    })
  });
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Preview, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
    name: collection ? 'briefcase' : 'folder',
    size: "lg"
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "data",
    className: "plx-u-leading-16px"
  }, collection ? D.COLLECTION_DETAIL.count : c.count)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    "aria-label": "Title",
    emphasis: true,
    value: f.name,
    onChange: e => setF({
      ...f,
      name: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Details",
    items: [{
      value: 'details',
      label: 'Details',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(EditBar, {
        act: act,
        onFields: () => onDialog('editFieldsCatModal')
      }), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "General"
      }, /*#__PURE__*/_react.default.createElement(Row, {
        label: "Name"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "name"
      }, text('name')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Parent"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, _extends({
        name: "parent"
      }, text('parent')), c.parents.map(p => /*#__PURE__*/_react.default.createElement("option", {
        key: p
      }, p)))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Display Order"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "displayOrder",
        type: "number"
      }, text('order')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Color"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "color",
        type: "color",
        "aria-label": "Color",
        className: "plx-u-w-40px plx-u-h-28px plx-u-p-0"
      }, text('color'))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "data",
        className: "plx-u-leading-16px"
      }, f.color))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Copyright"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "copyright",
        placeholder: "Copyright..."
      }, text('copyright')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Rights"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, _extends({
        name: "rights"
      }, text('rights')), c.rightsOptions.map(p => /*#__PURE__*/_react.default.createElement("option", {
        key: p
      }, p)))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Rating"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Rating, {
        value: f.rating,
        onChange: v => setF({
          ...f,
          rating: v
        }),
        label: "Rating"
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Description"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, _extends({
        name: "description",
        rows: 2
      }, text('description'))))), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "Tags"
      }, /*#__PURE__*/_react.default.createElement(Tags, {
        initial: c.tags,
        act: act
      })), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "Stats"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList, null, c.stats.map(([k, v]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        key: k,
        label: k,
        data: true
      }, v)))), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "Permissions",
        defaultOpen: false
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList, null, c.permissions.map(([k, v]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        key: k,
        label: k
      }, v)))), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "Custom Fields",
        defaultOpen: false
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        as: "p",
        variant: "secondary"
      }, "Category-specific fields added to assets"), c.customFields.map(([k, ph]) => /*#__PURE__*/_react.default.createElement(Row, {
        key: k,
        label: k
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: k.toLowerCase(),
        placeholder: ph
      }, text(k.toLowerCase()))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
        icon: "plus",
        onClick: act('Add Field', 'success')
      }, "Add Field"))))
    }, {
      value: 'downloads',
      label: 'Downloads',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(Downloads, {
        groups: D.CATEGORY_DOWNLOADS,
        act: act
      }))
    }]
  }));
}
function AssetDetail({
  asset,
  act,
  onDialog,
  onPreview
}) {
  const [f, setF] = _react.default.useState({
    title: asset.name,
    file: asset.file,
    status: asset.status,
    cat: asset.cat,
    copyright: '',
    rights: '',
    rating: 0,
    description: ''
  });
  const text = k => ({
    value: f[k],
    onChange: e => setF({
      ...f,
      [k]: e.target.value
    })
  });
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Preview, {
    as: "button",
    onClick: onPreview,
    title: "Click to enlarge",
    "aria-label": 'Preview ' + asset.name,
    topStart: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: asset.typeIcon,
      size: "md",
      label: asset.badge
    }),
    bottomEnd: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: "expand",
      size: "sm"
    })
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "plx-preview__media",
    src: asset.thumb,
    alt: ""
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    "aria-label": "Title",
    emphasis: true,
    value: f.title,
    onChange: e => setF({
      ...f,
      title: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, asset.cat)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Asset details",
    items: [{
      value: 'details',
      label: 'Details',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(EditBar, {
        act: act,
        onFields: () => onDialog('editFieldsFileModal')
      }), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "File"
      }, /*#__PURE__*/_react.default.createElement(Row, {
        label: "File name"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "fileName"
      }, text('file')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        label: "File size",
        data: true
      }, asset.size), /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        label: "Format"
      }, asset.fmt), /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        label: "Dimensions",
        data: true
      }, asset.dims), /*#__PURE__*/_react.default.createElement(_plenixPlatform.PropertyList.Item, {
        label: "Added",
        data: true
      }, asset.date))), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "General"
      }, /*#__PURE__*/_react.default.createElement(Row, {
        label: "Edit status"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, _extends({
        name: "editStatus"
      }, text('status')), D.ASSET_STATUSES.map(p => /*#__PURE__*/_react.default.createElement("option", {
        key: p
      }, p)))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Category"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "category"
      }, text('cat')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Copyright"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "copyright",
        placeholder: "e.g. Diocese of LA"
      }, text('copyright')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Usage Rights"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, _extends({
        name: "usageRights"
      }, text('rights')), /*#__PURE__*/_react.default.createElement("option", {
        value: ""
      }, "-- Select --"), D.USAGE_RIGHTS.map(p => /*#__PURE__*/_react.default.createElement("option", {
        key: p
      }, p)))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Rating"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Rating, {
        value: f.rating,
        onChange: v => setF({
          ...f,
          rating: v
        }),
        label: "Rating"
      })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
        label: "Description"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, _extends({
        name: "description",
        rows: 2,
        placeholder: "Add description..."
      }, text('description'))))), /*#__PURE__*/_react.default.createElement(Accordion, {
        title: "Tags"
      }, /*#__PURE__*/_react.default.createElement(Tags, {
        initial: asset.tags,
        act: act
      })))
    }, {
      value: 'downloads',
      label: 'Downloads',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(Downloads, {
        groups: [{
          title: 'Source File',
          items: [[asset.typeIcon, asset.file, asset.size + ' · ' + asset.fmt]]
        }].concat(D.ASSET_DOWNLOADS),
        act: act
      }))
    }, {
      value: 'versions',
      label: 'Versions',
      content: /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList, {
        label: "Versions"
      }, D.VERSIONS.map(v => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList.Item, {
        key: v.label,
        leading: /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusDot, {
          tone: v.current ? 'info' : 'neutral',
          label: v.current ? 'Current version' : 'Earlier version'
        }),
        title: v.label,
        meta: v.date + ' · ' + v.user,
        actions: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "xs",
          variant: "link",
          onClick: act('Download', 'info')
        }, "Download"), v.current ? null : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "xs",
          variant: "link",
          onClick: act('Restore', 'info')
        }, "Restore"))
      })))
    }]
  }));
}
function AssetInspector({
  asset,
  act,
  onDialog,
  onPreview
}) {
  if (!asset) return /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, {
    size: "inline",
    icon: "document"
  }, "Click an asset to see details");
  return /*#__PURE__*/_react.default.createElement(AssetDetail, {
    key: asset.id,
    asset: asset,
    act: act,
    onDialog: onDialog,
    onPreview: onPreview
  });
}
  } },
  "dam/app/dialogs/BrowseDialogs.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedSortDialog = AdvancedSortDialog;
exports.CatEditFieldsDialog = CatEditFieldsDialog;
exports.CategoriesFilterDialog = CategoriesFilterDialog;
exports.DIALOGS = void 0;
exports.EditFieldsCatDialog = EditFieldsCatDialog;
exports.EditFieldsFileDialog = EditFieldsFileDialog;
exports.MergedFilterDialog = MergedFilterDialog;
exports.NewCatDialog = NewCatDialog;
exports.NewCollectionDialog = NewCollectionDialog;
exports.SaveSearchDialog = SaveSearchDialog;
exports.TagsFilterDialog = TagsFilterDialog;
exports.TypeFilterDialog = TypeFilterDialog;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · Browse dialogs (app/dialogs/BrowseDialogs.jsx): the home page's create, save, sort, field and filter
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
// DATA: category colors, sort fields, field lists and filter values come from the back end; sample values until then.
// Colors are stored without the leading # (a category color is a record value, not a style).
const CATEGORY_COLORS = ['2a6fdb', 'd93025', 'f59e0b', '5cc28f', '0078d4', 'ec4899', '14b8a6', 'f97316', '64748b'];
const SORT_FIELDS = ['Name', 'Description', 'Tags', 'Rating', 'Keywords', 'Category Path', 'File Size', 'Dimensions', 'Date Created', 'Date Modified', 'Camera Model', 'Aperture', 'Color Profile', 'GPS Location', 'Edit Status', 'Owner'];
// DATA: [field, type, shown]
const CATEGORY_FIELDS = [['name', 'text', true], ['description', 'textarea', true], ['categorypath', 'text', true], ['parentid', 'text', true], ['displayorder', 'number', true], ['color', 'text', true], ['owner', 'text', true], ['viewgroups', 'list', true], ['editgroups', 'list', false], ['visibility', 'list', true], ['defaultstatus', 'list', false], ['defaultcopyright', 'text', false], ['defaulttags', 'list', false], ['totalassets', 'number', true], ['storageused', 'number', false], ['datecreated', 'date', true], ['datemodified', 'date', true]];
const ASSET_FIELDS = [['name', 'text', true], ['assettitle', 'text', true], ['sourcepath', 'text', true], ['filesize', 'number', true], ['fileformat', 'text', true], ['width', 'number', true], ['height', 'number', true], ['description', 'textarea', true], ['category', 'list dropdown', true], ['editstatus', 'list dropdown', true], ['assetaddeddate', 'date', true], ['assetmodificationdate', 'date', true]];
// DATA: the category's edit form (Edit Fields) and the fields that can be added to it.
const CATEGORY_FORM_FIELDS = [{
  name: 'Category Name',
  type: 'Text'
}, {
  name: 'Description',
  type: 'Text Area'
}, {
  name: 'Tags',
  type: 'Tags'
}];
const ADDABLE_FIELDS = ['Archive Source Path', 'Auto Assigned Media', 'Categories', 'Category ID', 'Color', 'Custom Field 1', 'Custom Field 2', 'Display Order', 'Parent Category', 'Permissions', 'Source Path', 'Thumbnail'];
// DATA: [name, asset count]
const CATEGORIES = [['Banner Icon', 24], ['Bookshelf', 18], ['Borders - Arch', 31], ['Borders - Circular', 42], ['Branding - Churches', 28], ['Branding - CYC', 5], ['Branding - Diakonia', 15], ['Certificate - Baptism', 89], ['Certificate - Masters', 47], ['Clergy - Metropolitan Serapion', 62], ['Clergy - Pope Shenouda III', 210], ['Clergy - Pope Tawadros II', 45], ['Cross - Traditional', 78], ['Dome', 33], ['Embroideries', 156], ['Fonts', 18]];
const TAGS = [['cross', 312], ['certificate', 189], ['clergy', 156], ['branding', 87], ['border', 74], ['ornament', 53], ['coptic', 42]];
// DATA: type groups; a group with types is checked through them, a group without is checked itself.
const TYPE_GROUPS = [{
  name: 'Photos',
  count: 3855,
  types: [['PSD', 287], ['PNG', 1640], ['JPG', 1890], ['TIFF', 14]]
}, {
  name: 'Vectors',
  count: 504,
  types: [['AI', 412], ['SVG', 22], ['DWG', 38]]
}, {
  name: 'Documents',
  count: 145,
  types: [['PDF', 92], ['INDD', 53]]
}, {
  name: 'Videos',
  count: 60,
  types: []
}, {
  name: 'Fonts',
  count: 18,
  types: []
}, {
  name: '3D Models',
  count: 4,
  types: []
}];
// The legacy defaults: every category checked, these types checked, no tags.
const DEFAULT_CATEGORIES = CATEGORIES.map(c => c[0]);
const DEFAULT_TYPES = ['PSD', 'PNG', 'JPG', 'AI', 'Videos'];
const DEFAULT_TAGS = [];
const EMPTY_TEXT = 'No data';
const HASH = '#';

/* ── small parts ── */
const fmt = n => Number(n).toLocaleString('en-US');
const has = (q, text) => !q || String(text).toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;

// A check row's label: the name, then its asset count at the end.
const Counted = ({
  name,
  count
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
  as: "span",
  justify: "between",
  grow: true
}, /*#__PURE__*/_react.default.createElement("span", null, name), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Count, {
  value: fmt(count)
}));
const Footer = ({
  onCancel,
  children
}) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  onClick: onCancel
}, "Cancel"), children);

// The working copy of a selection: taken from value (or the dialog's own state) each time the dialog opens.
function useDraft(open, value, initial) {
  const [own, setOwn] = _react.default.useState(initial);
  const current = value !== undefined ? value : own;
  const [draft, setDraft] = _react.default.useState(current);
  _react.default.useEffect(() => {
    if (open) setDraft(current);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  const commit = () => {
    setOwn(draft);
    return draft;
  };
  return [draft, setDraft, commit];
}
const toggleIn = (arr, name, on) => on ? arr.indexOf(name) >= 0 ? arr : arr.concat(name) : arr.filter(v => v !== name);

/* ── Categories › Add New ── */
function NewCatDialog({
  open,
  onClose,
  onSave
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const uid = _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [form, setForm] = _react.default.useState({
    name: '',
    description: ''
  });
  const [tags, setTags] = _react.default.useState([]);
  const [tagText, setTagText] = _react.default.useState('');
  const [color, setColor] = _react.default.useState(HASH + CATEGORY_COLORS[0]);
  const [hex, setHex] = _react.default.useState(HASH + CATEGORY_COLORS[0]);
  const [fieldsOpen, setFieldsOpen] = _react.default.useState(false);
  const text = k => ({
    value: form[k],
    onChange: e => setForm({
      ...form,
      [k]: e.target.value
    })
  });
  const pick = c => {
    setColor(c);
    setHex(c);
  };
  // The hex box moves the color well only once it holds a full #rrggbb value (syncColorPicker).
  const typeHex = v => {
    setHex(v);
    if (/^#[0-9a-fA-F]{6}$/.test(v)) setColor(v);
  };
  const addTag = e => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const t = tagText.trim();
    if (t && tags.indexOf(t) < 0) setTags(tags.concat(t));
    setTagText('');
  };
  const save = e => {
    e.preventDefault();
    toast.show('Save', {
      tone: 'success'
    });
    if (onSave) onSave({
      name: form.name,
      description: form.description,
      tags,
      color
    });
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: "Categories \u203A Add New",
    icon: "grid-2x2",
    size: "lg",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      icon: "circle-info",
      onClick: () => setFieldsOpen(true)
    }, "Fields"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      type: "submit",
      form: uid,
      variant: "primary"
    }, "Save"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "form",
    id: uid,
    noValidate: true,
    onSubmit: save
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Category Name"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "categoryName",
    placeholder: "Enter category name..."
  }, text('name')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Description"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, _extends({
    name: "description",
    placeholder: "Optional description..."
  }, text('description')))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field plx-field--stacked"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__head"
  }, /*#__PURE__*/_react.default.createElement("label", {
    className: "plx-field__label",
    htmlFor: uid + 'tags'
  }, "Tags")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__control"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, null, tags.map(t => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, {
    key: t,
    onRemove: () => setTags(tags.filter(x => x !== t))
  }, t)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagInput, {
    id: uid + 'tags',
    name: "tags",
    placeholder: "Tags",
    value: tagText,
    "aria-describedby": uid + 'tags-d',
    onChange: e => setTagText(e.target.value),
    onKeyDown: addTag
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__description",
    id: uid + 'tags-d'
  }, "Hit ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Kbd, null, "enter"), " or ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Kbd, null, "return"), " key after typing each tag"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field plx-field--stacked"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__head"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-field__label",
    id: uid + 'color'
  }, "Category Color")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__control"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    role: "group",
    "aria-labelledby": uid + 'color',
    wrap: true,
    className: "plx-u-gap-y-stack-sm"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-layout--width-xs"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "categoryColor",
    type: "color",
    "aria-label": "Category Color",
    value: color,
    onChange: e => pick(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-layout--width-md"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "categoryColor2",
    "aria-label": "Category Color",
    data: true,
    value: hex,
    onChange: e => typeHex(e.target.value)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "xs",
    wrap: true
  }, CATEGORY_COLORS.map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    key: c,
    size: "sm",
    "aria-label": 'Color ' + HASH + c,
    pressed: color.toLowerCase() === HASH + c,
    onClick: () => pick(HASH + c)
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorSwatch, {
    color: HASH + c,
    size: "sm",
    shape: "square"
  })))))))), /*#__PURE__*/_react.default.createElement(EditFieldsCatDialog, {
    open: fieldsOpen,
    onClose: () => setFieldsOpen(false)
  }));
}

/* ── Save Search and Collections › Add New: a name and a description ── */
function NameDialog({
  open,
  onClose,
  onSave,
  title,
  icon,
  nameLabel,
  nameField,
  placeholder,
  saved
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const uid = _react.default.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [form, setForm] = _react.default.useState({
    name: '',
    description: ''
  });
  const text = k => ({
    value: form[k],
    onChange: e => setForm({
      ...form,
      [k]: e.target.value
    })
  });
  const save = e => {
    e.preventDefault();
    toast.show(saved, {
      tone: 'success'
    });
    if (onSave) onSave({
      ...form
    });
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: title,
    icon: icon,
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      type: "submit",
      form: uid,
      variant: "primary"
    }, "Save"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "form",
    id: uid,
    noValidate: true,
    onSubmit: save
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: nameLabel
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: nameField,
    placeholder: placeholder
  }, text('name')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Description"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, _extends({
    name: "description",
    placeholder: "Optional description..."
  }, text('description'))))));
}
function SaveSearchDialog(props) {
  return /*#__PURE__*/_react.default.createElement(NameDialog, _extends({}, props, {
    title: "Save Search",
    icon: "save",
    nameLabel: "Search Name",
    nameField: "searchName",
    placeholder: "e.g. High-res crosses",
    saved: "Search saved"
  }));
}
function NewCollectionDialog(props) {
  return /*#__PURE__*/_react.default.createElement(NameDialog, _extends({}, props, {
    title: "Collections \u203A Add New",
    icon: "briefcase-plus",
    nameLabel: "Collection Name",
    nameField: "collectionName",
    placeholder: "Enter collection name...",
    saved: "Collection created"
  }));
}

/* ── Advanced Sort ── */
function AdvancedSortDialog({
  open,
  onClose,
  value,
  onApply
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [draft, setDraft, commit] = useDraft(open, value, {
    field: 'Name',
    direction: 'asc'
  });
  const [q, setQ] = _react.default.useState('');
  const fields = SORT_FIELDS.filter(f => has(q, f));
  const apply = () => {
    const next = commit();
    toast.show('Sorted by ' + next.field + ' (' + (next.direction === 'asc' ? 'Ascending' : 'Descending') + ')', {
      tone: 'success'
    });
    if (onApply) onApply(next);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: "Advanced Sort",
    icon: "sort",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: apply
    }, "Apply"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Sort By Field"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "sortByField",
    type: "search",
    placeholder: "Search fields...",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    maxHeight: "md"
  }, fields.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    "aria-label": "Sort By Field",
    name: "advSortField",
    value: draft.field,
    onChange: f => setDraft({
      ...draft,
      field: f
    }),
    options: fields.map(f => ({
      value: f,
      label: f
    }))
  }) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, null, EMPTY_TEXT)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    label: "Direction",
    name: "advSortDir",
    layout: "row",
    value: draft.direction,
    onChange: d => setDraft({
      ...draft,
      direction: d
    }),
    options: [{
      value: 'asc',
      label: 'Ascending'
    }, {
      value: 'desc',
      label: 'Descending'
    }]
  })));
}

/* ── Edit Category Fields and Edit Asset Fields: which fields the detail panel shows ── */
function FieldVisibilityDialog({
  open,
  onClose,
  value,
  onSave,
  title,
  description,
  fields
}) {
  const initial = _react.default.useMemo(() => Object.fromEntries(fields.map(f => [f[0], f[2]])), [fields]);
  const [draft, setDraft, commit] = useDraft(open, value, initial);
  const [q, setQ] = _react.default.useState('');
  const rows = fields.filter(f => has(q, f[0])).map(f => ({
    id: f[0],
    name: f[0],
    type: f[1]
  }));
  const save = () => {
    const next = commit();
    if (onSave) onSave(next);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: title,
    icon: "fields",
    description: description,
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: save
    }, "Save"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
    name: "searchFields",
    label: "Search fields",
    placeholder: "Search fields...",
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ('')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: title,
    rows: rows,
    empty: EMPTY_TEXT,
    columns: [{
      key: 'handle',
      header: 'Order',
      render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: "menu-lines",
        size: "sm"
      }))
    }, {
      key: 'name',
      header: 'Field',
      data: true,
      emphasis: true
    }, {
      key: 'type',
      header: 'Type',
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, r.type)
    }, {
      key: 'show',
      header: 'Show',
      align: 'end',
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
        label: 'Show ' + r.name,
        labelHidden: true,
        checked: !!draft[r.name],
        onChange: e => setDraft({
          ...draft,
          [r.name]: e.target.checked
        })
      })
    }]
  })));
}
function EditFieldsCatDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FieldVisibilityDialog, _extends({}, props, {
    title: "Edit Category Fields",
    fields: CATEGORY_FIELDS,
    description: "Choose which category attributes to show in the detail panel. Drag to reorder."
  }));
}
function EditFieldsFileDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FieldVisibilityDialog, _extends({}, props, {
    title: "Edit Asset Fields",
    fields: ASSET_FIELDS,
    description: "Choose which metadata fields to show in the detail panel. Drag to reorder."
  }));
}

/* ── Edit Fields: the fields on the category edit form ── */
function CatEditFieldsDialog({
  open,
  onClose,
  onDone
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [fields, setFields] = _react.default.useState(CATEGORY_FORM_FIELDS);
  const [forAll, setForAll] = _react.default.useState(true);
  const addable = ADDABLE_FIELDS.filter(n => !fields.some(f => f.name === n));
  const remove = name => {
    setFields(fields.filter(f => f.name !== name));
    toast.show('Field removed', {
      tone: 'info'
    });
  };
  // Added fields have no type until the back end supplies one.
  const add = e => {
    const n = e.target.value;
    if (n) setFields(fields.concat({
      name: n,
      type: '—'
    }));
  };
  const done = () => {
    if (onDone) onDone({
      fields,
      forAllUsers: forAll
    });
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: "Edit Fields",
    icon: "fields",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: done
    }, "Done"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "end"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "editForAllUsers",
    label: "Edit For All Users",
    checked: forAll,
    onChange: e => setForAll(e.target.checked)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
    caption: "Edit Fields",
    rows: fields.map(f => ({
      id: f.name,
      ...f
    })),
    empty: EMPTY_TEXT,
    columns: [{
      key: 'handle',
      header: 'Order',
      render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: "merge",
        size: "xs"
      }))
    }, {
      key: 'name',
      header: 'Field',
      emphasis: true
    }, {
      key: 'type',
      header: 'Type',
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, r.type)
    }, {
      key: 'remove',
      header: 'Remove',
      align: 'end',
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
        iconOnly: true,
        icon: "close",
        label: 'Remove ' + r.name,
        onClick: () => remove(r.name)
      })
    }]
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "addAnotherField",
    "aria-label": "Add another field",
    value: "",
    onChange: add
  }, /*#__PURE__*/_react.default.createElement("option", {
    value: ""
  }, "Add another field"), addable.map(n => /*#__PURE__*/_react.default.createElement("option", {
    key: n
  }, n)))));
}

/* ── Filter panels: the body of each filter dialog, shared with the merged Filters dialog ── */
function CheckListPanel({
  items,
  selected,
  onChange,
  searchName,
  searchLabel
}) {
  const [q, setQ] = _react.default.useState('');
  const shown = items.filter(it => has(q, it[0]));
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
    name: searchName,
    label: searchLabel,
    placeholder: searchLabel + '...',
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ('')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    maxHeight: "md",
    role: "group",
    "aria-label": searchLabel.replace('Search', 'Filter by')
  }, shown.length ? shown.map(([name, count]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    key: name,
    label: /*#__PURE__*/_react.default.createElement(Counted, {
      name: name,
      count: count
    }),
    checked: selected.indexOf(name) >= 0,
    onChange: e => onChange(toggleIn(selected, name, e.target.checked))
  })) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, null, EMPTY_TEXT)));
}
const CategoriesPanel = ({
  selected,
  onChange
}) => /*#__PURE__*/_react.default.createElement(CheckListPanel, {
  items: CATEGORIES,
  selected: selected,
  onChange: onChange,
  searchName: "searchCategories",
  searchLabel: "Search categories"
});
const TagsPanel = ({
  selected,
  onChange
}) => /*#__PURE__*/_react.default.createElement(CheckListPanel, {
  items: TAGS,
  selected: selected,
  onChange: onChange,
  searchName: "searchTags",
  searchLabel: "Search tags"
});

// Types: a group with types is checked when all of them are, mixed when some are (toggleFdGroup / toggleFdSub);
// the arrow shows or hides its types (toggleFdCollapse).
function TypePanel({
  selected,
  onChange
}) {
  const [collapsed, setCollapsed] = _react.default.useState({});
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    maxHeight: "md",
    role: "group",
    "aria-label": "Filter by Type"
  }, TYPE_GROUPS.map(g => {
    const names = g.types.map(t => t[0]);
    const on = names.length ? names.filter(n => selected.indexOf(n) >= 0).length : selected.indexOf(g.name) >= 0 ? 1 : 0;
    const all = names.length ? on === names.length : on === 1;
    const setGroup = checked => onChange((names.length ? names : [g.name]).reduce((acc, n) => toggleIn(acc, n, checked), selected));
    const isCollapsed = !!collapsed[g.name];
    return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
      key: g.name,
      gap: "xs"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
      grow: true
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
      label: /*#__PURE__*/_react.default.createElement(Counted, {
        name: g.name,
        count: g.count
      }),
      checked: all,
      indeterminate: !all && on > 0,
      onChange: e => setGroup(e.target.checked)
    })), names.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      iconOnly: true,
      icon: isCollapsed ? 'chevron-right' : 'chevron-down',
      label: 'Show or hide ' + g.name + ' types',
      expanded: !isCollapsed,
      onClick: () => setCollapsed({
        ...collapsed,
        [g.name]: !isCollapsed
      })
    }) : null), names.length && !isCollapsed ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
      gap: "xs",
      indent: true
    }, g.types.map(([name, count]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
      key: name,
      label: /*#__PURE__*/_react.default.createElement(Counted, {
        name: name,
        count: count
      }),
      checked: selected.indexOf(name) >= 0,
      onChange: e => onChange(toggleIn(selected, name, e.target.checked))
    }))) : null);
  }));
}
function FilterDialog({
  open,
  onClose,
  value,
  onApply,
  initial,
  title,
  icon,
  Panel
}) {
  const [draft, setDraft, commit] = useDraft(open, value, initial);
  const apply = () => {
    const next = commit();
    if (onApply) onApply(next);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: title,
    icon: icon,
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: apply
    }, "Apply"))
  }, /*#__PURE__*/_react.default.createElement(Panel, {
    selected: draft,
    onChange: setDraft
  }));
}
function CategoriesFilterDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FilterDialog, _extends({}, props, {
    title: "Filter by Categories",
    icon: "grid-2x2",
    initial: DEFAULT_CATEGORIES,
    Panel: CategoriesPanel
  }));
}
function TypeFilterDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FilterDialog, _extends({}, props, {
    title: "Filter by Type",
    icon: "image-b",
    initial: DEFAULT_TYPES,
    Panel: TypePanel
  }));
}
function TagsFilterDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FilterDialog, _extends({}, props, {
    title: "Filter by Tags",
    icon: "tags",
    initial: DEFAULT_TAGS,
    Panel: TagsPanel
  }));
}

/* ── Filters: Categories, Type and Tags in one dialog, one tab each ── */
function MergedFilterDialog({
  open,
  onClose,
  tab = 'categories',
  value,
  onApply
}) {
  // a page may hold only some of the three filters: the others start from their defaults
  const given = value && {
    categories: value.categories || DEFAULT_CATEGORIES,
    type: value.type || DEFAULT_TYPES,
    tags: value.tags || DEFAULT_TAGS
  };
  const [draft, setDraft, commit] = useDraft(open, given, {
    categories: DEFAULT_CATEGORIES,
    type: DEFAULT_TYPES,
    tags: DEFAULT_TAGS
  });
  const [current, setCurrent] = _react.default.useState(tab);
  _react.default.useEffect(() => {
    if (open) setCurrent(tab);
  }, [open, tab]);
  const set = k => v => setDraft({
    ...draft,
    [k]: v
  });
  const apply = () => {
    const next = commit();
    if (onApply) onApply(next);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: "Filters",
    icon: "settings-preferences",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: apply
    }, "Apply"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "contained",
    label: "Filters",
    value: current,
    onChange: setCurrent,
    items: [{
      value: 'categories',
      label: 'Categories',
      content: /*#__PURE__*/_react.default.createElement(CategoriesPanel, {
        selected: draft.categories,
        onChange: set('categories')
      })
    }, {
      value: 'type',
      label: 'Type',
      content: /*#__PURE__*/_react.default.createElement(TypePanel, {
        selected: draft.type,
        onChange: set('type')
      })
    }, {
      value: 'tags',
      label: 'Tags',
      content: /*#__PURE__*/_react.default.createElement(TagsPanel, {
        selected: draft.tags,
        onChange: set('tags')
      })
    }]
  }));
}
const DIALOGS = exports.DIALOGS = {
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
  mergedFilterModal: MergedFilterDialog
};
  } },
  "dam/app/dialogs/UploadDialog.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DIALOGS = void 0;
exports.UploadDialog = UploadDialog;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · Upload dialog (app/dialogs/UploadDialog.jsx): the upload flow, ported from the uploadModal template
   in partials/dialogs.html and its plenix.js behavior (batch 111).
   <UploadDialog open onClose/>: no page context needed. Three panes:
   - Files: the storage folder tree (select, expand, add a subfolder to the selected folder), then the upload area: drag and
     drop of files or whole folders, Browse Files and Browse Folder (real file inputs), import from URL. Chosen files go
     into a queue (name, folder path, size, type) where they can be removed.
   - Categories (required): search, pick one or more, "use folder names as categories", and a New Category form (name,
     description, tags, color with picker, hex box and swatches kept in step).
   - Visible Metadata: search, a type filter (All, Image, Video, Audio, 3D, Doc) and collapsible field groups; groups start
     closed and a group shows its fields only while open and matching the search, as in plenix.js.
   There is no back end: Upload confirms with the toast the legacy drop handler used ("N file(s) ready to upload") and
   closes, as the legacy Upload button did. Every state resets when the dialog closes. */

// DATA: the storage folders come from the back end; sample tree until then.
const FOLDERS = [{
  id: 'all',
  label: 'All',
  children: [{
    id: 'digital-assets',
    label: 'Digital Assets',
    children: [{
      id: 'borders',
      label: 'Borders',
      children: ['Arch', 'Banner', 'Circular', 'Divider', 'Linear', 'Page'].map(l => ({
        id: 'borders-' + l.toLowerCase(),
        label: l
      }))
    }, {
      id: 'branding',
      label: 'Branding',
      children: ['Churches', 'CYC', 'Diakonia'].map(l => ({
        id: 'branding-' + l.toLowerCase(),
        label: l
      }))
    }, {
      id: 'certificates',
      label: 'Certificates'
    }, {
      id: 'clergy',
      label: 'Clergy'
    }, {
      id: 'crosses',
      label: 'Crosses'
    }, {
      id: 'fonts',
      label: 'Fonts'
    }]
  }, {
    id: 'documents',
    label: 'Documents',
    children: [{
      id: 'manuals',
      label: 'Manuals'
    }, {
      id: 'templates',
      label: 'Templates'
    }]
  }, {
    id: 'facial-profiles',
    label: 'Facial Profiles'
  }, {
    id: 'users',
    label: 'Users'
  }]
}];
const DEFAULT_FOLDER = 'digital-assets';

// DATA: the categories to pick from come from the back end.
const CATEGORIES = ['Banner Icon', 'Bookshelf', 'Borders - Arch', 'Borders - Banner', 'Borders - Circular', 'Borders - Divider', 'Borders - Linear', 'Borders - Page', 'Branding - Churches', 'Branding - CYC', 'Branding - Diakonia', 'Certificates', 'Clergy', 'Covers', 'Cross - Traditional', 'Crosses', 'Dome', 'Embroideries', 'Fonts', 'Galloons', 'Korban Stamp', 'Ornamental Elements', 'Presentation Folders'];

// DATA: the category color swatches (hex digits; "#" is added where the value is used).
const SWATCHES = ['2a6fdb', 'd93025', 'f59e0b', '5cc28f', '0078d4', 'ec4899', '14b8a6', 'f97316', '64748b'];
const hex = digits => '#' + digits;
const TYPE_FILTERS = [{
  value: 'all',
  label: 'All'
}, {
  value: 'image',
  label: 'Image'
}, {
  value: 'video',
  label: 'Video'
}, {
  value: 'audio',
  label: 'Audio'
}, {
  value: '3d',
  label: '3D'
}, {
  value: 'document',
  label: 'Doc'
}];

// DATA: metadata field groups come from the back end. Each field is "Label" or "Label|source tag"; a leading "*" marks a
// field that is checked by default.
const META_GROUPS = [['General', 'all', ['*Name', '*Description', '*Tags', 'Keywords', '*Rating', 'Edit Status', 'Language', 'Version', 'Summary']], ['Categorization', 'all', ['*Category', 'Category ID', 'Parent Category', 'Category Path', 'Display Order', 'Asset Type', 'Classification']], ['Ownership & Rights', 'all', ['Owner', 'Creator|EXIF: Artist', 'Copyright|EXIF: Copyright', 'Copyright Notice|IPTC: CopyrightNotice', 'Rights Usage Terms|XMP: UsageTerms', 'License', 'Permissions', 'Author', 'Created By', 'Modified By']], ['Dates', 'all', ['Date Created|EXIF: DateTimeOriginal', 'Date Modified|EXIF: ModifyDate', 'Date Digitized|EXIF: CreateDate', 'GPS Date/Time|EXIF: GPSDateStamp', 'Import Date', 'Publish Date', 'Expiration Date']], ['File Properties', 'all', ['File Name', 'File Type', 'MIME Type', 'File Size', 'Source Path', 'Archive Source Path', 'File URL', 'Data Type', 'Thumbnail', 'Checksum / MD5']], ['Dimensions & Resolution', 'image,video', ['Width|EXIF: ImageWidth', 'Height|EXIF: ImageHeight', 'DPI / Resolution|EXIF: XResolution', 'Resolution Unit|EXIF: ResolutionUnit', 'Orientation|EXIF: Orientation', 'Pixel Aspect Ratio']], ['Camera & Lens', 'image,video', ['Camera Make|EXIF: Make', 'Camera Model|EXIF: Model', 'Camera Serial #|EXIF: SerialNumber', 'Lens Type|EXIF: LensModel', 'Lens Make|EXIF: LensMake', 'Lens Serial #|EXIF: LensSerialNumber', 'Firmware|EXIF: Software']], ['Exposure & Shooting', 'image', ['Focal Length|EXIF: FocalLength', 'Focal Length (35mm)|EXIF: FocalLengthIn35mmFormat', 'Aperture|EXIF: FNumber', 'Max Aperture|EXIF: MaxApertureValue', 'Shutter Speed|EXIF: ExposureTime', 'ISO|EXIF: ISO', 'Exposure Program|EXIF: ExposureProgram', 'Exposure Mode|EXIF: ExposureMode', 'Exposure Comp.|EXIF: ExposureCompensation', 'Metering Mode|EXIF: MeteringMode', 'Flash|EXIF: Flash', 'Flash Comp.|EXIF: FlashCompensation', 'White Balance|EXIF: WhiteBalance', 'Scene Type|EXIF: SceneCaptureType', 'Light Source|EXIF: LightSource', 'Subject Distance|EXIF: SubjectDistance', 'Focus Mode|EXIF: FocusMode', 'Digital Zoom|EXIF: DigitalZoomRatio', 'Sharpness|EXIF: Sharpness', 'Contrast|EXIF: Contrast', 'Saturation|EXIF: Saturation', 'Brightness|EXIF: BrightnessValue']], ['Color & Image', 'image', ['Color Space|EXIF: ColorSpace', 'Color Profile|EXIF: ICCProfileName', 'Color Type', 'Bit Depth|EXIF: BitsPerSample', 'Compression|EXIF: Compression', 'Photometric Interp.|EXIF: PhotometricInterpretation', 'Image Unique ID|EXIF: ImageUniqueID']], ['Location (GPS)', 'image,video', ['GPS Latitude|EXIF: GPSLatitude', 'GPS Longitude|EXIF: GPSLongitude', 'GPS Altitude|EXIF: GPSAltitude', 'GPS Speed|EXIF: GPSSpeed', 'GPS Direction|EXIF: GPSImgDirection', 'GPS Area Info|EXIF: GPSAreaInformation']], ['IPTC / XMP', 'image', ['Headline|IPTC: Headline', 'Caption|IPTC: Caption-Abstract', 'By-line|IPTC: By-line', 'By-line Title|IPTC: By-lineTitle', 'Credit|IPTC: Credit', 'Source|IPTC: Source', 'Contact Info|IPTC: Contact', 'Object Name|IPTC: ObjectName', 'Category Code|IPTC: Category', 'Supplemental Cat.|IPTC: SupplementalCategories', 'Urgency|IPTC: Urgency', 'Instructions|IPTC: SpecialInstructions', 'Subject Code|XMP: Subject', 'Scene Code|IPTC: Scene', 'Intellectual Genre|IPTC: IntellectualGenre']], ['IPTC Location', 'image', ['Sub-location|IPTC: Sub-location', 'City|IPTC: City', 'State / Province|IPTC: Province-State', 'Country|IPTC: Country-PrimaryLocationName', 'Country Code|IPTC: Country-PrimaryLocationCode']], ['Video — Stream', 'video', ['Duration|FFmpeg: Duration', 'Frame Rate|FFmpeg: r_frame_rate', 'Video Codec|FFmpeg: codec_name', 'Codec Profile|FFmpeg: profile', 'Video Bitrate|FFmpeg: bit_rate', 'Video Resolution', 'Aspect Ratio|FFmpeg: display_aspect_ratio', 'Pixel Format|FFmpeg: pix_fmt', 'Color Primaries|FFmpeg: color_primaries', 'Color Transfer|FFmpeg: color_transfer', 'Rotation|FFmpeg: rotate', 'Audio Codec|FFmpeg: audio codec_name', 'Audio Bitrate|FFmpeg: audio bit_rate', 'Sample Rate|FFmpeg: sample_rate', 'Audio Channels|FFmpeg: channels', 'Audio Language|FFmpeg: language', 'Subtitle Tracks|FFmpeg: subtitle streams']], ['Video — Container Tags', 'video', ['Title|MP4: moov/udta ©nam', 'Artist|MP4: ©ART', 'Album|MP4: ©alb', 'Comment|MP4: ©cmt', 'Genre|MP4: ©gen / gnre', 'Year|MP4: ©day', 'Encoder|MP4: ©too', 'MKV Title|Matroska: TagName', 'MKV Date|Matroska: DateUTC', 'MKV Muxing App|Matroska: MuxingApp', 'MKV Writing App|Matroska: WritingApp', 'AVI Title|RIFF INFO: INAM', 'AVI Artist|RIFF INFO: IART', 'AVI Comment|RIFF INFO: ICMT', 'AVI Software|RIFF INFO: ISFT', 'WMV Title|ASF: Title', 'WMV Author|ASF: Author', 'WMV Description|ASF: Description', 'WMV Rating|ASF: Rating']], ['Audio — ID3 Tags', 'audio', ['Title|ID3v2: TIT2', 'Subtitle|ID3v2: TIT3', 'Artist|ID3v2: TPE1', 'Album Artist|ID3v2: TPE2', 'Album|ID3v2: TALB', 'Year|ID3v2: TDRC', 'Track Number|ID3v2: TRCK', 'Disc Number|ID3v2: TPOS', 'Genre|ID3v2: TCON', 'Composer|ID3v2: TCOM', 'Conductor|ID3v2: TPE3', 'Lyricist|ID3v2: TEXT', 'Publisher|ID3v2: TPUB', 'Encoded By|ID3v2: TENC', 'BPM|ID3v2: TBPM', 'Initial Key|ID3v2: TKEY', 'ISRC|ID3v2: TSRC', 'Comment|ID3v2: COMM', 'Lyrics|ID3v2: USLT', 'Album Art|ID3v2: APIC', 'Copyright|ID3v2: TCOP', 'Grouping|ID3v2: TIT1', 'Compilation|ID3v2: TCMP', 'Mood|ID3v2: TMOO', 'Media Type|ID3v2: TMED', 'ReplayGain|ID3v2: TXXX']], ['Audio — Stream', 'audio', ['Duration|FFmpeg: Duration', 'Audio Codec|FFmpeg: codec_name', 'Bitrate|FFmpeg: bit_rate', 'Bitrate Mode|CBR / VBR', 'Sample Rate|FFmpeg: sample_rate', 'Channels|FFmpeg: channels', 'Bit Depth|FFmpeg: bits_per_sample']], ['Document', 'document', ['Page Count', 'Word Count', 'Character Count', 'Title|PDF: Title', 'Subject|PDF: Subject', 'PDF Producer|PDF: Producer', 'PDF Creator Tool|PDF: Creator', 'PDF Version|PDF: PDFVersion', 'Encrypted|PDF: Encryption']], ['3D / Model', '3d', ['Geometry Type|mesh, NURBS, solid', 'Vertex Count', 'Face / Polygon Count', 'Edge Count', 'Object Count', 'Material Count', 'Texture Count', 'UV Maps', 'Bounding Box', 'Scene Units|mm, cm, m, in', 'Up Axis|Y-up, Z-up', 'Animation|has animations', 'Rigged|has armature', 'File Format|FBX, OBJ, GLTF, USD...', 'Render Engine|Cycles, Eevee, V-Ray...', 'Source Application|Blender, Maya, 3ds Max...']], ['Distribution', 'all', ['Channels', 'Auto Assigned Media', 'Published Locations', 'Conversion Preset']], ['Custom', 'all', ['Custom Field 1', 'Custom Field 2', 'Custom Field 3']]].map(([name, types, fields], g) => ({
  name,
  types: types.split(','),
  fields: fields.map((f, i) => {
    const on = f[0] === '*';
    const [label, tag] = (on ? f.slice(1) : f).split('|');
    return {
      key: g + ':' + i,
      label,
      tag,
      on
    };
  })
}));
const META_DEFAULTS = ['default'].concat(...META_GROUPS.map(g => g.fields.filter(f => f.on).map(f => f.key)));

/* ── styles (tokens only) ── */

/* ── helpers ── */
function formatSize(bytes) {
  if (bytes === null || bytes === undefined) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let n = bytes,
    u = 0;
  while (n >= 1024 && u < units.length - 1) {
    n /= 1024;
    u += 1;
  }
  return (u === 0 ? n : n.toFixed(1)) + ' ' + units[u];
}
const EXT_ICONS = {
  jpg: 'file-jpg',
  jpeg: 'file-jpg',
  png: 'file-png',
  pdf: 'file-pdf',
  svg: 'file-svg',
  zip: 'file-zip',
  psd: 'file-psd',
  ai: 'file-ai'
};
function fileIcon(item) {
  const ext = (item.name.split('.').pop() || '').toLowerCase();
  if (EXT_ICONS[ext]) return EXT_ICONS[ext];
  return /^image\//.test(item.type) ? 'image-b' : 'document';
}

/* A dropped folder arrives as a directory entry: walk it so every file inside joins the queue with its folder path. */
function walkEntry(entry, prefix, out) {
  return new Promise(resolve => {
    if (entry.isFile) entry.file(file => {
      out.push({
        file,
        path: prefix
      });
      resolve();
    }, () => resolve());else if (entry.isDirectory) {
      const reader = entry.createReader(),
        all = [];
      const read = () => reader.readEntries(batch => {
        if (batch.length) {
          all.push(...batch);
          read();
        } else Promise.all(all.map(e => walkEntry(e, prefix + entry.name + '/', out))).then(resolve);
      }, () => resolve());
      read();
    } else resolve();
  });
}
function droppedFiles(dataTransfer) {
  const entries = Array.from(dataTransfer.items || []).map(it => it.kind === 'file' && it.webkitGetAsEntry ? it.webkitGetAsEntry() : null);
  if (!entries.length || entries.some(e => !e)) return Promise.resolve(Array.from(dataTransfer.files || []).map(file => ({
    file,
    path: ''
  })));
  const out = [];
  return Promise.all(entries.map(e => walkEntry(e, '', out))).then(() => out);
}
function addChild(nodes, parentId, child) {
  return nodes.map(n => n.id === parentId ? {
    ...n,
    children: (n.children || []).concat(child)
  } : n.children ? {
    ...n,
    children: addChild(n.children, parentId, child)
  } : n);
}

/* ── pane 1: folders and the upload area ── */
function FilesPane({
  queue,
  addFiles,
  removeFile,
  clearQueue
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [tree, setTree] = _react.default.useState(FOLDERS);
  const [folder, setFolder] = _react.default.useState(DEFAULT_FOLDER);
  const [expanded, setExpanded] = _react.default.useState(['all']);
  const [naming, setNaming] = _react.default.useState(null);
  const [over, setOver] = _react.default.useState(false);
  const [url, setUrl] = _react.default.useState('');
  const filesInput = _react.default.useRef(null),
    folderInput = _react.default.useRef(null),
    nameInput = _react.default.useRef(null),
    depth = _react.default.useRef(0),
    nextFolder = _react.default.useRef(1);
  // Escape in the folder-name box cancels the name only; the dialog listens for Escape on the document (capture), so this
  // listens on the window first.
  _react.default.useEffect(() => {
    if (naming === null) return undefined;
    const onKey = e => {
      if (e.key === 'Escape' && e.target === nameInput.current) {
        e.stopPropagation();
        e.preventDefault();
        setNaming(null);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [naming === null]);
  const commitFolder = () => {
    const name = (naming || '').trim();
    if (name) {
      setTree(addChild(tree, folder, {
        id: 'new-' + nextFolder.current++,
        label: name
      }));
      if (!expanded.includes(folder)) setExpanded(expanded.concat(folder));
    }
    setNaming(null);
  };
  const fromInput = e => {
    addFiles(Array.from(e.target.files || []).map(file => ({
      file,
      path: (file.webkitRelativePath || '').split('/').slice(0, -1).map(p => p + '/').join('')
    })));
    e.target.value = '';
  };
  const onDrop = e => {
    e.preventDefault();
    depth.current = 0;
    setOver(false);
    droppedFiles(e.dataTransfer).then(addFiles);
  };
  const importUrl = () => {
    const v = url.trim();
    if (v) {
      addFiles([{
        url: v
      }]);
      setUrl('');
    }
    toast.show('Import', {
      tone: 'success'
    });
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "section",
    gap: "sm",
    "aria-labelledby": "upl-files"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h3",
    id: "upl-files",
    variant: "heading"
  }, "Files"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Physical storage on disk. Each file is saved to exactly one folder."), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "none",
    maxHeight: "sm"
  }, tree.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tree, {
    label: "Folders",
    nodes: tree.map(function deco(n) {
      return {
        ...n,
        icon: 'folder',
        children: n.children ? n.children.map(deco) : undefined
      };
    }),
    selected: folder,
    onSelect: setFolder,
    expanded: expanded,
    onExpandedChange: setExpanded
  }) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, null, "No data")), naming === null ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    icon: "plus",
    onClick: () => setNaming('')
  }, "New folder")) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    ref: nameInput,
    "aria-label": "Folder name",
    placeholder: "Folder name...",
    autoFocus: true,
    value: naming,
    onChange: e => setNaming(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        commitFolder();
      }
    },
    onBlur: () => {
      if (!naming.trim()) setNaming(null);
    }
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h3",
    variant: "heading",
    className: "plx-u-mt-stack-md"
  }, "Upload"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.DropZone, {
    active: over,
    onDragEnter: e => {
      e.preventDefault();
      depth.current += 1;
      setOver(true);
    },
    onDragOver: e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    onDragLeave: () => {
      depth.current -= 1;
      if (depth.current <= 0) {
        depth.current = 0;
        setOver(false);
      }
    },
    onDrop: onDrop
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
    name: "upload-2",
    size: "lg"
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "label"
  }, "Drag & drop files or folders"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "or choose an option below"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "center",
    className: "plx-u-mt-stack-sm"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "text-card",
    onClick: () => filesInput.current.click()
  }, "Browse Files"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "folder-open",
    onClick: () => folderInput.current.click()
  }, "Browse Folder")), /*#__PURE__*/_react.default.createElement("input", {
    ref: filesInput,
    type: "file",
    multiple: true,
    hidden: true,
    onChange: fromInput,
    "aria-label": "Browse Files"
  }), /*#__PURE__*/_react.default.createElement("input", {
    ref: folderInput,
    type: "file",
    multiple: true,
    hidden: true,
    webkitdirectory: "",
    directory: "",
    onChange: fromInput,
    "aria-label": "Browse Folder"
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "center",
    className: "plx-u-mt-stack-sm"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "or import from URL")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "upload",
    "aria-label": "Import from URL",
    placeholder: "https://example.com/image.png",
    value: url,
    onChange: e => setUrl(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        importUrl();
      }
    }
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    variant: "primary",
    onClick: importUrl
  }, "Import")), queue.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    "aria-live": "polite"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "between",
    className: "plx-u-mt-stack-sm"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Queue ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Count, {
    value: queue.length,
    label: queue.length + ' file(s) in the queue'
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    onClick: clearQueue
  }, "Clear")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "ul",
    gap: "xs",
    maxHeight: "sm",
    "aria-label": "Upload queue"
  }, queue.map(q => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    as: "li",
    key: q.id
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
    name: fileIcon(q),
    size: "sm"
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "span",
    gap: "none",
    grow: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "data",
    truncate: true,
    title: q.path + q.name
  }, q.path, q.name), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "caption",
    truncate: true
  }, formatSize(q.size), " \xB7 ", q.type || 'Unknown')), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    iconOnly: true,
    icon: "close",
    label: 'Remove ' + q.name,
    onClick: () => removeFile(q.id)
  }))))) : null);
}

/* ── pane 2: categories ── */
function CategoriesPane() {
  const [useFolders, setUseFolders] = _react.default.useState(false);
  const [q, setQ] = _react.default.useState('');
  const [picked, setPicked] = _react.default.useState([]);
  const [adding, setAdding] = _react.default.useState(false);
  const [cat, setCat] = _react.default.useState({
    name: '',
    description: '',
    tags: '',
    color: SWATCHES[0],
    hexText: hex(SWATCHES[0])
  });
  const shown = CATEGORIES.filter(c => !q.trim() || c.toLowerCase().includes(q.trim().toLowerCase()));
  const toggle = (c, on) => setPicked(on ? picked.concat(c) : picked.filter(p => p !== c));
  const setColor = value => setCat({
    ...cat,
    color: value.slice(1).toLowerCase(),
    hexText: value
  });
  // the hex box moves the picker only once it holds a full #rrggbb value, as syncColorPicker did
  const onHex = value => setCat({
    ...cat,
    hexText: value,
    color: /^#[0-9a-fA-F]{6}$/.test(value) ? value.slice(1).toLowerCase() : cat.color
  });
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "section",
    gap: "sm",
    "aria-labelledby": "upl-cats"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h3",
    id: "upl-cats",
    variant: "heading"
  }, "Categories ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "danger",
    "aria-hidden": "true"
  }, "*")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Required. Logical grouping \u2014 assets can belong to multiple categories (1 to many)."), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "useFolderNamesAsCategoriesMergeIfExists",
    checked: useFolders,
    onChange: e => setUseFolders(e.target.checked),
    title: "Use the uploaded folder names as categories (merge if a category already exists)",
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Use folder names as categories ", /*#__PURE__*/_react.default.createElement("em", null, "(merge if exists)"))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
    label: "Search categories",
    placeholder: "Search categories...",
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ('')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    maxHeight: "sm",
    role: "group",
    "aria-label": "Categories"
  }, CATEGORIES.length ? shown.map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    key: c,
    checked: picked.includes(c),
    onChange: e => toggle(c, e.target.checked),
    label: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: "folder",
      size: "sm"
    }), " ", c)
  })) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, null, "No data")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "between"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    icon: "plus",
    onClick: () => setAdding(true),
    "aria-expanded": adding
  }, "New Category"), adding ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    iconOnly: true,
    icon: "close",
    label: "Cancel new category",
    title: "Cancel new category",
    onClick: () => setAdding(false)
  }) : null), adding ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "categoryName",
    "aria-label": "Category name",
    placeholder: "Enter category name...",
    value: cat.name,
    onChange: e => setCat({
      ...cat,
      name: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, {
    name: "description",
    "aria-label": "Description",
    placeholder: "Optional description...",
    value: cat.description,
    onChange: e => setCat({
      ...cat,
      description: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "tags",
    "aria-label": "Tags",
    placeholder: "Tags",
    value: cat.tags,
    onChange: e => setCat({
      ...cat,
      tags: e.target.value
    })
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    wrap: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "categoryColor",
    type: "color",
    "aria-label": "Category color",
    className: "plx-u-w-36px plx-u-p-0",
    value: hex(cat.color),
    onChange: e => setColor(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "categoryColorHexValue",
    "aria-label": "Category color hex value",
    width: "md",
    data: true,
    value: cat.hexText,
    onChange: e => onHex(e.target.value)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "xs",
    wrap: true,
    role: "group",
    "aria-label": "Category color swatches"
  }, SWATCHES.map(s => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorSwatch, {
    key: s,
    color: hex(s),
    label: 'Color ' + hex(s),
    pressed: cat.color === s,
    onClick: () => setColor(hex(s))
  }))))) : null);
}

/* ── pane 3: visible metadata ── */
function MetadataPane() {
  const [q, setQ] = _react.default.useState('');
  const [type, setType] = _react.default.useState('all');
  const [open, setOpen] = _react.default.useState([]);
  const [checked, setChecked] = _react.default.useState(META_DEFAULTS);
  const query = q.trim().toLowerCase();
  const isOn = key => checked.includes(key);
  const flip = (key, on) => setChecked(on ? checked.concat(key) : checked.filter(k => k !== key));
  const typeOk = g => type === 'all' || g.types.includes('all') || g.types.includes(type);
  const matches = f => !query || (f.label + (f.tag ? ' (' + f.tag + ')' : '')).toLowerCase().includes(query);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "section",
    gap: "sm",
    "aria-labelledby": "upl-meta"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h3",
    id: "upl-meta",
    variant: "heading"
  }, "Visible Metadata"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "All metadata is always stored. Checked fields are shown by default in this category's view."), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchField, {
    label: "Search fields",
    placeholder: "Search fields...",
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ('')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    name: "metaTypeFilter",
    "aria-label": "Field type",
    layout: "row",
    value: type,
    onChange: setType,
    options: TYPE_FILTERS
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    maxHeight: "lg"
  }, query ? null : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "defaultCurrentView",
    checked: isOn('default'),
    onChange: e => flip('default', e.target.checked),
    label: "Default (Current View)"
  }), META_GROUPS.filter(typeOk).map(g => {
    const isOpen = open.includes(g.name);
    const fields = isOpen ? g.fields.filter(matches) : [];
    return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
      key: g.name,
      gap: "xs",
      role: "group",
      "aria-label": g.name
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "xs",
      icon: isOpen ? 'chevron-down' : 'triangle-right',
      "aria-expanded": isOpen,
      onClick: () => setOpen(isOpen ? open.filter(n => n !== g.name) : open.concat(g.name))
    }, g.name)), fields.map(f => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
      key: f.key,
      checked: isOn(f.key),
      onChange: e => flip(f.key, e.target.checked),
      label: f.tag ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, f.label, " ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "caption"
      }, "(", f.tag, ")")) : f.label
    })));
  })));
}

/* ── the dialog: its body mounts only while open, so every pane starts fresh each time ── */
function UploadFlow({
  onClose
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [queue, setQueue] = _react.default.useState([]);
  const nextId = _react.default.useRef(1);
  const addFiles = items => {
    if (!items.length) return;
    const added = items.map(it => it.url ? {
      id: nextId.current++,
      name: it.url.split(/[?#]/)[0].split('/').filter(Boolean).pop() || it.url,
      path: '',
      size: null,
      type: 'URL',
      url: it.url
    } : {
      id: nextId.current++,
      name: it.file.name,
      path: it.path || '',
      size: it.file.size,
      type: it.file.type,
      file: it.file
    });
    setQueue(cur => cur.concat(added));
  };
  // no back end: the upload is simulated with the toast the legacy drop handler showed, then the dialog closes
  const upload = () => {
    if (queue.length) toast.show(queue.length + ' file(s) ready to upload', {
      tone: 'success'
    });
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: onClose,
    title: "Upload Assets",
    icon: "upload",
    size: "xl",
    flush: true,
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: upload
    }, "Upload"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Columns, {
    count: 3,
    divided: true
  }, /*#__PURE__*/_react.default.createElement(FilesPane, {
    queue: queue,
    addFiles: addFiles,
    removeFile: id => setQueue(cur => cur.filter(q => q.id !== id)),
    clearQueue: () => setQueue([])
  }), /*#__PURE__*/_react.default.createElement(CategoriesPane, null), /*#__PURE__*/_react.default.createElement(MetadataPane, null)));
}
function UploadDialog({
  open,
  onClose
}) {
  return open ? /*#__PURE__*/_react.default.createElement(UploadFlow, {
    onClose: onClose
  }) : null;
}
const DIALOGS = exports.DIALOGS = {
  uploadModal: UploadDialog
};
  } },
  "dam/app/dialogs/MetadataFilterDialog.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.METADATA_FIELD_KEYS = exports.DIALOGS = exports.DEFAULT_FILTERS = void 0;
exports.MetadataFilterDialog = MetadataFilterDialog;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
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

// DATA: the asset type choices and the metadata field groups come from the back end; the legacy markup until then.
// A field is [label, name, back-end field key]; the first `shown` fields are always visible, the rest sit behind
// "Show more". The placeholder is "Search by <label in lower case>...".
const TYPE_OPTIONS = [{
  value: 'all',
  label: 'All'
}, {
  value: 'image',
  label: 'Image'
}, {
  value: 'video',
  label: 'Video'
}, {
  value: 'audio',
  label: 'Audio'
}, {
  value: 'document',
  label: 'Doc'
}, {
  value: '3d',
  label: '3D'
}];
const GROUPS = [{
  title: 'General',
  types: ['all'],
  shown: 4,
  fields: [['Name', 'name', 'name'], ['Description', 'description', 'assetsearchdescription'], ['Tags', 'tags', 'tags'], ['Rating', 'rating', 'assetvotes'], ['Keywords', 'keywords', 'keywords'], ['Edit Status', 'editStatus', 'editstatus'], ['Language', 'language', 'language'], ['Version', 'version', 'version'], ['Summary', 'summary', 'summary']]
}, {
  title: 'Categorization',
  types: ['all'],
  shown: 2,
  fields: [['Category', 'category', 'category'], ['Data Type', 'dataType', 'datatype'], ['Category ID', 'categoryId', 'categoryid'], ['Parent Category', 'parentCategory', 'parentcategory'], ['Category Path', 'categoryPath', 'categorypath'], ['Display Order', 'displayOrder', 'displayorder'], ['Asset Type', 'assetType', 'assettype'], ['Classification', 'classification', 'classification']]
}, {
  title: 'Ownership & Rights',
  types: ['all'],
  shown: 2,
  fields: [['Owner', 'owner', 'owner'], ['Creator', 'creator', 'creator'], ['Copyright', 'copyright', 'copyright'], ['Copyright Notice', 'copyrightNotice', 'copyrightnotice'], ['Rights Usage Terms', 'rightsUsageTerms', 'usageterms'], ['License', 'license', 'license'], ['Author', 'author', 'author'], ['Created By', 'createdBy', 'createdby'], ['Modified By', 'modifiedBy', 'modifiedby']]
}, {
  title: 'Dates',
  types: ['all'],
  shown: 2,
  fields: [['Date Added', 'dateAdded', 'assetaddeddate'], ['Date Modified', 'dateModified', 'assetmodificationdate'], ['Date Created', 'dateCreated', 'datetimeoriginal'], ['Date Digitized', 'dateDigitized', 'createdate'], ['GPS Date/Time', 'gpsDateTime', 'gpsdatestamp'], ['Import Date', 'importDate', 'importdate'], ['Publish Date', 'publishDate', 'publishdate'], ['Expiration Date', 'expirationDate', 'expirationdate']]
}, {
  title: 'File Properties',
  types: ['all'],
  shown: 3,
  fields: [['File Name', 'fileName', 'name'], ['File Type', 'fileType', 'fileformat'], ['File Size', 'fileSize', 'filesize'], ['MIME Type', 'mimeType', 'mimetype'], ['Source Path', 'sourcePath', 'sourcepath'], ['Archive Source Path', 'archiveSourcePath', 'archivesourcepath'], ['Checksum / MD5', 'checksumMd5', 'md5hex'], ['Asset ID', 'assetId', 'id']]
}, {
  title: 'Dimensions & Resolution',
  types: ['image', 'video'],
  shown: 2,
  fields: [['Width', 'width', 'width'], ['Height', 'height', 'height'], ['DPI / Resolution', 'dpiResolution', 'xresolution'], ['Resolution Unit', 'resolutionUnit', 'resolutionunit'], ['Orientation', 'orientation', 'orientation'], ['Pixel Aspect Ratio', 'pixelAspectRatio', 'pixelaspectratio']]
}, {
  title: 'Camera & Lens',
  types: ['image', 'video'],
  shown: 2,
  fields: [['Camera Make', 'cameraMake', 'make'], ['Camera Model', 'cameraModel', 'model'], ['Camera Serial #', 'cameraSerial', 'serialnumber'], ['Lens Type', 'lensType', 'lensmodel'], ['Lens Make', 'lensMake', 'lensmake'], ['Firmware', 'firmware', 'software']]
}, {
  title: 'Exposure & Shooting',
  types: ['image'],
  shown: 4,
  fields: [['Focal Length', 'focalLength', 'focallength'], ['Aperture', 'aperture', 'fnumber'], ['Shutter Speed', 'shutterSpeed', 'exposuretime'], ['ISO', 'iso', 'iso'], ['Exposure Program', 'exposureProgram', 'exposureprogram'], ['Exposure Mode', 'exposureMode', 'exposuremode'], ['Metering Mode', 'meteringMode', 'meteringmode'], ['Flash', 'flash', 'flash'], ['White Balance', 'whiteBalance', 'whitebalance'], ['Scene Type', 'sceneType', 'scenecapturetype'], ['Contrast', 'contrast', 'contrast'], ['Saturation', 'saturation', 'saturation'], ['Sharpness', 'sharpness', 'sharpness']]
}, {
  title: 'Color & Image',
  types: ['image'],
  shown: 2,
  fields: [['Color Space', 'colorSpace', 'colorspace'], ['Color Profile', 'colorProfile', 'iccprofilename'], ['Bit Depth', 'bitDepth', 'bitspersample'], ['Compression', 'compression', 'compression'], ['Color Type', 'colorType', 'colortype']]
}, {
  title: 'Location (GPS)',
  types: ['image', 'video'],
  shown: 2,
  fields: [['GPS Latitude', 'gpsLatitude', 'gpslatitude'], ['GPS Longitude', 'gpsLongitude', 'gpslongitude'], ['GPS Altitude', 'gpsAltitude', 'gpsaltitude'], ['GPS Speed', 'gpsSpeed', 'gpsspeed'], ['GPS Direction', 'gpsDirection', 'gpsimgdirection']]
}, {
  title: 'IPTC / XMP',
  types: ['image'],
  shown: 2,
  fields: [['Headline', 'headline', 'headline'], ['Caption', 'caption', 'caption-abstract'], ['By-line', 'byLine', 'by-line'], ['Credit', 'credit', 'credit'], ['Source', 'source', 'source'], ['City', 'city', 'city'], ['Country', 'country', 'country'], ['Subject Code', 'subjectCode', 'subject'], ['Urgency', 'urgency', 'urgency'], ['Instructions', 'instructions', 'specialinstructions']]
}, {
  title: 'Video — Stream',
  types: ['video'],
  shown: 4,
  fields: [['Duration', 'duration', 'duration'], ['Frame Rate', 'frameRate', 'r_frame_rate'], ['Video Codec', 'videoCodec', 'codec_name'], ['Video Resolution', 'videoResolution', 'videoresolution'], ['Codec Profile', 'codecProfile', 'profile'], ['Video Bitrate', 'videoBitrate', 'bit_rate'], ['Aspect Ratio', 'aspectRatio', 'display_aspect_ratio'], ['Pixel Format', 'pixelFormat', 'pix_fmt'], ['Color Primaries', 'colorPrimaries', 'color_primaries'], ['Rotation', 'rotation', 'rotate'], ['Audio Codec', 'audioCodec', 'audio_codec_name'], ['Audio Bitrate', 'audioBitrate', 'audio_bit_rate'], ['Sample Rate', 'sampleRate', 'sample_rate'], ['Audio Channels', 'audioChannels', 'channels'], ['Subtitle Tracks', 'subtitleTracks', 'subtitle_streams']]
}, {
  title: 'Video — Container Tags',
  types: ['video'],
  shown: 2,
  fields: [['Title', 'title', 'mp4_nam'], ['Artist', 'artist', 'mp4_art'], ['Album', 'album', 'mp4_alb'], ['Comment', 'comment', 'mp4_cmt'], ['Genre', 'genre', 'mp4_gen'], ['Year', 'year', 'mp4_day'], ['Encoder', 'encoder', 'mp4_too']]
}, {
  title: 'Audio — ID3 Tags',
  types: ['audio'],
  shown: 4,
  fields: [['Title', 'title2', 'id3_tit2'], ['Artist', 'artist2', 'id3_tpe1'], ['Album', 'album2', 'id3_talb'], ['Genre', 'genre2', 'id3_tcon'], ['Album Artist', 'albumArtist', 'id3_tpe2'], ['Year', 'year2', 'id3_tdrc'], ['Track Number', 'trackNumber', 'id3_trck'], ['Disc Number', 'discNumber', 'id3_tpos'], ['Composer', 'composer', 'id3_tcom'], ['Conductor', 'conductor', 'id3_tpe3'], ['Lyricist', 'lyricist', 'id3_text'], ['Publisher', 'publisher', 'id3_tpub'], ['BPM', 'bpm', 'id3_tbpm'], ['ISRC', 'isrc', 'id3_tsrc'], ['Lyrics', 'lyrics', 'id3_uslt'], ['Album Art', 'albumArt', 'id3_apic'], ['Copyright', 'copyright2', 'id3_tcop'], ['Mood', 'mood', 'id3_tmoo'], ['ReplayGain', 'replaygain', 'id3_txxx']]
}, {
  title: 'Audio — Stream',
  types: ['audio'],
  shown: 3,
  fields: [['Duration', 'duration2', 'duration'], ['Audio Codec', 'audioCodec2', 'codec_name'], ['Bitrate', 'bitrate', 'bit_rate'], ['Bitrate Mode', 'bitrateMode', 'bitrate_mode'], ['Sample Rate', 'sampleRate2', 'sample_rate'], ['Channels', 'channels', 'channels'], ['Bit Depth', 'bitDepth2', 'bits_per_sample']]
}, {
  title: 'Document',
  types: ['document'],
  shown: 2,
  fields: [['Page Count', 'pageCount', 'pagecount'], ['Title', 'title3', 'pdf_title'], ['Word Count', 'wordCount', 'wordcount'], ['Character Count', 'characterCount', 'charcount'], ['Subject', 'subject', 'pdf_subject'], ['PDF Producer', 'pdfProducer', 'pdf_producer'], ['PDF Creator Tool', 'pdfCreatorTool', 'pdf_creator'], ['PDF Version', 'pdfVersion', 'pdfversion'], ['Encrypted', 'encrypted', 'encryption']]
}, {
  title: '3D / Model',
  types: ['3d'],
  shown: 3,
  fields: [['Geometry Type', 'geometryType', 'geometrytype'], ['Vertex Count', 'vertexCount', 'vertexcount'], ['Face / Polygon Count', 'facePolygonCount', 'facecount'], ['Material Count', 'materialCount', 'materialcount'], ['Texture Count', 'textureCount', 'texturecount'], ['UV Maps', 'uvMaps', 'uvmaps'], ['Bounding Box', 'boundingBox', 'boundingbox'], ['Scene Units', 'sceneUnits', 'sceneunits'], ['Animation', 'animation', 'hasanimation'], ['Rigged', 'rigged', 'hasarmature'], ['Source Application', 'sourceApplication', 'sourceapp']]
}, {
  title: 'Status & Workflow',
  types: ['all'],
  shown: 3,
  fields: [['Edit Status', 'editStatus2', 'editstatus'], ['Import Status', 'importStatus', 'importstatus'], ['Preview Status', 'previewStatus', 'previewstatus'], ['Push Status', 'pushStatus', 'pushstatus'], ['Approval Status', 'approvalStatus', 'approvalstatus'], ['Conversion Status', 'conversionStatus', 'conversionstatus'], ['Locked', 'locked', 'islocked']]
}, {
  title: 'AI & Semantic',
  types: ['all'],
  shown: 2,
  fields: [['Semantic Indexed', 'semanticIndexed', 'semanticindexed'], ['AI Tags', 'aiTags', 'aitags'], ['Facial Recognition', 'facialRecognition', 'facialrecognition'], ['CLIP Embedding', 'clipEmbedding', 'clipembedding']]
}, {
  title: 'Distribution',
  types: ['all'],
  shown: 2,
  fields: [['Channels', 'channels2', 'distributionchannels'], ['Published Locations', 'publishedLocations', 'publishedlocations'], ['Auto Assigned Media', 'autoAssignedMedia', 'autoassignedmedia'], ['Conversion Preset', 'conversionPreset', 'conversionpreset']]
}];

// Back-end field key for each field name, for the page to build its query from `value.fields`.
const METADATA_FIELD_KEYS = exports.METADATA_FIELD_KEYS = Object.fromEntries(GROUPS.flatMap(g => g.fields.map(([, name, key]) => [name, key])));
const DEFAULT_FILTERS = exports.DEFAULT_FILTERS = {
  types: ['all'],
  fields: {}
};

// filterAdvMeta: All and the specific types exclude each other; clearing the last type turns All back on.
function nextTypes(types, value, checked) {
  if (value === 'all') return checked ? ['all'] : types.filter(t => t !== 'all');
  const others = types.filter(t => t !== 'all' && t !== value).concat(checked ? [value] : []);
  return others.length ? others : ['all'];
}
function groupVisible(group, types) {
  const active = types.filter(t => t !== 'all');
  if (types.includes('all') || !active.length || group.types.includes('all')) return true;
  return active.some(t => group.types.includes(t));
}
function MetaGroup({
  group,
  index,
  fields,
  onField,
  collapsed,
  onToggle,
  expanded,
  onShowMore
}) {
  const extra = group.fields.length - group.shown;
  const list = expanded ? group.fields : group.fields.slice(0, group.shown);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.CollapsibleSection, {
    title: group.title,
    expanded: !collapsed,
    onToggle: onToggle,
    headingLevel: 3
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    className: "plx-u-gap-y-component-gap-sm plx-u-pt-component-gap-sm"
  }, list.map(([label, name]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    key: name,
    label: label,
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: name,
    placeholder: 'Search by ' + label.toLowerCase() + '...',
    value: fields[name] || '',
    onChange: e => onField(name, e.target.value)
  }))), extra > 0 ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-u-flex"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "link",
    size: "sm",
    "aria-expanded": expanded,
    onClick: onShowMore
  }, expanded ? 'Show less' : 'Show more (+' + extra + ')')) : null));
}
function MetadataFilterDialog({
  open,
  onClose,
  value,
  onApply
}) {
  const [applied, setApplied] = _react.default.useState(value || DEFAULT_FILTERS);
  const current = value || applied;
  const [draft, setDraft] = _react.default.useState(current);
  const [collapsed, setCollapsed] = _react.default.useState({});
  const [expanded, setExpanded] = _react.default.useState({});

  // Each opening starts from the applied filters.
  _react.default.useEffect(() => {
    if (open) setDraft(current);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const setType = (v, checked) => setDraft(d => ({
    ...d,
    types: nextTypes(d.types, v, checked)
  }));
  const setField = (name, text) => setDraft(d => {
    const fields = {
      ...d.fields
    };
    if (text) fields[name] = text;else delete fields[name];
    return {
      ...d,
      fields
    };
  });
  const flip = (setter, i) => setter(s => ({
    ...s,
    [i]: !s[i]
  }));
  const apply = e => {
    if (e) e.preventDefault();
    if (!value) setApplied(draft);
    if (onApply) onApply(draft);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    title: "Advanced Filters \u2014 Metadata Fields",
    icon: "filter",
    size: "lg",
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: apply
    }, "Apply"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
    as: "form",
    noValidate: true,
    onSubmit: apply,
    className: "plx-u-gap-y-pattern-stack-md"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    role: "group",
    "aria-label": "Asset type",
    gap: "lg",
    wrap: true,
    className: "plx-u-gap-y-inline-sm"
  }, TYPE_OPTIONS.map(o => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    key: o.value,
    name: "advMetaType",
    value: o.value,
    label: o.label,
    checked: draft.types.includes(o.value),
    onChange: e => setType(o.value, e.target.checked)
  }))), GROUPS.map((g, i) => groupVisible(g, draft.types) ? /*#__PURE__*/_react.default.createElement(MetaGroup, {
    key: g.title,
    group: g,
    index: i,
    fields: draft.fields,
    onField: setField,
    collapsed: !!collapsed[i],
    onToggle: () => flip(setCollapsed, i),
    expanded: !!expanded[i],
    onShowMore: () => flip(setExpanded, i)
  }) : null), /*#__PURE__*/_react.default.createElement("button", {
    type: "submit",
    hidden: true
  })));
}
const DIALOGS = exports.DIALOGS = {
  metadataModal: MetadataFilterDialog
};
  } },
  "dam/app/dialogs/BulkDialogs.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaCartDialog = BaCartDialog;
exports.BaChangeCategoryDialog = BaChangeCategoryDialog;
exports.BaCollectionDialog = BaCollectionDialog;
exports.BaDeleteDialog = BaDeleteDialog;
exports.BaDownloadAsDialog = BaDownloadAsDialog;
exports.BaDownloadDialog = BaDownloadDialog;
exports.BaMetadataDialog = BaMetadataDialog;
exports.BaMoveDialog = BaMoveDialog;
exports.BaRatingDialog = BaRatingDialog;
exports.BaRenameDialog = BaRenameDialog;
exports.BaShareDialog = BaShareDialog;
exports.BaStatusDialog = BaStatusDialog;
exports.BaTagsDialog = BaTagsDialog;
exports.bulkComingSoon = exports.DIALOGS = void 0;
exports.bulkDialogFor = bulkDialogFor;
exports.isSingleOnly = void 0;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · bulk action dialogs (app/dialogs/BulkDialogs.jsx): the 13 dialogs the bulk bars open for the selected
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
// DATA: collections, categories, tags, people, cart and size figures come from the back end; sample values until then.
/* "3 selected assets", "1 category": the count with its noun in the right number (the legacy text always said
   "assets", even for one item or for categories) */
const things = (count, kind = 'asset', pre = '') => count + ' ' + pre + (kind === 'category' ? count === 1 ? 'category' : 'categories' : count === 1 ? 'asset' : 'assets');
const COLLECTIONS = ['Liturgical Art Collection', 'Social Media Assets', 'Website Banners', 'Print Materials', 'Clergy Portraits', 'Certificate Templates'];
const MOVE_CATEGORIES = ['Banner Icon', 'Bookshelf', 'Borders - Arch', 'Borders - Circular', 'Branding - Churches', 'Cross - Traditional', 'Dome', 'Embroideries'];
const CHANGE_CATEGORIES = ['Banner Icon', 'Borders - Arch', 'Branding - Churches', 'Dome', 'Embroideries', 'Fonts'];
const CURRENT_CATEGORY = 'Cross - Traditional';
const CURRENT_TAGS = ['coptic', 'orthodox', 'cross', 'gold', 'traditional'];
const SUGGESTED_TAGS = ['church', 'liturgical', 'icon', 'border', 'certificate', 'branding'];
const CART_ITEMS = 2;
const SHARE_LINK = 'https://plenix.lacopts.org/share/xK9m2pQ';
// the people an asset is shared with besides the signed-in person (who comes from the Platform session and can edit)
const SHARED_WITH = [{
  name: 'John Deacon',
  permission: 'Can View'
}];
const DOWNLOAD_ESTIMATE = '~24.5 MB';

// DATA: choice lists (from the back end later).
const CART_FORMATS = ['Original / Source File', 'Web Optimized (1200px max)', 'Social Media (1080 × 1080)', 'Custom Size...'];
const CART_FILE_TYPES = ['Keep Original Format', 'PNG', 'JPG (80% quality)', 'WebP', 'SVG (vector only)', 'PDF'];
const STATUSES = [{
  value: 'Approved',
  tone: 'success'
}, {
  value: 'Pending Review',
  tone: 'warning'
}, {
  value: 'In Progress',
  tone: 'info'
}, {
  value: 'Draft',
  tone: 'neutral'
}, {
  value: 'Archived',
  tone: 'danger'
}];
const PERMISSIONS = ['Can View', 'Can Edit', 'Admin'];
const EXPIRATIONS = ['Never', '24 hours', '7 days', '30 days', '90 days'];
const DOWNLOAD_FORMATS = ['Original / Source Files', 'Web Optimized (1200px, 72dpi)', 'Print Ready (300dpi)', 'Custom Size...'];
const DOWNLOAD_FILE_TYPES = ['Keep Original Format', 'PNG', 'JPG (80% quality)', 'WebP', 'PDF'];
const CONVERT_TO = ['PNG', 'JPG (80% quality)', 'JPG (100% quality)', 'WebP', 'SVG', 'PDF', 'TIFF'];
const UNITS = ['px', '%', 'in', 'cm'];
const META_TYPES = [{
  value: 'all',
  label: 'All'
}, {
  value: 'image',
  label: 'Image'
}, {
  value: 'video',
  label: 'Video'
}, {
  value: 'audio',
  label: 'Audio'
}, {
  value: 'document',
  label: 'Document'
}, {
  value: '3d',
  label: '3D'
}];

/* DATA: metadata field groups for Update Metadata. Field: [key, label, kind, placeholder or options, readOnly].
   kind: text | textarea | number | date | select (options; the empty first option keeps the current value) | rating. */
const KEEP = '-- Keep current --';
const META_GROUPS = [{
  title: 'General',
  types: ['all'],
  fields: [['name', 'Name', 'text', 'Leave blank to keep current'], ['description', 'Description', 'textarea', 'Leave blank to keep current'], ['tags', 'Tags', 'text', 'Comma-separated tags...'], ['keywords', 'Keywords', 'text', 'Comma-separated keywords...'], ['rating', 'Rating', 'rating'], ['editStatus', 'Edit Status', 'select', ['Complete', 'New', 'In Progress', 'Pending Review', 'Draft', 'Archived']], ['language', 'Language', 'select', ['English', 'Arabic', 'Coptic', 'French', 'Spanish']], ['version', 'Version', 'text', 'e.g. 1.0'], ['summary', 'Summary', 'textarea', 'Brief summary...']]
}, {
  title: 'Categorization',
  types: ['all'],
  fields: [['category', 'Category', 'text', 'Type to search...'], ['parentCategory', 'Parent Category', 'text', 'Parent category name'], ['displayOrder', 'Display Order', 'number', '0'], ['assetType', 'Asset Type', 'select', ['Image', 'Video', 'Audio', 'Document', '3D Model', 'Font']], ['classification', 'Classification', 'text', 'Classification']]
}, {
  title: 'Ownership & Rights',
  types: ['all'],
  fields: [['owner', 'Owner', 'text', 'Asset owner'], ['creator', 'Creator', 'text', 'Artist / Creator'], ['copyright', 'Copyright', 'text', 'e.g. Coptic Orthodox Diocese of LA'], ['copyrightNotice', 'Copyright Notice', 'text', 'IPTC copyright notice'], ['usageTerms', 'Usage Terms', 'select', ['Internal Use Only', 'Church Use - Non-Commercial', 'Creative Commons - Attribution', 'Public Domain', 'All Rights Reserved']], ['license', 'License', 'text', 'License type'], ['author', 'Author', 'text', 'Author name']]
}, {
  title: 'Dates',
  types: ['all'],
  fields: [['dateCreated', 'Date Created', 'date'], ['dateModified', 'Date Modified', 'date'], ['publishDate', 'Publish Date', 'date'], ['expirationDate', 'Expiration Date', 'date']]
}, {
  title: 'Dimensions & Resolution',
  types: ['image', 'video'],
  fields: [['width', 'Width', 'number', 'px'], ['height', 'Height', 'number', 'px'], ['dpi', 'DPI', 'number', '72'], ['orientation', 'Orientation', 'select', ['Horizontal', 'Vertical', 'Square']]]
}, {
  title: 'Camera & Lens',
  types: ['image', 'video'],
  fields: [['cameraMake', 'Camera Make', 'text', 'e.g. Canon'], ['cameraModel', 'Camera Model', 'text', 'e.g. EOS R5'], ['lensType', 'Lens Type', 'text', 'e.g. RF 24-70mm']]
}, {
  title: 'Exposure & Shooting',
  types: ['image'],
  fields: [['focalLength', 'Focal Length', 'text', 'e.g. 50mm'], ['aperture', 'Aperture', 'text', 'e.g. f/2.8'], ['shutterSpeed', 'Shutter Speed', 'text', 'e.g. 1/125'], ['iso', 'ISO', 'number', 'e.g. 400'], ['whiteBalance', 'White Balance', 'select', ['Auto', 'Daylight', 'Cloudy', 'Tungsten', 'Fluorescent', 'Flash']], ['flash', 'Flash', 'select', ['Fired', 'Did not fire', 'Auto']]]
}, {
  title: 'Color & Image',
  types: ['image'],
  fields: [['colorSpace', 'Color Space', 'select', ['sRGB', 'Adobe RGB', 'ProPhoto RGB', 'Display P3']], ['colorProfile', 'Color Profile', 'text', 'ICC profile name'], ['bitDepth', 'Bit Depth', 'select', ['8', '16', '32']]]
}, {
  title: 'Location (GPS)',
  types: ['image', 'video'],
  fields: [['gpsLatitude', 'GPS Latitude', 'text', 'e.g. 34.0522'], ['gpsLongitude', 'GPS Longitude', 'text', 'e.g. -118.2437'], ['gpsAltitude', 'GPS Altitude', 'text', 'meters']]
}, {
  title: 'IPTC / XMP',
  types: ['image'],
  fields: [['headline', 'Headline', 'text', 'IPTC headline'], ['caption', 'Caption', 'textarea', 'Caption / abstract'], ['byLine', 'By-line', 'text', 'Photographer / creator'], ['credit', 'Credit', 'text', 'Credit line'], ['source', 'Source', 'text', 'Original source'], ['instructions', 'Instructions', 'textarea', 'Special instructions']]
}, {
  title: 'IPTC Location',
  types: ['image'],
  fields: [['subLocation', 'Sub-location', 'text', 'Specific location'], ['city', 'City', 'text', 'City'], ['stateProvince', 'State / Province', 'text', 'State or province'], ['country', 'Country', 'text', 'Country name']]
}, {
  title: 'Video — Stream',
  types: ['video'],
  fields: [['duration', 'Duration', 'text', 'HH:MM:SS', true], ['frameRate', 'Frame Rate', 'text', 'e.g. 29.97', true], ['videoCodec', 'Video Codec', 'text', 'e.g. H.264', true], ['videoBitrate', 'Video Bitrate', 'text', 'e.g. 5000 kbps', true], ['resolution', 'Resolution', 'text', 'e.g. 1920x1080', true]]
}, {
  title: 'Audio — ID3 Tags',
  types: ['audio'],
  fields: [['title', 'Title', 'text', 'Track title'], ['artist', 'Artist', 'text', 'Artist name'], ['album', 'Album', 'text', 'Album name'], ['year', 'Year', 'text', 'Release year'], ['track', 'Track #', 'text', 'e.g. 1/12'], ['genre', 'Genre', 'text', 'Genre'], ['composer', 'Composer', 'text', 'Composer name'], ['comment', 'Comment', 'textarea', 'Comment']]
}, {
  title: 'Audio — Stream',
  types: ['audio'],
  fields: [['duration2', 'Duration', 'text', 'HH:MM:SS', true], ['codec', 'Codec', 'text', 'e.g. AAC', true], ['bitrate', 'Bitrate', 'text', 'e.g. 320 kbps', true], ['sampleRate', 'Sample Rate', 'text', 'e.g. 44100 Hz', true]]
}, {
  title: 'Document',
  types: ['document'],
  fields: [['title2', 'Title', 'text', 'Document title'], ['subject', 'Subject', 'text', 'Subject'], ['pageCount', 'Page Count', 'number', '', true], ['pdfProducer', 'PDF Producer', 'text', '', true]]
}, {
  title: '3D / Model',
  types: ['3d'],
  fields: [['geometryType', 'Geometry Type', 'select', ['Mesh', 'NURBS', 'Solid']], ['vertexCount', 'Vertex Count', 'number', '', true], ['faceCount', 'Face Count', 'number', '', true], ['sceneUnits', 'Scene Units', 'select', ['mm', 'cm', 'm', 'in']], ['upAxis', 'Up Axis', 'select', ['Y-up', 'Z-up']], ['fileFormat', 'File Format', 'text', 'e.g. FBX, GLTF', true], ['sourceApp', 'Source App', 'text', 'e.g. Blender', true]]
}, {
  title: 'Distribution',
  types: ['all'],
  fields: [['channels', 'Channels', 'text', 'Distribution channels'], ['conversionPreset', 'Conversion Preset', 'select', ['Web Optimized', 'Print Ready', 'Social Media', 'Original']]]
}];

/* ── wording and the legacy action map (plenix.js bulkAction) ── */
const BULK_ACTIONS = {
  'Download': 'baDownload',
  'Download as': 'baDownloadAs',
  'Delete': 'baDelete',
  'Add to Collection': 'baCollection',
  'Move': 'baMove',
  'Change Category': 'baChangeCategory',
  'Add to Cart': 'baCart',
  'Change Status': 'baStatus',
  'Update Metadata': 'baMetadata',
  'Edit Tags': 'baTags',
  'Rating': 'baRating',
  'Share': 'baShare',
  'Delete Category': 'baDelete',
  'Move Category': 'baMove',
  'Change Category Status': 'baStatus',
  'Share Category': 'baShare',
  'Rename Category': 'baRename',
  'Edit Category': 'baMetadata'
};
// Buttons on the category bar (index.html #catBulkBar); 'Download Category' and 'Download Category as' have no dialog.
const CATEGORY_ACTIONS = ['Delete Category', 'Move Category', 'Change Category Status', 'Share Category', 'Rename Category', 'Edit Category', 'Download Category', 'Download Category as'];
// .single-only buttons: disabled while more than one item is selected.
const SINGLE_ONLY = ['Rename Category', 'Edit Category', 'Edit Image', 'Regenerate Thumbnail'];
function bulkDialogFor(action) {
  const id = BULK_ACTIONS[action];
  if (!id) return null;
  return {
    id,
    kind: CATEGORY_ACTIONS.indexOf(action) >= 0 ? 'category' : 'asset',
    singleOnly: SINGLE_ONLY.indexOf(action) >= 0
  };
}
const bulkComingSoon = action => action + ' — coming soon';
exports.bulkComingSoon = bulkComingSoon;
const isSingleOnly = action => SINGLE_ONLY.indexOf(action) >= 0;

/* ── small shared parts ── */
exports.isSingleOnly = isSingleOnly;
const Caption = ({
  children
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  as: "p",
  variant: "secondary"
}, children);
const match = q => s => !q || s.toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;
const NoData = () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, {
  title: "No data"
});

/* Cancel + main action; the main action hands the values to onApply and closes, as closeBaModal() did. */
function Footer({
  onClose,
  label,
  onApply,
  values
}) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: () => {
      if (onApply) onApply(values);
      onClose();
    }
  }, label));
}

/* Fresh state for each opening: the body remounts after every close (so the open dialog itself never remounts). */
function useOpenKey(open) {
  const [key, setKey] = _react.default.useState(0);
  _react.default.useEffect(() => {
    if (!open) setKey(k => k + 1);
  }, [open]);
  return key;
}

/* ── baDelete ── */
function BaDeleteDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onConfirm
}) {
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.ConfirmDialog, {
    open: open,
    destructive: true,
    confirmLabel: "Delete",
    onCancel: onClose,
    onConfirm: () => {
      if (onConfirm) onConfirm();
      onClose();
    },
    title: 'Delete ' + things(count, kind) + '?',
    message: "This action will move the selected items to the trash. You can restore them within 30 days."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Notice, {
    tone: "warning"
  }, "Deleted assets will be removed from all collections and shared links. Collaborators will lose access immediately."));
}

/* ── baCollection: pick any number of collections (toggleClass 'selected') ── */
function BaCollectionDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply,
  onCreateCollection
}) {
  return /*#__PURE__*/_react.default.createElement(CollectionInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply,
    onCreateCollection: onCreateCollection
  });
}
function CollectionInner({
  open,
  onClose,
  count,
  kind,
  onApply,
  onCreateCollection
}) {
  const [q, setQ] = _react.default.useState('');
  const [picked, setPicked] = _react.default.useState([]);
  const shown = COLLECTIONS.filter(match(q));
  const toggle = c => setPicked(picked.indexOf(c) >= 0 ? picked.filter(p => p !== c) : picked.concat(c));
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "briefcase-plus",
    title: "Add to Collection",
    description: 'Add ' + things(count, kind, 'selected ') + ' to a collection',
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Add to Collection",
      onApply: onApply,
      values: {
        collections: picked
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Search or create collection"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "searchOrCreateCollection",
    placeholder: "Type to search collections...",
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    role: "group",
    "aria-label": "Collections",
    className: "plx-stack plx-stack--gap-xs plx-layout--max-sm"
  }, shown.length ? shown.map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    key: c,
    label: c,
    checked: picked.indexOf(c) >= 0,
    onChange: () => toggle(c)
  })) : /*#__PURE__*/_react.default.createElement(NoData, null)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "plus",
    onClick: () => {
      if (onCreateCollection) onCreateCollection();
    }
  }, "Create New Collection"))));
}

/* ── category pickers (selectOnly 'selected') shared by baMove and baChangeCategory ── */
function CategoryPicker({
  label,
  placeholder,
  name,
  list,
  value,
  onChange
}) {
  const [q, setQ] = _react.default.useState('');
  const nodes = list.filter(match(q)).map(c => ({
    id: c,
    label: c,
    icon: 'folder'
  }));
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: label
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: name,
    placeholder: placeholder,
    value: q,
    onChange: e => setQ(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-layout--max-sm"
  }, nodes.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tree, {
    label: "Categories",
    nodes: nodes,
    selected: value,
    onSelect: onChange
  }) : /*#__PURE__*/_react.default.createElement(NoData, null)));
}

/* ── baMove ── */
function BaMoveDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(MoveInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function MoveInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [dest, setDest] = _react.default.useState(null);
  const [removeCurrent, setRemoveCurrent] = _react.default.useState(false);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "move",
    title: "Move Assets",
    description: 'Select destination category for ' + things(count, kind),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Move",
      onApply: onApply,
      values: {
        category: dest,
        removeFromCurrentCategory: removeCurrent
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(CategoryPicker, {
    label: "Search categories",
    placeholder: "Type to search...",
    name: "searchCategories",
    list: MOVE_CATEGORIES,
    value: dest,
    onChange: setDest
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "removeFromCurrentCategory",
    label: "Remove from current category",
    checked: removeCurrent,
    onChange: e => setRemoveCurrent(e.target.checked)
  })));
}

/* ── baChangeCategory ── */
function BaChangeCategoryDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  currentCategory = CURRENT_CATEGORY,
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(ChangeCategoryInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    currentCategory: currentCategory,
    onApply: onApply
  });
}
function ChangeCategoryInner({
  open,
  onClose,
  count,
  kind,
  currentCategory,
  onApply
}) {
  const [dest, setDest] = _react.default.useState(null);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "folder",
    title: "Change Category",
    description: 'Reassign ' + things(count, kind) + ' to a different category',
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Change Category",
      onApply: onApply,
      values: {
        category: dest
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Current Category"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, null, currentCategory))), /*#__PURE__*/_react.default.createElement(CategoryPicker, {
    label: "New Category",
    placeholder: "Type to search categories...",
    name: "newCategory",
    list: CHANGE_CATEGORIES,
    value: dest,
    onChange: setDest
  })));
}

/* ── baCart ── */
function BaCartDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(CartInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function CartInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [format, setFormat] = _react.default.useState(CART_FORMATS[0]);
  const [fileType, setFileType] = _react.default.useState(CART_FILE_TYPES[0]);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "plus",
    title: "Add to Cart",
    description: 'Add ' + things(count, kind) + ' to your download cart',
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Add to Cart",
      onApply: onApply,
      values: {
        format,
        fileType
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    label: "Download Format",
    name: "cartFmt",
    value: format,
    onChange: setFormat,
    options: CART_FORMATS.map(v => ({
      value: v,
      label: v
    }))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "File Type"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "fileType",
    value: fileType,
    onChange: e => setFileType(e.target.value)
  }, CART_FILE_TYPES.map(v => /*#__PURE__*/_react.default.createElement("option", {
    key: v
  }, v)))), /*#__PURE__*/_react.default.createElement(Caption, null, 'Items in your cart: ' + CART_ITEMS + ' • Adding ' + count + ' more')));
}

/* ── baStatus ── */
function BaStatusDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(StatusInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function StatusInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [status, setStatus] = _react.default.useState('Pending Review');
  const [note, setNote] = _react.default.useState('');
  const options = STATUSES.map(s => ({
    value: s.value,
    label: /*#__PURE__*/_react.default.createElement("span", {
      className: "plx-inline plx-inline--gap-sm plx-layout--align-center"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusDot, {
      tone: s.tone
    }), s.value)
  }));
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "circle-check",
    title: "Change Status",
    description: 'Set edit status for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply Status",
      onApply: onApply,
      values: {
        status,
        note
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    label: "New Status",
    name: "bulkStatus",
    value: status,
    onChange: setStatus,
    options: options
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Note (optional)"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, {
    name: "noteOptional",
    placeholder: "Add a reason for the status change...",
    value: note,
    onChange: e => setNote(e.target.value)
  }))));
}

/* ── baMetadata: type filter (filterBaMeta) and collapsible groups (toggleMetaGroup); only General starts open ── */
function MetaControl({
  field,
  value,
  onChange
}) {
  const [key, label, kind, extra, readOnly] = field;
  if (kind === 'rating') return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Rating, {
    label: label,
    value: value || 0,
    onChange: onChange
  });
  if (kind === 'select') {
    return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
      name: key,
      value: value || '',
      onChange: e => onChange(e.target.value)
    }, /*#__PURE__*/_react.default.createElement("option", {
      value: ""
    }, KEEP), extra.map(o => /*#__PURE__*/_react.default.createElement("option", {
      key: o
    }, o)));
  }
  const common = {
    name: key,
    value: value || '',
    placeholder: extra || undefined,
    readOnly: readOnly || undefined,
    onChange: e => onChange(e.target.value)
  };
  if (kind === 'textarea') return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, _extends({
    rows: 2
  }, common));
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    type: kind
  }, common));
}
function BaMetadataDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(MetadataInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function MetadataInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [type, setType] = _react.default.useState('all');
  const [openGroups, setOpenGroups] = _react.default.useState(['General']);
  const [values, setValues] = _react.default.useState({});
  const [overwrite, setOverwrite] = _react.default.useState(false);
  const [appendTags, setAppendTags] = _react.default.useState(false);
  const toggle = t => setOpenGroups(openGroups.indexOf(t) >= 0 ? openGroups.filter(g => g !== t) : openGroups.concat(t));
  const shows = g => type === 'all' || g.types.indexOf('all') >= 0 || g.types.indexOf(type) >= 0;
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "lg",
    icon: "fields",
    title: "Update Metadata",
    description: 'Batch-edit metadata for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Save Metadata",
      onApply: onApply,
      values: {
        fields: values,
        overwrite,
        appendTags
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SegmentedControl, {
    label: "Asset type",
    size: "sm",
    options: META_TYPES,
    value: type,
    onChange: setType
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-sm plx-layout--max-lg"
  }, META_GROUPS.filter(shows).map(g => {
    const isOpen = openGroups.indexOf(g.title) >= 0;
    return /*#__PURE__*/_react.default.createElement("section", {
      key: g.title,
      "aria-label": g.title,
      className: "plx-stack plx-stack--gap-sm"
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "sm",
      icon: isOpen ? 'chevron-down' : 'triangle-right',
      expanded: isOpen,
      onClick: () => toggle(g.title)
    }, g.title)), isOpen ? g.fields.map(f => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
      key: f[0],
      label: f[1],
      layout: "inline"
    }, /*#__PURE__*/_react.default.createElement(MetaControl, {
      field: f,
      value: values[f[0]],
      onChange: v => setValues({
        ...values,
        [f[0]]: v
      })
    }))) : null);
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "overwriteExistingValues",
    label: "Overwrite existing values (blank fields are skipped)",
    checked: overwrite,
    onChange: e => setOverwrite(e.target.checked)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "appendTagsInsteadOfReplacing",
    label: "Append tags instead of replacing",
    checked: appendTags,
    onChange: e => setAppendTags(e.target.checked)
  }))));
}

/* ── baTags: × removes a current tag; a suggested tag is added on the first click and removed on the second
   (toggleSuggestedChip) ── */
function BaTagsDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(TagsInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function TagsInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [add, setAdd] = _react.default.useState('');
  const [current, setCurrent] = _react.default.useState(CURRENT_TAGS);
  const [suggested, setSuggested] = _react.default.useState(SUGGESTED_TAGS.map(t => ({
    t,
    on: false
  })));
  const clickSuggested = s => setSuggested(s.on ? suggested.filter(x => x !== s) : suggested.map(x => x === s ? {
    t: x.t,
    on: true
  } : x));
  const values = {
    add: add.split(',').map(t => t.trim()).filter(Boolean),
    current,
    added: suggested.filter(s => s.on).map(s => s.t)
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "tags",
    title: "Edit Tags",
    description: 'Add or remove tags for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply Tags",
      onApply: onApply,
      values: values
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Add Tags"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "addTags",
    placeholder: "Type tags separated by commas...",
    value: add,
    onChange: e => setAdd(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Current Tags (click \xD7 to remove)"), current.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Current Tags"
  }, current.map(t => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, {
    key: t,
    onRemove: () => setCurrent(current.filter(x => x !== t))
  }, t))) : /*#__PURE__*/_react.default.createElement(NoData, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Suggested Tags (click to add)"), suggested.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Suggested Tags"
  }, suggested.map(s => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Chip, {
    key: s.t,
    selected: s.on,
    "aria-label": s.on ? 'Remove tag ' + s.t : undefined,
    onClick: () => clickSuggested(s)
  }, s.on ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, s.t, " ", /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7")) : s.t))) : /*#__PURE__*/_react.default.createElement(NoData, null))));
}

/* ── baRating (setBaStars; Clear sets 0) ── */
function BaRatingDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(RatingInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function RatingInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [stars, setStars] = _react.default.useState(0);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "sparkle",
    title: "Set Rating",
    description: 'Rate ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply Rating",
      onApply: onApply,
      values: {
        rating: stars
      }
    })
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-inline plx-inline--gap-sm plx-layout--align-center"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Rating, {
    label: "Rating",
    value: stars,
    onChange: setStars
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => setStars(0)
  }, "Clear")));
}

/* ── baShare ── */
function BaShareDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(ShareInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function ShareInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [person, setPerson] = _react.default.useState('');
  const {
    account
  } = (0, _plenixPlatform.useSession)();
  const [people, setPeople] = _react.default.useState(() => [{
    name: account.name,
    permission: 'Can Edit'
  }].concat(SHARED_WITH));
  const [expiration, setExpiration] = _react.default.useState('30 days');
  const [opts, setOpts] = _react.default.useState({
    allowDownloads: true,
    requirePassword: false,
    notifyRecipientsByEmail: false
  });
  const check = (k, label) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: k,
    label: label,
    checked: opts[k],
    onChange: e => setOpts({
      ...opts,
      [k]: e.target.checked
    })
  });
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "share",
    title: "Share",
    description: 'Share ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Share",
      onApply: onApply,
      values: {
        link: SHARE_LINK,
        invite: person,
        people,
        expiration,
        ...opts
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Share Link"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "shareLink",
    readOnly: true,
    data: true,
    value: SHARE_LINK
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    onClick: () => toast.show('Link copied', {
      tone: 'success'
    })
  }, "Copy")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Share With People"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "shareWithPeople",
    placeholder: "Enter name or email...",
    value: person,
    onChange: e => setPerson(e.target.value)
  })), people.length ? /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-sm"
  }, people.map((p, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: p.name,
    className: "plx-inline plx-inline--gap-sm plx-layout--align-center"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Avatar, {
    name: p.name
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "plx-grow"
  }, p.name), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    "aria-label": 'Permission for ' + p.name,
    value: p.permission,
    onChange: e => setPeople(people.map((x, j) => j === i ? {
      ...x,
      permission: e.target.value
    } : x))
  }, PERMISSIONS.map(o => /*#__PURE__*/_react.default.createElement("option", {
    key: o
  }, o)))))) : /*#__PURE__*/_react.default.createElement(NoData, null), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Link Expiration"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "linkExpiration",
    value: expiration,
    onChange: e => setExpiration(e.target.value)
  }, EXPIRATIONS.map(o => /*#__PURE__*/_react.default.createElement("option", {
    key: o
  }, o)))), /*#__PURE__*/_react.default.createElement("div", null, check('allowDownloads', 'Allow downloads'), check('requirePassword', 'Require password'), check('notifyRecipientsByEmail', 'Notify recipients by email'))));
}

/* ── baDownload ── */
function BaDownloadDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(DownloadInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function DownloadInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [format, setFormat] = _react.default.useState(DOWNLOAD_FORMATS[0]);
  const [fileType, setFileType] = _react.default.useState(DOWNLOAD_FILE_TYPES[0]);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "download-tray",
    title: "Download",
    description: 'Download ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Download",
      onApply: onApply,
      values: {
        format,
        fileType
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    label: "Format",
    name: "dlFmt",
    value: format,
    onChange: setFormat,
    options: DOWNLOAD_FORMATS.map(v => ({
      value: v,
      label: v
    }))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "File Type"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "fileType",
    value: fileType,
    onChange: e => setFileType(e.target.value)
  }, DOWNLOAD_FILE_TYPES.map(v => /*#__PURE__*/_react.default.createElement("option", {
    key: v
  }, v)))), /*#__PURE__*/_react.default.createElement(Caption, null, "Estimated download: ", /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, DOWNLOAD_ESTIMATE), " (ZIP archive)")));
}

/* ── baDownloadAs ── */
function BaDownloadAsDialog({
  open,
  onClose,
  count = 1,
  kind = 'asset',
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(DownloadAsInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    count: count,
    kind: kind,
    onApply: onApply
  });
}
function DownloadAsInner({
  open,
  onClose,
  count,
  kind,
  onApply
}) {
  const [v, setV] = _react.default.useState({
    convertTo: CONVERT_TO[0],
    width: '',
    height: '',
    unit: 'px',
    maintainAspectRatio: true,
    stripMetadata: false
  });
  const set = k => e => setV({
    ...v,
    [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
  });
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "download-alt",
    title: "Download As",
    description: 'Convert and download ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Download",
      onApply: onApply,
      values: v
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Convert To"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "convertTo",
    value: v.convertTo,
    onChange: set('convertTo')
  }, CONVERT_TO.map(o => /*#__PURE__*/_react.default.createElement("option", {
    key: o
  }, o)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Fieldset, {
    legend: "Resize"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-inline plx-inline--gap-sm plx-layout--align-center"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "width",
    "aria-label": "Width",
    placeholder: "Width",
    value: v.width,
    onChange: set('width')
  }), /*#__PURE__*/_react.default.createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "height",
    "aria-label": "Height",
    placeholder: "Height",
    value: v.height,
    onChange: set('height')
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-layout--width-sm"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "unit",
    "aria-label": "Unit",
    value: v.unit,
    onChange: set('unit')
  }, UNITS.map(o => /*#__PURE__*/_react.default.createElement("option", {
    key: o
  }, o)))))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "maintainAspectRatio",
    label: "Maintain aspect ratio",
    checked: v.maintainAspectRatio,
    onChange: set('maintainAspectRatio')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
    name: "stripMetadataExifIptc",
    label: "Strip metadata (EXIF/IPTC)",
    checked: v.stripMetadata,
    onChange: set('stripMetadata')
  }))));
}

/* ── baRename (category bar only, one category) ── */
function BaRenameDialog({
  open,
  onClose,
  itemName = CURRENT_CATEGORY,
  onApply
}) {
  return /*#__PURE__*/_react.default.createElement(RenameInner, {
    key: useOpenKey(open),
    open: open,
    onClose: onClose,
    itemName: itemName,
    onApply: onApply
  });
}
function RenameInner({
  open,
  onClose,
  itemName,
  onApply
}) {
  const [name, setName] = _react.default.useState('');
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "rename",
    title: "Rename Category",
    description: "Rename selected category",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Rename",
      onApply: onApply,
      values: {
        currentName: itemName,
        newName: name
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Current Name"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "currentName",
    readOnly: true,
    value: itemName
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "New Name"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "newName",
    placeholder: "Enter new name...",
    value: name,
    onChange: e => setName(e.target.value)
  }))));
}
const DIALOGS = exports.DIALOGS = {
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
  baRename: BaRenameDialog
};
  } },
  "dam/app/pages/home/HomePage.jsx": { deps: {"react":null,"plenix-platform":null,"../../shell/AssetShell.jsx":"dam/app/shell/AssetShell.jsx","./Sidebar.jsx":"dam/app/pages/home/Sidebar.jsx","./Inspector.jsx":"dam/app/pages/home/Inspector.jsx","./homeData.js":"dam/app/pages/home/homeData.js","../../dialogs/BrowseDialogs.jsx":"dam/app/dialogs/BrowseDialogs.jsx","../../dialogs/UploadDialog.jsx":"dam/app/dialogs/UploadDialog.jsx","../../dialogs/MetadataFilterDialog.jsx":"dam/app/dialogs/MetadataFilterDialog.jsx","../../dialogs/BulkDialogs.jsx":"dam/app/dialogs/BulkDialogs.jsx"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HomePage = HomePage;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var _AssetShell = require("../../shell/AssetShell.jsx");
var _Sidebar = require("./Sidebar.jsx");
var _Inspector = require("./Inspector.jsx");
var D = _interopRequireWildcard(require("./homeData.js"));
var _BrowseDialogs = require("../../dialogs/BrowseDialogs.jsx");
var _UploadDialog = require("../../dialogs/UploadDialog.jsx");
var _MetadataFilterDialog = require("../../dialogs/MetadataFilterDialog.jsx");
var _BulkDialogs = require("../../dialogs/BulkDialogs.jsx");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · home page (app/pages/home/HomePage.jsx): browse categories and collections, search assets.
   Replaces the HTML of index.html, its dialogs partial and the home-page code of plenix.js (batch 111).
   Views: categories and collections (cards or a table; a category's details on the right) and search results (asset
   cards or a table; the chosen asset's details on the right). Panes: Files (the folder tree), the sidebar, the content,
   the details pane. The sidebar is the shell's side navigation and the details pane its panel: the AppShell collapses,
   resizes and (below 1024px) overlays them.
   The address: ?q=text opens the search results for it; ?upload=1 opens the upload dialog (the header on other pages
   links here). Dialogs are opened by their legacy ids from app/dialogs (one host renders the open one). */
const DIALOGS = {
  ..._BrowseDialogs.DIALOGS,
  ..._UploadDialog.DIALOGS,
  ..._MetadataFilterDialog.DIALOGS,
  ..._BulkDialogs.DIALOGS
};
const GRID_SIZE = {
  S: 'xs',
  M: 'sm',
  L: 'md'
};
function useNarrow() {
  const q = '(max-width: 56.25rem)';
  const [narrow, setNarrow] = _react.default.useState(() => window.matchMedia(q).matches);
  _react.default.useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setNarrow(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return narrow;
}

/* sorting the tables as the legacy sortTable did: numbers, sizes, dates or text */
const parseSize = s => {
  const m = /([\d.]+)\s*(KB|MB|GB|TB|B)/i.exec(s || '');
  if (!m) return 0;
  const v = parseFloat(m[1]);
  return v * {
    TB: 1e12,
    GB: 1e9,
    MB: 1e6,
    KB: 1e3,
    B: 1
  }[m[2].toUpperCase()];
};
function sortRows(rows, sort, types) {
  if (!sort) return rows;
  const t = types[sort.key] || 'text';
  const val = r => t === 'num' ? parseFloat(String(r[sort.key]).replace(/,/g, '')) || 0 : t === 'size' ? parseSize(r[sort.key]) : t === 'date' ? new Date(r[sort.key]).getTime() : String(r[sort.key]);
  return rows.slice().sort((a, b) => {
    const x = val(a),
      y = val(b);
    const r = typeof x === 'string' ? x.localeCompare(y) : x - y;
    return sort.direction === 'ascending' ? r : -r;
  });
}
const ThumbName = ({
  src,
  icon,
  name
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Thumbnail, {
  src: src,
  icon: icon
}), name);
function FilesPane({
  onUpload,
  onClose
}) {
  const [nodes, setNodes] = _react.default.useState(D.FOLDERS);
  const [selected, setSelected] = _react.default.useState('all');
  const [open, setOpen] = _react.default.useState(D.FOLDERS_OPEN);
  const [adding, setAdding] = _react.default.useState(false);
  const [name, setName] = _react.default.useState('');
  const add = () => {
    const label = name.trim();
    if (!label) {
      setAdding(false);
      return;
    }
    const node = {
      id: selected + '/' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label,
      icon: 'folder'
    };
    const put = list => list.map(n => n.id === selected ? {
      ...n,
      children: (n.children || []).concat(node)
    } : n.children ? {
      ...n,
      children: put(n.children)
    } : n);
    setNodes(put(nodes));
    setOpen(open.indexOf(selected) < 0 ? open.concat(selected) : open);
    setName('');
    setAdding(false);
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.SecondaryPane, {
    title: "Files",
    icon: "folder-open",
    actions: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "primary",
      icon: "upload",
      onClick: onUpload
    }, "Upload"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      iconOnly: true,
      icon: "close",
      label: "Close files pane",
      onClick: onClose
    }))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tree, {
    label: "Folders",
    nodes: nodes,
    selected: selected,
    onSelect: setSelected,
    expanded: open,
    onExpandedChange: setOpen
  }), adding ? /*#__PURE__*/_react.default.createElement("input", {
    className: "plx-input",
    autoFocus: true,
    value: name,
    placeholder: "Folder name...",
    "aria-label": "New folder name",
    onChange: e => setName(e.target.value),
    onKeyDown: e => {
      if (e.key === 'Enter') add();
      if (e.key === 'Escape') {
        setName('');
        setAdding(false);
      }
    },
    onBlur: () => {
      if (!name.trim()) setAdding(false);
    }
  }) : /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "xs",
    variant: "ghost",
    icon: "plus",
    onClick: () => setAdding(true)
  }, "New folder")));
}

// the Search workspace: which assets match a query and filters, and in which order
const FIND_EMPTY = {
  query: '',
  filters: {},
  sort: 'Relevance',
  saved: null
};
const MONTH = d => d.replace(/ \d+,/, ''); // "Aug 12, 2026" → "Aug 2026"
function findAssets(f) {
  const words = f.query.toLowerCase().split(/\s+/).filter(Boolean);
  const v = f.filters;
  const list = D.ASSETS.filter(a => {
    const hay = [a.name, a.file, a.cat, a.fmt, a.owner].concat(a.tags).join(' ').toLowerCase();
    if (words.some(w => hay.indexOf(w) < 0)) return false;
    if ((v.type || []).length && v.type.indexOf(a.badge) < 0) return false;
    if ((v.cat || []).length && v.cat.indexOf(a.cat) < 0) return false;
    if ((v.tags || []).length && !v.tags.every(t => a.tags.indexOf(t) >= 0)) return false;
    if (v.owner && a.owner !== v.owner) return false;
    if (v.status && a.status !== v.status) return false;
    if (v.date && MONTH(a.date) !== v.date) return false;
    return true;
  });
  const by = {
    Newest: (a, b) => Date.parse(b.date) - Date.parse(a.date),
    Oldest: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    'Name A–Z': (a, b) => a.name.localeCompare(b.name),
    'Name Z–A': (a, b) => b.name.localeCompare(a.name),
    Size: (a, b) => parseFloat(b.size) - parseFloat(a.size)
  }[f.sort];
  return by ? list.slice().sort(by) : list;
}
const opts = values => Array.from(new Set(values)).sort().map(x => ({
  value: x,
  label: x,
  count: values.filter(y => y === x).length
}));
function HomePage() {
  const toast = (0, _plenixPlatform.useToast)();
  const act = (msg, tone = 'info') => () => toast.show(msg, {
    tone
  });
  const narrow = useNarrow();
  const params = _react.default.useMemo(() => new URLSearchParams(location.search), []);
  const [view, setView] = _react.default.useState(params.get('q') !== null ? 'find' : 'categories');
  const [find, setFind] = _react.default.useState({
    ...FIND_EMPTY,
    query: params.get('q') || ''
  });
  const [saved, setSaved] = _react.default.useState(D.SAVED_SEARCHES);
  const [query, setQuery] = _react.default.useState(params.get('q') || '');
  const [heading, setHeading] = _react.default.useState('');
  const [active, setActive] = _react.default.useState('All Categories');
  const [mode, setMode] = _react.default.useState('grid');
  const [size, setSize] = _react.default.useState('L');
  const [sortLabel, setSortLabel] = _react.default.useState('Sort');
  const [tableSort, setTableSort] = _react.default.useState(null);
  const [selCats, setSelCats] = _react.default.useState([]);
  const [selAssets, setSelAssets] = _react.default.useState([]);
  const [asset, setAsset] = _react.default.useState(null);
  const [viewer, setViewer] = _react.default.useState(null);
  const [files, setFiles] = _react.default.useState(false);
  // the Details panel starts closed where it would cover the content (below 1024px) and opens when an asset is chosen
  const [right, setRight] = _react.default.useState(() => ({
    collapsed: window.matchMedia((0, _plenixPlatform.below)('--plx-sys-shell-inspector-overlay-below')).matches
  }));
  const [dialog, setDialog] = _react.default.useState(params.get('upload') ? {
    id: 'uploadModal',
    props: {}
  } : null);
  const [filters, setFilters] = _react.default.useState({});
  const [dragging, setDragging] = _react.default.useState(0);
  const openDialog = (id, props = {}) => setDialog({
    id,
    props
  });
  const browse = view === 'categories' || view === 'collections';
  const collections = view === 'collections';
  const showView = v => {
    setView(v);
    setFiles(false);
    setSelCats([]);
    setTableSort(null);
  };
  const openCategory = name => {
    setView('search');
    setHeading(name);
    setQuery('');
    setSelAssets([]);
    setActive(name);
    setTableSort(null);
  };
  // the Search workspace: opened from the header search (Enter) with the query, or from a saved search with its criteria
  const openFind = f => {
    setFind({
      ...FIND_EMPTY,
      ...f
    });
    setView('find');
    setFiles(false);
    setSelAssets([]);
    setTableSort(null);
  };
  const onSidebar = (kind, name) => {
    setActive(name);
    if (kind === 'saved') {
      const s = saved.find(x => x.name === name);
      openFind({
        query: s ? s.query : '',
        filters: s ? s.filters : {},
        saved: name
      });
      return;
    }
    if (kind === 'categories' && name === 'All Categories') showView('categories');else if (kind === 'collections' && name === 'All Collections') showView('collections');else openCategory(name);
  };
  const search = q => {
    setQuery(q);
    setActive(null);
    openFind({
      query: q
    });
  };
  const bulk = action => {
    const d = (0, _BulkDialogs.bulkDialogFor)(action);
    if (!d) {
      toast.show((0, _BulkDialogs.bulkComingSoon)(action), {
        tone: 'info'
      });
      return;
    }
    const count = d.kind === 'category' ? selCats.length || 1 : selAssets.length || 1;
    const names = d.kind === 'category' ? D.CATEGORY_CARDS.filter(c => selCats.indexOf(c.id) >= 0).map(c => c.name) : [];
    openDialog(d.id, {
      count,
      kind: d.kind,
      itemName: names[0],
      onCreateCollection: () => openDialog('newCollectionModal')
    });
  };
  const toggle = (list, setList, id) => setList(list.indexOf(id) >= 0 ? list.filter(x => x !== id) : list.concat(id));
  const setFilter = k => v => setFilters({
    ...filters,
    [k]: v
  });
  const hasFilter = k => {
    const v = filters[k];
    return Array.isArray(v) ? v.length > 0 : !!(v && (v.types || v.fields) && (v.fields && Object.keys(v.fields).length || v.types && v.types.indexOf('all') < 0));
  };
  const assetsSel = D.ASSETS.filter(a => selAssets.indexOf(a.id) >= 0);
  const current = asset === null ? null : D.ASSETS[asset];

  /* ── the toolbar above the results: filters, sort, view, size, reset, save ── */
  const toolbar = /*#__PURE__*/_react.default.createElement(_plenixPlatform.DataToolbar, {
    label: "View and filter options",
    start: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, narrow ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "filter",
      caret: true,
      onClick: () => openDialog('mergedFilterModal', {
        tab: 'categories',
        value: {
          categories: filters.categories,
          type: filters.type,
          tags: filters.tags
        },
        onApply: v => setFilters({
          ...filters,
          ...v
        })
      })
    }, "Filters") : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "grid-2x2",
      caret: true,
      selected: hasFilter('categories'),
      onClick: () => openDialog('categoriesFilterModal', {
        value: filters.categories,
        onApply: setFilter('categories')
      })
    }, "Categories"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "image-b",
      caret: true,
      selected: hasFilter('type'),
      onClick: () => openDialog('typeFilterModal', {
        value: filters.type,
        onApply: setFilter('type')
      })
    }, "Type"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "tags",
      caret: true,
      selected: hasFilter('tags'),
      onClick: () => openDialog('tagsFilterModal', {
        value: filters.tags,
        onApply: setFilter('tags')
      })
    }, "Tags")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "settings-customize",
      selected: hasFilter('metadata'),
      onClick: () => openDialog('metadataModal', {
        value: filters.metadata,
        onApply: setFilter('metadata')
      })
    }, "Advanced"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Menu, {
      label: "Sort",
      trigger: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        icon: "sort",
        caret: true,
        "aria-label": sortLabel === 'Sort' ? 'Sort' : 'Sort: ' + sortLabel
      }, sortLabel)
    }, D.SORT_OPTIONS.map(o => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
      key: o,
      checked: sortLabel === o,
      onSelect: () => setSortLabel(o)
    }, o)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuDivider, null), /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
      onSelect: () => openDialog('advancedSortModal', {
        onApply: v => setSortLabel(v.field)
      })
    }, "Advanced Sort\u2026"))),
    end: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SegmentedControl, {
      label: "View",
      value: mode,
      onChange: setMode,
      options: [{
        value: 'grid',
        label: 'Grid'
      }, {
        value: 'table',
        label: 'Table'
      }]
    }), mode === 'grid' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.SegmentedControl, {
      label: "Card size",
      value: size,
      onChange: setSize,
      options: [{
        value: 'S',
        label: 'S'
      }, {
        value: 'M',
        label: 'M'
      }, {
        value: 'L',
        label: 'L'
      }]
    }) : null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      iconOnly: true,
      icon: "close",
      label: "Reset filters",
      onClick: () => {
        setFilters({});
        setSortLabel('Sort');
        toast.show('Reset filters', {
          tone: 'info'
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      size: "sm",
      iconOnly: true,
      icon: "save",
      label: "Save current search",
      onClick: () => openDialog('saveSearchModal')
    }))
  });

  /* ── bulk actions ── */
  const catBulk = /*#__PURE__*/_react.default.createElement(_plenixPlatform.BulkActions, {
    count: selCats.length,
    total: D.CATEGORY_CARDS.length,
    noun: "category",
    plural: "categories",
    onSelectAll: () => setSelCats(D.CATEGORY_CARDS.map(c => c.id)),
    onClear: () => setSelCats([]),
    label: "Category actions",
    actions: [{
      id: 'dl',
      label: 'Download',
      icon: 'download-tray',
      items: [{
        id: 'd',
        label: 'Download',
        onSelect: () => bulk('Download Category')
      }, {
        id: 'da',
        label: 'Download as',
        onSelect: () => bulk('Download Category as')
      }]
    }, {
      id: 'del',
      label: 'Delete',
      icon: 'trash-detail',
      danger: true,
      onSelect: () => bulk('Delete Category')
    }, {
      id: 'move',
      label: 'Move',
      icon: 'move',
      onSelect: () => bulk('Move Category')
    }, {
      id: 'rename',
      label: 'Rename',
      icon: 'rename',
      single: true,
      onSelect: () => bulk('Rename Category')
    }, {
      id: 'meta',
      label: 'Edit Metadata',
      icon: 'fields',
      single: true,
      onSelect: () => bulk('Edit Category')
    }, {
      id: 'status',
      label: 'Change Status',
      icon: 'circle-check',
      onSelect: () => bulk('Change Category Status')
    }, {
      id: 'share',
      label: 'Share',
      icon: 'share',
      onSelect: () => bulk('Share Category')
    }]
  });
  const item = (label, action, extra) => ({
    id: action,
    label,
    onSelect: () => bulk(action),
    ...extra
  });
  const assetBulk = /*#__PURE__*/_react.default.createElement(_plenixPlatform.BulkActions, {
    count: selAssets.length,
    total: D.ASSETS.length,
    noun: "asset",
    onSelectAll: () => setSelAssets(D.ASSETS.map(a => a.id)),
    onClear: () => setSelAssets([]),
    label: "Asset actions",
    actions: [{
      id: 'dl',
      label: 'Download',
      icon: 'download-tray',
      items: [item('Download', 'Download'), item('Download as', 'Download as')]
    }, {
      id: 'edit',
      label: 'Edit',
      icon: 'fields',
      items: [item('Multi Edit', 'Multi Edit'), item('Edit Image', 'Edit Image', {
        single: true
      }), item('Update Metadata', 'Update Metadata'), item('Approve', 'Approve'), item('Reject', 'Reject'), item('Export', 'Export'), item('Delete Selected Assets', 'Delete', {
        danger: true
      }), item('Print Assets', 'Print Assets')]
    }, {
      id: 'add',
      label: 'Add To',
      icon: 'briefcase-plus',
      items: [item('Cart', 'Add to Cart'), item('Bookmarks', 'Add to Bookmarks'), item('Document', 'Add to Document'), item('Person', 'Add to Person'), item('Categories', 'Add to Categories'), item('Collections', 'Add to Collections'), item('Media Profile', 'Add to Media Profile')]
    }, {
      id: 'move',
      label: 'Move',
      icon: 'move',
      onSelect: () => bulk('Move')
    }, {
      id: 'share',
      label: 'Share',
      icon: 'share',
      items: [item('Email Assets', 'Email Assets'), item('Publish Assets to Server', 'Publish Assets to Server')]
    }, {
      id: 'publish',
      label: 'Publish',
      icon: 'upload',
      onSelect: () => bulk('Publish')
    }, {
      id: 'thumb',
      label: 'Regenerate Thumbnail',
      icon: 'image-b-2',
      single: true,
      onSelect: () => bulk('Regenerate Thumbnail')
    }]
  });
  const found = findAssets(find);
  // Save search: keeps the query and filters under a name in the left navigation's Saved Searches
  const saveSearch = () => openDialog('saveSearchModal', {
    onSave: v => {
      const name = (v.name || '').trim() || (find.query ? 'Search: ' + find.query : 'Saved search');
      setSaved(saved.filter(x => x.name !== name).concat([{
        name,
        query: find.query,
        filters: find.filters
      }]));
      if (view === 'find') setFind({
        ...find,
        saved: name
      });
      setActive(name);
    }
  });
  const setFindFilter = (id, value) => setFind({
    ...find,
    filters: {
      ...find.filters,
      [id]: value
    },
    saved: null
  });
  const filterDefs = [{
    id: 'type',
    label: 'Type',
    multiple: true,
    options: opts(D.ASSETS.map(a => a.badge)),
    value: find.filters.type || []
  }, {
    id: 'cat',
    label: 'Category',
    multiple: true,
    options: opts(D.ASSETS.map(a => a.cat)),
    value: find.filters.cat || []
  }, {
    id: 'tags',
    label: 'Tags',
    multiple: true,
    options: opts([].concat.apply([], D.ASSETS.map(a => a.tags))),
    value: find.filters.tags || []
  }, {
    id: 'owner',
    label: 'Owner',
    options: opts(D.ASSETS.map(a => a.owner)),
    value: find.filters.owner || null
  }, {
    id: 'date',
    label: 'Date',
    options: opts(D.ASSETS.map(a => MONTH(a.date))),
    value: find.filters.date || null
  }, {
    id: 'status',
    label: 'Status',
    options: opts(D.ASSETS.map(a => a.status)),
    value: find.filters.status || null
  }];

  /* ── content ── */
  let content;
  if (view === 'categories') {
    content = mode === 'grid' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: GRID_SIZE[size],
      label: "Categories"
    }, D.CATEGORY_CARDS.map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
      key: c.id,
      src: c.thumb,
      title: c.name,
      meta: c.count + ' assets',
      selected: selCats.indexOf(c.id) >= 0,
      selecting: selCats.length > 0,
      onSelectChange: () => toggle(selCats, setSelCats, c.id),
      selectLabel: 'Select ' + c.name,
      onOpen: () => openCategory(c.name),
      actions: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Menu, {
        label: 'Options for ' + c.name,
        placement: "bottom-end",
        trigger: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "xs",
          variant: "ghost",
          iconOnly: true,
          icon: "menu-lines",
          label: 'Options for ' + c.name
        })
      }, D.CARD_MENU.map(([icon, label, msg]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
        key: label,
        icon: icon,
        danger: label === 'Delete',
        onSelect: act(msg, 'info')
      }, label)))
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
      caption: "Categories",
      pinFirst: true,
      selectable: true,
      selected: selCats,
      onSelectionChange: setSelCats,
      sort: tableSort,
      onSortChange: setTableSort,
      onRowClick: r => openCategory(r.name),
      rows: sortRows(D.CATEGORY_CARDS, tableSort, {
        count: 'num',
        modified: 'date'
      }),
      columns: [{
        key: 'name',
        header: 'Category Name',
        sortable: true,
        emphasis: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          src: r.thumb,
          name: r.name
        })
      }, {
        key: 'count',
        header: 'Assets',
        sortable: true,
        data: true
      }, {
        key: 'modified',
        header: 'Modified',
        sortable: true,
        data: true
      }, {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
          tone: "success"
        }, r.status)
      }]
    });
  } else if (view === 'collections') {
    content = mode === 'grid' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: GRID_SIZE[size],
      label: "Collections"
    }, D.COLLECTION_CARDS.map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
      key: c.id,
      icon: "briefcase",
      title: c.name,
      meta: c.count + ' assets',
      onOpen: () => openCategory(c.name)
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
      caption: "Collections",
      pinFirst: true,
      sort: tableSort,
      onSortChange: setTableSort,
      onRowClick: r => openCategory(r.name),
      rows: sortRows(D.COLLECTION_CARDS, tableSort, {
        count: 'num',
        updated: 'date'
      }),
      columns: [{
        key: 'name',
        header: 'Collection Name',
        sortable: true,
        emphasis: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          icon: "briefcase",
          name: r.name
        })
      }, {
        key: 'count',
        header: 'Assets',
        sortable: true,
        data: true
      }, {
        key: 'updated',
        header: 'Updated',
        sortable: true,
        data: true
      }, {
        key: 'owner',
        header: 'Owner',
        sortable: true
      }]
    });
  } else {
    const list = view === 'find' ? found : D.ASSETS;
    content = mode === 'grid' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: GRID_SIZE[size],
      label: "Search results"
    }, list.map(a => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
      key: a.id,
      src: a.thumb,
      title: a.name,
      meta: a.cat,
      badge: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: a.typeIcon,
        size: "md",
        label: a.badge
      }),
      selected: selAssets.indexOf(a.id) >= 0,
      selecting: selAssets.length > 0,
      onSelectChange: () => toggle(selAssets, setSelAssets, a.id),
      selectLabel: 'Select ' + a.name,
      onOpen: () => {
        setAsset(a.id);
        setRight(r => ({
          ...r,
          collapsed: false
        }));
      },
      "aria-current": asset === a.id ? 'true' : undefined
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
      caption: "Search results",
      pinFirst: true,
      selectable: true,
      selected: selAssets,
      onSelectionChange: setSelAssets,
      sort: tableSort,
      onSortChange: setTableSort,
      onRowClick: r => setAsset(r.id),
      rows: sortRows(list, tableSort, {
        size: 'size',
        date: 'date'
      }),
      columns: [{
        key: 'name',
        header: 'Name',
        sortable: true,
        emphasis: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          src: r.thumb,
          name: r.name
        })
      }, {
        key: 'cat',
        header: 'Category',
        sortable: true,
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
          gap: "xs"
        }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
          name: "folder",
          size: "xs"
        }), r.cat)
      }, {
        key: 'badge',
        header: 'Format',
        sortable: true
      }, {
        key: 'size',
        header: 'Size',
        sortable: true,
        data: true
      }, {
        key: 'date',
        header: 'Date Added',
        sortable: true,
        data: true
      }, {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
          tone: r.status === 'Complete' ? 'success' : 'neutral'
        }, r.status)
      }]
    });
  }
  const pagination = view === 'categories' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Pagination, {
    page: 1,
    pageCount: 3,
    total: D.CATEGORY_TOTAL,
    perPage: 16,
    perPageOptions: [16, 32, 64],
    onPageChange: n => toast.show('Page ' + n, {
      tone: 'info'
    }),
    onPerPageChange: () => {}
  }) : view === 'collections' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Showing 1\u20134 of 4 collections") : view === 'find' ? null : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Pagination, {
    page: 1,
    pageCount: 27,
    total: D.ASSET_TOTAL,
    perPage: 8,
    perPageOptions: [8, 16, 32, 64],
    onPageChange: n => toast.show('Page ' + n, {
      tone: 'info'
    }),
    onPerPageChange: () => {}
  });
  const title = view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : heading || 'Search Results';
  const countText = view === 'categories' ? D.CATEGORY_COUNT_LABEL : view === 'collections' ? D.COLLECTION_CARDS.length + ' collections' : heading === 'Search Results' ? D.SEARCH_COUNT + ' assets found for "' + (query || D.SEARCH_QUERY) + '"' : '';

  /* ── panes ── */
  const sidebar = /*#__PURE__*/_react.default.createElement(_Sidebar.Sidebar, {
    mode: view === 'search' ? 'search' : 'browse',
    active: active,
    saved: saved,
    onRemoveSaved: n => setSaved(saved.filter(x => x.name !== n)),
    onOpen: onSidebar,
    onAdd: id => id === 'saveSearchModal' ? saveSearch() : openDialog(id),
    onFiles: () => setFiles(!files),
    filesOpen: files
  });
  const details = browse ? /*#__PURE__*/_react.default.createElement(_Inspector.CategoryInspector, {
    collection: collections,
    act: act,
    onDialog: id => openDialog(id)
  }) : /*#__PURE__*/_react.default.createElement(_Inspector.AssetInspector, {
    asset: current,
    act: act,
    onDialog: id => openDialog(id),
    onPreview: () => setViewer(asset)
  });
  const filesPane = /*#__PURE__*/_react.default.createElement(FilesPane, {
    onUpload: () => openDialog('uploadModal'),
    onClose: () => setFiles(false)
  });
  const dropHandlers = {
    onDragEnter: e => {
      e.preventDefault();
      setDragging(n => n + 1);
    },
    onDragLeave: e => {
      e.preventDefault();
      setDragging(n => Math.max(0, n - 1));
    },
    onDragOver: e => e.preventDefault(),
    onDrop: e => {
      e.preventDefault();
      setDragging(0);
      const n = e.dataTransfer.files.length;
      if (n) toast.show(n + ' file(s) ready to upload', {
        tone: 'success'
      });
    }
  };
  const Current = dialog && DIALOGS[dialog.id];
  const panel = /*#__PURE__*/_react.default.createElement(_plenixPlatform.SidePanel, {
    title: "Details",
    label: browse ? 'Details' : 'Asset details',
    icon: "circle-info",
    open: !right.collapsed,
    onOpenChange: o => setRight({
      ...right,
      collapsed: !o
    }),
    collapseLabel: "Minimize panel",
    footer: /*#__PURE__*/_react.default.createElement(_Inspector.InspectorFooter, {
      act: act
    })
  }, details);
  return /*#__PURE__*/_react.default.createElement(_AssetShell.AssetPage, {
    title: "Assets",
    query: view === 'find' ? find.query : query,
    onSearch: search,
    sideNav: sidebar,
    panel: panel,
    onUpload: () => openDialog('uploadModal')
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "none",
    align: "stretch",
    grow: true
  }, files ? filesPane : null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.PageContent, _extends({
    "aria-labelledby": "home-title"
  }, browse ? dropHandlers : {}), view === 'find' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchWorkspace, {
    title: find.saved || (find.query ? 'Search results' : 'Search'),
    query: find.query,
    onQueryChange: q => setFind({
      ...find,
      query: q,
      saved: null
    }),
    placeholder: "Search assets by name, filename, metadata\u2026",
    noun: "asset",
    count: found.length,
    filters: filterDefs,
    onFilterChange: setFindFilter,
    onClearAll: () => setFind({
      ...find,
      filters: {},
      saved: null
    }),
    sort: {
      value: find.sort,
      options: ['Relevance', 'Newest', 'Oldest', 'Name A–Z', 'Name Z–A', 'Size'],
      onChange: o => setFind({
        ...find,
        sort: o
      })
    },
    view: {
      value: mode,
      onChange: setMode
    },
    onSave: saveSearch,
    bulk: assetBulk
  }, content) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "md",
    wrap: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "md",
    wrap: true,
    grow: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h2",
    id: "home-title",
    variant: "title"
  }, title), countText ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, countText) : null), view === 'categories' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    variant: "primary",
    onClick: () => openDialog('newCatModal')
  }, "+ New Category") : null, view === 'collections' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    variant: "primary",
    onClick: () => openDialog('newCollectionModal')
  }, "+ New Collection") : null), toolbar, view === 'categories' ? catBulk : null, view === 'search' ? assetBulk : null, content, pagination), dragging ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.DropZone, {
    overlay: true,
    "aria-hidden": "true"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
    name: "upload",
    size: "lg"
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, "Drop files to upload"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "SVG, PNG, JPG, AI, PSD up to 200 MB")) : null)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaViewer, {
    open: viewer !== null,
    onClose: () => setViewer(null),
    label: "Asset preview",
    index: viewer === null ? 0 : viewer,
    onIndexChange: setViewer,
    items: D.ASSETS.map(a => ({
      src: a.thumb,
      alt: a.name,
      title: a.name,
      meta: [a.cat, a.size, a.dims, a.fmt]
    })),
    actions: ['download-tray:Download', 'share:Share', 'pencil:Edit', 'circle-info:Info'].map(s => {
      const [ic, l] = s.split(':');
      return /*#__PURE__*/_react.default.createElement("button", {
        key: l,
        type: "button",
        className: "plx-media-viewer__control",
        onClick: () => setViewer(null)
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: ic,
        size: "sm"
      }), l);
    })
  }), Current ? /*#__PURE__*/_react.default.createElement(Current, _extends({
    open: true,
    onClose: () => setDialog(null)
  }, dialog.props)) : null);
}
  } },
  "dam/app/pages/ImageEditorPage.jsx": { deps: {"react":null,"plenix-platform":null}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageEditorPage = ImageEditorPage;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · image editor (app/pages/ImageEditorPage.jsx): a focus-mode page for one picture (a mockup).
   Replaces image-editor.html's markup, image-editor.js and image-editor.css (batch 112). Every control changes one
   description of the edit (the state); the picture is drawn from it, and each finished change is kept so Undo and Redo
   step through them. Sliders preview while dragging and record when let go. Nothing is uploaded or saved: Save, Copy,
   Download and Export only say what they would do, in the status line over the canvas. The page is dark
   (<html data-plx-mode="dark">). */

const PRESETS = {
  'Grayscale': 'grayscale(1)',
  'Black&White': 'grayscale(1) contrast(1.6)',
  'Sepia': 'sepia(1)',
  'Vintage': 'sepia(0.5) contrast(0.9) brightness(1.05) saturate(0.85)',
  'Polaroid': 'contrast(1.1) brightness(1.1) saturate(1.2) sepia(0.15)',
  'Kodachrome': 'contrast(1.25) saturate(1.3) sepia(0.12)',
  'Technicolor': 'saturate(1.8) contrast(1.15) hue-rotate(-10deg)',
  'Brownie': 'sepia(0.6) contrast(1.1) brightness(0.95)',
  'Lomo': 'contrast(1.3) saturate(1.2) brightness(0.95)',
  'Invert': 'invert(1)'
};
const PRESET_FILES = {
  'Black&White': 'black-white'
};
const RATIOS = {
  '1:1 (Square)': '1 / 1',
  '16:9': '16 / 9',
  '9:16': '9 / 16',
  '4:3': '4 / 3',
  '3:4': '3 / 4',
  '2:1': '2 / 1',
  '1:2': '1 / 2'
};
const RATIO_CHOICES = ['Original', 'Free Transform'].concat(Object.keys(RATIOS));
const FONTS = ['Lato', 'Arvo', 'Caveat', 'Corinthia', 'DancingScript', 'KodeMono', 'MadimiOne', 'MajorMonoDisplay', 'Montserrat', 'OpenSans'];
const EXPORTS = ['PNG', 'JPEG', 'SVG', 'TIFF', 'PSD', 'EPS', 'GIF', 'BMP', 'WebP', 'PDF'];
const SLIDERS = [['brightness', 'Brightness', -100, 100, '%'], ['contrast', 'Contrast', -100, 100, '%'], ['saturation', 'Saturation', -100, 100, '%'], ['hueRotation', 'Hue Rotation', 0, 360, ''], ['vibrance', 'Vibrance', -100, 100, ''], ['blur', 'Blur', 0, 20, ''], ['noise', 'Noise', 0, 100, ''], ['pixelate', 'Pixelate', 0, 50, '']];
const TOOLS = [['filters', 'Filters', 'ed-filters'], ['crop', 'Crop', 'ed-crop'], ['rotate', 'Rotate', 'ed-rotate-cw'], ['text', 'Text', 'ed-text'], ['image', 'Image', 'ed-image']];
const START = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  hueRotation: 0,
  vibrance: 0,
  blur: 0,
  noise: 0,
  pixelate: 0,
  sharpen: false,
  emboss: false,
  edge: false,
  preset: '',
  rotate: 0,
  flipX: false,
  flipY: false,
  crop: '',
  texts: [],
  overlay: null
};
function useStatus() {
  const [msg, setMsg] = _react.default.useState('');
  const timer = _react.default.useRef(null);
  const say = m => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(''), 2600);
  };
  return [msg, say];
}
function ImageEditorPage() {
  const [edit, setEdit] = _react.default.useState(START); // what is drawn (also while a slider moves)
  const [history, setHistory] = _react.default.useState({
    list: [JSON.stringify(START)],
    at: 0
  });
  const [zoom, setZoom] = _react.default.useState(1);
  const [tool, setTool] = _react.default.useState('filters');
  const [open, setOpen] = _react.default.useState(() => !window.matchMedia((0, _plenixPlatform.below)('--plx-sys-shell-phone-below')).matches); // on a phone the canvas comes first
  const [pending, setPending] = _react.default.useState(null); // an overlay picture chosen, not yet composed
  const [overlayOpts, setOverlayOpts] = _react.default.useState({
    opacity: 100,
    scale: 100
  });
  const [text, setText] = _react.default.useState({
    text: '',
    font: 'Lato',
    weight: 'Regular',
    color: '#' + 'd4af37',
    align: 'left'
  }); // DATA: the default text color (the legacy editor's)
  const [ratio, setRatio] = _react.default.useState('Original');
  const [dragOver, setDragOver] = _react.default.useState(false);
  const [msg, say] = useStatus();
  const file = _react.default.useRef(null);
  const commit = (next, message) => {
    setEdit(next);
    const snap = JSON.stringify(next);
    setHistory(h => snap === h.list[h.at] ? h : {
      list: h.list.slice(0, h.at + 1).concat(snap),
      at: h.at + 1
    });
    if (message) say(message);
  };
  const change = (patch, message) => commit({
    ...edit,
    ...patch
  }, message);
  const step = by => {
    const next = history.at + by;
    if (next < 0) {
      say('Nothing to undo');
      return;
    }
    if (next >= history.list.length) {
      say('Nothing to redo');
      return;
    }
    const st = JSON.parse(history.list[next]);
    setHistory({
      ...history,
      at: next
    });
    setEdit(st);
    setPending(null);
    setRatio(st.crop || 'Original');
    say(by < 0 ? 'Undone' : 'Redone');
  };
  const zoomTo = z => {
    setZoom(z);
    say('Zoom ' + Math.round(z * 100) + '%');
  };
  const chooseTool = id => {
    if (id === tool && open) {
      setOpen(false);
      return;
    }
    setTool(id);
    setOpen(true);
  };
  const useFile = f => {
    if (!f || f.type.indexOf('image/') !== 0) {
      say('That file is not an image');
      return;
    }
    setPending({
      src: URL.createObjectURL(f),
      ...overlayOpts
    });
    say('Image ready: adjust it, then choose Compose');
  };

  /* drawing */
  const f = [];
  if (edit.preset) f.push(PRESETS[edit.preset]);
  if (edit.brightness) f.push('brightness(' + (1 + edit.brightness / 100) + ')');
  if (edit.contrast) f.push('contrast(' + (1 + edit.contrast / 100) + ')');
  if (edit.saturation || edit.vibrance) f.push('saturate(' + Math.max(0, 1 + edit.saturation / 100 + edit.vibrance / 200) + ')'); // vibrance as a gentler saturation
  if (edit.hueRotation) f.push('hue-rotate(' + edit.hueRotation + 'deg)');
  if (edit.blur) f.push('blur(' + edit.blur / 4 + 'px)');
  const overlay = pending || edit.overlay;
  const header = /*#__PURE__*/_react.default.createElement("header", {
    className: "plx-image-editor__bar"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar, {
    label: "Editor"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: () => say('Saved')
  }, "Save"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    onClick: () => say('Saved as a copy')
  }, "Save As"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Menu, {
    label: "Export As",
    trigger: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      caret: true
    }, "Export As")
  }, EXPORTS.map(x => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
    key: x,
    onSelect: () => say('Exported as ' + x)
  }, x)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-copy",
    label: "Copy",
    onClick: () => say('Copied')
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-download",
    label: "Download",
    onClick: () => say('Download started')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-undo",
    label: "Undo",
    disabled: history.at === 0,
    onClick: () => step(-1)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-redo",
    label: "Redo",
    disabled: history.at >= history.list.length - 1,
    onClick: () => step(1)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-zoom-in",
    label: "Zoom In",
    onClick: () => zoomTo(Math.min(4, zoom * 1.25))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-zoom-out",
    label: "Zoom Out",
    onClick: () => zoomTo(Math.max(0.25, zoom / 1.25))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-recenter",
    label: "Recenter",
    onClick: () => zoomTo(1)
  }))));
  const panels = {
    filters: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, SLIDERS.map(([k, label, min, max, unit]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Slider, {
      key: k,
      label: label,
      min: min,
      max: max,
      unit: unit,
      value: edit[k],
      onChange: v => setEdit({
        ...edit,
        [k]: v
      }),
      onCommit: v => change({
        [k]: v
      })
    })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, [['sharpen', 'Sharpen'], ['emboss', 'Emboss'], ['edge', 'Edge']].map(([k, l]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Checkbox, {
      key: k,
      name: k,
      label: l,
      checked: edit[k],
      onChange: e => change({
        [k]: e.target.checked
      })
    }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      as: "h3",
      variant: "eyebrow"
    }, "Built-In Filters"), /*#__PURE__*/_react.default.createElement("div", {
      className: "plx-image-editor__presets",
      role: "group",
      "aria-label": "Built-in filters"
    }, Object.keys(PRESETS).map(name => /*#__PURE__*/_react.default.createElement("button", {
      key: name,
      type: "button",
      className: "plx-image-editor__preset",
      "aria-pressed": edit.preset === name,
      onClick: () => change({
        preset: edit.preset === name ? '' : name
      })
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: 'assets/editor/filter-' + (PRESET_FILES[name] || name.toLowerCase()) + '.svg',
      alt: "",
      width: "100",
      height: "56"
    }), /*#__PURE__*/_react.default.createElement("span", null, name))))),
    crop: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
      label: "Aspect Ratio"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
      name: "aspectRatio",
      value: ratio,
      onChange: e => setRatio(e.target.value)
    }, RATIO_CHOICES.map(r => /*#__PURE__*/_react.default.createElement("option", {
      key: r
    }, r)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => {
        const c = RATIOS[ratio] ? ratio : '';
        change({
          crop: c
        }, c ? 'Cropped to ' + ratio : 'Crop cleared');
      }
    }, "Crop"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: () => {
        setRatio('Original');
        change({
          crop: ''
        }, 'Crop cleared');
      }
    }, "Reset"))),
    rotate: /*#__PURE__*/_react.default.createElement("div", {
      className: "plx-image-editor__presets"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      icon: "ed-rotate-ccw",
      onClick: () => change({
        rotate: edit.rotate - 90
      })
    }, "-90\xB0"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      icon: "ed-rotate-cw",
      onClick: () => change({
        rotate: edit.rotate + 90
      })
    }, "+90\xB0"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      icon: "ed-flip-x",
      onClick: () => change({
        flipX: !edit.flipX
      })
    }, "Flip X"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      icon: "ed-flip-y",
      onClick: () => change({
        flipY: !edit.flipY
      })
    }, "Flip Y")),
    text: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
      name: "text",
      placeholder: "Enter text...",
      "aria-label": "Text",
      value: text.text,
      onChange: e => setText({
        ...text,
        text: e.target.value
      })
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
      label: "Font Family"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
      name: "fontFamily",
      value: text.font,
      onChange: e => setText({
        ...text,
        font: e.target.value
      })
    }, FONTS.map(x => /*#__PURE__*/_react.default.createElement("option", {
      key: x
    }, x)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SegmentedControl, {
      label: "Font Weight",
      value: text.weight,
      onChange: w => setText({
        ...text,
        weight: w
      }),
      options: ['Regular', 'Bold', 'Italic'].map(w => ({
        value: w,
        label: w
      }))
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
      label: "Color"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
      name: "color",
      type: "color",
      "aria-label": "Color",
      className: "plx-u-w-40px plx-u-h-28px plx-u-p-0",
      value: text.color,
      onChange: e => setText({
        ...text,
        color: e.target.value
      })
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, text.color.toUpperCase()))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
      label: "Align"
    }, [['left', 'ed-align-left'], ['center', 'ed-align-center'], ['right', 'ed-align-right']].map(([a, ic]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      key: a,
      size: "sm",
      iconOnly: true,
      icon: ic,
      label: 'Align ' + a,
      pressed: text.align === a,
      onClick: () => setText({
        ...text,
        align: a
      })
    }))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => {
        const t = text.text.trim();
        if (!t) {
          say('Type some text first');
          return;
        }
        change({
          texts: edit.texts.concat({
            text: t,
            font: text.font,
            weight: text.weight,
            color: text.color,
            align: text.align
          })
        }, 'Text added');
        setText({
          ...text,
          text: ''
        });
      }
    }, "Insert"))),
    image: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.DropZone, {
      as: "button",
      active: dragOver,
      className: "plx-u-text-content-muted",
      onClick: () => file.current.click(),
      onDragOver: e => {
        e.preventDefault();
        setDragOver(true);
      },
      onDragLeave: () => setDragOver(false),
      onDrop: e => {
        e.preventDefault();
        setDragOver(false);
        useFile(e.dataTransfer.files[0]);
      }
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: "ed-download-2",
      size: "lg"
    }), /*#__PURE__*/_react.default.createElement("span", null, "Drop image to overlay", /*#__PURE__*/_react.default.createElement("br", null), "or click to browse")), /*#__PURE__*/_react.default.createElement("input", {
      ref: file,
      type: "file",
      name: "overlayFile",
      accept: "image/*",
      className: "plx-visually-hidden",
      tabIndex: -1,
      "aria-label": "Overlay image file",
      onChange: e => {
        useFile(e.target.files[0]);
        e.target.value = '';
      }
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Slider, {
      label: "Opacity",
      unit: "%",
      min: 0,
      max: 100,
      value: overlayOpts.opacity,
      onChange: v => {
        setOverlayOpts({
          ...overlayOpts,
          opacity: v
        });
        if (pending) setPending({
          ...pending,
          opacity: v
        });
      }
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Slider, {
      label: "Scale",
      unit: "%",
      min: 10,
      max: 300,
      value: overlayOpts.scale,
      onChange: v => {
        setOverlayOpts({
          ...overlayOpts,
          scale: v
        });
        if (pending) setPending({
          ...pending,
          scale: v
        });
      }
    }), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => {
        if (!pending) {
          say('Choose an image first');
          return;
        }
        const p = pending;
        setPending(null);
        change({
          overlay: p
        }, 'Image added');
      }
    }, "Compose")))
  };
  const toolLabel = TOOLS.find(t => t[0] === tool)[1];
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppShell, {
    header: header,
    mainClassName: "plx-shell-main"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "plx-visually-hidden"
  }, "Plenix Asset Manager: Image Editor"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail, {
    label: "Tools",
    showLabels: true
  }, TOOLS.map(([id, label, icon]) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
    key: id,
    icon: icon,
    label: label,
    pressed: open && tool === id,
    onClick: () => chooseTool(id)
  }))), open ? /*#__PURE__*/_react.default.createElement("aside", {
    "aria-label": toolLabel + ' options',
    className: "plx-image-editor__panel"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h2",
    variant: "eyebrow"
  }, toolLabel), panels[tool]) : null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-image-editor__canvas"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-image-editor__frame",
    style: {
      '--plx-comp-image-editor-zoom': zoom
    }
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "assets/editor/artwork.svg",
    width: "420",
    height: "420",
    alt: "Image being edited: gold Coptic cross on a brown background",
    className: 'plx-image-editor__image' + (edit.crop ? ' plx-image-editor__image--cropped' : ''),
    style: {
      '--plx-comp-image-editor-filter': f.join(' ') || 'none',
      '--plx-comp-image-editor-ratio': edit.crop ? RATIOS[edit.crop] : 'auto',
      '--plx-comp-image-editor-transform': 'rotate(' + edit.rotate + 'deg) scale(' + (edit.flipX ? -1 : 1) + ',' + (edit.flipY ? -1 : 1) + ')'
    }
  }), edit.texts.map((t, i) => /*#__PURE__*/_react.default.createElement("span", {
    key: i,
    className: 'plx-image-editor__text' + (t.weight === 'Bold' ? ' plx-image-editor__text--bold' : '') + (t.weight === 'Italic' ? ' plx-image-editor__text--italic' : '') + (t.align === 'center' ? ' plx-image-editor__text--center' : t.align === 'right' ? ' plx-image-editor__text--end' : ''),
    style: {
      '--plx-comp-image-editor-text-color': t.color,
      '--plx-comp-image-editor-text-font': '"' + t.font + '", var(--plx-sys-font-body)',
      '--plx-comp-image-editor-text-top': 40 + i * 12 + '%'
    }
  }, t.text)), overlay ? /*#__PURE__*/_react.default.createElement("img", {
    src: overlay.src,
    alt: "",
    className: "plx-image-editor__overlay",
    style: {
      '--plx-comp-image-editor-overlay-opacity': overlay.opacity / 100,
      '--plx-comp-image-editor-overlay-scale': overlay.scale / 100
    }
  }) : null), /*#__PURE__*/_react.default.createElement("div", {
    role: "status",
    "aria-live": "polite",
    className: "plx-image-editor__status"
  }, msg)));
}
  } },
  "dam/app/assets.jsx": { deps: {"react":null,"react-dom/client":null,"plenix-platform":null,"./pages/MyAccountPage.jsx":"dam/app/pages/MyAccountPage.jsx","./pages/SystemSettingsPage.jsx":"dam/app/pages/SystemSettingsPage.jsx","./pages/home/HomePage.jsx":"dam/app/pages/home/HomePage.jsx","./pages/ImageEditorPage.jsx":"dam/app/pages/ImageEditorPage.jsx"}, externals: { "react": function () { return window.React; }, "react-dom/client": function () { return window.ReactDOM; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _plenixPlatform = require("plenix-platform");
var _MyAccountPage = require("./pages/MyAccountPage.jsx");
var _SystemSettingsPage = require("./pages/SystemSettingsPage.jsx");
var _HomePage = require("./pages/home/HomePage.jsx");
var _ImageEditorPage = require("./pages/ImageEditorPage.jsx");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · page script (app/assets.jsx). Compiled by Plenix/build-app.js into app/assets.js — edit this file,
   never assets.js. Loaded after platform/vendor/react*.development.js and platform/dist/platform.js.

   React islands: during the migration a page keeps its HTML, and each bounded region that has moved to Platform
   components is a mount point, <… data-plx-mount="name">, that this script renders. When a region lands, its legacy
   markup, CSS and plenix.js wiring are deleted in the same batch. When a page's last legacy region is gone, the page
   becomes one React root and include.js and the partials leave it.

   Islands (name · where · since):
     page · a whole page that has moved to React · batch 109
       <div data-plx-mount="page" data-plx-page="my-account"></div> — the page's only content; it loads no include.js,
       partials or plenix.js. Pages: my-account (settings-myaccount.html, batch 109), system-settings (settings-system.html,
       batch 110), home (index.html, batch 111),
       image-editor (image-editor.html, batch 112). (The first island, badge, batch 103, went with the System Settings page.)

   Temporary event bridges between islands and plenix.js: none yet. Each one added must be named plx:<subject>-<event>,
   with one publisher, its consumers and its removal condition listed here. */

const PAGES = {
  'my-account': _MyAccountPage.MyAccountPage,
  'system-settings': _SystemSettingsPage.SystemSettingsPage,
  home: _HomePage.HomePage,
  'image-editor': _ImageEditorPage.ImageEditorPage
};
const ISLANDS = {
  page: el => {
    const Page = PAGES[el.getAttribute('data-plx-page')];
    return Page ? /*#__PURE__*/_react.default.createElement(Page, null) : null;
  }
};
function mount(el) {
  const render = ISLANDS[el.getAttribute('data-plx-mount')];
  if (!render || el.hasAttribute('data-plx-mounted')) return;
  const tree = render(el); // read the markup before React replaces it
  el.setAttribute('data-plx-mounted', '');
  (0, _client.createRoot)(el).render(/*#__PURE__*/_react.default.createElement(_plenixPlatform.ThemeProvider, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SessionProvider, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToastProvider, null, tree))));
}
function mountAll(root) {
  root.querySelectorAll('[data-plx-mount]').forEach(mount);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => mountAll(document));else mountAll(document);
  } }
  };
  var cache = {};
  function load(id) {
    if (cache[id]) return cache[id].exports;
    var def = defs[id], module = { exports: {} };
    cache[id] = module;
    def.run(module, module.exports, function (spec) {
      if (def.externals[spec]) { var g = def.externals[spec](); if (!g) throw new Error('Plenix: "' + spec + '" is not loaded before this script'); return g; }
      return load(def.deps[spec]);
    });
    return module.exports;
  }
  load("dam/app/assets.jsx");
})();
