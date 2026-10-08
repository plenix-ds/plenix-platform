/* Plenix · SessionProvider, useSession
   Summary: Who is signed in, and their notifications, for every Plenix application, from one place.
   Usage:
     <SessionProvider session={…}>{app}</SessionProvider>
     const { account, notifications, setNotifications, pinnedApps, setPinnedApps } = useSession();
   Props:
     session: { account, notifications, pinnedApps } (default: the demo session below, DEMO_SESSION)
     children: the application root or React island
     useSession(): { account: { name, firstName, lastName, email, src }, notifications: [{ id, text, time, unread }],
       setNotifications(next), pinnedApps: [application ids], setPinnedApps(next | (prev) => next) }
   Behavior:
     The pins are remembered in the browser (localStorage plenix.pinnedApps) until the back end stores them.
     Outside a provider useSession() returns the demo session, so a page that has not been wrapped still shows the same person.
   Notes:
     The header's account menu (AppHeader.Account) and the dashboard's notifications (NotificationList) read it.
     Any page that shows the person's details reads it too (useSession().account).
     Wrap the application root, or a React island, once.
     Without a session the demo session below is used, until the back end supplies the real one; no application keeps its own copy.
*/
import React from 'react';

// the demo session: the sample account and notifications every application shows until the back end sends them
export const DEMO_SESSION = {
  account: { name: 'Raphael Maher', firstName: 'Raphael', lastName: 'Maher', email: 'raphael@lighthouseway.org' },
  notifications: [
    { id: 1, text: 'Fr. Daniel uploaded 12 new assets to Liturgy', time: '5 min ago', unread: true },
    { id: 2, text: 'Maya Chen sent a message: Round 3 concepts — confirm Thursday?', time: '10:24 AM', unread: true },
    { id: 3, text: 'Sarah M. approved your batch download request', time: '22 min ago', unread: true },
    { id: 4, text: 'Task due Mar 8: Deliver logo concepts round 3', time: 'Yesterday', unread: false },
    { id: 5, text: 'Version 3 of Banner Icon Set is now live', time: 'Yesterday', unread: false },
  ],
  // the applications pinned to the header until the person changes them: every application
  pinnedApps: ['home', 'projects', 'messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files', 'assets'],
};

const SessionContext = React.createContext(null);

const PINS_KEY = 'plenix.pinnedApps';
const readPins = (fallback) => { try { const v = JSON.parse(localStorage.getItem(PINS_KEY)); return Array.isArray(v) ? v : fallback; } catch (e) { return fallback; } };

export function SessionProvider({ session = DEMO_SESSION, children }) {
  const [notifications, setNotifications] = React.useState(session.notifications || []);
  const [pinnedApps, setPins] = React.useState(() => readPins(session.pinnedApps || DEMO_SESSION.pinnedApps));
  React.useEffect(() => { setNotifications(session.notifications || []); }, [session]);
  const setPinnedApps = React.useCallback((next) => setPins((prev) => {
    const v = typeof next === 'function' ? next(prev) : next;
    try { localStorage.setItem(PINS_KEY, JSON.stringify(v)); } catch (e) { /* not stored: the pins last for this visit */ }
    return v;
  }), []);
  const value = React.useMemo(() => ({ account: session.account || {}, notifications, setNotifications, pinnedApps, setPinnedApps }), [session, notifications, pinnedApps, setPinnedApps]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

// the session, or the demo session outside a provider (a page that has not been wrapped still shows the same person)
export function useSession() {
  const ctx = React.useContext(SessionContext);
  return ctx || { account: DEMO_SESSION.account, notifications: DEMO_SESSION.notifications, setNotifications: () => {}, pinnedApps: DEMO_SESSION.pinnedApps, setPinnedApps: () => {} };
}
