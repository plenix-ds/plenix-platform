/*
 * GENERATED FILE — DO NOT EDIT
 * Source: settings/main.jsx and the modules it imports
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
  const { useState: useState$6, useRef: useRef$3, useEffect: useEffect$2, useCallback: useCallback$1 } = React;
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
  const STATUS_TONE = { active: "success", paused: "warning", completed: "neutral" };
  const ProjStatus = ({ s }) => /* @__PURE__ */ React.createElement(plenixPlatform.StatusIcon, { tone: STATUS_TONE[s] || "neutral", size: "sm", label: "Status: " + s });
  const facts$1 = (label, rows) => {
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
  const { useState: useState$5 } = React;
  const PART = { date: "Date", project: "Project", type: "Type", description: "Description" };
  function CaptureUI({ onClose }) {
    const [sel, setSel] = useState$5(null);
    const [loading, setLoading] = useState$5(false);
    const [res, setRes] = useState$5(null);
    const [saved, setSaved] = useState$5(false);
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
    ), sel ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, facts$1("Selected file", [["Original filename", sel.fileName, true], ["Type", sel.type, true]]), loading ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Chat.Typing, { label: "Thinking" }), /* @__PURE__ */ React.createElement("span", null, "Reading content and extracting metadata…"))), /* @__PURE__ */ React.createElement(plenixPlatform.Skeleton, { height: "32px" }), /* @__PURE__ */ React.createElement(plenixPlatform.Skeleton, { height: "24px", width: "200px" })) : null, res && !loading && !saved ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.CodeBlock, { title: "Proposed filename", language: "text" }, res.filename), /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Filename parts" }, Object.entries(res.parts || {}).filter(([k]) => PART[k]).map(([k, v]) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: k }, PART[k] + ": " + v))), res.tags ? /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, res.tags.map((t) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: t }, t))) : null, res.summary ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", as: "p" }, /* @__PURE__ */ React.createElement("q", null, res.summary)) : null, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => setSaved(true) }, "Accept & Save"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => pick(sel) }, "Regenerate"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", onClick: () => {
      setSel(null);
      setRes(null);
    } }, "Cancel"))) : null, saved ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm", className: "plx-motion-enter" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "success" }, "Saved to OneDrive"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, res && res.filename), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => {
      setSel(null);
      setRes(null);
      setSaved(false);
    } }, "Capture another file"))) : null) : null));
  }
  const { useState: useState$4, useRef: useRef$2, useEffect: useEffect$1, useCallback } = React;
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
  const { useState: useState$3, useRef: useRef$1, useEffect } = React;
  function SearchScreen({ initialQuery = "" }) {
    const [q, setQ] = useState$3(initialQuery);
    const [loading, setLoading] = useState$3(false);
    const [res, setRes] = useState$3(null);
    const ref = useRef$1();
    useEffect(() => {
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
  const { useState: useState$2 } = React;
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
    const [filters, setFilters] = useState$2({});
    const [sort, setSort] = useState$2("Relevance");
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
  const { useState: useState$1 } = React;
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
  function Suite({ app, render, page = "workspace", legacy: legacy2 }) {
    const [prefs, setPrefsState] = useState$1(readPrefs);
    const setPrefs = (next) => setPrefsState((cur) => {
      const v = typeof next === "function" ? next(cur) : next;
      writePrefs(v);
      return v;
    });
    const loc = plenixPlatform.useScreenLocation({ app, legacy: legacy2 });
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
    const [capture, setCapture] = useState$1(false);
    const find = top === "search" ? { app: scope, query: loc.params.q || "" } : null;
    const ai = top === "ask" ? loc.params.q || "" : null;
    const [hq, setHq] = useState$1(() => find ? find.query : "");
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
  const { useRef } = React;
  function CatEditModal({ catEdit, setCatEdit, saveEdit }) {
    const nameRef = useRef(null);
    const fileRef = useRef(null);
    const title = catEdit.isNew ? catEdit.type === "cat" ? "New category" : "New subcategory" : catEdit.type === "cat" ? "Edit category" : "Edit subcategory";
    const color = catEdit.color || "blue";
    return /* @__PURE__ */ React.createElement(
      plenixPlatform.Dialog,
      {
        open: true,
        onClose: () => setCatEdit(null),
        title,
        size: "sm",
        initialFocus: nameRef,
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => setCatEdit(null) }, "Cancel"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: saveEdit, disabled: !catEdit.name.trim() }, catEdit.isNew ? "Create" : "Save changes"))
      },
      /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, /* @__PURE__ */ React.createElement(plenixPlatform.Field, { label: "Name" }, /* @__PURE__ */ React.createElement(
        plenixPlatform.Input,
        {
          ref: nameRef,
          value: catEdit.name,
          onChange: (e) => setCatEdit((x) => ({ ...x, name: e.target.value })),
          placeholder: catEdit.type === "cat" ? "Category name" : "Subcategory name",
          onKeyDown: (e) => {
            if (e.key === "Enter") saveEdit();
          }
        }
      )), catEdit.type === "cat" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.Field, { label: "Color", description: "Choose the category's color" }, /* @__PURE__ */ React.createElement(plenixPlatform.ColorPicker, { palette: "category", label: "Category color", value: color, onChange: (h) => setCatEdit((x) => ({ ...x, color: h })) })), /* @__PURE__ */ React.createElement(plenixPlatform.Field, { label: "Icon", description: "An optional image, sized to fit" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Avatar, { name: catEdit.name || "?", src: catEdit.icon || void 0, category: color, size: "lg" }), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { icon: "upload", onClick: () => {
        if (fileRef.current) fileRef.current.click();
      } }, "Upload image"), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/*", tabIndex: -1, "aria-hidden": "true", hidden: true, onChange: (e) => {
        const f = e.target.files[0];
        if (!f) return;
        const r = new FileReader();
        r.onload = (ev) => setCatEdit((x) => ({ ...x, icon: ev.target.result }));
        r.readAsDataURL(f);
      } }), catEdit.icon ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "xs", onClick: () => setCatEdit((x) => ({ ...x, icon: null })) }, "Remove") : null))) : null)
    );
  }
  const { useState } = React;
  const SIGN_OUT = "/outpost.goauthentik.io/sign_out";
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
  const FEATURE_STATUS = { done: ["success", "Done"], planned: ["active", "Planned"], wip: ["active", "In progress"] };
  const CAP_STATUS = { built: ["success", "Built"], planned: ["active", "Planned"], todo: ["neutral", "Not started"] };
  const capBadge = (s) => {
    const m = CAP_STATUS[s] || CAP_STATUS.todo;
    return /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: m[0] }, m[1]);
  };
  const FeatureRow = ({ item }) => {
    const s = FEATURE_STATUS[item.status] || FEATURE_STATUS.planned;
    return /* @__PURE__ */ React.createElement(plenixPlatform.SettingsRow, { label: item.label, description: item.desc }, /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: s[0] }, s[1]));
  };
  const ScreenKey = React.createContext("");
  const Screen = ({ id, lead, title, desc, actions, children }) => /* @__PURE__ */ React.createElement(ScreenKey.Provider, { value: id || title }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "lg" }, lead || null, /* @__PURE__ */ React.createElement(plenixPlatform.RecordPage.Header, { title, description: desc, actions }), /* @__PURE__ */ React.createElement("div", null, children)));
  const Section = ({ stateKey, ...p }) => {
    const screen = React.useContext(ScreenKey);
    return /* @__PURE__ */ React.createElement(plenixPlatform.SettingsSection, { stateKey: screen + ":" + (stateKey || p.title), ...p });
  };
  const RowLabel = React.createContext(null);
  const Row = ({ label, desc, htmlFor, children }) => /* @__PURE__ */ React.createElement(RowLabel.Provider, { value: label }, /* @__PURE__ */ React.createElement(plenixPlatform.SettingsRow, { label, description: desc, htmlFor }, children));
  const Toggle = ({ val, onChange, label, disabled }) => {
    const row = React.useContext(RowLabel);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Switch, { checked: !!val, disabled, onChange: (e) => onChange(e.target.checked), label: label || row || "On", labelHidden: true });
  };
  const Seg = ({ opts, val, onChange, label }) => {
    const row = React.useContext(RowLabel);
    return /* @__PURE__ */ React.createElement(plenixPlatform.SegmentedControl, { label: label || row, value: val, onChange, options: opts.map((o) => ({ value: o.v, label: o.l })) });
  };
  const Choose = ({ opts, val, onChange, id, label, defaultValue }) => {
    const row = React.useContext(RowLabel);
    return /* @__PURE__ */ React.createElement(plenixPlatform.Select, { id, "aria-label": id ? void 0 : label || row, value: val, defaultValue, onChange: onChange ? (e) => onChange(e.target.value) : void 0, options: opts.map((o) => ({ value: o.v, label: o.l })) });
  };
  const DensityChoice = () => {
    const [d, setD] = plenixPlatform.useDensity();
    const opts = window.PlenixWorkspace ? window.PlenixWorkspace.densities() : [];
    return /* @__PURE__ */ React.createElement(plenixPlatform.ChoiceList, { legend: "Display density", value: d, onChange: setD, options: opts });
  };
  const ThemeChoice = ({ id }) => {
    const { theme, setTheme, themes } = plenixPlatform.useTheme();
    return /* @__PURE__ */ React.createElement(plenixPlatform.Select, { id, value: theme, onChange: (e) => setTheme(e.target.value), options: themes.map((t) => ({ value: t.name, label: t.label })) });
  };
  const AddRow = ({ id, label, value, onChange, placeholder, onAdd, onCancel }) => /* @__PURE__ */ React.createElement(Row, { label, htmlFor: id }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", wrap: true }, /* @__PURE__ */ React.createElement(plenixPlatform.Input, { id, width: "lg", autoFocus: true, autoComplete: "off", enterKeyHint: "done", value, onChange, placeholder, onKeyDown: (e) => {
    if (e.key === "Enter") onAdd();
    if (e.key === "Escape") onCancel();
  } }), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: onAdd, size: "sm" }, "Add"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: onCancel, size: "sm" }, "Cancel")));
  function CapDoc({ cap: cap2, backLabel, onBack, crumb }) {
    const spec = cap2.specification || {};
    const ui = cap2.ui || {};
    const sections = [
      { title: "Baseline operations", content: facts("Baseline operations", Object.entries(cap2.baselineOps || {}).map((e) => [e[0].charAt(0).toUpperCase() + e[0].slice(1), e[1] === "Not started" ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "danger" }, e[1]) : e[1]])) },
      { title: "Features", content: /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, (cap2.features || []).map((f) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: f.id, title: f.name, actions: capBadge(f.status) }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, f.desc)))) },
      { title: "Use cases", long: true, content: /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, (cap2.useCases || []).map((uc) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: uc.id, title: uc.title }, /* @__PURE__ */ React.createElement(plenixPlatform.PropertyList, null, [["Actor", uc.actor], ["Goal", uc.goal], ["System response", uc.systemResponse], ["Alternate flow", uc.alternateFlow]].map((r) => /* @__PURE__ */ React.createElement(plenixPlatform.PropertyList.Item, { key: r[0], label: r[0] }, r[1])), /* @__PURE__ */ React.createElement(plenixPlatform.PropertyList.Item, { label: "Main flow" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { as: "ol", gap: "xs" }, (uc.mainFlow || []).map((step, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { as: "li", key: i, gap: "sm", align: "baseline" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, i + 1, "."), /* @__PURE__ */ React.createElement(plenixPlatform.Text, null, step))))))))) },
      { title: "Functionality", long: true, content: facts("Functionality", (cap2.functionality || []).map((f) => [f.feature, f.behavior])) },
      { title: "Scenarios", long: true, content: /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: "Scenarios", data: (cap2.scenarios || []).map((r, i) => ({ ...r, id: i })), columns: [
        { title: "If", field: "condition", kind: "wrap", rowLabel: true, width: "--plx-ref-size-240px" },
        { title: "Then", field: "expected", kind: "wrap" }
      ] }) },
      { title: "Specification", long: true, content: /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: "Fields", data: (spec.ownFields || []).map((f, i) => ({ id: i, field: f.field + (f.required ? " *" : ""), type: f.type, required: f.required ? "Yes" : "No", notes: f.notes || (f.default !== void 0 ? "Default: " + f.default : "") })), columns: [
        { title: "Field", field: "field", kind: "name", rowLabel: true, width: "--plx-ref-size-240px" },
        { title: "Type", field: "type", kind: "data" },
        { title: "Required", field: "required" },
        { title: "Notes", field: "notes", kind: "wrap" }
      ] }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "+ 4 Anchor fields: ", /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "projectType · projects[] · categories[] · tags[]")), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "+ 3 base fields: ", /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "id · createdAt · updatedAt")), (spec.rules || []).length > 0 && /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "label" }, "Rules and constraints"), /* @__PURE__ */ React.createElement(plenixPlatform.List, { label: "Rules and constraints", items: spec.rules.map((r) => ({ icon: "chevron-right", tone: "info", children: r })) }))) },
      { title: "Enablers", long: true, content: facts("Enablers", (cap2.enablers || []).map((e) => [e.name, e.desc])) },
      { title: "UI", long: true, content: facts("UI", [
        ui.screen && ui.screen !== "Not started" && ["Screen", ui.screen, true],
        (ui.components || []).length > 0 && ["Components", /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, ui.components.map((c, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Text, { key: i }, c)))],
        (ui.widgets || []).length > 0 && ["Widgets", /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, ui.widgets.map((w, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Text, { key: i, variant: "data" }, w)))]
      ]) },
      { title: "Modules", long: true, content: /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Modules" }, (cap2.modules || []).map((m, i) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: i }, m === "Not started" ? /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "danger" }, m) : m))) },
      { title: "Entity and schema", long: true, content: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", wrap: true }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "label" }, "Entity"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "SCHEMA.types.", cap2.entity), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "+"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "SCHEMA.anchors")) }
    ];
    return /* @__PURE__ */ React.createElement(
      Screen,
      {
        id: "capability",
        title: cap2.label,
        desc: cap2.purpose,
        lead: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "sm", icon: "arrow-left", onClick: onBack }, backLabel), crumb ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "caption" }, "Capabilities →"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "label" }, cap2.label)) : null),
        actions: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Badge, null, cap2.layer), cap2.stub ? /* @__PURE__ */ React.createElement(plenixPlatform.Badge, { tone: "neutral" }, "Not started") : null)
      },
      sections.map((s) => /* @__PURE__ */ React.createElement(Section, { key: s.title, title: s.title, collapsible: !!s.long }, s.content))
    );
  }
  function DocsPanel({ docSection, setDocSection }) {
    const [selCap, setSelCap] = useState(null);
    if (docSection === "about") return /* @__PURE__ */ React.createElement(Screen, { id: "docs-about", title: "About Plenix", desc: "The product, the name, and the vision behind it." }, /* @__PURE__ */ React.createElement(Section, { title: "Plenix", description: '"The completor" -- that which makes whole. Pronounced /PLEN-iks/.' }, facts("Plenix", (window.PV_NAME_ROWS || []).map((r) => [r.k, r.v]))), /* @__PURE__ */ React.createElement(Section, { title: "Why it fits this product" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p" }, "The entire vision of Plenix is about solving fragmentation. Context is lost. Data is duplicated. Retrieval fails. The result is an incomplete picture of your own information. Plenix is the answer to that incompleteness."), facts("Why Plenix fits", (window.PV_FIT || []).map((p) => [p.principle, p.meaning]))), /* @__PURE__ */ React.createElement(Section, { title: "Core data model" }, facts("Core data model", (window.PV_MODEL || []).map((m) => [m.name, m.desc]))), /* @__PURE__ */ React.createElement(Section, { title: "Documentation figures" }, /* @__PURE__ */ React.createElement(plenixPlatform.Metric.Group, { label: "Documentation figures" }, [["Capabilities", 74], ["Features documented", 807], ["PRDs with content", 50], ["Project types", (window.ALL_PROJ_TYPES || []).length]].map((s) => /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { key: s[0], value: s[1], label: s[0] })))));
    if (docSection === "product-vision") return /* @__PURE__ */ React.createElement(Screen, { id: "docs-vision", title: "Product vision", desc: "The founding document. Why Plenix exists, what it solves, and how it works." }, /* @__PURE__ */ React.createElement(Section, { title: "The problem", description: "Modern digital life is fragmented. A single person may use 8-12+ separate tools daily just to stay organized. This creates three core pain points:" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, (window.PV_PROBLEMS || []).map((p) => /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: p.label, title: p.label }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, p.desc))))), /* @__PURE__ */ React.createElement(Section, { title: "The vision" }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, "A single, AI-powered ecosystem that unifies how a person captures, organizes, connects, communicates, retrieves, and acts on all forms of personal information -- without duplicating data or replacing the heavy-duty tools they already use.")), /* @__PURE__ */ React.createElement(Section, { title: "Core philosophy" }, facts("Core philosophy", (window.PV_PHILOSOPHY || []).map((ph) => [ph.p, ph.d]))), /* @__PURE__ */ React.createElement(Section, { title: "What the platform unifies" }, /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: "What the platform unifies", data: (window.PV_UNIFIES || []).map((r, i) => ({ id: i, silo: r[0], unified: r[1] })), columns: [
      { title: "Traditional silo", field: "silo", kind: "wrap", rowLabel: true, width: "--plx-ref-size-240px" },
      { title: "Unified in Plenix", field: "unified", kind: "wrap" }
    ] })), /* @__PURE__ */ React.createElement(Section, { title: "Unified messaging hub", collapsible: true, description: "A single interface aggregating SMS, MMS, WhatsApp, and future channels. Messages sent and received through native platforms -- Plenix is the interface, not the infrastructure." }, facts("Unified messaging hub", (window.PV_MESSAGING || []).map((s) => [s.label, s.desc]))), /* @__PURE__ */ React.createElement(Section, { title: "Smart file naming", collapsible: true, description: "Derived from: date + linked project + OCR content + identified contact. User always has final say." }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", wrap: true }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "danger" }, /* @__PURE__ */ React.createElement("s", null, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "IMG_4891.png"))), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary", "aria-hidden": "true" }, "→"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "2025-03-02_KitchenReno_ContractorQuote_ABCPlumbing.png"))), /* @__PURE__ */ React.createElement(Section, { title: "Project home", collapsible: true }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Project home" }, ["Linked files", "Notes", "Tasks & calendar events", "Bookmarks & media", "Contacts", "Message threads", "Virtual meeting launcher"].map((i) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: i }, i))), /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "strong" }, "The presentation use case"), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p" }, "Today a user presenting on Zoom alt-tabs frantically between PowerPoint, a spreadsheet, file explorer, and notes. With Project Home, all linked resources are accessible from one workspace. The project view becomes the cockpit for the meeting -- everything is one click away, not five windows deep."))))), /* @__PURE__ */ React.createElement(Section, { title: "Key use cases", collapsible: true }, facts("Key use cases", (window.PV_USECASES || []).map((u, i) => [i + 1 + ". " + u.uc, u.d]))), /* @__PURE__ */ React.createElement(Section, { title: "What Plenix is not", collapsible: true }, /* @__PURE__ */ React.createElement(plenixPlatform.List, { label: "What Plenix is not", items: (window.PV_NOT || []).map((n) => ({ icon: "close", tone: "danger", children: n })) })));
    if (docSection === "terminology") {
      const tableColumns = (t) => t.headers.map((h, j) => ({ title: h, field: "c" + j, kind: "wrap", rowLabel: j === 0, width: j === 0 ? "--plx-ref-size-240px" : void 0 }));
      const tableRows = (t) => t.rows.map((r, i) => Object.assign({ id: i }, ...r.map((v, j) => ({ ["c" + j]: v }))));
      return /* @__PURE__ */ React.createElement(Screen, { id: "docs-terminology", title: "Terminology", desc: "Plenix mapped to standard software development structure. Use these definitions consistently across design, development, and documentation." }, /* @__PURE__ */ React.createElement(Section, { title: "Layers" }, /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Layers" }, ["1 Product", "2 Feature", "3 Usage", "4 Behavior", "5 Scenario", "6 Spec", "7 Enabler", "8 UI", "9 Architecture", "10 Data"].map((l) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: l }, l)))), (window.TERM_LAYERS || []).map((layer, li) => /* @__PURE__ */ React.createElement(Section, { key: layer.num, title: layer.num + ". " + layer.term, description: layer.name, collapsible: true, defaultExpanded: li === 0 }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p" }, layer.desc), layer.note && /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, layer.note), layer.table && /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: layer.term, data: tableRows(layer.table), columns: tableColumns(layer.table) }), layer.subTerm && /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "heading" }, layer.subTerm, " — ", layer.subDesc), /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: layer.subTerm, data: tableRows(layer.subTable), columns: tableColumns(layer.subTable) })), layer.correction && /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "strong" }, "Note: "), layer.correction), layer.schemaNote && /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, layer.schemaNote)))), /* @__PURE__ */ React.createElement(Section, { title: "How the layers relate" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "xs" }, (window.TERM_HIERARCHY || []).map((item) => /* @__PURE__ */ React.createElement(React.Fragment, { key: item.label }, indent(
        item.indent || 0,
        /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", align: "baseline" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: item.indent === 0 ? "strong" : "body" }, item.label), item.note && /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "caption" }, "— ", item.note))
      ))))), /* @__PURE__ */ React.createElement(Section, { title: "Fully mapped example" }, facts("Fully mapped example", window.TERM_EXAMPLE ? Object.entries(window.TERM_EXAMPLE).map((entry) => {
        const labels = { capability: "Capability", feature: "Feature", useCase: "Use case", functionality: "Functionality", scenario: "Scenario", specification: "Specification", enabler: "Enabler", ui: "UI", module: "Module", entity: "Entity", schema: "Schema" };
        const k = entry[0];
        const v = entry[1];
        const technical = v.includes("SCHEMA") || v.includes("Screen") || v.includes("Widget") || v.includes("Module");
        return [labels[k] || k, v, technical];
      }) : [])));
    }
    if (docSection === "capabilities") {
      const cap2 = selCap && (window.CAP_DOCS || {})[selCap];
      if (cap2) return /* @__PURE__ */ React.createElement(CapDoc, { cap: cap2, backLabel: "Back", crumb: true, onBack: () => setSelCap(null) });
      return /* @__PURE__ */ React.createElement(Screen, { id: "docs-capabilities", title: "Capabilities", desc: "73 capabilities across 3 layers. Choose any capability to view its full documentation." }, (window.CAP_LAYERS || []).map((layer) => {
        const groups = (window.CAPABILITY_GROUPS || []).filter((g) => g.layer === layer.id);
        const total = groups.reduce((s, g) => s + g.items.length, 0);
        return /* @__PURE__ */ React.createElement(Section, { key: layer.id, title: layer.label, description: plenixPlatform.dataPhrase(total + " capabilities") }, groups.map((grp) => /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { key: grp.id, gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "label" }, grp.group), /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs", wrap: true }, grp.items.map((c) => {
          const doc = (window.CAP_DOCS || {})[c.id];
          const isStub = !doc || doc.stub;
          return /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "xs", key: c.id, disabled: !doc, iconEnd: isStub ? void 0 : "circle-check", onClick: () => {
            if (doc) setSelCap(c.id);
          } }, c.label, isStub && /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "danger" }, " · Not started"));
        })))));
      }), /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, "✓ = documented · Not started = needs documentation. Choose any capability to view or start documenting it."));
    }
    if (docSection === "data-model") {
      const schema = window.SCHEMA || { anchorsApplied: [], types: {} };
      const types = schema.types || {};
      return /* @__PURE__ */ React.createElement(Screen, { id: "docs-data-model", title: "Data model", desc: "Every item type in Plenix and the fields it carries. All types extend the 4 Anchor fields." }, /* @__PURE__ */ React.createElement(Section, { title: "Anchors", description: 'UI label: "Classification". The 4 universal fields present on every item in every capability. They connect items to the rest of the system — to projects, categories, and tags — enabling cross-cutting views, filtering, and retrieval.' }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "sm" }, /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: "Anchor fields", data: [
        ["projectType", "string | null", "Dropdown — single select from Settings > Project Types"],
        ["projects[]", "string[]", "Search-to-select with create — many-to-many"],
        ["categories[]", "string[]", "Grouped search-to-select with create — shows hierarchy"],
        ["tags[]", "string[]", "Grouped search-to-select with create — auto-lowercase-hyphen"]
      ].map((r, i) => ({ id: i, field: r[0], type: r[1], ui: r[2] })), columns: [
        { title: "Field", field: "field", kind: "name", rowLabel: true, width: "--plx-ref-size-240px" },
        { title: "Type", field: "type", kind: "data" },
        { title: "UI", field: "ui", kind: "wrap" }
      ] }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "secondary" }, "Plus base fields on every item: ", /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "id"), " · ", /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "createdAt"), " · ", /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "updatedAt")))), /* @__PURE__ */ React.createElement(Section, { title: "Anchors applied to " + (schema.anchorsApplied || []).length + " capabilities", stateKey: "anchors-applied" }, /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Capabilities with anchors" }, (schema.anchorsApplied || []).map((c) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: c }, c)))), Object.entries(types).map((entry) => {
        const key = entry[0];
        const type = entry[1];
        const fields = Object.entries(type.fields || {});
        const fieldCount = fields.length;
        return /* @__PURE__ */ React.createElement(
          Section,
          {
            key,
            title: type.label,
            stateKey: "type-" + key,
            collapsible: true,
            defaultExpanded: false,
            description: /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { as: "span", gap: "sm", wrap: true }, /* @__PURE__ */ React.createElement(Ico, { n: type.icon || "file" }), /* @__PURE__ */ React.createElement(plenixPlatform.Text, null, type.desc), /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, fieldCount, " own field", fieldCount !== 1 ? "s" : ""), /* @__PURE__ */ React.createElement(plenixPlatform.Tag, null, type.capability))
          },
          /* @__PURE__ */ React.createElement(plenixPlatform.Table, { label: type.label + " fields", empty: "No own fields", data: fields.map(([n, d]) => ({ id: n, name: n + (d.required ? " *" : ""), type: d.type, detail: d.enum ? "enum: " + d.enum.join(", ") : d.desc || d.unit ? "unit: " + d.unit : "" })), columns: [
            { title: "Field", field: "name", kind: "name", rowLabel: true, width: "--plx-ref-size-240px" },
            { title: "Type", field: "type", kind: "data" },
            { title: "Detail", field: "detail", kind: "wrap" }
          ] })
        );
      }), /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, "* Required field. All item types also inherit the 4 Anchor fields + id + createdAt + updatedAt."));
    }
    if (docSection && docSection.startsWith("cap-")) {
      const capKey = docSection.replace("cap-", "");
      const cap2 = (window.CAP_DOCS || {})[capKey];
      if (!cap2) return /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { size: "page", icon: "doc-search", title: 'Capability "' + capKey + '" not found.' });
      return /* @__PURE__ */ React.createElement(CapDoc, { cap: cap2, backLabel: "Capabilities", onBack: () => setDocSection("capabilities") });
    }
    if (!docSection || docSection === "overview") return /* @__PURE__ */ React.createElement(Screen, { id: "docs-overview", title: "Documentation", desc: "Living documentation for Plenix -- architecture, features, and design system. Auto-generated from the codebase. Select a section from the sidebar." }, /* @__PURE__ */ React.createElement(Section, { title: "Start here" }, /* @__PURE__ */ React.createElement(plenixPlatform.ContentGrid, { size: "lg", label: "Documentation" }, /* @__PURE__ */ React.createElement(plenixPlatform.Card, { title: "Style guide", onOpen: () => setDocSection("style-guide") }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Design tokens, typography, color palette, spacing, and component patterns: the Plenix design system.")), /* @__PURE__ */ React.createElement(plenixPlatform.Card, { title: "All feature areas", onOpen: () => setDocSection("feat-" + window.FEATURES[0].area) }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, plenixPlatform.dataPhrase(window.FEATURES.length + " areas, " + window.FEATURES.reduce((s, a) => s + a.items.length, 0) + " features documented."))))), /* @__PURE__ */ React.createElement(Section, { title: "Feature areas" }, /* @__PURE__ */ React.createElement(plenixPlatform.ContentGrid, { size: "md", label: "Feature areas" }, window.FEATURES.map((area) => {
      const done = area.items.filter((i) => i.status === "done").length;
      const pct = Math.round(done / area.items.length * 100);
      return /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: area.area, title: area.area, meta: /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, pct + "%"), onOpen: () => setDocSection("feat-" + area.area) }, /* @__PURE__ */ React.createElement(plenixPlatform.ProgressBar, { value: pct, color: area.color, size: "sm", label: area.area + " progress", labelHidden: true }));
    }))));
    if (docSection === "style-guide") return /* @__PURE__ */ React.createElement(Screen, { id: "docs-style-guide", title: "Style guide", desc: "Design tokens, typography, color, spacing and component patterns live in the Plenix design system." }, /* @__PURE__ */ React.createElement(Section, { title: "Plenix Design System", description: "The design system is the point of truth for every token and component in Plenix. This page no longer copies its values." }, /* @__PURE__ */ React.createElement(plenixPlatform.Card, { title: "Open the design system", href: "../platform/design-system/", meta: /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, "../platform/design-system/") }, /* @__PURE__ */ React.createElement(plenixPlatform.Text, { as: "p", variant: "secondary" }, "Tokens, typography, color palette, spacing, shadows and every Platform component, with their code."))));
    if (docSection && docSection.startsWith("feat-")) {
      const areaName = docSection.substring(5);
      const area = window.FEATURES.find((a) => a.area === areaName);
      if (!area) return null;
      return /* @__PURE__ */ React.createElement(FeatureArea, { area, stats: true });
    }
    return null;
  }
  const indent = (n, el) => n > 0 ? /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { indent: true }, indent(n - 1, el)) : el;
  function FeatureArea({ area, stats }) {
    const done = area.items.filter((i) => i.status === "done").length;
    const pct = Math.round(done / area.items.length * 100);
    const planned = area.items.filter((i) => i.status === "planned").length;
    const inprog = area.items.filter((i) => i.status === "in-progress").length;
    return /* @__PURE__ */ React.createElement(Screen, { id: "feature-" + area.area, title: area.area, actions: stats ? null : /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, done, "/", area.items.length, " done") }, /* @__PURE__ */ React.createElement(Section, { title: "Progress", stateKey: "progress" }, /* @__PURE__ */ React.createElement(plenixPlatform.Stack, { gap: "md" }, stats ? /* @__PURE__ */ React.createElement(plenixPlatform.Metric.Group, { label: area.area + " figures" }, /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: area.items.length, label: "Total" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: done, label: "Done" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: inprog, label: "In progress" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: planned, label: "Planned" }), /* @__PURE__ */ React.createElement(plenixPlatform.Metric, { value: pct + "%", label: "Progress" })) : null, /* @__PURE__ */ React.createElement(plenixPlatform.ProgressBar, { value: pct, color: area.color, size: "sm", label: pct + "% complete", labelHidden: !!stats }))), /* @__PURE__ */ React.createElement(Section, { title: "Features", stateKey: "features", description: plenixPlatform.dataPhrase(area.items.length + " features, each with its status") }, area.items.map((item, i) => /* @__PURE__ */ React.createElement(FeatureRow, { key: i, item }))));
  }
  function Settings({ prefs, setPrefs, screen, onBack }) {
    const cat = screen.parts[0] || "general";
    const featArea = cat === "features" ? screen.parts[1] || null : null;
    const docSection = cat === "docs" ? screen.parts[1] || null : null;
    const go = (c, sub) => screen.open(sub ? [c, sub] : [c]);
    const setFeatArea = (a) => go("features", a);
    const setDocSection = (d) => go("docs", d);
    const { account, setPicture } = plenixPlatform.useSession();
    const [featOpen, setFeatOpen] = useState(cat === "features");
    const [docOpen, setDocOpen] = useState(cat === "docs");
    const set = (k, v) => setPrefs((p) => ({ ...p, [k]: v }));
    const [acct, setAcct] = useState(() => ({ name: account.name || "", email: account.email || "" }));
    const [acctSaved, setAcctSaved] = useState(acct);
    const acctDirty = acct.name !== acctSaved.name || acct.email !== acctSaved.email;
    plenixPlatform.useUnsavedGuard(acctDirty, "Your account changes have not been saved.", { keeps: (next) => next.parts[0] === "account" });
    const [cats, setCats] = useState([
      { id: 1, name: "Personal", color: "green", icon: null, subs: [{ id: 11, name: "Health" }, { id: 12, name: "Finance" }, { id: 13, name: "Family" }] },
      { id: 2, name: "Client Work", color: "blue", icon: null, subs: [{ id: 21, name: "Design" }, { id: 22, name: "Development" }, { id: 23, name: "Strategy" }] },
      { id: 3, name: "Research", color: "purple", icon: null, subs: [{ id: 31, name: "Market Research" }, { id: 32, name: "Competitive Analysis" }] },
      { id: 4, name: "Travel", color: "brown", icon: null, subs: [] },
      { id: 5, name: "Archive", color: "grey", icon: null, subs: [] }
    ]);
    const [catEdit, setCatEdit] = useState(null);
    const saveEdit = () => {
      if (!catEdit || !catEdit.name.trim()) return;
      if (catEdit.type === "cat") {
        if (catEdit.isNew) setCats((prev) => [...prev, { id: Date.now(), name: catEdit.name.trim(), color: catEdit.color || "blue", icon: catEdit.icon || null, subs: [] }]);
        else setCats((prev) => prev.map((c) => c.id === catEdit.catId ? { ...c, name: catEdit.name.trim(), color: catEdit.color, icon: catEdit.icon || null } : c));
      } else {
        if (catEdit.isNew) setCats((prev) => prev.map((c) => c.id === catEdit.catId ? { ...c, subs: [...c.subs, { id: Date.now(), name: catEdit.name.trim() }] } : c));
        else setCats((prev) => prev.map((c) => c.id === catEdit.catId ? { ...c, subs: c.subs.map((s) => s.id === catEdit.subId ? { ...s, name: catEdit.name.trim() } : s) } : c));
      }
      setCatEdit(null);
    };
    const deleteCat = (id) => setCats((prev) => prev.filter((c) => c.id !== id));
    const deleteSub = (catId, subId) => setCats((prev) => prev.map((c) => c.id === catId ? { ...c, subs: c.subs.filter((s) => s.id !== subId) } : c));
    const [tags, setTags] = useState([
      { id: 1, name: "mountain" },
      { id: 2, name: "snow" },
      { id: 3, name: "lake" },
      { id: 4, name: "architecture" },
      { id: 5, name: "portrait" },
      { id: 6, name: "nature" },
      { id: 7, name: "urban" },
      { id: 8, name: "aerial" },
      { id: 9, name: "interior" },
      { id: 10, name: "product" },
      { id: 11, name: "black-and-white" },
      { id: 12, name: "supplier" },
      { id: 13, name: "VIP" },
      { id: 14, name: "strategy" },
      { id: 15, name: "Q2" },
      { id: 16, name: "inspiration" },
      { id: 17, name: "typography" },
      { id: 18, name: "branding" }
    ]);
    const tagView = plenixPlatform.useCollectionView([{ value: "name", label: "Name", kind: "text" }], { text: (t) => t.name });
    const [tagAdding, setTagAdding] = useState(false);
    const [tagEditVal, setTagEditVal] = useState("");
    const tagName = (v) => v.trim().toLowerCase().replace(/\s+/g, "-");
    const addTag = () => {
      const n = tagName(tagEditVal);
      if (!n) return;
      if (!tags.some((t) => t.name === n)) setTags((prev) => [...prev, { id: Date.now(), name: n }]);
      setTagAdding(false);
      setTagEditVal("");
    };
    const renameTag = (id, text) => {
      const n = tagName(text);
      if (n) setTags((prev) => prev.map((t) => t.id === id ? { ...t, name: n } : t));
    };
    const deleteTag = (id) => setTags((prev) => prev.filter((t) => t.id !== id));
    const cancelTag = () => {
      setTagAdding(false);
      setTagEditVal("");
    };
    const defaultTypes = (window.PROJ_TYPES || []).flatMap((g, gi) => g.types.map((t, ti) => ({ id: gi * 100 + ti + 1, name: t, group: g.group })));
    const [projTypes, setProjTypes] = useState(defaultTypes);
    const ptView = plenixPlatform.useCollectionView([{ value: "name", label: "Name", kind: "text" }], { text: (t) => t.name });
    const [ptAdding, setPtAdding] = useState(false);
    const [ptEditVal, setPtEditVal] = useState("");
    const addPT = () => {
      const n = ptEditVal.trim();
      if (!n) return;
      if (!projTypes.some((t) => t.name.toLowerCase() === n.toLowerCase())) setProjTypes((prev) => [...prev, { id: Date.now(), name: n, group: "Other" }]);
      setPtAdding(false);
      setPtEditVal("");
    };
    const renamePT = (id, text) => {
      const n = text.trim();
      if (n) setProjTypes((prev) => prev.map((t) => t.id === id ? { ...t, name: n } : t));
    };
    const deletePT = (id) => setProjTypes((prev) => prev.filter((t) => t.id !== id));
    const cancelPT = () => {
      setPtAdding(false);
      setPtEditVal("");
    };
    const SETTINGS_CATS = [
      { id: "account", label: "Account", icon: "settings-profile" },
      { id: "appearance", label: "Appearance", icon: "settings-customize" },
      { id: "calendar", label: "Calendar", icon: "calendar" },
      { id: "categories", label: "Categories", icon: "settings-categories" },
      { id: "contacts", label: "Contacts", icon: "person" },
      { id: "dashboard", label: "Dashboard", icon: "home" },
      { id: "email", label: "Email", icon: "settings-email" },
      { id: "files", label: "Files", icon: "document" },
      { id: "general", label: "General", icon: "settings-general" },
      { id: "notes", label: "Notes", icon: "text-card" },
      { id: "projects", label: "Projects", icon: "briefcase" },
      { id: "projtypes", label: "Project types", icon: "briefcase-plus" },
      { id: "tags", label: "Tags", icon: "tags" },
      { id: "tasks", label: "Tasks", icon: "circle-check" }
    ];
    const accent = plenixPlatform.DATA_COLORS.indexOf(prefs.accent) >= 0 ? prefs.accent : plenixPlatform.DATA_COLORS[0];
    const visibleTags = tags.filter(tagView.test);
    const panels = {
      categories: /* @__PURE__ */ React.createElement(
        Screen,
        {
          id: "categories",
          title: "Categories",
          desc: "Organize your projects, tasks, and content with custom categories and subcategories.",
          actions: /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", icon: "plus", onClick: () => setCatEdit({ type: "cat", isNew: true, name: "", color: "blue", icon: null }) }, "New category")
        },
        cats.map((cat2) => /* @__PURE__ */ React.createElement(
          Section,
          {
            key: cat2.id,
            stateKey: "category-" + cat2.id,
            collapsible: true,
            defaultExpanded: cat2.id <= 3,
            title: cat2.name,
            description: plenixPlatform.dataPhrase(cat2.subs.length === 1 ? "1 subcategory" : cat2.subs.length + " subcategories"),
            actions: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", variant: "danger-secondary", icon: "trash", onClick: () => {
              if (window.confirm('Delete "' + cat2.name + '"?')) deleteCat(cat2.id);
            } }, "Delete category"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", icon: "pencil", onClick: () => setCatEdit({ type: "cat", catId: cat2.id, isNew: false, name: cat2.name, color: cat2.color, icon: cat2.icon || null }) }, "Edit category"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", icon: "plus", onClick: () => setCatEdit({ type: "sub", catId: cat2.id, isNew: true, name: "" }) }, "Add subcategory"))
          },
          /* @__PURE__ */ React.createElement(Row, { label: "Color" }, /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { category: cat2.color, size: "sm" })),
          cat2.subs.length === 0 && /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { title: "No subcategories yet" }),
          cat2.subs.map((sub) => /* @__PURE__ */ React.createElement(Row, { key: sub.id, label: sub.name }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "xs" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "sm", iconOnly: true, icon: "pencil", label: "Edit " + sub.name, onClick: () => setCatEdit({ type: "sub", catId: cat2.id, subId: sub.id, isNew: false, name: sub.name }) }), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "ghost", size: "sm", iconOnly: true, icon: "trash", label: "Delete " + sub.name, onClick: () => deleteSub(cat2.id, sub.id) }))))
        )),
        catEdit && /* @__PURE__ */ React.createElement(CatEditModal, { catEdit, setCatEdit, saveEdit })
      ),
      tags: /* @__PURE__ */ React.createElement(
        Screen,
        {
          id: "tags",
          title: "Tags",
          desc: "Tags are flat keyword identifiers applied to any item -- images, notes, contacts, bookmarks, files, and more. Create them here and apply them anywhere."
        },
        /* @__PURE__ */ React.createElement(Section, { title: "All tags", description: plenixPlatform.dataPhrase(visibleTags.length + " of " + tags.length + " tags") }, /* @__PURE__ */ React.createElement(
          plenixPlatform.CommandBar,
          {
            label: "Tags",
            sticky: false,
            count: visibleTags.length + " tags",
            actions: [{ id: "new", label: "New tag", icon: "plus", primary: true, onSelect: () => {
              setTagAdding(true);
              setTagEditVal("");
            } }],
            find: /* @__PURE__ */ React.createElement(plenixPlatform.CommandBarSearch, { id: "settings-tag-search", ...tagView.searchProps, placeholder: "Search tags...", label: "Search tags" })
          }
        ), tagAdding && /* @__PURE__ */ React.createElement(AddRow, { id: "settings-new-tag", label: "New tag name", value: tagEditVal, onChange: (e) => setTagEditVal(e.target.value.toLowerCase().replace(/\s+/g, "-")), placeholder: "tag-name", onAdd: addTag, onCancel: cancelTag }), visibleTags.length > 0 ? /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: "Tags" }, [...visibleTags].sort((a, b) => a.name.localeCompare(b.name)).map((tag) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: tag.id, onRename: (text) => renameTag(tag.id, text), renameLabel: "Rename tag " + tag.name, onRemove: () => deleteTag(tag.id), removeLabel: "Delete tag " + tag.name }, tag.name))) : /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { title: "No tags match." })),
        /* @__PURE__ */ React.createElement(Section, { title: "How tags work", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React.createElement(plenixPlatform.Notice, { tone: "info" }, "Tags are flat keywords -- no hierarchy. Choose any tag name to rename it inline. Tags apply to images, notes, contacts, bookmarks, tasks, files, and any other item. Use them to describe content: ", /* @__PURE__ */ React.createElement("em", null, "mountain, snow, supplier, VIP, Q2, typography, inspiration"), "."))
      ),
      projtypes: /* @__PURE__ */ React.createElement(
        Screen,
        {
          id: "projtypes",
          title: "Project types",
          desc: "Define the types of projects in your workspace. Applied when creating a project."
        },
        /* @__PURE__ */ React.createElement(Section, { title: "Find a project type", description: plenixPlatform.dataPhrase(projTypes.length + " project types defined") }, /* @__PURE__ */ React.createElement(
          plenixPlatform.CommandBar,
          {
            label: "Project types",
            sticky: false,
            count: ptView.count(projTypes) + " project types",
            actions: [{ id: "new", label: "New type", icon: "plus", primary: true, onSelect: () => {
              setPtAdding(true);
              setPtEditVal("");
            } }],
            find: /* @__PURE__ */ React.createElement(plenixPlatform.CommandBarSearch, { id: "settings-type-search", ...ptView.searchProps, placeholder: "Search project types...", label: "Search project types" })
          }
        ), ptAdding && /* @__PURE__ */ React.createElement(AddRow, { id: "settings-new-type", label: "New project type name", value: ptEditVal, onChange: (e) => setPtEditVal(e.target.value), placeholder: "e.g. Product Launch", onAdd: addPT, onCancel: cancelPT })),
        (() => {
          const filtered = projTypes.filter(ptView.test);
          const groups = {};
          filtered.forEach((t) => {
            if (!groups[t.group]) groups[t.group] = [];
            groups[t.group].push(t);
          });
          if (filtered.length === 0) return /* @__PURE__ */ React.createElement(Section, { title: "No results", stateKey: "none" }, /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { title: "No project types match." }));
          return Object.entries(groups).map(([grp, items]) => /* @__PURE__ */ React.createElement(Section, { key: grp, title: grp, collapsible: true, description: plenixPlatform.dataPhrase(items.length === 1 ? "1 type" : items.length + " types") }, /* @__PURE__ */ React.createElement(plenixPlatform.TagList, { label: grp }, items.sort((a, b) => a.name.localeCompare(b.name)).map((pt) => /* @__PURE__ */ React.createElement(plenixPlatform.Tag, { key: pt.id, onRename: (text) => renamePT(pt.id, text), renameLabel: "Rename project type " + pt.name, onRemove: () => deletePT(pt.id), removeLabel: "Delete project type " + pt.name }, pt.name)))));
        })()
      ),
      general: /* @__PURE__ */ React.createElement(Screen, { id: "general", title: "General", desc: "Language, regional formats and core behavior." }, /* @__PURE__ */ React.createElement(Section, { title: "Regional" }, /* @__PURE__ */ React.createElement(Row, { label: "Date format" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "mdy", l: "MM/DD/YY" }, { v: "dmy", l: "DD/MM/YY" }, { v: "iso", l: "ISO" }], val: prefs.dateFmt || "mdy", onChange: (v) => set("dateFmt", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Time format" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "12", l: "12h" }, { v: "24", l: "24h" }], val: prefs.timeFmt || "12", onChange: (v) => set("timeFmt", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Language", htmlFor: "settings-language" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-language", opts: [{ v: "en", l: "English" }, { v: "fr", l: "French" }, { v: "de", l: "German" }, { v: "es", l: "Spanish" }], val: prefs.lang || "en", onChange: (v) => set("lang", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Behavior" }, /* @__PURE__ */ React.createElement(Row, { label: "Animations", desc: "Turn off for reduced motion" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.animations !== false, onChange: (v) => set("animations", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Command palette", desc: "The keyboard shortcut that opens it" }, /* @__PURE__ */ React.createElement(plenixPlatform.Kbd, null, "Ctrl K")))),
      appearance: /* @__PURE__ */ React.createElement(Screen, { id: "appearance", title: "Appearance", desc: "Theme, display density, header style, accent color and typography." }, /* @__PURE__ */ React.createElement(Section, { title: "Theme" }, /* @__PURE__ */ React.createElement(Row, { label: "Theme", htmlFor: "settings-theme", desc: "The look of every Plenix application; themes are defined in the design system" }, /* @__PURE__ */ React.createElement(ThemeChoice, { id: "settings-theme" })), /* @__PURE__ */ React.createElement(Row, { label: "Mode", desc: "System follows the light or dark setting of your device" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "system", l: "System" }, { v: "light", l: "Light" }, { v: "dark", l: "Dark" }], val: prefs.theme || "system", onChange: (v) => set("theme", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Display", description: "How much fits on a screen, the same choice on every page." }, /* @__PURE__ */ React.createElement(DensityChoice, null)), /* @__PURE__ */ React.createElement(Section, { title: "Header and accent", collapsible: true, defaultExpanded: false, description: "The header bar, the tint behind an open item and the accent color." }, /* @__PURE__ */ React.createElement(Row, { label: "Header bar style" }, /* @__PURE__ */ React.createElement(plenixPlatform.RadioTiles, { legend: "Header bar style", legendHidden: true, size: "sm", value: prefs.headerBar || "blue", onChange: (v) => set("headerBar", v), options: [
        { value: "blue", label: "Accent", preview: /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { tone: "accent" }) },
        { value: "white", label: "White", preview: /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { tone: "surface" }) },
        { value: "frost", label: "Frost", preview: /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { tone: "frost" }) }
      ] })), /* @__PURE__ */ React.createElement(Row, { label: "Page header background", htmlFor: "settings-header-tint", desc: "The soft tint behind the header of an open item (a contact, a project, a note)" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-header-tint", opts: [{ v: "none", l: "None" }, { v: "gray", l: "Gray" }, { v: "blue", l: "Blue" }, { v: "warm", l: "Warm" }, { v: "green", l: "Green" }, { v: "purple", l: "Purple" }, { v: "red", l: "Red" }], val: prefs.headerTint || "none", onChange: (v) => set("headerTint", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Page header tint", desc: "Fade runs from the tint at the top to white; Flat fills the header" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "fade", l: "Fade" }, { v: "flat", l: "Flat" }], val: prefs.headerTintStyle || "fade", onChange: (v) => set("headerTintStyle", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Accent color" }, /* @__PURE__ */ React.createElement(plenixPlatform.ColorPicker, { label: "Accent color", value: accent, onChange: (h) => set("accent", h) }))), /* @__PURE__ */ React.createElement(Section, { title: "Typography" }, /* @__PURE__ */ React.createElement(Row, { label: "Font size" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "sm", l: "Small" }, { v: "md", l: "Medium" }, { v: "lg", l: "Large" }], val: prefs.fontSize || "md", onChange: (v) => set("fontSize", v) })))),
      dashboard: /* @__PURE__ */ React.createElement(Screen, { id: "dashboard", title: "Dashboard", desc: "Widget layout, columns and what appears on the home screen." }, /* @__PURE__ */ React.createElement(Section, { title: "Layout" }, /* @__PURE__ */ React.createElement(Row, { label: "Column proportions" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "2-1-1", l: "50/25/25" }, { v: "3-1-1", l: "60/20/20" }, { v: "1-1-1", l: "Equal" }], val: prefs.dashCols || "2-1-1", onChange: (v) => set("dashCols", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Widgets" }, /* @__PURE__ */ React.createElement(Row, { label: "Show date and time strip", desc: "Compact live clock above widgets" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.showDateStrip !== false, onChange: (v) => set("showDateStrip", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Drag to rearrange", desc: "Drag handle on top of each widget card" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.draggable !== false, onChange: (v) => set("draggable", v) })))),
      projects: /* @__PURE__ */ React.createElement(Screen, { id: "projects", title: "Projects", desc: "Card layout, visible fields and filtering options." }, /* @__PURE__ */ React.createElement(Section, { title: "Layout" }, /* @__PURE__ */ React.createElement(Row, { label: "Default view" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "card", l: "Cards" }, { v: "1", l: "List" }], val: prefs.projDensity || "card", onChange: (v) => set("projDensity", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Visible fields" }, /* @__PURE__ */ React.createElement(Row, { label: "Category" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projCategory !== false, onChange: (v) => set("projCategory", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Status indicator" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projStatus !== false, onChange: (v) => set("projStatus", v) })), /* @__PURE__ */ React.createElement(Row, { label: "File count" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projFiles || false, onChange: (v) => set("projFiles", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Tags" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projTags || false, onChange: (v) => set("projTags", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Description" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projDesc || false, onChange: (v) => set("projDesc", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Filtering", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React.createElement(Row, { label: "Show archived projects" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projArchive || false, onChange: (v) => set("projArchive", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show paused projects" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.projPaused !== false, onChange: (v) => set("projPaused", v) })))),
      calendar: /* @__PURE__ */ React.createElement(Screen, { id: "calendar", title: "Calendar", desc: "Default view, week start and event display preferences." }, /* @__PURE__ */ React.createElement(Section, { title: "Display" }, /* @__PURE__ */ React.createElement(Row, { label: "Default view" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "month", l: "Month" }, { v: "week", l: "Week" }, { v: "day", l: "Day" }], val: prefs.calView || "month", onChange: (v) => set("calView", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Week starts on" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "sun", l: "Sunday" }, { v: "mon", l: "Monday" }], val: prefs.calStart || "sun", onChange: (v) => set("calStart", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show event duration" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.calDuration !== false, onChange: (v) => set("calDuration", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Filtering", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React.createElement(Row, { label: "Show declined events" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.calDeclined || false, onChange: (v) => set("calDeclined", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Widget shows today only", desc: "Off shows the next 3 days" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.calTodayOnly !== false, onChange: (v) => set("calTodayOnly", v) })))),
      tasks: /* @__PURE__ */ React.createElement(Screen, { id: "tasks", title: "Tasks", desc: "Sort order, display fields and widget quantity." }, /* @__PURE__ */ React.createElement(Section, { title: "Sorting and filtering" }, /* @__PURE__ */ React.createElement(Row, { label: "Sort by" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "due", l: "Due date" }, { v: "pri", l: "Priority" }, { v: "proj", l: "Project" }], val: prefs.taskSort || "due", onChange: (v) => set("taskSort", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show completed tasks" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.taskShowDone || false, onChange: (v) => set("taskShowDone", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Visible fields" }, /* @__PURE__ */ React.createElement(Row, { label: "Priority dot" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.taskPri !== false, onChange: (v) => set("taskPri", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Project label" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.taskProj !== false, onChange: (v) => set("taskProj", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Due date" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.taskDue !== false, onChange: (v) => set("taskDue", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Widget", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React.createElement(Row, { label: "Max tasks shown" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "5", l: "5" }, { v: "7", l: "7" }, { v: "10", l: "10" }], val: prefs.taskMax || "7", onChange: (v) => set("taskMax", v) })))),
      notes: /* @__PURE__ */ React.createElement(Screen, { id: "notes", title: "Notes", desc: "Editor preferences and default folder behavior." }, /* @__PURE__ */ React.createElement(Section, { title: "Display" }, /* @__PURE__ */ React.createElement(Row, { label: "Default sort" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "date", l: "Date" }, { v: "az", l: "A-Z" }, { v: "folder", l: "Folder" }], val: prefs.noteSort || "date", onChange: (v) => set("noteSort", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show folder label in list" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.noteFolder !== false, onChange: (v) => set("noteFolder", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show tags in list" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.noteTags !== false, onChange: (v) => set("noteTags", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Editor", collapsible: true, defaultExpanded: false, description: "Planned: these options arrive with the next editor." }, /* @__PURE__ */ React.createElement(Row, { label: "Toolbar", desc: "Format bar above the note editor" }, /* @__PURE__ */ React.createElement(Toggle, { val: false, disabled: true, onChange: () => {
      } })), /* @__PURE__ */ React.createElement(Row, { label: "Word count", desc: "Live word and character count" }, /* @__PURE__ */ React.createElement(Toggle, { val: false, disabled: true, onChange: () => {
      } })))),
      files: /* @__PURE__ */ React.createElement(Screen, { id: "files", title: "Files", desc: "Browser layout, column visibility and cloud storage." }, /* @__PURE__ */ React.createElement(Section, { title: "Display" }, /* @__PURE__ */ React.createElement(Row, { label: "Default sort" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "date", l: "Date" }, { v: "name", l: "Name" }, { v: "type", l: "Type" }], val: prefs.fileSort || "date", onChange: (v) => set("fileSort", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show AI badge" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.fileAI !== false, onChange: (v) => set("fileAI", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show file size" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.fileSize !== false, onChange: (v) => set("fileSize", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show folder column" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.fileFolder !== false, onChange: (v) => set("fileFolder", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Cloud storage", collapsible: true, defaultExpanded: false }, /* @__PURE__ */ React.createElement(Row, { label: "Storage provider", htmlFor: "settings-storage" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-storage", defaultValue: "onedrive", opts: [{ v: "onedrive", l: "OneDrive" }, { v: "gdrive", l: "Google Drive" }, { v: "dropbox", l: "Dropbox" }, { v: "icloud", l: "iCloud" }] })), /* @__PURE__ */ React.createElement(Row, { label: "Auto-organize on upload", desc: "AI suggests folder and filename" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.fileAutoOrg !== false, onChange: (v) => set("fileAutoOrg", v) })))),
      email: /* @__PURE__ */ React.createElement(Screen, { id: "email", title: "Email", desc: "Inbox display, signature and sync settings." }, /* @__PURE__ */ React.createElement(Section, { title: "Display" }, /* @__PURE__ */ React.createElement(Row, { label: "Show avatar in widget" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.emailAvatar !== false, onChange: (v) => set("emailAvatar", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show preview text" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.emailPreview !== false, onChange: (v) => set("emailPreview", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show time", desc: "Relative or absolute time on each email" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.emailTime !== false, onChange: (v) => set("emailTime", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Sync" }, /* @__PURE__ */ React.createElement(Row, { label: "Connected account", htmlFor: "settings-email-account" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-email-account", defaultValue: "outlook", opts: [{ v: "outlook", l: "Outlook" }, { v: "gmail", l: "Gmail" }] })), /* @__PURE__ */ React.createElement(Row, { label: "Sync frequency" }, /* @__PURE__ */ React.createElement(Seg, { opts: [{ v: "realtime", l: "Real-time" }, { v: "15", l: "15 min" }, { v: "30", l: "30 min" }], val: prefs.emailSync || "realtime", onChange: (v) => set("emailSync", v) })))),
      contacts: /* @__PURE__ */ React.createElement(Screen, { id: "contacts", title: "Contacts", desc: "Widget layout and field visibility." }, /* @__PURE__ */ React.createElement(Section, { title: "Widget" }, /* @__PURE__ */ React.createElement(Row, { label: "Show avatar" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactAvatar !== false, onChange: (v) => set("contactAvatar", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show message icon" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactMsg !== false, onChange: (v) => set("contactMsg", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show call icon" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactCall !== false, onChange: (v) => set("contactCall", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "List view" }, /* @__PURE__ */ React.createElement(Row, { label: "Show role" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactRole !== false, onChange: (v) => set("contactRole", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show company" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactCompany !== false, onChange: (v) => set("contactCompany", v) })), /* @__PURE__ */ React.createElement(Row, { label: "Show last message time" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.contactTime || false, onChange: (v) => set("contactTime", v) })))),
      account: /* @__PURE__ */ React.createElement(Screen, { id: "account", title: "Account", desc: "Profile, integrations and connected services." }, /* @__PURE__ */ React.createElement(Section, { title: "Profile", actions: acctDirty ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { onClick: () => setAcct(acctSaved) }, "Discard"), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "primary", onClick: () => setAcctSaved(acct) }, "Save")) : null }, /* @__PURE__ */ React.createElement(Row, { label: "Picture" }, /* @__PURE__ */ React.createElement(plenixPlatform.Inline, { gap: "sm", align: "center", wrap: true }, /* @__PURE__ */ React.createElement(plenixPlatform.Avatar, { name: account.name, src: account.src, size: "md" }), /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", icon: "settings-camera", onClick: () => plenixPlatform.choosePicture().then((p) => {
        if (p) setPicture(p);
      }) }, "Change picture"), account.src ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", onClick: () => setPicture(null) }, "Remove") : null)), /* @__PURE__ */ React.createElement(Row, { label: "Name", htmlFor: "settings-account-name" }, /* @__PURE__ */ React.createElement(plenixPlatform.Input, { id: "settings-account-name", width: "lg", value: acct.name, onChange: (e) => setAcct({ ...acct, name: e.target.value }), autoComplete: "name", autoCapitalize: "words", enterKeyHint: "next" })), /* @__PURE__ */ React.createElement(Row, { label: "Email", htmlFor: "settings-account-email" }, /* @__PURE__ */ React.createElement(plenixPlatform.Input, { id: "settings-account-email", width: "lg", type: "email", value: acct.email, onChange: (e) => setAcct({ ...acct, email: e.target.value }), autoComplete: "email", enterKeyHint: "done" }))), /* @__PURE__ */ React.createElement(Section, { title: "Integrations" }, /* @__PURE__ */ React.createElement(Row, { label: "Calendar source", htmlFor: "settings-calendar-source" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-calendar-source", defaultValue: "outlook", opts: [{ v: "outlook", l: "Outlook Calendar" }, { v: "gcal", l: "Google Calendar" }, { v: "apple", l: "Apple Calendar" }] })), /* @__PURE__ */ React.createElement(Row, { label: "Email source", htmlFor: "settings-email-source" }, /* @__PURE__ */ React.createElement(Choose, { id: "settings-email-source", defaultValue: "outlook", opts: [{ v: "outlook", l: "Outlook" }, { v: "gmail", l: "Gmail" }] }))), /* @__PURE__ */ React.createElement(Section, { title: "Notifications" }, /* @__PURE__ */ React.createElement(Row, { label: "Browser notifications" }, /* @__PURE__ */ React.createElement(Toggle, { val: prefs.notifs !== false, onChange: (v) => set("notifs", v) }))), /* @__PURE__ */ React.createElement(Section, { title: "Session" }, /* @__PURE__ */ React.createElement(Row, { label: "Sign out", desc: "Ends your session on this device" }, /* @__PURE__ */ React.createElement(plenixPlatform.Button, { variant: "danger-secondary", icon: "sign-out", onClick: () => plenixPlatform.leavePage(SIGN_OUT) }, "Sign out"))))
    };
    const isFeatures = cat === "features";
    const isDocs = cat === "docs";
    const activePanel = isFeatures ? featArea ? (() => {
      const area = window.FEATURES.find((a) => a.area === featArea);
      return area ? /* @__PURE__ */ React.createElement(FeatureArea, { area }) : null;
    })() : /* @__PURE__ */ React.createElement(Screen, { id: "features", title: "Features to build progress", desc: "Every significant feature in Plenix -- what it does, how it works, and what is planned. Select an area from the sidebar to explore it." }, /* @__PURE__ */ React.createElement(Section, { title: "Feature areas", description: plenixPlatform.dataPhrase(window.FEATURES.length + " areas") }, /* @__PURE__ */ React.createElement(plenixPlatform.ContentGrid, { size: "md", label: "Feature areas" }, window.FEATURES.map((area) => {
      const done = area.items.filter((i) => i.status === "done").length;
      const pct = Math.round(done / area.items.length * 100);
      return /* @__PURE__ */ React.createElement(plenixPlatform.Card, { key: area.area, title: area.area, meta: /* @__PURE__ */ React.createElement(plenixPlatform.Text, { variant: "data" }, done + "/" + area.items.length), onOpen: () => setFeatArea(area.area) }, /* @__PURE__ */ React.createElement(plenixPlatform.ProgressBar, { value: pct, color: area.color, size: "sm", label: area.area + " progress", labelHidden: true }));
    })))) : isDocs ? /* @__PURE__ */ React.createElement(DocsPanel, { docSection, setDocSection }) : panels[cat] || /* @__PURE__ */ React.createElement(Screen, { id: cat, title: SETTINGS_CATS.find((c) => c.id === cat)?.label || cat, desc: "Settings controls for this section are planned." }, /* @__PURE__ */ React.createElement(Section, { title: "Coming soon" }, /* @__PURE__ */ React.createElement(plenixPlatform.EmptyState, { title: "Full configuration options come in a future update." })));
    const docGroups = [
      { heading: null, items: [
        { id: "about", label: "About Plenix" },
        { id: "product-vision", label: "Product vision" },
        { id: "terminology", label: "Terminology" },
        { id: "data-model", label: "Data model" },
        { id: "capabilities", label: "Capabilities" },
        { id: "overview", label: "All feature areas" },
        { id: "style-guide", label: "Style guide" }
      ] },
      ...(window.CAP_LAYERS || []).map((layer) => {
        const groups = (window.CAPABILITY_GROUPS || []).filter((g) => g.layer === layer.id);
        const layerLabel = { universal: "Universal", client: "Client", project: "Project / Work" }[layer.id] || layer.id;
        return { heading: "Capabilities · " + layerLabel, defaultExpanded: false, items: groups.map((g) => ({
          id: "grp-" + g.id,
          label: g.group,
          children: g.items.map((c) => {
            const doc = (window.CAP_DOCS || {})[c.id];
            const stub = doc ? doc.stub : true;
            return { id: "cap-" + c.id, label: c.label, muted: stub, icon: stub ? void 0 : "circle-check" };
          })
        })) };
      }),
      { heading: "Feature areas", defaultExpanded: false, items: window.FEATURES.map((a) => ({ id: "feat-" + a.area, label: a.area, icon: /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { color: a.color, size: "sm" }) })) }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "plx-page-panes" }, /* @__PURE__ */ React.createElement(plenixPlatform.SideNavPortal, null, /* @__PURE__ */ React.createElement(plenixPlatform.NavPane, { label: "Settings", title: "Settings", footer: onBack ? /* @__PURE__ */ React.createElement(plenixPlatform.Button, { size: "sm", variant: "ghost", icon: "arrow-left", onClick: onBack }, "Back to Dashboard") : null }, /* @__PURE__ */ React.createElement(
      plenixPlatform.NavList,
      {
        label: "Settings sections",
        value: cat !== "features" && cat !== "docs" ? cat : null,
        onSelect: (id) => go(id),
        groups: [{ heading: "Settings", items: SETTINGS_CATS.map((c) => ({ id: c.id, label: c.label, icon: c.icon })) }]
      }
    ), /* @__PURE__ */ React.createElement(
      plenixPlatform.CollapsibleSection,
      {
        headingLevel: null,
        expanded: featOpen,
        onToggle: () => {
          go("features");
          setFeatOpen((o) => !o);
        },
        icon: "circle-check",
        title: "Features to build progress",
        actions: /* @__PURE__ */ React.createElement(plenixPlatform.Count, { variant: "pill", tone: "info", value: window.FEATURES.length, label: window.FEATURES.length + " feature areas" })
      },
      /* @__PURE__ */ React.createElement(
        plenixPlatform.NavList,
        {
          label: "Feature areas",
          value: cat === "features" ? featArea : null,
          onSelect: (id) => go("features", id),
          items: window.FEATURES.map((area) => ({ id: area.area, label: area.area, icon: /* @__PURE__ */ React.createElement(plenixPlatform.ColorSwatch, { color: area.color, size: "sm" }), count: area.items.filter((i) => i.status === "done").length + "/" + area.items.length }))
        }
      )
    ), /* @__PURE__ */ React.createElement(
      plenixPlatform.CollapsibleSection,
      {
        headingLevel: null,
        expanded: docOpen,
        onToggle: () => {
          go("docs", "about");
          setDocOpen((o) => !o);
        },
        icon: "doc-text",
        title: "Documentation"
      },
      /* @__PURE__ */ React.createElement(plenixPlatform.NavList, { label: "Documentation", value: cat === "docs" ? docSection : null, onSelect: (id) => go("docs", id), groups: docGroups })
    ))), /* @__PURE__ */ React.createElement(plenixPlatform.PageContent, null, activePanel));
  }
  const legacy = (hash) => /^#[a-z][a-z-]*$/.test(hash) && hash !== "#main" ? "/" + hash.slice(1) : null;
  mountSuite("settings", ({ prefs, setPrefs, screen }) => /* @__PURE__ */ React.createElement(Settings, { screen, prefs, setPrefs, onBack: () => plenixPlatform.leavePage(appPage("home")) }), { page: "settings", legacy });
})(Plenix);
