/*
 * GENERATED FILE — DO NOT EDIT
 * Source: settings/main.jsx and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "suite/shared.jsx": { deps: {"plenix-platform":null}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.THREADS = exports.SolidIco = exports.STATUS_TONE = exports.SOLID = exports.ProjStatusDot = exports.PriDot = exports.PROJECTS = exports.PRI_TONE = exports.PRI_LABEL = exports.P = exports.MSGS = exports.Ico = exports.EVENTS = exports.EMAILS = exports.CONTACTS = exports.CARD = exports.CAPTURES = exports.CAL_EVENTS = exports.CALENDARS = exports.Av = exports.AV_SIZES = exports.ALL_TASKS = exports.ALL_NOTES = exports.ALL_FILES = exports.ALL_BOOKMARKS = void 0;
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
  role: "Creative Director",
  co: "Apex Co",
  av: "M",
  avColor: "blue",
  last: "10:24 AM",
  msg: "Sounds great — I'll have concepts by Friday."
}, {
  id: 2,
  name: "Jeff Torres",
  role: "Plumber",
  co: "ABC Plumbing",
  av: "J",
  avColor: "brown",
  last: "9:41 AM",
  msg: "We can do Thursday the 12th at 2pm."
}, {
  id: 3,
  name: "Luis Herrera",
  role: "CPA",
  co: "Herrera Tax",
  av: "L",
  avColor: "purple",
  last: "Yesterday",
  msg: "Your Q1 tax docs are attached."
}, {
  id: 4,
  name: "James Whitfield",
  role: "CEO",
  co: "Apex Co",
  av: "J",
  avColor: "blue",
  last: "Yesterday",
  msg: "RE: SOW — looks good, one small change."
}, {
  id: 5,
  name: "Sarah Morgan",
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
  };
const PriDot = ({
  pri
}) => /*#__PURE__*/React.createElement(_plenixPlatform.StatusDot, {
  tone: PRI_TONE[pri] || "neutral",
  label: PRI_LABEL[pri]
});
exports.PriDot = PriDot;
const STATUS_TONE = exports.STATUS_TONE = {
  active: "success",
  paused: "warning",
  completed: "neutral"
};
const ProjStatusDot = ({
  s
}) => /*#__PURE__*/React.createElement(_plenixPlatform.StatusDot, {
  tone: STATUS_TONE[s] || "neutral",
  label: s
});
exports.ProjStatusDot = ProjStatusDot;
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

// a name/value table as a static Table (batches 229, 234: every table runs on Tabulator): rows [name, value, technical?]; the names
// are the row header, values wrap, a value may be any React content
// name/value facts as the defined data table, with a header row (owner, 2026-10-09: all name/value lists in the DataTable's look)
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
      headerSort: false
    }, {
      title: "Value",
      field: "value",
      kind: "wrap",
      headerSort: false,
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
          }), p.status && /*#__PURE__*/React.createElement(_shared.ProjStatusDot, {
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
  }, "Files, notes, tasks, bookmarks, contacts \u2014 unified across all projects.")), /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
    ref: ref,
    label: "Search everything",
    value: q,
    onChange: e => setQ(e.target.value),
    onKeyDown: e => e.key === 'Enter' && run(),
    placeholder: "Try: contractor quote from last month\u2026",
    loading: loading,
    shortcut: "Enter"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
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
// each source: label, noun, rows() → [{ key, name, sub, cells, facets, open }], filters, columns (Tabulator column
// definitions for the DataTable; a grid row is the source row's cells with its key as id, its name and its facets)
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
      hozAlign: "right",
      headerHozAlign: "right"
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
      kind: "name"
    }, {
      title: "Type",
      field: "t",
      kind: "data"
    }, {
      title: "Size",
      field: "s",
      kind: "data",
      hozAlign: "right",
      headerHozAlign: "right"
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
// the dashboard home: everything, with the section each row comes from
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
    kind: "name"
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
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DataTable, {
    label: (app === "home" ? "Everything" : src.label) + " search results",
    columns: src.columns,
    data: found.map(r => ({
      ...r.cells,
      id: r.key,
      name: r.name,
      facets: r.facets
    })),
    on: {
      rowClick: (e, row) => {
        const r = found.find(x => x.key === row.getData().id);
        if (r) onOpen(r, r.app || app);
      }
    }
  })));
}
  } },
  "suite/suite.jsx": { deps: {"plenix-platform":null,"./capture.jsx":"suite/capture.jsx","./leftnav.jsx":"suite/leftnav.jsx","./search.jsx":"suite/search.jsx","./findSources.jsx":"suite/findSources.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appPage = exports.SUITE = void 0;
exports.mountSuite = mountSuite;
exports.readPrefs = readPrefs;
exports.settingsPage = void 0;
exports.writePrefs = writePrefs;
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
    root.setAttribute('data-plx-header-tint', prefs.headerTint || 'blue');
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
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(_plenixPlatform.SessionProvider, null, /*#__PURE__*/React.createElement(Suite, {
    app: app,
    render: render,
    page: opts && opts.page || 'workspace',
    legacy: opts && opts.legacy
  })));
}
  } },
  "suite/classification.jsx": { deps: {"plenix-platform":null,"./shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CatEditModal = CatEditModal;
exports.ClassificationWidget = ClassificationWidget;
exports.RowItem = RowItem;
var _plenixPlatform = require("plenix-platform");
var _shared = require("./shared.jsx");
/* Plenix suite · classification (suite/classification.jsx): the classification widget (project type, projects, categories,
   tags) the applications share, and the category editor; moved out of the settings page in the suite split (batch 149).
   Rebuilt from Platform components in batch 199: each field is a Field; the lists are Comboboxes (several values, grouped
   options, and a new value created from the text typed); the category editor uses Field, ColorSwatch and Avatar. */

const {
  useRef
} = React;

/* A whole row (or card) that acts as one control: the Platform RowButton with its content laid out by inner (a flex row
   by default). */
function RowItem({
  innerClassName,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, rest, /*#__PURE__*/React.createElement("span", {
    className: ['plx-u-flex plx-u-items-center', innerClassName].filter(Boolean).join(' ')
  }, children));
}

/* ─── ClassificationWidget ───────────────────────────────────────
   Universal widget embedded in every capability's create/edit form.
   UI label: "Classification"  |  Internal name: Anchors
   Fields: projectType (single), projects[], categories[], tags[]
   ──────────────────────────────────────────────────────────────── */
function ClassificationWidget({
  value,
  onChange
}) {
  const v = value || {
    projectType: '',
    projects: [],
    categories: [],
    tags: []
  };
  const set = (field, val) => onChange && onChange({
    ...v,
    [field]: val
  });
  const totalSet = (v.projectType ? 1 : 0) + v.projects.length + v.categories.length + v.tags.length;
  // the options, grouped: your projects; each category under its parent; each tag under its group
  const projectOptions = _shared.PROJECTS.map(p => ({
    value: p.name,
    label: p.name,
    group: 'Your projects'
  }));
  const categoryOptions = [];
  (window.CAT_FLAT || []).forEach(c => {
    const parent = c.includes(' › ') ? c.split(' › ')[0] : c;
    categoryOptions.push({
      value: c,
      label: c.includes(' › ') ? c.split(' › ')[1] : c,
      group: parent
    });
  });
  const tagOptions = [];
  Object.entries(window.TAG_GROUPS || {}).forEach(([group, items]) => items.forEach(t => tagOptions.push({
    value: t,
    label: t,
    group
  })));
  const add = (field, text, tag) => {
    const val = tag ? text.toLowerCase().replace(/\s+/g, '-') : text;
    if (val && v[field].indexOf(val) < 0) set(field, v[field].concat([val]));
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "eyebrow"
  }, "Classification"), totalSet > 0 ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "info",
    size: "sm"
  }, totalSet, " set") : null), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Project Type",
    layout: "inline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: v.projectType || '',
    onChange: e => set('projectType', e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 none \u2014"), (window.PROJ_TYPES || []).map(grp => /*#__PURE__*/React.createElement("optgroup", {
    key: grp.group,
    label: grp.group
  }, grp.types.map(t => /*#__PURE__*/React.createElement("option", {
    key: t,
    value: t
  }, t)))))), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Projects",
    layout: "inline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Combobox, {
    multiple: true,
    creatable: true,
    options: projectOptions,
    values: v.projects,
    onChange: x => set('projects', x),
    onCreate: t => add('projects', t),
    placeholder: "Add projects",
    label: "Projects"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Categories",
    layout: "inline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Combobox, {
    multiple: true,
    creatable: true,
    options: categoryOptions,
    values: v.categories,
    onChange: x => set('categories', x),
    onCreate: t => add('categories', t),
    placeholder: "Add categories",
    label: "Categories"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Tags",
    layout: "inline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Combobox, {
    multiple: true,
    creatable: true,
    options: tagOptions,
    values: v.tags,
    onChange: x => set('tags', x),
    onCreate: t => add('tags', t, true),
    placeholder: "Add tags",
    label: "Tags"
  })));
}

/* ─── Category Edit Modal ──────────────────────────────────────── */
function CatEditModal({
  catEdit,
  setCatEdit,
  saveEdit
}) {
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const title = catEdit.isNew ? catEdit.type === 'cat' ? 'New category' : 'New subcategory' : catEdit.type === 'cat' ? 'Edit category' : 'Edit subcategory';
  const color = catEdit.color || 'blue';
  return /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: () => setCatEdit(null),
    title: title,
    size: "sm",
    initialFocus: nameRef,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: () => setCatEdit(null)
    }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: saveEdit,
      disabled: !catEdit.name.trim()
    }, catEdit.isNew ? 'Create' : 'Save changes'))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    ref: nameRef,
    value: catEdit.name,
    onChange: e => setCatEdit(x => ({
      ...x,
      name: e.target.value
    })),
    placeholder: catEdit.type === 'cat' ? 'Category name' : 'Subcategory name',
    onKeyDown: e => {
      if (e.key === 'Enter') saveEdit();
    }
  })), catEdit.type === 'cat' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Color",
    description: "Choose the category's color"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ColorPicker, {
    palette: "category",
    label: "Category color",
    value: color,
    onChange: h => setCatEdit(x => ({
      ...x,
      color: h
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Icon",
    description: "An optional image, sized to fit"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
    name: catEdit.name || '?',
    src: catEdit.icon || undefined,
    category: color,
    size: "lg"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "upload",
    onClick: () => {
      if (fileRef.current) fileRef.current.click();
    }
  }, "Upload image"), /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/*",
    tabIndex: -1,
    "aria-hidden": "true",
    hidden: true,
    onChange: e => {
      const f = e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = ev => setCatEdit(x => ({
        ...x,
        icon: ev.target.result
      }));
      r.readAsDataURL(f);
    }
  }), catEdit.icon ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "link",
    size: "xs",
    onClick: () => setCatEdit(x => ({
      ...x,
      icon: null
    }))
  }, "Remove") : null))) : null));
}
  } },
  "settings/settings.jsx": { deps: {"plenix-platform":null,"../suite/shared.jsx":"suite/shared.jsx","../suite/classification.jsx":"suite/classification.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeatureDrawer = void 0;
exports.Settings = Settings;
var _plenixPlatform = require("plenix-platform");
var _shared = require("../suite/shared.jsx");
var _classification = require("../suite/classification.jsx");
/* Plenix · Settings (settings/settings.jsx): the settings page of the suite. Split out of app/plenix.jsx in batch 113;
   its own application folder since batch 149. Rebuilt from Platform components: the sections in the shell's NavPane as
   NavLists, each settings screen as SettingsSections of SettingsRows, categories as collapsible Panels with ColorSwatches,
   tags and project types as renamable Tags, the header style as RadioTiles; the documentation pages from Text,
   SectionHeadings, PropertyLists, Tables, Cards, Notices, Badges, Metrics and ProgressBars. The style guide now points at
   the design system (../platform/design-system/), the point of truth. */

const {
  useState
} = React;
// a name/value table as a static Table (batches 229, 234: every table runs on Tabulator): rows [name, value, technical?]; the names
// are the row header, values wrap, a value may be any React content
// name/value facts as the defined data table, with a header row (owner, 2026-10-09: all name/value lists in the DataTable's look)
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
      headerSort: false
    }, {
      title: "Value",
      field: "value",
      kind: "wrap",
      headerSort: false,
      render: d => {
        const r = list[d.id];
        return r ? r[2] ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "data"
        }, r[1]) : r[1] : null;
      }
    }]
  });
};

/* A feature's status as a Badge: [tone, label] */
const FEATURE_STATUS = {
  done: ["success", "Done"],
  planned: ["info", "Planned"],
  wip: ["warning", "In progress"]
};
/* A capability feature's status as a Badge: [tone, label] */
const CAP_STATUS = {
  built: ["success", "Built"],
  planned: ["info", "Planned"],
  todo: ["danger", "Not started"]
};
const capBadge = s => {
  const m = CAP_STATUS[s] || CAP_STATUS.todo;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: m[0]
  }, m[1]);
};

/* Expandable feature drawer: a collapsible Panel with the status as a Badge */
const FeatureDrawer = ({
  item
}) => {
  const s = FEATURE_STATUS[item.status] || FEATURE_STATUS.planned;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    collapsible: true,
    defaultExpanded: false,
    headingLevel: 3,
    title: item.label,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: s[0]
    }, s[1])
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, item.desc));
};

/* A titled part of a documentation page */
exports.FeatureDrawer = FeatureDrawer;
const DocSection = ({
  title,
  children
}) => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
  gap: "sm"
}, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
  level: 2
}, title), children);

/* Wraps content in n nested indented Stacks (the layer hierarchy) */
const indent = (n, el) => n > 0 ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
  indent: true
}, indent(n - 1, el)) : el;

/* The full documentation of one capability */
function CapDoc({
  cap,
  backLabel,
  onBack,
  crumb
}) {
  const spec = cap.specification || {};
  const ui = cap.ui || {};
  const sections = [{
    title: "Baseline operations",
    content: facts("Baseline operations", Object.entries(cap.baselineOps || {}).map(e => [e[0].charAt(0).toUpperCase() + e[0].slice(1), e[1] === "Not started" ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "danger"
    }, e[1]) : e[1]]))
  }, {
    title: "Features",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, (cap.features || []).map(f => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
      key: f.id,
      title: f.name,
      actions: capBadge(f.status)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      as: "p",
      variant: "secondary"
    }, f.desc))))
  }, {
    title: "Use cases",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, (cap.useCases || []).map(uc => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
      key: uc.id,
      title: uc.title
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, null, [["Actor", uc.actor], ["Goal", uc.goal], ["System response", uc.systemResponse], ["Alternate flow", uc.alternateFlow]].map(r => /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
      key: r[0],
      label: r[0]
    }, r[1])), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
      label: "Main flow"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      as: "ol",
      gap: "xs"
    }, (uc.mainFlow || []).map((step, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      as: "li",
      key: i,
      gap: "sm",
      align: "baseline"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "accent"
    }, i + 1, "."), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, step)))))))))
  }, {
    title: "Functionality",
    content: facts("Functionality", (cap.functionality || []).map(f => [f.feature, f.behavior]))
  }, {
    title: "Scenarios",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: "Scenarios",
      data: (cap.scenarios || []).map((r, i) => ({
        ...r,
        id: i
      })),
      columns: [{
        title: "If",
        field: "condition",
        kind: "wrap",
        rowLabel: true,
        width: "--plx-ref-size-240px"
      }, {
        title: "Then",
        field: "expected",
        kind: "wrap"
      }]
    })
  }, {
    title: "Specification",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: "Fields",
      data: (spec.ownFields || []).map((f, i) => ({
        id: i,
        field: f.field + (f.required ? " *" : ""),
        type: f.type,
        required: f.required ? "Yes" : "No",
        notes: f.notes || (f.default !== undefined ? "Default: " + f.default : "")
      })),
      columns: [{
        title: "Field",
        field: "field",
        kind: "name",
        rowLabel: true,
        width: "--plx-ref-size-240px"
      }, {
        title: "Type",
        field: "type",
        kind: "data"
      }, {
        title: "Required",
        field: "required"
      }, {
        title: "Notes",
        field: "notes",
        kind: "wrap"
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "+ 4 Anchor fields: ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "projectType \xB7 projects[] \xB7 categories[] \xB7 tags[]")), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "+ 3 base fields: ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "id \xB7 createdAt \xB7 updatedAt")), (spec.rules || []).length > 0 && /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "eyebrow"
    }, "Rules & Constraints"), /*#__PURE__*/React.createElement(_plenixPlatform.List, {
      label: "Rules & Constraints",
      items: spec.rules.map(r => ({
        icon: "chevron-right",
        tone: "info",
        children: r
      }))
    })))
  }, {
    title: "Enablers",
    content: facts("Enablers", (cap.enablers || []).map(e => [e.name, e.desc]))
  }, {
    title: "UI",
    content: facts("UI", [ui.screen && ui.screen !== "Not started" && ["Screen", ui.screen, true], (ui.components || []).length > 0 && ["Components", /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, ui.components.map((c, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      key: i
    }, c)))], (ui.widgets || []).length > 0 && ["Widgets", /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, ui.widgets.map((w, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      key: i,
      variant: "data"
    }, w)))]])
  }, {
    title: "Modules",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
      label: "Modules"
    }, (cap.modules || []).map((m, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
      key: i
    }, m === "Not started" ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "danger"
    }, m) : m)))
  }, {
    title: "Entity / Schema",
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm",
      wrap: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "eyebrow"
    }, "Entity"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "SCHEMA.types.", cap.entity), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "+"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "SCHEMA.anchors")))
  }];
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    size: "xs",
    icon: "arrow-left",
    onClick: onBack
  }, backLabel), crumb ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, "Capabilities \u2192"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, cap.label)) : null), /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: cap.label,
    description: cap.purpose,
    size: "md",
    surface: "card",
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, null, cap.layer), cap.stub ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: "danger"
    }, "Not started") : null)
  }), sections.map(s => /*#__PURE__*/React.createElement(DocSection, {
    key: s.title,
    title: s.title
  }, s.content)));
}
function DocsPanel({
  docSection,
  setDocSection
}) {
  const [selCap, setSelCap] = useState(null);
  /* About */
  if (docSection === "about") return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "About Plenix",
    description: "The product, the name, and the vision behind it."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Plenix",
    description: '"The completor" -- that which makes whole.',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "/PLEN-iks/")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, null, (window.PV_NAME_ROWS || []).map(r => /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    key: r.k,
    label: r.k
  }, r.v)))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Why it fits this product"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "The entire vision of Plenix is about solving fragmentation. Context is lost. Data is duplicated. Retrieval fails. The result is an incomplete picture of your own information. Plenix is the answer to that incompleteness."), facts("Why Plenix fits", (window.PV_FIT || []).map(p => [p.principle, p.meaning]))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Core data model"
  }, facts("Core data model", (window.PV_MODEL || []).map(m => [m.name, m.desc]))), /*#__PURE__*/React.createElement(_plenixPlatform.Metric.Group, {
    label: "Documentation figures"
  }, [["Capabilities", 74], ["Features documented", 807], ["PRDs with content", 50], ["Project types", (window.ALL_PROJ_TYPES || []).length]].map(s => /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    key: s[0],
    value: s[1],
    label: s[0]
  }))));
  if (docSection === "product-vision") return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Product vision",
    description: "The founding document. Why Plenix exists, what it solves, and how it works."
  }), /*#__PURE__*/React.createElement(DocSection, {
    title: "The problem"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Modern digital life is fragmented. A single person may use 8-12+ separate tools daily just to stay organized. This creates three core pain points:"), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, (window.PV_PROBLEMS || []).map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: p.label,
    title: p.label
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, p.desc))))), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "eyebrow"
  }, "The vision"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "strong"
  }, "A single, AI-powered ecosystem that unifies how a person captures, organizes, connects, communicates, retrieves, and acts on all forms of personal information -- without duplicating data or replacing the heavy-duty tools they already use."))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Core philosophy"
  }, facts("Core philosophy", (window.PV_PHILOSOPHY || []).map(ph => [ph.p, ph.d]))), /*#__PURE__*/React.createElement(DocSection, {
    title: "What the platform unifies"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
    label: "What the platform unifies",
    data: (window.PV_UNIFIES || []).map((r, i) => ({
      id: i,
      silo: r[0],
      unified: r[1]
    })),
    columns: [{
      title: "Traditional silo",
      field: "silo",
      kind: "wrap",
      rowLabel: true,
      width: "--plx-ref-size-240px"
    }, {
      title: "Unified in Plenix",
      field: "unified",
      kind: "wrap"
    }]
  })), /*#__PURE__*/React.createElement(DocSection, {
    title: "Unified messaging hub"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "A single interface aggregating SMS, MMS, WhatsApp, and future channels. Messages sent and received through native platforms -- Plenix is the interface, not the infrastructure."), facts("Unified messaging hub", (window.PV_MESSAGING || []).map(s => [s.label, s.desc]))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Smart File Naming"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Example",
    headingLevel: 3
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "danger"
  }, /*#__PURE__*/React.createElement("s", null, "IMG_4891.png")), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary",
    "aria-hidden": "true"
  }, "\u2192"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "success"
  }, "2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png")), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, "Derived from: date + linked project + OCR content + identified contact. User always has final say.")))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Project home"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Project home"
  }, ["Linked files", "Notes", "Tasks & calendar events", "Bookmarks & media", "Contacts", "Message threads", "Virtual meeting launcher"].map(i => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: i
  }, i))), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, "The presentation use case"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Today a user presenting on Zoom alt-tabs frantically between PowerPoint, a spreadsheet, file explorer, and notes. With Project Home, all linked resources are accessible from one workspace. The project view becomes the cockpit for the meeting -- everything is one click away, not five windows deep.")))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Key use cases"
  }, facts("Key use cases", (window.PV_USECASES || []).map((u, i) => [i + 1 + ". " + u.uc, u.d]))), /*#__PURE__*/React.createElement(DocSection, {
    title: "What Plenix is not"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.List, {
    label: "What Plenix is not",
    items: (window.PV_NOT || []).map(n => ({
      icon: "close",
      tone: "danger",
      children: n
    }))
  })));
  if (docSection === "terminology") return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Terminology",
    description: "Plenix mapped to standard software development structure. Use these definitions consistently across design, development, and documentation."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Layers"
  }, ["1 Product", "2 Feature", "3 Usage", "4 Behavior", "5 Scenario", "6 Spec", "7 Enabler", "8 UI", "9 Architecture", "10 Data"].map(l => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: l
  }, l))), (window.TERM_LAYERS || []).map(layer => {
    // a layer's table: its headers as Tabulator columns (c0, c1…), its rows as grid rows; the first column names the row
    const tableColumns = t => t.headers.map((h, j) => ({
      title: h,
      field: "c" + j,
      kind: "wrap",
      rowLabel: j === 0,
      width: j === 0 ? "--plx-ref-size-240px" : undefined
    }));
    const tableRows = t => t.rows.map((r, i) => Object.assign({
      id: i
    }, ...r.map((v, j) => ({
      ["c" + j]: v
    }))));
    return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      key: layer.num,
      title: layer.num + ". " + layer.term,
      description: layer.name
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      as: "p"
    }, layer.desc), layer.note && /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, layer.note), layer.table && /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: layer.term,
      data: tableRows(layer.table),
      columns: tableColumns(layer.table)
    }), layer.subTerm && /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "heading"
    }, layer.subTerm, " \u2014 ", layer.subDesc), /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: layer.subTerm,
      data: tableRows(layer.subTable),
      columns: tableColumns(layer.subTable)
    })), layer.correction && /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, "Note: "), layer.correction), layer.schemaNote && /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, layer.schemaNote)));
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "How the layers relate"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, (window.TERM_HIERARCHY || []).map(item => /*#__PURE__*/React.createElement(React.Fragment, {
    key: item.label
  }, indent(item.indent || 0, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    align: "baseline"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: item.indent === 0 ? "strong" : "body"
  }, item.label), item.note && /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, "\u2014 ", item.note))))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Fully mapped example"
  }, facts("Fully mapped example", window.TERM_EXAMPLE ? Object.entries(window.TERM_EXAMPLE).map(entry => {
    const labels = {
      capability: "Capability",
      feature: "Feature",
      useCase: "Use case",
      functionality: "Functionality",
      scenario: "Scenario",
      specification: "Specification",
      enabler: "Enabler",
      ui: "UI",
      module: "Module",
      entity: "Entity",
      schema: "Schema"
    };
    const k = entry[0];
    const v = entry[1];
    const technical = v.includes("SCHEMA") || v.includes("Screen") || v.includes("Widget") || v.includes("Module");
    return [labels[k] || k, v, technical];
  }) : [])));
  if (docSection === "capabilities") {
    const cap = selCap && (window.CAP_DOCS || {})[selCap];
    if (cap) return /*#__PURE__*/React.createElement(CapDoc, {
      cap: cap,
      backLabel: "Back",
      crumb: true,
      onBack: () => setSelCap(null)
    });
    /* Capability list */
    return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "lg"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: "Capabilities",
      description: "73 capabilities across 3 layers. Click any capability to view its full documentation."
    }), (window.CAP_LAYERS || []).map(layer => {
      const groups = (window.CAPABILITY_GROUPS || []).filter(g => g.layer === layer.id);
      const total = groups.reduce((s, g) => s + g.items.length, 0);
      return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        key: layer.id,
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
        level: 2,
        actions: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "secondary"
        }, total, " capabilities")
      }, layer.label), groups.map(grp => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        key: grp.id,
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "eyebrow"
      }, grp.group), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs",
        wrap: true
      }, grp.items.map(c => {
        const doc = (window.CAP_DOCS || {})[c.id];
        const isStub = !doc || doc.stub;
        return /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
          size: "xs",
          key: c.id,
          disabled: !doc,
          iconEnd: isStub ? undefined : "circle-check",
          onClick: () => {
            if (doc) setSelCap(c.id);
          }
        }, c.label, isStub && /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "danger"
        }, "Not started"));
      })))));
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, "\u2713 = documented \xB7 Not started = needs documentation. Click any capability to view or start documenting it."));
  }

  /* Data Model */
  if (docSection === "data-model") {
    const schema = window.SCHEMA || {
      anchorsApplied: [],
      types: {}
    };
    const types = schema.types || {};
    return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "lg"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: "Data model",
      description: "Every item type in Plenix and the fields it carries. All types extend the 4 Anchor fields."
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      title: "Anchors",
      description: 'UI label: "Classification"'
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      as: "p"
    }, "The 4 universal fields present on every item in every capability. They connect items to the rest of the system \u2014 to projects, categories, and tags \u2014 enabling cross-cutting views, filtering, and retrieval."), /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: "Anchor fields",
      data: [["projectType", "string | null", "Dropdown — single select from Settings > Project Types"], ["projects[]", "string[]", "Search-to-select with create — many-to-many"], ["categories[]", "string[]", "Grouped search-to-select with create — shows hierarchy"], ["tags[]", "string[]", "Grouped search-to-select with create — auto-lowercase-hyphen"]].map((r, i) => ({
        id: i,
        field: r[0],
        type: r[1],
        ui: r[2]
      })),
      columns: [{
        title: "Field",
        field: "field",
        kind: "name",
        rowLabel: true,
        width: "--plx-ref-size-240px"
      }, {
        title: "Type",
        field: "type",
        kind: "data"
      }, {
        title: "UI",
        field: "ui",
        kind: "wrap"
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "Plus base fields on every item: ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "id"), " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "createdAt"), " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "updatedAt")))), /*#__PURE__*/React.createElement(DocSection, {
      title: "Anchors applied to " + (schema.anchorsApplied || []).length + " capabilities"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
      label: "Capabilities with anchors"
    }, (schema.anchorsApplied || []).map(c => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
      key: c
    }, c)))), /*#__PURE__*/React.createElement(DocSection, {
      title: "Item Types (" + Object.keys(types).length + ")"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, Object.entries(types).map(entry => {
      const key = entry[0];
      const type = entry[1];
      const fields = Object.entries(type.fields || {});
      const fieldCount = fields.length;
      return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
        key: key,
        flush: true,
        headingLevel: 3,
        title: type.label,
        description: type.desc,
        actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
          gap: "sm"
        }, /*#__PURE__*/React.createElement(_shared.Ico, {
          n: type.icon || "file"
        }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "data"
        }, fieldCount, " own field", fieldCount !== 1 ? "s" : ""), /*#__PURE__*/React.createElement(_plenixPlatform.Tag, null, type.capability))
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
        label: type.label + " fields",
        empty: "No own fields",
        data: fields.map(([n, d]) => ({
          id: n,
          name: n + (d.required ? " *" : ""),
          type: d.type,
          detail: d.enum ? "enum: " + d.enum.join(", ") : d.desc || d.unit ? "unit: " + d.unit : ""
        })),
        columns: [{
          title: "Field",
          field: "name",
          kind: "name",
          rowLabel: true,
          width: "--plx-ref-size-240px"
        }, {
          title: "Type",
          field: "type",
          kind: "data"
        }, {
          title: "Detail",
          field: "detail",
          kind: "wrap"
        }]
      }));
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, "* Required field. All item types also inherit the 4 Anchor fields + id + createdAt + updatedAt."));
  }

  /* Capability docs — individual capability */
  if (docSection && docSection.startsWith("cap-")) {
    const capKey = docSection.replace("cap-", "");
    const cap = (window.CAP_DOCS || {})[capKey];
    if (!cap) return /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      size: "page",
      icon: "doc-search",
      title: 'Capability "' + capKey + '" not found.'
    });
    return /*#__PURE__*/React.createElement(CapDoc, {
      cap: cap,
      backLabel: "Capabilities",
      onBack: () => setDocSection("capabilities")
    });
  }

  /* Overview */
  if (!docSection || docSection === "overview") return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Documentation",
    description: "Living documentation for Plenix -- architecture, features, and design system. Auto-generated from the codebase. Select a section from the sidebar."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "lg",
    label: "Documentation"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    title: "Style guide",
    onOpen: () => setDocSection("style-guide")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Design tokens, typography, color palette, spacing, and component patterns: the Plenix design system.")), /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    title: "All feature areas",
    onOpen: () => setDocSection("feat-" + window.FEATURES[0].area)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, window.FEATURES.length + " areas, " + window.FEATURES.reduce((s, a) => s + a.items.length, 0) + " features documented."))), /*#__PURE__*/React.createElement(DocSection, {
    title: "Feature areas"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Feature areas"
  }, window.FEATURES.map(area => {
    const done = area.items.filter(i => i.status === "done").length;
    const pct = Math.round(done / area.items.length * 100);
    return /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
      key: area.area,
      title: area.area,
      meta: pct + "%",
      accent: area.color,
      onOpen: () => setDocSection("feat-" + area.area)
    });
  }))));

  /* Style Guide: the design system is the point of truth */
  if (docSection === "style-guide") return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Style guide",
    description: "Design tokens, typography, color, spacing and component patterns live in the Plenix design system."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, "The design system is the point of truth for every token and component in Plenix. This page no longer copies its values."), /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    title: "Plenix Design System",
    href: "../platform/design-system/",
    meta: "../platform/design-system/"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Tokens, typography, color palette, spacing, shadows and every Platform component, with their code.")));

  /* Feature area doc page */
  if (docSection && docSection.startsWith("feat-")) {
    const areaName = docSection.substring(5);
    const area = window.FEATURES.find(a => a.area === areaName);
    if (!area) return null;
    return /*#__PURE__*/React.createElement(FeatureArea, {
      area: area,
      stats: true
    });
  }
  return null;
}

/* One feature area: its figures, its progress and its features */
function FeatureArea({
  area,
  stats
}) {
  const done = area.items.filter(i => i.status === "done").length;
  const pct = Math.round(done / area.items.length * 100);
  const planned = area.items.filter(i => i.status === "planned").length;
  const inprog = area.items.filter(i => i.status === "in-progress").length;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: area.area,
    meta: stats ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, done, "/", area.items.length, " done")
  }), stats ? /*#__PURE__*/React.createElement(_plenixPlatform.Metric.Group, {
    label: area.area + " figures"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    value: area.items.length,
    label: "Total"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    value: done,
    label: "Done"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    value: inprog,
    label: "In progress"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    value: planned,
    label: "Planned"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    value: pct + "%",
    label: "Progress"
  })) : null, /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
    value: pct,
    color: area.color,
    size: "sm",
    label: pct + "% complete",
    labelHidden: !!stats
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, area.items.map((item, i) => /*#__PURE__*/React.createElement(FeatureDrawer, {
    key: i,
    item: item
  }))));
}

// the theme: the themes the design system defines (THEMES); the choice is kept for every page (batch 219)
function ThemeChoice() {
  const {
    theme,
    setTheme,
    themes
  } = (0, _plenixPlatform.useTheme)();
  return /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    "aria-label": "Theme",
    value: theme,
    onChange: e => setTheme(e.target.value),
    options: themes.map(t => ({
      value: t.name,
      label: t.label
    }))
  });
}
function Settings({
  prefs,
  setPrefs,
  screen,
  onBack
}) {
  /* ── the screen (Platforms Standard 4.3): #/<category>, #/features/<area>, #/docs/<section>; each a history entry ── */
  const cat = screen.parts[0] || "general";
  const featArea = cat === "features" ? screen.parts[1] || null : null;
  const docSection = cat === "docs" ? screen.parts[1] || null : null;
  const go = (c, sub) => screen.open(sub ? [c, sub] : [c]);
  const setFeatArea = a => go("features", a);
  const setDocSection = d => go("docs", d);
  const {
    account,
    setPicture
  } = (0, _plenixPlatform.useSession)(); // who is signed in (the Platform session)
  const [featOpen, setFeatOpen] = useState(cat === "features");
  const [docOpen, setDocOpen] = useState(cat === "docs");
  const set = (k, v) => setPrefs(p => ({
    ...p,
    [k]: v
  }));
  /* ── the account fields: unsaved until Save; leaving the page or the Account screen asks (useUnsavedGuard) ── */
  const [acct, setAcct] = useState(() => ({
    name: account.name || "",
    email: account.email || ""
  }));
  const [acctSaved, setAcctSaved] = useState(acct);
  const acctDirty = acct.name !== acctSaved.name || acct.email !== acctSaved.email;
  (0, _plenixPlatform.useUnsavedGuard)(acctDirty, "Your account changes have not been saved.", {
    keeps: next => next.parts[0] === "account"
  });

  /* ── Categories state ── (each color is data the person chose; it reaches the page only through ColorSwatch) */
  const [cats, setCats] = useState([{
    id: 1,
    name: "Personal",
    color: "green",
    icon: null,
    subs: [{
      id: 11,
      name: "Health"
    }, {
      id: 12,
      name: "Finance"
    }, {
      id: 13,
      name: "Family"
    }]
  }, {
    id: 2,
    name: "Client Work",
    color: "blue",
    icon: null,
    subs: [{
      id: 21,
      name: "Design"
    }, {
      id: 22,
      name: "Development"
    }, {
      id: 23,
      name: "Strategy"
    }]
  }, {
    id: 3,
    name: "Research",
    color: "purple",
    icon: null,
    subs: [{
      id: 31,
      name: "Market Research"
    }, {
      id: 32,
      name: "Competitive Analysis"
    }]
  }, {
    id: 4,
    name: "Travel",
    color: "brown",
    icon: null,
    subs: []
  }, {
    id: 5,
    name: "Archive",
    color: "grey",
    icon: null,
    subs: []
  }]);
  const [catEdit, setCatEdit] = useState(null);
  const [expandedCats, setExpandedCats] = useState(new Set([1, 2, 3]));
  const saveEdit = () => {
    if (!catEdit || !catEdit.name.trim()) return;
    if (catEdit.type === 'cat') {
      if (catEdit.isNew) setCats(prev => [...prev, {
        id: Date.now(),
        name: catEdit.name.trim(),
        color: catEdit.color || "blue",
        icon: catEdit.icon || null,
        subs: []
      }]);else setCats(prev => prev.map(c => c.id === catEdit.catId ? {
        ...c,
        name: catEdit.name.trim(),
        color: catEdit.color,
        icon: catEdit.icon || null
      } : c));
    } else {
      if (catEdit.isNew) setCats(prev => prev.map(c => c.id === catEdit.catId ? {
        ...c,
        subs: [...c.subs, {
          id: Date.now(),
          name: catEdit.name.trim()
        }]
      } : c));else setCats(prev => prev.map(c => c.id === catEdit.catId ? {
        ...c,
        subs: c.subs.map(s => s.id === catEdit.subId ? {
          ...s,
          name: catEdit.name.trim()
        } : s)
      } : c));
    }
    setCatEdit(null);
  };
  const deleteCat = id => setCats(prev => prev.filter(c => c.id !== id));
  const deleteSub = (catId, subId) => setCats(prev => prev.map(c => c.id === catId ? {
    ...c,
    subs: c.subs.filter(s => s.id !== subId)
  } : c));
  const toggleExpand = id => setExpandedCats(prev => {
    const n = new Set(prev);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  /* ── Tags state ── */
  const [tags, setTags] = useState([{
    id: 1,
    name: "mountain"
  }, {
    id: 2,
    name: "snow"
  }, {
    id: 3,
    name: "lake"
  }, {
    id: 4,
    name: "architecture"
  }, {
    id: 5,
    name: "portrait"
  }, {
    id: 6,
    name: "nature"
  }, {
    id: 7,
    name: "urban"
  }, {
    id: 8,
    name: "aerial"
  }, {
    id: 9,
    name: "interior"
  }, {
    id: 10,
    name: "product"
  }, {
    id: 11,
    name: "black-and-white"
  }, {
    id: 12,
    name: "supplier"
  }, {
    id: 13,
    name: "VIP"
  }, {
    id: 14,
    name: "strategy"
  }, {
    id: 15,
    name: "Q2"
  }, {
    id: 16,
    name: "inspiration"
  }, {
    id: 17,
    name: "typography"
  }, {
    id: 18,
    name: "branding"
  }]);
  const [tagSearch, setTagSearch] = useState("");
  const [tagAdding, setTagAdding] = useState(false);
  const [tagEditVal, setTagEditVal] = useState("");
  const tagName = v => v.trim().toLowerCase().replace(/\s+/g, "-");
  const addTag = () => {
    const n = tagName(tagEditVal);
    if (!n) return;
    if (!tags.some(t => t.name === n)) setTags(prev => [...prev, {
      id: Date.now(),
      name: n
    }]);
    setTagAdding(false);
    setTagEditVal("");
  };
  const renameTag = (id, text) => {
    const n = tagName(text);
    if (n) setTags(prev => prev.map(t => t.id === id ? {
      ...t,
      name: n
    } : t));
  };
  const deleteTag = id => setTags(prev => prev.filter(t => t.id !== id));
  const cancelTag = () => {
    setTagAdding(false);
    setTagEditVal("");
  };

  /* ── Project Types state ── */
  const defaultTypes = (window.PROJ_TYPES || []).flatMap((g, gi) => g.types.map((t, ti) => ({
    id: gi * 100 + ti + 1,
    name: t,
    group: g.group
  })));
  const [projTypes, setProjTypes] = useState(defaultTypes);
  const [ptSearch, setPtSearch] = useState("");
  const [ptAdding, setPtAdding] = useState(false);
  const [ptEditVal, setPtEditVal] = useState("");
  const addPT = () => {
    const n = ptEditVal.trim();
    if (!n) return;
    if (!projTypes.some(t => t.name.toLowerCase() === n.toLowerCase())) setProjTypes(prev => [...prev, {
      id: Date.now(),
      name: n,
      group: "Other"
    }]);
    setPtAdding(false);
    setPtEditVal("");
  };
  const renamePT = (id, text) => {
    const n = text.trim();
    if (n) setProjTypes(prev => prev.map(t => t.id === id ? {
      ...t,
      name: n
    } : t));
  };
  const deletePT = id => setProjTypes(prev => prev.filter(t => t.id !== id));
  const cancelPT = () => {
    setPtAdding(false);
    setPtEditVal("");
  };
  const SETTINGS_CATS = [{
    id: "account",
    label: "Account",
    icon: "settings-profile"
  }, {
    id: "appearance",
    label: "Appearance",
    icon: "settings-customize"
  }, {
    id: "calendar",
    label: "Calendar",
    icon: "calendar"
  }, {
    id: "categories",
    label: "Categories",
    icon: "settings-categories"
  }, {
    id: "contacts",
    label: "Contacts",
    icon: "person"
  }, {
    id: "dashboard",
    label: "Dashboard",
    icon: "home"
  }, {
    id: "email",
    label: "Email",
    icon: "settings-email"
  }, {
    id: "files",
    label: "Files",
    icon: "document"
  }, {
    id: "general",
    label: "General",
    icon: "settings-general"
  }, {
    id: "notes",
    label: "Notes",
    icon: "text-card"
  }, {
    id: "projects",
    label: "Projects",
    icon: "briefcase"
  }, {
    id: "projtypes",
    label: "Project types",
    icon: "briefcase-plus"
  }, {
    id: "tags",
    label: "Tags",
    icon: "tags"
  }, {
    id: "tasks",
    label: "Tasks",
    icon: "circle-check"
  }];
  const RowLabel = React.createContext(null);
  const Row = ({
    label,
    desc,
    children
  }) => /*#__PURE__*/React.createElement(RowLabel.Provider, {
    value: label
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: label,
    description: desc
  }, children));
  const Toggle = ({
    val,
    onChange,
    label
  }) => {
    const row = React.useContext(RowLabel);
    return /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
      checked: !!val,
      onChange: e => onChange(e.target.checked),
      label: label || row || "On",
      labelHidden: true
    });
  };
  const Seg = ({
    opts,
    val,
    onChange,
    label
  }) => {
    const row = React.useContext(RowLabel);
    return /*#__PURE__*/React.createElement(_plenixPlatform.SegmentedControl, {
      label: label || row,
      value: val,
      onChange: onChange,
      options: opts.map(o => ({
        value: o.v,
        label: o.l
      }))
    });
  };
  // the shared "Display density" choice (platform/providers/theme-boot.js): the same control and storage on every page
  const DensityChoice = () => {
    const [d, setD] = (0, _plenixPlatform.useDensity)();
    const opts = window.PlenixWorkspace ? window.PlenixWorkspace.densities() : [];
    return /*#__PURE__*/React.createElement(_plenixPlatform.ChoiceList, {
      legend: "Display density",
      value: d,
      onChange: setD,
      options: opts
    });
  };
  // a settings screen: its title, then its sections
  const Screen = ({
    title,
    desc,
    children
  }) => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: title,
    description: desc
  }), children);
  // a new-item row (a tag, a project type): a field with Add and Cancel
  const AddRow = ({
    label,
    value,
    onChange,
    placeholder,
    onAdd,
    onCancel
  }) => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: label,
    headingLevel: 2
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    grow: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoFocus: true,
    autoComplete: "off",
    enterKeyHint: "done",
    "aria-label": label,
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    onKeyDown: e => {
      if (e.key === "Enter") onAdd();
      if (e.key === "Escape") onCancel();
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: onAdd,
    size: "sm"
  }, "Add"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: onCancel,
    size: "sm"
  }, "Cancel")));
  // the accent colors to choose from: data handed to ColorSwatch (prefs.accent keeps the chosen value)

  const accent = _plenixPlatform.DATA_COLORS.indexOf(prefs.accent) >= 0 ? prefs.accent : _plenixPlatform.DATA_COLORS[0];
  const visibleTags = tags.filter(t => !tagSearch || t.name.includes(tagSearch.toLowerCase()));
  const panels = {
    categories: /*#__PURE__*/React.createElement(Screen, {
      title: "Categories",
      desc: "Organize your projects, tasks, and content with custom categories and subcategories."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      justify: "end"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "plus",
      onClick: () => setCatEdit({
        type: "cat",
        isNew: true,
        name: "",
        color: "blue",
        icon: null
      })
    }, "New category")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, cats.map(cat => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      key: cat.id,
      collapsible: true,
      headingLevel: 2,
      title: cat.name,
      expanded: expandedCats.has(cat.id),
      onToggle: () => toggleExpand(cat.id),
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
        category: cat.color,
        size: "sm"
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, cat.subs.length, " sub"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "xs",
        iconOnly: true,
        icon: "pencil",
        label: "Edit " + cat.name,
        onClick: () => setCatEdit({
          type: "cat",
          catId: cat.id,
          isNew: false,
          name: cat.name,
          color: cat.color,
          icon: cat.icon || null
        })
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "xs",
        iconOnly: true,
        icon: "trash",
        label: "Delete " + cat.name,
        onClick: () => {
          if (window.confirm('Delete "' + cat.name + '"?')) deleteCat(cat.id);
        }
      }))
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, cat.subs.length === 0 && /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      title: "No subcategories yet"
    }), cat.subs.map(sub => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      key: sub.id,
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      grow: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, sub.name)), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "xs",
      iconOnly: true,
      icon: "pencil",
      label: "Edit " + sub.name,
      onClick: () => setCatEdit({
        type: "sub",
        catId: cat.id,
        subId: sub.id,
        isNew: false,
        name: sub.name
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "xs",
      iconOnly: true,
      icon: "trash",
      label: "Delete " + sub.name,
      onClick: () => deleteSub(cat.id, sub.id)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      size: "xs",
      icon: "plus",
      onClick: () => setCatEdit({
        type: "sub",
        catId: cat.id,
        isNew: true,
        name: ""
      })
    }, "Add subcategory")))))), catEdit && /*#__PURE__*/React.createElement(_classification.CatEditModal, {
      catEdit: catEdit,
      setCatEdit: setCatEdit,
      saveEdit: saveEdit
    })),
    tags: /*#__PURE__*/React.createElement(Screen, {
      title: "Tags",
      desc: "Tags are flat keyword identifiers applied to any item -- images, notes, contacts, bookmarks, files, and more. Create them here and apply them anywhere."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      grow: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
      value: tagSearch,
      onChange: e => setTagSearch(e.target.value),
      onClear: () => setTagSearch(""),
      placeholder: "Search tags...",
      label: "Search tags"
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "plus",
      onClick: () => {
        setTagAdding(true);
        setTagEditVal("");
      }
    }, "New tag")), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, visibleTags.length, " of ", tags.length, " tags"), visibleTags.length > 0 ? /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
      label: "Tags"
    }, [...visibleTags].sort((a, b) => a.name.localeCompare(b.name)).map(tag => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
      key: tag.id,
      onRename: text => renameTag(tag.id, text),
      renameLabel: "Rename tag " + tag.name,
      onRemove: () => deleteTag(tag.id),
      removeLabel: "Delete tag " + tag.name
    }, tag.name))) : /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      title: "No tags match."
    }), tagAdding && /*#__PURE__*/React.createElement(AddRow, {
      label: "New tag name",
      value: tagEditVal,
      onChange: e => setTagEditVal(e.target.value.toLowerCase().replace(/\s+/g, "-")),
      placeholder: "tag-name",
      onAdd: addTag,
      onCancel: cancelTag
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
      tone: "info"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, "How tags work:"), " Tags are flat keywords -- no hierarchy. Click any tag name to rename it inline. Tags apply to images, notes, contacts, bookmarks, tasks, files, and any other item. Use them to describe content: ", /*#__PURE__*/React.createElement("em", null, "mountain, snow, supplier, VIP, Q2, typography, inspiration"), ".")),
    projtypes: /*#__PURE__*/React.createElement(Screen, {
      title: "Project types",
      desc: "Define the types of projects in your workspace. Applied when creating a project."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      grow: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
      value: ptSearch,
      onChange: e => setPtSearch(e.target.value),
      onClear: () => setPtSearch(""),
      placeholder: "Search project types...",
      label: "Search project types"
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "plus",
      onClick: () => {
        setPtAdding(true);
        setPtEditVal("");
      }
    }, "New type")), (() => {
      const filtered = projTypes.filter(t => !ptSearch || t.name.toLowerCase().includes(ptSearch.toLowerCase()));
      const groups = {};
      filtered.forEach(t => {
        if (!groups[t.group]) groups[t.group] = [];
        groups[t.group].push(t);
      });
      if (filtered.length === 0) return /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
        title: "No project types match."
      });
      return Object.entries(groups).map(([grp, items]) => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        key: grp,
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
        level: 2
      }, grp), /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
        label: grp
      }, items.sort((a, b) => a.name.localeCompare(b.name)).map(pt => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
        key: pt.id,
        onRename: text => renamePT(pt.id, text),
        renameLabel: "Rename project type " + pt.name,
        onRemove: () => deletePT(pt.id),
        removeLabel: "Delete project type " + pt.name
      }, pt.name)))));
    })(), ptAdding && /*#__PURE__*/React.createElement(AddRow, {
      label: "New project type name",
      value: ptEditVal,
      onChange: e => setPtEditVal(e.target.value),
      placeholder: "e.g. Product Launch",
      onAdd: addPT,
      onCancel: cancelPT
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, projTypes.length, " project types defined")),
    general: /*#__PURE__*/React.createElement(Screen, {
      title: "General",
      desc: "Language, regional formats and core behavior."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Regional"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Date format"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "mdy",
        l: "MM/DD/YY"
      }, {
        v: "dmy",
        l: "DD/MM/YY"
      }, {
        v: "iso",
        l: "ISO"
      }],
      val: prefs.dateFmt || "mdy",
      onChange: v => set("dateFmt", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Time format"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "12",
        l: "12h"
      }, {
        v: "24",
        l: "24h"
      }],
      val: prefs.timeFmt || "12",
      onChange: v => set("timeFmt", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Language"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: prefs.lang || "en",
      onChange: e => set("lang", e.target.value),
      "aria-label": "Language"
    }, /*#__PURE__*/React.createElement("option", {
      value: "en"
    }, "English"), /*#__PURE__*/React.createElement("option", {
      value: "fr"
    }, "French"), /*#__PURE__*/React.createElement("option", {
      value: "de"
    }, "German"), /*#__PURE__*/React.createElement("option", {
      value: "es"
    }, "Spanish")))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Behavior"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Animations",
      desc: "Disable for reduced motion"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.animations !== false,
      onChange: v => set("animations", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Keyboard shortcut",
      desc: "Open command palette"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Kbd, null, "Ctrl K")))),
    appearance: /*#__PURE__*/React.createElement(Screen, {
      title: "Appearance",
      desc: "Theme, header style, accent color and typography."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Theme"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Theme",
      desc: "The look of every Plenix application; themes are defined in the design system"
    }, /*#__PURE__*/React.createElement(ThemeChoice, null)), /*#__PURE__*/React.createElement(Row, {
      label: "Mode",
      desc: "System follows the light or dark setting of your device"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "system",
        l: "System"
      }, {
        v: "light",
        l: "Light"
      }, {
        v: "dark",
        l: "Dark"
      }],
      val: prefs.theme || "system",
      onChange: v => set("theme", v)
    }))), /*#__PURE__*/React.createElement(DensityChoice, null), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Header and accent"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Header bar style"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.RadioTiles, {
      legend: "Header bar style",
      legendHidden: true,
      size: "sm",
      value: prefs.headerBar || "blue",
      onChange: v => set("headerBar", v),
      options: [{
        value: "blue",
        label: "Accent",
        preview: /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
          tone: "accent"
        })
      }, {
        value: "white",
        label: "White",
        preview: /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
          tone: "surface"
        })
      }, {
        value: "frost",
        label: "Frost",
        preview: /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
          tone: "frost"
        })
      }]
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Page header background",
      desc: "The soft tint behind the header of an open item (a contact, a project, a note)"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "none",
        l: "None"
      }, {
        v: "gray",
        l: "Gray"
      }, {
        v: "blue",
        l: "Blue"
      }, {
        v: "warm",
        l: "Warm"
      }, {
        v: "green",
        l: "Green"
      }, {
        v: "purple",
        l: "Purple"
      }, {
        v: "red",
        l: "Red"
      }],
      val: prefs.headerTint || "blue",
      onChange: v => set("headerTint", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Page header tint",
      desc: "Fade runs from the tint at the top to white; Flat fills the header"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "fade",
        l: "Fade"
      }, {
        v: "flat",
        l: "Flat"
      }],
      val: prefs.headerTintStyle || "fade",
      onChange: v => set("headerTintStyle", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Accent color"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.ColorPicker, {
      label: "Accent color",
      value: accent,
      onChange: h => set("accent", h)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Typography"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Font size"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "sm",
        l: "Small"
      }, {
        v: "md",
        l: "Medium"
      }, {
        v: "lg",
        l: "Large"
      }],
      val: prefs.fontSize || "md",
      onChange: v => set("fontSize", v)
    })))),
    dashboard: /*#__PURE__*/React.createElement(Screen, {
      title: "Dashboard",
      desc: "Widget layout, columns and what appears on the home screen."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Layout"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Column proportions"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "2-1-1",
        l: "50/25/25"
      }, {
        v: "3-1-1",
        l: "60/20/20"
      }, {
        v: "1-1-1",
        l: "Equal"
      }],
      val: prefs.dashCols || "2-1-1",
      onChange: v => set("dashCols", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Widgets"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show date/time strip",
      desc: "Compact live clock above widgets"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.showDateStrip !== false,
      onChange: v => set("showDateStrip", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Drag-to-rearrange",
      desc: "Drag handle on top of each widget card"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.draggable !== false,
      onChange: v => set("draggable", v)
    })))),
    projects: /*#__PURE__*/React.createElement(Screen, {
      title: "Projects",
      desc: "Card layout, visible fields and filtering options."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Layout"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Default view"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "card",
        l: "Cards"
      }, {
        v: "1",
        l: "List"
      }],
      val: prefs.projDensity || "card",
      onChange: v => set("projDensity", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Visible fields"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Category"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projCategory !== false,
      onChange: v => set("projCategory", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Status indicator"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projStatus !== false,
      onChange: v => set("projStatus", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "File count"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projFiles || false,
      onChange: v => set("projFiles", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Tags"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projTags || false,
      onChange: v => set("projTags", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Description"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projDesc || false,
      onChange: v => set("projDesc", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Filtering"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show archived projects"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projArchive || false,
      onChange: v => set("projArchive", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show paused projects"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.projPaused !== false,
      onChange: v => set("projPaused", v)
    })))),
    calendar: /*#__PURE__*/React.createElement(Screen, {
      title: "Calendar",
      desc: "Default view, week start and event display preferences."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Display"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Default view"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "month",
        l: "Month"
      }, {
        v: "week",
        l: "Week"
      }, {
        v: "day",
        l: "Day"
      }],
      val: prefs.calView || "month",
      onChange: v => set("calView", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Week starts on"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "sun",
        l: "Sunday"
      }, {
        v: "mon",
        l: "Monday"
      }],
      val: prefs.calStart || "sun",
      onChange: v => set("calStart", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show event duration"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.calDuration !== false,
      onChange: v => set("calDuration", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Filtering"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show declined events"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.calDeclined || false,
      onChange: v => set("calDeclined", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Widget shows today only",
      desc: "Off = show next 3 days"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.calTodayOnly !== false,
      onChange: v => set("calTodayOnly", v)
    })))),
    tasks: /*#__PURE__*/React.createElement(Screen, {
      title: "Tasks",
      desc: "Sort order, display fields and widget quantity."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Sorting & Filtering"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Sort by"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "due",
        l: "Due date"
      }, {
        v: "pri",
        l: "Priority"
      }, {
        v: "proj",
        l: "Project"
      }],
      val: prefs.taskSort || "due",
      onChange: v => set("taskSort", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show completed tasks"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.taskShowDone || false,
      onChange: v => set("taskShowDone", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Visible fields"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Priority dot"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.taskPri !== false,
      onChange: v => set("taskPri", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Project label"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.taskProj !== false,
      onChange: v => set("taskProj", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Due date"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.taskDue !== false,
      onChange: v => set("taskDue", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Widget"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Max tasks shown"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "5",
        l: "5"
      }, {
        v: "7",
        l: "7"
      }, {
        v: "10",
        l: "10"
      }],
      val: prefs.taskMax || "7",
      onChange: v => set("taskMax", v)
    })))),
    notes: /*#__PURE__*/React.createElement(Screen, {
      title: "Notes",
      desc: "Editor preferences and default folder behavior."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Display"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Default sort"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "date",
        l: "Date"
      }, {
        v: "az",
        l: "A-Z"
      }, {
        v: "folder",
        l: "Folder"
      }],
      val: prefs.noteSort || "date",
      onChange: v => set("noteSort", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show folder label in list"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.noteFolder !== false,
      onChange: v => set("noteFolder", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show tags in list"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.noteTags !== false,
      onChange: v => set("noteTags", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Editor (Planned)"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Toolbar",
      desc: "Format bar above note editor -- coming soon"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: false,
      onChange: () => {}
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Word count",
      desc: "Live word/char count -- coming soon"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: false,
      onChange: () => {}
    })))),
    files: /*#__PURE__*/React.createElement(Screen, {
      title: "Files",
      desc: "Browser layout, column visibility and cloud storage."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Display"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Default sort"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "date",
        l: "Date"
      }, {
        v: "name",
        l: "Name"
      }, {
        v: "type",
        l: "Type"
      }],
      val: prefs.fileSort || "date",
      onChange: v => set("fileSort", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show AI badge"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.fileAI !== false,
      onChange: v => set("fileAI", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show file size"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.fileSize !== false,
      onChange: v => set("fileSize", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show folder column"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.fileFolder !== false,
      onChange: v => set("fileFolder", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Cloud storage"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Storage provider"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      defaultValue: "onedrive",
      "aria-label": "Storage provider"
    }, /*#__PURE__*/React.createElement("option", {
      value: "onedrive"
    }, "OneDrive"), /*#__PURE__*/React.createElement("option", {
      value: "gdrive"
    }, "Google Drive"), /*#__PURE__*/React.createElement("option", {
      value: "dropbox"
    }, "Dropbox"), /*#__PURE__*/React.createElement("option", {
      value: "icloud"
    }, "iCloud"))), /*#__PURE__*/React.createElement(Row, {
      label: "Auto-organize on upload",
      desc: "AI suggests folder and filename"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.fileAutoOrg !== false,
      onChange: v => set("fileAutoOrg", v)
    })))),
    email: /*#__PURE__*/React.createElement(Screen, {
      title: "Email",
      desc: "Inbox display, signature and sync settings."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Display"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show avatar in widget"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.emailAvatar !== false,
      onChange: v => set("emailAvatar", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show preview text"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.emailPreview !== false,
      onChange: v => set("emailPreview", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show time",
      desc: "Relative or absolute time on each email"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.emailTime !== false,
      onChange: v => set("emailTime", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Sync"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Connected account"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      defaultValue: "outlook",
      "aria-label": "Connected account"
    }, /*#__PURE__*/React.createElement("option", {
      value: "outlook"
    }, "Outlook"), /*#__PURE__*/React.createElement("option", {
      value: "gmail"
    }, "Gmail"))), /*#__PURE__*/React.createElement(Row, {
      label: "Sync frequency"
    }, /*#__PURE__*/React.createElement(Seg, {
      opts: [{
        v: "realtime",
        l: "Real-time"
      }, {
        v: "15",
        l: "15 min"
      }, {
        v: "30",
        l: "30 min"
      }],
      val: prefs.emailSync || "realtime",
      onChange: v => set("emailSync", v)
    })))),
    contacts: /*#__PURE__*/React.createElement(Screen, {
      title: "Contacts",
      desc: "Widget layout and field visibility."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Widget"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show avatar"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactAvatar !== false,
      onChange: v => set("contactAvatar", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show message icon"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactMsg !== false,
      onChange: v => set("contactMsg", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show call icon"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactCall !== false,
      onChange: v => set("contactCall", v)
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "List view"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Show role"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactRole !== false,
      onChange: v => set("contactRole", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show company"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactCompany !== false,
      onChange: v => set("contactCompany", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Show last message time"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.contactTime || false,
      onChange: v => set("contactTime", v)
    })))),
    account: /*#__PURE__*/React.createElement(Screen, {
      title: "Account",
      desc: "Profile, integrations and connected services."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Profile",
      actions: acctDirty ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => setAcct(acctSaved)
      }, "Discard"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        variant: "primary",
        onClick: () => setAcctSaved(acct)
      }, "Save")) : null
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Picture"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm",
      align: "center"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
      name: account.name,
      src: account.src,
      size: "md"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "settings-camera",
      onClick: () => (0, _plenixPlatform.choosePicture)().then(p => {
        if (p) setPicture(p);
      })
    }, "Change picture"), account.src ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setPicture(null)
    }, "Remove") : null)), /*#__PURE__*/React.createElement(Row, {
      label: "Name"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      width: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      value: acct.name,
      onChange: e => setAcct({
        ...acct,
        name: e.target.value
      }),
      "aria-label": "Name",
      autoComplete: "name",
      autoCapitalize: "words",
      enterKeyHint: "next"
    }))), /*#__PURE__*/React.createElement(Row, {
      label: "Email"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      width: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "email",
      value: acct.email,
      onChange: e => setAcct({
        ...acct,
        email: e.target.value
      }),
      "aria-label": "Email",
      autoComplete: "email",
      enterKeyHint: "done"
    })))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Integrations"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Calendar source"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      defaultValue: "outlook",
      "aria-label": "Calendar source"
    }, /*#__PURE__*/React.createElement("option", {
      value: "outlook"
    }, "Outlook Calendar"), /*#__PURE__*/React.createElement("option", {
      value: "gcal"
    }, "Google Calendar"), /*#__PURE__*/React.createElement("option", {
      value: "apple"
    }, "Apple Calendar"))), /*#__PURE__*/React.createElement(Row, {
      label: "Email source"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      defaultValue: "outlook",
      "aria-label": "Email source"
    }, /*#__PURE__*/React.createElement("option", {
      value: "outlook"
    }, "Outlook"), /*#__PURE__*/React.createElement("option", {
      value: "gmail"
    }, "Gmail")))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
      title: "Security"
    }, /*#__PURE__*/React.createElement(Row, {
      label: "Browser notifications"
    }, /*#__PURE__*/React.createElement(Toggle, {
      val: prefs.notifs !== false,
      onChange: v => set("notifs", v)
    })), /*#__PURE__*/React.createElement(Row, {
      label: "Sign out"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "danger-secondary",
      icon: "sign-out",
      href: "/outpost.goauthentik.io/sign_out"
    }, "Sign out"))))
  };

  /* Which content to show on the right */
  const isFeatures = cat === "features";
  const isDocs = cat === "docs";
  const activePanel = isFeatures ? featArea ? (() => {
    const area = window.FEATURES.find(a => a.area === featArea);
    return area ? /*#__PURE__*/React.createElement(FeatureArea, {
      area: area
    }) : null;
  })() : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Features to build progress",
    description: "Every significant feature in Plenix -- what it does, how it works, and what's planned. Select an area from the sidebar to explore it."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Feature areas"
  }, window.FEATURES.map(area => {
    const done = area.items.filter(i => i.status === "done").length;
    const pct = Math.round(done / area.items.length * 100);
    return /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
      key: area.area,
      title: area.area,
      meta: done + "/" + area.items.length,
      accent: area.color,
      onOpen: () => setFeatArea(area.area)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
      value: pct,
      color: area.color,
      size: "sm",
      label: area.area + " progress",
      labelHidden: true
    }));
  }))) : isDocs ? /*#__PURE__*/React.createElement(DocsPanel, {
    docSection: docSection,
    setDocSection: setDocSection
  }) : panels[cat] || /*#__PURE__*/React.createElement(Screen, {
    title: SETTINGS_CATS.find(c => c.id === cat)?.label || cat,
    desc: "Settings controls for this section are planned."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, "Full configuration options coming in a future update."));

  /* The documentation pages in the side navigation */
  const docGroups = [{
    heading: null,
    items: [{
      id: "about",
      label: "About Plenix"
    }, {
      id: "product-vision",
      label: "Product vision"
    }, {
      id: "terminology",
      label: "Terminology"
    }, {
      id: "data-model",
      label: "Data model"
    }, {
      id: "capabilities",
      label: "Capabilities"
    }, {
      id: "overview",
      label: "All feature areas"
    }, {
      id: "style-guide",
      label: "Style guide"
    }]
  }, ...(window.CAP_LAYERS || []).map(layer => {
    const groups = (window.CAPABILITY_GROUPS || []).filter(g => g.layer === layer.id);
    const layerLabel = {
      universal: "Universal",
      client: "Client",
      project: "Project / Work"
    }[layer.id] || layer.id;
    return {
      heading: "Capabilities · " + layerLabel,
      defaultExpanded: false,
      items: groups.map(g => ({
        id: "grp-" + g.id,
        label: g.group,
        children: g.items.map(c => {
          const doc = (window.CAP_DOCS || {})[c.id];
          const stub = doc ? doc.stub : true;
          return {
            id: "cap-" + c.id,
            label: c.label,
            muted: stub,
            icon: stub ? undefined : "circle-check"
          };
        })
      }))
    };
  }), {
    heading: "Feature areas",
    defaultExpanded: false,
    items: window.FEATURES.map(a => ({
      id: "feat-" + a.area,
      label: a.area,
      icon: /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
        color: a.color,
        size: "sm"
      })
    }))
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "plx-page-panes"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SideNavPortal, null, /*#__PURE__*/React.createElement(_plenixPlatform.NavPane, {
    label: "Settings",
    title: "Settings",
    footer: onBack ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "arrow-left",
      onClick: onBack
    }, "Back to Dashboard") : null
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Settings sections",
    value: cat !== "features" && cat !== "docs" ? cat : null,
    onSelect: id => go(id),
    groups: [{
      heading: "Settings",
      items: SETTINGS_CATS.map(c => ({
        id: c.id,
        label: c.label,
        icon: c.icon
      }))
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.CollapsibleSection, {
    headingLevel: null,
    expanded: featOpen,
    onToggle: () => {
      go("features");
      setFeatOpen(o => !o);
    },
    icon: "circle-check",
    title: "Features to build progress",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Count, {
      variant: "pill",
      tone: "info",
      value: window.FEATURES.length,
      label: window.FEATURES.length + " feature areas"
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Feature areas",
    value: cat === "features" ? featArea : null,
    onSelect: id => go("features", id),
    items: window.FEATURES.map(area => ({
      id: area.area,
      label: area.area,
      icon: /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
        color: area.color,
        size: "sm"
      }),
      count: area.items.filter(i => i.status === "done").length + "/" + area.items.length
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.CollapsibleSection, {
    headingLevel: null,
    expanded: docOpen,
    onToggle: () => {
      go("docs", "about");
      setDocOpen(o => !o);
    },
    icon: "doc-text",
    title: "Documentation"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Documentation",
    value: cat === "docs" ? docSection : null,
    onSelect: id => go("docs", id),
    groups: docGroups
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, activePanel));
}
  } },
  "settings/main.jsx": { deps: {"../suite/suite.jsx":"suite/suite.jsx","plenix-platform":null,"./settings.jsx":"settings/settings.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
var _suite = require("../suite/suite.jsx");
var _plenixPlatform = require("plenix-platform");
var _settings = require("./settings.jsx");
/* Plenix · Settings (settings/main.jsx): the application's page entry; build-app.js compiles it to settings/app.js. */

// the settings page: #/<category> opens one (#/account: My Account); the older #<category> opens the same screen
const legacy = hash => /^#[a-z][a-z-]*$/.test(hash) && hash !== '#main' ? '/' + hash.slice(1) : null; // not the skip link's #main
(0, _suite.mountSuite)('settings', ({
  prefs,
  setPrefs,
  screen
}) => /*#__PURE__*/React.createElement(_settings.Settings, {
  screen: screen,
  prefs: prefs,
  setPrefs: setPrefs,
  onBack: () => (0, _plenixPlatform.leavePage)((0, _suite.appPage)('home'))
}), {
  page: 'settings',
  legacy
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
  load("settings/main.jsx");
})();
