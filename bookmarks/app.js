/*
 * GENERATED FILE — DO NOT EDIT
 * Source: bookmarks/main.jsx and the modules it imports
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
const facts = (label, rows) => {
  const list = rows.filter(Boolean);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
    label: label,
    headerMenu: false,
    options: {
      headerVisible: false
    },
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
    onClose: onClose,
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
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  let found = rows.filter(r => {
    const hay = [r.name, r.sub].concat(Object.values(r.cells).map(String)).concat([].concat.apply([], Object.values(r.facets).map(v => [].concat(v)))).join(" ").toLowerCase();
    if (words.some(w => hay.indexOf(w) < 0)) return false;
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
   render({ prefs }) draws the application's main area. Preferences (Settings) are kept in localStorage (plenix.prefs) so
   every page reads the same ones. */

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
const appPage = (id, hash) => {
  const a = SUITE.find(x => x.id === id);
  return '../' + (a ? a.folder : 'dashboard') + '/index.html' + (hash ? '#' + hash : '');
};
exports.appPage = appPage;
const settingsPage = cat => '../settings/index.html' + (cat ? '#' + cat : '');
// each application's own settings category in Settings (none yet for Bookmarks)
exports.settingsPage = settingsPage;
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
  page = 'workspace'
}) {
  const [prefs, setPrefsState] = useState(readPrefs);
  const setPrefs = next => setPrefsState(cur => {
    const v = typeof next === 'function' ? next(cur) : next;
    writePrefs(v);
    return v;
  });
  const [sub, setSub] = useState(FIRST_SUB[app] || null);
  const [capture, setCapture] = useState(false);
  const [find, setFind] = useState(null); // the search workspace in the main area: { app, query } (app "home": everything)
  const [ai, setAi] = useState(null); // a query handed to the AI search
  const [hq, setHq] = useState(''); // the header search field
  const inSuite = SUITE.some(x => x.id === app);
  const label = (SUITE.find(x => x.id === app) || {
    label: 'Settings'
  }).label;
  const openResult = (r, a) => {
    location.href = appPage(a, a === 'messaging' && r.id ? 't-' + r.id : '');
  };
  const tone = {
    blue: 'accent',
    frost: 'frost',
    white: 'plain'
  }[prefs.headerBar || 'blue'] || 'accent';
  const onAccent = tone === 'accent';
  const main = ai !== null ? /*#__PURE__*/React.createElement(_search.SearchScreen, {
    key: ai,
    initialQuery: ai
  }) : find ? /*#__PURE__*/React.createElement(_findSources.FindWorkspace, {
    key: find.app,
    app: find.app,
    query: find.query,
    onQuery: q => {
      setFind({
        ...find,
        query: q
      });
      setHq(q);
    },
    onOpen: openResult,
    onAskAI: q => {
      setFind(null);
      setAi(q);
    }
  }) : render({
    prefs,
    setPrefs
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
      onSettings: () => {
        location.href = settingsPage(SETTINGS_FOR[app] || 'general');
      }
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
          if (e.key === 'Enter') {
            setAi(null);
            setFind({
              app: inSuite && app !== 'home' ? app : 'home',
              query: hq.trim()
            });
          }
        }
      }),
      account: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader.Account, {
        current: app === 'settings' ? location.hash === '#account' ? 'account' : 'settings' : undefined,
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
function mountSuite(app, render, opts) {
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(_plenixPlatform.SessionProvider, null, /*#__PURE__*/React.createElement(Suite, {
    app: app,
    render: render,
    page: opts && opts.page || 'workspace'
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
  "bookmarks/bookmarks.jsx": { deps: {"plenix-platform":null,"../suite/classification.jsx":"suite/classification.jsx","../suite/shared.jsx":"suite/shared.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookmarksScreen = BookmarksScreen;
var _plenixPlatform = require("plenix-platform");
var _classification = require("../suite/classification.jsx");
var _shared = require("../suite/shared.jsx");
/* Plenix · bookmarks (bookmarks/bookmarks.jsx). Split out of app/plenix.jsx in batch 113; rebuilt from Platform components in
   batch 199: collection chips, the bookmarks as Cards in a ContentGrid, the open one in a SidePanel. */

const {
  useState
} = React;

/* ─── Bookmarks ─────────────────────────────────────────────────── */
function BookmarksScreen() {
  const [col, setCol] = useState('all');
  const [sel, setSel] = useState(null);
  const [meta, setMeta] = useState({});
  const cols = ['all', ...new Set(_shared.ALL_BOOKMARKS.map(b => b.col))];
  const filtered = col === 'all' ? _shared.ALL_BOOKMARKS : _shared.ALL_BOOKMARKS.filter(b => b.col === col);
  const bookmark = _shared.ALL_BOOKMARKS.find(b => b.id === sel);
  return /*#__PURE__*/React.createElement("div", {
    className: "plx-page-panes"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, {
    className: "plx-motion-enter"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "h1",
    variant: "title"
  }, "Bookmarks"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    icon: /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "plus"
    })
  }, "Add")), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "xs"
  }, cols.map(c => /*#__PURE__*/React.createElement(_plenixPlatform.Chip, {
    key: c,
    selected: col === c,
    onClick: () => setCol(c)
  }, c === 'all' ? 'All' : c))), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "lg",
    label: "Bookmarks"
  }, filtered.map(b => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: b.id,
    title: b.title,
    meta: b.url,
    selected: sel === b.id,
    onOpen: () => setSel(sel === b.id ? null : b.id)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, b.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, b.date)))))), bookmark ? /*#__PURE__*/React.createElement(_plenixPlatform.SidePanel, {
    title: bookmark.title,
    icon: "bookmark",
    onOpenChange: o => {
      if (!o) setSel(null);
    }
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "a",
    variant: "link",
    href: 'https://' + bookmark.url,
    target: "_blank",
    rel: "noreferrer"
  }, bookmark.url), /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: "Tags"
  }, bookmark.tags.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement(_classification.ClassificationWidget, {
    value: meta[bookmark.id],
    onChange: m => setMeta(prev => ({
      ...prev,
      [bookmark.id]: m
    }))
  }))) : null);
}
  } },
  "bookmarks/main.jsx": { deps: {"../suite/suite.jsx":"suite/suite.jsx","./bookmarks.jsx":"bookmarks/bookmarks.jsx"}, externals: {  }, run: function (module, exports, require) {
var _suite = require("../suite/suite.jsx");
var _bookmarks = require("./bookmarks.jsx");
/* Plenix · Bookmarks (bookmarks/main.jsx): the application's page entry; build-app.js compiles it to bookmarks/app.js. */

(0, _suite.mountSuite)('bookmarks', () => /*#__PURE__*/React.createElement(_bookmarks.BookmarksScreen, null));
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
  load("bookmarks/main.jsx");
})();
