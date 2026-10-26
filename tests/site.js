// Plenix tests · the St. John the Beloved test site (test-site/): its pages, for the browser tests. Every automatic browser
// test opens these pages (and the suite applications' pages where the test is about them) instead of the design spec
// (owner, 2026-10-25: "The tests should not be done on design spec").
//   site.pages()         every page of test-site/pages.js: { id, group, path, open, title, screen, … }
//   site.urls()          the address of each page, relative to /Plenix/: 'test-site/index.html#/members'
//   site.url(id)         the address of one page by its id ('members', 'calendar', 'settings')
const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'test-site', 'pages.js');
let PAGES = null;
function pages() {
  if (PAGES) return PAGES;
  const text = fs.readFileSync(FILE, 'utf8');
  PAGES = JSON.parse(text.slice(text.indexOf('= [') + 2).replace(/;\s*$/, ''));
  return PAGES;
}
const url = (id, extra) => { const p = pages().find((x) => x.id === id); if (!p) throw new Error('No test-site page ' + id); return 'test-site/index.html#' + (p.open || p.path) + (extra || ''); };
const urls = () => pages().map((p) => 'test-site/index.html#' + (p.open || p.path));

module.exports = { pages, urls, url, FILE };
