/*
 * GENERATED FILE — DO NOT EDIT
 * Source: dashboard/main.jsx and the modules it imports
 * Build: node build-app.js (Vite, vite.apps.config.mjs)
 */
if (!window.Plenix) throw new Error('Plenix: "plenix-platform" is not loaded before this script');
(function(plenixPlatform) {
  "use strict";
  const SUITE_SESSION = {
    account: { name: "Jordan Avery", firstName: "Jordan", lastName: "Avery", email: "jordan.avery@example.com" },
    notifications: [
      { id: 1, text: "Fr. Daniel uploaded 12 new assets to Liturgy", time: "5 min ago", unread: true },
      { id: 2, text: "Maya Chen sent a message: Round 3 concepts — confirm Thursday?", time: "10:24 AM", unread: true },
      { id: 3, text: "Sarah M. approved your batch download request", time: "22 min ago", unread: true },
      { id: 4, text: "Task due Mar 8: Deliver logo concepts round 3", time: "Yesterday", unread: false },
      { id: 5, text: "Version 3 of Banner Icon Set is now live", time: "Yesterday", unread: false }
    ],
    // the applications pinned to the header until the person changes them: every application
    pinnedApps: ["home", "projects", "messaging", "contacts", "calendar", "tasks", "notes", "bookmarks", "files", "assets"]
  };
  const { useState: useState$7, useRef: useRef$2, useEffect: useEffect$3, useCallback: useCallback$1 } = React;
  const P = {
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
  const Ico = ({ n, color = "currentColor", sw = 1.65 }) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "plx-u-shrink-0 plx-u-icon-box" }, /* @__PURE__ */ React.createElement("path", { d: P[n], stroke: color, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" }));
  const PROJECTS = [
    { id: 1, name: "Kitchen Renovation", status: "active", color: "brown", tags: ["personal", "home"], files: 14, desc: "Full kitchen remodel — cabinets, counters, plumbing. Target Q3 2026." },
    { id: 2, name: "Apex Co — Brand Refresh", status: "active", color: "blue", tags: ["client", "design"], files: 31, desc: "Visual identity refresh: logo, color system, digital templates." },
    { id: 3, name: "AI Writing Tools", status: "paused", color: "purple", tags: ["research", "ai"], files: 8, desc: "Evaluating AI writing assistants for team adoption." },
    { id: 4, name: "Spain — June 2026", status: "active", color: "green", tags: ["personal", "travel"], files: 9, desc: "Two weeks in Madrid and Seville. Flights booked." },
    { id: 5, name: "Tax & Finances 2026", status: "active", color: "red", tags: ["personal", "finance"], files: 22, desc: "Annual tax prep, estimated payments, expense tracking." },
    { id: 6, name: "Home Purchase 2024", status: "completed", color: "gray", tags: ["archive", "legal"], files: 67, desc: "Archive — all docs from 412 Birchwood Dr closing." }
  ];
  const EMAILS = [
    { id: 1, from: "Maya Chen", subj: "Round 3 concepts — confirm Thursday?", prev: "Hey! Just want to confirm we're presenting the logo directions this Thursday…", time: "10:24 AM", unread: true, av: "M", avColor: "blue", proj: "Apex Co" },
    { id: 2, from: "ABC Plumbing", subj: "Kitchen quote follow-up", prev: "Hi, this is Jeff from ABC Plumbing. Following up on our estimate…", time: "9:41 AM", unread: true, av: "A", avColor: "brown", proj: "Kitchen Reno" },
    { id: 3, from: "Luis Herrera", subj: "Q1 tax docs ready for review", prev: "Your estimated Q1 tax documents are attached. Please review section 3…", time: "Yesterday", unread: false, av: "L", avColor: "purple", proj: "Tax" },
    { id: 4, from: "James Whitfield", subj: "RE: SOW — one small change", prev: "Looks mostly good. I'd like to adjust the payment milestone on page 3…", time: "Yesterday", unread: false, av: "J", avColor: "blue", proj: "Apex Co" },
    { id: 5, from: "Booking.com", subj: "Your Madrid reservation is confirmed", prev: "Thank you for booking! Your reservation at Hotel Only YOU Atocha is confirmed.", time: "Mar 3", unread: false, av: "B", avColor: "green", proj: "Spain" }
  ];
  const EVENTS = [
    { id: 1, time: "9:00 AM", title: "Standup — Apex team", sub: "30 min", color: "blue" },
    { id: 2, time: "2:00 PM", title: "Contractor call (ABC)", sub: "1 hour", color: "brown" },
    { id: 3, time: "4:30 PM", title: "Budget review — kitchen", sub: "30 min", color: "brown" }
  ];
  const CALENDARS = [
    { id: "work", label: "Work", color: "blue", on: true },
    { id: "home", label: "Personal", color: "green", on: true },
    { id: "apex", label: "Apex Co", color: "brown", on: true },
    { id: "travel", label: "Travel", color: "purple", on: true },
    { id: "tax", label: "Finance & Tax", color: "red", on: true }
  ];
  const CAL_EVENTS = [
    { id: 1, date: 5, title: "Standup — Apex", time: "9:00 AM", color: "blue", cal: "work" },
    { id: 2, date: 5, title: "Contractor call", time: "2:00 PM", color: "brown", cal: "apex" },
    { id: 3, date: 8, title: "Logo review — Round 3", time: "10:00 AM", color: "blue", cal: "work" },
    { id: 4, date: 10, title: "Plumbing quote (2nd)", time: "11:00 AM", color: "brown", cal: "home" },
    { id: 5, date: 15, title: "Q1 tax payment due", time: "All day", color: "red", cal: "tax" },
    { id: 6, date: 18, title: "Brand presentation", time: "3:00 PM", color: "blue", cal: "apex" },
    { id: 7, date: 28, title: "Spain trip — depart", time: "All day", color: "green", cal: "travel" }
  ];
  const CONTACTS = [
    { id: 1, name: "Maya Chen", gender: "female", role: "Creative Director", co: "Apex Co", av: "M", avColor: "blue", last: "10:24 AM", msg: "Sounds great — I'll have concepts by Friday." },
    { id: 2, name: "Jeff Torres", gender: "male", role: "Plumber", co: "ABC Plumbing", av: "J", avColor: "brown", last: "9:41 AM", msg: "We can do Thursday the 12th at 2pm." },
    { id: 3, name: "Luis Herrera", gender: "male", role: "CPA", co: "Herrera Tax", av: "L", avColor: "purple", last: "Yesterday", msg: "Your Q1 tax docs are attached." },
    { id: 4, name: "James Whitfield", gender: "male", role: "CEO", co: "Apex Co", av: "J", avColor: "blue", last: "Yesterday", msg: "RE: SOW — looks good, one small change." },
    { id: 5, name: "Sarah Morgan", gender: "female", role: "Friend", co: "", av: "S", avColor: "green", last: "Mar 3", msg: "Did you decide on the cabinet color?" }
  ];
  const THREADS = [
    { id: 1, name: "Maya Chen", av: "M", avColor: "blue", ch: "WhatsApp", preview: "Sounds great — I'll have concepts by Friday.", time: "10:24 AM", unread: 2 },
    { id: 2, name: "ABC Plumbing", av: "A", avColor: "brown", ch: "SMS", preview: "We can do Thursday the 12th at 2pm.", time: "9:41 AM", unread: 1 },
    { id: 3, name: "James Whitfield", av: "J", avColor: "blue", ch: "Email", preview: "RE: SOW — looks good, one small change.", time: "Yesterday", unread: 0 },
    { id: 4, name: "Garret Builders", av: "G", avColor: "gray", ch: "SMS", preview: "Demo day confirmed. See you at 10am.", time: "Yesterday", unread: 0 }
  ];
  const ALL_TASKS = [
    { id: 1, title: "Get second plumbing quote", done: false, due: "Mar 10", proj: "Kitchen Reno", pri: "high" },
    { id: 2, title: "Order cabinet samples", done: true, due: "Mar 1", proj: "Kitchen Reno", pri: "med" },
    { id: 3, title: "Confirm countertop material", done: false, due: "Mar 15", proj: "Kitchen Reno", pri: "med" },
    { id: 4, title: "Deliver logo concepts round 3", done: false, due: "Mar 8", proj: "Apex Co", pri: "high" },
    { id: 5, title: "Send revised SOW for approval", done: true, due: "Feb 28", proj: "Apex Co", pri: "high" },
    { id: 6, title: "Set up brand asset folder", done: false, due: "Mar 12", proj: "Apex Co", pri: "med" },
    { id: 7, title: "Book Madrid hotel — Chueca", done: false, due: "Mar 20", proj: "Spain Trip", pri: "med" },
    { id: 8, title: "File Q1 estimated tax payment", done: false, due: "Mar 15", proj: "Tax", pri: "high" },
    { id: 9, title: "Upload expense receipts Jan–Feb", done: false, due: "Mar 10", proj: "Tax", pri: "med" }
  ];
  const ALL_NOTES = [
    { id: 1, folder: "Kitchen Reno", title: "Contractor comparison", preview: "ABC Plumbing came in $2,400 under Garret but has mixed Yelp reviews…", date: "Mar 2", tags: ["contractors", "cost"] },
    { id: 2, folder: "Kitchen Reno", title: "Cabinet style decisions", preview: "Leaning Shaker in off-white. Confirm door pull finish with Sarah.", date: "Feb 22", tags: ["design", "decisions"] },
    { id: 3, folder: "Apex Co", title: "Kickoff meeting recap", preview: "Client wants to retain the wordmark but fully refresh the color system.", date: "Feb 20", tags: ["client", "milestone"] },
    { id: 4, folder: "Apex Co", title: "Typography shortlist", preview: "Top candidates: Canela, Söhne Breit, GT Planar. Present 3 directions.", date: "Mar 1", tags: ["type", "design"] },
    { id: 5, folder: "Spain Trip", title: "Hotel shortlist — Madrid", preview: "Barrio de Chueca is the area. Budget €150/night max. 3 options.", date: "Feb 28", tags: ["travel", "hotels"] },
    { id: 6, folder: "Research", title: "AI tools comparison", preview: "Compared Jasper, Copy.ai, and Claude for long-form writing. Claude wins.", date: "Mar 3", tags: ["ai", "tools"] }
  ];
  const ALL_BOOKMARKS = [
    { id: 1, col: "Kitchen Inspo", title: "Shaker Cabinet Guide — Houzz", url: "houzz.com", date: "Feb 18", tags: ["cabinets"], thumb: "🏠" },
    { id: 2, col: "Kitchen Inspo", title: "Quartz vs Granite 2026", url: "thespruce.com", date: "Feb 10", tags: ["countertops"], thumb: "🪨" },
    { id: 3, col: "Brand Research", title: "2026 Brand Design Trends", url: "underconsideration.com", date: "Feb 22", tags: ["branding"], thumb: "🎨" },
    { id: 4, col: "Brand Research", title: "Apex Competitor — Studio Maake", url: "studiomaake.com", date: "Feb 12", tags: ["competitor"], thumb: "🔍" },
    { id: 5, col: "Spain Trip", title: "Seville Top 20 Restaurants", url: "eater.com", date: "Feb 28", tags: ["food"], thumb: "🍽️" },
    { id: 6, col: "Spain Trip", title: "Renfe Madrid–Seville Tickets", url: "renfe.com", date: "Mar 1", tags: ["transport"], thumb: "🚄" },
    { id: 7, col: "AI Tools", title: "Claude API Documentation", url: "docs.anthropic.com", date: "Mar 3", tags: ["claude"], thumb: "🤖" }
  ];
  const ALL_FILES = [
    { name: "2026-02-28_KitchenReno_Quote_ABCPlumbing.pdf", t: "PDF", s: "1.2 MB", folder: "Kitchen Reno", d: "Feb 28", ai: true },
    { name: "2026-02-15_KitchenReno_Inspo_IslandLayouts.png", t: "IMG", s: "4.1 MB", folder: "Kitchen Reno", d: "Feb 15", ai: true },
    { name: "2026-02-20_ApexCo_BrandBrief_V2.pdf", t: "PDF", s: "3.4 MB", folder: "Apex Co", d: "Feb 20", ai: true },
    { name: "2026-03-01_ApexCo_LogoConcepts_R3.fig", t: "FIG", s: "12 MB", folder: "Apex Co", d: "Mar 1", ai: false },
    { name: "IMG_4891.png", t: "IMG", s: "2.1 MB", folder: "Uncategorized", d: "Mar 3", ai: false },
    { name: "document(3).pdf", t: "PDF", s: "1.1 MB", folder: "Uncategorized", d: "Mar 4", ai: false },
    { name: "2026-01-05_TaxDocs_W2_Employer.pdf", t: "PDF", s: "224 KB", folder: "Tax 2026", d: "Jan 5", ai: true }
  ];
  const CAPTURES = [
    { label: "Contractor quote screenshot", fileName: "IMG_4891.png", type: "PNG", emoji: "📸", context: "Screenshot of ABC Plumbing estimate. Kitchen sink relocation. Labor $1,200, materials $640, permit $180. Total $2,020. March 4 2026. Project: Kitchen Renovation." },
    { label: "Client contract PDF", fileName: "document(3).pdf", type: "PDF", emoji: "📄", context: "Contract from Apex Design Co. Scope: brand identity refresh — logo, color system, typography. 50/50 payment split. March 4 2026." },
    { label: "Flight search screenshot", fileName: "Screen Shot 2026-03-03.png", type: "PNG", emoji: "✈️", context: "Google Flights results for Madrid round trip June 14–21 from JFK. Prices $640–$910. Iberia and Delta. Project: Spain Trip." },
    { label: "Budget spreadsheet", fileName: "Untitled spreadsheet.xlsx", type: "XLSX", emoji: "📊", context: "Budget tracker for Apex Co brand refresh. Categories: design fees, ad spend, printing. Total budget $18,400. Q2 2026." }
  ];
  async function callClaude(sys, usr) {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1e3, system: sys, messages: [{ role: "user", content: usr }] })
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
  const AV_SIZES = [24, 28, 32, 40, 48, 64];
  const Av = ({ name, av, avColor, size = 28 }) => {
    const s = AV_SIZES.reduce((a, b) => Math.abs(b - size) < Math.abs(a - size) ? b : a);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Avatar, { name, initials: av, size: s, color: avColor });
  };
  const PRI_TONE = { high: "danger", med: "warning", low: "success" }, PRI_LABEL = { high: "High priority", med: "Medium priority", low: "Low priority" }, PRI_WORD = { high: "High", med: "Medium", low: "Low" };
  const Priority = ({ pri }) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "2xs", align: "baseline" }, /* @__PURE__ */ React.createElement(plenixPlatform.StatusIcon, { tone: PRI_TONE[pri] || "neutral", size: "sm", label: PRI_LABEL[pri], className: "plx-u-self-center" }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", "aria-hidden": "true" }, PRI_WORD[pri] || pri));
  const STATUS_TONE = { active: "success", paused: "warning", completed: "neutral" };
  const ProjStatus = ({ s }) => /* @__PURE__ */ React.createElement(plenixPlatform.StatusIcon, { tone: STATUS_TONE[s] || "neutral", size: "sm", label: "Status: " + s });
  const facts = (label, rows) => {
    const list = rows.filter(Boolean);
    return /* @__PURE__ */ React.createElement(
      plenixPlatform.Table,
      {
        label,
        headerMenu: false,
        data: list.map((r, i) => ({ id: i, name: r[0], value: typeof r[1] === "string" || typeof r[1] === "number" ? String(r[1]) : "" })),
        columns: [
          { title: "Name", field: "name", kind: "wrap", rowLabel: true, width: "--plx-ref-size-240px", sortable: false },
          { title: "Value", field: "value", kind: "wrap", sortable: false, render: (d) => {
            const r = list[d.id];
            return r ? r[2] ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, r[1]) : r[1] : null;
          } }
        ]
      }
    );
  };
  const { useState: useState$6 } = React;
  const PART = { date: "Date", project: "Project", type: "Type", description: "Description" };
  function CaptureUI({ onClose }) {
    const [sel, setSel] = useState$6(null);
    const [loading, setLoading] = useState$6(false);
    const [res, setRes] = useState$6(null);
    const [saved, setSaved] = useState$6(false);
    const close = plenixPlatform.useUnsavedGuard(!!(sel && res && !saved), "The proposed file name has not been saved.")(onClose);
    const pick = async (f) => {
      setSel(f);
      setRes(null);
      setSaved(false);
      setLoading(true);
      try {
        setRes(await aiFileName(f.context));
      } catch {
      }
      setLoading(false);
    };
    return /* @__PURE__ */ React.createElement(plenixPlatform.Dialog, { open: true, onClose: close, title: "AI File Naming", description: "Select a file — AI reads the content and proposes a structured name." }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(
      plenixPlatform.RadioTiles,
      {
        legend: "File",
        legendHidden: true,
        size: "lg",
        value: sel ? sel.fileName : void 0,
        onChange: (v) => pick(CAPTURES.find((f) => f.fileName === v)),
        options: CAPTURES.map((f) => ({ value: f.fileName, label: f.emoji + " " + f.label, description: f.fileName }))
      }
    ), sel ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, facts("Selected file", [["Original filename", sel.fileName, true], ["Type", sel.type, true]]), loading ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Chat.Typing, { label: "Thinking" }), /* @__PURE__ */ React.createElement("span", null, "Reading content and extracting metadata…"))), /* @__PURE__ */ React.createElement(plenixPlatform.Skeleton, { height: "32px" }), /* @__PURE__ */ React.createElement(plenixPlatform.Skeleton, { height: "24px", width: "200px" })) : null, res && !loading && !saved ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.CodeBlock, { title: "Proposed filename", language: "text" }, res.filename), /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Filename parts" }, Object.entries(res.parts || {}).filter(([k]) => PART[k]).map(([k, v]) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: k }, PART[k] + ": " + v))), res.tags ? /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, res.tags.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t))) : null, res.summary ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", as: "p" }, /* @__PURE__ */ React.createElement("q", null, res.summary)) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => setSaved(true) }, "Accept & Save"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => pick(sel) }, "Regenerate"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", onClick: () => {
      setSel(null);
      setRes(null);
    } }, "Cancel"))) : null, saved ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "success" }, "Saved to OneDrive"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, res && res.filename), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => {
      setSel(null);
      setRes(null);
      setSaved(false);
    } }, "Capture another file"))) : null) : null));
  }
  const { useState: useState$5, useRef: useRef$1, useEffect: useEffect$2, useCallback } = React;
  function LeftNav({ section, sub, setSub, onSettings }) {
    const groups = {};
    PROJECTS.forEach((p) => {
      const t = p.tags[0];
      if (!groups[t]) groups[t] = [];
      groups[t].push(p);
    });
    const tagLabels = { personal: "Personal", client: "Client Work", research: "Research", travel: "Travel", finance: "Finance", archive: "Archive" };
    const Mark = ({ color, square }) => /* @__PURE__ */ React.createElement("span", { "aria-hidden": "true", className: [[[["plx-u-inline-block plx-u-shrink-0", square ? "plx-u-w-10px" : "plx-u-w-6px", square ? "plx-u-h-10px" : "plx-u-h-6px", square ? "plx-u-border-radius-detail-4px" : "plx-u-border-radius-pill", "plx-u-bg-data"].filter(Boolean).join(" ")].filter(Boolean).join(" ")].filter(Boolean).join(" ")].filter(Boolean).join(" "), "data-plx-color": color });
    const by = (list, key, count) => [...new Set(list.map((x) => x[key]))].map((v) => ({ id: v, label: v, count: count(v) }));
    const nav = {
      projects: { label: "Projects", groups: [{ heading: null, items: [{ id: "all", label: "All projects", count: PROJECTS.length }] }].concat(Object.entries(groups).map(([tag, projs]) => ({
        heading: tagLabels[tag] || tag,
        items: projs.map((p) => ({ id: p.id, label: p.name, count: p.files, icon: /* @__PURE__ */ React.createElement("span", { className: "plx-u-items-center plx-u-gap-x-4px plx-u-inline-flex" }, /* @__PURE__ */ React.createElement(Mark, { color: p.color }), p.status && /* @__PURE__ */ React.createElement(ProjStatus, { s: p.status })) }))
      }))) },
      messaging: { label: "Messages", groups: [
        { heading: null, items: [{ id: "all", label: "All messages" }] },
        { heading: "Channels", items: [{ id: "sms", label: "SMS" }, { id: "whatsapp", label: "WhatsApp" }, { id: "email", label: "Email" }] },
        { heading: "Threads", items: THREADS.map((t) => ({ id: `t-${t.id}`, label: t.name, count: t.unread > 0 ? t.unread : void 0, icon: /* @__PURE__ */ React.createElement(Av, { name: t.name, avColor: t.avColor, size: 22 }) })) }
      ] },
      contacts: { label: "Contacts", groups: [{ heading: null, items: [{ id: "all", label: "All contacts", count: CONTACTS.length }] }, { heading: "Groups", items: [{ id: "clients", label: "Clients", count: 2 }, { id: "contractors", label: "Contractors", count: 2 }, { id: "professional", label: "Professional" }, { id: "personal", label: "Personal" }] }] },
      calendar: {
        label: "Calendars",
        groups: [{ heading: "My calendars", items: [{ id: "all", label: "All calendars", icon: /* @__PURE__ */ React.createElement(Mark, { square: true, color: "gray" }) }].concat(CALENDARS.map((c) => ({ id: c.id, label: c.label, icon: /* @__PURE__ */ React.createElement(Mark, { square: true, color: c.color }) }))) }],
        after: /* @__PURE__ */ React.createElement("div", { className: "plx-u-border-t-border-divider plx-u-border-t-solid-2 plx-u-border-t-1px plx-u-mt-12px plx-u-pt-8px" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: /* @__PURE__ */ React.createElement(Ico, { n: "up" }) }, "Import calendar"))
      },
      tasks: { label: "Tasks", groups: [
        { heading: null, items: [{ id: "all", label: "All tasks", count: ALL_TASKS.filter((t) => !t.done).length }, { id: "due", label: "Due soon", count: ALL_TASKS.filter((t) => !t.done && ["Mar 8", "Mar 10"].includes(t.due)).length }] },
        { heading: "By project", items: by(ALL_TASKS, "proj", (p) => ALL_TASKS.filter((t) => t.proj === p && !t.done).length) }
      ] },
      notes: { label: "Notes", groups: [{ heading: null, items: [{ id: "all", label: "All notes", count: ALL_NOTES.length }] }, { heading: "Folders", items: by(ALL_NOTES, "folder", (f) => ALL_NOTES.filter((n) => n.folder === f).length) }] },
      bookmarks: { label: "Bookmarks", groups: [{ heading: null, items: [{ id: "all", label: "All bookmarks", count: ALL_BOOKMARKS.length }] }, { heading: "Collections", items: by(ALL_BOOKMARKS, "col", (c) => ALL_BOOKMARKS.filter((b) => b.col === c).length) }] },
      files: { label: "Files", groups: [{ heading: null, items: [{ id: "all", label: "All files", count: ALL_FILES.length }] }, { heading: "Folders", items: by(ALL_FILES, "folder", (f) => ALL_FILES.filter((x) => x.folder === f).length) }] }
    };
    const content = Object.fromEntries(Object.entries(nav).map(([k, v]) => [k, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.NavList, { label: v.label, value: sub, onSelect: setSub, groups: v.groups }), v.after || null)]));
    if (!content[section]) return null;
    return /* @__PURE__ */ React.createElement(plenixPlatform.NavPane, { as: "div", label: nav[section].label, title: nav[section].label, footer: onSettings ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "gear", onClick: onSettings }, nav[section].label, " settings") : null }, content[section]);
  }
  const { useState: useState$4, useRef, useEffect: useEffect$1 } = React;
  function SearchScreen({ initialQuery = "" }) {
    const [q, setQ] = useState$4(initialQuery);
    const [loading, setLoading] = useState$4(false);
    const [res, setRes] = useState$4(null);
    const ref = useRef();
    useEffect$1(() => {
      setTimeout(() => ref.current && ref.current.focus(), 80);
      if (initialQuery.trim()) run();
    }, []);
    const run = async () => {
      if (!q.trim()) return;
      setLoading(true);
      setRes(null);
      try {
        setRes(await aiSearch(q));
      } catch {
      }
      setLoading(false);
    };
    const SUGG = ["contractor quote kitchen", "Apex brand guidelines", "flights to Madrid", "tax documents 2026", "meeting notes"];
    return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, { className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md", className: "plx-u-mx-auto plx-u-w-100p plx-u-max-w-600px" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "h1", variant: "title" }, "Search everything"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "Files, notes, tasks, bookmarks, contacts — unified across all projects.")), /* @__PURE__ */ React.createElement(plenixPlatform.Field, { label: "Search everything", hideLabel: true }, /* @__PURE__ */ React.createElement(plenixPlatform.SearchField, { ref, label: "Search everything", value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => e.key === "Enter" && run(), placeholder: "Try: contractor quote from last month…", loading, shortcut: "Enter" })), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: run, disabled: !q.trim() || loading }, loading ? "Searching…" : "Search"), q ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => {
      setQ("");
      setRes(null);
    } }, "Clear") : null), !res && !loading ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "eyebrow" }, "Suggested searches"), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { wrap: true, gap: "sm" }, SUGG.map((s) => /* @__PURE__ */ React.createElement(plenixPlatform.Button, { key: s, size: "sm", onClick: () => {
      setQ(s);
      setTimeout(run, 80);
    } }, s)))) : null, loading ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Chat.Typing, { label: "Searching" }), /* @__PURE__ */ React.createElement("span", null, "Scanning all modules…"))), [1, 2, 3].map((i) => /* @__PURE__ */ React.createElement(plenixPlatform.Skeleton, { key: i, height: "72px" }))) : null, res && !loading ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-motion-enter" }, res.answer ? /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, res.answer) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "eyebrow" }, res.results && res.results.length || 0, " results"), (res.results || []).map((r, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: i, title: r.name, meta: r.preview, onOpen: () => {
    } }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { wrap: true, gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Tag, null, r.module), r.project ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, r.project) : null, r.tags && r.tags.length ? /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, r.tags.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t))) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data", className: "plx-u-ml-auto" }, r.date))))) : null));
  }
  const { useState: useState$3 } = React;
  const PRI = { high: "High", med: "Medium", low: "Low" };
  const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  const FIND_SOURCES = {
    projects: {
      label: "Projects",
      noun: "project",
      filters: [{ id: "status", label: "Status" }, { id: "tags", label: "Tags", multiple: true }],
      columns: [{ title: "Project", field: "name", kind: "name" }, { title: "Status", field: "status", kind: "center", render: (r) => /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: r.status === "Active" ? "success" : "neutral" }, r.status) }, { title: "Tags", field: "tags" }, { title: "Files", field: "files", kind: "data", align: "right", headerAlign: "right" }],
      rows: () => PROJECTS.map((p) => ({ key: "p" + p.id, name: p.name, sub: p.desc, cells: { status: cap(p.status), tags: p.tags.join(", "), files: p.files }, facets: { status: cap(p.status), tags: p.tags } }))
    },
    messaging: {
      label: "Messages",
      noun: "conversation",
      filters: [{ id: "ch", label: "Channel", multiple: true }],
      columns: [{ title: "Conversation", field: "name", kind: "name" }, { title: "Last message", field: "preview" }, { title: "Channel", field: "ch" }, { title: "Time", field: "time", kind: "data" }],
      rows: () => THREADS.map((t) => ({ key: "t" + t.id, id: t.id, name: t.name, sub: t.preview, cells: { preview: t.preview, ch: t.ch, time: t.time }, facets: { ch: t.ch } }))
    },
    contacts: {
      label: "Contacts",
      noun: "contact",
      filters: [{ id: "co", label: "Company", multiple: true }],
      columns: [{ title: "Name", field: "name", kind: "name" }, { title: "Role", field: "role" }, { title: "Company", field: "co" }],
      rows: () => CONTACTS.map((c) => ({ key: "c" + c.id, name: c.name, sub: c.role + " · " + c.co, cells: { role: c.role, co: c.co }, facets: { co: c.co } }))
    },
    calendar: {
      label: "Calendar",
      noun: "event",
      filters: [{ id: "cal", label: "Calendar", multiple: true }],
      columns: [{ title: "Event", field: "name", kind: "name" }, { title: "Date", field: "date", kind: "data" }, { title: "Time", field: "time", kind: "data" }, { title: "Calendar", field: "cal" }],
      rows: () => CAL_EVENTS.map((e) => ({ key: "e" + e.id, name: e.title, sub: "Mar " + e.date + " · " + e.time, cells: { date: "Mar " + e.date, time: e.time, cal: cap(e.cal) }, facets: { cal: cap(e.cal) } }))
    },
    tasks: {
      label: "Tasks",
      noun: "task",
      filters: [{ id: "proj", label: "Project", multiple: true }, { id: "pri", label: "Priority" }, { id: "state", label: "Status" }],
      columns: [{ title: "Task", field: "name", kind: "name" }, { title: "Project", field: "proj" }, { title: "Priority", field: "pri" }, { title: "Due", field: "due", kind: "data" }, { title: "Status", field: "state" }],
      rows: () => ALL_TASKS.map((t) => ({ key: "k" + t.id, name: t.title, sub: t.proj, cells: { proj: t.proj, pri: PRI[t.pri] || t.pri, due: t.due, state: t.done ? "Done" : "Open" }, facets: { proj: t.proj, pri: PRI[t.pri] || t.pri, state: t.done ? "Done" : "Open" } }))
    },
    notes: {
      label: "Notes",
      noun: "note",
      filters: [{ id: "folder", label: "Folder", multiple: true }, { id: "tags", label: "Tags", multiple: true }],
      columns: [{ title: "Note", field: "name", kind: "name" }, { title: "Folder", field: "folder" }, { title: "Tags", field: "tags", kind: "center", render: (r) => r.facets.tags.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t)) }, { title: "Date", field: "date", kind: "data" }],
      rows: () => ALL_NOTES.map((n) => ({ key: "n" + n.id, name: n.title, sub: n.preview, cells: { folder: n.folder, date: n.date }, facets: { folder: n.folder, tags: n.tags } }))
    },
    bookmarks: {
      label: "Bookmarks",
      noun: "bookmark",
      filters: [{ id: "col", label: "Collection", multiple: true }, { id: "tags", label: "Tags", multiple: true }],
      columns: [{ title: "Bookmark", field: "name", kind: "name" }, { title: "Site", field: "url", kind: "data" }, { title: "Collection", field: "col" }, { title: "Date", field: "date", kind: "data" }],
      rows: () => ALL_BOOKMARKS.map((b) => ({ key: "b" + b.id, name: b.title, sub: b.url, cells: { url: b.url, col: b.col, date: b.date }, facets: { col: b.col, tags: b.tags } }))
    },
    files: {
      label: "Files",
      noun: "file",
      filters: [{ id: "t", label: "Type", multiple: true }, { id: "folder", label: "Folder", multiple: true }],
      columns: [{ title: "Name", field: "name", kind: ["name", "data"] }, { title: "Type", field: "t", kind: "data" }, { title: "Size", field: "s", kind: "data", align: "right", headerAlign: "right" }, { title: "Folder", field: "folder" }, { title: "Modified", field: "d", kind: "data" }],
      rows: () => ALL_FILES.map((f, i) => ({ key: "f" + i, name: f.name, sub: f.folder, cells: { t: f.t, s: f.s, folder: f.folder, d: f.d }, facets: { t: f.t, folder: f.folder } }))
    }
  };
  const ALL = {
    label: "Everything",
    noun: "result",
    filters: [{ id: "section", label: "Section", multiple: true }],
    columns: [{ title: "Name", field: "name", kind: "name", render: (r) => r.app === "files" ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, r.name) : r.name }, { title: "Section", field: "section" }, { title: "Details", field: "sub" }],
    rows: () => [].concat.apply([], Object.keys(FIND_SOURCES).map((id) => FIND_SOURCES[id].rows().map((r) => ({ ...r, key: id + ":" + r.key, app: id, cells: { ...r.cells, section: FIND_SOURCES[id].label, sub: r.sub }, facets: { ...r.facets, section: FIND_SOURCES[id].label } }))))
  };
  const matches = (r, words) => {
    const hay = [r.name, r.sub].concat(Object.values(r.cells).map(String)).concat([].concat.apply([], Object.values(r.facets).map((v) => [].concat(v)))).join(" ").toLowerCase();
    return words.every((w) => hay.indexOf(w) >= 0);
  };
  const wordsOf = (query) => query.toLowerCase().split(/\s+/).filter(Boolean);
  function findResults(app, query) {
    const src = app === "home" ? ALL : FIND_SOURCES[app];
    const words = wordsOf(query || "");
    return src && words.length ? src.rows().filter((r) => matches(r, words)).map((r) => ({ ...r, app: r.app || app, section: app === "home" ? r.cells.section : null })) : [];
  }
  const optsOf = (rows, id) => {
    const all = [].concat.apply([], rows.map((r) => [].concat(r.facets[id] === void 0 ? [] : r.facets[id])));
    return Array.from(new Set(all)).sort().map((v) => ({ value: v, label: String(v), count: all.filter((x) => x === v).length }));
  };
  function FindWorkspace({ app, query, onQuery, onOpen, onAskAI }) {
    const src = app === "home" ? ALL : FIND_SOURCES[app];
    const [filters, setFilters] = useState$3({});
    const [sort, setSort] = useState$3("Relevance");
    const rows = src.rows();
    const words = wordsOf(query);
    let found = rows.filter((r) => {
      if (!matches(r, words)) return false;
      return src.filters.every((f) => {
        const v = filters[f.id], has = [].concat(r.facets[f.id] === void 0 ? [] : r.facets[f.id]);
        if (f.multiple) return !(v && v.length) || v.some((x) => has.indexOf(x) >= 0);
        return !v || has.indexOf(v) >= 0;
      });
    });
    if (sort === "Name A–Z") found = found.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "Name Z–A") found = found.slice().sort((a, b) => b.name.localeCompare(a.name));
    const defs = src.filters.map((f) => ({ ...f, options: optsOf(rows, f.id), value: f.multiple ? filters[f.id] || [] : filters[f.id] || null }));
    return /* @__PURE__ */ React.createElement("div", { className: "plx-u-px-32px plx-u-py-24px plx-u-flex-1 plx-u-flex plx-u-flex-column plx-u-min-h-0 plx-u-overflow-y-auto" }, /* @__PURE__ */ React.createElement(
      plenixPlatform.SearchWorkspace,
      {
        title: query ? "Search results" : "Search",
        query,
        onQueryChange: onQuery,
        noun: src.noun,
        placeholder: app === "home" ? "Search files, notes, tasks, contacts…" : "Search " + src.label.toLowerCase() + "…",
        count: found.length,
        filters: defs,
        onFilterChange: (id, v) => setFilters({ ...filters, [id]: v }),
        onClearAll: () => setFilters({}),
        sort: { value: sort, options: ["Relevance", "Name A–Z", "Name Z–A"], onChange: setSort },
        headEnd: app === "home" && onAskAI ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", icon: "sparkle", onClick: () => onAskAI(query) }, "Ask AI") : null
      },
      /* @__PURE__ */ React.createElement(
        plenixPlatform.DataGrid,
        {
          label: (app === "home" ? "Everything" : src.label) + " search results",
          columns: src.columns,
          data: found.map((r) => ({ ...r.cells, id: r.key, name: r.name, facets: r.facets })),
          onRowClick: (record) => {
            const r = found.find((x) => x.key === record.id);
            if (r) onOpen(r, r.app || app);
          }
        }
      )
    ));
  }
  const SKIP = '[target], [download], [data-plx-no-prefetch], [href^="#"]';
  function speculationRules(doc) {
    if (!(window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules"))) return false;
    const rules = { prerender: [{ where: { and: [{ href_matches: "/*" }, { not: { selector_matches: SKIP } }] }, eagerness: "moderate" }] };
    const s = doc.createElement("script");
    s.type = "speculationrules";
    s.textContent = JSON.stringify(rules);
    doc.head.appendChild(s);
    return true;
  }
  function hoverPrefetch(doc) {
    const done = /* @__PURE__ */ new Set();
    doc.addEventListener("pointerover", (e) => {
      const a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.matches(SKIP)) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || done.has(url.pathname)) return;
      done.add(url.pathname);
      const link = doc.createElement("link");
      link.rel = "prefetch";
      link.href = url.origin + url.pathname + url.search;
      doc.head.appendChild(link);
    }, { passive: true });
  }
  if (typeof window !== "undefined" && typeof document !== "undefined" && document.head && /^https?:$/.test(location.protocol)) {
    if (!speculationRules(document)) hoverPrefetch(document);
  }
  const { useState: useState$2 } = React;
  const SUITE = [
    { id: "home", folder: "dashboard", label: "Dashboard" },
    { id: "projects", folder: "projects", label: "Projects" },
    { id: "messaging", folder: "messages", label: "Messages" },
    { id: "contacts", folder: "contacts", label: "Contacts" },
    { id: "calendar", folder: "calendar", label: "Calendar" },
    { id: "tasks", folder: "tasks", label: "Tasks" },
    { id: "notes", folder: "notes", label: "Notes" },
    { id: "bookmarks", folder: "bookmarks", label: "Bookmarks" },
    { id: "files", folder: "files", label: "Files" }
  ];
  const appPage = (id, path) => {
    const a = SUITE.find((x) => x.id === id);
    return "../" + (a ? a.folder : "dashboard") + "/index.html" + (path ? "#" + path : "");
  };
  const settingsPage = (cat) => "../settings/index.html" + (cat ? "#/" + cat : "");
  const RESULT_SCREEN = { p: "project", t: "thread", c: "contact", e: "event", k: "task", n: "note", b: "bookmark", f: "file" };
  const APP_SETTINGS = { home: "dashboard", projects: "projects", messaging: "email", contacts: "contacts", calendar: "calendar", tasks: "tasks", notes: "notes", files: "files" };
  const SETTINGS_FOR = { messaging: "email", contacts: "contacts", calendar: "calendar", tasks: "tasks", notes: "notes", files: "files", projects: "projects" };
  const HAS_NAV = ["messaging", "contacts", "calendar", "tasks", "notes", "bookmarks", "files"];
  const FIRST_SUB = { messaging: "t-1", calendar: "month" };
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
  function readPrefs() {
    try {
      return JSON.parse(localStorage.getItem("plenix.prefs")) || {};
    } catch (e) {
      return {};
    }
  }
  function writePrefs(p) {
    try {
      localStorage.setItem("plenix.prefs", JSON.stringify(p));
    } catch (e) {
    }
  }
  function Suite({ app, render, page = "workspace", legacy }) {
    const [prefs, setPrefsState] = useState$2(readPrefs);
    const setPrefs = (next) => setPrefsState((cur) => {
      const v = typeof next === "function" ? next(cur) : next;
      writePrefs(v);
      return v;
    });
    const loc = plenixPlatform.useScreenLocation({ app, legacy });
    const top = loc.parts[0];
    const inSuite = SUITE.some((x) => x.id === app);
    const scope = inSuite && app !== "home" ? app : "home";
    const sub = app === "messaging" && top === "thread" ? "t-" + loc.parts[1] : loc.params.in || FIRST_SUB[app] || null;
    const setSub = (id) => {
      const t = app === "messaging" && /^t-(\d+)$/.exec(id);
      if (t) loc.navigate(["thread", t[1]]);
      else loc.navigate("/", { in: id });
    };
    const screen = React.useMemo(() => Object.assign({}, loc, {
      open: (path, params) => loc.navigate(path, Object.assign({ in: loc.params.in }, params)),
      parent: (path, params) => loc.parent(path || "/", Object.assign({ in: loc.params.in }, params))
    }), [loc]);
    const [capture, setCapture] = useState$2(false);
    const find = top === "search" ? { app: scope, query: loc.params.q || "" } : null;
    const ai = top === "ask" ? loc.params.q || "" : null;
    const [hq, setHq] = useState$2(() => find ? find.query : "");
    const label = (SUITE.find((x) => x.id === app) || { label: "Settings" }).label;
    const openResult = (r, a) => {
      const key = String(r.key || "").split(":").pop();
      const kind = RESULT_SCREEN[key.charAt(0)], id = key.slice(1);
      const path = kind && id ? kind === "project" ? ["project", id, "home"] : [kind, id] : null;
      if (a === app && path) loc.navigate(path);
      else plenixPlatform.leavePage(appPage(a, path ? "/" + path.join("/") : ""));
    };
    const tone = { blue: "accent", frost: "frost", white: "plain" }[prefs.headerBar || "blue"] || "accent";
    React.useEffect(() => {
      const root = document.documentElement;
      root.setAttribute("data-plx-header-tint", prefs.headerTint || "none");
      root.setAttribute("data-plx-header-tint-style", prefs.headerTintStyle || "fade");
    }, [prefs.headerTint, prefs.headerTintStyle]);
    const modeLoaded = React.useRef(false);
    React.useEffect(() => {
      const ws = window.PlenixWorkspace;
      if (!ws || !ws.setMode) return;
      if (!modeLoaded.current) {
        modeLoaded.current = true;
        if (prefs.theme !== ws.mode()) setPrefs((p) => ({ ...p, theme: ws.mode() }));
        return;
      }
      if (prefs.theme) ws.setMode(prefs.theme);
    }, [prefs.theme]);
    React.useEffect(() => {
      const follow = (e) => setPrefs((p) => p.theme === e.detail.mode ? p : { ...p, theme: e.detail.mode });
      window.addEventListener("plenix:modechange", follow);
      return () => window.removeEventListener("plenix:modechange", follow);
    }, []);
    const onAccent = tone === "accent";
    const [kept, updateKept] = plenixPlatform.useViewState(app);
    const recent = Array.isArray(kept.recentSearches) ? kept.recentSearches : [];
    const runSearch = (text) => {
      const q = text.trim();
      if (q) updateKept((v) => ({ recentSearches: [q].concat((v.recentSearches || []).filter((x) => x !== q)).slice(0, RECENT_MAX) }));
      setHq(q);
      afterSearchView(() => loc.navigate(["search"], { q }));
    };
    const typed = hq.trim().toLowerCase();
    const recentShown = recent.filter((x) => x.toLowerCase().indexOf(typed) >= 0);
    const searchSuggestions = recentShown.length ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.SectionHeading, null, "Recent searches"), /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList, { label: "Recent searches" }, recentShown.map((x) => /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList.Item, { key: x, leading: /* @__PURE__ */ React.createElement(plenixPlatform.Icon, { name: "clock" }), title: x, onOpen: () => runSearch(x) })))) : null;
    const results = typed ? findResults(scope, hq) : null;
    const searchResults = results ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.SectionHeading, null, "Results"), results.length ? /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList, { label: "Results", stacked: true }, results.map((r) => /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList.Item, { key: r.key, title: r.name, meta: r.section ? r.section + " · " + r.sub : r.sub, onOpen: () => afterSearchView(() => openResult(r, r.app)) }))) : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", as: "p" }, "Nothing matches “" + hq.trim() + "”.")) : null;
    const main = ai !== null ? /* @__PURE__ */ React.createElement(SearchScreen, { key: ai, initialQuery: ai }) : find ? /* @__PURE__ */ React.createElement(FindWorkspace, { key: find.app, app: find.app, query: find.query, onQuery: (q) => {
      loc.navigate(["search"], { q }, { replace: true });
      setHq(q);
    }, onOpen: openResult, onAskAI: (q) => loc.navigate(["ask"], { q }) }) : render({ prefs, setPrefs, screen });
    return /* @__PURE__ */ React.createElement(
      plenixPlatform.AppShell,
      {
        page,
        mainClassName: "plx-shell-main",
        footer: /* @__PURE__ */ React.createElement(plenixPlatform.StatusBar, { start: /* @__PURE__ */ React.createElement("span", null, SUITE.length - 1, " applications · Lighthouse Way"), end: /* @__PURE__ */ React.createElement("span", null, "Synced just now") }),
        sideNav: HAS_NAV.includes(app) ? /* @__PURE__ */ React.createElement(LeftNav, { section: app, sub, setSub, onSettings: () => plenixPlatform.leavePage(settingsPage(SETTINGS_FOR[app] || "general")) }) : null,
        header: /* @__PURE__ */ React.createElement(
          plenixPlatform.AppHeader,
          {
            tone,
            currentApp: inSuite ? app : null,
            appsRoot: "../",
            appName: inSuite ? void 0 : label,
            action: /* @__PURE__ */ React.createElement(plenixPlatform.AppHeader.Action, { variant: onAccent ? "secondary" : "primary", icon: "snapshot", onClick: () => setCapture(true) }, "Capture"),
            search: /* @__PURE__ */ React.createElement(
              plenixPlatform.SearchField,
              {
                placeholder: inSuite && app !== "home" ? "Search " + label.toLowerCase() + "…" : "Search files, notes, contacts…",
                label: "Search",
                shortcut: "Ctrl K",
                onAccent,
                value: hq,
                onChange: (e) => setHq(e.target.value),
                onClear: () => setHq(""),
                onKeyDown: (e) => {
                  if (e.key === "Enter") runSearch(hq);
                }
              }
            ),
            searchSuggestions,
            searchResults,
            account: /* @__PURE__ */ React.createElement(
              plenixPlatform.AppHeader.Account,
              {
                current: app === "settings" ? top === "account" ? "account" : "settings" : void 0,
                myAccount: { href: settingsPage("account") },
                settings: { href: settingsPage("general") },
                appSettings: APP_SETTINGS[app] ? { app: label, href: settingsPage(APP_SETTINGS[app]) } : {}
              }
            )
          }
        )
      },
      /* @__PURE__ */ React.createElement("div", { className: "plx-app-shell__page" }, main),
      capture ? /* @__PURE__ */ React.createElement(CaptureUI, { onClose: () => setCapture(false) }) : null
    );
  }
  function mountSuite(app, render, opts) {
    ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(plenixPlatform.DirectionProvider, { follow: true }, /* @__PURE__ */ React.createElement(plenixPlatform.SessionProvider, { session: SUITE_SESSION }, /* @__PURE__ */ React.createElement(Suite, { app, render, page: opts && opts.page || "workspace", legacy: opts && opts.legacy }))));
  }
  const { useState: useState$1, useEffect } = React;
  const allLink = (label, onClick) => /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", iconEnd: "chevron-right", label, onClick }, "All");
  function EmailsWidget({ handle, onViewAll, prefs }) {
    const [exp, setExp] = useState$1(null);
    const showAv = prefs?.emailAvatar !== false;
    const max = parseInt(prefs?.emailMax || "5", 10);
    const open = EMAILS.find((e) => e.id === exp);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "message", title: "Emails", flush: true, actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: "negative", size: "sm" }, "2"), allLink("View all emails", onViewAll), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList, { label: "Emails" }, EMAILS.slice(0, max).map((em) => /* @__PURE__ */ React.createElement(
      plenixPlatform.ActivityList.Item,
      {
        key: em.id,
        unread: !!em.unread,
        selected: exp === em.id,
        onOpen: () => setExp(exp === em.id ? null : em.id),
        leading: showAv ? /* @__PURE__ */ React.createElement(plenixPlatform.Avatar, { name: em.from, size: "xs" }) : null,
        title: em.from,
        meta: em.subj,
        time: em.time
      }
    ))), open ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { inset: "sm", gap: "sm", className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", as: "p" }, open.prev), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", size: "sm" }, "Reply"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm" }, "Archive"))) : null);
  }
  function CalendarWidget({ handle, onViewAll }) {
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "calendar", title: "Calendar", description: /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "Mar 5"), actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, allLink("View all calendar", onViewAll), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, EVENTS.map((ev) => /* @__PURE__ */ React.createElement(plenixPlatform.EventChip, { key: ev.id, title: ev.title, time: ev.time, color: ev.color }))));
  }
  function ProjectsWidget({ handle, onViewAll, onProject, prefs }) {
    const density = prefs?.projDensity || "card";
    const showFiles = prefs?.projFiles || false;
    const showCategory = prefs?.projCategory !== false;
    const showTags = prefs?.projTags || false;
    const showDesc = prefs?.projDesc || false;
    const active = PROJECTS.filter((p) => p.status === "active");
    const catLabel = { personal: "Personal", client: "Client", research: "Research", travel: "Travel", finance: "Finance" };
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "briefcase", title: "Projects", flush: density !== "card", actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, allLink("View all projects", onViewAll), handle) }, density === "card" ? /* @__PURE__ */ React.createElement(plenixPlatform.ContentGrid, { size: "md", label: "Active projects" }, active.map((p) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: p.id, title: p.name, meta: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { color: p.color, size: "sm" }), showCategory ? catLabel[p.tags[0]] || p.tags[0] : null), onOpen: () => onProject(p) }, showDesc ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, p.desc.substring(0, 55), "…") : null, showFiles ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, p.files, " files") : null, showTags ? /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, p.tags.slice(0, 2).map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t))) : null))) : /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "none" }, active.map((p) => /* @__PURE__ */ React.createElement(plenixPlatform.RowButton, { key: p.id, onClick: () => onProject(p) }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", inset: "sm", justify: "between" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "strong", truncate: true }, p.name), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, showCategory ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "caption" }, catLabel[p.tags[0]] || p.tags[0]) : null, showFiles ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, p.files) : null))))));
  }
  function ContactsWidget({ handle, onViewAll }) {
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "settings-users", title: "Contacts", actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, allLink("View all contacts", onViewAll), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, CONTACTS.map((c) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { key: c.id, gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Avatar, { name: c.name, size: "sm" }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "strong", truncate: true, className: "plx-u-flex-1" }, c.name), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", iconOnly: true, label: "Message " + c.name, icon: /* @__PURE__ */ React.createElement(plenixPlatform.Icon, { name: "message" }) }), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", iconOnly: true, label: "Call " + c.name, icon: /* @__PURE__ */ React.createElement(plenixPlatform.Icon, { name: "phone" }) })))));
  }
  function TasksWidget({ handle, onViewAll, prefs }) {
    const [done, setDone] = useState$1(() => Object.fromEntries(ALL_TASKS.map((t) => [t.id, t.done])));
    const showPri = prefs?.taskPri !== false;
    const showDue = prefs?.taskDue !== false;
    const max = parseInt(prefs?.taskMax || "7", 10);
    const pending = ALL_TASKS.filter((t) => !done[t.id]).slice(0, max);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "circle-check", title: "To do", actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: "waiting", size: "sm" }, pending.length), allLink("View all to-dos", onViewAll), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, pending.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { key: t.id, gap: "sm", justify: "between", align: "baseline" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs", align: "baseline" }, showPri ? /* @__PURE__ */ React.createElement(Priority, { pri: t.pri }) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Checkbox, { label: t.title, checked: !!done[t.id], onChange: () => setDone((d) => ({ ...d, [t.id]: !d[t.id] })) })), showDue ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, t.due) : null))));
  }
  function NotesWidget({ handle, onViewAll, prefs }) {
    const showDate = prefs?.noteDate !== false;
    const showFolder = prefs?.noteFolder !== false;
    const max = parseInt(prefs?.noteMax || "6", 10);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "doc-text", title: "Notes", flush: true, actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, allLink("View all notes", onViewAll), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList, { label: "Notes" }, ALL_NOTES.slice(0, max).map((n) => /* @__PURE__ */ React.createElement(plenixPlatform.ActivityList.Item, { key: n.id, onOpen: onViewAll, title: n.title, meta: showFolder ? n.folder.split(" ")[0] : null, time: showDate ? n.date : null }))));
  }
  function NotificationsWidget({ handle }) {
    const { notifications, setNotifications } = plenixPlatform.useSession();
    const unread = notifications.filter((n) => n.unread).length;
    return /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "hdr-bell", title: "Notifications", flush: true, actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, unread ? /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: "negative", size: "sm" }, String(unread)) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", disabled: !unread, onClick: () => setNotifications(notifications.map((n) => ({ ...n, unread: false }))) }, "Mark all read"), handle) }, /* @__PURE__ */ React.createElement(plenixPlatform.NotificationList, { limit: 5, footer: false }));
  }
  const ORDER = [
    { id: "projects", title: "Projects", span: "2" },
    { id: "notifications", title: "Notifications" },
    { id: "emails", title: "Emails", span: "2" },
    { id: "tasks", title: "To do" },
    { id: "notes", title: "Notes" },
    { id: "calendar", title: "Calendar" },
    { id: "contacts", title: "Contacts" }
  ];
  function Dashboard({ setSection, setProject, prefs }) {
    const [order, setOrder] = useState$1(ORDER);
    const layout = plenixPlatform.useAppLayout();
    const narrow = !!(layout && layout.narrow);
    const widgets = {
      projects: /* @__PURE__ */ React.createElement(ProjectsWidget, { onViewAll: () => setSection("projects"), onProject: (p) => {
        setProject(p);
        setSection("project-detail");
      }, prefs }),
      emails: /* @__PURE__ */ React.createElement(EmailsWidget, { onViewAll: () => setSection("messaging"), prefs }),
      tasks: /* @__PURE__ */ React.createElement(TasksWidget, { onViewAll: () => setSection("tasks"), prefs }),
      notes: /* @__PURE__ */ React.createElement(NotesWidget, { onViewAll: () => setSection("notes"), prefs }),
      calendar: /* @__PURE__ */ React.createElement(CalendarWidget, { onViewAll: () => setSection("calendar") }),
      contacts: /* @__PURE__ */ React.createElement(ContactsWidget, { onViewAll: () => setSection("contacts") }),
      notifications: /* @__PURE__ */ React.createElement(NotificationsWidget, null)
    };
    const [now, setNow] = useState$1(/* @__PURE__ */ new Date());
    useEffect(() => {
      const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
      return () => clearInterval(t);
    }, []);
    const h = now.getHours(), m = now.getMinutes();
    const hStr = `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dStr = `${DAYS[now.getDay()]}, ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
    return /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md", inset: "md", grow: true, scroll: true, className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.VisuallyHidden, { as: "h1" }, "Dashboard"), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, hStr), /* @__PURE__ */ React.createElement(plenixPlatform.Divider, { orientation: "vertical" }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, dStr)), /* @__PURE__ */ React.createElement(
      plenixPlatform.WidgetGrid,
      {
        label: "Dashboard",
        columns: narrow ? "auto" : 3,
        items: narrow ? order.map((w) => ({ ...w, span: "1" })) : order,
        renderItem: (w, handle) => React.cloneElement(widgets[w.id], { handle }),
        onReorder: (ids) => setOrder(ids.map((id) => order.find((x) => x.id === id)))
      }
    ));
  }
  const { useState } = React;
  const ProjIco = ({ n, size = 15 }) => {
    const html = window.PROJ_ICONS && window.PROJ_ICONS[n] ? window.PROJ_ICONS[n] : window.PROJ_ICONS && window.PROJ_ICONS.notes || "";
    return /* @__PURE__ */ React.createElement("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", className: "plx-u-block plx-u-shrink-0", dangerouslySetInnerHTML: { __html: html } });
  };
  const STATUS = { active: ["active", "Active"], paused: ["waiting", "Paused"], completed: ["success", "Completed"], archived: ["neutral", "Archived"] };
  const statusOf = (s) => {
    const v = STATUS[s] || STATUS.active;
    return { tone: v[0], label: v[1] };
  };
  function ProjectNav({ proj, active, onNav, caps }) {
    const [view, updateView] = plenixPlatform.useViewState("projects");
    const pCaps = caps || window.DEFAULT_CAPS;
    const navGroups = [{ heading: null, items: [{ id: "home", label: "Project home", icon: /* @__PURE__ */ React.createElement(ProjIco, { n: "home", size: 14 }) }] }].concat(window.CAPABILITY_GROUPS.map((grp) => ({ heading: grp.group, items: grp.items.filter((it) => pCaps.has(it.id)).map((it) => ({ id: it.id, label: it.label, icon: /* @__PURE__ */ React.createElement(ProjIco, { n: it.icon, size: 13 }) })) })).filter((g) => g.items.length));
    return /* @__PURE__ */ React.createElement(
      plenixPlatform.SecondaryPane,
      {
        title: proj.name,
        width: "md",
        collapsible: true,
        resizable: true,
        size: view.paneWidth,
        onSizeChange: (w) => updateView({ paneWidth: w }),
        actions: /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "xs", variant: "ghost", iconOnly: true, icon: "gear", label: "Project settings", onClick: () => onNav("settings") }),
        rail: navGroups.reduce((all, g) => all.concat(g.items), []).map((it) => /* @__PURE__ */ React.createElement(plenixPlatform.ToolRail.Item, { key: it.id, label: it.label, icon: it.icon, pressed: active === it.id, onClick: () => onNav(it.id) }))
      },
      /* @__PURE__ */ React.createElement(plenixPlatform.NavList, { label: proj.name, value: active, onSelect: onNav, groups: navGroups })
    );
  }
  function ProjectContent({ proj, panel }) {
    const pTasks = ALL_TASKS.filter((t) => t.proj.includes(proj.name.split(" ")[0]));
    const pNotes = ALL_NOTES.filter((n) => n.folder.split(" ")[0] === proj.name.split(" ")[0]);
    const pFiles = ALL_FILES.filter((f) => f.folder === proj.name.split("—")[0].trim().replace("Tax & Finances 2026", "Tax 2026"));
    const [done, setDone] = useState(() => Object.fromEntries(pTasks.map((t) => [t.id, t.done])));
    const doneT = pTasks.filter((t) => done[t.id]).length;
    const pct = pTasks.length ? Math.round(doneT / pTasks.length * 100) : 0;
    const toggle = (t) => setDone((d) => ({ ...d, [t.id]: !d[t.id] }));
    const due = (t) => /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: t.due === "Overdue" ? "danger" : "data" }, t.due);
    const taskRow = (t) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { key: t.id, gap: "sm", justify: "between" }, /* @__PURE__ */ React.createElement(plenixPlatform.Checkbox, { label: done[t.id] ? /* @__PURE__ */ React.createElement("s", null, t.title) : t.title, checked: !!done[t.id], onChange: () => toggle(t) }), due(t));
    if (panel === "home") {
      const open = pTasks.filter((t) => !done[t.id]);
      const overdue = open.filter((t) => t.due === "Overdue");
      return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "lg" }, /* @__PURE__ */ React.createElement(
        plenixPlatform.EntityHeader,
        {
          title: proj.name,
          media: { icon: "briefcase", hue: proj.color },
          subtitle: proj.desc,
          status: statusOf(proj.status),
          facts: [{ label: "Tasks", value: pTasks.length - open.length + " / " + pTasks.length, data: true }, { label: "Files", value: proj.files, data: true }],
          next: open[0] ? { title: open[0].title, detail: "Due " + open[0].due } : void 0,
          actions: [{ icon: "star", label: "Favorite" }, { icon: "share", label: "Share" }, { icon: "pencil", label: "Edit" }, { icon: "flag", label: "Update status" }]
        }
      ), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "lg", wrap: true, align: "end" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { grow: true }, /* @__PURE__ */ React.createElement(plenixPlatform.ProgressBar, { value: pct, color: proj.color, label: "Progress", showValue: true })), /* @__PURE__ */ React.createElement(plenixPlatform.Metric.Group, { label: "Project figures" }, /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: doneT + "/" + pTasks.length, label: "Tasks" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: proj.files, label: "Files" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: pNotes.length, label: "Notes" }))), /* @__PURE__ */ React.createElement(plenixPlatform.Columns, { count: 2 }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "clock", title: "Upcoming tasks" }, open.length ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, open.slice(0, 4).map(taskRow)) : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "All tasks complete.")), /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "doc-text", title: "Recent notes", flush: true }, pNotes.length ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "none" }, pNotes.slice(0, 3).map((n) => /* @__PURE__ */ React.createElement(plenixPlatform.RowButton, { key: n.id }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { inset: "sm", gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "strong" }, n.title), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, n.date))))) : /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { inset: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "No notes yet.")))), /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "alert", title: "Overdue" }, overdue.length ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, overdue.slice(0, 4).map(taskRow)) : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "No overdue tasks.")), /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "folder", title: "Files" }, pFiles.length ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, pFiles.slice(0, 4).map((f, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { key: i, gap: "sm", justify: "between" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Tag, null, f.t), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data", truncate: true }, f.name)), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, f.d)))) : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "No files attached."))))));
    }
    if (panel === "tasks") return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.EntityHeader, { title: "Tasks", media: { icon: "circle-check", hue: proj.color }, subtitle: proj.name, facts: [{ label: "Tasks", value: pTasks.length }, { label: "Done", value: doneT }], actions: [{ icon: "share", label: "Share" }] }), /* @__PURE__ */ React.createElement(plenixPlatform.ProgressBar, { value: pct, color: proj.color, label: doneT + "/" + pTasks.length + " tasks", showValue: true }), /* @__PURE__ */ React.createElement(plenixPlatform.Panel, { icon: "circle-check", title: "All tasks" }, pTasks.length ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, pTasks.map(taskRow)) : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "No tasks for this project yet."))));
    if (panel === "notes") return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.EntityHeader, { title: "Notes", media: { icon: "doc-text", hue: proj.color }, subtitle: proj.name, facts: [{ label: "Notes", value: pNotes.length }], actions: [{ icon: "share", label: "Share" }] }), pNotes.length ? /* @__PURE__ */ React.createElement(plenixPlatform.ContentGrid, { size: "lg", label: "Notes" }, pNotes.map((n, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: i, title: n.title, meta: /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, n.date), onOpen: () => {
    } }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, n.preview), /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, n.tags.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t)))))) : /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { title: "No notes yet." })));
    if (panel === "files") return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.EntityHeader, { title: "Files", media: { icon: "folder", hue: proj.color }, subtitle: proj.name, facts: [{ label: "Files", value: pFiles.length }], actions: [{ icon: "share", label: "Share" }] }), /* @__PURE__ */ React.createElement(plenixPlatform.DataGrid, { label: "Files", data: pFiles.map((f, i) => ({ ...f, id: i })), empty: "No files attached. Connect OneDrive in Settings to link files.", columns: [
      { title: "Name", field: "name", kind: ["name", "data"], filter: true, width: "--plx-ref-size-320px" },
      { title: "Type", field: "t", kind: "data", filter: "list" },
      { title: "Size", field: "s", kind: "data", align: "right", headerAlign: "right" },
      { title: "Modified", field: "d", kind: "data" }
    ] })));
    const placeholders = {
      roadmap: ["Roadmap", "Gantt-style timeline planning with drag-and-drop tasks and milestones. Coming soon.", "roadmap"],
      contacts: ["Contacts", "People linked to this project with roles — Owner, Client, Consultant, Reviewer. Coming soon.", "contacts"],
      bookmarks: ["Bookmarks", "Save, organize, and retrieve links with folder hierarchy, smart rules, and sharing. Coming soon.", "link"],
      images: ["Images", "Image gallery — upload, paste URL, or search Unsplash. Source for mood boards. Coming soon.", "images"],
      mood_boards: ["Mood boards", "Named visual collections in Grid or Masonry layout. Shareable read-only link. Coming soon.", "mood"],
      time_tracking: ["Time tracking", "Log hours, mark billable time, and view weekly/monthly breakdowns. Coming soon.", "time"],
      activity: ["Activity feed", "Every event logged — task changes, files, comments, status updates. Coming soon.", "activity"],
      bookkeeping: ["Financials", "Budget tracking, milestone payments, invoices, and payment history. Coming soon.", "finance"],
      risks: ["Risks", "RIAC log — Risks, Issues, Assumptions, Constraints with owner and priority. Coming soon.", "risks"],
      changes: ["Changes", "Formal change request workflow with timeline and cost impact. Coming soon.", "changes"]
    };
    if (placeholders[panel]) {
      const [title, desc, icon] = placeholders[panel];
      return /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, /* @__PURE__ */ React.createElement(plenixPlatform.VisuallyHidden, { as: "h1" }, title), /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { size: "page", icon: /* @__PURE__ */ React.createElement(ProjIco, { n: icon, size: 40 }), title }, desc));
    }
    return null;
  }
  const projectScreen = (screen) => {
    const proj = screen.parts[0] === "project" ? PROJECTS.find((p) => p.id === +screen.parts[1]) || null : null;
    return { proj, panel: proj && screen.parts[2] || "home" };
  };
  function ProjectDetail({ proj, screen }) {
    const panel = screen && screen.parts[2] || "home";
    const setPanel = (p) => screen.open(["project", proj.id, p]);
    return /* @__PURE__ */ React.createElement("div", { className: "plx-page-panes" }, /* @__PURE__ */ React.createElement(ProjectNav, { proj, active: panel, onNav: setPanel }), /* @__PURE__ */ React.createElement(ProjectContent, { proj, panel }));
  }
  function Home({ prefs, screen }) {
    const { proj } = projectScreen(screen);
    if (proj) return /* @__PURE__ */ React.createElement(ProjectDetail, { key: proj.id, proj, screen });
    return /* @__PURE__ */ React.createElement(Dashboard, { prefs, setProject: (p) => screen.open(["project", p.id, "home"]), setSection: (s) => {
      if (s !== "project-detail") plenixPlatform.leavePage(appPage(s));
    } });
  }
  mountSuite("home", ({ prefs, screen }) => /* @__PURE__ */ React.createElement(Home, { prefs, screen }), { page: "dashboard" });
})(Plenix);
