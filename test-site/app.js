/*
 * GENERATED FILE — DO NOT EDIT
 * Source: test-site/main.jsx and the modules it imports
 * Build: node build-app.js
 */
(function () {
  var defs = {
  "test-site/pages.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PAGES = void 0;
/* St. John the Beloved test site: every page of the site, in navigation order (test-site/pages.js). main.jsx draws the
   screen each one names; the tests (tests/site.js) read this list and open every route. path: the address in the hash
   (#/members); a :id part opens with open. nav: false keeps it out of the navigation pane; chrome: false draws it without the
   site header and navigation (sign-in, the public page). Keep it plain JSON after the = sign: Node reads it as JSON. */
const PAGES = exports.PAGES = [{
  "id": "home",
  "group": "Parish",
  "path": "/",
  "title": "Dashboard",
  "screen": "dashboard",
  "icon": "home"
}, {
  "id": "members",
  "group": "People",
  "path": "/members",
  "title": "Members",
  "screen": "members",
  "icon": "settings-users"
}, {
  "id": "member",
  "group": "People",
  "path": "/member/:id",
  "open": "/member/m1",
  "title": "Member",
  "screen": "member",
  "nav": false
}, {
  "id": "member-new",
  "group": "People",
  "path": "/members/new",
  "title": "New member",
  "screen": "member-new",
  "nav": false
}, {
  "id": "member-edit",
  "group": "People",
  "path": "/member/:id/edit",
  "open": "/member/m1/edit",
  "title": "Edit member",
  "screen": "member-edit",
  "nav": false
}, {
  "id": "families",
  "group": "People",
  "path": "/families",
  "title": "Families and households",
  "screen": "families",
  "icon": "home"
}, {
  "id": "family",
  "group": "People",
  "path": "/family/:id",
  "open": "/family/f1",
  "title": "Household",
  "screen": "family",
  "nav": false
}, {
  "id": "directory",
  "group": "People",
  "path": "/directory",
  "title": "Directory",
  "screen": "directory",
  "icon": "person"
}, {
  "id": "ministries",
  "group": "Serving",
  "path": "/ministries",
  "title": "Ministries and services",
  "screen": "ministries",
  "icon": "briefcase"
}, {
  "id": "ministry",
  "group": "Serving",
  "path": "/ministry/:id",
  "open": "/ministry/sunday-school",
  "title": "Ministry",
  "screen": "ministry",
  "nav": false
}, {
  "id": "servants",
  "group": "Serving",
  "path": "/servants",
  "title": "Servants and sign-ups",
  "screen": "servants",
  "icon": "checklist"
}, {
  "id": "calendar",
  "group": "Worship",
  "path": "/calendar",
  "title": "Calendar",
  "screen": "calendar",
  "icon": "calendar"
}, {
  "id": "event",
  "group": "Worship",
  "path": "/event/:id",
  "open": "/event/e10",
  "title": "Event",
  "screen": "event",
  "nav": false
}, {
  "id": "planning",
  "group": "Worship",
  "path": "/planning",
  "title": "Feast planning",
  "screen": "planning",
  "icon": "schedule"
}, {
  "id": "readings",
  "group": "Worship",
  "path": "/readings",
  "title": "Readings and hymns",
  "screen": "readings",
  "icon": "document"
}, {
  "id": "giving",
  "group": "Giving",
  "path": "/giving",
  "title": "Donations and pledges",
  "screen": "giving",
  "icon": "chart"
}, {
  "id": "gifts",
  "group": "Giving",
  "path": "/gifts",
  "title": "Giving history",
  "screen": "gifts",
  "icon": "list-lines"
}, {
  "id": "give",
  "group": "Giving",
  "path": "/give",
  "title": "Give online",
  "screen": "give",
  "icon": "field-currency"
}, {
  "id": "bookstore",
  "group": "Giving",
  "path": "/bookstore",
  "title": "Bookstore",
  "screen": "bookstore",
  "icon": "bookmark"
}, {
  "id": "announcements",
  "group": "Communication",
  "path": "/announcements",
  "title": "Announcements",
  "screen": "announcements",
  "icon": "hdr-bell"
}, {
  "id": "announcement-edit",
  "group": "Communication",
  "path": "/announcement/:id",
  "open": "/announcement/a1",
  "title": "Edit announcement",
  "screen": "announcement-edit",
  "nav": false
}, {
  "id": "messages",
  "group": "Communication",
  "path": "/messages",
  "title": "Messages",
  "screen": "messages",
  "icon": "message"
}, {
  "id": "assistant",
  "group": "Communication",
  "path": "/assistant",
  "title": "Parish assistant",
  "screen": "assistant",
  "icon": "sparkle"
}, {
  "id": "documents",
  "group": "Library",
  "path": "/documents",
  "title": "Documents",
  "screen": "documents",
  "icon": "folder"
}, {
  "id": "document",
  "group": "Library",
  "path": "/document/:id",
  "open": "/document/d1",
  "title": "Document",
  "screen": "document",
  "nav": false
}, {
  "id": "media",
  "group": "Library",
  "path": "/media",
  "title": "Sermons and media",
  "screen": "media",
  "icon": "headphones"
}, {
  "id": "photo",
  "group": "Library",
  "path": "/photo/:id",
  "open": "/photo/v5",
  "title": "Photo",
  "screen": "photo",
  "nav": false
}, {
  "id": "reports",
  "group": "Library",
  "path": "/reports",
  "title": "Reports",
  "screen": "reports",
  "icon": "chart"
}, {
  "id": "search",
  "group": "Library",
  "path": "/search",
  "open": "/search?q=girgis",
  "title": "Search",
  "screen": "search",
  "nav": false
}, {
  "id": "settings",
  "group": "Administration",
  "path": "/settings/:id",
  "open": "/settings/general",
  "title": "Settings",
  "screen": "settings",
  "icon": "gear",
  "navOpen": "/settings/general"
}, {
  "id": "account",
  "group": "Administration",
  "path": "/account",
  "title": "My account",
  "screen": "account",
  "icon": "settings-profile"
}, {
  "id": "welcome",
  "group": "Administration",
  "path": "/welcome",
  "title": "Welcome",
  "screen": "welcome",
  "icon": "star"
}, {
  "id": "sign-in",
  "group": "Public",
  "path": "/sign-in",
  "title": "Sign in",
  "screen": "sign-in",
  "nav": false,
  "chrome": false
}, {
  "id": "visit",
  "group": "Public",
  "path": "/visit",
  "title": "Visit us",
  "screen": "visit",
  "nav": false,
  "chrome": false
}, {
  "id": "not-found",
  "group": "Public",
  "path": "/missing",
  "title": "Page not found",
  "screen": "not-found",
  "nav": false
}];
  } },
  "test-site/data.js": { deps: {}, externals: {  }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.membersOf = exports.memberById = exports.familyById = exports.SERVING_SLOTS = exports.SERVICES = exports.PLEDGES = exports.MINISTRIES = exports.MEMBER_STATUS = exports.MEMBERS = exports.MEDIA = exports.ME = exports.GIVING_BY_MONTH = exports.GIFTS = exports.FUNDS = exports.FEASTS = exports.FAMILIES = exports.EVENTS = exports.DOCUMENTS = exports.CLERGY = exports.CHURCH = exports.BOOKSTORE = exports.ANNOUNCEMENTS = void 0;
/* St. John the Beloved Coptic Orthodox Church · the test site's data (test-site/data.js). Every person, family, gift and
   address here is made up. The lists are drawn from a fixed seed, so every load (and every test run) shows the same data.
   No sacrament records are kept anywhere in the site (owner, 2026-10-25); people who serve are "servants". */

// a small fixed random sequence (mulberry32): the same numbers on every load
function seq(seed) {
  let a = seed >>> 0;
  return () => {
    a = a + 0x6D2B79F5 >>> 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rnd = seq(1904);
const pick = list => list[Math.floor(rnd() * list.length)];
const int = (lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const pad = (n, w = 2) => String(n).padStart(w, '0');
const iso = (y, m, d) => y + '-' + pad(m) + '-' + pad(d);
const CHURCH = exports.CHURCH = {
  name: 'St. John the Beloved Coptic Orthodox Church',
  short: 'St. John the Beloved',
  address: {
    line1: '1200 Cedar Grove Road',
    city: 'Maple Hollow',
    region: 'NJ',
    postal: '07999',
    country: 'US'
  },
  phone: '(555) 010-0144',
  email: 'office@stjohn-beloved.example',
  founded: 1994,
  timeZone: 'America/New_York'
};
const CLERGY = exports.CLERGY = [{
  id: 'c1',
  name: 'Fr. Daniel Boulos',
  role: 'Parish priest'
}, {
  id: 'c2',
  name: 'Fr. Antony Wahba',
  role: 'Associate priest'
}];
const MALE = ['Mina', 'Kirollos', 'Bishoy', 'Abanoub', 'Youssef', 'Mark', 'Peter', 'George', 'Michael', 'Andrew', 'Philopater', 'Shenouda', 'Samuel', 'Daniel', 'Antony', 'Fady', 'Hany', 'Rafik', 'Sherif', 'Ramy', 'Joseph', 'David', 'John', 'Thomas'];
const FEMALE = ['Marina', 'Mariam', 'Demiana', 'Verena', 'Irini', 'Mary', 'Christina', 'Sarah', 'Nevine', 'Monica', 'Martha', 'Rebecca', 'Sophia', 'Hanna', 'Nardine', 'Mira', 'Catherine', 'Helen', 'Elizabeth', 'Esther', 'Ruth', 'Rita'];
const FAMILY = ['Girgis', 'Habib', 'Mikhail', 'Fahmy', 'Hanna', 'Ibrahim', 'Boutros', 'Tadros', 'Wassef', 'Iskander', 'Naguib', 'Saad', 'Aziz', 'Gerges', 'Mansour', 'Youssef', 'Bishara', 'Khalil', 'Samaan', 'Rizk', 'Attia', 'Farag', 'Ghali', 'Labib', 'Morcos', 'Nashed', 'Raouf', 'Selim', 'Wahba', 'Zaki'];
const STREETS = ['Cedar Grove Road', 'Willow Lane', 'Orchard Street', 'Birch Court', 'Lakeview Drive', 'Mill Pond Road', 'Hillcrest Avenue', 'Elm Terrace', 'Chestnut Way', 'Juniper Place'];
const TOWNS = [['Maple Hollow', '07999'], ['Brookfield Park', '07998'], ['Riverbend', '07997'], ['Oak Ridge Falls', '07996']];
const MINISTRIES = exports.MINISTRIES = [{
  id: 'sunday-school',
  name: 'Sunday School',
  icon: 'text-card',
  lead: 'Marina Girgis',
  meets: 'Sundays · 11:30 AM',
  group: 'Education',
  members: 64,
  servants: 18
}, {
  id: 'youth',
  name: 'Youth Meeting',
  icon: 'settings-users',
  lead: 'Mina Habib',
  meets: 'Fridays · 7:00 PM',
  group: 'Education',
  members: 52,
  servants: 7
}, {
  id: 'deacons',
  name: 'Deacons’ School',
  icon: 'audio',
  lead: 'Kirollos Tadros',
  meets: 'Saturdays · 4:00 PM',
  group: 'Worship',
  members: 31,
  servants: 4
}, {
  id: 'choir',
  name: 'Hymns and Choir',
  icon: 'mic',
  lead: 'Demiana Wassef',
  meets: 'Thursdays · 7:30 PM',
  group: 'Worship',
  members: 26,
  servants: 3
}, {
  id: 'bible-study',
  name: 'Bible Study',
  icon: 'document',
  lead: 'Fr. Antony Wahba',
  meets: 'Wednesdays · 7:00 PM',
  group: 'Education',
  members: 40,
  servants: 2
}, {
  id: 'agape',
  name: 'Agape Kitchen',
  icon: 'clock',
  lead: 'Nevine Mikhail',
  meets: 'After the Divine Liturgy',
  group: 'Fellowship',
  members: 22,
  servants: 22
}, {
  id: 'visitation',
  name: 'Visitation',
  icon: 'home',
  lead: 'Hany Fahmy',
  meets: 'By appointment',
  group: 'Care',
  members: 14,
  servants: 14
}, {
  id: 'food-pantry',
  name: 'Food Pantry',
  icon: 'briefcase',
  lead: 'Sarah Ibrahim',
  meets: 'Saturdays · 9:00 AM',
  group: 'Outreach',
  members: 30,
  servants: 30
}, {
  id: 'media',
  name: 'Media and Sound',
  icon: 'settings-camera',
  lead: 'Fady Iskander',
  meets: 'Every service',
  group: 'Worship',
  members: 9,
  servants: 9
}, {
  id: 'ushers',
  name: 'Ushers',
  icon: 'person',
  lead: 'George Naguib',
  meets: 'Every service',
  group: 'Worship',
  members: 16,
  servants: 16
}, {
  id: 'library',
  name: 'Library and Bookstore',
  icon: 'bookmark',
  lead: 'Monica Saad',
  meets: 'Sundays · after the Liturgy',
  group: 'Fellowship',
  members: 6,
  servants: 6
}, {
  id: 'servants-prep',
  name: 'Servants’ Preparation',
  icon: 'checklist',
  lead: 'Fr. Daniel Boulos',
  meets: 'Tuesdays · 8:00 PM',
  group: 'Education',
  members: 21,
  servants: 2
}];
const MEMBER_STATUS = exports.MEMBER_STATUS = {
  active: 'Active',
  visitor: 'Visitor',
  moved: 'Moved away',
  inactive: 'Inactive'
};

// families and their members: 120 households
const FAMILIES = exports.FAMILIES = [];
const MEMBERS = exports.MEMBERS = [];
for (let i = 0; i < 120; i++) {
  const last = FAMILY[i % FAMILY.length];
  const [town, postal] = pick(TOWNS);
  const fam = {
    id: 'f' + (i + 1),
    name: 'The ' + last + ' family',
    last,
    address: {
      line1: int(10, 980) + ' ' + pick(STREETS),
      city: town,
      region: 'NJ',
      postal,
      country: 'US'
    },
    phone: '(555) 01' + pad(int(0, 9), 1) + '-' + pad(int(1000, 9999), 4),
    since: 1994 + int(0, 31),
    members: [],
    district: pick(['North', 'South', 'East', 'West'])
  };
  const head = {
    first: pick(MALE),
    sex: 'm',
    role: 'Head of household',
    born: 1958 + int(0, 30)
  };
  const spouse = rnd() < 0.85 ? {
    first: pick(FEMALE),
    sex: 'f',
    role: 'Spouse',
    born: head.born + int(-3, 4)
  } : null;
  const kids = Array.from({
    length: int(0, 4)
  }, () => {
    const f = rnd() < 0.5;
    return {
      first: pick(f ? FEMALE : MALE),
      sex: f ? 'f' : 'm',
      role: 'Child',
      born: Math.max(head.born + 24, 1990) + int(0, 20)
    };
  });
  [head, spouse].concat(kids).filter(Boolean).forEach(p => {
    const id = 'm' + (MEMBERS.length + 1);
    const status = rnd() < 0.82 ? 'active' : pick(['visitor', 'moved', 'inactive']);
    const m = {
      id,
      family: fam.id,
      name: p.first + ' ' + last,
      first: p.first,
      last,
      sex: p.sex,
      role: p.role,
      born: iso(Math.min(p.born, 2024), int(1, 12), int(1, 28)),
      email: (p.first + '.' + last + int(1, 99)).toLowerCase() + '@example.com',
      phone: '(555) 01' + int(0, 9) + '-' + int(1000, 9999),
      status,
      joined: iso(Math.max(fam.since, 1994), int(1, 12), int(1, 28)),
      ministries: MINISTRIES.filter(() => rnd() < 0.12).map(x => x.id),
      servant: rnd() < 0.3,
      district: fam.district,
      giving: int(0, 1) ? int(200, 6000) : 0
    };
    MEMBERS.push(m);
    fam.members.push(id);
  });
  FAMILIES.push(fam);
}
const memberById = id => MEMBERS.find(m => m.id === id);
exports.memberById = memberById;
const familyById = id => FAMILIES.find(f => f.id === id);
exports.familyById = familyById;
const membersOf = fid => MEMBERS.filter(m => m.family === fid);

// services and the liturgical calendar (2026–2027); feasts are Coptic feasts, dates by the Gregorian calendar
exports.membersOf = membersOf;
const SERVICES = exports.SERVICES = [{
  id: 's1',
  title: 'Divine Liturgy',
  day: 'Sunday',
  time: '08:00',
  end: '11:00',
  place: 'Church'
}, {
  id: 's2',
  title: 'Vespers and Midnight Praises',
  day: 'Saturday',
  time: '18:00',
  end: '20:30',
  place: 'Church'
}, {
  id: 's3',
  title: 'Divine Liturgy',
  day: 'Wednesday',
  time: '07:00',
  end: '09:00',
  place: 'Church'
}, {
  id: 's4',
  title: 'Bible Study',
  day: 'Wednesday',
  time: '19:00',
  end: '20:30',
  place: 'Fellowship hall'
}, {
  id: 's5',
  title: 'Youth Meeting',
  day: 'Friday',
  time: '19:00',
  end: '21:00',
  place: 'Youth room'
}];
const FEASTS = exports.FEASTS = [{
  id: 'nayrouz',
  title: 'Feast of the Nayrouz (Coptic New Year)',
  date: '2026-09-11',
  kind: 'feast'
}, {
  id: 'cross',
  title: 'Feast of the Cross',
  date: '2026-09-27',
  kind: 'feast'
}, {
  id: 'nativity-fast',
  title: 'The Nativity Fast begins',
  date: '2026-11-25',
  kind: 'fast'
}, {
  id: 'kiahk',
  title: 'The month of Kiahk begins',
  date: '2026-12-10',
  kind: 'season'
}, {
  id: 'nativity',
  title: 'Feast of the Nativity',
  date: '2027-01-07',
  kind: 'feast'
}, {
  id: 'patron',
  title: 'Feast of St. John the Beloved',
  date: '2027-01-12',
  kind: 'patron'
}, {
  id: 'theophany',
  title: 'Feast of the Theophany',
  date: '2027-01-19',
  kind: 'feast'
}];
const EVENTS = exports.EVENTS = [{
  id: 'e1',
  title: 'Divine Liturgy',
  start: '2026-10-25T08:00',
  end: '2026-10-25T11:00',
  place: 'Church',
  ministry: null,
  color: 'blue',
  rsvp: 0
}, {
  id: 'e2',
  title: 'Agape meal',
  start: '2026-10-25T11:15',
  end: '2026-10-25T12:30',
  place: 'Fellowship hall',
  ministry: 'agape',
  color: 'orange',
  rsvp: 118
}, {
  id: 'e3',
  title: 'Sunday School',
  start: '2026-10-25T11:30',
  end: '2026-10-25T12:30',
  place: 'Classrooms',
  ministry: 'sunday-school',
  color: 'green',
  rsvp: 0
}, {
  id: 'e4',
  title: 'Servants’ Preparation',
  start: '2026-10-27T20:00',
  end: '2026-10-27T21:30',
  place: 'Library',
  ministry: 'servants-prep',
  color: 'purple',
  rsvp: 19
}, {
  id: 'e5',
  title: 'Bible Study: the Gospel of St. John',
  start: '2026-10-28T19:00',
  end: '2026-10-28T20:30',
  place: 'Fellowship hall',
  ministry: 'bible-study',
  color: 'teal',
  rsvp: 34
}, {
  id: 'e6',
  title: 'Youth Meeting',
  start: '2026-10-30T19:00',
  end: '2026-10-30T21:00',
  place: 'Youth room',
  ministry: 'youth',
  color: 'green',
  rsvp: 41
}, {
  id: 'e7',
  title: 'Food Pantry',
  start: '2026-10-31T09:00',
  end: '2026-10-31T12:00',
  place: 'Parish hall',
  ministry: 'food-pantry',
  color: 'red',
  rsvp: 26
}, {
  id: 'e8',
  title: 'Vespers and Midnight Praises',
  start: '2026-10-31T18:00',
  end: '2026-10-31T20:30',
  place: 'Church',
  ministry: null,
  color: 'blue',
  rsvp: 0
}, {
  id: 'e9',
  title: 'Parish retreat',
  start: '2026-11-13T17:00',
  end: '2026-11-15T13:00',
  place: 'Camp St. Mark',
  ministry: 'youth',
  color: 'purple',
  rsvp: 72
}, {
  id: 'e10',
  title: 'Feast of St. John the Beloved: parish festival',
  start: '2027-01-12T17:00',
  end: '2027-01-12T21:00',
  place: 'Parish hall',
  ministry: null,
  color: 'orange',
  rsvp: 240
}];

// giving: funds, pledges, and 10,000 gifts (the virtual list of the giving history)
const FUNDS = exports.FUNDS = [{
  id: 'general',
  name: 'General fund',
  goal: 420000,
  raised: 311250
}, {
  id: 'building',
  name: 'Fellowship hall building fund',
  goal: 1200000,
  raised: 684300
}, {
  id: 'pantry',
  name: 'Food pantry',
  goal: 36000,
  raised: 29410
}, {
  id: 'youth-trip',
  name: 'Youth trip',
  goal: 18000,
  raised: 9850
}, {
  id: 'feast',
  name: 'Feast agape',
  goal: 12000,
  raised: 12640
}];
const METHODS = ['Card', 'Check', 'Cash', 'Bank transfer', 'Online'];
const GIFTS = exports.GIFTS = Array.from({
  length: 10000
}, (_, i) => {
  const m = MEMBERS[Math.floor(rnd() * MEMBERS.length)];
  const month = 1 + i % 10,
    day = 1 + Math.floor(rnd() * 28);
  return {
    id: 'G-' + pad(10000 + i, 5),
    member: m.id,
    name: m.name,
    fund: pick(FUNDS).id,
    amount: Math.round((20 + rnd() * 480) * 100) / 100,
    method: pick(METHODS),
    date: iso(2026, month, day)
  };
});
const PLEDGES = exports.PLEDGES = MEMBERS.filter(m => m.giving > 3000).slice(0, 40).map((m, i) => ({
  id: 'P-' + pad(200 + i, 3),
  member: m.id,
  name: m.name,
  fund: i % 3 ? 'building' : 'general',
  amount: Math.round(m.giving / 100) * 100,
  paid: Math.round(m.giving * (0.2 + rnd() * 0.8) / 100) * 100,
  frequency: pick(['Monthly', 'Quarterly', 'Yearly']),
  status: pick(['On track', 'On track', 'Behind', 'Complete'])
}));
const GIVING_BY_MONTH = exports.GIVING_BY_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((label, i) => ({
  label,
  month: i + 1,
  general: 26000 + Math.round(rnd() * 9000),
  building: 48000 + Math.round(rnd() * 30000),
  pantry: 2200 + Math.round(rnd() * 1400)
}));

// servants and serving sign-ups
const SERVING_SLOTS = exports.SERVING_SLOTS = [{
  id: 'sl1',
  role: 'Usher',
  ministry: 'ushers',
  date: '2026-11-01',
  time: '07:45',
  needed: 4,
  signed: ['m3', 'm9', 'm14']
}, {
  id: 'sl2',
  role: 'Reader (Epistle)',
  ministry: 'deacons',
  date: '2026-11-01',
  time: '08:00',
  needed: 2,
  signed: ['m21']
}, {
  id: 'sl3',
  role: 'Agape kitchen',
  ministry: 'agape',
  date: '2026-11-01',
  time: '10:30',
  needed: 6,
  signed: ['m4', 'm8', 'm30', 'm41', 'm52', 'm66']
}, {
  id: 'sl4',
  role: 'Sunday School: Grade 3',
  ministry: 'sunday-school',
  date: '2026-11-01',
  time: '11:30',
  needed: 2,
  signed: ['m12', 'm19']
}, {
  id: 'sl5',
  role: 'Sound desk',
  ministry: 'media',
  date: '2026-11-01',
  time: '07:30',
  needed: 1,
  signed: []
}, {
  id: 'sl6',
  role: 'Food pantry: sorting',
  ministry: 'food-pantry',
  date: '2026-10-31',
  time: '09:00',
  needed: 8,
  signed: ['m5', 'm7', 'm11', 'm23', 'm28']
}, {
  id: 'sl7',
  role: 'Visitation: hospital',
  ministry: 'visitation',
  date: '2026-11-03',
  time: '14:00',
  needed: 2,
  signed: ['m33']
}];

// announcements, documents and media
const ANNOUNCEMENTS = exports.ANNOUNCEMENTS = [{
  id: 'a1',
  title: 'The Nativity Fast begins on November 25',
  body: 'The fast runs until the Feast of the Nativity on January 7. A fasting menu is posted in the documents.',
  author: 'Fr. Daniel Boulos',
  date: '2026-10-24',
  status: 'Published',
  audience: 'Everyone'
}, {
  id: 'a2',
  title: 'Servants needed for the parish festival',
  body: 'Sign up for the Feast of St. John the Beloved festival on January 12: setup, kitchen, games and cleanup.',
  author: 'Mina Habib',
  date: '2026-10-22',
  status: 'Published',
  audience: 'Servants'
}, {
  id: 'a3',
  title: 'Fellowship hall: the next building milestone',
  body: 'The foundation is complete. Thank you to every family that has given to the building fund.',
  author: 'Parish council',
  date: '2026-10-18',
  status: 'Draft',
  audience: 'Everyone'
}, {
  id: 'a4',
  title: 'Kiahk Midnight Praises schedule',
  body: 'Every Saturday of Kiahk, the Midnight Praises begin at 8:00 PM after Vespers.',
  author: 'Kirollos Tadros',
  date: '2026-10-15',
  status: 'Scheduled',
  audience: 'Everyone'
}];
const DOCUMENTS = exports.DOCUMENTS = [{
  id: 'd1',
  name: 'Weekly bulletin 2026-10-25.pdf',
  folder: 'Bulletins',
  size: 842113,
  modified: '2026-10-23T16:20',
  owner: 'Church office',
  version: 3
}, {
  id: 'd2',
  name: 'Nativity Fast menu.pdf',
  folder: 'Announcements',
  size: 311402,
  modified: '2026-10-20T09:12',
  owner: 'Agape Kitchen',
  version: 1
}, {
  id: 'd3',
  name: 'Sunday School curriculum 2026.docx',
  folder: 'Sunday School',
  size: 1203990,
  modified: '2026-09-02T18:44',
  owner: 'Marina Girgis',
  version: 7
}, {
  id: 'd4',
  name: 'Servant guidelines.pdf',
  folder: 'Servants',
  size: 512004,
  modified: '2026-08-14T11:05',
  owner: 'Fr. Daniel Boulos',
  version: 2
}, {
  id: 'd5',
  name: 'Building fund report Q3.xlsx',
  folder: 'Finance',
  size: 88210,
  modified: '2026-10-05T14:30',
  owner: 'Parish council',
  version: 4
}, {
  id: 'd6',
  name: 'Festival floor plan.png',
  folder: 'Events',
  size: 2304551,
  modified: '2026-10-21T20:02',
  owner: 'Mina Habib',
  version: 2
}, {
  id: 'd7',
  name: 'Hymns of Kiahk.pdf',
  folder: 'Hymns',
  size: 4410222,
  modified: '2026-10-12T08:00',
  owner: 'Deacons’ School',
  version: 1
}, {
  id: 'd8',
  name: 'Youth trip permission form.pdf',
  folder: 'Youth',
  size: 203110,
  modified: '2026-10-01T12:00',
  owner: 'Mina Habib',
  version: 1
}];
const MEDIA = exports.MEDIA = [{
  id: 'v1',
  title: 'Sermon: "Little children, love one another"',
  kind: 'audio',
  speaker: 'Fr. Daniel Boulos',
  date: '2026-10-18',
  duration: 1712
}, {
  id: 'v2',
  title: 'Sermon: the Good Shepherd',
  kind: 'audio',
  speaker: 'Fr. Antony Wahba',
  date: '2026-10-11',
  duration: 1488
}, {
  id: 'v3',
  title: 'Hymn: Tenen (We worship You)',
  kind: 'audio',
  speaker: 'Hymns and Choir',
  date: '2026-10-04',
  duration: 312
}, {
  id: 'v4',
  title: 'Feast of the Cross procession',
  kind: 'video',
  speaker: 'Media and Sound',
  date: '2026-09-27',
  duration: 845
}, {
  id: 'v5',
  title: 'Nayrouz celebration',
  kind: 'image',
  speaker: 'Media and Sound',
  date: '2026-09-11',
  duration: 0
}];
const BOOKSTORE = exports.BOOKSTORE = [{
  id: 'b1',
  name: 'The Agpeya (Book of Hours)',
  price: 18,
  category: 'Prayer books',
  stock: 42
}, {
  id: 'b2',
  name: 'Coptic Orthodox hymns: Kiahk',
  price: 12,
  category: 'Hymns',
  stock: 18
}, {
  id: 'b3',
  name: 'Icon of St. John the Beloved (print)',
  price: 25,
  category: 'Icons',
  stock: 9
}, {
  id: 'b4',
  name: 'Children’s Bible stories',
  price: 15,
  category: 'Children',
  stock: 30
}, {
  id: 'b5',
  name: 'Hand-carved wooden cross',
  price: 22,
  category: 'Gifts',
  stock: 14
}, {
  id: 'b6',
  name: 'Lives of the Saints: Tobi',
  price: 16,
  category: 'Books',
  stock: 0
}];

// the signed-in person (made up)
const ME = exports.ME = {
  id: 'm1',
  name: MEMBERS[0].name,
  email: 'office@stjohn-beloved.example',
  role: 'Church office administrator'
};
  } },
  "test-site/site.jsx": { deps: {"plenix-platform":null,"./pages.js":"test-site/pages.js","./data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NAV_PAGES = void 0;
exports.SiteCommands = SiteCommands;
exports.SiteContext = void 0;
exports.SitePage = SitePage;
exports.pageHref = void 0;
exports.useChrome = useChrome;
exports.useSite = void 0;
var _plenixPlatform = require("plenix-platform");
var _pages = require("./pages.js");
var _data = require("./data.js");
/* St. John the Beloved test site · the frame every screen shares (test-site/site.jsx): the site header (AppHeader with
   search, New member and the account menu), the navigation pane (NavPane with a NavList of every page in pages.js and a
   ToolRail of the groups), the status bar, the command palette (Ctrl Shift P) and the site's shortcuts.
   A screen receives { screen, chrome } and draws either a page template, given chrome's header, sideNav and footer
   (<ListingPage {...chrome} …/>), or <SitePage chrome={chrome} page="…">…</SitePage> (an AppShell with the same chrome). */

const {
  useState,
  createContext,
  useContext
} = React;
const SiteContext = exports.SiteContext = createContext(null);
const useSite = () => useContext(SiteContext);

// the address of a page (its open value for one with an :id part)
exports.useSite = useSite;
const pageHref = p => '#' + (p.navOpen || p.open || p.path);
exports.pageHref = pageHref;
const NAV_PAGES = exports.NAV_PAGES = _pages.PAGES.filter(p => p.nav !== false);
const GROUPS = [...new Set(NAV_PAGES.map(p => p.group))];

// an AppShell with the site's chrome: page is the kind of page (workspace, dashboard, settings, form, detail, master-detail, editor)
function SitePage({
  chrome,
  page = 'workspace',
  panel,
  children,
  className
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.AppShell, {
    page: page,
    header: chrome.header,
    sideNav: chrome.sideNav,
    footer: chrome.footer,
    panel: panel,
    className: className
  }, children);
}

// the chrome for the current page: header, sideNav, footer
function useChrome({
  current,
  navigate,
  query,
  setQuery
}) {
  const [narrowQ, setNarrowQ] = [query, setQuery];
  const header = /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader, {
    tone: "accent",
    appName: _data.CHURCH.short,
    brandHref: "#/",
    action: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader.Action, {
      variant: "secondary",
      icon: "add",
      onClick: () => navigate('/members/new')
    }, "New member"),
    search: /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
      placeholder: "Search members, families, documents\u2026",
      label: "Search the parish",
      onAccent: true,
      value: narrowQ,
      onChange: e => setNarrowQ(e.target.value),
      onClear: () => setNarrowQ(''),
      onKeyDown: e => {
        if (e.key === 'Enter' && narrowQ.trim()) navigate('/search', {
          q: narrowQ.trim()
        });
      }
    }),
    account: /*#__PURE__*/React.createElement(_plenixPlatform.AppHeader.Account, {
      name: _data.ME.name,
      email: _data.ME.email,
      current: current === 'account' ? 'account' : current === 'settings' ? 'settings' : undefined,
      myAccount: {
        href: '#/account'
      },
      settings: {
        href: '#/settings/general'
      },
      signOut: {
        href: '#/sign-in'
      }
    })
  });
  // only the group of the current page starts open: the pane stays short enough that its pinned footer follows the list
  const groups = GROUPS.map(g => ({
    heading: g,
    defaultExpanded: NAV_PAGES.some(p => p.group === g && p.id === current),
    items: NAV_PAGES.filter(p => p.group === g).map(p => ({
      id: p.id,
      label: p.title,
      icon: p.icon,
      href: pageHref(p)
    }))
  }));
  const firstOf = g => NAV_PAGES.find(p => p.group === g);
  const sideNav = /*#__PURE__*/React.createElement(_plenixPlatform.NavPane, {
    label: "Parish",
    title: _data.CHURCH.short,
    as: "div",
    rail: GROUPS.map(g => {
      const p = firstOf(g);
      return /*#__PURE__*/React.createElement(_plenixPlatform.ToolRail.Item, {
        key: g,
        icon: p.icon,
        label: g,
        pressed: NAV_PAGES.some(x => x.group === g && x.id === current),
        onClick: () => navigate(p.navOpen || p.open || p.path)
      });
    }),
    footer: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "gear",
      onClick: () => navigate('/settings/general')
    }, "Parish settings")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "Parish",
    value: current,
    groups: groups
  }));
  const footer = /*#__PURE__*/React.createElement(_plenixPlatform.StatusBar, {
    start: /*#__PURE__*/React.createElement("span", null, _data.CHURCH.name),
    end: /*#__PURE__*/React.createElement("span", null, "Test data: every person is made up")
  });
  return {
    header,
    sideNav,
    footer
  };
}

// the site's commands (the command palette, Ctrl K) and shortcuts: N opens New member, G then a letter goes to a page
function SiteCommands({
  navigate
}) {
  (0, _plenixPlatform.useHotkey)('N', () => navigate('/members/new'), {
    label: 'New member',
    group: 'Members'
  });
  (0, _plenixPlatform.useHotkey)('G M', () => navigate('/members'), {
    label: 'Go to members',
    group: 'Navigation'
  });
  (0, _plenixPlatform.useHotkey)('G C', () => navigate('/calendar'), {
    label: 'Go to the calendar',
    group: 'Navigation'
  });
  (0, _plenixPlatform.useHotkey)('G D', () => navigate('/giving'), {
    label: 'Go to donations',
    group: 'Navigation'
  });
  (0, _plenixPlatform.useHotkey)('G H', () => navigate('/'), {
    label: 'Go to the dashboard',
    group: 'Navigation'
  });
  (0, _plenixPlatform.useHotkey)('G S', () => navigate('/servants'), {
    label: 'Go to servants',
    group: 'Navigation'
  });
  const items = NAV_PAGES.map(p => ({
    id: p.id,
    label: p.title,
    icon: p.icon,
    group: p.group,
    onSelect: () => navigate(p.navOpen || p.open || p.path)
  })).concat([{
    id: 'cmd-new-member',
    label: 'New member',
    icon: 'add',
    group: 'Commands',
    shortcut: 'N',
    onSelect: () => navigate('/members/new')
  }]);
  // Ctrl K is the header search's (AppHeader; its own listener also takes Ctrl Shift K): the palette takes Ctrl Shift P
  return /*#__PURE__*/React.createElement(_plenixPlatform.CommandPalette, {
    items: items,
    hotkey: "Mod+Shift+P",
    title: "Go to a page or run a command"
  });
}
  } },
  "test-site/screens/dashboard.jsx": { deps: {"../site.jsx":"test-site/site.jsx","plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardScreen = DashboardScreen;
var _site = require("../site.jsx");
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Dashboard (#/): the parish office's home page. A HomePage template with the figures of
   the week in a row of MetricCards (members, families, servants signed up), then the office's widgets in a WidgetGrid of
   Panels that people reorder: upcoming services and feasts (List, SectionHeading, Divider, Badge), today's tasks
   (Checkbox, with a toast as each is done) and visitors to welcome (RowButton), giving this month against last month and
   the year so far (MetricCard comparison and trend), the office's notifications (NotificationList) and who is in the
   office (StatusDot presence). Quick actions sit in a ButtonGroup; "Record a gift" is the page's primary action, and a
   FloatingActionButton on a narrow window (useAppLayout, Show / Hide). */
const {
  useState
} = React;
const TODAY = '2026-10-25';
const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(n);
const count = n => new Intl.NumberFormat('en-US').format(n);
const shortDate = iso => new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
}).format(new Date(iso + 'T12:00'));
const clock = hm => {
  const [h, m] = hm.split(':').map(Number);
  return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
};

// the figures
const ACTIVE = _data.MEMBERS.filter(m => m.status === 'active').length;
const JOINED_RECENTLY = _data.MEMBERS.filter(m => m.joined >= '2024-01-01').length;
const sumMonth = month => _data.GIFTS.filter(g => g.date.slice(5, 7) === String(month).padStart(2, '0')).reduce((s, g) => s + g.amount, 0);
const OCTOBER = sumMonth(10),
  SEPTEMBER = sumMonth(9);
const SIGNED = _data.SERVING_SLOTS.reduce((s, x) => s + x.signed.length, 0),
  NEEDED = _data.SERVING_SLOTS.reduce((s, x) => s + x.needed, 0);
const FEAST_BADGE = {
  feast: {
    tone: 'active',
    icon: 'star',
    label: 'Feast'
  },
  fast: {
    tone: 'waiting',
    icon: 'clock',
    label: 'Fast'
  },
  season: {
    tone: 'neutral',
    icon: 'calendar',
    label: 'Season'
  },
  patron: {
    tone: 'success',
    icon: 'star',
    label: 'Patron feast'
  }
};

// the office's made-up work for today
const TASKS = [{
  id: 't1',
  label: 'Print the weekly bulletin',
  description: '120 copies for the Divine Liturgy'
}, {
  id: 't2',
  label: 'Confirm the Agape meal count',
  description: 'Agape Kitchen asked by 10:00 AM'
}, {
  id: 't3',
  label: 'Send the Sunday School reminder',
  description: 'Grades 1–6, classes at 11:30 AM'
}, {
  id: 't4',
  label: 'Find a servant for the sound desk',
  description: 'November 1, 7:30 AM: nobody signed up yet'
}];
const NOTIFICATIONS = [{
  id: 'n1',
  text: 'Mina Habib signed up four servants for the parish festival',
  time: '9 min ago',
  unread: true
}, {
  id: 'n2',
  text: 'A new family filled in the visitor card: the Selim family',
  time: '1 hr ago',
  unread: true
}, {
  id: 'n3',
  text: 'The building fund report for Q3 is ready to review',
  time: 'Yesterday',
  unread: false
}, {
  id: 'n4',
  text: 'Fr. Antony Wahba published “Kiahk Midnight Praises schedule”',
  time: 'Oct 15',
  unread: false
}];
const OFFICE = [{
  id: _data.CLERGY[0].id,
  name: _data.CLERGY[0].name,
  role: _data.CLERGY[0].role,
  tone: 'online',
  label: 'In the office'
}, {
  id: _data.CLERGY[1].id,
  name: _data.CLERGY[1].name,
  role: _data.CLERGY[1].role,
  tone: 'busy',
  label: 'In a meeting'
}, {
  id: 'o1',
  name: 'Nevine Mikhail',
  role: 'Church office secretary',
  tone: 'online',
  label: 'In the office'
}, {
  id: 'o2',
  name: 'Hany Fahmy',
  role: 'Visitation servant',
  tone: 'away',
  label: 'Away'
}, {
  id: 'o3',
  name: 'Sarah Ibrahim',
  role: 'Food Pantry lead',
  tone: 'offline',
  label: 'Not in today'
}];
const WIDGETS = [{
  id: 'services',
  title: 'Services and feasts'
}, {
  id: 'tasks',
  title: 'Today’s tasks'
}, {
  id: 'giving',
  title: 'Giving'
}, {
  id: 'notifications',
  title: 'Notifications'
}, {
  id: 'office',
  title: 'In the office'
}, {
  id: 'livestream',
  title: 'Livestream'
}, {
  id: 'find',
  title: 'Find a page'
}];

// the floating "Record a gift" on a narrow window: it reads the shell's layout, so it is drawn inside the page
function RecordGiftFab({
  onRecord
}) {
  const layout = (0, _plenixPlatform.useAppLayout)();
  return layout && layout.narrow ? /*#__PURE__*/React.createElement(_plenixPlatform.FloatingActionButton, {
    icon: "field-currency",
    label: "Record a gift",
    onClick: onRecord
  }) : null;
}

// the livestream encoder's status: on a weekday the encoder in the sound room is switched off, so the refresh fails and the
// last known status stays on screen with a RetryNotice beside it (useRetry: three attempts, Retry starts a new series)
const encoderStatus = () => Promise.reject(new Error('The encoder in the sound room is switched off'));
function DashboardScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const stream = (0, _plenixPlatform.useRetry)(encoderStatus, {
    attempts: 3
  });
  const [order, setOrder] = useState(WIDGETS);
  const [done, setDone] = useState([]);
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const record = () => screen.navigate('/giving');
  const toggleTask = (task, on) => {
    setDone(d => on ? d.concat(task.id) : d.filter(x => x !== task.id));
    if (on) toast.show('Done: ' + task.label, {
      tone: 'success',
      action: {
        label: 'Undo',
        onAction: () => setDone(d => d.filter(x => x !== task.id))
      }
    });
  };
  const visitors = _data.MEMBERS.filter(m => m.status === 'visitor').slice(0, 3);
  const feasts = _data.FEASTS.filter(f => f.date >= TODAY).slice(0, 4);
  const open = TASKS.length - done.length;
  const unread = notes.filter(n => n.unread).length;
  const widgets = {
    services: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "calendar",
      title: "Services and feasts",
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
        onClick: () => screen.navigate('/calendar')
      }, "Calendar"), handle)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
      level: 3
    }, "This week"), /*#__PURE__*/React.createElement(_plenixPlatform.List, {
      items: _data.SERVICES.map(s => ({
        icon: 'clock',
        children: s.title + ' · ' + s.day + ' ' + clock(s.time) + ' · ' + s.place
      }))
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Divider, null), /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
      level: 3
    }, "Feasts and fasts"), feasts.map(f => {
      const b = FEAST_BADGE[f.kind];
      return /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        key: f.id,
        justify: "between",
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "none"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, f.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "data"
      }, shortDate(f.date))), /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: b.tone,
        icon: b.icon
      }, b.label));
    }))),
    tasks: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "checklist",
      title: "Today\u2019s tasks",
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, open ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: "waiting",
        size: "sm"
      }, String(open)) : /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: "success",
        icon: "check",
        size: "sm"
      }, "All done"), handle)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, TASKS.map(t => /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
      key: t.id,
      label: t.label,
      description: t.description,
      checked: done.includes(t.id),
      onChange: e => toggleTask(t, e.target.checked)
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Divider, null), /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
      level: 3
    }, "Visitors to welcome"), visitors.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, {
      key: m.id,
      onClick: () => screen.navigate('/member/' + m.id)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "person"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "none"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, m.name), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "Visitor \xB7 ", m.district, " district \xB7 ", m.email))))))),
    giving: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "field-currency",
      title: "Giving",
      description: "Every fund, every method",
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "xs",
        variant: "ghost",
        onClick: () => screen.navigate('/gifts')
      }, "History"), handle)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MetricCard, {
      type: "comparison",
      title: "This month",
      context: "October against September",
      value: money(OCTOBER),
      change: {
        amount: Math.abs(Math.round((OCTOBER - SEPTEMBER) / SEPTEMBER * 100)) + '%',
        direction: OCTOBER >= SEPTEMBER ? 'up' : 'down',
        versus: 'vs September'
      },
      goodWhen: "up",
      compare: [{
        label: 'October',
        value: money(OCTOBER),
        amount: OCTOBER,
        color: 'blue'
      }, {
        label: 'September',
        value: money(SEPTEMBER),
        amount: SEPTEMBER,
        color: 'gray'
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.MetricCard, {
      type: "trend",
      title: "This year",
      context: "January to October",
      value: money(_data.GIVING_BY_MONTH.reduce((s, m) => s + m.general + m.building + m.pantry, 0)),
      trend: _data.GIVING_BY_MONTH.map(m => m.general + m.building + m.pantry),
      trendVariant: "bar",
      trendLabel: "Giving by month",
      footer: "Updated this morning"
    }))),
    notifications: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "hdr-bell",
      title: "Notifications",
      flush: true,
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, unread ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: "negative",
        size: "sm"
      }, String(unread)) : null, handle)
    }, /*#__PURE__*/React.createElement(_plenixPlatform.NotificationList, {
      items: notes,
      onChange: setNotes,
      limit: 4,
      onOpen: n => toast.show('Opened: ' + n.text),
      onViewAll: () => screen.navigate('/messages')
    })),
    office: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "settings-users",
      title: "In the office",
      description: "Who is in today",
      actions: handle
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, OFFICE.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      key: p.id,
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.StatusDot, {
      tone: p.tone,
      size: "md",
      icon: true,
      label: p.label
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "none"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, p.name), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, p.role, " \xB7 ", p.label)))))),
    livestream: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "settings-camera",
      title: "Livestream",
      description: "The Divine Liturgy is streamed every Sunday",
      actions: handle
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Last stream"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "Oct 25, 8:00 AM")), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Viewers"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, "214")), /*#__PURE__*/React.createElement(_plenixPlatform.RetryNotice, {
      retry: stream,
      tone: "warning",
      title: "The stream status could not refresh",
      showCount: true
    }, "The sound room's encoder is switched off on weekdays."))),
    find: handle => /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      icon: "search",
      title: "Find a page",
      actions: handle
    }, /*#__PURE__*/React.createElement(_plenixPlatform.CommandMenu, {
      label: "Find a page or a command",
      placeholder: "Type a page, like members or calendar",
      items: _site.NAV_PAGES.map(p => ({
        id: p.id,
        label: p.title,
        icon: p.icon,
        group: p.group,
        onSelect: () => screen.navigate(p.navOpen || p.open || p.path)
      }))
    }))
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.HomePage, _extends({}, chrome, {
    title: "Parish office",
    description: 'Sunday, October 25, 2026 · ' + count(ACTIVE) + ' active members',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Hide, {
      below: "medium"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "field-currency",
      onClick: record
    }, "Record a gift"))
  }), /*#__PURE__*/React.createElement(RecordGiftFab, {
    onRecord: record
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 3,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MetricCard, {
    icon: "settings-users",
    title: "Members",
    context: "Active members",
    value: count(ACTIVE),
    unit: "active",
    change: {
      amount: String(JOINED_RECENTLY),
      direction: 'up',
      versus: 'joined since 2024'
    },
    goodWhen: "up",
    href: "#/members",
    headingLevel: 2
  }), /*#__PURE__*/React.createElement(_plenixPlatform.MetricCard, {
    icon: "home",
    title: "Families",
    context: "Households in the parish",
    value: count(_data.FAMILIES.length),
    unit: "households",
    href: "#/families",
    headingLevel: 2
  }), /*#__PURE__*/React.createElement(_plenixPlatform.MetricCard, {
    icon: "checklist",
    title: "Servants signed up",
    context: "The next eight days",
    value: String(SIGNED),
    target: String(NEEDED),
    status: SIGNED < NEEDED ? {
      tone: 'waiting',
      icon: 'clock',
      label: NEEDED - SIGNED + ' open'
    } : {
      tone: 'success',
      icon: 'check',
      label: 'Full'
    },
    href: "#/servants",
    headingLevel: 2
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "sm",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Drag a widget\u2019s handle, or use the arrow keys on it, to change the order."), /*#__PURE__*/React.createElement(_plenixPlatform.ButtonGroup, {
    label: "Quick actions"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "document",
    onClick: () => toast.show('The bulletin was sent to the office printer', {
      tone: 'success'
    })
  }, "Print bulletin"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "mail",
    onClick: () => screen.navigate('/messages')
  }, "Email the parish"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "hdr-bell",
    onClick: () => screen.navigate('/announcements')
  }, "Announcements"))), /*#__PURE__*/React.createElement(_plenixPlatform.WidgetGrid, {
    label: "Parish office widgets",
    columns: 3,
    items: order,
    renderItem: (w, handle) => widgets[w.id](handle),
    onReorder: ids => setOrder(ids.map(id => order.find(x => x.id === id)))
  }));
}
  } },
  "test-site/screens/members.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MINISTRY_COLOR = void 0;
exports.MembersScreen = MembersScreen;
exports.ministryName = exports.STATUS_LOOK = void 0;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Members (test-site/screens/members.jsx): the parish member list the church office works
   from. A CommandBar over a DataGrid of every member (fill mode: name, family, status as a badge with its icon, district,
   ministries as tags, age, joined date), driven by useCollectionView: the search, the Filter panel (it opens with two
   conditions: status is Active, district is North or East), a ministry QuickFilter, Sort, Group (grouped by district with
   a count and an average age in each group header), Columns, the Manage columns dialog and View. Selecting rows swaps the
   bar to the selection's commands (Escape in the bar clears them); Delete runs a DeleteFlow. Export opens the ExportDialog (it builds
   a real CSV file), Import the ImportDialog or the ImportWizard (column mapping). */
const {
  useState,
  useEffect,
  useMemo
} = React;

// a status as a badge with its icon (never a dot)
const STATUS_LOOK = exports.STATUS_LOOK = {
  active: {
    tone: 'success',
    icon: 'circle-check'
  },
  visitor: {
    tone: 'active',
    icon: 'person'
  },
  moved: {
    tone: 'neutral',
    icon: 'forward'
  },
  inactive: {
    tone: 'waiting',
    icon: 'snooze'
  }
};
// each ministry's tag color (category colors identify labels; they never mean a state)
const MINISTRY_COLOR = exports.MINISTRY_COLOR = {
  'sunday-school': 'blue',
  youth: 'green',
  deacons: 'purple',
  choir: 'magenta',
  'bible-study': 'teal',
  agape: 'orange',
  visitation: 'cyan',
  'food-pantry': 'red',
  media: 'navy',
  ushers: 'olive',
  library: 'lavender',
  'servants-prep': 'lime'
};
const ministryName = id => (_data.MINISTRIES.find(x => x.id === id) || {
  name: id
}).name;
exports.ministryName = ministryName;
const ageOf = m => 2026 - Number(m.born.slice(0, 4));
const FIELDS = [{
  value: 'name',
  label: 'Name',
  kind: 'text'
}, {
  value: 'familyName',
  label: 'Family',
  kind: 'text'
}, {
  value: 'status',
  label: 'Status',
  kind: 'select',
  options: Object.keys(_data.MEMBER_STATUS).map((k, i) => ({
    value: k,
    label: _data.MEMBER_STATUS[k],
    color: ['green', 'blue', 'grey', 'yellow'][i]
  }))
}, {
  value: 'district',
  label: 'District',
  kind: 'select',
  options: ['North', 'South', 'East', 'West'].map(d => ({
    value: d,
    label: d
  }))
}, {
  value: 'ministries',
  label: 'Ministries',
  kind: 'multi',
  options: _data.MINISTRIES.map(x => ({
    value: x.id,
    label: x.name,
    color: MINISTRY_COLOR[x.id]
  }))
}, {
  value: 'age',
  label: 'Age',
  kind: 'number'
}, {
  value: 'joined',
  label: 'Joined',
  kind: 'date'
}];
const COLUMNS = [{
  title: 'Name',
  field: 'name',
  kind: 'name',
  type: 'person',
  summary: 'count'
}, {
  title: 'Family',
  field: 'familyName',
  filter: true
}, {
  title: 'Status',
  field: 'status',
  kind: 'center',
  filter: 'list',
  render: m => /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: STATUS_LOOK[m.status].tone,
    icon: STATUS_LOOK[m.status].icon
  }, _data.MEMBER_STATUS[m.status])
}, {
  title: 'District',
  field: 'district',
  filter: 'list'
}, {
  title: 'Ministries',
  field: 'ministries',
  type: 'multi',
  sortable: false,
  render: m => m.ministries.length ? /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
    label: 'Ministries of ' + m.name
  }, m.ministries.map(id => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    key: id,
    category: MINISTRY_COLOR[id]
  }, ministryName(id)))) : null
}, {
  title: 'Age',
  field: 'age',
  type: 'number',
  kind: 'data',
  summary: 'average'
}, {
  title: 'Joined',
  field: 'joined',
  type: 'date',
  kind: 'data'
}];
const ROWS = _data.MEMBERS.map(m => Object.assign({}, m, {
  familyName: ((0, _data.familyById)(m.family) || {}).name || '',
  age: ageOf(m)
}));
const csvOf = rows => ['Name,Family,Status,District,Email,Phone,Joined'].concat(rows.map(m => [m.name, m.familyName, _data.MEMBER_STATUS[m.status], m.district, m.email, m.phone, m.joined].map(x => '"' + String(x).replace(/"/g, '""') + '"').join(','))).join('\n');
// a pasted or chosen CSV file: its first line names the columns
async function readCsv(source) {
  const text = source.text || (source.files && source.files[0] ? await source.files[0].text() : '');
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  if (lines.length < 2) throw new Error('The file needs a heading line and at least one member.');
  const heads = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
  const columns = heads.map((h, i) => ({
    id: 'c' + i,
    label: h
  }));
  const rows = lines.slice(1).map(l => Object.fromEntries(l.split(',').map((v, i) => ['c' + i, v.trim().replace(/^"|"$/g, '')])));
  return {
    columns,
    rows
  };
}

// the Export command at the bar's end: its words follow the bar's room
function ExportCommand({
  onClick
}) {
  const bar = (0, _plenixPlatform.useCommandBar)();
  return /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarButton, {
    icon: "export",
    label: bar && bar.iconOnly ? 'Export' : 'Export members',
    onClick: onClick
  });
}
function MembersScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [removed, setRemoved] = useState([]);
  const rows = useMemo(() => ROWS.filter(r => removed.indexOf(r.id) < 0), [removed]);
  const v = (0, _plenixPlatform.useCollectionView)(FIELDS, {
    data: rows,
    text: m => m.name + ' ' + m.familyName + ' ' + m.email,
    quick: {
      ministries: 'list'
    },
    sort: [{
      field: 'name',
      dir: 'asc'
    }]
  });
  // the office's usual view: active members of the North and East districts, grouped by district
  useEffect(() => {
    v.setFilter({
      join: 'and',
      items: [{
        id: 'start-status',
        field: 'status',
        op: 'any',
        value: ['active']
      }, {
        id: 'start-district',
        field: 'district',
        op: 'any',
        value: ['North', 'East']
      }]
    });
    v.setGroup([{
      field: 'district',
      dir: 'asc'
    }]);
  }, []);
  const [sel, setSel] = useState([]);
  const [hidden, setHidden] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(null); // 'file' | 'map'
  const [managing, setManaging] = useState(false);
  const chosen = rows.filter(r => sel.indexOf(r.id) >= 0);
  const shown = v.count(rows);
  const exportRows = ({
    format,
    scope
  }) => new Promise(resolve => {
    const list = scope === 'selection' ? chosen : rows.filter(v.test);
    const blob = new Blob([csvOf(list)], {
      type: format === 'csv' ? 'text/csv' : 'text/plain'
    });
    setTimeout(() => resolve({
      href: URL.createObjectURL(blob),
      label: 'st-john-members.' + (format === 'csv' ? 'csv' : 'txt')
    }), 400);
  });
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Members",
    description: "Every member and visitor of the parish. Open a member for their profile, family and serving."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.CommandBar, {
    label: "Members",
    count: shown + ' members',
    actions: [{
      id: 'new',
      label: 'New member',
      icon: 'add',
      primary: true,
      onSelect: () => screen.navigate('/members/new')
    }, {
      id: 'import',
      label: 'Import',
      icon: 'import',
      items: [{
        id: 'import-file',
        label: 'Import a file',
        icon: 'upload',
        onSelect: () => setImporting('file')
      }, {
        id: 'import-map',
        label: 'Import and map columns',
        icon: 'fields',
        onSelect: () => setImporting('map')
      }]
    }],
    find: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarSearch, _extends({}, v.searchProps, {
      placeholder: "Search members"
    })), /*#__PURE__*/React.createElement(_plenixPlatform.FilterPanel, v.filterProps), /*#__PURE__*/React.createElement(_plenixPlatform.QuickFilter, _extends({
      label: "Ministry",
      icon: "settings-categories",
      noun: "ministry",
      options: FIELDS[4].options
    }, v.quickProps('ministries')))),
    view: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SortPanel, v.sortProps), /*#__PURE__*/React.createElement(_plenixPlatform.GroupPanel, v.groupProps), /*#__PURE__*/React.createElement(_plenixPlatform.ColumnsMenu, v.columnsProps), /*#__PURE__*/React.createElement(_plenixPlatform.ViewMenu, _extends({}, v.viewProps, {
      gallery: false
    }))),
    end: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.CommandBarButton, {
      icon: "fields",
      label: "Manage columns",
      onClick: () => setManaging(true)
    }), /*#__PURE__*/React.createElement(ExportCommand, {
      onClick: () => setExporting(true)
    })),
    selection: {
      count: sel.length,
      hidden,
      noun: 'member',
      onClear: () => setSel([]),
      actions: [{
        id: 'open',
        label: 'Open',
        icon: 'open',
        single: true,
        onSelect: () => screen.navigate('/member/' + sel[0])
      }, {
        id: 'email',
        label: 'Email',
        icon: 'mail',
        onSelect: () => toast.show('A new email to ' + sel.length + ' members is ready in Messages', {
          tone: 'success'
        })
      }, {
        id: 'ministry',
        label: 'Add to ministry',
        icon: 'settings-users',
        items: _data.MINISTRIES.map(x => ({
          id: x.id,
          label: x.name,
          onSelect: () => toast.show(sel.length + ' members added to ' + x.name, {
            tone: 'success'
          })
        }))
      }, {
        id: 'export',
        label: 'Export',
        icon: 'export',
        onSelect: () => setExporting(true)
      }, {
        id: 'delete',
        label: 'Delete',
        icon: 'trash',
        danger: true,
        onSelect: () => setDeleting(true)
      }]
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, _extends({
    label: "Members",
    data: rows,
    columns: COLUMNS,
    index: "id",
    selectable: true,
    selected: sel,
    onSelectionChange: (keys, info) => {
      setSel(keys);
      setHidden(info && info.hidden || 0);
    },
    onRowClick: m => screen.navigate('/member/' + m.id),
    rowMenu: [{
      label: 'Open',
      icon: 'open',
      onSelect: m => screen.navigate('/member/' + m.id)
    }, {
      label: 'Edit details',
      icon: 'pencil',
      onSelect: m => screen.navigate('/member/' + m.id + '/edit')
    }, {
      label: 'Open the household',
      icon: 'home',
      onSelect: m => screen.navigate('/family/' + m.family)
    }, {
      separator: true
    }, {
      label: 'Delete',
      icon: 'trash',
      danger: true,
      onSelect: m => {
        setSel([m.id]);
        setDeleting(true);
      }
    }],
    empty: "No member matches the search and filters"
  }, v.tableProps))), /*#__PURE__*/React.createElement(_plenixPlatform.DeleteFlow, {
    open: deleting,
    items: chosen.map(m => ({
      id: m.id,
      label: m.name
    })),
    noun: "member",
    consequence: "Their gifts stay on record under their family.",
    onDelete: items => {
      setRemoved(removed.concat(items.map(x => x.id)));
      setSel([]);
    },
    onClose: () => setDeleting(false)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ManageColumnsDialog, _extends({}, v.columnsProps, {
    trigger: null,
    open: managing,
    onOpenChange: setManaging
  })), /*#__PURE__*/React.createElement(_plenixPlatform.ExportDialog, {
    open: exporting,
    title: "Export members",
    selectedCount: sel.length,
    onClose: () => setExporting(false),
    formats: [{
      value: 'csv',
      label: 'CSV (spreadsheet)'
    }, {
      value: 'txt',
      label: 'Plain text'
    }],
    onExport: exportRows
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ImportDialog, {
    open: importing === 'file',
    title: "Import members",
    accept: ".csv,text/csv",
    initialMode: "paste",
    onClose: () => setImporting(null),
    onImport: async source => {
      const d = await readCsv(source);
      toast.show(d.rows.length + ' members read; the office checks them before they join the list', {
        tone: 'success'
      });
      setImporting(null);
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ImportWizard, {
    open: importing === 'map',
    title: "Import members",
    onClose: () => setImporting(null),
    fields: [{
      id: 'first',
      label: 'First name',
      required: true
    }, {
      id: 'last',
      label: 'Last name',
      required: true
    }, {
      id: 'email',
      label: 'Email'
    }, {
      id: 'phone',
      label: 'Phone'
    }],
    onRead: readCsv,
    onImport: ({
      rows: list
    }) => new Promise(resolve => setTimeout(() => {
      toast.show(list.length + ' members imported', {
        tone: 'success'
      });
      resolve();
    }, 400))
  }));
}
  } },
  "test-site/screens/member.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx","./members.jsx":"test-site/screens/members.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberScreen = MemberScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
var _members = require("./members.jsx");
/* St. John the Beloved test site · Member (test-site/screens/member.jsx): one member's record, as the church office keeps
   it. Breadcrumbs, the record's actions (Rename member opens a Dialog with a Form; Edit details; DuplicateAction starts a
   household member from this record; DeleteFlow), ArchiveRestore around the record, an EntityHeader (status badge, facts,
   next step) and Tabs: Profile (PropertyList with InlineEdit values, AvatarUpload, the member card with QRCode and Barcode
   and a ContextMenu), Family (Persona rows), Serving (ministry tags with Popconfirm, RoleLabel, serving sign-ups), Giving
   (PropertyList and a static Table of recent gifts) and Activity (Timeline and VersionHistory). A SecondaryPane at the end
   lists the household (collapsible, resizable; its width kept with useViewState). */

const {
  useState
} = React;
const money = n => '$' + n.toLocaleString('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});
const day = iso => new Date(iso + 'T12:00').toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});
const fundName = id => (_data.FUNDS.find(f => f.id === id) || {
  name: id
}).name;
function MemberScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const found = (0, _data.memberById)(screen.id);
  const [rec, setRec] = useState(() => found ? Object.assign({}, found) : null);
  const [tab, setTab] = useState(screen.params.tab || 'profile');
  const [renaming, setRenaming] = useState(false);
  const [draft, setDraft] = useState({
    first: '',
    last: ''
  });
  const [renameError, setRenameError] = useState('');
  const [photo, setPhoto] = useState(null);
  const [archived, setArchived] = useState(false);
  const [ministries, setMinistries] = useState(found ? found.ministries : []);
  const [view, updateView] = (0, _plenixPlatform.useViewState)('st-john-member'); // the household pane's width, kept between visits

  if (!rec) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "detail"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      kind: "not-found",
      title: "This member is not in the parish list",
      action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => screen.navigate('/members')
      }, "Go to members")
    }, "The record may have been deleted or merged with another.")));
  }
  const family = (0, _data.familyById)(rec.family) || {
    name: '',
    address: {}
  };
  const household = (0, _data.membersOf)(rec.family).filter(p => p.id !== rec.id);
  const save = patch => {
    Object.assign(found, patch);
    setRec(Object.assign({}, rec, patch));
  };
  const look = _members.STATUS_LOOK[rec.status];
  const gifts = _data.GIFTS.filter(g => g.member === rec.id).sort((a, b) => a.date < b.date ? 1 : -1);
  const yearTotal = gifts.reduce((s, g) => s + g.amount, 0);
  const slots = _data.SERVING_SLOTS.filter(s => s.signed.indexOf(rec.id) >= 0);
  const number = 'STJ-' + rec.id.toUpperCase();
  const openRename = () => {
    setDraft({
      first: rec.first,
      last: rec.last
    });
    setRenameError('');
    setRenaming(true);
  };
  const rename = e => {
    e.preventDefault();
    if (!draft.first.trim() || !draft.last.trim()) {
      setRenameError('Enter both the first and the last name.');
      return;
    }
    save({
      first: draft.first.trim(),
      last: draft.last.trim(),
      name: draft.first.trim() + ' ' + draft.last.trim()
    });
    setRenaming(false);
    toast.show('Renamed to ' + draft.first.trim() + ' ' + draft.last.trim(), {
      tone: 'success'
    });
  };
  const profile = /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-end",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Contact and details"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, null, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Email"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.InlineEdit, {
    label: "Email",
    value: rec.email,
    onConfirm: email => save({
      email
    }),
    validate: x => /^[^@\s]+@[^@\s]+$/.test(x) ? null : 'Enter an email address, such as name@example.com'
  })), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Phone"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.InlineEdit, {
    label: "Phone",
    data: true,
    value: rec.phone,
    onConfirm: phone => save({
      phone
    })
  })), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "District"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.InlineEdit, {
    label: "District",
    type: "select",
    value: rec.district,
    options: ['North', 'South', 'East', 'West'].map(d => ({
      value: d,
      label: d
    })),
    onConfirm: district => save({
      district
    })
  })), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Status"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.InlineEdit, {
    label: "Status",
    type: "select",
    value: rec.status,
    options: Object.keys(_data.MEMBER_STATUS).map(k => ({
      value: k,
      label: _data.MEMBER_STATUS[k]
    })),
    onConfirm: status => save({
      status
    })
  })), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Born",
    data: true
  }, day(rec.born)), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Member since",
    data: true
  }, day(rec.joined)), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Address"
  }, family.address.line1, ", ", family.address.city, ", ", family.address.region, " ", family.address.postal))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Photo",
    description: "Shown in the parish directory and on the member card."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Profile photo",
    description: "At least 200 \xD7 200 pixels"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.AvatarUpload, {
    name: rec.name,
    src: photo,
    onChange: pic => setPhoto(pic ? pic.url : null)
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Member card",
    description: "Right-click the card for more. The office scans it at check-in for events."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ContextMenu, {
    label: "Member card actions",
    target: /*#__PURE__*/React.createElement("div", {
      tabIndex: 0,
      "aria-label": 'Member card of ' + rec.name
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md",
      align: "center"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
      name: rec.name,
      src: photo,
      size: "xl"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, rec.name), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, number))), /*#__PURE__*/React.createElement(_plenixPlatform.QRCode, {
      value: 'https://stjohn-beloved.example/m/' + rec.id,
      label: 'QR code: open the member page of ' + rec.name,
      caption: "Scan to check in",
      showValue: true
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Barcode, {
      value: number,
      size: "sm"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.StatusIcon, {
      tone: "success",
      size: "sm"
    }, "Card valid through 2027")))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "document",
    onSelect: () => toast.show('The member card is ready to print')
  }, "Print the card"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "ed-copy",
    onSelect: () => {
      try {
        navigator.clipboard.writeText(number);
      } catch (e) {/* no clipboard */}
      toast.show('Member number copied');
    }
  }, "Copy the member number"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "mail",
    onSelect: () => toast.show('The card is attached to a new email to ' + rec.first)
  }, "Email the card"))));
  const familyTab = /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: family.name,
    description: household.length ? household.length + ' others in the household' : 'Lives alone',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "home",
      onClick: () => screen.navigate('/family/' + rec.family)
    }, "Open the household")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
    name: rec.name,
    secondary: rec.role,
    role: "This member"
  }), household.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
    key: p.id,
    name: p.name,
    secondary: p.role,
    href: '#/member/' + p.id
  }))));
  const serving = /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Ministries",
    description: rec.servant ? 'Serves as a servant in these ministries.' : 'Takes part in these ministries.'
  }, ministries.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, ministries.map(id => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: id,
    gap: "sm",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
    category: _members.MINISTRY_COLOR[id]
  }, (0, _members.ministryName)(id)), /*#__PURE__*/React.createElement(_plenixPlatform.RoleLabel, {
    role: rec.servant ? 'Servant' : 'Member',
    icon: rec.servant ? 'star' : 'person'
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Popconfirm, {
    trigger: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      icon: "close",
      iconOnly: true,
      label: 'Remove from ' + (0, _members.ministryName)(id)
    }),
    title: 'Remove ' + rec.first + ' from ' + (0, _members.ministryName)(id) + '?',
    description: "The ministry lead is told.",
    confirmLabel: "Remove",
    tone: "danger",
    onConfirm: () => {
      setMinistries(ministries.filter(x => x !== id));
      save({
        ministries: ministries.filter(x => x !== id)
      });
    }
  })))) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Not in a ministry yet.")), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Serving sign-ups"
  }, slots.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
    label: "Serving sign-ups",
    data: slots,
    columns: [{
      title: 'Role',
      field: 'role',
      rowLabel: true
    }, {
      title: 'Ministry',
      field: 'ministry',
      render: s => (0, _members.ministryName)(s.ministry)
    }, {
      title: 'Date',
      field: 'date',
      kind: 'data',
      render: s => day(s.date)
    }, {
      title: 'Time',
      field: 'time',
      kind: 'data'
    }]
  }) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "No upcoming sign-ups.")));
  const giving = /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "This year"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, null, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Gifts in 2026",
    data: true
  }, gifts.length), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Total given",
    data: true
  }, money(yearTotal)), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Statements"
  }, "Sent by email in January"))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Recent gifts"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
    label: "Recent gifts",
    data: gifts.slice(0, 8),
    empty: "No gifts recorded this year",
    columns: [{
      title: 'Date',
      field: 'date',
      kind: 'data',
      render: g => day(g.date)
    }, {
      title: 'Fund',
      field: 'fund',
      render: g => fundName(g.fund)
    }, {
      title: 'Method',
      field: 'method'
    }, {
      title: 'Amount',
      field: 'amount',
      kind: 'data',
      align: 'right',
      render: g => money(g.amount)
    }]
  })));
  const activity = /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "History"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Timeline, {
    label: 'History of ' + rec.name,
    items: [{
      id: 'joined',
      time: day(rec.joined),
      dateTime: rec.joined,
      title: 'Joined the parish',
      icon: 'home'
    }, ...(ministries.length ? [{
      id: 'ministry',
      time: 'Sep 13, 2026',
      dateTime: '2026-09-13',
      title: 'Joined ' + (0, _members.ministryName)(ministries[0]),
      icon: 'settings-users'
    }] : []), ...(gifts.length ? [{
      id: 'gift',
      time: day(gifts[0].date),
      dateTime: gifts[0].date,
      title: 'Latest gift',
      description: fundName(gifts[0].fund),
      icon: 'star'
    }] : [])]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Record changes"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.VersionHistory, {
    currentId: "v3",
    onRestore: ver => new Promise(resolve => setTimeout(() => {
      toast.show('Restored ' + ver.version, {
        tone: 'success'
      });
      resolve();
    }, 300)),
    versions: [{
      id: 'v3',
      version: 'Version 3',
      date: 'Oct 18, 2026',
      dateTime: '2026-10-18',
      author: 'Church office',
      description: 'Phone number updated'
    }, {
      id: 'v2',
      version: 'Version 2',
      date: 'Mar 2, 2026',
      dateTime: '2026-03-02',
      author: 'Church office',
      description: 'Moved to the ' + rec.district + ' district'
    }, {
      id: 'v1',
      version: 'Version 1',
      date: day(rec.joined),
      dateTime: rec.joined,
      author: 'Church office',
      description: 'Record created'
    }]
  })));
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "master-detail"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "md",
    justify: "between",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Breadcrumbs, {
    items: [{
      label: 'Members',
      href: '#/members'
    }, {
      label: family.name,
      href: '#/family/' + rec.family
    }, {
      label: rec.name
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "rename",
    onClick: openRename
  }, "Rename member"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "pencil",
    onClick: () => screen.navigate('/member/' + rec.id + '/edit')
  }, "Edit details"), /*#__PURE__*/React.createElement(_plenixPlatform.DuplicateAction, {
    variant: "rename",
    name: rec.name,
    noun: "member",
    taken: _data.MEMBERS.map(m => m.name),
    trigger: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "ed-copy"
    }, "Add a household member"),
    source: 'The family, address and district of ' + rec.first + ' are copied',
    options: [{
      id: 'ministries',
      label: 'Ministries'
    }, {
      id: 'phone',
      label: 'Home phone'
    }],
    onDuplicate: name => toast.show(name + ' is ready to complete in the household', {
      tone: 'success'
    })
  }), /*#__PURE__*/React.createElement(_plenixPlatform.DeleteFlow, {
    variant: "type",
    items: [{
      id: rec.id,
      label: rec.name
    }],
    noun: "member",
    consequence: "Their gifts stay on record under their family; their serving sign-ups are removed.",
    trigger: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "danger-secondary",
      icon: "trash"
    }, "Delete"),
    onDelete: () => {
      const i = _data.MEMBERS.indexOf(found);
      if (i >= 0) _data.MEMBERS.splice(i, 1);
      screen.navigate('/members');
    }
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.ArchiveRestore, {
    archived: archived,
    strings: {
      message: 'This member is archived: they no longer show in lists or the directory.'
    },
    onArchive: () => new Promise(r => setTimeout(() => {
      setArchived(true);
      r();
    }, 300)),
    onRestore: () => new Promise(r => setTimeout(() => {
      setArchived(false);
      r();
    }, 300))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    media: {
      person: rec.name,
      src: photo,
      gender: rec.sex === 'f' ? 'female' : rec.sex === 'm' ? 'male' : undefined
    },
    title: rec.name,
    subtitle: rec.role + ' · ' + family.name,
    status: {
      tone: look.tone,
      icon: look.icon,
      label: _data.MEMBER_STATUS[rec.status]
    },
    facts: [{
      label: 'Member since',
      value: rec.joined.slice(0, 4),
      data: true
    }, {
      label: 'District',
      value: rec.district
    }, {
      label: 'Ministries',
      value: ministries.length,
      data: true
    }, {
      label: 'Serving',
      value: rec.servant ? 'Servant' : 'Not serving'
    }],
    next: rec.status === 'visitor' ? {
      title: 'Call to welcome them',
      detail: 'Visitation ministry · this week'
    } : {
      title: 'Invite to the parish retreat',
      detail: 'Nov 13–15 · Youth Meeting'
    },
    actions: [{
      icon: 'mail',
      label: 'Email ' + rec.first,
      onClick: () => toast.show('A new email to ' + rec.first + ' is ready in Messages')
    }, {
      icon: 'phone',
      label: 'Call ' + rec.first,
      onClick: () => toast.show('Calling ' + rec.phone)
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Tabs, {
    label: "Member record",
    value: tab,
    onChange: setTab,
    items: [{
      value: 'profile',
      label: 'Profile',
      icon: 'person',
      content: profile
    }, {
      value: 'family',
      label: 'Family',
      icon: 'home',
      count: household.length + 1,
      content: familyTab
    }, {
      value: 'serving',
      label: 'Serving',
      icon: 'settings-users',
      count: ministries.length,
      content: serving
    }, {
      value: 'giving',
      label: 'Giving',
      icon: 'star',
      content: giving
    }, {
      value: 'activity',
      label: 'Activity',
      icon: 'clock',
      content: activity
    }]
  }))))), /*#__PURE__*/React.createElement(_plenixPlatform.SecondaryPane, {
    title: "Household",
    icon: "home",
    side: "end",
    collapsible: true,
    resizable: true,
    size: view.householdPane,
    onSizeChange: px => updateView({
      householdPane: px
    }),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      icon: "open",
      iconOnly: true,
      label: "Open the household",
      onClick: () => screen.navigate('/family/' + rec.family)
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, family.address.line1, ", ", family.address.city), household.length ? household.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
    key: p.id,
    name: p.name,
    secondary: p.role,
    size: "sm",
    href: '#/member/' + p.id
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "No one else lives in this household."))), /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: renaming,
    onClose: () => setRenaming(false),
    title: "Rename member",
    size: "sm",
    description: "The new name shows everywhere: lists, the directory and the member card."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Form, {
    label: "Rename member",
    onSubmit: rename
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "First name",
    required: true,
    error: renameError && !draft.first.trim() ? renameError : undefined
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: draft.first,
    autoComplete: "off",
    onChange: e => setDraft(Object.assign({}, draft, {
      first: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Last name",
    required: true,
    error: renameError && !draft.last.trim() ? renameError : undefined
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: draft.last,
    autoComplete: "off",
    onChange: e => setDraft(Object.assign({}, draft, {
      last: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.FormActions, {
    sticky: false
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => setRenaming(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    type: "submit",
    variant: "primary"
  }, "Rename")))));
}
  } },
  "test-site/screens/member-new.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberNewScreen = MemberNewScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · New member (test-site/screens/member-new.jsx): the church office registers a member.
   A CreatePage (FormFlow on a page) with FormSections of Fields: Input, InputGroup (phone), Textarea, Select, Checkbox,
   Radio and RadioGroup (household), ChoiceList (membership), Switch, Combobox (the family), DatePicker, CountrySelect,
   NumberInput (an optional monthly pledge), a Fieldset address row and TagInput for the languages spoken; a failed save
   shows an ErrorSummary over the fields (required fields are checked there, so their controls skip the browser’s own check). "Quick visitor" in the page header opens a WizardDialog for a first-time visitor. */
const {
  useState
} = React;
const BLANK = {
  first: '',
  last: '',
  email: '',
  phone: '',
  born: '',
  household: 'existing',
  family: '',
  role: 'Child',
  street: '',
  city: '',
  region: 'NJ',
  postal: '',
  country: 'US',
  joined: '2026-10-25',
  district: '',
  membership: 'active',
  ministries: [],
  languages: ['English'],
  pledge: null,
  directory: true,
  newsletter: true,
  contact: 'email',
  notes: ''
};
const STATES = ['NJ', 'NY', 'PA', 'CT', 'DE'].map(s => ({
  value: s,
  label: s
}));
const DISTRICTS = [{
  value: '',
  label: 'Choose a district'
}].concat(['North', 'South', 'East', 'West'].map(d => ({
  value: d,
  label: d
})));
const FAMILY_OPTIONS = _data.FAMILIES.map(f => ({
  value: f.id,
  label: f.name,
  group: f.address.city
}));
function problemsOf(v) {
  const out = [];
  if (!v.first.trim()) out.push({
    target: 'new-first',
    message: 'Enter the first name'
  });
  if (!v.last.trim()) out.push({
    target: 'new-last',
    message: 'Enter the last name'
  });
  if (v.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v.email)) out.push({
    target: 'new-email',
    message: 'Enter an email address, such as name@example.com'
  });
  if (v.household === 'existing' && !v.family) out.push({
    target: 'new-family',
    message: 'Choose the family they belong to'
  });
  if (v.household === 'new' && !v.street.trim()) out.push({
    target: 'new-street',
    message: 'Enter the street address of the new household'
  });
  if (!v.district) out.push({
    target: 'new-district',
    message: 'Choose a district'
  });
  return out;
}

// a member record added to the parish list for this visit (the data is made up and lives in memory)
function addMember(v) {
  const id = 'm' + (_data.MEMBERS.length + 1000);
  let fam = v.household === 'existing' ? (0, _data.familyById)(v.family) || _data.FAMILIES[0] : null;
  if (!fam) {
    fam = {
      id: 'f' + (_data.FAMILIES.length + 1000),
      name: 'The ' + v.last.trim() + ' family',
      last: v.last.trim(),
      members: [],
      since: 2026,
      phone: v.phone,
      district: v.district || 'North',
      address: {
        line1: v.street.trim(),
        city: v.city.trim(),
        region: v.region,
        postal: v.postal.trim(),
        country: v.country
      }
    };
    _data.FAMILIES.push(fam);
  }
  fam.members.push(id);
  _data.MEMBERS.push({
    id,
    family: fam.id,
    name: v.first.trim() + ' ' + v.last.trim(),
    first: v.first.trim(),
    last: v.last.trim(),
    role: v.household === 'existing' ? v.role : 'Head of household',
    born: v.born || '2000-01-01',
    email: v.email,
    phone: v.phone,
    status: v.membership,
    joined: v.joined || '2026-10-25',
    ministries: v.ministries,
    servant: false,
    district: v.district || fam.district,
    giving: 0
  });
  return id;
}
function VisitorWizard({
  open,
  onClose,
  onDone
}) {
  const [w, setW] = useState({
    first: '',
    last: '',
    email: '',
    visited: '2026-10-25',
    heard: 'friend',
    service: 's1',
    follow: _data.CLERGY[1].id
  });
  const set = k => e => setW(Object.assign({}, w, {
    [k]: e && e.target ? e.target.value : e
  }));
  const dirty = !!(w.first || w.last || w.email);
  return /*#__PURE__*/React.createElement(_plenixPlatform.WizardDialog, {
    open: open,
    title: "Welcome a first-time visitor",
    dirty: dirty,
    onClose: onClose,
    onComplete: () => new Promise(resolve => setTimeout(() => {
      onDone(w);
      setW(Object.assign({}, w, {
        first: '',
        last: '',
        email: ''
      }));
      resolve();
    }, 300)),
    summary: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      as: "p"
    }, (w.first || 'The visitor') + ' ' + w.last, " is added as a visitor, and the Visitation ministry is asked to call this week."),
    steps: [{
      id: 'who',
      label: 'Visitor',
      validate: () => w.first.trim() && w.last.trim() ? '' : 'Enter the visitor’s first and last name.',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "First name",
        required: true
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
        value: w.first,
        onChange: set('first')
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "Last name",
        required: true
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
        value: w.last,
        onChange: set('last')
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "Email",
        description: "For the welcome letter"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
        type: "email",
        value: w.email,
        onChange: set('email')
      })))
    }, {
      id: 'visit',
      label: 'Visit',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "First visited"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.DatePicker, {
        value: w.visited,
        onChange: set('visited'),
        max: "2026-10-25"
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "Service"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
        value: w.service,
        onChange: set('service'),
        options: [{
          value: 's1',
          label: 'Sunday Divine Liturgy'
        }, {
          value: 's2',
          label: 'Vespers and Midnight Praises'
        }, {
          value: 's5',
          label: 'Youth Meeting'
        }]
      })), /*#__PURE__*/React.createElement(_plenixPlatform.RadioGroup, {
        label: "How they heard of the parish",
        value: w.heard,
        onChange: set('heard'),
        options: [{
          value: 'friend',
          label: 'A friend or relative'
        }, {
          value: 'web',
          label: 'The parish website'
        }, {
          value: 'moved',
          label: 'Moved to the area'
        }]
      }))
    }, {
      id: 'follow',
      label: 'Follow-up',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "Who calls them"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
        value: w.follow,
        onChange: set('follow'),
        options: _data.CLERGY.map(c => ({
          value: c.id,
          label: c.name + ' · ' + c.role
        })).concat([{
          value: 'visitation',
          label: 'Visitation ministry'
        }])
      })))
    }]
  });
}
function MemberNewScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [errors, setErrors] = useState([]);
  const [tried, setTried] = useState(false);
  const [wizard, setWizard] = useState(false);
  const err = target => tried ? (errors.find(x => x.target === target) || {}).message : undefined;
  const fields = ({
    value: v,
    setValue
  }) => {
    const set = patch => {
      setValue(Object.assign({}, v, patch));
      if (tried) setErrors(problemsOf(Object.assign({}, v, patch)));
    };
    const on = k => e => set({
      [k]: e.target.value
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, tried && errors.length ? /*#__PURE__*/React.createElement(_plenixPlatform.ErrorSummary, {
      title: "The member was not saved",
      errors: errors
    }) : null, /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Name",
      description: "As they would like it in the directory."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "First name",
      required: true,
      error: err('new-first')
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      id: "new-first",
      required: false,
      "aria-required": "true",
      autoComplete: "given-name",
      value: v.first,
      onChange: on('first')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Last name",
      required: true,
      error: err('new-last')
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      id: "new-last",
      required: false,
      "aria-required": "true",
      autoComplete: "family-name",
      value: v.last,
      onChange: on('last')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Date of birth",
      description: "Used for Sunday School grades"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "date",
      value: v.born,
      onChange: on('born')
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Contact"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Email",
      error: err('new-email')
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      id: "new-email",
      type: "email",
      value: v.email,
      onChange: on('email')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Mobile phone"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.InputGroup, {
      prefix: "+1",
      data: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "tel",
      data: true,
      autoComplete: "tel-national",
      value: v.phone,
      onChange: on('phone')
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
      legend: "Preferred way to reach them"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Radio, {
      name: "contact",
      value: "email",
      label: "Email",
      checked: v.contact === 'email',
      onChange: () => set({
        contact: 'email'
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Radio, {
      name: "contact",
      value: "phone",
      label: "Phone call",
      checked: v.contact === 'phone',
      onChange: () => set({
        contact: 'phone'
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Radio, {
      name: "contact",
      value: "text",
      label: "Text message",
      checked: v.contact === 'text',
      onChange: () => set({
        contact: 'text'
      })
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Household",
      description: "Every member belongs to one household; the address is the household\u2019s."
    }, /*#__PURE__*/React.createElement(_plenixPlatform.RadioGroup, {
      label: "Household",
      value: v.household,
      onChange: household => set({
        household
      }),
      layout: "row",
      options: [{
        value: 'existing',
        label: 'Joins a family in the parish'
      }, {
        value: 'new',
        label: 'Starts a new household'
      }]
    }), v.household === 'existing' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Family",
      required: true,
      error: err('new-family')
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Combobox, {
      id: "new-family",
      required: false,
      "aria-required": "true",
      options: FAMILY_OPTIONS,
      value: v.family,
      placeholder: "Type a family name",
      onChange: family => set({
        family,
        district: v.district || ((0, _data.familyById)(family) || {}).district || ''
      })
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Place in the household"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: v.role,
      onChange: on('role'),
      options: ['Head of household', 'Spouse', 'Child', 'Other relative'].map(r => ({
        value: r,
        label: r
      }))
    }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
      legend: "Address",
      layout: "row"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Street",
      required: true,
      error: err('new-street')
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      id: "new-street",
      required: false,
      "aria-required": "true",
      autoComplete: "address-line1",
      value: v.street,
      onChange: on('street')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "City"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      autoComplete: "address-level2",
      value: v.city,
      onChange: on('city')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "State"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      width: "xs",
      value: v.region,
      onChange: on('region'),
      options: STATES
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "ZIP code"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      width: "xs",
      data: true,
      inputMode: "numeric",
      autoComplete: "postal-code",
      value: v.postal,
      onChange: on('postal')
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Country"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.CountrySelect, {
      value: v.country,
      onChange: country => set({
        country
      }),
      priority: ['US', 'CA', 'EG']
    })))), /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Parish"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.ChoiceList, {
      legend: "Membership",
      value: v.membership,
      onChange: membership => set({
        membership
      }),
      options: [{
        value: 'active',
        label: 'Member',
        description: 'Registered with the parish and listed in the directory.'
      }, {
        value: 'visitor',
        label: 'Visitor',
        description: 'Attends; the Visitation ministry keeps in touch.'
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Joined the parish"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.DatePicker, {
      value: v.joined,
      onChange: joined => set({
        joined
      }),
      presets: [{
        label: 'Today',
        value: '2026-10-25'
      }]
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "District",
      required: true,
      error: err('new-district'),
      description: "Districts plan visitation and the food pantry routes"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      id: "new-district",
      required: false,
      "aria-required": "true",
      value: v.district,
      onChange: on('district'),
      options: DISTRICTS
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
      legend: "Ministries",
      gap: "sm"
    }, _data.MINISTRIES.slice(0, 6).map(x => /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
      key: x.id,
      label: x.name,
      description: x.meets,
      checked: v.ministries.indexOf(x.id) >= 0,
      onChange: e => set({
        ministries: e.target.checked ? v.ministries.concat(x.id) : v.ministries.filter(id => id !== x.id)
      })
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Languages spoken"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
      label: "Languages spoken"
    }, v.languages.map(l => /*#__PURE__*/React.createElement(_plenixPlatform.Tag, {
      key: l,
      onRemove: () => set({
        languages: v.languages.filter(x => x !== l)
      })
    }, l)), /*#__PURE__*/React.createElement(_plenixPlatform.TagInput, {
      label: "Add a language",
      onAdd: text => {
        if (v.languages.indexOf(text) < 0) set({
          languages: v.languages.concat(text)
        });
      }
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Monthly pledge",
      description: "Optional; the family can change it any time"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.NumberInput, {
      value: v.pledge,
      onChange: pledge => set({
        pledge
      }),
      format: "currency",
      currency: "USD",
      min: 0,
      step: 5,
      width: "sm"
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
      label: "List in the parish directory",
      checked: v.directory,
      onChange: e => set({
        directory: e.target.checked
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
      label: "Send the weekly parish newsletter by email",
      checked: v.newsletter,
      onChange: e => set({
        newsletter: e.target.checked
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Notes for the office",
      counter: 300
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Textarea, {
      rows: 3,
      value: v.notes,
      onChange: on('notes')
    }))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.CreatePage, _extends({}, chrome, {
    title: "New member",
    description: "Register a member of the parish. Fields with * are required.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "person",
      onClick: () => setWizard(true)
    }, "Quick visitor"),
    initialValue: BLANK,
    sessionKey: "new-member",
    fields: fields,
    validate: v => {
      const list = problemsOf(v);
      setErrors(list);
      setTried(true);
      return list.length ? 'Check the fields marked below.' : '';
    },
    onSubmit: v => new Promise(resolve => setTimeout(() => resolve(addMember(v)), 300)),
    onSuccess: id => setTimeout(() => screen.navigate('/member/' + id), 0),
    onCancel: () => screen.navigate('/members'),
    strings: {
      create: 'Add member',
      saved: 'Member added'
    }
  })), /*#__PURE__*/React.createElement(VisitorWizard, {
    open: wizard,
    onClose: () => setWizard(false),
    onDone: w => {
      addMember(Object.assign({}, BLANK, {
        first: w.first,
        last: w.last,
        email: w.email,
        membership: 'visitor',
        family: _data.FAMILIES[0].id,
        district: 'North',
        joined: w.visited
      }));
      setWizard(false);
      toast.show(w.first + ' ' + w.last + ' added as a visitor', {
        tone: 'success'
      });
    }
  }));
}
  } },
  "test-site/screens/member-edit.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MemberEditScreen = MemberEditScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Edit member (test-site/screens/member-edit.jsx): the office corrects a member's details.
   An EditPage (FormFlow in edit mode on a page) with FormSections of Fields (Input, Select, Combobox of ministries, Switch);
   useUnsavedGuard asks, naming the member, before the person leaves for another screen with changes not saved. */
const {
  useState,
  useMemo
} = React;
function MemberEditScreen({
  screen,
  chrome
}) {
  const m = (0, _data.memberById)(screen.id);
  const initial = useMemo(() => m ? {
    first: m.first,
    last: m.last,
    email: m.email,
    phone: m.phone,
    status: m.status,
    district: m.district,
    ministries: m.ministries.slice(),
    directory: m.directory !== false
  } : null, [screen.id]);
  const [dirty, setDirty] = useState(false);
  // leaving with changes not saved asks first, naming the member
  (0, _plenixPlatform.useUnsavedGuard)(dirty, 'Your changes to ' + (m ? m.name : 'this member') + ' will be lost.');
  if (!m) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "form"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      kind: "not-found",
      title: "This member is not in the parish list",
      action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => screen.navigate('/members')
      }, "Go to members")
    }, "There is nothing to edit.")));
  }
  const fields = ({
    value: v,
    setValue
  }) => {
    const set = patch => {
      setDirty(true);
      setValue(Object.assign({}, v, patch));
    };
    const on = k => e => set({
      [k]: e.target.value
    });
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Name"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "First name",
      required: true,
      error: v.first.trim() ? undefined : 'Enter the first name'
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      value: v.first,
      onChange: on('first')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Last name",
      required: true,
      error: v.last.trim() ? undefined : 'Enter the last name'
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      value: v.last,
      onChange: on('last')
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Contact"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Email"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "email",
      value: v.email,
      onChange: on('email')
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Phone"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "tel",
      data: true,
      value: v.phone,
      onChange: on('phone')
    }))), /*#__PURE__*/React.createElement(_plenixPlatform.FormSection, {
      title: "Parish"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Status"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: v.status,
      onChange: on('status'),
      options: Object.keys(_data.MEMBER_STATUS).map(k => ({
        value: k,
        label: _data.MEMBER_STATUS[k]
      }))
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "District"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: v.district,
      onChange: on('district'),
      options: ['North', 'South', 'East', 'West'].map(d => ({
        value: d,
        label: d
      }))
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Ministries"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Combobox, {
      multiple: true,
      options: _data.MINISTRIES.map(x => ({
        value: x.id,
        label: x.name,
        group: x.group
      })),
      values: v.ministries,
      onChange: ministries => set({
        ministries
      }),
      placeholder: "Add a ministry"
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
      label: "List in the parish directory",
      checked: v.directory,
      onChange: e => set({
        directory: e.target.checked
      })
    })));
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.EditPage, _extends({}, chrome, {
    title: 'Edit ' + m.name,
    description: "Changes show at once in lists, the directory and the member card.",
    initialValue: initial,
    sessionKey: screen.id,
    fields: fields,
    validate: v => v.first.trim() && v.last.trim() ? '' : 'Enter the first and the last name.',
    onSubmit: v => new Promise(resolve => setTimeout(() => {
      Object.assign(m, v, {
        name: v.first.trim() + ' ' + v.last.trim()
      });
      resolve();
    }, 300)),
    onSuccess: () => {
      setDirty(false);
      setTimeout(() => screen.navigate('/member/' + screen.id), 0);
    },
    onCancel: () => {
      setDirty(false);
      setTimeout(() => screen.navigate('/member/' + screen.id), 0);
    },
    strings: {
      saved: 'Member saved'
    }
  }));
}
  } },
  "test-site/screens/families.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FamiliesScreen = FamiliesScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Families and households (test-site/screens/families.jsx): the households of the parish
   as a list and its detail. A MasterDetailPage: the pane lists the families (a SearchField over a NavList); the detail shows
   the chosen household as a PeopleGroup with an AvatarGroup of its members, the head of household's UserCard and the
   newsletter list with its SelectionSummary; under it every household in a DataGrid in pages mode (fetchRows serves
   the pages, sorted, as a server would), with tall rows and wrapped headers. */
const {
  useState
} = React;
const HOUSEHOLDS = _data.FAMILIES.map(f => ({
  id: f.id,
  name: f.name,
  town: f.address.city,
  district: f.district,
  size: f.members.length,
  since: f.since,
  phone: f.phone,
  street: f.address.line1
}));
const COLUMNS = [{
  title: 'Household',
  field: 'name',
  kind: 'name'
}, {
  title: 'Street address',
  field: 'street'
}, {
  title: 'Town',
  field: 'town'
}, {
  title: 'District',
  field: 'district'
}, {
  title: 'People in the household',
  field: 'size',
  type: 'number',
  kind: 'data'
}, {
  title: 'Parishioners since',
  field: 'since',
  type: 'number',
  kind: 'data'
}, {
  title: 'Home phone',
  field: 'phone',
  kind: 'data'
}];
// the households one page at a time, as the parish server would send them
const fetchHouseholds = ({
  page,
  size,
  sort
}) => new Promise(resolve => {
  const list = HOUSEHOLDS.slice();
  const s = (sort || [])[0];
  if (s) list.sort((a, b) => (a[s.field] < b[s.field] ? -1 : a[s.field] > b[s.field] ? 1 : 0) * (s.dir === 'desc' ? -1 : 1));
  setTimeout(() => resolve({
    rows: list.slice((page - 1) * size, page * size),
    total: list.length
  }), 200);
});
function FamiliesScreen({
  screen,
  chrome
}) {
  const [q, setQ] = useState('');
  const id = screen.params.f || 'f1';
  const fam = (0, _data.familyById)(id) || _data.FAMILIES[0];
  const people = (0, _data.membersOf)(fam.id);
  const head = people.find(p => p.role === 'Head of household') || people[0];
  const [news, setNews] = useState(() => people.filter(p => p.role !== 'Child').map(p => p.id));
  const [newsFor, setNewsFor] = useState(fam.id);
  if (newsFor !== fam.id) {
    setNewsFor(fam.id);
    setNews(people.filter(p => p.role !== 'Child').map(p => p.id));
  }
  const open = fid => screen.navigate('/families', {
    f: fid
  });
  const list = _data.FAMILIES.filter(f => !q.trim() || f.name.toLowerCase().indexOf(q.trim().toLowerCase()) >= 0 || f.address.city.toLowerCase().indexOf(q.trim().toLowerCase()) >= 0);
  return /*#__PURE__*/React.createElement(_plenixPlatform.MasterDetailPage, _extends({}, chrome, {
    paneTitle: "Families",
    detailOpen: !!screen.params.f,
    onBack: () => screen.navigate('/families'),
    pane: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
      value: q,
      onChange: e => setQ(e.target.value),
      onClear: () => setQ(''),
      placeholder: "Find a family or town",
      label: "Find a family"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
      label: "Families",
      value: fam.id,
      onSelect: open,
      items: list.map(f => ({
        id: f.id,
        label: f.name,
        icon: 'home',
        count: f.members.length
      }))
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Families and households",
    description: _data.FAMILIES.length + ' households in the parish. Choose one in the list to see it here.'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: fam.name,
    icon: "home",
    description: fam.address.line1 + ', ' + fam.address.city + ', ' + fam.address.region + ' ' + fam.address.postal,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "open",
      onClick: () => screen.navigate('/family/' + fam.id)
    }, "Open the household")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PeopleGroup, {
    name: fam.name,
    description: fam.district + ' district · parishioners since ' + fam.since,
    count: people.length,
    members: people.map(p => ({
      id: p.id,
      name: p.name
    })),
    strings: {
      team: 'Household'
    },
    href: '#/family/' + fam.id
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Everyone at home"), /*#__PURE__*/React.createElement(_plenixPlatform.AvatarGroup, {
    label: 'Members of ' + fam.name,
    people: people.map(p => ({
      id: p.id,
      name: p.name
    })),
    max: 6,
    size: "md"
  })))), head ? /*#__PURE__*/React.createElement(_plenixPlatform.UserCard, {
    name: head.name,
    secondary: head.role,
    role: head.servant ? 'Servant' : undefined,
    href: '#/member/' + head.id,
    details: [{
      icon: 'mail',
      label: head.email
    }, {
      icon: 'phone',
      label: head.phone,
      data: true
    }, {
      icon: 'home',
      label: fam.address.city
    }],
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "secondary",
      icon: "message",
      onClick: () => screen.navigate('/messages')
    }, "Message"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      icon: "person",
      onClick: () => screen.navigate('/member/' + head.id)
    }, "Profile"))
  }) : null, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Weekly newsletter",
    description: "Who in this household receives the parish newsletter by email."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SelectionSummary, {
    count: news.length,
    total: people.length,
    noun: "person",
    plural: "people",
    onSelectAll: () => setNews(people.map(p => p.id)),
    onClear: () => setNews([])
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Fieldset, {
    legend: "Receives the newsletter",
    hideLegend: true,
    gap: "sm"
  }, people.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    key: p.id,
    label: p.name,
    description: p.email,
    checked: news.indexOf(p.id) >= 0,
    onChange: e => setNews(e.target.checked ? news.concat(p.id) : news.filter(x => x !== p.id))
  }))), people.some(p => p.status !== 'active') ? /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "waiting",
    icon: "clock"
  }, "Check the list"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Some people here are not active members.")) : null)), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Every household",
    description: "All households of the parish, a page at a time.",
    flush: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: "Every household",
    columns: COLUMNS,
    data: [],
    mode: "pages",
    pageSize: 10,
    pageSizes: [10, 20, 50],
    fetchRows: fetchHouseholds,
    rowHeight: "tall",
    wrapHeaders: true,
    onRowClick: h => open(h.id)
  }))));
}
  } },
  "test-site/screens/family.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx","./members.jsx":"test-site/screens/members.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FamilyScreen = FamilyScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
var _members = require("./members.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Household (test-site/screens/family.jsx): one family of the parish. A DetailPage (its
   "On this page" pane links the sections): Breadcrumbs and the household's people as Persona rows with a RoleLabel each;
   the Household section is a Tree of the home (parents, children; choosing a person shows them), Family ties a
   NetworkGraph of the household and the related families in the parish, and Members a static Table. Edit address opens
   a FormFlow in a drawer (edit mode, guarded while it has changes). */
const {
  useState
} = React;
const ROLE = {
  'Head of household': {
    icon: 'home',
    category: 'blue'
  },
  Spouse: {
    icon: 'person',
    category: 'purple'
  },
  Child: {
    icon: 'person',
    category: 'green'
  }
};
const roleLabel = r => /*#__PURE__*/React.createElement(_plenixPlatform.RoleLabel, {
  role: "custom",
  label: r,
  icon: (ROLE[r] || {}).icon || 'person',
  category: (ROLE[r] || {}).category
});
function FamilyScreen({
  screen,
  chrome
}) {
  const fam = (0, _data.familyById)(screen.id);
  const [chosen, setChosen] = useState(null);
  const [editing, setEditing] = useState(false);
  const [, setVersion] = useState(0);
  if (!fam) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "detail"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      kind: "not-found",
      title: "This household is not in the parish list",
      action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => screen.navigate('/families')
      }, "Go to families")
    }, "It may have been merged with another household.")));
  }
  const people = (0, _data.membersOf)(fam.id);
  const parents = people.filter(p => p.role !== 'Child');
  const children = people.filter(p => p.role === 'Child');
  const related = _data.FAMILIES.filter(f => f.last === fam.last && f.id !== fam.id).slice(0, 3);
  const head = parents[0];
  const picked = people.find(p => p.id === chosen);
  const nodes = [{
    id: 'home',
    label: 'Household',
    icon: 'home',
    children: [{
      id: 'parents',
      label: 'Parents',
      icon: 'settings-users',
      children: parents.map(p => ({
        id: p.id,
        label: p.name,
        icon: 'person',
        meta: roleLabel(p.role)
      }))
    }, ...(children.length ? [{
      id: 'children',
      label: 'Children',
      icon: 'settings-users',
      children: children.map(p => ({
        id: p.id,
        label: p.name,
        icon: 'person',
        meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
          variant: "data"
        }, p.born.slice(0, 4))
      }))
    }] : [])]
  }];
  const graphNodes = people.map(p => ({
    id: p.id,
    label: p.first,
    group: 'household'
  })).concat(related.map(f => ({
    id: f.id,
    label: f.last + ' · ' + f.address.city,
    group: 'related'
  })));
  const edges = [];
  if (parents[1]) edges.push({
    source: parents[0].id,
    target: parents[1].id,
    label: 'spouse'
  });
  parents.forEach(p => children.forEach(c => edges.push({
    source: p.id,
    target: c.id,
    label: 'parent of'
  })));
  if (head) related.forEach(f => edges.push({
    source: head.id,
    target: f.id,
    label: 'related',
    kind: 'dashed'
  }));
  const sections = [{
    id: 'household',
    title: 'Household',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Tree, {
      label: 'People of ' + fam.name,
      nodes: nodes,
      selected: chosen,
      onSelect: id => setChosen(people.some(p => p.id === id) ? id : null),
      defaultExpanded: ['home', 'parents', 'children']
    }), picked ? /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "md",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
      name: picked.name,
      secondary: picked.role + ' · ' + picked.email,
      size: "lg"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      icon: "person",
      onClick: () => screen.navigate('/member/' + picked.id)
    }, "Open ", picked.first, "\u2019s record")) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "Choose a person in the tree to see them here."))
  }, {
    id: 'ties',
    title: 'Family ties',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.NetworkGraph, {
      title: 'Family ties of ' + fam.name,
      description: related.length ? 'Dashed lines join the household to related ' + fam.last + ' families in the parish.' : 'No related families in the parish.',
      nodes: graphNodes,
      edges: edges,
      directed: true,
      groups: [{
        id: 'household',
        label: 'This household'
      }, {
        id: 'related',
        label: 'Related families'
      }],
      size: "md",
      onSelect: ({
        node
      }) => node.group === 'related' ? screen.navigate('/family/' + node.id) : screen.navigate('/member/' + node.id)
    })
  }, {
    id: 'members',
    title: 'Members',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Table, {
      label: 'Members of ' + fam.name,
      data: people,
      columns: [{
        title: 'Name',
        field: 'name',
        rowLabel: true,
        render: p => /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
          name: p.name,
          size: "xs",
          href: '#/member/' + p.id
        })
      }, {
        title: 'Place in the household',
        field: 'role',
        render: p => roleLabel(p.role)
      }, {
        title: 'Born',
        field: 'born',
        kind: 'data',
        render: p => p.born.slice(0, 4)
      }, {
        title: 'Status',
        field: 'status',
        render: p => /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
          tone: _members.STATUS_LOOK[p.status].tone,
          icon: _members.STATUS_LOOK[p.status].icon
        }, _data.MEMBER_STATUS[p.status])
      }, {
        title: 'Ministries',
        field: 'ministries',
        kind: 'data',
        render: p => p.ministries.length
      }]
    })
  }];
  return /*#__PURE__*/React.createElement(_plenixPlatform.DetailPage, _extends({}, chrome, {
    title: fam.name,
    description: fam.address.line1 + ', ' + fam.address.city + ', ' + fam.address.region + ' ' + fam.address.postal + ' · ' + fam.district + ' district',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "pencil",
      onClick: () => setEditing(true)
    }, "Edit address"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "add",
      onClick: () => screen.navigate('/members/new')
    }, "Add a member")),
    onBack: () => screen.navigate('/families', {
      f: fam.id
    }),
    strings: {
      sections: 'On this page'
    },
    sections: sections
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Breadcrumbs, {
    items: [{
      label: 'Families and households',
      href: '#/families?f=' + fam.id
    }, {
      label: fam.name
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "lg",
    wrap: true
  }, people.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: p.id,
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Persona, {
    name: p.name,
    secondary: p.phone,
    size: "sm",
    href: '#/member/' + p.id
  }), roleLabel(p.role))))), /*#__PURE__*/React.createElement(_plenixPlatform.FormFlow, {
    mode: "edit",
    surface: "drawer",
    open: editing,
    title: "Household address",
    sessionKey: fam.id,
    initialValue: {
      line1: fam.address.line1,
      city: fam.address.city,
      postal: fam.address.postal,
      phone: fam.phone
    },
    validate: v => v.line1.trim() && v.city.trim() ? '' : 'Enter the street and the town.',
    onSubmit: v => new Promise(resolve => setTimeout(() => {
      Object.assign(fam.address, {
        line1: v.line1.trim(),
        city: v.city.trim(),
        postal: v.postal.trim()
      });
      fam.phone = v.phone;
      resolve();
    }, 300)),
    onSuccess: () => {
      setEditing(false);
      setVersion(n => n + 1);
    },
    onCancel: () => setEditing(false),
    strings: {
      saved: 'Address saved'
    }
  }, ({
    value: v,
    setValue
  }) => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Street",
    required: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoComplete: "address-line1",
    value: v.line1,
    onChange: e => setValue(Object.assign({}, v, {
      line1: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Town",
    required: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    autoComplete: "address-level2",
    value: v.city,
    onChange: e => setValue(Object.assign({}, v, {
      city: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "ZIP code"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    width: "xs",
    data: true,
    inputMode: "numeric",
    value: v.postal,
    onChange: e => setValue(Object.assign({}, v, {
      postal: e.target.value
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Home phone"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    type: "tel",
    data: true,
    value: v.phone,
    onChange: e => setValue(Object.assign({}, v, {
      phone: e.target.value
    }))
  })))));
}
  } },
  "test-site/screens/directory.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectoryScreen = DirectoryScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Directory (test-site/screens/directory.jsx): the parish directory, laid out like the
   printed one. A ListingPage: a FilterBar (town, district) and a DataToolbar (Chip toggles, print); the households as a
   selectable ResourceList a page at a time (Pagination), with BulkActions for mailing labels and a Drawer quick view of a
   household (its people as DataPills); everyone A to Z in a grouped VirtualList; the newest members with LoadMore; and the
   phone list as a DataGrid in load-more mode with medium rows. */
const {
  useState
} = React;
const PER_PAGE = 8;
const TOWNS = [...new Set(_data.FAMILIES.map(f => f.address.city))].sort();
const listed = _data.MEMBERS.filter(m => m.status === 'active' || m.status === 'visitor');
const gender = m => m.sex === 'f' ? 'female' : m.sex === 'm' ? 'male' : undefined;
const PHONE_COLUMNS = [{
  title: 'Name',
  field: 'name',
  kind: 'name'
}, {
  title: 'Phone',
  field: 'phone',
  kind: 'data'
}, {
  title: 'Email',
  field: 'email',
  kind: 'data'
}, {
  title: 'Town',
  field: 'town'
}];
function DirectoryScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [filters, setFilters] = useState({
    town: [],
    district: null
  });
  const [servantsOnly, setServantsOnly] = useState(false);
  const [phones, setPhones] = useState(true);
  const [page, setPage] = useState(1);
  const [sel, setSel] = useState([]);
  const [quick, setQuick] = useState(null);
  const [newShown, setNewShown] = useState(6);
  const [loading, setLoading] = useState(false);
  const families = _data.FAMILIES.filter(f => (!filters.town.length || filters.town.indexOf(f.address.city) >= 0) && (!filters.district || f.district === filters.district) && (!servantsOnly || (0, _data.membersOf)(f.id).some(m => m.servant)));
  const pageCount = Math.max(1, Math.ceil(families.length / PER_PAGE));
  const at = Math.min(page, pageCount);
  const onPage = families.slice((at - 1) * PER_PAGE, at * PER_PAGE);
  const people = listed.filter(m => families.some(f => f.id === m.family) && (!servantsOnly || m.servant));
  const groups = [...new Set(people.map(m => m.last.charAt(0)))].sort().map(l => ({
    id: l,
    label: l,
    items: people.filter(m => m.last.charAt(0) === l).sort((a, b) => a.last + a.first < b.last + b.first ? -1 : 1).map(m => ({
      id: m.id,
      label: m.last + ', ' + m.first,
      description: ((0, _data.familyById)(m.family) || {}).address.city,
      meta: phones ? m.phone : '',
      icon: 'person'
    }))
  }));
  const newest = listed.slice().sort((a, b) => a.joined < b.joined ? 1 : -1);
  const phoneRows = people.map(m => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    email: m.email,
    town: ((0, _data.familyById)(m.family) || {}).address.city
  }));
  const quickFam = quick && (0, _data.familyById)(quick);
  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setNewShown(n => n + 6);
      setLoading(false);
    }, 300);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.ListingPage, _extends({}, chrome, {
    title: "Parish directory",
    description: "Households and members who chose to be listed. The office prints it each Nayrouz.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "document",
      onClick: () => toast.show('The directory is ready to print')
    }, "Print the directory"),
    empty: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      as: "p",
      variant: "secondary"
    }, "To correct a listing, or to leave the directory, ask the church office.")
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FilterBar, {
    label: "Directory filters",
    onChange: (id, value) => {
      setFilters(Object.assign({}, filters, {
        [id]: value
      }));
      setPage(1);
    },
    onClearAll: () => {
      setFilters({
        town: [],
        district: null
      });
      setPage(1);
    },
    filters: [{
      id: 'town',
      label: 'Town',
      multiple: true,
      value: filters.town,
      options: TOWNS.map(t => ({
        value: t,
        label: t,
        count: _data.FAMILIES.filter(f => f.address.city === t).length
      }))
    }, {
      id: 'district',
      label: 'District',
      value: filters.district,
      options: ['North', 'South', 'East', 'West'].map(d => ({
        value: d,
        label: d,
        count: _data.FAMILIES.filter(f => f.district === d).length
      }))
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.DataToolbar, {
    label: "Directory view",
    start: /*#__PURE__*/React.createElement(_plenixPlatform.TagList, {
      label: "Show"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Chip, {
      selected: servantsOnly,
      onClick: () => {
        setServantsOnly(!servantsOnly);
        setPage(1);
      }
    }, "Servants only"), /*#__PURE__*/React.createElement(_plenixPlatform.Chip, {
      selected: phones,
      onClick: () => setPhones(!phones)
    }, "Phone numbers")),
    end: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, families.length, " households \xB7 ", people.length, " people")
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Households",
    description: "Choose households to print mailing labels; open one for a quick look."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.BulkActions, {
    count: sel.length,
    total: families.length,
    noun: "household",
    onSelectAll: () => setSel(families.map(f => f.id)),
    onClear: () => setSel([]),
    actions: [{
      id: 'labels',
      label: 'Print mailing labels',
      icon: 'document',
      onSelect: () => toast.show(sel.length + ' mailing labels are ready to print')
    }, {
      id: 'email',
      label: 'Email households',
      icon: 'mail',
      onSelect: () => toast.show('A new email to ' + sel.length + ' households is ready in Messages')
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ResourceList, {
    label: "Households",
    noun: "household",
    selectable: true,
    selected: sel,
    onSelectionChange: setSel,
    emptyState: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "No household matches the filters."),
    items: onPage.map(f => ({
      id: f.id,
      name: f.name,
      description: f.address.line1 + ', ' + f.address.city,
      onOpen: () => setQuick(f.id),
      avatar: {
        name: f.last
      },
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.DataPill, {
        icon: "settings-users",
        data: true
      }, f.members.length)
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Pagination, {
    page: at,
    pageCount: pageCount,
    onPageChange: setPage,
    total: families.length,
    perPage: PER_PAGE,
    label: "Household pages"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Everyone, A to Z"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.VirtualList, {
    label: "Everyone in the directory",
    groups: groups,
    height: "lg",
    showCount: true,
    onItemOpen: item => screen.navigate('/member/' + item.id)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Newest members",
    description: "Welcome them after the Divine Liturgy."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ResourceList, {
    label: "Newest members",
    noun: "member",
    items: newest.slice(0, newShown).map(m => ({
      id: m.id,
      name: m.name,
      href: '#/member/' + m.id,
      description: ((0, _data.familyById)(m.family) || {}).name,
      avatar: {
        name: m.name,
        gender: gender(m)
      },
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.DataPill, {
        icon: "calendar",
        tone: "green",
        data: true
      }, m.joined)
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.LoadMore, {
    onLoadMore: loadMore,
    loading: loading,
    hasMore: newShown < newest.length,
    shown: Math.min(newShown, newest.length),
    total: newest.length,
    pageSize: 6
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Phone list",
    flush: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: "Phone list",
    data: phoneRows,
    columns: PHONE_COLUMNS,
    mode: "load-more",
    pageSize: 25,
    rowHeight: "medium",
    hiddenColumns: phones ? [] : ['phone'],
    onRowClick: m => screen.navigate('/member/' + m.id)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Drawer, {
    open: !!quickFam,
    onClose: () => setQuick(null),
    title: quickFam ? quickFam.name : '',
    size: "sm",
    footer: quickFam ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "open",
      onClick: () => screen.navigate('/family/' + quickFam.id)
    }, "Open the household") : null
  }, quickFam ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, {
    layout: "stacked"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Address"
  }, quickFam.address.line1, ", ", quickFam.address.city, ", ", quickFam.address.region, " ", quickFam.address.postal), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Home phone",
    data: true
  }, quickFam.phone), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "District"
  }, quickFam.district)), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "People"), (0, _data.membersOf)(quickFam.id).map(m => /*#__PURE__*/React.createElement(_plenixPlatform.DataPill, {
    key: m.id,
    gender: gender(m),
    person: true
  }, m.name))), /*#__PURE__*/React.createElement(_plenixPlatform.StatusIcon, {
    tone: "success",
    size: "sm"
  }, "Listed in the directory")) : null));
}
  } },
  "test-site/screens/ministries.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinistriesScreen = MinistriesScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Ministries and services (test-site/screens/ministries.jsx): every ministry of the
   parish as a card (Card with its icon beside the title, in a ContentGrid), the ways to get involved (FeatureCard), how the
   ministries report to the clergy (Diagram, boxes and arrows), how many servants each ministry has (Treemap), and the
   classes and groups of every ministry to browse (MillerColumns) or choose in a form (Cascader, TreeSelect).
   Plenix parts: SitePage, PageContent, RecordPage.Header, Pictogram, ContentGrid, Card, FeatureCard, Diagram, Treemap,
   MillerColumns, Cascader, TreeSelect, Panel, Field, Columns, Stack, Inline, Text, Count, Heading, Select. */

const {
  useState,
  useMemo
} = React;

// the classes of each ministry and the groups in each class (made up); a ministry without classes meets as one group
const CLASSES = {
  'sunday-school': [['Kindergarten', 'Ages 4–5'], ['Grades 1–2', 'Ages 6–7'], ['Grades 3–4', 'Ages 8–9'], ['Grades 5–6', 'Ages 10–11'], ['Middle school', 'Grades 7–8'], ['High school', 'Grades 9–12']],
  'youth': [['Middle school youth', 'Grades 7–8'], ['High school youth', 'Grades 9–12'], ['College and young adults', 'Ages 18–30']],
  'deacons': [['Beginners', 'Learning the responses'], ['Readers', 'Epistles and the Psalm'], ['Hymn chanters', 'The hymns of the seasons']],
  'choir': [['Children’s choir', 'Ages 7–12'], ['Adult choir', 'Ages 13 and up']],
  'bible-study': [['Wednesday study', 'The Gospel of St. John'], ['Women’s study', 'The Book of Ruth']]
};
const GROUPS = {
  'sunday-school': ['St. Mary group', 'St. Mark group'],
  'youth': ['St. George group', 'St. Demiana group']
};
const MINISTRY_TREE = _data.MINISTRIES.map(m => ({
  id: m.id,
  label: m.name,
  icon: m.icon,
  description: m.group,
  children: (CLASSES[m.id] || [['Servants', m.meets]]).map(([name, detail], i) => ({
    id: m.id + '-c' + i,
    label: name,
    description: detail,
    children: (GROUPS[m.id] || ['Main group']).map((g, j) => ({
      id: m.id + '-c' + i + '-g' + j,
      label: g,
      description: name
    }))
  }))
}));
const findNode = (id, list = MINISTRY_TREE, trail = []) => {
  for (const n of list) {
    if (n.id === id) return {
      node: n,
      trail: trail.concat(n)
    };
    if (n.children) {
      const f = findNode(id, n.children, trail.concat(n));
      if (f) return f;
    }
  }
  return null;
};
const AREAS = [...new Set(_data.MINISTRIES.map(m => m.group))];
// who each ministry reports to: education and worship to the parish priest, the rest to the associate priest
const reportsTo = m => m.group === 'Education' || m.group === 'Worship' ? _data.CLERGY[0].id : _data.CLERGY[1].id;
function MinistriesScreen({
  chrome
}) {
  const [area, setArea] = useState('all');
  const [path, setPath] = useState(['sunday-school', 'sunday-school-c2']);
  const [myClass, setMyClass] = useState('sunday-school-c2-g0');
  const [serving, setServing] = useState(['sunday-school-c2-g0', 'choir-c1-g0']);
  const shown = _data.MINISTRIES.filter(m => area === 'all' || m.group === area);
  const servants = _data.MINISTRIES.reduce((n, m) => n + m.servants, 0);
  const diagram = useMemo(() => ({
    groups: [{
      id: 'clergy',
      label: 'Clergy'
    }].concat(AREAS.map(a => ({
      id: a,
      label: a
    }))),
    nodes: _data.CLERGY.map(c => ({
      id: c.id,
      label: c.name,
      detail: c.role,
      group: 'clergy'
    })).concat(_data.MINISTRIES.map(m => ({
      id: m.id,
      label: m.name,
      detail: 'Led by ' + m.lead,
      group: m.group
    }))),
    edges: _data.MINISTRIES.map(m => ({
      source: reportsTo(m),
      target: m.id
    }))
  }), []);
  const treemap = AREAS.map(a => ({
    label: a,
    children: _data.MINISTRIES.filter(m => m.group === a).map(m => ({
      label: m.name,
      value: m.servants
    }))
  }));
  const chosen = findNode(myClass);
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "section"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Ministries and services",
    headingLevel: 1,
    media: /*#__PURE__*/React.createElement(_plenixPlatform.Pictogram, {
      icon: "settings-users",
      size: "48"
    }),
    description: 'Twelve ministries serve the parish. ' + servants + ' places are held by servants, many of whom serve in more than one ministry.',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Area",
      layout: "inline"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: area,
      onChange: e => setArea(e.target.value),
      options: [{
        value: 'all',
        label: 'Every area'
      }].concat(AREAS.map(a => ({
        value: a,
        label: a
      })))
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Our ministries"), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "lg",
    label: "Ministries"
  }, shown.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.Card, {
    key: m.id,
    icon: m.icon,
    title: m.name,
    meta: m.meets,
    href: '#/ministry/' + m.id
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Led by ", m.lead, " \xB7 ", m.group), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Count, {
    value: m.members,
    label: m.members + ' members'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "members"), /*#__PURE__*/React.createElement(_plenixPlatform.Count, {
    value: m.servants,
    label: m.servants + ' servants'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "servants"))))))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Get involved"), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Ways to serve"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FeatureCard, {
    icon: "checklist",
    hue: "green",
    title: "Sign up to serve",
    description: "Choose a Sunday and a place: ushers, readers, the Agape kitchen.",
    href: "#/servants"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.FeatureCard, {
    icon: "calendar",
    hue: "blue",
    title: "See what is coming",
    description: "Services, classes and feasts on the parish calendar.",
    href: "#/calendar"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.FeatureCard, {
    icon: "schedule",
    hue: "purple",
    title: "Help plan the feast",
    description: "The festival of St. John the Beloved needs servants for every part.",
    href: "#/planning"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Diagram, {
    variant: "boxes",
    direction: "right",
    title: "How the ministries report to the clergy",
    description: "Education and worship ministries report to the parish priest; fellowship, care and outreach to the associate priest.",
    groups: diagram.groups,
    nodes: diagram.nodes,
    edges: diagram.edges
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Treemap, {
    title: "Servants by ministry",
    valueTitle: "Servants",
    data: treemap,
    description: "The Food Pantry and the Agape Kitchen hold the most servants; every one of their members serves."
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Classes and groups"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Choose a ministry, then a class, to see its groups."), /*#__PURE__*/React.createElement(_plenixPlatform.MillerColumns, {
    label: "Ministries",
    items: MINISTRY_TREE,
    path: path,
    onPathChange: p => setPath(p),
    renderPreview: item => {
      const f = findNode(item.id);
      return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "strong"
      }, item.label), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, f ? f.trail.slice(0, -1).map(n => n.label).join(' / ') : ''), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Meets with the class: ", item.description));
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Where do you serve?",
    description: "The office keeps each servant\u2019s class and every ministry they help in."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "medium"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Your class",
    description: chosen ? chosen.trail.map(n => n.label).join(' / ') : 'No class chosen'
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Cascader, {
    options: MINISTRY_TREE,
    value: myClass,
    onChange: id => setMyClass(id),
    searchable: true
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Every group you help",
    description: serving.length + (serving.length === 1 ? ' group' : ' groups')
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TreeSelect, {
    multiple: true,
    search: true,
    nodes: MINISTRY_TREE,
    values: serving,
    onChange: ids => setServing(ids),
    width: "fill"
  }))))))));
}
  } },
  "test-site/screens/ministry.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinistryScreen = MinistryScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · one ministry (test-site/screens/ministry.jsx), opened at #/ministry/<id> (Sunday School
   by default): its header (the ministry's kind as an IconTile, the documented media of a record header), the servants it
   still needs (ProgressBar, Count, ContextualHelp), the meeting details (Popover, Tooltip), the order of its classes
   (SortableList) and of this Sunday's lesson plan (useSortable with a DragHandle per row), this month's lessons
   (CollapsibleSection with ShowMore) and how classes are grouped (Details).
   Plenix parts: SitePage, PageContent, RecordPage, IconTile, Panel, ProgressBar, Count, ContextualHelp, Popover, Tooltip,
   Button, SortableList, DragHandle, useSortable, CollapsibleSection, ShowMore, Details, List, Columns, Stack, Inline, Text,
   EmptyState, Link. */
const {
  useState
} = React;

// Sunday School's classes (made up); the other ministries show one class
const CLASS_LIST = {
  'sunday-school': [{
    id: 'k',
    name: 'Kindergarten',
    detail: 'Ages 4–5 · Room 101',
    servants: 3,
    needed: 3
  }, {
    id: 'g12',
    name: 'Grades 1–2',
    detail: 'Ages 6–7 · Room 102',
    servants: 3,
    needed: 4
  }, {
    id: 'g34',
    name: 'Grades 3–4',
    detail: 'Ages 8–9 · Room 103',
    servants: 2,
    needed: 4
  }, {
    id: 'g56',
    name: 'Grades 5–6',
    detail: 'Ages 10–11 · Room 104',
    servants: 4,
    needed: 4
  }, {
    id: 'ms',
    name: 'Middle school',
    detail: 'Grades 7–8 · Library',
    servants: 3,
    needed: 4
  }, {
    id: 'hs',
    name: 'High school',
    detail: 'Grades 9–12 · Youth room',
    servants: 3,
    needed: 5
  }]
};
const LESSONS = [{
  id: 'l1',
  date: 'Nov 1',
  title: 'St. John the Beloved at the Last Supper'
}, {
  id: 'l2',
  date: 'Nov 8',
  title: 'The wedding at Cana'
}, {
  id: 'l3',
  date: 'Nov 15',
  title: 'The Good Shepherd'
}, {
  id: 'l4',
  date: 'Nov 22',
  title: 'Getting ready for the Nativity Fast'
}, {
  id: 'l5',
  date: 'Nov 29',
  title: 'The prophets who waited'
}, {
  id: 'l6',
  date: 'Dec 6',
  title: 'Hymns of Kiahk: the Theotokia'
}];
const PLAN = [{
  id: 'p1',
  name: 'Opening prayer from the Agpeya'
}, {
  id: 'p2',
  name: 'Hymn practice'
}, {
  id: 'p3',
  name: 'The lesson'
}, {
  id: 'p4',
  name: 'Craft: a paper icon'
}, {
  id: 'p5',
  name: 'Closing prayer and snack'
}];
function MinistryScreen({
  screen,
  chrome
}) {
  const m = _data.MINISTRIES.find(x => x.id === (screen.id || 'sunday-school'));
  const toast = (0, _plenixPlatform.useToast)();
  const [classes, setClasses] = useState(() => CLASS_LIST[m ? m.id : ''] || (m ? [{
    id: 'all',
    name: m.name,
    detail: m.meets,
    servants: m.servants,
    needed: m.servants
  }] : []));
  const [plan, setPlan] = useState(PLAN);
  const [allLessons, setAllLessons] = useState(false);
  const sortable = (0, _plenixPlatform.useSortable)({
    items: plan,
    onReorder: next => setPlan(next),
    getName: x => x.name,
    label: 'This Sunday’s plan'
  });
  if (!m) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "detail"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      size: "page",
      kind: "not-found",
      title: "This ministry is not in the parish list",
      action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => screen.navigate('/ministries')
      }, "Every ministry")
    }, "Choose one from the ministries page.")));
  }
  const have = classes.reduce((n, c) => n + c.servants, 0),
    need = classes.reduce((n, c) => n + c.needed, 0);
  const open = _data.SERVING_SLOTS.filter(s => s.ministry === m.id);
  const lessons = allLessons ? LESSONS : LESSONS.slice(0, 3);
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "detail"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage, {
    header: /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: m.name,
      media: /*#__PURE__*/React.createElement(_plenixPlatform.IconTile, {
        icon: m.icon,
        hue: "green",
        size: "lg"
      }),
      description: 'Led by ' + m.lead + '. Meets ' + m.meets + '.',
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, m.group), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Count, {
        value: m.members,
        label: m.members + ' members'
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, "members"))),
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Popover, {
        title: "Meeting details",
        closeButton: true,
        trigger: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
          icon: "clock",
          caret: true
        }, "Meeting details")
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, m.meets), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, "After the Divine Liturgy, in the classrooms of the education wing."), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "secondary"
      }, "Questions: write to ", m.lead, " through the church office."))), /*#__PURE__*/React.createElement(_plenixPlatform.Tooltip, {
        content: "Send a reminder to every servant of this ministry"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        icon: "mail",
        onClick: () => toast.show('Reminder sent to the ' + m.name + ' servants', {
          tone: 'success'
        })
      }, "Remind servants")))
    }),
    aside: /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
      title: "Open places",
      description: "Sign-ups that still need servants."
    }, open.length ? /*#__PURE__*/React.createElement(_plenixPlatform.List, {
      items: open.map(s => ({
        icon: 'checklist',
        children: s.role + ' · ' + s.date + ' · ' + s.signed.length + ' of ' + s.needed
      }))
    }) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "Every place is taken."), /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
      href: "#/servants"
    }, "See every sign-up"))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Servants",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.ContextualHelp, {
      title: "Servants needed"
    }, "Each class keeps one servant for every six children, and never fewer than two in the room.")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
    value: have,
    max: need,
    label: "Servants for this year",
    showValue: true,
    tone: have >= need ? 'success' : 'warning'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Count, {
    value: need - have,
    label: need - have + ' servants still needed'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "servants still needed across ", classes.length, " classes")))), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Class order",
    description: "The order the classes are listed in the bulletin and on the sign-up sheet."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SortableList, {
    label: "Classes",
    items: classes,
    onReorder: next => setClasses(next),
    renderItem: c => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "none"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, c.name), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, c.detail, " \xB7 ", c.servants, " of ", c.needed, " servants"))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "This Sunday\u2019s plan",
    description: "Drag a part by its handle, or press Space on the handle and use the arrow keys."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, _extends({
    as: "ol",
    gap: "xs"
  }, sortable.listProps, {
    "aria-label": "This Sunday\u2019s plan"
  }), plan.map((p, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, _extends({
    as: "li",
    key: p.id,
    gap: "sm"
  }, sortable.itemProps(i)), /*#__PURE__*/React.createElement(_plenixPlatform.DragHandle, {
    dnd: sortable.handleProps(i),
    label: 'Move ' + p.name
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, i + 1, ". ", p.name)))))), /*#__PURE__*/React.createElement(_plenixPlatform.CollapsibleSection, {
    title: "Lessons this month",
    icon: "text-card"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.List, {
    items: lessons.map(l => ({
      icon: 'calendar',
      children: l.date + ': ' + l.title
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ShowMore, {
    expanded: allLessons,
    count: LESSONS.length - 3,
    onToggle: next => setAllLessons(next)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Details, {
    summary: "How are the classes grouped?"
  }, "Children are placed by their school grade in September. Each class splits into two groups named for saints when it has more than twelve children, so every child is known by name.")))));
}
  } },
  "test-site/screens/servants.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServantsScreen = ServantsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Servants and sign-ups (test-site/screens/servants.jsx): the serving places of the
   coming days (SERVING_SLOTS) with how full each is, the servants assigned to one place (TransferList) and its lead
   (AssignControl), removing a servant with Undo (useUndo), what a new servant does before serving (Checklist), sign-up
   requests waiting for the office (ReviewQueue, WorkflowStatus), a new servant's approval by the ministry lead, the office
   and the priest (ApprovalWorkflow), and the page's actions (ActionBar).
   Plenix parts: SitePage, PageContent, RecordPage.Header, Panel, Columns, Stack, Inline, Text, ProgressBar, Select, Field,
   TransferList, AssignControl, Button, useUndo, useToast, Checklist, ReviewQueue, WorkflowStatus, ApprovalWorkflow,
   ActionBar, RowButton. */

const {
  useState
} = React;
const SERVANTS = _data.MEMBERS.filter(m => m.servant);
const day = iso => new Date(iso + 'T00:00');
const ministryName = id => (_data.MINISTRIES.find(m => m.id === id) || {}).name || '';
const STEPS_BEFORE = [{
  id: 'prep',
  label: 'Attend Servants’ Preparation',
  description: 'Four Tuesday evenings with Fr. Daniel Boulos.'
}, {
  id: 'safety',
  label: 'Finish the child safety course',
  description: 'Online, about an hour; the office keeps the certificate.'
}, {
  id: 'conduct',
  label: 'Sign the servants’ code of conduct',
  description: 'In the church office or at the bookstore table.'
}, {
  id: 'shadow',
  label: 'Serve once beside an experienced servant',
  description: 'Choose any open place below.'
}];
const FIRST_REQUESTS = [{
  id: 'rq1',
  name: 'Usher · Nov 1, Divine Liturgy',
  type: 'Ushers',
  submittedBy: 'Peter Habib',
  submitted: '2026-10-22',
  status: 'in-review'
}, {
  id: 'rq2',
  name: 'Agape kitchen · Nov 1',
  type: 'Agape Kitchen',
  submittedBy: 'Martha Fahmy',
  submitted: '2026-10-23',
  status: 'in-review'
}, {
  id: 'rq3',
  name: 'Sound desk · Nov 1',
  type: 'Media and Sound',
  submittedBy: 'Fady Mikhail',
  submitted: '2026-10-23',
  status: 'in-review'
}, {
  id: 'rq4',
  name: 'Food pantry: sorting · Oct 31',
  type: 'Food Pantry',
  submittedBy: 'Sophia Ibrahim',
  submitted: '2026-10-24',
  status: 'in-review'
}, {
  id: 'rq5',
  name: 'Visitation: hospital · Nov 3',
  type: 'Visitation',
  submittedBy: 'Hany Boutros',
  submitted: '2026-10-24',
  status: 'changes-requested'
}];
const FIRST_APPROVAL = [{
  id: 'lead',
  label: 'Ministry lead',
  reviewers: [{
    id: 'r-marina',
    name: 'Marina Girgis',
    decision: 'approved'
  }],
  history: [{
    id: 'h1',
    name: 'Marina Girgis',
    decision: 'approved',
    comment: 'She helped in Grades 3–4 all summer.',
    time: 'Oct 20',
    dateTime: '2026-10-20'
  }]
}, {
  id: 'office',
  label: 'Church office',
  reviewers: [{
    id: _data.ME.id,
    name: _data.ME.name
  }],
  history: []
}, {
  id: 'priest',
  label: 'Parish priest',
  reviewers: [{
    id: 'c1',
    name: 'Fr. Daniel Boulos'
  }],
  history: []
}];
function ServantsScreen({
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const undoable = (0, _plenixPlatform.useUndo)();
  const [slots, setSlots] = useState(() => _data.SERVING_SLOTS.map(s => ({
    ...s,
    lead: s.signed[0] || null
  })));
  const [current, setCurrent] = useState('sl1');
  const [done, setDone] = useState(['prep']);
  const [requests, setRequests] = useState(FIRST_REQUESTS);
  const [approval, setApproval] = useState(FIRST_APPROVAL);
  const slot = slots.find(s => s.id === current);
  const update = (id, change) => setSlots(list => list.map(s => s.id === id ? {
    ...s,
    ...change
  } : s));
  const people = SERVANTS.concat(slot.signed.filter(id => !SERVANTS.some(m => m.id === id)).map(_data.memberById).filter(Boolean));
  const remove = memberId => {
    const before = slot.signed,
      who = (0, _data.memberById)(memberId);
    update(slot.id, {
      signed: before.filter(x => x !== memberId),
      lead: slot.lead === memberId ? null : slot.lead
    });
    undoable((who ? who.name : 'The servant') + ' removed from ' + slot.role, {
      onUndo: () => update(slot.id, {
        signed: before,
        lead: slot.lead
      })
    });
  };
  const decideRequests = (ids, decision) => setRequests(list => list.map(r => ids.indexOf(r.id) >= 0 ? {
    ...r,
    status: decision
  } : r));
  const waiting = requests.filter(r => r.status === 'in-review').length;
  const decideApproval = ({
    stepId,
    reviewerId,
    decision,
    comment
  }) => setApproval(steps => steps.map(s => s.id !== stepId ? s : {
    ...s,
    reviewers: s.reviewers.map(r => r.id === reviewerId ? {
      ...r,
      decision
    } : r),
    history: [{
      id: 'h' + Date.now(),
      name: _data.ME.name,
      decision,
      comment,
      time: 'Today',
      dateTime: '2026-10-25'
    }].concat(s.history)
  }));
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Servants and sign-ups",
    headingLevel: 1,
    description: SERVANTS.length + ' servants serve the parish. Fill the open places of the coming week, and approve the new sign-ups.'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-start",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Open places",
    description: "Choose a place to see who serves there.",
    flush: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    as: "ul",
    gap: "none",
    "aria-label": "Serving places"
  }, slots.map(s => /*#__PURE__*/React.createElement("li", {
    key: s.id
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, {
    selected: s.id === current,
    onClick: () => setCurrent(s.id)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    inset: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, s.role), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, (0, _plenixPlatform.formatDate)(day(s.date)), " \xB7 ", s.time, " \xB7 ", ministryName(s.ministry)), /*#__PURE__*/React.createElement(_plenixPlatform.ProgressBar, {
    value: Math.min(s.signed.length, s.needed),
    max: s.needed,
    size: "sm",
    tone: s.signed.length >= s.needed ? 'success' : 'warning',
    label: s.signed.length + ' of ' + s.needed + ' servants'
  }))))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: slot.role,
    description: (0, _plenixPlatform.formatDate)(day(slot.date)) + ' at ' + slot.time + ' · ' + ministryName(slot.ministry),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Place",
      hideLabel: true
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: current,
      onChange: e => setCurrent(e.target.value),
      options: slots.map(s => ({
        value: s.id,
        label: s.role + ' · ' + s.date
      }))
    }))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.AssignControl, {
    label: "Lead servant",
    me: _data.ME.id,
    value: slot.lead,
    people: people.filter(p => slot.signed.indexOf(p.id) >= 0 || p.id === _data.ME.id).map(p => ({
      value: p.id,
      label: p.name,
      description: p.district + ' district'
    })),
    onChange: value => update(slot.id, {
      lead: value
    })
  }), /*#__PURE__*/React.createElement(_plenixPlatform.TransferList, {
    label: 'Servants for ' + slot.role,
    search: true,
    size: "sm",
    titles: {
      source: 'Servants',
      target: 'Serving here (' + slot.signed.length + ' of ' + slot.needed + ')'
    },
    options: people.map(p => ({
      value: p.id,
      label: p.name,
      meta: p.id
    })),
    value: slot.signed,
    onChange: values => update(slot.id, {
      signed: values
    })
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Serving here"), slot.signed.length ? slot.signed.map(id => {
    const who = (0, _data.memberById)(id);
    return /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      key: id,
      gap: "sm",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, who ? who.name : id, slot.lead === id ? ' · lead' : ''), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "xs",
      variant: "ghost",
      icon: "trash",
      onClick: () => remove(id),
      label: 'Remove ' + (who ? who.name : id)
    }, "Remove"));
  }) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Nobody yet."))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Sign-up requests",
    description: "Servants who asked for a place. Select requests to approve them, ask for changes or turn them down.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.WorkflowStatus, {
      status: "in-review",
      label: waiting + ' waiting'
    }), /*#__PURE__*/React.createElement(_plenixPlatform.WorkflowStatus, {
      status: "approved",
      label: requests.filter(r => r.status === 'approved').length + ' approved'
    }))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ReviewQueue, {
    label: "Sign-up requests",
    noun: "request",
    items: requests,
    onDecision: (ids, decision) => decideRequests(ids, decision)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Before you serve",
    description: "What every new servant finishes before serving alone."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Checklist, {
    title: "New servant steps",
    items: STEPS_BEFORE,
    completed: done,
    onChange: ids => setDone(ids)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "New servant: Mariam Fahmy",
    description: "Asked to serve in Sunday School, Grades 3\u20134."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ApprovalWorkflow, {
    title: "Sunday School servant",
    steps: approval,
    reviewerId: _data.ME.id,
    onDecision: decideApproval
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.ActionBar, {
    label: "Sign-up actions"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "download-arrow",
    onClick: () => toast.show('The serving schedule is ready to print')
  }, "Print the schedule"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "mail",
    onClick: () => toast.show('Reminders sent to ' + slots.reduce((n, s) => n + s.signed.length, 0) + ' servants', {
      tone: 'success'
    })
  }, "Send reminders")))));
}
  } },
  "test-site/screens/calendar.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalendarScreen = CalendarScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Calendar (test-site/screens/calendar.jsx): the parish's events, weekly services and
   the feasts and fasts of the liturgical calendar, as a month (Calendar with the chosen day's events), a week (TimeGrid of
   EventChips under DateBadges) or an agenda (DateBadge and EventChip rows), switched by a SegmentedControl. The chosen
   event shows beside the calendar (SplitView with a ReadingPane); on a narrow window it opens in a Sheet instead.
   Plenix parts: SitePage, PageContent, SplitView, ReadingPane, SegmentedControl, Calendar, TimeGrid, EventChip, DateBadge,
   Sheet, Heading, Stack, Inline, Text, Badge, Button, EmptyState, below (the narrow window class). */

const {
  useState,
  useEffect
} = React;
const TODAY = '2026-10-25';
const pad = n => String(n).padStart(2, '0');
const isoOf = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const dateOf = iso => new Date(iso.slice(0, 10) + 'T00:00');
const hourOf = t => Number(t.slice(11, 13)) + Number(t.slice(14, 16)) / 60;
const weekday = d => new Intl.DateTimeFormat('en-US', {
  weekday: 'short'
}).format(d);
// the data's colors that the event chip has no hue for take the nearest data color
const HUE = {
  orange: 'brown',
  teal: 'blue'
};
const hue = c => HUE[c] || c;
// every dated thing of the calendar: the events, and the feasts and fasts as all-day items
const ITEMS = _data.EVENTS.map(e => ({
  ...e,
  date: e.start.slice(0, 10),
  color: hue(e.color),
  kind: 'event'
})).concat(_data.FEASTS.map(f => ({
  id: f.id,
  title: f.title,
  date: f.date,
  kind: f.kind,
  color: f.kind === 'fast' ? 'purple' : 'red',
  place: 'The whole Church'
}))).sort((a, b) => (a.date + (a.start || '')).localeCompare(b.date + (b.start || '')));
const timeText = e => e.start ? (0, _plenixPlatform.formatTime)(new Date(e.start)) + '–' + (0, _plenixPlatform.formatTime)(new Date(e.end)) : 'All day';
function useNarrow() {
  const query = (0, _plenixPlatform.below)('--plx-sys-shell-phone-below');
  const get = () => typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : false;
  const [narrow, setNarrow] = useState(get);
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(query),
      on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return narrow;
}
function EventDetail({
  item,
  onOpen
}) {
  const ministry = _data.MINISTRIES.find(m => m.id === item.ministry);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DateBadge, {
    day: dateOf(item.date).getDate(),
    weekday: weekday(dateOf(item.date)),
    dateTime: item.date,
    today: item.date === TODAY
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "none"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, (0, _plenixPlatform.formatDate)(dateOf(item.date), {
    dateStyle: 'full'
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, timeText(item)))), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Place: ", item.place), ministry ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Ministry: ", ministry.name) : null, item.kind !== 'event' ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "A ", item.kind === 'fast' ? 'fast' : item.kind === 'season' ? 'season' : 'feast', " of the Coptic Orthodox Church.") : null, item.rsvp ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, item.rsvp, " people are coming.") : null, item.kind === 'event' ? /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "open",
    onClick: onOpen
  }, "Open the event")) : null);
}
function CalendarScreen({
  screen,
  chrome
}) {
  const narrow = useNarrow();
  const [view, setView] = useState('month');
  const [dayIso, setDayIso] = useState(TODAY);
  const [chosen, setChosen] = useState(null);
  const item = ITEMS.find(x => x.id === chosen);
  const pick = id => setChosen(id);
  const openEvent = () => screen.navigate('/event/' + item.id);

  // the week (Sunday to Saturday) around the chosen day
  const first = dateOf(dayIso);
  first.setDate(first.getDate() - first.getDay());
  const week = Array.from({
    length: 7
  }, (_, i) => {
    const d = new Date(first);
    d.setDate(first.getDate() + i);
    return d;
  });
  const days = week.map(d => ({
    key: isoOf(d),
    weekday: weekday(d),
    day: d.getDate(),
    dateTime: isoOf(d),
    today: isoOf(d) === TODAY
  }));
  const keys = days.map(d => d.key);
  const weekEvents = _data.EVENTS.filter(e => keys.indexOf(e.start.slice(0, 10)) >= 0).map(e => ({
    id: e.id,
    day: e.start.slice(0, 10),
    start: hourOf(e.start),
    end: e.end.slice(0, 10) === e.start.slice(0, 10) ? hourOf(e.end) : 22,
    title: e.title,
    time: (0, _plenixPlatform.formatTime)(new Date(e.start)),
    color: hue(e.color),
    onClick: () => pick(e.id)
  }));
  const onDay = ITEMS.filter(x => x.date === dayIso);
  const upcoming = ITEMS.filter(x => x.date >= TODAY);
  const views = /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "md",
    justify: "between",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Calendar"), /*#__PURE__*/React.createElement(_plenixPlatform.SegmentedControl, {
    label: "Calendar view",
    value: view,
    onChange: setView,
    options: [{
      value: 'month',
      label: 'Month',
      icon: 'calendar'
    }, {
      value: 'week',
      label: 'Week',
      icon: 'grid-3x2'
    }, {
      value: 'agenda',
      label: 'Agenda',
      icon: 'list-lines'
    }]
  })), view === 'month' ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Calendar, {
    label: "Parish calendar",
    value: dayIso,
    onChange: d => setDayIso(d),
    today: TODAY
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, (0, _plenixPlatform.formatDate)(dateOf(dayIso), {
    dateStyle: 'full'
  })), onDay.length ? onDay.map(x => /*#__PURE__*/React.createElement(_plenixPlatform.EventChip, {
    key: x.id,
    title: x.title,
    time: timeText(x),
    color: x.color,
    onClick: () => pick(x.id)
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Nothing on this day. The weekly services: ", _data.SERVICES.map(s => s.title + ' (' + s.day + ')').join(', '), "."))) : null, view === 'week' ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "chevron-left",
    iconOnly: true,
    label: "Previous week",
    onClick: () => setDayIso(isoOf(new Date(first.getFullYear(), first.getMonth(), first.getDate() - 7)))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    onClick: () => setDayIso(TODAY)
  }, "This week"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "chevron-right",
    iconOnly: true,
    label: "Next week",
    onClick: () => setDayIso(isoOf(new Date(first.getFullYear(), first.getMonth(), first.getDate() + 7)))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Week of ", (0, _plenixPlatform.formatDate)(week[0]))), /*#__PURE__*/React.createElement(_plenixPlatform.TimeGrid, {
    label: 'Week of ' + (0, _plenixPlatform.formatDate)(week[0]),
    days: days,
    startHour: 7,
    endHour: 22,
    events: weekEvents
  })) : null, view === 'agenda' ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    as: "ol",
    gap: "sm",
    "aria-label": "Coming up"
  }, upcoming.map(x => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    as: "li",
    key: x.id,
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DateBadge, {
    day: dateOf(x.date).getDate(),
    weekday: weekday(dateOf(x.date)),
    dateTime: x.date,
    today: x.date === TODAY
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    grow: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EventChip, {
    title: x.title,
    time: timeText(x),
    color: x.color,
    onClick: () => pick(x.id)
  }), x.kind !== 'event' ? /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: x.kind === 'fast' ? 'waiting' : 'active',
    icon: x.kind === 'fast' ? 'clock' : 'star'
  }, x.kind === 'fast' ? 'Fast' : x.kind === 'season' ? 'Season' : 'Feast')) : null)))) : null);
  if (narrow) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "workspace"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, views), /*#__PURE__*/React.createElement(_plenixPlatform.Sheet, {
      open: !!item,
      onClose: () => setChosen(null),
      title: item ? item.title : ''
    }, item ? /*#__PURE__*/React.createElement(EventDetail, {
      item: item,
      onOpen: openEvent
    }) : null));
  }
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "master-detail"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.SplitView, {
    label: "Calendar",
    firstLabel: "Calendar",
    defaultSize: 640,
    first: views,
    second: /*#__PURE__*/React.createElement(_plenixPlatform.ReadingPane, {
      label: item ? item.title : 'Event',
      actions: item ? /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "sm",
        icon: "close",
        onClick: () => setChosen(null)
      }, "Close")) : null,
      empty: /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
        icon: "calendar",
        title: "No event chosen"
      }, "Choose an event in the calendar to see it here.")
    }, item ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
      level: 2
    }, item.title), /*#__PURE__*/React.createElement(EventDetail, {
      item: item,
      onOpen: openEvent
    })) : null)
  })));
}
  } },
  "test-site/screens/event.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EventScreen = EventScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · one event (test-site/screens/event.jsx), opened at #/event/<id> (e10, the parish
   festival of the Feast of St. John the Beloved, by default): the answer to the invitation (RadioTiles, with a Spotlight
   that shows where to answer), how many will come with you (Slider), the festival's preparation (ProgressSteps), its
   times (TimePicker), the answers received in a span of days (RelativeDateInput), feedback on last year's festival (an
   interactive Rating), and a Wizard in a Dialog to set up another event.
   Plenix parts: SitePage, PageContent, RecordPage, DateBadge, Badge, Panel, Columns, RadioTiles, Spotlight, Slider,
   ProgressSteps, TimePicker, RelativeDateInput, resolveRelativeDate, Rating, Textarea, Field, Input, Select, Wizard,
   Dialog, Button, Stack, Inline, Text, EmptyState, useToast. */

const {
  useState,
  useEffect,
  useId
} = React;
const NOW = new Date(2026, 9, 25);
// the answers received so far (made up): one a day or so over the last five weeks
const REPLIES = _data.MEMBERS.slice(0, 60).map((m, i) => ({
  id: 'r' + i,
  name: m.name,
  answer: i % 7 === 0 ? 'maybe' : i % 11 === 0 ? 'no' : 'yes',
  guests: i % 4,
  date: new Date(2026, 9, 25 - Math.floor(i * 0.6))
}));
const PREP = [{
  label: 'Book the hall',
  description: 'Done in September'
}, {
  label: 'Plan the menu',
  description: 'Agape Kitchen'
}, {
  label: 'Sign up servants',
  description: '31 of 40 places filled'
}, {
  label: 'Set up the hall',
  description: 'The eve of the feast'
}, {
  label: 'Festival day',
  description: 'The feast day'
}];
function EventScreen({
  screen,
  chrome
}) {
  const ev = _data.EVENTS.find(e => e.id === (screen.id || 'e10'));
  const toast = (0, _plenixPlatform.useToast)();
  const rsvpId = 'rsvp-' + useId().replace(/:/g, '');
  const [answer, setAnswer] = useState('');
  const [guests, setGuests] = useState(3);
  const [spot, setSpot] = useState(false);
  const [target, setTarget] = useState(null);
  const [setup, setSetup] = useState('15:00');
  const [doors, setDoors] = useState('17:00');
  const [span, setSpan] = useState('last-7-days');
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState('');
  const [wizard, setWizard] = useState(false);
  const [draft, setDraft] = useState({
    title: '',
    place: 'Parish hall',
    date: '',
    start: '18:00',
    servants: 6
  });
  useEffect(() => {
    setTarget(document.getElementById(rsvpId));
  }, [rsvpId]);
  if (!ev) {
    return /*#__PURE__*/React.createElement(_site.SitePage, {
      chrome: chrome,
      page: "detail"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
      size: "page",
      kind: "not-found",
      title: "This event is not on the calendar",
      action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => screen.navigate('/calendar')
      }, "Open the calendar")
    }, "It may have been moved or cancelled.")));
  }
  const start = new Date(ev.start),
    end = new Date(ev.end);
  const {
    from,
    to
  } = (0, _plenixPlatform.resolveRelativeDate)(span, NOW) || {};
  const inSpan = REPLIES.filter(r => (!from || r.date >= from) && (!to || r.date <= to));
  const set = k => v => setDraft(d => ({
    ...d,
    [k]: v
  }));
  const steps = [{
    id: 'what',
    label: 'What',
    validate: () => draft.title.trim() ? '' : 'Give the event a name.',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Name"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      value: draft.title,
      onChange: e => set('title')(e.target.value)
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Place"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
      value: draft.place,
      onChange: e => set('place')(e.target.value),
      options: ['Church', 'Parish hall', 'Fellowship hall', 'Youth room', 'Library'].map(p => ({
        value: p,
        label: p
      }))
    })))
  }, {
    id: 'when',
    label: 'When',
    validate: () => draft.date ? '' : 'Choose the day of the event.',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Day"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
      type: "date",
      value: draft.date,
      onChange: e => set('date')(e.target.value)
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Starts at"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.TimePicker, {
      value: draft.start,
      onChange: set('start'),
      step: 30,
      min: "07:00",
      max: "22:00"
    })))
  }, {
    id: 'who',
    label: 'Servants',
    content: /*#__PURE__*/React.createElement(_plenixPlatform.Slider, {
      label: "Servants needed",
      value: draft.servants,
      min: 0,
      max: 40,
      step: 1,
      onChange: set('servants')
    })
  }];
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "detail"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage, {
    header: /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: ev.title,
      media: /*#__PURE__*/React.createElement(_plenixPlatform.DateBadge, {
        day: start.getDate(),
        weekday: new Intl.DateTimeFormat('en-US', {
          weekday: 'short'
        }).format(start),
        dateTime: ev.start.slice(0, 10)
      }),
      description: (0, _plenixPlatform.formatDate)(start, {
        dateStyle: 'full'
      }) + ', ' + (0, _plenixPlatform.formatTime)(start) + '–' + (0, _plenixPlatform.formatTime)(end) + ' · ' + ev.place,
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: "success",
        icon: "check"
      }, ev.rsvp, " coming"),
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        icon: "add",
        onClick: () => setWizard(true)
      }, "Set up another event")
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Will you come?",
    description: "The Agape Kitchen plans the food by these answers.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "circle-info",
      onClick: () => setSpot(true)
    }, "Where do I answer?")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RadioTiles, {
    id: rsvpId,
    legend: "Your answer",
    value: answer,
    onChange: v => {
      setAnswer(v);
      setSpot(false);
    },
    options: [{
      value: 'yes',
      label: 'Yes, we will come',
      description: 'Count us for the dinner'
    }, {
      value: 'maybe',
      label: 'Maybe',
      description: 'We will answer by January 5'
    }, {
      value: 'no',
      label: 'We cannot come',
      description: 'Keep us in your prayers'
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Spotlight, {
    target: target,
    open: spot,
    onDismiss: () => setSpot(false)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Slider, {
    label: "People coming with you",
    value: guests,
    min: 0,
    max: 10,
    step: 1,
    marks: [0, 2, 4, 6, 8, 10],
    onChange: v => setGuests(v),
    disabled: answer === 'no'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "end"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    icon: "check",
    disabled: !answer,
    onClick: () => toast.show(answer === 'no' ? 'Thank you for letting us know' : 'Your answer is saved: ' + (1 + guests) + ' coming', {
      tone: 'success'
    })
  }, "Send my answer")))), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Preparation"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ProgressSteps, {
    label: "Festival preparation",
    current: 2,
    orientation: "vertical",
    steps: PREP
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Times",
    description: "The hall is ours from noon."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Servants arrive"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TimePicker, {
    value: setup,
    onChange: setSetup,
    step: 15,
    min: "12:00",
    max: doors
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Doors open"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TimePicker, {
    value: doors,
    onChange: setDoors,
    step: 15,
    min: setup,
    max: "20:00"
  }))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Answers received",
    description: "How many families answered in a span of days."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Received"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RelativeDateInput, {
    value: span,
    onChange: v => setSpan(v),
    now: NOW
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, inSpan.length, " answers: ", inSpan.filter(r => r.answer === 'yes').length, " yes, ", inSpan.filter(r => r.answer === 'maybe').length, " maybe,", ' ', inSpan.filter(r => r.answer === 'no').length, " no, with ", inSpan.reduce((n, r) => n + (r.answer === 'yes' ? r.guests : 0), 0), " guests."))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "How was last year\u2019s festival?",
    description: "Your answer helps the servants plan this year."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Rating, {
    label: "Last year\u2019s festival",
    value: stars,
    onChange: setStars
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "What should we keep or change?"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Textarea, {
    rows: 3,
    value: comment,
    onChange: e => setComment(e.target.value)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "message",
    disabled: !stars,
    onClick: () => {
      toast.show('Thank you for your feedback', {
        tone: 'success'
      });
      setComment('');
    }
  }, "Send feedback"))))))), /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: wizard,
    onClose: () => setWizard(false),
    title: "Set up an event",
    size: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Wizard, {
    label: "New event",
    steps: steps,
    summary: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "xs"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, draft.title || 'No name yet', " \xB7 ", draft.place), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, draft.date || 'No day yet', " at ", draft.start), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, draft.servants, " servants needed")),
    onCancel: () => setWizard(false),
    onComplete: () => {
      setWizard(false);
      toast.show(draft.title + ' is on the calendar', {
        tone: 'success'
      });
      setDraft({
        title: '',
        place: 'Parish hall',
        date: '',
        start: '18:00',
        servants: 6
      });
    }
  })));
}
  } },
  "test-site/screens/planning.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlanningScreen = PlanningScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Feast planning (test-site/screens/planning.jsx): the preparation of the festival of
   St. John the Beloved on January 12 (GanttChart: tasks, what waits on what, today), the season it falls in (TimelineChart:
   the Nativity Fast, the month of Kiahk and the feasts), and the planning team's milestones (Timeline) beside the
   meeting notes, which people widen by the edge between them (PanelSplitter) or by the notes' own edges (Resizable).
   Plenix parts: SitePage, PageContent, RecordPage.Header, GanttChart, TimelineChart, Timeline, Resizable, PanelSplitter,
   Panel, Heading, Field, Textarea, Badge, Stack, Inline, Text, Button, useToast. */

const {
  useState
} = React;
const TODAY = new Date(2026, 9, 25);
const feast = id => _data.FEASTS.find(f => f.id === id).date;
const TASKS = [{
  id: 'hall',
  label: 'Book the hall',
  start: '2026-09-14',
  end: '2026-09-25',
  progress: 1,
  status: 'Done'
}, {
  id: 'theme',
  label: 'Choose the theme',
  start: '2026-09-28',
  end: '2026-10-09',
  progress: 1,
  status: 'Done'
}, {
  id: 'menu',
  label: 'Plan the menu',
  start: '2026-10-12',
  end: '2026-11-06',
  progress: 0.6,
  dependsOn: ['theme'],
  status: 'On track'
}, {
  id: 'servants',
  label: 'Sign up servants',
  start: '2026-10-19',
  end: '2026-12-18',
  progress: 0.4,
  dependsOn: ['theme'],
  status: 'On track'
}, {
  id: 'play',
  label: 'Play rehearsals',
  start: '2026-11-08',
  end: '2027-01-10',
  progress: 0,
  dependsOn: ['theme'],
  status: 'Not started'
}, {
  id: 'hymns',
  label: 'Feast hymns',
  start: '2026-11-12',
  end: '2027-01-07',
  progress: 0.1,
  status: 'On track'
}, {
  id: 'flyer',
  label: 'Flyer',
  start: '2026-11-30',
  end: '2026-12-11',
  progress: 0,
  dependsOn: ['theme'],
  status: 'Not started'
}, {
  id: 'shop',
  label: 'Buy the food',
  start: '2027-01-04',
  end: '2027-01-10',
  progress: 0,
  dependsOn: ['menu'],
  status: 'Not started'
}, {
  id: 'setup',
  label: 'Set up the hall',
  start: '2027-01-11',
  end: '2027-01-12',
  progress: 0,
  dependsOn: ['hall', 'shop'],
  status: 'Not started'
}, {
  id: 'festival',
  label: 'Festival',
  start: feast('patron'),
  milestone: true,
  dependsOn: ['setup', 'play']
}];
const SEASON = [{
  id: 'fast',
  lane: 'fast',
  label: 'Nativity Fast',
  start: feast('nativity-fast'),
  end: '2027-01-06'
}, {
  id: 'kiahk',
  lane: 'kiahk',
  label: 'Kiahk',
  start: feast('kiahk'),
  end: '2027-01-08'
}, {
  id: 'praises',
  lane: 'praises',
  label: 'Kiahk praises',
  start: '2026-12-12',
  end: '2027-01-02'
}, {
  id: 'nativity',
  lane: 'nativity',
  label: 'Nativity',
  start: feast('nativity')
}, {
  id: 'patron',
  lane: 'patron',
  label: 'Patron feast',
  start: feast('patron')
}, {
  id: 'theophany',
  lane: 'theophany',
  label: 'Theophany',
  start: feast('theophany')
}];
const MILESTONES = [{
  id: 1,
  time: 'Sep 25, 2026',
  dateTime: '2026-09-25',
  title: 'The parish hall is booked',
  icon: 'home',
  badge: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "check"
  }, "Done")
}, {
  id: 2,
  time: 'Oct 9, 2026',
  dateTime: '2026-10-09',
  title: 'Theme chosen: the beloved disciple and his love for the Church',
  icon: 'star',
  badge: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "check"
  }, "Done")
}, {
  id: 3,
  time: 'Nov 6, 2026',
  dateTime: '2026-11-06',
  title: 'The menu is settled',
  description: 'Fasting dishes, since the festival falls after the Nativity.',
  icon: 'checklist',
  badge: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "active",
    icon: "progress"
  }, "In progress")
}, {
  id: 4,
  time: 'Dec 18, 2026',
  dateTime: '2026-12-18',
  title: 'Every servant place is filled',
  icon: 'settings-users',
  badge: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "waiting",
    icon: "clock"
  }, "Not started")
}, {
  id: 5,
  time: 'Jan 12, 2027',
  dateTime: '2027-01-12',
  title: 'Feast of St. John the Beloved: the festival',
  icon: 'calendar'
}];
function PlanningScreen({
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [width, setWidth] = useState(400);
  const [notes, setNotes] = useState('Oct 20 meeting: the youth will run the games. Ask the bookstore for a table of icons and the Kiahk hymn books. Fr. Daniel will bless the hall at 4:30 PM.');
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
    title: "Feast planning",
    headingLevel: 1,
    description: "The festival of the Feast of St. John the Beloved, January 12, 2027, in the parish hall."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.GanttChart, {
    title: "Festival preparation",
    today: TODAY,
    tasks: TASKS,
    description: "The menu and the servant sign-ups are under way; buying the food waits on the menu, and the setup on the shopping."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.TimelineChart, {
    title: "The Nativity Fast and Kiahk",
    today: TODAY,
    items: SEASON,
    lanes: SEASON.map(x => ({
      id: x.id,
      label: x.label
    })),
    labels: false,
    description: "The festival comes five days after the Nativity, when the fast is over and the month of Kiahk has ended."
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "md",
    align: "stretch"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    grow: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Milestones"), /*#__PURE__*/React.createElement(_plenixPlatform.Timeline, {
    label: "Festival milestones",
    items: MILESTONES
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Resizable, {
    label: "Notes",
    axis: "horizontal",
    width: width,
    onResize: ({
      width: w
    }) => setWidth(w),
    minWidth: 240,
    maxWidth: 560
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PanelSplitter, {
    label: "Resize the notes",
    edge: "start",
    value: width,
    min: 240,
    max: () => 560,
    onChange: w => setWidth(w)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Meeting notes",
    description: "The planning team meets on the first Tuesday of the month."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Notes",
    hideLabel: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Textarea, {
    rows: 8,
    value: notes,
    onChange: e => setNotes(e.target.value)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, notes.trim() ? notes.trim().split(/\s+/).length : 0, " words"), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "end"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "save",
    onClick: () => toast.show('Notes saved', {
      tone: 'success'
    })
  }, "Save notes")))))))));
}
  } },
  "test-site/screens/readings.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReadingsScreen = ReadingsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Readings and hymns (test-site/screens/readings.jsx): the readings of the day's Divine
   Liturgy in a list beside the chosen reading (the SplitWorkspace template: the list in a reading pane, the reading in the
   second pane), with a toolbar for the text size, copying and sharing (Toolbar), shortcuts to move between readings
   (useHotkey, shown with Kbd), each reading summed up in our own words (Blockquote: the site never quotes a Bible
   translation) and the recordings of hymns and sermons (MediaCard in a ContentGrid).
   Plenix parts: SplitWorkspace, Toolbar, Toolbar.Group, Toolbar.Spacer, Button, Heading, Blockquote, Text, Kbd, RowButton,
   MediaCard, ContentGrid, Stack, Inline, useHotkey, copyText, useToast, formatDuration. */
const {
  useState
} = React;

// the readings of Sunday, October 25, 2026 (an example order); every text is a short summary in the site's own words
const READINGS = [{
  id: 'pauline',
  title: 'The Pauline Epistle',
  ref: '1 Corinthians 13:1–13',
  summary: ['St. Paul writes that speaking every language, knowing every mystery and giving everything away are worth nothing without love.', 'Love is patient and kind, does not boast, and keeps no record of wrongs. Knowledge will pass away; faith, hope and love remain, and love is the greatest of them.']
}, {
  id: 'catholic',
  title: 'The Catholic Epistle',
  ref: '1 John 4:7–21',
  summary: ['St. John asks his children to love one another, because love comes from God, and God showed His love by sending His Son for us.', 'Whoever says he loves God while he hates his brother is not telling the truth: the love of God and of our neighbor go together.']
}, {
  id: 'acts',
  title: 'The Acts of the Apostles',
  ref: 'Acts 3:1–10',
  summary: ['Peter and John meet a man at the gate of the temple who has never been able to walk. They have no money to give him.', 'Peter tells him to rise in the name of Jesus Christ; the man stands up, walks into the temple with them and praises God.']
}, {
  id: 'psalm',
  title: 'The Psalm',
  ref: 'Psalm 23',
  summary: ['The psalmist calls the Lord his shepherd, who leads him to rest and to still water, and who stays with him even in the darkest valley.']
}, {
  id: 'gospel',
  title: 'The Holy Gospel',
  ref: 'John 15:9–17',
  summary: ['Christ asks His disciples to remain in His love by keeping His commandments, and to love one another as He has loved them.', 'He calls them His friends rather than servants, and sends them out to bear fruit that lasts.']
}];
const HYMNS = _data.MEDIA.filter(m => m.kind === 'audio');
function ReadingsScreen({
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [current, setCurrent] = useState('gospel');
  const [large, setLarge] = useState(false);
  const at = READINGS.findIndex(r => r.id === current),
    r = READINGS[at];
  const move = step => setCurrent(READINGS[(at + step + READINGS.length) % READINGS.length].id);
  (0, _plenixPlatform.useHotkey)('J', () => move(1), {
    label: 'Next reading',
    group: 'Readings'
  });
  (0, _plenixPlatform.useHotkey)('K', () => move(-1), {
    label: 'Previous reading',
    group: 'Readings'
  });
  const text = r.title + ' (' + r.ref + '), in brief: ' + r.summary.join(' ');
  const copy = () => (0, _plenixPlatform.copyText)(text).then(() => toast.show('The summary is copied', {
    tone: 'success'
  }), () => toast.show('The summary could not be copied', {
    tone: 'warning'
  }));
  const share = () => {
    const link = location.href;
    if (navigator.share) navigator.share({
      title: r.title + ' · ' + _data.CHURCH.short,
      text,
      url: link
    }).catch(() => {});else (0, _plenixPlatform.copyText)(link).then(() => toast.show('The link to this page is copied'));
  };
  const list = /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Sunday, October 25, 2026 \xB7 the Divine Liturgy"), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    as: "ol",
    gap: "none",
    "aria-label": "Today\u2019s readings"
  }, READINGS.map(x => /*#__PURE__*/React.createElement("li", {
    key: x.id
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RowButton, {
    selected: x.id === current,
    onClick: () => setCurrent(x.id)
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "none",
    inset: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, x.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, x.ref)))))), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Press ", /*#__PURE__*/React.createElement(_plenixPlatform.Kbd, null, "J"), " for the next reading and ", /*#__PURE__*/React.createElement(_plenixPlatform.Kbd, null, "K"), " for the one before."));
  const toolbar = /*#__PURE__*/React.createElement(_plenixPlatform.Toolbar, {
    label: "Reading tools"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "ed-zoom-out",
    iconOnly: true,
    label: "Smaller text",
    pressed: !large,
    onClick: () => setLarge(false)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "ed-zoom-in",
    iconOnly: true,
    label: "Larger text",
    pressed: large,
    onClick: () => setLarge(true)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "chevron-up",
    iconOnly: true,
    label: "Previous reading",
    shortcut: "K",
    onClick: () => move(-1)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "chevron-down",
    iconOnly: true,
    label: "Next reading",
    shortcut: "J",
    onClick: () => move(1)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Toolbar.Spacer, null), /*#__PURE__*/React.createElement(_plenixPlatform.Toolbar.Group, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "ed-copy",
    onClick: copy
  }, "Copy"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "share",
    onClick: share
  }, "Share")));
  return /*#__PURE__*/React.createElement(_plenixPlatform.SplitWorkspace, _extends({}, chrome, {
    paneTitle: "Readings",
    title: r.title,
    pane: list,
    actions: toolbar,
    defaultSize: 360
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, r.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, r.ref)), /*#__PURE__*/React.createElement(_plenixPlatform.Blockquote, {
    citation: 'In brief: ' + r.ref + '. A summary in our own words; read the full text in your Bible.'
  }, r.summary.map((p, i) => /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    key: i,
    as: "p",
    variant: large ? 'lead' : 'body'
  }, p))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Hymns and sermons to listen to"), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Recordings"
  }, HYMNS.map(h => /*#__PURE__*/React.createElement(_plenixPlatform.MediaCard, {
    key: h.id,
    icon: "headphones",
    aspect: "16/9",
    title: h.title,
    href: "#/media",
    meta: (0, _plenixPlatform.formatDuration)(h.duration, {
      display: 'clock'
    }) + ' · ' + h.speaker
  }))))));
}
  } },
  "test-site/screens/giving.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GivingScreen = GivingScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Donations and pledges (test-site/screens/giving.jsx): the giving office's overview of
   the year. Key figures (Metric, Metric.Group), each fund against its goal (BulletChart), how the general fund's year
   went from its opening balance to today (WaterfallChart), gifts and givers per month (ComboChart), and the pledges in a
   DataGrid in "pages" mode that asks fetchRows for each page (a made-up server, rowHeight "medium"). The actions:
   SplitButton (Record a gift, with Record a pledge and Import gifts in its menu: each opens a Dialog that validates and
   says what it saved in a toast), DownloadButton (the year's giving statement as a CSV file) and usePrint (Print
   statement). Every gift, pledge and amount is made up. */

const {
  useState,
  useMemo
} = React;
const usd = n => (0, _plenixPlatform.formatCurrency)(n, 'USD');
const dollars = n => (0, _plenixPlatform.formatCurrency)(n, 'USD', {
  decimals: 0
}); // chart axes and labels: whole dollars
const fundName = id => (_data.FUNDS.find(f => f.id === id) || {
  name: id
}).name;
const MONTHS = _data.GIVING_BY_MONTH.map(m => m.label);

// gifts and givers per month, from the giving history
const BY_MONTH = MONTHS.map((label, i) => {
  const gifts = _data.GIFTS.filter(g => Number(g.date.slice(5, 7)) === i + 1);
  return {
    label,
    amount: Math.round(gifts.reduce((s, g) => s + g.amount, 0)),
    givers: new Set(gifts.map(g => g.member)).size
  };
});

// the general fund's year: the balance carried over, the gifts by quarter, and what the parish spent (made up)
const quarter = (from, to) => _data.GIVING_BY_MONTH.filter(m => m.month >= from && m.month <= to).reduce((s, m) => s + m.general, 0);
const GENERAL_YEAR = [{
  label: 'Carried over from 2025',
  value: 48200,
  total: true
}, {
  label: 'Gifts, January to March',
  value: quarter(1, 3)
}, {
  label: 'Gifts, April to June',
  value: quarter(4, 6)
}, {
  label: 'Gifts, July to September',
  value: quarter(7, 9)
}, {
  label: 'Gifts, October',
  value: quarter(10, 10)
}, {
  label: 'Clergy support',
  value: -128000
}, {
  label: 'Utilities and upkeep',
  value: -46400
}, {
  label: 'Sunday School and youth',
  value: -18600
}, {
  label: 'Outreach and the food pantry',
  value: -12300
}];
const PLEDGE_TONES = {
  'On track': ['active', 'progress'],
  Behind: ['action-required', 'alert'],
  Complete: ['success', 'circle-check']
};
const PLEDGE_ROWS = _data.PLEDGES.map(p => Object.assign({}, p, {
  fundName: fundName(p.fund),
  remaining: Math.max(0, p.amount - p.paid)
}));

// a made-up server: sorts and pages the pledges, a moment later, like a request would
function fetchPledges({
  page,
  size,
  sort
}) {
  const rows = PLEDGE_ROWS.slice();
  (sort || []).slice().reverse().forEach(({
    field,
    dir
  }) => {
    rows.sort((a, b) => {
      const x = a[field],
        y = b[field];
      const c = typeof x === 'number' ? x - y : String(x).localeCompare(String(y));
      return dir === 'desc' ? -c : c;
    });
  });
  return new Promise(resolve => setTimeout(() => resolve({
    rows: rows.slice((page - 1) * size, page * size),
    total: rows.length
  }), 160));
}
const PLEDGE_COLUMNS = [{
  title: 'Pledge',
  field: 'id',
  kind: 'data',
  width: '--plx-ref-size-80px'
}, {
  title: 'Member',
  field: 'name',
  kind: 'name'
}, {
  title: 'Fund',
  field: 'fundName'
}, {
  title: 'Pledged',
  field: 'amount',
  type: 'currency',
  align: 'right',
  headerAlign: 'right',
  render: p => usd(p.amount)
}, {
  title: 'Paid',
  field: 'paid',
  type: 'currency',
  align: 'right',
  headerAlign: 'right',
  render: p => usd(p.paid)
}, {
  title: 'Remaining',
  field: 'remaining',
  type: 'currency',
  align: 'right',
  headerAlign: 'right',
  render: p => usd(p.remaining)
}, {
  title: 'Frequency',
  field: 'frequency'
}, {
  title: 'Status',
  field: 'status',
  kind: 'center',
  render: p => /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: PLEDGE_TONES[p.status][0],
    icon: PLEDGE_TONES[p.status][1]
  }, p.status)
}];

// the year's giving statement as a CSV file (one line per fund)
const STATEMENT = ['Fund,Goal,Raised'].concat(_data.FUNDS.map(f => '"' + f.name + '",' + f.goal + ',' + f.raised)).join('\n');
const STATEMENT_HREF = 'data:text/csv;charset=utf-8,' + encodeURIComponent(STATEMENT);
const MEMBER_OPTIONS = [{
  value: '',
  label: 'Choose a member'
}].concat(_data.MEMBERS.filter(m => m.status === 'active').map(m => ({
  value: m.id,
  label: m.name
})));
const FUND_OPTIONS = _data.FUNDS.map(f => ({
  value: f.id,
  label: f.name
}));
const METHOD_OPTIONS = ['Card', 'Check', 'Cash', 'Bank transfer', 'Online'].map(m => ({
  value: m,
  label: m
}));

// Record a gift and Record a pledge: one dialog, two kinds; both check the member and the amount before saving
function RecordDialog({
  kind,
  onClose,
  onSaved
}) {
  const pledge = kind === 'pledge';
  const [v, setV] = useState({
    member: '',
    fund: pledge ? 'building' : 'general',
    amount: null,
    method: 'Check',
    frequency: 'Monthly',
    date: '2026-10-25'
  });
  const [errors, setErrors] = useState({});
  const set = k => e => setV(Object.assign({}, v, {
    [k]: e && e.target ? e.target.value : e
  }));
  const save = () => {
    const next = {};
    if (!v.member) next.member = 'Choose the member who gave.';
    if (!v.amount || v.amount <= 0) next.amount = 'Enter an amount above zero.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSaved(v);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: onClose,
    title: pledge ? 'Record a pledge' : 'Record a gift',
    size: "sm",
    description: pledge ? 'A promise to give over the year. Payments are recorded as gifts.' : 'A gift received by the church office.',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: save
    }, pledge ? 'Save pledge' : 'Save gift'))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Member",
    required: true,
    error: errors.member
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: v.member,
    onChange: set('member'),
    options: MEMBER_OPTIONS
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Fund"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: v.fund,
    onChange: set('fund'),
    options: FUND_OPTIONS
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: pledge ? 'Amount pledged for the year' : 'Amount',
    required: true,
    error: errors.amount
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NumberInput, {
    value: v.amount,
    onChange: n => setV(Object.assign({}, v, {
      amount: n
    })),
    format: "currency",
    currency: "USD",
    min: 0,
    width: "sm"
  })), pledge ? /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Paid"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: v.frequency,
    onChange: set('frequency'),
    options: ['Monthly', 'Quarterly', 'Yearly'].map(x => ({
      value: x,
      label: x
    }))
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Method"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: v.method,
    onChange: set('method'),
    options: METHOD_OPTIONS
  })), pledge ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Date received"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    type: "date",
    value: v.date,
    onChange: set('date')
  }))));
}
function ImportDialog({
  onClose,
  onImported
}) {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState('');
  const run = () => {
    if (!files.length) {
      setError('Choose a file to import.');
      return;
    }
    onImported(files[0]);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: true,
    onClose: onClose,
    title: "Import gifts",
    size: "sm",
    description: "Add a batch of gifts from the bank's or the giving provider's export.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: run
    }, "Import"))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Gifts file",
    description: "A CSV file with the member, fund, amount and date of each gift.",
    error: error
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FileInput, {
    accept: ".csv",
    onChange: f => {
      setFiles(f);
      setError('');
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info"
  }, "Gifts that match one already recorded are skipped, so a file can be imported twice safely.")));
}
function GivingScreen({
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const {
    print
  } = (0, _plenixPlatform.usePrint)();
  const [dialog, setDialog] = useState(null);
  const raised = _data.FUNDS.reduce((s, f) => s + f.raised, 0);
  const givers = useMemo(() => new Set(_data.GIFTS.map(g => g.member)).size, []);
  const pledged = _data.PLEDGES.reduce((s, p) => s + p.amount, 0),
    paid = _data.PLEDGES.reduce((s, p) => s + p.paid, 0);
  const saved = v => {
    const who = ((0, _data.memberById)(v.member) || {}).name;
    toast.show((dialog === 'pledge' ? 'Pledge of ' : 'Gift of ') + usd(v.amount) + ' recorded for ' + who + ' (' + fundName(v.fund) + ').', {
      tone: 'success'
    });
    setDialog(null);
  };
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "dashboard"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "section"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between",
    align: "start",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Donations and pledges"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Giving to every fund of the parish, January to October 2026.")), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SplitButton, {
    variant: "primary",
    icon: "add",
    label: "Record a gift",
    onClick: () => setDialog('gift'),
    menuLabel: "More ways to record giving"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "checklist",
    onSelect: () => setDialog('pledge')
  }, "Record a pledge"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "import",
    onSelect: () => setDialog('import')
  }, "Import gifts")), /*#__PURE__*/React.createElement(_plenixPlatform.DownloadButton, {
    href: STATEMENT_HREF,
    fileName: "giving-statement-2026.csv",
    format: "CSV",
    size: STATEMENT.length
  }, "Giving statement"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "document",
    onClick: () => print({
      title: 'Giving statement 2026 · St. John the Beloved'
    })
  }, "Print statement"))), /*#__PURE__*/React.createElement(_plenixPlatform.Metric.Group, {
    label: "Giving this year"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    size: "lg",
    value: usd(raised),
    label: "Given to every fund",
    change: "+6%",
    changeTone: "success",
    description: "Since January 1",
    trend: _data.GIVING_BY_MONTH.map(m => m.general + m.building + m.pantry),
    trendLabel: "Given per month, January to October"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    size: "lg",
    value: (0, _plenixPlatform.formatNumber)(_data.GIFTS.length),
    label: "Gifts recorded",
    description: "Every method"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    size: "lg",
    value: (0, _plenixPlatform.formatNumber)(givers),
    label: "Givers",
    description: "Members who gave this year"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Metric, {
    size: "lg",
    value: usd(pledged),
    label: "Pledged",
    change: Math.round(paid / pledged * 100) + '% paid',
    description: (0, _plenixPlatform.formatNumber)(_data.PLEDGES.length) + ' pledges'
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.BulletChart, {
    title: "Funds against their goals",
    description: "The feast agape fund passed its goal; the building fund is a little past half.",
    items: _data.FUNDS.filter(f => f.id !== 'building').map(f => ({
      id: f.id,
      label: f.name,
      value: f.raised,
      target: f.goal,
      ranges: [f.goal * 0.5, f.goal * 0.8, f.goal * 1.2]
    })),
    valueLabel: "Given (USD)",
    format: dollars
  }), /*#__PURE__*/React.createElement(_plenixPlatform.BulletChart, {
    title: "The fellowship hall building fund",
    description: "684,300 given of the 1.2 million needed.",
    items: _data.FUNDS.filter(f => f.id === 'building').map(f => ({
      id: f.id,
      label: 'Building fund',
      value: f.raised,
      target: f.goal,
      ranges: [f.goal * 0.4, f.goal * 0.75, f.goal]
    })),
    valueLabel: "Given (USD)",
    format: dollars,
    size: "sm"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.WaterfallChart, {
    title: "The general fund's year",
    description: "Gifts covered clergy support and upkeep, and the balance grew.",
    data: GENERAL_YEAR,
    endLabel: "Balance today",
    format: dollars,
    yLabel: "USD"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.ComboChart, {
    title: "Gifts and givers per month",
    description: "Gifts held steady through the summer; the number of givers stayed near the whole parish.",
    categories: MONTHS,
    bars: [{
      id: 'amount',
      label: 'Given',
      values: BY_MONTH.map(m => m.amount)
    }],
    lines: [{
      id: 'givers',
      label: 'Givers',
      values: BY_MONTH.map(m => m.givers)
    }],
    axis: "dual",
    barLabel: "Given (USD)",
    lineLabel: "Givers",
    formatBar: dollars,
    formatLine: _plenixPlatform.formatNumber
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Pledges"), /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: "Pledges",
    columns: PLEDGE_COLUMNS,
    mode: "pages",
    pageSize: 10,
    pageSizes: [10, 20, 40],
    fetchRows: fetchPledges,
    rowHeight: "medium"
  })))), dialog === 'gift' || dialog === 'pledge' ? /*#__PURE__*/React.createElement(RecordDialog, {
    key: dialog,
    kind: dialog,
    onClose: () => setDialog(null),
    onSaved: saved
  }) : null, dialog === 'import' ? /*#__PURE__*/React.createElement(ImportDialog, {
    onClose: () => setDialog(null),
    onImported: f => {
      toast.show(f.name + ' is being imported. The gifts appear in the history when it is done.', {
        tone: 'info'
      });
      setDialog(null);
    }
  }) : null);
}
  } },
  "test-site/screens/gifts.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiftsScreen = GiftsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Giving history (test-site/screens/gifts.jsx): every gift of the year. All 10,000 GIFTS in
   one VirtualList (only the rows in view are drawn; each row says its place, aria-setsize 10000; a row opens the gift in a
   Drawer); the notes givers left with online gifts in a VirtualList whose rows take their own height (mode variable); and
   the same gifts in a DataGrid in its default "fill" mode, grouped by fund with a sum of the amounts in each
   group's header (summaries), narrowed by the fund and method Selects. Every gift and amount is made up. */

const {
  useState,
  useMemo
} = React;
const usd = n => (0, _plenixPlatform.formatCurrency)(n, 'USD');
const day = iso => (0, _plenixPlatform.formatDate)(iso + 'T12:00:00');
const FUND = Object.fromEntries(_data.FUNDS.map(f => [f.id, f.name]));

// one row per gift for the list (label, a muted line, the amount at the end) and for the grid (the fund's name to group by)
const ITEMS = _data.GIFTS.map(g => ({
  id: g.id,
  label: g.name,
  description: FUND[g.fund] + ' · ' + g.method + ' · ' + day(g.date),
  meta: usd(g.amount),
  icon: 'field-currency',
  gift: g
}));
const ROWS = _data.GIFTS.map(g => ({
  id: g.id,
  date: g.date,
  name: g.name,
  fund: FUND[g.fund],
  method: g.method,
  amount: g.amount
}));

// the notes givers wrote with their online gifts: one to three sentences each, so every row has its own height
const NOTE_LINES = ['For the Feast of St. John the Beloved.', 'In memory of my grandmother, who served the Agape Kitchen for many years.', 'For the youth trip.', 'Please use this for the food pantry before the Nativity Fast.', 'Thank you to the Sunday School servants.', 'For the new fellowship hall. May the work go well.', 'For the hymns books of the Deacons’ School.'];
const NOTES = _data.GIFTS.filter(g => g.method === 'Online').slice(0, 2000).map((g, i) => ({
  id: 'note-' + g.id,
  gift: g,
  text: NOTE_LINES.slice(0, 1 + i % 3).map((_, k) => NOTE_LINES[(i + k * 2) % NOTE_LINES.length]).join(' ')
}));
const COLUMNS = [{
  title: 'Gift',
  field: 'id',
  kind: 'data',
  width: '--plx-ref-size-80px'
}, {
  title: 'Date',
  field: 'date',
  type: 'date',
  kind: 'data',
  sorter: 'date',
  render: g => day(g.date)
}, {
  title: 'Member',
  field: 'name',
  kind: 'name',
  filter: true
}, {
  title: 'Fund',
  field: 'fund',
  filter: 'list'
}, {
  title: 'Method',
  field: 'method',
  filter: 'list'
}, {
  title: 'Amount',
  field: 'amount',
  type: 'currency',
  align: 'right',
  headerAlign: 'right',
  summary: 'sum',
  render: g => usd(g.amount)
}];
const FUND_OPTIONS = [{
  value: '',
  label: 'Every fund'
}].concat(_data.FUNDS.map(f => ({
  value: f.name,
  label: f.name
})));
const METHOD_OPTIONS = [{
  value: '',
  label: 'Every method'
}].concat(['Card', 'Check', 'Cash', 'Bank transfer', 'Online'].map(m => ({
  value: m,
  label: m
})));
function GiftsScreen({
  chrome
}) {
  const [open, setOpen] = useState(null);
  const [fund, setFund] = useState('');
  const [method, setMethod] = useState('');
  const filter = useMemo(() => fund || method ? g => (!fund || g.fund === fund) && (!method || g.method === method) : undefined, [fund, method]);
  const total = _data.GIFTS.reduce((s, g) => s + g.amount, 0);
  const giver = open ? (0, _data.memberById)(open.member) : null;
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "section"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Giving history"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, (0, _plenixPlatform.formatNumber)(_data.GIFTS.length), " gifts this year, ", usd(total), " in all. Open a gift to see who gave it and how.")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Every gift"), /*#__PURE__*/React.createElement(_plenixPlatform.VirtualList, {
    label: "Every gift",
    items: ITEMS,
    showCount: true,
    height: "md",
    onItemOpen: item => setOpen(item.gift)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Notes left with online gifts"), /*#__PURE__*/React.createElement(_plenixPlatform.VirtualList, {
    label: "Notes left with online gifts",
    mode: "variable",
    items: NOTES,
    showCount: true,
    height: "sm",
    renderItem: n => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "none"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "strong"
    }, n.gift.name), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, n.text))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between",
    align: "end",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Gifts by fund"), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Fund"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: fund,
    onChange: e => setFund(e.target.value),
    options: FUND_OPTIONS
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Method"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: method,
    onChange: e => setMethod(e.target.value),
    options: METHOD_OPTIONS
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.DataGrid, {
    label: "Gifts by fund",
    data: ROWS,
    columns: COLUMNS,
    groupBy: "fund",
    filter: filter,
    sort: [{
      field: 'date',
      dir: 'desc'
    }],
    onRowDoubleClick: row => setOpen(_data.GIFTS.find(g => g.id === row.id))
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.Drawer, {
    open: !!open,
    onClose: () => setOpen(null),
    title: open ? 'Gift ' + open.id : '',
    size: "sm"
  }, open ? /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList, null, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Member"
  }, open.name), giver && (0, _data.familyById)(giver.family) ? /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Household"
  }, (0, _data.familyById)(giver.family).name) : null, /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Fund"
  }, FUND[open.fund]), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Amount",
    data: true
  }, usd(open.amount)), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Method"
  }, open.method), /*#__PURE__*/React.createElement(_plenixPlatform.PropertyList.Item, {
    label: "Received",
    data: true
  }, day(open.date))) : null));
}
  } },
  "test-site/screens/give.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GiveScreen = GiveScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Give online (test-site/screens/give.jsx): how a member gives from home. Three tabs:
   Give once (the gift's lines as CommerceLine items with the OrderSummary, then the Checkout wizard, then the
   OrderConfirmation), Quick gift (Payment with a saved card) and Monthly giving (SubscriptionManagement, whose Update
   payment method opens PaymentFields in a Dialog). Test mode only: the page takes the payment provider's published test
   card numbers (4242 4242 4242 4242 is accepted, 4000 0000 0000 0002 is declined); nothing is charged, sent or kept. */

const {
  useState
} = React;
const usd = n => (0, _plenixPlatform.formatCurrency)(n, 'USD');
const FUND_OPTIONS = _data.FUNDS.map(f => ({
  value: f.id,
  label: f.name
}));
const fundName = id => (_data.FUNDS.find(f => f.id === id) || {
  name: id
}).name;
const DECLINE = '4000000000000002'; // the provider's published card that is always declined
const SAVED = [{
  id: 'visa-4242',
  label: 'Visa ending 4242',
  description: 'Test card · expires 12/30'
}];
const wait = ms => new Promise(r => setTimeout(r, ms));
function TestCards() {
  return /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "info",
    title: "Test mode"
  }, "Only the payment provider's published test cards work here: 4242 4242 4242 4242 is accepted and 4000 0000 0000 0002 is declined, with any future expiry date and any three digits. Nothing is charged.");
}

// Give once: the gift, then checkout, then the confirmation
function GiveOnce() {
  const [step, setStep] = useState('choose');
  const [fund, setFund] = useState('general');
  const [amount, setAmount] = useState(100);
  const [fee, setFee] = useState(true);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);
  const items = [{
    id: 'gift',
    title: 'Gift to the ' + fundName(fund),
    options: 'One-time gift',
    price: amount || 0,
    quantity: 1
  }].concat(fee && amount ? [{
    id: 'fee',
    title: 'Processing fee, covered by you',
    options: '2.9% of the gift',
    price: Math.round(amount * 2.9) / 100,
    quantity: 1
  }] : []);
  const totals = (0, _plenixPlatform.orderTotals)(items);
  const next = () => {
    if (!amount || amount < 1) {
      setError('Enter a gift of at least $1.00.');
      return;
    }
    setStep('checkout');
  };
  if (step === 'done' && order) {
    return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.OrderConfirmation, {
      orderNumber: order.number,
      email: order.email,
      items: items,
      totals: totals,
      orderHref: "#/gifts",
      continueHref: "#/give",
      headingLevel: 2,
      strings: {
        title: 'Thank you. Your gift is received.',
        number: 'Gift number',
        copy: 'Copy the gift number',
        view: 'See the giving history',
        continue: 'Give again'
      },
      steps: [{
        id: 1,
        time: 'Today',
        dateTime: '2026-10-25',
        title: 'Receipt emailed',
        description: 'A receipt for ' + usd(totals.total) + ' went to ' + order.email + '.',
        icon: 'mail'
      }, {
        id: 2,
        time: 'January 2027',
        dateTime: '2027-01-15',
        title: 'On your giving statement',
        description: 'The church office sends every family its statement for the year.',
        icon: 'document'
      }]
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: () => {
        setOrder(null);
        setStep('choose');
      }
    }, "Give another gift"));
  }
  if (step === 'checkout') {
    return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(TestCards, null), /*#__PURE__*/React.createElement(_plenixPlatform.Checkout, {
      items: items,
      onCancel: () => setStep('choose'),
      strings: {
        label: 'Give online',
        delivery: 'Receipt address',
        placeOrder: 'Give ' + usd(totals.total),
        cancel: 'Back to your gift',
        summary: 'Your gift',
        placed: 'Gift received',
        emailHint: 'For your receipt.',
        method: 'Receipt by'
      },
      onPlaceOrder: async d => {
        await wait(300);
        if (d.payment && d.payment.number === DECLINE) throw new Error('The card was declined. Try the test card 4242 4242 4242 4242.');
        setOrder({
          number: 'GV-' + (20000 + Math.round(amount)),
          email: d.email || _data.ME.email
        });
        setStep('done');
      }
    }));
  }
  return /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    ratio: "sidebar-end",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Fund"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    value: fund,
    onChange: e => setFund(e.target.value),
    options: FUND_OPTIONS
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Gift",
    required: true,
    error: error,
    description: "Every gift is tax deductible. Your receipt comes by email."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NumberInput, {
    value: amount,
    onChange: n => {
      setAmount(n);
      setError('');
    },
    format: "currency",
    currency: "USD",
    min: 0,
    width: "sm"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Checkbox, {
    label: "Cover the 2.9% processing fee, so the whole gift reaches the fund",
    checked: fee,
    onChange: e => setFee(e.target.checked)
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    as: "ul",
    gap: "none",
    "aria-label": "Your gift"
  }, items.map(x => /*#__PURE__*/React.createElement(_plenixPlatform.CommerceLine, {
    key: x.id,
    item: x
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.OrderSummary, {
    items: items,
    totals: totals,
    title: "Your gift",
    strings: {
      subtotal: 'Gift and fee',
      shipping: 'Receipt',
      free: 'By email',
      tax: 'Tax (gifts are not taxed)'
    }
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    onClick: next
  }, "Continue to payment")));
}

// Quick gift: a saved card, one press
function QuickGift() {
  const toast = (0, _plenixPlatform.useToast)();
  const [amount, setAmount] = useState(50);
  return /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(TestCards, null), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Gift to the general fund"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NumberInput, {
    value: amount,
    onChange: setAmount,
    format: "currency",
    currency: "USD",
    min: 1,
    width: "sm"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Payment, {
    amount: amount || 0,
    savedMethods: SAVED,
    title: "Quick gift",
    strings: {
      description: 'Give to the general fund with your saved card. Nothing is charged until you press Give.',
      pay: 'Give {amount}',
      paid: 'Gift received'
    },
    onPay: async d => {
      await wait(300);
      if (d.method === 'card' && d.number === DECLINE) throw new Error('The test card 4000 0000 0000 0002 is always declined. Use 4242 4242 4242 4242.');
      toast.show('Thank you. ' + usd(amount || 0) + ' given to the general fund.', {
        tone: 'success'
      });
    }
  }));
}
const PLANS = [{
  id: 'm25',
  name: '$25 a month',
  price: 25,
  period: 'month'
}, {
  id: 'm50',
  name: '$50 a month',
  price: 50,
  period: 'month'
}, {
  id: 'm100',
  name: '$100 a month',
  price: 100,
  period: 'month'
}, {
  id: 'm250',
  name: '$250 a month',
  price: 250,
  period: 'month'
}];
const HISTORY = ['2026-10-01', '2026-09-01', '2026-08-01', '2026-07-01', '2026-06-01', '2026-05-01'].map((date, i) => ({
  id: 'mg' + i,
  date,
  description: 'Monthly gift to the general fund',
  amount: 100,
  status: i === 3 ? 'failed' : 'paid'
}));

// Monthly giving: the plan, its card, pause or cancel
function MonthlyGiving() {
  const toast = (0, _plenixPlatform.useToast)();
  const [sub, setSub] = useState({
    plan: 'm100',
    status: 'active',
    nextBilling: '2026-11-01',
    since: '2024-01-01',
    paymentMethod: {
      label: 'Visa ending 4242',
      description: 'Test card · expires 12/30'
    }
  });
  const [editing, setEditing] = useState(false);
  const [card, setCard] = useState({
    billingSame: true
  });
  const [error, setError] = useState('');
  const saveCard = () => {
    const n = String(card.number || '');
    if (n.length < 15 || !card.expiry || !card.cvc || !card.name) {
      setError('Fill in the card number, expiry date, security code and name.');
      return;
    }
    if (n === DECLINE) {
      setError('The test card 4000 0000 0000 0002 is always declined. Use 4242 4242 4242 4242.');
      return;
    }
    setSub(Object.assign({}, sub, {
      paymentMethod: {
        label: 'Card ending ' + n.slice(-4),
        description: 'Test card · expires ' + card.expiry.slice(0, 2) + '/' + card.expiry.slice(2)
      }
    }));
    setEditing(false);
    setError('');
    toast.show('Your monthly gift now uses the card ending ' + n.slice(-4) + '.', {
      tone: 'success'
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SubscriptionManagement, {
    subscription: sub,
    plans: PLANS,
    history: HISTORY,
    strings: {
      plan: 'Your monthly gift',
      planName: 'Gift',
      price: 'Amount',
      next: 'Next gift',
      since: 'Giving monthly since',
      change: 'Change the amount',
      plans: 'Amounts',
      pause: 'Pause monthly giving',
      resume: 'Resume monthly giving',
      cancel: 'Stop monthly giving',
      history: 'Monthly gifts',
      keep: 'Keep giving',
      manageText: 'Pause to skip the gifts for a while, or stop them. Gifts already given stay on your statement.'
    },
    onChangePlan: async p => {
      await wait(200);
      setSub(Object.assign({}, sub, {
        plan: p.id
      }));
    },
    onPause: async () => {
      await wait(200);
      setSub(Object.assign({}, sub, {
        status: 'paused'
      }));
    },
    onResume: () => setSub(Object.assign({}, sub, {
      status: 'active'
    })),
    onCancel: async () => {
      await wait(200);
      setSub(Object.assign({}, sub, {
        status: 'canceled',
        endsAt: '2026-11-01'
      }));
    },
    onUpdatePayment: () => {
      setCard({
        billingSame: true
      });
      setError('');
      setEditing(true);
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: editing,
    onClose: () => setEditing(false),
    title: "Update the card",
    size: "md",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: () => setEditing(false)
    }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: saveCard
    }, "Save card"))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(TestCards, null), error ? /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "danger"
  }, error) : null, /*#__PURE__*/React.createElement(_plenixPlatform.PaymentFields, {
    value: card,
    onChange: setCard,
    billing: false
  }))));
}
function GiveScreen({
  chrome
}) {
  const [tab, setTab] = useState('once');
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "form"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Give online"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Support the work of ", _data.CHURCH.short, ": the general fund, the fellowship hall, the food pantry and more.")), /*#__PURE__*/React.createElement(_plenixPlatform.Tabs, {
    label: "Ways to give",
    value: tab,
    onChange: setTab,
    items: [{
      value: 'once',
      label: 'Give once',
      icon: 'field-currency',
      content: /*#__PURE__*/React.createElement(GiveOnce, null)
    }, {
      value: 'quick',
      label: 'Quick gift',
      icon: 'star',
      content: /*#__PURE__*/React.createElement(QuickGift, null)
    }, {
      value: 'monthly',
      label: 'Monthly giving',
      icon: 'calendar',
      content: /*#__PURE__*/React.createElement(MonthlyGiving, null)
    }]
  }))));
}
  } },
  "test-site/screens/bookstore.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BookstoreScreen = BookstoreScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Bookstore (test-site/screens/bookstore.jsx): the Library and Bookstore ministry's table
   after the Divine Liturgy, online. Tabs: Shop (ProductDiscovery, a product opens ProductDetail with ProductOptions, the
   servants' picks as ProductCards, and an icon print ordered with ProductOptions and ProductPrice in a panel that claims
   its page kind with useCommercePage), Catalog (ProductListing as a list), Cart (Cart with Undo and a promo code) and
   Orders (the servants' view: OrderStatus counts, OrderManagement, an order's OrderDetail, and Returns for a picked-up
   order). Orders are picked up at the bookstore table; nothing is charged or shipped. Every order and person is made up. */

const {
  useState
} = React;
const day = iso => (0, _plenixPlatform.formatDate)(iso + 'T12:00:00');
const slug = s => s.toLowerCase().replace(/[^a-z]+/g, '-');
const MORE = {
  b1: {
    description: 'The seven prayer hours of the Coptic Orthodox Church, in English and Arabic, with the Psalms and Gospels of each hour.',
    rating: 4.8,
    reviewCount: 41,
    specs: [['Pages', '512', true], ['Languages', 'English and Arabic'], ['Binding', 'Hardcover']]
  },
  b2: {
    description: 'The hymns of the month of Kiahk with the Midnight Praises, in Coptic, English and Arabic.',
    rating: 4.6,
    reviewCount: 12,
    specs: [['Pages', '288', true], ['Languages', 'Coptic, English and Arabic']]
  },
  b3: {
    description: 'A print of the parish icon of St. John the Beloved, written by a Coptic iconographer, on heavy matte paper.',
    rating: 4.9,
    reviewCount: 23,
    options: [{
      name: 'size',
      label: 'Size',
      kind: 'buttons',
      values: [{
        value: '8x10',
        label: '8 × 10 in'
      }, {
        value: '11x14',
        label: '11 × 14 in',
        price: 35
      }, {
        value: '16x20',
        label: '16 × 20 in',
        price: 55,
        available: false,
        note: 'Back in December'
      }]
    }]
  },
  b4: {
    description: 'Forty stories from the Old and New Testaments for children of Sunday School age, with pictures.',
    rating: 4.7,
    reviewCount: 30
  },
  b5: {
    description: 'A Coptic cross carved by hand from olive wood.',
    rating: 4.5,
    reviewCount: 9,
    options: [{
      name: 'size',
      label: 'Size',
      kind: 'buttons',
      values: [{
        value: 'small',
        label: 'Small'
      }, {
        value: 'large',
        label: 'Large',
        price: 32,
        note: 'Only 3 left',
        stock: 3
      }]
    }]
  },
  b6: {
    description: 'The lives of the saints remembered in the Coptic month of Tobi, from the Synaxarium.',
    rating: 4.4,
    reviewCount: 6
  }
};
const DELIVERY = 'Pick up your order at the bookstore table after the Divine Liturgy on Sunday. Unopened items can be returned within 30 days.';
const PRODUCTS = _data.BOOKSTORE.map(b => Object.assign({
  id: b.id,
  title: b.name,
  meta: b.category,
  category: slug(b.category),
  price: b.price,
  stock: b.stock,
  outOfStock: b.stock === 0,
  delivery: DELIVERY
}, MORE[b.id]));
const CATEGORIES = [...new Set(_data.BOOKSTORE.map(b => b.category))].map(c => ({
  value: slug(c),
  label: c
}));
const productById = id => PRODUCTS.find(p => p.id === id);
const PICKS = ['b1', 'b4', 'b3'].map(productById);

// the order statuses, worded for pickup at the bookstore table
const STATUSES = Object.assign({}, _plenixPlatform.ORDER_STATUSES, {
  fulfilled: Object.assign({}, _plenixPlatform.ORDER_STATUSES.fulfilled, {
    label: 'Ready for pickup'
  }),
  delivered: Object.assign({}, _plenixPlatform.ORDER_STATUSES.delivered, {
    label: 'Picked up'
  })
});
const line = (p, q, options, price) => ({
  id: p.id + (options ? '-' + slug(options) : ''),
  title: p.title,
  options,
  price: price || p.price,
  quantity: q,
  max: p.stock || 99
});
const ORDER_KINDS = ['unfulfilled', 'unfulfilled', 'fulfilled', 'delivered', 'delivered', 'delivered', 'canceled', 'unfulfilled', 'delivered', 'fulfilled', 'refunded', 'delivered'];
const FIRST_ORDERS = ORDER_KINDS.map((status, i) => {
  const m = _data.MEMBERS[i * 37 % _data.MEMBERS.length];
  const items = [line(PRODUCTS[i % 5], 1 + i % 2), i % 3 ? null : line(PRODUCTS[(i + 2) % 5], 1)].filter(Boolean);
  const total = items.reduce((s, x) => s + x.price * x.quantity, 0);
  const date = '2026-10-' + String(24 - i).padStart(2, '0');
  return {
    id: 'o' + (i + 1),
    number: 'BK-' + (1042 - i),
    date,
    customer: m.name,
    email: m.email,
    items,
    total,
    currency: 'USD',
    status,
    payment: i % 2 ? 'Paid at the table' : 'Visa ending 4242 (test card)',
    delivery: {
      address: 'Bookstore table, fellowship hall',
      method: 'Pickup after the Divine Liturgy'
    },
    events: [{
      id: 1,
      time: day(date),
      dateTime: date,
      title: 'Order placed',
      icon: 'add'
    }].concat(status === 'delivered' ? [{
      id: 2,
      time: day('2026-10-25'),
      dateTime: '2026-10-25',
      title: 'Picked up',
      icon: 'circle-check'
    }] : [])
  };
});

// the icon print, ordered from its own panel: the size sets the price
function IconPrintPanel({
  onAdd
}) {
  (0, _plenixPlatform.useCommercePage)('product-discovery');
  const p = productById('b3');
  const [choice, setChoice] = useState({
    size: '8x10'
  });
  const [qty, setQty] = useState(1);
  const picked = p.options[0].values.find(v => v.value === choice.size) || {};
  const price = typeof picked.price === 'number' ? picked.price : p.price;
  return /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "star",
    title: "The parish icon, for your home",
    description: "Prints of the icon of St. John the Beloved, blessed on his feast."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ProductPrice, {
    price: price,
    currency: "USD",
    compareAtPrice: choice.size === '8x10' ? 30 : undefined
  }), /*#__PURE__*/React.createElement(_plenixPlatform.ProductOptions, {
    product: p.title,
    options: p.options,
    value: choice,
    onChange: next => setChoice(next),
    quantity: qty,
    onQuantityChange: n => setQty(n || 1),
    max: p.stock
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "add",
    onClick: () => onAdd(p, choice, qty, price)
  }, "Add the print to the cart"))));
}
function BookstoreScreen({
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [tab, setTab] = useState('shop');
  const [open, setOpen] = useState(null); // the product shown
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(FIRST_ORDERS);
  const [orderId, setOrderId] = useState(null); // the order shown
  const [returning, setReturning] = useState(null);
  const order = orders.find(o => o.id === orderId);
  const setStatus = (ids, status) => setOrders(list => list.map(o => ids.indexOf(o.id) >= 0 ? Object.assign({}, o, {
    status
  }) : o));
  const add = (p, choice, qty, price) => {
    const opt = p.options && choice && choice[p.options[0].name] ? p.options[0].values.find(v => v.value === choice[p.options[0].name]) || {} : null;
    const unit = price || (opt && typeof opt.price === 'number' ? opt.price : p.price);
    const item = line(p, qty || 1, opt ? opt.label || opt.value : undefined, unit);
    setCart(c => c.some(x => x.id === item.id) ? c.map(x => x.id === item.id ? Object.assign({}, x, {
      quantity: x.quantity + item.quantity
    }) : x) : c.concat([item]));
    toast.show(p.title + ' added to your cart.', {
      tone: 'success',
      action: {
        label: 'View cart',
        onAction: () => setTab('cart')
      }
    });
  };
  const quickAdd = p => {
    if (p.options) {
      setOpen(p.id);
      setTab('shop');
    } else add(p, null, 1);
  };
  const checkout = () => {
    const total = cart.reduce((s, x) => s + x.price * x.quantity, 0);
    const number = 'BK-' + (1043 + orders.length - FIRST_ORDERS.length);
    setOrders([{
      id: 'o' + (orders.length + 1),
      number,
      date: '2026-10-25',
      customer: _data.MEMBERS[0].name,
      email: _data.MEMBERS[0].email,
      items: cart,
      total,
      currency: 'USD',
      status: 'unfulfilled',
      payment: 'Pay at the table',
      delivery: {
        address: 'Bookstore table, fellowship hall',
        method: 'Pickup after the Divine Liturgy'
      },
      events: [{
        id: 1,
        time: day('2026-10-25'),
        dateTime: '2026-10-25',
        title: 'Order placed',
        icon: 'add'
      }]
    }].concat(orders));
    setCart([]);
    toast.show('Order ' + number + ' placed. Pick it up at the bookstore table after the Divine Liturgy.', {
      tone: 'success'
    });
  };
  const product = open ? productById(open) : null;
  const shop = product ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    icon: "arrow-left",
    onClick: () => setOpen(null)
  }, "Back to the bookstore")), /*#__PURE__*/React.createElement(_plenixPlatform.ProductDetail, {
    key: product.id,
    product: product,
    headingLevel: 2,
    onAddToCart: (p, choice, qty) => add(p, choice, qty),
    related: PRODUCTS.filter(p => p.id !== product.id && !p.outOfStock).slice(0, 3),
    onOpen: p => setOpen(p.id)
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "section"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ProductDiscovery, {
    products: PRODUCTS,
    categories: CATEGORIES,
    recommended: PRODUCTS.filter(p => p.rating >= 4.7),
    headingLevel: 2,
    title: "Books, icons and gifts",
    onOpen: p => setOpen(p.id),
    onAddToCart: quickAdd,
    suggestions: ['Agpeya', 'Kiahk', 'Icon', 'Children']
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Fr. Daniel's picks for the Nativity Fast"), /*#__PURE__*/React.createElement(_plenixPlatform.ContentGrid, {
    size: "md",
    label: "Fr. Daniel's picks"
  }, PICKS.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.ProductCard, {
    key: p.id,
    title: p.title,
    meta: p.meta,
    price: p.price,
    compareAtPrice: p.id === 'b3' ? 30 : undefined,
    rating: p.rating,
    reviewCount: p.reviewCount,
    onOpen: () => setOpen(p.id),
    onAddToCart: () => quickAdd(p)
  })))), /*#__PURE__*/React.createElement(IconPrintPanel, {
    onAdd: add
  }));
  const counts = Object.keys(STATUSES).map(k => [k, orders.filter(o => o.status === k).length]).filter(x => x[1]);
  const office = returning ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    icon: "arrow-left",
    onClick: () => setReturning(null)
  }, "Back to order ", returning.number)), /*#__PURE__*/React.createElement(_plenixPlatform.Returns, {
    order: returning,
    headingLevel: 2,
    reasons: [{
      value: 'damaged',
      label: 'It arrived damaged'
    }, {
      value: 'duplicate',
      label: 'We already have it'
    }, {
      value: 'wrong',
      label: 'The wrong item'
    }, {
      value: 'other',
      label: 'Another reason'
    }],
    resolutions: [{
      value: 'refund',
      label: 'A refund',
      description: 'To the card or as cash at the table.'
    }, {
      value: 'exchange',
      label: 'An exchange',
      description: 'Another copy or another item.'
    }],
    methods: [{
      value: 'table',
      label: 'Bring it to the bookstore table',
      description: 'After any Divine Liturgy.'
    }, {
      value: 'office',
      label: 'Leave it at the church office',
      description: 'Weekdays, 9 AM to 3 PM.'
    }],
    status: returning.status === 'returning' ? [{
      id: 1,
      time: day('2026-10-25'),
      dateTime: '2026-10-25',
      title: 'Return requested',
      icon: 'ed-undo'
    }] : undefined,
    onSubmit: async () => {
      setStatus([returning.id], 'returning');
      setReturning(Object.assign({}, returning, {
        status: 'returning'
      }));
      toast.show('Return requested for order ' + returning.number + '.', {
        tone: 'success'
      });
    },
    onCancel: () => setReturning(null)
  })) : order ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "ghost",
    icon: "arrow-left",
    onClick: () => setOrderId(null)
  }, "Every order")), /*#__PURE__*/React.createElement(_plenixPlatform.OrderDetail, {
    order: order,
    statuses: STATUSES,
    headingLevel: 2,
    onFulfill: o => {
      setStatus([o.id], 'fulfilled');
      toast.show('Order ' + o.number + ' is ready for pickup.', {
        tone: 'success'
      });
    },
    onRefund: o => {
      setStatus([o.id], 'refunded');
      toast.show('Order ' + o.number + ' refunded.', {
        tone: 'info'
      });
    },
    onCancel: o => setStatus([o.id], 'canceled'),
    onReturn: o => setReturning(o)
  })) : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, counts.map(([k, n]) => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: k,
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.OrderStatus, {
    status: k,
    statuses: STATUSES
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, (0, _plenixPlatform.formatNumber)(n))))), /*#__PURE__*/React.createElement(_plenixPlatform.OrderManagement, {
    orders: orders,
    statuses: STATUSES,
    strings: {
      label: 'Bookstore orders',
      fulfill: 'Ready for pickup'
    },
    onOpen: o => setOrderId(o.id),
    onFulfill: list => setStatus(list.map(o => o.id), 'fulfilled'),
    onCancel: list => setStatus(list.map(o => o.id), 'canceled'),
    onRefund: o => setStatus([o.id], 'refunded')
  }));
  const count = cart.reduce((s, x) => s + x.quantity, 0);
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Bookstore"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "Prayer books, hymns, icons and gifts from the Library and Bookstore ministry. Orders are ready at the bookstore table after the Divine Liturgy.")), /*#__PURE__*/React.createElement(_plenixPlatform.Tabs, {
    variant: "folder",
    label: "Bookstore",
    value: tab,
    onChange: setTab,
    items: [{
      value: 'shop',
      label: 'Shop',
      icon: 'bookmark',
      content: shop
    }, {
      value: 'catalog',
      label: 'Catalog',
      icon: 'list-lines',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.ProductListing, {
        products: PRODUCTS,
        categories: CATEGORIES,
        title: "Every item",
        headingLevel: 2,
        description: "Everything the bookstore carries, with what is in stock.",
        defaultView: {
          layout: 'list'
        },
        onOpen: p => {
          setOpen(p.id);
          setTab('shop');
        },
        onAddToCart: quickAdd
      })
    }, {
      value: 'cart',
      label: 'Cart',
      icon: 'briefcase',
      count: count || undefined,
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Cart, {
        items: cart,
        headingLevel: 2,
        taxRate: 0.06625,
        onQuantityChange: (item, n) => setCart(c => c.map(x => x.id === item.id ? Object.assign({}, x, {
          quantity: n
        }) : x)),
        onRemove: item => setCart(c => c.filter(x => x.id !== item.id)),
        onRestore: item => setCart(c => c.some(x => x.id === item.id) ? c : c.concat([item])),
        onApplyPromo: async code => {
          if (code.toUpperCase() !== 'SERVANT10') throw new Error('This code cannot be used. Servants of the parish use SERVANT10.');
          return {
            discount: Math.round(cart.reduce((s, x) => s + x.price * x.quantity, 0) * 10) / 100,
            label: 'SERVANT10 · 10% off'
          };
        },
        onCheckout: checkout
      })
    }, {
      value: 'orders',
      label: 'Orders',
      icon: 'checklist',
      content: office
    }]
  }))));
}
  } },
  "test-site/screens/announcements.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnouncementsScreen = AnnouncementsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Announcements (test-site/screens/announcements.jsx): the church office's list of
   parish announcements. A ContentManagementPage of the ANNOUNCEMENTS (one card each, opening its editor), filtered by
   status with a SegmentedControl; a page Banner for the Nativity Fast, a pinned Announcement card (Kiahk), a Notice about the draft
   waiting for review, the review itself (ReviewFlow), each announcement's publishing state (Publish) and the office's
   NotificationList. Every name and message is made up. */
const {
  useState
} = React;
const STATUS = {
  Published: 'published',
  Scheduled: 'scheduled',
  Draft: 'draft'
};
const WHEN = {
  a1: '2026-10-24T09:00',
  a2: '2026-10-22T18:30',
  a4: '2026-12-05T08:00'
};
const NOTIFICATIONS = [{
  id: 'n1',
  text: 'Fr. Antony Wahba asked for changes to “Fellowship hall: the next building milestone”',
  time: '2026-10-25T09:12',
  unread: true
}, {
  id: 'n2',
  text: 'Mina Habib published “Servants needed for the parish festival”',
  time: '2026-10-22T18:30',
  unread: true
}, {
  id: 'n3',
  text: '“Kiahk Midnight Praises schedule” is scheduled for December 5',
  time: '2026-10-15T14:02',
  unread: false
}, {
  id: 'n4',
  text: '120 families were sent “The Nativity Fast begins on November 25”',
  time: '2026-10-24T09:01',
  unread: false
}];
function AnnouncementsScreen({
  screen,
  chrome
}) {
  const [items, setItems] = useState(() => _data.ANNOUNCEMENTS.map(a => ({
    ...a,
    state: STATUS[a.status] || 'draft',
    at: WHEN[a.id]
  })));
  const [tab, setTab] = useState('all');
  const [fastBanner, setFastBanner] = useState(true);
  const [draftNotice, setDraftNotice] = useState(true);
  const [notes, setNotes] = useState(NOTIFICATIONS);
  const [review, setReview] = useState({
    status: 'in-review',
    history: [{
      id: 'h1',
      name: 'Fr. Antony Wahba',
      decision: 'changes-requested',
      comment: 'Please add the amount still needed for the roof.',
      time: 'Oct 25, 9:12 AM',
      dateTime: '2026-10-25T09:12'
    }]
  });
  const open = id => screen.navigate('/announcement/' + id);
  const setState = (id, state, at) => setItems(list => list.map(a => a.id === id ? {
    ...a,
    state,
    at
  } : a));
  const now = () => new Date().toISOString().slice(0, 16);
  const count = s => items.filter(a => s === 'all' || a.state === s).length;
  const shown = items.filter(a => tab === 'all' || a.state === tab);
  const cards = shown.map(a => ({
    id: a.id,
    title: a.title,
    description: a.body + ' · ' + a.author + ' · ' + a.audience,
    icon: 'hdr-bell',
    href: '#/announcement/' + a.id
  }));
  const draft = items.find(a => a.id === 'a3');
  return /*#__PURE__*/React.createElement(_plenixPlatform.ContentManagementPage, _extends({}, chrome, {
    title: "Announcements",
    description: "What the parish hears from the church office: the weekly bulletin, the website and the families\u2019 email.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      icon: "add",
      onClick: () => open('a1')
    }, "New announcement"),
    items: cards,
    onOpen: item => open(item.id),
    strings: {
      empty: 'No announcements with this status',
      emptyDescription: 'Choose another tab to see the others.'
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, fastBanner ? /*#__PURE__*/React.createElement(_plenixPlatform.Banner, {
    tone: "info",
    title: "The Nativity Fast begins on November 25.",
    onDismiss: () => setFastBanner(false),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      onClick: () => open('a1')
    }, "Open the announcement")
  }, "The fast runs until the Feast of the Nativity on January 7. Check that the fasting menu is in the bulletin.") : null, draftNotice && draft && draft.state === 'draft' ? /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "warning",
    title: "A draft is waiting for review",
    onDismiss: () => setDraftNotice(false),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "xs",
      onClick: () => open('a3')
    }, "Open the draft")
  }, "\u201C", draft.title, "\u201D needs the parish priest\u2019s approval before it goes to the families.") : null, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Pinned"), /*#__PURE__*/React.createElement(_plenixPlatform.Announcement, {
    id: "kiahk-2026",
    variant: "card",
    title: "Kiahk Midnight Praises",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
      href: "#/announcement/a4",
      variant: "standalone"
    }, "See the schedule"),
    onDismiss: () => Promise.resolve()
  }, "Every Saturday of Kiahk the Midnight Praises begin at 8:00 PM, after Vespers. This note stays at the top of the parish website until the Feast of the Nativity."), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-end",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Publishing",
    description: "Each announcement\u2019s state. Publishing sends it to the website and the families\u2019 email."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, items.map(a => /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs",
    key: a.id
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
    href: '#/announcement/' + a.id,
    variant: "standalone"
  }, a.title), /*#__PURE__*/React.createElement(_plenixPlatform.Publish, {
    name: a.title,
    status: a.state,
    audience: a.audience === 'Servants' ? 'the parish servants' : 'every family of the parish',
    publishedAt: a.state === 'published' ? a.at : undefined,
    scheduledFor: a.state === 'scheduled' ? a.at : undefined,
    by: a.author,
    onPublish: () => setState(a.id, 'published', now()),
    onSchedule: at => setState(a.id, 'scheduled', at),
    onCancelSchedule: () => setState(a.id, 'draft'),
    onUnpublish: () => setState(a.id, 'draft')
  }))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Waiting for review"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ReviewFlow, {
    title: draft ? draft.title : 'Fellowship hall',
    detail: "Submitted by the parish council on October 18",
    status: review.status,
    history: review.history,
    reviewers: [{
      id: 'c1',
      name: _data.CLERGY[0].name,
      decision: review.status === 'approved' ? 'approved' : undefined
    }, {
      id: 'c2',
      name: _data.CLERGY[1].name,
      decision: 'changes-requested'
    }],
    onDecision: (decision, comment) => setReview(r => ({
      status: decision,
      history: [{
        id: 'h' + (r.history.length + 1),
        name: _data.CLERGY[0].name,
        decision,
        comment,
        time: 'Just now',
        dateTime: now()
      }].concat(r.history)
    }))
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Notifications"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NotificationList, {
    items: notes,
    onChange: setNotes,
    onOpen: () => open('a3'),
    label: "Announcement notifications"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.SegmentedControl, {
    label: "Show announcements",
    value: tab,
    onChange: setTab,
    options: [{
      value: 'all',
      label: 'All (' + count('all') + ')'
    }, {
      value: 'published',
      label: 'Published (' + count('published') + ')'
    }, {
      value: 'scheduled',
      label: 'Scheduled (' + count('scheduled') + ')'
    }, {
      value: 'draft',
      label: 'Drafts (' + count('draft') + ')'
    }]
  })));
}
  } },
  "test-site/screens/announcement-edit.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnouncementEditScreen = AnnouncementEditScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Edit announcement (test-site/screens/announcement-edit.jsx): the church office writes
   one parish announcement. A SinglePaneWorkspace: the title and the body in a RichTextEditor (mentions of servants), the
   preview as members see it (RichText of the person's own formatted text: plx-user-content), saving as it goes
   (useAutosave with Autosave, SaveStatus and DraftState), Save as a copy (SaveAs in a Dialog), Publish, the priest's
   review (ReviewFlow), the comments (CommentThread, a pinned Comment, a MentionInput note to a servant), who else is
   editing (PresenceBar), the announcement's ID (Code, CopyButton) and link (useClipboard), the embed snippet for the
   parish website (CodeBlock), and its words for screen readers (VisuallyHidden, LiveRegion). Every name is made up. */
const {
  useState,
  useMemo
} = React;

// the announcement's public ID: a1 is ANN-2026-104, a2 ANN-2026-103, …
const codeOf = id => 'ANN-2026-' + (104 - Math.max(0, _data.ANNOUNCEMENTS.findIndex(a => a.id === id)));
const SERVANTS = _data.MEMBERS.filter(m => m.servant).slice(0, 40).map(m => ({
  value: m.id,
  label: m.name,
  description: m.email
}));
const EDITORS = [{
  id: 'me',
  name: 'Church office',
  role: 'editor'
}, {
  id: 'c1',
  name: _data.CLERGY[0].name,
  role: 'editor',
  cursor: 'Reading the second paragraph'
}, {
  id: 's1',
  name: 'Marina Girgis',
  role: 'viewer'
}];
const LOCATIONS = [{
  id: 'announcements',
  label: 'Announcements',
  icon: 'folder',
  children: [{
    id: 'bulletin',
    label: 'Weekly bulletin',
    icon: 'folder'
  }, {
    id: 'website',
    label: 'Parish website',
    icon: 'folder'
  }]
}, {
  id: 'templates',
  label: 'Templates',
  icon: 'folder'
}];

// the starting body: the person's own formatting (a centered heading, a colored lead-in) is kept as user content
function bodyOf(a) {
  return "<h2 style='text-align: center'>" + a.title + '</h2>' + '<p>' + a.body + '</p>' + "<p><span style='color: maroon'><strong>Please note:</strong></span> the Divine Liturgy keeps its Sunday time, 8:00 AM. " + 'Questions go to the church office, ' + _data.CHURCH.phone + '.</p>' + '<ul><li>Fasting menu: in the documents</li><li>Agape meals during the fast are vegan</li></ul>';
}
function AnnouncementEditScreen({
  screen,
  chrome
}) {
  const a = _data.ANNOUNCEMENTS.find(x => x.id === screen.id) || _data.ANNOUNCEMENTS[0];
  const code = codeOf(a.id);
  const link = 'https://stjohn-beloved.example/announcements/' + code;
  const [title, setTitle] = useState(a.title);
  const [html, setHtml] = useState(() => bodyOf(a));
  const [status, setStatus] = useState(a.status === 'Published' ? 'published' : a.status === 'Scheduled' ? 'scheduled' : 'draft');
  const [when, setWhen] = useState(a.status === 'Scheduled' ? '2026-12-05T08:00' : '2026-10-24T09:00');
  const [saveAsOpen, setSaveAsOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [copies, setCopies] = useState([]);
  const [note, setNote] = useState('');
  const [mentioned, setMentioned] = useState([]);
  const [message, setMessage] = useState('');
  const [review, setReview] = useState({
    status: 'in-review',
    history: []
  });
  const [comments, setComments] = useState([{
    id: 'k1',
    author: {
      name: _data.CLERGY[0].name
    },
    body: 'Please add the vegan Agape note for the fasting Sundays.',
    time: '2026-10-24T08:40:00Z'
  }, {
    id: 'k2',
    author: {
      name: 'Church office'
    },
    body: 'Added it as the second item of the list.',
    time: '2026-10-24T08:52:00Z',
    own: true
  }]);
  const clip = (0, _plenixPlatform.useClipboard)();
  const value = useMemo(() => ({
    title,
    html
  }), [title, html]);
  const save = (0, _plenixPlatform.useAutosave)(value, () => new Promise(resolve => setTimeout(resolve, 400)));
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  const now = () => new Date().toISOString().slice(0, 16);
  const sendNote = () => {
    if (!note.trim()) {
      setMessage('Write a note first.');
      return;
    }
    setComments(list => list.concat({
      id: 'k' + (list.length + 1),
      author: {
        name: 'Church office'
      },
      body: note.trim(),
      time: new Date().toISOString(),
      own: true
    }));
    setMessage('Note added to the comments' + (mentioned.length ? ' for ' + mentioned.join(', ') : '') + '.');
    setNote('');
    setMentioned([]);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.SinglePaneWorkspace, _extends({}, chrome, {
    title: "Edit announcement",
    description: 'For ' + a.audience.toLowerCase() + ' · written by ' + a.author,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "save-doc",
      onClick: () => setSaveAsOpen(true)
    }, "Save as a copy"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "arrow-left",
      variant: "ghost",
      onClick: () => screen.navigate('/announcements')
    }, "All announcements")),
    toolbar: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      wrap: true,
      gap: "md",
      justify: "between"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
      wrap: true,
      gap: "sm"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.DraftState, {
      version: "3",
      saveState: save.state,
      onResume: () => Promise.resolve(),
      onDiscard: () => new Promise(resolve => {
        setTitle(a.title);
        setHtml(bodyOf(a));
        setEditorKey(k => k + 1);
        resolve();
      })
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Autosave, {
      state: save.state,
      onRetry: save.retry
    })), /*#__PURE__*/React.createElement(_plenixPlatform.PresenceBar, {
      people: EDITORS,
      mode: "editors"
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-end",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Announcement"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Title",
    required: true,
    error: title.trim() ? undefined : 'Give the announcement a title.'
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: title,
    onChange: e => setTitle(e.target.value)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Body"), /*#__PURE__*/React.createElement(_plenixPlatform.RichTextEditor, {
    key: editorKey,
    label: "Announcement body",
    toolbar: "full",
    defaultValue: html,
    onChange: setHtml,
    placeholder: "Write the announcement; type @ to mention a servant",
    mentions: {
      search: q => SERVANTS.filter(p => p.label.toLowerCase().startsWith(String(q).toLowerCase())).slice(0, 8)
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, words), " words", /*#__PURE__*/React.createElement(_plenixPlatform.VisuallyHidden, null, " in the announcement body"))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Preview",
    description: "How families see it on the parish website and in the email."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RichText, {
    variant: "article",
    html: html
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Comments"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Comment, {
    author: {
      name: 'Fr. Antony Wahba'
    },
    body: "Pinned: announcements during the fast go out on Thursdays, so they are in the Sunday bulletin.",
    time: "2026-10-20T10:00:00Z",
    resolved: true
  }), /*#__PURE__*/React.createElement(_plenixPlatform.CommentThread, {
    title: "Discussion",
    comments: comments,
    onReply: text => setComments(list => list.concat({
      id: 'k' + (list.length + 1),
      author: {
        name: 'Church office'
      },
      body: text,
      time: new Date().toISOString(),
      own: true
    }))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MentionInput, {
    label: "Note to a servant (type @ to mention one)",
    value: note,
    onChange: setNote,
    options: SERVANTS,
    onMention: option => setMentioned(list => list.concat(option.label))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "message",
    onClick: sendNote
  }, "Add the note")), /*#__PURE__*/React.createElement(_plenixPlatform.LiveRegion, {
    kind: "status",
    visible: true
  }, message))))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Publishing"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Publish, {
    name: title || 'this announcement',
    status: status,
    audience: a.audience === 'Servants' ? 'the parish servants' : 'every family of the parish',
    publishedAt: status === 'published' ? when : undefined,
    scheduledFor: status === 'scheduled' ? when : undefined,
    by: a.author,
    onPublish: () => {
      setStatus('published');
      setWhen(now());
    },
    onSchedule: at => {
      setStatus('scheduled');
      setWhen(at);
    },
    onCancelSchedule: () => setStatus('draft'),
    onUnpublish: () => setStatus('draft')
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Last saved"), /*#__PURE__*/React.createElement(_plenixPlatform.SaveStatus, {
    state: save.state
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Review"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ReviewFlow, {
    title: title || 'Announcement',
    detail: "Sent to the parish priest for approval",
    status: review.status,
    history: review.history,
    reviewers: [{
      id: 'c1',
      name: _data.CLERGY[0].name,
      decision: review.history[0] ? review.history[0].decision : undefined
    }],
    onDecision: (decision, comment) => setReview(r => ({
      status: decision,
      history: [{
        id: 'r' + (r.history.length + 1),
        name: _data.CLERGY[0].name,
        decision,
        comment,
        time: 'Just now',
        dateTime: now()
      }].concat(r.history)
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Sharing"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, "Announcement ID ", /*#__PURE__*/React.createElement(_plenixPlatform.Code, null, code)), /*#__PURE__*/React.createElement(_plenixPlatform.CopyButton, {
    value: code,
    label: "Copy announcement ID",
    size: "xs"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: clip.copied ? 'check' : 'link',
    onClick: () => clip.copy(link)
  }, clip.copied ? 'Copied' : 'Copy the announcement link'), /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
    href: link,
    external: true
  }, "Open on the website")), /*#__PURE__*/React.createElement(_plenixPlatform.CodeBlock, {
    title: "Embed on the parish website",
    language: "html"
  }, '<div class="stjohn-announcement" data-id="' + code + '"></div>\n<script src="https://stjohn-beloved.example/embed.js" async></script>'), /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
    href: "#/announcements",
    back: true
  }, "Announcements"))), copies.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Copies"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, copies.map(c => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: c.name,
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, c.name), /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    icon: "check",
    tone: "success"
  }, "Saved"))))) : null)), /*#__PURE__*/React.createElement(_plenixPlatform.Dialog, {
    open: saveAsOpen,
    onClose: () => setSaveAsOpen(false),
    title: "Save a copy",
    description: "The copy starts as a draft; this announcement stays as it is."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SaveAs, {
    locations: LOCATIONS,
    initialName: title + ' (copy)',
    initialLocation: "announcements",
    formats: [{
      value: 'announcement',
      label: 'Announcement'
    }, {
      value: 'template',
      label: 'Template'
    }],
    onSave: copy => new Promise(resolve => {
      setCopies(list => list.concat(copy));
      setSaveAsOpen(false);
      resolve();
    }),
    onCancel: () => setSaveAsOpen(false)
  })));
}
  } },
  "test-site/screens/messages.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessagesScreen = MessagesScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Messages (test-site/screens/messages.jsx): the church office inbox. The conversations
   in an ActivityList (unread ones marked), the open one in Chat (its header, the thread, the typing dots and the
   composer; a sent message gets a made-up reply), who in the office is also reading it (PresenceBar), and the Agape
   sign-up the Habib family is asking about, which the office can update from here. Every name and message is made up. */

const {
  useState,
  useEffect,
  useRef
} = React;
const AGAPE = _data.SERVING_SLOTS.find(s => s.ministry === 'agape');
const START = [{
  id: 'habib',
  title: 'The Habib family',
  meta: 'Agape sign-up for November 1',
  unread: true,
  reply: 'Thank you! We will bring the lentil soup.',
  messages: [{
    id: 1,
    author: 'Nevine Habib',
    time: '9:02 AM',
    dateTime: '2026-10-25T09:02',
    text: 'Good morning! Can our family serve at the Agape meal on November 1? We are four.'
  }, {
    id: 2,
    author: 'Nevine Habib',
    time: '9:03 AM',
    dateTime: '2026-10-25T09:03',
    text: 'The kids can set the tables, and I can help in the kitchen.'
  }, {
    id: 3,
    mine: true,
    time: '9:20 AM',
    dateTime: '2026-10-25T09:20',
    text: 'Good morning, Nevine. The kitchen has six servants already; setting the tables still needs hands.'
  }, {
    id: 4,
    author: 'Nevine Habib',
    time: '9:24 AM',
    dateTime: '2026-10-25T09:24',
    text: 'Tables it is. What time should we come?'
  }]
}, {
  id: 'pantry',
  title: 'Sarah Ibrahim',
  meta: 'Food Pantry: Saturday sorting',
  unread: true,
  reply: 'Perfect, I will tell the sorting team.',
  messages: [{
    id: 1,
    author: 'Sarah Ibrahim',
    time: '8:15 AM',
    dateTime: '2026-10-25T08:15',
    text: 'We are three servants short for Saturday’s sorting. Could the office put it in the bulletin?'
  }]
}, {
  id: 'bulletin',
  title: _data.CLERGY[1].name,
  meta: 'This week’s bulletin',
  unread: false,
  reply: 'Good. Send me the final copy on Thursday.',
  messages: [{
    id: 1,
    author: _data.CLERGY[1].name,
    time: 'Yesterday',
    dateTime: '2026-10-24T16:40',
    text: 'Please add the Bible Study on the Gospel of St. John to the bulletin.'
  }, {
    id: 2,
    mine: true,
    time: 'Yesterday',
    dateTime: '2026-10-24T16:55',
    text: 'Added, Abouna, on page two with the room and the time.'
  }]
}, {
  id: 'girgis',
  title: 'The Girgis family',
  meta: 'Sunday School for a new child',
  unread: false,
  reply: 'Thank you, we will be there on Sunday.',
  messages: [{
    id: 1,
    author: 'Mark Girgis',
    time: 'Oct 22',
    dateTime: '2026-10-22T19:10',
    text: 'Our daughter turns six this month. Which Sunday School class should she join?'
  }, {
    id: 2,
    mine: true,
    time: 'Oct 22',
    dateTime: '2026-10-22T19:30',
    text: 'Kindergarten, with Marina Girgis, in classroom 2 after the Divine Liturgy.'
  }]
}];
const OFFICE = [{
  id: 'o1',
  name: 'Church office',
  role: 'viewer'
}, {
  id: 'o2',
  name: _data.CLERGY[0].name,
  role: 'viewer'
}];
const clock = () => new Date().toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: '2-digit'
});
function MessagesScreen({
  chrome
}) {
  const [convs, setConvs] = useState(START);
  const [openId, setOpenId] = useState('habib');
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const signed = AGAPE ? AGAPE.signed.length : 0;
  const [added, setAdded] = useState(false);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const conv = convs.find(c => c.id === openId);
  const update = (id, fn) => setConvs(list => list.map(c => c.id === id ? fn(c) : c));
  const open = id => {
    setOpenId(id);
    setTyping(false);
    update(id, c => ({
      ...c,
      unread: false
    }));
  };
  const send = value => {
    const body = String(value || '').trim();
    if (!body) return;
    const id = openId;
    update(id, c => ({
      ...c,
      messages: c.messages.concat({
        id: c.messages.length + 1,
        mine: true,
        time: clock(),
        text: body
      })
    }));
    setText('');
    timers.current.push(setTimeout(() => setTyping(true), 800));
    timers.current.push(setTimeout(() => {
      setTyping(false);
      update(id, c => ({
        ...c,
        messages: c.messages.concat({
          id: c.messages.length + 1,
          author: c.messages.find(m => !m.mine).author,
          time: clock(),
          text: c.reply
        })
      }));
    }, 2600));
  };
  const unread = convs.filter(c => c.unread).length;
  const theirs = conv.messages.find(m => !m.mine).author;
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage, {
    header: /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: "Messages",
      description: "The church office inbox: families, servants and clergy.",
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
        tone: unread ? 'active' : 'neutral',
        icon: "mail"
      }, unread ? unread + ' unread' : 'All read')
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-start",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Inbox",
    flush: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList, {
    label: "Conversations",
    stacked: true
  }, convs.map(c => {
    const last = c.messages[c.messages.length - 1];
    return /*#__PURE__*/React.createElement(_plenixPlatform.ActivityList.Item, {
      key: c.id,
      leading: /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
        name: c.title.replace(/^The | family$/g, ''),
        size: "sm"
      }),
      title: c.title,
      meta: c.meta + ' · ' + last.text,
      time: last.time,
      dateTime: last.dateTime,
      unread: c.unread,
      selected: c.id === openId,
      onOpen: () => open(c.id)
    });
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Header, {
    title: conv.title,
    meta: conv.meta,
    avatar: /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
      name: theirs
    }),
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.PresenceBar, {
      people: OFFICE,
      mode: "viewers",
      max: 3
    })
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Thread, {
    label: 'Conversation with ' + conv.title
  }, conv.messages.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Message, {
    key: m.id,
    mine: !!m.mine,
    author: m.mine ? undefined : m.author,
    time: m.time,
    dateTime: m.dateTime,
    avatar: m.mine ? undefined : /*#__PURE__*/React.createElement(_plenixPlatform.Avatar, {
      name: m.author,
      size: "xs"
    })
  }, m.text)), typing ? /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Typing, {
    label: theirs + ' is typing'
  }) : null), /*#__PURE__*/React.createElement(_plenixPlatform.Chat.Composer, {
    value: text,
    onChange: setText,
    onSend: send,
    label: 'Message to ' + conv.title,
    placeholder: "Write a message"
  }), conv.id === 'habib' && AGAPE ? /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Agape sign-up \xB7 November 1",
    description: "Kitchen and tables after the Divine Liturgy, from 10:30 AM."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "md",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, signed), " of ", /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, AGAPE.needed), " kitchen servants signed up", added ? ', plus the Habib family on tables' : '', "."), added ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "circle-check"
  }, "Habib family added") : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "add",
    onClick: () => setAdded(true)
  }, "Add the Habib family to tables")), AGAPE.signed.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Kitchen: ", AGAPE.signed.map(id => ((0, _data.memberById)(id) || {}).name).filter(Boolean).join(', ')) : null)) : null)))));
}
  } },
  "test-site/screens/assistant.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AssistantScreen = AssistantScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Parish assistant (test-site/screens/assistant.jsx): an AI helper for the church office
   that drafts announcements, finds members and summarizes the week. Every answer is canned (made up for the test site)
   and labeled as AI-generated. It shows AIChat (the conversation, with PromptSuggestions and SuggestedAction beside it),
   the AssistantPanel in the page's side panel, AIButton (a menu of quick requests), AIDisclaimer, AILabel; drafting an
   announcement with PromptInput, StreamingText, GeneratedContent (versions), RefineMenu, SuggestedEdit, Citation,
   ConfidenceIndicator and AIExplanation; finding members with AISearch and Recommendation; and PromptHistory. */

const {
  useState,
  useEffect,
  useRef
} = React;

// the site documents the answers cite (never scripture)
const SRC = {
  bulletin: {
    id: 'd1',
    title: _data.DOCUMENTS[0].name,
    href: '#/document/d1',
    excerpt: 'This week’s services, meetings and serving needs.',
    author: 'Church office'
  },
  menu: {
    id: 'd2',
    title: _data.DOCUMENTS[1].name,
    href: '#/document/d2',
    excerpt: 'Vegan Agape meals for every Sunday of the fast.',
    author: 'Agape Kitchen'
  },
  guide: {
    id: 'd4',
    title: _data.DOCUMENTS[3].name,
    href: '#/document/d4',
    excerpt: 'How servants sign up and swap a serving slot.',
    author: 'Fr. Daniel Boulos'
  },
  calendar: {
    id: 'cal',
    title: 'Parish calendar',
    href: '#/calendar',
    excerpt: 'Services and events from October 25 to October 31.'
  }
};
const SOUND = _data.SERVING_SLOTS.find(s => s.ministry === 'media');
const FREE = _data.MEMBERS.filter(m => m.servant && m.status === 'active').slice(0, 4).map(m => m.name);

// the canned answers (made up), chosen by the words of the request
function answerFor(text) {
  const q = String(text).toLowerCase();
  if (/summar|week/.test(q)) return {
    sources: [SRC.bulletin, SRC.calendar],
    text: 'This week: the Divine Liturgy and the Agape meal on Sunday (118 families answered), Servants’ Preparation on Tuesday, ' + 'Bible Study on the Gospel of St. John on Wednesday, the Youth Meeting on Friday, and the Food Pantry and Vespers on Saturday. ' + 'Two things need the office: the Food Pantry is three servants short for Saturday’s sorting, and the sound desk has no one for November 1.'
  };
  if (/draft|announce|fast/.test(q)) return {
    sources: [SRC.menu],
    text: 'Draft: The Nativity Fast begins on Wednesday, November 25, and continues until the Feast of the Nativity on January 7. ' + 'The Agape meals during the fast are vegan; the fasting menu is in the parish documents. The Divine Liturgy keeps its Sunday time, 8:00 AM.'
  };
  if (/find|member|servant|sound/.test(q)) return {
    sources: [SRC.guide],
    text: 'Servants who are active and free on November 1: ' + FREE.join(', ') + '. The sound desk slot (' + (SOUND ? SOUND.time : '7:30') + ') still needs one servant; the Media and Sound lead can train a new one.'
  };
  return {
    sources: [],
    text: 'I can draft announcements, find members and families, and summarize the week for the church office. Try one of the suggestions.'
  };
}
const SHORTER = 'The Nativity Fast runs from November 25 to January 7. Agape meals are vegan; the menu is in the documents.';
const FORMAL = 'The faithful are reminded that the Holy Nativity Fast begins on Wednesday, November 25, and concludes with the Feast of the Nativity on January 7.';

// a made-up stream: the words of a canned answer arrive a few at a time
function useStream() {
  const timer = useRef(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => () => clearInterval(timer.current), []);
  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
    setBusy(false);
  };
  const run = (full, step, done) => {
    stop();
    setBusy(true);
    const words = full.split(' ');
    let i = 0;
    timer.current = setInterval(() => {
      i = Math.min(words.length, i + 3);
      step(words.slice(0, i).join(' '));
      if (i >= words.length) {
        clearInterval(timer.current);
        timer.current = null;
        setBusy(false);
        if (done) done();
      }
    }, 80);
  };
  return {
    run,
    stop,
    busy
  };
}
function useConversation(initial) {
  const [messages, setMessages] = useState(initial);
  const stream = useStream();
  const set = (id, patch) => setMessages(list => list.map(m => m.id === id ? {
    ...m,
    ...patch
  } : m));
  const send = async text => {
    const answer = answerFor(text);
    const id = 'a' + Date.now();
    setMessages(list => list.concat({
      id: id + '-q',
      role: 'user',
      text
    }, {
      id,
      role: 'assistant',
      text: '',
      state: 'streaming',
      sources: answer.sources
    }));
    stream.run(answer.text, part => set(id, {
      text: part
    }), () => set(id, {
      state: 'done',
      onFeedback: () => Promise.resolve(),
      onRefine: ({
        action
      }) => {
        set(id, {
          text: action === 'shorter' ? answer.text.split('. ')[0] + '.' : answer.text
        });
        return Promise.resolve();
      }
    }));
  };
  const stop = () => {
    stream.stop();
    setMessages(list => list.map(m => m.state === 'streaming' ? {
      ...m,
      state: 'stopped'
    } : m));
  };
  return {
    messages,
    send,
    stop,
    streaming: stream.busy
  };
}
const SUGGESTIONS = [{
  id: 's1',
  label: 'Summarize this week',
  prompt: 'Summarize this week for the parish council',
  description: 'Services, meetings and serving needs'
}, {
  id: 's2',
  label: 'Draft the Nativity Fast announcement',
  prompt: 'Draft the Nativity Fast announcement for the bulletin',
  description: 'From the fasting menu'
}, {
  id: 's3',
  label: 'Find a servant for the sound desk',
  prompt: 'Find a servant for the sound desk on November 1',
  description: 'Active servants who are free'
}];
const HISTORY = [{
  id: 'p1',
  prompt: 'Summarize last week for Fr. Daniel',
  createdAt: '2026-10-18T19:30:00'
}, {
  id: 'p2',
  prompt: 'Draft a thank-you note for the Feast of the Cross servants',
  createdAt: '2026-09-28T10:05:00'
}, {
  id: 'p3',
  prompt: 'Find families in the North district without a Sunday School child',
  createdAt: '2026-09-20T15:40:00'
}, {
  id: 'p4',
  prompt: 'Draft the Nayrouz announcement',
  createdAt: '2026-09-02T09:12:00'
}];
const RECOMMENDED = [{
  id: 'r1',
  title: 'Ask the Media and Sound servants about November 1',
  description: 'The sound desk has no servant yet.',
  reason: 'The slot starts in 7 days and nobody has signed up.',
  href: '#/servants'
}, {
  id: 'r2',
  title: 'Put the Food Pantry need in the bulletin',
  description: 'Three servants short for Saturday’s sorting.',
  reason: 'The bulletin goes to print on Thursday.',
  href: '#/announcements'
}, {
  id: 'r3',
  title: 'Welcome the visitors from last Sunday',
  description: 'Four visitors filled in the welcome card.',
  reason: 'Visitors who hear from the parish within a week come back more often.',
  href: '#/members'
}, {
  id: 'r4',
  title: 'Send the Kiahk hymns to the choir',
  description: 'The Hymns of Kiahk are in the documents.',
  reason: 'Kiahk begins on December 10.',
  href: '#/document/d7'
}];
const versionOf = (n, text, label) => ({
  id: 'v' + n,
  label: label || 'Version ' + n,
  text,
  content: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, text)
});
function AssistantScreen({
  screen,
  chrome
}) {
  const [tab, setTab] = useState('chat');
  const [panelOpen, setPanelOpen] = useState(true);
  const [prompt, setPrompt] = useState('');
  const chat = useConversation([{
    id: 'w1',
    role: 'assistant',
    text: 'Good morning. I can draft announcements, find members and summarize the week. Every answer here is made up for the test site.',
    state: 'done'
  }]);
  const side = useConversation([]);

  // drafting an announcement
  const [draftPrompt, setDraftPrompt] = useState('A short announcement for the start of the Nativity Fast');
  const [model, setModel] = useState('careful');
  const [live, setLive] = useState(null);
  const [versions, setVersions] = useState([versionOf(1, answerFor('draft').text.replace(/^Draft: /, ''))]);
  const [versionId, setVersionId] = useState('v1');
  const draftStream = useStream();
  const count = useRef(1);
  const addVersion = (text, label) => {
    const n = ++count.current;
    setVersions(list => list.concat(versionOf(n, text, label)));
    setVersionId('v' + n);
  };
  const current = versions.find(v => v.id === versionId) || versions[versions.length - 1];
  const sendDraft = async () => {
    const full = answerFor('draft').text.replace(/^Draft: /, '');
    setLive({
      text: '',
      state: 'streaming'
    });
    draftStream.run(full, part => setLive({
      text: part,
      state: 'streaming'
    }), () => {
      setLive(null);
      addVersion(full);
    });
  };
  const [edits, setEdits] = useState([{
    id: 'e1',
    before: 'The fast runs until the Feast of the Nativity',
    after: 'The fast continues until the Feast of the Nativity',
    status: 'pending'
  }, {
    id: 'e2',
    before: 'A fasting menu is posted in the documents.',
    after: 'The fasting menu for the vegan Agape meals is in the parish documents.',
    status: 'pending'
  }]);
  const ask = text => {
    setTab('chat');
    chat.send(text);
  };
  const panel = /*#__PURE__*/React.createElement(_plenixPlatform.AssistantPanel, {
    open: panelOpen,
    onOpenChange: setPanelOpen,
    title: "Ask about this page",
    context: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "secondary"
    }, "The assistant sees this week\u2019s calendar and the Agape sign-up sheet (made-up data)."),
    messages: side.messages,
    onSend: side.send,
    streaming: side.streaming,
    onStop: side.stop
  });
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace",
    panel: panel
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage, {
    header: /*#__PURE__*/React.createElement(_plenixPlatform.RecordPage.Header, {
      title: "Parish assistant",
      description: "An AI helper for the church office: it drafts announcements, finds members and summarizes the week.",
      meta: /*#__PURE__*/React.createElement(_plenixPlatform.AILabel, {
        variant: "explanation",
        explanation: "Every answer on this page is canned text written for the test site, not a real model."
      }),
      actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.AIButton, {
        label: "Ask the assistant",
        mode: "menu",
        actions: SUGGESTIONS.map(s => ({
          id: s.id,
          label: s.label
        })),
        onAction: id => {
          const s = SUGGESTIONS.find(x => x.id === id);
          if (s) ask(s.prompt);
          return Promise.resolve();
        }
      }), panelOpen ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        icon: "panel-right-open",
        onClick: () => setPanelOpen(true)
      }, "Show the side panel"))
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.AIDisclaimer, {
    variant: "inline",
    href: "#/settings/general"
  }, "Check names, dates and times before anything goes to the families."), /*#__PURE__*/React.createElement(_plenixPlatform.Tabs, {
    variant: "folder",
    label: "Assistant",
    value: tab,
    onChange: setTab,
    items: [{
      value: 'chat',
      label: 'Conversation',
      icon: 'message',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
        ratio: "sidebar-end",
        collapseBelow: "wide"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.AIChat, {
        variant: "page",
        title: "Parish assistant",
        messages: chat.messages,
        onSend: chat.send,
        streaming: chat.streaming,
        onStop: chat.stop,
        prompt: prompt,
        onPromptChange: setPrompt,
        suggestions: SUGGESTIONS.map(s => ({
          id: s.id,
          label: s.label,
          prompt: s.prompt
        }))
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "md"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
        title: "Try asking"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.PromptSuggestions, {
        variant: "cards",
        options: SUGGESTIONS,
        onSelect: o => setPrompt(o.prompt)
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
        title: "Suggested for today"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.SuggestedAction, {
        variant: "card",
        description: "Fills in the services, meetings and serving needs.",
        onAction: () => {
          ask('Summarize this week');
          return Promise.resolve();
        }
      }, "Summarize this week"), /*#__PURE__*/React.createElement(_plenixPlatform.SuggestedAction, {
        onAction: () => {
          ask('Find a servant for the sound desk');
          return Promise.resolve();
        }
      }, "Find a sound desk servant")))))
    }, {
      value: 'draft',
      label: 'Draft an announcement',
      icon: 'edit',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
        ratio: "sidebar-end",
        collapseBelow: "wide"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "md"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.PromptInput, {
        multiline: true,
        value: draftPrompt,
        onChange: setDraftPrompt,
        onSend: sendDraft,
        streaming: draftStream.busy,
        onStop: () => {
          draftStream.stop();
          setLive(l => l ? {
            ...l,
            state: 'stopped'
          } : l);
        },
        models: [{
          id: 'quick',
          label: 'Quick draft'
        }, {
          id: 'careful',
          label: 'Careful draft'
        }],
        model: model,
        onModelChange: setModel,
        strings: {
          label: 'What should the announcement say?',
          placeholder: 'Describe the announcement'
        }
      }), live ? /*#__PURE__*/React.createElement(_plenixPlatform.StreamingText, {
        text: live.text,
        state: live.state
      }) : /*#__PURE__*/React.createElement(_plenixPlatform.GeneratedContent, {
        versions: versions,
        versionId: versionId,
        onVersionChange: setVersionId,
        onRegenerate: () => {
          addVersion(FORMAL, 'Version ' + (count.current + 1) + ' (regenerated)');
          return Promise.resolve();
        },
        onFeedback: () => Promise.resolve()
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        wrap: true,
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.RefineMenu, {
        onRefine: ({
          action,
          tone,
          prompt: p
        }) => {
          addVersion(action === 'shorter' ? SHORTER : action === 'tone' && tone === 'formal' ? FORMAL : (p ? 'Revised (' + p + '): ' : '') + current.text);
          return Promise.resolve();
        }
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        icon: "open",
        onClick: () => screen.navigate('/announcement/a1')
      }, "Open the announcement")), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        as: "p",
        variant: "secondary"
      }, "Drafted from the fasting menu ", /*#__PURE__*/React.createElement(_plenixPlatform.Citation, {
        source: SRC.menu,
        index: 1
      }), " and the weekly bulletin ", /*#__PURE__*/React.createElement(_plenixPlatform.Citation, {
        source: SRC.bulletin,
        index: 2
      }), ".")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "md"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
        title: "Why this draft"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "sm"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        gap: "sm",
        wrap: true
      }, /*#__PURE__*/React.createElement(_plenixPlatform.AILabel, {
        variant: "badge"
      }), /*#__PURE__*/React.createElement(_plenixPlatform.ConfidenceIndicator, {
        level: "medium"
      })), /*#__PURE__*/React.createElement(_plenixPlatform.AIExplanation, {
        summary: "It follows last year\u2019s Nativity Fast announcement and adds this year\u2019s dates.",
        factors: [{
          id: 'f1',
          label: 'Dates',
          detail: 'From the parish calendar: November 25 to January 7.'
        }, {
          id: 'f2',
          label: 'Agape',
          detail: 'From the fasting menu in the documents.'
        }],
        confidence: {
          level: 'medium'
        }
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Citation, {
        variant: "card",
        source: SRC.menu
      }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
        title: "Suggested edits to the published announcement"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.SuggestedEdit, {
        variant: "all",
        edits: edits,
        onDecision: ({
          ids,
          decision
        }) => {
          setEdits(list => list.map(e => ids.indexOf(e.id) >= 0 ? {
            ...e,
            status: decision
          } : e));
          return Promise.resolve();
        }
      }))))
    }, {
      value: 'find',
      label: 'Find members',
      icon: 'search',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "lg"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.AISearch, {
        defaultQuery: "servant",
        onSearch: ({
          query
        }) => {
          const words = query.toLowerCase().split(/\s+/).filter(Boolean);
          const hits = _data.MEMBERS.filter(m => words.some(w => m.name.toLowerCase().includes(w) || w.startsWith('servant') && m.servant || m.district.toLowerCase() === w));
          return Promise.resolve({
            answer: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
              as: "p"
            }, "Made-up summary: ", hits.length, " members match \u201C", query, "\u201D; ", hits.filter(m => m.servant).length, " of them serve in a ministry."),
            sources: [{
              id: 'members',
              title: 'Member directory',
              href: '#/members',
              excerpt: 'Every member, family and ministry of the parish.'
            }],
            results: hits.slice(0, 8).map(m => ({
              id: m.id,
              title: m.name,
              description: m.role + ' · ' + m.district + ' district',
              href: '#/member/' + m.id
            }))
          });
        }
      }), /*#__PURE__*/React.createElement(_plenixPlatform.Recommendation, {
        strings: {
          label: 'Recommended next steps'
        },
        items: RECOMMENDED,
        variant: "reason",
        perView: 2
      }))
    }, {
      value: 'history',
      label: 'History',
      icon: 'clock',
      content: /*#__PURE__*/React.createElement(_plenixPlatform.PromptHistory, {
        items: HISTORY,
        onSelect: item => {
          setPrompt(item.prompt);
          setTab('chat');
          return Promise.resolve();
        }
      })
    }]
  })))));
}
  } },
  "test-site/screens/documents.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentsScreen = DocumentsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Documents (test-site/screens/documents.jsx): the parish document library, where the
   church office keeps the weekly bulletins, the Sunday School curriculum, the servant guidelines and the hymns.
   Plenix parts: EntityHeader; FileBrowser (the folders, its tree and its list) inside a LoadingOverlay while files move, with
   Skeleton and Spinner while a folder opens; a Menu (MenuGroup, MenuItem, MenuDivider, MenuRadioGroup for the order,
   MenuSub to open a folder); a FileList of recent files; a FileRowList of FileRows sent in for review; File chips for
   Sunday; RenameAction (dialog); UploadManager with useUploadQueue (simulated uploads), a DropZone and a FileInput;
   ShareDialog; PermissionsEditor; AttachmentPicker and FilePicker for an email to the servants; DownloadManager;
   AccessRequest for the parish council folder. */

const {
  useState,
  useEffect,
  useRef
} = React;

// the library's folders (made up), each a folder of the FileBrowser
const FOLDERS = [{
  id: 'bulletins',
  name: 'Bulletins'
}, {
  id: 'announcements',
  name: 'Announcements'
}, {
  id: 'sunday-school',
  name: 'Sunday School'
}, {
  id: 'servants',
  name: 'Servants'
}, {
  id: 'finance',
  name: 'Finance'
}, {
  id: 'events',
  name: 'Events'
}, {
  id: 'hymns',
  name: 'Hymns'
}, {
  id: 'youth',
  name: 'Youth'
}];
const folderOf = name => (FOLDERS.find(f => f.name === name) || FOLDERS[0]).id;
const TYPES = {
  pdf: 'application/pdf',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  png: 'image/png'
};
const typeOf = name => TYPES[String(name).split('.').pop()] || '';
// more made-up files, so the folders are not empty
const MORE = [{
  id: 'd9',
  name: 'Weekly bulletin 2026-10-18.pdf',
  folder: 'Bulletins',
  size: 790411,
  modified: '2026-10-16',
  owner: 'Church office'
}, {
  id: 'd10',
  name: 'Weekly bulletin 2026-10-11.pdf',
  folder: 'Bulletins',
  size: 812300,
  modified: '2026-10-09',
  owner: 'Church office'
}, {
  id: 'd11',
  name: 'Kindergarten lessons - Tout.docx',
  folder: 'Sunday School',
  size: 402200,
  modified: '2026-09-20',
  owner: 'Marina Girgis'
}, {
  id: 'd12',
  name: 'Agpeya prayer schedule.pdf',
  folder: 'Hymns',
  size: 120400,
  modified: '2026-09-28',
  owner: 'Deacons’ School'
}, {
  id: 'd13',
  name: 'Servants retreat agenda.docx',
  folder: 'Servants',
  size: 64000,
  modified: '2026-10-03',
  owner: 'Fr. Daniel Boulos'
}];
const START = FOLDERS.map(f => ({
  id: f.id,
  name: f.name,
  kind: 'folder',
  parent: null
})).concat(_data.DOCUMENTS.concat(MORE).map(d => ({
  id: d.id,
  name: d.name,
  kind: 'file',
  parent: folderOf(d.folder),
  size: d.size,
  modified: d.modified.slice(0, 10),
  owner: d.owner,
  type: typeOf(d.name)
})));

// people the office shares with (EntityPicker options)
const PEOPLE = _data.CLERGY.map(c => ({
  value: c.id,
  label: c.name,
  description: c.role
})).concat(_data.MINISTRIES.map(m => ({
  value: 'lead-' + m.id,
  label: m.lead,
  description: m.name + ' lead'
})).filter(p => !/^Fr\./.test(p.label)));

// who may do what in the library (PermissionsEditor)
const ROLES = [{
  id: 'clergy',
  label: 'Clergy',
  locked: true
}, {
  id: 'office',
  label: 'Church office'
}, {
  id: 'servants',
  label: 'Servants'
}, {
  id: 'deacons',
  label: 'Deacons'
}, {
  id: 'members',
  label: 'Members'
}];
const RIGHTS = [{
  id: 'view',
  label: 'View'
}, {
  id: 'upload',
  label: 'Upload'
}, {
  id: 'edit',
  label: 'Edit'
}, {
  id: 'share',
  label: 'Share'
}, {
  id: 'delete',
  label: 'Delete'
}];
const START_RIGHTS = {
  clergy: ['view', 'upload', 'edit', 'share', 'delete'],
  office: ['view', 'upload', 'edit', 'share', 'delete'],
  servants: ['view', 'upload'],
  deacons: ['view', 'upload'],
  members: ['view']
};

// files sent in by servants, waiting for the office to look at them
const REVIEW = [{
  id: 'r1',
  file: {
    name: 'Youth trip permission - Habib.pdf',
    size: 188000,
    modified: '2026-10-24'
  },
  owner: 'Mina Habib',
  status: {
    tone: 'waiting',
    icon: 'clock',
    label: 'To review'
  }
}, {
  id: 'r2',
  file: {
    name: 'Agape menu - Nativity Fast.docx',
    size: 54000,
    modified: '2026-10-23'
  },
  owner: 'Nevine Mikhail',
  status: {
    tone: 'success',
    icon: 'check',
    label: 'Approved'
  }
}, {
  id: 'r3',
  file: {
    name: 'Food pantry sign-up sheet.pdf',
    size: 96000,
    modified: '2026-10-22'
  },
  owner: 'Sarah Ibrahim',
  error: 'The file could not be opened. Ask the sender to send it again.'
}];

// a simulated upload: the percent climbs, Cancel stops it
function fakeUpload(file, {
  onProgress,
  signal
}) {
  return new Promise((resolve, reject) => {
    let p = 0;
    const timer = setInterval(() => {
      p = Math.min(100, p + 10 + Math.round(Math.random() * 15));
      onProgress(p);
      if (p >= 100) {
        clearInterval(timer);
        resolve();
      }
    }, 250);
    if (signal) signal.addEventListener('abort', () => {
      clearInterval(timer);
      const e = new Error('Canceled');
      e.name = 'AbortError';
      reject(e);
    });
  });
}
const later = ms => new Promise(r => setTimeout(r, ms));
function DocumentsScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [items, setItems] = useState(START);
  const [folder, setFolder] = useState(null);
  const [opening, setOpening] = useState(true);
  const [moving, setMoving] = useState(false);
  const [sort, setSort] = useState({
    field: 'modified',
    dir: 'desc'
  });
  const [uploadOpen, setUploadOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [grants, setGrants] = useState([{
    person: 'c1',
    role: 'editor'
  }, {
    person: 'lead-sunday-school',
    role: 'viewer'
  }]);
  const [renaming, setRenaming] = useState(false);
  const [rights, setRights] = useState(START_RIGHTS);
  const [attachments, setAttachments] = useState([]);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [picked, setPicked] = useState([]);
  const [bulletinFiles, setBulletinFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [downloads, setDownloads] = useState([{
    id: 'dl1',
    file: {
      name: 'Hymns of Kiahk.pdf',
      size: 4410222
    },
    status: 'ready',
    href: '#/document/d7'
  }, {
    id: 'dl2',
    file: {
      name: 'Building fund report Q3.xlsx',
      size: 88210
    },
    status: 'failed',
    error: 'The connection was lost.'
  }]);
  const [access, setAccess] = useState('request');
  const [review, setReview] = useState(REVIEW);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearInterval), []);
  const queue = (0, _plenixPlatform.useUploadQueue)({
    upload: fakeUpload,
    accept: '.pdf,.docx,.xlsx,.png,.jpg',
    maxSize: 50e6
  });

  // a folder "loads" for a moment: Skeleton and Spinner in its place
  useEffect(() => {
    setOpening(true);
    const t = setTimeout(() => setOpening(false), 600);
    return () => clearTimeout(t);
  }, [folder]);
  const files = items.filter(i => i.kind === 'file');
  const bulletin = items.find(i => i.id === 'd1');
  const recent = files.slice().sort((a, b) => a.modified < b.modified ? 1 : -1).slice(0, 6);
  const namesIn = (parent, except) => items.filter(i => i.parent === parent && i.id !== except).map(i => i.name);
  const addFiles = (list, parent) => {
    queue.add(list);
    const now = new Date().toISOString().slice(0, 10);
    setItems(all => all.concat(Array.from(list).map((f, n) => ({
      id: 'u' + Date.now() + n,
      name: f.name,
      kind: 'file',
      parent: parent || 'bulletins',
      size: f.size,
      modified: now,
      owner: 'Church office',
      type: f.type
    }))));
  };
  const move = async (list, to) => {
    setMoving(true);
    await later(900);
    const ids = list.map(x => x.id);
    setItems(all => all.map(i => ids.includes(i.id) ? {
      ...i,
      parent: to
    } : i));
    setMoving(false);
    toast.show(list.length === 1 ? list[0].name + ' moved' : list.length + ' items moved', {
      tone: 'success'
    });
  };
  // a simulated download: the row's bar climbs, then the file is ready
  const startDownload = list => {
    list.filter(x => x.kind === 'file').forEach(x => {
      const id = 'dl' + Date.now() + x.id;
      setDownloads(all => [{
        id,
        file: {
          name: x.name,
          size: x.size
        },
        status: 'progress',
        progress: 0
      }].concat(all));
      const t = setInterval(() => setDownloads(all => all.map(d => {
        if (d.id !== id || d.status !== 'progress') return d;
        const p = Math.min(100, d.progress + 20);
        if (p >= 100) clearInterval(t);
        return p >= 100 ? {
          ...d,
          status: 'ready',
          progress: 100,
          href: '#/document/' + x.id
        } : {
          ...d,
          progress: p
        };
      })), 300);
      timers.current.push(t);
    });
  };
  const libraryMenu = /*#__PURE__*/React.createElement(_plenixPlatform.Menu, {
    label: "Library",
    trigger: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      caret: true,
      icon: "folder"
    }, "Library")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuGroup, {
    label: "Add"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "upload",
    onSelect: () => setUploadOpen(true)
  }, "Upload files\u2026"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "share",
    onSelect: () => setShareOpen(true)
  }, "Share the Bulletins folder\u2026"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    icon: "rename",
    onSelect: () => setRenaming(true)
  }, "Rename this week\u2019s bulletin\u2026")), /*#__PURE__*/React.createElement(_plenixPlatform.MenuDivider, null), /*#__PURE__*/React.createElement(_plenixPlatform.MenuSub, {
    label: "Open a folder",
    icon: "folder-open"
  }, FOLDERS.map(f => /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    key: f.id,
    onSelect: () => setFolder(f.id)
  }, f.name))), /*#__PURE__*/React.createElement(_plenixPlatform.MenuDivider, null), /*#__PURE__*/React.createElement(_plenixPlatform.MenuRadioGroup, {
    label: "Recent files by",
    value: sort.field,
    onChange: field => setSort({
      field,
      dir: field === 'name' ? 'asc' : 'desc'
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    value: "modified"
  }, "Date modified"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    value: "name"
  }, "Name"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    value: "size"
  }, "Size"), /*#__PURE__*/React.createElement(_plenixPlatform.MenuItem, {
    value: "owner"
  }, "Owner")));
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    media: {
      icon: 'folder',
      hue: 'blue'
    },
    title: "Documents",
    subtitle: "Bulletins, curriculum, servant guidelines and hymns",
    facts: [{
      label: 'Files',
      value: files.length,
      data: true
    }, {
      label: 'Folders',
      value: FOLDERS.length,
      data: true
    }, {
      label: 'This week’s bulletin',
      value: bulletin ? bulletin.name : '—',
      data: true
    }],
    next: {
      title: 'Send in the bulletin for Sunday',
      detail: 'Due Friday · Church office'
    },
    actions: [{
      icon: 'upload',
      label: 'Upload files',
      onClick: () => setUploadOpen(true)
    }, {
      icon: 'share',
      label: 'Share',
      onClick: () => setShareOpen(true)
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Library"), libraryMenu), opening ? /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm",
    "aria-label": "Opening the folder"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Spinner, {
    size: "sm",
    label: "Opening the folder"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Opening the folder\u2026")), [1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(_plenixPlatform.Skeleton, {
    key: i,
    height: "32px"
  }))) : /*#__PURE__*/React.createElement(_plenixPlatform.LoadingOverlay, {
    active: moving,
    message: "Moving files"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FileBrowser, {
    label: "Parish documents",
    root: {
      name: 'Library'
    },
    items: items,
    folder: folder,
    onFolderChange: setFolder,
    tree: true,
    onOpenFile: f => screen.navigate('/document/' + f.id),
    onCreateFolder: (name, parent) => setItems(all => all.concat([{
      id: 'fo' + Date.now(),
      name,
      kind: 'folder',
      parent
    }])),
    onUpload: (list, parent) => addFiles(list, parent),
    onRename: (item, name) => setItems(all => all.map(i => i.id === item.id ? {
      ...i,
      name
    } : i)),
    onDelete: list => {
      const ids = list.map(x => x.id);
      setItems(all => all.filter(i => !ids.includes(i.id) && !ids.includes(i.parent)));
    },
    onMove: move,
    onDownload: startDownload
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Recent files"), /*#__PURE__*/React.createElement(_plenixPlatform.FileList, {
    label: "Recent files",
    files: recent,
    sort: sort,
    onSortChange: setSort,
    columns: ['size', 'modified', 'owner'],
    onOpen: f => screen.navigate('/document/' + f.id),
    onDownload: f => startDownload([f])
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Sent in for review"), /*#__PURE__*/React.createElement(_plenixPlatform.FileRowList, {
    label: "Sent in for review"
  }, review.map(r => /*#__PURE__*/React.createElement(_plenixPlatform.FileRow, {
    key: r.id,
    as: "li",
    file: r.file,
    owner: r.owner,
    status: r.status ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: r.status.tone,
      icon: r.status.icon
    }, r.status.label) : undefined,
    error: r.error,
    onRetry: r.error ? () => setReview(all => all.map(x => x.id === r.id ? {
      ...x,
      error: undefined,
      status: {
        tone: 'waiting',
        icon: 'clock',
        label: 'To review'
      }
    } : x)) : undefined,
    onDownload: r.error ? undefined : () => startDownload([{
      kind: 'file',
      id: r.id,
      ...r.file
    }]),
    onRename: name => setReview(all => all.map(x => x.id === r.id ? {
      ...x,
      file: {
        ...x.file,
        name
      }
    } : x)),
    names: review.filter(x => x.id !== r.id).map(x => x.file.name),
    onDelete: () => setReview(all => all.filter(x => x.id !== r.id))
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "For this Sunday"), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true
  }, files.filter(f => ['d1', 'd2', 'd7'].includes(f.id)).map(f => /*#__PURE__*/React.createElement(_plenixPlatform.File, {
    key: f.id,
    name: f.name,
    size: f.size,
    modified: f.modified,
    appearance: "chip",
    onOpen: () => screen.navigate('/document/' + f.id)
  }))))), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "upload",
    title: "Send in this week\u2019s bulletin",
    description: "The office prints it on Saturday morning."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.DropZone, {
    active: dragging,
    onDragOver: e => {
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: e => {
      e.preventDefault();
      setDragging(false);
      const list = Array.from(e.dataTransfer.files || []);
      if (list.length) {
        setBulletinFiles(list);
        addFiles(list, 'bulletins');
      }
    }
  }, "Drop the bulletin here"), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Or choose the file",
    description: "PDF, up to 50 MB"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FileInput, {
    accept: ".pdf",
    onChange: list => {
      setBulletinFiles(list);
      if (list.length) addFiles(list, 'bulletins');
    }
  })), bulletinFiles.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Sent to the Bulletins folder: ", bulletinFiles.map(f => f.name).join(', ')) : null)), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "mail",
    title: "Email the Sunday School servants",
    description: "Attach files from this computer or from the library."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.AttachmentPicker, {
    value: attachments,
    onChange: setAttachments,
    accept: ".pdf,.docx",
    maxFiles: 5,
    maxSize: 20e6,
    variant: "chips"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "folder-open",
    onClick: () => setPickerOpen(true)
  }, "Add from the library"), picked.map(f => /*#__PURE__*/React.createElement(_plenixPlatform.File, {
    key: f.id,
    name: f.name,
    size: f.size,
    appearance: "chip"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "end"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "primary",
    icon: "mail",
    disabled: !attachments.length && !picked.length,
    onClick: () => {
      toast.show('Email sent to 18 Sunday School servants', {
        tone: 'success'
      });
      setAttachments([]);
      setPicked([]);
    }
  }, "Send"))))), /*#__PURE__*/React.createElement(_plenixPlatform.DownloadManager, {
    title: "Downloads",
    items: downloads,
    onCancel: async d => setDownloads(all => all.filter(x => x.id !== d.id)),
    onRetry: async d => {
      setDownloads(all => all.filter(x => x.id !== d.id));
      startDownload([{
        kind: 'file',
        id: d.id,
        name: d.file.name,
        size: d.file.size
      }]);
    },
    onDownload: async d => toast.show(d.file.name + ' saved to Downloads')
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Who can do what in the library"), /*#__PURE__*/React.createElement(_plenixPlatform.PermissionsEditor, {
    subjects: ROLES,
    capabilities: RIGHTS,
    value: rights,
    onChange: setRights,
    onSave: async next => {
      await later(500);
      setRights(next);
      toast.show('Library permissions saved', {
        tone: 'success'
      });
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Parish council folder"), /*#__PURE__*/React.createElement(_plenixPlatform.AccessRequest, {
    status: access,
    onRequest: async () => {
      await later(500);
      setAccess('pending');
      setTimeout(() => setAccess('approved'), 3000);
    },
    onOpen: () => setFolder('finance'),
    strings: {
      title: 'The Finance folder is for the parish council',
      description: 'Ask Fr. Daniel Boulos for access to the council’s reports.'
    }
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.UploadManager, {
    queue: queue,
    variant: "dialog",
    open: uploadOpen,
    onClose: () => setUploadOpen(false),
    hint: "PDF, Word, Excel, PNG or JPG, up to 50 MB each.",
    title: "Upload to the library"
  }), !uploadOpen && queue.items.length ? /*#__PURE__*/React.createElement(_plenixPlatform.UploadManager, {
    queue: queue,
    variant: "panel",
    docked: true,
    onClose: () => queue.clear()
  }) : null, /*#__PURE__*/React.createElement(_plenixPlatform.ShareDialog, {
    open: shareOpen,
    title: "Share the Bulletins folder",
    onClose: () => setShareOpen(false),
    people: PEOPLE,
    grants: grants,
    url: "https://stjohn-beloved.example/library/bulletins",
    onSave: async ({
      grants: next
    }) => {
      await later(400);
      setGrants(next);
      toast.show('Sharing saved', {
        tone: 'success'
      });
    }
  }), bulletin ? /*#__PURE__*/React.createElement(_plenixPlatform.RenameAction, {
    variant: "dialog",
    open: renaming,
    onClose: () => setRenaming(false),
    value: bulletin.name,
    names: namesIn(bulletin.parent, bulletin.id),
    extension: true,
    label: "File name",
    onRename: name => setItems(all => all.map(i => i.id === 'd1' ? {
      ...i,
      name
    } : i))
  }) : null, /*#__PURE__*/React.createElement(_plenixPlatform.FilePicker, {
    open: pickerOpen,
    onClose: () => setPickerOpen(false),
    multiple: true,
    items: files.map(f => ({
      id: f.id,
      name: f.name,
      kind: 'file',
      type: f.type,
      folderId: f.parent,
      size: f.size
    })),
    folders: FOLDERS.map(f => ({
      id: f.id,
      label: f.name,
      icon: 'folder'
    })),
    onPick: async list => {
      setPicked(list);
    }
  }));
}
  } },
  "test-site/screens/document.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentScreen = DocumentScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Document (test-site/screens/document.jsx): one document of the library, by default d1,
   the weekly bulletin for Sunday, October 25: read it, see who changed it and when, compare two versions, restore an
   older one, and edit its details.
   Plenix parts: a Sticky header row (the name, VersionLabel, Time, Download with a ProgressCircle of a simulated
   download); DocumentViewer (the bulletin as text); VersionHistory (restore); VersionCompare (the text diff); a SidePanel
   with the details: MetadataEditor (inline), Time and VersionLabel. */

const {
  useState,
  useEffect,
  useRef
} = React;

// the bulletin's three versions (made up)
const V1 = `St. John the Beloved Coptic Orthodox Church
Weekly bulletin · Sunday, October 25, 2026

Services this week
Saturday: Vespers and Midnight Praises, 6:00 PM
Sunday: Matins and the Divine Liturgy, 8:00 AM
Wednesday: Bible Study with Fr. Antony Wahba, 7:00 PM

Announcements
Sunday School resumes after the Divine Liturgy.
The Agape Kitchen serves lunch in the fellowship hall.
The youth trip permission forms are due Friday.`;
const V2 = V1.replace('The youth trip permission forms are due Friday.', 'The youth trip permission forms are due Friday.\nThe Food Pantry needs servants on Saturday at 9:00 AM.');
const V3 = V2.replace('Wednesday: Bible Study with Fr. Antony Wahba, 7:00 PM', 'Wednesday: Bible Study with Fr. Antony Wahba, 7:30 PM\nThursday: Hymns and Choir practice for Kiahk, 7:30 PM').replace('Sunday School resumes after the Divine Liturgy.', 'Sunday School meets after the Divine Liturgy in the lower hall.');
const VERSIONS = [{
  id: 'v1',
  version: 1,
  date: 'Oct 20, 2026',
  dateTime: '2026-10-20T10:05',
  author: 'Church office',
  description: 'First draft',
  text: V1,
  size: '801 KB'
}, {
  id: 'v2',
  version: 2,
  date: 'Oct 22, 2026',
  dateTime: '2026-10-22T14:40',
  author: 'Sarah Ibrahim',
  description: 'Added the Food Pantry notice',
  text: V2,
  size: '822 KB'
}, {
  id: 'v3',
  version: 3,
  date: 'Oct 23, 2026',
  dateTime: '2026-10-23T16:20',
  author: 'Fr. Daniel Boulos',
  description: 'New Bible Study time, choir practice',
  text: V3,
  size: '842 KB'
}];
const FIELDS = [{
  id: 'title',
  label: 'Title',
  type: 'text',
  required: true
}, {
  id: 'folder',
  label: 'Folder',
  type: 'select',
  options: ['Bulletins', 'Announcements', 'Sunday School', 'Servants', 'Hymns', 'Youth'].map(f => ({
    value: f,
    label: f
  }))
}, {
  id: 'audience',
  label: 'Audience',
  type: 'select',
  options: [{
    value: 'everyone',
    label: 'The whole parish'
  }, {
    value: 'servants',
    label: 'Servants'
  }, {
    value: 'clergy',
    label: 'Clergy and the office'
  }]
}, {
  id: 'notes',
  label: 'Notes',
  type: 'textarea'
}];
function DocumentScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const doc = _data.DOCUMENTS.find(d => d.id === screen.id) || _data.DOCUMENTS[0];
  const isBulletin = doc.id === 'd1';
  const [current, setCurrent] = useState('v3');
  const [meta, setMeta] = useState({
    title: doc.name.replace(/\.[^.]+$/, ''),
    folder: doc.folder,
    audience: 'everyone',
    notes: isBulletin ? 'Print 250 copies for Sunday.' : ''
  });
  const [panelOpen, setPanelOpen] = useState(true);
  const [progress, setProgress] = useState(null);
  const timer = useRef(null);
  useEffect(() => () => clearInterval(timer.current), []);
  const shown = VERSIONS.find(v => v.id === current) || VERSIONS[2];
  const text = isBulletin ? shown.text : doc.name + '\n\nOwner: ' + doc.owner + '\nFolder: ' + doc.folder + '\n\nThis document is shown as a text preview in the test site.';

  // a simulated download: the ring fills, then says Downloaded
  const download = () => {
    clearInterval(timer.current);
    setProgress(0);
    timer.current = setInterval(() => setProgress(p => {
      const n = Math.min(100, (p || 0) + 12);
      if (n >= 100) clearInterval(timer.current);
      return n;
    }), 200);
  };
  const panel = /*#__PURE__*/React.createElement(_plenixPlatform.SidePanel, {
    title: "Details",
    icon: "circle-info",
    open: panelOpen,
    onOpenChange: setPanelOpen
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Version"), /*#__PURE__*/React.createElement(_plenixPlatform.VersionLabel, {
    version: isBulletin ? shown.version : doc.version,
    status: !isBulletin || current === 'v3' ? 'latest' : undefined
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Last changed"), /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: isBulletin ? shown.dateTime : doc.modified
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: isBulletin ? shown.dateTime : doc.modified,
    format: "relative",
    now: new Date('2026-10-25T09:00')
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Owner"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, doc.owner)), /*#__PURE__*/React.createElement(_plenixPlatform.MetadataEditor, {
    fields: FIELDS,
    values: meta,
    variant: "inline",
    onSave: async patch => {
      await new Promise(r => setTimeout(r, 300));
      setMeta(m => ({
        ...m,
        ...patch
      }));
    }
  })));
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "detail",
    panel: panel
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Sticky, {
    label: "Document header"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "title",
    as: "h1"
  }, doc.name), /*#__PURE__*/React.createElement(_plenixPlatform.VersionLabel, {
    version: isBulletin ? shown.version : doc.version,
    status: !isBulletin || current === 'v3' ? 'latest' : undefined
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Changed ", /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: isBulletin ? shown.dateTime : doc.modified,
    format: "label",
    now: new Date('2026-10-25T09:00')
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, progress !== null && progress < 100 ? /*#__PURE__*/React.createElement(_plenixPlatform.ProgressCircle, {
    value: progress,
    size: "sm",
    label: 'Downloading ' + doc.name
  }) : null, progress === 100 ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "check"
  }, "Downloaded") : null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "download-tray",
    disabled: progress !== null && progress < 100,
    onClick: download
  }, "Download"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "arrow-left",
    onClick: () => screen.navigate('/documents')
  }, "All documents")))), /*#__PURE__*/React.createElement(_plenixPlatform.DocumentViewer, {
    kind: "text",
    text: text,
    label: doc.name
  }), isBulletin ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Version history"), /*#__PURE__*/React.createElement(_plenixPlatform.VersionHistory, {
    variant: "restore",
    currentId: current,
    versions: VERSIONS.slice().reverse().map(v => ({
      id: v.id,
      version: v.version,
      date: v.date,
      dateTime: v.dateTime,
      author: v.author,
      description: v.description,
      preview: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        as: "p"
      }, v.text)
    })),
    onRestore: async v => {
      await new Promise(r => setTimeout(r, 400));
      setCurrent(v.id);
      toast.show('Version ' + v.version + ' restored', {
        tone: 'success'
      });
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Compare versions"), /*#__PURE__*/React.createElement(_plenixPlatform.VersionCompare, {
    label: "Compare versions of the weekly bulletin",
    defaultMode: "text",
    defaultBase: "v2",
    defaultTarget: "v3",
    versions: VERSIONS.map(v => ({
      id: v.id,
      label: 'Version ' + v.version,
      date: v.dateTime.slice(0, 10),
      author: v.author,
      text: v.text,
      values: {
        size: v.size,
        author: v.author
      }
    })),
    attributes: [{
      key: 'size',
      label: 'Size',
      kind: 'data'
    }, {
      key: 'author',
      label: 'Changed by'
    }]
  }))) : null)));
}
  } },
  "test-site/screens/media.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MediaScreen = MediaScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Sermons and media (test-site/screens/media.jsx): the parish's recorded sermons and hymns,
   the photos of its feasts and events, and the downloads the Media and Sound servants prepare.
   Plenix parts: EntityHeader; MediaPlayer (audio, with a transcript) for the chosen sermon; a list of recordings with
   Thumbnail and Time, filtered by a SearchField, with an Illustration and EmptyState when nothing matches; a Carousel of
   event photos, each a Figure with an Image and a caption; a Preview that opens the MediaViewer; AssetGallery (masonry,
   with its lightbox); RenditionList of the Nayrouz photo's sizes; RelatedAssets that open the photo's page.
   No audio file is in the repository: the player plays a short silent recording made in the page (a WAV data address),
   and the pictures are the drawings in dam/assets/ standing in for photos. */

const {
  useState,
  useMemo
} = React;

// a short silent recording (8 kHz, 8-bit mono WAV) as a data address, standing in for a sermon's audio
function silentWav(seconds) {
  const rate = 8000,
    n = rate * seconds,
    bytes = new Uint8Array(44 + n);
  const text = (at, s) => {
    for (let i = 0; i < s.length; i++) bytes[at + i] = s.charCodeAt(i);
  };
  const u32 = (at, v) => {
    bytes[at] = v & 255;
    bytes[at + 1] = v >> 8 & 255;
    bytes[at + 2] = v >> 16 & 255;
    bytes[at + 3] = v >> 24 & 255;
  };
  const u16 = (at, v) => {
    bytes[at] = v & 255;
    bytes[at + 1] = v >> 8 & 255;
  };
  text(0, 'RIFF');
  u32(4, 36 + n);
  text(8, 'WAVE');
  text(12, 'fmt ');
  u32(16, 16);
  u16(20, 1);
  u16(22, 1);
  u32(24, rate);
  u32(28, rate);
  u16(32, 1);
  u16(34, 8);
  text(36, 'data');
  u32(40, n);
  bytes.fill(128, 44);
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return 'data:audio/wav;base64,' + btoa(bin);
}
const ART = n => '../dam/assets/thumb-' + n + '.svg';
// the event photos (made up; drawings stand in for the pictures)
const PHOTOS = [{
  id: 'p1',
  src: ART(17),
  title: 'Nayrouz celebration',
  caption: 'The Nayrouz table after the Divine Liturgy, with red dates for the new Coptic year.',
  credit: 'Photo: Media and Sound',
  date: '2026-09-11',
  ratio: '4-3'
}, {
  id: 'p2',
  src: ART(5),
  title: 'Feast of the Cross procession',
  caption: 'The deacons lead the procession around the church on the Feast of the Cross.',
  credit: 'Photo: Media and Sound',
  date: '2026-09-27',
  ratio: '4-3'
}, {
  id: 'p3',
  src: ART(22),
  title: 'Sunday School opening day',
  caption: 'The Sunday School classes gather in the lower hall for the first lesson of the year.',
  credit: 'Photo: Marina Girgis',
  date: '2026-09-13',
  ratio: '4-3'
}, {
  id: 'p4',
  src: ART(18),
  title: 'Agape lunch',
  caption: 'The Agape Kitchen serves lunch in the fellowship hall after the Liturgy.',
  credit: 'Photo: Nevine Mikhail',
  date: '2026-10-04',
  ratio: '4-3'
}, {
  id: 'p5',
  src: ART(21),
  title: 'Youth meeting retreat',
  caption: 'The Youth Meeting at its fall retreat, praying the Agpeya together.',
  credit: 'Photo: Mina Habib',
  date: '2026-10-10',
  ratio: '4-3'
}];
const alt = p => 'A drawing standing in for the photo: ' + p.title;
const GALLERY = PHOTOS.concat([{
  id: 'p6',
  src: ART(23),
  title: 'Kiahk hymns practice',
  date: '2026-10-15'
}, {
  id: 'p7',
  src: ART(24),
  title: 'Food Pantry Saturday',
  date: '2026-10-17'
}, {
  id: 'p8',
  src: ART(27),
  title: 'Deacons’ School',
  date: '2026-10-18'
}]).map(p => ({
  id: p.id,
  src: p.src,
  alt: alt(p),
  title: p.title,
  meta: p.date
}));

// what the sermon says, a few lines (made up)
const TRANSCRIPT = [{
  start: 0,
  text: 'In the name of the Father, and of the Son, and of the Holy Spirit, one God. Amen.'
}, {
  start: 0.5,
  text: 'Saint John tells us: little children, let us love one another.'
}, {
  start: 1,
  text: 'Love is not a word only; it is a service we give.'
}, {
  start: 1.5,
  text: 'Let us carry this love to our families this week.'
}];
function MediaScreen({
  screen,
  chrome
}) {
  const src = useMemo(() => silentWav(2), []);
  const recordings = _data.MEDIA.filter(m => m.kind !== 'image');
  const [playing, setPlaying] = useState(recordings[0].id);
  const [q, setQ] = useState('');
  const [viewer, setViewer] = useState(null);
  const sermon = recordings.find(m => m.id === playing) || recordings[0];
  const found = recordings.filter(m => (m.title + ' ' + m.speaker).toLowerCase().includes(q.trim().toLowerCase()));
  const minutes = s => Math.round(s / 60) + ' min';
  const nayrouz = _data.MEDIA.find(m => m.id === 'v5');
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityHeader, {
    media: {
      icon: 'headphones',
      hue: 'purple'
    },
    title: "Sermons and media",
    subtitle: "Recorded sermons, hymns and the photos of the parish\u2019s feasts",
    facts: [{
      label: 'Recordings',
      value: recordings.length,
      data: true
    }, {
      label: 'Photos',
      value: GALLERY.length,
      data: true
    }, {
      label: 'Latest',
      value: recordings[0].date,
      data: true
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    ratio: "sidebar-end",
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, sermon.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, sermon.speaker, " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: sermon.date + 'T12:00',
    format: "date",
    dateStyle: "long"
  }), " \xB7 ", minutes(sermon.duration)), /*#__PURE__*/React.createElement(_plenixPlatform.MediaPlayer, {
    key: sermon.id,
    kind: "audio",
    src: src,
    label: sermon.title,
    transcript: TRANSCRIPT,
    showTranscript: true,
    rates: [0.75, 1, 1.25, 1.5]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, "Test recording: a short silent clip stands in for the sermon\u2019s audio.")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Recordings"), /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
    label: "Search the recordings",
    placeholder: "Search by title or speaker",
    value: q,
    onChange: e => setQ(e.target.value),
    onClear: () => setQ('')
  }), found.length ? found.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: m.id,
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Thumbnail, {
    icon: m.kind === 'video' ? 'settings-camera' : 'audio'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "none"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, m.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, m.speaker, " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: m.date + 'T12:00',
    format: "label",
    now: new Date('2026-10-25T09:00')
  })))), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    size: "sm",
    icon: "headphones",
    "aria-pressed": m.id === sermon.id,
    onClick: () => setPlaying(m.id)
  }, m.id === sermon.id ? 'Playing' : 'Play'))) : /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    align: "center"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Illustration, {
    name: "no-results",
    size: "sm"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.EmptyState, {
    title: 'No recordings match “' + q + '”',
    action: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: () => setQ('')
    }, "Clear the search")
  }, "Try a speaker\u2019s name or a word from the title.")))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Feasts and events"), /*#__PURE__*/React.createElement(_plenixPlatform.Carousel, {
    label: "Photos of the parish\u2019s feasts and events",
    perView: 3
  }, PHOTOS.map(p => /*#__PURE__*/React.createElement(_plenixPlatform.Figure, {
    key: p.id,
    caption: p.caption,
    credit: p.credit
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Image, {
    src: p.src,
    alt: alt(p),
    ratio: "4-3"
  }))))), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Feast of the Cross procession"), /*#__PURE__*/React.createElement(_plenixPlatform.Preview, {
    as: "button",
    ratio: "16-9",
    "aria-label": "Open the photos of the procession",
    onClick: () => setViewer(1),
    bottomEnd: /*#__PURE__*/React.createElement(_plenixPlatform.Icon, {
      name: "expand"
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Image, {
    src: PHOTOS[1].src,
    alt: "",
    ratio: "16-9"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Open the photos one at a time, full screen.")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Sizes of the Nayrouz photo"), /*#__PURE__*/React.createElement(_plenixPlatform.RenditionList, {
    variant: "table",
    items: [{
      id: 'r1',
      name: 'Original',
      format: 'SVG',
      size: 2304551,
      href: PHOTOS[0].src,
      fileName: 'nayrouz-original.svg'
    }, {
      id: 'r2',
      name: 'Bulletin (print)',
      format: 'SVG',
      size: 812000,
      href: PHOTOS[0].src,
      fileName: 'nayrouz-bulletin.svg'
    }, {
      id: 'r3',
      name: 'Website',
      format: 'SVG',
      size: 240000,
      href: PHOTOS[0].src,
      fileName: 'nayrouz-web.svg'
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "open",
    onClick: () => screen.navigate('/photo/' + nayrouz.id)
  }, "Open the Nayrouz photo"))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "Photo library"), /*#__PURE__*/React.createElement(_plenixPlatform.AssetGallery, {
    label: "Photo library",
    items: GALLERY,
    layout: "masonry",
    lightbox: true
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SectionHeading, {
    level: 2
  }, "More from this fall"), /*#__PURE__*/React.createElement(_plenixPlatform.RelatedAssets, {
    label: "More from this fall",
    variant: "grid",
    onOpen: () => screen.navigate('/photo/v5'),
    items: GALLERY.slice(0, 4).map(g => ({
      id: g.id,
      src: g.src,
      alt: g.alt,
      title: g.title,
      meta: g.meta
    }))
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.MediaViewer, {
    open: viewer !== null,
    onClose: () => setViewer(null),
    index: viewer || 0,
    onIndexChange: setViewer,
    label: "Event photos",
    items: PHOTOS.map(p => ({
      src: p.src,
      alt: alt(p),
      title: p.title,
      meta: ['SVG', p.date]
    }))
  }));
}
  } },
  "test-site/screens/photo.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhotoScreen = PhotoScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Photo (test-site/screens/photo.jsx): one photo of the media library, by default v5, the
   Nayrouz celebration. Looking at it, the Media and Sound servants mark who and what is where and talk about it; editing
   it, they replace or crop the picture for the bulletin.
   Plenix parts: FullScreenExperience (the photo with the site chrome) holding ImageAnnotation (pins and regions with
   their comment threads); FullScreenWorkspace (Edit: the whole window) with ImageUpload in its tools, the details in its
   inspector and ImageCrop in the middle. The picture is a drawing from dam/assets/ standing in for the photo. */
const {
  useState
} = React;
const PICTURE = '../dam/assets/thumb-17.svg';
const NOTES = [{
  id: 'a1',
  kind: 'pin',
  label: 'The Nayrouz table',
  location: 'Center, in front of the iconostasis',
  x: 320,
  y: 180,
  comments: [{
    id: 'c1',
    author: 'Fady Iskander',
    body: 'The red dates and the guava are on this table: the Nayrouz colors.',
    time: '2026-09-11T13:10'
  }]
}, {
  id: 'a2',
  kind: 'region',
  label: 'Deacons’ choir',
  location: 'Left side, by the choir stand',
  x: 96,
  y: 120,
  comments: [{
    id: 'c2',
    author: 'Kirollos Tadros',
    body: 'The Deacons’ School chanted the hymns of the new year here.',
    time: '2026-09-11T13:25'
  }]
}, {
  id: 'a3',
  kind: 'pin',
  label: 'Banner for the new year',
  location: 'Top right',
  x: 520,
  y: 48,
  comments: []
}];
function PhotoScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const item = _data.MEDIA.find(m => m.id === screen.id) || _data.MEDIA.find(m => m.id === 'v5');
  const [mode, setMode] = useState('view');
  const [notes, setNotes] = useState(NOTES);
  const [selected, setSelected] = useState('a1');
  const [images, setImages] = useState([{
    id: 'i1',
    url: PICTURE,
    name: 'nayrouz-2026.svg',
    size: 2304551,
    alt: 'A drawing standing in for the photo of the Nayrouz celebration'
  }]);
  const [cropping, setCropping] = useState(false);
  const [caption, setCaption] = useState('The Nayrouz celebration, the first day of the Coptic year');
  const picture = images[0] || {
    url: PICTURE,
    alt: ''
  };
  const me = 'Church office';
  if (mode === 'edit') {
    return /*#__PURE__*/React.createElement(_plenixPlatform.FullScreenWorkspace, {
      strings: {
        tools: 'Picture',
        inspector: 'Details'
      },
      toolbar: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        justify: "between",
        wrap: true
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "title",
        as: "h1"
      }, "Edit: ", item.title), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        icon: "ed-crop",
        onClick: () => setCropping(true),
        disabled: cropping || !images.length
      }, "Crop for the bulletin"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        onClick: () => {
          setCropping(false);
          setMode('view');
        }
      }, "Cancel"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        variant: "primary",
        icon: "check",
        onClick: () => {
          setMode('view');
          toast.show('Photo saved', {
            tone: 'success'
          });
        }
      }, "Save"))),
      tools: /*#__PURE__*/React.createElement(_plenixPlatform.ImageUpload, {
        label: "The photo",
        value: images,
        onChange: setImages,
        ratio: "16-9",
        altText: true,
        description: "PNG, JPG or SVG, up to 20 MB",
        maxSize: 20e6,
        accept: "image/png,image/jpeg,image/svg+xml"
      }),
      inspector: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "md"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
        label: "Caption",
        description: "Shown under the photo in the bulletin"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
        value: caption,
        onChange: e => setCaption(e.target.value)
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "label"
      }, "Taken"), /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
        value: item.date + 'T12:00',
        format: "date",
        dateStyle: "long"
      })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "label"
      }, "By"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, item.speaker)))
    }, cropping ? /*#__PURE__*/React.createElement(_plenixPlatform.ImageCrop, {
      src: picture.url,
      ratio: "16-9",
      output: 1600,
      onApply: ({
        url
      }) => {
        setImages(all => all.map((im, i) => i === 0 ? {
          ...im,
          url
        } : im));
        setCropping(false);
        toast.show('Cropped to 16:9', {
          tone: 'success'
        });
      },
      onCancel: () => setCropping(false)
    }) : /*#__PURE__*/React.createElement(_plenixPlatform.Image, {
      src: picture.url,
      alt: picture.alt || '',
      ratio: "16-9",
      fit: "contain"
    }));
  }
  return /*#__PURE__*/React.createElement(_plenixPlatform.FullScreenExperience, _extends({}, chrome, {
    title: item.title,
    description: caption,
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Inline, null, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
      tone: "success",
      icon: "check"
    }, "Approved for the bulletin"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "arrow-left",
      onClick: () => screen.navigate('/media')
    }, "Sermons and media"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "pencil",
      onClick: () => setMode('edit')
    }, "Edit photo"))
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, item.speaker, " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Time, {
    value: item.date + 'T12:00',
    format: "date",
    dateStyle: "long"
  }), " \xB7 ", notes.length, " notes"), /*#__PURE__*/React.createElement(_plenixPlatform.ImageAnnotation, {
    src: picture.url,
    alt: picture.alt || 'The Nayrouz celebration',
    annotations: notes,
    selectedId: selected,
    onSelectionChange: setSelected,
    onAdd: async ({
      kind,
      location,
      text
    }) => {
      const id = 'a' + Date.now();
      setNotes(all => all.concat([{
        id,
        kind,
        label: location,
        location,
        x: 200,
        y: 200,
        comments: [{
          id: 'c' + id,
          author: me,
          body: text,
          time: new Date().toISOString(),
          own: true
        }]
      }]));
      setSelected(id);
    },
    onReply: async (id, text) => setNotes(all => all.map(a => a.id === id ? {
      ...a,
      comments: a.comments.concat([{
        id: 'c' + Date.now(),
        author: me,
        body: text,
        time: new Date().toISOString(),
        own: true
      }])
    } : a))
  })));
}
  } },
  "test-site/screens/reports.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportsScreen = ReportsScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
/* St. John the Beloved test site · Reports (test-site/screens/reports.jsx): the parish council's reports for October 2026.
   Attendance (general counts of people at services, never anything else): LineChart by month, AreaChart of the education
   meetings, HeatMap by weekday and service, Sparkline rows per service, and one custom chart built from ChartFrame with its
   parts (Axis, GridLines, ChartLegend, ChartTooltip, DataLabel, ReferenceLine, ChartAnnotation, ChartBrush to zoom, on
   useChartInteraction). Giving: PieChart of gifts by method, Gauge of the building fund, BoxPlot of gift sizes,
   SankeyDiagram of funds to their uses. Ministries: RadarChart of ministry health, LollipopChart of servants, ScatterChart
   of members and servants, BarChart of members by district. Growth: FunnelChart from first visit to registered member,
   WordCloud of sermon topics, and ComparisonView of this year against last. Every number is made up.
   The custom chart's line takes ChartFrame's documented mark class (plx-chart__line): a custom chart's marks have no other way to take their
   color (tests/site-check.js allows ChartFrame's mark classes). */

const {
  useMemo
} = React;
const usd = n => (0, _plenixPlatform.formatCurrency)(n, 'USD');
const dollars = n => (0, _plenixPlatform.formatCurrency)(n, 'USD', {
  decimals: 0
}); // chart axes and labels: whole dollars
// a small fixed random sequence, so the made-up numbers are the same on every load
function seq(seed) {
  let a = seed;
  return () => {
    a = a * 16807 % 2147483647;
    return a / 2147483647;
  };
}
const rnd = seq(2026);
const around = (v, spread) => Math.round(v + (rnd() - 0.5) * 2 * spread);
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const SEASON = [1.0, 1.06, 1.12, 1.2, 1.02, 0.94, 0.84, 0.86, 1.04, 1.08]; // Great Lent and the Resurrection up, summer down

// people at each service, the average per month
const BY_MONTH = MONTHS.map((month, i) => ({
  month,
  liturgy: around(452 * SEASON[i], 14),
  vespers: around(118 * SEASON[i], 8),
  midweek: around(76 * SEASON[i], 6)
}));
const MEETINGS = MONTHS.map((month, i) => ({
  month,
  school: i === 6 || i === 7 ? around(22, 4) : around(148, 9),
  youth: around(46 * (i === 6 ? 0.7 : 1), 5),
  study: around(38, 4)
}));

// every Sunday of 2026 so far: people at the Divine Liturgy (Great Lent and the Feast of the Resurrection on April 12)
const WEEKS = [];
for (let d = new Date(Date.UTC(2026, 0, 4)); d <= new Date(Date.UTC(2026, 9, 25)); d = new Date(d.getTime() + 7 * 864e5)) {
  const m = d.getUTCMonth(),
    day = d.getUTCDate(),
    iso = d.toISOString().slice(0, 10);
  const easter = iso === '2026-04-12',
    lent = iso >= '2026-02-15' && iso <= '2026-04-05';
  WEEKS.push({
    id: WEEKS.length + 1,
    iso,
    label: MONTH_NAMES[m] + ' ' + day,
    people: easter ? 712 : around(452 * SEASON[Math.min(m, 9)] * (lent ? 1.05 : 1), 22)
  });
}
// ChartFrame's documented mark class for a line (system/charts.css): strokes the path in its data-viz color
const LENT = ['Feb 15', 'Apr 5'];
const EASTER = WEEKS.findIndex(w => w.iso === '2026-04-12');
const AVERAGE = Math.round(WEEKS.reduce((s, w) => s + w.people, 0) / WEEKS.length);

// the custom chart: every Sunday's attendance, drawn from the frame and its parts; drag or Shift with the arrows to zoom
function SundayAttendance() {
  const series = [{
    id: 'people',
    label: 'People at the Sunday Divine Liturgy'
  }];
  const describe = ({
    c
  }) => (0, _plenixPlatform.chartTooltipText)({
    title: WEEKS[c].label,
    items: [{
      label: 'People',
      value: (0, _plenixPlatform.formatNumber)(WEEKS[c].people)
    }]
  });
  const ia = (0, _plenixPlatform.useChartInteraction)({
    rows: 1,
    columns: WEEKS.length,
    series,
    zoom: true,
    describe,
    labelOf: c => WEEKS[c].label
  });
  const table = {
    columns: [{
      title: 'Sunday',
      field: 'label',
      kind: 'name',
      rowLabel: true
    }, {
      title: 'People',
      field: 'shown',
      kind: 'data',
      align: 'right'
    }],
    data: WEEKS.map(w => ({
      id: w.id,
      label: w.label,
      shown: (0, _plenixPlatform.formatNumber)(w.people)
    }))
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.ChartFrame, {
    title: "Every Sunday this year",
    size: "lg",
    interaction: ia,
    table: table,
    description: 'About ' + (0, _plenixPlatform.formatNumber)(AVERAGE) + ' people come to the Sunday Divine Liturgy; the Feast of the Resurrection drew the most, ' + (0, _plenixPlatform.formatNumber)(WEEKS[EASTER].people) + '. Great Lent is shaded.',
    legend: /*#__PURE__*/React.createElement(_plenixPlatform.ChartLegend, {
      items: [{
        id: 'people',
        label: series[0].label,
        color: (0, _plenixPlatform.seriesColor)(0),
        value: (0, _plenixPlatform.formatNumber)(AVERAGE) + ' on average'
      }],
      shape: "line"
    })
  }, ({
    inner,
    margin
  }) => {
    const [v0, v1] = ia.view();
    const shown = WEEKS.slice(v0, v1 + 1);
    const x = (0, _plenixPlatform.scaleBand)({
      domain: shown.map(w => w.label),
      range: [0, inner.width]
    });
    const y = (0, _plenixPlatform.scaleLinear)({
      domain: [0, Math.max.apply(null, WEEKS.map(w => w.people))],
      range: [inner.height, 0],
      nice: true
    });
    const px = c => (0, _plenixPlatform.scalePosition)(x, WEEKS[c].label);
    const columnAt = mx => {
      let best = v0,
        gap = Infinity;
      for (let c = v0; c <= v1; c++) {
        const g = Math.abs(px(c) - mx);
        if (g < gap) {
          gap = g;
          best = c;
        }
      }
      return best;
    };
    ia.register({
      nearest: mx => ({
        r: 0,
        c: columnAt(mx)
      }),
      columnAt
    });
    const path = shown.map((w, k) => (k ? 'L' : 'M') + px(v0 + k) + ',' + y(w.people)).join(' ');
    const step = Math.max(1, Math.ceil(shown.length / 8));
    const lent = LENT.map(l => x(l)).every(p => p !== undefined);
    const peak = EASTER >= v0 && EASTER <= v1;
    const a = ia.active && ia.active.c >= v0 && ia.active.c <= v1 ? ia.active.c : null;
    return /*#__PURE__*/React.createElement("g", null, /*#__PURE__*/React.createElement(_plenixPlatform.GridLines, {
      scale: y,
      inner: inner
    }), lent ? /*#__PURE__*/React.createElement(_plenixPlatform.ChartAnnotation, {
      kind: "range",
      x: px(WEEKS.findIndex(w => w.label === LENT[0])),
      x2: px(WEEKS.findIndex(w => w.label === LENT[1])),
      inner: inner,
      label: "Great Lent"
    }) : null, /*#__PURE__*/React.createElement("path", {
      className: "plx-chart__line",
      "data-plx-dataviz": (0, _plenixPlatform.seriesColor)(0),
      d: path
    }), /*#__PURE__*/React.createElement(_plenixPlatform.ReferenceLine, {
      scale: y,
      value: AVERAGE,
      inner: inner,
      label: "Average"
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Axis, {
      scale: y,
      orient: "left",
      inner: inner,
      margin: margin
    }), /*#__PURE__*/React.createElement(_plenixPlatform.Axis, {
      scale: x,
      orient: "bottom",
      inner: inner,
      margin: margin,
      ticks: shown.filter((w, k) => k % step === 0).map(w => w.label)
    }), peak ? /*#__PURE__*/React.createElement(_plenixPlatform.DataLabel, {
      x: px(EASTER),
      y: y(WEEKS[EASTER].people),
      value: WEEKS[EASTER].people,
      position: "end"
    }) : null, peak ? /*#__PURE__*/React.createElement(_plenixPlatform.ChartAnnotation, {
      x: px(EASTER),
      y: y(WEEKS[EASTER].people),
      inner: inner,
      label: "Feast of the Resurrection",
      placement: "bottom"
    }) : null, ia.brush ? /*#__PURE__*/React.createElement(_plenixPlatform.ChartBrush, {
      x0: px(ia.brush[0]),
      x1: px(ia.brush[1]),
      inner: inner
    }) : null, a !== null ? /*#__PURE__*/React.createElement(_plenixPlatform.ChartFocusMark, {
      x: px(a),
      y: y(WEEKS[a].people),
      color: (0, _plenixPlatform.seriesColor)(0)
    }) : null, a !== null ? /*#__PURE__*/React.createElement(_plenixPlatform.ChartTooltip, {
      x: px(a),
      y: y(WEEKS[a].people),
      inner: inner,
      title: WEEKS[a].label,
      titleKind: "data",
      items: [{
        label: 'People',
        value: (0, _plenixPlatform.formatNumber)(WEEKS[a].people),
        color: (0, _plenixPlatform.seriesColor)(0)
      }]
    }) : null);
  });
}

// people by weekday and service: a service that is not held that day is a missing value
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const KINDS = ['Divine Liturgy', 'Vespers and Midnight Praises', 'Bible Study', 'Youth Meeting', 'Agpeya prayers'];
const HEAT = [[458, null, null, null, 31], [null, null, null, null, 9], [null, null, null, null, 11], [74, null, 41, null, 12], [null, 26, null, null, 10], [null, null, null, 46, 8], [null, 117, null, null, 14]];
const SPARK_ROWS = [{
  label: 'Sunday Divine Liturgy',
  values: WEEKS.slice(-12).map(w => w.people)
}, {
  label: 'Saturday Vespers and Midnight Praises',
  values: Array.from({
    length: 12
  }, () => around(118, 12))
}, {
  label: 'Wednesday Divine Liturgy',
  values: Array.from({
    length: 12
  }, () => around(76, 8))
}, {
  label: 'Bible Study',
  values: Array.from({
    length: 12
  }, () => around(39, 6))
}, {
  label: 'Youth Meeting',
  values: Array.from({
    length: 12
  }, () => around(46, 7))
}];
const METHOD_LIST = ['Card', 'Check', 'Cash', 'Bank transfer', 'Online'];
const DISTRICTS = ['North', 'South', 'East', 'West'];
const SERMONS = [['love', 48], ['repentance', 37], ['prayer', 44], ['fasting', 31], ['the Nativity', 22], ['St. John the Beloved', 27], ['humility', 25], ['the Cross', 21], ['forgiveness', 29], ['the Psalms', 14], ['service', 26], ['the family', 19], ['the Gospel of St. John', 9], ['hope', 17], ['the saints', 20], ['patience', 13], ['thanksgiving', 16], ['the Good Shepherd', 18], ['light', 11], ['the Agpeya', 12], ['peace', 15], ['faith', 33], ['charity', 23], ['the Resurrection', 28]].map(([text, value]) => ({
  text,
  value
}));
function ReportsScreen({
  chrome
}) {
  const byMethod = useMemo(() => METHOD_LIST.map(m => ({
    id: m,
    label: m,
    value: Math.round(_data.GIFTS.filter(g => g.method === m).reduce((s, g) => s + g.amount, 0))
  })), []);
  const sizes = useMemo(() => _data.FUNDS.map(f => ({
    id: f.id,
    label: f.name,
    values: _data.GIFTS.filter(g => g.fund === f.id).map(g => g.amount)
  })), []);
  const districts = useMemo(() => DISTRICTS.map(d => _data.MEMBERS.filter(m => m.district === d)), []);
  const building = _data.FUNDS.find(f => f.id === 'building');
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "dashboard"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "section"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 1
  }, "Reports"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "secondary"
  }, "For the parish council's meeting of October 28, 2026. Attendance is the number of people at each service.")), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Attendance"), /*#__PURE__*/React.createElement(SundayAttendance, null), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.LineChart, {
    title: "People at services, by month",
    description: "Attendance rose through Great Lent and the Resurrection and dipped in the summer.",
    data: BY_MONTH,
    x: "month",
    yLabel: "People, average per service",
    points: true,
    series: [{
      id: 'liturgy',
      label: 'Sunday Divine Liturgy'
    }, {
      id: 'vespers',
      label: 'Saturday Vespers'
    }, {
      id: 'midweek',
      label: 'Wednesday Divine Liturgy'
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.AreaChart, {
    title: "The education meetings",
    description: "Sunday School takes the summer off; the Youth Meeting and Bible Study keep meeting.",
    data: MEETINGS,
    x: "month",
    stack: "stacked",
    yLabel: "People, average per meeting",
    series: [{
      id: 'study',
      label: 'Bible Study'
    }, {
      id: 'youth',
      label: 'Youth Meeting'
    }, {
      id: 'school',
      label: 'Sunday School'
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.HeatMap, {
    title: "People by weekday and service",
    description: "Sunday morning gathers the most; the daily Agpeya prayers keep a faithful few.",
    rows: DAYS,
    columns: KINDS,
    values: HEAT,
    valueLabel: "People"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "chart",
    title: "The last twelve weeks",
    description: "Each service's attendance, oldest first."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, SPARK_ROWS.map(r => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: r.label,
    gap: "md",
    justify: "between"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, null, r.label), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Sparkline, {
    values: r.values,
    showLast: true,
    label: r.label + ', people, last 12 weeks'
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, (0, _plenixPlatform.formatNumber)(r.values[r.values.length - 1]))))))))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Giving"), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PieChart, {
    variant: "donut",
    title: "Gifts by method",
    description: "Cards and checks bring in most of the giving.",
    data: byMethod,
    format: dollars,
    centerLabel: "Given this year"
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, null, /*#__PURE__*/React.createElement(_plenixPlatform.Gauge, {
    title: "The fellowship hall building fund",
    description: "How much of the building's cost has been given.",
    value: Math.round(building.raised / building.goal * 100),
    format: v => v + '%',
    label: 'of ' + usd(building.goal),
    size: "lg"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.BoxPlot, {
    title: "Gift sizes by fund",
    description: "Most gifts are between about 140 and 380 dollars in every fund. The box holds the middle half of the gifts.",
    groups: sizes,
    valueLabel: "Gift (USD)",
    format: dollars
  }), /*#__PURE__*/React.createElement(_plenixPlatform.SankeyDiagram, {
    title: "Where the giving goes",
    description: "The general fund carries clergy support and upkeep; the building fund goes to the fellowship hall.",
    format: dollars,
    nodes: [{
      id: 'general',
      label: 'General fund'
    }, {
      id: 'building',
      label: 'Building fund'
    }, {
      id: 'pantry',
      label: 'Food pantry'
    }, {
      id: 'youth',
      label: 'Youth trip'
    }, {
      id: 'clergy',
      label: 'Clergy support'
    }, {
      id: 'upkeep',
      label: 'Utilities and upkeep'
    }, {
      id: 'education',
      label: 'Sunday School and youth'
    }, {
      id: 'hall',
      label: 'Fellowship hall'
    }, {
      id: 'outreach',
      label: 'Outreach'
    }],
    links: [{
      source: 'general',
      target: 'clergy',
      value: 128000
    }, {
      source: 'general',
      target: 'upkeep',
      value: 46400
    }, {
      source: 'general',
      target: 'education',
      value: 18600
    }, {
      source: 'general',
      target: 'outreach',
      value: 12300
    }, {
      source: 'building',
      target: 'hall',
      value: 412000
    }, {
      source: 'pantry',
      target: 'outreach',
      value: 24800
    }, {
      source: 'youth',
      target: 'education',
      value: 7200
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Ministries"), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RadarChart, {
    title: "Ministry health",
    description: "Sunday School is strong everywhere but outreach; the Agape Kitchen needs more servants.",
    axes: [{
      key: 'attendance',
      label: 'Attendance'
    }, {
      key: 'servants',
      label: 'Servants'
    }, {
      key: 'growth',
      label: 'Growth'
    }, {
      key: 'retention',
      label: 'Retention'
    }, {
      key: 'outreach',
      label: 'Outreach'
    }],
    series: [{
      id: 'school',
      label: 'Sunday School',
      values: {
        attendance: 9,
        servants: 8,
        growth: 7,
        retention: 9,
        outreach: 4
      }
    }, {
      id: 'youth',
      label: 'Youth Meeting',
      values: {
        attendance: 7,
        servants: 5,
        growth: 8,
        retention: 6,
        outreach: 7
      }
    }, {
      id: 'agape',
      label: 'Agape Kitchen',
      values: {
        attendance: 8,
        servants: 4,
        growth: 5,
        retention: 8,
        outreach: 9
      }
    }],
    max: 10
  }), /*#__PURE__*/React.createElement(_plenixPlatform.LollipopChart, {
    title: "Servants by ministry",
    description: "The Food Pantry and the Agape Kitchen have the most servants.",
    sort: "desc",
    valueTitle: "Servants",
    data: _data.MINISTRIES.map(m => ({
      label: m.name,
      value: m.servants
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ScatterChart, {
    title: "Members and servants of each ministry",
    description: "Most ministries have one servant for every three or four members; the outreach ministries are served by all their members.",
    xTitle: "Members",
    yTitle: "Servants",
    trend: true,
    series: [{
      id: 'ministries',
      label: 'Ministries',
      points: _data.MINISTRIES.map(m => ({
        x: m.members,
        y: m.servants,
        label: m.name
      }))
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.BarChart, {
    title: "Members by district",
    description: "The four districts are close in size; most members in each are active.",
    orientation: "vertical",
    layout: "stacked",
    categories: DISTRICTS,
    valueLabel: "Members",
    series: [{
      id: 'active',
      label: 'Active',
      values: districts.map(l => l.filter(m => m.status === 'active').length)
    }, {
      id: 'other',
      label: 'Visitors, moved away or inactive',
      values: districts.map(l => l.filter(m => m.status !== 'active').length)
    }]
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 2
  }, "Growth"), /*#__PURE__*/React.createElement(_plenixPlatform.Columns, {
    count: 2,
    collapseBelow: "wide"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FunnelChart, {
    title: "From first visit to member, 2026",
    description: "Most visitors come back; the largest drop is before they join a ministry.",
    valueTitle: "People",
    data: [{
      label: 'Visited for the first time',
      value: 214
    }, {
      label: 'Came back',
      value: 138
    }, {
      label: 'Met with a priest',
      value: 96
    }, {
      label: 'Joined a ministry',
      value: 61
    }, {
      label: 'Registered as members',
      value: 44
    }]
  }), /*#__PURE__*/React.createElement(_plenixPlatform.WordCloud, {
    title: "Sermon topics this year",
    description: "Love, prayer and repentance were preached most often.",
    words: SERMONS,
    valueLabel: "Sermons"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Heading, {
    level: 3
  }, "This year and last"), /*#__PURE__*/React.createElement(_plenixPlatform.ComparisonView, {
    label: "This year and last",
    modes: ['columns', 'matrix'],
    items: [{
      id: '2025',
      title: '2025',
      meta: 'January to October 2025',
      values: {
        sunday: '431',
        families: '112',
        given: dollars(986400),
        givers: '341',
        servants: '118',
        visitors: '187'
      }
    }, {
      id: '2026',
      title: '2026',
      meta: 'January to October 2026',
      values: {
        sunday: (0, _plenixPlatform.formatNumber)(AVERAGE),
        families: '120',
        given: dollars(_data.FUNDS.reduce((s, f) => s + f.raised, 0)),
        givers: '362',
        servants: '118',
        visitors: '214'
      }
    }],
    attributes: [{
      key: 'sunday',
      label: 'People at the Sunday Divine Liturgy, on average',
      kind: 'data'
    }, {
      key: 'families',
      label: 'Households',
      kind: 'data'
    }, {
      key: 'given',
      label: 'Given to every fund',
      kind: 'data'
    }, {
      key: 'givers',
      label: 'Givers',
      kind: 'data'
    }, {
      key: 'servants',
      label: 'Servants',
      kind: 'data'
    }, {
      key: 'visitors',
      label: 'First-time visitors',
      kind: 'data'
    }]
  }))))));
}
  } },
  "test-site/screens/search.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js","../site.jsx":"test-site/site.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchScreen = SearchScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
var _site = require("../site.jsx");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Search (test-site/screens/search.jsx): the results of the parish search for the query
   in the address (?q=girgis) over members, families, documents and events. A SearchResultsPage: the members in its
   DataGrid, the other kinds as SearchResultGroups of SearchResults with the words searched for in bold, and a new
   search in a SearchField whose recent searches (useSearchHistory, seeded on the first load) are a grid popup with a
   remove button on each row. Advanced member search is a SearchWorkspace (filters, sort) around a QueryBuilder of rules
   and an EntityPicker of members to always include. Every person, family and document is made up. */
const {
  useState,
  useEffect
} = React;
const SEEDS = ['Agape kitchen', 'Habib', 'Sunday School curriculum'];
const TONE = {
  active: 'success',
  visitor: 'active',
  moved: 'neutral',
  inactive: 'waiting'
};
const ICON = {
  active: 'circle-check',
  visitor: 'person',
  moved: 'home',
  inactive: 'clock'
};
const statusBadge = s => /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
  tone: TONE[s],
  icon: ICON[s]
}, _data.MEMBER_STATUS[s]);
const COLUMNS = [{
  title: 'Name',
  field: 'name',
  kind: 'name'
}, {
  title: 'Family',
  field: 'familyName'
}, {
  title: 'Role',
  field: 'role'
}, {
  title: 'District',
  field: 'district'
}, {
  title: 'Email',
  field: 'email',
  kind: 'data'
}, {
  title: 'Status',
  field: 'status',
  kind: 'center',
  render: m => statusBadge(m.status)
}];
const has = (text, q) => String(text || '').toLowerCase().includes(q);
const words = q => q.toLowerCase().split(/\s+/).filter(Boolean);
const matchAll = (q, ...texts) => {
  const w = words(q);
  return w.length > 0 && w.every(x => texts.some(t => has(t, x)));
};
const OPTIONS = map => Object.keys(map).map(k => ({
  value: k,
  label: map[k]
}));
const DISTRICTS = ['North', 'South', 'East', 'West'].map(d => ({
  value: d,
  label: d
}));
const FIELDS = [{
  value: 'name',
  label: 'Name',
  kind: 'text'
}, {
  value: 'status',
  label: 'Status',
  kind: 'select',
  options: OPTIONS(_data.MEMBER_STATUS)
}, {
  value: 'district',
  label: 'District',
  kind: 'select',
  options: DISTRICTS
}, {
  value: 'ministries',
  label: 'Ministries',
  kind: 'multi',
  options: _data.MINISTRIES.map(m => ({
    value: m.id,
    label: m.name
  }))
}, {
  value: 'servant',
  label: 'Serves',
  kind: 'select',
  options: [{
    value: 'yes',
    label: 'Serves'
  }, {
    value: 'no',
    label: 'Does not serve'
  }],
  get: m => m.servant ? 'yes' : 'no'
}, {
  value: 'joined',
  label: 'Joined',
  kind: 'date'
}];
const PEOPLE = _data.MEMBERS.map(m => ({
  value: m.id,
  label: m.name,
  description: m.email
}));

// the new search with its recent searches (a grid popup with a remove button on each row)
function NewSearch({
  screen,
  current
}) {
  const history = (0, _plenixPlatform.useSearchHistory)('st-john-search');
  const [text, setText] = useState('');
  useEffect(() => {
    if (history.items.length < 3) SEEDS.slice().reverse().forEach(s => history.add(s));
    if (current) history.add(current);
  }, []);
  const run = q => {
    const t = String(q || '').trim();
    if (!t) return;
    history.add(t);
    setText('');
    screen.navigate('/search', {
      q: t
    });
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.SearchField, {
    label: "Search the parish again",
    placeholder: "Search members, families, documents, events",
    width: "lg",
    value: text,
    onChange: e => setText(e.target.value),
    onClear: () => setText(''),
    recent: history.items,
    onSubmitSearch: run,
    onSelect: item => run(item.value),
    onRemoveRecent: history.remove,
    onClearRecent: history.clear
  });
}
function AdvancedSearch({
  chrome,
  onBack
}) {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('active');
  const [district, setDistrict] = useState(null);
  const [sort, setSort] = useState('name');
  const [rules, setRules] = useState({
    join: 'and',
    items: [{
      id: 'q1',
      field: 'servant',
      op: 'any',
      value: ['yes']
    }, {
      id: 'q2',
      field: 'ministries',
      op: 'any',
      value: ['agape', 'food-pantry']
    }]
  });
  const [always, setAlways] = useState([]);
  const [limit, setLimit] = useState(10);
  const found = _data.MEMBERS.filter(m => (!text.trim() || matchAll(text, m.name, m.email)) && (!status || m.status === status) && (!district || m.district === district) && (0, _plenixPlatform.matchesFilter)(rules, m, FIELDS));
  const extra = always.map(id => _data.MEMBERS.find(m => m.id === id)).filter(m => m && found.indexOf(m) < 0);
  const list = extra.concat(found).sort((a, b) => sort === 'joined' ? b.joined.localeCompare(a.joined) : a.name.localeCompare(b.name));
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "workspace"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.SearchWorkspace, {
    title: "Advanced member search",
    query: text,
    onQueryChange: setText,
    placeholder: "Name or email",
    noun: "member",
    count: list.length,
    headStart: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "arrow-left",
      onClick: onBack
    }, "Back to the results"),
    filters: [{
      id: 'status',
      label: 'Status',
      options: OPTIONS(_data.MEMBER_STATUS),
      value: status
    }, {
      id: 'district',
      label: 'District',
      options: DISTRICTS,
      value: district
    }],
    onFilterChange: (id, value) => id === 'status' ? setStatus(value) : setDistrict(value),
    onClearAll: () => {
      setStatus(null);
      setDistrict(null);
    },
    sort: {
      value: sort,
      options: [{
        value: 'name',
        label: 'Name'
      }, {
        value: 'joined',
        label: 'Newest members'
      }],
      onChange: setSort
    }
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Rules",
    description: "Members who match every rule. Read it back as one sentence in the Text view."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.QueryBuilder, {
    label: "Member rules",
    fields: FIELDS,
    value: rules,
    onChange: setRules,
    matches: found.length
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    title: "Always include"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.EntityPicker, {
    kind: "people",
    multiple: true,
    label: "Members to always include",
    options: PEOPLE,
    values: always,
    onChange: setAlways
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultGroup, {
    label: "Members",
    onMore: list.length > limit ? () => setLimit(n => n + 10) : undefined,
    moreLabel: 'Show more of ' + list.length + ' members'
  }, list.slice(0, limit).map(m => /*#__PURE__*/React.createElement(_plenixPlatform.SearchResult, {
    key: m.id,
    kind: "person",
    title: m.name,
    href: '#/member/' + m.id,
    query: text,
    path: [m.district + ' district', ((0, _data.familyById)(m.family) || {}).name],
    snippet: m.role + ' · joined ' + m.joined.slice(0, 4),
    meta: statusBadge(m.status)
  })))))));
}
function SearchScreen({
  screen,
  chrome
}) {
  const q = screen.params && screen.params.q || '';
  const [query, setQuery] = useState(q);
  const [advanced, setAdvanced] = useState(false);
  useEffect(() => {
    setQuery(q);
  }, [q]);
  if (advanced) return /*#__PURE__*/React.createElement(AdvancedSearch, {
    chrome: chrome,
    onBack: () => setAdvanced(false)
  });
  const rows = _data.MEMBERS.filter(m => matchAll(query, m.name, m.email)).map(m => ({
    ...m,
    familyName: ((0, _data.familyById)(m.family) || {}).name
  }));
  const families = _data.FAMILIES.filter(f => matchAll(query, f.name, f.address.city, f.address.line1));
  const documents = _data.DOCUMENTS.filter(d => matchAll(query, d.name, d.folder, d.owner));
  const events = _data.EVENTS.filter(e => matchAll(query, e.title, e.place));
  return /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultsPage, _extends({}, chrome, {
    title: query ? 'Search results for “' + query + '”' : 'Search',
    query: query,
    onQueryChange: setQuery,
    rows: rows,
    columns: COLUMNS,
    strings: {
      empty: 'No members match',
      emptyDescription: 'Try another name, or use the advanced member search.'
    }
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "md",
    justify: "between"
  }, /*#__PURE__*/React.createElement(NewSearch, {
    screen: screen,
    current: q
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "filter",
    onClick: () => setAdvanced(true)
  }, "Advanced member search")), rows.length ? /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultGroup, {
    heading: "People",
    count: rows.length,
    moreHref: "#/members",
    moreLabel: 'Show all ' + rows.length + ' in the member list'
  }, rows.slice(0, 3).map(m => /*#__PURE__*/React.createElement(_plenixPlatform.SearchResult, {
    key: m.id,
    kind: "person",
    title: m.name,
    href: '#/member/' + m.id,
    query: query,
    path: [m.familyName],
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, m.email)
  }))) : null, families.length ? /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultGroup, {
    heading: "Families",
    count: families.length
  }, families.slice(0, 5).map(f => /*#__PURE__*/React.createElement(_plenixPlatform.SearchResult, {
    key: f.id,
    icon: "home",
    title: f.name,
    href: '#/family/' + f.id,
    query: query,
    path: [f.district + ' district'],
    snippet: f.address.line1 + ', ' + f.address.city,
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, f.members.length, " members \xB7 since ", f.since)
  }))) : null, documents.length ? /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultGroup, {
    heading: "Documents",
    count: documents.length
  }, documents.map(d => /*#__PURE__*/React.createElement(_plenixPlatform.SearchResult, {
    key: d.id,
    kind: "file",
    title: d.name,
    href: '#/document/' + d.id,
    query: query,
    path: ['Documents', d.folder],
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, d.owner, " \xB7 version ", d.version)
  }))) : null, events.length ? /*#__PURE__*/React.createElement(_plenixPlatform.SearchResultGroup, {
    heading: "Events",
    count: events.length
  }, events.map(e => /*#__PURE__*/React.createElement(_plenixPlatform.SearchResult, {
    key: e.id,
    icon: "calendar",
    title: e.title,
    href: '#/event/' + e.id,
    query: query,
    path: ['Calendar'],
    snippet: e.place,
    meta: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
      variant: "data"
    }, e.start.replace('T', ' '))
  }))) : null, rows.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "label"
  }, "Members") : null));
}
  } },
  "test-site/screens/settings.jsx": { deps: {"plenix-platform":null,"../site.jsx":"test-site/site.jsx","../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsScreen = SettingsScreen;
var _plenixPlatform = require("plenix-platform");
var _site = require("../site.jsx");
var _data = require("../data.js");
/* St. John the Beloved test site · Parish settings (#/settings/<section>): the church office's settings, one section per
   page (general, people, giving, roles, notifications, appearance, security, audit) in a SettingsLayout with its NavList.
   Every section is a SettingsSection card, static or collapsible, its rows SettingsRows. It shows: the parish's details
   and regional settings (TimeZoneSelect), the hosting plan (TrialUpgrade), the keyboard shortcuts (useHotkeyList,
   ShortcutsDialog); member records and who can see the directory (PermissionSummary) and the ministries' category colors
   (ColorSwatch, ColorPicker with CATEGORY_COLORS); the online giving provider (ConnectedAccount) and the funds (a new fund
   through PromptDialog); the office roles (RoleManager); email, connected calendars (ConnectedAccounts) and the welcome
   email template (CodeEditor; Restore the default asks with ConfirmDialog); the theme and density (ThemeProvider,
   useTheme, useDensity) and the fellowship hall display in dark (ThemeZone); sign-out after inactivity (useSessionTimeout,
   SessionTimeout) and closing an office account (Offboarding); the settings history (AuditLog, a Scrim while older
   entries load). "View as a parish council member" turns the page read-only (ReadOnlyProvider, ReadOnly). */

const {
  useState
} = React;
const SECTIONS = [{
  id: 'general',
  label: 'General',
  icon: 'settings-general'
}, {
  id: 'people',
  label: 'People and directory',
  icon: 'settings-users'
}, {
  id: 'giving',
  label: 'Giving',
  icon: 'field-currency'
}, {
  id: 'roles',
  label: 'Roles and access',
  icon: 'settings-permissions'
}, {
  id: 'notifications',
  label: 'Notifications',
  icon: 'settings-email'
}, {
  id: 'appearance',
  label: 'Appearance',
  icon: 'settings-customize'
}, {
  id: 'security',
  label: 'Security',
  icon: 'lock'
}, {
  id: 'audit',
  label: 'Settings history',
  icon: 'list-lines'
}];
const money = n => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
}).format(n);
const wait = ms => new Promise(r => setTimeout(r, ms));

// the office roles (made up)
const PERMISSIONS = [{
  id: 'members.view',
  label: 'View member records',
  group: 'People'
}, {
  id: 'members.edit',
  label: 'Add and edit members',
  group: 'People'
}, {
  id: 'directory.print',
  label: 'Print the directory',
  group: 'People'
}, {
  id: 'giving.view',
  label: 'View gifts and pledges',
  group: 'Giving'
}, {
  id: 'giving.record',
  label: 'Record gifts',
  group: 'Giving'
}, {
  id: 'giving.statements',
  label: 'Send giving statements',
  group: 'Giving'
}, {
  id: 'serving.manage',
  label: 'Manage servant sign-ups',
  group: 'Serving'
}, {
  id: 'announce.publish',
  label: 'Publish announcements',
  group: 'Communication'
}, {
  id: 'settings.manage',
  label: 'Change parish settings',
  group: 'Administration'
}];
const ALL = PERMISSIONS.map(p => p.id);
const PEOPLE = _data.CLERGY.map(c => ({
  value: c.id,
  label: c.name,
  description: c.role
})).concat(_data.MEMBERS.filter(m => m.servant && m.role !== 'Child').slice(0, 14).map(m => ({
  value: m.id,
  label: m.name,
  description: m.email
})));
const ROLES = [{
  id: 'owner',
  name: 'Parish priest',
  builtIn: 'owner',
  description: 'Everything, including roles and parish settings.',
  permissions: ALL,
  members: ['c1'],
  required: true
}, {
  id: 'office',
  name: 'Church office',
  builtIn: 'editor',
  description: 'Keeps the records: members, gifts, sign-ups and announcements.',
  permissions: ALL.filter(p => p !== 'settings.manage'),
  members: ['c2', PEOPLE[2].value]
}, {
  id: 'council',
  name: 'Parish council',
  builtIn: 'viewer',
  description: 'Reads the records and the giving reports.',
  permissions: ['members.view', 'giving.view'],
  members: [PEOPLE[3].value, PEOPLE[4].value, PEOPLE[5].value]
}, {
  id: 'ministry-lead',
  name: 'Ministry lead',
  category: 'green',
  description: 'Manages the servants and sign-ups of a ministry.',
  permissions: ['members.view', 'serving.manage', 'announce.publish'],
  members: [PEOPLE[6].value, PEOPLE[7].value]
}, {
  id: 'treasurer',
  name: 'Treasurer',
  category: 'blue',
  description: 'Records gifts and sends the giving statements.',
  permissions: ['giving.view', 'giving.record', 'giving.statements'],
  members: [PEOPLE[8].value]
}];
const AUDIT = [{
  id: 'a1',
  actor: {
    name: _data.ME.name
  },
  at: '2026-10-24T16:40:00',
  action: 'Changed',
  target: 'Welcome email template',
  changes: [{
    field: 'Subject',
    before: 'Welcome to St. John',
    after: 'Welcome to St. John the Beloved'
  }]
}, {
  id: 'a2',
  actor: {
    name: 'Fr. Daniel Boulos'
  },
  at: '2026-10-22T09:12:00',
  action: 'Added a member to',
  target: 'Ministry lead',
  changes: [{
    field: 'Members',
    before: '1',
    after: '2'
  }]
}, {
  id: 'a3',
  actor: {
    name: _data.ME.name
  },
  at: '2026-10-20T11:05:00',
  action: 'Connected',
  target: 'Parish Giving Online',
  changes: [{
    field: 'Status',
    before: 'Not connected',
    after: 'Connected'
  }]
}, {
  id: 'a4',
  actor: {
    name: 'Fr. Antony Wahba'
  },
  at: '2026-10-18T19:30:00',
  action: 'Changed',
  target: 'Sign out after inactivity',
  changes: [{
    field: 'Minutes',
    before: '60',
    after: '30'
  }]
}, {
  id: 'a5',
  actor: {
    name: _data.ME.name
  },
  at: '2026-10-15T14:22:00',
  action: 'Changed',
  target: 'Ministry colors',
  changes: [{
    field: 'Food Pantry',
    before: 'orange',
    after: 'red'
  }]
}];
const OLDER = [{
  id: 'a6',
  actor: {
    name: 'Fr. Daniel Boulos'
  },
  at: '2026-09-30T10:00:00',
  action: 'Created',
  target: 'Treasurer',
  changes: []
}, {
  id: 'a7',
  actor: {
    name: _data.ME.name
  },
  at: '2026-09-11T08:30:00',
  action: 'Changed',
  target: 'Parish time zone',
  changes: [{
    field: 'Time zone',
    before: 'UTC',
    after: 'America/New_York'
  }]
}];
const TEMPLATE = '<h1>Welcome to St. John the Beloved</h1>\n<p>Dear {first_name},</p>\n<p>Thank you for worshiping with us. The Divine Liturgy is every Sunday at 8:00 AM,\n  and the Agape meal follows in the fellowship hall.</p>\n<p>Fr. Daniel Boulos and the church office</p>\n';
const OFFICE_ACCOUNTS = [{
  id: 'u1',
  name: 'Rafik Morcos',
  account: 'rafik.morcos',
  role: 'Former office secretary',
  last: 'Last signed in Aug 2, 2026'
}, {
  id: 'u2',
  name: 'Monica Saad',
  account: 'monica.saad',
  role: 'Library and Bookstore',
  last: 'Last signed in Oct 19, 2026'
}];
const PLANS = [{
  id: 'trial',
  title: 'Trial',
  meta: 'Until Nov 30, 2026',
  values: {
    members: '500',
    storage: '5 GB',
    admins: '3',
    support: 'Email'
  }
}, {
  id: 'parish',
  title: 'Parish',
  meta: 'Billed yearly',
  values: {
    members: '1,500',
    storage: '50 GB',
    admins: '10',
    support: 'Email'
  }
}, {
  id: 'diocese',
  title: 'Diocese',
  meta: 'Billed yearly',
  values: {
    members: 'No limit',
    storage: '500 GB',
    admins: 'No limit',
    support: 'Phone and email'
  }
}];
const PLAN_ROWS = [{
  key: 'members',
  label: 'Members',
  kind: 'data'
}, {
  key: 'storage',
  label: 'Storage',
  kind: 'data'
}, {
  key: 'admins',
  label: 'Office accounts',
  kind: 'data'
}, {
  key: 'support',
  label: 'Support'
}];
function SettingsScreen({
  screen,
  chrome
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.ThemeProvider, null, /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "settings"
  }, /*#__PURE__*/React.createElement(ParishSettings, {
    screen: screen
  })));
}
function ParishSettings({
  screen
}) {
  const section = SECTIONS.some(s => s.id === screen.id) ? screen.id : 'general';
  const [council, setCouncil] = useState(false);
  const Body = {
    general: General,
    people: People,
    giving: Giving,
    roles: Roles,
    notifications: Notifications,
    appearance: Appearance,
    security: Security,
    audit: Audit
  }[section];
  return /*#__PURE__*/React.createElement(_plenixPlatform.SettingsLayout, {
    nav: /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
      label: "Parish settings",
      value: section,
      items: SECTIONS.map(s => ({
        id: s.id,
        label: s.label,
        icon: s.icon,
        href: '#/settings/' + s.id
      }))
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Viewing as",
    description: "Check what the parish council sees before you share these settings."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "View as a parish council member",
    description: "Council members can read every setting but not change it."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: "View as a parish council member",
    checked: council,
    onChange: e => setCouncil(e.target.checked)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.ReadOnlyProvider, {
    readOnly: council
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ReadOnly, {
    readOnly: council,
    reason: council ? 'Set by the church office: council members can read these settings.' : undefined
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(Body, {
    council: council,
    screen: screen
  }))))));
}
function General({
  council
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [name, setName] = useState(_data.CHURCH.name);
  const [email, setEmail] = useState(_data.CHURCH.email);
  const [zone, setZone] = useState(_data.CHURCH.timeZone);
  const [coptic, setCoptic] = useState(true);
  const [dateFormat, setDateFormat] = useState('mdy');
  const [shortcuts, setShortcuts] = useState(false);
  const hotkeys = (0, _plenixPlatform.useHotkeyList)();
  const nameError = name.trim() ? '' : 'Enter the parish’s name.';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Parish",
    description: "How the parish is named on bulletins, statements and emails.",
    actions: council ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => nameError ? toast.show(nameError, {
        tone: 'danger'
      }) : toast.show('Parish details saved', {
        tone: 'success'
      })
    }, "Save")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Parish name",
    layout: "row",
    required: true,
    error: nameError
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Office email",
    layout: "row",
    description: "Replies to every email the site sends come here."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Office phone",
    description: "Shown on the Visit us page."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, _data.CHURCH.phone))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Regional",
    description: "Dates, times and the church calendar.",
    collapsible: true,
    defaultExpanded: true,
    remember: false
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Time zone",
    description: "Service times and reminders use it.",
    htmlFor: "parish-time-zone"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TimeZoneSelect, {
    id: "parish-time-zone",
    value: zone,
    onChange: setZone,
    zones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'Africa/Cairo', 'Europe/London']
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Date format",
    htmlFor: "parish-date-format"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    id: "parish-date-format",
    value: dateFormat,
    onChange: e => setDateFormat(e.target.value),
    options: [{
      value: 'mdy',
      label: 'Oct 25, 2026'
    }, {
      value: 'iso',
      label: '2026-10-25'
    }, {
      value: 'dmy',
      label: '25 Oct 2026'
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Show the Coptic date",
    description: "Beside the date on the calendar and the bulletin (15 Paopi 1743)."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: "Show the Coptic date",
    checked: coptic,
    onChange: e => setCoptic(e.target.checked)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Hosting plan",
    description: "The parish site is hosted on Plenix."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TrialUpgrade, {
    message: "The parish is on the free trial until November 30, 2026: 500 members and 3 office accounts.",
    plans: PLANS,
    attributes: PLAN_ROWS,
    onUpgrade: async id => {
      await wait(600);
      toast.show('The parish moved to the ' + PLANS.find(p => p.id === id).title + ' plan', {
        tone: 'success'
      });
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Keyboard shortcuts",
    description: "Shortcuts the office uses every day.",
    collapsible: true,
    defaultExpanded: false
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Shortcuts on this site",
    description: hotkeys.length + ' shortcuts, such as N for a new member and G then M for the members list.'
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "code",
    onClick: () => setShortcuts(true)
  }, "Show all shortcuts"))), /*#__PURE__*/React.createElement(_plenixPlatform.ShortcutsDialog, {
    open: shortcuts,
    onClose: () => setShortcuts(false)
  }));
}
function People() {
  const [district, setDistrict] = useState(true);
  const [visibility, setVisibility] = useState('members');
  const [ministry, setMinistry] = useState(_data.MINISTRIES[0].id);
  const [colors, setColors] = useState(() => Object.fromEntries(_data.MINISTRIES.map((m, i) => [m.id, _plenixPlatform.CATEGORY_COLORS[i % _plenixPlatform.CATEGORY_COLORS.length]])));
  const active = _data.MEMBERS.filter(m => m.status === 'active').length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Member records",
    description: "What the office asks for on the member form."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Ask for a district",
    description: "North, South, East or West: the visitation servants plan by district."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: "Ask for a district",
    checked: district,
    onChange: e => setDistrict(e.target.checked)
  })), /*#__PURE__*/React.createElement(_plenixPlatform.RadioGroup, {
    label: "Who can see the directory",
    value: visibility,
    onChange: setVisibility,
    options: [{
      value: 'members',
      label: 'Members of the parish',
      description: 'Names, families and phone numbers; never giving.'
    }, {
      value: 'servants',
      label: 'Servants only',
      description: 'For ministries that call families.'
    }, {
      value: 'office',
      label: 'The church office only'
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Directory access",
    description: "What that choice allows."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PermissionSummary, {
    icon: "settings-users",
    access: visibility === 'members' ? 'Members of the parish can view the directory' : visibility === 'servants' ? 'Servants can view the directory' : 'Only the church office can view the directory',
    detail: 'The online and printed directory · ' + active + ' active members',
    can: ['View names and families', 'Call or email a family', 'Print their own household'],
    cannot: ['See giving', 'Edit another household', 'Export the directory'],
    live: true
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Ministry colors",
    description: "Each ministry\u2019s color on the calendar and the sign-up sheets.",
    collapsible: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Ministry",
    htmlFor: "ministry-color-of"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    id: "ministry-color-of",
    value: ministry,
    onChange: e => setMinistry(e.target.value),
    options: _data.MINISTRIES.map(m => ({
      value: m.id,
      label: m.name
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Color",
    description: "Only the category colors: each stays readable on the calendar."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ColorPicker, {
    palette: "category",
    label: 'Color of ' + _data.MINISTRIES.find(m => m.id === ministry).name,
    value: colors[ministry],
    onChange: c => setColors(x => ({
      ...x,
      [ministry]: c
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    wrap: true,
    gap: "md"
  }, _data.MINISTRIES.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.ColorSwatch, {
    key: m.id,
    category: colors[m.id],
    label: m.name,
    showLabel: true,
    pressed: m.id === ministry,
    onClick: () => setMinistry(m.id)
  })))));
}
function Giving({
  council
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [provider, setProvider] = useState({
    id: 'giving',
    service: 'Parish Giving Online',
    icon: 'field-currency',
    description: 'Card and bank gifts from the Give online page.',
    status: 'connected',
    account: 'stjohn-beloved',
    connectedAt: '2026-10-20',
    scopes: ['Receive gifts into the parish account', 'Send each giver a receipt'],
    loses: 'The Give online page stops taking gifts until it is connected again.'
  });
  const [funds, setFunds] = useState(_data.FUNDS);
  const [adding, setAdding] = useState(false);
  const [statements, setStatements] = useState(true);
  const link = status => async () => {
    setProvider(p => ({
      ...p,
      busy: true
    }));
    await wait(700);
    setProvider(p => ({
      ...p,
      busy: false,
      status,
      connectedAt: status === 'connected' ? '2026-10-25' : undefined
    }));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Online giving",
    description: "The service that takes gifts on the Give online page."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ConnectedAccount, {
    account: provider,
    onConnect: link('connected'),
    onDisconnect: link('disconnected'),
    onReconnect: link('connected')
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Funds",
    description: "Where gifts can go. A fund that reached its goal stays open until the council closes it.",
    actions: council ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "add",
      onClick: () => setAdding(true)
    }, "Add a fund")
  }, funds.map(f => /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    key: f.id,
    label: f.name,
    description: money(f.raised) + ' of ' + money(f.goal)
  }, f.raised >= f.goal ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "check"
  }, "Goal reached") : /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "active",
    icon: "progress"
  }, Math.round(f.raised / f.goal * 100) + '%')))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Giving statements",
    description: "The yearly statement each family receives for its records."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Email the statements in January",
    description: "Families without an email get a printed copy."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: "Email the statements in January",
    checked: statements,
    onChange: e => setStatements(e.target.checked)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.PromptDialog, {
    open: adding,
    title: "Add a fund",
    label: "Fund name",
    placeholder: "Iconography fund",
    description: "Givers see this name on the Give online page.",
    confirmLabel: "Add fund",
    validate: v => !v.trim() ? 'Enter a name for the fund.' : funds.some(f => f.name.toLowerCase() === v.trim().toLowerCase()) ? 'A fund with this name already exists.' : '',
    onSubmit: v => {
      setFunds(x => x.concat({
        id: 'fund-' + x.length,
        name: v.trim(),
        goal: 10000,
        raised: 0
      }));
      setAdding(false);
      toast.show(v.trim() + ' added', {
        tone: 'success'
      });
    },
    onCancel: () => setAdding(false)
  }));
}
function Roles({
  council
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [roles, setRoles] = useState(ROLES);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Roles",
    description: "What each person in the office may do. Every change is kept in the settings history."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.RoleManager, {
    label: "Office roles",
    roles: roles,
    permissions: PERMISSIONS,
    people: PEOPLE,
    readOnly: council,
    onChange: (next, change) => {
      setRoles(next);
      if (change && change.type === 'create') toast.show('Role created', {
        tone: 'success'
      });
    }
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Your access",
    description: "What you can do as the church office administrator."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PermissionSummary, {
    variant: "compact",
    icon: "person",
    access: "You can manage the parish records",
    detail: "Church office role",
    can: ['view members', 'record gifts', 'publish announcements'],
    cannot: ['change roles', 'close the parish account']
  })));
}
function Notifications({
  council
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [mail, setMail] = useState({
    visitor: true,
    signups: true,
    weekly: false
  });
  const [calendars, setCalendars] = useState([{
    id: 'gcal',
    service: 'Google Calendar',
    icon: 'calendar',
    description: 'Puts the services and feasts on the parish’s shared calendar.',
    status: 'connected',
    account: 'office@stjohn-beloved.example',
    connectedAt: '2026-09-02',
    scopes: ['Add and update the parish’s events'],
    loses: 'New events stop reaching the shared calendar.'
  }, {
    id: 'outlook',
    service: 'Outlook calendar',
    icon: 'calendar',
    description: 'For the clergy’s own calendars.',
    status: 'error',
    account: 'fr.daniel',
    error: 'Access expired on Oct 12. Reconnect to keep the clergy’s calendars current.'
  }, {
    id: 'ical',
    service: 'Calendar feed',
    icon: 'link',
    description: 'A link members add to their phone’s calendar.',
    status: 'disconnected',
    scopes: ['Publish the public services and feasts']
  }]);
  const [template, setTemplate] = useState(TEMPLATE);
  const [restore, setRestore] = useState(false);
  const set = (id, status) => setCalendars(list => list.map(a => a.id === id ? {
    ...a,
    status,
    error: undefined,
    connectedAt: status === 'connected' ? '2026-10-25' : a.connectedAt
  } : a));
  const toggle = (key, label) => /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: label
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: label,
    checked: mail[key],
    onChange: e => setMail(m => ({
      ...m,
      [key]: e.target.checked
    }))
  }));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Email the office when",
    description: "Sent to the office email."
  }, toggle('visitor', 'A visitor card is filled in'), toggle('signups', 'A servant signs up or cancels'), toggle('weekly', 'The weekly giving summary is ready')), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Connected calendars",
    description: "Calendars the parish\u2019s events are shared with."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ConnectedAccounts, {
    label: "Connected calendars",
    accounts: calendars,
    onConnect: a => set(a.id, 'connected'),
    onDisconnect: a => set(a.id, 'disconnected'),
    onReconnect: a => set(a.id, 'connected')
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Welcome email",
    description: "Sent to each new member. {first_name} is filled in for each person.",
    collapsible: true,
    actions: council ? null : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      onClick: () => setRestore(true)
    }, "Restore the default"), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: () => toast.show('Welcome email saved', {
        tone: 'success'
      })
    }, "Save template"))
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Template (HTML)"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.CodeEditor, {
    language: "html",
    value: template,
    onChange: setTemplate,
    lineNumbers: true,
    height: "md"
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.ConfirmDialog, {
    open: restore,
    title: "Restore the default welcome email?",
    message: "Your changes to the template will be replaced by the parish\u2019s default text.",
    confirmLabel: "Restore",
    destructive: true,
    onConfirm: () => {
      setTemplate(TEMPLATE);
      setRestore(false);
      toast.show('The default welcome email is back');
    },
    onCancel: () => setRestore(false)
  }));
}
function Appearance() {
  const {
    theme,
    mode,
    setTheme,
    themes
  } = (0, _plenixPlatform.useTheme)();
  const [density, setDensity] = (0, _plenixPlatform.useDensity)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Theme and density",
    description: "For this browser: each person chooses their own."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Theme",
    description: 'Currently ' + mode + ' mode',
    htmlFor: "parish-theme"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    id: "parish-theme",
    value: theme,
    onChange: e => setTheme(e.target.value),
    options: themes.map(t => ({
      value: t.name,
      label: t.label
    }))
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Density",
    description: "Compact fits more rows of members and gifts on the screen.",
    htmlFor: "parish-density"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    id: "parish-density",
    value: density,
    onChange: e => setDensity(e.target.value),
    options: [{
      value: 'compact',
      label: 'Compact'
    }, {
      value: 'standard',
      label: 'Standard'
    }, {
      value: 'comfortable',
      label: 'Comfortable'
    }]
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Fellowship hall display",
    description: "The screen in the hall shows the day in dark, so it is easy to read across the room.",
    collapsible: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ThemeZone, {
    mode: "dark",
    surface: "default",
    as: "section",
    label: "Fellowship hall display preview"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    inset: "md",
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "eyebrow"
  }, "Today at St. John the Beloved"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "title",
    as: "p"
  }, "Agape meal \xB7 11:15 AM"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Sunday School begins at 11:30 AM in the classrooms."), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "active",
    icon: "calendar"
  }, "Kiahk begins Dec 10"), /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "waiting",
    icon: "clock"
  }, "Nativity Fast begins Nov 25"))))));
}
function Security({
  council,
  screen
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [minutes, setMinutes] = useState(30);
  const [preview, setPreview] = useState(false);
  const [mfa, setMfa] = useState(true);
  const [closing, setClosing] = useState(null);
  const session = (0, _plenixPlatform.useSessionTimeout)({
    timeout: minutes * 60,
    warnBefore: 120,
    onTimeout: () => screen.navigate('/sign-in')
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Sessions",
    description: "Office computers are shared: sign out people who walk away."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Sign out after inactivity",
    description: "A warning comes two minutes before.",
    htmlFor: "parish-timeout"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Select, {
    id: "parish-timeout",
    value: String(minutes),
    onChange: e => setMinutes(Number(e.target.value)),
    options: [{
      value: '15',
      label: '15 minutes'
    }, {
      value: '30',
      label: '30 minutes'
    }, {
      value: '60',
      label: '1 hour'
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "The warning",
    description: "What people see before they are signed out."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => setPreview(true)
  }, "Preview the warning")), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Require two-step verification",
    description: "Everyone with an office account confirms each sign-in with a code."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Switch, {
    labelHidden: true,
    label: "Require two-step verification",
    checked: mfa,
    onChange: e => setMfa(e.target.checked)
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Office accounts",
    description: "Close the account of someone who no longer serves in the office. Their member record stays."
  }, OFFICE_ACCOUNTS.map(u => /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    key: u.id,
    label: u.name,
    description: u.role + ' · ' + u.last
  }, council ? /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "data"
  }, u.account) : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    variant: "danger-secondary",
    onClick: () => setClosing(u)
  }, "Close account")))), /*#__PURE__*/React.createElement(_plenixPlatform.SessionTimeout, {
    state: preview ? 'warning' : session.state,
    remaining: preview ? 120 : undefined,
    expiresAt: preview ? undefined : session.expiresAt,
    idleMinutes: minutes,
    onStay: () => {
      setPreview(false);
      session.stay();
    },
    onSignOut: () => {
      setPreview(false);
      session.signOut();
    },
    onExpire: () => setPreview(false),
    onSignIn: () => screen.navigate('/sign-in')
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Offboarding, {
    open: !!closing,
    onClose: () => setClosing(null),
    accountName: closing ? closing.account : '',
    action: "delete",
    strings: {
      title: 'Close an office account',
      complete: 'Close account',
      cancel: 'Keep the account'
    },
    formats: [{
      value: 'csv',
      label: 'CSV (a spreadsheet)'
    }, {
      value: 'pdf',
      label: 'PDF'
    }],
    onExport: async () => {
      await wait(500);
      toast.show('The account’s notes and sign-ups were exported', {
        tone: 'success'
      });
    },
    onConfirm: async () => {
      await wait(600);
      toast.show((closing ? closing.name : 'The') + '’s office account was closed', {
        tone: 'success'
      });
    }
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, closing ? closing.name : '', " will no longer sign in. Their member record, family and giving stay as they are.")));
}
function Audit() {
  const [entries, setEntries] = useState(AUDIT);
  const [loading, setLoading] = useState(false);
  const older = async () => {
    setLoading(true);
    await wait(900);
    setEntries(e => e.concat(OLDER));
    setLoading(false);
  };
  return /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Settings history",
    description: "Every change to the parish settings, newest first. The history cannot be changed.",
    actions: entries.length < AUDIT.length + OLDER.length ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      loading: loading,
      onClick: older
    }, "Load older entries") : null
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.AuditLog, {
    entries: entries,
    variant: "diff",
    label: "Settings history"
  }), loading ? /*#__PURE__*/React.createElement(_plenixPlatform.Scrim, {
    variant: "inverse",
    contained: true
  }) : null));
}
  } },
  "test-site/screens/account.jsx": { deps: {"plenix-platform":null,"../site.jsx":"test-site/site.jsx","../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AccountScreen = AccountScreen;
var _plenixPlatform = require("plenix-platform");
var _site = require("../site.jsx");
var _data = require("../data.js");
/* St. John the Beloved test site · My account (#/account): the signed-in office administrator's own settings. The person
   comes from the session (SessionProvider, useSession): the profile (name, email, and the parish role, read only), two-step
   verification (a Notice asks for it until it is on; Set up opens the step in the Auth card: MfaChallenge checks the
   code, and 000000 is always wrong), and the sign-ins linked to the account (ConnectedAccounts). Every group is a
   SettingsSection card in a SettingsLayout. The account area hands the shell its own navigation pane (SideNavPortal): the
   person's own places, and the way back to the parish. */

const {
  useState
} = React;
const [FIRST, ...REST] = _data.ME.name.split(' ');
const SESSION = {
  account: {
    name: _data.ME.name,
    firstName: FIRST,
    lastName: REST.join(' '),
    email: _data.ME.email
  },
  notifications: [{
    id: 'n1',
    text: 'Your two-step verification codes were last used on Oct 20',
    time: 'Oct 20',
    unread: false
  }]
};
const METHODS = [{
  id: 'app',
  kind: 'app',
  label: 'Authenticator app',
  detail: 'the app on your phone'
}];
function AccountScreen({
  screen,
  chrome
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.SessionProvider, {
    session: SESSION
  }, /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: Object.assign({}, chrome, {
      sideNav: null
    }),
    page: "settings"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SideNavPortal, null, /*#__PURE__*/React.createElement(_plenixPlatform.NavPane, {
    label: "My account",
    title: "My account",
    as: "div",
    footer: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      variant: "ghost",
      icon: "arrow-left",
      onClick: () => screen.navigate('/')
    }, "Back to the parish")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.NavList, {
    label: "My account",
    value: "account",
    items: [{
      id: 'account',
      label: 'Profile and sign-in',
      icon: 'settings-profile',
      href: '#/account'
    }, {
      id: 'welcome',
      label: 'Getting started',
      icon: 'star',
      href: '#/welcome'
    }, {
      id: 'settings',
      label: 'Parish settings',
      icon: 'gear',
      href: '#/settings/general'
    }]
  }))), /*#__PURE__*/React.createElement(MyAccount, null)));
}
function MyAccount() {
  const toast = (0, _plenixPlatform.useToast)();
  const {
    account
  } = (0, _plenixPlatform.useSession)();
  const [first, setFirst] = useState(account.firstName || '');
  const [last, setLast] = useState(account.lastName || '');
  const [email, setEmail] = useState(account.email || '');
  const [errors, setErrors] = useState({});
  const [setup, setSetup] = useState(false);
  const [mfaOn, setMfaOn] = useState(false);
  const [mfaError, setMfaError] = useState('');
  const [busy, setBusy] = useState(false);
  const [signIns, setSignIns] = useState([{
    id: 'google',
    service: 'Google',
    icon: 'person',
    description: 'Sign in with your Google account.',
    status: 'connected',
    account: _data.ME.email,
    connectedAt: '2026-03-14',
    scopes: ['See your name and email address'],
    loses: 'You sign in with your email and password only.'
  }, {
    id: 'microsoft',
    service: 'Microsoft',
    icon: 'person',
    description: 'Sign in with a work or school account.',
    status: 'disconnected',
    scopes: ['See your name and email address']
  }]);
  const save = () => {
    const e = {};
    if (!first.trim()) e.first = 'Enter your first name.';
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Enter an email address, like name@example.com.';
    setErrors(e);
    if (!Object.keys(e).length) toast.show('Your profile was saved', {
      tone: 'success'
    });
  };
  const verify = code => {
    setBusy(true);
    setMfaError('');
    setTimeout(() => {
      setBusy(false);
      if (code === '000000') {
        setMfaError('That code didn’t work. Enter the newest code from the app.');
        return;
      }
      setMfaOn(true);
      setSetup(false);
      toast.show('Two-step verification is on', {
        tone: 'success'
      });
    }, 500);
  };
  const link = (id, status) => setSignIns(list => list.map(a => a.id === id ? {
    ...a,
    status,
    account: status === 'connected' ? a.account || _data.ME.email : a.account,
    connectedAt: status === 'connected' ? '2026-10-25' : a.connectedAt
  } : a));
  if (setup) {
    return /*#__PURE__*/React.createElement(_plenixPlatform.Auth, {
      title: "Set up two-step verification",
      headingLevel: 1,
      description: "Add St. John the Beloved to your authenticator app with the setup key from the church office, then enter the 6-digit code it shows.",
      footer: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        variant: "ghost",
        icon: "arrow-left",
        onClick: () => setSetup(false)
      }, "Back to My account")
    }, /*#__PURE__*/React.createElement(_plenixPlatform.MfaChallenge, {
      methods: METHODS,
      onVerify: verify,
      error: mfaError || undefined,
      busy: busy,
      remember: false,
      autoFocus: true
    }));
  }
  return /*#__PURE__*/React.createElement(_plenixPlatform.SettingsLayout, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, mfaOn ? null : /*#__PURE__*/React.createElement(_plenixPlatform.Notice, {
    tone: "warning",
    title: "Turn on two-step verification"
  }, "The church office keeps members\u2019 addresses and phone numbers. The parish asks every office account to use it."), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Profile",
    description: "How you appear to the clergy and the other servants in the office.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "primary",
      onClick: save
    }, "Save profile")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "First name",
    layout: "row",
    required: true,
    error: errors.first
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: first,
    onChange: e => setFirst(e.target.value),
    autoComplete: "given-name"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Last name",
    layout: "row"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    value: last,
    onChange: e => setLast(e.target.value),
    autoComplete: "family-name"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
    label: "Email",
    layout: "row",
    required: true,
    error: errors.email,
    description: "Sign-in links and office notices come here."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Input, {
    type: "email",
    value: email,
    onChange: e => setEmail(e.target.value),
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Role",
    description: "The parish priest changes roles in the parish settings."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, _data.ME.role))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Two-step verification",
    description: "After your password, a code from an app on your phone confirms it is you."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.SettingsRow, {
    label: "Authenticator app",
    description: mfaOn ? 'Asked for at each sign-in on a new computer.' : 'Not set up yet.'
  }, mfaOn ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "success",
    icon: "check"
  }, "On") : /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    onClick: () => {
      setMfaError('');
      setSetup(true);
    }
  }, "Set up"))), /*#__PURE__*/React.createElement(_plenixPlatform.SettingsSection, {
    title: "Sign-in methods",
    description: "Accounts you can sign in with instead of your password."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.ConnectedAccounts, {
    label: "Sign-in methods",
    accounts: signIns,
    onConnect: a => link(a.id, 'connected'),
    onDisconnect: a => link(a.id, 'disconnected'),
    onReconnect: a => link(a.id, 'connected')
  }))));
}
  } },
  "test-site/screens/welcome.jsx": { deps: {"plenix-platform":null,"../site.jsx":"test-site/site.jsx","../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WelcomeScreen = WelcomeScreen;
var _plenixPlatform = require("plenix-platform");
var _site = require("../site.jsx");
var _data = require("../data.js");
/* St. John the Beloved test site · Welcome (#/welcome): the first-run page for a new office servant. Onboarding draws the
   welcome dialog (shown after the first sign-in: #/welcome?first=1), the setup checklist and its own short tour; a second
   Tour walks through the members list's controls; FeatureIntro introduces servant sign-ups (a New badge and a what-is-new
   dialog); a TeachingBubble points at the Help button once; HelpPanel holds the office's help articles in the inspector
   pane, searchable. Progress is kept in the page's state (the caller owns it, as the patterns ask). */

const {
  useState
} = React;
const TASKS = [{
  id: 'profile',
  label: 'Check your profile',
  description: 'Your name and email in My account.'
}, {
  id: 'mfa',
  label: 'Turn on two-step verification',
  description: 'The office keeps members’ phone numbers and addresses.'
}, {
  id: 'members',
  label: 'Look up a family',
  description: 'Open Families and households and find the Girgis family.'
}, {
  id: 'servants',
  label: 'Read the servant guidelines',
  description: 'In Documents, under Servants.'
}, {
  id: 'bulletin',
  label: 'Print a weekly bulletin',
  description: 'From the dashboard’s quick actions.'
}];
const ARTICLES = [{
  id: 'h1',
  title: 'Add a new member',
  summary: 'From a visitor card or a family that just joined.',
  content: /*#__PURE__*/React.createElement(_plenixPlatform.List, {
    ordered: true,
    variant: "steps",
    items: [{
      children: 'Press New member in the header, or N.'
    }, {
      children: 'Choose the family, or start a new household.'
    }, {
      children: 'Save. The member appears in the directory the next day.'
    }]
  })
}, {
  id: 'h2',
  title: 'Record a gift',
  summary: 'Checks and cash from the Sunday collection.',
  content: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Open Donations and pledges, choose Record a gift, then the member, the fund and the method. A receipt is emailed when the member has an email.")
}, {
  id: 'h3',
  title: 'Sign servants up for a service',
  summary: 'Ushers, readers, the Agape kitchen and the sound desk.',
  content: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Servants and sign-ups lists every open slot. Choose a slot, then the servant; the ministry lead is told.")
}, {
  id: 'h4',
  title: 'Print the directory',
  summary: 'Only for members of the parish.',
  content: /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Directory \u203A Print. Giving and private notes are never printed.")
}];
function WelcomeScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [done, setDone] = useState(['profile']);
  const [help, setHelp] = useState(true);
  const [tour, setTour] = useState(false);
  const [tip, setTip] = useState(true);
  const first = screen.params && screen.params.first === '1';
  const tourSteps = [{
    id: 'members',
    title: 'The members list',
    content: _data.MEMBERS.length + ' people in ' + _data.CHURCH.short + '. Filter by district, ministry or status.',
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "settings-users",
      onClick: () => screen.navigate('/members')
    }, "Members")
  }, {
    id: 'new',
    title: 'A new member',
    content: 'From a visitor card: the form asks for the family first.',
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "add",
      onClick: () => screen.navigate('/members/new')
    }, "New member")
  }, {
    id: 'search',
    title: 'Search the parish',
    content: 'Find a member, a family or a document from anywhere with the search in the header.',
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "search",
      onClick: () => screen.navigate('/search', {
        q: 'girgis'
      })
    }, "Search")
  }];
  const onboardingSteps = [{
    id: 'calendar',
    title: 'The calendar',
    content: 'Services, feasts and every ministry’s meetings, in one place.',
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "calendar",
      onClick: () => screen.navigate('/calendar')
    }, "Calendar")
  }, {
    id: 'giving',
    title: 'Giving',
    content: 'Gifts, pledges and the funds, with each family’s statement.',
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "field-currency",
      onClick: () => screen.navigate('/giving')
    }, "Giving")
  }];
  return /*#__PURE__*/React.createElement(_site.SitePage, {
    chrome: chrome,
    page: "dashboard",
    panel: /*#__PURE__*/React.createElement(_plenixPlatform.HelpPanel, {
      open: help,
      onOpenChange: setHelp,
      title: "Office help",
      articles: ARTICLES
    })
  }, /*#__PURE__*/React.createElement(_plenixPlatform.PageContent, null, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "xs"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "h1",
    variant: "title"
  }, "Welcome to the parish office"), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p",
    variant: "lead"
  }, "A few steps to get you ready to serve. You can come back to this page from the navigation at any time.")), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "checklist",
    title: "Get started",
    description: "Check off each step as you go."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Onboarding, {
    title: 'Welcome to ' + _data.CHURCH.short,
    welcome: first,
    tasks: TASKS,
    completed: done,
    onChange: setDone,
    steps: onboardingSteps,
    onDismiss: () => toast.show('The checklist is hidden. It stays in Welcome.'),
    onTourFinish: r => r === 'complete' && toast.show('Tour finished', {
      tone: 'success'
    }),
    strings: {
      tour: 'Take the quick tour',
      checklist: 'Your first week'
    }
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Thank you for serving in the church office. This site keeps the members, families, servants and giving of ", _data.CHURCH.name, "."))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "settings-users",
    title: "Tour the members list",
    description: "Three stops, a minute each.",
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      size: "sm",
      onClick: () => setTour(true)
    }, "Start the tour")
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Tour, {
    open: tour,
    onOpenChange: setTour,
    steps: tourSteps,
    onFinish: r => toast.show(r === 'complete' ? 'Members tour finished' : 'Tour skipped. Resume it any time.')
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "sparkle",
    title: "New this month"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.FeatureIntro, {
    title: "Servant sign-ups",
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "checklist",
      onClick: () => screen.navigate('/servants')
    }, "Open sign-ups"),
    onDismiss: () => toast.show('Got it: we won’t show this again')
  }, "Servants now sign up for ushering, readings and the Agape kitchen themselves. The ministry lead sees each sign-up at once."), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.TeachingBubble, {
    open: tip && !help,
    onDismiss: () => setTip(false),
    title: "Help is always here",
    placement: "bottom",
    spotlight: false,
    primaryAction: {
      label: 'Got it',
      onClick: () => setTip(false)
    },
    target: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "circle-info",
      onClick: () => setHelp(true)
    }, "Help")
  }, "Open the office help from here, or search it, while you work."), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, "Close the help pane to see where it lives.")))))));
}
  } },
  "test-site/screens/sign-in.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignInScreen = SignInScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Sign in (#/sign-in): the parish office's sign-in, a page of its own without the site
   header or navigation (its chrome is null). An AuthenticationPage holds the Auth card and one step at a time: SignInForm
   (with SsoButtons for Google, Microsoft and the diocese's single sign-on), the two-step code (MfaChallenge), creating an
   office account (SignUpForm), a forgotten password (PasswordResetForm), account recovery with a backup code
   (AccountRecovery), and the welcome desk's tablet, which signs in with a 4-digit PIN (OtpInput). Every account here is
   made up: any password of 8 characters or more signs in, and the code 000000 is always wrong. */
const {
  useState
} = React;
const TITLES = {
  signin: ['Sign in to the parish office', 'Use your office email or user name.'],
  mfa: ['Two-step verification', 'Enter the code that confirms it is you.'],
  signup: ['Create an office account', 'For servants the parish priest has asked to help in the office.'],
  reset: ['Reset your password', 'We email you a link to choose a new one.'],
  recovery: ['Recover your account', 'When your phone or authenticator app is not with you.'],
  desk: ['Welcome desk', 'The tablet at the church entrance signs in with the desk PIN.']
};
const METHODS = [{
  id: 'app',
  kind: 'app',
  label: 'Authenticator app'
}, {
  id: 'sms',
  kind: 'sms',
  label: 'Text message',
  detail: 'to the phone ending 44'
}, {
  id: 'email',
  kind: 'email',
  label: 'Email',
  detail: 'to o•••@stjohn-beloved.example'
}];
function SignInScreen({
  screen,
  chrome
}) {
  const toast = (0, _plenixPlatform.useToast)();
  const [view, setView] = useState('signin');
  const [error, setError] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [busy, setBusy] = useState(false);
  const [redirecting, setRedirecting] = useState('');
  const [codeError, setCodeError] = useState('');
  const [recovered, setRecovered] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const go = v => {
    setError('');
    setCodeError('');
    setView(v);
  };
  const later = fn => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      fn();
    }, 500);
  };
  const toSignIn = {
    onClick: () => go('signin'),
    label: 'Back to sign in'
  };
  const signIn = ({
    identifier: id,
    password
  }) => {
    setIdentifier(id);
    later(() => {
      if (password.length < 8) setError('Email or password is incorrect.');else go('mfa');
    });
  };
  const verify = code => later(() => {
    if (code === '000000') setCodeError('That code is wrong or has expired. Enter the newest one.');else screen.navigate('/welcome', {
      first: '1'
    });
  });
  const provider = p => {
    setRedirecting(p.label);
    setTimeout(() => screen.navigate('/'), 900);
  };
  const forms = {
    signin: /*#__PURE__*/React.createElement(_plenixPlatform.SignInForm, {
      onSubmit: signIn,
      error: error || undefined,
      defaultIdentifier: identifier,
      busy: busy,
      keepDescription: "Only on the office computers, never on your own phone.",
      forgot: {
        onClick: () => go('reset')
      },
      signUp: {
        onClick: () => go('signup')
      },
      sso: /*#__PURE__*/React.createElement(_plenixPlatform.SsoButtons, {
        providers: [{
          id: 'google',
          label: 'Google'
        }, {
          id: 'microsoft',
          label: 'Microsoft'
        }],
        onProvider: provider,
        redirecting: redirecting || undefined,
        organization: true,
        onOrganization: email => provider({
          id: 'diocese',
          label: 'the diocese (' + email.split('@').pop() + ')'
        })
      })
    }),
    mfa: /*#__PURE__*/React.createElement(_plenixPlatform.MfaChallenge, {
      methods: METHODS,
      onVerify: verify,
      onResend: m => toast.show('A new code was sent ' + (m.detail || '')),
      error: codeError || undefined,
      busy: busy,
      autoFocus: true,
      recovery: {
        onClick: () => go('recovery')
      }
    }),
    signup: /*#__PURE__*/React.createElement(_plenixPlatform.SignUpForm, {
      busy: busy,
      signIn: toSignIn,
      terms: /*#__PURE__*/React.createElement(React.Fragment, null, "I will keep members\u2019 information private, as the ", /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
        href: "#/document/d4"
      }, "servant guidelines"), " ask"),
      onSubmit: ({
        name
      }) => later(() => {
        toast.show('Thank you, ' + name.split(' ')[0] + '. The parish priest will approve your account.', {
          tone: 'success'
        });
        go('signin');
      })
    }),
    reset: /*#__PURE__*/React.createElement(_plenixPlatform.PasswordResetForm, {
      expires: "30 minutes",
      busy: busy,
      signIn: toSignIn,
      onRequest: () => undefined,
      onResend: () => toast.show('We sent the link again'),
      onReset: () => toast.show('Your password was changed', {
        tone: 'success'
      })
    }),
    recovery: /*#__PURE__*/React.createElement(_plenixPlatform.AccountRecovery, {
      key: recovered ? 'done' : 'ask',
      defaultStep: recovered ? 'done' : 'choose',
      busy: busy,
      error: recoveryError || undefined,
      admin: 'The church office, ' + _data.CHURCH.phone,
      back: toSignIn,
      onFactor: () => go('mfa'),
      onSetUp: () => go('mfa'),
      onCode: code => later(() => {
        if (/^\d{4}-?\d{4}$/.test(code)) {
          setRecoveryError('');
          setRecovered(true);
        } else setRecoveryError('Enter a backup code like 1234-5678.');
      })
    }),
    desk: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
      gap: "md"
    }, /*#__PURE__*/React.createElement(_plenixPlatform.Field, {
      label: "Desk PIN",
      description: "Four digits, from the church office. The desk only opens the visitor cards and the sign-up sheets.",
      error: pinError || undefined
    }, /*#__PURE__*/React.createElement(_plenixPlatform.OtpInput, {
      length: 4,
      masked: true,
      value: pin,
      onChange: v => {
        setPin(v);
        setPinError('');
      },
      autoFocus: true,
      onComplete: v => {
        if (v === '1904') screen.navigate('/servants');else {
          setPinError('That PIN is not right. Ask the church office.');
          setPin('');
        }
      }
    })), /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      variant: "ghost",
      onClick: () => go('signin')
    }, "Back to sign in"))
  };
  const [title, description] = TITLES[view];
  return /*#__PURE__*/React.createElement(_plenixPlatform.AuthenticationPage, _extends({}, chrome, {
    auth: {
      page: true,
      title,
      description,
      footer: /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
        gap: "xs"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
        wrap: true,
        gap: "md",
        justify: "center"
      }, /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
        href: "#/visit",
        variant: "subtle"
      }, "Visit ", _data.CHURCH.short), view !== 'desk' ? /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
        size: "sm",
        variant: "ghost",
        onClick: () => go('desk')
      }, "Welcome desk sign-in") : null), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
        variant: "caption"
      }, "Test site: every account and person here is made up."))
    },
    form: forms[view]
  }));
}
  } },
  "test-site/screens/visit.jsx": { deps: {"plenix-platform":null,"../data.js":"test-site/data.js"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisitScreen = VisitScreen;
var _plenixPlatform = require("plenix-platform");
var _data = require("../data.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Visit us (#/visit): the parish's public page, without the site header or navigation
   (its chrome is null). A LandingPage: the parish's own top navigation (MegaMenus of links; on a narrow window a Menu
   button that opens BottomSheetNav instead, Show / Hide), the service times at a reading width (Center), a map of the
   parish's districts with the church marked (GeoMap, reaching the edges of its card with Bleed), the feasts ahead, what
   to expect on a first visit, the ministries to join (the template's feature cards), a link to sign in and the
   "powered by" line with the Plenix logo (BrandMark). BackToTop floats once the page has scrolled. The location is made up. */
const {
  useState
} = React;
const TODAY = '2026-10-25';
const clock = hm => {
  const [h, m] = hm.split(':').map(Number);
  return (h % 12 || 12) + ':' + String(m).padStart(2, '0') + (h >= 12 ? ' PM' : ' AM');
};
const longDate = iso => new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}).format(new Date(iso + 'T12:00'));

// the parish's four districts (made-up shapes around a made-up church)
const box = (id, name, w, s, e, n) => ({
  type: 'Feature',
  id,
  properties: {
    name
  },
  geometry: {
    type: 'Polygon',
    coordinates: [[[w, s], [e, s], [e, n], [w, n], [w, s]]]
  }
});
const DISTRICTS = {
  type: 'FeatureCollection',
  features: [box('West', 'West district', -74.68, 40.76, -74.64, 40.84), box('North', 'North district', -74.64, 40.80, -74.56, 40.84), box('South', 'South district', -74.64, 40.76, -74.56, 40.80), box('East', 'East district', -74.56, 40.76, -74.52, 40.84)]
};
const PER_DISTRICT = _data.FAMILIES.reduce((o, f) => ({
  ...o,
  [f.district]: (o[f.district] || 0) + 1
}), {});
const MENUS = [{
  label: 'Worship',
  groups: [{
    title: 'Services',
    links: [{
      label: 'Divine Liturgy',
      href: '#/calendar',
      description: 'Sundays at 8:00 AM, Wednesdays at 7:00 AM'
    }, {
      label: 'Vespers and Midnight Praises',
      href: '#/calendar',
      description: 'Saturdays at 6:00 PM'
    }]
  }, {
    title: 'Prayer',
    links: [{
      label: 'Readings and hymns',
      href: '#/readings',
      description: 'The day’s readings and the hymns of the season'
    }, {
      label: 'Sermons',
      href: '#/media'
    }]
  }]
}, {
  label: 'Parish life',
  groups: [{
    title: 'Learn',
    links: [{
      label: 'Sunday School',
      href: '#/ministry/sunday-school'
    }, {
      label: 'Bible Study',
      href: '#/ministry/bible-study'
    }, {
      label: 'Youth Meeting',
      href: '#/ministry/youth'
    }]
  }, {
    title: 'Serve',
    links: [{
      label: 'Food Pantry',
      href: '#/ministry/food-pantry',
      description: 'Saturdays at 9:00 AM'
    }, {
      label: 'Agape Kitchen',
      href: '#/ministry/agape'
    }]
  }]
}, {
  label: 'Give',
  groups: [{
    title: 'Support the parish',
    links: [{
      label: 'Give online',
      href: '#/give'
    }, {
      label: 'Bookstore',
      href: '#/bookstore'
    }]
  }]
}];
const SHEET = MENUS.map(m => ({
  heading: m.label,
  items: m.groups.flatMap(g => g.links).map(l => ({
    id: m.label + l.label,
    label: l.label,
    href: l.href
  }))
}));
const JOIN = [{
  id: 'sunday-school',
  title: 'Sunday School',
  description: 'Grades 1–12, after the Divine Liturgy at 11:30 AM.',
  icon: 'text-card',
  href: '#/ministry/sunday-school'
}, {
  id: 'youth',
  title: 'Youth Meeting',
  description: 'High school and college, Fridays at 7:00 PM.',
  icon: 'settings-users',
  href: '#/ministry/youth'
}, {
  id: 'bible-study',
  title: 'Bible Study',
  description: 'The Gospel of St. John, Wednesdays at 7:00 PM.',
  icon: 'document',
  href: '#/ministry/bible-study'
}, {
  id: 'agape',
  title: 'Agape meal',
  description: 'Every Sunday in the fellowship hall. Everyone is welcome.',
  icon: 'clock',
  href: '#/ministry/agape'
}];
function VisitScreen({
  chrome
}) {
  const [menu, setMenu] = useState(false);
  const feasts = _data.FEASTS.filter(f => f.date >= TODAY).slice(0, 3);
  return /*#__PURE__*/React.createElement(_plenixPlatform.LandingPage, _extends({}, chrome, {
    title: _data.CHURCH.name,
    description: 'A Coptic Orthodox parish in ' + _data.CHURCH.address.city + ', ' + _data.CHURCH.address.region + ', since ' + _data.CHURCH.founded + '. You are welcome.',
    actions: /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
      href: "#/sign-in",
      variant: "standalone"
    }, "Parish office sign-in"),
    items: JOIN
  }), /*#__PURE__*/React.createElement(_plenixPlatform.BackToTop, null), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    as: "nav",
    "aria-label": "Parish",
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Hide, {
    below: "medium",
    fallback: /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
      icon: "menu-lines",
      onClick: () => setMenu(true)
    }, "Menu")
  }, MENUS.map(m => /*#__PURE__*/React.createElement(_plenixPlatform.MegaMenu, {
    key: m.label,
    label: m.label,
    groups: m.groups
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Show, {
    below: "medium"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Button, {
    icon: "phone",
    href: 'tel:' + _data.CHURCH.phone.replace(/\D/g, '')
  }, "Call the office"))), /*#__PURE__*/React.createElement(_plenixPlatform.BottomSheetNav, {
    open: menu,
    onClose: () => setMenu(false),
    title: "St. John the Beloved",
    groups: SHEET
  }), /*#__PURE__*/React.createElement(_plenixPlatform.Center, {
    maxWidth: "lg"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "clock",
    title: "Service times",
    description: "All services are in English, Arabic and Coptic."
  }, /*#__PURE__*/React.createElement(_plenixPlatform.List, {
    items: _data.SERVICES.map(s => ({
      icon: 'calendar',
      children: s.day + ' · ' + clock(s.time) + '–' + clock(s.end) + ' · ' + s.title + ' (' + s.place + ')'
    }))
  }))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "home",
    title: "Find us",
    description: _data.CHURCH.address.line1 + ', ' + _data.CHURCH.address.city + ', ' + _data.CHURCH.address.region + ' ' + _data.CHURCH.address.postal,
    flush: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    inset: "md",
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Bleed, {
    space: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.GeoMap, {
    title: "The parish and its districts",
    description: 'Families in each district; the church is at the center. ' + _data.FAMILIES.length + ' families in all.',
    features: DISTRICTS,
    values: PER_DISTRICT,
    valueTitle: "Families",
    format: v => String(Math.round(v)),
    markers: [{
      id: 'church',
      label: _data.CHURCH.short,
      lon: -74.6,
      lat: 40.8
    }],
    size: "md"
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    as: "p"
  }, "Parking is behind the church and in the school lot across Cedar Grove Road. The fellowship hall entrance has no steps."))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "star",
    title: "Feasts ahead"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "sm"
  }, feasts.map(f => /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    key: f.id,
    justify: "between",
    gap: "sm",
    wrap: true
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Stack, {
    gap: "none"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "strong"
  }, f.title), /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, longDate(f.date))), f.kind === 'fast' ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "waiting",
    icon: "clock"
  }, "Fast") : f.kind === 'season' ? /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    icon: "calendar"
  }, "Season") : /*#__PURE__*/React.createElement(_plenixPlatform.Badge, {
    tone: "active",
    icon: "star"
  }, "Feast"))))), /*#__PURE__*/React.createElement(_plenixPlatform.Panel, {
    icon: "person",
    title: "Your first visit"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.List, {
    variant: "bullets",
    items: [{
      children: 'Come as you are. The ushers at the door will help you find a seat and a service book.'
    }, {
      children: 'The Divine Liturgy lasts about three hours; you may come and go quietly.'
    }, {
      children: 'Stay for the Agape meal after the Liturgy and meet ' + _data.CLERGY[0].name + ' and the parish.'
    }, {
      children: 'Fill in a visitor card at the welcome desk if you would like a call or a visit.'
    }]
  })), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    justify: "between",
    wrap: true,
    gap: "md"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "secondary"
  }, _data.CHURCH.phone, " \xB7 ", /*#__PURE__*/React.createElement(_plenixPlatform.Link, {
    href: 'mailto:' + _data.CHURCH.email,
    variant: "subtle"
  }, _data.CHURCH.email)), /*#__PURE__*/React.createElement(_plenixPlatform.Inline, {
    gap: "sm"
  }, /*#__PURE__*/React.createElement(_plenixPlatform.Text, {
    variant: "caption"
  }, "Powered by"), /*#__PURE__*/React.createElement(_plenixPlatform.BrandMark, {
    kind: "logo",
    size: "sm"
  }))));
}
  } },
  "test-site/screens/not-found.jsx": { deps: {"plenix-platform":null}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundScreen = NotFoundScreen;
var _plenixPlatform = require("plenix-platform");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* St. John the Beloved test site · Page not found (#/missing, and every address the site does not know): an ErrorPage
   (404) with the site chrome, drawn only through its public properties (its strings and the way home). ErrorPage takes no
   other content today (no children or suggestions): a Platform gap, reported for a proper fix. The visit is counted
   (AnalyticsProvider, useAnalytics: only the status number, no address or person), and the common pages are joined in the
   reader's language (useLocale). */
const {
  useEffect
} = React;
const COMMON = ['Members', 'the Calendar', 'Donations and pledges'];
function NotFoundScreen({
  screen,
  chrome
}) {
  return /*#__PURE__*/React.createElement(_plenixPlatform.AnalyticsProvider, {
    enabled: true,
    allowedProperties: ['status']
  }, /*#__PURE__*/React.createElement(NotFound, {
    screen: screen,
    chrome: chrome
  }));
}
function NotFound({
  chrome
}) {
  const track = (0, _plenixPlatform.useAnalytics)();
  const {
    format
  } = (0, _plenixPlatform.useLocale)();
  useEffect(() => {
    track('page_not_found', {
      status: 404
    });
  }, []);
  return /*#__PURE__*/React.createElement(_plenixPlatform.ErrorPage, _extends({}, chrome, {
    error: 404,
    homeHref: "#/",
    strings: {
      title: 'This page isn’t on the parish site',
      description: 'Check the address. The pages people look for most are ' + format.list(COMMON) + ', in the navigation.',
      home: 'Go to the dashboard'
    }
  }));
}
  } },
  "test-site/main.jsx": { deps: {"plenix-platform":null,"./pages.js":"test-site/pages.js","./site.jsx":"test-site/site.jsx","./screens/dashboard.jsx":"test-site/screens/dashboard.jsx","./screens/members.jsx":"test-site/screens/members.jsx","./screens/member.jsx":"test-site/screens/member.jsx","./screens/member-new.jsx":"test-site/screens/member-new.jsx","./screens/member-edit.jsx":"test-site/screens/member-edit.jsx","./screens/families.jsx":"test-site/screens/families.jsx","./screens/family.jsx":"test-site/screens/family.jsx","./screens/directory.jsx":"test-site/screens/directory.jsx","./screens/ministries.jsx":"test-site/screens/ministries.jsx","./screens/ministry.jsx":"test-site/screens/ministry.jsx","./screens/servants.jsx":"test-site/screens/servants.jsx","./screens/calendar.jsx":"test-site/screens/calendar.jsx","./screens/event.jsx":"test-site/screens/event.jsx","./screens/planning.jsx":"test-site/screens/planning.jsx","./screens/readings.jsx":"test-site/screens/readings.jsx","./screens/giving.jsx":"test-site/screens/giving.jsx","./screens/gifts.jsx":"test-site/screens/gifts.jsx","./screens/give.jsx":"test-site/screens/give.jsx","./screens/bookstore.jsx":"test-site/screens/bookstore.jsx","./screens/announcements.jsx":"test-site/screens/announcements.jsx","./screens/announcement-edit.jsx":"test-site/screens/announcement-edit.jsx","./screens/messages.jsx":"test-site/screens/messages.jsx","./screens/assistant.jsx":"test-site/screens/assistant.jsx","./screens/documents.jsx":"test-site/screens/documents.jsx","./screens/document.jsx":"test-site/screens/document.jsx","./screens/media.jsx":"test-site/screens/media.jsx","./screens/photo.jsx":"test-site/screens/photo.jsx","./screens/reports.jsx":"test-site/screens/reports.jsx","./screens/search.jsx":"test-site/screens/search.jsx","./screens/settings.jsx":"test-site/screens/settings.jsx","./screens/account.jsx":"test-site/screens/account.jsx","./screens/welcome.jsx":"test-site/screens/welcome.jsx","./screens/sign-in.jsx":"test-site/screens/sign-in.jsx","./screens/visit.jsx":"test-site/screens/visit.jsx","./screens/not-found.jsx":"test-site/screens/not-found.jsx"}, externals: { "plenix-platform": function () { return window.Plenix; } }, run: function (module, exports, require) {
var _plenixPlatform = require("plenix-platform");
var _pages = require("./pages.js");
var _site = require("./site.jsx");
var _dashboard = require("./screens/dashboard.jsx");
var _members = require("./screens/members.jsx");
var _member = require("./screens/member.jsx");
var _memberNew = require("./screens/member-new.jsx");
var _memberEdit = require("./screens/member-edit.jsx");
var _families = require("./screens/families.jsx");
var _family = require("./screens/family.jsx");
var _directory = require("./screens/directory.jsx");
var _ministries = require("./screens/ministries.jsx");
var _ministry = require("./screens/ministry.jsx");
var _servants = require("./screens/servants.jsx");
var _calendar = require("./screens/calendar.jsx");
var _event = require("./screens/event.jsx");
var _planning = require("./screens/planning.jsx");
var _readings = require("./screens/readings.jsx");
var _giving = require("./screens/giving.jsx");
var _gifts = require("./screens/gifts.jsx");
var _give = require("./screens/give.jsx");
var _bookstore = require("./screens/bookstore.jsx");
var _announcements = require("./screens/announcements.jsx");
var _announcementEdit = require("./screens/announcement-edit.jsx");
var _messages = require("./screens/messages.jsx");
var _assistant = require("./screens/assistant.jsx");
var _documents = require("./screens/documents.jsx");
var _document = require("./screens/document.jsx");
var _media = require("./screens/media.jsx");
var _photo = require("./screens/photo.jsx");
var _reports = require("./screens/reports.jsx");
var _search = require("./screens/search.jsx");
var _settings = require("./screens/settings.jsx");
var _account = require("./screens/account.jsx");
var _welcome = require("./screens/welcome.jsx");
var _signIn = require("./screens/sign-in.jsx");
var _visit = require("./screens/visit.jsx");
var _notFound = require("./screens/not-found.jsx");
/* St. John the Beloved Coptic Orthodox Church · the test site (test-site/main.jsx): the page entry; build-app.js compiles it
   to test-site/app.js. The site is a church database and membership app drawn only from the Plenix Platform, made to hold
   every page template, pattern, component and control in real use, so the automatic tests run here instead of on the
   design spec (owner, 2026-10-25). Each route of pages.js draws its screen (screens/<name>.jsx) with the site chrome. */

const {
  useState
} = React;
const SCREENS = {
  'dashboard': _dashboard.DashboardScreen,
  'members': _members.MembersScreen,
  'member': _member.MemberScreen,
  'member-new': _memberNew.MemberNewScreen,
  'member-edit': _memberEdit.MemberEditScreen,
  'families': _families.FamiliesScreen,
  'family': _family.FamilyScreen,
  'directory': _directory.DirectoryScreen,
  'ministries': _ministries.MinistriesScreen,
  'ministry': _ministry.MinistryScreen,
  'servants': _servants.ServantsScreen,
  'calendar': _calendar.CalendarScreen,
  'event': _event.EventScreen,
  'planning': _planning.PlanningScreen,
  'readings': _readings.ReadingsScreen,
  'giving': _giving.GivingScreen,
  'gifts': _gifts.GiftsScreen,
  'give': _give.GiveScreen,
  'bookstore': _bookstore.BookstoreScreen,
  'announcements': _announcements.AnnouncementsScreen,
  'announcement-edit': _announcementEdit.AnnouncementEditScreen,
  'messages': _messages.MessagesScreen,
  'assistant': _assistant.AssistantScreen,
  'documents': _documents.DocumentsScreen,
  'document': _document.DocumentScreen,
  'media': _media.MediaScreen,
  'photo': _photo.PhotoScreen,
  'reports': _reports.ReportsScreen,
  'search': _search.SearchScreen,
  'settings': _settings.SettingsScreen,
  'account': _account.AccountScreen,
  'welcome': _welcome.WelcomeScreen,
  'sign-in': _signIn.SignInScreen,
  'visit': _visit.VisitScreen,
  'not-found': _notFound.NotFoundScreen
};

// the page of an address: the first page of pages.js whose path matches the parts (":id" matches one part)
function match(parts) {
  for (const p of _pages.PAGES) {
    const want = p.path.split('/').filter(Boolean);
    if (want.length !== parts.length) continue;
    const params = {};
    if (want.every((w, i) => w.charAt(0) === ':' ? (params[w.slice(1)] = parts[i], true) : w === parts[i])) return {
      page: p,
      params
    };
  }
  return {
    page: _pages.PAGES.find(p => p.id === 'not-found'),
    params: {}
  };
}
function Site() {
  const loc = (0, _plenixPlatform.useScreenLocation)({
    app: 'st-john'
  });
  const {
    page,
    params
  } = match(loc.parts);
  const [query, setQuery] = useState(loc.params.q || '');
  const navigate = (path, q) => loc.navigate(path, q);
  const chrome = (0, _site.useChrome)({
    current: page.id,
    navigate,
    query,
    setQuery
  });
  const Screen = SCREENS[page.screen];
  React.useEffect(() => {
    document.title = page.title + ' · St. John the Beloved';
  }, [page.id]);
  const screen = Object.assign({}, loc, {
    page,
    id: params.id,
    navigate
  });
  return /*#__PURE__*/React.createElement(_site.SiteContext.Provider, {
    value: {
      screen,
      chrome,
      navigate
    }
  }, /*#__PURE__*/React.createElement(Screen, {
    key: page.id + ':' + (params.id || ''),
    screen: screen,
    chrome: page.chrome === false ? {
      header: null,
      sideNav: null,
      footer: null
    } : chrome
  }), /*#__PURE__*/React.createElement(_site.SiteCommands, {
    navigate: navigate
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(_plenixPlatform.LocaleProvider, {
  locale: "en-US"
}, /*#__PURE__*/React.createElement(_plenixPlatform.DirectionProvider, {
  dir: "ltr"
}, /*#__PURE__*/React.createElement(_plenixPlatform.ToastProvider, null, /*#__PURE__*/React.createElement(Site, null)))));
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
  load("test-site/main.jsx");
})();
