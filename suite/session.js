// The suite's session (the Plenix applications and the Asset Manager) until the back end supplies the signed-in
// person: passed to SessionProvider by suite.jsx and dam/app/assets.jsx. The Platform itself ships no person's data
// (RedSave P-37).
export const SUITE_SESSION = {
  account: { name: 'Jordan Avery', firstName: 'Jordan', lastName: 'Avery', email: 'jordan.avery@example.com' },
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
