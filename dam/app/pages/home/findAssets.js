/* Plenix asset app · asset search (app/pages/home/findAssets.js): which assets match a query and filters, and in which
   order; and the search screen's address. Shared by the home page's Search workspace and the header's quick results (the
   full-screen search view at Narrow, app/shell/AssetShell.jsx).
   The address of a search (Platforms Standard 4.3): #/search?q=<text>&type=AI,PSD&cat=…&tags=…&owner=…&date=…&status=…&sort=…;
   a multiple-choice filter is its values joined by commas (no value holds one), a single choice its value; a filter
   without a value and the default sort are left out. */
import * as D from './homeData.js';

export const FIND_EMPTY = { query: '', filters: {}, sort: 'Relevance', saved: null };
export const MONTH = (d) => d.replace(/ \d+,/, '');   // "Aug 12, 2026" → "Aug 2026"
const MULTIPLE = ['type', 'cat', 'tags'], SINGLE = ['owner', 'date', 'status'];

export function findAssets(f) {
  const words = f.query.toLowerCase().split(/\s+/).filter(Boolean);
  const v = f.filters;
  const list = D.ASSETS.filter((a) => {
    const hay = [a.name, a.file, a.cat, a.fmt, a.owner].concat(a.tags).join(' ').toLowerCase();
    if (words.some((w) => hay.indexOf(w) < 0)) return false;
    if ((v.type || []).length && v.type.indexOf(a.badge) < 0) return false;
    if ((v.cat || []).length && v.cat.indexOf(a.cat) < 0) return false;
    if ((v.tags || []).length && !v.tags.every((t) => a.tags.indexOf(t) >= 0)) return false;
    if (v.owner && a.owner !== v.owner) return false;
    if (v.status && a.status !== v.status) return false;
    if (v.date && MONTH(a.date) !== v.date) return false;
    return true;
  });
  const by = { Newest: (a, b) => Date.parse(b.date) - Date.parse(a.date), Oldest: (a, b) => Date.parse(a.date) - Date.parse(b.date),
    'Name A–Z': (a, b) => a.name.localeCompare(b.name), 'Name Z–A': (a, b) => b.name.localeCompare(a.name), Size: (a, b) => parseFloat(b.size) - parseFloat(a.size) }[f.sort];
  return by ? list.slice().sort(by) : list;
}

// a search's address parameters: { q, type, cat, tags, owner, date, status, sort }
export function findParams(f) {
  const p = { q: f.query || '' };
  MULTIPLE.forEach((k) => { if ((f.filters[k] || []).length) p[k] = f.filters[k].join(','); });
  SINGLE.forEach((k) => { if (f.filters[k]) p[k] = f.filters[k]; });
  if (f.sort && f.sort !== FIND_EMPTY.sort) p.sort = f.sort;
  return p;
}

// the search an address names (the inverse of findParams)
export function findOf(params) {
  const filters = {};
  MULTIPLE.forEach((k) => { if (params[k]) filters[k] = params[k].split(','); });
  SINGLE.forEach((k) => { if (params[k]) filters[k] = params[k]; });
  return { ...FIND_EMPTY, query: params.q || '', filters, sort: params.sort || FIND_EMPTY.sort };
}
