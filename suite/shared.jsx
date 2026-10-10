/* Plenix suite · shared (suite/shared.jsx). Split out of app/plenix.jsx in batch 113; edit here. */
import { Avatar, StatusDot } from 'plenix-platform';
const {useState,useRef,useEffect,useCallback}=React;


/* ─── Icons ─────────────────────────────────────────────────────── */
export const P={
  home:"M3 12L12 4l9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9",
  proj:"M2 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V6z",
  msg:"M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z",
  contact:"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
  cal:"M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z",
  task:"M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  note:"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M8 13h8M8 17h5",
  bkmk:"M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z",
  file:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z",
  srch:"M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z",
  cap:"M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2v11zM12 17a4 4 0 100-8 4 4 0 000 8z",
  set:"M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  bell:"M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  chk:"M20 6L9 17l-5-5",
  x:"M18 6L6 18M6 6l12 12",
  plus:"M12 5v14M5 12h14",
  send:"M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  up:"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
  link:"M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71",
  mail:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  star:"M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z",
  tag:"M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
  folder:"M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z",
  back:"M19 12H5M12 5l-7 7 7 7",
};
/* the icon takes its container's --plx-comp-icon-size (a button's, a navigation row's), or the system icon size */
export const Ico=({n,color="currentColor",sw=1.65})=>(
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"    className="plx-u-shrink-0 plx-u-icon-box">
    <path d={P[n]} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Solid filled icons for nav — each is a proper filled shape */
export const SOLID={
  home:    <path fillRule="evenodd" clipRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"/>,
  proj:    <path fillRule="evenodd" clipRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v1H2V6zm0 4h16v6a2 2 0 01-2 2H4a2 2 0 01-2-2v-6z"/>,
  msg:     <path fillRule="evenodd" clipRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H6l-4 4V5z"/>,
  contact: <path fillRule="evenodd" clipRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3zm15.138-2.738A4 4 0 0120 9a4 4 0 01-2.862 3.842 6.002 6.002 0 011.994 2.887.75.75 0 01-1.44.422A4.502 4.502 0 0014 13h-.5A4.5 4.5 0 009 17.5a.75.75 0 01-1.5 0A6 6 0 016 13H5a.75.75 0 010-1.5h10a.75.75 0 010 1.5h-1a6.002 6.002 0 011.138 2.762z"/>,
  cal:     <path fillRule="evenodd" clipRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm0 6a1 1 0 000 2h10a1 1 0 100-2H5z"/>,
  task:    <path fillRule="evenodd" clipRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm9.293 3.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L8 10.586l3.293-3.293a1 1 0 011.414 0z"/>,
  note:    <path fillRule="evenodd" clipRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H7z"/>,
  bkmk:    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/>,
  file:    <path d="M2 6a2 2 0 012-2h5l2 3h7a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>,
  srch:    <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>,
  set:     <path fillRule="evenodd" clipRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>,
};
export const SolidIco=({n,size=20,color="currentColor"})=>(
  <svg width={size} height={size} viewBox="0 0 20 20" fill={color} className="plx-u-shrink-0">
    {SOLID[n]||<path d={P[n]} stroke={color} strokeWidth={1.5} fill="none"/>}
  </svg>
);

/* ─── Data ──────────────────────────────────────────────────────── */
export const PROJECTS=[
  {id:1,name:"Kitchen Renovation",      status:"active",   color:"brown",tags:["personal","home"],  files:14,desc:"Full kitchen remodel — cabinets, counters, plumbing. Target Q3 2026."},
  {id:2,name:"Apex Co — Brand Refresh", status:"active",   color:"blue",tags:["client","design"],  files:31,desc:"Visual identity refresh: logo, color system, digital templates."},
  {id:3,name:"AI Writing Tools",        status:"paused",   color:"purple",tags:["research","ai"],    files:8, desc:"Evaluating AI writing assistants for team adoption."},
  {id:4,name:"Spain — June 2026",       status:"active",   color:"green",tags:["personal","travel"],files:9, desc:"Two weeks in Madrid and Seville. Flights booked."},
  {id:5,name:"Tax & Finances 2026",     status:"active",   color:"red",tags:["personal","finance"],files:22,desc:"Annual tax prep, estimated payments, expense tracking."},
  {id:6,name:"Home Purchase 2024",      status:"completed",color:"gray",tags:["archive","legal"],  files:67,desc:"Archive — all docs from 412 Birchwood Dr closing."},
];
export const EMAILS=[
  {id:1,from:"Maya Chen",      subj:"Round 3 concepts — confirm Thursday?",prev:"Hey! Just want to confirm we're presenting the logo directions this Thursday…",time:"10:24 AM",unread:true, av:"M",avColor:"blue",proj:"Apex Co"},
  {id:2,from:"ABC Plumbing",   subj:"Kitchen quote follow-up",             prev:"Hi, this is Jeff from ABC Plumbing. Following up on our estimate…",          time:"9:41 AM", unread:true, av:"A",avColor:"brown",proj:"Kitchen Reno"},
  {id:3,from:"Luis Herrera",   subj:"Q1 tax docs ready for review",        prev:"Your estimated Q1 tax documents are attached. Please review section 3…",      time:"Yesterday",unread:false,av:"L",avColor:"purple",proj:"Tax"},
  {id:4,from:"James Whitfield",subj:"RE: SOW — one small change",          prev:"Looks mostly good. I'd like to adjust the payment milestone on page 3…",      time:"Yesterday",unread:false,av:"J",avColor:"blue",proj:"Apex Co"},
  {id:5,from:"Booking.com",    subj:"Your Madrid reservation is confirmed",prev:"Thank you for booking! Your reservation at Hotel Only YOU Atocha is confirmed.",time:"Mar 3",  unread:false,av:"B",avColor:"green",proj:"Spain"},
];
export const EVENTS=[
  {id:1,time:"9:00 AM", title:"Standup — Apex team",    sub:"30 min", color:"blue"},
  {id:2,time:"2:00 PM", title:"Contractor call (ABC)",  sub:"1 hour", color:"brown"},
  {id:3,time:"4:30 PM", title:"Budget review — kitchen",sub:"30 min", color:"brown"},
];
export const CALENDARS=[
  {id:"work",   label:"Work",          color:"blue", on:true},
  {id:"home",   label:"Personal",      color:"green", on:true},
  {id:"apex",   label:"Apex Co",       color:"brown", on:true},
  {id:"travel", label:"Travel",        color:"purple", on:true},
  {id:"tax",    label:"Finance & Tax", color:"red", on:true},
];
/* Tag each event to a calendar */
export const CAL_EVENTS=[
  {id:1,date:5, title:"Standup — Apex",       time:"9:00 AM", color:"blue",cal:"work"},
  {id:2,date:5, title:"Contractor call",       time:"2:00 PM", color:"brown",cal:"apex"},
  {id:3,date:8, title:"Logo review — Round 3", time:"10:00 AM",color:"blue",cal:"work"},
  {id:4,date:10,title:"Plumbing quote (2nd)",  time:"11:00 AM",color:"brown",cal:"home"},
  {id:5,date:15,title:"Q1 tax payment due",    time:"All day", color:"red",cal:"tax"},
  {id:6,date:18,title:"Brand presentation",    time:"3:00 PM", color:"blue",cal:"apex"},
  {id:7,date:28,title:"Spain trip — depart",   time:"All day", color:"green",cal:"travel"},
];
export const CONTACTS=[
  {id:1,name:"Maya Chen",       role:"Creative Director",co:"Apex Co",     av:"M",avColor:"blue",last:"10:24 AM",msg:"Sounds great — I'll have concepts by Friday."},
  {id:2,name:"Jeff Torres",     role:"Plumber",          co:"ABC Plumbing",av:"J",avColor:"brown",last:"9:41 AM", msg:"We can do Thursday the 12th at 2pm."},
  {id:3,name:"Luis Herrera",    role:"CPA",              co:"Herrera Tax", av:"L",avColor:"purple",last:"Yesterday",msg:"Your Q1 tax docs are attached."},
  {id:4,name:"James Whitfield", role:"CEO",              co:"Apex Co",     av:"J",avColor:"blue",last:"Yesterday",msg:"RE: SOW — looks good, one small change."},
  {id:5,name:"Sarah Morgan",    role:"Friend",           co:"",            av:"S",avColor:"green",last:"Mar 3",    msg:"Did you decide on the cabinet color?"},
];
export const THREADS=[
  {id:1,name:"Maya Chen",       av:"M",avColor:"blue",ch:"WhatsApp",preview:"Sounds great — I'll have concepts by Friday.",time:"10:24 AM",unread:2},
  {id:2,name:"ABC Plumbing",    av:"A",avColor:"brown",ch:"SMS",      preview:"We can do Thursday the 12th at 2pm.",    time:"9:41 AM", unread:1},
  {id:3,name:"James Whitfield", av:"J",avColor:"blue",ch:"Email",    preview:"RE: SOW — looks good, one small change.", time:"Yesterday",unread:0},
  {id:4,name:"Garret Builders", av:"G",avColor:"gray",ch:"SMS",      preview:"Demo day confirmed. See you at 10am.",   time:"Yesterday",unread:0},
];
export const MSGS={
  1:[{from:"Maya",text:"Hey! Confirming — presenting round 3 on Thursday the 8th?",time:"9:55 AM",mine:false},{from:"me",text:"Yes, confirmed. I'll have the Figma file shared by Wednesday evening.",time:"10:01 AM",mine:true},{from:"Maya",text:"Perfect. And you're adding the dark mode variants too?",time:"10:18 AM",mine:false},{from:"me",text:"Absolutely — 3 full directions, light and dark each.",time:"10:21 AM",mine:true},{from:"Maya",text:"Sounds great — I'll have the revised concepts by Friday.",time:"10:24 AM",mine:false}],
  2:[{from:"ABC",text:"Hi, this is Jeff from ABC Plumbing. Following up on the kitchen quote.",time:"9:10 AM",mine:false},{from:"me",text:"Hi Jeff — yes, we'd love a second look. Available this week?",time:"9:25 AM",mine:true},{from:"ABC",text:"We can do Thursday the 12th at 2pm if that works.",time:"9:41 AM",mine:false}],
};
export const ALL_TASKS=[
  {id:1,title:"Get second plumbing quote",     done:false,due:"Mar 10",proj:"Kitchen Reno",pri:"high"},
  {id:2,title:"Order cabinet samples",          done:true, due:"Mar 1", proj:"Kitchen Reno",pri:"med"},
  {id:3,title:"Confirm countertop material",    done:false,due:"Mar 15",proj:"Kitchen Reno",pri:"med"},
  {id:4,title:"Deliver logo concepts round 3",  done:false,due:"Mar 8", proj:"Apex Co",     pri:"high"},
  {id:5,title:"Send revised SOW for approval",  done:true, due:"Feb 28",proj:"Apex Co",     pri:"high"},
  {id:6,title:"Set up brand asset folder",      done:false,due:"Mar 12",proj:"Apex Co",     pri:"med"},
  {id:7,title:"Book Madrid hotel — Chueca",     done:false,due:"Mar 20",proj:"Spain Trip",  pri:"med"},
  {id:8,title:"File Q1 estimated tax payment",  done:false,due:"Mar 15",proj:"Tax",         pri:"high"},
  {id:9,title:"Upload expense receipts Jan–Feb",done:false,due:"Mar 10",proj:"Tax",         pri:"med"},
];
export const ALL_NOTES=[
  {id:1,folder:"Kitchen Reno",title:"Contractor comparison",   preview:"ABC Plumbing came in $2,400 under Garret but has mixed Yelp reviews…",date:"Mar 2", tags:["contractors","cost"]},
  {id:2,folder:"Kitchen Reno",title:"Cabinet style decisions", preview:"Leaning Shaker in off-white. Confirm door pull finish with Sarah.",      date:"Feb 22",tags:["design","decisions"]},
  {id:3,folder:"Apex Co",     title:"Kickoff meeting recap",   preview:"Client wants to retain the wordmark but fully refresh the color system.",date:"Feb 20",tags:["client","milestone"]},
  {id:4,folder:"Apex Co",     title:"Typography shortlist",    preview:"Top candidates: Canela, Söhne Breit, GT Planar. Present 3 directions.", date:"Mar 1", tags:["type","design"]},
  {id:5,folder:"Spain Trip",  title:"Hotel shortlist — Madrid",preview:"Barrio de Chueca is the area. Budget €150/night max. 3 options.",       date:"Feb 28",tags:["travel","hotels"]},
  {id:6,folder:"Research",    title:"AI tools comparison",     preview:"Compared Jasper, Copy.ai, and Claude for long-form writing. Claude wins.",date:"Mar 3", tags:["ai","tools"]},
];
export const ALL_BOOKMARKS=[
  {id:1,col:"Kitchen Inspo",  title:"Shaker Cabinet Guide — Houzz",   url:"houzz.com",             date:"Feb 18",tags:["cabinets"],  thumb:"🏠"},
  {id:2,col:"Kitchen Inspo",  title:"Quartz vs Granite 2026",         url:"thespruce.com",         date:"Feb 10",tags:["countertops"],thumb:"🪨"},
  {id:3,col:"Brand Research", title:"2026 Brand Design Trends",        url:"underconsideration.com",date:"Feb 22",tags:["branding"],  thumb:"🎨"},
  {id:4,col:"Brand Research", title:"Apex Competitor — Studio Maake", url:"studiomaake.com",       date:"Feb 12",tags:["competitor"],thumb:"🔍"},
  {id:5,col:"Spain Trip",     title:"Seville Top 20 Restaurants",     url:"eater.com",             date:"Feb 28",tags:["food"],      thumb:"🍽️"},
  {id:6,col:"Spain Trip",     title:"Renfe Madrid–Seville Tickets",   url:"renfe.com",             date:"Mar 1", tags:["transport"], thumb:"🚄"},
  {id:7,col:"AI Tools",       title:"Claude API Documentation",       url:"docs.anthropic.com",    date:"Mar 3", tags:["claude"],   thumb:"🤖"},
];
export const ALL_FILES=[
  {name:"2026-02-28_KitchenReno_Quote_ABCPlumbing.pdf",  t:"PDF", s:"1.2 MB",folder:"Kitchen Reno",d:"Feb 28",ai:true},
  {name:"2026-02-15_KitchenReno_Inspo_IslandLayouts.png",t:"IMG", s:"4.1 MB",folder:"Kitchen Reno",d:"Feb 15",ai:true},
  {name:"2026-02-20_ApexCo_BrandBrief_V2.pdf",           t:"PDF", s:"3.4 MB",folder:"Apex Co",     d:"Feb 20",ai:true},
  {name:"2026-03-01_ApexCo_LogoConcepts_R3.fig",         t:"FIG", s:"12 MB", folder:"Apex Co",     d:"Mar 1", ai:false},
  {name:"IMG_4891.png",                                   t:"IMG", s:"2.1 MB",folder:"Uncategorized",d:"Mar 3", ai:false},
  {name:"document(3).pdf",                               t:"PDF", s:"1.1 MB",folder:"Uncategorized",d:"Mar 4", ai:false},
  {name:"2026-01-05_TaxDocs_W2_Employer.pdf",             t:"PDF", s:"224 KB",folder:"Tax 2026",   d:"Jan 5",  ai:true},
];
export const CAPTURES=[
  {label:"Contractor quote screenshot",fileName:"IMG_4891.png",             type:"PNG",emoji:"📸",context:"Screenshot of ABC Plumbing estimate. Kitchen sink relocation. Labor $1,200, materials $640, permit $180. Total $2,020. March 4 2026. Project: Kitchen Renovation."},
  {label:"Client contract PDF",        fileName:"document(3).pdf",          type:"PDF",emoji:"📄",context:"Contract from Apex Design Co. Scope: brand identity refresh — logo, color system, typography. 50/50 payment split. March 4 2026."},
  {label:"Flight search screenshot",  fileName:"Screen Shot 2026-03-03.png",type:"PNG",emoji:"✈️",context:"Google Flights results for Madrid round trip June 14–21 from JFK. Prices $640–$910. Iberia and Delta. Project: Spain Trip."},
  {label:"Budget spreadsheet",        fileName:"Untitled spreadsheet.xlsx", type:"XLSX",emoji:"📊",context:"Budget tracker for Apex Co brand refresh. Categories: design fees, ad spend, printing. Total budget $18,400. Q2 2026."},
];

/* ─── API ───────────────────────────────────────────────────────── */
export async function callClaude(sys,usr){
  const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:sys,messages:[{role:"user",content:usr}]})});
  const d=await r.json();return d.content?.[0]?.text||"";
}
export async function aiFileName(ctx){
  const sys=`You are Plenix's file naming engine. Return ONLY valid JSON, no markdown:
{"filename":"YYYY-MM-DD_Project_Type_Description.ext","parts":{"date":"YYYY-MM-DD","project":"...","type":"...","description":"...","ext":".pdf"},"tags":["tag1","tag2","tag3"],"summary":"One sentence about the file."}`;
  const raw=await callClaude(sys,ctx);
  try{return JSON.parse(raw.replace(/```json|```/g,""));}catch{return null;}
}
export async function aiSearch(q){
  const sys=`You are Plenix's search engine. Projects: Kitchen Renovation, Apex Co Brand Refresh, AI Writing Tools, Spain Trip June 2026, Tax & Finances 2026.
Return ONLY valid JSON: {"answer":"2-3 sentence summary","results":[{"id":1,"name":"...","module":"Files|Notes|Bookmarks|Tasks|Contacts","project":"...","preview":"1-2 sentences","date":"human date","tags":["..."],"icon":"emoji"}]}
3-5 realistic results.`;
  const raw=await callClaude(sys,`Query: "${q}"`);
  try{return JSON.parse(raw.replace(/```json|```/g,""));}catch{return null;}
}

/* a card surface (the legacy .card rule, on tokens): spread into a style, before the element's own properties */
export const CARD={backgroundColor:"var(--plx-sys-surface-raised)",borderRadius:"var(--plx-sys-radius-card-6px)",boxShadow:"var(--plx-sys-shadow-card)",overflowX:"hidden",overflowY:"hidden"};

/* ─── Shared atoms ──────────────────────────────────────────────── */
/* avatars: the Platform Avatar (rounded squares; corner and text size follow the size). Sizes snap to the scale. */
export const AV_SIZES=[24,28,32,40,48,64];
export const Av=({name,av,avColor,size=28})=>{const s=AV_SIZES.reduce((a,b)=>Math.abs(b-size)<Math.abs(a-size)?b:a);return <Avatar name={name} initials={av} size={s} color={avColor}/>;};
export const PRI_TONE={high:"danger",med:"warning",low:"success"}, PRI_LABEL={high:"High priority",med:"Medium priority",low:"Low priority"};
export const PriDot=({pri})=><StatusDot tone={PRI_TONE[pri]||"neutral"} label={PRI_LABEL[pri]}/>;
export const STATUS_TONE={active:"success",paused:"warning",completed:"neutral"};
export const ProjStatusDot=({s})=><StatusDot tone={STATUS_TONE[s]||"neutral"} label={s}/>;
