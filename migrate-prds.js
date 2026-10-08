/**
 * migrate-prds.js — Migrates all 73 PRDs from old 13-section format to new 28-section format
 *
 * Reads each *-prd.md, extracts content from old sections, maps to new sections,
 * preserves existing content, adds empty placeholders for new sections.
 *
 * Run: node migrate-prds.js
 * Run with --dry to preview without writing.
 */

const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry');
const CAP_DIR = path.join(__dirname, 'capabilities');

// ─── Old section extraction ───

function extractOldSections(content) {
  const sections = {};

  // Metadata block (before first ##)
  const metaMatch = content.match(/^([\s\S]*?)(?=\n## )/);
  if (metaMatch) sections._meta = metaMatch[1].trim();

  // Extract named fields from metadata
  const capName = content.match(/\*\*Capability name:\*\*\s*(.+)/);
  const specStatus = content.match(/\*\*Spec status:\*\*\s*(.+)/);
  const lastRevised = content.match(/\*\*Last revised:\*\*\s*(.+)/);
  const revSummary = content.match(/\*\*Revision summary:\*\*\s*(.+)/);
  const title = content.match(/^# (.+)/m);

  sections.capName = capName ? capName[1].trim() : '';
  sections.specStatus = specStatus ? specStatus[1].trim() : '';
  sections.lastRevised = lastRevised ? lastRevised[1].trim() : '';
  sections.revSummary = revSummary ? revSummary[1].trim() : '';
  sections.title = title ? title[1].trim() : '';

  // Split by ## headers, capturing section numbers
  // Match patterns like "## 0. ", "## 1. ", "## 1.1 ", "## Requirement Language", "## Metadata"
  const sectionRegex = /^## (\d+(?:\.\d+)?)\.\s+(.+)$/gm;
  let match;
  const sectionPositions = [];

  while ((match = sectionRegex.exec(content)) !== null) {
    sectionPositions.push({
      num: match[1],
      title: match[2].trim(),
      start: match.index,
      headerEnd: match.index + match[0].length
    });
  }

  // Also find "## Requirement Language" which has no number
  const reqLangMatch = content.match(/^## Requirement Language\s*\n([\s\S]*?)(?=\n## \d)/m);
  if (reqLangMatch) sections.reqLang = reqLangMatch[1].trim();

  // Extract content between section headers
  for (let i = 0; i < sectionPositions.length; i++) {
    const s = sectionPositions[i];
    const nextStart = i + 1 < sectionPositions.length ? sectionPositions[i + 1].start : content.length;
    const body = content.slice(s.headerEnd, nextStart).trim();
    sections['s' + s.num] = body;
    sections['s' + s.num + '_title'] = s.title;
  }

  return sections;
}

function isStubContent(text) {
  if (!text) return true;
  const stripped = text.replace(/\|[- |]+\|/g, '').replace(/#+\s+\S+/g, '').trim();
  return !stripped || stripped === 'Not yet defined.' || stripped === 'Not yet defined';
}

function hasTable(text) {
  return text && text.includes('|') && text.split('\n').filter(l => l.startsWith('|')).length > 2;
}

// ─── New section builders ───

function buildNewPRD(old, capId) {
  const lines = [];
  const NYD = 'Not yet defined.';

  // Title
  lines.push(`# ${old.title || old.capName + ' PRD'}`);
  lines.push('');

  // Metadata
  lines.push('## Metadata');
  lines.push('');
  lines.push(`| Field | Value |`);
  lines.push(`|---|---|`);
  lines.push(`| **Capability name** | ${old.capName || NYD} |`);
  lines.push(`| **Capability ID** | ${capId} |`);
  lines.push(`| **Status** | ${mapStatus(old.specStatus)} |`);
  lines.push(`| **Priority** | Not yet defined |`);
  lines.push(`| **Phase** | Not yet defined |`);
  lines.push(`| **Last revised** | ${old.lastRevised || NYD} |`);
  lines.push(`| **Revision summary** | ${old.revSummary || NYD} |`);
  lines.push('');
  lines.push('This PRD follows the 28-section structure defined in **00-conventions.md**.');
  lines.push('');
  lines.push('---');
  lines.push('');

  // Section 1: Capability Summary
  lines.push('## 1. Capability Summary');
  lines.push('');
  if (old.s1 && !isStubContent(old.s1)) {
    lines.push(old.s1);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 2: Problem Statement
  lines.push('## 2. Problem Statement');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 3: Goals & Non-Goals
  lines.push('## 3. Goals & Non-Goals');
  lines.push('');
  lines.push('### Goals');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Non-Goals');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 4: User Types / Actors
  lines.push('## 4. User Types / Actors');
  lines.push('');
  lines.push('| Actor | Description |');
  lines.push('|---|---|');
  lines.push('| Owner | Full control over this capability |');
  lines.push('| Admin | Administrative access |');
  lines.push('| Team Member | Internal user with scoped access |');
  lines.push('| Consultant | External specialist with limited access |');
  lines.push('| Client Portal User | External client with restricted view |');
  lines.push('| AI Agent | Automated AI operations |');
  lines.push('');

  // Section 5: User Stories
  lines.push('## 5. User Stories');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 6: Use Cases / Scenarios
  lines.push('## 6. Use Cases / Scenarios');
  lines.push('');
  if (old.s4 && !isStubContent(old.s4)) {
    lines.push(old.s4);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 7: Scope: MVP vs Future
  lines.push('## 7. Scope: MVP vs Future');
  lines.push('');
  lines.push('### MVP Scope');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Future Scope');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 8: Feature List
  lines.push('## 8. Feature List');
  lines.push('');
  if (old.s3 && !isStubContent(old.s3)) {
    lines.push(old.s3);
  } else {
    lines.push('| Feature ID | Feature | MVP/Future | Description | Status |');
    lines.push('|---|---|---|---|---|');
    lines.push('');
  }
  lines.push('');

  // Section 9: Business Rules & Edge Cases
  lines.push('## 9. Business Rules & Edge Cases');
  lines.push('');
  const bizRules = [];
  if (old.s5 && !isStubContent(old.s5)) bizRules.push('### Business Rules\n\n' + old.s5);
  if (old.s6 && !isStubContent(old.s6)) bizRules.push('### System Constants\n\n' + old.s6);
  if (old.s7 && !isStubContent(old.s7)) bizRules.push('### Edge Cases / Scenarios\n\n' + old.s7);
  if (bizRules.length > 0) {
    lines.push(bizRules.join('\n\n'));
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 10: Data Model
  lines.push('## 10. Data Model');
  lines.push('');
  // Check if old spec had entity/schema
  const hasSchema = old.s8 && old.s8.includes('Entity') && !isStubContent(old.s8);
  if (hasSchema) {
    // Extract subsections from s8
    const entityMatch = old.s8.match(/### 8\.3 Entity.*?\n([\s\S]*?)(?=\n### 8\.\d|$)/);
    if (entityMatch) lines.push(entityMatch[1].trim());
    else lines.push(NYD);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 11: Field-Level Specification
  lines.push('## 11. Field-Level Specification');
  lines.push('');
  if (old.s8 && !isStubContent(old.s8)) {
    // Extract field rules subsection
    const fieldMatch = old.s8.match(/### 8\.1 Field Rules.*?\n([\s\S]*?)(?=\n### 8\.\d|$)/);
    if (fieldMatch && !isStubContent(fieldMatch[1])) {
      lines.push(fieldMatch[1].trim());
    } else {
      lines.push('| Field | Type | Required | Searchable | Filterable | AI-readable | Client-visible | Notes |');
      lines.push('|---|---|---:|---:|---:|---:|---:|---|');
    }
  } else {
    lines.push('| Field | Type | Required | Searchable | Filterable | AI-readable | Client-visible | Notes |');
    lines.push('|---|---|---:|---:|---:|---:|---:|---|');
  }
  lines.push('');

  // Section 12: Database / Schema Notes
  lines.push('## 12. Database / Schema Notes');
  lines.push('');
  if (old.s8) {
    const enumMatch = old.s8.match(/### 8\.2 Enums.*?\n([\s\S]*?)(?=\n### 8\.\d|$)/);
    const invMatch = old.s8.match(/### 8\.4 Schema Invariants.*?\n([\s\S]*?)$/);
    const parts = [];
    if (enumMatch && !isStubContent(enumMatch[1])) parts.push('### Enums\n\n' + enumMatch[1].trim());
    if (invMatch && !isStubContent(invMatch[1])) parts.push('### Schema Invariants\n\n' + invMatch[1].trim());
    if (parts.length > 0) lines.push(parts.join('\n\n'));
    else lines.push(NYD);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 13: Permissions Matrix
  lines.push('## 13. Permissions Matrix');
  lines.push('');
  lines.push('| Role | Create | View | Edit | Delete | Archive | Export | Share | AI Access |');
  lines.push('|---|---:|---:|---:|---:|---:|---:|---:|---:|');
  lines.push('| Owner | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |');
  lines.push('| Admin | Yes | Yes | Yes | Limited | Yes | Yes | Yes | Yes |');
  lines.push('| Team Member | Yes | Scoped | Scoped | No | Maybe | Maybe | No | Scoped |');
  lines.push('| Consultant | Maybe | Assigned | Limited | No | No | No | No | Limited |');
  lines.push('| Client Portal | No | Client-visible | Limited | No | No | Maybe | No | Limited |');
  lines.push('');

  // Section 14: UI / UX Requirements
  lines.push('## 14. UI / UX Requirements');
  lines.push('');
  if (old.s10 && !isStubContent(old.s10)) {
    lines.push(old.s10);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 15: Workflow Requirements
  lines.push('## 15. Workflow Requirements');
  lines.push('');
  if (old.s2 && !isStubContent(old.s2)) {
    lines.push(old.s2);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 16: API Requirements
  lines.push('## 16. API Requirements');
  lines.push('');
  if (old.s11 && !isStubContent(old.s11)) {
    // Old modules section had code module info — adapt
    lines.push('### Modules\n\n' + old.s11);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 17: Search / Indexing Rules
  lines.push('## 17. Search / Indexing Rules');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 18: AI Requirements
  lines.push('## 18. AI Requirements');
  lines.push('');
  // Extract AI-related enablers from old section 9
  if (old.s9 && !isStubContent(old.s9)) {
    lines.push(old.s9);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 19: OSS / Build-vs-Buy Decision
  lines.push('## 19. OSS / Build-vs-Buy Decision');
  lines.push('');
  if (old.s13 && !isStubContent(old.s13)) {
    lines.push(old.s13);
  } else {
    lines.push(NYD);
  }
  lines.push('');

  // Section 20: Integration Map
  lines.push('## 20. Integration Map');
  lines.push('');
  if (old.s0 && !isStubContent(old.s0)) {
    lines.push(old.s0);
  } else {
    lines.push('| Capability | Direction | Data Flow |');
    lines.push('|---|---|---|');
    lines.push('');
  }
  lines.push('');

  // Section 21: Notifications / Activity
  lines.push('## 21. Notifications / Activity');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 22: Non-Functional Requirements
  lines.push('## 22. Non-Functional Requirements');
  lines.push('');
  lines.push('### Performance');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Accessibility');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Security / Privacy');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 23: Reporting / Analytics
  lines.push('## 23. Reporting / Analytics');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 24: Migration / Import / Export
  lines.push('## 24. Migration / Import / Export');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 25: Open Questions
  lines.push('## 25. Open Questions');
  lines.push('');
  if (old.s12 && !isStubContent(old.s12)) {
    lines.push(old.s12);
  } else {
    lines.push('| Question | Status | Notes |');
    lines.push('|---|---:|---|');
    lines.push('');
  }
  lines.push('');

  // Section 26: Risks & Decisions
  lines.push('## 26. Risks & Decisions');
  lines.push('');
  lines.push('### Risks');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Decisions Made');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 27: Verification & Testing
  lines.push('## 27. Verification & Testing');
  lines.push('');
  lines.push('### Acceptance Criteria');
  lines.push('');
  lines.push(NYD);
  lines.push('');
  lines.push('### Testing Requirements');
  lines.push('');
  lines.push(NYD);
  lines.push('');

  // Section 28: Readiness Gate
  lines.push('## 28. Readiness Gate');
  lines.push('');
  lines.push('```');
  lines.push('[ ] PRD sections 1-27 complete');
  lines.push('[ ] Data model approved');
  lines.push('[ ] Field-level spec complete');
  lines.push('[ ] Schema drafted');
  lines.push('[ ] Permissions matrix approved');
  lines.push('[ ] API contract drafted');
  lines.push('[ ] UI skeleton approved');
  lines.push('[ ] Workflow rules documented');
  lines.push('[ ] OSS decision finalized');
  lines.push('[ ] Integration map confirmed both directions');
  lines.push('[ ] AI/search rules defined');
  lines.push('[ ] Notification/activity rules defined');
  lines.push('[ ] Security/privacy rules defined');
  lines.push('[ ] Edge cases documented');
  lines.push('[ ] Acceptance criteria written');
  lines.push('[ ] Testing requirements written');
  lines.push('[ ] Performance requirements defined');
  lines.push('[ ] MVP/future scope separated');
  lines.push('[ ] Open questions resolved or deferred');
  lines.push('[ ] Risks documented');
  lines.push('[ ] Decisions recorded');
  lines.push('```');
  lines.push('');

  return lines.join('\n');
}

function mapStatus(oldStatus) {
  if (!oldStatus) return 'Skeleton';
  const lower = oldStatus.toLowerCase();
  if (lower.includes('stub') || lower.includes('skeleton')) return 'Skeleton';
  if (lower.includes('draft')) return 'Draft';
  if (lower.includes('canonical') || lower.includes('full')) return 'Draft';
  if (lower.includes('ready')) return 'Ready';
  return 'Draft';
}

// ─── Main ───

console.log('migrate-prds.js — migrating to 28-section format\n');

let count = 0;
let errors = 0;

for (const entry of fs.readdirSync(CAP_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const sub = path.join(CAP_DIR, entry.name);
  for (const f of fs.readdirSync(sub)) {
    if (!f.endsWith('-prd.md')) continue;
    const filePath = path.join(sub, f);
    const capId = entry.name.replace(/-/g, '_');

    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Skip if already migrated
      if (content.includes('## 28. Readiness Gate')) {
        console.log(`  SKIP (already migrated): ${entry.name}/${f}`);
        count++;
        continue;
      }

      const old = extractOldSections(content);
      const newContent = buildNewPRD(old, capId);

      if (DRY) {
        console.log(`  DRY: ${entry.name}/${f} — ${newContent.split('\n').length} lines`);
      } else {
        fs.writeFileSync(filePath, newContent);
        console.log(`  OK: ${entry.name}/${f}`);
      }
      count++;
    } catch (e) {
      console.error(`  ERROR: ${entry.name}/${f} — ${e.message}`);
      errors++;
    }
  }
}

console.log(`\n${DRY ? 'DRY RUN — ' : ''}Processed ${count} PRDs, ${errors} errors.`);
if (!DRY) console.log('Run `node build-docs.js` next to rebuild the docs viewer.');
