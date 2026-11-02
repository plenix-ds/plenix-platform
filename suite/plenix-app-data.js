/* ══════════════════════════════════════════════════════════
     PLENIX APP DATA — window globals (plain JS, loaded before plenix.js)
     
     All static data that components need at runtime is stored
     here as window.* so Babel script size stays minimal. Every suite application loads it, so it holds only what
     more than one page reads. What only Settings reads is in suite/settings-data.js (issue 882).
     
     Contents:
       window.CAPABILITY_GROUPS — 11 groups of project capabilities
                                  drives New Project modal checklist
                                  and ProjectNav sidebar grouping
       window.DEFAULT_CAPS      — Set of capability IDs enabled by default
       window.PROJ_TYPES        — 6 groups of project types (33 total)
                                  used by New Project modal type picker
                                  and Settings > Project Types panel
       window.ALL_PROJ_TYPES    — flat array derived from PROJ_TYPES
       window.PROJ_ICONS        — 42 SVG path strings for project nav icons
                                  consumed by ProjIco component via
                                  dangerouslySetInnerHTML to keep Babel lean
       window.CAT_FLAT          — flat category strings for MetaPanel picker
     ══════════════════════════════════════════════════════════ */

  window.CAPABILITY_GROUPS=[
    /* ── UNIVERSAL LAYER ── 48 capabilities, 9 groups */
    {id:"u-platform",group:"Platform",layer:"universal",items:[
      {id:"about",label:"About",icon:"about",layer:"universal"},
      {id:"activity",label:"Activity",icon:"activity",layer:"universal"},
      {id:"dashboard",label:"Dashboard",icon:"dashboard",layer:"universal"},
      {id:"navigation",label:"Navigation",icon:"nav",layer:"universal"},
      {id:"projects",label:"Projects",icon:"home",layer:"universal"},
      {id:"search",label:"Search & Filters",icon:"search",layer:"universal"},
      {id:"settings",label:"Settings",icon:"settings",layer:"universal"},
    ]},
    {id:"u-communication",group:"Communication",layer:"universal",items:[
      {id:"calendar",label:"Calendar",icon:"calendar",layer:"universal"},
      {id:"contacts",label:"Contacts",icon:"contact",layer:"universal"},
      {id:"email",label:"Email",icon:"msg",layer:"universal"},
      {id:"messaging",label:"Messaging",icon:"msg",layer:"universal",desc:"SMS · WhatsApp · Slack"},
    ]},
    {id:"u-productivity",group:"Productivity",layer:"universal",items:[
      {id:"forms",label:"Forms",icon:"forms",layer:"universal"},
      {id:"goals",label:"Goals",icon:"goals",layer:"universal"},
      {id:"habits",label:"Habits",icon:"habits",layer:"universal"},
      {id:"journal",label:"Journal",icon:"journal",layer:"universal"},
      {id:"notes",label:"Notes",icon:"note",layer:"universal"},
      {id:"tasks",label:"Tasks",icon:"task",layer:"universal"},
      {id:"templates",label:"Text Templates",icon:"templates",layer:"universal"},
    ]},
    {id:"u-files",group:"Files",layer:"universal",items:[
      {id:"files",label:"Files",icon:"file",layer:"universal"},
      {id:"smart_file_naming",label:"Smart File Naming",icon:"file",layer:"universal"},
    ]},
    {id:"u-media",group:"Media",layer:"universal",items:[
      {id:"audio",label:"Audio",icon:"file",layer:"universal"},
      {id:"digital_asset_management",label:"Digital Asset Management",icon:"file",layer:"universal"},
      {id:"images",label:"Images",icon:"images",layer:"universal"},
      {id:"video",label:"Video",icon:"file",layer:"universal"},
    ]},
    {id:"u-knowledge",group:"Knowledge",layer:"universal",items:[
      {id:"bookmarks",label:"Bookmarks",icon:"link",layer:"universal"},
      {id:"books",label:"Books",icon:"note",layer:"universal"},
      {id:"browser_extension_mobile_capture",label:"Browser Extension / Mobile Capture",icon:"capture",layer:"universal"},
      {id:"capture",label:"Capture",icon:"capture",layer:"universal"},
      {id:"duplicates_broken_links",label:"Duplicates & Broken Links",icon:"link",layer:"universal"},
      {id:"highlights",label:"Highlights",icon:"note",layer:"universal"},
      {id:"import_export_backup",label:"Import / Export / Backup",icon:"file",layer:"universal"},
      {id:"reader_articles",label:"Reader / Articles",icon:"note",layer:"universal"},
      {id:"sharing_collaboration",label:"Sharing / Collaboration",icon:"share",layer:"universal"},
      {id:"tags",label:"Tags",icon:"tag",layer:"universal"},
      {id:"web_archive",label:"Web Archive",icon:"link",layer:"universal"},
      {id:"wiki",label:"Wiki",icon:"wiki",layer:"universal"},
    ]},
    {id:"u-ai",group:"AI",layer:"universal",items:[
      {id:"ai_agents",label:"AI Agents",icon:"ai",layer:"universal"},
      {id:"ai_chat",label:"AI Chat",icon:"ai",layer:"universal"},
      {id:"automations",label:"Automations",icon:"automations",layer:"universal"},
      {id:"connectors",label:"Connectors",icon:"connectors",layer:"universal"},
      {id:"model_selection",label:"Model Selection",icon:"ai",layer:"universal"},
      {id:"prompt_studio",label:"Prompt Studio",icon:"ai",layer:"universal"},
      {id:"voice_input",label:"Voice Input",icon:"voice",layer:"universal"},
    ]},
    {id:"u-finance",group:"Finance",layer:"universal",items:[
      {id:"bookkeeping",label:"Bookkeeping",icon:"bookkeeping",layer:"universal"},
      {id:"expenses",label:"Expenses",icon:"expenses",layer:"universal"},
      {id:"income",label:"Income",icon:"income",layer:"universal"},
    ]},
    {id:"u-utilities",group:"Utilities",layer:"universal",items:[
      {id:"password_manager",label:"Password Manager",icon:"password",layer:"universal"},
      {id:"translation",label:"Translation & Dictionary",icon:"translation",layer:"universal"},
    ]},

    /* ── CLIENT LAYER ── 11 capabilities, 1 group */
    {id:"c-pipeline",group:"Pipeline",layer:"client",items:[
      {id:"client_portal",label:"Client Portal",icon:"portal",layer:"client"},
      {id:"contracts",label:"Contracts",icon:"contracts",layer:"client"},
      {id:"deals",label:"Deals",icon:"deals",layer:"client"},
      {id:"estimates",label:"Estimates",icon:"estimates",layer:"client"},
      {id:"invoices",label:"Invoices",icon:"invoices",layer:"client"},
      {id:"leads",label:"Leads",icon:"leads",layer:"client"},
      {id:"payments",label:"Payments",icon:"finance",layer:"client"},
      {id:"proposals",label:"Proposals",icon:"proposals",layer:"client"},
      {id:"rate_cards",label:"Rate Cards",icon:"rate_cards",layer:"client"},
      {id:"scheduling",label:"Scheduling",icon:"scheduling",layer:"client"},
      {id:"services",label:"Services",icon:"services",layer:"client"},
    ]},

    /* ── PROJECT / WORK LAYER ── 14 capabilities, 2 groups */
    {id:"p-marketing",group:"Marketing",layer:"project",items:[
      {id:"analytics",label:"Analytics",icon:"analytics",layer:"project"},
      {id:"campaigns",label:"Campaigns",icon:"campaigns",layer:"project"},
      {id:"channels",label:"Channels",icon:"channels",layer:"project"},
      {id:"content_calendar",label:"Content Calendar",icon:"content_cal",layer:"project"},
      {id:"mood_boards",label:"Mood Boards",icon:"mood",layer:"project"},
    ]},
    {id:"p-control",group:"Project Control",layer:"project",items:[
      {id:"changes",label:"Changes",icon:"changes",layer:"project"},
      {id:"issues",label:"Issues",icon:"issues",layer:"project"},
      {id:"purchase_orders",label:"Purchase Orders",icon:"purchase_orders",layer:"project"},
      {id:"resourcing",label:"Resourcing",icon:"resourcing",layer:"project"},
      {id:"risks",label:"Risks",icon:"risks",layer:"project"},
      {id:"roadmap",label:"Roadmap",icon:"roadmap",layer:"project"},
      {id:"suppliers",label:"Suppliers",icon:"suppliers",layer:"project"},
      {id:"time_tracking",label:"Time Tracking",icon:"time",layer:"project"},
      {id:"timesheets",label:"Timesheets",icon:"timesheets",layer:"project"},
    ]},
  ];

  window.DEFAULT_CAPS=new Set(["activity","calendar","roadmap","notes","bookmarks","contacts","tasks","time_tracking","files"]);

  window.PROJ_ICONS={
    "home": '<path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5zM8 18v-5h4v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "activity": '<path d="M3 10h2l2-5 3 10 2-7 1.5 2H17" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "calendar": '<rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h14M7 3v2M13 3v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "roadmap": '<rect x="3" y="5" width="8" height="2.5" rx="1.2" fill="currentColor" opacity=".75"/><rect x="7" y="9" width="7" height="2.5" rx="1.2" fill="currentColor" opacity=".75"/><rect x="4" y="13" width="6" height="2.5" rx="1.2" fill="currentColor" opacity=".75"/>',
    "about": '<circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.4"/><path d="M10 9v5M10 7v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    "forms": '<rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><rect x="4" y="2" width="12" height="3.5" rx="2" fill="currentColor" opacity=".15"/><path d="M7 8h6M7 11h6M7 14h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "wiki": '<path d="M3 5a2 2 0 012-2h5v14H5a2 2 0 01-2-2V5z" stroke="currentColor" stroke-width="1.4"/><path d="M10 3h5a2 2 0 012 2v10a2 2 0 01-2 2h-5V3z" stroke="currentColor" stroke-width="1.4"/>',
    "notes": '<rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "links": '<path d="M8.5 12.5l3-3M11 8.5l1.5-1.5a3 3 0 014.2 4.2L15 13a3 3 0 01-4.2 0M9 11.5L7.5 13a3 3 0 01-4.2-4.2L5 7a3 3 0 014 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "contacts": '<circle cx="7.5" cy="7" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M2 17c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="14" cy="7" r="2" stroke="currentColor" stroke-width="1.3"/><path d="M13 12c1-.3 2.2-.1 3 .6a4 4 0 011 2.4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "deals": '<path d="M3 10h3l2-4 4 8 2-4h3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "estimates": '<rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 8h6M7 11h4M7 14h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "proposals": '<path d="M5 3h7.5L15 5.5V17a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/><path d="M12.5 3v3h3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M9 13l1 1 2-2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "contracts": '<path d="M5 3h7.5L15 5.5V17a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4"/><path d="M12.5 3v3h3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7 10h6M7 13h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="14" cy="14" r="2" stroke="currentColor" stroke-width="1.2"/>',
    "portal": '<rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M8 10h4M10 8l2 2-2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "tasks": '<rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 10.5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
    "meetings": '<rect x="2" y="5" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M14 8.5l4-2v7l-4-2" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    "scheduling": '<circle cx="10" cy="11" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M10 8v3.5l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 3h4M10 3v1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "resourcing": '<circle cx="6" cy="7" r="2.5" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="7" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M1 17c0-2.8 2.2-5 5-5M14 12a5 5 0 015 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M9 17c0-2.2 1.3-4 3-4.8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "time": '<circle cx="10" cy="11" r="6.5" stroke="currentColor" stroke-width="1.4"/><path d="M10 8v3.5l2 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 3h4M10 3v1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "timesheets": '<rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 7h14M3 11h14M7 3v14M12 3v14" stroke="currentColor" stroke-width="1.2"/>',
    "invoices": '<path d="M4 3h12v14l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L4 17V3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 8h6M7 11h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "finance": '<rect x="2" y="5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M2 9h16" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 13h3M13 13h1.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "income": '<path d="M4 14l4-4 3 3 5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 8h3v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "expenses": '<path d="M4 6l4 4 3-3 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 14h3v-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
    "bookkeeping": '<rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 7h14M3 11h14M7 3v14" stroke="currentColor" stroke-width="1.2"/>',
    "suppliers": '<rect x="2" y="7" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M13 10h3l2 3v4h-5" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="6" cy="17" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="15" cy="17" r="1.5" stroke="currentColor" stroke-width="1.3"/>',
    "purchase_orders": '<path d="M3 3h2l2.5 9h8L17 6H6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="10" cy="17" r="1.5" stroke="currentColor" stroke-width="1.3"/><circle cx="15" cy="17" r="1.5" stroke="currentColor" stroke-width="1.3"/>',
    "services": '<path d="M14.5 5.5a5 5 0 01-7 7L4 16l1.5 1.5 3.5-3.5a5 5 0 017-7z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12 4l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
    "rate_cards": '<path d="M4 10L10 4l6 6-4 7H8L4 10z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="12.5" cy="7.5" r="1.2" fill="currentColor"/>',
    "files": '<path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V8.5L11.5 3H5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M11.5 3v5.5H17" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>',
    "images": '<rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><circle cx="7.5" cy="7.5" r="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M3 13.5l4-4 3 3 2-2 5 5" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"/>',
    "mood": '<path d="M4 15l4-4 3 3 5-7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6" cy="6" r="2.5" stroke="currentColor" stroke-width="1.3"/><circle cx="14" cy="5" r="1.5" stroke="currentColor" stroke-width="1.3"/>',
    "docs": '<path d="M5 3h7.5L15 5.5V17a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M12.5 3v3h3" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M7 11h6M7 14h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "issues": '<circle cx="10" cy="11" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M8 5l-1.5-2M12 5l1.5-2M7 7L5 5.5M13 7l2-1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M10 9v3M10 13.5v.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>',
    "risks": '<path d="M10 3.5L17.5 16H2.5L10 3.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M10 9.5v3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="10" cy="14" r=".8" fill="currentColor"/>',
    "changes": '<path d="M4 10a6 6 0 016-6 6 6 0 014.5 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M16 10a6 6 0 01-6 6 6 6 0 01-4.5-2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M14.5 6L16 4l1.5 2M5.5 14L4 16l-1.5-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>',
    "campaigns": '<path d="M4 12V8l9-5v14L4 12z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M4 8.5H2a1 1 0 00-1 1v1a1 1 0 001 1h2M4 13v3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>',
    "content_cal": '<rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M3 8h14M7 3v2M13 3v2M7 12h3M7 15h2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M13 11l1.5 1.5L17 10" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>',
    "leads": '<path d="M5 3h10l-3 5h3l-8 9 2-6H5L5 3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>',
    "channels": '<path d="M10 16V10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M6 13a6 6 0 008 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M3 10a9 9 0 0014 0" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="10" cy="17.5" r="1" fill="currentColor"/>',
    "analytics": '<path d="M3 15h14" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><rect x="4" y="10" width="2.5" height="5" rx="1" fill="currentColor" opacity=".8"/><rect x="8.75" y="7" width="2.5" height="8" rx="1" fill="currentColor" opacity=".8"/><rect x="13.5" y="4" width="2.5" height="11" rx="1" fill="currentColor" opacity=".8"/>'
  };
  window.PROJ_TYPES=[
    {group:"Creative & Production",types:["Branding","Photography","Video / Film","Design","Writing / Editorial","Music / Audio"]},
    {group:"Business & Operations",types:["Client Project","Sales","Product Launch","Events","Operations","Finance","Legal","HR / Recruitment","Training"]},
    {group:"Technical",types:["Development / Engineering","IT / Infrastructure","Data / Analytics","IT Project","Cybersecurity","Cloud / DevOps"]},
    {group:"Personal",types:["Personal","Health / Wellness","Learning / Education","Home / Renovation","Academic"]},
    {group:"Research & Strategy",types:["Research","Marketing","Competitive Analysis","Strategy"]},
    {group:"Other",types:["Internal / Admin","Non-profit / Community","Travel"]},
  ];
  window.ALL_PROJ_TYPES=window.PROJ_TYPES.flatMap(function(g){return g.types.map(function(t){return {name:t,group:g.group};});});
  window.CAT_FLAT=["Personal","Personal > Health","Personal > Finance","Personal > Family","Client Work","Client Work > Design","Client Work > Development","Client Work > Strategy","Research","Research > Market Research","Research > Competitive Analysis","Travel","Finance","Archive"];
  window.TAG_GROUPS={
    "Business":["strategy","Q2","VIP","supplier","meeting","approved","draft","needs-review","follow-up"],
    "Creative":["branding","typography","inspiration","design","photography","video","audio"],
    "Nature":["mountain","snow","lake","nature","aerial","landscape","wildlife"],
    "Visual":["portrait","urban","architecture","interior","product","black-and-white","abstract"],
  };
