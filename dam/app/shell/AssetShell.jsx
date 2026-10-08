/* Plenix asset app · shell (app/shell/AssetShell.jsx): what every asset page shares, in React.
   <AssetPage title="My Account" current="account" sideNav={<NavPane…/>} panel={<SidePanel…/>}>…</AssetPage> renders the AppShell — skip link, header, the page's <main>
   (with its visually hidden h1) and the StatusBar (the toast host is mounted around every page by app/assets.jsx). current: "account" | "system" marks the account
   button as the current place on the settings pages. On the home page, onSearch(query) and onUpload() handle search and
   upload in place (query: the initial search text); elsewhere they go to the home page (index.html?q=… / ?upload=1).
   Header: brand (home), asset search (Enter searches on the home page; Ctrl K or ⌘K focuses it), Upload (opens the upload
   dialog on the home page), notifications and the account menu. Replaces partials/topbar.html on the pages that have
   moved to React. */
import React from 'react';
import { AppHeader, SearchField, StatusDot, StatusBar, AppShell } from 'plenix-platform';

// DATA: the library totals come from the back end; this is the sample record the pages show until then. Who is signed in
// and their notifications come from the Platform session (SessionProvider, mounted in app/assets.jsx).
const LIBRARY = { summary: '4,546 assets | 12.4 GB', owner: 'Lighthouse Way' };

export function AssetHeader({ current, query = '', onSearch, onUpload }) {
  const [q, setQ] = React.useState(query);
  const onSearchKey = (e) => {
    if (e.key !== 'Enter') return;
    if (onSearch) onSearch(q.trim());
    else if (q.trim()) location.href = 'index.html?q=' + encodeURIComponent(q.trim());
  };
  // the universal Plenix header: this is the Asset Manager; the header brings the pinned applications, search (Ctrl K),
  // notifications, the account and the switcher
  return (
    <AppHeader tone="accent" currentApp="assets" appsRoot="../" brandHref="index.html"
      action={<AppHeader.Action icon="hdr-upload" onClick={() => { if (onUpload) onUpload(); else location.href = 'index.html?upload=1'; }}>Upload</AppHeader.Action>}
      search={<SearchField value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} onKeyDown={onSearchKey}
        label="Search assets" placeholder="Search assets by name, tag, or keyword..." shortcut="Ctrl K" onAccent />}
      account={<AppHeader.Account current={current === 'system' ? 'settings' : current} myAccount={{ href: 'settings-myaccount.html' }} settings={{ href: 'settings-system.html' }} />} />
  );
}

export function AssetStatusBar() {
  return <StatusBar start={<><StatusDot tone="success" label="Library online" /><span>{LIBRARY.summary}</span></>} end={LIBRARY.owner} />;
}

export function AssetPage({ title, current, query, onSearch, onUpload, sideNav, panel, children }) {
  return (
    <AppShell header={<AssetHeader current={current} query={query} onSearch={onSearch} onUpload={onUpload} />} sideNav={sideNav} panel={panel} footer={<AssetStatusBar />} mainClassName="plx-shell-main">
      <h1 className="plx-visually-hidden">{'Plenix Asset Manager: ' + title}</h1>
      {children}
    </AppShell>
  );
}
