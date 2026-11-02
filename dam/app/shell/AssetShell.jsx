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
import React from 'react';
import { ActivityList, AppHeader, Icon, SearchField, SectionHeading, StatusIcon, StatusBar, AppShell, Text, Thumbnail, navigate, screenHref, useViewState, dataPhrase } from 'plenix-platform';
import { FIND_EMPTY, findAssets } from '../pages/home/findAssets.js';
import { afterSearchView } from '../../../suite/searchView.js';

// DATA: the library totals come from the back end; this is the sample record the pages show until then. Who is signed in
// and their notifications come from the Platform session (SessionProvider, mounted in app/assets.jsx).
// the library's facts: the counts and sizes in the data font, the words in the normal font (issue 260)
const LIBRARY = { assets: 4546, size: '12.4 GB', owner: 'Lighthouse Way' };

const RECENT_MAX = 5;

function AssetHeader({ current, query = '', onSearch, onUpload }) {
  const [q, setQ] = React.useState(query);
  const [kept, updateKept] = useViewState('assets');
  const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
  const run = (text) => {
    const t = text.trim();
    if (t) updateKept((v) => ({ recentSearches: [t].concat((v.recentSearches || []).filter((x) => x !== t)).slice(0, RECENT_MAX) }));
    setQ(t);
    afterSearchView(() => {
      if (onSearch) onSearch(t);
      else if (t) location.href = 'index.html?q=' + encodeURIComponent(t);
    });
  };
  const onSearchKey = (e) => { if (e.key === 'Enter') run(q); };
  // an asset from the quick results: the search screen with the asset open (on another page, the home page's)
  const openAsset = (a) => afterSearchView(() => {
    const t = q.trim();
    if (onSearch) navigate(['search'], { q: t, asset: a.id });
    else location.href = 'index.html' + screenHref(['search'], { q: t, asset: a.id });
  });
  const typed = q.trim().toLowerCase();
  const recentShown = recent.filter((x) => x.toLowerCase().indexOf(typed) >= 0);
  const suggestions = recentShown.length ? <>
    <SectionHeading>Recent searches</SectionHeading>
    <ActivityList label="Recent searches">{recentShown.map((x) => (
      <ActivityList.Item key={x} leading={<Icon name="clock" />} title={x} onOpen={() => run(x)} />
    ))}</ActivityList>
  </> : null;
  const found = typed ? findAssets({ ...FIND_EMPTY, query: q }) : null;
  const results = found ? <>
    <SectionHeading>Assets</SectionHeading>
    {found.length ? <ActivityList label="Assets" stacked>{found.map((a) => (
      <ActivityList.Item key={a.id} leading={<Thumbnail src={a.thumb} alt="" />} title={a.name} meta={a.cat + ' · ' + a.badge} onOpen={() => openAsset(a)} />
    ))}</ActivityList> : <Text variant="secondary" as="p">{'Nothing matches “' + q.trim() + '”.'}</Text>}
  </> : null;
  // the universal Plenix header: this is the Asset Manager; the header brings the pinned applications, search (Ctrl K),
  // notifications, the account and the switcher
  return (
    <AppHeader tone="accent" currentApp="assets" appsRoot="../" brandHref="index.html"
      action={<AppHeader.Action icon="hdr-upload" onClick={() => { if (onUpload) onUpload(); else location.href = 'index.html?upload=1'; }}>Upload</AppHeader.Action>}
      search={<SearchField value={q} onChange={(e) => setQ(e.target.value)} onClear={() => setQ('')} onKeyDown={onSearchKey}
        label="Search assets" placeholder="Search assets by name, tag, or keyword..." shortcut="Ctrl K" onAccent />}
      searchSuggestions={suggestions} searchResults={results}
      account={<AppHeader.Account current={current === 'system' ? 'app-settings' : current} myAccount={{ href: 'settings-myaccount.html' }} settings={{ href: '../settings/index.html#/general' }} appSettings={{ app: 'Asset Manager', href: 'settings-system.html' }} />} />
  );
}

function AssetStatusBar() {
  return <StatusBar start={<><StatusIcon tone="success" size="sm">Library online</StatusIcon><span>{dataPhrase('{n} assets | {size}', { n: LIBRARY.assets, size: LIBRARY.size })}</span></>} end={LIBRARY.owner} />;
}

export function AssetPage({ title, current, query, onSearch, onUpload, sideNav, panel, children }) {
  return (
    <AppShell header={<AssetHeader current={current} query={query} onSearch={onSearch} onUpload={onUpload} />} sideNav={sideNav} panel={panel} footer={<AssetStatusBar />} mainClassName="plx-shell-main">
      <h1 className="plx-visually-hidden">{'Plenix Asset Manager: ' + title}</h1>
      {children}
    </AppShell>
  );
}
