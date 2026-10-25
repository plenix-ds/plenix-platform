/*
 * GENERATED FILE — DO NOT EDIT
 * Source: dashboard/main.jsx and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "suite/session.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUITE_SESSION = void 0;
// The suite's session (the Plenix applications and the Asset Manager) until the back end supplies the signed-in
// person: passed to SessionProvider by suite.jsx and dam/app/assets.jsx. The Platform itself ships no person's data
// (RedSave P-37).
const SUITE_SESSION = exports.SUITE_SESSION = {
  account: {
    name: 'Jordan Avery',
    firstName: 'Jordan',
    lastName: 'Avery',
    email: 'jordan.avery@example.com'
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
  "suite/shared.jsx": { deps: {"plenix-platform":null}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THREADS = exports.SolidIco = exports.STATUS_TONE = exports.SOLID = exports.ProjStatus = exports.Priority = exports.PROJECTS = exports.PRI_WORD = exports.PRI_TONE = exports.PRI_LABEL = exports.P = exports.MSGS = exports.Ico = exports.EVENTS = exports.EMAILS = exports.CONTACTS = exports.CARD = exports.CAPTURES = exports.CAL_EVENTS = exports.CALENDARS = exports.Av = exports.AV_SIZES = exports.ALL_TASKS = exports.ALL_NOTES = exports.ALL_FILES = exports.ALL_BOOKMARKS = void 0;
exports.aiFileName = aiFileName;
exports.aiSearch = aiSearch;
exports.callClaude = callClaude;
var _plenixPlatform = require("plenix-platform");
/* Plenix suite · shared (suite/shared.jsx). Split out of app/plenix.jsx in batch 113; edit here. */

const {
  useState,
  useRef,
  useEffect,
  useCallback
} = React;

/* ─── Icons ─────────────────────────────────────────────────────── */
const P = exports.P = {
  home: "M3 12L12 4l9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
  proj: "M2 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
  msg: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
  contact: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  cal: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  task: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  note: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5",
  bkmk: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
  file: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z",
  srch: "M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  cap: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11zM12 17a4 4 0 100-8 4 4 0 000 8z",
  set: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  chk: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  up: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  link: "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  star: "M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z",
  tag: "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
  folder: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z",
  back: "M19 12H5M12 5l-7 7 7 7"
};
/* the icon takes its container's --plx-comp-icon-size (a button's, a navigation row's), or the system icon size */
const Ico = ({
  n,
  color = "currentColor",
  sw = 1.65
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": "true",
  className: "plx-u-shrink-0 plx-u-icon-box"
}, /*#__PURE__*/React.createElement("path", {
  d: P[n],
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}));

/* Solid filled icons for nav — each is a proper filled shape */
exports.Ico = Ico;
const SOLID = exports.SOLID = {
  home: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
  }),
  proj: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1H2V6zm0 4h16v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"
  }),
  msg: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V5z"
  }),
  contact: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3zm15.138-2.738A4 4 0 0120 9a4 4 0 01-2.862 3.842 6.002 6.002 0 011.994 2.887.75.75 0 01-1.44.422A4.502 4.502 0 0014 13h-.5A4.5 4.5 0 009 17.5a.75.75 0 01-1.5 0A6 6 0 016 13H5a.75.75 0 010-1.5h10a.75.75 0 010 1.5h-1a6.002 6.002 0 011.138 2.762z"
  }),
  cal: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm0 6a1 1 0 000 2h10a1 1 0 100-2H5z"
  }),
  task: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm9.293 3.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L8 10.586l3.293-3.293a1 1 0 011.414 0z"
  }),
  note: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H7z"
  }),
  bkmk: /*#__PURE__*/React.createElement("path", {
    d: "M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"
  }),
  file: /*#__PURE__*/React.createElement("path", {
    d: "M2 6a2 2 0 012-2h5l2 3h7a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
  }),
  srch: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
  }),
  set: /*#__PURE__*/React.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
  })
};
const SolidIco = ({
  n,
  size = 20,
  color = "currentColor"
}) => /*#__PURE__*/React.createElement("svg", {
  width: size,
  height: size,
  viewBox: "0 0 20 20",
  fill: color,
  className: "plx-u-shrink-0"
}, SOLID[n] || /*#__PURE__*/React.createElement("path", {
  d: P[n],
  stroke: color,
  strokeWidth: 1.5,
  fill: "none"
}));

/* ─── Data ──────────────────────────────────────────────────────── */
exports.SolidIco = SolidIco;
const PROJECTS = exports.PROJECTS = [{
  id: 1,
  name: "Kitchen Renovation",
  status: "active",
  color: "brown",
  tags: ["personal", "home"],
  files: 14,
  desc: "Full kitchen remodel — cabinets, counters, plumbing. Target Q3 2026."
}, {
  id: 2,
  name: "Apex Co — Brand Refresh",
  status: "active",
  color: "blue",
  tags: ["client", "design"],
  files: 31,
  desc: "Visual identity refresh: logo, color system, digital templates."
}, {
  id: 3,
  name: "AI Writing Tools",
  status: "paused",
  color: "purple",
  tags: ["research", "ai"],
  files: 8,
  desc: "Evaluating AI writing assistants for team adoption."
}, {
  id: 4,
  name: "Spain — June 2026",
  status: "active",
  color: "green",
  tags: ["personal", "travel"],
  files: 9,
  desc: "Two weeks in Madrid and Seville. Flights booked."
}, {
  id: 5,
  name: "Tax & Finances 2026",
  status: "active",
  color: "red",
  tags: ["personal", "finance"],
  files: 22,
  desc: "Annual tax prep, estimated payments, expense tracking."
}, {
  id: 6,
  name: "Home Purchase 2024",
  status: "completed",
  color: "gray",
  tags: ["archive", "legal"],
  files: 67,
  desc: "Archive — all docs from 412 Birchwood Dr closing."
}];
const EMAILS = exports.EMAILS = [{
  id: 1,
  from: "Maya Chen",
  subj: "Round 3 concepts — confirm Thursday?",
  prev: "Hey! Just want to confirm we're presenting the logo directions this Thursday…",
  time: "10:24 AM",
  unread: true,
  av: "M",
  avColor: "blue",
  proj: "Apex Co"
}, {
  id: 2,
  from: "ABC Plumbing",
  subj: "Kitchen quote follow-up",
  prev: "Hi, this is Jeff from ABC Plumbing. Following up on our estimate…",
  time: "9:41 AM",
  unread: true,
  av: "A",
  avColor: "brown",
  proj: "Kitchen Reno"
}, {
  id: 3,
  from: "Luis Herrera",
  subj: "Q1 tax docs ready for review",
  prev: "Your estimated Q1 tax documents are attached. Please review section 3…",
  time: "Yesterday",
  unread: false,
  av: "L",
  avColor: "purple",
  proj: "Tax"
}, {
  id: 4,
  from: "James Whitfield",
  subj: "RE: SOW — one small change",
  prev: "Looks mostly good. I'd like to adjust the payment milestone on page 3…",
  time: "Yesterday",
  unread: false,
  av: "J",
  avColor: "blue",
  proj: "Apex Co"
}, {
  id: 5,
  from: "Booking.com",
  subj: "Your Madrid reservation is confirmed",
  prev: "Thank you for booking! Your reservation at Hotel Only YOU Atocha is confirmed.",
  time: "Mar 3",
  unread: false,
  av: "B",
  avColor: "green",
  proj: "Spain"
}];
const EVENTS = exports.EVENTS = [{
  id: 1,
  time: "9:00 AM",
  title: "Standup — Apex team",
  sub: "30 min",
  color: "blue"
}, {
  id: 2,
  time: "2:00 PM",
  title: "Contractor call (ABC)",
  sub: "1 hour",
  color: "brown"
}, {
  id: 3,
  time: "4:30 PM",
  title: "Budget review — kitchen",
  sub: "30 min",
  color: "brown"
}];
const CALENDARS = exports.CALENDARS = [{
  id: "work",
  label: "Work",
  color: "blue",
  on: true
}, {
  id: "home",
  label: "Personal",
  color: "green",
  on: true
}, {
  id: "apex",
  label: "Apex Co",
  color: "brown",
  on: true
}, {
  id: "travel",
  label: "Travel",
  color: "purple",
  on: true
}, {
  id: "tax",
  label: "Finance & Tax",
  color: "red",
  on: true
}];
/* Tag each event to a calendar */
const CAL_EVENTS = exports.CAL_EVENTS = [{
  id: 1,
  date: 5,
  title: "Standup — Apex",
  time: "9:00 AM",
  color: "blue",
  cal: "work"
}, {
  id: 2,
  date: 5,
  title: "Contractor call",
  time: "2:00 PM",
  color: "brown",
  cal: "apex"
}, {
  id: 3,
  date: 8,
  title: "Logo review — Round 3",
  time: "10:00 AM",
  color: "blue",
  cal: "work"
}, {
  id: 4,
  date: 10,
  title: "Plumbing quote (2nd)",
  time: "11:00 AM",
  color: "brown",
  cal: "home"
}, {
  id: 5,
  date: 15,
  title: "Q1 tax payment due",
  time: "All day",
  color: "red",
  cal: "tax"
}, {
  id: 6,
  date: 18,
  title: "Brand presentation",
  time: "3:00 PM",
  color: "blue",
  cal: "apex"
}, {
  id: 7,
  date: 28,
  title: "Spain trip — depart",
  time: "All day",
  color: "green",
  cal: "travel"
}];
const CONTACTS = exports.CONTACTS = [{
  id: 1,
  name: "Maya Chen",
  gender: "female",
  role: "Creative Director",
  co: "Apex Co",
  av: "M",
  avColor: "blue",
  last: "10:24 AM",
  msg: "Sounds great — I'll have concepts by Friday."
}, {
  id: 2,
  name: "Jeff Torres",
  gender: "male",
  role: "Plumber",
  co: "ABC Plumbing",
  av: "J",
  avColor: "brown",
  last: "9:41 AM",
  msg: "We can do Thursday the 12th at 2pm."
}, {
  id: 3,
  name: "Luis Herrera",
  gender: "male",
  role: "CPA",
  co: "Herrera Tax",
  av: "L",
  avColor: "purple",
  last: "Yesterday",
  msg: "Your Q1 tax docs are attached."
}, {
  id: 4,
  name: "James Whitfield",
  gender: "male",
  role: "CEO",
  co: "Apex Co",
  av: "J",
  avColor: "blue",
  last: "Yesterday",
  msg: "RE: SOW — looks good, one small change."
}, {
  id: 5,
  name: "Sarah Morgan",
  gender: "female",
  role: "Friend",
  co: "",
  av: "S",
  avColor: "green",
  last: "Mar 3",
  msg: "Did you decide on the cabinet color?"
}];
const THREADS = exports.THREADS = [{
  id: 1,
  name: "Maya Chen",
  av: "M",
  avColor: "blue",
  ch: "WhatsApp",
  preview: "Sounds great — I'll have concepts by Friday.",
  time: "10:24 AM",
  unread: 2
}, {
  id: 2,
  name: "ABC Plumbing",
  av: "A",
  avColor: "brown",
  ch: "SMS",
  preview: "We can do Thursday the 12th at 2pm.",
  time: "9:41 AM",
  unread: 1
}, {
  id: 3,
  name: "James Whitfield",
  av: "J",
  avColor: "blue",
  ch: "Email",
  preview: "RE: SOW — looks good, one small change.",
  time: "Yesterday",
  unread: 0
}, {
  id: 4,
  name: "Garret Builders",
  av: "G",
  avColor: "gray",
  ch: "SMS",
  preview: "Demo day confirmed. See you at 10am.",
  time: "Yesterday",
  unread: 0
}];
const MSGS = exports.MSGS = {
  1: [{
    from: "Maya",
    text: "Hey! Confirming — presenting round 3 on Thursday the 8th?",
    time: "9:55 AM",
    mine: false
  }, {
    from: "me",
    text: "Yes, confirmed. I'll have the Figma file shared by Wednesday evening.",
    time: "10:01 AM",
    mine: true
  }, {
    from: "Maya",
    text: "Perfect. And you're adding the dark mode variants too?",
    time: "10:18 AM",
    mine: false
  }, {
    from: "me",
    text: "Absolutely — 3 full directions, light and dark each.",
    time: "10:21 AM",
    mine: true
  }, {
    from: "Maya",
    text: "Sounds great — I'll have the revised concepts by Friday.",
    time: "10:24 AM",
    mine: false
  }],
  2: [{
    from: "ABC",
    text: "Hi, this is Jeff from ABC Plumbing. Following up on the kitchen quote.",
    time: "9:10 AM",
    mine: false
  }, {
    from: "me",
    text: "Hi Jeff — yes, we'd love a second look. Available this week?",
    time: "9:25 AM",
    mine: true
  }, {
    from: "ABC",
    text: "We can do Thursday the 12th at 2pm if that works.",
    time: "9:41 AM",
    mine: false
  }]
};
const ALL_TASKS = exports.ALL_TASKS = [{
  id: 1,
  title: "Get second plumbing quote",
  done: false,
  due: "Mar 10",
  proj: "Kitchen Reno",
  pri: "high"
}, {
  id: 2,
  title: "Order cabinet samples",
  done: true,
  due: "Mar 1",
  proj: "Kitchen Reno",
  pri: "med"
}, {
  id: 3,
  title: "Confirm countertop material",
  done: false,
  due: "Mar 15",
  proj: "Kitchen Reno",
  pri: "med"
}, {
  id: 4,
  title: "Deliver logo concepts round 3",
  done: false,
  due: "Mar 8",
  proj: "Apex Co",
  pri: "high"
}, {
  id: 5,
  title: "Send revised SOW for approval",
  done: true,
  due: "Feb 28",
  proj: "Apex Co",
  pri: "high"
}, {
  id: 6,
  title: "Set up brand asset folder",
  done: false,
  due: "Mar 12",
  proj: "Apex Co",
  pri: "med"
}, {
  id: 7,
  title: "Book Madrid hotel — Chueca",
  done: false,
  due: "Mar 20",
  proj: "Spain Trip",
  pri: "med"
}, {
  id: 8,
  title: "File Q1 estimated tax payment",
  done: false,
  due: "Mar 15",
  proj: "Tax",
  pri: "high"
}, {
  id: 9,
  title: "Upload expense receipts Jan–Feb",
  done: false,
  due: "Mar 10",
  proj: "Tax",
  pri: "med"
}];
const ALL_NOTES = exports.ALL_NOTES = [{
  id: 1,
  folder: "Kitchen Reno",
  title: "Contractor comparison",
  preview: "ABC Plumbing came in $2,400 under Garret but has mixed Yelp reviews…",
  date: "Mar 2",
  tags: ["contractors", "cost"]
}, {
  id: 2,
  folder: "Kitchen Reno",
  title: "Cabinet style decisions",
  preview: "Leaning Shaker in off-white. Confirm door pull finish with Sarah.",
  date: "Feb 22",
  tags: ["design", "decisions"]
}, {
  id: 3,
  folder: "Apex Co",
  title: "Kickoff meeting recap",
  preview: "Client wants to retain the wordmark but fully refresh the color system.",
  date: "Feb 20",
  tags: ["client", "milestone"]
}, {
  id: 4,
  folder: "Apex Co",
  title: "Typography shortlist",
  preview: "Top candidates: Canela, Söhne Breit, GT Planar. Present 3 directions.",
  date: "Mar 1",
  tags: ["type", "design"]
}, {
  id: 5,
  folder: "Spain Trip",
  title: "Hotel shortlist — Madrid",
  preview: "Barrio de Chueca is the area. Budget €150/night max. 3 options.",
  date: "Feb 28",
  tags: ["travel", "hotels"]
}, {
  id: 6,
  folder: "Research",
  title: "AI tools comparison",
  preview: "Compared Jasper, Copy.ai, and Claude for long-form writing. Claude wins.",
  date: "Mar 3",
  tags: ["ai", "tools"]
}];
const ALL_BOOKMARKS = exports.ALL_BOOKMARKS = [{
  id: 1,
  col: "Kitchen Inspo",
  title: "Shaker Cabinet Guide — Houzz",
  url: "houzz.com",
  date: "Feb 18",
  tags: ["cabinets"],
  thumb: "🏠"
}, {
  id: 2,
  col: "Kitchen Inspo",
  title: "Quartz vs Granite 2026",
  url: "thespruce.com",
  date: "Feb 10",
  tags: ["countertops"],
  thumb: "🪨"
}, {
  id: 3,
  col: "Brand Research",
  title: "2026 Brand Design Trends",
  url: "underconsideration.com",
  date: "Feb 22",
  tags: ["branding"],
  thumb: "🎨"
}, {
  id: 4,
  col: "Brand Research",
  title: "Apex Competitor — Studio Maake",
  url: "studiomaake.com",
  date: "Feb 12",
  tags: ["competitor"],
  thumb: "🔍"
}, {
  id: 5,
  col: "Spain Trip",
  title: "Seville Top 20 Restaurants",
  url: "eater.com",
  date: "Feb 28",
  tags: ["food"],
  thumb: "🍽️"
}, {
  id: 6,
  col: "Spain Trip",
  title: "Renfe Madrid–Seville Tickets",
  url: "renfe.com",
  date: "Mar 1",
  tags: ["transport"],
  thumb: "🚄"
}, {
  id: 7,
  col: "AI Tools",
  title: "Claude API Documentation",
  url: "docs.anthropic.com",
  date: "Mar 3",
  tags: ["claude"],
  thumb: "🤖"
}];
const ALL_FILES = exports.ALL_FILES = [{
  name: "2026-02-28_KitchenReno_Quote_ABCPlumbing.pdf",
  t: "PDF",
  s: "1.2 MB",
  folder: "Kitchen Reno",
  d: "Feb 28",
  ai: true
}, {
  name: "2026-02-15_KitchenReno_Inspo_IslandLayouts.png",
  t: "IMG",
  s: "4.1 MB",
  folder: "Kitchen Reno",
  d: "Feb 15",
  ai: true
}, {
  name: "2026-02-20_ApexCo_BrandBrief_V2.pdf",
  t: "PDF",
  s: "3.4 MB",
  folder: "Apex Co",
  d: "Feb 20",
  ai: true
}, {
  name: "2026-03-01_ApexCo_LogoConcepts_R3.fig",
  t: "FIG",
  s: "12 MB",
  folder: "Apex Co",
  d: "Mar 1",
  ai: false
}, {
  name: "IMG_4891.png",
  t: "IMG",
  s: "2.1 MB",
  folder: "Uncategorized",
  d: "Mar 3",
  ai: false
}, {
  name: "document(3).pdf",
  t: "PDF",
  s: "1.1 MB",
  folder: "Uncategorized",
  d: "Mar 4",
  ai: false
}, {
  name: "2026-01-05_TaxDocs_W2_Employer.pdf",
  t: "PDF",
  s: "224 KB",
  folder: "Tax 2026",
  d: "Jan 5",
  ai: true
}];
const CAPTURES = exports.CAPTURES = [{
  label: "Contractor quote screenshot",
  fileName: "IMG_4891.png",
  type: "PNG",
  emoji: "📸",
  context: "Screenshot of ABC Plumbing estimate. Kitchen sink relocation. Labor $1,200, materials $640, permit $180. Total $2,020. March 4 2026. Project: Kitchen Renovation."
}, {
  label: "Client contract PDF",
  fileName: "document(3).pdf",
  type: "PDF",
  emoji: "📄",
  context: "Contract from Apex Design Co. Scope: brand identity refresh — logo, color system, typography. 50/50 payment split. March 4 2026."
}, {
  label: "Flight search screenshot",
  fileName: "Screen Shot 2026-03-03.png",
  type: "PNG",
  emoji: "✈️",
  context: "Google Flights results for Madrid round trip June 14–21 from JFK. Prices $640–$910. Iberia and Delta. Project: Spain Trip."
}, {
  label: "Budget spreadsheet",
  fileName: "Untitled spreadsheet.xlsx",
  type: "XLSX",
  emoji: "📊",
  context: "Budget tracker for Apex Co brand refresh. Categories: design fees, ad spend, printing. Total budget $18,400. Q2 2026."
}];

/* ─── API ───────────────────────────────────────────────────────── */
async function callClaude(sys, usr) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: sys,
      messages: [{
        role: "user",
        content: usr
      }]
    })
  });
  const d = await r.json();
  return d.content?.[0]?.text || "";
}
async function aiFileName(ctx) {
  const sys = `You are Plenix's file naming engine. Return ONLY valid JSON, no markdown:
{"filename":"YYYY-MM-DD_Project_Type_Description.ext","parts":{"date":"YYYY-MM-DD","project":"...","type":"...","description":"...","ext":".pdf"},"tags":["tag1","tag2","tag3"],"summary":"One sentence about the file."}`;
  const raw = await callClaude(sys, ctx);
  try {
    return JSON.parse(raw.replace(/```json|```/g, ""));
  } catch {
    return null;
  }
}
async function aiSearch(q) {
  const sys = `You are Plenix's search engine. Projects: Kitchen Renovation, Apex Co Brand Refresh, AI Writing Tools, Spain Trip June 2026, Tax & Finances 2026.
Return ONLY valid JSON: {"answer":"2-3 sentence summary","results":[{"id":1,"name":"...","module":"Files|Notes|Bookmarks|Tasks|Contacts","project":"...","preview":"1-2 sentences","date":"human date","tags":["..."],"icon":"emoji"}]}
3-5 realistic results.`;
  const raw = await callClaude(sys, `Query: "${q}"`);
  try {
    return JSON.parse(raw.replace(/```json|```/g, ""));
  } catch {
    return null;
  }
}

/* a card surface (the legacy .card rule, on tokens): spread into a style, before the element's own properties */
const CARD = exports.CARD = {
  backgroundColor: "var(--plx-sys-surface-raised)",
  borderRadius: "var(--plx-sys-radius-card-6px)",
  boxShadow: "var(--plx-sys-shadow-card)",
  overflowX: "hidden",
  overflowY: "hidden"
};

/* ─── Shared atoms ──────────────────────────────────────────────── */
/* avatars: the Platform Avatar (rounded squares; corner and text size follow the size). Sizes snap to the scale. */
const AV_SIZES = exports.AV_SIZES = [24, 28, 32, 40, 48, 64];
const Av = ({
  name,
  av,
  avColor,
  size = 28
}) => {
  const s = AV_SIZES.reduce((a, b) => Math.abs(b - size) < Math.abs(a - size) ? b : a);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
    name: name,
    initials: av,
    size: s,
    color: avColor
  });
};
// a status is never a dot (owner, 2026-10-14): priority is its icon and a short word; a project's status, in the tight nav
// row, its icon with its name spoken
exports.Av = Av;
const PRI_TONE = exports.PRI_TONE = {
    high: "danger",
    med: "warning",
    low: "success"
  },
  PRI_LABEL = exports.PRI_LABEL = {
    high: "High priority",
    med: "Medium priority",
    low: "Low priority"
  },
  PRI_WORD = exports.PRI_WORD = {
    high: "High",
    med: "Medium",
    low: "Low"
  };
// the word in the row's secondary text (12px), so it shares the task's and the date's size and baseline
const Priority = ({
  pri
}) => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
  gap: "2xs",
  align: "baseline"
}, /*#__PURE__*/React.createElement(_plenixPlatform.StatusIcon, {
  tone: PRI_TONE[pri] || "neutral",
  size: "sm",
  label: PRI_LABEL[pri],
  className: "plx-u-self-center"
}), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
  variant: "secondary",
  "aria-hidden": "true"
}, PRI_WORD[pri] || pri));
exports.Priority = Priority;
const STATUS_TONE = exports.STATUS_TONE = {
  active: "success",
  paused: "warning",
  completed: "neutral"
};
const ProjStatus = ({
  s
}) => /*#__PURE__*/React.createElement(_plenixPlatform.StatusIcon, {
  tone: STATUS_TONE[s] || "neutral",
  size: "sm",
  label: "Status: " + s
});
exports.ProjStatus = ProjStatus;
  } },
  "suite/capture.jsx": { deps: {"plenix-platform":null,"./shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptureUI = CaptureUI;
var _plenixPlatform = require("plenix-platform");
var _shared = require("./shared.jsx");
/* Plenix suite · capture (suite/capture.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the files as RadioTiles, the chosen one as a PropertyList, the proposal as a CodeBlock with its parts as Tags. */

// a name/value table as a static Table (batches 229, 234: every table runs on DataGrid): rows [name, value, technical?]; the names
// are the row header, values wrap, a value may be any React content
// name/value facts as the defined data grid, with a header row (owner, 2026-10-09: all name/value lists in the DataGrid's look)
const facts = (label, rows) => {
  const list = rows.filter(Boolean);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
    label: label,
    headerMenu: false,
    data: list.map((r, i) => ({
      id: i,
      name: r[0],
      value: typeof r[1] === "string" || typeof r[1] === "number" ? String(r[1]) : ""
    })),
    columns: [{
      title: "Name",
      field: "name",
      kind: "wrap",
      rowLabel: true,
      width: "--plx-ref-size-240px",
      sortable: false
    }, {
      title: "Value",
      field: "value",
      kind: "wrap",
      sortable: false,
      render: d => {
        const r = list[d.id];
        return r ? r[2] ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "data"
        }, r[1]) : r[1] : null;
      }
    }]
  });
};
const {
  useState
} = React;
const PART = {
  date: 'Date',
  project: 'Project',
  type: 'Type',
  description: 'Description'
};

/* ─── Capture UI ────────────────────────────────────────────────── */
function CaptureUI({
  onClose
}) {
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);
  const [saved, setSaved] = useState(false);
  // a proposed name not yet accepted is unsaved: closing the dialog or leaving the page asks first
  const close = (0, _plenixPlatform.useUnsavedGuard)(!!(sel && res && !saved), 'The proposed file name has not been saved.')(onClose);
  const pick = async f => {
    setSel(f);
    setRes(null);
    setSaved(false);
    setLoading(true);
    try {
      setRes(await (0, _shared.aiFileName)(f.context));
    } catch {/* no proposal */}
    setLoading(false);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: close,
    title: "AI File Naming",
    description: "Select a file \u2014 AI reads the content and proposes a structured name."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RadioTiles, {
    legend: "File",
    legendHidden: true,
    size: "lg",
    value: sel ? sel.fileName : undefined,
    onChange: v => pick(_shared.CAPTURES.find(f => f.fileName === v)),
    options: _shared.CAPTURES.map(f => ({
      value: f.fileName,
      label: f.emoji + ' ' + f.label,
      description: f.fileName
    }))
  }), sel ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, facts("Selected file", [["Original filename", sel.fileName, true], ["Type", sel.type, true]]), loading ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Typing, {
    label: "Thinking"
  }), /*#__PURE__*/React.createElement("span", null, "Reading content and extracting metadata\u2026"))), /*#__PURE__*/React.createElement(_plenixPlatform.Skeleton, {
    height: "32px"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Skeleton, {
    height: "24px",
    width: "200px"
  })) : null, res && !loading && !saved ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.CodeBlock, {
    title: "Proposed filename",
    language: "text"
  }, res.filename), /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Filename parts"
  }, Object.entries(res.parts || {}).filter(([k]) => PART[k]).map(([k, v]) => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: k
  }, PART[k] + ': ' + v))), res.tags ? /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, res.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t))) : null, res.summary ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary",
    as: "p"
  }, /*#__PURE__*/React.createElement("q", null, res.summary)) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: () => setSaved(true)
  }, "Accept & Save"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => pick(sel)
  }, "Regenerate"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    onClick: () => {
      setSel(null);
      setRes(null);
    }
  }, "Cancel"))) : null, saved ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "success"
  }, "Saved to OneDrive"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, res && res.filename), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => {
      setSel(null);
      setRes(null);
      setSaved(false);
    }
  }, "Capture another file"))) : null) : null));
}
  } },
  "suite/leftnav.jsx": { deps: {"plenix-platform":null,"./shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LeftNav = LeftNav;
var _plenixPlatform = require("plenix-platform");
var _shared = require("./shared.jsx");
/* Plenix suite · leftnav (suite/leftnav.jsx). Split out of app/plenix.jsx in batch 113; edit here. */

const {
  useState,
  useRef,
  useEffect,
  useCallback
} = React;

/* ─── Left Nav (contextual) ─────────────────────────────────────── */
function LeftNav({
  section,
  sub,
  setSub,
  onSettings
}) {
  const groups = {};
  _shared.PROJECTS.forEach(p => {
    const t = p.tags[0];
    if (!groups[t]) groups[t] = [];
    groups[t].push(p);
  });
  const tagLabels = {
    personal: "Personal",
    client: "Client Work",
    research: "Research",
    travel: "Travel",
    finance: "Finance",
    archive: "Archive"
  };
  /* a colored mark before a row: a dot (a project's color) or a square (a calendar's color) */
  const Mark = ({
    color,
    square
  }) => /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: [[[["plx-u-inline-block plx-u-shrink-0", square ? "plx-u-w-10px" : "plx-u-w-6px", square ? "plx-u-h-10px" : "plx-u-h-6px", square ? "plx-u-border-radius-detail-4px" : "plx-u-border-radius-pill", "plx-u-bg-data"].filter(Boolean).join(" ")].filter(Boolean).join(" ")].filter(Boolean).join(" ")].filter(Boolean).join(" "),
    "data-plx-color": color
  });
  const by = (list, key, count) => [...new Set(list.map(x => x[key]))].map(v => ({
    id: v,
    label: v,
    count: count(v)
  }));
  const nav = {
    projects: {
      label: "Projects",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All projects",
          count: _shared.PROJECTS.length
        }]
      }].concat(Object.entries(groups).map(([tag, projs]) => ({
        heading: tagLabels[tag] || tag,
        items: projs.map(p => ({
          id: p.id,
          label: p.name,
          count: p.files,
          icon: /*#__PURE__*/React.createElement("span", {
            className: "plx-u-items-center plx-u-gap-x-4px plx-u-inline-flex"
          }, /*#__PURE__*/React.createElement(Mark, {
            color: p.color
          }), p.status && /*#__PURE__*/React.createElement(_shared.ProjStatus, {
            s: p.status
          }))
        }))
      })))
    },
    messaging: {
      label: "Messages",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All messages"
        }]
      }, {
        heading: "Channels",
        items: [{
          id: "sms",
          label: "SMS"
        }, {
          id: "whatsapp",
          label: "WhatsApp"
        }, {
          id: "email",
          label: "Email"
        }]
      }, {
        heading: "Threads",
        items: _shared.THREADS.map(t => ({
          id: `t-${t.id}`,
          label: t.name,
          count: t.unread > 0 ? t.unread : undefined,
          icon: /*#__PURE__*/React.createElement(_shared.Av, {
            name: t.name,
            avColor: t.avColor,
            size: 22
          })
        }))
      }]
    },
    contacts: {
      label: "Contacts",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All contacts",
          count: _shared.CONTACTS.length
        }]
      }, {
        heading: "Groups",
        items: [{
          id: "clients",
          label: "Clients",
          count: 2
        }, {
          id: "contractors",
          label: "Contractors",
          count: 2
        }, {
          id: "professional",
          label: "Professional"
        }, {
          id: "personal",
          label: "Personal"
        }]
      }]
    },
    calendar: {
      label: "Calendars",
      groups: [{
        heading: "My calendars",
        items: [{
          id: "all",
          label: "All calendars",
          icon: /*#__PURE__*/React.createElement(Mark, {
            square: true,
            color: "gray"
          })
        }].concat(_shared.CALENDARS.map(c => ({
          id: c.id,
          label: c.label,
          icon: /*#__PURE__*/React.createElement(Mark, {
            square: true,
            color: c.color
          })
        })))
      }],
      after: /*#__PURE__*/React.createElement("div", {
        className: "plx-u-border-t-border-divider plx-u-border-t-solid-2 plx-u-border-t-1px plx-u-mt-12px plx-u-pt-8px"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        icon: /*#__PURE__*/React.createElement(_shared.Ico, {
          n: "up"
        })
      }, "Import calendar"))
    },
    tasks: {
      label: "Tasks",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All tasks",
          count: _shared.ALL_TASKS.filter(t => !t.done).length
        }, {
          id: "due",
          label: "Due soon",
          count: _shared.ALL_TASKS.filter(t => !t.done && ["Mar 8", "Mar 10"].includes(t.due)).length
        }]
      }, {
        heading: "By project",
        items: by(_shared.ALL_TASKS, "proj", p => _shared.ALL_TASKS.filter(t => t.proj === p && !t.done).length)
      }]
    },
    notes: {
      label: "Notes",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All notes",
          count: _shared.ALL_NOTES.length
        }]
      }, {
        heading: "Folders",
        items: by(_shared.ALL_NOTES, "folder", f => _shared.ALL_NOTES.filter(n => n.folder === f).length)
      }]
    },
    bookmarks: {
      label: "Bookmarks",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All bookmarks",
          count: _shared.ALL_BOOKMARKS.length
        }]
      }, {
        heading: "Collections",
        items: by(_shared.ALL_BOOKMARKS, "col", c => _shared.ALL_BOOKMARKS.filter(b => b.col === c).length)
      }]
    },
    files: {
      label: "Files",
      groups: [{
        heading: null,
        items: [{
          id: "all",
          label: "All files",
          count: _shared.ALL_FILES.length
        }]
      }, {
        heading: "Folders",
        items: by(_shared.ALL_FILES, "folder", f => _shared.ALL_FILES.filter(x => x.folder === f).length)
      }]
    }
  };
  const content = Object.fromEntries(Object.entries(nav).map(([k, v]) => [k, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: v.label,
    value: sub,
    onSelect: setSub,
    groups: v.groups
  }), v.after || null)]));
  if (!content[section]) return null;

  /* the page's side navigation: the AppShell sizes, collapses (Ctrl+[ or the header's toggle) and overlays it */
  return /*#__PURE__*/React.createElement(_plenixPlatform.NavPane, {
    as: "div",
    label: nav[section].label,
    title: nav[section].label,
    footer: onSettings ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "gear",
      onClick: onSettings
    }, nav[section].label, " settings") : null
  }, content[section]);
}
  } },
  "suite/search.jsx": { deps: {"plenix-platform":null,"./shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchScreen = SearchScreen;
var _plenixPlatform = require("plenix-platform");
var _shared = require("./shared.jsx");
/* Plenix suite · search (suite/search.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: the answer as a Notice, the results as Cards. */

const {
  useState,
  useRef,
  useEffect
} = React;

/* ─── Search ────────────────────────────────────────────────────── */
function SearchScreen({
  initialQuery = ''
}) {
  const [q, setQ] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null);
  const ref = useRef();
  // a query handed over from the Search workspace (Ask AI) runs at once
  useEffect(() => {
    setTimeout(() => ref.current && ref.current.focus(), 80);
    if (initialQuery.trim()) run();
  }, []);
  const run = async () => {
    if (!q.trim()) return;
    setLoading(true);
    setRes(null);
    try {
      setRes(await (0, _shared.aiSearch)(q));
    } catch {/* no answer */}
    setLoading(false);
  };
  const SUGG = ['contractor quote kitchen', 'Apex brand guidelines', 'flights to Madrid', 'tax documents 2026', 'meeting notes'];
  return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, {
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md",
    className: "plx-u-mx-auto plx-u-w-100p plx-u-max-w-600px"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "h1",
    variant: "title"
  }, "Search everything"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Files, notes, tasks, bookmarks, contacts \u2014 unified across all projects.")), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Search everything",
    hideLabel: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
    ref: ref,
    label: "Search everything",
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: e => e.key === 'Enter' && run(),
    placeholder: "Try: contractor quote from last month\u2026",
    loading: loading,
    shortcut: "Enter"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: run,
    disabled: !q.trim() || loading
  }, loading ? 'Searching…' : 'Search'), q ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => {
      setQ('');
      setRes(null);
    }
  }, "Clear") : null), !res && !loading ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "eyebrow"
  }, "Suggested searches"), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "sm"
  }, SUGG.map(s => /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    key: s,
    size: "sm",
    onClick: () => {
      setQ(s);
      setTimeout(run, 80);
    }
  }, s)))) : null, loading ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Typing, {
    label: "Searching"
  }), /*#__PURE__*/React.createElement("span", null, "Scanning all modules\u2026"))), [1, 2, 3].map(i => /*#__PURE__*/React.createElement(_plenixPlatform.Skeleton, {
    key: i,
    height: "72px"
  }))) : null, res && !loading ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    className: "plx-motion-enter"
  }, res.answer ? /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, res.answer) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "eyebrow"
  }, res.results && res.results.length || 0, " results"), (res.results || []).map((r, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: i,
    title: r.name,
    meta: r.preview,
    onOpen: () => {}
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Tag, null, r.module), r.project ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, r.project) : null, r.tags && r.tags.length ? /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, r.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t))) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data",
    className: "plx-u-ml-auto"
  }, r.date))))) : null));
}
  } },
  "suite/findSources.jsx": { deps: {"plenix-platform":null,"./shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIND_SOURCES = void 0;
exports.FindWorkspace = FindWorkspace;
exports.findResults = findResults;
var _plenixPlatform = require("plenix-platform");
var _shared = require("./shared.jsx");
/* Plenix suite · the Search workspace (suite/findSources.jsx). Pressing Enter in the header search opens it in
   the main work area: inside an application (Notes, Files…) it searches only that application, with that application's
   filters; on the dashboard home it searches everything, with a Section filter. Each source says what its rows are, which
   text is searched, its filters and its result columns; FindWorkspace draws them with the Platform SearchWorkspace. */

const {
  useState
} = React;
const PRI = {
  high: "High",
  med: "Medium",
  low: "Low"
};
const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
// each source: label, noun, rows() → [{ key, name, sub, cells, facets, open }], filters, columns (DataGrid column
// definitions for the DataGrid; a grid row is the source row's cells with its key as id, its name and its facets)
const FIND_SOURCES = exports.FIND_SOURCES = {
  projects: {
    label: "Projects",
    noun: "project",
    filters: [{
      id: "status",
      label: "Status"
    }, {
      id: "tags",
      label: "Tags",
      multiple: true
    }],
    columns: [{
      title: "Project",
      field: "name",
      kind: "name"
    }, {
      title: "Status",
      field: "status",
      kind: "center",
      render: r => /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: r.status === "Active" ? "success" : "neutral"
      }, r.status)
    }, {
      title: "Tags",
      field: "tags"
    }, {
      title: "Files",
      field: "files",
      kind: "data",
      align: "right",
      headerAlign: "right"
    }],
    rows: () => _shared.PROJECTS.map(p => ({
      key: "p" + p.id,
      name: p.name,
      sub: p.desc,
      cells: {
        status: cap(p.status),
        tags: p.tags.join(", "),
        files: p.files
      },
      facets: {
        status: cap(p.status),
        tags: p.tags
      }
    }))
  },
  messaging: {
    label: "Messages",
    noun: "conversation",
    filters: [{
      id: "ch",
      label: "Channel",
      multiple: true
    }],
    columns: [{
      title: "Conversation",
      field: "name",
      kind: "name"
    }, {
      title: "Last message",
      field: "preview"
    }, {
      title: "Channel",
      field: "ch"
    }, {
      title: "Time",
      field: "time",
      kind: "data"
    }],
    rows: () => _shared.THREADS.map(t => ({
      key: "t" + t.id,
      id: t.id,
      name: t.name,
      sub: t.preview,
      cells: {
        preview: t.preview,
        ch: t.ch,
        time: t.time
      },
      facets: {
        ch: t.ch
      }
    }))
  },
  contacts: {
    label: "Contacts",
    noun: "contact",
    filters: [{
      id: "co",
      label: "Company",
      multiple: true
    }],
    columns: [{
      title: "Name",
      field: "name",
      kind: "name"
    }, {
      title: "Role",
      field: "role"
    }, {
      title: "Company",
      field: "co"
    }],
    rows: () => _shared.CONTACTS.map(c => ({
      key: "c" + c.id,
      name: c.name,
      sub: c.role + " · " + c.co,
      cells: {
        role: c.role,
        co: c.co
      },
      facets: {
        co: c.co
      }
    }))
  },
  calendar: {
    label: "Calendar",
    noun: "event",
    filters: [{
      id: "cal",
      label: "Calendar",
      multiple: true
    }],
    columns: [{
      title: "Event",
      field: "name",
      kind: "name"
    }, {
      title: "Date",
      field: "date",
      kind: "data"
    }, {
      title: "Time",
      field: "time",
      kind: "data"
    }, {
      title: "Calendar",
      field: "cal"
    }],
    rows: () => _shared.CAL_EVENTS.map(e => ({
      key: "e" + e.id,
      name: e.title,
      sub: "Mar " + e.date + " · " + e.time,
      cells: {
        date: "Mar " + e.date,
        time: e.time,
        cal: cap(e.cal)
      },
      facets: {
        cal: cap(e.cal)
      }
    }))
  },
  tasks: {
    label: "Tasks",
    noun: "task",
    filters: [{
      id: "proj",
      label: "Project",
      multiple: true
    }, {
      id: "pri",
      label: "Priority"
    }, {
      id: "state",
      label: "Status"
    }],
    columns: [{
      title: "Task",
      field: "name",
      kind: "name"
    }, {
      title: "Project",
      field: "proj"
    }, {
      title: "Priority",
      field: "pri"
    }, {
      title: "Due",
      field: "due",
      kind: "data"
    }, {
      title: "Status",
      field: "state"
    }],
    rows: () => _shared.ALL_TASKS.map(t => ({
      key: "k" + t.id,
      name: t.title,
      sub: t.proj,
      cells: {
        proj: t.proj,
        pri: PRI[t.pri] || t.pri,
        due: t.due,
        state: t.done ? "Done" : "Open"
      },
      facets: {
        proj: t.proj,
        pri: PRI[t.pri] || t.pri,
        state: t.done ? "Done" : "Open"
      }
    }))
  },
  notes: {
    label: "Notes",
    noun: "note",
    filters: [{
      id: "folder",
      label: "Folder",
      multiple: true
    }, {
      id: "tags",
      label: "Tags",
      multiple: true
    }],
    columns: [{
      title: "Note",
      field: "name",
      kind: "name"
    }, {
      title: "Folder",
      field: "folder"
    }, {
      title: "Tags",
      field: "tags",
      kind: "center",
      render: r => r.facets.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
        key: t
      }, t))
    }, {
      title: "Date",
      field: "date",
      kind: "data"
    }],
    rows: () => _shared.ALL_NOTES.map(n => ({
      key: "n" + n.id,
      name: n.title,
      sub: n.preview,
      cells: {
        folder: n.folder,
        date: n.date
      },
      facets: {
        folder: n.folder,
        tags: n.tags
      }
    }))
  },
  bookmarks: {
    label: "Bookmarks",
    noun: "bookmark",
    filters: [{
      id: "col",
      label: "Collection",
      multiple: true
    }, {
      id: "tags",
      label: "Tags",
      multiple: true
    }],
    columns: [{
      title: "Bookmark",
      field: "name",
      kind: "name"
    }, {
      title: "Site",
      field: "url",
      kind: "data"
    }, {
      title: "Collection",
      field: "col"
    }, {
      title: "Date",
      field: "date",
      kind: "data"
    }],
    rows: () => _shared.ALL_BOOKMARKS.map(b => ({
      key: "b" + b.id,
      name: b.title,
      sub: b.url,
      cells: {
        url: b.url,
        col: b.col,
        date: b.date
      },
      facets: {
        col: b.col,
        tags: b.tags
      }
    }))
  },
  files: {
    label: "Files",
    noun: "file",
    filters: [{
      id: "t",
      label: "Type",
      multiple: true
    }, {
      id: "folder",
      label: "Folder",
      multiple: true
    }],
    columns: [{
      title: "Name",
      field: "name",
      kind: ["name", "data"]
    }, {
      title: "Type",
      field: "t",
      kind: "data"
    }, {
      title: "Size",
      field: "s",
      kind: "data",
      align: "right",
      headerAlign: "right"
    }, {
      title: "Folder",
      field: "folder"
    }, {
      title: "Modified",
      field: "d",
      kind: "data"
    }],
    rows: () => _shared.ALL_FILES.map((f, i) => ({
      key: "f" + i,
      name: f.name,
      sub: f.folder,
      cells: {
        t: f.t,
        s: f.s,
        folder: f.folder,
        d: f.d
      },
      facets: {
        t: f.t,
        folder: f.folder
      }
    }))
  }
};
// the dashboard home: everything, with the section each row comes from (a file is named by its file name: the data font)
const ALL = {
  label: "Everything",
  noun: "result",
  filters: [{
    id: "section",
    label: "Section",
    multiple: true
  }],
  columns: [{
    title: "Name",
    field: "name",
    kind: "name",
    render: r => r.app === "files" ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, r.name) : r.name
  }, {
    title: "Section",
    field: "section"
  }, {
    title: "Details",
    field: "sub"
  }],
  rows: () => [].concat.apply([], Object.keys(FIND_SOURCES).map(id => FIND_SOURCES[id].rows().map(r => ({
    ...r,
    key: id + ":" + r.key,
    app: id,
    cells: {
      ...r.cells,
      section: FIND_SOURCES[id].label,
      sub: r.sub
    },
    facets: {
      ...r.facets,
      section: FIND_SOURCES[id].label
    }
  }))))
};

// the rows of a source whose text holds every word of the query (the header's quick results and the workspace)
const matches = (r, words) => {
  const hay = [r.name, r.sub].concat(Object.values(r.cells).map(String)).concat([].concat.apply([], Object.values(r.facets).map(v => [].concat(v)))).join(" ").toLowerCase();
  return words.every(w => hay.indexOf(w) >= 0);
};
const wordsOf = query => query.toLowerCase().split(/\s+/).filter(Boolean);
// the quick results of the header search (the full-screen search view at Narrow): app is an application id, or "home"
function findResults(app, query) {
  const src = app === "home" ? ALL : FIND_SOURCES[app];
  const words = wordsOf(query || "");
  return src && words.length ? src.rows().filter(r => matches(r, words)).map(r => ({
    ...r,
    app: r.app || app,
    section: app === "home" ? r.cells.section : null
  })) : [];
}
const optsOf = (rows, id) => {
  const all = [].concat.apply([], rows.map(r => [].concat(r.facets[id] === undefined ? [] : r.facets[id])));
  return Array.from(new Set(all)).sort().map(v => ({
    value: v,
    label: String(v),
    count: all.filter(x => x === v).length
  }));
};

/* the workspace: app is a dashboard application id, or "home" for everything; onOpen(row, appId) opens a result */
function FindWorkspace({
  app,
  query,
  onQuery,
  onOpen,
  onAskAI
}) {
  const src = app === "home" ? ALL : FIND_SOURCES[app];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("Relevance");
  const rows = src.rows();
  const words = wordsOf(query);
  let found = rows.filter(r => {
    if (!matches(r, words)) return false;
    // a filter with several choices keeps rows that have any of them; a single choice must match
    return src.filters.every(f => {
      const v = filters[f.id],
        has = [].concat(r.facets[f.id] === undefined ? [] : r.facets[f.id]);
      if (f.multiple) return !(v && v.length) || v.some(x => has.indexOf(x) >= 0);
      return !v || has.indexOf(v) >= 0;
    });
  });
  if (sort === "Name A–Z") found = found.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "Name Z–A") found = found.slice().sort((a, b) => b.name.localeCompare(a.name));
  const defs = src.filters.map(f => ({
    ...f,
    options: optsOf(rows, f.id),
    value: f.multiple ? filters[f.id] || [] : filters[f.id] || null
  }));
  return /*#__PURE__*/React.createElement("div", {
    className: "plx-u-px-32px plx-u-py-24px plx-u-flex-1 plx-u-flex plx-u-flex-column plx-u-min-h-0 plx-u-overflow-y-auto"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SearchWorkspace, {
    title: query ? "Search results" : "Search",
    query: query,
    onQueryChange: onQuery,
    noun: src.noun,
    placeholder: app === "home" ? "Search files, notes, tasks, contacts…" : "Search " + src.label.toLowerCase() + "…",
    count: found.length,
    filters: defs,
    onFilterChange: (id, v) => setFilters({
      ...filters,
      [id]: v
    }),
    onClearAll: () => setFilters({}),
    sort: {
      value: sort,
      options: ["Relevance", "Name A–Z", "Name Z–A"],
      onChange: setSort
    },
    headEnd: app === "home" && onAskAI ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "sparkle",
      onClick: () => onAskAI(query)
    }, "Ask AI") : null
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: (app === "home" ? "Everything" : src.label) + " search results",
    columns: src.columns,
    data: found.map(r => ({
      ...r.cells,
      id: r.key,
      name: r.name,
      facets: r.facets
    })),
    onRowClick: record => {
      const r = found.find(x => x.key === record.id);
      if (r) onOpen(r, r.app || app);
    }
  })));
}
  } },
  "suite/suite.jsx": { deps: {"./session.js":"suite/session.js","plenix-platform":null,"./capture.jsx":"suite/capture.jsx","./leftnav.jsx":"suite/leftnav.jsx","./search.jsx":"suite/search.jsx","./findSources.jsx":"suite/findSources.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appPage = exports.SUITE = void 0;
exports.mountSuite = mountSuite;
exports.readPrefs = readPrefs;
exports.settingsPage = void 0;
exports.writePrefs = writePrefs;
var _session = require("./session.js");
var _plenixPlatform = require("plenix-platform");
var _capture = require("./capture.jsx");
var _leftnav = require("./leftnav.jsx");
var _search = require("./search.jsx");
var _findSources = require("./findSources.jsx");
/* Plenix suite · shell (suite/suite.jsx): the frame every Plenix application page shares (batch 149). Each application
   is its own page (<folder>/index.html) and mounts itself with mountSuite(appId, render):
   - the Plenix header: the switcher, the pinned applications (links to their pages), search, the Capture action and the
     account menu (My Account and Settings open the settings page);
   - the application's navigation pane (LeftNav) where the application has one, its footer opening its settings;
   - search: Enter in the header searches this application (the dashboard: everything); a result opens its application's
     page; Ask AI opens the AI search in this page;
   - the status bar and the capture overlay.
   render({ prefs, setPrefs, screen }) draws the application's main area. Preferences (Settings) are kept in localStorage
   (plenix.prefs) so every page reads the same ones.
   Screens (Platforms Standard 4.3): every screen has an address in the hash (useScreenLocation): #/search?q=… (the Search
   workspace), #/ask?q=… (the AI search), the application's own screens (#/note/42, #/thread/3, #/project/3/tasks) and,
   on any of them, ?in=<item> for the item chosen in the navigation pane. screen is the location with open(path, params)
   and parent(path, params), which keep the navigation pane's item. The last screen is restored on load (plenix.<app>.view).
   A search result opens its screen: in this page as a new history entry, on another application's page as its address.
   At Narrow the header search is a full-screen view (AppHeader): it shows this application's recent searches (kept in its
   view state, plenix.<app>.view, recentSearches; the last five) and, while a query is typed, its results; choosing one
   leaves the view (its history entry) and opens the result's screen. */

const {
  useState
} = React;

// every Plenix application of this suite: its id (PLENIX_APPS), its folder and its label
const SUITE = exports.SUITE = [{
  id: 'home',
  folder: 'dashboard',
  label: 'Dashboard'
}, {
  id: 'projects',
  folder: 'projects',
  label: 'Projects'
}, {
  id: 'messaging',
  folder: 'messages',
  label: 'Messages'
}, {
  id: 'contacts',
  folder: 'contacts',
  label: 'Contacts'
}, {
  id: 'calendar',
  folder: 'calendar',
  label: 'Calendar'
}, {
  id: 'tasks',
  folder: 'tasks',
  label: 'Tasks'
}, {
  id: 'notes',
  folder: 'notes',
  label: 'Notes'
}, {
  id: 'bookmarks',
  folder: 'bookmarks',
  label: 'Bookmarks'
}, {
  id: 'files',
  folder: 'files',
  label: 'Files'
}];
// the page of an application, from another application's page (every application folder sits beside the others)
// path: a screen of that application ("/note/42"), its address in the hash
const appPage = (id, path) => {
  const a = SUITE.find(x => x.id === id);
  return '../' + (a ? a.folder : 'dashboard') + '/index.html' + (path ? '#' + path : '');
};
exports.appPage = appPage;
const settingsPage = cat => '../settings/index.html' + (cat ? '#/' + cat : '');
// the screen a search result opens in its application (FIND_SOURCES keys: a letter for the kind, then the id)
exports.settingsPage = settingsPage;
const RESULT_SCREEN = {
  p: 'project',
  t: 'thread',
  c: 'contact',
  e: 'event',
  k: 'task',
  n: 'note',
  b: 'bookmark',
  f: 'file'
};
// each application's own settings category in Settings (none yet for Bookmarks)
const APP_SETTINGS = {
  home: 'dashboard',
  projects: 'projects',
  messaging: 'email',
  contacts: 'contacts',
  calendar: 'calendar',
  tasks: 'tasks',
  notes: 'notes',
  files: 'files'
};
// the settings page each application's navigation footer opens
const SETTINGS_FOR = {
  messaging: 'email',
  contacts: 'contacts',
  calendar: 'calendar',
  tasks: 'tasks',
  notes: 'notes',
  files: 'files',
  projects: 'projects'
};
// the applications whose page has a navigation pane (the dashboard, projects and settings draw their own)
const HAS_NAV = ['messaging', 'contacts', 'calendar', 'tasks', 'notes', 'bookmarks', 'files'];
const FIRST_SUB = {
  messaging: 't-1',
  calendar: 'month'
};

// the recent searches kept for an application, newest first
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
function readPrefs() {
  try {
    return JSON.parse(localStorage.getItem('plenix.prefs')) || {};
  } catch (e) {
    return {};
  }
}
function writePrefs(p) {
  try {
    localStorage.setItem('plenix.prefs', JSON.stringify(p));
  } catch (e) {/* this visit only */}
}
function Suite({
  app,
  render,
  page = 'workspace',
  legacy
}) {
  const [prefs, setPrefsState] = useState(readPrefs);
  const setPrefs = next => setPrefsState(cur => {
    const v = typeof next === 'function' ? next(cur) : next;
    writePrefs(v);
    return v;
  });
  const loc = (0, _plenixPlatform.useScreenLocation)({
    app,
    legacy
  });
  const top = loc.parts[0];
  const inSuite = SUITE.some(x => x.id === app);
  const scope = inSuite && app !== 'home' ? app : 'home';
  // the navigation pane's item: ?in=<id> on any screen (Messages: the open conversation is its item)
  const sub = app === 'messaging' && top === 'thread' ? 't-' + loc.parts[1] : loc.params.in || FIRST_SUB[app] || null;
  const setSub = id => {
    const t = app === 'messaging' && /^t-(\d+)$/.exec(id);
    if (t) loc.navigate(['thread', t[1]]);else loc.navigate('/', {
      in: id
    });
  };
  const screen = React.useMemo(() => Object.assign({}, loc, {
    open: (path, params) => loc.navigate(path, Object.assign({
      in: loc.params.in
    }, params)),
    parent: (path, params) => loc.parent(path || '/', Object.assign({
      in: loc.params.in
    }, params))
  }), [loc]);
  const [capture, setCapture] = useState(false);
  const find = top === 'search' ? {
    app: scope,
    query: loc.params.q || ''
  } : null; // the search workspace in the main area (app "home": everything)
  const ai = top === 'ask' ? loc.params.q || '' : null; // a query handed to the AI search
  const [hq, setHq] = useState(() => find ? find.query : ''); // the header search field
  const label = (SUITE.find(x => x.id === app) || {
    label: 'Settings'
  }).label;
  const openResult = (r, a) => {
    const key = String(r.key || '').split(':').pop(); // everything's rows are keyed "<app>:<key>"
    const kind = RESULT_SCREEN[key.charAt(0)],
      id = key.slice(1);
    const path = kind && id ? kind === 'project' ? ['project', id, 'home'] : [kind, id] : null;
    if (a === app && path) loc.navigate(path);else (0, _plenixPlatform.leavePage)(appPage(a, path ? '/' + path.join('/') : ''));
  };
  const tone = {
    blue: 'accent',
    frost: 'frost',
    white: 'plain'
  }[prefs.headerBar || 'blue'] || 'accent';
  // the page header background (Settings › Appearance): read by EntityHeader from the page root
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-plx-header-tint', prefs.headerTint || 'none');
    root.setAttribute('data-plx-header-tint-style', prefs.headerTintStyle || 'fade');
  }, [prefs.headerTint, prefs.headerTintStyle]);
  // the appearance (Settings › Mode: system, light or dark; Platforms Standard 1.6): theme-boot keeps it for every page
  // (PlenixWorkspace.setMode) and applies it to <html data-plx-mode>. On load the kept choice wins (another app, such as
  // the DAM, may have changed it); a later change of prefs.theme is applied live; a change in another open page comes back
  const modeLoaded = React.useRef(false);
  React.useEffect(() => {
    const ws = window.PlenixWorkspace;
    if (!ws || !ws.setMode) return;
    if (!modeLoaded.current) {
      modeLoaded.current = true;
      if (prefs.theme !== ws.mode()) setPrefs(p => ({
        ...p,
        theme: ws.mode()
      }));
      return;
    }
    if (prefs.theme) ws.setMode(prefs.theme);
  }, [prefs.theme]);
  React.useEffect(() => {
    const follow = e => setPrefs(p => p.theme === e.detail.mode ? p : {
      ...p,
      theme: e.detail.mode
    });
    window.addEventListener('plenix:modechange', follow);
    return () => window.removeEventListener('plenix:modechange', follow);
  }, []);
  const onAccent = tone === 'accent';
  // the header search: Enter (or a recent search) opens the Search workspace and keeps the query among the recent ones
  const [kept, updateKept] = (0, _plenixPlatform.useViewState)(app);
  const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
  const runSearch = text => {
    const q = text.trim();
    if (q) updateKept(v => ({
      recentSearches: [q].concat((v.recentSearches || []).filter(x => x !== q)).slice(0, RECENT_MAX)
    }));
    setHq(q);
    afterSearchView(() => loc.navigate(['search'], {
      q
    }));
  };
  const typed = hq.trim().toLowerCase();
  const recentShown = recent.filter(x => x.toLowerCase().indexOf(typed) >= 0);
  const searchSuggestions = recentShown.length ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, null, "Recent searches"), /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList, {
    label: "Recent searches"
  }, recentShown.map(x => /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList.Item, {
    key: x,
    leading: /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "clock"
    }),
    title: x,
    onOpen: () => runSearch(x)
  })))) : null;
  const results = typed ? (0, _findSources.findResults)(scope, hq) : null;
  const searchResults = results ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, null, "Results"), results.length ? /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList, {
    label: "Results",
    stacked: true
  }, results.map(r => /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList.Item, {
    key: r.key,
    title: r.name,
    meta: r.section ? r.section + ' · ' + r.sub : r.sub,
    onOpen: () => afterSearchView(() => openResult(r, r.app))
  }))) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary",
    as: "p"
  }, 'Nothing matches “' + hq.trim() + '”.')) : null;
  // refining the query keeps the same screen (its entry is corrected in place); a new search from the header is a new screen
  const main = ai !== null ? /*#__PURE__*/React.createElement(_search.SearchScreen, {
    key: ai,
    initialQuery: ai
  }) : find ? /*#__PURE__*/React.createElement(_findSources.FindWorkspace, {
    key: find.app,
    app: find.app,
    query: find.query,
    onQuery: q => {
      loc.navigate(['search'], {
        q
      }, {
        replace: true
      });
      setHq(q);
    },
    onOpen: openResult,
    onAskAI: q => loc.navigate(['ask'], {
      q
    })
  }) : render({
    prefs,
    setPrefs,
    screen
  });
  return /*#__PURE__*/React.createElement(_plenixPlatform.AppShell, {
    page: page,
    mainClassName: "plx-shell-main",
    footer: /*#__PURE__*/React.createElement(_plenixPlatform.StatusBar, {
      start: /*#__PURE__*/React.createElement("span", null, SUITE.length - 1, " applications \xB7 Lighthouse Way"),
      end: /*#__PURE__*/React.createElement("span", null, "Synced just now")
    }),
    sideNav: HAS_NAV.includes(app) ? /*#__PURE__*/React.createElement(_leftnav.LeftNav, {
      section: app,
      sub: sub,
      setSub: setSub,
      onSettings: () => (0, _plenixPlatform.leavePage)(settingsPage(SETTINGS_FOR[app] || 'general'))
    }) : null,
    header: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader, {
      tone: tone,
      currentApp: inSuite ? app : null,
      appsRoot: "../",
      appName: inSuite ? undefined : label,
      action: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader.Action, {
        variant: onAccent ? 'secondary' : 'primary',
        icon: "snapshot",
        onClick: () => setCapture(true)
      }, "Capture"),
      search: /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
        placeholder: inSuite && app !== 'home' ? 'Search ' + label.toLowerCase() + '…' : 'Search files, notes, contacts…',
        label: "Search",
        shortcut: "Ctrl K",
        onAccent: onAccent,
        value: hq,
        onChange: e => setHq(e.target.value),
        onClear: () => setHq(''),
        onKeyDown: e => {
          if (e.key === 'Enter') runSearch(hq);
        }
      }),
      searchSuggestions: searchSuggestions,
      searchResults: searchResults,
      account: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader.Account, {
        current: app === 'settings' ? top === 'account' ? 'account' : 'settings' : undefined,
        myAccount: {
          href: settingsPage('account')
        },
        settings: {
          href: settingsPage('general')
        },
        appSettings: APP_SETTINGS[app] ? {
          app: label,
          href: settingsPage(APP_SETTINGS[app])
        } : {}
      })
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: "plx-app-shell__page"
  }, main), capture ? /*#__PURE__*/React.createElement(_capture.CaptureUI, {
    onClose: () => setCapture(false)
  }) : null);
}

// mounts an application page: mountSuite('notes', () => <NotesScreen/>)
// opts.page: what kind of page the app is (the design system's layout standard lays it out; default "workspace")
// opts.legacy(hash): the screen path of an older address of this page (#t-3, #account), opened in its place
function mountSuite(app, render, opts) {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(_plenixPlatform.SessionProvider, {
    session: _session.SUITE_SESSION
  }, /*#__PURE__*/React.createElement(Suite, {
    app: app,
    render: render,
    page: opts && opts.page || 'workspace',
    legacy: opts && opts.legacy
  })));
}
  } },
  "dashboard/dashboard.jsx": { deps: {"plenix-platform":null,"../suite/shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarWidget = CalendarWidget;
exports.ContactsWidget = ContactsWidget;
exports.Dashboard = Dashboard;
exports.EmailsWidget = EmailsWidget;
exports.NotesWidget = NotesWidget;
exports.NotificationsWidget = NotificationsWidget;
exports.ProjectsWidget = ProjectsWidget;
exports.TasksWidget = TasksWidget;
var _plenixPlatform = require("plenix-platform");
var _shared = require("../suite/shared.jsx");
/* Plenix · dashboard (dashboard/dashboard.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 201: every widget is a Panel; the widgets sit in a WidgetGrid (drag a handle or use the arrow keys to reorder);
   rows are ActivityList items, RowButtons, Checkboxes and EventChips; project cards carry the project's color as their accent. */

const {
  useState,
  useEffect
} = React;
const allLink = (label, onClick) => /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
  variant: "ghost",
  size: "xs",
  iconEnd: "chevron-right",
  label: label,
  onClick: onClick
}, "All");

/* ─── Dashboard Widgets ─────────────────────────────────────────── */
function EmailsWidget({
  handle,
  onViewAll,
  prefs
}) {
  const [exp, setExp] = useState(null);
  const showAv = prefs?.emailAvatar !== false;
  const max = parseInt(prefs?.emailMax || '5', 10);
  const open = _shared.EMAILS.find(e => e.id === exp);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "message",
    title: "Emails",
    flush: true,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: "negative",
      size: "sm"
    }, "2"), allLink('View all emails', onViewAll), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList, {
    label: "Emails"
  }, _shared.EMAILS.slice(0, max).map(em => /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList.Item, {
    key: em.id,
    unread: !!em.unread,
    selected: exp === em.id,
    onOpen: () => setExp(exp === em.id ? null : em.id),
    leading: showAv ? /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
      name: em.from,
      size: "xs"
    }) : null,
    title: em.from,
    meta: em.subj,
    time: em.time
  }))), open ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    inset: "sm",
    gap: "sm",
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary",
    as: "p"
  }, open.prev), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    size: "sm"
  }, "Reply"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm"
  }, "Archive"))) : null);
}
function CalendarWidget({
  handle,
  onViewAll
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "calendar",
    title: "Calendar",
    description: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "Mar 5"),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, allLink('View all calendar', onViewAll), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, _shared.EVENTS.map(ev => /*#__PURE__*/React.createElement(_plenixPlatform.EventChip, {
    key: ev.id,
    title: ev.title,
    time: ev.time,
    color: ev.color
  }))));
}
function ProjectsWidget({
  handle,
  onViewAll,
  onProject,
  prefs
}) {
  const density = prefs?.projDensity || 'card';
  const showFiles = prefs?.projFiles || false;
  const showCategory = prefs?.projCategory !== false;
  const showTags = prefs?.projTags || false;
  const showDesc = prefs?.projDesc || false;
  const active = _shared.PROJECTS.filter(p => p.status === 'active');
  const catLabel = {
    personal: 'Personal',
    client: 'Client',
    research: 'Research',
    travel: 'Travel',
    finance: 'Finance'
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "briefcase",
    title: "Projects",
    flush: density !== 'card',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, allLink('View all projects', onViewAll), handle)
  }, density === 'card' ? /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Active projects"
  }, active.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: p.id,
    title: p.name,
    meta: showCategory ? catLabel[p.tags[0]] || p.tags[0] : null,
    accent: p.color,
    onOpen: () => onProject(p)
  }, showDesc ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, p.desc.substring(0, 55), "\u2026") : null, showFiles ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, p.files, " files") : null, showTags ? /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, p.tags.slice(0, 2).map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t))) : null))) : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "none"
  }, active.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, {
    key: p.id,
    onClick: () => onProject(p)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    inset: "sm",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong",
    truncate: true
  }, p.name), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, showCategory ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, catLabel[p.tags[0]] || p.tags[0]) : null, showFiles ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, p.files) : null))))));
}
function ContactsWidget({
  handle,
  onViewAll
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "settings-users",
    title: "Contacts",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, allLink('View all contacts', onViewAll), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, _shared.CONTACTS.map(c => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: c.id,
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
    name: c.name,
    size: "sm"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong",
    truncate: true,
    className: "plx-u-flex-1"
  }, c.name), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    iconOnly: true,
    label: 'Message ' + c.name,
    icon: /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "message"
    })
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    iconOnly: true,
    label: 'Call ' + c.name,
    icon: /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "phone"
    })
  })))));
}

/* ─── Tasks Widget (dashboard mini) ────────────────────────────── */
function TasksWidget({
  handle,
  onViewAll,
  prefs
}) {
  const [done, setDone] = useState(() => Object.fromEntries(_shared.ALL_TASKS.map(t => [t.id, t.done])));
  const showPri = prefs?.taskPri !== false;
  const showDue = prefs?.taskDue !== false;
  const max = parseInt(prefs?.taskMax || '7', 10);
  const pending = _shared.ALL_TASKS.filter(t => !done[t.id]).slice(0, max);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "circle-check",
    title: "To do",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: "waiting",
      size: "sm"
    }, pending.length), allLink('View all to-dos', onViewAll), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, pending.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: t.id,
    gap: "sm",
    justify: "between",
    align: "baseline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "xs",
    align: "baseline"
  }, showPri ? /*#__PURE__*/React.createElement(_shared.Priority, {
    pri: t.pri
  }) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    label: t.title,
    checked: !!done[t.id],
    onChange: () => setDone(d => ({
      ...d,
      [t.id]: !d[t.id]
    }))
  })), showDue ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, t.due) : null))));
}
function NotesWidget({
  handle,
  onViewAll,
  prefs
}) {
  const showDate = prefs?.noteDate !== false;
  const showFolder = prefs?.noteFolder !== false;
  const max = parseInt(prefs?.noteMax || '6', 10);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "doc-text",
    title: "Notes",
    flush: true,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, allLink('View all notes', onViewAll), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList, {
    label: "Notes"
  }, _shared.ALL_NOTES.slice(0, max).map(n => /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList.Item, {
    key: n.id,
    onOpen: onViewAll,
    title: n.title,
    meta: showFolder ? n.folder.split(' ')[0] : null,
    time: showDate ? n.date : null
  }))));
}

/* the person's notifications (they are not in the header): the session's, unread first marked; Mark all read */
function NotificationsWidget({
  handle
}) {
  const {
    notifications,
    setNotifications
  } = (0, _plenixPlatform.useSession)();
  const unread = notifications.filter(n => n.unread).length;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "hdr-bell",
    title: "Notifications",
    flush: true,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, unread ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: "negative",
      size: "sm"
    }, String(unread)) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "xs",
      disabled: !unread,
      onClick: () => setNotifications(notifications.map(n => ({
        ...n,
        unread: false
      })))
    }, "Mark all read"), handle)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NotificationList, {
    limit: 5,
    footer: false
  }));
}

/* ─── Dashboard: the widgets in a reorderable grid ─────────────── */
const ORDER = [{
  id: 'projects',
  title: 'Projects',
  span: '2'
}, {
  id: 'notifications',
  title: 'Notifications'
}, {
  id: 'emails',
  title: 'Emails',
  span: '2'
}, {
  id: 'tasks',
  title: 'To do'
}, {
  id: 'notes',
  title: 'Notes'
}, {
  id: 'calendar',
  title: 'Calendar'
}, {
  id: 'contacts',
  title: 'Contacts'
}];
function Dashboard({
  setSection,
  setProject,
  prefs
}) {
  const [order, setOrder] = useState(ORDER);
  // at Narrow the widgets stack in one column, each the full width (reflow at 320px, WCAG 1.4.10): three columns, or a
  // widget spanning two, would scroll the page sideways
  const layout = (0, _plenixPlatform.useAppLayout)();
  const narrow = !!(layout && layout.narrow);
  const widgets = {
    projects: /*#__PURE__*/React.createElement(ProjectsWidget, {
      onViewAll: () => setSection('projects'),
      onProject: p => {
        setProject(p);
        setSection('project-detail');
      },
      prefs: prefs
    }),
    emails: /*#__PURE__*/React.createElement(EmailsWidget, {
      onViewAll: () => setSection('messaging'),
      prefs: prefs
    }),
    tasks: /*#__PURE__*/React.createElement(TasksWidget, {
      onViewAll: () => setSection('tasks'),
      prefs: prefs
    }),
    notes: /*#__PURE__*/React.createElement(NotesWidget, {
      onViewAll: () => setSection('notes'),
      prefs: prefs
    }),
    calendar: /*#__PURE__*/React.createElement(CalendarWidget, {
      onViewAll: () => setSection('calendar')
    }),
    contacts: /*#__PURE__*/React.createElement(ContactsWidget, {
      onViewAll: () => setSection('contacts')
    }),
    notifications: /*#__PURE__*/React.createElement(NotificationsWidget, null)
  };
  // the clock
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = now.getHours(),
    m = now.getMinutes();
  const hStr = `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
  const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md",
    inset: "md",
    grow: true,
    scroll: true,
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, hStr), /*#__PURE__*/React.createElement(_plenixPlatform.Divider, {
    orientation: "vertical"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, dStr)), /*#__PURE__*/React.createElement(_plenixPlatform.WidgetGrid, {
    label: "Dashboard",
    columns: narrow ? 'auto' : 3,
    items: narrow ? order.map(w => ({
      ...w,
      span: '1'
    })) : order,
    renderItem: (w, handle) => React.cloneElement(widgets[w.id], {
      handle
    }),
    onReorder: ids => setOrder(ids.map(id => order.find(x => x.id === id)))
  }));
}
  } },
  "projects/projects.jsx": { deps: {"plenix-platform":null,"../suite/shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewProjectModal = NewProjectModal;
exports.ProjStatus = exports.ProjIco = void 0;
exports.ProjectContent = ProjectContent;
exports.ProjectDetail = ProjectDetail;
exports.ProjectNav = ProjectNav;
exports.ProjectsScreen = ProjectsScreen;
exports.ProjectsSidebar = ProjectsSidebar;
exports.projectScreen = void 0;
var _plenixPlatform = require("plenix-platform");
var _shared = require("../suite/shared.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* Plenix · projects (projects/projects.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 201: the projects in the shell's NavPane, a project's capabilities in a SecondaryPane, its home as a record page
   header with a ProgressBar and Metrics over Panels, its tasks, notes and files as Checkboxes, Cards and a DataGrid, the
   capabilities to come as EmptyStates, and the new-project dialog from Fields, Fieldsets and Checkboxes.
   Screens (Platforms Standard 4.3): a project and its capability (#/project/<id>/<capability>, e.g. #/project/3/tasks), a
   history entry each, on the projects page and on the dashboard. The new-project dialog asks before closing with
   unsaved entries (useUnsavedGuard). */
const {
  useState
} = React;

/* ─── Projects ──────────────────────────────────────────────────── */
/* Project icons: data in plain script (window.PROJ_ICONS), drawn in the text color around them */
const ProjIco = ({
  n,
  size = 15
}) => {
  const html = window.PROJ_ICONS && window.PROJ_ICONS[n] ? window.PROJ_ICONS[n] : window.PROJ_ICONS && window.PROJ_ICONS.notes || '';
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
    className: "plx-u-block plx-u-shrink-0",
    dangerouslySetInnerHTML: {
      __html: html
    }
  });
};

/* ── Status badge ── */
exports.ProjIco = ProjIco;
const STATUS = {
  active: ['active', 'Active'],
  paused: ['waiting', 'Paused'],
  completed: ['success', 'Completed'],
  archived: ['neutral', 'Archived']
}; // status pill variants (owner, 2026-10-14)
const statusOf = s => {
  const v = STATUS[s] || STATUS.active;
  return {
    tone: v[0],
    label: v[1]
  };
};
const ProjStatus = ({
  s
}) => {
  const v = STATUS[s] || STATUS.active;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: v[0]
  }, v[1]);
};

/* ── The projects list: the shell's side navigation ── */
exports.ProjStatus = ProjStatus;
function ProjectsSidebar({
  projects,
  selected,
  onSelect,
  onSettings
}) {
  const collection = (0, _plenixPlatform.useCollectionView)([{
    value: 'category',
    label: 'Filter',
    kind: 'select',
    get: p => p.tags[0]
  }], {
    text: p => p.name,
    quick: {
      category: 'list'
    }
  });
  const search = collection.search;
  const filterCat = (collection.quick.category || [])[0] || 'all';
  const sort = collection.sort.length ? collection.sort[0].field : 'name';
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newClient, setNewClient] = useState('__none__');
  const [newBilling, setNewBilling] = useState('Time & materials');
  const [newCaps, setNewCaps] = useState(() => new Set(window.DEFAULT_CAPS));
  const labels = {
    personal: 'Personal',
    client: 'Client Work',
    research: 'Research',
    travel: 'Travel',
    finance: 'Finance',
    archive: 'Archive'
  };
  const allCats = [...new Set(projects.map(p => p.tags[0]))];
  const toggleCap = id => setNewCaps(prev => {
    const n = new Set(prev);
    if (n.has(id)) n.delete(id);else n.add(id);
    return n;
  });
  let visible = projects.filter(collection.test);
  if (sort === 'name') visible = [...visible].sort((a, b) => a.name.localeCompare(b.name));else if (sort === 'status') visible = [...visible].sort((a, b) => a.status.localeCompare(b.status));
  const grouped = filterCat === 'all' && !search.trim();
  const groups = {};
  if (grouped) visible.forEach(p => {
    const t = p.tags[0];
    if (!groups[t]) groups[t] = [];
    groups[t].push(p);
  });
  const pick = id => {
    const p = projects.find(x => x.id === id);
    if (p) onSelect(p);
  };
  const navItem = p => ({
    id: p.id,
    label: p.name,
    icon: 'briefcase'
  });
  return /*#__PURE__*/React.createElement(_plenixPlatform.SideNavPortal, null, /*#__PURE__*/React.createElement(_plenixPlatform.NavPane, {
    as: "div",
    label: "Projects",
    title: "Projects",
    footer: onSettings ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "gear",
      onClick: onSettings
    }, "Projects settings") : null,
    rail: projects.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.ToolRail.Item, {
      key: p.id,
      label: p.name,
      pressed: !!(selected && selected.id === p.id),
      icon: "briefcase",
      onClick: () => onSelect(p)
    }))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.CommandBar, {
    label: "Projects",
    narrow: true,
    sticky: false,
    count: visible.length + ' projects',
    actions: [{
      id: 'new',
      icon: 'plus',
      label: 'New project',
      onSelect: () => {
        setNewName('');
        setNewClient('__none__');
        setNewBilling('Time & materials');
        setNewCaps(new Set(window.DEFAULT_CAPS));
        setShowNew(true);
      }
    }],
    find: /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarSearch, _extends({}, collection.searchProps, {
      placeholder: "Search projects...",
      label: "Search projects"
    })),
    view: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Menu, {
      trigger: /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarButton, {
        icon: "filter",
        label: "Filter",
        active: filterCat !== 'all',
        caret: true
      })
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuRadioGroup, {
      label: "Filter",
      value: filterCat,
      onChange: value => collection.setQuick('category', value === 'all' ? [] : [value])
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
      value: "all"
    }, "All categories"), allCats.map(c => /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
      key: c,
      value: c
    }, labels[c] || c)))), /*#__PURE__*/React.createElement(_plenixPlatform.Menu, {
      trigger: /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarButton, {
        icon: "sort",
        label: "Sort",
        caret: true
      })
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuRadioGroup, {
      label: "Sort",
      value: sort,
      onChange: field => collection.setSort([{
        field,
        dir: 'asc'
      }])
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
      value: "name"
    }, "Name A\u2013Z"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
      value: "status"
    }, "Status"))))
  }), grouped ? /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Projects",
    value: selected ? selected.id : undefined,
    onSelect: pick,
    groups: Object.entries(groups).map(([tag, projs]) => ({
      heading: labels[tag] || tag,
      items: projs.map(navItem)
    }))
  }) : visible.length > 0 ? /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Projects",
    value: selected ? selected.id : undefined,
    onSelect: pick,
    items: visible.map(navItem)
  }) : /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
    title: "No projects match."
  }), showNew ? /*#__PURE__*/React.createElement(NewProjectModal, {
    onClose: () => setShowNew(false),
    newName: newName,
    setNewName: setNewName,
    newClient: newClient,
    setNewClient: setNewClient,
    newBilling: newBilling,
    setNewBilling: setNewBilling,
    newCaps: newCaps,
    toggleCap: toggleCap,
    dirty: newName.trim() !== '' || newClient !== '__none__' || newBilling !== 'Time & materials' || [...newCaps].sort().join() !== [...window.DEFAULT_CAPS].sort().join()
  }) : null));
}

/* ── A project's capabilities: a SecondaryPane beside its content; it folds to a rail of its capabilities and resizes ── */
function ProjectNav({
  proj,
  active,
  onNav,
  caps
}) {
  const [view, updateView] = (0, _plenixPlatform.useViewState)('projects');
  const pCaps = caps || window.DEFAULT_CAPS;
  const navGroups = [{
    heading: null,
    items: [{
      id: 'home',
      label: 'Project home',
      icon: /*#__PURE__*/React.createElement(ProjIco, {
        n: "home",
        size: 14
      })
    }]
  }].concat(window.CAPABILITY_GROUPS.map(grp => ({
    heading: grp.group,
    items: grp.items.filter(it => pCaps.has(it.id)).map(it => ({
      id: it.id,
      label: it.label,
      icon: /*#__PURE__*/React.createElement(ProjIco, {
        n: it.icon,
        size: 13
      })
    }))
  })).filter(g => g.items.length));
  return /*#__PURE__*/React.createElement(_plenixPlatform.SecondaryPane, {
    title: proj.name,
    width: "md",
    collapsible: true,
    resizable: true,
    size: view.paneWidth,
    onSizeChange: w => updateView({
      paneWidth: w
    }),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      iconOnly: true,
      icon: "gear",
      label: "Project settings",
      onClick: () => onNav('settings')
    }),
    rail: navGroups.reduce((all, g) => all.concat(g.items), []).map(it => /*#__PURE__*/React.createElement(_plenixPlatform.ToolRail.Item, {
      key: it.id,
      label: it.label,
      icon: it.icon,
      pressed: active === it.id,
      onClick: () => onNav(it.id)
    }))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: proj.name,
    value: active,
    onSelect: onNav,
    groups: navGroups
  }));
}
function ProjectContent({
  proj,
  panel
}) {
  const pTasks = _shared.ALL_TASKS.filter(t => t.proj.includes(proj.name.split(' ')[0]));
  const pNotes = _shared.ALL_NOTES.filter(n => n.folder === proj.name.split(' ')[0]);
  const pFiles = _shared.ALL_FILES.filter(f => f.folder === proj.name.split('—')[0].trim().replace('Tax & Finances 2026', 'Tax 2026'));
  const [done, setDone] = useState(() => Object.fromEntries(pTasks.map(t => [t.id, t.done])));
  const doneT = pTasks.filter(t => done[t.id]).length;
  const pct = pTasks.length ? Math.round(doneT / pTasks.length * 100) : 0;
  const toggle = t => setDone(d => ({
    ...d,
    [t.id]: !d[t.id]
  }));
  const due = t => /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: t.due === 'Overdue' ? 'danger' : 'data'
  }, t.due);
  const taskRow = t => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: t.id,
    gap: "sm",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    label: done[t.id] ? /*#__PURE__*/React.createElement("s", null, t.title) : t.title,
    checked: !!done[t.id],
    onChange: () => toggle(t)
  }), due(t));

  /* ── PROJECT HOME ── */
  if (panel === 'home') {
    const open = pTasks.filter(t => !done[t.id]);
    const overdue = open.filter(t => t.due === 'Overdue');
    return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "lg"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
      title: proj.name,
      media: {
        icon: 'briefcase',
        hue: proj.color
      },
      subtitle: proj.desc,
      status: statusOf(proj.status),
      facts: [{
        label: 'Due',
        value: open[0] ? open[0].due : '—',
        data: true
      }, {
        label: 'Tasks',
        value: pTasks.length - open.length + ' / ' + pTasks.length,
        data: true
      }, {
        label: 'Files',
        value: proj.files,
        data: true
      }],
      next: open[0] ? {
        title: open[0].title,
        detail: 'Due ' + open[0].due
      } : undefined,
      actions: [{
        icon: 'star',
        label: 'Favorite'
      }, {
        icon: 'share',
        label: 'Share'
      }, {
        icon: 'pencil',
        label: 'Edit'
      }, {
        icon: 'flag',
        label: 'Update status'
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "lg",
      wrap: true,
      align: "end"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      grow: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
      value: pct,
      color: proj.color,
      label: "Progress",
      showValue: true
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Metric.Group, {
      label: "Project figures"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
      value: doneT + '/' + pTasks.length,
      label: "Tasks"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
      value: proj.files,
      label: "Files"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
      value: pNotes.length,
      label: "Notes"
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
      count: 2
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "clock",
      title: "Upcoming tasks"
    }, open.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, open.slice(0, 4).map(taskRow)) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "All tasks complete.")), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "doc-text",
      title: "Recent notes",
      flush: true
    }, pNotes.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "none"
    }, pNotes.slice(0, 3).map(n => /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, {
      key: n.id
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      inset: "sm",
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, n.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, n.date))))) : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      inset: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "No notes yet.")))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "alert",
      title: "Overdue"
    }, overdue.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, overdue.slice(0, 4).map(taskRow)) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "No overdue tasks.")), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "folder",
      title: "Files"
    }, pFiles.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, pFiles.slice(0, 4).map((f, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      key: i,
      gap: "sm",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Tag, null, f.t), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data",
      truncate: true
    }, f.name)), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, f.d)))) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "No files attached."))))));
  }

  /* ── TASKS ── */
  if (panel === 'tasks') return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    title: "Tasks",
    media: {
      icon: 'circle-check',
      hue: proj.color
    },
    subtitle: proj.name,
    facts: [{
      label: 'Tasks',
      value: pTasks.length
    }, {
      label: 'Done',
      value: doneT
    }],
    actions: [{
      icon: 'share',
      label: 'Share'
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
    value: pct,
    color: proj.color,
    label: doneT + '/' + pTasks.length + ' tasks',
    showValue: true
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "circle-check",
    title: "All tasks"
  }, pTasks.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, pTasks.map(taskRow)) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "No tasks for this project yet."))));

  /* ── NOTES ── */
  if (panel === 'notes') return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    title: "Notes",
    media: {
      icon: 'doc-text',
      hue: proj.color
    },
    subtitle: proj.name,
    facts: [{
      label: 'Notes',
      value: pNotes.length
    }],
    actions: [{
      icon: 'share',
      label: 'Share'
    }]
  }), pNotes.length ? /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "lg",
    label: "Notes"
  }, pNotes.map((n, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: i,
    title: n.title,
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, n.date),
    accent: proj.color,
    onOpen: () => {}
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, n.preview), /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, n.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t)))))) : /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
    title: "No notes yet."
  })));

  /* ── FILES ── */
  if (panel === 'files') return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    title: "Files",
    media: {
      icon: 'folder',
      hue: proj.color
    },
    subtitle: proj.name,
    facts: [{
      label: 'Files',
      value: pFiles.length
    }],
    actions: [{
      icon: 'share',
      label: 'Share'
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: "Files",
    data: pFiles.map((f, i) => ({
      ...f,
      id: i
    })),
    empty: "No files attached. Connect OneDrive in Settings to link files.",
    columns: [{
      title: 'Name',
      field: 'name',
      kind: ['name', 'data'],
      filter: true,
      width: '--plx-ref-size-320px'
    }, {
      title: 'Type',
      field: 't',
      kind: 'data',
      filter: 'list'
    }, {
      title: 'Size',
      field: 's',
      kind: 'data',
      align: 'right',
      headerAlign: 'right'
    }, {
      title: 'Modified',
      field: 'd',
      kind: 'data'
    }]
  })));

  /* ── CAPABILITIES TO COME ── */
  const placeholders = {
    roadmap: ['Roadmap', 'Gantt-style timeline planning with drag-and-drop tasks and milestones. Coming soon.', 'roadmap'],
    contacts: ['Contacts', 'People linked to this project with roles — Owner, Client, Consultant, Reviewer. Coming soon.', 'contacts'],
    bookmarks: ['Bookmarks', 'Save, organize, and retrieve links with folder hierarchy, smart rules, and sharing. Coming soon.', 'link'],
    images: ['Images', 'Image gallery — upload, paste URL, or search Unsplash. Source for mood boards. Coming soon.', 'images'],
    mood_boards: ['Mood boards', 'Named visual collections in Grid or Masonry layout. Shareable read-only link. Coming soon.', 'mood'],
    time_tracking: ['Time tracking', 'Log hours, mark billable time, and view weekly/monthly breakdowns. Coming soon.', 'time'],
    activity: ['Activity feed', 'Every event logged — task changes, files, comments, status updates. Coming soon.', 'activity'],
    bookkeeping: ['Financials', 'Budget tracking, milestone payments, invoices, and payment history. Coming soon.', 'finance'],
    risks: ['Risks', 'RIAC log — Risks, Issues, Assumptions, Constraints with owner and priority. Coming soon.', 'risks'],
    changes: ['Changes', 'Formal change request workflow with timeline and cost impact. Coming soon.', 'changes']
  };
  if (placeholders[panel]) {
    const [title, desc, icon] = placeholders[panel];
    return /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      size: "page",
      icon: /*#__PURE__*/React.createElement(ProjIco, {
        n: icon,
        size: 40
      }),
      title: title
    }, desc));
  }
  return null;
}
function NewProjectModal({
  onClose,
  newName,
  setNewName,
  newClient,
  setNewClient,
  newBilling,
  setNewBilling,
  newCaps,
  toggleCap,
  dirty
}) {
  // Cancel, Close and Escape ask while something has been entered (Create project keeps it)
  const guard = (0, _plenixPlatform.useUnsavedGuard)(dirty, 'The new project has not been created.');
  const cancel = guard(onClose);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: cancel,
    title: "New project",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: cancel
    }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      disabled: !newName.trim(),
      onClick: onClose
    }, "Create project"))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Project title"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoFocus: true,
    autoComplete: "off",
    autoCapitalize: "words",
    enterKeyHint: "done",
    value: newName,
    onChange: e => setNewName(e.target.value),
    placeholder: "e.g. Website Redesign",
    onKeyDown: e => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        cancel();
      }
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Client",
    description: "optional"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: newClient || '__none__',
    onChange: e => setNewClient(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: "__none__"
  }, "No client \u2014 personal project"), /*#__PURE__*/React.createElement("option", {
    value: "__new__"
  }, "+ New client"), _shared.CONTACTS.slice(0, 6).map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.name
  }, c.name)))), newClient === '__new__' ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Company name"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoComplete: "organization",
    autoCapitalize: "words",
    enterKeyHint: "next"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Contact name"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoComplete: "name",
    autoCapitalize: "words",
    enterKeyHint: "next"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    type: "email",
    autoComplete: "email",
    enterKeyHint: "done"
  })))) : null, newClient && newClient !== '__none__' && newClient !== '__new__' ? /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Billing type"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SegmentedControl, {
    label: "Billing type",
    value: newBilling,
    onChange: setNewBilling,
    options: ['Time & materials', 'Fixed fee', 'Retainer', 'Non-Billable'].map(bt => ({
      value: bt,
      label: bt
    }))
  })) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
    legend: "Project team",
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
    name: "Philip Maher",
    size: "sm"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    className: "plx-u-flex-1"
  }, "Philip Maher"), /*#__PURE__*/React.createElement(_plenixPlatform.Tag, null, "Owner")), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    icon: "plus"
  }, "Add team member or external person\u2026"))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Capabilities"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Choose which features to include. These appear as sections in the project sidebar."), window.CAPABILITY_GROUPS.map(grp => /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
    key: grp.id,
    legend: grp.group,
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, grp.items.filter((x, i) => i % 2 === 0).map(item => /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    key: item.id,
    checked: newCaps.has(item.id),
    onChange: () => toggleCap(item.id),
    label: item.label
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, grp.items.filter((x, i) => i % 2 === 1).map(item => /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    key: item.id,
    checked: newCaps.has(item.id),
    onChange: () => toggleCap(item.id),
    label: item.label
  })))))))));
}

// the project screen: #/project/<id>/<capability> → { proj, panel }
const projectScreen = screen => {
  const proj = screen.parts[0] === 'project' ? _shared.PROJECTS.find(p => p.id === +screen.parts[1]) || null : null;
  return {
    proj,
    panel: proj && screen.parts[2] || 'home'
  };
};
exports.projectScreen = projectScreen;
function ProjectsScreen({
  onSettings,
  screen
}) {
  const {
    proj: selected,
    panel
  } = projectScreen(screen);
  const setPanel = p => screen.open(['project', selected.id, p]);
  const [projCaps] = useState({});
  const handleSelect = p => screen.open(['project', p.id, 'home']);
  const getCaps = p => p && projCaps[p.id] ? projCaps[p.id] : window.DEFAULT_CAPS;
  return /*#__PURE__*/React.createElement("div", {
    className: "plx-page-panes"
  }, /*#__PURE__*/React.createElement(ProjectsSidebar, {
    projects: _shared.PROJECTS,
    selected: selected,
    onSelect: handleSelect,
    onSettings: onSettings
  }), selected ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ProjectNav, {
    proj: selected,
    active: panel,
    onNav: setPanel,
    caps: getCaps(selected)
  }), /*#__PURE__*/React.createElement(ProjectContent, {
    key: selected.id,
    proj: selected,
    panel: panel
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
    size: "page",
    icon: "briefcase",
    title: "Select a project to get started"
  })));
}

/* ── A project opened from the dashboard ── */
function ProjectDetail({
  proj,
  screen
}) {
  const panel = screen && screen.parts[2] || 'home';
  const setPanel = p => screen.open(['project', proj.id, p]);
  return /*#__PURE__*/React.createElement("div", {
    className: "plx-page-panes"
  }, /*#__PURE__*/React.createElement(ProjectNav, {
    proj: proj,
    active: panel,
    onNav: setPanel
  }), /*#__PURE__*/React.createElement(ProjectContent, {
    proj: proj,
    panel: panel
  }));
}
  } },
  "dashboard/main.jsx": { deps: {"../suite/suite.jsx":"suite/suite.jsx","plenix-platform":null,"./dashboard.jsx":"dashboard/dashboard.jsx","../projects/projects.jsx":"projects/projects.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
var _suite = require("../suite/suite.jsx");
var _plenixPlatform = require("plenix-platform");
var _dashboard = require("./dashboard.jsx");
var _projects = require("../projects/projects.jsx");
/* Plenix · Dashboard (dashboard/main.jsx): the application's page entry; build-app.js compiles it to dashboard/app.js. */

// the home page: the widgets; a project opens here (#/project/<id>/<capability>, a history entry); every other
// application opens its page
function Home({
  prefs,
  screen
}) {
  const {
    proj
  } = (0, _projects.projectScreen)(screen);
  if (proj) return /*#__PURE__*/React.createElement(_projects.ProjectDetail, {
    key: proj.id,
    proj: proj,
    screen: screen
  });
  return /*#__PURE__*/React.createElement(_dashboard.Dashboard, {
    prefs: prefs,
    setProject: p => screen.open(['project', p.id, 'home']),
    setSection: s => {
      if (s !== 'project-detail') (0, _plenixPlatform.leavePage)((0, _suite.appPage)(s));
    }
  });
}
(0, _suite.mountSuite)('home', ({
  prefs,
  screen
}) => /*#__PURE__*/React.createElement(Home, {
  prefs: prefs,
  screen: screen
}), {
  page: 'dashboard'
});
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
  load("dashboard/main.jsx");
})();
