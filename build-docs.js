/**
 * build-docs.js — Syncs markdown PRD files into plenix-docs.html
 *
 * Source of truth: *-prd.md files in capabilities/
 * Target: docs/plenix-docs.html (updates the inlined data block)
 *
 * Run: node build-docs.js
 */

const fs = require('fs');
const path = require('path');

const DIR = __dirname;
const CAP_DIR = path.join(DIR, 'capabilities');
const DOCS_HTML = path.join(DIR, 'docs', 'plenix-docs.html');
const DATA_JS = path.join(DIR, 'docs', 'plenix-data.js');

/* ── Section definitions for the 28-section PRD template ── */
const SECTION_DEFS = [
  { num: 1,  key: 'summary',         title: 'Capability Summary' },
  { num: 2,  key: 'problem',         title: 'Problem Statement' },
  { num: 3,  key: 'goals',           title: 'Goals & Non-Goals' },
  { num: 4,  key: 'actors',          title: 'User Types / Actors' },
  { num: 5,  key: 'stories',         title: 'User Stories' },
  { num: 6,  key: 'useCases',        title: 'Use Cases / Scenarios' },
  { num: 7,  key: 'scope',           title: 'Scope: MVP vs Future' },
  { num: 8,  key: 'features',        title: 'Feature List' },
  { num: 9,  key: 'businessRules',   title: 'Business Rules & Edge Cases' },
  { num: 10, key: 'dataModel',       title: 'Data Model' },
  { num: 11, key: 'fieldSpec',       title: 'Field-Level Specification' },
  { num: 12, key: 'dbNotes',         title: 'Database / Schema Notes' },
  { num: 13, key: 'permissions',     title: 'Permissions Matrix' },
  { num: 14, key: 'uiUx',           title: 'UI / UX Requirements' },
  { num: 15, key: 'workflows',       title: 'Workflow Requirements' },
  { num: 16, key: 'api',             title: 'API Requirements' },
  { num: 17, key: 'search',          title: 'Search / Indexing Rules' },
  { num: 18, key: 'ai',              title: 'AI Requirements' },
  { num: 19, key: 'oss',             title: 'OSS / Build-vs-Buy Decision' },
  { num: 20, key: 'integrations',    title: 'Integration Map' },
  { num: 21, key: 'notifications',   title: 'Notifications / Activity' },
  { num: 22, key: 'nfr',             title: 'Non-Functional Requirements' },
  { num: 23, key: 'reporting',       title: 'Reporting / Analytics' },
  { num: 24, key: 'migration',       title: 'Migration / Import / Export' },
  { num: 25, key: 'openQuestions',    title: 'Open Questions' },
  { num: 26, key: 'risks',           title: 'Risks & Decisions' },
  { num: 27, key: 'testing',         title: 'Verification & Testing' },
  { num: 28, key: 'readiness',       title: 'Readiness Gate' },
];

function parsePRD(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const basename = path.basename(filePath, '-prd.md');

  const result = {
    id: basename.replace(/-/g, '_'),
    file: path.basename(filePath),
    label: '',
    purpose: '',
    specStatus: '',
    lastRevised: '',
    revisionSummary: '',
    features: [],
    sections: {},
  };

  // Capability name
  const nameMatch = content.match(/\*\*Capability name\*\*\s*\|\s*(.+?)(?:\s*\||\s*$)/m)
    || content.match(/\*\*Capability name:\*\*\s*(.+)/);
  if (nameMatch) result.label = nameMatch[1].trim();

  // Spec status
  const statusMatch = content.match(/\*\*Status\*\*\s*\|\s*(.+?)(?:\s*\||\s*$)/m)
    || content.match(/\*\*Spec status:\*\*\s*(.+)/);
  if (statusMatch) result.specStatus = statusMatch[1].trim();

  // Last revised
  const revisedMatch = content.match(/\*\*Last revised\*\*\s*\|\s*(.+?)(?:\s*\||\s*$)/m)
    || content.match(/\*\*Last revised:\*\*\s*(.+)/);
  if (revisedMatch) result.lastRevised = revisedMatch[1].trim();

  // Revision summary
  const revSumMatch = content.match(/\*\*Revision summary\*\*\s*\|\s*(.+?)(?:\s*\||\s*$)/m)
    || content.match(/\*\*Revision summary:\*\*\s*(.+)/);
  if (revSumMatch) result.revisionSummary = revSumMatch[1].trim();

  // ── Extract ALL 28 sections as raw markdown text ──
  for (const def of SECTION_DEFS) {
    // Match "## N. Title" up to the next "## " or end of file
    const pattern = new RegExp(
      '## ' + def.num + '\\.' + '\\s+' + def.title.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&') +
      '\\s*\\n+([\\s\\S]*?)(?=\\n## \\d+\\.|$)'
    );
    const match = content.match(pattern);
    if (match) {
      const text = match[1].trim();
      // Skip empty / placeholder sections
      if (text && text !== 'Not yet defined.' && text !== 'Not yet defined') {
        result.sections[def.key] = text;
      }
    }
  }

  // Also try old-format sections for backwards compatibility
  const oldMappings = [
    { old: '## 1. Capability', key: 'summary', next: '## 2.' },
    { old: '## 2. Baseline Operations', key: 'workflows', next: '## 3.' },
    { old: '## 3. Features', key: 'features', next: '## 4.' },
    { old: '## 5. Functionality', key: 'businessRules', next: '## 6.' },
    { old: '## 7. Scenarios', key: 'useCases', next: '## 8.' },
    { old: '## 9. Enablers', key: 'ai', next: '## 10.' },
    { old: '## 11. Modules', key: 'api', next: '## 12.' },
  ];
  for (const m of oldMappings) {
    if (result.sections[m.key]) continue; // new format takes priority
    const escaped = m.old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const nextEsc = m.next.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pat = new RegExp(escaped + '\\s*\\n+([\\s\\S]*?)(?=\\n' + nextEsc + '|\\n---|$)');
    const match = content.match(pat);
    if (match) {
      const text = match[1].trim();
      if (text && text !== 'Not yet defined.' && text !== 'Not yet defined') {
        result.sections[m.key] = text;
      }
    }
  }

  // Purpose = first non-heading line of summary section
  if (result.sections.summary) {
    const lines = result.sections.summary.split('\n').filter(l => l.trim() && !l.startsWith('#'));
    result.purpose = lines[0] || '';
  }

  // ── Parse features table (structured, for feature counts) ──
  const featText = result.sections.features || '';
  if (featText) {
    const rows = featText.split('\n').filter(l => l.startsWith('| F') || l.startsWith('| V'));
    for (const row of rows) {
      const parts = row.split('|').map(s => s.trim()).filter(Boolean);
      if (parts.length >= 4) {
        const lm = parts[1].match(/\*\*(.+?)\*\*/);
        const label = lm ? lm[1] : parts[1];
        const sr = parts[2];
        const desc = parts.slice(3).join(' | ');
        let status = 'planned';
        if (sr.includes('Built') || sr.includes('✅')) status = 'built';
        else if (sr.includes('Not Defined') || sr.includes('🔴')) status = 'todo';
        else if (sr.includes('Product Decision') || sr.includes('🟠')) status = 'todo';
        result.features.push({ id: parts[0], name: label, desc, status });
      }
    }
  }

  return result;
}

// ─── Main ───
console.log('build-docs.js — syncing markdown → HTML\n');

// 1. Find all PRD files
const prdFiles = [];
for (const entry of fs.readdirSync(CAP_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const sub = path.join(CAP_DIR, entry.name);
  for (const f of fs.readdirSync(sub)) {
    if (f.endsWith('-prd.md')) prdFiles.push(path.join(entry.name, f));
  }
}
prdFiles.sort();
console.log('Found ' + prdFiles.length + ' PRD files');

// 2. Parse each
const parsed = {};
let featCount = 0;
let richCount = 0;
for (const f of prdFiles) {
  const fullPath = path.join(CAP_DIR, f);
  const p = parsePRD(fullPath);
  parsed[p.id] = p;
  featCount += p.features.length;
  const hasContent = p.features.length > 0 || Object.keys(p.sections).length > 1;
  if (hasContent) richCount++;
}
console.log('Parsed ' + Object.keys(parsed).length + ' capabilities, ' + featCount + ' total features, ' + richCount + ' with content');

// 3. Read plenix-data.js
let dataJS = fs.readFileSync(DATA_JS, 'utf8');

// 4. Remove any previous auto-generated block
dataJS = dataJS.replace(/\n\s*\/\* == AUTO-GENERATED from markdown PRDs by build-docs\.js == \*\/[\s\S]*$/g, '');
dataJS = dataJS.trimEnd();

// 5. Build the _MD_CAP_DATA block
const lines = [];
lines.push('');
lines.push('  /* == AUTO-GENERATED from markdown PRDs by build-docs.js == */');
lines.push('  window._MD_CAP_DATA = {');

for (const [id, cap] of Object.entries(parsed)) {
  const hasContent = cap.features.length > 0 || Object.keys(cap.sections).length > 1;
  if (!hasContent) continue;

  lines.push('    ' + JSON.stringify(id) + ': {');
  lines.push('      label: ' + JSON.stringify(cap.label) + ',');
  lines.push('      file: ' + JSON.stringify(cap.file) + ',');
  lines.push('      purpose: ' + JSON.stringify(cap.purpose) + ',');
  lines.push('      specStatus: ' + JSON.stringify(cap.specStatus) + ',');
  if (cap.lastRevised) lines.push('      lastRevised: ' + JSON.stringify(cap.lastRevised) + ',');
  if (cap.revisionSummary) lines.push('      revisionSummary: ' + JSON.stringify(cap.revisionSummary) + ',');
  lines.push('      features: ' + JSON.stringify(cap.features) + ',');
  lines.push('      sections: ' + JSON.stringify(cap.sections) + ',');
  lines.push('    },');
}

lines.push('  };');
lines.push('');

dataJS += '\n' + lines.join('\n') + '\n';
fs.writeFileSync(DATA_JS, dataJS);
console.log('Updated plenix-data.js with _MD_CAP_DATA (' + richCount + ' capabilities)');

// 6. Re-inline into plenix-docs.html
let docsHTML = fs.readFileSync(DOCS_HTML, 'utf8');
const dataPattern = /(<div id="root"><\/div>\s*\n\s*)(<script>)([\s\S]*?)(<\/script>)/;
const dataMatch = docsHTML.match(dataPattern);
if (dataMatch) {
  const newScript = dataMatch[1] + '<script>\n' + dataJS + '\n</script>';
  docsHTML = docsHTML.slice(0, dataMatch.index) + newScript + docsHTML.slice(dataMatch.index + dataMatch[0].length);
  fs.writeFileSync(DOCS_HTML, docsHTML);
  console.log('Re-inlined data into plenix-docs.html (' + (docsHTML.length / 1024).toFixed(0) + ' KB)');
} else {
  console.error('ERROR: Could not find data script block in plenix-docs.html');
}

console.log('\nDone. Refresh plenix-docs.html to see changes.');
