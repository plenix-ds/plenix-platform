/* Plenix asset app · home page data (app/pages/home/homeData.js).
   DATA: every list here comes from the back end; these are the sample records the home page showed in HTML and in
   plenix.js (CATEGORIES, COLLECTIONS, assetData) until then, unchanged. Thumbnails are the stand-in images in assets/. */

const folder = (name, children) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), label: name, icon: 'folder', children });
export const FOLDERS = [
  folder('All', [
    folder('Digital Assets', [
      folder('Banner icon'), folder('Bookshelf'),
      folder('Borders', [folder('Arch'), folder('Banner'), folder('Circular'), folder('Divider'), folder('Linear'), folder('Page')]),
      folder('Branding', [folder('Churches'), folder('CYC'), folder('Diakonia'), folder('LACopts')]),
      folder('Certificates'), folder('Clergy'), folder('Crosses'), folder('Embroideries'), folder('Fonts'),
    ]),
    folder('Documents', [folder('Manuals'), folder('Templates')]),
    folder('Facial Profiles'), folder('Users'),
  ]),
];
export const FOLDERS_OPEN = ['all', 'digital-assets'];

// the sidebar lists (the first row of each is the "All …" view)
export const CATEGORIES = [
  ['All categories', '4,546', true], ['Branding', '326', true], ['Crosses', '1,284', true], ['Banner icon', '18'], ['Bookshelf', '18'], ['Borders', '245'],
  ['Certificates', '387'], ['Clergy', '512'], ['Covers', '198'], ['Dome', '14'], ['Embroideries', '31'], ['Fonts', '22'], ['Galloons', '27'],
  ['Korban Stamp', '8'], ['Ornamental Elements', '45'], ['Presentation Folders', '12'],
].map(([name, count, pinned]) => ({ name, count, pinned: !!pinned }));
export const CATEGORIES_SHOWN = 7;
export const COLLECTIONS = [['All collections', '305', true], ['Website Assets', '84', true], ['Social Media', '42', true], ['Print ready', '156'], ['Needs review', '23']]
  .map(([name, count, pinned]) => ({ name, count, pinned: !!pinned }));
// a saved search keeps its query and filters; opening it restores them in the Search workspace
export const SAVED_SEARCHES = [
  { name: 'High-res crosses', query: 'cross', filters: {} },
  { name: 'Untagged assets', query: '', filters: { status: 'New' } },
  { name: 'Large files >50MB', query: '', filters: { type: ['PSD'] } },
];
export const RECENT_IMPORTS = [['Aug 31, 2026', 28], ['Aug 24, 2026', 112], ['Aug 15, 2026', 67]];
export const TRASH = [['Deleted assets', 12]];

export const CATEGORY_CARDS = [
  ['Banner icon', 24, 5, 'Aug 28, 2026'], ['Bookshelf', 18, 6, 'Aug 25, 2026'], ['Borders - Arch', 31, 7, 'Aug 22, 2026'], ['Borders - Circular', 42, 8, 'Aug 20, 2026'],
  ['Branding - Churches', 28, 9, 'Aug 18, 2026'], ['Branding - CYC', 5, 10, 'Aug 15, 2026'], ['Branding - Diakonia', 15, 11, 'Aug 12, 2026'], ['Certificate - Baptism', 89, 12, 'Aug 10, 2026'],
  ['Certificate - Masters', 47, 13, 'Aug 8, 2026'], ['Clergy - Metropolitan Serapion', 62, 14, 'Aug 5, 2026'], ['Clergy - Pope Shenouda III', 210, 15, 'Aug 2, 2026'],
  ['Clergy - Pope Tawadros II', 45, 16, 'Jul 30, 2026'], ['Cross - Traditional', 78, 17, 'Jul 25, 2026'], ['Dome', 33, 18, 'Jul 20, 2026'], ['Embroideries', 156, 19, 'Jul 15, 2026'],
  ['Fonts', 18, 20, 'Jul 10, 2026'],
].map(([name, count, thumb, modified], i) => ({ id: i, name, count, thumb: 'assets/thumb-' + thumb + '.svg', modified, status: 'Active' }));
export const CATEGORY_TOTAL = 48;
export const CATEGORY_COUNT_LABEL = '52 categories';

export const COLLECTION_CARDS = [['Website Assets', 84, 'Aug 28, 2026', 'jordan'], ['Social Media', 42, 'Aug 25, 2026', 'jordan'], ['Print ready', 156, 'Aug 20, 2026', 'sarah'], ['Needs review', 23, 'Aug 14, 2026', 'daniel']]
  .map(([name, count, updated, owner], i) => ({ id: i, name, count, updated, owner }));

export const ASSETS = [
  ['Coptic Cross Gold Traditional', 'Cross - Traditional', 'Coptic_Cross_Gold.ai', 'Adobe Illustrator (.ai)', 'AI', '18.7 MB', '2400 × 3200 px', 'Aug 12, 2026', 'Complete'],
  ['Cross Gold Ornate Large', 'Cross - Majestic', 'Cross_Gold_Ornate.psd', 'Photoshop (.psd)', 'PSD', '42.1 MB', '4800 × 6400 px', 'Aug 10, 2026', 'Complete'],
  ['Cross Gold Pectoral', 'Cross - Pectoral Silver', 'Cross_Gold_Pectoral.ai', 'Adobe Illustrator (.ai)', 'AI', '8.3 MB', '1200 × 1600 px', 'Aug 8, 2026', 'Complete'],
  ['Gold Cross Floral Border', 'Cross - Floral', 'Gold_Cross_Floral.png', 'PNG', 'PNG', '4.2 MB', '2000 × 2000 px', 'Jul 28, 2026', 'New'],
  ['Cross Gold Diamond Pattern', 'Cross - Diamond', 'Cross_Gold_Diamond.ai', 'Adobe Illustrator (.ai)', 'AI', '12.6 MB', '3000 × 3000 px', 'Jul 22, 2026', 'Complete'],
  ['Gold Cross Iconostasis', 'Cross - Iconostasis', 'Gold_Cross_Iconostasis.jpg', 'JPEG', 'JPG', '1.8 MB', '1920 × 2560 px', 'Jul 15, 2026', 'Complete'],
  ['Cross Gold Procession', 'Cross - Procession', 'Cross_Gold_Procession.psd', 'Photoshop (.psd)', 'PSD', '28.4 MB', '4000 × 5000 px', 'Jul 10, 2026', 'New'],
  ['Gold Coptic Cross Linear', 'Cross - Linear', 'Gold_Coptic_Linear.ai', 'Adobe Illustrator (.ai)', 'AI', '6.1 MB', '1800 × 2400 px', 'Jul 5, 2026', 'Complete'],
].map(([name, cat, file, fmt, badge, size, dims, date, status], i) => ({
  id: i, name, cat, file, fmt, badge, size, dims, date, status, thumb: 'assets/thumb-' + (21 + i) + '.svg', typeIcon: 'file-' + badge.toLowerCase(),
  tags: name.toLowerCase().split(' '), owner: ['Jordan Avery', 'Sarah M.', 'John Deacon'][i % 3],
}));
export const ASSET_TOTAL = 210;
export const SEARCH_QUERY = 'cross gold';
export const SEARCH_COUNT = 24;

export const SORT_OPTIONS = ['Relevance', 'Newest', 'Oldest', 'Name A-Z', 'Name Z-A', 'Size ▼', 'Size ▲', 'Modified'];

// the details pane for a category (and the collection shown in the collections view)
export const CATEGORY_DETAIL = {
  name: 'Cross - Traditional', count: '78 assets', parent: 'Categories (root)', parents: ['Categories (root)', 'Borders', 'Branding', 'Clergy', 'Crosses'],
  order: '8', color: 'brown' /* a category color (CATEGORY_COLORS, batch 290) */, copyright: 'Coptic Orthodox Church', rights: 'Internal', rightsOptions: ['Internal', 'Commercial', 'Editorial', 'Public domain'],
  rating: 0, description: 'Traditional Coptic cross designs and variations', tags: ['cross', 'traditional', 'coptic'],
  stats: [['Total assets', '78'], ['Storage used', '1.4 GB'], ['Created', 'Jul 3, 2026'], ['Modified', 'Aug 28, 2026']],
  permissions: [['Owner', 'jordan'], ['View groups', 'administrators, users, guest'], ['Edit groups', 'administrators']],
  customFields: [['Style', 'e.g. Byzantine, Nubian...'], ['Material', 'e.g. Wood, Stone, Metal...'], ['Origin', 'e.g. Egypt, Ethiopia...']],
};
export const COLLECTION_DETAIL = { name: 'Website Assets', count: '84 assets' };
export const CATEGORY_DOWNLOADS = [
  { title: 'Download entire category', items: [['file-zip', 'All Files (Source)', '78 files · ~1.4 GB']] },
  { title: 'Download by file type', items: [['file-ai', 'Adobe Illustrator (.ai)', '42 files · ~820 MB'], ['file-png', 'PNG Images', '78 files · ~340 MB'], ['file-jpg', 'JPEG Thumbnails', '78 files · ~18 MB'], ['file-svg', 'SVG Vectors', '35 files · ~12 MB'], ['file-pdf', 'PDF Print-Ready', '42 files · ~280 MB']] },
  { title: 'Variations', items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '78 files · ~45 MB'], ['file-png', 'Social Media (1080×1080)', '78 files · ~62 MB']] },
];
export const ASSET_DOWNLOADS = [
  { title: 'Download by file type', items: [['file-png', 'Preview.png', '4.2 MB'], ['file-jpg', 'Web.jpg', '245 KB']] },
  { title: 'Variations', items: [['file-jpg', 'Web Optimized (sRGB, 1200px)', '180 KB'], ['file-png', 'Social Media (1080×1080)', '520 KB']] },
];
export const ASSET_STATUSES = ['Complete', 'New', 'In progress', 'Pending review', 'Archived'];
export const USAGE_RIGHTS = ['Internal use only', 'Church Use', 'Creative Commons', 'Public domain'];
export const VERSIONS = [
  { label: 'Version 3 (Current)', date: 'Aug 12, 2026 at 2:45 PM', user: 'Jordan A.', current: true },
  { label: 'Version 2', date: 'Jul 5, 2026 at 10:12 AM', user: 'Sarah M.' },
  { label: 'Version 1 (Original)', date: 'Jun 18, 2026 at 3:30 PM', user: 'Fr. Daniel' },
];

// the options menu on a category card
export const CARD_MENU = [['fields', 'Edit category', 'Edit category'], ['rename', 'Rename', 'Rename'], ['image-a-2', 'Set thumbnail', 'Set thumbnail'],
  ['menu-lines', 'Visible metadata', 'Manage metadata'], ['move', 'Move To...', 'Move'], ['lock', 'Permissions', 'Permissions'], ['trash-detail', 'Delete', 'Delete']];
