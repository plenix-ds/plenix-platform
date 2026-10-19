/*
 * GENERATED FILE — DO NOT EDIT
 * Source: dam/app/assets.jsx and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "suite/session.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUITE_SESSION = void 0;
// The suite's session (the Plenix applications and the Asset Manager) until the back end supplies the signed-in
// person: passed to SessionProvider by suite.jsx and dam/app/assets.jsx. The Platform itself ships no person's data
// (RedSave P-37).
const SUITE_SESSION = exports.SUITE_SESSION = {
  account: {
    name: 'Raphael Maher',
    firstName: 'Raphael',
    lastName: 'Maher',
    email: 'raphael@lighthouseway.org'
  },
  notifications: [{
    id: 1,
    text: 'Fr. Daniel uploaded 12 new assets to Liturgy',
    time: '5 min ago',
    unread: true
  }, {
    id: 2,
    text: 'Maya Chen sent a message: Round 3 concepts — confirm Thursday?',
    time: '10:24 AM',
    unread: true
  }, {
    id: 3,
    text: 'Sarah M. approved your batch download request',
    time: '22 min ago',
    unread: true
  }, {
    id: 4,
    text: 'Task due Mar 8: Deliver logo concepts round 3',
    time: 'Yesterday',
    unread: false
  }, {
    id: 5,
    text: 'Version 3 of Banner Icon Set is now live',
    time: 'Yesterday',
    unread: false
  }],
  // the applications pinned to the header until the person changes them: every application
  pinnedApps: ['home', 'projects', 'messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'assets']
};
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
const FOLDERS = exports.FOLDERS = [folder('All', [folder('Digital Assets', [folder('Banner icon'), folder('Bookshelf'), folder('Borders', [folder('Arch'), folder('Banner'), folder('Circular'), folder('Divider'), folder('Linear'), folder('Page')]), folder('Branding', [folder('Churches'), folder('CYC'), folder('Diakonia'), folder('LACopts')]), folder('Certificates'), folder('Clergy'), folder('Crosses'), folder('Embroideries'), folder('Fonts')]), folder('Documents', [folder('Manuals'), folder('Templates')]), folder('Facial Profiles'), folder('Users')])];
const FOLDERS_OPEN = exports.FOLDERS_OPEN = ['all', 'digital-assets'];

// the sidebar lists (the first row of each is the "All …" view)
const CATEGORIES = exports.CATEGORIES = [['All categories', '4,546', true], ['Branding', '326', true], ['Crosses', '1,284', true], ['Banner icon', '18'], ['Bookshelf', '18'], ['Borders', '245'], ['Certificates', '387'], ['Clergy', '512'], ['Covers', '198'], ['Dome', '14'], ['Embroideries', '31'], ['Fonts', '22'], ['Galloons', '27'], ['Korban Stamp', '8'], ['Ornamental Elements', '45'], ['Presentation Folders', '12']].map(([name, count, pinned]) => ({
  name,
  count,
  pinned: !!pinned
}));
const CATEGORIES_SHOWN = exports.CATEGORIES_SHOWN = 7;
const COLLECTIONS = exports.COLLECTIONS = [['All collections', '305', true], ['Website Assets', '84', true], ['Social Media', '42', true], ['Print ready', '156'], ['Needs review', '23']].map(([name, count, pinned]) => ({
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
const TRASH = exports.TRASH = [['Deleted assets', 12]];
const CATEGORY_CARDS = exports.CATEGORY_CARDS = [['Banner icon', 24, 5, 'Aug 28, 2026'], ['Bookshelf', 18, 6, 'Aug 25, 2026'], ['Borders - Arch', 31, 7, 'Aug 22, 2026'], ['Borders - Circular', 42, 8, 'Aug 20, 2026'], ['Branding - Churches', 28, 9, 'Aug 18, 2026'], ['Branding - CYC', 5, 10, 'Aug 15, 2026'], ['Branding - Diakonia', 15, 11, 'Aug 12, 2026'], ['Certificate - Baptism', 89, 12, 'Aug 10, 2026'], ['Certificate - Masters', 47, 13, 'Aug 8, 2026'], ['Clergy - Metropolitan Serapion', 62, 14, 'Aug 5, 2026'], ['Clergy - Pope Shenouda III', 210, 15, 'Aug 2, 2026'], ['Clergy - Pope Tawadros II', 45, 16, 'Jul 30, 2026'], ['Cross - Traditional', 78, 17, 'Jul 25, 2026'], ['Dome', 33, 18, 'Jul 20, 2026'], ['Embroideries', 156, 19, 'Jul 15, 2026'], ['Fonts', 18, 20, 'Jul 10, 2026']].map(([name, count, thumb, modified], i) => ({
  id: i,
  name,
  count,
  thumb: 'assets/thumb-' + thumb + '.svg',
  modified,
  status: 'Active'
}));
const CATEGORY_TOTAL = exports.CATEGORY_TOTAL = 48;
const CATEGORY_COUNT_LABEL = exports.CATEGORY_COUNT_LABEL = '52 categories';
const COLLECTION_CARDS = exports.COLLECTION_CARDS = [['Website Assets', 84, 'Aug 28, 2026', 'raphael'], ['Social Media', 42, 'Aug 25, 2026', 'raphael'], ['Print ready', 156, 'Aug 20, 2026', 'sarah'], ['Needs review', 23, 'Aug 14, 2026', 'daniel']].map(([name, count, updated, owner], i) => ({
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
  order: '8',
  color: 'brown' /* a category color (CATEGORY_COLORS, batch 290) */,
  copyright: 'Coptic Orthodox Church',
  rights: 'Internal',
  rightsOptions: ['Internal', 'Commercial', 'Editorial', 'Public domain'],
  rating: 0,
  description: 'Traditional Coptic cross designs and variations',
  tags: ['cross', 'traditional', 'coptic'],
  stats: [['Total assets', '78'], ['Storage used', '1.4 GB'], ['Created', 'Jul 3, 2026'], ['Modified', 'Aug 28, 2026']],
  permissions: [['Owner', 'raphael'], ['View groups', 'administrators, users, guest'], ['Edit groups', 'administrators']],
  customFields: [['Style', 'e.g. Byzantine, Nubian...'], ['Material', 'e.g. Wood, Stone, Metal...'], ['Origin', 'e.g. Egypt, Ethiopia...']]
};
const COLLECTION_DETAIL = exports.COLLECTION_DETAIL = {
  name: 'Website Assets',
  count: '84 assets'
};
const CATEGORY_DOWNLOADS = exports.CATEGORY_DOWNLOADS = [{
  title: 'Download entire category',
  items: [['file-zip', 'All Files (Source)', '78 files · ~1.4 GB']]
}, {
  title: 'Download by file type',
  items: [['file-ai', 'Adobe Illustrator (.ai)', '42 files · ~820 MB'], ['file-png', 'PNG Images', '78 files · ~340 MB'], ['file-jpg', 'JPEG Thumbnails', '78 files · ~18 MB'], ['file-svg', 'SVG Vectors', '35 files · ~12 MB'], ['file-pdf', 'PDF Print-Ready', '42 files · ~280 MB']]
}, {
  title: 'Variations',
  items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '78 files · ~45 MB'], ['file-png', 'Social Media (1080×1080)', '78 files · ~62 MB']]
}];
const ASSET_DOWNLOADS = exports.ASSET_DOWNLOADS = [{
  title: 'Download by file type',
  items: [['file-png', 'Preview.png', '4.2 MB'], ['file-jpg', 'Web.jpg', '245 KB']]
}, {
  title: 'Variations',
  items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '180 KB'], ['file-png', 'Social Media (1080×1080)', '520 KB']]
}];
const ASSET_STATUSES = exports.ASSET_STATUSES = ['Complete', 'New', 'In progress', 'Pending review', 'Archived'];
const USAGE_RIGHTS = exports.USAGE_RIGHTS = ['Internal use only', 'Church Use', 'Creative Commons', 'Public domain'];
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
const CARD_MENU = exports.CARD_MENU = [['fields', 'Edit category', 'Edit category'], ['rename', 'Rename', 'Rename'], ['image-a-2', 'Set thumbnail', 'Set thumbnail'], ['menu-lines', 'Visible metadata', 'Manage metadata'], ['move', 'Move To...', 'Move'], ['lock', 'Permissions', 'Permissions'], ['trash-detail', 'Delete', 'Delete']];
  } },
  "dam/app/pages/home/findAssets.js": { deps: {"./homeData.js":"dam/app/pages/home/homeData.js"}, externals: {  }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MONTH = exports.FIND_EMPTY = void 0;
exports.findAssets = findAssets;
exports.findOf = findOf;
exports.findParams = findParams;
var D = _interopRequireWildcard(require("./homeData.js"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/* Plenix asset app · asset search (app/pages/home/findAssets.js): which assets match a query and filters, and in which
   order; and the search screen's address. Shared by the home page's Search workspace and the header's quick results (the
   full-screen search view at Narrow, app/shell/AssetShell.jsx).
   The address of a search (Platforms Standard 4.3): #/search?q=<text>&type=AI,PSD&cat=…&tags=…&owner=…&date=…&status=…&sort=…;
   a multiple-choice filter is its values joined by commas (no value holds one), a single choice its value; a filter
   without a value and the default sort are left out. */

const FIND_EMPTY = exports.FIND_EMPTY = {
  query: '',
  filters: {},
  sort: 'Relevance',
  saved: null
};
const MONTH = d => d.replace(/ \d+,/, ''); // "Aug 12, 2026" → "Aug 2026"
exports.MONTH = MONTH;
const MULTIPLE = ['type', 'cat', 'tags'],
  SINGLE = ['owner', 'date', 'status'];
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

// a search's address parameters: { q, type, cat, tags, owner, date, status, sort }
function findParams(f) {
  const p = {
    q: f.query || ''
  };
  MULTIPLE.forEach(k => {
    if ((f.filters[k] || []).length) p[k] = f.filters[k].join(',');
  });
  SINGLE.forEach(k => {
    if (f.filters[k]) p[k] = f.filters[k];
  });
  if (f.sort && f.sort !== FIND_EMPTY.sort) p.sort = f.sort;
  return p;
}

// the search an address names (the inverse of findParams)
function findOf(params) {
  const filters = {};
  MULTIPLE.forEach(k => {
    if (params[k]) filters[k] = params[k].split(',');
  });
  SINGLE.forEach(k => {
    if (params[k]) filters[k] = params[k];
  });
  return {
    ...FIND_EMPTY,
    query: params.q || '',
    filters,
    sort: params.sort || FIND_EMPTY.sort
  };
}
  } },
  "dam/app/shell/AssetShell.jsx": { deps: {"react":null,"plenix-platform":null,"../pages/home/findAssets.js":"dam/app/pages/home/findAssets.js"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssetHeader = AssetHeader;
exports.AssetPage = AssetPage;
exports.AssetStatusBar = AssetStatusBar;
var _react = _interopRequireDefault(require("react"));
var _plenixPlatform = require("plenix-platform");
var _findAssets = require("../pages/home/findAssets.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* Plenix asset app · shell (app/shell/AssetShell.jsx): what every asset page shares, in React.
   <AssetPage title="My account" current="account" sideNav={<NavPane…/>} panel={<SidePanel…/>}>…</AssetPage> renders the AppShell — skip link, header, the page's <main>
   (with its visually hidden h1) and the StatusBar (the toast host is mounted around every page by app/assets.jsx). current: "account" | "system" marks the account
   button as the current place on the settings pages. On the home page, onSearch(query) and onUpload() handle search and
   upload in place (query: the initial search text); elsewhere they go to the home page (index.html?q=… / ?upload=1).
   Header: brand (home), asset search (Enter searches on the home page; Ctrl K or ⌘K focuses it), Upload (opens the upload
   dialog on the home page), notifications and the account menu. Replaces partials/topbar.html on the pages that have
   moved to React.
   At Narrow the header search is a full-screen view (AppHeader): the recent searches (kept in plenix.assets.view,
   recentSearches; the last five) and, while a query is typed, the matching assets; choosing an asset leaves the view
   (its history entry) and opens the asset in the search screen (#/search?q=…&asset=<id>). */

// DATA: the library totals come from the back end; this is the sample record the pages show until then. Who is signed in
// and their notifications come from the Platform session (SessionProvider, mounted in app/assets.jsx).
const LIBRARY = {
  summary: '4,546 assets | 12.4 GB',
  owner: 'Lighthouse Way'
};
const RECENT_MAX = 5;
// the full-screen search view (AppHeader at Narrow) is a history entry of its own: leave it (Back, which closes it) before
// opening a screen, so the screen's entry replaces it in the history instead of following it
const afterSearchView = open => {
  const st = window.history.state;
  if (!(st && st.plxSearch)) {
    open();
    return;
  }
  const go = () => {
    window.removeEventListener('popstate', go);
    open();
  };
  window.addEventListener('popstate', go);
  window.history.back();
};
function AssetHeader({
  current,
  query = '',
  onSearch,
  onUpload
}) {
  const [q, setQ] = _react.default.useState(query);
  const [kept, updateKept] = (0, _plenixPlatform.useViewState)('assets');
  const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
  const run = text => {
    const t = text.trim();
    if (t) updateKept(v => ({
      recentSearches: [t].concat((v.recentSearches || []).filter(x => x !== t)).slice(0, RECENT_MAX)
    }));
    setQ(t);
    afterSearchView(() => {
      if (onSearch) onSearch(t);else if (t) location.href = 'index.html?q=' + encodeURIComponent(t);
    });
  };
  const onSearchKey = e => {
    if (e.key === 'Enter') run(q);
  };
  // an asset from the quick results: the search screen with the asset open (on another page, the home page's)
  const openAsset = a => afterSearchView(() => {
    const t = q.trim();
    if (onSearch) (0, _plenixPlatform.navigate)(['search'], {
      q: t,
      asset: a.id
    });else location.href = 'index.html' + (0, _plenixPlatform.screenHref)(['search'], {
      q: t,
      asset: a.id
    });
  });
  const typed = q.trim().toLowerCase();
  const recentShown = recent.filter(x => x.toLowerCase().indexOf(typed) >= 0);
  const suggestions = recentShown.length ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SectionHeading, null, "Recent searches"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList, {
    label: "Recent searches"
  }, recentShown.map(x => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList.Item, {
    key: x,
    leading: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: "clock"
    }),
    title: x,
    onOpen: () => run(x)
  })))) : null;
  const found = typed ? (0, _findAssets.findAssets)({
    ..._findAssets.FIND_EMPTY,
    query: q
  }) : null;
  const results = found ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SectionHeading, null, "Assets"), found.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList, {
    label: "Assets",
    stacked: true
  }, found.map(a => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList.Item, {
    key: a.id,
    leading: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Thumbnail, {
      src: a.thumb,
      alt: ""
    }),
    title: a.name,
    meta: a.cat + ' · ' + a.badge,
    onOpen: () => openAsset(a)
  }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary",
    as: "p"
  }, 'Nothing matches “' + q.trim() + '”.')) : null;
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
    searchSuggestions: suggestions,
    searchResults: results,
    account: /*#__PURE__*/_react.default.createElement(_plenixPlatform.AppHeader.Account, {
      current: current === 'system' ? 'app-settings' : current,
      myAccount: {
        href: 'settings-myaccount.html'
      },
      settings: {
        href: '../settings/index.html#/general'
      },
      appSettings: {
        app: 'Asset Manager',
        href: 'settings-system.html'
      }
    })
  });
}
function AssetStatusBar() {
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusBar, {
    start: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.StatusIcon, {
      tone: "success",
      size: "sm"
    }, "Library online"), /*#__PURE__*/_react.default.createElement("span", null, LIBRARY.summary)),
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
   Replaces the HTML of settings-myaccount.html (batch 109). Sections: Profile, Preferences; each is a screen with its
   address (#/profile, #/preferences; the older #preferences opens the same) and a history entry (Platforms Standard 4.3).
   Both stay mounted, so unsaved edits survive switching; leaving the page with unsaved edits asks (useUnsavedGuard).
   Each screen is SettingsSection cards (owner, 2026-10-13: "all the settings pages to have the cards view"): Profile one
   static card; Preferences a static Display card and a Notifications card, with the rarely read Activity card collapsible. */
// DATA: the saved preferences and the page-size choices come from the back end; sample values until then. The profile is
// the signed-in person, from the Platform session.
const PAGE_SIZES = ['6', '8', '12', '15', '20', '30', '36', '50', '100', '200'];
const LAST_VIEWED = 'finder/find';
const SECTIONS = [{
  heading: 'My account',
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

// the section is the screen: choosing one pushes a history entry, Back and Forward follow
const legacy = hash => hash === '#profile' || hash === '#preferences' ? '/' + hash.slice(1) : null;
function useSection() {
  const loc = (0, _plenixPlatform.useScreenLocation)({
    app: 'assets-account',
    legacy
  });
  const section = loc.parts[0] === 'preferences' ? 'preferences' : 'profile';
  const go = id => {
    if (id === 'home') return;
    loc.navigate([id]);
  };
  return [section, go];
}
// both sections stay mounted, so only leaving the page loses an edit
const keeps = () => true;
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
  const [saved, setSaved] = _react.default.useState(p);
  (0, _plenixPlatform.useUnsavedGuard)(Object.keys(p).some(k => p[k] !== saved[k]), 'Your profile changes have not been saved.', {
    keeps
  });
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
      setSaved(p);
      toast.show('Profile saved', {
        tone: 'success'
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Profile",
    description: "Edit your account details and update your password.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    title: "Account details",
    stateKey: "profile",
    actions: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: () => toast.show('Change password')
    }, "Change password"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      type: "submit",
      variant: "primary"
    }, "Save"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "First name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "firstName",
    width: "lg",
    autoComplete: "given-name",
    enterKeyHint: "next"
  }, field('firstName')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Last name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "lastName",
    width: "lg",
    autoComplete: "family-name",
    enterKeyHint: "next"
  }, field('lastName')))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Email",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "email",
    width: "lg",
    type: "email",
    inputMode: "email",
    autoComplete: "email",
    autoCapitalize: "off",
    spellCheck: false,
    enterKeyHint: "done"
  }, field('email'))))));
}
function Preferences() {
  const toast = (0, _plenixPlatform.useToast)();
  const [density, setDensity] = (0, _plenixPlatform.useDensity)();
  // the appearance (Platforms Standard 1.6): system (default), light or dark, the same choice as the suite's Settings › Mode;
  // theme-boot keeps it for every page and it applies at once, like the display density
  const ws = window.PlenixWorkspace;
  const [mode, setModeState] = _react.default.useState(() => ws && ws.mode ? ws.mode() : 'system');
  const setMode = m => {
    setModeState(m);
    if (ws && ws.setMode) ws.setMode(m);
  };
  const [prefs, setPrefs] = _react.default.useState({
    assets: '30',
    rows: '30',
    album: false,
    approval: false,
    dateFormat: ''
  });
  const [saved, setSaved] = _react.default.useState(prefs);
  (0, _plenixPlatform.useUnsavedGuard)(Object.keys(prefs).some(k => prefs[k] !== saved[k]), 'Your preferences have not been saved.', {
    keeps
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
      setSaved(prefs);
      toast.show('Preferences saved', {
        tone: 'success'
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Preferences",
    description: "Your personal display and notification preferences.",
    headingLevel: 2
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    title: "Display",
    stateKey: "display",
    description: "Your mode and density apply at once, on every page."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: "Mode",
    description: "System follows the light or dark setting of your device"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SegmentedControl, {
    label: "Mode",
    value: mode,
    onChange: setMode,
    options: [{
      value: 'system',
      label: 'System'
    }, {
      value: 'light',
      label: 'Light'
    }, {
      value: 'dark',
      label: 'Dark'
    }]
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ChoiceList, {
    legend: "Display density",
    value: density,
    onChange: setDensity,
    options: window.PlenixWorkspace ? window.PlenixWorkspace.densities() : []
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    title: "Results and dates",
    stateKey: "results"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Assets per page",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    options: sizes,
    value: prefs.assets,
    onChange: set('assets'),
    creatable: true,
    onCreate: create('assets')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Rows per page",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    options: sizes,
    value: prefs.rows,
    onChange: set('rows'),
    creatable: true,
    onCreate: create('rows')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Preferred date format",
    layout: "inline",
    info: "Accepted formats: yyyy-MM-dd, MM-dd-yyyy, dd-MM-yyyy"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "preferredDateFormat",
    width: "lg",
    data: true,
    autoComplete: "off",
    autoCapitalize: "off",
    spellCheck: false,
    enterKeyHint: "done",
    placeholder: "yyyy-MM-dd",
    value: prefs.dateFormat,
    onChange: e => set('dateFormat')(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    title: "Notifications",
    stateKey: "notifications"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: "Album notifications",
    description: "When assets are added to or removed from an album you follow"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: "Album notifications",
    labelHidden: true,
    checked: prefs.album,
    onChange: e => set('album')(e.target.checked)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: "Approval and rejection notifications",
    description: "When your assets are approved or rejected"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: "Approval and rejection notifications",
    labelHidden: true,
    checked: prefs.approval,
    onChange: e => set('approval')(e.target.checked)
  }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, {
    title: "Activity",
    stateKey: "activity",
    collapsible: true,
    defaultExpanded: false
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Last viewed application",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "output",
    variant: "data"
  }, LAST_VIEWED))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActionBar, {
    label: "Preferences actions"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    type: "submit",
    variant: "primary"
  }, "Save preferences")));
}
function MyAccountPage() {
  const [section, go] = useSection();
  return /*#__PURE__*/_react.default.createElement(_AssetShell.AssetPage, {
    title: "My account",
    current: "account",
    sideNav: /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavPane, {
      as: "div",
      label: "Settings sections",
      title: "My account",
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
const ACTIONS = exports.ACTIONS = [['View details', 'All'], ['Edit metadata', 'Entity Editor, Administrators'], ['Delete', 'Administrators'], ['Download original', 'Entity Editor, Administrators'], ['Share', 'All']];
const VIEW_ALL = exports.VIEW_ALL = [['Administrators', true], ['Catalogs Admins', true], ['Uploaders', false]];
const EDIT_ALL = exports.EDIT_ALL = [['Administrators', true], ['Catalogs Admins', true]];
const FIELDS = exports.FIELDS = [['Asset title', 'assettitle', 'textbox'], ['Caption', 'headline', 'textbox'], ['Description', 'longcaption', 'textbox'], ['Categories', 'category', 'list'], ['Asset type', 'assettype', 'list'], ['Author', 'creator', 'text'], ['Copyright notice', 'copyrightnotice', 'textbox'], ['Copyright status', 'copyrightstatus', 'list'], ['Color space', 'colorspace', 'list'], ['File format', 'fileformat', 'textbox'], ['File size', 'filesize', 'number'], ['Created on', 'assetcreationdate', 'date'], ['Asset expired', 'assetexpired', 'boolean'], ['Face profiles', 'faceprofiles', 'nested'], ['GEO location', 'geo_point', 'geo_point']];
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
const PERMISSION_ROLES = exports.PERMISSION_ROLES = ['Entity owner', 'Administrators', 'Entity editor', 'Users', 'Anonymous'];
const PERMISSION_AREAS = exports.PERMISSION_AREAS = [{
  id: 'app',
  label: 'Application',
  total: 34,
  items: [['Application', 'Enables access to the Plenix application.'], ['Home', 'Enables the home button.'], ['Settings', 'Enables access to application management settings.'], ['Multiple files', 'Enables various actions across multiple assets simultaneously.'], ['Table columns', 'Enables the customization of search result columns in table view.'], ['Download original', 'Enables downloading of the original asset.'], ['Edit Users and Groups', 'Allows user to create and edit users or groups.'], ['My account area', 'Enables a page that edits user data and updates passwords.'], ['Category navigation', 'Enables the Category Navigation in the sidebar.'], ['View AI agent', 'Enables AI Chat Agent.']]
}, {
  id: 'asset',
  label: 'Asset management',
  total: 65,
  items: [['Upload files', 'Enables the upload of assets.'], ['Delete', 'Enables removal of an asset, and the option to remove the original.'], ['Share', 'Enables the share button. Parent of email, embed, publish and social media share.'], ['Watermark', 'System-wide watermarking across all assets.'], ['Approve/Reject Workflow', 'Enables Approve/Reject options.'], ['Edit all assets', 'Allow editing and viewing of any asset.'], ['Permissions', 'Enables permission alteration for media assets.'], ['Media editor', 'Enables access to Media Editor.'], ['View faceprofiles', 'View Asset Face Profile Detection.']]
}, {
  id: 'library',
  label: 'Library management',
  total: 18,
  items: [['Create new collection', 'Allows creation of new collections.'], ['Create new library', 'Allows creation of new libraries.'], ['Pick any library', 'Asset can be added to any library.'], ['Add files to Bookmarks', 'Enables users to add files to their Bookmarks.']]
}, {
  id: 'api',
  label: 'Programming API',
  total: 4,
  items: [['Programming API', 'Enables REST API access to this catalog.']]
}];
const EMAIL_TEMPLATES = exports.EMAIL_TEMPLATES = [['Administrative notification when assets have been published', 'admintemplate.html'], ['Confirmation email sent to user after assets have been successfully shared', 'usertemplate.html'], ['Email sent when a user shares an asset', 'sharetemplate.html'], ['Email sent when assets are added or removed from a collection', 'collection-count-modified.html'], ['Email sent when assets are approved', 'collection-assets-approved.html'], ['Email sent when assets are rejected', 'collection-assets-rejected.html'], ['Email sent when a user is added to a collection', 'collection-add-new-follower.html'], ['Asset renewal notification', 'assetrenew.html']];

// [label, key, value, 'text' when the value is words (a title), not a technical value in the data font]
const CATALOG_PARAMETERS = exports.CATALOG_PARAMETERS = [['Application site title', 'sitetitle', 'Plenix Library', 'text'], ['Allow login by Email Address', 'allowloginbyemail', 'true'], ['CDN prefix', 'cdn_prefix', '—'], ['AWS bucket', 'awsbucket', '—'], ['AI: Enable Content Creation', 'ai_create_enabled', 'true'], ['AI: OpenAI Model (AI Chat)', 'gpt-model', 'gpt-4o'], ['AI: Ollama Server', 'ollama-url', 'https://ollama.example.com'], ['AI: Translate Server', 'ai_translate_server', 'http://translate.example.com:48991'], ['AI: Vectorizer Server', 'ai_vectorizer_server', 'http://vectorizer.example.com:48981'], ['Face: Faceprofile Server', 'faceprofileserver', '—'], ['Catalog Asset Edit Groups', 'catalogasseteditgroups', 'administrators users'], ['Admin Catalog Asset View Groups', 'catalogassetviewgroups', 'administrators']];
const CATALOG_TOTAL = exports.CATALOG_TOTAL = 'roughly 130';
const SERVER_STATUS = exports.SERVER_STATUS = [['Node ID', 'plenix003'], ['Cluster ID', 'plenix-cluster'], ['Catalog ID', 'finder/catalog']];
const VERSIONS = exports.VERSIONS = [['Plenix Server', '11.2218'], ['Plenix', '11.375'], ['Elasticsearch (Lucene)', '5.5.4'], ['Groovy', '2.4.11'], ['Velocity Engine', '2.3'], ['Apache PDFBox', '2.0.6']];
const LOG_PATH = exports.LOG_PATH = '/opt/plenix/logs/server.log';
const DB_TABLES = exports.DB_TABLES = ['asset', 'category', 'user', 'group', 'order', 'library', 'librarycollection', 'customization', 'entityperson', 'faceprofilegroup', 'module', 'permission'];
const DB_COLUMNS = exports.DB_COLUMNS = ['AI tags', 'Album', 'Asset title', 'Asset type', 'Artist', 'Categories', 'Created on'];
const DB_ROWS = exports.DB_ROWS = [['gold, ornate', '—', 'korban_stamp_010', 'Image', '—', 'Korban Stamp', 'Aug 18, 2026'], ['certificate, church', '—', 'certificate_christ_the_teacher', '3D Models', '—', 'Certificates', 'Aug 15, 2026'], ['cross, gold', 'Website Assets', 'Coptic_Cross_Gold', 'Image', 'Mina Fahim', 'Crosses', 'Aug 10, 2026'], ['baptism, sacrament', '—', 'Certificate_Baptism_v3', 'Documents', '—', 'Certificate - Baptism', 'Aug 8, 2026']];
const DB_TOTAL = exports.DB_TOTAL = {
  records: '4,546',
  pages: 227
};
const CUSTOMIZATIONS = exports.CUSTOMIZATIONS = [['Supporting table', 'Entity source type', 'searchcategory', '9/1/26, 11:30 AM'], ['Module', 'Person', '—', '9/1/26, 11:30 AM'], ['Supporting table', 'Start category ID', 'desktopsyncfolder', '9/1/26, 11:30 AM'], ['Module', 'Document', '—', '9/1/26, 11:30 AM'], ['Module', 'Media profile', '—', '9/1/26, 11:30 AM'], ['Module', 'Categories', '—', '9/1/26, 11:30 AM']];
const SCHEDULED = exports.SCHEDULED = [['Auto assign Entity Image', 'autoassignproxyimage.html', 'Runs: 2,736 · Repeats every 1m'], ['Publish assets', 'publishassets.html', 'Runs: 541 · Repeats every 5m'], ['Send collection chat notifications', 'notifycollectionchatnotifications.html', 'Runs: 541 · Repeats every 5m'], ['Run media conversions', 'runconversions.html', 'Runs: 550 · Repeats every 5m'], ['Transcript audio', 'autotranscode.html', 'Runs: 541 · Repeats every 5m'], ['Semantic Index New', 'semanticscan.html', 'Runs: 270 · Repeats every 10m'], ['Import hot folders', 'importhotfolders.html', 'Runs: 270 · Repeats every 10m'], ['Check permission changes', 'checkpermissionhistory.html', 'Runs: 277 · Repeats every 10m'], ['Apply Google Vision', 'applygooglevision.html', 'Runs: 180 · Repeats every 15m'], ['Apply Google Transcode', 'applygoogletranscode.html', 'Runs: 180 · Repeats every 15m'], ['Asset metadata notification', 'assetmetadata.html', 'Runs: 30 · Repeats every 30m']];
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
   Replaces the HTML of settings-system.html (batch 110). Each section is a screen with its address (#/properties,
   #/users, …; the older #users opens the same) and a history entry (Platforms Standard 4.3); every section stays mounted,
   so unsaved edits survive switching, and leaving the page while a form has unsaved edits asks (useUnsavedGuard). Actions
   that have no back end yet confirm with a toast, as the HTML page did.
   Every screen is a column of SettingsSection cards (owner, 2026-10-13: "all the settings pages to have the cards view"):
   static cards for what people use, collapsible cards for long or rarely used parts (one per asset type, group and
   permission area; the views, publishing, events and scripts not built yet); their open state is remembered per page.
   Fields are Fields (a visible label) with their control at a standard width; tables are DataTables; technical values
   (templates, paths, keys, numbers) are in the data font. */
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
    label: 'Asset types',
    icon: 'settings-categories'
  }, {
    id: 'hot-folders',
    label: 'Hot folders',
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
    label: 'Site permissions',
    icon: 'settings-permissions'
  }]
}, {
  heading: 'System',
  collapsible: true,
  items: [{
    id: 'email-templates',
    label: 'Email templates',
    icon: 'settings-email'
  }, {
    id: 'catalog-parameters',
    label: 'Catalog parameters',
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

/* ── the screen and its cards ── */
// the screen a card belongs to: every screen stays mounted, so a card's open state is remembered as "<screen>:<title>"
const ScreenKey = /*#__PURE__*/_react.default.createContext('');
const Screen = ({
  id,
  title,
  description,
  actions,
  children
}) => /*#__PURE__*/_react.default.createElement(ScreenKey.Provider, {
  value: id
}, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RecordPage.Header, {
  title: title,
  description: description,
  actions: actions,
  headingLevel: 2
}), children);
const Section = ({
  stateKey,
  ...p
}) => {
  const screen = _react.default.useContext(ScreenKey);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsSection, _extends({
    stateKey: screen + ':' + (stateKey || p.title)
  }, p));
};
// a part not built yet: a collapsible card, closed, that says so
const Planned = ({
  title,
  children
}) => /*#__PURE__*/_react.default.createElement(Section, {
  title: title,
  collapsible: true,
  defaultExpanded: false,
  description: children
}, /*#__PURE__*/_react.default.createElement(_plenixPlatform.EmptyState, {
  title: "Not configured yet"
}));
// how many of how many: the figures are technical values
const CountNote = ({
  shown,
  total,
  what
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  as: "p",
  variant: "secondary"
}, 'Showing ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  variant: "data"
}, shown), ' of ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
  variant: "data"
}, total), ' ' + what);
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
  label: label
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
const switchCol = title => ({
  title,
  field: 'on',
  kind: 'center',
  headerSort: false,
  render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Switch, {
    label: r.name + ': ' + title,
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
// a name/value list as a table with a header (owner, 2026-10-09: every name/value list in the DataTable's look); values are technical
const facts = (label, list) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Table, {
  label: label,
  headerMenu: false,
  data: list.map(([k, v], i) => ({
    id: i,
    name: k,
    value: v
  })),
  columns: [{
    title: 'Name',
    field: 'name',
    kind: 'name',
    rowLabel: true,
    headerSort: false
  }, {
    title: 'Value',
    field: 'value',
    kind: 'data',
    headerSort: false
  }]
});
// the form's buttons: in an ActionBar (on the right, sticky at the bottom), a destructive action first, the primary last
const Actions = ({
  act,
  save = 'Save',
  del = 'Delete'
}) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActionBar, {
  label: "Form actions"
}, del ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  variant: "danger-secondary",
  onClick: act(del, 'warning')
}, del) : null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
  type: "submit",
  variant: "primary"
}, save));
// a form is edited from its first change (a search field is not an edit) until it is saved
const Edited = /*#__PURE__*/_react.default.createContext(() => {});
const Form = ({
  act,
  saved,
  children
}) => {
  const mark = _react.default.useContext(Edited),
    id = _react.default.useId();
  const onChange = e => {
    const t = e.target;
    if (t && (t.type === 'search' || t.closest && t.closest('[role="search"]'))) return;
    mark(id, true);
  };
  return /*#__PURE__*/_react.default.createElement("form", {
    noValidate: true,
    onChange: onChange,
    onSubmit: e => {
      e.preventDefault();
      mark(id, false);
      act(saved, 'success')();
    }
  }, children);
};
// configuration values: no autofill; a path or a template is technical (the data font) and gets no capitals or spell check
const PATH = {
  autoCapitalize: 'off',
  spellCheck: false,
  data: true
};

/* ── Content ── */
function Properties({
  act
}) {
  const [p, setP] = _react.default.useState(D.PROPERTIES);
  const [views, setViews] = _react.default.useState(D.RESULT_VIEWS.map(v => ({
    value: v,
    label: v
  })));
  // configuration values: no autofill; a path or a number gets its own keyboard (Platforms Standard 3.5)
  const text = (k, extra) => ({
    value: p[k],
    onChange: e => setP({
      ...p,
      [k]: e.target.value
    }),
    name: k,
    autoComplete: 'off',
    ...extra
  });
  // a switch is a settings row: the label at the start, the switch (named by it) at the end
  const sw = (k, label, description) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: label,
    description: description
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
    title: 'Group / Role',
    field: 'name',
    kind: 'name',
    frozen: true,
    filter: true
  };
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save"
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    id: "properties",
    title: "Files properties",
    description: "Module-level configuration for the asset table."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Properties"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Default record label",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('defaultRecordLabel', PATH))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Tab ordering",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    width: "sm"
  }, text('tabOrdering', {
    inputMode: 'numeric',
    data: true
  })))), sw('enableUploading', 'Enable uploading'), sw('enableOnSearch', 'Enable on search'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Default results view",
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
    label: "Default sort field",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    width: "lg"
  }, text('defaultSortField', {
    placeholder: 'Default sort field',
    ...PATH
  })))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Upload source path",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('uploadSourcepath', {
    inputMode: 'url',
    ...PATH
  })))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Folders and search",
    description: "How folders become entities, and how the AI search reads a query."
  }, sw('autoCreateEntities', 'Auto create entities'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Root folder path",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, text('rootFolderPath', {
    placeholder: 'Root folder path',
    inputMode: 'url',
    ...PATH
  }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Auto create at folder level",
    layout: "inline",
    info: "Scan deep A/B/C, B = 2"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    width: "sm"
  }, text('autoCreateAtFolderLevel', {
    inputMode: 'numeric',
    enterKeyHint: 'done',
    data: true
  })))), sw('semanticEnabled', 'Semantic search'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "AI search prompt",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, text('aiSearchPrompt', {
    placeholder: 'AI search prompt'
  }))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "AI search contains",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, text('aiSearchContains', {
    placeholder: 'AI search contains'
  })))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Enabled for",
    collapsible: true,
    description: "Groups and roles that can use this module."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Enabled for",
    data: enabled,
    columns: [roleCol, switchCol('Enabled')]
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Actions",
    collapsible: true,
    defaultExpanded: false,
    description: "The actions of this module and the roles that may run them."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Actions",
    data: rowsOf(D.ACTIONS, ['name', 'roles']),
    columns: [{
      title: 'Action',
      field: 'name',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'Roles',
      field: 'roles',
      filter: true
    }, {
      title: 'Status',
      field: 'status',
      kind: 'center',
      headerSort: false,
      render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
        tone: "success"
      }, "Active")
    }]
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "View all folders",
    collapsible: true,
    defaultExpanded: false,
    description: "Groups and roles that can view all folders for this module."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "View all folders",
    data: viewAll,
    columns: [roleCol, switchCol('View all')]
  })), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Edit all folders",
    collapsible: true,
    defaultExpanded: false,
    description: "Groups and roles that can edit all folders for this module."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Edit all folders",
    data: editAll,
    columns: [roleCol, switchCol('Edit all')]
  })), /*#__PURE__*/_react.default.createElement(Actions, {
    act: act
  })));
}
function Fields({
  act
}) {
  const [q, setQ] = _react.default.useState('');
  const rows = rowsOf(D.FIELDS.filter(r => match(q, r)), ['name', 'id2', 'type']);
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "fields",
    title: "Fields",
    description: "The metadata field registry for assets \u2014 every field's name, internal ID, and type."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "New field"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: "Field name",
    htmlFor: "system-new-field"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    id: "system-new-field",
    name: "newFieldName",
    autoComplete: "off",
    enterKeyHint: "done",
    width: "lg",
    placeholder: "New field name..."
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Add field",
    act: act
  })))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "All fields",
    description: D.FIELD_TOTAL + ' fields in the registry'
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Field actions"
  }, /*#__PURE__*/_react.default.createElement(Search, {
    value: q,
    onChange: setQ,
    label: 'Search ' + D.FIELD_TOTAL + ' fields'
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Fields",
    data: rows,
    empty: "No fields match",
    columns: [{
      title: 'Field name',
      field: 'name',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'ID',
      field: 'id2',
      kind: 'data'
    }, {
      title: 'Field type',
      field: 'type',
      kind: 'data',
      filter: 'list'
    }]
  }), /*#__PURE__*/_react.default.createElement(CountNote, {
    shown: rows.length,
    total: D.FIELD_TOTAL,
    what: "fields"
  })), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Edit views"
  }, "Configure which fields appear on the asset edit form, and in what order."), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Application views"
  }, "Configure which fields appear in application-wide views such as search results and tables."));
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
    saved: "Save changes"
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    id: "asset-types",
    title: "Asset types",
    description: "The file-format categories assets are classified under, used to route transcoding and preview generation.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "Add asset type",
      act: act
    })
  }, types.map((t, i) => /*#__PURE__*/_react.default.createElement(Section, {
    key: i,
    title: D.ASSET_TYPES[i][0],
    stateKey: 'type-' + i,
    collapsible: true,
    defaultExpanded: i === 0
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "name",
    autoComplete: "off",
    width: "lg",
    value: t.name,
    onChange: edit(i, 'name')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Extensions",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Textarea, {
    name: "extensions",
    autoComplete: "off",
    autoCapitalize: "off",
    spellCheck: false,
    data: true,
    value: t.ext,
    onChange: edit(i, 'ext')
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Paths",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
    name: "paths",
    autoComplete: "off",
    placeholder: "Paths",
    value: t.paths,
    onChange: edit(i, 'paths')
  }, PATH))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Ordering",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "ordering",
    inputMode: "numeric",
    autoComplete: "off",
    enterKeyHint: "done",
    width: "sm",
    data: true,
    value: t.order,
    onChange: edit(i, 'order')
  })))), /*#__PURE__*/_react.default.createElement(Actions, {
    act: act,
    save: "Save changes"
  })));
}
function HotFolders({
  act
}) {
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "hot-folders",
    title: "Hot folders",
    description: "Watched folders that are automatically scanned and imported as assets.",
    actions: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/_react.default.createElement(B, {
      icon: "schedule",
      label: "Schedule importing",
      act: act
    }), /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "Add hot folder",
      act: act
    }))
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Watched folders"
  }, D.HOT_FOLDERS.map(f => /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    key: f.name,
    label: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
      name: "folder"
    }), /*#__PURE__*/_react.default.createElement("span", null, f.name), f.enabled ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
      tone: "success"
    }, "Enabled") : null),
    description: f.meta
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
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
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "transcoding",
    title: "Transcoding",
    description: "Conversion presets generated for each uploaded asset, by media type.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "Add new conversion",
      act: act
    })
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Preset configuration"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Conversion presets",
    data: rowsOf(D.CONVERSIONS, ['name', 'file', 'system', 'onImport', 'media']),
    columns: [{
      title: 'Conversion',
      field: 'name',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'Generated file',
      field: 'file',
      kind: 'data'
    }, {
      title: 'System defined',
      field: 'system',
      filter: 'list'
    }, {
      title: 'On import',
      field: 'onImport',
      filter: 'list'
    }, {
      title: 'Media type',
      field: 'media',
      filter: 'list'
    }]
  })), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Publishing"
  }, "Configure which conversions are pushed to publishing targets."));
}

/* ── People & Access ── */
function Users({
  act
}) {
  const [q, setQ] = _react.default.useState('');
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "users",
    title: "Users",
    description: "Manage user accounts and view login activity.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "Create user",
      act: act
    })
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "All users"
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "User actions"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
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
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Users",
    empty: "No users match",
    data: rowsOf(D.USERS.filter(r => match(q, r)), ['user', 'name', 'email', 'role', 'created', 'login']),
    columns: [{
      title: 'Username',
      field: 'user',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'Name',
      field: 'name',
      filter: true
    }, {
      title: 'Email',
      field: 'email',
      filter: true
    }, {
      title: 'Role',
      field: 'role',
      kind: 'center',
      filter: 'list',
      render: r => r.role ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
        tone: "active"
      }, r.role) : '—'
    }, {
      title: 'Created',
      field: 'created',
      kind: 'data'
    }, {
      title: 'Last login',
      field: 'login',
      kind: 'data'
    }]
  })));
}
function Groups({
  act
}) {
  const [names, setNames] = _react.default.useState(D.GROUPS);
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save changes"
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    id: "groups",
    title: "Groups",
    description: "Groups a user can be assigned to. Permissions are configured separately under Site permissions.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "Add group",
      act: act
    })
  }, D.GROUPS.map((g, i) => /*#__PURE__*/_react.default.createElement(Section, {
    key: g,
    title: g,
    collapsible: true,
    defaultExpanded: i === 0
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Name",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "name",
    autoComplete: "off",
    width: "lg",
    value: names[i],
    onChange: e => setNames(names.map((n, j) => j === i ? e.target.value : n))
  })))), /*#__PURE__*/_react.default.createElement(Actions, {
    act: act,
    save: "Save changes",
    del: "Delete group"
  })));
}
function Permissions({
  act
}) {
  const [role, setRole] = _react.default.useState('Administrators');
  const [area, setArea] = _react.default.useState('Show all');
  const [checked, setChecked] = _react.default.useState(() => Object.fromEntries(D.PERMISSION_AREAS.flatMap(a => a.items.map(it => [a.id + ':' + it[0], true]))));
  const areas = D.PERMISSION_AREAS.filter(a => area === 'Show all' || a.label === area);
  return /*#__PURE__*/_react.default.createElement(Form, {
    act: act,
    saved: "Save"
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    id: "permissions",
    title: "Site permissions",
    description: "Individually named permissions, grouped by area, assigned per role."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Role",
    description: "Choose the role to configure. The permissions below apply only to that role; View narrows the list to one area."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Role",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "role",
    value: role,
    onChange: e => setRole(e.target.value)
  }, D.PERMISSION_ROLES.concat('+ Add new role').map(r => /*#__PURE__*/_react.default.createElement("option", {
    key: r
  }, r)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "View",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
    name: "view",
    value: area,
    onChange: e => setArea(e.target.value)
  }, ['Show all'].concat(D.PERMISSION_AREAS.map(a => a.label)).map(r => /*#__PURE__*/_react.default.createElement("option", {
    key: r
  }, r))))), areas.map((a, i) => /*#__PURE__*/_react.default.createElement(Section, {
    key: a.id,
    title: a.label,
    stateKey: a.id,
    collapsible: true,
    defaultExpanded: i === 0,
    description: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, 'Showing ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, a.items.length), ' of ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, a.total), ' permissions for ' + role)
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, a.items.map(it => {
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
  })))), /*#__PURE__*/_react.default.createElement(Actions, {
    act: act
  })));
}

/* ── System ── */
function EmailTemplates({
  act
}) {
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "email-templates",
    title: "Email templates",
    description: "The notification emails the catalog sends, and the template file behind each one."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Templates"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Email templates",
    data: rowsOf(D.EMAIL_TEMPLATES, ['name', 'file']),
    columns: [{
      title: 'Template',
      field: 'name',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'File',
      field: 'file',
      kind: 'data'
    }, {
      title: 'Actions',
      field: 'actions',
      kind: 'center',
      headerSort: false,
      render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
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
    saved: "Save changes"
  }, /*#__PURE__*/_react.default.createElement(Screen, {
    id: "catalog-parameters",
    title: "Catalog parameters",
    description: "Catalog-wide configuration keys \u2014 storage, AI providers, and access defaults."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Parameters",
    description: D.CATALOG_TOTAL + ' catalog settings'
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Parameter actions"
  }, /*#__PURE__*/_react.default.createElement(Search, {
    value: q,
    onChange: setQ,
    label: "Search catalog settings"
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Catalog parameters",
    empty: "No settings match",
    data: rows.map(([label, id, value, kind]) => ({
      id,
      label,
      key: id,
      value,
      kind
    })),
    columns: [{
      title: 'Setting',
      field: 'label',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'Key',
      field: 'key',
      kind: 'data',
      filter: true
    }, {
      title: 'Value',
      field: 'value',
      render: r => r.kind !== 'text' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
        variant: "data"
      }, r.value) : r.value
    }]
  }), /*#__PURE__*/_react.default.createElement(CountNote, {
    shown: rows.length,
    total: D.CATALOG_TOTAL,
    what: "catalog settings"
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActionBar, {
    label: "Form actions"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    type: "submit",
    variant: "primary"
  }, "Save changes"))));
}
function Server({
  act
}) {
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "server",
    title: "Server",
    description: "Database cluster status, software versions, and application logs."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Server status"
  }, facts('Server status', D.SERVER_STATUS), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
    label: "Server status actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "refresh",
    label: "Clear cached data",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "database",
    label: "Change Elasticsearch database master",
    tone: "info",
    act: act
  }))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Data management"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
    label: "Data management"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "refresh",
    label: "Reindex",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "alert",
    label: "View mapping conflicts",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "list-bullets",
    label: "View basic mappings",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "import",
    label: "Reload sets",
    tone: "info",
    act: act
  }))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Database snapshots",
    collapsible: true,
    defaultExpanded: false,
    description: "Snapshots are used by Elasticsearch to store and restore database data."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsRow, {
    label: "Snapshots"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "snapshot",
    label: "View snapshots",
    tone: "info",
    act: act
  }))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Data entities",
    collapsible: true,
    defaultExpanded: false
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
    label: "Data entities"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Create",
    act: act
  }), /*#__PURE__*/_react.default.createElement(B, {
    icon: "save-doc",
    label: "Save all modules",
    act: act
  }))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Versions",
    collapsible: true,
    defaultExpanded: false,
    description: "The full dependency list runs to 100+ jars."
  }, facts('Versions', D.VERSIONS), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    onClick: act('View all', 'info')
  }, "View all"))), /*#__PURE__*/_react.default.createElement(Section, {
    title: "Logs",
    collapsible: true,
    defaultExpanded: false,
    description: "Where the application writes its log."
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.CodeBlock, null, D.LOG_PATH)));
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
    title: c,
    field: 'c' + j,
    frozen: j === 0,
    filter: true,
    kind: c === 'Asset title' ? 'name' : c === 'Created on' ? 'data' : undefined
  }));
  const grid = label => /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: label,
    data: rows,
    columns: columns,
    empty: "No records match"
  });
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "database",
    title: "Database",
    description: "Browse, edit, import, or export any underlying data table.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "add",
      label: "New table",
      tone: "info",
      act: act
    })
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Table"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Table",
    layout: "inline"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Combobox, {
    options: D.DB_TABLES.map(t => ({
      value: t,
      label: t
    })),
    value: table,
    onChange: setTable
  }))), /*#__PURE__*/_react.default.createElement(Section, {
    title: 'Records in ' + table,
    stateKey: "records",
    description: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, 'Found ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, D.DB_TOTAL.records), ' records · page ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "1"), ' of ', /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, D.DB_TOTAL.pages))
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Record actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "add",
    label: "Add new",
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
    label: "Export text",
    tone: "info",
    act: act
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    iconOnly: true,
    icon: "close",
    label: "Reset settings",
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
    onSelect: act('Delete ' + D.DB_TOTAL.records + ' records', 'warning')
  }, 'Delete ' + D.DB_TOTAL.records + ' records'), /*#__PURE__*/_react.default.createElement(_plenixPlatform.MenuItem, {
    icon: "trash",
    danger: true,
    onSelect: act('Delete table', 'warning')
  }, "Delete table")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "expand",
    onClick: () => setExpanded(true)
  }, "Expand"), /*#__PURE__*/_react.default.createElement(Search, {
    value: q,
    onChange: setQ,
    label: "Search"
  })), grid('Table: ' + table), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
    justify: "end"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    iconEnd: "chevron-right",
    onClick: act('Forward', 'info')
  }, "Next page")), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: expanded,
    onClose: () => setExpanded(false),
    title: 'Table: ' + table,
    icon: "expand",
    size: "full"
  }, grid('Table: ' + table + ', expanded'))), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Customize fields"
  }, "Configure the fields available on this table \u2014 the same editor as Files > Fields, scoped to this table."), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Customize views"
  }, "Configure how records in this table are displayed in lists and edit forms."), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Elastic system info"
  }, "Raw Elasticsearch mapping and index info for this table."));
}
function Customizations({
  act
}) {
  const rows = rowsOf(D.CUSTOMIZATIONS, ['type', 'name', 'modules', 'date']);
  const [sel, setSel] = _react.default.useState(rows.map(r => r.id));
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "customizations",
    title: "Customizations",
    description: "Track configuration changes across modules, and export or import them between environments."
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Changes"
  }, /*#__PURE__*/_react.default.createElement(Bar, {
    label: "Customization actions"
  }, /*#__PURE__*/_react.default.createElement(B, {
    icon: "refresh",
    label: "Scan for changes",
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
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Customizations",
    selectable: true,
    selected: sel,
    onSelectionChange: setSel,
    data: rows,
    columns: [{
      title: 'Type',
      field: 'type',
      filter: 'list'
    }, {
      title: 'Customization',
      field: 'name',
      kind: 'name',
      filter: true
    }, {
      title: 'Modules',
      field: 'modules',
      kind: 'data'
    }, {
      title: 'Date',
      field: 'date',
      kind: 'data'
    }]
  })));
}
function Scheduler({
  act
}) {
  return /*#__PURE__*/_react.default.createElement(Screen, {
    id: "scheduler",
    title: "Scheduler",
    description: "Recurring background tasks, the events that trigger them, and the scripts they run.",
    actions: /*#__PURE__*/_react.default.createElement(B, {
      icon: "refresh",
      label: "Refresh",
      tone: "info",
      act: act
    })
  }, /*#__PURE__*/_react.default.createElement(Section, {
    title: "Scheduled tasks"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Scheduled tasks",
    data: rowsOf(D.SCHEDULED, ['name', 'path', 'status']),
    columns: [{
      title: 'Name',
      field: 'name',
      kind: 'name',
      frozen: true,
      filter: true
    }, {
      title: 'Path',
      field: 'path',
      kind: 'data'
    }, {
      title: 'Status',
      field: 'status',
      filter: 'list'
    }]
  })), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Events"
  }, "Events that trigger scripts to run, such as an asset upload or a metadata change."), /*#__PURE__*/_react.default.createElement(Planned, {
    title: "Scripts"
  }, "Groovy scripts that scheduled tasks and events run."));
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

// the section is the screen: choosing one pushes a history entry, Back and Forward follow
const legacy = hash => IDS.indexOf(hash.slice(1)) >= 0 ? '/' + hash.slice(1) : null;
function useSection() {
  const loc = (0, _plenixPlatform.useScreenLocation)({
    app: 'assets-system',
    legacy
  });
  const section = IDS.indexOf(loc.parts[0]) >= 0 ? loc.parts[0] : 'properties';
  const go = id => {
    if (IDS.indexOf(id) < 0) return;
    loc.navigate([id]);
  };
  return [section, go];
}
function Content({
  section
}) {
  const act = useAct();
  // the forms with unsaved edits; every section stays mounted, so only leaving the page asks
  const [edited, setEdited] = _react.default.useState({});
  const mark = _react.default.useCallback((id, on) => setEdited(d => !!d[id] === on ? d : {
    ...d,
    [id]: on
  }), []);
  (0, _plenixPlatform.useUnsavedGuard)(Object.keys(edited).some(k => edited[k]), 'Your settings changes have not been saved.', {
    keeps: () => true
  });
  return /*#__PURE__*/_react.default.createElement(Edited.Provider, {
    value: mark
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SettingsLayout, null, IDS.map(id => {
    const S = SECTIONS[id];
    return /*#__PURE__*/_react.default.createElement("div", {
      key: id,
      hidden: section !== id
    }, /*#__PURE__*/_react.default.createElement(S, {
      act: act
    }));
  })));
}
function SystemSettingsPage() {
  const [section, go] = useSection();
  return /*#__PURE__*/_react.default.createElement(_AssetShell.AssetPage, {
    title: "System settings",
    current: "system",
    sideNav: /*#__PURE__*/_react.default.createElement(_plenixPlatform.NavPane, {
      as: "div",
      label: "Settings sections",
      title: "System settings",
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
  }), limit && !q && hiddenCount > 0 ? /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ShowMore, {
    expanded: more,
    count: hiddenCount,
    onToggle: setMore
  })) : null);
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
      onClick: () => onOpen('categories', 'All categories')
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "folder-open",
      label: "Files",
      pressed: !!filesOpen,
      onClick: onFiles
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "grid-2x2",
      label: "Categories",
      pressed: mode === 'browse' && active === 'All categories',
      onClick: () => onOpen('categories', 'All categories')
    }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToolRail.Item, {
      icon: "briefcase",
      label: "Collections",
      onClick: () => onOpen('collections', 'All collections')
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
      onClick: () => onOpen('categories', 'All categories')
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
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Filter categories",
    hideLabel: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    value: filter,
    onChange: e => setFilter(e.target.value),
    placeholder: "Filter categories..."
  })), /*#__PURE__*/_react.default.createElement(AddLink, {
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
    title: "Saved searches",
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
    title: "Recent imports",
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
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, tags.map(t => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, {
    key: t,
    onRemove: () => setTags(tags.filter(x => x !== t)),
    removeLabel: 'Remove tag ' + t
  }, t)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagInput, {
    onAdd: t => {
      const v = t.toLowerCase();
      if (tags.indexOf(v) < 0) setTags(tags.concat(v));
    },
    placeholder: "Add a tag",
    "aria-label": "Add a tag"
  })), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "sparkle",
    onClick: act('AI tagging', 'info')
  }, "AI tagging")));
}
function Downloads({
  groups,
  act
}) {
  return groups.map(g => /*#__PURE__*/_react.default.createElement(Accordion, {
    key: g.title,
    title: g.title
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ActivityList, {
    label: g.title,
    stacked: true
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
    icon: "close-2",
    onClick: act('Cancel', 'info')
  }, "Cancel"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    variant: "primary",
    icon: "save-doc",
    onClick: act('Save', 'success')
  }, "Save"));
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
  }, collection ? D.COLLECTION_DETAIL.count : c.count)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Title",
    hideLabel: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    emphasis: true,
    value: f.name,
    onChange: e => setF({
      ...f,
      name: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "folder",
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
        label: "Display order"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, _extends({
        name: "displayOrder",
        type: "number"
      }, text('order')))), /*#__PURE__*/_react.default.createElement(Row, {
        label: "Color"
      }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorPicker, {
        palette: "category",
        label: "Color",
        size: "sm",
        value: f.color,
        onChange: h => setF({
          ...f,
          color: h
        })
      })), /*#__PURE__*/_react.default.createElement(Row, {
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
        title: "Custom fields",
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
        onClick: act('Add field', 'success')
      }, "Add field"))))
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
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Title",
    hideLabel: true
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    emphasis: true,
    value: f.title,
    onChange: e => setF({
      ...f,
      title: e.target.value
    })
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, asset.cat)), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tabs, {
    variant: "folder",
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
        label: "Usage rights"
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
          title: 'Source file',
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
        title: v.current ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
          gap: "xs",
          wrap: true
        }, v.label, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
          tone: "info",
          icon: "check"
        }, "Current version")) : v.label,
        meta: v.date + ' · ' + v.user,
        actions: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "xs",
          variant: "ghost",
          onClick: act('Download', 'info')
        }, "Download"), v.current ? null : /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
          size: "xs",
          variant: "ghost",
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
    icon: "doc-text"
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
// A category's color is a category color: a name from the category palette (CATEGORY_COLORS; batch 290).
const SORT_FIELDS = ['Name', 'Description', 'Tags', 'Rating', 'Keywords', 'Category path', 'File size', 'Dimensions', 'Date created', 'Date modified', 'Camera model', 'Aperture', 'Color profile', 'GPS location', 'Edit status', 'Owner'];
// DATA: [field, type, shown]
const CATEGORY_FIELDS = [['name', 'text', true], ['description', 'textarea', true], ['categorypath', 'text', true], ['parentid', 'text', true], ['displayorder', 'number', true], ['color', 'text', true], ['owner', 'text', true], ['viewgroups', 'list', true], ['editgroups', 'list', false], ['visibility', 'list', true], ['defaultstatus', 'list', false], ['defaultcopyright', 'text', false], ['defaulttags', 'list', false], ['totalassets', 'number', true], ['storageused', 'number', false], ['datecreated', 'date', true], ['datemodified', 'date', true]];
const ASSET_FIELDS = [['name', 'text', true], ['assettitle', 'text', true], ['sourcepath', 'text', true], ['filesize', 'number', true], ['fileformat', 'text', true], ['width', 'number', true], ['height', 'number', true], ['description', 'textarea', true], ['category', 'list dropdown', true], ['editstatus', 'list dropdown', true], ['assetaddeddate', 'date', true], ['assetmodificationdate', 'date', true]];
// DATA: the category's edit form (Edit Fields) and the fields that can be added to it.
const CATEGORY_FORM_FIELDS = [{
  name: 'Category name',
  type: 'Text'
}, {
  name: 'Description',
  type: 'Text area'
}, {
  name: 'Tags',
  type: 'Tags'
}];
const ADDABLE_FIELDS = ['Archive source path', 'Auto assigned media', 'Categories', 'Category ID', 'Color', 'Custom Field 1', 'Custom Field 2', 'Display order', 'Parent category', 'Permissions', 'Source path', 'Thumbnail'];
// DATA: [name, asset count]
const CATEGORIES = [['Banner icon', 24], ['Bookshelf', 18], ['Borders - Arch', 31], ['Borders - Circular', 42], ['Branding - Churches', 28], ['Branding - CYC', 5], ['Branding - Diakonia', 15], ['Certificate - Baptism', 89], ['Certificate - Masters', 47], ['Clergy - Metropolitan Serapion', 62], ['Clergy - Pope Shenouda III', 210], ['Clergy - Pope Tawadros II', 45], ['Cross - Traditional', 78], ['Dome', 33], ['Embroideries', 156], ['Fonts', 18]];
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
  const [color, setColor] = _react.default.useState(_plenixPlatform.CATEGORY_COLORS[0]);
  const [fieldsOpen, setFieldsOpen] = _react.default.useState(false);
  const text = k => ({
    value: form[k],
    onChange: e => setForm({
      ...form,
      [k]: e.target.value
    })
  });
  const addTag = t => {
    if (tags.indexOf(t) < 0) setTags(tags.concat(t));
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
    label: "Category name"
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
    placeholder: "Add a tag",
    "aria-describedby": uid + 'tags-d',
    onAdd: addTag
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
  }, "Category color")), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-field__control"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorPicker, {
    palette: "category",
    "aria-labelledby": uid + 'color',
    label: null,
    value: color,
    onChange: setColor
  })))), /*#__PURE__*/_react.default.createElement(EditFieldsCatDialog, {
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
    title: "Save search",
    icon: "save",
    nameLabel: "Search name",
    nameField: "searchName",
    placeholder: "e.g. High-res crosses",
    saved: "Search saved"
  }));
}
function NewCollectionDialog(props) {
  return /*#__PURE__*/_react.default.createElement(NameDialog, _extends({}, props, {
    title: "Collections \u203A Add New",
    icon: "briefcase-plus",
    nameLabel: "Collection name",
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
    title: "Advanced sort",
    icon: "sort",
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onCancel: onClose
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: apply
    }, "Apply"))
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Sort by field"
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
    "aria-label": "Sort by field",
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
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: title,
    data: rows,
    empty: EMPTY_TEXT,
    headerMenu: false,
    options: {
      movableRows: true
    },
    columns: [{
      title: 'Order',
      field: 'handle',
      kind: 'icon',
      icon: 'menu-lines',
      rowHandle: true,
      headerSort: false,
      render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: "menu-lines",
        size: "sm"
      })
    }, {
      title: 'Field',
      field: 'name',
      kind: 'name',
      headerSort: false
    }, {
      title: 'Type',
      field: 'type',
      kind: 'data',
      headerSort: false
    }, {
      title: 'Show',
      field: 'show',
      kind: 'center',
      hozAlign: 'right',
      headerHozAlign: 'right',
      headerSort: false,
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
    title: "Edit category fields",
    fields: CATEGORY_FIELDS,
    description: "Choose which category attributes to show in the detail panel. Drag to reorder."
  }));
}
function EditFieldsFileDialog(props) {
  return /*#__PURE__*/_react.default.createElement(FieldVisibilityDialog, _extends({}, props, {
    title: "Edit asset fields",
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
    title: "Edit fields",
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
    label: "Edit for all users",
    checked: forAll,
    onChange: e => setForAll(e.target.checked)
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, {
    label: "Edit fields",
    data: fields.map(f => ({
      id: f.name,
      ...f
    })),
    empty: EMPTY_TEXT,
    headerMenu: false,
    options: {
      movableRows: true
    },
    columns: [{
      title: 'Order',
      field: 'handle',
      kind: 'icon',
      icon: 'menu-lines',
      rowHandle: true,
      headerSort: false,
      render: () => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
        name: "menu-lines",
        size: "sm"
      })
    }, {
      title: 'Field',
      field: 'name',
      kind: 'name',
      headerSort: false
    }, {
      title: 'Type',
      field: 'type',
      kind: 'data',
      headerSort: false
    }, {
      title: 'Remove',
      field: 'remove',
      kind: 'center',
      hozAlign: 'right',
      headerHozAlign: 'right',
      headerSort: false,
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
     description, tags, and a color from the data colors (ColorPicker).
   - Visible Metadata: search, a type filter (All, Image, Video, Audio, 3D, Doc) and collapsible field groups; groups start
     closed and a group shows its fields only while open and matching the search, as in plenix.js.
   There is no back end: Upload confirms with the toast the legacy drop handler used ("N file(s) ready to upload") and
   closes, as the legacy Upload button did. Every state resets when the dialog closes. While files are queued, Cancel,
   Close, Escape and leaving the page ask first (useUnsavedGuard). */

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
const CATEGORIES = ['Banner icon', 'Bookshelf', 'Borders - Arch', 'Borders - Banner', 'Borders - Circular', 'Borders - Divider', 'Borders - Linear', 'Borders - Page', 'Branding - Churches', 'Branding - CYC', 'Branding - Diakonia', 'Certificates', 'Clergy', 'Covers', 'Cross - Traditional', 'Crosses', 'Dome', 'Embroideries', 'Fonts', 'Galloons', 'Korban Stamp', 'Ornamental Elements', 'Presentation Folders'];
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
const META_GROUPS = [['General', 'all', ['*Name', '*Description', '*Tags', 'Keywords', '*Rating', 'Edit status', 'Language', 'Version', 'Summary']], ['Categorization', 'all', ['*Category', 'Category ID', 'Parent category', 'Category path', 'Display order', 'Asset type', 'Classification']], ['Ownership & Rights', 'all', ['Owner', 'Creator|EXIF: Artist', 'Copyright|EXIF: Copyright', 'Copyright Notice|IPTC: CopyrightNotice', 'Rights Usage Terms|XMP: UsageTerms', 'License', 'Permissions', 'Author', 'Created by', 'Modified by']], ['Dates', 'all', ['Date Created|EXIF: DateTimeOriginal', 'Date Modified|EXIF: ModifyDate', 'Date Digitized|EXIF: CreateDate', 'GPS Date/Time|EXIF: GPSDateStamp', 'Import date', 'Publish date', 'Expiration date']], ['File properties', 'all', ['File name', 'File type', 'MIME type', 'File size', 'Source path', 'Archive source path', 'File URL', 'Data type', 'Thumbnail', 'Checksum / MD5']], ['Dimensions & Resolution', 'image,video', ['Width|EXIF: ImageWidth', 'Height|EXIF: ImageHeight', 'DPI / Resolution|EXIF: XResolution', 'Resolution Unit|EXIF: ResolutionUnit', 'Orientation|EXIF: Orientation', 'Pixel aspect ratio']], ['Camera & Lens', 'image,video', ['Camera Make|EXIF: Make', 'Camera Model|EXIF: Model', 'Camera Serial #|EXIF: SerialNumber', 'Lens Type|EXIF: LensModel', 'Lens Make|EXIF: LensMake', 'Lens Serial #|EXIF: LensSerialNumber', 'Firmware|EXIF: Software']], ['Exposure & Shooting', 'image', ['Focal Length|EXIF: FocalLength', 'Focal Length (35mm)|EXIF: FocalLengthIn35mmFormat', 'Aperture|EXIF: FNumber', 'Max Aperture|EXIF: MaxApertureValue', 'Shutter Speed|EXIF: ExposureTime', 'ISO|EXIF: ISO', 'Exposure Program|EXIF: ExposureProgram', 'Exposure Mode|EXIF: ExposureMode', 'Exposure Comp.|EXIF: ExposureCompensation', 'Metering Mode|EXIF: MeteringMode', 'Flash|EXIF: Flash', 'Flash Comp.|EXIF: FlashCompensation', 'White Balance|EXIF: WhiteBalance', 'Scene Type|EXIF: SceneCaptureType', 'Light Source|EXIF: LightSource', 'Subject Distance|EXIF: SubjectDistance', 'Focus Mode|EXIF: FocusMode', 'Digital Zoom|EXIF: DigitalZoomRatio', 'Sharpness|EXIF: Sharpness', 'Contrast|EXIF: Contrast', 'Saturation|EXIF: Saturation', 'Brightness|EXIF: BrightnessValue']], ['Color & Image', 'image', ['Color Space|EXIF: ColorSpace', 'Color Profile|EXIF: ICCProfileName', 'Color type', 'Bit Depth|EXIF: BitsPerSample', 'Compression|EXIF: Compression', 'Photometric Interp.|EXIF: PhotometricInterpretation', 'Image Unique ID|EXIF: ImageUniqueID']], ['Location (GPS)', 'image,video', ['GPS Latitude|EXIF: GPSLatitude', 'GPS Longitude|EXIF: GPSLongitude', 'GPS Altitude|EXIF: GPSAltitude', 'GPS Speed|EXIF: GPSSpeed', 'GPS Direction|EXIF: GPSImgDirection', 'GPS Area Info|EXIF: GPSAreaInformation']], ['IPTC / XMP', 'image', ['Headline|IPTC: Headline', 'Caption|IPTC: Caption-Abstract', 'By-line|IPTC: By-line', 'By-line Title|IPTC: By-lineTitle', 'Credit|IPTC: Credit', 'Source|IPTC: Source', 'Contact Info|IPTC: Contact', 'Object Name|IPTC: ObjectName', 'Category Code|IPTC: Category', 'Supplemental Cat.|IPTC: SupplementalCategories', 'Urgency|IPTC: Urgency', 'Instructions|IPTC: SpecialInstructions', 'Subject Code|XMP: Subject', 'Scene Code|IPTC: Scene', 'Intellectual Genre|IPTC: IntellectualGenre']], ['IPTC location', 'image', ['Sub-location|IPTC: Sub-location', 'City|IPTC: City', 'State / Province|IPTC: Province-State', 'Country|IPTC: Country-PrimaryLocationName', 'Country Code|IPTC: Country-PrimaryLocationCode']], ['Video — Stream', 'video', ['Duration|FFmpeg: Duration', 'Frame Rate|FFmpeg: r_frame_rate', 'Video Codec|FFmpeg: codec_name', 'Codec Profile|FFmpeg: profile', 'Video Bitrate|FFmpeg: bit_rate', 'Video resolution', 'Aspect Ratio|FFmpeg: display_aspect_ratio', 'Pixel Format|FFmpeg: pix_fmt', 'Color Primaries|FFmpeg: color_primaries', 'Color Transfer|FFmpeg: color_transfer', 'Rotation|FFmpeg: rotate', 'Audio Codec|FFmpeg: audio codec_name', 'Audio Bitrate|FFmpeg: audio bit_rate', 'Sample Rate|FFmpeg: sample_rate', 'Audio Channels|FFmpeg: channels', 'Audio Language|FFmpeg: language', 'Subtitle Tracks|FFmpeg: subtitle streams']], ['Video — Container Tags', 'video', ['Title|MP4: moov/udta ©nam', 'Artist|MP4: ©ART', 'Album|MP4: ©alb', 'Comment|MP4: ©cmt', 'Genre|MP4: ©gen / gnre', 'Year|MP4: ©day', 'Encoder|MP4: ©too', 'MKV Title|Matroska: TagName', 'MKV Date|Matroska: DateUTC', 'MKV Muxing App|Matroska: MuxingApp', 'MKV Writing App|Matroska: WritingApp', 'AVI Title|RIFF INFO: INAM', 'AVI Artist|RIFF INFO: IART', 'AVI Comment|RIFF INFO: ICMT', 'AVI Software|RIFF INFO: ISFT', 'WMV Title|ASF: Title', 'WMV Author|ASF: Author', 'WMV Description|ASF: Description', 'WMV Rating|ASF: Rating']], ['Audio — ID3 Tags', 'audio', ['Title|ID3v2: TIT2', 'Subtitle|ID3v2: TIT3', 'Artist|ID3v2: TPE1', 'Album Artist|ID3v2: TPE2', 'Album|ID3v2: TALB', 'Year|ID3v2: TDRC', 'Track Number|ID3v2: TRCK', 'Disc Number|ID3v2: TPOS', 'Genre|ID3v2: TCON', 'Composer|ID3v2: TCOM', 'Conductor|ID3v2: TPE3', 'Lyricist|ID3v2: TEXT', 'Publisher|ID3v2: TPUB', 'Encoded By|ID3v2: TENC', 'BPM|ID3v2: TBPM', 'Initial Key|ID3v2: TKEY', 'ISRC|ID3v2: TSRC', 'Comment|ID3v2: COMM', 'Lyrics|ID3v2: USLT', 'Album Art|ID3v2: APIC', 'Copyright|ID3v2: TCOP', 'Grouping|ID3v2: TIT1', 'Compilation|ID3v2: TCMP', 'Mood|ID3v2: TMOO', 'Media Type|ID3v2: TMED', 'ReplayGain|ID3v2: TXXX']], ['Audio — Stream', 'audio', ['Duration|FFmpeg: Duration', 'Audio Codec|FFmpeg: codec_name', 'Bitrate|FFmpeg: bit_rate', 'Bitrate Mode|CBR / VBR', 'Sample Rate|FFmpeg: sample_rate', 'Channels|FFmpeg: channels', 'Bit Depth|FFmpeg: bits_per_sample']], ['Document', 'document', ['Page count', 'Word count', 'Character count', 'Title|PDF: Title', 'Subject|PDF: Subject', 'PDF Producer|PDF: Producer', 'PDF Creator Tool|PDF: Creator', 'PDF Version|PDF: PDFVersion', 'Encrypted|PDF: Encryption']], ['3D / Model', '3d', ['Geometry Type|mesh, NURBS, solid', 'Vertex count', 'Face / Polygon Count', 'Edge count', 'Object count', 'Material count', 'Texture count', 'UV maps', 'Bounding box', 'Scene Units|mm, cm, m, in', 'Up Axis|Y-up, Z-up', 'Animation|has animations', 'Rigged|has armature', 'File Format|FBX, OBJ, GLTF, USD...', 'Render Engine|Cycles, Eevee, V-Ray...', 'Source Application|Blender, Maya, 3ds Max...']], ['Distribution', 'all', ['Channels', 'Auto assigned media', 'Published locations', 'Conversion preset']], ['Custom', 'all', ['Custom Field 1', 'Custom Field 2', 'Custom Field 3']]].map(([name, types, fields], g) => ({
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
  }, "Browse files"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "folder-open",
    onClick: () => folderInput.current.click()
  }, "Browse folder")), /*#__PURE__*/_react.default.createElement("input", {
    ref: filesInput,
    type: "file",
    multiple: true,
    hidden: true,
    onChange: fromInput,
    "aria-label": "Browse files"
  }), /*#__PURE__*/_react.default.createElement("input", {
    ref: folderInput,
    type: "file",
    multiple: true,
    hidden: true,
    webkitdirectory: "",
    directory: "",
    onChange: fromInput,
    "aria-label": "Browse folder"
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
    color: _plenixPlatform.CATEGORY_COLORS[0]
  });
  const shown = CATEGORIES.filter(c => !q.trim() || c.toLowerCase().includes(q.trim().toLowerCase()));
  const toggle = (c, on) => setPicked(on ? picked.concat(c) : picked.filter(p => p !== c));
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
  }, "New category"), adding ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
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
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorPicker, {
    palette: "category",
    label: "Category color",
    value: cat.color,
    onChange: h => setCat({
      ...cat,
      color: h
    })
  })) : null);
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
  }, "Visible metadata"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
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
  const cancel = (0, _plenixPlatform.useUnsavedGuard)(queue.length > 0, 'The files you chose have not been uploaded.')(onClose);
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: cancel,
    title: "Upload assets",
    icon: "upload",
    size: "xl",
    flush: true,
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: cancel
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
  fields: [['Name', 'name', 'name'], ['Description', 'description', 'assetsearchdescription'], ['Tags', 'tags', 'tags'], ['Rating', 'rating', 'assetvotes'], ['Keywords', 'keywords', 'keywords'], ['Edit status', 'editStatus', 'editstatus'], ['Language', 'language', 'language'], ['Version', 'version', 'version'], ['Summary', 'summary', 'summary']]
}, {
  title: 'Categorization',
  types: ['all'],
  shown: 2,
  fields: [['Category', 'category', 'category'], ['Data type', 'dataType', 'datatype'], ['Category ID', 'categoryId', 'categoryid'], ['Parent category', 'parentCategory', 'parentcategory'], ['Category path', 'categoryPath', 'categorypath'], ['Display order', 'displayOrder', 'displayorder'], ['Asset type', 'assetType', 'assettype'], ['Classification', 'classification', 'classification']]
}, {
  title: 'Ownership & Rights',
  types: ['all'],
  shown: 2,
  fields: [['Owner', 'owner', 'owner'], ['Creator', 'creator', 'creator'], ['Copyright', 'copyright', 'copyright'], ['Copyright notice', 'copyrightNotice', 'copyrightnotice'], ['Rights usage terms', 'rightsUsageTerms', 'usageterms'], ['License', 'license', 'license'], ['Author', 'author', 'author'], ['Created by', 'createdBy', 'createdby'], ['Modified by', 'modifiedBy', 'modifiedby']]
}, {
  title: 'Dates',
  types: ['all'],
  shown: 2,
  fields: [['Date added', 'dateAdded', 'assetaddeddate'], ['Date modified', 'dateModified', 'assetmodificationdate'], ['Date created', 'dateCreated', 'datetimeoriginal'], ['Date digitized', 'dateDigitized', 'createdate'], ['GPS Date/Time', 'gpsDateTime', 'gpsdatestamp'], ['Import date', 'importDate', 'importdate'], ['Publish date', 'publishDate', 'publishdate'], ['Expiration date', 'expirationDate', 'expirationdate']]
}, {
  title: 'File properties',
  types: ['all'],
  shown: 3,
  fields: [['File name', 'fileName', 'name'], ['File type', 'fileType', 'fileformat'], ['File size', 'fileSize', 'filesize'], ['MIME type', 'mimeType', 'mimetype'], ['Source path', 'sourcePath', 'sourcepath'], ['Archive source path', 'archiveSourcePath', 'archivesourcepath'], ['Checksum / MD5', 'checksumMd5', 'md5hex'], ['Asset ID', 'assetId', 'id']]
}, {
  title: 'Dimensions & Resolution',
  types: ['image', 'video'],
  shown: 2,
  fields: [['Width', 'width', 'width'], ['Height', 'height', 'height'], ['DPI / Resolution', 'dpiResolution', 'xresolution'], ['Resolution unit', 'resolutionUnit', 'resolutionunit'], ['Orientation', 'orientation', 'orientation'], ['Pixel aspect ratio', 'pixelAspectRatio', 'pixelaspectratio']]
}, {
  title: 'Camera & Lens',
  types: ['image', 'video'],
  shown: 2,
  fields: [['Camera make', 'cameraMake', 'make'], ['Camera model', 'cameraModel', 'model'], ['Camera Serial #', 'cameraSerial', 'serialnumber'], ['Lens type', 'lensType', 'lensmodel'], ['Lens make', 'lensMake', 'lensmake'], ['Firmware', 'firmware', 'software']]
}, {
  title: 'Exposure & Shooting',
  types: ['image'],
  shown: 4,
  fields: [['Focal length', 'focalLength', 'focallength'], ['Aperture', 'aperture', 'fnumber'], ['Shutter speed', 'shutterSpeed', 'exposuretime'], ['ISO', 'iso', 'iso'], ['Exposure program', 'exposureProgram', 'exposureprogram'], ['Exposure mode', 'exposureMode', 'exposuremode'], ['Metering mode', 'meteringMode', 'meteringmode'], ['Flash', 'flash', 'flash'], ['White balance', 'whiteBalance', 'whitebalance'], ['Scene type', 'sceneType', 'scenecapturetype'], ['Contrast', 'contrast', 'contrast'], ['Saturation', 'saturation', 'saturation'], ['Sharpness', 'sharpness', 'sharpness']]
}, {
  title: 'Color & Image',
  types: ['image'],
  shown: 2,
  fields: [['Color space', 'colorSpace', 'colorspace'], ['Color profile', 'colorProfile', 'iccprofilename'], ['Bit depth', 'bitDepth', 'bitspersample'], ['Compression', 'compression', 'compression'], ['Color type', 'colorType', 'colortype']]
}, {
  title: 'Location (GPS)',
  types: ['image', 'video'],
  shown: 2,
  fields: [['GPS latitude', 'gpsLatitude', 'gpslatitude'], ['GPS longitude', 'gpsLongitude', 'gpslongitude'], ['GPS altitude', 'gpsAltitude', 'gpsaltitude'], ['GPS speed', 'gpsSpeed', 'gpsspeed'], ['GPS direction', 'gpsDirection', 'gpsimgdirection']]
}, {
  title: 'IPTC / XMP',
  types: ['image'],
  shown: 2,
  fields: [['Headline', 'headline', 'headline'], ['Caption', 'caption', 'caption-abstract'], ['By-line', 'byLine', 'by-line'], ['Credit', 'credit', 'credit'], ['Source', 'source', 'source'], ['City', 'city', 'city'], ['Country', 'country', 'country'], ['Subject code', 'subjectCode', 'subject'], ['Urgency', 'urgency', 'urgency'], ['Instructions', 'instructions', 'specialinstructions']]
}, {
  title: 'Video — Stream',
  types: ['video'],
  shown: 4,
  fields: [['Duration', 'duration', 'duration'], ['Frame rate', 'frameRate', 'r_frame_rate'], ['Video codec', 'videoCodec', 'codec_name'], ['Video resolution', 'videoResolution', 'videoresolution'], ['Codec profile', 'codecProfile', 'profile'], ['Video bitrate', 'videoBitrate', 'bit_rate'], ['Aspect ratio', 'aspectRatio', 'display_aspect_ratio'], ['Pixel format', 'pixelFormat', 'pix_fmt'], ['Color primaries', 'colorPrimaries', 'color_primaries'], ['Rotation', 'rotation', 'rotate'], ['Audio codec', 'audioCodec', 'audio_codec_name'], ['Audio bitrate', 'audioBitrate', 'audio_bit_rate'], ['Sample rate', 'sampleRate', 'sample_rate'], ['Audio channels', 'audioChannels', 'channels'], ['Subtitle tracks', 'subtitleTracks', 'subtitle_streams']]
}, {
  title: 'Video — Container Tags',
  types: ['video'],
  shown: 2,
  fields: [['Title', 'title', 'mp4_nam'], ['Artist', 'artist', 'mp4_art'], ['Album', 'album', 'mp4_alb'], ['Comment', 'comment', 'mp4_cmt'], ['Genre', 'genre', 'mp4_gen'], ['Year', 'year', 'mp4_day'], ['Encoder', 'encoder', 'mp4_too']]
}, {
  title: 'Audio — ID3 Tags',
  types: ['audio'],
  shown: 4,
  fields: [['Title', 'title2', 'id3_tit2'], ['Artist', 'artist2', 'id3_tpe1'], ['Album', 'album2', 'id3_talb'], ['Genre', 'genre2', 'id3_tcon'], ['Album artist', 'albumArtist', 'id3_tpe2'], ['Year', 'year2', 'id3_tdrc'], ['Track number', 'trackNumber', 'id3_trck'], ['Disc number', 'discNumber', 'id3_tpos'], ['Composer', 'composer', 'id3_tcom'], ['Conductor', 'conductor', 'id3_tpe3'], ['Lyricist', 'lyricist', 'id3_text'], ['Publisher', 'publisher', 'id3_tpub'], ['BPM', 'bpm', 'id3_tbpm'], ['ISRC', 'isrc', 'id3_tsrc'], ['Lyrics', 'lyrics', 'id3_uslt'], ['Album art', 'albumArt', 'id3_apic'], ['Copyright', 'copyright2', 'id3_tcop'], ['Mood', 'mood', 'id3_tmoo'], ['ReplayGain', 'replaygain', 'id3_txxx']]
}, {
  title: 'Audio — Stream',
  types: ['audio'],
  shown: 3,
  fields: [['Duration', 'duration2', 'duration'], ['Audio codec', 'audioCodec2', 'codec_name'], ['Bitrate', 'bitrate', 'bit_rate'], ['Bitrate mode', 'bitrateMode', 'bitrate_mode'], ['Sample rate', 'sampleRate2', 'sample_rate'], ['Channels', 'channels', 'channels'], ['Bit depth', 'bitDepth2', 'bits_per_sample']]
}, {
  title: 'Document',
  types: ['document'],
  shown: 2,
  fields: [['Page count', 'pageCount', 'pagecount'], ['Title', 'title3', 'pdf_title'], ['Word count', 'wordCount', 'wordcount'], ['Character count', 'characterCount', 'charcount'], ['Subject', 'subject', 'pdf_subject'], ['PDF producer', 'pdfProducer', 'pdf_producer'], ['PDF creator tool', 'pdfCreatorTool', 'pdf_creator'], ['PDF version', 'pdfVersion', 'pdfversion'], ['Encrypted', 'encrypted', 'encryption']]
}, {
  title: '3D / Model',
  types: ['3d'],
  shown: 3,
  fields: [['Geometry type', 'geometryType', 'geometrytype'], ['Vertex count', 'vertexCount', 'vertexcount'], ['Face / Polygon Count', 'facePolygonCount', 'facecount'], ['Material count', 'materialCount', 'materialcount'], ['Texture count', 'textureCount', 'texturecount'], ['UV maps', 'uvMaps', 'uvmaps'], ['Bounding box', 'boundingBox', 'boundingbox'], ['Scene units', 'sceneUnits', 'sceneunits'], ['Animation', 'animation', 'hasanimation'], ['Rigged', 'rigged', 'hasarmature'], ['Source application', 'sourceApplication', 'sourceapp']]
}, {
  title: 'Status & Workflow',
  types: ['all'],
  shown: 3,
  fields: [['Edit status', 'editStatus2', 'editstatus'], ['Import status', 'importStatus', 'importstatus'], ['Preview status', 'previewStatus', 'previewstatus'], ['Push status', 'pushStatus', 'pushstatus'], ['Approval status', 'approvalStatus', 'approvalstatus'], ['Conversion status', 'conversionStatus', 'conversionstatus'], ['Locked', 'locked', 'islocked']]
}, {
  title: 'AI & Semantic',
  types: ['all'],
  shown: 2,
  fields: [['Semantic indexed', 'semanticIndexed', 'semanticindexed'], ['AI tags', 'aiTags', 'aitags'], ['Facial recognition', 'facialRecognition', 'facialrecognition'], ['CLIP embedding', 'clipEmbedding', 'clipembedding']]
}, {
  title: 'Distribution',
  types: ['all'],
  shown: 2,
  fields: [['Channels', 'channels2', 'distributionchannels'], ['Published locations', 'publishedLocations', 'publishedlocations'], ['Auto assigned media', 'autoAssignedMedia', 'autoassignedmedia'], ['Conversion preset', 'conversionPreset', 'conversionpreset']]
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
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ShowMore, {
    variant: "ghost",
    size: "sm",
    expanded: expanded,
    count: '+' + extra,
    onToggle: onShowMore
  })) : null));
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
  // filters changed and not applied: Cancel, Close and Escape ask first, and so does leaving the page
  const guard = (0, _plenixPlatform.useUnsavedGuard)(!!open && JSON.stringify(draft) !== JSON.stringify(current), 'The filters you changed have not been applied.');
  const cancel = guard(onClose);
  const apply = e => {
    if (e) e.preventDefault();
    if (!value) setApplied(draft);
    if (onApply) onApply(draft);
    onClose();
  };
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: cancel,
    title: "Advanced Filters \u2014 Metadata Fields",
    icon: "filter",
    size: "lg",
    footer: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      onClick: cancel
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
const COLLECTIONS = ['Liturgical Art Collection', 'Social Media Assets', 'Website Banners', 'Print Materials', 'Clergy Portraits', 'Certificate templates'];
const MOVE_CATEGORIES = ['Banner icon', 'Bookshelf', 'Borders - Arch', 'Borders - Circular', 'Branding - Churches', 'Cross - Traditional', 'Dome', 'Embroideries'];
const CHANGE_CATEGORIES = ['Banner icon', 'Borders - Arch', 'Branding - Churches', 'Dome', 'Embroideries', 'Fonts'];
const CURRENT_CATEGORY = 'Cross - Traditional';
const CURRENT_TAGS = ['coptic', 'orthodox', 'cross', 'gold', 'traditional'];
const SUGGESTED_TAGS = ['church', 'liturgical', 'icon', 'border', 'certificate', 'branding'];
const CART_ITEMS = 2;
const SHARE_LINK = 'https://plenix.lacopts.org/share/xK9m2pQ';
// the people an asset is shared with besides the signed-in person (who comes from the Platform session and can edit)
const SHARED_WITH = [{
  name: 'John Deacon',
  permission: 'Can view'
}];
const DOWNLOAD_ESTIMATE = '~24.5 MB';

// DATA: choice lists (from the back end later).
const CART_FORMATS = ['Original / Source File', 'Web Optimized (1200px max)', 'Social Media (1080 × 1080)', 'Custom Size...'];
const CART_FILE_TYPES = ['Keep original format', 'PNG', 'JPG (80% quality)', 'WebP', 'SVG (vector only)', 'PDF'];
// the six status variants (owner, 2026-10-14, docs/pills-and-colors.md): an archived workflow state is neutral
const STATUSES = [{
  value: 'Approved',
  tone: 'success',
  icon: 'circle-check'
}, {
  value: 'Pending review',
  tone: 'waiting',
  icon: 'schedule'
}, {
  value: 'In progress',
  tone: 'active',
  icon: 'progress'
}, {
  value: 'Draft',
  tone: 'neutral',
  icon: 'pencil'
}, {
  value: 'Archived',
  tone: 'neutral',
  icon: 'archive'
}];
const PERMISSIONS = ['Can view', 'Can edit', 'Admin'];
const EXPIRATIONS = ['Never', '24 hours', '7 days', '30 days', '90 days'];
const DOWNLOAD_FORMATS = ['Original / Source Files', 'Web Optimized (1200px, 72dpi)', 'Print Ready (300dpi)', 'Custom Size...'];
const DOWNLOAD_FILE_TYPES = ['Keep original format', 'PNG', 'JPG (80% quality)', 'WebP', 'PDF'];
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
  fields: [['name', 'Name', 'text', 'Leave blank to keep current'], ['description', 'Description', 'textarea', 'Leave blank to keep current'], ['tags', 'Tags', 'text', 'Comma-separated tags...'], ['keywords', 'Keywords', 'text', 'Comma-separated keywords...'], ['rating', 'Rating', 'rating'], ['editStatus', 'Edit status', 'select', ['Complete', 'New', 'In progress', 'Pending review', 'Draft', 'Archived']], ['language', 'Language', 'select', ['English', 'Arabic', 'Coptic', 'French', 'Spanish']], ['version', 'Version', 'text', 'e.g. 1.0'], ['summary', 'Summary', 'textarea', 'Brief summary...']]
}, {
  title: 'Categorization',
  types: ['all'],
  fields: [['category', 'Category', 'text', 'Type to search...'], ['parentCategory', 'Parent category', 'text', 'Parent category name'], ['displayOrder', 'Display order', 'number', '0'], ['assetType', 'Asset type', 'select', ['Image', 'Video', 'Audio', 'Document', '3D Model', 'Font']], ['classification', 'Classification', 'text', 'Classification']]
}, {
  title: 'Ownership & Rights',
  types: ['all'],
  fields: [['owner', 'Owner', 'text', 'Asset owner'], ['creator', 'Creator', 'text', 'Artist / Creator'], ['copyright', 'Copyright', 'text', 'e.g. Coptic Orthodox Diocese of LA'], ['copyrightNotice', 'Copyright notice', 'text', 'IPTC copyright notice'], ['usageTerms', 'Usage terms', 'select', ['Internal use only', 'Church Use - Non-Commercial', 'Creative Commons - Attribution', 'Public domain', 'All Rights Reserved']], ['license', 'License', 'text', 'License type'], ['author', 'Author', 'text', 'Author name']]
}, {
  title: 'Dates',
  types: ['all'],
  fields: [['dateCreated', 'Date created', 'date'], ['dateModified', 'Date modified', 'date'], ['publishDate', 'Publish date', 'date'], ['expirationDate', 'Expiration date', 'date']]
}, {
  title: 'Dimensions & Resolution',
  types: ['image', 'video'],
  fields: [['width', 'Width', 'number', 'px'], ['height', 'Height', 'number', 'px'], ['dpi', 'DPI', 'number', '72'], ['orientation', 'Orientation', 'select', ['Horizontal', 'Vertical', 'Square']]]
}, {
  title: 'Camera & Lens',
  types: ['image', 'video'],
  fields: [['cameraMake', 'Camera make', 'text', 'e.g. Canon'], ['cameraModel', 'Camera model', 'text', 'e.g. EOS R5'], ['lensType', 'Lens type', 'text', 'e.g. RF 24-70mm']]
}, {
  title: 'Exposure & Shooting',
  types: ['image'],
  fields: [['focalLength', 'Focal length', 'text', 'e.g. 50mm'], ['aperture', 'Aperture', 'text', 'e.g. f/2.8'], ['shutterSpeed', 'Shutter speed', 'text', 'e.g. 1/125'], ['iso', 'ISO', 'number', 'e.g. 400'], ['whiteBalance', 'White balance', 'select', ['Auto', 'Daylight', 'Cloudy', 'Tungsten', 'Fluorescent', 'Flash']], ['flash', 'Flash', 'select', ['Fired', 'Did not fire', 'Auto']]]
}, {
  title: 'Color & Image',
  types: ['image'],
  fields: [['colorSpace', 'Color space', 'select', ['sRGB', 'Adobe RGB', 'ProPhoto RGB', 'Display P3']], ['colorProfile', 'Color profile', 'text', 'ICC profile name'], ['bitDepth', 'Bit depth', 'select', ['8', '16', '32']]]
}, {
  title: 'Location (GPS)',
  types: ['image', 'video'],
  fields: [['gpsLatitude', 'GPS latitude', 'text', 'e.g. 34.0522'], ['gpsLongitude', 'GPS longitude', 'text', 'e.g. -118.2437'], ['gpsAltitude', 'GPS altitude', 'text', 'meters']]
}, {
  title: 'IPTC / XMP',
  types: ['image'],
  fields: [['headline', 'Headline', 'text', 'IPTC headline'], ['caption', 'Caption', 'textarea', 'Caption / abstract'], ['byLine', 'By-line', 'text', 'Photographer / creator'], ['credit', 'Credit', 'text', 'Credit line'], ['source', 'Source', 'text', 'Original source'], ['instructions', 'Instructions', 'textarea', 'Special instructions']]
}, {
  title: 'IPTC location',
  types: ['image'],
  fields: [['subLocation', 'Sub-location', 'text', 'Specific location'], ['city', 'City', 'text', 'City'], ['stateProvince', 'State / Province', 'text', 'State or province'], ['country', 'Country', 'text', 'Country name']]
}, {
  title: 'Video — Stream',
  types: ['video'],
  fields: [['duration', 'Duration', 'text', 'HH:MM:SS', true], ['frameRate', 'Frame rate', 'text', 'e.g. 29.97', true], ['videoCodec', 'Video codec', 'text', 'e.g. H.264', true], ['videoBitrate', 'Video bitrate', 'text', 'e.g. 5000 kbps', true], ['resolution', 'Resolution', 'text', 'e.g. 1920x1080', true]]
}, {
  title: 'Audio — ID3 Tags',
  types: ['audio'],
  fields: [['title', 'Title', 'text', 'Track title'], ['artist', 'Artist', 'text', 'Artist name'], ['album', 'Album', 'text', 'Album name'], ['year', 'Year', 'text', 'Release year'], ['track', 'Track #', 'text', 'e.g. 1/12'], ['genre', 'Genre', 'text', 'Genre'], ['composer', 'Composer', 'text', 'Composer name'], ['comment', 'Comment', 'textarea', 'Comment']]
}, {
  title: 'Audio — Stream',
  types: ['audio'],
  fields: [['duration2', 'Duration', 'text', 'HH:MM:SS', true], ['codec', 'Codec', 'text', 'e.g. AAC', true], ['bitrate', 'Bitrate', 'text', 'e.g. 320 kbps', true], ['sampleRate', 'Sample rate', 'text', 'e.g. 44100 Hz', true]]
}, {
  title: 'Document',
  types: ['document'],
  fields: [['title2', 'Title', 'text', 'Document title'], ['subject', 'Subject', 'text', 'Subject'], ['pageCount', 'Page count', 'number', '', true], ['pdfProducer', 'PDF producer', 'text', '', true]]
}, {
  title: '3D / Model',
  types: ['3d'],
  fields: [['geometryType', 'Geometry type', 'select', ['Mesh', 'NURBS', 'Solid']], ['vertexCount', 'Vertex count', 'number', '', true], ['faceCount', 'Face count', 'number', '', true], ['sceneUnits', 'Scene units', 'select', ['mm', 'cm', 'm', 'in']], ['upAxis', 'Up axis', 'select', ['Y-up', 'Z-up']], ['fileFormat', 'File format', 'text', 'e.g. FBX, GLTF', true], ['sourceApp', 'Source app', 'text', 'e.g. Blender', true]]
}, {
  title: 'Distribution',
  types: ['all'],
  fields: [['channels', 'Channels', 'text', 'Distribution channels'], ['conversionPreset', 'Conversion preset', 'select', ['Web optimized', 'Print ready', 'Social Media', 'Original']]]
}];

/* ── wording and the legacy action map (plenix.js bulkAction) ── */
const BULK_ACTIONS = {
  'Download': 'baDownload',
  'Download as': 'baDownloadAs',
  'Delete': 'baDelete',
  'Add to Collection': 'baCollection',
  'Move': 'baMove',
  'Change category': 'baChangeCategory',
  'Add to Cart': 'baCart',
  'Change status': 'baStatus',
  'Update metadata': 'baMetadata',
  'Edit tags': 'baTags',
  'Rating': 'baRating',
  'Share': 'baShare',
  'Delete category': 'baDelete',
  'Move category': 'baMove',
  'Change category status': 'baStatus',
  'Share category': 'baShare',
  'Rename category': 'baRename',
  'Edit category': 'baMetadata'
};
// Buttons on the category bar (index.html #catBulkBar); 'Download category' and 'Download Category as' have no dialog.
const CATEGORY_ACTIONS = ['Delete category', 'Move category', 'Change category status', 'Share category', 'Rename category', 'Edit category', 'Download category', 'Download Category as'];
// .single-only buttons: disabled while more than one item is selected.
const SINGLE_ONLY = ['Rename category', 'Edit category', 'Edit image', 'Regenerate thumbnail'];
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
  }, "Create new collection"))));
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
    title: "Move assets",
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
    title: "Change category",
    description: 'Reassign ' + things(count, kind) + ' to a different category',
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Change category",
      onApply: onApply,
      values: {
        category: dest
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Current category"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, null, currentCategory))), /*#__PURE__*/_react.default.createElement(CategoryPicker, {
    label: "New category",
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
    label: "Download format",
    name: "cartFmt",
    value: format,
    onChange: setFormat,
    options: CART_FORMATS.map(v => ({
      value: v,
      label: v
    }))
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "File type"
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
  const [status, setStatus] = _react.default.useState('Pending review');
  const [note, setNote] = _react.default.useState('');
  const options = STATUSES.map(s => ({
    value: s.value,
    label: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
      tone: s.tone,
      icon: s.icon
    }, s.value)
  }));
  return /*#__PURE__*/_react.default.createElement(_plenixPlatform.Dialog, {
    open: open,
    onClose: onClose,
    size: "sm",
    icon: "circle-check",
    title: "Change status",
    description: 'Set edit status for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply status",
      onApply: onApply,
      values: {
        status,
        note
      }
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.RadioGroup, {
    label: "New status",
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
    title: "Update metadata",
    description: 'Batch-edit metadata for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Save metadata",
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
    title: "Edit tags",
    description: 'Add or remove tags for ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply tags",
      onApply: onApply,
      values: values
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Add tags"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "addTags",
    placeholder: "Type tags separated by commas...",
    value: add,
    onChange: e => setAdd(e.target.value)
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Current Tags (click \xD7 to remove)"), current.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Current tags"
  }, current.map(t => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Tag, {
    key: t,
    onRemove: () => setCurrent(current.filter(x => x !== t))
  }, t))) : /*#__PURE__*/_react.default.createElement(NoData, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "plx-stack plx-stack--gap-xs"
  }, /*#__PURE__*/_react.default.createElement(Caption, null, "Suggested Tags (click to add)"), suggested.length ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.TagList, {
    label: "Suggested tags"
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
    title: "Set rating",
    description: 'Rate ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Apply rating",
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
    permission: 'Can edit'
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
    label: "Share link"
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
    label: "Share with people"
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
    label: "Link expiration"
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
    label: "File type"
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
    title: "Download as",
    description: 'Convert and download ' + things(count, kind, 'selected '),
    footer: /*#__PURE__*/_react.default.createElement(Footer, {
      onClose: onClose,
      label: "Download",
      onApply: onApply,
      values: v
    })
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "Convert to"
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
    title: "Rename category",
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
    label: "Current name"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Input, {
    name: "currentName",
    readOnly: true,
    value: itemName
  })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
    label: "New name"
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
  "dam/app/pages/home/HomePage.jsx": { deps: {"react":null,"plenix-platform":null,"../../shell/AssetShell.jsx":"dam/app/shell/AssetShell.jsx","./Sidebar.jsx":"dam/app/pages/home/Sidebar.jsx","./Inspector.jsx":"dam/app/pages/home/Inspector.jsx","./homeData.js":"dam/app/pages/home/homeData.js","./findAssets.js":"dam/app/pages/home/findAssets.js","../../dialogs/BrowseDialogs.jsx":"dam/app/dialogs/BrowseDialogs.jsx","../../dialogs/UploadDialog.jsx":"dam/app/dialogs/UploadDialog.jsx","../../dialogs/MetadataFilterDialog.jsx":"dam/app/dialogs/MetadataFilterDialog.jsx","../../dialogs/BulkDialogs.jsx":"dam/app/dialogs/BulkDialogs.jsx"}, externals: { "react": function () { return window.React; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
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
var _findAssets = require("./findAssets.js");
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
   The address (Platforms Standard 4.3): each view is a screen with a history entry: #/ (categories), #/collections,
   #/category/<name>, #/search?q=<text>&<filters>&sort=… (findAssets.js), #/saved/<name>, and ?asset=<id> on any of them
   for the open asset; refining a search in the workspace is a new entry per committed search (Enter or leaving the
   field, a filter, Clear all, the sort), never per keystroke, and a refined saved search becomes a search; the last
   screen is restored on load (plenix.assets.view). ?q=text (the header on other pages links here) names the search
   screen; ?upload=1 opens the upload dialog. Dialogs are opened by their legacy ids from app/dialogs (one host renders
   the open one). */
const DIALOGS = {
  ..._BrowseDialogs.DIALOGS,
  ..._UploadDialog.DIALOGS,
  ..._MetadataFilterDialog.DIALOGS,
  ..._BulkDialogs.DIALOGS
};
// the View menu's card sizes (s, m, l) as ContentGrid sizes; the Search workspace's own size names (S, M, L) too
const GRID_SIZE = {
  s: 'xs',
  m: 'sm',
  l: 'md',
  S: 'xs',
  M: 'sm',
  L: 'md'
};

/* the command bar's fields (utils/fields.js) of each collection the home page lists: what Filter, Sort, Group and the
   quick filters work on. Dates are written "Aug 28, 2026" in the data; the fields read them as ISO dates. */
const isoDate = s => {
  const d = new Date(s + ' 00:00 UTC');
  return isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10);
};
const uniq = values => Array.from(new Set(values)).sort();
const CATEGORY_FIELDS = [{
  value: 'name',
  label: 'Category name',
  kind: 'text'
}, {
  value: 'count',
  label: 'Assets',
  kind: 'number'
}, {
  value: 'modified',
  label: 'Modified',
  kind: 'date',
  get: r => isoDate(r.modified)
}, {
  value: 'status',
  label: 'Status',
  kind: 'select',
  options: uniq(D.CATEGORY_CARDS.map(c => c.status))
}];
const COLLECTION_FIELDS = [{
  value: 'name',
  label: 'Collection name',
  kind: 'text'
}, {
  value: 'count',
  label: 'Assets',
  kind: 'number'
}, {
  value: 'updated',
  label: 'Updated',
  kind: 'date',
  get: r => isoDate(r.updated)
}, {
  value: 'owner',
  label: 'Owner',
  kind: 'select',
  options: uniq(D.COLLECTION_CARDS.map(c => c.owner))
}];
const ASSET_FIELDS = [{
  value: 'name',
  label: 'Name',
  kind: 'text'
}, {
  value: 'cat',
  label: 'Category',
  kind: 'select',
  options: uniq(D.ASSETS.map(a => a.cat))
}, {
  value: 'badge',
  label: 'Type',
  kind: 'select',
  options: uniq(D.ASSETS.map(a => a.badge))
}, {
  value: 'tags',
  label: 'Tags',
  kind: 'multi',
  options: uniq([].concat.apply([], D.ASSETS.map(a => a.tags)))
}, {
  value: 'size',
  label: 'Size',
  kind: 'text'
}, {
  value: 'date',
  label: 'Date added',
  kind: 'date',
  get: r => isoDate(r.date)
}, {
  value: 'owner',
  label: 'Owner',
  kind: 'select',
  options: uniq(D.ASSETS.map(a => a.owner))
}, {
  value: 'status',
  label: 'Status',
  kind: 'select',
  options: uniq(D.ASSETS.map(a => a.status))
}];
// the columns each table shows (the Columns menu lists only these)
const COLUMNS = {
  categories: ['name', 'count', 'modified', 'status'],
  collections: ['name', 'count', 'updated', 'owner'],
  assets: ['name', 'cat', 'badge', 'size', 'date', 'status']
};
const GALLERY = {
  layout: 'gallery',
  size: 'l',
  height: 'short'
};

/* the grids' sorters (Tabulator sorter functions): numbers written with commas, file sizes, dates */
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
const byNumber = (a, b) => (parseFloat(String(a).replace(/,/g, '')) || 0) - (parseFloat(String(b).replace(/,/g, '')) || 0);
const bySize = (a, b) => parseSize(a) - parseSize(b);
const byDate = (a, b) => new Date(a).getTime() - new Date(b).getTime();
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
  return (
    /*#__PURE__*/
    // the Files pane: it resizes, folds to a rail and closes (the Asset Manager lets people close it; batch 259)
    _react.default.createElement(_plenixPlatform.SecondaryPane, {
      title: "Files",
      icon: "folder-open",
      collapsible: true,
      resizable: true,
      onClose: onClose,
      strings: {
        close: 'Close files pane'
      },
      actions: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "primary",
        icon: "upload",
        onClick: onUpload
      }, "Upload")
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
    }, "New folder")))
  );
}
const opts = values => Array.from(new Set(values)).sort().map(x => ({
  value: x,
  label: x,
  count: values.filter(y => y === x).length
}));

// ?q=text from another page names the search screen (in place: it is where the person arrived, not a move)
function nameSearchScreen() {
  const q = new URLSearchParams(location.search).get('q');
  if (q !== null && !location.hash) history.replaceState(history.state, '', location.pathname + location.search + (0, _plenixPlatform.screenHref)(['search'], {
    q
  }));
}
function HomePage() {
  nameSearchScreen();
  const loc = (0, _plenixPlatform.useScreenLocation)({
    app: 'assets'
  });
  const toast = (0, _plenixPlatform.useToast)();
  const act = (msg, tone = 'info') => () => toast.show(msg, {
    tone
  });
  const params = _react.default.useMemo(() => new URLSearchParams(location.search), []);
  const [view, setView] = _react.default.useState(params.get('q') !== null ? 'find' : 'categories');
  const [find, setFind] = _react.default.useState({
    ..._findAssets.FIND_EMPTY,
    query: params.get('q') || ''
  });
  const [saved, setSaved] = _react.default.useState(D.SAVED_SEARCHES);
  const [query, setQuery] = _react.default.useState(params.get('q') || '');
  const [heading, setHeading] = _react.default.useState('');
  const [active, setActive] = _react.default.useState('All categories');
  // the Search workspace's own view (cards or a table)
  const [mode, setMode] = _react.default.useState('grid');
  // the command bar of each list (owner, 2026-10-14): search, Filter, the quick filters, Sort, Group, Columns and View
  const catView = (0, _plenixPlatform.useCollectionView)(CATEGORY_FIELDS, {
    text: r => r.name,
    columns: {
      order: COLUMNS.categories,
      hidden: []
    },
    view: GALLERY
  });
  const colView = (0, _plenixPlatform.useCollectionView)(COLLECTION_FIELDS, {
    text: r => r.name + ' ' + r.owner,
    columns: {
      order: COLUMNS.collections,
      hidden: []
    },
    view: GALLERY
  });
  const assetView = (0, _plenixPlatform.useCollectionView)(ASSET_FIELDS, {
    text: r => [r.name, r.file, r.cat].concat(r.tags).join(' '),
    quick: {
      cat: 'list',
      badge: 'list',
      tags: 'list'
    },
    columns: {
      order: COLUMNS.assets,
      hidden: []
    },
    view: GALLERY
  });
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
  const [dragging, setDragging] = _react.default.useState(0);
  const openDialog = (id, props = {}) => setDialog({
    id,
    props
  });
  const browse = view === 'categories' || view === 'collections';
  const collections = view === 'collections';

  // the screen named by the address: the view (with its category, search or saved search), then the open asset
  const shownQuery = _react.default.useRef(''); // the query of the search the address names
  const viewKey = (0, _plenixPlatform.screenHref)(loc.parts, Object.assign({}, loc.params, {
    asset: undefined
  })); // the open asset is not a view
  _react.default.useLayoutEffect(() => {
    const [top, name] = loc.parts;
    setFiles(false);
    setSelCats([]);
    setSelAssets([]);
    if (top === 'collections') {
      setView('collections');
      setActive('All collections');
    } else if (top === 'category' && name) {
      setView('search');
      setHeading(name);
      setQuery('');
      setActive(name);
    } else if (top === 'search') {
      setQuery(loc.params.q || '');
      setActive(null);
      setFind((0, _findAssets.findOf)(loc.params));
      setView('find');
      shownQuery.current = loc.params.q || '';
    } else if (top === 'saved' && name) {
      const s = saved.find(x => x.name === name);
      shownQuery.current = s ? s.query : '';
      setActive(name);
      setFind({
        ..._findAssets.FIND_EMPTY,
        query: s ? s.query : '',
        filters: s ? s.filters : {},
        saved: name
      });
      setView('find');
    } else {
      setView('categories');
      setActive('All categories');
    }
  }, [viewKey]);
  _react.default.useLayoutEffect(() => {
    const a = loc.params.asset;
    setAsset(a === undefined ? null : +a);
    if (a !== undefined) setRight(r => ({
      ...r,
      collapsed: false
    }));
  }, [loc.params.asset]);
  // each is a new screen (a history entry)
  const showView = v => loc.navigate(v === 'collections' ? ['collections'] : '/');
  const openCategory = name => loc.navigate(['category', name]);
  // the Search workspace: opened from the header search (Enter) with the query, or from a saved search with its criteria
  const openFind = f => f.saved ? loc.navigate(['saved', f.saved]) : loc.navigate(['search'], {
    q: f.query || ''
  });
  const openAsset = id => loc.navigate(loc.parts, Object.assign({}, loc.params, {
    asset: id
  }));
  const onSidebar = (kind, name) => {
    if (kind === 'saved') {
      openFind({
        saved: name
      });
      return;
    }
    if (kind === 'categories' && name === 'All categories') showView('categories');else if (kind === 'collections' && name === 'All collections') showView('collections');else openCategory(name);
  };
  const search = q => openFind({
    query: q
  });
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
  const assetsSel = D.ASSETS.filter(a => selAssets.indexOf(a.id) >= 0);
  const current = asset === null ? null : D.ASSETS[asset];

  /* ── the selection's commands (owner, 2026-10-15: the swap): while rows are selected the command bar holds them instead of
     the page's actions, search and filters; a single-item command is disabled with a why-tooltip while several are
     selected; Delete last ── */
  const catActions = [{
    id: 'dl',
    label: 'Download',
    icon: 'download-tray',
    items: [{
      id: 'd',
      label: 'Download',
      onSelect: () => bulk('Download category')
    }, {
      id: 'da',
      label: 'Download as',
      onSelect: () => bulk('Download Category as')
    }]
  }, {
    id: 'move',
    label: 'Move',
    icon: 'move',
    onSelect: () => bulk('Move category')
  }, {
    id: 'rename',
    label: 'Rename',
    icon: 'rename',
    single: true,
    onSelect: () => bulk('Rename category')
  }, {
    id: 'meta',
    label: 'Edit metadata',
    icon: 'fields',
    single: true,
    onSelect: () => bulk('Edit category')
  }, {
    id: 'status',
    label: 'Change status',
    icon: 'circle-check',
    onSelect: () => bulk('Change category status')
  }, {
    id: 'share',
    label: 'Share',
    icon: 'share',
    onSelect: () => bulk('Share category')
  }, {
    id: 'del',
    label: 'Delete',
    icon: 'trash-detail',
    danger: true,
    onSelect: () => bulk('Delete category')
  }];
  const catSel = {
    count: selCats.length,
    noun: 'category',
    plural: 'categories',
    label: 'Category actions',
    actions: catActions,
    onClear: () => setSelCats([])
  };
  const item = (label, action, extra) => ({
    id: action,
    label,
    onSelect: () => bulk(action),
    ...extra
  });
  const assetActions = [{
    id: 'dl',
    label: 'Download',
    icon: 'download-tray',
    items: [item('Download', 'Download'), item('Download as', 'Download as')]
  }, {
    id: 'edit',
    label: 'Edit',
    icon: 'fields',
    items: [item('Multi edit', 'Multi edit'), item('Edit image', 'Edit image', {
      single: true
    }), item('Update metadata', 'Update metadata'), item('Approve', 'Approve'), item('Reject', 'Reject'), item('Export', 'Export'), item('Delete selected assets', 'Delete', {
      danger: true
    }), item('Print assets', 'Print assets')]
  }, {
    id: 'add',
    label: 'Add to',
    icon: 'briefcase-plus',
    items: [item('Cart', 'Add to Cart'), item('Bookmarks', 'Add to Bookmarks'), item('Document', 'Add to Document'), item('Person', 'Add to Person'), item('Categories', 'Add to Categories'), item('Collections', 'Add to Collections'), item('Media profile', 'Add to Media Profile')]
  }, {
    id: 'move',
    label: 'Move',
    icon: 'move',
    onSelect: () => bulk('Move')
  }, {
    id: 'share',
    label: 'Share',
    icon: 'share',
    items: [item('Email assets', 'Email assets'), item('Publish Assets to Server', 'Publish Assets to Server')]
  }, {
    id: 'publish',
    label: 'Publish',
    icon: 'upload',
    onSelect: () => bulk('Publish')
  }, {
    id: 'thumb',
    label: 'Regenerate thumbnail',
    icon: 'image-b-2',
    single: true,
    onSelect: () => bulk('Regenerate thumbnail')
  }];
  const assetSel = {
    count: selAssets.length,
    noun: 'asset',
    label: 'Asset actions',
    actions: assetActions,
    onClear: () => setSelAssets([])
  };
  // Advanced Search shares the same commands and selection count in its results CommandBar.
  const searchSelection = {
    ...assetSel,
    total: D.ASSETS.length,
    onSelectAll: () => setSelAssets(D.ASSETS.map(a => a.id))
  };
  const found = (0, _findAssets.findAssets)(find);
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
  // a committed refinement is a new screen (a history entry): the address carries the query, the filters and the sort
  const commitFind = next => {
    setFind(next);
    loc.navigate(['search'], (0, _findAssets.findParams)(next));
  };
  const committed = find.query === shownQuery.current;
  // the query typed in the workspace is applied as the person types; Enter or leaving the field commits it (and clearing it)
  const onFindKey = e => {
    if (e.key === 'Enter' && view === 'find' && !committed && e.target.closest('.plx-search-ws__query')) commitFind(find);
  };
  const onFindBlur = e => {
    if (view === 'find' && !committed && e.target.closest('.plx-search-ws__query')) commitFind(find);
  };
  const setFindQuery = q => q ? setFind({
    ...find,
    query: q,
    saved: null
  }) : commitFind({
    ...find,
    query: '',
    saved: null
  });
  const setFindFilter = (id, value) => commitFind({
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
    options: opts(D.ASSETS.map(a => (0, _findAssets.MONTH)(a.date))),
    value: find.filters.date || null
  }, {
    id: 'status',
    label: 'Status',
    options: opts(D.ASSETS.map(a => a.status)),
    value: find.filters.status || null
  }];

  /* ── content ── */
  // the browse views' command bar state: the categories, the collections, or a category's assets
  const cv = view === 'categories' ? catView : view === 'collections' ? colView : assetView;
  const fieldsOf = view === 'categories' ? CATEGORY_FIELDS : view === 'collections' ? COLLECTION_FIELDS : ASSET_FIELDS;
  const gallery = view === 'find' ? mode === 'grid' : cv.view.layout === 'gallery';
  const gridSize = GRID_SIZE[view === 'find' ? 'L' : cv.view.size];
  // the cards show what the bar finds, in its order (the table applies the same through its props)
  const shown = rows => rows.filter(cv.test).sort((0, _plenixPlatform.compareLevels)(fieldsOf, cv.tableProps.sort));
  // the grid picks with the Platform's selection model: a click toggles, Shift extends from the last one picked, Ctrl or ⌘ toggles
  const assetPick = (0, _plenixPlatform.useSelection)({
    items: (view === 'find' ? found : shown(D.ASSETS)).map(x => x.id),
    mode: 'multiple',
    selected: selAssets,
    onChange: setSelAssets
  });
  const tableProps = view === 'find' ? {} : cv.tableProps;
  let content;
  if (view === 'categories') {
    content = gallery ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: gridSize,
      label: "Categories"
    }, shown(D.CATEGORY_CARDS).map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
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
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, _extends({
      label: "Categories",
      data: D.CATEGORY_CARDS,
      selectable: true,
      selected: selCats,
      onSelectionChange: setSelCats,
      on: {
        rowClick: (e, row) => openCategory(row.getData().name)
      }
    }, tableProps, {
      columns: [{
        title: 'Category name',
        field: 'name',
        kind: 'name',
        frozen: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          src: r.thumb,
          name: r.name
        })
      }, {
        title: 'Assets',
        field: 'count',
        kind: 'data',
        sorter: byNumber
      }, {
        title: 'Modified',
        field: 'modified',
        kind: 'data',
        sorter: byDate
      }, {
        title: 'Status',
        field: 'status',
        kind: 'center',
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
          tone: "success"
        }, r.status)
      }]
    }));
  } else if (view === 'collections') {
    content = gallery ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: gridSize,
      label: "Collections"
    }, shown(D.COLLECTION_CARDS).map(c => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
      key: c.id,
      icon: "briefcase",
      title: c.name,
      meta: c.count + ' assets',
      onOpen: () => openCategory(c.name)
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, _extends({
      label: "Collections",
      data: D.COLLECTION_CARDS,
      on: {
        rowClick: (e, row) => openCategory(row.getData().name)
      }
    }, tableProps, {
      columns: [{
        title: 'Collection name',
        field: 'name',
        kind: 'name',
        frozen: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          icon: "briefcase",
          name: r.name
        })
      }, {
        title: 'Assets',
        field: 'count',
        kind: 'data',
        sorter: byNumber
      }, {
        title: 'Updated',
        field: 'updated',
        kind: 'data',
        sorter: byDate
      }, {
        title: 'Owner',
        field: 'owner'
      }]
    }));
  } else {
    const list = view === 'find' ? found : D.ASSETS;
    content = gallery ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.ContentGrid, {
      size: gridSize,
      label: "Search results"
    }, (view === 'find' ? list : shown(list)).map(a => /*#__PURE__*/_react.default.createElement(_plenixPlatform.MediaCard, {
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
      onSelectChange: (on, e) => assetPick.choose(a.id, e),
      selectLabel: 'Select ' + a.name,
      onOpen: () => openAsset(a.id),
      "aria-current": asset === a.id ? 'true' : undefined
    }))) : /*#__PURE__*/_react.default.createElement(_plenixPlatform.LegacyDataTable, _extends({
      label: "Search results",
      data: list,
      selectable: true,
      selected: selAssets,
      onSelectionChange: setSelAssets,
      on: {
        rowClick: (e, row) => openAsset(row.getData().id)
      }
    }, tableProps, {
      columns: [{
        title: 'Name',
        field: 'name',
        kind: 'name',
        frozen: true,
        render: r => /*#__PURE__*/_react.default.createElement(ThumbName, {
          src: r.thumb,
          name: r.name
        })
      }, {
        title: 'Category',
        field: 'cat',
        kind: 'center',
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, {
          gap: "xs"
        }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Icon, {
          name: "folder",
          size: "xs"
        }), r.cat)
      }, {
        title: 'Type',
        field: 'badge',
        kind: 'data'
      }, {
        title: 'Size',
        field: 'size',
        kind: 'data',
        hozAlign: 'right',
        headerHozAlign: 'right',
        sorter: bySize
      }, {
        title: 'Date added',
        field: 'date',
        kind: 'data',
        sorter: byDate
      }, {
        title: 'Status',
        field: 'status',
        kind: 'center',
        render: r => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Badge, {
          tone: r.status === 'Complete' ? 'success' : 'neutral'
        }, r.status)
      }]
    }));
  }

  /* ── the command bar over the list (owner, 2026-10-15: one bar that swaps on a selection, Microsoft 365), fixed at the
     top while the list scrolls ── */
  const noun = view === 'categories' ? ['category', 'categories'] : view === 'collections' ? ['collection', 'collections'] : ['asset', 'assets'];
  const totals = {
    categories: D.CATEGORY_CARDS,
    collections: D.COLLECTION_CARDS,
    search: D.ASSETS
  };
  const n = view === 'find' ? 0 : cv.count(totals[view] || []);
  const barActions = view === 'categories' ? [{
    id: 'new',
    label: 'New category',
    icon: 'add',
    onSelect: () => openDialog('newCatModal')
  }] : view === 'collections' ? [{
    id: 'new',
    label: 'New collection',
    icon: 'add',
    onSelect: () => openDialog('newCollectionModal')
  }] : [{
    id: 'upload',
    label: 'Upload',
    icon: 'upload',
    onSelect: () => openDialog('uploadModal')
  }, {
    id: 'save',
    label: 'Save search',
    icon: 'save',
    onSelect: saveSearch
  }];
  // the app's quick filters (Category, Type, Tags): when the bar is short of room they fold into More after the commands
  const quick = (key, label, icon, word) => Object.assign({
    id: key,
    label,
    icon,
    noun: word,
    options: (ASSET_FIELDS.find(f => f.value === key) || {}).options
  }, cv.quickProps(key));
  const bar = view === 'find' ? null : /*#__PURE__*/_react.default.createElement(_plenixPlatform.CommandBar, {
    label: view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : 'Assets',
    actions: barActions,
    count: n + ' ' + (n === 1 ? noun[0] : noun[1]),
    find: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.CommandBarSearch, _extends({}, cv.searchProps, {
      placeholder: 'Search ' + noun[1]
    })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.FilterPanel, cv.filterProps)),
    quickFilters: view === 'search' ? [quick('cat', 'Category', 'grid-2x2', 'category'), quick('badge', 'Type', 'image-b', 'type'), quick('tags', 'Tags', 'tags', 'tag')] : [],
    view: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SortPanel, cv.sortProps), /*#__PURE__*/_react.default.createElement(_plenixPlatform.GroupPanel, cv.groupProps), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColumnsMenu, _extends({}, cv.columnsProps, {
      fields: fieldsOf.filter(f => COLUMNS[view === 'search' ? 'assets' : view].indexOf(f.value) >= 0)
    })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ViewMenu, cv.viewProps)),
    selection: view === 'categories' ? catSel : view === 'search' ? assetSel : null
  });
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
  const title = view === 'categories' ? 'Categories' : view === 'collections' ? 'Collections' : heading || 'Search results';

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
    resizable: true,
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
    "aria-labelledby": "home-title",
    onKeyDown: onFindKey,
    onBlur: onFindBlur
  }, browse ? dropHandlers : {}), view === 'find' ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.SearchWorkspace, {
    title: find.saved || (find.query ? 'Search results' : 'Search'),
    query: find.query,
    onQueryChange: setFindQuery,
    placeholder: "Search assets by name, filename, metadata\u2026",
    noun: "asset",
    count: found.length,
    filters: filterDefs,
    onFilterChange: setFindFilter,
    onClearAll: () => commitFind({
      ...find,
      filters: {},
      saved: null
    }),
    sort: {
      value: find.sort,
      options: ['Relevance', 'Newest', 'Oldest', 'Name A–Z', 'Name Z–A', 'Size'],
      onChange: o => commitFind({
        ...find,
        sort: o
      })
    },
    view: {
      value: mode,
      onChange: setMode
    },
    onSave: saveSearch,
    selection: searchSelection
  }, content) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Text, {
    as: "h2",
    id: "home-title",
    variant: "title"
  }, title), bar, content, pagination), dragging ? /*#__PURE__*/_react.default.createElement(_plenixPlatform.DropZone, {
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
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix asset app · image editor (app/pages/ImageEditorPage.jsx): a focus-mode page for one picture (a mockup).
   Replaces image-editor.html's markup, image-editor.js and image-editor.css (batch 112). Every control changes one
   description of the edit (the state); the picture is drawn from it, and each finished change is kept so Undo and Redo
   step through them. Sliders preview while dragging and record when let go. Nothing is uploaded or saved: Save, Copy,
   Download and Export only say what they would do, in the status line over the canvas. The page is dark
   (<html data-plx-mode="dark">). Until Save (or Save as), an edit is unsaved work: closing or leaving the page asks
   (useUnsavedGuard; Platforms Standard 4.3). */
// the editor's choices come from the design system's steps file (batch 282): the picture is drawn only from them
const PRESETS = _plenixPlatform.IMAGE_EDITOR_STEPS.presets,
  RATIOS = _plenixPlatform.IMAGE_EDITOR_STEPS.ratios;
const RATIO_CHOICES = ['Original', 'Free transform'].concat(RATIOS.map(r => r.label));
const ratioId = label => {
  const r = RATIOS.find(x => x.label === label);
  return r ? r.id : '';
};
const snap = (v, step) => Math.round(v / step) * step;
const FONTS = _plenixPlatform.IMAGE_EDITOR_STEPS.fonts;
const EXPORTS = ['PNG', 'JPEG', 'SVG', 'TIFF', 'PSD', 'EPS', 'GIF', 'BMP', 'WebP', 'PDF'];
const SLIDERS = _plenixPlatform.IMAGE_EDITOR_STEPS.sliders;
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
  const [zoom, setZoom] = _react.default.useState(0); // a zoom step: the frame scales by STEPS.zoom.base to this power
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
    color: 'brown',
    align: 'left'
  }); // a data color (the legacy editor's gold is brown)
  const [ratio, setRatio] = _react.default.useState('Original');
  const [dragOver, setDragOver] = _react.default.useState(false);
  const [msg, say] = useStatus();
  const file = _react.default.useRef(null);
  // the edit last saved: anything else (or an overlay chosen and not composed) is unsaved
  const [saved, setSaved] = _react.default.useState(() => JSON.stringify(START));
  (0, _plenixPlatform.useUnsavedGuard)(JSON.stringify(edit) !== saved || !!pending, 'Your edits to this image have not been saved.');
  const save = message => {
    setSaved(JSON.stringify(edit));
    say(message);
  };
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
    setRatio((RATIOS.find(r => r.id === st.crop) || {
      label: 'Original'
    }).label);
    say(by < 0 ? 'Undone' : 'Redone');
  };
  const zoomTo = n => {
    const z = Math.max(_plenixPlatform.IMAGE_EDITOR_STEPS.zoom.min, Math.min(_plenixPlatform.IMAGE_EDITOR_STEPS.zoom.max, n));
    setZoom(z);
    say('Zoom ' + Math.round(Math.pow(_plenixPlatform.IMAGE_EDITOR_STEPS.zoom.base, z) * 100) + '%');
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
  // the edit as attributes: each a step the design system draws (system/steps.css from image-editor.steps.json); vibrance is a gentler saturation
  const sat = Math.max(_plenixPlatform.IMAGE_EDITOR_STEPS.saturate.min, Math.min(_plenixPlatform.IMAGE_EDITOR_STEPS.saturate.max, Math.round((edit.saturation / 100 + edit.vibrance / 200) * _plenixPlatform.IMAGE_EDITOR_STEPS.saturate.per)));
  const look = {
    'data-plx-brightness': snap(edit.brightness, _plenixPlatform.IMAGE_EDITOR_STEPS.step),
    'data-plx-contrast': snap(edit.contrast, _plenixPlatform.IMAGE_EDITOR_STEPS.step),
    'data-plx-saturate': sat,
    'data-plx-hue': snap(edit.hueRotation, _plenixPlatform.IMAGE_EDITOR_STEPS.step),
    'data-plx-blur': Math.round(edit.blur),
    'data-plx-preset': edit.preset || undefined,
    'data-plx-ratio': edit.crop || undefined,
    'data-plx-rotate': (edit.rotate % 360 + 360) % 360,
    'data-plx-flip-x': edit.flipX ? '' : undefined,
    'data-plx-flip-y': edit.flipY ? '' : undefined
  };
  const overlay = pending || edit.overlay;
  const header = /*#__PURE__*/_react.default.createElement("header", {
    className: "plx-image-editor__bar"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar, {
    label: "Editor"
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: () => save('Saved')
  }, "Save"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    onClick: () => save('Saved as a copy')
  }, "Save as"), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Menu, {
    label: "Export as",
    trigger: /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      caret: true
    }, "Export as")
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
    label: "Zoom in",
    onClick: () => zoomTo(zoom + 1)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-zoom-out",
    label: "Zoom out",
    onClick: () => zoomTo(zoom - 1)
  }), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    iconOnly: true,
    icon: "ed-recenter",
    label: "Recenter",
    onClick: () => zoomTo(0)
  }))));
  const panels = {
    filters: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, SLIDERS.map(({
      key: k,
      label,
      min,
      max,
      unit,
      step: by
    }) => /*#__PURE__*/_react.default.createElement(_plenixPlatform.Slider, {
      key: k,
      label: label,
      min: min,
      max: max,
      step: by || _plenixPlatform.IMAGE_EDITOR_STEPS.step,
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
    }, PRESETS.map(p => /*#__PURE__*/_react.default.createElement("button", {
      key: p.id,
      type: "button",
      className: "plx-image-editor__preset",
      "aria-pressed": edit.preset === p.id,
      onClick: () => change({
        preset: edit.preset === p.id ? '' : p.id
      })
    }, /*#__PURE__*/_react.default.createElement("img", {
      src: 'assets/editor/filter-' + p.id + '.svg',
      alt: "",
      width: "100",
      height: "56"
    }), /*#__PURE__*/_react.default.createElement("span", null, p.label))))),
    crop: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Field, {
      label: "Aspect ratio"
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Select, {
      name: "aspectRatio",
      value: ratio,
      onChange: e => setRatio(e.target.value)
    }, RATIO_CHOICES.map(r => /*#__PURE__*/_react.default.createElement("option", {
      key: r
    }, r)))), /*#__PURE__*/_react.default.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => {
        const c = ratioId(ratio);
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
      label: "Font family"
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
      label: "Font weight",
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
    }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ColorPicker, {
      label: "Text color",
      size: "sm",
      value: text.color,
      onChange: h => setText({
        ...text,
        color: h
      })
    })), /*#__PURE__*/_react.default.createElement(_plenixPlatform.ButtonGroup, {
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
      min: _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.opacity.min,
      max: _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.opacity.max,
      step: _plenixPlatform.IMAGE_EDITOR_STEPS.step,
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
      min: _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.min,
      max: _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.max,
      step: _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.step,
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
    page: "editor",
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
    "data-plx-zoom": zoom
  }, /*#__PURE__*/_react.default.createElement("img", _extends({
    src: "assets/editor/artwork.svg",
    width: "420",
    height: "420",
    alt: "Image being edited: gold Coptic cross on a brown background",
    className: 'plx-image-editor__image' + (edit.crop ? ' plx-image-editor__image--cropped' : '')
  }, look)), edit.texts.map((t, i) => /*#__PURE__*/_react.default.createElement("span", {
    key: i,
    className: 'plx-image-editor__text' + (t.weight === 'Bold' ? ' plx-image-editor__text--bold' : '') + (t.weight === 'Italic' ? ' plx-image-editor__text--italic' : '') + (t.align === 'center' ? ' plx-image-editor__text--center' : t.align === 'right' ? ' plx-image-editor__text--end' : ''),
    "data-plx-color": t.color,
    "data-plx-font": t.font,
    "data-plx-top": Math.min(_plenixPlatform.IMAGE_EDITOR_STEPS.textTop.max, snap(40 + i * 12, _plenixPlatform.IMAGE_EDITOR_STEPS.step))
  }, t.text)), overlay ? /*#__PURE__*/_react.default.createElement("img", {
    src: overlay.src,
    alt: "",
    className: "plx-image-editor__overlay",
    "data-plx-opacity": snap(overlay.opacity, _plenixPlatform.IMAGE_EDITOR_STEPS.step),
    "data-plx-scale": snap(overlay.scale, _plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.step)
  }) : null), /*#__PURE__*/_react.default.createElement("div", {
    role: "status",
    "aria-live": "polite",
    className: "plx-image-editor__status"
  }, msg)));
}
  } },
  "dam/app/assets.jsx": { deps: {"react":null,"react-dom/client":null,"../../suite/session.js":"suite/session.js","plenix-platform":null,"./pages/MyAccountPage.jsx":"dam/app/pages/MyAccountPage.jsx","./pages/SystemSettingsPage.jsx":"dam/app/pages/SystemSettingsPage.jsx","./pages/home/HomePage.jsx":"dam/app/pages/home/HomePage.jsx","./pages/ImageEditorPage.jsx":"dam/app/pages/ImageEditorPage.jsx"}, externals: { "react": function () { return window.React; }, "react-dom/client": function () { return window.ReactDOM; }, "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = require("react-dom/client");
var _session = require("../../suite/session.js");
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

// the Asset Manager's pages are built on tables: start loading their engine while the page draws (batch 237)
_plenixPlatform.LegacyDataTable.preload();
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
  (0, _client.createRoot)(el).render(/*#__PURE__*/_react.default.createElement(_plenixPlatform.ThemeProvider, null, /*#__PURE__*/_react.default.createElement(_plenixPlatform.SessionProvider, {
    session: _session.SUITE_SESSION
  }, /*#__PURE__*/_react.default.createElement(_plenixPlatform.ToastProvider, null, tree))));
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
