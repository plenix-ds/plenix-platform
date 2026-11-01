/*
 * GENERATED FILE — DO NOT EDIT
 * Source: dam/app/assets.jsx and the modules it imports
 * Build: node build-app.js (Vite, vite.apps.config.mjs)
 */
if (!window.React) throw new Error('Plenix: "react" is not loaded before this script');
if (!window.ReactDOM) throw new Error('Plenix: "react-dom/client" is not loaded before this script');
if (!window.Plenix) throw new Error('Plenix: "plenix-platform" is not loaded before this script');
(function(React2, client, plenixPlatform) {
  "use strict";
  const SUITE_SESSION = {
    account: { name: "Jordan Avery", firstName: "Jordan", lastName: "Avery", email: "jordan.avery@example.com" },
    notifications: [
      { id: 1, text: "Fr. Daniel uploaded 12 new assets to Liturgy", time: "5 min ago", unread: true },
      { id: 2, text: "Maya Chen sent a message: Round 3 concepts \u2014 confirm Thursday?", time: "10:24 AM", unread: true },
      { id: 3, text: "Sarah M. approved your batch download request", time: "22 min ago", unread: true },
      { id: 4, text: "Task due Mar 8: Deliver logo concepts round 3", time: "Yesterday", unread: false },
      { id: 5, text: "Version 3 of Banner Icon Set is now live", time: "Yesterday", unread: false }
    ],
    // the applications pinned to the header until the person changes them: every application
    pinnedApps: ["home", "projects", "messaging", "contacts", "calendar", "tasks", "notes", "bookmarks", "files", "assets"]
  };
  const folder = (name, children) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label: name, icon: "folder", children });
  const FOLDERS$1 = [
    folder("All", [
      folder("Digital Assets", [
        folder("Banner icon"),
        folder("Bookshelf"),
        folder("Borders", [folder("Arch"), folder("Banner"), folder("Circular"), folder("Divider"), folder("Linear"), folder("Page")]),
        folder("Branding", [folder("Churches"), folder("CYC"), folder("Diakonia"), folder("LACopts")]),
        folder("Certificates"),
        folder("Clergy"),
        folder("Crosses"),
        folder("Embroideries"),
        folder("Fonts")
      ]),
      folder("Documents", [folder("Manuals"), folder("Templates")]),
      folder("Facial Profiles"),
      folder("Users")
    ])
  ];
  const FOLDERS_OPEN = ["all", "digital-assets"];
  const CATEGORIES$2 = [
    ["All categories", "4,546", true],
    ["Branding", "326", true],
    ["Crosses", "1,284", true],
    ["Banner icon", "18"],
    ["Bookshelf", "18"],
    ["Borders", "245"],
    ["Certificates", "387"],
    ["Clergy", "512"],
    ["Covers", "198"],
    ["Dome", "14"],
    ["Embroideries", "31"],
    ["Fonts", "22"],
    ["Galloons", "27"],
    ["Korban Stamp", "8"],
    ["Ornamental Elements", "45"],
    ["Presentation Folders", "12"]
  ].map(([name, count, pinned]) => ({ name, count, pinned: !!pinned }));
  const CATEGORIES_SHOWN = 7;
  const COLLECTIONS$1 = [["All collections", "305", true], ["Website Assets", "84", true], ["Social Media", "42", true], ["Print ready", "156"], ["Needs review", "23"]].map(([name, count, pinned]) => ({ name, count, pinned: !!pinned }));
  const SAVED_SEARCHES = [
    { name: "High-res crosses", query: "cross", filters: {} },
    { name: "Untagged assets", query: "", filters: { status: "New" } },
    { name: "Large files >50MB", query: "", filters: { type: ["PSD"] } }
  ];
  const RECENT_IMPORTS = [["Aug 31, 2026", 28], ["Aug 24, 2026", 112], ["Aug 15, 2026", 67]];
  const TRASH = [["Deleted assets", 12]];
  const CATEGORY_CARDS = [
    ["Banner icon", 24, 5, "Aug 28, 2026"],
    ["Bookshelf", 18, 6, "Aug 25, 2026"],
    ["Borders - Arch", 31, 7, "Aug 22, 2026"],
    ["Borders - Circular", 42, 8, "Aug 20, 2026"],
    ["Branding - Churches", 28, 9, "Aug 18, 2026"],
    ["Branding - CYC", 5, 10, "Aug 15, 2026"],
    ["Branding - Diakonia", 15, 11, "Aug 12, 2026"],
    ["Certificate - Baptism", 89, 12, "Aug 10, 2026"],
    ["Certificate - Masters", 47, 13, "Aug 8, 2026"],
    ["Clergy - Metropolitan Serapion", 62, 14, "Aug 5, 2026"],
    ["Clergy - Pope Shenouda III", 210, 15, "Aug 2, 2026"],
    ["Clergy - Pope Tawadros II", 45, 16, "Jul 30, 2026"],
    ["Cross - Traditional", 78, 17, "Jul 25, 2026"],
    ["Dome", 33, 18, "Jul 20, 2026"],
    ["Embroideries", 156, 19, "Jul 15, 2026"],
    ["Fonts", 18, 20, "Jul 10, 2026"]
  ].map(([name, count, thumb, modified], i) => ({ id: i, name, count, thumb: "assets/thumb-" + thumb + ".svg", modified, status: "Active" }));
  const CATEGORY_TOTAL = 48;
  const COLLECTION_CARDS = [["Website Assets", 84, "Aug 28, 2026", "jordan"], ["Social Media", 42, "Aug 25, 2026", "jordan"], ["Print ready", 156, "Aug 20, 2026", "sarah"], ["Needs review", 23, "Aug 14, 2026", "daniel"]].map(([name, count, updated, owner], i) => ({ id: i, name, count, updated, owner }));
  const ASSETS = [
    ["Coptic Cross Gold Traditional", "Cross - Traditional", "Coptic_Cross_Gold.ai", "Adobe Illustrator (.ai)", "AI", "18.7 MB", "2400 \xD7 3200 px", "Aug 12, 2026", "Complete"],
    ["Cross Gold Ornate Large", "Cross - Majestic", "Cross_Gold_Ornate.psd", "Photoshop (.psd)", "PSD", "42.1 MB", "4800 \xD7 6400 px", "Aug 10, 2026", "Complete"],
    ["Cross Gold Pectoral", "Cross - Pectoral Silver", "Cross_Gold_Pectoral.ai", "Adobe Illustrator (.ai)", "AI", "8.3 MB", "1200 \xD7 1600 px", "Aug 8, 2026", "Complete"],
    ["Gold Cross Floral Border", "Cross - Floral", "Gold_Cross_Floral.png", "PNG", "PNG", "4.2 MB", "2000 \xD7 2000 px", "Jul 28, 2026", "New"],
    ["Cross Gold Diamond Pattern", "Cross - Diamond", "Cross_Gold_Diamond.ai", "Adobe Illustrator (.ai)", "AI", "12.6 MB", "3000 \xD7 3000 px", "Jul 22, 2026", "Complete"],
    ["Gold Cross Iconostasis", "Cross - Iconostasis", "Gold_Cross_Iconostasis.jpg", "JPEG", "JPG", "1.8 MB", "1920 \xD7 2560 px", "Jul 15, 2026", "Complete"],
    ["Cross Gold Procession", "Cross - Procession", "Cross_Gold_Procession.psd", "Photoshop (.psd)", "PSD", "28.4 MB", "4000 \xD7 5000 px", "Jul 10, 2026", "New"],
    ["Gold Coptic Cross Linear", "Cross - Linear", "Gold_Coptic_Linear.ai", "Adobe Illustrator (.ai)", "AI", "6.1 MB", "1800 \xD7 2400 px", "Jul 5, 2026", "Complete"]
  ].map(([name, cat, file, fmt2, badge, size, dims, date, status], i) => ({
    id: i,
    name,
    cat,
    file,
    fmt: fmt2,
    badge,
    size,
    dims,
    date,
    status,
    thumb: "assets/thumb-" + (21 + i) + ".svg",
    typeIcon: "file-" + badge.toLowerCase(),
    tags: name.toLowerCase().split(" "),
    owner: ["Jordan Avery", "Sarah M.", "John Deacon"][i % 3]
  }));
  const ASSET_TOTAL = 210;
  const CATEGORY_DETAIL = {
    name: "Cross - Traditional",
    count: "78 assets",
    parent: "Categories (root)",
    parents: ["Categories (root)", "Borders", "Branding", "Clergy", "Crosses"],
    order: "8",
    color: "brown",
    copyright: "Coptic Orthodox Church",
    rights: "Internal",
    rightsOptions: ["Internal", "Commercial", "Editorial", "Public domain"],
    rating: 0,
    description: "Traditional Coptic cross designs and variations",
    tags: ["cross", "traditional", "coptic"],
    stats: [["Total assets", "78"], ["Storage used", "1.4 GB"], ["Created", "Jul 3, 2026"], ["Modified", "Aug 28, 2026"]],
    permissions: [["Owner", "jordan"], ["View groups", "administrators, users, guest"], ["Edit groups", "administrators"]],
    customFields: [["Style", "e.g. Byzantine, Nubian..."], ["Material", "e.g. Wood, Stone, Metal..."], ["Origin", "e.g. Egypt, Ethiopia..."]]
  };
  const COLLECTION_DETAIL = { name: "Website Assets", count: "84 assets" };
  const CATEGORY_DOWNLOADS = [
    { title: "Download entire category", items: [["file-zip", "All Files (Source)", "78 files \xB7 ~1.4 GB"]] },
    { title: "Download by file type", items: [["file-ai", "Adobe Illustrator (.ai)", "42 files \xB7 ~820 MB"], ["file-png", "PNG Images", "78 files \xB7 ~340 MB"], ["file-jpg", "JPEG Thumbnails", "78 files \xB7 ~18 MB"], ["file-svg", "SVG Vectors", "35 files \xB7 ~12 MB"], ["file-pdf", "PDF Print-Ready", "42 files \xB7 ~280 MB"]] },
    { title: "Variations", items: [["file-jpg", "Web Optimized (sRGB, 1200px)", "78 files \xB7 ~45 MB"], ["file-png", "Social Media (1080\xD71080)", "78 files \xB7 ~62 MB"]] }
  ];
  const ASSET_DOWNLOADS = [
    { title: "Download by file type", items: [["file-png", "Preview.png", "4.2 MB"], ["file-jpg", "Web.jpg", "245 KB"]] },
    { title: "Variations", items: [["file-jpg", "Web Optimized (sRGB, 1200px)", "180 KB"], ["file-png", "Social Media (1080\xD71080)", "520 KB"]] }
  ];
  const ASSET_STATUSES = ["Complete", "New", "In progress", "Pending review", "Archived"];
  const USAGE_RIGHTS = ["Internal use only", "Church Use", "Creative Commons", "Public domain"];
  const VERSIONS$1 = [
    { label: "Version 3 (Current)", date: "Aug 12, 2026 at 2:45 PM", user: "Jordan A.", current: true },
    { label: "Version 2", date: "Jul 5, 2026 at 10:12 AM", user: "Sarah M." },
    { label: "Version 1 (Original)", date: "Jun 18, 2026 at 3:30 PM", user: "Fr. Daniel" }
  ];
  const CARD_MENU = [
    ["fields", "Edit category", "Edit category"],
    ["rename", "Rename", "Rename"],
    ["image-a-2", "Set thumbnail", "Set thumbnail"],
    ["menu-lines", "Visible metadata", "Manage metadata"],
    ["move", "Move To...", "Move"],
    ["lock", "Permissions", "Permissions"],
    ["trash-detail", "Delete", "Delete"]
  ];
  const FIND_EMPTY = { query: "", filters: {}, sort: "Relevance", saved: null };
  const MONTH = (d) => d.replace(/ \d+,/, "");
  const MULTIPLE = ["type", "cat", "tags"], SINGLE = ["owner", "date", "status"];
  function findAssets(f) {
    const words = f.query.toLowerCase().split(/\s+/).filter(Boolean);
    const v = f.filters;
    const list = ASSETS.filter((a) => {
      const hay = [a.name, a.file, a.cat, a.fmt, a.owner].concat(a.tags).join(" ").toLowerCase();
      if (words.some((w) => hay.indexOf(w) < 0)) return false;
      if ((v.type || []).length && v.type.indexOf(a.badge) < 0) return false;
      if ((v.cat || []).length && v.cat.indexOf(a.cat) < 0) return false;
      if ((v.tags || []).length && !v.tags.every((t) => a.tags.indexOf(t) >= 0)) return false;
      if (v.owner && a.owner !== v.owner) return false;
      if (v.status && a.status !== v.status) return false;
      if (v.date && MONTH(a.date) !== v.date) return false;
      return true;
    });
    const by = {
      Newest: (a, b) => Date.parse(b.date) - Date.parse(a.date),
      Oldest: (a, b) => Date.parse(a.date) - Date.parse(b.date),
      "Name A\u2013Z": (a, b) => a.name.localeCompare(b.name),
      "Name Z\u2013A": (a, b) => b.name.localeCompare(a.name),
      Size: (a, b) => parseFloat(b.size) - parseFloat(a.size)
    }[f.sort];
    return by ? list.slice().sort(by) : list;
  }
  function findParams(f) {
    const p = { q: f.query || "" };
    MULTIPLE.forEach((k) => {
      if ((f.filters[k] || []).length) p[k] = f.filters[k].join(",");
    });
    SINGLE.forEach((k) => {
      if (f.filters[k]) p[k] = f.filters[k];
    });
    if (f.sort && f.sort !== FIND_EMPTY.sort) p.sort = f.sort;
    return p;
  }
  function findOf(params) {
    const filters = {};
    MULTIPLE.forEach((k) => {
      if (params[k]) filters[k] = params[k].split(",");
    });
    SINGLE.forEach((k) => {
      if (params[k]) filters[k] = params[k];
    });
    return { ...FIND_EMPTY, query: params.q || "", filters, sort: params.sort || FIND_EMPTY.sort };
  }
  const LIBRARY = { assets: 4546, size: "12.4 GB", owner: "Lighthouse Way" };
  const RECENT_MAX = 5;
  const afterSearchView = (open) => {
    const st = window.history.state;
    if (!(st && st.plxSearch)) {
      open();
      return;
    }
    const go = () => {
      window.removeEventListener("popstate", go);
      open();
    };
    window.addEventListener("popstate", go);
    window.history.back();
  };
  function AssetHeader({ current, query = "", onSearch, onUpload }) {
    const [q, setQ] = React2.useState(query);
    const [kept, updateKept] = plenixPlatform.useViewState("assets");
    const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
    const run = (text) => {
      const t = text.trim();
      if (t) updateKept((v) => ({ recentSearches: [t].concat((v.recentSearches || []).filter((x) => x !== t)).slice(0, RECENT_MAX) }));
      setQ(t);
      afterSearchView(() => {
        if (onSearch) onSearch(t);
        else if (t) location.href = "index.html?q=" + encodeURIComponent(t);
      });
    };
    const onSearchKey = (e) => {
      if (e.key === "Enter") run(q);
    };
    const openAsset = (a) => afterSearchView(() => {
      const t = q.trim();
      if (onSearch) plenixPlatform.navigate(["search"], { q: t, asset: a.id });
      else location.href = "index.html" + plenixPlatform.screenHref(["search"], { q: t, asset: a.id });
    });
    const typed = q.trim().toLowerCase();
    const recentShown = recent.filter((x) => x.toLowerCase().indexOf(typed) >= 0);
    const suggestions = recentShown.length ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SectionHeading, null, "Recent searches"), /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList, { label: "Recent searches" }, recentShown.map((x) => /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList.Item, { key: x, leading: /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "clock" }), title: x, onOpen: () => run(x) })))) : null;
    const found = typed ? findAssets({ ...FIND_EMPTY, query: q }) : null;
    const results = found ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SectionHeading, null, "Assets"), found.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList, { label: "Assets", stacked: true }, found.map((a) => /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList.Item, { key: a.id, leading: /* @__PURE__ */ React2.createElement(plenixPlatform.Thumbnail, { src: a.thumb, alt: "" }), title: a.name, meta: a.cat + " \xB7 " + a.badge, onOpen: () => openAsset(a) }))) : /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "secondary", as: "p" }, "Nothing matches \u201C" + q.trim() + "\u201D.")) : null;
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.AppHeader,
      {
        tone: "accent",
        currentApp: "assets",
        appsRoot: "../",
        brandHref: "index.html",
        action: /* @__PURE__ */ React2.createElement(plenixPlatform.AppHeader.Action, { icon: "hdr-upload", onClick: () => {
          if (onUpload) onUpload();
          else location.href = "index.html?upload=1";
        } }, "Upload"),
        search: /* @__PURE__ */ React2.createElement(
          plenixPlatform.SearchField,
          {
            value: q,
            onChange: (e) => setQ(e.target.value),
            onClear: () => setQ(""),
            onKeyDown: onSearchKey,
            label: "Search assets",
            placeholder: "Search assets by name, tag, or keyword...",
            shortcut: "Ctrl K",
            onAccent: true
          }
        ),
        searchSuggestions: suggestions,
        searchResults: results,
        account: /* @__PURE__ */ React2.createElement(plenixPlatform.AppHeader.Account, { current: current === "system" ? "app-settings" : current, myAccount: { href: "settings-myaccount.html" }, settings: { href: "../settings/index.html#/general" }, appSettings: { app: "Asset Manager", href: "settings-system.html" } })
      }
    );
  }
  function AssetStatusBar() {
    return /* @__PURE__ */ React2.createElement(plenixPlatform.StatusBar, { start: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.StatusIcon, { tone: "success", size: "sm" }, "Library online"), /* @__PURE__ */ React2.createElement("span", null, plenixPlatform.dataPhrase("{n} assets | {size}", { n: LIBRARY.assets, size: LIBRARY.size }))), end: LIBRARY.owner });
  }
  function AssetPage({ title, current, query, onSearch, onUpload, sideNav, panel, children }) {
    return /* @__PURE__ */ React2.createElement(plenixPlatform.AppShell, { header: /* @__PURE__ */ React2.createElement(AssetHeader, { current, query, onSearch, onUpload }), sideNav, panel, footer: /* @__PURE__ */ React2.createElement(AssetStatusBar, null), mainClassName: "plx-shell-main" }, /* @__PURE__ */ React2.createElement("h1", { className: "plx-visually-hidden" }, "Plenix Asset Manager: " + title), children);
  }
  const PAGE_SIZES = ["6", "8", "12", "15", "20", "30", "36", "50", "100", "200"];
  const LAST_VIEWED = "finder/find";
  const SECTIONS$1 = [
    { heading: "My account", items: [{ id: "profile", label: "Profile", icon: "settings-profile" }, { id: "preferences", label: "Preferences", icon: "settings-preferences" }] }
  ];
  const legacy$1 = (hash) => hash === "#profile" || hash === "#preferences" ? "/" + hash.slice(1) : null;
  function useSection$1() {
    const loc = plenixPlatform.useScreenLocation({ app: "assets-account", legacy: legacy$1 });
    const section = loc.parts[0] === "preferences" ? "preferences" : "profile";
    const go = (id) => {
      if (id === "home") return;
      loc.navigate([id]);
    };
    return [section, go];
  }
  const keeps = () => true;
  function Profile() {
    const toast = plenixPlatform.useToast();
    const { account } = plenixPlatform.useSession();
    const [p, setP] = React2.useState(() => ({ firstName: account.firstName || "", lastName: account.lastName || "", email: account.email || "" }));
    const [saved, setSaved] = React2.useState(p);
    plenixPlatform.useUnsavedGuard(Object.keys(p).some((k) => p[k] !== saved[k]), "Your profile changes have not been saved.", { keeps });
    const field = (k) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }) });
    return /* @__PURE__ */ React2.createElement("form", { noValidate: true, onSubmit: (e) => {
      e.preventDefault();
      setSaved(p);
      toast.show("Profile saved", { tone: "success" });
    } }, /* @__PURE__ */ React2.createElement(plenixPlatform.RecordPage.Header, { title: "Profile", description: "Edit your account details and update your password.", headingLevel: 2 }), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { title: "Account details", stateKey: "profile", actions: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: () => toast.show("Change password") }, "Change password"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", variant: "primary" }, "Save")) }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "First name", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "firstName", width: "lg", autoComplete: "given-name", enterKeyHint: "next", ...field("firstName") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Last name", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "lastName", width: "lg", autoComplete: "family-name", enterKeyHint: "next", ...field("lastName") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Email", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "email", width: "lg", type: "email", inputMode: "email", autoComplete: "email", autoCapitalize: "off", spellCheck: false, enterKeyHint: "done", ...field("email") }))));
  }
  function Preferences() {
    const toast = plenixPlatform.useToast();
    const [density, setDensity] = plenixPlatform.useDensity();
    const ws = window.PlenixWorkspace;
    const [mode, setModeState] = React2.useState(() => ws && ws.mode ? ws.mode() : "system");
    const setMode = (m) => {
      setModeState(m);
      if (ws && ws.setMode) ws.setMode(m);
    };
    const [prefs, setPrefs] = React2.useState({ assets: "30", rows: "30", album: false, approval: false, dateFormat: "" });
    const [saved, setSaved] = React2.useState(prefs);
    plenixPlatform.useUnsavedGuard(Object.keys(prefs).some((k) => prefs[k] !== saved[k]), "Your preferences have not been saved.", { keeps });
    const [sizes, setSizes] = React2.useState(PAGE_SIZES.map((v) => ({ value: v, label: v })));
    const set = (k) => (v) => setPrefs({ ...prefs, [k]: v });
    const create = (k) => (text) => {
      const v = text.trim();
      if (!v) return;
      if (!sizes.some((o) => o.value === v)) setSizes(sizes.concat({ value: v, label: v }));
      set(k)(v);
    };
    return /* @__PURE__ */ React2.createElement("form", { noValidate: true, onSubmit: (e) => {
      e.preventDefault();
      setSaved(prefs);
      toast.show("Preferences saved", { tone: "success" });
    } }, /* @__PURE__ */ React2.createElement(plenixPlatform.RecordPage.Header, { title: "Preferences", description: "Your personal display and notification preferences.", headingLevel: 2 }), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { title: "Display", stateKey: "display", description: "Your mode and density apply at once, on every page." }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label: "Mode", description: "System follows the light or dark setting of your device" }, /* @__PURE__ */ React2.createElement(plenixPlatform.SegmentedControl, { label: "Mode", value: mode, onChange: setMode, options: [{ value: "system", label: "System" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" }] })), /* @__PURE__ */ React2.createElement(plenixPlatform.ChoiceList, { legend: "Display density", value: density, onChange: setDensity, options: window.PlenixWorkspace ? window.PlenixWorkspace.densities() : [] })), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { title: "Results and dates", stateKey: "results" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Assets per page", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Combobox, { options: sizes, value: prefs.assets, onChange: set("assets"), creatable: true, onCreate: create("assets") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Rows per page", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Combobox, { options: sizes, value: prefs.rows, onChange: set("rows"), creatable: true, onCreate: create("rows") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Preferred date format", layout: "inline", info: "Accepted formats: yyyy-MM-dd, MM-dd-yyyy, dd-MM-yyyy" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "preferredDateFormat", width: "lg", data: true, autoComplete: "off", autoCapitalize: "off", spellCheck: false, enterKeyHint: "done", placeholder: "yyyy-MM-dd", value: prefs.dateFormat, onChange: (e) => set("dateFormat")(e.target.value) }))), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { title: "Notifications", stateKey: "notifications" }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label: "Album notifications", description: "When assets are added to or removed from an album you follow" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Switch, { label: "Album notifications", labelHidden: true, checked: prefs.album, onChange: (e) => set("album")(e.target.checked) })), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label: "Approval and rejection notifications", description: "When your assets are approved or rejected" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Switch, { label: "Approval and rejection notifications", labelHidden: true, checked: prefs.approval, onChange: (e) => set("approval")(e.target.checked) }))), /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { title: "Activity", stateKey: "activity", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Last viewed application", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "output", variant: "data" }, LAST_VIEWED))), /* @__PURE__ */ React2.createElement(plenixPlatform.ActionBar, { label: "Preferences actions" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", variant: "primary" }, "Save preferences")));
  }
  function MyAccountPage() {
    const [section, go] = useSection$1();
    return /* @__PURE__ */ React2.createElement(AssetPage, { title: "My account", current: "account", sideNav: /* @__PURE__ */ React2.createElement(plenixPlatform.NavPane, { as: "div", label: "Settings sections", title: "My account", header: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "home", href: "index.html" }, "Home"), footer: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "arrow-left", href: "index.html" }, "Back to Asset Manager") }, /* @__PURE__ */ React2.createElement(plenixPlatform.NavList, { label: "Settings sections", value: section, onSelect: go, groups: SECTIONS$1 })) }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsLayout, null, /* @__PURE__ */ React2.createElement("div", { hidden: section !== "profile" }, /* @__PURE__ */ React2.createElement(Profile, null)), /* @__PURE__ */ React2.createElement("div", { hidden: section !== "preferences" }, /* @__PURE__ */ React2.createElement(Preferences, null))));
  }
  const PROPERTIES = {
    defaultRecordLabel: "${entitytable.name}",
    tabOrdering: "115",
    enableUploading: true,
    enableOnSearch: true,
    defaultResultsView: "Grid",
    defaultSortField: "",
    uploadSourcepath: "Module/${entitytableid.name} ${formatteddate} ${formattedyear} ${data.entity_date.yyyy} ${entityid.entityparentid.sourcepath}",
    autoCreateEntities: false,
    rootFolderPath: "",
    autoCreateAtFolderLevel: "0",
    semanticEnabled: true,
    aiSearchPrompt: "",
    aiSearchContains: ""
  };
  const RESULT_VIEWS = ["Columns", "Gallery", "Grid", "Map", "Table"];
  const ENABLED_FOR = [["Administrators", true], ["Catalogs Admins", true], ["Uploaders", true], ["Users", true], ["Anonymous", false]];
  const ACTIONS = [["View details", "All"], ["Edit metadata", "Entity Editor, Administrators"], ["Delete", "Administrators"], ["Download original", "Entity Editor, Administrators"], ["Share", "All"]];
  const VIEW_ALL = [["Administrators", true], ["Catalogs Admins", true], ["Uploaders", false]];
  const EDIT_ALL = [["Administrators", true], ["Catalogs Admins", true]];
  const FIELDS = [
    ["Asset title", "assettitle", "textbox"],
    ["Caption", "headline", "textbox"],
    ["Description", "longcaption", "textbox"],
    ["Categories", "category", "list"],
    ["Asset type", "assettype", "list"],
    ["Author", "creator", "text"],
    ["Copyright notice", "copyrightnotice", "textbox"],
    ["Copyright status", "copyrightstatus", "list"],
    ["Color space", "colorspace", "list"],
    ["File format", "fileformat", "textbox"],
    ["File size", "filesize", "number"],
    ["Created on", "assetcreationdate", "date"],
    ["Asset expired", "assetexpired", "boolean"],
    ["Face profiles", "faceprofiles", "nested"],
    ["GEO location", "geo_point", "geo_point"]
  ];
  const FIELD_TOTAL = 214;
  const ASSET_TYPES = [
    ["3D Modeling", "stl obj gltf glb fbx blend usd usda usdz 3ds dae abc ply wrl x3d step stp iges igs", 0],
    ["Archives", "zip rar 7z tar gz bz2 xz cab iso dmg", 1],
    ["Audio", "mp3 wav flac aac ogg wma m4a aiff alac opus mid midi amr", 2],
    ["Documents", "pdf doc docx ppt pptx xls xlsx rtf odt ods odp txt csv tsv epub pages numbers keynote indd indt idml xml html dita ditamap shtml", 3],
    ["Fonts", "ttf otf woff woff2 eot", 4],
    ["Images", "jpg jpeg tiff tif gif png webp avif heic heif jxl pbm pgm pnm ppm hdr exr bmp icr tga svg svgz psd psb jp2 cr2 cr3 arw nef nrw orf raf raw2 dng 3fr iiq pef srw x3f gpr rwl dcr mrw erf kdc cdr cdt cmx cpx pat ai eps wmf emf", 5],
    ["Video", "mp4 mov avi flv wmv mkv mpg mpeg m4v webm ogv 3gp 3g2 maf ts vob divx rm rmvb asf m2ts mts", 6]
  ];
  const HOT_FOLDERS = [{ name: "Plenix Import", enabled: true, meta: "Path: imports \xB7 Fully scanned Aug 18, 2026, 3:49 PM" }];
  const CONVERSIONS = [
    ["Image 3000x3000 JPG", "image3000x3000.jpg", "Yes", "Yes", "Image"],
    ["Webp Image 3000x3000", "image3000x3000.webp", "Yes", "Yes", "Image"],
    ["Webp Image 550x550", "image550x550.webp", "Yes", "Yes", "Image, Documents, Video"],
    ["Webp Image 200 Thumbnail", "image200x200.webp", "Yes", "Yes", "Image, Documents, Video"],
    ["Webp Image Large Watermarked", "image3000x3000wm.webp", "Yes", "No", "Image, Documents"],
    ["Video HLS", "video.m3u8", "Yes", "Yes", "Video"],
    ["Video MP4 480p", "video.mp4", "Yes", "No", "Video"],
    ["Video Proxy MOV", "VideoProxy.mov", "Yes", "No", "Video"],
    ["Mp3 Audio", "audio.mp3", "Yes", "Yes", "Audio"],
    ["Document Large Webp Image", "image3000x3000.webp", "Yes", "Yes", "Documents"]
  ];
  const USERS = [
    ["admin", "Administrator Administrator", "admin@example.com", "Administrators", "Dec 18, 2023", "Sep 1, 2026"],
    ["agent", "Plenix Finder AI Helper", "\u2014", null, "Sep 1, 2026", "\u2014"],
    ["jordan", "Jordan Avery", "jordan.avery@example.com", "Administrators", "Sep 1, 2026", "Sep 19, 2026"],
    ["testuser", "\u2014", "\u2014", null, "Dec 18, 2023", "Feb 13, 2015"]
  ];
  const GROUPS$1 = ["Administrators", "Catalogs Admins", "Uploaders", "Users"];
  const PERMISSION_ROLES = ["Entity owner", "Administrators", "Entity editor", "Users", "Anonymous"];
  const PERMISSION_AREAS = [
    { id: "app", label: "Application", total: 34, items: [
      ["Application", "Enables access to the Plenix application."],
      ["Home", "Enables the home button."],
      ["Settings", "Enables access to application management settings."],
      ["Multiple files", "Enables various actions across multiple assets simultaneously."],
      ["Table columns", "Enables the customization of search result columns in table view."],
      ["Download original", "Enables downloading of the original asset."],
      ["Edit Users and Groups", "Allows user to create and edit users or groups."],
      ["My account area", "Enables a page that edits user data and updates passwords."],
      ["Category navigation", "Enables the Category Navigation in the sidebar."],
      ["View AI agent", "Enables AI Chat Agent."]
    ] },
    { id: "asset", label: "Asset management", total: 65, items: [
      ["Upload files", "Enables the upload of assets."],
      ["Delete", "Enables removal of an asset, and the option to remove the original."],
      ["Share", "Enables the share button. Parent of email, embed, publish and social media share."],
      ["Watermark", "System-wide watermarking across all assets."],
      ["Approve/Reject Workflow", "Enables Approve/Reject options."],
      ["Edit all assets", "Allow editing and viewing of any asset."],
      ["Permissions", "Enables permission alteration for media assets."],
      ["Media editor", "Enables access to Media Editor."],
      ["View faceprofiles", "View Asset Face Profile Detection."]
    ] },
    { id: "library", label: "Library management", total: 18, items: [
      ["Create new collection", "Allows creation of new collections."],
      ["Create new library", "Allows creation of new libraries."],
      ["Pick any library", "Asset can be added to any library."],
      ["Add files to Bookmarks", "Enables users to add files to their Bookmarks."]
    ] },
    { id: "api", label: "Programming API", total: 4, items: [["Programming API", "Enables REST API access to this catalog."]] }
  ];
  const EMAIL_TEMPLATES = [
    ["Administrative notification when assets have been published", "admintemplate.html"],
    ["Confirmation email sent to user after assets have been successfully shared", "usertemplate.html"],
    ["Email sent when a user shares an asset", "sharetemplate.html"],
    ["Email sent when assets are added or removed from a collection", "collection-count-modified.html"],
    ["Email sent when assets are approved", "collection-assets-approved.html"],
    ["Email sent when assets are rejected", "collection-assets-rejected.html"],
    ["Email sent when a user is added to a collection", "collection-add-new-follower.html"],
    ["Asset renewal notification", "assetrenew.html"]
  ];
  const CATALOG_PARAMETERS = [
    ["Application site title", "sitetitle", "Plenix Library", "text"],
    ["Allow login by Email Address", "allowloginbyemail", "true"],
    ["CDN prefix", "cdn_prefix", "\u2014"],
    ["AWS bucket", "awsbucket", "\u2014"],
    ["AI: Enable Content Creation", "ai_create_enabled", "true"],
    ["AI: OpenAI Model (AI Chat)", "gpt-model", "gpt-4o"],
    ["AI: Ollama Server", "ollama-url", "https://ollama.example.com"],
    ["AI: Translate Server", "ai_translate_server", "http://translate.example.com:48991"],
    ["AI: Vectorizer Server", "ai_vectorizer_server", "http://vectorizer.example.com:48981"],
    ["Face: Faceprofile Server", "faceprofileserver", "\u2014"],
    ["Catalog Asset Edit Groups", "catalogasseteditgroups", "administrators users"],
    ["Admin Catalog Asset View Groups", "catalogassetviewgroups", "administrators"]
  ];
  const CATALOG_TOTAL = "roughly 130";
  const SERVER_STATUS = [["Node ID", "plenix003"], ["Cluster ID", "plenix-cluster"], ["Catalog ID", "finder/catalog"]];
  const VERSIONS = [["Plenix Server", "11.2218"], ["Plenix", "11.375"], ["Elasticsearch (Lucene)", "5.5.4"], ["Groovy", "2.4.11"], ["Velocity Engine", "2.3"], ["Apache PDFBox", "2.0.6"]];
  const LOG_PATH = "/opt/plenix/logs/server.log";
  const DB_TABLES = ["asset", "category", "user", "group", "order", "library", "librarycollection", "customization", "entityperson", "faceprofilegroup", "module", "permission"];
  const DB_COLUMNS = ["AI tags", "Album", "Asset title", "Asset type", "Artist", "Categories", "Created on"];
  const DB_ROWS = [
    ["gold, ornate", "\u2014", "korban_stamp_010", "Image", "\u2014", "Korban Stamp", "Aug 18, 2026"],
    ["certificate, church", "\u2014", "certificate_christ_the_teacher", "3D Models", "\u2014", "Certificates", "Aug 15, 2026"],
    ["cross, gold", "Website Assets", "Coptic_Cross_Gold", "Image", "Mina Fahim", "Crosses", "Aug 10, 2026"],
    ["baptism, sacrament", "\u2014", "Certificate_Baptism_v3", "Documents", "\u2014", "Certificate - Baptism", "Aug 8, 2026"]
  ];
  const DB_TOTAL = { records: "4,546", pages: 227 };
  const CUSTOMIZATIONS = [
    ["Supporting table", "Entity source type", "searchcategory", "9/1/26, 11:30 AM"],
    ["Module", "Person", "\u2014", "9/1/26, 11:30 AM"],
    ["Supporting table", "Start category ID", "desktopsyncfolder", "9/1/26, 11:30 AM"],
    ["Module", "Document", "\u2014", "9/1/26, 11:30 AM"],
    ["Module", "Media profile", "\u2014", "9/1/26, 11:30 AM"],
    ["Module", "Categories", "\u2014", "9/1/26, 11:30 AM"]
  ];
  const SCHEDULED = [
    ["Auto assign Entity Image", "autoassignproxyimage.html", "Runs: 2,736 \xB7 Repeats every 1m"],
    ["Publish assets", "publishassets.html", "Runs: 541 \xB7 Repeats every 5m"],
    ["Send collection chat notifications", "notifycollectionchatnotifications.html", "Runs: 541 \xB7 Repeats every 5m"],
    ["Run media conversions", "runconversions.html", "Runs: 550 \xB7 Repeats every 5m"],
    ["Transcript audio", "autotranscode.html", "Runs: 541 \xB7 Repeats every 5m"],
    ["Semantic Index New", "semanticscan.html", "Runs: 270 \xB7 Repeats every 10m"],
    ["Import hot folders", "importhotfolders.html", "Runs: 270 \xB7 Repeats every 10m"],
    ["Check permission changes", "checkpermissionhistory.html", "Runs: 277 \xB7 Repeats every 10m"],
    ["Apply Google Vision", "applygooglevision.html", "Runs: 180 \xB7 Repeats every 15m"],
    ["Apply Google Transcode", "applygoogletranscode.html", "Runs: 180 \xB7 Repeats every 15m"],
    ["Asset metadata notification", "assetmetadata.html", "Runs: 30 \xB7 Repeats every 30m"]
  ];
  const NAV = [
    { heading: "Content", collapsible: true, items: [
      { id: "properties", label: "Properties", icon: "settings-general" },
      { id: "fields", label: "Fields", icon: "settings-metadata" },
      { id: "asset-types", label: "Asset types", icon: "settings-categories" },
      { id: "hot-folders", label: "Hot folders", icon: "folder-add" },
      { id: "transcoding", label: "Transcoding", icon: "settings-camera" }
    ] },
    { heading: "People & Access", collapsible: true, items: [
      { id: "users", label: "Users", icon: "settings-users" },
      { id: "groups", label: "Groups", icon: "briefcase" },
      { id: "permissions", label: "Site permissions", icon: "settings-permissions" }
    ] },
    { heading: "System", collapsible: true, items: [
      { id: "email-templates", label: "Email templates", icon: "settings-email" },
      { id: "catalog-parameters", label: "Catalog parameters", icon: "settings-catalog" },
      { id: "server", label: "Server", icon: "settings-maintenance" },
      { id: "database", label: "Database", icon: "settings-database" },
      { id: "customizations", label: "Customizations", icon: "settings-customize" },
      { id: "scheduler", label: "Scheduler", icon: "settings-scheduler" }
    ] }
  ];
  const IDS = NAV.reduce((all, g) => all.concat(g.items.map((i) => i.id)), []);
  const ScreenKey = React2.createContext("");
  const Screen = ({ id, title, description, actions, children }) => /* @__PURE__ */ React2.createElement(ScreenKey.Provider, { value: id }, /* @__PURE__ */ React2.createElement(plenixPlatform.RecordPage.Header, { title, description, actions, headingLevel: 2 }), children);
  const Section$1 = ({ stateKey, ...p }) => {
    const screen = React2.useContext(ScreenKey);
    return /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsSection, { stateKey: screen + ":" + (stateKey || p.title), ...p });
  };
  const Planned = ({ title, children }) => /* @__PURE__ */ React2.createElement(Section$1, { title, collapsible: true, defaultExpanded: false, description: children }, /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, { title: "Not configured yet" }));
  const CountNote = ({ shown, total, what }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Showing ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, shown), " of ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, total), " " + what);
  function useAct() {
    const toast = plenixPlatform.useToast();
    return (label, tone = "success") => () => toast.show(label, { tone });
  }
  const B = ({ icon, label, tone, act, variant, ...rest }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon, variant, onClick: act(label, tone), ...rest }, label);
  const bt = ({ icon, label, tone, act, variant, ...rest }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { key: label, size: "sm", icon, variant, onClick: act(label, tone), ...rest }, label);
  const Bar = ({ children, label }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar, { label }, children);
  const Search = ({ value, onChange, label }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { width: "lg", push: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.SearchField, { value, onChange: (e) => onChange(e.target.value), onClear: () => onChange(""), label, placeholder: label + "..." }));
  const match$1 = (q, row) => !q || row.some((c) => String(c || "").toLowerCase().indexOf(q.toLowerCase()) >= 0);
  const rowsOf = (list, keys) => list.map((r, i) => Object.assign({ id: i }, ...keys.map((k, j) => ({ [k]: r[j] }))));
  const switchCol = (title) => ({ title, field: "on", kind: "center", sortable: false, render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Switch, { label: r.name + ": " + title, labelHidden: true, checked: r.on, onChange: () => r.toggle() }) });
  function useToggles(list) {
    const [on, setOn] = React2.useState(list.map((r) => r[1]));
    return list.map((r, i) => ({ id: i, name: r[0], on: on[i], toggle: () => setOn(on.map((v, j) => j === i ? !v : v)) }));
  }
  const facts = (label, list) => /* @__PURE__ */ React2.createElement(
    plenixPlatform.Table,
    {
      label,
      headerMenu: false,
      data: list.map(([k, v], i) => ({ id: i, name: k, value: v })),
      columns: [{ title: "Name", field: "name", kind: "name", rowLabel: true, sortable: false }, { title: "Value", field: "value", kind: "data", sortable: false }]
    }
  );
  const Actions = ({ act, save = "Save", del = "Delete" }) => /* @__PURE__ */ React2.createElement(plenixPlatform.ActionBar, { label: "Form actions" }, del ? /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "danger-secondary", onClick: act(del, "warning") }, del) : null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", variant: "primary" }, save));
  const Edited = React2.createContext(() => {
  });
  const Form = ({ act, saved, children }) => {
    const mark = React2.useContext(Edited), id = React2.useId();
    const onChange = (e) => {
      const t = e.target;
      if (t && (t.type === "search" || t.closest && t.closest('[role="search"]'))) return;
      mark(id, true);
    };
    return /* @__PURE__ */ React2.createElement("form", { noValidate: true, onChange, onSubmit: (e) => {
      e.preventDefault();
      mark(id, false);
      act(saved, "success")();
    } }, children);
  };
  const PATH = { autoCapitalize: "off", spellCheck: false, data: true };
  function Properties({ act }) {
    const [p, setP] = React2.useState(PROPERTIES);
    const [views, setViews] = React2.useState(RESULT_VIEWS.map((v) => ({ value: v, label: v })));
    const text = (k, extra) => ({ value: p[k], onChange: (e) => setP({ ...p, [k]: e.target.value }), name: k, autoComplete: "off", ...extra });
    const sw = (k, label, description) => /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label, description }, /* @__PURE__ */ React2.createElement(plenixPlatform.Switch, { label, labelHidden: true, checked: p[k], onChange: (e) => setP({ ...p, [k]: e.target.checked }) }));
    const enabled = useToggles(ENABLED_FOR), viewAll = useToggles(VIEW_ALL), editAll = useToggles(EDIT_ALL);
    const roleCol = { title: "Group / Role", field: "name", kind: "name", frozen: true, filter: true };
    return /* @__PURE__ */ React2.createElement(Form, { act, saved: "Save" }, /* @__PURE__ */ React2.createElement(Screen, { id: "properties", title: "Files properties", description: "Module-level configuration for the asset table." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Properties" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Default record label", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { ...text("defaultRecordLabel", PATH) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Tab ordering", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { width: "sm", ...text("tabOrdering", { inputMode: "numeric", data: true }) })), sw("enableUploading", "Enable uploading"), sw("enableOnSearch", "Enable on search"), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Default results view", layout: "inline" }, /* @__PURE__ */ React2.createElement(
      plenixPlatform.Combobox,
      {
        options: views,
        value: p.defaultResultsView,
        onChange: (v) => setP({ ...p, defaultResultsView: v }),
        creatable: true,
        onCreate: (t) => {
          const v = t.trim();
          if (v) {
            setViews(views.concat({ value: v, label: v }));
            setP({ ...p, defaultResultsView: v });
          }
        }
      }
    )), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Default sort field", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { width: "lg", ...text("defaultSortField", { placeholder: "Default sort field", ...PATH }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Upload source path", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { ...text("uploadSourcepath", { inputMode: "url", ...PATH }) }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Folders and search", description: "How folders become entities, and how the AI search reads a query." }, sw("autoCreateEntities", "Auto create entities"), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Root folder path", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { ...text("rootFolderPath", { placeholder: "Root folder path", inputMode: "url", ...PATH }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Auto create at folder level", layout: "inline", info: "Scan deep A/B/C, B = 2" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { width: "sm", ...text("autoCreateAtFolderLevel", { inputMode: "numeric", enterKeyHint: "done", data: true }) })), sw("semanticEnabled", "Semantic search"), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "AI search prompt", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { ...text("aiSearchPrompt", { placeholder: "AI search prompt" }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "AI search contains", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { ...text("aiSearchContains", { placeholder: "AI search contains" }) }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Enabled for", collapsible: true, description: "Groups and roles that can use this module." }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Enabled for", data: enabled, columns: [roleCol, switchCol("Enabled")] })), /* @__PURE__ */ React2.createElement(Section$1, { title: "Actions", collapsible: true, defaultExpanded: false, description: "The actions of this module and the roles that may run them." }, /* @__PURE__ */ React2.createElement(
      plenixPlatform.DataGrid,
      {
        label: "Actions",
        data: rowsOf(ACTIONS, ["name", "roles"]),
        columns: [{ title: "Action", field: "name", kind: "name", frozen: true, filter: true }, { title: "Roles", field: "roles", filter: true }, { title: "Status", field: "status", kind: "center", sortable: false, render: () => /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: "success" }, "Active") }]
      }
    )), /* @__PURE__ */ React2.createElement(Section$1, { title: "View all folders", collapsible: true, defaultExpanded: false, description: "Groups and roles that can view all folders for this module." }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "View all folders", data: viewAll, columns: [roleCol, switchCol("View all")] })), /* @__PURE__ */ React2.createElement(Section$1, { title: "Edit all folders", collapsible: true, defaultExpanded: false, description: "Groups and roles that can edit all folders for this module." }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Edit all folders", data: editAll, columns: [roleCol, switchCol("Edit all")] })), /* @__PURE__ */ React2.createElement(Actions, { act })));
  }
  function Fields({ act }) {
    const [q, setQ] = React2.useState("");
    const rows = rowsOf(FIELDS.filter((r) => match$1(q, r)), ["name", "id2", "type"]);
    return /* @__PURE__ */ React2.createElement(Screen, { id: "fields", title: "Fields", description: "The metadata field registry for assets \u2014 every field's name, internal ID, and type." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "New field" }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label: "Field name", htmlFor: "system-new-field" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "sm", wrap: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { id: "system-new-field", name: "newFieldName", autoComplete: "off", enterKeyHint: "done", width: "lg", placeholder: "New field name..." }), /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Add field", act })))), /* @__PURE__ */ React2.createElement(Section$1, { title: "All fields", description: FIELD_TOTAL + " fields in the registry" }, /* @__PURE__ */ React2.createElement(Bar, { label: "Field actions" }, /* @__PURE__ */ React2.createElement(Search, { value: q, onChange: setQ, label: "Search " + FIELD_TOTAL + " fields" })), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Fields", data: rows, empty: "No fields match", columns: [{ title: "Field name", field: "name", kind: "name", frozen: true, filter: true }, { title: "ID", field: "id2", kind: "data" }, { title: "Field type", field: "type", kind: "data", filter: "list" }] }), /* @__PURE__ */ React2.createElement(CountNote, { shown: rows.length, total: FIELD_TOTAL, what: "fields" })), /* @__PURE__ */ React2.createElement(Planned, { title: "Edit views" }, "Configure which fields appear on the asset edit form, and in what order."), /* @__PURE__ */ React2.createElement(Planned, { title: "Application views" }, "Configure which fields appear in application-wide views such as search results and tables."));
  }
  function AssetTypes({ act }) {
    const [types, setTypes] = React2.useState(ASSET_TYPES.map(([name, ext, order]) => ({ name, ext, paths: "", order: String(order) })));
    const edit = (i, k) => (e) => setTypes(types.map((t, j) => j === i ? { ...t, [k]: e.target.value } : t));
    return /* @__PURE__ */ React2.createElement(Form, { act, saved: "Save changes" }, /* @__PURE__ */ React2.createElement(
      Screen,
      {
        id: "asset-types",
        title: "Asset types",
        description: "The file-format categories assets are classified under, used to route transcoding and preview generation.",
        actions: /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Add asset type", act })
      },
      types.map((t, i) => /* @__PURE__ */ React2.createElement(Section$1, { key: i, title: ASSET_TYPES[i][0], stateKey: "type-" + i, collapsible: true, defaultExpanded: i === 0 }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Name", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "name", autoComplete: "off", width: "lg", value: t.name, onChange: edit(i, "name") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Extensions", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "extensions", autoComplete: "off", autoCapitalize: "off", spellCheck: false, data: true, value: t.ext, onChange: edit(i, "ext") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Paths", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "paths", autoComplete: "off", placeholder: "Paths", value: t.paths, onChange: edit(i, "paths"), ...PATH })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Ordering", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "ordering", inputMode: "numeric", autoComplete: "off", enterKeyHint: "done", width: "sm", data: true, value: t.order, onChange: edit(i, "order") })))),
      /* @__PURE__ */ React2.createElement(Actions, { act, save: "Save changes" })
    ));
  }
  function HotFolders({ act }) {
    return /* @__PURE__ */ React2.createElement(
      Screen,
      {
        id: "hot-folders",
        title: "Hot folders",
        description: "Watched folders that are automatically scanned and imported as assets.",
        actions: /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React2.createElement(B, { icon: "schedule", label: "Schedule importing", act }), /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Add hot folder", act }))
      },
      /* @__PURE__ */ React2.createElement(Section$1, { title: "Watched folders" }, HOT_FOLDERS.map((f) => /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { key: f.name, label: /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "folder" }), /* @__PURE__ */ React2.createElement("span", null, f.name), f.enabled ? /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: "success" }, "Enabled") : null), description: f.meta }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", iconOnly: true, icon: "pencil", label: "Edit " + f.name, onClick: act("Edit", "info") }))))
    );
  }
  function Transcoding({ act }) {
    return /* @__PURE__ */ React2.createElement(
      Screen,
      {
        id: "transcoding",
        title: "Transcoding",
        description: "Conversion presets generated for each uploaded asset, by media type.",
        actions: /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Add new conversion", act })
      },
      /* @__PURE__ */ React2.createElement(Section$1, { title: "Preset configuration" }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Conversion presets", data: rowsOf(CONVERSIONS, ["name", "file", "system", "onImport", "media"]), columns: [
        { title: "Conversion", field: "name", kind: "name", frozen: true, filter: true },
        { title: "Generated file", field: "file", kind: "data" },
        { title: "System defined", field: "system", filter: "list" },
        { title: "On import", field: "onImport", filter: "list" },
        { title: "Media type", field: "media", filter: "list" }
      ] })),
      /* @__PURE__ */ React2.createElement(Planned, { title: "Publishing" }, "Configure which conversions are pushed to publishing targets.")
    );
  }
  function Users({ act }) {
    const [q, setQ] = React2.useState("");
    return /* @__PURE__ */ React2.createElement(Screen, { id: "users", title: "Users", description: "Manage user accounts and view login activity.", actions: /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Create user", act }) }, /* @__PURE__ */ React2.createElement(Section$1, { title: "All users" }, /* @__PURE__ */ React2.createElement(Bar, { label: "User actions" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, { role: "group", "aria-label": "Maintenance" }, bt({ icon: "import", label: "Import / Export", act }), bt({ icon: "refresh", label: "Reindex", tone: "info", act })), /* @__PURE__ */ React2.createElement(Search, { value: q, onChange: setQ, label: "Search users" })), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Users", empty: "No users match", data: rowsOf(USERS.filter((r) => match$1(q, r)), ["user", "name", "email", "role", "created", "login"]), columns: [
      { title: "Username", field: "user", kind: "name", frozen: true, filter: true },
      { title: "Name", field: "name", filter: true },
      { title: "Email", field: "email", filter: true },
      { title: "Role", field: "role", kind: "center", filter: "list", render: (r) => r.role ? /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: "active" }, r.role) : "\u2014" },
      { title: "Created", field: "created", kind: "data" },
      { title: "Last login", field: "login", kind: "data" }
    ] })));
  }
  function Groups({ act }) {
    const [names, setNames] = React2.useState(GROUPS$1);
    return /* @__PURE__ */ React2.createElement(Form, { act, saved: "Save changes" }, /* @__PURE__ */ React2.createElement(
      Screen,
      {
        id: "groups",
        title: "Groups",
        description: "Groups a user can be assigned to. Permissions are configured separately under Site permissions.",
        actions: /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Add group", act })
      },
      GROUPS$1.map((g, i) => /* @__PURE__ */ React2.createElement(Section$1, { key: g, title: g, collapsible: true, defaultExpanded: i === 0 }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Name", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "name", autoComplete: "off", width: "lg", value: names[i], onChange: (e) => setNames(names.map((n, j) => j === i ? e.target.value : n)) })))),
      /* @__PURE__ */ React2.createElement(Actions, { act, save: "Save changes", del: "Delete group" })
    ));
  }
  function Permissions({ act }) {
    const [role, setRole] = React2.useState("Administrators");
    const [area, setArea] = React2.useState("Show all");
    const [checked, setChecked] = React2.useState(() => Object.fromEntries(PERMISSION_AREAS.flatMap((a) => a.items.map((it) => [a.id + ":" + it[0], true]))));
    const areas = PERMISSION_AREAS.filter((a) => area === "Show all" || a.label === area);
    return /* @__PURE__ */ React2.createElement(Form, { act, saved: "Save" }, /* @__PURE__ */ React2.createElement(Screen, { id: "permissions", title: "Site permissions", description: "Individually named permissions, grouped by area, assigned per role." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Role", description: "Choose the role to configure. The permissions below apply only to that role; View narrows the list to one area." }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Role", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "role", value: role, onChange: (e) => setRole(e.target.value) }, PERMISSION_ROLES.concat("+ Add new role").map((r) => /* @__PURE__ */ React2.createElement("option", { key: r }, r)))), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "View", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "view", value: area, onChange: (e) => setArea(e.target.value) }, ["Show all"].concat(PERMISSION_AREAS.map((a) => a.label)).map((r) => /* @__PURE__ */ React2.createElement("option", { key: r }, r))))), areas.map((a, i) => /* @__PURE__ */ React2.createElement(Section$1, { key: a.id, title: a.label, stateKey: a.id, collapsible: true, defaultExpanded: i === 0, description: /* @__PURE__ */ React2.createElement(React2.Fragment, null, "Showing ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, a.items.length), " of ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, a.total), " permissions for " + role) }, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, a.items.map((it) => {
      const k = a.id + ":" + it[0];
      return /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { key: k, name: k, label: it[0], description: it[1], checked: !!checked[k], onChange: (e) => setChecked({ ...checked, [k]: e.target.checked }) });
    })))), /* @__PURE__ */ React2.createElement(Actions, { act })));
  }
  function EmailTemplates({ act }) {
    return /* @__PURE__ */ React2.createElement(Screen, { id: "email-templates", title: "Email templates", description: "The notification emails the catalog sends, and the template file behind each one." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Templates" }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Email templates", data: rowsOf(EMAIL_TEMPLATES, ["name", "file"]), columns: [
      { title: "Template", field: "name", kind: "name", frozen: true, filter: true },
      { title: "File", field: "file", kind: "data" },
      { title: "Actions", field: "actions", kind: "center", sortable: false, render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", "aria-label": "Edit " + r.name, onClick: act("Edit " + r.file, "info") }, "Edit") }
    ] })));
  }
  function CatalogParameters({ act }) {
    const [q, setQ] = React2.useState("");
    const rows = CATALOG_PARAMETERS.filter((r) => match$1(q, r));
    return /* @__PURE__ */ React2.createElement(Form, { act, saved: "Save changes" }, /* @__PURE__ */ React2.createElement(Screen, { id: "catalog-parameters", title: "Catalog parameters", description: "Catalog-wide configuration keys \u2014 storage, AI providers, and access defaults." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Parameters", description: CATALOG_TOTAL + " catalog settings" }, /* @__PURE__ */ React2.createElement(Bar, { label: "Parameter actions" }, /* @__PURE__ */ React2.createElement(Search, { value: q, onChange: setQ, label: "Search catalog settings" })), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Catalog parameters", empty: "No settings match", data: rows.map(([label, id, value, kind]) => ({ id, label, key: id, value, kind })), columns: [
      { title: "Setting", field: "label", kind: "name", frozen: true, filter: true },
      { title: "Key", field: "key", kind: "data", filter: true },
      { title: "Value", field: "value", render: (r) => r.kind !== "text" ? /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, r.value) : r.value }
    ] }), /* @__PURE__ */ React2.createElement(CountNote, { shown: rows.length, total: CATALOG_TOTAL, what: "catalog settings" })), /* @__PURE__ */ React2.createElement(plenixPlatform.ActionBar, { label: "Form actions" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", variant: "primary" }, "Save changes"))));
  }
  function Server({ act }) {
    return /* @__PURE__ */ React2.createElement(Screen, { id: "server", title: "Server", description: "Database cluster status, software versions, and application logs." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Server status" }, facts("Server status", SERVER_STATUS), /* @__PURE__ */ React2.createElement(plenixPlatform.ButtonGroup, { label: "Server status actions" }, /* @__PURE__ */ React2.createElement(B, { icon: "refresh", label: "Clear cached data", tone: "info", act }), /* @__PURE__ */ React2.createElement(B, { icon: "database", label: "Change Elasticsearch database master", tone: "info", act }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Data management" }, /* @__PURE__ */ React2.createElement(plenixPlatform.ButtonGroup, { label: "Data management" }, /* @__PURE__ */ React2.createElement(B, { icon: "refresh", label: "Reindex", tone: "info", act }), /* @__PURE__ */ React2.createElement(B, { icon: "alert", label: "View mapping conflicts", tone: "info", act }), /* @__PURE__ */ React2.createElement(B, { icon: "list-bullets", label: "View basic mappings", tone: "info", act }), /* @__PURE__ */ React2.createElement(B, { icon: "import", label: "Reload sets", tone: "info", act }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Database snapshots", collapsible: true, defaultExpanded: false, description: "Snapshots are used by Elasticsearch to store and restore database data." }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsRow, { label: "Snapshots" }, /* @__PURE__ */ React2.createElement(B, { icon: "snapshot", label: "View snapshots", tone: "info", act }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Data entities", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React2.createElement(plenixPlatform.ButtonGroup, { label: "Data entities" }, /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "Create", act }), /* @__PURE__ */ React2.createElement(B, { icon: "save-doc", label: "Save all modules", act }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Versions", collapsible: true, defaultExpanded: false, description: "The full dependency list runs to 100+ jars." }, facts("Versions", VERSIONS), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", onClick: act("View all", "info") }, "View all"))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Logs", collapsible: true, defaultExpanded: false, description: "Where the application writes its log." }, /* @__PURE__ */ React2.createElement(plenixPlatform.CodeBlock, null, LOG_PATH)));
  }
  function Database({ act }) {
    const [table, setTable] = React2.useState("asset");
    const [q, setQ] = React2.useState("");
    const [expanded, setExpanded] = React2.useState(false);
    const rows = DB_ROWS.filter((r) => match$1(q, r)).map((r, i) => Object.assign({ id: i }, ...DB_COLUMNS.map((c, j) => ({ ["c" + j]: r[j] }))));
    const columns = DB_COLUMNS.map((c, j) => ({ title: c, field: "c" + j, frozen: j === 0, filter: true, kind: c === "Asset title" ? "name" : c === "Created on" ? "data" : void 0 }));
    const grid = (label) => /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label, data: rows, columns, empty: "No records match" });
    return /* @__PURE__ */ React2.createElement(Screen, { id: "database", title: "Database", description: "Browse, edit, import, or export any underlying data grid.", actions: /* @__PURE__ */ React2.createElement(B, { icon: "add", label: "New table", tone: "info", act }) }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Table" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Table", layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Combobox, { options: DB_TABLES.map((t) => ({ value: t, label: t })), value: table, onChange: setTable }))), /* @__PURE__ */ React2.createElement(Section$1, { title: "Records in " + table, stateKey: "records", description: /* @__PURE__ */ React2.createElement(React2.Fragment, null, "Found ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, DB_TOTAL.records), " records \xB7 page ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, "1"), " of ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, DB_TOTAL.pages)) }, /* @__PURE__ */ React2.createElement(Bar, { label: "Record actions" }, bt({ icon: "add", label: "Add new", act }), /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, { role: "group", "aria-label": "Transfer" }, bt({ icon: "refresh", label: "Reindex", tone: "info", act }), bt({ icon: "import", label: "Import", act }), bt({ icon: "export", label: "Export", tone: "info", act })), bt({ icon: "doc-text", label: "Export text", tone: "info", act }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", iconOnly: true, icon: "close", label: "Reset settings", onClick: act("Settings reset", "info") }), /* @__PURE__ */ React2.createElement(plenixPlatform.Menu, { label: "Delete", trigger: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "danger-secondary", icon: "trash", caret: true }, "Delete") }, /* @__PURE__ */ React2.createElement(plenixPlatform.MenuItem, { icon: "trash", danger: true, onSelect: act("Delete " + DB_TOTAL.records + " records", "warning") }, "Delete " + DB_TOTAL.records + " records"), /* @__PURE__ */ React2.createElement(plenixPlatform.MenuItem, { icon: "trash", danger: true, onSelect: act("Delete table", "warning") }, "Delete table")), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "expand", onClick: () => setExpanded(true) }, "Expand"), /* @__PURE__ */ React2.createElement(Search, { value: q, onChange: setQ, label: "Search" })), grid("Table: " + table), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "end" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", iconEnd: "chevron-right", onClick: act("Forward", "info") }, "Next page")), /* @__PURE__ */ React2.createElement(plenixPlatform.Dialog, { open: expanded, onClose: () => setExpanded(false), title: "Table: " + table, icon: "expand", size: "full" }, grid("Table: " + table + ", expanded"))), /* @__PURE__ */ React2.createElement(Planned, { title: "Customize fields" }, "Configure the fields available on this table \u2014 the same editor as Files > Fields, scoped to this table."), /* @__PURE__ */ React2.createElement(Planned, { title: "Customize views" }, "Configure how records in this table are displayed in lists and edit forms."), /* @__PURE__ */ React2.createElement(Planned, { title: "Elastic system info" }, "Raw Elasticsearch mapping and index info for this table."));
  }
  function Customizations({ act }) {
    const rows = rowsOf(CUSTOMIZATIONS, ["type", "name", "modules", "date"]);
    const [sel, setSel] = React2.useState(rows.map((r) => r.id));
    return /* @__PURE__ */ React2.createElement(Screen, { id: "customizations", title: "Customizations", description: "Track configuration changes across modules, and export or import them between environments." }, /* @__PURE__ */ React2.createElement(Section$1, { title: "Changes" }, /* @__PURE__ */ React2.createElement(Bar, { label: "Customization actions" }, bt({ icon: "refresh", label: "Scan for changes", tone: "info", act }), /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, { role: "group", "aria-label": "Transfer" }, bt({ icon: "export", label: "Export", tone: "info", act }), bt({ icon: "import", label: "Import", act })), bt({ icon: "trash", label: "Delete", tone: "warning", variant: "danger-secondary", act })), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Customizations", selectable: true, selected: sel, onSelectionChange: setSel, data: rows, columns: [
      { title: "Type", field: "type", filter: "list" },
      { title: "Customization", field: "name", kind: "name", filter: true },
      { title: "Modules", field: "modules", kind: "data" },
      { title: "Date", field: "date", kind: "data" }
    ] })));
  }
  function Scheduler({ act }) {
    return /* @__PURE__ */ React2.createElement(
      Screen,
      {
        id: "scheduler",
        title: "Scheduler",
        description: "Recurring background tasks, the events that trigger them, and the scripts they run.",
        actions: /* @__PURE__ */ React2.createElement(B, { icon: "refresh", label: "Refresh", tone: "info", act })
      },
      /* @__PURE__ */ React2.createElement(Section$1, { title: "Scheduled tasks" }, /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Scheduled tasks", data: rowsOf(SCHEDULED, ["name", "path", "status"]), columns: [
        { title: "Name", field: "name", kind: "name", frozen: true, filter: true },
        { title: "Path", field: "path", kind: "data" },
        { title: "Status", field: "status", filter: "list" }
      ] })),
      /* @__PURE__ */ React2.createElement(Planned, { title: "Events" }, "Events that trigger scripts to run, such as an asset upload or a metadata change."),
      /* @__PURE__ */ React2.createElement(Planned, { title: "Scripts" }, "Groovy scripts that scheduled tasks and events run.")
    );
  }
  const SECTIONS = {
    properties: Properties,
    fields: Fields,
    "asset-types": AssetTypes,
    "hot-folders": HotFolders,
    transcoding: Transcoding,
    users: Users,
    groups: Groups,
    permissions: Permissions,
    "email-templates": EmailTemplates,
    "catalog-parameters": CatalogParameters,
    server: Server,
    database: Database,
    customizations: Customizations,
    scheduler: Scheduler
  };
  const legacy = (hash) => IDS.indexOf(hash.slice(1)) >= 0 ? "/" + hash.slice(1) : null;
  function useSection() {
    const loc = plenixPlatform.useScreenLocation({ app: "assets-system", legacy });
    const section = IDS.indexOf(loc.parts[0]) >= 0 ? loc.parts[0] : "properties";
    const go = (id) => {
      if (IDS.indexOf(id) < 0) return;
      loc.navigate([id]);
    };
    return [section, go];
  }
  function Content({ section }) {
    const act = useAct();
    const [edited, setEdited] = React2.useState({});
    const mark = React2.useCallback((id, on) => setEdited((d) => !!d[id] === on ? d : { ...d, [id]: on }), []);
    plenixPlatform.useUnsavedGuard(Object.keys(edited).some((k) => edited[k]), "Your settings changes have not been saved.", { keeps: () => true });
    return /* @__PURE__ */ React2.createElement(Edited.Provider, { value: mark }, /* @__PURE__ */ React2.createElement(plenixPlatform.SettingsLayout, null, IDS.map((id) => {
      const S = SECTIONS[id];
      return /* @__PURE__ */ React2.createElement("div", { key: id, hidden: section !== id }, /* @__PURE__ */ React2.createElement(S, { act }));
    })));
  }
  function SystemSettingsPage() {
    const [section, go] = useSection();
    return /* @__PURE__ */ React2.createElement(AssetPage, { title: "System settings", current: "system", sideNav: /* @__PURE__ */ React2.createElement(plenixPlatform.NavPane, { as: "div", label: "Settings sections", title: "System settings", header: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "home", href: "index.html" }, "Home"), footer: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "arrow-left", href: "index.html" }, "Back to Asset Manager") }, /* @__PURE__ */ React2.createElement(plenixPlatform.NavList, { label: "Settings sections", value: section, onSelect: go, groups: NAV })) }, /* @__PURE__ */ React2.createElement(Content, { section }));
  }
  const Section = ({ title, icon, defaultOpen = true, children }) => /* @__PURE__ */ React2.createElement(plenixPlatform.CollapsibleSection, { title, icon, defaultExpanded: defaultOpen, headingLevel: null }, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs" }, children));
  const AddLink = ({ label, onClick }) => /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", icon: "plus", onClick }, label));
  function PinnedList({ items, setItems, kind, icon, label, active, onOpen, limit, filter = "" }) {
    const [more, setMore] = React2.useState(false);
    const q = filter.trim().toLowerCase();
    const sorted = items.filter((it) => it.pinned).concat(items.filter((it) => !it.pinned));
    const shown = q ? sorted.filter((it) => it.name.toLowerCase().indexOf(q) >= 0) : limit && !more ? sorted.slice(0, limit) : sorted;
    const hiddenCount = sorted.length - (limit ? Math.min(limit, sorted.length) : sorted.length);
    const pin = (name) => setItems(items.map((it) => it.name === name ? { ...it, pinned: !it.pinned } : it));
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
      plenixPlatform.NavList,
      {
        label,
        value: active,
        onSelect: (id) => onOpen(kind, id),
        items: shown.map((it) => ({ id: it.name, label: it.name, icon, count: it.count, pinned: it.pinned, onPin: pin }))
      }
    ), limit && !q && hiddenCount > 0 ? /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.ShowMore, { expanded: more, count: hiddenCount, onToggle: setMore })) : null);
  }
  function Sidebar({ mode = "browse", active, onOpen, onAdd, onFiles, filesOpen, saved = SAVED_SEARCHES, onRemoveSaved }) {
    const [cats, setCats] = React2.useState(CATEGORIES$2);
    const [colls, setColls] = React2.useState(COLLECTIONS$1);
    const [filter, setFilter] = React2.useState("");
    return /* @__PURE__ */ React2.createElement(plenixPlatform.NavPane, { label: mode === "search" ? "Search filters" : "Categories and collections", title: "Asset Manager", rail: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail.Item, { icon: "home", label: "Home", onClick: () => onOpen("categories", "All categories") }), /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail.Item, { icon: "folder-open", label: "Files", pressed: !!filesOpen, onClick: onFiles }), /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail.Item, { icon: "grid-2x2", label: "Categories", pressed: mode === "browse" && active === "All categories", onClick: () => onOpen("categories", "All categories") }), /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail.Item, { icon: "briefcase", label: "Collections", onClick: () => onOpen("collections", "All collections") })), footer: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "gear", href: "settings-system.html" }, "System settings"), header: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "home", onClick: () => onOpen("categories", "All categories") }, "Home"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "folder-open", pressed: !!filesOpen, onClick: onFiles }, "Files")) }, /* @__PURE__ */ React2.createElement(Section, { title: "Categories", icon: "grid-2x2" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Filter categories", hideLabel: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { value: filter, onChange: (e) => setFilter(e.target.value), placeholder: "Filter categories..." })), /* @__PURE__ */ React2.createElement(AddLink, { label: "Add category", onClick: () => onAdd("newCatModal") }), /* @__PURE__ */ React2.createElement(PinnedList, { items: cats, setItems: setCats, kind: "categories", icon: "folder", label: "Categories", active, onOpen, limit: mode === "browse" ? CATEGORIES_SHOWN : 0, filter })), /* @__PURE__ */ React2.createElement(Section, { title: "Collections", icon: "briefcase" }, /* @__PURE__ */ React2.createElement(AddLink, { label: "Add collection", onClick: () => onAdd("newCollectionModal") }), /* @__PURE__ */ React2.createElement(PinnedList, { items: colls, setItems: setColls, kind: "collections", icon: "briefcase", label: "Collections", active, onOpen })), mode === "browse" ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(Section, { title: "Saved searches", icon: "search" }, /* @__PURE__ */ React2.createElement(AddLink, { label: "Add saved search", onClick: () => onAdd("saveSearchModal") }), /* @__PURE__ */ React2.createElement(
      plenixPlatform.NavList,
      {
        label: "Saved searches",
        value: active,
        onSelect: (id) => onOpen("saved", id),
        items: saved.map((s) => ({ id: s.name, label: s.name, icon: "doc-search", actions: onRemoveSaved ? /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", iconOnly: true, icon: "close", label: "Remove " + s.name, onClick: () => onRemoveSaved(s.name) }) : null }))
      }
    )), /* @__PURE__ */ React2.createElement(Section, { title: "Recent imports", icon: "clock" }, /* @__PURE__ */ React2.createElement(plenixPlatform.NavList, { label: "Recent imports", value: active, onSelect: (id) => onOpen("import", id), items: RECENT_IMPORTS.map(([d, n]) => ({ id: d, label: d, icon: "download-alt", count: n })) })), /* @__PURE__ */ React2.createElement(Section, { title: "Trash", icon: "trash-simple", defaultOpen: false }, /* @__PURE__ */ React2.createElement(plenixPlatform.NavList, { label: "Trash", value: active, onSelect: (id) => onOpen("trash", id), items: TRASH.map(([d, n]) => ({ id: d, label: d, icon: "trash-simple", count: n })) }))) : null);
  }
  const Accordion = ({ title, defaultOpen = true, children }) => /* @__PURE__ */ React2.createElement(plenixPlatform.CollapsibleSection, { title, defaultExpanded: defaultOpen, headingLevel: 3 }, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-u-pt-stack-xs" }, children));
  const Row = ({ label, children, info }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label, layout: "inline", labelWidth: "sm", info }, children);
  function Tags({ initial, act }) {
    const [tags, setTags] = React2.useState(initial);
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.TagList, { label: "Tags" }, tags.map((t) => /* @__PURE__ */ React2.createElement(plenixPlatform.Tag, { key: t, onRemove: () => setTags(tags.filter((x) => x !== t)), removeLabel: "Remove tag " + t }, t)), /* @__PURE__ */ React2.createElement(plenixPlatform.TagInput, { onAdd: (t) => {
      const v = t.toLowerCase();
      if (tags.indexOf(v) < 0) setTags(tags.concat(v));
    }, placeholder: "Add a tag", "aria-label": "Add a tag" })), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "sparkle", onClick: act("AI tagging", "info") }, "AI tagging")));
  }
  function Downloads({ groups, act }) {
    return groups.map((g) => /* @__PURE__ */ React2.createElement(Accordion, { key: g.title, title: g.title }, /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList, { label: g.title, stacked: true }, g.items.map(([icon, name, size]) => /* @__PURE__ */ React2.createElement(
      plenixPlatform.ActivityList.Item,
      {
        key: name,
        leading: /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: icon, size: "lg" }),
        title: name,
        meta: /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data", className: "plx-u-leading-16px" }, size),
        actions: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", iconOnly: true, icon: "download-arrow", label: "Download " + name, onClick: act("Downloading " + name + "...", "success") })
      }
    )))));
  }
  function InspectorFooter({ act }) {
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "close-2", onClick: act("Cancel", "info") }, "Cancel"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "primary", icon: "save-doc", onClick: act("Save", "success") }, "Save"));
  }
  function EditBar({ onFields }) {
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "xs", className: "plx-u-mb-stack-sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "info-circle", onClick: onFields }, "Fields"));
  }
  function CategoryInspector({ collection = false, act, onDialog }) {
    const c = CATEGORY_DETAIL;
    const name0 = collection ? COLLECTION_DETAIL.name : c.name;
    const [f, setF] = React2.useState({ name: name0, parent: c.parent, order: c.order, color: c.color, copyright: c.copyright, rights: c.rights, rating: c.rating, description: c.description, style: "", material: "", origin: "" });
    React2.useEffect(() => {
      setF((x) => ({ ...x, name: name0 }));
    }, [name0]);
    const text = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Preview, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: collection ? "briefcase" : "folder", size: "lg" }), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data", className: "plx-u-leading-16px" }, collection ? COLLECTION_DETAIL.count : c.count)), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Title", hideLabel: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { emphasis: true, value: f.name, onChange: (e) => setF({ ...f, name: e.target.value }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Tabs, { variant: "folder", label: "Details", items: [
      { value: "details", label: "Details", content: /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(EditBar, { act, onFields: () => onDialog("editFieldsCatModal") }), /* @__PURE__ */ React2.createElement(Accordion, { title: "General" }, /* @__PURE__ */ React2.createElement(Row, { label: "Name" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "name", ...text("name") })), /* @__PURE__ */ React2.createElement(Row, { label: "Parent" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "parent", ...text("parent") }, c.parents.map((p) => /* @__PURE__ */ React2.createElement("option", { key: p }, p)))), /* @__PURE__ */ React2.createElement(Row, { label: "Display order" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "displayOrder", type: "number", ...text("order") })), /* @__PURE__ */ React2.createElement(Row, { label: "Color" }, /* @__PURE__ */ React2.createElement(plenixPlatform.ColorPicker, { palette: "category", label: "Color", size: "sm", value: f.color, onChange: (h) => setF({ ...f, color: h }) })), /* @__PURE__ */ React2.createElement(Row, { label: "Copyright" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "copyright", placeholder: "Copyright...", ...text("copyright") })), /* @__PURE__ */ React2.createElement(Row, { label: "Rights" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "rights", ...text("rights") }, c.rightsOptions.map((p) => /* @__PURE__ */ React2.createElement("option", { key: p }, p)))), /* @__PURE__ */ React2.createElement(Row, { label: "Rating" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Rating, { value: f.rating, onChange: (v) => setF({ ...f, rating: v }), label: "Rating" })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Description" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "description", rows: 2, ...text("description") }))), /* @__PURE__ */ React2.createElement(Accordion, { title: "Tags" }, /* @__PURE__ */ React2.createElement(Tags, { initial: c.tags, act })), /* @__PURE__ */ React2.createElement(Accordion, { title: "Stats" }, /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList, null, c.stats.map(([k, v]) => /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { key: k, label: k, data: true }, v)))), /* @__PURE__ */ React2.createElement(Accordion, { title: "Permissions", defaultOpen: false }, /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList, null, c.permissions.map(([k, v]) => /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { key: k, label: k }, v)))), /* @__PURE__ */ React2.createElement(Accordion, { title: "Custom fields", defaultOpen: false }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Category-specific fields added to assets"), c.customFields.map(([k, ph]) => /* @__PURE__ */ React2.createElement(Row, { key: k, label: k }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: k.toLowerCase(), placeholder: ph, ...text(k.toLowerCase()) }))), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", icon: "plus", onClick: act("Add field", "success") }, "Add field")))) },
      { value: "downloads", label: "Downloads", content: /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(Downloads, { groups: CATEGORY_DOWNLOADS, act })) }
    ] }));
  }
  function AssetDetail({ asset, act, onDialog, onPreview }) {
    const [f, setF] = React2.useState({ title: asset.name, file: asset.file, status: asset.status, cat: asset.cat, copyright: "", rights: "", rating: 0, description: "" });
    const text = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(
      plenixPlatform.Preview,
      {
        as: "button",
        onClick: onPreview,
        title: "Click to enlarge",
        "aria-label": "Preview " + asset.name,
        topStart: /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: asset.typeIcon, size: "md", label: asset.badge }),
        bottomEnd: /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "expand", size: "sm" })
      },
      /* @__PURE__ */ React2.createElement("img", { className: "plx-preview__media", src: asset.thumb, alt: "" })
    ), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Title", hideLabel: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { emphasis: true, value: f.title, onChange: (e) => setF({ ...f, title: e.target.value }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "secondary" }, asset.cat)), /* @__PURE__ */ React2.createElement(plenixPlatform.Tabs, { variant: "folder", label: "Asset details", items: [
      { value: "details", label: "Details", content: /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(EditBar, { act, onFields: () => onDialog("editFieldsFileModal") }), /* @__PURE__ */ React2.createElement(Accordion, { title: "File" }, /* @__PURE__ */ React2.createElement(Row, { label: "File name" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "fileName", ...text("file") })), /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList, null, /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { label: "File size", data: true }, asset.size), /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { label: "Format" }, asset.fmt), /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { label: "Dimensions", data: true }, asset.dims), /* @__PURE__ */ React2.createElement(plenixPlatform.PropertyList.Item, { label: "Added", data: true }, asset.date))), /* @__PURE__ */ React2.createElement(Accordion, { title: "General" }, /* @__PURE__ */ React2.createElement(Row, { label: "Edit status" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "editStatus", ...text("status") }, ASSET_STATUSES.map((p) => /* @__PURE__ */ React2.createElement("option", { key: p }, p)))), /* @__PURE__ */ React2.createElement(Row, { label: "Category" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "category", ...text("cat") })), /* @__PURE__ */ React2.createElement(Row, { label: "Copyright" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "copyright", placeholder: "e.g. Diocese of LA", ...text("copyright") })), /* @__PURE__ */ React2.createElement(Row, { label: "Usage rights" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "usageRights", ...text("rights") }, /* @__PURE__ */ React2.createElement("option", { value: "" }, "-- Select --"), USAGE_RIGHTS.map((p) => /* @__PURE__ */ React2.createElement("option", { key: p }, p)))), /* @__PURE__ */ React2.createElement(Row, { label: "Rating" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Rating, { value: f.rating, onChange: (v) => setF({ ...f, rating: v }), label: "Rating" })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Description" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "description", rows: 2, placeholder: "Add description...", ...text("description") }))), /* @__PURE__ */ React2.createElement(Accordion, { title: "Tags" }, /* @__PURE__ */ React2.createElement(Tags, { initial: asset.tags, act }))) },
      { value: "downloads", label: "Downloads", content: /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(Downloads, { groups: [{ title: "Source file", items: [[asset.typeIcon, asset.file, asset.size + " \xB7 " + asset.fmt]] }].concat(ASSET_DOWNLOADS), act })) },
      { value: "versions", label: "Versions", content: /* @__PURE__ */ React2.createElement(plenixPlatform.ActivityList, { label: "Versions" }, VERSIONS$1.map((v) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.ActivityList.Item,
        {
          key: v.label,
          title: v.current ? /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "xs", wrap: true }, v.label, /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: "info", icon: "check" }, "Current version")) : v.label,
          meta: v.date + " \xB7 " + v.user,
          actions: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", onClick: act("Download", "info") }, "Download"), v.current ? null : /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", onClick: act("Restore", "info") }, "Restore"))
        }
      ))) }
    ] }));
  }
  function AssetInspector({ asset, act, onDialog, onPreview }) {
    if (!asset) return /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, { size: "inline", icon: "doc-text" }, "Click an asset to see details");
    return /* @__PURE__ */ React2.createElement(AssetDetail, { key: asset.id, asset, act, onDialog, onPreview });
  }
  const SORT_FIELDS = [
    "Name",
    "Description",
    "Tags",
    "Rating",
    "Keywords",
    "Category path",
    "File size",
    "Dimensions",
    "Date created",
    "Date modified",
    "Camera model",
    "Aperture",
    "Color profile",
    "GPS location",
    "Edit status",
    "Owner"
  ];
  const CATEGORY_FIELDS$1 = [
    ["name", "text", true],
    ["description", "textarea", true],
    ["categorypath", "text", true],
    ["parentid", "text", true],
    ["displayorder", "number", true],
    ["color", "text", true],
    ["owner", "text", true],
    ["viewgroups", "list", true],
    ["editgroups", "list", false],
    ["visibility", "list", true],
    ["defaultstatus", "list", false],
    ["defaultcopyright", "text", false],
    ["defaulttags", "list", false],
    ["totalassets", "number", true],
    ["storageused", "number", false],
    ["datecreated", "date", true],
    ["datemodified", "date", true]
  ];
  const ASSET_FIELDS$1 = [
    ["name", "text", true],
    ["assettitle", "text", true],
    ["sourcepath", "text", true],
    ["filesize", "number", true],
    ["fileformat", "text", true],
    ["width", "number", true],
    ["height", "number", true],
    ["description", "textarea", true],
    ["category", "list dropdown", true],
    ["editstatus", "list dropdown", true],
    ["assetaddeddate", "date", true],
    ["assetmodificationdate", "date", true]
  ];
  const CATEGORY_FORM_FIELDS = [{ name: "Category name", type: "Text" }, { name: "Description", type: "Text area" }, { name: "Tags", type: "Tags" }];
  const ADDABLE_FIELDS = [
    "Archive source path",
    "Auto assigned media",
    "Categories",
    "Category ID",
    "Color",
    "Custom Field 1",
    "Custom Field 2",
    "Display order",
    "Parent category",
    "Permissions",
    "Source path",
    "Thumbnail"
  ];
  const CATEGORIES$1 = [
    ["Banner icon", 24],
    ["Bookshelf", 18],
    ["Borders - Arch", 31],
    ["Borders - Circular", 42],
    ["Branding - Churches", 28],
    ["Branding - CYC", 5],
    ["Branding - Diakonia", 15],
    ["Certificate - Baptism", 89],
    ["Certificate - Masters", 47],
    ["Clergy - Metropolitan Serapion", 62],
    ["Clergy - Pope Shenouda III", 210],
    ["Clergy - Pope Tawadros II", 45],
    ["Cross - Traditional", 78],
    ["Dome", 33],
    ["Embroideries", 156],
    ["Fonts", 18]
  ];
  const TAGS = [["cross", 312], ["certificate", 189], ["clergy", 156], ["branding", 87], ["border", 74], ["ornament", 53], ["coptic", 42]];
  const TYPE_GROUPS = [
    { name: "Photos", count: 3855, types: [["PSD", 287], ["PNG", 1640], ["JPG", 1890], ["TIFF", 14]] },
    { name: "Vectors", count: 504, types: [["AI", 412], ["SVG", 22], ["DWG", 38]] },
    { name: "Documents", count: 145, types: [["PDF", 92], ["INDD", 53]] },
    { name: "Videos", count: 60, types: [] },
    { name: "Fonts", count: 18, types: [] },
    { name: "3D Models", count: 4, types: [] }
  ];
  const DEFAULT_CATEGORIES = CATEGORIES$1.map((c) => c[0]);
  const DEFAULT_TYPES = ["PSD", "PNG", "JPG", "AI", "Videos"];
  const DEFAULT_TAGS = [];
  const EMPTY_TEXT = "No data";
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const has = (q, text) => !q || String(text).toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;
  const Counted = ({ name, count }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { as: "span", justify: "between", grow: true }, /* @__PURE__ */ React2.createElement("span", null, name), /* @__PURE__ */ React2.createElement(plenixPlatform.Count, { value: fmt(count) }));
  const Footer$1 = ({ onCancel, children }) => /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: onCancel }, "Cancel"), children);
  function useDraft(open, value, initial) {
    const [own, setOwn] = React2.useState(initial);
    const current = value !== void 0 ? value : own;
    const [draft, setDraft] = React2.useState(current);
    React2.useEffect(() => {
      if (open) setDraft(current);
    }, [open]);
    const commit = () => {
      setOwn(draft);
      return draft;
    };
    return [draft, setDraft, commit];
  }
  const toggleIn = (arr, name, on) => on ? arr.indexOf(name) >= 0 ? arr : arr.concat(name) : arr.filter((v) => v !== name);
  function NewCatDialog({ open, onClose, onSave }) {
    const toast = plenixPlatform.useToast();
    const uid = React2.useId().replace(/[^a-zA-Z0-9]/g, "");
    const [form, setForm] = React2.useState({ name: "", description: "" });
    const [tags, setTags] = React2.useState([]);
    const [color, setColor] = React2.useState(plenixPlatform.CATEGORY_COLORS[0]);
    const [fieldsOpen, setFieldsOpen] = React2.useState(false);
    const text = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });
    const addTag = (t) => {
      if (tags.indexOf(t) < 0) setTags(tags.concat(t));
    };
    const save = (e) => {
      e.preventDefault();
      toast.show("Save", { tone: "success" });
      if (onSave) onSave({ name: form.name, description: form.description, tags, color });
    };
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Dialog, { open, onClose, title: "Categories \u203A Add New", icon: "grid-2x2", size: "lg", footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { icon: "circle-info", onClick: () => setFieldsOpen(true) }, "Fields"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", form: uid, variant: "primary" }, "Save")) }, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "form", id: uid, noValidate: true, onSubmit: save }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Category name" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "categoryName", placeholder: "Enter category name...", ...text("name") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Description" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "description", placeholder: "Optional description...", ...text("description") })), /* @__PURE__ */ React2.createElement("div", { className: "plx-field plx-field--stacked" }, /* @__PURE__ */ React2.createElement("div", { className: "plx-field__head" }, /* @__PURE__ */ React2.createElement("label", { className: "plx-field__label", htmlFor: uid + "tags" }, "Tags")), /* @__PURE__ */ React2.createElement("div", { className: "plx-field__control" }, /* @__PURE__ */ React2.createElement(plenixPlatform.TagList, null, tags.map((t) => /* @__PURE__ */ React2.createElement(plenixPlatform.Tag, { key: t, onRemove: () => setTags(tags.filter((x) => x !== t)) }, t)), /* @__PURE__ */ React2.createElement(plenixPlatform.TagInput, { id: uid + "tags", name: "tags", placeholder: "Add a tag", "aria-describedby": uid + "tags-d", onAdd: addTag })), /* @__PURE__ */ React2.createElement("div", { className: "plx-field__description", id: uid + "tags-d" }, "Hit ", /* @__PURE__ */ React2.createElement(plenixPlatform.Kbd, null, "enter"), " or ", /* @__PURE__ */ React2.createElement(plenixPlatform.Kbd, null, "return"), " key after typing each tag"))), /* @__PURE__ */ React2.createElement("div", { className: "plx-field plx-field--stacked" }, /* @__PURE__ */ React2.createElement("div", { className: "plx-field__head" }, /* @__PURE__ */ React2.createElement("span", { className: "plx-field__label", id: uid + "color" }, "Category color")), /* @__PURE__ */ React2.createElement("div", { className: "plx-field__control" }, /* @__PURE__ */ React2.createElement(plenixPlatform.ColorPicker, { palette: "category", "aria-labelledby": uid + "color", label: null, value: color, onChange: setColor })))), /* @__PURE__ */ React2.createElement(EditFieldsCatDialog, { open: fieldsOpen, onClose: () => setFieldsOpen(false) }));
  }
  function NameDialog({ open, onClose, onSave, title, icon, nameLabel, nameField, placeholder, saved }) {
    const toast = plenixPlatform.useToast();
    const uid = React2.useId().replace(/[^a-zA-Z0-9]/g, "");
    const [form, setForm] = React2.useState({ name: "", description: "" });
    const text = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) });
    const save = (e) => {
      e.preventDefault();
      toast.show(saved, { tone: "success" });
      if (onSave) onSave({ ...form });
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title,
        icon,
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { type: "submit", form: uid, variant: "primary" }, "Save"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "form", id: uid, noValidate: true, onSubmit: save }, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: nameLabel }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: nameField, placeholder, ...text("name") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Description" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "description", placeholder: "Optional description...", ...text("description") })))
    );
  }
  function SaveSearchDialog(props) {
    return /* @__PURE__ */ React2.createElement(NameDialog, { ...props, title: "Save search", icon: "save", nameLabel: "Search name", nameField: "searchName", placeholder: "e.g. High-res crosses", saved: "Search saved" });
  }
  function NewCollectionDialog(props) {
    return /* @__PURE__ */ React2.createElement(NameDialog, { ...props, title: "Collections \u203A Add New", icon: "briefcase-plus", nameLabel: "Collection name", nameField: "collectionName", placeholder: "Enter collection name...", saved: "Collection created" });
  }
  function AdvancedSortDialog({ open, onClose, value, onApply }) {
    const toast = plenixPlatform.useToast();
    const [draft, setDraft, commit] = useDraft(open, value, { field: "Name", direction: "asc" });
    const [q, setQ] = React2.useState("");
    const fields = SORT_FIELDS.filter((f) => has(q, f));
    const apply = () => {
      const next = commit();
      toast.show("Sorted by " + next.field + " (" + (next.direction === "asc" ? "Ascending" : "Descending") + ")", { tone: "success" });
      if (onApply) onApply(next);
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title: "Advanced sort",
        icon: "sort",
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: apply }, "Apply"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Sort by field" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "sortByField", type: "search", placeholder: "Search fields...", value: q, onChange: (e) => setQ(e.target.value) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", maxHeight: "md" }, fields.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.RadioGroup, { "aria-label": "Sort by field", name: "advSortField", value: draft.field, onChange: (f) => setDraft({ ...draft, field: f }), options: fields.map((f) => ({ value: f, label: f })) }) : /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, null, EMPTY_TEXT)), /* @__PURE__ */ React2.createElement(
        plenixPlatform.RadioGroup,
        {
          label: "Direction",
          name: "advSortDir",
          layout: "row",
          value: draft.direction,
          onChange: (d) => setDraft({ ...draft, direction: d }),
          options: [{ value: "asc", label: "Ascending" }, { value: "desc", label: "Descending" }]
        }
      ))
    );
  }
  function FieldVisibilityDialog({ open, onClose, value, onSave, title, description, fields }) {
    const initial = React2.useMemo(() => Object.fromEntries(fields.map((f) => [f[0], f[2]])), [fields]);
    const [draft, setDraft, commit] = useDraft(open, value, initial);
    const [q, setQ] = React2.useState("");
    const [order, setOrder] = React2.useState([]);
    const rows = fields.filter((f) => has(q, f[0])).map((f) => ({ id: f[0], name: f[0], type: f[1] })).sort((a, b) => {
      const at = (id) => order.includes(id) ? order.indexOf(id) : order.length + fields.findIndex((f) => f[0] === id);
      return at(a.id) - at(b.id);
    });
    const save = () => {
      const next = commit();
      if (onSave) onSave(next);
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title,
        icon: "fields",
        description,
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: save }, "Save"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SearchField, { name: "searchFields", label: "Search fields", placeholder: "Search fields...", value: q, onChange: (e) => setQ(e.target.value), onClear: () => setQ("") }), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: title, data: rows, empty: EMPTY_TEXT, headerMenu: false, movableRows: true, onRowMove: (records) => setOrder(records.map((record) => record.id)), columns: [
        { title: "Order", field: "handle", kind: "icon", icon: "menu-lines", rowHandle: true, sortable: false, render: () => /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "menu-lines", size: "sm" }) },
        { title: "Field", field: "name", kind: "name", sortable: false },
        { title: "Type", field: "type", kind: "data", sortable: false },
        { title: "Show", field: "show", kind: "center", align: "right", headerAlign: "right", sortable: false, render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Switch, { label: "Show " + r.name, labelHidden: true, checked: !!draft[r.name], onChange: (e) => setDraft({ ...draft, [r.name]: e.target.checked }) }) }
      ] }))
    );
  }
  function EditFieldsCatDialog(props) {
    return /* @__PURE__ */ React2.createElement(
      FieldVisibilityDialog,
      {
        ...props,
        title: "Edit category fields",
        fields: CATEGORY_FIELDS$1,
        description: "Choose which category attributes to show in the detail panel. Drag to reorder."
      }
    );
  }
  function EditFieldsFileDialog(props) {
    return /* @__PURE__ */ React2.createElement(
      FieldVisibilityDialog,
      {
        ...props,
        title: "Edit asset fields",
        fields: ASSET_FIELDS$1,
        description: "Choose which metadata fields to show in the detail panel. Drag to reorder."
      }
    );
  }
  function CatEditFieldsDialog({ open, onClose, onDone }) {
    const toast = plenixPlatform.useToast();
    const [fields, setFields] = React2.useState(CATEGORY_FORM_FIELDS);
    const [forAll, setForAll] = React2.useState(true);
    const addable = ADDABLE_FIELDS.filter((n) => !fields.some((f) => f.name === n));
    const remove = (name) => {
      setFields(fields.filter((f) => f.name !== name));
      toast.show("Field removed", { tone: "info" });
    };
    const add = (e) => {
      const n = e.target.value;
      if (n) setFields(fields.concat({ name: n, type: "\u2014" }));
    };
    const done = () => {
      if (onDone) onDone({ fields, forAllUsers: forAll });
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title: "Edit fields",
        icon: "fields",
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: done }, "Done"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "end" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "editForAllUsers", label: "Edit for all users", checked: forAll, onChange: (e) => setForAll(e.target.checked) })), /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Edit fields", data: fields.map((f) => ({ id: f.name, ...f })), empty: EMPTY_TEXT, headerMenu: false, movableRows: true, onRowMove: setFields, columns: [
        { title: "Order", field: "handle", kind: "icon", icon: "menu-lines", rowHandle: true, sortable: false, render: () => /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "menu-lines", size: "sm" }) },
        { title: "Field", field: "name", kind: "name", sortable: false },
        { title: "Type", field: "type", kind: "data", sortable: false },
        { title: "Remove", field: "remove", kind: "center", align: "right", headerAlign: "right", sortable: false, render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", iconOnly: true, icon: "close", label: "Remove " + r.name, onClick: () => remove(r.name) }) }
      ] }), /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "addAnotherField", "aria-label": "Add another field", value: "", onChange: add }, /* @__PURE__ */ React2.createElement("option", { value: "" }, "Add another field"), addable.map((n) => /* @__PURE__ */ React2.createElement("option", { key: n }, n))))
    );
  }
  function CheckListPanel({ items, selected, onChange, searchName, searchLabel }) {
    const [q, setQ] = React2.useState("");
    const shown = items.filter((it) => has(q, it[0]));
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SearchField, { name: searchName, label: searchLabel, placeholder: searchLabel + "...", value: q, onChange: (e) => setQ(e.target.value), onClear: () => setQ("") }), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", maxHeight: "md", role: "group", "aria-label": searchLabel.replace("Search", "Filter by") }, shown.length ? shown.map(([name, count]) => /* @__PURE__ */ React2.createElement(
      plenixPlatform.Checkbox,
      {
        key: name,
        label: /* @__PURE__ */ React2.createElement(Counted, { name, count }),
        checked: selected.indexOf(name) >= 0,
        onChange: (e) => onChange(toggleIn(selected, name, e.target.checked))
      }
    )) : /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, null, EMPTY_TEXT)));
  }
  const CategoriesPanel = ({ selected, onChange }) => /* @__PURE__ */ React2.createElement(CheckListPanel, { items: CATEGORIES$1, selected, onChange, searchName: "searchCategories", searchLabel: "Search categories" });
  const TagsPanel = ({ selected, onChange }) => /* @__PURE__ */ React2.createElement(CheckListPanel, { items: TAGS, selected, onChange, searchName: "searchTags", searchLabel: "Search tags" });
  function TypePanel({ selected, onChange }) {
    const [collapsed, setCollapsed] = React2.useState({});
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", maxHeight: "md", role: "group", "aria-label": "Filter by Type" }, TYPE_GROUPS.map((g) => {
      const names = g.types.map((t) => t[0]);
      const on = names.length ? names.filter((n) => selected.indexOf(n) >= 0).length : selected.indexOf(g.name) >= 0 ? 1 : 0;
      const all = names.length ? on === names.length : on === 1;
      const setGroup = (checked) => onChange((names.length ? names : [g.name]).reduce((acc, n) => toggleIn(acc, n, checked), selected));
      const isCollapsed = !!collapsed[g.name];
      return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { key: g.name, gap: "xs" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { grow: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { label: /* @__PURE__ */ React2.createElement(Counted, { name: g.name, count: g.count }), checked: all, indeterminate: !all && on > 0, onChange: (e) => setGroup(e.target.checked) })), names.length ? /* @__PURE__ */ React2.createElement(
        plenixPlatform.Button,
        {
          size: "xs",
          variant: "ghost",
          iconOnly: true,
          icon: isCollapsed ? "chevron-right" : "chevron-down",
          label: "Show or hide " + g.name + " types",
          expanded: !isCollapsed,
          onClick: () => setCollapsed({ ...collapsed, [g.name]: !isCollapsed })
        }
      ) : null), names.length && !isCollapsed ? /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", indent: true }, g.types.map(([name, count]) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.Checkbox,
        {
          key: name,
          label: /* @__PURE__ */ React2.createElement(Counted, { name, count }),
          checked: selected.indexOf(name) >= 0,
          onChange: (e) => onChange(toggleIn(selected, name, e.target.checked))
        }
      ))) : null);
    }));
  }
  function FilterDialog({ open, onClose, value, onApply, initial, title, icon, Panel }) {
    const [draft, setDraft, commit] = useDraft(open, value, initial);
    const apply = () => {
      const next = commit();
      if (onApply) onApply(next);
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title,
        icon,
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: apply }, "Apply"))
      },
      /* @__PURE__ */ React2.createElement(Panel, { selected: draft, onChange: setDraft })
    );
  }
  function CategoriesFilterDialog(props) {
    return /* @__PURE__ */ React2.createElement(FilterDialog, { ...props, title: "Filter by Categories", icon: "grid-2x2", initial: DEFAULT_CATEGORIES, Panel: CategoriesPanel });
  }
  function TypeFilterDialog(props) {
    return /* @__PURE__ */ React2.createElement(FilterDialog, { ...props, title: "Filter by Type", icon: "image-b", initial: DEFAULT_TYPES, Panel: TypePanel });
  }
  function TagsFilterDialog(props) {
    return /* @__PURE__ */ React2.createElement(FilterDialog, { ...props, title: "Filter by Tags", icon: "tags", initial: DEFAULT_TAGS, Panel: TagsPanel });
  }
  function MergedFilterDialog({ open, onClose, tab = "categories", value, onApply }) {
    const given = value && { categories: value.categories || DEFAULT_CATEGORIES, type: value.type || DEFAULT_TYPES, tags: value.tags || DEFAULT_TAGS };
    const [draft, setDraft, commit] = useDraft(open, given, { categories: DEFAULT_CATEGORIES, type: DEFAULT_TYPES, tags: DEFAULT_TAGS });
    const [current, setCurrent] = React2.useState(tab);
    React2.useEffect(() => {
      if (open) setCurrent(tab);
    }, [open, tab]);
    const set = (k) => (v) => setDraft({ ...draft, [k]: v });
    const apply = () => {
      const next = commit();
      if (onApply) onApply(next);
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        title: "Filters",
        icon: "settings-preferences",
        footer: /* @__PURE__ */ React2.createElement(Footer$1, { onCancel: onClose }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: apply }, "Apply"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Tabs, { variant: "contained", label: "Filters", value: current, onChange: setCurrent, items: [
        { value: "categories", label: "Categories", content: /* @__PURE__ */ React2.createElement(CategoriesPanel, { selected: draft.categories, onChange: set("categories") }) },
        { value: "type", label: "Type", content: /* @__PURE__ */ React2.createElement(TypePanel, { selected: draft.type, onChange: set("type") }) },
        { value: "tags", label: "Tags", content: /* @__PURE__ */ React2.createElement(TagsPanel, { selected: draft.tags, onChange: set("tags") }) }
      ] })
    );
  }
  const DIALOGS$4 = {
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
  const FOLDERS = [
    { id: "all", label: "All", children: [
      { id: "digital-assets", label: "Digital Assets", children: [
        { id: "borders", label: "Borders", children: ["Arch", "Banner", "Circular", "Divider", "Linear", "Page"].map((l) => ({ id: "borders-" + l.toLowerCase(), label: l })) },
        { id: "branding", label: "Branding", children: ["Churches", "CYC", "Diakonia"].map((l) => ({ id: "branding-" + l.toLowerCase(), label: l })) },
        { id: "certificates", label: "Certificates" },
        { id: "clergy", label: "Clergy" },
        { id: "crosses", label: "Crosses" },
        { id: "fonts", label: "Fonts" }
      ] },
      { id: "documents", label: "Documents", children: [{ id: "manuals", label: "Manuals" }, { id: "templates", label: "Templates" }] },
      { id: "facial-profiles", label: "Facial Profiles" },
      { id: "users", label: "Users" }
    ] }
  ];
  const DEFAULT_FOLDER = "digital-assets";
  const CATEGORIES = [
    "Banner icon",
    "Bookshelf",
    "Borders - Arch",
    "Borders - Banner",
    "Borders - Circular",
    "Borders - Divider",
    "Borders - Linear",
    "Borders - Page",
    "Branding - Churches",
    "Branding - CYC",
    "Branding - Diakonia",
    "Certificates",
    "Clergy",
    "Covers",
    "Cross - Traditional",
    "Crosses",
    "Dome",
    "Embroideries",
    "Fonts",
    "Galloons",
    "Korban Stamp",
    "Ornamental Elements",
    "Presentation Folders"
  ];
  const TYPE_FILTERS = [
    { value: "all", label: "All" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "3d", label: "3D" },
    { value: "document", label: "Doc" }
  ];
  const META_GROUPS$1 = [
    ["General", "all", ["*Name", "*Description", "*Tags", "Keywords", "*Rating", "Edit status", "Language", "Version", "Summary"]],
    ["Categorization", "all", ["*Category", "Category ID", "Parent category", "Category path", "Display order", "Asset type", "Classification"]],
    ["Ownership & Rights", "all", [
      "Owner",
      "Creator|EXIF: Artist",
      "Copyright|EXIF: Copyright",
      "Copyright Notice|IPTC: CopyrightNotice",
      "Rights Usage Terms|XMP: UsageTerms",
      "License",
      "Permissions",
      "Author",
      "Created by",
      "Modified by"
    ]],
    ["Dates", "all", [
      "Date Created|EXIF: DateTimeOriginal",
      "Date Modified|EXIF: ModifyDate",
      "Date Digitized|EXIF: CreateDate",
      "GPS Date/Time|EXIF: GPSDateStamp",
      "Import date",
      "Publish date",
      "Expiration date"
    ]],
    ["File properties", "all", [
      "File name",
      "File type",
      "MIME type",
      "File size",
      "Source path",
      "Archive source path",
      "File URL",
      "Data type",
      "Thumbnail",
      "Checksum / MD5"
    ]],
    ["Dimensions & Resolution", "image,video", [
      "Width|EXIF: ImageWidth",
      "Height|EXIF: ImageHeight",
      "DPI / Resolution|EXIF: XResolution",
      "Resolution Unit|EXIF: ResolutionUnit",
      "Orientation|EXIF: Orientation",
      "Pixel aspect ratio"
    ]],
    ["Camera & Lens", "image,video", [
      "Camera Make|EXIF: Make",
      "Camera Model|EXIF: Model",
      "Camera Serial #|EXIF: SerialNumber",
      "Lens Type|EXIF: LensModel",
      "Lens Make|EXIF: LensMake",
      "Lens Serial #|EXIF: LensSerialNumber",
      "Firmware|EXIF: Software"
    ]],
    ["Exposure & Shooting", "image", [
      "Focal Length|EXIF: FocalLength",
      "Focal Length (35mm)|EXIF: FocalLengthIn35mmFormat",
      "Aperture|EXIF: FNumber",
      "Max Aperture|EXIF: MaxApertureValue",
      "Shutter Speed|EXIF: ExposureTime",
      "ISO|EXIF: ISO",
      "Exposure Program|EXIF: ExposureProgram",
      "Exposure Mode|EXIF: ExposureMode",
      "Exposure Comp.|EXIF: ExposureCompensation",
      "Metering Mode|EXIF: MeteringMode",
      "Flash|EXIF: Flash",
      "Flash Comp.|EXIF: FlashCompensation",
      "White Balance|EXIF: WhiteBalance",
      "Scene Type|EXIF: SceneCaptureType",
      "Light Source|EXIF: LightSource",
      "Subject Distance|EXIF: SubjectDistance",
      "Focus Mode|EXIF: FocusMode",
      "Digital Zoom|EXIF: DigitalZoomRatio",
      "Sharpness|EXIF: Sharpness",
      "Contrast|EXIF: Contrast",
      "Saturation|EXIF: Saturation",
      "Brightness|EXIF: BrightnessValue"
    ]],
    ["Color & Image", "image", [
      "Color Space|EXIF: ColorSpace",
      "Color Profile|EXIF: ICCProfileName",
      "Color type",
      "Bit Depth|EXIF: BitsPerSample",
      "Compression|EXIF: Compression",
      "Photometric Interp.|EXIF: PhotometricInterpretation",
      "Image Unique ID|EXIF: ImageUniqueID"
    ]],
    ["Location (GPS)", "image,video", [
      "GPS Latitude|EXIF: GPSLatitude",
      "GPS Longitude|EXIF: GPSLongitude",
      "GPS Altitude|EXIF: GPSAltitude",
      "GPS Speed|EXIF: GPSSpeed",
      "GPS Direction|EXIF: GPSImgDirection",
      "GPS Area Info|EXIF: GPSAreaInformation"
    ]],
    ["IPTC / XMP", "image", [
      "Headline|IPTC: Headline",
      "Caption|IPTC: Caption-Abstract",
      "By-line|IPTC: By-line",
      "By-line Title|IPTC: By-lineTitle",
      "Credit|IPTC: Credit",
      "Source|IPTC: Source",
      "Contact Info|IPTC: Contact",
      "Object Name|IPTC: ObjectName",
      "Category Code|IPTC: Category",
      "Supplemental Cat.|IPTC: SupplementalCategories",
      "Urgency|IPTC: Urgency",
      "Instructions|IPTC: SpecialInstructions",
      "Subject Code|XMP: Subject",
      "Scene Code|IPTC: Scene",
      "Intellectual Genre|IPTC: IntellectualGenre"
    ]],
    ["IPTC location", "image", [
      "Sub-location|IPTC: Sub-location",
      "City|IPTC: City",
      "State / Province|IPTC: Province-State",
      "Country|IPTC: Country-PrimaryLocationName",
      "Country Code|IPTC: Country-PrimaryLocationCode"
    ]],
    ["Video \u2014 Stream", "video", [
      "Duration|FFmpeg: Duration",
      "Frame Rate|FFmpeg: r_frame_rate",
      "Video Codec|FFmpeg: codec_name",
      "Codec Profile|FFmpeg: profile",
      "Video Bitrate|FFmpeg: bit_rate",
      "Video resolution",
      "Aspect Ratio|FFmpeg: display_aspect_ratio",
      "Pixel Format|FFmpeg: pix_fmt",
      "Color Primaries|FFmpeg: color_primaries",
      "Color Transfer|FFmpeg: color_transfer",
      "Rotation|FFmpeg: rotate",
      "Audio Codec|FFmpeg: audio codec_name",
      "Audio Bitrate|FFmpeg: audio bit_rate",
      "Sample Rate|FFmpeg: sample_rate",
      "Audio Channels|FFmpeg: channels",
      "Audio Language|FFmpeg: language",
      "Subtitle Tracks|FFmpeg: subtitle streams"
    ]],
    ["Video \u2014 Container Tags", "video", [
      "Title|MP4: moov/udta \xA9nam",
      "Artist|MP4: \xA9ART",
      "Album|MP4: \xA9alb",
      "Comment|MP4: \xA9cmt",
      "Genre|MP4: \xA9gen / gnre",
      "Year|MP4: \xA9day",
      "Encoder|MP4: \xA9too",
      "MKV Title|Matroska: TagName",
      "MKV Date|Matroska: DateUTC",
      "MKV Muxing App|Matroska: MuxingApp",
      "MKV Writing App|Matroska: WritingApp",
      "AVI Title|RIFF INFO: INAM",
      "AVI Artist|RIFF INFO: IART",
      "AVI Comment|RIFF INFO: ICMT",
      "AVI Software|RIFF INFO: ISFT",
      "WMV Title|ASF: Title",
      "WMV Author|ASF: Author",
      "WMV Description|ASF: Description",
      "WMV Rating|ASF: Rating"
    ]],
    ["Audio \u2014 ID3 Tags", "audio", [
      "Title|ID3v2: TIT2",
      "Subtitle|ID3v2: TIT3",
      "Artist|ID3v2: TPE1",
      "Album Artist|ID3v2: TPE2",
      "Album|ID3v2: TALB",
      "Year|ID3v2: TDRC",
      "Track Number|ID3v2: TRCK",
      "Disc Number|ID3v2: TPOS",
      "Genre|ID3v2: TCON",
      "Composer|ID3v2: TCOM",
      "Conductor|ID3v2: TPE3",
      "Lyricist|ID3v2: TEXT",
      "Publisher|ID3v2: TPUB",
      "Encoded By|ID3v2: TENC",
      "BPM|ID3v2: TBPM",
      "Initial Key|ID3v2: TKEY",
      "ISRC|ID3v2: TSRC",
      "Comment|ID3v2: COMM",
      "Lyrics|ID3v2: USLT",
      "Album Art|ID3v2: APIC",
      "Copyright|ID3v2: TCOP",
      "Grouping|ID3v2: TIT1",
      "Compilation|ID3v2: TCMP",
      "Mood|ID3v2: TMOO",
      "Media Type|ID3v2: TMED",
      "ReplayGain|ID3v2: TXXX"
    ]],
    ["Audio \u2014 Stream", "audio", [
      "Duration|FFmpeg: Duration",
      "Audio Codec|FFmpeg: codec_name",
      "Bitrate|FFmpeg: bit_rate",
      "Bitrate Mode|CBR / VBR",
      "Sample Rate|FFmpeg: sample_rate",
      "Channels|FFmpeg: channels",
      "Bit Depth|FFmpeg: bits_per_sample"
    ]],
    ["Document", "document", [
      "Page count",
      "Word count",
      "Character count",
      "Title|PDF: Title",
      "Subject|PDF: Subject",
      "PDF Producer|PDF: Producer",
      "PDF Creator Tool|PDF: Creator",
      "PDF Version|PDF: PDFVersion",
      "Encrypted|PDF: Encryption"
    ]],
    ["3D / Model", "3d", [
      "Geometry Type|mesh, NURBS, solid",
      "Vertex count",
      "Face / Polygon Count",
      "Edge count",
      "Object count",
      "Material count",
      "Texture count",
      "UV maps",
      "Bounding box",
      "Scene Units|mm, cm, m, in",
      "Up Axis|Y-up, Z-up",
      "Animation|has animations",
      "Rigged|has armature",
      "File Format|FBX, OBJ, GLTF, USD...",
      "Render Engine|Cycles, Eevee, V-Ray...",
      "Source Application|Blender, Maya, 3ds Max..."
    ]],
    ["Distribution", "all", ["Channels", "Auto assigned media", "Published locations", "Conversion preset"]],
    ["Custom", "all", ["Custom Field 1", "Custom Field 2", "Custom Field 3"]]
  ].map(([name, types, fields], g) => ({
    name,
    types: types.split(","),
    fields: fields.map((f, i) => {
      const on = f[0] === "*";
      const [label, tag] = (on ? f.slice(1) : f).split("|");
      return { key: g + ":" + i, label, tag, on };
    })
  }));
  const META_DEFAULTS = ["default"].concat(...META_GROUPS$1.map((g) => g.fields.filter((f) => f.on).map((f) => f.key)));
  function formatSize(bytes) {
    if (bytes === null || bytes === void 0) return "\u2014";
    const units = ["B", "KB", "MB", "GB", "TB"];
    let n = bytes, u = 0;
    while (n >= 1024 && u < units.length - 1) {
      n /= 1024;
      u += 1;
    }
    return (u === 0 ? n : n.toFixed(1)) + " " + units[u];
  }
  const EXT_ICONS = { jpg: "file-jpg", jpeg: "file-jpg", png: "file-png", pdf: "file-pdf", svg: "file-svg", zip: "file-zip", psd: "file-psd", ai: "file-ai" };
  function fileIcon(item) {
    const ext = (item.name.split(".").pop() || "").toLowerCase();
    if (EXT_ICONS[ext]) return EXT_ICONS[ext];
    return /^image\//.test(item.type) ? "image-b" : "document";
  }
  function walkEntry(entry, prefix, out) {
    return new Promise((resolve) => {
      if (entry.isFile) entry.file((file) => {
        out.push({ file, path: prefix });
        resolve();
      }, () => resolve());
      else if (entry.isDirectory) {
        const reader = entry.createReader(), all = [];
        const read = () => reader.readEntries((batch) => {
          if (batch.length) {
            all.push(...batch);
            read();
          } else Promise.all(all.map((e) => walkEntry(e, prefix + entry.name + "/", out))).then(resolve);
        }, () => resolve());
        read();
      } else resolve();
    });
  }
  function droppedFiles(dataTransfer) {
    const entries = Array.from(dataTransfer.items || []).map((it) => it.kind === "file" && it.webkitGetAsEntry ? it.webkitGetAsEntry() : null);
    if (!entries.length || entries.some((e) => !e)) return Promise.resolve(Array.from(dataTransfer.files || []).map((file) => ({ file, path: "" })));
    const out = [];
    return Promise.all(entries.map((e) => walkEntry(e, "", out))).then(() => out);
  }
  function addChild(nodes, parentId, child) {
    return nodes.map((n) => n.id === parentId ? { ...n, children: (n.children || []).concat(child) } : n.children ? { ...n, children: addChild(n.children, parentId, child) } : n);
  }
  function FilesPane$1({ queue, addFiles, removeFile, clearQueue }) {
    const toast = plenixPlatform.useToast();
    const [tree, setTree] = React2.useState(FOLDERS);
    const [folder2, setFolder] = React2.useState(DEFAULT_FOLDER);
    const [expanded, setExpanded] = React2.useState(["all"]);
    const [naming, setNaming] = React2.useState(null);
    const [over, setOver] = React2.useState(false);
    const [url, setUrl] = React2.useState("");
    const filesInput = React2.useRef(null), folderInput = React2.useRef(null), nameInput = React2.useRef(null), depth = React2.useRef(0), nextFolder = React2.useRef(1);
    React2.useEffect(() => {
      if (naming === null) return void 0;
      const onKey = (e) => {
        if (e.key === "Escape" && e.target === nameInput.current) {
          e.stopPropagation();
          e.preventDefault();
          setNaming(null);
        }
      };
      window.addEventListener("keydown", onKey, true);
      return () => window.removeEventListener("keydown", onKey, true);
    }, [naming === null]);
    const commitFolder = () => {
      const name = (naming || "").trim();
      if (name) {
        setTree(addChild(tree, folder2, { id: "new-" + nextFolder.current++, label: name }));
        if (!expanded.includes(folder2)) setExpanded(expanded.concat(folder2));
      }
      setNaming(null);
    };
    const fromInput = (e) => {
      addFiles(Array.from(e.target.files || []).map((file) => ({ file, path: (file.webkitRelativePath || "").split("/").slice(0, -1).map((p) => p + "/").join("") })));
      e.target.value = "";
    };
    const onDrop = (e) => {
      e.preventDefault();
      depth.current = 0;
      setOver(false);
      droppedFiles(e.dataTransfer).then(addFiles);
    };
    const importUrl = () => {
      const v = url.trim();
      if (v) {
        addFiles([{ url: v }]);
        setUrl("");
      }
      toast.show("Import", { tone: "success" });
    };
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "section", gap: "sm", "aria-labelledby": "upl-files" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h3", id: "upl-files", variant: "heading" }, "Files"), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Physical storage on disk. Each file is saved to exactly one folder."), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "none", maxHeight: "sm" }, tree.length ? /* @__PURE__ */ React2.createElement(
      plenixPlatform.Tree,
      {
        label: "Folders",
        nodes: tree.map(function deco(n) {
          return { ...n, icon: "folder", children: n.children ? n.children.map(deco) : void 0 };
        }),
        selected: folder2,
        onSelect: setFolder,
        expanded,
        onExpandedChange: setExpanded
      }
    ) : /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, null, "No data")), naming === null ? /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", icon: "plus", onClick: () => setNaming("") }, "New folder")) : /* @__PURE__ */ React2.createElement(
      plenixPlatform.Input,
      {
        ref: nameInput,
        "aria-label": "Folder name",
        placeholder: "Folder name...",
        autoFocus: true,
        value: naming,
        onChange: (e) => setNaming(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            commitFolder();
          }
        },
        onBlur: () => {
          if (!naming.trim()) setNaming(null);
        }
      }
    ), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h3", variant: "heading", className: "plx-u-mt-stack-md" }, "Upload"), /* @__PURE__ */ React2.createElement(
      plenixPlatform.DropZone,
      {
        active: over,
        onDragEnter: (e) => {
          e.preventDefault();
          depth.current += 1;
          setOver(true);
        },
        onDragOver: (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        },
        onDragLeave: () => {
          depth.current -= 1;
          if (depth.current <= 0) {
            depth.current = 0;
            setOver(false);
          }
        },
        onDrop
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "upload-2", size: "lg" }),
      /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "label" }, "Drag & drop files or folders"),
      /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "or choose an option below"),
      /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "center", className: "plx-u-mt-stack-sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "text-card", onClick: () => filesInput.current.click() }, "Browse files"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "folder-open", onClick: () => folderInput.current.click() }, "Browse folder")),
      /* @__PURE__ */ React2.createElement("input", { ref: filesInput, type: "file", multiple: true, hidden: true, onChange: fromInput, "aria-label": "Browse files" }),
      /* @__PURE__ */ React2.createElement("input", { ref: folderInput, type: "file", multiple: true, hidden: true, webkitdirectory: "", directory: "", onChange: fromInput, "aria-label": "Browse folder" })
    ), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "center", className: "plx-u-mt-stack-sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "secondary" }, "or import from URL")), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React2.createElement(
      plenixPlatform.Input,
      {
        name: "upload",
        "aria-label": "Import from URL",
        placeholder: "https://example.com/image.png",
        value: url,
        onChange: (e) => setUrl(e.target.value),
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            importUrl();
          }
        }
      }
    ), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "primary", onClick: importUrl }, "Import")), queue.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", "aria-live": "polite" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "between", className: "plx-u-mt-stack-sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "label" }, "Queue ", /* @__PURE__ */ React2.createElement(plenixPlatform.Count, { value: queue.length, label: queue.length + " file(s) in the queue" })), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", onClick: clearQueue }, "Clear")), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "ul", gap: "xs", maxHeight: "sm", "aria-label": "Upload queue" }, queue.map((q) => /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { as: "li", key: q.id }, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: fileIcon(q), size: "sm" }), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "span", gap: "none", grow: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data", truncate: true, title: q.path + q.name }, q.path, q.name), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "caption", truncate: true }, formatSize(q.size), " \xB7 ", q.type || "Unknown")), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", iconOnly: true, icon: "close", label: "Remove " + q.name, onClick: () => removeFile(q.id) }))))) : null);
  }
  function CategoriesPane() {
    const [useFolders, setUseFolders] = React2.useState(false);
    const [q, setQ] = React2.useState("");
    const [picked, setPicked] = React2.useState([]);
    const [adding, setAdding] = React2.useState(false);
    const [cat, setCat] = React2.useState({ name: "", description: "", tags: "", color: plenixPlatform.CATEGORY_COLORS[0] });
    const shown = CATEGORIES.filter((c) => !q.trim() || c.toLowerCase().includes(q.trim().toLowerCase()));
    const toggle = (c, on) => setPicked(on ? picked.concat(c) : picked.filter((p) => p !== c));
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "section", gap: "sm", "aria-labelledby": "upl-cats" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h3", id: "upl-cats", variant: "heading" }, "Categories ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "danger", "aria-hidden": "true" }, "*")), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Required. Logical grouping \u2014 assets can belong to multiple categories (1 to many)."), /* @__PURE__ */ React2.createElement(
      plenixPlatform.Checkbox,
      {
        name: "useFolderNamesAsCategoriesMergeIfExists",
        checked: useFolders,
        onChange: (e) => setUseFolders(e.target.checked),
        title: "Use the uploaded folder names as categories (merge if a category already exists)",
        label: /* @__PURE__ */ React2.createElement(React2.Fragment, null, "Use folder names as categories ", /* @__PURE__ */ React2.createElement("em", null, "(merge if exists)"))
      }
    ), /* @__PURE__ */ React2.createElement(plenixPlatform.SearchField, { label: "Search categories", placeholder: "Search categories...", value: q, onChange: (e) => setQ(e.target.value), onClear: () => setQ("") }), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", maxHeight: "sm", role: "group", "aria-label": "Categories" }, CATEGORIES.length ? shown.map((c) => /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { key: c, checked: picked.includes(c), onChange: (e) => toggle(c, e.target.checked), label: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "folder", size: "sm" }), " ", c) })) : /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, null, "No data")), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { justify: "between" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", icon: "plus", onClick: () => setAdding(true), "aria-expanded": adding }, "New category"), adding ? /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", iconOnly: true, icon: "close", label: "Cancel new category", title: "Cancel new category", onClick: () => setAdding(false) }) : null), adding ? /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "categoryName", "aria-label": "Category name", placeholder: "Enter category name...", value: cat.name, onChange: (e) => setCat({ ...cat, name: e.target.value }) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "description", "aria-label": "Description", placeholder: "Optional description...", value: cat.description, onChange: (e) => setCat({ ...cat, description: e.target.value }) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "tags", "aria-label": "Tags", placeholder: "Tags", value: cat.tags, onChange: (e) => setCat({ ...cat, tags: e.target.value }) }), /* @__PURE__ */ React2.createElement(plenixPlatform.ColorPicker, { palette: "category", label: "Category color", value: cat.color, onChange: (h) => setCat({ ...cat, color: h }) })) : null);
  }
  function MetadataPane() {
    const [q, setQ] = React2.useState("");
    const [type, setType] = React2.useState("all");
    const [open, setOpen] = React2.useState([]);
    const [checked, setChecked] = React2.useState(META_DEFAULTS);
    const query = q.trim().toLowerCase();
    const isOn = (key) => checked.includes(key);
    const flip = (key, on) => setChecked(on ? checked.concat(key) : checked.filter((k) => k !== key));
    const typeOk = (g) => type === "all" || g.types.includes("all") || g.types.includes(type);
    const matches = (f) => !query || (f.label + (f.tag ? " (" + f.tag + ")" : "")).toLowerCase().includes(query);
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "section", gap: "sm", "aria-labelledby": "upl-meta" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h3", id: "upl-meta", variant: "heading" }, "Visible metadata"), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "All metadata is always stored. Checked fields are shown by default in this category's view."), /* @__PURE__ */ React2.createElement(plenixPlatform.SearchField, { label: "Search fields", placeholder: "Search fields...", value: q, onChange: (e) => setQ(e.target.value), onClear: () => setQ("") }), /* @__PURE__ */ React2.createElement(plenixPlatform.RadioGroup, { name: "metaTypeFilter", "aria-label": "Field type", layout: "row", value: type, onChange: setType, options: TYPE_FILTERS }), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "xs", maxHeight: "lg" }, query ? null : /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "defaultCurrentView", checked: isOn("default"), onChange: (e) => flip("default", e.target.checked), label: "Default (Current View)" }), META_GROUPS$1.filter(typeOk).map((g) => {
      const isOpen = open.includes(g.name);
      const fields = isOpen ? g.fields.filter(matches) : [];
      return /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { key: g.name, gap: "xs", role: "group", "aria-label": g.name }, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(
        plenixPlatform.Button,
        {
          variant: "ghost",
          size: "xs",
          icon: isOpen ? "chevron-down" : "triangle-right",
          "aria-expanded": isOpen,
          onClick: () => setOpen(isOpen ? open.filter((n) => n !== g.name) : open.concat(g.name))
        },
        g.name
      )), fields.map((f) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.Checkbox,
        {
          key: f.key,
          checked: isOn(f.key),
          onChange: (e) => flip(f.key, e.target.checked),
          label: f.tag ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, f.label, " ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "caption" }, "(", f.tag, ")")) : f.label
        }
      )));
    })));
  }
  function UploadFlow({ onClose }) {
    const toast = plenixPlatform.useToast();
    const [queue, setQueue] = React2.useState([]);
    const nextId = React2.useRef(1);
    const addFiles = (items) => {
      if (!items.length) return;
      const added = items.map((it) => it.url ? { id: nextId.current++, name: it.url.split(/[?#]/)[0].split("/").filter(Boolean).pop() || it.url, path: "", size: null, type: "URL", url: it.url } : { id: nextId.current++, name: it.file.name, path: it.path || "", size: it.file.size, type: it.file.type, file: it.file });
      setQueue((cur) => cur.concat(added));
    };
    const upload = () => {
      if (queue.length) toast.show(queue.length + " file(s) ready to upload", { tone: "success" });
      onClose();
    };
    const cancel = plenixPlatform.useUnsavedGuard(queue.length > 0, "The files you chose have not been uploaded.")(onClose);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open: true,
        onClose: cancel,
        title: "Upload assets",
        icon: "upload",
        size: "xl",
        flush: true,
        footer: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: cancel }, "Cancel"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: upload }, "Upload"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Columns, { count: 3, divided: true }, /* @__PURE__ */ React2.createElement(FilesPane$1, { queue, addFiles, removeFile: (id) => setQueue((cur) => cur.filter((q) => q.id !== id)), clearQueue: () => setQueue([]) }), /* @__PURE__ */ React2.createElement(CategoriesPane, null), /* @__PURE__ */ React2.createElement(MetadataPane, null))
    );
  }
  function UploadDialog({ open, onClose }) {
    return open ? /* @__PURE__ */ React2.createElement(UploadFlow, { onClose }) : null;
  }
  const DIALOGS$3 = { uploadModal: UploadDialog };
  const TYPE_OPTIONS = [
    { value: "all", label: "All" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "document", label: "Doc" },
    { value: "3d", label: "3D" }
  ];
  const GROUPS = [
    { title: "General", types: ["all"], shown: 4, fields: [
      ["Name", "name", "name"],
      ["Description", "description", "assetsearchdescription"],
      ["Tags", "tags", "tags"],
      ["Rating", "rating", "assetvotes"],
      ["Keywords", "keywords", "keywords"],
      ["Edit status", "editStatus", "editstatus"],
      ["Language", "language", "language"],
      ["Version", "version", "version"],
      ["Summary", "summary", "summary"]
    ] },
    { title: "Categorization", types: ["all"], shown: 2, fields: [
      ["Category", "category", "category"],
      ["Data type", "dataType", "datatype"],
      ["Category ID", "categoryId", "categoryid"],
      ["Parent category", "parentCategory", "parentcategory"],
      ["Category path", "categoryPath", "categorypath"],
      ["Display order", "displayOrder", "displayorder"],
      ["Asset type", "assetType", "assettype"],
      ["Classification", "classification", "classification"]
    ] },
    { title: "Ownership & Rights", types: ["all"], shown: 2, fields: [
      ["Owner", "owner", "owner"],
      ["Creator", "creator", "creator"],
      ["Copyright", "copyright", "copyright"],
      ["Copyright notice", "copyrightNotice", "copyrightnotice"],
      ["Rights usage terms", "rightsUsageTerms", "usageterms"],
      ["License", "license", "license"],
      ["Author", "author", "author"],
      ["Created by", "createdBy", "createdby"],
      ["Modified by", "modifiedBy", "modifiedby"]
    ] },
    { title: "Dates", types: ["all"], shown: 2, fields: [
      ["Date added", "dateAdded", "assetaddeddate"],
      ["Date modified", "dateModified", "assetmodificationdate"],
      ["Date created", "dateCreated", "datetimeoriginal"],
      ["Date digitized", "dateDigitized", "createdate"],
      ["GPS Date/Time", "gpsDateTime", "gpsdatestamp"],
      ["Import date", "importDate", "importdate"],
      ["Publish date", "publishDate", "publishdate"],
      ["Expiration date", "expirationDate", "expirationdate"]
    ] },
    { title: "File properties", types: ["all"], shown: 3, fields: [
      ["File name", "fileName", "name"],
      ["File type", "fileType", "fileformat"],
      ["File size", "fileSize", "filesize"],
      ["MIME type", "mimeType", "mimetype"],
      ["Source path", "sourcePath", "sourcepath"],
      ["Archive source path", "archiveSourcePath", "archivesourcepath"],
      ["Checksum / MD5", "checksumMd5", "md5hex"],
      ["Asset ID", "assetId", "id"]
    ] },
    { title: "Dimensions & Resolution", types: ["image", "video"], shown: 2, fields: [
      ["Width", "width", "width"],
      ["Height", "height", "height"],
      ["DPI / Resolution", "dpiResolution", "xresolution"],
      ["Resolution unit", "resolutionUnit", "resolutionunit"],
      ["Orientation", "orientation", "orientation"],
      ["Pixel aspect ratio", "pixelAspectRatio", "pixelaspectratio"]
    ] },
    { title: "Camera & Lens", types: ["image", "video"], shown: 2, fields: [
      ["Camera make", "cameraMake", "make"],
      ["Camera model", "cameraModel", "model"],
      ["Camera Serial #", "cameraSerial", "serialnumber"],
      ["Lens type", "lensType", "lensmodel"],
      ["Lens make", "lensMake", "lensmake"],
      ["Firmware", "firmware", "software"]
    ] },
    { title: "Exposure & Shooting", types: ["image"], shown: 4, fields: [
      ["Focal length", "focalLength", "focallength"],
      ["Aperture", "aperture", "fnumber"],
      ["Shutter speed", "shutterSpeed", "exposuretime"],
      ["ISO", "iso", "iso"],
      ["Exposure program", "exposureProgram", "exposureprogram"],
      ["Exposure mode", "exposureMode", "exposuremode"],
      ["Metering mode", "meteringMode", "meteringmode"],
      ["Flash", "flash", "flash"],
      ["White balance", "whiteBalance", "whitebalance"],
      ["Scene type", "sceneType", "scenecapturetype"],
      ["Contrast", "contrast", "contrast"],
      ["Saturation", "saturation", "saturation"],
      ["Sharpness", "sharpness", "sharpness"]
    ] },
    { title: "Color & Image", types: ["image"], shown: 2, fields: [
      ["Color space", "colorSpace", "colorspace"],
      ["Color profile", "colorProfile", "iccprofilename"],
      ["Bit depth", "bitDepth", "bitspersample"],
      ["Compression", "compression", "compression"],
      ["Color type", "colorType", "colortype"]
    ] },
    { title: "Location (GPS)", types: ["image", "video"], shown: 2, fields: [
      ["GPS latitude", "gpsLatitude", "gpslatitude"],
      ["GPS longitude", "gpsLongitude", "gpslongitude"],
      ["GPS altitude", "gpsAltitude", "gpsaltitude"],
      ["GPS speed", "gpsSpeed", "gpsspeed"],
      ["GPS direction", "gpsDirection", "gpsimgdirection"]
    ] },
    { title: "IPTC / XMP", types: ["image"], shown: 2, fields: [
      ["Headline", "headline", "headline"],
      ["Caption", "caption", "caption-abstract"],
      ["By-line", "byLine", "by-line"],
      ["Credit", "credit", "credit"],
      ["Source", "source", "source"],
      ["City", "city", "city"],
      ["Country", "country", "country"],
      ["Subject code", "subjectCode", "subject"],
      ["Urgency", "urgency", "urgency"],
      ["Instructions", "instructions", "specialinstructions"]
    ] },
    { title: "Video \u2014 Stream", types: ["video"], shown: 4, fields: [
      ["Duration", "duration", "duration"],
      ["Frame rate", "frameRate", "r_frame_rate"],
      ["Video codec", "videoCodec", "codec_name"],
      ["Video resolution", "videoResolution", "videoresolution"],
      ["Codec profile", "codecProfile", "profile"],
      ["Video bitrate", "videoBitrate", "bit_rate"],
      ["Aspect ratio", "aspectRatio", "display_aspect_ratio"],
      ["Pixel format", "pixelFormat", "pix_fmt"],
      ["Color primaries", "colorPrimaries", "color_primaries"],
      ["Rotation", "rotation", "rotate"],
      ["Audio codec", "audioCodec", "audio_codec_name"],
      ["Audio bitrate", "audioBitrate", "audio_bit_rate"],
      ["Sample rate", "sampleRate", "sample_rate"],
      ["Audio channels", "audioChannels", "channels"],
      ["Subtitle tracks", "subtitleTracks", "subtitle_streams"]
    ] },
    { title: "Video \u2014 Container Tags", types: ["video"], shown: 2, fields: [
      ["Title", "title", "mp4_nam"],
      ["Artist", "artist", "mp4_art"],
      ["Album", "album", "mp4_alb"],
      ["Comment", "comment", "mp4_cmt"],
      ["Genre", "genre", "mp4_gen"],
      ["Year", "year", "mp4_day"],
      ["Encoder", "encoder", "mp4_too"]
    ] },
    { title: "Audio \u2014 ID3 Tags", types: ["audio"], shown: 4, fields: [
      ["Title", "title2", "id3_tit2"],
      ["Artist", "artist2", "id3_tpe1"],
      ["Album", "album2", "id3_talb"],
      ["Genre", "genre2", "id3_tcon"],
      ["Album artist", "albumArtist", "id3_tpe2"],
      ["Year", "year2", "id3_tdrc"],
      ["Track number", "trackNumber", "id3_trck"],
      ["Disc number", "discNumber", "id3_tpos"],
      ["Composer", "composer", "id3_tcom"],
      ["Conductor", "conductor", "id3_tpe3"],
      ["Lyricist", "lyricist", "id3_text"],
      ["Publisher", "publisher", "id3_tpub"],
      ["BPM", "bpm", "id3_tbpm"],
      ["ISRC", "isrc", "id3_tsrc"],
      ["Lyrics", "lyrics", "id3_uslt"],
      ["Album art", "albumArt", "id3_apic"],
      ["Copyright", "copyright2", "id3_tcop"],
      ["Mood", "mood", "id3_tmoo"],
      ["ReplayGain", "replaygain", "id3_txxx"]
    ] },
    { title: "Audio \u2014 Stream", types: ["audio"], shown: 3, fields: [
      ["Duration", "duration2", "duration"],
      ["Audio codec", "audioCodec2", "codec_name"],
      ["Bitrate", "bitrate", "bit_rate"],
      ["Bitrate mode", "bitrateMode", "bitrate_mode"],
      ["Sample rate", "sampleRate2", "sample_rate"],
      ["Channels", "channels", "channels"],
      ["Bit depth", "bitDepth2", "bits_per_sample"]
    ] },
    { title: "Document", types: ["document"], shown: 2, fields: [
      ["Page count", "pageCount", "pagecount"],
      ["Title", "title3", "pdf_title"],
      ["Word count", "wordCount", "wordcount"],
      ["Character count", "characterCount", "charcount"],
      ["Subject", "subject", "pdf_subject"],
      ["PDF producer", "pdfProducer", "pdf_producer"],
      ["PDF creator tool", "pdfCreatorTool", "pdf_creator"],
      ["PDF version", "pdfVersion", "pdfversion"],
      ["Encrypted", "encrypted", "encryption"]
    ] },
    { title: "3D / Model", types: ["3d"], shown: 3, fields: [
      ["Geometry type", "geometryType", "geometrytype"],
      ["Vertex count", "vertexCount", "vertexcount"],
      ["Face / Polygon Count", "facePolygonCount", "facecount"],
      ["Material count", "materialCount", "materialcount"],
      ["Texture count", "textureCount", "texturecount"],
      ["UV maps", "uvMaps", "uvmaps"],
      ["Bounding box", "boundingBox", "boundingbox"],
      ["Scene units", "sceneUnits", "sceneunits"],
      ["Animation", "animation", "hasanimation"],
      ["Rigged", "rigged", "hasarmature"],
      ["Source application", "sourceApplication", "sourceapp"]
    ] },
    { title: "Status & Workflow", types: ["all"], shown: 3, fields: [
      ["Edit status", "editStatus2", "editstatus"],
      ["Import status", "importStatus", "importstatus"],
      ["Preview status", "previewStatus", "previewstatus"],
      ["Push status", "pushStatus", "pushstatus"],
      ["Approval status", "approvalStatus", "approvalstatus"],
      ["Conversion status", "conversionStatus", "conversionstatus"],
      ["Locked", "locked", "islocked"]
    ] },
    { title: "AI & Semantic", types: ["all"], shown: 2, fields: [
      ["Semantic indexed", "semanticIndexed", "semanticindexed"],
      ["AI tags", "aiTags", "aitags"],
      ["Facial recognition", "facialRecognition", "facialrecognition"],
      ["CLIP embedding", "clipEmbedding", "clipembedding"]
    ] },
    { title: "Distribution", types: ["all"], shown: 2, fields: [
      ["Channels", "channels2", "distributionchannels"],
      ["Published locations", "publishedLocations", "publishedlocations"],
      ["Auto assigned media", "autoAssignedMedia", "autoassignedmedia"],
      ["Conversion preset", "conversionPreset", "conversionpreset"]
    ] }
  ];
  const DEFAULT_FILTERS = { types: ["all"], fields: {} };
  function nextTypes(types, value, checked) {
    if (value === "all") return checked ? ["all"] : types.filter((t) => t !== "all");
    const others = types.filter((t) => t !== "all" && t !== value).concat(checked ? [value] : []);
    return others.length ? others : ["all"];
  }
  function groupVisible(group, types) {
    const active = types.filter((t) => t !== "all");
    if (types.includes("all") || !active.length || group.types.includes("all")) return true;
    return active.some((t) => group.types.includes(t));
  }
  function MetaGroup({ group, index, fields, onField, collapsed, onToggle, expanded, onShowMore }) {
    const extra = group.fields.length - group.shown;
    const list = expanded ? group.fields : group.fields.slice(0, group.shown);
    return /* @__PURE__ */ React2.createElement(plenixPlatform.CollapsibleSection, { title: group.title, expanded: !collapsed, onToggle, headingLevel: 3 }, /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-u-gap-y-component-gap-sm plx-u-pt-component-gap-sm" }, list.map(([label, name]) => /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { key: name, label, layout: "inline" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name, placeholder: "Search by " + label.toLowerCase() + "...", value: fields[name] || "", onChange: (e) => onField(name, e.target.value) }))), extra > 0 ? /* @__PURE__ */ React2.createElement("div", { className: "plx-u-flex" }, /* @__PURE__ */ React2.createElement(plenixPlatform.ShowMore, { variant: "ghost", size: "sm", expanded, count: "+" + extra, onToggle: onShowMore })) : null));
  }
  function MetadataFilterDialog({ open, onClose, value, onApply }) {
    const [applied, setApplied] = React2.useState(value || DEFAULT_FILTERS);
    const current = value || applied;
    const [draft, setDraft] = React2.useState(current);
    const [collapsed, setCollapsed] = React2.useState({});
    const [expanded, setExpanded] = React2.useState({});
    React2.useEffect(() => {
      if (open) setDraft(current);
    }, [open]);
    const setType = (v, checked) => setDraft((d) => ({ ...d, types: nextTypes(d.types, v, checked) }));
    const setField = (name, text) => setDraft((d) => {
      const fields = { ...d.fields };
      if (text) fields[name] = text;
      else delete fields[name];
      return { ...d, fields };
    });
    const flip = (setter, i) => setter((s) => ({ ...s, [i]: !s[i] }));
    const guard = plenixPlatform.useUnsavedGuard(!!open && JSON.stringify(draft) !== JSON.stringify(current), "The filters you changed have not been applied.");
    const cancel = guard(onClose);
    const apply = (e) => {
      if (e) e.preventDefault();
      if (!value) setApplied(draft);
      if (onApply) onApply(draft);
      onClose();
    };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose: cancel,
        title: "Advanced Filters \u2014 Metadata Fields",
        icon: "filter",
        size: "lg",
        footer: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: cancel }, "Cancel"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: apply }, "Apply"))
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { as: "form", noValidate: true, onSubmit: apply, className: "plx-u-gap-y-pattern-stack-md" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { role: "group", "aria-label": "Asset type", gap: "lg", wrap: true, className: "plx-u-gap-y-inline-sm" }, TYPE_OPTIONS.map((o) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.Checkbox,
        {
          key: o.value,
          name: "advMetaType",
          value: o.value,
          label: o.label,
          checked: draft.types.includes(o.value),
          onChange: (e) => setType(o.value, e.target.checked)
        }
      ))), GROUPS.map((g, i) => groupVisible(g, draft.types) ? /* @__PURE__ */ React2.createElement(
        MetaGroup,
        {
          key: g.title,
          group: g,
          index: i,
          fields: draft.fields,
          onField: setField,
          collapsed: !!collapsed[i],
          onToggle: () => flip(setCollapsed, i),
          expanded: !!expanded[i],
          onShowMore: () => flip(setExpanded, i)
        }
      ) : null), /* @__PURE__ */ React2.createElement("button", { type: "submit", hidden: true }))
    );
  }
  const DIALOGS$2 = { metadataModal: MetadataFilterDialog };
  const things = (count, kind = "asset", pre = "") => count + " " + pre + (kind === "category" ? count === 1 ? "category" : "categories" : count === 1 ? "asset" : "assets");
  const COLLECTIONS = ["Liturgical Art Collection", "Social Media Assets", "Website Banners", "Print Materials", "Clergy Portraits", "Certificate templates"];
  const MOVE_CATEGORIES = ["Banner icon", "Bookshelf", "Borders - Arch", "Borders - Circular", "Branding - Churches", "Cross - Traditional", "Dome", "Embroideries"];
  const CHANGE_CATEGORIES = ["Banner icon", "Borders - Arch", "Branding - Churches", "Dome", "Embroideries", "Fonts"];
  const CURRENT_CATEGORY = "Cross - Traditional";
  const CURRENT_TAGS = ["coptic", "orthodox", "cross", "gold", "traditional"];
  const SUGGESTED_TAGS = ["church", "liturgical", "icon", "border", "certificate", "branding"];
  const CART_ITEMS = 2;
  const SHARE_LINK = "https://plenix.lacopts.org/share/xK9m2pQ";
  const SHARED_WITH = [
    { name: "John Deacon", permission: "Can view" }
  ];
  const DOWNLOAD_ESTIMATE = "~24.5 MB";
  const CART_FORMATS = ["Original / Source File", "Web Optimized (1200px max)", "Social Media (1080 \xD7 1080)", "Custom Size..."];
  const CART_FILE_TYPES = ["Keep original format", "PNG", "JPG (80% quality)", "WebP", "SVG (vector only)", "PDF"];
  const STATUSES = [
    { value: "Approved", tone: "success", icon: "circle-check" },
    { value: "Pending review", tone: "waiting", icon: "schedule" },
    { value: "In progress", tone: "active", icon: "progress" },
    { value: "Draft", tone: "neutral", icon: "pencil" },
    { value: "Archived", tone: "neutral", icon: "archive" }
  ];
  const PERMISSIONS = ["Can view", "Can edit", "Admin"];
  const EXPIRATIONS = ["Never", "24 hours", "7 days", "30 days", "90 days"];
  const DOWNLOAD_FORMATS = ["Original / Source Files", "Web Optimized (1200px, 72dpi)", "Print Ready (300dpi)", "Custom Size..."];
  const DOWNLOAD_FILE_TYPES = ["Keep original format", "PNG", "JPG (80% quality)", "WebP", "PDF"];
  const CONVERT_TO = ["PNG", "JPG (80% quality)", "JPG (100% quality)", "WebP", "SVG", "PDF", "TIFF"];
  const UNITS = ["px", "%", "in", "cm"];
  const META_TYPES = [
    { value: "all", label: "All" },
    { value: "image", label: "Image" },
    { value: "video", label: "Video" },
    { value: "audio", label: "Audio" },
    { value: "document", label: "Document" },
    { value: "3d", label: "3D" }
  ];
  const KEEP = "-- Keep current --";
  const META_GROUPS = [
    { title: "General", types: ["all"], fields: [
      ["name", "Name", "text", "Leave blank to keep current"],
      ["description", "Description", "textarea", "Leave blank to keep current"],
      ["tags", "Tags", "text", "Comma-separated tags..."],
      ["keywords", "Keywords", "text", "Comma-separated keywords..."],
      ["rating", "Rating", "rating"],
      ["editStatus", "Edit status", "select", ["Complete", "New", "In progress", "Pending review", "Draft", "Archived"]],
      ["language", "Language", "select", ["English", "Arabic", "Coptic", "French", "Spanish"]],
      ["version", "Version", "text", "e.g. 1.0"],
      ["summary", "Summary", "textarea", "Brief summary..."]
    ] },
    { title: "Categorization", types: ["all"], fields: [
      ["category", "Category", "text", "Type to search..."],
      ["parentCategory", "Parent category", "text", "Parent category name"],
      ["displayOrder", "Display order", "number", "0"],
      ["assetType", "Asset type", "select", ["Image", "Video", "Audio", "Document", "3D Model", "Font"]],
      ["classification", "Classification", "text", "Classification"]
    ] },
    { title: "Ownership & Rights", types: ["all"], fields: [
      ["owner", "Owner", "text", "Asset owner"],
      ["creator", "Creator", "text", "Artist / Creator"],
      ["copyright", "Copyright", "text", "e.g. Coptic Orthodox Diocese of LA"],
      ["copyrightNotice", "Copyright notice", "text", "IPTC copyright notice"],
      ["usageTerms", "Usage terms", "select", ["Internal use only", "Church Use - Non-Commercial", "Creative Commons - Attribution", "Public domain", "All Rights Reserved"]],
      ["license", "License", "text", "License type"],
      ["author", "Author", "text", "Author name"]
    ] },
    { title: "Dates", types: ["all"], fields: [
      ["dateCreated", "Date created", "date"],
      ["dateModified", "Date modified", "date"],
      ["publishDate", "Publish date", "date"],
      ["expirationDate", "Expiration date", "date"]
    ] },
    { title: "Dimensions & Resolution", types: ["image", "video"], fields: [
      ["width", "Width", "number", "px"],
      ["height", "Height", "number", "px"],
      ["dpi", "DPI", "number", "72"],
      ["orientation", "Orientation", "select", ["Horizontal", "Vertical", "Square"]]
    ] },
    { title: "Camera & Lens", types: ["image", "video"], fields: [
      ["cameraMake", "Camera make", "text", "e.g. Canon"],
      ["cameraModel", "Camera model", "text", "e.g. EOS R5"],
      ["lensType", "Lens type", "text", "e.g. RF 24-70mm"]
    ] },
    { title: "Exposure & Shooting", types: ["image"], fields: [
      ["focalLength", "Focal length", "text", "e.g. 50mm"],
      ["aperture", "Aperture", "text", "e.g. f/2.8"],
      ["shutterSpeed", "Shutter speed", "text", "e.g. 1/125"],
      ["iso", "ISO", "number", "e.g. 400"],
      ["whiteBalance", "White balance", "select", ["Auto", "Daylight", "Cloudy", "Tungsten", "Fluorescent", "Flash"]],
      ["flash", "Flash", "select", ["Fired", "Did not fire", "Auto"]]
    ] },
    { title: "Color & Image", types: ["image"], fields: [
      ["colorSpace", "Color space", "select", ["sRGB", "Adobe RGB", "ProPhoto RGB", "Display P3"]],
      ["colorProfile", "Color profile", "text", "ICC profile name"],
      ["bitDepth", "Bit depth", "select", ["8", "16", "32"]]
    ] },
    { title: "Location (GPS)", types: ["image", "video"], fields: [
      ["gpsLatitude", "GPS latitude", "text", "e.g. 34.0522"],
      ["gpsLongitude", "GPS longitude", "text", "e.g. -118.2437"],
      ["gpsAltitude", "GPS altitude", "text", "meters"]
    ] },
    { title: "IPTC / XMP", types: ["image"], fields: [
      ["headline", "Headline", "text", "IPTC headline"],
      ["caption", "Caption", "textarea", "Caption / abstract"],
      ["byLine", "By-line", "text", "Photographer / creator"],
      ["credit", "Credit", "text", "Credit line"],
      ["source", "Source", "text", "Original source"],
      ["instructions", "Instructions", "textarea", "Special instructions"]
    ] },
    { title: "IPTC location", types: ["image"], fields: [
      ["subLocation", "Sub-location", "text", "Specific location"],
      ["city", "City", "text", "City"],
      ["stateProvince", "State / Province", "text", "State or province"],
      ["country", "Country", "text", "Country name"]
    ] },
    { title: "Video \u2014 Stream", types: ["video"], fields: [
      ["duration", "Duration", "text", "HH:MM:SS", true],
      ["frameRate", "Frame rate", "text", "e.g. 29.97", true],
      ["videoCodec", "Video codec", "text", "e.g. H.264", true],
      ["videoBitrate", "Video bitrate", "text", "e.g. 5000 kbps", true],
      ["resolution", "Resolution", "text", "e.g. 1920x1080", true]
    ] },
    { title: "Audio \u2014 ID3 Tags", types: ["audio"], fields: [
      ["title", "Title", "text", "Track title"],
      ["artist", "Artist", "text", "Artist name"],
      ["album", "Album", "text", "Album name"],
      ["year", "Year", "text", "Release year"],
      ["track", "Track #", "text", "e.g. 1/12"],
      ["genre", "Genre", "text", "Genre"],
      ["composer", "Composer", "text", "Composer name"],
      ["comment", "Comment", "textarea", "Comment"]
    ] },
    { title: "Audio \u2014 Stream", types: ["audio"], fields: [
      ["duration2", "Duration", "text", "HH:MM:SS", true],
      ["codec", "Codec", "text", "e.g. AAC", true],
      ["bitrate", "Bitrate", "text", "e.g. 320 kbps", true],
      ["sampleRate", "Sample rate", "text", "e.g. 44100 Hz", true]
    ] },
    { title: "Document", types: ["document"], fields: [
      ["title2", "Title", "text", "Document title"],
      ["subject", "Subject", "text", "Subject"],
      ["pageCount", "Page count", "number", "", true],
      ["pdfProducer", "PDF producer", "text", "", true]
    ] },
    { title: "3D / Model", types: ["3d"], fields: [
      ["geometryType", "Geometry type", "select", ["Mesh", "NURBS", "Solid"]],
      ["vertexCount", "Vertex count", "number", "", true],
      ["faceCount", "Face count", "number", "", true],
      ["sceneUnits", "Scene units", "select", ["mm", "cm", "m", "in"]],
      ["upAxis", "Up axis", "select", ["Y-up", "Z-up"]],
      ["fileFormat", "File format", "text", "e.g. FBX, GLTF", true],
      ["sourceApp", "Source app", "text", "e.g. Blender", true]
    ] },
    { title: "Distribution", types: ["all"], fields: [
      ["channels", "Channels", "text", "Distribution channels"],
      ["conversionPreset", "Conversion preset", "select", ["Web optimized", "Print ready", "Social Media", "Original"]]
    ] }
  ];
  const BULK_ACTIONS = {
    "Download": "baDownload",
    "Download as": "baDownloadAs",
    "Delete": "baDelete",
    "Add to Collection": "baCollection",
    "Move": "baMove",
    "Change category": "baChangeCategory",
    "Add to Cart": "baCart",
    "Change status": "baStatus",
    "Update metadata": "baMetadata",
    "Edit tags": "baTags",
    "Rating": "baRating",
    "Share": "baShare",
    "Delete category": "baDelete",
    "Move category": "baMove",
    "Change category status": "baStatus",
    "Share category": "baShare",
    "Rename category": "baRename",
    "Edit category": "baMetadata"
  };
  const CATEGORY_ACTIONS = ["Delete category", "Move category", "Change category status", "Share category", "Rename category", "Edit category", "Download category", "Download Category as"];
  const SINGLE_ONLY = ["Rename category", "Edit category", "Edit image", "Regenerate thumbnail"];
  function bulkDialogFor(action) {
    const id = BULK_ACTIONS[action];
    if (!id) return null;
    return { id, kind: CATEGORY_ACTIONS.indexOf(action) >= 0 ? "category" : "asset", singleOnly: SINGLE_ONLY.indexOf(action) >= 0 };
  }
  const bulkComingSoon = (action) => action + " \u2014 coming soon";
  const Caption = ({ children }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, children);
  const match = (q) => (s) => !q || s.toLowerCase().indexOf(q.trim().toLowerCase()) >= 0;
  const NoData = () => /* @__PURE__ */ React2.createElement(plenixPlatform.EmptyState, { title: "No data" });
  function Footer({ onClose, label, onApply, values }) {
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: onClose }, "Cancel"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => {
      if (onApply) onApply(values);
      onClose();
    } }, label));
  }
  function useOpenKey(open) {
    const [key, setKey] = React2.useState(0);
    React2.useEffect(() => {
      if (!open) setKey((k) => k + 1);
    }, [open]);
    return key;
  }
  function BaDeleteDialog({ open, onClose, count = 1, kind = "asset", onConfirm }) {
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.ConfirmDialog,
      {
        open,
        destructive: true,
        confirmLabel: "Delete",
        onCancel: onClose,
        onConfirm: () => {
          if (onConfirm) onConfirm();
          onClose();
        },
        title: "Delete " + things(count, kind) + "?",
        message: "This action will move the selected items to the trash. You can restore them within 30 days."
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Notice, { tone: "warning" }, "Deleted assets will be removed from all collections and shared links. Collaborators will lose access immediately.")
    );
  }
  function BaCollectionDialog({ open, onClose, count = 1, kind = "asset", onApply, onCreateCollection }) {
    return /* @__PURE__ */ React2.createElement(CollectionInner, { key: useOpenKey(open), open, onClose, count, kind, onApply, onCreateCollection });
  }
  function CollectionInner({ open, onClose, count, kind, onApply, onCreateCollection }) {
    const [q, setQ] = React2.useState("");
    const [picked, setPicked] = React2.useState([]);
    const shown = COLLECTIONS.filter(match(q));
    const toggle = (c) => setPicked(picked.indexOf(c) >= 0 ? picked.filter((p) => p !== c) : picked.concat(c));
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "briefcase-plus",
        title: "Add to Collection",
        description: "Add " + things(count, kind, "selected ") + " to a collection",
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Add to Collection", onApply, values: { collections: picked } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Search or create collection" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "searchOrCreateCollection", placeholder: "Type to search collections...", value: q, onChange: (e) => setQ(e.target.value) })), /* @__PURE__ */ React2.createElement("div", { role: "group", "aria-label": "Collections", className: "plx-stack plx-stack--gap-xs plx-layout--max-sm" }, shown.length ? shown.map((c) => /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { key: c, label: c, checked: picked.indexOf(c) >= 0, onChange: () => toggle(c) })) : /* @__PURE__ */ React2.createElement(NoData, null)), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", icon: "plus", onClick: () => {
        if (onCreateCollection) onCreateCollection();
      } }, "Create new collection")))
    );
  }
  function CategoryPicker({ label, placeholder, name, list, value, onChange }) {
    const [q, setQ] = React2.useState("");
    const nodes = list.filter(match(q)).map((c) => ({ id: c, label: c, icon: "folder" }));
    return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name, placeholder, value: q, onChange: (e) => setQ(e.target.value) })), /* @__PURE__ */ React2.createElement("div", { className: "plx-layout--max-sm" }, nodes.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.Tree, { label: "Categories", nodes, selected: value, onSelect: onChange }) : /* @__PURE__ */ React2.createElement(NoData, null)));
  }
  function BaMoveDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(MoveInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function MoveInner({ open, onClose, count, kind, onApply }) {
    const [dest, setDest] = React2.useState(null);
    const [removeCurrent, setRemoveCurrent] = React2.useState(false);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "move",
        title: "Move assets",
        description: "Select destination category for " + things(count, kind),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Move", onApply, values: { category: dest, removeFromCurrentCategory: removeCurrent } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(CategoryPicker, { label: "Search categories", placeholder: "Type to search...", name: "searchCategories", list: MOVE_CATEGORIES, value: dest, onChange: setDest }), /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "removeFromCurrentCategory", label: "Remove from current category", checked: removeCurrent, onChange: (e) => setRemoveCurrent(e.target.checked) }))
    );
  }
  function BaChangeCategoryDialog({ open, onClose, count = 1, kind = "asset", currentCategory = CURRENT_CATEGORY, onApply }) {
    return /* @__PURE__ */ React2.createElement(ChangeCategoryInner, { key: useOpenKey(open), open, onClose, count, kind, currentCategory, onApply });
  }
  function ChangeCategoryInner({ open, onClose, count, kind, currentCategory, onApply }) {
    const [dest, setDest] = React2.useState(null);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "folder",
        title: "Change category",
        description: "Reassign " + things(count, kind) + " to a different category",
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Change category", onApply, values: { category: dest } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement("div", { className: "plx-stack plx-stack--gap-xs" }, /* @__PURE__ */ React2.createElement(Caption, null, "Current category"), /* @__PURE__ */ React2.createElement(plenixPlatform.TagList, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Tag, null, currentCategory))), /* @__PURE__ */ React2.createElement(CategoryPicker, { label: "New category", placeholder: "Type to search categories...", name: "newCategory", list: CHANGE_CATEGORIES, value: dest, onChange: setDest }))
    );
  }
  function BaCartDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(CartInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function CartInner({ open, onClose, count, kind, onApply }) {
    const [format, setFormat] = React2.useState(CART_FORMATS[0]);
    const [fileType, setFileType] = React2.useState(CART_FILE_TYPES[0]);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "plus",
        title: "Add to Cart",
        description: "Add " + things(count, kind) + " to your download cart",
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Add to Cart", onApply, values: { format, fileType } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.RadioGroup, { label: "Download format", name: "cartFmt", value: format, onChange: setFormat, options: CART_FORMATS.map((v) => ({ value: v, label: v })) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "File type" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "fileType", value: fileType, onChange: (e) => setFileType(e.target.value) }, CART_FILE_TYPES.map((v) => /* @__PURE__ */ React2.createElement("option", { key: v }, v)))), /* @__PURE__ */ React2.createElement(Caption, null, plenixPlatform.dataPhrase("Items in your cart: {cart} \u2022 Adding {count} more", { cart: CART_ITEMS, count })))
    );
  }
  function BaStatusDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(StatusInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function StatusInner({ open, onClose, count, kind, onApply }) {
    const [status, setStatus] = React2.useState("Pending review");
    const [note, setNote] = React2.useState("");
    const options = STATUSES.map((s) => ({ value: s.value, label: /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: s.tone, icon: s.icon }, s.value) }));
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "circle-check",
        title: "Change status",
        description: "Set edit status for " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Apply status", onApply, values: { status, note } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.RadioGroup, { label: "New status", name: "bulkStatus", value: status, onChange: setStatus, options }), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Note (optional)" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { name: "noteOptional", placeholder: "Add a reason for the status change...", value: note, onChange: (e) => setNote(e.target.value) })))
    );
  }
  function MetaControl({ field, value, onChange }) {
    const [key, label, kind, extra, readOnly] = field;
    if (kind === "rating") return /* @__PURE__ */ React2.createElement(plenixPlatform.Rating, { label, value: value || 0, onChange });
    if (kind === "select") {
      return /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: key, value: value || "", onChange: (e) => onChange(e.target.value) }, /* @__PURE__ */ React2.createElement("option", { value: "" }, KEEP), extra.map((o) => /* @__PURE__ */ React2.createElement("option", { key: o }, o)));
    }
    const common = { name: key, value: value || "", placeholder: extra || void 0, readOnly: readOnly || void 0, onChange: (e) => onChange(e.target.value) };
    if (kind === "textarea") return /* @__PURE__ */ React2.createElement(plenixPlatform.Textarea, { rows: 2, ...common });
    return /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { type: kind, ...common });
  }
  function BaMetadataDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(MetadataInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function MetadataInner({ open, onClose, count, kind, onApply }) {
    const [type, setType] = React2.useState("all");
    const [openGroups, setOpenGroups] = React2.useState(["General"]);
    const [values, setValues] = React2.useState({});
    const [overwrite, setOverwrite] = React2.useState(false);
    const [appendTags, setAppendTags] = React2.useState(false);
    const toggle = (t) => setOpenGroups(openGroups.indexOf(t) >= 0 ? openGroups.filter((g) => g !== t) : openGroups.concat(t));
    const shows = (g) => type === "all" || g.types.indexOf("all") >= 0 || g.types.indexOf(type) >= 0;
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "lg",
        icon: "fields",
        title: "Update metadata",
        description: "Batch-edit metadata for " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Save metadata", onApply, values: { fields: values, overwrite, appendTags } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SegmentedControl, { label: "Asset type", size: "sm", options: META_TYPES, value: type, onChange: setType }), /* @__PURE__ */ React2.createElement("div", { className: "plx-stack plx-stack--gap-sm plx-layout--max-lg" }, META_GROUPS.filter(shows).map((g) => {
        const isOpen = openGroups.indexOf(g.title) >= 0;
        return /* @__PURE__ */ React2.createElement("section", { key: g.title, "aria-label": g.title, className: "plx-stack plx-stack--gap-sm" }, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "sm", icon: isOpen ? "chevron-down" : "triangle-right", expanded: isOpen, onClick: () => toggle(g.title) }, g.title)), isOpen ? g.fields.map((f) => /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { key: f[0], label: f[1], layout: "inline" }, /* @__PURE__ */ React2.createElement(MetaControl, { field: f, value: values[f[0]], onChange: (v) => setValues({ ...values, [f[0]]: v }) }))) : null);
      })), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "overwriteExistingValues", label: "Overwrite existing values (blank fields are skipped)", checked: overwrite, onChange: (e) => setOverwrite(e.target.checked) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "appendTagsInsteadOfReplacing", label: "Append tags instead of replacing", checked: appendTags, onChange: (e) => setAppendTags(e.target.checked) })))
    );
  }
  function BaTagsDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(TagsInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function TagsInner({ open, onClose, count, kind, onApply }) {
    const [add, setAdd] = React2.useState("");
    const [current, setCurrent] = React2.useState(CURRENT_TAGS);
    const [suggested, setSuggested] = React2.useState(SUGGESTED_TAGS.map((t) => ({ t, on: false })));
    const clickSuggested = (s) => setSuggested(s.on ? suggested.filter((x) => x !== s) : suggested.map((x) => x === s ? { t: x.t, on: true } : x));
    const values = { add: add.split(",").map((t) => t.trim()).filter(Boolean), current, added: suggested.filter((s) => s.on).map((s) => s.t) };
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "tags",
        title: "Edit tags",
        description: "Add or remove tags for " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Apply tags", onApply, values })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Add tags" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "addTags", placeholder: "Type tags separated by commas...", value: add, onChange: (e) => setAdd(e.target.value) })), /* @__PURE__ */ React2.createElement("div", { className: "plx-stack plx-stack--gap-xs" }, /* @__PURE__ */ React2.createElement(Caption, null, "Current Tags (click \xD7 to remove)"), current.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.TagList, { label: "Current tags" }, current.map((t) => /* @__PURE__ */ React2.createElement(plenixPlatform.Tag, { key: t, onRemove: () => setCurrent(current.filter((x) => x !== t)) }, t))) : /* @__PURE__ */ React2.createElement(NoData, null)), /* @__PURE__ */ React2.createElement("div", { className: "plx-stack plx-stack--gap-xs" }, /* @__PURE__ */ React2.createElement(Caption, null, "Suggested Tags (click to add)"), suggested.length ? /* @__PURE__ */ React2.createElement(plenixPlatform.TagList, { label: "Suggested tags" }, suggested.map((s) => /* @__PURE__ */ React2.createElement(plenixPlatform.Chip, { key: s.t, selected: s.on, "aria-label": s.on ? "Remove tag " + s.t : void 0, onClick: () => clickSuggested(s) }, s.on ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, s.t, " ", /* @__PURE__ */ React2.createElement("span", { "aria-hidden": "true" }, "\xD7")) : s.t))) : /* @__PURE__ */ React2.createElement(NoData, null)))
    );
  }
  function BaRatingDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(RatingInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function RatingInner({ open, onClose, count, kind, onApply }) {
    const [stars, setStars] = React2.useState(0);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "sparkle",
        title: "Set rating",
        description: "Rate " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Apply rating", onApply, values: { rating: stars } })
      },
      /* @__PURE__ */ React2.createElement("div", { className: "plx-inline plx-inline--gap-sm plx-layout--align-center" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Rating, { label: "Rating", value: stars, onChange: setStars }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", size: "sm", onClick: () => setStars(0) }, "Clear"))
    );
  }
  function BaShareDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(ShareInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function ShareInner({ open, onClose, count, kind, onApply }) {
    const toast = plenixPlatform.useToast();
    const [person, setPerson] = React2.useState("");
    const { account } = plenixPlatform.useSession();
    const [people, setPeople] = React2.useState(() => [{ name: account.name, permission: "Can edit" }].concat(SHARED_WITH));
    const [expiration, setExpiration] = React2.useState("30 days");
    const [opts2, setOpts] = React2.useState({ allowDownloads: true, requirePassword: false, notifyRecipientsByEmail: false });
    const check = (k, label) => /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: k, label, checked: opts2[k], onChange: (e) => setOpts({ ...opts2, [k]: e.target.checked }) });
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "share",
        title: "Share",
        description: "Share " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Share", onApply, values: { link: SHARE_LINK, invite: person, people, expiration, ...opts2 } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Share link" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "shareLink", readOnly: true, data: true, value: SHARE_LINK })), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", onClick: () => toast.show("Link copied", { tone: "success" }) }, "Copy")), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Share with people" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "shareWithPeople", placeholder: "Enter name or email...", value: person, onChange: (e) => setPerson(e.target.value) })), people.length ? /* @__PURE__ */ React2.createElement("div", { className: "plx-stack plx-stack--gap-sm" }, people.map((p, i) => /* @__PURE__ */ React2.createElement("div", { key: p.name, className: "plx-inline plx-inline--gap-sm plx-layout--align-center" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Avatar, { name: p.name }), /* @__PURE__ */ React2.createElement("span", { className: "plx-grow" }, p.name), /* @__PURE__ */ React2.createElement(
        plenixPlatform.Select,
        {
          "aria-label": "Permission for " + p.name,
          value: p.permission,
          onChange: (e) => setPeople(people.map((x, j) => j === i ? { ...x, permission: e.target.value } : x))
        },
        PERMISSIONS.map((o) => /* @__PURE__ */ React2.createElement("option", { key: o }, o))
      )))) : /* @__PURE__ */ React2.createElement(NoData, null), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Link expiration" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "linkExpiration", value: expiration, onChange: (e) => setExpiration(e.target.value) }, EXPIRATIONS.map((o) => /* @__PURE__ */ React2.createElement("option", { key: o }, o)))), /* @__PURE__ */ React2.createElement("div", null, check("allowDownloads", "Allow downloads"), check("requirePassword", "Require password"), check("notifyRecipientsByEmail", "Notify recipients by email")))
    );
  }
  function BaDownloadDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(DownloadInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function DownloadInner({ open, onClose, count, kind, onApply }) {
    const [format, setFormat] = React2.useState(DOWNLOAD_FORMATS[0]);
    const [fileType, setFileType] = React2.useState(DOWNLOAD_FILE_TYPES[0]);
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "download-tray",
        title: "Download",
        description: "Download " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Download", onApply, values: { format, fileType } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.RadioGroup, { label: "Format", name: "dlFmt", value: format, onChange: setFormat, options: DOWNLOAD_FORMATS.map((v) => ({ value: v, label: v })) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "File type" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "fileType", value: fileType, onChange: (e) => setFileType(e.target.value) }, DOWNLOAD_FILE_TYPES.map((v) => /* @__PURE__ */ React2.createElement("option", { key: v }, v)))), /* @__PURE__ */ React2.createElement(Caption, null, "Estimated download: ", /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "data" }, DOWNLOAD_ESTIMATE), " (ZIP archive)"))
    );
  }
  function BaDownloadAsDialog({ open, onClose, count = 1, kind = "asset", onApply }) {
    return /* @__PURE__ */ React2.createElement(DownloadAsInner, { key: useOpenKey(open), open, onClose, count, kind, onApply });
  }
  function DownloadAsInner({ open, onClose, count, kind, onApply }) {
    const [v, setV] = React2.useState({ convertTo: CONVERT_TO[0], width: "", height: "", unit: "px", maintainAspectRatio: true, stripMetadata: false });
    const set = (k) => (e) => setV({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "download-alt",
        title: "Download as",
        description: "Convert and download " + things(count, kind, "selected "),
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Download", onApply, values: v })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Convert to" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "convertTo", value: v.convertTo, onChange: set("convertTo") }, CONVERT_TO.map((o) => /* @__PURE__ */ React2.createElement("option", { key: o }, o)))), /* @__PURE__ */ React2.createElement(plenixPlatform.Fieldset, { legend: "Resize" }, /* @__PURE__ */ React2.createElement("div", { className: "plx-inline plx-inline--gap-sm plx-layout--align-center" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "width", "aria-label": "Width", placeholder: "Width", value: v.width, onChange: set("width") }), /* @__PURE__ */ React2.createElement("span", { "aria-hidden": "true" }, "\xD7"), /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "height", "aria-label": "Height", placeholder: "Height", value: v.height, onChange: set("height") }), /* @__PURE__ */ React2.createElement("div", { className: "plx-layout--width-sm" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "unit", "aria-label": "Unit", value: v.unit, onChange: set("unit") }, UNITS.map((o) => /* @__PURE__ */ React2.createElement("option", { key: o }, o)))))), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "maintainAspectRatio", label: "Maintain aspect ratio", checked: v.maintainAspectRatio, onChange: set("maintainAspectRatio") }), /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { name: "stripMetadataExifIptc", label: "Strip metadata (EXIF/IPTC)", checked: v.stripMetadata, onChange: set("stripMetadata") })))
    );
  }
  function BaRenameDialog({ open, onClose, itemName = CURRENT_CATEGORY, onApply }) {
    return /* @__PURE__ */ React2.createElement(RenameInner, { key: useOpenKey(open), open, onClose, itemName, onApply });
  }
  function RenameInner({ open, onClose, itemName, onApply }) {
    const [name, setName] = React2.useState("");
    return /* @__PURE__ */ React2.createElement(
      plenixPlatform.Dialog,
      {
        open,
        onClose,
        size: "sm",
        icon: "rename",
        title: "Rename category",
        description: "Rename selected category",
        footer: /* @__PURE__ */ React2.createElement(Footer, { onClose, label: "Rename", onApply, values: { currentName: itemName, newName: name } })
      },
      /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Current name" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "currentName", readOnly: true, value: itemName })), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "New name" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "newName", placeholder: "Enter new name...", value: name, onChange: (e) => setName(e.target.value) })))
    );
  }
  const DIALOGS$1 = {
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
  const DIALOGS = { ...DIALOGS$4, ...DIALOGS$3, ...DIALOGS$2, ...DIALOGS$1 };
  const GRID_SIZE = { s: "xs", m: "sm", l: "md", S: "xs", M: "sm", L: "md" };
  const isoDate = (s) => {
    const d = /* @__PURE__ */ new Date(s + " 00:00 UTC");
    return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  };
  const uniq = (values) => Array.from(new Set(values)).sort();
  const CATEGORY_FIELDS = [
    { value: "name", label: "Category name", kind: "text" },
    { value: "count", label: "Assets", kind: "number" },
    { value: "modified", label: "Modified", kind: "date", get: (r) => isoDate(r.modified) },
    { value: "status", label: "Status", kind: "select", options: uniq(CATEGORY_CARDS.map((c) => c.status)) }
  ];
  const COLLECTION_FIELDS = [
    { value: "name", label: "Collection name", kind: "text" },
    { value: "count", label: "Assets", kind: "number" },
    { value: "updated", label: "Updated", kind: "date", get: (r) => isoDate(r.updated) },
    { value: "owner", label: "Owner", kind: "select", options: uniq(COLLECTION_CARDS.map((c) => c.owner)) }
  ];
  const ASSET_FIELDS = [
    { value: "name", label: "Name", kind: "text" },
    { value: "cat", label: "Category", kind: "select", options: uniq(ASSETS.map((a) => a.cat)) },
    { value: "badge", label: "Type", kind: "select", options: uniq(ASSETS.map((a) => a.badge)) },
    { value: "tags", label: "Tags", kind: "multi", options: uniq([].concat.apply([], ASSETS.map((a) => a.tags))) },
    { value: "size", label: "Size", kind: "text" },
    { value: "date", label: "Date added", kind: "date", get: (r) => isoDate(r.date) },
    { value: "owner", label: "Owner", kind: "select", options: uniq(ASSETS.map((a) => a.owner)) },
    { value: "status", label: "Status", kind: "select", options: uniq(ASSETS.map((a) => a.status)) }
  ];
  const COLUMNS = { categories: ["name", "count", "modified", "status"], collections: ["name", "count", "updated", "owner"], assets: ["name", "cat", "badge", "size", "date", "status"] };
  const GALLERY = { layout: "gallery", size: "l", height: "short" };
  const parseSize = (s) => {
    const m = /([\d.]+)\s*(KB|MB|GB|TB|B)/i.exec(s || "");
    if (!m) return 0;
    const v = parseFloat(m[1]);
    return v * { TB: 1e12, GB: 1e9, MB: 1e6, KB: 1e3, B: 1 }[m[2].toUpperCase()];
  };
  const byNumber = (a, b) => (parseFloat(String(a).replace(/,/g, "")) || 0) - (parseFloat(String(b).replace(/,/g, "")) || 0);
  const bySize = (a, b) => parseSize(a) - parseSize(b);
  const byDate = (a, b) => new Date(a).getTime() - new Date(b).getTime();
  const ThumbName = ({ src, icon, name }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Thumbnail, { src, icon }), name);
  function FilesPane({ onUpload, onClose }) {
    const [nodes, setNodes] = React2.useState(FOLDERS$1);
    const [selected, setSelected] = React2.useState("all");
    const [open, setOpen] = React2.useState(FOLDERS_OPEN);
    const [adding, setAdding] = React2.useState(false);
    const [name, setName] = React2.useState("");
    const add = () => {
      const label = name.trim();
      if (!label) {
        setAdding(false);
        return;
      }
      const node = { id: selected + "/" + label.toLowerCase().replace(/[^a-z0-9]+/g, "-"), label, icon: "folder" };
      const put = (list) => list.map((n) => n.id === selected ? { ...n, children: (n.children || []).concat(node) } : n.children ? { ...n, children: put(n.children) } : n);
      setNodes(put(nodes));
      setOpen(open.indexOf(selected) < 0 ? open.concat(selected) : open);
      setName("");
      setAdding(false);
    };
    return (
      // the Files pane: it resizes, folds to a rail and closes (the Asset Manager lets people close it; batch 259)
      /* @__PURE__ */ React2.createElement(
        plenixPlatform.SecondaryPane,
        {
          title: "Files",
          icon: "folder-open",
          collapsible: true,
          resizable: true,
          onClose,
          strings: { close: "Close files pane" },
          actions: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "sm", variant: "primary", icon: "upload", onClick: onUpload }, "Upload")
        },
        /* @__PURE__ */ React2.createElement(plenixPlatform.Tree, { label: "Folders", nodes, selected, onSelect: setSelected, expanded: open, onExpandedChange: setOpen }),
        adding ? /* @__PURE__ */ React2.createElement(
          "input",
          {
            className: "plx-input",
            autoFocus: true,
            value: name,
            placeholder: "Folder name...",
            "aria-label": "New folder name",
            onChange: (e) => setName(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter") add();
              if (e.key === "Escape") {
                setName("");
                setAdding(false);
              }
            },
            onBlur: () => {
              if (!name.trim()) setAdding(false);
            }
          }
        ) : /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", icon: "plus", onClick: () => setAdding(true) }, "New folder"))
      )
    );
  }
  const opts = (values) => Array.from(new Set(values)).sort().map((x) => ({ value: x, label: x, count: values.filter((y) => y === x).length }));
  function nameSearchScreen() {
    const q = new URLSearchParams(location.search).get("q");
    if (q !== null && !location.hash) history.replaceState(history.state, "", location.pathname + location.search + plenixPlatform.screenHref(["search"], { q }));
  }
  function HomePage() {
    nameSearchScreen();
    const loc = plenixPlatform.useScreenLocation({ app: "assets" });
    const toast = plenixPlatform.useToast();
    const act = (msg, tone = "info") => () => toast.show(msg, { tone });
    const params = React2.useMemo(() => new URLSearchParams(location.search), []);
    const [view, setView] = React2.useState(params.get("q") !== null ? "find" : "categories");
    const [find, setFind] = React2.useState({ ...FIND_EMPTY, query: params.get("q") || "" });
    const [saved, setSaved] = React2.useState(SAVED_SEARCHES);
    const [query, setQuery] = React2.useState(params.get("q") || "");
    const [heading, setHeading] = React2.useState("");
    const [active, setActive] = React2.useState("All categories");
    const [mode, setMode] = React2.useState("grid");
    const catView = plenixPlatform.useCollectionView(CATEGORY_FIELDS, { text: (r) => r.name, columns: { order: COLUMNS.categories, hidden: [] }, view: GALLERY });
    const colView = plenixPlatform.useCollectionView(COLLECTION_FIELDS, { text: (r) => r.name + " " + r.owner, columns: { order: COLUMNS.collections, hidden: [] }, view: GALLERY });
    const assetView = plenixPlatform.useCollectionView(ASSET_FIELDS, { text: (r) => [r.name, r.file, r.cat].concat(r.tags).join(" "), quick: { cat: "list", badge: "list", tags: "list" }, columns: { order: COLUMNS.assets, hidden: [] }, view: GALLERY });
    const [selCats, setSelCats] = React2.useState([]);
    const [selAssets, setSelAssets] = React2.useState([]);
    const [asset, setAsset] = React2.useState(null);
    const [viewer, setViewer] = React2.useState(null);
    const [files, setFiles] = React2.useState(false);
    const [right, setRight] = React2.useState(() => ({ collapsed: window.matchMedia(plenixPlatform.below("--plx-sys-shell-inspector-overlay-below")).matches }));
    const [dialog, setDialog] = React2.useState(params.get("upload") ? { id: "uploadModal", props: {} } : null);
    const [dragging, setDragging] = React2.useState(0);
    const openDialog = (id, props = {}) => setDialog({ id, props });
    const browse = view === "categories" || view === "collections";
    const collections = view === "collections";
    const shownQuery = React2.useRef("");
    const viewKey = plenixPlatform.screenHref(loc.parts, Object.assign({}, loc.params, { asset: void 0 }));
    React2.useLayoutEffect(() => {
      const [top, name] = loc.parts;
      setFiles(false);
      setSelCats([]);
      setSelAssets([]);
      if (top === "collections") {
        setView("collections");
        setActive("All collections");
      } else if (top === "category" && name) {
        setView("search");
        setHeading(name);
        setQuery("");
        setActive(name);
      } else if (top === "search") {
        setQuery(loc.params.q || "");
        setActive(null);
        setFind(findOf(loc.params));
        setView("find");
        shownQuery.current = loc.params.q || "";
      } else if (top === "saved" && name) {
        const s = saved.find((x) => x.name === name);
        shownQuery.current = s ? s.query : "";
        setActive(name);
        setFind({ ...FIND_EMPTY, query: s ? s.query : "", filters: s ? s.filters : {}, saved: name });
        setView("find");
      } else {
        setView("categories");
        setActive("All categories");
      }
    }, [viewKey]);
    React2.useLayoutEffect(() => {
      const a = loc.params.asset;
      setAsset(a === void 0 ? null : +a);
      if (a !== void 0) setRight((r) => ({ ...r, collapsed: false }));
    }, [loc.params.asset]);
    const showView = (v) => loc.navigate(v === "collections" ? ["collections"] : "/");
    const openCategory = (name) => loc.navigate(["category", name]);
    const openFind = (f) => f.saved ? loc.navigate(["saved", f.saved]) : loc.navigate(["search"], { q: f.query || "" });
    const openAsset = (id) => loc.navigate(loc.parts, Object.assign({}, loc.params, { asset: id }));
    const onSidebar = (kind, name) => {
      if (kind === "saved") {
        openFind({ saved: name });
        return;
      }
      if (kind === "categories" && name === "All categories") showView("categories");
      else if (kind === "collections" && name === "All collections") showView("collections");
      else openCategory(name);
    };
    const search = (q) => openFind({ query: q });
    const bulk = (action) => {
      const d = bulkDialogFor(action);
      if (!d) {
        toast.show(bulkComingSoon(action), { tone: "info" });
        return;
      }
      const count = d.kind === "category" ? selCats.length || 1 : selAssets.length || 1;
      const names = d.kind === "category" ? CATEGORY_CARDS.filter((c) => selCats.indexOf(c.id) >= 0).map((c) => c.name) : [];
      openDialog(d.id, { count, kind: d.kind, itemName: names[0], onCreateCollection: () => openDialog("newCollectionModal") });
    };
    const toggle = (list, setList, id) => setList(list.indexOf(id) >= 0 ? list.filter((x) => x !== id) : list.concat(id));
    ASSETS.filter((a) => selAssets.indexOf(a.id) >= 0);
    const current = asset === null ? null : ASSETS[asset];
    const catActions = [
      { id: "dl", label: "Download", icon: "download-tray", items: [{ id: "d", label: "Download", onSelect: () => bulk("Download category") }, { id: "da", label: "Download as", onSelect: () => bulk("Download Category as") }] },
      { id: "move", label: "Move", icon: "move", onSelect: () => bulk("Move category") },
      { id: "rename", label: "Rename", icon: "rename", single: true, onSelect: () => bulk("Rename category") },
      { id: "meta", label: "Edit metadata", icon: "fields", single: true, onSelect: () => bulk("Edit category") },
      { id: "status", label: "Change status", icon: "circle-check", onSelect: () => bulk("Change category status") },
      { id: "share", label: "Share", icon: "share", onSelect: () => bulk("Share category") },
      { id: "del", label: "Delete", icon: "trash-detail", danger: true, onSelect: () => bulk("Delete category") }
    ];
    const catSel = { count: selCats.length, noun: "category", plural: "categories", label: "Category actions", actions: catActions, onClear: () => setSelCats([]) };
    const item = (label, action, extra) => ({ id: action, label, onSelect: () => bulk(action), ...extra });
    const assetActions = [
      { id: "dl", label: "Download", icon: "download-tray", items: [item("Download", "Download"), item("Download as", "Download as")] },
      { id: "edit", label: "Edit", icon: "fields", items: [item("Multi edit", "Multi edit"), item("Edit image", "Edit image", { single: true }), item("Update metadata", "Update metadata"), item("Approve", "Approve"), item("Reject", "Reject"), item("Export", "Export"), item("Delete selected assets", "Delete", { danger: true }), item("Print assets", "Print assets")] },
      { id: "add", label: "Add to", icon: "briefcase-plus", items: [item("Cart", "Add to Cart"), item("Bookmarks", "Add to Bookmarks"), item("Document", "Add to Document"), item("Person", "Add to Person"), item("Categories", "Add to Categories"), item("Collections", "Add to Collections"), item("Media profile", "Add to Media Profile")] },
      { id: "move", label: "Move", icon: "move", onSelect: () => bulk("Move") },
      { id: "share", label: "Share", icon: "share", items: [item("Email assets", "Email assets"), item("Publish Assets to Server", "Publish Assets to Server")] },
      { id: "publish", label: "Publish", icon: "upload", onSelect: () => bulk("Publish") },
      { id: "thumb", label: "Regenerate thumbnail", icon: "image-b-2", single: true, onSelect: () => bulk("Regenerate thumbnail") }
    ];
    const assetSel = { count: selAssets.length, noun: "asset", label: "Asset actions", actions: assetActions, onClear: () => setSelAssets([]) };
    const searchSelection = { ...assetSel, total: ASSETS.length, onSelectAll: () => setSelAssets(ASSETS.map((a) => a.id)) };
    const found = findAssets(find);
    const saveSearch = () => openDialog("saveSearchModal", { onSave: (v) => {
      const name = (v.name || "").trim() || (find.query ? "Search: " + find.query : "Saved search");
      setSaved(saved.filter((x) => x.name !== name).concat([{ name, query: find.query, filters: find.filters }]));
      if (view === "find") setFind({ ...find, saved: name });
      setActive(name);
    } });
    const commitFind = (next) => {
      setFind(next);
      loc.navigate(["search"], findParams(next));
    };
    const committed = find.query === shownQuery.current;
    const onFindKey = (e) => {
      if (e.key === "Enter" && view === "find" && !committed && e.target.closest(".plx-search-ws__query")) commitFind(find);
    };
    const onFindBlur = (e) => {
      if (view === "find" && !committed && e.target.closest(".plx-search-ws__query")) commitFind(find);
    };
    const setFindQuery = (q) => q ? setFind({ ...find, query: q, saved: null }) : commitFind({ ...find, query: "", saved: null });
    const setFindFilter = (id, value) => commitFind({ ...find, filters: { ...find.filters, [id]: value }, saved: null });
    const filterDefs = [
      { id: "type", label: "Type", multiple: true, options: opts(ASSETS.map((a) => a.badge)), value: find.filters.type || [] },
      { id: "cat", label: "Category", multiple: true, options: opts(ASSETS.map((a) => a.cat)), value: find.filters.cat || [] },
      { id: "tags", label: "Tags", multiple: true, options: opts([].concat.apply([], ASSETS.map((a) => a.tags))), value: find.filters.tags || [] },
      { id: "owner", label: "Owner", options: opts(ASSETS.map((a) => a.owner)), value: find.filters.owner || null },
      { id: "date", label: "Date", options: opts(ASSETS.map((a) => MONTH(a.date))), value: find.filters.date || null },
      { id: "status", label: "Status", options: opts(ASSETS.map((a) => a.status)), value: find.filters.status || null }
    ];
    const cv = view === "categories" ? catView : view === "collections" ? colView : assetView;
    const fieldsOf = view === "categories" ? CATEGORY_FIELDS : view === "collections" ? COLLECTION_FIELDS : ASSET_FIELDS;
    const gallery = view === "find" ? mode === "grid" : cv.view.layout === "gallery";
    const gridSize = GRID_SIZE[view === "find" ? "L" : cv.view.size];
    const shown = (rows) => rows.filter(cv.test).sort(plenixPlatform.compareLevels(fieldsOf, cv.tableProps.sort));
    const assetPick = plenixPlatform.useSelection({ items: (view === "find" ? found : shown(ASSETS)).map((x) => x.id), mode: "multiple", selected: selAssets, onChange: setSelAssets });
    const tableProps = view === "find" ? {} : cv.tableProps;
    let content;
    if (view === "categories") {
      content = gallery ? /* @__PURE__ */ React2.createElement(plenixPlatform.ContentGrid, { size: gridSize, label: "Categories" }, shown(CATEGORY_CARDS).map((c) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.MediaCard,
        {
          key: c.id,
          src: c.thumb,
          title: c.name,
          meta: plenixPlatform.dataPhrase("{n} assets", { n: c.count }),
          selected: selCats.indexOf(c.id) >= 0,
          selecting: selCats.length > 0,
          onSelectChange: () => toggle(selCats, setSelCats, c.id),
          selectLabel: "Select " + c.name,
          onOpen: () => openCategory(c.name),
          actions: /* @__PURE__ */ React2.createElement(plenixPlatform.Menu, { label: "Options for " + c.name, placement: "bottom-end", trigger: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", iconOnly: true, icon: "menu-lines", label: "Options for " + c.name }) }, CARD_MENU.map(([icon, label, msg]) => /* @__PURE__ */ React2.createElement(plenixPlatform.MenuItem, { key: label, icon, danger: label === "Delete", onSelect: act(msg, "info") }, label)))
        }
      ))) : /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Categories", data: CATEGORY_CARDS, selectable: true, selected: selCats, onSelectionChange: setSelCats, onRowClick: (record) => openCategory(record.name), ...tableProps, columns: [
        { title: "Category name", field: "name", kind: "name", frozen: true, render: (r) => /* @__PURE__ */ React2.createElement(ThumbName, { src: r.thumb, name: r.name }) },
        { title: "Assets", field: "count", kind: "data", sorter: byNumber },
        { title: "Modified", field: "modified", kind: "data", sorter: byDate },
        { title: "Status", field: "status", kind: "center", render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: "success" }, r.status) }
      ] });
    } else if (view === "collections") {
      content = gallery ? /* @__PURE__ */ React2.createElement(plenixPlatform.ContentGrid, { size: gridSize, label: "Collections" }, shown(COLLECTION_CARDS).map((c) => /* @__PURE__ */ React2.createElement(plenixPlatform.MediaCard, { key: c.id, icon: "briefcase", title: c.name, meta: plenixPlatform.dataPhrase("{n} assets", { n: c.count }), onOpen: () => openCategory(c.name) }))) : /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Collections", data: COLLECTION_CARDS, onRowClick: (record) => openCategory(record.name), ...tableProps, columns: [
        { title: "Collection name", field: "name", kind: "name", frozen: true, render: (r) => /* @__PURE__ */ React2.createElement(ThumbName, { icon: "briefcase", name: r.name }) },
        { title: "Assets", field: "count", kind: "data", sorter: byNumber },
        { title: "Updated", field: "updated", kind: "data", sorter: byDate },
        { title: "Owner", field: "owner" }
      ] });
    } else {
      const list = view === "find" ? found : ASSETS;
      content = gallery ? /* @__PURE__ */ React2.createElement(plenixPlatform.ContentGrid, { size: gridSize, label: "Search results" }, (view === "find" ? list : shown(list)).map((a) => /* @__PURE__ */ React2.createElement(
        plenixPlatform.MediaCard,
        {
          key: a.id,
          src: a.thumb,
          title: a.name,
          meta: a.cat,
          badge: /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: a.typeIcon, size: "md", label: a.badge }),
          selected: selAssets.indexOf(a.id) >= 0,
          selecting: selAssets.length > 0,
          onSelectChange: (on, e) => assetPick.choose(a.id, e),
          selectLabel: "Select " + a.name,
          onOpen: () => openAsset(a.id),
          "aria-current": asset === a.id ? "true" : void 0
        }
      ))) : /* @__PURE__ */ React2.createElement(plenixPlatform.DataGrid, { label: "Search results", data: list, selectable: true, selected: selAssets, onSelectionChange: setSelAssets, onRowClick: (record) => openAsset(record.id), ...tableProps, columns: [
        { title: "Name", field: "name", kind: "name", frozen: true, render: (r) => /* @__PURE__ */ React2.createElement(ThumbName, { src: r.thumb, name: r.name }) },
        { title: "Category", field: "cat", kind: "center", render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "xs" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "folder", size: "xs" }), r.cat) },
        { title: "Type", field: "badge", kind: "data" },
        { title: "Size", field: "size", kind: "data", align: "right", headerAlign: "right", sorter: bySize },
        { title: "Date added", field: "date", kind: "data", sorter: byDate },
        { title: "Status", field: "status", kind: "center", render: (r) => /* @__PURE__ */ React2.createElement(plenixPlatform.Badge, { tone: r.status === "Complete" ? "success" : "neutral" }, r.status) }
      ] });
    }
    const noun = view === "categories" ? ["category", "categories"] : view === "collections" ? ["collection", "collections"] : ["asset", "assets"];
    const totals = { categories: CATEGORY_CARDS, collections: COLLECTION_CARDS, search: ASSETS };
    const n = view === "find" ? 0 : cv.count(totals[view] || []);
    const barActions = view === "categories" ? [{ id: "new", label: "New category", icon: "add", onSelect: () => openDialog("newCatModal") }] : view === "collections" ? [{ id: "new", label: "New collection", icon: "add", onSelect: () => openDialog("newCollectionModal") }] : [{ id: "upload", label: "Upload", icon: "upload", onSelect: () => openDialog("uploadModal") }, { id: "save", label: "Save search", icon: "save", onSelect: saveSearch }];
    const quick = (key, label, icon, word) => Object.assign({ id: key, label, icon, noun: word, options: (ASSET_FIELDS.find((f) => f.value === key) || {}).options }, cv.quickProps(key));
    const bar = view === "find" ? null : /* @__PURE__ */ React2.createElement(
      plenixPlatform.CommandBar,
      {
        label: view === "categories" ? "Categories" : view === "collections" ? "Collections" : "Assets",
        actions: barActions,
        count: n + " " + (n === 1 ? noun[0] : noun[1]),
        find: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.CommandBarSearch, { ...cv.searchProps, placeholder: "Search " + noun[1] }), /* @__PURE__ */ React2.createElement(plenixPlatform.FilterPanel, { ...cv.filterProps })),
        quickFilters: view === "search" ? [quick("cat", "Category", "grid-2x2", "category"), quick("badge", "Type", "image-b", "type"), quick("tags", "Tags", "tags", "tag")] : [],
        view: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SortPanel, { ...cv.sortProps }), /* @__PURE__ */ React2.createElement(plenixPlatform.GroupPanel, { ...cv.groupProps }), /* @__PURE__ */ React2.createElement(plenixPlatform.ColumnsMenu, { ...cv.columnsProps, fields: fieldsOf.filter((f) => COLUMNS[view === "search" ? "assets" : view].indexOf(f.value) >= 0) }), /* @__PURE__ */ React2.createElement(plenixPlatform.ViewMenu, { ...cv.viewProps })),
        selection: view === "categories" ? catSel : view === "search" ? assetSel : null
      }
    );
    const pagination = view === "categories" ? /* @__PURE__ */ React2.createElement(plenixPlatform.Pagination, { page: 1, pageCount: 3, total: CATEGORY_TOTAL, perPage: 16, perPageOptions: [16, 32, 64], onPageChange: (n2) => toast.show("Page " + n2, { tone: "info" }), onPerPageChange: () => {
    } }) : view === "collections" ? /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Showing 1\u20134 of 4 collections") : view === "find" ? null : /* @__PURE__ */ React2.createElement(plenixPlatform.Pagination, { page: 1, pageCount: 27, total: ASSET_TOTAL, perPage: 8, perPageOptions: [8, 16, 32, 64], onPageChange: (n2) => toast.show("Page " + n2, { tone: "info" }), onPerPageChange: () => {
    } });
    const title = view === "categories" ? "Categories" : view === "collections" ? "Collections" : heading || "Search results";
    const sidebar = /* @__PURE__ */ React2.createElement(
      Sidebar,
      {
        mode: view === "search" ? "search" : "browse",
        active,
        saved,
        onRemoveSaved: (n2) => setSaved(saved.filter((x) => x.name !== n2)),
        onOpen: onSidebar,
        onAdd: (id) => id === "saveSearchModal" ? saveSearch() : openDialog(id),
        onFiles: () => setFiles(!files),
        filesOpen: files
      }
    );
    const details = browse ? /* @__PURE__ */ React2.createElement(CategoryInspector, { collection: collections, act, onDialog: (id) => openDialog(id) }) : /* @__PURE__ */ React2.createElement(AssetInspector, { asset: current, act, onDialog: (id) => openDialog(id), onPreview: () => setViewer(asset) });
    const filesPane = /* @__PURE__ */ React2.createElement(FilesPane, { onUpload: () => openDialog("uploadModal"), onClose: () => setFiles(false) });
    const dropHandlers = {
      onDragEnter: (e) => {
        e.preventDefault();
        setDragging((n2) => n2 + 1);
      },
      onDragLeave: (e) => {
        e.preventDefault();
        setDragging((n2) => Math.max(0, n2 - 1));
      },
      onDragOver: (e) => e.preventDefault(),
      onDrop: (e) => {
        e.preventDefault();
        setDragging(0);
        const n2 = e.dataTransfer.files.length;
        if (n2) toast.show(n2 + " file(s) ready to upload", { tone: "success" });
      }
    };
    const Current = dialog && DIALOGS[dialog.id];
    const panel = /* @__PURE__ */ React2.createElement(
      plenixPlatform.SidePanel,
      {
        title: "Details",
        label: browse ? "Details" : "Asset details",
        icon: "circle-info",
        open: !right.collapsed,
        onOpenChange: (o) => setRight({ ...right, collapsed: !o }),
        collapseLabel: "Minimize panel",
        resizable: true,
        footer: /* @__PURE__ */ React2.createElement(InspectorFooter, { act })
      },
      details
    );
    return /* @__PURE__ */ React2.createElement(AssetPage, { title: "Assets", query: view === "find" ? find.query : query, onSearch: search, sideNav: sidebar, panel, onUpload: () => openDialog("uploadModal") }, /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, { gap: "none", align: "stretch", grow: true }, files ? filesPane : null, /* @__PURE__ */ React2.createElement(plenixPlatform.PageContent, { "aria-labelledby": "home-title", onKeyDown: onFindKey, onBlur: onFindBlur, ...browse ? dropHandlers : {} }, view === "find" ? /* @__PURE__ */ React2.createElement(
      plenixPlatform.SearchWorkspace,
      {
        title: find.saved || (find.query ? "Search results" : "Search"),
        query: find.query,
        onQueryChange: setFindQuery,
        placeholder: "Search assets by name, filename, metadata\u2026",
        noun: "asset",
        count: found.length,
        filters: filterDefs,
        onFilterChange: setFindFilter,
        onClearAll: () => commitFind({ ...find, filters: {}, saved: null }),
        sort: { value: find.sort, options: ["Relevance", "Newest", "Oldest", "Name A\u2013Z", "Name Z\u2013A", "Size"], onChange: (o) => commitFind({ ...find, sort: o }) },
        view: { value: mode, onChange: setMode },
        onSave: saveSearch,
        selection: searchSelection
      },
      content
    ) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h2", id: "home-title", variant: "title" }, title), bar, content, pagination), dragging ? /* @__PURE__ */ React2.createElement(plenixPlatform.DropZone, { overlay: true, "aria-hidden": "true" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "upload", size: "lg" }), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "strong" }, "Drop files to upload"), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { variant: "secondary" }, "SVG, PNG, JPG, AI, PSD up to 200 MB")) : null)), /* @__PURE__ */ React2.createElement(
      plenixPlatform.MediaViewer,
      {
        open: viewer !== null,
        onClose: () => setViewer(null),
        label: "Asset preview",
        index: viewer === null ? 0 : viewer,
        onIndexChange: setViewer,
        items: ASSETS.map((a) => ({ src: a.thumb, alt: a.name, title: a.name, meta: [a.cat, a.size, a.dims, a.fmt] })),
        actions: ["download-tray:Download", "share:Share", "pencil:Edit", "circle-info:Info"].map((s) => {
          const [ic, l] = s.split(":");
          return /* @__PURE__ */ React2.createElement("button", { key: l, type: "button", className: "plx-media-viewer__control", onClick: () => setViewer(null) }, /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: ic, size: "sm" }), l);
        })
      }
    ), Current ? /* @__PURE__ */ React2.createElement(Current, { open: true, onClose: () => setDialog(null), ...dialog.props }) : null);
  }
  const PRESETS = plenixPlatform.IMAGE_EDITOR_STEPS.presets, RATIOS = plenixPlatform.IMAGE_EDITOR_STEPS.ratios;
  const RATIO_CHOICES = ["Original", "Free transform"].concat(RATIOS.map((r) => r.label));
  const ratioId = (label) => {
    const r = RATIOS.find((x) => x.label === label);
    return r ? r.id : "";
  };
  const snap = (v, step) => Math.round(v / step) * step;
  const FONTS = plenixPlatform.IMAGE_EDITOR_STEPS.fonts;
  const EXPORTS = ["PNG", "JPEG", "SVG", "TIFF", "PSD", "EPS", "GIF", "BMP", "WebP", "PDF"];
  const SLIDERS = plenixPlatform.IMAGE_EDITOR_STEPS.sliders;
  const TOOLS = [["filters", "Filters", "ed-filters"], ["crop", "Crop", "ed-crop"], ["rotate", "Rotate", "ed-rotate-cw"], ["text", "Text", "ed-text"], ["image", "Image", "ed-image"]];
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
    preset: "",
    rotate: 0,
    flipX: false,
    flipY: false,
    crop: "",
    texts: [],
    overlay: null
  };
  function useStatus() {
    const [msg, setMsg] = React2.useState("");
    const timer = React2.useRef(null);
    const say = (m) => {
      setMsg(m);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMsg(""), 2600);
    };
    return [msg, say];
  }
  function ImageEditorPage() {
    const [edit, setEdit] = React2.useState(START);
    const [history2, setHistory] = React2.useState({ list: [JSON.stringify(START)], at: 0 });
    const [zoom, setZoom] = React2.useState(0);
    const [tool, setTool] = React2.useState("filters");
    const [open, setOpen] = React2.useState(() => !window.matchMedia(plenixPlatform.below("--plx-sys-shell-phone-below")).matches);
    const [pending, setPending] = React2.useState(null);
    const [overlayOpts, setOverlayOpts] = React2.useState({ opacity: 100, scale: 100 });
    const [text, setText] = React2.useState({ text: "", font: "Lato", weight: "Regular", color: "brown", align: "left" });
    const [ratio, setRatio] = React2.useState("Original");
    const [dragOver, setDragOver] = React2.useState(false);
    const [msg, say] = useStatus();
    const file = React2.useRef(null);
    const [saved, setSaved] = React2.useState(() => JSON.stringify(START));
    plenixPlatform.useUnsavedGuard(JSON.stringify(edit) !== saved || !!pending, "Your edits to this image have not been saved.");
    const save = (message) => {
      setSaved(JSON.stringify(edit));
      say(message);
    };
    const commit = (next, message) => {
      setEdit(next);
      const snap2 = JSON.stringify(next);
      setHistory((h) => snap2 === h.list[h.at] ? h : { list: h.list.slice(0, h.at + 1).concat(snap2), at: h.at + 1 });
      if (message) say(message);
    };
    const change = (patch, message) => commit({ ...edit, ...patch }, message);
    const step = (by) => {
      const next = history2.at + by;
      if (next < 0) {
        say("Nothing to undo");
        return;
      }
      if (next >= history2.list.length) {
        say("Nothing to redo");
        return;
      }
      const st = JSON.parse(history2.list[next]);
      setHistory({ ...history2, at: next });
      setEdit(st);
      setPending(null);
      setRatio((RATIOS.find((r) => r.id === st.crop) || { label: "Original" }).label);
      say(by < 0 ? "Undone" : "Redone");
    };
    const zoomTo = (n) => {
      const z = Math.max(plenixPlatform.IMAGE_EDITOR_STEPS.zoom.min, Math.min(plenixPlatform.IMAGE_EDITOR_STEPS.zoom.max, n));
      setZoom(z);
      say("Zoom " + Math.round(Math.pow(plenixPlatform.IMAGE_EDITOR_STEPS.zoom.base, z) * 100) + "%");
    };
    const chooseTool = (id) => {
      if (id === tool && open) {
        setOpen(false);
        return;
      }
      setTool(id);
      setOpen(true);
    };
    const useFile = (f) => {
      if (!f || f.type.indexOf("image/") !== 0) {
        say("That file is not an image");
        return;
      }
      setPending({ src: URL.createObjectURL(f), ...overlayOpts });
      say("Image ready: adjust it, then choose Compose");
    };
    const sat = Math.max(plenixPlatform.IMAGE_EDITOR_STEPS.saturate.min, Math.min(plenixPlatform.IMAGE_EDITOR_STEPS.saturate.max, Math.round((edit.saturation / 100 + edit.vibrance / 200) * plenixPlatform.IMAGE_EDITOR_STEPS.saturate.per)));
    const look = {
      "data-plx-brightness": snap(edit.brightness, plenixPlatform.IMAGE_EDITOR_STEPS.step),
      "data-plx-contrast": snap(edit.contrast, plenixPlatform.IMAGE_EDITOR_STEPS.step),
      "data-plx-saturate": sat,
      "data-plx-hue": snap(edit.hueRotation, plenixPlatform.IMAGE_EDITOR_STEPS.step),
      "data-plx-blur": Math.round(edit.blur),
      "data-plx-preset": edit.preset || void 0,
      "data-plx-ratio": edit.crop || void 0,
      "data-plx-rotate": (edit.rotate % 360 + 360) % 360,
      "data-plx-flip-x": edit.flipX ? "" : void 0,
      "data-plx-flip-y": edit.flipY ? "" : void 0
    };
    const overlay = pending || edit.overlay;
    const header = /* @__PURE__ */ React2.createElement("header", { className: "plx-image-editor__bar" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar, { label: "Editor" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => save("Saved") }, "Save"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: () => save("Saved as a copy") }, "Save as"), /* @__PURE__ */ React2.createElement(plenixPlatform.Menu, { label: "Export as", trigger: /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { caret: true }, "Export as") }, EXPORTS.map((x) => /* @__PURE__ */ React2.createElement(plenixPlatform.MenuItem, { key: x, onSelect: () => say("Exported as " + x) }, x)))), /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-copy", label: "Copy", onClick: () => say("Copied") }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-download", label: "Download", onClick: () => say("Download started") })), /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-undo", label: "Undo", disabled: history2.at === 0, onClick: () => step(-1) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-redo", label: "Redo", disabled: history2.at >= history2.list.length - 1, onClick: () => step(1) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Toolbar.Group, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-zoom-in", label: "Zoom in", onClick: () => zoomTo(zoom + 1) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-zoom-out", label: "Zoom out", onClick: () => zoomTo(zoom - 1) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "ghost", iconOnly: true, icon: "ed-recenter", label: "Recenter", onClick: () => zoomTo(0) }))));
    const panels = {
      filters: /* @__PURE__ */ React2.createElement(React2.Fragment, null, SLIDERS.map(({ key: k, label, min, max, unit, step: by }) => /* @__PURE__ */ React2.createElement(plenixPlatform.Slider, { key: k, label, min, max, step: by || plenixPlatform.IMAGE_EDITOR_STEPS.step, unit, value: edit[k], onChange: (v) => setEdit({ ...edit, [k]: v }), onCommit: (v) => change({ [k]: v }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.Stack, { gap: "sm" }, [["sharpen", "Sharpen"], ["emboss", "Emboss"], ["edge", "Edge"]].map(([k, l]) => /* @__PURE__ */ React2.createElement(plenixPlatform.Checkbox, { key: k, name: k, label: l, checked: edit[k], onChange: (e) => change({ [k]: e.target.checked }) }))), /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h3", variant: "eyebrow" }, "Built-In Filters"), /* @__PURE__ */ React2.createElement("div", { className: "plx-image-editor__presets", role: "group", "aria-label": "Built-in filters" }, PRESETS.map((p) => /* @__PURE__ */ React2.createElement("button", { key: p.id, type: "button", className: "plx-image-editor__preset", "aria-pressed": edit.preset === p.id, onClick: () => change({ preset: edit.preset === p.id ? "" : p.id }) }, /* @__PURE__ */ React2.createElement("img", { src: "assets/editor/filter-" + p.id + ".svg", alt: "", width: "100", height: "56" }), /* @__PURE__ */ React2.createElement("span", null, p.label))))),
      crop: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Aspect ratio" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "aspectRatio", value: ratio, onChange: (e) => setRatio(e.target.value) }, RATIO_CHOICES.map((r) => /* @__PURE__ */ React2.createElement("option", { key: r }, r)))), /* @__PURE__ */ React2.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => {
        const c = ratioId(ratio);
        change({ crop: c }, c ? "Cropped to " + ratio : "Crop cleared");
      } }, "Crop"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { onClick: () => {
        setRatio("Original");
        change({ crop: "" }, "Crop cleared");
      } }, "Reset"))),
      rotate: /* @__PURE__ */ React2.createElement("div", { className: "plx-image-editor__presets" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { icon: "ed-rotate-ccw", onClick: () => change({ rotate: edit.rotate - 90 }) }, "-90\xB0"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { icon: "ed-rotate-cw", onClick: () => change({ rotate: edit.rotate + 90 }) }, "+90\xB0"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { icon: "ed-flip-x", onClick: () => change({ flipX: !edit.flipX }) }, "Flip X"), /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { icon: "ed-flip-y", onClick: () => change({ flipY: !edit.flipY }) }, "Flip Y")),
      text: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(plenixPlatform.Input, { name: "text", placeholder: "Enter text...", "aria-label": "Text", value: text.text, onChange: (e) => setText({ ...text, text: e.target.value }) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Font family" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Select, { name: "fontFamily", value: text.font, onChange: (e) => setText({ ...text, font: e.target.value }) }, FONTS.map((x) => /* @__PURE__ */ React2.createElement("option", { key: x }, x)))), /* @__PURE__ */ React2.createElement(plenixPlatform.SegmentedControl, { label: "Font weight", value: text.weight, onChange: (w) => setText({ ...text, weight: w }), options: ["Regular", "Bold", "Italic"].map((w) => ({ value: w, label: w })) }), /* @__PURE__ */ React2.createElement(plenixPlatform.Field, { label: "Color" }, /* @__PURE__ */ React2.createElement(plenixPlatform.ColorPicker, { label: "Text color", size: "sm", value: text.color, onChange: (h) => setText({ ...text, color: h }) })), /* @__PURE__ */ React2.createElement(plenixPlatform.ButtonGroup, { label: "Align" }, [["left", "ed-align-left"], ["center", "ed-align-center"], ["right", "ed-align-right"]].map(([a, ic]) => /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { key: a, size: "sm", iconOnly: true, icon: ic, label: "Align " + a, pressed: text.align === a, onClick: () => setText({ ...text, align: a }) }))), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => {
        const t = text.text.trim();
        if (!t) {
          say("Type some text first");
          return;
        }
        change({ texts: edit.texts.concat({ text: t, font: text.font, weight: text.weight, color: text.color, align: text.align }) }, "Text added");
        setText({ ...text, text: "" });
      } }, "Insert"))),
      image: /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
        plenixPlatform.DropZone,
        {
          as: "button",
          active: dragOver,
          className: "plx-u-text-content-muted",
          onClick: () => file.current.click(),
          onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
          },
          onDragLeave: () => setDragOver(false),
          onDrop: (e) => {
            e.preventDefault();
            setDragOver(false);
            useFile(e.dataTransfer.files[0]);
          }
        },
        /* @__PURE__ */ React2.createElement(plenixPlatform.Icon, { name: "ed-download-2", size: "lg" }),
        /* @__PURE__ */ React2.createElement("span", null, "Drop image to overlay", /* @__PURE__ */ React2.createElement("br", null), "or click to browse")
      ), /* @__PURE__ */ React2.createElement(
        "input",
        {
          ref: file,
          type: "file",
          name: "overlayFile",
          accept: "image/*",
          className: "plx-visually-hidden",
          tabIndex: -1,
          "aria-label": "Overlay image file",
          onChange: (e) => {
            useFile(e.target.files[0]);
            e.target.value = "";
          }
        }
      ), /* @__PURE__ */ React2.createElement(plenixPlatform.Slider, { label: "Opacity", unit: "%", min: plenixPlatform.IMAGE_EDITOR_STEPS.overlay.opacity.min, max: plenixPlatform.IMAGE_EDITOR_STEPS.overlay.opacity.max, step: plenixPlatform.IMAGE_EDITOR_STEPS.step, value: overlayOpts.opacity, onChange: (v) => {
        setOverlayOpts({ ...overlayOpts, opacity: v });
        if (pending) setPending({ ...pending, opacity: v });
      } }), /* @__PURE__ */ React2.createElement(plenixPlatform.Slider, { label: "Scale", unit: "%", min: plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.min, max: plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.max, step: plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.step, value: overlayOpts.scale, onChange: (v) => {
        setOverlayOpts({ ...overlayOpts, scale: v });
        if (pending) setPending({ ...pending, scale: v });
      } }), /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => {
        if (!pending) {
          say("Choose an image first");
          return;
        }
        const p = pending;
        setPending(null);
        change({ overlay: p }, "Image added");
      } }, "Compose")))
    };
    const toolLabel = TOOLS.find((t) => t[0] === tool)[1];
    return /* @__PURE__ */ React2.createElement(plenixPlatform.AppShell, { header, page: "editor", mainClassName: "plx-shell-main" }, /* @__PURE__ */ React2.createElement("h1", { className: "plx-visually-hidden" }, "Plenix Asset Manager: Image Editor"), /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail, { label: "Tools", showLabels: true }, TOOLS.map(([id, label, icon]) => /* @__PURE__ */ React2.createElement(plenixPlatform.ToolRail.Item, { key: id, icon, label, pressed: open && tool === id, onClick: () => chooseTool(id) }))), open ? /* @__PURE__ */ React2.createElement("aside", { "aria-label": toolLabel + " options", className: "plx-image-editor__panel" }, /* @__PURE__ */ React2.createElement(plenixPlatform.Text, { as: "h2", variant: "eyebrow" }, toolLabel), panels[tool]) : null, /* @__PURE__ */ React2.createElement("div", { className: "plx-image-editor__canvas" }, /* @__PURE__ */ React2.createElement("div", { className: "plx-image-editor__frame", "data-plx-zoom": zoom }, /* @__PURE__ */ React2.createElement(
      "img",
      {
        src: "assets/editor/artwork.svg",
        width: "420",
        height: "420",
        alt: "Image being edited: gold Coptic cross on a brown background",
        className: "plx-image-editor__image" + (edit.crop ? " plx-image-editor__image--cropped" : ""),
        ...look
      }
    ), edit.texts.map((t, i) => /* @__PURE__ */ React2.createElement(
      "span",
      {
        key: i,
        className: "plx-image-editor__text" + (t.weight === "Bold" ? " plx-image-editor__text--bold" : "") + (t.weight === "Italic" ? " plx-image-editor__text--italic" : "") + (t.align === "center" ? " plx-image-editor__text--center" : t.align === "right" ? " plx-image-editor__text--end" : ""),
        "data-plx-color": t.color,
        "data-plx-font": t.font,
        "data-plx-top": Math.min(plenixPlatform.IMAGE_EDITOR_STEPS.textTop.max, snap(40 + i * 12, plenixPlatform.IMAGE_EDITOR_STEPS.step))
      },
      t.text
    )), overlay ? /* @__PURE__ */ React2.createElement("img", { src: overlay.src, alt: "", className: "plx-image-editor__overlay", "data-plx-opacity": snap(overlay.opacity, plenixPlatform.IMAGE_EDITOR_STEPS.step), "data-plx-scale": snap(overlay.scale, plenixPlatform.IMAGE_EDITOR_STEPS.overlay.scale.step) }) : null), /* @__PURE__ */ React2.createElement("div", { role: "status", "aria-live": "polite", className: "plx-image-editor__status" }, msg)));
  }
  const PAGES = {
    "my-account": MyAccountPage,
    "system-settings": SystemSettingsPage,
    home: HomePage,
    "image-editor": ImageEditorPage
  };
  const ISLANDS = {
    page: (el) => {
      const Page = PAGES[el.getAttribute("data-plx-page")];
      return Page ? /* @__PURE__ */ React2.createElement(Page, null) : null;
    }
  };
  function mount(el) {
    const render = ISLANDS[el.getAttribute("data-plx-mount")];
    if (!render || el.hasAttribute("data-plx-mounted")) return;
    const tree = render(el);
    el.setAttribute("data-plx-mounted", "");
    client.createRoot(el).render(/* @__PURE__ */ React2.createElement(plenixPlatform.DirectionProvider, { follow: true }, /* @__PURE__ */ React2.createElement(plenixPlatform.ThemeProvider, null, /* @__PURE__ */ React2.createElement(plenixPlatform.SessionProvider, { session: SUITE_SESSION }, /* @__PURE__ */ React2.createElement(plenixPlatform.ToastProvider, null, tree)))));
  }
  function mountAll(root) {
    root.querySelectorAll("[data-plx-mount]").forEach(mount);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => mountAll(document));
  else mountAll(document);
})(React, ReactDOM, Plenix);
