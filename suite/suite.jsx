/* Plenix suite · shell (suite/suite.jsx): the frame every Plenix application page shares (batch 149). Each application
   is its own page (<folder>/index.html) and mounts itself with mountSuite(appId, render):
   - the Plenix header: the switcher, the pinned applications (links to their pages), search, the Capture action and the
     account menu (My Account and Settings open the settings page);
   - the application's navigation pane (LeftNav) where the application has one, its footer opening its settings;
   - search: Enter in the header searches this application (the dashboard: everything); a result opens its application's
     page; Ask AI opens the AI search in this page;
   - the status bar and the capture overlay.
   render({ prefs }) draws the application's main area. Preferences (Settings) are kept in localStorage (plenix.prefs) so
   every page reads the same ones. */
import { AppHeader, AppShell, SearchField, SessionProvider, StatusBar, PLENIX_APPS } from 'plenix-platform';
import { CaptureUI } from './capture.jsx';
import { LeftNav } from './leftnav.jsx';
import { SearchScreen } from './search.jsx';
import { FindWorkspace } from './findSources.jsx';
const { useState } = React;

// every Plenix application of this suite: its id (PLENIX_APPS), its folder and its label
export const SUITE = [
  { id: 'home', folder: 'dashboard', label: 'Dashboard' }, { id: 'projects', folder: 'projects', label: 'Projects' },
  { id: 'messaging', folder: 'messages', label: 'Messages' }, { id: 'contacts', folder: 'contacts', label: 'Contacts' },
  { id: 'calendar', folder: 'calendar', label: 'Calendar' }, { id: 'tasks', folder: 'tasks', label: 'Tasks' },
  { id: 'notes', folder: 'notes', label: 'Notes' }, { id: 'bookmarks', folder: 'bookmarks', label: 'Bookmarks' },
  { id: 'files', folder: 'files', label: 'Files' },
];
// the page of an application, from another application's page (every application folder sits beside the others)
export const appPage = (id, hash) => { const a = SUITE.find((x) => x.id === id); return '../' + (a ? a.folder : 'dashboard') + '/index.html' + (hash ? '#' + hash : ''); };
export const settingsPage = (cat) => '../settings/index.html' + (cat ? '#' + cat : '');
// each application's own settings category in Settings (none yet for Bookmarks)
const APP_SETTINGS = { home: 'dashboard', projects: 'projects', messaging: 'email', contacts: 'contacts', calendar: 'calendar', tasks: 'tasks', notes: 'notes', files: 'files' };
// the settings page each application's navigation footer opens
const SETTINGS_FOR = { messaging: 'email', contacts: 'contacts', calendar: 'calendar', tasks: 'tasks', notes: 'notes', files: 'files', projects: 'projects' };
// the applications whose page has a navigation pane (the dashboard, projects and settings draw their own)
const HAS_NAV = ['messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files'];
const FIRST_SUB = { messaging: 't-1', calendar: 'month' };

export function readPrefs() { try { return JSON.parse(localStorage.getItem('plenix.prefs')) || {}; } catch (e) { return {}; } }
export function writePrefs(p) { try { localStorage.setItem('plenix.prefs', JSON.stringify(p)); } catch (e) { /* this visit only */ } }

function Suite({ app, render, page = 'workspace' }) {
  const [prefs, setPrefsState] = useState(readPrefs);
  const setPrefs = (next) => setPrefsState((cur) => { const v = typeof next === 'function' ? next(cur) : next; writePrefs(v); return v; });
  const [sub, setSub] = useState(FIRST_SUB[app] || null);
  const [capture, setCapture] = useState(false);
  const [find, setFind] = useState(null);      // the search workspace in the main area: { app, query } (app "home": everything)
  const [ai, setAi] = useState(null);          // a query handed to the AI search
  const [hq, setHq] = useState('');            // the header search field
  const inSuite = SUITE.some((x) => x.id === app);
  const label = (SUITE.find((x) => x.id === app) || { label: 'Settings' }).label;
  const openResult = (r, a) => { location.href = appPage(a, a === 'messaging' && r.id ? 't-' + r.id : ''); };
  const tone = { blue: 'accent', frost: 'frost', white: 'plain' }[prefs.headerBar || 'blue'] || 'accent';
  const onAccent = tone === 'accent';
  const main = ai !== null ? <SearchScreen key={ai} initialQuery={ai} />
    : find ? <FindWorkspace key={find.app} app={find.app} query={find.query} onQuery={(q) => { setFind({ ...find, query: q }); setHq(q); }} onOpen={openResult} onAskAI={(q) => { setFind(null); setAi(q); }} />
    : render({ prefs, setPrefs });
  return (
    <AppShell page={page} mainClassName="plx-shell-main"
      footer={<StatusBar start={<span>{SUITE.length - 1} applications · Lighthouse Way</span>} end={<span>Synced just now</span>} />}
      sideNav={HAS_NAV.includes(app) ? <LeftNav section={app} sub={sub} setSub={setSub} onSettings={() => { location.href = settingsPage(SETTINGS_FOR[app] || 'general'); }} /> : null}
      header={<AppHeader tone={tone} currentApp={inSuite ? app : null} appsRoot="../" appName={inSuite ? undefined : label}
        action={<AppHeader.Action variant={onAccent ? 'secondary' : 'primary'} icon="snapshot" onClick={() => setCapture(true)}>Capture</AppHeader.Action>}
        search={<SearchField placeholder={inSuite && app !== 'home' ? 'Search ' + label.toLowerCase() + '…' : 'Search files, notes, contacts…'} label="Search" shortcut="Ctrl K" onAccent={onAccent}
          value={hq} onChange={(e) => setHq(e.target.value)} onClear={() => setHq('')} onKeyDown={(e) => { if (e.key === 'Enter') { setAi(null); setFind({ app: inSuite && app !== 'home' ? app : 'home', query: hq.trim() }); } }} />}
        account={<AppHeader.Account current={app === 'settings' ? (location.hash === '#account' ? 'account' : 'settings') : undefined}
          myAccount={{ href: settingsPage('account') }} settings={{ href: settingsPage('general') }}
          appSettings={APP_SETTINGS[app] ? { app: label, href: settingsPage(APP_SETTINGS[app]) } : {}} />} />}>
      <div className="plx-app-shell__page">{main}</div>
      {capture ? <CaptureUI onClose={() => setCapture(false)} /> : null}
    </AppShell>
  );
}

// mounts an application page: mountSuite('notes', () => <NotesScreen/>)
// opts.page: what kind of page the app is (the design system's layout standard lays it out; default "workspace")
export function mountSuite(app, render, opts) {
  ReactDOM.createRoot(document.getElementById('root')).render(<SessionProvider><Suite app={app} render={render} page={(opts && opts.page) || 'workspace'} /></SessionProvider>);
}
